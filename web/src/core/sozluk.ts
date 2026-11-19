/**
 * "Bu ne demek?" ve uzun basma için yerel sözlük (#58 A11): önce cihazdaki kartlar, yapay zekâ yalnızca isteğe bağlı ek.
 * Sıra: bütün ifade (kart, başlık ifadesi, eşdizim, örnek cümle) → tek kelime (çekimli biçimden kart, kartBul) →
 * cümlede kelime kelime anlamlar. Hiçbiri yoksa null (arayüz "sözlükte yok" der; varsa öğretmene sorma düğmesi).
 */
import type { Lexeme } from "@dw/shared";
import { norm } from "./grading.ts";
import { kartBul } from "./medya.ts";

export interface YerelAciklama {
  kaynak: "ifade" | "kelime" | "kelimeler";
  de: string;
  tr?: string;
  art?: "der" | "die" | "das";
  /** ifade bir kartın eşdizimi ya da örneğiyse, o kartın kelimesi */
  kart?: string;
  kelimeler?: { w: string; de: string; tr: string; art?: "der" | "die" | "das" }[];
}

const temiz = (s: string) => s.replace(/[„“"»«()]/g, "").replace(/\s+/g, " ").trim();

export function yerelAcikla(metin: string, lex: Lexeme[]): YerelAciklama | null {
  const t = temiz(metin);
  const n = norm(t);
  if (!n) return null;
  // 1) bütün ifade
  for (const l of lex) {
    if (norm(l.de) === n) return { kaynak: "ifade", de: l.de, tr: l.tr, art: l.art };
    if (l.head && norm(l.head.de) === n) return { kaynak: "ifade", de: l.head.de, tr: l.head.tr, kart: l.de };
  }
  for (const l of lex) {
    const c = l.collocations.find((x) => norm(x.de) === n);
    if (c) return { kaynak: "ifade", de: c.de, tr: c.tr, kart: l.de };
    const e = l.examples.find((x) => norm(x.de) === n);
    if (e) return { kaynak: "ifade", de: e.de, tr: e.tr, kart: l.de };
  }
  const sozler = t.split(" ").filter((w) => /\p{L}/u.test(w));
  // 2) tek kelime (çekimli biçim dahil)
  if (sozler.length === 1) {
    const k = kartBul(sozler[0]!, lex);
    return k ? { kaynak: "kelime", de: k.de, tr: k.tr, art: k.art } : null;
  }
  // 3) cümle: kelime kelime (aynı kart bir kez)
  const kelimeler: NonNullable<YerelAciklama["kelimeler"]> = [];
  for (const w of sozler) {
    const k = kartBul(w, lex);
    if (k && !kelimeler.some((x) => x.de === k.de)) kelimeler.push({ w: w.replace(/[.,!?;:]/g, ""), de: k.de, tr: k.tr, art: k.art });
  }
  return kelimeler.length ? { kaynak: "kelimeler", de: t, kelimeler } : null;
}

/** Uzun basılan noktadaki kelime (WebKit: caretRangeFromPoint; diğerleri: caretPositionFromPoint) */
export function noktadakiKelime(x: number, y: number): string | null {
  const d = document as Document & { caretRangeFromPoint?: (x: number, y: number) => Range | null; caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null };
  let node: Node | null = null, off = 0;
  const r = d.caretRangeFromPoint?.(x, y);
  if (r) { node = r.startContainer; off = r.startOffset; }
  else { const p = d.caretPositionFromPoint?.(x, y); if (p) { node = p.offsetNode; off = p.offset; } }
  if (!node || node.nodeType !== Node.TEXT_NODE) return null;
  const s = node.textContent || "";
  const harf = /[\p{L}\p{N}'’-]/u;
  let a = off, b = off;
  while (a > 0 && harf.test(s[a - 1]!)) a--;
  while (b < s.length && harf.test(s[b]!)) b++;
  const w = s.slice(a, b).replace(/^[-'’]+|[-'’]+$/g, "");
  return w && /\p{L}/u.test(w) ? w : null;
}
