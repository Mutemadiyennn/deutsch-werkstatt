/**
 * Ders yolu (#58 A5b): İlk Hafta'nın 7 günü, her günün 4 seansı, açık "sıradaki adım", XP ve seri.
 * Kural: tamamlanan adım yeniden önerilmez; sonraki gün, önceki gün bitince açılır. Seviye XP ile değil kanıtla atlanır.
 */
import { useEffect, useState } from "preact/hooks";
import type { Gun } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadM1Gun } from "../services/content.ts";
import { gunBittiYaz, ilerlemeOku, xpOku } from "../services/ilerleme.ts";
import { adimAdi, gunAdimlari, seri, siradaki, yol, type Adim, type GunDurum, type XpKayit } from "../core/gun.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";

export interface Plan { gunler: (GunDurum & { durum: "bitti" | "simdi" | "kilitli" })[]; simdi: GunDurum | null; sonraki: Adim | null; xp: XpKayit; /** sonraki bir gün dosyası yüklenemedi */ eksik?: boolean }

/**
 * Bugün ve Yol ekranlarının ortak verisi: günler + cihazdaki ilerleme + XP (index.m1 boşsa null).
 * Bir gün dosyası gelmezse (çevrimdışı, önbellekte yok) o güne kadarki günlerle plan kurulur — ileri gün atlanmaz;
 * ilk gün bile gelmezse hata döner ve ekran "Tekrar dene" gösterir (inceleme #66 P1-4).
 */
export function usePlan(): { plan: Plan | null; err: string | null; yok: boolean; yenile: () => void } {
  const { index } = useApp();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [n, setN] = useState(0);
  const yok = !!index && index.m1.length === 0;
  useEffect(() => {
    if (!index || !index.m1.length) return;
    setErr(null);
    (async () => {
      const sirali = [...index.m1].sort((a, b) => a.day - b.day);
      const sonuc = await Promise.allSettled(sirali.map((g) => loadM1Gun(g.day)));
      const ilk = sonuc.findIndex((r) => r.status === "rejected");
      const gunler = (ilk < 0 ? sonuc : sonuc.slice(0, ilk)).map((r) => (r as PromiseFulfilledResult<Gun>).value);
      if (!gunler.length) throw new Error(`Günün dosyası yüklenemedi${sonuc[0]?.status === "rejected" ? `: ${String((sonuc[0] as PromiseRejectedResult).reason?.message || sonuc[0].reason)}` : ""}`);
      const [ilr, xp] = await Promise.all([ilerlemeOku(gunler.flatMap((g) => g.yeni_kartlar)), xpOku()]);
      const basliklar = Object.fromEntries(index.temel.map((t) => [t.id, t.title_tr]));
      const y = yol(gunler.map((g: Gun) => gunAdimlari(g, ilr, basliklar)));
      // gün bitişi kalıcı yazılır (sonradan hazır olan adım biten günü geri açmaz)
      for (const g of y.gunler) if (g.bitti && !ilr.gunBitti?.has(g.day)) void gunBittiYaz(g.day);
      setPlan({ ...y, sonraki: siradaki(y.simdi), xp, eksik: ilk >= 0 });
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, n]);
  return { plan, err, yok, yenile: () => setN((x) => x + 1) };
}

export function YolEkrani() {
  const { plan, err, yok, yenile } = usePlan();
  if (err) return <div class="stack"><TopBar title="İlk Hafta" back="#/today" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (yok) return <div class="stack"><TopBar title="Yol" back="#/today" /><section class="card"><p>İlk Hafta'nın günleri hazırlanıyor.</p></section></div>;
  if (!plan) return <Loading />;
  const s = seri(plan.xp);
  return (
    <div class="stack" data-test="yol">
      <TopBar title="İlk Hafta" back="#/today" />
      <div class="row" data-test="xp-seri" style={{ gap: 16 }}>
        <span class="chip"><b data-test="xp">{plan.xp.toplam}</b>&nbsp;XP</span>
        <span class="chip">{s ? <><b data-test="seri">{s}</b>&nbsp;gün üst üste</> : "Bugün başla, seri başlasın"}</span>
      </div>
      {plan.sonraki && (
        <a class="btn primary block" href={plan.sonraki.href} data-test="yol-sonraki"><Icon name="play" size={18} /> Sıradaki: {adimAdi(plan.sonraki)} · {plan.sonraki.title_tr}</a>
      )}
      {!plan.sonraki && !plan.simdi && (plan.gunler.length >= 7
        ? <section class="card" data-test="hafta-bitti"><h2>İlk Hafta tamam</h2><p>Bütün günleri bitirdin. Kendini tanıtabilir ve basit bir randevu cümlesi kurabilirsin.</p></section>
        : <section class="card" data-test="hafta-bitti"><h2>Hazır günlerin hepsi bitti</h2><p>Sıradaki günler hazırlanıyor. Bu arada Kelime Bahçesi'nde tekrar yapabilirsin.</p></section>)}
      <ol class="list yol">{plan.gunler.map((g) => (
        <li class={`card stack yolgun ${g.durum}`} data-test={`gun-${g.day}`} data-durum={g.durum}>
          <div class="row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
            <span class="yolno" aria-hidden="true">{g.durum === "bitti" ? <Icon name="check" size={18} /> : g.day}</span>
            <span class="grow"><b>{g.day}. gün</b><br /><span class="small muted">{g.title_tr}</span></span>
            <span class="tiny muted">{g.durum === "bitti" ? "Bitti" : g.durum === "simdi" ? "Şimdi" : "Kilitli"}</span>
          </div>
          {g.durum === "simdi" && (
            <ul class="list">{g.adimlar.map((a) => (
              <li class="row" style={{ flexWrap: "nowrap" }} data-test="adim" data-tur={a.tur} data-bitti={a.bitti ? "1" : "0"}>
                <span class="tiny muted" style={{ width: 58 }}>Seans {a.seans}</span>
                {a.hazir && !a.bitti ? <a class="grow" href={a.href}>{a.title_tr}</a> : <span class={`grow${a.bitti ? "" : " muted"}`}>{a.title_tr}{!a.hazir ? " · hazırlanıyor" : ""}</span>}
                {a.bitti && <Icon name="check" size={16} />}
              </li>))}</ul>
          )}
        </li>))}</ol>
    </div>
  );
}
