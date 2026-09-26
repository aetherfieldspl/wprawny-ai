import type { Lesson } from "../types";

export const lesson05: Lesson = {
  number: 5,
  slug: "05-wyjatki-tonalne",
  title: "Wyjątki tonalne",
  subtitle: "Kiedy ton zmienia się sam: 3+3, 不 i 一",
  goals: [
    "wymawiasz dwa trzecie tony obok siebie jak rodzimy użytkownik",
    "wiesz, kiedy 不 to bù, a kiedy bú",
    "znasz trzy wymowy 一: yī, yí, yì",
  ],
  blocks: [
    {
      kind: "text",
      body: [
        "Tony nie żyją w próżni. Kiedy sylaby stoją obok siebie, niektóre tony zmieniają się, żeby mowa płynęła wygodniej. Nazywa się to sandhi tonalnym. Reguł, które naprawdę musisz znać, jest tylko kilka — i to właśnie dzięki nim przestaniesz brzmieć „jak z podręcznika”.",
      ],
    },
    {
      kind: "table",
      title: "Reguła 1: 3. ton + 3. ton → 2. ton + 3. ton",
      headers: ["Zapis", "Wymowa", "Znaczenie"],
      rows: [
        ["你好 nǐ hǎo", "ní hǎo", "cześć"],
        ["很好 hěn hǎo", "hén hǎo", "bardzo dobrze"],
        ["水果 shuǐguǒ", "shuíguǒ", "owoc"],
        ["可以 kěyǐ", "kéyǐ", "można"],
        ["我很好 wǒ hěn hǎo", "wó hén hǎo", "mam się dobrze"],
      ],
      hanziCols: [],
    },
    {
      kind: "callout",
      variant: "warning",
      title: "Uwaga: zapis się nie zmienia",
      body: [
        "W słownikach i podręcznikach nadal piszemy nǐ hǎo — zmiana dotyczy tylko wymowy. Musisz ją „dopowiedzieć” sam(a).",
        "Przy trzech trzecich tonach z rzędu (我很好) zwykle dwa pierwsze stają się drugimi.",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Reguła 2: „półtrzeci” ton",
      body: [
        "Gdy po 3. tonie stoi dowolny inny ton (1., 2., 4. lub neutralny), wymawiamy tylko jego niską, opadającą część — bez wznoszenia. 我吃 wǒ chī, 很忙 hěn máng, 可是 kěshì. Pełne „w dół i w górę” słychać głównie na końcu wypowiedzi.",
      ],
    },
    {
      kind: "table",
      title: "Reguła 3: 不 bù — „nie”",
      headers: ["Sytuacja", "Wymowa", "Przykłady"],
      rows: [
        ["przed 4. tonem", "bú", "不是 bú shì (to nie…), 不去 bú qù (nie idę), 不要 bú yào (nie chcę)"],
        ["przed 1., 2., 3. tonem", "bù", "不吃 bù chī, 不忙 bù máng, 不好 bù hǎo"],
        ["w pytaniu A-不-A", "bu (neutralny)", "是不是 shì bu shì, 好不好 hǎo bu hǎo"],
        ["samodzielnie", "bù", "不！ bù! — Nie!"],
      ],
    },
    {
      kind: "table",
      title: "Reguła 4: 一 yī — „jeden”",
      headers: ["Sytuacja", "Wymowa", "Przykłady"],
      rows: [
        ["samodzielnie, przy liczeniu, na końcu, liczebnik porządkowy", "yī", "一 yī, 十一 shíyī, 第一 dì-yī (pierwszy)"],
        ["przed 4. tonem (także przed 个)", "yí", "一个 yí ge, 一样 yíyàng (taki sam), 一定 yídìng (na pewno)"],
        ["przed 1., 2., 3. tonem", "yì", "一天 yì tiān, 一年 yì nián, 一起 yìqǐ (razem)"],
        ["między podwojonym czasownikiem", "yi (neutralny)", "看一看 kàn yi kàn (rzucić okiem)"],
      ],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Sztuczka: 不 i 一 lubią kontrast",
      body: [
        "Przed ostrym 4. tonem 不 i 一 „podskakują” do 2. tonu (bú, yí), żeby nie było dwóch ostrych spadków pod rząd. Ciąg „w górę → w dół” jest po prostu wygodniejszy dla ust.",
        "Wiele podręczników zapisuje już zmieniony ton przy 不 i 一 (bú shì, yí ge). Przy regule 3+3 zapis zostaje oryginalny.",
      ],
    },
    {
      kind: "text",
      title: "Ton neutralny — kiedy się pojawia?",
      body: [
        "1) W drugiej sylabie podwojonych słów rodzinnych i niektórych czasowników: 妈妈 māma, 爸爸 bàba, 谢谢 xièxie.",
        "2) W partykułach: 吗 ma (pytanie), 呢 ne, 的 de, 了 le.",
        "3) W przyrostkach: 们 men (liczba mnoga osób), 子 zi (np. 桌子 zhuōzi — stół).",
      ],
    },
    {
      kind: "words",
      title: "Przećwicz",
      items: [
        { hanzi: "你好", pinyin: "nǐ hǎo", pl: "cześć", note: "czytaj: ní hǎo" },
        { hanzi: "不是", pinyin: "bú shì", pl: "nie być, to nie…" },
        { hanzi: "不好", pinyin: "bù hǎo", pl: "niedobrze" },
        { hanzi: "一个", pinyin: "yí ge", pl: "jeden (sztuka)" },
        { hanzi: "一起", pinyin: "yìqǐ", pl: "razem" },
        { hanzi: "第一", pinyin: "dì-yī", pl: "pierwszy" },
        { hanzi: "水果", pinyin: "shuǐguǒ", pl: "owoc", note: "czytaj: shuíguǒ" },
        { hanzi: "看一看", pinyin: "kàn yi kàn", pl: "rzucić okiem" },
      ],
    },
  ],
  quiz: [
    {
      q: "Jak wymawiamy 不对 (nieprawda; duì = 4. ton)?",
      options: ["bù duì", "bú duì", "bu duì", "bǔ duì"],
      answer: 1,
      explain: "Przed 4. tonem 不 zmienia się w bú.",
    },
    {
      q: "Jak wymawiamy 一百 (sto; bǎi = 3. ton)?",
      options: ["yī bǎi", "yí bǎi", "yì bǎi", "yi bǎi"],
      answer: 2,
      explain: "Przed 1., 2. i 3. tonem 一 to yì.",
    },
    {
      q: "Jak naprawdę brzmi 你好?",
      options: ["nǐ hǎo", "ní hǎo", "nì hǎo", "nǐ háo"],
      answer: 1,
      explain: "3. + 3. ton → 2. + 3. ton.",
    },
    {
      q: "Jak wymawiamy 一 w liczbie 十一 (11)?",
      options: ["yī", "yí", "yì", "yi"],
      answer: 0,
      explain: "Na końcu i przy liczeniu 一 zachowuje 1. ton.",
    },
    {
      q: "Jak brzmi 不来 (nie przyjść; lái = 2. ton)?",
      options: ["bú lái", "bù lái", "bu lái", "bǔ lái"],
      answer: 1,
      explain: "Przed 2. tonem 不 zostaje bù.",
    },
  ],
  practice: [
    "Przeczytaj z właściwymi zmianami: 不去, 不吃, 一天, 一样, 很好, 我很好.",
    "Kiedy mówisz 你好, zawsze świadomie zaczynaj od wznoszącego ní.",
  ],
};
