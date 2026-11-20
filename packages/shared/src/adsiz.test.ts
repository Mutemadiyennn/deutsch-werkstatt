import { describe, it, expect } from "vitest";
import { z } from "zod";
import { adsizDenetle, adsizTasi } from "./adsiz.ts";

describe("B7 adsız biçim: taşıma", () => {
  const S = z.object({ lines: z.array(z.object({ de: z.string(), tr: z.string(), accepted: z.array(z.string()).optional() })) });
  const raw = { lines: [
    { de: "Guten Tag, hier ist {name}.", de_adsiz: "Guten Tag.", tr: "İyi günler, ben {name}.", tr_adsiz: "İyi günler.", accepted: ["Guten Tag, hier ist {name}."], accepted_adsiz: ["Guten Tag."] },
    { de: "Geht Dienstag?", tr: "Salı olur mu?" },
    { de: "x", tr: "x", yok_adsiz: "y" }
  ] };
  it("zod'un attığı _adsiz alanları asıl alan varsa geri konur", () => {
    const p = adsizTasi(raw, S.parse(raw)) as unknown as { lines: Record<string, unknown>[] };
    expect(p.lines[0]).toMatchObject({ de_adsiz: "Guten Tag.", tr_adsiz: "İyi günler.", accepted_adsiz: ["Guten Tag."] });
    expect(p.lines[1]).not.toHaveProperty("de_adsiz");
    // asıl alanı olmayan _adsiz taşınmaz (doğrulayıcıda "şemada olmayan alan" hatası olur)
    expect(p.lines[2]).not.toHaveProperty("yok_adsiz");
  });
});

describe("B7 adsız biçim: doğrulayıcı", () => {
  it("eksik biçim uyarı listesine, yanlış kullanım hataya", () => {
    const r = adsizDenetle({ a: { de: "Hallo {name}!", tr: "Merhaba {name}!", tr_adsiz: "Merhaba!" }, b: [{ de: "Ja.", de_adsiz: "Ja." }], c: { de: "Ich bin {name}.", de_adsiz: "Ich bin {name}." }, d: { accepted: ["{name}"], accepted_adsiz: "x" } });
    expect(r.eksik).toEqual(["a.de"]);
    expect(r.hata.some((h) => h.startsWith("b[0].de_adsiz") && h.includes("gereksiz"))).toBe(true);
    expect(r.hata.some((h) => h.startsWith("c.de_adsiz") && h.includes("ad yuvası var"))).toBe(true);
    expect(r.hata.some((h) => h.startsWith("d.accepted_adsiz") && h.includes("tür"))).toBe(true);
  });
});
