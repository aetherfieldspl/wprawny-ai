import type { RiskLevel } from "@/lib/types";

interface RiskMeta {
  label: string;
  short: string;
  color: string;
  /** Symbol kształtu — rozróżnialny bez koloru (dostępność). */
  Icon: () => JSX.Element;
}

const Octagon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z" stroke="currentColor" strokeWidth="2" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const Triangle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l9 16H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 9v5M12 16.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const Diamond = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l9 9-9 9-9-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 8v4M12 15v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Dash = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const RISK_META: Record<RiskLevel, RiskMeta> = {
  prohibited: {
    label: "Praktyka zakazana",
    short: "Zakazane",
    color: "var(--risk-prohibited)",
    Icon: Octagon,
  },
  high: {
    label: "Wysokie ryzyko",
    short: "Wysokie",
    color: "var(--risk-high)",
    Icon: Triangle,
  },
  limited: {
    label: "Ograniczone — obowiązki przejrzystości",
    short: "Ograniczone",
    color: "var(--risk-limited)",
    Icon: Diamond,
  },
  minimal: {
    label: "Minimalne ryzyko",
    short: "Minimalne",
    color: "var(--risk-minimal)",
    Icon: Check,
  },
  not_applicable: {
    label: "Prawdopodobnie poza zakresem AI Act",
    short: "Poza zakresem",
    color: "var(--ink-soft)",
    Icon: Dash,
  },
};

export function RiskBadge({ level, size = "md" }: { level: RiskLevel; size?: "sm" | "md" }) {
  const m = RISK_META[level];
  const pad = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-semibold ${pad}`}
      style={{ color: m.color, borderColor: m.color, backgroundColor: `${m.color}12` }}
    >
      <m.Icon />
      {m.label}
    </span>
  );
}
