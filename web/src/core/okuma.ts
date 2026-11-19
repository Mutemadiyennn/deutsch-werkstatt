/**
 * Okuma ve yazma (#58 A8, Seans 4). Saf parçalar; ekran `screens/Okuma.tsx`.
 *  Okuma: metin (kelimeye dokununca kart) → sorular
 *  Yazma: zorunlu kelime ve kalıp kontrolü (yapay zekâsız, çevrimdışı; PM-054.5) → örnek cevap → 3 maddelik kontrol listesi
 */
import type { Gun } from "@dw/shared";
import { eksikZorunlu } from "./medya.ts";

export type OkumaYazmaT = NonNullable<Gun["okuma_yazma"]>;
export type YazmaT = NonNullable<OkumaYazmaT["yazma"]>;

// Türkçe klavye: cümle başındaki "İ" ve "ı" (İch, İm) Almanca "I"/"i" sayılır (inceleme #70 P1-2)
export const trKlavye = (s: string) => s.replace(/İ/g, "I").replace(/ı/g, "i");
const fold = (s: string) => trKlavye(s).toLowerCase().replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
  .replace(/[„“"»«]/g, "").replace(/\s+/g, " ").trim();
const kacis = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Kısaltmalar ve tarihteki sıra sayıları cümleyi bitirmez: "Dr. Weber", "am 3. Mai", "z. B." (inceleme #70 P1-3) */
const KISALTMA = /(?:^|\s)(dr|prof|nr|str|tel|ca|bzw|usw|vgl|z\.\s?b|u\.\s?a|hr|fr|st|jan|feb|aug|sept|okt|nov|dez)\.$/i;
const AY = /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)\b/i;
/** Metni cümlelere ayırır (., !, ? ve satır sonu); kısaltmadan ve tarihteki sıra sayısından ("am 3. Mai") sonra bölmez */
export function cumleler(t: string): string[] {
  const out: string[] = [];
  for (const satir of t.split(/\n+/)) {
    for (const p of satir.split(/(?<=[.!?])\s+/)) {
      const x = p.trim(); if (!x) continue;
      const onceki = out[out.length - 1];
      const birlestir = !!onceki && (KISALTMA.test(onceki) || (/\d\.$/.test(onceki) && (AY.test(x) || /^[a-zäöü]/.test(x))));
      if (birlestir) out[out.length - 1] += ` ${x}`; else out.push(x);
    }
  }
  return out;
}

const temiz = (s: string) => fold(s).replace(/[.,!?;:]/g, " ").replace(/\s+/g, " ").trim();
const kalipRe = (kalip: string) => temiz(kalip).replace(/___/g, " ___ ").split(/\s+/).filter(Boolean).map((t) => (t === "___" ? "\\S+(?:\\s+\\S+){0,3}" : kacis(t))).join("\\s+");
/**
 * Kalıp eşleşmesi: "___" 1–4 kelimelik yuva (ad, ay, sayı…); noktalama, büyük/küçük harf ve ä/ae farkı yok sayılır.
 * Cümle kalıbın TAMAMIDIR (baştan sona); ya da virgülle ayrılan parçalarının her biri bir kalıba tam uyar
 * ("Hallo Derya, hier ist Ayşe." = "Hallo ___," + "hier ist ___."). Kalıp cümlenin içinde aranmaz (inceleme #70 P1-1).
 */
export function kalipEslesir(cumle: string, kalip: string): boolean {
  const k = kalipRe(kalip);
  if (!k.trim()) return false;
  return new RegExp(`^${k}$`).test(temiz(cumle));
}
/** Cümleye uyan kalıplar (tam cümle ya da virgülle ayrılan her parça için birer kalıp); uymazsa boş */
export function uyanKaliplar(cumle: string, kaliplar: string[]): string[] {
  const tam = kaliplar.find((k) => kalipEslesir(cumle, k));
  if (tam) return [tam];
  const parcalar = cumle.split(",").map((x) => x.trim()).filter(Boolean);
  if (parcalar.length < 2) return [];
  const her = parcalar.map((p) => kaliplar.find((k) => kalipEslesir(p, k)));
  return her.every(Boolean) ? (her as string[]) : [];
}
export const kalipliMi = (cumle: string, kaliplar: string[]) => uyanKaliplar(cumle, kaliplar).length > 0;

/** Zorunlu kelime: tam kelime ya da çekimli biçim (kostet ~ kosten, habe ~ hast); kök en az 4 harf (inceleme #70 P2) */
function kelimeVar(kelimeler: string[], z: string): boolean {
  const zz = temiz(z).split(" ");
  if (zz.length > 1) return ` ${kelimeler.join(" ")} `.includes(` ${zz.join(" ")} `);
  const w = zz[0]!;
  const kok = w.length >= 5 ? w.slice(0, Math.max(4, w.length - 2)) : w;
  return kelimeler.some((x) => x === w || (w.length >= 5 && x.startsWith(kok) && Math.abs(x.length - w.length) <= 2));
}

export interface YazmaSonuc {
  /** yazıda olmayan zorunlu kelimeler */
  eksik: string[];
  /** kalıplardan biriyle eşleşen cümle sayısı / toplam cümle */
  kalipli: number; toplam: number;
  /** hiçbir kalıba uymayan cümleler (yanlış değil: "kontrol edemedim"; karar öğrencide, D-097) */
  taninmayan: string[];
  /** zorunlu kelimelerin her biri kalıba uyan bir cümlede, kalıbın sabit kısmında */
  tamam: boolean;
}

export function yazmaKontrol(metin: string, y: YazmaT): YazmaSonuc {
  const cs = cumleler(trKlavye(metin));
  const tum = temiz(metin).split(" ").filter(Boolean);
  const eksik = y.zorunlu.filter((z) => !kelimeVar(tum, z));
  const eslesme = cs.map((c) => ({ c, k: uyanKaliplar(c, y.accepted_kaliplar) }));
  const uyan = eslesme.filter((x) => x.k.length).map((x) => x.c);
  const taninmayan = cs.filter((c) => !uyan.includes(c));
  // "tamam": zorunlu kelime yalnızca geçmekle yetmez; kalıba uyan bir cümlede, kalıbın sabit kısmında (yuvada değil)
  // kullanılmış olmalı — "Hallo Urlaub Geburtstag." tamam sayılmaz (inceleme #70 P1-1)
  const sabit = eslesme.flatMap((x) => x.k.flatMap((k) => temiz(k).split(" ").filter((w) => w && w !== "___")));
  const tamam = eksik.length === 0 && uyan.length > 0 && y.zorunlu.every((z) => kelimeVar(sabit, z));
  return { eksik, kalipli: uyan.length, toplam: cs.length, taninmayan, tamam };
}
