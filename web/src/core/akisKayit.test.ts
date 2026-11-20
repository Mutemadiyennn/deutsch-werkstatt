import { describe, expect, it } from "vitest";
import type { Adim, Durak, GunPlani } from "./akis.ts";
import { akisAnahtar, durakAdimlari, eskiAnahtar, ilerle, seansDurumu, simdiki, yeniKayit } from "./akisKayit.ts";

const A = (id: string, kartlar: string[] = ["lx:a"]): Adim => ({ id, tur: "listen_meaning", kip: "duy", kartlar, kaynak: "halka", sn: 12, neden: "" });
const D = (id: string, tur: Durak["tur"], seans: number, adimlar: Adim[], eski?: string): Durak => ({ id, tur, seans, title_tr: id, tahmini_dk: 5, adimlar, neden: "", ...(eski ? { eski_anahtar: eski } : {}) });
const plan: GunPlani = { gun: 1, surum: 1, tohum: "t", toplam_dk: 30, neden: [], gevseme: [], duraklar: [
  D("h1", "halka", 1, [A("h1:1", ["lx:a"]), { ...A("h1:2", ["lx:a", "lx:b", "lx:c", "lx:d"]), tur: "eslestir", kip: "gor" }]),
  D("dil", "dil", 1, [A("dil:1")], "ders:r0:01"),
  D("h2", "halka", 2, [A("h2:1", ["lx:e"])]),
] };

describe("akış kaydı (AK-6, AK-10 4. adım iskeleti)", () => {
  it("anahtar ve başlangıç", () => {
    expect(akisAnahtar(3)).toBe("akis:3");
    const k = yeniKayit(plan);
    expect(simdiki(k)!.adim.id).toBe("h1:1");
  });
  it("halkada yanlış kart durağın sonunda bir kez daha gelir; geri gelen adımın yanlışı yeniden eklenmez", () => {
    let k = yeniKayit(plan);
    k = ilerle(k, [{ kart: "lx:a", dogru: true }]).kayit;
    let r = ilerle(k, [{ kart: "lx:a", dogru: true }, { kart: "lx:b", dogru: false }, { kart: "lx:c", dogru: false }, { kart: "lx:d", dogru: true }]);
    expect(r.yazilacak).toBeNull(); k = r.kayit;
    expect(durakAdimlari(k, plan.duraklar[0]!).map((a) => a.kartlar[0])).toEqual(["lx:a", "lx:a", "lx:b", "lx:c"]);
    expect(simdiki(k)!.adim.kartlar).toEqual(["lx:b"]);
    k = ilerle(k, [{ kart: "lx:b", dogru: false }]).kayit;
    expect(durakAdimlari(k, plan.duraklar[0]!)).toHaveLength(4);
    r = ilerle(k, [{ kart: "lx:c", dogru: true }]);
    expect(r.kayit.durak).toBe(1); expect(r.kayit.biten).toEqual(["h1"]);
    expect(r.yazilacak).toBeNull(); // son halka değil
  });
  it("eski anahtarlar: dil → ders:<id>, son halka → m1:bahce:<gün>; gün sonunda bitti", () => {
    expect(eskiAnahtar(plan, plan.duraklar[2]!)).toBe("m1:bahce:1");
    expect(eskiAnahtar(plan, plan.duraklar[0]!)).toBeNull();
    let k = { ...yeniKayit(plan), durak: 1 };
    let r = ilerle(k, [{ kart: "lx:a", dogru: true }]);
    expect(r.yazilacak).toBe("ders:r0:01"); k = r.kayit;
    r = ilerle(k, [{ kart: "lx:e", dogru: true }]);
    expect(r.yazilacak).toBe("m1:bahce:1"); expect(r.bitti).toBe(true);
    expect(simdiki(r.kayit)).toBeNull();
    expect(seansDurumu(r.kayit)).toEqual([{ seans: 1, biten: 1, toplam: 2 }, { seans: 2, biten: 1, toplam: 1 }]);
  });
});
