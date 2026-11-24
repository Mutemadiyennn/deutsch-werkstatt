# 7. gün halkaları: dilbilimci incelemesi (PM-078 B; M1 kapısı)

Dosya: `docs/v2/reviews/halka/gun-07-halkalar.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan bağımsız, son metin bir kez, PM-080)

İncelenen: **59 madde** (34 görev cümlesi ve kabul listeleri, 14 sahne satırı, 4 soru, 7 kalıp).
Denetim (düzeltmelerden sonra; 6. günün son hâli bilinen sayılarak): `halka_kontrol.py` → **0 hata, 0 not**; `kucuk_sozcuk.py` → **0 hata**. Yeni sözcük eklenmedi; kalıplar değişmedi.

## Bulgular ve düzeltmeler

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h2 `lx:warten` 2. cümle, kabul listesi | **Yanlış Almanca:** **halb neun Uhr** denmez; **Uhr** yalnız tam saatte ve „acht Uhr dreißig“ biçiminde (5. günün kuralı, günün provası da böyle açıklıyor). | „Sie müssen bis halb neun Uhr warten.“ → „Sie müssen bis acht Uhr dreißig warten.“ |
| 2 | h4 `lx:sollen` 1. cümle (de, tr, kabul) | Yazım: „yine gelmek“ tek sözcük, **wiederkommen** (deponun ders metni de böyle: „Wann soll ich wiederkommen?“). Betik bu biçimi tanımıyor; gösterilen cümlede yanlış yazım öğretmemek için **wieder** çıkarıldı. `wieder` aynı halkada doğru yazımla duruyor („… wieder arbeiten“). | „Soll ich am Freitag wieder kommen?“ / „Cuma günü yine geleyim mi?“ → „Soll ich am Freitag kommen?“ / „Cuma günü geleyim mi?“ (kabul: + „Soll ich Freitag kommen?“, „Am Freitag, soll ich kommen?“) |
| 3 | h4 `lx:dürfen` 1. cümle (de, kabul) | Hitap: Almancada doktora unvan tek başına söylenmez; **Herr Dr. Weber** (ya da **Herr Doktor**). Yalın „Dr. Weber“ İngilizce alışkanlığı. Türkçe değişmedi; **Herr**'siz biçim kabul listesinde kaldı. | „Darf ich heute essen, Dr. Weber?“ → „Darf ich heute essen, Herr Dr. Weber?“ (kabul: „Herr Dr. Weber, darf ich heute essen?“, „Darf ich heute essen, Dr. Weber?“, „Kann ich heute essen, Herr Dr. Weber?“, „Kann ich heute essen, Dr. Weber?“) |
| 4 | h3 `lx:verstehen` 2. cümle, kabul listesi | Aynı dosyada **Wie bitte?** = „Efendim?“ (sahne); burada „Anlamıyorum.“ karşılığı olarak kabul ediliyordu: bir Türkçe iki Almancaya gidiyordu. | „Wie bitte? Am dritten oder am vierten?“ → „Ich verstehe das nicht. Am dritten oder am vierten?“ |
| 5 | Kabul listelerinde fazla anlam (3 satır, aynı kök) | Türkçede olmayan sözcük taşıyan öğeler (6. gün bulgu 3 ile aynı tür). | h1 „Ich habe **heute** Fieber, Frau Huber.“ → „Ich habe Fieber.“ · h1 „**Und** was sagt Frau Huber?“ → „Frau Huber sagt was?“ · h2 „Wie oft muss ich **in die Praxis** kommen?“ → „Wie oft muss ich kommen, bitte?“ |

Ağırlık: 1 kabul listesinde yanlış Almanca, 2 yazım (gösterilen cümle), 3 hitap (gösterilen cümle), 4 anlam eşitliği, 5 kabul listesinde fazla anlam.

## Yazarın açık soruları: dil açısından görüş

- **`krank` ve `langsam` (soru 1).** İkisi de 7. güne kart olarak girmeli; M1 kapısı bunlarsız eksik. **Ich bin krank** / **Ich habe Fieber** çifti Türkçe konuşanın tam tuzağı (günün provası „Ich bin Fieber“ yanlışını zaten soruyor); `krank` h1'de `müde` ve `Fieber` ile aynı halkaya oturur. `langsam` telefon korkusunun anahtarı; h3'e (`sprechen` ile) oturur. Dil notu: gerçekte söylenen biçim karşılaştırmalı **langsamer** („Können Sie bitte langsamer sprechen?“, WORLD 3. hafta „Etwas langsamer, bitte“); „Sprechen Sie bitte langsam!“ doğru ama emir gibi sert. Kart ikisini de göstersin, öğrencinin cümlesi **Können Sie bitte langsamer sprechen?** olsun.
- **„einen Termin machen“ (soru 2).** Yeterli, tek şartla: test `machen`siz biçimi de kabul etsin. **Ich möchte einen Termin.** telefonda doğal; **einen Termin machen** gündelik ve çok yaygın; **ausmachen / vereinbaren** daha resmî. Günün sahnesi ve provası `machen`li biçimi öğretiyor, halka sahnesi `machen`siz: ikisi de doğru, çelişki yok.
- **„Was sagt der Arzt?“ (soru 3).** h1 kalıbı karşılıyor; **sagt** = „diyor“ / „söylüyor“ ikisi de doğru.

## Bakılan, sorun bulunmayan noktalar

- **Kip fiilleri:** **Ich muss / kann / möchte / darf / soll**, **Sie müssen / können / möchten**, **Wollen wir …?** doğru; mastar her cümlede sonda. **Ich muss heute zum Arzt.** (**gehen**'siz) tam konuşulan biçim; **gehen**'li biçim kabul listesinde.
- **„istemek“ ayrımı:** **möchten** = „istiyorum / ister misiniz“, **Wollen wir …?** = „…-elim mi?“; „Ich will …“ yok. **Darf ich …?** cümlelerinde **Kann ich …?** kabul ediliyor, doğru.
- **Telefon dili:** **Hier ist {name}.**, **Kann ich bitte Dr. Weber sprechen?** (yanında **mit**'li biçim), **Können Sie das wiederholen?**, **Dann kommen Sie heute bis elf.**, **…, passt das?** aynen duyulur. **Guten Tag, Praxis Dr. Weber!** gerçek bir açılış (WORLD'deki „Praxis Dr. Weber, Huber, …“ sırası daha sık).
- **Tarih ve saat:** 4 Aralık 2026 cuma, 10:15 muayenehanenin cuma saatleri içinde (12'ye kadar); **halb neun** = 8:30, **halb acht** = 19:30, **Viertel nach zehn** = 10:15.
- **Günün dosyasıyla:** Derya'nın sesli mesajı (ateş, „bis Montag“), bekleme hattı („heute bis elf Uhr“), Brunnengasse 7 tutuyor.
- **WORLD:** Wimmer **Sie** der ve Derya'dan „Frau Aksoy“ diye söz eder; Tobi yalnız **Wollen wir …?** ile (du biçimi yok); Huber hızlı konuşur. Yeni olgu yok. Bairisch yok. İngilizce köprü yok.
- **Kimlik:** öğrencinin adı yalnız `{name}` (h1 cümlesi, h2 sahnesi).
- **Sorular:** dördü de tek cevaplı. h1'de Wimmer'in „bis Montag nicht da“ sözü tek başına iki anlamlı olurdu; Derya'nın „Bis Montag!“ı cevabı tekleştiriyor.

## Kalan şüpheler

1. **Betiğin reddettiği doğru varyantlar** (ekleyemedim, **haksız ret riski açık**): **Am Abend bin ich oft müde.** (en doğal sıra; betik `bin`'i yalnız „ich bin“ dizisinde biliyor, 5. gün 1. şüphe ile aynı), **Soll ich am Freitag wiederkommen?**, **Kann ich bitte Herrn Dr. Weber sprechen?** (`Herrn`), **…, Herr Doktor?** (`Doktor`).
2. **Yalın „Dr. Weber“ hitabı depoda başka yerlerde de var** (sözlük örnekleri: „Ist der Fuß gebrochen, Dr. Weber?“, „Danke, Dr. Weber.“). Bu görev dışı; lex **Herr Dr. Weber** / **Herr Doktor** ile düzeltmeli.
3. **„Sind Sie heute da?“ = „Bugün burada mısınız“** (h1): telefonda soran kişi için Türkçede „orada / yerinizde“ beklenir; 5. gün 5. şüphe ile aynı, kalıpla tek karşılık için bırakıldı.
4. **„Wollen wir heute Abend essen?“** (h4): doğru, ama tek başına eksik duyulur; doğalı **essen gehen** (sahnede var) ya da **zusammen essen** (günün sınavında var; `zusammen` küme dışı).
5. **„Ben akşam sık sık yorgun oluyorum.“**: „Ben“ yalnız Almanca sırayı yönlendirmek için; doğal Türkçe „Akşamları sık sık yorgun oluyorum“. 1. şüphe çözülünce düzelir.
6. **„wieder kommen“** hafta sonu testinin kabul listelerinde ayrı yazımla da geçiyor (kabul olarak sorun değil); gösterilen metinlerde yalnız **wiederkommen** olmalı.

## Sonuç

Hata oranı: **5 bulgu / 59 madde ≈ %8,5** (yanlış Almanca 1, yazım 1, hitap 1, anlam eşitliği 1, kabul listesi 1). Hepsi dosyada düzeltildi; iki betik 0 hata.

**KAPANDI** (dil açısından). Açık kalan risk 1. şüphe (betiğin reddettiği varyantlar); `krank` / `langsam` kararı PM/lex'te. Dosyada `review` alanı yok (şema ANA'da). Sıradaki: okur (OD-9).
