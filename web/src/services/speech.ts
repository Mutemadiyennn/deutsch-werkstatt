/**
 * Ses: cihaz sesi (speechSynthesis) ve konuşma tanıma (webkitSpeechRecognition).
 * Hazır doğal ses dosyaları ve bulut seslendirme sonraki fazda (BLUEPRINT §7). Bu dosya cihaz sesini kullanır
 * ve arayüzde "cihaz sesi" olarak belirtilir.
 * Odak motoru için: konuşurken/dinlerken `audioActive()` true döner (v1 kuralı: ses açıkken süre sayılır).
 */
import type { Speed } from "@dw/shared";
import { splitForSpeech } from "../core/ttsClean.ts";

export const RATE: Record<Speed, number> = { slow: 0.72, normal: 0.95, natural: 1.05, fast: 1.2 };
let speakingN = 0;
let listening = false;
export const audioActive = () => speakingN > 0 || listening || (typeof speechSynthesis !== "undefined" && speechSynthesis.speaking);

export const ttsAvailable = () => typeof window !== "undefined" && "speechSynthesis" in window;

function voiceFor(lang: "de" | "tr"): SpeechSynthesisVoice | undefined {
  const vs = speechSynthesis.getVoices();
  const pref = lang === "de" ? ["de-DE", "de-AT", "de"] : ["tr-TR", "tr"];
  for (const p of pref) { const v = vs.find((x) => x.lang.replace("_", "-").startsWith(p)); if (v) return v; }
  return undefined;
}

/**
 * Seslendirmeden önce gösterim yer tutucuları temizlenir (D-061): ad girilmemişse "(adın)" okunmaz; hitap seçilmemişse
 * "Herr/Frau" gibi çift biçimin ilki okunur. (Metin ekranda kişiselleştirilmiş hâliyle gelir.)
 */
export function sesMetni(t: string): string {
  return t.replace(/\s*\(adın\)/g, "").replace(/(\p{Lu}\p{Ll}+)\/(\p{Lu}\p{Ll}+)/gu, "$1").replace(/\s+([,.!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
}
/**
 * #58 B7: "Dinlemeye başlangıç hızı" (Profil) gerçekten etkili. Yavaş seçiliyse normal hızda istenen her Almanca cümle
 * bu oturumda İLK kez yavaş (RATE.slow) çalınır, tekrarında normal hızda. İçeriğin belirttiği doğal/hızlı basamaklar
 * (LS-8.1) ve açık "Yavaş" düğmesi değişmez.
 */
let baslangic: "slow" | "normal" = "normal";
const calindi = new Set<string>();
export function setBaslangicHizi(s: "slow" | "normal") { baslangic = s; }
export const baslangicYavas = () => baslangic === "slow";
/**
 * Bu metin (ya da çok satırlı dizinin anahtarı) için ilk çalma hızı. Yalnızca başlangıç Yavaş iken "çalındı" sayar
 * (Normal'de dinlenen cümle sonra Yavaş'a geçilince yine bir kez yavaş gelir; inceleme #77 P2).
 */
export function ilkHiz(text: string, speed: Speed = "normal"): Speed {
  if (baslangic !== "slow") return speed;
  const k = text.trim();
  const ilk = !calindi.has(k);
  calindi.add(k);
  return speed === "normal" && ilk ? "slow" : speed;
}
/** Satır satır çalınan diyalog/dinleme: hız bütün dizi için bir kez belirlenir (satırlar arasında karışmaz; inceleme #77 P2) */
export async function speakDizi(lines: { de: string; speed?: Speed }[], speed: Speed = "normal", ara = 0, iptal?: () => boolean): Promise<void> {
  const ilk = ilkHiz(lines.map((l) => l.de).join("\n"), "normal") === "slow";
  for (const l of lines) {
    if (iptal?.()) return;
    const sp = l.speed ?? speed;
    await speak(l.de, "de", ilk && sp === "normal" ? "slow" : sp, true);
    if (ara) await new Promise((r) => setTimeout(r, ara));
  }
}
/** `kesin`: hız olduğu gibi (seviye ölçümü, dizi içindeki satır); yoksa başlangıç hızı kuralı uygulanır */
export async function speak(text: string, lang: "de" | "tr" = "de", speed: Speed = "normal", kesin = false): Promise<void> {
  if (!ttsAvailable()) return;
  text = sesMetni(text);
  if (lang === "de" && !kesin) speed = ilkHiz(text, speed);
  speechSynthesis.cancel();
  for (const seg of splitForSpeech(text, lang)) {
    await new Promise<void>((res) => {
      const u = new SpeechSynthesisUtterance(seg.text);
      u.lang = seg.lang === "de" ? "de-DE" : "tr-TR";
      const v = voiceFor(seg.lang); if (v) u.voice = v;
      u.rate = seg.lang === "de" ? RATE[speed] : 1;
      speakingN++;
      let fin = false;
      const done = () => { if (fin) return; fin = true; speakingN = Math.max(0, speakingN - 1); res(); };
      u.onend = done; u.onerror = done;
      speechSynthesis.speak(u);
      // bazı tarayıcılar onend göndermez: güvenlik zaman aşımı
      setTimeout(done, Math.min(20000, 1500 + seg.text.length * 120));
    });
  }
}
export function stopSpeaking() { if (ttsAvailable()) speechSynthesis.cancel(); speakingN = 0; }

const SR: any = typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : undefined;
/** iPhone kabuğu: WKWebView'de tarayıcı tanıması yoksa v1'deki yerel eklenti (cihaz üstü tanıma) */
const NATIVE_SR = () => (globalThis as any).Capacitor?.Plugins?.SpeechRecognition;
export const sttAvailable = () => !!SR || !!NATIVE_SR();

/** Almanca konuşma tanıma: olası metinleri döndürür (en iyi ilk). Desteklenmiyorsa hata fırlatır; arayüz yazarak cevaba geçer. */
export function listenOnce(lang = "de-DE", maxMs = 9000): { result: Promise<string[]>; stop: () => void } {
  if (!SR && NATIVE_SR()) {
    const N = NATIVE_SR();
    listening = true;
    const result = (async () => {
      try {
        try { await N.requestPermissions?.(); } catch {}
        const r = await N.start({ language: lang, maxResults: 4, partialResults: false, popup: false });
        return ((r && r.matches) || []) as string[];
      } finally { listening = false; }
    })();
    return { result, stop: () => { try { N.stop?.(); } catch {} } };
  }
  if (!SR) return { result: Promise.reject(new Error("stt_unavailable")), stop: () => {} };
  const rec = new SR();
  rec.lang = lang; rec.interimResults = false; rec.maxAlternatives = 4; rec.continuous = false;
  let to: ReturnType<typeof setTimeout>;
  const result = new Promise<string[]>((res, rej) => {
    let got: string[] = [];
    rec.onresult = (e: any) => { const r = e.results[0]; got = Array.from({ length: r.length }, (_, i) => r[i].transcript as string); };
    rec.onerror = (e: any) => { listening = false; clearTimeout(to); e.error === "no-speech" ? res([]) : rej(new Error(e.error || "stt_error")); };
    rec.onend = () => { listening = false; clearTimeout(to); res(got); };
  });
  listening = true;
  try { rec.start(); } catch (e) { listening = false; return { result: Promise.reject(e), stop: () => {} }; }
  to = setTimeout(() => { try { rec.stop(); } catch {} }, maxMs);
  return { result, stop: () => { try { rec.stop(); } catch {} } };
}

/** Kısa zil (mola başı/sonu); harici ses dosyası gerektirmez */
export function chime(kind: "start" | "end" = "end") {
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    const ac = new AC();
    const notes = kind === "end" ? [659.25, 880] : [880, 659.25];
    notes.forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.frequency.value = f; o.type = "sine";
      g.gain.setValueAtTime(0.0001, ac.currentTime + i * 0.18);
      g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + i * 0.18 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + i * 0.18 + 0.5);
      o.connect(g).connect(ac.destination); o.start(ac.currentTime + i * 0.18); o.stop(ac.currentTime + i * 0.18 + 0.55);
    });
    setTimeout(() => ac.close(), 1500);
  } catch {}
}
