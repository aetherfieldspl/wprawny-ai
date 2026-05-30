export function DisclaimerBar() {
  return (
    <footer className="mt-20 border-t border-line bg-card/60">
      <div className="mx-auto max-w-5xl px-5 py-6">
        <p className="text-xs leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Zastrzeżenie.</span>{" "}
          wprawny.ai to narzędzie edukacyjne. Daje ocenę wstępną i dokument roboczy,
          a <span className="font-semibold">nie poradę prawną</span>. Wynik zależy od
          podanych przez Ciebie informacji i nie zastępuje analizy prawnej. W razie
          wątpliwości skonsultuj się z ekspertem.{" "}
          <a href="https://wprawny.pl" className="text-brand underline underline-offset-2">
            Umów konsultację na wprawny.pl
          </a>
          .
        </p>
        <p className="mt-2 text-[11px] text-ink-soft/70">
          © {new Date().getFullYear()} wprawny.ai · Dane przetwarzane w UE ·
          Bez trenowania modeli na Twoich danych.
        </p>
      </div>
    </footer>
  );
}
