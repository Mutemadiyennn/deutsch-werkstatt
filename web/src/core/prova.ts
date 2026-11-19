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
export function eslestir(d: Dugum, answer: string, typed = true, durum = ""): Eslesme {
  // rakam dizisi rakam rakam okunur (0171 → null eins sieben eins): konuşma tanıma numarayı rakamla yazar (inceleme #68 P1-3)
  const cevaplar = [answer, ...(/\d{3,}/.test(answer) ? [rakamOku(answer)] : [])];
  const sonuc = d.secenekler.map((s, i) => {
    // istem: durum + karşı tarafın sözü + seçeneğin Türkçesi; istemde rakam varsa (adres) rakamla cevap yasak değil
    const drill: Drill = { id: `${d.id}:${i}`, k: "guided_response", situation_tr: `${durum} ${s.tr}`, prompt_de: d.de, accepted: s.accepted.length ? s.accepted : [s.de] };
    const v = cevaplar.map((a) => drillVerdict(drill, a, typed)).sort((x, y) => SIRA[x.kind] - SIRA[y.kind])[0]!;
    return { i, s, v };
  });
  const kesin = sonuc.find((x) => x.v.kind === "correct");
  if (kesin) return { i: kesin.i, kind: "correct", best: kesin.v.best };
  // "yakın" yalnızca olumsuzluğu aynı olan seçenek olabilir: "Nein, Donnerstag geht nicht." ≠ "Ja, Donnerstag geht." (inceleme #68 P1-1)
  const olumsuz = olumsuzMu(answer);
  // tutum (olumsuzluk, "zu teuer", "leider"), seçeneğin cevaba EN YAKIN kabul biçimiyle karşılaştırılır
  const yakin = sonuc.filter((x) => x.v.kind === "unchecked" && ayniTutum(answer, enYakin(answer, x.s.accepted.length ? x.s.accepted : [x.s.de])))
    .sort((a, b) => Number(b.s.uygun) - Number(a.s.uygun));
  if (yakin[0]) return { i: yakin[0].i, kind: "unchecked", best: yakin[0].v.best };
  const uygun = sonuc.find((x) => x.s.uygun) ?? sonuc[0];
  const not = sonuc.find((x) => x.v.note)?.v.note;
  return { i: null, kind: "wrong", best: uygun?.v.best ?? "", ...(not ? { note: not } : {}) };
}

const SIRA = { correct: 0, unchecked: 1, wrong: 2 } as const;
const OLUMSUZ = /\b(nicht|nichts|nie|niemals|nein|kein|keine|keinen|keinem|keiner|keines)\b/i;
export const olumsuzMu = (s: string) => OLUMSUZ.test(s);
/** Tutum belirten kelimeler: olumsuzluk, "zu" (zu teuer, zu spät), "leider" — kümeleri farklıysa cevap o biçime "yakın" sayılmaz */
const TUTUM = new Set(["nicht", "nichts", "nie", "niemals", "nein", "kein", "keine", "keinen", "keinem", "keiner", "keines", "zu", "leider"]);
const kelimeKume = (s: string) => new Set(s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean));
const tutum = (s: string) => [...kelimeKume(s)].filter((w) => TUTUM.has(w)).sort().join(" ");
export const ayniTutum = (a: string, b: string) => tutum(a) === tutum(b);
/** Kelime kümesi benzerliği en yüksek kabul biçimi */
export function enYakin(cevap: string, kabul: string[]): string {
  const a = kelimeKume(cevap);
  let en = kabul[0] ?? "", puan = -1;
  for (const k of kabul) { const b = kelimeKume(k); const o = [...a].filter((w) => b.has(w)).length / Math.max(1, new Set([...a, ...b]).size); if (o > puan) { puan = o; en = k; } }
  return en;
}
const RAKAM = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
/** Telefon numarası gibi (3+ rakamlı grup içeren) metinde bütün rakamları tek tek okur ("0171 39200 47" → "null eins … vier sieben") */
export const rakamOku = (s: string) => s.replace(/\d+/g, (m) => [...m].map((c) => RAKAM[Number(c)]).join(" "));

/**
 * Bir sonraki düğüm (inceleme #68 P1-4): aynı düğüme (kendine dönen dal dahil) en çok EN_COK_TEKRAR kez gelinir; sınır
 * dolunca uygun seçeneğin dalına geçilir, öğrenci uygun olmayan dalda dönüp durmaz. `ziyaret` her gelişte artar.
 */
export function sonrakiDugum(d: Dugum, secenek: number, ziyaret: Map<string, number>): string {
  const s = d.secenekler[secenek]!;
  let hedef = s.sonraki;
  // sınır yalnızca uygun OLMAYAN dalda: "Wie bitte?" gibi uygun bir tekrar isteği konuşmayı ileri atlatmaz
  if (!s.uygun && (ziyaret.get(hedef) ?? 0) >= EN_COK_TEKRAR) { const u = d.secenekler.find((x) => x.uygun); if (u) hedef = u.sonraki; }
  return hedef;
}

/**
 * "Doğru söyledim / Benimki de doğru" yalnızca kararı öğrenciye bırakmanın güvenli olduğu yerde (D-097): kurallar en
 * yakın seçeneği bulduysa (aynı olumsuzlukta) ya da sesli cevapta, olumsuzluğu uygun seçenekle aynıysa (tanıma yanlış
 * duymuş olabilir). Olumsuz cevap olumlu dala beyanla gidemez (inceleme #68 2. tur).
 */
export function beyanSecenegi(d: Dugum, e: Eslesme, cevap: string, sesli: boolean): number | null {
  if (e.kind === "unchecked" && e.i !== null) return e.i;
  if (e.kind !== "wrong" || !sesli) return null;
  const u = d.secenekler.findIndex((s) => s.uygun && ayniTutum(cevap, enYakin(cevap, s.accepted.length ? s.accepted : [s.de])));
  return u >= 0 ? u : null;
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
