# [İÇ-A1] 3.–6. hafta: kendini tanıtma eklemeleri, dilbilimci incelemesi

PM-148 · dilbilimci-ajan · 27.11.2026 · çalışma ağacı `wt-b`, `git diff origin/main -- content/v2/m1/` üzerinde.
Gerekçe: DENETİM-A1 raporu §2, §4, §7 (P0-1 kendini tanıtma, P1-2 mektup kalıbı ve denn).

## Kapsam
İncelenen 35 madde (seçenek, görev cümlesi, kalıp satırı, yazma görevi, test maddesi):

| Dosya | Eklenen | Madde |
|---|---|---|
| gun-16 | kalıp "Was arbeiten Sie? – Ich arbeite als …", görev `lx:Name` + {meslek}, prova n8 (3 seçenek) | 5 |
| gun-17 | farkta yok; incelenecek ekleme yok | 0 |
| gun-19 | kalıp "Was arbeitest du?", prova n7 (3 seçenek) | 4 |
| gun-22 | kalıp "Viele Grüße, …", yazma görevi | 2 |
| gun-27 | kalıp "Liebe …, – Lieber …, – Viele Grüße, …", yazma görevi | 2 |
| gun-31 | prova n4 düzeltmesi (3 seçenek) | 3 |
| gun-32 | kalıp denn, 2 denn görev cümlesi, prova n5 (3 seçenek) + n6 | 7 |
| gun-33 | kalıp + görev `lx:Land` | 2 |
| gun-39 | prova n6 (2 seçenek), n7 (3 seçenek), akış | 6 |
| gun-40 | okuma metni "Mit freundlichen Grüßen" | 1 |
| hafta-sonu-testi-03…06 | 4 `guided_response` sınav kartı maddesi | 4 |

Genel hüküm: yuvalı cevaplar dilbilgisel olarak doğru. **Ich bin {meslek}.**, **Ich arbeite als {meslek}.** ve **Ich bin {meslek} von Beruf.** artikelsiz, doğru; "ein"li çeldiriciler gerçekten yanlış ve geri bildirimleri doğru. **Ich bin {aile}.** doğru. **Mein Hobby ist {hobi}.** isim öbeğiyle ve "Fahrrad fahren" gibi mastar öbeğiyle doğru (23. günde de böyle). Mektup kalıpları (Viele Grüße, Liebe/Lieber …) ve 40. gündeki "Mit freundlichen Grüßen" doğru ve yerinde. denn cümleleri doğal; "denn"den sonra sıra değişmiyor.

## Bulgular ve düzeltmeler

### P1-1 · gun-33 görev cümlesi: "Land: {ulke}. Beruf: {meslek}. Hobby: {hobi}." (düzeltildi)
- **Sorun 1:** `{ulke}` "aus"tan sonraki öbektir ("der Türkei"). Bu yüzden "Land: der Türkei." dilbilgisel olarak bozuk.
- **Sorun 2:** Form etiketlerini sesli okumak konuşma değil. Görev cümleleri "söyle" adımıdır; sınavda da kart "Land?" gelince "Ich komme aus …" denir. Yazarın açık sorusunun cevabı: **doğal değil.**
- **Önce:** `"de": "Land: {ulke}. Beruf: {meslek}. Hobby: {hobi}."`
- **Sonra:** `"de": "Ich komme aus {ulke}. Und aus welchem Land kommst du?"` · tr "Memleketim: {ulke}. Ya sen hangi ülkedensin?" · accepted 4 (+ "Aus welchem Land kommst du?", "Und du, aus welchem Land kommst du?", "Aus {ulke}. Und …").
  Doğum günü partisinde gerçekten duyulan bir soru. "Land" kartın (ülke) anlamıyla geçiyor, öğrenci de soruyu karşı tarafa geri soruyor (Teil 2 becerisi). "welchem" 31. günde öğretildi.
- **Kalıp satırı:** "Name: … – Land: … – Beruf: … – Hobby: … (formda)" → "Aus welchem Land kommst du? – Ich komme aus …" / "Hangi ülkedensin? – …'den geliyorum." (sözlükteki `lx:Land` eşdizimi "aus welchem Land").

### P1-2 · gun-39 prova akışı kopuktu (düzeltildi)
- **Önce:** n2/n3 (gürültü, parti) → n6 (aile) → n7 (hobi) → n4 "Im Jahr 1970 war die Straße nicht so laut." Öğrenci hobisini söyledikten sonra Frau Brandl birden sokağın 1970'teki gürültüsüne dönüyordu. n4'ün bağı gürültü konuşmasıydı.
- **Sonra:** n2/n3 → n4 (1970) → n6 → n7 → n5. n6: "Da war eine Schule. Heute ist da ein Parkplatz. Sagen Sie mal: Sind Sie verheiratet oder ledig?" (n4'teki "1970'te ne vardı?" sorusunun cevabı buraya taşındı; "Sagen Sie mal" meraklı komşunun konu değiştirmesi, WORLD'deki Brandl'a uygun). n7: "Ach so. Und was machen Sie gern? Haben Sie ein Hobby?". n5 (son): "Ach, schön! Möchten Sie einen Kaffee?". Kişisel sorulardan sonra kahve daveti doğal bir kapanış.
- "kleine" ve "Aha" hafta kapısında karşı soruda bilinmeyen çıktı (yeni yerleşimden). İkisi çıkarıldı.

### P1-3 · gun-39 "Sind Sie noch ledig?" ile yuvalı cevap: haksız ret (düzeltildi)
- Evet/hayır sorusuna en doğal cevap "Nein, ich bin verheiratet." / "Ja, ich bin ledig." Kabuller yalnız "Ich bin {aile}." biçimindeydi. `prova.ts` olumsuzluk tutumu farklı cevabı "yakın" saymıyor, yani evli öğrencinin doğru cevabı **yanlış** sayılırdı. Kabule "Ja/Nein" eklemek de olmaz: değere göre çelişkili cevabı kabul eder.
- **Sonra:** seçmeli soru "Sind Sie verheiratet oder ledig?" (46. günde öğretilen kalıbın aynısı). Cevap "Ich bin {aile}." olur, ja/nein gerekmez.

### P1-4 · {aile} = verheiratet, 39. günde öğretilmemiş (AÇIK, kart işi)
- `lx:verheiratet` m1'de ilk kez **46. günde** kart. 39. günde evli öğrenci "Ich bin verheiratet." üretmek zorunda. Doğrulayıcı yuvanın değerini saymadığı için yakalamıyor.
- Hafifletme: n6 sorusunda artık sözcük duyuluyor (P1-3). Kalıcı çözüm bende değil, tablo ve sözlük işi: `lx:verheiratet` 29. güne, `lx:ledig`in yanına alınmalı (kart batch-008'de var) ya da ≤ 39. günde bir halka kalıbı "Ich bin ledig. – Ich bin verheiratet." eklenmeli. Aynı soru öbür yuvalar için de geçerli: profil değerleri (meslek adı, ülke, diller) kart değil. Öğrencinin kendi bilgisi olduğu için kabul edilebilir, ama `{aile}`in kapalı bir değer kümesi var ve öğretilebilir.

### P2-1 · gun-39 Türkçe terim (düzeltildi)
- "Medeni durumum: {aile}." → "Evli ya da bekâr: {aile}." (çeldiricide de). durum_tr, kapanis_tr ve doğru seçeneğin geri bildiriminde "aile durumu" → "evli ya da bekâr olduğunu".
- Çeldirici geri bildirimi: "Aile durumu **haben** ile değil, **sein** ile söylenir: **Ich bin …**" → "Burada **Ich habe** değil, **Ich bin** dersin: **Ich bin ledig.**" (OD-9: mastar adı yok, örnek var).

### P2-2 · Hafta sonu testlerinde sınav kartı adları (düzeltildi)
- HST-04: "**Woher?**" Start Deutsch 1 kartında yok; kart "**Land?**". → "Sınav kartları: **Land?** (ülke) ve **Beruf?** (meslek)." `Land` 33. günde, `Beruf` 31. günde öğretiliyor, bu yüzden Türkçe karşılık parantezde.
- HST-03: "**Sprache?**" → "**Sprachen?**" (kart çoğul). Ayrıca "(meslek)", "(diller)" eklendi, çünkü `Beruf` 3. haftada henüz öğretilmedi.
- HST-03, 04, 05: iki kart olduğu için "Sınav kartı:" → "Sınav kartları:".

## İncelendi, değişmedi (doğru)
- gun-16 n8: Huber Hanım yeni hasta kaydında mesleği soruyor, akla yatkın. "Was arbeiten Sie?" güneyde yaygın ve doğal. "Als {meslek}." kısa cevap olarak doğal.
- gun-19 n7: "Dann üben wir noch." Ioana'nın "Wollen wir zusammen üben?" karakterine uyuyor. n6 "Dann reden wir noch Deutsch!" ile hafif tekrar var, engel değil.
- gun-31 n4: "Ich bin {meslek} von Beruf." ve "Ich arbeite als {meslek}, mit Tobi und Derya." doğru ve doğal. Sabit kurgusal cevap (DENETİM P0-1) kalktı.
- gun-32 n5: yazarın açık sorusu "Mein Hobby? {hobi}! Und du, Tobi?" konuşma dilinde çok doğal (soruyu tekrarlayıp cevap verme ve geri sorma). Kalsın. n6'da Tobi'nin hobisi futbol, WORLD'le uyumlu.
- gun-32 denn görevleri: "Ich esse gern hier, denn die Kollegen sind nett." / "Das ist mir egal, denn ich esse alles gern." Kantinde doğal, A1 düzeyinde.
- gun-22 / gun-27 yazma: kalıplar ve kontrol maddeleri doğru. "Liebe Derya, mein Haus …" virgülden sonra küçük harf, mektup kuralına uygun.
- gun-40: "Guten Tag, Ihr Termin … Mit freundlichen Grüßen, Praxis Dr. Weber". Kanıt cümle sıraları (0, 2, 3) değişmedi.
- HST-05, HST-06: kabuller yuvalı ve doğru. Her kart için tam bir cümle var.

## Kalan şüpheler ve öneriler (engel değil)
- P1-4 yukarıda (kart ya da kalıp kararı yazarda/lex'te).
- denn'in sırayı değiştirmediği (weil'in aksine) hiçbir yerde söylenmiyor, yalnız kalıp satırı var. Bir ders ya da kart ipucu önerilir. denn görevlerinde "weil"li doğru biçim kabul edilmiyor. Risk düşük, çünkü weil öğretilmedi.
- "Mit freundlichen Grüßen" ve "Sehr geehrte …" için kalıp satırı ya da yazma görevi henüz yok (yalnız 40. gün okuması). DENETİM P1-2 resmî mektup tonu için en az bir yazma görevi istiyor.
- gun-27 ornek "Mein Haus ist in der Brunnengasse sieben." (eski içerik, farkta değil). İkinci kattaki daire için "Meine Wohnung …" daha doğru.
- Profil gereği (uygulama ekibine): `{meslek}` artikelsiz ve cinsiyete uygun ad olmalı ("Krankenpflegerin"). `{ulke}` aus'tan sonraki hâliyle girmeli ("der Türkei", "dem Irak", "Syrien"). `{hobi}` isim ya da mastar öbeği olmalı ("Fußball", "Lesen", "Fahrrad fahren"). Yoksa "Ich komme aus Türkei" gibi bozuk cümleler çıkar.

## Denetimler (son durum)
- `npm run -s content:validate` → 0 hata, 291 uyarı (başlangıçtaki sayı; yeni uyarı yok)
- `dikis-kos.ts` → İhlal: 0
- `hafta-kapisi-kos.ts --hepsi` → Öğretilmeden istenen 0 · anlaşılmayan karşı soru 0 · hafta sonu testi %100 · görülmemiş durum 6/6

## 2. tur (okur OD-9.3 GERİ, `docs/v2/reviews/okur/ic-a1-hafta-3-6.md`)
- HST-04 m1:28:t08 ve HST-05 m1:35:t09 `why_tr`: noktalı virgül kalktı, kısa cümlelere bölündü.
- HST-06 m1:42:t12 `why_tr`: 18 sözcük → üç kısa cümle ("Her karta tam bir cümle kur. Ülke ve şehir: … Meslek ve hobi: …"; her biri ≤ 14 sözcük).
- Okur gözlemi (gün 39): "Evli ya da bekâr: {aile}." form satırı gibi okunuyordu → "Evli ya da bekâr olduğumu söylüyorum: {aile}." Eki yok, konuşma cümlesi olduğu belli, "medeni durum" terimi kullanılmadı.
- Gün 16 ve 19 `kapanis_tr`: meslek sorusu yarım cümleyle eklendi ("…, mesleğini de söyledin." / "… ve ne iş yaptığını söyledin.").
- Denetimler: validate 0 hata (291 uyarı) · dikiş İhlal: 0 · hafta kapısı 0 / %100 / 6/6 · `vitest content/tools` 18 dosya, 230 test geçti.

## Sonuç
Yazarın bulguları: 6 (P1 4, P2 2) / 35 madde → hata oranı ≈ %17. 5'i düzeltildi. **AÇIK:** P1-4 (`lx:verheiratet` 46. günden önce öğretilmeli). Kart kararı gelene kadar `review` alanına dokunulmadı (görev gereği).
