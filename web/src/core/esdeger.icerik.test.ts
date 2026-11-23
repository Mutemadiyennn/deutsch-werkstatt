/**
 * İki yönlü doğruluk, kalıcı permütasyon taraması (inceleme #76 P0, 2. tur K1): temel, M1, senaryo (domains) ve dünya
 * (world) içeriğindeki her kabul cümlesinin
 * kelime sıralamaları (≤ 5 kelimede hepsi, daha uzunda tohumlu 150 örnek) değerlendirilir. Kabul listesinde olmadığı hâlde
 * DOĞRU sayılan her sıralama, içerik dosyası başına bir kayıt dosyasına yazılır: `docs/v2/reviews/permutasyon/<içerik yolu>.txt`
 * (PM-103 md. 7). Liste büyürse ya da değişirse test kırmızı olur ve yeni kabuller gözle incelenir.
 * - Yeni ya da değişen içerik dosyası: o dosyanın kaydını üret, gözden geçir, aynı PR'a koy (içerik hatlarının yazma alanı):
 *     PERMUTASYON_YAZ=1 npx vitest run web/src/core/esdeger.icerik.test.ts
 * - Paralel içerik PR'ları ayrı kayıt dosyalarına yazar, çakışmaz; değerlendirici değişikliği kırılan kayıtları gösterir.
 * - Kabulü olmayan içerik dosyasının kaydı yoktur; eskimiş kayıt (kaynağı kalmamış ya da artık boş) da kırmızıdır.
 */
import { describe, expect, it } from "vitest";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Drill } from "@dw/shared";
import { drillVerdict } from "../ui/drill.tsx";
import { ruleVerdict } from "./answer.ts";
import { norm } from "./grading.ts";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "../../../content/v2");
const KAYIT = join(dirname(fileURLToPath(import.meta.url)), "../../../docs/v2/reviews/permutasyon");
const YAZ = process.env.PERMUTASYON_YAZ === "1";
function maddeler(): { dosya: string; d: Drill }[] {
  const out: { dosya: string; d: Drill }[] = [];
  for (const kl of ["temel", "m1"]) for (const f of readdirSync(join(KOK, kl)).filter((x) => x.endsWith(".json")).sort()) {
    const walk = (x: unknown) => {
      if (Array.isArray(x)) x.forEach(walk);
      else if (x && typeof x === "object") {
        const o = x as Record<string, unknown>;
        if (typeof o.k === "string" && Array.isArray(o.accepted) && o.k !== "pick") out.push({ dosya: `${kl}/${f}`, d: o as unknown as Drill });
        Object.values(o).forEach(walk);
      }
    };
    walk(JSON.parse(readFileSync(join(KOK, kl, f), "utf8")));
  }
  return out;
}
/** Senaryo ve dünya dosyaları: `accepted` dizisi olan her öğe (oynatıcıda ruleVerdict yolundan geçer) */
function senaryoMaddeleri(): { dosya: string; id: string; accepted: string[] }[] {
  const out: { dosya: string; id: string; accepted: string[] }[] = [];
  const gez = (yol: string): string[] => readdirSync(yol).flatMap((f) => { const t = join(yol, f); return statSync(t).isDirectory() ? gez(t) : f.endsWith(".json") ? [t] : []; });
  for (const kl of ["domains", "world"]) for (const f of gez(join(KOK, kl)).sort()) {
    let n = 0;
    const walk = (x: unknown) => {
      if (Array.isArray(x)) x.forEach(walk);
      else if (x && typeof x === "object") {
        const o = x as Record<string, unknown>;
        if (Array.isArray(o.accepted) && o.accepted.every((a) => typeof a === "string") && !("k" in o && o.k === "pick")) out.push({ dosya: f.slice(KOK.length + 1), id: String(o.id ?? `#${n++}`), accepted: o.accepted as string[] });
        Object.values(o).forEach(walk);
      }
    };
    walk(JSON.parse(readFileSync(f, "utf8")));
  }
  return out;
}
function* siralamalar(w: string[], tohum: number): Generator<string[]> {
  if (w.length <= 5) {
    const perm = (a: string[]): string[][] => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p])));
    yield* perm(w);
    return;
  }
  let h = tohum;
  for (let n = 0; n < 150; n++) {
    const a = [...w];
    for (let i = a.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j]!, a[i]!]; }
    yield a;
  }
}

describe("permütasyon taraması (temel + M1)", () => {
  it("kabul listesinde olmayan doğru sıralamalar yalnızca bunlar", () => {
    const kabul: string[] = [];
    let n = 0;
    for (const { dosya, d } of maddeler()) {
      if (d.k === "gap") continue;
      const acc = (d.accepted as string[]).filter((a) => !a.includes("{name}") && !/\d/.test(a));
      const accN = new Set((d.accepted as string[]).map((a) => norm(a)));
      for (const a of acc) {
        const w = a.replace(/[.!?…]+\s*$/, "").split(/\s+/).filter(Boolean);
        if (w.length < 3 || w.length > 8) continue;
        const tohum = [...a].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
        const gorulen = new Set<string>();
        for (const p of siralamalar(w, tohum)) {
          const c = p.join(" ") + ".";
          const k = norm(c);
          if (accN.has(k) || gorulen.has(k)) continue;
          gorulen.add(k); n++;
          if (drillVerdict(d, c, true).kind === "correct") kabul.push(`${dosya} ${d.id}: ${a} → ${c}`);
        }
      }
    }
    for (const m of senaryoMaddeleri()) {
      const acc = m.accepted.filter((a) => !a.includes("{") && !/\d/.test(a));
      const accN = new Set(m.accepted.map((a) => norm(a)));
      for (const a of acc) {
        const w = a.replace(/[.!?…]+\s*$/, "").split(/\s+/).filter(Boolean);
        if (w.length < 3 || w.length > 8) continue;
        const tohum = [...a].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 11);
        const gorulen = new Set<string>();
        for (const p of siralamalar(w, tohum)) {
          const c = p.join(" ") + ".";
          const k = norm(c);
          if (accN.has(k) || gorulen.has(k)) continue;
          gorulen.add(k); n++;
          if (ruleVerdict(m.accepted, c).kind === "correct") kabul.push(`${m.dosya} ${m.id}: ${a} → ${c}`);
        }
      }
    }
    expect(n).toBeGreaterThan(5_000);
    // içerik dosyası başına kayıt (satırın ilk alanı içerik yolu)
    const dosyaBasina = new Map<string, string[]>();
    for (const k of kabul.sort()) { const d = k.slice(0, k.indexOf(" ")); dosyaBasina.set(d, [...(dosyaBasina.get(d) ?? []), k]); }
    const gez = (yol: string): string[] => (existsSync(yol) ? readdirSync(yol).flatMap((f) => { const t = join(yol, f); return statSync(t).isDirectory() ? gez(t) : f.endsWith(".txt") ? [t.slice(KAYIT.length + 1, -4)] : []; }) : []);
    const farklar: string[] = [];
    for (const [d, satir] of dosyaBasina) {
      const yol = join(KAYIT, `${d}.txt`), metin = satir.join("\n") + "\n";
      const eski = existsSync(yol) ? readFileSync(yol, "utf8") : null;
      if (eski === metin) continue;
      if (YAZ) { mkdirSync(dirname(yol), { recursive: true }); writeFileSync(yol, metin); continue; }
      const eskiS = new Set((eski ?? "").split("\n").filter(Boolean)), yeniS = new Set(satir);
      farklar.push(`${d}: ${eski === null ? "kayıt yok" : "kayıt farklı"}` + [...satir.filter((x) => !eskiS.has(x)).map((x) => `\n  + ${x}`), ...[...eskiS].filter((x) => !yeniS.has(x)).map((x) => `\n  - ${x}`)].join(""));
    }
    for (const d of gez(KAYIT)) if (!dosyaBasina.has(d)) { if (YAZ) rmSync(join(KAYIT, `${d}.txt`)); else farklar.push(`${d}: eskimiş kayıt (bu içerikte kabul edilen yeni sıralama yok)`); }
    expect(farklar, "permütasyon kaydı güncel değil; gözden geçirip PERMUTASYON_YAZ=1 ile yazın (dosya başı açıklaması)").toEqual([]);
  }, 300_000);
});
