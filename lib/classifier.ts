// lib/classifier.ts
// Deterministyczny klasyfikator AI Act. ŻADNEGO LLM — czyste reguły.
// To jest IP produktu i przedmiot weryfikacji prawnej.
//
// Zasada nadrzędna ("najwyższe ryzyko wygrywa"):
//   1. Dowolne "tak" w Art. 5            → ZAKAZANE
//   2. Inaczej dowolne "tak" w Zał. III/I → WYSOKIE RYZYKO
//   3. Inaczej dowolne "tak" w Art. 50    → OGRANICZONE (przejrzystość)
//   4. Inaczej                            → MINIMALNE
//   5. Niezależnie: Art. 4 (kompetencje) dla każdego dostawcy/stosującego
//   6. Jeśli GPAI = tak → doklej obowiązki modeli ogólnego przeznaczenia

import type {
  AuditAnswers,
  ClassificationResult,
  Obligation,
  Role,
  Trigger,
} from "./types";
import {
  ART5_QUESTIONS,
  ANNEX_III_QUESTIONS,
  ART50_QUESTIONS,
} from "./questions";
import {
  PROHIBITED_ACTIONS,
  HIGH_RISK_PROVIDER,
  HIGH_RISK_DEPLOYER,
  GPAI_BASE,
  GPAI_SYSTEMIC,
  TRANSPARENCY_BY_QUESTION,
  ART4_OBLIGATION,
  MINIMAL_GOOD_PRACTICE,
} from "./obligations";

const HEADLINES: Record<string, string> = {
  prohibited:
    "Wykryliśmy zastosowanie z listy praktyk zakazanych. To wymaga pilnego wstrzymania i konsultacji.",
  high:
    "Twój system mieści się w kategorii wysokiego ryzyka — wiąże się z najszerszym zestawem obowiązków.",
  limited:
    "Twój system podlega obowiązkom przejrzystości — głównie informowaniu ludzi, że mają do czynienia z AI.",
  minimal:
    "Twój system wydaje się mieć minimalne ryzyko. Twarde obowiązki AI Act prawdopodobnie nie mają zastosowania.",
  not_applicable:
    "AI Act prawdopodobnie nie ma zastosowania do Twojej organizacji. Sprawdź jednak inne regulacje (np. RODO).",
};

/** Czy jakakolwiek odpowiedź "tak" w zbiorze. */
function anyYes(answers: Record<string, boolean>): boolean {
  return Object.values(answers).some((v) => v === true);
}

/** Zbiera triggery (które pytania = "tak") dla bloku. */
function collectTriggers(
  answers: Record<string, boolean>,
  questions: { id: string; text: string }[],
  block: Trigger["block"]
): Trigger[] {
  return questions
    .filter((q) => answers[q.id] === true)
    .map((q) => ({ questionId: q.id, block, label: q.text }));
}

/** Filtruje obowiązki do ról wybranych przez użytkownika. */
function filterByRole(obligations: Obligation[], roles: Role[]): Obligation[] {
  // "unsure" traktujemy jak dostawcę I podmiot stosujący (pokaż pełny obraz).
  const effective: Role[] =
    roles.includes("unsure") || roles.length === 0
      ? ["provider", "deployer"]
      : roles;
  return obligations.filter(
    (o) => o.appliesTo === "all" || o.appliesTo.some((r) => effective.includes(r))
  );
}

function isProvider(roles: Role[]): boolean {
  return roles.includes("provider") || roles.includes("unsure");
}

export function classify(a: AuditAnswers): ClassificationResult {
  // Krok 0 — kwalifikacja wstępna.
  if (a.usesAiInEu === false) {
    return {
      level: "not_applicable",
      headline: HEADLINES.not_applicable,
      triggers: [],
      obligations: [],
      gpaiAttached: false,
      art4Attached: false,
    };
  }

  const triggers: Trigger[] = [];
  let obligations: Obligation[] = [];
  let level: ClassificationResult["level"];

  const gpaiActive = isProvider(a.roles) && a.gpaiIsGpai === true;

  // Krok 1 — praktyki zakazane.
  if (anyYes(a.art5)) {
    level = "prohibited";
    triggers.push(...collectTriggers(a.art5, ART5_QUESTIONS, "art5"));
    obligations = [...PROHIBITED_ACTIONS];
  }
  // Krok 2 — wysokie ryzyko.
  else if (anyYes(a.annexIII)) {
    level = "high";
    triggers.push(...collectTriggers(a.annexIII, ANNEX_III_QUESTIONS, "annexIII"));
    obligations = [
      ...filterByRole(HIGH_RISK_PROVIDER, a.roles),
      ...filterByRole(HIGH_RISK_DEPLOYER, a.roles),
    ];
  }
  // Krok 3 — przejrzystość.
  else if (anyYes(a.art50)) {
    level = "limited";
    triggers.push(...collectTriggers(a.art50, ART50_QUESTIONS, "art50"));
    const transp = ART50_QUESTIONS.filter((q) => a.art50[q.id] === true)
      .map((q) => TRANSPARENCY_BY_QUESTION[q.id])
      .filter(Boolean);
    obligations = filterByRole(transp, a.roles);
  }
  // Krok 4 — minimalne.
  else {
    level = "minimal";
    obligations = [...MINIMAL_GOOD_PRACTICE];
  }

  // Krok 6 — GPAI (doklejane niezależnie od poziomu, gdy dostawca modelu).
  let gpaiAttached = false;
  if (gpaiActive) {
    gpaiAttached = true;
    obligations.push(...GPAI_BASE);
    if (a.gpaiSystemicRisk === true) {
      obligations.push(...GPAI_SYSTEMIC);
    }
    triggers.push({
      questionId: "g1",
      block: "gpai",
      label: "Dostarczasz model ogólnego przeznaczenia (GPAI).",
    });
  }

  // Krok 5 — Art. 4 (kompetencje) dla każdego dostawcy/stosującego,
  // o ile nie jest to przypadek zakazany (tam priorytetem jest wstrzymanie).
  // (not_applicable zwrócono już wcześniej, więc tu nie wystąpi.)
  let art4Attached = false;
  if (level !== "prohibited") {
    const roleApplies =
      isProvider(a.roles) || a.roles.includes("deployer") || a.roles.length === 0;
    if (roleApplies) {
      art4Attached = true;
      // Pokaż obowiązek tylko, jeśli użytkownik NIE ma jeszcze programu kompetencji,
      // albo gdy nie odpowiedział (domyślnie pokazujemy jako rekomendację).
      if (a.art4HasProgram !== true) {
        obligations.push(ART4_OBLIGATION);
      }
    }
  }

  // Deduplikacja po id (na wypadek nakładania się reguł).
  const seen = new Set<string>();
  obligations = obligations.filter((o) => {
    if (seen.has(o.id)) return false;
    seen.add(o.id);
    return true;
  });

  return {
    level,
    headline: HEADLINES[level],
    triggers,
    obligations,
    gpaiAttached,
    art4Attached,
  };
}

/** Pusty zestaw odpowiedzi — punkt startowy formularza. */
export function emptyAnswers(): AuditAnswers {
  return {
    usesAiInEu: null,
    roles: [],
    sector: null,
    size: null,
    useDescription: "",
    useCategories: [],
    art5: {},
    annexIII: {},
    gpaiIsGpai: null,
    gpaiSystemicRisk: null,
    art50: {},
    art4HasProgram: null,
  };
}
