// M1 İlk Hafta günlük içerik denetimi (content/v2/m1/gun-NN.json).
// Çalıştırma:  cd /home/claude/wt-m1 && npx tsx /home/claude/cm/m1audit.ts
// Çıktı: docs/v2/reviews/m1-denetim.txt  (çıkış kodu: ihlal varsa 1)
//
// Her gün için:
//  1. BİÇİM    üst alanlar, plan (curriculum/m1.json) uyumu, kimlikler, karakter ve mekânlar, bilinmeyen alan adları
//  2. KART     plan kartları korunmuş, 15–25 kart, sözlükte var, başka günle çakışmıyor, eklenen kart videoda ya da seste geçiyor
//  3. KISIM    video (süre), 2 ses, `bolumler` (PM-053), 6 görsel, prova grafiği, okuma/yazma (PM-054.5)
//  4. ŞEMA     `cevapla` ve `eylem` için `Drill`, `ana_fikir` ve `ayrinti` için senaryo dinleme sorusu şeması
//  5. OD-9     bütün `*_tr` alanları ve Türkçe `tr`/seçenekler `textIssues`; okur dersleri (terim, kalın yazım)
//  6. OD-0     üretim cevabının ilk biçimi yalnızca öğretilmiş kelimelerden; dikte merdiveninde kart örneği de yetmez
//              (kelime ders ya da kartın kendisinden, eşdiziminden gelmeli); metnin tamamı yazdırılmaz
//  7. KABUL    en az 3 cevap, judge() her cevabı kabul eder; gün, ay, olumsuzluk değişince cevap reddedilir;
//              provada bir seçeneğin cevabı başka seçeneğe gitmez
//  8. DİNLEME  metin başına bilinmeyen kelime ≤ %10; `kanit` satırlarında bilinmeyen kelime yok
//  9. TEST     7. gün `hafta_sonu_testi`: 10–12 Drill, dinleme + kurma + konuşma karışık, hepsi öğretilmiş öğelerden
//
// Kelime katmanları (en güçlüden): öğe (teach.de) · parça (exp.parcalar) · tablo · kart (de) · eşdizim · örnek · önceki-gün.
// Görev tanımına göre kartın eşdizimi ve örnekleri öğretilmiş sayılır; yalnızca örnekten gelen üretim kelimeleri ayrıca listelenir.
// Önceki günün içeriğinde yalnızca duyulan kelime anlamada bilinir sayılır, üretimde sayılmaz.
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { Drill, Scenario, Speed } from "/home/claude/wt-m1/packages/shared/src/content.ts";
import { textIssues } from "/home/claude/wt-m1/packages/shared/src/explain.ts";
import { judge, norm, numWord } from "/home/claude/wt-m1/web/src/core/grading.ts";
import { expandAccepted } from "/home/claude/wt-m1/web/src/core/persona.ts";

const ROOT = "/home/claude/wt-m1";
const MAIN = "/home/claude/deutsch-werkstatt";
// M1_DIR ve M1_OUT yalnızca denetimin kendi sınaması içindir (bozulmuş kopya üzerinde çalıştırma)
const DIR = process.env.M1_DIR || `${ROOT}/content/v2/m1`;
const OUT = process.env.M1_OUT || `${ROOT}/docs/v2/reviews/m1-denetim.txt`;
const SEVIYE = ["kolay", "orta", "zor", "usta", "gercek"];
const LIMIT = { bolumSn: 120, unknown: 0.05, unknownHedef: 0.05, kartMin: 15, kartMax: 25, sureMin: 45, sureMax: 75, sureFark: 10, dugumMin: 5, dugumMax: 8, secenekMax: 3, ansPay: 0.6 };
const VIDEO_TUR = ["sokak-roportaji", "bir-gunum", "nasil-yapilir", "bunu-nasil-soylersin", "koy-dizisi"];
const SES_TUR = ["anons", "sesli-mesaj", "radyo", "bekleme-anonsu"];
const ANONS_TUR = ["anons", "bekleme-anonsu"];
const YASAK_DE: [RegExp, string][] = [
  [/gr(ü|ue)(ß|ss)\s+gott/i, "Grüß Gott"], [/\bservus\b/i, "Servus"], [/\bgell\b/i, "gell"], [/\bpfiat\b/i, "Pfiat"],
  [/\b[pb]asst\s+scho\b/i, "Passt scho"], [/\bja\s+mei\b/i, "Ja mei"]
];
const OKUR_TERIM = /(^|[^\p{L}])(çoğul|tekil|isim|ismi|fiil|sıfat|hece|vurgu|ek|eki)(ler\p{L}*|in|i)?(?!\p{L})/iu;
const OKUR_KESIN = /her zaman|sonrası hep/i;

const L: string[] = [];
const say = (s = "") => L.push(s);
let viol = 0;
const bad = (s: string) => { viol++; say("  İHLAL  " + s); };
const need = (c: unknown, s: string) => { if (!c) bad(s); return !!c; };
const J = (p: string) => JSON.parse(readFileSync(p, "utf8"));

/* ---------- kelime ---------- */
function toks(s: string): string[] {
  return String(s).replace(/\{[^{}]*\}/g, " ").replace(/\d+/g, (d) => " " + (Number(d) < 100 ? numWord(Number(d)) : d.split("").map((c) => numWord(Number(c))).join(" ")) + " ")
    .toLowerCase().replace(/[’'`´]/g, "").split(/[^a-zäöüß]+/).filter(Boolean);
}
const sentencesDe = (s: string) => String(s).replace(/\bDr\./g, "Dr§").split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
const ONES = ["ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const TENS = ["zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
function numParts(w: string): string[] | null {
  let m = w.match(new RegExp(`^(${ONES.join("|")})und(${TENS.join("|")})$`));
  if (m) return [m[1] === "ein" ? "eins" : m[1]!, "und", m[2]!];
  m = w.match(/^(.+)hundert(.*)$/);
  if (m) { const a = numParts(m[1]!) ?? [m[1]!]; const b = m[2] ? numParts(m[2]) ?? [m[2]] : []; return [...a, "hundert", ...b]; }
  return null;
}
const TIERS = ["öğe", "parça", "tablo", "kart", "eşdizim", "örnek", "önceki-gün"] as const;
type Tier = (typeof TIERS)[number];
const RANK = Object.fromEntries(TIERS.map((t, i) => [t, i])) as Record<Tier, number>;
const known = new Map<string, Tier>();
function learn(words: string[], t: Tier) { for (const w of words) { const k = known.get(w); if (!k || RANK[t] < RANK[k]) known.set(w, t); } }
function tierOf(w: string): Tier | null {
  const k = known.get(w);
  if (k) return k;
  const p = numParts(w);
  if (!p) return null;
  let worst: Tier = "öğe";
  for (const x of p) { const t = tierOf(x); if (!t) return null; if (RANK[t] > RANK[worst]) worst = t; }
  return worst;
}

/* ---------- kaynaklar ---------- */
const plan = J(`${ROOT}/content/v2/curriculum/m1.json`);
const planDay = new Map<number, any>(plan.gunler.map((g: any) => [g.day, g]));
const planCard = new Map<string, number>();
for (const g of plan.gunler) for (const c of g.yeni_kartlar) planCard.set(c, g.day);
const world = J(`${ROOT}/content/v2/world/world.json`);
const CHARS = new Set<string>(world.characters.map((c: any) => c.id));
const PLACES = new Set<string>(world.town.places.map((p: any) => p.id));
const PERSON = new Set<string>(["herr", "frau", "dr"]);
const SURNAMES = new Set<string>();
for (const c of world.characters) {
  const ws = toks(c.name); for (const w of ws) PERSON.add(w);
  SURNAMES.add(ws[ws.length - 1]!);
}
const PLACE_WORDS = new Set<string>(world.town.places.flatMap((p: any) => toks(p.name)));
PLACE_WORDS.add(toks(world.town.name)[0]!);
const lex = new Map<string, any>();
const batchNew = new Set<string>();
for (const root of [ROOT, MAIN]) {
  const d = `${root}/content/v2/registry/lexicon`;
  for (const f of readdirSync(d).filter((x) => /^batch-.*\.json$/.test(x)).sort()) {
    const n = Number(f.match(/\d+/)?.[0]);
    for (const it of J(`${d}/${f}`).items) { lex.set(it.id, it); if (n >= 9 && n <= 13) batchNew.add(it.id); }
  }
}
const k1 = new Map<string, any>(J(`${MAIN}/content/v2/curriculum/k1.json`).cekirdek.map((x: any) => [x.id, x]));
const lessons = new Map<string, any>();
for (const f of readdirSync(`${ROOT}/content/v2/temel`).filter((x) => /^r0-.*\.json$/.test(x))) { const d = J(`${ROOT}/content/v2/temel/${f}`); lessons.set(d.id, d); }

/* ---------- şema yardımcıları ---------- */
const ListenQ = (Scenario.shape.listening as any).removeDefault().element.shape.qs.element;
const ALLOWED: Record<string, string[]> = {
  top: ["schema", "id", "day", "level", "format", "title_tr", "goal_tr", "can_do", "unit", "arm", "place", "characters", "requires", "review", "dersler", "yeni_kartlar", "sahne", "sesler", "gorsel", "prova", "okuma_yazma"],
  video: ["id", "title_tr", "sahneler", "bolumler"],
  sahne: ["id", "speaker", "sahne_tr", "de", "tr"],
  ses: ["id", "tur", "title_tr", "ortam_tr", "speaker", "hizlar", "script", "bolumler", "eylem"],
  satir: ["id", "de", "tr"],
  gorsel: ["id", "de", "dogru_img", "celdirici_img"],
  prova: ["id", "title_tr", "durum_tr", "karsi", "baslangic", "dugumler", "kapanis_tr"],
  dugum: ["id", "de", "tr", "secenekler", "son"],
  secenek: ["de", "tr", "accepted", "sonraki", "uygun", "geri_bildirim_tr"],
  oy: ["tur", "title_tr", "metin_de", "metin_tr", "sorular", "yazma"],
  yazma: ["gorev_tr", "ornek_de", "zorunlu", "accepted_kaliplar", "kontrol_tr"],
  bolum: ["id", "cumleler", "ana_fikir", "ayrinti", "dikte", "golge", "cevapla"],
  listen: ["id", "kind", "q_tr", "opts", "ans", "kanit"],
  cevapla: ["id", "k", "situation_tr", "prompt_de", "accepted", "why_tr"],
  eylem: ["id", "k", "q_tr", "opts", "ans", "why_tr", "kanit"],
  kolay: ["id", "cumle", "seviye", "q_tr", "opts", "ans"],
  orta: ["id", "cumle", "seviye", "de", "accepted"],
  zor: ["id", "cumle", "seviye", "banka", "accepted"],
  usta: ["id", "cumle", "seviye", "accepted"],
  gercek: ["id", "seviye", "gorev_tr", "ornek_de", "zorunlu"]
};
function keys(x: any, kind: string, at: string) {
  if (!x || typeof x !== "object") { bad(`BİÇİM ${at}: nesne değil`); return; }
  for (const k of Object.keys(x)) if (!ALLOWED[kind]!.includes(k)) bad(`BİÇİM ${at}: bilinmeyen alan "${k}"`);
}
const stripQ = ({ kanit: _k, ...r }: any) => r;
const str = (x: unknown) => typeof x === "string" && x.trim().length > 0;

/* ---------- kabul ---------- */
const CLASSES: string[][] = [
  ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
  ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  ["Frühling", "Sommer", "Herbst", "Winter"],
  ["heute", "morgen", "gestern", "übermorgen", "vorgestern"],
  ["Anfang", "Ende"]
];
const wordRe = (w: string) => new RegExp(`(?<![\\p{L}])${w}(?![\\p{L}])`, "iu");
const PERSONAS = [{}, { name: "Deniz", address: "Herr" as const }, { name: "Deniz", address: "Frau" as const }];
function mutations(first: string): string[] {
  const out: string[] = [];
  for (const cl of CLASSES) cl.forEach((w, i) => { if (wordRe(w).test(first)) out.push(first.replace(wordRe(w), cl[(i + 1) % cl.length]!)); });
  if (wordRe("nicht").test(first)) out.push(first.replace(wordRe("nicht"), " ").replace(/\s+([.!?])/g, "$1").replace(/\s+/g, " ").trim());
  else if (/geht[.!]?$/i.test(first.trim())) out.push(first.trim().replace(/[.!]$/, "") + " nicht.");
  return out;
}
const cnt = { kabul: 0, uretim: 0, trAlan: 0 };
function checkAccepted(id: string, list: unknown, mode: "uretim" | "dikte", de?: string): boolean {
  if (!Array.isArray(list) || !list.every(str)) { bad(`KABUL ${id}: accepted dizi değil`); return false; }
  const acc = list as string[];
  if (new Set(acc).size !== acc.length) bad(`KABUL ${id}: yinelenen cevap`);
  for (const p of PERSONAS) {
    const ex = expandAccepted(acc, p);
    for (const a of ex) { cnt.kabul++; if (!norm(a)) bad(`KABUL ${id}: boş cevap`); else if (!judge(ex, [a]).ok) bad(`KABUL ${id}: "${a}" kendini kabul etmiyor`); }
  }
  const ex = expandAccepted(acc, { address: "Herr" });
  if (mode === "uretim") {
    const n = new Set(ex.map((a) => norm(a))).size;
    if (n < 3) bad(`KABUL ${id}: ${n} farklı cevap (en az 3)`);
  } else {
    if (acc.length < 3) bad(`KABUL ${id}: ${acc.length} yazım (en az 3)`);
    for (const a of ex) if (norm(a) !== norm(de!)) bad(`KABUL ${id}: dikte cevabı metinden farklı: "${a}"`);
  }
  const first = ex[0]!;
  for (const m of mutations(first)) if (judge(ex, [m]).ok) bad(`KABUL ${id}: anlamı değişen "${m}" kabul ediliyor`);
  for (const cl of CLASSES.slice(0, 3)) {
    const inFirst = cl.filter((w) => wordRe(w).test(first));
    for (const a of ex) for (const w of cl) if (wordRe(w).test(a) && !inFirst.includes(w)) bad(`KABUL ${id}: "${a}" ilk cevapta olmayan ${w} içeriyor`);
  }
  return true;
}

/* ---------- OD-0 ---------- */
const ornekList: string[] = [];
function production(id: string, text: string, allowPerson: boolean, strict = false) {
  cnt.uretim++;
  const miss: string[] = [], orn: string[] = [];
  for (const w of toks(text)) {
    if (allowPerson && PERSON.has(w)) continue;
    const t = tierOf(w);
    if (!t || t === "önceki-gün" || t === "örnek") miss.push(w);
  }
  if (miss.length) bad(`OD-0 ${id}: "${text}" → öğretilmemiş: ${[...new Set(miss)].join(", ")}`);
  if (orn.length) ornekList.push(`${id}: "${text}" → ${[...new Set(orn)].join(", ")}`);
}
const unknownIn = (text: string) => toks(text).filter((w) => { const t = tierOf(w); return (!t || t === "örnek") && !PERSON.has(w) && !PLACE_WORDS.has(w); });
const ratios: string[] = [];
function comprehension(id: string, texts: string[]) {
  const all = texts.flatMap(toks);
  const isKnown = (w: string) => { const t = tierOf(w); return (!!t && t !== "örnek") || PERSON.has(w) || PLACE_WORDS.has(w); };
  const unk = all.filter((w) => !isKnown(w));
  const isName = (w: string) => PERSON.has(w) || PLACE_WORDS.has(w);
  const strictUnk = all.filter((w) => !isKnown(w) || (!isName(w) && tierOf(w) === "örnek"));
  const r = all.length ? unk.length / all.length : 0, rs = all.length ? strictUnk.length / all.length : 0;
  const pct = (x: number) => `%${(x * 100).toFixed(1)}`;
  ratios.push(`${id}: ${all.length} kelime · bilinmeyen ${unk.length} (${pct(r)})${unk.length ? " [" + [...new Set(unk)].join(", ") + "]" : ""} · örnekler sayılmazsa ${strictUnk.length} (${pct(rs)})${strictUnk.length > unk.length ? " [" + [...new Set(strictUnk.filter((w) => !unk.includes(w)))].join(", ") + "]" : ""}`);
  if (r > LIMIT.unknown) bad(`DİNLEME ${id}: bilinmeyen kelime ${pct(r)} (en çok %5): ${[...new Set(unk)].join(", ")}`);
}

/* ---------- Türkçe metin ---------- */
function trCheck(path: string, v: string, nouns: Set<string>, boldRule: boolean) {
  cnt.trAlan++;
  for (const x of textIssues(v)) bad(`OD-9 ${path}: ${x}`);
  const plain = v.replace(/\*\*[^*]+\*\*/g, " ");
  const m = plain.match(OKUR_TERIM);
  if (m) bad(`OKUR ${path}: dilbilgisi terimi "${m[2]}"`);
  if (OKUR_KESIN.test(plain)) bad(`OKUR ${path}: kesin kural kalıbı`);
  if ((v.match(/\*\*/g) || []).length % 2) bad(`OKUR ${path}: kapanmamış kalın işareti`);
  if (boldRule) for (const w of plain.split(/[^\p{L}]+/u)) if (w.length > 2 && nouns.has(w)) bad(`OKUR ${path}: Almanca **${w}** kalın yazılmamış`);
}
function walkTr(x: any, path: string, cb: (p: string, v: string, key: string) => void) {
  if (Array.isArray(x)) x.forEach((v, i) => walkTr(v, `${path}[${v && typeof v === "object" && v.id ? v.id : i}]`, cb));
  else if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) {
    if (k === "review") continue;
    if (typeof v === "string") { if (k.endsWith("_tr") || k === "tr") cb(`${path}.${k}`, v, k); }
    else if (Array.isArray(v) && k.endsWith("_tr")) v.forEach((e, i) => { if (typeof e === "string") cb(`${path}.${k}[${i}]`, e, k); });
    else walkTr(v, `${path}.${k}`, cb);
  }
}
function walkDe(x: any, cb: (p: string, v: string) => void, path = "") {
  if (Array.isArray(x)) x.forEach((v, i) => walkDe(v, cb, `${path}[${i}]`));
  else if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) {
    if (k.endsWith("_tr") || k === "tr" || k === "review" || k.endsWith("_img")) continue;
    if (typeof v === "string") cb(`${path}.${k}`, v); else walkDe(v, cb, `${path}.${k}`);
  }
}

/* ---------- ana döngü ---------- */
const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => /^gun-\d\d\.json$/.test(f)).sort() : [];
say(`M1 günlük içerik denetimi · ${new Date().toISOString().slice(0, 10)} · betik: /home/claude/cm/m1audit.ts`);
say(`Kaynak: ${DIR} · dosya: ${files.length}`);
say("");
const ids = new Set<string>();
const usedCards = new Map<string, number>();
const summary: string[] = [];
let prevVideo = "", prevOY = "";
const uniq = (id: string, at: string) => { if (!str(id)) bad(`BİÇİM ${at}: kimlik yok`); else if (ids.has(id)) bad(`BİÇİM ${id}: kimlik çakışması`); ids.add(id); };

for (const f of files) {
  const d = J(`${DIR}/${f}`);
  if (f === "gun-07.json") d.hafta_sonu_testi = J(`${DIR}/hafta-sonu-testi.json`).maddeler;
  const NN = f.slice(4, 6), day = Number(NN), P = `m1:${NN}:`;
  const before = viol;
  say(`===== ${d.id}  (${f})`);
  const g = planDay.get(day);

  /* 1. BİÇİM */
  // hafta_sonu_testi yalnızca 7. günde bulunur; zorunlu üst alanlardan ayrı denetlenir (3f)
  const { hafta_sonu_testi: hst, ...dTop } = d;
  keys(dTop, "top", f);
  for (const k of ALLOWED.top!) if (d[k] === undefined) bad(`BİÇİM ${f}: "${k}" eksik`);
  need(d.schema === 1 && d.format === "gun" && d.level === "A1", `BİÇİM ${f}: schema, format ya da level yanlış`);
  need(d.day === day && d.id === `m1:gun:${NN}`, `BİÇİM ${f}: gün ya da kimlik dosya adıyla uyuşmuyor`);
  need(d.review?.status === "draft" || (d.review?.status === "reviewed" && d.review?.okur === "passed"), `BİÇİM ${f}: review.status draft ya da okurdan geçmiş reviewed olmalı`);
  need(str(d.arm), `BİÇİM ${f}: arm boş`);
  need(PLACES.has(d.place), `BİÇİM ${f}: mekân yok: ${d.place}`);
  need(str(d.goal_tr), `BİÇİM ${f}: goal_tr boş`);
  for (const c of d.characters || []) need(CHARS.has(c), `BİÇİM ${f}: karakter yok: ${c}`);
  for (const k of ["kelimeler", "kaliplar", "gramer", "tur", "baglayicilar", "akicilik"]) need(Array.isArray(d.requires?.[k]), `BİÇİM ${f}: requires.${k} yok`);
  for (const r of d.requires?.kelimeler || []) need(usedCards.has(r) && usedCards.get(r)! < day, `BİÇİM ${f}: requires kelimesi önceki günlerde yok: ${r}`);
  if (need(g, `BİÇİM ${f}: planda yok`)) {
    need(d.title_tr === g.title_tr, `PLAN ${f}: title_tr plandan farklı`);
    need(d.unit === g.unit, `PLAN ${f}: unit plandan farklı`);
    need(d.can_do?.id === g.can_do.id && d.can_do?.tr === g.can_do.tr, `PLAN ${f}: can_do plandan farklı`);
    need(JSON.stringify(d.dersler) === JSON.stringify(g.dersler), `PLAN ${f}: dersler plandan farklı`);
  }
  const speakers = new Set<string>();

  /* öğretilenler */
  for (const id of d.dersler || []) {
    const l = lessons.get(id);
    if (!need(l, `PLAN ${f}: ders yok: ${id}`)) continue;
    for (const t of l.teach) {
      learn(toks(t.de), "öğe");
      for (const p of t.exp?.parcalar || []) learn(toks(p.de), "parça");
    }
    if (l.table) {
      const trCol = l.table.sutunlar.findIndex((s: string) => /türkçe/i.test(s));
      for (const row of l.table.satirlar) row.forEach((c: unknown, i: number) => { if (i !== trCol) learn(toks(String(c)), "tablo"); });
    }
  }

  /* 2. KART */
  const cards: string[] = d.yeni_kartlar || [];
  need(cards.length >= LIMIT.kartMin && cards.length <= LIMIT.kartMax, `KART ${f}: ${cards.length} kart (${LIMIT.kartMin}–${LIMIT.kartMax})`);
  need(new Set(cards).size === cards.length, `KART ${f}: yinelenen kart`);
  for (const c of g?.yeni_kartlar || []) need(cards.includes(c), `KART ${f}: plan kartı eksik: ${c}`);
  const added = cards.filter((c) => !(g?.yeni_kartlar || []).includes(c));
  for (const c of cards) {
    const it = lex.get(c);
    if (!need(it, `KART ${f}: sözlükte yok: ${c}`)) continue;
    if (usedCards.has(c)) bad(`KART ${f}: ${c} ${usedCards.get(c)}. günde de var`);
    usedCards.set(c, day);
    learn(toks(it.de), "kart");
    for (const x of it.collocations || []) learn(toks(x.de), "eşdizim");
    for (const x of it.forms || []) learn(toks(String(x.answer)), "eşdizim");
    for (const x of it.examples || []) learn(toks(x.de), "örnek");
  }
  for (const c of added) {
    if (planCard.has(c)) bad(`KART ${f}: ${c} planda ${planCard.get(c)}. günün kartı`);
    need(k1.has(c) || batchNew.has(c), `KART ${f}: ${c} kaynak listelerinde yok (k1, parti 009–013)`);
  }

  /* soru denetimi */
  const pickAns: number[] = [];
  const qc = { ana_fikir: 0, ayrinti: 0, dikte: 0, gercek: 0, golge: 0, cevapla: 0, eylem: 0, okuma: 0 } as Record<string, number>;
  const trOpts: any[] = [];
  type Lines = Map<string, string>;
  function kanitCheck(q: any, qid: string, lines: Lines) {
    if (!need(Array.isArray(q.kanit) && q.kanit.length, `DİNLEME ${qid}: kanit yok`)) return;
    for (const k of q.kanit) {
      const t = lines.get(String(k));
      if (!need(t !== undefined, `DİNLEME ${qid}: kanit satırı yok: ${k}`)) continue;
      const u = unknownIn(t!);
      if (u.length) bad(`DİNLEME ${qid}: cevap bilinmeyen kelimeye dayanıyor (${k}): ${u.join(", ")}`);
    }
  }
  function pickCheck(q: any, qid: string) {
    need(q.q_tr && q.opts?.length >= 3 && q.ans < q.opts.length, `ŞEMA ${qid}: en az 3 seçenek ve geçerli ans gerekir`);
    need(new Set(q.opts).size === q.opts?.length, `ŞEMA ${qid}: yinelenen seçenek`);
    pickAns.push(q.ans);
  }
  function listenCheck(q: any, qid: string, kind: string | null, lines: Lines) {
    keys(q, "listen", qid);
    if (kind) need(q?.kind === kind, `ŞEMA ${qid}: kind ${kind} olmalı`);
    const { id: _i, kanit: _k, ...core } = q || {};
    const r = ListenQ.safeParse(core);
    if (!r.success) bad(`ŞEMA ${qid}: ${r.error.issues.map((i: any) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    pickCheck(q || {}, qid); trOpts.push({ id: qid, opts: q?.opts });
    kanitCheck(q || {}, qid, lines);
  }
  function drillId(id: unknown, at: string) { uniq(id as string, at); if (str(id) && !(id as string).startsWith(P)) bad(`BİÇİM ${id}: kimlik ${P} ile başlamalı`); }
  function cevaplaCheck(c: any, at: string) {
    if (!need(c, `BÖLÜM ${at}: cevapla yok`)) return;
    keys(c, "cevapla", at); drillId(c.id, at); qc.cevapla!++;
    const r = Drill.safeParse(c);
    if (!r.success || c.k !== "guided_response") bad(`ŞEMA ${c.id}: guided_response değil`);
    const u = unknownIn(c.prompt_de || "");
    if (u.length) bad(`DİNLEME ${c.id}: soru cümlesinde bilinmeyen: ${u.join(", ")}`);
    if (checkAccepted(c.id, c.accepted, "uretim")) production(c.id, c.accepted[0], false);
  }
  function eylemCheck(e: any, at: string, lines: Lines) {
    if (!need(e, `SES ${at}: eylem yok`)) return;
    keys(e, "eylem", at); drillId(e.id, at); qc.eylem!++;
    const r = Drill.safeParse(stripQ(e));
    if (!r.success || e.k !== "pick") bad(`ŞEMA ${e.id}: pick değil`);
    pickCheck(e, e.id); trOpts.push({ id: e.id, opts: e.opts });
    kanitCheck(e, e.id, lines);
  }
  const hasPhrase = (text: string, w: string) => ` ${norm(text)} `.includes(` ${norm(w)} `);
  /** Yazdırılan cümle: tek cümle, satırın içinde, her kelimesi öğretilmiş */
  function written(id: string, target: string, line: string) {
    need(sentencesDe(target).length === 1, `DİKTE ${id}: tek cümle olmalı: "${target}"`);
    need(hasPhrase(line, target), `DİKTE ${id}: "${target}" seçilen cümlede yok`);
    production(id, target, false, true);
  }
  function bolumCheck(b: any, parent: string, order: [string, string][], minAyrinti: number) {
    const at = `${parent}/${b?.id}`;
    keys(b, "bolum", at);
    need(str(b.id), `BÖLÜM ${at}: kimlik yok`);
    const all = new Map(order), pos = new Map(order.map(([k], i) => [k, i]));
    const cs: string[] = Array.isArray(b.cumleler) ? b.cumleler : [];
    need(cs.length >= 2, `BÖLÜM ${at}: cumleler boş`);
    cs.forEach((c, i) => { need(all.has(c), `BÖLÜM ${at}: cümle yok: ${c}`); if (i) need(pos.get(c)! > pos.get(cs[i - 1]!)!, `BÖLÜM ${at}: cümle sırası bozuk: ${c}`); });
    const sec = new Map(cs.filter((c) => all.has(c)).map((c) => [c, all.get(c)!] as [string, string]));
    const secSn = Math.round([...sec.values()].reduce((n, t) => n + toks(t).length / 2 + 1.5, 0));
    need(secSn <= LIMIT.bolumSn, `BÖLÜM ${at}: tahmini ${secSn} sn (en çok ${LIMIT.bolumSn})`);
    if (need(b.ana_fikir, `BÖLÜM ${at}: ana_fikir yok`)) { qc.ana_fikir!++; listenCheck(b.ana_fikir, `${at}/ana_fikir`, "gist", sec); }
    const ay: any[] = b.ayrinti || [];
    need(ay.length >= minAyrinti, `BÖLÜM ${at}: ${ay.length} ayrıntı sorusu (en az ${minAyrinti})`);
    ay.forEach((q, i) => { qc.ayrinti!++; listenCheck(q, `${at}/ayrinti[${i}]`, "detail", sec); });

    const ds: any[] = b.dikte || [];
    need(JSON.stringify(ds.map((d) => d.seviye)) === JSON.stringify(SEVIYE), `DİKTE ${at}: kademeler ${SEVIYE.join(", ")} sırasıyla olmalı`);
    need(new Set(ds.map((d) => d.id)).size === ds.length && ds.every((d) => str(d.id)), `DİKTE ${at}: kimlikler eksik ya da yinelenen`);
    const fullWritten = new Set<string>(), touched = new Set<string>();
    for (const d of ds) {
      const did = `${at}/${d.id}`;
      if (!ALLOWED[d.seviye]) { bad(`DİKTE ${did}: seviye geçersiz: ${d.seviye}`); continue; }
      keys(d, d.seviye, did); qc.dikte!++;
      if (d.seviye === "gercek") {
        qc.gercek!++;
        need(str(d.gorev_tr) && str(d.ornek_de), `DİKTE ${did}: görev ya da örnek yok`);
        production(did, d.ornek_de || "", false, true);
        const zs: string[] = d.zorunlu || [];
        need(zs.length >= 2, `DİKTE ${did}: en az 2 zorunlu öğe`);
        for (const z of zs) { need(hasPhrase(d.ornek_de || "", z), `DİKTE ${did}: zorunlu öğe örnekte yok: ${z}`); production(did, z, false, true); }
        need(sentencesDe(d.ornek_de || "").length < cs.length, `DİKTE ${did}: örnek metin kadar uzun`);
        need(norm(d.ornek_de || "") !== norm([...sec.values()].join(" ")), `DİKTE ${did}: metnin tamamını istiyor`);
        continue;
      }
      const line = sec.get(d.cumle);
      if (!need(line !== undefined, `DİKTE ${did}: cümle bölümde yok: ${d.cumle}`)) continue;
      touched.add(d.cumle);
      if (d.seviye === "kolay") {
        need(str(d.q_tr), `DİKTE ${did}: q_tr yok`);
        pickCheck(d, did);
        const lt = new Set(toks(line!));
        (d.opts || []).forEach((o: string, i: number) => {
          production(did, o, false, true);
          const inLine = toks(o).every((w) => lt.has(w));
          if (i === d.ans) need(inLine, `DİKTE ${did}: doğru seçenek cümlede yok: ${o}`); else need(!inLine, `DİKTE ${did}: çeldirici cümlede geçiyor: ${o}`);
        });
      } else if (d.seviye === "orta") {
        need((String(d.de).match(/_{3}/g) || []).length === 1, `DİKTE ${did}: tam bir boşluk gerekir`);
        if (checkAccepted(did, d.accepted, "dikte", d.accepted?.[0])) {
          const full = String(d.de).replace("___", d.accepted[0]);
          need(hasPhrase(line!, full), `DİKTE ${did}: doldurulan cümle kayıtta yok: "${full}"`);
          // İstenen yalnızca boşluktaki kelimedir; ekranda duran kelimeler anlama düzeyinde bilinmeli
          production(did, d.accepted[0], false, true);
          const u = unknownIn(full);
          if (u.length) bad(`DİKTE ${did}: gösterilen cümlede bilinmeyen: ${u.join(", ")}`);
        }
      } else if (checkAccepted(did, d.accepted, "dikte", d.accepted?.[0])) {
        const target: string = d.accepted[0];
        written(did, target, line!);
        fullWritten.add(d.cumle);
        if (d.seviye === "zor") {
          const bank: string[] = d.banka || [], want = toks(target), left = bank.flatMap(toks);
          for (const w of want) { const i = left.indexOf(w); if (i < 0) bad(`DİKTE ${did}: bankada yok: ${w}`); else left.splice(i, 1); }
          need(left.length >= 2, `DİKTE ${did}: bankada en az 2 çeldirici gerekir`);
          for (const w of left) production(did, w, false, true);
          need(bank.flatMap(toks).join(" ") !== want.join(" "), `DİKTE ${did}: banka cevap sırasında`);
        }
      }
    }
    const minC = Math.min(3, cs.length - 1);
    need(touched.size >= minC && touched.size <= 6, `DİKTE ${at}: ${touched.size} cümle seçilmiş (${minC}–6)`);
    need(touched.size < cs.length, `DİKTE ${at}: bütün cümleler seçilmiş`);
    need(fullWritten.size < cs.length, `DİKTE ${at}: metnin tamamı yazdırılıyor`);

    const gl: string[] = b.golge || [];
    need(gl.length >= 1, `BÖLÜM ${at}: golge yok`);
    for (const c of gl) { qc.golge!++; if (need(sec.has(c), `BÖLÜM ${at}: golge cümlesi yok: ${c}`)) production(`${at}/golge/${c}`, sec.get(c)!, true); }
    cevaplaCheck(b.cevapla, at);
    return cs;
  }
  function bolumler(list: any[], parent: string, order: [string, string][], minAyrinti: number) {
    need(Array.isArray(list) && list.length >= 1, `BÖLÜM ${parent}: bolumler yok`);
    need(new Set((list || []).map((b) => b.id)).size === (list || []).length, `BÖLÜM ${parent}: yinelenen bölüm`);
    const seen: string[] = [];
    for (const b of list || []) seen.push(...(bolumCheck(b, parent, order, minAyrinti) || []));
    need(JSON.stringify(seen) === JSON.stringify(order.map(([k]) => k)), `BÖLÜM ${parent}: bölümler bütün cümleleri bir kez ve sırayla kapsamalı`);
  }

  /* 3a. VIDEO */
  const v = d.sahne || {};
  keys(v, "video", "sahne");
  uniq(v.id, "video");
  need(v.id === `${P}v1`, `BİÇİM video: kimlik ${P}v1 olmalı`);
  const scenes: any[] = v.sahneler || [];
  const vLines = new Map<string, string>();
  for (const s of scenes) {
    keys(s, "sahne", `video.${s.id}`);
    need(str(s.id) && str(s.de) && str(s.tr) && str(s.sahne_tr), `SAHNE ${s.id}: alan eksik`);
    need(!vLines.has(s.id), `SAHNE ${s.id}: yinelenen sahne`);
    vLines.set(s.id, s.de);
    need(CHARS.has(s.speaker), `SAHNE ${s.id}: konuşmacı yok: ${s.speaker}`);
    speakers.add(s.speaker);
  }
  const est = Math.round(scenes.reduce((n, s) => n + toks(s.de).length / 2 + 1.5, 0));
  need(est >= LIMIT.sureMin && est <= LIMIT.sureMax, `SAHNE: tahmini süre ${est} sn`);
  const vText = scenes.map((s) => s.de).join(" ");
  comprehension(`${v.id} sahne`, scenes.map((s) => s.de));
  bolumler(v.bolumler, v.id, scenes.map((s) => [s.id, s.de] as [string, string]), 2);

  /* 3b. SESLER */
  const sesler: any[] = d.sesler || [];
  need(sesler.length >= 2, "SES: en az 2 ses");
  need(sesler.some((s) => ANONS_TUR.includes(s.tur)), "SES: anons yok");
  need(sesler.some((s) => s.tur === "sesli-mesaj"), "SES: sesli mesaj yok");
  for (const s of sesler) {
    keys(s, "ses", `ses ${s.id}`);
    uniq(s.id, "ses");
    need(SES_TUR.includes(s.tur), `SES ${s.id}: tür geçersiz`);
    need(str(s.title_tr) && str(s.ortam_tr), `SES ${s.id}: başlık ya da ortam yok`);
    need(CHARS.has(s.speaker), `SES ${s.id}: konuşmacı yok: ${s.speaker}`);
    speakers.add(s.speaker);
    need(Array.isArray(s.hizlar) && s.hizlar.length >= 1 && s.hizlar.every((h: string) => Speed.safeParse(h).success), `SES ${s.id}: hizlar geçersiz`);
    const script: any[] = s.script || [];
    for (const l of script) { keys(l, "satir", `${s.id}/${l.id}`); need(str(l.id) && str(l.de) && str(l.tr), `SES ${s.id}: satır eksik`); }
    need(new Set(script.map((l) => l.id)).size === script.length, `SES ${s.id}: yinelenen satır kimliği`);
    const n = script.flatMap((l) => sentencesDe(l.de)).length;
    need(n >= 2 && n <= 5, `SES ${s.id}: ${n} cümle (2–5)`);
    const order = script.map((l) => [l.id, l.de] as [string, string]);
    comprehension(`${s.id} ses`, script.map((l) => l.de));
    need((s.bolumler || []).length === 1, `SES ${s.id}: tek bölüm olmalı`);
    bolumler(s.bolumler, s.id, order, 1);
    eylemCheck(s.eylem, s.id, new Map(order));
  }

  /* eklenen kart videoda ya da seste geçer */
  const heard = new Set([...toks(vText), ...sesler.flatMap((s) => (s.script || []).flatMap((l: any) => toks(l.de)))]);
  for (const c of added) { const it = lex.get(c); if (it) need(toks(it.de).some((w) => heard.has(w)), `KART ${f}: eklenen ${c} video ya da seste geçmiyor`); }

  /* 3c. GÖRSEL */
  const gs: any[] = d.gorsel || [];
  need(gs.length === 6, `GÖRSEL: ${gs.length} madde (6)`);
  const imgs = new Set<string>();
  for (const x of gs) {
    keys(x, "gorsel", `görsel ${x.id}`);
    uniq(x.id, "görsel");
    need(str(x.de) && str(x.dogru_img), `GÖRSEL ${x.id}: alan eksik`);
    need(Array.isArray(x.celdirici_img) && x.celdirici_img.length === 3 && x.celdirici_img.every(str), `GÖRSEL ${x.id}: 3 çeldirici gerekir`);
    const four = [x.dogru_img, ...(x.celdirici_img || [])];
    need(new Set(four).size === 4, `GÖRSEL ${x.id}: yinelenen resim`);
    need(!imgs.has(x.dogru_img), `GÖRSEL ${x.id}: doğru resim başka maddede de var`);
    imgs.add(x.dogru_img);
    const u = unknownIn(x.de);
    if (u.length) bad(`GÖRSEL ${x.id}: bilinmeyen kelime: ${u.join(", ")}`);
  }

  /* 3d. PROVA */
  const p = d.prova || {};
  keys(p, "prova", "prova");
  uniq(p.id, "prova");
  need(str(p.title_tr) && str(p.durum_tr) && str(p.kapanis_tr), "PROVA: başlık, durum ya da kapanış yok");
  need(CHARS.has(p.karsi), `PROVA: karşı taraf yok: ${p.karsi}`);
  speakers.add(p.karsi);
  const nodes: any[] = p.dugumler || [];
  const nm = new Map<string, any>(nodes.map((n) => [n.id, n]));
  need(nm.size === nodes.length, "PROVA: yinelenen düğüm");
  need(nodes.length >= LIMIT.dugumMin && nodes.length <= LIMIT.dugumMax, `PROVA: ${nodes.length} düğüm (5–8)`);
  need(nm.has(p.baslangic), "PROVA: başlangıç yok");
  let optN = 0, wrongN = 0;
  for (const n of nodes) {
    keys(n, "dugum", `prova.${n.id}`);
    need(str(n.de) && str(n.tr), `PROVA ${n.id}: metin eksik`);
    if (n.son) { need(!n.secenekler?.length, `PROVA ${n.id}: son düğümde seçenek olmaz`); continue; }
    const ops: any[] = n.secenekler || [];
    need(ops.length >= 2 && ops.length <= LIMIT.secenekMax, `PROVA ${n.id}: ${ops.length} seçenek (2–3)`);
    need(ops.some((o) => o.uygun === true), `PROVA ${n.id}: uygun seçenek yok`);
    need(ops.some((o) => o.uygun === false), `PROVA ${n.id}: yanlış ya da kaba seçenek yok`);
    ops.forEach((o, i) => {
      const oid = `${p.id}/${n.id}/${i}`;
      optN++; if (!o.uygun) wrongN++;
      keys(o, "secenek", oid);
      need(typeof o.uygun === "boolean", `PROVA ${oid}: uygun alanı yok`);
      need(str(o.de) && str(o.tr), `PROVA ${oid}: metin eksik`);
      need(str(o.geri_bildirim_tr), `PROVA ${oid}: geri bildirim yok`);
      need(nm.has(o.sonraki), `PROVA ${oid}: sonraki düğüm yok: ${o.sonraki}`);
      need(o.accepted?.[0] === o.de, `PROVA ${oid}: ilk cevap de ile aynı olmalı`);
      if (checkAccepted(oid, o.accepted, "uretim")) production(oid, o.de, true);
    });
    ops.forEach((a, i) => ops.forEach((b, j) => {
      if (i === j || !Array.isArray(a.accepted) || !Array.isArray(b.accepted)) return;
      const B = expandAccepted(b.accepted, {});
      for (const x of expandAccepted(a.accepted, {})) if (judge(B, [x]).ok) bad(`PROVA ${p.id}/${n.id}: "${x}" iki seçeneğe de gidiyor`);
    }));
  }
  const next = (n: any, onlyGood = false) => (n?.secenekler || []).filter((o: any) => !onlyGood || o.uygun).map((o: any) => o.sonraki);
  const reach = (start: string, onlyGood = false) => { const s = new Set<string>(); const q = [start]; while (q.length) { const x = q.pop()!; if (s.has(x) || !nm.has(x)) continue; s.add(x); q.push(...next(nm.get(x), onlyGood)); } return s; };
  const R = reach(p.baslangic);
  for (const n of nodes) {
    need(R.has(n.id), `PROVA ${n.id}: başlangıçtan ulaşılamıyor`);
    need([...reach(n.id)].some((x) => nm.get(x)?.son), `PROVA ${n.id}: sona ulaşmıyor`);
  }
  need([...reach(p.baslangic, true)].some((x) => nm.get(x)?.son), "PROVA: uygun seçeneklerle sona ulaşılamıyor");
  comprehension(`${p.id} prova karşı taraf`, nodes.map((n) => n.de));

  /* 3e. OKUMA / YAZMA */
  const oy = d.okuma_yazma || {};
  keys(oy, "oy", "okuma_yazma");
  need(oy.tur === "okuma" || oy.tur === "yazma", "OY: tür geçersiz");
  need(oy.tur !== prevOY, `OY: önceki günle aynı tür: ${oy.tur}`);
  need(str(oy.title_tr), "OY: başlık yok");
  if (str(oy.metin_de)) {
    need(str(oy.metin_tr), "OY: metin_tr yok");
    const ss = sentencesDe(oy.metin_de);
    if (oy.tur === "okuma") need(ss.length >= 3 && ss.length <= 6, `OY: ${ss.length} cümle (3–6)`);
    comprehension(`${P}okuma_yazma metin`, [oy.metin_de]);
    const sl = new Map(ss.map((x, i) => [String(i), x]));
    for (const q of oy.sorular || []) {
      qc.okuma!++;
      if (q.k) cevaplaCheck(q, "okuma_yazma");
      else { drillId(q.id, "okuma_yazma"); listenCheck(q, q.id, null, sl); }
    }
  } else need(oy.tur === "yazma", "OY: metin_de yok");
  if (oy.tur === "okuma") {
    need((oy.sorular || []).length >= 4, `OY: ${(oy.sorular || []).length} soru (en az 4)`);
    need(oy.yazma === undefined, "OY: okuma gününde yazma alanı olmaz");
  } else if (oy.tur === "yazma") {
    const y = oy.yazma || {};
    keys(y, "yazma", "yazma");
    need(str(y.gorev_tr) && str(y.ornek_de), "YAZMA: görev ya da örnek yok");
    production(`${P}yazma ornek_de`, y.ornek_de || "", true);
    need(Array.isArray(y.zorunlu) && y.zorunlu.length >= 2, "YAZMA: en az 2 zorunlu öğe");
    for (const w of y.zorunlu || []) {
      need(!/\*/.test(w), `YAZMA: zorunlu öğe düz yazılır: ${w}`);
      need(hasPhrase(y.ornek_de || "", w), `YAZMA: zorunlu öğe örnekte yok: ${w}`);
      production(`${P}yazma zorunlu`, w, false);
    }
    need(Array.isArray(y.kontrol_tr) && y.kontrol_tr.length === 3 && y.kontrol_tr.every(str), "YAZMA: kontrol_tr 3 madde olmalı");
    const frames: string[] = y.accepted_kaliplar || [];
    need(frames.length >= 3, `YAZMA: ${frames.length} kalıp (en az 3)`);
    const rx = frames.map((k) => new RegExp("^" + norm(k.replace(/_{3}/g, " qqq ")).split(" ").map((w) => (w === "qqq" ? "[a-z0-9 ]+" : w)).join(" ") + "$"));
    for (const s of sentencesDe(y.ornek_de || "")) {
      const c = norm(s.replace(/\{[^{}]*\}/g, "x"));
      need(rx.some((r) => r.test(c)), `YAZMA: örnek cümle hiçbir kalıba uymuyor: "${s}"`);
    }
  }

  /* 3f. HAFTA SONU TESTİ (7. gün): 10–12 Drill; dinleme, kurma ve konuşma karışık, hepsi öğretilmiş öğelerden */
  if (day === 7) {
    const T: any[] = Array.isArray(hst) ? hst : [];
    need(T.length >= 10 && T.length <= 12, `TEST: ${T.length} madde (10–12)`);
    const tur = { dinleme: 0, kurma: 0, konusma: 0 };
    const seen = (id: string, label: string, text: string) => { const u = unknownIn(text || ""); if (u.length) bad(`TEST ${id}: ${label} içinde bilinmeyen: ${u.join(", ")}`); };
    for (const t of T) {
      drillId(t.id, "hafta_sonu_testi");
      const r = Drill.safeParse(t);
      if (!r.success) bad(`ŞEMA ${t.id}: ${r.error.issues.map((i: any) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
      if (t.k === "listen_and_respond") { tur.dinleme++; seen(t.id, "ses", t.audio_de); need(!/\{/.test(t.audio_de || ""), `TEST ${t.id}: seste yer tutucu olmaz`); }
      else if (["order", "gap", "transform"].includes(t.k)) tur.kurma++;
      else if (["guided_response", "tr_de"].includes(t.k)) tur.konusma++;
      else bad(`TEST ${t.id}: tür dinleme, kurma ya da konuşma değil: ${t.k}`);
      if (t.k === "guided_response") seen(t.id, "soru", t.prompt_de);
      if (t.k === "transform") seen(t.id, "kaynak cümle", t.from_de);
      if (t.k === "gap") {
        if (checkAccepted(t.id, t.accepted, "dikte", t.accepted?.[0])) {
          production(t.id, t.accepted[0], false);
          seen(t.id, "cümle", String(t.de).replace("___", t.accepted[0]));
          need((t.opts || []).includes(t.accepted[0]), `TEST ${t.id}: doğru cevap seçeneklerde yok`);
          for (const o of t.opts || []) production(t.id, o, false);
        }
      } else if (checkAccepted(t.id, t.accepted, "uretim")) {
        production(t.id, t.accepted[0], false);
        if (t.k === "order") need([...toks(t.de)].sort().join(" ") === [...toks(t.accepted[0])].sort().join(" "), `TEST ${t.id}: parçalar ilk cevabın kelimeleri değil`);
      }
    }
    need(tur.dinleme >= 3 && tur.kurma >= 3 && tur.konusma >= 2, `TEST: karışım yetersiz (dinleme ${tur.dinleme}, kurma ${tur.kurma}, konuşma ${tur.konusma})`);
    say(`  hafta sonu testi: ${T.length} madde · dinleme ${tur.dinleme}, kurma ${tur.kurma}, konuşma ${tur.konusma}`);
  } else need(hst === undefined, `BİÇİM ${f}: hafta_sonu_testi yalnızca 7. günde olur`);

  /* karakter listesi */
  for (const s of speakers) need((d.characters || []).includes(s), `BİÇİM ${f}: ${s} characters listesinde yok`);
  for (const c of d.characters || []) need(speakers.has(c), `BİÇİM ${f}: ${c} hiçbir yerde konuşmuyor`);

  /* seçenek konumu */
  const top = Math.max(0, ...[0, 1, 2, 3].map((a) => pickAns.filter((x) => x === a).length));
  need(pickAns.length && top / pickAns.length <= LIMIT.ansPay, `SORU ${f}: doğru cevap aynı konumda yığılıyor (${top}/${pickAns.length})`);

  /* 5. OD-9 */
  const nouns = new Set<string>();
  for (const [c] of usedCards) { const it = lex.get(c); if (it?.pos === "noun" && !["Frau", "Herr"].includes(it.de)) nouns.add(it.de); }
  const body = { ...d, can_do: { tr: d.can_do?.tr } };
  walkTr(body, f.slice(0, 6), (pa, va, k) => trCheck(pa, va, nouns, k !== "tr"));
  for (const q of trOpts) (q.opts || []).forEach((o: string, i: number) => trCheck(`${q.id}.opts[${i}]`, o, nouns, true));

  /* Almanca metin kuralları */
  walkDe({ sahne: d.sahne, sesler: d.sesler, gorsel: d.gorsel, prova: d.prova, okuma_yazma: d.okuma_yazma, hafta_sonu_testi: hst }, (pa, va) => {
    if (/\.(id|k|kind|tur|speaker|karsi|baslangic|sonraki|cumle|seviye)$/.test(pa) || /\.(kanit|cumleler|golge|hizlar)\[/.test(pa)) return;
    if (/\.(ana_fikir|ayrinti\[\d+\]|eylem|sorular\[\d+\])\.opts\[/.test(pa)) return;
    // Yedek kabul cevabı öğretim değildir: Bavyera'da yaşayan öğrenci "Grüß Gott" derse reddedilmez
    if (!/\.accepted\[[1-9]\d*\]$/.test(pa)) for (const [re, name] of YASAK_DE) if (re.test(va)) bad(`BAIRISCH ${pa}: ${name}`);
    if (/\d{4,}/.test(va)) bad(`BİLGİ ${pa}: uzun rakam dizisi (telefon numarası olabilir)`);
    for (const m of va.matchAll(/\{([^{}]*)\}/g)) if (m[1] !== "name" && !/^[^|]+\|[^|]+$/.test(m[1]!)) bad(`KİMLİK ${pa}: geçersiz yer tutucu {${m[1]}}`);
    for (const m of va.replace(/\{[^{}]*\}/g, " ").matchAll(/\b(Herr|Frau)\s+(\p{Lu}\p{L}+)/gu)) if (!SURNAMES.has(m[2]!.toLowerCase())) bad(`KİMLİK ${pa}: sabit ad olabilir: ${m[0]}`);
  });

  /* önceki gün içeriği */
  learn([...scenes.flatMap((s) => toks(s.de)), ...sesler.flatMap((s) => (s.script || []).flatMap((l: any) => toks(l.de))), ...nodes.flatMap((n) => toks(n.de)), ...toks(oy.metin_de || "")].filter((w) => !PERSON.has(w) && !PLACE_WORDS.has(w)), "önceki-gün");
  prevVideo = v.tur; prevOY = oy.tur;

  if (process.env.M1_KNOWN) writeFileSync(`${process.env.M1_KNOWN}/bilinen-${f.replace(".json", "")}.txt`, [...known.entries()].filter(([, t]) => t !== "örnek").map(([w]) => w).sort().join("\n") + "\n");
  const row = `kart ${cards.length} (eklenen ${added.length}) · sahne ${scenes.length} satır/${(v.bolumler || []).length} bölüm · ses ${sesler.length} · görsel ${gs.length} · prova ${nodes.length} düğüm/${optN} seçenek/${wrongN} yanlış · ${oy.tur} ${(oy.sorular || []).length} soru · ana fikir ${qc.ana_fikir}, ayrıntı ${qc.ayrinti}, dikte kademesi ${qc.dikte} (gerçek ${qc.gercek}), gölge ${qc.golge}, cevapla ${qc.cevapla}, eylem ${qc.eylem}`;
  say("  " + row);
  if (added.length) say("  eklenen kartlar: " + added.join(", "));
  say(`  ihlal ${viol - before}`);
  summary.push(`gün ${day}: ${row}`);
  say("");
}

say("===== DİNLEME ve OKUMA: bilinmeyen kelime oranı (sınır %5, OD-0)");
for (const r of ratios) say("  " + r);
say("");
say(`===== OD-0: üretimde yalnızca kart ÖRNEĞİNDEN gelen kelimeler (${ornekList.length} madde; hedef 0)`);
for (const t of ornekList) say("  " + t);
say("");
say("===== TOPLAM");
for (const s of summary) say(s);
say(`denetlenen Türkçe alan ${cnt.trAlan} · kabul cevabı denemesi ${cnt.kabul} · üretim kontrolü ${cnt.uretim}`);
say(`İHLAL: ${viol}`);
writeFileSync(OUT, L.join("\n") + "\n");
console.log(L.join("\n"));
process.exit(viol ? 1 : 0);
