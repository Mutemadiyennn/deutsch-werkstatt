/**
 * Şölen 2 / B11b (PM-065 madde 5–7; yeniden düzen PM 7015070303 A–G): Bugün'de kompakt görev şeridi, tam sayfa
 * Görevler (`#/gorevler`), görev başına sandık ve tam ekran açılış töreni, İlerlemem'de "Geçen haftaki sen".
 * Çizimler (sandık, görev simgeleri) tek SVG setinden: 24'lük ızgara, 2 px çizgi, yuvarlak uçlar; özgün.
 */
import { useEffect, useRef, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { db, focusRange } from "../data/db.ts";
import { localDate } from "../core/focus.ts";
import { yerelGun } from "../core/gun.ts";
import { GOREV_HAVUZU, gunGorevleri, haftaAraliklari, ilerleme, xpRekor, type Gorev, type GunSayac, type HaftaOzet, type Odul, type Olcu } from "../core/gorev.ts";
import { dondurmaHakki, gorevOku, gorevSandigiAc, gorevTemizle } from "../services/gorev.ts";
import { useXp } from "./durum.tsx";
import { TopBar, useFocusTick } from "./components.tsx";
import { efekt, hareketAzalt, kutlamaAcik } from "../services/efekt.ts";
import type { LearnerItem } from "@dw/shared";
import type { Plan } from "../screens/Yol.tsx";

/* ---------- tek SVG seti ---------- */
const CIZGI = { fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" } as const;
const GOREV_SIMGE: Record<Olcu, string> = {
  xp: "M13 2L4 14h7l-1 8 9-12h-7z",                                            // şimşek
  dakika: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",                 // saat
  bahceIpucusuz: "M12 21v-8M12 13c-1-4-5-6-8-6 0 4 3 7 8 6zM12 11c1-4 4-6 7-6 0 4-3 7-7 6z", // filiz
  tur90: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01", // hedef
  ustuste5: "M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.3-4 2.5-5.3.3 1.5 1 2.5 2 3C11 8 11.2 5.2 12 3z", // alev
  dikteUsta: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z",      // kulaklık
  sesli: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3"         // mikrofon
};
const GOREV_RENK: Record<Olcu, string> = { xp: "var(--gorev-xp)", dakika: "var(--gorev-dk)", bahceIpucusuz: "var(--gorev-filiz)", tur90: "var(--gorev-hedef)", ustuste5: "var(--gorev-alev)", dikteUsta: "var(--gorev-dikte)", sesli: "var(--gorev-ses)" };
export function GorevSimge({ olcu, boy = 28 }: { olcu: Olcu; boy?: number }) {
  return <svg width={boy} height={boy} viewBox="0 0 24 24" aria-hidden="true" {...CIZGI}><path d={GOREV_SIMGE[olcu]} /></svg>;
}

/** Özgün sandık (aynı çizgi seti): gövde + menteşeli kapak; açıkta kapak arka menteşede geriye döner (kırık/ayrık parça yok) */
export function Sandik({ durum, boy = 44 }: { durum: "kilitli" | "hazir" | "acik"; boy?: number }) {
  return (
    <svg width={boy} height={boy} viewBox="0 0 24 24" aria-hidden="true" class={`sandik ${durum}`}>
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="var(--sandik-govde)" stroke="var(--sandik-serit)" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M3 15h18" stroke="var(--sandik-serit)" stroke-width="1.5" />
      <g class="sandik-kapak"><path d="M3 11V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" fill="var(--sandik-kapak)" stroke="var(--sandik-serit)" stroke-width="1.5" stroke-linejoin="round" /></g>
      <rect x="10.5" y="12.5" width="3" height="4" rx="1" fill="var(--sandik-kilit)" stroke="var(--sandik-serit)" stroke-width="1" />
    </svg>
  );
}

const uygunOlcu = (kayitVar: boolean) => new Set<Olcu>(GOREV_HAVUZU.map((g) => g.olcu).filter((o) => kayitVar || (o !== "dikteUsta" && o !== "sesli")));
if (import.meta.env.MODE === "e2e") (globalThis as Record<string, unknown>).__gunGorevleri = (g: string, kayit = true) => gunGorevleri(g, uygunOlcu(kayit)).map((x) => x.id);

/** Bugünün görev durumu (Bugün şeridi ve Görevler sayfası ortak) */
function useGorevler(plan?: Plan | null) {
  const xp = useXp();
  const e = useFocusTick();
  const gun = yerelGun(new Date());
  const [s, setS] = useState<GunSayac | null>(null);
  const [hak, setHak] = useState(0);
  useEffect(() => {
    const oku = () => { void gorevOku().then(setS); void dondurmaHakki().then(setHak); };
    oku(); void gorevTemizle();
    window.addEventListener("dw:gorev", oku); window.addEventListener("dw:xp", oku);
    return () => { window.removeEventListener("dw:gorev", oku); window.removeEventListener("dw:xp", oku); };
  }, []);
  // bugün yapılabilecek ölçüler: dikte ve sesli üretim kayıt adımı olan günde (inceleme #108 P1-3)
  const kayitVar = !plan || !!plan.simdi?.adimlar.some((a) => a.tur === "medya" && a.hazir);
  const gorevler = gunGorevleri(gun, uygunOlcu(kayitVar));
  const dis = { xp: xp?.gunler[gun] ?? 0, dakika: Math.floor((e?.day.focusSec ?? 0) / 60) };
  const satir = (g: Gorev) => {
    const n = s ? ilerleme(g, s, dis) : 0;
    const tamam = n >= g.hedef;
    const sandik: "kilitli" | "hazir" | "acik" = s?.sandiklar?.[g.id] ? "acik" : tamam ? "hazir" : "kilitli";
    return { g, n, tamam, sandik };
  };
  return { hazir: !!s, satirlar: gorevler.map(satir), hak };
}

/** Bugün: kompakt görev şeridi (PM 7015070303-A): üç küçük simge + "2/3 görev" + sandık; dokununca Görevler sayfası */
export function GorevSeridi({ plan }: { plan?: Plan | null }) {
  const { hazir, satirlar } = useGorevler(plan);
  if (!hazir) return null;
  const biten = satirlar.filter((x) => x.tamam).length;
  const hazirSandik = satirlar.some((x) => x.sandik === "hazir");
  return (
    <a class={`gorev-seridi${hazirSandik ? " hazir" : ""}`} href="#/gorevler" data-test="gorev-seridi" aria-label={`Günlük görevler: ${biten}/${satirlar.length} tamam${hazirSandik ? ", açılmayı bekleyen sandık var" : ""}`}>
      <span class="gorev-seridi-simgeler" aria-hidden="true">{satirlar.map((x) => <span class={`gs-simge${x.tamam ? " tamam" : ""}`} style={{ color: GOREV_RENK[x.g.olcu] }}><GorevSimge olcu={x.g.olcu} boy={20} /></span>)}</span>
      <span class="grow"><b>{biten}/{satirlar.length} görev</b></span>
      <Sandik durum={hazirSandik ? "hazir" : biten === satirlar.length && !hazirSandik ? "acik" : "kilitli"} boy={34} />
    </a>
  );
}

/** Tam ekran sandık töreni (PM 7015070303-C): ödül büyük ve tek; "Devam" hemen basılabilir (PM-059) */
function SandikToreni({ odul, hak, kapat }: { odul: Odul; hak: number; kapat: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // odak "Devam"da; Escape kapatır; kapanınca odak açan düğmeye ya da sayfa başlığına döner; arka plan kaydırılmaz (2. tur P2)
    const once = document.activeElement as HTMLElement | null;
    ref.current?.focus(); if (kutlamaAcik() && !hareketAzalt()) efekt("kutlama");
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") kapat(); };
    document.addEventListener("keydown", esc); const tasma = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = tasma; (once?.isConnected ? once : document.querySelector<HTMLElement>("main h1, main h2"))?.focus?.(); };
  }, []);
  return (
    <div class="toren" role="dialog" aria-modal="true" aria-label="Sandık açıldı" data-test="sandik-toreni">
      <div class="toren-ic">
        <Sandik durum="acik" boy={140} />
        <div class="toren-odul" data-test="sandik-odul">{odul.dondurma ? "Seri dondurma hakkı" : `+${odul.xp} XP`}</div>
        <p class="toren-alt">{odul.dondurma ? `Çalışamadığın bir günde serini korur. Hakkın: ${hak}.` : "Görevini bitirdin."}</p>
        <button ref={ref} class="btn primary block" data-test="toren-devam" onClick={kapat}>Devam</button>
      </div>
    </div>
  );
}

/** Görevler sayfası (PM 7015070303-B/D): renkli başlık bandı, her görev ayrı satır (simge, kısa başlık, kalın çubuk + sayı, sandık) */
export function GorevlerEkrani({ plan }: { plan?: Plan | null }) {
  const { hazir, satirlar, hak } = useGorevler(plan);
  const [tören, setTören] = useState<Odul | null>(null);
  const [kural, setKural] = useState(false);
  if (!hazir) return null;
  const ac = async (id: string, tamam: boolean) => { const o = await gorevSandigiAc(id, tamam, satirlar.length); if (o) setTören(o); };
  return (
    <div class="stack gorevler-sayfa" data-test="gorevler">
      <TopBar title="Günlük görevler" back="#/today">
        <button class="iconbtn" aria-label="Görevler nasıl ilerler?" aria-expanded={kural} data-test="gorev-kural-ac" onClick={() => setKural(!kural)}>?</button>
      </TopBar>
      <div class="gorev-bant"><b>Bugünün görevleri</b><span>{satirlar.filter((x) => x.tamam).length}/{satirlar.length} tamam</span></div>
      {kural && <p class="small gorev-kural" data-test="gorev-kural">Görevler yalnızca öğrenmeyle ilerler: ipucusuz doğru cevap, %90 üstü tur, dikte, sesli söyleme, odaklı süre. Aynı kart ya da cümle bir günde bir kez sayılır. Her görevin sandığı bir kez açılır; günün son sandığı seri dondurma hakkı verir.</p>}
      <ul class="gorev-satirlar">{satirlar.map(({ g, n, tamam, sandik }) => (
        <li class={`gorev-satir${tamam ? " tamam" : ""}`} data-test="gorev" data-id={g.id} data-tamam={tamam ? "1" : "0"}>
          <span class="gorev-simge" style={{ background: GOREV_RENK[g.olcu] }} aria-hidden="true"><GorevSimge olcu={g.olcu} boy={28} /></span>
          <div class="grow gorev-orta">
            <div class="gorev-baslik">{g.kisa}</div>
            {/* sayı çubuğun yanında: dolgu üstünde okunmaz (koyu temada 2:1; 2. tur P1-3) */}
            <div class="gorev-cubuk-satir">
              <div class="gorev-cubuk" role="progressbar" aria-valuemin={0} aria-valuemax={g.hedef} aria-valuenow={Math.min(n, g.hedef)} aria-label={g.ad}>
                <i style={{ width: `${Math.min(1, n / g.hedef) * 100}%` }} />
              </div><span class="gorev-sayi">{Math.min(n, g.hedef)}/{g.hedef}</span>
            </div>
          </div>
          {sandik === "hazir"
            ? <button class="sandik-btn" data-test="sandik-ac" onClick={() => void ac(g.id, tamam)} aria-label={`${g.kisa}: sandığı aç`}><Sandik durum="hazir" /></button>
            : <span class="sandik-btn" role="img" aria-label={sandik === "acik" ? `${g.kisa}: sandık açıldı` : `${g.kisa}: görev bitince sandık açılır`} data-test="gorev-sandik" data-durum={sandik}><Sandik durum={sandik} /></span>}
        </li>))}</ul>
      {/* body'ye taşınır: ekran kabının dönüşümü (giriş hareketi) sabit katmanı kırpmasın, durum çubuğunu da örtsün */}
      {tören && createPortal(<SandikToreni odul={tören} hak={hak} kapat={() => setTören(null)} />, document.body)}
    </div>
  );
}

export function GecenHaftakiSen() {
  const xp = useXp();
  const [d, setD] = useState<{ bu: HaftaOzet; gecen: HaftaOzet } | null>(null);
  useEffect(() => {
    if (!xp) return;
    (async () => {
      const { bu, gecen } = haftaAraliklari();
      const odak = await focusRange(gecen[6]!, bu[0]!);
      const items: LearnerItem[] = await db.items.toArray();
      const ozet = (g: string[]): HaftaOzet => ({
        xp: g.reduce((t, k) => t + (xp.gunler[k] ?? 0), 0),
        dakika: Math.floor(odak.filter((f) => g.includes(f.date)).reduce((t, f) => t + f.focusSec, 0) / 60),
        kelime: items.filter((it) => it.kind === "lexeme" && it.firstAt?.passive && g.includes(localDate(Date.parse(it.firstAt.passive)))).length
      });
      setD({ bu: ozet(bu), gecen: ozet(gecen) });
    })();
  }, [xp?.toplam]);
  if (!d || !xp) return null;
  const rekor = xpRekor(xp);
  const satir = (ad: string, k: keyof HaftaOzet, birim: string) => {
    const a = d.bu[k], b = d.gecen[k];
    return <tr data-test={`hafta-${k}`}><th scope="row">{ad}</th><td><b>{a}</b> {birim}</td><td class="muted">{b} {birim}</td><td class={a >= b ? "goalhit" : "muted"}>{a > b ? `+${a - b}` : a === b ? "=" : `${a - b}`}</td></tr>;
  };
  return (
    <section class="card stack" data-test="gecen-hafta">
      <div class="row" style={{ flexWrap: "nowrap", alignItems: "center" }}><h2 class="grow" style={{ margin: 0 }}>Geçen haftaki sen</h2>{rekor && <span class="rekor" data-test="rekor">Kişisel rekor!</span>}</div>
      <table class="hafta-tablo"><thead><tr><th /><th>Bu hafta</th><th>Geçen hafta</th><th /></tr></thead>
        <tbody>{satir("XP", "xp", "")}{satir("Dakika", "dakika", "dk")}{satir("Yeni kelime", "kelime", "")}</tbody></table>
      <p class="tiny muted" style={{ margin: 0 }}>Son 7 gün ile ondan önceki 7 gün. Sıralama yok; tek rakibin geçen haftaki sensin.</p>
    </section>
  );
}
