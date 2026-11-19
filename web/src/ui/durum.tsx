/**
 * Şölen 2 / B11a (PM-065 madde 3): üst durum çubuğu — seri (alev), XP (mücevher), bugünkü dakika halkası (… / hedef dk).
 * Sekmeli ekranların hepsinde görünür. Sayılar değişince sayaç gibi döner (hareket azaltmada döndürme yok).
 * Çizimler özgün (alev, mücevher); başka uygulamanın simgesi yok.
 */
import { useEffect, useState } from "preact/hooks";
import { useApp } from "../state.ts";
import { xpOku } from "../services/ilerleme.ts";
import { seri, type XpKayit } from "../core/gun.ts";
import { useFocusTick } from "./components.tsx";
import { Mucevher } from "./solen.tsx";

/** Özgün alev (seri): iki katmanlı damla, iç dil açık ton; seri yoksa soluk */
export function Alev({ boy = 22, sonuk = false }: { boy?: number; sonuk?: boolean }) {
  return (
    <svg width={boy} height={boy} viewBox="0 0 24 24" aria-hidden="true" class={`alev${sonuk ? " sonuk" : ""}`}>
      <path d="M12 2c1 3.5 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.6 1.4-4.2 2.6-5.6.3 1.6 1.1 2.7 2.2 3.2C10.7 7.5 11 4.6 12 2z" fill="var(--alev-a)" />
      <path d="M12 12.5c.6 1.6 2.6 2.6 2.6 4.6a2.6 2.6 0 0 1-5.2 0c0-1.5.9-2.3 1.6-3 .2.6.5 1 1 1.2-.2-1 .1-2 0-2.8z" fill="var(--alev-b)" />
    </svg>
  );
}

/** Sayaç gibi dönen sayı: değer değişince yeni rakam alttan kayarak gelir */
export function DonenSayi({ n, test }: { n: number; test?: string }) {
  return <span class="donen" data-test={test}><span key={n} class="donen-ic">{n}</span></span>;
}

/** Küçük dakika halkası: bugünkü odak dakikası / günlük hedef */
function DakikaHalkasi({ dk, hedef }: { dk: number; hedef: number }) {
  const r = 11, c = 2 * Math.PI * r, p = Math.min(1, hedef ? dk / hedef : 0);
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" class="dk-halka">
      <circle cx="14" cy="14" r={r} fill="none" stroke="var(--line)" stroke-width="4" />
      <circle cx="14" cy="14" r={r} fill="none" stroke="var(--himmel)" stroke-width="4" stroke-linecap="round" stroke-dasharray={`${c * p} ${c}`} transform="rotate(-90 14 14)" />
    </svg>
  );
}

/** XP kaydı: açılışta okunur, `dw:xp` olayıyla canlı güncellenir */
export function useXp(): XpKayit | null {
  const [xp, setXp] = useState<XpKayit | null>(null);
  useEffect(() => {
    let canli = true;
    const oku = () => void xpOku().then((x) => { if (canli) setXp(x); });
    oku();
    window.addEventListener("dw:xp", oku);
    return () => { canli = false; window.removeEventListener("dw:xp", oku); };
  }, []);
  return xp;
}

export function DurumCubugu() {
  const { profile } = useApp();
  const xp = useXp();
  const e = useFocusTick();
  const s = xp ? seri(xp) : 0;
  const dk = Math.floor((e?.day.focusSec ?? 0) / 60);
  const hedef = e?.day.goalMin ?? profile.focus.dailyGoalMin;
  return (
    <div class="durum-cubugu" data-test="durum-cubugu">
      <a class="durum-ogesi" href="#/yol" data-test="durum-seri" aria-label={s ? `${s} gün üst üste` : "Seri henüz başlamadı"} title={s ? undefined : "Seri henüz başlamadı"}><Alev /><DonenSayi n={s} /></a>
      <a class="durum-ogesi" href="#/yol" data-test="durum-xp" aria-label={xp?.toplam ? `Toplam ${xp.toplam} XP` : "XP henüz başlamadı"}><Mucevher boy={20} /><DonenSayi n={xp?.toplam ?? 0} test="durum-xp-sayi" /></a>
      <a class="durum-ogesi" href="#/odak" data-test="durum-dk" aria-label={`Bugün ${dk} / ${hedef} dakika`}><DakikaHalkasi dk={dk} hedef={hedef} /><span class="durum-dk"><DonenSayi n={dk} /><span class="tiny muted">/{hedef} dk</span></span></a>
    </div>
  );
}
