/**
 * #58 B2 kalıp kartı: kural (kurallar_tr, tek fikir), örnekler (dinlenebilir), slot doldurma (boşluğa gelebilenler; seçilen
 * öbeği içeren örnek öne çıkar), dönüşümler (soru, olumsuz, kibar, geçmiş, sebep, aktarma, koşul), sık hata. `grammar_tr`
 * yazar notudur, gösterilmez (OD-9). Liste: `#/kalip`; kart: `#/kalip/<id>`. Çevrimdışı (sözlük paketiyle gelir).
 */
import { useEffect, useRef, useState } from "preact/hooks";
import type { Lexeme, Pattern } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon } from "../services/content.ts";
import { personalizeDeep } from "../core/persona.ts";
import { DONUSUM_SIRA, DONUSUM_TR, kalipSirasi, ornekteGecer } from "../core/kalip.ts";
import { ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { yerelAcikla } from "../core/sozluk.ts";
import { Icon } from "../ui/icons.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { Rich } from "../ui/rich.tsx";

export function useKaliplar() {
  const { profile } = useApp();
  const [ps, setPs] = useState<Pattern[] | null>(null);
  const [lex, setLex] = useState<Lexeme[]>([]);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    loadLexicon().then((x) => { setPs(personalizeDeep(x.patterns, { name: profile.displayName, address: profile.address })); setLex(x.lexemes); })
      .catch((e) => setErr(String(e?.message || e)));
  }, []);
  return { ps, lex, err };
}

/** Karttan dönüş: Sözlük'ten gelindiyse oraya (sessionStorage), yoksa listeye (inceleme #94 P1-3) */
export const KALIP_GERI = "dw:kalip-geri";
const geriAdres = () => { try { return sessionStorage.getItem(KALIP_GERI) || "#/kalip"; } catch { return "#/kalip"; } };

export function KalipEkrani({ id }: { id?: string }) {
  const { ps, lex, err } = useKaliplar();
  if (err) return <div class="stack"><ProgressHeader title="Kalıplar" back="#/learn" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!ps) return <Loading />;
  if (!id) return <KalipListesi ps={ps} />;
  const p = ps.find((x) => x.id === id);
  if (!p) return <div class="stack"><ProgressHeader title="Kalıp" back="#/kalip" /><ErrorPanel message="Bu kalıp bulunamadı." /></div>;
  return <KalipKarti p={p} lex={lex} back={geriAdres()} />;
}

function KalipListesi({ ps }: { ps: Pattern[] }) {
  return (
    <div class="stack" data-test="kalip-liste">
      <ProgressHeader title="Kalıplar" back="#/learn" />
      <p class="small muted">Cümle kurmanın kalıpları: kuralı, örnekleri, boşluğa ne gelir, başka biçimleri.</p>
      <ul class="list card">{kalipSirasi(ps).map((p) => (
        <li key={p.id}><a href={`#/kalip/${encodeURIComponent(p.id)}`} onClick={() => { try { sessionStorage.removeItem(KALIP_GERI); } catch { /* yok */ } }} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} data-test="kalip-satir">
          <span class="grow">{p.frame_tr ? <Rich text={p.frame_tr} /> : <span lang="de">{p.frame}</span>}<br />
            <span class="small muted" lang="de">{p.examples[0]?.de}</span></span>
          <span class="chip">{p.level}</span><span aria-hidden="true">›</span></a></li>))}</ul>
    </div>
  );
}

/** Alt sayfa (inceleme #94 2. tur P2): açılınca odak "Kapat"ta, Tab sayfanın içinde döner, Escape kapatır, kapanınca
 *  odak açan düğmeye döner. Arkadaki alıştırma (madde, yarım cevap) olduğu gibi kalır. */
function KalipSayfasi({ p, kapat, donus, children }: { p: Pattern; kapat: () => void; donus?: HTMLElement | null; children: preact.ComponentChildren }) {
  const kutu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Safari düğmeye tıklayınca odak vermez (activeElement = body); açan düğme ayrıca verilir
    const onceki = donus ?? (document.activeElement as HTMLElement | null);
    kutu.current?.querySelector<HTMLElement>("[data-test=kalip-kapat]")?.focus();
    // tarayıcı düğmeye odak vermezse sayfanın kendisine (tabIndex -1); ekran okuyucu etiketi okur
    if (kutu.current && !kutu.current.contains(document.activeElement)) kutu.current.focus();
    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); kapat(); return; }
      if (e.key !== "Tab" || !kutu.current) return;
      const od = [...kutu.current.querySelectorAll<HTMLElement>("button, [href], input, [tabindex]:not([tabindex='-1'])")].filter((x) => !x.hasAttribute("disabled"));
      if (!od.length) return;
      const ilk = od[0]!, son = od[od.length - 1]!;
      if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
      else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
      else if (!kutu.current.contains(document.activeElement)) { e.preventDefault(); ilk.focus(); }
    };
    document.addEventListener("keydown", tus);
    return () => { document.removeEventListener("keydown", tus); if (onceki?.isConnected) onceki.focus(); };
  }, []);
  return (
    <div class="whydim" onClick={kapat}>
      <div ref={kutu} tabIndex={-1} class="whysheet kalip-sheet stack" role="dialog" aria-modal="true" aria-label="Kalıp kartı" data-test="kalip-karti" data-id={p.id} onClick={(e) => e.stopPropagation()}>
        <div class="row" style={{ flexWrap: "nowrap" }}><h2 class="grow">Kalıp</h2>
          <button class="iconbtn" aria-label="Kapat" data-test="kalip-kapat" onClick={kapat}><Icon name="x" /></button></div>
        {children}
        <button class="btn primary block" onClick={kapat}>Alıştırmaya dön</button>
      </div>
    </div>
  );
}

/**
 * Kalıp kartı. `kapat` verilirse alt sayfa olarak açılır (alıştırmanın içinden: ilerleme silinmez; inceleme #94 P1-3).
 * Boşluk adları (`slots[].name`) yazar alanıdır ve terim içerebilir (Dativ, Akkusativ…): öğrenciye gösterilmez (OD-9; P1-1).
 * Seçilen öbek: onu kullanan örnek hemen çiplerin altında; örnek yoksa bunu söyler ve cihazdaki sözlükten anlamını verir (P1-2).
 */
export function KalipKarti({ p, lex = [], back = "#/kalip", kapat, donus }: { p: Pattern; lex?: Lexeme[]; back?: string; kapat?: () => void; donus?: HTMLElement | null }) {
  const [secili, setSecili] = useState<string | null>(null);
  const donusum = DONUSUM_SIRA.filter((k) => p.transforms[k]);
  const eslesen = secili ? p.examples.find((e) => ornekteGecer(e.de, secili)) : undefined;
  // dolgunun anlamı: içerikteki `fills_tr` (İÇ 7014566898) önce, yoksa cihazdaki sözlük
  const dolguTr = (() => { if (!secili) return null; for (const s of p.slots) { const i = s.fills.indexOf(secili); if (i >= 0 && s.fills_tr?.[i]) return s.fills_tr[i]!; } return null; })();
  const anlam = secili ? (dolguTr ? { tr: dolguTr } : !eslesen ? yerelAcikla(secili, lex) : null) : null;
  const govde = (
    <>
      <section class="card stack">
        <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
          <h2 class="grow" data-test="kalip-cerceve">{p.frame_tr ? <Rich text={p.frame_tr} /> : <span lang="de">{p.frame}</span>}</h2>
          <span class="chip">{p.level}</span>
        </div>
        {p.kurallar_tr.length > 0 && <ul class="kurallar" data-test="kalip-kurallar">{p.kurallar_tr.map((k, i) => <li key={i}><Rich text={k} /></li>)}</ul>}
      </section>

      <section class="card stack" data-test="kalip-ornekler">
        <h3 class="kicker">Örnekler</h3>
        {p.examples.map((e, i) => {
          const vurgu = !!secili && e === eslesen;
          return <div key={i} class={`row kalip-ornek${vurgu ? " vurgu" : ""}`} style={{ flexWrap: "nowrap", alignItems: "flex-start" }} data-test="kalip-ornek" data-vurgu={vurgu ? "1" : undefined}>
            <span class="grow"><span lang="de">{e.de}</span>{e.layer === "alltag" && <span class="badge alltag"> günlük</span>}<br /><span class="small muted">{e.tr}</span></span>
            <ListenButton text={e.de} small /></div>;
        })}
      </section>

      {p.slots.length > 0 && (
        <section class="card stack" data-test="kalip-slotlar">
          <h3 class="kicker">Boşluğa ne gelir?</h3>
          <p class="small muted">Birine dokun: dinle, kullanıldığı örneği gör.</p>
          {p.slots.map((s, si) => (
            <div key={si} class="row" style={{ gap: 6 }} lang="de" data-test="kalip-slot">{s.fills.map((f) => (
              <button key={f} class="wchip" aria-pressed={secili === f} data-test="kalip-dolgu" onClick={() => setSecili(secili === f ? null : f)}>{f}</button>))}</div>
          ))}
          {secili && <div class="stack kalip-secili" style={{ gap: 6 }} data-test="kalip-secili" aria-live="polite"
            ref={(el) => { if (el && el.dataset.k !== secili) { el.dataset.k = secili; requestAnimationFrame(() => el.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })); } }}>
            <div class="row" style={{ flexWrap: "nowrap" }}><span class="grow"><b class="de" lang="de">{secili}</b>{dolguTr && <><br /><span class="small muted" data-test="kalip-dolgu-tr">{dolguTr}</span></>}</span><ListenButton text={secili} small /></div>
            {eslesen ? <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }} data-test="kalip-secili-ornek">
                <span class="grow"><span lang="de">{eslesen.de}</span><br /><span class="small muted">{eslesen.tr}</span></span><ListenButton text={eslesen.de} small /></div>
              : <p class="small muted" data-test="kalip-secili-yok">Bu öbekle hazır bir örnek yok. Yukarıdaki örneklerden birinde boşluğa koyarak söyle.{anlam?.tr && !dolguTr ? <> Anlamı: <b>{anlam.tr}</b></> : null}</p>}
          </div>}
        </section>
      )}

      {donusum.length > 0 && (
        <section class="card stack" data-test="kalip-donusumler">
          <h3 class="kicker">Aynı kalıp, başka biçimde</h3>
          {donusum.map((k) => (
            <div key={k} class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }} data-test="kalip-donusum">
              <span class="grow"><span class="tiny muted">{DONUSUM_TR[k]}</span><br /><span lang="de">{p.transforms[k]}</span></span>
              <ListenButton text={p.transforms[k]!} small /></div>
          ))}
        </section>
      )}

      {p.mistakes_tr.length > 0 && (
        <section class="card stack" data-test="kalip-hatalar">
          <h3 class="kicker">Sık yapılan hata</h3>
          <ul class="kurallar">{p.mistakes_tr.map((m, i) => <li key={i}><Rich text={m} /></li>)}</ul>
        </section>
      )}
    </>
  );
  if (kapat) return <KalipSayfasi p={p} kapat={kapat} donus={donus}>{govde}</KalipSayfasi>;
  return (
    <div class="stack" data-test="kalip-karti" data-id={p.id}>
      <ProgressHeader title="Kalıp" back={back} />
      {govde}
    </div>
  );
}
