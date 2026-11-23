# Okur kontrolü — Gün 5 ve Gün 6 halkalarına eklenen satırlar (OD-9.3), ek tur

Kaynak: `content/v2/m1/gun-05.json`, `content/v2/m1/gun-06.json`.
Kapsam: İÇ-3 (PM-084 hat C) ile eklenen 3 satır (2 kalıp satırı, 1 görev cümlesi). Halkaların geri kalanı daha önce okurdan geçti.
Okuyan: dilbilgisi terimi bilmeyen, telefondan okuyan öğrenci gözüyle. Her Türkçe satır tek başına okundu.

**Güncelleme (2. okuma):** 7. ve 8. satırlar ayrı kalıp satırı olmaktan çıktı, halkanın ilk kalıp satırına (`halkalar[0].kaliplar[0]`) katıldı. İkisi de yeni hâliyle yeniden okundu. 9. satır değişmedi. Dosyadaki metin, düzeltme mesajındaki metinle aynı.

Kalıp satırı ekranda şöyle durur: her Almanca parçanın altında sırasıyla kendi Türkçe parçası. Çizgi parçaları ayırır. "…" Almanca çerçevedeki boş yerin karşılığıdır. Bu, halkaların onaylı kalıp biçimi; çizgi ve "…" tek başına GERİ nedeni sayılmadı. Her parça kendi karşılığıyla okundu.

## Sonuç

| Okunan satır | GEÇTİ | GERİ |
|---|---|---|
| 3 | 3 | 0 |

GERİ olan satır yok.

## Satırlar

| # | Öğe | Alan | Almanca | Türkçe (açıklama) | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|---|
| 7 | m1:05:h1 | kaliplar[0] / tr | Wie spät ist es? – Es ist … Uhr. – zu spät – zu früh | Saat kaç? – Saat … – fazla geç – fazla erken | Birine saati soruyorum, o "saat şu" diye cevap veriyor. Söylenen saat bana uymuyorsa "bu çok geç" ya da "bu çok erken" diyorum. | GEÇTİ | Dört parçanın her biri altındaki Almancayla eşleşiyor. Satır küçük bir konuşma gibi akıyor: soru, cevap, sonra itiraz. Tek okumada oturdu. Not (engel değil): günlük Türkçede daha çok "çok geç / çok erken" denir. "Fazla geç" biraz kitap dili gibi ama anlam kaçmıyor ve halkadaki "Bu fazla geç." cümlesiyle tutarlı. |
| 8 | m1:06:h1 | kaliplar[0] / tr | Welches Datum ist heute? – Heute ist der erste Mai. – der Zweite – der Dritte – der Vierte | Bugünün tarihi ne? – Bugün bir mayıs. – ayın ikisi – üçü – dördü | Bugünün tarihini soruyorum, cevap "bugün 1 mayıs". Sonra aynı cevabı ayın 2'si, 3'ü, 4'ü için de kurabiliyorum. | GEÇTİ | Her parça altındaki Almancayla eşleşiyor. "Bir mayıs"tan sonra "ayın ikisi – üçü – dördü" diye saymak, tarih söyleme alışkanlığına uyuyor. Alttaki "bir mayısta – ayın ikisinde…" kalıbından farkı da görünüyor: bu satır "bugün ayın kaçı", o satır "ayın kaçında". Türkçe tarafla ilgisi olmayan bir gözlem (dilbilimciye): Almancada "erste" küçük harfle, "Zweite / Dritte / Vierte" büyük harfle yazılmış. Öğrenci olarak "neden farklı?" diye takıldım. |
| 9 | m1:06:h4 | gorev_cumleleri / tr | Meine Adresse ist neu. | Adresim yeni. | Yeni bir adrese taşındım, adresim değişti diyorum. | GEÇTİ | İki kelime, tek fikir. |

Toplam: 3 · GEÇTİ: 3 · GERİ: 0
GERİ kimlikleri: yok.

Bu ek turdaki üç satır OD-9.4 açısından engel değildir.

## Ek tur 2 — adsız hâller ve bir yeni görev cümlesi

Kapsam: 6 yeni Türkçe satır. 10–14, adını girmemiş öğrenciye gösterilen hâller (alan `tr_adsiz`; yanındaki `tr`, adı olan hâl). 15, Gün 2'deki yeni görev cümlesi (alan `tr`).
Dosyadaki metin, koordinatörün verdiği metinle aynı.

Bulunan fark (15. satırla ilgili): `gun-02.json` m1:02:h4'te, `lx:haben` kartlı görev cümlesi eskiden "Im August habe ich Urlaub." / "Ağustosta iznim var." idi. İlk turdaki 3. satır buydu. O yerde artık 15. satır duruyor. "Im August habe ich Urlaub." dosyada yalnızca başka bir yerde, bir kabul listesinde (satır 1850) geçiyor. Yani 3. satır görev cümlesi olarak artık ekranda yok. Kararı bundan etkilenmiyor.

### Sonuç (Ek tur 2)

| Okunan satır | GEÇTİ | GERİ |
|---|---|---|
| 6 | 6 | 0 |

### Satırlar

| # | Öğe | Alan | Almanca | Türkçe (açıklama) | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|---|
| 10 | m1:05:h1 sahne satırı 0 (Tobi) | tr_adsiz | Wie spät ist es? | Saat kaç? | Tobi bana saatin kaç olduğunu soruyor. | GEÇTİ | İki kelime, tek fikir. Ad olmadan da eksik durmuyor. |
| 11 | m1:06:h2 görev cümlesi (kart heißen) | tr_adsiz | Und Sie? Wie heißen Sie? | Ya siz? Sizin adınız ne? | Karşımdakine sırayı veriyorum ve kibarca adını soruyorum. | GEÇTİ | İki kısa soru, aynı fikir. "Ya siz?" karşı tarafa dönüşü tek okumada anlatıyor. Not (engel değil): "Sizin" bir parça fazla duruyor ("Ya siz? Adınız ne?" daha doğal) ama anlamı bozmuyor. |
| 12 | m1:06:h3 sahne satırı 0 (Tobi) | tr_adsiz | Wohin gehst du? Es ist noch früh! | Nereye gidiyorsun? Daha saat erken! | Tobi beni çıkarken görüyor, "nereye, daha erken" diye şaşırıyor. | GEÇTİ | İki kısa cümle, tek durum. "Daha saat erken" konuşma dili ama tek okumada anlaşılıyor; ortam satırı (saat dört, mont giyiyorsun) ile uyumlu. |
| 13 | m1:07:h1 görev cümlesi (kart sein) | tr_adsiz | Meine Adresse ist Brunnengasse sieben. | Adresim Brunnengasse yedi. | Adresimi söylüyorum: Brunnengasse sokağı, 7 numara. | GEÇTİ | Tek fikir. Sokak adı Almanca kalıyor; bu bir yer adı, ekranda tırnak içinde değil, sorun değil. |
| 14 | m1:07:h2 sahne satırı 1 (sen, telefonda) | tr_adsiz | Guten Tag. Ich habe Fieber und ich möchte einen Termin. | İyi günler. Ateşim var ve bir randevu istiyorum. | Muayenehaneyi arıyorum, selam veriyorum, ateşim olduğunu söyleyip randevu istiyorum. | GEÇTİ | Selam + tek istek (ateş yüzünden randevu). İkinci cümle 6 kelime. Ad olmayınca "Ben …" yerine "İyi günler" gelmiş; telefon açılışı olarak doğal. |
| 15 | m1:02:h4 görev cümlesi (kart haben) | tr | Im August habe ich Geburtstag. | Ağustosta doğum günüm var. | Doğum günüm ağustos ayında diyorum. | GEÇTİ | Tek fikir, 4 kelime. Almancayla aynı şeyi söylüyor. |

Toplam (Ek tur 2): 6 · GEÇTİ: 6 · GERİ: 0
GERİ kimlikleri: yok.

## Güncel toplam (bu rapor)

Toplam: 9 · GEÇTİ: 9 · GERİ: 0 · GERİ kimlikleri: yok.
