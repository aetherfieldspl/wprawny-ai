// lib/types.ts
// Domena audytu AI Act. Czysty TypeScript — bez zależności od UI.
// Ten plik + classifier.ts + obligations.ts są przedmiotem weryfikacji prawnej.

export type Role =
  | "provider" // Dostawca — tworzysz lub oznaczasz system własną marką
  | "deployer" // Podmiot stosujący — używasz systemu dostarczonego przez kogoś innego
  | "importer_distributor" // Importer / Dystrybutor
  | "unsure"; // Nie wiem

export type RiskLevel =
  | "prohibited" // Zakazane (Art. 5)
  | "high" // Wysokie ryzyko (Załącznik III / Załącznik I)
  | "limited" // Ograniczone — obowiązki przejrzystości (Art. 50)
  | "minimal" // Minimalne
  | "not_applicable"; // AI Act prawdopodobnie nie ma zastosowania

export type CompanySize = "micro" | "sme" | "large";

/** Surowe odpowiedzi z formularza. null = brak odpowiedzi. */
export interface AuditAnswers {
  // Blok 0 — kwalifikacja wstępna
  usesAiInEu: boolean | null; // P0.1
  roles: Role[]; // P0.2 (wielokrotny)

  // Profil organizacji (E2) — segmentacja leada, NIE wpływa na klasyfikację
  sector: string | null;
  size: CompanySize | null;

  // Opis zastosowania (E4) — kontekst
  useDescription: string;
  useCategories: string[];

  // Blok A — praktyki zakazane (Art. 5): a1..a8
  art5: Record<string, boolean>;

  // Blok B — wysokie ryzyko (Załącznik III + I): b1..b7
  annexIII: Record<string, boolean>;

  // Blok GPAI (tylko dostawca)
  gpaiIsGpai: boolean | null; // P-G.1
  gpaiSystemicRisk: boolean | null; // P-G.2

  // Blok C — obowiązki przejrzystości (Art. 50): c1..c4
  art50: Record<string, boolean>;

  // Blok D — kompetencje AI (Art. 4)
  art4HasProgram: boolean | null; // D.1
}

/** Jeden obowiązek do checklisty w raporcie. */
export interface Obligation {
  id: string;
  /** Krótki, jednozdaniowy tytuł w języku potocznym (zasada legal design). */
  title: string;
  /** Rozszerzenie — co konkretnie trzeba zrobić. */
  detail: string;
  /** Odwołanie do podstawy prawnej, np. "Art. 9", "Art. 50 ust. 2". */
  legalRef: string;
  /** Do kogo adresowany: dla kogo obowiązek jest istotny. */
  appliesTo: Role[] | "all";
}

export interface ClassificationResult {
  level: RiskLevel;
  /** Jedno zdanie: co to oznacza dla organizacji (E10). */
  headline: string;
  /** Pytania, które wywołały klasyfikację (transparentność decyzji). */
  triggers: Trigger[];
  /** Dopasowane obowiązki (checklist „do zrobienia”). */
  obligations: Obligation[];
  /** Czy doklejono obowiązki GPAI. */
  gpaiAttached: boolean;
  /** Czy doklejono obowiązki kompetencji (Art. 4). */
  art4Attached: boolean;
}

export interface Trigger {
  questionId: string;
  block: "art5" | "annexIII" | "art50" | "gpai" | "art4";
  label: string;
}
