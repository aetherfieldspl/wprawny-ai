// scripts/scrape-biuletyn.mjs
// Scraper Biuletynu UODO (https://nowybiuletyn.uodo.gov.pl/) do plików Markdown.
//
// Każdy artykuł zapisywany jest jako osobny plik .md z nagłówkiem YAML
// (tytuł, URL, data, autor, kategorie) + treść skonwertowana z HTML na Markdown.
// Dodatkowo generowany jest index.md ze spisem wszystkich artykułów.
//
// Jak działa wykrywanie artykułów:
//   - REST API WordPressa jest zablokowane (401), brak mapy sitemap,
//   - używamy więc kanału RSS z paginacją: /feed/?paged=1, 2, 3, …
//     (10 wpisów na stronę, koniec gdy strona nie zwraca <item>).
//   - pełną treść pobieramy z osobnej strony każdego artykułu
//     (kanał RSS zawiera tylko skrót w <description>).
//
// Użycie:
//   node scripts/scrape-biuletyn.mjs                 # pobierz wszystko
//   node scripts/scrape-biuletyn.mjs --limit=20      # tylko 20 najnowszych
//   node scripts/scrape-biuletyn.mjs --out=dane/uodo # inny katalog wyjściowy
//   node scripts/scrape-biuletyn.mjs --force         # nadpisz istniejące pliki
//   node scripts/scrape-biuletyn.mjs --delay=1500    # odstęp między żądaniami (ms)
//   node scripts/scrape-biuletyn.mjs --list-only     # tylko wypisz listę URL-i
//
// Uruchom też przez: npm run scrape:biuletyn

import { mkdir, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE = "https://nowybiuletyn.uodo.gov.pl";
const USER_AGENT =
  "wprawny.ai-biuletyn-scraper/1.0 (+https://wprawny.pl; kontakt: redakcja@wprawny.pl)";

// ─────────────────────────────────────────────────────────────────────────────
// Argumenty CLI
// ─────────────────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {
    out: join(__dirname, "..", "scraped", "biuletyn-uodo"),
    limit: Infinity,
    maxPages: 200,
    delay: 800,
    force: false,
    listOnly: false,
  };
  for (const a of argv) {
    if (a === "--force") args.force = true;
    else if (a === "--list-only") args.listOnly = true;
    else if (a.startsWith("--out=")) args.out = a.slice(6);
    else if (a.startsWith("--limit=")) args.limit = Number(a.slice(8)) || Infinity;
    else if (a.startsWith("--max-pages=")) args.maxPages = Number(a.slice(12)) || 200;
    else if (a.startsWith("--delay=")) args.delay = Number(a.slice(8)) || 0;
    else if (a === "--help" || a === "-h") {
      console.log(
        "Użycie: node scripts/scrape-biuletyn.mjs [--limit=N] [--out=DIR] [--force] [--delay=MS] [--max-pages=N] [--list-only]"
      );
      process.exit(0);
    }
  }
  return args;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pomocnicze
// ─────────────────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchText(url, { retries = 3 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml,application/xml" },
        redirect: "follow",
      });
      if (res.status === 404) return null; // brak strony — nie ponawiamy
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      lastErr = e;
      if (attempt < retries) {
        const backoff = 2000 * 2 ** attempt; // 2s, 4s, 8s
        console.warn(`  ! ${url} — ${e.message}, ponawiam za ${backoff / 1000}s`);
        await sleep(backoff);
      }
    }
  }
  throw new Error(`Nie udało się pobrać ${url}: ${lastErr?.message}`);
}

// Dekodowanie encji HTML (nazwane + liczbowe).
const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  laquo: "«", raquo: "»", hellip: "…", mdash: "—", ndash: "–",
  bdquo: "„", rdquo: "”", ldquo: "“", lsquo: "‘", rsquo: "’",
  oacute: "ó", Oacute: "Ó", copy: "©", reg: "®", deg: "°",
  euro: "€", sect: "§", middot: "·", bull: "•", times: "×",
};
function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : m
    );
}

function slugFromUrl(url) {
  const m = url.match(/\/([^/]+)\/?$/);
  return (m ? m[1] : "artykul").replace(/[^a-z0-9-]/gi, "-").slice(0, 120);
}

function yamlEscape(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Wykrywanie artykułów przez kanał RSS (z paginacją)
// ─────────────────────────────────────────────────────────────────────────────
function parseFeedItems(xml) {
  const items = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  for (const block of blocks) {
    const pick = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      if (!m) return "";
      return decodeEntities(m[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim());
    };
    const link = pick("link");
    if (!link) continue;
    const categories = [...block.matchAll(/<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g)].map(
      (m) => decodeEntities(m[1].trim())
    );
    items.push({
      title: pick("title"),
      link,
      author: pick("dc:creator"),
      pubDate: pick("pubDate"),
      description: pick("description"),
      categories,
    });
  }
  return items;
}

async function discoverArticles({ maxPages, limit, delay }) {
  const found = [];
  const seen = new Set();
  for (let page = 1; page <= maxPages; page++) {
    const url = `${SITE}/feed/?paged=${page}`;
    process.stdout.write(`↓ kanał RSS, strona ${page}… `);
    const xml = await fetchText(url);
    const items = xml ? parseFeedItems(xml) : [];
    if (items.length === 0) {
      console.log("brak wpisów — koniec.");
      break;
    }
    let added = 0;
    for (const it of items) {
      if (seen.has(it.link)) continue;
      seen.add(it.link);
      found.push(it);
      added++;
      if (found.length >= limit) break;
    }
    console.log(`${added} nowych (łącznie ${found.length}).`);
    if (found.length >= limit) break;
    await sleep(delay);
  }
  return found.slice(0, limit);
}

// ─────────────────────────────────────────────────────────────────────────────
// Ekstrakcja treści ze strony artykułu
// ─────────────────────────────────────────────────────────────────────────────
function extractArticle(html) {
  const out = {};

  // Tytuł
  const titleM = html.match(/<h1[^>]*class="[^"]*cm-entry-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/);
  if (titleM) out.title = decodeEntities(stripTags(titleM[1]).trim());

  // Data publikacji (atrybut datetime pierwszego <time class="entry-date …">)
  const dateM = html.match(
    /<time[^>]*class="[^"]*entry-date[^"]*"[^>]*datetime="([^"]+)"/
  );
  if (dateM) out.datetime = dateM[1];

  // Kategorie (linki rel="category tag")
  out.categories = [
    ...html.matchAll(/rel="category tag"[^>]*>([\s\S]*?)<\/a>/g),
  ].map((m) => decodeEntities(stripTags(m[1]).trim()));

  // Treść: wnętrze <div class="cm-entry-summary"> aż do </article>
  const start = html.search(/<div[^>]*class="[^"]*cm-entry-summary[^"]*"[^>]*>/);
  let body = "";
  if (start !== -1) {
    const after = html.slice(start);
    const open = after.match(/<div[^>]*class="[^"]*cm-entry-summary[^"]*"[^>]*>/)[0];
    body = after.slice(open.length);
    const end = body.search(/<\/article>/);
    if (end !== -1) body = body.slice(0, end);
    // usuń przycisk „Pobierz PDF" i nawigację stron
    body = body
      .replace(/<div[^>]*class="[^"]*dkpdf-button-container[^"]*"[^>]*>[\s\S]*?<\/div>/g, "")
      .replace(/<ul[^>]*class="[^"]*default-wp-page[^"]*"[^>]*>[\s\S]*?<\/ul>/g, "");
  }
  out.html = body;
  return out;
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "");
}

// ─────────────────────────────────────────────────────────────────────────────
// Konwersja HTML → Markdown (uproszczona, pod bloki WordPressa)
// ─────────────────────────────────────────────────────────────────────────────
function htmlToMarkdown(html) {
  if (!html) return "";
  let s = html;

  // usuń elementy bez treści tekstowej
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, "");
  s = s.replace(/<!--[\s\S]*?-->/g, "");

  // obrazy (z figure/figcaption)
  s = s.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, (_, inner) => {
    const img = inner.match(/<img[^>]*>/i);
    if (!img) return "";
    const src = (img[0].match(/\bsrc="([^"]+)"/i) || [])[1] || "";
    const alt = decodeEntities((img[0].match(/\balt="([^"]*)"/i) || [])[1] || "");
    const cap = inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
    const caption = cap ? decodeEntities(stripTags(cap[1]).trim()) : alt;
    return src ? `\n\n![${caption}](${src})\n\n` : "";
  });
  s = s.replace(/<img[^>]*\bsrc="([^"]+)"[^>]*>/gi, (m, src) => {
    const alt = decodeEntities((m.match(/\balt="([^"]*)"/i) || [])[1] || "");
    return `\n\n![${alt}](${src})\n\n`;
  });

  // nagłówki
  for (let i = 1; i <= 6; i++) {
    const re = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\\/h${i}>`, "gi");
    s = s.replace(re, (_, t) => {
      // nagłówek w całości pogrubiony → usuń zbędne **…**
      const text = inlineToMd(t).trim().replace(/^\*\*([\s\S]+)\*\*$/, "$1").trim();
      return `\n\n${"#".repeat(i)} ${text}\n\n`;
    });
  }

  // listy
  s = s.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => "\n\n" + listItems(inner, "- ") + "\n\n");
  s = s.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => "\n\n" + listItems(inner, "1. ") + "\n\n");

  // cytaty
  s = s.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
    const text = inlineToMd(inner.replace(/<\/?p[^>]*>/gi, "\n")).trim();
    return "\n\n" + text.split(/\n+/).map((l) => `> ${l.trim()}`).join("\n") + "\n\n";
  });

  // poziome linie
  s = s.replace(/<hr[^>]*>/gi, "\n\n---\n\n");

  // akapity
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${inlineToMd(t).trim()}\n\n`);
  s = s.replace(/<\/?div[^>]*>/gi, "\n\n");

  // pozostałe elementy inline + sprzątanie
  s = inlineToMd(s);
  s = stripTags(s);
  s = decodeEntities(s);

  // normalizacja białych znaków
  s = s.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ");
  return s.trim();
}

function inlineToMd(t) {
  return t
    .replace(/<br\s*\/?>/gi, "  \n")
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, x) => `**${x.trim()}**`)
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, x) => `*${x.trim()}*`)
    .replace(/<a[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, txt) => {
      const label = stripTags(txt).trim();
      return label ? `[${label}](${href})` : "";
    });
}

function listItems(inner, marker) {
  return [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => `${marker}${inlineToMd(m[1]).replace(/\s+/g, " ").trim()}`)
    .filter((l) => l.replace(marker, "").trim().length > 0)
    .join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// Zapis pliku Markdown
// ─────────────────────────────────────────────────────────────────────────────
function buildMarkdown(meta, article) {
  const title = article.title || meta.title || "(bez tytułu)";
  const categories =
    (article.categories && article.categories.length ? article.categories : meta.categories) || [];
  const date = article.datetime || meta.pubDate || "";

  const fm = ["---"];
  fm.push(`title: ${yamlEscape(title)}`);
  fm.push(`url: ${yamlEscape(meta.link)}`);
  if (date) fm.push(`date: ${yamlEscape(date)}`);
  if (meta.author) fm.push(`author: ${yamlEscape(meta.author)}`);
  if (categories.length) {
    fm.push("categories:");
    for (const c of categories) fm.push(`  - ${yamlEscape(c)}`);
  }
  fm.push(`source: ${yamlEscape("Biuletyn UODO (nowybiuletyn.uodo.gov.pl)")}`);
  fm.push(`scraped_at: ${yamlEscape(new Date().toISOString())}`);
  fm.push("---");

  const bodyMd = htmlToMarkdown(article.html);
  const lead = bodyMd ? bodyMd : (meta.description || "");
  return `${fm.join("\n")}\n\n# ${title}\n\n${lead}\n`;
}

function buildIndex(entries) {
  const lines = [
    "# Biuletyn UODO — spis artykułów",
    "",
    `> Źródło: ${SITE}`,
    `> Pobrano: ${new Date().toISOString()} — ${entries.length} artykułów`,
    "",
  ];
  for (const e of entries) {
    const d = (e.date || "").slice(0, 10);
    lines.push(`- ${d ? `**${d}** — ` : ""}[${e.title}](./${e.file}) ([oryginał](${e.url}))`);
  }
  return lines.join("\n") + "\n";
}

// ─────────────────────────────────────────────────────────────────────────────
// Główna logika
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`Scraper Biuletynu UODO → ${args.out}\n`);

  const items = await discoverArticles(args);
  console.log(`\nZnaleziono ${items.length} artykułów.\n`);

  if (args.listOnly) {
    for (const it of items) console.log(`${it.pubDate?.slice(0, 16) || ""}  ${it.link}`);
    return;
  }

  await mkdir(args.out, { recursive: true });

  const index = [];
  let written = 0,
    skipped = 0,
    failed = 0;

  for (let i = 0; i < items.length; i++) {
    const meta = items[i];
    const slug = slugFromUrl(meta.link);
    const file = `${slug}.md`;
    const dest = join(args.out, file);
    const tag = `[${i + 1}/${items.length}]`;

    if (!args.force && (await exists(dest))) {
      console.log(`${tag} ⏭  ${file} (istnieje — pomijam)`);
      index.push({ title: meta.title, url: meta.link, date: meta.pubDate, file });
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`${tag} ↓ ${slug}… `);
      const html = await fetchText(meta.link);
      if (!html) throw new Error("404 / brak strony");
      const article = extractArticle(html);
      const md = buildMarkdown(meta, article);
      await writeFile(dest, md, "utf8");
      const words = htmlToMarkdown(article.html).split(/\s+/).filter(Boolean).length;
      console.log(`zapisano (${words} słów)`);
      index.push({
        title: article.title || meta.title,
        url: meta.link,
        date: article.datetime || meta.pubDate,
        file,
      });
      written++;
    } catch (e) {
      console.log(`BŁĄD: ${e.message}`);
      failed++;
    }
    await sleep(args.delay);
  }

  // index.md
  if (index.length) {
    index.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    await writeFile(join(args.out, "index.md"), buildIndex(index), "utf8");
  }

  console.log(
    `\nGotowe. Zapisano ${written}, pominięto ${skipped}, błędów ${failed}. Katalog: ${args.out}`
  );
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("\nBłąd scrapera:", e.message);
  process.exit(1);
});
