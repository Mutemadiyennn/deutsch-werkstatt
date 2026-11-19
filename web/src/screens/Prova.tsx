/**
 * Konuşma provası, yapay zekâsız (#58 A7, Seans 4). Akış: hazırlık (atlanamaz) → dallanan konuşma → Türkçe geri bildirim.
 * Karşı taraf öğrencinin cevabına göre tepki verir (içerikteki dallar). Sesli cevapta "Duyduğum: …", "Tekrar söyle",
 * "Doğru söyledim" (PM-054.3, D-097). Sonda 1 iyi şey + en fazla 3 düzeltme. Bitiş cihazda `m1:prova:<gün>` olarak kalır.
 */
import { useEffect, useRef, useState } from "preact/hooks";
import { useApp } from "../state.ts";
import { loadLexicon, loadM1Gun } from "../services/content.ts";
import { adimXpVer } from "../services/ilerleme.ts";
import { personalizeDeep } from "../core/persona.ts";
import { beyanSecenegi, dugumBul, eslestir, hazirlikCumleleri, rapor, sonMu, sonrakiDugum, type Eslesme, type Kayit, type ProvaT } from "../core/prova.ts";
import { addClaim, setMeta } from "../data/db.ts";
import { speak, stopSpeaking } from "../services/speech.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { Rich } from "../ui/rich.tsx";
import { Icon } from "../ui/icons.tsx";

const E2E = import.meta.env.MODE === "e2e";
export const provaAnahtari = (day: number) => `m1:prova:${day}`;

export function ProvaEkrani({ day }: { day: number }) {
  const { profile } = useApp();
  const [p, setP] = useState<ProvaT | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [asama, setAsama] = useState<"hazirlik" | "konusma" | "bitti">("hazirlik");
  const [kayitlar, setKayitlar] = useState<Kayit[]>([]);
  useEffect(() => {
    (async () => {
      // sözlük: adsız profilde bilinen kelime ad sayılmasın (persona.fillName)
      const [gun] = await Promise.all([loadM1Gun(day), loadLexicon().catch(() => null)]);
      const g = personalizeDeep(gun, { name: profile.displayName, address: profile.address });
      if (!g.prova) throw new Error("Bu günün konuşma provası henüz hazır değil.");
      setP(g.prova);
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, [day]);
  if (err) return <div class="stack"><ProgressHeader title="Konuşma provası" back="#/today" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!p) return <Loading />;
  const sub = asama === "hazirlik" ? "Hazırlık" : asama === "konusma" ? "Konuşma" : "Geri bildirim";
  const sira = asama === "hazirlik" ? 0 : asama === "konusma" ? 1 : 3; // geri bildirim: iki aşama bitti, çubuk dolu
  return (
    <div class="stack" data-test="prova" data-asama={asama}>
      <ProgressHeader title={p.title_tr} back="#/today" right={<FocusChip />} sub={sub} ilerleme={{ n: sira, toplam: 3 }} />
      {asama === "hazirlik" && <Hazirlik p={p} onBasla={() => setAsama("konusma")} />}
      {asama === "konusma" && <Konusma p={p} onBitti={(k) => {
        setKayitlar(k); setAsama("bitti");
        void setMeta(provaAnahtari(day), { bitti: new Date().toISOString() }).then(() => adimXpVer(`prova:${day}`));
      }} />}
      {asama === "bitti" && <Rapor p={p} kayitlar={kayitlar} again={() => { setKayitlar([]); setAsama("konusma"); }} />}
    </div>
  );
}

/** Hazırlık: durum + provada gereken cümleler; hepsi dinlenmeden prova açılmaz (bölüm kilidi, #58 A7) */
function Hazirlik({ p, onBasla }: { p: ProvaT; onBasla: () => void }) {
  const cumleler = hazirlikCumleleri(p);
  const [dinlenen, setDinlenen] = useState<Set<number>>(new Set());
  const kalan = cumleler.length - dinlenen.size;
  // cümle dinlenmiş sayılır: seslendirme bittiğinde (art arda dokunmak kilidi açmaz)
  const dinle = async (i: number) => { await speak(cumleler[i]!.de, "de", "normal"); setDinlenen((s) => new Set(s).add(i)); };
  return (
    <>
      <section class="card stack fade" data-test="prova-hazirlik">
        <div class="kicker">Durum</div>
        <p><Rich text={p.durum_tr} /></p>
        <p class="small muted">Konuşmada bunları söyleyeceksin. Her birini dinle, yüksek sesle bir kez tekrar et.</p>
        <ul class="list">{cumleler.map((c, i) => (
          <li class="row" style={{ flexWrap: "nowrap" }} data-test="hazirlik-cumle" data-dinlendi={dinlenen.has(i) ? "1" : "0"}>
            <button class={`iconbtn${dinlenen.has(i) ? " done" : ""}`} aria-label={`Dinle: ${c.de}`} data-test="hazirlik-dinle" onClick={() => void dinle(i)}>
              <Icon name={dinlenen.has(i) ? "check" : "volume"} /></button>
            <span class="grow"><span class="de" lang="de">{c.de}</span><br /><span class="small muted">{c.tr}</span></span>
          </li>))}</ul>
      </section>
      <ActionBar>
        <button class="btn primary block" data-test="prova-basla" disabled={kalan > 0} onClick={onBasla}>
          {kalan > 0 ? `Önce dinle (${kalan} cümle kaldı)` : "Provaya başla"}</button>
      </ActionBar>
    </>
  );
}

type Satir = { kim: "karsi" | "sen"; de: string; tr?: string };

function Konusma({ p, onBitti }: { p: ProvaT; onBitti: (k: Kayit[]) => void }) {
  const [id, setId] = useState(p.baslangic);
  const [satirlar, setSatirlar] = useState<Satir[]>([]);
  const [kayitlar, setKayitlar] = useState<Kayit[]>([]);
  const [cevap, setCevap] = useState<{ a: string; mode: "typed" | "voice"; e: Eslesme } | null>(null);
  const [ipucu, setIpucu] = useState(false);
  const [ceviri, setCeviri] = useState(false);
  const ziyaret = useRef(new Map<string, number>());
  const once = useRef<string | null>(null);
  const dugum = dugumBul(p, id);
  const son = sonMu(dugum);
  useEffect(() => {
    if (!dugum) return;
    ziyaret.current.set(id, (ziyaret.current.get(id) ?? 0) + 1);
    setSatirlar((s) => [...s, { kim: "karsi", de: dugum.de, tr: dugum.tr }]);
    // "Doğrusunu söyleyip geç": önce doğru cümle duyulur, sonra karşı tarafın sözü (biri ötekini kesmez)
    const ilk = once.current; once.current = null;
    void (async () => { if (ilk) await speak(ilk, "de", "normal"); await speak(dugum.de, "de", "normal"); })();
    setIpucu(false);
  }, [id]);
  useEffect(() => { window.scrollTo(0, document.body.scrollHeight); }, [satirlar.length, !!cevap]);

  const ilerle = (i: number, k: Kayit) => {
    const s = dugum!.secenekler[i]!;
    const yeni = [...kayitlar, k];
    setKayitlar(yeni);
    // "Doğrusunu söyleyip geç": balonda doğru cümle görünür ve okunur
    setSatirlar((x) => [...x, { kim: "sen", de: k.dogrusu ?? (k.cevap || s.de) }]);
    if (k.dogrusu) once.current = k.dogrusu;
    setCevap(null);
    // aynı düğüme dönüş sınırı (kendine dönen dal dahil): sınır dolunca uygun dal seçilir
    const hedef = sonrakiDugum(dugum!, i, ziyaret.current);
    if (hedef === id) {
      ziyaret.current.set(id, (ziyaret.current.get(id) ?? 0) + 1);
      setSatirlar((x) => [...x, { kim: "karsi", de: dugum!.de, tr: dugum!.tr }]);
      const ilk = once.current; once.current = null;
      void (async () => { if (ilk) await speak(ilk, "de", "normal"); await speak(dugum!.de, "de", "normal"); })();
    } else setId(hedef);
    if (!dugumBul(p, hedef)) onBitti(yeni);
  };
  const uygunI = () => Math.max(0, dugum?.secenekler.findIndex((x) => x.uygun) ?? 0);
  const beyanI = cevap && dugum ? beyanSecenegi(dugum, cevap.e, cevap.a, cevap.mode === "voice") : null;
  const gonder = (a: string, mode: "typed" | "voice") => setCevap({ a, mode, e: eslestir(dugum!, a, mode === "typed", p.durum_tr) });

  return (
    <>
      <section class="card stack fade" data-test="prova-konusma">
        <div class="row" style={{ justifyContent: "space-between" }}>
          <div class="kicker">Konuşma</div>
          <button class="btn sm ghost" data-test="ceviri" onClick={() => setCeviri(!ceviri)}>{ceviri ? "Türkçeyi gizle" : "Türkçesini göster"}</button>
        </div>
        <div class="chat" aria-live="polite" data-test="prova-chat">{satirlar.map((s) => (
          <div class={`bubble ${s.kim === "sen" ? "me" : "them"}`} data-kim={s.kim}>
            <div class="dline"><div class="grow"><div lang="de">{s.de}</div>{ceviri && s.tr && <div class="tr2">{s.tr}</div>}</div>
              {s.kim === "karsi" && <ListenButton text={s.de} small slowToggle={false} />}</div>
          </div>))}</div>
      </section>
      {son ? (
        <ActionBar><button class="btn primary block" data-test="prova-bitir" onClick={() => onBitti(kayitlar)}>Konuşmayı bitir</button></ActionBar>
      ) : cevap ? (
        <ActionBar>
          <Sonuc d={dugum!} c={cevap} />
          {cevap.e.kind === "correct" && cevap.e.i !== null ? (
            <button class="btn primary block" data-test="next" onClick={() => ilerle(cevap.e.i!, { dugum: id, cevap: cevap.a, secenek: cevap.e.i, uygun: dugum!.secenekler[cevap.e.i!]!.uygun })}>Devam</button>
          ) : (
            <div class="stack" style={{ gap: 8 }}>
              <button class="btn primary block" data-test="tekrar" onClick={() => {
                // tanınmayan deneme sondaki düzeltmelere girer (konuşma ilerlemez)
                if (cevap.e.kind === "wrong") setKayitlar((k) => [...k, { dugum: id, cevap: cevap.a, secenek: null, uygun: false, dogrusu: cevap.e.best }]);
                setCevap(null);
              }}>{cevap.mode === "voice" ? "Tekrar söyle" : "Tekrar yaz"}</button>
              {/* konuşma tanıma yanlış duyabilir ya da kurallar cevabı tanımaz: karar öğrencinin (PM-054.3, D-097); olumsuz cevap
                  olumlu dala beyanla gidemez (beyanSecenegi) */}
              {beyanI !== null && <button class="btn block" data-test="dogru-soyledim" onClick={() => {
                const i = beyanI;
                const s = dugum!.secenekler[i]!;
                void addClaim({ at: new Date().toISOString(), scenarioId: "m1:prova", itemId: `${p.id}:${id}`, prompt: dugum!.de, answer: cevap.a, expected: s.accepted.length ? s.accepted : [s.de] });
                ilerle(i, { dugum: id, cevap: cevap.a, secenek: i, uygun: s.uygun, beyan: true });
              }}>{cevap.mode === "voice" ? "Doğru söyledim" : "Benimki de doğru"}</button>}
              {cevap.e.kind === "wrong" && <button class="btn block ghost" data-test="dogrusuyla-gec" onClick={() => {
                const i = uygunI();
                ilerle(i, { dugum: id, cevap: cevap.a, secenek: null, uygun: false, dogrusu: dugum!.secenekler[i]!.de });
              }}>Doğrusunu söyleyip geç</button>}
            </div>
          )}
        </ActionBar>
      ) : (
        <ActionBar>
          {ipucu && <div class="card tint stack" data-test="ipucu" style={{ gap: 4 }}>
            <div class="small muted">Şunlardan birini söyleyebilirsin:</div>
            {dugum!.secenekler.filter((s) => s.uygun).map((s) => <div class="small">{s.tr}</div>)}
          </div>}
          <AnswerField onSubmit={gonder} placeholder="Cevabını söyle ya da yaz…" submitLabel="Gönder" />
          {!ipucu && <button class="btn sm ghost" data-test="ipucu-ac" onClick={() => setIpucu(true)}>Ne diyeyim?</button>}
          {E2E && <span hidden data-test="beklenen">{dugum!.secenekler.find((s) => s.uygun)?.accepted[0] ?? ""}</span>}
        </ActionBar>
      )}
    </>
  );
}

function Sonuc({ d, c }: { d: NonNullable<ReturnType<typeof dugumBul>>; c: { a: string; mode: "typed" | "voice"; e: Eslesme } }) {
  const bas = c.mode === "voice" ? `Duyduğum: ${c.a}` : `Yazdığın: ${c.a}`;
  if (c.e.kind === "correct" && c.e.i !== null) {
    const s = d.secenekler[c.e.i]!;
    return <FeedbackBand kind={s.uygun ? "ok" : "warn"} title={s.uygun ? "Anlaşıldı." : "Karşı taraf şaşırdı."}><Rich text={s.geri_bildirim_tr} /></FeedbackBand>;
  }
  if (c.e.kind === "unchecked") return <FeedbackBand kind="info" title={bas}>Bunu tam tanıyamadım. Şunu mu demek istedin: <b lang="de">{c.e.best}</b></FeedbackBand>;
  return <FeedbackBand kind="bad" title={bas}>{c.e.note ? <Rich text={c.e.note} /> : <>Bu konuşmada buna uyan bir cevap yok. Şöyle diyebilirsin: <b lang="de">{c.e.best}</b></>}</FeedbackBand>;
}

/** Sondaki Türkçe geri bildirim: 1 iyi şey, en fazla 3 düzeltme (#58 A7) */
function Rapor({ p, kayitlar, again }: { p: ProvaT; kayitlar: Kayit[]; again: () => void }) {
  const r = rapor(p, kayitlar);
  return (
    <section class="card stack fade" data-test="prova-rapor">
      <h2>Prova bitti</h2>
      <p><Rich text={p.kapanis_tr} /></p>
      <FeedbackBand kind="ok" title="İyi yaptığın" sayac={false}><Rich text={r.iyi} /></FeedbackBand>
      {r.duzeltmeler.length > 0 && <div class="stack" data-test="duzeltmeler" style={{ gap: 6 }}>
        <div class="kicker">Bir dahaki sefere</div>
        <ol class="list">{r.duzeltmeler.map((d) => <li class="small" data-test="duzeltme"><Rich text={d} /></li>)}</ol>
      </div>}
      <div class="row"><a class="btn primary grow" href="#/today" data-test="prova-sonraki">Sıradaki adım</a>
        <button class="btn grow" data-test="prova-tekrar" onClick={again}>Bir daha prova et</button></div>
    </section>
  );
}
