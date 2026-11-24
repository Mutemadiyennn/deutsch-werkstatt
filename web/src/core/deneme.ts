/**
 * Sınav günü denemesi (PM-087 B.2, PM-110): puanlama, saf ve yapay zekâsız.
 *  - Dinleme ve okuma seçmeli: otomatik. Yazma 1 (form): alan başına kabul listesi, otomatik.
 *  - Yazma 2 (mesaj) ve konuşma: kabul listesi yalnız örnektir; öğrenci cevabını örnek ve ölçütle kendisi puanlar (öz-puan).
 *    Konuşmada cevap örneklerden biriyle aynıysa uygulama tam puanı önerir; karar öğrencinindir.
 *  - Bölüm puanı = ham / ham_puan × bölüm puanı (A1: 25), yarım puana yuvarlanır. Geçme: toplam ≥ gecme.toplam ve konuşma ≥ gecme.konusma
 *    (konuşmadaki eksik başka bölümle kapatılamaz; PM-087 ek).
 */
import type { Deneme, DenemeBolum, DenemeMadde, SinavBolum } from "@dw/shared";
import { norm } from "./grading.ts";

export type Cevap = number | string | Record<string, string>;
type Form = Extract<DenemeMadde, { k: "form" }>;

/** Form alanı: büyük/küçük harf, umlaut yazımı ve noktalama farkı sayılmaz; numara alanında boşluk ve ayraç sayılmaz */
export function alanDogru(accepted: readonly string[], cevap: string): boolean {
  const c = cevap.trim(); if (!c) return false;
  const rakam = (s: string) => s.replace(/\D/g, "");
  return accepted.some((a) => norm(a) === norm(c) || (rakam(a).length >= 6 && rakam(a) === rakam(c) && !/[a-z]/i.test(c)));
}
export const formPuani = (m: Form, c: Record<string, string> | undefined) => m.alanlar.reduce((s, a) => s + (alanDogru(a.accepted, c?.[a.id] ?? "") ? a.puan : 0), 0);

/** Otomatik puanlanan madde mi (seç, form) — öz-puanlanan: mesaj ve konuşma */
export const otomatik = (m: DenemeMadde) => m.k === "pick" || m.k === "form";
export function otomatikPuan(m: DenemeMadde, c: Cevap | undefined): number {
  if (m.k === "pick") return c === m.ans ? m.puan : 0;
  if (m.k === "form") return formPuani(m, typeof c === "object" ? c : undefined);
  return 0;
}
export const bolumMaddeleri = (b: DenemeBolum): DenemeMadde[] => b.kisimlar.flatMap((k) => k.maddeler);

/** Bölüm puanı: ham → bölüm puanı (yarım puana yuvarlanır) */
export const olcekle = (ham: number, b: Pick<DenemeBolum, "ham_puan" | "puan">) => Math.round((Math.min(ham, b.ham_puan) / b.ham_puan) * b.puan * 2) / 2;

/** Bölümün ham puanı ve madde puanları: otomatik maddeler cevaptan, ötekiler öz-puandan (verilmeyen 0) */
export function bolumPuani(b: DenemeBolum, cevaplar: Readonly<Record<string, Cevap>>, ozPuan: Readonly<Record<string, number>>): { ham: number; puan: number; maddeler: Record<string, number> } {
  const maddeler: Record<string, number> = {};
  for (const m of bolumMaddeleri(b)) maddeler[m.id] = otomatik(m) ? otomatikPuan(m, cevaplar[m.id]) : Math.max(0, Math.min(m.puan, ozPuan[m.id] ?? 0));
  const ham = Object.values(maddeler).reduce((s, x) => s + x, 0);
  return { ham, puan: olcekle(ham, b), maddeler };
}

export interface DenemeSonuc {
  /** bölüm → puan (çözülmüş bölümler) */
  bolumler: Partial<Record<SinavBolum, number>>;
  eksik: SinavBolum[];
  toplam: number; enCok: number;
  konusma: number | null; konusmaEnCok: number;
  /** bütün bölümler çözülmüşse: geçti mi */
  gecti: boolean | null;
  /** geçme sınırının altında kalan bölümler (bölüm puanının gecme.toplam oranı) */
  zayif: SinavBolum[];
}
export function denemeSonucu(d: Deneme, puanlar: ReadonlyMap<string, number>): DenemeSonuc {
  const bolumler: Partial<Record<SinavBolum, number>> = {}, eksik: SinavBolum[] = [], zayif: SinavBolum[] = [];
  let toplam = 0, enCok = 0;
  for (const b of d.bolumler) {
    enCok += b.puan;
    const p = puanlar.get(b.id);
    if (p === undefined) { eksik.push(b.id); continue; }
    bolumler[b.id] = p; toplam += p;
    if (p < b.puan * (b.id === "konusma" ? d.gecme.konusma : d.gecme.toplam)) zayif.push(b.id);
  }
  const kb = d.bolumler.find((b) => b.id === "konusma");
  const konusma = kb ? bolumler.konusma ?? null : null;
  const gecti = eksik.length ? null : toplam >= enCok * d.gecme.toplam && (!kb || (konusma ?? 0) >= kb.puan * d.gecme.konusma);
  return { bolumler, eksik, toplam, enCok, konusma, konusmaEnCok: kb?.puan ?? 0, gecti, zayif };
}

/** Puanı ekranda: 18.5 → "18,5" */
export const puanTr = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(1).replace(".", ","));
/** Öz-puan seçenekleri: 0, yarım, tam (madde puanı 1 ise 0 · ½ · 1) */
export const ozSecenekler = (puan: number) => [0, puan / 2, puan];
/** Mesaj ölçütünün seçenekleri: 0…N tam sayı */
export const olcutSecenekleri = (puan: number) => Array.from({ length: Math.floor(puan) + 1 }, (_, i) => i);
