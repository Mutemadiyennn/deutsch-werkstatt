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
export function expandTaught(accepted: string[], chunks: { layers: { hd: string; alltag?: string } }[]): string[] {
  const out = new Set(accepted);
  const strip = (s: string) => s.replace(/[.!?…]+$/, "").trim();
  for (const a of accepted) for (const c of chunks) {
    const hd = strip(c.layers.hd), al = c.layers.alltag ? strip(c.layers.alltag) : "";
    if (!al || hd.includes("…") || al.includes("…")) continue;
    if (a.includes(hd)) out.add(a.replace(hd, al));
    if (a.includes(al)) out.add(a.replace(al, hd));
  }
  return [...out];
}
/** Uzun ama doğru cevap: beklenen cevabın tamamı + yalnızca nezaket/dolgu kelimeleri (PM-032 §4) */
const FILLER = new Set("oder ja bitte danke gerne gern also okay ok gut super genau dann schön vielen dank sehr herzlichen prima alles klar na".split(" "));
function containsWithFiller(variant: string, answer: string): boolean {
  const v = norm(variant).split(" ").filter(Boolean), a = norm(answer).split(" ").filter(Boolean);
  if (!v.length || a.length <= v.length || a.length - v.length > 4) return false;
  for (let i = 0; i + v.length <= a.length; i++) {
    if (v.every((w, k) => a[i + k] === w)) { const extra = [...a.slice(0, i), ...a.slice(i + v.length)]; return extra.every((w) => FILLER.has(w)); }
  }
  return false;
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
    const j = judge(accepted, [answer]);
    return { kind: "wrong", best: v.best, words: j.words };
  }
  try {
    const r = await ai(accepted, answer, prompt_tr);
    return r.ok ? { kind: "correct", best: v.best, via: "ai", note: r.reason_tr } : { kind: "wrong", best: v.best, words: judge(accepted, [answer]).words, note: r.reason_tr };
  } catch (e) {
    return { kind: "unchecked", best: v.best, note: (e as { message_tr?: string }).message_tr || "Öğretmen kontrolü şu an yapılamadı." };
  }
}
