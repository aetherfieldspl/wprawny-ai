// lib/chinese/numbers.ts
// Zamiana liczby (0 – 99 999 999) na chiński zapis znakami + pinyin.
// Reguły, których uczy lekcja 10:
//  - grupujemy cyfry po 4 (万 = 10 000), a nie po 3 jak w polskim,
//  - ciąg zer w środku liczby czytamy jednym 零, zer na końcu nie czytamy,
//  - 10–19 na początku liczby to 十…, ale w środku 一十… (110 = 一百一十),
//  - dwójka otwierająca grupę przed 百 / 千 / 万 to 两 (200 = 两百, 20 000 = 两万),
//    dalej w grupie zostaje 二 (2200 = 两千二百).

export const MAX_NUMBER = 99_999_999;

const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const DIGITS_PY = ["líng", "yī", "èr", "sān", "sì", "wǔ", "liù", "qī", "bā", "jiǔ"];
const UNITS = ["", "十", "百", "千"];
const UNITS_PY = ["", "shí", "bǎi", "qiān"];

export interface ChineseNumber {
  hanzi: string;
  /** Pinyin z tonami bazowymi (bez sandhi), sylaby rozdzielone spacją. */
  pinyin: string;
}

/** Jedna 4-cyfrowa grupa (1–9999) jako lista [znak, pinyin]. */
function section(
  n: number,
  isLeading: boolean,
  beforeWan: boolean
): [string, string][] {
  const out: [string, string][] = [];
  let started = false;
  let zeroPending = false;

  for (let pos = 3; pos >= 0; pos--) {
    const d = Math.floor(n / 10 ** pos) % 10;
    if (d === 0) {
      if (started) zeroPending = true;
      continue;
    }
    if (zeroPending) {
      out.push(["零", "líng"]);
      zeroPending = false;
    }

    const omitOne = d === 1 && pos === 1 && !started && isLeading; // 十二, nie 一十二
    // 两 tylko jako pierwsza cyfra grupy: 两百, 两千, 两万 (ale 一千二百, 二十二)
    const liang =
      d === 2 && !started && (pos >= 2 || (beforeWan && n === 2));

    if (!omitOne) {
      out.push(liang ? ["两", "liǎng"] : [DIGITS[d], DIGITS_PY[d]]);
    }
    if (pos > 0) out.push([UNITS[pos], UNITS_PY[pos]]);
    started = true;
  }
  return out;
}

export function toChinese(n: number): ChineseNumber {
  if (!Number.isInteger(n) || n < 0 || n > MAX_NUMBER) {
    throw new RangeError(`Obsługujemy liczby całkowite 0–${MAX_NUMBER}`);
  }
  if (n === 0) return { hanzi: "零", pinyin: "líng" };

  const high = Math.floor(n / 10_000);
  const low = n % 10_000;
  const parts: [string, string][] = [];

  if (high > 0) {
    parts.push(...section(high, true, true), ["万", "wàn"]);
  }
  if (low > 0) {
    if (high > 0 && low < 1000) parts.push(["零", "líng"]);
    parts.push(...section(low, high === 0, false));
  }

  return {
    hanzi: parts.map((p) => p[0]).join(""),
    pinyin: parts.map((p) => p[1]).join(" "),
  };
}
