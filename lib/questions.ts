// lib/questions.ts
// Pełna baza pytań klasyfikatora (Blok 0, A, B, GPAI, C, D).
// Treść w języku potocznym (legal design). Żargon wyjaśniony w polu `helper`.
// DRAFT TREŚCI MERYTORYCZNEJ — wymaga weryfikacji prawnej przed publikacją.

export interface YesNoQuestion {
  id: string;
  /** Pytanie sformułowane prosto, w drugiej osobie ("Czy Twój system..."). */
  text: string;
  /** Wyjaśnienie żargonu / kontekst. Pokazywane pod "Co to znaczy?". */
  helper?: string;
  /** Konkretny przykład — legal design zaleca przykłady zamiast abstrakcji. */
  example?: string;
  legalRef: string;
}

// ── Blok A — Praktyki zakazane (Art. 5). Dowolne "tak" → ZAKAZANE.
export const ART5_QUESTIONS: YesNoQuestion[] = [
  {
    id: "a1",
    text: "Czy system stosuje techniki podprogowe lub celowo manipulacyjne, które mogą istotnie zmienić zachowanie ludzi i wyrządzić im szkodę?",
    helper:
      "Chodzi o oddziaływanie poza świadomą kontrolą odbiorcy (np. ukryte bodźce) albo świadome wprowadzanie w błąd, które skłania kogoś do decyzji szkodliwej dla niego.",
    example: "Aplikacja, która ukrytymi bodźcami nakłania do ryzykownych zakupów.",
    legalRef: "Art. 5 ust. 1 lit. a",
  },
  {
    id: "a2",
    text: "Czy system wykorzystuje słabości osób wynikające z wieku, niepełnosprawności lub trudnej sytuacji ekonomicznej, by istotnie zmienić ich zachowanie?",
    helper:
      "Mowa o celowym żerowaniu na podatności konkretnej grupy (np. dzieci, osoby w kryzysie finansowym).",
    legalRef: "Art. 5 ust. 1 lit. b",
  },
  {
    id: "a3",
    text: "Czy system ocenia lub klasyfikuje ludzi na podstawie ich zachowania społecznego lub cech osobistych (scoring społeczny), co prowadzi do krzywdzącego traktowania?",
    helper:
      "Scoring społeczny to przyznawanie ludziom „punktów” za zachowanie i wykorzystywanie ich w niepowiązanych kontekstach, ze szkodą dla danej osoby.",
    legalRef: "Art. 5 ust. 1 lit. c",
  },
  {
    id: "a4",
    text: "Czy system przewiduje ryzyko popełnienia przestępstwa wyłącznie na podstawie profilowania lub cech osobowości?",
    helper:
      "Zakaz dotyczy oceny „kto popełni przestępstwo” opartej tylko na profilu, a nie na obiektywnych, weryfikowalnych faktach.",
    legalRef: "Art. 5 ust. 1 lit. d",
  },
  {
    id: "a5",
    text: "Czy system tworzy lub rozbudowuje bazy rozpoznawania twarzy przez masowe pobieranie wizerunków z internetu lub z monitoringu?",
    helper:
      "Chodzi o nieukierunkowane zbieranie zdjęć twarzy (scraping) w celu budowy bazy biometrycznej.",
    legalRef: "Art. 5 ust. 1 lit. e",
  },
  {
    id: "a6",
    text: "Czy system rozpoznaje emocje ludzi w miejscu pracy lub w placówkach edukacyjnych?",
    helper:
      "Z wyłączeniem zastosowań medycznych i bezpieczeństwa. Poza tymi wyjątkami rozpoznawanie emocji w pracy i edukacji jest zakazane.",
    legalRef: "Art. 5 ust. 1 lit. f",
  },
  {
    id: "a7",
    text: "Czy system kategoryzuje ludzi na podstawie biometrii, by wnioskować o cechach wrażliwych (np. rasa, poglądy, orientacja, religia)?",
    helper:
      "Kategoryzacja biometryczna to przypisywanie osób do grup na podstawie danych o ciele (twarz, głos) w celu wywnioskowania cech chronionych.",
    legalRef: "Art. 5 ust. 1 lit. g",
  },
  {
    id: "a8",
    text: "Czy stosujesz zdalną identyfikację biometryczną „w czasie rzeczywistym” w miejscach publicznych do ścigania przestępstw?",
    helper:
      "Rozpoznawanie osób na żywo (np. z kamer) w przestrzeni publicznej na potrzeby organów ścigania — co do zasady zakazane, z wąskimi wyjątkami dla uprawnionych organów.",
    legalRef: "Art. 5 ust. 1 lit. h",
  },
];

// ── Blok B — Wysokie ryzyko (Załącznik III + Załącznik I). Dowolne "tak" (i brak A) → WYSOKIE.
export const ANNEX_III_QUESTIONS: YesNoQuestion[] = [
  {
    id: "b1",
    text: "Czy system jest elementem bezpieczeństwa produktu objętego unijnymi przepisami (np. maszyny, wyroby medyczne, zabawki, pojazdy)?",
    helper:
      "Załącznik I obejmuje produkty, które przechodzą ocenę zgodności. Jeśli AI odpowiada za ich bezpieczne działanie, traktuje się go jako wysokiego ryzyka.",
    legalRef: "Załącznik I",
  },
  {
    id: "b2",
    text: "Biometria — czy system służy do zdalnej identyfikacji biometrycznej, kategoryzacji według cech chronionych lub rozpoznawania emocji (poza przypadkami zakazanymi)?",
    helper: "Dotyczy dozwolonych zastosowań biometrii, które jednak pozostają wysokiego ryzyka.",
    legalRef: "Załącznik III pkt 1",
  },
  {
    id: "b3",
    text: "Infrastruktura krytyczna — czy system zarządza lub zabezpiecza ruch drogowy albo dostawy wody, gazu, ciepła, energii lub infrastrukturę cyfrową?",
    legalRef: "Załącznik III pkt 2",
  },
  {
    id: "b4",
    text: "Edukacja — czy system decyduje o przyjęciu, ocenia efekty uczenia się, kieruje na ścieżki kształcenia lub nadzoruje egzaminy?",
    legalRef: "Załącznik III pkt 3",
  },
  {
    id: "b5",
    text: "Zatrudnienie — czy system wspiera rekrutację, ocenę kandydatów albo decyzje o awansach, zwolnieniach, przydziale zadań lub ocenie pracowników?",
    example: "Narzędzie do automatycznego selekcjonowania CV lub oceny wyników pracy.",
    legalRef: "Załącznik III pkt 4",
  },
  {
    id: "b6",
    text: "Usługi podstawowe — czy system ocenia zdolność kredytową, dostęp do świadczeń, ryzyko lub ceny w ubezpieczeniach na życie i zdrowotnych, albo priorytetyzuje wezwania służb ratunkowych?",
    legalRef: "Załącznik III pkt 5",
  },
  {
    id: "b7",
    text: "Ściganie, migracja lub wymiar sprawiedliwości — czy system wspiera organy ścigania, kontrolę graniczną i azyl, lub stosowanie prawa przez sądy?",
    legalRef: "Załącznik III pkt 6–8",
  },
];

/**
 * Pytanie pomocnicze — możliwe wyłączenie spod wysokiego ryzyka (Art. 6 ust. 3).
 * NIE zmienia automatycznie klasyfikacji w MVP — sygnalizuje użytkownikowi możliwość
 * wyłączenia, która wymaga oceny i udokumentowania.
 */
export const ANNEX_III_EXEMPTION: YesNoQuestion = {
  id: "b_exempt",
  text: "Czy system wykonuje jedynie wąskie zadanie proceduralne, poprawia wynik wcześniejszej pracy człowieka lub nie wpływa istotnie na decyzję?",
  helper:
    "Jeśli tak, system może być wyłączony spod reżimu wysokiego ryzyka. Wyłączenie trzeba jednak ocenić i udokumentować — nie działa automatycznie.",
  legalRef: "Art. 6 ust. 3",
};

// ── Blok GPAI — modele ogólnego przeznaczenia (tylko dostawca).
export const GPAI_QUESTIONS: YesNoQuestion[] = [
  {
    id: "g1",
    text: "Czy dostarczasz model AI ogólnego przeznaczenia (GPAI) — np. duży model językowy lub multimodalny?",
    helper:
      "GPAI to model trenowany na dużą skalę, który potrafi wykonywać wiele różnych zadań i bywa wbudowywany w inne systemy (np. duży model językowy).",
    legalRef: "Art. 53",
  },
  {
    id: "g2",
    text: "Czy model wiąże się z ryzykiem systemowym (bardzo duża skala obliczeń lub oddziaływania)?",
    helper:
      "Ryzyko systemowe dotyczy najpotężniejszych modeli, których działanie może mieć szeroki wpływ na rynek lub społeczeństwo.",
    legalRef: "Art. 55",
  },
];

// ── Blok C — Obowiązki przejrzystości (Art. 50). "Tak" (i brak A, B) → OGRANICZONE.
export const ART50_QUESTIONS: YesNoQuestion[] = [
  {
    id: "c1",
    text: "Czy system wchodzi w bezpośrednią interakcję z ludźmi (np. chatbot, asystent głosowy)?",
    helper: "Jeśli tak, trzeba poinformować rozmówcę, że rozmawia z AI, a nie z człowiekiem.",
    legalRef: "Art. 50 ust. 1",
  },
  {
    id: "c2",
    text: "Czy system generuje syntetyczne treści (tekst, obraz, dźwięk lub wideo)?",
    helper:
      "Treści wytworzone przez AI trzeba oznaczać w sposób możliwy do odczytania maszynowego (np. metadane).",
    legalRef: "Art. 50 ust. 2",
  },
  {
    id: "c3",
    text: "Czy tworzysz treści typu deepfake lub teksty informujące opinię publiczną o sprawach publicznych?",
    helper: "Trzeba wtedy ujawnić, że treść została sztucznie wygenerowana lub zmanipulowana.",
    legalRef: "Art. 50 ust. 4",
  },
  {
    id: "c4",
    text: "Czy stosujesz rozpoznawanie emocji lub kategoryzację biometryczną (w dozwolonym zakresie)?",
    helper: "Osoby, których to dotyczy, trzeba o tym poinformować.",
    legalRef: "Art. 50 ust. 3",
  },
];

// ── Blok D — Kompetencje AI (Art. 4). Dotyczy każdego dostawcy i podmiotu stosującego.
export const ART4_QUESTION: YesNoQuestion = {
  id: "d1",
  text: "Czy zapewniasz pracownikom i osobom obsługującym AI odpowiedni poziom kompetencji (szkolenia, polityka)?",
  helper:
    "Art. 4 wymaga, by osoby pracujące z AI rozumiały, jak działa i jak korzystać z niego odpowiedzialnie. Dotyczy praktycznie każdej organizacji używającej AI.",
  legalRef: "Art. 4",
};

// ── Listy pomocnicze do profilu / opisu (E2, E4) — segmentacja, bez wpływu na klasyfikację.
export const SECTORS = [
  "Technologia / IT",
  "Finanse / ubezpieczenia",
  "Ochrona zdrowia",
  "Edukacja",
  "Handel / e-commerce",
  "Przemysł / produkcja",
  "Sektor publiczny",
  "Usługi profesjonalne",
  "Inny",
];

export const USE_CATEGORIES = [
  "Obsługa klienta / chatbot",
  "Rekrutacja / HR",
  "Generowanie treści (tekst, grafika)",
  "Analiza danych / prognozy",
  "Scoring / ocena ryzyka",
  "Biometria / rozpoznawanie",
  "Automatyzacja procesów",
  "Inne",
];
