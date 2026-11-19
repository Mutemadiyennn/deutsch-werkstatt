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
const sira = (w: string) => { const m = SIRA_EK.exec(w); const n = m ? SIRA.get(m[1]!) : undefined; return n; };
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
  // tarih: 3.5., 03.05.2026
  t = t.replace(/(?<![\d.])(\d{1,2})\.\s?(\d{1,2})\.(\d{4}|\d{2})?(?!\d)/gu, (m, d: string, a: string, y?: string) => {
    const D = Number(d), A = Number(a);
    return D >= 1 && D <= 31 && A >= 1 && A <= 12 ? ` o${D} ${AYLAR[A - 1]}${y ? " " + y : ""} ` : m;
  });
  // sıra sayısı: "3. Mai", "am 3.", "der 2. Stock" (artikel/edattan sonra ya da ay adından önce)
  t = t.replace(new RegExp(`(?<![\\d.])(\\d{1,2})\\.\\s*(?=(${AY_HAM})\\b)`, "giu"), (_m, d: string) => ` o${Number(d)} `);
  t = t.replace(/(?<=(?:^|[^\p{L}])(?:am|im|vom|zum|zur|der|den|dem|des|die|das|ab|bis|seit)\s+)(\d{1,2})\.(?!\d)/giu, (_m, d: string) => ` o${Number(d)} `);
  return t;
}

/** Normalleştirilmiş kelime dizisinde konuşma biçimleri: zwo, sıra sayısı kelimeleri, halb/Viertel/nach/vor saatleri */
function kelimeKanon(w: string[]): string[] {
  const out: string[] = [];
  const saat = (x: string | undefined) => { const n = x === undefined ? undefined : SAYI.get(x); return n !== undefined && n >= 1 && n <= 24 ? n : undefined; };
  const once = (h: number) => (h === 1 ? 12 : h - 1);
  for (let i = 0; i < w.length; i++) {
    const x = w[i]!, y = w[i + 1], z = w[i + 2];
    if (x === "halb" && saat(y)) { out.push(...saatYaz(once(saat(y)!), 30).split(" ")); i++; continue; }
    if (x === "viertel" && (y === "nach" || y === "vor") && saat(z)) { out.push(...(y === "nach" ? saatYaz(saat(z)!, 15) : saatYaz(once(saat(z)!), 45)).split(" ")); i += 2; continue; }
    if ((x === "fuenf" || x === "zehn" || x === "zwanzig") && (y === "nach" || y === "vor") && saat(z) && w[i + 3] !== "uhr") {
      const n = SAYI.get(x)!; out.push(...(y === "nach" ? saatYaz(saat(z)!, n) : saatYaz(once(saat(z)!), 60 - n)).split(" ")); i += 2; continue;
    }
    if (x === "zwo") { out.push("zwei"); continue; }
    const s = sira(x);
    if (s !== undefined && x !== "achten") { out.push(`o${s}`); continue; }
    out.push(x);
  }
  return out;
}

/** norm() + saat/tarih/sıra sayısı eşdeğerliği: "Es ist 9:30." = "Es ist halb zehn." = "Es ist neun Uhr dreißig." */
export function esNorm(s: string): string {
  return kelimeKanon(norm(hamKanon(s)).split(" ").filter(Boolean)).join(" ");
}

/** 13–24 saatleri 12 saate indirir: yalnızca "yanlış mı, kontrol edemedim mi" ayrımında (halb drei ↔ 14:30 açık yanlış değildir) */
export function saat12(s: string): string {
  const w = s.split(" ");
  return w.map((x, i) => { const n = SAYI.get(x); return n !== undefined && n > 12 && n <= 24 && w[i + 1] === "uhr" ? norm(numWord(n - 12)) : x; }).join(" ");
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
/** Uzun rakam dizisi: rakamlar ve sayı kelimeleri (gruplu ya da tek tek) tek rakam dizisine, kalan kelimeler ayrı */
export function rakamDizisi(s: string): { rakam: string; kelime: string } {
  const t = String(s || "").toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9 ]+/g, " ");
  let rakam = ""; const kelime: string[] = [];
  for (const w of t.split(/\s+/).filter(Boolean)) {
    if (/^\d+$/.test(w)) { rakam += w; continue; }
    const n = kelimeSayi(w);
    if (n !== undefined && w !== "ein") rakam += String(n); else kelime.push(w);
  }
  return { rakam, kelime: kelime.join(" ") };
}
/** Kabul biçimi 5+ rakamlı bir dizi içeriyorsa (telefon, posta kodu): rakamlar ve kalan kelimeler aynıysa eşdeğer */
export function rakamEsit(kabul: string, cevap: string): boolean {
  const a = rakamDizisi(kabul), b = rakamDizisi(cevap);
  return a.rakam.length >= 5 && a.rakam === b.rakam && a.kelime === b.kelime;
}

/* ───────────── harf harf söyleme ───────────── */
/** Harf adları (sesle girişte "be", "ka" gelir) ve DIN 5009 kodlama sözcükleri (eski kişi adları, 2022 şehir adları); r0-10 tablosu */
const HARF_AD: Record<string, string> = { ch: "ch", sch: "sch", a: "a", be: "b", ce: "c", tse: "c", ze: "c", de: "d", e: "e", ef: "f", ge: "g", ha: "h", i: "i", jot: "j", yot: "j", ka: "k", el: "l", em: "m", en: "n", o: "o", pe: "p", ku: "q", er: "r", es: "s", te: "t", u: "u", fau: "v", we: "w", ve: "w", ix: "x", iks: "x", ypsilon: "y", zett: "z", tset: "z", eszett: "ß", ae: "ä", oe: "ö", ue: "ü" };
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
  for (let i = 0; i < w.length; i++) {
    const x = w[i]!;
    if (x === "wie" || x === "und") continue;
    if (x === "doppel" || x === "doppelt") {
      const y = w[i + 1]; if (!y) return null;
      const h = harf(y) ?? KOD[asc(y)]; if (!h) return null;
      out.push(h, h); i++;
      if (w[i + 1] === "wie" && w[i + 2] && (KOD[asc(w[i + 2]!)] === h || asc(w[i + 2]!).startsWith(asc(h)))) i += 2;
      continue;
    }
    if (x === "umlaut") {
      const y = w[i + 1]; if (!y) return null;
      const h = harf(y) ?? KOD[asc(y)]; if (!h || !UMLAUT[h]) return null;
      out.push(UMLAUT[h]!); i++; continue;
    }
    const h = harf(x);
    if (h) {
      // "B wie Berta": kodlama sözcüğü tablodaysa aynı harf olmalı; tabloda yoksa aynı harfle başlamalı (K wie Kaiser anlaşılır)
      if (w[i + 1] === "wie" && w[i + 2]) {
        const k = w[i + 2]!; const kh = KOD[asc(k)];
        if (kh ? kh !== h : !asc(k).startsWith(asc(h))) return null;
        i += 2;
      }
      out.push(...(h === "ch" || h === "sch" ? [...h] : [h]));
      continue;
    }
    const k = KOD[asc(x)];
    if (!k) return null;
    out.push(...(k === "ch" || k === "sch" ? [...k] : [k]));
  }
  return out.length ? out : null;
}
/** Harf harf söyleme maddesi: kabul listesinde yalnızca harflerden oluşan bir biçim ("B, R, A, N, D, L") varsa hedef odur */
export function heceHedef(kabul: string[]): string[] | null {
  const h = kabul.find((a) => /^\s*\p{L}{1,2}(\s*,\s*(Doppel-)?\p{L}{1,2})+\s*\.?\s*$/u.test(a) && a.split(",").length >= 3);
  return h ? harfler(h) : null;
}
export function heceEsit(kabul: string[], cevap: string): boolean {
  const hedef = heceHedef(kabul);
  if (!hedef) return false;
  const c = harfler(cevap);
  return !!c && c.join("") === hedef.join("");
}

/* ───────────── kelime sırası (V2) ───────────── */
/** Öğe başında/sonunda duramayan işlev kelimeleri (norm yazımıyla) */
const ISLEV = new Set("der die das den dem des ein eine einen einem einer eines mein meine meinen meinem meiner dein deine deinen deinem sein seine seinen seinem ihr ihre ihren ihrem unser unsere unseren euer eure kein keine keinen keinem keiner in im ins an am ans auf aufs aus bei beim mit nach von vom zu zum zur fuer um fuers ueber unter vor vors ums durchs hinter neben zwischen durch gegen ohne bis seit ab sehr".split(" "));
const AYIRAN = new Set("an auf aus ein mit zu ab vor zurueck weg los fern nach her hin mit".split(" "));
const ZAMIR = new Set("ich du er sie es wir ihr man".split(" "));
const BAGLAC = /\b(und|oder|aber|denn|sondern|dass|weil|wenn|ob)\b/;
function bicimler(a: string[]): { v2: Set<string>; v3: Set<string> } {
  const v2 = new Set<string>(), v3 = new Set<string>();
  const n = a.length;
  for (let k = 1; k <= Math.min(4, n - 2); k++) {
    const pre = a.slice(0, k), V = a[k]!, post = a.slice(k + 1);
    if (ISLEV.has(pre[pre.length - 1]!) || ISLEV.has(V)) continue;
    for (let s = 0; s < post.length; s++) for (let e = s + 1; e <= Math.min(post.length, s + 4); e++) {
      const S = post.slice(s, e), rest = [...post.slice(0, s), ...post.slice(e)];
      if (ISLEV.has(S[S.length - 1]!) || (s > 0 && ISLEV.has(post[s - 1]!)) || (S.length === 1 && S[0] === "nicht")) continue;
      if (e === post.length && S.length === 1 && AYIRAN.has(S[0]!) && post.length > 1) continue;
      if (rest.length && ISLEV.has(rest[rest.length - 1]!)) continue;
      // öğe başa: kalan özne fiilin hemen ardına (Ins Kino gehe ich morgen) ya da başa alınan öğenin yerine (Morgen gehe ich ins Kino)
      v2.add([...S, V, ...pre, ...rest].join(" "));
      v2.add([...S, V, ...post.slice(0, s), ...pre, ...post.slice(e)].join(" "));
      // fiil üçüncü yerde: yalnızca özne bir şahıs zamiriyse (kapalı küme; fiilin yeri böylece güvenilir): Morgen ich gehe…, Heute ich habe…
      if (pre.length === 1 && ZAMIR.has(pre[0]!)) v3.add([...S, ...pre, V, ...rest].join(" "));
      if (S.length === 1 && ZAMIR.has(S[0]!) && s === 0) v3.add([...pre, ...S, V, ...rest].join(" "));
    }
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
  for (const a of kabul) {
    if (/[?!,;:]/.test(a.replace(/[.!]\s*$/, ""))) continue;
    if (/[?!]\s*$/.test(a)) continue;
    const w = esNorm(a).split(" ").filter(Boolean);
    if (w.length < 3 || BAGLAC.test(w.join(" "))) continue;
    if ([...w].sort().join(" ") !== c.split(" ").sort().join(" ")) continue;
    const { v2, v3: y } = bicimler(w);
    if (v2.has(c)) return { kind: "correct", best: a };
    if (!v3 && y.has(c)) v3 = a;
  }
  return v3 ? { kind: "v3", best: v3 } : null;
}

/* ───────────── yazım notu ───────────── */
const sade = (w: string) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
const umlautsuz = (w: string) => w.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/Ä/g, "A").replace(/Ö/g, "O").replace(/Ü/g, "U");
/**
 * Doğru sayılan cevapta yazım farkı: büyük harf (isimler), ae/oe/ue/ss yerine ä/ö/ü/ß, ümlautsuz yazım (Muller → Müller).
 * Ümlautsuz biçim kendisi bilinen bir kelimeyse (schon ≠ schön) bu fonksiyon çağrılmadan önce cevap zaten eşleşmez.
 */
export function yazimNotu(best: string, cevap: string): string | undefined {
  const b = best.split(/\s+/).map(sade).filter(Boolean), c = cevap.split(/\s+/).map(sade).filter(Boolean);
  if (b.length !== c.length) return undefined;
  const buyuk: string[] = [], umlaut: string[] = [];
  b.forEach((x, i) => {
    const y = c[i]!;
    if (x === y) return;
    if (i > 0 && x.toLowerCase() === y.toLowerCase() && /^\p{Lu}/u.test(x) && /^\p{Ll}/u.test(y)) { buyuk.push(x); return; }
    const xl = x.toLowerCase(), yl = y.toLowerCase();
    if (xl !== yl && (asc(xl) === yl || umlautsuz(xl) === yl || asc(xl) === asc(yl))) umlaut.push(x);
  });
  const p: string[] = [];
  if (umlaut.length) p.push(`Yazımı: ${umlaut.join(", ")}`);
  if (buyuk.length) p.push(`İsimler büyük harfle başlar: ${buyuk.join(", ")}`);
  return p.length ? p.join(" · ") : undefined;
}
/** Ümlautsuz hâli de bir Almanca kelime olan sık çiftler (sözlük yüklenmemiş olsa bile): bunlarda ümlaut anlamı değiştirir */
const UMLAUT_CIFT = new Set("schon mochte wurde konnte hatte musste durfte ware zahlen drucken fordern losen bruder mutter vater tochter apfel garten laden ofen vogel nagel mantel hute fuhren zuruck uber fur kuchen".split(" "));
/** Ümlautsuz yazılmış kelimeleri kabul biçimindeki ümlautlu hâline çevirir; ümlautsuz hâli bilinen bir kelimeyse çevirmez (schon/schön) */
export function umlautTamamla(best: string, cevap: string, bilinen: (w: string) => boolean): string {
  const b = best.split(/\s+/).map(sade).filter(Boolean);
  const harita = new Map<string, string>();
  for (const x of b) { const u = umlautsuz(x).toLowerCase(); if (u !== x.toLowerCase() && !bilinen(u) && !UMLAUT_CIFT.has(u)) harita.set(u, x); }
  if (!harita.size) return cevap;
  return cevap.replace(/\p{L}+/gu, (w) => harita.get(w.toLowerCase()) ?? w);
}
