import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const meta = new Map<string, unknown>();
let odakSn = 0;
vi.mock("../data/db.ts", () => ({
  getMeta: async (k: string) => meta.get(k),
  setMeta: async (k: string, v: unknown) => { meta.set(k, v); },
  focusRange: async (from: string) => (odakSn ? [{ date: from, focusSec: odakSn }] : []),
}));
import { hatirlatmaPlani, hatirlatmaKur, hatirlatmaKaydet, HATIRLATMA_VARSAYILAN, HATIRLATMA_METIN } from "./hatirlatma.ts";

const saat = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

describe("günlük hatırlatma planı (PM-121 md. 3.3)", () => {
  it("varsayılan: açık, 19:30; 7 günlük pencere, günde tek, akşam", () => {
    const simdi = new Date(2026, 10, 24, 10, 0);
    const p = hatirlatmaPlani(simdi, HATIRLATMA_VARSAYILAN, false);
    expect(p).toHaveLength(7);
    expect(new Set(p.map((b) => b.id)).size).toBe(7);
    expect(p.every((b) => saat(b.schedule.at) === "19:30")).toBe(true);
    expect(new Set(p.map((b) => b.schedule.at.toDateString())).size).toBe(7);
    expect(p[0]!.schedule.at.getDate()).toBe(24);
  });
  it("bugünün saati geçtiyse ya da bugün hedefin yarısı doluysa bugünkü yok", () => {
    expect(hatirlatmaPlani(new Date(2026, 10, 24, 20, 0), HATIRLATMA_VARSAYILAN, false).map((b) => b.schedule.at.getDate())).toEqual([25, 26, 27, 28, 29, 30]);
    expect(hatirlatmaPlani(new Date(2026, 10, 24, 10, 0), HATIRLATMA_VARSAYILAN, true)[0]!.schedule.at.getDate()).toBe(25);
  });
  it("kapalıysa hiç bildirim yok; seçilen saat kullanılır", () => {
    expect(hatirlatmaPlani(new Date(2026, 10, 24, 10, 0), { acik: false, saat: "19:30" }, false)).toEqual([]);
    expect(hatirlatmaPlani(new Date(2026, 10, 24, 10, 0), { acik: true, saat: "21:00" }, false).every((b) => saat(b.schedule.at) === "21:00")).toBe(true);
  });
  it("metinler Türkçe, adsız, emojisiz; yer tutucu yok", () => {
    for (const [t, b] of HATIRLATMA_METIN) {
      expect(`${t} ${b}`).not.toMatch(/[{}]|\p{Extended_Pictographic}/u);
      expect(t.length).toBeLessThanOrEqual(30);
    }
  });
});

describe("kurulum (kabuk köprüsü)", () => {
  let L: { cancel: ReturnType<typeof vi.fn>; checkPermissions: ReturnType<typeof vi.fn>; requestPermissions: ReturnType<typeof vi.fn>; schedule: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    meta.clear(); odakSn = 0;
    L = { cancel: vi.fn(async () => undefined), checkPermissions: vi.fn(async () => ({ display: "granted" })), requestPermissions: vi.fn(async () => ({ display: "granted" })), schedule: vi.fn(async () => undefined) };
    (globalThis as any).Capacitor = { Plugins: { LocalNotifications: L } };
  });
  afterEach(() => { delete (globalThis as any).Capacitor; });

  it("kabuk yoksa hiçbir şey yapmaz", async () => {
    delete (globalThis as any).Capacitor;
    await expect(hatirlatmaKur(60)).resolves.toBeUndefined();
  });
  it("önce v1'in ve kendi eski bildirimlerini siler (7101–7107, 7200), sonra 7 gün kurar", async () => {
    await hatirlatmaKur(60, new Date(2026, 10, 24, 10, 0));
    expect(L.cancel.mock.calls[0]![0].notifications.map((n: { id: number }) => n.id)).toEqual([7101, 7102, 7103, 7104, 7105, 7106, 7107, 7200]);
    expect(L.schedule.mock.calls[0]![0].notifications).toHaveLength(7);
  });
  it("bugün hedefin yarısı (60 dk → 30 dk) doluysa bugünkü atlanır", async () => {
    odakSn = 30 * 60;
    await hatirlatmaKur(60, new Date(2026, 10, 24, 10, 0));
    expect(L.schedule.mock.calls[0]![0].notifications[0].schedule.at.getDate()).toBe(25);
  });
  it("kapatılınca yalnız silinir", async () => {
    await hatirlatmaKaydet({ acik: false, saat: "19:30" }, 60);
    expect(L.cancel).toHaveBeenCalled();
    expect(L.schedule).not.toHaveBeenCalled();
    expect(meta.get("hatirlatma")).toEqual({ acik: false, saat: "19:30" });
  });
  it("izin bir kez sorulur; reddedilirse kurulmaz ve yeniden sorulmaz", async () => {
    L.checkPermissions.mockResolvedValue({ display: "prompt" });
    L.requestPermissions.mockResolvedValue({ display: "denied" });
    await hatirlatmaKur(60); await hatirlatmaKur(60);
    expect(L.requestPermissions).toHaveBeenCalledTimes(1);
    expect(L.schedule).not.toHaveBeenCalled();
  });
  it("üst üste çağrılar sırayla koşar", async () => {
    const sira: string[] = [];
    L.cancel.mockImplementation(async () => { sira.push("sil"); });
    L.schedule.mockImplementation(async () => { sira.push("kur"); });
    await Promise.all([hatirlatmaKur(60, new Date(2026, 10, 24, 10, 0)), hatirlatmaKur(60, new Date(2026, 10, 24, 10, 0))]);
    expect(sira).toEqual(["sil", "kur", "sil", "kur"]);
  });
});
