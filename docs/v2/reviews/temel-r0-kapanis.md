# R0 temel paket: inceleme kapanışı (2026-11-18)

## Kapsam
10 ders (`content/v2/temel/r0-01` … `r0-10`): günler, aylar, sayılar 0–100, saat, tarih, soru kelimeleri, **sein** ve **haben**, modal fiiller, heceleme.

| Aşama | 01–05 | 06–10 |
|---|---|---|
| Dilbilimci: madde | 378 | 470 |
| Dil hatası | 15 | 48 |
| Eklenen kabul cevabı | 66 madde | 93 varyant, 36 madde |
| Okur: alan | 620 | 602 |
| İlk turda geri dönen | 9 | 21 |

Geri dönen alanlar düzeltildi ve yeniden okundu (`okur/temel-r0a`, `r0b`, `r0re2`, `r0re3`). Son turlarda iki metin yeniden yazılmak yerine silindi: `r0:09:a:sie-duerfen` parça açıklaması ve `r0:07:a:wie-heissen` ipucu.

Parça çipleri (77 öğe) soldan sağa okunarak ifadenin anlamıyla karşılaştırıldı (PM-044 madde 3c). Anlamı çarpıtan çip kalmadı.

## Dilbilimcinin açık maddeleri
| Madde | Durum |
|---|---|
| 02, 03, 05: soruda **Wann**, **Wo** gibi kelimeler 07'den önce geçiyor | Yalnızca duyulur; soru `situation_tr` ile Türkçe açıklanır, cevapta istenmez |
| 02, 04, 05 diyaloglarında öğrenci satırında öğretilmemiş kelime | Düzeltildi |
| Sayı derslerinde rakamla geçme | Değerlendirici işi: `strictNumberWords` (PM-045 §4) |
| Karışık heceleme, ad ve soyad yuvası, adın harf harf okunması | Ürün ve şema isteği (#12). Ders 10 diyaloğu bu yüzden **Ich buchstabiere.** diyor |
| Doğrulayıcı `temel/` klasörünü okumuyor | `TemelDers` türü (PM-045 §4) |
| Ders 10 yükü (iki bölümde 24 öğe) | Kurala uyuyor; öğrenci verisiyle yeniden bakılacak |
