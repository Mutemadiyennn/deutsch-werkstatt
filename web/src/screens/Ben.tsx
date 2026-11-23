/**
 * Ben (Hedef 3, PM-084 md. 5; hedef design/TARGET3 "Ben"): "Ne kazandım". Yeni özellik yok: yapabildiklerim (haftanın
 * can_do cümleleri, kanıttan hesaplanan noktalar), bu hafta (gerçek sayılar), kelime haritası (Sözlük), çalışma düzeni
 * (eski İlerlemem, sıfırsız) ve Ayarlar (Profil). Sesli günlük özelliği olmadığı için o kutu çizilmez.
 */
import { useEffect, useState } from "preact/hooks";
import type { Gun, LearnerItem } from "@dw/shared";
import { useApp } from "../state.ts";
import { db } from "../data/db.ts";
import { loadM1Gun } from "../services/content.ts";
import { ilerlemeOku } from "../services/ilerleme.ts";
import { haftaCumlesi, haftaGunleri, haftaNo, haftaSatiri, haftaSayilari, noktalar, taninanKelime } from "../core/ben.ts";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { usePlan } from "./Yol.tsx";

const NOKTA_TR = ["anlıyorum", "söyleyebiliyorum", "kendiliğimden kullanıyorum"] as const;

interface BenVeri { gunler: Gun[]; items: Map<string, LearnerItem>; medyaBitti: Set<string> }

export function BenEkrani() {
  const { index, indexError } = useApp();
  const { plan, err, yok } = usePlan();
  const [v, setV] = useState<BenVeri | null>(null);
  // şu anki gün: planın sıradaki günü; hepsi bittiyse son gün
  const gun = plan?.simdi?.day ?? (plan?.gunler.length ? plan.gunler[plan.gunler.length - 1]!.day : 1);
  const hafta = haftaNo(gun);
  useEffect(() => {
    if (!index) return;
    let canli = true;
    const var_ = new Set(index.m1.map((g) => g.day));
    const gunNo = haftaGunleri(hafta).filter((d) => var_.has(d));
    (async () => {
      const [gunler, items, ilr] = await Promise.all([
        Promise.all(gunNo.map((d) => loadM1Gun(d).catch(() => null))).then((xs) => xs.filter((x): x is Gun => !!x)),
        db.items.toArray(), ilerlemeOku()
      ]);
      if (canli) setV({ gunler, items: new Map(items.map((i) => [i.itemId, i])), medyaBitti: ilr.medyaBitti });
    })().catch(() => { if (canli) setV({ gunler: [], items: new Map(), medyaBitti: new Set() }); });
    return () => { canli = false; };
  }, [index?.version, hafta]);
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index || (!plan && !err && !yok) || !v) return <Loading />;

  const durum = new Map((plan?.gunler ?? []).map((g) => [g.day, g.durum]));
  const seviye = v.gunler[0]?.level ?? null;
  const kartlar = v.gunler.flatMap((g) => g.yeni_kartlar);
  const medya = index.m1.filter((g) => haftaGunleri(hafta).includes(g.day)).flatMap((g) => g.medya.map((m) => m.id));
  const sayi = haftaSayilari({ kartlar, items: v.items, bitenGun: v.gunler.filter((g) => durum.get(g.day) === "bitti").length, medya, medyaBitti: v.medyaBitti });
  const kelime = taninanKelime(v.items.values());
  return (
    <div class="ben" data-test="ben">
      <header class="koy-bas">
        <h1>Ne kazandım</h1>
        <p data-test="ben-hafta">{haftaSatiri(seviye, hafta)}</p>
      </header>
      {v.gunler.length > 0 && <>
        <section class="ben-cando" data-test="ben-cando" aria-label="Yapabildiklerim">
          {v.gunler.map((g) => {
            const n = noktalar(g.yeni_kartlar, v.items);
            const dolu = n.filter(Boolean).length;
            return (
              <div class={`ben-cd${durum.get(g.day) === "kilitli" ? " ileride" : ""}`} data-test="ben-cd" data-gun={g.day} data-dolu={dolu}>
                <span class="grow">{g.can_do.tr}</span>
                <span class="ben-noktalar" role="img" aria-label={dolu ? `${NOKTA_TR.slice(0, dolu).join(", ")}` : "henüz kanıt yok"}>
                  {n.map((d) => <i class={d ? "d" : undefined} />)}
                </span>
              </div>
            );
          })}
        </section>
        <p class="ben-atif" data-test="ben-aciklama">Üç nokta: anlıyorum, söyleyebiliyorum, kendiliğimden kullanıyorum. Her biri iki ayrı günde gösterince dolar.</p>
      </>}
      <section class="ben-hafta" data-test="ben-bu-hafta">
        <b>Bu hafta</b>
        <p>{haftaCumlesi(sayi)}</p>
      </section>
      <div class="ben-satirlar">
        <a class="ben-satir" href="#/sozluk" data-test="kelime-haritam">
          <span class="ben-ic" style={{ background: "var(--m-bahce)" }} aria-hidden="true"><Icon name="harita" size={22} /></span>
          <span class="grow"><b>Kelime haritam</b><span>{kelime > 0 ? `${kelime} kelime` : "Tanıdığın kelimeler burada"}</span></span>
          <span aria-hidden="true">›</span>
        </a>
        <a class="ben-satir" href="#/ben/duzen" data-test="duzen-ac">
          <span class="ben-ic" style={{ background: "var(--m-radyo)" }} aria-hidden="true"><Icon name="clock" size={22} /></span>
          <span class="grow"><b>Çalışma düzenim</b><span>Odak süresi, seri, seviye ölçümü</span></span>
          <span aria-hidden="true">›</span>
        </a>
        <a class="ben-satir" href="#/ben/ayarlar" data-test="ayarlar-ac">
          <span class="ben-ic" style={{ background: "var(--m-kilitli)" }} aria-hidden="true"><Icon name="ayar" size={22} /></span>
          <span class="grow"><b>Ayarlar</b><span>Günlük hedef, sesler, medya rafı, hesap</span></span>
          <span aria-hidden="true">›</span>
        </a>
      </div>
    </div>
  );
}
