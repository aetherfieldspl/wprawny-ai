"use client";

import { useMemo, useState } from "react";
import type { PolicyConfig } from "@/lib/policy/types";
import { emptyPolicy } from "@/lib/policy/defaults";
import { ProgressRail } from "@/components/audit/ProgressRail";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { OrgStep } from "./steps/OrgStep";
import { ToolsStep } from "./steps/ToolsStep";
import { RulesStep } from "./steps/RulesStep";
import { PolicyPreview } from "./PolicyPreview";

type StepId = "intro" | "org" | "tools" | "rules" | "preview";

interface StepDef {
  id: StepId;
  label: string;
}

const STEPS: StepDef[] = [
  { id: "intro", label: "Start" },
  { id: "org", label: "Organizacja" },
  { id: "tools", label: "Narzędzia i dane" },
  { id: "rules", label: "Zasady działania" },
  { id: "preview", label: "Podgląd i pobranie" },
];

export function GeneratorWizard() {
  const [cfg, setCfg] = useState<PolicyConfig>(emptyPolicy());
  const [index, setIndex] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");

  const step = STEPS[index];
  const railLabels = useMemo(() => STEPS.map((s) => s.label), []);

  function patch(p: Partial<PolicyConfig>) {
    setCfg((c) => ({ ...c, ...p }));
  }

  const canAdvance = (() => {
    switch (step.id) {
      case "org":
        return cfg.org.name.trim().length > 0;
      default:
        return true;
    }
  })();

  function goNext() {
    setIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function goBack() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  async function handleDownload() {
    setDownloadStatus("loading");
    try {
      const res = await fetch("/api/policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: cfg }),
      });
      if (!res.ok) throw new Error("policy");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safe = (cfg.org.name || "organizacja")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40);
      a.download = `polityka-ai-${safe || "wprawny"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloadStatus("done");
    } catch {
      setDownloadStatus("error");
    }
  }

  const isPreview = step.id === "preview";

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <header className="mb-8 flex items-center justify-between">
        <Logo />
        <span className="legal-ref hidden text-ink-soft sm:block">
          Generator polityki AI
        </span>
      </header>

      <div className="grid gap-8 md:grid-cols-[230px_1fr]">
        <aside className="md:sticky md:top-8 md:self-start">
          <ProgressRail steps={railLabels} current={index} />
        </aside>

        <main className="min-w-0">
          <div key={step.id} className="animate-rise">
            {step.id === "intro" && <Intro />}
            {step.id === "org" && (
              <OrgStep
                org={cfg.org}
                onChange={(p) => patch({ org: { ...cfg.org, ...p } })}
              />
            )}
            {step.id === "tools" && (
              <ToolsStep
                tools={cfg.tools}
                dataProhibitions={cfg.dataProhibitions}
                onChangeTools={(p) => patch({ tools: { ...cfg.tools, ...p } })}
                onChangeData={(p) =>
                  patch({ dataProhibitions: { ...cfg.dataProhibitions, ...p } })
                }
              />
            )}
            {step.id === "rules" && <RulesStep cfg={cfg} patch={patch} />}
            {step.id === "preview" && (
              <PreviewWrapper
                cfg={cfg}
                status={downloadStatus}
                onDownload={handleDownload}
              />
            )}
          </div>

          {!isPreview ? (
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={goBack} disabled={index === 0}>
                ← Wstecz
              </Button>
              <Button onClick={goNext} disabled={!canAdvance}>
                Dalej →
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={goBack}>
                ← Wróć do edycji
              </Button>
              <Button
                onClick={handleDownload}
                disabled={downloadStatus === "loading"}
              >
                {downloadStatus === "loading"
                  ? "Generuję…"
                  : "Pobierz PDF (wersja demo) ↓"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
        Polityka korzystania z AI dla pracowników
      </h2>
      <p className="mt-3 max-w-prose2 text-[15px] leading-relaxed text-ink-soft">
        Wygeneruj wewnętrzny dokument, który porządkuje zasady używania
        narzędzi AI w Twojej organizacji. Odpowiedź na problem „shadow AI”.
        Zajmie to około 5 minut.
      </p>

      <div className="mt-6 rounded-xl2 border bg-card p-6 shadow-card">
        <p className="text-sm font-semibold text-ink">Co dostaniesz</p>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          <li className="flex gap-2">
            <span className="text-brand">●</span>
            <span>Polityka skrojona pod organizację — gotowa do zatwierdzenia.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand">●</span>
            <span>Zakazy danych, weryfikacja, oznaczanie treści, role, incydenty, konsekwencje, kompetencje (Art. 4).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-brand">●</span>
            <span>Pobranie w PDF. Wersja demonstracyjna zawiera znak wodny „PROJEKT”.</span>
          </li>
        </ul>
      </div>

      <p className="mt-6 max-w-prose2 text-xs text-ink-soft">
        Generator to szablon roboczy — wymaga dostosowania do realiów Twojej
        organizacji i weryfikacji prawnej przed wdrożeniem. Nie stanowi porady
        prawnej.
      </p>
    </div>
  );
}

function PreviewWrapper({
  cfg,
  status,
  onDownload,
}: {
  cfg: PolicyConfig;
  status: "idle" | "loading" | "done" | "error";
  onDownload: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl2 border-2 border-brand/30 bg-brand/5 p-6 shadow-card">
        <h2 className="font-display text-xl font-medium text-ink">
          Twoja polityka jest gotowa
        </h2>
        <p className="mt-2 max-w-prose2 text-sm leading-relaxed text-ink-soft">
          Poniżej widzisz pełną treść. Pobierz PDF, dostosuj do realiów
          organizacji i daj prawnikowi do weryfikacji przed wdrożeniem.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={onDownload} disabled={status === "loading"}>
            {status === "loading" ? "Generuję…" : "Pobierz PDF ↓"}
          </Button>
          <a href="https://wprawny.pl" target="_blank" rel="noreferrer">
            <Button variant="secondary">Przegląd ekspercki na wprawny.pl →</Button>
          </a>
        </div>
        {status === "done" && (
          <p className="mt-3 text-sm text-risk-minimal">Gotowe — PDF pobrany.</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-risk-prohibited">
            Coś poszło nie tak. Spróbuj ponownie.
          </p>
        )}
      </div>

      <PolicyPreview cfg={cfg} />
    </div>
  );
}
