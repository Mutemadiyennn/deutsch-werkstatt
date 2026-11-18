/**
 * Raute kimliği (DESIGN.md §1): bütün ilerleme Raute dizisiyle gösterilir; dolu / yarım / boş.
 * Ayrıca: Bugün'ün gök şeridindeki şehir silueti ve ifade kartının sahne çizimi (özgün, düz, geometrik SVG).
 */
import type { ComponentChildren } from "preact";
import type { Explanation } from "@dw/shared";
import { Icon } from "./icons.tsx";
import { Chips, Rich, WhyLink } from "./rich.tsx";

export type RState = 0 | 0.5 | 1;

/** Ekran başına tek ilerleme göstergesi. `label` ekran okuyucu için ("3/12 ifade") */
export function Rauten({ states, label, size = 18, test }: { states: RState[]; label: string; size?: number; test?: string }) {
  const w = size, gap = Math.round(size * 0.3);
  const W = states.length * w + Math.max(0, states.length - 1) * gap;
  return (
    <svg class="rauten" width={W} height={w} viewBox={`0 0 ${W} ${w}`} role="img" aria-label={label} data-test={test} data-progress="">
      {states.map((s, i) => {
        const x = i * (w + gap), h = w / 2, m = 1;
        const full = `${x + h},${m} ${x + w - m},${h} ${x + h},${w - m} ${x + m},${h}`;
        const bottom = `${x + m},${h} ${x + w - m},${h} ${x + h},${w - m}`;
        return (
          <g class={s === 1 ? "on" : s === 0.5 ? "half" : "off"}>
            <polygon points={full} class="r-bg" />
            {s === 0.5 && <polygon points={bottom} class="r-fill" />}
            {s === 1 && <polygon points={full} class="r-fill" />}
          </g>
        );
      })}
    </svg>
  );
}

/** Gök şeridi silueti: kurgusal Bavyera kasabası (evler + soğan kubbeli kule). Renk currentColor. */
export function Skyline() {
  return (
    <svg class="skyline" viewBox="0 0 360 64" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g fill="currentColor">
        <path d="M2 64V36l18-14 18 14v28z" />
        <path d="M42 64V30l22-17 22 17v34z" />
        <path d="M90 64V40l14-11 14 11v24z" />
        <path d="M150 64V22h6v-6a6 6 0 0 1 4-5.6V4h2v6.4a6 6 0 0 1 4 5.6v6h6v42z" />
        <path d="M184 64V40l14-11 14 11v24z" />
        <path d="M216 64V32l22-17 22 17v32z" />
        <path d="M264 64V42l14-10 14 10v22z" />
        <path d="M296 64V36l16-12 16 12v28z" />
        <path d="M330 64V42l14-10 14 10v22z" />
      </g>
      <g fill="var(--sky-win)">
        <rect x="56" y="40" width="7" height="7" rx="1" /><rect x="68" y="40" width="7" height="7" rx="1" />
        <rect x="100" y="48" width="7" height="7" rx="1" /><rect x="230" y="40" width="7" height="7" rx="1" />
        <rect x="242" y="40" width="7" height="7" rx="1" /><rect x="194" y="48" width="7" height="7" rx="1" />
      </g>
    </svg>
  );
}

/** Sahne çizimi: mekân aksan rengiyle sade bir tezgâh + siluet (ör. muayenehane resepsiyonu) */
export function Scene({ accent }: { accent: string }) {
  return (
    <svg class="scene" viewBox="0 0 320 112" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ "--ac": accent } as any}>
      <rect width="320" height="112" fill="color-mix(in srgb, var(--ac) 16%, var(--card))" />
      <rect y="86" width="320" height="26" fill="color-mix(in srgb, var(--ac) 26%, var(--card))" />
      <circle cx="104" cy="34" r="14" fill="var(--tinte)" />
      <path d="M80 70a24 22 0 0 1 48 0z" fill="var(--tinte)" />
      <rect x="36" y="62" width="180" height="40" rx="8" fill="var(--ac)" />
      <rect x="36" y="58" width="180" height="8" rx="4" fill="color-mix(in srgb, var(--ac) 70%, #000)" />
      <rect x="132" y="38" width="30" height="20" rx="3" fill="#fff" opacity="0.92" />
      <rect x="52" y="74" width="30" height="16" rx="4" fill="#fff" opacity="0.92" />
      <rect x="236" y="20" width="58" height="34" rx="8" fill="#fff" opacity="0.95" />
      <rect x="246" y="31" width="34" height="4" rx="2" fill="var(--ac)" /><rect x="246" y="40" width="24" height="4" rx="2" fill="var(--ac)" />
      <circle cx="268" cy="74" r="12" fill="color-mix(in srgb, var(--himmel) 30%, var(--card))" />
      <path d="M252 102a16 16 0 0 1 32 0z" fill="color-mix(in srgb, var(--himmel) 30%, var(--card))" />
    </svg>
  );
}

/** Mekân aksanları (DESIGN.md §2) — alan → renk */
export const PLACE_ACCENT: Record<string, string> = {
  arzt: "#2BA89A", telefon: "#2BA89A", essen: "#C27A2C", einkaufen: "#C27A2C", arbeit: "#4F6683", smalltalk: "#4F6683",
  amt: "#6E5BC7", bank: "#1F8A9E", wohnen: "#B5577A", friseur: "#9A5BB0", sport: "#D39A1B", verkehr: "#3E7CB1",
  freizeit: "#2F9E6B", strategie: "#1C6FD6"
};
export const accentOf = (domain?: string) => (domain && PLACE_ACCENT[domain]) || "#1C6FD6";

/** Baş harfli avatar (karakterler için; gerçek kişi fotoğrafı yok) */
export function Avatar({ initials, accent, size = 52 }: { initials: string; accent: string; size?: number }) {
  return <span class="avatar" aria-hidden="true" style={{ width: size, height: size, background: accent, fontSize: size * 0.38 }}>{initials}</span>;
}

/* TS-3 adları: ekranlar bu bileşenlerden kurulur */
export const RauteRow = Rauten;

/** Gök şeridi (DESIGN §6): günün saatine göre ton, soluk Raute ağı, siluet */
export function SkyBand({ hour, children }: { hour: number; children?: ComponentChildren }) {
  const tod = hour < 5 ? "night" : hour < 11 ? "morning" : hour < 18 ? "day" : hour < 22 ? "evening" : "night";
  return <section class={`sky ${tod}`} data-test="sky"><Skyline />{children}</section>;
}

/** Gündelik dil paneli (DESIGN §4): "Gündelikte böyle duyarsın" + ifade + tek satır not + küçük dinle */
export function AlltagPanel({ de, note, exp, onPlay, playing, onWhy }: { de: string; note?: string; exp?: Explanation; onPlay: () => void; playing?: boolean; onWhy?: () => void }) {
  // IFADE_ORNEK (PM-017 eki): ifade + kelime kelime çipler + "Aynı anlam" + ne zaman; ayrıntı "Neden böyle?" alt sayfasında
  return (
    <div class="alltagpanel" data-test="alltag-panel">
      <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
        <div class="grow"><div class="lbl">Gündelikte böyle de duyarsın</div><div class="de" lang="de">{de}</div></div>
        <button class="miniplay" onClick={onPlay} aria-label={`Dinle: ${de}`}>{playing ? <Icon name="stop" size={16} /> : <Icon name="play" size={16} />}</button>
      </div>
      {exp ? <>
        <Chips parts={exp.parcalar} />
        <p class="small note">Aynı anlam: <Rich text={exp.anlam_tr} />{exp.ne_zaman_tr && <><br /><Rich text={exp.ne_zaman_tr} /></>}</p>
      </> : note && <div class="small note"><Rich text={note} /></div>}
      {onWhy && <WhyLink onClick={onWhy} />}
    </div>
  );
}
