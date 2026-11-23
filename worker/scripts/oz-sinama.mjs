#!/usr/bin/env node
/**
 * Canlı yapay zekâ öz-sınamasını okur (PM-087 A.3) ve Markdown tablo yazar. Adres günlüğe yazılmaz.
 * Kullanım: node worker/scripts/oz-sinama.mjs <worker-kök-adresi>
 * Çıkış: 0 = bu sürümün taze koşusu geçti · 1 = kaldı, kapalı (sağlayıcı ya da kilit bağlamı yok) ya da uç okunamadı ·
 * 3 = ölçülmedi (pay korunuyor, günlük tavan: eski sonuç yeşil SAYILMAZ; inceleme #209 P1-2). Ağ hatasında 3 deneme. Uç koşuyu kendisi tekilleştirir.
 * Tablo stdout'a; GITHUB_STEP_SUMMARY tanımlıysa oraya da eklenir. Yanıttaki her değer güvenli karakterlere süzülür.
 */
import { appendFileSync } from "node:fs";

const [taban] = process.argv.slice(2);
if (!taban) { console.error("kullanım: oz-sinama.mjs <adres>"); process.exit(2); }
const temiz = (v) => String(v ?? "—").replace(/[^A-Za-z0-9._:@/+-]/g, "?").slice(0, 60);
const yaz = (s) => { console.log(s); if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, s + "\n"); };

async function oku() {
  // en kötü koşu ≈ 3 × 12 + 2 × 30 sn
  const r = await fetch(taban.replace(/\/$/, "") + "/v1/ai/selftest", { signal: AbortSignal.timeout(120_000) });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json();
}
let j;
for (let i = 0; i < 3 && !j; i++) {
  if (i) await new Promise((r) => setTimeout(r, 10_000));
  try { j = await oku(); } catch (e) { j = null; console.error("okunamadı: " + temiz(e?.message)); }
}
yaz("### Yapay zekâ öz-sınaması (PM-087 A)");
if (!j || typeof j !== "object") { yaz("- ⚠️ uç okunamadı"); process.exit(1); }
const sonuc = !j.taze ? "⚠️ ölçülmedi (bu sürümün taze sonucu yok; aşağıdaki tablo eski)" : j.ok ? "✅ geçti" : "❌ kaldı";
yaz(`- durum: \`${temiz(j.durum)}\` · sonuç: ${sonuc} · sürüm: \`${temiz(j.surum)}\` · koşu zamanı: \`${temiz(j.zaman)}\` · sağlayıcı: \`${temiz(j.saglayici)}\``);
// dil: çalışma anı dil güvencesi devreye girdi mi (yeniden · yedek; PM-112 A.1): öğrenci Türkçe gördü ama model saptı
yaz("\n| görev | sonuç | ms | model | neden | dil |\n|---|---|---|---|---|---|");
for (const g of Array.isArray(j.gorevler) ? j.gorevler : []) yaz(`| ${temiz(g.gorev)} | ${g.gecti ? "✅" : "❌"} | ${Number(g.ms) || 0} | \`${temiz(g.model)}\` | ${g.neden ? "`" + temiz(g.neden) + "`" : ""} | ${g.dil ? "`" + temiz(g.dil) + "`" : ""} |`);
for (const [ad, o] of [["bugün", j.bugun], ["dün", j.dun]]) {
  if (!o || !o.kosu) continue;
  yaz(`\n**${ad} (${temiz(o.gun)}): ${Number(o.kosu)} koşu**\n\n| görev | geçti/toplam | ortanca ms | en uzun ms | dil onarımı |\n|---|---|---|---|---|`);
  for (const [k, v] of Object.entries(o.gorev || {})) yaz(`| ${temiz(k)} | ${Number(v.gecti)}/${Number(v.toplam)} | ${Number(v.ortanca_ms)} | ${Number(v.en_uzun_ms)} | ${Number(v.dil_onarim) || 0} |`);
}
process.exit(j.durum === "kapali" ? 1 : !j.taze ? 3 : j.ok ? 0 : 1);
