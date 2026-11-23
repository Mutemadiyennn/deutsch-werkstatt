/**
 * İki yönlü doğruluk, kalıcı permütasyon taraması (inceleme #76 P0, 2. tur K1): temel, M1, senaryo (domains) ve dünya
 * (world) içeriğindeki her kabul cümlesinin kelime sıralamaları (≤ 5 kelimede hepsi, daha uzunda tohumlu 150 örnek)
 * değerlendirilir. Kabul listesinde olmadığı hâlde DOĞRU sayılan her sıralama **içerikten türetilen bir kuralla** açıklanmalı
 * (PM-103 md. 7, PM-117 A.2; saklı anlık görüntü yok, içerik PR'ı web/'e dokunmadan geçer):
 *  1. V2 öbek takası: kabul cümlesinin başındaki öbek fiilden sonraya, fiilden sonraki bitişik bir öbek başa geçer; çekimli fiil
 *     ikinci yerde kalır, öbekler bölünmez ("Seit gestern hab ich Fieber" → "Fieber hab ich seit gestern").
 *  2. Orta alan: ilk iki/üç sözcük ve son sözcük (fiil çerçevesinin sağ ucu) aynı, aradakiler yer değiştirir.
 *  3. Dolgu: baştaki/sondaki nezaket ve onay sözcükleri (bitte, danke, ja, nein, also …) ile "Uhr" (PM-101 md. 6) yer değiştirir
 *     ya da düşer; geri kalan sıra aynıdır.
 * Kuralların açıklamadığı kabul derecelendiricinin gevşekliğidir: test kırmızı olur. Çözüm ya derecelendiricide (web/) ya da,
 * sıra doğru Almancaysa, o sıranın kabul listesine yazılmasıdır (listede olan sıra taranmaz). İSTISNA: #76 incelemesinde
 * görülüp bırakılmış kabuller; yalnız azalır.
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

/* ───────────── kurallar (içerikten türetilen denetim) ───────────── */
const sozcukler = (s: string) => s.replace(/[.!?…]+\s*$/, "").split(/\s+/).map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").toLowerCase()).filter(Boolean);
const DOLGU = new Set("bitte danke vielen dank sehr herzlichen schön gern gerne ja nein also okay ok gut genau na dann super prima alles klar oder entschuldigung hallo".split(" "));
const kenarsiz = (p: string[]) => { let i = 0, j = p.length; while (i < j && DOLGU.has(p[i]!)) i++; while (j > i && DOLGU.has(p[j - 1]!)) j--; return p.slice(i, j); };
const ozu = (p: string[]) => p.filter((w) => !DOLGU.has(w) && w !== "uhr");
const ayni = (a: string[], b: string[]) => a.length === b.length && a.every((w, i) => w === b[i]);
const torba = (a: string[]) => [...a].sort().join(" ");
/** Öbeğin içinden koparılamayan sözcükler: edat, tanımlık, iyelik ("seit gestern" bölünmez; "einen Termin" bölünmez) */
const BAGLI = new Set("seit am an um im in mit von vom zu zum zur bei beim nach aus für ohne bis gegen über unter vor auf der die das den dem des ein eine einen einem einer eines kein keine keinen keinem mein meine meinen meinem dein deine deinen ihr ihre ihren ihrem sein seine seinen seinem unser unsere".split(" "));
/** Önündeki öbekten koparılmış sayılan sözcük: BAGLI'dan zamir de olabilen der/die/das/den/dem/des çıkar ("das seit Sonntag" bölünme değil) */
const KOPAN = new Set([...BAGLI].filter((w) => !/^d(er|ie|as|en|em|es)$/.test(w)));
/** p, r'den V2 öbek takasıyla elde edilir: p = X v A, r = Y v B; X B'de bitişik, Y A'da bitişik, ikisi çıkınca kalan sıra aynı; öbek bölünmez */
function obekTakasi(p: string[], r: string[]): boolean {
  if (ayni(p, r) || torba(p) !== torba(r)) return false;
  for (let i = 1; i < p.length; i++) for (let j = 1; j < r.length; j++) {
    if (r[j] !== p[i]) continue;
    const X = p.slice(0, i), Y = r.slice(0, j), A = p.slice(i + 1), B = r.slice(j + 1);
    for (let a = 0; a + X.length <= B.length; a++) {
      if (!ayni(B.slice(a, a + X.length), X) || KOPAN.has(B[a - 1] ?? "") || BAGLI.has(X.at(-1)!)) continue;
      const B2 = [...B.slice(0, a), ...B.slice(a + X.length)];
      for (let b = 0; b + Y.length <= A.length; b++) if (ayni(A.slice(b, b + Y.length), Y) && !KOPAN.has(A[b - 1] ?? "") && !BAGLI.has(Y.at(-1)!) && ayni([...A.slice(0, b), ...A.slice(b + Y.length)], B2)) return true;
    }
  }
  return false;
}
const ortaAlan = (p: string[], r: string[]) => [2, 3].some((k) => p.length > k + 1 && ayni(p.slice(0, k), r.slice(0, k)) && p.at(-1) === r.at(-1) && torba(p) === torba(r));
export function aciklanir(cevap: string, kabul: string[]): boolean {
  const p0 = sozcukler(cevap);
  for (const p of [p0, kenarsiz(p0)]) for (const a of kabul) for (const r of [sozcukler(a), kenarsiz(sozcukler(a))]) {
    if (!p.length) continue;
    if (ayni(p, r) || obekTakasi(p, r) || ortaAlan(p, r) || (ozu(p).length > 0 && ayni(ozu(p), ozu(r)))) return true;
  }
  return false;
}
/** #76 incelemesinde görülüp bırakılmış kabuller (kaynak → sıra); yalnız azalır */
const ISTISNA = new Set([
  "Nein, ich bin so müde. → so Nein, ich bin müde.",
  "Nein, Sonntag geht leider nicht. → Nein, Sonntag geht nicht leider.",
  "Ich komme nachmittags um drei. → Ich komme um drei nachmittags.",
  "Leider nein. Ich muss arbeiten. → nein. Leider muss Ich arbeiten.",
  "Ach so! Nein, danke. → so! Ach Nein, danke.",
  "Ach so, nein, danke. → so, Ach nein, danke.",
  "Ach so, jetzt verstehe ich. → so, Ach jetzt verstehe ich.",
  "Ach so! Danke schön. → so! Ach Danke schön."
]);

describe("kurallar", () => {
  it("öbek takası, orta alan, dolgu açıklar; V3, bölünmüş öbek, çerçeve dışı fiil açıklanmaz", () => {
    expect(aciklanir("Fieber hab ich seit gestern.", ["Ich hab seit gestern Fieber."])).toBe(true);
    expect(aciklanir("Einen Termin bräuchte ich mal.", ["Ich bräuchte mal einen Termin."])).toBe(true);
    expect(aciklanir("Ich habe leider heute keine Zeit.", ["Ich habe heute leider keine Zeit."])).toBe(true);
    expect(aciklanir("Ich bin dabei, danke.", ["Ich bin dabei!"])).toBe(true);
    expect(aciklanir("Zehn dreißig, ja.", ["Zehn Uhr dreißig?"])).toBe(true);
    expect(aciklanir("Morgen ich habe Zeit.", ["Ich habe morgen Zeit."])).toBe(false);
    expect(aciklanir("Gestern hab ich seit Fieber.", ["Ich hab seit gestern Fieber."])).toBe(false);
    expect(aciklanir("Ich möchte machen einen Termin.", ["Ich möchte einen Termin machen."])).toBe(false);
    expect(aciklanir("Ich einen Termin möchte machen.", ["Ich möchte einen Termin machen."])).toBe(false);
  });
});

describe("permütasyon taraması (temel + M1 + senaryo + dünya)", () => {
  it("kabul listesinde olmayan her doğru sıralama kurallarla açıklanır", () => {
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
          if (drillVerdict(d, c, true).kind === "correct" && !aciklanir(c, d.accepted as string[]) && !ISTISNA.has(`${a} → ${c}`)) kabul.push(`${dosya} ${d.id}: ${a} → ${c}`);
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
          if (ruleVerdict(m.accepted, c).kind === "correct" && !aciklanir(c, m.accepted) && !ISTISNA.has(`${a} → ${c}`)) kabul.push(`${m.dosya} ${m.id}: ${a} → ${c}`);
        }
      }
    }
    expect(n).toBeGreaterThan(5_000);
    expect(kabul.sort(), "derecelendirici bu sıraları kabul ediyor ama hiçbir kural açıklamıyor (başlıktaki 1–3); doğru Almancaysa sırayı kabul listesine yaz, değilse web/ derecelendirici işi").toEqual([]);
  }, 300_000);
});
