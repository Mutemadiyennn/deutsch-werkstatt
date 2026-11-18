/**
 * Aşama 1–2 (DECISIONS D-050): "önce duy, sonra parçala, sonra hatırla".
 *  Aşama 1 · Dinle ve tara: senaryo diyaloğu önce altyazısız, sonra altyazılı → güçlü öğelerde hızlı kontrol →
 *            bilinmeyenler için tek ekranlı tarama (biliyorum / emin değilim / bilmiyorum) → "biliyorum" hemen doğrulanır.
 *  Aşama 2 · İfadeler: en fazla 12 yeni öğe; kart birimi İFADE (kelime bilgisi kartın içinde küçük, kök ailesi tek kartta);
 *            pasif "Anladım" yok: kart sesli/yazılı tekrar ile geçilir ya da "Biliyorum, geç"; her 4 kartta hatırlama turu.
 *  Süre bütçesi ≤ 8 dk, üstte görünür. Ölçüm: aşama 1–2 süresi, kart başına süre, hatırlama başarısı.
 */
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Explanation, Lexeme, Scenario } from "@dw/shared";
import { Chips, Rich, WhySheet } from "../ui/rich.tsx";
import { getItem } from "../data/db.ts";
import { scoreHeard } from "../core/grading.ts";
import { speak, stopSpeaking, sttAvailable } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, AnswerField, Empty, FeedbackBand, ListenButton, MicButton } from "../ui/kit.tsx";
import { VerdictView, useGrader } from "../ui/learn.tsx";
import type { Verdict } from "../core/answer.ts";
import { Done, rec, type SP } from "./Player.tsx";
import { Icon } from "../ui/icons.tsx";
import { AlltagPanel, RauteRow as Rauten, Scene, accentOf, type RState } from "../ui/raute.tsx";

export const BUDGET_MS = 8 * 60_000;
export const MAX_NEW = 12;
const STRONG = 0.6;

/* ---------- İşlev kelimeleri ayrı kart olmaz ---------- */
const FUNCTION_POS = new Set(["det", "pron", "conj", "prep", "particle", "num"]);
const FUNCTION_LEMMA = new Set(["bitte", "sein", "haben", "werden", "ja", "nein", "nicht", "danke", "auch", "so", "noch", "schon", "mal", "dann", "hier", "da", "jetzt"]);
export const isFunctionWord = (l: Lexeme) => FUNCTION_POS.has(l.pos) || FUNCTION_LEMMA.has(l.de.toLowerCase());

/* ---------- İfade kartı modeli ---------- */
export interface Card {
  id: string; kind: "chunk" | "lexeme";
  de: string; tr: string; alltag?: string; bair?: { text: string; status: string; source?: string };
  words: string[];   // "der Termin, -e" gibi küçük kelime bilgisi
  family: string[];  // aynı kökün ailesi
  use?: string;
  exp?: Explanation; alltagExp?: Explanation;
}
const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß ]/g, " ");
const stem = (w: string) => norm(w).trim().slice(0, Math.max(4, Math.min(6, w.length - 1)));
function wordInfo(l: Lexeme): string {
  if (l.pos === "noun") return `${l.art ? l.art + " " : ""}${l.de}${l.pl && l.pl !== "-" ? `, ${l.pl.startsWith("-") ? l.pl : "die " + l.pl}` : ""} · ${l.tr}`;
  if (l.verb?.perfekt) return `${l.de} (${l.verb.praesens3 ? `er ${l.verb.praesens3}, ` : ""}${l.verb.perfekt}) · ${l.tr}`;
  return `${l.de} · ${l.tr}`;
}
export function buildCards(s: Scenario, lx: Map<string, Lexeme>): Card[] {
  const lexs = s.essentials.lexemes.map((id) => lx.get(id)).filter((x): x is Lexeme => !!x && !isFunctionWord(x));
  const used = new Set<string>();
  const cards: Card[] = [];
  for (const c of s.chunks.filter((c) => s.essentials.chunks.includes(c.id))) {
    const text = norm(`${c.layers.hd} ${c.layers.alltag || ""}`);
    const inside = lexs.filter((l) => text.includes(stem(l.de)));
    inside.forEach((l) => used.add(l.id));
    const fam = new Set<string>();
    for (const l of inside) for (const r of l.related) { const x = lx.get(r); if (x && !isFunctionWord(x)) fam.add(x.de); }
    cards.push({ id: c.id, kind: "chunk", de: c.layers.hd, tr: c.tr, alltag: c.layers.alltag, bair: c.layers.bair, words: inside.map(wordInfo), family: [...fam].slice(0, 4), use: c.use_tr, exp: c.exp, alltagExp: c.alltag_exp });
  }
  // ifadeye girmeyen temel kelimeler: kullanım biçimiyle (ilk birleşim) tek kart; aynı aile tek kartta
  for (const l of lexs) {
    if (used.has(l.id)) continue;
    used.add(l.id);
    const famL = l.related.map((r) => lx.get(r)).filter((x): x is Lexeme => !!x && s.essentials.lexemes.includes(x.id) && !used.has(x.id) && !isFunctionWord(x));
    famL.forEach((x) => used.add(x.id));
    const col = l.collocations[0];
    cards.push({ id: l.id, kind: "lexeme", de: col ? col.de : `${l.art ? l.art + " " : ""}${l.de}`, tr: col ? col.tr : l.tr, words: [wordInfo(l), ...famL.map(wordInfo)], family: famL.map((x) => x.de) });
  }
  return cards;
}

/* ---------- Aşama 1–2 oturum durumu (cihazda, senaryo başına) ---------- */
interface Sel { t0: number; known: string[]; unsure: string[]; unknown: string[]; strong: string[] }
const KEY = (sid: string) => `dw2-s12:${sid}`;
const loadSel = (sid: string): Sel | null => { try { return JSON.parse(sessionStorage.getItem(KEY(sid)) || localStorage.getItem(KEY(sid)) || "null"); } catch { return null; } };
const saveSel = (sid: string, v: Sel) => { try { localStorage.setItem(KEY(sid), JSON.stringify(v)); } catch { /* depolama yoksa yalnızca bu oturum */ } };
const mmss = (ms: number) => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

/** Üstte görünen süre bütçesi (≤ 8 dk) */
export function BudgetChip({ t0 }: { t0: number }) {
  const [, tick] = useState(0);
  useEffect(() => { const h = window.setInterval(() => tick((x) => x + 1), 1000); return () => clearInterval(h); }, []);
  const used = Date.now() - t0;
  const left = Math.ceil((BUDGET_MS - used) / 60_000);
  // DESIGN §1: kronometre yok; tek kısa metin ("6 dk kaldı")
  return <span class="tiny muted budget" data-test="budget" aria-label={`Aşama 1–2 süresi ${mmss(used)}, bütçe 8 dakika`}>{left > 0 ? `${left} dk kaldı` : "Süre doldu, acele yok"}</span>;
}

/** 3–4 seçenekli anlam sorusu (dinle → anlamını seç) */
function MeaningQ({ card, pool, onDone, say }: { card: Card; pool: Card[]; onDone: (ok: boolean) => void; say?: boolean }) {
  const opts = useMemo(() => {
    const others = pool.filter((x) => x.id !== card.id && x.tr !== card.tr).map((x) => x.tr);
    let h = 0; for (const ch of card.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const pick = [card.tr, ...others.filter((_, i) => (i + h) % 2 === 0).slice(0, 3)];
    while (pick.length < Math.min(4, others.length + 1)) { const x = others.find((o) => !pick.includes(o)); if (!x) break; pick.push(x); }
    const r = h % pick.length; return [...pick.slice(r), ...pick.slice(0, r)];
  }, [card.id]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { if (say !== false) void speak(card.de, "de", "normal"); return () => stopSpeaking(); }, [card.id]);
  const ans = opts.indexOf(card.tr);
  return (
    <div class="stack fade" data-test="meaning-q">
      <section class="card stack"><div class="kicker">Dinle: ne demek?</div><div class="row"><ListenButton text={card.de} /><span class="small muted">Metin cevaptan sonra görünür</span></div>
        {picked !== null && <div class="de-lg" lang="de">{card.de}</div>}</section>
      <div role="group">{opts.map((o, k) => <button class={`opt${picked === null ? "" : k === ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k} data-right={k === ans ? "1" : undefined}
        onClick={() => { setPicked(k); haptic(k === ans ? "success" : "error"); }}>{o}</button>)}</div>
      {picked !== null && <ActionBar><button class="btn primary block" onClick={() => onDone(picked === ans)} data-test="next">Devam</button></ActionBar>}
    </div>
  );
}

/* ============================ AŞAMA 1 · Dinle ve tara ============================ */
export function HearSection({ ctx, finish, back, setSub }: SP & { setSub: (n: preact.ComponentChildren) => void }) {
  const s = ctx.s;
  const cards = useMemo(() => buildCards(s, ctx.lx), [s.id]);
  const lines = s.dialogues[0]?.lines || [];
  const [phase, setPhase] = useState<"listen" | "quick" | "scan" | "verify" | "done">("listen");
  const [subs, setSubs] = useState(false);
  const [heard, setHeard] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [strong, setStrong] = useState<Card[] | null>(null);
  const [mark, setMark] = useState<Record<string, "known" | "unsure" | "unknown">>({});
  const [qi, setQi] = useState(0);
  const [ok, setOk] = useState(0);
  const t0 = useRef(loadSel(s.id)?.t0 && Date.now() - loadSel(s.id)!.t0 < 3600_000 ? loadSel(s.id)!.t0 : Date.now());
  useEffect(() => { setSub(<BudgetChip t0={t0.current} />); }, []);
  useEffect(() => {
    // güçlü öğeler (pasif güç ≥ 0,6) taramaya girmez, yalnızca hızlı kontrol
    Promise.all(cards.map(async (c) => ({ c, s: (await getItem(c.id))?.passive.s ?? 0 }))).then((xs) => setStrong(xs.filter((x) => x.s >= STRONG).map((x) => x.c)));
  }, [s.id]);
  useEffect(() => () => stopSpeaking(), []);
  useEffect(() => { if (phase === "quick" && strong && qi >= strong.length) { setQi(0); setPhase("scan"); } }, [phase, qi, strong]);
  const playAll = async () => { setPlaying(true); try { for (const l of lines) { await speak(l.de, "de", l.speed || "normal"); await new Promise((r) => setTimeout(r, 300)); } } finally { setPlaying(false); setHeard(true); } };
  const strongIds = new Set((strong || []).map((c) => c.id));
  const scanCards = cards.filter((c) => !strongIds.has(c.id));
  const knownClaims = scanCards.filter((c) => mark[c.id] === "known");

  const complete = async (m: Record<string, "known" | "unsure" | "unknown">, verifiedOk: number) => {
    const sel: Sel = { t0: t0.current, strong: [...strongIds], known: cards.filter((c) => m[c.id] === "known").map((c) => c.id), unsure: cards.filter((c) => m[c.id] === "unsure").map((c) => c.id), unknown: cards.filter((c) => m[c.id] === "unknown" || !m[c.id]).map((c) => c.id) };
    saveSel(s.id, sel);
    setPhase("done");
    await finish(verifiedOk, Math.max(1, knownClaims.length + (strong?.length || 0)), { ms: Date.now() - t0.current });
  };

  if (!cards.length) return <Empty title="Bu senaryoda yeni ifade yok" />;
  if (phase === "done") return <Done score={ok} total={Math.max(1, knownClaims.length + (strong?.length || 0))} back={back} ctx={ctx} title="Aşama 1 · Dinle ve tara" plain={`${Math.max(1, Math.min(MAX_NEW, cards.length - ok))} ifade öğreneceksin`} />;

  if (phase === "listen") return (
    <div class="stack fade" data-test="stage-intro">
      <section class="card hero stack">
        <div class="kicker">Önce duy · {s.dialogues[0]?.title_tr || s.title_tr}</div>
        <p style={{ margin: 0 }}>{subs ? "Şimdi altyazılı dinle: kelimeleri bağlam içinde gör." : "Önce gerçek konuşmayı altyazısız dinle. Her şeyi anlaman gerekmiyor; ne olduğunu yakalamaya çalış."}</p>
        <div class="row"><button class="btn" onClick={() => void playAll()} disabled={playing} data-test="play-dialogue">{playing ? "Çalıyor…" : <><Icon name="play" size={18} /> Diyaloğu dinle</>}</button>{playing && <button class="btn ghost sm" onClick={() => { stopSpeaking(); setPlaying(false); setHeard(true); }}>Durdur</button>}</div>
      </section>
      {subs && <section class="card stack" data-test="subtitles">{lines.map((l) => <div class="dline"><div class="grow"><div class="who" style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--muted)" }}>{s.dialogues[0]!.roles[l.r]}</div><div lang="de" class="de">{l.de}</div><div class="tr2">{l.tr}</div></div><ListenButton text={l.de} speed={l.speed} small slowToggle={false} /></div>)}</section>}
      <ActionBar>{!subs
        ? <button class="btn primary block" onClick={() => setSubs(true)} data-test="to-subtitles">{heard ? "Altyazılı dinle" : "Dinlemeden altyazıya geç"}</button>
        : <button class="btn primary block" onClick={() => setPhase(strong && strong.length ? "quick" : "scan")} disabled={strong === null} data-test="to-scan">Devam: bildiklerini işaretle</button>}</ActionBar>
    </div>
  );

  if (phase === "quick" && strong) {
    const c = strong[qi];
    if (!c) return null; // geçiş aşağıdaki etkide
    return (<div class="stack"><div class="small muted">Hızlı kontrol: bunları daha önce öğrenmiştin · {qi + 1}/{strong.length}</div>
      <MeaningQ key={c.id} card={c} pool={cards} onDone={(r) => { void rec(c.id, c.kind, "passive", r ? "correct" : "wrong"); if (r) setOk((x) => x + 1); else setMark((m) => ({ ...m, [c.id]: "unknown" })); setQi(qi + 1); }} /></div>);
  }

  if (phase === "scan") {
    const all = scanCards.length > 0 && scanCards.every((c) => mark[c.id]);
    return (
      <div class="stack fade" data-test="scan">
        <section class="card"><div class="kicker">Hangilerini biliyorsun?</div><p class="small" style={{ margin: 0 }}>Her ifade için tek dokunuş. "Biliyorum" dediklerini hemen kısa bir soruyla doğrulayacağız.</p></section>
        <div class="scangrid" role="list">
          {scanCards.map((c) => (
            <div class="scanrow" role="listitem" data-card={c.id}>
              <div class="grow"><span lang="de" class="de">{c.de}</span></div>
              <div class="seg tri" role="group" aria-label={`${c.de}: ne kadar biliyorsun?`}>
                {([["known", <Icon name="check" size={20} />, "Biliyorum"], ["unsure", "?", "Emin değilim"], ["unknown", <Icon name="x" size={20} />, "Bilmiyorum"]] as const).map(([k, ic, lb]) =>
                  <button aria-pressed={mark[c.id] === k} aria-label={lb} title={lb} data-mark={k} onClick={() => { haptic("selection"); setMark({ ...mark, [c.id]: k }); }}>{ic}</button>)}
              </div>
            </div>
          ))}
        </div>
        <div class="row"><button class="btn ghost sm" onClick={() => setMark(Object.fromEntries(scanCards.map((c) => [c.id, mark[c.id] || "unknown"])))} data-test="rest-unknown">Kalanların hepsi: bilmiyorum</button></div>
        <ActionBar><button class="btn primary block" disabled={!all} onClick={() => { setQi(0); if (knownClaims.length) setPhase("verify"); else void complete(mark, ok); }} data-test="scan-done">{all ? (knownClaims.length ? `Devam: ${knownClaims.length} "biliyorum"u doğrula` : "Devam") : `${scanCards.filter((c) => mark[c.id]).length}/${scanCards.length} işaretlendi`}</button></ActionBar>
      </div>
    );
  }

  // verify: "biliyorum" denenler hemen doğrulanır; yanlışsa "bilmiyorum"a döner
  const c = knownClaims[qi];
  if (!c) return null;
  return (<div class="stack"><div class="small muted">Doğrulama · {qi + 1}/{knownClaims.length}</div>
    <MeaningQ key={c.id} card={c} pool={cards} onDone={(r) => { void rec(c.id, c.kind, "passive", r ? "correct" : "wrong"); const m = r ? mark : { ...mark, [c.id]: "unknown" as const }; if (r) setOk(ok + 1); setMark(m); if (qi + 1 >= knownClaims.length) void complete(m, ok + (r ? 1 : 0)); else setQi(qi + 1); }} /></div>);
}

/* ============================ AŞAMA 2 · İfadeler: parçala ve hatırla ============================ */
type Step = { t: "card"; c: Card } | { t: "mean"; c: Card } | { t: "say"; c: Card };
export function LearnSection({ ctx, finish, back, setSub }: SP & { setSub: (n: preact.ComponentChildren) => void }) {
  const s = ctx.s;
  const cards = useMemo(() => buildCards(s, ctx.lx), [s.id]);
  const sel = useMemo(() => loadSel(s.id), [s.id]);
  const t0 = useRef(sel?.t0 && Date.now() - sel.t0 < 3600_000 ? sel.t0 : Date.now());
  const plan = useMemo(() => {
    const pri = (id: string) => (sel?.unknown.includes(id) ? 0 : sel?.unsure.includes(id) ? 1 : 2);
    const learn = sel ? cards.filter((c) => !sel.known.includes(c.id) && !sel.strong.includes(c.id)) : cards;
    const sorted = [...learn].sort((a, b) => pri(a.id) - pri(b.id));
    return { now: sorted.slice(0, MAX_NEW), later: sorted.slice(MAX_NEW) };
  }, [s.id]);
  const steps = useMemo(() => {
    const out: Step[] = [];
    for (let g = 0; g < plan.now.length; g += 4) {
      const grp = plan.now.slice(g, g + 4);
      grp.forEach((c) => out.push({ t: "card", c }));
      grp.forEach((c) => out.push({ t: "mean", c }));
      grp.forEach((c) => out.push({ t: "say", c }));
    }
    return out;
  }, [plan]);
  const [i, setI] = useState(0);
  const [recall, setRecall] = useState({ ok: 0, n: 0 });
  const cardMs = useRef<number[]>([]);
  const stepT = useRef(Date.now());
  useEffect(() => {
    // fazlası sonraki tekrarlara: öğrenci modeline "ertelendi" olarak işlenir
    for (const c of plan.later) void rec(c.id, c.kind, "passive", "skipped");
  }, [s.id]);
  const st = steps[i];
  // tek ilerleme göstergesi: ifade başına bir Raute (kart görüldü = yarım, söylendi = dolu) + kalan süre metni
  const states: RState[] = plan.now.map((c) => { const ci = steps.findIndex((x) => x.c === c && x.t === "card"), si = steps.findIndex((x) => x.c === c && x.t === "say"); return (i > si ? 1 : i >= ci ? 0.5 : 0) as RState; });
  useEffect(() => { setSub(<><Rauten states={states} label={`${states.filter((x) => x === 1).length}/${states.length} ifade`} size={16} test="item-count" /><span class="grow" /><BudgetChip t0={t0.current} /></>); stepT.current = Date.now(); }, [i]);
  useEffect(() => { if (i >= steps.length && steps.length) void finish(recall.ok, recall.n, { ms: Date.now() - t0.current, msPerCard: Math.round(cardMs.current.reduce((a, b) => a + b, 0) / Math.max(1, cardMs.current.length)), recallOk: recall.ok, recallTotal: recall.n }); }, [i]);
  if (!steps.length) return <Empty title="Yeni ifade kalmadı" text="Bu senaryonun ifadelerini zaten biliyorsun." action={<a class="btn sm" href={back}>Senaryoya dön</a>} />;
  if (!st) {
    const ms = Date.now() - t0.current;
    return <Done score={recall.ok} total={recall.n} back={back} ctx={ctx} title="Aşama 2 · İfadeler" note={`Aşama 1–2 yaklaşık ${Math.max(1, Math.round(ms / 60000))} dakika sürdü (hedef 8 dakika) · kart başına ${Math.round(cardMs.current.reduce((a, b) => a + b, 0) / Math.max(1, cardMs.current.length) / 1000)} sn · hatırlama ${recall.ok}/${recall.n}${plan.later.length ? ` · ${plan.later.length} ifade sonraki tekrarlara bırakıldı` : ""}`} />;
  }
  const next = () => setI(i + 1);
  if (st.t === "card") return <IfadeCard key={`c${i}`} c={st.c} accent={accentOf(s.domain)} onPass={(how) => { cardMs.current.push(Date.now() - stepT.current); void rec(st.c.id, st.c.kind, "passive", how === "known" ? "correct" : "hinted"); next(); }} />;
  if (st.t === "mean") return <MeaningQ key={`m${i}`} card={st.c} pool={cards} onDone={(r) => { setRecall((x) => ({ ok: x.ok + (r ? 1 : 0), n: x.n + 1 })); void rec(st.c.id, st.c.kind, "passive", r ? "correct" : "wrong"); next(); }} />;
  return <SayQ key={`s${i}`} card={st.c} onDone={(r) => { setRecall((x) => ({ ok: x.ok + (r ? 1 : 0), n: x.n + 1 })); void rec(st.c.id, st.c.kind, "active", r ? "correct" : "wrong"); next(); }} />;
}

/** İfade kartı (DESIGN §4, TARGET 2): sahne, büyük Almanca ifade, Türkçesi, büyük yuvarlak dinle + "Yavaş", gündelik dil paneli, aile çipleri; tek ana eylem "Sesli söyle". */
function IfadeCard({ c, accent, onPass }: { c: Card; accent: string; onPass: (how: "repeat" | "known") => void }) {
  const [res, setRes] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState<false | "n" | "s" | "a">(false);
  const [why, setWhy] = useState(false);
  // "Neden böyle?" satırları: her biri tek fikir (OD-9.1 ipucu + ne zaman)
  const tips = [c.exp?.ipucu_tr && { text: c.exp.ipucu_tr }, c.alltagExp?.ipucu_tr && { text: c.alltagExp.ipucu_tr }, !c.alltag && c.exp?.ne_zaman_tr && { text: c.exp.ne_zaman_tr }].filter(Boolean) as { text: string }[];
  useEffect(() => { void speak(c.de, "de", "normal"); return () => stopSpeaking(); }, [c.id]);
  const play = async (t: string, sp: "normal" | "slow" | "natural", k: "n" | "s" | "a") => { if (busy) { stopSpeaking(); setBusy(false); return; } setBusy(k); try { await speak(t, "de", sp); } finally { setBusy(false); } };
  const check = (t: string) => {
    const sc = Math.round(scoreHeard(c.de, t).score * 100); setRes(sc);
    const ok = sc >= 60 || (c.alltag ? scoreHeard(c.alltag, t).score >= 0.6 : false);
    haptic(ok ? "success" : "error");
    if (ok) window.setTimeout(() => onPass("repeat"), 700);
  };
  const stt = sttAvailable();
  return (
    <div class="stack fade ifade">
      <section class="ifade-card stack" data-test="ifade-card">
        <div class="scenebox"><Scene accent={accent} /></div>
        <div class="wordpanel plain">
          <div class="w" lang="de">{c.de}</div>
          <div class="tr">{c.tr}</div>
        </div>
        <div class="playrow">
          <button class="bigspk" onClick={() => play(c.de, "normal", "n")} aria-label={`Dinle: ${c.de}`} data-test="listen">{busy === "n" ? <Icon name="stop" size={26} /> : <Icon name="volume" size={28} />}</button>
          <button class="pillbtn" onClick={() => play(c.de, "slow", "s")} aria-label={`Yavaş dinle: ${c.de}`} data-test="listen-slow">{busy === "s" ? "Durdur" : "Yavaş"}</button>
        </div>
        {!c.alltag && c.exp && <Chips parts={c.exp.parcalar} />}
        {c.alltag && <AlltagPanel de={c.alltag} note={c.use} exp={c.alltagExp} playing={busy === "a"} onPlay={() => play(c.alltag!, "natural", "a")} onWhy={tips.length ? () => setWhy(true) : undefined} />}
        {!c.alltag && tips.length > 0 && <button class="whylink" onClick={() => setWhy(true)} data-test="why-open">Neden böyle?</button>}
        {c.bair && <div class="row bairline" style={{ flexWrap: "nowrap" }}><span class="badge bair">Bairisch</span><span class="grow de" lang="de">{c.bair.text}</span>{c.bair.status === "uncertain" && <span class="tiny muted">bölgeye göre değişebilir</span>}</div>}
        {!c.alltag && !c.exp && c.use && <p class="small muted" style={{ margin: 0 }}><Rich text={c.use} /></p>}
        {c.family.length > 0 && <div><div class="famlbl">Aynı aileden</div><div class="famchips">{c.family.map((f, k) => <span class={`chip${k === 0 ? " cur" : ""}`} lang="de">{f}</span>)}</div></div>}
        {c.words.length > 0 && <div class="wordinfo" data-test="word-info">{c.words.map((w) => <div lang="de">{w}</div>)}</div>}
      </section>
      {why && <WhySheet tips={tips} onClose={() => setWhy(false)} />}
      {res !== null && <FeedbackBand kind={res >= 60 ? "ok" : "warn"} title={res >= 60 ? `Anlaşıldı · %${res}` : `%${res} · bir daha dene`} />}
      <ActionBar>
        {typing ? <AnswerField onSubmit={(t) => check(t)} placeholder="İfadeyi yaz…" submitLabel="Tekrar et" voice={false} />
          : stt ? <MicButton wide onText={check} />
          : <button class="btn primary block" onClick={() => setTyping(true)} data-test="type-repeat"><Icon name="keyboard" /> Yazarak tekrar et</button>}
        <div class="row between secondary">
          <button class="linkbtn" onClick={() => onPass("known")} data-test="known-skip">Biliyorum, geç</button>
          {stt && !typing && <button class="linkbtn muted" onClick={() => setTyping(true)} data-test="type-repeat">Yazarak</button>}
        </div>
      </ActionBar>
    </div>
  );
}

/** Türkçe → Almanca söyle ya da yaz */
function SayQ({ card, onDone }: { card: Card; onDone: (ok: boolean) => void }) {
  const grade = useGrader();
  const [v, setV] = useState<{ v: Verdict; a: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const accepted = [card.de, ...(card.alltag ? [card.alltag] : [])].map((x) => x.replace(/…/g, "").trim());
  return (
    <div class="stack fade" data-test="say-q">
      <section class="card stack"><div class="kicker">Almancası ne? Söyle ya da yaz</div><div class="de-lg">{card.tr}</div></section>
      {!v && <ActionBar><AnswerField onSubmit={async (a) => { setBusy(true); const r = await grade(accepted, a, card.tr); setBusy(false); setV({ v: r, a }); }} disabled={busy} /></ActionBar>}
      {v && <VerdictView v={v.v} answer={v.a} itemId={card.id} prompt={card.tr} accepted={accepted} onClaim={() => setClaimed(true)} onNext={() => onDone(v.v.kind === "correct" || claimed)} />}
    </div>
  );
}
