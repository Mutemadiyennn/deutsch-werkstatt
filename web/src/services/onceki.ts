/**
 * Önceki günlerin K(t)'si cihazda (PM-092 md. 3.2, PM-100 md. 2): akış planı, akışın gösterimi ve medya süzgeci aynı kaynağı kullanır.
 * Dosyalı gün: cihazda görülmüş kart; dersi `ders:<id>` kaydıyla ya da gün bitmişse (`m1:gun:<g>`) biter. Dosyasız gün: kesin tablo.
 */
import type { LearnerItem } from "@dw/shared";
import { getMeta } from "../data/db.ts";
import { oncekiKume, type OncekiKume } from "../core/onceki.ts";
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
      const gunBitti = hepsi || !!(await getMeta(`m1:gun:${g.day}`));
      for (const id of d.dersler) if (gunBitti || (await getMeta(`ders:${id}`))) biten.push(id);
    } catch { /* gün yüklenemedi: dersleri bilinmez sayılır */ }
  }
  return oncekiKume({ day, dosyali, kesin, gorulmus: (k) => !!items.get(k)?.passive?.fsrs, bitenDosyali: biten, hepsiOynandi: hepsi });
}
