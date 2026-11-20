# 52 haftalık omurga: teknik notlar

Dilbilimci ve baş geliştirici için. Kısa okuma notu: `taslak.md`.
Kaynak: PM-078 D (omurga işi), PM-079 md. 9 (yalnız plan). Durum: taslak.

## Dosyalar

- `content/v2/curriculum/omurga.json`: plan. Elle değiştirilmez.
- `docs/v2/reviews/omurga/uret.py`: üretici. JSON'u ve iki nottaki üretilen bölümleri (ay ay plan, gün başlıkları) yazar.
- `docs/v2/reviews/omurga/denetim.py`: denetim. 0 hata şart.
- Çalıştırma sırası: önce `python3 docs/v2/reviews/omurga/uret.py <depo_kökü>`, sonra `python3 docs/v2/reviews/omurga/denetim.py`.

## Alanlar

Öğrenciye gösterilebilir alanlar (OD-9.2): tek cümle, en çok 14 kelime, noktalı virgül, üç nokta, tırnak ve iç söz yok.

| Alan | Ne |
|---|---|
| `yapabiliyorum_tr` | Haftanın hedefi, öğrencinin ağzından |
| `gorev_tr` | Dışarıda her hafta yapılabilir küçük iş |
| `kapi_tr` | Konuşma sınavı, "yaparsın" biçiminde |
| `kulak_kapi_tr` | Dinleme sınavı, aynı biçimde |
| `durum.tr`, `kol_mekan.tr` | Haftanın durumları ve açılan kollar |
| `gunler[].title_tr` | Gün başlığı: tek konu, terim yok |

Teknik alan `kapi_ek` öğrenciye gösterilmez:
- `durumlar`: seviye sınavının üç yeni durumu (8, 24, 52. hafta).
- `kayit_karsilastirma`: kendi kaydını eski kaydıyla karşılaştırma (6, 24, 52. hafta; #56 madde 9 ve 24).
- `surpriz`: rol oyununda beklenmedik gelişme (9, 10, 11, 13, 14, 28, 29, 37, 46. hafta).
- `kaynak` ve `not`: hafta 1 sınav dosyası (`m1/hafta-sonu-testi.json`), birim içindeki ek işler, akıcılık 4/3/2, Bairisch kaynak kuralı.

Denetimin yeni kuralları (okur 1. tur):
- her haftada `kulak_kapi_tr` var;
- `kapi_tr` ve `kulak_kapi_tr` tek cümle, en çok 14 kelime, "-sın/-sin/-sun/-sün" ile biter;
- görünen alanlarda noktalı virgül, üç nokta, tırnak, `.json`, `M1–M4` ve iç sözler (kapı, Kulak:, sahne, sürpriz, kademe, kesit, kaynaklı, prova, 4/3/2) yok;
- gün başlıklarında eğik çizgi yok;
- seviye sınavında `kapi_tr` "üç yeni durum" der ve `kapi_ek.durumlar` üç öğedir.

## Kelime ve K1 çekirdeği

- Haftalık planlanan yeni kart: A1 60–115, A2 45 (17. hafta 30), B1 40. Üst sınır 175 aşılmıyor.
- Sayılar yalnız sözlük kartıdır. Birimlerin kalıp ve ifadeleri (birim başına 8–12) ayrıca gelir.
- K1 çekirdeği 1249 kart. M1'de 154 kart, takvim kolunda 11 kart (`takvim_kolu_kartlari`).
- B1 dışı K1 kartları 21. haftada biter. `siklik-B1` 25. haftada başlar. K1 32. haftada biter.
- 17. haftadan sonra A2 birimleri için K1 dışı kart gerekir: 25 + 37 + 45 + 39 + 34 + 45 + 45 + 15 = 285 kart (lex işi). B1'de haftada 20–40 kart daha.
- Goethe başvuru sayıları ve adresleri: `dilbilimci.md` bölüm 3.

## PM kararlarının yeri

- **Küçük sözcükler** (PM 7043400862, karar 3): da, leider, wann, Uhr ve Termin zaten m1.json'da (2. ve 5. gün). Kalan yedisi (noch, schon, nur, gern, oft, sehr, dann) tıkama sırasıyla 8. günün başında. Ardından listede olmayan en çok tıkayan 13 küçük sözcük: lange, erst, viel, gleich, echt, Zeit, gut, klar, kurz, immer, jetzt, mehr, ganz.
- **Euro ve Cent:** kartları yok (lex işi). Şimdilik 8. günde.
- **4.–7. gün seçeneği** (PM sorusu 2): boş yuvalar 3 + 4 + 5 + 8 = 20. Yerleşim: 4. gün Euro, Cent, noch. 5. gün schon, nur, gern, dann. 6. gün oft, sehr, lange, erst, viel. 7. gün gleich, echt, Zeit, gut, klar, kurz, immer, jetzt. 8. günde yalnız mehr ve ganz kalır.
- **am + gün** (PM 7046461200): kalıp 2. gün halkasında. Kuralı 18. günde (`gr:a1-05:t3`).
- **Alles Gute zum Geburtstag** (karar 2): 2. gün halkasında kalıp. Tebrikler 33. günde (`gr:a1-14:t5`).
- **Konuşma kısaltmaları** (LS-8.3): mikro ders 1 13. günde (hab, komm, geh, geht's, 'n), sein ve haben (7. gün) ve fiil sonlarından (9. gün) sonra. Mikro ders 2 17. haftada.
- **#56'nın dört eksiği 6. haftada açılır:** sesli kurma 37. gün, kaydet ve yan yana dinle 38. gün, kelime ailesi 40. gün, yeniden anlatma 41. gün. Sonra kollarda sürer: kelime ailesi 14., 22. ve 40. hafta; yeniden anlatma sınavlarda; sesli kurma araba modunda.

## #56 kapsamı

Her hafta: 1 dinleme, 3 ifade olarak kelime, 4 aralıklı tekrar, 11 videoya sesli cevap, 12 geri bildirim, 14 dışarıda görev, 25 gerçek insanlar.

| Madde | Konu | Haftalar |
|---|---|---|
| 2 | gerçek hız, Bairisch | 2, 17, 32 |
| 5 | resim ve sesle anlam | 1–8 |
| 6 | sesli kurma | 6 |
| 7 | biçimlerin oturması | 2, 4, 5, 12, 18 |
| 8 | kelime ailesi | 6, 14, 22, 40 |
| 9 | telaffuz, kaydet ve dinle | 6, 24, 28 |
| 10 | zaman baskısı, gelen arama | 3, 9, 16, 20, 29, 33, 39, 42, 46, 50 |
| 13 | altı aşamalı senaryo | A2 ve B1 içerik haftaları |
| 15 | iletişim stratejileri | 3, 17, 23, 50 |
| 16 | akıcılık, yeniden anlatma | 6, 15, 23, 25, 36, 41, 47 |
| 17 | okuma | 4, 10, 19, 21, 26, 31, 40, 48, 51 |
| 18 | yazma | 19, 22, 31, 33, 34, 44, 48, 51 |
| 19 | yol ve seviye kontrolü | 1, 8, 24, 51, 52 |
| 20 | alışkanlık ve hikâye | 1, 6, 41 ve takvim kolu |
| 21 | kültür, du ve Sie | 2, 5, 9, 25, 30, 32, 43 |
| 22 | kişiye özel | 7, 15, 35 |
| 23 | araba modu | 6 |
| 24 | ilerlemeyi görmek | 1, 8, 24, 52 |

## Kulak, video ve Bairisch

- 1. hafta: 7 hazır klip (`m1:01:rv1` ile `m1:07:rv1` arası).
- 2.–24. hafta: `video_kaynak: "aranacak"`. Aday Deutsch im Blick bölümleri. Amt, posta ve telefon menüsü orada yok; aday DW Nicos Weg (yalnız bağlantı, C) ya da kendi seslendirmemiz.
- B1: "aranacak". Adaylar Easy German ve DW (yalnız bağlantı, C), YouTube CC (video başına lisans kaydı).
- Bairisch yalnız kaynaklı: 1. hafta Grüß Gott; 17. hafta WORLD §5'teki sözler; 32. hafta Wikitongues (A) ve BR (yalnız bağlantı); seviye sınavlarında kaynaklı kayıt. MaiBaam yalnız yazılıdır.
- Açık konular (A2, A3): `dilbilimci.md` bölüm 7.

## Dil noktası sırası (dilbilimci 20.11)

- Akkusativ 12. güne, sein ile Perfekt 38. güne alındı.
- A2: `gr:a2-07` (Dativ edatları) sağlık haftası için 12. haftaya, `a2-04`'ün önüne alındı. `a2-12` (dolaylı soru) `a2-11`'in önünde.
- B1 birim sırası: b1-02, 03, 04, 07, 10, 05, 06, 09, 01, 08, 12, 11, 13, 14. İlgi cümlesi ve fikir bildirme önce. Plusquamperfekt (b1-01) 41. haftada; KUTUPHANE KT-4.1 bunu B2'ye koyuyor (PM'e bildirildi).
- Her birim çiftinde iletişim konusu kendi senaryosunun haftasında (D3).
- `a2.json` kulak-3 `gr:relativ-basit` istiyor; 23. haftada `dn:relativ-basit` iki kalıpla kullanılır, kural 25.–26. haftada.
- `grammar.json`'daki 10 A1 konusu r0 derslerinde var (`gramer_r0_karsiligi`); tekrar tanıtılmadı.

## Süre

Haftalık 505–660 dk; sınır 700 dk. Kalan pay planlayıcının yedeği. Ayrıntı her haftada `sure_dk`. Yük önerileri: `dilbilimci.md` bölüm 6.

## Gün başlıkları (1–56)

1.–7. gün m1.json'dan aynen. Dersler `gunler[].dersler` alanında.

<!-- gunler:başla -->
| Gün | Başlık |
|---|---|
| 1 | Merhaba ve günler |
| 2 | Aylar ve mevsimler |
| 3 | Sayılar ve numaram |
| 4 | Fiyat ve yaş |
| 5 | Saat |
| 6 | Tarih ve sorular |
| 7 | Kendimi anlatıyorum, randevu istiyorum |
| 8 | Sık duyulan küçük sözcükler: noch, schon, nur |
| 9 | Ben ve sen derken: ich wohne, du wohnst |
| 10 | Bir, hiç: ein, kein |
| 11 | İki tane istemek: Ich möchte zwei Brötchen |
| 12 | Kibarca istemek: Ich hätte gern einen Kaffee |
| 13 | Benim ve senin: mein, dein |
| 14 | Haftanın sınavı: fırında alışveriş |
| 15 | Evet ya da hayır soruları: Haben Sie Zeit? |
| 16 | Telefonda kendini tanıtmak |
| 17 | Kibar rica: Könnten Sie das wiederholen? |
| 18 | Ne zaman? um, am, im |
| 19 | Sen ve o derken değişen harf: du sprichst, er fährt |
| 20 | Ayın kaçında? am ersten Mai |
| 21 | Haftanın sınavı: muayenehaneyi aramak |
| 22 | Evdeki eşyalar: der Tisch, die Tür, das Bett |
| 23 | Eşyayı tarif etmek: Er ist groß und weiß |
| 24 | Çok, fazla, değil: sehr, zu, nicht |
| 25 | Hangisi? Daha ucuz |
| 26 | Ev ilanında en ucuzunu bulmak |
| 27 | Nerede? in, an, auf, neben |
| 28 | Haftanın sınavı: merdivende komşuyla |
| 29 | Sabah kalkmak: Ich stehe um sieben auf |
| 30 | Cümleye zamanla başlamak: Am Montag arbeite ich |
| 31 | Meslek sormak: Was sind Sie von Beruf? |
| 32 | Sevdiğini söylemek: gern, lieber |
| 33 | Doğum gününe davet etmek |
| 34 | Yol tarif etmek: die zweite Straße links |
| 35 | Haftanın sınavı: molada sohbet |
| 36 | Dün ne yaptığını söylemek: Ich habe gekocht |
| 37 | Kelimeyi geçmişe çevirmek: kaufen, gekauft |
| 38 | Gitmek ve gelmek geçmişte: Ich bin gegangen |
| 39 | Eskiden nasıldı: Ich war, ich hatte |
| 40 | İki kelimeden bir kelime: Hausarzt |
| 41 | Dinlediğini kendi sözlerinle anlatmak |
| 42 | Haftanın sınavı: hafta sonunu anlatmak |
| 43 | Başım ağrıyor |
| 44 | Gerek yok mu, yasak mı: nicht müssen, nicht dürfen |
| 45 | Doktorun talimatı: Nehmen Sie die Tabletten |
| 46 | Form doldurmak: Vorname, Geburtsdatum |
| 47 | Beğendiğini söylemek: Das gefällt mir |
| 48 | Bir arkadaşa öğüt vermek: Trink viel Wasser! |
| 49 | Haftanın sınavı: doktorda muayene |
| 50 | Pekiştirme: telefon ve randevu |
| 51 | Pekiştirme: alışveriş ve fiyat |
| 52 | Pekiştirme: mahallede konuşmak |
| 53 | Pekiştirme: dün ve hafta sonu |
| 54 | Pekiştirme: doktor ve eczane |
| 55 | A1 sınavı: duyduğunu ve okuduğunu anlamak |
| 56 | A1 sınavı: üç yeni durumda konuşmak |
<!-- gunler:bitti -->

## Denetim sonucu

`python3 docs/v2/reviews/omurga/denetim.py` (20.11, okur 1. tur düzeltmesinden sonra):
- haftalar 52, günler 56, dil noktası 220 (önerilen 17)
- A2 birimi 32/32, B1 birim önerisi 32/32
- tahmini_dk en çok 660, en az 505
- #56 kapsamı 25/25 madde
- A1 sonu 695 / 650 (+7%), A2 sonu 1370 / 1300 (+5%), B1 sonu 2425 / 2400 (+1%)
- sonuç: 0 hata, 0 uyarı

Eski JSON'la denendi. Yeni kurallar 404 hata buldu:
- `kulak_kapi_tr` yok: 156 (52 hafta × 3 kural);
- `kapi_tr`: 100 iç söz ya da işaret, 52 tek cümle değil, 20 uzun satır;
- gün başlığı: 26;
- `durum.tr` ve `kol_mekan.tr`: 44;
- seviye sınavı: 6.
