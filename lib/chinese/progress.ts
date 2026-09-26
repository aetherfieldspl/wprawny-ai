// lib/chinese/progress.ts
// Postęp kursu zapisywany lokalnie w przeglądarce (bez kont i bez serwera).
// Każdy dostęp do localStorage w try/catch — tryb prywatny / zablokowane dane
// nie mogą wysypać strony.

const KEY = "kurs-chinskiego:v1";

/** Próg zaliczenia quizu. */
export const PASS_RATIO = 0.8;

export type Progress = Record<number, { best: number; total: number }>;

export function readProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function saveQuizResult(lesson: number, score: number, total: number): void {
  try {
    const p = readProgress();
    const prev = p[lesson];
    if (!prev || score > prev.best) {
      p[lesson] = { best: score, total };
      window.localStorage.setItem(KEY, JSON.stringify(p));
    }
  } catch {
    /* brak dostępu do storage — postęp po prostu się nie zapisze */
  }
}

export function isPassed(entry: { best: number; total: number } | undefined): boolean {
  return !!entry && entry.best / entry.total >= PASS_RATIO;
}
