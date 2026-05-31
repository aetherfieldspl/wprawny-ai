"use client";

import type { PolicyConfig } from "@/lib/policy/types";
import type { CompanySize } from "@/lib/types";
import { SECTORS } from "@/lib/questions";
import { StepHeading } from "@/components/audit/steps/StepHeading";

const SIZES: { id: CompanySize; label: string; hint: string }[] = [
  { id: "micro", label: "Mikro", hint: "do 10 osób" },
  { id: "sme", label: "MŚP", hint: "10–250 osób" },
  { id: "large", label: "Duża", hint: "ponad 250 osób" },
];

export function OrgStep({
  org,
  onChange,
}: {
  org: PolicyConfig["org"];
  onChange: (p: Partial<PolicyConfig["org"]>) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Dane organizacji"
        lead="Te informacje wpisujemy w nagłówek dokumentu — możesz je później ręcznie podmienić."
      />

      <div className="space-y-5">
        <Field
          label="Nazwa organizacji"
          required
          value={org.name}
          onChange={(v) => onChange({ name: v })}
          placeholder="np. Acme sp. z o.o."
        />

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label className="text-sm font-semibold text-ink">Branża</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <Chip
                key={s}
                active={org.sector === s}
                onClick={() => onChange({ sector: s })}
              >
                {s}
              </Chip>
            ))}
          </div>
        </div>

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label className="text-sm font-semibold text-ink">Wielkość</label>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange({ size: s.id })}
                aria-pressed={org.size === s.id}
                className={`rounded-xl border px-3 py-4 text-center transition-all ${
                  org.size === s.id ? "border-brand bg-brand/5" : "border-line hover:border-ink"
                }`}
              >
                <span className="block text-sm font-semibold text-ink">{s.label}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{s.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Osoba odpowiedzialna"
            value={org.responsiblePerson}
            onChange={(v) => onChange({ responsiblePerson: v })}
            placeholder="Imię i nazwisko"
          />
          <Field
            label="Rola / stanowisko"
            value={org.responsibleRole}
            onChange={(v) => onChange({ responsibleRole: v })}
            placeholder="np. Inspektor ochrony danych"
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
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="rounded-xl2 border bg-card p-5 shadow-card">
      <label className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-lg border border-line bg-paper/40 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active ? "border-brand bg-brand text-paper" : "border-line text-ink-soft hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
