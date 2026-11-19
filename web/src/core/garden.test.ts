import { describe, it, expect } from "vitest";
import { Lexeme } from "@dw/shared";
import type { LearnerItem } from "@dw/shared";
import { personalFirst, availableTypes, pickType, buildRound, requeue, meaningOptions, accepted, ownSentenceCheck, introduced } from "./garden.ts";
import { review, sessionKey } from "./srs.ts";

const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
const termin = L({ id: "lx:Termin", de: "Termin", tr: "randevu", pos: "noun", art: "der", pl: "Termine", img: "calendar appointment", freqRank: 900,
  collocations: [{ de: "einen Termin machen", tr: "randevu almak" }], forms: [{ de: "Ich habe ___ Termin.", answer: "einen" }],
  examples: [{ id: "e1", de: "Ich habe einen Termin.", tr: "Randevum var." }, { id: "e2", de: "Der Termin ist morgen.", tr: "Randevu yarın." }] });
const absagen = L({ id: "lx:absagen", de: "absagen", tr: "iptal etmek", pos: "verb", forms: [{ de: "Ich ___ den Termin ___.", answer: "sage … ab" }] });
const der = L({ id: "lx:der", de: "der, die, das", tr: "belirli tanımlık", pos: "det", card: false });
const toeten = L({ id: "lx:töten", de: "töten", tr: "öldürmek", pos: "verb", tier: "passive" });
const lex = new Map([termin, absagen, der, toeten].map((l) => [l.id, l]));
const seq = (...v: number[]) => { let i = 0; return () => v[i++ % v.length]!; };

describe("Kelime Bahçesi (PM-049)", () => {
  it("türler içeriğe göre: isimde artikel ve fotoğraf, fiilde ayrılabilir biçim", () => {
    expect(availableTypes(termin, "passive")).toEqual(["listen_meaning", "article", "colloc"]);
    expect(availableTypes(termin, "active")).toEqual(["tr_de", "photo_say", "gap", "own_sentence"]);
    expect(availableTypes(absagen, "active")).toContain("sep_perfekt");
  });
  it("işlev kelimesi (tanımlık, zamir…) card:false olmasa da ayrı kart olmaz (PM-047 §2)", () => {
    const kein = L({ id: "lx:kein", de: "kein", tr: "hiç", pos: "det" });
    expect(availableTypes(kein, "active")).toEqual([]);
    expect(buildRound(new Map([[kein.id, kein]]), new Map(), [kein.id])).toEqual([]);
  });
  it("card:false ve passive kartlar aktif soruya girmez", () => {
    expect(availableTypes(der, "active")).toEqual([]);
    expect(availableTypes(toeten, "active")).toEqual([]);
    // pasif kart yalnızca (a) dinle → anlamını seç; isim olsa da artikel/eşdizim sorulmaz (inceleme #55)
    const pasifIsim = L({ id: "lx:Behörde", de: "Behörde", tr: "resmî daire", pos: "noun", art: "die", tier: "passive", collocations: [{ de: "bei der Behörde anrufen", tr: "resmî daireyi aramak" }] });
    expect(availableTypes(pasifIsim, "passive")).toEqual(["listen_meaning"]);
  });
  it("aynı tür art arda gelmez", () => {
    for (let i = 0; i < 20; i++) expect(pickType(termin, "active", "tr_de", () => i / 20)).not.toBe("tr_de");
  });
  it("yeni kart tanıtım + pasif soru; card:false yeni kart olarak gelmez; tanıtılmamış karta aktif soru yok", () => {
    const r = buildRound(lex, new Map(), ["lx:der", "lx:Termin", "lx:absagen"]);
    expect(r.map((q) => q.lexId)).toEqual(["lx:Termin", "lx:absagen"]);
    expect(r.every((q) => q.intro && q.type === "listen_meaning")).toBe(true);
  });
  it("vadesi gelen tanıtılmış kart aktif soruyla gelir; tur en çok 12", () => {
    const t0 = new Date("2026-11-01T10:00:00Z");
    let it: LearnerItem = review(undefined, { itemId: "lx:Termin", kind: "lexeme", path: "passive", outcome: "correct", session: sessionKey("g", t0.getTime()) }, t0);
    it = review(it, { itemId: "lx:Termin", kind: "lexeme", path: "active", outcome: "correct", session: sessionKey("g", t0.getTime()) }, t0);
    expect(introduced(it)).toBe(true);
    const r = buildRound(lex, new Map([["lx:Termin", it]]), [], { now: new Date("2026-12-01T10:00:00Z") });
    expect(r[0]).toMatchObject({ lexId: "lx:Termin" });
    expect(["tr_de", "photo_say", "gap", "own_sentence"]).toContain(r[0]!.type);
    const many = new Map<string, LearnerItem>();
    for (let i = 0; i < 30; i++) { const l = L({ id: `lx:w${i}`, de: `w${i}`, tr: `t${i}`, pos: "adj" }); lex.set(l.id, l); many.set(l.id, review(undefined, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "wrong", session: "s@1" }, t0)); }
    expect(buildRound(lex, many, [], { now: new Date("2026-12-01T10:00:00Z") }).length).toBe(12);
  });
  it("yanlışta kart turun sonunda başka örnek ve başka türle bir kez geri gelir", () => {
    const q = { lexId: "lx:Termin", type: "tr_de" as const, ex: 0 };
    const r = requeue([q], q, termin, seq(0));
    expect(r).toHaveLength(2);
    expect(r[1]).toMatchObject({ lexId: "lx:Termin", ex: 1, retry: 1 });
    expect(r[1]!.type).not.toBe("tr_de");
    expect(requeue(r, r[1]!, termin)).toHaveLength(2);
  });
  it("anlam seçenekleri doğruyu bir kez içerir; kabul cevapları artikelli", () => {
    const m = meaningOptions(termin, [...lex.values()], seq(0.3, 0.6, 0.1));
    expect(m.opts[m.ans]).toBe("randevu");
    expect(m.opts.filter((x) => x === "randevu")).toHaveLength(1);
    expect(accepted(termin, "photo_say")).toEqual(["der Termin"]);
    expect(accepted(absagen, "sep_perfekt")).toContain("sage ab");
  });
  it("kendi cümlesi: kelime yoksa ya da çok kısaysa geçmez", () => {
    expect(ownSentenceCheck(termin, "Ich habe morgen einen Termin.")).toBe("ok");
    expect(ownSentenceCheck(termin, "Termin.")).toBe("short");
    expect(ownSentenceCheck(termin, "Ich gehe heute nach Hause.")).toBe("missing");
  });
  it("duyduğun / 'nasıl derim' kelimesi sözlükte varsa yeni kart sırasının başına girer (#58 A3)", () => {
    const at = "2026-11-19T00:00:00Z";
    const all = [termin, absagen, der, toeten];
    const pool = personalFirst([{ id: "k3:der Termin", de: "der Termin", at, source: "heard" }, { id: "sayit:absagen", de: "absagen", at, source: "sayit" },
      { id: "k3:töten", de: "töten", at, source: "heard" }, { id: "k3:Quatsch", de: "Quatsch", at, source: "heard" }], all, ["lx:absagen", "lx:x"]);
    expect(pool).toEqual(["lx:Termin", "lx:absagen", "lx:x"]);
  });
});
