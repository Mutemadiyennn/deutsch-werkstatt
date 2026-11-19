import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { Gun } from "@dw/shared";
import { EN_COK_TEKRAR, beyanSecenegi, dugumBul, eslestir, hazirlikCumleleri, rakamOku, rapor, sonMu, sonrakiDugum, type ProvaT } from "./prova.ts";
import { bilinenKelimeler, personalizeDeep } from "./persona.ts";

const dir = join(import.meta.dirname, "../../../content/v2/m1");
const gunler = readdirSync(dir).filter((f) => /^gun-\d+\.json$/.test(f)).map((f) => Gun.parse(JSON.parse(readFileSync(join(dir, f), "utf8"))));
const provalar = gunler.filter((g) => g.prova).map((g) => ({ day: g.day, ham: g.prova! }));
// uygulamada sözlük yüklenince yapılır: adsız profilde bilinen kelime ad sayılmaz
const lexDir = join(import.meta.dirname, "../../../content/v2/registry/lexicon");
bilinenKelimeler(readdirSync(lexDir).filter((f) => f.endsWith(".json")).flatMap((f) => (JSON.parse(readFileSync(join(lexDir, f), "utf8")).items as { de: string }[]).map((x) => x.de)));
const profiller = [{}, { name: "Ayşe", address: "Frau" as const }, { name: "Jean-Luc", address: "Herr" as const }];

describe("Konuşma provası (#58 A7)", () => {
  it("içerikte prova var", () => { expect(provalar.length).toBeGreaterThan(0); });

  it("her seçeneğin her kabul cevabı o seçenekle eşleşiyor (üç profil; adsız profilde ad cevaptan)", () => {
    const red: string[] = [];
    for (const pr of profiller) for (const { day, ham } of provalar) {
      const p = personalizeDeep(ham, pr) as ProvaT;
      for (const d of p.dugumler) d.secenekler.forEach((s, i) => {
        for (const a of s.accepted.length ? s.accepted : [s.de]) {
          const cevap = a.replace(/\{name\}/g, "Gülşah Yıldırım");
          const e = eslestir(d, cevap);
          // aynı cevap iki seçenekte de kabul ediliyorsa ilk eşleşen seçilir; dal aynı olmalı
          if (e.kind !== "correct" || (e.i !== i && d.secenekler[e.i!]!.sonraki !== s.sonraki)) red.push(`gün ${day} ${d.id}#${i} ${JSON.stringify(pr)}: ${cevap} → ${e.kind} ${e.i}`);
        }
      });
    }
    expect(red).toEqual([]);
  });

  it("dallar tutarlı: her 'sonraki' var, her düğüme ulaşılır, uygun cevaplarla sona varılır (döngü yok)", () => {
    for (const { day, ham } of provalar) {
      const p = ham as ProvaT;
      const ids = new Set(p.dugumler.map((d) => d.id));
      for (const d of p.dugumler) for (const s of d.secenekler) expect(ids.has(s.sonraki), `gün ${day} ${d.id} → ${s.sonraki}`).toBe(true);
      const gorulen = new Set<string>(); const kuyruk = [p.baslangic];
      while (kuyruk.length) { const id = kuyruk.shift()!; if (gorulen.has(id)) continue; gorulen.add(id); for (const s of dugumBul(p, id)?.secenekler ?? []) kuyruk.push(s.sonraki); }
      expect([...ids].filter((x) => !gorulen.has(x)), `gün ${day} ulaşılamayan düğüm`).toEqual([]);
      let id = p.baslangic, adim = 0;
      while (!sonMu(dugumBul(p, id)) && adim < 30) { id = dugumBul(p, id)!.secenekler.find((s) => s.uygun)!.sonraki; adim++; }
      expect(sonMu(dugumBul(p, id)), `gün ${day}: uygun yol sona varmıyor`).toBe(true);
      expect(hazirlikCumleleri(p).length).toBeGreaterThan(0);
    }
  });

  it("karşı taraf cevaba göre tepki verir: uygun olmayan seçenek kendi dalına gider; tanınmayan cevap yanlış", () => {
    const p = personalizeDeep(provalar.find((x) => x.day === 1)!.ham, { name: "Ayşe", address: "Frau" }) as ProvaT;
    const n1 = dugumBul(p, p.baslangic)!;
    const yanlisDal = n1.secenekler.findIndex((s) => !s.uygun);
    if (yanlisDal >= 0) {
      const e = eslestir(n1, n1.secenekler[yanlisDal]!.accepted[0] ?? n1.secenekler[yanlisDal]!.de);
      expect(e).toMatchObject({ kind: "correct", i: yanlisDal });
    }
    expect(eslestir(n1, "Katze Hund Baum").kind).toBe("wrong");
    expect(eslestir(n1, "Katze Hund Baum").best).toBeTruthy();
  });

  it("rapor: 1 iyi şey, en fazla 3 düzeltme, tekrarsız", () => {
    const p = provalar[0]!.ham as ProvaT;
    const n = p.dugumler.find((d) => d.secenekler.some((s) => !s.uygun))!;
    const ui = n.secenekler.findIndex((s) => s.uygun), ki = n.secenekler.findIndex((s) => !s.uygun);
    const kayit = [
      { dugum: n.id, cevap: "x", secenek: ki, uygun: false },
      { dugum: n.id, cevap: "x", secenek: ki, uygun: false },
      { dugum: n.id, cevap: "a", secenek: null, uygun: false, dogrusu: "A" },
      { dugum: n.id, cevap: "b", secenek: null, uygun: false, dogrusu: "B" },
      { dugum: n.id, cevap: "c", secenek: null, uygun: false, dogrusu: "C" },
      { dugum: n.id, cevap: "y", secenek: ui, uygun: true }
    ];
    const r = rapor(p, kayit);
    expect(r.iyi).toBe(n.secenekler[ui]!.geri_bildirim_tr);
    expect(r.duzeltmeler.length).toBe(3);
    expect(r.duzeltmeler[0]).toBe(n.secenekler[ki]!.geri_bildirim_tr);
    expect(new Set(r.duzeltmeler).size).toBe(3);
    expect(rapor(p, []).iyi).toBeTruthy();
  });
  it("inceleme #68 P1-1: olumsuz cevap olumlu dala 'yakın' sayılmaz", () => {
    const p = personalizeDeep(provalar.find((x) => x.day === 1)!.ham, { name: "Ayşe", address: "Frau" }) as ProvaT;
    const n3 = dugumBul(p, "n3")!;
    const e = eslestir(n3, "Nein, Donnerstag geht nicht.", true, p.durum_tr);
    expect(e.kind).toBe("wrong");
    expect(e.i).toBeNull();
  });
  it("inceleme #68 P1-2: adsız profilde bilinen kelime ad sayılmaz", () => {
    const p = personalizeDeep(provalar.find((x) => x.day === 7)!.ham, {}) as ProvaT;
    const n1 = dugumBul(p, "n1")!;
    for (const a of ["Ich bin krank.", "Ich bin Fieber.", "Hier ist die Praxis."]) expect(eslestir(n1, a, true, p.durum_tr).kind, a).not.toBe("correct");
    expect(eslestir(n1, "Guten Tag, hier ist Gülşah Yıldırım.", true, p.durum_tr).kind).toBe("correct");
  });
  it("inceleme #68 P1-3: istemde rakam varsa rakamla cevap yasak değil; sesli numara rakam rakam okunur", () => {
    expect(rakamOku("0171 39200 47")).toBe("null eins sieben eins drei neun zwei null null vier sieben");
    const p3 = personalizeDeep(provalar.find((x) => x.day === 3)!.ham, { name: "Ayşe", address: "Frau" }) as ProvaT;
    const n3 = dugumBul(p3, "n3")!;
    const e = eslestir(n3, "Meine Nummer ist 0171 39200 47.", false, p3.durum_tr);
    expect(e.kind).not.toBe("wrong");
    expect(n3.secenekler[e.i!]!.uygun).toBe(true);
  });
  it("inceleme #68 P1-4: kendine dönen dal en çok EN_COK_TEKRAR kez; sonra uygun dal", () => {
    const p = provalar.find((x) => x.day === 1)!.ham as ProvaT;
    const n3 = dugumBul(p, "n3")!;
    const kotu = n3.secenekler.findIndex((s) => !s.uygun && s.sonraki === "n3");
    const ziyaret = new Map<string, number>([["n3", 1]]);
    let sayi = 0;
    while (sonrakiDugum(n3, kotu, ziyaret) === "n3" && sayi < 10) { ziyaret.set("n3", ziyaret.get("n3")! + 1); sayi++; }
    expect(sayi).toBe(EN_COK_TEKRAR - 1);
    expect(sonrakiDugum(n3, kotu, ziyaret)).toBe(n3.secenekler.find((s) => s.uygun)!.sonraki);
  });
  it("inceleme #68 2. tur: olumsuz cevap beyanla olumlu dala gidemez; en yakın biçimin olumsuzluğu esas", () => {
    const p1 = personalizeDeep(provalar.find((x) => x.day === 1)!.ham, { name: "Ayşe", address: "Frau" }) as ProvaT;
    const n3 = dugumBul(p1, "n3")!;
    const a = "Nein, Donnerstag geht nicht.";
    for (const sesli of [false, true]) expect(beyanSecenegi(n3, eslestir(n3, a, !sesli, p1.durum_tr), a, sesli)).toBeNull();
    const p4 = personalizeDeep(provalar.find((x) => x.day === 4)!.ham, { name: "Ayşe", address: "Frau" }) as ProvaT;
    const n2 = dugumBul(p4, "n2")!;
    for (const x of ["Das geht nicht.", "Das ist zu teuer.", "Nein, das ist zu teuer."]) {
      const e = eslestir(n2, x, true, p4.durum_tr);
      // olumlu "Das geht." dalına ne yakın sayılır ne beyanla gidilir
      const hedef = e.kind === "correct" ? e.i : beyanSecenegi(n2, e, x, false);
      if (hedef !== null) expect(/geht\.|das geht/i.test(n2.secenekler[hedef]!.accepted[0] ?? "") && !/nicht|teuer/i.test(n2.secenekler[hedef]!.accepted[0]!), x).toBe(false);
    }
  });
  it("inceleme #68 2. tur: uygun tekrar isteği (Wie bitte?) döngü sınırına takılmaz", () => {
    const p3 = provalar.find((x) => x.day === 3)!.ham as ProvaT;
    const n3 = dugumBul(p3, "n3")!;
    const wb = n3.secenekler.findIndex((s) => s.uygun && s.sonraki === "n3");
    if (wb >= 0) expect(sonrakiDugum(n3, wb, new Map([["n3", 9]]))).toBe("n3");
  });
});
