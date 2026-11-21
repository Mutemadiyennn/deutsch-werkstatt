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
  /** Gizli: Pixabay API anahtarı (yalnız MEDYA aracı /v1/pixabay; PM 7055725467 md. 2) */
  PIXABAY_KEY?: string;
  /** Gizli: MEDYA aracının jetonu (≥ 32 karakter; Firebase kimliğinden ayrı) */
  RAF_ARAC_JETONU?: string;
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
  /**
   * Yapay zekâ sağlayıcısı (PM-019, D-093): "workers-ai" (PM 7022002310-5, deneme) ya da "gemini" (kapalı; kod duruyor).
   * Başka her değer (boş dahil) = kapalı.
   */
  AI_PROVIDER?: string;
  /** Workers AI bağlamı (wrangler.toml [ai]); anahtar gerekmez, ücretsiz pay (PM 7022002310-5) */
  AI?: { run(model: string, input: unknown): Promise<any> };
  /** Kota sayaçları */
  QUOTA: KV;
}
export const VERSION = "0.1.0";
