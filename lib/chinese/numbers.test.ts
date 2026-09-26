// lib/chinese/numbers.test.ts
import { describe, it, expect } from "vitest";
import { toChinese, MAX_NUMBER } from "./numbers";

const h = (n: number) => toChinese(n).hanzi;

describe("toChinese — podstawy", () => {
  it.each([
    [0, "零"],
    [1, "一"],
    [2, "二"],
    [10, "十"],
    [11, "十一"],
    [20, "二十"],
    [22, "二十二"],
    [99, "九十九"],
  ])("%i → %s", (n: number, expected: string) => expect(h(n)).toBe(expected));
});

describe("toChinese — setki i tysiące", () => {
  it.each([
    [100, "一百"],
    [101, "一百零一"],
    [110, "一百一十"],
    [115, "一百一十五"],
    [200, "两百"],
    [222, "两百二十二"],
    [1000, "一千"],
    [1005, "一千零五"],
    [1050, "一千零五十"],
    [1500, "一千五百"],
    [2026, "两千零二十六"],
    [2222, "两千二百二十二"],
  ])("%i → %s", (n: number, expected: string) => expect(h(n)).toBe(expected));
});

describe("toChinese — 万 i duże liczby", () => {
  it.each([
    [10_000, "一万"],
    [10_010, "一万零一十"],
    [10_500, "一万零五百"],
    [12_000, "一万两千"],
    [20_000, "两万"],
    [22_000, "两万两千"],
    [100_000, "十万"],
    [100_001, "十万零一"],
    [110_000, "十一万"],
    [120_000, "十二万"],
    [1_000_000, "一百万"],
    [1_000_100, "一百万零一百"],
    [2_000_000, "两百万"],
    [10_000_000, "一千万"],
    [12_345_678, "一千二百三十四万五千六百七十八"],
    [MAX_NUMBER, "九千九百九十九万九千九百九十九"],
  ])("%i → %s", (n: number, expected: string) => expect(h(n)).toBe(expected));
});

describe("toChinese — pinyin i walidacja", () => {
  it("zwraca pinyin sylaba po sylabie", () => {
    expect(toChinese(10_010).pinyin).toBe("yī wàn líng yī shí");
    expect(toChinese(200).pinyin).toBe("liǎng bǎi");
  });

  it("odrzuca liczby spoza zakresu", () => {
    expect(() => toChinese(-1)).toThrow(RangeError);
    expect(() => toChinese(MAX_NUMBER + 1)).toThrow(RangeError);
    expect(() => toChinese(1.5)).toThrow(RangeError);
  });
});
