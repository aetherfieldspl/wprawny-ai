import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <header className="flex items-center justify-between py-6">
        <Logo />
        <a
          href="https://wprawny.pl"
          className="text-sm font-medium text-ink-soft hover:text-ink"
        >
          wprawny.pl ↗
        </a>
      </header>

      {/* HERO */}
      <section className="grid items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <div>
          <p className="legal-ref mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Darmowy audyt · ok. 5 minut
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl md:text-6xl">
            Sprawdź, jak{" "}
            <span className="italic text-brand">AI Act</span> dotyczy Twojej
            organizacji.
          </h1>
          <p className="mt-5 max-w-prose2 text-lg leading-relaxed text-ink-soft">
            Odpowiadasz na kilka prostych pytań, a my klasyfikujemy Twoje systemy AI,
            wskazujemy konkretne obowiązki i przygotowujemy raport PDF. Bez żargonu,
            bez zobowiązań.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <Link href="/audyt">
              <Button className="px-8 py-4 text-base">Rozpocznij audyt →</Button>
            </Link>
            <p className="text-xs text-ink-soft">
              To narzędzie edukacyjne — daje ocenę wstępną, nie poradę prawną.
            </p>
          </div>
        </div>

        {/* Wizualna ilustracja kategorii ryzyka */}
        <div className="rounded-xl2 border bg-card p-6 shadow-lift">
          <p className="legal-ref mb-4 text-ink-soft">Cztery kategorie ryzyka</p>
          <ul className="space-y-3">
            {[
              { c: "var(--risk-prohibited)", t: "Zakazane", d: "Art. 5 — praktyki niedozwolone" },
              { c: "var(--risk-high)", t: "Wysokie ryzyko", d: "Załącznik III — najwięcej obowiązków" },
              { c: "var(--risk-limited)", t: "Ograniczone", d: "Art. 50 — obowiązki przejrzystości" },
              { c: "var(--risk-minimal)", t: "Minimalne", d: "Dobre praktyki" },
            ].map((r) => (
              <li
                key={r.t}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper/40 p-3"
              >
                <span
                  className="h-9 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: r.c }}
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{r.t}</p>
                  <p className="text-xs text-ink-soft">{r.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CO DOSTANIESZ */}
      <section className="py-10">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Co otrzymasz
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Klasyfikację",
              d: "Jasny wynik: do której kategorii ryzyka trafia Twój system i co to oznacza.",
            },
            {
              t: "Listę obowiązków",
              d: "Konkretną checklistę „co zrobić”, dopasowaną do Twojej roli i kategorii.",
            },
            {
              t: "Raport PDF",
              d: "Dokument do pobrania i przekazania zespołowi — z kalendarzem AI Act.",
            },
          ].map((f) => (
            <div key={f.t} className="rounded-xl2 border bg-card p-5 shadow-card">
              <h3 className="font-display text-lg font-medium text-ink">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZAUFANIE */}
      <section className="my-12 rounded-xl2 border bg-card p-6 shadow-card sm:p-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <Trust t="Dane w UE" d="Przetwarzanie na terenie Unii. Minimalizacja danych." />
          <Trust t="Bez treningu na Twoich danych" d="Nie używamy Twoich odpowiedzi do trenowania modeli." />
          <Trust t="Logika audytowalna" d="Klasyfikacja to przejrzyste reguły, nie czarna skrzynka." />
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Zacznij teraz — to zajmie 5 minut
        </h2>
        <div className="mt-6 flex justify-center">
          <Link href="/audyt">
            <Button className="px-8 py-4 text-base">Rozpocznij audyt →</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Trust({ t, d }: { t: string; d: string }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="text-brand">✓</span>
        {t}
      </p>
      <p className="mt-1 text-sm text-ink-soft">{d}</p>
    </div>
  );
}
