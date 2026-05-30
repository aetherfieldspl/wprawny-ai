"use client";

import { useMemo, useState } from "react";
import type { AuditAnswers, ClassificationResult } from "@/lib/types";
import { RiskBadge, RISK_META } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";

export function ResultScreen({
  answers,
  result,
}: {
  answers: AuditAnswers;
  result: ClassificationResult;
}) {
  // Pasek gotowości — użytkownik zaznacza obowiązki, które już spełnia.
  const [done, setDone] = useState<Record<string, boolean>>({});
  const total = result.obligations.length;
  const completed = result.obligations.filter((o) => done[o.id]).length;
  const readiness = total === 0 ? 100 : Math.round((completed / total) * 100);

  const meta = RISK_META[result.level];

  return (
    <div className="space-y-8">
      {/* HERO wyniku */}
      <section
        className="rounded-xl2 border bg-card p-6 shadow-card sm:p-8"
        style={{ borderColor: meta.color }}
      >
        <p className="legal-ref mb-3 text-ink-soft">Wynik audytu</p>
        <RiskBadge level={result.level} />
        <p className="mt-4 max-w-prose2 font-display text-xl leading-snug text-ink sm:text-2xl">
          {result.headline}
        </p>

        {answers.roles.length > 0 && (
          <p className="mt-3 text-sm text-ink-soft">
            Rola w ocenie:{" "}
            <span className="font-semibold text-ink">{roleLabel(answers.roles)}</span>
            {result.gpaiAttached && " · doklejono obowiązki GPAI"}
          </p>
        )}
      </section>

      {/* DLACZEGO — transparentność decyzji */}
      {result.triggers.length > 0 && (
        <section className="rounded-xl2 border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-medium text-ink">Dlaczego ten wynik?</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Klasyfikację wywołały te odpowiedzi „tak”:
          </p>
          <ul className="mt-3 space-y-2">
            {result.triggers.map((t) => (
              <li key={t.questionId} className="flex gap-2 text-sm text-ink">
                <span style={{ color: meta.color }} className="mt-0.5">
                  ●
                </span>
                {t.label}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* PASEK GOTOWOŚCI + checklista obowiązków */}
      {total > 0 && (
        <section className="rounded-xl2 border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h3 className="font-display text-lg font-medium text-ink">
                Twoje obowiązki — checklista
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Zaznacz, co już macie wdrożone. Pasek pokaże poziom gotowości.
              </p>
            </div>
            <span className="font-display text-2xl font-semibold" style={{ color: meta.color }}>
              {readiness}%
            </span>
          </div>

          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${readiness}%`, backgroundColor: meta.color }}
            />
          </div>

          <ul className="space-y-2">
            {result.obligations.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => setDone((d) => ({ ...d, [o.id]: !d[o.id] }))}
                  aria-pressed={!!done[o.id]}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    done[o.id] ? "border-brand bg-brand/5" : "border-line bg-paper/30 hover:border-ink"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[11px] ${
                      done[o.id] ? "border-brand bg-brand text-paper" : "border-line"
                    }`}
                  >
                    {done[o.id] ? "✓" : ""}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-ink">{o.title}</span>
                      <span className="legal-ref rounded bg-brand/8 px-1.5 py-0.5 text-brand">
                        {o.legalRef}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                      {o.detail}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 rounded-lg bg-paper/60 p-3 text-xs leading-relaxed text-ink-soft">
            Lista obowiązków to draft oparty na strukturze AI Act i podlega weryfikacji
            prawnej. Traktuj ją jako punkt wyjścia, nie jako wiążącą ocenę.
          </p>
        </section>
      )}

      {/* OŚ CZASU */}
      <Timeline />

      {/* BRAMA E-MAIL → PDF */}
      <ReportGate answers={answers} result={result} />

      {/* UPSELL */}
      <Upsell level={result.level} />
    </div>
  );
}

function roleLabel(roles: AuditAnswers["roles"]): string {
  const map: Record<string, string> = {
    provider: "Dostawca",
    deployer: "Podmiot stosujący",
    importer_distributor: "Importer / Dystrybutor",
    unsure: "Nieokreślona (pełny obraz)",
  };
  return roles.map((r) => map[r]).join(", ");
}

function Timeline() {
  const items = [
    { date: "2 lutego 2025", text: "Zakazy praktyk z Art. 5 i obowiązek kompetencji AI (Art. 4)." },
    { date: "2 sierpnia 2025", text: "Obowiązki dla modeli ogólnego przeznaczenia (GPAI)." },
    { date: "2 sierpnia 2026", text: "Główny pakiet obowiązków dla systemów wysokiego ryzyka (Załącznik III)." },
    { date: "2 sierpnia 2027", text: "Wysokie ryzyko powiązane z produktami (Załącznik I)." },
  ];
  return (
    <section className="rounded-xl2 border bg-card p-6 shadow-card">
      <h3 className="font-display text-lg font-medium text-ink">Kalendarz AI Act</h3>
      <p className="mt-1 text-sm text-ink-soft">
        AI Act wchodzi w życie etapami. Najważniejsze daty:
      </p>
      <ol className="mt-4 space-y-3 border-l-2 border-line pl-5">
        {items.map((it) => (
          <li key={it.date} className="relative">
            <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-brand bg-paper" />
            <p className="text-sm font-semibold text-ink">{it.date}</p>
            <p className="text-sm text-ink-soft">{it.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-ink-soft/70">
        Daty orientacyjne — przy publikacji zweryfikuj aktualny harmonogram i wytyczne.
      </p>
    </section>
  );
}

function ReportGate({
  answers,
  result,
}: {
  answers: AuditAnswers;
  result: ClassificationResult;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const valid = /\S+@\S+\.\S+/.test(email) && consent;

  async function handleDownload() {
    setStatus("loading");
    try {
      // 1) zapis leada (zgoda marketingowa)
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, level: result.level, sector: answers.sector }),
      });
      // 2) generowanie i pobranie PDF
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, result, email }),
      });
      if (!res.ok) throw new Error("report");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "audyt-ai-act-wprawny.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-xl2 border-2 border-brand/30 bg-brand/5 p-6 shadow-card sm:p-8">
      <h3 className="font-display text-xl font-medium text-ink">Pobierz pełny raport PDF</h3>
      <p className="mt-2 max-w-prose2 text-sm leading-relaxed text-ink-soft">
        Raport zawiera klasyfikację, Twoją rolę, pełną listę obowiązków, kalendarz AI Act
        i rekomendowane kroki. Podaj e-mail, a wyślemy też kopię.
      </p>

      <div className="mt-5 max-w-md space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twoj@email.pl"
          className="w-full rounded-lg border border-line bg-card p-3 text-sm text-ink outline-none focus:border-brand"
        />
        <label className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            Zgadzam się na otrzymanie raportu na podany adres i na kontakt marketingowy
            wprawny.ai / wprawny.pl. Zgodę mogę wycofać w każdej chwili.
          </span>
        </label>
        <Button onClick={handleDownload} disabled={!valid || status === "loading"}>
          {status === "loading" ? "Generuję…" : "Pobierz raport PDF"}
        </Button>
        {status === "done" && (
          <p className="text-sm text-risk-minimal">Gotowe — raport został pobrany.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-risk-prohibited">
            Coś poszło nie tak przy generowaniu. Spróbuj ponownie.
          </p>
        )}
      </div>
    </section>
  );
}

function Upsell({ level }: { level: ClassificationResult["level"] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl2 border bg-card p-6 shadow-card">
        <h4 className="font-display text-lg font-medium text-ink">
          Wygeneruj politykę korzystania z AI
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Gotowy dokument dla pracowników — odpowiedź na „shadow AI”. Konfigurujesz
          w kilka minut, pobierasz w PDF i DOCX.
        </p>
        <a href="/generator" className="mt-4 inline-block">
          <Button variant="secondary">Przejdź do generatora →</Button>
        </a>
      </div>
      <div className="rounded-xl2 border bg-card p-6 shadow-card">
        <h4 className="font-display text-lg font-medium text-ink">
          {level === "prohibited" ? "Pilna konsultacja ekspercka" : "Przegląd ekspercki"}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {level === "prohibited"
            ? "Wynik wskazuje praktykę zakazaną. Umów rozmowę z ekspertem, zanim podejmiesz decyzje."
            : "Chcesz pewności? Ekspert wprawny.pl zweryfikuje klasyfikację i obowiązki dla Twojej sytuacji."}
        </p>
        <a href="https://wprawny.pl" className="mt-4 inline-block">
          <Button>Umów rozmowę na wprawny.pl →</Button>
        </a>
      </div>
    </section>
  );
}
