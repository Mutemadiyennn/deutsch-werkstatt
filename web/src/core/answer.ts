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

/** Aynı kelimeler farklı sırada: Almancada çoğu zaman yanlış ama bazen doğru; karar yapay zekâya bırakılır, kendi başına doğru sayılmaz */
const bag = (s: string) => norm(s).split(" ").filter(Boolean).sort().join(" ");

export function ruleVerdict(accepted: string[], answer: string): Verdict {
  const j = judge(accepted, [answer]);
  if (j.ok) return { kind: "correct", best: j.best, via: norm(j.best) === norm(answer) ? "exact" : "variant" };
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
