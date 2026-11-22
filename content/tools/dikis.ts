/**
 * Dikiş denetçisi (PM-090 md. 2.1; PM-091 md. 4). Yapay zekâsız, saf: paralel yazılan haftaların birbirine karışmadığını sınar.
 * Kaynaklar: `content/v2/curriculum/a1-kesin.json` (gün → kesin kart; 1.–7. gün `ogretilmis_sayilan.gunler`),
 * `content/v2/curriculum/omurga.json` (gün → dersler), `content/v2/m1/gun-NN.json` (ŞEMASIZ okunur: şema henüz 8. günü
 * kabul etmese de denetçi koşar).
 *
 * Kurallar (her biri ayrı sayılır; toplam ihlal 0 olmalı):
 *  (a) günün `yeni_kartlar` kümesi = tablodaki o günün kümesi (eksik yok, fazla yok).
 *  (b) günün her adımında sorulan ya da cevabı olan her kart, tabloda o günden ÖNCEKİ günlerde ya da o günde o adımdan önce
 *      tanıtılmış. "Sorulan/cevabı olan": öğrencinin ürettiği ya da seçtiği Almanca (halka görev cümlesi ve ilk kabul; dikte
 *      cevabı: kolayda doğru seçenek, ortada yalnız boşluğun cevabı, zor/ustada cümle, gerçekte örnek + zorunlu; gölge cümlesi;
 *      cevapla; resimden seç; provanın uygun seçenekleri; yazma örneği ve zorunlu sözcükler; gün sınavı maddeleri).
 *      Gün içi sıra: halkalar sırayla (halka kendi kartlarını tanıtır; `dersten_sonra` halkası günün derslerini bilir);
 *      halka dışı adımlar günün bütün kartlarından ve derslerinden sonra sayılır (yerlerini planlayıcı K(t)'ye göre seçer).
 *      Yalnız KART eksikliği sayılır (kume.ts `tur: "kart"`): biçim ve eşlenemeyen sözcük halka denetiminin (halka.ts) işidir.
 *      Kume.ts'e ek olarak GÖSTERİLMİŞ iki kalıp bütün olarak bilinir (garden.ts `cevapGosterildi` emsali): tanıtılmış kartın
 *      kartta açık duran eşdizimleri (en çok 3; "Schönes Wochenende!") ve biten dersin `teach` öğesindeki çok sözcüklü
 *      `exp.parcalar` ("hier ist"). Kalıp yalnız bütün olarak örter; parçası tek başına bilinmez.
 *  (c) günün `dersler` kimlikleri = omurganın o gün için verdiği (sıra önemsiz). `dersler` boşsa ve omurga ders veriyorsa
 *      `requires.gramer` sayılır (İÇ 7087571211: şema `gr:`/`dn:` kimliğini henüz kabul etmiyor; geçici, satırda "geçici" notu).
 *      Ayrıca `dersler` ya da `requires.gramer`daki hiçbir kimlik omurgada daha SONRAKİ bir haftaya ait olamaz.
 *  (d) haftalar arası aynı görev cümlesi yok (Almanca, `sade` ile karşılaştırılır; ≥ 3 sözcüklü cümleler; aynı hafta içi serbest).
 * Kapsam: `halkalar` olan (birleşmiş biçim) günler. Halkasız eski biçim günler tabloda "atlandı" görünür; `--tum` ile onlar da sayılır.
 *
 * Kullanım:  node --experimental-strip-types content/tools/dikis.ts [--tablo <yol>] [--gun N]... [--tum] [--json <çıktı>]
 * Çıkış: 0 ihlal yok · 1 ihlal var · 2 tablo yok ya da okunamadı.
 */
import { bilinmeyenler, kalipSecenekleri, toks, type Bilinen, type KumeDizini } from "../../packages/shared/src/kume.ts";
import type { Lexeme, TemelDers } from "../../packages/shared/src/index.ts";

/** a1-kesin.json'un denetçinin okuduğu kısmı */
export interface KesinTablo {
  ogretilmis_sayilan?: { gunler?: Record<string, string[]> };
  gunler: { day: number; hafta?: number; kartlar: string[]; dersler?: string[] }[];
}
/** omurga.json'un okunan kısmı */
export interface Omurga { gunler: { day: number; dersler?: string[] }[] }
/** gün dosyası (şemasız) */
export type GunHam = Record<string, unknown> & { day: number; yeni_kartlar?: string[]; dersler?: string[]; halkalar?: unknown[] };

export type Kural = "a" | "b" | "c" | "d";
export interface Ihlal { gun: number; kural: Kural; yer: string; mesaj: string }
export interface GunSatiri { gun: number; hafta: number; dosya: string; durum: "denetlendi" | "atlandı"; neden?: string; sayi: Record<Kural, number>; not: string[] }
export interface DikisSonuc { satirlar: GunSatiri[]; ihlaller: Ihlal[]; toplam: number }

export const haftaOf = (gun: number) => Math.ceil(gun / 7);
/** Karşılaştırma için sade biçim (m1check.sade ile aynı; ümlaut korunur) */
const sade = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–-]/g, " ").replace(/\s+/g, " ").trim();
const dizi = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const nesne = (x: unknown): Record<string, unknown> => (x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : {});
const yazi = (x: unknown): string | undefined => (typeof x === "string" && x.trim() ? x : undefined);
const ilkKabul = (o: Record<string, unknown>) => yazi(dizi(o.accepted)[0]);

/** Tablo: gün → kesin kart kümesi (1.–7. gün `ogretilmis_sayilan.gunler`, sonrası `gunler[]`) */
export function tabloGunleri(t: KesinTablo): Map<number, string[]> {
  const m = new Map<number, string[]>();
  for (const [k, v] of Object.entries(t.ogretilmis_sayilan?.gunler ?? {})) m.set(Number(k), [...v]);
  for (const g of t.gunler ?? []) m.set(g.day, [...g.kartlar]);
  return m;
}

type Cumle = { yer: string; de: string; haric?: string[] };
/** Halka dışı adımlarda öğrencinin ürettiği ya da seçtiği Almanca (kural b ve d) */
export function halkaDisiGorevler(g: GunHam): Cumle[] {
  const r: Cumle[] = [];
  const ekle = (yer: string, de: unknown, haric?: string[]) => { const s = yazi(de); if (s) r.push({ yer, de: s, ...(haric ? { haric } : {}) }); };
  const bolumler = (at: string, kayit: Record<string, unknown>, satir: Map<string, string>) => {
    for (const b0 of dizi(kayit.bolumler)) {
      const b = nesne(b0); const bat = `${at}/${String(b.id ?? "?")}`;
      for (const d0 of dizi(b.dikte)) {
        const d = nesne(d0); const dat = `${bat}/dikte ${String(d.id ?? "?")}`;
        if (d.seviye === "kolay") { const o = dizi(d.opts); ekle(dat, typeof d.ans === "number" ? o[d.ans] : undefined); }
        else if (d.seviye === "orta") ekle(dat, ilkKabul(d));   // yalnız boşluğun cevabı (m1check ile aynı); çevresi dinlenen cümledir
        else if (d.seviye === "gercek") { ekle(dat, d.ornek_de); for (const z of dizi(d.zorunlu)) ekle(dat, z); }
        else ekle(dat, ilkKabul(d));
      }
      for (const id of dizi(b.golge)) ekle(`${bat}/gölge ${String(id)}`, satir.get(String(id)));
      const c = nesne(b.cevapla);
      if (Object.keys(c).length) { ekle(`${bat}/cevapla`, c.prompt_de); ekle(`${bat}/cevapla`, ilkKabul(c)); }
    }
  };
  const sahne = nesne(g.sahne);
  if (Object.keys(sahne).length) bolumler(`sahne ${String(sahne.id ?? "")}`, sahne, new Map(dizi(sahne.sahneler).map((s) => [String(nesne(s).id), String(nesne(s).de ?? "")])));
  for (const a0 of dizi(g.sesler)) { const a = nesne(a0); bolumler(`ses ${String(a.id ?? "")}`, a, new Map(dizi(a.script).map((s) => [String(nesne(s).id), String(nesne(s).de ?? "")]))); }
  for (const v0 of dizi(g.gorsel)) { const v = nesne(v0); ekle(`resimden seç ${String(v.id ?? "")}`, v.de); }
  const p = nesne(g.prova);
  for (const n0 of dizi(p.dugumler)) for (const s0 of dizi(nesne(n0).secenekler)) {
    const s = nesne(s0); if (s.uygun === false) continue;
    const at = `prova ${String(nesne(n0).id ?? "")}`, k = ilkKabul(s);
    ekle(at, s.de); if (k && (typeof s.de !== "string" || sade(k) !== sade(s.de))) ekle(at, k);
  }
  const y = nesne(nesne(g.okuma_yazma).yazma);
  ekle("yazma", y.ornek_de); for (const z of dizi(y.zorunlu)) ekle("yazma/zorunlu", z);
  for (const m0 of dizi(nesne(g.gun_sinavi).maddeler)) {
    const m = nesne(m0); const at = `gün sınavı ${String(m.id ?? "")}`;
    ekle(at, m.audio_de); ekle(at, m.prompt_de); ekle(at, typeof m.de === "string" && m.k !== "order" ? m.de.replace(/___/g, " ") : undefined); ekle(at, ilkKabul(m));
  }
  return r;
}

/** Halka görevleri (kural b ve d): halkanın görev cümleleri ve ilk kabulleri */
function halkaGorevleri(h: Record<string, unknown>): Cumle[] {
  const at = `halka ${String(h.id ?? "?")}`; const r: Cumle[] = [];
  for (const gc0 of dizi(h.gorev_cumleleri)) {
    const gc = nesne(gc0); const de = yazi(gc.de);
    if (de) r.push({ yer: `${at} ${String(gc.kart ?? "")}`, de: de.replace(/___/g, " ") });
    const k = ilkKabul(gc); if (k && (!de || sade(k) !== sade(de))) r.push({ yer: `${at} ${String(gc.kart ?? "")}`, de: k });
  }
  return r;
}

/** garden.ts ESDIZIM_ACIK / esdizimler ile aynı sıra: boşluk cevabında geçen eşdizim önce, sonra içerikteki sıra; ilk 3 açık */
export function acikEsdizimler(l: Pick<Lexeme, "de" | "art" | "forms" | "collocations">): string[] {
  const kendi = new Set(toks(`${l.art ?? ""} ${l.de}`));
  const cevap = new Set((l.forms ?? []).flatMap((f) => toks(f.answer.replace(/\s*…\s*/g, " "))).filter((w) => !kendi.has(w)));
  return (l.collocations ?? []).map((c, k) => ({ c, k, p: toks(c.de).some((w) => cevap.has(w)) ? 1 : 0 }))
    .sort((a, b) => b.p - a.p || a.k - b.k).slice(0, 3).map((x) => x.c.de);
}
/** Gösterilmiş kalıplar: bilinen kartların açık eşdizimleri + biten derslerin çok sözcüklü `exp.parcalar`ı */
function gosterilenKaliplar(d: KumeDizini, kartlar: Iterable<string>, biten: Iterable<string>, dersler?: ReadonlyMap<string, TemelDers>): string[][] {
  const r: string[][] = [];
  for (const id of kartlar) { const l = d.kartlar.get(id); if (l) for (const c of acikEsdizimler(l)) r.push(...kalipSecenekleri(c)); }
  for (const id of biten) for (const t of dersler?.get(id)?.teach ?? []) {
    const parcalar = (t as unknown as { exp?: { parcalar?: { de?: string }[] } }).exp?.parcalar ?? [];
    for (const p of parcalar) { const kp = kalipSecenekleri(p.de); for (const x of kp) if (x.length > 1) r.push(x); }
  }
  return r;
}

export interface DikisGirdi {
  gunler: { file: string; data: GunHam }[];
  tablo: KesinTablo;
  omurga: Omurga;
  dizin: KumeDizini;
  /** temel dersler (biten dersin `exp.parcalar` kalıpları için) */
  dersler?: ReadonlyMap<string, TemelDers>;
  /** yalnız bu günler denetlenir (boşsa hepsi); (d) için bütün günlerin cümleleri yine toplanır */
  sadece?: number[];
  /** halkasız (eski biçim) günleri de denetle */
  tum?: boolean;
}

export function dikisDenetle(g: DikisGirdi): DikisSonuc {
  const tablo = tabloGunleri(g.tablo);
  const omurgaDers = new Map(g.omurga.gunler.map((x) => [x.day, x.dersler ?? []] as const));
  // ders → omurgada geçtiği en erken gün (sonraki hafta kontrolü)
  const dersIlk = new Map<string, number>();
  for (const x of [...g.omurga.gunler].sort((a, b) => a.day - b.day)) for (const d of x.dersler ?? []) if (!dersIlk.has(d)) dersIlk.set(d, x.day);
  // tablodaki kart → gün (rapor için: "lx:Zeit 8. günün kartı")
  const kartGunu = new Map<string, number>();
  for (const [gun, ks] of [...tablo].sort((a, b) => a[0] - b[0])) for (const k of ks) if (!kartGunu.has(k)) kartGunu.set(k, gun);
  const ihlaller: Ihlal[] = [], satirlar: GunSatiri[] = [];
  const sirali = [...g.gunler].sort((a, b) => a.data.day - b.data.day);
  // (d) için: sade cümle → ilk görüldüğü (hafta, gün, yer)
  const gorulen = new Map<string, { hafta: number; gun: number; yer: string }[]>();

  for (const { file, data: gun } of sirali) {
    const n = gun.day, hafta = haftaOf(n);
    const halkalar = dizi(gun.halkalar).map(nesne);
    const satir: GunSatiri = { gun: n, hafta, dosya: file, durum: "denetlendi", sayi: { a: 0, b: 0, c: 0, d: 0 }, not: [] };
    const ihlal = (kural: Kural, yer: string, mesaj: string) => { ihlaller.push({ gun: n, kural, yer, mesaj }); satir.sayi[kural]++; };
    const denetle = (!g.sadece?.length || g.sadece.includes(n)) && (g.tum || halkalar.length > 0);
    // görev cümleleri: (d) bütün günlerden toplanır
    const gorevler = [...halkalar.flatMap(halkaGorevleri), ...halkaDisiGorevler(gun)];
    for (const c of gorevler) {
      const s = sade(c.de); if (toks(s).length < 3) continue;
      const l = gorulen.get(s) ?? []; l.push({ hafta, gun: n, yer: c.yer }); gorulen.set(s, l);
    }
    if (!denetle) { satir.durum = "atlandı"; satir.neden = halkalar.length ? "seçilmedi" : "halkasız (eski biçim)"; satirlar.push(satir); continue; }

    // (a)
    const bekl = tablo.get(n);
    const yeni = [...(gun.yeni_kartlar ?? [])];
    if (!bekl) ihlal("a", "yeni_kartlar", `tabloda ${n}. gün yok`);
    else {
      const b = new Set(bekl), y = new Set(yeni);
      const eksik = bekl.filter((x) => !y.has(x)), fazla = yeni.filter((x) => !b.has(x));
      const cift = yeni.filter((x, i) => yeni.indexOf(x) !== i);
      for (const x of eksik) ihlal("a", "yeni_kartlar", `eksik ${x}`);
      for (const x of fazla) ihlal("a", "yeni_kartlar", `fazla ${x}${kartGunu.has(x) ? ` (tabloda ${kartGunu.get(x)}. gün)` : " (tabloda yok)"}`);
      for (const x of new Set(cift)) ihlal("a", "yeni_kartlar", `iki kez ${x}`);
    }

    // (c)
    const omDers = omurgaDers.get(n);
    let dersler = [...(gun.dersler ?? [])];
    const gramer = dizi(nesne(gun.requires).gramer).filter((x): x is string => typeof x === "string");
    if (omDers === undefined) ihlal("c", "dersler", `omurgada ${n}. gün yok`);
    else {
      if (!dersler.length && omDers.length && gramer.length) { dersler = gramer.filter((x) => omDers.includes(x) || /^(gr|dn|r0):/.test(x)); satir.not.push("dersler boş; requires.gramer sayıldı (geçici)"); }
      const o = new Set(omDers), d = new Set(dersler);
      for (const x of omDers) if (!d.has(x)) ihlal("c", "dersler", `eksik ${x} (omurga ${n}. gün)`);
      for (const x of dersler) if (!o.has(x)) ihlal("c", "dersler", `fazla ${x}${dersIlk.has(x) ? ` (omurgada ${dersIlk.get(x)}. gün)` : " (omurgada yok)"}`);
    }
    for (const x of new Set([...(gun.dersler ?? []), ...gramer])) {
      const ilk = dersIlk.get(x);
      if (ilk !== undefined && haftaOf(ilk) > hafta) ihlal("c", (gun.dersler ?? []).includes(x) ? "dersler" : "requires.gramer", `${x} ${haftaOf(ilk)}. haftanın dersi (omurga ${ilk}. gün)`);
    }

    // (b) K(t): tablodaki önceki günler + önceki günlerin dersleri; gün içinde halkalar sırayla
    const onceKart = new Set<string>(), onceDers = new Set<string>();
    for (const [gn, ks] of tablo) if (gn < n) for (const k of ks) onceKart.add(k);
    for (const [gn, ds] of omurgaDers) if (gn < n) for (const x of ds) onceDers.add(x);
    const bugunDers = new Set(dersler);
    const bugunDersKart = [...bugunDers].flatMap((id) => [...(g.dizin.dersler.get(id)?.kart ?? [])]);
    const kartIhlali = (yer: string, de: string, k: Bilinen) => {
      for (const u of bilinmeyenler(g.dizin, de, k)) {
        if (u.tur !== "kart") continue;
        const nerede = (u.adaylar ?? []).map((a) => `${a}${kartGunu.has(a) ? ` → ${kartGunu.get(a)}. gün` : " → tabloda yok"}`).join(", ");
        ihlal("b", yer, `"${u.sozcuk}" tanıtılmadan soruluyor (${nerede}): ${de}`);
      }
    };
    const gorulenKart = new Set<string>(); const kaliplar: string[][] = [];
    for (const h of halkalar) {
      for (const kp of dizi(h.kaliplar)) kaliplar.push(...kalipSecenekleri(String(nesne(kp).de ?? "")));
      const kartlar = dizi(h.kartlar).map(String);
      const sonra = h.dersten_sonra === true;
      const kart = new Set([...onceKart, ...gorulenKart, ...kartlar, ...(sonra ? bugunDersKart : [])]), biten = new Set([...onceDers, ...(sonra ? bugunDers : [])]);
      const k: Bilinen = { kart, biten, kaliplar: [...kaliplar, ...gosterilenKaliplar(g.dizin, kart, biten, g.dersler)] };
      for (const c of halkaGorevleri(h)) kartIhlali(c.yer, c.de, k);
      for (const x of kartlar) gorulenKart.add(x);
    }
    const kartG = new Set([...onceKart, ...yeni, ...gorulenKart, ...bugunDersKart]), bitenG = new Set([...onceDers, ...bugunDers]);
    const kGun: Bilinen = { kart: kartG, biten: bitenG, kaliplar: [...kaliplar, ...gosterilenKaliplar(g.dizin, kartG, bitenG, g.dersler)] };
    for (const c of halkaDisiGorevler(gun)) kartIhlali(c.yer, c.de, kGun);
    satirlar.push(satir);
  }

  // (d) haftalar arası aynı görev cümlesi: denetlenen günlerin, başka haftada da geçen cümleleri
  const denetlenen = new Set(satirlar.filter((s) => s.durum === "denetlendi").map((s) => s.gun));
  for (const [s, yerler] of gorulen) {
    const haftalar = new Set(yerler.map((y) => y.hafta));
    if (haftalar.size < 2) continue;
    const ilk = yerler.reduce((a, b) => (b.gun < a.gun ? b : a));
    for (const y of yerler) {
      if (y.hafta === ilk.hafta || !denetlenen.has(y.gun)) continue;
      const satir = satirlar.find((x) => x.gun === y.gun)!;
      ihlaller.push({ gun: y.gun, kural: "d", yer: y.yer, mesaj: `aynı görev cümlesi ${ilk.hafta}. haftada da var (${ilk.gun}. gün, ${ilk.yer}): ${s}` });
      satir.sayi.d++;
    }
  }
  return { satirlar, ihlaller, toplam: ihlaller.length };
}

/** Gün gün tablo (Markdown) + ihlal listesi */
export function rapor(r: DikisSonuc): string {
  const L = ["| gün | hafta | durum | (a) kart | (b) sıra | (c) ders | (d) tekrar | not |", "|---:|---:|---|---:|---:|---:|---:|---|"];
  for (const s of r.satirlar) {
    const say = (k: Kural) => (s.durum === "atlandı" ? "–" : String(s.sayi[k]));
    L.push(`| ${s.gun} | ${s.hafta} | ${s.durum === "atlandı" ? `atlandı: ${s.neden}` : "denetlendi"} | ${say("a")} | ${say("b")} | ${say("c")} | ${say("d")} | ${s.not.join("; ")} |`);
  }
  L.push("", `İhlal: ${r.toplam}`);
  for (const i of r.ihlaller) L.push(`- ${i.gun}. gün (${i.kural}) ${i.yer}: ${i.mesaj}`);
  return L.join("\n");
}
