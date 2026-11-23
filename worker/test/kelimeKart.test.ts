/** PM-086 "Kendi kelimem" 1. PR: kelime_kart + ikinci göz, bilinen sözcük oranı, sınırlar (md. 3, 4, 5, 9, 10, 13) */
import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import { generateKeyPair, exportJWK, SignJWT, createLocalJWKSet } from "jose";
import type { KelimeAday } from "@dw/shared";
import { handle } from "../src/index.ts";
import { setJwksForTests } from "../src/auth.ts";
import { bilinenKume, bilinenOrani, biliniyor, denetimUygula, kelimeKart, KK } from "../src/ai/kelimeKart.ts";
import { TEMPLATES } from "../src/ai/tasks.ts";
import type { Env, KV } from "../src/env.ts";

const PROJECT = "deutsch-sync";
let priv: CryptoKey;
function memKV(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, async get(k) { return data.get(k) ?? null; }, async put(k, v) { data.set(k, v); } };
}
const env = (over: Partial<Env> = {}): Env => ({ AI_PROVIDER: "workers-ai", AI: { run: vi.fn() } as unknown as Env["AI"], ALLOWED_UIDS: "uid-ok", FIREBASE_PROJECT_ID: PROJECT, ALLOWED_ORIGINS: "https://app.test", AI_DAILY_LIMIT: "300", QUOTA: memKV(), ...over });
async function token() {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ auth_time: now - 10 }).setProtectedHeader({ alg: "RS256", kid: "k1" }).setSubject("uid-ok").setAudience(PROJECT)
    .setIssuer(`https://securetoken.google.com/${PROJECT}`).setIssuedAt(now - 10).setExpirationTime(now + 3600).sign(priv);
}
const run = (tok: string, vars: unknown) => new Request("https://api.test/v1/ai/run", { method: "POST", headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json", Origin: "https://app.test" }, body: JSON.stringify({ task: "kelime_kart", vars }) });

beforeAll(async () => {
  const kp = await generateKeyPair("RS256", { extractable: true });
  priv = kp.privateKey as CryptoKey;
  setJwksForTests(createLocalJWKSet({ keys: [{ ...(await exportJWK(kp.publicKey)), kid: "k1", alg: "RS256", use: "sig" }] }));
});
afterEach(() => { vi.restoreAllMocks(); });

const aday = (o: Partial<KelimeAday> = {}): KelimeAday => ({ de: "Quittung", artikel: "die", cogul: "Quittungen", tur: "isim", tr: "makbuz", duzey: "hochdeutsch",
  ornekler: [{ de: "Ich brauche die Quittung.", tr: "Makbuza ihtiyacım var." }, { de: "Die Quittung ist hier.", tr: "Makbuz burada." }, { de: "Haben Sie eine Quittung?", tr: "Makbuzunuz var mı?" }], ...o });
const BILINEN = ["brauchen", "sein", "hier", "haben", "Sie", "Arzt", "Termin", "kaufen", "Brot"];
const tamDenet = (n: number, ornek = [true, true, true]) => ({ adaylar: Array.from({ length: n }, () => ({ de_ok: true, tr_ok: true, artikel_ok: true, cogul_ok: true, ornek_ok: ornek })) });

/** sahte çalıştırıcı: görev sırasıyla yanıt verir, çağrıları kaydeder */
function sahte(yanitlar: Array<unknown | Error>) {
  const cagri: { task: string; vars: any; ek?: string }[] = [];
  let i = 0;
  const f = async (_e: Env, task: string, vars: unknown, ek?: string) => {
    cagri.push({ task, vars, ek });
    const y = yanitlar[i++];
    if (y instanceof Error) throw y;
    return { output: y, model: "m" };
  };
  return { f, cagri };
}

describe("bilinen sözcük oranı (md. 4)", () => {
  const k = bilinenKume(BILINEN);
  it("çekimli biçimler, düzensiz fiiller ve görev sözcükleri bilinir; hedef sözcük sayılmaz", () => {
    expect(biliniyor("brauche", k)).toBe(true);
    expect(biliniyor("gekauft", k)).toBe(true);
    expect(biliniyor("termine", k)).toBe(true);
    expect(biliniyor("hat", k)).toBe(true);
    expect(biliniyor("die", k)).toBe(true);
    expect(biliniyor("zahnarzt", k)).toBe(false);
    expect(bilinenOrani("Ich brauche die Quittung.", "Quittung", k)).toEqual({ oran: 1, bilinmeyen: [] });
    expect(bilinenOrani("Die Quittungen liegen im Schrank.", "Quittung", k)).toEqual({ oran: 0.5, bilinmeyen: ["liegen", "schrank"] });
  });
});

describe("kelime kartı: üretim, yeniden üretim, ikinci göz", () => {
  it("bilinen sözcüklerle kurulmuş kart ikinci gözden geçer ve olduğu gibi döner; istekte bilinen liste ve bağlam gider, ad gitmez", async () => {
    const s = sahte([{ adaylar: [aday()] }, tamDenet(1)]);
    const r = await kelimeKart(env(), { giris: "quittung", dil: "de", baglam: "market", bilinen: BILINEN }, s.f);
    expect(r.output.adaylar).toEqual([aday()]);
    expect(r.output.denetlendi).toBe(true);
    expect(s.cagri.map((c) => c.task)).toEqual(["kelime_kart", "kelime_denet"]);
    expect(s.cagri[0]!.vars).toEqual({ giris: "quittung", dil: "de", baglam: "market", seviye: "A1", bilinen: BILINEN });
    const usr = TEMPLATES.kelime_kart.user(s.cagri[0]!.vars);
    expect(usr).toContain("im Supermarkt");
    expect(usr).toContain("brauchen, sein, hier");
  });
  it("örneklerde bilinen oranı %70'in altındaysa bir kez yeniden üretilir; yine tutmayan örnek atılır", async () => {
    const kotu = aday({ ornekler: [{ de: "Die Quittung liegt im Schrank neben dem Drucker.", tr: "x" }, { de: "Ich brauche die Quittung.", tr: "y" }] });
    const yine = aday({ ornekler: [{ de: "Ich brauche die Quittung hier.", tr: "a" }, { de: "Haben Sie die Quittung?", tr: "b" }, { de: "Quittung im Drucker vergessen.", tr: "c" }] });
    const s = sahte([{ adaylar: [kotu] }, { adaylar: [yine] }, tamDenet(1, [true, true])]);
    const r = await kelimeKart(env(), { giris: "Quittung", bilinen: BILINEN }, s.f);
    expect(s.cagri.map((c) => c.task)).toEqual(["kelime_kart", "kelime_kart", "kelime_denet"]);
    expect(s.cagri[1]!.ek).toMatch(/liegt.*schrank|schrank.*liegt/);
    expect(r.output.adaylar[0]!.ornekler.map((o) => o.tr)).toEqual(["a", "b"]);
  });
  it("yeniden üretim daha kötüyse ya da hata verirse ilk kartın uyan örnekleri kalır", async () => {
    const kotu = aday({ ornekler: [{ de: "Die Quittung liegt im Schrank neben dem Drucker.", tr: "x" }, { de: "Ich brauche die Quittung.", tr: "y" }] });
    const s = sahte([{ adaylar: [kotu] }, new Error("busy"), tamDenet(1, [true])]);
    const r = await kelimeKart(env(), { giris: "Quittung", bilinen: BILINEN }, s.f);
    expect(r.output.adaylar[0]!.ornekler.map((o) => o.tr)).toEqual(["y"]);
  });
  it("ikinci göz: Almancası ya da Türkçesi geçmeyen aday düşer, artikel/çoğul geçmezse boş, geçmeyen örnek atılır", () => {
    const a = { adaylar: [aday({ de: "Bank", artikel: "die", cogul: "Banken", tr: "banka" }), aday({ de: "Bank", artikel: "die", cogul: "Bänke", tr: "oturak" }), aday({ de: "Bannk", tr: "?" })] };
    const d = { adaylar: [{ de_ok: true, tr_ok: true, artikel_ok: true, cogul_ok: true, ornek_ok: [true, false, true] }, { de_ok: true, tr_ok: true, artikel_ok: false, cogul_ok: false, ornek_ok: [true, true, true] }, { de_ok: false, tr_ok: true, artikel_ok: true, cogul_ok: true, ornek_ok: [true, true, true] }] };
    const r = denetimUygula(a, d);
    expect(r.adaylar.map((x) => x.tr)).toEqual(["banka", "oturak"]);
    expect(r.adaylar[0]!.ornekler).toHaveLength(2);
    expect(r.adaylar[1]).toMatchObject({ artikel: null, cogul: null });
    // denetim eksik dönerse (daha az aday ya da örnek) denetlenmeyen atılır
    expect(denetimUygula(a, { adaylar: [{ de_ok: true, tr_ok: true, artikel_ok: true, cogul_ok: true, ornek_ok: [true] }] }).adaylar).toEqual([{ ...a.adaylar[0], ornekler: [a.adaylar[0]!.ornekler[0]] }]);
  });
  it("ikinci göz çağrısı hata verirse kart dönmez (denetlenmemiş alan öğrenciye ulaşmaz; istemci 'hazırlanıyor' bırakır)", async () => {
    const s = sahte([{ adaylar: [aday()] }, new Error("timeout")]);
    await expect(kelimeKart(env(), { giris: "Quittung", bilinen: BILINEN }, s.f)).rejects.toThrow("timeout");
  });
  it("tanınmayan giriş: boş aday listesi, ikinci göz çağrılmaz", async () => {
    const s = sahte([{ adaylar: [] }]);
    const r = await kelimeKart(env(), { giris: "xqzv", bilinen: BILINEN }, s.f);
    expect(r.output.adaylar).toEqual([]);
    expect(s.cagri).toHaveLength(1);
  });
  it("bilinen liste boşsa (taze cihaz) oran ölçülmez, yeniden üretim yok", async () => {
    const s = sahte([{ adaylar: [aday()] }, tamDenet(1)]);
    await kelimeKart(env(), { giris: "Quittung" }, s.f);
    expect(s.cagri.map((c) => c.task)).toEqual(["kelime_kart", "kelime_denet"]);
  });
  it("girdi sınırları: boş giriş, 60 karakterden uzun giriş ve 400'den fazla bilinen sözcük reddedilir", async () => {
    const s = sahte([]);
    for (const v of [{ giris: "  " }, { giris: "x".repeat(61) }, { giris: "Bank", bilinen: Array.from({ length: 401 }, (_, i) => `w${i}`) }])
      await expect(kelimeKart(env(), v, s.f)).rejects.toMatchObject({ code: "invalid_request" });
    expect(s.cagri).toHaveLength(0);
  });
  it("istem: İngilizce, kişi adı ve lehçe yasak; Bairisch alanı yok", () => {
    const sys = TEMPLATES.kelime_kart.system({ seviye: "A1" });
    expect(sys).toMatch(/kein Englisch/);
    expect(sys).toMatch(/Keine Personennamen/);
    expect(sys).toMatch(/kein Bairisch/);
    expect(sys).not.toMatch(/bairisch"?\s*:/i);
  });
});

describe("kelime kartı uç noktası: sınırlar (md. 9)", () => {
  // Workers AI sahtesi: önce kart, sonra denetim yanıtı
  const ai = (yanitlar: unknown[]) => { let i = 0; return { run: vi.fn(async () => ({ response: JSON.stringify(yanitlar[i++ % yanitlar.length]), usage: { prompt_tokens: 100, completion_tokens: 100 } })) } as unknown as Env["AI"]; };
  it("üretim + ikinci göz tek istekte; yanıt denetlenmiş kart", async () => {
    const e = env({ AI: ai([{ adaylar: [aday()] }, tamDenet(1)]) });
    const r = await handle(run(await token(), { giris: "Quittung", dil: "de", bilinen: BILINEN }), e);
    expect(r.status).toBe(200);
    const b = await r.json() as any;
    expect(b.task).toBe("kelime_kart");
    expect(b.output).toMatchObject({ adaylar: [aday()], surum: "kelime_kart.v1", denetlendi: true });
  });
  it(`günde ${KK.gunluk} karttan sonra quota_user (429, yeniden denenmez); sayaç kullanıcı başına`, async () => {
    const e = env({ AI: ai([{ adaylar: [aday()] }, tamDenet(1)]) });
    const tok = await token();
    for (let i = 0; i < KK.gunluk; i++) expect((await handle(run(tok, { giris: "Quittung", bilinen: BILINEN }), e)).status).toBe(200);
    const r = await handle(run(tok, { giris: "Quittung", bilinen: BILINEN }), e);
    expect(r.status).toBe(429);
    expect(((await r.json()) as any).error.code).toBe("quota_user");
  });
  it("ortak nöron sayacı payı geçtiyse kart üretilmez (quota_upstream, yeniden denenebilir); model çağrılmaz", async () => {
    const q = memKV();
    q.data.set(`n:wa:${new Date().toISOString().slice(0, 10)}`, "2000");
    const a = ai([{ adaylar: [aday()] }, tamDenet(1)]);
    const r = await handle(run(await token(), { giris: "Quittung" }), env({ QUOTA: q, AI: a }));
    expect(r.status).toBe(429);
    const b = (await r.json()) as any;
    expect(b.error).toMatchObject({ code: "quota_upstream", retryable: true });
    expect((a as any).run).not.toHaveBeenCalled();
  });
  it("Worker yazılan kelimeyi saklamaz: KV'de yalnız sayaçlar", async () => {
    const q = memKV();
    await handle(run(await token(), { giris: "Quittung", bilinen: BILINEN }), env({ QUOTA: q, AI: ai([{ adaylar: [aday()] }, tamDenet(1)]) }));
    for (const [k, v] of q.data) { expect(k).toMatch(/^(q:ai|q:kk|n:wa):/); expect(v).toMatch(/^\d+$/); expect(k + v).not.toMatch(/quittung/i); }
  });
  it("max_tokens kart görevinde policy değeri (3 aday × 3 örnek varsayılana sığmaz)", async () => {
    const a = ai([{ adaylar: [aday()] }, tamDenet(1)]);
    await handle(run(await token(), { giris: "Quittung", bilinen: BILINEN }), env({ AI: a }));
    const calls = (a as any).run.mock.calls as [string, { max_tokens: number }][];
    expect(calls[0]![1].max_tokens).toBe(KK.max_tokens);
    expect(calls.at(-1)![1].max_tokens).toBe(KK.denet_max_tokens);
  });
});
