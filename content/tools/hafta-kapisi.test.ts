/**
 * Hafta kapısı (PM-087 B.1, 7087286882, PM-096): her şart bilerek bozulmuş örnekte kırmızı, düzgün haftada yeşil.
 * Girdi: gerçek sözlük, temel dersler, omurga; tablo fikstürü fixtures/dikis-tablo.json (#198 1.–21. gün); 2. hafta yapay günlerle.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { tabloGunleri, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { haftaKapisi, kapiRaporu, maddeler, type KapiGirdi } from "./hafta-kapisi.ts";
import { loadContent, ROOT } from "./load.ts";

const c = loadContent();
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8")));
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const tablo = JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "utf8")) as KesinTablo;
const T = tabloGunleri(tablo);
const omurga = JSON.parse(readFileSync(join(ROOT, "content/v2/curriculum/omurga.json"), "utf8")) as Omurga;
const omDers = (n: number) => omurga.gunler.find((g) => g.day === n)?.dersler ?? [];

type Gorev = { kart: string; de: string; accepted: string[] };
/** n. gün: tablodaki kartlar, omurgadaki dersler, tek halka */
const gun = (n: number, gorev: Gorev[] = [], ek: Record<string, unknown> = {}): GunHam =>
  ({ day: n, can_do: { id: `cd:m1:${n}`, tr: "" }, yeni_kartlar: [...T.get(n)!], dersler: [...omDers(n)], halkalar: [{ id: `h${n}`, kartlar: [...T.get(n)!], gorev_cumleleri: gorev }], ...ek });
const hafta2 = (degis: (gs: GunHam[]) => void = () => {}) => { const gs = [8, 9, 10, 11, 12, 13, 14].map((n) => gun(n)); degis(gs); return gs; };
/** 3. haftanın tek sözcüklü bir kartı (2. haftanın sonunda bilinmez) */
const GOSTERIM = (readFileSync(join(ROOT, "content/v2/registry/grammar.json"), "utf8") + c.temel.map((t) => JSON.stringify(t.data)).join(" ")).toLowerCase();
const H3 = [15, 16, 17, 18, 19, 20, 21].flatMap((n) => T.get(n)!).filter((k) => !dizin.cerceve.has(k)).map((k) => dizin.kartlar.get(k)?.de)
  .find((x) => x && /^[A-ZÄÖÜa-zäöüß]+$/.test(x) && !GOSTERIM.includes(x.toLowerCase()))!;
const g = (de: string, ...acc: string[]): Gorev => ({ kart: "x", de, accepted: acc.length ? acc : [de] });
const TEST = (acc: string[][]) => ({ maddeler: acc.map((a, i) => ({ id: `t${i}`, k: "guided_response", prompt_de: "Wie geht's?", accepted: a })) });
const GOR = (durum: { can_do: string; accepted: string[] }[]) => ({ durumlar: durum.map((x, i) => ({ id: `g${i}`, prompt_de: "Und Sie?", ...x })) });
const tumCanDo = () => GOR([8, 9, 10, 11, 12, 13, 14].map((n) => ({ can_do: `cd:m1:${n}`, accepted: ["Danke, gut! Hallo!"] })));
const kos = (gunler: GunHam[], o: Partial<KapiGirdi> = {}) =>
  haftaKapisi({ hafta: 2, gunler: gunler.map((data) => ({ file: `gun-${data.day}.json`, data })), tablo, omurga, dizin, dersler, test: TEST([["Hallo!"]]), gorulmemis: tumCanDo(), ...o });

describe("madde çıkarma (biçimden bağımsız)", () => {
  it("accepted (boşluk doldurulur), opts+ans, gerçek yazma; uygun olmayan seçenek atlanır; anlama sorusu kanıtla", () => {
    const m = maddeler({
      a: { de: "Ich ___ müde.", accepted: ["bin"] },
      b: { de: "Ich ___ müde.", opts: ["bist", "bin"], ans: 1 },
      c: { seviye: "gercek", ornek_de: "Ich bin müde.", zorunlu: ["müde"] },
      d: { secenekler: [{ de: "Nein.", uygun: false, accepted: ["Nein."] }] },
      e: { script: [{ id: "c1", de: "Ich komme morgen." }], bolumler: [{ ana_fikir: { q_tr: "Ne zaman?", opts: ["yarın", "bugün"], ans: 0, kanit: ["c1"] } }] },
      f: { metin_de: "Hallo! Heute ist Montag.", sorular: [{ q_tr: "Hangi gün?", opts: ["pazartesi"], ans: 0, kanit: [1] }] },
      g: { dikte: [{ seviye: "kolay", q_tr: "Hangisini duydun?", opts: ["Bus", "Zug"], ans: 1 }] },
      h: [{ id: "g1", de: "Bratwurst", dogru_img: "sausage" }],
      i: { yazma: { ornek_de: "Ich heiße Ayla.", zorunlu: ["heiße"] } },
      j: { dugumler: [{ id: "n1", de: "Wie heißen Sie?", secenekler: [{ de: "Ich heiße …", accepted: ["Ich heiße Ayla."] }] }] },
      k: { sahne: { satirlar: [{ r: "x", de: "Mit Senf?" }], soru: { q_tr: "Ne?", opts: ["hardallı"], ans: 0 } } }
    }, "x");
    expect(m.map((x) => [x.secenekler, !!x.anlama, x.soru ?? null])).toEqual([
      [["Ich bin müde."], false, null], [["Ich bin müde."], false, null], [["Ich bin müde."], false, null], [["Ich komme morgen."], true, null],
      [["Heute ist Montag."], true, null], [["Zug"], false, null], [["Bratwurst"], false, null], [["Ich heiße Ayla."], false, null],
      [["Ich heiße Ayla."], false, "Wie heißen Sie?"], [["Mit Senf?"], true, null]
    ]);
  });
});

describe("hafta kapısı: 2. hafta (önceki hafta öğretilmiş)", () => {
  it("düzgün hafta GEÇTİ; 1. haftanın kartı ve kendi gününün kartı bilinir", () => {
    const k = T.get(8)!.find((x) => x === "lx:Zeit")!;
    const r = kos(hafta2((gs) => { (gs[0]!.halkalar as { gorev_cumleleri: Gorev[] }[])[0]!.gorev_cumleleri = [{ kart: k, de: "Hallo, Zeit!", accepted: ["Hallo, Zeit!"] }]; }));
    expect(r.nedenler).toEqual([]);
    expect(r.gecti).toBe(true);
    expect(kapiRaporu(r)).toContain("GEÇTİ");
  });
  it("sonraki haftanın kartı: öğretilmeden istenen (kesin); kabul listesinde bilinen seçenek varsa geçer", () => {
    const sonraki = `Hallo, ${H3}!`;
    const r = kos(hafta2((gs) => { gs[0]!.halkalar = [{ id: "h8", kartlar: [], gorev_cumleleri: [g(sonraki)] }]; }));
    expect(r.ogretilmedenKesin).toBe(1);
    expect(r.adimlar.find((a) => a.sonuc === "kesin")!.eksik).toEqual([H3.toLowerCase()]);
    expect(r.gecti).toBe(false);
    const r2 = kos(hafta2((gs) => { gs[0]!.halkalar = [{ id: "h8", kartlar: [], gorev_cumleleri: [g(sonraki, sonraki, "Hallo!")] }]; }));
    expect(r2.ogretilmedenKesin).toBe(0);
  });
  it("ses: ikinci turdaki üretim ve gün sınavı günün kartını bilir (akis.ts sırası, PM-097 md. 1)", () => {
    const uygun = (k: string) => !dizin.cerceve.has(k) && /^[A-Za-zÄÖÜäöüß]+$/.test(dizin.kartlar.get(k)?.de ?? "") && !GOSTERIM.includes((dizin.kartlar.get(k)?.de ?? "").toLowerCase());
    const gn = [8, 9, 10, 11, 12, 13, 14].find((n) => T.get(n)!.some(uygun))!, k8 = dizin.kartlar.get(T.get(gn)!.find(uygun)!)!.de;
    const ses = { sesler: [{ id: "a1", script: [], bolumler: [{ id: "b1", cevapla: { prompt_de: "Hallo!", accepted: [`Hallo, ${k8}!`] } }] }] };
    const r = kos(hafta2((gs) => Object.assign(gs[gn - 8]!, ses)));
    // "Sen ne derdin?" ikinci turda (son halkadan sonra, PM-097 md. 1): günün kartı bilinir, süzülmez
    expect(r.adimlar.filter((a) => a.sonuc === "suzuldu")).toEqual([]);
    expect(r.ogretilmedenKesin).toBe(0);
    const yazma = { okuma_yazma: { metin_de: "Hallo!", sorular: [], yazma: { ornek_de: `Hallo, ${k8}!` } } };
    expect(kos(hafta2((gs) => Object.assign(gs[gn - 8]!, ses, yazma))).ogretilmedenKesin).toBe(0);   // okuma halkalardan sonra
    const r2 = kos(hafta2((gs) => Object.assign(gs[gn - 8]!, { gun_sinavi: { maddeler: [{ id: "s1", prompt_de: "Hallo!", accepted: [`Hallo, ${k8}!`] }] } })));
    expect(r2.ogretilmedenKesin).toBe(0);
  });
  it("ses ikinci turu (PM-097 md. 1): dikte ve 'Sen ne derdin?' son halkadan sonra, günün kartlarıyla", () => {
    const uygun = (k: string) => !dizin.cerceve.has(k) && /^[A-Za-zÄÖÜäöüß]+$/.test(dizin.kartlar.get(k)?.de ?? "") && !GOSTERIM.includes((dizin.kartlar.get(k)?.de ?? "").toLowerCase());
    const gn = [8, 9, 10, 11, 12, 13, 14].find((n) => T.get(n)!.some(uygun))!, k8 = dizin.kartlar.get(T.get(gn)!.find(uygun)!)!.de;
    const ses = { sesler: [{ id: "a1", script: [{ id: "c1", de: `Hallo, ${k8}!` }], bolumler: [{ id: "b1", ana_fikir: { q_tr: "?", opts: ["a"], ans: 0, kanit: ["c1"] }, dikte: [{ id: "d1", seviye: "zor", accepted: [`Hallo, ${k8}!`] }] }] }] };
    const r = kos(hafta2((gs) => Object.assign(gs[gn - 8]!, ses)));
    expect(r.adimlar.filter((a) => a.gun === gn && a.yer.includes("sesler")).map((a) => [a.yer.replace(/^.*\//, ""), a.sonuc])).toEqual([["ana_fikir", "anlama"], ["dikte[d1]", "tamam"]]);
  });
  it("medya maddesinin cevabı biliniyor, sorusu bilinmiyorsa süzülmez: öğretilmeden istenen (inceleme 7088959856 P1-6)", () => {
    const ses = { sesler: [{ id: "a1", script: [], bolumler: [{ id: "b1", cevapla: { prompt_de: `Hallo, ${H3}?`, accepted: ["Hallo!"] } }] }] };
    const r = kos(hafta2((gs) => Object.assign(gs[0]!, ses)));
    expect(r.adimlar.filter((a) => a.sonuc === "kesin").map((a) => a.eksik)).toEqual([[`soru:${H3.toLowerCase()}`]]);
    expect(r.suzulen).toBe(0);
  });
  it("önceki haftanın çerçeve biçimi: o haftanın 7 günü daldaysa sınanır, bir günü eksikse sınanmaz (P1-2)", () => {
    const t = structuredClone(tablo); t.haftalar = [{ no: 2, cerceve: ["lx:kein"] }];
    const g15 = (): GunHam => gun(15, [g("Hallo, keinem heute!")]);
    const k3 = (gs: GunHam[]) => haftaKapisi({ hafta: 3, gunler: gs.map((data) => ({ file: `gun-${data.day}.json`, data })), tablo: t, omurga, dizin, dersler, test: TEST([["Hallo!"]]), gorulmemis: GOR([]) });
    const tam = [...hafta2(), g15()];
    expect(k3(tam).adimlar.filter((a) => a.gun === 15 && a.sonuc === "kesin").map((a) => a.eksik)).toEqual([["çerçeve:keinem"]]);
    const eksik = [...hafta2((gs) => gs.splice(3, 1)), g15()];
    expect(k3(eksik).adimlar.filter((a) => a.gun === 15 && a.sonuc === "kesin")).toEqual([]);
  });
  it("karşı tarafın sorusu da anlaşılmalı (ogrenci_akis ile aynı)", () => {
    const r = kos(hafta2((gs) => Object.assign(gs[0]!, { gun_sinavi: { maddeler: [{ id: "s1", prompt_de: `Hallo, ${H3}?`, accepted: ["Hallo!"] }] } })));
    expect(r.adimlar.find((a) => a.sonuc === "kesin")!.eksik).toEqual([`soru:${H3.toLowerCase()}`]);
  });
  it("aynı haftanın sonraki gününün kartı önceki günde kesin; tablo sırası değil dosya sırası geçerli", () => {
    const k9 = T.get(9)![0]!; const l = dizin.kartlar.get(k9)!;
    const r = kos(hafta2((gs) => { (gs[0]!.halkalar as { gorev_cumleleri: Gorev[] }[])[0]!.gorev_cumleleri = [g(`Hallo, ${l.de}!`)]; }));
    expect(r.ogretilmedenKesin).toBe(1);
  });
  it("hafta sonu testi ≥ %80 şart; haftanın sonundaki bilgiyle", () => {
    const k14 = dizin.kartlar.get(T.get(14)![0]!)!.de;
    expect(kos(hafta2(), { test: TEST([["Hallo!"], ["Hallo!"], ["Hallo!"], ["Hallo!"], [`Hallo, ${H3}!`]]) }).test).toMatchObject({ toplam: 5, dogru: 4, oran: 0.8 });
    expect(kos(hafta2(), { test: TEST([["Hallo!"], ["Hallo!"], ["Hallo!"], ["Hallo!"], [`Hallo, ${H3}!`]]) }).nedenler).toEqual([]);
    const r = kos(hafta2(), { test: TEST([["Hallo!"], ["Hallo!"], ["Hallo!"], ["Morgen, Ampel!"], ["Hallo, Ampel!"]]) });
    expect(r.nedenler).toContain("hafta sonu testi %60 < %80");
    expect(kos(hafta2(), { test: TEST([[`Hallo, ${k14}!`]]) }).test!.dogru).toBe(1);
    expect(kos(hafta2(), { test: undefined }).nedenler).toContain("hafta sonu testi yok (hafta-sonu-testi-02.json)");
  });
  it("görülmemiş durum: haftada aynen geçen kabul cümlesi sayılmaz; her can_do sınanmalı", () => {
    const gs = hafta2((x) => { (x[0]!.halkalar as { gorev_cumleleri: Gorev[] }[])[0]!.gorev_cumleleri = [g("Danke, gut! Hallo!")]; });
    const r = kos(gs);
    expect(r.gorulmemis!.kurulan).toBe(0);
    expect(r.nedenler).toContain("görülmemiş durum 0/7 kurulabiliyor");
    const r2 = kos(hafta2(), { gorulmemis: GOR([{ can_do: "cd:m1:8", accepted: ["Danke, gut!"] }]) });
    expect(r2.gorulmemis!.kapsanmayanCanDo).toEqual(["cd:m1:10", "cd:m1:11", "cd:m1:12", "cd:m1:13", "cd:m1:14", "cd:m1:9"]);
    expect(kos(hafta2(), { gorulmemis: undefined }).nedenler).toContain("görülmemiş durum dosyası yok (gorulmemis-02.json)");
  });
  it("çerçeve: listedeki biçim gösterilmeden kesin; kalıp satırı gösterir (yalnız o biçimi)", () => {
    const t = structuredClone(tablo); t.haftalar = [{ no: 2, cerceve: ["lx:mit", "lx:kein"] }];
    const r = kos(hafta2((gs) => { (gs[0]!.halkalar as { gorev_cumleleri: Gorev[] }[])[0]!.gorev_cumleleri = [g("Hallo, mit heute!")]; }), { tablo: t });
    expect(r.adimlar.find((a) => a.sonuc === "kesin")!.eksik).toEqual(["çerçeve:mit"]);
    const r2 = kos(hafta2((gs) => { const h = (gs[0]!.halkalar as Record<string, unknown>[])[0]!; h.kaliplar = [{ de: "mit …" }, { de: "kein …" }]; h.gorev_cumleleri = [g("Hallo, mit heute!"), g("Hallo, keinen heute!")]; }), { tablo: t });
    expect(r2.adimlar.filter((a) => a.sonuc !== "tamam").map((a) => a.eksik)).toEqual([["çerçeve:keinen"]]);
  });
  it("gün dosyası eksikse kalır; eksik gün tablodan bilinir sayılır", () => {
    const r = kos(hafta2((gs) => gs.splice(6, 1)));
    expect(r.eksikGunler).toEqual([14]);
    expect(r.nedenler[0]).toBe("gün dosyası yok: 14");
  });
  it("bozuk alan tipleri istisna atmaz", () => {
    const gs = hafta2((x) => { x[0]!.halkalar = "x"; x[1]!.yeni_kartlar = null; (x[2] as Record<string, unknown>).sahne = { bolumler: [{ ana_fikir: { q_tr: "?", opts: 5, kanit: "x" } }] }; });
    expect(() => kos(gs, { test: { maddeler: 3 }, gorulmemis: { durumlar: [null] } })).not.toThrow();
  });
});

describe("komut satırı", () => {
  const cli = (...a: string[]) => spawnSync(process.execPath, ["--experimental-strip-types", "--no-warnings", join(ROOT, "content/tools/hafta-kapisi-kos.ts"), ...a], { encoding: "utf8" });
  /** Yalnız 1. haftanın gün dosyaları: içerik ağacında hangi haftalar olursa olsun aynı sonuç (PM-117 A.1, KAPI-İŞ 7104231689) */
  let hafta1 = "";
  beforeAll(() => {
    hafta1 = mkdtempSync(join(tmpdir(), "dw-kapi-h1-"));
    for (const f of readdirSync(join(ROOT, "content/v2/m1")).filter((x) => /^gun-0[1-7]\.json$/.test(x))) copyFileSync(join(ROOT, "content/v2/m1", f), join(hafta1, f));
  });
  afterAll(() => rmSync(hafta1, { recursive: true, force: true }));
  it("--hafta yoksa çıkış 2; tablo yoksa çıkış 2", () => {
    expect(cli().status).toBe(2);
    expect(cli("--hepsi", "--m1", "/yok-dizin").stderr).toContain("HATA: gün dizini yok: /yok-dizin");
    expect(cli("--hafta", "2", "--tablo", "/yok.json").stderr).toContain("HATA: tablo yok: /yok.json");
  });
  it("--hepsi: 2. hafta ve sonrası gün dosyası yoksa denetlenecek hafta yok, çıkış 0", () => {
    expect(readdirSync(hafta1)).toHaveLength(7);
    const r = cli("--hepsi", "--tablo", join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "--m1", hafta1);
    expect(r.stdout).toContain("denetlenecek hafta yok");
    expect(r.status).toBe(0);
  }, 30000);
  it("dosyası olmayan hafta (gerçek 1. hafta, 3. hafta yok): KALDI, çıkış 1, rapor yazılır", () => {
    const r = cli("--hafta", "3", "--tablo", join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "--m1", hafta1);
    expect(r.status).toBe(1);
    expect(r.stdout).toContain("## Hafta kapısı · 3. hafta (gün 15–21) · KALDI");
    expect(r.stdout).toContain("gün dosyası yok: 15, 16, 17, 18, 19, 20, 21");
  }, 30000);
});
