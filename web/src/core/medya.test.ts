import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Gun, Lexeme, medyalar } from "@dw/shared";
import { hedefSira, adimlar, aralik, bolumCumleleri, dikteDegerlendir, eksikZorunlu, gecerliKonum, ileri, kartBul, BASLANGIC } from "./medya.ts";

const gun = Gun.parse(JSON.parse(readFileSync(join(import.meta.dirname, "../../../content/tools/fixtures/m1/gun-01.json"), "utf8")));
const [video, ses] = medyalar(gun);

describe("Medya bölüm oynatıcısı (#58 A4, PM-053)", () => {
  it("video, sesler ve köy dizisi aynı arayüzde; video gerçek insan ve 3 bölüm", () => {
    expect(video!.kind).toBe("video");
    expect(video!.bolumler).toHaveLength(3);
    expect(ses!.kind).toBe("ses");
    expect(ses!.bolumler).toHaveLength(1);
  });
  it("her bölümde a–g adımları sırayla", () => {
    expect(adimlar(video!.bolumler[0]!)).toEqual(["dinle", "ana", "ayrinti", "cumle", "dikte", "transkript", "golge", "cevapla"]);
  });
  it("bölümün zaman aralığı hizalamadan gelir (5 dk kayıt → 3 bölüm)", () => {
    const r = video!.bolumler.map((b) => aralik(bolumCumleleri(video!, b))!);
    expect(r[0]!.t0).toBe(0);
    expect(r[2]!.t1).toBeLessThanOrEqual(300);
    expect(r[1]!.t0).toBeGreaterThan(r[0]!.t1 - 0.001);
  });
  it("dikte: kabul edilen yazım doğru; büyük harf/ümlaut farkında doğru + yazımı gösterilir; başka kelime yanlış", () => {
    const d = { id: "d", seviye: "usta" as const, cumle: "s", accepted: ["Übermorgen ist Samstag.", "übermorgen ist samstag", "Übermorgen ist Samstag"] };
    expect(dikteDegerlendir(d, "Übermorgen ist Samstag")).toEqual({ ok: true, beklenen: "Übermorgen ist Samstag." });
    expect(dikteDegerlendir(d, "Uebermorgen ist samstag")).toEqual({ ok: true, yazim: "Übermorgen ist Samstag.", beklenen: "Übermorgen ist Samstag." });
    expect(dikteDegerlendir(d, "übermorgen ist samstag").yazim).toBe("Übermorgen ist Samstag.");
    expect(dikteDegerlendir(d, "Morgen ist Samstag").ok).toBe(false);
    expect(dikteDegerlendir(d, "").ok).toBe(false);
  });
  it("zorunlu kelimeler: tam kelime aranır", () => {
    expect(eksikZorunlu("Heute ist Donnerstag. Morgen ist Freitag.", ["Donnerstag", "Freitag"])).toEqual([]);
    expect(eksikZorunlu("Heute ist Donnerstagabend.", ["Donnerstag"])).toEqual(["Donnerstag"]);
  });
  it("transkript kelimesi karta: büyük/küçük harf ve noktalama", () => {
    const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
    const lex = [L({ id: "lx:morgen", de: "morgen", pos: "adv" }), L({ id: "lx:Morgen", de: "Morgen", pos: "noun", art: "der" }), L({ id: "lx:Termin", de: "Termin", pl: "Termine", pos: "noun", art: "der" })];
    expect(kartBul("Morgen,", lex)!.id).toBe("lx:Morgen");
    expect(kartBul("morgen", lex)!.id).toBe("lx:morgen");
    expect(kartBul("Termine.", lex)!.id).toBe("lx:Termin");
    expect(kartBul("Quatsch", lex)).toBeUndefined();
  });
  it("ilerleme: alt madde → adım → bölüm → bitti", () => {
    const m = video!;
    let p = ileri(BASLANGIC, m, 2);
    expect(p).toMatchObject({ b: 0, s: 0, k: 1 });
    p = ileri(p, m, 2);
    expect(p).toMatchObject({ b: 0, s: 1, k: 0 });
    let q = { ...BASLANGIC, b: 2, s: adimlar(m.bolumler[2]!).length - 1 };
    q = ileri(q, m, 1);
    expect(q.bitti).toBe(true);
  });
  it("iki cümlelik satırda dikte hedefinin sırası", () => {
    expect(hedefSira("Heute ist Donnerstag. Gestern war Mittwoch.", "Gestern war Mittwoch")).toEqual({ sira: 2, toplam: 2 });
    expect(hedefSira("Heute ist Donnerstag.", "Heute ist Donnerstag.")).toBeNull();
  });
  it("kelime kartı: yalnızca uyumlu sözcük türünde ek atılır; düzensiz biçimler (inceleme #60 2. tur P1-A)", () => {
    const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
    const lex = [L({ id: "lx:bis", de: "bis", pos: "prep" }), L({ id: "lx:wir", de: "wir", pos: "pron" }), L({ id: "lx:meinen", de: "meinen", pos: "verb" }),
      L({ id: "lx:mein", de: "mein, meine", pos: "det" }), L({ id: "lx:sein", de: "sein", pos: "verb" }), L({ id: "lx:werden", de: "werden", pos: "verb" }),
      L({ id: "lx:sagen", de: "sagen", pos: "verb" }), L({ id: "lx:Tag", de: "Tag", pl: "Tage", pos: "noun", art: "der" }), L({ id: "lx:wissen", de: "wissen", pos: "verb" }), L({ id: "lx:weiß", de: "weiß", pos: "adj" })];
    expect(kartBul("bist", lex)!.id).toBe("lx:sein");
    expect(kartBul("wirst", lex)!.id).toBe("lx:werden");
    expect(kartBul("meine", lex)!.id).toBe("lx:mein");
    expect(kartBul("weißt", lex)!.id).toBe("lx:wissen");
    expect(kartBul("sagt", lex)!.id).toBe("lx:sagen");
    expect(kartBul("Tagen", lex)!.id).toBe("lx:Tag");
    expect(kartBul("bisschen", lex)).toBeUndefined();
  });
  it("inceleme #66 P1-2: bitiş ilkBitti'yi yazar; 'Baştan çalış' ve geçersiz konum sıfırlaması onu korur", () => {
    const m = video!;
    let p = { ...BASLANGIC };
    for (let k = 0; k < 500 && !p.bitti; k++) p = ileri(p, m, 1);
    expect(p).toMatchObject({ bitti: true, ilkBitti: true });
    const bastan = { ...BASLANGIC, ilkBitti: true };
    expect(gecerliKonum(bastan, m).ilkBitti).toBe(true);
    expect(gecerliKonum({ ...bastan, b: 99 }, m)).toEqual({ ...BASLANGIC, ilkBitti: true });
  });
});

describe("dikteSuz (1. gün öğrenci simülasyonu P0-1)", () => {
  it("cevabında bilinmeyen sözcük geçen dikte basamağı atlanır; öteki basamaklar ve bölümler aynen", async () => {
    const { dikteSuz, dikteCevabi } = await import("./medya.ts");
    const dk = [
      { seviye: "kolay", cumle: "c1", q_tr: "x", opts: ["Freitag", "Montag"], ans: 0 },
      { seviye: "usta", cumle: "c2", accepted: ["Guten Tag."] },
      { seviye: "gercek", gorev_tr: "x", ornek_de: "Danke und schönes Wochenende!", zorunlu: [] }
    ];
    const m = { bolumler: [{ id: "b1", dikte: dk }] } as never;
    expect(dk.map((d) => dikteCevabi(d as never))).toEqual(["Freitag", "Guten Tag.", "Danke und schönes Wochenende!"]);
    const bilinen = new Set(["guten", "tag"]);
    const s = dikteSuz(m, (de) => de.toLowerCase().replace(/[.!?,]/g, "").split(/\s+/).some((w) => !bilinen.has(w)));
    expect((s as { bolumler: { dikte: { seviye: string }[] }[] }).bolumler[0]!.dikte.map((d) => d.seviye)).toEqual(["usta"]);
  });
});
