import type { Block } from "@/lib/chinese/types";
import { Speak } from "./Speak";
import { ToneChart } from "./ToneChart";
import { NumberTrainer } from "./NumberTrainer";

// Znaki han w tekście dostają font CJK. Dzielimy tekst na fragmenty han / nie-han.
const HAN = /([\p{Script=Han}〇]+)/u;

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(HAN).map((part, i) =>
        HAN.test(part) ? (
          <span key={i} className="font-han">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

const CALLOUT = {
  tip: { icon: "💡", label: "Wskazówka", cls: "border-brand tint-brand" },
  warning: { icon: "⚠️", label: "Uwaga", cls: "border-risk-limited tint-warn" },
  memory: { icon: "🧩", label: "Skojarzenie", cls: "border-accent bg-card" },
} as const;

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <section className="prose-legal space-y-3">
          {block.title && (
            <h2 className="font-display text-2xl font-medium text-ink">{block.title}</h2>
          )}
          {block.body.map((p, i) => (
            <p key={i} className="text-ink">
              <Rich text={p} />
            </p>
          ))}
        </section>
      );

    case "callout": {
      const c = CALLOUT[block.variant];
      return (
        <aside className={`rounded-xl2 border-l-4 p-5 ${c.cls}`}>
          <p className="font-semibold text-ink">
            <span aria-hidden className="mr-2">
              {c.icon}
            </span>
            <span className="sr-only">{c.label}: </span>
            {block.title}
          </p>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink">
            {block.body.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </aside>
      );
    }

    case "table":
      return (
        <section>
          {block.title && (
            <h3 className="mb-3 font-display text-xl font-medium text-ink">{block.title}</h3>
          )}
          <div className="overflow-x-auto rounded-xl2 border bg-card shadow-card">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-paper">
                  {block.headers.map((h, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-semibold text-ink-soft">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b last:border-b-0">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 align-top text-ink ${block.hanziCols?.includes(ci) ? "text-lg" : ""}`}
                      >
                        <Rich text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    case "words":
      return (
        <section>
          {block.title && (
            <h3 className="mb-3 font-display text-xl font-medium text-ink">{block.title}</h3>
          )}
          <ul className="grid gap-3 sm:grid-cols-2">
            {block.items.map((w) => (
              <li
                key={w.hanzi + w.pinyin}
                className="flex items-start gap-3 rounded-xl border border-line bg-card p-3"
              >
                <span className="font-han min-w-[3.5rem] text-2xl leading-tight text-ink">
                  {w.hanzi}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-brand">{w.pinyin}</span>
                  <span className="block text-sm text-ink">{w.pl}</span>
                  {w.note && (
                    <span className="mt-0.5 block text-xs text-ink-soft">
                      <Rich text={w.note} />
                    </span>
                  )}
                </span>
                <Speak text={w.hanzi} />
              </li>
            ))}
          </ul>
        </section>
      );

    case "puzzles":
      return (
        <section>
          {block.title && (
            <h3 className="mb-3 font-display text-xl font-medium text-ink">{block.title}</h3>
          )}
          <ul className="grid gap-4 sm:grid-cols-2">
            {block.items.map((p) => (
              <li key={p.hanzi} className="rounded-xl2 border bg-card p-4 shadow-card">
                <div className="flex flex-wrap items-center gap-2">
                  {p.parts.map((part, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="text-ink-soft">+</span>}
                      <span className="rounded-lg border border-line bg-paper px-2 py-1 text-center">
                        <span className="font-han block text-xl text-ink">{part.part}</span>
                        <span className="block text-[11px] text-ink-soft">{part.pl}</span>
                      </span>
                    </span>
                  ))}
                  <span className="text-ink-soft">=</span>
                  <span className="font-han text-3xl text-brand">{p.hanzi}</span>
                  <Speak text={p.hanzi.replace(/\s*\/\s*/g, "，")} className="ml-auto" />
                </div>
                <p className="mt-3 text-sm">
                  <span className="font-semibold text-ink">{p.pinyin}</span>
                  <span className="text-ink-soft"> — {p.pl}</span>
                </p>
                <p className="mt-1 text-sm italic text-ink">„{p.story}”</p>
              </li>
            ))}
          </ul>
        </section>
      );

    case "tones":
      return <ToneChart />;

    case "numberTrainer":
      return <NumberTrainer max={block.max} title={block.title} />;
  }
}

export function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-10">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}
