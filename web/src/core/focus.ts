/**
 * Odak motoru (Pomodoro v2).
 * v1'den AYNEN korunan ölçüm kuralları (app/legacy.html clock(), addSec(), pomo()):
 *  - Süre yalnızca son 2 dakikada dokunma olduysa (ekran görünür + öğrenme ekranı) ya da ses/mikrofon/canlı sohbet açıksa sayılır.
 *  - Menü ekranları (Bugün, İlerlemem, Profil) sayılmaz.
 *  - Tek adımda en fazla 5 sn sayılır (uyku/arka plandan dönüşte sıçrama yok).
 *  - 25 dk aktif çalışma → 5 dk mola. Mola süresi çalışmaya EKLENMEZ.
 *  - Günlük hedef (varsayılan 100 dk) aşılınca bir kez kutlama.
 * v2 eklemeleri: numaralı seanslar (x/4), seans kaydı, 4. seanstan sonra isteğe bağlı uzun mola,
 *  5 dk boşlukta seans sessizce sıfırlanmaz → "yarıda kaldı" kaydı, mola süresi ayrı ölçülür, etkinlik dökümü.
 * Saf mantık: DOM'a bağlı değil, saat dışarıdan verilir (testlerde sahte saat).
 */
import type { Activity, FocusDay, FocusSession } from "@dw/shared";

export interface FocusConfig { workMin: number; breakMin: number; longBreakMin: number; dailyGoalMin: number; sessionPlan: Activity[][] }
export interface Signals {
  /** Sayfa görünür mü */
  visible: boolean;
  /** Şu anki ekran bir öğrenme ekranı mı (menüler değil) */
  learning: boolean;
  /** Son dokunma/klavye/kaydırma zamanı (ms) */
  lastInputAt: number;
  /** Ses çalıyor, mikrofon dinliyor ya da canlı sohbet açık mı */
  audioActive: boolean;
}
export type Phase = "idle" | "focus" | "break";
export interface Runtime {
  phase: Phase;
  sessionId?: string;
  breakKind?: "short" | "long";
  breakStartedAt?: number;
  breakEndsAt?: number;
  /** Molanın hangi ana kadar sayıldığı (mola süresi duvar saatiyle ölçülür) */
  breakCountedTo?: number;
  lastTickAt: number;
  lastCountAt: number;
  paused: boolean;
  activity: Activity;
  refId?: string;
  /** Yarıda kalan ve devam ettirilebilecek seans */
  resumableId?: string;
}
export type FocusEvent =
  | { type: "sessionStarted"; n: number }
  | { type: "sessionCompleted"; n: number }
  | { type: "breakStarted"; kind: "short" | "long"; endsAt: number }
  | { type: "breakEnded"; skipped: boolean }
  | { type: "interrupted"; n: number }
  | { type: "goalHit" }
  | { type: "dayRolled"; date: string };

export const IDLE_INPUT_MS = 120_000;
export const INTERRUPT_MS = 5 * 60_000;
export const MAX_STEP_SEC = 5;

export const localDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function newDay(date: string, goalMin: number): FocusDay {
  return { date, goalMin, focusSec: 0, breakSec: 0, longBreakSec: 0, sessions: [], u: Date.now() };
}

export class FocusEngine {
  constructor(public cfg: FocusConfig, public day: FocusDay, public rt: Runtime) {}

  static fresh(cfg: FocusConfig, now: number): FocusEngine {
    return new FocusEngine(cfg, newDay(localDate(now), cfg.dailyGoalMin), { phase: "idle", lastTickAt: now, lastCountAt: now, paused: false, activity: "other" });
  }

  /* ---------- türetilmiş bilgiler (arayüz için) ---------- */
  get current(): FocusSession | undefined { return this.day.sessions.find((s) => s.id === this.rt.sessionId); }
  get completedCount() { return this.day.sessions.filter((s) => s.status === "completed").length; }
  /** Sıradaki seansın numarası (1..4, sonrası bonus) */
  get nextN() { return this.completedCount + 1; }
  plannedFor(n: number): Activity { const p = this.cfg.sessionPlan[(n - 1) % 4]; return (p && p[0]) || "other"; }
  focusLeftSec(): number { const c = this.current; return Math.max(0, this.cfg.workMin * 60 - (c ? c.focusSec : 0)); }
  breakLeftSec(now: number): number { return this.rt.phase === "break" && this.rt.breakEndsAt ? Math.max(0, Math.ceil((this.rt.breakEndsAt - now) / 1000)) : 0; }
  focusMin(): number { return Math.floor(this.day.focusSec / 60); }

  /* ---------- eylemler ---------- */
  setActivity(activity: Activity, refId?: string) { this.rt.activity = activity; this.rt.refId = refId; }

  start(now: number, planned?: Activity): FocusEvent[] {
    const ev = this.rollIfNeeded(now);
    if (this.rt.phase === "break") ev.push(...this.endBreak(now, true));
    if (this.rt.phase === "focus" && this.current) return ev;
    const n = this.nextN;
    const s: FocusSession = {
      id: `${this.day.date}-${n}-${now.toString(36)}`,
      n, plannedActivity: planned || this.plannedFor(n), startedAt: new Date(now).toISOString(),
      focusSec: 0, breakSecAfter: 0, status: "running", interruptions: 0, segments: []
    };
    this.day.sessions.push(s);
    Object.assign(this.rt, { phase: "focus", sessionId: s.id, paused: false, lastCountAt: now, resumableId: undefined });
    this.touch();
    ev.push({ type: "sessionStarted", n });
    return ev;
  }

  /** Yarıda kalan seansa kaldığı yerden devam */
  resume(now: number): FocusEvent[] {
    const s = this.day.sessions.find((x) => x.id === this.rt.resumableId);
    if (!s || s.status !== "interrupted") return this.start(now);
    s.status = "running";
    Object.assign(this.rt, { phase: "focus", sessionId: s.id, paused: false, lastCountAt: now, resumableId: undefined });
    this.touch();
    return [];
  }

  pause(paused: boolean, now: number) { this.rt.paused = paused; if (!paused) this.rt.lastCountAt = now; }

  skipBreak(now: number): FocusEvent[] { return this.rt.phase === "break" ? this.endBreak(now, true) : []; }

  /* ---------- saat ---------- */
  tick(now: number, sig: Signals): FocusEvent[] {
    const ev = this.rollIfNeeded(now);
    const dt = Math.min(MAX_STEP_SEC, Math.max(0, (now - this.rt.lastTickAt) / 1000));
    this.rt.lastTickAt = now;

    if (this.rt.phase === "break") {
      this.countBreak(now);
      if (this.rt.breakEndsAt && now >= this.rt.breakEndsAt) ev.push(...this.endBreak(now, false));
      return ev;
    }

    const counting = !this.rt.paused && (sig.audioActive || (sig.visible && sig.learning && now - sig.lastInputAt < IDLE_INPUT_MS));

    if (counting) {
      // v1 davranışı: öğrenmeye başlayınca seans kendiliğinden başlar
      if (this.rt.phase !== "focus" || !this.current) {
        if (this.rt.resumableId) ev.push(...this.resume(now)); else ev.push(...this.start(now));
      }
      const s = this.current!;
      // uzun boşluktan sonra ilk adım: en fazla MAX_STEP_SEC
      s.focusSec += dt;
      this.day.focusSec += dt;
      const seg = s.segments.find((g) => g.activity === this.rt.activity && g.refId === this.rt.refId);
      if (seg) seg.sec += dt; else s.segments.push({ activity: this.rt.activity, ...(this.rt.refId ? { refId: this.rt.refId } : {}), sec: dt });
      this.rt.lastCountAt = now;
      this.touch();
      if (!this.day.goalHitAt && this.day.focusSec >= this.day.goalMin * 60) { this.day.goalHitAt = new Date(now).toISOString(); ev.push({ type: "goalHit" }); }
      if (s.focusSec >= this.cfg.workMin * 60) ev.push(...this.complete(now));
      return ev;
    }

    // sayılmayan süre: 5 dakikayı geçerse seans "yarıda kaldı" olur (v1'de sessizce sıfırlanıyordu)
    if (this.rt.phase === "focus" && this.current && !this.rt.paused && now - this.rt.lastCountAt > INTERRUPT_MS) {
      const s = this.current;
      if (s.focusSec > 0) {
        s.status = "interrupted"; s.interruptions++;
        Object.assign(this.rt, { phase: "idle", sessionId: undefined, resumableId: s.id });
        ev.push({ type: "interrupted", n: s.n });
      } else {
        this.day.sessions = this.day.sessions.filter((x) => x !== s);
        Object.assign(this.rt, { phase: "idle", sessionId: undefined });
      }
      this.touch();
    }
    return ev;
  }

  private complete(now: number): FocusEvent[] {
    const s = this.current!;
    s.status = "completed"; s.endedAt = new Date(now).toISOString();
    const kind: "short" | "long" = this.completedCount % 4 === 0 ? "long" : "short";
    const endsAt = now + (kind === "long" ? this.cfg.longBreakMin : this.cfg.breakMin) * 60_000;
    Object.assign(this.rt, { phase: "break", breakKind: kind, breakStartedAt: now, breakCountedTo: now, breakEndsAt: endsAt });
    this.touch();
    return [{ type: "sessionCompleted", n: s.n }, { type: "breakStarted", kind, endsAt }];
  }

  private addBreak(kind: "short" | "long", sec: number) {
    if (sec <= 0) return;
    if (kind === "long") this.day.longBreakSec += sec; else this.day.breakSec += sec;
    const last = [...this.day.sessions].reverse().find((s) => s.status === "completed");
    if (last) last.breakSecAfter += sec;
    this.touch();
  }

  /** Mola süresi duvar saatiyle: uygulama kapalıyken geçen mola da sayılır, ama molanın bitişinden sonrası sayılmaz */
  private countBreak(now: number) {
    const to = Math.min(now, this.rt.breakEndsAt ?? now);
    const from = this.rt.breakCountedTo ?? this.rt.breakStartedAt ?? to;
    if (to > from) { this.addBreak(this.rt.breakKind || "short", (to - from) / 1000); this.rt.breakCountedTo = to; }
  }

  private endBreak(now: number, skipped: boolean): FocusEvent[] {
    this.countBreak(now);
    Object.assign(this.rt, { phase: "idle", sessionId: undefined, breakKind: undefined, breakStartedAt: undefined, breakEndsAt: undefined, breakCountedTo: undefined, lastCountAt: now, lastTickAt: now });
    this.touch();
    return [{ type: "breakEnded", skipped }];
  }

  /** Gün değişince: sürmekte ya da yarıda kalmış seanslar "bırakıldı" olur, yeni gün başlar */
  private rollIfNeeded(now: number): FocusEvent[] {
    const date = localDate(now);
    if (date === this.day.date) return [];
    for (const s of this.day.sessions) if (s.status === "running" || s.status === "interrupted") s.status = "abandoned";
    this.day.u = Date.now();
    this.previous = this.day;
    this.day = newDay(date, this.cfg.dailyGoalMin);
    Object.assign(this.rt, { phase: "idle", sessionId: undefined, resumableId: undefined, breakKind: undefined, breakEndsAt: undefined, lastCountAt: now });
    return [{ type: "dayRolled", date }];
  }
  /** Gün değiştiğinde kapanan gün (kaydedilmesi için) */
  previous?: FocusDay;

  private touch() { this.day.u = Date.now(); }
}
