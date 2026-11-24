import { describe, expect, it } from "vitest";
import { mkdtempSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { haftaTestleri } from "./haftaTesti.ts";

const madde = (id: string) => ({ id, k: "tr_de", tr: "Merhaba.", accepted: ["Hallo.", "Guten Tag.", "Hallo!"] });
const kok = (dosyalar: Record<string, unknown>) => { const d = mkdtempSync(join(tmpdir(), "ht-")); for (const [f, v] of Object.entries(dosyalar)) writeFileSync(join(d, f), typeof v === "string" ? v : JSON.stringify(v)); return d; };

describe("hafta sonu testleri (PR B-3)", () => {
  it("eski ad 1. hafta, HH adı o hafta; inceleme alanı pakete girmez", () => {
    const p = haftaTestleri(kok({ "hafta-sonu-testi.json": { id: "m1:hafta-sonu-testi", day: 7, maddeler: [madde("a")] }, "hafta-sonu-testi-05.json": { id: "m1:hafta-sonu-testi:05", day: 35, review: { status: "draft" }, maddeler: [madde("b")] }, "gun-01.json": {} }));
    expect(Object.keys(p).sort()).toEqual(["1", "5"]);
    expect(p["5"]).toEqual({ id: "m1:hafta-sonu-testi:05", maddeler: [madde("b")] });
  });
  it("HH adı eski adı geçersiz kılar", () => {
    const p = haftaTestleri(kok({ "hafta-sonu-testi.json": { id: "eski", maddeler: [madde("a")] }, "hafta-sonu-testi-01.json": { id: "yeni", maddeler: [madde("b")] } }));
    expect(p["1"]!.id).toBe("yeni");
  });
  it("bozuk biçim hata (sessizce düşmez)", () => {
    expect(() => haftaTestleri(kok({ "hafta-sonu-testi-02.json": { id: "x", maddeler: [{ id: "a", k: "yok" }] } }))).toThrow(/biçimi bozuk/);
    expect(() => haftaTestleri(kok({ "hafta-sonu-testi-02.json": "{" }))).toThrow();
  });
  it("klasör yoksa boş", () => { expect(haftaTestleri("/yok/boyle/bir/yer")).toEqual({}); });
});
