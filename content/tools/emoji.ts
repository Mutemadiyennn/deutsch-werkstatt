/**
 * PM-081 B: kart → Noto Emoji (Apache-2.0). İÇ'in haritası (`content/v2/media/resim/harita.json`, kod: "1f382", "0030_20e3")
 * derlemede `@iconify-json/noto`'dan SVG'ye çevrilir; dosyalar pakete (`media/noto-<kod>.svg`) girer, çevrimdışı da gelir.
 */
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);
interface IconSet { width?: number; height?: number; icons: Record<string, { body: string; width?: number; height?: number }> }
let set: { chars: Record<string, string>; icons: IconSet } | null = null;
const yukle = () => (set ??= { chars: req("@iconify-json/noto/chars.json") as Record<string, string>, icons: req("@iconify-json/noto/icons.json") as IconSet });

/** Haritanın kodu → Noto SVG metni (yoksa null). "_" ayırıcı "-" olur; FE0F'li ve FE0F'siz biçim denenir */
export function notoSvg(kod: string): string | null {
  const { chars, icons } = yukle();
  const k = kod.trim().toLowerCase().replace(/_/g, "-");
  if (!/^[0-9a-f]{4,6}(-[0-9a-f]{4,6})*$/.test(k)) return null;
  const ad = chars[k] ?? chars[k.replace(/-fe0f/g, "")] ?? (icons.icons[k] ? k : undefined);
  const ic = ad ? icons.icons[ad] : undefined;
  if (!ic) return null;
  const w = ic.width ?? icons.width ?? 128, h = ic.height ?? icons.height ?? 128;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${ic.body}</svg>`;
}

/** dosya adı: yalnız onaltılık ve tire */
export const notoDosya = (kod: string) => `noto-${kod.trim().toLowerCase().replace(/_/g, "-")}.svg`;
