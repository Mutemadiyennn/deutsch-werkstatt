import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Gun } from "@dw/shared";
import { gunAdimlari, yol, siradaki, xpEkle, seri, XP_BOS } from "./gun.ts";

const g1 = Gun.parse(JSON.parse(readFileSync(join(import.meta.dirname, "../../../content/tools/fixtures/m1/gun-01.json"), "utf8")));
const g2 = { ...g1, id: "m1:gun:02", day: 2, title_tr: "İkinci gün" } as Gun;
const bos = () => ({ dersBitti: new Set<string>(), medyaBitti: new Set<string>(), bahceBitti: new Set<number>(), provaBitti: new Set<number>() });
const basliklar = { "r0:01-tage": "Günler" };

describe("M1 ders yolu (#58 A5b)", () => {
  it("günün 4 seansı sırayla: Bahçe → temel ders → video ve sesler → prova (A7, hazır) + okuma/yazma (A8 gelene kadar hazırlanıyor)", () => {
    const d = gunAdimlari(g1, bos(), basliklar);
    expect(d.adimlar.map((a) => a.seans)).toEqual([1, 2, 3, 3, 3, 4, 4]);
    expect(d.adimlar.find((a) => a.tur === "prova")).toMatchObject({ hazir: true, href: "#/prova/1" });
    expect(d.adimlar.find((a) => a.tur === "okuma")!.hazir).toBe(false);
    expect(d.adimlar.find((a) => a.tur === "ders")!.title_tr).toBe("Günler");
    expect(d.adimlar.every((a) => a.tur !== "medya" || !a.title_tr.startsWith("Köy dizisi"))).toBe(true);
  });
  it("tamamlanan adım yeniden önerilmez; sıradaki adım tek; hazır adımlar bitince gün biter, sonraki gün açılır", () => {
    const ilr = bos();
    let y = yol([gunAdimlari(g1, ilr, basliklar), gunAdimlari(g2, ilr, basliklar)]);
    expect(y.simdi!.day).toBe(1);
    expect(siradaki(y.simdi)!.tur).toBe("bahce");
    expect(y.gunler[1]!.durum).toBe("kilitli");
    ilr.bahceBitti.add(1);
    expect(siradaki(gunAdimlari(g1, ilr, basliklar))!.tur).toBe("ders");
    ilr.dersBitti.add("r0:01-tage");
    for (const m of [g1.video!.id, ...g1.sesler.map((s) => s.id)]) ilr.medyaBitti.add(m);
    // Seans 4 prova bitmeden gün bitmez (A7)
    expect(siradaki(gunAdimlari(g1, ilr, basliklar))!.tur).toBe("prova");
    ilr.provaBitti.add(1);
    y = yol([gunAdimlari(g1, ilr, basliklar), gunAdimlari(g2, ilr, basliklar)]);
    expect(y.gunler[0]!.durum).toBe("bitti");
    expect(y.simdi!.day).toBe(2);
    expect(siradaki(y.simdi)!.tur).toBe("bahce");
  });
  it("pakette olmayan ders 'hazır değil'; günü bekletmez", () => {
    const d = gunAdimlari(g1, bos(), {});
    expect(d.adimlar.find((a) => a.tur === "ders")!.hazir).toBe(false);
  });
  it("XP ve seri: yerel güne göre; bugün çalışılmadıysa dünden sayılır; boşluk seriyi bitirir", () => {
    const d = (s: string) => new Date(`${s}T12:00:00`);
    let x = xpEkle(XP_BOS, 10, d("2026-11-17"));
    x = xpEkle(x, 4, d("2026-11-18"));
    expect(x.toplam).toBe(14);
    expect(seri(x, d("2026-11-18"))).toBe(2);
    expect(seri(x, d("2026-11-19"))).toBe(2);
    expect(seri(x, d("2026-11-20"))).toBe(0);
  });
  it("inceleme #66: Seans 1 kartı kalan yeni kelimeyi söyler; gün bitişi kalıcı (sonradan hazır olan adım günü geri açmaz)", () => {
    const ilr = { ...bos(), tanitilan: new Set(g1.yeni_kartlar.slice(0, 3)) };
    const n = g1.yeni_kartlar.length - 3;
    expect(gunAdimlari(g1, ilr, basliklar).adimlar[0]!.title_tr).toBe(n ? `${n} yeni kelime ve tekrar` : "Kelime tekrarı");
    expect(gunAdimlari(g1, { ...bos(), tanitilan: new Set(g1.yeni_kartlar) }, basliklar).adimlar[0]!.title_tr).toBe("Kelime tekrarı");
    // gün bitti olarak kaydedildiyse, bitmemiş adım olsa da gün bitti
    const kalici = { ...bos(), gunBitti: new Set([1]) };
    const y = yol([gunAdimlari(g1, kalici, basliklar), gunAdimlari(g2, kalici, basliklar)]);
    expect(y.gunler[0]!.durum).toBe("bitti");
    expect(y.simdi!.day).toBe(2);
  });
});
