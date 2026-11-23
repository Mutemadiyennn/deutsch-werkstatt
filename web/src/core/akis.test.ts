/**
 * AKIS AK-9: planlayıcının özellik testleri. Girdi gerçek içerik (sözlük, temel dersler, dünya, M1 1. gün) + İÇ'in 1. gün
 * halka önerisi (fikstür; #165). Planlar bir kez üretilir: 50 tohum × 4 öğrenci durumu = 200 plan; özelliklerin HEPSİ bu 200 planda
 * sınanır. 2.–7. gün fikstürü henüz yok (İÇ'in halkaları gelince eklenir; AK-9'un "7 gün" kapsamı açık).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Halka, bilinmeyenler, genelAdlarAyikla, kalipOrtu, kartsizMi, kalipSecenekleri, kumeDizini, toks, YUVA, type Bilinen, type LearnerItem } from "@dw/shared";
import { loadContent, ROOT } from "../../../content/tools/load.ts";
import { ADIM_TURLERI, GOSTERIM, GUN_SINAVI, KIP, planGun, politikaHatalari, POLITIKA, type Adim, type AkisPolitikasi, type GunPlani, type PlanGirdi } from "./akis.ts";

const c = loadContent();
const genel = genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8"));
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genel);
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const g1 = c.m1.find((x) => x.data.day === 1)!.data;
const halkalar = z.array(Halka).parse(JSON.parse(readFileSync(join(ROOT, "docs/v2/reviews/halka/gun-01-halkalar.json"), "utf8")).halkalar);
const gun = { ...g1, halkalar };
const ders = dersler.get(g1.dersler[0]!)!;

const fsrs = (due: string) => ({ due, stability: 3, difficulty: 5, scheduled_days: 1, reps: 2, lapses: 0, learning_steps: 0, state: 2 });
const item = (id: string, due: string): LearnerItem => ({ itemId: id, kind: "lexeme", passive: { s: 1, n: 2, ok: 2, fsrs: fsrs(due) }, active: { s: 1, n: 1, ok: 1, sessions: [], fsrs: fsrs(due) }, durable: false } as unknown as LearnerItem);
const simdi = new Date("2026-12-01T08:00:00Z");
/** 1. gün için "önceki" kart yok; tekrar durumunu sınamak için sözlükten başka kartlar önceki gün sayılır */
const onceki = c.lexemes.filter((l) => l.card !== false && !g1.yeni_kartlar.includes(l.id)).slice(0, 30).map((l) => l.id);
const DURUM: Record<string, { items: Map<string, LearnerItem>; onceki: Set<string> }> = {
  sifir: { items: new Map(), onceki: new Set() },
  kusursuz: { items: new Map(onceki.map((id) => [id, item(id, "2026-12-20T00:00:00Z")])), onceki: new Set(onceki) },
  yuzde30: { items: new Map(onceki.map((id, i) => [id, item(id, i % 3 === 0 ? "2026-11-30T00:00:00Z" : "2026-12-20T00:00:00Z")])), onceki: new Set(onceki) },
  // ara verip dönen: hepsi vadeli, gecikme kart kart farklı (en gecikmiş önce gelmeli)
  ara: { items: new Map(onceki.map((id, i) => [id, item(id, new Date(Date.UTC(2026, 10, 1 + ((i * 7) % 25))).toISOString())])), onceki: new Set(onceki) }
};
const girdi = (tohum: string, durum: keyof typeof DURUM, ek: Partial<PlanGirdi> = {}): PlanGirdi =>
  ({ gun, dersler, dizin, items: DURUM[durum]!.items, oncekiKartlar: DURUM[durum]!.onceki, bitenDersler: new Set(), tohum, simdi, ...ek });
const plan = (tohum: string, durum: keyof typeof DURUM, ek: Partial<PlanGirdi> = {}): GunPlani => planGun(girdi(tohum, durum, ek))!;

const TOHUMLAR = Array.from({ length: 50 }, (_, i) => `1:t${i}`);
const DURUMLAR = Object.keys(DURUM) as (keyof typeof DURUM)[];
const PLANLAR = DURUMLAR.flatMap((durum) => TOHUMLAR.map((t) => ({ t, durum, p: plan(t, durum) })));
const etiket = (x: { t: string; durum: string }, ...s: unknown[]) => [x.durum, x.t, ...s].join(" ");
const halkaD = (p: GunPlani) => p.duraklar.filter((d) => d.tur === "halka");
const kayit = (p: GunPlani, kural: string, a: Adim) => p.gevseme.some((g) => g.kural === kural && g.adim === a.id);
const TANITIM = new Set(["tanit", "kalip"]);

/** Plan boyunca K(t)'yi adım adım izleyen bağımsız sayaç (planlayıcının iç durumuna bakmaz) */
function izle(p: GunPlani, onc: Set<string>, f: (a: Adim, K: Bilinen, d: string) => void): void {
  const bil = new Set(onc); const kp: string[][] = [];
  for (const d of p.duraklar) for (const a of d.adimlar) {
    if (a.tur === "tanit") a.kartlar.forEach((k) => bil.add(k));
    f(a, { kart: bil, biten: new Set(), kaliplar: kp.slice() }, d.id);
    if (a.tur === "kalip" && a.cumle) kp.push(...kalipSecenekleri(a.cumle));
  }
}

describe("Halka planlayıcısı (AKIS AK-2, AK-3, AK-9) — 50 tohum × 4 durum", () => {
  it("aynı girdi aynı planı verir; plan boş değil (BY-2, BY-12); tohum planı değiştirir", () => {
    expect(JSON.stringify(plan("1:x", "sifir"))).toBe(JSON.stringify(plan("1:x", "sifir")));
    for (const x of PLANLAR) {
      expect(halkaD(x.p), etiket(x)).toHaveLength(halkalar.length);
      for (const d of halkaD(x.p)) expect(d.adimlar.length, etiket(x, d.id)).toBeGreaterThan(0);
    }
    for (const durum of DURUMLAR) {
      const farkli = new Set(PLANLAR.filter((x) => x.durum === durum).map((x) => JSON.stringify(x.p.duraklar.map((d) => d.adimlar.map((a) => [a.tur, a.kartlar, a.cumle])))));
      expect(farkli.size, `${durum}: tohumlar arasında farklı plan`).toBeGreaterThanOrEqual(2);
    }
  });
  it("kural 1: kullanım tanıtımdan sonra; art arda tanıtım sınırı aşılırsa adım kimliğiyle kayıtlı; tanıtımın hemen ardından kullanım", () => {
    for (const x of PLANLAR) { const tanit = new Set<string>(); for (const d of x.p.duraklar) {
      let artarda = 0;
      d.adimlar.forEach((a, i) => {
        if (TANITIM.has(a.tur)) {
          artarda++;
          if (artarda > POLITIKA.tanitim_art_arda) expect(kayit(x.p, "tanitim", a), etiket(x, d.id, i)).toBe(true);
          a.kartlar.forEach((k) => tanit.add(k)); return;
        }
        artarda = 0;
        for (const k of a.kartlar) if (gun.yeni_kartlar.includes(k)) expect(tanit.has(k), etiket(x, d.id, k, a.tur)).toBe(true);
        const o = d.adimlar[i - 1];
        if (o && TANITIM.has(o.tur) && a.tur !== "sahne") {
          let kul = false;
          for (let k = i - 1; k >= 0 && TANITIM.has(d.adimlar[k]!.tur); k--) {
            const t = d.adimlar[k]!;
            if (t.tur === "tanit" && (a.kartlar.some((y) => t.kartlar.includes(y)) || t.kartlar.some((y) => a.cumle && toks(a.cumle).some((w) => dizin.yuzey.get(y)?.has(w))))) kul = true;
            if (t.tur === "kalip" && a.cumle && kalipSecenekleri(t.cumle).some((kp) => kalipOrtu(toks(a.cumle), kp).length)) kul = true;
          }
          if (!kul && d.tur === "halka") expect(kayit(x.p, "kullanim", a), etiket(x, d.id, i, "tanıtımdan sonra kullanım yok")).toBe(true);
        }
      });
    } }
  });
  it("kural 3: halkada aynı tür art arda ve sınırı aşan kip dizisi yalnız adım kimliğiyle kayıtlıysa; kayıt gerçek ihlali gösterir", () => {
    let tur = 0, kip = 0;
    for (const x of PLANLAR) for (const d of halkaD(x.p)) {
      let n = 0;
      d.adimlar.forEach((a, i) => {
        const o = d.adimlar[i - 1];
        if (o && o.tur === a.tur) { tur++; expect(kayit(x.p, "tur", a), etiket(x, d.id, i, a.tur)).toBe(true); }
        n = o && o.kip === a.kip ? n + 1 : 1;
        if (n > POLITIKA.kip_art_arda) { kip++; expect(kayit(x.p, "kip", a), etiket(x, d.id, i, a.kip)).toBe(true); }
      });
      // tersine: kayıt varsa ihlal de vardır (rapor yanlış yer göstermez)
      for (const g of x.p.gevseme.filter((g) => (g.kural === "tur" || g.kural === "kip") && g.yer === d.id)) {
        const i = d.adimlar.findIndex((a) => a.id === g.adim);
        expect(i, etiket(x, d.id, g.kural, g.adim)).toBeGreaterThan(0);
        if (g.kural === "tur") expect(d.adimlar[i]!.tur).toBe(d.adimlar[i - 1]!.tur);
      }
    }
    // gevşeme istisnadır: 200 planın toplam adımlarının küçük bir kesri
    const adim = PLANLAR.reduce((s, x) => s + halkaD(x.p).reduce((t, d) => t + d.adimlar.length, 0), 0);
    expect(tur / adim, `aynı tür art arda ${tur}/${adim}`).toBeLessThan(0.01);
    expect(kip / adim, `kip dizisi ${kip}/${adim}`).toBeLessThan(0.03);
  });
  it("kural 2 (K3): eksik kalan kart kayıtlı; her kartın en az 2 kullanımı kendi halkasında; tanıtım/eşleştir/sahne kullanım türü sayılmaz", () => {
    for (const x of PLANLAR) {
      const tur = new Map<string, Set<string>>(), cumle = new Map<string, Set<string>>();
      for (const d of x.p.duraklar) for (const a of d.adimlar) for (const k of a.kartlar) {
        if (!["tanit", "kalip", "eslestir", "sahne"].includes(a.tur)) (tur.get(k) ?? tur.set(k, new Set()).get(k)!).add(a.tur);
        for (const s of a.satirlar?.length ? a.satirlar.filter((s) => toks(s).some((w) => dizin.yuzey.get(k)?.has(w))) : a.cumle ? [a.cumle] : []) (cumle.get(k) ?? cumle.set(k, new Set()).get(k)!).add(s);
      }
      for (const k of gun.yeni_kartlar) {
        if ((tur.get(k)?.size ?? 0) < POLITIKA.kelime_tur_min) expect(x.p.gevseme.some((g) => g.kural === "kart_tur" && g.kart === k), etiket(x, k, "tür")).toBe(true);
        if ((cumle.get(k)?.size ?? 0) < POLITIKA.kelime_cumle_min) expect(x.p.gevseme.some((g) => g.kural === "kart_cumle" && g.kart === k), etiket(x, k, "cümle")).toBe(true);
      }
      for (const d of halkaD(x.p)) for (const k of halkalar.find((h) => h.id === d.id)!.kartlar)
        expect(d.adimlar.filter((a) => !["tanit", "eslestir", "sahne"].includes(a.tur) && a.kartlar.includes(k)).length, etiket(x, d.id, k)).toBeGreaterThanOrEqual(2);
    }
  });
  it("AK-3: BÜTÜN duraklarda görev cümlesinde K(t) dışında sözcük 0; gösterim satırında ≤ 1 (dil durağı ve gün sonu dahil)", () => {
    for (const x of PLANLAR) izle(x.p, DURUM[x.durum]!.onceki, (a, K, d) => {
      const satir = [...(a.satirlar ?? []), ...(GOSTERIM.has(a.tur) && a.cumle && !a.satirlar ? [a.cumle] : [])];
      for (const s of satir) expect(bilinmeyenler(dizin, s, a.tur === "kalip" ? { ...K, kaliplar: [] } : K).length, etiket(x, d, a.tur, s)).toBeLessThanOrEqual(POLITIKA.gosterim_bilinmeyen_max + (a.tur === "kalip" ? toks(s).length : 0));
      if (!a.cumle || GOSTERIM.has(a.tur)) return;
      const u = bilinmeyenler(dizin, a.cumle, K, a.tur === "gap" && a.kaynak === "halka" ? toks(a.cumle) : []);
      if (a.tur !== "gap" || a.kaynak !== "halka") expect(u, etiket(x, d, a.tur, a.cumle, JSON.stringify(u))).toEqual([]);
    });
  });
  it("AK-3: dersin görevi, dersin bütün kelime ve kalıpları tanıtıldıktan sonra", () => {
    for (const x of PLANLAR) {
      const dizi = x.p.duraklar.flatMap((d) => d.adimlar);
      const g = dizi.findIndex((a) => a.ders?.oge === "gorev");
      if (g < 0) { expect(x.p.gevseme.some((v) => v.yer.startsWith("dil:") && /gorev/.test(v.not ?? "")), etiket(x, "görev düştü ama kayıt yok")).toBe(true); continue; }
      const once = new Set(dizi.slice(0, g).flatMap((a) => (TANITIM.has(a.tur) && a.ders ? a.ders.ogeler ?? [a.ders.oge] : [])));
      for (const t of ders.teach) expect(once.has(t.id), etiket(x, "görevden önce", t.id)).toBe(true);
    }
  });
  it("K5: üretim adımında (TR→DE, dikte, söyle) çerçeve sözcükleri önce en az 2 adımda görülmüş", () => {
    for (const x of PLANLAR) {
      const gor = new Map<string, number>();
      for (const d of x.p.duraklar) for (const a of d.adimlar) {
        if (a.cumle && ["dikte", "soyle", "tr_de"].includes(a.tur))
          for (const w of toks(a.cumle)) { const ids = dizin.idx.get(w); if (ids && [...ids].every((i) => dizin.cerceve.has(i))) expect(gor.get(w) ?? 0, etiket(x, a.tur, w, a.cumle)).toBeGreaterThanOrEqual(POLITIKA.cerceve_uretim_min); }
        for (const s of [a.cumle, ...(a.satirlar ?? [])]) for (const w of new Set(toks(s))) gor.set(w, (gor.get(w) ?? 0) + 1);
      }
    }
  });
  it("K8: her teach öğesi planda tam bir kez tanıtılır; kelime tanıtımı tek sözcüklü öğe; dil durağında tanıtım yok; kalıp kendi sözcüğünü kullanan adımdan önce", () => {
    const tekSozcuk = new Set(ders.teach.filter((t) => toks(t.de).length === 1).map((t) => t.id));
    for (const x of PLANLAR) {
      const ogeler = x.p.duraklar.flatMap((d) => d.adimlar.filter((a) => TANITIM.has(a.tur) && a.ders).flatMap((a) => a.ders!.ogeler ?? [a.ders!.oge]));
      expect([...ogeler].sort(), etiket(x)).toEqual(ders.teach.map((t) => t.id).sort());
      for (const d of x.p.duraklar) for (const a of d.adimlar) {
        if (a.tur === "tanit" && a.ders) expect(tekSozcuk.has(a.ders.oge), etiket(x, a.ders.oge)).toBe(true);
        if (d.tur === "dil") expect(TANITIM.has(a.tur), etiket(x, d.id, a.tur)).toBe(false);
      }
      // kalıbın kartsız sabit sözcüğü, kalıp adımından önce hiçbir görev adımında geçmez (P1-3)
      const dizi = x.p.duraklar.flatMap((d) => d.adimlar);
      dizi.forEach((k, i) => {
        if (k.tur !== "kalip") return;
        const sabit = new Set(kalipSecenekleri(k.cumle).flat().filter((t) => t !== YUVA && kartsizMi(dizin, t)));
        const dahaOnce = dizi.slice(0, i).filter((a) => a.cumle && !GOSTERIM.has(a.tur) && toks(a.cumle).some((t) => sabit.has(t)));
        // aynı sözcük daha önce başka bir kalıpla öğretilmiş olabilir
        for (const a of dahaOnce) expect(dizi.slice(0, dizi.indexOf(a)).some((b) => b.tur === "kalip" && toks(a.cumle).some((t) => sabit.has(t) && kalipSecenekleri(b.cumle).flat().includes(t))) || x.p.gevseme.some((g) => g.kural === "kalip_sira"), etiket(x, k.cumle, "önce:", a.cumle)).toBe(true);
      });
    }
  });
  it("K1 ve AK-6: seanslar 1'den başlayıp boşluksuz artar; kip türle uyumlu; eski anahtarların hepsi; halka eşleştir + sahneyle biter", () => {
    for (const x of PLANLAR) {
      const s = x.p.duraklar.map((d) => d.seans);
      expect(s[0]).toBe(1); expect(Math.max(...s)).toBeLessThanOrEqual(4);
      s.forEach((v, i) => { if (i) expect(v - s[i - 1]!, etiket(x, "seans")).toBeGreaterThanOrEqual(0); if (i) expect(v - s[i - 1]!).toBeLessThanOrEqual(1); });
      for (const d of x.p.duraklar) for (const a of d.adimlar) expect(a.kip).toBe(KIP[a.tur]);
      const anahtar = x.p.duraklar.map((d) => d.eski_anahtar).filter(Boolean);
      const bekle = ["m1:bahce:1", `ders:${ders.id}`, "m1:gun:1", ...(g1.prova ? ["m1:prova:1"] : []), ...(g1.okuma_yazma ? ["m1:okuma:1"] : []), ...(g1.video ? [`m1:medya:${g1.video.id}`] : [])];
      expect([...anahtar].sort(), etiket(x)).toEqual(bekle.sort());
      expect(halkaD(x.p).at(-1)!.eski_anahtar).toBe("m1:bahce:1");
      expect(x.p.duraklar.at(-1)!.tur).toBe("gunsonu");
      for (const d of halkaD(x.p)) { expect(d.adimlar.at(-1)!.tur, etiket(x, d.id)).toBe("sahne"); expect(d.adimlar.at(-2)!.tur, etiket(x, d.id)).toBe("eslestir"); }
    }
  });
  it("dil durağı (AK-1): parçalar arasında en az bir halka; 1. parça kullanımla biter, 2. parça hatırlatmayla başlar", () => {
    for (const x of PLANLAR) {
      const d = x.p.duraklar;
      const p1 = d.findIndex((y) => y.parca === 1), p2 = d.findIndex((y) => y.parca === 2);
      if (p1 >= 0) {
        expect(p2, etiket(x)).toBeGreaterThan(p1);
        expect(d.slice(p1 + 1, p2).some((y) => y.tur === "halka"), etiket(x, "arada halka")).toBe(true);
        expect(["kur", "soyle"]).toContain(d[p1]!.adimlar.at(-1)!.kip);
        expect(d[p2]!.adimlar[0]!.tur).toBe("hatirlat");
      }
      expect(d.filter((y) => y.tur === "dil").length, etiket(x)).toBeGreaterThan(0);
    }
  });
  it("tekrar FSRS vadesine göre: ısınma en gecikmiş kartlarla başlar (AK-2.6)", () => {
    for (const x of PLANLAR.filter((y) => y.durum === "ara")) {
      const sira = x.p.duraklar.flatMap((d) => d.adimlar.filter((a) => a.tur === "tekrar").map((a) => a.kartlar[0]!));
      const vade = (id: string) => +new Date(DURUM.ara!.items.get(id)!.passive.fsrs!.due as unknown as string);
      const isinma = x.p.duraklar.find((d) => d.tur === "isinma")!.adimlar.map((a) => a.kartlar[0]!);
      for (const k of isinma) for (const h of sira.slice(isinma.length)) expect(vade(k), etiket(x, k, h)).toBeLessThanOrEqual(vade(h));
    }
  });
});

describe("Kenar durumlar (P1-8)", () => {
  it("halkasız gün akış günü değildir: null (çağıran eski düzene düşer)", () => {
    expect(planGun({ ...girdi("1:k", "sifir"), gun: { ...g1, halkalar: [] } })).toBeNull();
    const { halkalar: _h, ...eski } = gun;
    expect(planGun({ ...girdi("1:k", "sifir"), gun: eski })).toBeNull();
  });
  it("bozuk politika girişte reddedilir (sonsuz döngü yok); politika dosyası geçerli ve her türün süresi var", () => {
    expect(politikaHatalari(POLITIKA)).toEqual([]);
    for (const t of ADIM_TURLERI) expect(POLITIKA.adim_sn[t]).toBeGreaterThan(0);
    const bozuk: AkisPolitikasi = { ...POLITIKA, tanitim_art_arda: 0 };
    expect(() => planGun({ ...girdi("1:k", "sifir"), politika: bozuk })).toThrow(/tanitim_art_arda/);
  });
  it("tanitim_art_arda 1: plan kurulur, art arda iki tanıtım ancak kayıtlıysa", () => {
    const p = plan("1:k", "sifir", { politika: { ...POLITIKA, tanitim_art_arda: 1 } });
    for (const d of halkaD(p)) d.adimlar.forEach((a, i) => { if (i && TANITIM.has(a.tur) && TANITIM.has(d.adimlar[i - 1]!.tur)) expect(kayit(p, "tanitim", a), `${d.id} ${i}`).toBe(true); });
  });
  it("sözlükte olmayan kart düşer, tek hata kaydı kalır; plan bozulmaz", () => {
    const h2 = halkalar.map((h, i) => (i === 0 ? { ...h, kartlar: [...h.kartlar, "lx:yokboyle"] } : h));
    const p = plan("1:k", "sifir", { gun: { ...gun, halkalar: h2, yeni_kartlar: [...g1.yeni_kartlar, "lx:yokboyle"] } });
    expect(p.duraklar.flatMap((d) => d.adimlar).some((a) => a.kartlar.includes("lx:yokboyle"))).toBe(false);
    expect(p.gevseme.filter((g) => g.kural === "hata" && g.kart === "lx:yokboyle")).toHaveLength(1);
    expect(p.duraklar.flatMap((d) => d.adimlar).some((a) => /undefined/.test(a.neden))).toBe(false);
  });
  it("içerikte olmayan ders: hata kaydı ve not; plan kurulur", () => {
    const p = plan("1:k", "sifir", { gun: { ...gun, dersler: [...g1.dersler, "r0:99-yok"] } });
    expect(p.gevseme.some((g) => g.kural === "hata" && g.yer === "ders:r0:99-yok")).toBe(true);
    expect(p.neden.some((n) => n.includes("r0:99-yok"))).toBe(true);
  });
  it("tek halkalı gün: dil parçaları art arda gelmez", () => {
    const p = plan("1:k", "sifir", { gun: { ...gun, halkalar: halkalar.slice(0, 1) } });
    const d = p.duraklar;
    d.forEach((y, i) => { if (i && y.tur === "dil" && d[i - 1]!.tur === "dil") throw new Error(`art arda dil: ${d[i - 1]!.id} ${y.id}`); });
  });
});

/** PM 7046461673: 1. gün plan dökümü (durak durak, adım adım). K1 süre ölçütü cihaz ölçümüne kadar YALNIZ RAPOR: test düşürmez.
 *  Dökümü yazmak için: DW_PLAN_DOKUM=docs/v2/qa/akis/gun-01-plan.md npx vitest run web/src/core/akis.test.ts -t dökümü */
describe("1. gün plan dökümü (PM 7046461673)", () => {
  it("dökümü üretilir; K1 süreleri yalnız raporlanır", async () => {
    const p = plan("1:dokum", "sifir");
    const sat: string[] = [];
    sat.push(`# 1. gün planı: döküm (tohum \`${p.tohum}\`, öğrenci durumu: sıfır)`, "");
    sat.push(`> Kendiliğinden üretildi: \`web/src/core/akis.test.ts\` ("1. gün plan dökümü"). Girdi: gerçek içerik + İÇ'in 1. gün halka önerisi (\`docs/v2/reviews/halka/gun-01-halkalar.json\`, #165 2. sürüm; halka kalıpları dahil). Süreler \`policy.akis.adim_sn\` tahminidir; **K1 ölçütü ilk cihaz ölçümüne kadar yalnız rapor** (PM 7046461673). ⚠ = durak \`durak_dk\` üst sınırını (${POLITIKA.durak_dk[1]} dk) aşıyor.`, "");
    const seans = new Map<number, number>();
    for (const d of p.duraklar) seans.set(d.seans, (seans.get(d.seans) ?? 0) + d.tahmini_dk);
    sat.push(`**Toplam:** ${p.toplam_dk.toFixed(1)} dk · ${[...seans].map(([s, dk]) => `seans ${s}: ${dk.toFixed(1)} dk`).join(" · ")} · politika seans aralığı ${POLITIKA.seans_dk[0]}–${POLITIKA.seans_dk[1]} dk, gün ${POLITIKA.gun_dk[0]}–${POLITIKA.gun_dk[1]} dk (rapor)`, "");
    if (p.gevseme.length) sat.push(`**Gevşeme (K4):** ${p.gevseme.map((g) => `${g.kural}${g.kart ? ` (${g.kart})` : ""} @ ${g.adim ?? g.yer}${g.not ? ` — ${g.not}` : ""}`).join(" · ")}`, "");
    if (p.neden.length) sat.push(`**Plan notları:** ${p.neden.join(" · ")}`, "");
    let n = 0;
    for (const d of p.duraklar) {
      sat.push(`## Seans ${d.seans} · ${d.tur} · ${d.title_tr}${d.parca ? ` (parça ${d.parca})` : ""}: ${d.tahmini_dk.toFixed(1)} dk${d.asim ? " ⚠" : ""}`, "");
      sat.push(`_${d.neden}_${d.eski_anahtar ? ` · eski anahtar \`${d.eski_anahtar}\`` : ""}`, "");
      if (!d.adimlar.length) { sat.push("(adımsız durak: mevcut ekran)", ""); continue; }
      sat.push("| # | tür | kip | kart(lar) | cümle | sn | kaynak | neden |", "|---|---|---|---|---|---|---|---|");
      for (const a of d.adimlar) {
        n++;
        const metin = a.cumle ?? (a.satirlar ?? []).join(" / ");
        sat.push(`| ${n} | ${a.tur} | ${a.kip} | ${a.kartlar.join(", ")} | ${metin.replace(/\|/g, "/")} | ${a.sn} | ${a.kaynak}${a.ders ? ` (${a.ders.ogeler?.join(", ") ?? a.ders.oge})` : ""} | ${a.neden.replace(/\|/g, "/")} |`);
      }
      sat.push("");
    }
    expect(n).toBeGreaterThan(0);
    const hedef = process.env.DW_PLAN_DOKUM;
    if (hedef) {
      const { writeFileSync, mkdirSync } = await import("node:fs");
      const { dirname } = await import("node:path");
      mkdirSync(dirname(join(ROOT, hedef)), { recursive: true });
      writeFileSync(join(ROOT, hedef), sat.join("\n"));
    }
  });
});

describe("gün sonu: kendini dene (PM 7059008858 md. 4)", () => {
  it("en çok 4 madde, günün sınavından; her biri gün sonu kapısından geçer ve türler önce birer kez", () => {
    for (const t of TOHUMLAR.slice(0, 10)) {
      const p = plan(t, "sifir");
      const gs = p.duraklar.find((d) => d.tur === "gunsonu")!;
      const kd = gs.adimlar.filter((a) => a.ders?.id === GUN_SINAVI);
      expect(kd.length).toBe(4);  // 1. günde her türden en az bir madde gün sonu kapısından geçiyor
      const ids = kd.map((a) => a.ders!.oge);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(gun.gun_sinavi.maddeler.some((m) => m.id === id)).toBe(true);
      const turler = kd.map((a) => gun.gun_sinavi.maddeler.find((m) => m.id === a.ders!.oge)!.k);
      if (turler.length >= 2) expect(new Set(turler.slice(0, Math.min(3, turler.length))).size).toBeGreaterThan(1);
    }
  });
});

describe("resimden seç yalnız görselli kartta (PM 7059008858 md. 5)", () => {
  it("görselli kart verilince bazı tohumlarda 'resimden_sec' çıkar; yalnız o kartlarda", () => {
    const halkaKart = [...new Set(gun.halkalar.flatMap((h) => h.kartlar))];
    const gorselli = new Set(halkaKart.slice(0, 8));
    let n = 0;
    for (const t of TOHUMLAR) for (const a of plan(t, "sifir", { gorselli }).duraklar.flatMap((d) => d.adimlar)) if (a.tur === "resimden_sec") {
      n++; expect(a.kartlar.every((k) => gorselli.has(k) || !!c.lexemes.find((l) => l.id === k)?.img)).toBe(true);
    }
    expect(n).toBeGreaterThan(0);
  });
});

describe("değişmez kural: hiçbir kart kendi tanıtım adımından önce sorulmaz (PM 7067321013 F1)", () => {
  /** Planı sırayla yürür; `tanit` adımı görülmeden bir adımın kartı olan (önceki günlerden bilinmeyen) kartları döndürür */
  const erken = (p: GunPlani, onceki: ReadonlySet<string> = new Set()): string[] => {
    const gorulen = new Set<string>(), out: string[] = [];
    for (const d of p.duraklar) for (const a of d.adimlar) {
      if (a.tur === "tanit") { a.kartlar.forEach((k) => gorulen.add(k)); continue; }
      for (const k of a.kartlar) if (!onceki.has(k) && !gorulen.has(k)) out.push(`${a.id} ${a.tur} ${k}`);
    }
    return out;
  };
  const gercek = (day: number) => c.m1.find((x) => x.data.day === day)!.data;
  const uygulama = (g: PlanGirdi["gun"], ek: Partial<PlanGirdi> = {}): GunPlani =>
    planGun({ gun: g, dersler, dizin, items: new Map(), oncekiKartlar: new Set(), bitenDersler: new Set(), tohum: `akis:${g.day}`, simdi, ...ek })!;

  it("gerçek gun-01.json, uygulamanın tohumu akis:1: görselsiz, bütün kartlar görselli, yarısı görselli", () => {
    const g = gercek(1);
    expect(g.halkalar?.length, "1. gün içerikte halkalı").toBeGreaterThan(0);
    const kartlar = g.halkalar!.flatMap((h) => h.kartlar);
    for (const gorselli of [undefined, new Set(kartlar), new Set(kartlar.filter((_, i) => i % 2 === 0))]) {
      const p = uygulama(g, gorselli ? { gorselli } : {});
      expect(erken(p), `görselli ${gorselli?.size ?? 0}`).toEqual([]);
      // her halka kartı planda tam bir kez tanıtılır
      const tanit = p.duraklar.flatMap((d) => d.adimlar).filter((a) => a.tur === "tanit").flatMap((a) => a.kartlar);
      expect([...tanit].sort()).toEqual([...kartlar].sort());
    }
  });

  it("içerikteki bütün akış günleri, uygulamanın tohumuyla (önceki günlerin kartları bilinir ya da hiç bilinmez)", () => {
    const gunler = c.m1.map((x) => x.data).filter((g) => (g.halkalar?.length ?? 0) > 0).sort((a, b) => a.day - b.day);
    expect(gunler.length).toBeGreaterThan(0);
    for (const g of gunler) {
      const onceki = new Set(c.m1.filter((x) => x.data.day < g.day).flatMap((x) => x.data.yeni_kartlar));
      expect(erken(uygulama(g, { oncekiKartlar: onceki }), onceki), `${g.day}. gün`).toEqual([]);
      expect(erken(uygulama(g)), `${g.day}. gün, önceki kart yok`).toEqual([]);
    }
  });

  it("halka kartı yeni_kartlar'da olmasa da tanıtımından önce sorulmaz (e2e fikstürü: 'der Herr' tanıtımdan 3 adım önce soruluyordu)", () => {
    const g = gercek(1);
    // e2e paketindeki 1. gün: fikstürün yeni_kartlar'ı + gerçek günün halkaları (content/tools/build.ts)
    const fx = JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/m1/gun-01.json"), "utf8")) as { yeni_kartlar: string[] };
    const kartlar = g.halkalar!.flatMap((h) => h.kartlar);
    expect(erken(uygulama({ ...g, yeni_kartlar: fx.yeni_kartlar }))).toEqual([]);
    // genelleme: halka kartlarından herhangi biri listeden düşse de
    for (const k of kartlar) for (const tohum of ["akis:1", "1:t0", "1:t7"])
      expect(erken(uygulama({ ...g, yeni_kartlar: g.yeni_kartlar.filter((x) => x !== k) }, { tohum })), `${k} listede yok, ${tohum}`).toEqual([]);
  });
});

describe("ses iki turda (PM-097 md. 1)", () => {
  it("ilk tur başta (halkalardan önce); ikinci tur son halkadan sonra, provadan önce; her planda", () => {
    const ikinciVar = g1.sesler.some((s) => s.bolumler.some((b) => b.dikte.length || b.golge.length || b.cevapla));
    for (const { p } of PLANLAR) {
      const d = p.duraklar;
      const ilk = d.findIndex((x) => x.ses_turu === "ilk"), ikinci = d.findIndex((x) => x.ses_turu === "ikinci");
      const ilkHalka = d.findIndex((x) => x.tur === "halka"), sonHalka = d.map((x) => x.tur).lastIndexOf("halka"), prova = d.findIndex((x) => x.tur === "prova");
      if (g1.sesler.length) expect(ilk).toBeGreaterThanOrEqual(0);
      if (ilk >= 0) expect(ilk).toBeLessThan(ilkHalka);
      expect(ikinci >= 0).toBe(ikinciVar);
      if (ikinci >= 0) { expect(ikinci).toBeGreaterThan(sonHalka); if (prova >= 0) expect(ikinci).toBeLessThan(prova); }
      expect(d.filter((x) => x.tur === "ses")).toHaveLength((ilk >= 0 ? 1 : 0) + (ikinci >= 0 ? 1 : 0));
    }
  });
});
