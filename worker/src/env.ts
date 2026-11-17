/** Worker ortamı. Gizli değerler yalnızca `wrangler secret put` ile girilir; depoda ve istemcide bulunmaz. */
export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}
export interface Env {
  /** Gizli: Gemini API anahtarı */
  GEMINI_KEY?: string;
  /** Gizli: Pexels API anahtarı (fotoğraflar) */
  PEXELS_KEY?: string;
  /** Gizli: izinli Firebase uid listesi (virgülle) */
  ALLOWED_UIDS?: string;
  /** Firebase proje kimliği (gizli değil) */
  FIREBASE_PROJECT_ID: string;
  /** CORS izinli kaynaklar (virgülle) */
  ALLOWED_ORIGINS: string;
  /** Günlük yapay zekâ istek sınırı (kullanıcı başına) */
  AI_DAILY_LIMIT?: string;
  /** İsteğe bağlı sabit model tercihi (virgülle, öncelik sırası); boşsa listeden en yeni flash seçilir */
  GEMINI_MODELS?: string;
  /** Kota sayaçları */
  QUOTA: KV;
}
export const VERSION = "0.1.0";
