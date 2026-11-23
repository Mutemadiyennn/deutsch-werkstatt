/**
 * Kesin kelime tabloları (curriculum/[ab][12]-kesin.json) → uygulama paketinin `kesin.json`'ı (PM-100 md. 2): gün → {kartlar, dersler}.
 * 1.–7. gün `ogretilmis_sayilan.gunler`den (yalnız kart), sonrası `gunler[]`den. Uygulama bunu yalnız önceki günün dosyası pakette
 * YOKSA kullanır (doğrulayıcı ve hafta kapısıyla aynı kaynak). Biçim bozuksa hata (paket boş tabloyla derlenmez).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

export type KesinPaket = Record<string, { kartlar: string[]; dersler: string[] }>;

const KesinDosya = z.object({
  ogretilmis_sayilan: z.object({ gunler: z.record(z.string(), z.array(z.string())) }).partial().optional(),
  gunler: z.array(z.object({ day: z.number().int().min(1).max(364), kartlar: z.array(z.string()).default([]), dersler: z.array(z.string()).default([]) }).passthrough()).default([])
}).passthrough();

/** Tek tablonun günleri pakete eklenir; sonraki dosya (a2 → b1) aynı günü yazarsa üstüne yazar */
export function kesinEkle(paket: KesinPaket, ham: unknown, ad = "kesin"): KesinPaket {
  const t = KesinDosya.safeParse(ham);
  if (!t.success) throw new Error(`${ad}: kesin tablo okunamadı: ${t.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  for (const [g, k] of Object.entries(t.data.ogretilmis_sayilan?.gunler ?? {})) paket[g] ??= { kartlar: k, dersler: [] };
  for (const g of t.data.gunler) paket[String(g.day)] = { kartlar: g.kartlar, dersler: g.dersler };
  return paket;
}

/** `content/v2/curriculum` altındaki bütün kesin tablolar (ada göre sıralı: a1, a2, b1); yoksa boş */
export function kesinPaketi(kurDir: string): KesinPaket {
  const p: KesinPaket = {};
  for (const f of existsSync(kurDir) ? readdirSync(kurDir).filter((x) => /^[ab][12]-kesin\.json$/.test(x)).sort() : []) kesinEkle(p, JSON.parse(readFileSync(join(kurDir, f), "utf8")), f);
  return p;
}
