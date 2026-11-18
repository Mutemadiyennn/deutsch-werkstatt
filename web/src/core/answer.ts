/**
 * Cevap değerlendirme politikası (PEDAGOGY §7a):
 *  1) Yapay zekâsız: normalizasyon (v1 kuNorm/kuCore) + içerikteki accepted[] + kelime sırası esnekliği.
 *  2) Bunlar karar veremezse (cevap yakın ama eşleşmiyor) ve sunucu varsa: equiv_check.
 *  3) Yapay zekâ hata verirse: "kontrol edilemedi" — öğrenci cezalandırılmaz (yanlış sayılmaz).
 *  4) "Benim cevabım da doğru" her zaman vardır; kayıt içerik iyileştirme kuyruğuna gider.
 */
import { judge, norm, scoreHeard } from "./grading.ts";

export type Verdict =
  | { kind: "correct"; best: string; via: "exact" | "variant" | "order" | "ai" | "claim"; note?: string }
  | { kind: "wrong"; best: string; words?: { w: string; st: string }[]; note?: string }
  | { kind: "unchecked"; best: string; note: string }
  | { kind: "ask_ai"; best: string };

/**
 * PM-032 §4: senaryoda öğretilmiş eşdeğer biçimler otomatik kabul edilir.
 * Bir kabul cevabı bir ifadenin Hochdeutsch biçimini içeriyorsa Alltag biçimli hâli de eklenir (ve tersi).
 */
/** Kayıt hedefli madde: yönerge belirli bir biçimi (gündelik/resmî, Sie/du) istiyorsa eşdeğer genişletme yapılmaz (inceleme #49 P1-1) */
// İnceleme #49 P1-5: yalnızca açıkça biçim isteyen yönergeler ("kibar", "arkadaşına", "lehçe" durum anlatır, biçim istemez)
export const REGISTER_HINT = /gündelik|alltag|resm[iî]|\bsie ile\b|\bdu ile\b/i;
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Kelime sınırına saygılı, büyük/küçük harf duyarsız değiştirme */
function swap(text: string, from: string, to: string): string | null {
  const re = new RegExp(`(^|[^\\p{L}])${esc(from)}(?![\\p{L}])`, "iu");
  if (!re.test(text)) return null;
  return text.replace(re, (_m, pre: string) => pre + to);
}
/**
 * PM-032 §4: senaryoda öğretilmiş eşdeğer biçimler otomatik kabul edilir.
 * Bir kabul cevabı bir ifadenin Hochdeutsch biçimini içeriyorsa Alltag biçimli hâli de eklenir (ve tersi).
 * Kayıt hedefli maddelerde (opts.register) ve dönüşüm maddelerinde çağrılmaz.
 */
export function expandTaught(accepted: string[], chunks: { layers: { hd: string; alltag?: string } }[]): string[] {
  const out = new Map(accepted.map((a) => [norm(a), a] as const));
  const strip = (s: string) => s.replace(/[.!?…]+$/, "").trim();
  for (const a of accepted) for (const c of chunks) {
    const hd = strip(c.layers.hd), al = c.layers.alltag ? strip(c.layers.alltag) : "";
    if (!al || hd.includes("…") || al.includes("…") || norm(hd) === norm(al)) continue;
    // biri öbürünü içeriyorsa (Wiederhören ⊂ Auf Wiederhören) kısa biçim yalnızca uzun biçim metinde yokken genişletilir
    const has = (t: string, f: string) => swap(t, f, f) !== null;
    const cands = [has(a, al) && al.length < hd.length && has(a, hd) ? null : swap(a, al, hd), has(a, hd) && hd.length < al.length && has(a, al) ? null : swap(a, hd, al)];
    for (const x of cands) if (x && !out.has(norm(x))) out.set(norm(x), x);
  }
  return [...out.values()];
}
/**
 * Uzun ama doğru cevap: beklenen cevap + yalnızca nezaket kelimeleri (PM-032 §4). İnceleme #49: anlamı kaydıran ekler
 * reddedilir — değerlendirme kelimeleri (gut, super…) sona eklenemez; başa "ja/also/okay…" yalnızca beklenen cevap
 * olumsuz değilse eklenebilir ("Ja, nein." ≠ "Nein.").
 */
// norm() ümlautları açar (schön → schoen): listeler normalleştirilmiş biçimde
const POLITE = new Set("bitte danke vielen dank sehr herzlichen schoen gern gerne".split(" "));
const POLITE_LEAD = new Set("entschuldigung entschuldigen sie hallo".split(" "));
const LEAD = new Set("ja also okay ok gut genau na dann super prima alles klar oder".split(" "));
const NEG = /\b(nein|nicht|kein\w*|nie|niemals|leider)\b/;
function containsWithFiller(variant: string, answer: string): boolean {
  const v = norm(variant).split(" ").filter(Boolean), a = norm(answer).split(" ").filter(Boolean);
  if (!v.length || a.length <= v.length || a.length - v.length > 4) return false;
  for (let i = 0; i + v.length <= a.length; i++) {
    if (!v.every((w, k) => a[i + k] === w)) continue;
    const pre = a.slice(0, i), post = a.slice(i + v.length);
    const neg = NEG.test(v.join(" "));
    const preOk = pre.every((w) => POLITE.has(w) || POLITE_LEAD.has(w) || (!neg && LEAD.has(w)) || (neg && w === "nein"));
    const postOk = post.every((w) => POLITE.has(w));
    return preOk && postOk;
  }
  return false;
}
/** Dönüşüm maddesi: verilen cümlenin aynen tekrarı doğru sayılmaz */
export function isSameAsGiven(given: string | undefined, answer: string): boolean {
  return !!given && norm(given) === norm(answer);
}

/** Aynı kelimeler farklı sırada: Almancada çoğu zaman yanlış ama bazen doğru; karar yapay zekâya bırakılır, kendi başına doğru sayılmaz */
const bag = (s: string) => norm(s).split(" ").filter(Boolean).sort().join(" ");

export function ruleVerdict(accepted: string[], answer: string): Verdict {
  const j = judge(accepted, [answer]);
  if (j.ok) return { kind: "correct", best: j.best, via: norm(j.best) === norm(answer) ? "exact" : "variant" };
  const longer = accepted.find((a) => containsWithFiller(a, answer));
  if (longer) return { kind: "correct", best: longer, via: "variant" };
  if (!norm(answer)) return { kind: "wrong", best: accepted[0] || "" };
  const best = j.best || accepted[0] || "";
  const sc = scoreHeard(best, answer).score;
  // çok uzak cevap: yapay zekâya sormaya değmez (anlam açıkça farklı)
  if (sc < 0.34 && !accepted.some((a) => bag(a) === bag(answer))) return { kind: "wrong", best, words: j.words, note: undefined };
  return { kind: "ask_ai", best };
}

export interface AiChecker { (expected: string[], answer: string, prompt_tr: string): Promise<{ ok: boolean; reason_tr: string }> }

export async function verdict(accepted: string[], answer: string, prompt_tr: string, ai?: AiChecker): Promise<Verdict> {
  const v = ruleVerdict(accepted, answer);
  if (v.kind !== "ask_ai") return v;
  if (!ai) {
    // yapay zekâsız: kurallarımın tanımadığı yakın cevap yanlış sayılmaz (doğru cevabın reddi 0, PM-032)
    return { kind: "unchecked", best: v.best, note: "Bu cevabı kendi kurallarım tanımadı. Doğrusu yanda; seninki de doğruysa bildir." };
  }
  try {
    const r = await ai(accepted, answer, prompt_tr);
    return r.ok ? { kind: "correct", best: v.best, via: "ai", note: r.reason_tr } : { kind: "wrong", best: v.best, words: judge(accepted, [answer]).words, note: r.reason_tr };
  } catch (e) {
    return { kind: "unchecked", best: v.best, note: (e as { message_tr?: string }).message_tr || "Öğretmen kontrolü şu an yapılamadı." };
  }
}
