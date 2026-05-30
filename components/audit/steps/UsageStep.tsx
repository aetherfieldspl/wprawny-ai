"use client";

import { USE_CATEGORIES } from "@/lib/questions";
import { StepHeading } from "./StepHeading";

export function UsageStep({
  description,
  categories,
  onChange,
}: {
  description: string;
  categories: string[];
  onChange: (p: { useDescription?: string; useCategories?: string[] }) => void;
}) {
  function toggleCat(c: string) {
    onChange({
      useCategories: categories.includes(c)
        ? categories.filter((x) => x !== c)
        : [...categories, c],
    });
  }

  return (
    <div>
      <StepHeading
        title="Do czego używacie AI?"
        lead="Krótki opis pomoże nam (i ekspertowi przy weryfikacji) zrozumieć kontekst. To pole jest opcjonalne."
      />

      <div className="space-y-6">
        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label htmlFor="usedesc" className="text-sm font-semibold text-ink">
            Opis zastosowania
          </label>
          <textarea
            id="usedesc"
            value={description}
            onChange={(e) => onChange({ useDescription: e.target.value })}
            rows={3}
            placeholder="np. Chatbot na stronie obsługujący zapytania klientów i generujący odpowiedzi."
            className="mt-3 w-full resize-none rounded-lg border border-line bg-paper/40 p-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-brand"
          />
        </div>

        <div className="rounded-xl2 border bg-card p-5 shadow-card">
          <label className="text-sm font-semibold text-ink">Kategorie zastosowania</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {USE_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCat(c)}
                aria-pressed={categories.includes(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  categories.includes(c)
                    ? "border-brand bg-brand text-paper"
                    : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
