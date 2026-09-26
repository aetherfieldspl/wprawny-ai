import type { Lesson } from "../types";

export const lesson08: Lesson = {
  number: 8,
  slug: "08-slowa-wielosylabowe",
  title: "Budowanie słów wielosylabowych",
  subtitle: "Znak = klocek, słowo = konstrukcja z klocków",
  goals: [
    "rozumiesz, jak znaki łączą się w słowa",
    "zgadujesz znaczenie nowych słów z ich części",
    "znasz „rodziny słów” z 电, 车, 机, 学 i 人",
  ],
  blocks: [
    {
      kind: "text",
      body: [
        "Większość współczesnych chińskich słów ma dwie sylaby, czyli dwa znaki. Każdy znak wnosi swoje znaczenie, a razem tworzą nowe słowo — często bardzo obrazowe. Komputer to „elektryczny mózg”, a panda to „niedźwiedź-kot”.",
        "To ogromna oszczędność: znając kilkaset znaków, rozumiesz tysiące słów. Każdy nowy znak to nie jedno słowo, tylko cała rodzina.",
      ],
    },
    {
      kind: "table",
      title: "Klocek + klocek = słowo",
      headers: ["Słowo", "Pinyin", "Klocki", "Znaczenie"],
      rows: [
        ["电脑", "diànnǎo", "prąd + mózg", "komputer"],
        ["电话", "diànhuà", "prąd + mowa", "telefon"],
        ["电视", "diànshì", "prąd + patrzeć", "telewizja"],
        ["电影", "diànyǐng", "prąd + cień", "film"],
        ["手机", "shǒujī", "ręka + maszyna", "komórka"],
        ["飞机", "fēijī", "latać + maszyna", "samolot"],
        ["火车", "huǒchē", "ogień + pojazd", "pociąg"],
        ["汽车", "qìchē", "para/gaz + pojazd", "samochód"],
        ["自行车", "zìxíngchē", "sam + iść + pojazd", "rower"],
        ["熊猫", "xióngmāo", "niedźwiedź + kot", "panda"],
        ["火山", "huǒshān", "ogień + góra", "wulkan"],
        ["大学", "dàxué", "duży + nauka", "uniwersytet"],
        ["小心", "xiǎoxīn", "mały + serce", "uważaj!"],
        ["开心", "kāixīn", "otwarte + serce", "radosny"],
        ["好吃", "hǎochī", "dobre + jeść", "smaczny"],
        ["好看", "hǎokàn", "dobre + patrzeć", "ładny"],
      ],
      hanziCols: [0],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Rodziny słów — ucz się grupami",
      body: [
        "电 diàn (prąd): 电脑, 电话, 电视, 电影, 电梯 diàntī (winda — „elektryczne schody”).",
        "车 chē (pojazd): 火车, 汽车, 自行车, 出租车 chūzūchē (taksówka — „pojazd do wynajęcia”).",
        "机 jī (maszyna): 手机, 飞机, 机场 jīchǎng (lotnisko — „plac maszyn”).",
        "学 xué (uczyć się): 学生 xuésheng (uczeń), 大学, 学校 xuéxiào (szkoła), 同学 tóngxué (kolega z klasy).",
      ],
    },
    {
      kind: "table",
      title: "Państwa i narodowości: dźwięk + 国 + 人",
      headers: ["Państwo", "Narodowość", "Jak powstało"],
      rows: [
        ["中国 Zhōngguó", "中国人 Zhōngguórén", "„Państwo Środka” + człowiek"],
        ["波兰 Bōlán", "波兰人 Bōlánrén", "zapis dźwięku „Po-lan(d)”"],
        ["美国 Měiguó", "美国人 Měiguórén", "„piękne państwo” (od A-me-ryka)"],
        ["英国 Yīngguó", "英国人 Yīngguórén", "„bohaterskie państwo” (od Eng-land)"],
        ["德国 Déguó", "德国人 Déguórén", "„państwo cnoty” (od Deutsch-land)"],
        ["法国 Fǎguó", "法国人 Fǎguórén", "„państwo prawa” (od Fran-ce)"],
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Sylaby w słowach a tony",
      body: [
        "W słowach działają reguły z lekcji 5: 水果 shuǐguǒ czytamy shuíguǒ, 可以 kěyǐ — kéyǐ.",
        "Druga sylaba bywa neutralna: 朋友 péngyou (przyjaciel), 学生 xuésheng, 东西 dōngxi (rzecz — dosł. „wschód-zachód”!).",
      ],
    },
    {
      kind: "words",
      title: "Nowe słowa",
      items: [
        { hanzi: "电脑", pinyin: "diànnǎo", pl: "komputer" },
        { hanzi: "手机", pinyin: "shǒujī", pl: "telefon komórkowy" },
        { hanzi: "火车", pinyin: "huǒchē", pl: "pociąg" },
        { hanzi: "学生", pinyin: "xuésheng", pl: "uczeń, student" },
        { hanzi: "老师", pinyin: "lǎoshī", pl: "nauczyciel", note: "„stary mistrz”" },
        { hanzi: "朋友", pinyin: "péngyou", pl: "przyjaciel, znajomy" },
        { hanzi: "波兰人", pinyin: "Bōlánrén", pl: "Polak, Polka" },
        { hanzi: "东西", pinyin: "dōngxi", pl: "rzecz", note: "dosł. „wschód-zachód”" },
      ],
    },
  ],
  quiz: [
    {
      q: "Co znaczy 火山 (ogień + góra)?",
      options: ["kominek", "wulkan", "pustynia", "fajerwerki"],
      answer: 1,
      explain: "Góra, z której bucha ogień — wulkan.",
    },
    {
      q: "Jeśli 电 to prąd, a 梯 to schody/drabina, to 电梯 to…",
      options: ["winda", "kabel", "ruchomy chodnik", "latarka"],
      answer: 0,
      explain: "„Elektryczne schody” — winda.",
    },
    {
      q: "Jak powiedzieć „Polak”?",
      options: ["波兰", "波兰人", "波兰国", "人波兰"],
      answer: 1,
      explain: "Nazwa kraju + 人 (człowiek) = mieszkaniec.",
    },
    {
      q: "Co łączy 手机 i 飞机?",
      options: ["Znak 机 — maszyna", "Znak 手 — ręka", "Oba to pojazdy", "Nic"],
      answer: 0,
      explain: "机 jī = maszyna: „maszyna do ręki” i „maszyna, która lata”.",
    },
    {
      q: "Co znaczy 好吃?",
      options: ["dużo jeść", "smaczny", "głodny", "restauracja"],
      answer: 1,
      explain: "好 dobre + 吃 jeść = smaczne.",
    },
  ],
  practice: [
    "Wymyśl zagadkę dla znajomego: podaj klocki (np. „prąd + cień”), niech zgadnie słowo.",
    "Zapisz w zeszycie rodziny 电, 车 i 学 i dopisuj do nich nowe słowa w trakcie nauki.",
  ],
};
