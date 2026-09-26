"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/chinese/types";
import { PASS_RATIO, saveQuizResult } from "@/lib/chinese/progress";
import { Button } from "@/components/ui/Button";

export function Quiz({ lesson, questions }: { lesson: number; questions: QuizQuestion[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const allAnswered = picked.every((p) => p !== null);
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const passed = score / questions.length >= PASS_RATIO;

  const check = () => {
    setChecked(true);
    saveQuizResult(lesson, score, questions.length);
  };

  const reset = () => {
    setPicked(questions.map(() => null));
    setChecked(false);
  };

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <fieldset key={qi} className="rounded-xl2 border bg-card p-5 shadow-card">
          <legend className="sr-only">Pytanie {qi + 1}</legend>
          <p className="font-semibold text-ink">
            <span className="legal-ref mr-2 text-ink-soft">{qi + 1}.</span>
            {q.q}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const selected = picked[qi] === oi;
              const correct = q.answer === oi;
              let tone = "border-line bg-paper hover:border-brand";
              if (checked && correct) tone = "border-risk-minimal tint-ok";
              else if (checked && selected) tone = "border-risk-prohibited tint-bad";
              else if (selected) tone = "border-brand tint-brand";
              return (
                <label
                  key={oi}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${tone} ${checked ? "cursor-default" : ""}`}
                >
                  <input
                    type="radio"
                    name={`q-${lesson}-${qi}`}
                    className="accent-[var(--brand)]"
                    checked={selected}
                    disabled={checked}
                    onChange={() =>
                      setPicked((prev) => prev.map((p, i) => (i === qi ? oi : p)))
                    }
                  />
                  <span>{opt}</span>
                  {checked && correct && (
                    <span className="ml-auto text-xs font-semibold text-risk-minimal">✓ poprawna</span>
                  )}
                  {checked && selected && !correct && (
                    <span className="ml-auto text-xs font-semibold text-risk-prohibited">✗ Twoja</span>
                  )}
                </label>
              );
            })}
          </div>
          {checked && (
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">
                {picked[qi] === q.answer ? "Dobrze! " : "Wyjaśnienie: "}
              </span>
              {q.explain}
            </p>
          )}
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        {!checked ? (
          <Button onClick={check} disabled={!allAnswered}>
            Sprawdź odpowiedzi
          </Button>
        ) : (
          <>
            <p
              className={`rounded-full px-4 py-2 text-sm font-semibold ${passed ? "tint-ok text-risk-minimal" : "tint-warn text-risk-limited"}`}
              role="status"
            >
              {passed ? "✓ Zaliczone" : "Jeszcze raz?"} — {score} / {questions.length}
            </p>
            <Button variant="secondary" onClick={reset}>
              Spróbuj ponownie
            </Button>
          </>
        )}
        {!checked && !allAnswered && (
          <p className="text-xs text-ink-soft">Odpowiedz na wszystkie pytania.</p>
        )}
      </div>
    </div>
  );
}
