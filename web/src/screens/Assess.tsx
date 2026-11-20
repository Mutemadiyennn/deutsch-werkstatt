/** Seviye tespiti: pratik görevler, uyarlamalı, her cevaptan sonra kaydedilir (yarıda bırakılırsa kaldığı yerden devam) */
import { Icon } from "../ui/icons.tsx";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { AssessAnswer, AssessItem, Assessment, Level } from "@dw/shared";
import { useApp, go } from "../state.ts";
import { loadAssessBank } from "../services/content.ts";
import { latestPlacement, openAssessment, saveAssessment, itemsMap, putItems, db } from "../data/db.ts";
import { selectItems, nextItem, progress, finish, LISTEN_SPEED, SKILL_TR } from "../core/assess.ts";
import { applyAssessment, itemIdFromAssess } from "../core/learner.ts";
import { judge, judgeWord } from "../core/grading.ts";
import { speak, sttAvailable, listenOnce } from "../services/speech.ts";
import { ApiError } from "../services/api.ts";
import { ai, aiState } from "../services/ai.ts";
import { ErrorPanel, FocusChip, Loading, SpeakBtn, TopBar } from "../ui/components.tsx";

type Fb = { ok: boolean; skipped?: boolean; right: string; tr?: string; note?: string };

export function AssessRun() {
  const { refreshPlacement } = useApp();
  const [bank, setBank] = useState<AssessItem[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [a, setA] = useState<Assessment | null>(null);
  const [started, setStarted] = useState(false);
  const [fb, setFb] = useState<Fb | null>(null);
  const [t0, setT0] = useState(Date.now());

  const load = async () => {
    setErr(null);
    try {
      const b = await loadAssessBank();
      setBank(b);
      const open = await openAssessment();
      if (open) { setA(open); setStarted(open.answers.length > 0); }
      else {
        const prev = await latestPlacement();
        setA({ id: `as-${Date.now().toString(36)}`, type: prev ? "monthly" : "placement", startedAt: new Date().toISOString(), answers: [], u: Date.now() });
      }
    } catch (e) { setErr((e as Error).message); }
  };
  useEffect(() => { void load(); }, []);

  const items = useMemo(() => (bank && a ? selectItems(bank, a.id) : []), [bank, a?.id]);
  if (err) return <div class="stack"><TopBar title="Seviye tespiti" back="#/today" /><ErrorPanel message={err} onRetry={load} /></div>;
  if (!bank || !a) return <Loading text="Sorular hazırlanıyor…" />;

  const cur = nextItem(items, a.answers);
  const pr = progress(items, a.answers);

  const record = async (ans: Omit<AssessAnswer, "ms">, f: Fb) => {
    const next: Assessment = { ...a, answers: [...a.answers, { ...ans, ms: Date.now() - t0 }], u: Date.now() };
    await saveAssessment(next);
    setA(next);
    setFb(f);
  };
  const cont = async () => {
    setFb(null); setT0(Date.now());
    if (!nextItem(items, a.answers)) {
      const done = finish(a, items);
      const ids = a.answers.map((x) => itemIdFromAssess(x.itemId)).filter((x): x is string => !!x);
      await db.transaction("rw", db.assess, db.items, async () => {
        await saveAssessment(done);
        await putItems(applyAssessment(await itemsMap(ids), a.answers));
      });
      await refreshPlacement();
      go(`assess/result/${done.id}`);
    }
  };

  if (!started) {
    return (
      <div class="stack">
        <TopBar title={a.type === "placement" ? "Seviye tespiti" : "Aylık ölçüm"} back="#/today" />
        <div class="card stack">
          <p>Seviyeni varsaymıyoruz. Kısa ve pratik görevlerle başlangıç noktanı bulacağız:</p>
          <ul class="small" style={{ margin: 0, paddingLeft: 20 }}>
            <li>Kelimeyi tanıma ve kendin yazma</li>
            <li>Dinleyip anlama (yavaştan hızlıya, cihaz sesiyle)</li>
            <li>Kelimeleri sıraya koyup cümle kurma</li>
            <li>Türkçesini görüp Almancasını söyleme</li>
          </ul>
          <p class="small muted">Yaklaşık {pr.total} soru, 12–15 dakika. Zorlanınca üst seviye sorular sorulmaz. "Bilmiyorum" demek tamamen normal: bilmediklerin kişisel tekrar listene eklenir, puan cezası yoktur.</p>
        </div>
        <button class="btn primary block" onClick={() => { setStarted(true); setT0(Date.now()); }} data-test="assess-begin">Başla</button>
      </div>
    );
  }

  return (
    <div class="stack">
      <TopBar title={cur ? SKILL_TR[cur.skill] : "Bitti"} back="#/today" />
      <div class="row between small muted"><span>{pr.done} / {pr.total}</span>{cur && <span class="chip">{cur.level}</span>}</div>
      <div class="progress" aria-hidden="true" data-progress=""><i style={{ width: `${(pr.done / Math.max(1, pr.total)) * 100}%` }} /></div>
      {fb ? <Feedback fb={fb} onNext={cont} last={!nextItem(items, a.answers)} /> : cur ? <ItemView key={cur.id} it={cur} onAnswer={record} /> : <button class="btn primary block" onClick={cont}>Sonuçları gör</button>}
      <p class="tiny muted center">İlerlemen her cevaptan sonra kaydedilir. İstediğin zaman çıkıp sonra devam edebilirsin.</p>
    </div>
  );
}

function Feedback({ fb, onNext, last }: { fb: Fb; onNext: () => void; last: boolean }) {
  return (
    <div class="stack" aria-live="polite">
      <div class={`fb ${fb.ok ? "ok" : fb.skipped ? "info" : "bad"}`} data-test="feedback">
        <b>{fb.ok ? "Doğru." : fb.skipped ? "Sorun değil." : "Bu sefer olmadı."}</b>
        {!fb.ok && <> Doğrusu: <span class="de">{fb.right}</span></>}
        {fb.tr && <div class="small">{fb.tr}</div>}
        {fb.note && <div class="small">{fb.note}</div>}
      </div>
      <button class="btn primary block" onClick={onNext} autoFocus data-test="next">{last ? "Sonuçları gör" : "Devam"}</button>
    </div>
  );
}

type OnAnswer = (a: Omit<AssessAnswer, "ms">, f: Fb) => void;
const base = (it: AssessItem) => ({ itemId: it.id, skill: it.skill, level: it.level });
const Dunno = ({ onClick }: { onClick: () => void }) => <button class="btn ghost block" onClick={onClick} data-test="dunno">Bilmiyorum</button>;

function ItemView({ it, onAnswer }: { it: AssessItem; onAnswer: OnAnswer }) {
  switch (it.skill) {
    case "vocab_passive": return <Choice it={it} prompt={<><div class="kicker">Bu kelime ne demek?</div><div class="row"><span class="de" style={{ fontSize: "1.4rem" }}>{it.de}</span><SpeakBtn text={it.de.replace(/^(der|die|das) /, "")} /></div></>} opts={it.opts_tr} ans={it.ans} right={it.opts_tr[it.ans]!} onAnswer={onAnswer} />;
    case "listening": return <Listening it={it} onAnswer={onAnswer} />;
    case "vocab_active": return <TypeWord it={it} onAnswer={onAnswer} />;
    case "building": return <Build it={it} onAnswer={onAnswer} />;
    case "speaking": return <Speak it={it} onAnswer={onAnswer} />;
  }
}

function Choice({ it, prompt, opts, ans, right, onAnswer, extra }: { it: AssessItem; prompt: any; opts: string[]; ans: number; right: string; onAnswer: OnAnswer; extra?: Partial<AssessAnswer> & { tr?: string } }) {
  return (
    <div class="stack">
      <div class="card">{prompt}</div>
      <div role="group">
        {opts.map((o, i) => (
          <button class="opt" data-opt={i} onClick={() => onAnswer({ ...base(it), ...extra, correct: i === ans, given: o }, { ok: i === ans, right, tr: extra?.tr })}>{o}</button>
        ))}
      </div>
      <Dunno onClick={() => onAnswer({ ...base(it), ...extra, correct: false, skipped: true }, { ok: false, skipped: true, right, tr: extra?.tr })} />
    </div>
  );
}

function Listening({ it, onAnswer }: { it: Extract<AssessItem, { skill: "listening" }>; onAnswer: OnAnswer }) {
  const speed = LISTEN_SPEED[it.level as Level];
  const [plays, setPlays] = useState(0);
  // ölçüm: hız seviyenin hızıdır; Profil'deki başlangıç hızı uygulanmaz (inceleme #77 P1-1)
  const play = async () => { setPlays((n) => n + 1); await speak(it.de, "de", speed, true); };
  useEffect(() => { void play(); }, []);
  return (
    <Choice it={it} opts={it.opts_tr} ans={it.ans} right={it.opts_tr[it.ans]!} onAnswer={onAnswer}
      extra={{ mode: speed, tr: `Duyduğun: „${it.de}“` }}
      prompt={<>
        <div class="kicker">Dinle ve anlamını seç</div>
        <div class="row"><button class="btn" onClick={play} data-test="play"><Icon name="volume" size={20} /> {plays ? "Tekrar dinle" : "Dinle"}</button><span class="small muted">{speed === "slow" ? "yavaş" : speed === "normal" ? "normal hız" : "hızlı"} · cihaz sesi</span></div>
      </>} />
  );
}

function TypeWord({ it, onAnswer }: { it: Extract<AssessItem, { skill: "vocab_active" }>; onAnswer: OnAnswer }) {
  const [v, setV] = useState("");
  const right = (it.art ? it.art + " " : "") + it.answers[0];
  const check = () => {
    const r = judgeWord(v, it.answers[0]!, it.art);
    onAnswer({ ...base(it), correct: r.ok, given: v, mode: "typed" }, { ok: r.ok, right, note: r.why_tr });
  };
  return (
    <div class="stack">
      <div class="card"><div class="kicker">Almancası nedir?</div><div style={{ fontSize: "1.3rem", fontWeight: 600 }}>{it.tr}</div>{it.art && <p class="small muted" style={{ marginTop: 6 }}>Almancasını yaz. Başına der, die ya da das koy.</p>}</div>
      <form class="stack" onSubmit={(e) => { e.preventDefault(); if (v.trim()) check(); }}>
        <input class="input" lang="de" autocapitalize="off" autocomplete="off" spellcheck={false} value={v} onInput={(e) => setV((e.target as HTMLInputElement).value)} aria-label="Cevabın" data-test="answer" />
        <button class="btn primary block" type="submit" disabled={!v.trim()}>Kontrol et</button>
      </form>
      <Dunno onClick={() => onAnswer({ ...base(it), correct: false, skipped: true }, { ok: false, skipped: true, right })} />
    </div>
  );
}

const START_WORDS = /^(ich|du|er|sie|es|wir|ihr|wie|wo|was|wann|woher|wohin|warum|wer|der|die|das|den|dem|ein|eine|mein|meine|kann|können|haben|hast|hat|ist|bist|sind|gibt|heute|dann|am|im|um|ja|nein|gestern|bitte|darf|möchten|möchtest|könnten|kannst|geht|kommst|kommen|welche|welcher|welches|leider|zuerst|danach|jetzt|hier|dort|vielleicht|natürlich|aber|und|oder|weil|wenn|als|ob|dass|morgen|seit|nach|vor|mit|in|auf|zum|zur)$/i;
function chipsOf(it: { id: string; de: string }) {
  const toks = it.de.split(/\s+/).map((w) => w.replace(/[.,!?;:„“"]/g, "")).filter(Boolean);
  if (toks[0] && START_WORDS.test(toks[0])) toks[0] = toks[0].toLowerCase(); // büyük harf ipucu yok (v1 kuralı)
  // tohumlu karıştırma; doğru sırayla aynı kalmasın
  let h = 0; for (const c of it.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const arr = toks.map((w, i) => ({ w, i, k: ((h ^ (i * 2654435761)) >>> 0) % 1000 }));
  arr.sort((a, b) => a.k - b.k);
  if (arr.every((x, i) => x.i === i) && arr.length > 1) arr.reverse();
  return arr;
}

function Build({ it, onAnswer }: { it: Extract<AssessItem, { skill: "building" }>; onAnswer: OnAnswer }) {
  const chips = useMemo(() => chipsOf(it), [it.id]);
  const [sel, setSel] = useState<number[]>([]);
  const built = sel.map((k) => chips[k]!.w).join(" ");
  const check = () => { const j = judge([it.de, ...it.alt], [built]); onAnswer({ ...base(it), correct: j.ok, given: built, mode: "typed" }, { ok: j.ok, right: it.de, tr: it.tr }); };
  return (
    <div class="stack">
      <div class="card"><div class="kicker">Kelimeleri sıraya koy</div><div style={{ fontWeight: 600 }}>{it.tr}</div></div>
      <div class="slot" aria-label="Kurduğun cümle" data-test="slot">{sel.map((k, pos) => <button class="wchip" onClick={() => setSel(sel.filter((_, p) => p !== pos))}>{chips[k]!.w}</button>)}</div>
      <div class="row" role="group" aria-label="Kelimeler">{chips.map((c, k) => <button class={`wchip${sel.includes(k) ? " used" : ""}`} disabled={sel.includes(k)} data-chip={c.w} onClick={() => setSel([...sel, k])}>{c.w}</button>)}</div>
      <button class="btn primary block" disabled={sel.length !== chips.length} onClick={check} data-test="check">Kontrol et</button>
      <Dunno onClick={() => onAnswer({ ...base(it), correct: false, skipped: true }, { ok: false, skipped: true, right: it.de, tr: it.tr })} />
    </div>
  );
}

function Speak({ it, onAnswer }: { it: Extract<AssessItem, { skill: "speaking" }>; onAnswer: OnAnswer }) {
  const { api } = useApp();
  const [typed, setTyped] = useState("");
  const [state, setState] = useState<"idle" | "listening" | "checking">("idle");
  const [heard, setHeard] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const canTalk = sttAvailable();
  const variants = [it.de, ...it.alt];

  const decide = async (inputs: string[], mode: "voice" | "typed") => {
    const j = judge(variants, inputs);
    if (j.ok) return onAnswer({ ...base(it), correct: true, given: j.heard, mode }, { ok: true, right: j.best, tr: it.tr });
    // hazır listede olmayan ama doğru olabilecek cevap: sunucudaki öğretmene sorulur (en fazla ~12 sn); sunucu yoksa kural sonucu geçerli
    // sağlayıcı kapalıysa ya da devre kesici açıksa sorulmaz (inceleme #123 P1-1; diğer yapay zekâ yüzeyleriyle aynı kapı)
    if (aiState(api).available && j.heard) {
      setState("checking");
      try {
        const r = await ai(api, "equiv_check", { prompt_tr: it.tr, expected: variants, answer: j.heard });
        setState("idle");
        return onAnswer({ ...base(it), correct: r.ok, given: j.heard, mode, aiAccepted: r.ok }, { ok: r.ok, right: it.de, tr: it.tr, note: r.reason_tr });
      } catch (e) {
        setState("idle");
        const msg = e instanceof ApiError ? e.message_tr : "Sunucuya ulaşılamadı.";
        return onAnswer({ ...base(it), correct: false, given: j.heard, mode }, { ok: false, right: it.de, tr: it.tr, note: `Öğretmen kontrolü yapılamadı: ${msg}` });
      }
    }
    onAnswer({ ...base(it), correct: false, given: j.heard, mode }, { ok: false, right: it.de, tr: it.tr, note: heard ? `Duyulan: „${j.heard}“` : undefined });
  };

  const talk = async () => {
    setState("listening"); setNote(null);
    try {
      const alts = await listenOnce().result;
      setState("idle");
      if (!alts.length) { setNote("Ses algılanamadı. Tekrar dene ya da yazarak cevapla."); return; }
      setHeard(alts[0]!);
      await decide(alts, "voice");
    } catch {
      setState("idle");
      setNote("Konuşma tanıma bu cihazda çalışmıyor. Yazarak cevaplayabilirsin.");
    }
  };

  return (
    <div class="stack">
      <div class="card"><div class="kicker">Almanca söyle</div><div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{it.tr}</div></div>
      {canTalk && <button class="btn primary block" onClick={talk} disabled={state !== "idle"} data-test="mic"><Icon name="mic" /> {state === "listening" ? "Dinliyorum…" : "Konuş"}</button>}
      {state === "checking" && <p class="small muted" aria-live="polite">Öğretmen kontrol ediyor…</p>}
      {note && <div class="fb warn small">{note}</div>}
      <form class="stack" onSubmit={(e) => { e.preventDefault(); if (typed.trim()) void decide([typed], "typed"); }}>
        <input class="input" lang="de" autocomplete="off" spellcheck={false} placeholder={canTalk ? "…ya da yazarak cevapla" : "Almancasını yaz"} value={typed} onInput={(e) => setTyped((e.target as HTMLInputElement).value)} aria-label="Yazarak cevap" data-test="answer" />
        <button class="btn block" type="submit" disabled={!typed.trim() || state !== "idle"}>Kontrol et</button>
      </form>
      <Dunno onClick={() => onAnswer({ ...base(it), correct: false, skipped: true }, { ok: false, skipped: true, right: it.de, tr: it.tr })} />
    </div>
  );
}

/* ---------- Sonuç ---------- */
const LV = (l?: string) => (l === "below-A1" ? "A1 öncesi" : l || "–");
export function AssessResult({ id }: { id?: string }) {
  const [a, setA] = useState<Assessment | null | undefined>(undefined);
  useEffect(() => { (async () => setA((id ? await db.assess.get(id) : await latestPlacement()) || null))(); }, [id]);
  if (a === undefined) return <Loading />;
  if (!a || !a.results) return <div class="stack"><TopBar title="Sonuç" back="#/today" /><p>Tamamlanmış bir tespit bulunamadı.</p><a class="btn primary" href="#/assess">Tespiti başlat</a></div>;
  const wrongWords = a.answers.filter((x) => !x.correct && (x.skill === "vocab_passive" || x.skill === "vocab_active")).length;
  return (
    <div class="stack">
      <TopBar title="Seviye tespiti sonucu" back="#/today" />
      <div class="card hl">
        <div class="kicker">Tahmini başlangıç seviyen</div>
        <div class="big" data-test="overall">{LV(a.overall)}</div>
        <p class="small" style={{ marginTop: 8 }}>{a.summaryTr}</p>
      </div>
      <div class="card stack">
        <h2>Beceriye göre</h2>
        {a.results.map((r) => (
          <div>
            <div class="row between"><b>{SKILL_TR[r.skill]}</b><span class="chip">{LV(r.estimate)}</span></div>
            {(["A1", "A2", "B1"] as const).map((l) => {
              const b = r.byLevel[l]; const pct = b.total ? Math.round((b.correct / b.total) * 100) : 0;
              return <div class="lvl small"><span class="muted">{l}</span><div class="progress"><i style={{ width: `${pct}%` }} /></div><span>{b.correct}/{b.total}</span></div>;
            })}
          </div>
        ))}
        <p class="tiny muted">Sorulmayan üst seviye maddeleri yanlış sayılır.</p>
      </div>
      {a.listeningBySpeed && (
        <div class="card">
          <h2>Dinleme · hıza göre</h2>
          {(["slow", "normal", "fast"] as const).map((s) => { const b = a.listeningBySpeed![s]; return b ? <div class="lvl small"><span class="muted">{s === "slow" ? "Yavaş" : s === "normal" ? "Normal" : "Hızlı"}</span><div class="progress"><i style={{ width: `${(b.correct / b.total) * 100}%` }} /></div><span>{b.correct}/{b.total}</span></div> : null; })}
          <p class="tiny muted">Cihaz sesiyle ölçüldü. Doğal konuşma kayıtları sonraki fazda eklenecek.</p>
        </div>
      )}
      {wrongWords > 0 && <div class="fb info small">{wrongWords} kelime kişisel tekrar listene eklendi. Bugün ekranında görebilirsin.</div>}
      <a class="btn primary block" href="#/today">Bugün'e git</a>
    </div>
  );
}
