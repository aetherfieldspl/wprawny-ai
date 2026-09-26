import type { Lesson } from "../types";

export const lesson02: Lesson = {
  number: 2,
  slug: "02-tony",
  title: "Cztery tony (i jeden neutralny)",
  subtitle: "Melodia, która zmienia znaczenie",
  goals: [
    "rozpoznajesz i wymawiasz cztery tony oraz ton neutralny",
    "wiesz, nad którą samogłoską postawić znak tonu",
    "masz skojarzenie do każdego tonu, które zostanie w głowie",
  ],
  blocks: [
    {
      kind: "text",
      body: [
        "Ton to linia melodyczna, po której „jedzie” głos podczas wymawiania sylaby. W polskim melodia zmienia nastrój zdania (pytanie / stwierdzenie), w chińskim zmienia znaczenie słowa. Ta sama sylaba ma w każdym tonie inne znaczenie.",
        "Wysokość głosu opisuje się skalą 1–5 (1 = najniżej, 5 = najwyżej w Twoim naturalnym zakresie). Nie chodzi o absolutną wysokość, tylko o kształt ruchu głosu.",
      ],
    },
    { kind: "tones" },
    {
      kind: "table",
      title: "Tony w pigułce",
      headers: ["Ton", "Zapis", "Przebieg", "Skojarzenie", "Przykład"],
      rows: [
        ["1.", "ā", "wysoki, równy (5→5)", "u lekarza: „aaaa”", "妈 mā — mama"],
        ["2.", "á", "wznoszący (3→5)", "zdziwione „Co?!”", "麻 má — konopie"],
        ["3.", "ǎ", "nisko, w dół i w górę (2→1→4)", "powątpiewające „No, nie wiem…”", "马 mǎ — koń"],
        ["4.", "à", "ostro opadający (5→1)", "stanowcze „Nie!”, „Stop!”", "骂 mà — besztać"],
        ["neutralny", "a", "krótki, lekki, bez akcentu", "odbicie po poprzedniej sylabie", "吗 ma — partykuła pytająca"],
      ],
    },
    {
      kind: "words",
      title: "Klasyczna seria „ma”",
      items: [
        { hanzi: "妈", pinyin: "mā", pl: "mama" },
        { hanzi: "麻", pinyin: "má", pl: "konopie; drętwy" },
        { hanzi: "马", pinyin: "mǎ", pl: "koń" },
        { hanzi: "骂", pinyin: "mà", pl: "besztać, kląć" },
        { hanzi: "吗", pinyin: "ma", pl: "partykuła pytająca", note: "ton neutralny" },
      ],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Zdanie do zapamiętania",
      body: [
        "妈妈骂马吗？ Māma mà mǎ ma? — „Czy mama beszta konia?” Pięć razy „ma”, cztery różne znaczenia. Powtórz je na głos, rysując ręką tony w powietrzu.",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Gdzie stawiamy znak tonu?",
      body: [
        "1) Jeśli jest „a” lub „e” — znak idzie na nie: hǎo, xiè.",
        "2) W połączeniu „ou” — na „o”: zǒu.",
        "3) W pozostałych przypadkach — na ostatnią samogłoskę: guì, liù, duō.",
      ],
    },
    {
      kind: "words",
      title: "Słowa do ćwiczenia tonów",
      items: [
        { hanzi: "书", pinyin: "shū", pl: "książka", note: "1. ton" },
        { hanzi: "八", pinyin: "bā", pl: "osiem", note: "1. ton" },
        { hanzi: "茶", pinyin: "chá", pl: "herbata", note: "2. ton" },
        { hanzi: "人", pinyin: "rén", pl: "człowiek", note: "2. ton" },
        { hanzi: "我", pinyin: "wǒ", pl: "ja", note: "3. ton" },
        { hanzi: "好", pinyin: "hǎo", pl: "dobry, dobrze", note: "3. ton" },
        { hanzi: "是", pinyin: "shì", pl: "być", note: "4. ton" },
        { hanzi: "大", pinyin: "dà", pl: "duży", note: "4. ton" },
      ],
    },
    {
      kind: "callout",
      variant: "warning",
      title: "Najczęstsze błędy Polaków",
      body: [
        "1. ton za nisko — trzymaj go wysoko i równo, jak nutę śpiewaną.",
        "3. ton przeciągany w nieskończoność — w mowie potocznej to głównie niskie „zejście w dół”; pełną wersję słychać tylko w izolacji i na końcu zdania.",
        "4. ton zbyt łagodny — ma być krótki i zdecydowany, jak polecenie.",
      ],
    },
  ],
  quiz: [
    {
      q: "Który ton jest wznoszący, jak zdziwione „Co?!”?",
      options: ["1.", "2.", "3.", "4."],
      answer: 1,
      explain: "2. ton idzie w górę: má, rén, chá.",
    },
    {
      q: "Co znaczy mǎ (马)?",
      options: ["mama", "konopie", "koń", "besztać"],
      answer: 2,
      explain: "马 mǎ — 3. ton — koń.",
    },
    {
      q: "Jak poprawnie zapisać „liu” w 4. tonie?",
      options: ["lìu", "liù", "líu", "lìù"],
      answer: 1,
      explain: "Nie ma „a”, „e” ani „ou”, więc znak idzie na ostatnią samogłoskę: liù.",
    },
    {
      q: "Jak brzmi ton neutralny?",
      options: [
        "Wysoko i równo",
        "Krótko i lekko, bez własnej melodii",
        "Opada, potem rośnie",
        "Ostro opada",
      ],
      answer: 1,
      explain: "Ton neutralny jest krótki i nieakcentowany, np. 吗 ma, 妈妈 māma.",
    },
    {
      q: "Który przykład ma 4. ton?",
      options: ["书 shū", "茶 chá", "我 wǒ", "大 dà"],
      answer: 3,
      explain: "大 dà — znak ` oznacza ton opadający.",
    },
  ],
  practice: [
    "Codziennie przez 5 minut powtarzaj serię mā–má–mǎ–mà, rysując tony ręką.",
    "Nagraj się na telefonie i porównaj z wymową (przycisk 🔊 przy słowach).",
  ],
};
