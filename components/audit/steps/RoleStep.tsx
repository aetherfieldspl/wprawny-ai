"use client";

import { useState } from "react";
import type { Role } from "@/lib/types";
import { StepHeading } from "./StepHeading";

const ROLES: { id: Role; label: string; def: string }[] = [
  {
    id: "provider",
    label: "Dostawca",
    def: "Tworzysz system AI albo oznaczasz cudzy system własną marką i udostępniasz go innym.",
  },
  {
    id: "deployer",
    label: "Podmiot stosujący",
    def: "Używasz w swojej działalności systemu AI dostarczonego przez kogoś innego.",
  },
  {
    id: "importer_distributor",
    label: "Importer / Dystrybutor",
    def: "Wprowadzasz na rynek UE lub udostępniasz system AI pochodzący od innego podmiotu.",
  },
  {
    id: "unsure",
    label: "Nie wiem",
    def: "Pokażemy Ci pełny obraz — obowiązki dostawcy i podmiotu stosującego — żebyś mógł się zorientować.",
  },
];

export function RoleStep({
  roles,
  onChange,
}: {
  roles: Role[];
  onChange: (r: Role[]) => void;
}) {
  const [openDefs, setOpenDefs] = useState(false);

  function toggle(id: Role) {
    // „Nie wiem” jest wyłączające
    if (id === "unsure") {
      onChange(roles.includes("unsure") ? [] : ["unsure"]);
      return;
    }
    const next = roles.filter((r) => r !== "unsure");
    onChange(next.includes(id) ? next.filter((r) => r !== id) : [...next, id]);
  }

  return (
    <div>
      <StepHeading
        title="Jaką rolę pełnisz wobec systemu AI?"
        lead="To najważniejsze pytanie — rola decyduje o tym, jakie obowiązki Cię dotyczą. Możesz zaznaczyć więcej niż jedną."
      />

      <button
        type="button"
        onClick={() => setOpenDefs((o) => !o)}
        className="mb-4 text-sm font-medium text-brand underline underline-offset-2"
      >
        {openDefs ? "Ukryj definicje" : "Nie znasz różnicy? Zobacz definicje"}
      </button>

      <div className="grid gap-3 sm:grid-cols-2">
        {ROLES.map((r) => {
          const active = roles.includes(r.id);
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => toggle(r.id)}
              aria-pressed={active}
              className={`rounded-xl2 border p-5 text-left transition-all ${
                active ? "border-brand bg-brand/5 shadow-card" : "border-line bg-card hover:border-ink"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-ink">{r.label}</span>
                <span
                  className={`grid h-5 w-5 place-items-center rounded-md border text-[11px] ${
                    active ? "border-brand bg-brand text-paper" : "border-line"
                  }`}
                >
                  {active ? "✓" : ""}
                </span>
              </div>
              {openDefs && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.def}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
