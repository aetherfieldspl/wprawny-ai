import Link from "next/link";
import { LESSONS, MODULES } from "@/lib/chinese/lessons";
import { CourseHeader } from "@/components/chinese/CourseHeader";
import { CourseProgressBar, LessonStatus } from "@/components/chinese/CourseProgress";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Kurs podstaw chińskiego — 12 lekcji od zera",
  description:
    "Tony i wyjątki tonalne, pinyin, znaki jak puzzle, pisanie ręczne i cyfrowe, liczby do 99 999 999, zaimki i zwroty formalne oraz nieformalne.",
};

const PRINCIPLES = [
  {
    icon: "🌱",
    title: "Od totalnych podstaw",
    text: "Nie musisz mieć zielonego pojęcia o chińskim. Zaczynamy od fundamentów — tonów i pinyinu — bez których nie ma mowy o pójściu dalej.",
  },
  {
    icon: "🧩",
    title: "Skojarzenia i puzzle",
    text: "Nie wkuwamy znaków kreska po kresce. Rozbieramy je na mniejsze puzzle i budujemy skojarzenia, które zostają w głowie.",
  },
  {
    icon: "🔢",
    title: "Liczby aż do 99 999 999",
    text: "Od zera do prawie stu milionów — z interaktywnym trenerem, który sprawdzi Cię na losowych liczbach.",
  },
  {
    icon: "🙇",
    title: "Formalnie i nieformalnie",
    text: "Wiesz, jak powiedzieć „przepraszam”, gdy kogoś naprawdę zranisz — i gdy przypadkiem nadepniesz komuś na stopę w metrze.",
  },
];

export default function CoursePage() {
  const byNumber = new Map(LESSONS.map((l) => [l.number, l]));

  return (
    <div className="mx-auto max-w-5xl px-5">
      <CourseHeader />

      <section className="grid items-center gap-10 py-10 md:grid-cols-[1.15fr_0.85fr] md:py-16">
        <div className="animate-rise">
          <p className="legal-ref mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            12 lekcji · od zera · za darmo
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Podstawy <span className="italic text-brand">chińskiego</span>, które
            naprawdę zostają w głowie.
          </h1>
          <p className="mt-5 max-w-prose2 text-lg leading-relaxed text-ink-soft">
            Tony i ich wyjątki, pinyin, znaki rozbierane na puzzle, pisanie ręczne
            i na klawiaturze, budowanie słów, liczby, zaimki oraz zwroty formalne
            i nieformalne. Każda lekcja kończy się quizem.
          </p>
          <div className="mt-8">
            <Link href={`/kurs-chinskiego/${LESSONS[0].slug}`}>
              <Button className="px-8 py-4 text-base">Zacznij od lekcji 1 →</Button>
            </Link>
          </div>
          <CourseProgressBar total={LESSONS.length} />
        </div>

        <div className="rounded-xl2 border bg-card p-6 shadow-lift" aria-hidden>
          <p className="legal-ref mb-4 text-ink-soft">Znak jak puzzle</p>
          <div className="flex items-center justify-center gap-3">
            <span className="rounded-xl border border-line bg-paper px-4 py-3 text-center">
              <span className="font-han block text-4xl text-ink">女</span>
              <span className="text-xs text-ink-soft">kobieta</span>
            </span>
            <span className="text-2xl text-ink-soft">+</span>
            <span className="rounded-xl border border-line bg-paper px-4 py-3 text-center">
              <span className="font-han block text-4xl text-ink">子</span>
              <span className="text-xs text-ink-soft">dziecko</span>
            </span>
            <span className="text-2xl text-ink-soft">=</span>
            <span className="text-center">
              <span className="font-han block text-6xl text-brand">好</span>
              <span className="text-xs text-ink-soft">hǎo · dobrze</span>
            </span>
          </div>
          <p className="mt-5 text-center text-sm italic text-ink-soft">
            „Mama z dzieckiem — to jest dobre.”
          </p>
        </div>
      </section>

      <section className="py-8">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Założenia kursu</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-xl2 border bg-card p-5 shadow-card">
              <p className="text-2xl" aria-hidden>
                {p.icon}
              </p>
              <h3 className="mt-2 font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Program</h2>
        <div className="mt-6 space-y-10">
          {MODULES.map((m, mi) => (
            <div key={m.title}>
              <p className="legal-ref text-accent">Moduł {mi + 1}</p>
              <h3 className="font-display text-xl font-medium text-ink">{m.title}</h3>
              <p className="text-sm text-ink-soft">{m.description}</p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                {m.lessons.map((n) => {
                  const l = byNumber.get(n)!;
                  return (
                    <li key={l.slug}>
                      <Link
                        href={`/kurs-chinskiego/${l.slug}`}
                        className="group flex h-full gap-4 rounded-xl2 border bg-card p-4 shadow-card transition-colors hover:border-brand"
                      >
                        <span className="font-display text-3xl text-ink-soft group-hover:text-brand">
                          {String(l.number).padStart(2, "0")}
                        </span>
                        <span className="flex-1">
                          <span className="block font-semibold text-ink">{l.title}</span>
                          <span className="block text-sm text-ink-soft">{l.subtitle}</span>
                          <span className="mt-2 block">
                            <LessonStatus lesson={l.number} />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
