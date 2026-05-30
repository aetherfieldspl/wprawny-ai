export function StepHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">{title}</h2>
      {lead && <p className="mt-2 max-w-prose2 text-[15px] leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  );
}
