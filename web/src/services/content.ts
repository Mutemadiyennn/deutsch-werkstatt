/** İçerik paketi yükleyici: /content/current.json → /content/<sürüm>/… (şemayla doğrulanır, bellekte önbellek) */
import { rafKayit } from "./raf.ts";
import { fotoBirlestir } from "./kartFoto.ts";
import { z } from "zod";
import { bilinenKelimeler } from "../core/persona.ts";
import { adsizTasi, AssessItem, ContentIndex, GrammarNote, Gun, Lexeme, Pattern, Scenario, TemelDers, World } from "@dw/shared";

const base = () => `${import.meta.env.BASE_URL}content/`;
let idx: Promise<ContentIndex> | null = null;
const cache = new Map<string, Promise<unknown>>();

/** DN-2 §4: hiçbir yükleme 10 sn'den uzun sürmez; süre dolunca hata (ekranda "Tekrar dene") */
export const LOAD_TIMEOUT_MS = 8_000;
async function getJson(url: string): Promise<unknown> {
  const ac = typeof AbortController !== "undefined" ? new AbortController() : null;
  const t = setTimeout(() => ac?.abort(), LOAD_TIMEOUT_MS);
  try {
    const r = await fetch(url, { cache: "no-cache", signal: ac?.signal });
    if (!r.ok) throw new Error(`İçerik yüklenemedi (${r.status})`);
    return await r.json();
  } catch (e) {
    if ((e as { name?: string }).name === "AbortError") throw new Error("İçerik zamanında yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.");
    // PM-035 §6: ham İngilizce tarayıcı hatası ("Failed to fetch") öğrenciye gösterilmez
    if (e instanceof TypeError) throw new Error("İnternet bağlantısı yok ve bu içerik henüz cihazda değil. Bağlanınca tekrar dene.");
    throw e;
  } finally { clearTimeout(t); }
}
/** Zincirin tamamı için üst sınır (inceleme #43): current.json → index.json → dosya en çok LOAD_TIMEOUT_MS sürer */
export function within<T>(p: Promise<T>, ms = LOAD_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((res, rej) => {
    const t = setTimeout(() => rej(new Error("İçerik zamanında yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.")), ms);
    p.then((v) => { clearTimeout(t); res(v); }, (e) => { clearTimeout(t); rej(e); });
  });
}
export function loadIndex(): Promise<ContentIndex> {
  if (!idx) idx = (async () => {
    const cur = z.object({ version: z.string() }).parse(await getJson(base() + "current.json"));
    return ContentIndex.parse(await getJson(`${base()}${cur.version}/index.json`));
  })().catch((e) => { idx = null; throw e; });
  return idx;
}
function file<T>(name: string, schema: z.ZodType<T>): Promise<T> {
  if (!cache.has(name)) cache.set(name, (async () => { const i = await loadIndex(); const raw = await getJson(`${base()}${i.version}/${name}`); return adsizTasi(raw, schema.parse(raw)); })().catch((e) => { cache.delete(name); throw e; }));
  return cache.get(name) as Promise<T>;
}
/** PM-064: dünya (karakterlerin ses kaydı); içerikte yoksa boş */
/** B12 3. parça: seçilmiş açık fotoğraflar; anahtar "lx:Kelime#kart" ya da "lx:Kelime#ornekN" */
export interface FotoKayit { /** emoji: birbirine çeldirici olmayacak kartların Almancası (İÇ haritası notu) */ ayri?: readonly string[]; src: string; sinif: "acik" | "kapali"; yazar?: string | null; lisans: string; lisans_url?: string | null; sayfa?: string | null;
  /** PM 7088230583 md. 3: raf kaydında (`sinif: kapali`, `src` = `raf:<yol>`) aynı yerin açık fotoğrafı; raf ulaşılamazsa o gösterilir */ acik?: FotoKayit;
  /** Noto Emoji çizimi (fotoğraf değil): kırpılmaz, ortalanır */ emoji?: boolean }
/** Fotoğraf haritası oturum boyunca bir kez çözülür; hata olursa boş harita saklanır (her dokunuşta ağ/çözüm yok; inceleme #121 P1-5) */
let fotoHarita: Record<string, FotoKayit> | null = null;
let fotoSoz: Promise<Record<string, FotoKayit>> | null = null;
export const fotoHaritasi = () => fotoHarita;
/** Raf ayarı değişince artar: eski ayarla başlamış yükleme sonucunu haritaya yazamaz (inceleme #204 P2-1) */
let fotoNesil = 0;
export const loadFoto = (): Promise<Record<string, FotoKayit>> => {
  if (fotoHarita) return Promise.resolve(fotoHarita);
  if (fotoSoz) return fotoSoz;
  const nesil = fotoNesil;
  const soz = fotoYukle().then(({ harita, gecici }) => {
    // raf kaydı henüz önbellekte yoksa (arkada çekiliyor) harita saklanmaz: sonraki ekran yeniden birleştirir
    if (nesil === fotoNesil) { if (gecici) fotoSoz = null; else fotoHarita = harita; }
    return harita;
  });
  fotoSoz = soz;
  return soz;
};
/** Raf ayarı değişince (Profil → Medya rafı): harita bir sonraki istekte yeniden çözülür */
export const fotoSifirla = () => { fotoNesil++; fotoHarita = null; fotoSoz = null; };
/** önce raftan, yoksa açık fotoğraf (PM 7088230583 md. 3); raf kapalıysa yalnız açık harita (bugünkü davranış) */
const fotoYukle = () => Promise.all([acikFotoYukle(), rafKayit().catch(() => ({ kart: {}, gecici: false }))])
  .then(([a, r]) => ({ harita: fotoBirlestir(a, r.kart), gecici: r.gecici }));
const acikFotoYukle = () => within(file("foto.json", z.object({ foto: z.record(z.string(), z.object({ src: z.string().refine((x) => /^https:\/\//.test(x) || /^content\/[\w-]+\/media\/[\w.-]+$/.test(x)), sinif: z.literal("acik"), yazar: z.string().nullish(), lisans: z.string(), lisans_url: z.string().nullish(), sayfa: z.string().nullish() }).passthrough()) }))).then((x) => x.foto as Record<string, FotoKayit>).catch(() => ({} as Record<string, FotoKayit>));
/** PM-081 B: kart → Noto Emoji (paketteki SVG, çevrimdışı). Anahtar fotoğraf haritası gibi `<kart>#kart`; atıf tek satır (Apache-2.0) */
let resimSoz: Promise<Record<string, FotoKayit>> | null = null;
export const loadResim = (): Promise<Record<string, FotoKayit>> => (resimSoz ??= loadIndex().then((i) => i.files.resim ? within(file("resim.json", z.object({ kaynak: z.string(), lisans: z.string(), kartlar: z.record(z.string(), z.object({ src: z.string().regex(/^content\/[\w-]+\/media\/noto-[0-9a-f-]+\.svg$/), ayri: z.array(z.string()).optional() })) })))
  .then((x) => Object.fromEntries(Object.entries(x.kartlar).map(([id, r]) => [`${id}#kart`, { src: r.src, sinif: "acik", yazar: x.kaynak, lisans: x.lisans, lisans_url: "https://www.apache.org/licenses/LICENSE-2.0", sayfa: "https://github.com/googlefonts/noto-emoji", emoji: true, ...(r.ayri ? { ayri: r.ayri } : {}) } as FotoKayit]))) : {})
  .catch(() => ({} as Record<string, FotoKayit>)));
export const loadWorld = () => within(file("world/world.json", World)).catch(() => null);
export const loadAssessBank = () => within(file("assess.json", z.array(AssessItem)));
let kayitli = false;
/** Sözlük; ilk yüklemede kelimeler ad yuvası denetimine bildirilir (adsız profilde bilinen kelime ad sayılmaz) */
export const loadLexicon = () => within(file("lexemes.json", z.object({ lexemes: z.array(Lexeme), patterns: z.array(Pattern) }))).then((x) => {
  if (!kayitli) { kayitli = true; bilinenKelimeler(x.lexemes.map((l) => l.de)); }
  return x;
});
export const loadGrammar = () => within(file("grammar.json", z.array(GrammarNote)));
export function loadScenario(id: string): Promise<Scenario> {
  return within((async () => {
    const i = await loadIndex();
    const f = i.files.scenarios[id];
    if (!f) throw new Error("Senaryo bulunamadı");
    return file(f, Scenario);
  })());
}
/** İçerik paketinin kök adresi (medya dosyaları göreli yolla buradan) */
export const contentUrl = (version: string) => `${base()}${version}/`;
/** M1 İlk Hafta günü (#58 A4) */
export async function loadM1Gun(day: number): Promise<Gun> {
  const i = await loadIndex();
  const f = i.files.m1[String(day)];
  if (!f) throw new Error("Bu günün içeriği henüz hazır değil.");
  return file(f, Gun);
}
/** AKIS AK-3: bilinen kümenin genel adlar listesi (doğrulayıcıyla tek kaynak; yoksa boş) */
export const loadGenelAdlar = () => within(file("genel-adlar.json", z.array(z.string()))).catch(() => [] as string[]);
/** Akış planı için bütün incelenmiş temel dersler (kumeDizini ve planGun girdisi) */
export async function loadTemeller(): Promise<TemelDers[]> {
  const i = await loadIndex();
  return Promise.all(Object.keys(i.files.temel).map((id) => loadTemel(id)));
}
/** R0 temel ders (#58 A5, Seans 2) */
export async function loadTemel(id: string): Promise<TemelDers> {
  const i = await loadIndex();
  const f = i.files.temel[id];
  if (!f) throw new Error("Bu ders henüz hazır değil.");
  return file(f, TemelDers);
}
