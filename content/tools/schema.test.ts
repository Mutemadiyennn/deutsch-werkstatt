import { describe, it, expect } from "vitest";
import { unknownKeys, checkRules, loadContent } from "./load.ts";
import { Lexeme, Scenario } from "../../packages/shared/src/content.ts";

// PM-042 A.3, PM-040.3, PM-042 B.9
describe("şema sözleşmesi", () => {
  it("şemada olmayan alan yakalanır (sessizce atılmaz)", () => {
    const raw = { id: "lx:Termin", de: "Termin", tr: "randevu", pos: "noun", art: "der", yeniAlan: 1, examples: [{ id: "e1", de: "Ich habe einen Termin.", tr: "Randevum var.", gizli: true }] };
    const parsed = Lexeme.parse(raw);
    expect(unknownKeys(raw, parsed)).toEqual(["yeniAlan", "examples[0].gizli"]);
  });
  it("içerik evreni alanları (place, unit, characters, can_do, arm, requires) ve ses, sued şemada", () => {
    const l = Lexeme.parse({ id: "lx:Semmel", de: "Semmel", tr: "küçük ekmek", pos: "noun", art: "die", sued: true, place: "place:baeckerei", unit: "u:a1-02", can_do: ["cd:a1:baeckerei"], arm: "arm:alisveris", requires: ["r0:sayilar"], audio: { src: "audio/lx/semmel.mp3", license: "CC BY 4.0" } });
    expect(l.sued).toBe(true); expect(l.characters).toEqual([]); expect(l.requires).toEqual(["r0:sayilar"]);
    expect(Scenario.shape.can_do).toBeTruthy(); expect(Scenario.shape.requires).toBeTruthy();
  });
  it("artikel tek kaynak: isim art'sız ya da de artikelli olamaz", () => {
    const c = loadContent();
    c.lexemes.push(Lexeme.parse({ id: "lx:testA", de: "der Test", tr: "deneme", pos: "noun", art: "der", pl: "Tests" }));
    c.lexemes.push(Lexeme.parse({ id: "lx:testB", de: "Probe", tr: "prova", pos: "noun", pl: "Proben" }));
    const n = (errs: string[]) => Number(/artikelle başlayan (\d+)/.exec(errs.find((e) => e.includes("artikelle başlayan")) || "")?.[1] || 0);
    const before = n(checkRules(loadContent()).errors);
    const r = checkRules(c);
    expect(n(r.errors)).toBe(before + 1);
    expect(r.errors.some((e) => e.includes("lx:testB") && e.includes("art zorunlu"))).toBe(true);
  });
  it("incelenmiş sözlük partisinde okur zorunlu", () => {
    const c = loadContent();
    c.lexiconBatches.push({ file: "test.json", batch: "999", status: "reviewed", count: 0, ids: [] });
    expect(checkRules(c).errors).toContain('test.json: "reviewed" ama okur kontrolü geçmemiş (OD-9.4)');
  });
});

// İnceleme #55 P0-1: R0 kimlik biçimi gerçek dosyayla (İçerik Motoru biçimi, r0:NN-slug)
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TemelDers } from "../../packages/shared/src/content.ts";
describe("TemelDers (R0)", () => {
  const raw = JSON.parse(readFileSync(join(__dirname, "fixtures/r0-01-tage.json"), "utf8"));
  it("gerçek R0 dosyası şemadan ve bilinmeyen alan denetiminden geçer", () => {
    const r = TemelDers.safeParse(raw);
    expect(r.success).toBe(true);
    if (r.success) expect(unknownKeys(raw, r.data)).toEqual([]);
  });
  it("kimlik dosya adıyla uyuşmazsa hata", () => {
    const c = loadContent();
    c.temel.push({ file: "temel/r0-01-tage.json", data: TemelDers.parse({ ...raw, id: "r0:01-gunler" }) });
    expect(checkRules(c).errors.some((e) => e.includes("dosya adıyla uyuşmuyor"))).toBe(true);
  });
  it("kimlik r0:NN biçimi reddedilir", () => {
    expect(TemelDers.safeParse({ ...raw, id: "r0:01" }).success).toBe(false);
  });
});

describe("pasif kart", () => {
  it("senaryonun temel öğesi olamaz", () => {
    const c = loadContent();
    const sc = c.scenarios[0]!; const id = sc.data.essentials.lexemes[0];
    expect(id).toBeDefined();
    if (!id) return;
    const l = c.lexemes.find((x) => x.id === id)!; l.tier = "passive";
    expect(checkRules(c).errors.some((e) => e.includes("pasif kart") && e.includes(id))).toBe(true);
  });
});
