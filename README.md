# wprawny.ai — Audyt gotowości na AI Act (Produkt A, MVP)

Darmowy, self-serve audyt, który w kilka minut klasyfikuje system AI organizacji wg AI Act,
pokazuje listę obowiązków i generuje raport PDF. Pełni rolę lejka (lead magnet) dla marki
doradczej **wprawny.pl**.

> ⚠️ **Status: wersja robocza do weryfikacji prawnej.** Treść pytań, mapowanie obowiązków,
> odwołania do artykułów i daty to **draft** przygotowany na podstawie struktury AI Act.
> Przed publikacją musi je potwierdzić prawnik. Patrz sekcja **„Co musi zweryfikować prawnik"**.

---

## Stos technologiczny

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Klasyfikator**: czysty, deterministyczny moduł TS (`lib/classifier.ts`) — bez LLM, w pełni audytowalny
- **PDF**: `@react-pdf/renderer` (render po stronie serwera, font lokalny z polskimi znakami)
- **Fonty**: hostowane lokalnie (`public/fonts`) — brak zapytań do Google Fonts (zgodność z RODO)
- Testy: **Vitest**

## Szybki start

```bash
npm install
npm run fonts     # pobiera fonty z polskimi znakami do public/fonts (jeśli ich brak)
npm run dev       # http://localhost:3000
```

Pozostałe komendy:

```bash
npm run build     # produkcyjny build
npm start         # serwer produkcyjny
npm test          # testy klasyfikatora (Vitest)
```

> Fonty są już dołączone w `public/fonts`. `npm run fonts` przydaje się tylko, gdyby ich brakowało
> (pobiera Lato, Spectral, IBM Plex Mono z repozytorium google/fonts).

## Scraper Biuletynu UODO

Skrypt `scripts/scrape-biuletyn.mjs` pobiera artykuły z Biuletynu UODO
(<https://nowybiuletyn.uodo.gov.pl/>) i zapisuje każdy jako plik **Markdown**
z nagłówkiem YAML (tytuł, URL, data, autor, kategorie) oraz treścią
skonwertowaną z HTML na Markdown. Dodatkowo tworzy `index.md` ze spisem artykułów.

```bash
npm run scrape:biuletyn                       # pobierz wszystkie artykuły
npm run scrape:biuletyn -- --limit=20         # tylko 20 najnowszych
npm run scrape:biuletyn -- --out=dane/uodo    # inny katalog wyjściowy
npm run scrape:biuletyn -- --force            # nadpisz istniejące pliki
npm run scrape:biuletyn -- --list-only        # tylko wypisz listę URL-i
npm run scrape:biuletyn -- --delay=1500       # odstęp między żądaniami (ms)
```

Domyślny katalog wyjściowy to `scraped/biuletyn-uodo/` (ignorowany przez git).
Skrypt nie ma zależności — używa wbudowanego `fetch` Node.js. Wykrywanie
artykułów odbywa się przez kanał RSS z paginacją (`/feed/?paged=N`), ponieważ
REST API WordPressa jest zablokowane, a mapy sitemap brak. Domyślnie pomija już
pobrane pliki (`--force` wymusza ponowne pobranie). Skrypt jest grzeczny:
ustawia `User-Agent`, robi odstępy między żądaniami i ponawia próby z backoffem.

## Struktura projektu

```
app/
  page.tsx              Landing (E1) — propozycja wartości, CTA
  audyt/page.tsx        Kreator audytu
  api/lead/route.ts     Zapis leada (MVP: log; TODO: Supabase + Resend)
  api/report/route.ts   Generowanie raportu PDF
components/
  audit/                Kreator: AuditWizard + kroki + ekran wyniku
  ui/                   Logo, Button, RiskBadge, DisclaimerBar
lib/
  types.ts              Typy domenowe
  questions.ts          Baza pytań (Blok 0, A, B, GPAI, C, D)  ← treść do weryfikacji
  obligations.ts        Mapowanie obowiązków na wyniki          ← treść do weryfikacji
  classifier.ts         Drzewo decyzyjne (IP)                   ← logika do weryfikacji
  classifier.test.ts    Testy logiki klasyfikacji
  report/ReportDocument.tsx   Szablon raportu PDF
public/fonts/           Fonty z polskimi znakami (TTF)
scripts/fetch-fonts.mjs Pobieranie fontów
```

## Jak działa klasyfikacja

Deterministyczne drzewo decyzyjne, zasada **„najwyższe ryzyko wygrywa"**:

1. dowolne „tak" w **Art. 5** → **Zakazane**
2. inaczej dowolne „tak" w **Załączniku III/I** → **Wysokie ryzyko**
3. inaczej dowolne „tak" w **Art. 50** → **Ograniczone** (przejrzystość)
4. inaczej → **Minimalne**
5. niezależnie: **Art. 4** (kompetencje) dla każdego dostawcy / podmiotu stosującego
6. jeśli dostawca **GPAI** → doklejane obowiązki modeli ogólnego przeznaczenia (+ ryzyko systemowe)

Rola (dostawca / podmiot stosujący) filtruje listę obowiązków. Wybór „Nie wiem" pokazuje
pełny obraz (obowiązki dostawcy i podmiotu stosującego).

## Zastosowane zasady legal design

- język potoczny zamiast żargonu; przy trudnych pojęciach rozwijane „Co to znaczy?"
- każda kategoria ryzyka oznaczona **ikoną + etykietą + kolorem** (nigdy samym kolorem)
- transparentność decyzji — sekcja „Dlaczego ten wynik?" pokazuje, co ją wywołało
- pasek gotowości jako interaktywna checklista obowiązków
- stałe, widoczne zastrzeżenie (to narzędzie edukacyjne, nie porada prawna)

---

## ✅ Co musi zweryfikować prawnik

To jest lista kontrolna do przeglądu prawnego. Pliki z treścią merytoryczną:
`lib/questions.ts`, `lib/obligations.ts`, `lib/classifier.ts`,
`lib/report/ReportDocument.tsx`, `components/ui/DisclaimerBar.tsx`.

1. **Brzmienie pytań** (`lib/questions.ts`) — czy pytania Bloku A (Art. 5), B (Załącznik III/I),
   GPAI, C (Art. 50) i D (Art. 4) poprawnie i kompletnie oddają przesłanki z rozporządzenia.
2. **Mapowanie obowiązków** (`lib/obligations.ts`) — czy listy obowiązków dla:
   dostawcy wysokiego ryzyka (Art. 9–17, 43, 47–49), podmiotu stosującego (Art. 26),
   GPAI (Art. 53), GPAI z ryzykiem systemowym (Art. 55), przejrzystości (Art. 50)
   i kompetencji (Art. 4) są poprawne, kompletne i aktualne.
3. **Odwołania do artykułów** — każdy `legalRef` w pytaniach i obowiązkach.
4. **Logika nadrzędności i wyłączenia** (`lib/classifier.ts`):
   - czy zasada „najwyższe ryzyko wygrywa" jest prawidłowa,
   - **wyłączenie z Art. 6 ust. 3** — w MVP pytanie pomocnicze NIE obniża automatycznie
     klasyfikacji (tylko sygnalizuje). Do decyzji, czy i jak ma działać.
   - czy „Nie wiem" powinno pokazywać pełny obraz dostawcy + podmiotu stosującego.
5. **Progi GPAI / ryzyka systemowego** (Art. 51/55) — czy pytania wystarczają do oceny.
6. **Kalendarz AI Act** (`ResultScreen.tsx` i `ReportDocument.tsx`) — daty 2.02.2025,
   2.08.2025, 2.08.2026, 2.08.2027 i przypisane do nich obowiązki.
7. **Zastrzeżenie i zgody** (`DisclaimerBar.tsx`, `ResultScreen.tsx`) — treść disclaimera
   oraz zgody marketingowej/RODO przy pobieraniu raportu.
8. **Treść raportu PDF** — sekcja „Rekomendowane kroki" i sformułowania wyników.

Sugestia: oznaczone do weryfikacji fragmenty mają w kodzie komentarz `DRAFT` /
„wymaga weryfikacji prawnej".

---

## TODO przed produkcją (techniczne)

- [ ] Podłączyć **Supabase** (region Frankfurt) w `app/api/lead/route.ts` — tabela `leads`.
- [ ] Podłączyć **Resend** — wysyłka raportu PDF na e-mail po wypełnieniu audytu.
- [ ] Dodać analitykę **Plausible** (bez ciasteczek, bez banera).
- [ ] Strona `/generator` (Produkt B) — obecnie link w upsellu prowadzi do nieistniejącej trasy.
- [ ] Uzupełnić politykę prywatności i regulamin.
- [ ] Konfiguracja deploymentu na Vercel (region `fra1`).

Zmienne środowiskowe (przyszłe) — patrz `.env.example`.

## Licencje fontów

Lato, Spectral, IBM Plex Mono — licencja SIL Open Font License (OFL), do użytku komercyjnego.
