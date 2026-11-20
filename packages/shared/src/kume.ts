/**
 * Bilinen küme K(t) ve cümle kapısı (AKIS.md AK-3; PM-078 C; PM #160 7043401257). Saf: dosya okumaz, ekran bilmez.
 * Doğrulayıcı (content/tools) ve planlayıcı (web/src/core/akis.ts, AK-10 2. adım) aynı sayacı kullanır.
 * Kurallar İÇ'in ölçüm betiğiyle (docs/v2/reviews/c-olcum/olcum.py, #161/#163) aynıdır; ayrımlar burada yazılı:
 *  - Kelime → kart: kartın başlığı ve çoğulu (tanıtımda GÖSTERİLEN biçim; artikel eşlenmez) + boşluk cevapları ve fiil
 *    çekimleri (yalnız başlıkla akrabaysa ya da tek sözcüklü fiil cevabıysa; birden çok kartta en çok geçtiği karta).
 *  - Kart tanıtılınca yalnız gösterilen biçimi bilinir; öteki çekimler (gehe, gehst) ancak bir dersin öğrettiği biçimle.
 *  - Kendi kartı olan sözcük yalnız KENDİ kartı tanıtıldıysa bilinir (başka kartın cevabında geçmesi yetmez).
 *  - Çerçeve sözcüğü (card:false) bilinir; ama aynı başlıkta henüz tanıtılmamış gerçek kart varsa (eşadlı: "ja") bilinmez.
 *  - Kalıp bütün olarak bilinir: biten dersin çok sözcüklü `teach` kalıbı cümlede aynen geçerse o sözcükler bilinir;
 *    kalıbın içindeki, kendi kartı bu derste öğretilmeyen sözcük ("hier ist {name}" → "hier") tek başına bilinmez.
 *  - Eşlenemeyen sözcük tahmin edilmez: listelenir ve bilinmez sayılır.
 */
import type { Lexeme, TemelDers, World } from "./index.ts";

const HARF = "A-Za-zÄÖÜäöüßıİşŞğĞçÇéè";
const TOK = new RegExp(`[${HARF}]+(?:-[${HARF}]+)*|\\d+`, "g");
/** Cümleyi küçük harfli sözcüklere böler; yer tutucular ({name}, {Herr|Frau}) sayılmaz */
export const toks = (s: string | undefined): string[] => (String(s ?? "").replace(/\{[^}]*\}/g, " ").match(TOK) ?? []).map((t) => t.toLowerCase());
const umlautsuz = (x: string) => x.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "s");

/**
 * `card:false` kartların çekimleri. Sözlükte `bicimler` alanı olan kart onu kullanır; olmayanlar için bu kapalı liste
 * (İÇ'in ölçümüyle aynı; tahmin değil). Sözlük `bicimler`i doldurdukça buradaki satır gereksizleşir.
 */
export const CERCEVE_CEKIM: Record<string, string> = {
  "lx:der": "der die das den dem des", "lx:ein": "ein eine einen einem einer eines",
  "lx:kein": "kein keine keinen keinem keiner keines", "lx:ich": "ich mich mir", "lx:du": "du dich dir",
  "lx:er": "er ihn ihm", "lx:sie": "sie ihr ihnen", "lx:es": "es", "lx:wir": "wir uns", "lx:ihr": "ihr euch",
  "lx:mein": "mein meine meinen meinem meiner meines", "lx:dein": "dein deine deinen deinem deiner deines",
  "lx:sein#2": "sein seine seinen seinem seiner seines", "lx:ihr#2": "ihr ihre ihren ihrem ihrer ihres",
  "lx:unser": "unser unsere unseren unserem unserer", "lx:euer": "euer eure euren eurem eurer"
};

const BIR = "ein zwei drei vier fünf sechs sieben acht neun".split(" ");
const ON = "zwanzig dreißig vierzig fünfzig sechzig siebzig achtzig neunzig".split(" ");
const BILESIK = new RegExp(`^(${BIR.join("|")})und(${ON.join("|")})$`);
const TABAN = new Set([..."null eins zwei zwo drei vier fünf sechs sieben acht neun zehn elf zwölf dreizehn vierzehn fünfzehn sechzehn siebzehn achtzehn neunzehn zwanzig".split(" "), ...ON, "hundert", "einhundert"]);
const SAYI_DERS = "r0:04-zahlen-21-100", TARIH_DERS = "r0:06-datum";
/** Bileşik sayı (r0:04 bitince) ve sıra sayısı (r0:06 bitince) */
function sayiMi(t: string, biten: ReadonlySet<string>): boolean {
  if (biten.has(SAYI_DERS) && (BILESIK.test(t) || ON.includes(t) || t === "hundert" || t === "einhundert")) return true;
  if (biten.has(TARIH_DERS)) for (const ek of ["sten", "ste", "ten", "te", "stem", "tem", "ster", "ter"]) {
    if (!t.endsWith(ek)) continue;
    const k = t.slice(0, -ek.length);
    if (TABAN.has(k) || BILESIK.test(k) || ["ers", "drit", "sieb", "ach", "zwanzig", "dreißig"].includes(k) || TABAN.has(`${k}en`)) return true;
  }
  return false;
}

export interface KumeDizini {
  /** sözcük → aday kartlar */
  idx: Map<string, Set<string>>;
  /** kart → tanıtımda gösterilen sözcükler (başlık + çoğul) */
  gost: Map<string, Set<string>>;
  /** kart → bütün yüzey biçimleri (başlık, çoğul, akraba cevaplar, çekimler) */
  yuzey: Map<string, Set<string>>;
  cerceve: Set<string>;
  adlar: Set<string>;
  /** ders → öğrettiği biçimler, bağladığı kartlar ve çok sözcüklü kalıpları */
  dersler: Map<string, { bicim: Set<string>; kart: Set<string>; kaliplar: string[][] }>;
  kartlar: Map<string, Lexeme>;
}

/** Sözlük, temel dersler ve dünyadan sayaç dizinini kurar (bir kez; sonra her cümle için `bilinmeyenler`) */
export function kumeDizini(lex: readonly Lexeme[], temel: readonly TemelDers[], world?: World | null, genelAdlar: readonly string[] = []): KumeDizini {
  const kartlar = new Map(lex.map((l) => [l.id, l] as const));
  const idx = new Map<string, Set<string>>(), gost = new Map<string, Set<string>>(), yuzey = new Map<string, Set<string>>();
  const ekle = <K, V>(m: Map<K, Set<V>>, k: K, v: V) => { let s = m.get(k); if (!s) m.set(k, (s = new Set())); s.add(v); };
  // 1. geçiş: başlık ve çoğul (artikel eşlenmez)
  for (const l of lex) for (const b of [l.de, l.pl ?? ""]) for (const x of toks(b)) { ekle(yuzey, l.id, x); ekle(gost, l.id, x); ekle(idx, x, l.id); }
  // 2. geçiş: boşluk cevapları ve fiil çekimleri; birden çok kartta en çok geçtiği karta (eşitlikte hepsine)
  const sayac = new Map<string, Map<string, number>>();
  for (const l of lex) {
    const bas = umlautsuz(toks(l.de).join(" "));
    const v = (l.verb ?? {}) as Record<string, unknown>;
    const cevaplar = [...l.forms.map((f) => f.answer), ...Object.entries(v).filter(([k, x]) => typeof x === "string" && k !== "aux").map(([, x]) => x as string)];
    for (const a of cevaplar) {
      const at = toks(a.replace(/…/g, " "));
      for (const x of at) {
        const serbest = l.pos === "verb" && at.length === 1;
        if (!serbest && !yuzey.get(l.id)?.has(x) && !bas.includes(umlautsuz(x).slice(0, 3))) continue;
        let m = sayac.get(x); if (!m) sayac.set(x, (m = new Map())); m.set(l.id, (m.get(l.id) ?? 0) + 1);
      }
    }
  }
  for (const [x, m] of sayac) { const en = Math.max(...m.values()); for (const [id, n] of m) if (n === en) { ekle(yuzey, id, x); ekle(idx, x, id); } }
  const cerceve = new Set(lex.filter((l) => l.card === false).map((l) => l.id));
  for (const l of lex) {
    if (!cerceve.has(l.id)) continue;
    const bicim = (l as { bicimler?: string[] }).bicimler ?? (CERCEVE_CEKIM[l.id] ?? "").split(" ").filter(Boolean);
    for (const t of bicim) ekle(idx, t.toLowerCase(), l.id);
  }
  // adlar: karakterler, yer adlarının özel ad bölümü (kartı olan cins ad değil), kasaba ve mahalle, genel adlar
  const basliklar = new Set(lex.flatMap((l) => [...toks(l.de), ...toks(l.pl)]));
  const adlar = new Set<string>(genelAdlar.flatMap((a) => toks(a)));
  if (world) {
    for (const ch of world.characters as unknown as Record<string, unknown>[]) for (const k of ["name", "short", "first", "last", "de"]) if (typeof ch[k] === "string") for (const t of toks(ch[k] as string)) adlar.add(t);
    for (const p of world.town.places) for (const t of toks(p.name)) if (!basliklar.has(t)) adlar.add(t);
    for (const t of [...toks(world.town.name), ...toks(world.town.neighbourhood)]) adlar.add(t);
  }
  const d: KumeDizini = { idx, gost, yuzey, cerceve, adlar, dersler: new Map(), kartlar };
  for (const t of temel) d.dersler.set(t.id, dersBicimi(d, t));
  return d;
}

/** Sözcüğü başlık olarak taşıyan, fiil olmayan gerçek (card:true) kartlar: "ja" → lx:ja, "hier" → lx:hier */
function baslikKarti(d: KumeDizini, t: string): Set<string> {
  const out = new Set<string>();
  for (const i of d.idx.get(t) ?? []) { const l = d.kartlar.get(i); if (l && !d.cerceve.has(i) && l.pos !== "verb" && toks(l.de).length === 1 && toks(l.de)[0] === t) out.add(i); }
  return out;
}

/** Bir temel dersin öğrettikleri: `teach` sözcükleri (kalıptaki, kendi kartı bu derste öğretilmeyen sözcük hariç), tablo hücreleri (Türkçe sütun hariç) */
function dersBicimi(d: KumeDizini, t: TemelDers): { bicim: Set<string>; kart: Set<string>; kaliplar: string[][] } {
  const kart = new Set(t.teach.map((x) => x.lexeme).filter((x): x is string => !!x));
  const bicim = new Set<string>(); const kaliplar: string[][] = [];
  for (const x of t.teach) {
    const tt = toks(x.de);
    if (tt.length > 1) kaliplar.push(tt);
    for (const s of tt) if (tt.length === 1 || [...baslikKarti(d, s)].every((k) => kart.has(k))) bicim.add(s);
  }
  for (const row of t.table?.satirlar ?? []) row.forEach((cell, j) => { if (j !== 1) for (const s of toks(cell)) bicim.add(s); });
  return { bicim, kart, kaliplar };
}

/** O an bilinenler: tanıtılmış kartlar, biten dersler (biçimleri ve bağladıkları kartlarla) */
export interface Bilinen { kart: ReadonlySet<string>; biten: ReadonlySet<string> }
export type Bilinmeyen = { tur: "kart" | "bicim" | "eslenemedi"; sozcuk: string; adaylar?: string[] };

/** Cümlede K(t) dışında kalan sözcükler. `haric`: boşluğun cevabı gibi sayılmayacak sözcükler */
export function bilinmeyenler(d: KumeDizini, cumle: string, k: Bilinen, haric: Iterable<string> = []): Bilinmeyen[] {
  const tt = toks(cumle); const har = new Set(haric);
  const kart = new Set(k.kart); const bicim = new Set<string>();
  for (const id of k.biten) { const b = d.dersler.get(id); if (b) { for (const s of b.bicim) bicim.add(s); for (const x of b.kart) kart.add(x); } }
  // biten derslerin kalıpları cümlede aynen geçiyorsa o sözcükler bilinir
  const ortu = new Set<number>();
  for (const id of k.biten) for (const kp of d.dersler.get(id)?.kaliplar ?? []) for (let j = 0; j + kp.length <= tt.length; j++) if (kp.every((s, i) => tt[j + i] === s)) for (let i = 0; i < kp.length; i++) ortu.add(j + i);
  const out: Bilinmeyen[] = [];
  tt.forEach((t, j) => {
    if (ortu.has(j) || har.has(t) || /^\d+$/.test(t) || d.adlar.has(t) || bicim.has(t) || sayiMi(t, k.biten)) return;
    const aday = d.idx.get(t);
    if (!aday?.size) { out.push({ tur: "eslenemedi", sozcuk: t }); return; }
    const bilinenAday = [...aday].filter((i) => kart.has(i));
    if (bilinenAday.some((i) => d.gost.get(i)?.has(t))) return;
    if ([...aday].some((i) => d.cerceve.has(i)) && [...baslikKarti(d, t)].every((i) => kart.has(i))) return;
    if (bilinenAday.length) out.push({ tur: "bicim", sozcuk: t, adaylar: bilinenAday.sort() });
    else out.push({ tur: "kart", sozcuk: t, adaylar: [...aday].sort() });
  });
  return out;
}

/** Rapor için kısa gösterim: kart eksik "x", biçim eksik "~x", eşlenemeyen "?x" */
export const bilinmeyenYazi = (u: Bilinmeyen[]) => u.map((x) => (x.tur === "kart" ? "" : x.tur === "bicim" ? "~" : "?") + x.sozcuk);
