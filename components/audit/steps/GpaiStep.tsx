"use client";

import { GPAI_QUESTIONS } from "@/lib/questions";
import { QuestionCard } from "../QuestionCard";
import { StepHeading } from "./StepHeading";

export function GpaiStep({
  isGpai,
  systemicRisk,
  onChange,
}: {
  isGpai: boolean | null;
  systemicRisk: boolean | null;
  onChange: (p: { gpaiIsGpai?: boolean; gpaiSystemicRisk?: boolean }) => void;
}) {
  const [q1, q2] = GPAI_QUESTIONS;

  return (
    <div>
      <StepHeading
        title="Modele ogólnego przeznaczenia (GPAI)"
        lead="Pokazujemy ten krok, bo wskazano rolę dostawcy. Modele GPAI mają osobny zestaw obowiązków, dokładany niezależnie od kategorii ryzyka."
      />

      <div className="space-y-3">
        <QuestionCard
          question={q1}
          value={isGpai ?? undefined}
          onChange={(v) => onChange({ gpaiIsGpai: v })}
          index={1}
        />
        {isGpai === true && (
          <div className="animate-rise">
            <QuestionCard
              question={q2}
              value={systemicRisk ?? undefined}
              onChange={(v) => onChange({ gpaiSystemicRisk: v })}
              index={2}
            />
          </div>
        )}
      </div>
    </div>
  );
}
