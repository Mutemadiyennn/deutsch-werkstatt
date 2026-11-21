/**
 * PM 7055725467 md. 2 (karar a): Pixabay aracısı — MEDYA'nın fotoğraf avı için, uygulamanın kullanıcısı için değil.
 *   GET /v1/pixabay?q=&n=&lang=   yalnız `Authorization: Bearer <RAF_ARAC_JETONU>` (≥ 32 karakter Worker gizli değeri;
 *   Firebase kimliğinden ayrı). Yanlış jetonda sabit gecikme + 404 (raf gibi). Pixabay anahtarı `PIXABAY_KEY` gizli değerinden
 *   sunucuda eklenir; yanıtta, hata iletisinde ve önbellek anahtarında geçmez.
 *   Dönen: `hits[]`'ten yalnız id, pageURL, webformatURL, largeImageURL, user, tags.
 *   KV: 24 saat önbellek (Pixabay'in istediği) ve Pixabay'e günlük en çok 300 istek (önbellekten dönen sayılmaz).
 */
import { HttpError } from "./http.ts";
import type { Env } from "./env.ts";

export const ARAC_JETON_EN_AZ = 32, PIXABAY_GUNLUK = 300, YANLIS_GECIKME_MS = 1200;
export interface PixabayHit { id: number; pageURL: string; webformatURL: string; largeImageURL: string; user: string; tags: string }

/** sabit süreli karşılaştırma (uzunluk farkı da tek geçişte) */
const esit = (a: string, b: string) => { let d = a.length ^ b.length; for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0); return d === 0; };

/** Jeton doğruysa true; değilse sabit gecikmeden sonra false. Jeton tanımsız ya da kısaysa not_configured */
export async function aracJetonu(req: Request, env: Env, bekle: (ms: number) => Promise<void> = (ms) => new Promise((r) => setTimeout(r, ms))): Promise<boolean> {
  const jeton = (env.RAF_ARAC_JETONU ?? "").trim();
  if (jeton.length < ARAC_JETON_EN_AZ) throw new HttpError("not_configured", "RAF_ARAC_JETONU");
  const m = /^Bearer\s+(.+)$/.exec(req.headers.get("Authorization") ?? "");
  if (m && esit(m[1]!.trim(), jeton)) return true;
  await bekle(YANLIS_GECIKME_MS);
  return false;
}

export async function pixabayAra(env: Env, q: string, n = 20, lang = "en"): Promise<PixabayHit[]> {
  const sorgu = q.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 100);
  if (!sorgu) throw new HttpError("invalid_request", "q");
  if (!env.PIXABAY_KEY) throw new HttpError("not_configured", "PIXABAY_KEY");
  const dil = ["de", "en", "tr"].includes(lang) ? lang : "en", adet = Math.max(1, Math.min(50, Math.floor(n) || 20));
  const onbellek = `pxb:${dil}:${sorgu}`;
  const hit = await env.QUOTA.get(onbellek);
  if (hit) { try { return (JSON.parse(hit) as PixabayHit[]).slice(0, adet); } catch { /* bozuk kayıt: yeniden sor */ } }
  const gun = `q:pxb:${new Date().toISOString().slice(0, 10)}`, say = Number((await env.QUOTA.get(gun)) || 0);
  if (say >= PIXABAY_GUNLUK) throw new HttpError("quota_user", "pixabay günlük");
  await env.QUOTA.put(gun, String(say + 1), { expirationTtl: 2 * 86400 });
  const ac = new AbortController(), t = setTimeout(() => ac.abort(), 8000);
  try {
    const u = `https://pixabay.com/api/?key=${encodeURIComponent(env.PIXABAY_KEY)}&q=${encodeURIComponent(sorgu)}&lang=${dil}&image_type=photo&safesearch=true&per_page=50`;
    const r = await fetch(u, { signal: ac.signal });
    if (r.status === 429) throw new HttpError("quota_upstream");
    if (r.status === 400 || r.status === 401 || r.status === 403) throw new HttpError("not_configured", `pixabay ${r.status}`);
    if (!r.ok) throw new HttpError("upstream_busy", `pixabay ${r.status}`);
    const j = (await r.json()) as { hits?: Record<string, unknown>[] };
    const out: PixabayHit[] = (j.hits ?? []).map((h) => ({ id: Number(h.id), pageURL: String(h.pageURL ?? ""), webformatURL: String(h.webformatURL ?? ""), largeImageURL: String(h.largeImageURL ?? ""), user: String(h.user ?? ""), tags: String(h.tags ?? "") }));
    await env.QUOTA.put(onbellek, JSON.stringify(out), { expirationTtl: 86400 });
    return out.slice(0, adet);
  } catch (e) {
    if (e instanceof HttpError) throw e;
    throw new HttpError((e as Error).name === "AbortError" ? "timeout" : "upstream_busy");
  } finally { clearTimeout(t); }
}
