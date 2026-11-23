# A1 7. hafta: hafta kapısı bulgularının kapatılması (yazar)

Araç: hafta kapısı (`content/tools/hafta-kapisi.ts`), 7. hafta. Sonuç: **GEÇTİ**.

## 1. `gun-43.json` sahne b1, `cevapla` (m1:43:v1:c1)
- Önce: `prompt_de` "Und Sie? Was fehlt Ihnen?" (**fehlt** o anda öğretilmemiş, kesin).
- Sonra: `prompt_de` "Und Sie? Wie geht es Ihnen heute?"; `situation_tr` "Sıra sende. Dr. Weber sana nasıl olduğunu soruyor. Başın iki gündür ağrıyor."
- `accepted` ve `why_tr` aynı kaldı. "Wie geht es Ihnen" haftanın başka bir yerinde geçmiyor.

## 2. `gorulmemis-07.json`
Var olan durumların `can_do` alanı günün kimliğine bağlandı: g1 ve g2 → cd:m1:43, g3 → cd:m1:45, g4 → cd:m1:48, g5 → cd:m1:46.

Yeni durumlar (kişi, yer ve olay derste geçmiyor; bütün `accepted` ve `prompt_de` K(49) içinde, tek tek denetlendi):

| durum | can_do | kişi | yer | olay | kalıp |
|---|---|---|---|---|---|
| g6 | cd:m1:44 | istasyon görevlisi (adsız) | pl:bahnhof, bekleme salonu | Bekleme salonunda yemek serbest mi, dışarıda mı yemek gerekiyor? | Darf man hier …? – Muss ich …? |
| g7 | cd:m1:47 | ch:stadler | pl:baeckerei | Fırın kırmızıya boyanmış, Gerti fikrini soruyor | Wie gefällt Ihnen …? – … gefällt mir. |
| g8 | cd:m1:49 | nöbetçi doktor (adsız) | komşu kasabada hafta sonu nöbetçi muayenehanesi | Perşembeden beri karın ağrısı, günde üç kez yemekten önce tablet; süreyi söyle, talimatı tekrar et | Seit … – Ich soll … nehmen? |

- `accepted` sayısı: g6 15, g7 16, g8 12. En kısa cevaplar ("Darf man hier essen?", "Das Rot gefällt mir.", "Seit Donnerstag. Also dreimal am Tag eine Tablette vor dem Essen?") `ruleVerdict` ile `correct`.
- Aynı cümle taraması: yeni durumların hiçbir cümlesi 43.–49. günlerde birebir geçmiyor. (g5'in üç kısa cevabı 46. günde birebir geçiyor. Bunlar eskiden vardı, dokunulmadı. Araç bu cümleleri zaten dışarıda bırakıyor ve durum başka cevaplarla kurulabiliyor.)

## Sınama
- `hk.sh 7`: Öğretilmeden istenen 0 (kesin 0, sınırda 0) · anlaşılmayan karşı soru 0 · hafta sonu testi %100 (12/12) · görülmemiş 8/8 · sınanmayan can_do: yok · GEÇTİ.
- Benzetim (`a1k-h7.json`, 43–49 + gorulmemis-07): 43.–49. günler için hata yok. "Öğretilmemiş" ya da "bilinmeyen" uyarısı yok (AK-3 sayacında 43.–49. günler 0). Dikişte 43.–49. günlerin satırları ihlalsiz. Toplam "İhlal: 86" tablodan taslak gelen 8.–42. günlerden geliyor, bilinen bir durum.
- Benzetimde kalan uyarılar bu işle ilgili değil: video yok, yeni kart 15'ten az, B7 ad yuvasının adsız biçimi.

## Emin olmadığım nokta
- g8'de doktor "So, hier ist ein Rezept." deyip süreyi soruyor. Talimat öğrenciye Türkçe durum metninde veriliyor. Cevap iki parçalı: süre + talimatı doğrulama. En kısa kabul cümlesi de bu yüzden uzun.
