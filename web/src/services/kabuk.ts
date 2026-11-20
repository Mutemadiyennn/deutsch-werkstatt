/**
 * iPhone kabuğu görünürlüğü (PM-071 1. adım): telefondaki kabuğun sürümü ve içinde GERÇEKTEN bulunan eklentiler.
 * Kabuk sürümü yapımda Info.plist'e yazılır (ios-build.yml, kabuk.json); burada çalışma anında okunur. Tarayıcıda kabuk yoktur.
 * Ekranlar Capacitor'ı doğrudan çağırmaz; bu dosya tek giriş noktasıdır.
 */
type Cap = { isNativePlatform?: () => boolean; isPluginAvailable?: (ad: string) => boolean; Plugins?: Record<string, any> } | undefined;

/** kabuğa kurulan eklentiler (ios-build.yml ile aynı liste): eklenti adı → öğrenciye görünen Türkçe ad */
export const KABUK_EKLENTILERI: readonly (readonly [string, string])[] = [
  ["SpeechRecognition", "konuşma tanıma"],
  ["VoiceRecorder", "ses kaydı"],
  ["TextToSpeech", "seslendirme"],
  ["Haptics", "titreşim"],
  ["LocalNotifications", "bildirim"],
  ["Keyboard", "klavye"],
  ["StatusBar", "durum çubuğu"],
  ["Badge", "rozet"],
  ["Share", "paylaşım"],
  ["App", "uygulama"],
];

export type KabukBilgisi =
  | { kabukta: false }
  | { kabukta: true; surum: string | null; var: string[]; yok: string[] };

export async function kabukBilgisi(cap: Cap = (globalThis as any).Capacitor): Promise<KabukBilgisi> {
  if (!cap?.isNativePlatform?.()) return { kabukta: false };
  const bulunur = (ad: string) => { try { return cap.isPluginAvailable ? !!cap.isPluginAvailable(ad) : !!cap.Plugins?.[ad]; } catch { return false; } };
  const v: string[] = [], y: string[] = [];
  for (const [ad, tr] of KABUK_EKLENTILERI) (bulunur(ad) ? v : y).push(tr);
  let surum: string | null = null;
  try {
    const i = await cap.Plugins?.App?.getInfo?.();
    if (i?.version) surum = i.build && i.build !== i.version ? `${i.version} (${i.build})` : String(i.version);
  } catch { /* App eklentisi yoksa sürüm bilinmez */ }
  return { kabukta: true, surum, var: v, yok: y };
}

/** Profil → Ses ve mikrofon satırı */
export function kabukSatiri(b: KabukBilgisi): string {
  if (!b.kabukta) return "Kabuk: yok (tarayıcıda açık)";
  const s = `Kabuk ${b.surum ?? "sürümü bilinmiyor"}`;
  return `${s} · eklentiler: ${b.var.join(", ") || "yok"}${b.yok.length ? ` · eksik: ${b.yok.join(", ")}` : ""}`;
}
