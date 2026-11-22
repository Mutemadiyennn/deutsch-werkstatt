// Cloudflare Workers Builds (PM-081 C): derleme komutu wrangler.toml'daki KV yer tutucusunu derleme değişkeninden doldurur.
// Değişken: QUOTA_KV_ID (Cloudflare panelinde "Build variables"; 32 hane onaltılık KV ad alanı kimliği). Değer günlüğe yazılmaz.
// Yer tutucu yoksa (zaten dolu) dokunmaz. Değişken yoksa ya da biçimi yanlışsa derleme durur: KV'siz Worker kotasız çalışmasın.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const yol = join(dirname(fileURLToPath(import.meta.url)), "..", "wrangler.toml");
const YER = "REPLACE_WITH_KV_NAMESPACE_ID";
const metin = readFileSync(yol, "utf8");
if (!metin.includes(YER)) { console.log("wrangler.toml: KV kimliği zaten dolu; değişiklik yok"); process.exit(0); }
const id = (process.env.QUOTA_KV_ID ?? "").trim();
if (!/^[0-9a-f]{32}$/i.test(id)) {
  console.error("QUOTA_KV_ID derleme değişkeni yok ya da 32 haneli onaltılık değil (Cloudflare → Worker → Settings → Build → Variables). Derleme durdu.");
  process.exit(1);
}
writeFileSync(yol, metin.replace(YER, id));
console.log("wrangler.toml: KV kimliği derleme değişkeninden yazıldı (değer gizli)");
