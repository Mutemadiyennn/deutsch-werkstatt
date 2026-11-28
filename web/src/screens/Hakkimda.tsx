/**
 * PM-148 [ANA-V] md. 2: Ben → "Kendim hakkında". İsteğe bağlı, sade; yalnız bu telefonda kalır. Değerler konuşma görevlerinde
 * örnek cevaba ve kabul listesine yerleşir ({ulke}, {sehir}…). Almanca, kalıptaki yerine geldiği biçimde yazılır.
 */
import { useEffect, useState } from "preact/hooks";
import { PROFIL_YUVALARI } from "@dw/shared";
import { YuvaAlani } from "../ui/hakkimda.tsx";
import { TopBar } from "../ui/components.tsx";
import { ActionBar } from "../ui/kit.tsx";
import { hakkimdaKaydet, hakkimdaYukle } from "../services/hakkimda.ts";
import { useApp } from "../state.ts";
import type { Hakkimda } from "../core/persona.ts";

export function HakkimdaEkrani() {
  const { toast } = useApp();
  const [v, setV] = useState<Hakkimda | null>(null);
  useEffect(() => { void hakkimdaYukle().then(setV); }, []);
  if (!v) return null;
  const kaydet = async () => { try { setV(await hakkimdaKaydet(v)); toast("Kaydedildi. Yalnız bu telefonda."); } catch { toast("Kaydedilemedi; tekrar dene."); } };
  return (
    <section class="stack" data-test="hakkimda">
      <TopBar title="Kendim hakkında" back="#/ben" />
      <p class="small muted" style={{ margin: 0 }}>İstersen doldur. Konuşma görevlerinde örnek cevap senin bilgilerinle gelir. Bilgiler yalnız bu telefonda kalır; sunucuya ve yedeğe gitmez.</p>
      <section class="card stack" style={{ gap: 14 }}>
        {PROFIL_YUVALARI.map((y) => <YuvaAlani y={y} deger={v[y] ?? ""} degis={(x) => setV({ ...v, [y]: x })} />)}
      </section>
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="hakkimda-kaydet" onClick={() => void kaydet()}>Kaydet</button></ActionBar>
    </section>
  );
}
