/* ===== Seslendirme temizliği: noktalama ve işaretler asla sesli okunmaz ("eksi", "nokta", "bölü" yok) ===== */
function ttsClean(t){
  return String(t == null ? "" : t)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s*(?:->|=>|→|←|⇒|➜|➔)\s*/g, ", ")
    .replace(/(^|\s)[–—-]+(?=\s|$)/g, ",")
    .replace(/(^|[\s(])['‘’]([^'‘’]{1,60})['‘’](?=[\s.,;:!?)]|$)/g, "$1$2")
    .replace(/[()\[\]{}„“”"«»‹›*_#~=+|<>^`]/g, " ")
    .replace(/\s*\/\s*/g, ", ")
    .replace(/(^|\s)[.,;:!?…]+(?=\s|$)/g, " ")
    .replace(/\s*,\s*(,\s*)+/g, ", ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/([.!?…])\s*,+/g, "$1")
    .replace(/^[\s,.;:]+/, "")
    .replace(/\s{2,}/g, " ").trim();
}
/* "Ich arbeite – Ben çalışıyorum" gibi karışık satırlar: her parça kendi dilinin sesiyle okunur */
const TTS_DE = /\b(ich|du|er|es|wir|ihr|sie|ist|bin|bist|sind|hat|habe|der|die|das|den|dem|ein|eine|einen|nicht|kein|keine|und|oder|mit|zu|auf|im|am|um|mein|meine|dein|wie|wo|was|woher|heute|morgen|gern|sehr|auch)\b/i;
function ttsLang(seg){ if(/[çğış]|\b(ve|bir|bu|ne|için|değil|mı|mi|mu|mü|ben|sen|o|biz|siz|onlar|evet|hayır)\b/i.test(seg)) return "tr"; if(/[äß]/i.test(seg) || TTS_DE.test(seg)) return "de"; return null; }
{
  const _sayC = say;
  say = function(text, lang, rate, vo){
    const raw = String(text == null ? "" : text);
    if(lang === "tr" && /\s[–—-]\s|:\s/.test(raw)){
      const parts = raw.split(/\s[–—-]\s|:\s/).map(x=>x.trim()).filter(Boolean);
      const langs = parts.map(ttsLang);
      if(parts.length > 1 && langs.includes("de")){
        return parts.reduce((p, seg, i)=>p.then(()=>{ const c = ttsClean(seg); return /[\p{L}\p{N}]/u.test(c) ? _sayC.call(this, c, langs[i] || lang, rate, vo) : null; }), Promise.resolve());
      }
    }
    const c = ttsClean(raw); if(!/[\p{L}\p{N}]/u.test(c)) return Promise.resolve(); return _sayC.call(this, c, lang, rate, vo);
  };
}
