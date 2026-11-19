/**
 * Medya bölüm oynatıcısının saf parçaları (#58 A4, PM-053): bölüm adımları a–g, dikte değerlendirmesi, zorunlu kelime
 * denetimi, bölüm zaman aralığı, transkript kelimesinden karta. Ekran: `screens/Medya.tsx`.
 */
import type { Bolum, Dikte, Lexeme, Medya, MedyaCumle } from "@dw/shared";
import { norm } from "./grading.ts";

/** PM-053 §2 sırası; içerikte olmayan adım atlanır */
export type Adim = "dinle" | "ana" | "ayrinti" | "cumle" | "dikte" | "transkript" | "golge" | "cevapla";
export const ADIM_TR: Record<Adim, string> = {
  dinle: "Baştan sona dinle", ana: "Ana fikir", ayrinti: "Ayrıntılar", cumle: "Cümle cümle", dikte: "Duyduğunu yaz",
  transkript: "Metin ve kelimeler", golge: "Dinle ve aynısını söyle", cevapla: "Sen ne derdin?"
};
export function adimlar(b: Bolum): Adim[] {
  const out: Adim[] = ["dinle", "ana"];
  if (b.ayrinti.length) out.push("ayrinti");
  out.push("cumle");
  if (b.dikte.length) out.push("dikte");
  out.push("transkript");
  if (b.golge.length) out.push("golge");
  if (b.cevapla) out.push("cevapla");
  return out;
}

/** Bölümün cümleleri (sırayla) */
export const bolumCumleleri = (m: Medya, b: Bolum): MedyaCumle[] => b.cumleler.map((id) => m.cumleler.find((c) => c.id === id)).filter((c): c is MedyaCumle => !!c);

/** Hizalanmış videoda bölümün zaman aralığı (yoksa null: cihaz sesiyle cümle cümle) */
export function aralik(cs: MedyaCumle[]): { t0: number; t1: number } | null {
  const a = cs[0], z = cs[cs.length - 1];
  return a?.t0 !== undefined && z?.t1 !== undefined ? { t0: a.t0, t1: z.t1 } : null;
}

/** Yazım katlama: büyük/küçük harf ve ümlaut (ae/ä, ss/ß) farkı yok; noktalama yok */
const fold = (s: string) => norm(s);
/** Kesin karşılaştırma: noktalama ve fazla boşluk yok, harf ve ümlaut korunur */
const strict = (s: string) => s.replace(/[.,!?;:„“"'»«()]/g, " ").replace(/\s+/g, " ").trim();

export type DikteSonuc = { ok: boolean; yazim?: string; beklenen: string };
/**
 * Dikte (orta/zor/usta): ilk kabul (doğru yazım) → doğru. Kabul listesindeki yazım varyantı ya da yalnızca büyük harf/ümlaut
 * farkı → yine doğru ama doğru yazım gösterilir (A11: "Doğru. Yazımı: Mittwoch"). Başka kelime kabul edilmez.
 */
export function dikteDegerlendir(d: Exclude<Dikte, { seviye: "kolay" | "gercek" }>, answer: string): DikteSonuc {
  const beklenen = d.accepted[0]!;
  const a = answer.trim();
  if (!a) return { ok: false, beklenen };
  if (strict(beklenen) === strict(a)) return { ok: true, beklenen };
  // kabul listesindeki yazım varyantı (küçük harf, ümlautsuz) da doğru — ama doğru yazım gösterilir (A11, PM-054.2)
  if (d.accepted.some((x) => strict(x) === strict(a) || fold(x) === fold(a))) return { ok: true, yazim: beklenen, beklenen };
  return { ok: false, beklenen };
}

/** Zorunlu kelimeler (yazma ve "gerçek hayat" dikte): eksik olanları döndürür (tam kelime/kelime grubu, harf duyarsız) */
export function eksikZorunlu(text: string, zorunlu: string[]): string[] {
  const t = ` ${fold(text)} `;
  return zorunlu.filter((z) => !t.includes(` ${fold(z)} `));
}

/** Zor dikte: bankadan seçilen kelimelerle kurulan cümle */
export const bankadan = (secilen: string[]) => secilen.join(" ");

/**
 * Transkript kelimesi → kart: kelimenin kendisi, çoğulu, fiil biçimleri (Präsens 3, Präteritum, Partizip), sonra çekim
 * ekleri atılarak (-e, -en, -n, -s, -es, -er, -em, -t, -st, -et). Büyük harfle eşleşen (isim) önce (inceleme #60 P1-7).
 */
export function kartBul(word: string, lex: Lexeme[]): Lexeme | undefined {
  const w = word.replace(/[.,!?;:„“"'»«()]/g, "");
  if (!w) return undefined;
  const exact = lex.find((l) => l.de === w || l.pl === w);
  if (exact) return exact;
  const low = w.toLowerCase();
  const byForm = (x: string) => lex.find((l) => l.de.toLowerCase() === x || l.pl?.toLowerCase() === x
    || [l.verb?.praesens3, l.verb?.praeteritum, l.verb?.perfekt?.split(/\s+/).pop()].some((f) => f?.toLowerCase() === x));
  const direct = byForm(low);
  if (direct) return direct;
  for (const suf of ["en", "er", "em", "es", "st", "et", "e", "n", "s", "t"]) {
    if (low.length > suf.length + 2 && low.endsWith(suf)) {
      const stem = low.slice(0, -suf.length);
      const hit = lex.find((l) => { const d = l.de.toLowerCase(); return d === stem || d === stem + "en" || d === stem + "n" || d === stem + "e"; });
      if (hit) return hit;
    }
  }
  return undefined;
}

/** Kaldığı yer (her seans yarıda bırakılıp sürdürülebilir; #58 "Öğrencinin bir günü") */
export interface MedyaIlerleme { b: number; s: number; k: number; dogru: number; toplam: number; bitti?: boolean; eylem?: boolean }
export const ilerlemeAnahtari = (medyaId: string) => `m1:medya:${medyaId}`;
export const BASLANGIC: MedyaIlerleme = { b: 0, s: 0, k: 0, dogru: 0, toplam: 0 };

/** Bir sonraki konum: aynı adımda sonraki alt madde → sonraki adım → sonraki bölüm → bitti (eylem ayrı) */
export function ileri(p: MedyaIlerleme, m: Medya, altSayisi: number): MedyaIlerleme {
  if (p.k + 1 < altSayisi) return { ...p, k: p.k + 1 };
  const steps = adimlar(m.bolumler[p.b]!);
  if (p.s + 1 < steps.length) return { ...p, s: p.s + 1, k: 0 };
  if (p.b + 1 < m.bolumler.length) return { ...p, b: p.b + 1, s: 0, k: 0 };
  return { ...p, bitti: true };
}

/** Satır birden çok cümleyse ve dikte hedefi bunlardan biriyse: { sira, toplam } ("Kayıtta 2 cümle var; 2. cümleyi yaz") */
export function hedefSira(line: string, hedef: string): { sira: number; toplam: number } | null {
  const cs = (line.match(/[^.!?]+[.!?]*/g) ?? []).map((x) => x.trim()).filter(Boolean);
  if (cs.length < 2) return null;
  const i = cs.findIndex((x) => fold(x) === fold(hedef));
  return i >= 0 ? { sira: i + 1, toplam: cs.length } : null;
}

/** Kayıtlı konum içerikle uyuşmuyorsa (bölüm/adım sayısı değişti) baştan; uyuşuyorsa aynen */
export function gecerliKonum(p: MedyaIlerleme | undefined, m: Medya): MedyaIlerleme {
  if (!p) return { ...BASLANGIC };
  if (p.bitti) return p;
  const b = m.bolumler[p.b];
  if (!b) return { ...BASLANGIC };
  const steps = adimlar(b);
  const step = steps[p.s];
  if (!step) return { ...BASLANGIC };
  const n = step === "ayrinti" ? b.ayrinti.length : step === "dikte" ? b.dikte.length : step === "golge" ? b.golge.length : 1;
  return p.k < n ? p : { ...p, k: 0 };
}
