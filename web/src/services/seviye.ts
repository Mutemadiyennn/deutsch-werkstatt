/**
 * "A2'den başla" (PM-114 B): başlangıç günü, yoklama sonucu ve atlanan günlerin kartları cihazda.
 *  - `seviye:baslangic` { gun, at }: yoksa 1 (baştan).
 *  - `seviye:yoklama` { dogru, toplam, yanlis, maddeler, at }: son yoklama (sonuç ekranı kapansa da geri gelir).
 * Gün bitişi (`m1:gun:<g>`), XP ve seri buradan YAZILMAZ: atlanan gün "tamam" değildir.
 */
import type { ContentIndex, Drill } from "@dw/shared";
import { db, getMeta, itemsMap, putItems, setMeta } from "../data/db.ts";
import { atlananlar, biliniyorKart, dokunulmamis, etkinBaslangic, gecilenler, hemenTekrar, maddeKartlari, SEVIYE, type YoklamaTest } from "../core/seviye.ts";
import { gunBitisleri } from "./ilerleme.ts";
import { loadHaftaTesti, loadKesin } from "./content.ts";

const ANAHTAR = "seviye:baslangic";
export interface Baslangic { gun: number; at: string }
export async function baslangicOku(): Promise<number> {
  const v = await getMeta<Baslangic>(ANAHTAR);
  return v && Number.isInteger(v.gun) && v.gun >= 1 ? v.gun : 1;
}

/** Gün kilidi ve plan için: biten, atlanan ve geçilen (biten ∪ atlanan) günler */
export async function gecilenGunler(days: readonly number[]): Promise<{ bitenler: Set<number>; atlanan: Set<number>; gecilen: Set<number>; bas: number }> {
  const [bitenler, bas] = await Promise.all([gunBitisleri(), baslangicOku()]);
  const atlanan = atlananlar(days, bas, bitenler);
  return { bitenler, atlanan, gecilen: gecilenler(bitenler, atlanan), bas: etkinBaslangic(days, bas) };
}

/** Yoklamanın kaynağı: pakette olan A1 hafta sonu testleri (1…a1_hafta) */
export async function yoklamaTestleri(index: ContentIndex): Promise<YoklamaTest[]> {
  const haftalar = Object.keys(index.files.hafta ?? {}).map(Number).filter((h) => Number.isInteger(h) && h >= 1 && h <= SEVIYE.a1_hafta).sort((a, b) => a - b);
  const out: YoklamaTest[] = [];
  for (const h of haftalar) { const t = await loadHaftaTesti(h); if (t) out.push({ hafta: h, maddeler: t.maddeler, beceriler: t.beceriler }); }
  return out;
}

export interface YoklamaSon { dogru: number; toplam: number; yanlis: string[]; maddeler: string[]; at: string }
export async function yoklamaSonOku(): Promise<YoklamaSon | null> {
  const v = await getMeta<YoklamaSon>("seviye:yoklama");
  return v && typeof v.dogru === "number" && Array.isArray(v.yanlis) && Array.isArray(v.maddeler) ? v : null;
}
export const yoklamaSonYaz = (v: Omit<YoklamaSon, "at">) => setMeta("seviye:yoklama", { ...v, at: new Date().toISOString() });

/** Günlerin kartları: dosyalı gün indeksten, dosyasız gün kesin tablodan */
async function gunKartlari(index: ContentIndex, gunler: Iterable<number>): Promise<string[]> {
  const kesin = await loadKesin().catch(() => new Map<number, { kartlar: string[] }>());
  const dosya = new Map(index.m1.map((g) => [g.day, g.kartlar]));
  const out = new Set<string>();
  for (const g of gunler) for (const k of dosya.get(g) ?? kesin.get(g)?.kartlar ?? []) out.add(k);
  return [...out];
}

/**
 * Başlangıcı yaz (PM-114 B md. 4): `gun` öncesindeki bitmemiş günler atlanır. Atlanan günlerin kartları "biliniyor" diye girer
 * (cihazda kaydı olan kart olduğu gibi kalır); yoklamada yanlış yapılan maddelerin kartları hemen tekrara düşer. Daha önce
 * "biliniyor" diye girmiş ama artık atlanmayan günün DOKUNULMAMIŞ kartı çıkar (geri dönüş: A1 gününde yeniden tanıtılır).
 * Öğrencinin gerçek kanıtı, biten günleri ve XP'si değişmez.
 */
export async function baslangicYaz(gun: number, index: ContentIndex, yanlisMaddeler: readonly Drill[] = []): Promise<void> {
  const days = index.m1.map((g) => g.day);
  const bas = etkinBaslangic(days, gun);
  const bitenler = await gunBitisleri();
  // dosyasız günler de atlanır (kartları kesin tablodan): 1…bas−1 aralığında bitmemiş her gün
  const atlanan = new Set<number>();
  for (let d = 1; d < bas; d++) if (!bitenler.has(d)) atlanan.add(d);
  const kartlar = await gunKartlari(index, atlanan);
  const tut = new Set(kartlar);
  const now = new Date();
  const varolan = await itemsMap(kartlar);
  const yeni = kartlar.filter((k) => !varolan.has(k)).map((k) => biliniyorKart(k, now));
  const hepsi = new Map([...varolan, ...yeni.map((x) => [x.itemId, x] as const)]);
  const yanlisKart = new Set(yanlisMaddeler.flatMap((d) => maddeKartlari(d, kartlar)));
  const degisen = [...yeni.filter((x) => !yanlisKart.has(x.itemId)), ...[...yanlisKart].map((k) => hemenTekrar(hepsi.get(k)!, now))];
  const cikan = (await db.items.toArray()).filter((it) => dokunulmamis(it) && !tut.has(it.itemId)).map((it) => it.itemId);
  if (cikan.length) await db.items.bulkDelete(cikan);
  await putItems(degisen);
  await setMeta(ANAHTAR, { gun: bas, at: now.toISOString() } satisfies Baslangic);
}
