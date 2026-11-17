/** Oynatıcının ortak parçaları: cevap kutusu, karar gösterimi, "Bu ne demek?", "Almanca nasıl derim?", "Duyduğum kelime", fotoğraf */
import { useEffect, useState } from "preact/hooks";
import type { PhotoResult } from "@dw/shared";
import { useApp } from "../state.ts";
import { ai, aiState } from "../services/ai.ts";
import { ApiError } from "../services/api.ts";
import { AnswerField, FeedbackBand } from "./kit.tsx";
import { haptic } from "../services/haptics.ts";
import { fillName, redact } from "../core/persona.ts";
import { verdict, type Verdict } from "../core/answer.ts";
import { localSayIt, type LocalEntry } from "../core/sayit.ts";
import { addClaim, addPersonal, cacheGet, cachePut } from "../data/db.ts";

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
      {v.kind === "correct" && <FeedbackBand kind="ok" title="✓ Doğru">{v.via !== "exact" && v.best ? <>Örnek: <span class="de" lang="de">{v.best}</span>{v.note ? <> · {v.note}</> : null}</> : v.note}</FeedbackBand>}
      {v.kind === "wrong" && <FeedbackBand kind="bad" title="Şöyle olmalı:"><span class="de" lang="de" style={{ fontSize: "1.05rem" }}>{v.best}</span>
        {v.words && <div style={{ marginTop: 4 }} lang="de">{v.words.map((w) => <span style={{ marginRight: 4, textDecoration: w.st === "miss" ? "underline wavy" : "none", opacity: w.st === "ok" ? 0.7 : 1 }}>{w.w}</span>)}</div>}
        {v.note && <div>{v.note}</div>}</FeedbackBand>}
      {v.kind === "unchecked" && <FeedbackBand kind="info" title="Kontrol edilemedi — yanlış sayılmadı.">{v.note} Örnek cevap: <span class="de" lang="de">{v.best}</span></FeedbackBand>}
      {v.kind !== "correct" && !claimed && <button class="btn ghost sm" onClick={claim} data-test="claim">Benim cevabım da doğru</button>}
      {claimed && <div class="small muted">Kaydedildi: doğru sayıldı ve içerik ekibinin inceleme listesine eklendi.</div>}
      <button class="btn primary block" onClick={onNext} autoFocus data-test="next">{nextLabel}</button>
    </div>
  );
}

/** "Bu ne demek?" — puan düşürmez; konuşma/akış kaldığı yerden sürer */
export function ExplainBtn({ de, context, onAsked }: { de: string; context?: string; onAsked?: (de: string) => void }) {
  const { api } = useApp();
  const [st, setSt] = useState<{ busy?: boolean; out?: { tr: string; note_tr: string }; err?: string } | null>(null);
  const run = async () => {
    onAsked?.(de);
    if (!aiState(api).available) { setSt({ err: aiState(api).reason }); return; }
    setSt({ busy: true });
    try { const o = await ai(api, "explain_tr", { de: de.slice(0, 120), context: context?.slice(0, 400) }); setSt({ out: o }); }
    catch (e) { setSt({ err: e instanceof ApiError ? e.message_tr : "Açıklama alınamadı." }); }
  };
  return (
    <span>
      <button class="btn ghost sm" onClick={run} data-test="explain">Bu ne demek?</button>
      {st && <div class="fb info small" style={{ marginTop: 6 }}>
        {st.busy && "Açıklanıyor…"}{st.out && <><b>{st.out.tr}</b> — {st.out.note_tr}</>}{st.err && st.err}
        <button class="btn ghost sm" onClick={() => setSt(null)}>Kapat</button></div>}
    </span>
  );
}

/** "Bunu Almanca nasıl derim?" — önce yerel arama, bulunamazsa sunucu; öğe aktif eksik olarak bankaya girer */
export function SayItBox({ entries, level = "A2", context_de, onFound }: { entries: LocalEntry[]; level?: "A1" | "A2" | "B1"; context_de?: string; onFound?: (de: string) => void }) {
  const { api } = useApp();
  const [open, setOpen] = useState(false);
  const [tr, setTr] = useState("");
  const [res, setRes] = useState<{ list?: LocalEntry[]; ai?: { de_simple: string; paraphrase_de?: string; note_tr?: string }; err?: string; busy?: boolean } | null>(null);
  const run = async () => {
    const loc = localSayIt(tr, entries);
    if (loc.length) { setRes({ list: loc }); onFound?.(loc[0]!.de); return; }
    if (!aiState(api).available) { setRes({ err: `Yerel listede bulunamadı. ${aiState(api).reason}` }); return; }
    setRes({ busy: true });
    try { const o = await ai(api, "say_it_de", { tr, level, context_de }); setRes({ ai: o }); onFound?.(o.de_simple); await addPersonal({ id: `sayit:${o.de_simple}`, de: o.de_simple, tr, at: new Date().toISOString(), source: "sayit" }); }
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
    <form class="card stack" style={{ padding: 12 }} onSubmit={async (e) => { e.preventDefault(); if (!de.trim()) return; await addPersonal({ id: `k3:${de.trim()}`, de: de.trim(), tr: tr.trim() || undefined, at: new Date().toISOString(), source: "heard" }); toast("✓ Listene eklendi"); setDe(""); setTr(""); setOpen(false); }}>
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

/** Almanca metne uzun basma = "Bu ne demek?" (EK2 §2). Sistem seçim menüsünün yerini alır; puan düşürmez. */
export function LongPressExplain() {
  const [de, setDe] = useState<string | null>(null);
  useEffect(() => {
    let t: number | undefined; let x0 = 0, y0 = 0;
    const down = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('[lang="de"]') as HTMLElement | null;
      if (!el || el.closest("input,textarea,button,a,.wchip,.opt") || el.tagName === "INPUT") return;
      x0 = e.clientX; y0 = e.clientY;
      t = window.setTimeout(() => { const txt = (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 120); if (txt) { haptic("selection"); setDe(txt); } }, 550);
    };
    const cancel = () => { if (t) { clearTimeout(t); t = undefined; } };
    const move = (e: PointerEvent) => { if (Math.abs(e.clientX - x0) > 8 || Math.abs(e.clientY - y0) > 8) cancel(); };
    const ctx = (e: Event) => { if ((e.target as Element | null)?.closest?.('[lang="de"]') && !(e.target as Element).closest("input,textarea")) e.preventDefault(); };
    document.addEventListener("pointerdown", down); document.addEventListener("pointerup", cancel); document.addEventListener("pointercancel", cancel); document.addEventListener("pointermove", move); document.addEventListener("contextmenu", ctx);
    return () => { cancel(); document.removeEventListener("pointerdown", down); document.removeEventListener("pointerup", cancel); document.removeEventListener("pointercancel", cancel); document.removeEventListener("pointermove", move); document.removeEventListener("contextmenu", ctx); };
  }, []);
  if (!de) return null;
  return (
    <div class="sheet fade" role="dialog" aria-label="Bu ne demek?" data-test="lp-sheet">
      <div class="de-lg" lang="de">{de}</div>
      <div class="row"><ExplainBtn de={de} /><button class="btn ghost sm" onClick={() => setDe(null)}>Kapat</button></div>
    </div>
  );
}
