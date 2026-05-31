// lib/report/ReportDocument.tsx
// Raport PDF generowany po stronie serwera (@react-pdf/renderer).
// Fonty rejestrowane jednorazowo w "@/lib/report/fonts".

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import "@/lib/report/fonts";
import type { AuditAnswers, ClassificationResult, RiskLevel } from "@/lib/types";


// react-pdf nie czyta zmiennych CSS — paleta zapisana wprost.
const COLOR = {
  ink: "#1c2826",
  inkSoft: "#5a6664",
  brand: "#134e4a",
  line: "#e6e0d2",
  paper: "#f6f3ec",
};

const RISK: Record<RiskLevel, { label: string; color: string }> = {
  prohibited: { label: "Praktyka zakazana", color: "#b3261e" },
  high: { label: "Wysokie ryzyko", color: "#c2410c" },
  limited: { label: "Ograniczone — obowiązki przejrzystości", color: "#b7791f" },
  minimal: { label: "Minimalne ryzyko", color: "#15803d" },
  not_applicable: { label: "Prawdopodobnie poza zakresem AI Act", color: "#5a6664" },
};

const ROLE_LABEL: Record<string, string> = {
  provider: "Dostawca",
  deployer: "Podmiot stosujący",
  importer_distributor: "Importer / Dystrybutor",
  unsure: "Nieokreślona (pełny obraz)",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Lato",
    fontSize: 10,
    color: COLOR.ink,
    paddingTop: 48,
    paddingBottom: 64,
    paddingHorizontal: 48,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: COLOR.line,
    paddingBottom: 10,
    marginBottom: 24,
  },
  brand: { fontSize: 14, fontWeight: 700, color: COLOR.brand },
  meta: { fontSize: 8, color: COLOR.inkSoft, textAlign: "right" },
  h1: { fontSize: 20, fontWeight: 700, marginBottom: 4 },
  lead: { fontSize: 10, color: COLOR.inkSoft, marginBottom: 20 },
  riskBox: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  riskLabel: { fontSize: 13, fontWeight: 700 },
  riskHeadline: { fontSize: 11, marginTop: 6, color: COLOR.ink },
  section: { marginBottom: 18 },
  h2: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8,
    color: COLOR.brand,
  },
  row: { flexDirection: "row", marginBottom: 6 },
  bullet: { width: 12, color: COLOR.brand, fontWeight: 700 },
  obTitle: { fontSize: 10, fontWeight: 700 },
  obRef: { fontSize: 8, color: COLOR.brand, marginTop: 1 },
  obDetail: { fontSize: 9, color: COLOR.inkSoft, marginTop: 1 },
  obItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.line,
    paddingVertical: 6,
  },
  tl: { flexDirection: "row", marginBottom: 5 },
  tlDate: { width: 90, fontWeight: 700, fontSize: 9 },
  tlText: { flex: 1, fontSize: 9, color: COLOR.inkSoft },
  disclaimer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLOR.paper,
    borderRadius: 6,
    fontSize: 8,
    color: COLOR.inkSoft,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: COLOR.line,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: COLOR.inkSoft,
  },
});

const TIMELINE = [
  { date: "2.02.2025", text: "Zakazy praktyk (Art. 5) i obowiązek kompetencji AI (Art. 4)." },
  { date: "2.08.2025", text: "Obowiązki dla modeli ogólnego przeznaczenia (GPAI)." },
  { date: "2.08.2026", text: "Główny pakiet dla systemów wysokiego ryzyka (Załącznik III)." },
  { date: "2.08.2027", text: "Wysokie ryzyko powiązane z produktami (Załącznik I)." },
];

export function ReportDocument({
  answers,
  result,
}: {
  answers: AuditAnswers;
  result: ClassificationResult;
}) {
  const risk = RISK[result.level];
  const today = new Date().toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const roles = answers.roles.map((r) => ROLE_LABEL[r]).join(", ") || "—";

  return (
    <Document title="Audyt gotowości na AI Act — wprawny.ai">
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.brand}>wprawny.ai</Text>
          <Text style={styles.meta}>
            Audyt gotowości na AI Act{"\n"}
            {today}
          </Text>
        </View>

        <Text style={styles.h1}>Raport: gotowość na AI Act</Text>
        <Text style={styles.lead}>
          Ocena wstępna przygotowana na podstawie Twoich odpowiedzi. Dokument roboczy
          do weryfikacji prawnej — nie stanowi porady prawnej.
        </Text>

        {/* WYNIK */}
        <View style={[styles.riskBox, { borderColor: risk.color }]}>
          <Text style={[styles.riskLabel, { color: risk.color }]}>{risk.label}</Text>
          <Text style={styles.riskHeadline}>{result.headline}</Text>
        </View>

        {/* PROFIL */}
        <View style={styles.section}>
          <Text style={styles.h2}>Profil oceny</Text>
          <Text>Rola: {roles}</Text>
          {answers.sector && <Text>Branża: {answers.sector}</Text>}
          {result.gpaiAttached && <Text>Uwzględniono obowiązki modeli GPAI.</Text>}
          {answers.useDescription ? (
            <Text style={{ color: COLOR.inkSoft, marginTop: 4 }}>
              Opis zastosowania: {answers.useDescription}
            </Text>
          ) : null}
        </View>

        {/* DLACZEGO */}
        {result.triggers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Dlaczego ten wynik?</Text>
            {result.triggers.map((t) => (
              <View style={styles.row} key={t.questionId}>
                <Text style={styles.bullet}>•</Text>
                <Text style={{ flex: 1 }}>{t.label}</Text>
              </View>
            ))}
          </View>
        )}

        {/* OBOWIĄZKI */}
        {result.obligations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>
              Twoje obowiązki — checklista ({result.obligations.length})
            </Text>
            {result.obligations.map((o) => (
              <View style={styles.obItem} key={o.id} wrap={false}>
                <Text style={styles.obTitle}>{o.title}</Text>
                <Text style={styles.obRef}>{o.legalRef}</Text>
                <Text style={styles.obDetail}>{o.detail}</Text>
              </View>
            ))}
          </View>
        )}

        {/* OŚ CZASU */}
        <View style={styles.section}>
          <Text style={styles.h2}>Kalendarz AI Act</Text>
          {TIMELINE.map((it) => (
            <View style={styles.tl} key={it.date}>
              <Text style={styles.tlDate}>{it.date}</Text>
              <Text style={styles.tlText}>{it.text}</Text>
            </View>
          ))}
        </View>

        {/* KROKI */}
        <View style={styles.section}>
          <Text style={styles.h2}>Rekomendowane kroki</Text>
          <Text>1. Zweryfikuj tę ocenę z ekspertem — potwierdź klasyfikację i listę obowiązków.</Text>
          <Text>2. Spisz wewnętrzną politykę korzystania z AI i zaplanuj szkolenia (Art. 4).</Text>
          <Text>3. Przypisz obowiązki właścicielom i ustal terminy zgodnie z kalendarzem AI Act.</Text>
          <Text style={{ marginTop: 6, color: COLOR.brand, fontWeight: 700 }}>
            Konsultacja ekspercka: wprawny.pl
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text>
            Zastrzeżenie: wprawny.ai to narzędzie edukacyjne. Raport daje ocenę wstępną
            opartą na podanych informacjach i nie stanowi porady prawnej. Lista obowiązków
            jest draftem opartym na strukturze AI Act i wymaga weryfikacji prawnej.
            W razie wątpliwości skontaktuj się z ekspertem (wprawny.pl).
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>wprawny.ai · Dane przetwarzane w UE</Text>
          <Text
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
