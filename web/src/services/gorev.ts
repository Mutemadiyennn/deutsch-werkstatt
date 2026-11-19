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

/** Öğrenme eylemi oldu: bugünün sayacını artır (sırayla yazılır) */
export function gorevSay(olcu: Olcu, n = 1): Promise<void> {
  return sirala(async () => {
    const s = await gorevOku();
    s.sayac[olcu] = (s.sayac[olcu] ?? 0) + n;
    await setMeta(anahtar(), s); olay();
  });
}

export const dondurmaHakki = async () => (await getMeta<{ hak: number }>("dondurma"))?.hak ?? 0;

/** Günün görevleri bitince sandık bir kez açılır: XP + seri dondurma hakkı. Açılmışsa null. */
export function gorevSandigiAc(): Promise<Odul | null> {
  return sirala(async () => {
    const s = await gorevOku();
    if (s.sandik) return null;
    const hak = await dondurmaHakki();
    const odul = sandikOdulu(hak);
    s.sandik = { acildi: new Date().toISOString(), odul };
    await setMeta(anahtar(), s);
    if (odul.dondurma) await setMeta("dondurma", { hak: Math.min(DONDURMA_EN_COK, hak + odul.dondurma) });
    await xpVer(odul.xp); olay();
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
