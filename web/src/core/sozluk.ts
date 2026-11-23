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
  kelimeler?: { w: string; de: string; tr: string; art?: "der" | "die" | "das"; ifade?: boolean }[];
}

/** Sözlükteki çok sözcüklü kalıplar (eşdizim, başlık ifadesi, çok sözcüklü kart): normalleştirilmiş sözcük dizisiyle.
 *  "…" yuvalı kalıplar ("auf … warten") cümlede birebir aranamaz, alınmaz. */
type Kalip = { t: string[]; de: string; tr: string; kart?: string };
const KALIP = new WeakMap<Lexeme[], Kalip[]>();
function kaliplar(lex: Lexeme[]): Kalip[] {
  const hazir = KALIP.get(lex);
  if (hazir) return hazir;
  const out: Kalip[] = [];
  const ekle = (de: string, tr: string, kart?: string) => {
    if (/…|\.\.\./.test(de)) return;
    const t = norm(de).split(" ").filter(Boolean);
    if (t.length >= 2) out.push({ t, de, tr, kart });
  };
  for (const l of lex) {
    if (!l.de.includes(",")) ekle(l.de, l.tr);   // "a, b" biçimli kart iki başlıktır, kalıp değil
    if (l.head) ekle(l.head.de, l.head.tr, l.de);
    for (const c of l.collocations) ekle(c.de, c.tr, l.de);
  }
  out.sort((a, b) => b.t.length - a.t.length);   // uzun kalıp önce: "Grüß Gott" "Gott"tan, "einen Termin machen" "Termin"den önce
  KALIP.set(lex, out);
  return out;
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
  // 3) cümle: önce içindeki kalıplar bütün olarak ("grüß Gott" = Merhaba!, "Gott" = Tanrı değil; PM finali #218),
  //    kalan sözcükler kelime kelime (aynı kart bir kez); sıra cümledeki sıra
  const nt = sozler.map((w) => norm(w).replace(/ /g, ""));
  const kullanildi = new Array<boolean>(sozler.length).fill(false);
  const bulunan: { i: number; x: NonNullable<YerelAciklama["kelimeler"]>[number] }[] = [];
  for (const k of kaliplar(lex)) {
    if (k.t.length > nt.length) continue;
    for (let i = 0; i + k.t.length <= nt.length; i++) {
      if (!k.t.every((w, j) => nt[i + j] === w && !kullanildi[i + j])) continue;
      for (let j = 0; j < k.t.length; j++) kullanildi[i + j] = true;
      if (!bulunan.some((b) => b.x.de === k.de)) bulunan.push({ i, x: { w: sozler.slice(i, i + k.t.length).join(" ").replace(/[.,!?;:„“"]/g, ""), de: k.de, tr: k.tr, ifade: true } });
    }
  }
  sozler.forEach((w, i) => {
    if (kullanildi[i]) return;
    const k = kartBul(w, lex);
    if (k && !bulunan.some((b) => b.x.de === k.de)) bulunan.push({ i, x: { w: w.replace(/[.,!?;:]/g, ""), de: k.de, tr: k.tr, art: k.art } });
  });
  const kelimeler = bulunan.sort((a, b) => a.i - b.i).map((b) => b.x);
  return kelimeler.length ? { kaynak: "kelimeler", de: t, kelimeler } : null;
}

/** Uzun basılan sözcük cümlede bir kalıbın parçasıysa kalıbın bütünü ("Gott" → "Grüß Gott!"): tek sözcük anlamı yanıltır */
export function kalipIcinde(kelime: string, cumle: string, lex: Lexeme[]): YerelAciklama | null {
  const a = yerelAcikla(cumle, lex);
  const w = norm(kelime).replace(/ /g, "");
  const k = a?.kelimeler?.find((x) => x.ifade && x.w.split(" ").some((s) => norm(s).replace(/ /g, "") === w));
  return k ? { kaynak: "ifade", de: k.de, tr: k.tr } : null;
}

/** Uzun basılan noktadaki kelime (WebKit: caretRangeFromPoint; diğerleri: caretPositionFromPoint) */
export function noktadakiKelime(x: number, y: number, el?: HTMLElement | null): string | null {
  const d = document as Document & { caretRangeFromPoint?: (x: number, y: number) => Range | null; caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null };
  let node: Node | null = null, off = 0;
  // genel metin seçimi kapalı (user-select: none): WebKit'te isabet testi için öğe kısa süre seçilebilir yapılır (inceleme #76 P1-7)
  const st = el?.style as (CSSStyleDeclaration & { webkitUserSelect?: string }) | undefined;
  const eski = st ? [st.userSelect, st.webkitUserSelect ?? ""] : null;
  if (st) { st.userSelect = "text"; st.webkitUserSelect = "text"; }
  try {
    const r = d.caretRangeFromPoint?.(x, y);
    if (r) { node = r.startContainer; off = r.startOffset; }
    else { const p = d.caretPositionFromPoint?.(x, y); if (p) { node = p.offsetNode; off = p.offset; } }
  } finally { if (st && eski) { st.userSelect = eski[0]!; st.webkitUserSelect = eski[1]!; } }
  if (!node || node.nodeType !== Node.TEXT_NODE) return null;
  const s = node.textContent || "";
  const harf = /[\p{L}\p{N}'’-]/u;
  let a = off, b = off;
  while (a > 0 && harf.test(s[a - 1]!)) a--;
  while (b < s.length && harf.test(s[b]!)) b++;
  const w = s.slice(a, b).replace(/^[-'’]+|[-'’]+$/g, "");
  return w && /\p{L}/u.test(w) ? w : null;
}
