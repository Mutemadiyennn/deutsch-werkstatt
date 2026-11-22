/** Ortak bileşenler: sekme çubuğu, üst çubuk, odak halkası, hata paneli, konuş düğmesi */
import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { Route } from "../state.ts";
import { focus, subscribeFocus } from "../services/focusRuntime.ts";
import { speak } from "../services/speech.ts";
import type { Speed } from "@dw/shared";
import { Icon, type IconName } from "./icons.tsx";

/** Hedef 3 sekmeleri (TARGET3; PM-084 md. 3): Bugün · Yol · Köy · Ben */
const SEKMELER: [string, string, IconName, string][] = [
  ["today", "#/today", "saat", "Bugün"],
  ["yol", "#/yol", "yol", "Yol"],
  ["koy", "#/koy", "koy", "Köy"],
  ["ben", "#/ben", "ben", "Ben"]
];
/** Ekranın bağlı olduğu sekme: Köy'ün mekânları (durumlar, senaryo, sözlük, kalıplar, günün kayıtları) Köy'de, ayarlar Ben'de kalır */
export function sekme(r: Route["name"]): string {
  switch (r) {
    case "yol": case "rehber": return "yol";
    case "koy": case "domain": case "scenario": case "sozluk": case "kalip": case "m1day": return "koy";
    case "ben": case "profile": case "ses": return "ben";
    default: return "today";
  }
}

export function TabBar({ route }: { route: Route }) {
  const tab = sekme(route.name);
  return (
    <div class="tabbar" role="navigation" aria-label="Ana menü">
      <nav>
        {SEKMELER.map(([k, href, ic, label]) => (
          <a href={href} aria-current={tab === k ? "page" : undefined} data-tab={k}>
            <span class="ic" aria-hidden="true"><Icon name={ic} size={26} /></span>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export function TopBar({ title, back, children }: { title: string; back?: string; children?: ComponentChildren }) {
  return (
    <header class="topbar">
      {back && <a class="iconbtn plain" href={back} aria-label="Geri"><Icon name="back" /></a>}
      <h1>{title}</h1>
      {children}
    </header>
  );
}

/** Saniyede bir odak durumuyla yeniden çizilir */
export function useFocusTick() {
  const [, set] = useState(0);
  useEffect(() => subscribeFocus(() => set((n) => n + 1)), []);
  return focus();
}

/** TS-4: ekranda saniyeli sayaç yok; kalan süre dakika olarak ("4 dk") */
export const minLeft = (sec: number) => `${Math.max(1, Math.ceil(sec / 60))} dk`;
export const mmss = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

/** Öğrenme ekranlarındaki küçük odak göstergesi: seans x/4 ve kalan süre */
/** Başlıktaki seans çipi (#58 A6: "ders başlığında seans ve kalan dakika"); mola sürerken kalan mola */
export function FocusChip() {
  const e = useFocusTick();
  if (!e) return null;
  const now = Date.now();
  const sn = (n: number) => (n <= 4 ? `${n}/4` : `${n}`);
  if (e.rt.phase === "break") return <span class="focuschip" data-test="focus-chip" title="Mola">Mola · {minLeft(e.breakLeftSec(now))}</span>;
  if (e.rt.phase === "focus" && e.current) return <span class="focuschip" data-test="focus-chip" title={`Seans ${e.current.n}`}>Seans {sn(e.current.n)} · {e.rt.paused ? "duraklatıldı" : minLeft(e.focusLeftSec())}</span>;
  return <span class="focuschip" data-test="focus-chip">{e.focusMin()}/{e.cfg.dailyGoalMin} dk</span>;
}

export function Ring({ value, max, size = 92, label }: { value: number; max: number; size?: number; label: string }) {
  const r = size / 2 - 8, c = 2 * Math.PI * r, p = Math.min(1, max ? value / max : 0);
  return (
    <svg class="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" stroke-width="9" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"
        stroke-dasharray={`${c * p} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="48%" text-anchor="middle" dominant-baseline="middle" font-size={size / 4.2} font-weight="700" fill="var(--ink)">{value}</text>
      <text x="50%" y="70%" text-anchor="middle" font-size={size / 9} fill="var(--muted)">/ {max} dk</text>
    </svg>
  );
}

/** Ortak hata deseni: hata aynı ekranda kalır, "Tekrar dene" sunulur (v1'deki "menüye atma" hatasının çözümü) */
export function ErrorPanel({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div class="card err" role="alert">
      <p><b>Bir sorun oldu.</b> {message}</p>
      {onRetry && <button class="btn sm" onClick={onRetry}>Tekrar dene</button>}
    </div>
  );
}

export function SpeakBtn({ text, speed = "normal", label = "Dinle" }: { text: string; speed?: Speed; label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <button class="iconbtn" aria-label={`${label}: ${text}`} disabled={busy}
      onClick={async () => { setBusy(true); try { await speak(text, "de", speed); } finally { setBusy(false); } }}>
      {busy ? <Icon name="stop" /> : <Icon name="volume" />}
    </button>
  );
}

export function Art({ art, de }: { art?: string; de: string }) {
  // PM-035 §3: sözlükte artikel bazen `de` içinde de duruyor; iki kez basılmaz ("der der Tisch" yok)
  const has = !!art && new RegExp(`^${art}\\s`, "i").test(de);
  const word = has ? de.slice(art!.length + 1) : de;
  return <span class="de">{art && <span class={`tag-${art}`}>{art} </span>}{word}</span>;
}

export function Loading({ text = "Yükleniyor…" }: { text?: string }) {
  return <p class="muted" aria-live="polite" aria-busy="true" data-loading>{text}</p>;
}
