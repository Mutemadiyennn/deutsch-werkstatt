import { describe, it, expect } from "vitest";
import { loadContent, checkRules } from "./load.ts";
import { importV1, sameSense } from "./import-v1.ts";

describe("içerik v2", () => {
  const c = checkRules(loadContent());
  it("bütün dosyalar şemaya uyuyor ve kurallar 0 hata veriyor", () => {
    expect(c.errors).toEqual([]);
  });
  it("13 alan var ve her biri v1 ünitelerine bağlı", () => {
    expect(c.domains).toHaveLength(13);
    expect(c.domains.every((d) => d.legacyUnits.length > 0)).toBe(true);
  });
  it("v1'in 715 kelime kaydının hepsi aktarılmış (aynı anlamdakiler birleşmiş)", () => {
    const keys = c.lexemes.flatMap((l) => l.legacy.map((x) => x.key));
    expect(keys).toHaveLength(715);
    expect(new Set(keys).size).toBe(715);
    expect(c.lexemes.reduce((a, l) => a + l.examples.length, 0)).toBeGreaterThanOrEqual(2860);
  });
  it("seviye tespiti havuzunda her beceri ve her seviyeden madde var", () => {
    for (const skill of ["vocab_passive", "vocab_active", "listening", "building", "speaking"]) {
      for (const level of ["A1", "A2", "B1"]) {
        expect(c.assess.filter((a) => a.skill === skill && a.level === level).length, `${skill}/${level}`).toBeGreaterThan(5);
      }
    }
  });
  it("pasif kelime maddelerinde doğru şık tek ve çeldiriciler farklı", () => {
    for (const a of c.assess) if (a.skill === "vocab_passive") expect(new Set(a.opts_tr).size).toBe(4);
  });
});

describe("v1 aktarımı", () => {
  it("anlam eşleştirme parantez içini yok sayar", () => {
    expect(sameSense("telefonla aramak", "telefonla aramak (ruft … an)")).toBe(true);
    expect(sameSense("… olarak (meslek)", "…dığında, …ken (geçmişte bir kez)")).toBe(false);
  });
  it("deterministik: iki çalıştırma aynı sonucu verir", () => {
    const u = [{ id: "a1-01", lvl: "A1.1", teach: [], drills: [], test: [], words: ["Haus:ev", "Baum:ağaç", "Auto:araba", "Tür:kapı", "Tisch:masa"].map((x) => ({ de: x.split(":")[0]!, tr: x.split(":")[1]!, art: "das", pl: "", t: "n" as const })) }];
    expect(JSON.stringify(importV1(u))).toBe(JSON.stringify(importV1(u)));
  });
});
