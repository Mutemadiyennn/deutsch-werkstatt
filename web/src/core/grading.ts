/**
 * Cevap değerlendirme — v1 kurs motorundan taşındı (app/src/js/20-kurs.js: kuNorm, kuCore, kuJudge;
 * app/legacy.html: ntok, lev, scoreHeard). Davranış v1 ile aynı; testler grading.test.ts'te.
 */
const NUM = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig"];
export function numWord(n: number): string {
  if (n <= 20) return NUM[n]!;
  const t = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
  if (n < 100) { const e = n % 10, z = Math.floor(n / 10); return e ? (e === 1 ? "ein" : NUM[e]) + "und" + t[z] : t[z]!; }
  return String(n);
}

/** Büyük/küçük harf, noktalama, ümlaut yazımı (ae/oe/ue), ß ve "äh/ähm" farkı yok sayılır; 1–99 arası rakamlar yazıyla eşlenir */
export function norm(s: string): string {
  return String(s || "")
    .toLowerCase()
    .replace(/[’'`´]/g, "")
    .replace(/\b(\d{1,2})\b/g, (_m, d) => numWord(Number(d)))
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\b(aeh|aehm|hm|ehm)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Baştaki ünlemler ("Ach so", "Oh", "Toll" …) cevabın özü değildir */
const INTERJ = new Set(["ach", "so", "oh", "aha", "toll", "super", "prima", "okay", "ok", "na", "also", "ja", "schoen"]);
export function core(s: string): string {
  const w = norm(s).split(" ");
  let i = 0;
  while (i < w.length - 2 && INTERJ.has(w[i]!)) i++;
  return w.slice(i).join(" ");
}

const ntok = (s: string) =>
  String(s || "").toLowerCase().replace(/\d+/g, (d) => " " + numWord(Number(d)) + " ").replace(/ß/g, "ss").replace(/[^a-zäöü\s-]/g, " ").replace(/-/g, " ").split(/\s+/).filter(Boolean);

export function lev(a: string, b: string): number {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)] as number[]);
  for (let j = 1; j <= n; j++) d[0]![j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i]![j] = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m]![n]!;
}

export type WordState = "ok" | "near" | "miss";
/** Hedef cümlenin her kelimesi için duyulan/yazılan metinde karşılığı var mı (konuşma tanıma hataları için yakınlık toleranslı) */
export function scoreHeard(target: string, heard: string): { words: { w: string; st: WordState }[]; score: number } {
  const disp = String(target).split(/\s+/).filter(Boolean);
  const T = disp.map((w) => ntok(w).join(" "));
  const H = ntok(heard);
  const close = (t: string, h: string) => (t === h ? 2 : t.length >= 4 && lev(t, h) <= (t.length >= 8 ? 2 : 1) ? 1 : 0);
  const m = T.length, n = H.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[]);
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) {
    const c = close(T[i]!, H[j]!);
    dp[i]![j] = Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!, c ? c + dp[i + 1]![j + 1]! : 0);
  }
  const st: WordState[] = Array(m).fill("miss");
  let i = 0, j = 0;
  while (i < m && j < n) {
    const c = close(T[i]!, H[j]!);
    if (c && dp[i]![j] === c + dp[i + 1]![j + 1]!) { st[i] = c === 2 ? "ok" : "near"; i++; j++; }
    else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) i++;
    else j++;
  }
  const words = disp.map((w, k) => ({ w, st: T[k] ? st[k]! : ("ok" as WordState) }));
  const score = words.length ? words.reduce((s, x) => s + (x.st === "ok" ? 1 : x.st === "near" ? 0.5 : 0), 0) / words.length : 0;
  return { words, score };
}

export interface Judgement { ok: boolean; heard: string; best: string; words?: { w: string; st: WordState }[]; score?: number }
/** v1 kuJudge: önce tam (normalize), sonra öz (ünlemsiz) eşleşme; olmazsa en yakın varyantı kelime kelime puanlar */
export function judge(variants: string[], inputs: string[]): Judgement {
  const V = variants.filter(Boolean);
  const I = inputs.filter(Boolean);
  for (const i of I) { const ni = norm(i); const v = V.find((v) => norm(v) === ni); if (v) return { ok: true, heard: i, best: v }; }
  for (const i of I) { const ci = core(i); const v = V.find((v) => core(v) === ci); if (v) return { ok: true, heard: i, best: v }; }
  let best: { v: string; i: string; sc: ReturnType<typeof scoreHeard> } | null = null;
  for (const v of V) for (const i of I) { const sc = scoreHeard(v, i); if (!best || sc.score > best.sc.score) best = { v, i, sc }; }
  return { ok: false, heard: best ? best.i : I[0] || "", best: best ? best.v : V[0] || "", words: best?.sc.words, score: best?.sc.score ?? 0 };
}

/** Aktif kelime: isimlerde artikel zorunlu. Sonuç Türkçe açıklamalı. */
export function judgeWord(answer: string, de: string, art?: string): { ok: boolean; why_tr?: string } {
  const a = norm(answer).split(" ").filter(Boolean);
  const target = norm(de);
  if (!art) return a.join(" ") === target ? { ok: true } : { ok: false };
  const arts = ["der", "die", "das"];
  const hasArt = a.length > 1 && arts.includes(a[0]!);
  const word = (hasArt ? a.slice(1) : a).join(" ");
  if (word !== target) return { ok: false };
  if (!hasArt) return { ok: false, why_tr: `Kelime doğru, ama artikel eksik: ${art} ${de}` };
  if (a[0] !== art) return { ok: false, why_tr: `Kelime doğru, ama artikel yanlış: ${art} ${de}` };
  return { ok: true };
}

/**
 * PM-045 §4.2: sayı derslerinde (madde `strictNumberWords`) rakam kabul edilmez; norm() rakamı yazıya çevirdiği için
 * bu denetim norm'dan ÖNCE yapılır. Rakam varsa öğrenciye kelimeyle yazma ipucu döner, yoksa null.
 */
export function numberWordHint(answer: string): string | null {
  if (!/\d/.test(answer)) return null;
  // yalnızca tek başına duran tam sayı için örnek ver; sıra sayısı (3.), saat (14:30), tarih gibi biçimlerde genel ipucu (inceleme #55)
  const m = /^\D*?(?<![\d.:])(\d{1,2})(?![\d.:])\D*$/.exec(answer);
  const plain = m && !/\bUhr\b/i.test(answer) ? Number(m[1]) : null;
  return plain !== null ? `Rakamla değil, kelimeyle yaz: ${numWord(plain)}` : "Rakamla değil, kelimeyle yaz.";
}
