/**
 * Temel ders oynatıcısı (#58 A5, Seans 2): R0 dersleri (günler, aylar, sayılar, saat, tarih, soru kelimeleri, sein/haben,
 * kip fiilleri, harf harf söyleme). Akış `core/ders.ts`. Kaldığı yer cihazda saklanır; ders bitince planlayıcı onu
 * yeniden önermez (meta `ders:<id>.bitti`).
 */
import { useEffect, useState } from "preact/hooks";
import type { TemelDers } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadTemel } from "../services/content.ts";
import { getMeta, setMeta } from "../data/db.ts";
import { personalizeDeep } from "../core/persona.ts";
import { DERS_ADIM_TR, TANIT_GRUP, adimlarDers, altSayisi, dersAnahtari, dersIleri, dersKonum, maddeler, type DersIlerleme } from "../core/ders.ts";
import { speak, stopSpeaking } from "../services/speech.ts";
import { ActionBar, FeedbackBand, ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { Art, ErrorPanel, Loading } from "../ui/components.tsx";
import { Chips, Rich } from "../ui/rich.tsx";
import { DrillView } from "../ui/drill.tsx";

const E2E = import.meta.env.MODE === "e2e";

export function DersEkrani({ id }: { id: string }) {
  const { profile } = useApp();
  const [t, setT] = useState<TemelDers | null>(null);
  const [p, setP0] = useState<DersIlerleme | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const d = personalizeDeep(await loadTemel(id), { name: profile.displayName, address: profile.address });
      setT(d);
      setP0(dersKonum(await getMeta<DersIlerleme>(dersAnahtari(id)), d));
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, [id]);
  if (err) return <ErrorPanel message={err} onRetry={() => location.reload()} />;
  if (!t || !p) return <Loading />;
  const setP = (x: DersIlerleme) => { stopSpeaking(); setP0(x); void setMeta(dersAnahtari(id), x); window.scrollTo(0, 0); };
  const steps = adimlarDers(t);

  if (p.bitti) return (
    <div class="stack" data-test="ders">
      <ProgressHeader title={t.title_tr} back="#/today" />
      <section class="card stack" data-test="ders-bitti">
        <h2>Ders bitti</h2>
        <p>{p.toplam ? `${p.toplam} soruda ${p.dogru} doğru.` : ""} {t.can_do.tr}</p>
        <div class="row"><a class="btn primary grow" href="#/today" data-test="ders-geri">Bugün'e dön</a>
          <button class="btn grow" onClick={() => setP({ s: 0, k: 0, dogru: 0, toplam: 0 })}>Tekrar çalış</button></div>
      </section>
    </div>
  );

  const adim = steps[p.s]!;
  const n = altSayisi(t, adim);
  const ileri = (ok?: boolean) => setP(dersIleri(p, t, ok));
  return (
    <div class="stack" data-test="ders" data-adim={adim} data-pos={`${p.s}.${p.k}`}>
      <ProgressHeader title={t.title_tr} back="#/today" sub={`${p.s + 1}/${steps.length} · ${DERS_ADIM_TR[adim]}${n > 1 ? ` ${p.k + 1}/${n}` : ""}`} />
      {adim === "tanit" && <Tanit key={p.k} t={t} grup={p.k} onNext={() => ileri()} />}
      {adim === "tablo" && t.table && <Tablo t={t} onNext={() => ileri()} />}
      {(adim === "anlama" || adim === "kurma" || adim === "konusma") && (
        <DrillView key={`${adim}${p.k}`} d={maddeler(t, adim)[p.k]!} sira={`${p.k + 1}/${n}`} onDone={(s) => ileri(s !== "wrong")} />
      )}
      {adim === "diyalog" && t.dialogue && <Diyalog d={t.dialogue} onNext={() => ileri()} />}
      {adim === "dinleme" && <Dinleme key={p.k} l={t.listening[p.k]!} onNext={(ok) => ileri(ok)} />}
      {adim === "gorev" && t.mission && (
        <section class="card stack fade" data-test="ders-gorev">
          <div class="kicker">Dışarıda dene</div>
          <p><Rich text={t.mission.task_tr} /></p>
          <ActionBar><button class="btn primary block" data-test="next" onClick={() => ileri()}>Dersi bitir</button></ActionBar>
        </section>
      )}
    </div>
  );
}

/** Öğretim kartları: önce duy (kart açılınca okunur), sonra yazısı ve anlamı, açıklama (OD-9) */
function Tanit({ t, grup, onNext }: { t: TemelDers; grup: number; onNext: () => void }) {
  const items = t.teach.slice(grup * TANIT_GRUP, (grup + 1) * TANIT_GRUP);
  useEffect(() => { void speak(items[0] ? (items[0].art ? `${items[0].art} ${items[0].de}` : items[0].de) : "", "de", "normal"); }, [grup]);
  return (
    <div class="stack fade" data-test="ders-tanit">
      {grup === 0 && <p class="small">{t.goal_tr}</p>}
      {items.map((x) => (
        <section class="card stack" data-test="teach">
          <div class="row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
            <div class="de-lg grow" lang="de"><Art art={x.art} de={x.de} /></div>
            <ListenButton text={x.art ? `${x.art} ${x.de}` : x.de} small />
          </div>
          <p>{x.tr}</p>
          {x.exp && <>
            {x.exp.anlam_tr && <p class="small"><Rich text={x.exp.anlam_tr} /></p>}
            <Chips parts={x.exp.parcalar} />
            {x.exp.ne_zaman_tr && <p class="small muted"><Rich text={x.exp.ne_zaman_tr} /></p>}
            {x.exp.ipucu_tr && <p class="small">İpucu: <Rich text={x.exp.ipucu_tr} /></p>}
          </>}
        </section>
      ))}
      <ActionBar><button class="btn primary block" data-test="next" onClick={onNext}>Devam</button></ActionBar>
    </div>
  );
}

function Tablo({ t, onNext }: { t: TemelDers; onNext: () => void }) {
  const tb = t.table!;
  return (
    <section class="card stack fade" data-test="ders-tablo">
      <div class="kicker">{tb.baslik_tr}</div>
      <div style={{ overflowX: "auto" }}>
        <table class="tbl"><thead><tr>{tb.sutunlar.map((c) => <th>{c}</th>)}</tr></thead>
          <tbody>{tb.satirlar.map((r) => <tr>{r.map((c, j) => <td lang={j === 0 ? "de" : undefined}>{j === 0 ? <button class="wordtap" onClick={() => void speak(c, "de", "normal")}>{c}</button> : c}</td>)}</tr>)}</tbody></table>
      </div>
      <p class="tiny muted">Almanca kelimeye dokun: okunuşunu dinle.</p>
      <ActionBar><button class="btn primary block" data-test="next" onClick={onNext}>Devam</button></ActionBar>
    </section>
  );
}

function Diyalog({ d, onNext }: { d: NonNullable<TemelDers["dialogue"]>; onNext: () => void }) {
  return (
    <section class="card stack fade" data-test="ders-diyalog">
      <div class="kicker">{d.title_tr}</div>
      <div class="row"><button class="btn primary grow" data-test="diyalog-dinle" onClick={async () => { for (const l of d.lines) await speak(l.de, "de", "normal"); }}>Diyaloğu dinle</button></div>
      <ul class="list">{d.lines.map((l) => (
        <li class="row" style={{ flexWrap: "nowrap" }}>
          <span class="tiny muted" style={{ width: 22 }}>{l.r === "B" ? "Sen" : ""}</span>
          <span class="grow"><span lang="de">{l.de}</span><br /><span class="small muted">{l.tr}</span></span>
          <ListenButton text={l.de} small slowToggle={false} />
        </li>))}</ul>
      <ActionBar><button class="btn primary block" data-test="next" onClick={onNext}>Devam</button></ActionBar>
    </section>
  );
}

/** Dinleme: önce metinsiz dinle (yavaş/normal), sonra sorular; metin en sonda */
function Dinleme({ l, onNext }: { l: TemelDers["listening"][number]; onNext: (ok?: boolean) => void }) {
  const [q, setQ] = useState(0);
  const [sec, setSec] = useState<number | null>(null);
  const [dogru, setDogru] = useState(0);
  const [dinledi, setDinledi] = useState(false);
  const cal = async (sp: "slow" | "normal") => { setDinledi(true); for (const c of l.script) await speak(c.de, "de", sp); };
  const soru = l.qs[q];
  return (
    <section class="card stack fade" data-test="ders-dinleme">
      <div class="kicker">{l.title_tr}</div>
      <div class="row"><button class="btn primary grow" data-test="dinle" onClick={() => void cal(l.speed === "slow" ? "slow" : "normal")}>Dinle</button>
        {l.speeds.includes("slow") && l.speeds.length > 1 && <button class="btn grow" onClick={() => void cal("slow")}>Yavaş</button>}</div>
      {!dinledi && !E2E ? <p class="small muted">Önce dinle; sorular sonra gelecek.</p> : soru ? (
        <div class="stack">
          <h3>{soru.q_tr}</h3>
          <div role="group">{soru.opts.map((o, k) => <button class={`opt${sec === null ? "" : k === soru.ans ? " right" : k === sec ? " wrong" : ""}`} disabled={sec !== null} data-opt={k}
            {...(E2E ? { "data-right": k === soru.ans ? "1" : undefined } : {})} onClick={() => { setSec(k); if (k === soru.ans) setDogru(dogru + 1); }}>{o}</button>)}</div>
          {sec !== null && <ActionBar>
            <FeedbackBand kind={sec === soru.ans ? "ok" : "bad"} title={sec === soru.ans ? "Doğru." : `Doğrusu: ${soru.opts[soru.ans]}`} />
            <button class="btn primary block" data-test="next" onClick={() => { setSec(null); setQ(q + 1); }}>Devam</button></ActionBar>}
        </div>
      ) : (
        <div class="stack" data-test="dinleme-metin">
          <p class="small muted">Şimdi metne bak ve bir daha dinle.</p>
          {l.script.map((c) => <p><span lang="de">{c.de}</span>{c.tr && <><br /><span class="small muted">{c.tr}</span></>}</p>)}
          <ActionBar><button class="btn primary block" data-test="next" onClick={() => onNext(dogru === l.qs.length)}>Devam</button></ActionBar>
        </div>
      )}
    </section>
  );
}
