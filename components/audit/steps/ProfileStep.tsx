"use client";

import type { CompanySize } from "@/lib/types";
import { SECTORS } from "@/lib/questions";
import { StepHeading } from "./StepHeading";

const SIZES: { id: CompanySize; label: string; hint: string }[] = [
  { id: "micro", label: "Mikro", hint: "do 10 osób" },
  { id: "sme", label: "MŚP", hint: "10–250 osób" },
  { id: "large", label: "Duża", hint: "ponad 250 osób" },
];

export function ProfileStep({
  sector,
  size,
  onChange,
}: {
  sector: string | null;
  size: CompanySize | null;
  onChange: (p: { sector?: string; size?: CompanySize }) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Profil organizacji"
        lead="To pomaga nam dopasować raport. Te dane nie wpływają na samą klasyfikację ryzyka — możesz je pominąć."
      />

      <div className="space-y-6">
        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label className="text-sm font-semibold text-ink">Branża</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <Chip key={s} active={sector === s} onClick={() => onChange({ sector: s })}>
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
                aria-pressed={size === s.id}
                className={`rounded-xl border px-3 py-4 text-center transition-all ${
                  size === s.id ? "border-brand bg-brand/5" : "border-line hover:border-ink"
                }`}
              >
                <span className="block text-sm font-semibold text-ink">{s.label}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{s.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
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
