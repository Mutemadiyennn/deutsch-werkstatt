import { describe, expect, it } from "vitest";
import { mkdtempSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { beceriEsle, haftaBecerileri, haftaTestleri } from "./haftaTesti.ts";
import { existsSync, readFileSync } from "node:fs";
import { loadContent, ROOT } from "./load.ts";
import { genelAdlarAyikla } from "../../packages/shared/src/index.ts";
import { Lexeme } from "../../packages/shared/src/content.ts";
import { kumeDizini } from "../../packages/shared/src/kume.ts";

const madde = (id: string) => ({ id, k: "tr_de", tr: "Merhaba.", accepted: ["Hallo.", "Guten Tag.", "Hallo!"] });
const kok = (dosyalar: Record<string, unknown>) => { const d = mkdtempSync(join(tmpdir(), "ht-")); for (const [f, v] of Object.entries(dosyalar)) writeFileSync(join(d, f), typeof v === "string" ? v : JSON.stringify(v)); return d; };

describe("hafta sonu testleri (PR B-3)", () => {
  it("eski ad 1. hafta, HH adı o hafta; inceleme alanı pakete girmez", () => {
    const p = haftaTestleri(kok({ "hafta-sonu-testi.json": { id: "m1:hafta-sonu-testi", day: 7, maddeler: [madde("a")] }, "hafta-sonu-testi-05.json": { id: "m1:hafta-sonu-testi:05", day: 35, review: { status: "draft" }, maddeler: [madde("b")] }, "gun-01.json": {} }));
    expect(Object.keys(p).sort()).toEqual(["1", "5"]);
    expect(p["5"]).toEqual({ id: "m1:hafta-sonu-testi:05", maddeler: [madde("b")] });
  });
  it("HH adı eski adı geçersiz kılar", () => {
    const p = haftaTestleri(kok({ "hafta-sonu-testi.json": { id: "eski", maddeler: [madde("a")] }, "hafta-sonu-testi-01.json": { id: "yeni", maddeler: [madde("b")] } }));
    expect(p["1"]!.id).toBe("yeni");
  });
  it("bozuk biçim hata (sessizce düşmez)", () => {
    expect(() => haftaTestleri(kok({ "hafta-sonu-testi-02.json": { id: "x", maddeler: [{ id: "a", k: "yok" }] } }))).toThrow(/biçimi bozuk/);
    expect(() => haftaTestleri(kok({ "hafta-sonu-testi-02.json": "{" }))).toThrow();
  });
  it("klasör yoksa boş", () => { expect(haftaTestleri("/yok/boyle/bir/yer")).toEqual({}); });
});

describe("test maddesi → 'yapabiliyorum' cümlesi (#243 PM finali takip a)", () => {
  const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
  const d = kumeDizini([L({ id: "lx:hallo", de: "hallo", pos: "particle" }), L({ id: "lx:Montag", de: "Montag", pos: "noun", art: "der" }), L({ id: "lx:Mai", de: "Mai", pos: "noun", art: "der" }), L({ id: "lx:im", de: "im", pos: "other" })], [], null, []);
  const gun = (day: number, kart: string[]) => ({ day, can_do: { id: `cd:m1:0${day}`, tr: `${day}. cümle` }, yeni_kartlar: kart, dersler: [] });
  const G = [gun(1, ["lx:hallo"]), gun(2, ["lx:Montag"]), gun(3, ["lx:Mai", "lx:im"])];
  const m = (id: string, accepted: string[], ek: Record<string, unknown> = {}) => ({ id, k: "guided_response", situation_tr: "x", accepted, ...ek }) as never;
  it("cevabın kart sözcüklerinin hepsinin tanıtıldığı ilk gün; soru metni sayılmaz; seçmede doğru şık; bağlanamayan son güne (yedek)", () => {
    const r = beceriEsle([m("a", ["Hallo!"]), m("b", ["Montag."], { prompt_de: "Im Mai?" }), m("c", ["Quatsch."]), m("e", ["3 5", "Im Mai.", "Hallo."]),
      m("p", [], { k: "gap", de: "Es ist ___.", opts: ["Montag", "Mai"], ans: 1 })], G, d);
    expect(r.beceriler).toEqual([
      { gun: 1, id: "cd:m1:01", tr: "1. cümle", maddeler: ["a"] },
      { gun: 2, id: "cd:m1:02", tr: "2. cümle", maddeler: ["b"] },
      { gun: 3, id: "cd:m1:03", tr: "3. cümle", maddeler: ["c", "e", "p"] }
    ]);
    expect(r.yedek).toEqual(["c"]);
    expect(r.turetilen).toEqual(["a", "b", "c", "e", "p"]);
  });
  it("açık bağ (`can_do`) türetmeyi geçer; haftada olmayan kimlik hata", () => {
    const r = beceriEsle([m("a", ["Hallo!"])], G, d, { a: "cd:m1:02" });
    expect(r.beceriler[0]).toMatchObject({ gun: 2, maddeler: ["a"] });
    expect(r.turetilen).toEqual([]);
    expect(() => beceriEsle([m("a", ["Hallo!"])], G, d, { a: "cd:m1:09" })).toThrow(/bu haftanın günlerinde yok/);
  });
  it("önceki haftanın kartı bu haftaya bağlamaz (yedek); açık bağ dosyadan okunur, doğrulayıcı yolu hatayı toplar", () => {
    const r = beceriEsle([m("a", ["Montag."]), m("b", ["Montag, Mai."])], [gun(3, ["lx:Mai"])], d, {}, { kart: ["lx:Montag"], ders: [] });
    expect(r.yedek).toEqual(["a"]);
    expect(r.beceriler[0]).toMatchObject({ gun: 3, maddeler: ["a", "b"] });
    const p = haftaTestleri(kok({ "hafta-sonu-testi-02.json": { id: "x", maddeler: [{ ...madde("a"), can_do: "cd:m1:09" }, madde("b")] } }));
    expect(p["2"]!.bag).toEqual({ a: "cd:m1:09" });
    expect(p["2"]!.maddeler[0]).not.toHaveProperty("can_do");
    const v = haftaBecerileri(p, [gun(8, [])], {}, d);
    expect(v.hatalar[0]).toMatch(/cd:m1:09/);
  });
});

describe("gerçek 1. hafta testi (inceleme #244 P1-1)", () => {
  it("ay maddesi ayın gününe, numara maddesi sayı gününe; bağlanamayan yok", () => {
    const c = loadContent();
    const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
    const dz = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : [], [...c.grammar, ...c.dn.flatMap((x) => x.data)] as never);
    const t = haftaTestleri(join(ROOT, "content/v2/m1"))["1"]!;
    const r = beceriEsle(t.maddeler, c.m1.map((g) => g.data).filter((g) => g.day <= 7), dz, t.bag);
    const gunu = (id: string) => r.beceriler.find((b) => b.maddeler.includes(id))?.gun;
    expect(r.yedek).toEqual([]);
    if (!t.bag?.["m1:07:t12"]) expect(gunu("m1:07:t12")).toBe(2);   // Im Mai
    if (!t.bag?.["m1:07:t11"]) expect(gunu("m1:07:t11")).toBe(3);   // Null drei fünf sieben
    if (!t.bag?.["m1:07:t06"]) expect(gunu("m1:07:t06")).toBe(6);   // der dritte Mai
  });
});
