/** Kullanıcı başına günlük sayaç (KV). Ücretsiz plan: günde 1.000 KV yazma; yapay zekâ sınırı bunun altında tutulur. */
import type { Env } from "./env.ts";
import { HttpError } from "./http.ts";

export const dayKey = (d = new Date()) => d.toISOString().slice(0, 10); // UTC günü
const key = (uid: string, day: string) => `q:ai:${uid}:${day}`;
export const aiLimit = (env: Env) => Math.max(1, Number(env.AI_DAILY_LIMIT || 300));

export async function aiUsage(env: Env, uid: string, day = dayKey()) {
  const used = Number((await env.QUOTA.get(key(uid, day))) || 0);
  return { day, used, limit: aiLimit(env) };
}

/** Sınır aşıldıysa quota_user fırlatır; aşılmadıysa sayacı bir artırır */
export async function takeAi(env: Env, uid: string) {
  const u = await aiUsage(env, uid);
  if (u.used >= u.limit) throw new HttpError("quota_user");
  await env.QUOTA.put(key(uid, u.day), String(u.used + 1), { expirationTtl: 3 * 86400 });
  return { ...u, used: u.used + 1 };
}
