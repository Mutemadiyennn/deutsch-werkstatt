/**
 * Günün rehberi (PM-065 madde 2): o günün hedefi ve kelimeleri tek sayfada. Yol haritasındaki gün bandının "Rehber"
 * düğmesi açar; adına ve hitabına göre kişiselleştirilir.
 * Kalıplar bilerek yok (inceleme #104 P1-2): M1 gün dosyaları günün kalıplarını tanımlamıyor; kelimelerin geçtiği her kalıbı
 * listelemek 1. günde 18 kalıp (geçmiş zaman dahil) çıkarıyordu. Gün dosyasına `kaliplar` gelince (İÇ) eklenecek.
 */
import { useEffect, useState } from "preact/hooks";
import type { Gun, Lexeme } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadM1Gun } from "../services/content.ts";
import { personalizeDeep } from "../core/persona.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { ListenButton } from "../ui/kit.tsx";
import { haftaRengi } from "./Yol.tsx";

export function RehberEkrani({ day }: { day: number }) {
  const { profile } = useApp();
  const [d, setD] = useState<{ gun: Gun; kelimeler: Lexeme[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    Promise.all([loadM1Gun(day), loadLexicon()]).then(([gun, lx]) => {
      const kisi = { name: profile.displayName, address: profile.address };
      const lex = new Map(lx.lexemes.map((l) => [l.id, l]));
      const kelimeler = gun.yeni_kartlar.map((id) => lex.get(id)).filter((l): l is Lexeme => !!l);
      setD({ gun, kelimeler: personalizeDeep(kelimeler, kisi) });
    }).catch((e) => setErr(String(e?.message || e)));
  }, [day]);
  if (err) return <div class="stack"><TopBar title="Rehber" back="#/yol" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!d) return <Loading />;
  const { gun, kelimeler } = d;
  return (
    <div class="stack rehber" data-test="rehber" style={{ "--vurgu": haftaRengi(1) } as Record<string, string>}>
      <TopBar title={`Rehber · ${gun.day}. gün`} back="#/yol" />
      <section class="gun-bant"><div class="grow"><div class="gun-bant-ust">1. HAFTA · GÜN {gun.day}</div><div class="gun-bant-ad">{gun.title_tr}</div></div></section>
      <section class="card stack">
        <h2>Bugün ne yapabileceksin?</h2>
        <p>{gun.goal_tr}</p>
        <p class="small" data-test="rehber-yapabilir"><b>Gün sonunda:</b> {gun.can_do.tr}</p>
      </section>
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
