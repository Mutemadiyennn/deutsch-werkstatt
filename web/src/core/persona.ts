/**
 * Öğrencinin kimliği (DECISIONS D-061): içerikte sabit ad/cinsiyet yok.
 *   {name}       → cihazdaki ad (yoksa gösterimde "(adın)", cevapta serbest yuva)
 *   {A|B}        → A = Herr hitabı, B = Frau hitabı (ör. {Patient|Patientin}, {Herr|Frau})
 * Ad depoya, loglara ve yapay zekâya gitmez: yapay zekâya giden metinde ad "[Name]" olur.
 */
import { ADSIZ, PROFIL_YUVALARI, type ProfilYuvasi } from "@dw/shared";
/** PM-148 karar 2: "Kendim hakkında" alanları (yalnız cihazda; `services/hakkimda.ts`). Değer kalıptaki yerine olduğu gibi konan Almanca biçim */
export type Hakkimda = Partial<Record<ProfilYuvasi, string>>;
export interface Persona { name?: string; address?: "Herr" | "Frau"; /** verilmezse cihazdaki son değer (`hakkimdaAyarla`) */ profil?: Hakkimda }
/** Profil yuvası boşken gösterimdeki yer ("(adın)" gibi) */
export const YUVA_GOSTERIM: Record<ProfilYuvasi, string> = { ulke: "(ülken)", sehir: "(şehrin)", yas: "(yaşın)", diller: "(dillerin)", meslek: "(mesleğin)", hobi: "(hobin)", aile: "(medeni durumun)" };
const PROFIL_RE = new RegExp(`\\{(${PROFIL_YUVALARI.join("|")})\\}`, "g");
/** Cihazdaki "Kendim hakkında" değerleri: ekranlar persona kurarken ayrıca vermesin diye bellekte (servis yükler ve kaydedince günceller) */
let cihazProfili: Hakkimda = {};
export function hakkimdaAyarla(v: Hakkimda) { cihazProfili = { ...v }; }
const profilOf = (p: Persona): Hakkimda => p.profil ?? cihazProfili;
const deger = (p: Persona, y: ProfilYuvasi) => profilOf(p)[y]?.trim() || "";
const ALT = /\{([^{}|]+)\|([^{}|]+)\}/g;

/** Ekranda gösterim: hitap yoksa "A/B" */
export function showText(t: string, p: Persona): string {
  return t.replace(PROFIL_RE, (_m, y: ProfilYuvasi) => deger(p, y) || YUVA_GOSTERIM[y]).replace(ALT, (_m, a: string, b: string) => (p.address === "Herr" ? a : p.address === "Frau" ? b : `${a}/${b}`)).replace(/\{name\}/g, p.name || "(adın)");
}
/** Seslendirme: hitap yoksa erkek/kadın biçiminden ilki; ad yoksa ad yuvası atlanır */
export function speakText(t: string, p: Persona): string {
  return t.replace(PROFIL_RE, (_m, y: ProfilYuvasi) => deger(p, y)).replace(ALT, (_m, a: string, b: string) => (p.address === "Frau" ? b : a)).replace(/\s*\{name\}/g, p.name ? ` ${p.name}` : "");
}
/** Kabul listesi: hitap yoksa iki biçim de kabul; ad varsa yerleştirilir, yoksa {name} kalır (fillName ile cevaptan doldurulur) */
export function expandAccepted(list: string[], p: Persona): string[] {
  const out: string[] = [];
  for (const t of list) {
    const forms = p.address ? [t.replace(ALT, (_m, a: string, b: string) => (p.address === "Herr" ? a : b))] : [t.replace(ALT, (_m, a: string) => a), t.replace(ALT, (_m, _a: string, b: string) => b)];
    // profil yuvası: değer varsa yerleşir, yoksa yuva kalır (fillName cevaptan doldurur)
    for (const f0 of forms) { const f = f0.replace(PROFIL_RE, (m, y: ProfilYuvasi) => deger(p, y) || m); const g = p.name ? f.replace(/\{name\}/g, p.name) : f; if (!out.includes(g)) out.push(g); }
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
const BILINEN_SABIT = "der die das den dem des ein eine einen einem einer kein keine keinen nicht nichts ich du er sie es wir ihr mein meine dein deine sein seine hier da dort ja nein bitte danke auch und oder aber noch schon sehr gut krank müde heute morgen jetzt gerne gern frau herr doktor praxis termin".split(" ");
const BILINEN = new Set(BILINEN_SABIT);
/** {aile} yuvasına girebilen dört biçim; ülke/şehir öbeğinin başında artikel olabilir ("aus der Schweiz") */
export const AILE_DURUMU = ["ledig", "verheiratet", "geschieden", "verwitwet"];
const ARTIKEL_OK = new Set(["der", "dem", "den", "die"]);
/** profil yuvasına giremeyen işlev sözcükleri ve sıfatlar: BILINEN'in sabit hâli (sözlükle genişlemez: "Lehrer", "Polen" girebilsin) */
const ISLEV = new Set([...BILINEN_SABIT, "sehr", "nicht", "müde", "krank", "gut", "schlecht", "alt", "jung", "hier", "da"]);
export function bilinenKelimeler(l: Iterable<string>) {
  for (const de of l) for (const w of de.toLocaleLowerCase("de").split(/[\s,/]+/)) if (w.length > 1) BILINEN.add(w);
}
/** Ad girilmemişse: beklenen cümledeki {name} yuvasını öğrencinin cevabındaki 1–3 kelimeyle doldur (bilinen kelime ad değildir) */
export function fillName(expected: string, answer: string): string {
  expected = profilDoldur(expected, answer);
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
export function redact(t: string, p: Persona, secenek: { profil?: boolean } = {}): string {
  // PM-148 karar 2: istenirse profil değerleri de "[…]" (öğrencinin cevabı ve ona göre doldurulmuş beklenen); içerik ve karşı tarafın
  // satırları maskelenmez (inceleme #286 P1-5: "Lesen", "Arzt", "30" içerikte de geçer). Sayı maskelenmez. Ad "[Name]" (unredact geri koyar)
  if (secenek.profil) for (const v of Object.values(profilOf(p))) {
    const x = v?.normalize("NFC").trim().replace(/\s+/g, " ");
    if (x && [...x].length >= 2 && !/^\d+$/.test(x)) t = t.normalize("NFC").replace(new RegExp(`(?<![\\p{L}\\p{N}])(?:${desen(x)})(?![\\p{L}\\p{N}])`, "giu"), "[…]");
  }
  const ad = p.name?.normalize("NFC").trim().replace(/\s+/g, " ");
  if (!ad) return t;
  // tireli ve iki kelimeli adın parçaları (≥ 2 harf) da ayrıca
  const parcalar = ad.split(/[\s-]+/).filter((w) => [...w].length >= 2);
  // tam ad önce (daha uzun), sonra parçalar
  const adaylar = [ad, ...(parcalar.length > 1 ? parcalar : [])].filter((x, i, a) => a.indexOf(x) === i).sort((a, b) => b.length - a.length);
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(?:${adaylar.map(desen).join("|")})(?![\\p{L}\\p{N}])`, "giu");
  return t.normalize("NFC").replace(re, "[Name]");
}
/**
 * Profil yuvası boşsa (PM-148 karar 2): beklenen cümledeki {ulke}, {sehir}… yuvası öğrencinin cevabındaki 1–4 sözcükle doldurulur
 * ("Ich komme aus {ulke}." ↔ "Ich komme aus Polen."). Ad yuvasından farkı: sözlükteki sözcük de olabilir (verheiratet, Lehrer).
 * Uymazsa yuva gösterimdeki yeriyle kalır (doğru sayılmaz).
 */
export function profilDoldur(expected: string, answer: string): string {
  const bol = expected.split(PROFIL_RE);   // [metin, yuva, metin, …]
  if (bol.length === 1) return expected;
  const AD = "qqadyeriqq";
  const kac = (w: string) => (w.toLocaleLowerCase("de") === AD ? "(?:\\S+(?:\\s+\\S+){0,2}?)" : w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const desenler = bol.map((x, i) => (i % 2 ? "(\\S+(?:\\s+\\S+){0,3}?)" : parca(x.replace(/\{name\}/g, ` ${AD} `)).map(kac).join("\\s+"))).filter(Boolean);
  const m = new RegExp(`^${desenler.join("\\s+")}$`, "iu").exec(parca(answer).join(" "));
  let n = 0;
  // yuvaya girebilecek olan (inceleme #286 P1-2): aile durumu dört sözcükten biri, yaş sayı; öbürlerinde bilinen işlev sözcüğü ve sıfat yok
  const uygun = (y: ProfilYuvasi, v: string) => {
    const w = v.toLocaleLowerCase("de").split(/\s+/);
    if (y === "aile") return AILE_DURUMU.includes(v.toLocaleLowerCase("de"));
    if (y === "yas") return /^\d{1,3}$/.test(v);
    if (y === "diller") return w.every((x) => x === "und" || !ISLEV.has(x));
    return !w.some((x) => ISLEV.has(x) && !ARTIKEL_OK.has(x));
  };
  return expected.replace(PROFIL_RE, (_m, y: ProfilYuvasi) => { const v = m?.[++n]; return v && uygun(y, v) ? v : YUVA_GOSTERIM[y]; });
}
/** Yedeğe giren metinde (itiraz kaydı) cihazdaki profil değeri yuvasına geri döner: değer yalnız cihazda kalır (karar 2) */
export function profilGeriAl(t: string, p: Persona = {}): string {
  let out = t;
  for (const [y, v] of Object.entries(profilOf(p)) as [ProfilYuvasi, string | undefined][]) {
    const x = v?.normalize("NFC").trim();
    if (x && [...x].length >= 2) out = out.normalize("NFC").replace(new RegExp(`(?<![\\p{L}\\p{N}])(?:${desen(x)})(?![\\p{L}\\p{N}])`, "giu"), `{${y}}`);
  }
  return out;
}
/** Yapay zekâdan gelen metin: [Name] → ad (yoksa hitap kalır); profil maskesi "[…]" → "…" */
export function unredact(t: string, p: Persona): string {
  return t.replace(/\[…\]/g, "…").replace(/\[Name\]/g, p.name || "").replace(/\s+([,.!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
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
      // kabul listesinde adsız biçim ASIL biçime eklenir: adsız profilde öğrenci kendi adını yazarsa da doğru sayılır (inceleme #148 P2)
      const sec = !ad && adsiz !== undefined ? (Array.isArray(adsiz) && Array.isArray(v) && k === "accepted" ? [...adsiz, ...v] : adsiz) : v;
      o[k] = personalizeDeep(sec, p, k);
    }
    return o as T;
  }
  return x;
}
