/**
 * Öğrencinin kimliği (DECISIONS D-061): içerikte sabit ad/cinsiyet yok.
 *   {name}       → cihazdaki ad (yoksa gösterimde "(adın)", cevapta serbest yuva)
 *   {A|B}        → A = Herr hitabı, B = Frau hitabı (ör. {Patient|Patientin}, {Herr|Frau})
 * Ad depoya, loglara ve yapay zekâya gitmez: yapay zekâya giden metinde ad "[Name]" olur.
 */
import { ADSIZ } from "@dw/shared";
export interface Persona { name?: string; address?: "Herr" | "Frau" }
const ALT = /\{([^{}|]+)\|([^{}|]+)\}/g;

/** Ekranda gösterim: hitap yoksa "A/B" */
export function showText(t: string, p: Persona): string {
  return t.replace(ALT, (_m, a: string, b: string) => (p.address === "Herr" ? a : p.address === "Frau" ? b : `${a}/${b}`)).replace(/\{name\}/g, p.name || "(adın)");
}
/** Seslendirme: hitap yoksa erkek/kadın biçiminden ilki; ad yoksa ad yuvası atlanır */
export function speakText(t: string, p: Persona): string {
  return t.replace(ALT, (_m, a: string, b: string) => (p.address === "Frau" ? b : a)).replace(/\s*\{name\}/g, p.name ? ` ${p.name}` : "");
}
/** Kabul listesi: hitap yoksa iki biçim de kabul; ad varsa yerleştirilir, yoksa {name} kalır (fillName ile cevaptan doldurulur) */
export function expandAccepted(list: string[], p: Persona): string[] {
  const out: string[] = [];
  for (const t of list) {
    const forms = p.address ? [t.replace(ALT, (_m, a: string, b: string) => (p.address === "Herr" ? a : b))] : [t.replace(ALT, (_m, a: string) => a), t.replace(ALT, (_m, _a: string, b: string) => b)];
    for (const f of forms) { const g = p.name ? f.replace(/\{name\}/g, p.name) : f; if (!out.includes(g)) out.push(g); }
  }
  return out;
}
// Unicode harfler korunur (Ayşe, Çağrı, İbrahim), ad içindeki tire ve kesme işareti ayırmaz (Jean-Luc, O'Neil) — inceleme #65 2. tur
const AYIR = /[^\p{L}\p{N}'’-]+/gu;
const parca = (s: string) => s.replace(AYIR, " ").replace(/(^|\s)[-'’]+|[-'’]+(?=\s|$)/g, " ").trim().split(/\s+/).filter(Boolean);
/**
 * Ad yuvasına giremeyecek kelimeler (inceleme #68 P1-2): adsız profilde "Ich bin krank." / "Ich bin Fieber." /
 * "Hier ist die Praxis." ad sanılmasın. Sözlük yüklenince `bilinenKelimeler` ile genişler; sözlükteki bir kelimeyle aynı
 * olan ad (ör. Rose) adsız profilde tanınmaz — ad profile girilince bu kural devreye girmez.
 */
const BILINEN = new Set("der die das den dem des ein eine einen einem einer kein keine keinen nicht nichts ich du er sie es wir ihr mein meine dein deine sein seine hier da dort ja nein bitte danke auch und oder aber noch schon sehr gut krank müde heute morgen jetzt gerne gern frau herr doktor praxis termin".split(" "));
export function bilinenKelimeler(l: Iterable<string>) {
  for (const de of l) for (const w of de.toLocaleLowerCase("de").split(/[\s,/]+/)) if (w.length > 1) BILINEN.add(w);
}
/** Ad girilmemişse: beklenen cümledeki {name} yuvasını öğrencinin cevabındaki 1–3 kelimeyle doldur (bilinen kelime ad değildir) */
export function fillName(expected: string, answer: string): string {
  if (!expected.includes("{name}")) return expected;
  const [pre, post = ""] = expected.split("{name}") as [string, string?];
  const orig = parca(answer), a = orig.map((w) => w.toLocaleLowerCase("de"));
  const pr = parca(pre).map((w) => w.toLocaleLowerCase("de")), po = parca(post).map((w) => w.toLocaleLowerCase("de"));
  const head = a.slice(0, pr.length).join(" "), tail = po.length ? a.slice(-po.length).join(" ") : "";
  const n = a.length - pr.length - po.length;
  const ad = a.slice(pr.length, pr.length + Math.max(0, n));
  if (head === pr.join(" ") && tail === po.join(" ") && n >= 1 && n <= 3 && !ad.some((w) => BILINEN.has(w))) return expected.replace("{name}", orig.slice(pr.length, pr.length + n).join(" "));
  // ad yuvası boş bırakılmışsa ("Guten Tag, hier ist.") doğru sayılmaz: yuva gösterimdeki "(adın)" ile kalır (inceleme #65 3. tur P2)
  return expected.replace("{name}", "(adın)");
}
/**
 * Yapay zekâya giden metin: ad → [Name] (D-061). Kelime sınırı Unicode harfle belirlenir (`\b` Türkçe harfte çalışmaz:
 * "Çağrı", "Özge", "İbrahim" sızıyordu — #73 incelemesi T-1). Büyük/küçük harf Türkçe ve Almanca kurala göre, boşluklar
 * esnek; iki kelimeli adda tam ad ve ayrıca her parça (en az 2 harf) maskelenir ("Anna Maria" → "Anna" da; T-2).
 */
/**
 * Harf başına yazım değişkenleri: karışık klavye ("Gökce", "Cağrı", "Oezge") da yakalanır (inceleme #75 P2).
 * Büyük/küçük harf `i` bayrağıyla; İ/ı Unicode katlamasında eşleşmediği için açıkça yazılır.
 */
const DEGISKEN: Record<string, string> = {
  ç: "(?:ç|c)", c: "(?:c|ç)", ğ: "(?:ğ|g)", g: "(?:g|ğ)", ş: "(?:ş|s)", s: "(?:s|ş)", ı: "[ıiİI]", i: "[iıİI]",
  ö: "(?:ö|oe|o)", o: "(?:o|ö)", ü: "(?:ü|ue|u)", u: "(?:u|ü)", ä: "(?:ä|ae|a)", a: "(?:a|ä)", ß: "(?:ß|ss)"
};
/** İki harflik yazımlar ters yönde de (ad "Mueller" iken "Müller", "Strauss" iken "Strauß"; inceleme #80 P1-2) */
const IKILI: Record<string, string> = { ue: "(?:ue|ü|u)", oe: "(?:oe|ö|o)", ae: "(?:ae|ä|a)", ss: "(?:ss|ß)" };
const desen = (x: string) => {
  const h = [...x.normalize("NFC").toLocaleLowerCase("tr")];
  let out = "";
  for (let i = 0; i < h.length; i++) {
    const c = h[i]!, ik = c + (h[i + 1] ?? "");
    if (IKILI[ik]) { out += IKILI[ik]; i++; continue; }
    // kesme işareti düz ya da kıvrık (iPhone akıllı noktalama), tire ya da boşluk (Jean-Luc / Jean Luc; P1-1, P2)
    out += DEGISKEN[c] ?? (/['’‘`´]/.test(c) ? "['’‘`´]" : /[\s-]/.test(c) ? "[\\s-]+" : c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  }
  return out;
};
export function redact(t: string, p: Persona): string {
  const ad = p.name?.normalize("NFC").trim().replace(/\s+/g, " ");
  if (!ad) return t;
  // tireli ve iki kelimeli adın parçaları (≥ 2 harf) da ayrıca
  const parcalar = ad.split(/[\s-]+/).filter((w) => [...w].length >= 2);
  // tam ad önce (daha uzun), sonra parçalar
  const adaylar = [ad, ...(parcalar.length > 1 ? parcalar : [])].filter((x, i, a) => a.indexOf(x) === i).sort((a, b) => b.length - a.length);
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(?:${adaylar.map(desen).join("|")})(?![\\p{L}\\p{N}])`, "giu");
  return t.normalize("NFC").replace(re, "[Name]");
}
/** Yapay zekâdan gelen metin: [Name] → ad (yoksa hitap kalır) */
export function unredact(t: string, p: Persona): string {
  return t.replace(/\[Name\]/g, p.name || "").replace(/\s+([,.!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
}
/** Senaryonun bütün metinlerini cihaz profiline göre hazırlar: accepted listeleri genişler, diğer metinler gösterime göre */
export function personalizeDeep<T>(x: T, p: Persona, key = ""): T {
  if (typeof x === "string") return showText(x, p) as unknown as T;
  if (Array.isArray(x)) {
    if (key === "accepted" && x.every((v) => typeof v === "string")) return expandAccepted(x as string[], p) as unknown as T;
    return x.map((v) => personalizeDeep(v, p)) as unknown as T;
  }
  if (x && typeof x === "object") {
    // B7: ad yoksa `k_adsiz` biçimi `k`nın yerine geçer (yuva görünmez ve okunmaz); `_adsiz` alanları çıktıda kalmaz
    const src = x as Record<string, unknown>, ad = !!p.name?.trim();
    const o: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(src)) {
      if (k.endsWith(ADSIZ) && k.slice(0, -ADSIZ.length) in src) continue;
      const adsiz = src[`${k}${ADSIZ}`];
      o[k] = personalizeDeep(!ad && adsiz !== undefined ? adsiz : v, p, k);
    }
    return o as T;
  }
  return x;
}
