# Dikiş, 1. hafta 3.–7. gün: 27 ihlal → 0 (yazar, İÇ-3)

Görev: PM 7087835391 md. 3 ve 7088043877 md. 2. Ölçüt: dikiş denetçisi (`content/tools/dikis-kos.ts`, tablo `a1-kesin.json`) 0 ihlal.
Dinlenen metne (ses `script`, sahne `sahneler`) ve `halkalar`/`yeni_kartlar`'a dokunulmadı. Her öneri denetçiyle ölçüldü (tahmin yok).

İlke numaraları görev metnindeki sıradır: (2) kabulde öğretilmiş biçimi öne al · (3) gölge listesi · (4) dikte maddesi · (5) prova / sınav / resimden seç.

## 27 ihlal: önce → sonra

### 3. gün (`content/v2/m1/gun-03.json`)
| # | Yer | Önce | Sonra | İlke |
|---:|---|---|---|---|
| 1 | ses m1:03:a1/b1 dikte d4 | usta, c3: „Nummer vierzehn, bitte in Zimmer zwölf.“ | d3 = orta, c3: „Nummer vierzehn, bitte in Zimmer ___.“ → **zwölf**; d4 = zor, c2 (eski d3 aynen: „Nummer dreizehn, bitte in Zimmer elf.“, banka aynı) | 4 (öğretilmemiş sözcüğü istemeyen basamak; „Zimmer elf“ denetçide gösterilmiş kalıpla geçiyor, „Zimmer zwölf“ geçmiyor) |
| 2 | ses m1:03:a1/b1 dikte d5 | `ornek_de` „Nummer vierzehn, Zimmer zwölf.“ | „Nummer vierzehn, bitte in Nummer zwölf.“ (h1 kalıbı „Nummer drei – in Nummer drei“) | 4 |
| 3 | ses m1:03:a1/b1 gölge | ["c2", "c3"] | ["c2"] (c4'te öğretilmemiş „Bürgerbüro“ var, eklenemedi) | 3 |
| 4 | ses m1:03:a1/b1 cevapla `prompt_de` | „Wie ist die Nummer, bitte?“ | „Wie ist Ihre Nummer, bitte?“ (h1 kalıbı bütün hâliyle) | 5 |
| 5 | ses m1:03:a2/b1 cevapla `prompt_de` | „Wie ist die Nummer?“ | „Und die neue Nummer?“ (Herr Pichler'in numarası soruluyor; „Ihre“ olmaz) | 5 |
| 6 | gün sınavı m1:03:s11 `prompt_de` | „Wie ist Ihre neue Nummer?“ | „Wie ist Ihre Nummer?“ (kalıp yalnız bütün hâliyle örtüyor; „neue“ araya girince „wie“ bilinmiyor) | 5 |

Dikte sırası 3. gün a1: kolay (c3) → orta (c4) → orta (c3) → zor (c2) → gerçek. **Usta basamağı bu bölümde kalmadı** (bkz. açık sorular).

### 4. gün (`content/v2/m1/gun-04.json`)
| # | Yer | Önce | Sonra | İlke |
|---:|---|---|---|---|
| 7 | ses m1:04:a1/b1 dikte d3 | zor, c4: „Zwei Semmeln kosten nur neunzig Cent.“ | zor, c1: „Hallo und guten Tag!“ (banka: und, Tag, Hallo, guten + Morgen, oder, bitte) | 4 |
| 8 | ses m1:04:a1/b1 dikte d4 | usta, c2: „Heute kostet eine Semmel nur fünfzig Cent.“ | usta, c3: „Ein Brot mit Käse kostet vier Euro.“ | 4 |
| — | (bağlı değişiklik) d2 | orta, c3: „Ein Brot mit Käse kostet ___ Euro.“ → vier | orta, c4: „Zwei Semmeln kosten nur ___ Cent.“ → **neunzig** (c3 artık usta; boşluk bilinen sözcükte) | 4 |
| 9 | ses m1:04:a1/b1 gölge c2 | ["c2", "c4"] | ["c3"] | 3 |
| 10 | ses m1:04:a1/b1 gölge c4 | (aynı satır) | (aynı satır) | 3 |
| 11 | ses m1:04:a1/b1 cevapla `prompt_de` | „Was kostet eine Semmel?“ | „Wie viel kostet eine Semmel?“ (h1 kalıbı) | 5 |
| 12 | ses m1:04:a2/b1 dikte d5 | `ornek_de` „Der Termin ist am Freitag. Das kostet fünfunddreißig Euro.“ | „Das ist am Freitag. Das kostet fünfunddreißig Euro.“ (`zorunlu` aynı) | 4 |
| 13 | prova n5 seçenek 1 | „Neunundsiebzig? Das ist schön!“ / „Yetmiş dokuz mu? Bu çok güzel!“ | „Neunundsiebzig Jahre alt?“ / „Yetmiş dokuz yaşında mı?“ (h5 kalıbı „Ich bin … Jahre alt“); `accepted[0]` aynı, eski kabuller duruyor | 5 |
| 14 | gün sınavı m1:04:s11 `accepted[0]` | „Was kostet ein Kilo Äpfel?“ | „Wie viel kostet ein Kilo Äpfel?“ (kabulde vardı, öne alındı); `why_tr` buna göre | 2 |

Dikte sırası 4. gün a1: kolay (c2) → orta (c4) → zor (c1) → usta (c3) → gerçek.

### 5. gün (`content/v2/m1/gun-05.json`)
| # | Yer | Önce | Sonra | İlke |
|---:|---|---|---|---|
| 15 | ses m1:05:a2/b1 gölge | ["c3", "c4"] | ["c2", "c4"] (c2: „Montag und Dienstag passen leider nicht.“) | 3 |

### 6. gün (`content/v2/m1/gun-06.json`)
| # | Yer | Önce | Sonra | İlke |
|---:|---|---|---|---|
| 16 | ses m1:06:a1/b1 dikte d3 | zor, c2: „Sind Sie neu hier?“ | zor, c1b: „Der Arzt kommt heute um neun Uhr.“ (banka: Der, Arzt, kommt, heute, um, neun, Uhr + zehn, morgen) | 4 |
| 17 | ses m1:06:a1/b1 gölge c2 | ["c2", "c4"] | ["c1b", "c3"] | 3 |
| 18 | ses m1:06:a1/b1 gölge c4 | (aynı satır) | (aynı satır) | 3 |
| 19 | ses m1:06:a1/b1 cevapla `prompt_de` | „Wie ist Ihr Name?“ | „Wie heißen Sie?“ (h2 kalıbı) | 5 |
| 20 | ses m1:06:a1/b1 cevapla `accepted[0]` | „Mein Name ist {name}.“ | „Ich heiße {name}.“ (kabulde vardı, öne alındı; `accepted_adsiz` değişmedi, adsız cevap kartı göstermek) | 2 |

### 7. gün (`content/v2/m1/gun-07.json`)
| # | Yer | Önce | Sonra | İlke |
|---:|---|---|---|---|
| 21 | sahne m1:07:v1/b1 gölge | ["s8", "s12"] | ["s8", "s10"] (s10: „Wie bitte? Ich verstehe nicht.“) | 3 |
| 22 | ses m1:07:a2/b1 dikte d5 `ornek_de` | „Sie ist krank. Sie kann morgen nicht arbeiten.“ | „Sie hat Fieber. Sie kann morgen nicht arbeiten.“ | 4 |
| 23 | ses m1:07:a2/b1 dikte d5 `zorunlu` | ["krank", "nicht arbeiten"] | ["Fieber", "nicht arbeiten"] | 4 |
| 24 | ses m1:07:a2/b1 gölge | ["c2", "c3"] | ["c3", "c4"] (c4: „Kannst du das bitte im Büro sagen?“) | 3 |
| 25 | resimden seç m1:07:g6 | `de` „anrufen“, resim „person making a phone call“ | `de` „Hausarzt“, resim „family doctor consultation“ (kartın `img`'iyle aynı), çeldiriciler „baker selling bread“, „teacher in a classroom“, „cashier at a supermarket“ | 5 |
| 26 | prova n2 seçenek 2 | „Ich bin krank. Ich möchte einen Termin machen.“ / „Hastayım. Randevu almak istiyorum.“ | „Ich habe Fieber. Ich möchte einen Termin machen.“ / „Ateşim var. Randevu almak istiyorum.“; kabulde vardı, `accepted[0]` yapıldı; „krank“lı kabuller duruyor | 5 |
| 27 | gün sınavı m1:07:s10 `prompt_de` | „Wollen wir heute Abend zusammen essen?“ | „Wollen wir heute Abend essen gehen?“ (`situation_tr` „birlikte yemek yemeyi öneriyor“ uyuyor) | 5 |

## Dilbilimci için: değişen Almanca satırlar
- `gun-03.json` sesler[m1:03:a1].bolumler[b1].dikte[d3].de: „Nummer vierzehn, bitte in Zimmer ___.“ + accepted ["zwölf", "Zwölf", "zwölf."]
- `gun-03.json` sesler[m1:03:a1].bolumler[b1].dikte[d4]: (eski d3'ün içeriği, kimliği d4) accepted „Nummer dreizehn, bitte in Zimmer elf.“
- `gun-03.json` sesler[m1:03:a1].bolumler[b1].dikte[d5].ornek_de: „Nummer vierzehn, bitte in Nummer zwölf.“
- `gun-03.json` sesler[m1:03:a1].bolumler[b1].cevapla.prompt_de: „Wie ist Ihre Nummer, bitte?“
- `gun-03.json` sesler[m1:03:a2].bolumler[b1].cevapla.prompt_de: „Und die neue Nummer?“
- `gun-03.json` gun_sinavi.maddeler[m1:03:s11].prompt_de: „Wie ist Ihre Nummer?“
- `gun-04.json` sesler[m1:04:a1].bolumler[b1].dikte[d2].de: „Zwei Semmeln kosten nur ___ Cent.“ + accepted ["neunzig", "Neunzig", "neunzig."]
- `gun-04.json` sesler[m1:04:a1].bolumler[b1].dikte[d3]: banka + accepted „Hallo und guten Tag!“
- `gun-04.json` sesler[m1:04:a1].bolumler[b1].dikte[d4].accepted: „Ein Brot mit Käse kostet vier Euro.“
- `gun-04.json` sesler[m1:04:a1].bolumler[b1].cevapla.prompt_de: „Wie viel kostet eine Semmel?“
- `gun-04.json` sesler[m1:04:a2].bolumler[b1].dikte[d5].ornek_de: „Das ist am Freitag. Das kostet fünfunddreißig Euro.“
- `gun-04.json` prova.dugumler[n5].secenekler[0].de + accepted[0]: „Neunundsiebzig Jahre alt?“
- `gun-04.json` gun_sinavi.maddeler[m1:04:s11].accepted[0]: „Wie viel kostet ein Kilo Äpfel?“ (sıra değişikliği)
- `gun-06.json` sesler[m1:06:a1].bolumler[b1].dikte[d3]: banka + accepted „Der Arzt kommt heute um neun Uhr.“
- `gun-06.json` sesler[m1:06:a1].bolumler[b1].cevapla.prompt_de: „Wie heißen Sie?“; accepted[0] „Ich heiße {name}.“ (sıra)
- `gun-07.json` sesler[m1:07:a2].bolumler[b1].dikte[d5].ornek_de: „Sie hat Fieber. Sie kann morgen nicht arbeiten.“; zorunlu ["Fieber", "nicht arbeiten"]
- `gun-07.json` gorsel[m1:07:g6].de: „Hausarzt“
- `gun-07.json` prova.dugumler[n2].secenekler[1].de + accepted[0]: „Ich habe Fieber. Ich möchte einen Termin machen.“
- `gun-07.json` gun_sinavi.maddeler[m1:07:s10].prompt_de: „Wollen wir heute Abend essen gehen?“
- (yalnız kimlik listesi, yeni Almanca yok) gölge: `gun-03` a1 ["c2"], `gun-04` a1 ["c3"], `gun-05` a2 ["c2","c4"], `gun-06` a1 ["c1b","c3"], `gun-07` sahne ["s8","s10"], `gun-07` a2 ["c3","c4"]

## Okur için: değişen Türkçe satırlar
- `gun-04.json` prova.dugumler[n5].secenekler[0].tr: „Yetmiş dokuz yaşında mı?“
- `gun-04.json` gun_sinavi.maddeler[m1:04:s11].why_tr: „Bir kilo elma kaç para derken **Wie viel kostet ein Kilo Äpfel?** dersin.“
- `gun-07.json` prova.dugumler[n2].secenekler[1].tr: „Ateşim var. Randevu almak istiyorum.“

## Ses yeniden üretilmeli
Dinleme metinlerine (`script`, `sahneler`) dokunulmadı. Önceden sesi üretiliyorsa yenilenmesi gerekenler:
- `gun-03.json` m1:03:a1:c1 `prompt_de` „Wie ist Ihre Nummer, bitte?“
- `gun-03.json` m1:03:a2:c1 `prompt_de` „Und die neue Nummer?“
- `gun-03.json` m1:03:s11 `prompt_de` „Wie ist Ihre Nummer?“
- `gun-04.json` m1:04:a1:c1 `prompt_de` „Wie viel kostet eine Semmel?“
- `gun-06.json` m1:06:a1:c1 `prompt_de` „Wie heißen Sie?“
- `gun-07.json` m1:07:s10 `prompt_de` „Wollen wir heute Abend essen gehen?“
- `gun-07.json` m1:07:g6 `de` „Hausarzt“ (resimden seç sesi) + yeni resim
- `gun-04.json` prova n5 seçenek 1 ve `gun-07.json` prova n2 seçenek 2 `de` (seçenek sesi varsa)
- `audio_de` alanı olan hiçbir madde değişmedi.

## Ölçüm
- Denetçi: 1.–7. gün (b) 0; toplam **İhlal: 0**.
- `npm run content:validate`: 0 hata, 131 uyarı (değişmedi). AK-3 sayacı 33/632 → 30/632 (4. gün 4 → 2, 7. gün 16 → 15).

## Açık sorular
1. 3. gün a1: bölümde öğretilmiş sözcüklerden kurulu uzun cümle yalnız c2 (c3 „Zimmer zwölf“, c4 „Bürgerbüro“). Usta basamağı çıktı, merdiven kolay → orta → orta → zor → gerçek. İstenirse d4 usta c2 olarak da yazılabilir (zor ile aynı cümle olur).
2. 3. gün s11: „neue“ düştü; `situation_tr` „yeni telefon numaranı soruyor“ duruyor (kabullerde „Meine neue Nummer …“ var). Denetçi kalıbı yalnız bütün hâliyle tanıyor.
3. 4. gün a1 d3 zor „Hallo und guten Tag!“ kolay bir cümle; c3 zor, c1 usta da yapılabilirdi ama usta en zor basamak olduğu için uzun cümle usta'da bırakıldı.
4. Kabul listelerindeki öğretilmemiş sözcüklü eşdeğerler (ör. „Was kostet …“, „Ich bin krank …“, „Das ist schön“) silinmedi: öğrenci bunları söylerse yanlış sayılmasın diye.
