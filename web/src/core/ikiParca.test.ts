import { describe, expect, it } from "vitest";
import { boslukDoldur, boslukGorunumu, cevapParcalari, eskiDoldurma } from "./ikiParca.ts";
import { ruleVerdict } from "./answer.ts";

describe("iki parçalı boşluk (DENETİM-A1 P1-1, PM-148 [ANA-T] md. 1)", () => {
  const f = { de: "Ich ___ jetzt ___.", answer: "lege … auf" };
  it("her boşluk kendi parçasıyla, sırayla dolar", () => {
    expect(cevapParcalari("lege … auf")).toEqual(["lege", "auf"]);
    expect(boslukDoldur(f.de, f.answer)).toBe("Ich lege jetzt auf.");
    expect(boslukDoldur("___ du gern ___?", "Siehst … fern")).toBe("Siehst du gern fern?");
    expect(boslukDoldur("Ich komme ___.", "mit")).toBe("Ich komme mit.");
  });
  it("boşluk ve parça sayısı tutmazsa null (bozuk cümle kurulmaz)", () => {
    expect(boslukDoldur("Ich ___ jetzt.", "lege … auf")).toBeNull();
    expect(boslukDoldur("Ich lege jetzt auf.", "lege")).toBeNull();
  });
  it("eski doldurma denetimin gördüğü bozuk cümleyi verir (kayıtlı planı doğrusuna bağlamak için)", () => {
    expect(eskiDoldurma(f.de, f.answer)).toBe("Ich lege … auf jetzt lege … auf.");
  });
  it("görünüm: iki boşluk, araları biçimden; cevap iki parça sırayla", () => {
    const g = boslukGorunumu("Ich lege jetzt auf.", ["auflegen"], [{ de: "Er hat ___.", answer: "aufgelegt" }, f])!;
    expect(g.metin).toEqual(["Ich ", " jetzt ", "."]);
    expect(g.dogru).toEqual(["lege", "auf"]);
    for (const c of ["lege auf", "lege … auf", "lege ... auf", "Lege auf"]) expect(ruleVerdict(g.kabul, c).kind, c).toBe("correct");
    for (const c of ["lege", "auf lege", "auflegen"]) expect(ruleVerdict(g.kabul, c).kind, c).not.toBe("correct");
  });
  it("tek boşluklu biçim: eski davranış, kartın sözcüğü boş (inceleme #280 P2-1: boşluk yeri değişmez)", () => {
    const g = boslukGorunumu("Am Mittwoch rufe ich an.", ["Mittwoch", "Am"], [{ de: "Am ___ rufe ich an.", answer: "Mittwoch", also_ok: ["Dienstag"] }])!;
    expect(g.metin).toEqual(["", " Mittwoch rufe ich an."]);
    expect(g.kabul).toEqual(["Am"]);
  });
  it("iki parçalı biçimin eş anlamlı cevabı da kabul", () => {
    const g = boslukGorunumu("Ich lege jetzt auf.", [], [{ ...f, also_ok: ["lege … hin"] }])!;
    expect(g.kabul).toContain("lege hin");
  });
  it("biçimden gelmeyen cümle: eskisi gibi ilk eşleşen tek sözcük boş", () => {
    const g = boslukGorunumu("Ich komme morgen.", ["morgen"])!;
    expect(g.metin).toEqual(["Ich komme ", "."]);
    expect(g.dogru).toEqual(["morgen"]);
    expect(boslukGorunumu("Ich komme.", ["morgen"])).toBeNull();
  });
});
