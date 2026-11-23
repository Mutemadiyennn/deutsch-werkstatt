import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Gun } from "@dw/shared";
import { akisAcik, akisGunleriOku, bayrakli, gunAdimlari, yol, siradaki, xpEkle, seri, XP_BOS, haftaOf, haftaSonuMu, yolGunleri, yuklenecekHafta, gunKilitli, haftaBitti, gunOzeti, haftalara } from "./gun.ts";

const g1 = Gun.parse(JSON.parse(readFileSync(join(import.meta.dirname, "../../../content/tools/fixtures/m1/gun-01.json"), "utf8")));
const g2 = { ...g1, id: "m1:gun:02", day: 2, title_tr: "İkinci gün" } as Gun;
const bos = () => ({ dersBitti: new Set<string>(), medyaBitti: new Set<string>(), bahceBitti: new Set<number>(), provaBitti: new Set<number>(), okumaBitti: new Set<number>() });
const basliklar = { "r0:01-tage": "Günler" };

describe("M1 ders yolu (#58 A5b)", () => {
  it("günün 4 seansı sırayla: Bahçe → temel ders → video ve sesler → prova (A7) + okuma/yazma (A8)", () => {
    const d = gunAdimlari(g1, bos(), basliklar);
    expect(d.adimlar.map((a) => a.seans)).toEqual([1, 2, 3, 3, 3, 4, 4]);
    expect(d.adimlar.find((a) => a.tur === "prova")).toMatchObject({ hazir: true, href: "#/prova/1" });
    expect(d.adimlar.find((a) => a.tur === "okuma")).toMatchObject({ hazir: true, href: "#/okuma/1" });
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
    expect(siradaki(gunAdimlari(g1, ilr, basliklar))!.tur).toBe("okuma");
    ilr.okumaBitti.add(1);
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
    // sayı ve parçacık gibi kart olmayanlar sayılmaz (inceleme #66 2. tur P1-B)
    const kartlar = new Set(g1.yeni_kartlar.slice(1));
    expect(gunAdimlari(g1, { ...bos(), kartlar }, basliklar).adimlar[0]!.title_tr).toBe(`${g1.yeni_kartlar.length - 1} yeni kelime ve tekrar`);
    // gün bitti olarak kaydedildiyse, bitmemiş adım olsa da gün bitti
    const kalici = { ...bos(), gunBitti: new Set([1]) };
    const y = yol([gunAdimlari(g1, kalici, basliklar), gunAdimlari(g2, kalici, basliklar)]);
    expect(y.gunler[0]!.durum).toBe("bitti");
    expect(y.simdi!.day).toBe(2);
  });
});

describe("AKIS pilot bayrağı (AK-6, 4b)", () => {
  const halka = { id: "m1:01:h1", title_tr: "x", kartlar: ["lx:hallo"], kaliplar: [], gorev_cumleleri: [] };
  it("bayraklı ve halkalı gün akışla açılır; Bahçe ve ders adımları #/akis/<gün>'e, prova/okuma/medya kendi ekranına", () => {
    const g = { ...g1, halkalar: [halka] } as typeof g1;
    expect(akisAcik(g, bos(), [1])).toBe(true);
    const ad = gunAdimlari(g, bos(), {}, [1]).adimlar;
    expect(ad.filter((a) => a.tur === "bahce").every((a) => a.href === "#/akis/1")).toBe(true);
    expect(ad.filter((a) => a.tur !== "bahce").every((a) => !a.href.startsWith("#/akis"))).toBe(true);
  });
  it("bayraksız, halkasız ya da eski düzenle başlanmış gün eski düzende kalır; akış başladıysa akışla biter", () => {
    const g = { ...g1, halkalar: [halka] } as typeof g1;
    expect(akisAcik(g, bos(), [])).toBe(false);
    expect(akisAcik(g1, bos(), [1])).toBe(false);
    const eski = { ...bos(), bahceBitti: new Set([1]) };
    expect(akisAcik(g, eski, [1])).toBe(false);
    expect(gunAdimlari(g, eski, {}, [1]).adimlar[0]!.href).toBe("#/garden/1");
    expect(akisAcik(g, { ...eski, akisBasladi: new Set([1]) }, [1])).toBe(true);
  });
  it('"hepsi": halkası olan her gün akışla açılır, halkasız gün eski düzende; bozuk bayrak değeri akışı açmaz (PM-090 md. 3)', () => {
    const g8 = { ...g1, day: 8, halkalar: [halka] } as typeof g1;
    expect(akisAcik(g8, bos(), "hepsi")).toBe(true);
    expect(akisAcik(g8, bos(), [1])).toBe(false);
    expect(akisAcik({ ...g1, day: 8 } as typeof g1, bos(), "hepsi")).toBe(false);
    expect(gunAdimlari(g8, bos(), {}, "hepsi").adimlar[0]!.href).toBe("#/akis/8");
    // eski düzenle başlanmış gün "hepsi"de de eski düzenle biter
    expect(akisAcik(g8, { ...bos(), bahceBitti: new Set([8]) }, "hepsi")).toBe(false);
    expect(bayrakli(3, "hepsi")).toBe(true);
    expect(bayrakli(3, [1, 2])).toBe(false);
    expect(akisGunleriOku("hepsi")).toBe("hepsi");
    expect(akisGunleriOku([1, 2])).toEqual([1, 2]);
    for (const bozuk of [null, undefined, "tum", 1, [1, "2"], { gunler: [1] }]) expect(akisGunleriOku(bozuk)).toBeNull();
  });
  it("politika dosyasındaki bayrak geçerli bir değer (dizi ya da \"hepsi\")", async () => {
    const P = (await import("../policy.json", { with: { type: "json" } })).default as { akis: { gunler: unknown } };
    expect(akisGunleriOku(P.akis.gunler)).not.toBeNull();
  });
  it("akış günü bitmeden BAŞLA akışa döner, Bahçe bitmiş olsa da; Yol düğümleri kendi ekranında (öğrenci simülasyonu P1-1)", () => {
    const g = { ...g1, halkalar: [halka] } as typeof g1;
    const ilr = { ...bos(), bahceBitti: new Set([1]), akisBasladi: new Set([1]) };
    const basliklar = Object.fromEntries(g1.dersler.map((d) => [d, "Ders"]));
    const d = gunAdimlari(g, ilr, basliklar, [1]);
    const s = siradaki(d)!;
    expect(s.tur).not.toBe("bahce"); expect(s.href).toBe("#/akis/1");
    expect(d.adimlar.filter((x) => x.tur !== "bahce").every((x) => !x.href.startsWith("#/akis"))).toBe(true);
    // gün bitince (akış gün anahtarı) BAŞLA yok; bayraksız günde eski davranış
    const biten = gunAdimlari(g, { ...ilr, gunBitti: new Set([1]) }, basliklar, [1]);
    expect(biten.bitti).toBe(true); expect(biten.akis).toBeUndefined();
    expect(siradaki(gunAdimlari(g, ilr, basliklar, []))!.href.startsWith("#/akis")).toBe(false);
  });
});


describe("çok haftalı yol (PR B-3)", () => {
  const g = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
  it("hafta ⌈gün/7⌉, hafta sonu her 7. gün, gün ≤ 364", () => {
    expect([1, 7, 8, 14, 15, 364].map(haftaOf)).toEqual([1, 1, 2, 2, 3, 52]);
    expect([7, 14, 56].every(haftaSonuMu)).toBe(true);
    expect(haftaSonuMu(8)).toBe(false);
    expect(yolGunleri([3, 1, 365, 2, 2, 0])).toEqual([1, 2, 3]);
  });
  it("yüklenecek hafta: kalıcı bitişi olmayan ilk günün haftası; hepsi bittiyse son hafta", () => {
    expect(yuklenecekHafta(g(14), new Set())).toBe(1);
    expect(yuklenecekHafta(g(14), new Set(g(7)))).toBe(2);
    expect(yuklenecekHafta(g(14), new Set(g(14)))).toBe(2);
    // boşluklu paket (1–7 ve 29–35): 7. gün bitince 5. hafta
    expect(yuklenecekHafta([...g(7), 29, 30, 31], new Set(g(7)))).toBe(5);
    expect(yuklenecekHafta([], new Set())).toBeNull();
  });
  it("gün kilidi sırayla; atlama yok; paket dışı gün kilitli değil", () => {
    const bitti = new Set([1, 2, 3, 4, 5, 6]);
    expect(gunKilitli(7, g(9), bitti)).toBe(false);
    expect(gunKilitli(8, g(9), bitti)).toBe(true);
    expect(gunKilitli(9, g(9), new Set(g(7)))).toBe(true);
    expect(gunKilitli(9, g(9), new Set(g(8)))).toBe(false);
    expect(gunKilitli(1, g(9), new Set())).toBe(false);
    expect(gunKilitli(40, g(9), new Set())).toBe(false);
    // ara gün bitmemişse sonraki hafta kilitli (sonradan bitmiş gibi görünen gün de açmaz)
    expect(gunKilitli(8, g(9), new Set([1, 2, 3, 5, 6, 7]))).toBe(true);
  });
  it("hafta bitti: paketteki bütün günleri", () => {
    expect(haftaBitti(1, g(9), new Set(g(7)))).toBe(true);
    expect(haftaBitti(2, g(9), new Set(g(8)))).toBe(false);
    expect(haftaBitti(3, g(9), new Set(g(9)))).toBe(false);
  });
  it("haftalara böl: şimdiki hafta, biten, kilitli", () => {
    const y = yol([...g(9)].map((d) => (d <= 7 ? gunOzeti(d, `G${d}`, true) : { ...gunOzeti(d, `G${d}`, false), adimlar: [] })));
    const h = haftalara(y.gunler);
    expect(h.map((x) => [x.hafta, x.durum, x.gunler.length])).toEqual([[1, "bitti", 7], [2, "simdi", 2]]);
    expect(y.simdi?.day).toBe(8);
  });
});

describe("dil noktası adımı Yol'da (#231 takibi)", () => {
  const gdn = { ...g1, id: "m1:gun:08", day: 8, dersler: ["gr:a1-05:t4"] } as Gun;
  it("akış gününde hazır, akışa gider; bitişi ders:<id>; akışsız günde hazırlanıyor (günü bekletmez)", () => {
    const d = gunAdimlari(gdn, bos(), basliklar, "hepsi").adimlar.find((x) => x.id === "gr:a1-05:t4")!;
    expect(d).toMatchObject({ title_tr: "Dil noktası", href: "#/akis/8", hazir: !!g1.halkalar?.length, bitti: false });
    const b = gunAdimlari(gdn, { ...bos(), dersBitti: new Set(["gr:a1-05:t4"]) }, basliklar, "hepsi").adimlar.find((x) => x.id === "gr:a1-05:t4")!;
    expect(b.bitti).toBe(true);
    expect(gunAdimlari(gdn, bos(), basliklar, []).adimlar.find((x) => x.id === "gr:a1-05:t4")!.hazir).toBe(false);
  });
});
