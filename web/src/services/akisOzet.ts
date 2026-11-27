/** Akış kayıtlarının Bugün/Yol özeti (PM-148 [ANA-T] md. 2): `akis:<gün>` kaydından durakların kimliği, türü, adı ve süresi */
import { useEffect, useState } from "preact/hooks";
import { getMeta } from "../data/db.ts";
import { parseHash } from "../state.ts";
import { akisaDonus } from "./gezinme.ts";
import type { AkisKaydi } from "../core/akisKayit.ts";
import type { AkisOzet } from "../core/gun.ts";

export const akisOzeti = (k: AkisKaydi): AkisOzet => ({
  durak: k.durak, biten: k.biten,
  duraklar: k.plan.duraklar.map((d) => ({ id: d.id, tur: d.tur, title_tr: d.title_tr, tahmini_dk: d.tahmini_dk, ...(d.eski_anahtar ? { eski_anahtar: d.eski_anahtar } : {}), ...(d.ses_turu ? { ses_turu: d.ses_turu } : {}) }))
});

export async function akisOzetleri(gunler: number[]): Promise<Map<number, AkisOzet>> {
  const m = new Map<number, AkisOzet>();
  for (const g of gunler) { const k = await getMeta<AkisKaydi>(`akis:${g}`); if (k?.plan?.duraklar) m.set(g, akisOzeti(k)); }
  return m;
}

/**
 * Akıştan açılan durak ekranında günün çubuğu (P2-6, PM-144 md. 1.2 "akışın çerçevesi: X ve ilerleme"): ekran akıştan açıldıysa
 * (`akisaDonus`) o günün kaydından "durak k/N"; değilse null (ekran kendi başına açılmıştır, çubuk yok).
 */
export function useGunIzi(): { sira: number; toplam: number } | null {
  const [iz, setIz] = useState<{ sira: number; toplam: number } | null>(null);
  useEffect(() => {
    const r = parseHash(akisaDonus(""));
    if (r.name !== "akis") return;
    void getMeta<AkisKaydi>(`akis:${r.day}`).then((k) => { if (k?.plan?.duraklar?.length) setIz({ sira: Math.min(k.durak + 1, k.plan.duraklar.length), toplam: k.plan.duraklar.length }); });
  }, []);
  return iz;
}
