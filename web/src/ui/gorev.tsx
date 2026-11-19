/**
 * Şölen 2 / B11b (PM-065 madde 5–7): Bugün'de "Günlük görevler" kartı + sandık; İlerlemem'de "Geçen haftaki sen".
 * Çizimler özgün (sandık); başka uygulamanın simgesi yok. Hareket azaltmada kapak animasyonu yok.
 */
import { useEffect, useState } from "preact/hooks";
import { useApp } from "../state.ts";
import { db, focusRange } from "../data/db.ts";
import { localDate } from "../core/focus.ts";
import { yerelGun } from "../core/gun.ts";
import { gunGorevleri, haftaAraliklari, ilerleme, xpRekor, type GunSayac, type HaftaOzet, type Odul } from "../core/gorev.ts";
import { dondurmaHakki, dondurmaKontrol, gorevOku, gorevSandigiAc, gorevTemizle } from "../services/gorev.ts";
import { useXp } from "./durum.tsx";
import { useFocusTick } from "./components.tsx";
import { Mucevher } from "./solen.tsx";
import { efekt, hareketAzalt } from "../services/efekt.ts";
import type { LearnerItem } from "@dw/shared";

/** Özgün sandık: gövde + kapak + kilit; `durum`: kilitli (görevler bitmedi), hazir (açılabilir), acik */
export function Sandik({ durum, boy = 56 }: { durum: "kilitli" | "hazir" | "acik"; boy?: number }) {
  return (
    <svg width={boy} height={boy} viewBox="0 0 64 64" aria-hidden="true" class={`sandik ${durum}`}>
      <rect x="8" y="30" width="48" height="26" rx="5" fill="var(--sandik-govde)" />
      <rect x="8" y="40" width="48" height="5" fill="var(--sandik-serit)" />
      <g class="sandik-kapak"><path d="M8 30v-6a14 14 0 0 1 14-14h20a14 14 0 0 1 14 14v6z" fill="var(--sandik-kapak)" /><rect x="8" y="24" width="48" height="5" fill="var(--sandik-serit)" /></g>
      <rect x="27" y="34" width="10" height="12" rx="2" fill="var(--sandik-kilit)" />
      {durum === "acik" && <g class="sandik-isik"><path d="M32 6v8M18 10l4 6M46 10l-4 6" stroke="var(--brezel)" stroke-width="3" stroke-linecap="round" /></g>}
    </svg>
  );
}

// e2e: testin görev üçlüsünü tarihe göre bilmesi için (yalnızca e2e derlemesi)
if (import.meta.env.MODE === "e2e") (globalThis as Record<string, unknown>).__gunGorevleri = (g: string) => gunGorevleri(g).map((x) => x.id);

export function GunlukGorevler() {
  const { toast } = useApp();
  const xp = useXp();
  const e = useFocusTick();
  const gun = yerelGun(new Date());
  const [s, setS] = useState<GunSayac | null>(null);
  const [acilan, setAcilan] = useState<Odul | null>(null);
  const [hak, setHak] = useState(0);
  useEffect(() => {
    const oku = () => { void gorevOku().then(setS); void dondurmaHakki().then(setHak); };
    oku(); void gorevTemizle();
    // dün boş kaldıysa ve hak varsa seri dondurulur; öğrenciye söylenir
    void dondurmaKontrol().then((g) => { if (g) { toast("Dün çalışamadın; seri dondurma hakkın serini korudu."); oku(); } });
    window.addEventListener("dw:gorev", oku); window.addEventListener("dw:xp", oku);
    return () => { window.removeEventListener("dw:gorev", oku); window.removeEventListener("dw:xp", oku); };
  }, []);
  if (!s) return null;
  const gorevler = gunGorevleri(gun);
  const dis = { xp: xp?.gunler[gun] ?? 0, dakika: Math.floor((e?.day.focusSec ?? 0) / 60) };
  const biten = gorevler.filter((g) => ilerleme(g, s, dis) >= g.hedef).length;
  const durum = s.sandik ? "acik" : biten === gorevler.length ? "hazir" : "kilitli";
  const ac = async () => {
    const o = await gorevSandigiAc();
    if (o) { setAcilan(o); if (!hareketAzalt()) efekt("kutlama"); }
  };
  const odul = acilan ?? s.sandik?.odul;
  return (
    <section class="card stack gorevler" data-test="gunluk-gorevler">
      <div class="row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
        <h2 class="grow" style={{ margin: 0 }}>Günlük görevler</h2>
        <span class="tiny muted" data-test="gorev-sayi">{biten}/{gorevler.length}</span>
      </div>
      <ul class="list gorev-liste">{gorevler.map((g) => {
        const n = ilerleme(g, s, dis), tamam = n >= g.hedef;
        return (
          <li class={`gorev${tamam ? " tamam" : ""}`} data-test="gorev" data-id={g.id} data-tamam={tamam ? "1" : "0"}>
            <div class="row" style={{ flexWrap: "nowrap", gap: 8 }}><span class="grow small"><b>{g.ad}</b></span><span class="tiny muted">{n}/{g.hedef}</span></div>
            <div class="gorev-cubuk" role="progressbar" aria-valuemin={0} aria-valuemax={g.hedef} aria-valuenow={n} aria-label={g.ad}><i style={{ width: `${(n / g.hedef) * 100}%` }} /></div>
          </li>);
      })}</ul>
      <div class={`sandik-satir ${durum}`} data-test="gorev-sandik" data-durum={durum}>
        <Sandik durum={durum} />
        <div class="grow small">
          {durum === "kilitli" && <>Üç görevi bitir, sandık açılsın.</>}
          {durum === "hazir" && <b>Görevler tamam! Sandığın hazır.</b>}
          {durum === "acik" && odul && <span data-test="sandik-odul"><b><Mucevher boy={14} /> +{odul.xp} XP</b>{odul.dondurma ? <> · seri dondurma hakkı ({hak})</> : null}</span>}
        </div>
        {durum === "hazir" && <button class="btn primary sm" data-test="sandik-ac" onClick={() => void ac()}>Aç</button>}
      </div>
      <p class="tiny muted" style={{ margin: 0 }}>Görevler yalnızca öğrenmeyle ilerler: ipucusuz doğru, dikte, odaklı süre. Seri dondurma hakkı, çalışamadığın bir günde serini korur.</p>
    </section>
  );
}

/** "Geçen haftaki sen" (madde 7): son 7 gün ve önceki 7 gün yan yana; kişisel rekor rozeti. Lig yok, tek rakip dünkü sen. */
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
