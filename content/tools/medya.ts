/**
 * B12 3. parça / D-112 doğrulayıcı kuralı: kapalı (sinif: kapali) medya açık depoya giremez.
 *  - content/v2/media altındaki her JSON taranır: `sinif: "kapali"` olan kayıtta herkese açık adres (http/https `src`) olamaz
 *    (kapalı dosyanın adresi yalnızca raf yoludur, ör. "foto/x.jpg").
 *  - Açık fotoğraf kaydı (foto/acik.json): her kayıt `sinif: "acik"`, lisansı açık (CC0, kamu malı, CC BY, CC BY-SA),
 *    `src` https ve atıf (yazar ya da sayfa) var.
 *  - Depoda ikili medya dosyası (jpg, png, webp, mp3, mp4…) content/v2/media altında olamaz (D-103: Releases/dağıtım dalı).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ACIK_LISANS = /^(CC0|PDM|PUBLIC DOMAIN|KAMU MALI|CC BY(-SA)? \d|CC BY(-SA)?$)/i;
const IKILI = /\.(jpe?g|png|webp|gif|mp3|m4a|wav|ogg|mp4|mov|webm)$/i;

function dosyalar(kok: string): string[] {
  const out: string[] = [];
  const gez = (d: string) => { for (const a of readdirSync(d)) { const p = join(d, a); if (statSync(p).isDirectory()) gez(p); else out.push(p); } };
  try { gez(kok); } catch { /* klasör yok */ }
  return out;
}

export function medyaDenetle(root: string): string[] {
  const kok = join(root, "content/v2/media");
  const hata: string[] = [];
  for (const f of dosyalar(kok)) {
    const ad = relative(root, f);
    if (IKILI.test(f)) { hata.push(`${ad}: ikili medya depoya giremez (D-103; Releases ya da raf)`); continue; }
    if (!f.endsWith(".json")) continue;
    let v: unknown;
    try { v = JSON.parse(readFileSync(f, "utf8")); } catch { hata.push(`${ad}: JSON okunamadı`); continue; }
    const gez = (x: unknown, yol: string) => {
      if (Array.isArray(x)) { x.forEach((y, i) => gez(y, `${yol}[${i}]`)); return; }
      if (!x || typeof x !== "object") return;
      const o = x as Record<string, unknown>;
      if (o.sinif === "kapali" && typeof o.src === "string" && /^https?:/i.test(o.src)) hata.push(`${ad} ${yol}: kapalı medya herkese açık adresle (${o.src.slice(0, 40)}…) kaydedilemez (D-112)`);
      for (const [k, y] of Object.entries(o)) gez(y, `${yol}.${k}`);
    };
    gez(v, "");
    if (ad.endsWith("foto/acik.json")) {
      for (const [yer, r] of Object.entries(((v as { foto?: Record<string, Record<string, unknown>> }).foto) ?? {})) {
        if (r.sinif !== "acik") hata.push(`${ad} ${yer}: açık kayıtta sinif "acik" olmalı`);
        if (!ACIK_LISANS.test(String(r.lisans ?? ""))) hata.push(`${ad} ${yer}: lisans açık değil (${r.lisans})`);
        if (!/^https:\/\//.test(String(r.src ?? ""))) hata.push(`${ad} ${yer}: src https olmalı`);
        if (!r.yazar && !r.sayfa) hata.push(`${ad} ${yer}: atıf (yazar ya da sayfa) yok`);
      }
    }
  }
  return hata;
}
