/**
 * Gelen arama alıştırması (DESIGN §1/§4, TARGET 3; LS-9.2 kademe 1'in ekranı): korkuyla güvenli ortamda yüzleşmek.
 * Her zaman koyu; zeminde soluk Raute ağı. "Aç" → senaryonun rol oyunu; "Sonra" → Bugün. Bildirim ve zamanlama R1-18'de.
 */
import { useEffect } from "preact/hooks";
import { Icon } from "../ui/icons.tsx";
import { Avatar, accentOf } from "../ui/raute.tsx";
import { haptic } from "../services/haptics.ts";

/** Pilot aramalar: kurgusal dünya (WORLD.md) — Dr. Weber'in muayenehanesi, sekreter Frau Huber */
const CALLS: Record<string, { org: string; who: string; initials: string; domain: string }> = {
  "sc:telefon:01-arzttermin": { org: "Praxis Dr. Weber", who: "Frau Huber", initials: "FH", domain: "arzt" }
};
const STUCK = ["Wie bitte?", "Etwas langsamer, bitte.", "Können Sie das buchstabieren?"];

export function CallScreen({ id }: { id: string }) {
  const c = CALLS[id] ?? CALLS["sc:telefon:01-arzttermin"]!;
  const sid = CALLS[id] ? id : "sc:telefon:01-arzttermin";
  useEffect(() => { haptic("selection"); document.documentElement.classList.add("callmode"); return () => document.documentElement.classList.remove("callmode"); }, []);
  return (
    <div class="callscreen" data-test="call" role="dialog" aria-label={`Gelen arama alıştırması: ${c.org}`}>
      <div class="callhead">
        <div class="small callkicker">Gelen arama alıştırması</div>
        <div class="ringwrap"><Avatar initials={c.initials} accent={accentOf(c.domain)} size={112} /></div>
        <h1 class="callorg" lang="de">{c.org}</h1>
        <div class="callwho">{c.who} arıyor</div>
        <span class="calltopic"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0.8 11.2 6 6 11.2 0.8 6z" fill="var(--brezel)" /></svg> Konusu sürpriz</span>
      </div>
      <section class="stuckcard" aria-label="Takılırsan">
        <div class="small stucklbl">Takılırsan</div>
        {STUCK.map((s) => <div class="stuckline" lang="de">{s}</div>)}
      </section>
      <div class="callbtns">
        <a class="callbtn decline" href="#/today" data-test="call-later" aria-label="Sonra"><span><Icon name="phone" size={30} /></span>Sonra</a>
        <a class="callbtn accept" href={`#/scenario/${encodeURIComponent(sid)}/roleplay`} data-test="call-accept" aria-label="Aç"><span><Icon name="phone" size={30} /></span>Aç</a>
      </div>
    </div>
  );
}
