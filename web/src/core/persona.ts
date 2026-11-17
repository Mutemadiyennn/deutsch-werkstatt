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
const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
/** Ad girilmemişse: beklenen cümledeki {name} yuvasını öğrencinin cevabındaki 1–3 kelimeyle doldur */
export function fillName(expected: string, answer: string): string {
  if (!expected.includes("{name}")) return expected;
  const [pre, post = ""] = expected.split("{name}") as [string, string?];
  const a = norm(answer).split(" "), pr = norm(pre).split(" ").filter(Boolean), po = norm(post).split(" ").filter(Boolean);
  const head = a.slice(0, pr.length).join(" "), tail = po.length ? a.slice(-po.length).join(" ") : "";
  const mid = a.slice(pr.length, a.length - po.length);
  if (head === pr.join(" ") && tail === po.join(" ") && mid.length >= 1 && mid.length <= 3) {
    const orig = answer.trim().split(/\s+/).slice(pr.length, pr.length + mid.length).join(" ").replace(/[.,!?]+$/, "");
    return expected.replace("{name}", orig);
  }
  return expected.replace("{name}", "").replace(/\s+/g, " ").replace(/\s([.,!?])/g, "$1");
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
