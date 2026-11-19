# M1 İlk Hafta: içerik kapanış notu (#58 A2, A9)

Tarih: 2026-11-19. Yol: yazar → dilbilimci → okur → denetim.

| Parça | Durum |
|---|---|
| 7 gün: temel ders bağı, kart listesi, 2 ses, sahne dizisi, görsel soru, prova, okuma ya da yazma | dilbilimci ve okur geçti; `m1audit` 0 ihlal |
| 7. gün sonu testi | 12 madde: tanışma, randevu, saat, tekrar isteme, ödeme, numara, ay |
| Gerçek insan videosu | 4 gün hazır (2, 4, 6, 7), 2 gün kısa (3, 5), 1 gün yok (1) |
| Kartlar | 151 kart, ayrı PR #62 |

## Açık kalanlar
- **Gün 1 için klip yok.** Gün 3 (~26 sn, Almanca öğrenen konuşmacı) ve gün 5 (~15 sn) 30 saniye alt sınırının altında. Karar #12'de soruldu.
- Klip süreleri kelime payından tahmindir. Video adresleri ve tur eşleşmesi CI'da doğrulanmalıdır.
- Gün 4, 6 ve 7 aynı tanışma soru dizisidir; fiyat, tarih ve randevu klipte geçmez. Bu konular gün dersinde, seslerde ve provada çalışılır.
- Örneklem kontrolü yapılmadı; bağımsız inceleme PR'da.
- Günlerin zod şeması #58 A4 ile gelecek; doğrulayıcı `content/v2/m1/` dosyalarını henüz denetlemiyor. Kontrol `m1audit` ile yapıldı (depo dışı araç, çıktısı `m1-denetim.txt`).
