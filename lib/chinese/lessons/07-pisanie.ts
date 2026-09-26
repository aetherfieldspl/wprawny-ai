import type { Lesson } from "../types";

export const lesson07: Lesson = {
  number: 7,
  slug: "07-pisanie",
  title: "Pisanie ręczne i cyfrowe",
  subtitle: "Kreski, kolejność kresek i chińska klawiatura w telefonie",
  goals: [
    "znasz 8 podstawowych kresek",
    "stosujesz reguły kolejności kresek",
    "piszesz po chińsku na komputerze i telefonie",
  ],
  blocks: [
    {
      kind: "text",
      title: "Część 1: pisanie ręczne",
      body: [
        "Każdy znak składa się z kresek pisanych w ustalonej kolejności i kierunku. Kolejność nie jest kaprysem kaligrafów: dzięki niej znak wygląda proporcjonalnie, piszesz szybciej, a rozpoznawanie pisma odręcznego w telefonie działa lepiej.",
      ],
    },
    {
      kind: "table",
      title: "8 podstawowych kresek",
      headers: ["Kreska", "Nazwa", "Opis", "Gdzie ją znajdziesz"],
      rows: [
        ["一", "横 héng", "pozioma, od lewej do prawej", "一, 二, 三"],
        ["丨", "竖 shù", "pionowa, z góry na dół", "十, 中"],
        ["丿", "撇 piě", "opadająca w lewo", "人 (lewa noga), 八"],
        ["㇏", "捺 nà", "opadająca w prawo, pogrubiona na końcu", "人 (prawa noga), 大"],
        ["丶", "点 diǎn", "kropka / krótka kreska", "六, 小, 我 (ostatnia)"],
        ["㇀", "提 tí", "krótka, wznosząca w prawo", "我 (piąta kreska), 冷"],
        ["𠃍", "折 zhé", "łamana — pozioma przechodząca w pionową", "口, 日, 月"],
        ["亅", "钩 gōu", "haczyk na końcu kreski", "小, 水, 你"],
      ],
      hanziCols: [0],
    },
    {
      kind: "table",
      title: "Reguły kolejności kresek",
      headers: ["Reguła", "Przykład"],
      rows: [
        ["1. Pozioma przed pionową", "十: 一 potem 丨"],
        ["2. Od góry do dołu", "三: kreska górna, środkowa, dolna"],
        ["3. Od lewej do prawej", "你: najpierw 亻, potem 尔"],
        ["4. Opadająca w lewo przed opadającą w prawo", "人, 八, 大"],
        ["5. Najpierw rama, potem środek", "月, 同, 问"],
        ["6. Zamknij ramę na końcu", "日, 国: rama → środek → dolna kreska"],
        ["7. Środek przed bokami", "小, 水"],
        ["8. Kropki i drobne kreski na końcu", "我, 犬"],
        ["9. Klucz 辶 piszemy na końcu", "这, 进, 远"],
      ],
    },
    {
      kind: "table",
      title: "Liczba kresek — sprawdź się",
      headers: ["Znak", "Kreski", "Kolejność"],
      rows: [
        ["十", "2", "一 → 丨"],
        ["人", "2", "丿 → ㇏"],
        ["口", "3", "丨 → 𠃍 → 一"],
        ["大", "3", "一 → 丿 → ㇏"],
        ["小", "3", "亅 (środek) → lewa kropka → prawa kropka"],
        ["中", "4", "丨 → 𠃍 → 一 → długie 丨 przez środek"],
        ["日", "4", "丨 → 𠃍 → środkowa 一 → dolna 一 (zamknięcie)"],
        ["我", "7", "丿 → 一 → 亅 → ㇀ → 斜钩 → 丿 → 丶"],
      ],
      hanziCols: [0],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Kratka 田字格 tiánzìgé",
      body: [
        "Ćwicz w kratce podzielonej na 4 części (jak znak 田 — pole). Każdy znak, niezależnie od liczby kresek, zajmuje tyle samo miejsca — kwadrat. Środkowe linie pomogą Ci trzymać proporcje.",
      ],
    },
    {
      kind: "text",
      title: "Część 2: pisanie cyfrowe",
      body: [
        "Chińczycy na co dzień piszą na klawiaturze przez pinyin. Wpisujesz sylaby literami, a system podpowiada pasujące znaki. Wybierasz właściwy — gotowe. Tonów nie wpisujesz.",
        "Przykład: wpisujesz „nihao” → z listy wybierasz 你好. Wpisujesz „woshibolanren” → 我是波兰人 (Jestem Polakiem/Polką).",
      ],
    },
    {
      kind: "table",
      title: "Jak dodać chińską klawiaturę",
      headers: ["Urządzenie", "Gdzie", "Co wybrać"],
      rows: [
        ["iPhone / iPad", "Ustawienia → Ogólne → Klawiatura → Klawiatury → Dodaj klawiaturę", "Chiński uproszczony → Pinyin – QWERTY oraz Pismo odręczne"],
        ["Android (Gboard)", "Ustawienia Gboard → Języki → Dodaj klawiaturę", "Chiński (uproszczony) → Pinyin oraz Pismo odręczne"],
        ["Windows", "Ustawienia → Czas i język → Język → Dodaj język", "Chiński (uproszczony, ChRL) — Microsoft Pinyin"],
        ["macOS", "Ustawienia systemowe → Klawiatura → Źródła wprowadzania", "Chiński uproszczony → Pinyin – uproszczony"],
      ],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Triki na klawiaturze",
      body: [
        "ü wpisujesz jako „v”: nv → 女 (kobieta), lv → 绿 (zielony).",
        "Wpisuj całe wyrażenia zamiast pojedynczych sylab — system trafniej wybierze znaki.",
        "Działają skróty z pierwszych liter: „nh” → 你好, „xx” → 谢谢.",
        "Przełączanie języka: Windows — Win + Spacja, macOS — Ctrl + Spacja (lub klawisz globusa).",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Pismo odręczne w telefonie",
      body: [
        "Widzisz znak na szyldzie albo w menu, ale nie wiesz, jak go przeczytać? Narysuj go palcem na klawiaturze „Pismo odręczne”, a telefon go rozpozna. Tu właśnie przydaje się poprawna kolejność kresek — przy dobrze pisanych znakach rozpoznawanie jest dużo pewniejsze.",
      ],
    },
    {
      kind: "words",
      title: "Przepisz ręcznie, potem wpisz na klawiaturze",
      items: [
        { hanzi: "十", pinyin: "shí", pl: "dziesięć", note: "wpisz: shi" },
        { hanzi: "大", pinyin: "dà", pl: "duży", note: "wpisz: da" },
        { hanzi: "小", pinyin: "xiǎo", pl: "mały", note: "wpisz: xiao" },
        { hanzi: "女", pinyin: "nǚ", pl: "kobieta", note: "wpisz: nv" },
        { hanzi: "我", pinyin: "wǒ", pl: "ja", note: "wpisz: wo" },
        { hanzi: "波兰人", pinyin: "Bōlánrén", pl: "Polak, Polka", note: "wpisz: bolanren" },
      ],
    },
  ],
  quiz: [
    {
      q: "Co piszemy najpierw w znaku 十?",
      options: ["Kreskę pionową", "Kreskę poziomą", "Obojętnie", "Kropkę"],
      answer: 1,
      explain: "Reguła: pozioma przed pionową.",
    },
    {
      q: "Jak wpisać ü na klawiaturze pinyin?",
      options: ["u", "uu", "v", "y"],
      answer: 2,
      explain: "Litera v zastępuje ü: nv → 女, lv → 绿.",
    },
    {
      q: "Kiedy zamykamy dolną kreskę ramy w 日 lub 国?",
      options: ["Na początku", "Po lewej kresce", "Na samym końcu", "Przed górną kreską"],
      answer: 2,
      explain: "Najpierw rama, potem środek, a „drzwi” zamykamy na końcu.",
    },
    {
      q: "Czy przy pisaniu pinyinem na klawiaturze wpisujesz tony?",
      options: [
        "Tak, cyframi 1–4",
        "Tak, znakami diakrytycznymi",
        "Nie, wybierasz znak z listy podpowiedzi",
        "Tylko 3. ton",
      ],
      answer: 2,
      explain: "Wpisujesz same litery, a system podpowiada znaki do wyboru.",
    },
    {
      q: "Ile kresek ma znak 口?",
      options: ["2", "3", "4", "5"],
      answer: 1,
      explain: "丨, 𠃍 (łamana), 一 — trzy kreski.",
    },
  ],
  practice: [
    "Dodaj chińską klawiaturę w telefonie i napisz komuś 你好！",
    "Przepisz każdy znak z tabeli 5 razy w kratce 田字格, pilnując kolejności kresek.",
  ],
};
