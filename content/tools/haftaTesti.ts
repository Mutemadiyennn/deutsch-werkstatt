/**
 * Hafta sonu testleri (PM-108 B md. 2, PR B-3): `content/v2/m1/hafta-sonu-testi-HH.json` (1. hafta eski adla `hafta-sonu-testi.json`)
 * → hafta → { id, maddeler }. Uygulama haftanın son günü bitince kupa düğümünden açar (`#/hafta/<H>`).
 * Okunamayan ya da biçimi bozuk dosya HATA (sessizce düşmez; derleme durur). İnceleme alanı ve notlar pakete girmez.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Drill } from "../../packages/shared/src/content.ts";

export const HaftaTestiDosya = z.object({ id: z.string(), maddeler: z.array(Drill).min(1) });
export type HaftaTestiPaket = Record<string, { id: string; maddeler: Drill[] }>;

export function haftaTestleri(m1Kok: string): HaftaTestiPaket {
  if (!existsSync(m1Kok)) return {};
  const out: HaftaTestiPaket = {};
  for (const f of readdirSync(m1Kok).sort()) {
    const m = /^hafta-sonu-testi(?:-(\d{2}))?\.json$/.exec(f);
    if (!m) continue;
    const hafta = m[1] ? Number(m[1]) : 1;
    if (hafta < 1 || hafta > 52) throw new Error(`${f}: hafta 1–52 olmalı`);
    const r = HaftaTestiDosya.safeParse(JSON.parse(readFileSync(join(m1Kok, f), "utf8")));
    if (!r.success) throw new Error(`${f}: hafta sonu testi biçimi bozuk: ${r.error.issues.slice(0, 3).map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    // iki ad aynı haftayı verirse (hafta-sonu-testi.json + hafta-sonu-testi-01.json) yeni ad kazanır
    if (out[String(hafta)] && !m[1]) continue;
    out[String(hafta)] = { id: r.data.id, maddeler: r.data.maddeler };
  }
  return out;
}
