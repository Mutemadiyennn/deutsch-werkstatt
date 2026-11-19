/**
 * Ortak alıştırma maddesi (#58 A5; temel ders, ileride prova ve okuma soruları): `Drill` şemasının bütün türleri.
 * Değerlendirme yapay zekâsız ve iki yönlü doğru (RQ-Ş21): kurallar → tanınmayan cevapta karar öğrencinin (D-097),
 * dönüşümde verilen cümlenin tekrarı doğru değil, `strictNumberWords` maddede yazılan rakam kabul edilmez (yalnızca yazıda).
 */
import { useMemo, useState } from "preact/hooks";
import type { Drill } from "@dw/shared";
import { countsAsCorrect, isSameAsGiven, ruleVerdict } from "../core/answer.ts";
import { norm, numberWordHint } from "../core/grading.ts";
import { fillName } from "../core/persona.ts";
import { addClaim } from "../data/db.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton } from "./kit.tsx";
import { Rich } from "./rich.tsx";

const E2E = import.meta.env.MODE === "e2e";
export type DrillSonuc = "correct" | "wrong" | "claimed";

/** Sayı, gün, ay ve saat kelimeleri: bunlardan biri farklıysa cevap "yakın" değil, yanlıştır (on yedi ≠ on altı) */
const ANAHTAR = new RegExp("^(null|eins?|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\\w*zehn|\\w*zig|\\w*und\\w*zig|hundert|tausend|halb|viertel|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|heute|morgen|gestern|übermorgen|vorgestern)$", "i");
const SAYI_KELIME = /\b(null|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\w+zehn|\w+zig|hundert)\b/i;
const kelimeler = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"]/g, " ").split(/\s+/).filter(Boolean);

/**
 * Bir maddeyi değerlendirir (saf; test edilir).
 *  - {name} yuvası öğrencinin cevabındaki adla doldurulur (ad girilmemiş profil; fillName)
 *  - kabul listesinde birebir olan cevap her zaman doğru (ör. "Du bist müde?" tonlamalı soru, dönüşümde de)
 *  - sayı kelimesiyle cevaplanan maddede yazılan rakam kabul edilmez (strictNumberWords; içerikte işaret yoksa kabul
 *    cevabında sayı kelimesi ve rakam yoksa kendiliğinden) — yalnızca yazıda
 *  - sayı/gün/ay kelimesi farklıysa "kontrol edemedim" değil yanlış
 */
export function drillVerdict(d: Drill, answer: string, typed = true): { kind: "correct" | "wrong" | "unchecked"; best: string; note?: string } {
  if (d.k === "pick") return { kind: "wrong", best: d.opts[d.ans] ?? "" };
  const acc = d.accepted.map((a) => fillName(a, answer));
  const best = d.k === "gap" ? d.de.replace("___", acc[0]!) : acc[0]!;
  const list = d.k === "gap" ? [...acc, ...acc.map((a) => d.de.replace("___", a))] : acc;
  // rakam kuralı norm() karşılaştırmasından ÖNCE: norm rakamı yazıya çevirir ("17" = "siebzehn")
  const strict = d.strictNumberWords ?? (acc.every((x) => !/\d/.test(x)) && acc.some((x) => SAYI_KELIME.test(x)));
  if (typed && strict && acc.every((x) => !/\d/.test(x))) { const h = numberWordHint(answer); if (h) return { kind: "wrong", best, note: h }; }
  if (list.some((a) => norm(a) === norm(answer))) return { kind: "correct", best };
  if (d.k === "transform" && isSameAsGiven(d.from_de, answer)) return { kind: "wrong", best, note: "Verilen cümleyi tekrarladın; istenen biçimde söyle." };
  const v = ruleVerdict(list, answer);
  if (v.kind === "correct") return { kind: "correct", best };
  if (v.kind === "ask_ai") {
    // anahtar kelime (sayı, gün, ay) farkı açık bir yanlıştır; kararı öğrenciye bırakmayız
    const a = new Set(kelimeler(answer)), e = new Set(kelimeler(v.best || best));
    const fark = [...e].filter((w) => !a.has(w)).concat([...a].filter((w) => !e.has(w)));
    if (fark.some((w) => ANAHTAR.test(w))) return { kind: "wrong", best, note: undefined };
    return { kind: "unchecked", best };
  }
  return { kind: "wrong", best, note: undefined };
}

const KICKER: Record<Drill["k"], string> = {
  pick: "Seç", gap: "Boşluğu doldur", order: "Sıraya koy", transform: "Dönüştür", guided_response: "Cevap ver",
  listen_and_respond: "Dinle ve cevap ver", tr_de: "Almanca söyle"
};

export function DrillView({ d, sira, onDone }: { d: Drill; sira?: string; onDone: (s: DrillSonuc) => void }) {
  const [v, setV] = useState<{ kind: "correct" | "wrong" | "unchecked"; best: string; note?: string; a: string } | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const kicker = `${KICKER[d.k]}${sira ? ` · ${sira}` : ""}`;
  const done = (s: DrillSonuc) => { setV(null); setPicked(null); onDone(s); };

  if (d.k === "pick") return (
    <section class="card stack fade" data-test="drill-pick">
      <div class="kicker">{kicker}</div>
      <h3><Rich text={d.q_tr} /></h3>
      <div role="group">{d.opts.map((o, k) => <button class={`opt${picked === null ? "" : k === d.ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k}
        {...(E2E ? { "data-right": k === d.ans ? "1" : undefined } : {})} onClick={() => { setPicked(k); haptic(k === d.ans ? "success" : "error"); }}>{o}</button>)}</div>
      {picked !== null && <ActionBar>
        <FeedbackBand kind={picked === d.ans ? "ok" : "bad"} title={picked === d.ans ? "Doğru." : `Doğrusu: ${d.opts[d.ans]}`}>{d.why_tr && <Rich text={d.why_tr} />}</FeedbackBand>
        <button class="btn primary block" data-test="next" onClick={() => done(picked === d.ans ? "correct" : "wrong")}>Devam</button></ActionBar>}
    </section>
  );

  const prompt = d.k === "gap" ? <><div class="de-lg" lang="de">{d.de.split("___").map((p, j) => <>{j > 0 && <span class="gapblank" aria-label="boşluk" />}{p}</>)}</div><p class="small muted">{d.tr}</p><p class="tiny muted">Boşluğa gelen kelimeyi ya da bütün cümleyi yaz.</p></>
    : d.k === "order" ? <><div class="de-lg">{d.tr}</div></>
    : d.k === "transform" ? <><p class="small"><Rich text={d.instr_tr} /></p><div class="de-lg" lang="de">{d.from_de}</div></>
    : d.k === "guided_response" ? <><p class="small"><Rich text={d.situation_tr} /></p><div class="row"><ListenButton text={d.prompt_de} small /><span class="de" lang="de">„{d.prompt_de}“</span></div></>
    : d.k === "listen_and_respond" ? <>{d.situation_tr && <p class="small"><Rich text={d.situation_tr} /></p>}<div class="row"><ListenButton text={d.audio_de} speed={d.speed} /></div><p class="tiny muted">Metin gösterilmiyor: yalnızca dinle.</p></>
    : <div class="de-lg">{d.tr}</div>;
  const cevap = d.k === "gap" ? d.accepted[0] : d.accepted[0];
  const submit = (a: string, mode: "typed" | "voice") => { const r = drillVerdict(d, a, mode === "typed"); setV({ ...r, a }); haptic(r.kind === "correct" ? "success" : r.kind === "wrong" ? "error" : "selection"); };
  return (
    <section class="card stack fade" data-test={`drill-${d.k}`} {...(E2E ? { "data-cevap": cevap } : {})}>
      <div class="kicker">{kicker}</div>
      {prompt}
      {!v && (d.k === "order" ? <OrderChips target={d.accepted[0]!} given={d.de} onSubmit={(a) => submit(a, "typed")} /> : <ActionBar><AnswerField onSubmit={submit} /></ActionBar>)}
      {v && <ActionBar>
        {v.kind === "correct" ? <FeedbackBand kind="ok" title="Doğru."><span lang="de">{v.a}</span></FeedbackBand>
          : v.kind === "unchecked" ? <FeedbackBand kind="info" title="Bu cevabı kendim kontrol edemedim.">
              <div class="small">Senin cevabın: <span lang="de">{v.a}</span></div><div>Örnek: <b lang="de">{v.best}</b></div>
              <div class="small">İkisi aynı şeyi mi söylüyor? Emin değilsen örneği öğren.</div></FeedbackBand>
          : <FeedbackBand kind="bad" title="Doğrusu bu."><div class="small">Senin cevabın: <span lang="de">{v.a}</span></div><div><b lang="de">{v.best}</b></div>
              {v.note && <div class="small">{v.note}</div>}{d.why_tr && <div class="small"><Rich text={d.why_tr} /></div>}</FeedbackBand>}
        {v.kind === "unchecked"
          ? <><button class="btn primary block" data-test="next" onClick={() => done("wrong")}>Örneği öğrendim, devam</button>
              <button class="btn block" data-test="claim" onClick={() => { void addClaim({ at: new Date().toISOString(), scenarioId: "temel", itemId: d.id, prompt: d.k === "tr_de" ? d.tr : d.k === "transform" ? d.instr_tr : d.k === "gap" || d.k === "order" ? d.tr : d.situation_tr ?? "", answer: v.a, expected: d.accepted }); done(countsAsCorrect("unchecked", true) ? "claimed" : "wrong"); }}>Benimki de aynı anlamda</button></>
          : <button class="btn primary block" data-test="next" onClick={() => done(v.kind === "correct" ? "correct" : "wrong")}>Devam</button>}
      </ActionBar>}
    </section>
  );
}

/** Sıraya koy: içerik karışık sırayı "a / b / c" olarak verir (d.de); vermezse hedef cümle karıştırılır */
function OrderChips({ target, given, onSubmit }: { target: string; given?: string; onSubmit: (s: string) => void }) {
  const chips = useMemo(() => {
    if (given && given.includes(" / ")) return given.split(" / ").map((w) => w.trim()).filter(Boolean);
    const t = target.split(/\s+/).map((w) => w.replace(/[.,!?;:„“"]/g, "")).filter(Boolean);
    let h = 0; for (const c of target) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return t.map((w, i) => ({ w, k: ((h ^ (i * 2654435761)) >>> 0) % 997 })).sort((x, y) => x.k - y.k).map((x) => x.w);
  }, [target, given]);
  const [sel, setSel] = useState<number[]>([]);
  return (
    <div class="stack">
      <div class="slot" aria-label="Kurduğun cümle" lang="de">{sel.map((k, p) => <button class="wchip" onClick={() => setSel(sel.filter((_, j) => j !== p))}>{chips[k]}</button>)}</div>
      <div class="row" lang="de">{chips.map((c, k) => <button class={`wchip${sel.includes(k) ? " used" : ""}`} disabled={sel.includes(k)} data-chip={c} onClick={() => { haptic("selection"); setSel([...sel, k]); }}>{c}</button>)}</div>
      <button class="btn primary block" disabled={sel.length !== chips.length} onClick={() => onSubmit(sel.map((k) => chips[k]).join(" "))} data-test="submit">Kontrol et</button>
    </div>
  );
}
