/**
 * Workers AI sağlayıcısı (PM 7022002310-5, "deneme"). Anahtar yok: Worker'ın `AI` bağlamı (hesap içi, ücretsiz pay).
 * Günlük nöron tavanı `policy.json`'da; sayaç KV'de hesap geneli (kullanıcı başına değil). Tavan dolunca istek gönderilmez,
 * istemci yapay zekâsız yola düşer. Nöron, modelin döndürdüğü token sayısından fiyat tablosuyla hesaplanır (üst tahmin).
 */
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";
import { dayKey } from "../quota.ts";
import policy from "../../policy.json";

export const WA = policy.workers_ai;
const nKey = (day: string) => `n:wa:${day}`;

export async function neuronUsage(env: Env, day = dayKey()) {
  return { day, used: Number((await env.QUOTA.get(nKey(day))) || 0), limit: WA.daily_neurons };
}

/** token → nöron (fiyat tablosu; bilinmeyen model en pahalı oranla) */
export function neurons(model: string, inTok: number, outTok: number): number {
  const t = (WA.neurons_per_million_tokens as Record<string, number[]>)[model] ?? [31876, 204805];
  return Math.ceil((inTok * t[0]! + outTok * t[1]!) / 1_000_000);
}

/** Tek çağrı: sistem + kullanıcı iletisi, JSON çıktı. Şema desteklenmezse bir kez şemasız dener. Döner: metin */
export async function generateWA(env: Env, model: string, system: string, user: string, timeoutMs: number, schema?: object): Promise<string> {
  if (!env.AI) throw new HttpError("not_configured", "AI binding");
  const u = await neuronUsage(env);
  // KV oku-yaz atomik değil: eşzamanlı çağrılar sayacı geride bırakabilir; tavanın %10'u pay olarak ayrılır
  if (u.used >= u.limit * 0.9) throw new HttpError("quota_upstream", "neuron cap");
  const messages = [{ role: "system", content: system }, { role: "user", content: user }];
  const once = async (withSchema: boolean) => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const sure = new Promise<never>((_, rej) => { t = setTimeout(() => rej(new HttpError("timeout")), timeoutMs); });
    try {
      return await Promise.race([
        env.AI!.run(model, { messages, max_tokens: WA.max_tokens, temperature: 0.4, ...(withSchema && schema ? { response_format: { type: "json_schema", json_schema: schema } } : {}) }),
        sure
      ]);
    } finally { clearTimeout(t); }
  };
  // Cloudflare "günlük ücretsiz pay bitti" (4006 / neurons / allocation) → quota_upstream: yedek modele geçilmez
  const esle = (e: unknown) => {
    if (e instanceof HttpError) return e;
    const m = String((e as Error)?.message ?? e);
    return /\b4006\b|neurons?\b|free allocation|daily free/i.test(m) ? new HttpError("quota_upstream", "workers-ai free allocation") : new HttpError("upstream_busy", m.slice(0, 120));
  };
  // zaman aşımında model arkada sürebilir: sayaç üst tahminle yazılır (çıkış = max_tokens), tavan yumuşamaz (inceleme #125 P1-2)
  const tahminYaz = async () => { await env.QUOTA.put(nKey(u.day), String(u.used + neurons(model, Math.ceil((system.length + user.length) / 4), WA.max_tokens)), { expirationTtl: 3 * 86400 }); };
  let r: { response?: unknown; usage?: { prompt_tokens?: number; completion_tokens?: number } };
  try {
    r = await once(!!schema);
  } catch (e) {
    const h = esle(e);
    if (h.code === "timeout") { await tahminYaz(); throw h; }
    if (h.code === "quota_upstream" || !schema) throw h;
    try { r = await once(false); } catch (e2) { const h2 = esle(e2); if (h2.code === "timeout") await tahminYaz(); throw h2; }
  }
  const text = typeof r.response === "string" ? r.response : r.response != null ? JSON.stringify(r.response) : "";
  // sayaç: token yoksa karakterden tahmin (4 karakter ≈ 1 token)
  const inTok = r.usage?.prompt_tokens ?? Math.ceil((system.length + user.length) / 4);
  const outTok = r.usage?.completion_tokens ?? Math.ceil(text.length / 4);
  await env.QUOTA.put(nKey(u.day), String(u.used + neurons(model, inTok, outTok)), { expirationTtl: 3 * 86400 });
  if (!text) throw new HttpError("bad_output", "empty");
  return text;
}

/** Cümlelere böl: nokta/ünlem/soru + boşluk + büyük harf ya da tırnak/tire; "9.30", "14. März", "Dr.", "z. B." bölmez */
const KISALTMA = /(?:^|\s)(?:Dr|Fr|Hr|Nr|Str|bzw|ca|usw|z|B|d|h|u|a|vgl|Tel|Prof|Mo|Di|Mi|Do|Sa|So)\.$/;
export function cumleler(s: string): string[] {
  const t = s.trim(), out: string[] = [];
  let bas = 0;
  for (let i = 0; i < t.length; i++) {
    if (!".!?".includes(t[i]!)) continue;
    let j = i + 1;
    while (j < t.length && /["“”»«')]/.test(t[j]!)) j++;
    if (j < t.length && !/\s/.test(t[j]!)) continue;                                   // 9.30, z.B.
    const sonraki = t.slice(j).trimStart()[0];
    if (sonraki && !/[A-ZÄÖÜ„"“»–\-(]/.test(sonraki)) continue;                         // küçük harfle sürüyor
    if (t[i] === "." && (/\d$/.test(t.slice(bas, i)) || KISALTMA.test(t.slice(bas, i + 1)))) continue; // 14. März, Dr.
    out.push(t.slice(bas, j).trim()); bas = j;
  }
  if (bas < t.length && t.slice(bas).trim()) out.push(t.slice(bas).trim());
  return out;
}
const kelime = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
/**
 * Rol oyunu cevabı en çok N kelime (PM 7022002310-5; asıl sınır istemde, bu güvenlik ağı). Kelimeden kesilmez: baştan bütün
 * cümleler sığdığı kadar; soru ya da (bitişte) veda cümlesi düşüyorsa son cümle yerine onu alır. Tek cümle bile uzunsa olduğu gibi.
 */
export function kisalt(s: string, n = WA.reply_max_words, bitis = false): string {
  if (kelime(s) <= n) return s.trim();
  const c = cumleler(s);
  if (c.length <= 1) return s.trim();
  const al: string[] = [];
  for (const x of c) { if (kelime([...al, x].join(" ")) > n) break; al.push(x); }
  if (!al.length) return c[0]!;
  // bitişte veda düşmesin (end: true ile tutarlı): gerekirse sondan cümle çıkarılıp veda eklenir; soru yalnızca sığarsa eklenir
  const dusen = c.slice(al.length);
  const soruVar = (x: string) => /\?["“”»«]?$/.test(x);
  if (bitis) {
    const veda = dusen[dusen.length - 1]!;
    while (al.length > 1 && kelime([...al, veda].join(" ")) > n) al.pop();
    if (kelime([...al, veda].join(" ")) <= n) al.push(veda);
  } else if (!al.some(soruVar)) {
    const soru = dusen.find(soruVar);
    if (soru && kelime([...al, soru].join(" ")) <= n) al.push(soru);
  }
  // kısaltma cevabın özünü atıyorsa (soru düştü ya da yarıdan azı kaldı) özgün cevap kalır; asıl sınır istemde (inceleme #125 P2-1)
  const sonuc = al.join(" ");
  if ((c.some(soruVar) && !al.some(soruVar) && !bitis) || kelime(sonuc) * 2 < kelime(s)) return s.trim();
  return sonuc;
}
