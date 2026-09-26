// lib/chinese/types.ts
// Model danych kursu podstaw chińskiego. Treść lekcji to czyste dane (bez JSX),
// dzięki czemu łatwo ją testować i redagować.

/** Pojedyncze słowo / wyrażenie ze słowniczka. */
export interface Word {
  hanzi: string;
  pinyin: string;
  pl: string;
  /** Skojarzenie, uwaga o użyciu, rejestr (formalne/nieformalne)… */
  note?: string;
}

/** Znak rozebrany na „puzzle” — części składowe + historyjka do zapamiętania. */
export interface Puzzle {
  hanzi: string;
  pinyin: string;
  pl: string;
  parts: { part: string; pl: string }[];
  story: string;
}

export type Block =
  | { kind: "text"; title?: string; body: string[] }
  | {
      kind: "callout";
      variant: "tip" | "warning" | "memory";
      title: string;
      body: string[];
    }
  | {
      kind: "table";
      title?: string;
      headers: string[];
      rows: string[][];
      /** Indeksy kolumn zawierających chińskie znaki (większa czcionka). */
      hanziCols?: number[];
    }
  | { kind: "words"; title?: string; items: Word[] }
  | { kind: "puzzles"; title?: string; items: Puzzle[] }
  | { kind: "tones" }
  | { kind: "numberTrainer"; title?: string; max: number };

export interface QuizQuestion {
  q: string;
  options: string[];
  /** Indeks poprawnej odpowiedzi w `options`. */
  answer: number;
  explain: string;
}

export interface Lesson {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  /** Po tej lekcji będziesz umieć… */
  goals: string[];
  blocks: Block[];
  quiz: QuizQuestion[];
  /** Zadanie domowe / praktyka na co dzień. */
  practice: string[];
}
