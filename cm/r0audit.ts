// R0 temel paket denetimi (PR #51 inceleme kapanışı).
// Çalıştırma:  cd /home/claude/wt-r0 && npx tsx /home/claude/cm/r0audit.ts
// Çıktı: docs/v2/reviews/temel-r0-denetim.txt  (çıkış kodu: ihlal varsa 1)
//
// Her ders için, sırayla:
//  1. ŞEMA   bütün alıştırmalar ve yerleştirme maddeleri `Drill` şemasıyla
//  2. OD-9   `exp` alanları `Explanation` + `explanationIssues`; öbür `*_tr` metinleri `textIssues`
//  3. OD-0   üretim maddelerinin (tr_de, transform, guided_response, listen_and_respond) İLK kabul cevabındaki
//            her kelime bu ya da önceki derslerde öğretildi mi?
//            kaynak sırası: öğe (`teach.de`) → parça (`exp.parcalar[].de`) → ipucu (öğe açıklamasındaki **kalın** Almanca)
//            → tablo (ayrı sayılır ve listelenir) → hiçbiri (İHLAL)
//  4. KABUL  `accepted` listesinin her öğesi `judge()` ile kendini kabul ediyor mu; üretim maddesinde en az 3 farklı
//            normalleştirilmiş cevap var mı
//  5. DİYALOG öğrencinin diyalog satırlarındaki her kelime öğretildi mi (özel adlar hariç)
//  6. İNCELEME  PR #51 yorumunda "reddediliyor" denen doğru cevaplar artık kabul ediliyor mu (regresyon listesi);
//            P0-1 ilk cevapları ve P1-2 parçaları
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { Drill } from "/home/claude/wt-r0/packages/shared/src/content.ts";
import { Explanation, explanationIssues, textIssues } from "/home/claude/wt-r0/packages/shared/src/explain.ts";
import { judge, norm } from "/home/claude/wt-r0/web/src/core/grading.ts";
import { expandAccepted } from "/home/claude/wt-r0/web/src/core/persona.ts";
const ROOT = "/home/claude/wt-r0";

const DIR = `${ROOT}/content/v2/temel`;
const OUT = `${ROOT}/docs/v2/reviews/temel-r0-denetim.txt`;
const PROD = new Set(["tr_de", "transform", "guided_response", "listen_and_respond"]);
const L: string[] = [];
const say = (s = "") => L.push(s);
let viol = 0;
const bad = (s: string) => { viol++; say("  İHLAL  " + s); };

/** Almanca kelimeler: yer tutucular ve rakamlar atılır, tire ayırır, küçük harf */
function toks(s: string): string[] {
  return s.replace(/\{[^{}]*\}/g, " ").toLowerCase().replace(/[’'`´]/g, "").split(/[^a-zäöüß]+/).filter(Boolean);
}
const bolds = (s?: string) => (s ? [...s.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1]!) : []);

// Sayı kelimeleri: bileşik sayı (siebenundvierzig, neunzehnhundertneunzig) parçaları öğretildiyse öğretilmiş sayılır.
const ONES = ["ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const TENS = ["zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
function numParts(w: string): string[] | null {
  let m = w.match(new RegExp(`^(${ONES.join("|")})und(${TENS.join("|")})$`));
  if (m) return [m[1] === "ein" ? "eins" : m[1]!, "und", m[2]!];
  m = w.match(/^(.+)hundert(.*)$/);
  if (m) { const a = numParts(m[1]!) ?? [m[1]!]; const b = m[2] ? numParts(m[2]) ?? [m[2]] : []; return [...a, "hundert", ...b]; }
  return null;
}

type Src = "öğe" | "parça" | "ipucu" | "tablo";
const known = new Map<string, { src: Src; at: string }>();
const RANK: Record<Src, number> = { "öğe": 0, "parça": 1, "ipucu": 2, "tablo": 3 };
function learn(words: string[], src: Src, at: string) {
  for (const w of words) { const k = known.get(w); if (!k || RANK[src] < RANK[k.src]) known.set(w, { src, at }); }
}
function lookup(w: string): Src | null {
  const k = known.get(w);
  if (k) return k.src;
  const p = numParts(w);
  if (p) { let worst: Src = "öğe"; for (const x of p) { const s = lookup(x); if (!s) return null; if (RANK[s] > RANK[worst]) worst = s; } return worst; }
  return null;
}

function walkTr(x: any, path: string, cb: (p: string, v: string) => void) {
  if (Array.isArray(x)) x.forEach((v, i) => walkTr(v, `${path}[${v && typeof v === "object" && v.id ? v.id : i}]`, cb));
  else if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) {
    if (k === "exp" || k === "review") continue;
    if (typeof v === "string") { if (k.endsWith("_tr")) cb(`${path}.${k}`, v); } else walkTr(v, `${path}.${k}`, cb);
  }
}

const files = readdirSync(DIR).filter((f) => /^r0-\d\d-.*\.json$/.test(f)).sort();
/** Öğrenci satırında geçebilen özel adlar: öğretilecek kelime değildir */
const NAMES = new Set(["ioana", "pichler", "brunnengasse"]);
const tot = { diyalog: 0, ders: 0, ogretim: 0, alistirma: 0, yerlestirme: 0, uretim: 0, exp: 0, trAlan: 0, kabul: 0, tabloKelime: 0, ipucuKelime: 0 };
const tabloList: string[] = [];
const ipucuList: string[] = [];
const allDrills = new Map<string, any>();
const allTeach = new Map<string, any>();
let MISSION_CITY = false;
say(`R0 temel paket denetimi · ${new Date().toISOString().slice(0, 10)} · betik: /home/claude/cm/r0audit.ts`);
say(`Kaynak: ${DIR}`);
say("");

for (const f of files) {
  const d = JSON.parse(readFileSync(`${DIR}/${f}`, "utf8"));
  tot.ders++;
  say(`===== ${d.id}  (${f})`);
  const before = viol;
  const items: any[] = [...(d.drills || []), ...(d.placement || [])];
  tot.ogretim += d.teach.length; tot.alistirma += (d.drills || []).length; tot.yerlestirme += (d.placement || []).length;

  // 1. ŞEMA
  const ids = new Set<string>();
  for (const x of items) {
    const r = Drill.safeParse(x);
    if (!r.success) bad(`ŞEMA ${x.id}: ${r.error.issues.map((i: any) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    if (ids.has(x.id) || allDrills.has(x.id)) bad(`ŞEMA ${x.id}: kimlik çakışması`);
    ids.add(x.id); allDrills.set(x.id, x);
    if (x.k === "pick" && !(x.ans < x.opts.length)) bad(`ŞEMA ${x.id}: ans dizini seçenek dışında`);
    if (x.k === "gap" && x.opts && !x.opts.includes(x.accepted[0])) bad(`ŞEMA ${x.id}: ilk cevap seçeneklerde yok`);
    if (x.k === "order") {
      const chips = x.de.split("/").map((s: string) => norm(s)).sort().join("|");
      for (const a of x.accepted) if (norm(a).split(" ").sort().join("|") !== chips.split("|").flatMap((c: string) => c.split(" ")).sort().join("|")) bad(`ŞEMA ${x.id}: "${a}" çiplerle kurulamıyor`);
    }
  }

  for (const t of d.teach) allTeach.set(t.id, t);
  if (d.id === "r0:10-buchstabieren" && /sonra şehir adlarıyla/.test(d.mission?.task_tr || "")) MISSION_CITY = true;

  // 2. OD-9
  for (const t of d.teach) {
    if (!t.exp) { bad(`OD-9 ${t.id}: exp yok`); continue; }
    tot.exp++;
    const r = Explanation.safeParse(t.exp);
    if (!r.success) { bad(`OD-9 ${t.id}: exp şema`); continue; }
    for (const x of explanationIssues(r.data)) bad(`OD-9 ${t.id}: exp.${x}`);
  }
  walkTr(d, f.slice(0, 5), (p, v) => { tot.trAlan++; for (const x of textIssues(v)) bad(`OD-9 ${p}: ${x}`); });

  // 3. OD-0 — önce bu dersin öğrettikleri
  for (const t of d.teach) {
    learn(toks(t.de), "öğe", t.id);
    for (const p of t.exp?.parcalar || []) learn(toks(p.de), "parça", t.id);
    for (const k of ["anlam_tr", "ne_zaman_tr", "ipucu_tr"]) for (const b of bolds(t.exp?.[k])) learn(toks(b), "ipucu", t.id);
  }
  if (d.table) for (const row of d.table.satirlar) for (const c of row) learn(toks(String(c)), "tablo", `${d.id} tablo`);
  for (const x of items) {
    if (!PROD.has(x.k)) continue;
    tot.uretim++;
    const first: string = x.accepted[0];
    const miss: string[] = [], tab: string[] = [], ipu: string[] = [];
    for (const w of toks(first)) { const s = lookup(w); if (!s) miss.push(w); else if (s === "tablo") tab.push(w); else if (s === "ipucu") ipu.push(w); }
    if (miss.length) bad(`OD-0 ${x.id}: "${first}" → öğretilmemiş: ${[...new Set(miss)].join(", ")}`);
    if (tab.length) { tot.tabloKelime += tab.length; tabloList.push(`${x.id}: "${first}" → ${[...new Set(tab)].join(", ")}`); }
    if (ipu.length) { tot.ipucuKelime += ipu.length; ipucuList.push(`${x.id}: "${first}" → ${[...new Set(ipu)].join(", ")}`); }
  }

  // 3b. OD-0 diyalog: öğrencinin söylediği satırlar
  for (const [i, l] of (d.dialogue?.lines || []).entries()) {
    if (l.speaker !== "ogrenci") continue;
    tot.diyalog++;
    const miss: string[] = [], tab: string[] = [];
    for (const w of toks(l.de)) { if (NAMES.has(w)) continue; const s = lookup(w); if (!s) miss.push(w); else if (s === "tablo") tab.push(w); }
    if (miss.length) bad(`OD-0 diyalog ${d.id} satır ${i}: "${l.de}" → öğretilmemiş: ${[...new Set(miss)].join(", ")}`);
    if (tab.length) { tot.tabloKelime += tab.length; tabloList.push(`${d.id} diyalog satır ${i}: "${l.de}" → ${[...new Set(tab)].join(", ")}`); }
  }

  // 4. KABUL
  for (const x of items) {
    if (!x.accepted) continue;
    const list: string[] = expandAccepted(x.accepted, {});
    for (const a of list) { tot.kabul++; if (!norm(a)) bad(`KABUL ${x.id}: boş cevap`); else if (!judge(list, [a]).ok) bad(`KABUL ${x.id}: "${a}" kendini kabul etmiyor`); }
    if (PROD.has(x.k)) { const n = new Set(list.map((a) => norm(a))).size; if (n < 3) bad(`KABUL ${x.id}: ${n} farklı cevap (en az 3)`); }
  }
  say(`  öğretim ${d.teach.length} · alıştırma ${(d.drills || []).length} · yerleştirme ${(d.placement || []).length} · üretim ${items.filter((x) => PROD.has(x.k)).length} · ihlal ${viol - before}`);
}

// 5. İNCELEME regresyon listesi: [madde, cevap]
const MUST: [string, string][] = [
  ["r0:07:d27", "Können Sie das bitte wiederholen?"], ["r0:07:d27", "Noch einmal, bitte."],
  ["r0:07:p05", "Können Sie das bitte wiederholen?"], ["r0:07:p05", "Noch einmal, bitte."],
  ["r0:09:d29", "Guten Tag, hier ist {name}. Ich möchte einen Termin machen."], ["r0:09:d29", "Hallo, ich möchte einen Termin machen."], ["r0:09:d29", "Grüß Gott, ich hätte gern einen Termin."],
  ["r0:09:p05", "Guten Tag, hier ist {name}. Ich möchte einen Termin machen."], ["r0:09:p05", "Hallo, ich möchte einen Termin machen."], ["r0:09:p05", "Grüß Gott, ich hätte gern einen Termin."],
  ["r0:08:d18", "Ich habe einen Termin am Dienstag."], ["r0:08:d18", "Dienstag habe ich einen Termin."],
  ["r0:08:d33", "Freitag um drei."], ["r0:08:d33", "Am Freitag um fünfzehn Uhr."],
  ["r0:09:d18", "Dienstag kann ich nicht kommen."], ["r0:09:d18", "Ich kann Dienstag nicht kommen."],
  ["r0:09:d34", "Ich komme am Montag."], ["r0:09:d34", "Montag, bitte."],
  ["r0:06:d19", "Dienstag, der 1. Dezember."],
  ["r0:05:d21", "Es ist zwei Uhr dreißig."], ["r0:05:p02", "Es ist drei Uhr fünfundvierzig."],
  ["r0:08:d13", "Ich bin morgen nicht da"], ["r0:08:d14", "Ich habe am Dienstag Zeit"], ["r0:06:d13", "Um zehn am Dienstag"],
  ["r0:10:d20", "Null eins sieben eins, drei neun zwei null null, siebenundvierzig."], ["r0:10:d20", "0171 3920047"], ["r0:10:d20", "01713920047"],
  ["r0:05:d30", "Heute Abend um zwanzig Uhr."], ["r0:05:d38", "Um zweiundzwanzig Uhr dreißig."],
  ["r0:04:d23", "100 Euro"], ["r0:06:d24", "Siebter Achter neunzig"], ["r0:01:d20", "Geht am Freitag?"],
  // P0-1: şehir adlı biçim kabul listesinde kalır
  ["r0:10:d22", "K wie Köln"], ["r0:10:d23", "S wie Salzwedel"], ["r0:10:p04", "M wie München"],
  // P1-4: telefon ve saat, rakamlı ve bitişik biçimler
  ["r0:03:d22", "Meine Nummer ist 0171."], ["r0:03:d23", "089"], ["r0:03:d31", "0171"], ["r0:03:d34", "Meine Nummer ist 089."], ["r0:03:p02", "016"],
  ["r0:05:d20", "8:30"], ["r0:05:d20", "Es ist 8:30 Uhr."], ["r0:05:d33", "Dienstag um 9:30 Uhr."], ["r0:05:d39", "8:30 Uhr"], ["r0:05:d44", "11:45 Uhr"], ["r0:05:d44", "Um 11:45 Uhr."]
];
const FIRST: [string, string][] = [["r0:10:d22", "K wie Kaufmann"], ["r0:10:d23", "S wie Samuel"], ["r0:10:p04", "M wie Martha"]];
say("");
say("===== İNCELEME (PR #51) regresyon listesi: reddedilen doğru cevaplar");
for (const [id, a] of MUST) {
  const x = allDrills.get(id);
  if (!x) { say(`  bilgi  ${id}: madde artık yok ya da türü değişti ("${a}")`); continue; }
  if (!x.accepted) { say(`  bilgi  ${id}: madde artık ${x.k} türünde, serbest cevap istemiyor ("${a}")`); continue; }
  const list: string[] = expandAccepted(x.accepted, {});
  const [a2] = expandAccepted([a], {});
  if (judge(list, [a2!]).ok) say(`  kabul  ${id}: ${a}`); else bad(`İNCELEME ${id}: "${a}" hâlâ reddediliyor`);
}

say("");
say("===== P0-1 ve P1-2");
for (const [id, a] of FIRST) { if (allDrills.get(id)?.accepted?.[0] === a) say(`  tamam  ${id}: ilk cevap "${a}"`); else bad(`P0-1 ${id}: ilk cevap "${allDrills.get(id)?.accepted?.[0]}", beklenen "${a}"`); }
if (MISSION_CITY) bad("P0-1 r0:10 görev metni şehir adlarını zorunlu istiyor"); else say("  tamam  r0:10 görev metni şehir adını zorunlu istemiyor");
const sd = allTeach.get("r0:09:a:sie-duerfen");
const sdChips = (sd?.exp?.parcalar || []).map((p: any) => p.de);
if (sdChips.join(" ") === "Sie dürfen nichts essen") say(`  tamam  r0:09:a:sie-duerfen parçaları: ${(sd.exp.parcalar as any[]).map((p) => `${p.de} → ${p.tr}`).join(" | ")}`);
else bad(`P1-2 r0:09:a:sie-duerfen parçaları cümleyi kurmuyor: ${sdChips.join(" | ")}`);
if ([...allTeach.values()].some((t: any) => t.id !== "r0:09:a:sie-duerfen" && (t.exp?.parcalar || []).some((p: any) => p.de === "essen"))) say("  tamam  essen ayrı bir öğede parça olarak öğretiliyor");
else bad("P1-2 essen ayrı öğretilmiyor");
say("");
say(`===== OD-0: ilk cevapta yalnızca TABLODAN gelen kelimeler (${tot.tabloKelime} kelime, ${tabloList.length} madde)`);
for (const t of tabloList) say("  " + t);
say("");
say(`===== OD-0: ilk cevapta yalnızca öğe açıklamasındaki **kalın** kelimeden gelenler (${tot.ipucuKelime} kelime, ${ipucuList.length} madde)`);
for (const t of ipucuList) say("  " + t);
say("");
say("===== TOPLAM");
say(`ders ${tot.ders} · öğretim öğesi ${tot.ogretim} · alıştırma ${tot.alistirma} · yerleştirme ${tot.yerlestirme} · üretim maddesi ${tot.uretim}`);
say(`denetlenen exp ${tot.exp} · öbür *_tr alanı ${tot.trAlan} · kabul cevabı ${tot.kabul} · öğrenci diyalog satırı ${tot.diyalog}`);
say(`İHLAL: ${viol}`);
writeFileSync(OUT, L.join("\n") + "\n");
console.log(L.join("\n"));
process.exit(viol ? 1 : 0);
