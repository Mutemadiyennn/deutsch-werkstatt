/**
 * OD-9.2 / D-092: açıklamadaki Almanca kelimeler `**kalın**` işaretiyle yazılır; ekranda kalın (lang="de") gösterilir.
 * Yıldızlar hiçbir zaman ekranda görünmez.
 */
import type { Explanation } from "@dw/shared";
import { Icon } from "./icons.tsx";

export function Rich({ text }: { text?: string | null }) {
  if (!text) return null;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <b lang="de">{p}</b> : p))}</>;
}
/** Seslendirme ve aria için işaretsiz metin */
export const plain = (t?: string) => (t || "").replace(/\*\*(.+?)\*\*/g, "$1");

/** Kelime kelime çipler: Almancası üstte, Türkçesi altta (OD-9.1 `parcalar`) */
export function Chips({ parts }: { parts: Explanation["parcalar"] }) {
  if (!parts?.length) return null;
  return <div class="expchips" data-test="exp-chips">{parts.map((p) => <span><b lang="de">{p.de}</b><Rich text={p.tr} /></span>)}</div>;
}

/** "Neden böyle?" alt sayfası: her satır tek fikir (IFADE_ORNEK sağ ekran) */
export function WhySheet({ tips, onClose }: { tips: { de?: string; text: string }[]; onClose: () => void }) {
  return (
    <div class="whydim" onClick={onClose}>
      <div class="whysheet" role="dialog" aria-label="Neden böyle?" data-test="why-sheet" onClick={(e) => e.stopPropagation()}>
        <div class="grab" aria-hidden="true" />
        <h3>Neden böyle?</h3>
        {tips.map((t) => <div class="tip">{t.de && <b class="de" lang="de">{t.de}</b>}<p><Rich text={t.text} /></p></div>)}
        <button class="btn primary block" onClick={onClose} data-test="why-close">Anladım</button>
      </div>
    </div>
  );
}
export function WhyLink({ onClick }: { onClick: () => void }) {
  return <button class="whylink" onClick={onClick} data-test="why-open"><Icon name="target" size={16} /> Neden böyle?</button>;
}
