/**
 * K(t) kesin tablodan tamamlama (PM-092 md. 3.2, PM-100 md. 2, PM-102 md. 1). Saf okuma; kural:
 *  - Bir günün K(t)'si önceki günlerin `yeni_kartlar`ından ve `dersler`inden kurulur. Önceki günün DOSYASI VARSA dosya esastır.
 *  - Önceki günün dosyası dalda YOKSA (paralel hatlar birbirinin haftasını beklemez) o günün kartları, çerçeve sözcükleri ve
 *    dersleri kesin tablodan alınır: `curriculum/a1-kesin.json`, `a2-kesin.json`, `b1-kesin.json` (hangisi varsa).
 *    1.–7. gün: a1 `ogretilmis_sayilan.gunler` (yalnız kartlar); sonrası `gunler[]` (`kartlar`, `cerceve`, `dersler`).
 *    Haftanın `haftalar[].cerceve` listesinde olup hiçbir günde geçmeyen çerçeve sözcüğü o haftanın SON gününe yazılır.
 *  - Tabloda olmayan sözcük tablodan gelmez: gerçek hata yine yakalanır.
 * Aynı kaynağı doğrulayıcının halka denetimi (halka.ts) ve "öğretilmemiş kelime" kümesi (load.ts) kullanır.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface TabloGun { day: number; kartlar: string[]; cerceve: string[]; dersler: string[]; kaynak: string }
export type KesinTablo = Map<number, TabloGun>;
export const KESIN_DOSYALAR = ["a1-kesin.json", "a2-kesin.json", "b1-kesin.json"] as const;

const dizi = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const yazilar = (x: unknown): string[] => dizi(x).filter((y): y is string => typeof y === "string");
const nesne = (x: unknown): Record<string, unknown> => (x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : {});
const haftaOf = (gun: number) => Math.ceil(gun / 7);

/** Bir tablo nesnesini gün haritasına ekler (aynı gün iki tabloda varsa hata) */
export function tabloEkle(m: KesinTablo, ham: unknown, kaynak: string, errors: string[]): void {
  const t = nesne(ham);
  const koy = (g: TabloGun) => {
    const once = m.get(g.day);
    if (once && once.kaynak !== kaynak) { errors.push(`${kaynak}: ${g.day}. gün ${once.kaynak} içinde de var`); return; }
    m.set(g.day, g);
  };
  for (const [k, v] of Object.entries(nesne(nesne(t.ogretilmis_sayilan).gunler))) {
    const day = Number(k); if (Number.isInteger(day) && day >= 1) koy({ day, kartlar: yazilar(v), cerceve: [], dersler: [], kaynak });
  }
  const gunlu = new Set<string>();
  for (const g0 of dizi(t.gunler)) {
    const g = nesne(g0); if (typeof g.day !== "number" || !Number.isInteger(g.day) || g.day < 1) continue;
    const cerceve = yazilar(g.cerceve); for (const c of cerceve) gunlu.add(`${haftaOf(g.day)}|${c}`);
    koy({ day: g.day, kartlar: yazilar(g.kartlar), cerceve, dersler: yazilar(g.dersler), kaynak });
  }
  // haftanın çerçeve listesinde olup hiçbir güne yazılmamış sözcük: haftanın son günü (hafta bitince bilinir)
  for (const h0 of dizi(t.haftalar)) {
    const h = nesne(h0); if (typeof h.no !== "number") continue;
    const kalan = yazilar(h.cerceve).filter((c) => !gunlu.has(`${h.no}|${c}`)); if (!kalan.length) continue;
    const son = h.no * 7, g = m.get(son);
    if (g) g.cerceve = [...new Set([...g.cerceve, ...kalan])];
    else koy({ day: son, kartlar: [], cerceve: kalan, dersler: [], kaynak });
  }
}

/** `curriculum/*-kesin.json` dosyalarını (hangisi varsa) okur; JSON okunamazsa hata */
export function kesinTabloOku(cdir: string, errors: string[] = []): KesinTablo {
  const m: KesinTablo = new Map();
  for (const ad of KESIN_DOSYALAR) {
    const f = join(cdir, "curriculum", ad); if (!existsSync(f)) continue;
    let ham: unknown;
    try { ham = JSON.parse(readFileSync(f, "utf8")); } catch (e) { errors.push(`curriculum/${ad}: JSON okunamadı (${(e as Error).message})`); continue; }
    tabloEkle(m, ham, `curriculum/${ad}`, errors);
  }
  return m;
}

/**
 * Gün dosyaları sırayla işlenirken her dosya gününden ÖNCE K(t)'ye eklenecek tablo günleri: dosyası olmayan, o günden önceki ve
 * henüz eklenmemiş günler (artan sıra). Dosyası olan gün asla tablodan gelmez.
 */
export function tabloDolgusu(dosyaGunleri: readonly number[], tablo: KesinTablo | undefined): Map<number, TabloGun[]> {
  const out = new Map<number, TabloGun[]>();
  if (!tablo || !tablo.size) return out;
  const var_ = new Set(dosyaGunleri);
  const eksik = [...tablo.values()].filter((g) => !var_.has(g.day)).sort((a, b) => a.day - b.day);
  let i = 0;
  for (const d of [...var_].sort((a, b) => a - b)) {
    const l: TabloGun[] = [];
    while (i < eksik.length && eksik[i]!.day < d) l.push(eksik[i++]!);
    out.set(d, l);
  }
  return out;
}
