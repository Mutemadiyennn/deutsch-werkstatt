/**
 * Köy (Hedef 3, PM-084 md. 4): dükkân ızgarasının saf mantığı. Köy yeni özellik getirmez; her dükkân var olan bir ekranı açar.
 *  - alt satırdaki sayı yalnız cihazdaki gerçek veriden gelir (vadesi gelen kart, paketteki video, hazır durum);
 *    veri yoksa sayı yerine tanım satırı yazılır (uydurma sayı ve "0" yok)
 *  - açacak içeriği olmayan dükkân kilitli gösterilir; kilitli dükkân başka ekrana gitmez
 *  - "Telefonun" kartı yalnız açılmış günlerde dinlenmemiş ses kaydı varsa çizilir
 */
import { kartMi, type ContentIndex, type LearnerItem, type Lexeme } from "@dw/shared";
import type { Adim, GunDurum } from "./gun.ts";
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

const medyaSayisi = (index: KoyVeri["index"], tur: "video" | "sahne" | "ses") => index.m1.reduce((n, g) => n + g.medya.filter((m) => m.kind === tur).length, 0);
/** açılmış (biten ya da şu anki) günlerin bitmemiş medya adımları */
function bekleyenMedya(gunler: readonly YolGunu[], alt: "video" | "ses"): Adim[] {
  return gunler.filter((g) => g.durum !== "kilitli").flatMap((g) => g.adimlar.filter((a) => a.tur === "medya" && a.alt === alt && a.hazir && !a.bitti));
}
/** en az bir dersi görünen (mevsimi gelmiş) alan sayısı */
export const hazirDurum = (index: KoyVeri["index"], now: number) => new Set(visibleScenarios(index.scenarios, now).map((s) => s.domain)).size;

export function dukkanlar(v: KoyVeri): Dukkan[] {
  const video = medyaSayisi(v.index, "video"), sahne = medyaSayisi(v.index, "sahne"), ses = medyaSayisi(v.index, "ses");
  const hazir = hazirDurum(v.index, v.now);
  const acik = (id: DukkanId, ad: string, alt: string, href: string, nokta = false): Dukkan => ({ id, ad, alt, href, kilitli: false, nokta });
  const kilitli = (id: DukkanId, ad: string, alt: string): Dukkan => ({ id, ad, alt, kilitli: true, nokta: false });
  return [
    acik("bahce", "Bahçe", v.bekleyen > 0 ? `${v.bekleyen} tekrar bekliyor` : "Kelime tekrarı", "#/koy/bahce", v.bekleyen > 0),
    video + sahne > 0
      ? acik("sinema", "Sinema", video > 0 ? `${video} gerçek video` : "Köy dizisi", "#/koy/sinema", bekleyenMedya(v.gunler, "video").length > 0)
      : kilitli("sinema", "Sinema", "İlk videoyla açılır"),
    // dinlenmemiş kayıt "Telefonun" kartında görünür; aynı işi ikinci kez noktayla göstermez
    ses > 0 ? acik("radyo", "Radyo", "Anons, sesli mesaj", "#/koy/radyo") : kilitli("radyo", "Radyo", "İlk kayıtla açılır"),
    acik("atolye", "Atölye", "Cümle kalıpları", "#/kalip"),
    acik("kutuphane", "Kütüphane", "Okuma, sözlük", "#/koy/kutuphane"),
    acik("pazar", "Pazar meydanı", hazir > 0 ? `${hazir} durum hazır` : "Gündelik durumlar", "#/koy/pazar"),
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

/** Sinema ve Radyo listesi: gün gün, o mekânın kayıtları */
export function mekanMedya(index: KoyVeri["index"], mekan: "sinema" | "radyo"): { day: number; title_tr: string; kayitlar: { id: string; kind: "video" | "sahne" | "ses"; title_tr: string; href: string }[] }[] {
  const uygun = (k: string) => (mekan === "radyo" ? k === "ses" : k !== "ses");
  return [...index.m1].sort((a, b) => a.day - b.day)
    .map((g) => ({ day: g.day, title_tr: g.title_tr, kayitlar: g.medya.filter((m) => uygun(m.kind)).map((m) => ({ ...m, href: `#/m1/${g.day}/${encodeURIComponent(m.id)}` })) }))
    .filter((g) => g.kayitlar.length > 0);
}
/** Kütüphane (okuma) ve Pazar meydanı (prova): yalnız açılmış günlerin adımları (öğretilmemiş günün provası istenmez) */
export function acikAdimlar(gunler: readonly YolGunu[], tur: "okuma" | "prova"): (Adim & { day: number; gun_tr: string })[] {
  return gunler.filter((g) => g.durum !== "kilitli").flatMap((g) => g.adimlar.filter((a) => a.tur === tur && a.hazir).map((a) => ({ ...a, day: g.day, gun_tr: g.title_tr })));
}
