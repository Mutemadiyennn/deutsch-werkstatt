/**
 * Çok haftalı şema ve yükleyici (PM-092 md. 3.1, PM 7088043877 md. 1) — 1. hafta geriye uyum testi dahil.
 * Gerçek içerikte 1. hafta bugünkü gibi yüklenir ve denetlenir; geçici bir içerik kökünde 8. ve 100. gün, dn-HH.json ve
 * geçersiz dosya adı denenir.
 */
import { describe, expect, it } from "vitest";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkRules, loadContent, ROOT } from "./load.ts";
import { checkGun } from "./m1check.ts";
import { halkaDenetle } from "./halka.ts";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";

const CDIR = join(ROOT, "content/v2");

describe("1. hafta geriye uyum", () => {
  const c = loadContent();
  it("1.–7. gün yüklenir; kimlik ve dosya adı birebir; m1 dosyalarında hata yok", () => {
    const g17 = c.m1.filter((x) => x.data.day <= 7).sort((a, b) => a.data.day - b.data.day);
    expect(g17.map((x) => x.data.day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    for (const { file, data } of g17) {
      expect(file).toBe(`content/v2/m1/gun-${String(data.day).padStart(2, "0")}.json`);
      expect(data.id).toBe(`m1:gun:${String(data.day).padStart(2, "0")}`);
    }
    const r = checkRules(loadContent());
    expect(r.errors.filter((e) => e.includes("content/v2/m1/") || e.startsWith("m1/"))).toEqual([]);
  });
  it("1. haftanın halka kapısı dil noktalı dizinle de 0 hata (#205 P2-8)", () => {
    const genel = genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8"));
    const d = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genel, [...c.grammar, ...c.dn.flatMap((x) => x.data)]);
    expect(halkaDenetle(c.m1, new Map(c.temel.map((t) => [t.data.id, t.data])), d).errors).toEqual([]);
  });
  it("1. haftanın dersleri yalnız r0: ve hepsi temel pakette", () => {
    const temel = new Set(c.temel.map((t) => t.data.id));
    for (const { data } of c.m1.filter((x) => x.data.day <= 7)) for (const d of data.dersler) { expect(d.startsWith("r0:")).toBe(true); expect(temel.has(d)).toBe(true); }
  });
});

describe("çok haftalı yükleyici (geçici içerik kökü)", () => {
  const kok = mkdtempSync(join(tmpdir(), "dw-cokhafta-"));
  const m1 = join(kok, "m1"); mkdirSync(m1, { recursive: true });
  for (const f of ["registry", "temel", "world"]) cpSync(join(CDIR, f), join(kok, f), { recursive: true });
  const g1 = JSON.parse(readFileSync(join(CDIR, "m1/gun-01.json"), "utf8"));
  const yaz = (ad: string, day: number, id: string, dersler: string[]) => writeFileSync(join(m1, ad), JSON.stringify({ ...g1, day, id, dersler, halkalar: undefined, gun_sinavi: undefined }));
  yaz("gun-01.json", 1, "m1:gun:01", g1.dersler);
  yaz("gun-08.json", 8, "m1:gun:08", ["gr:a1-01:t1", "dn:08-ornek"]);
  yaz("gun-100.json", 100, "m1:gun:100", []);
  yaz("gun-9.json", 9, "m1:gun:09", []);
  writeFileSync(join(m1, "dn-2.json"), "[]");
  writeFileSync(join(m1, "dn-53.json"), "[]");
  writeFileSync(join(m1, "dn-03.json"), JSON.stringify([{ id: "dn:08-ornek", h_tr: "Tekrar", tr: "Aynı kimlik.", ex: [] }, { id: "dn:15-kaba", h_tr: "Kaba", tr: "Örnek.", ex: [{ de: "Das ist Scheiße.", tr: "x" }] }]));
  mkdirSync(join(m1, "video"), { recursive: true }); writeFileSync(join(m1, "video", "gun-10.json"), "{}");
  writeFileSync(join(m1, "dn-02.json"), JSON.stringify([{ id: "dn:08-ornek", h_tr: "Örnek", tr: "Açıklama.", table: { head: ["de", "tr"], rows: [["gehe", "giderim"]] }, ex: [] }]));
  const c = loadContent(kok);
  const r = checkRules(loadContent(kok));
  rmSync(kok, { recursive: true, force: true });

  it("gun-NN.json'ın hepsini okur (08, 100); geçersiz ad hata verir, sessizce atlanmaz", () => {
    expect(c.m1.map((x) => x.data.day).sort((a, b) => a - b)).toEqual([1, 8, 100]);
    expect(c.errors.some((e) => e.includes("gun-9.json") && e.includes("geçersiz"))).toBe(true);
  });
  it("dn-HH.json yüklenir (hafta numarasıyla); geçersiz ad ve 1…52 dışı hafta hata; alt klasördeki gün dosyası hata", () => {
    expect(c.dn.map((x) => x.hafta)).toEqual([2, 3]);
    expect(c.dn[0]!.data[0]!.id).toBe("dn:08-ornek");
    expect(c.errors.some((e) => e.includes("dn-2.json") && e.includes("geçersiz"))).toBe(true);
    expect(c.errors.some((e) => e.includes("dn-53.json") && e.includes("geçersiz"))).toBe(true);
    expect(c.errors.some((e) => e.includes("video/gun-10.json") && e.includes("kökünde"))).toBe(true);
    expect(c.m1.some((x) => x.file.includes("/video/"))).toBe(false);
  });
  it("dn-HH.json içerik güvenliği taramasında ve tek kimlik denetiminde (#205 P1-2)", () => {
    expect(r.errors.filter((e) => e.includes("dn:15-kaba"))).toHaveLength(1);
    expect(r.errors.filter((e) => e.includes("dn:08-ornek") && /tekrar|iki kez|yinelen|aynı/i.test(e))).toHaveLength(1);
  });
  it("gr:/dn: ders kimliği şemadan geçer ve temel pakette aranmaz (var mı denetimi hat D'de)", () => {
    const g8 = c.m1.find((x) => x.data.day === 8)!.data;
    expect(g8.dersler).toEqual(["gr:a1-01:t1", "dn:08-ornek"]);
    const r = checkGun(g8, { lexicon: new Set(c.lexemes.map((l) => l.id)), temel: new Set(c.temel.map((t) => t.data.id)) });
    expect(r.errors.filter((e) => e.startsWith("dersler:"))).toEqual([]);
    expect(checkGun({ ...g8, dersler: ["r0:99-yok"] }, { lexicon: new Set(), temel: new Set() }).errors).toContain("dersler: r0:99-yok temel pakette yok");
  });
});
