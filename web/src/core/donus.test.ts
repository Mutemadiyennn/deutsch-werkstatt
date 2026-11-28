import { describe, expect, it } from "vitest";
import { BOS, donusHedefi, gecis, normal, sekmeAdresi, type Gezinme } from "./donus.ts";
import { sinif } from "../services/gezinme.ts";

/** adres dizisini sırayla gez; döner: son durum */
const gez = (yol: string[], d: Gezinme = BOS): Gezinme => {
  let eski: string | null = null;
  for (const h of yol) { d = gecis(d, eski, h, sinif); eski = h; }
  return d;
};
const hedef = (d: Gezinme, simdi: string, varsayilan: string) => donusHedefi(d, simdi, varsayilan, sinif);

describe("gezinme kuralı (PM-133)", () => {
  it("normal: boş adres Bugün, sondaki / düşer", () => {
    expect(normal("")).toBe("#/today");
    expect(normal("#/")).toBe("#/today");
    expect(normal("#/akis/2/")).toBe("#/akis/2");
  });

  it("kural 3: akıştan X girdiği ekrana döner (Bugün'den girdiyse Bugün, Yol'dan girdiyse Yol)", () => {
    expect(hedef(gez(["#/today", "#/akis/1"]), "#/akis/1", "#/today")).toBe("#/today");
    expect(hedef(gez(["#/yol", "#/akis/1"]), "#/akis/1", "#/today")).toBe("#/yol");
  });

  it("PM-133 gözlemi: akıştan X artık Köy'ün gün listesine düşmez", () => {
    const d = gez(["#/today", "#/akis/1"]);
    expect(hedef(d, "#/akis/1", "#/today")).not.toBe("#/m1/1");
  });

  it("akıştan açılan durak ekranı (ses, prova) akışa döner; akışın girişi korunur (PM-144 md. 1.2)", () => {
    let d = gez(["#/yol", "#/akis/1", "#/m1/1/ses-01/1"]);
    expect(hedef(d, "#/m1/1/ses-01/1", "#/m1/1")).toBe("#/akis/1");
    d = gecis(d, "#/m1/1/ses-01/1", "#/akis/1", sinif);
    expect(d.yigin).toHaveLength(1);
    expect(hedef(d, "#/akis/1", "#/today")).toBe("#/yol");
    d = gez(["#/today", "#/akis/3", "#/prova/3"]);
    expect(hedef(d, "#/prova/3", "#/today")).toBe("#/akis/3");
  });

  it("aynı akış ailesinde ilerleme girişi korur (sınav günü → bölüm, hafta testi → sonuç)", () => {
    const d = gez(["#/yol", "#/hafta/1", "#/hafta/1/sonuc"]);
    expect(hedef(d, "#/hafta/1/sonuc", "#/today")).toBe("#/yol");
    const s = gez(["#/today", "#/sinav/55", "#/sinav/55/dinleme"]);
    expect(hedef(s, "#/sinav/55/dinleme", "#/today")).toBe("#/today");
  });

  it("aile içindeki üst adres korunur (seviye tekrarı → plan/rapor)", () => {
    const d = gez(["#/ben", "#/seviye/rapor", "#/seviye/tekrar/3,5"]);
    expect(hedef(d, "#/seviye/tekrar/3,5", "#/seviye/rapor")).toBe("#/seviye/rapor");
    expect(hedef(d, "#/seviye/tekrar/3,5", "#/today")).toBe("#/ben");
  });

  it("Köy zinciri: kayıt → günün kayıtları → mekân → Köy (geri her adımda bir üst düzey)", () => {
    let d = gez(["#/koy", "#/koy/radyo", "#/m1/2", "#/m1/2/ses-02"]);
    expect(hedef(d, "#/m1/2/ses-02", "#/m1/2")).toBe("#/m1/2");
    d = gecis(d, "#/m1/2/ses-02", "#/m1/2", sinif);
    expect(hedef(d, "#/m1/2", "#/koy")).toBe("#/koy/radyo");
    d = gecis(d, "#/m1/2", "#/koy/radyo", sinif);
    expect(hedef(d, "#/koy/radyo", "#/koy")).toBe("#/koy");
  });

  it("akıştan açılan Rehber geri ile akışa/teste döner, döngü kurmaz", () => {
    let d = gez(["#/today", "#/hafta/1/sonuc", "#/rehber/3"]);
    expect(hedef(d, "#/rehber/3", "#/yol")).toBe("#/hafta/1/sonuc");
    d = gecis(d, "#/rehber/3", "#/hafta/1/sonuc", sinif);
    expect(hedef(d, "#/hafta/1/sonuc", "#/today")).toBe("#/today");
  });

  it("kural 2: sekme değiştiren bağlantıda geri o sekmenin içinde kalır (Ben → Sözlük → geri Kütüphane)", () => {
    const d = gez(["#/ben", "#/sozluk"]);
    expect(hedef(d, "#/sozluk", "#/koy/kutuphane")).toBe("#/koy/kutuphane");
  });

  it("giriş bilinmiyorsa (adresle açılış) ekranın kendi üst adresi", () => {
    const d = gez(["#/akis/4"]);
    expect(hedef(d, "#/akis/4", "#/today")).toBe("#/today");
    expect(hedef(BOS, "#/rehber/1", "#/yol")).toBe("#/yol");
  });

  it("kural 1: alt sekme öbür sekmenin son konumunu açar; etkin sekme köküne", () => {
    let d = gez(["#/koy", "#/koy/radyo", "#/m1/2", "#/ben"]);
    expect(sekmeAdresi(d, "koy", "#/koy", false)).toBe("#/m1/2");
    expect(sekmeAdresi(d, "ben", "#/ben", true)).toBe("#/ben");
    // son konuma dönünce yığını da döner: geri yine mekâna
    d = gecis(d, "#/ben", "#/m1/2", sinif);
    expect(hedef(d, "#/m1/2", "#/koy")).toBe("#/koy/radyo");
  });

  it("akış içinden açılan ekran sekmenin son konumu olmaz", () => {
    const d = gez(["#/yol", "#/rehber/2", "#/yol", "#/hafta/1/sonuc", "#/rehber/3", "#/today"]);
    expect(sekmeAdresi(d, "yol", "#/yol", false)).toBe("#/yol");
  });
});

describe("akıştan ileri geçiş (inceleme #275)", () => {
  it("P1-1a: ölçüm → sonuç; sonucun geri oku yeni ölçüme değil kendi üst adresine", () => {
    const d = gez(["#/ben", "#/ben/ayarlar", "#/assess", "#/assess/result/x1"]);
    expect(hedef(d, "#/assess/result/x1", "#/today")).toBe("#/today");
  });
  it("P1-1b: kurulum → tespit; tespitin X'i kurulumu değil kurulumun girişini açar", () => {
    const d = gez(["#/ben", "#/ben/ayarlar", "#/onboarding", "#/seviye"]);
    expect(hedef(d, "#/seviye", "#/today")).toBe("#/ben/ayarlar");
  });
  it("P1-2: Bugün → kayıt → Güne dön → günün kayıtları; geri bitmiş kayda değil Köy'e", () => {
    const d = gez(["#/today", "#/m1/1/ses-01", "#/m1/1"]);
    expect(hedef(d, "#/m1/1", "#/koy")).toBe("#/koy");
  });
  it("akış günü kendi ekranlarını açar ve onlar akışa döner (Günün kayıtları dahil)", () => {
    const d = gez(["#/yol", "#/akis/1", "#/m1/1"]);
    expect(hedef(d, "#/m1/1", "#/koy")).toBe("#/akis/1");
  });
});
