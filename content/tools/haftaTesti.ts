/**
 * Hafta sonu testleri (PM-108 B md. 2, PR B-3): `content/v2/m1/hafta-sonu-testi-HH.json` (1. hafta eski adla `hafta-sonu-testi.json`)
 * → hafta → { id, maddeler }. Uygulama haftanın son günü bitince kupa düğümünden açar (`#/hafta/<H>`).
 * Okunamayan ya da biçimi bozuk dosya HATA (sessizce düşmez; derleme durur). İnceleme alanı ve notlar pakete girmez.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Drill } from "../../packages/shared/src/content.ts";
import { bilinmeyenler, type KumeDizini } from "../../packages/shared/src/kume.ts";

export const HaftaTestiDosya = z.object({ id: z.string(), maddeler: z.array(Drill).min(1) });
/** Test maddesinin sınadığı "yapabiliyorum" cümlesi (#243 PM finali takip a): haftanın bir gününün `can_do` kimliği */
export interface Beceri { gun: number; id: string; tr: string; maddeler: string[] }
export type HaftaTestiPaket = Record<string, { id: string; maddeler: Drill[]; /** kaynak dosyadaki açık `can_do` bağları (madde → kimlik) */ bag?: Record<string, string>; beceriler?: Beceri[] }>;

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
    // açık bağ: maddenin isteğe bağlı `can_do` alanı (Drill şeması onu atar; ham dosyadan okunur)
    const ham = JSON.parse(readFileSync(join(m1Kok, f), "utf8")) as { maddeler: { id?: unknown; can_do?: unknown }[] };
    const bag = Object.fromEntries(ham.maddeler.filter((m) => typeof m.can_do === "string" && typeof m.id === "string").map((m) => [m.id as string, m.can_do as string]));
    out[String(hafta)] = { id: r.data.id, maddeler: r.data.maddeler, ...(Object.keys(bag).length ? { bag } : {}) };
  }
  return out;
}

/** Beceri eşlemesi için günün gereken alanları */
export interface BeceriGunu { day: number; can_do: { id: string; tr: string }; yeni_kartlar: string[]; dersler: string[] }

/** Maddenin soru metinleri (anlaşılması gereken) ve beklenen cevap adayları (en az biri kurulabilmeli) */
function metinler(m: Drill): { soru: string[]; aday: string[] } {
  const o = m as Record<string, unknown>;
  const yazi = (x: unknown) => (typeof x === "string" && x.trim() ? [x] : []);
  const soru = [...yazi(o.audio_de), ...yazi(o.prompt_de), ...yazi(o.from_de)];
  const acc = (Array.isArray(o.accepted) ? o.accepted : []).filter((x): x is string => typeof x === "string").slice(0, 60);
  const de = typeof o.de === "string" ? o.de : "";
  const aday = /_{3,}/.test(de) ? acc.map((a) => de.replace(/_{3,}/, a)) : acc;
  return { soru, aday };
}

/**
 * Test maddelerini haftanın "yapabiliyorum" cümlelerine bağlar (#243 PM finali takip a). Önce açık bağ (`can_do` alanı; haftada
 * olmayan kimlik HATA). Yoksa yapay zekâsız türetme: maddenin ilk çözülebildiği gün — o güne kadarki kartlar ve derslerle soru
 * metni bütünüyle bilinir ve kabul adaylarından en az biri kurulabilir (kume.ts `bilinmeyenler`). Hiçbir gün yetmezse haftanın
 * son günü. Önceki haftaların kartları ve dersleri `onceki` ile verilir.
 */
export function beceriEsle(maddeler: Drill[], gunler: BeceriGunu[], d: KumeDizini, bag: Record<string, string> = {}, onceki: { kart: string[]; ders: string[] } = { kart: [], ders: [] }): Beceri[] {
  const sirali = [...gunler].sort((a, b) => a.day - b.day);
  if (!sirali.length) return [];
  const cdGun = new Map(sirali.map((g) => [g.can_do.id, g] as const));
  const bilgi = sirali.map((_, i) => ({
    kart: new Set([...onceki.kart, ...sirali.slice(0, i + 1).flatMap((g) => g.yeni_kartlar)]),
    biten: new Set([...onceki.ders, ...sirali.slice(0, i + 1).flatMap((g) => g.dersler)])
  }));
  const gunOf = new Map<string, BeceriGunu>();
  for (const m of maddeler) {
    const acik = bag[m.id];
    if (acik !== undefined) {
      const g = cdGun.get(acik);
      if (!g) throw new Error(`hafta sonu testi ${m.id}: can_do "${acik}" bu haftanın günlerinde yok (${[...cdGun.keys()].join(", ")})`);
      gunOf.set(m.id, g); continue;
    }
    const { soru, aday } = metinler(m);
    const i = bilgi.findIndex((k) => soru.every((q) => !bilinmeyenler(d, q, k).length) && aday.some((a) => !bilinmeyenler(d, a, k).length));
    gunOf.set(m.id, sirali[i >= 0 ? i : sirali.length - 1]!);
  }
  return sirali.filter((g) => [...gunOf.values()].includes(g))
    .map((g) => ({ gun: g.day, id: g.can_do.id, tr: g.can_do.tr, maddeler: maddeler.filter((m) => gunOf.get(m.id) === g).map((m) => m.id) }));
}
