// lib/obligations.ts
// Mapowanie wyników klasyfikacji na listy obowiązków (checklist w raporcie).
//
// ⚠️  DRAFT MERYTORYCZNY — WYMAGA WERYFIKACJI PRAWNEJ PRZED PUBLIKACJĄ.
// Treść odzwierciedla strukturę AI Act z dokumentu MVP. Brzmienia, kompletność
// i odwołania do artykułów musi potwierdzić prawnik (wprawny.pl).
//
// Organizacja: obowiązki pogrupowane wg "źródła" — łączone przez classifier.ts
// w zależności od kategorii ryzyka, roli i GPAI.

import type { Obligation } from "./types";

// ── ZAKAZANE (Art. 5) — brak listy "do zrobienia": jedyny krok to wstrzymanie i kontakt.
export const PROHIBITED_ACTIONS: Obligation[] = [
  {
    id: "p-stop",
    title: "Wstrzymaj wdrożenie tej funkcji systemu",
    detail:
      "Zastosowanie wskazane w odpowiedziach należy do praktyk zakazanych. Nie można go zgodnie z prawem oferować ani używać na rynku UE.",
    legalRef: "Art. 5",
    appliesTo: "all",
  },
  {
    id: "p-expert",
    title: "Skonsultuj się z ekspertem w trybie pilnym",
    detail:
      "Zakazy z Art. 5 mają wyjątki i niuanse. Zanim podejmiesz decyzje, zweryfikuj ocenę z prawnikiem — niektóre zastosowania mogą być dopuszczalne pod ścisłymi warunkami.",
    legalRef: "Art. 5",
    appliesTo: "all",
  },
];

// ── WYSOKIE RYZYKO — obowiązki dostawcy (provider).
export const HIGH_RISK_PROVIDER: Obligation[] = [
  {
    id: "hr-rms",
    title: "Wprowadź system zarządzania ryzykiem",
    detail:
      "Ustanów ciągły proces rozpoznawania, oceny i ograniczania ryzyk systemu przez cały jego cykl życia.",
    legalRef: "Art. 9",
    appliesTo: ["provider"],
  },
  {
    id: "hr-data",
    title: "Zapewnij jakość danych treningowych i testowych",
    detail:
      "Dane muszą być odpowiednie, możliwie wolne od błędów i reprezentatywne dla zamierzonego celu, z kontrolą obciążeń (bias).",
    legalRef: "Art. 10",
    appliesTo: ["provider"],
  },
  {
    id: "hr-doc",
    title: "Przygotuj dokumentację techniczną",
    detail:
      "Opisz system tak, by organ nadzoru mógł ocenić jego zgodność: architektura, dane, działanie, ograniczenia.",
    legalRef: "Art. 11",
    appliesTo: ["provider"],
  },
  {
    id: "hr-logs",
    title: "Włącz automatyczne rejestrowanie zdarzeń",
    detail: "System musi zapisywać zdarzenia (logi) umożliwiające śledzenie jego działania.",
    legalRef: "Art. 12",
    appliesTo: ["provider"],
  },
  {
    id: "hr-transp",
    title: "Zapewnij przejrzystość dla podmiotów stosujących",
    detail:
      "Dołącz instrukcję obsługi i informacje pozwalające bezpiecznie i zgodnie używać systemu.",
    legalRef: "Art. 13",
    appliesTo: ["provider"],
  },
  {
    id: "hr-human",
    title: "Zaprojektuj nadzór ludzki",
    detail: "System musi umożliwiać skuteczny nadzór człowieka (np. interwencję, zatrzymanie).",
    legalRef: "Art. 14",
    appliesTo: ["provider"],
  },
  {
    id: "hr-acc",
    title: "Zadbaj o dokładność, odporność i cyberbezpieczeństwo",
    detail: "System ma działać poprawnie i być odporny na błędy oraz próby manipulacji.",
    legalRef: "Art. 15",
    appliesTo: ["provider"],
  },
  {
    id: "hr-qms",
    title: "Wdroż system zarządzania jakością i ocenę zgodności",
    detail:
      "Zanim system trafi na rynek, przejdź ocenę zgodności, oznacz go CE i zarejestruj w bazie UE tam, gdzie to wymagane.",
    legalRef: "Art. 16–17, 43, 47–49",
    appliesTo: ["provider"],
  },
];

// ── WYSOKIE RYZYKO — obowiązki podmiotu stosującego (deployer).
export const HIGH_RISK_DEPLOYER: Obligation[] = [
  {
    id: "hr-d-instr",
    title: "Używaj systemu zgodnie z instrukcją dostawcy",
    detail: "Stosuj system w sposób przewidziany przez dostawcę i zgodnie z dokumentacją.",
    legalRef: "Art. 26 ust. 1",
    appliesTo: ["deployer"],
  },
  {
    id: "hr-d-human",
    title: "Zapewnij nadzór ludzki po swojej stronie",
    detail:
      "Wyznacz kompetentne osoby, które realnie nadzorują działanie systemu w Twojej organizacji.",
    legalRef: "Art. 26 ust. 2",
    appliesTo: ["deployer"],
  },
  {
    id: "hr-d-monitor",
    title: "Monitoruj działanie i zgłaszaj poważne incydenty",
    detail:
      "Obserwuj system; w razie ryzyka lub poważnego incydentu poinformuj dostawcę i — gdy trzeba — organ nadzoru.",
    legalRef: "Art. 26 ust. 5, Art. 73",
    appliesTo: ["deployer"],
  },
  {
    id: "hr-d-logs",
    title: "Przechowuj logi systemu",
    detail: "Zachowuj rejestry zdarzeń generowane przez system przez wymagany okres.",
    legalRef: "Art. 26 ust. 6",
    appliesTo: ["deployer"],
  },
  {
    id: "hr-d-inform",
    title: "Informuj osoby, których dotyczą decyzje",
    detail:
      "Gdy system wspiera decyzje dotyczące osób fizycznych, poinformuj je o tym fakcie tam, gdzie wymaga tego prawo.",
    legalRef: "Art. 26 ust. 11",
    appliesTo: ["deployer"],
  },
];

// ── GPAI — obowiązki podstawowe (dostawca modelu).
export const GPAI_BASE: Obligation[] = [
  {
    id: "gp-doc",
    title: "Przygotuj dokumentację techniczną modelu",
    detail: "Opisz model, proces trenowania i testowania oraz jego możliwości i ograniczenia.",
    legalRef: "Art. 53 ust. 1 lit. a",
    appliesTo: ["provider"],
  },
  {
    id: "gp-integr",
    title: "Udostępnij informacje integratorom",
    detail:
      "Dostarcz dostawcom, którzy budują na Twoim modelu, informacje potrzebne do zgodnego wykorzystania.",
    legalRef: "Art. 53 ust. 1 lit. b",
    appliesTo: ["provider"],
  },
  {
    id: "gp-copyright",
    title: "Wdroż politykę poszanowania praw autorskich",
    detail: "Ustanów politykę zgodności z prawem autorskim UE, w tym mechanizmem rezerwacji praw.",
    legalRef: "Art. 53 ust. 1 lit. c",
    appliesTo: ["provider"],
  },
  {
    id: "gp-summary",
    title: "Opublikuj streszczenie danych treningowych",
    detail: "Udostępnij publicznie wystarczająco szczegółowe streszczenie danych użytych do treningu.",
    legalRef: "Art. 53 ust. 1 lit. d",
    appliesTo: ["provider"],
  },
];

// ── GPAI — ryzyko systemowe (dodatkowo).
export const GPAI_SYSTEMIC: Obligation[] = [
  {
    id: "gps-eval",
    title: "Przeprowadzaj ocenę modelu i testy przeciwnika",
    detail: "Oceniaj model wg uznanych metod, w tym testów typu red-teaming.",
    legalRef: "Art. 55 ust. 1 lit. a",
    appliesTo: ["provider"],
  },
  {
    id: "gps-risk",
    title: "Oceniaj i ograniczaj ryzyko systemowe",
    detail: "Identyfikuj ryzyka na poziomie UE i wdrażaj środki ich ograniczania.",
    legalRef: "Art. 55 ust. 1 lit. b",
    appliesTo: ["provider"],
  },
  {
    id: "gps-incident",
    title: "Raportuj poważne incydenty",
    detail: "Zgłaszaj poważne incydenty i działania naprawcze właściwym organom.",
    legalRef: "Art. 55 ust. 1 lit. c",
    appliesTo: ["provider"],
  },
  {
    id: "gps-cyber",
    title: "Zapewnij cyberbezpieczeństwo modelu",
    detail: "Chroń model i jego infrastrukturę na adekwatnym poziomie bezpieczeństwa.",
    legalRef: "Art. 55 ust. 1 lit. d",
    appliesTo: ["provider"],
  },
];

// ── OGRANICZONE — obowiązki przejrzystości (Art. 50). Zależne od konkretnych "tak".
export const TRANSPARENCY_BY_QUESTION: Record<string, Obligation> = {
  c1: {
    id: "tr-chatbot",
    title: "Poinformuj, że rozmówca ma do czynienia z AI",
    detail: "Przy interakcji z chatbotem czy asystentem osoba musi wiedzieć, że to system AI.",
    legalRef: "Art. 50 ust. 1",
    appliesTo: ["provider", "deployer"],
  },
  c2: {
    id: "tr-synthetic",
    title: "Oznaczaj treści generowane przez AI",
    detail:
      "Treści syntetyczne (tekst, obraz, audio, wideo) trzeba oznaczać w formacie odczytywalnym maszynowo.",
    legalRef: "Art. 50 ust. 2",
    appliesTo: ["provider"],
  },
  c3: {
    id: "tr-deepfake",
    title: "Ujawniaj treści typu deepfake",
    detail: "Informuj odbiorców, że treść została sztucznie wygenerowana lub zmanipulowana.",
    legalRef: "Art. 50 ust. 4",
    appliesTo: ["deployer"],
  },
  c4: {
    id: "tr-biometric",
    title: "Informuj o rozpoznawaniu emocji lub kategoryzacji biometrycznej",
    detail: "Osoby poddane takim systemom muszą zostać o tym powiadomione.",
    legalRef: "Art. 50 ust. 3",
    appliesTo: ["deployer"],
  },
};

// ── KOMPETENCJE AI (Art. 4) — dla każdego dostawcy / podmiotu stosującego.
export const ART4_OBLIGATION: Obligation = {
  id: "art4",
  title: "Zapewnij kompetencje AI w organizacji",
  detail:
    "Zadbaj, by osoby pracujące z AI miały odpowiednią wiedzę i przeszkolenie. Pomaga w tym spisana polityka korzystania z AI oraz szkolenia.",
  legalRef: "Art. 4",
  appliesTo: ["provider", "deployer"],
};

// ── MINIMALNE — brak twardych obowiązków; dobre praktyki.
export const MINIMAL_GOOD_PRACTICE: Obligation[] = [
  {
    id: "min-policy",
    title: "Spisz wewnętrzną politykę korzystania z AI",
    detail:
      "Nawet bez twardych obowiązków warto uporządkować zasady używania AI w firmie (problem „shadow AI”).",
    legalRef: "Dobra praktyka",
    appliesTo: "all",
  },
  {
    id: "min-watch",
    title: "Monitoruj zmiany zastosowań",
    detail:
      "Klasyfikacja zależy od sposobu użycia. Gdy zmienisz zastosowanie AI, powtórz ocenę.",
    legalRef: "Dobra praktyka",
    appliesTo: "all",
  },
];
