/**
 * Ses: cihaz sesi (speechSynthesis) ve konuşma tanıma (webkitSpeechRecognition).
 * Hazır doğal ses dosyaları ve bulut seslendirme sonraki fazda (BLUEPRINT §7). Bu dosya cihaz sesini kullanır
 * ve arayüzde "cihaz sesi" olarak belirtilir.
 * Odak motoru için: konuşurken/dinlerken `audioActive()` true döner (v1 kuralı: ses açıkken süre sayılır).
 */
import type { Speed } from "@dw/shared";
import { splitForSpeech } from "../core/ttsClean.ts";
import { almancaMi, konusanBul, sahneAta, sesCinsi, type Atama, type KarakterSes, type Konusan } from "../core/sesSec.ts";

/**
 * PM 7042161522-1: iOS WebKit 0,72'yi duyulur biçimde yavaşlatmıyordu. Yavaş hedefi: normalin en az 1,5 katı süre.
 * `slow` profildeki seçime göre (0,6 / 0,5 / 0,4; varsayılan 0,5) `setYavasOran` ile değişir.
 */
export const RATE: Record<Speed, number> = { slow: 0.5, normal: 0.95, natural: 1.05, fast: 1.2 };
export const YAVAS_SECENEK = [0.6, 0.5, 0.4] as const;
export type YavasOran = (typeof YAVAS_SECENEK)[number];
export function setYavasOran(r: number | undefined) { if (r !== undefined && (YAVAS_SECENEK as readonly number[]).includes(r)) RATE.slow = r; }
/** Ölçülen süre oranı (yavaş ÷ normal) bunun altındaysa ses `rate`i yok sayıyor sayılır */
export const ORAN_ESIK = 1.25;
let speakingN = 0;
let listening = false;
export const audioActive = () => speakingN > 0 || listening || (typeof speechSynthesis !== "undefined" && speechSynthesis.speaking);

export const ttsAvailable = () => typeof window !== "undefined" && "speechSynthesis" in window;

/** PM-064: dünya karakterleri (ses: cinsiyet, sıra); içerik yüklenince `setKarakterler` ile verilir */
let karakterler: KarakterSes[] = [];
export function setKarakterler(k: KarakterSes[]) { karakterler = k; }
/** Öğrencinin satırları ("Sen", "{name}", rol "B" öğrenciyse) profildeki hitaba göre (Herr → erkek, Frau → kadın) */
let ogrenciCins: "kadin" | "erkek" | undefined;
export function setOgrenciHitap(h?: "Herr" | "Frau") { ogrenciCins = h === "Herr" ? "erkek" : h === "Frau" ? "kadin" : undefined; }
const OGRENCI = /^(sen|du|ich|öğrenci|ogrenci|\{name\}|learner|student|kullanıcı)$/i;
function konusanCoz(a: string | undefined): Konusan | null {
  if (a && OGRENCI.test(a.trim())) return { id: "ogrenci", cinsiyet: ogrenciCins, sira: 0 };
  return konusanBul(a, karakterler);
}
/** Cihazdaki sesler (Profil → Ses denemesi ve atama için) */
export const cihazSesleri = (): SpeechSynthesisVoice[] => (ttsAvailable() ? speechSynthesis.getVoices() : []);
/** Konuşan(lar)a ses: aynı sahnedekiler birlikte atanır (aynı sahnede iki konuşan aynı sesi almaz) */
export function konusanAta(adlar: (string | undefined)[]): Map<string, Atama> {
  const ks = adlar.map((a) => konusanCoz(a)).filter((x): x is Konusan => !!x);
  const m = sahneAta(ks, cihazSesleri());
  const out = new Map<string, Atama>();
  for (const a of adlar) { const k = a ? konusanCoz(a) : null; if (a && k && m.has(k.id)) out.set(a, m.get(k.id)!); }
  return out;
}
/** Tek konuşanın sabit sesi (sahnesiz): Profil listesi ve tek satırlık "Dinle" bununla aynı sesi çalar (inceleme #117 P1-3) */
export const karakterSesi = (ad: string): Atama | undefined => konusanAta([ad]).get(ad);

function voiceFor(lang: "de" | "tr"): SpeechSynthesisVoice | undefined {
  const vs = speechSynthesis.getVoices();
  const pref = lang === "de" ? ["de-DE", "de-AT", "de"] : ["tr-TR", "tr"];
  for (const p of pref) { const v = vs.find((x) => x.lang.replace("_", "-").startsWith(p)); if (v) return v; }
  return undefined;
}

/**
 * Hız ölçümü (Profil → Ses ve mikrofon): aynı cümle normal ve yavaş çalınır, onstart→onend süresi ses adına göre saklanır.
 * Ölçülmemiş ses için davranış değişmez; ölçülmüş ve yavaşlamayan ses için `speak` yavaşlayan sese ya da gruplu okumaya düşer.
 */
export interface HizOlcum { normalMs: number; yavasMs: number; rate: number }
const HIZ_KEY = "dw2-ses-hiz";
export function hizKaydi(): Record<string, HizOlcum> {
  try { const k = JSON.parse(localStorage.getItem(HIZ_KEY) || "{}") as Record<string, HizOlcum>; return Object.fromEntries(Object.entries(k).filter(([, o]) => gecerliOlcum(o))); } catch { return {}; }
}
export function hizKaydet(ad: string, o: HizOlcum) { if (!gecerliOlcum(o)) return; try { const k = hizKaydi(); k[ad] = o; localStorage.setItem(HIZ_KEY, JSON.stringify(k)); } catch { /* özel kip: ölçüm yalnız ekranda kalır */ } }
export const hizOrani = (o: HizOlcum) => o.yavasMs / Math.max(1, o.normalMs);
/** true: ölçüldü ve yavaşlamıyor; false: ölçüldü ve yavaşlıyor; undefined: ölçülmedi */
/** PM 7043447488-1: iki süreden biri 0,3 sn'nin altındaysa ses çalmamış demektir; ölçüm sayılmaz (kayıt yok, hüküm yok) */
export const OLCUM_ALT_MS = 300;
export const gecerliOlcum = (o: { normalMs: number; yavasMs: number }) => o.normalMs >= OLCUM_ALT_MS && o.yavasMs >= OLCUM_ALT_MS;
export function yavasliyorMu(ad: string): boolean | undefined { const o = hizKaydi()[ad]; return o && gecerliOlcum(o) ? hizOrani(o) >= ORAN_ESIK : undefined; }
/** Tek cümleyi verilen ses ve hızla çalar; onstart→onend milisaniyesi (onstart hiç gelmezse çağrı→onend; zaman aşımında null) */
export function olcCal(text: string, ses: SpeechSynthesisVoice | undefined, rate: number): Promise<number | null> {
  if (!ttsAvailable()) return Promise.resolve(null);
  speechSynthesis.cancel();
  // stopSpeaking ya da yeni bir speak ölçümü geçersiz kılar (yarıda kesilen çalma ölçüm sayılmaz; inceleme #162 P2)
  const no = ++konusmaNo;
  return new Promise((res) => {
    const u = new SpeechSynthesisUtterance(sesMetni(text));
    u.lang = "de-DE"; if (ses) u.voice = ses; else { const v = voiceFor("de"); if (v) u.voice = v; }
    u.rate = rate;
    const t0 = performance.now(); let bas: number | null = null; let fin = false;
    const bit = (ok: boolean) => { if (fin) return; fin = true; speakingN = Math.max(0, speakingN - 1); res(ok && no === konusmaNo ? performance.now() - (bas ?? t0) : null); };
    u.onstart = () => { bas = performance.now(); };
    u.onend = () => bit(true); u.onerror = () => bit(false);
    speakingN++;
    speechSynthesis.speak(u);
    setTimeout(() => bit(false), 30000);
  });
}
/**
 * Yavaşlamayan sesin yerine: aynı cinsten (cinsi bilinmiyorsa yine cinsi bilinmeyen), ölçülmüş ve yavaşlayan Almanca ses.
 * `dolu`: sahnedeki öteki konuşanların sesleri — yedek onlardan biri olamaz (PM-064: aynı sahnede iki konuşan aynı sesi almaz;
 * inceleme #162 P1-2). Uygun ses yoksa undefined (gruplu okumaya düşülür).
 */
export function yavaslayanSes(yerine: SpeechSynthesisVoice | undefined, dolu: ReadonlySet<string> = new Set()): SpeechSynthesisVoice | undefined {
  const cins = yerine ? sesCinsi(yerine) : null;
  return cihazSesleri().find((v) => almancaMi(v) && v.name !== yerine?.name && !dolu.has(v.name) && yavasliyorMu(v.name) === true && sesCinsi(v) === cins);
}
/**
 * Hiçbir ses yavaşlamıyorsa: cümle kelime gruplarına (noktalama, en çok 3 kelime) bölünür, aralarına duraklama konur.
 * Sıra sayısı ("3.") ve kısaltma ("Dr.", "z.", "B.") noktası grup sınırı değildir (inceleme #162 P2).
 */
const NOKTA_SINIR_DEGIL = /^(\d+|[A-Za-zÄÖÜäöü]{1,3})\.$/;
export function kelimeGruplari(t: string): string[] {
  const out: string[] = []; let grup: string[] = [];
  const bitir = () => { if (grup.length) out.push(grup.join(" ")); grup = []; };
  for (const k of t.split(/\s+/).filter(Boolean)) {
    grup.push(k);
    const sinir = /[,;:!?]$/.test(k) || (k.endsWith(".") && !NOKTA_SINIR_DEGIL.test(k));
    if (sinir || grup.length === 3) bitir();
  }
  bitir();
  return out;
}
export const GRUP_ARA_MS = 350;

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
export async function speakDizi(lines: { de: string; speed?: Speed; kim?: string }[], speed: Speed = "normal", ara = 0, iptal?: () => boolean): Promise<void> {
  const ilk = ilkHiz(lines.map((l) => l.de).join("\n"), "normal") === "slow";
  // sahne: konuşanlar birlikte atanır (yavaşta da aynı sesler)
  const sahne = konusanAta(lines.map((l) => l.kim));
  for (const l of lines) {
    if (iptal?.()) return;
    const sp = l.speed ?? speed;
    const kendi = l.kim ? sahne.get(l.kim) : undefined;
    // yavaşta yedek ses sahnedeki öteki konuşanların sesine düşmesin (inceleme #162 P1-2)
    const dolu = new Set([...sahne.values()].map((a) => a.ses?.name).filter((x): x is string => !!x && x !== kendi?.ses?.name));
    await speak(l.de, "de", ilk && sp === "normal" ? "slow" : sp, true, kendi, dolu);
    if (ara) await new Promise((r) => setTimeout(r, ara));
  }
}
/**
 * `kesin`: hız olduğu gibi (seviye ölçümü, dizi içindeki satır); yoksa başlangıç hızı kuralı uygulanır.
 * `kim`: konuşan (karakter kimliği ya da adı) ya da hazır atama; Almanca bölümler o sesle ve perdeyle okunur (PM-064).
 * "Yavaş" yalnızca `rate`i düşürür; ses ve perde değişmez.
 */
export async function speak(text: string, lang: "de" | "tr" = "de", speed: Speed = "normal", kesin = false, kim?: string | Atama, dolu?: ReadonlySet<string>): Promise<void> {
  const atama: Atama | undefined = typeof kim === "string" ? konusanAta([kim]).get(kim) : kim;
  if (!ttsAvailable()) return;
  text = sesMetni(text);
  if (lang === "de" && !kesin) speed = ilkHiz(text, speed);
  speechSynthesis.cancel();
  const iptalNo = ++konusmaNo;
  for (const seg of splitForSpeech(text, lang)) {
    const de = seg.lang === "de";
    const av = de && atama?.ses ? cihazSesleri().find((x) => x.name === atama.ses!.name) : undefined;
    let v = av ?? voiceFor(seg.lang);
    let gruplu = false;
    // PM 7042161522-1: ölçülmüş ve yavaşlamayan ses → aynı cinsten yavaşlayan ses; o da yoksa gruplu okuma
    if (de && speed === "slow" && v && yavasliyorMu(v.name) === false) {
      const y = yavaslayanSes(v, dolu);
      if (y) v = y; else gruplu = true;
    }
    const parcalar = gruplu ? kelimeGruplari(seg.text) : [seg.text];
    for (let i = 0; i < parcalar.length; i++) {
      if (iptalNo !== konusmaNo) return;
      if (i > 0) {
        await new Promise((r) => setTimeout(r, GRUP_ARA_MS));
        // duraklama içinde durdurulduysa ya da yeni konuşma başladıysa sonraki grup okunmaz (inceleme #162 P1-1)
        if (iptalNo !== konusmaNo) return;
      }
      await soyle(parcalar[i]!, de ? "de-DE" : "tr-TR", v, de ? RATE[speed] : 1, de && atama ? atama.pitch : undefined);
    }
  }
}
/** `speak` ya da `stopSpeaking` yeniden çağrılınca süren gruplu okuma kesilir */
let konusmaNo = 0;
function soyle(text: string, lang: string, v: SpeechSynthesisVoice | undefined, rate: number, pitch?: number): Promise<void> {
  return new Promise<void>((res) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    if (v) u.voice = v;
    u.rate = rate;
    if (pitch !== undefined) u.pitch = pitch;
    speakingN++;
    let fin = false;
    const done = () => { if (fin) return; fin = true; speakingN = Math.max(0, speakingN - 1); res(); };
    u.onend = done; u.onerror = done;
    speechSynthesis.speak(u);
    // bazı tarayıcılar onend göndermez: güvenlik zaman aşımı (yavaşta süre uzar)
    setTimeout(done, Math.min(30000, 1500 + (text.length * 120) / Math.min(1, rate)));
  });
}
export function stopSpeaking() { konusmaNo++; if (ttsAvailable()) speechSynthesis.cancel(); speakingN = 0; }

const SR: any = typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : undefined;
/** iPhone kabuğu: WKWebView'de tarayıcı tanıması yoksa v1'deki yerel eklenti (cihaz üstü tanıma) */
const NATIVE_SR = () => (globalThis as any).Capacitor?.Plugins?.SpeechRecognition;
export const sttAvailable = () => !!SR || !!NATIVE_SR();
const kabukta = () => !!(globalThis as any).Capacitor?.isNativePlatform?.();
/** Hangi tanıma yolu kullanılacak (PM 7017526063): kabukta her zaman önce iPhone'un kendi tanıması */
export const sttYolu = (): "yerel" | "tarayici" | "yok" => (kabukta() && NATIVE_SR() ? "yerel" : SR ? "tarayici" : NATIVE_SR() ? "yerel" : "yok");

/** Tanıma hatalarının türü ve Türkçe karşılığı (PM 7016783246-2 d): her birinde ne yapılacağı */
export type SttHata = "izin" | "mesgul" | "sessiz" | "hizmet" | "zaman" | "diger";
export function sttHataTuru(e: unknown): SttHata {
  const c = String((e as any)?.message ?? (e as any)?.error ?? e).toLowerCase();
  if (/service-not-allowed/.test(c)) return "hizmet";
  if (/not-allowed|permission|denied|notallowed|security/.test(c)) return "izin";
  if (/audio-capture|busy|in use|notreadable|already/.test(c)) return "mesgul";
  if (/no-speech|no match|nomatch|sessiz/.test(c)) return "sessiz";
  if (/service-not-allowed|unavailable|not supported|stt_unavailable|network|language-not-supported/.test(c)) return "hizmet";
  if (/timeout|zaman/.test(c)) return "zaman";
  return "diger";
}
export const STT_HATA_TR: Record<SttHata, string> = {
  izin: "Mikrofon izni yok. iPhone'da Ayarlar → Deutsch Werkstatt (ya da Safari) → Mikrofon'u aç; uygulamada ayrıca Ayarlar → Siri → Dikte açık olmalı.",
  mesgul: "Mikrofonu başka bir uygulama kullanıyor (arama, kayıt, başka sekme). Onu kapatıp tekrar dene.",
  sessiz: "Ses gelmedi. Telefonu ağzına yaklaştır, biraz daha yüksek sesle söyle ve tekrar dene.",
  hizmet: "Konuşma tanıma bu cihazda ya da bu tarayıcıda şu an kullanılamıyor. Yazarak cevaplayabilirsin; iPhone uygulamasında Siri ve Dikte açık olmalı.",
  zaman: "Tanıma zamanında bitmedi. Tekrar dene; olmazsa yazarak cevapla.",
  diger: "Mikrofon kullanılamadı. Tekrar dene ya da yazarak cevapla."
};

/** Almanca konuşma tanıma: olası metinleri döndürür (en iyi ilk). Desteklenmiyorsa hata fırlatır; arayüz yazarak cevaba geçer. */
export function listenOnce(lang = "de-DE", maxMs = 9000): { result: Promise<string[]>; stop: () => void } {
  if (sttYolu() === "yerel") {
    const N = NATIVE_SR();
    listening = true;
    // kabuk yolu (inceleme #117 P1-6): önce tanıma izni (verilmezse "izin"), sonra zaman aşımlı tanıma (takılı "Dinliyorum…" yok)
    const result = (async () => {
      try {
        const izinli = (x: any) => !x || x.speechRecognition === undefined || x.speechRecognition === "granted";
        let pm: any = null; try { pm = await N.checkPermissions?.(); } catch { /* eski eklenti */ }
        if (!izinli(pm)) { const r = await N.requestPermissions?.(); if (!izinli(r)) throw new Error("not-allowed"); }
        // süre dolunca durdurulur ve eklentinin durdurma ile verdiği sonuç beklenir (atılmaz); zamanlayıcı her durumda temizlenir
        // ki bir sonraki oturumu yarıda kesmesin (inceleme #117 2. tur P1-A)
        const bas: Promise<any> = N.start({ language: lang, maxResults: 4, partialResults: false, popup: false });
        let zaman: ReturnType<typeof setTimeout> | undefined;
        const sure = new Promise<any>((res, rej) => {
          zaman = setTimeout(() => {
            try { void N.stop?.(); } catch { /* yok */ }
            void Promise.race([bas, new Promise((_, j) => setTimeout(() => j(new Error("timeout")), 1500))]).then(res, rej);
          }, maxMs);
        });
        try {
          const r: any = await Promise.race([bas, sure]);
          return ((r && r.matches) || []) as string[];
        } finally { clearTimeout(zaman); }
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
