import { describe, expect, it } from "vitest";
import { DERS_ID, DilNoktasi, GUN_ID, GUN_SON, Gun, gunDosyaNo, gunNo } from "./m1.ts";

/** Çok haftalı şema (PM-092 md. 3.1, PM 7088043877 md. 1): gün 1…364, kimlik m1:gun:NN, dersler r0:|gr:|dn: */
describe("çok haftalı gün şeması", () => {
  it("gün kimliği: 01…99 iki hane, 100…364 üç hane", () => {
    for (const ok of ["m1:gun:01", "m1:gun:07", "m1:gun:08", "m1:gun:56", "m1:gun:99", "m1:gun:100", "m1:gun:364"]) expect(GUN_ID.test(ok), ok).toBe(true);
    for (const no of ["m1:gun:00", "m1:gun:1", "m1:gun:8", "m1:gun:008", "m1:gun:099", "m1:gun:365", "m1:gun:399", "m1:gun:1000"]) expect(GUN_ID.test(no), no).toBe(false);
  });
  it("dosya adı ↔ gün numarası birebir", () => {
    expect(gunDosyaNo("content/v2/m1/gun-01.json")).toBe(1);
    expect(gunDosyaNo("gun-08.json")).toBe(8);
    expect(gunDosyaNo("x/gun-120.json")).toBe(120);
    expect(gunDosyaNo("x/gun-364.json")).toBe(GUN_SON);
    for (const no of ["gun-8.json", "gun-008.json", "gun-00.json", "gun-365.json", "gun-01-halkalar.json"]) expect(gunDosyaNo(no), no).toBeNull();
    for (const n of [1, 8, 56, 99, 100, 364]) expect(gunDosyaNo(`gun-${gunNo(n)}.json`)).toBe(n);
  });
  it("dersler: r0:, gr: ve dn: kabul; başka önek ret", () => {
    for (const ok of ["r0:01-hallo", "gr:a1-01:t1", "gr:b2-12:t3", "dn:08-trennbar", "dn:a1-08:t1"]) expect(DERS_ID.test(ok), ok).toBe(true);
    for (const no of ["r1:01-x", "gr:a1-1:t1", "gr:x", "dn:", "dn:Gross", "dn:08-", "dn:a::b", "lx:gehen"]) expect(DERS_ID.test(no), no).toBe(false);
  });
  it("Gun.day 364'e kadar; 365 ve 0 ret", () => {
    const g = (day: number, id: string) => Gun.shape.day.safeParse(day).success && Gun.shape.id.safeParse(id).success;
    expect(g(8, "m1:gun:08")).toBe(true);
    expect(g(364, "m1:gun:364")).toBe(true);
    expect(g(365, "m1:gun:365")).toBe(false);
    expect(g(0, "m1:gun:01")).toBe(false);
  });
  it("halka kimliği gün numarasını taşır (00 ve 365+ ret)", () => {
    const H = Gun.shape.halkalar.unwrap().element.shape.id;
    for (const ok of ["m1:01:h1", "m1:56:h3", "m1:364:h2"]) expect(H.safeParse(ok).success, ok).toBe(true);
    for (const no of ["m1:00:h1", "m1:365:h1", "m1:8:h1"]) expect(H.safeParse(no).success, no).toBe(false);
  });
  it("dil noktası (dn-HH.json) grammar.json biçiminde", () => {
    expect(DilNoktasi.safeParse({ id: "dn:08-trennbar", h_tr: "Ayrılan fiil", tr: "Açıklama.", table: { head: ["a"], rows: [["an"]] }, ex: [{ de: "Ich rufe an.", tr: "Ararım." }] }).success).toBe(true);
    expect(DilNoktasi.safeParse({ id: "gr:a1-01:t1", h_tr: "x", tr: "y" }).success).toBe(false);
  });
});
