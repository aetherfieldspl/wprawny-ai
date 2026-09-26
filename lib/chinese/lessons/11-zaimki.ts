import type { Lesson } from "../types";

export const lesson11: Lesson = {
  number: 11,
  slug: "11-zaimki",
  title: "Zaimki osobowe i dzierżawcze",
  subtitle: "Ja, ty, on… i moje, twoje, jego",
  goals: [
    "znasz wszystkie zaimki osobowe, także grzecznościowe 您",
    "tworzysz zaimki dzierżawcze z 的",
    "wiesz, kiedy 的 można pominąć",
  ],
  blocks: [
    {
      kind: "table",
      title: "Zaimki osobowe",
      headers: ["", "Liczba pojedyncza", "Liczba mnoga (+ 们 men)"],
      rows: [
        ["1. os.", "我 wǒ — ja", "我们 wǒmen — my"],
        ["2. os.", "你 nǐ — ty", "你们 nǐmen — wy"],
        ["2. os. grzecznościowa", "您 nín — Pan / Pani", "(rzadko; zwykle 你们 lub 各位 gèwèi — Państwo)"],
        ["3. os. (mężczyzna)", "他 tā — on", "他们 tāmen — oni"],
        ["3. os. (kobieta)", "她 tā — ona", "她们 tāmen — one"],
        ["3. os. (rzecz, zwierzę)", "它 tā — ono", "它们 tāmen — one"],
      ],
    },
    {
      kind: "puzzles",
      title: "Zaimki jako puzzle",
      items: [
        {
          hanzi: "你",
          pinyin: "nǐ",
          pl: "ty",
          parts: [
            { part: "亻", pl: "człowiek" },
            { part: "尔", pl: "dawne „ty”" },
          ],
          story: "Człowiek, do którego się zwracam — ty.",
        },
        {
          hanzi: "您",
          pinyin: "nín",
          pl: "Pan / Pani",
          parts: [
            { part: "你", pl: "ty" },
            { part: "心", pl: "serce" },
          ],
          story: "„Ty” z sercem pod spodem — zwracam się z szacunkiem.",
        },
        {
          hanzi: "她",
          pinyin: "tā",
          pl: "ona",
          parts: [
            { part: "女", pl: "kobieta" },
            { part: "也", pl: "też (fonetyk)" },
          ],
          story: "Takie samo 他, tylko z kobietą zamiast człowieka.",
        },
        {
          hanzi: "们",
          pinyin: "men",
          pl: "liczba mnoga osób",
          parts: [
            { part: "亻", pl: "człowiek" },
            { part: "门", pl: "drzwi, mén (fonetyk)" },
          ],
          story: "Ludzie wchodzący przez drzwi — jest ich wielu.",
        },
      ],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "他, 她, 它 brzmią identycznie!",
      body: [
        "Wszystkie trzy czyta się tā. W mowie nie słychać, czy chodzi o „on”, „ona”, czy „ono” — wynika to z kontekstu. Rozróżnienie w piśmie wprowadzono dopiero w XX wieku.",
        "Pamiętasz? Zaimki nie zmieniają czasownika: 我是, 你是, 她是, 我们是 — zawsze 是.",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "我们 czy 咱们?",
      body: [
        "咱们 zánmen to „my” razem z osobą, do której mówisz (my — ty i ja). Popularne na północy Chin: 咱们走吧！ Zánmen zǒu ba! — Chodźmy!",
      ],
    },
    {
      kind: "text",
      title: "Zaimki dzierżawcze: zaimek + 的",
      body: [
        "Wystarczy dodać partykułę 的 de: 我的 wǒ de (mój / moja / moje), 你的 (twój), 您的 (Pana / Pani), 他的 (jego), 她的 (jej), 我们的 (nasz), 你们的 (wasz), 他们的 (ich).",
        "Nie ma odmiany przez rodzaj ani liczbę: 我的书 (moja książka), 我的手机 (mój telefon), 我的朋友们 (moi przyjaciele) — zawsze 我的.",
        "Samo 我的 na końcu zdania znaczy „moje”: 这是我的。 Zhè shì wǒ de. — To moje.",
      ],
    },
    {
      kind: "callout",
      variant: "warning",
      title: "Kiedy 的 znika",
      body: [
        "Przy bliskich osobach i „swoich” miejscach 的 zwykle się pomija: 我妈妈 wǒ māma (moja mama), 我朋友 wǒ péngyou (mój przyjaciel), 我家 wǒ jiā (mój dom), 我们学校 wǒmen xuéxiào (nasza szkoła).",
        "Przy rzeczach 的 zostaje: 我的手机, 你的书.",
      ],
    },
    {
      kind: "words",
      title: "Zdania do przećwiczenia",
      items: [
        { hanzi: "我是波兰人。", pinyin: "Wǒ shì Bōlánrén.", pl: "Jestem Polakiem / Polką." },
        { hanzi: "你是中国人吗？", pinyin: "Nǐ shì Zhōngguórén ma?", pl: "Jesteś Chińczykiem / Chinką?" },
        { hanzi: "她是我的老师。", pinyin: "Tā shì wǒ de lǎoshī.", pl: "Ona jest moją nauczycielką." },
        { hanzi: "这是谁的手机？", pinyin: "Zhè shì shéi de shǒujī?", pl: "Czyj to telefon?" },
        { hanzi: "是我的。", pinyin: "Shì wǒ de.", pl: "Mój." },
        { hanzi: "他们是我朋友。", pinyin: "Tāmen shì wǒ péngyou.", pl: "Oni są moimi przyjaciółmi." },
        { hanzi: "您好！", pinyin: "Nín hǎo!", pl: "Dzień dobry! (grzecznie)" },
      ],
    },
  ],
  quiz: [
    {
      q: "Jak powiedzieć „my”?",
      options: ["你们", "我们", "他们", "我的"],
      answer: 1,
      explain: "我 + 们 = my.",
    },
    {
      q: "Do kogo użyjesz 您?",
      options: ["Do młodszego brata", "Do przyjaciela", "Do starszej osoby lub klienta", "Do psa"],
      answer: 2,
      explain: "您 to forma grzecznościowa — Pan / Pani.",
    },
    {
      q: "Jak powiedzieć „jej telefon”?",
      options: ["她手机的", "她的手机", "的她手机", "他们手机"],
      answer: 1,
      explain: "Zaimek + 的 + rzecz: 她的手机.",
    },
    {
      q: "Które wyrażenie naturalnie obywa się bez 的?",
      options: ["我妈妈", "我手机", "你书", "他电脑"],
      answer: 0,
      explain: "Przy bliskich osobach 的 zwykle się pomija.",
    },
    {
      q: "Czy w mowie da się usłyszeć różnicę między 他 i 她?",
      options: ["Tak, różnią się tonem", "Tak, 她 ma inną samogłoskę", "Nie, oba to tā", "Tylko na północy Chin"],
      answer: 2,
      explain: "Oba (i 它) czyta się tā.",
    },
  ],
  practice: [
    "Opisz swoją rodzinę: 我妈妈…, 我爸爸…, 我朋友… (np. dodając 是波兰人).",
    "Wskazuj przedmioty wokół siebie i mów: 这是我的… / 这是他的…",
  ],
};
