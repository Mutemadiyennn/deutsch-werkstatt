/** Bugün: 100 dk hedefi, seans x/4, kalan odak/mola süresi, sıradaki etkinlik, öğrenilenler, zayıflıklar */
import { useEffect, useState } from "preact/hooks";
import type { LearnerItem, Lexeme, Scenario } from "@dw/shared";
import { useApp } from "../state.ts";
import { recommend, ACTIVITY_TR } from "../core/planner.ts";
import { seasonal } from "../core/season.ts";
import { bankItems } from "../data/db.ts";
import { loadIndex, loadLexicon, loadScenario } from "../services/content.ts";
import { focusPause, focusResume, focusSkipBreak, focusStart } from "../services/focusRuntime.ts";
import { Art, ErrorPanel, SpeakBtn, minLeft, useFocusTick } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { Avatar, RauteRow, SkyBand, accentOf, type RState } from "../ui/raute.tsx";

const BREAK_IDEAS = ["Kalk, biraz yürü ya da gerin.", "Bir bardak su iç.", "Gözlerini ekrandan ayır; uzağa bak.", "Omuzlarını 10 kez geriye çevir.", "Pencereyi aç, derin nefes al."];

export function Today() {
  const { profile, index, indexError, placement } = useApp();
  const e = useFocusTick();
  // PM-035 §3: tekrar listesinde ham kimlik yok; kelime, ifade ve kalıp çözülür, çözülemeyen gösterilmez
  const [bank, setBank] = useState<{ it: LearnerItem; de: string; tr: string; art?: string }[]>([]);
  const [scen, setScen] = useState<Scenario | null>(null);
  const now = Date.now();
  const n = e ? (e.rt.phase === "focus" && e.current ? e.current.n : e.nextN) : 1;
  const rec = recommend({ profile, index, hasPlacement: !!placement, sessionN: n });

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
      for (const sc of idx.scenarios.filter((x) => doms.includes(x.domain))) { try { const s = await loadScenario(sc.id); for (const c of s.chunks) chunkMap.set(c.id, { de: c.layers.hd, tr: c.tr }); } catch { /* çevrimdışı: atla */ } }
      setBank(items.flatMap((it) => {
        const l = m.get(it.itemId); if (l) return [{ it, de: l.de, tr: l.tr, art: l.art }];
        const c = chunkMap.get(it.itemId); if (c) return [{ it, ...c }];
        const p = pm.get(it.itemId); if (p?.examples[0]) return [{ it, de: p.examples[0].de, tr: p.examples[0].tr }];
        return [];
      }));
    })().catch(() => setBank([]));
  }, [placement?.id]);
  useEffect(() => {
    if (rec.kind === "scenario") loadScenario(rec.scenarioId).then(setScen).catch(() => setScen(null));
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
  const inSeasonNow = seasonal(index?.scenarios || [], now);
  // ekrandaki tek ilerleme göstergesi: 4 seans = 4 Raute (yarım = sürüyor / yarıda kaldı)
  const rs = [1, 2, 3, 4].map((k) => { const x = sessions.find((y) => y.n === k && y.status !== "abandoned"); return (x?.status === "completed" ? 1 : x ? 0.5 : 0) as RState; });
  const done = e?.completedCount || 0;
  const accent = accentOf(scen?.domain);
  const who = scen?.dialogues[0]?.roles.A;
  const initials = (who || scen?.title_de || "DW").split(/\s+/).filter((w) => /^\p{Lu}/u.test(w)).slice(0, 2).map((w) => w[0]).join("") || "DW";

  return (
    <div class="stack today">
      <SkyBand hour={hour}>
        <h1 class="greet" lang="de">{greetDe}</h1>
        <p class="skyline-tr">{greetTr}{profile.displayName ? `, ${profile.displayName}` : ""}. {rec.kind === "scenario" ? `Bugün sırada: ${rec.title_tr}.` : rec.kind === "assess" ? "Önce kısa bir seviye tespiti yapalım." : ""}</p>
        {examOn && <span class="skychip" data-test="exam-badge">B1{exam !== null ? `: ${exam} gün` : ""}</span>}
      </SkyBand>

      <div class="dayrow">
        <RauteRow states={rs} label={`Bugün ${done}/4 seans`} size={20} test="session-rauten" />
        <span class="tiny sr-only" data-test="sessions-done">{done}/4 seans</span>
        <span class="daymin" data-test="today-min"><b>{min}</b> / {goal} dk</span>
      </div>
      {e?.day.goalHitAt && <p class="small goalhit"><Icon name="check" size={18} /> Bugünkü hedef tamam</p>}
      {breakOn && <BreakCard />}

      {indexError && <ErrorPanel message={`İçerik yüklenemedi: ${indexError}`} onRetry={() => location.reload()} />}

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
        {rec.kind === "v1" && <a class="btn primary block" href={rec.url} target="_blank" rel="noopener">Eski uygulamada aç <Icon name="out" size={18} /></a>}
        {e && !breakOn && <FocusPanel />}
        {placement && <a class="small" href={`#/assess/result/${placement.id}`}>Seviye tespiti sonucun: {placement.overall === "below-A1" ? "A1 öncesi" : placement.overall}</a>}
      </section>

      {inSeasonNow.length > 0 && (
        <section class="card tint orange" data-test="season">
          <div class="sechead"><span class="ic" aria-hidden="true" style={{ color: "var(--brezel)" }}><Icon name="raute" /></span><div><h2>Mevsimin dersi</h2><div class="tiny muted">{inSeasonNow[0]!.season!.title_tr}</div></div></div>
          <ul class="list">{inSeasonNow.map((x) => <li><a href={`#/scenario/${encodeURIComponent(x.id)}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }}><span class="grow"><b>{x.title_tr}</b><br /><span class="small muted" lang="de">{x.title_de}</span></span>{x.review !== "reviewed" && <span class="chip">inceleme bekliyor</span>}<Icon name="next" size={18} /></a></li>)}</ul>
        </section>
      )}

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

      <section class="plainsec" data-test="weak">
        <h2 class="sectitle">Tekrar edilecekler</h2>
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
      <p class="tiny muted" style={{ textAlign: "center", margin: 0 }}>{profile.focus.workMin} dk çalışma, {profile.focus.breakMin} dk mola. Süre yalnızca öğrenirken sayılır.</p>
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
      <p class="small muted" style={{ marginTop: 6 }}>Mola bitince zil çalar; sıradaki seans öğrenmeye döndüğünde kendiliğinden başlar.</p>
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
  if (!e || e.rt.phase !== "break") return null;
  return <div class="breakov" role="dialog" aria-label="Mola"><div><BreakCard /></div></div>;
}
