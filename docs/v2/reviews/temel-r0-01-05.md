# Dilbilimci incelemesi: R0 temel paket, dersler 01–05

Tarih: 18.11.2026 · İnceleyen: dilbilimci-ajan · Dosyalar: `content/v2/temel/r0-01-tage.json` … `r0-05-uhrzeit.json`, `content/v2/temel/SOURCES.md`

Madde tanımı: öğretim öğesi + alıştırma + yerleştirme maddesi + diyalog satırı + dinleme parçası.

## Özet

| Ders | İncelenen madde | İçerik hatası | accepted eksiği (madde) | Toplam düzeltme |
|---|---|---|---|---|
| 01 günler | 73 | 2 | 11 | 13 |
| 02 aylar | 73 | 2 | 12 | 14 |
| 03 sayılar 0–20 | 74 | 3 | 14 | 17 |
| 04 sayılar 21–100 | 72 | 3 | 13 | 16 |
| 05 saat | 86 | 5 | 16 | 21 |
| **Toplam** | **378** | **15** | **66** | **81** |

Hata oranı: 81/378 = 0,21 (accepted eksikleri dahil). Yalnızca içerik hatası: 15/378 = 0,04.
Yanlış `accepted` varyantı, sabit öğrenci adı ya da cinsiyeti, yanıltıcı `parcalar`, İngilizce köprü, Bairisch, kurs ya da kitap adı bulunmadı. OD-9 denetimi (`explain.ts` kuralları) ve `Drill` şeması: 0 bulgu. `npm run content:validate`: 0 hata.

## İçerik hataları (önce → sonra)

| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 1 | 01 `b:geht-nicht` ipucu | **nicht** cümlenin sonuna gelir. | Bu kalıpta **nicht** sona gelir. | Genel kural gibi okunuyordu; **Das ist nicht gut** gibi cümlelerde yanlış. |
| 2 | 01 `h1` kuaför kaydı | Heute ist Montag, und der Salon ist zu. … Bis morgen! + soru: kayıt hangi gün dinleniyor | Montag ist der Salon zu. … Vielen Dank und bis bald! + soru: salon hangi gün kapalı | Telesekreter bugünün gününü söylemez; gerçeklik testi. Yeni cümle `am`siz kalıpla uyumlu. |
| 3 | 02 diyalog çeviri | O zaman Herr Wimmer zaten yok. | O sırada Herr Wimmer zaten yok. | **Da** burada zaman bildirir; iki satır sonra **Dann** de o zaman diye çevriliyor, karışıyordu. |
| 4 | 02 `h2` çeviri | Mayısta Mayıs ağacı gelir. | Mayısta Mayıs ağacı dikilir. | Türkçe doğallık. |
| 5 | 03 `d04` soru | Ekranda **Nummer siebzehn** yazıyor. | Bekleme salonunda **Nummer siebzehn** diye çağırıyorlar. | Ekranda sayı rakamla görünür; yazıyla duyulur. |
| 6 | 03 diyalog, öğrenci | ich bin {Herr\|Frau} {name} | mein Name ist {name} | Almancada insan kendi adına **Herr/Frau** eklemez; hitap yalnızca karşı taraf içindir. Cinsiyet yuvası gereksizleşti. |
| 7 | 03 diyalog çeviri | Bodrumunuz on dört numara. | Bodrum bölmeniz on dört numara. | **Keller** burada daireye ait bölme. |
| 8 | 04 `d01` açıklama | **zehn** ile biten sayı on üstüdür, **zig** ile biten onluktur. | **vierzehn** on dört eder, **zig** ile biten **vierzig** kırk eder. | on üstüdür anlaşılmıyor; OD-9 örnekle göster. |
| 9 | 04 diyalog, öğrenci | Was kostet das Studio? | Was kostet das hier? | İlk biçim salonu satın alma fiyatı gibi; doğal soru bu. Çeviri: Burası ne kadar? |
| 10 | 04 `h2` | Die Plätzchen sind sechzehn Euro. | Die Plätzchen kosten sechzehn Euro. | Öğretilen kalıp **kosten**; **sind** burada özensiz. |
| 11 | 05 diyalog, öğrenci | hier ist {Herr\|Frau} {name} | hier ist {name} | 6 ile aynı gerekçe. |
| 12 | 05 diyalog (2 satır) | Donnerstag Nachmittag | Donnerstagnachmittag | Yazım: gün adı + günün bölümü bitişik (Duden). |
| 13 | 05 `h1` | Freitag Nachmittag ist die Praxis zu. | Freitagnachmittag ist die Praxis zu. | 12 ile aynı. |
| 14 | 05 `a:um-wie-viel` anlam | Bu saat kaçta olacak? | Bir şeyin saat kaçta olduğunu sorar. | Türkçe cümle bozuktu. |
| 15 | 05 `b:viertel-vor` ipucu | Bu bölgede **drei viertel zehn** de duyabilirsin | Güneyde **drei viertel zehn** de duyabilirsin | Kaynak belirli bir ilçeyi değil güney ve doğuyu söylüyor. |

## accepted eksikleri (haksız ret riski)

Hepsi ekleme; hiçbir varyant silinmedi. Değerlendirici kesme işaretini atıyor, bu yüzden **Geht es** ile **Geht's** ayrı varyanttır.

- **01** (11 madde: d20, d21, d23, d26, d27, d28, d29, d30, d32, p03, p04): **Geht's Freitag?**, **Geht es am Freitag?**, **Passt der Freitag?**; **Am Mittwoch geht's nicht.**; **Was für ein Tag ist heute?**, **Welcher Wochentag ist heute?**; **Es ist Donnerstag.**; **… geht leider nicht.**; **Ja, das geht.**, **Ja, das passt.**
- **02** (12 madde: d20, d21, d22, d23, d25, d26, d30, d31, d33, d34, p02, p04): **Geht's Ende Januar?**, **Passt es Ende Januar?**; **Anfang März geht's.**; **Im April geht's nicht.**; **Jetzt haben wir Dezember.**; **Im Juli ist es Sommer.**
- **03** (14 madde: d15–d19, d24–d27, d30, d32, d33, p01, p03): **Die Nummer ist siebzehn.** (Türkçe cümlenin en düz çevirisi eksikti); d24 ve d25'te **Meine Telefonnummer ist …** ve **Die Nummer ist …** (d22 kabul ediyor, d24 etmiyordu); **Die Nummer fünfzehn.**; **Drei Brezen.**, **Drei Brezeln, bitte.**
- **04** (13 madde: d16–d20, d23, d24, d28, d29, d35, d39, p01, p03): **Die Nummer ist …**; **Wie viel macht das?**, **Wie teuer ist das?**; **Was kostet sie?**; **Das sind hundert Euro.**
- **05** (16 madde: d22, d23, d26, d27, d30, d32, d33, d35, d38, d40, d41, d43, d44, d45, p02, p04): **dreiviertel** bitişik yazımı (konuşma tanıma böyle yazabilir); **fünfundzwanzig nach vier**; **Heute Abend um zwanzig Uhr.**; **Geht's heute Nachmittag?**; **Nein, das ist zu früh.**; **Elf Uhr fünfundvierzig.**

## Doğrulanan olgular

- **drei viertel zehn** 9:45 ve **viertel acht** 7:15: Duden "viertel" maddesi ikisini de landschaftlich olarak veriyor, yazım ayrı ve küçük harfle. Sözlük düzeyinde doğrulandı, **kaldırılmadı**. `SOURCES.md` güncellendi. İçerikte yalnızca anlama (ipucu, tablo, d07) ve `accepted` içinde; üretimde istenmiyor.
- **zwo**, kurgusal numaralar (0171 39200 47, 089 99998 214): telefon `SOURCES.md` ile örtüşüyor; diyalog ve dinlemedeki rakam dizileri numaralarla birebir.
- Weihnachtsmarkt, Maibaum, Dult, Brunnengasse 7, Salon Haarwerk, VilsFit, Praxis Dr. Weber ve Frau Huber: `WORLD.md` ile örtüşüyor.
- Saat tablosu (12 satır), kısaltmalar (Mo–So), onluklar tablosu: doğru.

## Yazarın notları

- **Dienstag geht** gibi `am`siz kalıplar: doğru ve gündelik Almanca; 01–05'te tutarlı. `accepted` içinde `am`li biçimler de var, sorun yok.
- **ist/war/bin/habe**: 01–05'te yalnızca sabit kalıp içinde isteniyor (**Heute ist …**, **Gestern war …**, **Ich bin … Jahre alt**, **Ich habe im … Urlaub**). Uygun.
- **Değerlendirici notu (kod değiştirilmedi):** `web/src/core/grading.ts` içindeki `norm` 1–99 arası rakamları yazıya çeviriyor. Öğrenci **17** ya da **0 1 7 1** yazarsa **siebzehn** ve **null eins sieben eins** ile eşleşir. Yani 03–04'te yazılı üretim sayının yazımını (**sechzehn**, **siebzig**, **dreißig**) ölçmüyor; yalnızca sesli üretim ve `gap`/`order` maddeleri ölçüyor. Ayrıca **ß/ss** ve **ü/ue** farkı da yok sayılıyor. 05'te **9:30** yazımı **neun dreißig** olur ve **neun Uhr dreißig** ile eşleşmez.

## Kalan şüpheler (AÇIK)

1. **Öğretilmemiş soru kelimesi yönergede:** **Wann** (02: d28, d29, d32, p03), **Wo** (03: d29, p04), **Welche Jahreszeit** (02: d34), **kommst du** (05: d42) öğrencinin duyduğu soruda geçiyor; soru kelimeleri 07'de. Üretilen cevap yalnızca öğretilmiş öğelerden oluşuyor ve `situation_tr` soruyu açıklıyor, bu yüzden OD-0 anlamında üretim ihlali saymadım. 02 d32'de `situation_tr` soruyu açıklamıyor; en zayıf nokta bu. Karar baş geliştiricide: ya 02'ye **Wann?** tek öğe olarak eklenir (02 şu an 24 öğe, sınırda) ya da bu maddeler 07'den sonraya taşınır.
2. **Diyalogda öğrenci satırında öğretilmemiş kelime:** 02 **gibt es Kuchen**, 04 **Ich nehme zwanzig**, 05 **Ich brauche einen Termin**. Diyalog alıştırma değil ve satırlar bir önceki repliği yankılıyor; dokunmadım. Diyalog ekranı bu satırları üretim olarak isterse sorun olur.
3. **drei viertel** bölge dağılımı: Atlas zur deutschen Alltagssprache haritası doğrudan görülemedi; bölge bilgisi ikincil kaynaktan. Anlam Duden ile kesin.
4. **05 h1 mantık:** açılış saatlerine göre pazartesi ve çarşamba öğleden sonra da kapalı, kayıt yalnızca cuma öğleden sonrayı söylüyor. Yanlış değil, eksik; soruları etkilemiyor.
5. **Doğrulayıcı kapsamı:** `content:validate` `content/v2/temel/` dosyalarını saymıyor (çıktıda temel dersi yok). Bu incelemede şema ve OD-9 ayrı bir betikle denetlendi. Doğrulayıcıya eklenmesi baş geliştiricinin işi.

## Sonuç: AÇIK

Dil hatalarının hepsi düzeltildi. 1 ve 5 numaralı maddeler karar bekliyor. `review`: `{status:"draft", by:"dilbilimci-ajan", at:"2026-11-18"}`.
