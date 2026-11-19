/**
 * PM-061 / D-112 (#58 B12) kapalı medya rafı: Cloudflare Pages Function'ının mantığı. Gizli depoya (`dw-medya`)
 * `functions/_middleware.ts` olarak kopyalanır (doldurma hattı); burada test edilir. Ağ adresi, anahtar ve hesap bilgisi
 * yoktur: anahtar Pages projesinin gizli değişkeni `MEDYA_ANAHTARI`.
 *  - OPTIONS (ön uçuş): yalnızca izinli kökene CORS; içerik yok.
 *  - Öteki istekler: `Authorization: Bearer <anahtar>` doğruysa dosya (`Cache-Control: private`), değilse 404.
 *  - Parola taraması: yanlış anahtarda sabit gecikme (PM 14:40 madde 1a). Karşılaştırma sabit sürede.
 *  - Yönlendirme yok, çerez yok.
 *  - Günlük ücretsiz kota (100.000 istek, Workers ile ortak) dolarsa Pages varsayılanı "fail open"dır: Function atlanır ve
 *    dosyalar anahtarsız sunulur. Bu yüzden projede **"Fail closed"** zorunludur (D-112; proje sahibinin adımı). Kota
 *    dolunca raf o gün 1027 hatası verir, uygulama açık yedeği gösterir.
 */
export const RAF_KOKENLER = ["https://mutemadiyennn.github.io", "capacitor://localhost"];
export const YANLIS_GECIKME_MS = 1200;
/** Anahtar alt sınırı (inceleme #98 P2): 32 karakter; proje sahibi üretilmiş rastgele anahtar kullanır */
export const ANAHTAR_EN_AZ = 32;

export interface RafEnv { MEDYA_ANAHTARI?: string; KOKENLER?: string }

function esit(a: string, b: string): boolean {
  // sabit süreli karşılaştırma: uzunluk farkı da tek geçişte
  let d = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
}

function cors(origin: string | null, env: RafEnv): Record<string, string> {
  const izin = [...RAF_KOKENLER, ...(env.KOKENLER ?? "").split(",").map((x) => x.trim()).filter(Boolean)];
  if (!origin || !izin.includes(origin)) return {};
  return { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Headers": "Authorization, Range", "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS", "Access-Control-Max-Age": "600" };
}

/** Pages Function gövdesi: `dosya` = `ctx.next()` ya da `env.ASSETS.fetch(request)`; `bekle` testte sıfırlanabilir */
export async function rafYanit(req: Request, env: RafEnv, dosya: () => Promise<Response>, bekle: (ms: number) => Promise<void> = (ms) => new Promise((r) => setTimeout(r, ms))): Promise<Response> {
  const c = cors(req.headers.get("Origin"), env);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...c, Vary: "Origin" } });
  const yok = () => new Response("Not found", { status: 404, headers: { ...c, "Cache-Control": "no-store", Vary: "Origin" } });
  if (req.method !== "GET" && req.method !== "HEAD") return yok();
  const anahtar = (env.MEDYA_ANAHTARI ?? "").trim();   // panele yapıştırırken gelen boşluk/satır sonu
  const m = /^Bearer\s+(.+)$/.exec(req.headers.get("Authorization") ?? "");
  if (!anahtar || anahtar.length < ANAHTAR_EN_AZ || !m || !esit(m[1]!.trim(), anahtar)) { await bekle(YANLIS_GECIKME_MS); return yok(); }
  const r = await dosya();
  // 200, 206 (aralık) ve 304 (koşullu istek) olduğu gibi geçer; öteki her şey 404 (yönlendirme dahil; inceleme #98 P2)
  if (!(r.status === 200 || r.status === 206 || r.status === 304)) return yok();
  const h = new Headers(r.headers);
  for (const [k, v] of Object.entries(c)) h.set(k, v);
  const vary = (h.get("Vary") ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  if (!vary.some((x) => x.toLowerCase() === "origin")) vary.push("Origin");
  h.set("Vary", vary.join(", "));
  h.set("Cache-Control", "private, max-age=31536000, immutable");
  h.delete("Set-Cookie");
  return new Response(req.method === "HEAD" || r.status === 304 ? null : r.body, { status: r.status, headers: h });
}

/** Pages Function sarmalayıcısı (gizli depoda `functions/_middleware.ts`; tip Cloudflare'in PagesFunction'ı) */
export const onRequest = (ctx: { request: Request; env: RafEnv; next: () => Promise<Response> }) => rafYanit(ctx.request, ctx.env, () => ctx.next());
