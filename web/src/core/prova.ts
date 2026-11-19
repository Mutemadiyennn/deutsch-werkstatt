/**
 * Konuşma provası, yapay zekâsız (#58 A7). Saf parçalar; ekran `screens/Prova.tsx`.
 *  - Hazırlık: provada gereken uygun cevaplar önce dinlenir (bölüm kilidi: hepsi dinlenmeden prova açılmaz)
 *  - Dallanan diyalog: öğrencinin cevabı düğümün seçeneklerinden biriyle eşleşir, karşı taraf o seçeneğin dalına göre tepki verir
 *  - Kuralların tanımadığı cevapta karar öğrencinin (D-097): "Duyduğum: …" + "Tekrar söyle" + "Doğru söyledim"
 *  - Sonda Türkçe geri bildirim: 1 iyi şey, en fazla 3 düzeltme
 */
import type { Drill, Gun } from "@dw/shared";
import { drillVerdict } from "../ui/drill.tsx";

export type ProvaT = NonNullable<Gun["prova"]>;
export type Dugum = ProvaT["dugumler"][number];
export type Secenek = Dugum["secenekler"][number];

/** Hazırlıkta dinlenecek cümleler: uygun seçeneklerin Almancası (tekrarsız, diyalog sırasıyla) */
export function hazirlikCumleleri(p: ProvaT): { de: string; tr: string }[] {
  const out: { de: string; tr: string }[] = [];
  for (const d of p.dugumler) for (const s of d.secenekler) if (s.uygun && !out.some((x) => x.de === s.de)) out.push({ de: s.de, tr: s.tr });
  return out;
}

export const dugumBul = (p: ProvaT, id: string) => p.dugumler.find((d) => d.id === id);
export const sonMu = (d: Dugum | undefined) => !d || !!d.son || d.secenekler.length === 0;

export interface Eslesme {
  /** eşleşen seçenek (kesin) ya da en yakın seçenek (karar öğrencide) */
  i: number | null;
  kind: "correct" | "unchecked" | "wrong";
  /** en yakın seçeneğin gösterilecek biçimi */
  best: string;
  note?: string;
}

/**
 * Cevabı düğümün seçenekleriyle karşılaştırır. Önce kesin eşleşme (herhangi bir seçenek), sonra "yakın" (karar öğrencide);
 * yakın birden çoksa uygun seçenek öne alınır. Hiçbiri değilse yanlış (en yakın uygun seçenek gösterilir).
 */
export function eslestir(d: Dugum, answer: string, typed = true): Eslesme {
  const sonuc = d.secenekler.map((s, i) => {
    const drill: Drill = { id: `${d.id}:${i}`, k: "tr_de", tr: s.tr, accepted: s.accepted.length ? s.accepted : [s.de] };
    return { i, s, v: drillVerdict(drill, answer, typed) };
  });
  const kesin = sonuc.find((x) => x.v.kind === "correct");
  if (kesin) return { i: kesin.i, kind: "correct", best: kesin.v.best };
  const yakin = sonuc.filter((x) => x.v.kind === "unchecked").sort((a, b) => Number(b.s.uygun) - Number(a.s.uygun));
  if (yakin[0]) return { i: yakin[0].i, kind: "unchecked", best: yakin[0].v.best };
  const uygun = sonuc.find((x) => x.s.uygun) ?? sonuc[0];
  const not = sonuc.find((x) => x.v.note)?.v.note;
  return { i: null, kind: "wrong", best: uygun?.v.best ?? "", ...(not ? { note: not } : {}) };
}

/** Provada olan bir adım: karşı tarafın düğümü, öğrencinin cevabı, sonuç */
export interface Kayit { dugum: string; cevap: string; secenek: number | null; uygun: boolean; beyan?: boolean; dogrusu?: string }

/**
 * Sondaki Türkçe geri bildirim (#58 A7): bir iyi şey + en fazla 3 düzeltme.
 *  - iyi şey: ilk uygun cevabın geri bildirimi (yoksa cesaretlendirme)
 *  - düzeltmeler: uygun olmayan seçeneklerin geri bildirimi, sonra tanınmayan cevapların doğru biçimi; tekrarlar atılır
 */
export function rapor(p: ProvaT, kayitlar: Kayit[]): { iyi: string; duzeltmeler: string[] } {
  const fb = (k: Kayit) => (k.secenek === null ? undefined : dugumBul(p, k.dugum)?.secenekler[k.secenek]?.geri_bildirim_tr);
  const iyiK = kayitlar.find((k) => k.uygun && !k.beyan && fb(k));
  const iyi = iyiK ? fb(iyiK)! : kayitlar.some((k) => k.uygun) ? "Konuşmayı sonuna kadar götürdün." : "Konuşmayı denedin; bir daha yaparsan daha kolay gelecek.";
  const d: string[] = [];
  for (const k of kayitlar) {
    if (k.secenek !== null && !k.uygun) { const t = fb(k); if (t && !d.includes(t)) d.push(t); }
  }
  for (const k of kayitlar) {
    if (k.secenek === null && k.dogrusu) { const t = `**${k.cevap || "…"}** yerine şöyle diyebilirsin: **${k.dogrusu}**`; if (!d.includes(t)) d.push(t); }
  }
  return { iyi, duzeltmeler: d.slice(0, 3) };
}

/** Sonsuz döngü koruması: aynı düğüme dönüş en çok bu kadar; sonra uygun seçeneğin dalına geçilir */
export const EN_COK_TEKRAR = 3;
