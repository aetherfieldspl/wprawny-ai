"use client";

interface Props {
  steps: string[];
  current: number;
}

export function ProgressRail({ steps, current }: Props) {
  const pct = Math.round((current / (steps.length - 1)) * 100);
  return (
    <div>
      {/* Mobile: pasek + licznik */}
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between text-xs text-ink-soft">
          <span className="font-semibold text-ink">{steps[current]}</span>
          <span>
            {current + 1} / {steps.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Desktop: lista kroków */}
      <ol className="hidden md:block">
        {steps.map((label, i) => {
          const state = i < current ? "done" : i === current ? "active" : "todo";
          return (
            <li key={label} className="flex items-center gap-3 py-1.5">
              <span
                className={`rail-dot grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                  state === "done"
                    ? "bg-brand text-paper"
                    : state === "active"
                    ? "border-2 border-brand text-brand"
                    : "border border-line text-ink-soft"
                }`}
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <span
                className={`text-sm ${
                  state === "active"
                    ? "font-semibold text-ink"
                    : state === "done"
                    ? "text-ink-soft"
                    : "text-ink-soft/70"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
