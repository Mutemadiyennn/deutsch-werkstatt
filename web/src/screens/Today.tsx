/** Bugün: 100 dk hedefi, seans x/4, kalan odak/mola süresi, sıradaki etkinlik, öğrenilenler, zayıflıklar */
import { useEffect, useState } from "preact/hooks";
import type { LearnerItem, Lexeme, Scenario } from "@dw/shared";
import { useApp } from "../state.ts";
import { recommend, ACTIVITY_TR } from "../core/planner.ts";
import { bankItems } from "../data/db.ts";
import { loadLexicon, loadScenario } from "../services/content.ts";
import { focusPause, focusResume, focusSkipBreak, focusStart } from "../services/focusRuntime.ts";
import { Art, ErrorPanel, Ring, SpeakBtn, mmss, useFocusTick } from "../ui/components.tsx";

const BREAK_IDEAS = ["Kalk, biraz yürü ya da gerin.", "Bir bardak su iç.", "Gözlerini ekrandan ayır; uzağa bak.", "Omuzlarını 10 kez geriye çevir.", "Pencereyi aç, derin nefes al."];

export function Today() {
  const { profile, index, indexError, placement } = useApp();
  const e = useFocusTick();
  const [bank, setBank] = useState<{ it: LearnerItem; lx?: Lexeme }[]>([]);
  const [scen, setScen] = useState<Scenario | null>(null);
  const now = Date.now();
  const n = e ? (e.rt.phase === "focus" && e.current ? e.current.n : e.nextN) : 1;
  const rec = recommend({ profile, index, hasPlacement: !!placement, sessionN: n });

  useEffect(() => {
    (async () => {
      const items = await bankItems(6);
      if (!items.length) { setBank([]); return; }
      const { lexemes } = await loadLexicon();
      const m = new Map(lexemes.map((l) => [l.id, l]));
      setBank(items.map((it) => ({ it, lx: m.get(it.itemId) })));
    })().catch(() => setBank([]));
  }, [placement?.id]);
  useEffect(() => {
    if (rec.kind === "scenario") loadScenario(rec.scenarioId).then(setScen).catch(() => setScen(null));
  }, [rec.kind === "scenario" ? rec.scenarioId : ""]);

  const min = e ? e.focusMin() : 0;
  const goal = profile.focus.dailyGoalMin;
  const sessions = e?.day.sessions || [];
  const hour = new Date().getHours();
  const greet = hour < 11 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";

  const greetDe = hour < 11 ? "Guten Morgen!" : hour < 18 ? "Guten Tag!" : "Guten Abend!";
  const exam = profile.goals.examB1.enabled && profile.goals.examB1.date ? Math.max(0, Math.ceil((Date.parse(profile.goals.examB1.date) - now) / 86400_000)) : null;
  const breakOn = e?.rt.phase === "break";

  return (
    <div class="stack">
      <div class="chiprow" aria-label="Özet">
        <span class="pill">⏱ {min}/{goal}</span>
        <span class="pill warm">☕ {e?.completedCount || 0}/4 seans</span>
        {exam !== null && <span class="pill pink">🎯 B1: {exam} gün</span>}
      </div>
      {breakOn && <BreakCard />}
      <section class="card hero stack">
        <div class="row" style={{ flexWrap: "nowrap", gap: 16 }}>
          <Ring value={min} max={goal} label={`Bugün ${min} / ${goal} dakika`} size={104} />
          <div class="grow" style={{ minWidth: 0 }}>
            <h1 class="hero-title" lang="de">{greetDe}</h1>
            <div class="small" style={{ opacity: 0.85 }}>{greet}{profile.displayName ? `, ${profile.displayName}` : ""}</div>
            <p class="small" style={{ margin: "6px 0 4px" }}>Bugün <b data-test="today-min">{min} / {goal} dk</b> odak</p>
            <div class="row small" aria-label="Seanslar" style={{ gap: 8 }}>
              <span class="dots" aria-hidden="true">
                {[1, 2, 3, 4].map((k) => { const s = sessions.find((x) => x.n === k && x.status !== "abandoned"); return <i class={s?.status === "completed" ? "done" : s?.status === "interrupted" ? "int" : s?.status === "running" ? "cur" : ""} />; })}
              </span>
              <span data-test="sessions-done">{e?.completedCount || 0}/4 seans</span>
            </div>
          </div>
        </div>
        {e?.day.goalHitAt && <span class="pill">✓ Bugünkü hedef tamam</span>}
        {e && !breakOn && <FocusPanel />}
        <p class="tiny" style={{ margin: 0, opacity: 0.8 }}>{profile.focus.workMin} dk çalışma · {profile.focus.breakMin} dk mola · süre yalnızca öğrenirken sayılır</p>
      </section>


      {indexError && <ErrorPanel message={`İçerik yüklenemedi: ${indexError}`} onRetry={() => location.reload()} />}

      <section class="card hero teal stack" data-test="next-activity">
        <div class="kicker">Sıradaki · Seans {n}: {rec.kind === "assess" ? "Seviye tespiti" : rec.kind === "none" ? rec.title_tr : ACTIVITY_TR[rec.activity]}</div>
        <h2 style={{ fontSize: "1.55rem", margin: 0 }}>{rec.title_tr}</h2>
        <p class="small muted" style={{ margin: 0 }}>{rec.why_tr}</p>
        {rec.kind === "assess" && <a class="btn block" href="#/assess">▶ Seviye tespitine başla</a>}
        {rec.kind === "scenario" && <>
          {rec.draft && <p class="tiny" style={{ margin: 0 }}><span class="chip">İçerik inceleme bekliyor</span></p>}
          <a class="btn block" href={`#/scenario/${encodeURIComponent(rec.scenarioId)}`}>▶ Senaryoyu aç</a>
        </>}
        {rec.kind === "v1" && <a class="btn block" href={rec.url} target="_blank" rel="noopener">v1'de aç ↗</a>}
        {placement && <a class="small" style={{ color: "#fff" }} href={`#/assess/result/${placement.id}`}>Seviye tespiti sonucun: {placement.overall === "below-A1" ? "A1 öncesi" : placement.overall}</a>}
      </section>

      {scen && (
        <section class="card tint green">
          <div class="sechead"><span class="ic" aria-hidden="true">💬</span><h2>Şu an öğrendiklerin</h2></div>
          <div class="tiny muted">{scen.title_tr}</div>
          <ul class="list">
            {scen.chunks.filter((c) => scen.essentials.chunks.includes(c.id)).slice(0, 5).map((c) => (
              <li class="row" style={{ flexWrap: "nowrap" }}><span class="grow"><span class="de">{c.layers.hd}</span><br /><span class="small muted">{c.tr}</span></span><SpeakBtn text={c.layers.hd} /></li>
            ))}
          </ul>
        </section>
      )}

      <section class="card tint orange" data-test="weak">
        <div class="sechead"><span class="ic" aria-hidden="true">🎯</span><h2>Tekrar edilecek zayıflıkların</h2></div>
        {bank.length ? (
          <ul class="list">
            {bank.map(({ it, lx }) => (
              <li class="row" style={{ flexWrap: "nowrap" }}>
                <span class="grow">{lx ? <Art art={lx.art} de={lx.de} /> : it.itemId}{lx && <><br /><span class="small muted">{lx.tr}</span></>}</span>
                <span class="tiny muted">{it.gaps.at(-1)?.type === "passive" ? "tanıma" : "üretme"}</span>
                {lx && <SpeakBtn text={lx.de} />}
              </li>
            ))}
          </ul>
        ) : <p class="small muted">{placement ? "Şu an listede kelime yok." : "Seviye tespitinde bilmediğin kelimeler buraya eklenecek."}</p>}
      </section>
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
      <div class="timer" role="timer" aria-live="off">{mmss(e.breakLeftSec(Date.now()))}</div>
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
      <div class="stack" data-test="focus-running" style={{ gap: 8 }}>
        <div class="row between"><span class="small"><b>Seans {s.n}/4</b> · {ACTIVITY_TR[s.plannedActivity]}</span><span class="big" style={{ fontSize: "1.9rem" }}>{mmss(e.focusLeftSec())}</span></div>
        <button class="btn ghost block" onClick={() => focusPause(!e.rt.paused)}>{e.rt.paused ? "Devam et" : "Duraklat"}</button>
        {e.rt.paused && <p class="small" style={{ margin: 0 }}>Duraklatıldı.</p>}
      </div>
    );
  }
  if (e.rt.resumableId) {
    const s = e.day.sessions.find((x) => x.id === e.rt.resumableId);
    return (
      <div class="stack" data-test="interrupted" style={{ gap: 8 }}>
        <div class="small"><b>Seans {s?.n} yarıda kaldı</b> · {Math.floor((s?.focusSec || 0) / 60)} dk çalışmıştın.</div>
        <div class="row"><button class="btn grow" onClick={focusResume}>Devam et</button><button class="btn ghost grow" onClick={() => focusStart()}>Yeni seans</button></div>
      </div>
    );
  }
  const next = e.nextN;
  return (
    <div class="stack" data-test="focus-idle" style={{ gap: 8 }}>
      <div class="small"><b>Seans {next}{next > 4 ? " (bonus)" : "/4"}</b> · önerilen: {(profile.focus.sessionPlan[(next - 1) % 4] || []).map((a) => ACTIVITY_TR[a]).join(", ")}</div>
      <button class="btn ghost block" onClick={() => focusStart()} data-test="focus-start">Seans {next}'i şimdi başlat</button>
    </div>
  );
}

/** Öğrenme ekranındayken mola başlarsa (v1'deki gibi) ekranı mola kartı kaplar; atlanınca kaldığı yerden sürer */
export function BreakOverlay() {
  const e = useFocusTick();
  if (!e || e.rt.phase !== "break") return null;
  return <div class="breakov" role="dialog" aria-label="Mola"><div><BreakCard /></div></div>;
}
