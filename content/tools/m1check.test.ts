import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Gun } from "../../packages/shared/src/m1.ts";
import { checkGun } from "./m1check.ts";
import { unknownKeys } from "./load.ts";

const raw = JSON.parse(readFileSync(join(import.meta.dirname, "fixtures/m1/gun-01.json"), "utf8"));
const ctx = { lexicon: new Set<string>(raw.yeni_kartlar), temel: new Set<string>(["r0:01-tage"]) };
const parse = (o: unknown) => Gun.parse(o);
const clone = () => structuredClone(raw);

describe("M1 gün biçimi (#58 A4, PM-053, PM-055)", () => {
  it("örnek gün şemaya uyar, bilinmeyen alan yok, denetimde 0 hata", () => {
    const g = parse(raw);
    expect(unknownKeys(raw, g)).toEqual([]);
    expect(checkGun(g, ctx).errors).toEqual([]);
    expect(g.video!.bolumler).toHaveLength(3);
  });
  it("çizimli sahne 'video' olamaz (PM-055)", () => {
    const r = clone(); r.video.gercek_insan = false;
    expect(Gun.safeParse(r).success).toBe(false);
    const r2 = clone(); delete r2.video.kaynak;
    expect(Gun.safeParse(r2).success).toBe(false);
  });
  it("dikte merdiveni: kolayda doğru seçenek cümlede, çeldirici cümlede değil; ortada boşluk cümleyi verir; zorda banka + 2 çeldirici", () => {
    const r = clone(); const d = r.video.bolumler[0].dikte;
    d[0].ans = 0; // çeldiriciyi doğru say
    d[1].accepted = ["Falsch"];
    d[2].banka = d[2].banka.slice(0, 3);
    const e = checkGun(parse(r), ctx).errors.join("\n");
    expect(e).toMatch(/doğru seçenek .* cümlede yok/);
    expect(e).toMatch(/boşluk doldurulunca cümle/);
    expect(e).toMatch(/bankada/);
  });
  it("usta/zor kabulü yalnızca aynı cümlenin yazımları; merdiven sırası korunur", () => {
    const r = clone(); const d = r.video.bolumler[0].dikte;
    d[3].accepted = [...d[3].accepted, "Ganz anderer Satz."];
    [d[0], d[1]] = [d[1], d[0]];
    const e = checkGun(parse(r), ctx).errors.join("\n");
    expect(e).toMatch(/başka bir cümle/);
    expect(e).toMatch(/merdiven sırası/);
  });
  it("bağlar: olmayan cümle, başka bölümün cümlesi, zaman sırası, prova düğümü", () => {
    const r = clone();
    r.video.bolumler[0].cumleler.push("s99");
    r.video.bolumler[0].golge = ["s14"];
    r.video.cumleler[3].t0 = 1;
    r.prova.dugumler[0].secenekler[0].sonraki = "n404";
    const e = checkGun(parse(r), ctx).errors.join("\n");
    expect(e).toMatch(/cümle s99 yok/);
    expect(e).toMatch(/gölge cümlesi s14 bu bölümde değil/);
    expect(e).toMatch(/zaman sırası bozuk/);
    expect(e).toMatch(/sonraki n404 yok/);
  });
  it("hizalanmamış video ve olmayan temel ders", () => {
    const r = clone(); for (const c of r.video.cumleler) { delete c.t0; delete c.t1; }
    r.dersler = ["r0:99-yok"];
    const out = checkGun(parse(r), ctx);
    expect(out.warnings.join("\n")).toMatch(/hizalanmamış/);
    expect(out.errors.join("\n")).toMatch(/r0:99-yok temel pakette yok/);
  });
});
