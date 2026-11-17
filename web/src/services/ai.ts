/**
 * Yapay zekâ istemcisi (PEDAGOGY §7d–e):
 *  - devre kesici: art arda 3 hata → 5 dk yapay zekâsız mod
 *  - önbellek zorunlu: equiv_check, explain_tr, say_it_de (IndexedDB)
 *  - hızlı görevlerde 12 sn, konuşmada 30 sn üst sınır; hata kodları Türkçe (shared ERROR_TR)
 */
import type { AiInput, AiOutput, AiTaskName } from "@dw/shared";
import { ApiError, type Api } from "./api.ts";
import { cacheGet, cachePut } from "../data/db.ts";

const CACHED: AiTaskName[] = ["equiv_check", "explain_tr", "say_it_de"];
/** Kalite gerektiren görevler: güçlü model; istemci 12 sn'de "Biraz uzun sürüyor" seçeneklerini gösterir, isteği kesmez */
export const SLOW: AiTaskName[] = ["roleplay_turn", "feedback_tr"];
export const SOFT_WAIT_MS = 12_000;

/* Süre ölçümü (rapor için p50/p95): görev başına son 200 cevap süresi, bu cihazda */
const LAT_KEY = "dw2-ai-latency";
export function latencyAdd(task: AiTaskName, ms: number) {
  try { const all = JSON.parse(localStorage.getItem(LAT_KEY) || "{}") as Record<string, number[]>; (all[task] ||= []).push(Math.round(ms)); all[task] = all[task]!.slice(-200); localStorage.setItem(LAT_KEY, JSON.stringify(all)); } catch { /* depolama yoksa ölçüm atlanır */ }
}
export function latencyStats(): Record<string, { n: number; p50: number; p95: number }> {
  const q = (a: number[], p: number) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * (s.length - 1) + 0.5))] ?? 0; };
  try { const all = JSON.parse(localStorage.getItem(LAT_KEY) || "{}") as Record<string, number[]>; return Object.fromEntries(Object.entries(all).map(([k, v]) => [k, { n: v.length, p50: q(v, 0.5), p95: q(v, 0.95) }])); } catch { return {}; }
}
const BREAK_AFTER = 3, OPEN_MS = 5 * 60_000;
let fails = 0, openUntil = 0;
const subs = new Set<() => void>();
export const onAiState = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
const emit = () => subs.forEach((f) => f());

export function aiState(api: Api): { available: boolean; reason?: string; openUntil?: number } {
  if (!api.configured) return { available: false, reason: "Sunucu henüz bağlanmadı (anahtarlar Cloudflare'de değil)." };
  if (Date.now() < openUntil) return { available: false, reason: `Yapay zekâ art arda hata verdi; ${Math.ceil((openUntil - Date.now()) / 60000)} dk yapay zekâsız devam ediliyor.`, openUntil };
  return { available: true };
}
export function resetBreakerForTests() { fails = 0; openUntil = 0; }

async function hash(s: string) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(b).slice(0, 12)).map((x) => x.toString(16).padStart(2, "0")).join("");
}

export async function ai<T extends AiTaskName>(api: Api, task: T, vars: AiInput<T>): Promise<AiOutput<T>> {
  const st = aiState(api);
  if (!st.available) throw new ApiError("not_configured", st.reason!, false);
  const key = CACHED.includes(task) ? `${task}:${await hash(JSON.stringify(vars))}` : null;
  if (key) { const c = await cacheGet<AiOutput<T>>(key); if (c) return c; }
  const t0 = performance.now();
  try {
    const out = await api.ai(task, vars, SLOW.includes(task) ? 45_000 : 12_000); // konuşma: toplam bütçe ≤45 sn; 12 sn uyarısı ekranda (çağrı kesilmez)
    latencyAdd(task, performance.now() - t0);
    fails = 0;
    if (key) await cachePut(key, out);
    return out;
  } catch (e) {
    // kullanıcı kotası ve kimlik hataları devre kesiciyi tetiklemez (kalıcı durumlar)
    if (!(e instanceof ApiError) || !["quota_user", "unauthenticated", "forbidden"].includes(e.code)) {
      fails++;
      if (fails >= BREAK_AFTER) { openUntil = Date.now() + OPEN_MS; fails = 0; emit(); }
    }
    throw e;
  }
}
