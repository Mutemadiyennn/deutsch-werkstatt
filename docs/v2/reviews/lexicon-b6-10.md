# Sözlük B6, grup 10: dilbilimci incelemesi

Tarih: 2026-11-19. İnceleyen: dilbilimci-ajan. Yama: `b6-10.dil.json`. Lint çalıştırılmadı (baş geliştirici çalıştırır).

## İncelenen kimlikler (75)
vorsichtig, weh, Klasse, beeilen, weiß, teilen, Handy, Nähe, kalt, Tier, Boden, Information, Mund, Schluss, Meinung, Hotel, Geschäft, Verzeihung, unmöglich, interessant, vorher, Punkt, wunderschön, Tisch, hinten, riechen, Markt, traurig, deutsch, plötzlich, Leben, zählen, mitnehmen, kennenlernen, unterwegs, Tasche, packen, verheiratet, Fenster, kochen, zurückkommen, Polizist, Augenblick, Verbindung, Zug, verpassen, Bier, Finger, Hochzeit, wach, nun, wohl, davon, dafür, dabei, nennen, einzig, verschwinden, darüber, dazu, daran, verlassen, darauf, scheinen, führen, fangen, eigen, darum, sogar, folgen, je, Wagen, überhaupt, erwarten, Art.

## Sonuç
50 kartta düzeltme, 25 kart değişmedi. Durum: AÇIK (aşağıdaki açık noktalar baş geliştiricinin kararını bekliyor).

## Düzeltme türleri
- **Olgusal yanlış hata notu (2):** `Punkt` (**Komm zum Punkt** yanlış denmişti; Almancada yaygın ve doğru), `nun` (**ab nun** yanlış denmişti; Avusturya kullanımında geçerli). İkisi de gerçek bir hatayla değiştirildi.
- **Gerçek olmayan ya da başka kelimeye ait hata notu (4):** `teilen` (mitteilen notu → **mit dich / mit dir**), `führen` (**Das bringt zu nichts** → **Ich führe dich nach Hause / bringe**), `eigen` (eigentlich notu → **eine** eksikliği), `wohl` (açıklama cümlesi).
- **Hata notunda eksik gerekçe ya da niyet (7):** Tier, packen, davon, dafür, dabei, daran, traurig.
- **Kelime içi boşluk kaldırıldı (5 kart, 9 form):** wunderschön, darüber, daran, darauf, darum. Ayrıntı aşağıda.
- **Form cümlesi ya da çevirisi (9):** teilen (**mit ihrer Schwester**), kennenlernen (**bei der Arbeit**), Verzeihung (boşluk kartın kelimesine alındı), führen (götürmek anlamı için **Der Weg führt zum See**), Punkt, Mund, unterwegs, Verbindung, Zug.
- **İpucu (3):** Handy, Tier, verlassen.
- **Aynı Almancaya farklı Türkçe (örnek ya da kalıp, 22 kart):** vorsichtig, Klasse, Nähe, kalt, Tier, Boden, Information, Tisch, Markt, kennenlernen, unterwegs, zurückkommen, Verbindung, Zug, dafür, verlassen, scheinen, führen, darum, sogar, Art, einzig.
- **`exp` (14):** ipucu kartın `tr` anlamını aşıyordu (unmöglich, sogar); kalın Almanca ifadenin Türkçesi yoktu (riechen, verheiratet, zurückkommen, Verbindung, führen, folgen, Art); ek yazan parça çipleri boşaltıldı (davon, dazu, daran); özel ad eki (deutsch: Almanya'ya); çelişen niteleme (Bier); iki fikirli anlam (dabei).
- **`tr` (6):** Geschäft (ticaret açıklamada yoktu), traurig (üzücü eklendi), nun (peki çıkarıldı), dafür (lehinde → bundan yana), dabei (dahil çıkarıldı), führen (noktalı virgül → virgül).
- **Kalıp listesi (9):** Boden, Schluss (birinden ayrılmak), Meinung, Leben (**So ist das Leben.**), mitnehmen, unterwegs, verheiratet (geschieden çıkarıldı), wohl (**Leben Sie wohl!** çıkarıldı), sogar.
- **Çift okunan söz:** Markt kartında `pazar yerine gidiyorum` iki türlü okunuyordu; bütün cümleler `semt pazarı` ile yazıldı.
- Fotoğraf sorgularında yanıltıcı olan bulunmadı.

## Lex kararları
- **Kelime içi boşluk (`dar___` → `auf`, `wunder___` → `schön`): onaylanmadı.** Öğrenci `auf` mu `darauf` mu yazacağını bilemez; aynı gruptaki davon, dafür, dabei, dazu ve bütün sıfat kartları tam kelime boşluğu kullanıyor. Dokuz form tam kelime boşluğuyla yeniden yazıldı; hangi kelimenin geleceğini ipucu söylüyor.
- **`nun` ve `überhaupt` forms'suz: onaylandı.** Her boşluğa **jetzt** ya da **gar** aynı doğrulukla girer; tek doğru cevaplı form kurulamıyor.
- **`tr` değişiklikleri:** Markt, packen, Punkt, verlassen, zählen onaylandı. `dabei` onaylanmadı: `dahil` açıklamada ve örneklerde karşılık bulmuyor, `yanında, orada` yapıldı.

## Açık noktalar
1. Yamadaki `ex` girdileri yalnızca `de` ve `tr` taşıyor; uygulayıcı `layer`, `dialog`, `img` alanlarını koruyarak birleştirmeli.
2. `unmöglich` tek hata notuyla kaldı; **immöglich** İngilizce etkisine dayanıyor, Türkçe konuşan için ikinci gerçek hata bulunamadı.
3. `darum` için `tr` içindeki `onunla` tek başına anlaşılmıyor (yalnız **sich darum kümmern** içinde); lex'e bırakıldı.
4. `Tier` (**Haben Sie ___?**), `Meinung` (**Ich bin ___ Meinung.**), `Mund` (**eine Wunde im ___**) formlarında cevap yalnızca Türkçe çeviriyle tekleşiyor.
5. `mitnehmen` örnek 4: **Zum Hieressen** yazımı tartışmalı (konuşmada **zum hier Essen** de yazılır); dokunulmadı.
6. Görev dışı bırakılanlar: fangen örnek 3–4 ve coll, zählen örnek 1, packen örnek 2, mitnehmen örnek 1, weh pos, Polizist örnek 2, darauf örnek 4.
