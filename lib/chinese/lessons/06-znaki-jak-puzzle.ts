import type { Lesson } from "../types";

export const lesson06: Lesson = {
  number: 6,
  slug: "06-znaki-jak-puzzle",
  title: "Znaki jak puzzle",
  subtitle: "Skojarzenia, klucze i rozbieranie znaków na części",
  goals: [
    "wiesz, jak powstają chińskie znaki (4 główne typy)",
    "rozpoznajesz najważniejsze klucze (radykały)",
    "umiesz rozebrać znak na części i ułożyć do niego historyjkę",
  ],
  blocks: [
    {
      kind: "text",
      body: [
        "Podręczniki często każą uczyć się znaków „na pamięć”, kreska po kresce. My robimy inaczej: znak to nie losowy obrazek, tylko układanka z kilkuset powtarzających się klocków. Znasz klocki → rozumiesz znak → pamiętasz go na dłużej.",
        "Znaki dzielą się na cztery główne typy. Rzadkie są czyste obrazki, a najwięcej (ok. 80%) jest znaków złożonych z części znaczeniowej i części podpowiadającej wymowę.",
      ],
    },
    {
      kind: "words",
      title: "Typ 1: piktogramy — uproszczone obrazki",
      items: [
        { hanzi: "人", pinyin: "rén", pl: "człowiek", note: "idący człowiek na dwóch nogach" },
        { hanzi: "口", pinyin: "kǒu", pl: "usta", note: "otwarte usta" },
        { hanzi: "日", pinyin: "rì", pl: "słońce; dzień", note: "tarcza słońca" },
        { hanzi: "月", pinyin: "yuè", pl: "księżyc; miesiąc", note: "sierp księżyca" },
        { hanzi: "山", pinyin: "shān", pl: "góra", note: "trzy szczyty" },
        { hanzi: "木", pinyin: "mù", pl: "drzewo", note: "pień, gałęzie i korzenie" },
        { hanzi: "水", pinyin: "shuǐ", pl: "woda", note: "nurt z rozpryskami" },
        { hanzi: "火", pinyin: "huǒ", pl: "ogień", note: "płomień z iskrami" },
        { hanzi: "女", pinyin: "nǚ", pl: "kobieta", note: "klęcząca postać" },
        { hanzi: "子", pinyin: "zǐ", pl: "dziecko", note: "niemowlę w pieluszce" },
        { hanzi: "门", pinyin: "mén", pl: "drzwi, brama" },
        { hanzi: "目", pinyin: "mù", pl: "oko", note: "oko obrócone pionowo" },
      ],
    },
    {
      kind: "words",
      title: "Typ 2: ideogramy — symbole pojęć",
      items: [
        { hanzi: "一 二 三", pinyin: "yī èr sān", pl: "jeden, dwa, trzy", note: "po prostu kreski" },
        { hanzi: "上", pinyin: "shàng", pl: "na, w górę", note: "znak nad linią" },
        { hanzi: "下", pinyin: "xià", pl: "pod, w dół", note: "znak pod linią" },
        { hanzi: "本", pinyin: "běn", pl: "korzeń, podstawa", note: "drzewo 木 z zaznaczonym korzeniem" },
      ],
    },
    {
      kind: "puzzles",
      title: "Typ 3: złożenia znaczeniowe — 1 + 1 = historia",
      items: [
        {
          hanzi: "好",
          pinyin: "hǎo",
          pl: "dobry",
          parts: [
            { part: "女", pl: "kobieta" },
            { part: "子", pl: "dziecko" },
          ],
          story: "Mama z dzieckiem — to jest dobre.",
        },
        {
          hanzi: "休",
          pinyin: "xiū",
          pl: "odpoczywać",
          parts: [
            { part: "亻", pl: "człowiek" },
            { part: "木", pl: "drzewo" },
          ],
          story: "Człowiek opiera się o drzewo i odpoczywa.",
        },
        {
          hanzi: "明",
          pinyin: "míng",
          pl: "jasny",
          parts: [
            { part: "日", pl: "słońce" },
            { part: "月", pl: "księżyc" },
          ],
          story: "Słońce i księżyc razem — nie może być jaśniej.",
        },
        {
          hanzi: "林 / 森",
          pinyin: "lín / sēn",
          pl: "lasek / gęsty las",
          parts: [
            { part: "木木", pl: "dwa drzewa" },
            { part: "木木木", pl: "trzy drzewa" },
          ],
          story: "Dwa drzewa to zagajnik, trzy drzewa to już puszcza.",
        },
        {
          hanzi: "从 / 众",
          pinyin: "cóng / zhòng",
          pl: "podążać / tłum",
          parts: [
            { part: "人人", pl: "człowiek za człowiekiem" },
            { part: "人人人", pl: "trzech ludzi" },
          ],
          story: "Jeden idzie za drugim — podąża. Trzech — to już tłum.",
        },
        {
          hanzi: "男",
          pinyin: "nán",
          pl: "mężczyzna",
          parts: [
            { part: "田", pl: "pole" },
            { part: "力", pl: "siła" },
          ],
          story: "Ten, kto wkłada siłę w pracę na polu.",
        },
        {
          hanzi: "安",
          pinyin: "ān",
          pl: "spokój, bezpieczny",
          parts: [
            { part: "宀", pl: "dach" },
            { part: "女", pl: "kobieta" },
          ],
          story: "Kobieta bezpieczna pod dachem — w domu panuje spokój.",
        },
        {
          hanzi: "家",
          pinyin: "jiā",
          pl: "dom, rodzina",
          parts: [
            { part: "宀", pl: "dach" },
            { part: "豕", pl: "świnia" },
          ],
          story: "W dawnych Chinach świnia pod dachem oznaczała zamożny dom.",
        },
        {
          hanzi: "看",
          pinyin: "kàn",
          pl: "patrzeć",
          parts: [
            { part: "手 → 龵", pl: "ręka (spłaszczona)" },
            { part: "目", pl: "oko" },
          ],
          story: "Ręka przyłożona nad oczy, żeby lepiej widzieć.",
        },
      ],
    },
    {
      kind: "text",
      title: "Typ 4: znaki znaczeniowo-dźwiękowe (ok. 80% znaków!)",
      body: [
        "Najczęstszy typ: jedna część mówi, z czym znak jest związany (klucz), a druga podpowiada, jak się go czyta (fonetyk). Podpowiedź dźwiękowa bywa przybliżona, ale bardzo pomaga.",
      ],
    },
    {
      kind: "table",
      title: "Rodzina 马 mǎ i rodzina 青 qīng",
      headers: ["Znak", "Klucz (znaczenie)", "Fonetyk (dźwięk)", "Znaczenie"],
      rows: [
        ["妈 mā", "女 kobieta", "马 mǎ", "mama"],
        ["吗 ma", "口 usta (coś mówionego)", "马 mǎ", "partykuła pytająca"],
        ["码 mǎ", "石 kamień", "马 mǎ", "kod, numer"],
        ["清 qīng", "氵 woda", "青 qīng", "czysty (o wodzie)"],
        ["请 qǐng", "讠 mowa", "青 qīng", "prosić"],
        ["情 qíng", "忄 serce", "青 qīng", "uczucie"],
        ["晴 qíng", "日 słońce", "青 qīng", "pogodny, słoneczny"],
      ],
      hanziCols: [0],
    },
    {
      kind: "table",
      title: "Najważniejsze klucze (radykały)",
      headers: ["Klucz", "Znaczenie", "Przykłady"],
      rows: [
        ["亻", "człowiek (人)", "你 ty, 他 on, 休 odpoczywać"],
        ["氵", "woda (水)", "河 rzeka, 海 morze, 洗 myć"],
        ["扌", "ręka (手)", "打 bić, 找 szukać, 拿 brać"],
        ["口", "usta", "吃 jeść, 喝 pić, 叫 wołać"],
        ["女", "kobieta", "妈 mama, 她 ona, 好 dobry"],
        ["木", "drzewo, drewno", "林 las, 椅 krzesło, 桌 stół"],
        ["日", "słońce, czas", "明 jasny, 早 rano, 晴 pogodny"],
        ["讠", "mowa (言)", "说 mówić, 话 mowa, 语 język"],
        ["忄 / 心", "serce, uczucia", "情 uczucie, 忙 zajęty, 想 myśleć"],
        ["艹", "trawa, rośliny", "花 kwiat, 茶 herbata, 菜 warzywo"],
        ["宀", "dach", "家 dom, 安 spokój, 室 pokój"],
        ["饣", "jedzenie", "饭 ryż/posiłek, 饿 głodny, 饺 pieróg"],
        ["纟", "nić, jedwab", "红 czerwony, 给 dawać, 绿 zielony"],
        ["钅", "metal", "钱 pieniądze, 银 srebro, 铁 żelazo"],
        ["辶", "ruch, droga", "这 ten, 过 przechodzić, 远 daleko"],
      ],
      hanziCols: [0],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Metoda 4 kroków na każdy nowy znak",
      body: [
        "1. Rozbierz — znajdź części, które już znasz.",
        "2. Nazwij — powiedz, co każda część znaczy.",
        "3. Ułóż historię — im dziwniejsza i bardziej obrazowa, tym lepiej.",
        "4. Dodaj dźwięk — sprawdź, czy któraś część podpowiada wymowę.",
      ],
    },
  ],
  quiz: [
    {
      q: "Z jakich części składa się 好 (dobry)?",
      options: ["人 + 木", "女 + 子", "日 + 月", "宀 + 女"],
      answer: 1,
      explain: "Kobieta 女 + dziecko 子 = dobrze.",
    },
    {
      q: "Co najpewniej oznacza znak z kluczem 氵?",
      options: ["Coś związanego z wodą", "Coś związanego z mową", "Coś związanego z metalem", "Osobę"],
      answer: 0,
      explain: "氵 to skrócona forma 水 — woda (河, 海, 洗).",
    },
    {
      q: "Człowiek 亻 opierający się o drzewo 木 to…",
      options: ["林 lasek", "休 odpoczywać", "本 korzeń", "从 podążać"],
      answer: 1,
      explain: "休 xiū — odpoczywać.",
    },
    {
      q: "Dlaczego 妈, 吗 i 码 brzmią podobnie?",
      options: [
        "To przypadek",
        "Wszystkie mają fonetyk 马 mǎ",
        "Wszystkie mają klucz 女",
        "Mają ten sam ton",
      ],
      answer: 1,
      explain: "Część 马 podpowiada wymowę „ma”; klucz zmienia znaczenie.",
    },
    {
      q: "Jaki typ znaków jest najczęstszy?",
      options: ["Piktogramy", "Ideogramy", "Znaczeniowo-dźwiękowe", "Wszystkie po równo"],
      answer: 2,
      explain: "Ok. 80% znaków to połączenie klucza (znaczenie) i fonetyku (dźwięk).",
    },
  ],
  practice: [
    "Wybierz 5 znaków z tej lekcji i ułóż do nich własne historyjki (własne działają najlepiej!).",
    "Poszukaj w słowniku znaków z kluczem 口 i zgadnij, dlaczego go mają.",
  ],
};
