import { describe, expect, it } from "vitest";
import { inSeason, monthDay, seasonal } from "./season";

const T = (iso: string) => Date.parse(iso);
const adv = { id: "advent", from: "11-23", to: "12-24", title_tr: "Advent" };
const wrap = { id: "rauhnacht", from: "12-25", to: "01-06", title_tr: "Yıl dönümü" };

describe("mevsim (LS-17.0)", () => {
  it("ay-gün Europe/Berlin'e göre", () => {
    expect(monthDay(T("2099-11-22T23:30:00Z"))).toBe("11-23"); // Berlin'de gece yarısını geçti
    expect(monthDay(T("2099-11-22T22:30:00Z"))).toBe("11-22");
  });
  it("aralık içi ve sınırlar", () => {
    expect(inSeason("11-22", adv)).toBe(false);
    expect(inSeason("11-23", adv)).toBe(true);
    expect(inSeason("12-24", adv)).toBe(true);
    expect(inSeason("12-25", adv)).toBe(false);
  });
  it("yıl sonunu saran aralık", () => {
    expect(inSeason("12-31", wrap)).toBe(true);
    expect(inSeason("01-03", wrap)).toBe(true);
    expect(inSeason("02-01", wrap)).toBe(false);
  });
  it("yalnızca mevsimdeki senaryolar, sıralı", () => {
    const list = [{ id: "b", order: 2, season: adv }, { id: "x", order: 1 }, { id: "a", order: 1, season: adv }, { id: "w", order: 0, season: wrap }];
    expect(seasonal(list, T("2099-11-30T10:00:00Z")).map((x) => x.id)).toEqual(["a", "b"]);
    expect(seasonal(list, T("2099-07-01T10:00:00Z"))).toEqual([]);
  });
});

import { recommend } from "./planner";
import { visibleScenarios } from "./season";
import { defaultProfile } from "@dw/shared";

// PM-044.1: mevsim dersi ana yola girmez; Öğren'de yalnızca mevsiminde görünür
describe("mevsim dersi ana yolda değil", () => {
  const sc = [
    { id: "sc:arbeit:m1-weihnachtsfeier", domain: "arbeit", order: 0, season: adv, title_tr: "Noel", review: "reviewed" },
    { id: "sc:arbeit:01-x", domain: "arbeit", order: 5, title_tr: "Normal", review: "reviewed" }
  ];
  it("recommend() hiçbir tarihte season'lı senaryo döndürmez", () => {
    const p = defaultProfile(); p.domains.priority = ["arbeit", ...p.domains.priority.filter((d) => d !== "arbeit")];
    for (const n of [1, 2, 5]) {
      const r = recommend({ profile: p, index: { scenarios: sc } as any, hasPlacement: true, sessionN: n });
      if (r.kind === "scenario") expect(r.scenarioId).toBe("sc:arbeit:01-x");
    }
    const onlySeason = recommend({ profile: p, index: { scenarios: [sc[0]] } as any, hasPlacement: true, sessionN: 1 });
    expect(onlySeason.kind === "scenario" && onlySeason.scenarioId === sc[0]!.id).toBe(false);
  });
  it("Öğren: Temmuz'da mevsim dersi listelenmez, 30 Kasım'da listelenir", () => {
    expect(visibleScenarios(sc, T("2027-07-01T10:00:00Z")).map((s) => s.id)).toEqual(["sc:arbeit:01-x"]);
    expect(visibleScenarios(sc, T("2026-11-30T10:00:00Z")).map((s) => s.id)).toContain("sc:arbeit:m1-weihnachtsfeier");
  });
});
