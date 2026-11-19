/**
 * #58 B2 kalıp kartı: kural (kurallar_tr, tek fikir), örnekler (dinlenebilir), slot doldurma (boşluğa gelebilenler; seçilen
 * öbeği içeren örnek öne çıkar), dönüşümler (soru, olumsuz, kibar, geçmiş, sebep, aktarma, koşul), sık hata. `grammar_tr`
 * yazar notudur, gösterilmez (OD-9). Liste: `#/kalip`; kart: `#/kalip/<id>`. Çevrimdışı (sözlük paketiyle gelir).
 */
import { useEffect, useState } from "preact/hooks";
import type { Pattern } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon } from "../services/content.ts";
import { personalizeDeep } from "../core/persona.ts";
import { DONUSUM_SIRA, DONUSUM_TR, kalipSirasi, ornekteGecer } from "../core/kalip.ts";
import { ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { Rich } from "../ui/rich.tsx";

function useKaliplar() {
  const { profile } = useApp();
  const [ps, setPs] = useState<Pattern[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    loadLexicon().then((x) => setPs(personalizeDeep(x.patterns, { name: profile.displayName, address: profile.address })))
      .catch((e) => setErr(String(e?.message || e)));
  }, []);
  return { ps, err };
}

export function KalipEkrani({ id }: { id?: string }) {
  const { ps, err } = useKaliplar();
  if (err) return <div class="stack"><ProgressHeader title="Kalıplar" back="#/learn" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!ps) return <Loading />;
  if (!id) return <KalipListesi ps={ps} />;
  const p = ps.find((x) => x.id === id);
  if (!p) return <div class="stack"><ProgressHeader title="Kalıp" back="#/kalip" /><ErrorPanel message="Bu kalıp bulunamadı." /></div>;
  return <KalipKarti p={p} />;
}

function KalipListesi({ ps }: { ps: Pattern[] }) {
  return (
    <div class="stack" data-test="kalip-liste">
      <ProgressHeader title="Kalıplar" back="#/learn" />
      <p class="small muted">Cümle kurmanın kalıpları: kuralı, örnekleri, boşluğa ne gelir, başka biçimleri.</p>
      <ul class="list card">{kalipSirasi(ps).map((p) => (
        <li><a href={`#/kalip/${encodeURIComponent(p.id)}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} data-test="kalip-satir">
          <span class="grow">{p.frame_tr ? <Rich text={p.frame_tr} /> : <span lang="de">{p.frame}</span>}<br />
            <span class="small muted" lang="de">{p.examples[0]?.de}</span></span>
          <span class="chip">{p.level}</span><span aria-hidden="true">›</span></a></li>))}</ul>
    </div>
  );
}

export function KalipKarti({ p }: { p: Pattern }) {
  const [secili, setSecili] = useState<string | null>(null);
  const ornekler = secili ? [...p.examples].sort((a, b) => Number(ornekteGecer(b.de, secili)) - Number(ornekteGecer(a.de, secili))) : p.examples;
  const donusum = DONUSUM_SIRA.filter((k) => p.transforms[k]);
  return (
    <div class="stack" data-test="kalip-karti" data-id={p.id}>
      <ProgressHeader title="Kalıp" back="#/kalip" />
      <section class="card stack">
        <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
          <h2 class="grow" data-test="kalip-cerceve">{p.frame_tr ? <Rich text={p.frame_tr} /> : <span lang="de">{p.frame}</span>}</h2>
          <span class="chip">{p.level}</span>
        </div>
        {p.kurallar_tr.length > 0 && <ul class="kurallar" data-test="kalip-kurallar">{p.kurallar_tr.map((k) => <li><Rich text={k} /></li>)}</ul>}
      </section>

      <section class="card stack" data-test="kalip-ornekler">
        <div class="kicker">Örnekler</div>
        {ornekler.map((e) => {
          const vurgu = !!secili && ornekteGecer(e.de, secili);
          return <div class={`row kalip-ornek${vurgu ? " vurgu" : ""}`} style={{ flexWrap: "nowrap", alignItems: "flex-start" }} data-test="kalip-ornek" data-vurgu={vurgu ? "1" : undefined}>
            <span class="grow"><span lang="de">{e.de}</span>{e.layer === "alltag" && <span class="badge alltag"> günlük</span>}<br /><span class="small muted">{e.tr}</span></span>
            <ListenButton text={e.de} small /></div>;
        })}
      </section>

      {p.slots.length > 0 && (
        <section class="card stack" data-test="kalip-slotlar">
          <div class="kicker">Boşluğa ne gelir?</div>
          <p class="small muted">Birine dokun: dinle; onu kullanan örnek yukarıda öne çıkar.</p>
          {p.slots.map((s) => (
            <div class="stack" style={{ gap: 6 }}>
              <div class="small"><b>{s.name}</b></div>
              <div class="row" style={{ gap: 6 }} lang="de">{s.fills.map((f) => (
                <button class="wchip" aria-pressed={secili === f} data-test="kalip-dolgu"
                  onClick={() => { setSecili(secili === f ? null : f); }}>{f}</button>))}</div>
            </div>
          ))}
          {secili && <div class="row" data-test="kalip-secili"><span class="grow de" lang="de">{secili}</span><ListenButton text={secili} small /></div>}
        </section>
      )}

      {donusum.length > 0 && (
        <section class="card stack" data-test="kalip-donusumler">
          <div class="kicker">Aynı kalıp, başka biçimde</div>
          {donusum.map((k) => (
            <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }} data-test="kalip-donusum">
              <span class="grow"><span class="tiny muted">{DONUSUM_TR[k]}</span><br /><span lang="de">{p.transforms[k]}</span></span>
              <ListenButton text={p.transforms[k]!} small /></div>
          ))}
        </section>
      )}

      {p.mistakes_tr.length > 0 && (
        <section class="card stack" data-test="kalip-hatalar">
          <div class="kicker">Sık yapılan hata</div>
          <ul class="kurallar">{p.mistakes_tr.map((m) => <li><Rich text={m} /></li>)}</ul>
        </section>
      )}
    </div>
  );
}
