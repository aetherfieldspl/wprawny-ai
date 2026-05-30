"use client";

import { useState } from "react";
import type { YesNoQuestion } from "@/lib/questions";

interface Props {
  question: YesNoQuestion;
  value: boolean | undefined;
  onChange: (v: boolean) => void;
  index: number;
}

export function QuestionCard({ question, value, onChange, index }: Props) {
  const [openHelp, setOpenHelp] = useState(false);
  const hasHelp = Boolean(question.helper || question.example);

  return (
    <div className="rounded-xl2 border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3">
        <span className="legal-ref mt-1 shrink-0 rounded-md bg-brand/8 px-2 py-1 text-brand">
          {question.legalRef}
        </span>
        <p className="text-[15px] font-medium leading-snug text-ink">
          <span className="text-ink-soft">{index}. </span>
          {question.text}
        </p>
      </div>

      {hasHelp && (
        <div className="ml-0 mt-3">
          <button
            type="button"
            onClick={() => setOpenHelp((o) => !o)}
            className="text-sm font-medium text-brand underline underline-offset-2"
            aria-expanded={openHelp}
          >
            {openHelp ? "Ukryj wyjaśnienie" : "Co to znaczy?"}
          </button>
          {openHelp && (
            <div className="mt-2 rounded-lg border border-line bg-paper/60 p-3 text-sm leading-relaxed text-ink-soft">
              {question.helper && <p>{question.helper}</p>}
              {question.example && (
                <p className="mt-2">
                  <span className="font-semibold text-ink">Przykład: </span>
                  {question.example}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <Choice active={value === true} onClick={() => onChange(true)} label="Tak" tone="yes" />
        <Choice active={value === false} onClick={() => onChange(false)} label="Nie" tone="no" />
      </div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  label,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  tone: "yes" | "no";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
        active
          ? tone === "yes"
            ? "border-brand bg-brand text-paper"
            : "border-ink bg-ink text-paper"
          : "border-line bg-card text-ink-soft hover:border-ink"
      }`}
    >
      {label}
    </button>
  );
}
