// lib/policy/PolicyDocument.tsx
// PDF polityki korzystania z AI (Produkt B).
// Fonty rejestrowane jednorazowo w "@/lib/report/fonts".

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import "@/lib/report/fonts";
import type { PolicyConfig } from "./types";
import { buildPolicy } from "./template";

const COLOR = {
  ink: "#1c2826",
  inkSoft: "#5a6664",
  brand: "#134e4a",
  line: "#e6e0d2",
  paper: "#f6f3ec",
  watermark: "#c8c0ad",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Lato",
    fontSize: 10,
    lineHeight: 1.45,
    color: COLOR.ink,
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 52,
  },
  header: {
    position: "absolute",
    top: 24,
    left: 52,
    right: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    color: COLOR.inkSoft,
    fontSize: 9,
  },
  brand: { fontSize: 13, fontWeight: 700, color: COLOR.brand },
  meta: { textAlign: "right" },
  title: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  subtitle: { color: COLOR.inkSoft, marginBottom: 18, fontSize: 11 },
  metaBox: {
    backgroundColor: COLOR.paper,
    borderLeft: `2pt solid ${COLOR.brand}`,
    padding: 10,
    marginBottom: 18,
  },
  metaLine: { fontSize: 10, marginBottom: 2 },
  toc: { marginBottom: 18 },
  tocItem: { flexDirection: "row", marginBottom: 2, fontSize: 10 },
  tocNum: { width: 22, color: COLOR.inkSoft },
  tocText: { flex: 1 },
  section: { marginTop: 12, marginBottom: 10 },
  sectionHeading: {
    fontSize: 13,
    fontWeight: 700,
    color: COLOR.brand,
    marginBottom: 6,
  },
  intro: { marginBottom: 6, color: COLOR.inkSoft },
  row: { flexDirection: "row", marginBottom: 4 },
  rowNum: { width: 26, color: COLOR.brand, fontWeight: 700 },
  rowText: { flex: 1 },
  signBlock: {
    marginTop: 32,
    paddingTop: 14,
    borderTop: `1pt solid ${COLOR.line}`,
  },
  signRow: { flexDirection: "row", marginTop: 30 },
  signCol: { flex: 1, marginRight: 12 },
  signLine: { borderBottom: `1pt solid ${COLOR.ink}`, height: 1, marginBottom: 4 },
  signLabel: { fontSize: 9, color: COLOR.inkSoft },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 52,
    right: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    color: COLOR.inkSoft,
    fontSize: 9,
  },
  disclaimer: {
    marginTop: 18,
    padding: 10,
    backgroundColor: COLOR.paper,
    color: COLOR.inkSoft,
    fontSize: 9,
    lineHeight: 1.4,
  },
  watermark: {
    position: "absolute",
    top: "45%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 70,
    fontWeight: 700,
    color: COLOR.watermark,
    opacity: 0.18,
    transform: "rotate(-25deg)",
  },
  watermarkLine: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 11,
    color: COLOR.watermark,
    opacity: 0.7,
    letterSpacing: 2,
  },
});

export function PolicyDocument({
  config,
  watermark = true,
}: {
  config: PolicyConfig;
  watermark?: boolean;
}) {
  const sections = buildPolicy(config);
  const orgName = config.org.name.trim() || "[Nazwa organizacji]";
  const today = new Date().toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document title={`Polityka korzystania z AI — ${orgName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.brand}>wprawny.ai</Text>
          <Text style={styles.meta}>
            Polityka korzystania z AI{"\n"}
            {today}
          </Text>
        </View>

        {watermark && (
          <View fixed>
            <Text style={styles.watermark}>PROJEKT</Text>
            <Text style={styles.watermarkLine}>
              wersja demonstracyjna · nie do dystrybucji
            </Text>
          </View>
        )}

        <Text style={styles.title}>Polityka korzystania z AI</Text>
        <Text style={styles.subtitle}>w organizacji {orgName}</Text>

        <View style={styles.metaBox}>
          <Text style={styles.metaLine}>
            <Text style={{ fontWeight: 700 }}>Organizacja: </Text>
            {orgName}
            {config.org.sector ? ` · ${config.org.sector}` : ""}
          </Text>
          <Text style={styles.metaLine}>
            <Text style={{ fontWeight: 700 }}>Data wydania: </Text>
            {today}
          </Text>
          {(config.org.responsiblePerson || config.org.responsibleRole) && (
            <Text style={styles.metaLine}>
              <Text style={{ fontWeight: 700 }}>Osoba odpowiedzialna: </Text>
              {[config.org.responsiblePerson, config.org.responsibleRole]
                .filter(Boolean)
                .join(", ")}
            </Text>
          )}
        </View>

        <View style={styles.toc}>
          <Text style={{ fontWeight: 700, marginBottom: 6 }}>Spis treści</Text>
          {sections.map((s) => (
            <View style={styles.tocItem} key={s.number}>
              <Text style={styles.tocNum}>{s.number}.</Text>
              <Text style={styles.tocText}>{s.title}</Text>
            </View>
          ))}
        </View>

        {sections.map((s) => (
          <View style={styles.section} key={s.number} wrap>
            <Text style={styles.sectionHeading}>
              §{s.number}. {s.title}
            </Text>
            {s.intro && <Text style={styles.intro}>{s.intro}</Text>}
            {s.points.map((p, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.rowNum}>
                  {s.number}.{i + 1}
                </Text>
                <Text style={styles.rowText}>{p}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.signBlock} wrap={false}>
          <Text style={{ fontWeight: 700, marginBottom: 4 }}>Zatwierdzenie polityki</Text>
          <Text style={{ color: COLOR.inkSoft }}>
            Polityka wchodzi w życie z dniem podpisania przez osobę upoważnioną do reprezentacji organizacji.
          </Text>
          <View style={styles.signRow}>
            <View style={styles.signCol}>
              <View style={styles.signLine} />
              <Text style={styles.signLabel}>Data i miejsce</Text>
            </View>
            <View style={styles.signCol}>
              <View style={styles.signLine} />
              <Text style={styles.signLabel}>Podpis osoby upoważnionej</Text>
            </View>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text>
            Dokument wygenerowany przez wprawny.ai jako szablon roboczy. Wymaga
            dostosowania do realiów Twojej organizacji i weryfikacji prawnej
            przed wdrożeniem. Nie stanowi porady prawnej. Konsultacja:
            wprawny.pl.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>wprawny.ai · {orgName}</Text>
          <Text
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
