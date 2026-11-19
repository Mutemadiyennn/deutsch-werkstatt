/**
 * Ders yolu (#58 A5b): İlk Hafta'nın 7 günü, her günün 4 seansı, açık "sıradaki adım", XP ve seri.
 * Kural: tamamlanan adım yeniden önerilmez; sonraki gün, önceki gün bitince açılır. Seviye XP ile değil kanıtla atlanır.
 */
import { useEffect, useState } from "preact/hooks";
import { yolSandigiAc, yolSandiklari } from "../services/gorev.ts";
import { YOL_SANDIK_XP } from "../core/gorev.ts";
import { Sandik } from "../ui/gorev.tsx";
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
      // Bugün'deki "N yeni kelime" Bahçe'nin gerçekten getireceği kart sayısı; derlemede indekse yazılır, plan 2 MB'lık
      // sözlüğü yüklemez (inceleme #66 2. ve 3. tur)
      ilr.kartlar = new Set(sirali.flatMap((g) => g.kartlar));
      const basliklar = Object.fromEntries(index.temel.map((t) => [t.id, t.title_tr]));
      const y = yol(gunler.map((g: Gun) => gunAdimlari(g, ilr, basliklar)));
      // gün bitişi kalıcı yazılır (sonradan hazır olan adım biten günü geri açmaz)
      for (const g of y.gunler) if (g.bitti && !ilr.gunBitti?.has(g.day)) void gunBittiYaz(g.day);
      setPlan({ ...y, sonraki: siradaki(y.simdi), xp, eksik: ilk >= 0 });
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, n]);
  return { plan, err, yok, yenile: () => setN((x) => x + 1) };
}

/** Haftanın vurgu rengi (PM-065 madde 4): hafta 1–4 döner; açık ve koyu temada doygun (CSS `--hafta-N`) */
export const haftaRengi = (hafta: number) => `var(--hafta-${((hafta - 1) % 4) + 1})`;

/** Düğüm simgeleri (özgün, tek renk çizgi): etkinlik türünü söyler */
function DugumSimge({ tur }: { tur: Adim["tur"] | "gunsonu" | "kupa" }) {
  const p: Record<string, string> = {
    bahce: "M12 21v-8M12 13c-1-4-5-6-8-6 0 4 3 7 8 6zM12 11c1-4 4-6 7-6 0 4-3 7-7 6z",
    ders: "M3 5.5C5.5 4.5 8.5 4.5 12 6.5c3.5-2 6.5-2 9-1V19c-2.5-1-5.5-1-9 1-3.5-2-6.5-2-9-1zM12 6.5V20",
    medya: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z",
    prova: "M4 5h16v10H9l-5 4zM8 9h8M8 12h5",
    okuma: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7",
    gunsonu: "M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z",
    kupa: "M7 4h10v5a5 5 0 0 1-10 0zM7 6H4c0 3 1.5 4.5 3.5 4.5M17 6h3c0 3-1.5 4.5-3.5 4.5M12 14v3M8 21h8M9 17h6v4H9z"
  };
  return <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={p[tur]} /></svg>;
}
const TUR_AD: Record<Adim["tur"], string> = { bahce: "Kelime Bahçesi", ders: "Ders", medya: "Dinle ve izle", prova: "Konuşma provası", okuma: "Okuma ve yazma" };
/** Kıvrılan hat: düğümün yatay kayması (px), 8 adımda bir dalga */
const KAYMA = [0, 44, 70, 44, 0, -44, -70, -44];

export function YolEkrani() {
  const { plan, err, yok, yenile } = usePlan();
  // B11b (PM-065 madde 6): yol üstünde her 3 düğümde bir sandık; önceki düğümler bitince açılır (bir kez 5 XP)
  const [acik, setAcik] = useState<Set<string>>(new Set());
  useEffect(() => { void yolSandiklari().then(setAcik); }, []);
  if (err) return <div class="stack"><TopBar title="İlk Hafta" back="#/today" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (yok) return <div class="stack"><TopBar title="Yol" back="#/today" /><section class="card"><p>İlk Hafta'nın günleri hazırlanıyor.</p></section></div>;
  if (!plan) return <Loading />;
  const s = seri(plan.xp);
  const hafta = 1;
  let sira = 0;
  return (
    <div class="stack yol-harita" data-test="yol" style={{ "--vurgu": haftaRengi(hafta) } as Record<string, string>}>
      <TopBar title="İlk Hafta" back="#/today" />
      <div class="sr-only" data-test="xp-seri"><b data-test="xp">{plan.xp.toplam}</b> XP · {s ? <><b data-test="seri">{s}</b> gün üst üste</> : "Bugün başla, seri başlasın"}</div>
      {plan.sonraki && (
        <a class="btn primary block" href={plan.sonraki.href} data-test="yol-sonraki"><Icon name="play" size={18} /> Sıradaki: {adimAdi(plan.sonraki)} · {plan.sonraki.title_tr}</a>
      )}
      {!plan.sonraki && !plan.simdi && (plan.gunler.length >= 7
        ? <section class="card" data-test="hafta-bitti"><h2>İlk Hafta tamam</h2><p>Bütün günleri bitirdin. Kendini tanıtabilir ve basit bir randevu cümlesi kurabilirsin.</p></section>
        : <section class="card" data-test="hafta-bitti"><h2>Hazır günlerin hepsi bitti</h2><p>Sıradaki günler hazırlanıyor. Bu arada Kelime Bahçesi'nde tekrar yapabilirsin.</p></section>)}
      {plan.gunler.map((g) => {
        const hazirAdim = g.adimlar.filter((a) => a.hazir);
        const biten = hazirAdim.filter((a) => a.bitti).length;
        const son = g.day === 7 ? "kupa" : "gunsonu";
        return (
          <section class={`yolgun ${g.durum}`} data-test={`gun-${g.day}`} data-durum={g.durum} aria-label={`${g.day}. gün: ${g.title_tr}, ${g.durum === "bitti" ? "bitti" : g.durum === "simdi" ? "şimdi" : "kilitli"}`}>
            <div class="gun-bant">
              <div class="grow"><div class="gun-bant-ust">{hafta}. HAFTA · GÜN {g.day}</div><div class="gun-bant-ad">{g.title_tr}</div></div>
              <a class="rehber-btn" href={`#/rehber/${g.day}`} data-test={`rehber-${g.day}`} aria-label={`${g.day}. günün rehberi: hedef ve kelimeler`}>Rehber</a>
            </div>
            <ol class="dugumler">
              {g.adimlar.flatMap((a, ai) => {
                const kay = KAYMA[sira++ % KAYMA.length]!;
                const simdi = plan.sonraki?.id === a.id;
                const durum = a.bitti ? "bitti" : simdi ? "simdi" : g.durum === "kilitli" || !a.hazir ? "kilitli" : "acik";
                const ad = `Seans ${a.seans} · ${TUR_AD[a.tur]}: ${a.title_tr}${!a.hazir ? " (hazırlanıyor)" : ""}${a.bitti ? ", bitti" : ""}`;
                const ic = <><span class="dugum-yuz"><DugumSimge tur={a.tur} /></span>{a.bitti && <span class="dugum-onay" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>}</>;
                const dugum = (
                  <li class={`dugum-yer ${durum}`} style={{ "--kay": `${kay}px` } as Record<string, string>} data-test="adim" data-tur={a.tur} data-bitti={a.bitti ? "1" : "0"} data-durum={durum}>
                    {simdi && <span class="basla-balon" aria-hidden="true">BAŞLA</span>}
                    {simdi && <svg class="dugum-halka" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><circle class="dolu" cx="50" cy="50" r="46" style={{ strokeDasharray: `${2 * Math.PI * 46 * (hazirAdim.length ? biten / hazirAdim.length : 0)} 999` }} /></svg>}
                    {a.hazir && !a.bitti && g.durum !== "kilitli"
                      ? <a class="dugum" href={a.href} aria-label={ad} aria-current={simdi ? "step" : undefined}>{ic}</a>
                      : <span class="dugum" role="img" aria-label={ad}>{ic}</span>}
                    <span class="dugum-ad tiny">{TUR_AD[a.tur]}</span>
                  </li>
                );
                if ((ai + 1) % 3 !== 0 || ai === g.adimlar.length - 1) return [dugum];
                const k = (ai + 1) / 3, anahtar = `${g.day}:${k}`;
                const onceBitti = g.adimlar.slice(0, ai + 1).filter((x) => x.hazir).every((x) => x.bitti) && g.durum !== "kilitli";
                const sd = acik.has(anahtar) ? "acik" : onceBitti ? "hazir" : "kilitli";
                const kay2 = KAYMA[sira++ % KAYMA.length]!;
                const ac = async () => { if (await yolSandigiAc(g.day, k)) setAcik(new Set([...acik, anahtar])); };
                return [dugum, (
                  <li class={`dugum-yer sandik-yer ${sd}`} style={{ "--kay": `${kay2}px` } as Record<string, string>} data-test="yol-sandik" data-durum={sd}>
                    {sd === "hazir"
                      ? <button class="dugum sandik-dugum" onClick={() => void ac()} aria-label={`Sandık: aç, +${YOL_SANDIK_XP} XP`}><Sandik durum="hazir" boy={50} /></button>
                      : <span class="dugum sandik-dugum" role="img" aria-label={sd === "acik" ? "Sandık açıldı" : "Sandık: önceki adımları bitirince açılır"}><Sandik durum={sd} boy={50} /></span>}
                    <span class="dugum-ad tiny">{sd === "acik" ? `+${YOL_SANDIK_XP} XP alındı` : "Sandık"}</span>
                  </li>)];
              })}
              <li class={`dugum-yer ${g.bitti ? "bitti" : "kilitli"} son`} style={{ "--kay": `${KAYMA[sira++ % KAYMA.length]}px` } as Record<string, string>}>
                <span class="dugum" role="img" aria-label={g.day === 7 ? `Hafta sonu ${g.bitti ? "tamam" : "kilitli"}` : `Gün sonu ${g.bitti ? "tamam" : "kilitli"}`}><span class="dugum-yuz"><DugumSimge tur={son} /></span></span>
                <span class="dugum-ad tiny">{g.day === 7 ? "Hafta sonu" : "Gün sonu"}</span>
              </li>
            </ol>
          </section>
        );
      })}
    </div>
  );
}
