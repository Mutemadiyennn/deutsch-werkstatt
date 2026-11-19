/**
 * Okuma ve yazma (#58 A8, Seans 4). Saf parçalar; ekran `screens/Okuma.tsx`.
 *  Okuma: metin (kelimeye dokununca kart) → sorular
 *  Yazma: zorunlu kelime ve kalıp kontrolü (yapay zekâsız, çevrimdışı; PM-054.5) → örnek cevap → 3 maddelik kontrol listesi
 */
import type { Gun } from "@dw/shared";
import { eksikZorunlu } from "./medya.ts";

export type OkumaYazmaT = NonNullable<Gun["okuma_yazma"]>;
export type YazmaT = NonNullable<OkumaYazmaT["yazma"]>;

const fold = (s: string) => s.toLowerCase().replace(/ß/g, "ss").replace(/[„“"»«]/g, "").replace(/\s+/g, " ").trim();
const kacis = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Metni cümlelere ayırır (., !, ? ve satır sonu); boş parçalar atılır */
export function cumleler(t: string): string[] {
  return t.split(/(?<=[.!?])\s+|\n+/).map((x) => x.trim()).filter(Boolean);
}

/**
 * Kalıp eşleşmesi: "___" 1–4 kelimelik yuva (ad, ay, sayı…); noktalama ve büyük/küçük harf farkı yok sayılır.
 * Cümle kalıbın tamamıdır ya da kalıp cümlenin içinde geçer ("Hallo ___," gibi parça kalıplar).
 */
export function kalipEslesir(cumle: string, kalip: string): boolean {
  const temiz = (s: string) => fold(s).replace(/[.,!?;:]/g, " ").replace(/\s+/g, " ").trim();
  const k = temiz(kalip).split("___").map((p) => kacis(p.trim())).join("\\s*(\\S+(?:\\s+\\S+){0,3})\\s*");
  if (!k.trim()) return false;
  return new RegExp(`(^|\\s)${k}(\\s|$)`).test(` ${temiz(cumle)} `);
}

export interface YazmaSonuc {
  /** yazıda olmayan zorunlu kelimeler */
  eksik: string[];
  /** kalıplardan biriyle eşleşen cümle sayısı / toplam cümle */
  kalipli: number; toplam: number;
  /** hiçbir kalıba uymayan cümleler (yanlış değil: "kontrol edemedim"; karar öğrencide, D-097) */
  taninmayan: string[];
  /** zorunlular tamam ve en az bir cümle kalıba uyuyor */
  tamam: boolean;
}

export function yazmaKontrol(metin: string, y: YazmaT): YazmaSonuc {
  const cs = cumleler(metin);
  const eksik = eksikZorunlu(metin.replace(/[.,!?;:]/g, " "), y.zorunlu);
  const uyan = cs.filter((c) => y.accepted_kaliplar.some((k) => kalipEslesir(c, k)));
  const taninmayan = cs.filter((c) => !uyan.includes(c));
  return { eksik, kalipli: uyan.length, toplam: cs.length, taninmayan, tamam: eksik.length === 0 && uyan.length > 0 };
}
