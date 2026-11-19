/**
 * Tasarım sistemi bileşenleri (EK 1 + EK 2 §7): ekranlar yalnızca bunlardan kurulur.
 * Kart, Düğme, Ses düğmesi (yavaş/normal), Cevap alanı + harf şeridi, Geri bildirim bandı, İlerleme çubuğu, Hata paneli, Ana eylem çubuğu, Boş/yükleniyor durumları.
 */
import { createContext, type ComponentChildren } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import type { Speed } from "@dw/shared";
import { speak, stopSpeaking, listenOnce, sttAvailable, audioActive } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { efekt, ustUsteSay, xpUcur } from "../services/efekt.ts";
import { Icon } from "./icons.tsx";
import { Mucevher } from "./solen.tsx";

/* ---------- Ses düğmesi: büyük, tek dokunuşla yavaş/normal ---------- */
export function ListenButton({ text, speed = "normal", label = "Dinle", slowToggle = true, small = false }: { text: string; speed?: Speed; label?: string; slowToggle?: boolean; small?: boolean }) {
  const [busy, setBusy] = useState<false | "n" | "s">(false);
  const play = async (s: Speed, k: "n" | "s") => { if (busy) { stopSpeaking(); setBusy(false); return; } setBusy(k); try { await speak(text, "de", s); } finally { setBusy(false); } };
  return (
    <span class={`listen${small ? " sm" : ""}`} role="group" aria-label={label}>
      <button type="button" onClick={() => play(speed, "n")} aria-label={`${label}: ${text}`} data-test="listen">{busy === "n" ? <Icon name="stop" /> : <Icon name="volume" />}</button>
      {slowToggle && <button type="button" class="spd" onClick={() => play("slow", "s")} aria-label={`Yavaş dinle: ${text}`} data-test="listen-slow">{busy === "s" ? <Icon name="stop" /> : "Yavaş"}</button>}
    </span>
  );
}

/** Almanca satır: büyük metin + ses; Türkçe ikincil; isteğe bağlı katman rozeti */
export function DeLine({ de, tr, layer, size = "lg", speed, showTr = true }: { de: string; tr?: string; layer?: "hd" | "alltag" | "bair"; size?: "md" | "lg" | "xl"; speed?: Speed; showTr?: boolean }) {
  return (
    <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
      <div class="grow">
        {layer && <span class={`badge ${layer}`}>{layer === "hd" ? "Hochdeutsch" : layer === "alltag" ? "Alltag" : "Bairisch"}</span>}
        <div lang="de" class={size === "xl" ? "de-xl" : size === "lg" ? "de-lg" : "de"}>{de}</div>
        {showTr && tr && <div class="tr2">{tr}</div>}
      </div>
      <ListenButton text={de} speed={speed} />
    </div>
  );
}

/* ---------- Cevap alanı: iOS düzeltmesi kapalı, harf şeridi, klavyede görünür kalır, mikrofon ---------- */
const UML = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];
export function AnswerField({ onSubmit, placeholder = "Almanca yaz…", disabled, voice = true, submitLabel = "Kontrol et" }: { onSubmit: (s: string, mode: "typed" | "voice") => void; placeholder?: string; disabled?: boolean; voice?: boolean; submitLabel?: string }) {
  const [v, setV] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useKeyboardSafe(ref);
  const ins = (ch: string) => {
    const el = ref.current; if (!el) return;
    const a = el.selectionStart ?? v.length, b = el.selectionEnd ?? v.length;
    const nv = v.slice(0, a) + ch + v.slice(b); setV(nv);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + 1, a + 1); });
    haptic("selection");
  };
  return (
    <form class="stack" style={{ gap: 8 }} onSubmit={(e) => { e.preventDefault(); if (v.trim()) onSubmit(v.trim(), "typed"); }}>
      <div class="umlauts" role="group" aria-label="Almanca harfler">
        {UML.map((c) => <button type="button" tabIndex={-1} onPointerDown={(e) => e.preventDefault()} onClick={() => ins(c)} aria-label={`${c} harfi ekle`}>{c}</button>)}
      </div>
      <div class="row" style={{ flexWrap: "nowrap" }}>
        <input ref={ref} class="input" lang="de" inputMode="text" enterKeyHint="send" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellcheck={false}
          value={v} placeholder={placeholder} disabled={disabled} onInput={(e) => setV((e.target as HTMLInputElement).value)} aria-label="Almanca cevabın" data-test="answer" />
        {voice && <MicButton disabled={disabled} onText={(t) => { setV(t); onSubmit(t, "voice"); }} />}
      </div>
      <button class="btn primary block" type="submit" disabled={!v.trim() || disabled} data-test="submit">{submitLabel}</button>
    </form>
  );
}

/** Klavye açılınca alanı ve düğmeyi görünür tut (visualViewport) */
export function useKeyboardSafe(ref: { current: HTMLElement | null }) {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const on = () => {
      const kb = window.innerHeight - vv.height > 120;
      document.body.classList.toggle("kb", kb);
      if (kb && ref.current && document.activeElement === ref.current) {
        const r = ref.current.getBoundingClientRect();
        if (r.bottom + 90 > vv.height) window.scrollBy({ top: r.bottom + 90 - vv.height, behavior: "auto" });
      }
    };
    vv.addEventListener("resize", on); vv.addEventListener("scroll", on);
    return () => { vv.removeEventListener("resize", on); vv.removeEventListener("scroll", on); document.body.classList.remove("kb"); };
  }, []);
}

/* ---------- Mikrofon: önce Türkçe açıklama, görünür kayıt göstergesi, bas-konuş ya da dokun-başlat/bitir, kesinti yönetimi ---------- */
const MIC_OK_KEY = "dw2-mic-explained";
export function MicButton({ onText, disabled, wide = false, label = "Sesli söyle" }: { onText: (t: string) => void; disabled?: boolean; wide?: boolean; label?: string }) {
  const [state, setState] = useState<"idle" | "explain" | "rec">("idle");
  const [err, setErr] = useState<string | null>(null);
  const stopRef = useRef<() => void>(() => {});
  const holdRef = useRef(false);
  useEffect(() => {
    // kesinti: uygulama arka plana giderse kaydı güvenle durdur
    const vis = () => { if (document.visibilityState === "hidden") stopRef.current(); };
    const mola = () => stopRef.current();
    document.addEventListener("visibilitychange", vis);
    window.addEventListener("dw:mola", mola);
    return () => { document.removeEventListener("visibilitychange", vis); window.removeEventListener("dw:mola", mola); stopRef.current(); };
  }, []);
  if (!sttAvailable()) return null;
  const start = async () => {
    if (!localStorage.getItem(MIC_OK_KEY)) { setState("explain"); return; }
    setErr(null); setState("rec"); stopSpeaking();
    const h = listenOnce("de-DE", 12000); stopRef.current = h.stop;
    try { const alts = await h.result; setState("idle"); if (alts[0]) { haptic("selection"); onText(alts[0]); } else setErr("Ses algılanamadı. Tekrar dene ya da yaz."); }
    catch { setState("idle"); setErr("Mikrofon kullanılamadı. Ayarlar'dan izin verebilir ya da yazarak cevaplayabilirsin."); }
  };
  return (
    <>
      <button type="button" class={wide ? `btn primary block micwide${state === "rec" ? " on" : ""}` : `micbtn${state === "rec" ? " on" : ""}`} disabled={disabled} aria-label={state === "rec" ? "Kaydı bitir" : "Konuşarak cevapla (basılı tut ya da dokun)"} aria-pressed={state === "rec"} data-test="mic"
        onPointerDown={() => { holdRef.current = false; setTimeout(() => { holdRef.current = true; }, 350); if (state !== "rec") void start(); }}
        onPointerUp={() => { if (state === "rec" && holdRef.current) stopRef.current(); }}
        onClick={() => { if (state === "rec" && !holdRef.current) stopRef.current(); }}>
        {state === "rec" ? <><span class="recdot" aria-hidden="true" />{wide && <span>Dinliyorum · bitince dokun</span>}</> : <><Icon name="mic" />{wide && <span>{label}</span>}</>}
      </button>
      {state === "explain" && (
        <div class="card fade" role="dialog" aria-label="Mikrofon izni" style={{ position: "fixed", left: 16, right: 16, bottom: "calc(16px + var(--safe-bottom))", zIndex: 60 }}>
          <h3>Mikrofonu kullanalım mı?</h3>
          <p class="small">Söylediğin Almanca cümleyi yazıya çevirip kontrol etmek için mikrofon gerekiyor. Ses kaydedilmez ve saklanmaz; yalnızca bu cevap için kullanılır. Şimdi telefon izin isteyecek.</p>
          <div class="row"><button class="btn primary grow" onClick={() => { localStorage.setItem(MIC_OK_KEY, "1"); setState("idle"); void start(); }}>Tamam, izin ver</button><button class="btn grow" onClick={() => setState("idle")}>Şimdi değil</button></div>
        </div>
      )}
      {state === "rec" && <span class="sr-only" aria-live="assertive">Kayıt yapılıyor</span>}
      {err && <div class="fb warn small" style={{ position: "absolute", marginTop: 60 }}>{err}</div>}
    </>
  );
}

/* ---------- Geri bildirim bandı: renk + titreşim + kısa Türkçe açıklama ---------- */
/**
 * Cevap anı (Şölen 1, #58 B10): doğru → yeşile yumuşak geçiş, yaylanan onay işareti, kısa ton, üst üste 3+ rozeti;
 * yanlış → hafif sallanma, sakin mercan tonu (azarlamaz). Ses Profil'deki "Efekt sesleri" ile kapanır.
 */
/**
 * Doğru cevabın XP'si (ekran sağlar): Ders/Medya ilk çalışmada XP.dogru, tekrar çalışmada 0; Bahçe XP.dogru; Okuma sorusu
 * daha önce XP almadıysa XP.dogru. Bağlam yoksa 0 (Prova, rapor, kontrol).
 */
export const CevapXp = createContext(0);

/**
 * Cevap bandı. Doğru cevapta XP uçuşu cevap anında başlar (miktar `xp` ya da CevapXp bağlamı), kayıt ekranın "Devam"ında
 * (inceleme #87 P1-2).
 * `sayac={false}`: cevap olmayan bantlar (rapor, kontrol) "üst üste" sayacına ve efekt sesine karışmaz.
 */
export function FeedbackBand({ kind, title, children, xp, sayac = true }: { kind: "ok" | "bad" | "info" | "warn"; title: string; children?: ComponentChildren; xp?: number; sayac?: boolean }) {
  const baglamXp = useContext(CevapXp);
  const [ust] = useState(() => (!sayac ? 0 : kind === "ok" ? ustUsteSay(true) : kind === "bad" ? ustUsteSay(false) : 0));
  useEffect(() => {
    if (!sayac) return;
    if (kind === "ok") { haptic("success"); efekt("dogru"); xpUcur(xp ?? baglamXp); } else if (kind === "bad") { haptic("error"); efekt("yanlis"); }
  }, [kind, title]);
  // "+N XP" bandın içinde, başlığın yanında: hiçbir metnin üstüne binmez (PM 7011722598 madde 1)
  const n = kind === "ok" && sayac ? (xp ?? baglamXp) : 0;
  // eşik (3, 5, 10, 15…): ünlemli ve parlak (madde 4)
  const esik = ust === 3 || ust === 5 || (ust >= 10 && ust % 5 === 0);
  return (
    <div class={`fb ${kind}`} role="status" aria-live="polite" data-test="feedback">
      <div class="fb-bas">{kind === "ok" && sayac && <span class="fb-isaret" aria-hidden="true"><Icon name="check" size={18} stroke={3} /></span>}<b>{title}</b>
        {n > 0 && <span class="xp-rozet" data-test="xp-ucus"><Mucevher boy={14} />+{n} XP</span>}
        {kind === "ok" && ust >= 3 && <span class={`ustuste${esik ? " esik" : ""}`} data-test="ustuste">{ust} üst üste{esik ? "!" : ""}</span>}</div>
      {children && <div class="small" style={{ marginTop: 2 }}>{children}</div>}
    </div>
  );
}

/** Yanlış cevap bandının içi (PM-059 madde 1): önce doğrusu (metin renginde, büyük), sonra açıklama, en sonda öğrencinin cevabı */
export function YanlisIci({ dogrusu, cevap, children }: { dogrusu: string; cevap?: string; children?: ComponentChildren }) {
  return <>
    <div class="fb-dogrusu" lang="de" data-test="fb-dogrusu">{dogrusu}</div>
    {children}
    <div class="fb-seninki">Senin cevabın: <span lang="de">{cevap || "—"}</span></div>
  </>;
}

/* ---------- Üst ilerleme: aşama x/6 · seans x/4 · kalan süre ---------- */
/** `right`: başlık satırının sağı (#58 A6: öğrenme ekranlarında seans ve kalan dakika çipi) */
export function ProgressHeader({ title, back, step, steps = 7, doneSteps = [], right, sub, ilerleme }: { title: string; back: string; step?: number; steps?: number; doneSteps?: number[]; right?: ComponentChildren; sub?: ComponentChildren; ilerleme?: { n: number; toplam: number } }) {
  return (
    <header class="pbar">
      <div class="row" style={{ gap: 8 }}>
        <a class="iconbtn plain" href={back} aria-label="Geri"><Icon name="back" /></a>
        <h1>{title}</h1>
        {right}
      </div>
      {/* DESIGN §1: ekran başına tek ilerleme göstergesi — ekranın kendi göstergesi (sub) varsa bölüm noktaları ve sayaç gizlenir */}
      {/* Şölen 1: "3 / 10" yazısı yerine dolan çubuk; sayı ekran okuyucu ve testler için (sr-only) */}
      {/* `n`: bitmiş madde sayısı; çubuk bitmişi gösterir (ilk soruda boş, cevaplanıp geçilince dolar; inceleme #87 P2) */}
      {ilerleme && ilerleme.toplam > 0 && <div class={`ilerleme${ilerleme.n >= ilerleme.toplam ? " son" : ""}`} data-test="ilerleme" role="progressbar" aria-valuemin={0} aria-valuemax={ilerleme.toplam} aria-valuenow={Math.min(Math.floor(ilerleme.n) + 1, ilerleme.toplam)}>
        <i style={{ width: `${Math.min(100, (ilerleme.n / ilerleme.toplam) * 100)}%` }} /><span class="sr-only">{Math.min(Math.floor(ilerleme.n) + 1, ilerleme.toplam)} / {ilerleme.toplam}</span></div>}
      {sub && <div class="sub">{sub}</div>}
      {!sub && step !== undefined && <div class="steps" data-progress="" aria-label={`Aşama ${Math.min(step, 6)}/6`}>{Array.from({ length: steps }, (_, i) => <i class={doneSteps.includes(i) ? "done" : i === step ? "cur" : ""} />)}</div>}
    </header>
  );
}

/* ---------- Başparmak bölgesindeki tek ana eylem ---------- */
export function ActionBar({ children }: { children: ComponentChildren }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const app = document.querySelector<HTMLElement>(".app"); if (!app) return;
    app.classList.add("hasbar");
    // içerik eylem çubuğunun altında kalmasın: yükseklik ölçülür (cevap alanı + harf şeridi gibi yüksek çubuklar için)
    const ro = typeof ResizeObserver !== "undefined" && ref.current ? new ResizeObserver(() => { if (ref.current) app.style.setProperty("--actionbar-h", `${Math.ceil(ref.current.getBoundingClientRect().height) - 12}px`); }) : null;
    if (ro && ref.current) ro.observe(ref.current);
    return () => { ro?.disconnect(); app.classList.remove("hasbar"); app.style.removeProperty("--actionbar-h"); };
  }, []);
  return <div class="actionbar" ref={ref}><div>{children}</div></div>;
}

/* ---------- Durumlar ---------- */
export function LoadingCard({ lines = 3 }: { lines?: number }) {
  return <div class="card stack" aria-busy="true" aria-label="Yükleniyor">{Array.from({ length: lines }, (_, i) => <div class="skeleton" style={{ width: `${90 - i * 15}%` }} />)}</div>;
}
export function Empty({ icon = "○", title, text, action }: { icon?: string; title: string; text?: string; action?: ComponentChildren }) {
  return <div class="card empty"><span class="ic" aria-hidden="true">{icon}</span><b>{title}</b>{text && <p class="small">{text}</p>}{action}</div>;
}
export { audioActive };
