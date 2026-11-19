/**
 * Senaryo oynatıcı (PEDAGOGY §5–§7): 1 Kelimeler · 2 İfadeler · 3 Cümle kurma · 4 Alıştırma · Dinleme · 5 Destekli diyalog · 6 Rol oyunu.
 * - Bölümler sırayla açılır (senaryo kapısı yalnızca temel öğelere bağlı: 1–2 temel öğeleri öğretir).
 * - Her cevap öğrenci modeline (FSRS çift yol) işlenir; odak motoru her bölümde etkinliği bilir.
 * - Üretim başarısızsa (<%50) bir önceki aşama yeniden açılır (geri dönüş kuralı).
 */
import { countsAsCorrect, expandTaught, isSameAsGiven, REGISTER_HINT } from "../core/answer.ts";
import { Rich } from "../ui/rich.tsx";
import { isRepeatRequest, offlineDialogueIndex } from "../core/offline.ts";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Chunk, Drill, Lexeme, Pattern, Scenario, ScenarioProgress, Speed } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadScenario } from "../services/content.ts";
import { getItem, getScenarioProgress, putItem, saveScenarioProgress, addPersonal } from "../data/db.ts";
import { focus, setLearning } from "../services/focusRuntime.ts";
import { review, sessionKey, type Outcome } from "../core/srs.ts";
import { norm, numberWordHint, scoreHeard } from "../core/grading.ts";
import type { Verdict } from "../core/answer.ts";
import type { LocalEntry } from "../core/sayit.ts";
import { ai, aiState, SOFT_WAIT_MS } from "../services/ai.ts";
import { personalizeDeep, redact, unredact, type Persona } from "../core/persona.ts";
import { ApiError } from "../services/api.ts";
import { baslangicYavas, speak, speakDizi, stopSpeaking } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { FocusChip } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { ActionBar, AnswerField, DeLine, Empty, FeedbackBand, ListenButton, LoadingCard, MicButton, ProgressHeader } from "../ui/kit.tsx";
import { ExplainBtn, SayItBox, VerdictView, useGrader } from "../ui/learn.tsx";
import { HearSection, LearnSection } from "./Stage12.tsx";

export const SECTIONS = [
  { k: "words", n: "1", title: "Dinle ve tara", act: "vocab" },
  { k: "chunks", n: "2", title: "İfadeler", act: "chunks" },
  { k: "build", n: "3", title: "Cümle kur", act: "build" },
  { k: "drills", n: "4", title: "Alıştırma", act: "drills" },
  { k: "listening", n: "+", title: "Dinleme", act: "listening" },
  { k: "dialogue", n: "5", title: "Diyalog", act: "dialogue" },
  { k: "roleplay", n: "6", title: "Rol oyunu", act: "roleplay" }
] as const;
type SectionKey = (typeof SECTIONS)[number]["k"];
const idx = (k: string) => SECTIONS.findIndex((s) => s.k === k);
const stageOf = (k: string) => { const s = SECTIONS[idx(k)]; return s && /\d/.test(s.n) ? Number(s.n) : 4; };

export interface Ctx { s: Scenario; lx: Map<string, Lexeme>; pt: Map<string, Pattern>; prog: ScenarioProgress; setProg: (p: ScenarioProgress) => Promise<void> }

function useScenario(id: string) {
  const { profile } = useApp();
  const persona: Persona = { name: profile.displayName, address: profile.address };
  const [st, setSt] = useState<{ ctx?: Ctx; err?: string }>({});
  const load = () => {
    setSt({});
    Promise.all([loadScenario(id), loadLexicon(), getScenarioProgress(id)])
      .then(([s, l, p]) => {
        const holder: { p: ScenarioProgress } = { p };
        const ctx: Ctx = { s: personalizeDeep(s, persona), lx: new Map(l.lexemes.map((x) => [x.id, x])), pt: new Map(l.patterns.map((x) => [x.id, x])), prog: p, setProg: async (np) => { holder.p = np; await saveScenarioProgress(np); setSt((o) => (o.ctx ? { ctx: { ...o.ctx, prog: np } } : o)); } };
        setSt({ ctx });
      })
      .catch((e) => setSt({ err: String(e.message || e) }));
  };
  useEffect(load, [id]);
  return { ...st, reload: load };
}

/** Öğrenci modeline kayıt (FSRS çift yol) */
export async function rec(itemId: string, kind: "lexeme" | "chunk" | "pattern", path: "passive" | "active", outcome: Outcome, source: "drill" | "tap" | "convo" = "drill") {
  const e = focus(); const s = e?.current;
  const session = s ? sessionKey(s.id, Date.parse(s.startedAt)) : sessionKey("free", Math.floor(Date.now() / 3600_000) * 3600_000);
  await putItem(review(await getItem(itemId), { itemId, kind, path, outcome, session, source }));
}
/** Üretim maddesinin hangi temel ifadeyi çalıştırdığı */
function chunkFor(s: Scenario, text: string): Chunk | undefined {
  const t = norm(text);
  return s.chunks.find((c) => s.essentials.chunks.includes(c.id) && [c.layers.hd, c.layers.alltag].some((x) => x && norm(x.replace(/…/g, "")).length > 3 && t.includes(norm(x.replace(/…/g, "")))));
}
const outcomeOf = (v: Verdict, hinted = false): Outcome => (v.kind === "correct" ? (hinted ? "hinted" : "correct") : "wrong"); // "unchecked": öğrenci "aynı anlamda" demediyse yanlış sayılır (claim → correct)

/* ============================ Senaryo ana sayfası ============================ */
export function PlayerHome({ id }: { id: string }) {
  const { ctx, err, reload } = useScenario(id);
  useEffect(() => { setLearning(false); }, []);
  if (err) return <div class="stack"><ProgressHeader title="Senaryo" back="#/learn" /><div class="card err"><p><b>Senaryo yüklenemedi.</b> {err}</p><button class="btn sm" onClick={reload}>Tekrar dene</button></div></div>;
  if (!ctx) return <div class="stack"><ProgressHeader title="Senaryo" back="#/learn" /><LoadingCard lines={4} /><LoadingCard /></div>;
  const { s, prog } = ctx;
  const unlocked = (i: number) => SECTIONS.slice(0, i).every((x) => prog.done.includes(x.k));
  const next = SECTIONS.find((x, i) => !prog.done.includes(x.k) && unlocked(i));
  const doneIdx = SECTIONS.map((x, i) => (prog.done.includes(x.k) ? i : -1)).filter((i) => i >= 0);
  return (
    <div class="stack">
      <ProgressHeader title={s.title_tr} back={`#/learn/${s.domain}`} step={next ? idx(next.k) : 7} doneSteps={doneIdx} />
      <section class="card hero fade">
        <div class="row between"><span class="chip">{s.level}</span>{s.review.status !== "reviewed" && <span class="chip">deneme dersi</span>}</div>
        <h1 style={{ marginTop: 8 }}>{s.title_tr}</h1>
        <div class="tr2" lang="de">{s.title_de}</div>
        <p class="small" style={{ marginTop: 8 }}>{s.goal_tr}</p>
        <p class="tiny" style={{ marginTop: 6 }}>{prog.done.length ? `${prog.done.length} bölüm tamam · ` : ""}{s.essentials.lexemes.length} kelime · {s.essentials.chunks.length} ifade · {s.essentials.patterns.length} kalıp</p>
      </section>
      <nav aria-label="Bölümler">
        {SECTIONS.map((x, i) => {
          const done = prog.done.includes(x.k), open = unlocked(i), cur = next?.k === x.k;
          const body = (<><span class="num" aria-hidden="true">{done ? <Icon name="check" size={18} /> : x.k === "listening" ? <Icon name="headphones" size={18} /> : x.n}</span><span class="grow"><b>{/\d/.test(x.n) ? `Aşama ${x.n}: ` : ""}{x.title}</b><br /><span class="tiny muted">{done ? "Tamamlandı" : open ? (cur ? "Sıradaki" : "Açık") : "Önceki bölümü bitirince açılır"}</span></span><span aria-hidden="true">{open ? <Icon name="next" size={18} /> : <span class="lockdot" />}</span></>);
          return open ? <a class={`tile${done ? " done" : ""}${cur ? " cur" : ""}`} href={`#/scenario/${encodeURIComponent(s.id)}/${x.k}`} data-section={x.k}>{body}</a> : <div class={`tile lock`} aria-disabled="true" data-section={x.k}>{body}</div>;
        })}
      </nav>
      {s.missions[0] && (
        <section class="card">
          <div class="kicker">Gerçek hayatta dene · dış görev</div>
          <p><b>{s.missions[0].task_tr}</b></p>
          {s.missions[0].escape_de.length > 0 && <><div class="tiny muted">Kaçış cümlelerin:</div>{s.missions[0].escape_de.map((e) => <DeLine de={e} size="md" />)}</>}
        </section>
      )}
      {next && <ActionBar><a class="btn primary block" href={`#/scenario/${encodeURIComponent(s.id)}/${next.k}`} data-test="continue">{prog.done.length ? "Devam et" : "Başla"}: {next.title}</a></ActionBar>}
    </div>
  );
}

/* ============================ Bölüm çerçevesi ============================ */
export function PlayerSection({ id, section }: { id: string; section: string }) {
  const { ctx, err, reload } = useScenario(id);
  const sec = SECTIONS[idx(section)];
  const [sub, setSub] = useState<preact.ComponentChildren>(null);
  useEffect(() => setSub(null), [section]);
  useEffect(() => { if (sec) setLearning(true, sec.act as any, id); return () => setLearning(false); }, [id, section]);
  if (!sec) return <Empty title="Bölüm bulunamadı" action={<a class="btn sm" href={`#/scenario/${encodeURIComponent(id)}`}>Senaryoya dön</a>} />;
  const back = `#/scenario/${encodeURIComponent(id)}`;
  const header = (step: number) => <ProgressHeader sub={sub} title={`${/\d/.test(sec.n) ? `${sec.n}/6 · ` : ""}${sec.title}`} back={back} step={step} doneSteps={ctx ? SECTIONS.map((x, i) => (ctx.prog.done.includes(x.k) ? i : -1)).filter((i) => i >= 0) : []} />;
  if (err) return <div class="stack">{header(idx(section))}<div class="card err"><p><b>Yüklenemedi.</b> {err}</p><button class="btn sm" onClick={reload}>Tekrar dene</button></div></div>;
  if (!ctx) return <div class="stack">{header(idx(section))}<LoadingCard lines={4} /></div>;
  const finish = async (score: number, total: number, extra: Partial<ScenarioProgress["runs"][number]> = {}, mut?: (p: ScenarioProgress) => void) => {
    const p = structuredClone(ctx.prog);
    mut?.(p); // aynı kayıtta ek değişiklik (ör. destek düzeyi) — ayrı yazım eski durumu ezmesin
    const ratio = total ? score / total : 1;
    p.runs.push({ at: new Date().toISOString(), section: sec.k, score, total, ...extra });
    const production = ["build", "drills", "dialogue"].includes(sec.k);
    if (ratio >= 0.7 || !production) { if (!p.done.includes(sec.k)) p.done.push(sec.k); }
    else if (ratio < 0.5 && production) {
      // geri dönüş: bir önceki aşama yeniden açılır
      const prev = SECTIONS[idx(sec.k) - 1]; if (prev) p.done = p.done.filter((d) => d !== prev.k);
    }
    if (sec.k === "roleplay" && ratio >= 0.6) p.completedIndependentAt = new Date().toISOString();
    await ctx.setProg(p);
  };
  const props = { ctx, finish, back, setSub };
  return (
    <div class="stack">
      {header(idx(section))}
      {sec.k === "words" && <HearSection {...props} setSub={setSub} />}
      {sec.k === "chunks" && <LearnSection {...props} setSub={setSub} />}
      {sec.k === "build" && <BuildSection {...props} />}
      {sec.k === "drills" && <DrillsSection {...props} />}
      {sec.k === "listening" && <ListeningSection {...props} />}
      {sec.k === "dialogue" && <DialogueSection {...props} />}
      {sec.k === "roleplay" && <RoleplaySection {...props} />}
    </div>
  );
}
export type SP = { ctx: Ctx; finish: (score: number, total: number, extra?: Partial<ScenarioProgress["runs"][number]>, mut?: (p: ScenarioProgress) => void) => Promise<void>; back: string; setSub?: (n: preact.ComponentChildren) => void };

export function Done({ score, total, back, ctx, title, note, plain, production }: { score: number; total: number; back: string; ctx: Ctx; title: string; note?: string; plain?: string; production?: boolean }) {
  // PM-035 §5: tanıma aşamasında puan/oran yok; yalnızca ne öğrenileceği
  const ratio = plain ? 1 : total ? score / total : 1;
  useEffect(() => { haptic(ratio >= 0.7 ? "success" : "error"); }, []);
  return (
    <div class="stack fade" data-test="section-done">
      <section class={`card ${ratio >= 0.7 ? "hero" : ""}`}>
        <div class="kicker">{title}</div>
        {plain ? <p class="big" style={{ fontSize: "1.4rem" }}>{plain}</p> : <div class="big">{score}/{total}</div>}
        <p class="small">{plain ? "Şimdi bunları tek tek öğreneceğiz." : ratio >= 0.7 ? "Bu bölüm tamam. Bir sonraki açıldı." : ratio >= 0.5 ? "Biraz daha pratik iyi olur; bu bölümü bir kez daha yapmanı öneririm." : production ? "Bir önceki aşamayı yeniden açtım. Önce orayı tekrar etmek iyi olur, acele yok." : "Bu bölümü bir kez daha yapmak iyi olur, acele yok."}</p>
        {note && <p class="tiny">{note}</p>}
      </section>
      <ActionBar><a class="btn primary block" href={back} data-test="back-to-scenario">Senaryoya dön</a></ActionBar>
    </div>
  );
}

/** Basit sıra yöneticisi */
function useRun<T>(items: T[]) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  return { i, item: items[i], total: items.length, score, next: (ok: boolean) => { if (ok) setScore((x) => x + 1); setI((x) => x + 1); }, done: i >= items.length };
}

/* ============================ Üretim maddesi (3–4–5 ortak) ============================ */
function ProduceItem({ ctx, prompt, accepted, itemId, onDone, audio, audioSpeed, chips, hint, given, strictNumbers }: { ctx: Ctx; prompt: preact.ComponentChildren; accepted: string[]; itemId: string; onDone: (ok: boolean) => void; audio?: string; audioSpeed?: Speed; chips?: boolean; hint?: string; given?: string; strictNumbers?: boolean }) {
  const grade0 = useGrader();
  // PM-032 §4: bu senaryoda öğretilmiş eşdeğer biçimler (Hochdeutsch ↔ Alltag) otomatik kabul — ama yönerge belirli bir
  // biçim istiyorsa ya da madde bir dönüşümse genişletme yok; verilen cümlenin tekrarı doğru değil (inceleme #49 P1-1)
  const register = !!given || REGISTER_HINT.test(hint || (typeof prompt === "string" ? prompt : ""));
  // PM-045 §4.2 / #58 A11: sayı maddesinde rakam kabul edilmez (norm() rakamı yazıya çevirdiği için kurallardan önce)
  // yalnızca yazılan cevapta: konuşma tanıma sayıyı rakamla döker (inceleme #59 P1-3)
  const numHint = (acc: string[], a: string, typed: boolean) => (typed && strictNumbers && acc.every((x) => !/\d/.test(x)) ? numberWordHint(a) : null);
  const grade = async (acc: string[], a: string, p: string, typed = true): Promise<Verdict> =>
    numHint(acc, a, typed) ? { kind: "wrong", best: acc[0] || "", note: numHint(acc, a, typed)! }
    : isSameAsGiven(given, a) ? { kind: "wrong", best: acc[0] || "", note: "Verilen cümleyi tekrarladın; istenen biçimde söyle." }
      : grade0(register ? acc : expandTaught(acc, ctx.s.chunks), a, p);
  const [v, setV] = useState<{ v: Verdict; a: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"type" | "chips">(chips ? "chips" : "type");
  const promptTxt = typeof prompt === "string" ? prompt : accepted[0]!;
  const submit = async (a: string, typed = true) => {
    setBusy(true);
    const res = await grade(accepted, a, promptTxt, typed);
    setBusy(false); setV({ v: res, a }); setClaimed(false);
  };
  const [claimed, setClaimed] = useState(false);
  // "Benim cevabım da doğru": doğru sayılır (puan + öğrenci modeli); kayıt içerik kuyruğuna da gider
  const next = () => {
    const ok = countsAsCorrect(v!.v.kind, claimed);
    const ch = chunkFor(ctx.s, accepted[0]!);
    if (ch) void rec(ch.id, "chunk", "active", claimed ? "correct" : outcomeOf(v!.v));
    setV(null); onDone(ok);
  };
  return (
    <div class="stack fade">
      <section class="card stack">{prompt}{audio && <div class="row"><ListenButton text={audio} speed={audioSpeed} /></div>}</section>
      {!v && (
        <>
          {accepted[0]!.split(" ").length > 2 && <div class="seg" role="group" aria-label="Cevap biçimi"><button aria-pressed={mode === "type"} onClick={() => setMode("type")}>Yaz / söyle</button><button aria-pressed={mode === "chips"} onClick={() => setMode("chips")}>Kelimelerle kur</button></div>}
          {mode === "type" ? <ActionBar><AnswerField onSubmit={(t, m) => void submit(t, m === "typed")} disabled={busy} /></ActionBar> : <ChipBuilder target={accepted[0]!} onSubmit={(t) => void submit(t)} />}
          {busy && <p class="small muted" aria-live="polite">Öğretmen kontrol ediyor…</p>}
        </>
      )}
      {v && <VerdictView v={v.v} answer={v.a} itemId={itemId} scenarioId={ctx.s.id} prompt={promptTxt} accepted={accepted} onClaim={() => setClaimed(true)} onNext={next} />}
    </div>
  );
}

const START = /^(ich|du|er|sie|es|wir|ihr|wie|wo|was|wann|wer|warum|der|die|das|ein|eine|kann|können|könnten|haben|hast|hat|ist|bist|sind|gibt|geht|ja|nein|bitte|dann|also|und|aber|am|um|seit|mir|mein|meine)$/i;
function ChipBuilder({ target, onSubmit }: { target: string; onSubmit: (s: string) => void }) {
  const chips = useMemo(() => {
    const t = target.split(/\s+/).map((w) => w.replace(/[.,!?;:„“"]/g, "")).filter(Boolean);
    if (t[0] && START.test(t[0])) t[0] = t[0].toLowerCase();
    let h = 0; for (const c of target) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const a = t.map((w, i) => ({ w, k: ((h ^ (i * 2654435761)) >>> 0) % 997 })).sort((x, y) => x.k - y.k);
    return a.map((x) => x.w);
  }, [target]);
  const [sel, setSel] = useState<number[]>([]);
  return (
    <div class="stack">
      <div class="slot" aria-label="Kurduğun cümle" lang="de">{sel.map((k, p) => <button class="wchip" onClick={() => setSel(sel.filter((_, j) => j !== p))}>{chips[k]}</button>)}</div>
      <div class="row" lang="de">{chips.map((c, k) => <button class={`wchip${sel.includes(k) ? " used" : ""}`} disabled={sel.includes(k)} data-chip={c} onClick={() => { haptic("selection"); setSel([...sel, k]); }}>{c}</button>)}</div>
      <button class="btn primary block" disabled={sel.length !== chips.length} onClick={() => onSubmit(sel.map((k) => chips[k]).join(" "))} data-test="submit">Kontrol et</button>
    </div>
  );
}

/* ============================ 3 Cümle kurma ============================ */
const Count = ({ i, n }: { i: number; n: number }) => <span class="tiny" data-test="item-count">{Math.min(i + 1, n)}/{n}</span>;
function BuildSection({ ctx, finish, back, setSub }: SP) {
  const r = useRun(ctx.s.build);
  useEffect(() => { setSub?.(<Count i={r.i} n={r.total} />); }, [r.i]);
  useEffect(() => { if (r.done && r.total) void finish(r.score, r.total); }, [r.done]);
  if (!r.total) return <Empty title="Bu senaryoda cümle kurma maddesi yok" />;
  if (r.done) return <Done score={r.score} total={r.total} back={back} ctx={ctx} title="Aşama 3 · Cümle kurma" production />;
  const b = r.item!;
  const p = b.pattern ? ctx.pt.get(b.pattern) : undefined;
  return (
    <div class="stack" key={b.id}>
      <ProduceItem ctx={ctx} itemId={b.id} accepted={b.accepted} hint={b.prompt_tr} chips={r.i % 3 === 0 && !b.accepted[0]!.includes("{name}")}
        prompt={<><div class="kicker">Almanca kur · {r.i + 1}/{r.total}</div><div class="de-lg">{b.prompt_tr}</div>{p?.frame_tr && <div class="tiny muted">Kalıp: <Rich text={p.frame_tr} /></div>}</>}
        onDone={(ok) => { if (p) void rec(p.id, "pattern", "active", ok ? "correct" : "wrong"); r.next(ok); }} />
    </div>
  );
}

/* ============================ 4 Alıştırma ============================ */
function DrillsSection({ ctx, finish, back, setSub }: SP) {
  const r = useRun(ctx.s.drills);
  useEffect(() => { setSub?.(<Count i={r.i} n={r.total} />); }, [r.i]);
  useEffect(() => { if (r.done && r.total) void finish(r.score, r.total); }, [r.done]);
  if (!r.total) return <Empty title="Bu senaryoda alıştırma yok" />;
  if (r.done) return <Done score={r.score} total={r.total} back={back} ctx={ctx} title="Aşama 4 · Alıştırma" production />;
  const d = r.item!;
  return (
    <div class="stack" key={d.id}>
      <DrillView ctx={ctx} d={d} n={r.i + 1} total={r.total} onDone={r.next} />
    </div>
  );
}
function DrillView({ ctx, d, n, total, onDone }: { ctx: Ctx; d: Drill; n: number; total: number; onDone: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const k = `${n}/${total}`;
  switch (d.k) {
    case "pick":
      return (
        <div class="stack fade">
          <section class="card"><div class="kicker">Seç · {k}</div><div class="de-lg">{d.q_tr}</div></section>
          <div role="group" lang="de">{d.opts.map((o, i) => <button class={`opt${picked === null ? "" : i === d.ans ? " right" : i === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={i} onClick={() => { setPicked(i); haptic(i === d.ans ? "success" : "error"); }}>{o}</button>)}</div>
          {picked !== null && <>{d.why_tr && <FeedbackBand kind={picked === d.ans ? "ok" : "bad"} title={picked === d.ans ? "Doğru" : "Doğrusu işaretli"}><Rich text={d.why_tr} /></FeedbackBand>}<ActionBar><button class="btn primary block" onClick={() => { const ok = picked === d.ans; setPicked(null); onDone(ok); }} data-test="next">Devam</button></ActionBar></>}
        </div>
      );
    case "gap":
      return <ProduceItem ctx={ctx} itemId={d.id} accepted={d.accepted.map((a) => d.de.replace("___", a))} prompt={<><div class="kicker">Boşluğu doldur · {k}</div><div class="de-lg" lang="de">{d.de.split("___").map((part, j) => <>{j > 0 && <span class="gapblank" aria-label="boşluk" />}{part}</>)}</div><div class="tr2">{d.tr}</div><div class="tiny muted">Bütün cümleyi yaz.</div></>} strictNumbers={d.strictNumberWords} onDone={onDone} />;
    case "order":
      return <ProduceItem ctx={ctx} itemId={d.id} accepted={d.accepted.length ? d.accepted : [d.de]} chips prompt={<><div class="kicker">Sıraya koy · {k}</div><div class="de-lg">{d.tr}</div></>} strictNumbers={d.strictNumberWords} onDone={onDone} />;
    case "transform":
      return <ProduceItem ctx={ctx} itemId={d.id} accepted={d.accepted} given={d.from_de} hint={d.instr_tr} prompt={<><div class="kicker">Dönüştür · {k}</div><div class="small"><Rich text={d.instr_tr} /></div><div class="de-lg" lang="de">{d.from_de}</div></>} strictNumbers={d.strictNumberWords} onDone={onDone} />;
    case "guided_response":
      return <ProduceItem ctx={ctx} itemId={d.id} accepted={d.accepted} audio={d.prompt_de} hint={d.situation_tr} prompt={<><div class="kicker">Cevap ver · {k}</div><div class="small"><Rich text={d.situation_tr} /></div><div class="de-lg" lang="de">„{d.prompt_de}“</div></>} strictNumbers={d.strictNumberWords} onDone={onDone} />;
    case "listen_and_respond":
      return <ProduceItem ctx={ctx} itemId={d.id} accepted={d.accepted} audio={d.audio_de} audioSpeed={d.speed} hint={d.situation_tr} prompt={<><div class="kicker">Dinle ve cevap ver · {k}</div>{d.situation_tr && <div class="small"><Rich text={d.situation_tr} /></div>}<div class="tiny muted">Metin gösterilmiyor: yalnızca dinle.</div></>} strictNumbers={d.strictNumberWords} onDone={onDone} />;
    case "tr_de":
      return <ProduceItem ctx={ctx} itemId={d.id} accepted={d.accepted} hint={d.tr} prompt={<><div class="kicker">Almanca söyle · {k}</div><div class="de-lg">{d.tr}</div></>} strictNumbers={d.strictNumberWords} onDone={onDone} />;
  }
}

/* ============================ Dinleme (altyazısız → sorular → transkript) ============================ */
function ListeningSection({ ctx, finish, back, setSub }: SP) {
  const s = ctx.s;
  type Step = { t: "os"; o: Scenario["otherSide"][number]; opts: string[]; ans: number } | { t: "item"; li: Scenario["listening"][number] };
  const steps: Step[] = useMemo(() => {
    const os = s.otherSide.map((o, k) => {
      const others = s.otherSide.filter((x) => x !== o).map((x) => x.tr);
      const opts = [o.tr, others[(k * 2) % others.length]!, others[(k * 2 + 5) % others.length]!].filter((x, j, a) => !!x && a.indexOf(x) === j);
      const rot = k % opts.length; const sh = [...opts.slice(rot), ...opts.slice(0, rot)];
      return { t: "os" as const, o, opts: sh, ans: sh.indexOf(o.tr) };
    });
    return [...os, ...s.listening.map((li) => ({ t: "item" as const, li }))];
  }, [s.id]);
  const [i, setI] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { if (i >= steps.length && steps.length) void finish(score, total); }, [i]);
  if (!steps.length) return <Empty title="Bu senaryoda dinleme yok" />;
  if (i >= steps.length) return <Done score={score} total={total} back={back} ctx={ctx} title="Dinleme" note="İlk dinlemede anlama oranı İlerlemem'de hıza göre izlenir." />;
  const st = steps[i]!;
  useEffect(() => { setSub?.(<Count i={i} n={steps.length} />); }, [i]);
  const progress = null;
  if (st.t === "os") {
    const o = st.o;
    return (
      <div class="stack fade" key={`o${i}`}>
        {progress}
        <section class="card stack"><div class="kicker">Karşı taraf ne dedi? · altyazısız</div>
          <div class="row"><ListenButton text={o.de} speed={o.speed} /><span class={`badge ${o.layer}`}>{o.layer === "alltag" ? "Alltag" : o.layer === "bair" ? "Bairisch" : "Hochdeutsch"}</span><span class="tiny muted">{o.speed === "fast" ? "hızlı" : o.speed === "natural" ? "doğal hız" : o.speed === "slow" ? "yavaş" : "normal"}</span></div>
          {picked !== null && <><div class="de-lg" lang="de">{o.de}</div>{o.reductions?.map((r) => <div class="small"><span class="badge alltag">yutulan</span> <b lang="de">{r.heard}</b> = <span lang="de">{r.full}</span></div>)}</>}
        </section>
        <div role="group">{st.opts.map((x, k) => <button class={`opt${picked === null ? "" : k === st.ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k}
          onClick={() => { setPicked(k); const ok = k === st.ans; haptic(ok ? "success" : "error"); setTotal(total + 1); if (ok) setScore(score + 1); }}>{x}</button>)}</div>
        {picked !== null && <ActionBar><button class="btn primary block" onClick={() => { setPicked(null); setI(i + 1); }} data-test="next">Devam</button></ActionBar>}
      </div>
    );
  }
  return <ListeningItem key={`l${i}`} li={st.li} progress={progress} onDone={(ok, n) => { setScore(score + ok); setTotal(total + n); setI(i + 1); }} />;
}
const SPEED_TR: Record<Speed, string> = { slow: "Yavaş", normal: "Normal", natural: "Doğal hız", fast: "Hızlı" };
function ListeningItem({ li, progress, onDone }: { li: Scenario["listening"][number]; progress: preact.ComponentChildren; onDone: (ok: number, n: number) => void }) {
  const [phase, setPhase] = useState<"listen" | "qs" | "script">("listen");
  const [q, setQ] = useState(0); const [ok, setOk] = useState(0); const [picked, setPicked] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const playAll = async (sp: Speed) => { setPlaying(true); try { await speakDizi(li.script.map((l) => ({ de: l.de })), sp, 250); } finally { setPlaying(false); } };
  useEffect(() => () => stopSpeaking(), []);
  if (phase === "listen") return (
    <div class="stack fade">{progress}
      <section class="card stack"><div class="kicker">Dinle · {li.title_tr}</div><p class="small">Önce metni görmeden dinle. İstediğin kadar tekrar dinleyebilirsin.</p>
        <div class="row"><button class="btn primary" onClick={() => playAll(li.speed)} disabled={playing} data-test="play-all">{playing ? "Çalıyor…" : <><Icon name="play" size={18} /> Dinle</>}</button>
          {li.speeds.filter((x) => x !== li.speed).map((sp) => <button class="btn" onClick={() => playAll(sp)} disabled={playing} data-speed={sp}>{SPEED_TR[sp]}</button>)}</div>
        <p class="tiny muted">Cihaz sesi · {li.speed === "fast" ? "hızlı" : li.speed === "natural" ? "doğal hız" : li.speed === "slow" ? "yavaş" : baslangicYavas() ? "normal (ilk dinleme yavaş; Profil)" : "normal"}</p></section>
      <ActionBar><button class="btn primary block" onClick={() => { stopSpeaking(); setPhase("qs"); }} data-test="to-questions">Sorulara geç</button></ActionBar>
    </div>
  );
  if (phase === "qs") {
    const qq = li.qs[q]!;
    return (
      <div class="stack fade" key={`q${q}`}>{progress}
        <section class="card"><div class="kicker">{qq.kind === "gist" ? "Ana fikir" : "Ayrıntı"} · {q + 1}/{li.qs.length}</div><div class="de-lg">{qq.q_tr}</div><button class="btn sm ghost" onClick={() => playAll(li.speed)}><Icon name="volume" size={18} /> Bir daha dinle</button></section>
        <div role="group">{qq.opts.map((o, k) => <button class={`opt${picked === null ? "" : k === qq.ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k} onClick={() => { setPicked(k); haptic(k === qq.ans ? "success" : "error"); if (k === qq.ans) setOk(ok + 1); }}>{o}</button>)}</div>
        {picked !== null && <ActionBar><button class="btn primary block" onClick={() => { setPicked(null); if (q + 1 < li.qs.length) setQ(q + 1); else setPhase("script"); }} data-test="next">Devam</button></ActionBar>}
      </div>
    );
  }
  return (
    <div class="stack fade">{progress}
      <section class="card stack"><div class="kicker">Transkript · bilmediğin kelimeye dokun → listene eklenir</div>
        {li.script.map((l) => <div><div class="tiny muted">{l.r}</div><TapLine de={l.de} /><div class="row" style={{ marginTop: 4 }}><ListenButton text={l.de} speed={li.speed} /><ShadowBtn de={l.de} /></div>{l.tr && <div class="tr2">{l.tr}</div>}</div>)}
      </section>
      <ActionBar><button class="btn primary block" onClick={() => onDone(ok, li.qs.length)} data-test="next">Devam</button></ActionBar>
    </div>
  );
}
/** Kelimeye dokun → kişisel listeye (pasif eksik, puan düşmez) */
function TapLine({ de }: { de: string }) {
  const { toast } = useApp();
  return <div class="de-lg" lang="de">{de.split(/(\s+)/).map((w) => /\s/.test(w) ? w : <span role="button" tabIndex={0} style={{ cursor: "pointer" }} onClick={async () => { const clean = w.replace(/[.,!?;:„“"]/g, ""); await addPersonal({ id: `tap:${clean}`, de: clean, at: new Date().toISOString(), source: "tap" }); haptic("selection"); toast(`„${clean}“ listene eklendi`); }}>{w}</span>)}</div>;
}
/** Shadowing: dinle → söyle → kelime kelime karşılaştır */
function ShadowBtn({ de, label }: { de: string; label?: boolean }) {
  const [res, setRes] = useState<number | null>(null);
  return <span class="row">{label && <span class="small muted">Sesli tekrar et</span>}<AnswerMini onText={(t) => setRes(Math.round(scoreHeard(de, t).score * 100))} />{res !== null && <span class={`chip ${res >= 80 ? "ok" : "warn"}`}>%{res}</span>}</span>;
}
/** Büyük yuvarlak ses düğmesi + yavaş (v1 kelime kartı) */
function BigPlay({ text }: { text: string }) {
  const [busy, setBusy] = useState(false);
  const play = async (sp: Speed) => { if (busy) { stopSpeaking(); setBusy(false); return; } setBusy(true); try { await speak(text, "de", sp); } finally { setBusy(false); } };
  return <div class="bigplay"><button onClick={() => play("normal")} aria-label={`Dinle: ${text}`} data-test="listen">{busy ? <Icon name="stop" size={26} /> : <Icon name="volume" size={28} />}</button><button class="spd" onClick={() => play("slow")} aria-label={`Yavaş dinle: ${text}`}>Yavaş</button></div>;
}
function AnswerMini({ onText }: { onText: (t: string) => void }) {
  return <MicButton onText={onText} />;
}

/* ============================ 5 Destekli diyalog ============================ */
function DialogueSection({ ctx, finish, back }: SP) {
  const s = ctx.s;
  const [variant, setVariant] = useState(0);
  const [support, setSupport] = useState<0 | 1 | 2 | 3>(ctx.prog.support);
  const [li, setLi] = useState(0);
  const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [v, setV] = useState<{ v: Verdict; a: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const grade = useGrader();
  const [claimedD, setClaimedD] = useState(false);
  const d = s.dialogues[variant];
  useEffect(() => { const l = d?.lines[li]; if (l && l.r === "A") void speak(l.de, "de", l.speed || "normal"); }, [variant, li]);
  if (!d) return <Empty title="Bu senaryoda diyalog yok" />;
  if (li >= d.lines.length) {
    const ratio = total ? score / total : 1;
    return <DialogueDone score={score} total={total} back={back} ctx={ctx} onFinish={async () => {
      await finish(score, total, { level: support }, (p) => { if (ratio >= 0.8 && p.support > 0) p.support = (p.support - 1) as 0 | 1 | 2 | 3; });
    }} />;
  }
  const line = d.lines[li]!;
  const shown = d.lines.slice(0, li);
  return (
    <div class="stack">
      {li === 0 && !total && (
        <section class="card stack">
          <div class="kicker">Diyalog çeşidi · karşı taraf her birinde farklı tepki verir</div>
          <div class="seg" role="group">{s.dialogues.map((x, k) => <button aria-pressed={variant === k} onClick={() => setVariant(k)}>{k + 1}</button>)}</div>
          <div class="kicker" style={{ marginTop: 8 }}>Destek düzeyi</div>
          <div class="seg" role="group" aria-label="Destek düzeyi">{([3, 2, 1, 0] as const).map((n) => <button aria-pressed={support === n} onClick={() => setSupport(n)}>{n === 3 ? "Cümle başı" : n === 2 ? "Kelimeler" : n === 1 ? "Türkçe ipucu" : "Desteksiz"}</button>)}</div>
        </section>
      )}
      <div class="chat" aria-live="polite">
        {shown.map((l) => <div class={`bubble ${l.r === "A" ? "them" : "me"}`}><div class="who">{l.r === "A" ? d.roles.A : `${d.roles.B} (sen)`}</div><div class="dline"><div class="grow"><div lang="de">{l.de}</div>{support >= 1 && <div class="tr2">{l.tr}</div>}</div>{l.r === "A" && <ListenButton text={l.de} speed={l.speed} small slowToggle={false} />}</div></div>)}
        {line.r === "A" && <div class="bubble them fade"><div class="who">{d.roles.A}</div><DeLine de={line.de} tr={support >= 1 ? line.tr : undefined} size="md" speed={line.speed} /><ExplainBtn de={line.de} /></div>}
        <ChatEnd dep={li} />
      </div>
      {line.r === "A" && <ActionBar><button class="btn primary block" onClick={() => setLi(li + 1)} data-test="next">Cevap ver</button></ActionBar>}
      {line.r === "B" && !v && (
        <section class="card stack fade" data-test="your-turn">
          <div class="kicker">Sıra sende · {d.roles.B}</div>
          {support >= 1 && line.hint_tr && <div class="support"><Rich text={line.hint_tr} /></div>}
          {support >= 2 && line.keywords && <div class="row" lang="de">{line.keywords.map((k) => <span class="chip">{k}</span>)}</div>}
          {support >= 3 && line.starter && <div class="de" lang="de">{line.starter}</div>}
          <SayItBox entries={entriesOf(ctx)} level={s.level} context_de={line.de} />
          <ActionBar><AnswerField onSubmit={async (a) => {
            setBusy(true); const res = await grade(line.accepted?.length ? line.accepted : [line.de], a, line.tr); setBusy(false);
            setV({ v: res, a }); setTotal(total + 1); if (countsAsCorrect(res.kind, false)) setScore(score + 1);
          }} disabled={busy} submitLabel="Söyle" /></ActionBar>
        </section>
      )}
      {line.r === "B" && v && <VerdictView v={v.v} answer={v.a} itemId={`${d.id}:${li}`} scenarioId={s.id} prompt={line.tr} accepted={line.accepted?.length ? line.accepted : [line.de]}
        onClaim={() => { if (!countsAsCorrect(v.v.kind, false)) setScore(score + 1); setClaimedD(true); }}
        onNext={() => { const ch = chunkFor(s, line.de); if (ch) void rec(ch.id, "chunk", "active", claimedD ? "correct" : outcomeOf(v.v, support >= 2)); setClaimedD(false); setV(null); setLi(li + 1); }} nextLabel="Devam" />}
    </div>
  );
}
function DialogueDone({ score, total, back, ctx, onFinish }: { score: number; total: number; back: string; ctx: Ctx; onFinish: () => Promise<void> }) {
  useEffect(() => { void onFinish(); }, []);
  return <Done score={score} total={total} back={back} ctx={ctx} title="Aşama 5 · Destekli diyalog" production note={score / Math.max(1, total) >= 0.8 ? "Bir dahaki sefere daha az destekle deneyeceğiz." : undefined} />;
}
function entriesOf(ctx: Ctx): LocalEntry[] {
  const out: LocalEntry[] = [];
  for (const c of ctx.s.chunks) out.push({ de: c.layers.hd, tr: c.tr, kind: "chunk", id: c.id });
  for (const id of [...ctx.s.essentials.lexemes, ...ctx.s.extras.lexemes]) { const l = ctx.lx.get(id); if (l) out.push({ de: (l.art ? l.art + " " : "") + l.de, tr: l.tr, kind: "lexeme", id }); }
  for (const b of ctx.s.build) out.push({ de: b.accepted[0]!, tr: b.prompt_tr, kind: "example" });
  return out;
}

/** Sohbette son satır görünür kalsın (kısa ve hareketsiz kaydırma; azaltılmış hareket ayarına uyar) */
function ChatEnd({ dep }: { dep: number }) {
  useEffect(() => { const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; window.scrollTo({ top: document.documentElement.scrollHeight, behavior: reduce ? "auto" : "smooth" }); }, [dep]);
  return null;
}

/* ============================ 6 Rol oyunu ============================ */
const NON_GERMAN = /\b(the|and|you|please|sorry|yes|what|i'm|can|evet|hayır|lütfen|tamam|anlamadım|ne)\b/i;
type Turn = { r: "partner" | "learner"; de: string };
function RoleplaySection({ ctx, finish, back }: SP) {
  const { api, profile } = useApp();
  const persona: Persona = { name: profile.displayName, address: profile.address };
  const s = ctx.s;
  const runs = ctx.prog.runs.filter((x) => x.section === "roleplay").length;
  const [level, setLevel] = useState<1 | 2 | 3>(Math.min(3, 1 + Math.floor(runs / 2)) as 1 | 2 | 3);
  const [mode, setMode] = useState<"ai" | "offline">(aiState(api).available ? "ai" : "offline");
  const [phase, setPhase] = useState<"intro" | "talk" | "report">("intro");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [stuck, setStuck] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [selfGoals, setSelfGoals] = useState<Record<string, boolean>>({});
  const surprise = useMemo(() => (level >= 2 && s.roleplay.surprises.length ? s.roleplay.surprises[runs % s.roleplay.surprises.length]!.de : undefined), [level]);
  const lv = s.roleplay.levels.find((x) => x.level === level);
  const offIdx = useMemo(() => offlineDialogueIndex(s), [s]);
  const offLines = (s.dialogues[offIdx]?.lines || []).filter((l) => l.r === "A");
  const say = (de: string) => void speak(de, "de", lv?.speed || (level === 3 ? "fast" : level === 2 ? "natural" : "slow"));

  // Yumuşak bekleme (DECISIONS D-RP1): 12 sn'de yanıt yoksa seçenekler çıkar; istek kesilmez, gelirse kullanılır.
  const modeRef = useRef(mode); modeRef.current = mode;
  const phaseRef = useRef<"intro" | "talk" | "report">("intro");
  const reportRef = useRef(false);
  const reportDoneRef = useRef(false);
  const offRef = useRef(0);
  const pendingRef = useRef<number | null>(null);   // yanıt beklenen tur (geçmiş uzunluğu)
  const inflightRef = useRef(0);
  const [slow, setSlow] = useState<null | "turn" | "report">(null);
  const [waiting, setWaiting] = useState(false);     // "Bekle" seçildi: seçenekler gizli, bekleniyor
  const histRef = useRef<Turn[]>([]); const stuckRef = useRef(0);
  const nextOffline = (hist: Turn[]) => {
    // tekrar/yavaşlatma isteği: aynı satır yavaş söylenir (strateji işe yarar)
    const lastMe = [...hist].reverse().find((t) => t.r === "learner")?.de || "";
    const lastPartner = [...hist].reverse().find((t) => t.r === "partner")?.de;
    if (lastPartner && isRepeatRequest(lastMe)) { const nt = [...hist, { r: "partner" as const, de: lastPartner }]; setTurns(nt); histRef.current = nt; void speak(lastPartner, "de", "slow"); return; }
    const nx = offLines[offRef.current];
    if (!nx) { void endTalk(hist); return; }
    offRef.current++; const nt = [...hist, { r: "partner" as const, de: nx.de }]; setTurns(nt); histRef.current = nt; say(nx.de);
  };
  const start = () => { const first = mode === "ai" ? s.roleplay.opener_de : offLines[0]?.de || s.roleplay.opener_de; setTurns([{ r: "partner", de: first }]); histRef.current = [{ r: "partner", de: first }]; offRef.current = 1; phaseRef.current = "talk"; reportRef.current = false; setPhase("talk"); say(first); };
  const partnerTurn = async (hist: Turn[], st: number) => {
    histRef.current = hist; stuckRef.current = st;
    if (modeRef.current === "offline") { nextOffline(hist); return; }
    const turn = hist.length; pendingRef.current = turn; inflightRef.current++;
    setBusy(true); setErr(null); setSlow(null); setWaiting(false);
    const timer = window.setTimeout(() => { if (pendingRef.current === turn) setSlow("turn"); }, SOFT_WAIT_MS);
    try {
      const o = await ai(api, "roleplay_turn", { partner_de: s.roleplay.partner_de, scene_tr: s.roleplay.scene_tr, goals_de: s.roleplay.goals.map((g) => g.de), level, style_de: lv?.style_de, surprise_de: surprise, history: hist.slice(-30).map((h) => ({ r: h.r, de: redact(h.de, persona) })), stuck: st, address_de: profile.address });
      if (pendingRef.current !== turn || (modeRef.current as string) === "offline" || phaseRef.current !== "talk") return; // eski tur ya da öğrenci yapay zekâsız devam etti
      pendingRef.current = null; setSlow(null); setWaiting(false);
      const reply = unredact(o.reply_de, persona);
      const nt = [...hist, { r: "partner" as const, de: reply }]; setTurns(nt); histRef.current = nt; say(reply);
      if (o.end) setTimeout(() => void endTalk(nt), 600);
    } catch (e) {
      if (pendingRef.current === turn && inflightRef.current <= 1) { pendingRef.current = null; setSlow(null); setWaiting(false); setErr(e instanceof ApiError ? e.message_tr : "Yanıt alınamadı."); }
    } finally { clearTimeout(timer); inflightRef.current--; if (pendingRef.current === null || inflightRef.current === 0) setBusy(pendingRef.current !== null && inflightRef.current > 0); }
  };
  const goOffline = () => { setMode("offline"); modeRef.current = "offline"; pendingRef.current = null; setSlow(null); setWaiting(false); setErr(null); setBusy(false); nextOffline(histRef.current); };
  const send = async (a: string) => {
    const nonDe = NON_GERMAN.test(a) && !/[äöüß]|\b(ich|bitte|ja|nein|danke)\b/i.test(a);
    const st = a.trim().split(/\s+/).length <= 1 || nonDe ? stuck + 1 : 0; setStuck(st);
    const hist = [...turns, { r: "learner" as const, de: a }]; setTurns(hist);
    await partnerTurn(hist, st);
  };
  const endTalk = async (t: Turn[] = turns) => {
    if (reportRef.current) return;           // rapor isteği tek
    pendingRef.current = null;               // bekleyen tur: geç gelirse yok sayılır
    phaseRef.current = "report";
    stopSpeaking(); setPhase("report"); setSlow(null); setWaiting(false); setBusy(false);
    if (modeRef.current === "ai" && t.some((x) => x.r === "learner")) {
      reportRef.current = true;
      setBusy(true); setErr(null); setSlow(null); setWaiting(false);
      const timer = window.setTimeout(() => setSlow("report"), SOFT_WAIT_MS);
      try {
        const f = await ai(api, "feedback_tr", { scene_tr: s.roleplay.scene_tr, goals: s.roleplay.goals.map((g) => ({ id: g.id, de: g.de })), transcript: t.slice(-60).map((h) => ({ r: h.r, de: redact(h.de, persona) })) });
        if (reportDoneRef.current) return;   // "Tekrar dene" ile iki istek: önce gelen kullanılır
        reportDoneRef.current = true;
        setReport(f);
        for (const g of f.gaps_de) await addPersonal({ id: `convo:${g}`, de: g, at: new Date().toISOString(), source: "sayit" });
        const done = f.goals.filter((x) => x.done).length;
        await finish(done, s.roleplay.goals.length, { level, goalsDone: done, goalsTotal: s.roleplay.goals.length, englishFallbacks: f.english_fallbacks, mode: "ai" });
      } catch (e) { if (reportDoneRef.current) return; reportRef.current = false; setErr(e instanceof ApiError ? e.message_tr : "Rapor alınamadı."); }
      finally { clearTimeout(timer); setBusy(false); setSlow(null); setWaiting(false); }
    }
  };

  if (phase === "intro") return (
    <div class="stack fade">
      <section class="card stack">
        <div class="kicker">Rol oyunu · bağımsız konuşma</div>
        <p><b>{s.roleplay.scene_tr}</b></p>
        <div class="small">Görevin:</div>
        <ul class="small" style={{ margin: 0, paddingLeft: 20 }}>{s.roleplay.goals.map((g) => <li>{g.tr}</li>)}</ul>
        <p class="tiny muted">Konuşma sırasında düzeltme yok; sonunda Türkçe rapor alırsın. "Bu ne demek?" ve "Almanca nasıl derim?" puan düşürmez.</p>
        <div class="kicker">Zorluk</div>
        <div class="seg" role="group">{([1, 2, 3] as const).map((n) => <button aria-pressed={level === n} onClick={() => setLevel(n)}>{n === 1 ? "Kolay" : n === 2 ? "Normal" : "Gerçekçi"}</button>)}</div>
        {mode === "offline" && <FeedbackBand kind="info" title="Karşındaki kişi dersin hazır cümleleriyle konuşur.">Anlamazsan <b>Noch mal, bitte</b> de; aynı cümleyi yavaşça tekrar eder. Sonunda görevi kendin değerlendirirsin.</FeedbackBand>}
      </section>
      <ActionBar><button class="btn primary block" onClick={start} data-test="rp-start">Konuşmayı başlat</button></ActionBar>
    </div>
  );
  if (phase === "talk") {
    const last = [...turns].reverse().find((t) => t.r === "partner");
    return (
      <div class="stack">
        <div class="row between"><span class="tiny muted">{mode === "offline" ? "Yapay zekâsız mod: senaryodaki diyalog kullanılıyor." : `Zorluk: ${level === 1 ? "kolay" : level === 2 ? "normal" : "gerçekçi"}`}</span><button class="btn ghost sm" onClick={() => void endTalk()} data-test="rp-end">Konuşmayı bitir</button></div>
        <div class="chat" aria-live="polite" data-test="rp-chat">{turns.map((t) => <div class={`bubble ${t.r === "partner" ? "them" : "me"}`}><div lang="de">{t.de}</div>{t.r === "partner" && <ListenButton text={t.de} speed={lv?.speed} small />}</div>)}
          {busy && <div class="bubble them" aria-label="Karşı taraf yazıyor"><span class="skeleton" style={{ display: "inline-block", width: 60 }} /></div>}</div>
        {slow === "turn" && !waiting && <div class="card stack" role="status" data-test="rp-slow"><p style={{ margin: 0 }}><b>Biraz uzun sürüyor.</b> <span class="small muted">Yanıt gelirse hemen kullanılır.</span></p><div class="row"><button class="btn sm" onClick={() => setWaiting(true)} data-test="rp-wait">Bekle</button><button class="btn sm" onClick={() => void partnerTurn(histRef.current, stuckRef.current)} data-test="rp-retry">Tekrar dene</button><button class="btn sm" onClick={goOffline} data-test="rp-offline">Yapay zekâsız devam</button></div></div>}
        {slow === "turn" && waiting && <p class="tiny muted" role="status">Yanıt bekleniyor…</p>}
        {err && <div class="card err stack" role="alert"><p><b>Bağlantı sorunu.</b> {err}</p><div class="row"><button class="btn sm" onClick={() => void partnerTurn(histRef.current, stuckRef.current)} data-test="rp-retry">Tekrar dene</button><button class="btn sm" onClick={goOffline} data-test="rp-offline">Yapay zekâsız devam</button></div></div>}
        <div class="row">{last && <ExplainBtn de={last.de} context={s.roleplay.scene_tr} />}<SayItBox entries={entriesOf(ctx)} level={s.level} context_de={last?.de} /></div>
        <ChatEnd dep={turns.length + (busy ? 1 : 0) + (err ? 1 : 0)} />
        <ActionBar><AnswerField onSubmit={(a) => void send(a)} disabled={busy} submitLabel="Gönder" /></ActionBar>
      </div>
    );
  }
  // rapor
  if (mode === "offline") {
    const learner = turns.filter((t) => t.r === "learner").map((t) => t.de);
    const expect = (s.dialogues[offIdx]?.lines || []).filter((l) => l.r === "B").map((l) => l.de);
    return (
      <div class="stack fade" data-test="rp-report">
        <section class="card stack"><div class="kicker">Rapor · yapay zekâsız mod</div>
          <p class="small">Görevleri sen işaretle:</p>
          {s.roleplay.goals.map((g) => <label class="row"><input type="checkbox" checked={!!selfGoals[g.id]} onChange={(e) => setSelfGoals({ ...selfGoals, [g.id]: (e.target as HTMLInputElement).checked })} /> {g.tr}</label>)}
          <div class="kicker" style={{ marginTop: 8 }}>Senin cümlelerin ve örnek karşılıkları</div>
          {learner.map((a, k) => <div class="small"><span lang="de">{a}</span>{expect[k] && <div class="muted" lang="de">Örnek: {expect[k]}</div>}</div>)}
        </section>
        <ActionBar><button class="btn primary block" onClick={async () => { const done = Object.values(selfGoals).filter(Boolean).length; await finish(done, s.roleplay.goals.length, { level, goalsDone: done, goalsTotal: s.roleplay.goals.length, mode: "offline" }); location.hash = back; }} data-test="rp-save">Kaydet ve bitir</button></ActionBar>
      </div>
    );
  }
  return (
    <div class="stack fade" data-test="rp-report">
      {busy && <LoadingCard lines={4} />}
      {slow === "report" && !waiting && <div class="card stack" role="status" data-test="rp-slow"><p style={{ margin: 0 }}><b>Rapor biraz uzun sürüyor.</b> <span class="small muted">Gelirse hemen gösterilir.</span></p><div class="row"><button class="btn sm" onClick={() => setWaiting(true)} data-test="rp-wait">Bekle</button><button class="btn sm" onClick={() => { reportRef.current = false; void endTalk(histRef.current); }} data-test="rp-retry">Tekrar dene</button><a class="btn sm" href={back}>Rapor olmadan bitir</a></div></div>}
      {err && <div class="card err" role="alert"><p><b>Rapor alınamadı.</b> {err}</p><div class="row"><button class="btn sm" onClick={() => void endTalk()}>Tekrar dene</button><a class="btn sm" href={back}>Rapor olmadan bitir</a></div></div>}
      {report && <>
        <section class="card hero"><div class="kicker">Görev</div><div class="big">{report.goals.filter((g: any) => g.done).length}/{s.roleplay.goals.length}</div><p class="small">{report.summary_tr}</p></section>
        <section class="card stack"><div class="kicker">Hedefler</div>{s.roleplay.goals.map((g) => <div class="row">{report.goals.find((x: any) => x.id === g.id)?.done ? <Icon name="check" size={18} label="yapıldı" /> : <span class="emptybox" aria-label="yapılmadı" />} <span>{g.tr}</span></div>)}</section>
        {report.fixes.length > 0 && <section class="card stack"><div class="kicker">En önemli {report.fixes.length} düzeltme</div>{report.fixes.map((f: any) => <div><div class="small muted" lang="de"><s>{f.said}</s></div><div class="de" lang="de">{f.better}</div><div class="small">{f.why_tr}</div></div>)}</section>}
        {report.strengths_tr.length > 0 && <section class="card"><div class="kicker">İyi yaptıkların</div><ul class="small" style={{ margin: 0, paddingLeft: 20 }}>{report.strengths_tr.map((x: string) => <li>{x}</li>)}</ul></section>}
        <section class="card small">İngilizceye/Türkçeye kaçma: <b>{report.english_fallbacks}</b>{report.gaps_de.length > 0 && <> · listene eklenenler: <span lang="de">{report.gaps_de.join(", ")}</span></>}</section>
        <ActionBar><a class="btn primary block" href={back} data-test="back-to-scenario">Senaryoya dön</a></ActionBar>
      </>}
    </div>
  );
}
