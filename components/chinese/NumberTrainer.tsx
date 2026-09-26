"use client";

import { useCallback, useEffect, useState } from "react";
import { toChinese } from "@/lib/chinese/numbers";
import { Button } from "@/components/ui/Button";
import { Speak } from "./Speak";

/** Losuje liczbę tak, żeby krótkie i długie liczby pojawiały się równie często. */
function randomNumber(max: number): number {
  const maxDigits = String(max).length;
  const digits = 1 + Math.floor(Math.random() * maxDigits);
  const lo = digits === 1 ? 0 : 10 ** (digits - 1);
  const hi = Math.min(max, 10 ** digits - 1);
  const n = lo + Math.floor(Math.random() * (hi - lo + 1));
  // Co trzecia liczba „okrągła” z zerami w środku — ćwiczy 零.
  if (digits >= 3 && Math.random() < 0.33) {
    const s = String(n).split("");
    for (let i = 1; i < s.length - 1; i++) if (Math.random() < 0.5) s[i] = "0";
    return Number(s.join(""));
  }
  return n;
}

const fmt = (n: number) => n.toLocaleString("pl-PL");

export function NumberTrainer({ max, title }: { max: number; title?: string }) {
  const [target, setTarget] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"ok" | "bad" | "shown" | null>(null);
  const [streak, setStreak] = useState(0);

  const next = useCallback(() => {
    setTarget(randomNumber(max));
    setAnswer("");
    setResult(null);
  }, [max]);

  // Losujemy dopiero po stronie klienta — unikamy rozjazdu przy hydratacji.
  useEffect(() => next(), [next]);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (target === null || result) return;
    const ok = Number(answer.replace(/[\s.,]/g, "")) === target;
    setResult(ok ? "ok" : "bad");
    setStreak((s) => (ok ? s + 1 : 0));
  };

  const cn = target === null ? null : toChinese(target);

  return (
    <div className="rounded-xl2 border bg-card p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="legal-ref text-ink-soft">{title ?? "Trener liczebników"}</p>
        <p className="legal-ref text-ink-soft" aria-live="polite">
          Seria: <span className="font-semibold text-brand">{streak}</span>
        </p>
      </div>

      <div className="mt-4 flex min-h-[4.5rem] flex-wrap items-center gap-3">
        <p className="font-han break-all text-3xl text-ink sm:text-4xl">{cn?.hanzi ?? "…"}</p>
        {cn && <Speak text={cn.hanzi} />}
      </div>

      <form onSubmit={check} className="mt-4 flex flex-wrap items-center gap-3">
        <label htmlFor={`nt-${max}`} className="sr-only">
          Wpisz liczbę cyframi
        </label>
        <input
          id={`nt-${max}`}
          inputMode="numeric"
          autoComplete="off"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Wpisz cyframi…"
          disabled={!!result}
          className="w-48 rounded-full border border-line bg-paper px-4 py-2.5 font-mono text-ink outline-none focus:border-brand"
        />
        {!result ? (
          <>
            <Button type="submit" disabled={!answer.trim()}>
              Sprawdź
            </Button>
            <Button type="button" variant="ghost" onClick={() => setResult("shown")}>
              Pokaż
            </Button>
          </>
        ) : (
          <Button type="button" onClick={next}>
            Następna →
          </Button>
        )}
      </form>

      {result && target !== null && cn && (
        <div
          role="status"
          className={`mt-4 rounded-xl border p-3 text-sm ${result === "ok" ? "border-risk-minimal tint-ok" : result === "bad" ? "border-risk-prohibited tint-bad" : "border-line bg-paper"}`}
        >
          <p className="font-semibold text-ink">
            {result === "ok" ? "✓ Dobrze! " : result === "bad" ? "✗ Niestety. " : ""}
            To {fmt(target)}.
          </p>
          <p className="mt-1 text-ink-soft">
            Pinyin: <span className="text-ink">{cn.pinyin}</span>
          </p>
        </div>
      )}
    </div>
  );
}
