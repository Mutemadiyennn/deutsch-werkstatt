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
 * İnceleme #168 1. tur sonrası (AK-3 metnine uyum):
 *  - Harf büyüklüğü korunur: cümle ortasında "morgen" yalnız "morgen" gösteren kartla, "Morgen" yalnız "Morgen" gösterenle bilinir.
 *    Cümle başında küçük harfli okunuş önceliklidir: "Morgen …" orada "morgen" gösteren kart (varsa) bilinmeli.
 *  - Çok sözcüklü kart başlığı ("wie viel", "recht haben") yalnız BÜTÜN olarak bilinir; parçaları tek tek bilinmez.
 *  - Kalıp (dersin çok sözcüklü `teach`'i, halkanın `kaliplar`ı): KARTSIZ çerçeve sözcükleri (ist, war, geht, guten) ders/halka
 *    bitince tek tek TANINIR (AK-3 istisnası, PM-080 §4); kendi kartı olan sözcük yalnız kendi kartıyla. Yalnız anlama içindir:
 *    üretimde K5 (≥ 2 görme), Türkçesinde K10 (ilk iki görme) planlayıcıda aynen işler; başka anlamdaki kullanımı yazar işaretler.
 *  - Ders tablosu ve tek sözcüklü `teach`: sözcüğü gösteren kendi kartı varsa o kart bu derse bağlı olmalı; kartı olmayan biçim
 *    (bin, habe, kann) dersle bilinir. Türkçe sütun ayırt edilmez: eşlenmeyen sözcük zaten eklenmez.
 *  - Dil noktası tablosu (`gr:`, `dn:`; PM-092 md. 1) temel ders tablosundan SIKIDIR: biçim ancak bağlı kartı (sütun başlığı
 *    ya da dizin adayı) tanıtılınca bilinir; temel derste kartsız biçim (bin, habe) kart tanıtılmadan da bilinir (#205 P2-5).
 *  - Yer tutucu: {name} sayılmaz; {a|b} iki seçeneğiyle sayılır ({Herr|Frau}, {Patient|Patientin}).
 *  - Adlar yalnız büyük harfle başlayan ve hiçbir kartın başlığı olmayan sözcüklerdir; yer adlarından yalnız kişi ya da kasaba adıyla
 *    ortak olanlar (Bäckerei Stadler → Stadler; "Sprachkurs" ad değil).
 */
import type { Lexeme, TemelDers, World } from "./index.ts";

const HARF = "A-Za-zÄÖÜäöüßıİşŞğĞçÇéè";
const TOK = new RegExp(`[${HARF}]+(?:-[${HARF}]+)*|\\d+`, "g");
/** Yer tutucular: {name} sayılmaz; {a|b} iki seçeneğiyle sayılır */
const AD_YERI = "Adyeriqqq";
const yerTutucu = (s: string | undefined, ad = " ") => String(s ?? "").replace(/\{name\}/gi, ad).replace(/\{([^}]*)\}/g, (_, x: string) => ` ${x.replace(/\|/g, " ")} `);
/** Cümleyi küçük harfli sözcüklere böler ({name} sayılmaz; {a|b} → a b) */
export const toks = (s: string | undefined): string[] => (yerTutucu(s).match(TOK) ?? []).map((t) => t.toLowerCase());
/** Özgün harfli sözcükler ve cümle başı bilgisi (harf büyüklüğü cümle başında ayırt edici değildir) */
export function toksAsil(s: string | undefined): { t: string; o: string; bas: boolean }[] {
  // {name} kalıp yuvasını doldurabilsin diye "ad yeri" sözcüğü olarak kalır (YUVA_AD; her zaman bilinir)
  const x = yerTutucu(s, ` ${AD_YERI} `); const out: { t: string; o: string; bas: boolean }[] = [];
  for (const m of x.matchAll(TOK)) { const once = x.slice(0, m.index).trimEnd(); const ad = m[0] === AD_YERI; out.push({ t: ad ? YUVA_AD : m[0].toLowerCase(), o: ad ? YUVA_AD : m[0], bas: !once || /[.!?…:„“"»«(–—]$/.test(once) }); }
  return out;
}
/** Kalıp ve çok sözcüklü başlık sözcükleri: "…" ve {…} yuva (YUVA); başlıktaki "(…)" açıklaması ve "/r" eki atılır */
export const YUVA = "\u0000";
/** Cümledeki {name}: kalıp yuvasını doldurur, kendisi her zaman bilinir */
export const YUVA_AD = "\u0001";
/** Bir kalıp metnindeki seçenekler: "Heute ist … – Ist heute …?" iki ayrı kalıptır (" – " ayırır) */
export const kalipSecenekleri = (s: string | undefined): string[][] => String(s ?? "").split(/\s[–—]\s/).map(kalipToks).filter((k) => k.some((x) => x !== YUVA));
export function kalipToks(s: string | undefined): string[] {
  const x = String(s ?? "").replace(/\([^)]*\)/g, " ").replace(/\/[A-Za-zäöüß]+/g, " ").replace(/…|\.\.\.|\{[^}]*\}/g, ` ${YUVA} `);
  const out: string[] = [];
  for (const parca of x.split(YUVA).map((p, i) => [i, p] as const)) {
    if (parca[0] > 0) out.push(YUVA);
    out.push(...(parca[1].match(TOK) ?? []).map((t) => t.toLowerCase()));
  }
  while (out.length && out[0] === YUVA && out.length > 1 && out[1] === YUVA) out.shift();
  return out;
}
/** Kalıbın cümledeki bütün eşleşmelerinin kapsadığı sabit sözcük konumları (yuva en az bir sözcük alır; yuvadaki sözcük kapsanmaz) */
export function kalipOrtu(tt: readonly string[], kp: readonly string[]): number[] {
  const sabit = kp.filter((x) => x !== YUVA).length; if (!sabit) return [];
  const es = (j: number, i: number): number[] | null => {
    if (i === kp.length) return [];
    if (kp[i] === YUVA) { for (let n = 1; j + n <= tt.length; n++) { const r = es(j + n, i + 1); if (r) return r; } return null; }
    if (j < tt.length && tt[j] === kp[i]) { const r = es(j + 1, i + 1); if (r) return [j, ...r]; }
    return null;
  };
  const out = new Set<number>();
  for (let j = 0; j < tt.length; j++) for (const k of es(j, 0) ?? []) out.add(k);
  return [...out];
}
/** genel-adlar.md → ad listesi: "### " başlığı yalnız büyük harfli sözcüklerden (ve "ve") oluşuyorsa; parantez içi de öyleyse eklenir */
export function genelAdlarAyikla(md: string): string[] {
  const ad = (x: string) => { const w = x.trim().split(/\s+/).filter((y) => y && y !== "ve"); return w.length && w.every((y) => /^\p{Lu}\p{L}{2,}$/u.test(y)) ? w : null; };
  const out: string[] = [];
  for (const l of md.split("\n")) {
    if (!l.startsWith("### ")) continue;
    const m = l.slice(4).match(/^([^(]*)(?:\(([^)]*)\))?/); if (!m) continue;
    const dis = ad(m[1] ?? ""); if (!dis) continue;
    out.push(...dis); const ic = m[2] ? ad(m[2]) : null; if (ic) out.push(...ic);
  }
  return [...new Set(out)];
}
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
  /** kart → tanıtımda gösterilen sözcükler (tek sözcüklü başlık + çoğul; küçük harfli) */
  gost: Map<string, Set<string>>;
  /** kart → gösterilen sözcüklerin özgün harfli biçimi (harf büyüklüğü cümle ortasında ayırt edicidir) */
  gostAsil: Map<string, Set<string>>;
  /** kart → çok sözcüklü başlık ve çoğul kalıpları (yalnız bütün olarak bilinir) */
  coklu: Map<string, string[][]>;
  /** kart → bütün yüzey biçimleri (başlık, çoğul, akraba cevaplar, çekimler) */
  yuzey: Map<string, Set<string>>;
  cerceve: Set<string>;
  adlar: Set<string>;
  /** ders → öğrettiği biçimler, bağladığı kartlar ve çok sözcüklü kalıpları. Dil noktası (`gr:`, `dn:`) yalnız `tablo` taşır:
   *  tablosundaki çekim ve parça biçimleri → bağlı kartlar (PM-092 md. 1; `tabloBicimi`) */
  dersler: Map<string, { bicim: Set<string>; kart: Set<string>; kaliplar: string[][]; tablo?: Map<string, Set<string>> }>;
  kartlar: Map<string, Lexeme>;
}

/** Sözlük, temel dersler ve dünyadan sayaç dizinini kurar (bir kez; sonra her cümle için `bilinmeyenler`) */
/** Dil noktası durağı (registry/grammar.json `gr:` ve haftanın dn-HH.json'ı `dn:`): kume yalnız kimliğe ve tabloya bakar */
export interface DilNoktasiTablo { id: string; table?: { head?: readonly string[]; rows: readonly (readonly string[])[] } }

export function kumeDizini(lex: readonly Lexeme[], temel: readonly TemelDers[], world?: World | null, genelAdlar: readonly string[] = [], dilNoktalari: readonly DilNoktasiTablo[] = []): KumeDizini {
  const kartlar = new Map(lex.map((l) => [l.id, l] as const));
  const idx = new Map<string, Set<string>>(), gost = new Map<string, Set<string>>(), yuzey = new Map<string, Set<string>>();
  const gostAsil = new Map<string, Set<string>>(), coklu = new Map<string, string[][]>();
  const ekle = <K, V>(m: Map<K, Set<V>>, k: K, v: V) => { let s = m.get(k); if (!s) m.set(k, (s = new Set())); s.add(v); };
  const ART = new Set(["der", "die", "das"]);
  // 1. geçiş: başlık ve çoğul (artikel eşlenmez; "-" ve kısaltma çoğul değildir). Tek sözcüklü başlık gösterilen biçimdir,
  // çok sözcüklü başlık yalnız bütün olarak (kalıp gibi) bilinir; parçaları dizinde aday olarak durur (rapor için)
  for (const l of lex) for (const b of [l.de, l.pl ?? ""]) {
    const kp = kalipToks(b).filter((x, i, a) => !(ART.has(x) && i === 0 && b !== l.de && a.length > 1));
    const sade = kp.filter((x) => x !== YUVA);
    if (!sade.length || (b !== l.de && sade.every((x) => x.length < 3))) continue;
    for (const x of sade) { ekle(yuzey, l.id, x); ekle(idx, x, l.id); }
    if (sade.length === 1 && kp.length === 1) { ekle(gost, l.id, sade[0]!); for (const a of toksAsil(b)) if (a.t === sade[0]) ekle(gostAsil, l.id, a.o); }
    else { const v = coklu.get(l.id) ?? []; v.push(kp); coklu.set(l.id, v); }
  }
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
  // Sesteş isim/fiil (PM-117 A.3, inceleme #261 P1-1): sözcük bir kartın başlığı/çoğuluysa ("Frage") ve başlığı aynı kökle BAŞLAYAN
  // bir fiil de onu kendi çekimi olarak veriyorsa ("ich frage" → lx:fragen; ≥ 4 harf, ilk 3 harf başlığın başı, ayrılan ön ek değil),
  // fiil de sahip olur.
  // Öbür bütün durumlarda eski kural: en çok geçtiği kart (sahte aday — "wenn"/schneien, "melden"/Schimmel — sahibe yenilir).
  const ilk = new Map([...yuzey].map(([id, s]) => [id, new Set(s)] as const));
  const sesTes = (id: string, x: string) => {
    const l = kartlar.get(id); if (l?.pos !== "verb" || x.length < 4 || ilk.get(id)?.has(x)) return false;
    const t = umlautsuz(toks(l.de).filter((w) => w !== "sich").join("")), u = umlautsuz(x);
    // "frage"/fragen, "fahrt"/fahren: çekim; "nach"/nachfragen, "zurück"/zurückkommen: ayrılan ön ek (başlığın başı, sonrası uzun) değil
    return t.startsWith(u) ? t.length - u.length <= 2 : t.startsWith(u.slice(0, 3));
  };
  for (const [x, m] of sayac) {
    const en = Math.max(...m.values());
    const sahipVar = [...m.keys()].some((id) => ilk.get(id)?.has(x));
    for (const [id, n] of m) if (n === en || (sahipVar && sesTes(id, x))) { ekle(yuzey, id, x); ekle(idx, x, id); }
  }
  const cerceve = new Set(lex.filter((l) => l.card === false).map((l) => l.id));
  for (const l of lex) {
    if (!cerceve.has(l.id)) continue;
    const bicim = (l as { bicimler?: string[] }).bicimler ?? (CERCEVE_CEKIM[l.id] ?? "").split(" ").filter(Boolean);
    for (const t of bicim) ekle(idx, t.toLowerCase(), l.id);
  }
  // adlar: yalnız büyük harfle başlayan ve hiçbir kartın başlığı olmayan sözcükler (inceleme #168 P1-7):
  // karakterler, kasaba ve mahalle, genel adlar; yer adlarından yalnız kişi ya da kasaba adıyla ortak olanlar
  const basliklar = new Set(lex.flatMap((l) => [...toks(l.de), ...toks(l.pl)]));
  const adSoz = (s: string | undefined) => toksAsil(s).filter((a) => /^\p{Lu}/u.test(a.o) && !basliklar.has(a.t) && !idx.has(a.t)).map((a) => a.t);
  const adlar = new Set<string>(genelAdlar.flatMap((a) => adSoz(a)));
  if (world) {
    for (const ch of world.characters as unknown as Record<string, unknown>[]) for (const k of ["name", "short", "first", "last", "de"]) if (typeof ch[k] === "string") for (const t of adSoz(ch[k] as string)) adlar.add(t);
    for (const t of [...adSoz(world.town.name), ...adSoz(world.town.neighbourhood)]) adlar.add(t);
    const kisiKasaba = new Set(adlar);
    // yer adından: kişi/kasaba adıyla ortak sözcük ya da sokak adı (…gasse, …straße, …allee: özel addır); cins ad (Sprachkurs, Stadtplatz) değil
    for (const p of world.town.places) for (const t of adSoz(p.name)) if (kisiKasaba.has(t) || /(gasse|straße|strasse|allee)$/.test(t)) adlar.add(t);
  }
  const d: KumeDizini = { idx, gost, gostAsil, coklu, yuzey, cerceve, adlar, dersler: new Map(), kartlar };
  for (const t of temel) d.dersler.set(t.id, dersBicimi(d, t));
  for (const n of dilNoktalari) if (!d.dersler.has(n.id)) d.dersler.set(n.id, { bicim: new Set(), kart: new Set(), kaliplar: [], tablo: tabloBicimi(d, n) });
  return d;
}

/**
 * Dil noktasının tablo biçimleri (PM-092 md. 1: "sunulan dil noktasının tablo biçimleri o andan itibaren bilinen biçim";
 * PM 7088563328 md. 1: tablodaki bütün biçimler o andan itibaren gösterilmiş). Biçim → bağlı kartlar:
 *  - dizinde olan biçim yalnız dizindeki adaylarına bağlanır (gehst → lx:gehen);
 *  - dizinde olmayan biçim, sütun başlığı tek sözcük ve onu gösteren tek gerçek fiil kartıysa (sein, haben, sprechen) o karta
 *    bağlanır (seid, habt, sprecht: sütun kartı söyler, tahmin yok; #205 P1-1, 2. tur P1-1b); başka başlık bağ vermez.
 * Başlık sözcüğü (gehen, Arzt: bir gerçek kartın gösterdiği sözcük) tablo yüzünden bilinmez: kart tanıtılmadan sözcük bilinmez.
 * Biçim de ancak bağlı kartı bilinince (ya da bağlı kartların hepsi çerçeveyse) bilinir — `bilinmeyenler` buna bakar.
 * Hiçbir karta bağlanamayan hücre (Türkçe sütun, "kişi" sütunu) girmez.
 */
function tabloBicimi(d: KumeDizini, n: DilNoktasiTablo): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  // sütun kartı: başlık TEK sözcük ve onu gösteren TEK gerçek (çerçeve olmayan) fiil kartı (sein, haben, sprechen); "du", "Dat.",
  // "wo" gibi başlıklar bağ vermez (#205 2. tur P1-1b: ilgisiz karta bağlanıp Bank, Zahn, nimm bilinmesin)
  const sutunKart = (n.table?.head ?? []).map((h) => {
    const t = toks(h); if (t.length !== 1) return null;
    const k = kendiKarti(d, t[0]!).filter((i) => d.kartlar.get(i)?.pos === "verb");
    return k.length === 1 ? k[0]! : null;
  });
  for (const row of n.table?.rows ?? []) row.forEach((cell, j) => {
    for (const s of toks(cell)) {
      if (kendiKarti(d, s).length) continue;
      // dizinde olan biçim yalnız dizin adaylarına bağlanır; sütun kartı yalnız dizinde OLMAYAN biçime (seid, habt, sprecht)
      const aday = d.idx.get(s); const sk = sutunKart[j];
      const bag = new Set(aday?.size ? aday : sk ? [sk] : []);
      if (!bag.size) continue;
      const v = out.get(s); if (v) for (const i of bag) v.add(i); else out.set(s, bag);
    }
  });
  return out;
}

/** Sözcüğü başlık olarak taşıyan, fiil olmayan gerçek (card:true) kartlar: "ja" → lx:ja, "hier" → lx:hier */
function baslikKarti(d: KumeDizini, t: string): Set<string> {
  const out = new Set<string>();
  for (const i of d.idx.get(t) ?? []) { const l = d.kartlar.get(i); if (l && !d.cerceve.has(i) && l.pos !== "verb" && toks(l.de).length === 1 && toks(l.de)[0] === t) out.add(i); }
  return out;
}

/** Dizinde olan ve kendisini gösteren gerçek kartı olmayan sözcük (kalıbın kartsız çerçeve sözcüğü: ist, war, geht, nicht, von).
 *  Planlayıcı ve testleri aynı tanımı kullanır (inceleme #176 fark doğrulaması B-1: "nicht" çok sözcüklü kart başlığında da geçer) */
export const kartsizMi = (d: KumeDizini, t: string): boolean => !!d.idx.get(t)?.size && kendiKarti(d, t).length === 0;

/** Sözcüğü tanıtımda GÖSTEREN gerçek (card:true) kartlar (tür fark etmez) */
function kendiKarti(d: KumeDizini, t: string): string[] {
  return [...(d.idx.get(t) ?? [])].filter((i) => !d.cerceve.has(i) && d.gost.get(i)?.has(t));
}

/**
 * Bir temel dersin öğrettikleri (AK-3; inceleme #168 P1-5, P1-6):
 *  - çok sözcüklü `teach` (yuvalı ya da değil) yalnız kalıp olarak; parçaları tek tek bilinmez;
 *  - tek sözcüklü `teach` ve tablo hücresi sözcüğü: kendi kartı varsa o kart bu derse bağlı olmalı; kartsız biçim (bin, habe) bilinir;
 *    hiçbir karta eşlenmeyen hücre sözcüğü (Türkçe sütun, harf adları) eklenmez.
 */
function dersBicimi(d: KumeDizini, t: TemelDers): { bicim: Set<string>; kart: Set<string>; kaliplar: string[][] } {
  const kart = new Set(t.teach.map((x) => x.lexeme).filter((x): x is string => !!x));
  const bicim = new Set<string>(); const kaliplar: string[][] = [];
  const kendiOk = (s: string) => kendiKarti(d, s).every((k) => kart.has(k));
  for (const x of t.teach) {
    // çok sözcüklü teach kalıptır: KARTSIZ çerçeve sözcükleri (ist, war, geht, guten) ders bitince tanınır (AK-3 istisnası,
    // PM-080 §4); kendi kartı olan sözcük yalnız kendi kartıyla (derse bağlıysa) bilinir
    const kp = kalipToks(x.de);
    if (kp.length > 1) { kaliplar.push(kp); for (const s of kp) if (s !== YUVA && kendiOk(s) && !kendiKarti(d, s).length) bicim.add(s); for (const s of kp) if (s !== YUVA && kendiKarti(d, s).length && kendiOk(s)) bicim.add(s); continue; }
    for (const s of kp) if (s !== YUVA && kendiOk(s)) bicim.add(s);
  }
  for (const row of t.table?.satirlar ?? []) for (const cell of row) for (const s of toks(cell)) if (d.idx.has(s) && kendiOk(s)) bicim.add(s);
  return { bicim, kart, kaliplar };
}

/** O an bilinenler: tanıtılmış kartlar, biten dersler (biçimleri ve bağladıkları kartlarla), halkanın öğrettiği kalıplar (kalipToks) */
export interface Bilinen { kart: ReadonlySet<string>; biten: ReadonlySet<string>; kaliplar?: readonly (readonly string[])[] }
export type Bilinmeyen = { tur: "kart" | "bicim" | "eslenemedi"; sozcuk: string; adaylar?: string[] };

/** Cümlede K(t) dışında kalan sözcükler. `haric`: boşluğun cevabı gibi sayılmayacak sözcükler */
export function bilinmeyenler(d: KumeDizini, cumle: string, k: Bilinen, haric: Iterable<string> = []): Bilinmeyen[] {
  const ta = toksAsil(cumle); const tt = ta.map((x) => x.t); const har = new Set(haric);
  const kart = new Set(k.kart); const bicim = new Set<string>(); const tablo = new Map<string, Set<string>>();
  for (const id of k.biten) { const b = d.dersler.get(id); if (b) { for (const s of b.bicim) bicim.add(s); for (const x of b.kart) kart.add(x);
    for (const [s, bag] of b.tablo ?? []) { const v = tablo.get(s); if (v) for (const i of bag) v.add(i); else tablo.set(s, new Set(bag)); } } }
  // kalıplar bütün olarak: biten derslerin kalıpları, halkanın kalıpları, tanıtılmış kartların çok sözcüklü başlıkları
  const ortu = new Set<number>();
  // halkanın öğrettiği kalıpların KARTSIZ çerçeve sözcükleri bilinir (dersle aynı istisna); kartlı sözcük yalnız kendi kartıyla
  for (const kp of k.kaliplar ?? []) for (const s of kp) if (s !== YUVA && !kendiKarti(d, s).length) bicim.add(s);
  // kalıp düz hâliyle (yalnız yazılı yuvalarıyla) cümlede geçerse bütün sabit sözcükleri bilinir ("Guten Tag" → tag da);
  // çok sözcüklü kart başlığı yalnız bütün olarak (tanıtılmış kartın başlığı cümlede aynen geçerse)
  const duz: (readonly string[])[] = [...(k.kaliplar ?? [])];
  for (const id of k.biten) duz.push(...(d.dersler.get(id)?.kaliplar ?? []));
  for (const id of kart) duz.push(...(d.coklu.get(id) ?? []));
  for (const kp of duz) for (const j of kalipOrtu(tt, kp)) ortu.add(j);
  const out: Bilinmeyen[] = [];
  tt.forEach((t, j) => {
    if (t === YUVA_AD || ortu.has(j) || har.has(t) || /^\d+$/.test(t) || d.adlar.has(t) || bicim.has(t) || sayiMi(t, k.biten)) return;
    // sunulmuş dil noktasının tablo biçimi: bağlı kartı bilinen ya da bağlı kartlarının hepsi çerçeve olan biçim bilinir.
    // Çerçeve dalı bugün aşağıdaki çerçeve kuralıyla örtüşür; çerçeve çekimleri "gösterilmeden bilinmez" olunca (ANA-D2,
    // PM 7088563328 md. 1) tablo onların gösterim yeridir
    const tb = tablo.get(t);
    if (tb && ([...tb].some((i) => kart.has(i)) || [...tb].every((i) => d.cerceve.has(i)))) return;
    const asil = ta[j]!;
    const aday = d.idx.get(t);
    if (!aday?.size) { out.push({ tur: "eslenemedi", sozcuk: t }); return; }
    // sesteş isim/fiil (Frage/fragen, Reise/reisen): yalnız çıktıdaki aday SIRASI (Türkçe açıklama ilk adaydan): cümle ortasında
    // büyük harf → isim, küçük harf → fiil önce. Sınıf (kart/biçim) bütün adaylardan hesaplanır; dikiş değişmez (#261 fark P1-F1)
    const pos = (i: string) => d.kartlar.get(i)?.pos;
    const sesTesAday = !asil.bas && [...aday].some((i) => pos(i) === "noun") && [...aday].some((i) => pos(i) === "verb");
    const sirala = (l: string[]) => {
      l.sort();
      if (!sesTesAday || !l.some((i) => pos(i) === "noun") || !l.some((i) => pos(i) === "verb")) return l;
      const buyuk = /^\p{Lu}/u.test(asil.o);
      return [...l.filter((i) => (pos(i) === "noun") === buyuk), ...l.filter((i) => (pos(i) === "noun") !== buyuk)];
    };
    const bilinenAday = [...aday].filter((i) => kart.has(i));
    // gösterilen biçim: cümle ortasında harf büyüklüğü de tutmalı; cümle başında aynı sözcüğü gösteren bütün kartlar tanıtılmış olmalı
    // cümle başında büyük harf ayırt edici değil: küçük harfle gösteren kart varsa o (öncelikli okunuş) bilinmeli; yoksa büyük harfli kart
    const kucuk = asil.o.charAt(0).toLowerCase() + asil.o.slice(1);
    const kucukKart = asil.bas ? kendiKarti(d, t).filter((i) => d.gostAsil.get(i)?.has(kucuk)) : [];
    // tek sözcüklü cümle (resim etiketi "Arm", tek kelimelik cevap) ayırt edici bağlam taşımaz: iki okunuştan biri yeter
    // (ANA-D2 devri 7089016679 takibi, PM-101 md. 3: 34. gün `gorsel[g5]` "Arm" lx:Arm biliniyorken lx:arm yüzünden "sınırda")
    if (asil.bas && kucukKart.length && ta.length > 1) { if (kucukKart.some((i) => kart.has(i))) return; }
    else if (asil.bas && kucukKart.some((i) => kart.has(i))) return;
    else if (bilinenAday.some((i) => d.gostAsil.get(i)?.has(asil.o))) return;
    if ([...aday].some((i) => d.cerceve.has(i)) && [...baslikKarti(d, t)].every((i) => kart.has(i))) return;
    // biçimde de açıklama okunuşa göre: büyük harfli "Frage" fiil biliniyor diye "sormak" diye açıklanmaz (isim önde, bilinmese de)
    if (bilinenAday.length) { const s = sirala([...aday]); out.push({ tur: "bicim", sozcuk: t, adaylar: sesTesAday && s[0] && !bilinenAday.includes(s[0]) && pos(s[0]) !== pos(bilinenAday[0]!) ? s : sirala(bilinenAday) }); }
    else out.push({ tur: "kart", sozcuk: t, adaylar: sirala([...aday]) });
  });
  return out;
}

/** Rapor için kısa gösterim: kart eksik "x", biçim eksik "~x", eşlenemeyen "?x" */
export const bilinmeyenYazi = (u: Bilinmeyen[]) => u.map((x) => (x.tur === "kart" ? "" : x.tur === "bicim" ? "~" : "?") + x.sozcuk);
