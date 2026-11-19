/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu.
 * Kartlar öğrenciye soru olarak döner; cevap öğrenciden beklenir. Yanlışta doğrusu öğrencinin cevabıyla yan yana
 * gösterilir, kart turun sonunda başka örnek ve başka türle yeniden gelir ve kişisel bankaya girer (srs.review).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme, LearnerItem } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon } from "../services/content.ts";
import { itemsMap, personalWords, putItems } from "../data/db.ts";
import { review, sessionKey, type Outcome } from "../core/srs.ts";
import { accepted, buildRound, isCard, personalFirst, collocQuestion, formFor, isNoun, meaningOptions, ownSentenceCheck, pathOf, requeue, type GardenQ } from "../core/garden.ts";
import { ruleVerdict } from "../core/answer.ts";
import { numberWordHint } from "../core/grading.ts";
import { speak, stopSpeaking } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { Art, ErrorPanel, Loading } from "../ui/components.tsx";
import { Photo } from "../ui/learn.tsx";

const E2E = import.meta.env.MODE === "e2e";
type Result = { ok: boolean; answer?: string; expected?: string; note?: string };

export function Garden() {
  const [data, setData] = useState<{ lex: Map<string, Lexeme>; all: Lexeme[]; items: Map<string, LearnerItem>; round: GardenQ[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  const startedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    (async () => {
      const { lexemes } = await loadLexicon();
      const lex = new Map(lexemes.map((l) => [l.id, l]));
      const items = await itemsMap(lexemes.map((l) => l.id));
      // yeni kart sırası: K1 derin kartlar sıklık sırasıyla (işlev kelimesi ve yalnızca tanıma kartları hariç)
      const k1 = lexemes.filter((l) => l.tier === "K1" && isCard(l)).sort((a, b) => (a.freqRank ?? 9e9) - (b.freqRank ?? 9e9)).map((l) => l.id);
      // duyduğun ve "nasıl derim" diye sorduğun kelimeler önce (kişisel banka, #58 A3)
      const pool = personalFirst(await personalWords(), lexemes, k1);
      setData({ lex, all: lexemes, items, round: buildRound(lex, items, pool) });
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, []);

  if (err) return <ErrorPanel message={err} onRetry={() => location.reload()} />;
  if (!data) return <Loading />;
  const { round } = data;
  if (!round.length) return (
    <div class="stack"><ProgressHeader title="Kelime Bahçesi" back="#/today" />
      <section class="card stack" data-test="garden-empty"><h2>Bugün bahçe sakin</h2><p>Vadesi gelen kart yok. Yeni kartlar senaryolarda tanıtıldıkça burada soru olarak döner.</p>
        <a class="btn primary block" href="#/today">Bugün'e dön</a></section></div>
  );
  if (i >= round.length) return (
    <div class="stack"><ProgressHeader title="Kelime Bahçesi" back="#/today" />
      <section class="card stack" data-test="garden-done"><h2>Tur bitti</h2>
        <p>{score.n} soruda {score.ok} doğru. Yanlış olanlar bankana girdi; yarın ya da birkaç gün sonra başka bir soruyla geri gelecek.</p>
        <a class="btn primary block" href="#/today" data-test="garden-back">Bugün'e dön</a></section></div>
  );
  const q = round[i]!;
  const l = data.lex.get(q.lexId)!;

  const finish = async (r: Result, outcome: Outcome | null) => {
    const prev = data.items.get(q.lexId);
    let next = prev;
    if (outcome) {
      next = review(prev, { itemId: q.lexId, kind: "lexeme", path: pathOf(q.type), outcome, session: sessionKey("garden", startedAt), source: "drill", ctx: q.type });
      next.lastQ = q.type;
      data.items.set(q.lexId, next);
      await putItems([next]);
    }
    setScore((s) => ({ ok: s.ok + (r.ok ? 1 : 0), n: s.n + (outcome ? 1 : 0) }));
    const r2 = !r.ok && outcome ? requeue(round, q, l) : round;
    setData({ ...data, round: r2 });
    setI(i + 1);
  };

  return (
    <div class="stack" data-test="garden">
      <ProgressHeader title="Kelime Bahçesi" back="#/today" sub={`${Math.min(i + 1, round.length)} / ${round.length}`} />
      <Question key={`${i}:${q.lexId}:${q.type}`} q={q} l={l} all={data.all} onDone={finish} />
    </div>
  );
}

function Question({ q, l, all, onDone }: { q: GardenQ; l: Lexeme; all: Lexeme[]; onDone: (r: Result, o: Outcome | null) => void }) {
  const [intro, setIntro] = useState(!!q.intro);
  const [res, setRes] = useState<Result | null>(null);
  const [selfCheck, setSelfCheck] = useState<string | null>(null);
  const ex = l.examples[q.ex % Math.max(1, l.examples.length)];
  const show = (r: Result) => { setRes(r); haptic(r.ok ? "success" : "error"); };
  const next = (o: Outcome | null) => onDone(res || { ok: false }, o);

  if (intro) return (
    <div class="stack fade" data-test="garden-intro">
      <section class="card stack"><div class="kicker">Yeni kelime</div>
        <Photo q={l.img} />
        <div class="de-xl" lang="de"><Art art={l.art} de={l.de} /></div>
        <div class="row"><ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} /></div>
        <p>{l.tr}</p>
        {ex && <p class="small"><span lang="de">{ex.de}</span><br /><span class="muted">{ex.tr}</span></p>}
      </section>
      <ActionBar><button class="btn primary block" data-test="next" onClick={() => setIntro(false)}>Şimdi sor</button></ActionBar>
    </div>
  );

  const verdict = res && (
    <ActionBar>
      {res.ok ? <FeedbackBand kind="ok" title="Doğru.">{res.expected && <span lang="de">{res.expected}</span>}</FeedbackBand>
        : <FeedbackBand kind="bad" title="Doğrusu bu.">
            <div class="small">Senin cevabın: <span lang="de">{res.answer || "—"}</span></div>
            <div>Doğrusu: <b lang="de">{res.expected}</b></div>
            {res.note && <div class="small">{res.note}</div>}
          </FeedbackBand>}
      <button class="btn primary block" data-test="next" onClick={() => next(res.ok ? "correct" : "wrong")}>Devam</button>
    </ActionBar>
  );

  if (q.type === "listen_meaning" || q.type === "article" || q.type === "colloc") return <ChoiceQ q={q} l={l} all={all} ex={ex} show={show} verdict={verdict} />;

  // ---- aktif: üretim ----
  const form = formFor(l, q.type, q.ex);
  const prompt = q.type === "photo_say" ? <><div class="kicker">Fotoğraftaki ne? Artikeliyle söyle ya da yaz</div><Photo q={l.img} /><p class="small muted">{l.tr}</p></>
    : q.type === "tr_de" ? <><div class="kicker">Almanca söyle ya da yaz</div><div class="de-lg">{l.tr}{isNoun(l) ? " (artikeliyle)" : ""}</div></>
    : q.type === "gap" || q.type === "sep_perfekt" ? <><div class="kicker">Boşluğu doldur</div><div class="de-lg" lang="de">{form?.de}</div>{form?.tr && <p class="small muted">{form.tr}</p>}{form?.hint_tr && <p class="small">{form.hint_tr}</p>}</>
    : <><div class="kicker">Bu kelimeyle kendi cümleni kur</div><div class="de-lg" lang="de"><Art art={l.art} de={l.de} /></div><p class="small muted">{l.tr}{ex ? ` · Örnek: ` : ""}{ex && <span lang="de">{ex.de}</span>}</p></>;

  const submit = (a: string) => {
    if (q.type === "own_sentence") {
      const c = ownSentenceCheck(l, a);
      if (c !== "ok") { show({ ok: false, answer: a, expected: ex?.de || l.de, note: c === "short" ? "En az üç kelimelik bir cümle kur." : "Cümlede bu kelime yok." }); return; }
      setSelfCheck(a); return;
    }
    const acc = accepted(l, q.type, q.ex);
    const hint = numberWordHint(a);
    if (hint && acc.every((x) => !/\d/.test(x))) { show({ ok: false, answer: a, expected: acc[0], note: hint }); return; }
    const v = ruleVerdict(acc, a);
    show({ ok: v.kind === "correct", answer: a, expected: acc[0] });
  };

  if (selfCheck !== null && !res) return (
    <div class="stack fade" data-test="gq-own-check">
      <section class="card stack">{prompt}<div class="de-lg" lang="de">{selfCheck}</div>
        <FeedbackBand kind="info" title="Bunu kendim kontrol edemem.">Cümlen kelimeyi doğru kullanıyor mu? İçinden bir kez yüksek sesle oku.</FeedbackBand></section>
      <ActionBar>
        <button class="btn block" data-test="own-ok" onClick={() => onDone({ ok: true, answer: selfCheck }, "hinted")}>Evet, doğru kurdum</button>
        <button class="btn primary block" data-test="own-unsure" onClick={() => onDone({ ok: true, answer: selfCheck }, null)}>Emin değilim, geç</button>
      </ActionBar>
    </div>
  );

  return (
    <div class="stack fade" data-test={`gq-${q.type}`}>
      <section class="card stack">{prompt}</section>
      {!res && <ActionBar><AnswerField onSubmit={submit} /></ActionBar>}
      {verdict}
    </div>
  );
}

function ChoiceQ({ q, l, all, ex, show, verdict }: { q: GardenQ; l: Lexeme; all: Lexeme[]; ex?: Lexeme["examples"][number]; show: (r: Result) => void; verdict: preact.ComponentChildren }) {
  const m = useMemo(() => {
    if (q.type === "listen_meaning") { const o = meaningOptions(l, all); return { title: "Dinle: ne demek?", stem: null as string | null, ...o, expected: l.tr }; }
    if (q.type === "article") { const opts = ["der", "die", "das"]; return { title: "Hangi artikel?", stem: l.de, opts, ans: opts.indexOf(l.art!), expected: `${l.art} ${l.de}` }; }
    const c = collocQuestion(l, all)!; return { title: `Tamamla: ${c.tr}`, stem: c.stem, opts: c.opts, ans: c.ans, expected: c.stem.replace("___", c.opts[c.ans]!) };
  }, [q.lexId, q.type]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { if (q.type === "listen_meaning") void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, []);
  return (
    <div class="stack fade" data-test={`gq-${q.type}`}>
      <section class="card stack"><div class="kicker">{m.title}</div>
        {q.type === "listen_meaning" ? <div class="row"><ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} /><span class="small muted">Kelime cevaptan sonra görünür</span></div>
          : <div class="de-lg" lang="de">{m.stem}</div>}
        {picked !== null && q.type !== "colloc" && <div class="de-lg" lang="de"><Art art={l.art} de={l.de} /></div>}
        {q.type === "article" && ex && picked !== null && <p class="small" lang="de">{ex.de}</p>}
      </section>
      <div role="group">{m.opts.map((o, k) => <button class={`opt${picked === null ? "" : k === m.ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k}
        {...(E2E ? { "data-right": k === m.ans ? "1" : undefined } : {})} lang={q.type === "listen_meaning" ? undefined : "de"}
        onClick={() => { setPicked(k); show({ ok: k === m.ans, answer: o, expected: m.expected }); }}>{o}</button>)}</div>
      {verdict}
    </div>
  );
}
