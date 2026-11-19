/** İçerik paketi yükleyici: /content/current.json → /content/<sürüm>/… (şemayla doğrulanır, bellekte önbellek) */
import { z } from "zod";
import { bilinenKelimeler } from "../core/persona.ts";
import { AssessItem, ContentIndex, GrammarNote, Gun, Lexeme, Pattern, Scenario, TemelDers, World } from "@dw/shared";

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
  if (!cache.has(name)) cache.set(name, (async () => { const i = await loadIndex(); return schema.parse(await getJson(`${base()}${i.version}/${name}`)); })().catch((e) => { cache.delete(name); throw e; }));
  return cache.get(name) as Promise<T>;
}
/** PM-064: dünya (karakterlerin ses kaydı); içerikte yoksa boş */
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
/** R0 temel ders (#58 A5, Seans 2) */
export async function loadTemel(id: string): Promise<TemelDers> {
  const i = await loadIndex();
  const f = i.files.temel[id];
  if (!f) throw new Error("Bu ders henüz hazır değil.");
  return file(f, TemelDers);
}
