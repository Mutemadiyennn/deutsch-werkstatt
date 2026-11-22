/**
 * Dikiş denetçisi (PM-090 md. 2.1): gerçek 1. gün yeşil; her kural (a)–(d) bilerek bozulmuş örnekte kırmızı.
 * Girdi: gerçek sözlük, temel dersler, omurga ve gun-01.json; tablo fikstürü fixtures/dikis-tablo.json (a1-kesin.json'un 1.–21. günü).
 */
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { acikEsdizimler, dikisDenetle, haftaOf, tabloGunleri, type DikisGirdi, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { loadContent, ROOT } from "./load.ts";

const c = loadContent();
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8")));
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const tablo = JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "utf8")) as KesinTablo;
const omurga = JSON.parse(readFileSync(join(ROOT, "content/v2/curriculum/omurga.json"), "utf8")) as Omurga;
const GUN1 = JSON.parse(readFileSync(join(ROOT, "content/v2/m1/gun-01.json"), "utf8")) as GunHam;
const kopya = (): GunHam => structuredClone(GUN1);
const kos = (gunler: GunHam[], o: Partial<DikisGirdi> = {}) =>
  dikisDenetle({ gunler: gunler.map((data) => ({ file: `gun-${String(data.day).padStart(2, "0")}.json`, data })), tablo, omurga, dizin, dersler, ...o });
const kural = (r: ReturnType<typeof kos>, k: string, gun = 1) => r.ihlaller.filter((i) => i.kural === k && i.gun === gun);
type H = { kartlar: string[]; gorev_cumleleri: { kart: string; de: string; accepted: string[] }[] };
const halka = (g: GunHam, i: number) => (g.halkalar as H[])[i]!;

describe("dikiş denetçisi: gerçek 1. gün", () => {
  it("birleşmiş gun-01.json 0 ihlal; satır 'denetlendi'", () => {
    const r = kos([kopya()]);
    expect(r.ihlaller).toEqual([]);
    expect(r.satirlar).toEqual([expect.objectContaining({ gun: 1, hafta: 1, durum: "denetlendi", sayi: { a: 0, b: 0, c: 0, d: 0 } })]);
  });
  it("halkasız (eski biçim) gün atlanır, --tum ile denetlenir", () => {
    const g = kopya(); delete g.halkalar;
    expect(kos([g]).satirlar[0]).toMatchObject({ durum: "atlandı", neden: "halkasız (eski biçim)" });
    expect(kos([g], { tum: true }).satirlar[0]!.durum).toBe("denetlendi");
  });
  it("tablo: 1.–7. gün ogretilmis_sayilan'dan, sonrası gunler[]'den", () => {
    const t = tabloGunleri(tablo);
    expect(t.get(1)).toEqual(GUN1.yeni_kartlar);
    expect(t.get(8)).toContain("lx:Zeit");
    expect([haftaOf(1), haftaOf(7), haftaOf(8), haftaOf(14), haftaOf(15)]).toEqual([1, 1, 2, 2, 3]);
  });
});

describe("(a) yeni_kartlar = tablodaki gün", () => {
  it("eksik, fazla ve iki kez yazılan kart kırmızı", () => {
    const g = kopya();
    g.yeni_kartlar = [...GUN1.yeni_kartlar!.filter((x) => x !== "lx:Herr"), "lx:Zeit", "lx:hallo"];
    const m = kural(kos([g]), "a").map((i) => i.mesaj);
    expect(m).toContain("eksik lx:Herr");
    expect(m).toContain("fazla lx:Zeit (tabloda 8. gün)");
    expect(m).toContain("iki kez lx:hallo");
  });
  it("tabloda olmayan gün kırmızı", () => {
    const g = kopya(); g.day = 40;
    expect(kural(kos([g]), "a", 40).map((i) => i.mesaj)).toEqual(["tabloda 40. gün yok"]);
  });
});

describe("(b) tanıtılmadan sorulan kart", () => {
  it("halka görev cümlesinde sonraki haftanın kartı (8. gün) kırmızı ve yeri yazılı", () => {
    const g = kopya(); halka(g, 0).gorev_cumleleri[0]!.de = "Hallo, Zeit!";
    const b = kural(kos([g]), "b");
    expect(b).toHaveLength(1);
    expect(b[0]!.yer).toBe("halka m1:01:h1 lx:hallo");
    expect(b[0]!.mesaj).toContain("lx:Zeit → 8. gün");
  });
  it("aynı gün içinde: sonraki halkanın kartı önceki halkada sorulursa kırmızı; kendi halkasında yeşil", () => {
    const g = kopya(); halka(g, 0).gorev_cumleleri[0]!.de = "Hallo, Freitag!";   // lx:Freitag 3. halkada tanıtılır
    expect(kural(kos([g]), "b").map((i) => i.mesaj.split(":")[0])).toEqual(['"freitag" tanıtılmadan soruluyor (lx']);
    const g2 = kopya(); halka(g2, 2).gorev_cumleleri[0]!.de = "Hallo, Freitag!";
    expect(kural(kos([g2]), "b")).toEqual([]);
  });
  it("halka dışı adım: gün sınavında ve provada sonraki günün kartı kırmızı", () => {
    const g = kopya();
    const s = (g.gun_sinavi as { maddeler: { accepted: string[] }[] }).maddeler[0]!; s.accepted = ["Am Wochenende ist die Praxis lange geschlossen.", ...s.accepted];
    const p = (g.prova as { dugumler: { secenekler?: { de: string; uygun: boolean }[] }[] }).dugumler[0]!.secenekler!;
    p[0]!.de = "Guten Tag, hier ist {name}. Ich brauche einen Termin.";
    const b = kural(kos([g]), "b");
    expect(b.some((i) => i.yer.startsWith("gün sınavı m1:01:s1") && i.mesaj.includes("lx:lange → 8. gün"))).toBe(true);
    expect(b.some((i) => i.yer === "prova n1" && i.mesaj.includes('"termin"'))).toBe(true);
  });
  it("uygun olmayan prova seçeneği sorulmuş sayılmaz", () => {
    const g = kopya();
    const p = (g.prova as { dugumler: { secenekler?: { de: string; uygun: boolean; accepted?: string[] }[] }[] }).dugumler[0]!.secenekler!;
    p[0]!.de = "Hallo, Zeit!"; p[0]!.accepted = ["Hallo, Zeit!"]; p[0]!.uygun = false;
    expect(kural(kos([g]), "b")).toEqual([]);
  });
  it("gösterilmiş kalıp: açık eşdizim bütün olarak bilinir, parçası tek başına bilinmez", () => {
    const w = c.lexemes.find((l) => l.id === "lx:Wochenende")!;
    expect(acikEsdizimler(w)).toContain("Schönes Wochenende!");
    const g = kopya(); halka(g, 3).gorev_cumleleri[0]!.de = "Schönes Wochenende!";
    expect(kural(kos([g]), "b")).toEqual([]);
    const g2 = kopya(); halka(g2, 3).gorev_cumleleri[0]!.de = "Schönes Wochenende, schöne Woche!";
    expect(kural(kos([g2]), "b").map((i) => i.mesaj.slice(0, 9))).toEqual(['"schöne" ']);
  });
});

describe("(c) dersler = omurga; sonraki haftanın dersi yok", () => {
  it("yanlış ders: eksik ve fazla kırmızı (fazlanın omurgadaki günü yazılı)", () => {
    const g = kopya(); g.dersler = ["r0:02-monate"];
    const m = kural(kos([g]), "c").map((i) => i.mesaj);
    expect(m).toContain("eksik r0:01-tage (omurga 1. gün)");
    expect(m).toContain("fazla r0:02-monate (omurgada 2. gün)");
  });
  it("requires.gramer'de sonraki haftanın dersi kırmızı", () => {
    const g = kopya(); (g.requires as { gramer: string[] }).gramer = ["gr:a1-03:t5"];
    expect(kural(kos([g]), "c").map((i) => `${i.yer}: ${i.mesaj}`)).toEqual(["requires.gramer: gr:a1-03:t5 2. haftanın dersi (omurga 8. gün)"]);
  });
  it("geçici: dersler boşsa requires.gramer sayılır ve satıra not düşülür", () => {
    const g = kopya(); g.dersler = []; (g.requires as { gramer: string[] }).gramer = ["r0:01-tage"];
    const r = kos([g]);
    expect(kural(r, "c")).toEqual([]);
    expect(r.satirlar[0]!.not).toContain("dersler boş; requires.gramer sayıldı (geçici)");
    (g.requires as { gramer: string[] }).gramer = [];
    expect(kural(kos([g]), "c").map((i) => i.mesaj)).toEqual(["eksik r0:01-tage (omurga 1. gün)"]);
  });
});

describe("(d) haftalar arası aynı görev cümlesi", () => {
  it("2. haftada 1. haftanın görev cümlesi kırmızı; aynı hafta içinde serbest", () => {
    const g8 = kopya(); g8.day = 8; g8.yeni_kartlar = tabloGunleri(tablo).get(8)!;
    const d = kural(kos([kopya(), g8]), "d", 8);
    expect(d.length).toBeGreaterThan(0);
    expect(d[0]!.mesaj).toMatch(/^aynı görev cümlesi 1\. haftada da var \(1\. gün, /);
    expect(kural(kos([kopya(), g8]), "d", 1)).toEqual([]);
    const g2 = kopya(); g2.day = 2;
    expect(kural(kos([kopya(), g2]), "d", 2)).toEqual([]);
  });
  it("iki sözcüklü kısa cevaplar sayılmaz", () => {
    const g8 = kopya(); g8.day = 8;
    const d = kural(kos([kopya(), g8]), "d", 8);
    expect(d.every((i) => i.mesaj.split(": ").pop()!.split(" ").length >= 3)).toBe(true);
  });
});

describe("komut satırı", () => {
  it("tablo yoksa açık hata, çıkış 2", () => {
    const r = spawnSync(process.execPath, ["--experimental-strip-types", "--no-warnings", join(ROOT, "content/tools/dikis-kos.ts"), "--tablo", "/yok/a1-kesin.json"], { encoding: "utf8" });
    expect(r.status).toBe(2);
    expect(r.stderr).toContain("HATA: tablo yok: /yok/a1-kesin.json");
  });
  it("fikstür tabloyla gerçek içerik: 1. gün 0 ihlal, çıkış 0", () => {
    const r = spawnSync(process.execPath, ["--experimental-strip-types", "--no-warnings", join(ROOT, "content/tools/dikis-kos.ts"), "--tablo", join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "--gun", "1"], { encoding: "utf8" });
    expect(r.stdout).toContain("| 1 | 1 | denetlendi | 0 | 0 | 0 | 0 |");
    expect(r.stdout).toContain("İhlal: 0");
    expect(r.status).toBe(0);
  }, 30000);
});
