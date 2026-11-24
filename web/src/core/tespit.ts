/**
 * A1 seviye tespiti motoru (PM-115 md. 1–3; PR 2/3). Saf, yapay zekâsız; ekran ve depo ayrı (PR 2b).
 *  - Aşama 1 (tarama): dört beceri çekirdeği + her hafta 2–3 tarama maddesi + `kelime.tarama` kelimelik örnek.
 *  - Hafta "oturmuş": bütün tarama maddeleri doğru ve kelime örneğinde en çok `oturmus.kelime_hata_max` yanlış → derine inilmez.
 *  - Aşama 2 (derin): yalnız oturmamış haftalar; `derinSec` (doğrulayıcıyla aynı seçim, havuz sırası) + `kelime.derin` kelime
 *    (taramada sorulmamış kartlardan).
 *  - Rapor: altı beceri, sekiz hafta, zayıf can_do ve dil noktası (yalnız ÜRETİM maddesinden: seçmeli madde tek başına "biliyor"
 *    kanıtı değildir), bilinmeyen kelime; karar `policy.seviye_tespiti.karar`.
 * Plan belirlenimlidir: aynı paket + aynı cevaplar aynı adımları verir (yarıda bırak / sürdür: yalnız cevaplar saklanır).
 * "Bilmiyorum" yanlış sayılır (tahmin şişirmesin). "sayilmadi": cevap verildi ama denetlenemedi (yapay zekâ düştü; PM-112 A.3):
 * plan ilerler, oranlara ve "oturmuş" kararına girmez.
 */
import { derinSec, type TespitBeceri, type TespitCozulen, type TespitPaket } from "@dw/shared";
import POLICY from "../policy.json" with { type: "json" };

export const TESPIT = POLICY.seviye_tespiti;
export type TespitPolitika = typeof TESPIT;
export type Sonuc = "dogru" | "yanlis" | "bilmiyorum" | "sayilmadi";
const sayilir = (c: Cevaplar, id: string) => c.has(id) && c.get(id) !== "sayilmadi";
export type Cevaplar = ReadonlyMap<string, Sonuc>;
export const BECERILER: readonly TespitBeceri[] = ["dinleme", "okuma", "yazma", "konusma", "kelime", "dil"];

/** Planın bir adımı: havuz maddesi ya da kelime örneği (`kelime:<hafta>:<kart>`; aynı kart iki haftada geçse de kimlik çakışmaz) */
export interface Adim {
  id: string;
  /** "cekirdek" | "tarama" | "derin" */
  asama: "cekirdek" | "tarama" | "derin";
  hafta: number | null;
  beceri: TespitBeceri;
  uretim: boolean;
  madde?: TespitCozulen;
  kart?: string;
}

/** Kimliğin kararlı karması (kelime örneği her cihazda aynı) */
const karma = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0; return h; };
/** Haftanın kartlarından `n` tanesi, `haric` dışından, karma sırasıyla (rastgele değil, yeniden üretilebilir) */
export function kelimeOrnegi(kartlar: readonly string[], n: number, haric: ReadonlySet<string> = new Set()): string[] {
  return [...new Set(kartlar)].filter((k) => !haric.has(k)).sort((a, b) => karma(a) - karma(b) || (a < b ? -1 : 1)).slice(0, n);
}
const kelimeAdimi = (kart: string, hafta: number, asama: "tarama" | "derin"): Adim => ({ id: `kelime:${hafta}:${kart}`, asama, hafta, beceri: "kelime", uretim: false, kart });
const maddeAdimi = (m: TespitCozulen): Adim => ({ id: m.id, asama: m.asama, hafta: m.asama === "cekirdek" ? null : m.hafta, beceri: m.beceri, uretim: m.uretim, madde: m });

/** Aşama 1: çekirdek (dinleme, okuma, yazma, konuşma sırasıyla) + hafta hafta tarama maddeleri ve kelime örneği */
export function taramaPlani(p: TespitPaket, P: TespitPolitika = TESPIT): Adim[] {
  const out: Adim[] = p.cekirdek.map(maddeAdimi);
  for (const h of p.haftalar) {
    out.push(...p.maddeler.filter((m) => m.asama === "tarama" && m.hafta === h.hafta).map(maddeAdimi));
    out.push(...kelimeOrnegi(h.kartlar, P.kelime.tarama).map((k) => kelimeAdimi(k, h.hafta, "tarama")));
  }
  return out;
}

/** Tarama sonrası haftanın durumu: "eksik" (cevaplanmamış adım var), "oturmus" ya da "zayif" */
export function haftaDurumu(p: TespitPaket, hafta: number, c: Cevaplar, P: TespitPolitika = TESPIT): "eksik" | "oturmus" | "zayif" {
  const adimlar = taramaPlani(p, P).filter((a) => a.hafta === hafta && a.asama === "tarama");
  if (adimlar.some((a) => !c.has(a.id))) return "eksik";
  const maddeler = adimlar.filter((a) => a.beceri !== "kelime" && sayilir(c, a.id));
  if (!maddeler.length) return "zayif"; // tarama maddesi yoksa (ya da hiçbiri sayılmadıysa) hafta yargılanamaz: derin bakış
  const kelimeHata = adimlar.filter((a) => a.beceri === "kelime" && sayilir(c, a.id) && c.get(a.id) !== "dogru").length;
  return maddeler.every((a) => c.get(a.id) === "dogru") && kelimeHata <= P.oturmus.kelime_hata_max ? "oturmus" : "zayif";
}

/** Aşama 2: verilen haftaların derin bakışı (haftalar bağımsız seçilir; birden çok haftada aynı madde bir kez sorulur) */
export function derinPlani(p: TespitPaket, zayif: readonly number[], P: TespitPolitika = TESPIT): Adim[] {
  const out: Adim[] = [], gorulen = new Set<string>();
  for (const h of p.haftalar.filter((x) => zayif.includes(x.hafta))) {
    const hd = { can_do: h.can_do.map((x) => x.id), dil_noktasi: h.dil_noktasi.map((x) => x.id) };
    for (const m of derinSec(p.maddeler, hd, P.derin).secilen) if (!gorulen.has(m.id)) { gorulen.add(m.id); out.push({ ...maddeAdimi(m), hafta: h.hafta }); }
    const tarandi = new Set(kelimeOrnegi(h.kartlar, P.kelime.tarama));
    out.push(...kelimeOrnegi(h.kartlar, P.kelime.derin, tarandi).map((k) => kelimeAdimi(k, h.hafta, "derin")));
  }
  return out;
}

export interface TespitPlani {
  /** 1 = tarama sürüyor; 2 = derin bakış sürüyor; "bitti" = rapor hazır */
  asama: 1 | 2 | "bitti";
  adimlar: Adim[];
  /** sıradaki cevaplanmamış adım */
  siradaki: Adim | null;
  zayifHaftalar: number[];
  /** kalan adım sayısı ve tahmini dakika (policy `sure_sn`) */
  kalan: number;
  kalanDk: number;
}
export const adimSn = (a: Adim, P: TespitPolitika = TESPIT) => (a.beceri === "kelime" ? P.sure_sn.kelime : a.uretim ? P.sure_sn.uretim : P.sure_sn.secmeli);
const dk = (adimlar: readonly Adim[], P: TespitPolitika) => Math.max(0, Math.round(adimlar.reduce((s, a) => s + adimSn(a, P), 0) / 60));

/** Bütün plan, cevaplara göre: tarama bitmeden derin bakış açılmaz; derin bakış yalnız zayıf haftalara */
export function tespitPlani(p: TespitPaket, c: Cevaplar, P: TespitPolitika = TESPIT): TespitPlani {
  const t = taramaPlani(p, P);
  const taramaKalan = t.filter((a) => !c.has(a.id));
  if (taramaKalan.length) return { asama: 1, adimlar: t, siradaki: taramaKalan[0]!, zayifHaftalar: [], kalan: taramaKalan.length, kalanDk: dk(taramaKalan, P) };
  const zayif = p.haftalar.map((h) => h.hafta).filter((w) => haftaDurumu(p, w, c, P) === "zayif");
  const d = derinPlani(p, zayif, P).filter((a) => !t.some((x) => x.id === a.id));
  const adimlar = [...t, ...d];
  const kalan = d.filter((a) => !c.has(a.id));
  return { asama: kalan.length ? 2 : "bitti", adimlar, siradaki: kalan[0] ?? null, zayifHaftalar: zayif, kalan: kalan.length, kalanDk: dk(kalan, P) };
}
/** Tahmini toplam süre (dk): tarama + her hafta zayıf çıkarsa derin bakış (giriş ekranı "en çok" süreyi de gösterebilsin) */
export function tahminiDk(p: TespitPaket, P: TespitPolitika = TESPIT): { tarama: number; hafta_basi_derin: number } {
  const n = p.haftalar.length || 1;
  return { tarama: dk(taramaPlani(p, P), P), hafta_basi_derin: Math.round(dk(derinPlani(p, p.haftalar.map((h) => h.hafta), P), P) / n) };
}

/* ---------- rapor ve karar ---------- */
export interface Oran { dogru: number; toplam: number; oran: number | null }
const oran = (dogru: number, toplam: number): Oran => ({ dogru, toplam, oran: toplam ? dogru / toplam : null });
export interface ZayifCanDo { id: string; tr: string; gun: number; dogru: number; toplam: number }
export interface ZayifDilNoktasi { id: string; ad_tr: string; hafta: number; dogru: number; toplam: number }
export type Karar = "a2" | "tamamla" | "bastan";
/** Kararın gerekçesi: tutmayan (ya da a2'de tutan) eşikler; ekran cümleyi buradan kurar. `olcum`: hafta pakette yok ya da
 *  üretim maddesiyle ölçülmedi (ölçülmeyen hafta A2'yi açmaz; oran 0) */
export interface KararNedeni { tur: "genel" | "beceri" | "hafta" | "olcum"; ad: string; oran: number; esik: number }
/** Eşik karşılaştırması: oranlar kayan noktalı ortalama, tam eşitlik geçer (4/5, 3/4, 3/4, 9/10 → %80) */
const EPS = 1e-9;
const enAz = (o: number, esik: number) => o >= esik - EPS;
export interface TespitRaporu {
  beceri: Record<TespitBeceri, Oran>;
  /** hafta oranı yalnız ÜRETİM maddelerinden (kelime ve seçmeli sulandırmaz; PM-115 md. 1) */
  hafta: { hafta: number; oran: Oran; durum: "eksik" | "oturmus" | "zayif" }[];
  /** ölçülen becerilerin ortalaması (madde sayısı çok olan beceri baskın olmasın) */
  genel: number;
  zayifCanDo: ZayifCanDo[];
  zayifDilNoktasi: ZayifDilNoktasi[];
  /** kelime örneğinde bilinmeyen kartlar (Kelime Bahçesi'ne gider) */
  bilinmeyenKelime: string[];
  /** sorulan bütün madde kimlikleri (çıkış yoklaması bunları ikinci kez sormaz) */
  sorulan: string[];
  /** plan bitti mi; bitmemişse karar null (yarıda kalan rapor karar göstermez) */
  bitti: boolean;
  karar: Karar | null;
  nedenler: KararNedeni[];
}

/** Karar: `hafta` A1'in bütün haftalarını (1…a1_hafta) kapsamalı; eksik ya da ölçülmemiş hafta A2'yi açmaz */
export function tespitKarari(beceri: Record<TespitBeceri, Oran>, hafta: { hafta: number; oran: Oran }[], genel: number, P: TespitPolitika = TESPIT): { karar: Karar; nedenler: KararNedeni[] } {
  const K = P.karar;
  if (!enAz(genel, K.bastan_genel_alti)) return { karar: "bastan", nedenler: [{ tur: "genel", ad: "genel", oran: genel, esik: K.bastan_genel_alti }] };
  const nedenler: KararNedeni[] = [];
  if (!enAz(genel, K.a2_genel_min)) nedenler.push({ tur: "genel", ad: "genel", oran: genel, esik: K.a2_genel_min });
  for (const b of BECERILER) { const o = beceri[b].oran; if (o !== null && !enAz(o, K.a2_beceri_min)) nedenler.push({ tur: "beceri", ad: b, oran: o, esik: K.a2_beceri_min }); }
  for (let w = 1; w <= P.a1_hafta; w++) {
    const o = hafta.find((h) => h.hafta === w)?.oran.oran ?? null;
    if (o === null) nedenler.push({ tur: "olcum", ad: String(w), oran: 0, esik: K.a2_hafta_min });
    else if (!enAz(o, K.a2_hafta_min)) nedenler.push({ tur: "hafta", ad: String(w), oran: o, esik: K.a2_hafta_min });
  }
  return nedenler.length ? { karar: "tamamla", nedenler } : { karar: "a2", nedenler: [{ tur: "genel", ad: "genel", oran: genel, esik: K.a2_genel_min }] };
}

/** Rapor: yalnız cevaplanmış adımlar sayılır (yarıda bırakılmış tespitte de çağrılabilir; karar ancak plan "bitti" iken anlamlı) */
export function tespitRaporu(p: TespitPaket, c: Cevaplar, P: TespitPolitika = TESPIT): TespitRaporu {
  const plan = tespitPlani(p, c, P);
  // denetlenemeyen ("sayilmadi") cevap oranlara girmez; sorulan listesinde kalır (çıkış yoklaması aynı maddeyi sormaz)
  const cevapli = plan.adimlar.filter((a) => sayilir(c, a.id));
  const ok = (a: Adim) => c.get(a.id) === "dogru";
  const beceri = Object.fromEntries(BECERILER.map((b) => { const x = cevapli.filter((a) => a.beceri === b); return [b, oran(x.filter(ok).length, x.length)]; })) as Record<TespitBeceri, Oran>;
  const hafta = p.haftalar.map((h) => {
    const x = cevapli.filter((a) => a.asama !== "cekirdek" && a.hafta === h.hafta && a.madde && a.uretim);
    return { hafta: h.hafta, oran: oran(x.filter(ok).length, x.length), durum: haftaDurumu(p, h.hafta, c, P) };
  });
  const olculen = BECERILER.map((b) => beceri[b].oran).filter((o): o is number => o !== null);
  const genel = olculen.length ? olculen.reduce((s, o) => s + o, 0) / olculen.length : 0;
  // zayıf can_do / dil noktası: yalnız üretim maddeleri (çekirdek hariç; çekirdek haftadan bağımsız beceri ölçer)
  const uretim = cevapli.filter((a) => a.madde && a.uretim && a.asama !== "cekirdek");
  const zayifCanDo: ZayifCanDo[] = [];
  for (const h of p.haftalar) for (const cd of h.can_do) {
    const x = uretim.filter((a) => a.madde!.can_do.includes(cd.id));
    const d = x.filter(ok).length;
    if (x.length && d < x.length) zayifCanDo.push({ id: cd.id, tr: cd.tr, gun: cd.gun, dogru: d, toplam: x.length });
  }
  const zayifDilNoktasi: ZayifDilNoktasi[] = [];
  for (const h of p.haftalar) for (const dn of h.dil_noktasi) {
    const x = uretim.filter((a) => a.madde!.dil_noktasi.includes(dn.id));
    const d = x.filter(ok).length;
    if (x.length && d < x.length) zayifDilNoktasi.push({ id: dn.id, ad_tr: dn.ad_tr, hafta: h.hafta, dogru: d, toplam: x.length });
  }
  const bilinmeyenKelime = [...new Set(cevapli.filter((a) => a.kart && !ok(a)).map((a) => a.kart!))];
  const bitti = plan.asama === "bitti";
  const k = bitti ? tespitKarari(beceri, hafta, genel, P) : { karar: null, nedenler: [] };
  return { beceri, hafta, genel, zayifCanDo: zayifCanDo.sort((a, b) => a.gun - b.gun), zayifDilNoktasi, bilinmeyenKelime, sorulan: plan.adimlar.filter((a) => a.madde && c.has(a.id)).map((a) => a.id), bitti, ...k };
}

/* ---------- ekran için bölümler (PM-120 md. 4 b–c) ---------- */
/** Bölüm: çekirdek (dört beceri), haftanın taraması ya da zayıf haftanın derin bakışı; plan sırasıyla */
export interface Bolum { anahtar: string; tur: "cekirdek" | "tarama" | "derin"; hafta: number | null; adimlar: Adim[] }
export function bolumler(plan: Pick<TespitPlani, "adimlar">): Bolum[] {
  const out: Bolum[] = [];
  for (const a of plan.adimlar) {
    const tur = a.asama;
    const anahtar = tur === "cekirdek" ? "cekirdek" : `${tur}:${a.hafta}`;
    const son = out[out.length - 1];
    if (son && son.anahtar === anahtar) son.adimlar.push(a);
    else out.push({ anahtar, tur, hafta: tur === "cekirdek" ? null : a.hafta, adimlar: [a] });
  }
  return out;
}
/** Bitmiş bölüm sayısı (bütün adımları cevaplanmış) ve toplam; tarama sürerken derin bölümler henüz bilinmez */
export function bolumSayaci(plan: Pick<TespitPlani, "adimlar">, c: Cevaplar): { bitti: number; toplam: number } {
  const b = bolumler(plan);
  return { bitti: b.filter((x) => x.adimlar.every((a) => c.has(a.id))).length, toplam: b.length };
}
/** Tespitin düz metin raporu ("Raporu kopyala"; kişisel bilgi yok) */
export function raporMetni(r: TespitRaporu, adlar: { beceri: Record<TespitBeceri, string>; karar: Record<Karar, string> }): string {
  const y = (o: number | null) => (o === null ? "ölçülmedi" : `%${Math.round(o * 100)}`);
  const satir: string[] = ["Seviye raporu (A1)"];
  if (r.karar) satir.push(`Karar: ${adlar.karar[r.karar]}`);
  satir.push(`Genel: ${y(r.genel)}`, "", "Beceriler:");
  for (const b of BECERILER) satir.push(`- ${adlar.beceri[b]}: ${y(r.beceri[b].oran)} (${r.beceri[b].dogru}/${r.beceri[b].toplam})`);
  satir.push("", "Haftalar:");
  for (const h of r.hafta) satir.push(`- ${h.hafta}. hafta: ${y(h.oran.oran)}`);
  if (r.zayifCanDo.length) { satir.push("", "Zorlandıkların:"); for (const z of r.zayifCanDo) satir.push(`- ${z.gun}. gün (${z.dogru}/${z.toplam}): ${z.tr}`); }
  if (r.zayifDilNoktasi.length) { satir.push("", "Dil noktaları:"); for (const z of r.zayifDilNoktasi) satir.push(`- ${z.ad_tr || "Dil noktası"} (${z.hafta}. hafta, ${z.dogru}/${z.toplam})`); }
  satir.push("", `Bilmediğin kelimeler: ${r.bilinmeyenKelime.length}`);
  return satir.join("\n");
}
