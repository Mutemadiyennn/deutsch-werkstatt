/**
 * İnceleme #168 1. tur: her bulgu için GERÇEK sözlük, dersler ve dünya üzerinde olumsuz test (AK-3 kapısı yanlış "bilinen" saymasın).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadContent, ROOT } from "./load.ts";
import { bilinmeyenler, bilinmeyenYazi, genelAdlarAyikla, kalipOrtu, kalipSecenekleri, kalipToks, kumeDizini, toks } from "../../packages/shared/src/kume.ts";

const c = loadContent();
const genel = genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8"));
const d = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genel, [...c.grammar, ...c.dn.flatMap((x) => x.data)]);
const yaz = (s: string, kart: string[], biten: string[] = [], kaliplar: string[] = []) =>
  bilinmeyenYazi(bilinmeyenler(d, s, { kart: new Set(kart), biten: new Set(biten), kaliplar: kaliplar.flatMap(kalipSecenekleri) }));
const var_ = (id: string) => c.lexemes.some((l) => l.id === id);

describe("AK-3 kapısı, gerçek içerik (inceleme #168 P1-2…P1-8)", () => {
  it("P1-3 harf büyüklüğü: cümle ortasında zarf 'morgen' yalnız lx:Morgen ile bilinmez; cümle başında zarf kartı yeter", () => {
    if (!var_("lx:Morgen") || !var_("lx:morgen")) return;
    expect(yaz("Ja, morgen.", ["lx:ja", "lx:Morgen"])).toContain("~morgen");
    expect(yaz("Ja, der Morgen.", ["lx:ja", "lx:morgen"])).toContain("~morgen");
    expect(yaz("Ja, morgen.", ["lx:ja", "lx:morgen"])).toEqual([]);
    expect(yaz("Morgen?", ["lx:morgen"])).toEqual([]);
  });
  it("P1-4 çok sözcüklü başlık parçaları tek tek bilinmez; bütün olarak bilinir", () => {
    if (!var_("lx:wie_viel")) return;
    expect(yaz("Viel! Wie?", ["lx:wie_viel"])).toEqual(expect.arrayContaining(["wie", "viel"].map((x) => expect.stringContaining(x))));
    expect(yaz("Wie viel?", ["lx:wie_viel"])).toEqual([]);
  });
  it("P1-5 (2. tur Y-1): dersin kalıbında kartsız çerçeve sözcüğü bilinir, kartlı sözcük yalnız kalıbın düz hâliyle ya da kendi kartıyla", () => {
    expect(yaz("Das ist gut.", [], ["r0:01-tage"]).join()).not.toContain("ist");
    expect(yaz("Einen Kaffee, bitte.", [], ["r0:07-fragewoerter"]).join()).toContain("bitte");
    expect(yaz("Um zehn.", [], ["r0:05-uhrzeit"]).join()).toContain("zehn");
  });
  it("P1-6 tablo hücresi: kendi kartı derse bağlı değilse bilinmez (r0:07 örnek cevapları, r0:10 şehir adları)", () => {
    for (const w of ["Termin", "Arbeit", "Woche"]) expect(yaz(w, [], ["r0:07-fragewoerter"]).join()).toContain(w.toLowerCase());
    expect(yaz("Wir essen.", [], ["r0:10-buchstabieren"]).join()).toContain("essen");
  });
  it("P1-7 ad kümesi: cins ad ve genel-adlar.md düz metni ad değil; kişi ve sokak adı ad", () => {
    for (const w of ["sprachkurs", "hausarztpraxis", "mietshaus", "abendkurs", "stadtplatz", "eklenen", "bilgiler", "ve", "ek"]) expect(d.adlar.has(w), w).toBe(false);
    for (const w of ["anna", "stadler", "brunnengasse"]) expect(d.adlar.has(w), w).toBe(true);
    expect(genel).not.toContain("Eklenen");
  });
  it("P1-8 yer tutucu: {name} sayılmaz, {a|b} iki seçeneğiyle sayılır", () => {
    expect(toks("Ich bin {Patient|Patientin} bei {name}.")).toEqual(["ich", "bin", "patient", "patientin", "bei"]);
    expect(yaz("{Herr|Frau} {name}", [])).toEqual(expect.arrayContaining(["frau"].map((x) => expect.stringContaining(x))));
  });
  it("P1-2 halka kalıbı yuvalı: 'Für …' yuvayı doldurmadan bilinmez, 'Guten Tag' bütün olarak", () => {
    expect(kalipOrtu(toks("Für Tobi"), kalipToks("Für …"))).toEqual([0]);
    expect(kalipOrtu(toks("Für"), kalipToks("Für …"))).toEqual([]);
    expect(kalipSecenekleri("Heute ist … – Ist heute …?").length).toBe(2);
    expect(yaz("Ist heute Montag?", ["lx:Montag"], [], ["Heute ist … – Ist heute …?"])).toEqual([]);
    expect(yaz("Ist morgen Montag?", ["lx:Montag"], [], ["Heute ist … – Ist heute …?"]).join()).toContain("morgen");
    expect(yaz("Guten Tag, Frau Huber!", ["lx:Frau"], [], ["Guten Tag"])).toEqual([]);
    // halka kalıbının kartsız sözcüğü (guten) bilinir; kartlı sözcük (Morgen) bilinmez
    expect(yaz("Guten Morgen!", [], [], ["Guten Tag"])).toEqual(["morgen"]);
  });
});

describe("dil noktası tablosu, gerçek grammar.json (#205 P1-1)", () => {
  const kart = ["lx:sein", "lx:haben", "lx:sprechen", "lx:Zeit", "lx:hier", "lx:Deutsch", "lx:ihr"].filter(var_);
  it("sein/haben ve sprechen tablosu sunulmadan çekim bilinmez; sunulunca bilinir", () => {
    if (!var_("lx:sein") || !var_("lx:haben") || !var_("lx:sprechen") || !c.grammar.some((g) => g.id === "gr:a1-02:t2")) return;
    for (const s of ["seid", "habt"]) expect(yaz(s, kart).length, s).toBeGreaterThan(0);
    expect(yaz("sprecht", kart).length).toBeGreaterThan(0);
    expect(yaz("seid habt", kart, ["gr:a1-02:t2"])).toEqual([]);
    expect(yaz("sprecht", kart, ["gr:a1-02:t4"])).toEqual([]);
    expect(yaz("sprichst", kart, ["gr:a1-02:t4"])).toEqual([]);
  });
});

describe("dil noktası tablosu ilgisiz karta bağlamaz (#205 2. tur P1-1b)", () => {
  const G = (id: string) => c.grammar.some((g) => g.id === id);
  const durum: [string, string[], string, string][] = [
    ["Wo ist die Bank?", ["lx:wo", "lx:sein"], "gr:a1-11:t1", "bank"],
    ["Mir tut der Zahn weh.", ["lx:weh"], "gr:a1-10:t1", "zahn"],
    ["Mir tut der Zahn weh.", ["lx:weh"], "gr:a1-10:t1", "tut"],
    ["Wenn die Sonne scheint.", ["lx:wenn"], "gr:a2-03:t1", "sonne"],
    ["Seit drei Jahren.", ["lx:seit", "lx:drei"], "gr:a1-08:t4", "jahren"],
    ["Ich will.", ["lx:Plan"], "gr:a1-09:t3", "will"],
    ["Nimm das!", ["lx:Wasser", "lx:Platz"], "gr:a1-10:t3", "nimm"],
    ["Trink Wasser!", ["lx:Wasser", "lx:Platz"], "gr:a1-10:t3", "trink"],
    ["Nehmt Platz!", ["lx:Wasser", "lx:Platz"], "gr:a1-10:t3", "nehmt"]
  ];
  for (const [cumle, kart, dn, soz] of durum) it(`${cumle} (${dn}) → ${soz} bilinmez`, () => {
    if (!G(dn)) return;
    expect(yaz(cumle, kart.filter(var_), [dn]).some((x) => x.replace(/^[~?]/, "") === soz)).toBe(true);
  });
});
