/**
 * Yapay zekâsız eşdeğerlik (#58 A11, RQ-Ş21: değerlendirme iki yönlü doğru).
 *  - kanon(): saat (9:30, 9 Uhr 30, halb zehn, Viertel nach neun), tarih (3.5., 3. Mai, dritten Mai), sıra sayısı, "zwo"
 *    tek biçime iner; norm() ile birlikte kullanılır (esNorm).
 *  - rakamDizisi(): telefon numarası gibi uzun rakam dizisi rakamla, tek tek ya da gruplu sayı kelimesiyle söylenebilir.
 *  - hecele(): harf harf söyleme (B wie Berta, Berlin, B, be, Doppel-L, Umlaut Unna) yuvaları serbest karışır.
 *  - v2Sira(): Almanca düz cümlede bir öğe başa alınabilir, çekimli fiil ikinci yerde kalır (Morgen gehe ich…);
 *    fiil üçüncü yere düşerse (Morgen ich gehe…) açıklamalı yanlış.
 *  - yazimNotu(): doğru sayılan cevapta büyük harf ve ümlaut düzeltmesi gösterilir.
 */
import { norm, numWord } from "./grading.ts";

const AYLAR = ["januar", "februar", "maerz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"];
const AY_HAM = "Januar|Februar|März|Maerz|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember";

/** Normalleştirilmiş sayı kelimesi → değer (0–99; norm() yazımıyla: fuenf, zwoelf, dreissig) */
const SAYI = new Map<string, number>();
for (let n = 0; n < 100; n++) SAYI.set(norm(numWord(n)), n);
SAYI.set("zwo", 2); SAYI.set("ein", 1);
/** Sıra sayısı kökleri (erst-, zweit-, dritt-, … einunddreissigst-) → değer */
const SIRA = new Map<string, number>();
for (let n = 1; n <= 31; n++) {
  const k = n === 1 ? "erst" : n === 3 ? "dritt" : n === 7 ? "siebt" : n === 8 ? "acht" : n < 20 ? norm(numWord(n)) + "t" : norm(numWord(n)) + "st";
  SIRA.set(k, n);
}
SIRA.set("siebent", 7); SIRA.set("zwot", 2);
const SIRA_EK = /^(.+?)(e|en|er|es|em)$/;
const saatYaz = (h: number, mm: number) => `${norm(numWord(h))} uhr${mm ? " " + norm(numWord(mm)) : ""}`;

/** Ham metindeki rakamlı saat ve tarih biçimleri (norm'dan önce: norm rakamı yazıya çevirir, noktayı siler) */
function hamKanon(s: string): string {
  let t = String(s || "");
  // saat: 9:30, 09:00 Uhr, 9.30 Uhr (noktalı biçim yalnızca "Uhr" ile; 9.30 tek başına tarih/fiyat olabilir)
  t = t.replace(/(?<![\d.:])(\d{1,2})([:.])(\d{2})(?![\d:]|\.\d)(\s*uhr\b)?/giu, (m, h: string, ayr: string, mm: string, uhr?: string) => {
    if (ayr === "." && !uhr) return m;
    const H = Number(h), M = Number(mm);
    return H <= 24 && M < 60 ? ` ${H} Uhr${M ? " " + M : ""} ` : m;
  });
  // tarih (3.5., 03.05.2026) ve rakamlı sıra sayısı (3. Mai, am 3., der 2. Stock) yalnızca bağlamda: artikel/am/im/zum…
  // sonra ya da ay adından önce (inceleme #76 P2: "kostet 3.10.", "bis 5." sıra sayısı değil). Rakamlı sıra sayısının eki bilinmez: "o3"; yazılı olanın eki korunur: "o3sen"
  const BAG = "(?<=(?:^|[^\\p{L}])(?:am|im|vom|zum|zur|der|den|dem|des|die|das)\\s+)";
  t = t.replace(new RegExp(`${BAG}(\\d{1,2})\\.\\s?(\\d{1,2})\\.(\\d{4}|\\d{2})?(?!\\d)`, "giu"), (m, d: string, a: string, y?: string) => {
    const D = Number(d), A = Number(a);
    return D >= 1 && D <= 31 && A >= 1 && A <= 12 ? ` o${D} ${AYLAR[A - 1]}${y ? " " + y : ""} ` : m;
  });
  t = t.replace(new RegExp(`(?<![\\d.])(\\d{1,2})\\.\\s*(?=(${AY_HAM})\\b)`, "giu"), (_m, d: string) => ` o${Number(d)} `);
  t = t.replace(new RegExp(`${BAG}(\\d{1,2})\\.(?!\\d)`, "giu"), (_m, d: string) => ` o${Number(d)} `);
  return t;
}

/** Sıra sayısı kelimesi yalnızca bağlamda (artikel/am/im/zum… sonra ya da ay adından önce): "wir achten auf…" fiil kalır */
const SIRA_BAG = new Set("am im vom zum zur der den dem des die das jeden jede jedes".split(" "));
const AY_SET = new Set(AYLAR);

/** Normalleştirilmiş kelime dizisinde konuşma biçimleri: zwo, sıra sayısı kelimeleri, halb/Viertel/nach/vor saatleri */
function kelimeKanon(w: string[]): string[] {
  const out: string[] = [];
  const saat = (x: string | undefined) => { const n = x === undefined ? undefined : SAYI.get(x); return n !== undefined && n >= 1 && n <= 24 ? n : undefined; };
  const dk = (x: string | undefined) => { const n = x === undefined ? undefined : SAYI.get(x); return n !== undefined && n >= 1 && n <= 29 ? n : undefined; };
  const once = (h: number) => (h === 1 ? 12 : h - 1);
  const yaz = (h: number, m: number) => out.push(...saatYaz(h, m).split(" "));
  for (let i = 0; i < w.length; i++) {
    const x = w[i]!, y = w[i + 1], z = w[i + 2], q = w[i + 3];
    // fünf vor halb neun = 8:25, fünf nach halb neun = 8:35
    if (dk(x) && (y === "vor" || y === "nach") && z === "halb" && saat(q)) { const h = once(saat(q)!); yaz(h, y === "vor" ? 30 - dk(x)! : 30 + dk(x)!); i += 3; continue; }
    if (x === "halb" && saat(y)) { yaz(once(saat(y)!), 30); i++; continue; }
    if (x === "viertel" && (y === "nach" || y === "vor") && saat(z)) { if (y === "nach") yaz(saat(z)!, 15); else yaz(once(saat(z)!), 45); i += 2; continue; }
    // drei nach acht = 8:03, zehn vor neun = 8:50 ("zehn nach neun Uhr" değil)
    if (dk(x) && (y === "nach" || y === "vor") && saat(z) && q !== "uhr") { if (y === "nach") yaz(saat(z)!, dk(x)!); else yaz(once(saat(z)!), 60 - dk(x)!); i += 2; continue; }
    if (x === "zwo") { out.push("zwei"); continue; }
    // "ein Uhr dreißig" = "eins Uhr dreißig" (halb zwei)
    if (x === "ein" && y === "uhr") { out.push("eins"); continue; }
    const m = SIRA_EK.exec(x); const s = m ? SIRA.get(m[1]!) : undefined;
    if (s !== undefined && (SIRA_BAG.has(out[out.length - 1] ?? "") || AY_SET.has(y ?? ""))) { out.push(`o${s}s${m![2]}`); continue; }
    out.push(x);
  }
  return out;
}

/** norm() + saat/tarih/sıra sayısı eşdeğerliği: "Es ist 9:30." = "Es ist halb zehn." = "Es ist neun Uhr dreißig." */
// sık çağrılır (her cevapta her kabul biçimi için): saf fonksiyon, küçük önbellek
const esOnbellek = new Map<string, string>();
export function esNorm(s: string): string {
  const v = esOnbellek.get(s);
  if (v !== undefined) return v;
  const r = kelimeKanon(norm(hamKanon(s)).split(" ").filter(Boolean)).join(" ");
  if (esOnbellek.size > 5000) esOnbellek.clear();
  esOnbellek.set(s, r);
  return r;
}
/**
 * İki metin eşdeğer mi: esNorm kelime kelime; rakamlı sıra sayısı (o3) her ekle eşleşir, yazılı olanların eki aynı olmalı
 * (der dritte Mai ≠ der dritten Mai; inceleme #76 P1-1).
 */
export function esEsit(a: string, b: string): boolean {
  const x = esNorm(a).split(" "), y = esNorm(b).split(" ");
  if (x.length !== y.length || !x[0]) return false;
  return x.every((t, i) => { const u = y[i]!; if (t === u) return true; const p = /^o(\d+)(?:s(\w+))?$/.exec(t), r = /^o(\d+)(?:s(\w+))?$/.exec(u); return !!p && !!r && p[1] === r[1] && (!p[2] || !r[2]); });
}

/**
 * "Yanlış mı, kontrol edemedim mi" ayrımı için anahtar biçim: 0 ve 13–24 saatleri 12 saate iner (halb drei ↔ 14:30,
 * halb eins ↔ 0:30 açık yanlış değildir), sıra sayısı eki atılır.
 */
export function saat12(s: string): string {
  const w = s.split(" ");
  return w.map((x, i) => { const n = SAYI.get(x); if (n !== undefined && w[i + 1] === "uhr" && (n === 0 || (n > 12 && n <= 24))) return norm(numWord(n === 0 ? 12 : n - 12)); return x.replace(/^(o\d+)s\w+$/, "$1"); }).join(" ");
}

/* ───────────── rakam dizisi (telefon numarası) ───────────── */
const BIRLER: Record<string, number> = { null: 0, eins: 1, ein: 1, zwei: 2, zwo: 2, drei: 3, vier: 4, fuenf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9 };
/** "hunderteinundsiebzig" → 171, "neununddreissig" → 39, "zweihundert" → 200; sayı değilse undefined */
export function kelimeSayi(w: string): number | undefined {
  if (/^\d+$/.test(w)) return undefined;
  const yuz = /^(ein|zwei|zwo|drei|vier|fuenf|sechs|sieben|acht|neun)?hundert(.*)$/.exec(w);
  if (yuz) { const kalan = yuz[2] ? (yuz[2] === "eins" ? 1 : SAYI.get(yuz[2])) : 0; return kalan === undefined ? undefined : (yuz[1] ? BIRLER[yuz[1]]! : 1) * 100 + kalan; }
  return SAYI.get(w);
}
/**
 * Uzun rakam dizisi: rakamlar ve sayı kelimeleri (gruplu ya da tek tek) ardışık bir grupta tek rakam dizisine iner;
 * `yapi` kelimelerin sırasını ve grupların yerini (#) korur ("meine nummer ist #").
 */
export function rakamDizisi(s: string): { rakam: string; kelime: string; yapi: string } {
  const t = String(s || "").toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9 ]+/g, " ");
  let rakam = ""; const kelime: string[] = [], yapi: string[] = [];
  for (const w of t.split(/\s+/).filter(Boolean)) {
    const n = /^\d+$/.test(w) ? w : w !== "ein" && kelimeSayi(w) !== undefined ? String(kelimeSayi(w)) : null;
    if (n !== null) { rakam += n; if (yapi[yapi.length - 1] !== "#") yapi.push("#"); continue; }
    kelime.push(w); yapi.push(w);
  }
  return { rakam, kelime: kelime.join(" "), yapi: yapi.join(" ") };
}
/**
 * Kabul biçimi rakamla yazılmış 5+ rakamlı bir dizi içeriyorsa (telefon, posta kodu): rakamlar, kelimeler ve grupların yeri
 * aynıysa eşdeğer. Sayı kelimeleriyle yazılmış saat/yaş cümlelerinde uygulanmaz (inceleme #76 permütasyon taraması).
 */
export function rakamEsit(kabul: string, cevap: string): boolean {
  // tarih, saat, ondalık: rakam grupları arasındaki ayraç anlamlı (1.12.2026 ≠ 11.2.2026; inceleme #76 P1-4)
  if (/\d[.:/,]\d/.test(kabul) || /\d[.:/,]\d/.test(cevap)) return false;
  if ((kabul.match(/\d/g) ?? []).length < 5) return false;
  const a = rakamDizisi(kabul), b = rakamDizisi(cevap);
  return a.rakam === b.rakam && a.yapi === b.yapi;
}

/* ───────────── harf harf söyleme ───────────── */
/** Harf adları (sesle girişte "be", "ka" gelir) ve DIN 5009 kodlama sözcükleri (eski kişi adları, 2022 şehir adları); r0-10 tablosu */
const HARF_AD: Record<string, string> = { ch: "ch", sch: "sch", a: "a", be: "b", ce: "c", tse: "c", ze: "c", de: "d", e: "e", ef: "f", ge: "g", ha: "h", i: "i", jot: "j", yot: "j", ka: "k", el: "l", em: "m", en: "n", o: "o", pe: "p", ku: "q", er: "r", es: "s", te: "t", u: "u", fau: "v", we: "w", ix: "x", iks: "x", ypsilon: "y", zett: "z", tset: "z", eszett: "ß", ae: "ä", oe: "ö", ue: "ü" };
const KOD: Record<string, string> = {
  anton: "a", aachen: "a", berta: "b", berlin: "b", caesar: "c", chemnitz: "c", dora: "d", duesseldorf: "d", emil: "e", essen: "e",
  friedrich: "f", frankfurt: "f", gustav: "g", goslar: "g", heinrich: "h", hamburg: "h", ida: "i", ingelheim: "i", julius: "j", jena: "j",
  kaufmann: "k", koeln: "k", ludwig: "l", leipzig: "l", martha: "m", muenchen: "m", nordpol: "n", nuernberg: "n", otto: "o", offenbach: "o",
  paula: "p", potsdam: "p", quelle: "q", quickborn: "q", richard: "r", rostock: "r", samuel: "s", siegfried: "s", salzwedel: "s",
  theodor: "t", tuebingen: "t", ulrich: "u", unna: "u", viktor: "v", voelklingen: "v", wilhelm: "w", wuppertal: "w", xanthippe: "x", xanten: "x",
  ypsilon: "y", zacharias: "z", zeppelin: "z", zwickau: "z", aerger: "ä", oekonom: "ö", uebermut: "ü", uebel: "ü", eszett: "ß", charlotte: "ch", schule: "sch"
};
const UMLAUT: Record<string, string> = { a: "ä", o: "ö", u: "ü" };
const asc = (w: string) => w.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
/** Cevaptaki harf dizisi; çözülemeyen parça varsa null */
export function harfler(s: string): string[] | null {
  const w = String(s || "").toLowerCase().replace(/[^\p{L}]+/gu, " ").split(" ").filter(Boolean);
  const out: string[] = [];
  const harf = (x: string): string | undefined => (/^\p{L}$/u.test(x) ? x : HARF_AD[asc(x)]);
  const ekle = (h: string) => out.push(...(h === "ch" || h === "sch" ? [...h] : [h]));
  for (let i = 0; i < w.length; i++) {
    const x = w[i]!;
    if (x === "wie" || x === "und") continue;
    // "Doppel-L", "zwei L" (inceleme #76 P2)
    if (x === "doppel" || x === "doppelt" || x === "zwei") {
      const y = w[i + 1]; if (!y) return null;
      const h = harf(y) ?? KOD[asc(y)]; if (!h) return null;
      out.push(h, h); i++;
      if (w[i + 1] === "wie" && w[i + 2] && (KOD[asc(w[i + 2]!)] === h || asc(w[i + 2]!).startsWith(asc(h)))) i += 2;
      continue;
    }
    if (x === "umlaut") {
      // "Umlaut Unna" (önce) ya da "U Umlaut" (sonra)
      const y = w[i + 1]; const h = y ? harf(y) ?? KOD[asc(y)] : undefined;
      if (h && UMLAUT[h]) { out.push(UMLAUT[h]!); i++; continue; }
      const son = out[out.length - 1];
      if (son && UMLAUT[son]) { out[out.length - 1] = UMLAUT[son]!; continue; }
      return null;
    }
    if (x === "scharfes" && w[i + 1] === "s") { out.push("ß"); i++; continue; }
    const h = harf(x);
    if (h) {
      // "B wie Berta": kodlama sözcüğü tablodaysa aynı harf olmalı; tabloda yoksa aynı harfle başlamalı (K wie Kaiser anlaşılır)
      if (w[i + 1] === "wie" && w[i + 2]) {
        const k = w[i + 2]!; const kh = KOD[asc(k)];
        if (kh ? kh !== h : !asc(k).startsWith(asc(h))) return null;
        i += 2;
      }
      ekle(h); continue;
    }
    const k = KOD[asc(x)];
    if (!k) return null;
    ekle(k);
  }
  return out.length ? out : null;
}
/** Harf harf söyleme maddesi: kabul listesinde yalnızca harflerden oluşan bir biçim ("B, R, A, N, D, L") varsa hedef odur */
export function heceHedef(kabul: string[]): string[] | null {
  const h = kabul.find((a) => /^\s*\p{L}{1,2}(\s*,\s*(Doppel-)?\p{L}{1,2})+\s*\.?\s*$/u.test(a) && a.split(",").length >= 3);
  return h ? harfler(h) : null;
}
/** ä/ö/ü/ß, ae/oe/ue/ss olarak harf harf de söylenebilir (M, U, E, L, L, E, R) */
const harfAsc = (h: string[]) => h.map((x) => asc(x)).join("");
/** "Mein Name ist M, Ü, …", "Ich buchstabiere: …" gibi giriş cümlesi atlanır */
const GIRIS = /^.*?\b(ist|buchstabiere|buchstabiert|schreibt man|schreibe|also)\b[\s:,]*/i;
export function heceEsit(kabul: string[], cevap: string): boolean {
  const hedef = heceHedef(kabul);
  if (!hedef) return false;
  const c = harfler(cevap) ?? (GIRIS.test(cevap) ? harfler(cevap.replace(GIRIS, "")) : null);
  return !!c && harfAsc(c) === harfAsc(hedef);
}

/* ───────────── kelime sırası (V2) ───────────── */
/**
 * İnceleme #76 P0: fiilin yeri tahminle bulunamaz. Kural yalnızca öznenin şahıs zamiri olduğu cümlelerde çalışır:
 * zamir + küçük harfli kelime (Ich gehe…) ya da öğe + küçük harfli kelime + zamir (Morgen gehe ich…) — çekimli fiil
 * zamirin hemen yanındadır. Başa alınan öğe bir öbek olmalıdır: tek içerik kelimesi ya da işlev kelimesiyle başlayıp
 * tek büyük harfli isimle (ya da sayıyla) biten 2–4 kelime (am Dienstag, ins Kino, keine Zeit, um neun Uhr).
 */
const ISLEV = new Set("der die das den dem des ein eine einen einem einer eines mein meine meinen meinem meiner dein deine deinen deinem sein seine seinen seinem ihr ihre ihren ihrem unser unsere unseren euer eure kein keine keinen keinem keiner in im ins an am ans auf aufs aus bei beim mit nach von vom zu zum zur fuer um fuers ueber unter vor vors ums durchs hinter neben zwischen durch gegen ohne bis seit ab sehr".split(" "));
const AYIRAN = new Set("an auf aus ein mit zu ab vor zurueck weg los fern nach her hin".split(" "));
const ZAMIR = new Set("ich du er sie es wir ihr man".split(" "));
/** Tek kelime olarak başa alınabilen zarflar (zaman, yer, sıklık, tutum); sıfat, derece kelimesi ve dönüşlü zamir alınmaz (inceleme #76 2. tur K1) */
const ZARF = new Set("heute morgen gestern uebermorgen vorgestern jetzt dann bald spaeter frueher gleich sofort nachher vorher abends morgens mittags nachmittags vormittags nachts montags dienstags mittwochs donnerstags freitags samstags sonntags hier da dort zuhause draussen drinnen gern gerne leider vielleicht natuerlich oft manchmal selten taeglich".split(" "));
const DERECE = new Set("so ganz gar genau richtig etwas viel wenig mehr als wie total ziemlich immer sehr zu besonders echt wirklich".split(" "));
const SEIN = new Set("bin bist ist sind seid war warst waren wart".split(" "));
const BELIRSIZ = new Set("sie es ihr".split(" "));
/** Nesne zamirleri: orta alanda öbeklerden önce gelir (Hier tut es mir weh → Es tut mir hier weh) */
const NESNE_ZAMIR = new Set("mir dir ihm uns euch ihnen mich dich sich ihn es sie".split(" "));
/** Dizinin başındaki nesne zamirlerini ayırır */
const zamirOnce = (x: string[]) => { let i = 0; while (i < x.length && (NESNE_ZAMIR.has(x[i]!) || (x[i] === "das" && (i === x.length - 1 || !/^[a-z]/.test(x[i + 1]!) || NESNE_ZAMIR.has(x[i + 1]!))))) i++; return [x.slice(0, i), x.slice(i)] as const; };
const EDAT = new Set("in im ins an am ans auf aufs aus bei beim mit nach von vom zu zum zur fuer um ueber unter vor hinter neben zwischen durch gegen ohne bis seit ab".split(" "));
const ARTIKEL = new Set("der die das den dem des ein eine einen einem einer eines kein keine keinen keinem keiner mein meine meinen meinem dein deine sein seine ihre ihren unser unsere".split(" "));
/** Başa alınamayan kelimeler (kip ilgeçleri, olumsuzluk) ve cümle dışında durabilen ünlemler */
const PARTIKEL = new Set("ja doch mal halt eben denn wohl nicht nur noch auch erst".split(" "));
/** Kip ve yardımcı fiiller: sondaki mastar tek başına başa alınmaz ("machen möchte ich einen Termin" değil) */
const MODAL = new Set("moechte moechtest moechten kann kannst koennen muss musst muessen will willst wollen darf darfst duerfen soll sollst sollen haette haettest haetten wuerde wuerdest wuerden werde wirst wird".split(" "));
const SOYLEM = new Set("ja nein also doch gut okay ok naja ach oh so tja hm bitte danke na".split(" "));
const BAGLAC = /\b(und|oder|aber|denn|sondern|dass|weil|wenn|ob)\b/;
const SAYISAL = (w: string) => SAYI.has(w) || /^o\d+/.test(w);

function bicimler(a: string[], ham: string[]): { v2: Set<string>; v3: Set<string> } {
  const v2 = new Set<string>(), v3 = new Set<string>();
  const buyuk = (i: number) => /^\p{Lu}/u.test(ham[i]!);
  const fiil = (i: number) => i > 0 && i < a.length && /^\p{Ll}/u.test(ham[i]!) && !ISLEV.has(a[i]!) && !ZAMIR.has(a[i]!) && !["beide", "selbst", "auch", "alle"].includes(a[i]!);
  /** isim öbeği mi (edatla başlamayan, büyük harfli isim içeren): sie/es öznesiyle başa alınınca özne/nesne karışabilir */
  const isimObegi = (S: string[], s: number) => !EDAT.has(S[0]!) && S.some((w, k) => buyuk(s + k) && !ZAMIR.has(w) && !(s + k === 0 && (ZARF.has(w) || SAYISAL(w))));
  /** a[s..e) bir öbek mi (s > 0 iken önceki kelime işlev kelimesi olmamalı: öbeği bölmez) */
  const obek = (s: number, e: number, v = -1) => {
    const S = a.slice(s, e);
    if (!S.length || S.length > 4 || (s > 0 && ISLEV.has(a[s - 1]!)) || S.some((w) => ZAMIR.has(w))) return false;
    // sayı/saat öbeği bölünmez: "drei viertel elf", "neun Uhr", "halb zehn" (inceleme #76 permütasyon taraması)
    const zaman = (w?: string) => !!w && (SAYISAL(w) || w === "uhr" || w === "viertel" || w === "dreiviertel" || w === "halb");
    if ((zaman(a[s - 1]) && zaman(S[0])) || (zaman(a[e]) && zaman(S[S.length - 1]))) return false;
    // sayı + isim (vierzig Jahre, den dritten Mai) ve isim + sayı (Nummer einundneunzig, Brunnengasse sieben) bölünmez
    // sayı ve isim hangi yönde olursa olsun bitişik bölünmez: "die Nummer | vierzehn", "achtundsiebzig | Kilogramm"
    const isim = (i: number) => i >= 0 && i < a.length && buyuk(i) && !ZAMIR.has(a[i]!) && !ISLEV.has(a[i]!);
    const sayi = (i: number) => i >= 0 && i < a.length && SAYISAL(a[i]!);
    if ((sayi(e - 1) && isim(e)) || (isim(e - 1) && sayi(e)) || (sayi(s) && isim(s - 1)) || (isim(s) && sayi(s - 1))) return false;
    // ölçü öbeği: "dreißig Jahre | alt"
    if (s >= 2 && isim(s - 1) && sayi(s - 2)) return false;
    if (S.length === 1) {
      const w = S[0]!;
      if (ISLEV.has(w) || PARTIKEL.has(w) || DERECE.has(w) || (e === a.length && AYIRAN.has(w))) return false;
      if (s > 0 && DERECE.has(a[s - 1]!)) return false;                       // immer | schlimmer, etwas | besser
      if (ZARF.has(w) || SAYISAL(w)) return true;
      // büyük harfli isim: önünde onu niteleyen küçük harfli kelime yoksa (starke | Schmerzen değil)
      if (buyuk(s)) {
        const p = a[s - 1];
        // önündeki sıfat, derece ya da odak kelimesi (nur Montag, starke Schmerzen) öbeğin parçasıdır
        const niteleyen = s > 0 && s - 1 !== v && !!p && /^\p{Ll}/u.test(ham[s - 1]!) && !ZARF.has(p) && !ZAMIR.has(p) && (DERECE.has(p) || ["nur", "erst", "sogar"].includes(p) || /(e|en|er|es|em)$/.test(p));
        return !niteleyen;
      }
      // küçük harfli: yalnızca sein ile cümle sonundaki yüklem (Müde bin ich) ya da kip fiiliyle sondaki mastar (Kommen kann ich morgen)
      const V = a[v] ?? "";
      if (e === a.length && SEIN.has(V) && !/^ge\p{L}+(t|en)$/u.test(w)) return true;   // ortaç değil (geworden ist es… değil)
      if (e === a.length && MODAL.has(V) && !a.some((x) => ARTIKEL.has(x))) return true;   // nesne öbeği kalmıyorsa
      return false;
    }
    if (!ISLEV.has(S[0]!) && !SAYISAL(S[0]!)) return false;   // am Dienstag, ins Kino, neun Uhr, zwei Kinder
    const son = e - 1;
    if (!(buyuk(son) || SAYISAL(a[son]!))) return false;
    // ortadakiler işlev kelimesi ya da küçük harfli sıfat; tek isim sonda
    for (let i = s + 1; i < son; i++) {
      if (ISLEV.has(a[i]!) || SAYISAL(a[i]!)) continue;
      // ortadaki küçük harfli kelime sıfat gibi olmalı (seit gestern | Bauchschmerzen iki öğedir)
      if (buyuk(i) || !/(e|en|er|es|em)$/.test(a[i]!) || ZARF.has(a[i]!)) return false;
    }
    return true;
  };
  /** post (a[from..]) içindeki öbekler: [başlangıç, bitiş) */
  const obekler = (from: number, v: number) => { const o: [number, number][] = []; for (let s = from; s < a.length; s++) for (let e = s + 1; e <= Math.min(a.length, s + 4); e++) if (obek(s, e, v)) o.push([s, e]); return o; };
  const ekle = (set: Set<string>, ...parca: string[][]) => set.add(parca.flat().join(" "));
  // Durum 1: Zamir + fiil + … (Ich gehe morgen ins Kino.)
  if (ZAMIR.has(a[0]!) && fiil(1) && a.length >= 3) {
    const P = [a[0]!], V = [a[1]!];
    for (const [s, e] of obekler(2, 1)) {
      if (MODAL.has(a[1]!) && e === a.length && e - s === 1 && a.length > 4) continue;
      // "Es frisst das Kind" → "Das Kind frisst es" anlam döner: sie/es öznesinde isim öbeği yalnızca sein/geben ile başa alınır
      if (BELIRSIZ.has(a[0]!) && isimObegi(a.slice(s, e), s) && !SEIN.has(a[1]!) && a[1] !== "gibt") continue;
      const S = a.slice(s, e), rest = [...a.slice(2, s), ...a.slice(e)];
      if (rest.length && ISLEV.has(rest[rest.length - 1]!)) continue;
      ekle(v2, S, V, P, rest);                                         // Morgen gehe ich ins Kino. / Ins Kino gehe ich morgen.
      if (!SOYLEM.has(S[0]!)) ekle(v3, S, P, V, rest);                  // Morgen ich gehe ins Kino.
    }
  }
  // Durum 2: Öğe + fiil + zamir + … (Heute habe ich keine Zeit.)
  for (let j = 2; j <= Math.min(4, a.length - 1); j++) {
    if (!ZAMIR.has(a[j]!) || !fiil(j - 1) || !obek(0, j - 1, j - 1) || SOYLEM.has(a[0]!)) continue;
    // "Peter liebt sie": sie/es nesne olabilir; başta isim öbeği varken (sein/geben dışında) kural uygulanmaz
    if (BELIRSIZ.has(a[j]!) && isimObegi(a.slice(0, j - 1), 0) && !SEIN.has(a[j - 1]!) && a[j - 1] !== "gibt") continue;
    const X = a.slice(0, j - 1), V = [a[j - 1]!], P = [a[j]!], post = a.slice(j + 1), X0 = X[0]!;
    // başa alınmış mastar kip fiiliyle geri dönünce cümle sonuna gider (Kommen kann ich morgen nicht → Ich kann morgen nicht kommen)
    // mastar: kip fiili + -en ile biten tek kelime başta ve cümlenin sonunda başka mastar yok ("Morgen kann ich nicht kommen" değil)
    const sonMastar = post.length > 0 && /(en|ern|eln)$/.test(post[post.length - 1]!);
    const mastar = MODAL.has(V[0]!) && X.length === 1 && !SAYISAL(X[0]!) && /(en|ern|eln)$/.test(X[0]!) && !sonMastar;
    const [pz, pk] = zamirOnce(post);
    if (mastar) ekle(v2, P, V, post, X); else ekle(v2, P, V, pz, X, pk);   // Ich habe heute keine Zeit. / Es tut mir hier weh.
    for (const [s, e] of obekler(j + 1, j - 1)) {
      // nesne başta kalırken sondaki mastar başa alınmaz ("Einen Termin möchte ich machen" → "Machen möchte ich einen Termin" değil)
      if (MODAL.has(a[j - 1]!) && e === a.length && e - s === 1 && (a.length - j > 2 || ARTIKEL.has(X0))) continue;
      const S = a.slice(s, e), rest = [...a.slice(j + 1, s), ...a.slice(e)];
      if (rest.length && ISLEV.has(rest[rest.length - 1]!)) continue;
      const [rz, rk] = zamirOnce(rest);
      if (mastar) ekle(v2, S, V, P, rest, X); else ekle(v2, S, V, P, rz, X, rk);   // Keine Zeit habe ich heute. / Bescheid sage ich Ihnen bis Mittwoch.
    }
    if (!SOYLEM.has(X[0]!)) ekle(v3, X, P, V, post);                    // Heute ich habe keine Zeit.
    break;
  }
  return { v2, v3 };
}
/**
 * Kabul cümlesiyle aynı kelimeler, başka bir öğe başta ve çekimli fiil yine ikinci yerde → doğru;
 * fiil üçüncü yere düşmüş (Türkçe/İngilizce sırası) → açıklamalı yanlış. Soru, emir, yan cümle ve bağlaçlı cümlede denenmez.
 */
export function v2Sira(kabul: string[], cevap: string): { kind: "correct"; best: string } | { kind: "v3"; best: string } | null {
  if (/\?\s*$/.test(cevap)) return null;
  const c = esNorm(cevap);
  let v3: string | null = null;
  for (const k of kabul) {
    if (/[?!]\s*$/.test(k) || /[?!,;:]|\.\s/.test(k.replace(/[.!]\s*$/, ""))) continue;
    const w = esNorm(k).split(" ").filter(Boolean);
    const ham = k.replace(/[.!…]+\s*$/, "").split(/\s+/).map((x) => x.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")).filter(Boolean);
    if (w.length < 3 || ham.length !== w.length || BAGLAC.test(w.join(" "))) continue;
    if ([...w].sort().join(" ") !== c.split(" ").sort().join(" ")) continue;
    const { v2, v3: y } = bicimler(w, ham);
    if (v2.has(c)) return { kind: "correct", best: k };
    if (!v3 && y.has(c)) v3 = k;
  }
  return v3 ? { kind: "v3", best: v3 } : null;
}

/* ───────────── yazım notu ───────────── */
const sade = (w: string) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
const umlautsuz = (w: string) => w.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/Ä/g, "A").replace(/Ö/g, "O").replace(/Ü/g, "U").replace(/ß/g, "s");
const KIBAR = new Set(["Sie", "Ihnen", "Ihr", "Ihre", "Ihren", "Ihrem", "Ihrer", "Ihres"]);
/**
 * Doğru sayılan cevapta yazım farkı: büyük harf ve ae/oe/ue/ss yerine ä/ö/ü/ß. Kibar hitap (Sie, Ihnen) ve cümle başı
 * ayrı söylenir; diğer büyük harfler isimdir (inceleme #76 P2).
 */
export function yazimNotu(best: string, cevap: string): string | undefined {
  const b = best.split(/\s+/).map(sade).filter(Boolean), c = cevap.split(/\s+/).map(sade).filter(Boolean);
  if (b.length !== c.length) return undefined;
  const isim: string[] = [], kibar: string[] = [], umlaut: string[] = [];
  b.forEach((x, i) => {
    const y = c[i]!;
    if (x === y) return;
    if (x.toLowerCase() === y.toLowerCase() && /^\p{Lu}/u.test(x) && /^\p{Ll}/u.test(y)) {
      if (KIBAR.has(x)) kibar.push(x); else if (i > 0 && !/[.!?]$/.test(best.split(/\s+/)[i - 1] ?? "")) isim.push(x);
      return;
    }
    const xl = x.toLowerCase(), yl = y.toLowerCase();
    if (xl !== yl && (asc(xl) === yl || asc(xl) === asc(yl))) umlaut.push(x);
  });
  const p: string[] = [];
  if (umlaut.length) p.push(`Yazımı: ${umlaut.join(", ")}`);
  if (isim.length) p.push(`İsimler büyük harfle başlar: ${isim.join(", ")}`);
  if (kibar.length) p.push(`Kibar hitap büyük harfle yazılır: ${kibar.join(", ")}`);
  return p.length ? p.join(" · ") : undefined;
}
/**
 * Ümlautu (ya da ß'yi) unutulmuş cevap: kabul biçiminin ümlautsuz hâliyle aynıysa düzeltme notu döner, cevap DOĞRU SAYILMAZ.
 * Ümlautsuz biçim çoğu zaman başka bir kelimedir (schon/schön, fahrt/fährt, alter/älter; inceleme #76 P1-5) ve bunu
 * listeyle bilmek mümkün değil; öğrenci notu görür, yazımı öğrenir.
 */
export function umlautEksik(kabul: string, cevap: string): string | undefined {
  const k = kabul.split(/\s+/).map(sade).filter(Boolean), c = cevap.split(/\s+/).map(sade).filter(Boolean);
  if (k.length !== c.length) return undefined;
  const eksik: string[] = [];
  for (let i = 0; i < k.length; i++) {
    const x = k[i]!, y = c[i]!;
    if (esNorm(x) === esNorm(y)) continue;
    if (umlautsuz(x).toLowerCase() === umlautsuz(y).toLowerCase() && /[äöüßÄÖÜ]/.test(x)) eksik.push(x); else return undefined;
  }
  return eksik.length ? `Ümlaut/ß eksik: ${eksik.join(", ")} (ä, ö, ü, ß yazamıyorsan ae, oe, ue, ss yaz)` : undefined;
}
