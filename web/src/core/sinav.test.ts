/**
 * Sınav günü (PM-101 md. 5, PM-110): yol adımı ve deneme puanlaması (yapay zekâsız, saf).
 * Fikstür: content/tools/fixtures/m1/gun-55.json, gun-56.json ve fixtures/assess/e2e-deneme.json (e2e paketiyle aynı).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Deneme, Gun, denemeSorunlari, mesajOlcutleri } from "@dw/shared";
import { bolumlerTr, gunAdimlari, siradaki, sinavBolumleri, yol, type Ilerleme } from "./gun.ts";
import { alanDogru, bolumPuani, denemeSonucu, olcekle, otomatik } from "./deneme.ts";

const oku = (p: string) => JSON.parse(readFileSync(join(import.meta.dirname, "../../../content/tools/fixtures", p), "utf8"));
const g55 = Gun.parse(oku("m1/gun-55.json")), g56 = Gun.parse(oku("m1/gun-56.json"));
const D = Deneme.parse(oku("assess/e2e-deneme.json"));
const ilr = (o: Partial<Ilerleme> = {}): Ilerleme => ({ dersBitti: new Set(), medyaBitti: new Set(), bahceBitti: new Set(), ...o });
const bolum = (id: string) => D.bolumler.find((b) => b.id === id)!;

describe("sınav günü yol adımı", () => {
  it("tek adım 'Deneme sınavı' (Bahçe yok), denemeye gider; günün bölümleri bitmeden gün bitmez", () => {
    const d = gunAdimlari(g55, ilr());
    expect(d.adimlar).toHaveLength(1);
    expect(d.adimlar[0]).toMatchObject({ tur: "sinav", href: "#/sinav/55", title_tr: "Dinleme ve okuma", hazir: true, bitti: false });
    expect(d.bitti).toBe(false);
    // Bahçe bitmiş olsa da gün sınavla biter (eskiden "Kelime tekrarı" günü geçiriyordu; ANA-G 7091382884)
    expect(gunAdimlari(g55, ilr({ bahceBitti: new Set([55]) })).bitti).toBe(false);
    expect(gunAdimlari(g55, ilr({ sinavBitti: new Set(["assess:e2e-deneme:1:dinleme"]) })).bitti).toBe(false);
    expect(gunAdimlari(g55, ilr({ sinavBitti: new Set(["assess:e2e-deneme:1:dinleme", "assess:e2e-deneme:1:okuma"]) })).bitti).toBe(true);
    // 56. günün bölümleri 55'i bitirmez
    expect(gunAdimlari(g55, ilr({ sinavBitti: new Set(["assess:e2e-deneme:1:yazma", "assess:e2e-deneme:1:konusma"]) })).bitti).toBe(false);
  });
  it("deneme pakette yoksa adım hazırlanıyor ve gün bitmez (sınav yapılmadan geçilmez)", () => {
    const d = gunAdimlari(g55, ilr({ denemeler: new Set() }));
    expect(d.adimlar[0]).toMatchObject({ hazir: false }); expect(d.bitti).toBe(false);
    const y = yol([d, gunAdimlari(g56, ilr({ denemeler: new Set() }))]);
    expect(y.simdi!.day).toBe(55); expect(siradaki(y.simdi)).toBeNull();
  });
  it("kalıcı gün bitişi korunur; bölümsüz sınav günü bütün bölümleri ister", () => {
    expect(gunAdimlari(g55, ilr({ gunBitti: new Set([55]) })).bitti).toBe(true);
    const { sinav_bolumler: _, ...g } = g55;
    expect(sinavBolumleri(g)).toEqual(["dinleme", "okuma", "yazma", "konusma"]);
    expect(gunAdimlari(g as Gun, ilr()).adimlar[0]!.title_tr).toBe("Dinleme, okuma, yazma ve konuşma");
    expect(bolumlerTr(["yazma", "konusma"])).toBe("Yazma ve konuşma");
  });
});

describe("deneme puanlaması", () => {
  it("seçmeli: doğru şık madde puanı; bölüm puanı 25 üzerinden, yarıma yuvarlanır", () => {
    const b = bolum("dinleme");
    expect(bolumPuani(b, { "e2d:d1:01": 0, "e2d:d1:02": 1 }, {})).toMatchObject({ ham: 2, puan: 25 });
    expect(bolumPuani(b, { "e2d:d1:01": 0, "e2d:d1:02": 0 }, {})).toMatchObject({ ham: 1, puan: 12.5 });
    expect(bolumPuani(b, {}, {}).puan).toBe(0);
    expect(olcekle(11, { ham_puan: 15, puan: 25 })).toBe(18.5);
  });
  it("form: büyük/küçük harf, umlaut yazımı, numaradaki boşluk sayılmaz; yanlış bilgi 0", () => {
    expect(alanDogru(["Bergstraße 12"], "bergstrasse 12")).toBe(true);
    expect(alanDogru(["0176 23 45 81"], "0176-234581")).toBe(true);
    expect(alanDogru(["0176 23 45 81"], "0176 23 45 82")).toBe(false);
    expect(alanDogru(["Bergstraße 12"], "")).toBe(false);
    const y = bolum("yazma");
    expect(bolumPuani(y, { "e2y:y1:01": { strasse: "Bergstr. 12", telefon: "0000" } }, { "e2y:y2:01": 3 })).toMatchObject({ ham: 4, maddeler: { "e2y:y1:01": 1, "e2y:y2:01": 3 } });
  });
  it("öz-puan madde puanıyla sınırlı; mesaj ve konuşma otomatik değil", () => {
    const k = bolum("konusma");
    expect(k.kisimlar[0]!.maddeler.every((m) => !otomatik(m))).toBe(true);
    expect(bolumPuani(k, {}, { "e2k:k1:01": 5, "e2k:k1:02": -1 }).ham).toBe(1);
  });
  it("geçme: toplam ≥ %60 ve konuşma ≥ %60; konuşmadaki eksik başka bölümle kapatılamaz", () => {
    const m = (x: Record<string, number>) => new Map(Object.entries(x));
    expect(denemeSonucu(D, m({ dinleme: 25, okuma: 25 })).gecti).toBeNull();
    expect(denemeSonucu(D, m({ dinleme: 25, okuma: 25 })).eksik).toEqual(["yazma", "konusma"]);
    expect(denemeSonucu(D, m({ dinleme: 15, okuma: 15, yazma: 15, konusma: 15 }))).toMatchObject({ gecti: true, toplam: 60, zayif: [] });
    const r = denemeSonucu(D, m({ dinleme: 25, okuma: 25, yazma: 25, konusma: 12.5 }));
    expect(r).toMatchObject({ gecti: false, toplam: 87.5, konusma: 12.5, zayif: ["konusma"] });
    expect(denemeSonucu(D, m({ dinleme: 10, okuma: 15, yazma: 15, konusma: 15 })).gecti).toBe(false);
  });
});

describe("mesaj ölçütleri (degerlendirme_tr \"Ad (N puan): …\")", () => {
  it("ölçüt adı ve puanı okunur; puansız satır ölçüt sayılmaz; toplam tutmazsa deneme sorunu", () => {
    expect(mesajOlcutleri({ degerlendirme_tr: ["Görev (6 puan): her madde 2 puan.", "Selam ve kapanış (2 puan): …", "Not: küçük yazım hatası düşürmez.", "Anlaşılırlık (1,5 puan): yarım"] }))
      .toEqual([{ ad: "Görev", puan: 6, tr: "her madde 2 puan." }, { ad: "Selam ve kapanış", puan: 2, tr: "…" }, { ad: "Anlaşılırlık", puan: 1.5, tr: "yarım" }]);
    const bozuk = structuredClone(D);
    const m = bozuk.bolumler.find((b) => b.id === "yazma")!.kisimlar[1]!.maddeler[0]!;
    if (m.k === "mesaj") m.degerlendirme_tr = ["Görev (3 puan): x"];
    expect(denemeSorunlari(bozuk)).toEqual(["e2y:y2:01: ölçüt puanları toplamı ≠ puan 4"]);
  });
});
