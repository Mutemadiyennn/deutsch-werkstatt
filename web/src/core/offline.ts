/**
 * Yapay zekâsız rol oyunu (PM-035 §4): sahneyle eşleşen diyalog seçilir; tekrar/yavaşlatma isteğine kural tabanlı cevap.
 */
import type { Scenario } from "@dw/shared";

const toks = (s: string) => new Set(s.toLowerCase().replace(/[^a-zäöüß ]/g, " ").split(/\s+/).filter((t) => t.length > 2));
const overlap = (a: string, b: string) => { const A = toks(a), B = toks(b); let n = 0; for (const t of A) if (B.has(t)) n++; return n / Math.max(1, Math.min(A.size, B.size)); };

/** Rol oyununun açılış cümlesine en çok benzeyen karşı taraf satırı hangi diyalogdaysa o oynanır */
export function offlineDialogueIndex(s: Scenario): number {
  let best = 0, score = -1;
  s.dialogues.forEach((d, i) => {
    const firstA = d.lines.find((l) => l.r === "A")?.de || "";
    const sc = Math.max(overlap(s.roleplay.opener_de, firstA), ...d.lines.filter((l) => l.r === "A").map((l) => overlap(s.roleplay.opener_de, l.de) * 0.8));
    if (sc > score) { score = sc; best = i; }
  });
  return best;
}
/** Öğrenci tekrar ya da yavaş söylemeyi istedi mi? (strateji dersinin işe yaradığını göstermek için aynı satır yavaş tekrarlanır) */
export function isRepeatRequest(text: string): boolean {
  return /\b(noch\s*(ein)?mal|nochmal|wiederholen|langsamer|wie\s+bitte|bitte\s+was|nicht\s+verstanden|verstehe\s+(ich\s+)?nicht)\b/i.test(text);
}
