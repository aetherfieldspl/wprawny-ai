// lib/classifier.test.ts
// Testy klasyfikatora — uruchom: npm test
import { describe, it, expect } from "vitest";
import { classify, emptyAnswers } from "./classifier";

describe("classify — kwalifikacja wstępna", () => {
  it("nie używa AI w UE → not_applicable", () => {
    const a = emptyAnswers();
    a.usesAiInEu = false;
    const r = classify(a);
    expect(r.level).toBe("not_applicable");
    expect(r.obligations).toHaveLength(0);
  });
});

describe("classify — zasada najwyższego ryzyka", () => {
  it("dowolne tak w Art. 5 → prohibited (bije wszystko)", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["provider"];
    a.art5 = { a3: true };
    a.annexIII = { b5: true }; // też wysokie, ale Art.5 wygrywa
    a.art50 = { c1: true };
    const r = classify(a);
    expect(r.level).toBe("prohibited");
    expect(r.triggers.some((t) => t.questionId === "a3")).toBe(true);
    // w zakazie nie doklejamy Art. 4 (priorytet = wstrzymanie)
    expect(r.art4Attached).toBe(false);
  });

  it("brak Art. 5, jest Załącznik III → high", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["deployer"];
    a.annexIII = { b5: true };
    a.art50 = { c1: true };
    const r = classify(a);
    expect(r.level).toBe("high");
    // deployer dostaje obowiązki podmiotu stosującego, nie dostawcy
    expect(r.obligations.some((o) => o.id === "hr-d-instr")).toBe(true);
    expect(r.obligations.some((o) => o.id === "hr-rms")).toBe(false);
  });

  it("tylko Art. 50 → limited z obowiązkami zależnymi od pytania", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["provider"];
    a.art50 = { c1: true, c2: true };
    const r = classify(a);
    expect(r.level).toBe("limited");
    expect(r.obligations.some((o) => o.id === "tr-chatbot")).toBe(true);
    expect(r.obligations.some((o) => o.id === "tr-synthetic")).toBe(true);
    expect(r.obligations.some((o) => o.id === "tr-deepfake")).toBe(false);
  });

  it("brak trafień → minimal z dobrymi praktykami", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["deployer"];
    const r = classify(a);
    expect(r.level).toBe("minimal");
    expect(r.obligations.some((o) => o.id === "min-policy")).toBe(true);
  });
});

describe("classify — GPAI doklejane do dostawcy", () => {
  it("dostawca GPAI bez ryzyka systemowego → obowiązki bazowe GPAI", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["provider"];
    a.gpaiIsGpai = true;
    a.gpaiSystemicRisk = false;
    const r = classify(a);
    expect(r.gpaiAttached).toBe(true);
    expect(r.obligations.some((o) => o.id === "gp-doc")).toBe(true);
    expect(r.obligations.some((o) => o.id === "gps-eval")).toBe(false);
  });

  it("GPAI z ryzykiem systemowym → dodatkowe obowiązki", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["provider"];
    a.gpaiIsGpai = true;
    a.gpaiSystemicRisk = true;
    const r = classify(a);
    expect(r.obligations.some((o) => o.id === "gps-eval")).toBe(true);
  });

  it("deployer NIE dostaje obowiązków GPAI nawet przy gpaiIsGpai=true", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["deployer"];
    a.gpaiIsGpai = true;
    const r = classify(a);
    expect(r.gpaiAttached).toBe(false);
  });
});

describe("classify — Art. 4 kompetencje", () => {
  it("brak programu kompetencji → doklejony obowiązek Art. 4", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["deployer"];
    a.art4HasProgram = false;
    const r = classify(a);
    expect(r.art4Attached).toBe(true);
    expect(r.obligations.some((o) => o.id === "art4")).toBe(true);
  });

  it("ma program kompetencji → Art. 4 policzony, ale obowiązek nie dubluje listy", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["deployer"];
    a.art4HasProgram = true;
    const r = classify(a);
    expect(r.art4Attached).toBe(true);
    expect(r.obligations.some((o) => o.id === "art4")).toBe(false);
  });
});

describe("classify — rola 'nie wiem'", () => {
  it("unsure pokazuje obraz dostawcy i podmiotu stosującego", () => {
    const a = emptyAnswers();
    a.usesAiInEu = true;
    a.roles = ["unsure"];
    a.annexIII = { b5: true };
    const r = classify(a);
    expect(r.obligations.some((o) => o.id === "hr-rms")).toBe(true); // provider
    expect(r.obligations.some((o) => o.id === "hr-d-instr")).toBe(true); // deployer
  });
});
