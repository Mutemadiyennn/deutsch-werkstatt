/**
 * İki yönlü doğruluk, kalıcı permütasyon taraması (inceleme #76 P0, 2. tur K1): temel, M1, senaryo (domains) ve dünya
 * (world) içeriğindeki her kabul cümlesinin
 * kelime sıralamaları (≤ 5 kelimede hepsi, daha uzunda tohumlu 150 örnek) değerlendirilir. Kabul listesinde olmadığı hâlde
 * DOĞRU sayılan her sıralama anlık görüntüye yazılır: liste büyürse ya da değişirse test kırmızı olur ve yeni kabuller
 * gözle incelenir (`npx vitest -u` yalnızca inceleme sonrası).
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Drill } from "@dw/shared";
import { drillVerdict } from "../ui/drill.tsx";
import { ruleVerdict } from "./answer.ts";
import { norm } from "./grading.ts";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "../../../content/v2");
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
    expect(kabul.sort().join("\n")).toMatchSnapshot();
  }, 300_000);
});
