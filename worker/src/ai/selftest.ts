/**
 * Canlı yapay zekâ öz-sınaması (PM-087 A.1–A.2, A.5): GET /v1/ai/selftest.
 * Kimlik istemez, girdi almaz. Sunucudaki sabit örneklerle her görevi bir kez koşar; yanıtta yalnız görev başına
 * geçti/kaldı, süre (ms), model ve kısa neden kodu vardır. Model çıktısı, anahtar, adres, hata ayrıntısı DÖNMEZ.
 * KV ile `aralik_dk` içinde en çok 1 koşu (arada son sonuç okunur, model çağrılmaz). Nöronlar ortak sayaçtan düşer;
 * sayaç `ogrenci_payi_orani`nı geçtiyse öz-sınama koşmaz (öğrencinin payı korunur). Eşikler worker/policy.json `selftest`.
 * KV ardışık tutarlı değildir: aynı anda gelen iki istek nadiren iki koşu yapabilir; sınır yine günlük tavanla korunur.
 */
import type { AiTaskName } from "@dw/shared";
import type { Env } from "../env.ts";
import { HttpError } from "../http.ts";
import { dayKey } from "../quota.ts";
import { runTask } from "./tasks.ts";
import { neuronUsage } from "./workersai.ts";
import policy from "../../policy.json";

export const ST = policy.selftest;
type Dil = "de" | "tr";

/** Sabit örnekler: kişisel bilgi yok, ad yok (D-061); her görevin çıktısında hangi alan hangi dilde olmalı */
export const ORNEKLER: { gorev: AiTaskName; vars: unknown; alanlar: (o: any) => [string, string | undefined, Dil][] }[] = [
  {
    gorev: "equiv_check",
    vars: { prompt_tr: "Randevu almak istiyorum.", expected: ["Ich möchte einen Termin machen."], answer: "Ich hätte gern einen Termin." },
    alanlar: (o) => [["reason_tr", o.reason_tr, "tr"]]
  },
  {
    gorev: "explain_tr",
    vars: { de: "Feierabend", context: "Endlich Feierabend! Ich gehe jetzt nach Hause." },
    alanlar: (o) => [["tr", o.tr, "tr"], ["note_tr", o.note_tr, "tr"], ...(o.examples ?? []).flatMap((e: any, i: number) => [[`examples.${i}.de`, e.de, "de"], [`examples.${i}.tr`, e.tr, "tr"]] as [string, string, Dil][])]
  },
  {
    gorev: "say_it_de",
    vars: { tr: "Reçetemi almak istiyorum.", level: "A2" },
    alanlar: (o) => [["de_simple", o.de_simple, "de"], ["paraphrase_de", o.paraphrase_de, "de"], ["note_tr", o.note_tr, "tr"]]
  },
  {
    gorev: "roleplay_turn",
    vars: {
      partner_de: "Eine freundliche Apothekerin in einer Apotheke in München.",
      scene_tr: "Eczanedesin, baş ağrısı için ilaç alıyorsun.",
      goals_de: ["Ein Medikament gegen Kopfschmerzen kaufen", "Fragen, wie oft man es nimmt"],
      level: 1,
      history: [{ r: "partner", de: "Guten Tag! Was kann ich für Sie tun?" }, { r: "learner", de: "Guten Tag. Ich brauche etwas gegen Kopfschmerzen." }],
      stuck: 0
    },
    alanlar: (o) => [["reply_de", o.reply_de, "de"]]
  },
  {
    gorev: "feedback_tr",
    vars: {
      scene_tr: "Eczanede baş ağrısı için ilaç almak.",
      goals: [{ id: "g1", de: "Ein Medikament gegen Kopfschmerzen kaufen" }, { id: "g2", de: "Fragen, wie oft man es nimmt" }],
      transcript: [
        { r: "partner", de: "Guten Tag! Was kann ich für Sie tun?" },
        { r: "learner", de: "Ich brauche etwas gegen Kopfschmerz." },
        { r: "partner", de: "Hier, Ibuprofen. Sonst noch etwas?" },
        { r: "learner", de: "Wie oft ich nehmen?" },
        { r: "partner", de: "Höchstens dreimal am Tag, nach dem Essen." },
        { r: "learner", de: "Danke, tschüss." }
      ]
    },
    alanlar: (o) => [
      ...(o.strengths_tr ?? []).map((s: string, i: number) => [`strengths_tr.${i}`, s, "tr"] as [string, string, Dil]),
      ...(o.fixes ?? []).flatMap((f: any, i: number) => [[`fixes.${i}.said`, f.said, "de"], [`fixes.${i}.better`, f.better, "de"], [`fixes.${i}.why_tr`, f.why_tr, "tr"]] as [string, string, Dil][]),
      ["summary_tr", o.summary_tr, "tr"]
    ]
  }
];

/* ---------- dil denetimi: kaba ama sınanabilir; yalnız olumlu kanıtla düşürür (kısa ve belirsiz metin geçer) ---------- */
const DE = new Set("der die das den dem des ein eine einen einem einer ist sind bin bist ich du wir ihr sie und nicht mit für auf zu im vom zum zur von bitte haben habe hat möchte möchten kann können wie gern gerne ja nein auch aber noch schon sehr gut guten tag etwas hier heute morgen danke mal man nach".split(" "));
const TR = new Set("bir ve bu da de için ile çok ne mi mı mu mü değil var yok olarak gibi daha ama sen ben anlam anlamı demek demektir cümle iyi sadece şu veya kullanılır doğru yanlış aynı olur oldu ya kısa güzel".split(" "));
const EN = new Set("the and is are you your this that with of it be have has please thank thanks what can i'm don't does very good would should".split(" "));
export function dilPuani(s: string) {
  const w = s.toLowerCase().match(/[\p{L}']+/gu) ?? [];
  const say = (k: Set<string>) => w.filter((x) => k.has(x)).length;
  return { de: say(DE) + (/[äß]/i.test(s) ? 2 : 0), tr: say(TR) + (/[ğışçİ]/.test(s) ? 2 : 0), en: say(EN) };
}
/** Alan beklenen dilde mi: değilse bulunan dil ("en" | "de" | "tr"), uygunsa null */
export function dilHatasi(s: string, bek: Dil): Dil | "en" | null {
  const p = dilPuani(s);
  const ust = Math.max(p.de, p.tr, p.en);
  if (ust === 0 || p[bek] === ust) return p.en >= 2 && p.en > p[bek] ? "en" : null;
  return p.en === ust ? "en" : bek === "de" ? "tr" : "de";
}

/* ---------- koşu ---------- */
export interface GorevSonucu { gorev: AiTaskName; gecti: boolean; ms: number; model: string | null; neden: string | null }
export interface OzSinama {
  durum: "kostu" | "onbellek" | "pay_korunuyor" | "gunluk_tavan" | "kapali";
  ok: boolean; zaman: string | null; sonraki: string | null; saglayici: string;
  gorevler: GorevSonucu[];
  bugun: Ozet;
  /** bir önceki UTC günü (A.5 ölçümü gün bitince de okunabilsin) */
  dun: Ozet;
}
export interface Ozet { gun: string; kosu: number; gorev: Record<string, { gecti: number; toplam: number; ortanca_ms: number; en_uzun_ms: number }> }
const SON = "st:son";
const GUN = (d: string) => `st:gun:${d}`;
type Kayit = { t: string; g: [AiTaskName, 0 | 1, number][] };

async function gunluk(env: Env, gun: string): Promise<Kayit[]> {
  try { const v = JSON.parse((await env.QUOTA.get(GUN(gun))) || "[]"); return Array.isArray(v) ? v : []; } catch { return []; }
}
const ortanca = (a: number[]) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m]! : Math.round((s[m - 1]! + s[m]!) / 2); };
export function ozet(gun: string, k: Kayit[]): Ozet {
  const g: Ozet["gorev"] = {};
  for (const { gorev } of ORNEKLER) {
    const ms = k.flatMap((x) => x.g.filter((y) => y[0] === gorev).map((y) => y[2]));
    g[gorev] = { gecti: k.reduce((n, x) => n + x.g.filter((y) => y[0] === gorev && y[1]).length, 0), toplam: ms.length, ortanca_ms: ortanca(ms), en_uzun_ms: ms.length ? Math.max(...ms) : 0 };
  }
  return { gun, kosu: k.length, gorev: g };
}

/** Tek görev: şema (runTask doğrular, bozuksa bad_output), dil, süre */
export async function gorevSina(env: Env, o: (typeof ORNEKLER)[number], simdi = () => Date.now()): Promise<GorevSonucu> {
  const t0 = simdi();
  try {
    const r = await runTask(env, o.gorev, o.vars);
    const ms = simdi() - t0;
    for (const [alan, deger, dil] of o.alanlar(r.output)) {
      if (!deger) continue;
      const h = dilHatasi(deger, dil);
      if (h) return { gorev: o.gorev, gecti: false, ms, model: r.model, neden: `dil:${alan}:${h}` };
    }
    if (ms > ST.gecme_ms) return { gorev: o.gorev, gecti: false, ms, model: r.model, neden: "sure" };
    return { gorev: o.gorev, gecti: true, ms, model: r.model, neden: null };
  } catch (e) {
    const kod = e instanceof HttpError ? (e.code === "bad_output" ? "sema" : e.code) : "internal";
    return { gorev: o.gorev, gecti: false, ms: simdi() - t0, model: null, neden: `hata:${kod}` };
  }
}

export async function ozSinama(env: Env, simdi = () => Date.now()): Promise<OzSinama> {
  const saglayici = (env.AI_PROVIDER || "none").trim();
  const gun = dayKey(new Date(simdi()));
  const dunGun = dayKey(new Date(simdi() - 86_400_000));
  const [k, kd] = await Promise.all([gunluk(env, gun), gunluk(env, dunGun)]);
  const dun = ozet(dunGun, kd);
  let son: Partial<OzSinama> | null = null;
  try { son = JSON.parse((await env.QUOTA.get(SON)) || "null"); } catch { son = null; }
  const bos = (durum: OzSinama["durum"]): OzSinama => ({
    durum, ok: !!son?.ok, zaman: son?.zaman ?? null, sonraki: son?.sonraki ?? null, saglayici, gorevler: son?.gorevler ?? [], bugun: ozet(gun, k), dun
  });
  const acik = saglayici === "workers-ai" ? !!env.AI : saglayici === "gemini" ? !!env.GEMINI_KEY : false;
  if (!acik) return { ...bos("kapali"), ok: false };
  const aralik = ST.aralik_dk * 60_000;
  if (son?.zaman && simdi() - Date.parse(son.zaman) < aralik) return bos("onbellek");
  if (k.length >= ST.gunluk_en_cok) return bos("gunluk_tavan");
  if (saglayici === "workers-ai") {
    const n = await neuronUsage(env, gun);
    if (n.used >= n.limit * ST.ogrenci_payi_orani) return bos("pay_korunuyor");
  }
  // kilit: koşu başlamadan zaman yazılır (aynı pencerede ikinci koşu olmasın)
  const zaman = new Date(simdi()).toISOString(), sonraki = new Date(simdi() + aralik).toISOString();
  await env.QUOTA.put(SON, JSON.stringify({ ok: false, zaman, sonraki, gorevler: [] }), { expirationTtl: 8 * 86400 });
  const gorevler: GorevSonucu[] = [];
  for (const o of ORNEKLER) gorevler.push(await gorevSina(env, o, simdi)); // sırayla: süreler birbirini etkilemesin
  const ok = gorevler.every((g) => g.gecti);
  await env.QUOTA.put(SON, JSON.stringify({ ok, zaman, sonraki, gorevler }), { expirationTtl: 8 * 86400 });
  const yeni = [...k, { t: zaman, g: gorevler.map((g) => [g.gorev, g.gecti ? 1 : 0, g.ms] as Kayit["g"][number]) }];
  await env.QUOTA.put(GUN(gun), JSON.stringify(yeni), { expirationTtl: 8 * 86400 });
  return { durum: "kostu", ok, zaman, sonraki, saglayici, gorevler, bugun: ozet(gun, yeni), dun };
}
