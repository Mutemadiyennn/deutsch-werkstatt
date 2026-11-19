import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { TemelDers } from "@dw/shared";
import { adimlarDers, altSayisi, dersIleri, dersKonum, maddeler, DERS_BASLANGIC } from "./ders.ts";
import { drillVerdict } from "../ui/drill.tsx";

const dir = join(import.meta.dirname, "../../../content/v2/temel");
const dersler = readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => TemelDers.parse(JSON.parse(readFileSync(join(dir, f), "utf8"))));
const t = dersler.find((d) => d.id === "r0:01-tage")!;

describe("Temel ders akışı (#58 A5)", () => {
  it("adımlar: tanıt → tablo → anla → kur → söyle → diyalog → dinle → görev; her madde bir kez", () => {
    expect(adimlarDers(t)).toEqual(["tanit", "tablo", "anlama", "kurma", "konusma", "diyalog", "dinleme", "gorev"]);
    const n = maddeler(t, "anlama").length + maddeler(t, "kurma").length + maddeler(t, "konusma").length;
    expect(n).toBe(t.drills.length);
    expect(maddeler(t, "kurma").map((d) => d.k)[0]).toBe("gap");
  });
  it("ilerleme sonda biter; sayaç yalnızca puanlanan adımda artar; uyuşmayan konum baştan", () => {
    let p = { ...DERS_BASLANGIC }, steps = 0;
    while (!p.bitti && steps < 500) { const a = adimlarDers(t)[p.s]!; p = dersIleri(p, t, ["anlama", "kurma", "konusma", "dinleme"].includes(a) ? true : undefined); steps++; }
    expect(p.bitti).toBeTruthy();
    expect(p.toplam).toBe(t.drills.length + t.listening.length);
    expect(dersKonum({ s: 99, k: 0, dogru: 0, toplam: 0 }, t)).toEqual(DERS_BASLANGIC);
    expect(altSayisi(t, "tanit")).toBe(Math.ceil(t.teach.length / 6));
  });
  it("her dersin her üretim maddesinde ilk kabul cevabı doğru sayılıyor (doğru cevap reddi 0)", () => {
    const red: string[] = [];
    for (const d of dersler) for (const m of d.drills) {
      if (m.k === "pick") continue;
      const a = m.accepted[0]!.replace(/\{name\}/g, "Ayşe").replace(/\{[^|}]+\|([^}]+)\}/g, "$1");
      const v = drillVerdict({ ...m, accepted: m.accepted.map((x) => x.replace(/\{name\}/g, "Ayşe").replace(/\{[^|}]+\|([^}]+)\}/g, "$1")) } as typeof m, a);
      if (v.kind !== "correct") red.push(`${m.id}: ${a}`);
    }
    expect(red).toEqual([]);
  });
  it("yanlış cevap doğru sayılmıyor; dönüşümde verilen cümle tekrarı yanlış; rakam kuralı yalnızca yazıda", () => {
    const tr = t.drills.find((d) => d.k === "tr_de")!;
    expect(drillVerdict(tr, "Katze").kind).not.toBe("correct");
    const tf = t.drills.find((d) => d.k === "transform")!;
    if (tf.k === "transform") expect(drillVerdict(tf, tf.from_de).kind).toBe("wrong");
    const num = { id: "x", k: "tr_de" as const, tr: "yirmi", accepted: ["zwanzig"], strictNumberWords: true };
    expect(drillVerdict(num, "20").note).toMatch(/kelimeyle/);
    expect(drillVerdict(num, "20", false).note).toBeUndefined();
  });
});
