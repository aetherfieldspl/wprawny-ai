import type { Lesson } from "../types";

export const lesson12: Lesson = {
  number: 12,
  slug: "12-formalnie-i-nieformalnie",
  title: "Formalnie i nieformalnie",
  subtitle: "Jak przeprosić, podziękować i przywitać się w każdej sytuacji",
  goals: [
    "wiesz, kiedy powiedzieć 对不起, a kiedy 不好意思",
    "witasz się i żegnasz formalnie i na luzie",
    "przedstawiasz się i pytasz o nazwisko grzecznie",
  ],
  blocks: [
    {
      kind: "text",
      body: [
        "W chińskim, tak jak w polskim, inaczej mówi się do przyjaciela, a inaczej do szefa czy starszej osoby. Na szczęście różnica nie tkwi w gramatyce, tylko w wyborze kilku słów. Po tej lekcji będziesz wiedzieć, jak powiedzieć „przepraszam”, kiedy naprawdę kogoś zranisz, i jak wtedy, gdy przypadkiem nadepniesz komuś na stopę w metrze.",
      ],
    },
    {
      kind: "table",
      title: "„Przepraszam” — cztery różne słowa",
      headers: ["Wyrażenie", "Pinyin", "Kiedy?", "Rejestr"],
      rows: [
        ["对不起", "duìbuqǐ", "Prawdziwe przeprosiny — gdy kogoś zraniłeś, zawiodłeś, zrobiłeś coś naprawdę złego", "poważne"],
        ["不好意思", "bù hǎoyìsi", "Drobna wpadka: nadepnięcie na stopę, przeciskanie się, lekkie spóźnienie; też „głupio mi”", "codzienne, lekkie"],
        ["抱歉 / 很抱歉", "bàoqiàn / hěn bàoqiàn", "Oficjalne przeprosiny: komunikaty, e-maile, obsługa klienta", "formalne"],
        ["请问", "qǐngwèn", "„Przepraszam, czy mogę zapytać…” — zaczepiając kogoś z pytaniem", "grzeczne"],
      ],
      hanziCols: [0],
    },
    {
      kind: "callout",
      variant: "memory",
      title: "Skąd ta różnica?",
      body: [
        "对不起 dosłownie: „nie mogę stanąć z tobą twarzą w twarz” — wyraża poczucie winy wobec kogoś. Użyte do drobnostki brzmi przesadnie.",
        "不好意思 dosłownie: „niedobre uczucie” — raczej zakłopotanie niż wina. Dlatego pasuje do nadepnięcia na stopę, zawracania komuś głowy albo zaczepienia nieznajomego.",
      ],
    },
    {
      kind: "table",
      title: "Co powiedzieć, gdy…",
      headers: ["Sytuacja", "Powiedz"],
      rows: [
        ["nadepnąłeś komuś na stopę w metrze", "不好意思！"],
        ["zapomniałeś o urodzinach przyjaciela", "对不起！"],
        ["pytasz przechodnia o drogę", "请问… / 不好意思，…"],
        ["firma przeprasza klientów za opóźnienie", "很抱歉"],
        ["ktoś Cię przeprasza", "没关系 méi guānxi (nic nie szkodzi) / 没事 méi shì (spoko)"],
        ["ktoś Ci dziękuje", "不客气 bú kèqi / 不用谢 bú yòng xiè"],
      ],
    },
    {
      kind: "table",
      title: "Formalnie vs nieformalnie",
      headers: ["Funkcja", "Formalnie", "Nieformalnie"],
      rows: [
        ["powitanie", "您好 nín hǎo", "你好 nǐ hǎo / 嗨 hāi"],
        ["powitanie grupy", "大家好 dàjiā hǎo / 各位好 gèwèi hǎo", "你们好 nǐmen hǎo"],
        ["podziękowanie", "非常感谢 fēicháng gǎnxiè", "谢谢 xièxie / 多谢 duō xiè"],
        ["odpowiedź na podziękowanie", "不客气 bú kèqi", "没事 méi shì"],
        ["pożegnanie", "再见 zàijiàn", "拜拜 báibái / 回头见 huítóu jiàn"],
        ["pytanie o imię", "您贵姓？ Nín guì xìng?", "你叫什么名字？ Nǐ jiào shénme míngzi?"],
        ["prośba", "麻烦您… máfan nín…", "帮我一下 bāng wǒ yíxià"],
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Przedstawianie się",
      body: [
        "Formalnie: 您贵姓？ Nín guì xìng? — „Jak brzmi Pana/Pani szanowne nazwisko?” Odpowiadasz skromnie, bez 贵: 我姓王。 Wǒ xìng Wáng. — Nazywam się Wang.",
        "Nieformalnie: 你叫什么名字？ — Jak masz na imię? → 我叫安娜。 Wǒ jiào Ānnà. — Mam na imię Anna.",
        "Na koniec: 认识你很高兴！ Rènshi nǐ hěn gāoxìng! — Miło cię poznać!",
      ],
    },
    {
      kind: "callout",
      variant: "warning",
      title: "Tytuły i zwroty grzecznościowe",
      body: [
        "Nazwisko stoi PRZED tytułem: 王先生 Wáng xiānsheng (pan Wang), 李女士 Lǐ nǚshì (pani Li), 张老师 Zhāng lǎoshī (nauczyciel Zhang — tytuł 老师 okazuje szacunek także poza szkołą).",
        "Ostrożnie z 小姐 xiǎojie (panna) — w niektórych kontekstach ma dwuznaczny wydźwięk. Bezpieczniej: 女士 nǚshì.",
      ],
    },
    {
      kind: "words",
      title: "Słowniczek grzeczności",
      items: [
        { hanzi: "对不起", pinyin: "duìbuqǐ", pl: "przepraszam (poważnie)" },
        { hanzi: "不好意思", pinyin: "bù hǎoyìsi", pl: "sorry, przepraszam (lekko)" },
        { hanzi: "没关系", pinyin: "méi guānxi", pl: "nic nie szkodzi" },
        { hanzi: "谢谢", pinyin: "xièxie", pl: "dziękuję" },
        { hanzi: "不客气", pinyin: "bú kèqi", pl: "nie ma za co" },
        { hanzi: "请", pinyin: "qǐng", pl: "proszę (zapraszając)", note: "请进 qǐng jìn — proszę wejść, 请坐 qǐng zuò — proszę usiąść" },
        { hanzi: "请问", pinyin: "qǐngwèn", pl: "przepraszam, czy mogę zapytać" },
        { hanzi: "再见", pinyin: "zàijiàn", pl: "do widzenia" },
        { hanzi: "明天见", pinyin: "míngtiān jiàn", pl: "do jutra" },
        { hanzi: "慢走", pinyin: "màn zǒu", pl: "„idź powoli” — żegnając gościa" },
      ],
    },
    {
      kind: "text",
      title: "Dwa dialogi",
      body: [
        "W biurze: — 您好！您贵姓？ — 我姓李。 — 李先生，请坐。 — 谢谢。 — 不客气。",
        "W metrze: — 啊，不好意思！ — 没事，没事。",
        "Między przyjaciółmi: — 对不起，我忘了你的生日。 (Przepraszam, zapomniałem o twoich urodzinach.) — 没关系！",
      ],
    },
    {
      kind: "callout",
      variant: "tip",
      title: "Gratulacje — co dalej?",
      body: [
        "Masz za sobą wszystkie fundamenty: tony i ich wyjątki, pinyin, rozbieranie znaków na puzzle, pisanie ręczne i cyfrowe, budowanie słów, liczby do 99 999 999, zaimki i grzeczności.",
        "Kolejny krok: słownictwo egzaminu HSK 1 (ok. 150–300 słów, zależnie od wersji) i codzienny kontakt z językiem — nawet 15 minut dziennie robi różnicę. 加油！ Jiāyóu! — Dasz radę!",
      ],
    },
  ],
  quiz: [
    {
      q: "Przypadkiem nadepnąłeś komuś na stopę w metrze. Co mówisz?",
      options: ["对不起，我错了", "不好意思", "很抱歉，这是我们的错", "没关系"],
      answer: 1,
      explain: "不好意思 to lekkie „sorry” do drobnych wpadek.",
    },
    {
      q: "Zapomniałeś o ważnym spotkaniu z przyjacielem. Co mówisz?",
      options: ["不客气", "请问", "对不起", "慢走"],
      answer: 2,
      explain: "对不起 to prawdziwe przeprosiny, gdy kogoś zawiodłeś.",
    },
    {
      q: "Jak grzecznie zapytać starszą osobę o nazwisko?",
      options: ["你叫什么？", "您贵姓？", "你是谁？", "名字？"],
      answer: 1,
      explain: "您贵姓？ — Jak brzmi Pana/Pani szanowne nazwisko?",
    },
    {
      q: "Ktoś mówi Ci 谢谢. Co odpowiesz?",
      options: ["对不起", "不客气", "请问", "再见"],
      answer: 1,
      explain: "不客气 — nie ma za co.",
    },
    {
      q: "Jak zwrócić się do pana o nazwisku Wang?",
      options: ["先生王", "王先生", "王老", "先生"],
      answer: 1,
      explain: "Nazwisko przed tytułem: 王先生.",
    },
  ],
  practice: [
    "Wyobraź sobie 5 sytuacji z dnia i dobierz do każdej właściwe „przepraszam”.",
    "Przedstaw się na głos na dwa sposoby: formalnie i nieformalnie.",
  ],
};
