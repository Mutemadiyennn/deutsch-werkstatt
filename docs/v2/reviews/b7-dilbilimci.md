# B7 adsız biçimler — dilbilimci incelemesi

Tarih: 2026-11-21 · İnceleyen: dilbilimci-ajan · Yazar raporu: `docs/v2/reviews/b7-adsiz.md`

Kapsam: `content/v2/m1/gun-01…07.json`, `content/v2/temel/r0-01, 04, 05, 07, 09, 10, 11`. İncelenen: 98 `_adsiz` alanı (50 nesne), 17 `accepted_adsiz` listesinin tamamı (betikle), yeniden kurulan 18 nesne tek tek. Adlı alanlara dokunulmadı.

## Betik taraması (bütün `accepted_adsiz` ve `de/tr_adsiz` öğeleri)

Aranan: ad çıkınca kalan virgül (", ."), çift nokta, çift boşluk, noktalamadan önce boşluk, küçük harfle başlayan cümle, iki selam yan yana, kalan `{name}` / `{Herr|Frau}`, liste içi tekrar, `de_adsiz` ≠ listenin ilk öğesi, liste < 3, ve prova düğümlerinde seçenekler arası çakışma (uygulamanın `norm()` kuralıyla: küçük harf, noktalama yok).

Sonuç: bozuk birleşim 0; `{Herr|Frau}` kalıntısı 0; tekrar 0. Gün 7 s11 (300 öğe) = 5 selam (4 + selamsız) × (10 soru + 50 "gelemiyorum + soru" birleşimi), hepsi doğru Almanca. r0-09 d29 ve p05 (49'ar öğe, aynı liste) ve gün 7 c1 (42), n1/2 (28) temiz. Tek çakışma: gün 5 n1 (aşağıda 1).

## Bulgular

| # | ağırlık | yer | önce (adsız) | sonra (adsız) | gerekçe |
|---|---|---|---|---|---|
| 1 | P1 | gun-05 · `prova.dugumler[0].secenekler[0]` (de, tr, accepted) | "Guten Tag. Um wie viel Uhr ist mein Termin?" (10 öğe) | "Guten Tag. Ich habe einen Termin. Um wie viel Uhr ist mein Termin?" / "İyi günler. Bir randevum var. Randevum saat kaçta?" (60 öğe: 5 selam × 3 "Ich habe/hab einen Termin (bei Ihnen)." × 4 soru) | Eski listenin 10 öğesinin tamamı 2. seçeneğin (uygun değil) kabul listesiyle aynı metne düşüyordu; 2. seçenek erişilmezdi ve düğüm "önce kim olduğunu söyle, sonra sor" dersini kaybediyordu. Yeni biçim iki adımı korur (önce durum, sonra soru), yalnız öğretilmiş kelimeler (haben, Termin). Çakışma 0. |
| 2 | P1 | gun-07 · `sahne.bolumler[0].dikte[4].ornek_de` | "Guten Tag. Ich möchte einen Termin machen. Ist heute noch etwas frei?" | "Hier ist Ioana Popescu. Ich möchte einen Termin machen." | **frei** ve **etwas** M1'de öğretilmedi. Yeni örnek sahnenin kendi iki cümlesi (s5/s6 + s7b: Derya'nın Ioana'ya yazdırdığı adımlar); `zorunlu` (ist, einen Termin) karşılanır, görev metni ("adın ve isteğin") ile örtüşür, öğretilmemiş kelime yok. |
| 3 | P1 | r0-10 · `teach[0]`, `drills[16]` (d14) | "Mein Name ist nicht einfach." / "Adım kolay değil." (+ leicht, schwer, schwierig) | "Mein Name ist Ioana Popescu." / "Benim adım Ioana Popescu." (+ Ich heiße/heisse/bin …, … ist mein Name.) | **einfach** (ve leicht/schwer/schwierig) r0-10'a kadar hiçbir derste yok; d14 üretim maddesi öğretilmemiş kelime istiyordu. Kartın notu "Kendini tanıtır" da soru/olumsuz cümleye uymuyordu. |
| 4 | P2 | r0-10 · `teach[1]`, `teach[2]` | "Wie ist Ihr Vorname?" / "Wie ist Ihr Nachname?" | "Mein Vorname ist Ioana." / "Mein Nachname ist Popescu." | Kartın `parcalar` ("Mein Vorname ist" = benim ön adım) ve `anlam_tr` ("…adını söyler") soru biçimiyle çelişiyordu. Üç kart artık tek kişiyle ön ad / soyad ayrımını gösterir. |
| 5 | P2 | r0-10 · `drills[17]` (d15) | "Soyadınız nedir?" → "Wie ist Ihr Nachname?" | "Benim soyadım Popescu." → "Mein Nachname ist Popescu." (+ Familienname, … ist mein Nachname, Mein Name ist …, Ich heiße …) | teach[2] ile aynı çerçeve; "Wie ist Ihr …?" kalıbı bu derste üretim olarak öğretilmiyor (yalnız diyalogda duyulur). |
| 6 | P2 | r0-11 · `drills[17]` (d17) | "Senin adın ne?" → "Wie heißt du?" | "Adım Tobi." → "Ich heiße Tobi." (+ heisse, Mein Name ist, Ich bin) | Maddenin öğrettiği şey **ich → -e**; "Wie heißt du?" aynı derste d02, d06, d14'te zaten üç kez soruluyor (döngüsüzlük). teach[0] ve d05 ile aynı cümle: boşluk → tam üretim. |
| 7 | P3 | r0-11 · `drills[27]` (d26) accepted | 5 öğe | + "Hallo! Ich bin neu.", "Ich bin neu.", "(Hallo Tobi!) Ich bin {der Neue\|die Neue}." | Yaygın doğru cevaplar eksikti (haksız ret riski). |
| 8 | P3 | gun-01 n1/n1b, gun-03 n1, gun-07 n1 selam listeleri | 4'er öğe | + "Grüß Gott, Frau Huber.", "Guten Morgen(, Frau Huber).", "Guten Tag, Frau Huber.", "Hallo, Frau Huber." (dosyaya göre eksik olanlar) | Günler arasında tutarsızdı; sekretere adıyla selam çok yaygın. |
| 9 | P3 | gun-06 c1 accepted | 5 öğe | + "Hier ist meine Karte, bitte.", "Meine Karte, bitte." | Eksik yaygın biçim. |
| 10 | P3 | r0-01 · `drills[34]` accepted | 5 öğe | + "Guten Tag, Frau Huber hier." | Adlı listedeki "{name} hier" biçiminin karşılığı. |

Toplam 10 bulgu: P1 × 3, P2 × 3, P3 × 4. Hepsi dosyada düzeltildi.

Hatasız bulunanlar: hitabın çıktığı bütün satırlar ("Danke, {Herr|Frau} {name}." → "Danke!" vb.), okuma metinleri (cümle sayısı ve `kanit` sıraları korunuyor), yazma örnekleri (gün 2, 4: `zorunlu` + "Hallo ___!" kalıbı), r0-01 teach[10] ("hier ist Frau Huber": muayenehane çalışanı hastayı ararken gerçekten böyle söyler), r0-04, r0-05, r0-07 diyalogları, r0-11 teach[0], d05 ve diyalog, r0-09 diyalog. Türkçeler eşit ve doğal. Bairisch, İngilizce köprü, kişisel bilgi yok.

## Yazarın açık sorularına görüş

1. **Değiştirilemeyen kardeş alanlar** (`geri_bildirim_tr`, `situation_tr`, `why_tr`, `gorev_tr`, `kapanis_tr`): içerikte çözülemez; ANA'ya. Adsız profilde gün 1, 3, 5, 7 provaları yalnız selam verene "adını söyledin" der. Öneri sırası: (a) ad gerektiren maddeden önce uygulama adı sorsun; (b) olmazsa doğrulayıcı, nesnede ad yuvası varsa yuvasız kardeş alana da `_adsiz` izni versin.
2. **Adı soran soruya adsız cevap** (gün 6 c1, r0-07 diyalog, r0-11 d26 ve diyalog): yazarın hamleleri gerçekçi ve öğretilmiş kelimelerle; kabul edildi. Soru cevapsız kalıyor; kalıcı çözüm 1(a).
3. **r0-10 teach[1]/[2]**: soru biçimi reddedildi, kart notlarıyla çelişiyordu (bulgu 4). Dünya karakteriyle örnek cümle kartın bütün alanlarıyla tutarlı.
4. **gun-05 n1**: çakışma giderildi (bulgu 1). Geri bildirim metni hâlâ "adını söyledin" der (soru 1).
5. **gun-07 d5**: çözüldü (bulgu 2), `zorunlu` değişmeden.

## Kalan şüpheler

- r0-10 · `dialogue.lines[1]` "Mein Name ist nicht einfach." bırakıldı. **einfach** öğretilmemiş, ama diyalog yalnız dinlenir ve Türkçe altyazılıdır (üretim yok); sonraki "Können Sie das bitte buchstabieren?" satırına doğal oturan, yalnız öğretilmiş kelimelerle kurulan adsız bir cümle bulunamadı. Öğrencinin kendi satırına sabit ad yazmak D-061'e aykırı olurdu.
- Bulgu 2, 3, 5, 6'da örnek/çeviri cümlesi birinci tekil kişide bir dünya karakterinin adını taşır (Ioana Popescu, Tobi). Bunlar kart ve çeviri alıştırmasıdır, öğrencinin senaryodaki kendi satırı değil; yazarın r0-01 (Frau Huber) ve r0-11 teach[0] (Tobi) tercihiyle aynı çizgi. PM farklı düşünürse tek çıkış 1(a).
- gun-06 c1: **Karte** 4. günde ödeme kartı olarak öğretildi; muayenehanede sigorta kartı için de gündelik dilde yalnızca "Karte" denir, ama bu anlam açıkça öğretilmedi.

## Doğrulama

```
$ npm run content:validate
… → 0 hata, 128 uyarı   (kapsamdaki 14 dosyada B7 uyarısı 0; kalan 3 B7 uyarısı kapsam dışı:
                          arbeit/m1-weihnachtsfeier, telefon/01-arzttermin, registry/patterns.json)
$ npx vitest run content
 Test Files  7 passed (7)   Tests  51 passed (51)
```

Betik taraması düzeltmelerden sonra yeniden koşuldu: 98 alan, bozuk birleşim 0, seçenekler arası çakışma 0.

## Sonuç

İçerik düzeyinde **KAPANDI** (10/10 bulgu düzeltildi). Uygulama/doğrulayıcı tarafında **AÇIK**: yazarın 1. ve 2. sorusu ANA'da.
