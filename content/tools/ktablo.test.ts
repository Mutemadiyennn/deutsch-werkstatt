/**
 * K(t) kesin tablodan (PM-092 md. 3.2, PM-100 md. 2, PM-102 md. 1): dosyası olmayan önceki gün tablodan tamamlanır, dosyası olan gün
 * dosyadan okunur; tabloda olmayan sözcük yine hatadır. `dersler` kimliklerinin var mı denetimi (gr: grammar.json, dn: dn-HH.json).
 */
import { describe, expect, it } from "vitest";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Lexeme, kumeDizini, type Gun, type TemelDers } from "../../packages/shared/src/index.ts";
import { halkaDenetle } from "./halka.ts";
import { kesinTabloOku, tabloDolgusu, tabloEkle, type KesinTablo } from "./ktablo.ts";
import { checkRules, loadContent, ROOT } from "./load.ts";

const TABLO = {
  ogretilmis_sayilan: { gunler: { "1": ["lx:Montag"], "2": ["lx:Dienstag"] } },
  haftalar: [{ no: 2, cerceve: ["lx:ich", "lx:mit"] }],
  gunler: [
    { day: 8, kartlar: ["lx:Apfel", "lx:Brot"], cerceve: ["lx:ich"], dersler: ["gr:a1-01:t1"] },
    { day: 9, kartlar: ["lx:Milch"], cerceve: [], dersler: [] },
    { day: 15, kartlar: ["lx:Käse"], cerceve: [] }
  ]
};
const tablo = (): KesinTablo => { const m: KesinTablo = new Map(); const e: string[] = []; tabloEkle(m, TABLO, "a1", e); expect(e).toEqual([]); return m; };

describe("kesin tablo okuma", () => {
  it("1.–7. gün ogretilmis_sayilan'dan, sonrası gunler[]'den; haftanın kalan çerçevesi son güne", () => {
    const m = tablo();
    expect(m.get(1)).toMatchObject({ kartlar: ["lx:Montag"], cerceve: [], dersler: [] });
    expect(m.get(8)).toMatchObject({ kartlar: ["lx:Apfel", "lx:Brot"], cerceve: ["lx:ich"], dersler: ["gr:a1-01:t1"] });
    expect(m.get(15)!.dersler).toEqual([]);
    // lx:mit hiçbir güne yazılmamış: 2. haftanın son günü (14) — o gün tabloda yoksa çerçeveli boş gün
    expect(m.get(14)).toMatchObject({ kartlar: [], cerceve: ["lx:mit"] });
  });
  it("aynı gün iki tabloda: hata; JSON okunamazsa hata; dosya yoksa sessiz", () => {
    const m = tablo(), e: string[] = [];
    tabloEkle(m, { gunler: [{ day: 8, kartlar: ["lx:x"] }] }, "a2", e);
    expect(e).toEqual(["a2: 8. gün a1 içinde de var"]);
    const kok = mkdtempSync(join(tmpdir(), "dw-ktablo-")); mkdirSync(join(kok, "curriculum"));
    writeFileSync(join(kok, "curriculum/a2-kesin.json"), "{bozuk");
    writeFileSync(join(kok, "curriculum/b1-kesin.json"), JSON.stringify({ gunler: [{ day: 169, kartlar: ["lx:nun"] }] }));
    const e2: string[] = []; const t = kesinTabloOku(kok, e2);
    rmSync(kok, { recursive: true, force: true });
    expect(e2.some((x) => x.startsWith("curriculum/a2-kesin.json: JSON okunamadı"))).toBe(true);
    expect([...t.keys()]).toEqual([169]);
  });
  it("depodaki tablolar okunur (a1 1.–56. gün)", () => {
    const e: string[] = []; const t = kesinTabloOku(join(ROOT, "content/v2"), e);
    expect(e).toEqual([]);
    for (const g of [1, 7, 8, 56]) expect(t.has(g), `${g}. gün`).toBe(true);
  });
});

describe("tablo dolgusu", () => {
  it("dosyası olmayan önceki günler sırayla, ilk dosya gününden önce; dosyası olan gün tablodan gelmez", () => {
    const d = tabloDolgusu([1, 2, 9, 15], tablo());
    expect(d.get(1)).toEqual([]);
    expect(d.get(2)).toEqual([]);
    expect(d.get(9)!.map((x) => x.day)).toEqual([8]);
    expect(d.get(15)!.map((x) => x.day)).toEqual([14]);
  });
  it("tablo yoksa dolgu yok", () => expect(tabloDolgusu([8], undefined).size).toBe(0));
});

describe("halka K(t): önceki gün dosyası yoksa tablodan", () => {
  const L = (id: string, de: string) => Lexeme.parse({ id, de, tr: "x", pos: "noun", examples: [{ id: `${id}:0`, de: `${de}!`, tr: "x" }, { id: `${id}:1`, de: `${de}?`, tr: "x" }] });
  const LEX = ["Apfel", "Brot", "Milch", "Käse", "Butter", "Wasser", "Saft", "Tee", "Reis", "Ei"].map((x) => L(`lx:${x}`, x));
  const d = kumeDizini(LEX, [] as TemelDers[], null);
  const kartlar = ["lx:Butter", "lx:Wasser", "lx:Saft", "lx:Tee"];
  const gun15 = (cumle: string, day = 15) => ({ file: `gun-${day}.json`, data: {
    day, dersler: [], yeni_kartlar: kartlar, sesler: [],
    halkalar: [{ id: `m1:${day}:h1`, title_tr: "x", kartlar, gorev_cumleleri: [{ kart: "lx:Tee", de: cumle, tr: "x", accepted: ["a", "b", "c"] }] }]
  } as unknown as Gun });
  const bilinmeyen = (e: string[]) => e.filter((x) => x.includes("bilinmeyen"));

  it("8. ve 9. günün dosyası yok: tablodaki kartları (Apfel, Milch) 15. günde bilinir", () => {
    expect(bilinmeyen(halkaDenetle([gun15("Tee Apfel Milch")], new Map(), d, tablo()).errors)).toEqual([]);
  });
  it("tablo verilmezse aynı cümle hata (eski davranış)", () => {
    expect(bilinmeyen(halkaDenetle([gun15("Tee Apfel Milch")], new Map(), d).errors)).toHaveLength(1);
  });
  it("tabloda olmayan sözcük yine hata (gerçek hata yakalanır)", () => {
    const e = bilinmeyen(halkaDenetle([gun15("Tee Apfel Reis")], new Map(), d, tablo()).errors);
    expect(e).toHaveLength(1); expect(e[0]).toContain("(reis)");
  });
  it("dosyası olan gün dosyadan okunur: 9. gün dosyası Milch'i öğretmiyorsa tablo onu tamamlamaz", () => {
    const g9 = { file: "gun-09.json", data: { day: 9, dersler: [], yeni_kartlar: [], sesler: [] } as unknown as Gun };
    const e = bilinmeyen(halkaDenetle([g9, gun15("Tee Apfel Milch")], new Map(), d, tablo()).errors);
    expect(e).toHaveLength(1); expect(e[0]).toContain("(milch)");
  });
  it("sonraki günün tablo kartı bilinmez (yalnız önceki günler)", () => {
    expect(bilinmeyen(halkaDenetle([gun15("Tee Käse", 10)], new Map(), d, tablo()).errors)).toHaveLength(1);
  });
});

describe("doğrulayıcı: dersler kimlikleri ve tablo dolgusu (geçici içerik kökü)", () => {
  const CDIR = join(ROOT, "content/v2");
  const kok = mkdtempSync(join(tmpdir(), "dw-ktablo-kok-"));
  mkdirSync(join(kok, "m1"), { recursive: true });
  for (const f of ["registry", "temel", "world", "curriculum"]) cpSync(join(CDIR, f), join(kok, f), { recursive: true });
  const g1 = JSON.parse(readFileSync(join(CDIR, "m1/gun-01.json"), "utf8"));
  const yaz = (day: number, dersler: string[]) => writeFileSync(join(kok, "m1", `gun-${String(day).padStart(2, "0")}.json`),
    JSON.stringify({ ...g1, day, id: `m1:gun:${String(day).padStart(2, "0")}`, dersler, yeni_kartlar: [], halkalar: undefined, gun_sinavi: undefined }));
  yaz(9, ["gr:a1-01:t1", "gr:a1-99:t9", "dn:var", "dn:baska-hafta", "dn:hic-yok"]);
  writeFileSync(join(kok, "m1/dn-02.json"), JSON.stringify([{ id: "dn:var", h_tr: "Var", tr: "Açıklama.", ex: [] }]));
  writeFileSync(join(kok, "m1/dn-03.json"), JSON.stringify([{ id: "dn:baska-hafta", h_tr: "Başka", tr: "Açıklama.", ex: [] }]));
  const c = checkRules(loadContent(kok));
  rmSync(kok, { recursive: true, force: true });
  const ders = c.errors.filter((e) => e.includes("dersler:"));

  it("gr: grammar.json'da yoksa hata; varsa geçer", () => {
    expect(ders.some((e) => e.endsWith("gun-09.json: dersler: gr:a1-99:t9 registry/grammar.json'da yok"))).toBe(true);
    expect(ders.some((e) => e.includes("gr:a1-01:t1"))).toBe(false);
  });
  it("dn: o haftanın dn-HH.json'ında olmalı; başka haftada ya da hiç yoksa hata", () => {
    expect(ders.some((e) => e.includes("dn:var"))).toBe(false);
    expect(ders.some((e) => e.includes("dn:baska-hafta m1/dn-02.json'da yok (dn-03.json içinde)"))).toBe(true);
    expect(ders.some((e) => e.endsWith("dn:hic-yok m1/dn-02.json'da yok"))).toBe(true);
    expect(ders).toHaveLength(3);
  });
  it("tablo yüklenir (loadContent.kesin)", () => expect(c.kesin?.has(8)).toBe(true));
});

describe("kesinTabloBirlesik: dikiş ve hafta kapısı komut satırının varsayılan tablosu (PM-117 A.3)", () => {
  it("a1 + a2 + b1 sırayla birleşir; ogretilmis_sayilan ilk tablodan; aynı gün ya da hafta iki dosyadaysa hata", async () => {
    const { kesinTabloBirlesik } = await import("./ktablo.ts");
    const kok = mkdtempSync(join(tmpdir(), "dw-birlesik-"));
    try {
      mkdirSync(join(kok, "curriculum"));
      writeFileSync(join(kok, "curriculum/a1-kesin.json"), JSON.stringify({ ogretilmis_sayilan: { gunler: { "1": ["lx:a"] } }, haftalar: [{ no: 2 }], gunler: [{ day: 8, kartlar: ["lx:b"] }] }));
      writeFileSync(join(kok, "curriculum/a2-kesin.json"), JSON.stringify({ haftalar: [{ no: 9 }], gunler: [{ day: 57, kartlar: ["lx:c"] }] }));
      const e: string[] = [];
      const r = kesinTabloBirlesik(kok, e);
      expect(e).toEqual([]);
      expect(r.dosyalar).toEqual(["curriculum/a1-kesin.json", "curriculum/a2-kesin.json"]);
      expect(r.tablo.gunler.map((g) => (g as { day: number }).day)).toEqual([8, 57]);
      expect(r.tablo.haftalar.map((h) => (h as { no: number }).no)).toEqual([2, 9]);
      expect(r.tablo.ogretilmis_sayilan).toEqual({ gunler: { "1": ["lx:a"] } });
      writeFileSync(join(kok, "curriculum/b1-kesin.json"), JSON.stringify({ haftalar: [{ no: 9 }], gunler: [{ day: 57, kartlar: ["lx:d"] }] }));
      const e2: string[] = [];
      kesinTabloBirlesik(kok, e2);
      expect(e2).toEqual(["curriculum/b1-kesin.json: 57. gün a2-kesin.json içinde de var", "curriculum/b1-kesin.json: 9. hafta a2-kesin.json içinde de var"]);
    } finally { rmSync(kok, { recursive: true, force: true }); }
  });
  it("gerçek içerik: 8.–56. ve 57.–168. gün tek tabloda; A2 günü dikişte 'tabloda yok' sayılmaz", async () => {
    const { kesinTabloBirlesik } = await import("./ktablo.ts");
    const e: string[] = [];
    const r = kesinTabloBirlesik(join(ROOT, "content/v2"), e);
    expect(e).toEqual([]);
    const gunler = new Set(r.tablo.gunler.map((g) => (g as { day: number }).day));
    expect(gunler.has(56) && gunler.has(57) && gunler.has(168)).toBe(true);
  });
});
