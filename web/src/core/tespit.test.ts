import { describe, it, expect } from "vitest";
import type { TespitCozulen, TespitPaket } from "@dw/shared";
import { taramaPlani as tp, haftaDurumu as hdu, derinPlani as dp, tespitPlani as tpl, tespitRaporu as tr, tespitKarari as tk, kelimeOrnegi, TESPIT as TESPIT8, BECERILER, type Sonuc, type Cevaplar } from "./tespit.ts";

/** fikstür paketi iki haftalık: A1 = 2 hafta sayılır (gerçek politika 8; eksik hafta ayrı testte) */
const TESPIT = { ...TESPIT8, a1_hafta: 2 };
const taramaPlani = (p: TespitPaket) => tp(p, TESPIT);
const haftaDurumu = (p: TespitPaket, w: number, c: Cevaplar) => hdu(p, w, c, TESPIT);
const derinPlani = (p: TespitPaket, z: number[]) => dp(p, z, TESPIT);
const tespitPlani = (p: TespitPaket, c: Cevaplar) => tpl(p, c, TESPIT);
const tespitRaporu = (p: TespitPaket, c: Cevaplar) => tr(p, c, TESPIT);
const tespitKarari = (b: Parameters<typeof tk>[0], h: Parameters<typeof tk>[1], g: number) => tk(b, h, g, TESPIT);

const m = (id: string, x: Partial<TespitCozulen>): TespitCozulen => ({ id, kaynak: "gun_sinavi", tur: "tr_de", hafta: 1, asama: "derin", beceri: "yazma", can_do: [], dil_noktasi: [], uretim: true, madde: { id, k: "tr_de" }, ...x });
const kartlar = (on: string) => Array.from({ length: 20 }, (_, i) => `lx:${on}${i + 1}`);
const PAKET: TespitPaket = {
  id: "tespit:a1:1",
  cekirdek: [
    m("c:din", { kaynak: "deneme", tur: "pick", asama: "cekirdek", beceri: "dinleme", uretim: false, hafta: 2 }),
    m("c:oku", { kaynak: "deneme", tur: "pick", asama: "cekirdek", beceri: "okuma", uretim: false, hafta: 1 }),
    m("c:yaz", { kaynak: "deneme", tur: "mesaj", asama: "cekirdek", beceri: "yazma", hafta: 1 }),
    m("c:kon", { kaynak: "deneme", tur: "guided_response", asama: "cekirdek", beceri: "konusma", hafta: 2 })
  ],
  maddeler: [
    m("t1a", { kaynak: "yeni", tur: "guided_response", asama: "tarama", beceri: "konusma", can_do: ["cd:m1:01"] }),
    m("t1b", { kaynak: "yeni", asama: "tarama", beceri: "yazma", can_do: ["cd:m1:02"] }),
    m("d1", { can_do: ["cd:m1:01"], dil_noktasi: ["r0:a"] }),
    m("d2", { can_do: ["cd:m1:02"], dil_noktasi: ["r0:a"], beceri: "dil" }),
    m("p1", { tur: "pick", uretim: false, beceri: "dil", can_do: ["cd:m1:01"] }),
    m("d3", { can_do: ["cd:m1:01"] }),
    m("d4", { can_do: ["cd:m1:02"] }),
    m("d5", { dil_noktasi: ["r0:a"], beceri: "dil" }),
    m("t2a", { kaynak: "gorulmemis", tur: "durum", hafta: 2, asama: "tarama", beceri: "konusma", can_do: ["cd:m1:08"] }),
    m("t2b", { kaynak: "gorulmemis", tur: "durum", hafta: 2, asama: "tarama", beceri: "konusma", can_do: ["cd:m1:08"] }),
    m("e1", { hafta: 2, can_do: ["cd:m1:08"], dil_noktasi: ["gr:b"] }),
    m("e2", { hafta: 2, dil_noktasi: ["gr:b"], beceri: "dil" }),
    m("e3", { hafta: 2, can_do: ["cd:m1:08"] }),
    m("e4", { hafta: 2, dil_noktasi: ["gr:b"], beceri: "dil" })
  ],
  haftalar: [
    { hafta: 1, can_do: [{ id: "cd:m1:01", tr: "Günleri söylerim.", gun: 1 }, { id: "cd:m1:02", tr: "Ayları söylerim.", gun: 2 }], dil_noktasi: [{ id: "r0:a", ad_tr: "Günler" }], kartlar: kartlar("a") },
    { hafta: 2, can_do: [{ id: "cd:m1:08", tr: "Fırında isterim.", gun: 8 }], dil_noktasi: [{ id: "gr:b", ad_tr: "Küçük sözcükler" }], kartlar: kartlar("b") }
  ],
  muaf_dil_noktasi: []
};
const hepsi = (adimlar: { id: string }[], s: Sonuc = "dogru", ek: Record<string, Sonuc> = {}) => new Map<string, Sonuc>([...adimlar.map((a) => [a.id, s] as [string, Sonuc]), ...Object.entries(ek)]);
const taramaHepsi = (ek: Record<string, Sonuc> = {}) => hepsi(taramaPlani(PAKET), "dogru", ek);

describe("seviye tespiti motoru (PM-115)", () => {
  it("tarama planı: çekirdek dört beceri, sonra hafta hafta tarama maddeleri + 6 kelime; belirlenimli", () => {
    const t = taramaPlani(PAKET);
    expect(t.slice(0, 4).map((a) => a.beceri)).toEqual(["dinleme", "okuma", "yazma", "konusma"]);
    expect(t.length).toBe(4 + (2 + TESPIT.kelime.tarama) * 2);
    expect(t.filter((a) => a.hafta === 1 && a.beceri !== "kelime").map((a) => a.id)).toEqual(["t1a", "t1b"]);
    expect(t.filter((a) => a.hafta === 1 && a.kart)).toHaveLength(6);
    expect(taramaPlani(PAKET).map((a) => a.id)).toEqual(t.map((a) => a.id));
    expect(t.some((a) => a.asama === "derin")).toBe(false);
  });
  it("hepsi doğru → derine inilmez, plan biter, karar A2", () => {
    const c = taramaHepsi();
    const p = tespitPlani(PAKET, c);
    expect(p.asama).toBe("bitti");
    expect(p.zayifHaftalar).toEqual([]);
    const r = tespitRaporu(PAKET, c);
    expect(r.karar).toBe("a2");
    expect(r.genel).toBe(1);
    expect(r.hafta.map((h) => h.durum)).toEqual(["oturmus", "oturmus"]);
    expect(r.beceri.dil.oran).toBeNull(); // dil maddesi sorulmadı: ölçülmedi, ortalamaya girmez
  });
  it("oturmuş hafta: tarama maddeleri doğru ve kelimede en çok 1 yanlış; 'Bilmiyorum' yanlış sayılır", () => {
    const k1 = taramaPlani(PAKET).filter((a) => a.hafta === 1 && a.kart).map((a) => a.id);
    expect(k1.every((id) => id.startsWith("kelime:1:lx:"))).toBe(true);
    expect(haftaDurumu(PAKET, 1, taramaHepsi({ [k1[0]!]: "yanlis" }))).toBe("oturmus");
    expect(haftaDurumu(PAKET, 1, taramaHepsi({ [k1[0]!]: "yanlis", [k1[1]!]: "bilmiyorum" }))).toBe("zayif");
    expect(haftaDurumu(PAKET, 1, taramaHepsi({ t1b: "bilmiyorum" }))).toBe("zayif");
    expect(haftaDurumu(PAKET, 2, new Map())).toBe("eksik");
  });
  it("zayıf hafta → derin bakış yalnız o haftada: derinSec maddeleri + taramada sorulmamış 12 kelime", () => {
    const c = taramaHepsi({ t1b: "yanlis" });
    const p = tespitPlani(PAKET, c);
    expect(p.asama).toBe(2);
    expect(p.zayifHaftalar).toEqual([1]);
    const d = p.adimlar.filter((a) => a.asama === "derin");
    expect(d.filter((a) => a.madde).map((a) => a.id)).toEqual(["d1", "d2"]); // d1 (cd1 + r0:a), d2 (cd2 + r0:a): kota dolar
    expect(d.every((a) => a.hafta === 1)).toBe(true);
    const tk = new Set(taramaPlani(PAKET).filter((a) => a.kart).map((a) => a.kart));
    const dk = d.filter((a) => a.kart).map((a) => a.kart!);
    expect(dk).toHaveLength(TESPIT.kelime.derin);
    expect(dk.some((k) => tk.has(k))).toBe(false);
    expect(p.siradaki!.id).toBe(d[0]!.id);
  });
  it("seçmeli madde can_do kanıtı değil; üretim maddesi yanlışsa zayıf can_do gün ve sayıyla", () => {
    const c0 = taramaHepsi({ t1b: "yanlis" });
    const d = tespitPlani(PAKET, c0).adimlar.filter((a) => a.asama === "derin");
    const r = tespitRaporu(PAKET, new Map([...c0, ...hepsi(d), ["d1", "yanlis"]]));
    expect(r.zayifCanDo).toEqual([
      { id: "cd:m1:01", tr: "Günleri söylerim.", gun: 1, dogru: 1, toplam: 2 },
      { id: "cd:m1:02", tr: "Ayları söylerim.", gun: 2, dogru: 1, toplam: 2 }
    ]);
    expect(r.zayifDilNoktasi.map((x) => [x.id, x.dogru, x.toplam])).toEqual([["r0:a", 1, 2]]);
    expect(r.sorulan).toEqual(expect.arrayContaining(["d1", "d2", "t1a", "c:din"]));
    // seçmeli p1 (cd1) derin seçime girmez: yalnız üretim maddesi sorulur
    expect(d.some((a) => a.id === "p1")).toBe(false);
    // rapor süzgeci: seçmeli tarama maddesi (savunma; doğrulayıcı tarama maddesini üretim ister) can_do kanıtına girmez
    const sec = { ...PAKET, maddeler: PAKET.maddeler.map((x) => (x.id === "t1a" ? { ...x, uretim: false, tur: "pick" } : x)) };
    const cs = new Map([...taramaPlani(sec).map((a) => [a.id, "dogru"] as [string, Sonuc]), ["t1a", "yanlis"] as [string, Sonuc]]);
    expect(tespitRaporu(sec, new Map([...cs, ...hepsi(tespitPlani(sec, cs).adimlar.filter((a) => !cs.has(a.id)))])).zayifCanDo).toEqual([]);
  });
  it("yarıda bırak / sürdür: plan cevaplardan yeniden kurulur, sıradaki ilk cevapsız adım, kalan süre", () => {
    const t = taramaPlani(PAKET);
    const c = hepsi(t.slice(0, 5));
    const p = tespitPlani(PAKET, c);
    expect(p.asama).toBe(1);
    expect(p.siradaki!.id).toBe(t[5]!.id);
    expect(p.kalan).toBe(t.length - 5);
    expect(p.kalanDk).toBeGreaterThan(0);
  });
  it("karar: konuşma < %70 → A2 değil (genel yüksek olsa da); hafta < %60 → tamamla; genel < %40 → baştan", () => {
    const o = (d: number, t: number) => ({ dogru: d, toplam: t, oran: d / t });
    const tam = Object.fromEntries(BECERILER.map((b) => [b, o(10, 10)])) as Parameters<typeof tespitKarari>[0];
    const h = [{ hafta: 1, oran: o(10, 10) }, { hafta: 2, oran: o(10, 10) }];
    expect(tespitKarari(tam, h, 1).karar).toBe("a2");
    const k = tespitKarari({ ...tam, konusma: o(6, 10) }, h, 0.93);
    expect(k).toEqual({ karar: "tamamla", nedenler: [{ tur: "beceri", ad: "konusma", oran: 0.6, esik: TESPIT.karar.a2_beceri_min }] });
    expect(tespitKarari(tam, [h[0]!, { hafta: 2, oran: o(5, 10) }], 0.95).nedenler).toEqual([{ tur: "hafta", ad: "2", oran: 0.5, esik: TESPIT.karar.a2_hafta_min }]);
    expect(tespitKarari(tam, h, 0.39).karar).toBe("bastan");
    expect(tespitKarari(tam, h, 0.79).karar).toBe("tamamla");
  });
  it("uçtan uca karar yolları: hepsi yanlış → baştan; iki hafta zayıf → tamamla", () => {
    const c1 = new Map<string, Sonuc>();
    for (let i = 0; i < 4; i++) { const p = tespitPlani(PAKET, c1); for (const a of p.adimlar) if (!c1.has(a.id)) c1.set(a.id, "bilmiyorum"); }
    const r1 = tespitRaporu(PAKET, c1);
    expect(tespitPlani(PAKET, c1).asama).toBe("bitti");
    expect(r1.karar).toBe("bastan");
    expect(r1.bilinmeyenKelime).toHaveLength((TESPIT.kelime.tarama + Math.min(TESPIT.kelime.derin, 14)) * 2);
    const c2 = taramaHepsi({ t1a: "yanlis", t2a: "yanlis" });
    const p2 = tespitPlani(PAKET, c2);
    expect(p2.zayifHaftalar).toEqual([1, 2]);
    for (const a of p2.adimlar) if (!c2.has(a.id)) c2.set(a.id, a.kart ? "dogru" : "yanlis");
    const r2 = tespitRaporu(PAKET, c2);
    expect(r2.karar).toBe("tamamla");
    expect(r2.hafta.map((x) => x.durum)).toEqual(["zayif", "zayif"]);
  });
  it("eşik tam eşitlikte geçer (kayan nokta): 4/5, 3/4, 3/4, 9/10 ortalaması %80; %40 baştan değil", () => {
    const o = (d: number, t: number) => ({ dogru: d, toplam: t, oran: d / t });
    const yok = { dogru: 0, toplam: 0, oran: null };
    const b = { dinleme: o(4, 5), okuma: o(3, 4), yazma: o(3, 4), konusma: o(9, 10), kelime: yok, dil: yok };
    const g = (0.8 + 0.75 + 0.75 + 0.9) / 4;
    expect(g).toBeLessThan(0.8); // 0.7999999999999999
    const h = [{ hafta: 1, oran: o(6, 10) }, { hafta: 2, oran: o(7, 10) }];
    expect(tespitKarari(b, h, g).karar).toBe("a2");
    expect(tespitKarari(b, h, (0.3 + 0.5) / 2).karar).not.toBe("bastan");
    expect(tespitKarari({ ...b, okuma: o(7, 10) }, h, 0.8).karar).toBe("a2"); // beceri tam %70
  });
  it("hafta oranı yalnız üretim maddelerinden: kelime doğruları zayıf üretimi örtmez", () => {
    const c = taramaHepsi({ t1a: "yanlis", t1b: "yanlis" });
    const p = tespitPlani(PAKET, c);
    for (const a of p.adimlar) if (!c.has(a.id)) c.set(a.id, a.kart ? "dogru" : (a.id === "d1" ? "dogru" : "yanlis"));
    const r = tespitRaporu(PAKET, c);
    const h1 = r.hafta.find((x) => x.hafta === 1)!;
    expect(h1.oran).toEqual({ dogru: 1, toplam: 4, oran: 0.25 }); // t1a, t1b, d1, d2 (18 kelime sayılmaz)
    expect(r.karar).toBe("tamamla");
  });
  it("ölçülmeyen ya da pakette olmayan hafta A2'yi açmaz; yarıda kalan raporda karar yok", () => {
    const c = taramaHepsi();
    const r8 = tr(PAKET, c); // gerçek politika: 8 hafta, pakette 2
    expect(r8.karar).toBe("tamamla");
    expect(r8.nedenler.filter((n) => n.tur === "olcum").map((n) => n.ad)).toEqual(["3", "4", "5", "6", "7", "8"]);
    const yarim = tespitRaporu(PAKET, hepsi(taramaPlani(PAKET).slice(0, 6)));
    expect(yarim.bitti).toBe(false);
    expect(yarim.karar).toBeNull();
    expect(yarim.hafta.map((h) => h.durum)).toEqual(["eksik", "eksik"]);
  });
  it("derinPlani: birden çok haftada aynı madde bir kez; kelime örneği kararlı", () => {
    const iki = { ...PAKET, maddeler: [...PAKET.maddeler, m("x", { hafta: 2, can_do: ["cd:m1:01", "cd:m1:08"], dil_noktasi: ["r0:a", "gr:b"] })] };
    const ids = derinPlani(iki, [1, 2]).filter((a) => a.madde).map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(kelimeOrnegi(["lx:b", "lx:a", "lx:c"], 2)).toEqual(kelimeOrnegi(["lx:c", "lx:a", "lx:b"], 2));
  });
});
