/**
 * Temel ders akışı (#58 A5, Seans 2: "günün temel dersi ve cümle kurma"). Saf parçalar; ekran `screens/Ders.tsx`.
 * Sıra (önce duy, sonra parçala, sonra hatırla, en sonda bağımsız konuş — CLAUDE.md "Amaç"; phases/09):
 *   diyalog (önce altyazısız, sonra altyazılı) → tanıt (4'lük gruplar; her gruptan hemen sonra hatırlama turu:
 *   dinle → anlamını seç, Türkçe → Almancasını yaz) → tablo → anlama → kurma (boşluk, sıra, Türkçe → Almanca)
 *   → dönüştür ve cevap ver → dinleme → gerçek görev. Pasif "Anladım" yok.
 */
import type { Drill, TemelDers } from "@dw/shared";

export type DersAdim = "tanit" | "tablo" | "anlama" | "kurma" | "konusma" | "diyalog" | "dinleme" | "gorev";
export const DERS_ADIM_TR: Record<DersAdim, string> = {
  tanit: "Yeni kelimeler ve hatırla", tablo: "Tablo", anlama: "Anla", kurma: "Kur", konusma: "Söyle", diyalog: "Önce dinle", dinleme: "Dinle", gorev: "Dışarıda dene"
};
const ANLAMA: Drill["k"][] = ["pick"];
const KURMA: Drill["k"][] = ["gap", "order", "tr_de"];
const KONUSMA: Drill["k"][] = ["transform", "guided_response", "listen_and_respond"];

/** tanıtım grubu: 4 kart, ardından hatırlama turu (phases/09 madde 5: her 3–4 karttan sonra) */
export const TANIT_GRUP = 4;
export function adimlarDers(t: TemelDers): DersAdim[] {
  const out: DersAdim[] = [];
  if (t.dialogue) out.push("diyalog");
  out.push("tanit");
  if (t.table) out.push("tablo");
  if (maddeler(t, "anlama").length) out.push("anlama");
  if (maddeler(t, "kurma").length) out.push("kurma");
  if (maddeler(t, "konusma").length) out.push("konusma");
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
  // tanıtım: her grup iki alt adım (k çift: kartlar, k tek: hatırlama turu)
  if (a === "tanit") return Math.max(1, Math.ceil(t.teach.length / TANIT_GRUP)) * 2;
  if (a === "anlama" || a === "kurma" || a === "konusma") return maddeler(t, a).length;
  if (a === "dinleme") return t.listening.length;
  return 1;
}

/** `ilkBitti`: ders bir kez bittiyse "Tekrar çalış" sonrası da bitmiş sayılır (planlayıcı yeniden önermez) */
export interface DersIlerleme { s: number; k: number; dogru: number; toplam: number; bitti?: string; ilkBitti?: string }
export const DERS_BASLANGIC: DersIlerleme = { s: 0, k: 0, dogru: 0, toplam: 0 };
export const dersAnahtari = (id: string) => `ders:${id}`;
/** `sonuc`: tek madde (doğru/yanlış) ya da hatırlama turu sayacı {dogru, toplam} */
export function dersIleri(p: DersIlerleme, t: TemelDers, sonuc?: boolean | { dogru: number; toplam: number }, now = new Date()): DersIlerleme {
  const steps = adimlarDers(t);
  const n = altSayisi(t, steps[p.s]!);
  const sayac = sonuc === undefined ? {} : typeof sonuc === "boolean" ? { dogru: p.dogru + (sonuc ? 1 : 0), toplam: p.toplam + 1 } : { dogru: p.dogru + sonuc.dogru, toplam: p.toplam + sonuc.toplam };
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
