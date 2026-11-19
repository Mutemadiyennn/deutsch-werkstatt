# M1 video: tur çevirileri ve dikte merdiveni (#58 A9)

Tarih: 2026-11-19 · İnceleyen: dilbilimci-ajan · Dosyalar: `content/v2/m1/video/klip-01…07.json`

## Kapsam
- 51 tur çevirisi (`turlar[].tr`), kaynak Almancayla tek tek karşılaştırıldı.
- 33 dikte maddesi: 7 kolay, 7 orta, 7 zor, 5 usta, 7 gerçek.
- Toplam 84 madde.

## Düzeltmeler (84 maddede 9, ayrıca 1 cevap listesi eki)
| Yer | Önce → sonra | Gerekçe |
|---|---|---|
| klip-02 tur 6 | `2004 yılında, ağustos ayında Amerika'ya vardım.` → `2004 yılında Amerika'ya vardım, tam olarak ağustosta.` | **und zwar** önce söyleneni kesinleştirir. Eski çeviride bu ek kaybolmuştu. |
| klip-02 tur 8 | `Burada önce Lubbock'ta…` → `Burada daha önce Lubbock'ta…` | **schon** sıra bildirmez, daha önce anlamındadır. |
| klip-03 tur 14 | `Mavi, Bavyera'nın renklerinden biri.` → `Mavi aynı zamanda Bavyera'nın renklerinden biri.` | **auch** çevrilmemişti. |
| klip-05 tur 4 | `Sanırım evet, yeterli. Fena değil.` → `Sanırım evet, öyle. Böyle iyi.` | **doch** soruyu onaylar, yeni bilgi eklemez. **Das ist okay** ayrıntı sorusunun açıklamasındaki `iyi` ile aynı karşılığı aldı. |
| klip-07 tur 14 | `çok canlı` → `canlı`; `Beni çok etkiliyor` → `Bana çok hitap ediyor`; `Bence çok güzel bir renk` → `Bence çok iyi` | Kaynakta pekiştirme yok. **ansprechen** hitap etmek. **sehr gut** çok iyi. |
| klip-07 d4 usta | küçük harfli `ihre` yazımı çıktı; 4 yazım, hepsi büyük **Ihre** | Küçük harfle anlam `onun` olur. |
| klip-07 d3 zor | küçük harfli `sie` yazımı çıktı; 4 yazım, hepsi büyük **Sie** | Aynı gerekçe: küçük harfle anlam `onlar` olur. Görevde yalnızca `ihre` yazıyordu, karar baş geliştiricide. |
| klip-01 d4, klip-04 d4 usta | ikişer yazım eklendi (noktasız, ümlautsuz) | Haksız ret riski. Ümlautsuz yazımlar listede kaldı. |
| klip-04 cevapla | `Meine Lieblingsfarbe ist blau.` eklendi | Küçük harfli yazım da doğru. |

## Açık sorulara karar
- **Germanistik:** `Alman dili ve edebiyatı` kaldı. Türkiye'de bölümün yerleşik adı budur.
- **Harald'ın şaka cümlesi (klip-03 tur 6):** `Almanya'nın medeni kısmında, yani Güney Almanya'da` kaldı. Şaka Türkçede de anlaşılıyor.
- **Klip-04 tur 6 rakamlar:** `24` ve `25` rakamla kaldı. Kaynak yazı ve ayrıntı seçenekleri de rakamla. Harfle yazım yalnızca gerçek basamağında isteniyor.
- **Klip-04 tur 16:** **so** için `çok` kaldı. `Öyle … ki` daha yakın olurdu, fark küçük.

## Dikte denetimi
- Zor ve usta: 12 maddenin 12'sinde `accepted[0]` kaynak turla birebir aynı.
- Orta: 7 maddenin 7'sinde boşluk doldurulunca tur birebir çıkıyor, cevap tek kelime.
- Zor bankaları: 7'sinde de cümlenin bütün kelimeleri ve tam 2 çeldirici var.
- Yeni 5 basamak (gün 1 zor ve usta, gün 2 usta, gün 5 zor, gün 6 usta): bilinen kelime listesi ve o günün ön öğretimi dışında kelime yok.

## Kalan şüpheler
- Orta basamakta sonu noktalı yazımlar (`Woher.`, `alt.`) üçüncü yazım olarak duruyor. Zararsız ama anlamsız. Oynatıcı noktalamayı zaten atıyorsa silinebilir.
- Oynatıcının büyük/küçük harfi nasıl karşılaştırdığına bakılmadı. Harf ayrımı yapmıyorsa **Ihre** ve **Sie** düzeltmesi içerikte etkisiz kalır, kod tarafında çözülmesi gerekir.
- Klip-03 notu **Wie heißt du?** sorusunu öğretilmemiş sayıyor, oysa klip-01 ön öğretiminde var. Bilinen kelime listeleri önceki kliplerin ön öğretimini içermiyor. Sonuç güvenli tarafta, ama usta basamağı bu yüzden eksik.
- Değişen 5 çeviri okurdan geçmedi. Yollar alan listesine eklendi.

## Sonuç
İçerik hataları KAPANDI. Doğrulayıcı 0 hata. `review` alanlarına dokunulmadı: klip-01, 03, 05, 06 süre ve sınır kararı için PM'i bekliyor.
Hata oranı: 9/84 (5 çeviri, 2 anlam kaydıran yazım, 2 liste genişletme).
