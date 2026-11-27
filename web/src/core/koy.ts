/**
 * Köy (Hedef 3, PM-084 md. 4): dükkân ızgarasının saf mantığı. Köy yeni özellik getirmez; her dükkân var olan bir ekranı açar.
 *  - alt satırdaki sayı yalnız cihazdaki gerçek veriden gelir (vadesi gelen kart, paketteki video, hazır durum);
 *    veri yoksa sayı yerine tanım satırı yazılır (uydurma sayı ve "0" yok)
 *  - açacak içeriği olmayan dükkân kilitli gösterilir; kilitli dükkân başka ekrana gitmez
 *  - "Telefonun" kartı yalnız açılmış günlerde dinlenmemiş ses kaydı varsa çizilir
 */
import { kartMi, type ContentIndex, type LearnerItem, type Lexeme } from "@dw/shared";
import { haftaOf, type Adim, type GunDurum } from "./gun.ts";
import { isDue } from "./srs.ts";
import { visibleScenarios } from "./season.ts";

/** Köyün adı: WORLD.md §1 ve content/v2/world/world.json `town.name` ("Wendlfing an der Vils") ile aynı (koy.test.ts bekçisi) */
export const KOY_ADI = "Wendlfing";

export const MEKANLAR = ["bahce", "sinema", "radyo", "kutuphane", "pazar"] as const;
/** Kendi sayfası olan mekânlar (`#/koy/<mekân>`); Atölye doğrudan Kalıplar ekranını açar */
export type MekanId = (typeof MEKANLAR)[number];
export const mekanMi = (x: string | undefined): x is MekanId => (MEKANLAR as readonly string[]).includes(x ?? "");
export const MEKAN_ADI: Record<MekanId, string> = { bahce: "Bahçe", sinema: "Sinema", radyo: "Radyo", kutuphane: "Kütüphane", pazar: "Pazar meydanı" };

export type DukkanId = MekanId | "atolye" | "kafe" | "tiyatro" | "gazete";
export interface Dukkan {
  id: DukkanId;
  ad: string;
  /** tek satır: gerçek sayı ya da tanım; kilitli dükkânda "ne zaman açılır" */
  alt: string;
  /** açık dükkânın açtığı ekran; kilitli dükkânda yok */
  href?: string;
  kilitli: boolean;
  /** bekleyen iş var (köşe noktası) */
  nokta: boolean;
}

export type YolGunu = GunDurum & { durum: "bitti" | "simdi" | "kilitli" };
export interface KoyVeri {
  index: Pick<ContentIndex, "m1" | "scenarios" | "domains">;
  /** Bahçe'de şu an vadesi gelmiş kart sayısı (`bekleyenKart`) */
  bekleyen: number;
  /** yolun günleri (ilerlemeyle); henüz yüklenmediyse boş */
  gunler: readonly YolGunu[];
  now: number;
}

/** Bahçe'de şu an vadesi gelmiş kartlar (yalnız sözcük kartı; Bahçe'nin tur kurarken saydığıyla aynı ölçü) */
export function bekleyenKart(items: Iterable<LearnerItem>, lex: ReadonlyMap<string, Pick<Lexeme, "card" | "pos">>, now: Date): number {
  let n = 0;
  for (const it of items) { const l = it.kind === "lexeme" ? lex.get(it.itemId) : undefined; if (l && kartMi(l) && (isDue(it, "passive", now) || isDue(it, "active", now))) n++; }
  return n;
}
/** sözlüğü yüklemeden ön eleme: vadesi gelmiş sözcük öğesi (kart olup olmadığı sözlükle kesinleşir) */
export const vadesiGelen = (it: LearnerItem, now: Date) => it.kind === "lexeme" && (isDue(it, "passive", now) || isDue(it, "active", now));

/**
 * Açılmış günler (biten ya da şu anki): Sinema ve Radyo yalnız bunları listeler ve sayar (#200 PM finali takip a; çok
 * haftalı içerikte öğretilmemiş günün videosu açılmaz). Plan henüz gelmediyse ya da kurulamadıysa yalnız ilk gün açıktır
 * (ilk gün hiç kilitli olmaz); planın yüklenemeyen günü açık sayılmaz.
 */
export function acikGunler(index: KoyVeri["index"], gunler: readonly YolGunu[]): Set<number> {
  if (gunler.length) return new Set(gunler.filter((g) => g.durum !== "kilitli").map((g) => g.day));
  const ilk = Math.min(...index.m1.map((g) => g.day));
  return new Set(Number.isFinite(ilk) ? [ilk] : []);
}
const medyaSayisi = (index: KoyVeri["index"], acik: ReadonlySet<number>, tur: "video" | "sahne" | "ses") =>
  index.m1.reduce((n, g) => n + (acik.has(g.day) ? g.medya.filter((m) => m.kind === tur).length : 0), 0);
/** açılmış (biten ya da şu anki) günlerin bitmemiş medya adımları */
function bekleyenMedya(gunler: readonly YolGunu[], alt: "video" | "ses"): Adim[] {
  return gunler.filter((g) => g.durum !== "kilitli").flatMap((g) => g.adimlar.filter((a) => a.tur === "medya" && a.alt === alt && a.hazir && !a.bitti));
}
/** en az bir dersi görünen (mevsimi gelmiş) alan sayısı */
export const hazirDurum = (index: KoyVeri["index"], now: number) => new Set(visibleScenarios(index.scenarios, now).map((s) => s.domain)).size;

export function dukkanlar(v: KoyVeri): Dukkan[] {
  const acik = acikGunler(v.index, v.gunler);
  const video = medyaSayisi(v.index, acik, "video"), sahne = medyaSayisi(v.index, acik, "sahne"), ses = medyaSayisi(v.index, acik, "ses");
  const hazir = hazirDurum(v.index, v.now);
  const ac = (id: DukkanId, ad: string, alt: string, href: string, nokta = false): Dukkan => ({ id, ad, alt, href, kilitli: false, nokta });
  const kilitli = (id: DukkanId, ad: string, alt: string): Dukkan => ({ id, ad, alt, kilitli: true, nokta: false });
  return [
    ac("bahce", "Bahçe", v.bekleyen > 0 ? `${v.bekleyen} tekrar bekliyor` : "Kelime tekrarı", "#/koy/bahce", v.bekleyen > 0),
    video + sahne > 0
      ? ac("sinema", "Sinema", video > 0 ? `${video} gerçek video` : "Köy dizisi", "#/koy/sinema", bekleyenMedya(v.gunler, "video").length > 0)
      : kilitli("sinema", "Sinema", "İlk videoyla açılır"),
    // dinlenmemiş kayıt "Telefonun" kartında görünür; aynı işi ikinci kez noktayla göstermez
    ses > 0 ? ac("radyo", "Radyo", "Anons, sesli mesaj", "#/koy/radyo") : kilitli("radyo", "Radyo", "İlk kayıtla açılır"),
    ac("atolye", "Atölye", "Cümle kalıpları", "#/kalip"),
    ac("kutuphane", "Kütüphane", "Okuma, sözlük", "#/koy/kutuphane"),
    ac("pazar", "Pazar meydanı", hazir > 0 ? `${hazir} durum hazır` : "Gündelik durumlar", "#/koy/pazar"),
    kilitli("kafe", "Kafe", "2. haftada açılır"),
    kilitli("tiyatro", "Tiyatro", "A1.2'de açılır"),
    kilitli("gazete", "Gazete bayisi", "A2.2'de açılır")
  ];
}

/** "Telefonun" kartı: açılmış günlerde dinlenmemiş ses kaydı; yoksa null (kart çizilmez) */
export function telefon(v: Pick<KoyVeri, "gunler">): { sayi: number; href: string; alt: string } | null {
  const b = bekleyenMedya(v.gunler, "ses");
  return b.length ? { sayi: b.length, href: b[0]!.href, alt: `${b.length} ses kaydı seni bekliyor` } : null;
}

/** Sinema ve Radyo listesi: yalnız açılmış günler (`acikGunler`), gün gün, o mekânın kayıtları */
export function mekanMedya(index: KoyVeri["index"], mekan: "sinema" | "radyo", acik: ReadonlySet<number>): { day: number; title_tr: string; kayitlar: { id: string; kind: "video" | "sahne" | "ses"; title_tr: string; href: string }[] }[] {
  const uygun = (k: string) => (mekan === "radyo" ? k === "ses" : k !== "ses");
  return index.m1.filter((g) => acik.has(g.day)).sort((a, b) => a.day - b.day)
    .map((g) => ({ day: g.day, title_tr: g.title_tr, kayitlar: g.medya.filter((m) => uygun(m.kind)).map((m) => ({ ...m, href: `#/m1/${g.day}/${encodeURIComponent(m.id)}` })) }))
    .filter((g) => g.kayitlar.length > 0);
}
/** Kütüphane (okuma) ve Pazar meydanı (prova): yalnız açılmış günlerin adımları (öğretilmemiş günün provası istenmez) */
export function acikAdimlar(gunler: readonly YolGunu[], tur: "okuma" | "prova"): (Adim & { day: number; gun_tr: string })[] {
  return gunler.filter((g) => g.durum !== "kilitli").flatMap((g) => g.adimlar.filter((a) => a.tur === tur && a.hazir).map((a) => ({ ...a, day: g.day, gun_tr: g.title_tr })));
}

/**
 * Köy listeleri haftaya göre katlanır (PM-122 md. 2.1, KAPI-İŞ 7122131212; Yol #243 gibi): listedeki en son hafta (açılmış
 * günlerden; içinde bulunulan hafta, o hafta bu mekânda öğe yoksa öğesi olan son hafta) açık gelir, öbür haftalar tek satır,
 * dokununca açılır. 52 haftada 51 satır tek başına gezginin ekran sınırına (80) yaklaşır: son `YAKIN_HAFTA` hafta ayrı satır,
 * daha eskiler (en az iki hafta) tek satırda ("1.–N. hafta"), dokununca hafta satırları açılır. Liste yalnız açılmış günlerden gelir (#224 kuralı).
 */
export const YAKIN_HAFTA = 4;
export interface HaftaKat<T> { hafta: number; ogeler: T[] }
export interface Katlar<T> { acik: HaftaKat<T> | null; yakin: HaftaKat<T>[]; eski: HaftaKat<T>[] }
export function haftaKatla<T extends { day: number }>(ogeler: readonly T[]): Katlar<T> {
  const m = new Map<number, T[]>();
  for (const o of ogeler) { const h = haftaOf(o.day); const l = m.get(h); if (l) l.push(o); else m.set(h, [o]); }
  const kat = [...m].sort((a, b) => a[0] - b[0]).map(([hafta, l]) => ({ hafta, ogeler: l.slice().sort((a, b) => a.day - b.day) }));
  const acik = kat.pop() ?? null;
  // eski kümede tek hafta kalacaksa kümelenmez ("1.–1. hafta" yok; inceleme #265 P1-1): o hafta da ayrı satır
  const kes = kat.length - YAKIN_HAFTA >= 2 ? kat.length - YAKIN_HAFTA : 0;
  return { acik, yakin: kat.slice(kes), eski: kat.slice(0, kes) };
}
/** ilk açılışta (hiçbir satır açılmamışken) listenin dokunulabilir öğe sayısı: eski haftalar satırı + yakın hafta satırları + açık haftanın öğeleri */
export function katDokunus<T>(k: Katlar<T>, ogeBasi: (o: T) => number): number {
  return (k.eski.length ? 1 : 0) + k.yakin.length + (k.acik?.ogeler.reduce((n, o) => n + ogeBasi(o), 0) ?? 0);
}
