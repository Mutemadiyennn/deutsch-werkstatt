/** LS-17.0 / WORLD §6: gerçek takvime bağlı mevsim senaryoları. Tarih Europe/Berlin'e göre (AA-GG); aralık yıl sonunu sarabilir (ör. 12-20 → 01-06). */
export type Season = { id: string; from: string; to: string; title_tr: string };

export function monthDay(now: number, tz = "Europe/Berlin"): string {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, month: "2-digit", day: "2-digit" }).formatToParts(new Date(now));
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "00";
  return `${g("month")}-${g("day")}`;
}

export function inSeason(md: string, s: Pick<Season, "from" | "to">): boolean {
  return s.from <= s.to ? md >= s.from && md <= s.to : md >= s.from || md <= s.to;
}

export function seasonal<T extends { season?: Season; order: number }>(list: T[], now: number): T[] {
  const md = monthDay(now);
  return list.filter((x) => x.season && inSeason(md, x.season)).sort((a, b) => a.order - b.order);
}

/** Öğren listesi (PM-044.1): mevsim dersleri yalnızca kendi mevsimlerinde görünür ve sayılır */
export function visibleScenarios<T extends { season?: Season }>(list: T[], now: number): T[] {
  const md = monthDay(now);
  return list.filter((x) => !x.season || inSeason(md, x.season));
}
