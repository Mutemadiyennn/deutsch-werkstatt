import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./load.ts";

// PM-036 A (#52 incelemesi): v1'de kurum adından arındırılan kayıt anahtarları veri kaybı olmadan taşınır
describe("v1 kursMig", () => {
  const src = readFileSync(join(ROOT, "app/legacy.html"), "utf8");
  const fn = /function kursMig\(st\)\{[\s\S]*?\n\}/.exec(src)?.[0];
  const kursMig = new Function(`${fn}; return kursMig;`)() as (s: Record<string, any>) => Record<string, any>;
  it("eski anahtarlar yeni adlara taşınır, yeni değer varsa korunur", () => {
    const r = kursMig({ ["v" + "hs"]: { lek: 5 }, ["v" + "hsNotes"]: ["n"], daily: { a: { ["v" + "hsprep"]: true, ["v" + "hspost"]: 1 }, b: { sinifprep: false, ["v" + "hsprep"]: true } } });
    expect(r).toEqual({ sinif: { lek: 5 }, sinifNotes: ["n"], daily: { a: { sinifprep: true, sinifpost: 1 }, b: { sinifprep: false } } });
  });
  it("dört yükleme yolu da kursMig ile sarılı", () => {
    expect(src.match(/S\.state\s*=\s*kursMig\(/g)?.length).toBe(4);
    expect(src.match(/S\.state\s*=\s*\{\.\.\.DEFAULT_STATE/g)).toBeNull();
  });
});
