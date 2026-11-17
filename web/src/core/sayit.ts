/**
 * "Bunu Almanca nasıl derim?" — önce yerel arama (PEDAGOGY §7f): kayıttaki Türkçe karşılıklar (ifadeler, kelimeler, kalıp örnekleri).
 * Yapay zekâ yalnızca yerelde bulunamazsa çağrılır.
 */
export interface LocalEntry { de: string; tr: string; kind: "chunk" | "lexeme" | "example"; id?: string }
const trNorm = (s: string) => s.toLocaleLowerCase("tr-TR").replace(/[.,;:!?()"'“”…]/g, " ").replace(/\s+/g, " ").trim();
const STOP = new Set(["bir", "ve", "bu", "şu", "o", "ben", "sen", "mi", "mı", "mu", "mü", "de", "da", "ile", "için", "çok", "ne", "ama"]);
const toks = (s: string) => trNorm(s).split(" ").filter((t) => t.length > 1 && !STOP.has(t));
/** Türkçe ekler için kaba kök eşleşmesi: ilk 5 harf */
const stem = (t: string) => t.slice(0, Math.max(3, Math.min(5, t.length)));

export function localSayIt(tr: string, entries: LocalEntry[], max = 3): LocalEntry[] {
  const q = toks(tr).map(stem);
  if (!q.length) return [];
  const exact = entries.filter((e) => trNorm(e.tr) === trNorm(tr));
  if (exact.length) return exact.slice(0, max);
  const scored = entries
    .map((e) => { const et = new Set(toks(e.tr).map(stem)); const hit = q.filter((t) => et.has(t)).length; return { e, sc: hit / Math.max(q.length, et.size) }; })
    .filter((x) => x.sc >= 0.6)
    .sort((a, b) => b.sc - a.sc || (a.e.kind === "chunk" ? -1 : 1));
  return scored.slice(0, max).map((x) => x.e);
}
