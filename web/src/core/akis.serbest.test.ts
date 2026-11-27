/** PM-148 [ANA-V] md. 1: serbest konuşma adımı planlayıcıda (bayrak, yer, gösterim kapısı). Ayrı dosya: akis.test.ts [ANA-T]'de */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Halka, SerbestKonus, genelAdlarAyikla, kumeDizini } from "@dw/shared";
import { loadContent, ROOT } from "../../../content/tools/load.ts";
import POLICY from "../policy.json" with { type: "json" };
import { KIP, planGun, POLITIKA, SERBEST_KONUS, type PlanGirdi } from "./akis.ts";

const c = loadContent();
const genel = genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8"));
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genel);
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const g1 = c.m1.find((x) => x.data.day === 1)!.data;
const halkalar = z.array(Halka).parse(JSON.parse(readFileSync(join(ROOT, "docs/v2/reviews/halka/gun-01-halkalar.json"), "utf8")).halkalar);
const madde = (id: string, soru_de?: string) => SerbestKonus.parse({
  id, durum_tr: "Kursta biri seninle tanışmak istiyor.", gorev_tr: "Adını ve nasıl olduğunu söyle.", ...(soru_de ? { soru_de } : {}),
  hedefler: [
    { id: "h1", tr: "adını söyle", kaliplar: ["Ich heiße ___.", "Mein Name ist ___.", "Ich bin ___."], yuva: "name" },
    { id: "h2", tr: "selam ver", kaliplar: ["Hallo.", "Guten Tag.", "Guten Morgen."] }
  ],
  ornek_de: "Hallo. Ich heiße {name}.", ornek_tr: "Merhaba. Benim adım …."
});
const gun = { ...g1, halkalar, serbest_konus: [madde("m1:01:k1", "Hallo!"), madde("m1:01:k2")] };
const girdi = (ek: Partial<PlanGirdi> = {}): PlanGirdi =>
  ({ gun, dersler, dizin, items: new Map(), oncekiKartlar: new Set(), bitenDersler: new Set(), tohum: "akis:1", simdi: new Date("2026-12-01T08:00:00Z"), ...ek });

describe("serbest konuşma (PM-148)", () => {
  it("bayrak kapalı iner (PM-135 ek 14) ve kapalıyken plana girmez", () => {
    expect(POLICY.serbest_konus.acik).toBe(false);
    const p = planGun(girdi())!;
    expect(p.duraklar.flatMap((d) => d.adimlar).some((a) => a.tur === "serbest_konus")).toBe(false);
  });
  it("bayrak açıkken maddeler gün sonu durağının başında, sırayla; kip söyle, kart yok, cümle yok", () => {
    const p = planGun(girdi({ serbestKonus: true }))!;
    const gs = p.duraklar.at(-1)!;
    expect(gs.tur).toBe("gunsonu");
    expect(gs.adimlar.slice(0, 2).map((a) => a.ders)).toEqual([{ id: SERBEST_KONUS, oge: "m1:01:k1" }, { id: SERBEST_KONUS, oge: "m1:01:k2" }]);
    for (const a of gs.adimlar.slice(0, 2)) { expect(a.kip).toBe(KIP.serbest_konus); expect(a.kip).toBe("soyle"); expect(a.kartlar).toEqual([]); expect(a.cumle).toBeUndefined(); expect(a.sn).toBe(POLITIKA.adim_sn.serbest_konus); }
    expect(gs.adimlar[0]!.satirlar).toEqual(["Hallo!"]);
    expect(gs.adimlar[1]!.satirlar).toBeUndefined();
    // başka durakta yok; gün sonu süresi adımı sayar
    expect(p.duraklar.slice(0, -1).flatMap((d) => d.adimlar).some((a) => a.tur === "serbest_konus")).toBe(false);
    const kapali = planGun(girdi())!;
    expect(gs.tahmini_dk).toBeGreaterThan(kapali.duraklar.at(-1)!.tahmini_dk);
  });
  it("açılış sorusu gösterim kapısından geçmezse madde konmaz (öğretilmeden istenen 0)", () => {
    const g = { ...gun, serbest_konus: [madde("m1:01:k1", "Entschuldigung, wohnen Sie schon lange in Oberwiesing und arbeiten Sie im Rathaus?")] };
    const p = planGun(girdi({ gun: g, serbestKonus: true }))!;
    expect(p.duraklar.flatMap((d) => d.adimlar).some((a) => a.tur === "serbest_konus")).toBe(false);
  });
  it("maddesi olmayan gün bayrak açıkken de değişmez", () => {
    const { serbest_konus: _, ...yok } = gun;
    const a = planGun(girdi({ gun: yok, serbestKonus: true }))!, b = planGun(girdi({ gun: yok }))!;
    expect(a).toEqual(b);
  });
});
