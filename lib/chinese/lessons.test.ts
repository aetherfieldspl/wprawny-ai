// lib/chinese/lessons.test.ts
// Spójność danych kursu — łapie literówki w strukturze lekcji.
import { describe, it, expect } from "vitest";
import { LESSONS, MODULES, getLesson } from "./lessons";

describe("kurs podstaw chińskiego — struktura", () => {
  it("ma 12 lekcji numerowanych po kolei", () => {
    expect(LESSONS).toHaveLength(12);
    LESSONS.forEach((l, i) => expect(l.number).toBe(i + 1));
  });

  it("slugi są unikalne, zaczynają się numerem i da się je odnaleźć", () => {
    const slugs = LESSONS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const l of LESSONS) {
      expect(l.slug).toMatch(new RegExp(`^${String(l.number).padStart(2, "0")}-[a-z0-9-]+$`));
      expect(getLesson(l.slug)?.number).toBe(l.number);
    }
  });

  it("moduły obejmują każdą lekcję dokładnie raz", () => {
    const all = MODULES.flatMap((m) => m.lessons).sort((a, b) => a - b);
    expect(all).toEqual(LESSONS.map((l) => l.number));
  });
});

describe("kurs podstaw chińskiego — treść", () => {
  for (const l of LESSONS) {
    it(`lekcja ${l.number}: cele, bloki, quiz i praktyka są kompletne`, () => {
      expect(l.goals.length).toBeGreaterThan(0);
      expect(l.blocks.length).toBeGreaterThan(0);
      expect(l.practice.length).toBeGreaterThan(0);
      expect(l.quiz.length).toBeGreaterThan(3);
      for (const q of l.quiz) {
        expect(q.answer).toBeGreaterThan(-1);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(new Set(q.options).size).toBe(q.options.length);
      }
    });

    it(`lekcja ${l.number}: tabele mają równe wiersze`, () => {
      for (const b of l.blocks) {
        if (b.kind !== "table") continue;
        for (const row of b.rows) expect(row).toHaveLength(b.headers.length);
      }
    });
  }

  it("lekcje z liczebnikami mają trener liczb", () => {
    const withTrainer = LESSONS.filter((l) =>
      l.blocks.some((b) => b.kind === "numberTrainer")
    ).map((l) => l.number);
    expect(withTrainer).toEqual([9, 10]);
  });
});
