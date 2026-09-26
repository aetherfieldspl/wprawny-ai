import type { Lesson } from "../types";

export const lesson10: Lesson = {
  number: 10,
  slug: "10-liczby-do-99999999",
  title: "Liczebniki cz. 2: aż do 99 999 999",
  subtitle: "百, 千, 万 i sekret liczenia „czwórkami”",
  goals: [
    "liczysz do 99 999 999",
    "przeliczasz polskie „tysiące” i „miliony” na chińskie 万",
    "poprawnie używasz 零 w środku liczby",
  ],
  blocks: [
    {
      kind: "words",
      title: "Nowe jednostki",
      items: [
        { hanzi: "百", pinyin: "bǎi", pl: "100" },
        { hanzi: "千", pinyin: "qiān", pl: "1 000" },
        { hanzi: "万", pinyin: "wàn", pl: "10 000", note: "„wan” — kluczowa jednostka!" },
        { hanzi: "亿", pinyin: "yì", pl: "100 000 000", note: "bonus — sto milionów" },
      ],
    },
    {
      kind: "text",
      title: "Sekret: Chińczycy liczą czwórkami",
      body: [
        "My grupujemy cyfry po trzy: tysiąc, milion, miliard (1 000 000). Chińczycy — po cztery: 万 wàn to 10 000, a następna jednostka 亿 yì to 10 000 × 10 000.",
        "Dlatego 10 000 to nie „dziesięć tysięcy”, tylko 一万 — „jeden wan”. 100 000 to 十万 („dziesięć wanów”), a milion to 一百万 („sto wanów”).",
      ],
    },
    {
      kind: "table",
      title: "Duże liczby",
      headers: ["Liczba", "Po chińsku", "Dosłownie"],
      rows: [
        ["10 000", "一万", "jeden wan"],
        ["50 000", "五万", "pięć wanów"],
        ["100 000", "十万", "dziesięć wanów"],
        ["1 000 000", "一百万", "sto wanów"],
        ["10 000 000", "一千万", "tysiąc wanów"],
        ["99 999 999", "九千九百九十九万九千九百九十九", "9999 wanów i 9999"],
      ],
      hanziCols: [1],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Metoda: tnij od prawej po 4 cyfry",
      body: [
        "12 345 678 → 1234 | 5678.",
        "Lewa część + 万: 一千二百三十四万. Prawa część: 五千六百七十八.",
        "Razem: 一千二百三十四万五千六百七十八.",
      ],
    },
    {
      kind: "table",
      title: "Zera w środku: 零 líng",
      headers: ["Liczba", "Po chińsku", "Reguła"],
      rows: [
        ["101", "一百零一", "zero w środku czytamy jako 零"],
        ["1 005", "一千零五", "kilka zer pod rząd → jedno 零"],
        ["1 050", "一千零五十", "零 za brakujące setki"],
        ["1 500", "一千五百", "zer na końcu nie czytamy"],
        ["10 010", "一万零一十", "零 + 一十 (w środku liczby mówimy 一十)"],
        ["100 001", "十万零一", "puste miejsca po 万 → 零"],
      ],
      hanziCols: [1],
    },
    {
      kind: "callout",
      variant: "warning",
      title: "Dwie drobne pułapki",
      body: [
        "一十: sama 10 to 十, ale w środku większej liczby mówimy 一十: 110 = 一百一十, a nie 一百十.",
        "两: dwójka otwierająca liczbę przed 百, 千, 万 to zwykle 两: 200 = 两百 (二百 też jest poprawne), 2 000 = 两千, 20 000 = 两万. Na końcu i w dziesiątkach zostaje 二: 222 = 两百二十二.",
      ],
    },
    {
      kind: "numberTrainer",
      title: "Trener dużych liczb",
      max: 99_999_999,
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Lata czytamy cyfra po cyfrze",
      body: [
        "Rok 2026 to 二〇二六年 èr líng èr liù nián — cyfra po cyfrze, z 年 (rok) na końcu. Ale liczba 2026 (np. 2026 osób) to 两千零二十六.",
        "Ceny: waluta to 元 yuán, a potocznie 块 kuài: 三十五块 = 35 juanów.",
      ],
    },
    {
      kind: "words",
      title: "Przydatne słowa",
      items: [
        { hanzi: "多少钱？", pinyin: "Duōshao qián?", pl: "Ile to kosztuje?" },
        { hanzi: "块", pinyin: "kuài", pl: "juan (potocznie)" },
        { hanzi: "年", pinyin: "nián", pl: "rok" },
        { hanzi: "一百块", pinyin: "yìbǎi kuài", pl: "100 juanów", note: "pamiętasz? 一 przed 3. tonem → yì" },
      ],
    },
  ],
  quiz: [
    {
      q: "Ile to 一万?",
      options: ["1 000", "10 000", "100 000", "1 000 000"],
      answer: 1,
      explain: "万 wàn = 10 000.",
    },
    {
      q: "Jak powiedzieć milion?",
      options: ["一千千", "十万", "一百万", "一万万"],
      answer: 2,
      explain: "1 000 000 = 100 × 10 000 = 一百万.",
    },
    {
      q: "Jak zapisać 305?",
      options: ["三百五", "三百零五", "三零五", "三百五十"],
      answer: 1,
      explain: "Zero w środku czytamy jako 零. (三百五 to potocznie 350!)",
    },
    {
      q: "Jaka liczba to 两万三千?",
      options: ["2 300", "23 000", "230 000", "20 300"],
      answer: 1,
      explain: "两万 = 20 000, 三千 = 3 000 → 23 000.",
    },
    {
      q: "Jak czytamy rok 2008?",
      options: ["两千零八年", "二〇〇八年 (èr líng líng bā nián)", "二千八年", "两零零八年"],
      answer: 1,
      explain: "Lata czytamy cyfra po cyfrze.",
    },
  ],
  practice: [
    "Przeczytaj po chińsku liczbę mieszkańców swojego miasta.",
    "Ćwicz z trenerem, aż zrobisz 10 poprawnych odpowiedzi z rzędu.",
  ],
};
