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

  return (
    <div class="stack">
      <section class="card hl">
        <div class="row" style={{ flexWrap: "nowrap", gap: 14 }}>
          <Ring value={min} max={goal} label={`Bugün ${min} / ${goal} dakika`} />
          <div class="grow">
            <h1 style={{ fontSize: "1.25rem" }}>{greet}{profile.displayName ? `, ${profile.displayName}` : ""}</h1>
            <p class="small muted">Bugün <b data-test="today-min">{min} / {goal} dk</b> odak · {profile.focus.workMin} dk çalışma, {profile.focus.breakMin} dk mola</p>
            <div class="row small" aria-label="Seanslar">
              <span class="dots" aria-hidden="true">
                {[1, 2, 3, 4].map((k) => { const s = sessions.find((x) => x.n === k && x.status !== "abandoned"); return <i class={s?.status === "completed" ? "done" : s?.status === "interrupted" ? "int" : s?.status === "running" ? "cur" : ""} />; })}
              </span>
              <span data-test="sessions-done">{e?.completedCount || 0}/4 seans</span>
              {e?.day.goalHitAt && <span class="chip ok">✓ Hedef tamam</span>}
            </div>
          </div>
        </div>
      </section>

      {e && <FocusPanel />}

      {indexError && <ErrorPanel message={`İçerik yüklenemedi: ${indexError}`} onRetry={() => location.reload()} />}

      <section class="card" data-test="next-activity">
        <div class="kicker">Sıradaki · Seans {n}: {rec.kind === "assess" ? "Seviye tespiti" : rec.kind === "none" ? rec.title_tr : ACTIVITY_TR[rec.activity]}</div>
        <h2>{rec.title_tr}</h2>
        <p class="small muted">{rec.why_tr}</p>
        {rec.kind === "assess" && <a class="btn primary block" href="#/assess">Seviye tespitine başla</a>}
        {rec.kind === "scenario" && <>
          {rec.draft && <p class="tiny"><span class="chip warn">İçerik inceleme bekliyor</span></p>}
          <a class="btn primary block" href={`#/scenario/${encodeURIComponent(rec.scenarioId)}`}>Çalışma sayfasını aç</a>
        </>}
        {rec.kind === "v1" && <a class="btn block" href={rec.url} target="_blank" rel="noopener">v1'de aç ↗</a>}
        {placement && <a class="small" href={`#/assess/result/${placement.id}`}>Seviye tespiti sonucun: {placement.overall === "below-A1" ? "A1 öncesi" : placement.overall}</a>}
      </section>

      {scen && (
        <section class="card">
          <div class="kicker">Şu an öğrendiklerin · {scen.title_tr}</div>
          <ul class="list">
            {scen.chunks.filter((c) => scen.essentials.chunks.includes(c.id)).slice(0, 5).map((c) => (
              <li class="row" style={{ flexWrap: "nowrap" }}><span class="grow"><span class="de">{c.layers.hd}</span><br /><span class="small muted">{c.tr}</span></span><SpeakBtn text={c.layers.hd} /></li>
            ))}
          </ul>
        </section>
      )}

      <section class="card" data-test="weak">
        <div class="kicker">Tekrar edilecek zayıflıkların</div>
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

function FocusPanel() {
  const { profile } = useApp();
  const e = useFocusTick()!;
  const now = Date.now();
  const [idea] = useState(() => BREAK_IDEAS[Math.floor(Math.random() * BREAK_IDEAS.length)]!);
  if (e.rt.phase === "break") {
    const long = e.rt.breakKind === "long";
    return (
      <section class="card" data-test="break">
        <div class="kicker">{long ? "Uzun mola (isteğe bağlı)" : "Mola"} · {e.completedCount}. seans tamam</div>
        <div class="big">{mmss(e.breakLeftSec(now))}</div>
        <p class="small">{long ? "Dört seansı bitirdin. İstersen uzun bir mola ver; istersen atla." : idea}</p>
        <p class="small muted"><span class="de">Ich mache kurz Pause.</span> = Kısa bir mola veriyorum.</p>
        <button class="btn block" onClick={focusSkipBreak}>Molayı atla</button>
      </section>
    );
  }
  if (e.rt.phase === "focus" && e.current) {
    const s = e.current;
    return (
      <section class="card" data-test="focus-running">
        <div class="kicker">Seans {s.n}/4 · {ACTIVITY_TR[s.plannedActivity]}</div>
        <div class="row between"><div class="big">{mmss(e.focusLeftSec())}</div><span class="small muted">kalan odak süresi</span></div>
        <p class="tiny muted">Süre yalnızca öğrenme ekranlarında ve aktif çalışırken sayılır.</p>
        <button class="btn block" onClick={() => focusPause(!e.rt.paused)}>{e.rt.paused ? "Devam et" : "Duraklat"}</button>
        {e.rt.paused && <p class="small muted">Duraklatıldı.</p>}
      </section>
    );
  }
  if (e.rt.resumableId) {
    const s = e.day.sessions.find((x) => x.id === e.rt.resumableId);
    return (
      <section class="card" data-test="interrupted">
        <div class="kicker">Seans {s?.n} yarıda kaldı</div>
        <p class="small">{Math.floor((s?.focusSec || 0) / 60)} dk çalışmıştın. Kaldığın yerden devam edebilir ya da yeni seans başlatabilirsin.</p>
        <div class="row"><button class="btn primary grow" onClick={focusResume}>Devam et</button><button class="btn grow" onClick={() => focusStart()}>Yeni seans</button></div>
      </section>
    );
  }
  const next = e.nextN;
  return (
    <section class="card" data-test="focus-idle">
      <div class="kicker">Seans {next}{next > 4 ? " (bonus)" : "/4"} · önerilen: {(profile.focus.sessionPlan[(next - 1) % 4] || []).map((a) => ACTIVITY_TR[a]).join(", ")}</div>
      <p class="small muted">Öğrenmeye başladığında seans kendiliğinden başlar. İstersen şimdi başlatabilirsin.</p>
      <button class="btn block" onClick={() => focusStart()} data-test="focus-start">Seans {next}'i başlat</button>
    </section>
  );
}
