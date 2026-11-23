/**
 * "Bu ne demek?" ve uzun basma için yerel sözlük (#58 A11): önce cihazdaki kartlar, yapay zekâ yalnızca isteğe bağlı ek.
 * Sıra: bütün ifade (senaryonun iletişim kalıbı, kalıp örneği, kart, başlık ifadesi, eşdizim, örnek cümle) → tek kelime
 * (çekimli biçimden kart, kartBul) → cümle: önce içindeki kalıplar BÜTÜN olarak ("Grüß Gott" = merhaba; "Gott" ayrıca
 * açıklanmaz; PM finali #218), sonra kalan kelimeler tek tek. Hiçbiri yoksa null (arayüz "sözlükte yok" der).
 */
import type { Chunk, Lexeme, Pattern } from "@dw/shared";
import { norm } from "./grading.ts";
import { kartBul } from "./medya.ts";

export interface YerelAciklama {
  kaynak: "ifade" | "kelime" | "kelimeler";
  de: string;
  tr?: string;
  art?: "der" | "die" | "das";
  /** ifade bir kartın eşdizimi ya da örneğiyse, o kartın kelimesi */
  kart?: string;
  /** ne zaman söylenir (iletişim kalıbının açıklamasından; ör. "Güneyde selamlaşırken söylenir") */
  not?: string;
  /** cümlede bütün olarak açıklanan kalıplar (kelime kelime bölünmez) */
  ifadeler?: { de: string; tr: string; not?: string }[];
  kelimeler?: { w: string; de: string; tr: string; art?: "der" | "die" | "das" }[];
}

/** Ek kaynaklar: oynatılan senaryonun iletişim kalıpları ve kalıp kayıtları */
export interface YerelEk { chunks?: Chunk[]; patterns?: Pattern[] }
interface Aday { de: string; tr: string; kart?: string; not?: string; t: string[] }

/** Açıklamadaki **kalın** işaretini düz metne çevirir (yerel cevap düz metin gösterir) */
const duz = (s?: string) => s?.replace(/\*\*/g, "").trim() || undefined;
/** Yer tutucusuz ifadeler (yer tutucu: ___, …, [Name], {name}, "+ isim") */
const ifadeMi = (de: string) => !/_{2,}|…|\.\.\.|\[|\{|\+/.test(de);
const parcala = (s: string) => norm(s).split(" ").filter(Boolean);
function adayEkle(a: Aday[], de: string | undefined, tr: string | undefined, o: Partial<Aday> = {}) {
  if (!de || !tr || !ifadeMi(de)) return;
  const t = parcala(temiz(de));
  if (t.length) a.push({ de: temiz(de), tr, t, ...o });
}
/** İletişim kalıpları (senaryo; açıklamasının "ne zaman" satırıyla) ve kalıp örnekleri: her çağrıda (küçük liste) */
function ekAdaylar(ek: YerelEk): Aday[] {
  const a: Aday[] = [];
  for (const c of ek.chunks ?? []) {
    const not = duz(c.exp?.ne_zaman_tr);
    adayEkle(a, c.layers.hd, c.tr, { not });
    adayEkle(a, c.layers.alltag, c.tr, { not: duz(c.alltag_exp?.ne_zaman_tr) ?? not });
    if (c.layers.bair?.status === "verified") adayEkle(a, c.layers.bair.text, c.tr, { not: duz(c.layers.bair.note_tr) ?? not });
  }
  for (const p of ek.patterns ?? []) for (const x of p.examples) adayEkle(a, x.de, x.tr);
  return a;
}
/** Kartlardaki çok kelimeli ifadeler (başlık ifadesi, eşdizim): sözlük başına bir kez */
const kartAday = new WeakMap<Lexeme[], Aday[]>();
function kartAdaylar(lex: Lexeme[]): Aday[] {
  let a = kartAday.get(lex);
  if (a) return a;
  a = [];
  for (const l of lex) {
    if (l.head) adayEkle(a, l.head.de, l.head.tr, { kart: l.de });
    // kartın açıklaması eşdizimi **kalın** anıyorsa o cümle "ne zaman" notudur ("Güneyde selamlaşırken Grüß Gott dersin.")
    const notlar = [l.exp?.ne_zaman_tr, l.exp?.ipucu_tr].filter((x): x is string => !!x);
    for (const c of l.collocations) {
      const n = norm(c.de);
      const not = notlar.find((x) => [...x.matchAll(/\*\*([^*]+)\*\*/g)].some((m) => norm(m[1]!) === n));
      adayEkle(a, c.de, c.tr, { kart: l.de, ...(not ? { not: duz(not) } : {}) });
    }
  }
  kartAday.set(lex, a);
  return a;
}

const temiz = (s: string) => s.replace(/[„“"»«()]/g, "").replace(/\s+/g, " ").trim();

export function yerelAcikla(metin: string, lex: Lexeme[], ek: YerelEk = {}): YerelAciklama | null {
  const t = temiz(metin);
  const n = norm(t);
  if (!n) return null;
  const ekA = ekAdaylar(ek);
  // 1) bütün ifade: önce iletişim kalıbı ve kalıp örneği (açıklamasıyla), sonra kartlar
  const tam = ekA.find((x) => x.t.join(" ") === n);
  if (tam) return { kaynak: "ifade", de: tam.de, tr: tam.tr, ...(tam.not ? { not: tam.not } : {}) };
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
  // 3) cümle: önce içindeki kalıplar bütün olarak (en uzun önce, örtüşmeden), sonra kalan kelimeler tek tek (aynı kart bir kez)
  const tok = sozler.map((w) => norm(w));
  const kapali = new Array<boolean>(tok.length).fill(false);
  const bulunan: { i: number; x: Aday }[] = [];
  // sıralama kararlı: aynı uzunlukta iletişim kalıbı karttan önce gelir
  for (const x of [...ekA, ...kartAdaylar(lex)].filter((y) => y.t.length >= 2 && y.t.length <= tok.length).sort((p, q) => q.t.length - p.t.length)) {
    for (let i = 0; i + x.t.length <= tok.length; i++) {
      if (x.t.every((w, j) => tok[i + j] === w && !kapali[i + j])) {
        for (let j = 0; j < x.t.length; j++) kapali[i + j] = true;
        if (!bulunan.some((b) => norm(b.x.de) === norm(x.de))) bulunan.push({ i, x });
        break;
      }
    }
  }
  const ifadeler = bulunan.sort((p, q) => p.i - q.i).map(({ x }) => ({ de: x.de, tr: x.tr, ...(x.not ? { not: x.not } : {}) }));
  const kelimeler: NonNullable<YerelAciklama["kelimeler"]> = [];
  sozler.forEach((w, i) => {
    if (kapali[i]) return;
    const k = kartBul(w, lex);
    if (k && !kelimeler.some((x) => x.de === k.de)) kelimeler.push({ w: w.replace(/[.,!?;:]/g, ""), de: k.de, tr: k.tr, art: k.art });
  });
  return kelimeler.length || ifadeler.length ? { kaynak: "kelimeler", de: t, ...(ifadeler.length ? { ifadeler } : {}), kelimeler } : null;
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
