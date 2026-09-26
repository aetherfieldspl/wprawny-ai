// Wykres przebiegu tonów w skali 1–5 (skala Chao). Każdy ton ma kolor ORAZ etykietę.

const TONES = [
  { n: 1, mark: "ā", label: "wysoki, równy", from: 5, via: null, to: 5, color: "var(--tone-1)" },
  { n: 2, mark: "á", label: "wznoszący", from: 3, via: null, to: 5, color: "var(--tone-2)" },
  { n: 3, mark: "ǎ", label: "w dół i w górę", from: 2, via: 1, to: 4, color: "var(--tone-3)" },
  { n: 4, mark: "à", label: "ostro opadający", from: 5, via: null, to: 1, color: "var(--tone-4)" },
] as const;

const W = 120;
const H = 110;
const PAD = 14;
const y = (level: number) => PAD + ((5 - level) / 4) * (H - 2 * PAD);

export function ToneChart() {
  return (
    <figure className="rounded-xl2 border bg-card p-5 shadow-card">
      <figcaption className="legal-ref mb-4 text-ink-soft">
        Przebieg tonów — wysokość głosu w skali 1 (nisko) – 5 (wysoko)
      </figcaption>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {TONES.map((t) => {
          const d =
            t.via === null
              ? `M ${PAD} ${y(t.from)} L ${W - PAD} ${y(t.to)}`
              : // punkt kontrolny tak, by dołek krzywej wypadł dokładnie na poziomie `via`
                `M ${PAD} ${y(t.from)} Q ${W / 2} ${2 * y(t.via) - (y(t.from) + y(t.to)) / 2} ${W - PAD} ${y(t.to)}`;
          return (
            <div key={t.n} className="rounded-xl border border-line bg-paper p-3">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="h-auto w-full"
                role="img"
                aria-label={`Ton ${t.n}: ${t.label}, od poziomu ${t.from} do ${t.to}`}
              >
                {[1, 2, 3, 4, 5].map((lv) => (
                  <g key={lv}>
                    <line
                      x1={PAD}
                      x2={W - PAD}
                      y1={y(lv)}
                      y2={y(lv)}
                      stroke="var(--line)"
                      strokeDasharray={lv === 3 ? "0" : "2 3"}
                    />
                    <text x={2} y={y(lv) + 3} fontSize="8" fill="var(--ink-soft)">
                      {lv}
                    </text>
                  </g>
                ))}
                <path d={d} fill="none" stroke={t.color} strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="mt-2 text-center">
                <span className="font-display text-2xl" style={{ color: t.color }}>
                  {t.mark}
                </span>
                <span className="ml-2 text-sm font-semibold text-ink">{t.n}. ton</span>
              </p>
              <p className="text-center text-xs text-ink-soft">{t.label}</p>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
