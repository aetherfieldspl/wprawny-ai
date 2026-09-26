import type { Lesson } from "../types";

export const lesson01: Lesson = {
  number: 1,
  slug: "01-jak-dziala-chinski",
  title: "Jak działa chiński",
  subtitle: "Znaki, pinyin i budowa sylaby — mapa, zanim ruszymy w drogę",
  goals: [
    "wiesz, czego dokładnie się uczysz (mandaryński, znaki uproszczone)",
    "rozumiesz różnicę między znakiem a pinyinem",
    "umiesz rozłożyć sylabę na inicjał, final i ton",
  ],
  blocks: [
    {
      kind: "text",
      title: "Czego się uczymy?",
      body: [
        "„Chiński” to w praktyce rodzina wielu języków i dialektów. My uczymy się standardowego mandaryńskiego — 普通话 (pǔtōnghuà, dosł. „wspólna mowa”). To język urzędowy Chin kontynentalnych, Tajwanu i jeden z języków Singapuru. Mówi nim ponad miliard ludzi.",
        "Piszemy znakami uproszczonymi (简体字 jiǎntǐzì), których używa się w Chinach kontynentalnych i Singapurze. Na Tajwanie i w Hongkongu używa się znaków tradycyjnych — jeśli poznasz uproszczone, tradycyjne w większości rozpoznasz.",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Dobra wiadomość na start",
      body: [
        "Chińska gramatyka jest pod wieloma względami prostsza od polskiej: nie ma przypadków, rodzajów gramatycznych ani odmiany czasowników przez osoby. 我是 (ja jestem), 你是 (ty jesteś), 他是 (on jest) — czasownik 是 zawsze wygląda tak samo.",
        "Trudność leży gdzie indziej: w tonach i w piśmie. I właśnie na tych fundamentach skupia się ten kurs.",
      ],
    },
    {
      kind: "text",
      title: "Trzy warstwy każdego słowa",
      body: [
        "Każde chińskie słowo ma trzy warstwy: dźwięk (sylaba + ton), zapis (znak) i znaczenie. W polskim zapis podpowiada wymowę. W chińskim znak mówi raczej o znaczeniu, a wymowy trzeba się nauczyć osobno — dlatego potrzebujemy pinyinu.",
        "Pinyin (拼音 pīnyīn, „składanie dźwięków”) to oficjalny zapis wymowy alfabetem łacińskim. Nie zastępuje znaków — Chińczycy nie czytają tekstów w pinyinie. Służy do nauki wymowy, w słownikach i… do pisania znaków na klawiaturze (o tym w lekcji 7).",
        "Zasada, która ułatwi Ci życie: jeden znak = jedna sylaba = zwykle jedna cząstka znaczenia. 中 to „środek”, 国 to „państwo”, a 中国 to „Państwo Środka”, czyli Chiny.",
      ],
    },
    {
      kind: "table",
      title: "Budowa sylaby: inicjał + final + ton",
      headers: ["Sylaba", "Znak", "Inicjał (spółgłoska)", "Final (reszta)", "Ton"],
      rows: [
        ["mā", "妈", "m", "a", "1 — wysoki, równy"],
        ["hǎo", "好", "h", "ao", "3 — opadająco-wznoszący"],
        ["zhōng", "中", "zh", "ong", "1 — wysoki, równy"],
        ["guó", "国", "g", "uo", "2 — wznoszący"],
        ["ài", "爱", "— (brak)", "ai", "4 — opadający"],
      ],
      hanziCols: [1],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Dlaczego tony są tak ważne?",
      body: [
        "Mandaryński ma tylko ok. 400 różnych sylab (bez tonów). Dla porównania — polski ma ich tysiące. Tony mnożą tę liczbę do ok. 1300 i to one odróżniają „mamę” (mā) od „konia” (mǎ). Ton jest częścią słowa tak samo jak jego głoski.",
      ],
    },
    {
      kind: "words",
      title: "Pierwsze słowa",
      items: [
        { hanzi: "你好", pinyin: "nǐ hǎo", pl: "cześć, dzień dobry", note: "dosł. „ty dobrze”" },
        { hanzi: "中文", pinyin: "Zhōngwén", pl: "język chiński (zwłaszcza pisany)" },
        { hanzi: "汉字", pinyin: "hànzì", pl: "chiński znak" },
        { hanzi: "拼音", pinyin: "pīnyīn", pl: "pinyin — zapis wymowy" },
        { hanzi: "普通话", pinyin: "pǔtōnghuà", pl: "standardowy mandaryński" },
        { hanzi: "中国", pinyin: "Zhōngguó", pl: "Chiny", note: "„Państwo Środka”" },
      ],
    },
    {
      kind: "puzzles",
      title: "Pierwsze puzzle",
      items: [
        {
          hanzi: "中",
          pinyin: "zhōng",
          pl: "środek",
          parts: [
            { part: "口", pl: "prostokąt — cel, tarcza" },
            { part: "丨", pl: "kreska przebijająca" },
          ],
          story: "Strzała trafia w sam środek tarczy.",
        },
        {
          hanzi: "国",
          pinyin: "guó",
          pl: "państwo",
          parts: [
            { part: "囗", pl: "ramka — granice" },
            { part: "玉", pl: "nefryt, skarb" },
          ],
          story: "Państwo to skarb otoczony granicami.",
        },
      ],
    },
  ],
  quiz: [
    {
      q: "Czym jest pinyin?",
      options: [
        "Uproszczoną wersją chińskich znaków",
        "Zapisem wymowy alfabetem łacińskim",
        "Dialektem z południa Chin",
        "Nazwą czwartego tonu",
      ],
      answer: 1,
      explain: "Pinyin zapisuje wymowę literami łacińskimi. Znaki nadal są podstawowym pismem.",
    },
    {
      q: "Z czego składa się chińska sylaba?",
      options: [
        "Z rdzenia i końcówki",
        "Z inicjału, finalu i tonu",
        "Z samogłoski i akcentu",
        "Z klucza i fonetyku",
      ],
      answer: 1,
      explain: "Np. hǎo = h (inicjał) + ao (final) + 3. ton.",
    },
    {
      q: "Co dosłownie znaczy 中国?",
      options: ["Wielki Mur", "Państwo Środka", "Język chiński", "Wschodnie morze"],
      answer: 1,
      explain: "中 = środek, 国 = państwo.",
    },
    {
      q: "Które zdanie o gramatyce chińskiej jest prawdziwe?",
      options: [
        "Czasowniki odmieniają się przez osoby",
        "Rzeczowniki mają 7 przypadków",
        "Czasownik 是 jest taki sam dla „ja”, „ty” i „on”",
        "Każde słowo ma rodzaj męski lub żeński",
      ],
      answer: 2,
      explain: "我是, 你是, 他是 — brak odmiany przez osoby.",
    },
  ],
  practice: [
    "Przepisz w zeszycie 你好 i 中国 — na razie po prostu obserwuj kształty.",
    "Weź 3 słowa z listy i rozłóż ich sylaby na inicjał / final / ton.",
  ],
};
