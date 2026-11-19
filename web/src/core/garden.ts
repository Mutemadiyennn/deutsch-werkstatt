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
import { kartMi, type Lexeme } from "@dw/shared";
import type { LearnerItem, PersonalWord } from "@dw/shared";
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
/** yalnızca çoğul isim (die Daten, die Eltern): artikel sorusu "die"yi cinsiyet gibi öğretmesin (inceleme #59 P2-4) */
const PLURALIA = new Set(["Eltern", "Großeltern", "Leute", "Geschwister", "Ferien", "Kosten", "Daten", "Personalien", "Masern", "Pommes", "Spaghetti", "Möbel"]);
export const pluralOnly = (l: Lexeme) => isNoun(l) && PLURALIA.has(l.de);
const tokens = (s: string) => s.trim().replace(/[.,!?;:„“"»«()]/g, " ").split(/\s+/).filter(Boolean);
/** Eşdizim sorusuna uygun eşdizim: en az 2 kelime ve gövdesi kartın diğer eşdizimlerinde tekrar etmiyor (tek doğru cevap) */
export function collocOf(l: Lexeme): { de: string; tr: string; stem: string; last: string } | null {
  // yer tutuculu eşdizim ("Ich mag …") soru olamaz: doğru şık "…" olurdu (inceleme #59 2. tur Y-1)
  const all = l.collocations.filter((c) => !/…|\.\.\./.test(c.de)).map((c) => { const w = tokens(c.de); return { de: c.de, tr: c.tr, last: w[w.length - 1] ?? "", stem: w.slice(0, -1).join(" ") }; }).filter((c) => c.stem && c.last);
  return all.find((c) => all.filter((x) => x.stem.toLowerCase() === c.stem.toLowerCase()).length === 1) ?? null;
}
/** PM-047 §2: işlev kelimeleri kart değildir (ortak kural `kartMi`, içerik derlemesi de kullanır) */
export const isCard = (l: Lexeme) => kartMi(l);
const verbForms = (l: Lexeme) => l.forms.filter(() => l.pos === "verb");
const otherForms = (l: Lexeme) => l.forms.filter(() => l.pos !== "verb");

/** Bu karta bu yolda sorulabilecek türler (içeriğin taşıdığı veriye göre) */
export function availableTypes(l: Lexeme, path: "passive" | "active"): QType[] {
  if (path === "passive") {
    const t: QType[] = ["listen_meaning"];
    // `tier: passive` yalnızca tanıma: dinle → anlamını seç (a); artikel ve eşdizim üretime yakın (inceleme #55 2. tur kabulü)
    if (l.tier === "passive") return t;
    if (isNoun(l) && !pluralOnly(l)) t.push("article");
    if (collocOf(l)) t.push("colloc");
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
export function pickType(l: Lexeme, path: "passive" | "active", last: string | undefined, rng: () => number = Math.random, exclude: QType[] = []): QType | null {
  const all0 = availableTypes(l, path);
  const all = all0.filter((t) => !exclude.includes(t)).length ? all0.filter((t) => !exclude.includes(t)) : all0;
  if (!all.length) return null;
  const pool = all.length > 1 ? all.filter((t) => t !== last) : all;
  return pool[Math.floor(rng() * pool.length) % pool.length]!;
}

/** Kart tanıtılmış mı (aktif soru için ön koşul) */
export const introduced = (it: LearnerItem | undefined) => !!it && (it.passive.ok > 0 || it.active.ok > 0 || (it.passive.n > 0 && it.active.n > 0));

export interface RoundOpts {
  max?: number; min?: number; newMax?: number; rng?: () => number; now?: Date;
  /** öncelikli yeni kartlar ("Duyduğum kelime", "Nasıl derim?"; LS-7.5): tekrar yükü ne olursa olsun en çok 2'si bu turda */
  priority?: string[];
  /** bugün için kalan yeni kart hakkı (LS-7.4: ~25 pasif, ~12 aktif) */
  newLeft?: number; activeLeft?: number;
  /**
   * M1 günü (Seans 1): yeni kartlara ayrılan yer — tekrar yükü ne olursa olsun turda en az bu kadar yeni kart
   * (havuzda varsa) gelir; günün kartları vadesi gelen tekrarların arkasında kalmaz (inceleme #66 P1-3)
   */
  yeniAyir?: number;
}

/** Tanıtılmış ama henüz üretim (aktif) yolu açılmamış kart: aktif soruya geçmeye hazır (inceleme #59 P0-2) */
export const activatable = (it: LearnerItem | undefined, l: Lexeme) => !!it && it.passive.ok > 0 && !it.active.fsrs && availableTypes(l, "active").length > 0;

/** Bugün tanıtılan (pasif) ve üretime açılan (aktif) kart sayısı (LS-7.4 günlük sınır) */
export function startedToday(items: Iterable<LearnerItem>, now = new Date()): { passive: number; active: number } {
  // yerel gün (öğrencinin gece yarısı), UTC değil
  const day = localDay(now);
  const on = (iso?: string) => !!iso && localDay(new Date(iso)) === day;
  let passive = 0, active = 0;
  for (const it of items) { if (on(it.firstAt?.passive)) passive++; if (on(it.firstAt?.active)) active++; }
  return { passive, active };
}
const localDay = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
export const DAILY_NEW = 25, DAILY_ACTIVE = 12;

/**
 * M1 günü yeni kart hakkı (inceleme #66): günün kartları takvim sınırına takılmaz; kişisel kelimeler (duyduğum, nasıl derim)
 * yalnızca takvim hakkı kalmışsa ve günün kartlarının yerini almadan gelir (en çok 2).
 */
export function m1Hak(takvim: number, kalan: number, kisisel: number): { newLeft: number; kisiselIzin: boolean } {
  const izin = takvim > 0 && kisisel > 0;
  return { newLeft: kalan + (izin ? Math.min(2, takvim, kisisel) : 0), kisiselIzin: izin };
}

/**
 * Bir tur kurar. `items`: öğrenci modeli (yalnızca lexeme türü kullanılır). `pool`: yeni kart adayları sırasıyla.
 * Sıra: vadesi gelen aktif → üretime açılan (tanıtılmış) kartlar → vadesi gelen pasif → öncelikli yeni (duyduğum) → yeni.
 */
export function buildRound(lex: Map<string, Lexeme>, items: Map<string, LearnerItem>, pool: string[], o: RoundOpts = {}): GardenQ[] {
  const max = o.max ?? 12, min = o.min ?? 8, rng = o.rng ?? Math.random, now = o.now ?? new Date();
  const newLeft = Math.max(0, o.newLeft ?? DAILY_NEW), activeLeft = Math.max(0, o.activeLeft ?? DAILY_ACTIVE);
  const prio = (o.priority ?? []).filter((id) => !items.has(id) && lex.has(id) && isCard(lex.get(id)!)).slice(0, Math.min(2, newLeft));
  const ayir = Math.max(0, Math.min(o.yeniAyir ?? 0, newLeft - prio.length));
  const cap = max - prio.length - ayir;
  const out: GardenQ[] = [];
  const used = new Set<string>();
  const add = (id: string, path: "passive" | "active") => {
    if (out.length >= cap || used.has(id)) return;
    // ilk üretim sorusu "kendi cümlen" olmaz: önce kelimeyi söyletir (inceleme #59 2. tur)
    const first = path === "active" && !items.get(id)?.active.fsrs;
    const t = pickType(lex.get(id)!, path, items.get(id)?.lastQ, rng, first ? ["own_sentence"] : []);
    if (t) { out.push({ lexId: id, type: t, ex: 0 }); used.add(id); }
  };
  const dueA: { id: string; at: number }[] = [], dueP: { id: string; at: number }[] = [], ready: { id: string; at: number }[] = [];
  for (const it of items.values()) {
    if (it.kind !== "lexeme" || !lex.has(it.itemId)) continue;
    const l = lex.get(it.itemId)!;
    if (!isCard(l)) continue;
    if (introduced(it) && availableTypes(l, "active").length && isDue(it, "active", now)) dueA.push({ id: it.itemId, at: Date.parse(it.active.fsrs!.due) });
    else if (activatable(it, l)) ready.push({ id: it.itemId, at: Date.parse(it.passive.last || it.passive.fsrs?.due || "0") });
    else if (isDue(it, "passive", now)) dueP.push({ id: it.itemId, at: Date.parse(it.passive.fsrs!.due) });
  }
  // 1) vadesi gelen üretim, 2) tanıtılmış kartların ilk üretim sorusu (günlük ve tur sınırıyla), 3) vadesi gelen tanıma
  for (const d of dueA.sort((a, b) => a.at - b.at)) add(d.id, "active");
  for (const d of ready.sort((a, b) => a.at - b.at).slice(0, Math.min(4, activeLeft))) add(d.id, "active");
  for (const d of dueP.sort((a, b) => a.at - b.at)) add(d.id, "passive");
  // 4) yeni kartlar: tanıtım + pasif soru; tekrar yükü arttıkça yeni sayısı düşer; öncelikliler her zaman (ayrılmış yer)
  for (const id of prio) { out.push({ lexId: id, type: "listen_meaning", intro: true, ex: 0 }); used.add(id); }
  const room = Math.max(0, max - out.length);
  const left = newLeft - prio.length;
  // vadesi gelen az ise tur yeni kartlarla en az `min`e tamamlanır (tek başına yeni kart turu 10); tekrar yükü yüksekse en çok 2 yeni
  const newMax = Math.max(0, Math.min(left, ayir ? Math.min(Math.max(ayir, o.newMax ?? 10), room) : out.length >= min ? Math.min(2, room) : Math.min(o.newMax ?? 10, room)));
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

/**
 * Kişisel banka (#58 A3, LS-7.5): "Duyduğum kelime" ve "Nasıl derim?" ile eklenen kelimeler sözlükte bir karta karşılık
 * geliyorsa öncelikli yeni kart olur (`RoundOpts.priority`; tekrar yükü yüksek olsa da turda yer ayrılır).
 * Eşleşme: önce büyük/küçük harf dahil birebir (essen ≠ Essen), yoksa tek adaylıysa harf duyarsız; artikel (der/die/das,
 * ein/eine/einen…) atılır; çoğul biçim (Termine) de eşleşir. Karşılığı olmayan kelime kişisel listede kalır.
 */
export function personalMatch(personal: { de: string }[], all: Lexeme[]): string[] {
  const ART = /^(der|die|das|ein|eine|einen|einem|einer)\s+/i;
  const cards = all.filter((l) => isCard(l) && l.tier !== "passive");
  const find = (k: string, exact: boolean, by: (l: Lexeme) => string | undefined) =>
    cards.filter((l) => { const f = by(l); return !!f && (exact ? f === k : f.toLowerCase() === k.toLowerCase()); });
  const mine: string[] = [];
  for (const w of personal) {
    const raw = w.de.trim().replace(/[.!?]+$/, "");
    const art = ART.exec(raw)?.[1]?.toLowerCase();
    const k = raw.replace(ART, "").trim();
    // sıra: tekil birebir → tekil harf duyarsız (tek aday) → çoğul birebir; artikel verilmişse uyan aday seçilir ("die Daten" ≠ das Datum)
    let hit: Lexeme | undefined;
    const sing = (l: Lexeme) => l.de, plur = (l: Lexeme) => (l.pl && l.pl !== "-" ? l.pl : undefined);
    for (const [exact, by] of [[true, sing], [false, sing], [true, plur]] as const) {
      const c = find(k, exact, by);
      // belirli artikel: tekilde kartın artikeli, çoğulda "die"
      const fit = art && ["der", "die", "das"].includes(art) ? c.filter((l) => (by === plur ? art === "die" : !l.art || l.art === art)) : c;
      const pick = fit.length ? fit : c;
      if (pick.length === 1 || (exact && pick.length)) { hit = pick[0]; break; }
    }
    if (hit && !mine.includes(hit.id)) mine.push(hit.id);
  }
  return mine;
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

/** Eşdizim sorusu: "einen Termin ___" → doğru son kelime + 2 çeldirici. Çeldirici, gövdeyle birlikte herhangi bir kartta
 *  geçerli bir eşdizim oluşturuyorsa kullanılmaz ("Zeit ___": verbringen de doğru); noktalama atılır (inceleme #59 P1-5). */
export function collocQuestion(l: Lexeme, all: Lexeme[], rng: () => number = Math.random): { stem: string; tr: string; opts: string[]; ans: number } | null {
  const c = collocOf(l);
  if (!c) return null;
  const key = (s: string) => tokens(s).join(" ").toLowerCase();
  const valid = new Set<string>();
  for (const x of all) for (const k of x.collocations) valid.add(key(k.de));
  const lower = /^[a-zäöüß]/.test(c.last);
  const others = new Set<string>();
  for (const x of all) for (const k of x.collocations) {
    const lw = tokens(k.de).pop();
    if (!lw || lw.toLowerCase() === c.last.toLowerCase() || /^[a-zäöüß]/.test(lw) !== lower || lw.length < 3) continue;
    if (valid.has(key(`${c.stem} ${lw}`))) continue;
    others.add(lw);
    if (others.size > 60) break;
  }
  const pool = [...others];
  const opts: string[] = [];
  while (opts.length < 2 && pool.length) opts.push(pool.splice(Math.floor(rng() * pool.length) % pool.length, 1)[0]!);
  if (opts.length < 2) return null;
  const ans = Math.floor(rng() * (opts.length + 1)) % (opts.length + 1);
  opts.splice(ans, 0, c.last);
  return { stem: c.stem + " ___", tr: c.tr, opts, ans };
}

/** Üretim sorusunun kabul edilen cevapları */
export function accepted(l: Lexeme, t: QType, formIdx = 0): string[] {
  const withArt = isNoun(l) ? `${l.art} ${l.de}` : l.de;
  switch (t) {
    case "photo_say": return [withArt];
    // çok biçimli başlık ("anderer, andere, anderes"): her biçim tek başına doğru (inceleme #59 2. tur Y-2)
    case "tr_de": {
      // "weh (tun)": parantezli kısım isteğe bağlı → "weh" ve "weh tun"
      const heads = l.de.split(/\s*,\s*/).flatMap((h) => /\(.+\)/.test(h) ? [h.replace(/\s*\(.*?\)\s*/g, " ").trim(), h.replace(/[()]/g, "").trim()] : [h]).filter(Boolean);
      return isNoun(l) ? [withArt, l.de] : heads.length > 1 || heads[0] !== l.de ? [...new Set([...heads, l.de])] : [l.de];
    }
    case "gap": case "sep_perfekt": {
      const f = (t === "gap" ? otherForms(l) : verbForms(l))[formIdx % Math.max(1, l.forms.length)];
      if (!f) return [l.de];
      const a = f.answer.trim();
      // boşluğa gelen kelime(ler) ya da bütün cümle (inceleme #59 P1-2): "sage … ab" → "Ich sage den Termin ab."
      const parts = a.split(/\s*…\s*/);
      let k = 0;
      const full = f.de.replace(/___/g, () => parts[k++] ?? "").replace(/\s+/g, " ").trim();
      return [a, a.replace(/\s*…\s*/g, " ").replace(/\s+/g, " "), ...(k === parts.length ? [full] : [])];
    }
    default: return [l.de];
  }
}
export function formFor(l: Lexeme, t: QType, i = 0) { const list = t === "gap" ? otherForms(l) : verbForms(l); return list.length ? list[i % list.length] : undefined; }

/** Ayrılabilir fiil önekleri (absagen → sage … ab) */
const SEP = ["ab", "an", "auf", "aus", "bei", "ein", "fest", "fort", "her", "hin", "los", "mit", "nach", "vor", "weg", "zu", "zurück", "zusammen"];
/**
 * (g) kendi cümlesi: en az 3 kelime ve kelime (ya da çekimi) cümlede mi. Değerlendirme yapay zekâsız ve CEZASIZ:
 * "missing" yalnızca öğrenciye ipucudur; karar öğrencinindir (inceleme #59 P1-1). Çekim: gövde (sag-, ruf-), Präsens 3
 * (nimmt → nimm-), Perfekt ortacı, çoğul; ayrılabilir fiilde gövde + önek ayrı kelimeler olabilir.
 */
export function ownSentenceCheck(l: Lexeme, answer: string): "ok" | "missing" | "short" {
  const w = tokens(answer.toLowerCase());
  if (w.length < 3) return "short";
  const lemma = l.de.toLowerCase().split(/[\s,]+/)[0]!;
  const prefix = l.pos === "verb" ? SEP.filter((p) => lemma.startsWith(p) && lemma.length > p.length + 3).sort((a, b) => b.length - a.length)[0] : undefined;
  const base = prefix ? lemma.slice(prefix.length) : lemma;
  const stemOf = (x: string) => x.replace(/(en|n|e|t|st)$/, "");
  const stems = [stemOf(base), l.verb?.praesens3 ? stemOf(l.verb.praesens3.toLowerCase().split(/\s+/)[0]!) : ""].filter((x) => x.length >= 3);
  const forms = [lemma, l.pl?.toLowerCase(), l.verb?.praesens3?.toLowerCase().split(/\s+/)[0], l.verb?.perfekt?.toLowerCase().split(/\s+/).pop()].filter(Boolean) as string[];
  const hasStem = w.some((x) => forms.includes(x) || stems.some((st) => x.startsWith(st) || x.startsWith("ge" + st) || (!!prefix && (x.startsWith(prefix + st) || x.startsWith(prefix + "ge" + st)))));
  if (!hasStem) return "missing";
  // ayrılabilir fiil çekimli kullanılmışsa önek de cümlede olmalı (sage … ab); mastar/ortaç biçiminde önek bitişik
  if (prefix && !w.some((x) => x.startsWith(prefix)) && !w.includes(prefix)) return "missing";
  return "ok";
}

/**
 * Aynı Türkçe karşılığı taşıyan başka kart (sprechen/reden, Arbeit/Job): öğrenci onu söylediyse ceza yok, aranan kelime
 * istenir. Aynı sözcük türü şartı; parantezli açıklama anlamın parçası sayılır (inceleme #59 3. tur).
 */
export function synonymHit(l: Lexeme, answer: string, all: Lexeme[]): Lexeme | null {
  // parantezli açıklama anlamın parçasıdır: "tutmak (süre)" ≠ "tutmak (fiyat)"
  const keys = (tr: string) => new Set(tr.toLowerCase().split(/[,;/](?![^(]*\))|\bya da\b/).map((x) => x.replace(/\s+/g, " ").trim()).filter((x) => x.length > 1));
  const mine = keys(l.tr);
  const a = answer.trim().toLowerCase().replace(/[.!?]+$/, "").replace(/^(der|die|das)\s+/, "");
  for (const x of all) {
    if (x.id === l.id || !isCard(x) || x.pos !== l.pos) continue;
    if (![...keys(x.tr)].some((k) => mine.has(k))) continue;
    if (x.de.toLowerCase().split(/\s*,\s*/).includes(a)) return x;
  }
  return null;
}
