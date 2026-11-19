/**
 * Şölen 2 / B11b: günlük görev sayaçları, sandık, seri dondurma hakkı — yalnızca cihazda (`meta`).
 *   - `gorev:<YYYY-MM-DD>` → { sayac, sandik? }   (30 günden eskisi açılışta silinir)
 *   - `dondurma` → { hak }                       (seri dondurma hakkı, en çok 2)
 *   - `sandik:yol:<gün>:<k>` → açılış zamanı       (yol üstündeki sandıklar)
 * Sunucuya, yapay zekâya ya da analitiğe gitmez.
 */
import { delMeta, getMeta, metaPrefix, setMeta } from "../data/db.ts";
import { yerelGun } from "../core/gun.ts";
import { DONDURMA_EN_COK, YOL_SANDIK_XP, dondurmaUygula, sandikOdulu, type GunSayac, type Odul, type Olcu } from "../core/gorev.ts";
import { xpOku, xpVer } from "./ilerleme.ts";

const anahtar = (gun = yerelGun(new Date())) => `gorev:${gun}`;
let kuyruk: Promise<unknown> = Promise.resolve();
const sirala = <T>(f: () => Promise<T>): Promise<T> => { const p = kuyruk.then(f); kuyruk = p.catch(() => {}); return p; };
const olay = () => { try { window.dispatchEvent(new CustomEvent("dw:gorev")); } catch { /* test */ } };

export const gorevOku = async (gun?: string): Promise<GunSayac> => (await getMeta<GunSayac>(anahtar(gun))) ?? { sayac: {} };

/**
 * Öğrenme eylemi oldu: bugünün sayacını artır (sırayla yazılır). `birKez` verilirse aynı eylem (kart, cümle, dikte, tur)
 * bugün yalnızca bir kez sayılır: tekrar çalışma, "Baştan çalış", gölge tekrar sayacı şişirmez (inceleme #108 P1-1).
 */
export function gorevSay(olcu: Olcu, birKez?: string, n = 1): Promise<void> {
  return sirala(async () => {
    const s = await gorevOku();
    if (birKez) { const k = `${olcu}:${birKez}`; if (s.sayilan?.includes(k)) return; s.sayilan = [...(s.sayilan ?? []), k]; }
    s.sayac[olcu] = (s.sayac[olcu] ?? 0) + n;
    await setMeta(anahtar(), s); olay();
  });
}

export const dondurmaHakki = async () => (await getMeta<{ hak: number }>("dondurma"))?.hak ?? 0;

/**
 * Görev sandığı (görev başına bir kez; PM 7015070303-B/C). Arayüz görevin bittiğini doğrular, burada yeniden
 * doğrulanır (`tamam`), açılmışsa null. Son açılan sandık seri dondurma hakkı verir (hak doluysa XP).
 */
export function gorevSandigiAc(gorevId: string, tamam: boolean, toplamGorev = 3): Promise<Odul | null> {
  return sirala(async () => {
    if (!tamam) return null;
    const s = await gorevOku();
    if (s.sandiklar?.[gorevId]) return null;
    const hak = await dondurmaHakki();
    const acilmis = Object.keys(s.sandiklar ?? {}).length;
    const odul = sandikOdulu(hak, acilmis + 1 >= toplamGorev);
    s.sandiklar = { ...(s.sandiklar ?? {}), [gorevId]: { acildi: new Date().toISOString(), odul } };
    await setMeta(anahtar(), s);
    if (odul.dondurma) await setMeta("dondurma", { hak: Math.min(DONDURMA_EN_COK, hak + odul.dondurma) });
    if (odul.xp) await xpVer(odul.xp);
    olay();
    return odul;
  });
}

/** Yol üstündeki sandık (önceki düğümler bitince): bir kez 5 XP */
export function yolSandigiAc(day: number, k: number): Promise<boolean> {
  return sirala(async () => {
    const a = `sandik:yol:${day}:${k}`;
    if (await getMeta(a)) return false;
    await setMeta(a, new Date().toISOString());
    await xpVer(YOL_SANDIK_XP); olay();
    return true;
  });
}
export const yolSandiklari = async () => new Set((await metaPrefix<string>("sandik:yol:")).map((x) => x.key.slice("sandik:yol:".length)));

/** Açılışta: dün boş kaldıysa ve hak varsa seri dondurulur. Kullanılan gün döner (öğrenciye söylenir). */
export function dondurmaKontrol(now = new Date()): Promise<string | null> {
  return sirala(async () => {
    const x = await xpOku();
    const r = dondurmaUygula(x, await dondurmaHakki(), now);
    if (!r) return null;
    await setMeta("xp", r.x); await setMeta("dondurma", { hak: r.hak }); olay();
    // seri değişti: XP göstergeleri (durum çubuğu) yeniden okusun; XP miktarı 0
    try { window.dispatchEvent(new CustomEvent("dw:xp", { detail: { n: 0 } })); } catch { /* test */ }
    return r.gun;
  });
}

/** 30 günden eski görev sayaçlarını sil */
export async function gorevTemizle(now = new Date()) {
  const sinir = new Date(now); sinir.setDate(sinir.getDate() - 30);
  const s = yerelGun(sinir);
  try { for (const { key } of await metaPrefix<unknown>("gorev:")) if (key.slice(6) < s) await delMeta(key); } catch { /* sonra */ }
}
