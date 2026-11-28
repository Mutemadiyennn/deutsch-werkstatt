/**
 * PM-148 karar 2: "Kendim hakkında" (isteğe bağlı: ülke, şehir, yaş, diller, meslek, hobi, aile durumu). Yalnız bu cihazda:
 * `meta` tablosunda durur; `exportAll` yedeği ve sunucu `meta`yı almaz, Worker'a gitmez. Persona bellekte güncellenir (core/persona.ts).
 */
import { PROFIL_YUVALARI } from "@dw/shared";
import { getMeta, setMeta } from "../data/db.ts";
import { hakkimdaAyarla, type Hakkimda } from "../core/persona.ts";

const ANAHTAR = "hakkimda";
/** Kayıtta yalnız bilinen alanlar, kırpılmış ve kısa (en çok 60 harf); boş alan yazılmaz */
export function hakkimdaTemiz(v: unknown): Hakkimda {
  const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  const out: Hakkimda = {};
  for (const y of PROFIL_YUVALARI) { const x = o[y]; if (typeof x === "string" && x.trim()) out[y] = x.trim().replace(/\s+/g, " ").slice(0, 60); }
  return out;
}
export async function hakkimdaYukle(): Promise<Hakkimda> {
  const v = hakkimdaTemiz(await getMeta(ANAHTAR).catch(() => undefined));
  hakkimdaAyarla(v);
  return v;
}
export async function hakkimdaKaydet(v: Hakkimda): Promise<Hakkimda> {
  const t = hakkimdaTemiz(v);
  await setMeta(ANAHTAR, t);
  hakkimdaAyarla(t);
  return t;
}
