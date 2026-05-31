"use client";

import { useMemo } from "react";
import type { PolicyConfig } from "@/lib/policy/types";
import { buildPolicy } from "@/lib/policy/template";

export function PolicyPreview({ cfg }: { cfg: PolicyConfig }) {
  const sections = useMemo(() => buildPolicy(cfg), [cfg]);
  const orgName = cfg.org.name.trim() || "[Nazwa organizacji]";

  return (
    <article className="relative overflow-hidden rounded-xl2 border bg-card p-6 shadow-card sm:p-8">
      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
      >
        <span className="-rotate-[20deg] font-display text-7xl font-bold text-line/60 opacity-50">
          PROJEKT
        </span>
      </span>

      <div className="relative">
        <p className="legal-ref mb-2 text-ink-soft">Podgląd dokumentu</p>
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Polityka korzystania z AI
        </h2>
        <p className="mt-1 text-sm text-ink-soft">w organizacji {orgName}</p>

        <div className="mt-6 space-y-6">
          {sections.map((s) => (
            <section key={s.number}>
              <h3 className="font-display text-base font-semibold text-brand">
                §{s.number}. {s.title}
              </h3>
              {s.intro && (
                <p className="mt-1 text-sm italic text-ink-soft">{s.intro}</p>
              )}
              <ol className="mt-2 space-y-1.5">
                {s.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <span className="legal-ref shrink-0 text-brand">
                      {s.number}.{i + 1}
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <p className="mt-8 rounded-lg bg-paper/60 p-3 text-xs leading-relaxed text-ink-soft">
          Dokument w wersji demonstracyjnej zawiera znak wodny „PROJEKT”.
          To szablon roboczy — wymaga weryfikacji prawnej przed wdrożeniem.
        </p>
      </div>
    </article>
  );
}
