/** Pexels fotoğraf araması (anahtar yalnızca sunucuda). KV önbelleği 30 gün; ücretsiz planda günde 1.000 KV yazma sınırına uygun. */
import { HttpError } from "./http.ts";
import type { Env } from "./env.ts";

export interface Photo { id: number; src: string; w: number; h: number; alt: string; credit: string; url: string }

export async function searchPhotos(env: Env, q: string, n = 8): Promise<Photo[]> {
  const query = q.trim().toLowerCase().slice(0, 80);
  if (!query) throw new HttpError("invalid_request", "q");
  if (!env.PEXELS_KEY) throw new HttpError("not_configured", "PEXELS_KEY");
  const key = `ph:${query}`;
  const hit = await env.QUOTA.get(key);
  if (hit) { try { return (JSON.parse(hit) as Photo[]).slice(0, n); } catch {} }
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 8000);
  try {
    const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`, { headers: { Authorization: env.PEXELS_KEY }, signal: ac.signal });
    if (r.status === 429) throw new HttpError("quota_upstream");
    if (r.status === 401 || r.status === 403) throw new HttpError("not_configured", "pexels key");
    if (!r.ok) throw new HttpError("upstream_busy", `pexels ${r.status}`);
    const j = (await r.json()) as { photos?: any[] };
    const out: Photo[] = (j.photos || []).map((p) => ({ id: p.id, src: p.src?.medium || p.src?.small, w: p.width, h: p.height, alt: p.alt || "", credit: p.photographer || "", url: p.url }));
    await env.QUOTA.put(key, JSON.stringify(out), { expirationTtl: 30 * 86400 });
    return out.slice(0, n);
  } catch (e) {
    if (e instanceof HttpError) throw e;
    throw new HttpError((e as Error).name === "AbortError" ? "timeout" : "upstream_busy");
  } finally { clearTimeout(t); }
}
