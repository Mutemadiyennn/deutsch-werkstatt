/** İçerik paketi yükleyici: /content/current.json → /content/<sürüm>/… (şemayla doğrulanır, bellekte önbellek) */
import { z } from "zod";
import { AssessItem, ContentIndex, GrammarNote, Lexeme, Pattern, Scenario } from "@dw/shared";

const base = () => `${import.meta.env.BASE_URL}content/`;
let idx: Promise<ContentIndex> | null = null;
const cache = new Map<string, Promise<unknown>>();

async function getJson(url: string): Promise<unknown> {
  const r = await fetch(url, { cache: "no-cache" });
  if (!r.ok) throw new Error(`İçerik yüklenemedi (${r.status})`);
  return r.json();
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
export const loadAssessBank = () => file("assess.json", z.array(AssessItem));
export const loadLexicon = () => file("lexemes.json", z.object({ lexemes: z.array(Lexeme), patterns: z.array(Pattern) }));
export const loadGrammar = () => file("grammar.json", z.array(GrammarNote));
export async function loadScenario(id: string): Promise<Scenario> {
  const i = await loadIndex();
  const f = i.files.scenarios[id];
  if (!f) throw new Error("Senaryo bulunamadı");
  return file(f, Scenario);
}
