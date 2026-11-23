/**
 * Canlı yapay zekâ öz-sınaması (PM-087 A.1–A.2, A.5): GET /v1/ai/selftest.
 * Kimlik istemez, girdi almaz. Sunucudaki sabit örneklerle her görevi bir kez koşar; yanıtta yalnız görev başına
 * geçti/kaldı, süre (ms), model ve kısa neden kodu vardır. Model çıktısı, anahtar, adres, hata ayrıntısı DÖNMEZ.
 * Kilit ve kayıt tek örnekli bir Durable Object'te (`OzSinamaDO`; SQLite depolu, Workers Free): bütün istekler aynı
 * örneğe gelir, depo tutarlıdır ve süren koşu bellekte paylaşılır, yani eşzamanlı istekler ikinci koşu başlatamaz
 * (inceleme #209 P1-1). `aralik_dk` içinde en çok 1 koşu; arada son sonuç okunur. Dağıtım değişince (sürüm kimliği)
 * önbellek geçmez, yeni sürüm sınanır (P1-2). Nöronlar ortak sayaçtan düşer; sayaç `ogrenci_payi_orani`nı geçtiyse
 * öz-sınama koşmaz (öğrencinin payı korunur). Yalnız Workers AI sağlayıcısında koşar. Eşikler worker/policy.json `selftest`.
 */
import { dilHatasi, dilPuani, type AiTaskName, type Dil } from "@dw/shared";
import type { Env } from "../env.ts";
import { HttpError, json } from "../http.ts";
import { dayKey } from "../quota.ts";
import { runTask } from "./tasks.ts";
import { neuronUsage } from "./workersai.ts";
import policy from "../../policy.json";

export const ST = policy.selftest;

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

/* dil denetimi: ölçü paylaşılır (packages/shared/src/dil.ts); çalışma anındaki güvence de aynısını kullanır (PM-112 A.1) */
export { dilHatasi, dilPuani };

/* ---------- koşu ---------- */
/** `dil`: çalışma anı dil güvencesi devreye girdi mi ("yeniden" ikinci soruda tuttu · "yedek" kural tabanlı Türkçe; PM-112 A.1) */
export interface GorevSonucu { gorev: AiTaskName; gecti: boolean; ms: number; model: string | null; neden: string | null; dil: "yeniden" | "yedek" | null }
export interface OzSinama {
  durum: "kostu" | "onbellek" | "pay_korunuyor" | "gunluk_tavan" | "kapali";
  /** son koşunun sonucu; `taze` değilse ölçüm sayılmaz */
  ok: boolean;
  /** sonuç bu dağıtımın (sürümün) koşusu mu ve `durum` kostu/onbellek mi (inceleme #209 P1-2) */
  taze: boolean;
  /** sürüm kimliğinin ilk 8 karakteri (gizli değil) */
  surum: string;
  zaman: string | null; sonraki: string | null; saglayici: string;
  gorevler: GorevSonucu[];
  bugun: Ozet;
  /** bir önceki UTC günü (A.5 ölçümü gün bitince de okunabilsin) */
  dun: Ozet;
}
/** `dil_onarim`: dil güvencesinin devreye girdiği koşu sayısı (model sapması görünür kalsın; PM-112 A.1) */
export interface Ozet { gun: string; kosu: number; gorev: Record<string, { gecti: number; toplam: number; ortanca_ms: number; en_uzun_ms: number; dil_onarim: number }> }
type Kayit = { t: string; g: [AiTaskName, 0 | 1, number, (0 | 1)?][] };
type Son = { ok: boolean; zaman: string; sonraki: string; surum: string; gorevler: GorevSonucu[] };
/** Durable Object deposu (state.storage) ya da testte bellek */
export interface Depo { get<T>(k: string): Promise<T | undefined>; put(k: string, v: unknown): Promise<void>; delete(k: string): Promise<boolean> }

const ortanca = (a: number[]) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m]! : Math.round((s[m - 1]! + s[m]!) / 2); };
export function ozet(gun: string, k: Kayit[]): Ozet {
  const g: Ozet["gorev"] = {};
  for (const { gorev } of ORNEKLER) {
    const ms = k.flatMap((x) => x.g.filter((y) => y[0] === gorev).map((y) => y[2]));
    g[gorev] = { gecti: k.reduce((n, x) => n + x.g.filter((y) => y[0] === gorev && y[1]).length, 0), toplam: ms.length, ortanca_ms: ortanca(ms), en_uzun_ms: ms.length ? Math.max(...ms) : 0, dil_onarim: k.reduce((n, x) => n + x.g.filter((y) => y[0] === gorev && y[3]).length, 0) };
  }
  return { gun, kosu: k.length, gorev: g };
}

/** Tek görev: şema (runTask doğrular, bozuksa bad_output), dil, süre */
export async function gorevSina(env: Env, o: (typeof ORNEKLER)[number], simdi = () => Date.now()): Promise<GorevSonucu> {
  const t0 = simdi();
  try {
    const r = await runTask(env, o.gorev, o.vars);
    const ms = simdi() - t0, onarim = r.dil ?? null;
    for (const [alan, deger, dil] of o.alanlar(r.output)) {
      if (!deger) continue;
      const h = dilHatasi(deger, dil);
      if (h) return { gorev: o.gorev, gecti: false, ms, model: r.model, neden: `dil:${alan}:${h}`, dil: onarim };
    }
    if (ms > ST.gecme_ms) return { gorev: o.gorev, gecti: false, ms, model: r.model, neden: "sure", dil: onarim };
    return { gorev: o.gorev, gecti: true, ms, model: r.model, neden: null, dil: onarim };
  } catch (e) {
    const kod = e instanceof HttpError ? (e.code === "bad_output" ? "sema" : e.code) : "internal";
    return { gorev: o.gorev, gecti: false, ms: simdi() - t0, model: null, neden: `hata:${kod}`, dil: null };
  }
}

/**
 * Öz-sınama. `suren`: süren koşunun sözü (aynı örnekte paylaşılır). Karar son `await`ten SONRA, eşzamanlı (senkron)
 * bölümde verilir: aynı anda gelen istekler ya önbelleği okur ya da süren koşuyu bekler; ikinci koşu başlamaz.
 */
export class OzSinamaCekirdek {
  private suren: Promise<OzSinama> | null = null;
  /** bu örneğin son koşusu (bellekte): depodaki `son` eski okunduysa da ikinci koşu başlamasın (inceleme #209 2. tur) */
  private sonKosu: { zaman: number; surum: string } | null = null;
  constructor(private depo: Depo, private env: Env, private simdi = () => Date.now()) {}

  async oku(): Promise<OzSinama> {
    if (this.suren) return this.suren;
    const env = this.env, simdi = this.simdi;
    const saglayici = (env.AI_PROVIDER || "none").trim();
    const surum = (env.CF_VERSION_METADATA?.id || "yerel").slice(0, 8);
    const gun = dayKey(new Date(simdi())), dunGun = dayKey(new Date(simdi() - 86_400_000));
    const [k, kd, son] = await Promise.all([this.depo.get<Kayit[]>(`gun:${gun}`), this.depo.get<Kayit[]>(`gun:${dunGun}`), this.depo.get<Son>("son")]);
    const bugunK = Array.isArray(k) ? k : [], dun = ozet(dunGun, Array.isArray(kd) ? kd : []);
    const bos = (durum: OzSinama["durum"]): OzSinama => ({
      durum, ok: !!son?.ok, taze: false, surum, zaman: son?.zaman ?? null, sonraki: son?.sonraki ?? null, saglayici, gorevler: son?.gorevler ?? [], bugun: ozet(gun, bugunK), dun
    });
    // Gemini kapalı (D-093) ve pay sayacı yok: öz-sınama yalnız Workers AI'da (inceleme #209 P2)
    if (saglayici !== "workers-ai" || !env.AI) return { ...bos("kapali"), ok: false };
    const aralik = ST.aralik_dk * 60_000;
    if (son && son.surum === surum && simdi() - Date.parse(son.zaman) < aralik) return { ...bos("onbellek"), taze: true };
    if (bugunK.length >= ST.gunluk_en_cok) return bos("gunluk_tavan");
    const n = await neuronUsage(env, gun);
    if (n.used >= n.limit * ST.ogrenci_payi_orani) return bos("pay_korunuyor");
    if (this.suren) return this.suren; // bu isteğin beklediği sırada başka istek koşuyu başlattı
    if (this.sonKosu && this.sonKosu.surum === surum && simdi() - this.sonKosu.zaman < aralik) {
      // beklerken başka bir koşu başlayıp BİTTİ (sonKosu yalnız depoya yazıldıktan sonra atanır): depodan bir kez oku,
      // özyineleme yok (inceleme #209 fark doğrulaması P1)
      const yeni = await this.depo.get<Son>("son");
      const kb = (await this.depo.get<Kayit[]>(`gun:${gun}`)) ?? bugunK;
      return { durum: "onbellek", ok: !!yeni?.ok, taze: yeni?.surum === surum, surum, zaman: yeni?.zaman ?? null, sonraki: yeni?.sonraki ?? null, saglayici, gorevler: yeni?.gorevler ?? [], bugun: ozet(gun, kb), dun };
    }
    this.suren = this.kos(gun, surum, saglayici, dun).finally(() => { this.suren = null; });
    return this.suren;
  }

  private async kos(gun: string, surum: string, saglayici: string, dun: Ozet): Promise<OzSinama> {
    const zaman = new Date(this.simdi()).toISOString(), sonraki = new Date(this.simdi() + ST.aralik_dk * 60_000).toISOString();
    const gorevler: GorevSonucu[] = [];
    for (const o of ORNEKLER) gorevler.push(await gorevSina(this.env, o, this.simdi)); // sırayla: süreler birbirini etkilemesin
    const ok = gorevler.every((g) => g.gecti);
    // koşu bitince yazılır: yarıda kalan koşu (örnek düştü) boş kırmızı bırakmaz, sonraki istek yeniden koşar
    const onceki = (await this.depo.get<Kayit[]>(`gun:${gun}`)) ?? [];
    const yeni = [...onceki, { t: zaman, g: gorevler.map((g) => [g.gorev, g.gecti ? 1 : 0, g.ms, g.dil ? 1 : 0] as Kayit["g"][number]) }];
    await this.depo.put("son", { ok, zaman, sonraki, surum, gorevler } satisfies Son);
    this.sonKosu = { zaman: Date.parse(zaman), surum };
    await this.depo.put(`gun:${gun}`, yeni);
    await this.depo.delete(`gun:${dayKey(new Date(this.simdi() - 8 * 86_400_000))}`);
    return { durum: "kostu", ok, taze: true, surum, zaman, sonraki, saglayici, gorevler, bugun: ozet(gun, yeni), dun };
  }
}

/** Tek örnekli Durable Object (wrangler.toml `OZ_SINAMA`; SQLite depolu sınıf Workers Free'de var) */
export class OzSinamaDO {
  private c: OzSinamaCekirdek;
  constructor(state: { storage: Depo }, env: Env) { this.c = new OzSinamaCekirdek(state.storage, env); }
  async fetch(_req: Request): Promise<Response> { return json(await this.c.oku()); }
}

/** Worker yönlendirmesi: bütün istekler aynı örneğe ("tek") gider. Bağlam yoksa koşu yok. */
export async function ozSinamaUc(req: Request, env: Env, cors: Record<string, string>): Promise<Response> {
  if (!env.OZ_SINAMA) return json({ durum: "kapali", ok: false, taze: false, neden: "kilit_yok" }, 200, cors);
  const r = await env.OZ_SINAMA.get(env.OZ_SINAMA.idFromName("tek")).fetch(new Request(req.url, { method: "GET" }));
  return json(await r.json(), r.status, cors);
}
