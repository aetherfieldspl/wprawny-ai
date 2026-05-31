"use client";

import { useState } from "react";
import type { PolicyConfig } from "@/lib/policy/types";
import { SUGGESTED_TOOLS } from "@/lib/policy/defaults";
import { StepHeading } from "@/components/audit/steps/StepHeading";

export function ToolsStep({
  tools,
  dataProhibitions,
  onChangeTools,
  onChangeData,
}: {
  tools: PolicyConfig["tools"];
  dataProhibitions: PolicyConfig["dataProhibitions"];
  onChangeTools: (p: Partial<PolicyConfig["tools"]>) => void;
  onChangeData: (p: Partial<PolicyConfig["dataProhibitions"]>) => void;
}) {
  const [custom, setCustom] = useState("");

  function addTool(name: string) {
    const trimmed = name.trim();
    if (!trimmed || tools.allowed.includes(trimmed)) return;
    onChangeTools({ allowed: [...tools.allowed, trimmed] });
  }
  function removeTool(name: string) {
    onChangeTools({ allowed: tools.allowed.filter((t) => t !== name) });
  }

  return (
    <div>
      <StepHeading
        title="Narzędzia i dane"
        lead="Jakie narzędzia AI dopuszczasz i czego pracownicy NIE mogą do nich wprowadzać."
      />

      <div className="space-y-6">
        {/* Dozwolone narzędzia */}
        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label className="text-sm font-semibold text-ink">
            Dozwolone narzędzia AI
          </label>
          <p className="mt-1 text-xs text-ink-soft">
            Wybierz z propozycji lub dodaj własne. Lista trafi do polityki jako
            punkt §3.
          </p>

          {tools.allowed.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tools.allowed.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-brand bg-brand/5 px-3 py-1.5 text-sm text-brand"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTool(t)}
                    aria-label={`Usuń ${t}`}
                    className="text-brand/70 hover:text-brand"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Propozycje
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTED_TOOLS.filter((t) => !tools.allowed.includes(t)).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => addTool(t)}
                className="rounded-full border border-line bg-paper/40 px-3 py-1.5 text-sm text-ink-soft hover:border-ink hover:text-ink"
              >
                + {t}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTool(custom);
                  setCustom("");
                }
              }}
              placeholder="Własne narzędzie…"
              className="flex-1 rounded-lg border border-line bg-paper/40 px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
            <button
              type="button"
              onClick={() => {
                addTool(custom);
                setCustom("");
              }}
              className="rounded-lg border border-line bg-card px-4 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Dodaj
            </button>
          </div>

          <Toggle
            className="mt-5"
            checked={tools.requireApproval}
            onChange={(v) => onChangeTools({ requireApproval: v })}
            title="Nowe narzędzia wymagają zatwierdzenia"
            hint="Pracownik nie może sam dodać kolejnego narzędzia AI bez zgody osoby wskazanej w polityce."
          />
        </div>

        {/* Zakazy danych */}
        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label className="text-sm font-semibold text-ink">
            Czego NIE wolno wprowadzać do narzędzi AI
          </label>
          <p className="mt-1 text-xs text-ink-soft">
            Każdy zaznaczony punkt trafia jako zakaz do polityki (§4).
            Bezpieczna domyślna konfiguracja zakazuje wszystkich czterech.
          </p>
          <div className="mt-4 space-y-3">
            <Toggle
              checked={dataProhibitions.personal}
              onChange={(v) => onChangeData({ personal: v })}
              title="Dane osobowe klientów i kontrahentów"
              hint="Imiona, e-maile, telefony, identyfikatory — bez zaakceptowanej umowy powierzenia (DPA)."
            />
            <Toggle
              checked={dataProhibitions.sensitive}
              onChange={(v) => onChangeData({ sensitive: v })}
              title="Dane wrażliwe (art. 9 RODO)"
              hint="Zdrowie, pochodzenie, przekonania, dane biometryczne."
            />
            <Toggle
              checked={dataProhibitions.tradeSecrets}
              onChange={(v) => onChangeData({ tradeSecrets: v })}
              title="Tajemnice przedsiębiorstwa"
              hint="Plany strategiczne, dane finansowe nieopublikowane, know-how, dokumenty klientów."
            />
            <Toggle
              checked={dataProhibitions.sourceCode}
              onChange={(v) => onChangeData({ sourceCode: v })}
              title="Zastrzeżony kod źródłowy"
              hint="Kod źródłowy organizacji — w publicznych narzędziach AI bez trybu enterprise."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  hint,
  className = "",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  hint?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        checked ? "border-brand bg-brand/5" : "border-line bg-paper/30 hover:border-ink"
      } ${className}`}
    >
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[11px] ${
          checked ? "border-brand bg-brand text-paper" : "border-line"
        }`}
      >
        {checked ? "✓" : ""}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        {hint && <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{hint}</span>}
      </span>
    </button>
  );
}
