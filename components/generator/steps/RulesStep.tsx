"use client";

import type { PolicyConfig } from "@/lib/policy/types";
import { StepHeading } from "@/components/audit/steps/StepHeading";

export function RulesStep({
  cfg,
  patch,
}: {
  cfg: PolicyConfig;
  patch: (p: Partial<PolicyConfig>) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Zasady działania"
        lead="Weryfikacja wyników, oznaczanie treści, role, incydenty, konsekwencje. Te elementy budują „mięśnie” polityki."
      />

      <div className="space-y-6">
        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold text-ink">Jakość i przejrzystość</h3>
          <div className="mt-4 space-y-3">
            <Toggle
              checked={cfg.humanInTheLoop}
              onChange={(v) => patch({ humanInTheLoop: v })}
              title="Weryfikacja wyników przez człowieka (human-in-the-loop)"
              hint="Wyniki AI traktowane są jako materiał roboczy; przed użyciem sprawdza je człowiek. Wymóg standardowy w bezpiecznej polityce."
            />
            <Toggle
              checked={cfg.markAiContent}
              onChange={(v) => patch({ markAiContent: v })}
              title="Oznaczanie treści generowanych przez AI"
              hint="Treści zewnętrzne, deepfake i interakcje chatbotowe są oznaczane — spójne z art. 50 AI Act."
            />
          </div>
        </div>

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold text-ink">Role i odpowiedzialności</h3>
          <p className="mt-1 text-xs text-ink-soft">
            Jeśli pole zostawisz puste, wpiszemy ogólny zwrot „osoba wskazana przez kierownictwo”.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Kto zatwierdza nowe narzędzia AI"
              value={cfg.roles.approver}
              onChange={(v) => patch({ roles: { ...cfg.roles, approver: v } })}
              placeholder="np. Dyrektor ds. operacyjnych"
            />
            <Field
              label="Kto nadzoruje przestrzeganie polityki"
              value={cfg.roles.overseer}
              onChange={(v) => patch({ roles: { ...cfg.roles, overseer: v } })}
              placeholder="np. Inspektor ochrony danych"
            />
          </div>
        </div>

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold text-ink">Zgłaszanie incydentów</h3>
          <p className="mt-1 text-xs text-ink-soft">
            Punkt kontaktowy do zgłoszeń wycieków danych, błędów AI, prób manipulacji.
          </p>
          <div className="mt-4">
            <Field
              label="Kanał zgłoszeń"
              value={cfg.incidents.contact}
              onChange={(v) =>
                patch({ incidents: { ...cfg.incidents, contact: v } })
              }
              placeholder="np. ai-incident@firma.pl albo intranet → formularz"
            />
          </div>
        </div>

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold text-ink">Konsekwencje naruszenia</h3>
          <p className="mt-1 text-xs text-ink-soft">
            Wpisz krótko, jakie konsekwencje grożą za naruszenie polityki.
            Możesz odwołać się do regulaminu pracy.
          </p>
          <textarea
            value={cfg.consequences}
            onChange={(e) => patch({ consequences: e.target.value })}
            rows={4}
            className="mt-3 w-full rounded-lg border border-line bg-paper/40 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
          />
        </div>

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <Toggle
            checked={cfg.trainingReference}
            onChange={(v) => patch({ trainingReference: v })}
            title="Dołącz sekcję o kompetencjach AI (Art. 4)"
            hint="Punkt o szkoleniach i kompetencjach AI — wymóg z Art. 4 AI Act. Rekomendowane dla każdego pracodawcy."
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-line bg-paper/40 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        checked ? "border-brand bg-brand/5" : "border-line bg-paper/30 hover:border-ink"
      }`}
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
