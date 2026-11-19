import { describe, it, expect, beforeEach } from "vitest";
import { DwDB, useDb, getProfile, saveProfile, saveFocus, loadFocus, saveAssessment, latestPlacement, openAssessment, putItems, bankItems, itemStats, exportAll } from "./db.ts";
import { FocusEngine } from "../core/focus.ts";
import { DEFAULT_SESSION_PLAN } from "@dw/shared";
import { emptyItem } from "../core/learner.ts";

let n = 0;
beforeEach(() => useDb(new DwDB(`test-${n++}`)));

describe("cihaz veritabanı", () => {
  it("profil: ilk açılışta varsayılan (100 dk, 25/5, uzun mola 20), değişiklik kalıcı ve şemayla doğrulanır", async () => {
    const p = await getProfile();
    expect(p.focus).toMatchObject({ dailyGoalMin: 100, workMin: 25, breakMin: 5, longBreakMin: 20 });
    expect(p.teaching.englishBridge).toBe(false);
    p.focus.dailyGoalMin = 120;
    await saveProfile(p);
    expect((await getProfile()).focus.dailyGoalMin).toBe(120);
    p.focus.dailyGoalMin = 5;
    await expect(saveProfile(p)).rejects.toThrow();
  });
  it("odak günü ve çalışma durumu kaydedilip geri yüklenir", async () => {
    const e = FocusEngine.fresh({ workMin: 25, breakMin: 5, longBreakMin: 20, dailyGoalMin: 100, sessionPlan: DEFAULT_SESSION_PLAN }, Date.now());
    e.start(Date.now());
    await saveFocus(e.day, e.rt);
    const r = await loadFocus(e.day.date);
    expect(r.day!.sessions).toHaveLength(1);
    expect(r.rt!.phase).toBe("focus");
  });
  it("seviye tespiti: yarım kalan bulunur, biten en son tespit olarak döner", async () => {
    await saveAssessment({ id: "a1", type: "placement", startedAt: "2026-11-17T09:00:00Z", answers: [], u: 1 });
    expect((await openAssessment())?.id).toBe("a1");
    await saveAssessment({ id: "a1", type: "placement", startedAt: "2026-11-17T09:00:00Z", finishedAt: "2026-11-17T09:12:00Z", answers: [], overall: "A2", u: 2 });
    expect(await openAssessment()).toBeUndefined();
    expect((await latestPlacement())?.overall).toBe("A2");
  });
  it("zayıflık bankası ve sayaçlar", async () => {
    const a = emptyItem("lx:Termin"); a.inBank = true; a.u = 2; a.passive.ok = 1;
    const b = emptyItem("lx:Praxis"); b.active.ok = 1; b.u = 1;
    await putItems([a, b]);
    expect((await bankItems()).map((x) => x.itemId)).toEqual(["lx:Termin"]);
    expect(await itemStats()).toMatchObject({ total: 2, passiveKnown: 1, activeKnown: 1, bank: 1 });
    const ex = await exportAll();
    expect(ex.items).toHaveLength(2);
    expect(ex.profile).toHaveLength(0);
  });
});

describe("şema geçişi (#58 A12: geçişte veri kaybı yok)", () => {
  it("1. sürüm veritabanındaki profil, öğe ve odak verisi güncel sürüme geçince korunur; yeni tablolar boş açılır", async () => {
    const { default: Dexie } = await import("dexie");
    const name = `mig-${Date.now()}`;
    const old = new Dexie(name);
    old.version(1).stores({ meta: "&key", profile: "&id", items: "&itemId, kind, inBank, u", focusDays: "&date, u", assess: "&id, startedAt, type" });
    await old.open();
    const it = emptyItem("lx:Termin"); it.inBank = true; it.passive.ok = 2;
    await old.table("items").put(it);
    await old.table("meta").put({ key: "x", value: 42 });
    await old.table("focusDays").put({ date: "2026-11-18", u: 1, sessions: [] });
    old.close();
    const cur = new DwDB(name);
    useDb(cur);
    expect(await cur.items.get("lx:Termin")).toMatchObject({ itemId: "lx:Termin", inBank: true, passive: { ok: 2 } });
    expect((await cur.meta.get("x"))?.value).toBe(42);
    expect(await cur.focusDays.count()).toBe(1);
    expect(await cur.personal.count()).toBe(0);
    expect(cur.verno).toBeGreaterThanOrEqual(2);
  });
});
