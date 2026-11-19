import { describe, it, expect } from "vitest";
import { FocusEngine, type Signals, type FocusEvent } from "./focus.ts";
import { DEFAULT_SESSION_PLAN } from "@dw/shared";

const CFG = { workMin: 25, breakMin: 5, longBreakMin: 20, dailyGoalMin: 100, sessionPlan: DEFAULT_SESSION_PLAN };
const T0 = new Date(2026, 10, 17, 9, 0, 0).getTime();

/** Saniyede bir tick atan sahte saat. input: "active" = sürekli dokunuyor, "idle" = dokunmuyor */
function sim(e: FocusEngine, from: number, seconds: number, sig: Partial<Signals> & { active?: boolean } = {}) {
  const ev: FocusEvent[] = [];
  let now = from;
  for (let i = 0; i < seconds; i++) {
    now += 1000;
    const s: Signals = { visible: sig.visible ?? true, learning: sig.learning ?? true, audioActive: sig.audioActive ?? false, lastInputAt: sig.active === false ? (sig.lastInputAt ?? from - 10 * 60_000) : now };
    ev.push(...e.tick(now, s));
  }
  return { now, ev };
}

describe("odak motoru — v1 ölçüm kuralları (clocktest eşdeğeri)", () => {
  it("dokunma varken sayar; 2 dakikadan uzun dokunmazsa saymaz", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let { now } = sim(e, T0, 60);
    expect(Math.round(e.day.focusSec)).toBe(60);
    ({ now } = sim(e, now, 180, { active: false, lastInputAt: now }));
    // son dokunmadan sonra 120 sn sayılır, sonrası sayılmaz
    expect(Math.round(e.day.focusSec)).toBe(60 + 119);
  });
  it("ses/mikrofon açıkken dokunmadan da sayar (eller serbest)", () => {
    const e = FocusEngine.fresh(CFG, T0);
    sim(e, T0, 300, { active: false, audioActive: true, visible: false, learning: false });
    expect(Math.round(e.day.focusSec)).toBe(300);
  });
  it("menü ekranları ve gizli sayfa sayılmaz", () => {
    const e = FocusEngine.fresh(CFG, T0);
    sim(e, T0, 60, { learning: false });
    sim(e, T0 + 60_000, 60, { visible: false });
    expect(e.day.focusSec).toBe(0);
  });
  it("uzun aradan sonra tek adımda en fazla 5 sn sayılır", () => {
    const e = FocusEngine.fresh(CFG, T0);
    sim(e, T0, 10);
    const now = T0 + 10_000 + 3600_000;
    e.tick(now, { visible: true, learning: true, audioActive: false, lastInputAt: now });
    expect(Math.round(e.day.focusSec)).toBe(15);
  });
  it("25 dk → seans tamamlanır ve 5 dk mola başlar; mola 4:59'da sürer, 5:01'de biter; mola süresi çalışmaya eklenmez", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let { now, ev } = sim(e, T0, 25 * 60);
    expect(ev.map((x) => x.type)).toEqual(["sessionStarted", "sessionCompleted", "breakStarted"]);
    expect(e.rt.phase).toBe("break");
    ({ now, ev } = sim(e, now, 299));
    expect(e.rt.phase).toBe("break");
    expect(e.breakLeftSec(now)).toBe(1);
    ({ now, ev } = sim(e, now, 2, { active: false }));
    expect(e.rt.phase).toBe("idle");
    expect(ev.some((x) => x.type === "breakEnded")).toBe(true);
    // moladan sonra öğrenmeye dönünce 2. seans kendiliğinden başlar (v1 davranışı)
    ({ now, ev } = sim(e, now, 1));
    expect(ev).toContainEqual({ type: "sessionStarted", n: 2 });
    expect(Math.round(e.day.focusSec)).toBe(25 * 60 + 1);
    expect(Math.round(e.day.breakSec)).toBe(300);
    expect(e.day.sessions[0]!.status).toBe("completed");
    expect(Math.round(e.day.sessions[0]!.breakSecAfter)).toBe(300);
  });
});

describe("odak motoru — v2 eklemeleri", () => {
  it("4 seans + 3 kısa mola = 100 dk; 4. seanstan sonra 20 dk uzun mola; hedef kutlaması bir kez", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let now = T0;
    const all: FocusEvent[] = [];
    for (let i = 0; i < 4; i++) {
      const a = sim(e, now, 25 * 60); now = a.now; all.push(...a.ev);
      if (i < 3) { const b = sim(e, now, 5 * 60 + 1, { active: false }); now = b.now; all.push(...b.ev); }
    }
    expect(e.completedCount).toBe(4);
    expect(e.focusMin()).toBe(100);
    expect(all.filter((x) => x.type === "goalHit")).toHaveLength(1);
    const brk = all.filter((x) => x.type === "breakStarted") as { kind: string }[];
    expect(brk.map((b) => b.kind)).toEqual(["short", "short", "short", "long"]);
    expect(e.breakLeftSec(now)).toBe(20 * 60);
    expect(e.day.sessions.map((s) => s.n)).toEqual([1, 2, 3, 4]);
  });
  it("uzun mola atlanabilir ve atlanan kısım mola sayılmaz", () => {
    const e = FocusEngine.fresh({ ...CFG, workMin: 1 }, T0);
    let now = T0;
    for (let i = 0; i < 4; i++) { now = sim(e, now, 60).now; if (i < 3) now = sim(e, now, 5 * 60 + 1, { active: false }).now; }
    now = sim(e, now, 120, { active: false }).now;
    const ev = e.skipBreak(now);
    expect(ev[0]).toEqual({ type: "breakEnded", skipped: true });
    expect(Math.round(e.day.longBreakSec)).toBe(120);
  });
  it("5 dakikadan uzun boşluk seansı 'yarıda kaldı' yapar (sessizce sıfırlamaz); devam edince süre korunur", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let { now } = sim(e, T0, 600);
    const r = sim(e, now, 7 * 60 + 5, { active: false, lastInputAt: now });
    now = r.now;
    expect(r.ev.some((x) => x.type === "interrupted")).toBe(true);
    expect(e.day.sessions[0]!.status).toBe("interrupted");
    expect(e.rt.resumableId).toBe(e.day.sessions[0]!.id);
    sim(e, now, 60);
    expect(e.day.sessions).toHaveLength(1);
    expect(e.day.sessions[0]!.status).toBe("running");
    expect(Math.round(e.day.sessions[0]!.focusSec)).toBe(600 + 119 + 60); // son dokunmadan sonraki 119 sn de sayılır (v1: 2 dk kuralı)
  });
  it("etkinlik dökümü: seans içinde hangi etkinlikte ne kadar çalışıldı", () => {
    const e = FocusEngine.fresh(CFG, T0);
    e.setActivity("vocab", "sc:telefon:01-arzttermin");
    let { now } = sim(e, T0, 120);
    e.setActivity("listening");
    sim(e, now, 60);
    const seg = e.day.sessions[0]!.segments;
    expect(seg.map((s) => [s.activity, Math.round(s.sec)])).toEqual([["vocab", 120], ["listening", 60]]);
    expect(e.day.sessions[0]!.plannedActivity).toBe("vocab");
  });
  it("seans planı: 2. seansın önerisi cümle kurma", () => {
    const e = FocusEngine.fresh(CFG, T0);
    sim(e, T0, 25 * 60);
    expect(e.nextN).toBe(2);
    expect(e.plannedFor(2)).toBe("build");
  });
  it("duraklatılınca saymaz ve yarıda kalma süresi işlemez", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let { now } = sim(e, T0, 60);
    e.pause(true, now);
    now = sim(e, now, 600).now;
    expect(Math.round(e.day.focusSec)).toBe(60);
    expect(e.day.sessions[0]!.status).toBe("running");
  });
  it("gün değişince sürmekte olan seans 'bırakıldı' olur ve yeni gün başlar", () => {
    const late = new Date(2026, 10, 17, 23, 59, 0).getTime();
    const e = FocusEngine.fresh(CFG, late);
    const { ev } = sim(e, late, 120);
    expect(ev.some((x) => x.type === "dayRolled")).toBe(true);
    expect(e.previous!.sessions[0]!.status).toBe("abandoned");
    expect(e.day.date).toBe("2026-11-18");
  });
  it("#58 A6: mola sırasında telefon kilitlenir (tick yok) — açılınca mola bitmiş, yalnızca mola süresi sayılmış; odak süresine sızma yok", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let { now } = sim(e, T0, 25 * 60);
    expect(e.rt.phase).toBe("break");
    const odak = e.day.focusSec;
    // 40 dakika hiç tick yok (kilit / arka plan), sonra tek tick
    now += 40 * 60_000;
    const ev = e.tick(now, { visible: true, learning: false, audioActive: false, lastInputAt: now - 10 * 60_000 });
    expect(ev).toContainEqual({ type: "breakEnded", skipped: false });
    expect(e.rt.phase).toBe("idle");
    expect(Math.round(e.day.breakSec)).toBe(300);
    expect(e.day.focusSec).toBe(odak);
    // mola içinde kısa kilit: 3 dk sonra açılınca kalan süre duvar saatiyle 2 dk
    const f = FocusEngine.fresh(CFG, T0);
    ({ now } = sim(f, T0, 25 * 60));
    now += 3 * 60_000;
    f.tick(now, { visible: true, learning: false, audioActive: false, lastInputAt: 0 });
    expect(f.rt.phase).toBe("break");
    expect(f.breakLeftSec(now)).toBe(120);
  });
  it("#58 A6: odak sırasında kilit — kilitli geçen süre seansa eklenmez, seans yarıda kalır, devam edince süre korunur", () => {
    const e = FocusEngine.fresh(CFG, T0);
    let { now } = sim(e, T0, 10 * 60);
    const once = e.day.focusSec;
    now += 30 * 60_000;
    e.tick(now, { visible: true, learning: true, audioActive: false, lastInputAt: now - 10 * 60_000 });
    expect(e.day.focusSec).toBe(once);
    expect(e.rt.resumableId).toBeTruthy();
    e.resume(now);
    expect(e.current!.focusSec).toBe(once);
  });
});
