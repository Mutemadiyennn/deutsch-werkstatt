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
/** yerel seslendirmede süren çağrılar (her biri kendi işaretiyle; durdurulan eski çağrı yenisinin sayacını düşürmez — inceleme #164 P2) */
const yerelAktif = new Set<symbol>();
export const audioActive = () => speakingN > 0 || yerelAktif.size > 0 || listening || (typeof speechSynthesis !== "undefined" && speechSynthesis.speaking);

export const ttsAvailable = () => (typeof window !== "undefined" && "speechSynthesis" in window) || sesYolu() === "yerel";

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
/**
 * Kabuk 1.5 (PM 7042267632): kabukta iPhone'un kendi seslendirmesi (AVSpeechSynthesizer; eklenti `TextToSpeech`).
 * WKWebView `speechSynthesis` cihazdaki premium/gelişmiş sesleri vermiyor (gerçek cihaz: yalnız "Anna" iki kez).
 * Yerel yol açıksa sesler, hız ve perde eklentiden; tarayıcıda (ve eklentisiz eski kabukta) web yolu yedek kalır.
 */
interface YerelSesHam { name: string; lang: string; voiceURI: string; localService?: boolean; default?: boolean }
interface YerelTts {
  speak(o: { text: string; lang: string; rate: number; pitch: number; volume: number; voice?: number; category?: string; queueStrategy?: number }): Promise<void>;
  stop(): Promise<void>;
  getSupportedVoices(): Promise<{ voices: YerelSesHam[] }>;
}
const yerelTts = (): YerelTts | undefined => {
  const c = (globalThis as any).Capacitor;
  try { return c?.isNativePlatform?.() && (c.isPluginAvailable ? c.isPluginAvailable("TextToSpeech") : !!c.Plugins?.TextToSpeech) ? c.Plugins?.TextToSpeech : undefined; } catch { return undefined; }
};
/** yerel sesler; `sira` eklentinin ses dizinindeki yer (speak `voice` alanı) */
let yerelListe: (YerelSesHam & { sira: number })[] | null = null;
const sesDinleyici = new Set<() => void>();
export function onSesler(f: () => void): () => void { sesDinleyici.add(f); return () => void sesDinleyici.delete(f); }
/** Uygulama açılışında bir kez: kabukta yerel sesleri yükler (başarısızsa web yolu sürer) */
export async function yerelSesleriYukle(): Promise<boolean> {
  const t = yerelTts(); if (!t) return false;
  try {
    const r = await t.getSupportedVoices();
    yerelListe = (r?.voices ?? []).map((v, i) => ({ ...v, sira: i }));
    sesDinleyici.forEach((f) => f());
    return true;
  } catch { return false; }
}
/** Seslendirme yolu: "yerel" (kabuk, iPhone'un kendi sesleri) | "web" (görünümün sesleri) | "yok" */
export const sesYolu = (): "yerel" | "web" | "yok" => (yerelListe && yerelTts() ? "yerel" : typeof window !== "undefined" && "speechSynthesis" in window ? "web" : "yok");
/** Cihazdaki sesler (Profil → Ses denemesi ve atama için); yerel yolda eklentinin listesi */
export const cihazSesleri = (): SpeechSynthesisVoice[] =>
  sesYolu() === "yerel" ? (yerelListe as unknown as SpeechSynthesisVoice[]) : (typeof window !== "undefined" && "speechSynthesis" in window ? speechSynthesis.getVoices() : []);
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
/** PM-132 md. 2b: dinlerken ekranda konuşanın adı (öğrenci "Sen", karakter adı, yoksa içerikteki ad) */
/** Adın bir sözcüğü (unvan hariç) sonra gelecek seçeneklerde geçiyorsa ad cevabı verir (RQ-Ş18; inceleme #274 Ö-3, 2. tur P1-A) */
export const adCevapMi = (ad: string, secenekler: string) => { const k = secenekler.split(/[^\p{L}]+/u); return ad.split(/[^\p{L}.]+/u).some((w) => w.length > 2 && !/^(herr|frau|dr\.)$/i.test(w) && k.includes(w)); };
export const konusanAdi = (kim: string): string => (OGRENCI.test(kim.trim()) ? "Sen" : kim === "karsi" ? "Karşındaki" : karakterler.find((c) => c.id === kim)?.name ?? kim);

/**
 * Tanılama (PM-142 md. 2.4): son sahnenin ses atamaları ve son tanıma hatasının ham metni cihazda saklanır;
 * Ben → Tanılama tek ekranda gösterir (sahibinin tek ekran görüntüsü kök nedeni göstersin).
 */
export interface Tani { sahne?: string; hata?: string }
const TANI_KEY = "dw2-tani";
export function taniOku(): Tani { try { return JSON.parse(localStorage.getItem(TANI_KEY) || "{}") as Tani; } catch { return {}; } }
function taniYaz(k: keyof Tani, v: string) { try { localStorage.setItem(TANI_KEY, JSON.stringify({ ...taniOku(), [k]: v })); } catch { /* özel kip */ } }
const hamHata = (e: unknown) => String((e as any)?.message ?? (e as any)?.error ?? e).slice(0, 160);

function voiceFor(lang: "de" | "tr"): SpeechSynthesisVoice | undefined {
  const vs = cihazSesleri();
  const pref = lang === "de" ? ["de-DE", "de-AT", "de"] : ["tr-TR", "tr"];
  for (const p of pref) { const v = vs.find((x) => x.lang.replace("_", "-").startsWith(p)); if (v) return v; }
  return undefined;
}

/**
 * Hız ölçümü (Profil → Ses ve mikrofon): aynı cümle normal ve yavaş çalınır, onstart→onend süresi ses adına göre saklanır.
 * Ölçülmemiş ses için davranış değişmez; ölçülmüş ve yavaşlamayan ses için `speak` yavaşlayan sese ya da gruplu okumaya düşer.
 */
/** `gecikmeMs`: ısıtılmış seste tek sözcüğün başlama gecikmesi; `kademe`: üç yavaş kademenin süresi (oran → ms; PM 7061304527 Bulgu 1) */
export interface HizOlcum { normalMs: number; yavasMs: number; rate: number; gecikmeMs?: number; kademe?: Record<string, number> }
const HIZ_KEY = "dw2-ses-hiz";
export function hizKaydi(): Record<string, HizOlcum> {
  try { const k = JSON.parse(localStorage.getItem(HIZ_KEY) || "{}") as Record<string, HizOlcum>; return Object.fromEntries(Object.entries(k).filter(([, o]) => gecerliOlcum(o))); } catch { return {}; }
}
export function hizKaydet(ad: string, o: HizOlcum) { if (!gecerliOlcum(o)) return; try { const k = hizKaydi(); k[ad] = o; localStorage.setItem(HIZ_KEY, JSON.stringify(k)); } catch { /* özel kip: ölçüm yalnız ekranda kalır */ } }
export const hizOrani = (o: HizOlcum) => o.yavasMs / Math.max(1, o.normalMs);
/** Ölçüm anahtarı: kimlik (aynı adlı iki ses ayrı ölçülür), yoksa ad */
export const sesAnahtar = (v: { name: string; voiceURI?: string }) => v.voiceURI || v.name;
/** true: ölçüldü ve yavaşlamıyor; false: ölçüldü ve yavaşlıyor; undefined: ölçülmedi */
/** PM 7043447488-1: iki süreden biri 0,3 sn'nin altındaysa ses çalmamış demektir; ölçüm sayılmaz (kayıt yok, hüküm yok) */
export const OLCUM_ALT_MS = 300;
export const gecerliOlcum = (o: { normalMs: number; yavasMs: number }) => o.normalMs >= OLCUM_ALT_MS && o.yavasMs >= OLCUM_ALT_MS;
export function yavasliyorMu(ad: string): boolean | undefined { const o = hizKaydi()[ad]; return o && gecerliOlcum(o) ? hizOrani(o) >= ORAN_ESIK : undefined; }
/** Tek cümleyi verilen ses ve hızla çalar; onstart→onend milisaniyesi (onstart hiç gelmezse çağrı→onend; zaman aşımında null) */
export function olcCal(text: string, ses: SpeechSynthesisVoice | undefined, rate: number): Promise<number | null> {
  if (!ttsAvailable()) return Promise.resolve(null);
  // stopSpeaking ya da yeni bir speak ölçümü geçersiz kılar (yarıda kesilen çalma ölçüm sayılmaz; inceleme #162 P2)
  const no = ++konusmaNo;
  const yt = sesYolu() === "yerel" ? yerelTts() : undefined;
  if (yt) {
    // yerel yolda başlama olayı yok (eklentinin iOS tarafı yalnız bitişi bildirir): çağrıdan bitişe. Yavaş kademede uygulamanın
    // gerçekten okuduğu biçim ölçülür: parçalar ve aralarındaki duraklar (YAVAS_PLAN)
    const v = ses ?? voiceFor("de");
    const plan = rate < RATE.normal ? yavasParcalar(sesMetni(text), rate) : { parcalar: [sesMetni(text)], araMs: 0 };
    const t0 = performance.now();
    return (async () => {
      for (let i = 0; i < plan.parcalar.length; i++) {
        if (i > 0) { await new Promise((r) => setTimeout(r, plan.araMs)); if (no !== konusmaNo) return null; }
        if (!(await soyleYerel(yt, plan.parcalar[i]!, "de-DE", v, rate)) || no !== konusmaNo) return null;
      }
      return performance.now() - t0;
    })();
  }
  speechSynthesis.cancel();
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
 * Başlangıç gecikmesi (PM 7061304527 Bulgu 1 b, d): ses önce bir kez ısıtılır, sonra tek sözcük okunur. Yerel yolda
 * başlama olayı olmadığından tek sözcüğün çağrı→bitiş süresi gecikme sayılır (konuşmanın kendisi birkaç yüz ms; üst sınır).
 * Tarayıcı yolunda çağrı→onstart. Çalmazsa null.
 */
export async function olcGecikme(ses: SpeechSynthesisVoice | undefined): Promise<number | null> {
  if (!ttsAvailable()) return null;
  if ((await olcCal("Ja.", ses, RATE.normal)) === null) return null;
  const no = konusmaNo;
  if (sesYolu() === "yerel") return olcCal("Ja.", ses, RATE.normal);
  speechSynthesis.cancel();
  return new Promise((res) => {
    const u = new SpeechSynthesisUtterance("Ja.");
    u.lang = "de-DE"; if (ses) u.voice = ses; u.rate = RATE.normal;
    const t0 = performance.now(); let fin = false;
    const bit = (ms: number | null) => { if (fin) return; fin = true; speakingN = Math.max(0, speakingN - 1); res(no === konusmaNo ? ms : null); };
    u.onstart = () => bit(performance.now() - t0); u.onend = () => bit(performance.now() - t0); u.onerror = () => bit(null);
    speakingN++; speechSynthesis.speak(u); setTimeout(() => bit(null), 10000);
  });
}
/**
 * Yavaşlamayan sesin yerine: aynı cinsten (cinsi bilinmiyorsa yine cinsi bilinmeyen), ölçülmüş ve yavaşlayan Almanca ses.
 * `dolu`: sahnedeki öteki konuşanların sesleri — yedek onlardan biri olamaz (PM-064: aynı sahnede iki konuşan aynı sesi almaz;
 * inceleme #162 P1-2). Uygun ses yoksa undefined (gruplu okumaya düşülür).
 */
export function yavaslayanSes(yerine: SpeechSynthesisVoice | undefined, dolu: ReadonlySet<string> = new Set()): SpeechSynthesisVoice | undefined {
  const cins = yerine ? sesCinsi(yerine) : null;
  return cihazSesleri().find((v) => almancaMi(v) && sesAnahtar(v) !== (yerine && sesAnahtar(yerine)) && !dolu.has(v.name) && yavasliyorMu(sesAnahtar(v)) === true && sesCinsi(v) === cins);
}
/**
 * Hiçbir ses yavaşlamıyorsa: cümle kelime gruplarına (noktalama, en çok 3 kelime) bölünür, aralarına duraklama konur.
 * Sıra sayısı ("3.") ve kısaltma ("Dr.", "z.", "B.") noktası grup sınırı değildir (inceleme #162 P2).
 */
const NOKTA_SINIR_DEGIL = /^(\d+|[A-Za-zÄÖÜäöü]{1,3})\.$/;
export function kelimeGruplari(t: string, enCok = 3): string[] {
  const out: string[] = []; let grup: string[] = [];
  const bitir = () => { if (grup.length) out.push(grup.join(" ")); grup = []; };
  for (const k of t.split(/\s+/).filter(Boolean)) {
    grup.push(k);
    const sinir = /[,;:!?]$/.test(k) || (k.endsWith(".") && !NOKTA_SINIR_DEGIL.test(k));
    if (sinir || grup.length >= enCok) bitir();
  }
  bitir();
  return out;
}
export const GRUP_ARA_MS = 350;
/**
 * PM 7061304527, 7061337043: kabukta (AVSpeechSynthesizer; eklenti rate × 0,5 gönderir) yerel hız 0,30'un altında premium
 * seslerde doyuyor; üç kademe cihazda ayırt edilmiyordu. Kabuk yolunda kademeyi duraklar ayırır: Biraz yavaş yalnız noktalamada,
 * Yavaş en çok üç kelimelik gruplarda, Çok yavaş sözcük sözcük. Hedef süre oranı ×1,2 / ×1,45 / ×1,75 (cihazda ölçülür).
 * Tarayıcı yolu değişmez (ölçüme bağlı yedek ses / gruplu okuma).
 */
export const YAVAS_PLAN: Record<YavasOran, { enCok: number; araMs: number }> = { 0.6: { enCok: Infinity, araMs: 250 }, 0.5: { enCok: 3, araMs: 350 }, 0.4: { enCok: 1, araMs: 300 } };
export function yavasParcalar(t: string, oran: number): { parcalar: string[]; araMs: number } {
  const p = YAVAS_PLAN[oran as YavasOran];
  return p ? { parcalar: kelimeGruplari(t, p.enCok), araMs: p.araMs } : { parcalar: [t], araMs: 0 };
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
export async function speakDizi(lines: { de: string; speed?: Speed; kim?: string }[], speed: Speed = "normal", ara = 0, iptal?: () => boolean, onSatir?: (i: number) => void): Promise<void> {
  const ilk = ilkHiz(lines.map((l) => l.de).join("\n"), "normal") === "slow";
  // sahne: konuşanlar birlikte atanır (yavaşta da aynı sesler)
  const sahne = konusanAta(lines.map((l) => l.kim));
  taniYaz("sahne", [...sahne].map(([k, a]) => `${k} → ${a.ses?.name ?? "ses yok"} ${a.pitch}`).join(" · ") || `${lines.length} satır, konuşan yok (tek ses)`);
  for (const [i, l] of lines.entries()) {
    if (iptal?.()) return;
    onSatir?.(i);
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
  const yt = sesYolu() === "yerel" ? yerelTts() : undefined;
  if (!yt) speechSynthesis.cancel();
  const iptalNo = ++konusmaNo;
  for (const seg of splitForSpeech(text, lang)) {
    const de = seg.lang === "de";
    const av = de && atama?.ses ? sesBul(atama.ses) : undefined;
    let v = av ?? voiceFor(seg.lang);
    let gruplu = false;
    // PM 7042161522-1: ölçülmüş ve yavaşlamayan ses → aynı cinsten yavaşlayan ses; o da yoksa gruplu okuma (tarayıcı yolu)
    if (!yt && de && speed === "slow" && v && yavasliyorMu(sesAnahtar(v)) === false) {
      const y = yavaslayanSes(v, dolu);
      if (y) v = y; else gruplu = true;
    }
    // kabuk yolunda yavaş her zaman kademenin planıyla (YAVAS_PLAN): aynı ses, duraklar
    const plan = yt && de && speed === "slow" ? yavasParcalar(seg.text, RATE.slow) : { parcalar: gruplu ? kelimeGruplari(seg.text) : [seg.text], araMs: GRUP_ARA_MS };
    const parcalar = plan.parcalar;
    for (let i = 0; i < parcalar.length; i++) {
      if (iptalNo !== konusmaNo) return;
      if (i > 0) {
        await new Promise((r) => setTimeout(r, plan.araMs));
        // duraklama içinde durdurulduysa ya da yeni konuşma başladıysa sonraki grup okunmaz (inceleme #162 P1-1)
        if (iptalNo !== konusmaNo) return;
      }
      const dil = de ? "de-DE" : "tr-TR", hiz = de ? RATE[speed] : 1, perde = de && atama ? atama.pitch : undefined;
      if (yt) await soyleYerel(yt, parcalar[i]!, dil, v, hiz, perde);
      else await soyle(parcalar[i]!, dil, v, hiz, perde);
    }
  }
}
/** Atanan sesin cihazdaki nesnesi: önce kimlik (voiceURI; aynı adlı iki ses olabilir), sonra ad */
export const sesBul = (s: { name: string; voiceURI?: string }): SpeechSynthesisVoice | undefined =>
  (s.voiceURI ? cihazSesleri().find((x) => x.voiceURI === s.voiceURI) : undefined) ?? cihazSesleri().find((x) => x.name === s.name);
/** Yerel seslendirme: söz bitince (ya da durdurulunca) çözülür; hata olursa false (sessizce geçilir) */
async function soyleYerel(yt: YerelTts, text: string, lang: string, v: SpeechSynthesisVoice | undefined, rate: number, pitch?: number): Promise<boolean> {
  const sira = (v as unknown as { sira?: number } | undefined)?.sira;
  const isaret = Symbol("tts"); yerelAktif.add(isaret);
  // eklenti bitişi bildirmezse de akış kilitlenmez: web yoluyla aynı güvenlik zaman aşımı (inceleme #164 P2)
  const sure = Math.min(30000, 1500 + (text.length * 120) / Math.min(1, rate));
  try {
    const konus = yt.speak({ text, lang, rate, pitch: pitch ?? 1, volume: 1, ...(sira !== undefined ? { voice: sira } : {}), category: "playback", queueStrategy: 0 }).then(() => true, () => false);
    return await Promise.race([konus, new Promise<boolean>((r) => setTimeout(() => r(false), sure))]);
  } finally { yerelAktif.delete(isaret); }
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
export function stopSpeaking() {
  konusmaNo++; speakingN = 0; yerelAktif.clear();
  const yt = sesYolu() === "yerel" ? yerelTts() : undefined;
  if (yt) void yt.stop().catch(() => {}); else if (typeof window !== "undefined" && "speechSynthesis" in window) speechSynthesis.cancel();
}

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
  const c = hamHata(e).toLowerCase();
  // iOS eklentisi kod vermez: tanıma hatası telefonun dilinde (Almanca), öbürleri sabit İngilizce metin (PM-137)
  if (/service-not-allowed|siri|diktier|dictation|deaktiviert|disabled|nicht verfügbar/.test(c)) return "hizmet";
  if (/not-allowed|permission|denied|notallowed|security/.test(c)) return "izin";
  if (/audio-capture|busy|in use|notreadable|already|ongoing|verwendet/.test(c)) return "mesgul";
  if (/no.speech|no match|nomatch|sessiz|keine sprache|nicht erkannt|cancel|abgebrochen/.test(c)) return "sessiz";
  if (/unavailable|not supported|stt_unavailable|network|netzwerk|verbindung|language-not-supported/.test(c)) return "hizmet";
  if (/timeout|zaman/.test(c)) return "zaman";
  return "diger";
}
export const STT_HATA_TR: Record<SttHata, string> = {
  izin: "Mikrofon izni yok. iPhone'da Einstellungen → Datenschutz & Sicherheit → Mikrofon ve Spracherkennung listelerinde bu uygulamanın anahtarını aç.",
  mesgul: "Mikrofonu başka bir uygulama kullanıyor (arama, kayıt, başka sekme). Onu kapatıp tekrar dene.",
  sessiz: "Ses gelmedi. Telefonu ağzına yaklaştır, biraz daha yüksek sesle söyle ve tekrar dene.",
  hizmet: "Konuşma tanıma şu an kullanılamıyor. iPhone'da Einstellungen → Allgemein → Tastatur → Diktierfunktion açık olmalı ve internet bağlı olmalı. Şimdilik yazarak cevapla.",
  zaman: "Tanıma zamanında bitmedi. Tekrar dene; olmazsa yazarak cevapla.",
  diger: "Mikrofon kullanılamadı. Tekrar dene ya da yazarak cevapla."
};
/** Öğrenciye görünen metin; "diger"de ham metin de yazılır (ekran görüntüsüyle iletilebilsin; PM-137 md. 1) */
export const sttHataMetni = (e: unknown) => { const t = sttHataTuru(e); return t === "diger" ? `${STT_HATA_TR.diger} (Kod: ${hamHata(e).slice(0, 100)})` : STT_HATA_TR[t]; };

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
        // önceki oturum açık kaldıysa ("Ongoing speech recognition") önce kapatılır (PM-137 md. 2)
        try { if ((await N.isListening?.())?.listening) { await N.stop(); await new Promise((r) => setTimeout(r, 300)); } } catch { /* eski eklenti */ }
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
      } catch (e) { taniYaz("hata", `${new Date().toISOString().slice(5, 16)} UTC yerel: ${hamHata(e)}`); throw e; } finally { listening = false; }
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
    rec.onerror = (e: any) => { listening = false; clearTimeout(to); taniYaz("hata", `${new Date().toISOString().slice(5, 16)} UTC tarayıcı: ${e.error}`); e.error === "no-speech" ? res([]) : rej(new Error(e.error || "stt_error")); };
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
