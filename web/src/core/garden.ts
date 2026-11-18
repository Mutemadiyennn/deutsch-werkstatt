/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu — kartlar öğrenciye SORU olarak döner.
 * Saf fonksiyonlar; ekran `screens/Garden.tsx`.
 *
 * Soru türleri (PM-049 §2):
 *  a listen_meaning  dinle → anlamını seç                 (pasif)
 *  e article         der / die / das seç                  (pasif; renk cevaptan sonra)
 *  f colloc          eşdizimi tamamla (fiil seç)           (pasif)
 *  b photo_say       fotoğraf → artikeliyle söyle/yaz      (aktif; yalnızca isim + fotoğraf sorgusu)
 *  c tr_de           Türkçe → Almanca söyle/yaz            (aktif)
 *  d gap             boşluk doldur (forms)                 (aktif)
 *  h sep_perfekt     ayrılabilir fiil / Perfekt (forms)    (aktif; yalnızca fiil)
 *  g own_sentence    kelimeyle kendi cümleni kur           (aktif; değerlendirme kural → yoksa öğrenci, ceza yok)
 *
 * Kurallar:
 *  - Aktif soru yalnızca tanıtılmış karta sorulur (pasif yolda en az bir doğru ya da senaryoda görülmüş; PM-049 kabul).
 *  - `card: false` (işlev kelimesi, PM-047 §2) ve `tier: passive` (yalnızca tanıma) kartlar aktif soruya girmez;
 *    `card: false` hiç ayrı kart olarak sorulmaz.
 *  - Aynı karta art arda aynı tür sorulmaz (`LearnerItem.lastQ` ve tur içi).
 *  - Tur 8–12 soru: önce vadesi gelenler, sonra yeni kartlar (tekrar yükü artınca yeni sayısı düşer).
 *  - Yanlışta kart turun sonunda başka örnek cümle (ve başka fotoğraf) ile yeniden gelir.
 */
import type { Lexeme } from "@dw/shared";
import type { LearnerItem } from "@dw/shared";
import { isDue } from "./srs.ts";

export type QType = "listen_meaning" | "article" | "colloc" | "photo_say" | "tr_de" | "gap" | "sep_perfekt" | "own_sentence";
export const PASSIVE_Q: QType[] = ["listen_meaning", "article", "colloc"];
export const ACTIVE_Q: QType[] = ["tr_de", "photo_say", "gap", "sep_perfekt", "own_sentence"];
export const pathOf = (t: QType): "passive" | "active" => (PASSIVE_Q.includes(t) ? "passive" : "active");

export interface GardenQ {
  lexId: string;
  type: QType;
  /** yeni kart: soru öncesi tanıtım (fotoğraf, kelime, ses, anlam) */
  intro?: boolean;
  /** örnek cümle sırası (yanlışta bir sonraki örnek) */
  ex: number;
  /** turda kaçıncı deneme (yanlıştan sonra 1) */
  retry?: number;
}

export const isNoun = (l: Lexeme) => l.pos === "noun" && !!l.art;
/** PM-047 §2: işlev kelimeleri ayrı kart olarak sorulmaz; ifadelerin içinde öğretilir. `card: false` içerikte işaretlenene
 *  kadar sözcük türünden de anlaşılır (tanımlık, zamir, bağlaç, edat, ilgeç, sayı — sayılar R0'da öğretilir). */
const FUNCTION_POS = new Set(["det", "pron", "conj", "prep", "particle", "num"]);
export const isCard = (l: Lexeme) => l.card !== false && !FUNCTION_POS.has(l.pos);
const verbForms = (l: Lexeme) => l.forms.filter(() => l.pos === "verb");
const otherForms = (l: Lexeme) => l.forms.filter(() => l.pos !== "verb");

/** Bu karta bu yolda sorulabilecek türler (içeriğin taşıdığı veriye göre) */
export function availableTypes(l: Lexeme, path: "passive" | "active"): QType[] {
  if (path === "passive") {
    const t: QType[] = ["listen_meaning"];
    if (isNoun(l)) t.push("article");
    if (l.collocations.some((c) => c.de.split(/\s+/).length >= 2)) t.push("colloc");
    return t;
  }
  if (!isCard(l) || l.tier === "passive") return [];
  const t: QType[] = ["tr_de"];
  if (isNoun(l) && l.img) t.push("photo_say");
  if (otherForms(l).length) t.push("gap");
  if (verbForms(l).length) t.push("sep_perfekt");
  t.push("own_sentence");
  return t;
}

/** Aynı tür art arda gelmez; kalanlar arasında sırayla (rng ile karıştırılabilir) */
export function pickType(l: Lexeme, path: "passive" | "active", last: string | undefined, rng: () => number = Math.random): QType | null {
  const all = availableTypes(l, path);
  if (!all.length) return null;
  const pool = all.length > 1 ? all.filter((t) => t !== last) : all;
  return pool[Math.floor(rng() * pool.length) % pool.length]!;
}

/** Kart tanıtılmış mı (aktif soru için ön koşul) */
export const introduced = (it: LearnerItem | undefined) => !!it && (it.passive.ok > 0 || it.active.ok > 0 || (it.passive.n > 0 && it.active.n > 0));

export interface RoundOpts { max?: number; min?: number; newMax?: number; rng?: () => number; now?: Date }

/**
 * Bir tur kurar. `items`: öğrenci modeli (yalnızca lexeme türü kullanılır). `pool`: yeni kart adayları sırasıyla
 * (ör. K1 sırası; senaryoda görülmüş ama modelde olmayan kartlar başta).
 */
export function buildRound(lex: Map<string, Lexeme>, items: Map<string, LearnerItem>, pool: string[], o: RoundOpts = {}): GardenQ[] {
  const max = o.max ?? 12, min = o.min ?? 8, rng = o.rng ?? Math.random, now = o.now ?? new Date();
  const out: GardenQ[] = [];
  const used = new Set<string>();
  // 1) vadesi gelenler: önce aktif (üretim), sonra pasif; en eski vade önce
  const due: { id: string; path: "passive" | "active"; at: number }[] = [];
  for (const it of items.values()) {
    if (it.kind !== "lexeme" || !lex.has(it.itemId)) continue;
    const l = lex.get(it.itemId)!;
    if (!isCard(l)) continue;
    if (introduced(it) && availableTypes(l, "active").length && isDue(it, "active", now)) due.push({ id: it.itemId, path: "active", at: Date.parse(it.active.fsrs!.due) });
    else if (isDue(it, "passive", now)) due.push({ id: it.itemId, path: "passive", at: Date.parse(it.passive.fsrs!.due) });
  }
  due.sort((a, b) => (a.path === b.path ? a.at - b.at : a.path === "active" ? -1 : 1));
  for (const d of due) {
    if (out.length >= max) break;
    const t = pickType(lex.get(d.id)!, d.path, items.get(d.id)?.lastQ, rng);
    if (!t) continue;
    out.push({ lexId: d.id, type: t, ex: 0 }); used.add(d.id);
  }
  // 2) yeni kartlar: tanıtım + pasif soru; tekrar yükü arttıkça yeni sayısı düşer
  const room = Math.max(0, max - out.length);
  // vadesi gelen az ise tur yeni kartlarla en az `min`e tamamlanır (tek başına yeni kart turu 10); tekrar yükü yüksekse en çok 2 yeni
  const newMax = out.length >= min ? Math.min(2, room) : Math.min(o.newMax ?? 10, room);
  let added = 0;
  for (const id of pool) {
    if (added >= newMax) break;
    if (used.has(id) || items.has(id)) continue;
    const l = lex.get(id);
    if (!l || !isCard(l)) continue;
    out.push({ lexId: id, type: "listen_meaning", intro: true, ex: 0 }); used.add(id); added++;
  }
  return out;
}

/** Yanlış cevap: kart turun sonuna, başka örnek cümleyle ve (aynı yolda) başka türle geri gelir — bir kez */
export function requeue(round: GardenQ[], q: GardenQ, l: Lexeme, rng: () => number = Math.random): GardenQ[] {
  if (q.retry) return round;
  const t = pickType(l, pathOf(q.type), q.type, rng) || q.type;
  const ex = l.examples.length > 1 ? (q.ex + 1) % l.examples.length : q.ex;
  return [...round, { lexId: q.lexId, type: t, ex, retry: 1 }];
}

/** Anlam seçenekleri: doğru + aynı türden 3 çeldirici (yakın sıklıkta) */
export function meaningOptions(l: Lexeme, all: Lexeme[], rng: () => number = Math.random): { opts: string[]; ans: number } {
  const same = all.filter((x) => x.id !== l.id && x.pos === l.pos && x.tr !== l.tr && isCard(x));
  const near = same.sort((a, b) => Math.abs((a.freqRank ?? 9e9) - (l.freqRank ?? 9e9)) - Math.abs((b.freqRank ?? 9e9) - (l.freqRank ?? 9e9))).slice(0, 12);
  const pick: string[] = [];
  while (pick.length < 3 && near.length) { const i = Math.floor(rng() * near.length) % near.length; const x = near.splice(i, 1)[0]!; if (!pick.includes(x.tr)) pick.push(x.tr); }
  const opts = [...pick];
  const ans = Math.floor(rng() * (opts.length + 1)) % (opts.length + 1);
  opts.splice(ans, 0, l.tr);
  return { opts, ans };
}

/** Eşdizim sorusu: "einen Termin ___" → doğru son kelime + diğer eşdizimlerin son kelimeleri */
export function collocQuestion(l: Lexeme, all: Lexeme[], rng: () => number = Math.random): { stem: string; tr: string; opts: string[]; ans: number } | null {
  const c = l.collocations.find((x) => x.de.split(/\s+/).length >= 2);
  if (!c) return null;
  const w = c.de.trim().split(/\s+/);
  const last = w.pop()!;
  const others = new Set<string>();
  for (const x of all) for (const k of x.collocations) { const lw = k.de.trim().split(/\s+/).pop()!; if (lw !== last && /^[a-zäöüß]/.test(lw) === /^[a-zäöüß]/.test(last)) others.add(lw); if (others.size > 40) break; }
  const pool = [...others];
  const opts: string[] = [];
  while (opts.length < 2 && pool.length) opts.push(pool.splice(Math.floor(rng() * pool.length) % pool.length, 1)[0]!);
  const ans = Math.floor(rng() * (opts.length + 1)) % (opts.length + 1);
  opts.splice(ans, 0, last);
  return { stem: w.join(" ") + " ___", tr: c.tr, opts, ans };
}

/** Üretim sorusunun kabul edilen cevapları */
export function accepted(l: Lexeme, t: QType, formIdx = 0): string[] {
  const withArt = isNoun(l) ? `${l.art} ${l.de}` : l.de;
  switch (t) {
    case "photo_say": return [withArt];
    case "tr_de": return isNoun(l) ? [withArt, l.de] : [l.de];
    case "gap": case "sep_perfekt": {
      const f = (t === "gap" ? otherForms(l) : verbForms(l))[formIdx % Math.max(1, l.forms.length)];
      if (!f) return [l.de];
      const a = f.answer.trim();
      return [a, a.replace(/\s*…\s*/g, " ").replace(/\s+/g, " ")];
    }
    default: return [l.de];
  }
}
export function formFor(l: Lexeme, t: QType, i = 0) { const list = t === "gap" ? otherForms(l) : verbForms(l); return list.length ? list[i % list.length] : undefined; }

/** (g) kendi cümlesi: kelime (ya da çekimi) cümlede mi ve en az 3 kelime mi — değerlendirme yapay zekâsız; geçerse öğrenci onaylar */
export function ownSentenceCheck(l: Lexeme, answer: string): "ok" | "missing" | "short" {
  const w = answer.toLowerCase().replace(/[.,!?;:]/g, " ").split(/\s+/).filter(Boolean);
  if (w.length < 3) return "short";
  const stem = l.de.toLowerCase().split(/[\s,]+/)[0]!.replace(/(en|n|e)$/, "");
  const forms = [l.de.toLowerCase(), l.pl?.toLowerCase(), l.verb?.praesens3?.toLowerCase(), l.verb?.perfekt?.toLowerCase().split(/\s+/).pop()].filter(Boolean) as string[];
  const hit = w.some((x) => forms.includes(x) || (stem.length >= 3 && x.startsWith(stem)));
  return hit ? "ok" : "missing";
}
