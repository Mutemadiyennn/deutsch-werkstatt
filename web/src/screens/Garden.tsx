/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu.
 * Kartlar öğrenciye soru olarak döner; cevap öğrenciden beklenir. Yanlışta doğrusu öğrencinin cevabıyla yan yana
 * gösterilir, kart turun sonunda başka örnek ve başka türle yeniden gelir ve kişisel bankaya girer (srs.review).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme, LearnerItem } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadM1Gun } from "../services/content.ts";
import { bahceTamam, xpOku, xpVer } from "../services/ilerleme.ts";
import { Kutlama, Ozet, useOturumXp } from "../ui/solen.tsx";
import { XP, seri } from "../core/gun.ts";
import { itemsMap, personalWords, putItems } from "../data/db.ts";
import { review, sessionKey, type Outcome } from "../core/srs.ts";
import { accepted, buildRound, isCard, personalMatch, collocOf, synonymHit, collocQuestion, formFor, isNoun, meaningOptions, ownSentenceCheck, pathOf, requeue, startedToday, m1Hak, DAILY_ACTIVE, DAILY_NEW, type GardenQ } from "../core/garden.ts";
import { ruleVerdict } from "../core/answer.ts";
import { umlautEksik } from "../core/esdeger.ts";
import { judgeWord, numberWordHint } from "../core/grading.ts";
import { isDue } from "../core/srs.ts";
import { speak, stopSpeaking } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { Art, ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { Photo } from "../ui/learn.tsx";

const E2E = import.meta.env.MODE === "e2e";
/** `yazim`: kelime doğru, yalnızca ümlaut/ß eksik (PM 7004537514-1): kart "bilmiyor" sayılmaz, turun sonunda bir kez daha sorulur */
type Result = { ok: boolean; answer?: string; expected?: string; note?: string; yazim?: boolean };

/**
 * `day`: M1 gününün Seans 1'i (#58 A5b). Havuz: önce önceki günlerin tanıtılmamış kartları, sonra günün kartları, sonra K1.
 * Seans 1'in bitişi tur sayısına değil kanıta bağlı (inceleme #66 P1-3): bu kartların hepsi tanıtılınca (cihazda kaydı
 * olunca) işaretlenir; kalan varsa tur sonunda "Bir tur daha" sunulur ve Bugün yine Seans 1'i gösterir. Günün kartları
 * takvim gününün yeni kart sınırına takılmaz (M1 günü birimdir). İşaret son cevapta yazılır, ekranın boyanmasına bağlı değil.
 */
export function Garden({ day }: { day?: number } = {}) {
  const [tur, setTur] = useState(0);
  return <GardenTur key={tur} day={day} again={() => setTur((x) => x + 1)} />;
}

function GardenTur({ day, again }: { day?: number; again: () => void }) {
  const [data, setData] = useState<{ lex: Map<string, Lexeme>; all: Lexeme[]; items: Map<string, LearnerItem>; round: GardenQ[]; capped: boolean; gunKartlari: string[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  const turXp = useOturumXp();
  const startedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    (async () => {
      const { lexemes } = await loadLexicon();
      const lex = new Map(lexemes.map((l) => [l.id, l]));
      const items = await itemsMap(lexemes.map((l) => l.id));
      // yeni kart sırası: önce M1 gününün yeni kartları (A5b), sonra K1 derin kartlar sıklık sırasıyla
      const k1 = lexemes.filter((l) => l.tier === "K1" && isCard(l)).sort((a, b) => (a.freqRank ?? 9e9) - (b.freqRank ?? 9e9)).map((l) => l.id);
      const gunler = day ? await Promise.all(Array.from({ length: day }, (_, k) => loadM1Gun(k + 1).catch(() => null))) : [];
      const gunKartlari = [...new Set(gunler.flatMap((g) => g?.yeni_kartlar ?? []))].filter((id) => lex.has(id) && isCard(lex.get(id)!));
      const kalan = gunKartlari.filter((id) => !items.has(id));
      const pool = [...kalan, ...k1.filter((id) => !kalan.includes(id))];
      // duyduğun ve "nasıl derim" diye sorduğun kelimeler öncelikli (kişisel banka, #58 A3, LS-7.5)
      const priority = personalMatch(await personalWords(), lexemes);
      const t = startedToday(items.values());
      // M1 gününde günün kartları takvim sınırına takılmaz; kişisel kelimeler (duyduğum, nasıl derim) yalnızca takvim hakkı
      // kalmışsa ve günün kartlarının yerini almadan gelir (inceleme #66 2. tur P1-A)
      const takvim = Math.max(0, DAILY_NEW - t.passive);
      const hak = m1Hak(takvim, kalan.length, priority.length);
      const kisisel = !day || hak.kisiselIzin ? priority : [];
      const newLeft = day ? hak.newLeft : takvim, activeLeft = DAILY_ACTIVE - t.active;
      const round = buildRound(lex, items, pool, { priority: kisisel, newLeft, activeLeft, yeniAyir: Math.min(8, kalan.length) });
      // boş tur: günün kartları zaten tanıtıldıysa Seans 1 burada tamamlanır (ekran efektine bırakılmaz)
      if (day && !round.length && !kalan.length) await bahceTamam(day);
      setData({ lex, all: lexemes, items, round, capped: newLeft <= 0, gunKartlari });
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, []);

  if (err) return <ErrorPanel message={err} onRetry={() => location.reload()} />;
  if (!data) return <Loading />;
  const { round } = data;
  const kalanSayi = data.gunKartlari.filter((id) => !data.items.has(id)).length;
  if (!round.length) return <GardenEmpty day={day} capped={data.capped} />;
  if (i >= round.length) return <GardenDone day={day} score={score} items={data.items} kalan={kalanSayi} again={again} xp={turXp}
    kelimeler={[...new Set(round.filter((q) => q.intro).map((q) => { const l = data.lex.get(q.lexId); return l ? (l.art ? `${l.art} ${l.de}` : l.de) : ""; }).filter(Boolean))]} />;
  const q = round[i]!;
  const l = data.lex.get(q.lexId)!;

  const finish = async (r: Result, outcome: Outcome | null) => {
    if (busy) return; // "Devam"a çift dokunuş aynı değerlendirmeyi iki kez yazmaz (inceleme #59 P2-2)
    setBusy(true);
    try {
      if (outcome) {
        const next = review(data.items.get(q.lexId), { itemId: q.lexId, kind: "lexeme", path: pathOf(q.type), outcome, session: sessionKey("garden", startedAt), source: "drill", ctx: q.type });
        next.lastQ = q.type;
        await putItems([next]);
        data.items.set(q.lexId, next);
      }
    } catch { setBusy(false); setErr("Cevabın kaydedilemedi. Tekrar dene."); return; }
    setBusy(false);
    // "Emin değilim, geç" sayılmaz: ne doğru ne soru (özet tutarlı, inceleme #59 P2-1)
    if (outcome) setScore((s) => ({ ok: s.ok + (r.ok ? 1 : 0), n: s.n + 1 }));
    if (outcome && r.ok) void xpVer(XP.dogru);
    const r2 = !r.ok && outcome ? requeue(round, q, l) : round;
    // son cevap: günün bütün kartları tanıtıldıysa Seans 1 şimdi işaretlenir (inceleme #66 P1-1)
    if (day && i + 1 >= r2.length && data.gunKartlari.every((id) => data.items.has(id))) { try { await bahceTamam(day); } catch { /* bir sonraki açılışta yeniden denenir */ } }
    setData({ ...data, round: r2 });
    setI(i + 1);
  };

  return (
    <div class="stack" data-test="garden">
      <ProgressHeader title="Kelime Bahçesi" back="#/today" right={<FocusChip />} ilerleme={{ n: Math.min(i, round.length - 1), toplam: round.length }} />
      <Question key={`${i}:${q.lexId}:${q.type}`} q={q} l={l} all={data.all} onDone={finish} />
    </div>
  );
}

function Question({ q, l, all, onDone }: { q: GardenQ; l: Lexeme; all: Lexeme[]; onDone: (r: Result, o: Outcome | null) => void }) {
  const [intro, setIntro] = useState(!!q.intro);
  const [res, setRes] = useState<Result | null>(null);
  const [selfCheck, setSelfCheck] = useState<string | null>(null);
  const [ownNote, setOwnNote] = useState(false);
  const [shortNote, setShortNote] = useState(false);
  const [synNote, setSynNote] = useState<string | null>(null);
  const [hinted, setHinted] = useState(false);
  const ex = l.examples[q.ex % Math.max(1, l.examples.length)];
  const show = (r: Result) => { setRes(r); haptic(r.ok ? "success" : "error"); };
  const next = (o: Outcome | null) => onDone(res || { ok: false }, o);

  // önce duy (PM-049 tanıtım): kelime ekrana gelince bir kez okunur (inceleme #59 P2-8)
  useEffect(() => { if (intro) void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, [intro]);
  const col = collocOf(l);
  if (intro) return (
    <div class="stack fade" data-test="garden-intro">
      <section class="card stack"><div class="kicker">Yeni kelime</div>
        <Photo q={l.img} />
        <div class="de-xl" lang="de"><Art art={l.art} de={l.de} /></div>
        <div class="row"><ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} /></div>
        <p>{l.tr}</p>
        {ex && <p class="small"><span lang="de">{ex.de}</span><br /><span class="muted">{ex.tr}</span></p>}
        {col && <p class="small" data-test="intro-colloc">Birlikte: <b lang="de">{col.de}</b> <span class="muted">· {col.tr}</span></p>}
      </section>
      <ActionBar><button class="btn primary block" data-test="next" onClick={() => setIntro(false)}>Şimdi sor</button></ActionBar>
    </div>
  );

  // PM (#59 yorumu): cevaptan sonra, doğru ya da yanlış, kelime cümlesiyle görünür — örnek cümle (dinle), fotoğraf, eşdizim
  const colAfter = collocOf(l);
  const verdict = res && (<>
    <section class="card stack fade" data-test="after-card" data-lex={l.id} data-nex={l.examples.length} ref={(el) => { if (el && !el.dataset.seen) { el.dataset.seen = "1"; requestAnimationFrame(() => el.scrollIntoView({ block: "center", behavior: "smooth" })); } }}>
      <div class="de-lg" lang="de"><Art art={l.art} de={l.de} /> <span class="small muted">· {l.tr}</span></div>
      <Photo q={ex?.img || l.img} />
      {ex && <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}><span class="grow"><span lang="de" data-test="after-ex">{ex.de}</span><br /><span class="small muted">{ex.tr}</span></span><ListenButton text={ex.de} small /></div>}
      {colAfter && <p class="small">Birlikte: <b lang="de">{colAfter.de}</b> <span class="muted">· {colAfter.tr}</span></p>}
    </section>
    {/* geri bildirim bandı yüksek: kart bandın altında kalmasın diye kaydırma payı */}
    <div aria-hidden="true" style={{ height: 180 }} />
    <ActionBar>
      {res.ok ? <FeedbackBand kind="ok" title="Doğru.">{res.expected && <span lang="de">{res.expected}</span>}</FeedbackBand>
        : <FeedbackBand kind={res.yazim ? "info" : "bad"} title={res.yazim ? "Kelime doğru, yazımı eksik." : "Doğrusu bu."}>
            <div class="small">Senin cevabın: <span lang="de">{res.answer || "—"}</span></div>
            <div>Doğrusu: <b lang="de">{res.expected}</b></div>
            {res.note && <div class="small">{res.note}</div>}
          </FeedbackBand>}
      <button class="btn primary block" data-test="next" onClick={() => next(res.ok ? (hinted ? "hinted" : "correct") : res.yazim ? "hinted" : "wrong")}>Devam</button>
    </ActionBar></>
  );

  if (q.type === "listen_meaning" || q.type === "article" || q.type === "colloc") return <ChoiceQ q={q} l={l} all={all} ex={ex} show={show} verdict={verdict} />;

  // ---- aktif: üretim ----
  const form = formFor(l, q.type, q.ex);
  const prompt = q.type === "photo_say" ? <><div class="kicker">Fotoğraftaki ne? Artikeliyle söyle ya da yaz</div><Photo q={l.img} /><p class="small muted">{l.tr}</p></>
    : q.type === "tr_de" ? <><div class="kicker">Almanca söyle ya da yaz</div><div class="de-lg">{l.tr}{isNoun(l) ? " (artikeliyle)" : ""}</div></>
    : q.type === "gap" || q.type === "sep_perfekt" ? <><div class="kicker">Boşluğu doldur: boşluğa gelen kelimeyi ya da bütün cümleyi yaz</div><div class="de-lg" lang="de">{form?.de}</div>{form?.tr && <p class="small muted">{form.tr}</p>}{form?.hint_tr && <p class="small">{form.hint_tr}</p>}</>
    : <><div class="kicker">Bu kelimeyle kendi cümleni kur</div><div class="de-lg" lang="de"><Art art={l.art} de={l.de} /></div><p class="small muted">{l.tr}{ex ? ` · Örnek: ` : ""}{ex && <span lang="de">{ex.de}</span>}</p></>;

  const submit = (a: string, mode: "typed" | "voice") => {
    if (q.type === "own_sentence") {
      const c = ownSentenceCheck(l, a);
      // kısa cümle yeniden yazdırılır (ceza yok); kelimeyi göremediysek yalnızca not düşer, karar öğrencinin (inceleme #59 P1-1)
      if (c === "short") { setShortNote(true); return; }
      setOwnNote(c === "missing"); setSelfCheck(a); return;
    }
    const acc = accepted(l, q.type, q.ex);
    // rakam kuralı yalnızca yazılan cevapta: konuşma tanıma sayıyı rakamla döker (inceleme #59 P1-3)
    const hint = mode === "typed" ? numberWordHint(a) : null;
    if (hint && acc.every((x) => !/\d/.test(x))) { show({ ok: false, answer: a, expected: acc[0], note: hint }); return; }
    // isimde artikel zorunlu ve eksik/yanlış artikel açıklanır (inceleme #59 P2-3)
    // eş anlamlı başka kart (sprechen/reden, Arbeit/Job): yanlış sayılmaz; aranan kelime yeniden istenir (inceleme #59 Y-2)
    const trySyn = () => { if (q.type !== "tr_de") return false; const syn = synonymHit(l, a, all); if (!syn) return false;
      setSynNote(`„${syn.de}“ başka bir kelime. Burada aranan kelimenin ilk harfi: ${l.de[0]}…`); setHinted(true); return true; };
    // ümlautu/ß'si eksik ama kelime doğru: "yazım" (yanlış sayılmaz, kart geri atılmaz)
    const yazim = mode === "typed" ? acc.map((x) => umlautEksik(x, a)).find(Boolean) : undefined;
    if (yazim) { show({ ok: false, answer: a, expected: acc[0], note: yazim, yazim: true }); return; }
    if ((q.type === "tr_de" || q.type === "photo_say") && isNoun(l)) {
      const j = judgeWord(a, l.de, l.art);
      if (!j.ok && trySyn()) return;
      show({ ok: j.ok, answer: a, expected: acc[0], note: j.why_tr }); return;
    }
    const v = ruleVerdict(acc, a);
    if (v.kind !== "correct" && trySyn()) return;
    show({ ok: v.kind === "correct", answer: a, expected: acc[0] });
  };

  if (selfCheck !== null && !res) return (
    <div class="stack fade" data-test="gq-own-check">
      <section class="card stack">{prompt}<div class="de-lg" lang="de">{selfCheck}</div>
        <FeedbackBand kind="info" title="Bunu kendim kontrol edemem.">
          {ownNote && <div class="small" data-test="own-missing">Cümlende bu kelimeyi göremedim. Çekimli hâlini kullandıysan doğru olabilir.</div>}
          Cümlen kelimeyi doğru kullanıyor mu? Bir kez yüksek sesle oku.{ex && <> Örnek: <span lang="de">{ex.de}</span></>}</FeedbackBand></section>
      <ActionBar>
        <button class="btn primary block" data-test="own-ok" onClick={() => onDone({ ok: true, answer: selfCheck }, "hinted")}>Evet, doğru kurdum</button>
        <button class="btn block" data-test="own-unsure" onClick={() => onDone({ ok: true, answer: selfCheck }, null)}>Emin değilim, geç</button>
      </ActionBar>
    </div>
  );

  return (
    <div class="stack fade" data-test={`gq-${q.type}`}>
      <section class="card stack">{prompt}{shortNote && <p class="small" data-test="own-short">En az üç kelimelik bir cümle kur.</p>}{synNote && <p class="small" data-test="syn-note">{synNote}</p>}</section>
      {!res && <ActionBar><AnswerField onSubmit={submit} /></ActionBar>}
      {verdict}
    </div>
  );
}

function ChoiceQ({ q, l, all, ex, show, verdict }: { q: GardenQ; l: Lexeme; all: Lexeme[]; ex?: Lexeme["examples"][number]; show: (r: Result) => void; verdict: preact.ComponentChildren }) {
  const m = useMemo(() => {
    if (q.type === "listen_meaning") { const o = meaningOptions(l, all); return { title: "Dinle: ne demek?", stem: null as string | null, ...o, expected: l.tr }; }
    if (q.type === "article") { const opts = ["der", "die", "das"]; return { title: "Hangi artikel?", stem: l.de, opts, ans: opts.indexOf(l.art!), expected: `${l.art} ${l.de}` }; }
    const c = collocQuestion(l, all);
    // yeterli güvenli çeldirici yoksa anlam sorusuna düşer (tek doğru cevap kuralı)
    if (!c) { const o = meaningOptions(l, all); return { title: "Ne demek?", stem: isNoun(l) ? `${l.art} ${l.de}` : l.de, ...o, expected: l.tr }; }
    return { title: `Tamamla: ${c.tr}`, stem: c.stem, opts: c.opts, ans: c.ans, expected: c.stem.replace("___", c.opts[c.ans]!) };
  }, [q.lexId, q.type]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { if (q.type === "listen_meaning") void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, []);
  return (
    <div class="stack fade" data-test={`gq-${q.type}`}>
      <section class="card stack"><div class="kicker">{m.title}</div>
        {q.type === "listen_meaning" ? <div class="row"><ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} /><span class="small muted">Kelime cevaptan sonra görünür</span></div>
          : <div class="de-lg" lang="de">{m.stem}</div>}
        {picked !== null && q.type !== "colloc" && <div class="de-lg" lang="de"><Art art={l.art} de={l.de} /></div>}
      </section>
      <div role="group">{m.opts.map((o, k) => <button class={`opt${picked === null ? "" : k === m.ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k}
        {...(E2E ? { "data-right": k === m.ans ? "1" : undefined } : {})} lang={m.expected === l.tr ? undefined : "de"}
        onClick={() => { setPicked(k); show({ ok: k === m.ans, answer: o, expected: m.expected }); }}>{o}</button>)}</div>
      {verdict}
    </div>
  );
}

/** Tur sonu: yarın kaç kart dönecek (somut "sırada ne var") */
function tomorrow(items: Map<string, LearnerItem>): string {
  const t = new Date(Date.now() + 24 * 3600_000);
  let n = 0;
  for (const it of items.values()) if (isDue(it, "passive", t) || isDue(it, "active", t)) n++;
  return n ? `Yarın ${n} kart seni bekliyor.` : "Yarın yeni kartlar gelecek.";
}

/** Tur sonu. M1 gününde günün kartlarından tanıtılmamış kalan varsa ana eylem "Bir tur daha" (Seans 1 henüz bitmedi) */
function GardenDone({ day, score, items, kalan, again, xp, kelimeler }: { day?: number; score: { ok: number; n: number }; items: Map<string, LearnerItem>; kalan: number; again: () => void; xp: number; kelimeler: string[] }) {
  const devam = !!day && kalan > 0;
  const [seriGun, setSeriGun] = useState<number | undefined>();
  useEffect(() => { void xpOku().then((x) => setSeriGun(seri(x))); }, []);
  return (
    <div class="stack"><ProgressHeader title="Kelime Bahçesi" back="#/today" />
      <section class="card stack" data-test="garden-done"><Kutlama><h2>Tur bitti</h2></Kutlama>
        <Ozet dogru={score.ok} toplam={score.n} xp={xp} seriGun={seriGun} kelimeler={kelimeler} yarin={devam ? undefined : tomorrow(items).replace(/^Yarın /, "")} />
        {score.ok < score.n && <p class="small">Yanlış olanlar yarın ya da birkaç gün sonra başka bir soruyla geri gelecek.</p>}
        {devam ? <p data-test="garden-kalan">Bugünün kartlarından <b>{kalan}</b> yeni kelime kaldı.</p> : <p class="small muted" data-test="garden-tomorrow">{tomorrow(items)}</p>}
        {devam ? <ActionBar><button class="btn primary block" data-test="garden-again" onClick={again}>Bir tur daha</button></ActionBar>
          : <a class="btn primary block" href="#/today" data-test="garden-back">{day ? "Sıradaki adıma geç" : "Bugün'e dön"}</a>}</section></div>
  );
}

/** Soru yoksa (günün kartları tanıtılmışsa Seans 1 yüklemede işaretlendi) */
function GardenEmpty({ day, capped }: { day?: number; capped: boolean }) {
  return (
    <div class="stack"><ProgressHeader title="Kelime Bahçesi" back="#/today" />
      <section class="card stack" data-test="garden-empty"><h2>Bugün bahçe sakin</h2>
        <p>{capped ? "Bugünkü yeni kartların bitti ve vadesi gelen kart yok. Yarın yeni kartlar ve tekrarlar seni bekliyor." : "Şu an vadesi gelen kart yok. Yeni kart da kalmadı."}</p>
        <a class="btn primary block" href="#/today">{day ? "Sıradaki adıma geç" : "Bugün'e dön"}</a></section></div>
  );
}
