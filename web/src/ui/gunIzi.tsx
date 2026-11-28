/**
 * Akıştan açılan durak ekranında günün çubuğu (P2-6, PM-144 md. 1.2 "akışın çerçevesi: X ve ilerleme"): ekran akıştan açıldıysa
 * (`akisaDonus`) o günün kaydından "durak k/N"; değilse null (ekran kendi başına açılmıştır, çubuk yok).
 */
import { useEffect, useState } from "preact/hooks";
import { getMeta } from "../data/db.ts";
import type { AkisKaydi } from "../core/akisKayit.ts";
import { parseHash } from "../state.ts";
import { akisaDonus } from "../services/gezinme.ts";

export function useGunIzi(): { sira: number; toplam: number } | null {
  const [iz, setIz] = useState<{ sira: number; toplam: number } | null>(null);
  useEffect(() => {
    const r = parseHash(akisaDonus(""));
    if (r.name !== "akis") return;
    void getMeta<AkisKaydi>(`akis:${r.day}`).then((k) => { if (k?.plan?.duraklar?.length) setIz({ sira: Math.min(k.durak + 1, k.plan.duraklar.length), toplam: k.plan.duraklar.length }); });
  }, []);
  return iz;
}
