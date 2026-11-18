/** LS-17.0 / WORLD §6: gerçek takvime bağlı mevsim senaryoları. Tarih Europe/Berlin'e göre (AA-GG); aralık yıl sonunu sarabilir (ör. 12-20 → 01-06). */
export type Season = { id: string; from: string; to: string; title_tr: string };

// Intl.DateTimeFormat'ı saat dilimiyle kurmak WebKit'te pahalı (CI'da Bugün ekranının ilk karesi 200–500 ms gecikiyordu;
// Bugün her saniye yeniden çizildiği için her seferinde kuruluyordu): biçimleyici dilim başına bir kez, sonuç dakika başına önbellekte
const fmts = new Map<string, Intl.DateTimeFormat>();
let last: { key: string; v: string } | null = null;
export function monthDay(now: number, tz = "Europe/Berlin"): string {
  const key = `${tz}|${Math.floor(now / 60_000)}`;
  if (last?.key === key) return last.v;
  let f = fmts.get(tz);
  if (!f) { f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, month: "2-digit", day: "2-digit" }); fmts.set(tz, f); }
  const p = f.formatToParts(new Date(now));
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "00";
  last = { key, v: `${g("month")}-${g("day")}` };
  return last.v;
}

export function inSeason(md: string, s: Pick<Season, "from" | "to">): boolean {
  return s.from <= s.to ? md >= s.from && md <= s.to : md >= s.from || md <= s.to;
}

export function seasonal<T extends { season?: Season; order: number }>(list: T[], now: number): T[] {
  const md = monthDay(now);
  return list.filter((x) => x.season && inSeason(md, x.season)).sort((a, b) => a.order - b.order);
}
