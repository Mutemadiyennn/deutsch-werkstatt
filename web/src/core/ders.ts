/**
 * Temel ders akışı (#58 A5, Seans 2: "günün temel dersi ve cümle kurma"). Saf parçalar; ekran `screens/Ders.tsx`.
 * Sıra (önce duy, sonra parçala, sonra hatırla, en sonda bağımsız konuş — CLAUDE.md "Amaç"):
 *   tanıt (öğretim kartları, 6'lık gruplar) → tablo → anlama (seçmeli) → kurma (boşluk, sıra, Türkçe → Almanca)
 *   → dönüştür ve cevap ver → diyalog → dinleme → gerçek görev
 */
import type { Drill, TemelDers } from "@dw/shared";

export type DersAdim = "tanit" | "tablo" | "anlama" | "kurma" | "konusma" | "diyalog" | "dinleme" | "gorev";
export const DERS_ADIM_TR: Record<DersAdim, string> = {
  tanit: "Yeni kelimeler", tablo: "Tablo", anlama: "Anla", kurma: "Kur", konusma: "Söyle", diyalog: "Diyalog", dinleme: "Dinle", gorev: "Dışarıda dene"
};
const ANLAMA: Drill["k"][] = ["pick"];
const KURMA: Drill["k"][] = ["gap", "order", "tr_de"];
const KONUSMA: Drill["k"][] = ["transform", "guided_response", "listen_and_respond"];

export const TANIT_GRUP = 6;
export function adimlarDers(t: TemelDers): DersAdim[] {
  const out: DersAdim[] = ["tanit"];
  if (t.table) out.push("tablo");
  if (maddeler(t, "anlama").length) out.push("anlama");
  if (maddeler(t, "kurma").length) out.push("kurma");
  if (maddeler(t, "konusma").length) out.push("konusma");
  if (t.dialogue) out.push("diyalog");
  if (t.listening.length) out.push("dinleme");
  if (t.mission) out.push("gorev");
  return out;
}
/** Adımın maddeleri; kurma adımında boşluk → sıra → Türkçe-Almanca (kolaydan zora) */
export function maddeler(t: TemelDers, a: "anlama" | "kurma" | "konusma"): Drill[] {
  const kinds = a === "anlama" ? ANLAMA : a === "kurma" ? KURMA : KONUSMA;
  return kinds.flatMap((k) => t.drills.filter((d) => d.k === k));
}
/** Adımdaki alt madde sayısı (tanıtımda grup sayısı) */
export function altSayisi(t: TemelDers, a: DersAdim): number {
  if (a === "tanit") return Math.max(1, Math.ceil(t.teach.length / TANIT_GRUP));
  if (a === "anlama" || a === "kurma" || a === "konusma") return maddeler(t, a).length;
  if (a === "dinleme") return t.listening.length;
  return 1;
}

export interface DersIlerleme { s: number; k: number; dogru: number; toplam: number; bitti?: string }
export const DERS_BASLANGIC: DersIlerleme = { s: 0, k: 0, dogru: 0, toplam: 0 };
export const dersAnahtari = (id: string) => `ders:${id}`;
export function dersIleri(p: DersIlerleme, t: TemelDers, sonuc?: boolean, now = new Date()): DersIlerleme {
  const steps = adimlarDers(t);
  const n = altSayisi(t, steps[p.s]!);
  const sayac = sonuc === undefined ? {} : { dogru: p.dogru + (sonuc ? 1 : 0), toplam: p.toplam + 1 };
  if (p.k + 1 < n) return { ...p, ...sayac, k: p.k + 1 };
  if (p.s + 1 < steps.length) return { ...p, ...sayac, s: p.s + 1, k: 0 };
  return { ...p, ...sayac, bitti: now.toISOString() };
}
/** Kayıtlı konum ders içeriğiyle uyuşmuyorsa baştan (içerik değişti); bitmiş ders bitmiş kalır */
export function dersKonum(p: DersIlerleme | undefined, t: TemelDers): DersIlerleme {
  if (!p) return { ...DERS_BASLANGIC };
  if (p.bitti) return p;
  const steps = adimlarDers(t);
  if (!steps[p.s] || p.k >= altSayisi(t, steps[p.s]!)) return { ...DERS_BASLANGIC };
  return p;
}
