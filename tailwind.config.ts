import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        brand: "var(--brand)",
        "brand-dark": "var(--brand-dark)",
        accent: "var(--accent)",
        line: "var(--line)",
        card: "var(--card)",
        // Risk palette — never used as the *only* signal (always paired with icon + label)
        "risk-prohibited": "var(--risk-prohibited)",
        "risk-high": "var(--risk-high)",
        "risk-limited": "var(--risk-limited)",
        "risk-minimal": "var(--risk-minimal)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,20,40,0.04), 0 8px 24px -12px rgba(20,20,40,0.12)",
        lift: "0 2px 4px rgba(20,20,40,0.06), 0 18px 40px -16px rgba(20,20,40,0.22)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        prose2: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
