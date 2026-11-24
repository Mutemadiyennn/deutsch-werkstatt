/**
 * Önceki günlerin K(t)'si cihazda (PM-092 md. 3.2, PM-100 md. 2): akış planı, akışın gösterimi ve medya süzgeci aynı kaynağı kullanır.
 * Dosyalı gün: cihazda görülmüş kart; ders ancak gerçekten bittiyse biter (inceleme #231 P2-1/P2-2): `ders:<id>` kaydında `bitti`/`ilkBitti`
 * (Ders ekranı ya da akışın dil noktası durağı) ya da o günün akış kaydında dersin dil durağı (`dil:<id>`, `dil:<id>:2`) bitmiş.
 * Dosyasız gün: kesin tablo.
 */
import type { LearnerItem } from "@dw/shared";
import { getMeta } from "../data/db.ts";
import type { AkisKaydi } from "../core/akisKayit.ts";
import { akisAnahtar } from "../core/akisKayit.ts";
import { akisDersBitti, oncekiKume, type OncekiKume } from "../core/onceki.ts";
import { loadIndex, loadKesin, loadM1Gun } from "./content.ts";

/** Yalnız e2e paketi: `localStorage["dw-e2e-onceki"] = "hepsi"` → dosyalı önceki günler oynanmış sayılır (29. günün dikey dilimi) */
function hepsiOynandi(): boolean {
  if (import.meta.env.MODE !== "e2e") return false;
  try { return localStorage.getItem("dw-e2e-onceki") === "hepsi"; } catch { return false; }
}

export async function oncekiBilinen(day: number, items: ReadonlyMap<string, LearnerItem>): Promise<OncekiKume> {
  const [idx, kesin] = await Promise.all([loadIndex(), loadKesin()]);
  const dosyali = idx.m1.filter((g) => g.day < day);
  const hepsi = hepsiOynandi();
  const biten: string[] = [];
  for (const g of dosyali) {
    try {
      const d = await loadM1Gun(g.day);
      const akis = await getMeta<AkisKaydi>(akisAnahtar(g.day));
      for (const id of d.dersler) if (hepsi || (await dersBitti(id)) || (akis && akisDersBitti(akis, id))) biten.push(id);
    } catch { /* gün yüklenemedi: dersleri bilinmez sayılır */ }
  }
  return oncekiKume({ day, dosyali, kesin, gorulmus: (k) => !!items.get(k)?.passive?.fsrs, bitenDosyali: biten, hepsiOynandi: hepsi });
}

/** `ders:<id>` kaydı gerçekten bitmiş mi (yarıda bırakılan ders bitmiş sayılmaz) */
export async function dersBitti(id: string): Promise<boolean> {
  const m = await getMeta<{ bitti?: unknown; ilkBitti?: unknown }>(`ders:${id}`);
  return !!(m && (m.bitti || m.ilkBitti));
}
