/**
 * Odak motorunu tarayıcıya bağlar: saniyede bir tick, dokunma/ses sinyalleri, kalıcılık, zil ve olaylar.
 * Ölçüm kuralları core/focus.ts'te (v1 ile aynı).
 */
import type { Activity, Profile } from "@dw/shared";
import { FocusEngine, localDate, type FocusEvent } from "../core/focus.ts";
import { loadFocus, saveFocus } from "../data/db.ts";
import { audioActive, chime, stopSpeaking } from "./speech.ts";
import { hapticAlarm } from "./haptics.ts";

let engine: FocusEngine | null = null;
let lastInputAt = 0;
let learningView = false;
let dirty = false;
let lastSave = 0;
let timer: ReturnType<typeof setInterval> | null = null;
let sfx = true;
const subs = new Set<(ev: FocusEvent[]) => void>();

export const focus = () => engine;
export function subscribeFocus(fn: (ev: FocusEvent[]) => void) { subs.add(fn); return () => { subs.delete(fn); }; }
/** Ekran değişince: öğrenme ekranı mı, hangi etkinlik */
export function setLearning(on: boolean, activity: Activity = "other", refId?: string) {
  learningView = on;
  if (engine && on) engine.setActivity(activity, refId);
}

function cfgOf(p: Profile) {
  return { workMin: p.focus.workMin, breakMin: p.focus.breakMin, longBreakMin: p.focus.longBreakMin, dailyGoalMin: p.focus.dailyGoalMin, sessionPlan: p.focus.sessionPlan };
}

export async function startFocus(p: Profile) {
  sfx = p.ui.sfx;
  const now = Date.now();
  const { day, rt } = await loadFocus(localDate(now));
  engine = FocusEngine.fresh(cfgOf(p), now);
  if (day) engine.day = day;
  if (rt && day) engine.rt = { ...rt, lastTickAt: now, lastCountAt: rt.phase === "focus" ? rt.lastCountAt : now };
  engine.day.goalMin = p.focus.dailyGoalMin;
  if (timer) return;
  const mark = () => { lastInputAt = Date.now(); };
  for (const ev of ["pointerdown", "keydown", "touchstart", "scroll", "input"]) document.addEventListener(ev, mark, { passive: true, capture: true });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") void persist(true); });
  timer = setInterval(tick, 1000);
}

export function updateFocusConfig(p: Profile) {
  sfx = p.ui.sfx;
  if (!engine) return;
  engine.cfg = cfgOf(p);
  engine.day.goalMin = p.focus.dailyGoalMin;
  dirty = true;
}

function tick() {
  if (!engine) return;
  const now = Date.now();
  const ev = engine.tick(now, { visible: document.visibilityState === "visible", learning: learningView, lastInputAt, audioActive: audioActive() });
  emit(ev);
}
function emit(ev: FocusEvent[]) {
  if (ev.length) {
    dirty = true;
    const mola = ev.some((e) => e.type === "breakStarted" || e.type === "breakEnded");
    // #58 A6: mola başında ve sonunda zil (ses ayarı açıksa) ve titreşim (titreşim ayarı açıksa)
    if (mola) { if (sfx) chime(ev.some((e) => e.type === "breakEnded") ? "end" : "start"); hapticAlarm(); }
    for (const e of ev) {
      if (e.type === "breakStarted") { molayaGec(); void molaBildirimi(e.endsAt); }
      if (e.type === "breakEnded") void molaBildirimi(null);
    }
  }
  if (engine && engine.rt.phase === "focus") dirty = true;
  subs.forEach((f) => f(ev));
  void persist(ev.length > 0);
}
/**
 * Mola başlayınca alttaki öğrenme ekranı susar (inceleme #67 P1-4): seslendirme durur, video/ses duraklar, mikrofon
 * kapanır (MicButton "dw:mola" olayını dinler). Mola atlanınca öğrenci kaldığı yerden kendisi devam eder.
 */
function molayaGec() {
  try {
    stopSpeaking();
    document.querySelectorAll<HTMLMediaElement>("video, audio").forEach((m) => { try { m.pause(); } catch { /* yok say */ } });
    window.dispatchEvent(new Event("dw:mola"));
  } catch { /* ekran yoksa (test) yok say */ }
}

/**
 * Uygulama arka plandayken ya da telefon kilitliyken mola biterse zil sayfada çalamaz: iPhone kabuğunda (Capacitor
 * LocalNotifications varsa) mola bitişine yerel bildirim kurulur, mola atlanınca ya da bitince kaldırılır. Web'de yok sayılır.
 */
const MOLA_BILDIRIM_ID = 4101;
async function molaBildirimi(endsAt: number | null) {
  try {
    const L = (globalThis as any).Capacitor?.Plugins?.LocalNotifications;
    if (!L) return;
    await L.cancel?.({ notifications: [{ id: MOLA_BILDIRIM_ID }] });
    if (endsAt === null || endsAt <= Date.now()) return;
    const izin = await L.checkPermissions?.();
    if (izin?.display !== "granted" && (await L.requestPermissions?.())?.display !== "granted") return;
    await L.schedule({ notifications: [{ id: MOLA_BILDIRIM_ID, title: "Mola bitti", body: "Sıradaki seansa hazırsan uygulamayı aç.", schedule: { at: new Date(endsAt), allowWhileIdle: true } }] });
  } catch { /* bildirim yoksa sessizce geç */ }
}

async function persist(force: boolean) {
  if (!engine || !dirty) return;
  const now = Date.now();
  if (!force && now - lastSave < 15000) return;
  lastSave = now; dirty = false;
  const prev = engine.previous; engine.previous = undefined;
  await saveFocus(engine.day, engine.rt, prev);
}

/* Arayüz eylemleri */
export function focusStart(planned?: Activity) { if (engine) emit(engine.start(Date.now(), planned)); }
export function focusResume() { if (engine) emit(engine.resume(Date.now())); }
export function focusPause(p: boolean) { if (engine) { engine.pause(p, Date.now()); emit([]); void persist(true); } }
export function focusSkipBreak() { if (engine) emit(engine.skipBreak(Date.now())); }
