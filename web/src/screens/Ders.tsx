/**
 * Temel ders oynatıcısı (#58 A5, Seans 2): R0 dersleri (günler, aylar, sayılar, saat, tarih, soru kelimeleri, sein/haben,
 * kip fiilleri, harf harf söyleme). Akış `core/ders.ts`. Kaldığı yer cihazda saklanır; ders bitince planlayıcı onu
 * yeniden önermez (meta `ders:<id>.bitti`).
 */
import { useEffect, useRef, useState } from "preact/hooks";
import type { TemelDers } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadTemel } from "../services/content.ts";
import { getMeta, setMeta } from "../data/db.ts";
import { personalizeDeep } from "../core/persona.ts";
import { DERS_ADIM_TR, TANIT_GRUP, adimlarDers, altSayisi, dersAnahtari, dersIleri, dersKonum, hatirlaKabul, hatirlaSecenek, maddeler, type DersIlerleme } from "../core/ders.ts";
import { speak, speakDizi, stopSpeaking } from "../services/speech.ts";
import { adimXpVer, xpVer } from "../services/ilerleme.ts";
import { XP } from "../core/gun.ts";
import { ActionBar, CevapXp, FeedbackBand, ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { Kutlama, Ozet, useOturumXp } from "../ui/solen.tsx";
import { Art, ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { Chips, Rich } from "../ui/rich.tsx";
import { DrillView } from "../ui/drill.tsx";

const E2E = import.meta.env.MODE === "e2e";

export function DersEkrani({ id }: { id: string }) {
  const { profile } = useApp();
  const [t, setT] = useState<TemelDers | null>(null);
  const [p, setP0] = useState<DersIlerleme | null>(null);
  const [err, setErr] = useState<string | null>(null);
  // kutlama yalnızca ders bu oturumda bittiyse; bitmiş ders yeniden açılınca konfeti ve "+0 XP" yok (inceleme #87 P2)
  const [simdiBitti, setSimdiBitti] = useState(false);
  const oturumXp = useOturumXp();
  useEffect(() => {
    (async () => {
      const [ham] = await Promise.all([loadTemel(id), loadLexicon().catch(() => null)]);
      const d = personalizeDeep(ham, { name: profile.displayName, address: profile.address });
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
      <ProgressHeader title={t.title_tr} back="#/today" ilerleme={{ n: 1, toplam: 1 }} />
      <section class="card stack" data-test="ders-bitti">
        {simdiBitti ? <Kutlama><h2>Ders bitti</h2></Kutlama> : <h2>Ders bitti</h2>}
        {simdiBitti && p.toplam > 0 && <Ozet dogru={p.dogru} toplam={p.toplam} xp={p.ilkBitti ? undefined : oturumXp} baglam="ders" />}
        <p>{p.toplam ? `${p.toplam} soruda ${p.dogru} doğru.` : ""} {t.can_do.tr}</p>
        <div class="row"><a class="btn primary grow" href="#/today" data-test="ders-geri">Sıradaki adıma geç</a>
          <button class="btn grow" onClick={() => setP({ s: 0, k: 0, dogru: 0, toplam: 0, ilkBitti: p.ilkBitti ?? p.bitti })}>Tekrar çalış</button></div>
      </section>
    </div>
  );

  const adim = steps[p.s]!;
  const n = altSayisi(t, adim);
  /** `xpAdet`: XP alan doğru sayısı (yalnızca gerçekten doğru cevap; "Benimki de aynı" beyanı XP almaz, D-102). Uçan XP ile
   *  kaydedilen aynı olsun diye her doğru cevap ayrı sayılır (inceleme #87 2. tur). */
  const ileri = (ok?: boolean | { dogru: number; toplam: number }, xpAdet?: number) => {
    const np = dersIleri(p, t, ok);
    const kazanc = xpAdet ?? (ok === undefined ? 0 : typeof ok === "boolean" ? (ok ? 1 : 0) : ok.dogru);
    // tekrar çalışmada doğru XP'si yok; adım XP'si bir kez (inceleme #66 P2-1)
    if (kazanc && !p.ilkBitti) void xpVer(XP.dogru * kazanc);
    if (np.bitti) { void adimXpVer(`ders:${t.id}`); setSimdiBitti(true); }
    setP(np);
  };
  // doğru cevabın XP'si cevap anında uçar; tekrar çalışmada XP yok (inceleme #87 P1-2)
  return (<CevapXp.Provider value={p.ilkBitti ? 0 : XP.dogru}>
    <div class="stack" data-test="ders" data-adim={adim} data-pos={`${p.s}.${p.k}`}>
      <ProgressHeader title={t.title_tr} back="#/today" right={<FocusChip />} sub={`${DERS_ADIM_TR[adim]}${n > 1 ? ` · ${p.k + 1}/${n}` : ""}`} ilerleme={{ n: steps.slice(0, p.s).reduce((a, s) => a + altSayisi(t, s), 0) + p.k, toplam: steps.reduce((a, s) => a + altSayisi(t, s), 0) }} />
      {adim === "tanit" && (p.k % 2 === 0
        ? <Tanit key={p.k} t={t} grup={p.k / 2} onNext={() => ileri()} />
        : <Hatirla key={p.k} t={t} grup={(p.k - 1) / 2} onDone={(dogru, toplam, xpli) => ileri({ dogru, toplam }, xpli)} />)}
      {adim === "tablo" && t.table && <Tablo t={t} onNext={() => ileri()} />}
      {(adim === "anlama" || adim === "kurma" || adim === "konusma") && (
        <DrillView key={`${adim}${p.k}`} d={maddeler(t, adim)[p.k]!} sira={`${p.k + 1}/${n}`} onDone={(s) => ileri(s !== "wrong", s === "correct" ? 1 : 0)} />
      )}
      {adim === "diyalog" && t.dialogue && <Diyalog d={t.dialogue} onNext={() => ileri()} />}
      {adim === "dinleme" && <Dinleme key={p.k} l={t.listening[p.k]!} onNext={(s) => ileri(s)} />}
      {adim === "gorev" && t.mission && (
        <section class="card stack fade" data-test="ders-gorev">
          <div class="kicker">Dışarıda dene</div>
          <p><Rich text={t.mission.task_tr} /></p>
          <ActionBar><button class="btn primary block" data-test="next" onClick={() => ileri()}>Dersi bitir</button></ActionBar>
        </section>
      )}
    </div>
  </CevapXp.Provider>);
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
      <ActionBar><button class="btn primary block" data-test="next" onClick={onNext}>Hatırlamaya geç</button></ActionBar>
    </div>
  );
}

/** Hatırlama turu (phases/09 madde 5): grubun her kartı için dinle → anlamını seç, sonra Türkçe → Almancasını yaz */
function Hatirla({ t, grup, onDone }: { t: TemelDers; grup: number; onDone: (dogru: number, toplam: number, xpli: number) => void }) {
  const items = t.teach.slice(grup * TANIT_GRUP, (grup + 1) * TANIT_GRUP);
  const sorular = items.flatMap((x, i) => [{ x, i, tur: "anlam" as const }, { x, i, tur: "yaz" as const }]);
  const [q, setQ] = useState(0);
  const [dogru, setDogru] = useState(0);
  const cur = sorular[q];
  // dinle → anlamını seç: kelime soru açılınca bir kez okunur
  useEffect(() => { if (cur?.tur === "anlam") void speak(cur.x.art ? `${cur.x.art} ${cur.x.de}` : cur.x.de, "de", "normal"); }, [q]);
  if (!cur) return null;
  const sayi = `${q + 1}/${sorular.length}`;
  const [xpli, setXpli] = useState(0);
  const bitir = (r: string) => { const d = dogru + (r !== "wrong" ? 1 : 0), x = xpli + (r === "correct" ? 1 : 0); if (q + 1 >= sorular.length) onDone(d, sorular.length, x); else { setDogru(d); setXpli(x); setQ(q + 1); } };
  if (cur.tur === "anlam") {
    const sec = hatirlaSecenek(t, grup, cur.x, cur.i);
    const d = { id: `hat:${cur.x.id}`, k: "pick" as const, q_tr: "Dinle: ne demek?", opts: sec, ans: sec.indexOf(cur.x.tr) };
    return <div class="stack fade" data-test="ders-hatirla" data-q={q}>
      <div class="row"><ListenButton text={cur.x.art ? `${cur.x.art} ${cur.x.de}` : cur.x.de} /></div>
      <DrillView key={`a${q}`} d={d} sira={`Hatırla ${sayi}`} onDone={(r) => bitir(r)} />
    </div>;
  }
  const kabul = hatirlaKabul(t, cur.x);
  return <div data-test="ders-hatirla" data-q={q}><DrillView key={`y${q}`} d={{ id: `hat:${cur.x.id}:y`, k: "tr_de", tr: `${cur.x.tr}${cur.x.art ? " (artikeliyle)" : ""}`, accepted: kabul }}
    artikel={cur.x.art ? { de: cur.x.de, art: cur.x.art } : undefined} sira={`Hatırla ${sayi}`} onDone={(r) => bitir(r)} /></div>;
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

/** Konuşulanı sırayla seslendirir; yeni çalma ya da ekrandan çıkış öncekini keser (inceleme #65 P1-7) */
function useSesDizisi() {
  const tok = useRef(0);
  useEffect(() => () => { tok.current++; stopSpeaking(); }, []);
  return async (lines: string[], sp: "slow" | "normal" = "normal") => {
    const my = ++tok.current; stopSpeaking();
    await speakDizi(lines.map((de) => ({ de })), sp, 0, () => tok.current !== my);
  };
}

/** Önce dinle (phases/09 madde 1): diyalog önce altyazısız dinlenir, sonra metin ve çeviri açılır */
function Diyalog({ d, onNext }: { d: NonNullable<TemelDers["dialogue"]>; onNext: () => void }) {
  const cal = useSesDizisi();
  const [dinledi, setDinledi] = useState(false);
  const [altyazi, setAltyazi] = useState(false);
  return (
    <section class="card stack fade" data-test="ders-diyalog">
      <div class="kicker">{d.title_tr}</div>
      <p class="small">{altyazi ? "Şimdi metinle birlikte dinle." : "Önce yalnızca dinle: kim ne istiyor? Kelimelerin hepsini anlaman gerekmiyor."}</p>
      <div class="row"><button class="btn primary grow" data-test="diyalog-dinle" onClick={() => { setDinledi(true); void cal(d.lines.map((l) => l.de)); }}>{dinledi ? "Bir daha dinle" : "Dinle"}</button>
        <button class="btn grow" onClick={() => { setDinledi(true); void cal(d.lines.map((l) => l.de), "slow"); }}>Yavaş</button></div>
      {altyazi && <ul class="list" data-test="diyalog-metin">{d.lines.map((l) => (
        <li class="row" style={{ flexWrap: "nowrap" }}>
          <span class="tiny muted" style={{ width: 28 }}>{l.r === "B" ? "Sen" : ""}</span>
          <span class="grow"><span lang="de">{l.de}</span><br /><span class="small muted">{l.tr}</span></span>
          <ListenButton text={l.de} small slowToggle={false} />
        </li>))}</ul>}
      <ActionBar>{altyazi
        ? <button class="btn primary block" data-test="next" onClick={onNext}>Kelimelere geç</button>
        : <button class="btn primary block" data-test="altyazi" disabled={!dinledi && !E2E} onClick={() => setAltyazi(true)}>{dinledi || E2E ? "Metni aç" : "Önce dinle"}</button>}</ActionBar>
    </section>
  );
}

/** Dinleme: önce metinsiz dinle (yavaş/normal), sonra sorular; metin en sonda */
/** Her soru ayrı sayılır: doğru cevabın XP'si cevap anında uçar ve aynı miktar kaydedilir (inceleme #87 2. tur) */
function Dinleme({ l, onNext }: { l: TemelDers["listening"][number]; onNext: (s: { dogru: number; toplam: number }) => void }) {
  const [q, setQ] = useState(0);
  const [sec, setSec] = useState<number | null>(null);
  const [dogru, setDogru] = useState(0);
  const [dinledi, setDinledi] = useState(false);
  const ses = useSesDizisi();
  const cal = (sp: "slow" | "normal") => { setDinledi(true); void ses(l.script.map((c) => c.de), sp); };
  const soru = l.qs[q];
  return (
    <section class="card stack fade" data-test="ders-dinleme">
      <div class="kicker">{l.title_tr}</div>
      <div class="row"><button class="btn primary grow" data-test="dinle" onClick={() => cal(l.speed === "slow" ? "slow" : "normal")}>Dinle</button>
        {l.speeds.includes("slow") && l.speeds.length > 1 && <button class="btn grow" onClick={() => cal("slow")}>Yavaş</button>}</div>
      {!dinledi && !E2E ? <p class="small muted">Önce dinle; sorular sonra gelecek.</p> : soru ? (
        <div class="stack">
          <h3><Rich text={soru.q_tr} /></h3>
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
          <ActionBar><button class="btn primary block" data-test="next" onClick={() => onNext({ dogru, toplam: l.qs.length })}>Devam</button></ActionBar>
        </div>
      )}
    </section>
  );
}
