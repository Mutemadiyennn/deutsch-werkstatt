/** Oynatıcının ortak parçaları: cevap kutusu, karar gösterimi, "Bu ne demek?", "Almanca nasıl derim?", "Duyduğum kelime", fotoğraf */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme, PhotoResult } from "@dw/shared";
import { useApp } from "../state.ts";
import { ai, aiState } from "../services/ai.ts";
import { ApiError } from "../services/api.ts";
import { AnswerField, FeedbackBand } from "./kit.tsx";
import { haptic } from "../services/haptics.ts";
import { fillName, redact } from "../core/persona.ts";
import { verdict, type Verdict } from "../core/answer.ts";
import { localSayIt, type LocalEntry } from "../core/sayit.ts";
import { addClaim, addPersonal, cacheGet, cachePut } from "../data/db.ts";
import { noktadakiKelime, yerelAcikla, type YerelAciklama } from "../core/sozluk.ts";
import { loadLexicon } from "../services/content.ts";

/** Cihazdaki sözlük (içerik paketi; çevrimdışı da var). Yüklenemezse boş liste: "Bu ne demek?" yine yapay zekâya sorabilir */
function useSozluk(): Lexeme[] | null {
  const [lex, setLex] = useState<Lexeme[] | null>(null);
  useEffect(() => {
    let canli = true;
    // sözlük 8 sn'de gelmezse boş listeyle devam (yapay zekâya sorma yolu açık kalır; inceleme #76 P2)
    const t = setTimeout(() => { if (canli) setLex((l) => l ?? []); }, 8000);
    loadLexicon().then((x) => { if (canli) setLex(x.lexemes); }, () => { if (canli) setLex((l) => l ?? []); }).finally(() => clearTimeout(t));
    return () => { canli = false; clearTimeout(t); };
  }, []);
  return lex;
}

function YerelCevap({ a }: { a: YerelAciklama }) {
  if (a.kaynak === "kelimeler") return <div data-test="yerel-kelimeler">{a.kelimeler!.map((k) => <div><b lang="de">{k.art ? `${k.art} ` : ""}{k.de}</b> — {k.tr}</div>)}</div>;
  return <div data-test="yerel-cevap"><b lang="de">{a.art ? `${a.art} ` : ""}{a.de}</b> — {a.tr}{a.kart && <span class="muted"> ({a.kart})</span>}</div>;
}

/** Yazı ya da konuşma ile cevap (tasarım sistemi: AnswerField) */
export function AnswerBox({ onSubmit, placeholder, disabled }: { onSubmit: (s: string) => void; placeholder?: string; disabled?: boolean }) {
  return <AnswerField onSubmit={(t) => onSubmit(t)} placeholder={placeholder} disabled={disabled} />;
}

/** Değerlendirici: kurallar → (gerekirse) sunucudaki öğretmen; hata = "kontrol edilemedi" */
export function useGrader() {
  const { api, profile } = useApp();
  const persona = { name: profile.displayName, address: profile.address };
  // D-061: ad girilmemişse {name} yuvası cevaptan doldurulur
  return (accepted0: string[], answer: string, prompt_tr: string) => { const accepted = accepted0.map((a) => fillName(a, answer)); return verdict(accepted, answer, prompt_tr, aiState(api).available ? async (exp, ans, p) => ai(api, "equiv_check", { prompt_tr: p.slice(0, 300), expected: exp.slice(0, 6).map((x) => redact(x, persona)), answer: redact(ans, persona).slice(0, 300) }) : undefined); };
}

export function VerdictView({ v, answer, onNext, onClaim, itemId, scenarioId, prompt, accepted, nextLabel = "Devam" }: { v: Verdict; answer: string; onNext: () => void; onClaim?: () => void; itemId: string; scenarioId?: string; prompt: string; accepted: string[]; nextLabel?: string }) {
  const [claimed, setClaimed] = useState(false);
  const claim = async () => { await addClaim({ at: new Date().toISOString(), scenarioId, itemId, prompt, answer, expected: accepted }); setClaimed(true); onClaim?.(); };
  return (
    <div class="stack fade" data-test="verdict">
      {v.kind === "correct" && <FeedbackBand kind="ok" title="Doğru">{v.via !== "exact" && v.best ? <>Örnek: <span class="de" lang="de">{v.best}</span>{v.note ? <> · {v.note}</> : null}</> : v.note}</FeedbackBand>}
      {v.kind === "wrong" && <FeedbackBand kind="bad" title="Şöyle olmalı:"><span class="de" lang="de" style={{ fontSize: "1.05rem" }}>{v.best}</span>
        {v.words && <div style={{ marginTop: 4 }} lang="de">{v.words.map((w) => <span style={{ marginRight: 4, textDecoration: w.st === "miss" ? "underline wavy" : "none", opacity: w.st === "ok" ? 0.7 : 1 }}>{w.w}</span>)}</div>}
        {v.note && <div>{v.note}</div>}</FeedbackBand>}
      {v.kind === "unchecked" && <FeedbackBand kind="info" title="Bu cevabı kendim kontrol edemedim.">Doğrusu: <span class="de" lang="de" style={{ fontSize: "1.05rem" }}>{v.best}</span><div>Seninki aynı anlama mı geliyordu?</div></FeedbackBand>}
      {v.kind === "unchecked" && !claimed ? <>
        <button class="btn block" onClick={claim} data-test="claim">Evet, aynı anlamda</button>
        <button class="btn primary block" onClick={onNext} autoFocus data-test="next">Hayır, doğrusunu öğrendim</button>
      </> : <>
        {v.kind === "wrong" && !claimed && <button class="btn ghost sm" onClick={claim} data-test="claim">Benim cevabım da doğru</button>}
        {claimed && <div class="small muted">Kaydedildi: doğru sayıldı ve içerik ekibinin inceleme listesine eklendi.</div>}
        <button class="btn primary block" onClick={onNext} autoFocus data-test="next">{nextLabel}</button>
      </>}
    </div>
  );
}

/**
 * "Bu ne demek?" — puan düşürmez; konuşma/akış kaldığı yerden sürer. #58 A11: cevap önce cihazdaki sözlükten (ifade, kelime,
 * cümlede kelime kelime); yapay zekâ yalnızca yerel cevap yoksa ya da cümlenin tamamı istenirse, ad maskelenerek (D-061).
 */
export function ExplainBtn({ de, context, onAsked, acik: ilk = false }: { de: string; context?: string; onAsked?: (de: string) => void; acik?: boolean }) {
  const { api, profile } = useApp();
  const lex = useSozluk();
  const [acik, setAcik] = useState(ilk);
  const [st, setSt] = useState<{ busy?: boolean; out?: { tr: string; note_tr: string }; err?: string } | null>(null);
  const yerel = useMemo(() => (acik && lex ? yerelAcikla(de, lex) : null), [acik, lex, de]);
  useEffect(() => { setAcik(ilk); setSt(null); }, [de]);
  const sor = async () => {
    if (!aiState(api).available) { setSt({ err: aiState(api).reason }); return; }
    setSt({ busy: true });
    const persona = { name: profile.displayName, address: profile.address };
    try { const o = await ai(api, "explain_tr", { de: redact(de, persona).slice(0, 120), context: context ? redact(context, persona).slice(0, 400) : undefined }); setSt({ out: o }); }
    catch (e) { setSt({ err: e instanceof ApiError ? e.message_tr : "Açıklama alınamadı." }); }
  };
  const tamCevap = !!yerel && yerel.kaynak !== "kelimeler";
  return (
    <span>
      {!ilk && <button class="btn ghost sm" onClick={() => { onAsked?.(de); setAcik(true); }} data-test="explain">Bu ne demek?</button>}
      {acik && <div class="fb info small stack" style={{ marginTop: 6 }} data-test="explain-out">
        {!lex ? "Sözlük açılıyor…" : yerel ? <YerelCevap a={yerel} /> : !st && <div data-test="yerel-yok">Cihazdaki sözlükte yok.{!aiState(api).available && <> {aiState(api).reason}</>}</div>}
        {lex && !st && aiState(api).available && <button class="btn ghost sm" onClick={sor} data-test="explain-ai">{!yerel ? "Öğretmene sor" : tamCevap ? "Bu cümlede ne demek? Öğretmene sor" : "Cümlenin tamamını öğretmene sor"}</button>}
        {st && <div>{st.busy && "Açıklanıyor…"}{st.out && <><b>{st.out.tr}</b> — {st.out.note_tr}</>}{st.err && st.err}</div>}
        {!ilk && <button class="btn ghost sm" onClick={() => { setAcik(false); setSt(null); }}>Kapat</button>}</div>}
    </span>
  );
}

/** "Bunu Almanca nasıl derim?" — önce yerel arama, bulunamazsa sunucu; öğe aktif eksik olarak bankaya girer */
export function SayItBox({ entries, level = "A2", context_de, onFound }: { entries: LocalEntry[]; level?: "A1" | "A2" | "B1"; context_de?: string; onFound?: (de: string) => void }) {
  const { api, profile } = useApp();
  const [open, setOpen] = useState(false);
  const [tr, setTr] = useState("");
  const [res, setRes] = useState<{ list?: LocalEntry[]; ai?: { de_simple: string; paraphrase_de?: string; note_tr?: string }; err?: string; busy?: boolean } | null>(null);
  const run = async () => {
    const loc = localSayIt(tr, entries);
    if (loc.length) { setRes({ list: loc }); onFound?.(loc[0]!.de); return; }
    if (!aiState(api).available) { setRes({ err: `Yerel listede bulunamadı. ${aiState(api).reason}` }); return; }
    setRes({ busy: true });
    // D-061: öğrencinin yazdığı Türkçe ve bağlam cümlesindeki ad maskelenir (inceleme #75 P1-2)
    const persona = { name: profile.displayName, address: profile.address };
    try { const o = await ai(api, "say_it_de", { tr: redact(tr, persona), level, context_de: context_de ? redact(context_de, persona) : undefined }); setRes({ ai: o }); onFound?.(o.de_simple); await addPersonal({ id: `sayit:${o.de_simple}`, de: o.de_simple, tr, at: new Date().toISOString(), source: "sayit" }); }
    catch (e) { setRes({ err: e instanceof ApiError ? e.message_tr : "Bulunamadı." }); }
  };
  if (!open) return <button class="btn ghost sm" onClick={() => setOpen(true)} data-test="sayit">Almanca nasıl derim?</button>;
  return (
    <div class="card stack" style={{ padding: 12 }}>
      <form class="row" style={{ flexWrap: "nowrap" }} onSubmit={(e) => { e.preventDefault(); if (tr.trim()) void run(); }}>
        <input class="input" placeholder="Türkçe yaz…" value={tr} onInput={(e) => setTr((e.target as HTMLInputElement).value)} aria-label="Türkçe" data-test="sayit-in" />
        <button class="btn sm" type="submit">Bul</button>
      </form>
      {res?.busy && <p class="small muted">Aranıyor…</p>}
      {res?.list && res.list.map((x) => <div class="small"><span class="de">{x.de}</span> <span class="muted">— {x.tr}</span></div>)}
      {res?.ai && <div class="small"><span class="de">{res.ai.de_simple}</span>{res.ai.paraphrase_de && <> · <span class="de">{res.ai.paraphrase_de}</span></>}{res.ai.note_tr && <div class="muted">{res.ai.note_tr}</div>}</div>}
      {res?.err && <div class="fb warn small">{res.err}</div>}
      <p class="tiny muted">Puan düşmez; kişisel tekrar listene eklenir.</p>
      <button class="btn ghost sm" onClick={() => { setOpen(false); setRes(null); setTr(""); }}>Kapat</button>
    </div>
  );
}

/** "Duyduğum kelime" — dışarıda duyduğun kelimeyi hızla ekle (K3) */
export function HeardWordBox() {
  const { toast } = useApp();
  const [open, setOpen] = useState(false);
  const [de, setDe] = useState(""); const [tr, setTr] = useState("");
  if (!open) return <button class="btn sm" onClick={() => setOpen(true)} data-test="heard">+ Duyduğum kelime</button>;
  return (
    <form class="card stack" style={{ padding: 12 }} onSubmit={async (e) => { e.preventDefault(); if (!de.trim()) return; await addPersonal({ id: `k3:${de.trim()}`, de: de.trim(), tr: tr.trim() || undefined, at: new Date().toISOString(), source: "heard" }); toast("Listene eklendi"); setDe(""); setTr(""); setOpen(false); }}>
      <input class="input" lang="de" placeholder="Duyduğun Almanca kelime/ifade" value={de} onInput={(e) => setDe((e.target as HTMLInputElement).value)} aria-label="Almanca" data-test="heard-de" />
      <input class="input" placeholder="Anlamı (biliyorsan, isteğe bağlı)" value={tr} onInput={(e) => setTr((e.target as HTMLInputElement).value)} aria-label="Türkçe" />
      <div class="row"><button class="btn primary sm" type="submit">Ekle</button><button type="button" class="btn ghost sm" onClick={() => setOpen(false)}>Vazgeç</button></div>
    </form>
  );
}

/** Kelime fotoğrafı (yalnızca somut kelimeler; sunucu yoksa gösterilmez). Aynı fotoğraf art arda gösterilmez (v1 kuralı). */
const lastShown = new Map<string, number>();
export function Photo({ q }: { q?: string }) {
  const { api } = useApp();
  const [p, setP] = useState<PhotoResult | null>(null);
  useEffect(() => {
    let live = true; setP(null);
    if (!q || !api.configured) return;
    (async () => {
      let list = await cacheGet<PhotoResult[]>(`photo:${q}`, 30 * 86400_000);
      if (!list) { try { list = await api.photos(q); await cachePut(`photo:${q}`, list); } catch { return; } }
      if (!list?.length || !live) return;
      const prev = lastShown.get(q);
      const pick = list.find((x) => x.id !== prev) || list[0]!;
      lastShown.set(q, pick.id); setP(pick);
    })();
    return () => { live = false; };
  }, [q]);
  if (!p) return null;
  return <figure style={{ margin: 0 }}><img src={p.src} alt={p.alt} style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 12 }} loading="lazy" /><figcaption class="tiny muted">Foto: {p.credit} · Pexels</figcaption></figure>;
}

/**
 * Almanca metne uzun basma = "Bu ne demek?" (EK2 §2). Sistem seçim menüsünün yerini alır; puan düşürmez.
 * #58 A11: parmağın altındaki kelime ve cümle, yapay zekâ beklenmeden cihazdaki sözlükten hemen açıklanır.
 */
export function LongPressExplain() {
  const [sec, setSec] = useState<{ de: string; kelime: string | null } | null>(null);
  useEffect(() => {
    let t: number | undefined; let x0 = 0, y0 = 0, pid = -1;
    const down = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('[lang="de"]') as HTMLElement | null;
      if (!el || el.closest("input,textarea,button,a,.wchip,.opt") || el.tagName === "INPUT") return;
      cancel(); x0 = e.clientX; y0 = e.clientY; pid = e.pointerId;
      // metin basış anında alınır: zamanlayıcı dolarken öğe yeniden çizilse ya da ayrılsa bile sayfa açılır (WebKit)
      const txt = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
      if (!txt) return;
      let kelime: string | null = null;
      try { kelime = noktadakiKelime(e.clientX, e.clientY, el); } catch { kelime = null; }
      t = window.setTimeout(() => { t = undefined; try { haptic("selection"); } catch { /* yok say */ } setSec({ de: txt, kelime }); }, 550);
    };
    const cancel = () => { if (t) { clearTimeout(t); t = undefined; } };
    // yalnızca basışı başlatan işaretçi iptal eder: başka bir işaretçinin (fare/üzerinde gezinme, ikinci parmak) hareketi basışı bozmaz
    const up = (e: PointerEvent) => { if (e.pointerId === pid) cancel(); };
    const move = (e: PointerEvent) => { if (e.pointerId === pid && (Math.abs(e.clientX - x0) > 8 || Math.abs(e.clientY - y0) > 8)) cancel(); };
    const ctx = (e: Event) => { if ((e.target as Element | null)?.closest?.('[lang="de"]') && !(e.target as Element).closest("input,textarea")) e.preventDefault(); };
    document.addEventListener("pointerdown", down); document.addEventListener("pointerup", up); document.addEventListener("pointercancel", up); document.addEventListener("pointermove", move); document.addEventListener("contextmenu", ctx);
    return () => { cancel(); document.removeEventListener("pointerdown", down); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); document.removeEventListener("pointermove", move); document.removeEventListener("contextmenu", ctx); };
  }, []);
  if (!sec) return null;
  const tekKelime = !sec.kelime || sec.kelime === sec.de.replace(/[.,!?;:„“"]/g, "").trim();
  return (
    <div class="sheet fade stack" role="dialog" aria-label="Bu ne demek?" data-test="lp-sheet">
      {!tekKelime && <div data-test="lp-kelime"><ExplainBtn de={sec.kelime!} acik /></div>}
      <div class="de-lg" lang="de">{sec.de}</div>
      <ExplainBtn de={sec.de} acik />
      <div class="row"><button class="btn ghost sm" onClick={() => setSec(null)} data-test="lp-kapat">Kapat</button></div>
    </div>
  );
}
