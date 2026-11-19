/**
 * Öğrencinin kimliği (DECISIONS D-061): içerikte sabit ad/cinsiyet yok.
 *   {name}       → cihazdaki ad (yoksa gösterimde "(adın)", cevapta serbest yuva)
 *   {A|B}        → A = Herr hitabı, B = Frau hitabı (ör. {Patient|Patientin}, {Herr|Frau})
 * Ad depoya, loglara ve yapay zekâya gitmez: yapay zekâya giden metinde ad "[Name]" olur.
 */
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
/** Ad girilmemişse: beklenen cümledeki {name} yuvasını öğrencinin cevabındaki 1–3 kelimeyle doldur */
export function fillName(expected: string, answer: string): string {
  if (!expected.includes("{name}")) return expected;
  const [pre, post = ""] = expected.split("{name}") as [string, string?];
  const orig = parca(answer), a = orig.map((w) => w.toLocaleLowerCase("de"));
  const pr = parca(pre).map((w) => w.toLocaleLowerCase("de")), po = parca(post).map((w) => w.toLocaleLowerCase("de"));
  const head = a.slice(0, pr.length).join(" "), tail = po.length ? a.slice(-po.length).join(" ") : "";
  const n = a.length - pr.length - po.length;
  if (head === pr.join(" ") && tail === po.join(" ") && n >= 1 && n <= 3) return expected.replace("{name}", orig.slice(pr.length, pr.length + n).join(" "));
  // ad yuvası boş bırakılmışsa ("Guten Tag, hier ist.") doğru sayılmaz: yuva gösterimdeki "(adın)" ile kalır (inceleme #65 3. tur P2)
  return expected.replace("{name}", "(adın)");
}
/** Yapay zekâya giden metin: ad → [Name] */
export function redact(t: string, p: Persona): string {
  if (!p.name) return t;
  const esc = p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return t.replace(new RegExp(`\\b${esc}\\b`, "gi"), "[Name]");
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
  if (x && typeof x === "object") { const o: Record<string, unknown> = {}; for (const [k, v] of Object.entries(x)) o[k] = personalizeDeep(v, p, k); return o as T; }
  return x;
}
