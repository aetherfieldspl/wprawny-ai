import Link from "next/link";

export function CourseHeader({ crumb }: { crumb?: string }) {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link href="/kurs-chinskiego" className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className="font-han grid h-8 w-8 place-items-center rounded-lg bg-brand text-lg text-paper"
        >
          中
        </span>
        <span className="font-display text-lg font-medium tracking-tight text-ink">
          Podstawy <span className="text-brand">chińskiego</span>
        </span>
      </Link>
      {crumb && <span className="legal-ref text-ink-soft">{crumb}</span>}
    </header>
  );
}
