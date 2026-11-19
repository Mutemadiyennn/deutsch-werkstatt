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

/** açık lisanslar: tam biçim (NC/ND ya da ekli tuhaflık geçmez; inceleme #121 P2) */
const ACIK_LISANS = /^(CC0( 1\.0)?|PDM( 1\.0)?|[Pp]ublic [Dd]omain|Kamu malı|CC BY(-SA)? \d\.\d( [a-z]{2})?)$/;
/** kapalı lisans adları (Pixabay, Pexels, "tüm hakları saklı"): bu kayıt yalnızca kapalı olabilir */
const KAPALI_LISANS = /pixabay|pexels|all rights reserved|tüm hakları/i;
const IKILI = /\.(jpe?g|png|webp|gif|avif|heic|svg|tiff?|bmp|mp3|m4a|aac|wav|ogg|opus|mp4|mov|webm|mkv|zip|gz|7z|rar|pdf)$/i;
/** herkese açık adres sayılanlar: http(s), protokolsüz (//), data: */
const ADRES = /^(https?:|\/\/|data:)/i;
const sinifi = (v: unknown) => (typeof v === "string" ? v.trim().toLocaleLowerCase("tr").replace(/ı/g, "i") : "");

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
    if (IKILI.test(f) || !/\.[a-z0-9]+$/i.test(f)) { hata.push(`${ad}: ikili medya depoya giremez (D-103; Releases ya da raf)`); continue; }
    if (!f.endsWith(".json")) continue;
    let v: unknown;
    try { v = JSON.parse(readFileSync(f, "utf8")); } catch { hata.push(`${ad}: JSON okunamadı`); continue; }
    // kapalı kayıt (sınıfı ya da bir üst nesnenin sınıfı "kapali"; yazım farkları normalize) altında hiçbir dizede açık adres olamaz;
    // kapalı lisanslı (Pixabay, Pexels…) kayıt "kapali" işaretsiz olamaz (inceleme #121 P1-2)
    const gez = (x: unknown, yol: string, kapali: boolean) => {
      if (typeof x === "string") { if (kapali && ADRES.test(x.trim())) hata.push(`${ad} ${yol}: kapalı medya herkese açık adres taşıyamaz (${x.slice(0, 40)}…; D-112)`); return; }
      if (Array.isArray(x)) { x.forEach((y, i) => gez(y, `${yol}[${i}]`, kapali)); return; }
      if (!x || typeof x !== "object") return;
      const o = x as Record<string, unknown>;
      const k = kapali || sinifi(o.sinif) === "kapali";
      if (!k && typeof o.lisans === "string" && KAPALI_LISANS.test(o.lisans)) hata.push(`${ad} ${yol}: kapalı lisanslı kayıt (${o.lisans}) "sinif: kapali" olmadan`);
      for (const [n, y] of Object.entries(o)) gez(y, `${yol}.${n}`, k);
    };
    gez(v, "", false);
    if (ad.endsWith("foto/acik.json")) {
      for (const [yer, r] of Object.entries(((v as { foto?: Record<string, Record<string, unknown>> }).foto) ?? {})) {
        if (r.sinif !== "acik") hata.push(`${ad} ${yer}: açık kayıtta sinif "acik" olmalı`);
        if (!ACIK_LISANS.test(String(r.lisans ?? ""))) hata.push(`${ad} ${yer}: lisans açık değil (${r.lisans})`);
        if (!/^https:\/\//.test(String(r.src ?? ""))) hata.push(`${ad} ${yer}: src https olmalı`);
        if (!String(r.yazar ?? "").trim() && !String(r.sayfa ?? "").trim()) hata.push(`${ad} ${yer}: atıf (yazar ya da sayfa) yok`);
        if (r.lisans_url && !/^https:\/\//.test(String(r.lisans_url))) hata.push(`${ad} ${yer}: lisans bağlantısı https olmalı`);
      }
    }
  }
  return hata;
}
