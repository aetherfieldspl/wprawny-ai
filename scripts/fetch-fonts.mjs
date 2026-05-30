// scripts/fetch-fonts.mjs
// Pobiera fonty z polskimi znakami potrzebne do generowania raportu PDF.
// react-pdf domyślnie używa Helvetica, która NIE ma polskich znaków (ą, ć, ę, ł…),
// dlatego rejestrujemy lokalny font (Lato — pełny zestaw latin-ext).
//
// Uruchom: npm run fonts

import { mkdir, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, "..", "public", "fonts");

const BASE = "https://raw.githubusercontent.com/google/fonts/main";
const FONTS = [
  // Body (UI + raport PDF)
  { file: "Lato-Regular.ttf", url: `${BASE}/ofl/lato/Lato-Regular.ttf` },
  { file: "Lato-Bold.ttf", url: `${BASE}/ofl/lato/Lato-Bold.ttf` },
  // Display (nagłówki)
  { file: "Spectral-Regular.ttf", url: `${BASE}/ofl/spectral/Spectral-Regular.ttf` },
  { file: "Spectral-Medium.ttf", url: `${BASE}/ofl/spectral/Spectral-Medium.ttf` },
  { file: "Spectral-SemiBold.ttf", url: `${BASE}/ofl/spectral/Spectral-SemiBold.ttf` },
  { file: "Spectral-MediumItalic.ttf", url: `${BASE}/ofl/spectral/Spectral-MediumItalic.ttf` },
  // Mono (odwołania do artykułów)
  { file: "IBMPlexMono-Regular.ttf", url: `${BASE}/ofl/ibmplexmono/IBMPlexMono-Regular.ttf` },
  { file: "IBMPlexMono-Medium.ttf", url: `${BASE}/ofl/ibmplexmono/IBMPlexMono-Medium.ttf` },
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(FONT_DIR, { recursive: true });
  for (const f of FONTS) {
    const dest = join(FONT_DIR, f.file);
    if (await exists(dest)) {
      console.log(`✓ ${f.file} już istnieje — pomijam`);
      continue;
    }
    process.stdout.write(`↓ pobieram ${f.file}… `);
    const res = await fetch(f.url);
    if (!res.ok) throw new Error(`Nie udało się pobrać ${f.url} (${res.status})`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`gotowe (${Math.round(buf.length / 1024)} KB)`);
  }
  console.log("\nFonty gotowe w public/fonts.");
}

main().catch((e) => {
  console.error("\nBłąd pobierania fontów:", e.message);
  process.exit(1);
});
