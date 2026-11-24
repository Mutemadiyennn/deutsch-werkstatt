import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { AssessAnswer, AssessItem } from "@dw/shared";
import { defaultProfile } from "@dw/shared";
import { selectItems, nextItem, score, progress, PLAN } from "./assess.ts";
import { applyAssessment, itemIdFromAssess } from "./learner.ts";
import { recommend } from "./planner.ts";

const bank: AssessItem[] = JSON.parse(readFileSync(new URL("../../../content/v2/assess/bank.json", import.meta.url), "utf8"));
const answer = (it: AssessItem, correct: boolean): AssessAnswer => ({ itemId: it.id, skill: it.skill, level: it.level, correct, ms: 1000 });

/** Belirli bir "gerçek seviyedeki" öğrenciyi taklit eder */
function runAs(levelOk: (it: AssessItem) => boolean, seed = "t1") {
  const items = selectItems(bank, seed);
  const ans: AssessAnswer[] = [];
  for (let it = nextItem(items, ans); it; it = nextItem(items, ans)) ans.push(answer(it, levelOk(it)));
  return { items, ans, s: score(items, ans) };
}

describe("seviye tespiti", () => {
  it("plan: 42 madde, her beceri ve seviyeden, aynı tohumla aynı sorular", () => {
    const a = selectItems(bank, "x");
    const total = Object.values(PLAN).reduce((s, l) => s + l.A1 + l.A2 + l.B1, 0);
    expect(a).toHaveLength(total);
    expect(selectItems(bank, "x").map((i) => i.id)).toEqual(a.map((i) => i.id));
    expect(selectItems(bank, "y").map((i) => i.id)).not.toEqual(a.map((i) => i.id));
  });
  it("A1 öğrencisi: üst seviyeler sorulmaz, sonuç A1, test kısalır", () => {
    const { ans, s, items } = runAs((it) => it.level === "A1");
    expect(ans.length).toBeLessThan(items.length);
    expect(ans.some((a) => a.level === "B1")).toBe(false);
    expect(s.overall).toBe("A1");
  });
  it("B1 öğrencisi: bütün maddeler sorulur, sonuç B1", () => {
    const { ans, items, s } = runAs(() => true);
    expect(ans).toHaveLength(items.length);
    expect(s.overall).toBe("B1");
    expect(s.results.every((r) => r.estimate === "B1")).toBe(true);
  });
  it("hiç bilmeyen: A1 öncesi; özet Türkçe ve 'sınav sonucu değil' uyarısı içerir", () => {
    const { s } = runAs(() => false);
    expect(s.overall).toBe("below-A1");
    expect(s.summaryTr).toContain("sınav sonucu değil");
  });
  it("tanıyıp üretemeyen öğrenci için pasif-aktif farkı özetlenir", () => {
    const { s } = runAs((it) => it.skill === "vocab_passive" || (it.level === "A1" && it.skill !== "vocab_active"));
    expect(s.summaryTr).toContain("tanıyorsun ama kendin üretmekte zorlanıyorsun");
  });
  it("dinleme sonuçları hıza göre ayrılır", () => {
    const { s } = runAs((it) => it.level !== "B1");
    expect(s.bySpeed.slow?.correct).toBe(3);
    expect(s.bySpeed.normal?.correct).toBe(3);
    expect(s.bySpeed.fast?.correct).toBe(0);
  });
  it("ilerleme göstergesi uyarlamayı hesaba katar", () => {
    const items = selectItems(bank, "p");
    const ans: AssessAnswer[] = [];
    for (let it = nextItem(items, ans); it && it.skill === "vocab_passive" && it.level === "A1"; it = nextItem(items, ans)) ans.push(answer(it, false));
    expect(progress(items, ans).total).toBe(items.length - 8); // A2 + B1 pasif kelime maddeleri düştü
  });
});

describe("öğrenci modeli ve planlayıcı", () => {
  it("yanlış/bilinmeyen kelime zayıflık bankasına girer; pasif ve aktif ayrı", () => {
    const now = new Date("2026-11-17T10:00:00Z");
    const ch = applyAssessment(new Map(), [
      { itemId: "as:vp:lx:Termin", skill: "vocab_passive", level: "A1", correct: true, ms: 1 },
      { itemId: "as:va:lx:Termin", skill: "vocab_active", level: "A1", correct: false, ms: 1, skipped: true },
      { itemId: "as:li:a1-01:drills:0", skill: "listening", level: "A1", correct: false, ms: 1 }
    ], now);
    expect(ch).toHaveLength(1);
    expect(ch[0]!.passive.ok).toBe(1);
    expect(ch[0]!.active.ok).toBe(0);
    expect(ch[0]!.inBank).toBe(true);
    expect(ch[0]!.gaps[0]).toMatchObject({ type: "active", source: "assess" });
    expect(itemIdFromAssess("as:li:x")).toBeNull();
  });
  it("planlayıcı: önce tespit; sonra seans 1 → öncelikli alandaki senaryo; seans 3 → eski uygulamaya gönderilmez (PM-116)", () => {
    const p = defaultProfile();
    const index: any = { scenarios: [{ id: "sc:telefon:01-arzttermin", domain: "telefon", order: 1, level: "A1", title_tr: "Doktordan telefonla randevu almak", title_de: "", review: "draft" }] };
    expect(recommend({ profile: p, index, hasPlacement: false, sessionN: 1 }).kind).toBe("assess");
    const r1 = recommend({ profile: p, index, hasPlacement: true, sessionN: 1 });
    expect(r1).toMatchObject({ kind: "scenario", scenarioId: "sc:telefon:01-arzttermin", draft: true });
    const r3 = recommend({ profile: p, index, hasPlacement: true, sessionN: 3 });
    expect(r3.kind).toBe("none");
    expect(JSON.stringify(r3)).not.toMatch(/eski uygulama|\?v1/i);
  });
});
