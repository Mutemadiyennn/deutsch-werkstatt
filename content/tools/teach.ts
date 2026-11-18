/**
 * OD-0 / OD-7 "öğretmeden isteme" (PM-032): üretim maddesinin beklenen cevabındaki her içerik kelimesi
 * senaryoda (ya da `requires` ile bağlı senaryolarda) önceden öğretilmiş olmalı.
 * Öğretilmiş = temel ifadelerin Hochdeutsch + Alltag biçimi, temel kelimeler (çoğul ve fiil biçimleriyle),
 * ifade açıklamalarındaki kelime çipleri (parcalar) ve küçük bir kapalı işlev kelimesi listesi.
 */
import type { Lexeme, Pattern, Scenario } from "../../packages/shared/src/content.ts";

/** Kapalı sınıf: artikel, kişi zamirleri, sein/haben şimdiki zaman, temel bağlaç ve cevap kelimeleri. Sayılar, edatlar, modal fiiller burada YOK: öğretilmeleri gerekir. */
export const FUNCTION_WORDS = new Set(`der die das den dem des ein eine einen einem einer eines kein keine keinen keinem keiner
ich du er sie es wir ihr mich mir dich dir ihn ihm uns euch ihnen mein meine meinen meinem meiner dein deine ihr ihre ihren Ihr Ihre Ihren Ihrem Ihrer
bin bist ist sind seid habe hast hat haben habt und oder aber nicht ja nein bitte danke herr frau`.toLowerCase().split(/\s+/));

export const tokens = (s: string) => s.replace(/\{[^}|]*\|[^}]*\}/g, " ").replace(/\{name\}/g, " ").toLowerCase().replace(/[^a-zäöüß' ]/g, " ").split(/\s+/).map((t) => t.replace(/^'+|'+$/g, "")).filter((t) => t.length > 1);
const alts = (s: string) => [...s.matchAll(/\{([^}|]*)\|([^}]*)\}/g)].flatMap((m) => [m[1]!, m[2]!]).join(" ");

/** Çekim eki: öğretilmiş biçime yalnızca bu ekler eklenmiş/çıkarılmışsa aynı kelime sayılır (inceleme #49: önek sezgisi
 *  Mittag→Mittwoch, vier→vierzig, mein→Meinung gibi farklı kelimeleri geçiriyordu) */
const ENDINGS = ["e", "en", "er", "es", "em", "n", "s", "st", "t", "te", "ten", "est", "et"];
const NOT_INFLECTION = new Set(["nichts", "alles", "etwas"]);
export function near(a: string, b: string) {
  if (a === b) return true;
  if (NOT_INFLECTION.has(a) || NOT_INFLECTION.has(b)) return false;
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  const strip = (w: string) => ENDINGS.filter((e) => w.endsWith(e) && w.length - e.length >= 3).map((e) => w.slice(0, -e.length)).concat(w);
  // ortak gövde: iki biçimden ekler atılınca aynı gövde kalıyorsa (mache/machst/machen → mach)
  const sa = strip(s), la = strip(l);
  return sa.some((x) => x.length >= 3 && la.includes(x));
}

export function taughtSet(s: Scenario, lx: Map<string, Lexeme>, extra: Scenario[] = [], pt: Map<string, Pattern> = new Map()): Set<string> {
  const out = new Set<string>(FUNCTION_WORDS);
  for (const sc of [s, ...extra]) {
    // temel kalıpların öğrenciye gösterilen çerçevesi (frame_tr'deki kalın Almanca) öğretilmiş sayılır
    for (const id of sc.essentials.patterns) { const p = pt.get(id); for (const m of (p?.frame_tr || "").matchAll(/\*\*(.+?)\*\*/g)) for (const t of tokens(m[1]!)) out.add(t); }
    for (const c of sc.chunks.filter((c) => sc.essentials.chunks.includes(c.id))) {
      for (const t of tokens(`${c.layers.hd} ${c.layers.alltag || ""} ${alts(c.layers.hd)} ${alts(c.layers.alltag || "")}`)) out.add(t);
      for (const e of [c.exp, c.alltag_exp]) for (const p of e?.parcalar || []) for (const t of tokens(p.de)) out.add(t);
    }
    for (const id of sc.essentials.lexemes) {
      const l = lx.get(id); if (!l) continue;
      for (const t of tokens(`${l.de} ${l.pl || ""} ${l.verb?.praesens3 || ""} ${l.verb?.perfekt || ""}`)) out.add(t);
    }
  }
  return out;
}

export interface Untaught { item: string; words: string[] }
export function untaught(s: Scenario, lx: Map<string, Lexeme>, all: Scenario[] = [], pt: Map<string, Pattern> = new Map()): Untaught[] {
  const req = all.filter((x) => (s as { requires?: string[] }).requires?.includes(x.id));
  const T = taughtSet(s, lx, req, pt);
  const known = (w: string) => T.has(w) || [...T].some((t) => near(w, t));
  const out: Untaught[] = [];
  const check = (item: string, ans?: string) => { if (!ans) return; const bad = [...new Set(tokens(ans).filter((w) => !known(w)))]; if (bad.length) out.push({ item, words: bad }); };
  for (const b of s.build) check(b.id, b.accepted[0]);
  // inceleme #49 P1-2: diyaloğun öğrenci satırları ve konuşma görevlerinin örnek cevabı da üretim istemidir
  s.dialogues.forEach((dl, i) => dl.lines.forEach((l, j) => { if (l.r === "B") check(`dialog${i}#${j}`, (l.accepted && l.accepted[0]) || l.de); }));
  (s.speaking || []).forEach((sp, i) => check(`speaking[${i}]`, (sp as { model_de?: string }).model_de));
  for (const d of s.drills) {
    if (d.k === "pick") continue;
    if (d.k === "gap") check(d.id, d.de.replace("___", d.accepted[0] || ""));
    else if (d.k === "order") check(d.id, d.de);
    else check(d.id, (d as { accepted: string[] }).accepted[0]);
  }
  return out;
}
