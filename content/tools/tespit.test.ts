/**
 * Seviye tespiti havuzu (PM-115 md. 5): şema + çözücü + kurallar. Yalnız fikstür ağacı (`fixtures/tespit/`) ve bellek içi girdi;
 * gerçek içerik ağacına bakmaz (PM-117 A.1: yeni hafta bu testi kırmaz).
 */
import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, cpSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { tespitKaynaklari, tespitDenetle, tespitYukle, tespitPaketi, beceriUyumu, drillUretim, TESPIT_POLITIKA, type GunOzet, type TespitGirdi } from "./tespit.ts";
import { derinSec, type TespitCozulen } from "../../packages/shared/src/tespit.ts";

const FX = join(import.meta.dirname, "fixtures/tespit");
const HAM = JSON.parse(readFileSync(join(FX, "assess/a1-seviye-tespiti.json"), "utf8"));
const K = tespitKaynaklari(FX);
type Ham = typeof HAM;
const denetle = (degis: (h: Ham) => void = () => {}, ek: Partial<TespitGirdi> = {}) => {
  const h = structuredClone(HAM); degis(h);
  return tespitDenetle({ havuz: h, kaynaklar: K.kaynaklar, gunler: K.gunler, denemeler: K.denemeler, ...ek });
};
const madde = (h: Ham, id: string) => h.maddeler.find((m: { ref?: string; yeni?: { id: string } }) => (m.ref ?? m.yeni?.id) === id);
const hataVar = (r: { hata: string[] }, parca: string) => expect(r.hata.join("\n")).toContain(parca);

describe("seviye tespiti havuzu: kaynak dizini", () => {
  it("beş kaynak çözülür: gün sınavı, hafta sonu testi, görülmemiş durum, temel ders alıştırması, deneme", () => {
    expect(K.hata).toEqual([]);
    expect(K.kaynaklar.get("m1:01:s1")).toMatchObject({ kaynak: "gun_sinavi", hafta: 1, uretim: true });
    expect(K.kaynaklar.get("m1:07:t01")).toMatchObject({ kaynak: "hafta_testi", hafta: 1 });
    expect(K.kaynaklar.get("m1:h02:g1")).toMatchObject({ kaynak: "gorulmemis", hafta: 2, tur: "durum", can_do: "cd:m1:08" });
    expect(K.kaynaklar.get("a1d:d1:01")).toMatchObject({ kaynak: "deneme", bolum: "dinleme", deneme: "assess:a1-deneme:1", uretim: false });
    expect(K.kaynaklar.get("r0:02:d01")).toMatchObject({ kaynak: "temel", hafta: null, ders: "r0:02-monate", uretim: true });
    expect(K.kaynaklar.get("r0:02:p01")).toMatchObject({ kaynak: "temel", uretim: false });
    expect(K.gunler.map((g) => g.day)).toEqual([1, 2, 8]);
    expect(K.denemeler.has("assess:a1-deneme:1")).toBe(true);
  });
  it("üretim: seçmeli (pick, şıklı gap) üretim sayılmaz", () => {
    expect(drillUretim({ k: "pick" })).toBe(false);
    expect(drillUretim({ k: "gap", opts: ["a", "b"] })).toBe(false);
    expect(drillUretim({ k: "gap" })).toBe(true);
    for (const k of ["order", "transform", "guided_response", "listen_and_respond", "tr_de"]) expect(drillUretim({ k })).toBe(true);
    expect(K.kaynaklar.get("a1y:y1:01")!.uretim).toBe(true);
  });
  it("hafta sonu testi eski ve yeni adla iki kez varsa yeni ad kazanır, kimlik çakışması yazılmaz", () => {
    const d = mkdtempSync(join(tmpdir(), "tespit-")); cpSync(FX, d, { recursive: true });
    cpSync(join(FX, "m1/hafta-sonu-testi.json"), join(d, "m1/hafta-sonu-testi-01.json"));
    const k = tespitKaynaklari(d);
    expect(k.hata).toEqual([]);
    expect(k.kaynaklar.get("m1:07:t01")!.dosya).toBe("m1/hafta-sonu-testi-01.json");
  });
  it("hafta sonu testi -HH adı: hafta dosya adından (gün numarasından değil)", () => {
    const d = mkdtempSync(join(tmpdir(), "tespit-")); cpSync(FX, d, { recursive: true });
    writeFileSync(join(d, "m1/hafta-sonu-testi-02.json"), JSON.stringify({ id: "m1:hafta-sonu-testi:02", maddeler: [{ id: "m1:14:t01", k: "tr_de", tr: "x", accepted: ["a", "b", "c"] }] }));
    expect(tespitKaynaklari(d).kaynaklar.get("m1:14:t01")).toMatchObject({ kaynak: "hafta_testi", hafta: 2, dosya: "m1/hafta-sonu-testi-02.json" });
  });
  it("iki kaynakta aynı kimlik hata", () => {
    const d = mkdtempSync(join(tmpdir(), "tespit-")); cpSync(FX, d, { recursive: true });
    writeFileSync(join(d, "m1/gorulmemis-01.json"), JSON.stringify({ durumlar: [{ id: "m1:01:s1", accepted: [] }] }));
    expect(tespitKaynaklari(d).hata.join()).toContain("m1:01:s1");
  });
});

describe("seviye tespiti havuzu: kurallar", () => {
  it("fikstür havuzu 0 hata; olmayan haftalar ve eksik günler uyarı", () => {
    const r = denetle();
    expect(r.hata).toEqual([]);
    expect(r.cozulen).toHaveLength(HAM.maddeler.length);
    expect(r.uyari.join("\n")).toContain("A1 haftası 3, 4, 5, 6, 7, 8");
    expect(r.uyari.join("\n")).toContain("1. haftada gün dosyası eksik (3, 4, 5, 6, 7)");
    // görülmemiş durumun can_do'su boş bırakılınca kaynaktan alınır
    expect(r.cozulen.find((x) => x.id === "m1:h02:g1")!.can_do).toEqual(["cd:m1:08"]);
  });
  it("havuz dosyası yoksa yükleyici sessiz (null)", () => {
    const d = mkdtempSync(join(tmpdir(), "tespit-")); mkdirSync(join(d, "m1"));
    expect(tespitYukle(d)).toBeNull();
    expect(tespitYukle(FX)!.hata).toEqual([]);
  });
  it("şema: bilinmeyen alan (kök, madde, yeni gövdesi), yanlış kimlik, ref ile yeni birlikte", () => {
    hataVar(denetle((h) => { h.fazla = 1; }), "fazla");
    hataVar(denetle((h) => { h.maddeler[2].fazla = 1; }), "fazla");
    hataVar(denetle((h) => { h.maddeler[0].yeni.fazla = 1; }), "maddeler.0.yeni.fazla — şemada olmayan alan");
    expect(denetle((h) => { h.id = "assess:a1-tespit:1"; }).hata.length).toBeGreaterThan(0);
    expect(denetle((h) => { h.maddeler[2].yeni = HAM.maddeler[0].yeni; }).hata.length).toBeGreaterThan(0);
    expect(denetle((h) => { h.maddeler[0].yeni.id = "m001"; }).hata.length).toBeGreaterThan(0);
    expect(denetle((h) => { h.maddeler[2].beceri = "kelime"; }).hata.length).toBeGreaterThan(0);
  });
  it("ref çözülmez → hata; aynı madde iki kez (çekirdek dahil) → hata", () => {
    hataVar(denetle((h) => { madde(h, "m1:01:s1").ref = "m1:01:s9"; }), "ref m1:01:s9 çözülmedi");
    hataVar(denetle((h) => { h.maddeler.push({ ...madde(h, "m1:02:s3") }); }), "m1:02:s3 havuzda iki kez");
    hataVar(denetle((h) => { h.maddeler.push({ ref: "a1k:k1:01", hafta: 1, asama: "derin", beceri: "konusma", can_do: ["cd:m1:01"] }); }), "a1k:k1:01 havuzda iki kez");
  });
  it("yeni: D-064 (accepted ≥ 3), audio_de/prompt_de'de ad yer tutucusu yok, kaynak kimliğiyle çakışmaz, OD-9", () => {
    hataVar(denetle((h) => { h.maddeler[0].yeni.prompt_de = "Hallo {Herr|Frau}!"; }), "prompt_de ad yer tutucusu");
    // yer tutucu cevapta serbest
    expect(denetle((h) => { h.maddeler[0].yeni.accepted.push("Ich bin {name}."); }).hata).toEqual([]);
    const od9 = (status: string) => denetle((h) => { h.review.status = status; h.maddeler[0].yeni.situation_tr = "Komşun \"Montag\" diyor."; });
    expect(od9("draft").uyari.join()).toContain("situation_tr OD-9 tırnak");
    expect(od9("draft").hata).toEqual([]);
    expect(od9("reviewed").hata.join()).toContain("situation_tr OD-9 tırnak");
    hataVar(denetle((h) => { h.maddeler[0].yeni.accepted = ["Montag."]; }), "accepted 1 < 3 (D-064)");
    hataVar(denetle((h) => { h.maddeler[0].yeni = { id: "tespit:a1:m001", k: "listen_and_respond", audio_de: "Hallo {name}!", speed: "normal", accepted: ["a", "b", "c"] }; }), "ad yer tutucusu");
    // seçmeli yeni maddede accepted kuralı yok
    expect(denetle((h) => { h.maddeler.push({ yeni: { id: "tespit:a1:m011", k: "pick", q_tr: "?", opts: ["a", "b"], ans: 0 }, hafta: 1, asama: "derin", beceri: "dil", can_do: ["cd:m1:01"] }); }).hata).toEqual([]);
  });
  it("hafta kaynağın haftasıyla aynı; deneme maddesinin haftası da; A1 dışı hafta hata", () => {
    hataVar(denetle((h) => { h.maddeler.push({ yeni: { id: "tespit:a1:m010", k: "tr_de", tr: "x", accepted: ["a", "b", "c"] }, hafta: 9, asama: "derin", beceri: "yazma", can_do: ["cd:m1:01"] }); }), "hafta 9 A1'in dışında (1–8)");
    hataVar(denetle((h) => { madde(h, "m1:08:s2").hafta = 3; }), "hafta 3, kaynağın haftası 2");
    hataVar(denetle((h) => { h.maddeler.push({ ref: "a1k:k1:02", hafta: 1, asama: "derin", beceri: "konusma", can_do: ["cd:m1:01"] }); }), "hafta 1, kaynağın haftası 2");
  });
  it("önce öğret sonra iste: can_do ve dil noktası maddenin haftasından sonra olamaz", () => {
    hataVar(denetle((h) => { madde(h, "m1:01:s1").can_do = ["cd:m1:01", "cd:m1:08"]; }), "cd:m1:08 2. haftada öğretiliyor, madde 1. haftayı");
    hataVar(denetle((h) => { madde(h, "m1:01:s1").dil_noktasi = ["gr:a1-03:t5"]; }), "gr:a1-03:t5 2. haftada öğretiliyor");
  });
  it("can_do: 1–56 dışı, gün dosyasıyla uyuşmayan, görülmemiş durumun kendi can_do'su eksik", () => {
    hataVar(denetle((h) => { madde(h, "m1:08:s1").can_do = ["cd:m1:08", "cd:m1:60"]; }), "cd:m1:60 A1 günü değil");
    const gunler: GunOzet[] = K.gunler.map((g) => (g.day === 1 ? { ...g, can_do: "cd:m1:01x" } : g));
    hataVar(denetle(() => {}, { gunler }), "gün dosyasındaki can_do ile aynı değil");
    hataVar(denetle((h) => { madde(h, "m1:h02:g3").can_do = ["cd:m1:02"]; }), "kaynağın can_do'su cd:m1:08 listede yok");
  });
  it("temel ders alıştırması: dersi A1 günlerinde olmalı, dersin haftasından önce ölçemez", () => {
    const gunler: GunOzet[] = K.gunler.filter((g) => g.day !== 2);
    hataVar(denetle(() => {}, { gunler }), "temel ders r0:02-monate bir A1 gününün dersler'inde yok");
    const sonra: GunOzet[] = K.gunler.map((g) => (g.day === 2 ? { ...g, dersler: g.dersler.filter((d) => d !== "r0:02-monate") } : g.day === 8 ? { ...g, dersler: [...g.dersler, "r0:02-monate"] } : g));
    hataVar(denetle(() => {}, { gunler: sonra }), "temel ders r0:02-monate 2. haftada öğretiliyor, madde 1. haftayı");
  });
  it("dil noktası A1 günlerinin dersler'inde olmalı; can_do ya da dil noktası şart", () => {
    hataVar(denetle((h) => { madde(h, "m1:07:t01").dil_noktasi = ["gr:a1-09:t1"]; }), "gr:a1-09:t1 bir A1 gününün dersler'inde yok");
    hataVar(denetle((h) => { madde(h, "m1:07:t01").dil_noktasi = []; madde(h, "m1:07:t01").can_do = []; }), "ne can_do ne dil noktası var");
  });
  it("beceri ↔ tür uyumu", () => {
    hataVar(denetle((h) => { madde(h, "m1:01:s1").beceri = "konusma"; }), `beceri "konusma" bu madde türüyle ölçülmez (gun_sinavi/tr_de)`);
    hataVar(denetle((h) => { madde(h, "m1:01:s1").beceri = "okuma"; }), `beceri "okuma"`);
    hataVar(denetle((h) => { madde(h, "m1:02:s2").beceri = "dinleme"; }), `beceri "dinleme"`);
    hataVar(denetle((h) => { h.cekirdek.dinleme = ["a1o:o1:01"]; }), `"okuma" bölümünden (beklenen "dinleme")`);
    const k = (deg: object) => ({ kaynak: "deneme" as const, tur: "pick", uretim: false, madde: deg });
    expect(beceriUyumu("dinleme", k({ ses: [] }))).toBeNull();
    expect(beceriUyumu("okuma", k({ metin_de: "x" }))).toBeNull();
    expect(beceriUyumu("okuma", k({ secenekler_de: ["a"] }))).toBeNull();
    expect(beceriUyumu("dil", k({}))).not.toBeNull();
    expect(beceriUyumu("yazma", { kaynak: "gun_sinavi", tur: "gap", uretim: false, madde: {} })).not.toBeNull();
  });
  it("tarama: yalnız görülmemiş durum ya da yeni, üretim", () => {
    hataVar(denetle((h) => { madde(h, "m1:02:s3").asama = "tarama"; }), "tarama maddesi görülmemiş durum ya da yeni madde olmalı (gun_sinavi)");
    hataVar(denetle((h) => { h.maddeler[1].yeni = { id: "tespit:a1:m002", k: "gap", de: "Ich ___.", tr: "x", accepted: ["a", "b", "c"], opts: ["a", "b"] }; h.maddeler[1].beceri = "dil"; }), "tarama maddesi üretim olmalı (gap)");
  });
  it("kapsam: can_do ≥ derin 1 + çıkış 1 üretim maddesi (seçmeli ve tarama sayılmaz)", () => {
    const r = denetle((h) => { h.maddeler = h.maddeler.filter((m: { ref?: string }) => m.ref !== "m1:01:s2" && m.ref !== "m1:07:t01"); });
    hataVar(r, "1. hafta: derin üretim maddesi en az 2 olmalı (derin 1 + çıkış 1); eksik can_do: cd:m1:01 (1)");
    // m1:01:s3 (pick) cd:m1:01'e bağlı ama sayılmaz; tarama maddesi m001 de sayılmaz
    expect(r.hata.join()).not.toContain("cd:m1:02");
  });
  it("kapsam: dil noktası ≥ derin 2 + çıkış 1; muaf dil noktası sayılmaz, uyarı yazılır, bilinmeyen muaf hata", () => {
    const sil = (h: Ham) => { h.maddeler = h.maddeler.filter((m: { ref?: string }) => m.ref !== "m1:08:s2"); };
    hataVar(denetle(sil), "2. hafta: derin üretim maddesi en az 3 olmalı (derin 2 + çıkış 1); eksik dil noktası: gr:a1-03:t5 (2)");
    const muaf = denetle((h) => { h.muaf_dil_noktasi = [{ id: "gr:a1-03:t5", neden_tr: "Fikstür: üretimle ölçülmeyen nokta." }]; });
    expect(muaf.hata).toEqual([]);
    expect(muaf.uyari.join()).toContain("1 dil noktası muaf (gr:a1-03:t5)");
    hataVar(denetle((h) => { h.muaf_dil_noktasi = [{ id: "dn:yok", neden_tr: "Fikstür: olmayan dil noktası." }]; }), "muaf_dil_noktasi: dn:yok");
    expect(denetle((h) => { h.muaf_dil_noktasi = [{ id: "dn:kucuk-sozcukler", neden_tr: "kısa" }]; }).hata.length).toBeGreaterThan(0);
  });
  it("kapsam: haftada 2–3 tarama, en az biri konuşma ya da yazma", () => {
    hataVar(denetle((h) => { madde(h, "m1:h02:g2").asama = "derin"; }), "2. hafta: tarama maddesi 1 (beklenen 2–3)");
    const dort = denetle((h) => { madde(h, "m1:h02:g3").asama = "tarama"; h.maddeler.push({ yeni: { id: "tespit:a1:m009", k: "guided_response", situation_tr: "x", prompt_de: "y", accepted: ["a", "b", "c"] }, hafta: 2, asama: "tarama", beceri: "konusma", can_do: ["cd:m1:08"] }); });
    hataVar(dort, "2. hafta: tarama maddesi 4");
    hataVar(denetle((h) => { h.maddeler[0].beceri = "dil"; h.maddeler[1].beceri = "dil"; }), "1. hafta: tarama maddelerinde konuşma ya da yazma yok");
  });
  it("çıkış yoklaması (P1-1): sayı yetse de derin seçim bütün maddeleri tüketirse hata", () => {
    // m1:02:s3'ün can_do'su kalkınca cd:m1:02'nin iki maddesi kalır (sayı kuralı geçer); ikisi de dil noktası taşıdığı için
    // derin seçim ikisini de sorar → çıkışa madde kalmaz
    const r = denetle((h) => { madde(h, "m1:02:s3").can_do = []; });
    expect(r.hata).toEqual([expect.stringContaining("1. hafta: derin seçimden sonra çıkış yoklamasına en az 1 sorulmamış madde kalmıyor")]);
    expect(r.hata[0]).toContain("cd:m1:02 (0)");
  });
  it("derinSec: belirlenimli, en çok açık hedefi karşılayan önce, kota dolmazsa eksik", () => {
    const c = denetle().cozulen;
    const hd = { can_do: ["cd:m1:01", "cd:m1:02"], dil_noktasi: ["r0:01-tage", "r0:02-monate", "r0:11-praesens"] };
    const a = derinSec(c, hd, TESPIT_POLITIKA.derin), b = derinSec([...c], hd, TESPIT_POLITIKA.derin);
    expect(a.secilen.map((x) => x.id)).toEqual(b.secilen.map((x) => x.id));
    expect(a.secilen.map((x) => x.id)).toEqual(["m1:02:s1", "m1:01:s1", "m1:02:s2", "m1:01:s2"]);
    expect(a.eksik).toEqual([]);
    expect(a.secilen.every((x: TespitCozulen) => x.asama === "derin" && x.uretim)).toBe(true);
    expect(derinSec(c, { can_do: ["cd:m1:01"], dil_noktasi: [] }, { can_do_madde: 9, dil_noktasi_madde: 2 }).eksik).toEqual([{ id: "cd:m1:01", kalan: 6 }]);
  });
  it("sınav günü (sinav alanı) can_do kapsamından düşer; çekirdekle ölçülür", () => {
    const gunler: GunOzet[] = [...K.gunler, { day: 9, level: "A1", can_do: "cd:m1:09", dersler: [], sinav: false }];
    hataVar(denetle(() => {}, { gunler }), "cd:m1:09 (0)");
    expect(denetle(() => {}, { gunler: [...K.gunler, { day: 9, level: "A1", can_do: "cd:m1:09", dersler: [], sinav: true }] }).hata).toEqual([]);
    // A2 günü A1 kapsamına girmez
    expect(denetle(() => {}, { gunler: [...K.gunler, { day: 57, level: "A2", can_do: "cd:m1:57", dersler: ["gr:a2-01:t1"], sinav: false }] }).hata).toEqual([]);
  });
  it("çekirdek: deneme bulunur, dört beceri dolu", () => {
    hataVar(denetle((h) => { h.cekirdek.deneme = "assess:a1-yok:1"; }), "cekirdek.deneme: assess:a1-yok:1 assess/ altında bulunamadı");
    expect(denetle((h) => { h.cekirdek.okuma = []; }).hata.length).toBeGreaterThan(0);
    expect(denetle((h) => { delete h.cekirdek.konusma; }).hata.length).toBeGreaterThan(0);
    hataVar(denetle((h) => { h.cekirdek.yazma = ["m1:01:s1"]; }), "m1:01:s1 assess:a1-deneme:1 denemesinin maddesi değil");
  });
  it("eşikler policy.json'dan: derin kotası, çıkış, tarama aralığı", () => {
    const p1 = structuredClone(TESPIT_POLITIKA); p1.derin.can_do_madde = 3;
    hataVar(denetle(() => {}, { politika: p1 }), "en az 4 olmalı (derin 3 + çıkış 1); eksik can_do");
    const p2 = structuredClone(TESPIT_POLITIKA); p2.derin.dil_noktasi_madde = 3;
    hataVar(denetle(() => {}, { politika: p2 }), "en az 4 olmalı (derin 3 + çıkış 1); eksik dil noktası");
    const p3 = structuredClone(TESPIT_POLITIKA); p3.havuz.cikis_min = 2;
    hataVar(denetle(() => {}, { politika: p3 }), "en az 4 olmalı (derin 2 + çıkış 2); eksik dil noktası");
    hataVar(denetle(() => {}, { politika: p3 }), "çıkış yoklamasına en az 2 sorulmamış madde kalmıyor");
    const p4 = structuredClone(TESPIT_POLITIKA); p4.havuz.tarama_hafta = [3, 3];
    hataVar(denetle(() => {}, { politika: p4 }), "tarama maddesi 2 (beklenen 3–3)");
    expect(TESPIT_POLITIKA.havuz).toEqual({ tarama_hafta: [2, 3], cikis_min: 1 });
    expect(TESPIT_POLITIKA.derin).toEqual({ can_do_madde: 1, dil_noktasi_madde: 2 });
    expect(TESPIT_POLITIKA.karar).toEqual({ a2_genel_min: 0.8, a2_beceri_min: 0.7, a2_hafta_min: 0.6, bastan_genel_alti: 0.4 });
  });
});

describe("seviye tespiti paketi (PR 2) ve motorla birebirlik", () => {
  const ADLAR = new Map([["r0:01-tage", "Günler"], ["gr:a1-03:t5", "Küçük sözcükler"]]);
  it("tespitPaketi: havuz sırası, çekirdek dört beceri, hafta hedefleri ve kartları", async () => {
    const p = tespitPaketi(FX, ADLAR, { "2": { kartlar: ["lx:kesin"] } })!;
    expect(p.maddeler.map((x) => x.id)).toEqual(HAM.maddeler.map((x: { ref?: string; yeni?: { id: string } }) => x.ref ?? x.yeni!.id));
    expect(p.cekirdek.map((x) => [x.beceri, x.asama])).toEqual([["dinleme", "cekirdek"], ["okuma", "cekirdek"], ["yazma", "cekirdek"], ["konusma", "cekirdek"]]);
    expect(p.haftalar.map((h) => [h.hafta, h.can_do.map((c) => c.id), h.dil_noktasi.map((d) => d.id)])).toEqual([
      [1, ["cd:m1:01", "cd:m1:02"], ["r0:01-tage", "r0:02-monate", "r0:11-praesens"]],
      [2, ["cd:m1:08"], ["gr:a1-03:t5", "dn:kucuk-sozcukler"]]
    ]);
    expect(p.haftalar[0]!.dil_noktasi[0]).toEqual({ id: "r0:01-tage", ad_tr: "Günler" });
    expect(p.haftalar[0]!.can_do[0]).toEqual({ id: "cd:m1:01", tr: "Günleri söylerim.", gun: 1 });
    // gün dosyası olmayan gün (2. hafta: 9–14) kartları kesin tablodan; fikstürde 2. gün dosyası var, kesin satırı kullanılmaz
    expect(p.haftalar[0]!.kartlar).not.toContain("lx:kesin");
    const { TespitPaket } = await import("../../packages/shared/src/tespit.ts");
    expect(TespitPaket.safeParse(p).success).toBe(true);
    // hatalı havuz pakete girmez
    const d = mkdtempSync(join(tmpdir(), "tespit-")); cpSync(FX, d, { recursive: true });
    writeFileSync(join(d, "assess/a1-seviye-tespiti.json"), JSON.stringify({ ...HAM, fazla: 1 }));
    expect(tespitPaketi(d, ADLAR)).toBeNull();
  });
  it("motorun derin seçimi doğrulayıcının seçimiyle birebir (aynı derinSec, aynı sıra, aynı hedefler)", async () => {
    const { derinPlani } = await import("../../web/src/core/tespit.ts");
    const p = tespitPaketi(FX, ADLAR)!;
    const r = denetle();
    for (const h of p.haftalar) {
      const gunler = K.gunler.filter((g) => Math.ceil(g.day / 7) === h.hafta && !g.sinav);
      const ilk = new Map<string, number>(); for (const g of K.gunler) for (const x of g.dersler) if (!ilk.has(x)) ilk.set(x, Math.ceil(g.day / 7));
      const hd = { can_do: gunler.map((g) => g.can_do!), dil_noktasi: [...ilk].filter(([, w]) => w === h.hafta).map(([x]) => x) };
      const dogrulayici = derinSec(r.cozulen, hd, TESPIT_POLITIKA.derin).secilen.map((x) => x.id);
      expect(derinPlani(p, [h.hafta]).filter((a) => a.madde).map((a) => a.id)).toEqual(dogrulayici);
      expect(dogrulayici.length).toBeGreaterThan(0);
    }
  });
});
