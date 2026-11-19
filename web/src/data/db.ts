/**
 * Cihazdaki veritabanı (IndexedDB, Dexie) — v2 verisinin tek doğruluk kaynağı.
 * Firestore eşitlemesi sonraki fazda (BLUEPRINT T11); her kayıtta `u` (değişiklik zamanı) bunun için tutulur.
 */
import Dexie, { type Table } from "dexie";
import { Profile, defaultProfile, migrateDomainPriority, type AnswerClaim, type Assessment, type FocusDay, type LearnerItem, type PersonalWord, type ScenarioProgress } from "@dw/shared";
import type { Runtime } from "../core/focus.ts";

interface Meta { key: string; value: unknown }

export class DwDB extends Dexie {
  meta!: Table<Meta, string>;
  profile!: Table<Profile, string>;
  items!: Table<LearnerItem, string>;
  focusDays!: Table<FocusDay, string>;
  assess!: Table<Assessment, string>;
  scenarios!: Table<ScenarioProgress, string>;
  claims!: Table<AnswerClaim, number>;
  personal!: Table<PersonalWord, string>;
  aicache!: Table<{ key: string; value: unknown; at: number }, string>;
  constructor(name = "dw2") {
    super(name);
    this.version(1).stores({
      meta: "&key",
      profile: "&id",
      items: "&itemId, kind, inBank, u",
      focusDays: "&date, u",
      assess: "&id, startedAt, type"
    });
    // v2: oynatıcı (senaryo ilerlemesi), "benim cevabım da doğru" kuyruğu, kişisel kelimeler (K3), yapay zekâ önbelleği
    this.version(2).stores({
      scenarios: "&scenarioId, u",
      claims: "++id, at, scenarioId",
      personal: "&id, at",
      aicache: "&key, at"
    });
  }
}

export let db = new DwDB();
/** Testler için ayrı veritabanı */
export function useDb(d: DwDB) { db = d; }

export async function getProfile(): Promise<Profile> {
  const p = await db.profile.get("me");
  if (p) {
    const r = Profile.safeParse(p);
    if (r.success) {
      // 13 → 20 alan geçişi (PEDAGOGY §4)
      const pr = migrateDomainPriority(r.data.domains.priority);
      if (pr.join() !== r.data.domains.priority.join()) { r.data.domains.priority = pr; await db.profile.put(r.data); }
      return r.data;
    }
    // şema bozulmuşsa bilinen alanları koruyarak varsayılanla birleştir
    const merged = Profile.safeParse({ ...defaultProfile(), ...p, focus: { ...defaultProfile().focus, ...(p as any).focus } });
    if (merged.success) { await db.profile.put(merged.data); return merged.data; }
  }
  const d = defaultProfile();
  await db.profile.put(d);
  return d;
}
export async function saveProfile(p: Profile): Promise<Profile> {
  const v = Profile.parse(p);
  await db.profile.put(v);
  return v;
}

export async function getMeta<T>(key: string): Promise<T | undefined> { return (await db.meta.get(key))?.value as T | undefined; }
export async function setMeta(key: string, value: unknown) { await db.meta.put({ key, value }); }

export async function saveFocus(day: FocusDay, rt: Runtime, previous?: FocusDay) {
  await db.transaction("rw", db.focusDays, db.meta, async () => {
    if (previous) await db.focusDays.put(structuredClone(previous));
    await db.focusDays.put(structuredClone(day));
    await db.meta.put({ key: "focusRuntime", value: structuredClone(rt) });
  });
}
export async function loadFocus(date: string): Promise<{ day?: FocusDay; rt?: Runtime }> {
  return { day: await db.focusDays.get(date), rt: await getMeta<Runtime>("focusRuntime") };
}
export async function focusRange(from: string, to: string): Promise<FocusDay[]> {
  return db.focusDays.where("date").between(from, to, true, true).toArray();
}

export async function saveAssessment(a: Assessment) { await db.assess.put(structuredClone(a)); }
export async function latestPlacement(): Promise<Assessment | undefined> {
  const all = await db.assess.where("type").equals("placement").toArray();
  return all.filter((a) => a.finishedAt).sort((a, b) => (b.finishedAt! > a.finishedAt! ? 1 : -1))[0];
}
export async function openAssessment(): Promise<Assessment | undefined> {
  const all = await db.assess.toArray();
  return all.filter((a) => !a.finishedAt).sort((a, b) => (b.startedAt > a.startedAt ? 1 : -1))[0];
}

export async function putItems(list: LearnerItem[]) { if (list.length) await db.items.bulkPut(list.map((x) => structuredClone(x))); }
export async function itemsMap(ids: string[]): Promise<Map<string, LearnerItem>> {
  const got = await db.items.bulkGet(ids);
  return new Map(got.filter((x): x is LearnerItem => !!x).map((x) => [x.itemId, x]));
}
export async function bankItems(limit = 50): Promise<LearnerItem[]> {
  const all = await db.items.toArray();
  return all.filter((i) => i.inBank).sort((a, b) => b.u - a.u).slice(0, limit);
}
export async function itemStats() {
  const all = await db.items.toArray();
  return {
    total: all.length,
    passiveKnown: all.filter((i) => i.passive.ok > 0).length,
    activeKnown: all.filter((i) => i.active.ok > 0).length,
    bank: all.filter((i) => i.inBank).length,
    durable: all.filter((i) => i.durable).length
  };
}

/** Bütün v2 verisinin dışa aktarımı (yedek) */
export async function exportAll() {
  return {
    format: "deutsch-werkstatt-v2",
    exportedAt: new Date().toISOString(),
    profile: await db.profile.toArray(),
    items: await db.items.toArray(),
    focusDays: await db.focusDays.toArray(),
    assess: await db.assess.toArray(),
    scenarios: await db.scenarios.toArray(),
    personal: await db.personal.toArray(),
    claims: await db.claims.toArray()
  };
}

/* ---------- oynatıcı ---------- */
export async function getScenarioProgress(id: string): Promise<ScenarioProgress> {
  return (await db.scenarios.get(id)) || { scenarioId: id, done: [], support: 3, runs: [], u: 0 };
}
export async function saveScenarioProgress(p: ScenarioProgress) { await db.scenarios.put(structuredClone({ ...p, u: Date.now() })); }
export async function getItem(id: string) { return db.items.get(id); }
export async function putItem(it: LearnerItem) { await db.items.put(structuredClone(it)); }
export async function addClaim(c: AnswerClaim) { await db.claims.add(c); }
export async function addPersonal(w: PersonalWord) { await db.personal.put(w); }
export async function personalWords() { return (await db.personal.toArray()).sort((a, b) => (a.at < b.at ? 1 : -1)); }
export async function dueItems(path: "passive" | "active", now = new Date(), limit = 50): Promise<LearnerItem[]> {
  const all = await db.items.toArray();
  return all.filter((i) => { const s = path === "passive" ? i.passive : i.active; return s.fsrs && new Date(s.fsrs.due) <= now; }).slice(0, limit);
}
export async function cacheGet<T>(key: string, maxAgeMs = 30 * 86400_000): Promise<T | undefined> {
  const r = await db.aicache.get(key);
  return r && Date.now() - r.at < maxAgeMs ? (r.value as T) : undefined;
}
export async function cachePut(key: string, value: unknown) { await db.aicache.put({ key, value, at: Date.now() }); }
/** meta anahtarı önekiyle (ör. "ders:") bütün kayıtlar */
export async function metaPrefix<T>(prefix: string): Promise<{ key: string; value: T }[]> {
  return (await db.meta.where("key").startsWith(prefix).toArray()) as { key: string; value: T }[];
}
