/**
 * Dikiş denetçisi (PM-090 md. 2.1; PM 7087835391 md. 2: tablo haftayı sabitler): gerçek 1. gün yeşil; her kural bilerek bozulmuş
 * örnekte kırmızı. Girdi: gerçek sözlük, temel dersler, omurga, gun-01.json; tablo fikstürü fixtures/dikis-tablo.json (#198 1.–21. gün).
 */
import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { acikEsdizimler, dikisDenetle, dilNoktasiMetni, haftaOf, tabloCerceve, tabloGunleri, type DikisGirdi, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { esdizimler } from "../../web/src/core/garden.ts";
import { loadContent, ROOT } from "./load.ts";

const c = loadContent();
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8")));
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const tablo = JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "utf8")) as KesinTablo;
const T = tabloGunleri(tablo);
const omurga = JSON.parse(readFileSync(join(ROOT, "content/v2/curriculum/omurga.json"), "utf8")) as Omurga;
const omDers = (n: number) => omurga.gunler.find((g) => g.day === n)?.dersler ?? [];
const GUN1 = JSON.parse(readFileSync(join(ROOT, "content/v2/m1/gun-01.json"), "utf8")) as GunHam;
const kopya = (): GunHam => structuredClone(GUN1);
/** gun-01'in kabuğuyla n. gün: tablodaki kartlar, omurgadaki dersler, tek halka (görevsiz) */
const sahte = (n: number): GunHam => ({ ...kopya(), day: n, yeni_kartlar: [...T.get(n)!], dersler: [...omDers(n)], halkalar: [{ id: `h${n}`, kartlar: [...T.get(n)!], gorev_cumleleri: [] }] });
const hafta1 = () => [kopya(), ...[2, 3, 4, 5, 6, 7].map(sahte)];
const kos = (gunler: GunHam[], o: Partial<DikisGirdi> = {}) =>
  dikisDenetle({ gunler: gunler.map((data) => ({ file: `gun-${String(data.day).padStart(2, "0")}.json`, data })), tablo, omurga, dizin, dersler, yarim: true, ...o });
const kural = (r: ReturnType<typeof kos>, k: string, gun = 1) => r.ihlaller.filter((i) => i.kural === k && i.gun === gun);
type H = { kartlar: string[]; gorev_cumleleri: { kart: string; de: string; accepted: string[] }[] };
const halka = (g: GunHam, i: number) => (g.halkalar as H[])[i]!;

describe("dikiş denetçisi: gerçek 1. gün", () => {
  it("birleşmiş gun-01.json 0 ihlal; gösterilmiş kalıpla geçen adım satırda yazılı", () => {
    const r = kos([kopya()]);
    expect(r.ihlaller).toEqual([]);
    expect(r.satirlar[0]).toMatchObject({ gun: 1, hafta: 1, durum: "denetlendi", sayi: { a: 0, b: 0, c: 0, d: 0, bicim: 0 } });
    expect(r.satirlar[0]!.not.join(";")).toMatch(/adım gösterilmiş kalıpla/);
  });
  it("tam 1. hafta (gerçek 1. gün + tablodan 2.–7. gün) yarım bayraksız 0 ihlal", () => {
    expect(kos(hafta1(), { yarim: false }).ihlaller).toEqual([]);
  });
  it("1. haftanın halkasız günü atlanır ve hafta kümesi kurulmaz; tum ile denetlenir", () => {
    const g = kopya(); delete g.halkalar;
    const r = kos([g, sahte(2)], { yarim: false });
    expect(r.satirlar[0]).toMatchObject({ durum: "atlandı", neden: "1. hafta, halkasız (eski biçim)" });
    expect(r.satirlar[1]!.not.join(";")).toContain("1. hafta kümesi sayılmadı: eski biçim gün 1");
    expect(kos([g], { tum: true }).satirlar[0]!.durum).toBe("denetlendi");
  });
  it("tablo: 1.–7. gün ogretilmis_sayilan'dan, sonrası gunler[]'den; hafta = ⌈gün/7⌉", () => {
    expect(T.get(1)).toEqual(GUN1.yeni_kartlar);
    expect(T.get(8)).toContain("lx:Zeit");
    expect([haftaOf(1), haftaOf(7), haftaOf(8), haftaOf(14), haftaOf(15)]).toEqual([1, 1, 2, 2, 3]);
  });
  it("açık eşdizim sırası garden.ts ile aynı (bütün sözlükte)", () => {
    for (const l of c.lexemes) expect(acikEsdizimler(l)).toEqual(esdizimler(l).acik.map((x) => x.de));
  });
});

describe("(a) hafta kümesi ve günlük adet", () => {
  it("hafta içinde günler arası yer değiştirme serbest", () => {
    const h = hafta1(); h[1]!.yeni_kartlar = [...(h[1]!.yeni_kartlar as string[]), "lx:Zahl"]; // 3. günün kartı 2. güne
    h[2]!.yeni_kartlar = (h[2]!.yeni_kartlar as string[]).filter((x) => x !== "lx:Zahl");
    if (!T.get(3)!.includes("lx:Zahl")) { const k = T.get(3)![0]!; h[1]!.yeni_kartlar = [...T.get(2)!, k]; h[2]!.yeni_kartlar = T.get(3)!.filter((x) => x !== k); }
    expect(kos(h, { yarim: false }).ihlaller.filter((i) => i.kural === "a")).toEqual([]);
  });
  it("fazla (başka haftanın kartı), iki kez ve eksik kırmızı; eksik hafta düzeyinde", () => {
    const h = hafta1();
    h[0]!.yeni_kartlar = [...GUN1.yeni_kartlar as string[]].filter((x) => x !== "lx:Herr").concat(["lx:Zeit"]);
    h[3]!.yeni_kartlar = [...(h[3]!.yeni_kartlar as string[]), "lx:hallo"];
    const m = kos(h, { yarim: false }).ihlaller.filter((i) => i.kural === "a").map((i) => `${i.gun}: ${i.mesaj}`);
    expect(m).toContain("1: fazla lx:Zeit (2. hafta, 8. gün)");
    expect(m).toContain("4: iki kez lx:hallo (1. ve 4. gün)");
    expect(m).toContain("1: eksik lx:Herr (1. hafta, 1. gün)");
  });
  it("dosyası olmayan gün: yarım değilse eksikler ihlal, yarımsa not", () => {
    const r = kos([kopya()], { yarim: false });
    expect(kural(r, "a").length).toBe([2, 3, 4, 5, 6, 7].reduce((n, g) => n + T.get(g)!.length, 0));
    expect(kural(r, "a")[0]!.mesaj).toMatch(/dosyası olmayan gün: 2, 3, 4, 5, 6, 7$/);
    expect(kos([kopya()]).satirlar[0]!.not.join(";")).toMatch(/1\. hafta yarım/);
  });
  it("günlük adet tablodan ±2'den fazla saparsa kırmızı", () => {
    const g = kopya(); g.yeni_kartlar = (GUN1.yeni_kartlar as string[]).slice(0, 22);
    expect(kural(kos([g]), "a").map((i) => i.mesaj)).toEqual(["22 kart; tabloda 25 (±2)"]);
    const g2 = kopya(); g2.yeni_kartlar = (GUN1.yeni_kartlar as string[]).slice(0, 23);
    expect(kural(kos([g2]), "a")).toEqual([]);
  });
  it("tabloda olmayan gün kırmızı", () => {
    const g = sahte(8); g.day = 40;
    expect(kural(kos([g]), "a", 40).map((i) => i.mesaj)).toContain("tabloda 40. gün yok");
  });
});

describe("(b) tanıtılmadan sorulan kart", () => {
  it("halka görev cümlesinde sonraki haftanın kartı kırmızı ve yeri yazılı", () => {
    const g = kopya(); halka(g, 0).gorev_cumleleri[0]!.de = "Hallo, Zeit!";
    const b = kural(kos([g]), "b");
    expect(b).toHaveLength(1);
    expect(b[0]!.yer).toBe("halka m1:01:h1 lx:hallo");
    expect(b[0]!.mesaj).toContain("lx:Zeit → 2. hafta, 8. gün");
  });
  it("aynı gün: sonraki halkanın kartı önceki halkada kırmızı, kendi halkasında yeşil", () => {
    const g = kopya(); halka(g, 0).gorev_cumleleri[0]!.de = "Hallo, Freitag!";
    expect(kural(kos([g]), "b").map((i) => i.mesaj.slice(0, 32))).toEqual(['"freitag" tanıtılmadan soruluyor']);
    const g2 = kopya(); halka(g2, 2).gorev_cumleleri[0]!.de = "Hallo, Freitag!";
    expect(kural(kos([g2]), "b")).toEqual([]);
  });
  it("halka yalnız yeni_kartlar içindeki kartını tanıtır", () => {
    const g = kopya(); halka(g, 0).kartlar.push("lx:Zeit"); halka(g, 0).gorev_cumleleri[0]!.de = "Hallo, Zeit!";
    expect(kural(kos([g]), "b")).toHaveLength(1);
  });
  it("aynı hafta: önceki günün DOSYASINDAKİ kart bilinir; tablodaki günü önemsiz", () => {
    const g9 = sahte(9); halka(g9, 0).gorev_cumleleri = [{ kart: T.get(9)![0]!, de: "Hallo, Zeit!", accepted: ["Hallo, Zeit!"] }];
    const g8 = sahte(8);
    expect(kural(kos([g8, g9]), "b", 9)).toEqual([]);
    g8.yeni_kartlar = (g8.yeni_kartlar as string[]).filter((x) => x !== "lx:Zeit");
    expect(kural(kos([g8, g9]), "b", 9)).toHaveLength(1);
    expect(kos([g9]).satirlar[0]!.not.join(";")).toContain("dosyası olmayan önceki gün tablodan: 8");
  });
  it("halka dışı adım: gün sınavında ve provada sonraki günün kartı kırmızı; uygun olmayan seçenek sayılmaz", () => {
    const g = kopya();
    const s = (g.gun_sinavi as { maddeler: { accepted: string[] }[] }).maddeler[0]!; s.accepted = ["Am Wochenende ist die Praxis lange geschlossen.", ...s.accepted];
    const p = (g.prova as { dugumler: { secenekler?: { de: string; uygun: boolean; accepted?: string[] }[] }[] }).dugumler[0]!.secenekler!;
    p[0]!.de = "Guten Tag, hier ist {name}. Ich brauche einen Termin.";
    const b = kural(kos([g]), "b");
    expect(b.some((i) => i.yer.startsWith("gün sınavı m1:01:s1") && i.mesaj.includes("lx:lange"))).toBe(true);
    expect(b.some((i) => i.yer === "prova n1" && i.mesaj.includes('"termin"'))).toBe(true);
    const g2 = kopya(); const p2 = (g2.prova as typeof g.prova & { dugumler: { secenekler?: { de: string; uygun: boolean; accepted?: string[] }[] }[] }).dugumler[0]!.secenekler!;
    p2[0]!.de = "Hallo, Zeit!"; p2[0]!.accepted = ["Hallo, Zeit!"]; p2[0]!.uygun = false;
    expect(kural(kos([g2]), "b")).toEqual([]);
  });
  it("gösterilmiş kalıp yalnız BÜTÜN olarak örter: 'Schönes Wochenende!' yeşil, 'Hallo, schönes!' kırmızı", () => {
    const g = kopya(); halka(g, 3).gorev_cumleleri[0]!.de = "Schönes Wochenende!";
    expect(kural(kos([g]), "b")).toEqual([]);
    const g2 = kopya(); halka(g2, 3).gorev_cumleleri[0]!.de = "Hallo, schönes!";
    expect(kural(kos([g2]), "b").map((i) => i.mesaj.slice(0, 9))).toEqual(['"schönes"']);
  });
});

describe("(b) kalıp örtüsü konuma göre (inceleme #199 2. tur takibi)", () => {
  it("kalıbın kapsadığı geçiş örtülür, aynı sözcüğün kalıp dışındaki geçişi kırmızı", () => {
    const g = kopya(); halka(g, 3).gorev_cumleleri[0]!.de = "Schönes Wochenende! Hallo, schönes!";
    expect(kural(kos([g]), "b").map((i) => i.mesaj.slice(0, 9))).toEqual(['"schönes"']);
    const g2 = kopya(); halka(g2, 3).gorev_cumleleri[0]!.de = "Schönes Wochenende! Schönes Wochenende!";
    expect(kural(kos([g2]), "b")).toEqual([]);
  });
});

describe("(b, çerçeve) çerçeve sözcüğü gösterilmeden kullanılamaz (PM 7088230583 md. 1)", () => {
  /** tablo + hafta çerçevesi */
  const cTablo = (h: Record<number, string[]>, gun?: { day: number; cerceve: string[] }): KesinTablo => {
    const t = structuredClone(tablo);
    t.haftalar = Object.entries(h).map(([no, cerceve]) => ({ no: Number(no), cerceve }));
    if (gun) t.gunler = t.gunler.map((x) => (x.day === gun.day ? { ...x, cerceve: gun.cerceve } : x));
    return t;
  };
  const ckos = (gunler: GunHam[], t: KesinTablo, o: Partial<DikisGirdi> = {}) => kos(gunler, { tablo: t, ...o });
  const cer = (r: ReturnType<typeof kos>, gun: number) => kural(r, "b", gun).filter((i) => i.mesaj.includes("çerçeve sözcüğü"));
  const g8 = (de: string, h: Record<string, unknown> = {}): GunHam => {
    const g = sahte(8); (g.halkalar as Record<string, unknown>[])[0] = { ...(g.halkalar as Record<string, unknown>[])[0], gorev_cumleleri: [{ kart: T.get(8)![0]!, de, accepted: [de] }], ...h };
    return g;
  };
  it("tabloCerceve: haftalar[].cerceve ∪ gunler[].cerceve (gün → haftası)", () => {
    expect([...tabloCerceve(cTablo({ 2: ["lx:mit"] }, { day: 16, cerceve: ["weil"] }))]).toEqual([[2, ["lx:mit"]], [3, ["weil"]]]);
    expect(tabloCerceve(tablo).size).toBe(0);
  });
  it("kendi haftasında gösterilmeden kullanılan çerçeve sözcüğü kırmızı; liste yoksa kural kapalı", () => {
    const r = cer(ckos([g8("Hallo, mit Zeit!")], cTablo({ 2: ["lx:mit"] })), 8);
    expect(r).toHaveLength(1);
    expect(r[0]!.yer).toMatch(/^halka h8 /);
    expect(r[0]!.mesaj).toMatch(/^"mit" çerçeve sözcüğü \(lx:mit → 2\. hafta\) biçimi kalıpta, tanıtımda ya da dil noktası tablosunda gösterilmeden kullanılıyor/);
    expect(cer(kos([g8("Hallo, mit Zeit!")]), 8)).toEqual([]);
  });
  it("yalın sözcük girdisi sözlükteki çerçeve kimliğine çözülür", () => {
    expect(cer(ckos([g8("Hallo, mit Zeit!")], cTablo({ 2: ["mit"] })), 8)).toHaveLength(1);
  });
  it("halkanın kalıbında gösterilince yeşil; sonraki halkanın kalıbı önceki halkayı örtmez", () => {
    expect(cer(ckos([g8("Hallo, mit Zeit!", { kaliplar: [{ de: "mit …" }] })], cTablo({ 2: ["lx:mit"] })), 8)).toEqual([]);
    const g = g8("Hallo, mit Zeit!"); (g.halkalar as Record<string, unknown>[]).push({ id: "h8b", kartlar: [], gorev_cumleleri: [], kaliplar: [{ de: "mit …" }] });
    expect(cer(ckos([g], cTablo({ 2: ["lx:mit"] })), 8)).toHaveLength(1);
  });
  it("ayrı biçim, ayrı gösterim (PM 7088563328 md. 1): kein gösterildi diye keinen serbest değil; tablodaki bütün biçimler gösterilir", () => {
    expect(cer(ckos([g8("Hallo, keinen Termin!", { kaliplar: [{ de: "Ich habe kein …" }] })], cTablo({ 2: ["lx:kein"] })), 8).map((i) => i.mesaj.slice(0, 8))).toEqual(['"keinen"']);
    expect(cer(ckos([g8("Hallo, kein Termin!", { kaliplar: [{ de: "Ich habe kein …" }] })], cTablo({ 2: ["lx:kein"] })), 8)).toEqual([]);
    const dn = new Map([[omDers(8)[0]!, dilNoktasiMetni({ table: { head: ["", ""], rows: [["Nominativ", "kein"], ["Akkusativ", "keinen"]] } })]]);
    expect(cer(ckos([g8("Hallo, keinen Termin!", { dersten_sonra: true })], cTablo({ 2: ["lx:kein"] }), { dilNoktalari: dn }), 8)).toEqual([]);
  });
  it("önceki günün halka kalıbı ve önceki günün dil noktası gösterir", () => {
    const g9 = (de: string) => { const g = sahte(9); (g.halkalar as Record<string, unknown>[])[0]!.gorev_cumleleri = [{ kart: T.get(9)![0]!, de, accepted: [de] }]; return g; };
    const onceki = sahte(8); (onceki.halkalar as Record<string, unknown>[])[0]!.kaliplar = [{ de: "Ich komme mit …" }];
    expect(cer(ckos([onceki, g9("Hallo, mit Zeit!")], cTablo({ 2: ["lx:mit"] })), 9)).toEqual([]);
    expect(cer(ckos([sahte(8), g9("Hallo, mit Zeit!")], cTablo({ 2: ["lx:mit"] })), 9)).toHaveLength(1);
    const dn = new Map([[omDers(8)[0]!, ["Ich fahre mit dem Bus."]]]);
    expect(cer(ckos([sahte(8), g9("Hallo, mit Zeit!")], cTablo({ 2: ["lx:mit"] }), { dilNoktalari: dn }), 9)).toEqual([]);
  });
  it("aynı günün dil noktası yalnız dersten_sonra halkada ve halka dışı adımda gösterir", () => {
    const dn = new Map([[omDers(8)[0]!, ["Ich fahre mit dem Bus."]]]);
    expect(cer(ckos([g8("Hallo, mit Zeit!")], cTablo({ 2: ["lx:mit"] }), { dilNoktalari: dn }), 8)).toHaveLength(1);
    expect(cer(ckos([g8("Hallo, mit Zeit!", { dersten_sonra: true })], cTablo({ 2: ["lx:mit"] }), { dilNoktalari: dn }), 8)).toEqual([]);
  });
  it("dil noktasının açıklaması ve örnekleri gösterim değil (yalnız tablo)", () => {
    const dn = new Map([[omDers(8)[0]!, dilNoktasiMetni({ tr: "Bunu ŞU AN söylersin; 'an' dersin.", ex: [{ de: "an der Tür", tr: "" }] })]]);
    expect(cer(ckos([g8("Hallo, an Zeit!", { dersten_sonra: true })], cTablo({ 2: ["lx:an"] }), { dilNoktalari: dn }), 8)).toHaveLength(1);
  });
  it("metni olmayan dil noktası satırda not; sözlükte olmayan çerçeve kimliği yalın sözcükle denetlenir; kart kimliği tablo hatası", () => {
    const r = ckos([g8("Hallo, mit Zeit!")], cTablo({ 2: ["lx:mit"] }), { dilNoktalari: new Map() });
    expect(r.satirlar.find((x) => x.gun === 8)!.not.join(";")).toMatch(/metni olmayan dil noktası \(çerçeve için hiçbir şey göstermez\): .*gr:/);
    const r2 = ckos([g8("Hallo, zack Zeit!")], cTablo({ 2: ["lx:zack"] }));
    expect(cer(r2, 8).map((i) => i.mesaj.slice(0, 6))).toEqual(['"zack"']);
    expect(r2.satirlar.find((x) => x.gun === 8)!.not.join(";")).toContain('tablo çerçevesi: lx:zack sözlükte yok: "zack" sözcüğüyle denetlendi');
    expect(ckos([sahte(8)], cTablo({ 2: ["lx:Zeit"] })).ihlaller.map((i) => i.mesaj)).toContain("lx:Zeit sözlükte kart (card:false değil); çerçeve listesinde olamaz");
  });
  it("çok okunuşlu biçim: okunuşlardan biri listede yoksa denetlenmez (bilinçli)", () => {
    expect(cer(ckos([g8("Hallo, als Zeit!")], cTablo({ 2: ["lx:als"] })), 8)).toEqual([]);
    expect(cer(ckos([g8("Hallo, als Zeit!")], cTablo({ 2: ["lx:als", "lx:als#2"] })), 8)).toHaveLength(1);
  });
  it("1. hafta tablo öncesidir: 2. haftanın çerçevesini gösterilmeden kullanması ihlal değil, satırda not", () => {
    // gerçek 1. günün içeriğine bağlı değil (#196 1. günün çerçeve biçimlerini kalıplarda gösterdi): 1. günün ilk halkasına
    // 2. haftanın gösterilmemiş çerçeve sözcüğüyle bir görev eklenir; denetlenen tek şey 1. haftanın ölçüsü
    const g = kopya(); const h = halka(g, 0);
    h.gorev_cumleleri = [...h.gorev_cumleleri, { kart: h.kartlar[0]!, de: "Hallo, seit Montag!", accepted: ["Hallo, seit Montag!"] }];
    const r = ckos([g], cTablo({ 2: ["lx:seit"] }));
    expect(cer(r, 1)).toEqual([]);
    expect(r.satirlar[0]!.not.join(";")).toMatch(/1\. hafta \(tablo öncesi, sayılmadı\): \d+ çerçeve biçimi/);
  });
  it("önceki haftanın çerçevesi bilinir; sonraki haftanın çerçevesi kırmızı", () => {
    expect(cer(ckos([g8("Hallo, mit Zeit!")], cTablo({ 1: ["lx:mit"] })), 8)).toEqual([]);
    expect(cer(ckos([g8("Hallo, mit Zeit!")], cTablo({ 3: ["lx:mit"] })), 8)).toHaveLength(1);
  });
  it("kalıp BÜTÜNÜ içinde geçen çerçeve sözcüğü kullanım sayılmaz", () => {
    // "seit gestern": 1. günün kartı lx:gestern'in açık eşdizimi (gösterilmiş kalıp)
    expect(cer(ckos([g8("Hallo, seit gestern!")], cTablo({ 2: ["lx:seit"] })), 8)).toEqual([]);
    expect(cer(ckos([g8("Hallo, seit gestern! Seit Zeit!")], cTablo({ 2: ["lx:seit"] })), 8).map((i) => i.mesaj.slice(0, 6))).toEqual(['"seit"']);
  });
  it("1. haftanın dersinde gösterilmiş sözcük (und) sonraki haftanın listesinde olsa da bilinir", () => {
    expect(cer(ckos([g8("Hallo und Zeit!")], cTablo({ 2: ["lx:und"] })), 8)).toEqual([]);
  });
  it("(a) çerçeve sözcüğü yeni_kartlar'a yazılmaz; hafta kümesinden ve günlük adetten düşer", () => {
    const t = cTablo({ 2: ["lx:mit"] });
    const g = sahte(8); g.yeni_kartlar = [...(g.yeni_kartlar as string[]), "lx:mit"];
    expect(kural(ckos([g], t), "a", 8).map((i) => i.mesaj)).toContain("çerçeve sözcüğü lx:mit yeni_kartlar'a yazılmaz (tabloda 2. haftanın çerçevesi)");
    const t2 = structuredClone(t); t2.gunler = t2.gunler.map((x) => (x.day === 8 ? { ...x, kartlar: [...x.kartlar, "lx:mit"] } : x));
    expect(kural(ckos([sahte(8)], t2), "a", 8)).toEqual([]);
  });
});

describe("(c) dersler = omurga; sonraki haftanın dersi yok", () => {
  it("yanlış ders: eksik ve fazla kırmızı", () => {
    const g = kopya(); g.dersler = ["r0:02-monate"];
    const m = kural(kos([g]), "c").map((i) => i.mesaj);
    expect(m).toContain("eksik r0:01-tage (omurga 1. gün)");
    expect(m).toContain("fazla r0:02-monate (omurgada 2. gün)");
  });
  it("dersler boş bırakılamaz (requires.gramer yerine geçmez, PM-092 md. 5)", () => {
    const g = kopya(); g.dersler = []; (g.requires as { gramer: string[] }).gramer = ["r0:01-tage"];
    expect(kural(kos([g]), "c").map((i) => i.mesaj)).toEqual(["eksik r0:01-tage (omurga 1. gün)"]);
  });
  it("requires.gramer: sonraki haftanın dersi ve omurgada olmayan kimlik kırmızı", () => {
    const g = kopya(); (g.requires as { gramer: string[] }).gramer = ["gr:a1-03:t5", "gr:a1-99:t1"];
    expect(kural(kos([g]), "c").map((i) => `${i.yer}: ${i.mesaj}`)).toEqual(["requires.gramer: gr:a1-99:t1 omurgada yok", "requires.gramer: gr:a1-03:t5 2. haftanın dersi (omurga 8. gün)"]);
  });
});

describe("(d) haftalar arası aynı üretim cümlesi", () => {
  it("2. haftada 1. haftanın üretim cümlesi kırmızı; aynı hafta serbest; kısa cevap sayılmaz", () => {
    const g8 = kopya(); g8.day = 8; g8.yeni_kartlar = [...T.get(8)!]; g8.dersler = [...omDers(8)];
    const d = kural(kos([kopya(), g8]), "d", 8);
    expect(d.length).toBeGreaterThan(0);
    expect(d[0]!.mesaj).toMatch(/^aynı üretim cümlesi 1\. haftada da var \(1\. gün, /);
    expect(d.every((i) => i.mesaj.split(": ").pop()!.split(" ").length >= 3)).toBe(true);
    const g2 = kopya(); g2.day = 2;
    expect(kural(kos([kopya(), g2]), "d", 2)).toEqual([]);
  });
  it("karşı tarafın sorusu (prompt, ses) üretim sayılmaz", () => {
    const yalin = (n: number, id: string): GunHam => ({ day: n, yeni_kartlar: [...T.get(n)!], dersler: [...omDers(n)], halkalar: [{ id: `h${n}`, kartlar: [...T.get(n)!], gorev_cumleleri: [] }],
      gun_sinavi: { maddeler: [{ id, k: "guided_response", prompt_de: "Welcher Tag ist heute?", accepted: ["Montag."] }] } });
    expect(kural(kos([yalin(1, "x"), yalin(8, "y")]), "d", 8)).toEqual([]);
  });
});

describe("sınav günü (PM-101 md. 5, PM-110)", () => {
  // 14. gün sınav günü: tabloda ve omurgada o gün boş (A1'de 55–56 böyle)
  const t2 = structuredClone(tablo); for (const x of t2.gunler as { day: number; kartlar: string[] }[]) if (x.day === 14) x.kartlar = [];
  const o2 = structuredClone(omurga); for (const x of o2.gunler) if (x.day === 14) x.dersler = [];
  const sinavGunu = (ek: Record<string, unknown> = {}): GunHam => ({ day: 14, can_do: { id: "cd:m1:14", tr: "" }, yeni_kartlar: [], dersler: [], sinav: "assess:a1-deneme:1", sinav_bolumler: ["yazma", "konusma"], ...ek });
  it("halkasız, kartsız, dersiz sınav günü ihlal değil; satırda notu", () => {
    const r = kos([sinavGunu()], { tablo: t2, omurga: o2 });
    expect(r.ihlaller.filter((i) => i.gun === 14)).toEqual([]);
    expect(r.satirlar.find((x) => x.gun === 14)!.not).toContain("sınav günü (assess:a1-deneme:1: yazma, konusma)");
  });
  it("halka taşıyan sınav günü biçim ihlali", () => {
    const r = kos([sinavGunu({ halkalar: [{ id: "h", kartlar: [], gorev_cumleleri: [] }] })], { tablo: t2, omurga: o2 });
    expect(kural(r, "bicim", 14).map((i) => i.mesaj)).toEqual(["sınav günü halkasızdır (1 halka)"]);
  });
  it("sınavsız halkasız gün hâlâ ihlal", () => {
    const { sinav: _, sinav_bolumler: __, ...g } = sinavGunu();
    expect(kural(kos([g as GunHam], { tablo: t2, omurga: o2 }), "bicim", 14)).toHaveLength(1);
  });
});

describe("biçim ve sağlamlık", () => {
  it("8. gün ve sonrası halkasız ya da boş halkalı gün kırmızı", () => {
    const g = sahte(8); delete g.halkalar;
    expect(kural(kos([g]), "bicim", 8).map((i) => i.mesaj)).toEqual(["halka biçimi yok (8. günden sonra zorunlu)"]);
    const g2 = sahte(8); g2.halkalar = [];
    expect(kural(kos([g2]), "bicim", 8)).toHaveLength(1);
  });
  it("hiç gün denetlenmezse kırmızı", () => {
    const g = kopya(); delete g.halkalar;
    expect(kos([g]).ihlaller.map((i) => i.mesaj)).toEqual(["hiç gün denetlenmedi"]);
  });
  it("day tamsayı değilse gün sessizce düşmez: kırmızı, dosya adıyla (inceleme #199 2. tur takibi)", () => {
    for (const day of ["8", null, 8.5, 0, undefined]) {
      const r = dikisDenetle({ gunler: [{ file: "content/v2/m1/gun-08.json", data: { ...sahte(8), day } as unknown as GunHam }, { file: "gun-01.json", data: kopya() }], tablo, omurga, dizin, dersler, yarim: true });
      expect(r.ihlaller.filter((i) => i.kural === "bicim").map((i) => `${i.gun} ${i.yer}`)).toEqual(["0 content/v2/m1/gun-08.json"]);
      expect(r.toplam).toBeGreaterThan(0);
    }
  });
  it("dosya adındaki gün day ile tutmazsa ve aynı gün iki dosya varsa kırmızı", () => {
    const r = dikisDenetle({ gunler: [{ file: "content/v2/m1/gun-09.json", data: sahte(8) }], tablo, omurga, dizin, dersler, yarim: true });
    expect(kural(r, "bicim", 8).map((i) => i.mesaj)).toEqual(['dosya adı 9. gün, "day" 8']);
    const r2 = dikisDenetle({ gunler: [{ file: "a/gun-08.json", data: sahte(8) }, { file: "b/gun-08.json", data: sahte(8) }], tablo, omurga, dizin, dersler, yarim: true });
    expect(kural(r2, "bicim", 8).map((i) => i.mesaj)).toEqual(["aynı gün iki dosya: a/gun-08.json, b/gun-08.json (ilki denetlendi)"]);
    expect(r2.satirlar).toHaveLength(1);
    const r3 = dikisDenetle({ gunler: [{ file: "content/v2/m1/gun-01.json", data: kopya() }, { file: "content/v2/m1/gun-03.json", data: sahte(8) }], tablo, omurga, dizin, dersler, yarim: true, sadece: [1] });
    expect(r3.ihlaller.filter((i) => i.kural === "bicim")).toEqual([]);
    expect(r3.satirlar.find((x) => x.gun === 8)!.not).toEqual(['biçim (sayılmadı): dosya adı 3. gün, "day" 8']);
  });
  it("bozuk alan tipleri istisna atmaz", () => {
    const g = sahte(8); g.yeni_kartlar = "lx:Zeit"; g.dersler = null; g.sesler = {}; (g as Record<string, unknown>).requires = 5;
    expect(() => kos([g])).not.toThrow();
  });
});

describe("dil noktası metni", () => {
  it("yalnız tablo hücreleri; örnek ve açıklama gösterim sayılmaz (PM 7088563328 md. 1)", () => {
    const n = c.grammar.find((x) => x.id === "gr:a1-01:t1")!;
    expect(dilNoktasiMetni(n)).toEqual(n.table!.rows.flat());
    expect(dilNoktasiMetni({ tr: "'mit' dersin", ex: [{ de: "mit dem Bus", tr: "" }] })).toEqual([]);
  });
});

describe("komut satırı", () => {
  const cli = (...a: string[]) => spawnSync(process.execPath, ["--experimental-strip-types", "--no-warnings", join(ROOT, "content/tools/dikis-kos.ts"), ...a], { encoding: "utf8" });
  it("tablo yoksa açık hata, çıkış 2", () => {
    const r = cli("--tablo", "/yok/a1-kesin.json");
    expect(r.status).toBe(2);
    expect(r.stderr).toContain("HATA: tablo yok: /yok/a1-kesin.json");
  });
  it("fikstür tabloyla gerçek içerik: 1. gün 0 ihlal, çıkış 0", () => {
    const r = cli("--tablo", join(ROOT, "content/tools/fixtures/dikis-tablo.json"), "--gun", "1");
    expect(r.stdout).toContain("| 1 | 1 | denetlendi | 0 | 0 | 0 | 0 | 0 |");
    expect(r.stdout).toContain("İhlal: 0");
    expect(r.status).toBe(0);
  }, 30000);
});
