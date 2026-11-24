/** Bugün: 100 dk hedefi, seans x/4, kalan odak/mola süresi, sıradaki etkinlik, öğrenilenler, zayıflıklar */
import { useEffect, useRef, useState } from "preact/hooks";
import type { LearnerItem, Lexeme, Scenario } from "@dw/shared";
import { HeardWordBox } from "../ui/learn.tsx";
import { useApp } from "../state.ts";
import { recommend, ACTIVITY_TR } from "../core/planner.ts";
import { LoadingCard } from "../ui/kit.tsx";
import { usePlan, YolHarita } from "./Yol.tsx";
import { adimAdi, seri } from "../core/gun.ts";
import { seasonal } from "../core/season.ts";
import { bankItems } from "../data/db.ts";
import { personalizeDeep } from "../core/persona.ts";
import { loadIndex, loadLexicon, loadScenario } from "../services/content.ts";
import { focusPause, focusResume, focusSkipBreak, focusStart } from "../services/focusRuntime.ts";
import { Art, ErrorPanel, Ring, SpeakBtn, TopBar, minLeft, useFocusTick } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { Avatar, RauteRow, SkyBand, accentOf, type RState } from "../ui/raute.tsx";
import { GorevSeridi } from "../ui/gorev.tsx";
import { GunSonu } from "../ui/gunsonu.tsx";

const breakOnNow = (e: { rt: { phase: string } }) => e.rt.phase === "break";
const BREAK_IDEAS = ["Kalk, biraz yürü ya da gerin.", "Bir bardak su iç.", "Gözlerini ekrandan ayır; uzağa bak.", "Omuzlarını 10 kez geriye çevir.", "Pencereyi aç, derin nefes al."];

export function Today() {
  const { profile, index, indexError, placement } = useApp();
  const e = useFocusTick();
  const [scen, setScen] = useState<Scenario | null>(null);
  const now = Date.now();
  const n = e ? (e.rt.phase === "focus" && e.current ? e.current.n : e.nextN) : 1;
  const rec = recommend({ profile, index, hasPlacement: !!placement, sessionN: n });
  // #58 A5b: M1 günleri varsa sıradaki adım günün planından gelir (v1'e gönderme yok). Sıfırdan başlayan öğrenci
  // seviye tespitini beklemez (LS-2.1 ilk başarı ≤60 sn); tespit ikincil bağlantıdır
  const { plan, err: planErr, yenile } = usePlan();
  const m1 = plan;

  useEffect(() => {
    // B7: "Şu an öğrendiklerin" de kişiselleştirilir (ad yuvası görünmez/okunmaz)
    if (rec.kind === "scenario") loadScenario(rec.scenarioId).then((s) => setScen(personalizeDeep(s, { name: profile.displayName, address: profile.address }))).catch(() => setScen(null));
  }, [rec.kind === "scenario" ? rec.scenarioId : ""]);

  const min = e ? e.focusMin() : 0;
  const goal = profile.focus.dailyGoalMin;
  const sessions = e?.day.sessions || [];
  const hour = new Date(now).getHours();
  // DESIGN §6: gök şeridi günün saatine göre; selam Bavyera'da günlük biçimde
  const greetDe = hour < 11 ? "Guten Morgen." : hour < 18 ? "Servus." : "Guten Abend.";
  const greetTr = hour < 11 ? "Günaydın" : hour < 18 ? "Merhaba" : "İyi akşamlar";
  const exam = profile.goals.examB1.enabled && profile.goals.examB1.date ? Math.max(0, Math.ceil((Date.parse(profile.goals.examB1.date) - now) / 86400_000)) : null;
  const examOn = profile.goals.examB1.enabled;
  const breakOn = e?.rt.phase === "break";
  // LS-17.0 / WORLD §6: gerçek takvime bağlı mevsim senaryoları (AA-GG aralığı; yıl dönümü sarar)
  // ekrandaki tek ilerleme göstergesi: 4 seans = 4 Raute (yarım = sürüyor / yarıda kaldı)
  const rs = [1, 2, 3, 4].map((k) => { const x = sessions.find((y) => y.n === k && y.status !== "abandoned"); return (x?.status === "completed" ? 1 : x ? 0.5 : 0) as RState; });
  const done = e?.completedCount || 0;
  const cur = e?.rt.phase === "focus" ? e.current : undefined;
  const yarida = e?.rt.resumableId ? e.day.sessions.find((x) => x.id === e.rt.resumableId) : undefined;
  const sn = (k: number) => (k <= 4 ? `${k}/4` : `${k} (ek)`);
  const seansDurum = !e ? "" : breakOnNow(e) ? `Mola · ${minLeft(e.breakLeftSec(now))} kaldı`
    : cur ? `Seans ${sn(cur.n)} sürüyor · ${minLeft(e.focusLeftSec())} kaldı${e.rt.paused ? " (duraklatıldı)" : ""}`
    : yarida ? `Seans ${sn(yarida.n)} yarıda kaldı · ${minLeft(e.cfg.workMin * 60 - yarida.focusSec)} kaldı`
    : done >= 4 && min >= goal ? "Bugünkü dört seans tamam" : `Sırada seans ${sn(e.nextN)} · ${e.cfg.workMin} dk`;
  /** "Devam et" süreyi başlatır (#58 A6): yarıda kalan seans sürer, yoksa yeni seans; mola sürüyorsa mola biter */
  const devam = () => { if (!e) return; if (cur) { if (e.rt.paused) focusPause(false); return; } if (yarida) focusResume(); else focusStart(); };
  const accent = accentOf(scen?.domain);
  const who = scen?.dialogues[0]?.roles.A;
  const initials = (who || scen?.title_de || "DW").split(/\s+/).filter((w) => /^\p{Lu}/u.test(w)).slice(0, 2).map((w) => w[0]).join("") || "DW";

  // Şölen 2 (PM 7015070303 A, #104 notu 1): M1'de Bugün = yol. Tek kahraman yol ve BAŞLA; altında yalnızca görev şeridi
  // ve (gün içinde adım bittiyse) gün sonu özeti. Süre ayrıntısı Odak ekranında (durum çubuğundaki dakika halkası);
  // tekrar yolun sonunda, "Duyduğum kelime" ve mevsim dersi Öğren'de.
  if (m1) return (
    <div class="stack today bugun-yol" data-test="bugun-yol">
      {breakOn && <BreakCard />}
      {indexError && <ErrorPanel message={`İçerik yüklenemedi: ${indexError}`} onRetry={() => location.reload()} />}
      <GorevSeridi plan={m1} />
      <YolHarita yalnizBugun plan={m1} selam={`${greetDe} ${greetTr}${profile.displayName ? `, ${profile.displayName}` : ""}.`}
        ek={examOn ? <span class="gun-bant-sinav" data-test="exam-badge">B1{exam !== null ? `: ${exam} gün` : ""}</span> : undefined} onBasla={devam} />
      <GunSonu plan={m1} />
    </div>
  );

  return (
    <div class="stack today">
      <SkyBand hour={hour}>
        <h1 class="greet" lang="de">{greetDe}</h1>
        <p class="skyline-tr">{greetTr}{profile.displayName ? `, ${profile.displayName}` : ""}. {rec.kind === "scenario" ? `Bugün sırada: ${rec.title_tr}.` : rec.kind === "assess" ? "Önce kısa bir seviye tespiti yapalım." : ""}</p>
        {examOn && <span class="skychip" data-test="exam-badge">B1{exam !== null ? `: ${exam} gün` : ""}</span>}
      </SkyBand>

      {/* #58 A6 (TARGET2): 100 dakika halkası + seans x/4 + kalan süre; tek gösterge grubu */}
      <div class="dayring" data-test="gun-halkasi">
        <Ring value={min} max={goal} size={84} label={`Bugün ${min} / ${goal} dakika`} />
        <div class="grow stack" style={{ gap: 6, minWidth: 0 }}>
          <div class="seansdurum" data-test="seans-durum">{seansDurum}</div>
          <RauteRow states={rs} label={`Bugün ${done}/4 seans`} size={18} test="session-rauten" />
          <span class="tiny sr-only" data-test="sessions-done">{done}/4 seans</span>
          <span class="tiny sr-only" data-test="today-min">{min} / {goal} dk</span>
          <span class="tiny muted" data-test="hedefe">{min < goal ? `Bugünkü hedefe ${goal - min} dk` : "Bugünkü hedef tamam"}</span>
        </div>
      </div>
      {breakOn && <BreakCard />}

      {indexError && <ErrorPanel message={`İçerik yüklenemedi: ${indexError}`} onRetry={() => location.reload()} />}

      {planErr ? <ErrorPanel message={`Günün planı yüklenemedi. ${planErr}`} onRetry={yenile} /> : !!index?.m1.length ? <LoadingCard lines={2} /> : (
      <section class="card nextcard stack" data-test="next-activity">
        <div class="row" style={{ flexWrap: "nowrap", gap: 14, alignItems: "center" }}>
          {rec.kind === "scenario" ? <Avatar initials={initials} accent={accent} /> : <span class="avatar" aria-hidden="true" style={{ width: 52, height: 52, background: "var(--himmel)" }}><Icon name={rec.kind === "assess" ? "target" : "raute"} size={24} /></span>}
          <div class="grow" style={{ minWidth: 0 }}>
            <div class="small muted">Sıradaki · Seans {n}: {rec.kind === "assess" ? "Seviye tespiti" : rec.kind === "none" ? rec.title_tr : ACTIVITY_TR[rec.activity]}</div>
            <h2 class="nexttitle">{rec.title_tr}</h2>
          </div>
        </div>
        <p class="small muted" style={{ margin: 0 }}>{rec.why_tr}</p>
        {rec.kind === "scenario" && rec.draft && <p class="tiny" style={{ margin: 0 }}><span class="chip">Deneme dersi</span></p>}
        {rec.kind === "assess" && <a class="btn primary block" href="#/assess"><Icon name="play" size={18} /> Seviye tespitine başla</a>}
        {rec.kind === "scenario" && <a class="btn primary block" href={`#/scenario/${encodeURIComponent(rec.scenarioId)}`}><Icon name="play" size={18} /> Devam et</a>}
        {e && !breakOn && <FocusPanel />}
        {placement && <a class="small" href={`#/assess/result/${placement.id}`}>Seviye tespiti sonucun: {placement.overall === "below-A1" ? "A1 öncesi" : placement.overall}</a>}
      </section>
      )}

      {/* #58 B3: gün sonu özeti (bugün en az bir adım bittiyse) */}
      {m1 && <GunSonu plan={m1} />}

      <MevsimKarti />

      {scen && (
        <section class="plainsec">
          <h2 class="sectitle">Şu an öğrendiklerin</h2>
          <div class="tiny muted">{scen.title_tr}</div>
          <ul class="list">
            {scen.chunks.filter((c) => scen.essentials.chunks.includes(c.id)).slice(0, 5).map((c) => (
              <li class="row" style={{ flexWrap: "nowrap" }}><span class="grow"><span class="de" lang="de">{c.layers.hd}</span><br /><span class="small muted">{c.tr}</span></span><SpeakBtn text={c.layers.hd} /></li>
            ))}
          </ul>
        </section>
      )}

      <TekrarListesi />
      <p class="tiny muted" style={{ textAlign: "center", margin: 0 }}>{profile.focus.workMin} dk çalışma, {profile.focus.breakMin} dk mola. Süre yalnızca öğrenirken sayılır.</p>
    </div>
  );
}


/** Mevsimin dersi (Öğren'de de gösterilir; M1'de Bugün = yol). */
export function MevsimKarti() {
  const { index } = useApp();
  const inSeasonNow = seasonal(index?.scenarios || [], Date.now());
  if (!inSeasonNow.length) return null;
  return (
        <section class="card tint orange" data-test="season">
          <div class="sechead"><span class="ic" aria-hidden="true" style={{ color: "var(--brezel)" }}><Icon name="raute" /></span><div><h2>Mevsimin dersi</h2><div class="tiny muted">{inSeasonNow[0]!.season!.title_tr}</div></div></div>
          <ul class="list">{inSeasonNow.map((x) => <li><a href={`#/scenario/${encodeURIComponent(x.id)}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }}><span class="grow"><b>{x.title_tr}</b><br /><span class="small muted" lang="de">{x.title_de}</span></span>{x.review !== "reviewed" && <span class="chip">inceleme bekliyor</span>}<Icon name="next" size={18} /></a></li>)}</ul>
        </section>
  );
}

/** "Tekrar edilecekler" (PM-035 §3): zayıf kartlar, "Duyduğum kelime", Bahçe tekrarı. M1'de Bugün = yol olduğundan Öğren'de. */
export function TekrarListesi() {
  const { placement, profile } = useApp();
  // PM-035 §3: tekrar listesinde ham kimlik yok; kelime, ifade ve kalıp çözülür, çözülemeyen gösterilmez
  const [bank, setBank] = useState<{ it: LearnerItem; de: string; tr: string; art?: string }[]>([]);
  useEffect(() => {
    (async () => {
      const items = await bankItems(6);
      if (!items.length) { setBank([]); return; }
      const { lexemes, patterns } = await loadLexicon();
      const m = new Map(lexemes.map((l) => [l.id, l]));
      const pm = new Map(patterns.map((p) => [p.id, p]));
      const chunkMap = new Map<string, { de: string; tr: string }>();
      const doms = [...new Set(items.filter((x) => x.itemId.startsWith("ch:")).map((x) => x.itemId.split(":")[1]))];
      const idx = await loadIndex();
      // B7 (inceleme #148 P1-1): ad yuvası ekranda ve seste kişiselleştirilir (adsız profilde `_adsiz` biçimi)
      const kisi = { name: profile.displayName, address: profile.address };
      for (const sc of idx.scenarios.filter((x) => doms.includes(x.domain))) { try { const s = personalizeDeep(await loadScenario(sc.id), kisi); for (const c of s.chunks) chunkMap.set(c.id, { de: c.layers.hd, tr: c.tr }); } catch { /* çevrimdışı: atla */ } }
      setBank(items.flatMap((it) => {
        const l = m.get(it.itemId); if (l) return [{ it, de: l.de, tr: l.tr, art: l.art }];
        const c = chunkMap.get(it.itemId); if (c) return [{ it, ...c }];
        const p = pm.get(it.itemId); if (p?.examples[0]) { const e = personalizeDeep(p.examples[0], kisi); return [{ it, de: e.de, tr: e.tr }]; }
        return [];
      }));
    })().catch(() => setBank([]));
  }, [placement?.id]);
  return (
      <section class="plainsec" data-test="weak">
        <h2 class="sectitle">Tekrar edilecekler</h2>
        {/* PM-049: kartlar soru olarak döner. EK1: ekranda tek ana eylem "Devam et"; bu ikincil (yeni Bugün A6'da seans 1 olur) */}
        <a class="btn block" href="#/garden" data-test="tekrar-bahce">Kelime Bahçesi: tekrar et</a>
        <div class="row" style={{ marginTop: 16 }}><HeardWordBox /></div>
        {bank.length ? (
          <ul class="list">
            {bank.map(({ it, de, tr, art }) => (
              <li class="row" style={{ flexWrap: "nowrap" }}>
                <span class="grow"><Art art={art} de={de} /><br /><span class="small muted">{tr}</span></span>
                <span class="tiny muted">{it.gaps.at(-1)?.type === "passive" ? "tanıma" : "üretme"}</span>
                <SpeakBtn text={de} />
              </li>
            ))}
          </ul>
        ) : <p class="small muted">{placement ? "Şu an listede kelime yok." : "Seviye tespitinde bilmediğin kelimeler buraya eklenecek."}</p>}
      </section>
  );
}

/**
 * Odak (PM 7015070303-E): Bugün'den taşınan süre ayrıntısı. Durum çubuğundaki dakika halkasına dokununca açılır:
 * 100 dakika halkası, seans x/4, kalan süre, sayacı başlat/duraklat. Eski veri sözleşmesi (gun-halkasi, seans-durum, …) korunur.
 */
export function OdakEkrani() {
  const { profile } = useApp();
  const e = useFocusTick();
  const now = Date.now();
  const min = e ? e.focusMin() : 0;
  const goal = profile.focus.dailyGoalMin;
  const sessions = e?.day.sessions || [];
  const rs = [1, 2, 3, 4].map((k) => { const x = sessions.find((y) => y.n === k && y.status !== "abandoned"); return (x?.status === "completed" ? 1 : x ? 0.5 : 0) as RState; });
  const done = e?.completedCount || 0;
  const cur = e?.rt.phase === "focus" ? e.current : undefined;
  const yarida = e?.rt.resumableId ? e.day.sessions.find((x) => x.id === e.rt.resumableId) : undefined;
  const sn = (k: number) => (k <= 4 ? `${k}/4` : `${k} (ek)`);
  const seansDurum = !e ? "" : breakOnNow(e) ? `Mola · ${minLeft(e.breakLeftSec(now))} kaldı`
    : cur ? `Seans ${sn(cur.n)} sürüyor · ${minLeft(e.focusLeftSec())} kaldı${e.rt.paused ? " (duraklatıldı)" : ""}`
    : yarida ? `Seans ${sn(yarida.n)} yarıda kaldı · ${minLeft(e.cfg.workMin * 60 - yarida.focusSec)} kaldı`
    : done >= 4 && min >= goal ? "Bugünkü dört seans tamam" : `Sırada seans ${sn(e.nextN)} · ${e.cfg.workMin} dk`;
  return (
    <div class="stack odak-sayfa" data-test="odak">
      <TopBar title="Bugünkü süre" back="#/today" />
      {e?.rt.phase === "break" && <BreakCard />}
      <section class="card stack">
        <div class="dayring" data-test="gun-halkasi">
          <Ring value={min} max={goal} size={96} label={`Bugün ${min} / ${goal} dakika`} />
          <div class="grow stack" style={{ gap: 6, minWidth: 0 }}>
            <div class="seansdurum" data-test="seans-durum">{seansDurum}</div>
            <RauteRow states={rs} label={`Bugün ${done}/4 seans`} size={18} test="session-rauten" />
            <span class="tiny sr-only" data-test="sessions-done">{done}/4 seans</span>
            <span class="tiny sr-only" data-test="today-min">{min} / {goal} dk</span>
            <span class="tiny muted" data-test="hedefe">{min < goal ? `Bugünkü hedefe ${goal - min} dk` : "Bugünkü hedef tamam"}</span>
          </div>
        </div>
        {/* süre "Devam et" ile başlar (yoldaki sıradaki düğüm); burada yalnızca süren ya da yarıda kalan seans yönetilir */}
        {e && e.rt.phase !== "break" && (cur || yarida) && <FocusPanel />}
      </section>
      <p class="small muted">{profile.focus.workMin} dk çalışma, {profile.focus.breakMin} dk mola. Süre yalnızca öğrenirken sayılır.</p>
    </div>
  );
}

/** Mola kartı (v1 düzeni): ortalanmış büyük sayaç, öneri, Almanca cümle, atla */
export function BreakCard() {
  const e = useFocusTick();
  const [idea] = useState(() => BREAK_IDEAS[Math.floor(Math.random() * BREAK_IDEAS.length)]!);
  if (!e || e.rt.phase !== "break") return null;
  const long = e.rt.breakKind === "long";
  return (
    <section class="card breakcard fade" data-test="break">
      <div class="kicker">{long ? "Uzun mola (isteğe bağlı)" : "Mola"} · {e.completedCount}. seans tamam</div>
      <div class="timer" role="timer" aria-live="off">{minLeft(e.breakLeftSec(Date.now()))}</div>
      <p style={{ margin: 0 }}>{long ? "Dört seansı bitirdin. İstersen uzun bir mola ver; istersen atla." : idea}</p>
      <p class="small muted" style={{ marginTop: 6 }}>Mola bitince zil çalar ve telefon titrer. Sıradaki seans öğrenmeye döndüğünde başlar.</p>
      <div class="row" style={{ justifyContent: "center", flexWrap: "nowrap" }}><span class="de-lg" lang="de">Ich mache kurz Pause.</span><SpeakBtn text="Ich mache kurz Pause." /></div>
      <div class="tr2">Kısa bir mola veriyorum.</div>
      <button class="btn block" style={{ marginTop: 16 }} onClick={focusSkipBreak}>Molayı atla</button>
    </section>
  );
}

function FocusPanel() {
  const { profile } = useApp();
  const e = useFocusTick()!;
  if (e.rt.phase === "focus" && e.current) {
    const s = e.current;
    return (
      <div class="focusrow" data-test="focus-running">
        <span class="small grow"><b>Seans {s.n} sürüyor</b> · {ACTIVITY_TR[s.plannedActivity]} · <span class="num">{minLeft(e.focusLeftSec())} kaldı</span></span>
        <button class="btn sm ghost" onClick={() => focusPause(!e.rt.paused)}>{e.rt.paused ? "Devam et" : "Duraklat"}</button>
      </div>
    );
  }
  if (e.rt.resumableId) {
    const s = e.day.sessions.find((x) => x.id === e.rt.resumableId);
    return (
      <div class="stack" data-test="interrupted" style={{ gap: 8 }}>
        <div class="small"><b>Seans {s?.n} yarıda kaldı</b>. {Math.floor((s?.focusSec || 0) / 60)} dakika çalışmıştın.</div>
        <div class="row"><button class="btn sm grow" onClick={focusResume}>Devam et</button><button class="btn sm ghost grow" onClick={() => focusStart()}>Yeni seans</button></div>
      </div>
    );
  }
  const next = e.nextN;
  return (
    <div class="focusrow" data-test="focus-idle">
      <span class="small grow"><b>Seans {next}{next > 4 ? " (ek)" : ""}</b> · {(profile.focus.sessionPlan[(next - 1) % 4] || []).map((a) => ACTIVITY_TR[a]).join(", ")}</span>
      <button class="btn sm ghost" onClick={() => focusStart()} data-test="focus-start">Sayacı başlat</button>
    </div>
  );
}

/** Öğrenme ekranındayken mola başlarsa (v1'deki gibi) ekranı mola kartı kaplar; atlanınca kaldığı yerden sürer */
export function BreakOverlay() {
  const e = useFocusTick();
  const on = !!e && e.rt.phase === "break";
  const ref = useRef<HTMLDivElement>(null);
  // mola kartı kaplarken alttaki ekran kullanılamaz (inert) ve klavye kapanır; odak karta taşınır (inceleme #67 P1-4)
  useEffect(() => {
    if (!on) return;
    const main = document.querySelector("main");
    main?.setAttribute("inert", ""); main?.setAttribute("aria-hidden", "true");
    (document.activeElement as HTMLElement | null)?.blur?.();
    ref.current?.focus();
    return () => { main?.removeAttribute("inert"); main?.removeAttribute("aria-hidden"); };
  }, [on]);
  if (!on) return null;
  return <div class="breakov" role="dialog" aria-modal="true" aria-label="Mola" tabIndex={-1} ref={ref} data-test="mola-ortusu"><div><BreakCard /></div></div>;
}
