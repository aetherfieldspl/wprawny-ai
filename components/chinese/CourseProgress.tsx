"use client";

import { useEffect, useState } from "react";
import { isPassed, readProgress, type Progress } from "@/lib/chinese/progress";

/** Znacznik „zaliczone” przy lekcji — czyta postęp z localStorage po stronie klienta. */
export function LessonStatus({ lesson }: { lesson: number }) {
  const [progress, setProgress] = useState<Progress>({});
  useEffect(() => setProgress(readProgress()), []);

  const entry = progress[lesson];
  if (!entry) return null;
  return isPassed(entry) ? (
    <span className="legal-ref rounded-full px-2 py-0.5 tint-ok text-risk-minimal">
      ✓ zaliczone {entry.best}/{entry.total}
    </span>
  ) : (
    <span className="legal-ref rounded-full px-2 py-0.5 tint-warn text-risk-limited">
      quiz {entry.best}/{entry.total}
    </span>
  );
}

/** Pasek postępu całego kursu. */
export function CourseProgressBar({ total }: { total: number }) {
  const [done, setDone] = useState<number | null>(null);
  useEffect(() => {
    const p = readProgress();
    setDone(Object.values(p).filter(isPassed).length);
  }, []);

  if (done === null) return null;
  const pct = Math.round((done / total) * 100);
  return (
    <div className="mt-6 max-w-sm">
      <div className="flex justify-between text-xs text-ink-soft">
        <span>Twój postęp</span>
        <span>
          {done} / {total} lekcji
        </span>
      </div>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
