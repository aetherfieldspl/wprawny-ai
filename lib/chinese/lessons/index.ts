// lib/chinese/lessons/index.ts
// Kolejność lekcji kursu podstaw chińskiego.
import type { Lesson } from "../types";
import { lesson01 } from "./01-jak-dziala-chinski";
import { lesson02 } from "./02-tony";
import { lesson03 } from "./03-inicjaly";
import { lesson04 } from "./04-finaly";
import { lesson05 } from "./05-wyjatki-tonalne";
import { lesson06 } from "./06-znaki-jak-puzzle";
import { lesson07 } from "./07-pisanie";
import { lesson08 } from "./08-slowa-wielosylabowe";
import { lesson09 } from "./09-liczby-do-99";
import { lesson10 } from "./10-liczby-do-99999999";
import { lesson11 } from "./11-zaimki";
import { lesson12 } from "./12-formalnie-i-nieformalnie";

export const LESSONS: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lesson11,
  lesson12,
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

/** Moduły kursu — grupują lekcje na stronie głównej kursu. */
export const MODULES: { title: string; description: string; lessons: number[] }[] = [
  {
    title: "Fundamenty dźwięku",
    description: "Tony, pinyin i wyjątki tonalne — od totalnych podstaw.",
    lessons: [1, 2, 3, 4, 5],
  },
  {
    title: "Pismo i słowa",
    description: "Znaki jak puzzle, pisanie ręczne i cyfrowe, budowanie słów.",
    lessons: [6, 7, 8],
  },
  {
    title: "Liczby",
    description: "Liczenie od zera aż do 99 999 999.",
    lessons: [9, 10],
  },
  {
    title: "Pierwsze rozmowy",
    description: "Zaimki oraz wyrażenia formalne i nieformalne.",
    lessons: [11, 12],
  },
];
