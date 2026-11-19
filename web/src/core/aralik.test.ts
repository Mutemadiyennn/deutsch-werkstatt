import { describe, it, expect } from "vitest";
import { Lexeme, type LearnerItem } from "@dw/shared";
import { buildRound, ertele, kopruGerek, ARALIK, type GardenQ } from "./garden.ts";
import { review, sessionKey } from "./srs.ts";

const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
const isim = (n: number) => L({ id: `lx:W${n}`, de: `Wort${n}`, tr: `kelime${n}`, pos: "noun", art: "das", img: "x",
  collocations: [{ de: `das Wort${n} sagen`, tr: "söylemek" }], examples: [{ id: "e1", de: `Das Wort${n} ist hier.`, tr: "Burada." }] });

/** Turu öğrenci gibi yürür: tanıtım bitince ilk soru ertelenir (Garden.tanitimBitti ile aynı işlev) */
function yuru(round: GardenQ[]): GardenQ[] {
  let r = round, i = 0;
  const sira: GardenQ[] = [];
  while (i < r.length) { const q = r[i]!; sira.push(q); if (q.intro) r = ertele(r, i, q.ex); i++; }
  return sira;
}

describe("PM-069 madde 3: tanıtım ile ilk soru arası", () => {
  it("10 yeni kart: her kartın ilk sorusu tanıtımından en az 2 öğe sonra; her kart tam bir kez sorulur", () => {
    const kartlar = Array.from({ length: 10 }, (_, k) => isim(k));
    const lex = new Map(kartlar.map((l) => [l.id, l]));
    const sira = yuru(buildRound(lex, new Map(), kartlar.map((l) => l.id), { rng: () => 0 }));
    for (const l of kartlar) {
      const t = sira.findIndex((q) => q.lexId === l.id && q.intro), s = sira.findIndex((q) => q.lexId === l.id && q.ilkSoru);
      expect(t).toBeGreaterThanOrEqual(0); expect(s).toBeGreaterThan(t);
      // son iki kart dışında (tur sonunda araya girecek öğe kalmaz) en az ARALIK öğe arada
      if (t < sira.length - 2 * ARALIK) expect(s - t - 1).toBeGreaterThanOrEqual(ARALIK);
      expect(sira.filter((q) => q.lexId === l.id && q.ilkSoru)).toHaveLength(1);
    }
    expect(sira.length).toBe(20);
    // tanıtımdan hemen sonra aynı kartın sorusu hiç gelmez
    for (let k = 1; k < sira.length; k++) expect(sira[k]!.ilkSoru && sira[k - 1]!.intro && sira[k - 1]!.lexId === sira[k]!.lexId).toBeFalsy();
  });
  it("az yeni kartlı turda (1 ya da 2 yeni + 9 tekrar) da ilk soru tanıtımdan en az 2 öğe sonra (inceleme #126 P1-1)", () => {
    const t0 = new Date(Date.now() - 60 * 864e5);
    const tekrar = Array.from({ length: 9 }, (_, k) => isim(100 + k));
    const items = new Map<string, LearnerItem>();
    for (const l of tekrar) {
      const p = review(undefined, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "correct", session: "g@1", source: "drill", ctx: "listen_meaning" }, t0);
      items.set(l.id, review({ ...p, lastQ: "article" }, { itemId: l.id, kind: "lexeme", path: "active", outcome: "correct", session: "g@1", source: "drill", ctx: "tr_de" }, t0));
    }
    for (const n of [1, 2]) {
      const yeni = Array.from({ length: n }, (_, k) => isim(k));
      const lex = new Map([...tekrar, ...yeni].map((l) => [l.id, l]));
      const tur = buildRound(lex, items, yeni.map((l) => l.id), { rng: () => 0, newMax: n });
      expect(tur.filter((q) => q.intro)).toHaveLength(n);
      const sira = yuru(tur);
      for (const l of yeni) {
        const t = sira.findIndex((q) => q.lexId === l.id && q.intro), s = sira.findIndex((q) => q.lexId === l.id && q.ilkSoru);
        expect(s - t - 1).toBeGreaterThanOrEqual(ARALIK);
      }
    }
  });
  it("ertele: ilk soru tanıtımda en son gösterilen cümleyle; tur kısaysa sona", () => {
    const r: GardenQ[] = [{ lexId: "a", type: "listen_meaning", intro: true, ex: 0 }];
    expect(ertele(r, 0, 3)).toEqual([r[0], { lexId: "a", type: "listen_meaning", ex: 3, ilkSoru: true }]);
  });
  it("ilk üretim sorusundan (tr_de) önce artikel ya da eşdizim seçmeli gelir", () => {
    const l = isim(1), lex = new Map([[l.id, l]]);
    const s = sessionKey("garden", Date.now());
    let it: LearnerItem = review(undefined, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "correct", session: s, source: "drill", ctx: "listen_meaning" });
    it.lastQ = "listen_meaning";
    expect(kopruGerek(it, l)).toBe(true);
    const r1 = buildRound(lex, new Map([[l.id, it]]), [], { rng: () => 0, now: new Date(Date.now() + 864e5) });
    expect(r1.map((q) => q.type)).toEqual(["article"]);
    // köprü cevaplandı → sıradaki turda üretim
    it = review(it, { itemId: l.id, kind: "lexeme", path: "passive", outcome: "correct", session: s, source: "drill", ctx: "article" });
    it.lastQ = "article";
    expect(kopruGerek(it, l)).toBe(false);
    const r2 = buildRound(lex, new Map([[l.id, it]]), [], { rng: () => 0, now: new Date(Date.now() + 864e5) });
    expect(r2[0]!.type).toBe("tr_de");
  });
});
