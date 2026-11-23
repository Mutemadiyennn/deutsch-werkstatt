/**
 * M1 ilerlemesi ve XP (#58 A5b): cihazdaki kayıtlardan okunur; dışarı gitmez.
 *  - ders:<id> (bitti / ilkBitti), m1:medya:<id> (bitti / ilkBitti), m1:bahce:<gün> (günün kartlarının hepsi tanıtıldı),
 *    m1:gun:<gün> (gün bitti; kalıcı — sonradan eklenen adım biten günü geri açmaz), xp:adim:<id> (adım XP'si verildi), xp
 *  - tanitilan: günlerin yeni kartlarından cihazda kaydı olanlar (Bahçe'de tanıtılmış; "Emin değilim, geç" kayıt açmaz)
 */
import { adimBittiKaydet } from "./kullanim.ts";
import { getMeta, itemsMap, metaPrefix, setMeta } from "../data/db.ts";
import { XP, XP_BOS, bahceAnahtari, xpEkle, type Ilerleme, type XpKayit } from "../core/gun.ts";

export async function ilerlemeOku(kartlar: string[] = []): Promise<Ilerleme> {
  type B = { bitti?: unknown; ilkBitti?: unknown };
  const [d, m, b, g, it, pr, ok] = await Promise.all([metaPrefix<B>("ders:"), metaPrefix<B>("m1:medya:"), metaPrefix<unknown>("m1:bahce:"), metaPrefix<unknown>("m1:gun:"), kartlar.length ? itemsMap(kartlar) : Promise.resolve(new Map()), metaPrefix<B>("m1:prova:"), metaPrefix<B>("m1:okuma:")]);
  const bitmis = (x: { value?: B }) => !!(x.value?.bitti || x.value?.ilkBitti);
  const sayi = (l: { key: string }[], on: string) => new Set(l.map((x) => Number(x.key.slice(on.length))).filter((n) => Number.isFinite(n)));
  return {
    dersBitti: new Set(d.filter(bitmis).map((x) => x.key.slice("ders:".length))),
    medyaBitti: new Set(m.filter(bitmis).map((x) => x.key.slice("m1:medya:".length))),
    bahceBitti: sayi(b, "m1:bahce:"),
    gunBitti: sayi(g, "m1:gun:"),
    provaBitti: sayi(pr.filter(bitmis), "m1:prova:"),
    okumaBitti: sayi(ok.filter(bitmis), "m1:okuma:"),
    tanitilan: new Set(it.keys()),
    akisBasladi: sayi((await metaPrefix<unknown>("akis:")).filter((x) => /^akis:\d+$/.test(x.key)), "akis:")
  };
}
let kuyruk: Promise<unknown> = Promise.resolve();
/** Şölen 1 (#58 B10): XP yazılınca arayüze haber ver ("+N XP" uçuşu, sayaçlar) */
const xpOlay = (n: number) => { try { window.dispatchEvent(new CustomEvent("dw:xp", { detail: { n } })); } catch { /* sunucu tarafı/test */ } };
/** XP ekle (sırayla yazılır; aynı anda iki ekleme birbirini ezmez) */
export function xpVer(n: number): Promise<void> {
  const p = kuyruk.then(async () => { const x = (await getMeta<XpKayit>("xp")) ?? XP_BOS; await setMeta("xp", xpEkle(x, n)); xpOlay(n); });
  kuyruk = p.catch(() => {});
  return p;
}
/** Adım XP'si adım başına bir kez (yeniden çalışma ya da yeniden tur XP şişirmez; inceleme #66 P2-1) */
export function adimXpVer(id: string): Promise<void> {
  // #58 B3: adım bitişi her seferinde kullanım kaydına (XP bir kez kalır)
  void adimBittiKaydet(id);
  const p = kuyruk.then(async () => {
    if (await getMeta(`xp:adim:${id}`)) return;
    await setMeta(`xp:adim:${id}`, new Date().toISOString());
    const x = (await getMeta<XpKayit>("xp")) ?? XP_BOS; await setMeta("xp", xpEkle(x, XP.adim)); xpOlay(XP.adim);
  });
  kuyruk = p.catch(() => {});
  return p;
}
/** Soru XP'si soru başına bir kez (yarıda bırakıp yeniden girince ya da tekrar çalışmada yeniden verilmez; D-102) */
export function soruXpVer(id: string): Promise<void> {
  const p = kuyruk.then(async () => {
    if (await getMeta(`xp:soru:${id}`)) return;
    await setMeta(`xp:soru:${id}`, 1);
    const x = (await getMeta<XpKayit>("xp")) ?? XP_BOS; await setMeta("xp", xpEkle(x, XP.dogru)); xpOlay(XP.dogru);
  });
  kuyruk = p.catch(() => {});
  return p;
}
/** Bu soru XP'sini daha önce aldı mı (cevap anındaki uçuş için; inceleme #87 P1-2) */
export const soruXpAlindi = async (id: string) => !!(await getMeta(`xp:soru:${id}`));
/** Bekleyen XP yazımları bittikten sonra okur (adım biter bitmez Bugün'e geçilince eski toplam görünmesin) */
export const xpOku = async () => { await kuyruk; return (await getMeta<XpKayit>("xp")) ?? XP_BOS; };
/** M1 Seans 1: günün (ve önceki günlerin) yeni kartlarının hepsi tanıtılınca bir kez işaretlenir; adım XP'si bir kez */
export async function bahceTamam(day: number) {
  if (!(await getMeta(bahceAnahtari(day)))) await setMeta(bahceAnahtari(day), new Date().toISOString());
  await adimXpVer(`bahce:${day}`);
}
/** Gün bitişi kalıcı (inceleme #66 P2-7) */
export async function gunBittiYaz(day: number) { if (!(await getMeta(`m1:gun:${day}`))) await setMeta(`m1:gun:${day}`, new Date().toISOString()); }
/** Kalıcı gün bitişleri (`m1:gun:<g>`): hangi haftanın yükleneceği ve gün kilidi (PR B-3) bunlarla karar verir; gün dosyası yüklenmez */
export async function gunBitisleri(): Promise<Set<number>> {
  return new Set((await metaPrefix<unknown>("m1:gun:")).map((x) => Number(x.key.slice("m1:gun:".length))).filter((n) => Number.isInteger(n)));
}
/** Hafta sonu testi sonucu (PR B-3): `m1:hafta:<H>`; en iyi sonuç kalır (yeniden çözmek düşürmez) */
export interface HaftaSonuc { dogru: number; toplam: number; at: string }
export async function haftaSonuclari(): Promise<Map<number, HaftaSonuc>> {
  return new Map((await metaPrefix<HaftaSonuc>("m1:hafta:")).filter((x) => x.value && typeof x.value.dogru === "number").map((x) => [Number(x.key.slice("m1:hafta:".length)), x.value!]));
}
/** Son çözüm (inceleme #244 P2-2): yanlış maddeler dahil; düşük sonuçta zayıf cümleler ekran kapansa da geri gelir */
export interface HaftaSon { dogru: number; toplam: number; yanlis: string[]; at: string }
export async function haftaSonOku(hafta: number): Promise<HaftaSon | null> {
  const v = await getMeta<HaftaSon>(`m1:hafta-son:${hafta}`);
  return v && typeof v.dogru === "number" && Array.isArray(v.yanlis) ? v : null;
}
export async function haftaSonucYaz(hafta: number, dogru: number, toplam: number, yanlis: string[] = []): Promise<void> {
  await setMeta(`m1:hafta-son:${hafta}`, { dogru, toplam, yanlis, at: new Date().toISOString() });
  const eski = await getMeta<HaftaSonuc>(`m1:hafta:${hafta}`);
  if (eski && eski.toplam && eski.dogru / eski.toplam >= dogru / Math.max(1, toplam)) return;
  await setMeta(`m1:hafta:${hafta}`, { dogru, toplam, at: new Date().toISOString() });
}
