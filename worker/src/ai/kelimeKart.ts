/**
 * PM-086 "Kendi kelimem" (1. PR): sözlükte olmayan kelime için kart. Sıra:
 *   1. `kelime_kart` üretir (en çok 3 anlam adayı, her biri 3 örnek cümle).
 *   2. Örnek cümlede hedef dışındaki sözcüklerin en az %70'i öğrencinin bildiği listeden mi (md. 4)? Değilse bir kez yeniden
 *      üretilir (bilinmeyen sözcükler istemde söylenir); yine tutmayan örnek atılır, kart örneksiz de kalabilir.
 *   3. İkinci göz `kelime_denet` ayrı çağrıyla denetler (md. 5): geçmeyen alan karta yazılmaz (Almanca ya da Türkçesi geçmeyen
 *      aday hiç dönmez; artikel/çoğul geçmezse boş; geçmeyen örnek atılır). Denetim yapılamazsa kart dönmez (hata): öğrencinin
 *      istemcisi kartı "hazırlanıyor" bırakır ve sonra yeniden dener (md. 9). Denetlenmemiş kart öğrenciye ulaşmaz.
 * Sınırlar: kullanıcı başına günde `policy.kelime_kart.gunluk` kart (ayrı sayaç; AI_DAILY_LIMIT de sayar); Workers AI'da ortak
 * nöron sayacı tavanın `noron_payi` oranını geçtiyse üretilmez (konuşmaya pay kalır). Worker kelimeyi hiçbir yere yazmaz (md. 10).
 */
import { AiTasks, type AiInput, type KelimeAday } from "@dw/shared";
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";
import { dayKey } from "../quota.ts";
import { neuronUsage, WA } from "./workersai.ts";
import { runTask } from "./tasks.ts";
import policy from "../../policy.json";

export const KK = policy.kelime_kart;

/** Almanca sözcükleri ayırır (küçük harf; noktalama ve rakam dışı) */
export const sozcukler = (s: string) => s.toLowerCase().split(/[^a-zäöüß]+/).filter(Boolean);

// çekim ekleri: "kaufe" → kauf(en), "Termine" → Termin, "gekauft" → kauf(en); basit ve tahmini (sözlük yok, yalnız oran için)
const EKLER = ["", "e", "en", "er", "es", "em", "n", "s", "st", "t", "te", "ten", "test", "tet", "nen"];
/** düzensiz çekimler: lemma bilinince bu biçimler de bilinir */
const DUZENSIZ: Record<string, string[]> = {
  sein: ["bin", "bist", "ist", "sind", "seid", "war", "warst", "waren"], haben: ["habe", "hast", "hat", "habt", "hatte", "hatten"],
  werden: ["wird", "wirst"], "können": ["kann", "kannst"], "müssen": ["muss", "musst"], wollen: ["will", "willst"],
  "mögen": ["mag", "magst", "möchte", "möchtest"], "möchten": ["möchte", "möchtest"], "dürfen": ["darf", "darfst"], sollen: ["soll", "sollst"],
  wissen: ["weiß", "weißt"], geben: ["gibt", "gibst"], nehmen: ["nimmt", "nimmst"], sehen: ["sieht", "siehst"], essen: ["isst"],
  fahren: ["fährt", "fährst"], lesen: ["liest"], sprechen: ["spricht", "sprichst"], helfen: ["hilft", "hilfst"], schlafen: ["schläft"],
  gehen: ["ging", "gegangen"], kommen: ["kam", "gekommen"], tun: ["tut"]
};
/** Görev sözcükleri 1. günden bilinir (artikel, zamir, bağlaç, sık edat): bilinen listesinde olmasalar da sayılır */
const GOREV = new Set("der die das den dem des ein eine einen einem einer eines ich du er sie es wir ihr mich mir dich dir uns euch ihn ihm ihnen mein meine dein deine und oder aber nicht kein keine ja nein in im an am auf mit zu zum zur von vom für bei beim nach aus um hier da heute sehr".split(" "));
/** bilinen lemmalardan eşleşme anahtarları: lemma, fiil gövdesi (-en/-n atılmış), düzensiz biçimler */
export function bilinenKume(lemmalar: readonly string[], gorev = true): Set<string> {
  const k = new Set<string>(gorev ? GOREV : []);
  for (const l of lemmalar) for (const w of sozcukler(l)) {
    k.add(w);
    for (const d of DUZENSIZ[w] ?? []) k.add(d);
    if (w.length > 3 && w.endsWith("en")) k.add(w.slice(0, -2));
    else if (w.length > 3 && w.endsWith("n")) k.add(w.slice(0, -1));
  }
  return k;
}
/** sözcük bilinen bir lemmanın çekimli biçimi mi (ek atılarak, "ge…t" ortacı dahil) */
export function biliniyor(w: string, k: ReadonlySet<string>): boolean {
  const govde = (x: string) => EKLER.some((e) => x.endsWith(e) && x.length - e.length >= 2 && k.has(x.slice(0, x.length - e.length)));
  return govde(w) || (w.startsWith("ge") && w.length > 4 && govde(w.slice(2)));
}
/** Örnekte hedef dışındaki sözcüklerin bilinen oranı (hedef sözcük ve çekimleri sayılmaz); sayılacak sözcük yoksa 1 */
export function bilinenOrani(ornek: string, hedef: string, k: ReadonlySet<string>): { oran: number; bilinmeyen: string[] } {
  const h = bilinenKume([hedef], false);
  const say = sozcukler(ornek).filter((w) => !biliniyor(w, h));
  const bilinmeyen = say.filter((w) => !biliniyor(w, k));
  return { oran: say.length ? (say.length - bilinmeyen.length) / say.length : 1, bilinmeyen };
}

type Calistir = (env: Env, task: string, vars: unknown, ek?: string) => Promise<{ output: unknown; model: string }>;
type Adaylar = { adaylar: KelimeAday[] };

/** Bilinen listesine uymayan örnekleri ayıklar; uymayan varsa bilinmeyen sözcükleri döndürür */
function ornekSuz(a: Adaylar, k: ReadonlySet<string>, esik: number, bilinenVar: boolean): { kart: Adaylar; bilinmeyen: Set<string> } {
  const bilinmeyen = new Set<string>();
  // liste boşsa (taze cihaz) oran ölçülemez: örnek yalnız ikinci gözden geçer
  if (!bilinenVar) return { kart: a, bilinmeyen };
  const adaylar = a.adaylar.map((x) => ({ ...x, ornekler: x.ornekler.filter((o) => { const r = bilinenOrani(o.de, x.de, k); if (r.oran < esik) { r.bilinmeyen.forEach((w) => bilinmeyen.add(w)); return false; } return true; }) }));
  return { kart: { adaylar }, bilinmeyen };
}
const ornekSayisi = (a: Adaylar) => a.adaylar.reduce((n, x) => n + x.ornekler.length, 0);

/** İkinci gözün sonucuna göre alanları atar (md. 5) */
export function denetimUygula(a: Adaylar, d: { adaylar: { de_ok: boolean; tr_ok: boolean; artikel_ok: boolean; cogul_ok: boolean; ornek_ok: boolean[] }[] }): Adaylar {
  return {
    adaylar: a.adaylar.flatMap((x, i) => {
      const v = d.adaylar[i];
      if (!v || !v.de_ok || !v.tr_ok) return [];
      return [{ ...x, artikel: v.artikel_ok ? x.artikel : null, cogul: v.cogul_ok ? x.cogul : null, ornekler: x.ornekler.filter((_, j) => v.ornek_ok[j] === true) }];
    })
  };
}

const kkKey = (uid: string, day: string) => `q:kk:${uid}:${day}`;
/** Günlük kart sınırı (kullanıcı başına); aşıldıysa quota_user, aşılmadıysa sayaç bir artar */
export async function kartHakki(env: Env, uid: string) {
  const day = dayKey(), n = Number((await env.QUOTA.get(kkKey(uid, day))) || 0);
  if (n >= KK.gunluk) throw new HttpError("quota_user", "kelime_kart daily");
  await env.QUOTA.put(kkKey(uid, day), String(n + 1), { expirationTtl: 3 * 86400 });
}
/** Workers AI'da ortak nöron payı: konuşmaya yer kalsın */
export async function noronPayi(env: Env) {
  if ((env.AI_PROVIDER || "").trim() !== "workers-ai") return;
  const u = await neuronUsage(env);
  if (u.used >= WA.daily_neurons * KK.noron_payi) throw new HttpError("quota_upstream", "kelime_kart share");
}

export async function kelimeKart(env: Env, vars: unknown, calistir: Calistir = runTask): Promise<{ output: Adaylar & { surum: string; denetlendi: true }; model: string }> {
  const p = AiTasks.kelime_kart.input.safeParse(vars);
  if (!p.success) throw new HttpError("invalid_request", p.error.issues[0]?.message);
  const v: AiInput<"kelime_kart"> = p.data;
  const k = bilinenKume(v.bilinen), bilinenVar = v.bilinen.length > 0;
  let r = await calistir(env, "kelime_kart", v);
  let { kart, bilinmeyen } = ornekSuz(r.output as Adaylar, k, KK.bilinen_oran, bilinenVar);
  if (bilinmeyen.size) {
    // bir kez yeniden: bilinmeyen sözcükler söylenir; hangisi daha çok örnek bıraktıysa o kalır
    const ek = `Diese Wörter kennt die Lernende NICHT, vermeide sie in den Beispielen: ${[...bilinmeyen].slice(0, 30).join(", ")}`;
    const r2 = await calistir(env, "kelime_kart", v, ek).catch(() => null);
    if (r2) { const b = ornekSuz(r2.output as Adaylar, k, KK.bilinen_oran, bilinenVar); if (b.kart.adaylar.length && ornekSayisi(b.kart) > ornekSayisi(kart)) { kart = b.kart; r = r2; } }
  }
  if (!kart.adaylar.length) return { output: { adaylar: [], surum: "kelime_kart.v1", denetlendi: true }, model: r.model };
  // ikinci göz: hata olursa kart dönmez (denetlenmemiş alan öğrenciye ulaşmaz)
  const d = await calistir(env, "kelime_denet", { giris: v.giris, adaylar: kart.adaylar });
  return { output: { ...denetimUygula(kart, d.output as Parameters<typeof denetimUygula>[1]), surum: "kelime_kart.v1", denetlendi: true }, model: r.model };
}
