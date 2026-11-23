/**
 * Cevap değerlendirme politikası (PEDAGOGY §7a):
 *  1) Yapay zekâsız: normalizasyon (v1 kuNorm/kuCore) + içerikteki accepted[] + kelime sırası esnekliği.
 *  2) Bunlar karar veremezse (cevap yakın ama eşleşmiyor) ve sunucu varsa: equiv_check.
 *  3) Yapay zekâ hata verirse: "kontrol edilemedi" — öğrenci cezalandırılmaz (yanlış sayılmaz).
 *  4) "Benim cevabım da doğru" her zaman vardır; kayıt içerik iyileştirme kuyruğuna gider.
 */
import { judge, norm, scoreHeard } from "./grading.ts";
import { esEsit, heceEsit, rakamEsit, umlautEksik, v2Sira, yazimNotu } from "./esdeger.ts";

/**
 * #58 A11: yapay zekâsız eşdeğer biçimler — saat/tarih/sıra sayısı (esEsit), uzun rakam dizisi. Eşleşen kabul biçimini döner.
 */
export function esdegerBul(accepted: string[], answer: string): string | undefined {
  return accepted.find((a) => esEsit(a, answer) || rakamEsit(a, answer));
}
export const V3_NOT = "Almancada çekimli fiil cümlenin ikinci yerindedir: başa bir kelime aldıysan fiil hemen ardından gelir.";

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
const POLITE_LEAD = new Set("entschuldigung hallo".split(" "));
const SON_DOLGU = new Set(["bitte", "danke", "danke schoen", "danke sehr", "vielen dank", "herzlichen dank", "gern", "gerne", "bitte schoen", "bitte sehr", "danke vielen dank"]);
const LEAD = new Set("ja also okay ok gut genau na dann super prima alles klar oder".split(" "));
const NEG = /\b(nein|nicht|kein\w*|nie|niemals|leider)\b/;
function containsWithFiller(variant: string, answer: string): boolean {
  const v = norm(variant).split(" ").filter(Boolean), a = norm(answer).split(" ").filter(Boolean);
  if (!v.length || a.length <= v.length || a.length - v.length > 4) return false;
  for (let i = 0; i + v.length <= a.length; i++) {
    if (!v.every((w, k) => a[i + k] === w)) continue;
    const pre = a.slice(0, i), post = a.slice(i + v.length);
    const neg = NEG.test(v.join(" "));
    // "Entschuldigen Sie" iki kelimelik nezaket başlangıcı; "sie" tek başına dolgu değildir (inceleme #49 3. tur)
    const preOk = pre.every((w, k) => POLITE.has(w) || POLITE_LEAD.has(w) || (w === "entschuldigen" && pre[k + 1] === "sie") || (w === "sie" && pre[k - 1] === "entschuldigen") || (!neg && LEAD.has(w)) || (neg && w === "nein"));
    // sondaki dolgu yalnızca nezaket ifadesi olarak: "bitte", "danke (schön|sehr)", "vielen/herzlichen Dank", "gern(e)";
    // tek başına "sehr" ya da "schön" anlamı değiştirir ("…Schmerzen sehr"; inceleme #76 permütasyon taraması)
    const postOk = !post.length || SON_DOLGU.has(post.join(" "));
    // baştaki "sehr" tek başına dolgu değil
    if (pre.includes("sehr") || pre.includes("schoen")) return false;
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

/* ───────────── PM-101 md. 6 (İÇ-6 7089902512): üç eşdeğerlik ───────────── */
const SAAT = "null|ein|zwei|zwo|drei|vier|f(?:ü|ue)nf|sechs|sieben|acht|neun|zehn|elf|zw(?:ö|oe)lf|dreizehn|vierzehn|f(?:ü|ue)nfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig|(?:ein|zwei|drei|vier)undzwanzig";
const DAKIKA = "\\d{2}|f(?:ü|ue)nf|zehn|f(?:ü|ue)nfzehn|zwanzig|f(?:ü|ue)nfundzwanzig|drei(?:ß|ss)ig|f(?:ü|ue)nfunddrei(?:ß|ss)ig|vierzig|f(?:ü|ue)nfundvierzig|f(?:ü|ue)nfzig|f(?:ü|ue)nfundf(?:ü|ue)nfzig";
// "um drei Uhr" → "um drei", "um 15.30 Uhr" → "um 15.30", "um acht Uhr dreißig" → "um acht dreißig", "um ein Uhr" → "um eins".
// Dakika yalnız "Uhr"dan sonra ("um acht dreißig Uhr" yanlış Almanca, dönüşmez); "eins" yalnız Uhr'suz ("um eins Uhr" dönüşmez).
const UHR = new RegExp(`(^|[^\\p{L}\\d])(um\\s+)(\\d{1,2}(?:[:.]\\d{2})?|${SAAT})\\s+uhr(?![\\p{L}])(\\s+(?:${DAKIKA})(?![\\p{L}\\d]))?`, "giu");
/** Karşılaştırma biçimi: saatte "Uhr" atılır, "Dr." → "Doktor". Yalnız karşılaştırmada kullanılır; ekranda özgün biçim kalır. */
export function esdegerBicim(s: string): string {
  return String(s || "")
    .replace(UHR, (_m, on: string, um: string, saat: string, dk: string | undefined) => on + um + (/^ein$/i.test(saat) && !dk ? "eins" : saat) + (dk || ""))
    .replace(/(^|[^\p{L}])Dr\.?(?=\s|$)/giu, (_m, on: string) => on + "Doktor");
}
const SELAM = /^\s*(?:hallo|hi|servus|gr(?:ü|ue|u)(?:ß|ss)\s+gott|guten\s+(?:tag|morgen|abend))(?![\p{L}])[\s,.!]*/iu;
const HITAP = /^(?:(?:herr|frau)\s+(?:(?:dr\.?|doktor)\s+)?[\p{L}][\p{L}-]*)/iu;
const AD = /^\p{Lu}[\p{L}-]*/u;
// selamdan sonra büyük harfle gelen bu sözcükler ad değildir (inceleme #227 P1-1: "Hallo! Nein, ich komme.")
const AD_DEGIL = new Set("nein ja doch also okay ok gut genau na dann super prima klar bitte danke entschuldigung sorry leider heute morgen gestern uebermorgen jetzt gleich spaeter bald hier da dort ich du er sie es wir ihr sie mein meine wie was wo wann warum wer und oder aber".split(" "));
/**
 * Baştaki selam ve hitap dolgudur ("Guten Tag, Frau Brandl, ich habe …"). Hitap selamsız geldiyse virgül ya da ünlemle
 * ayrılmış olmalı ("Frau Brandl ist nicht da" hitap değildir); selamdan sonra büyük harfli tek ad da hitaptır ("Hallo Tobi, …").
 * Dönen biçimler: selamsız, selamsız + hitapsız (boş kalan aday yok).
 */
export function hitapsiz(answer: string, accepted: string[] = []): string[] {
  const out: string[] = [];
  let s = String(answer || "");
  const sm = SELAM.exec(s);
  if (sm) { s = s.slice(sm[0].length); if (s.trim()) out.push(s); }
  // selamdan sonraki tek ad: dolgu/olumsuzluk/zaman sözcüğü ya da kabul cümlelerinde geçen sözcük ad değildir
  const kabulSoz = new Set(accepted.flatMap((a) => norm(a).split(" ")));
  const ad = sm ? AD.exec(s) : null;
  const hm = HITAP.exec(s) || (ad && !AD_DEGIL.has(norm(ad[0])) && !kabulSoz.has(norm(ad[0])) ? ad : null);
  if (hm) {
    const kalan = s.slice(hm[0].length), ayrac = /^\s*[,!.]/.test(kalan);
    if ((ayrac || (sm && HITAP.test(s))) && kalan.replace(/^[\s,!.]+/, "").trim()) out.push(kalan.replace(/^[\s,!.]+/, ""));
  }
  return out;
}

/**
 * Kural kararı. PM-101 md. 6'nın üç eşdeğerliği yalnız "doğru"ya çevirir; özgün yolun "doğru" dediği hiçbir cevabın
 * sonucu değişmez. Dikte bu işlevi kullanmaz (`dikteKarar`).
 */
export function ruleVerdict(accepted: string[], answer: string): Verdict {
  const v = kuralKarar(accepted, answer);
  if (v.kind === "correct") return v;
  const accE = accepted.map(esdegerBicim);
  // selamla başlayan kabulde selam cevabın özüdür: selamı soyulmuş cevap onunla karşılaştırılmaz ("Guten Tag, guten Morgen!" ≠ "Guten Morgen!")
  const selamsizE = accE.filter((a) => !SELAM.test(a));
  const degisti = accE.some((a, i) => a !== accepted[i]);
  for (const c of [answer, ...hitapsiz(answer, accepted)]) {
    const cE = esdegerBicim(c), liste = c === answer ? accE : selamsizE;
    if ((c === answer && !degisti && cE === c) || !liste.length) continue;
    const w = kuralKarar(liste, cE);
    if (w.kind === "correct") {
      const i = accE.indexOf(w.best);
      return { kind: "correct", best: i >= 0 ? accepted[i]! : w.best, via: "variant", note: w.note };
    }
  }
  return v;
}

/**
 * Dikte ("Duyduğunu yaz", PM-102 md. 4): yalnız duyulan cümle doğrudur. Büyük/küçük harf, noktalama, ümlaut yazımı
 * (ae/oe/ue) ve rakam/yazı farkı yok sayılır (yazım notu gösterilir); sözcük sırası, dolgu, eşanlamlı ve görev cümlesinin
 * öbür kabulleri dikte cevabı değildir. Hitapsız profilde ekrandaki "Patient/Patientin" iki biçimden biriyle karşılanır.
 */
export function dikteKarar(duyulan: string, answer: string): Verdict {
  const ALT = /(\p{L}+)\/(\p{L}+)/u;
  let bicimler = [duyulan];
  for (let k = 0; k < 4; k++) bicimler = bicimler.flatMap((b) => (ALT.test(b) ? [b.replace(ALT, "$1"), b.replace(ALT, "$2")] : [b]));
  const best = bicimler.find((b) => norm(b) === norm(answer));
  if (best && norm(answer)) return { kind: "correct", best, via: answer.trim() === best.trim() ? "exact" : "variant", note: yazimNotu(best, answer) };
  const ilk = bicimler[0] ?? duyulan;
  return { kind: "wrong", best: ilk, words: judge([ilk], [answer]).words, note: umlautEksik(ilk, answer) || undefined };
}

function kuralKarar(accepted: string[], answer: string): Verdict {
  const j = judge(accepted, [answer]);
  if (j.ok) return { kind: "correct", best: j.best, via: norm(j.best) === norm(answer) ? "exact" : "variant", note: yazimNotu(j.best, answer) };
  // fiil üçüncü yerde (Gern ich möchte…) dolgu kuralından önce: baştaki "gern" dolgu sayılıp doğru verilmesin (inceleme #76 2. tur K2)
  const v3once = v2Sira(accepted, answer);
  if (v3once?.kind === "v3") return { kind: "wrong", best: v3once.best, note: V3_NOT };
  const longer = accepted.find((a) => containsWithFiller(a, answer));
  if (longer) return { kind: "correct", best: longer, via: "variant" };
  if (!norm(answer)) return { kind: "wrong", best: accepted[0] || "" };
  // #58 A11: saat/tarih/rakam/ümlaut eşdeğeri, harf harf söyleme yuvaları, kelime sırası (V2)
  const es = esdegerBul(accepted, answer);
  if (es) return { kind: "correct", best: es, via: "variant", note: yazimNotu(es, answer) };
  if (heceEsit(accepted, answer)) return { kind: "correct", best: accepted[0] || "", via: "variant" };
  const sira = v3once;
  if (sira?.kind === "correct") return { kind: "correct", best: sira.best, via: "order" };
  // ümlautu unutulmuş cevap: doğru sayılmaz, yazım notu gösterilir
  for (const a of accepted) { const n = umlautEksik(a, answer); if (n) return { kind: "wrong", best: a, note: n }; }
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

/** D-097: puan ve öğrenci modeli için doğru sayılma — yalnızca kural "doğru" dediyse ya da öğrenci "aynı anlamda" dediyse.
 *  "Kontrol edilemedi" kendiliğinden başarı değildir (inceleme #43 P0-2). */
export const countsAsCorrect = (kind: Verdict["kind"], claimed: boolean) => kind === "correct" || claimed;
