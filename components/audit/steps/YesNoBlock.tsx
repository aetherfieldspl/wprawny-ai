"use client";

import type { YesNoQuestion } from "@/lib/questions";
import { QuestionCard } from "../QuestionCard";
import { StepHeading } from "./StepHeading";

interface Props {
  title: string;
  lead: string;
  questions: YesNoQuestion[];
  answers: Record<string, boolean>;
  onChange: (next: Record<string, boolean>) => void;
  exemption?: YesNoQuestion;
  exemptionValue?: boolean;
}

export function YesNoBlock({
  title,
  lead,
  questions,
  answers,
  onChange,
  exemption,
  exemptionValue,
}: Props) {
  function set(id: string, v: boolean) {
    onChange({ ...answers, [id]: v });
  }

  const anyYes = questions.some((q) => answers[q.id] === true);

  return (
    <div>
      <StepHeading title={title} lead={lead} />

      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(v) => set(q.id, v)}
            index={i + 1}
          />
        ))}
      </div>

      {/* Pytanie pomocnicze o wyłączenie — pokazujemy tylko, gdy coś zaznaczono na „tak” */}
      {exemption && anyYes && (
        <div className="mt-5 rounded-xl2 border border-dashed border-brand/40 bg-brand/5 p-5">
          <p className="mb-3 text-sm font-semibold text-ink">
            Pytanie pomocnicze (możliwe wyłączenie)
          </p>
          <QuestionCard
            question={exemption}
            value={exemptionValue}
            onChange={(v) => set(exemption.id, v)}
            index={0}
          />
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Uwaga: nawet jeśli zaznaczysz „tak”, w tej wersji audytu nie obniżamy
            automatycznie klasyfikacji. Wyłączenie spod wysokiego ryzyka wymaga
            udokumentowanej oceny — oznaczymy to w raporcie jako temat do weryfikacji.
          </p>
        </div>
      )}
    </div>
  );
}
