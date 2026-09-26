import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/lib/chinese/lessons";
import { CourseHeader } from "@/components/chinese/CourseHeader";
import { LessonBlocks } from "@/components/chinese/LessonBlocks";
import { Quiz } from "@/components/chinese/Quiz";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const lesson = getLesson((await params).slug);
  if (!lesson) return {};
  return {
    title: `Lekcja ${lesson.number}: ${lesson.title} — kurs podstaw chińskiego`,
    description: lesson.subtitle,
  };
}

export default async function LessonPage({ params }: { params: Params }) {
  const lesson = getLesson((await params).slug);
  if (!lesson) notFound();

  const prev = LESSONS[lesson.number - 2];
  const next = LESSONS[lesson.number];

  return (
    <div className="mx-auto max-w-3xl px-5">
      <CourseHeader crumb={`Lekcja ${lesson.number} z ${LESSONS.length}`} />

      <article>
        <header className="animate-rise py-8">
          <p className="legal-ref text-accent">Lekcja {lesson.number}</p>
          <h1 className="mt-1 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{lesson.subtitle}</p>

          <div className="mt-6 rounded-xl2 border bg-card p-5 shadow-card">
            <p className="legal-ref text-ink-soft">Po tej lekcji:</p>
            <ul className="mt-2 space-y-1.5">
              {lesson.goals.map((g) => (
                <li key={g} className="flex gap-2 text-sm text-ink">
                  <span className="text-brand" aria-hidden>
                    ✓
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <LessonBlocks blocks={lesson.blocks} />

        <section className="mt-14" aria-labelledby="quiz">
          <h2 id="quiz" className="font-display text-2xl font-medium text-ink">
            Sprawdź się
          </h2>
          <p className="mb-5 mt-1 text-sm text-ink-soft">
            Zaliczenie od 80% poprawnych odpowiedzi. Wynik zapisuje się tylko w Twojej przeglądarce.
          </p>
          <Quiz lesson={lesson.number} questions={lesson.quiz} />
        </section>

        <section className="mt-12 rounded-xl2 border-l-4 border-accent bg-card p-5">
          <h2 className="font-display text-xl font-medium text-ink">Praktyka na co dzień</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink">
            {lesson.practice.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      </article>

      <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Nawigacja między lekcjami">
        {prev ? (
          <Link
            href={`/kurs-chinskiego/${prev.slug}`}
            className="rounded-xl2 border bg-card p-4 shadow-card transition-colors hover:border-brand"
          >
            <span className="legal-ref text-ink-soft">← Lekcja {prev.number}</span>
            <span className="block font-semibold text-ink">{prev.title}</span>
          </Link>
        ) : (
          <Link
            href="/kurs-chinskiego"
            className="rounded-xl2 border bg-card p-4 shadow-card transition-colors hover:border-brand"
          >
            <span className="legal-ref text-ink-soft">← Program</span>
            <span className="block font-semibold text-ink">Wszystkie lekcje</span>
          </Link>
        )}
        {next ? (
          <Link
            href={`/kurs-chinskiego/${next.slug}`}
            className="rounded-xl2 border bg-card p-4 text-right shadow-card transition-colors hover:border-brand"
          >
            <span className="legal-ref text-ink-soft">Lekcja {next.number} →</span>
            <span className="block font-semibold text-ink">{next.title}</span>
          </Link>
        ) : (
          <Link
            href="/kurs-chinskiego"
            className="rounded-xl2 border bg-card p-4 text-right shadow-card transition-colors hover:border-brand"
          >
            <span className="legal-ref text-ink-soft">Koniec kursu 🎉</span>
            <span className="block font-semibold text-ink">Wróć do programu</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
