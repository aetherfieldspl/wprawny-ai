"use client";

import { StepHeading } from "./StepHeading";

export function GateStep({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <StepHeading
        title="Zacznijmy od podstaw"
        lead="Kilka pytań o tym, jak Twoja organizacja korzysta z AI. Zajmie to około 5 minut. Nie zbieramy danych do momentu, aż sam(a) zdecydujesz się pobrać raport."
      />

      <div className="rounded-xl2 border bg-card p-6 shadow-card">
        <p className="text-[15px] font-medium text-ink">
          Czy Twoja organizacja oferuje, wprowadza na rynek lub używa systemu AI na
          terenie Unii Europejskiej?
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          „System AI” obejmuje też gotowe narzędzia, których używacie wewnętrznie —
          np. asystentów, generatory treści czy systemy analityczne.
        </p>
        <div className="mt-5 flex gap-3">
          <Big active={value === true} onClick={() => onChange(true)}>
            Tak
          </Big>
          <Big active={value === false} onClick={() => onChange(false)}>
            Nie
          </Big>
        </div>
        {value === false && (
          <p className="mt-4 rounded-lg bg-paper/70 p-3 text-sm text-ink-soft">
            Jeśli nie używacie AI na rynku UE, AI Act prawdopodobnie Was nie obejmuje.
            Pokażemy krótkie podsumowanie i wskażemy, na co jeszcze warto zwrócić uwagę
            (np. RODO).
          </p>
        )}
      </div>
    </div>
  );
}

function Big({
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
      className={`flex-1 rounded-xl border px-6 py-4 text-base font-semibold transition-all ${
        active ? "border-brand bg-brand text-paper" : "border-line bg-card text-ink-soft hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
