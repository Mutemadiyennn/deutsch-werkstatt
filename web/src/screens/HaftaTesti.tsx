/**
 * PR B-3 (PM-108 B md. 2): gün kilidi kapısı ve hafta sonu testi.
 *  - `GunKapisi`: adresle elle açılan kilitli gün (`#/akis/<g>`, `#/garden/<g>`, `#/m1/<g>…`, `#/prova/<g>`, `#/okuma/<g>`) kapanır.
 *    Karar kalıcı gün bitişlerinden (`m1:gun:<g>`; `core/gun.ts` `gunKilitli`); gün dosyası yüklenmez.
 *  - `HaftaTestiEkrani` (`#/hafta/<H>`): haftanın paketteki bütün günleri bitince açılır; maddeler sırayla (ortak `DrillView`),
 *    sonuç `m1:hafta:<H>` (en iyi sonuç kalır). Test sonraki haftayı kilitlemez.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { Drill } from "@dw/shared";
import { useApp } from "../state.ts";
import { gunKilitli, haftaBitti } from "../core/gun.ts";
import { personalizeDeep } from "../core/persona.ts";
import { loadHaftaTesti } from "../services/content.ts";
import { gunBitisleri, haftaSonucYaz } from "../services/ilerleme.ts";
import { DrillView, type DrillSonuc } from "../ui/drill.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { ActionBar, ProgressHeader } from "../ui/kit.tsx";
import POLICY from "../policy.json" with { type: "json" };

function Kilitli({ ust, baslik, metin }: { ust: string; baslik: string; metin: string }) {
  return (
    <div class="stack" data-test="gun-kilitli">
      <ProgressHeader title={ust} back="#/today" />
      <section class="card stack"><h2>{baslik}</h2><p>{metin}</p></section>
      <ActionBar><a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a></ActionBar>
    </div>
  );
}

/** Yalnız e2e paketi: eski testler tek günü adresle açar; taban `sessionStorage["e2e-gun-kilidi"] = "kapali"` (tests/e2e/common.py),
 *  kilidi sınayan test "acik" yazar; "önceki günler oynanmış" öğrenci (`dw-e2e-onceki=hepsi`) kilitsizdir. Üretimde okunmaz: kilit hep açık. */
function e2eKilitsiz(): boolean {
  if (import.meta.env.MODE !== "e2e") return false;
  try { return sessionStorage.getItem("e2e-gun-kilidi") === "kapali" || localStorage.getItem("dw-e2e-onceki") === "hepsi"; } catch { return false; }
}

/** Kilitli gün kapısı: önceki günlerin hepsi bitmeden bu günün ekranı açılmaz */
export function GunKapisi({ day, children }: { day: number; children: ComponentChildren }) {
  const { index } = useApp();
  const [kilit, setKilit] = useState<boolean | null>(null);
  useEffect(() => {
    if (!index) return;
    if (e2eKilitsiz()) { setKilit(false); return; }
    let iptal = false;
    // okunamazsa açık bırakılır: kapı bir güvenlik değil sıra kuralıdır; ekran kendi hatasını gösterir
    void gunBitisleri().then((b) => !iptal && setKilit(gunKilitli(day, index.m1.map((g) => g.day), b))).catch(() => !iptal && setKilit(false));
    return () => { iptal = true; };
  }, [index?.version, day]);
  if (kilit === null) return <Loading />;
  if (kilit) return <Kilitli ust={`${day}. gün`} baslik="Bu gün henüz kilitli" metin="Günler sırayla açılır. Önceki günleri bitirince bu gün kendiliğinden açılacak." />;
  return <>{children}</>;
}

export function HaftaTestiEkrani({ hafta }: { hafta: number }) {
  const { index, profile } = useApp();
  const [test, setTest] = useState<{ id: string; maddeler: Drill[] } | null | "yok" | "kilitli">(null);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState(0);
  const [dogru, setDogru] = useState(0);
  const [bitti, setBitti] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!index) return;
    setErr(null);
    (async () => {
      const b = await gunBitisleri();
      if (!haftaBitti(hafta, index.m1.map((g) => g.day), b)) return setTest("kilitli");
      const t = await loadHaftaTesti(hafta);
      setTest(t ? personalizeDeep(t, { name: profile.displayName, address: profile.address }) : "yok");
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, hafta, n]);
  if (err) return <div class="stack"><ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" /><ErrorPanel message={err} onRetry={() => setN((x) => x + 1)} /></div>;
  if (!test) return <Loading />;
  if (test === "kilitli") return <Kilitli ust={`${hafta}. hafta sonu testi`} baslik="Test henüz kilitli" metin={`Test, ${hafta}. haftanın bütün günleri bitince açılır.`} />;
  if (test === "yok") return <Kilitli ust={`${hafta}. hafta sonu testi`} baslik="Test hazırlanıyor" metin="Bu haftanın testi henüz hazır değil." />;
  const toplam = test.maddeler.length;
  if (bitti) {
    const oran = toplam ? dogru / toplam : 0;
    return (
      <div class="stack" data-test="hafta-testi-sonuc" data-dogru={dogru} data-toplam={toplam}>
        <ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" ilerleme={{ n: toplam, toplam }} />
        <section class="card stack">
          <h2>{dogru}/{toplam} doğru</h2>
          <p>{oran >= POLICY.hafta_testi.gecme_orani ? `${hafta}. haftanın öğrettiklerini kullanabiliyorsun.` : `Zorlandığın yerleri ${hafta}. haftanın günlerindeki Rehber'den yeniden okuyabilirsin. Testi istediğin zaman yeniden çözebilirsin; en iyi sonucun kalır.`}</p>
        </section>
        <ActionBar><a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a></ActionBar>
      </div>
    );
  }
  const d = test.maddeler[q]!;
  const sonra = (r: DrillSonuc) => {
    const yeni = dogru + (r === "wrong" ? 0 : 1);
    if (q + 1 >= toplam) { setDogru(yeni); setBitti(true); void haftaSonucYaz(hafta, yeni, toplam); window.scrollTo(0, 0); }
    else { setDogru(yeni); setQ(q + 1); window.scrollTo(0, 0); }
  };
  return (
    <div class="stack" data-test="hafta-testi" data-hafta={hafta} data-q={q}>
      <ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" ilerleme={{ n: q, toplam }} />
      <DrillView key={d.id} d={d} sira={`${q + 1}/${toplam}`} onDone={sonra} />
    </div>
  );
}
