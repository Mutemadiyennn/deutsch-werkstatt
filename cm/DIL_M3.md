# Dilbilimci görevi: M1 düzeltme turu (#62, #63 inceleme sonrası)

Rolün `/home/claude/deutsch-werkstatt/.claude/agents/dilbilimci.md`. git çalıştırma. Belge yığını okuma. Türkçe kuralları: `/home/claude/cm/OKUR_DERSLERI.md`, OD-9 (cümle ≤ 14 kelime, terim yok, `=`, `;`, `…`, tırnak yok, Almanca `**kalın**`).

## 1. Kartlar
Kartlar sözlüğe uygulandı: `/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-*.json`. İncele: `lx:neu`, `lx:Büro`, `lx:offen`, `lx:wieder`, `lx:da`, `lx:brauchen`, `lx:Herr`, `lx:müde` (forms, coll, örnekler, tr, exp, mistakes_tr) ve `mistakes_tr` alanı yenilenen `lx:haben`, `lx:sollen`, `lx:heißen`, `lx:machen`, `lx:vor`, `lx:Stunde`, `lx:Minute`, `lx:Abend`.
Sözlük dosyasını **doğrudan değiştirme**. Düzeltmeleri `/home/claude/cm/work/batch-m3.dil.json` yamasına yaz (biçim: `{"lx:neu": {"forms": [...tam liste...], "mistakes_tr": [...tam liste...], "coll": ["de | tr"], "ex": {"2": {"de": "...", "tr": "..."}}}}`).
Hata notu kuralı: gerçek hata gösterir ve Türkçe niyetle başlar (`Yorgunum derken **Ich müde** yanlış. Doğrusu **Ich bin müde.**`). Şu notlar kurala uymuyor, düzelt ya da çıkar: `lx:da[0]`, `lx:da[1]`, `lx:wieder[0]`, `lx:wieder[1]`, `lx:Stunde[0]`, `lx:Abend[0]`, `lx:neu[0]`, `lx:brauchen[0]`, `lx:Herr[0]`, `lx:Herr[1]`.
Bitince: `cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/batch-m3.dil.json` temiz olmalı.

## 2. Gün dosyaları
`/home/claude/wt-m1/content/v2/m1/gun-0*.json` ve `hafta-sonu-testi.json`. Değişen Almanca alanlar: `/home/claude/cm/work/m1duz.de.txt` (94 alan). Hepsini oku: doğru, doğal, A1 için uygun mu; `accepted` öğretilen doğru eşdeğerleri içeriyor mu, en az 3 mü. Testin 12 maddesinin tamamını oku. Düzeltmeleri **bu dosyalarda doğrudan** yap. `video/` klasörüne dokunma (başka ajan çalışıyor).
Sonra: `cd /home/claude/wt-m1 && npx tsx /home/claude/cm/m1audit.ts` → 0 ihlal olmalı.
Değiştirdiğin Türkçe alan yollarını `/home/claude/cm/work/m1duz.alanlar.txt` sonuna ekle.

Rapor: `/home/claude/wt-m1/docs/v2/reviews/m1-duzeltme.md` (kısa: incelenen kart kimlikleri, düzeltmeler, açık noktalar). Son mesaj: sayılar ve açık noktalar.
