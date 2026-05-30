export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-paper"
      >
        {/* Stylizowany „kątownik” — porządek / zgodność */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3v10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 10l2.2-3.2L10.5 9 13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-display text-lg font-medium tracking-tight text-ink">
        wprawny<span className="text-brand">.ai</span>
      </span>
    </a>
  );
}
