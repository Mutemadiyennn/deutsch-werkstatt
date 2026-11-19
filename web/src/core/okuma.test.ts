import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { Gun } from "@dw/shared";
import { cumleler, kalipEslesir, kalipliMi, yazmaKontrol } from "./okuma.ts";

const dir = join(import.meta.dirname, "../../../content/v2/m1");
const gunler = readdirSync(dir).filter((f) => /^gun-\d+\.json$/.test(f)).map((f) => Gun.parse(JSON.parse(readFileSync(join(dir, f), "utf8"))));
const yazmalar = gunler.filter((g) => g.okuma_yazma?.yazma).map((g) => ({ day: g.day, y: g.okuma_yazma!.yazma! }));

describe("Okuma ve yazma (#58 A8)", () => {
  it("içerikte okuma ve yazma var", () => {
    expect(gunler.filter((g) => g.okuma_yazma?.tur === "okuma").length).toBeGreaterThan(0);
    expect(yazmalar.length).toBeGreaterThan(0);
  });
  it("kalıp eşleşmesi: yuva 1–4 kelime, noktalama ve harf farkı yok", () => {
    expect(kalipEslesir("Ich habe im August Urlaub.", "Ich habe im ___ Urlaub.")).toBe(true);
    expect(kalipEslesir("ich habe im august urlaub", "Ich habe im ___ Urlaub.")).toBe(true);
    expect(kalipEslesir("Hallo Derya, hier ist Gülşah Yıldırım.", "Hallo ___, hier ist ___.")).toBe(true);
    expect(kalipliMi("Hallo Derya, hier ist Ayşe.", ["Hallo ___,", "hier ist ___."])).toBe(true);
    expect(kalipEslesir("Ich habe Urlaub.", "Ich habe im ___ Urlaub.")).toBe(false);
    expect(kalipEslesir("Mein Geburtstag ist im Mai.", "Ich habe im ___ Urlaub.")).toBe(false);
  });
  it("her yazma görevinin örnek cevabı kontrolden geçiyor (zorunlular tamam, kalıplı cümle var)", () => {
    for (const { day, y } of yazmalar) {
      const r = yazmaKontrol(y.ornek_de.replace(/\{name\}/g, "Ayşe"), y);
      expect(r.eksik, `gün ${day}`).toEqual([]);
      expect(r.tamam, `gün ${day}: ${r.taninmayan.join(" | ")}`).toBe(true);
      expect(y.kontrol_tr.length, `gün ${day}: kontrol listesi`).toBeGreaterThanOrEqual(1);
    }
  });
  it("eksik zorunlu kelime ve kalıba uymayan cümle bildiriliyor", () => {
    const { y } = yazmalar[0]!;
    const r = yazmaKontrol("Hallo! Katze Hund.", y);
    expect(r.eksik.length).toBeGreaterThan(0);
    expect(r.tamam).toBe(false);
    expect(r.taninmayan).toContain("Katze Hund.");
    expect(cumleler("A. B!\nC?")).toEqual(["A.", "B!", "C?"]);
  });
  it("inceleme #70: kalıp cümlenin tamamı; parça kalıp her şeyi tutmaz; kelime sınırı; Türkçe klavye; yuva zorunlu kelimeyi saymaz", () => {
    const { y } = yazmalar.find((x) => x.day === 2)!;
    expect(yazmaKontrol("Hallo Derya, Urlaub Geburtstag nicht gut ich", y).tamam).toBe(false);
    expect(yazmaKontrol("Hallo Urlaub Geburtstag.", y).tamam).toBe(false);
    expect(kalipEslesir("Halloween ist toll.", "Hallo ___!")).toBe(false);
    expect(kalipEslesir("Amerika.", "Am ___.")).toBe(false);
    const r = yazmaKontrol("Hallo Derya, hier ist Ayşe. İch habe im August Urlaub. Mein Geburtstag ist im Mai. Bis morgen!", y);
    expect(r.taninmayan).toEqual([]);
    expect(r.tamam).toBe(true);
  });
  it("inceleme #70: kısaltma ve tarihteki sıra sayısı cümleyi bölmez", () => {
    expect(cumleler("Praxis Dr. Weber: Von Montag bis Freitag. Heute zu.")).toEqual(["Praxis Dr. Weber: Von Montag bis Freitag.", "Heute zu."]);
    expect(cumleler("Mein Geburtstag ist am 3. Mai. Und du?")).toEqual(["Mein Geburtstag ist am 3. Mai.", "Und du?"]);
    expect(cumleler("Ich bin 30. Und du?")).toEqual(["Ich bin 30.", "Und du?"]);
  });
  it("inceleme #70: zorunlu kelimenin çekimli biçimi (kostet ~ kosten)", () => {
    const d4 = yazmalar.find((x) => x.day === 4);
    if (!d4) return;
    const ornek = d4.y.ornek_de.replace(/\{name\}/g, "Ayşe");
    expect(yazmaKontrol(ornek.replace(/kostet/g, "kosten").replace(/Eine Semmel/g, "Zwei Semmeln"), d4.y).eksik).toEqual([]);
  });
});
