import type { Lesson } from "../types";

export const lesson09: Lesson = {
  number: 9,
  slug: "09-liczby-do-99",
  title: "Liczebniki cz. 1: od 0 do 99",
  subtitle: "Dziesięć znaków i jedna prosta logika",
  goals: [
    "liczysz od 0 do 99",
    "wiesz, kiedy mówić 二 èr, a kiedy 两 liǎng",
    "pokazujesz liczby na chińską modłę jedną ręką",
  ],
  blocks: [
    {
      kind: "words",
      title: "Cyfry 0–10",
      items: [
        { hanzi: "零", pinyin: "líng", pl: "0" },
        { hanzi: "一", pinyin: "yī", pl: "1", note: "jedna kreska" },
        { hanzi: "二", pinyin: "èr", pl: "2", note: "dwie kreski" },
        { hanzi: "三", pinyin: "sān", pl: "3", note: "trzy kreski" },
        { hanzi: "四", pinyin: "sì", pl: "4", note: "okno 口 z firankami" },
        { hanzi: "五", pinyin: "wǔ", pl: "5" },
        { hanzi: "六", pinyin: "liù", pl: "6", note: "ludzik w kapeluszu" },
        { hanzi: "七", pinyin: "qī", pl: "7", note: "odwrócona siódemka" },
        { hanzi: "八", pinyin: "bā", pl: "8", note: "dwie kreski rozchodzą się jak otwarte drzwi" },
        { hanzi: "九", pinyin: "jiǔ", pl: "9" },
        { hanzi: "十", pinyin: "shí", pl: "10", note: "krzyżyk — jak „+” albo rzymskie X" },
      ],
    },
    {
      kind: "text",
      title: "Logika: mnożenie przed, dodawanie za",
      body: [
        "Chińskie liczby są w pełni logiczne — nie ma „jedenastu”, „dwudziestu” czy „czterdziestu”, które trzeba zapamiętywać osobno.",
        "Cyfra ZA 十 dodaje: 十一 = 10 + 1 = 11. Cyfra PRZED 十 mnoży: 二十 = 2 × 10 = 20. Wszystko razem: 二十一 = 2 × 10 + 1 = 21.",
      ],
    },
    {
      kind: "table",
      title: "Przykłady",
      headers: ["Liczba", "Znaki", "Pinyin", "Rozkład"],
      rows: [
        ["11", "十一", "shíyī", "10 + 1"],
        ["15", "十五", "shíwǔ", "10 + 5"],
        ["20", "二十", "èrshí", "2 × 10"],
        ["34", "三十四", "sānshísì", "3 × 10 + 4"],
        ["58", "五十八", "wǔshíbā", "5 × 10 + 8"],
        ["99", "九十九", "jiǔshíjiǔ", "9 × 10 + 9"],
      ],
      hanziCols: [1],
    },
    {
      kind: "numberTrainer",
      title: "Trener: jaka to liczba?",
      max: 99,
    },
    {
      kind: "callout",
      variant: "warning",
      title: "二 èr czy 两 liǎng?",
      body: [
        "二 èr używamy przy liczeniu, w numerach i w złożeniach: 二, 十二, 二十, 第二 (drugi).",
        "两 liǎng mówimy, gdy liczymy konkretne rzeczy — przed słowem-klasyfikatorem: 两个人 liǎng ge rén (dwie osoby), 两本书 liǎng běn shū (dwie książki). Nigdy „二个人”.",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Jedynka w numerach telefonów: yāo",
      body: [
        "Numery telefonów, pokoi czy autobusów czyta się cyfra po cyfrze, a 1 często wymawia się yāo, żeby nie pomylić jej z 七 qī. Numer alarmowy policji 110 to „yāo yāo líng”.",
      ],
    },
    {
      kind: "table",
      title: "Liczby pokazywane jedną ręką",
      headers: ["Liczba", "Gest"],
      rows: [
        ["1–5", "tak jak w Polsce, prostując palce"],
        ["6", "kciuk i mały palec wyprostowane (jak „słuchawka”)"],
        ["7", "opuszki kciuka, wskazującego i środkowego złączone"],
        ["8", "kciuk i palec wskazujący jak „pistolet”"],
        ["9", "palec wskazujący zgięty w haczyk"],
        ["10", "zaciśnięta pięść albo skrzyżowane palce wskazujące (+)"],
      ],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Szczęśliwe i pechowe liczby",
      body: [
        "4 四 sì brzmi podobnie do 死 sǐ (śmierć) — w wielu budynkach brakuje 4. piętra.",
        "8 八 bā kojarzy się z 发 fā (bogacić się) — igrzyska w Pekinie wystartowały 8.08.2008 o 20:08 (8:08 wieczorem).",
        "6 六 liù brzmi jak 溜 liù (gładko, sprawnie) — „666” w internecie znaczy „mistrz!”.",
      ],
    },
    {
      kind: "words",
      title: "Przydatne słowa",
      items: [
        { hanzi: "几", pinyin: "jǐ", pl: "ile? (zwykle do 10)" },
        { hanzi: "多少", pinyin: "duōshao", pl: "ile? (dowolna ilość)" },
        { hanzi: "第二", pinyin: "dì-èr", pl: "drugi", note: "第 + liczba = liczebnik porządkowy" },
        { hanzi: "两个人", pinyin: "liǎng ge rén", pl: "dwie osoby" },
      ],
    },
  ],
  quiz: [
    {
      q: "Jak zapisać 47?",
      options: ["四七", "十四七", "四十七", "七十四"],
      answer: 2,
      explain: "4 × 10 + 7 = 四十七.",
    },
    {
      q: "Jaka liczba to 十六?",
      options: ["60", "16", "106", "6"],
      answer: 1,
      explain: "10 + 6 = 16. Sześćdziesiąt to 六十.",
    },
    {
      q: "Jak powiedzieć „dwie osoby”?",
      options: ["二个人", "两个人", "二人个", "十二人"],
      answer: 1,
      explain: "Przed klasyfikatorem używamy 两 liǎng.",
    },
    {
      q: "Która liczba jest w Chinach uważana za pechową?",
      options: ["8", "6", "4", "9"],
      answer: 2,
      explain: "四 sì brzmi podobnie do 死 sǐ — śmierć.",
    },
    {
      q: "Jak czytamy 99?",
      options: ["jiǔjiǔ", "jiǔshíjiǔ", "shíjiǔjiǔ", "jiǔbǎijiǔ"],
      answer: 1,
      explain: "九十九 — 9 × 10 + 9.",
    },
  ],
  practice: [
    "Przeczytaj po chińsku swój numer telefonu (pamiętaj o yāo!).",
    "Przez cały dzień licz po chińsku schody, które pokonujesz.",
  ],
};
