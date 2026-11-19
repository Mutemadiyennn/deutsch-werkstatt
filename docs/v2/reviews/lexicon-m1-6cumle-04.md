# lexicon c6-04 — dilbilimci incelemesi (PM-062, 6 cümle)

İncelenen: 38 kart (da, erster, zweiter, dritter, vierter, Datum, Geburtsdatum, wo, wohin, woher, warum, wie, wie_viel, wer, was, heißen, Vorname, Nachname, Adresse, Telefonnummer, brauchen, sein, können, müssen, dürfen, wollen, sollen, möchten, essen, Hausarzt, Fieber, verstehen, wiederholen, sagen, sprechen, warten, arbeiten, müde); 73 yeni örnek, 228 boşluk (eskiler dahil).
Yama: `c6-04.dil.json`, 25 kart, 52 düzeltme. 13 kart değişmeden geçti (erster, dritter, wo, woher, wie_viel, heißen, Nachname, brauchen, sein, sollen, Fieber, arbeiten, müde).
Doğrulayıcı çalıştırılmadı: sözlüğe dokunulmadı, yama baş geliştiricide.

## Düzeltmeler
- **Almanca (4):**
  - vierter ö6 `Am vierten, am Samstag` → `Am Vierten` (ay adı yokken büyük harf; kartın kendi boşluğu da böyle).
  - wohin ö6, dürfen ö6 `Brötchen` → `Semmeln` (Bavyera; `lx:Semmel` A1 kartı var, `Brötchen` sözlükte yok).
  - was ö5 `vom Markt` çevirisi `Marketten` idi (Markt pazar yeridir, `pazar` çift okunur) → `vom Supermarkt`.
- **Düzey (5 cümle değişti):** Geburtsdatum ö5 `prüft` → `Das Geburtsdatum steht auch im Pass.`; wollen ö5 `trainieren` → `Sport machen`; verstehen ö6 `Nur die Hälfte!` → `Nicht alles!`; warten ö5 `Handwerker` → `auf das Taxi` (fotoğraf sorgusu uyuyor); wiederholen ö6 `Bus drei, dann links` (doğal değil) → `erst links, dann rechts`.
- **Boşluk cevabı tek değil (19):**
  - also_ok: da b1, b3 `hier` (b5, b6 ile tutarlı), da b4 `Dort`; warum b1–b3 `Wieso` (b4–b6 ile tutarlı); können b2 `Könntest`; sagen b6 `Geben` (Bescheid geben); sprechen b1, b3, b4, b6 `red-` biçimleri.
  - wie b4 `___ bitte?` → `___ bitte? Ich habe Sie nicht verstanden.` (**Sie** bağlamı kibar biçimi sabitliyor; `Was` also_ok yapılmadı, kartın hata notuyla çelişirdi).
  - dürfen b2–b5: çeviri `-emez` hem **darf** hem **kann** okunuyordu → `yasak` / `izin vardı`.
  - wollen b5, b6: also_ok `möchten`/`Möchtet` çıkarıldı (aşağıya bak).
- **Hal değişimi ipucu (7):** Datum b5, Geburtsdatum b5, Adresse b5, b6, Telefonnummer b5, b6, Hausarzt b6: `Bildiğimiz X: …` → `**mit** dedikten sonra **das Datum**, **dem Datum** olur.` kalıbı.
- **Ad karışıklığı (3):** sprechen b5 ve `exp.ipucu_tr` `Frau Weber` → `Frau Schneider`; da eşdizimi `Ist Herr Weber da?` → `Ist Frau Becker da?` (kartın ö1 ve b1 cümlesiyle aynı).
- **Türkçe (14):** telefon için aramak (vierter ö3, sagen ö4); da ö6 `schon da` → geldi mi; zweiter b5 (`zaten` → `oldu bile`), zweiter b4 ipucu (iki günde bir = her ikinci gün); vierter ö6 cumartesi günü; Vorname b5 öznesiz → **Adam**; müssen ö6 Kimliğimi; essen ö5 kantin → yemekhane (`lx:Kantine` ile aynı); Kuchen pasta → kek (möchten ö6, wer ö3; c6-03 kararıyla aynı); möchten eşdizimi `istiyorum lütfen` → `istiyorum`; sagen b5 ve eşdizimi `Almanca nasıl denir` → `Almancada nasıl söylenir` (`lx:wie` ö2 ile aynı); wollen b5 ipucu.

## Yazar notlarına yanıt
- **Kantine, Witz, verbinden, Fest:** sözlükte A2 kartları var, bırakıldı. **Handwerker** sözlükte yok, değiştirildi.
- **erster `___ Stock, gleich links.`:** doğal (resepsiyonda kısa yol tarifi), bırakıldı.
- **wollen also_ok möchten:** çıkarıldı. İki kartın `tr` alanı aynı (`istemek`), fark yalnızca açık/kibar; kartın hata notu da bu ayrımı öğretiyor. Aynı gerekçeyle sollen boşluklarına `muss`, dürfen b1'e `Kann` eklenmedi.
- **zweiter `jeden ___ Tag`:** `#2` kartı yok, kartın kendi eşdizimi; bırakıldı, ipucu sıra anlamına bağlandı.
- **wie `___ bitte?`:** cümle uzatıldı (yukarıda).
- **aramak:** iki eski örnek düzeltildi.
- **Frau Weber:** değişti.
- **möchten eşdizimi:** düzeltildi.

## Açık noktalar
- wollen b5, b6 ve möchten b5, b6: karşı kartın fiili de dilbilgisi olarak girer; değerlendirici onu yanlış sayacak. Karar PM'de: ya iki yönde also_ok, ya da şimdiki ayrım.
- dürfen b1 `___ ich reinkommen?`: `Kann` da söylenir; çeviri ayıramıyor, dokunulmadı.
- was b4 `___ heißt das?`: `Wie` de girer ama anlam değişir (adı ne); çeviri `Bu ne demek?` ayırıyor.
- woher hata notu `Türkiye'denim derken …` (eski, okurdan geçti): ich + ülke; madde 6 açısından baş geliştirici baksın.
- heißen ö3 `Onun adı ne?` ve woher ö2 `Onu nereden tanıyorsun?` (eski): özne değil, bırakıldı.
- Hausarzt b3, b6 (`Ich suche einen Hausarzt`, `bei einem neuen Hausarzt`): dünyada öğrencinin hekimi Dr. Weber; eski boşluklar, bırakıldı.
- Telefonnummer b6 çevirisi `telefon numarasıyla telefon ediyorum` hantal (eski, okurdan geçti).
- `layer`: erster ö6, wohin ö6 gibi birkaç `alltag` cümle nötr standart Almanca; yanlış değil.

Sonuç: KAPANDI (yama uygulanınca). Hata oranı 52/38 kart; yeni cümlelerde 1 yazım, 1 anlam (Markt), 2 bölgesel kelime hatası; 9 yeni örneğin Almancası değişti.
