/**
 * Günün rehberi (PM-065 madde 2): o günün hedefi, kalıpları ve kelimeleri tek sayfada. Yol haritasındaki gün bandının
 * "Rehber" düğmesi açar. Kalıp ve kelimeler adına ve hitabına göre kişiselleştirilir; kalıp kartına bağlanır.
 */
import { useEffect, useState } from "preact/hooks";
import type { Gun, Lexeme, Pattern } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadM1Gun } from "../services/content.ts";
import { personalizeDeep } from "../core/persona.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { ListenButton } from "../ui/kit.tsx";
import { Rich } from "../ui/rich.tsx";
import { haftaRengi } from "./Yol.tsx";

export function RehberEkrani({ day }: { day: number }) {
  const { profile } = useApp();
  const [d, setD] = useState<{ gun: Gun; kelimeler: Lexeme[]; kaliplar: Pattern[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    Promise.all([loadM1Gun(day), loadLexicon()]).then(([gun, lx]) => {
      const kisi = { name: profile.displayName, address: profile.address };
      const lex = new Map(lx.lexemes.map((l) => [l.id, l]));
      const kelimeler = gun.yeni_kartlar.map((id) => lex.get(id)).filter((l): l is Lexeme => !!l);
      const pIds = [...new Set(kelimeler.flatMap((l) => l.patterns ?? []))];
      const pm = new Map(lx.patterns.map((p) => [p.id, p]));
      const kaliplar = pIds.map((id) => pm.get(id)).filter((p): p is Pattern => !!p);
      setD({ gun, kelimeler: personalizeDeep(kelimeler, kisi), kaliplar: personalizeDeep(kaliplar, kisi) });
    }).catch((e) => setErr(String(e?.message || e)));
  }, [day]);
  if (err) return <div class="stack"><TopBar title="Rehber" back="#/yol" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!d) return <Loading />;
  const { gun, kelimeler, kaliplar } = d;
  return (
    <div class="stack rehber" data-test="rehber" style={{ "--vurgu": haftaRengi(1) } as Record<string, string>}>
      <TopBar title={`Rehber · ${gun.day}. gün`} back="#/yol" />
      <section class="gun-bant"><div class="grow"><div class="gun-bant-ust">1. HAFTA · GÜN {gun.day}</div><div class="gun-bant-ad">{gun.title_tr}</div></div></section>
      <section class="card stack">
        <h2>Bugün ne yapabileceksin?</h2>
        <p>{gun.goal_tr}</p>
        <p class="small" data-test="rehber-yapabilir"><b>Gün sonunda:</b> {gun.can_do.tr}</p>
      </section>
      {kaliplar.length > 0 && (
        <section class="card stack" data-test="rehber-kaliplar">
          <h2>Kalıplar</h2>
          {kaliplar.map((p) => (
            <a class="rehber-kalip" href={`#/kalip/${encodeURIComponent(p.id)}`} data-test="rehber-kalip">
              {p.frame_tr && <div class="small"><Rich text={p.frame_tr} /></div>}
              <div class="row" style={{ flexWrap: "nowrap", gap: 8 }}><span class="grow" lang="de"><b>{p.examples[0]!.de}</b><br /><span class="small muted" lang="tr">{p.examples[0]!.tr}</span></span></div>
            </a>
          ))}
        </section>
      )}
      <section class="card stack" data-test="rehber-kelimeler">
        <h2>Kelimeler ({kelimeler.length})</h2>
        <ul class="list rehber-kelime">{kelimeler.map((l) => (
          <li class="row" style={{ flexWrap: "nowrap" }} data-test="rehber-kelime">
            <span class="grow"><b lang="de">{l.art ? `${l.art} ${l.de}` : l.de}</b><br /><span class="small muted">{l.tr}</span></span>
            <ListenButton text={l.art ? `${l.art} ${l.de}` : l.de} small slowToggle={false} label={`${l.de} dinle`} />
          </li>))}</ul>
      </section>
    </div>
  );
}
