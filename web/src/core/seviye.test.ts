import { describe, expect, it } from "vitest";
import type { Drill } from "@dw/shared";
import { a2Var, atlananlar, biliniyorKart, dokunulmamis, enErkenZayif, etkinBaslangic, gecilenler, gecti, haftaBasi, hemenTekrar, maddeKartlari, yoklamaSec, yoklamaZayif, type YoklamaTest } from "./seviye.ts";
import { gunKilitli, gunOzeti, yol, yuklenecekHafta } from "./gun.ts";
import { oncekiKume } from "./onceki.ts";
import { isDue, review } from "./srs.ts";

const dinle = (id: string): Drill => ({ id, k: "listen_and_respond", audio_de: "Wann ist der Termin?", speed: "normal", accepted: ["Am Montag.", "Montag."] });
const yaz = (id: string, tr = "Pazartesi"): Drill => ({ id, k: "tr_de", tr, accepted: ["Am Montag ist der Termin.", "Montag."] });
const test = (hafta: number): YoklamaTest => {
  const g = haftaBasi(hafta);
  return {
    hafta,
    maddeler: [yaz(`h${hafta}y1`), dinle(`h${hafta}d1`), dinle(`h${hafta}d2`), yaz(`h${hafta}y2`)],
    beceriler: [
      { gun: g, id: `cd:${g}`, tr: `${g}. günün cümlesi`, maddeler: [`h${hafta}d1`, `h${hafta}d2`, `h${hafta}y1`] },
      { gun: g + 6, id: `cd:${g + 6}`, tr: `${g + 6}. günün cümlesi`, maddeler: [`h${hafta}y2`] }
    ]
  };
};

describe("seviye: başlangıç ve atlanan günler", () => {
  const days = [1, 2, 3, 8, 9, 15, 57, 58];
  it("A2 pakette yoksa başlangıç uygulanmaz", () => {
    expect(etkinBaslangic([1, 2, 3], 57)).toBe(1);
    expect(a2Var([1, 2, 3])).toBe(false);
    expect(a2Var(days)).toBe(true);
    expect(etkinBaslangic(days, 15)).toBe(15);
    // başlangıç haftasında gün yoksa ileri haftaya atlanmaz (inceleme #245 P2-6): 1–7 + 57 paketinde "2. haftadan" → baştan
    expect(etkinBaslangic([1, 2, 3, 4, 5, 6, 7, 57], 8)).toBe(1);
  });
  it("atlanan = başlangıçtan önce, bitmemiş; biten gün atlanmış sayılmaz", () => {
    expect([...atlananlar(days, 57, new Set([1]))]).toEqual([2, 3, 8, 9, 15]);
    expect([...atlananlar(days, 1, new Set())]).toEqual([]);
  });
  it("gün kilidi başlangıca uyar: 57 açık, 58 kilitli; atlanan gün açık", () => {
    const g = gecilenler(new Set(), atlananlar(days, 57, new Set()));
    expect(gunKilitli(57, days, g)).toBe(false);
    expect(gunKilitli(58, days, g)).toBe(true);
    expect(gunKilitli(3, days, g)).toBe(false);
    expect(yuklenecekHafta(days, g)).toBe(9);
    // geri dönüş (başlangıç 1): 8. gün yeniden sıraya girer
    expect(gunKilitli(8, days, gecilenler(new Set(), atlananlar(days, 1, new Set())))).toBe(true);
  });
  it("atlanan gün yolda geçilmiş ama 'tamam' değil", () => {
    const o = gunOzeti(3, "Gün", false, true);
    expect(o.bitti).toBe(true);
    expect(o.atlandi).toBe(true);
    expect(gunOzeti(3, "Gün", true).atlandi).toBeUndefined();
    const y = yol([o, gunOzeti(57, "A2", false)]);
    expect(y.simdi?.day).toBe(57);
  });
});

describe("seviye: yoklama", () => {
  const t = [test(1), test(2), test(9)];
  it("haftada 2 madde: önce dinleme, sonra ayrı günün yazması; A2 haftası girmez", () => {
    const s = yoklamaSec(t);
    expect(s.map((x) => x.d.id)).toEqual(["h1d1", "h1y2", "h2d1", "h2y2"]);
    expect(s.map((x) => x.gun)).toEqual([1, 7, 8, 14]);
  });
  it("8 hafta × 2 = 16 madde", () => {
    expect(yoklamaSec(Array.from({ length: 8 }, (_, i) => test(i + 1))).length).toBe(16);
  });
  it("zayıf cümleler gün sırasıyla, en erken zayıf hafta", () => {
    const s = yoklamaSec(t);
    const yanlis = new Set(["h2y2", "h2d1"]);
    expect(yoklamaZayif(s, yanlis).map((z) => [z.gun, z.dogru, z.toplam])).toEqual([[8, 0, 1], [14, 0, 1]]);
    expect(enErkenZayif(s, yanlis)).toBe(2);
    expect(enErkenZayif(s, new Set())).toBeNull();
  });
  it("geçme oranı policy'den (0.8)", () => {
    expect(gecti(13, 16)).toBe(true);
    expect(gecti(12, 16)).toBe(false);
    expect(gecti(0, 0)).toBe(false);
  });
});

describe("seviye: Bahçe'de 'biliniyor' kartlar", () => {
  const now = new Date("2026-11-23T10:00:00Z");
  it("sayaçlar sıfır, tanıma yolu seyrek vadeli, üretim yolu boş", () => {
    const k = biliniyorKart("lx:Termin", now);
    expect(k.passive.n).toBe(0); expect(k.passive.ok).toBe(0); expect(k.durable).toBe(false); expect(k.firstAt).toBeUndefined();
    expect(k.active.fsrs).toBeUndefined();
    const gun = (Date.parse(k.passive.fsrs!.due) - now.getTime()) / 86400_000;
    expect(gun).toBeGreaterThanOrEqual(21); expect(gun).toBeLessThan(42);
    expect(isDue(k, "passive", now)).toBe(false);
    expect(dokunulmamis(k)).toBe(true);
  });
  it("yanlış maddenin kartı hemen tekrarda; gerçek tekrardan sonra dokunulmuş sayılır", () => {
    const k = hemenTekrar(biliniyorKart("lx:Montag", now), now);
    expect(isDue(k, "passive", now)).toBe(true);
    expect(k.passive.n).toBe(0);
    const r = review(k, { itemId: k.itemId, path: "passive", outcome: "correct", session: "s@1" }, now);
    expect(dokunulmamis(r)).toBe(false);
    expect(r.firstAt?.passive).toBeUndefined();
  });
  it("madde kelimeleri karta eşlenir", () => {
    expect(maddeKartlari(dinle("x"), ["lx:Termin", "lx:Montag", "lx:Dienstag", "lx:Termin#2"])).toEqual(["lx:Termin", "lx:Montag", "lx:Termin#2"]);
  });
});

describe("seviye: K(t) — atlanan gün bilinen sayılır", () => {
  it("dosyalı atlanan günün kartları ve dersleri (kesin tablodan) bilinir", () => {
    const k = oncekiKume({ day: 57, dosyali: [{ day: 1, kartlar: ["lx:Hallo"] }, { day: 2, kartlar: ["lx:Termin"] }], kesin: new Map([[2, { kartlar: ["lx:Termin"], dersler: ["gr:a1-02"] }], [3, { kartlar: ["lx:Arzt"], dersler: [] }]]),
      gorulmus: () => false, bitenDosyali: [], atlanan: new Set([2]) });
    expect([...k.kartlar].sort()).toEqual(["lx:Arzt", "lx:Termin"]);
    expect([...k.dersler]).toEqual(["gr:a1-02"]);
  });
});
