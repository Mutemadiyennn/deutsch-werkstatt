/**
 * AKIS AK-2 kural 4 / TARGET3b "Halka: eşleştir" (AK-10 3. adım): 4–6 çift, iki sütun (Almanca | Türkçe).
 * "Kontrol et" yok: eşleşme anında değerlendirilir. Eşleşen çift yeşil ve işaretli, kilitlenir; yanlış eşleşme kısa sallanır,
 * ceza yazılmaz — o kart halkada bir kez daha gelir (çağırana `yanlislar` döner). Almanca kareye dokununca sesi çalar.
 */
import { useMemo, useState } from "preact/hooks";
import { speak } from "../../services/speech.ts";
import { Icon } from "../icons.tsx";
import { ActionBar } from "../kit.tsx";

export interface Cift { id: string; de: string; tr: string }
/** Tohumlu karıştırma (aynı tohum aynı sıra; testlenebilir) */
function karistir<T>(a: T[], tohum: string): T[] {
  let h = 2166136261; for (const ch of tohum) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const r = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
  const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j]!, b[i]!]; } return b;
}

export function Eslestir({ ciftler, tohum = "eslestir", onBitti }: { ciftler: Cift[]; tohum?: string; onBitti: (yanlislar: string[]) => void }) {
  const sol = useMemo(() => karistir(ciftler, `${tohum}:de`), [ciftler, tohum]);
  const sag = useMemo(() => karistir(ciftler, `${tohum}:tr`), [ciftler, tohum]);
  const [secili, setSecili] = useState<{ yan: "de" | "tr"; id: string } | null>(null);
  const [tamam, setTamam] = useState<Set<string>>(new Set());
  const [yanlis, setYanlis] = useState<Set<string>>(new Set());
  const [salla, setSalla] = useState<string | null>(null);
  const bitti = tamam.size === ciftler.length;
  const dokun = (yan: "de" | "tr", c: Cift) => {
    if (tamam.has(c.id)) return;
    if (yan === "de") void speak(c.de, "de", "normal", true);
    if (!secili || secili.yan === yan) { setSecili({ yan, id: c.id }); return; }
    if (secili.id === c.id) { setTamam(new Set([...tamam, c.id])); setSecili(null); return; }
    // yanlış: kısa sallanma, ceza yok; her iki kartın eşleşmesi halkada bir kez daha gelir
    const k = `${yan}:${c.id}`; setSalla(k); setTimeout(() => setSalla((x) => (x === k ? null : x)), 360);
    setYanlis(new Set([...yanlis, c.id, secili.id])); setSecili(null);
  };
  const kare = (yan: "de" | "tr", c: Cift) => {
    const ok = tamam.has(c.id), sec = secili?.yan === yan && secili.id === c.id;
    return (
      <button type="button" class={`es-kare${ok ? " tamam" : ""}${sec ? " sec" : ""}${salla === `${yan}:${c.id}` ? " salla" : ""}`} {...(yan === "de" ? { lang: "de" } : {})}
        disabled={ok} aria-pressed={sec} data-test={`es-${yan}`} data-id={c.id} onClick={() => dokun(yan, c)}>
        {ok && <Icon name="check" />}{yan === "de" ? c.de : c.tr}
      </button>
    );
  };
  return (
    <section class="stack fade" data-test="eslestir">
      <div><div class="kicker">Eşleştir</div><h2 style={{ margin: "4px 0 0" }}>Kelimeyi anlamıyla buluştur</h2></div>
      <div class="es-izgara">{sol.map((c, i) => <>{kare("de", c)}{kare("tr", sag[i]!)}</>)}</div>
      <p class="small muted row" style={{ margin: 0, gap: 8, flexWrap: "nowrap" }}><Icon name="volume" /><span>Almanca kelimeye dokununca sesini duyarsın.</span></p>
      {bitti && <ActionBar><button class="btn primary block" data-test="next" onClick={() => onBitti([...yanlis])}>Devam</button></ActionBar>}
    </section>
  );
}
