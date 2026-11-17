/**
 * Seslendirme temizliği — v1 app/src/js/00-tts-clean.js'ten taşındı.
 * Kural: noktalama ve işaretler asla sesli okunmaz ("eksi", "nokta", "bölü" yok).
 * v2 düzeltmesi: kelimeye bitişik tire ("-ebilmek", "-e", "Kinder-") artık okunmuyor (v1 bilinen hatası).
 */
export function ttsClean(t: unknown): string {
  return String(t == null ? "" : t)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s*(?:->|=>|→|←|⇒|➜|➔)\s*/g, ", ")
    .replace(/(^|\s)[–—-]+(?=\s|$)/g, ",")
    .replace(/(^|[\s(])[-–](?=\p{L})/gu, "$1")
    .replace(/(?<=\p{L})[-–](?=[\s.,;:!?)]|$)/gu, "")
    .replace(/(^|[\s(])['‘’]([^'‘’]{1,60})['‘’](?=[\s.,;:!?)]|$)/g, "$1$2")
    .replace(/[()[\]{}„“”"«»‹›*_#~=+|<>^`]/g, " ")
    .replace(/\s*\/\s*/g, ", ")
    .replace(/(^|\s)[.,;:!?…]+(?=\s|$)/g, " ")
    .replace(/\s*,\s*(,\s*)+/g, ", ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/([.!?…])\s*,+/g, "$1")
    .replace(/^[\s,.;:]+/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const TTS_DE = /\b(ich|du|er|es|wir|ihr|sie|ist|bin|bist|sind|hat|habe|der|die|das|den|dem|ein|eine|einen|nicht|kein|keine|und|oder|mit|zu|auf|im|am|um|mein|meine|dein|wie|wo|was|woher|heute|morgen|gern|sehr|auch)\b/i;
export function segLang(seg: string): "tr" | "de" | null {
  if (/[çğış]|\b(ve|bir|bu|ne|için|değil|mı|mi|mu|mü|ben|sen|o|biz|siz|onlar|evet|hayır)\b/i.test(seg)) return "tr";
  if (/[äß]/i.test(seg) || TTS_DE.test(seg)) return "de";
  return null;
}

/** "Ich arbeite – Ben çalışıyorum" gibi karışık satırlar: her parça kendi diliyle okunur (v1 davranışı) */
export function splitForSpeech(text: string, lang: "tr" | "de"): { text: string; lang: "tr" | "de" }[] {
  const raw = String(text ?? "");
  if (lang === "tr" && /\s[–—-]\s|:\s/.test(raw)) {
    const parts = raw.split(/\s[–—-]\s|:\s/).map((x) => x.trim()).filter(Boolean);
    const langs = parts.map(segLang);
    if (parts.length > 1 && langs.includes("de")) {
      return parts.map((p, i) => ({ text: ttsClean(p), lang: langs[i] || lang })).filter((x) => /[\p{L}\p{N}]/u.test(x.text));
    }
  }
  const c = ttsClean(raw);
  return /[\p{L}\p{N}]/u.test(c) ? [{ text: c, lang }] : [];
}
