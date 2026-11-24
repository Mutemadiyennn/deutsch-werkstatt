# İÇ-20 — A1 onarım farkları: dilbilimci fark turu

Tarih: 2026-11-24 · İnceleyen: dilbilimci-ajan · Kapsam: yalnız aşağıdaki altı commit'in farkı (tam tur değil).
İncelenen madde: 14 (kalıp/kabul/görev cümlesi/sahne satırı değişikliği).

## #215 (77220247) — gün 13, gün 14
- gün 14 h1 kalıbı "Kaufst du bitte …?" / "Lütfen … alır mısın?": Almanca doğru ve doğal (aynı günün sesli mesajı "Kaufst du bitte zehn Semmeln?" ile birebir). Türkçe doğru.
- gün 13 yazma "Ich bin um zehn da.": doğru; zorunlu "zehn" artık kalıbın sabit kısmında, genel "Ich bin um ___ da." ile çelişki yok. Görev amacı korunmuş.
- Bulgu yok.

## #216 (9ae733f0) — gün 15, gün 18
- gün 18 yazma: beş "am Samstag" kalıbı doğru ("Er ist am Samstag um ___." → er = der Termin, doğru). Görev ("cumartesi saat onda") ile uyumlu.
- gün 15 m1:15:s10 "Gern, ja, ich komme mit.": doğru, konuşmada geçen bir sıra. Ama asıl yaygın sıra olan **"Ja, gern, ich komme mit."** listede yoktu (haksız ret riski).
- **Düzeltme:** `/home/claude/w216/content/v2/m1/gun-15.json` m1:15:s10 accepted[] içine "Ja, gern, ich komme mit." eklendi.

## #217 (be333d9a) — gün 22
- "Der Führerschein?", "Die Einladung?", "Die Tabletten?": tek başına soru cümlesi olarak doğru ve örnek cevaptaki kullanımla aynı. Bulgu yok.

## #214 (686852ca) — gün 29
- m1:29:h2 lx:Dialekt "Ist das Dialekt?" / "Bu lehçe mi?": doğal, Bavyera'da günlük konuşmada sık duyulan soru. Kabul: "Ist das ein Dialekt?" (anlamı biraz farklı, "bu bir lehçe mi" ama doğru Almanca, kabul edilebilir), "Das ist Dialekt, oder?" doğru.
- Halkanın öteki Dialekt cümlesini ("Ich verstehe den Dialekt nicht.") tekrar etmiyor. Bulgu yok.

## #238 (fcc92cd6) — gün 40
- m1:40:h2 lx:manchmal "Im Frühling ist es manchmal schon warm." Almanca doğru. İki sorun vardı:
  1. Türkçe "İlkbaharda bazen hava şimdiden ısınıyor." Genel bir doğruyu anlatan cümlede "şimdiden" doğal değil. **Önce → sonra:** "İlkbaharda bazen hava şimdiden ısınıyor." → "İlkbaharda bile bazen hava sıcak olur." (aynı halkadaki "Sonbaharda bazen yağmur yağar." ile aynı geniş zaman).
  2. accepted[] üçüncü seçenek "Im Frühling ist es manchmal schon warm!" birinciden yalnız noktalamayla ayrılıyordu; gerçek bir varyant değildi. **Önce → sonra:** "…schon warm!" → "Es ist im Frühling manchmal schon warm." (D-064'e gerçek üç biçim).
- Sahne "Und das Wetter war so schön und warm." / "Hava da çok güzel ve sıcaktı." ve seçenek "Güzel ve sıcak": doğru, soru ile uyumlu.
- **Düzeltme dosyası:** `/home/claude/w238/content/v2/m1/gun-40.json`.
- Not (kapsam dışı): h2'nin kalıbı hâlâ "Es sind … Grad." gösteriyor; halkada artık Grad geçmiyor ama günün sınavı/yazması ("Es sind zwanzig Grad.") kullanıyor, kalıp orada işe yarıyor. Dokunulmadı.

## #221 (24f2890a) — gün 44, gün 46
- m1:44:h1 lx:Restaurant "Darf der Hund ins Restaurant?" / "Köpek restorana girebilir mi?": doğal (fiilsiz "darf … ins" konuşma dilinde çok yaygın), günün sahnesindeki "der Hund darf nicht ins Wartezimmer" ile uyumlu. Kabul listesindeki üç biçim doğru. Halkanın öteki cümlesini ("Ich möchte heute ins Restaurant gehen.") tekrar etmiyor. Hund 38. günde kart.
- gün 46 yazma "Beruf: Hausmeister.", "Sein Beruf ist Hausmeister.", "Er ist Hausmeister.": doğru (meslekte artikel yok). Bulgu yok.

## Doğrulayıcı
Düzenlenen iki ağaçta `npm run content:validate` koşuldu. Ağaçlar yalnız kendi haftalarını taşıdığı için önceki haftalara bağlı "bilinmeyen" hataları var (bu turdan önce de vardı). Bu turda değişen cümlelerin hiçbiri hata ya da uyarı listesinde yok.

## Kalan şüpheler
- gün 46 yazmada zorunlu "Hausmeister" kart olarak öğretilmemiş (doğrulayıcı uyarısı, bu turdan önce de vardı); sözcük okunan metinde ("Ich bin Hausmeister.") geçiyor, görev formu metinden doldurmak. Bu yüzden engel saymadım; baş geliştirici bilsin.

## Sonuç
Hata: 3 (2 madde) / 14 madde. Değiştirilen dosyalar: `w216/content/v2/m1/gun-15.json`, `w238/content/v2/m1/gun-40.json`.

Karar: ONAY (iki küçük düzeltme ağaçta yapıldı; ilgili PR'lara eklenmeli)
