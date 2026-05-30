"use client";

import { useMemo, useState } from "react";
import type { AuditAnswers } from "@/lib/types";
import { emptyAnswers, classify } from "@/lib/classifier";
import { ProgressRail } from "./ProgressRail";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { GateStep } from "./steps/GateStep";
import { ProfileStep } from "./steps/ProfileStep";
import { RoleStep } from "./steps/RoleStep";
import { UsageStep } from "./steps/UsageStep";
import { YesNoBlock } from "./steps/YesNoBlock";
import { GpaiStep } from "./steps/GpaiStep";
import { Art4Step } from "./steps/Art4Step";
import { ResultScreen } from "./ResultScreen";
import {
  ART5_QUESTIONS,
  ANNEX_III_QUESTIONS,
  ANNEX_III_EXEMPTION,
  ART50_QUESTIONS,
} from "@/lib/questions";

type StepId =
  | "gate"
  | "profile"
  | "role"
  | "usage"
  | "art5"
  | "annexIII"
  | "gpai"
  | "art50"
  | "art4"
  | "result";

interface StepDef {
  id: StepId;
  label: string;
}

export function AuditWizard() {
  const [answers, setAnswers] = useState<AuditAnswers>(emptyAnswers());
  const [index, setIndex] = useState(0);

  const isProvider = answers.roles.includes("provider") || answers.roles.includes("unsure");

  // Lista kroków budowana dynamicznie — blok GPAI tylko dla dostawcy.
  const steps = useMemo<StepDef[]>(() => {
    const base: StepDef[] = [
      { id: "gate", label: "Start" },
      { id: "profile", label: "Profil organizacji" },
      { id: "role", label: "Twoja rola" },
      { id: "usage", label: "Zastosowanie AI" },
      { id: "art5", label: "Praktyki zakazane" },
      { id: "annexIII", label: "Wysokie ryzyko" },
    ];
    if (isProvider) base.push({ id: "gpai", label: "Modele GPAI" });
    base.push(
      { id: "art50", label: "Przejrzystość" },
      { id: "art4", label: "Kompetencje AI" },
      { id: "result", label: "Wynik" }
    );
    return base;
  }, [isProvider]);

  const clampedIndex = Math.min(index, steps.length - 1);
  const step = steps[clampedIndex];
  const railLabels = steps.map((s) => s.label);

  function patch(p: Partial<AuditAnswers>) {
    setAnswers((a) => ({ ...a, ...p }));
  }

  function goNext() {
    // Skrót: jeśli na bramce odpowiedź „Nie” → prosto do wyniku (poza zakresem).
    if (step.id === "gate" && answers.usesAiInEu === false) {
      setIndex(steps.length - 1);
      return;
    }
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  // Walidacja minimalna — kiedy wolno przejść dalej.
  const canAdvance = (() => {
    switch (step.id) {
      case "gate":
        return answers.usesAiInEu !== null;
      case "role":
        return answers.roles.length > 0;
      case "art5":
        return ART5_QUESTIONS.every((q) => q.id in answers.art5);
      case "annexIII":
        return ANNEX_III_QUESTIONS.every((q) => q.id in answers.annexIII);
      case "gpai":
        return answers.gpaiIsGpai !== null && (answers.gpaiIsGpai === false || answers.gpaiSystemicRisk !== null);
      case "art50":
        return ART50_QUESTIONS.every((q) => q.id in answers.art50);
      case "art4":
        return answers.art4HasProgram !== null;
      default:
        return true; // profile, usage — opcjonalne
    }
  })();

  const result = useMemo(() => classify(answers), [answers]);
  const isResult = step.id === "result";

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <header className="mb-8 flex items-center justify-between">
        <Logo />
        <span className="legal-ref hidden text-ink-soft sm:block">
          Audyt gotowości na AI Act
        </span>
      </header>

      <div className="grid gap-8 md:grid-cols-[230px_1fr]">
        <aside className="md:sticky md:top-8 md:self-start">
          <ProgressRail steps={railLabels} current={clampedIndex} />
        </aside>

        <main className="min-w-0">
          <div key={step.id} className="animate-rise">
            {step.id === "gate" && (
              <GateStep value={answers.usesAiInEu} onChange={(v) => patch({ usesAiInEu: v })} />
            )}
            {step.id === "profile" && (
              <ProfileStep
                sector={answers.sector}
                size={answers.size}
                onChange={(p) => patch(p)}
              />
            )}
            {step.id === "role" && (
              <RoleStep roles={answers.roles} onChange={(roles) => patch({ roles })} />
            )}
            {step.id === "usage" && (
              <UsageStep
                description={answers.useDescription}
                categories={answers.useCategories}
                onChange={(p) => patch(p)}
              />
            )}
            {step.id === "art5" && (
              <YesNoBlock
                title="Praktyki zakazane"
                lead="To najpoważniejsza kategoria. Jedno „tak” oznacza, że zastosowanie jest co do zasady zabronione w UE."
                questions={ART5_QUESTIONS}
                answers={answers.art5}
                onChange={(art5) => patch({ art5 })}
              />
            )}
            {step.id === "annexIII" && (
              <YesNoBlock
                title="Systemy wysokiego ryzyka"
                lead="Czy AI działa w jednym z obszarów, które AI Act traktuje jako wysokiego ryzyka?"
                questions={ANNEX_III_QUESTIONS}
                answers={answers.annexIII}
                onChange={(annexIII) => patch({ annexIII })}
                exemption={ANNEX_III_EXEMPTION}
                exemptionValue={answers.annexIII[ANNEX_III_EXEMPTION.id]}
              />
            )}
            {step.id === "gpai" && (
              <GpaiStep
                isGpai={answers.gpaiIsGpai}
                systemicRisk={answers.gpaiSystemicRisk}
                onChange={(p) => patch(p)}
              />
            )}
            {step.id === "art50" && (
              <YesNoBlock
                title="Obowiązki przejrzystości"
                lead="Nawet przy niższym ryzyku może istnieć obowiązek poinformowania ludzi, że mają do czynienia z AI."
                questions={ART50_QUESTIONS}
                answers={answers.art50}
                onChange={(art50) => patch({ art50 })}
              />
            )}
            {step.id === "art4" && (
              <Art4Step
                value={answers.art4HasProgram}
                onChange={(v) => patch({ art4HasProgram: v })}
              />
            )}
            {step.id === "result" && <ResultScreen answers={answers} result={result} />}
          </div>

          {!isResult && (
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={goBack} disabled={clampedIndex === 0}>
                ← Wstecz
              </Button>
              <Button onClick={goNext} disabled={!canAdvance}>
                Dalej →
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
