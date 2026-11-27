/**
 * Ben (Hedef 3, PM-084 md. 5; hedef design/TARGET3 "Ben"): "Ne kazandım". Yeni özellik yok: yapabildiklerim (haftanın
 * can_do cümleleri, kanıttan hesaplanan noktalar), bu hafta (gerçek sayılar), kelime haritası (Sözlük), çalışma düzeni
 * (eski İlerlemem, sıfırsız) ve Ayarlar (Profil). Sesli günlük özelliği olmadığı için o kutu çizilmez.
 */
import { useTespitDurumu } from "../ui/tespitDurum.tsx";
import { useEffect, useState } from "preact/hooks";
import type { Gun, LearnerItem } from "@dw/shared";
import { useApp } from "../state.ts";
import { db } from "../data/db.ts";
import { loadM1Gun } from "../services/content.ts";
import { ilerlemeOku } from "../services/ilerleme.ts";
import { rafOku } from "../services/raf.ts";
import { haftaCumlesi, haftaGunleri, haftaNo, haftaSatiri, haftaSayilari, noktalar, taninanKelime } from "../core/ben.ts";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { usePlan } from "./Yol.tsx";
import { kabukBilgisi, kabukSatiri } from "../services/kabuk.ts";
import { cihazSesleri, onSesler, sesYolu, sttYolu, taniOku } from "../services/speech.ts";
import { almancaMi, KALITE_TR } from "../core/sesSec.ts";

const NOKTA_TR = ["anlıyorum", "söyleyebiliyorum", "kendiliğimden kullanıyorum"] as const;

interface BenVeri { gunler: Gun[]; items: Map<string, LearnerItem>; medyaBitti: Set<string> }

export function BenEkrani() {
  const tespit = useTespitDurumu();
  const { index, indexError } = useApp();
  const { plan, err, yok } = usePlan();
  const [v, setV] = useState<BenVeri | null>(null);
  const [rafYok, setRafYok] = useState(false);
  useEffect(() => { void rafOku().then((r) => setRafYok(!r)).catch(() => setRafYok(false)); }, []);
  // şu anki gün: planın sıradaki günü; hepsi bittiyse son gün
  const gun = plan?.simdi?.day ?? (plan?.gunler.length ? plan.gunler[plan.gunler.length - 1]!.day : 1);
  const hafta = haftaNo(gun);
  useEffect(() => {
    if (!index) return;
    let canli = true;
    setV(null);   // hafta değişince önceki haftanın cümleleri bir an bile çizilmez (inceleme #208 P2-2)
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
  // "kaydı dinledin": yalnız ses kayıtları (video ve köy dizisi sayılmaz; inceleme #208 P2-4)
  const medya = index.m1.filter((g) => haftaGunleri(hafta).includes(g.day)).flatMap((g) => g.medya.filter((m) => m.kind === "ses").map((m) => m.id));
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
                <span class="ben-noktalar" role="img" aria-label={`${g.can_do.tr} ${dolu ? NOKTA_TR.slice(0, dolu).join(", ") : "henüz kanıt yok"}`}>
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
        <p>{haftaCumlesi(sayi, hafta)}</p>
      </section>
      {/* PM-099: raf bağlı değilse tek satır (bağlıysa hiçbir şey); fotoğraflar açık lisanslı yedekle sürer. Satır doğrudan
          Ayarlar'daki Medya rafı kartına iner (#208 PM finali takip d) */}
      {rafYok && <a class="ben-raf" href="#/ben/ayarlar/raf" data-test="raf-bagla">Fotoğraf rafı bağlı değil → bağla</a>}
      <div class="ben-satirlar">
        <a class="ben-satir" href="#/sozluk" data-test="kelime-haritam">
          <span class="ben-ic" style={{ background: "var(--m-bahce)" }} aria-hidden="true"><Icon name="harita" size={22} /></span>
          <span class="grow"><b>Kelime haritam</b><span>{kelime > 0 ? `${kelime} kelime` : "Tanıdığın kelimeler burada"}</span></span>
          <span aria-hidden="true">›</span>
        </a>
        {tespit && <a class="ben-satir" href={tespit.durum === "bitti" ? "#/seviye/rapor" : "#/seviye"} data-test="ben-tespit">
          <span class="ben-ic" style={{ background: "var(--m-kutuphane)" }} aria-hidden="true"><Icon name="chart" size={22} /></span>
          <span class="grow"><b>{tespit.durum === "bitti" ? "Seviye raporun" : "Seviye tespiti"}</b><span>{tespit.durum === "bitti" ? "Beceriler, haftalar, zorlandıkların" : tespit.durum === "yarida" ? "Yarıda; kaldığın yerden sürer" : "Nereden başlayacağını bulalım"}</span></span>
          <span aria-hidden="true">›</span>
        </a>}
        <a class="ben-satir" href="#/ben/hakkimda" data-test="hakkimda-ac">
          <span class="ben-ic" style={{ background: "var(--m-pazar)" }} aria-hidden="true"><Icon name="user" size={22} /></span>
          <span class="grow"><b>Kendim hakkında</b><span>İsteğe bağlı; konuşma görevlerinde örnek cevap senin bilgilerinle</span></span>
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
      <Tanilama />
    </div>
  );
}

/** PM-142 md. 2.4: tek ekran görüntüsü kök nedeni göstersin — kabuk, cihazın Almanca sesleri, son sahnenin atamaları, son tanıma hatası */
function Tanilama() {
  const [kabuk, setKabuk] = useState("");
  const [, yenile] = useState(0);
  // sesler sonradan yüklenebilir (kabukta eklenti listesi): gelince yeniden çiz (inceleme #274 Ö-6)
  useEffect(() => { void kabukBilgisi().then((b) => setKabuk(kabukSatiri(b)), () => {}); return onSesler(() => yenile((n) => n + 1)); }, []);
  const t = taniOku(), yol = sesYolu();
  const sesler = cihazSesleri().filter(almancaMi).map((v) => `${v.name} (${KALITE_TR(v)})`);
  return (
    <details class="card tanilama" data-test="tanilama">
      <summary class="ac-baslik small"><b>Tanılama</b></summary>
      <p class="tiny" data-test="tani-satir">{kabuk}<br />
        Ses yolu: {yol} · Almanca sesler ({sesler.length}): {sesler.join(", ") || "yok"}<br />
        Son sahne: {t.sahne ?? "henüz yok"}<br />
        Tanıma: {sttYolu()} · son hata: {t.hata ?? "yok"}</p>
    </details>
  );
}
