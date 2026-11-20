/**
 * Medya bölüm oynatıcısı (#58 A4, PM-053): gerçek insan videosu, anons/sesli mesaj ve köy dizisi aynı akışı kullanır.
 * Video (ya da ses kartı) üstte sabit durur, sorular altta akar; cümleye dokununca oraya atlanır.
 * Her bölüm: (a) baştan sona dinle → ana fikir, (b) ayrıntılar, (c) cümle cümle (0,75×), (d) dikte merdiveni,
 * (e) metin + kelimeye dokununca kart ve "bankaya ekle", (f) gölge konuşma, (g) "Sen ne derdin?".
 * Kaldığı yer cihazda saklanır (yarıda bırakılıp sürdürülebilir). Uzun kayıt hiçbir zaman baştan sona yazdırılmaz.
 */
import { gorevSay } from "../services/gorev.ts";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import { Gun, medyalar, type AnlamaQ, type Bolum, type Dikte, type Lexeme, type Medya, type MedyaCumle } from "@dw/shared";
import { useApp } from "../state.ts";
import { adimXpVer, xpVer } from "../services/ilerleme.ts";
import { XP } from "../core/gun.ts";
import { personalizeDeep } from "../core/persona.ts";
import { loadIndex, loadLexicon, loadM1Gun, contentUrl } from "../services/content.ts";
import { addClaim, getMeta, setMeta } from "../data/db.ts";
import { Rich } from "../ui/rich.tsx";
import { ADIM_TR, BASLANGIC, adimlar, aralik, bolumCumleleri, dikteDegerlendir, eksikZorunlu, hedefSira, ileri, gecerliKonum, ilerlemeAnahtari, type MedyaIlerleme } from "../core/medya.ts";
import { ruleVerdict } from "../core/answer.ts";
import { scoreHeard } from "../core/grading.ts";
import { baslangicYavas, konusanAta, speak, stopSpeaking, sttAvailable } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, AnswerField, CevapXp, FeedbackBand, MicButton, ProgressHeader, YanlisIci } from "../ui/kit.tsx";
import { Art, ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { DokunMetin, KelimeSayfasi } from "../ui/kelime.tsx";

const E2E = import.meta.env.MODE === "e2e";

/* ============================ Oynatma katmanı ============================ */
/** Video: zaman aralığı oynatır (hizalanmış cümleler). Ses/sahne: cümleleri cihaz sesiyle sırayla okur. */
interface Oynatici { cumle(c: MedyaCumle, yavas: boolean): Promise<void>; bolum(cs: MedyaCumle[], yavas: boolean): Promise<void>; dur(): void }

function useOynatici(m: Medya, video: HTMLVideoElement | null, base = ""): Oynatici & { calisiyor: string | null } {
  const [calisiyor, setCalisiyor] = useState<string | null>(null);
  const iptal = useRef(0);
  const sesEl = useRef<HTMLAudioElement | null>(null);
  /**
   * Video aralığı: yalnızca KENDİ oynatması bittiğinde duraklatır. Yeni bir oynatma başlarsa eskisi duraklatmadan çözülür
   * (inceleme #60 P0-2 yarışı). Bitiş kare kare denetlenir (timeupdate ~4 Hz yerine; A9 eşiği 300 ms).
   * Video dışarıdan duraklatılırsa (sistem, öğrenci) söz çözülür; düğmeler kilitli kalmaz (P1-1).
   */
  const vidAralik = (t0: number, t1: number, yavas: boolean) => new Promise<void>((res) => {
    if (!video) return res();
    const my = ++iptal.current;
    video.playbackRate = yavas ? 0.75 : 1;
    video.currentTime = t0;
    let done = false;
    const bitir = (pause: boolean) => { if (done) return; done = true; video.removeEventListener("pause", onPause); video.removeEventListener("ended", onPause); if (pause && iptal.current === my) video.pause(); res(); };
    const onPause = () => bitir(false);
    const loop = () => {
      if (done) return;
      if (iptal.current !== my) return bitir(false);
      if (video.currentTime >= t1 - 0.03) return bitir(true);
      requestAnimationFrame(loop);
    };
    video.addEventListener("pause", onPause); video.addEventListener("ended", onPause);
    void video.play().then(() => requestAnimationFrame(loop)).catch(() => bitir(false));
  });
  /** hazır ses varsa onu çalar (LS-8.6 doğal ses önce), yoksa cihaz sesi */
  const sesDosyasi = (src: string, yavas: boolean, my: number) => new Promise<void>((res) => {
    const a = sesEl.current ?? (sesEl.current = new Audio());
    a.src = src; a.playbackRate = yavas ? 0.75 : 1;
    const end = () => { a.removeEventListener("ended", end); a.removeEventListener("pause", end); a.removeEventListener("error", end); res(); };
    a.addEventListener("ended", end); a.addEventListener("pause", end); a.addEventListener("error", end);
    if (iptal.current !== my) return end();
    void a.play().catch(end);
  });
  const sesle = async (cs: MedyaCumle[], yavas: boolean) => {
    const my = ++iptal.current;
    for (const c of cs) {
      if (iptal.current !== my) return;
      setCalisiyor(c.id);
      if (c.audio?.src) await sesDosyasi(/^(https?:|\/)/.test(c.audio.src) ? c.audio.src : base + c.audio.src, yavas, my); else await speak(c.de, "de", yavas ? "slow" : "normal", true, c.speaker ? konusanAta(m.cumleler.map((x) => x.speaker)).get(c.speaker) : undefined);
    }
  };
  const o: Oynatici = {
    async cumle(c, yavas) {
      setCalisiyor(c.id);
      if (m.kind === "video" && video && c.t0 !== undefined && c.t1 !== undefined) await vidAralik(c.t0, c.t1, yavas); else await sesle([c], yavas);
      setCalisiyor(null);
    },
    async bolum(cs, yavas) {
      const r = aralik(cs);
      if (m.kind === "video" && video && r) { setCalisiyor("*"); await vidAralik(r.t0, r.t1, yavas); } else await sesle(cs, yavas);
      setCalisiyor(null);
    },
    dur() { iptal.current++; stopSpeaking(); video?.pause(); sesEl.current?.pause(); setCalisiyor(null); }
  };
  // mola başlayınca çok cümleli ses bölümü de susar (yalnızca o anki cümle değil; inceleme #67 2. tur)
  useEffect(() => { const f = () => o.dur(); window.addEventListener("dw:mola", f); return () => window.removeEventListener("dw:mola", f); });
  return { ...o, calisiyor };
}

/* ============================ Ekran ============================ */
export function MedyaEkrani({ day, id }: { day: number; id: string }) {
  const [veri, setVeri] = useState<{ gun: Gun; m: Medya; lex: Lexeme[]; base: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [p, setP] = useState<MedyaIlerleme | null>(null);
  const { profile } = useApp();
  useEffect(() => {
    (async () => {
      // {name}, {Herr|Frau} yer tutucuları cihaz profiline göre (D-061; inceleme #60 2. tur P1-B)
      const gun = personalizeDeep(await loadM1Gun(day), { name: profile.displayName, address: profile.address });
      const m = medyalar(gun).find((x) => x.id === id);
      if (!m) throw new Error("Bu kayıt bulunamadı.");
      const [{ lexemes }, i] = await Promise.all([loadLexicon(), loadIndex()]);
      setVeri({ gun, m, lex: lexemes, base: contentUrl(i.version) });
      // kayıtlı konum içerikle uyuşmuyorsa (içerik değişti) baştan başla; ekran çökmez (inceleme #60 P1-3)
      setP(gecerliKonum(await getMeta<MedyaIlerleme>(ilerlemeAnahtari(id)), m));
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, [day, id]);
  if (err) return <ErrorPanel message={err} onRetry={() => location.reload()} />;
  if (!veri || !p) return <Loading />;
  return <Akis veri={veri} p={p} setP={(x) => { setP(x); void setMeta(ilerlemeAnahtari(id), x); }} />;
}

function Akis({ veri, p, setP }: { veri: { gun: Gun; m: Medya; lex: Lexeme[]; base: string }; p: MedyaIlerleme; setP: (p: MedyaIlerleme) => void }) {
  const { m, lex, base } = veri;
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [vidHata, setVidHata] = useState(false);
  const oy = useOynatici(m, video, base);
  // sabit video başlık çubuğunun hemen altında durur: çubuk yüksekliği ölçülür (yazı boyutuyla değişir; inceleme #60 P1-6)
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-test=medya] .pbar");
    if (!bar) return;
    const set = () => document.documentElement.style.setProperty("--pbar-h", `${bar.getBoundingClientRect().height}px`);
    set();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(set) : null;
    ro?.observe(bar);
    return () => ro?.disconnect();
  }, []);
  const geri = `#/m1/${veri.gun.day}`;
  const baslik = m.kind === "video" ? "Video" : m.kind === "ses" ? "Dinle" : "Köy dizisi";

  if (p.bitti) return (
    <div class="stack" data-test="medya">
      <ProgressHeader title={m.title_tr} back={geri} right={<FocusChip />} sub={baslik} />
      {m.eylem && !p.eylem ? <EylemSoru m={m} onDone={(ok) => setP({ ...p, eylem: true, dogru: p.dogru + (ok ? 1 : 0), toplam: p.toplam + 1 })} />
        : <section class="card stack" data-test="medya-bitti"><h2>Bitti</h2>
            <p>{p.toplam} soruda {p.dogru} doğru. {m.bolumler.length > 1 ? `${m.bolumler.length} bölümün hepsini çalıştın.` : ""}</p>
            <div class="row"><a class="btn primary grow" href="#/today" data-test="medya-sonraki">Sıradaki adım</a>
              <a class="btn grow" href={geri} data-test="medya-geri">Güne dön</a>
              <button class="btn grow" data-test="medya-bastan" onClick={() => setP({ ...BASLANGIC, ilkBitti: true })}>Baştan çalış</button></div>
          </section>}
    </div>
  );

  const b = m.bolumler[p.b]!;
  const steps = adimlar(b);
  const adim = steps[p.s]!;
  const cs = bolumCumleleri(m, b);
  // XP: doğru başına (beyanla geçilen cevapta ve tekrar çalışmada yok); adım XP'si adım başına bir kez (inceleme #66 P1-2, P2-1)
  const sonraki = (alt = 1, ok?: boolean, xp = ok) => { oy.dur(); const np = ileri(p, m, alt); if (xp && !p.ilkBitti) void xpVer(XP.dogru); if (np.bitti) void adimXpVer(`medya:${m.id}`); setP({ ...np, ...(ok === undefined ? {} : { dogru: p.dogru + (ok ? 1 : 0), toplam: p.toplam + 1 }) }); };

  // doğru cevabın XP'si cevap anında uçar (ilk çalışmada; tekrar çalışmada XP yok — inceleme #87 P1-2)
  return (<CevapXp.Provider value={p.ilkBitti ? 0 : XP.dogru}>
    <div class="stack" data-test="medya" data-adim={adim} data-pos={`${p.b}.${p.s}.${p.k}`}>
      <ProgressHeader title={m.title_tr} back={geri} right={<FocusChip />} sub={`Bölüm ${p.b + 1}/${m.bolumler.length} · ${ADIM_TR[adim]}`} />
      {/* PM-053 §4: video üstte sabit, sorular altta akar */}
      <div class="medya-ust" data-test="medya-ust">
        {m.kind === "video" && m.video ? (
          <>
            {m.video.medya.length && !vidHata ? (
              <video ref={setVideo} playsInline preload="auto" poster={m.video.poster ? base + m.video.poster : undefined} data-test="video"
                onError={() => setVidHata(true)} aria-label={m.title_tr}>
                {m.video.medya.map((s) => <source src={base + s.src} type={s.type} onError={(e) => { const v = (e.target as HTMLElement).parentElement as HTMLVideoElement | null; if (v && v.networkState === 3) setVidHata(true); }} />)}
              </video>
            ) : (
              <div class="card warn small" data-test="video-yok">Video şu an oynatılamıyor{vidHata ? "" : " (cihaza henüz inmedi)"}. İnternete bağlanınca yeniden dene.
                <div class="row"><button class="btn sm" onClick={() => { setVidHata(false); location.reload(); }}>Tekrar dene</button>
                  <a class="btn sm ghost" href={m.video.kaynak.url} target="_blank" rel="noopener">Kaynakta izle</a></div></div>
            )}
            <div class="tiny muted" data-test="atif">{m.video.kaynak.atif} · {m.video.kaynak.lisans}</div>
            {m.ortam_tr && adim === "dinle" && <p class="small" style={{ margin: 0 }} data-test="video-ortam">{m.ortam_tr}</p>}
          </>
        ) : (
          <div class="card row medya-ses" data-test="ses-kart"><Icon name={m.kind === "ses" ? "phone" : "play"} /><span class="grow"><b>{m.title_tr}</b>{m.ortam_tr && <><br /><span class="small muted">{m.ortam_tr}</span></>}</span></div>
        )}
      </div>

      {adim === "dinle" && <DinleAdimi key={`${p.b}d`} m={m} cs={cs} oy={oy} onNext={() => sonraki()} onOgretim={p.b === 0 ? m.video?.on_ogretim : undefined} />}
      {adim === "ana" && <SecmeliSoru key={`${p.b}a`} q={b.ana_fikir} onNext={(ok) => sonraki(1, ok)} tekrar={() => void oy.bolum(cs, false)} />}
      {adim === "ayrinti" && <SecmeliSoru key={`${p.b}y${p.k}`} q={b.ayrinti[p.k]!} sira={`${p.k + 1}/${b.ayrinti.length}`} onNext={(ok) => sonraki(b.ayrinti.length, ok)} tekrar={() => void oy.bolum(cs, false)} />}
      {adim === "cumle" && <CumleAdimi cs={cs} oy={oy} onNext={() => sonraki()} />}
      {adim === "dikte" && <DikteAdimi key={`${p.b}k${p.k}`} d={b.dikte[p.k]!} sira={`${p.k + 1}/${b.dikte.length}`} cs={cs} oy={oy} onNext={(ok) => sonraki(b.dikte.length, ok ?? undefined)} />}
      {adim === "transkript" && <TranskriptAdimi cs={cs} lex={lex} oy={oy} onNext={() => sonraki()} />}
      {adim === "golge" && <GolgeAdimi key={`${p.b}g${p.k}`} c={cs.find((c) => c.id === b.golge[p.k]) ?? cs[0]!} sira={`${p.k + 1}/${b.golge.length}`} oy={oy} onNext={(ok, xp) => sonraki(b.golge.length, ok, xp)} />}
      {adim === "cevapla" && b.cevapla && <CevaplaAdimi key={`${p.b}c`} d={b.cevapla} onNext={(ok, beyan) => sonraki(1, ok, ok && !beyan)} />}
    </div>
  </CevapXp.Provider>);
}

/* (a) baştan sona, altyazısız */
function DinleAdimi({ m, cs, oy, onNext, onOgretim }: { m: Medya; cs: MedyaCumle[]; oy: ReturnType<typeof useOynatici>; onNext: () => void; onOgretim?: { de: string; tr: string }[] }) {
  const [dinledi, setDinledi] = useState(false);
  const ilkYavas = baslangicYavas() && !dinledi;
  // PM-074 md. 2: tek oynat düğmesi + hız anahtarı (Yavaş / Normal). B7: ilk dinleme yavaşsa (kaydın ya da öğrencinin
  // başlangıç hızı), dinledikten sonra anahtar Normal'e geçer ("Bir daha dinle" normal hızda; öğrenci yeniden Yavaş seçebilir). Çalarken anahtar kapalı.
  const ikiHiz = m.hizlar.includes("slow") && m.hizlar.length > 1;
  const [hiz, setHiz] = useState<"slow" | "normal">((m.kind === "ses" && m.hizlar[0] === "slow") || baslangicYavas() ? "slow" : "normal");
  const yavas = ikiHiz ? hiz === "slow" : (m.kind === "ses" && m.hizlar[0] === "slow") || ilkYavas;
  const cal = () => { const y = yavas; setDinledi(true); if (ikiHiz && y && !dinledi) setHiz("normal"); void oy.bolum(cs, y); };
  // PM 7043484263: tek birincil düğme ekranın altında sabit (eylem çubuğu). İlk dinlemeden önce "Sorulara geç" küçük bağlantı;
  // dinleme bitince birincil "Sorulara geç", "Bir daha dinle" ikincil. Kart başlığı yok (üst çubukta yazıyor); açıklama ≤ 2 satır.
  return (
    <section class="card stack fade" data-test="adim-dinle">
      {!!onOgretim?.length && <OnOgretim w={onOgretim} />}
      <p class="small" style={{ marginBottom: 0 }}>Önce kulağınla dene. Her kelimeyi anlaman gerekmiyor.</p>
      {ikiHiz && <div class="seg" role="group" aria-label="Hız" data-test="hiz">{(["slow", "normal"] as const).map((h) => <button type="button" aria-pressed={hiz === h} disabled={oy.calisiyor !== null} onClick={() => setHiz(h)}>{h === "slow" ? "Yavaş" : "Normal"}</button>)}</div>}
      <ActionBar>
        {oy.calisiyor !== null
          ? <button class="btn block" data-test="durdur" onClick={() => oy.dur()}><Icon name="pause" /> Durdur</button>
          : dinledi
            ? <><button class="btn primary block" data-test="next" onClick={onNext}>Sorulara geç</button>
                <button class="btn block" data-test="dinle-bolum" onClick={cal}><Icon name="play" /> Bir daha dinle</button></>
            : <button class="btn primary block" data-test="dinle-bolum" onClick={cal}><Icon name="play" /> {!ikiHiz && yavas ? "Dinle (yavaş)" : "Dinle"}</button>}
        {/* E2E kısayolu (dinlemeden ilerleme) sessionStorage "e2e-kapi" ile kapatılır; üretimde dinlemeden önce yalnız küçük bağlantı */}
        {(!dinledi || oy.calisiyor !== null) && <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="next" data-baglanti="1" onClick={onNext}>Sorulara geç</button></div>}
      </ActionBar>
    </section>
  );
}

/** A9 ön öğretim: dokununca seslenen çipler; en çok iki satır (sırayla, ilk sığan yere), sığmayanlar "+n" ile açılır (PM 7043484263) */
function OnOgretim({ w }: { w: { de: string; tr: string }[] }) {
  const [acik, setAcik] = useState(false);
  /** gösterilecek çiplerin dizinleri (null: hepsi, ölçüm öncesi) */
  const [secili, setSecili] = useState<number[] | null>(null);
  const dizi = useRef<HTMLDivElement>(null);
  /** seçimin ölçüldüğü genişlik: genişlik değişirse (döndürme, pencere, yazı boyu) yeniden ölçülür (KAPI 64e3c0c, 440 → 430 px'te 3 satır) */
  const olcG = useRef(0);
  useEffect(() => {
    const el = dizi.current; if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => { if (olcG.current && Math.abs(el.clientWidth - olcG.current) > 0.5) { olcG.current = 0; setSecili(null); } });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  // önce hepsi çizilir, genişlikler ölçülür; sırayla, iki satıra ilk sığan yere yerleştirilir ("+n" için son satırda yer ayrılır)
  useLayoutEffect(() => {
    if (acik || secili || !dizi.current) return;
    const G = dizi.current.clientWidth, ARA = 6, DAHA = 48;
    olcG.current = G;
    const gen = [...dizi.current.querySelectorAll<HTMLElement>("[data-test=on-ogretim-kelime]")].map((c) => c.offsetWidth);
    const yerlestir = (pay: number) => {
      const satir = [0, 0]; const al: number[][] = [[], []];
      gen.forEach((g, i) => {
        for (let r = 0; r < 2; r++) { const sinir = r === 1 ? G - pay : G; const ek = satir[r]! ? ARA + g : g; if (satir[r]! + ek <= sinir) { satir[r] = satir[r]! + ek; al[r]!.push(i); return; } }
      });
      // satır satır sırayla çizilir (esnek kutu da aynı iki satıra böler)
      return [...al[0]!, ...al[1]!];
    };
    const hepsi = yerlestir(0);
    setSecili(hepsi.length === gen.length ? hepsi : yerlestir(DAHA + ARA));
  }, [acik, secili, w.length]);
  const gorunen = acik || !secili ? w : secili.map((i) => w[i]!);
  const gizli = acik || !secili ? 0 : w.length - secili.length;
  return (
    <div class="stack" style={{ gap: 6 }} data-test="on-ogretim">
      <p class="small" style={{ margin: 0 }}>Önce şu kelimelere bak; klipte geçiyorlar:</p>
      <div class="cip-dizi" ref={dizi} style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {gorunen.map((x) => <button type="button" class="chip on-cip" style={{ maxWidth: "100%", minHeight: 44, textAlign: "left", whiteSpace: "normal", borderRadius: 14 }} data-test="on-ogretim-kelime" onClick={() => void speak(x.de, "de", "normal")}><b lang="de">{x.de}</b><span>· {x.tr}</span></button>)}
        {gizli > 0 && <button type="button" class="chip" style={{ whiteSpace: "nowrap", minHeight: 44 }} data-test="on-ogretim-daha" onClick={() => setAcik(true)}>+{gizli}</button>}
      </div>
    </div>
  );
}

/* (a) ana fikir, (b) ayrıntı, eylem: seçmeli */
function SecmeliSoru({ q, sira, onNext, tekrar }: { q: AnlamaQ | { q_tr: string; opts: string[]; ans: number; why_tr?: string }; sira?: string; onNext: (ok: boolean) => void; tekrar?: () => void }) {
  const [sec, setSec] = useState<number | null>(null);
  return (
    <section class="card stack fade" data-test="adim-soru">
      <div class="kicker">{sira ? `Soru ${sira}` : "Soru"}</div>
      <h3>{q.q_tr}</h3>
      <div role="group">{q.opts.map((o, k) => <button class={`opt${sec === null ? "" : k === q.ans ? " right" : k === sec ? " wrong" : ""}`} disabled={sec !== null} data-opt={k}
        {...(E2E ? { "data-right": k === q.ans ? "1" : undefined } : {})} onClick={() => { setSec(k); haptic(k === q.ans ? "success" : "error"); }}>{o}</button>)}</div>
      {sec === null && tekrar && <button class="btn sm ghost" onClick={tekrar}>Bir daha dinle</button>}
      {sec !== null && <ActionBar>
        <FeedbackBand kind={sec === q.ans ? "ok" : "bad"} title={sec === q.ans ? "Doğru." : `Doğrusu: ${q.opts[q.ans]}`}>{"why_tr" in q && q.why_tr ? <Rich text={q.why_tr} /> : null}</FeedbackBand>
        <button class="btn primary block" data-test="next" onClick={() => onNext(sec === q.ans)}>Devam</button></ActionBar>}
    </section>
  );
}

function EylemSoru({ m, onDone }: { m: Medya; onDone: (ok: boolean) => void }) {
  return <SecmeliSoru q={{ ...m.eylem!, q_tr: m.eylem!.q_tr }} onNext={onDone} />;
}

/* (c) cümle cümle: her cümle tek dokunuşla, 0,75× */
function CumleAdimi({ cs, oy, onNext }: { cs: MedyaCumle[]; oy: ReturnType<typeof useOynatici>; onNext: () => void }) {
  // #58 B7: 0,75× düğmesi Profil'deki başlangıç hızıyla açılır (görünür; öğrenci kapatabilir)
  const [yavas, setYavas] = useState(baslangicYavas());
  return (
    <section class="card stack fade" data-test="adim-cumle">
      <div class="row"><div class="kicker grow">Cümle cümle dinle</div>
        <button class={`btn sm${yavas ? " primary" : ""}`} aria-pressed={yavas} data-test="yavas" onClick={() => setYavas(!yavas)}>0,75×</button></div>
      <p class="small muted">Cümleye dokun: o cümle çalar. Anlamadığın cümleyi yavaş dinle; metin dikteden sonra açılacak.</p>
      <ol class="list cumleler">{cs.map((c, i) => (
        <li class={`row${oy.calisiyor === c.id ? " on" : ""}`} style={{ flexWrap: "nowrap" }}>
          <button class="btn sm" data-test={`cumle-${c.id}`} aria-label={`${i + 1}. cümleyi dinle`} onClick={() => void oy.cumle(c, yavas)}><Icon name="play" /> {i + 1}</button>
          <span class="grow small muted">{oy.calisiyor === c.id ? "Çalıyor…" : `${i + 1}. cümle`}</span>
          {oy.calisiyor === c.id && <button class="btn ghost sm" aria-label="Durdur" onClick={() => oy.dur()}><Icon name="pause" /></button>}
        </li>))}</ol>
      <ActionBar><button class="btn primary block" data-test="next" onClick={onNext}>Devam</button></ActionBar>
    </section>
  );
}

/* (d) dikte merdiveni */
function DikteAdimi({ d, sira, cs, oy, onNext }: { d: Dikte; sira: string; cs: MedyaCumle[]; oy: ReturnType<typeof useOynatici>; onNext: (ok: boolean | null) => void }) {
  const c = "cumle" in d ? cs.find((x) => x.id === d.cumle) : undefined;
  const [res, setRes] = useState<{ ok: boolean; cevap: string; beklenen: string; not?: string } | null>(null);
  const [secim, setSecim] = useState<number[]>([]);
  const [yavas, setYavas] = useState(false);
  const banka = useMemo(() => (d.seviye === "zor" ? d.banka : []), [d]);
  const seviyeTr = { kolay: "Hangi kelimeyi duydun?", orta: "Boşluğa duyduğun kelimeyi yaz", zor: "Duyduğun cümleyi kelimelerden kur", usta: "Duyduğun cümleyi yaz", gercek: "Kendi cümlelerinle" }[d.seviye];
  const goster = (ok: boolean, cevap: string, beklenen: string, not?: string) => { setRes({ ok, cevap, beklenen, not }); haptic(ok ? "success" : "error"); };
  const kontrol = (a: string) => {
    if (d.seviye === "orta" || d.seviye === "zor" || d.seviye === "usta") {
      const r = dikteDegerlendir(d, a);
      // B11b günlük görev: dikte merdiveninin puanlı en üst basamağında ("Duyduğun cümleyi yaz") doğru cümle
      if (r.ok && d.seviye === "usta") void gorevSay("dikteUsta", d.cumle);
      goster(r.ok, a, d.seviye === "orta" ? d.de.replace("___", r.beklenen) : r.beklenen, r.yazim ? `Yazımı: ${r.yazim}` : undefined);
    } else if (d.seviye === "gercek") {
      const eksik = eksikZorunlu(a, d.zorunlu);
      // gerçek hayat görevi cezasız: zorunlu kelimeler kontrol edilir, örnek gösterilir
      goster(false, a, d.ornek_de, eksik.length ? `Şu kelimeleri de kullanmayı dene: ${eksik.join(", ")}` : "Gereken kelimelerin hepsini kullandın.");
    }
  };
  return (
    <section class="card stack fade" data-test={`dikte-${d.seviye}`} {...(E2E ? { "data-cevap": d.seviye === "kolay" ? d.opts[d.ans] : d.seviye === "gercek" ? d.ornek_de : d.accepted[0] } : {})}>
      <div class="kicker">Dikte {sira} · {seviyeTr}</div>
      {c && <div class="row"><button class="btn primary grow" data-test="dikte-dinle" onClick={() => void oy.cumle(c, yavas)}><Icon name="play" /> Cümleyi dinle</button>
        <button class={`btn${yavas ? " primary" : ""}`} aria-pressed={yavas} onClick={() => setYavas(!yavas)}>0,75×</button></div>}
      {c && (d.seviye === "orta" || d.seviye === "zor" || d.seviye === "usta") && (() => { const h = hedefSira(c.de, d.seviye === "orta" ? d.de.replace("___", d.accepted[0]!) : d.accepted[0]!); return h ? <p class="small" data-test="hedef-sira">Bu kayıtta {h.toplam} cümle var; {h.sira}. cümleyi yaz.</p> : null; })()}
      {d.seviye === "kolay" && <DikteSec d={d} onPick={(ok, o) => goster(ok, o, d.opts[d.ans]!)} done={!!res} />}
      {d.seviye === "orta" && <div class="de-lg" lang="de">{d.de.split("___").map((part, j) => <>{j > 0 && <span class="gapblank" aria-label="boşluk" />}{part}</>)}</div>}
      {d.seviye === "zor" && !res && (
        <div class="stack">
          <div class="slot" aria-label="Kurduğun cümle" lang="de" data-test="kurulan">{secim.map((k, j) => <button class="wchip" onClick={() => setSecim(secim.filter((_, x) => x !== j))}>{banka[k]}</button>)}</div>
          <div class="row" lang="de">{banka.map((w, k) => <button class={`wchip${secim.includes(k) ? " used" : ""}`} disabled={secim.includes(k)} data-test="banka" data-chip={w} onClick={() => { haptic("selection"); setSecim([...secim, k]); }}>{w}</button>)}</div>
          <button class="btn primary block" data-test="submit" disabled={!secim.length} onClick={() => kontrol(secim.map((k) => banka[k]).join(" "))}>Kontrol et</button>
        </div>
      )}
      {d.seviye === "gercek" && <p>{d.gorev_tr}</p>}
      {(d.seviye === "orta" || d.seviye === "usta" || d.seviye === "gercek") && !res && <ActionBar><AnswerField onSubmit={(a) => kontrol(a)} voice={d.seviye === "gercek"} /></ActionBar>}
      {res && <ActionBar>
        {res.ok ? <FeedbackBand kind="ok" title="Doğru."><span lang="de">{res.beklenen}</span>{res.not && <div class="small" data-test="yazim">{res.not}</div>}</FeedbackBand>
          : <FeedbackBand kind={d.seviye === "gercek" ? "info" : "bad"} title={d.seviye === "gercek" ? "Örnek cevap" : "Doğrusu:"}>
              <YanlisIci dogrusu={res.beklenen} cevap={res.cevap}>{res.not && <div class="small">{res.not}</div>}</YanlisIci></FeedbackBand>}
        {/* gerçek hayat görevi serbest yazımdır: puana girmez */}
        <button class="btn primary block" data-test="next" onClick={() => onNext(d.seviye === "gercek" ? null : res.ok)}>Devam</button></ActionBar>}
    </section>
  );
}
function DikteSec({ d, onPick, done }: { d: Extract<Dikte, { seviye: "kolay" }>; onPick: (ok: boolean, o: string) => void; done: boolean }) {
  const [sec, setSec] = useState<number | null>(null);
  return <div role="group">{d.opts.map((o, k) => <button lang="de" class={`opt${sec === null ? "" : k === d.ans ? " right" : k === sec ? " wrong" : ""}`} disabled={done || sec !== null} data-opt={k}
    {...(E2E ? { "data-right": k === d.ans ? "1" : undefined } : {})} onClick={() => { setSec(k); onPick(k === d.ans, o); }}>{o}</button>)}</div>;
}

/* (e) metin açılır; kelimeye dokununca kart ve "bankaya ekle" */
function TranskriptAdimi({ cs, lex, oy, onNext }: { cs: MedyaCumle[]; lex: Lexeme[]; oy: ReturnType<typeof useOynatici>; onNext: () => void }) {
  const [kelime, setKelime] = useState<string | null>(null);
  return (
    <section class="card stack fade" data-test="adim-transkript">
      <div class="kicker">Metin · bilmediğin kelimeye dokun</div>
      {cs.map((c) => (
        <p class={oy.calisiyor === c.id ? "on" : ""}>
          <DokunMetin de={c.de} onKelime={setKelime} />
          {" "}<button class="btn ghost sm" aria-label="Bu cümleyi dinle" onClick={() => void oy.cumle(c, false)}><Icon name="play" /></button>
          <br /><span class="small muted">{c.tr}</span></p>))}
      {kelime && <KelimeSayfasi kelime={kelime} lex={lex} onClose={() => setKelime(null)} />}
      {!kelime && <ActionBar><button class="btn primary block" data-test="next" onClick={onNext}>Devam</button></ActionBar>}
    </section>
  );
}

/* (f) gölge konuşma: dinle, aynısını söyle */
/** XP yalnızca tanıma "çok iyi" dediyse ve bir kez (tekrar söyleyince yeniden uçmaz); "Söyledim"/"Doğru söyledim" beyandır,
 *  XP almaz (D-102; inceleme #87 2. tur) */
function GolgeAdimi({ c, sira, oy, onNext }: { c: MedyaCumle; sira: string; oy: ReturnType<typeof useOynatici>; onNext: (ok: boolean, xp: boolean) => void }) {
  const [duydum, setDuydum] = useState<string | null>(null);
  const [iyiSayisi, setIyiSayisi] = useState(0);
  const skor = duydum ? scoreHeard(c.de, duydum) : null;
  return (
    <section class="card stack fade" data-test="adim-golge">
      <div class="kicker">Gölge konuşma {sira}: dinle, hemen aynısını söyle</div>
      <div class="de-lg" lang="de">{c.de}</div><p class="small muted">{c.tr}</p>
      <div class="row"><button class="btn primary grow" data-test="golge-dinle" onClick={() => void oy.cumle(c, false)}><Icon name="play" /> Dinle</button>
        <button class="btn grow" onClick={() => void oy.cumle(c, true)}>0,75×</button></div>
      {duydum !== null && skor && (
        <FeedbackBand kind={skor.score >= 0.8 ? "ok" : "info"} title={`Duyduğum: ${duydum}`} xp={iyiSayisi > 1 ? 0 : undefined}>
          {skor.score >= 0.8 ? "Çok iyi." : "Bir daha dene; zorlanılan kelimeyi yavaş dinle."}</FeedbackBand>)}
      <ActionBar>
        {sttAvailable() ? <MicButton wide label={duydum === null ? "Söyle" : "Tekrar söyle"} onText={(t) => { setDuydum(t); if (scoreHeard(c.de, t).score >= 0.8) { setIyiSayisi((n) => n + 1); void gorevSay("sesli", c.id); } }} /> : null}
        {/* konuşma tanıma yanlış duyabilir: öğrenci "doğru söyledim" diyebilir (PM-054.3) */}
        <button class="btn block" data-test="next" onClick={() => onNext(true, iyiSayisi > 0)}>{duydum === null ? "Söyledim" : skor && skor.score >= 0.8 ? "Devam" : "Doğru söyledim, devam"}</button>
      </ActionBar>
    </section>
  );
}

/* (g) "Sen ne derdin?" — kurallarla; kuralların tanımadığı cevapta karar öğrencinin (D-097) */
function CevaplaAdimi({ d, onNext }: { d: NonNullable<Bolum["cevapla"]>; onNext: (ok: boolean, beyan?: boolean) => void }) {
  const [v, setV] = useState<{ kind: "correct" | "wrong" | "unchecked"; a: string; best: string } | null>(null);
  // desteklenmeyen madde türü (doğrulayıcı da hata verir): öğrenci sıkışmaz (inceleme #60 P1-4)
  if (d.k !== "guided_response" && d.k !== "listen_and_respond" && d.k !== "tr_de") return <ActionBar><button class="btn primary block" data-test="next" onClick={() => onNext(true)}>Devam</button></ActionBar>;
  const prompt = d.k === "guided_response" ? d.prompt_de : d.k === "listen_and_respond" ? d.audio_de : undefined;
  const durum = d.k === "tr_de" ? d.tr : d.situation_tr;
  return (
    <section class="card stack fade" data-test="adim-cevapla" {...(E2E ? { "data-cevap": d.accepted[0] } : {})}>
      <div class="kicker">Sen ne derdin? Söyle ya da yaz</div>
      {durum && <p>{durum}</p>}
      {prompt && <div class="row"><button class="btn sm" onClick={() => void speak(prompt, "de", "normal")}><Icon name="play" /> Dinle</button>{d.k === "guided_response" && <span class="de" lang="de">„{prompt}“</span>}</div>}
      {!v && <ActionBar><AnswerField submitLabel="Söyle" onSubmit={(a) => { const r = ruleVerdict(d.accepted, a); setV({ kind: r.kind === "correct" ? "correct" : r.kind === "ask_ai" ? "unchecked" : "wrong", a, best: r.best || d.accepted[0]! }); haptic(r.kind === "correct" ? "success" : "error"); }} /></ActionBar>}
      {v && <ActionBar>
        {v.kind === "correct" ? <FeedbackBand kind="ok" title="Doğru."><span lang="de">{v.a}</span></FeedbackBand>
          : v.kind === "unchecked" ? <FeedbackBand kind="info" title="Uygulama bu cevabı denetleyemedi.">
              <div class="small">Senin cümlen: <span lang="de">{v.a}</span></div>
              <div>Örnek cevap: <b lang="de">{v.best.replace(/\.+$/, ".")}</b></div>
              <div class="small">Senin cümlen ile örnek aynı şeyi söylüyor mu? Emin değilsen örneği öğren.</div></FeedbackBand>
          : <FeedbackBand kind="bad" title="Doğrusu:"><YanlisIci dogrusu={v.best} cevap={v.a}>{d.why_tr && <div class="small"><Rich text={d.why_tr} /></div>}</YanlisIci></FeedbackBand>}
        {v.kind === "unchecked" ? <><button class="btn primary block" data-test="next" onClick={() => onNext(false)}>Örneği öğrendim, devam</button>
            <button class="btn block" data-test="claim" onClick={() => { void addClaim({ at: new Date().toISOString(), scenarioId: "m1", itemId: d.id, prompt: d.k === "tr_de" ? d.tr : d.situation_tr ?? "", answer: v.a, expected: d.accepted }); onNext(true, true); }}>Benimki de aynı anlamda</button></>
          : <button class="btn primary block" data-test="next" onClick={() => onNext(v.kind === "correct")}>Devam</button>}
      </ActionBar>}
    </section>
  );
}

/* ============================ Gün sayfası (geçici giriş; A5 yol ekranı gelene kadar) ============================ */
export function M1Gun({ day }: { day: number }) {
  const [gun, setGun] = useState<Gun | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => { loadM1Gun(day).then(setGun).catch((e) => setErr(String(e?.message || e))); }, [day]);
  if (err) return <ErrorPanel message={err} onRetry={() => location.reload()} />;
  if (!gun) return <Loading />;
  const ad = { video: "Video", ses: "Dinle", sahne: "Köy dizisi" } as const;
  return (
    <div class="stack" data-test="m1-gun">
      <ProgressHeader title={`${gun.day}. gün: ${gun.title_tr}`} back="#/learn" />
      <p class="small">{gun.goal_tr}</p>
      <ul class="list card">{medyalar(gun).map((m) => (
        <li><a class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} href={`#/m1/${gun.day}/${encodeURIComponent(m.id)}`} data-test={`medya-${m.kind}`}>
          <span class="grow"><span class="tiny muted">{ad[m.kind]} · {m.bolumler.length} bölüm</span><br /><b>{m.title_tr}</b></span><span aria-hidden="true">›</span></a></li>))}</ul>
    </div>
  );
}
