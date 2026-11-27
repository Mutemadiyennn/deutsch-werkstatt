/** PM-148 [ANA-V] md. 1: `serbest_konus` şeması, doğrulayıcı ve hafta kapısı (FORMAT.md "Serbest konuşma") */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Gun, genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { checkGun } from "./m1check.ts";
import { tabloGunleri, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { haftaKapisi } from "./hafta-kapisi.ts";
import { loadContent, ROOT, unknownKeys } from "./load.ts";

const raw = JSON.parse(readFileSync(join(import.meta.dirname, "fixtures/m1/gun-01.json"), "utf8"));
const ctx = { lexicon: new Set<string>(raw.yeni_kartlar), temel: new Set<string>(["r0:01-tage"]) };
const madde = (o: Record<string, unknown> = {}) => ({
  id: "m1:01:k1", durum_tr: "Kursta biri seninle tanışmak istiyor.", gorev_tr: "Adını ve nereli olduğunu söyle.", soru_de: "Hallo! Wer bist du?",
  hedefler: [
    { id: "h1", tr: "adını söyle", kaliplar: ["Ich heiße ___.", "Mein Name ist ___.", "Ich bin ___."], yuva: "name" },
    { id: "h2", tr: "nereli olduğunu söyle", kaliplar: ["Ich komme aus ___.", "Ich bin aus ___.", "Aus ___."], yuva: "ulke" }
  ],
  ornek_de: "Ich heiße {name}. Ich komme aus {ulke}.", ornek_tr: "Benim adım …. …'den geliyorum.", ...o
});
const gunle = (...k: unknown[]) => ({ ...structuredClone(raw), serbest_konus: k });
const hatalar = (...k: unknown[]) => checkGun(Gun.parse(gunle(...k)), ctx).errors.filter((e) => e.startsWith("serbest_konus"));

describe("serbest_konus şeması", () => {
  it("örnek madde şemaya uyar, bilinmeyen alan yok, denetimde 0 hata; en_az_cumle varsayılanı 2", () => {
    const g = Gun.parse(gunle(madde()));
    expect(unknownKeys(gunle(madde()), g)).toEqual([]);
    expect(hatalar(madde())).toEqual([]);
    expect(g.serbest_konus![0]!.en_az_cumle).toBe(2);
  });
  it("şema: kalıp ≥ 3 (D-064), hedef 2–7, en_az_cumle ≥ 2, gün başına ≤ 2 madde, bilinmeyen yuva adı yok", () => {
    const h = madde().hedefler;
    expect(Gun.safeParse(gunle(madde({ hedefler: [{ ...h[0], kaliplar: ["Ich heiße ___.", "Ich bin ___."] }, h[1]] }))).success).toBe(false);
    expect(Gun.safeParse(gunle(madde({ hedefler: [h[0]] }))).success).toBe(false);
    expect(Gun.safeParse(gunle(madde({ en_az_cumle: 1 }))).success).toBe(false);
    expect(Gun.safeParse(gunle(madde(), madde({ id: "m1:01:k2" }), madde({ id: "m1:01:k3" }))).success).toBe(false);
    expect(Gun.safeParse(gunle(madde({ hedefler: [{ ...h[0], yuva: "adres" }, h[1]] }))).success).toBe(false);
    expect(Gun.safeParse(gunle(madde({ id: "m1:01:x1" }))).success).toBe(false);
  });
  it("ipucu yok: görev ve durumda ** / tırnak / yer tutucu hatadır; soru_de'de yer tutucu hatadır", () => {
    expect(hatalar(madde({ gorev_tr: "**Ich heiße** ile adını söyle." }))).toHaveLength(1);
    expect(hatalar(madde({ durum_tr: "Biri „Hallo“ diyor." }))).toHaveLength(1);
    expect(hatalar(madde({ soru_de: "Hallo {name}!" }))).toHaveLength(1);
  });
  it("örnek: her cümlesi bir hedefin kalıbına uyar, her hedefi karşılar, en az en_az_cumle cümle", () => {
    expect(hatalar(madde({ ornek_de: "Ich heiße {name}. Ich trinke Kaffee." })).join("\n")).toMatch(/uymuyor[\s\S]*h2: ornek_de bu hedefi karşılamıyor/);
    expect(hatalar(madde({ ornek_de: "Ich heiße {name}, ich komme aus {ulke}." })).join("\n")).toMatch(/1 cümle/);
  });
  it("kimlik tekil ve günün numarasıyla; hedef kimlikleri tekil", () => {
    expect(hatalar(madde(), madde()).join("\n")).toMatch(/tekil değil/);
    expect(hatalar(madde({ id: "m1:02:k1" })).join("\n")).toMatch(/günün numarasıyla/);
    const h = madde().hedefler;
    expect(hatalar(madde({ hedefler: [h[0], { ...h[1], id: "h1" }] })).join("\n")).toMatch(/hedef kimlikleri/);
  });
});

describe("hafta kapısı: serbest konuşma gün sonunda, öğretilmeden istenen sayılır", () => {
  const c = loadContent();
  const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8")));
  const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
  const tablo = JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "utf8")) as KesinTablo;
  const T = tabloGunleri(tablo);
  const omurga = JSON.parse(readFileSync(join(ROOT, "content/v2/curriculum/omurga.json"), "utf8")) as Omurga;
  const gun = (n: number, ek: Record<string, unknown> = {}): GunHam =>
    ({ day: n, can_do: { id: `cd:m1:${n}`, tr: "" }, yeni_kartlar: [...T.get(n)!], dersler: [...(omurga.gunler.find((g) => g.day === n)?.dersler ?? [])], halkalar: [{ id: `h${n}`, kartlar: [...T.get(n)!], gorev_cumleleri: [] }], ...ek });
  const kos = (sk: unknown[]) => haftaKapisi({ hafta: 2, gunler: [8, 9, 10, 11, 12, 13, 14].map((n) => gun(n, n === 10 ? { serbest_konus: sk } : {})).map((data) => ({ file: `gun-${data.day}.json`, data })),
    tablo, omurga, dizin, dersler, test: { maddeler: [{ id: "t", k: "guided_response", prompt_de: "Wie geht's?", accepted: ["Hallo!"] }] },
    gorulmemis: { durumlar: [8, 9, 10, 11, 12, 13, 14].map((n, i) => ({ id: `g${i}`, prompt_de: "Und Sie?", can_do: `cd:m1:${n}`, accepted: ["Danke, gut! Hallo!"] })) } });
  const satir = (r: ReturnType<typeof kos>) => r.adimlar.filter((a) => a.yer.includes("serbest_konus"));
  it("her hedef bir madde; bilinen kalıpla tamam (yuva ad yeri gibi bilinir)", () => {
    const r = kos([madde({ id: "m1:10:k1", soru_de: undefined, hedefler: [
      { id: "h1", tr: "selam", kaliplar: ["Hallo!", "Guten Tag!", "Hallo ___!"] },
      { id: "h2", tr: "ad", kaliplar: ["Ich heiße ___.", "Mein Name ist ___.", "Ich bin ___."] }] })]);
    expect(satir(r).map((a) => [a.yer.replace(/^.*\//, ""), a.sonuc])).toEqual([["h1", "tamam"], ["h2", "tamam"]]);
  });
  it("hiçbir kalıbı kurulamayan hedef öğretilmeden istenendir", () => {
    const r = kos([madde({ id: "m1:10:k1", soru_de: undefined, hedefler: [
      { id: "h1", tr: "selam", kaliplar: ["Hallo!", "Guten Tag!", "Hallo ___!"] },
      { id: "h2", tr: "uçak", kaliplar: ["Mein Flugzeug landet ___.", "Der Flughafen ist ___.", "Das Flugzeug fliegt ___."] }] })]);
    expect(satir(r).find((a) => a.yer.endsWith("/h2"))!.sonuc).toBe("kesin");
    expect(r.ogretilmedenKesin).toBeGreaterThan(0);
  });
});
