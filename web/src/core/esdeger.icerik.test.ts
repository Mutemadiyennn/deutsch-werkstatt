/**
 * İki yönlü doğruluk, kalıcı permütasyon taraması (inceleme #76 P0, 2. tur K1): temel, M1, senaryo (domains) ve dünya
 * (world) içeriğindeki her kabul cümlesinin kelime sıralamaları (≤ 5 kelimede hepsi, daha uzunda tohumlu 150 örnek)
 * değerlendirilir. Kabul listesinde olmadığı hâlde DOĞRU sayılan her sıralama **içerikten türetilen bir kuralla** açıklanmalı
 * (PM-103 md. 7, PM-117 A.2; saklı anlık görüntü yok, içerik PR'ı web/'e dokunmadan geçer):
 *  1. V2 öbek takası: kabul cümlesinin başındaki öbek fiilden sonraya, fiilden sonraki bitişik bir öbek başa geçer; çekimli fiil
 *     ikinci yerde kalır, öbekler bölünmez, kişi zamiri eksen olmaz ("Seit gestern hab ich Fieber" → "Fieber hab ich seit gestern").
 *  2. Orta alan: ön alan + fiil (2 sözcük; kabul edat/tanımlıkla başlıyorsa 3) ve son sözcük (fiil çerçevesinin sağ ucu) aynı,
 *     aradakiler yer değiştirir.
 *  3. Dolgu: cümlenin başındaki ya da sonundaki nezaket/onay sözcükleri (bitte, danke, ja, nein, also …; başta gern/gerne/dann
 *     hariç, "Gern ich …" V3'tür) düşer; "Uhr" her yerden düşer (PM-101 md. 6); geri kalan sıra aynıdır.
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
const DOLGU = new Set("bitte danke vielen dank sehr herzlichen schön gern gerne ja nein also okay ok gut genau na dann super prima toll alles klar oder entschuldigung hallo".split(" "));
/** Baştan atılmayan dolgu: "Gern ich hätte …", "Dann ich gehe …" V3'tür (inceleme #76 2. tur K2, #259 P1-1) */
const BAS_DOLGU = new Set([...DOLGU].filter((w) => !["gern", "gerne", "dann"].includes(w)));
const kenarsiz = (p: string[]) => { let i = 0, j = p.length; while (i < j && BAS_DOLGU.has(p[i]!)) i++; while (j > i && DOLGU.has(p[j - 1]!)) j--; return p.slice(i, j); };
/** Yalnız "Uhr" her yerden düşer (PM-101 md. 6); dolgu yalnız kenardan (kenarsiz) */
const ozu = (p: string[]) => p.filter((w) => w !== "uhr");
const ayni = (a: string[], b: string[]) => a.length === b.length && a.every((w, i) => w === b[i]);
const torba = (a: string[]) => [...a].sort().join(" ");
/** Öbeğin içinden koparılamayan sözcükler: edat, tanımlık, iyelik ("seit gestern" bölünmez; "einen Termin" bölünmez) */
const BAGLI = new Set("seit am an um im in mit von vom zu zum zur bei beim nach aus für ohne bis gegen über unter vor auf der die das den dem des ein eine einen einem einer eines kein keine keinen keinem mein meine meinen meinem dein deine deinen ihr ihre ihren ihrem sein seine seinen seinem unser unsere".split(" "));
/** Önündeki öbekten koparılmış sayılan sözcük: BAGLI'dan zamir de olabilen der/die/das/den/dem/des çıkar ("das seit Sonntag" bölünme değil) */
const KOPAN = new Set([...BAGLI].filter((w) => !/^d(er|ie|as|en|em|es)$/.test(w)));
/** Kişi zamiri öbek takasında eksen olamaz, çok sözcüklü taşınan öbeğin içinde de olamaz ("Morgen ich habe Zeit" V3'tür) */
const ZAMIR = new Set("ich du er sie es wir ihr man".split(" "));
/** p, r'den V2 öbek takasıyla elde edilir: p = X v A, r = Y v B; X B'de bitişik, Y A'da bitişik, ikisi çıkınca kalan sıra aynı; öbek bölünmez */
function obekTakasi(p: string[], r: string[]): boolean {
  if (ayni(p, r) || torba(p) !== torba(r)) return false;
  for (let i = 1; i < p.length; i++) for (let j = 1; j < r.length; j++) {
    if (r[j] !== p[i] || ZAMIR.has(p[i]!)) continue;
    const X = p.slice(0, i), Y = r.slice(0, j), A = p.slice(i + 1), B = r.slice(j + 1);
    if ((X.length > 1 && X.some((w) => ZAMIR.has(w))) || (Y.length > 1 && Y.some((w) => ZAMIR.has(w)))) continue;
    for (let a = 0; a + X.length <= B.length; a++) {
      if (!ayni(B.slice(a, a + X.length), X) || KOPAN.has(B[a - 1] ?? "") || BAGLI.has(X.at(-1)!)) continue;
      const B2 = [...B.slice(0, a), ...B.slice(a + X.length)];
      for (let b = 0; b + Y.length <= A.length; b++) if (ayni(A.slice(b, b + Y.length), Y) && !KOPAN.has(A[b - 1] ?? "") && !BAGLI.has(Y.at(-1)!) && ayni([...A.slice(0, b), ...A.slice(b + Y.length)], B2)) return true;
    }
  }
  return false;
}
/** Ön alan iki sözcüklü olabilir ("Am Sonntag kann …"): kabul edat/tanımlıkla başlıyorsa ön alan + fiil üç sözcüktür (#259 P1-1) */
const ortaAlan = (p: string[], r: string[]) => (BAGLI.has(r[0] ?? "") ? [3] : [2, 3]).some((k) => p.length > k + 1 && ayni(p.slice(0, k), r.slice(0, k)) && p.at(-1) === r.at(-1) && torba(p) === torba(r));
function aciklanir(cevap: string, kabul: string[]): boolean {
  const p0 = sozcukler(cevap);
  for (const p of [p0, kenarsiz(p0)]) for (const a of kabul) for (const r of [sozcukler(a), kenarsiz(sozcukler(a))]) {
    if (!p.length) continue;
    if (ayni(p, r) || obekTakasi(p, r) || ortaAlan(p, r) || (ozu(p).length > 0 && ayni(ozu(p), ozu(r)))) return true;
  }
  return false;
}
/**
 * main'in #76 anlık görüntüsünde görülüp bırakılmış, kuralların açıklamadığı kabuller (dosya, madde, kaynak → sıra); yalnız azalır.
 * Çoğu derecelendiricinin baştaki ünlem/dolgu toleransı ("Ach so", "dann"): web/ takibi (#259 inceleme P1-1).
 */
const ISTISNA = new Set<string>([
  "domains/essen/scenarios/m1-weihnachtsmarkt.json d10: Grüß Gott, einen Kinderpunsch, bitte. → Grüß Gott, bitte einen Kinderpunsch,.",
  "domains/essen/scenarios/m1-weihnachtsmarkt.json d11: Okay, dann zahle ich bar. → dann Okay, ich zahle bar.",
  "domains/strategie/scenarios/01-nicht-verstanden.json #1: Ach so! Nein, danke. → so! Ach Nein, danke.",
  "domains/strategie/scenarios/01-nicht-verstanden.json #3: Ach so! Nein, danke. → so! Ach Nein, danke.",
  "domains/strategie/scenarios/01-nicht-verstanden.json #3: Ach so, nein, danke. → so, Ach nein, danke.",
  "domains/strategie/scenarios/01-nicht-verstanden.json b15: Ach so, jetzt verstehe ich. → so, Ach jetzt verstehe ich.",
  "domains/strategie/scenarios/01-nicht-verstanden.json d31: Ach so! Danke schön. → Ach schön so! Danke.",
  "domains/strategie/scenarios/01-nicht-verstanden.json d31: Ach so! Danke schön. → so! Ach Danke schön.",
  "m1/gun-01.json m1:01:s7: Danke, dann bis Samstag! → dann Danke, bis Samstag.",
  "m1/gun-07.json m1:07:s10: Nein, ich bin so müde. → so Nein, ich bin müde."
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
    // inceleme #259 P1-1: iki sözcüklü ön alan, baştaki gern/dann, öbek içi zamir, zamir ekseni
    expect(aciklanir("Seit Montag ich habe Fieber.", ["Ich habe seit Montag Fieber."])).toBe(false);
    expect(aciklanir("Am Sonntag ich kann nicht.", ["Am Sonntag kann ich nicht."])).toBe(false);
    expect(aciklanir("Gern ich hätte einen Termin.", ["Ich hätte gern einen Termin."])).toBe(false);
    expect(aciklanir("Dann ich gehe nach Hause.", ["Dann gehe ich nach Hause."])).toBe(false);
    expect(aciklanir("Morgen ich habe Zeit, danke.", ["Ich habe morgen Zeit."])).toBe(false);
    expect(aciklanir("Nach Hause heute ich gehe.", ["Ich gehe heute nach Hause."])).toBe(false);
    expect(aciklanir("Zeit keine ich habe heute.", ["Ich habe heute keine Zeit."])).toBe(false);
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
          if (drillVerdict(d, c, true).kind === "correct" && !aciklanir(c, d.accepted as string[]) && !ISTISNA.has(`${dosya} ${d.id}: ${a} → ${c}`)) kabul.push(`${dosya} ${d.id}: ${a} → ${c}`);
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
          if (ruleVerdict(m.accepted, c).kind === "correct" && !aciklanir(c, m.accepted) && !ISTISNA.has(`${m.dosya} ${m.id}: ${a} → ${c}`)) kabul.push(`${m.dosya} ${m.id}: ${a} → ${c}`);
        }
      }
    }
    expect(n).toBeGreaterThan(5_000);
    expect(kabul.sort(), "derecelendirici bu sıraları kabul ediyor ama hiçbir kural açıklamıyor (başlıktaki 1–3); doğru Almancaysa sırayı kabul listesine yaz, değilse web/ derecelendirici işi").toEqual([]);
  }, 300_000);
});
