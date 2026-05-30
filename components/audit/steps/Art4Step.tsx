"use client";

import { ART4_QUESTION } from "@/lib/questions";
import { QuestionCard } from "../QuestionCard";
import { StepHeading } from "./StepHeading";

export function Art4Step({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Kompetencje AI"
        lead="Ten obowiązek dotyczy praktycznie każdej organizacji, która dostarcza lub używa AI — niezależnie od kategorii ryzyka."
      />
      <QuestionCard
        question={ART4_QUESTION}
        value={value ?? undefined}
        onChange={onChange}
        index={1}
      />
    </div>
  );
}
