import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { TemelDers } from "@dw/shared";
import { adimlarDers, altSayisi, dersIleri, dersKonum, hatirlaKabul, hatirlaSecenek, maddeler, DERS_BASLANGIC, TANIT_GRUP } from "./ders.ts";
import { personalizeDeep } from "./persona.ts";
import { drillVerdict } from "../ui/drill.tsx";

const dir = join(import.meta.dirname, "../../../content/v2/temel");
const dersler = readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => TemelDers.parse(JSON.parse(readFileSync(join(dir, f), "utf8"))));
const t = dersler.find((d) => d.id === "r0:01-tage")!;

describe("Temel ders akışı (#58 A5)", () => {
  it("adımlar: önce diyalog (dinle) → tanıt + hatırla → tablo → anla → kur → söyle → dinle → görev; her madde bir kez", () => {
    expect(adimlarDers(t)).toEqual(["diyalog", "tanit", "tablo", "anlama", "kurma", "konusma", "dinleme", "gorev"]);
    const n = maddeler(t, "anlama").length + maddeler(t, "kurma").length + maddeler(t, "konusma").length;
    expect(n).toBe(t.drills.length);
    expect(maddeler(t, "kurma").map((d) => d.k)[0]).toBe("gap");
  });
  it("ilerleme sonda biter; sayaç yalnızca puanlanan adımda artar; uyuşmayan konum baştan", () => {
    let p = { ...DERS_BASLANGIC }, steps = 0;
    while (!p.bitti && steps < 500) {
      const a = adimlarDers(t)[p.s]!;
      p = dersIleri(p, t, a === "tanit" ? (p.k % 2 ? { dogru: 8, toplam: 8 } : undefined) : ["anlama", "kurma", "konusma", "dinleme"].includes(a) ? true : undefined); steps++;
    }
    expect(p.bitti).toBeTruthy();
    expect(p.toplam).toBe(t.drills.length + t.listening.length + 8 * Math.ceil(t.teach.length / 4));
    expect(dersKonum({ s: 99, k: 0, dogru: 0, toplam: 0 }, t)).toEqual(DERS_BASLANGIC);
    expect(altSayisi(t, "tanit")).toBe(Math.ceil(t.teach.length / 4) * 2);
  });
  it("her dersin her üretim maddesinde ilk kabul cevabı doğru sayılıyor (doğru cevap reddi 0)", () => {
    const red: string[] = [];
    for (const d of dersler) for (const m of d.drills) {
      if (m.k === "pick") continue;
      const a = m.accepted[0]!.replace(/\{name\}/g, "Ayşe").replace(/\{[^|}]+\|([^}]+)\}/g, "$1");
      const v = drillVerdict({ ...m, accepted: m.accepted.map((x) => x.replace(/\{name\}/g, "Ayşe").replace(/\{[^|}]+\|([^}]+)\}/g, "$1")) } as typeof m, a);
      if (v.kind !== "correct") red.push(`${m.id}: ${a}`);
    }
    expect(red).toEqual([]);
  });
  it("yanlış cevap doğru sayılmıyor; dönüşümde verilen cümle tekrarı yanlış; rakam kuralı yalnızca yazıda", () => {
    const tr = t.drills.find((d) => d.k === "tr_de")!;
    expect(drillVerdict(tr, "Katze").kind).not.toBe("correct");
    const tf = t.drills.find((d) => d.k === "transform")!;
    if (tf.k === "transform") expect(drillVerdict(tf, tf.from_de).kind).toBe("wrong");
    const num = { id: "x", k: "tr_de" as const, tr: "yirmi", accepted: ["zwanzig"], strictNumberWords: true };
    expect(drillVerdict(num, "20").note).toMatch(/kelimeyle/);
    expect(drillVerdict(num, "20", false).note).toBeUndefined();
  });
  it("inceleme #65: tonlamalı soru kabulde varsa dönüşümde de doğru; {name} öğrencinin adıyla; sayı kelimesi farkı yanlış; rakam kendiliğinden yasak", () => {
    const d24 = dersler.flatMap((d) => d.drills).find((m) => m.id === "r0:08:d24")!;
    expect(drillVerdict(d24, "Du bist müde?").kind).toBe("correct");
    const nm = { id: "n", k: "guided_response" as const, situation_tr: "x", prompt_de: "Wie heißen Sie?", accepted: ["Ich heiße {name}."] };
    expect(drillVerdict(nm, "Ich heiße Ayşe.").kind).toBe("correct");
    const num = { id: "z", k: "tr_de" as const, tr: "Numaram on yedi.", accepted: ["Meine Nummer ist siebzehn."] };
    expect(drillVerdict(num, "Meine Nummer ist sechzehn.").kind).toBe("wrong");
    expect(drillVerdict(num, "Meine Nummer ist 17.").note).toMatch(/kelimeyle/);
    expect(drillVerdict(num, "Meine Nummer ist 17.", false).kind).toBe("correct");
  });
  it("inceleme #65 2. tur: adsız profilde Türkçe harfli, tireli, iki kelimeli adlar her kabul biçiminde doğru", () => {
    const adlar = ["Ayşe", "Çağrı", "İbrahim", "Jean-Luc", "O'Neil", "Gülşah Yıldırım", "Mehmet"];
    const red: string[] = [];
    for (const d of dersler) for (const m of d.drills) {
      if (m.k === "pick" || !m.accepted.some((a) => a.includes("{name}"))) continue;
      const acc = m.accepted.map((x) => x.replace(/\{[^|}]+\|([^}]+)\}/g, "$1"));
      for (const ad of adlar) for (const a of acc) {
        const cevap = a.replace(/\{name\}/g, ad);
        if (drillVerdict({ ...m, accepted: acc } as typeof m, cevap).kind !== "correct") red.push(`${m.id} ${ad}: ${cevap}`);
      }
    }
    expect(red).toEqual([]);
  });
  it("inceleme #65 2. tur: anahtar kelime kümesi bir kabul biçimininkiyle aynıysa karar öğrencide; hiçbiriyle değilse yanlış", () => {
    const d28 = t.drills.find((m) => m.id === "r0:01:d28")!;
    for (const a of ["Donnerstag ist heute.", "Es ist heute Donnerstag.", "Heute Donnerstag."]) expect(drillVerdict(d28, a).kind).not.toBe("wrong");
    expect(drillVerdict(d28, "Heute ist Freitag.").kind).toBe("wrong");
    expect(drillVerdict(d28, "Morgen ist Donnerstag.").kind).toBe("wrong");
    // istem rakamı gösteriyorsa (adres) rakamla cevap yasak değil
    const d29 = dersler.flatMap((d) => d.drills).find((m) => m.id === "r0:03:d29")!;
    expect(drillVerdict(d29, "Ich wohne in der Brunnengasse 7.").kind).toBe("correct");
  });
  it("inceleme #65 2. tur: hatırlama — artikel denetimi, aynı derste öğretilen eşdeğer, ad yuvası", () => {
    const mo = t.teach.find((x) => x.de === "Montag")!;
    const yaz = (tt: typeof t, x: typeof mo) => ({ id: "h", k: "tr_de" as const, tr: x.tr, accepted: hatirlaKabul(tt, x) });
    const art = { de: mo.de, art: mo.art! };
    expect(drillVerdict(yaz(t, mo), "der Montag", true, art).kind).toBe("correct");
    expect(drillVerdict(yaz(t, mo), "Montag", true, art)).toMatchObject({ kind: "wrong", note: expect.stringMatching(/artikel eksik/) });
    expect(drillVerdict(yaz(t, mo), "die Montag", true, art)).toMatchObject({ kind: "wrong", note: expect.stringMatching(/artikel yanlış/) });
    const uhr = dersler.find((d) => d.id === "r0:05-uhrzeit")!;
    const hz = uhr.teach.find((x) => x.de === "halb zehn")!;
    expect(drillVerdict(yaz(uhr, hz), "neun Uhr dreißig").kind).toBe("correct");
    expect(drillVerdict(yaz(uhr, hz), "halb zehn").kind).toBe("correct");
    // adsız profil: kart gösterimde "(adın)"; kabul {name} yuvasıyla
    const p = personalizeDeep(t, {});
    const ad = p.teach.find((x) => x.de.includes("(adın)"))!;
    expect(drillVerdict(yaz(p, ad), "Guten Tag, hier ist Gülşah Yıldırım.").kind).toBe("correct");
  });
  it("inceleme #65 2. tur: hatırlama çeldiricileri (ilk grup dışında) yalnızca gösterilmiş kartlardan, biri ötekinin içinde değil, 3 seçenek", () => {
    const sorun: string[] = [];
    const nk = (s: string) => s.toLocaleLowerCase("tr").split(/[^\p{L}\p{N}:]+/u).filter((w) => w.length >= 3);
    for (const d of dersler) for (let g = 0; g * TANIT_GRUP < d.teach.length; g++) d.teach.slice(g * TANIT_GRUP, (g + 1) * TANIT_GRUP).forEach((x, i) => {
      const s = hatirlaSecenek(d, g, x, i);
      if (s.length !== 3 || !s.includes(x.tr)) sorun.push(`${x.id}: ${s.join(" | ")}`);
      const gosterilen = new Set(d.teach.slice(0, (g + 1) * TANIT_GRUP).map((y) => y.tr));
      const alt = (a: string[], b: string[]) => a.length > 0 && a.every((w) => b.includes(w));
      for (const o of s) if (o !== x.tr && ((!gosterilen.has(o) && g > 0) || alt(nk(o), nk(x.tr)) || alt(nk(x.tr), nk(o)))) sorun.push(`${x.id}: ${o}`);
    });
    expect(sorun).toEqual([]);
  });
});
