import { describe, it, expect } from "vitest";
import { personalizeDeep } from "./persona.ts";

describe("B7: ad yoksa adsız biçim", () => {
  const x = { de: "Guten Tag, hier ist {name}. Geht Dienstag?", de_adsiz: "Guten Tag. Geht Dienstag?", tr: "İyi günler, ben {name}.", tr_adsiz: "İyi günler.",
    accepted: ["Guten Tag, hier ist {name}."], accepted_adsiz: ["Guten Tag."], hitap: "{Herr|Frau} Wimmer" };
  it("adsız profil: yuva görünmez, _adsiz alanı çıktıda kalmaz", () => {
    const o = personalizeDeep(x, {}) as Record<string, unknown>;
    expect(o.de).toBe("Guten Tag. Geht Dienstag?");
    expect(o.tr).toBe("İyi günler.");
    // adsız biçim önce; asıl biçim de kalır (öğrenci kendi adını yazarsa fillName doldurur)
    expect(o.accepted).toEqual(["Guten Tag.", "Guten Tag, hier ist {name}."]);
    expect(Object.keys(o).some((k) => k.endsWith("_adsiz"))).toBe(false);
    expect(JSON.stringify(o)).not.toContain("(adın)");
  });
  it("adlı profil: asıl biçim adla", () => {
    const o = personalizeDeep(x, { name: "Ayşe", address: "Frau" }) as Record<string, unknown>;
    expect(o.de).toBe("Guten Tag, hier ist Ayşe. Geht Dienstag?");
    expect(o.accepted).toEqual(["Guten Tag, hier ist Ayşe."]);
    expect(o.hitap).toBe("Frau Wimmer");
  });
  it("adsız biçimi olmayan alan eskisi gibi (adın)", () => {
    expect((personalizeDeep({ de: "Ich bin {name}." }, {}) as { de: string }).de).toBe("Ich bin (adın).");
  });
});
