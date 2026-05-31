// lib/policy/template.ts
// Generator treści polityki AI z konfiguracji.
// Czysta funkcja: PolicyConfig → ustrukturyzowany dokument (sekcje).
//
// DRAFT MERYTORYCZNY — wymaga walidacji prawnej przed publikacją.

import type { PolicyConfig } from "./types";

export interface Section {
  /** Numer sekcji w spisie treści. */
  number: number;
  title: string;
  /** Pojedynczy paragraf wstępu (opcjonalnie). */
  intro?: string;
  /** Lista punktów (numerowanych w PDF). */
  points: string[];
}

const SIZE_LABEL: Record<string, string> = {
  micro: "mikroprzedsiębiorstwie (do 10 osób)",
  sme: "małym/średnim przedsiębiorstwie (10–250 osób)",
  large: "dużym przedsiębiorstwie (powyżej 250 osób)",
};

export function buildPolicy(cfg: PolicyConfig): Section[] {
  const orgName = cfg.org.name.trim() || "[Nazwa organizacji]";
  const responsible =
    [cfg.org.responsiblePerson.trim(), cfg.org.responsibleRole.trim()]
      .filter(Boolean)
      .join(", ") || "[osoba odpowiedzialna]";
  const approver = cfg.roles.approver.trim() || "osoba wskazana przez kierownictwo";
  const overseer = cfg.roles.overseer.trim() || "osoba wskazana przez kierownictwo";
  const incidentContact =
    cfg.incidents.contact.trim() || "adres wskazany w intranecie organizacji";

  const sections: Section[] = [];

  // 1. Postanowienia ogólne
  const sizePhrase = cfg.org.size ? ` (jako ${SIZE_LABEL[cfg.org.size]})` : "";
  const sectorPhrase = cfg.org.sector ? ` z sektora: ${cfg.org.sector}` : "";
  sections.push({
    number: 1,
    title: "Postanowienia ogólne",
    intro: `Niniejsza polityka określa zasady korzystania z narzędzi sztucznej inteligencji (AI) w organizacji ${orgName}${sectorPhrase}${sizePhrase}.`,
    points: [
      "Polityka obowiązuje wszystkich pracowników, współpracowników i osoby działające w imieniu organizacji.",
      `Osobą odpowiedzialną za politykę jest: ${responsible}.`,
      "Polityka jest dokumentem żywym — podlega przeglądowi co najmniej raz w roku oraz po istotnych zmianach w prawie lub praktyce organizacji.",
      "Polityka jest spójna z wymaganiami AI Act, w szczególności z obowiązkiem zapewnienia kompetencji AI (Art. 4).",
    ],
  });

  // 2. Definicje
  sections.push({
    number: 2,
    title: "Definicje",
    points: [
      "Narzędzie AI — system lub usługa wykorzystująca techniki sztucznej inteligencji (m.in. duże modele językowe, generatory obrazu, narzędzia analityczne) udostępniana jako produkt zewnętrzny lub wbudowana w narzędzia używane w organizacji.",
      "Treść generowana przez AI — tekst, obraz, dźwięk lub wideo wytworzone w całości lub w istotnej części przez narzędzie AI.",
      "Dane wrażliwe — dane osobowe szczególnych kategorii (m.in. zdrowie, pochodzenie, przekonania, dane biometryczne), zgodnie z art. 9 RODO.",
      "Tajemnica przedsiębiorstwa — informacje techniczne, technologiczne, organizacyjne lub inne posiadające wartość gospodarczą, niejawne i podlegające ochronie.",
    ],
  });

  // 3. Dozwolone narzędzia AI
  const allowedText =
    cfg.tools.allowed.length > 0
      ? `Lista narzędzi dopuszczonych do użytku służbowego: ${cfg.tools.allowed.join(", ")}.`
      : "Lista narzędzi dopuszczonych do użytku służbowego jest publikowana i aktualizowana przez osobę odpowiedzialną za politykę.";
  const toolsPoints: string[] = [allowedText];
  if (cfg.tools.requireApproval) {
    toolsPoints.push(
      `Wprowadzenie nowego narzędzia AI do użytku służbowego wymaga uprzedniej zgody: ${approver}.`,
      "Wniosek o dopuszczenie nowego narzędzia powinien zawierać: opis funkcji, zakres danych, dostawcę, lokalizację przetwarzania oraz status prawno-regulacyjny."
    );
  } else {
    toolsPoints.push(
      "Pracownicy mogą korzystać z narzędzi AI nieujętych na liście, o ile przestrzegają pozostałych zasad niniejszej polityki — w szczególności zakazów dotyczących przetwarzania danych."
    );
  }
  toolsPoints.push(
    "Zabronione jest korzystanie z prywatnych kont w narzędziach AI do celów służbowych, jeśli nie zostały zaakceptowane przez organizację."
  );
  sections.push({
    number: 3,
    title: "Dozwolone narzędzia AI",
    points: toolsPoints,
  });

  // 4. Zasady przetwarzania danych
  const dataPoints: string[] = [];
  if (cfg.dataProhibitions.personal) {
    dataPoints.push(
      "Zabronione jest wprowadzanie danych osobowych klientów, kontrahentów i pracowników (imiona, nazwiska, adresy e-mail, numery telefonów, identyfikatory) do narzędzi AI, chyba że są one zaakceptowane jako procesor danych i istnieje odpowiednia umowa powierzenia (DPA)."
    );
  }
  if (cfg.dataProhibitions.sensitive) {
    dataPoints.push(
      "Zabronione jest wprowadzanie danych wrażliwych w rozumieniu art. 9 RODO (zdrowie, pochodzenie, przekonania, dane biometryczne) do jakichkolwiek narzędzi AI bez wyraźnej zgody osoby odpowiedzialnej i podstawy prawnej."
    );
  }
  if (cfg.dataProhibitions.tradeSecrets) {
    dataPoints.push(
      "Zabronione jest wprowadzanie tajemnic przedsiębiorstwa (planów strategicznych, danych finansowych nieopublikowanych, know-how, danych projektowych klientów) do publicznych narzędzi AI."
    );
  }
  if (cfg.dataProhibitions.sourceCode) {
    dataPoints.push(
      "Zabronione jest wklejanie zastrzeżonego kodu źródłowego organizacji do publicznych narzędzi AI. Dla zadań programistycznych należy używać narzędzi zatwierdzonych do tego celu (np. z trybem enterprise / on-premises)."
    );
  }
  dataPoints.push(
    "W przypadku wątpliwości co do dopuszczalności wprowadzenia danych — należy skonsultować się z osobą odpowiedzialną za politykę przed użyciem narzędzia.",
    "Pracownicy są zobowiązani do anonimizacji lub pseudonimizacji danych tam, gdzie jest to możliwe i wystarczające dla zadania."
  );
  sections.push({
    number: 4,
    title: "Zasady przetwarzania danych w narzędziach AI",
    points: dataPoints,
  });

  // 5. Weryfikacja wyników (human-in-the-loop)
  if (cfg.humanInTheLoop) {
    sections.push({
      number: sections.length + 1,
      title: "Weryfikacja wyników — nadzór człowieka",
      intro:
        "Treści i decyzje wytwarzane z udziałem AI traktujemy jako materiał roboczy, a nie gotowy wynik.",
      points: [
        "Każda treść lub rekomendacja wytworzona przez narzędzie AI musi zostać sprawdzona przez człowieka przed jej wykorzystaniem zewnętrznym lub przed podjęciem decyzji.",
        "Weryfikacja obejmuje co najmniej: poprawność merytoryczną, brak halucynacji (zmyślonych faktów), zgodność z politykami organizacji oraz brak naruszeń praw osób trzecich.",
        "Pracownik wykorzystujący wynik AI ponosi odpowiedzialność za jego merytoryczną poprawność — narzędzie AI jest pomocą, a nie autorem.",
        "W procesach o wyższym ryzyku (decyzje wpływające na osoby fizyczne, dokumenty zewnętrzne, treści prawne) wymagana jest weryfikacja dwustopniowa.",
      ],
    });
  }

  // 6. Oznaczanie treści generowanych przez AI
  if (cfg.markAiContent) {
    sections.push({
      number: sections.length + 1,
      title: "Oznaczanie treści generowanych przez AI",
      points: [
        "Treści, które w całości lub w istotnej części powstały z udziałem narzędzia AI i są kierowane na zewnątrz organizacji, powinny być oznaczone — jawnie lub w sposób umożliwiający odbiorcy zorientowanie się co do źródła.",
        "Przy interakcjach z osobami zewnętrznymi (np. chatboty) należy poinformować rozmówcę, że komunikuje się z systemem AI (zgodnie z art. 50 AI Act).",
        "Treści typu deepfake — sztucznie wygenerowane obrazy, dźwięk lub wideo przedstawiające osoby lub zdarzenia — muszą być wyraźnie oznaczone jako sztuczne.",
        "Wewnętrzne dokumenty robocze, w których AI pomogło w redakcji, nie wymagają oznaczania, o ile zostały zweryfikowane przez autora.",
      ],
    });
  }

  // 7. Role i odpowiedzialności
  sections.push({
    number: sections.length + 1,
    title: "Role i odpowiedzialności",
    points: [
      `Zatwierdzanie nowych narzędzi AI oraz aktualizacja listy dopuszczonych narzędzi: ${approver}.`,
      `Nadzór nad przestrzeganiem polityki, przyjmowanie zgłoszeń i koordynacja działań naprawczych: ${overseer}.`,
      "Każdy pracownik odpowiada za przestrzeganie polityki w zakresie własnych obowiązków oraz za zgłaszanie zaobserwowanych naruszeń.",
      "Kierownictwo zapewnia środki i czas potrzebne do realizacji obowiązków wynikających z polityki (m.in. szkolenia, dostęp do narzędzi zatwierdzonych).",
    ],
  });

  // 8. Zgłaszanie incydentów i naruszeń
  sections.push({
    number: sections.length + 1,
    title: "Zgłaszanie incydentów i naruszeń",
    intro:
      "Szybkie zgłoszenie pozwala ograniczyć szkody i wyciągnąć wnioski na przyszłość. Zgłaszanie w dobrej wierze nie wiąże się z negatywnymi konsekwencjami.",
    points: [
      `Incydenty i potencjalne naruszenia zgłasza się pod adresem: ${incidentContact}.`,
      "Do incydentów zalicza się m.in.: wyciek danych do narzędzia AI niedopuszczonego do tego typu danych, użycie wyniku AI bez weryfikacji w sposób, który spowodował szkodę, próbę manipulacji wyniku narzędzia AI w celach niezgodnych z polityką.",
      "Po otrzymaniu zgłoszenia osoba nadzorująca dokonuje wstępnej oceny w ciągu 2 dni roboczych i podejmuje działania zaradcze proporcjonalne do skali zdarzenia.",
      "W przypadku incydentu mającego cechy naruszenia danych osobowych, postępuje się zgodnie z procedurą RODO obowiązującą w organizacji.",
    ],
  });

  // 9. Konsekwencje naruszenia polityki
  sections.push({
    number: sections.length + 1,
    title: "Konsekwencje naruszenia polityki",
    points: [
      cfg.consequences.trim() ||
        "Naruszenie zasad polityki może skutkować konsekwencjami przewidzianymi w regulaminie pracy.",
      "Konsekwencje są stosowane proporcjonalnie do skali naruszenia, jego skutków oraz tego, czy naruszenie było jednorazowe czy powtarzające się.",
      "Świadome obejście zabezpieczeń (np. używanie prywatnych kont do przetwarzania danych firmowych) traktowane jest jako naruszenie ciężkie.",
    ],
  });

  // 10. Kompetencje AI (Art. 4)
  if (cfg.trainingReference) {
    sections.push({
      number: sections.length + 1,
      title: "Kompetencje AI i szkolenia",
      intro:
        "AI Act (art. 4) wymaga, aby osoby pracujące z AI miały odpowiedni poziom kompetencji.",
      points: [
        "Organizacja zapewnia pracownikom korzystającym z narzędzi AI dostęp do materiałów wprowadzających (podstawy działania narzędzi, ograniczenia, ryzyka, zasady prywatności).",
        "Nowi pracownicy przechodzą zapoznanie z niniejszą polityką w ramach onboardingu.",
        "Co najmniej raz w roku organizacja aktualizuje materiały szkoleniowe w reakcji na zmiany w regulacjach i narzędziach.",
        "Pracownicy są zobowiązani do zgłaszania potrzeb szkoleniowych w obszarze AI.",
      ],
    });
  }

  // 11. Postanowienia końcowe
  sections.push({
    number: sections.length + 1,
    title: "Postanowienia końcowe",
    points: [
      "Polityka wchodzi w życie z dniem jej zatwierdzenia przez kierownictwo organizacji.",
      "Aktualna wersja polityki jest dostępna dla wszystkich pracowników w intranecie lub innym kanale używanym przez organizację.",
      "Pytania dotyczące interpretacji polityki kieruje się do osoby odpowiedzialnej za politykę.",
      "Polityka stanowi punkt wyjścia — w razie wątpliwości prawnych zaleca się konsultację ze specjalistą.",
    ],
  });

  return sections;
}
