// lib/policy/types.ts
// Domena generatora polityki AI (Produkt B). Czysty TypeScript.

import type { CompanySize } from "@/lib/types";

export interface PolicyConfig {
  // G2 — dane organizacji
  org: {
    name: string;
    sector: string;
    size: CompanySize | null;
    responsiblePerson: string;
    responsibleRole: string;
  };

  // G3.1 — dozwolone narzędzia
  tools: {
    /** Lista narzędzi AI dozwolonych w organizacji. */
    allowed: string[];
    /** Czy każde nowe narzędzie wymaga zatwierdzenia. */
    requireApproval: boolean;
  };

  // G3.2 — zakazy przetwarzania danych w narzędziach AI
  // true = zakaz wprowadzania tej kategorii do narzędzi AI.
  dataProhibitions: {
    personal: boolean;       // dane osobowe klientów
    sensitive: boolean;      // dane wrażliwe
    tradeSecrets: boolean;   // tajemnice przedsiębiorstwa
    sourceCode: boolean;     // kod źródłowy do publicznych modeli
  };

  // G3.3 — wymóg weryfikacji (human-in-the-loop)
  humanInTheLoop: boolean;

  // G3.4 — oznaczanie treści generowanych przez AI
  markAiContent: boolean;

  // G3.5 — role i odpowiedzialności
  roles: {
    /** Kto zatwierdza nowe narzędzia AI. */
    approver: string;
    /** Kto nadzoruje przestrzeganie polityki. */
    overseer: string;
  };

  // G3.6 — zgłaszanie incydentów
  incidents: {
    /** Komu (kanał) zgłaszać incydenty. */
    contact: string;
  };

  // G3.7 — konsekwencje naruszenia
  consequences: string;

  // G3.8 — odniesienie do kompetencji (Art. 4)
  trainingReference: boolean;
}
