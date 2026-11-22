/** Hedef 3 sekme çerçevesi (PM-084 md. 3): yeni adresler ve eski adreslerin yönlenmesi */
import { describe, expect, it } from "vitest";
import { parseHash, yeniAdres } from "./state.ts";
import { sekme } from "./ui/components.tsx";

describe("sekme adresleri", () => {
  it("dört sekmenin adresi kendi ekranını açar", () => {
    expect(parseHash("#/today").name).toBe("today");
    expect(parseHash("#/yol").name).toBe("yol");
    expect(parseHash("#/koy").name).toBe("koy");
    expect(parseHash("#/ben").name).toBe("ben");
    expect(parseHash("#/ben/ayarlar").name).toBe("profile");
  });
  it("eski adresler kırılmaz: yeni yerindeki ekranı açar", () => {
    expect(parseHash("#/learn").name).toBe("koy");
    expect(parseHash("#/progress").name).toBe("ben");
    expect(parseHash("#/profile").name).toBe("profile");
    expect(parseHash("#/learn/telefon")).toEqual({ name: "domain", id: "telefon" });
  });
  it("eski adres yenisine yönlenir; yeni ve alt adreslere dokunulmaz", () => {
    expect(yeniAdres("#/learn")).toBe("#/koy");
    expect(yeniAdres("#/learn/")).toBe("#/koy");
    expect(yeniAdres("#/progress")).toBe("#/ben");
    expect(yeniAdres("#/profile")).toBe("#/ben/ayarlar");
    for (const h of ["", "#/", "#/today", "#/yol", "#/koy", "#/ben", "#/ben/ayarlar", "#/learn/telefon", "#/scenario/x", "#/toString", "#/constructor"]) expect(yeniAdres(h)).toBeNull();
  });
  it("her ekran bir sekmeye bağlıdır", () => {
    expect(sekme("today")).toBe("today");
    expect(sekme("gorevler")).toBe("today");
    expect(sekme("yol")).toBe("yol");
    expect(sekme("rehber")).toBe("yol");
    for (const r of ["koy", "domain", "scenario", "sozluk", "kalip"] as const) expect(sekme(r)).toBe("koy");
    for (const r of ["ben", "profile", "ses"] as const) expect(sekme(r)).toBe("ben");
  });
});
