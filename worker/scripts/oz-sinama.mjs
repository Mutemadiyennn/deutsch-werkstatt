#!/usr/bin/env node
/**
 * Canlı yapay zekâ öz-sınamasını okur (PM-087 A.3) ve Markdown tablo yazar. Adres günlüğe yazılmaz.
 * Kullanım: node worker/scripts/oz-sinama.mjs <worker-kök-adresi> [--bekle]   (çıkış 0 = geçti, 1 = kaldı/okunamadı)
 * --bekle: başka bir koşu sürüyorsa (kilit yazılmış, görevler boş) 20 sn arayla en çok 6 kez yeniden okur.
 * Tablo stdout'a; GITHUB_STEP_SUMMARY tanımlıysa oraya da eklenir. Yanıttaki her değer güvenli karakterlere süzülür.
 */
import { appendFileSync } from "node:fs";

const [taban, ...bayrak] = process.argv.slice(2);
if (!taban) { console.error("kullanım: oz-sinama.mjs <adres> [--bekle]"); process.exit(2); }
const temiz = (v) => String(v ?? "—").replace(/[^A-Za-z0-9._:@/+-]/g, "?").slice(0, 60);
const yaz = (s) => { console.log(s); if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, s + "\n"); };

async function oku() {
  const r = await fetch(taban.replace(/\/$/, "") + "/v1/ai/selftest", { signal: AbortSignal.timeout(180_000) });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json();
}
let j;
for (let i = 0; i < (bayrak.includes("--bekle") ? 7 : 1); i++) {
  try { j = await oku(); } catch (e) { j = null; console.error("okunamadı: " + temiz(e?.message)); }
  if (j && !(j.durum === "onbellek" && (!j.gorevler || !j.gorevler.length))) break;
  await new Promise((r) => setTimeout(r, 20_000));
}
yaz("### Yapay zekâ öz-sınaması (PM-087 A)");
if (!j || typeof j !== "object") { yaz("- ⚠️ uç okunamadı"); process.exit(1); }
yaz(`- durum: \`${temiz(j.durum)}\` · sonuç: ${j.ok ? "✅ geçti" : "❌ kaldı"} · koşu zamanı: \`${temiz(j.zaman)}\` · sağlayıcı: \`${temiz(j.saglayici)}\``);
yaz("\n| görev | sonuç | ms | model | neden |\n|---|---|---|---|---|");
for (const g of Array.isArray(j.gorevler) ? j.gorevler : []) yaz(`| ${temiz(g.gorev)} | ${g.gecti ? "✅" : "❌"} | ${Number(g.ms) || 0} | \`${temiz(g.model)}\` | ${g.neden ? "`" + temiz(g.neden) + "`" : ""} |`);
for (const [ad, o] of [["bugün", j.bugun], ["dün", j.dun]]) {
  if (!o || !o.kosu) continue;
  yaz(`\n**${ad} (${temiz(o.gun)}): ${Number(o.kosu)} koşu**\n\n| görev | geçti/toplam | ortanca ms | en uzun ms |\n|---|---|---|---|`);
  for (const [k, v] of Object.entries(o.gorev || {})) yaz(`| ${temiz(k)} | ${Number(v.gecti)}/${Number(v.toplam)} | ${Number(v.ortanca_ms)} | ${Number(v.en_uzun_ms)} |`);
}
// kapalı, pay korunuyor ya da tavan: model çağrılmadı; son sonuç yoksa kırmızı sayılır
process.exit(j.ok ? 0 : 1);
