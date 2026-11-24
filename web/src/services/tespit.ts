/**
 * A1 seviye tespiti (PM-115 md. 1–3; ekranlar PR 2b): cevaplar, rapor ve karar cihazda (`seviye:tespit`).
 *  - Her cevap anında yazılır (yarıda bırak / sürdür). Plan motorda cevaplardan belirlenimli kurulur; havuz değişirse planda
 *    olmayan cevap yok sayılır (sürüm imzası gerekmez).
 *  - Rapor bitince bir kez saklanır (Ben'den ve Ayarlar'dan yeniden açılır; havuz sonra değişse de aynı rapor).
 *  - Karar uygulanınca (`uygulandi`) gün kilidi kalkar: "a2" → 9. hafta (#245 altyapısı: atlanan günler, "biliniyor" kartlar),
 *    "bastan" → 1. gün. "tamamla" A2'yi açmaz (plan ve çıkış yoklaması PR 3).
 */
import type { ContentIndex, Drill } from "@dw/shared";
import { getMeta, itemsMap, putItems, setMeta } from "../data/db.ts";
import { biliniyorKart, hemenTekrar, SEVIYE } from "../core/seviye.ts";
import type { Karar, Sonuc, TespitRaporu } from "../core/tespit.ts";
import { baslangicYaz } from "./seviye.ts";

const ANAHTAR = "seviye:tespit";
export interface TespitKayit {
  cevaplar: Record<string, Sonuc>;
  /** ilk kurulumdan geldi: tespit bitmeden ya da "Baştan başla" seçilmeden gün açılmaz */
  kurulum?: boolean;
  basladi?: string;
  rapor?: TespitRaporu & { at: string };
  /** uygulanan karar; "bastan" giriş ekranındaki "Baştan başla"dan da gelir */
  uygulandi?: Karar;
}
const bos = (): TespitKayit => ({ cevaplar: {} });
export async function tespitOku(): Promise<TespitKayit> {
  const v = await getMeta<TespitKayit>(ANAHTAR);
  return v && typeof v === "object" && v.cevaplar && typeof v.cevaplar === "object" ? v : bos();
}
/** Yazımlar sırayla (iki hızlı cevap birbirini ezmesin) */
let sira: Promise<unknown> = Promise.resolve();
function degistir(f: (k: TespitKayit) => TespitKayit): Promise<TespitKayit> {
  const p = sira.then(async () => { const y = f(await tespitOku()); await setMeta(ANAHTAR, y); return y; });
  sira = p.catch(() => undefined);
  return p;
}
export const cevapYaz = (id: string, s: Sonuc) => degistir((k) => ({ ...k, basladi: k.basladi ?? new Date().toISOString(), cevaplar: { ...k.cevaplar, [id]: s } }));
export const kurulumIsaretle = () => degistir((k) => ({ ...k, kurulum: true }));
/** Kurulumdan gelen öğrencide gün kilidi: tespit bitmedi ve karar uygulanmadı */
export async function tespitBekliyor(): Promise<boolean> {
  const k = await tespitOku();
  return !!k.kurulum && !k.uygulandi && !k.rapor;
}

/** Rapor bir kez saklanır; A2 ve tamamlama kararında bilinmeyen kelimeler Kelime Bahçesi'nde hemen vadeli (PM-115 md. 3–4) */
export async function raporKaydet(r: TespitRaporu): Promise<TespitKayit> {
  const once = await tespitOku();
  if (once.rapor) return once;
  if (r.karar !== "bastan") await bahceyeKoy(r.bilinmeyenKelime);
  return degistir((k) => ({ ...k, rapor: { ...r, at: new Date().toISOString() } }));
}
async function bahceyeKoy(kartlar: readonly string[]) {
  if (!kartlar.length) return;
  const now = new Date();
  const var_ = await itemsMap([...kartlar]);
  await putItems(kartlar.map((id) => hemenTekrar(var_.get(id) ?? biliniyorKart(id, now), now)));
}

/**
 * Kararı uygula: "a2" → 9. haftadan başla (üretim maddesinde yanlış yapılan Drill'lerin kartları hemen tekrarda);
 * "bastan" → 1. gün. Döner: uygulanan başlangıç günü.
 */
export async function kararUygula(karar: "a2" | "bastan", index: ContentIndex, yanlis: readonly Drill[] = []): Promise<number> {
  const g = await baslangicYaz(karar === "a2" ? SEVIYE.a2_ilk_gun : 1, index, karar === "a2" ? yanlis : []);
  await degistir((k) => ({ ...k, uygulandi: karar }));
  return g;
}
/** "Planımı gör" (PR 3'e kadar zayıf günlerin tekrarı): karar not edilir, başlangıç değişmez, A2 kapalı kalır */
export const tamamlaNotEt = () => degistir((k) => ({ ...k, uygulandi: "tamamla" }));
