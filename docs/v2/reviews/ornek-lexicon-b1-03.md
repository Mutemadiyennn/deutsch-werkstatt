# lexicon-b1-03 örneklem kontrolü (b1-03a + b1-03b)

- Tarih: 2026-11-23 · Denetleyen: qa-ajan (Opus 5.5) · Sıra: yazar → dilbilimci (`lexicon-b1-03.md`, ONAY + okur düzeltmeleri) → okur (`okur/lexicon-b1-03.md`, 2. tur 3/3 GEÇTİ) → **örneklem**
- Girdi: `content/v2/registry/lexicon/batch-b1-03a.json` (26 kart) · `batch-b1-03b.json` (24 kart). İki dosya da `review.status: draft`. Dilbilimci düzeltmeleri, B kararları ve okur düzeltmeleri işlenmiş hâli okundu.
- **Karar: GEÇTİ.** Hata 0/86 = **%0** (eşik %2).

## Yöntem

Madde, kart alanı düzeyinde sayıldı. İki dosyada toplam 746 madde var:

| tür | evren | oran | örneklem |
|---|---|---|---|
| örnek cümle + çeviri (`examples[]`) | 250 | %10 | 25 |
| eşdizim (`collocations[]`) | 158 | %10 | 16 |
| boşluk (`forms[]`: cümle, cevap, `also_ok`, çeviri, ipucu) | 200 | **%15** | 30 |
| hata notu (`mistakes_tr[]`) | 98 | %10 | 10 |
| ad: `art` + `pl` + `tr` | 25 | %10 | 3 |
| fiil: `verb` biçimleri + `tr` | 15 | %10 | 2 |
| **toplam** | **746** | | **86 (%11,5)** |

- **Tohum: `20261127`.** Liste iki dosyada sırayla kuruldu: önce a, sonra b; kart sırası, alan içi dizin sırası. Tek bir `random.Random(20261127)` sırasıyla `ex, coll, form, mis, noun, verb` için `rng.sample(range(len(evren)), ceil(evren × oran))` çağrıldı, seçilen dizinler sıralandı (Python 3.13, standart `random`). Betik QA çalışma alanında, depoya girmedi.
- Boşluk katmanı yine %15 alındı (b1-01 ve b1-02 1. turda boşluklardan geri dönmüştü).
- Örneklem 48 madde a dosyasından, 38 madde b dosyasından.
- Not: dosyalarda `pos: noun` olan kart 25 (dilbilimci raporu "26 ad" diyor). İçerik hatası değil, sayım farkı.

Her maddede bakılanlar:
1. Almanca doğru ve doğal mı, katmanına (hd / alltag) uyuyor mu?
2. Türkçe çeviri doğru mu?
3. Boşluk için iki yön:
   - **(a)** Türkçe çeviri yanındayken doğru ve sık bir cevap reddediliyor mu? (Komşu kartı olan eş anlamlılar kayıtta arandı: lx:Viertel, lx:Besprechung, lx:Nachbarschaft.)
   - **(b)** `also_ok` yanlış ya da başka anlamlı bir cevabı kabul ettiriyor mu? Kartın ya da komşu kartın hata notuyla çelişiyor mu? Cümleye konunca artikel ve çekim uyuyor mu?
4. Açıklamada dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı ya da öğrencinin ağzında sabit cinsiyet var mı?
5. Not, kartın kendi doğru öğrettiği bir biçimi yanlış gösteriyor mu?

## Madde listesi

Kısaltmalar: D = doğru · H = hata.

| # | dosya | kart | alan | sonuç | not |
|---|---|---|---|---|---|
| 1 | a | lx:Gegend | examples[3] | D | |
| 2 | a | lx:Gegend | examples[4] | D | |
| 3 | a | lx:klingeln | examples[0] | D | zildeki ad; **Brandl'ın** eki doğru |
| 4 | a | lx:bellen | examples[2] | D | |
| 5 | a | lx:vorbeikommen | examples[2] | D | |
| 6 | a | lx:Schnee | examples[1] | D | **Schnee räumen** yerleşik |
| 7 | a | lx:Schnee | examples[2] | D | |
| 8 | a | lx:neugierig | examples[2] | D | |
| 9 | a | lx:plaudern | examples[0] | D | Brandl WORLD ile uyumlu (geveze) |
| 10 | a | lx:leise | examples[1] | D | |
| 11 | a | lx:leise | examples[3] | D | |
| 12 | a | lx:Gerücht | examples[2] | D | |
| 13 | a | lx:Anruf | examples[2] | D | |
| 14 | a | lx:erreichbar | examples[0] | D | |
| 15 | a | lx:Sprachnachricht | examples[3] | D | |
| 16 | b | lx:hiermit | examples[3] | D | |
| 17 | b | lx:Kopie | examples[4] | D | |
| 18 | b | lx:Original | examples[1] | D | |
| 19 | b | lx:rechtzeitig | examples[4] | D | |
| 20 | b | lx:bearbeiten | examples[0] | D | |
| 21 | b | lx:gültig | examples[3] | D | |
| 22 | b | lx:ablehnen | examples[4] | D | |
| 23 | b | lx:Widerspruch | examples[4] | D | |
| 24 | b | lx:Rückfrage | examples[3] | D | |
| 25 | b | lx:Verständnis | examples[1] | D | dilbilimci düzeltmesi yerinde |
| 26 | a | lx:Gegend | collocations[3] | D | |
| 27 | a | lx:klingeln | collocations[0] | D | |
| 28 | a | lx:aufpassen | collocations[1] | D | |
| 29 | a | lx:neugierig | collocations[2] | D | |
| 30 | a | lx:plaudern | collocations[1] | D | |
| 31 | a | lx:besetzt | collocations[2] | D | |
| 32 | a | lx:erreichbar | collocations[2] | D | |
| 33 | b | lx:Original | collocations[0] | D | |
| 34 | b | lx:vorlegen | collocations[1] | D | |
| 35 | b | lx:rechtzeitig | collocations[2] | D | |
| 36 | b | lx:Sachbearbeiter | collocations[0] | D | |
| 37 | b | lx:gültig | collocations[2] | D | |
| 38 | b | lx:ablehnen | collocations[1] | D | |
| 39 | b | lx:Widerspruch | collocations[0] | D | |
| 40 | b | lx:Begründung | collocations[2] | D | |
| 41 | b | lx:Rückfrage | collocations[1] | D | |
| 42 | a | lx:Gegend | forms[2] | D | **die Nachbarschaft** artikel ve anlamca uyuyor. **das Viertel** (kartı var) **die** ile elenir |
| 43 | a | lx:bellen | forms[2] | D | |
| 44 | a | lx:Rasen | forms[0] | D | **das Gras** **den** ile elenir; **den Rasen mähen** tek doğal söyleyiş |
| 45 | a | lx:Rasen | forms[1] | D | **auf dem Gras** uyuyor |
| 46 | a | lx:Wäsche | forms[0] | D | |
| 47 | a | lx:Wäsche | forms[3] | D | |
| 48 | a | lx:Schnee | forms[3] | D | |
| 49 | a | lx:glatt | forms[3] | D | **rutschig** yerinde |
| 50 | a | lx:neugierig | forms[3] | D | **gespannt auf** en doğal karşılık, kabul ediliyor |
| 51 | a | lx:Anruf | forms[0] | D | **auf Ihren Rückruf warten** sık ve doğru |
| 52 | a | lx:Gespräch | forms[0] | D | **Besprechung** (kartı var) **einem** ile elenir |
| 53 | a | lx:besetzt | forms[0] | D | |
| 54 | a | lx:besetzt | forms[2] | D | yeni cümle **frei**'yi eliyor |
| 55 | a | lx:Leitung | forms[0] | D | |
| 56 | a | lx:erreichbar | forms[0] | D | **zu erreichen** doğru; kartın notu **erreichen**'i doğru biçim olarak veriyor |
| 57 | b | lx:Aktenzeichen | forms[0] | D | |
| 58 | b | lx:Kopie | forms[1] | D | |
| 59 | b | lx:Anlage | forms[0] | D | |
| 60 | b | lx:beilegen | forms[2] | D | **mitschicken**, **beifügen** doğru |
| 61 | b | lx:vollständig | forms[2] | D | |
| 62 | b | lx:zurückschicken | forms[3] | D | **zurückgesendet / zurückgesandt** ikisi de doğru |
| 63 | b | lx:bearbeiten | forms[1] | D | |
| 64 | b | lx:gültig | forms[0] | D | |
| 65 | b | lx:Widerspruch | forms[2] | D | **Einspruch** yok, doğru: reddedilen başvuruya karşı resmî yol **Widerspruch** |
| 66 | b | lx:Begründung | forms[0] | D | |
| 67 | b | lx:Begründung | forms[1] | D | **Grund**'un dışarıda kalması kartın notuyla tutarlı |
| 68 | b | lx:Einschreiben | forms[0] | D | |
| 69 | b | lx:Einschreiben | forms[3] | D | |
| 70 | b | lx:Anfrage | forms[1] | D | **Frage**: B kararı 2 (üst anlam kabul) |
| 71 | b | lx:Anfrage | forms[2] | D | aynı |
| 72 | a | lx:klingeln | mistakes_tr[1] | D | |
| 73 | a | lx:leise | mistakes_tr[1] | D | |
| 74 | a | lx:Anruf | mistakes_tr[0] | D | Türkçedeki "bir telefon aldım" aktarımı yerinde |
| 75 | a | lx:Anruf | mistakes_tr[1] | D | |
| 76 | a | lx:besetzt | mistakes_tr[0] | D | |
| 77 | a | lx:Leitung | mistakes_tr[0] | D | |
| 78 | a | lx:erreichbar | mistakes_tr[1] | D | |
| 79 | b | lx:angeben | mistakes_tr[0] | D | |
| 80 | b | lx:gültig | mistakes_tr[0] | D | "süresi bitti" → **fertig** aktarımı yerinde |
| 81 | b | lx:Einschreiben | mistakes_tr[0] | D | yanlış biçim cümle içinde; kartta **der Einschreiben** doğru olarak geçmiyor |
| 82 | a | lx:Hof | art/pl | D | der, Höfe |
| 83 | a | lx:Rasen | art/pl | D | der, Rasen (çoğul tekille aynı) |
| 84 | b | lx:Begründung | art/pl | D | die, Begründungen |
| 85 | a | lx:aufpassen | verb | D | passt auf · passte auf · hat aufgepasst · ayrılan **auf** · edat **auf** |
| 86 | a | lx:plaudern | verb | D | plaudert · plauderte · hat geplaudert · edat **mit**, **über** |

Örneklemdeki açıklama alanlarında (30 ipucu, 10 hata notu) dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı yok. Öğrencinin ağzında sabit cinsiyet de yok. İki dosyanın bütün açıklama ve çeviri alanlarında makine taraması da (terim listesi, İngilizce sözcükler, kurs/kitap adları, `{name}`) yalnız yanlış pozitif verdi: **çekim** (telefonun çekmesi), **Of** (Türkçe ünlem).

## Makine taraması: `also_ok` ile aynı kartın `mistakes_tr`'si

200 boşluk, 101 `also_ok` girdisi (dilbilimcinin sayısıyla aynı). Her girdinin her sözcüğü aynı kartın hata notlarında tam sözcük olarak arandı (küçük harf, Python `re`).

- **7 eşleşme, gerçek çelişki 0.** Hepsi notta doğru biçim olarak geçiyor: lx:vorbeikommen **komme** ("Doğrusu **Ich komme morgen vorbei**"), lx:erreichbar **zu erreichen** ×4 ("ya da **Sie können mich erreichen**"), lx:vorlegen **zeigen** ×2 ("Kendin konuşurken **zeigen** yeter").
- Ek tarama (bu turda eklendi): her notun "yanlış / denmez / eksik / doğal değil" dediği kalın dize, aynı kartın örneklerinde, eşdizimlerinde, doldurulmuş boşluklarında ve öbür açıklamalarında arandı. İki kart çıktı, ikisi de çelişki değil:
  - lx:neugierig `mistakes_tr[0]`: **neugierig** "endişelendim" anlamında kullanılmaz diyor. Bağlam notta açık; anlam ayrımı.
  - lx:bearbeiten `mistakes_tr[0]`: **Mein Antrag bearbeitet** yanlış; ö4 ve forms[2]'de **bis mein Antrag bearbeitet ist** doğru. Dize aynı ama not tam cümle ("Başvurum işlemde derken"), ve doğrusu **wird bearbeitet**. b1-02'deki **der Nachbarschaft** sınıfına girmiyor.
- `npm run content:validate` → 0 hata, 154 uyarı; uyarıların hiçbiri b1-03 dosyalarına ait değil.

## Örneklem dışında görülenler (orana katılmadı, engel değil)

Oran eşiğin altında olduğu için örneklem dışı tarama zorunlu değildi. Yine de 200 boşluğun hepsi ve 101 `also_ok` girdisi iki yönden ve artikel uyumu için okundu. Artikeli uymayan ya da başka anlamlı kabul görmedim. Dilbilimcinin çıkardığı girdiler (**Netz**, **Passt**, **Termin**, **Telefonat**, **Nummer**, **Unterlagen**, **da**, **nachschicken**) gerçekten yok. Takip için üç not:

| kart | alan | not |
|---|---|---|
| lx:leise | forms[3] `hint_tr` | "Sesin kısık derken **du bist leise** denir." Türkçede **sesim kısık** çoğu zaman boğazdan, hastalıktan kısılmış ses demek (**ich bin heiser**). Cümlede ("Seni zor duyuyorum") anlam açık, ama ipucu kural gibi genelleşiyor. Öneri: "Sesin çok alçak derken …" ya da "Seni zor duyuyorum derken …". Okurdan geçmiş; dilbilimci karar versin |
| lx:Gegend | forms[3] `also_ok: Nachbarschaft` | **Die Nachbarschaft hier ist echt schön** önce "komşular iyi" diye okunur, çeviri "Buralar". Sınırda; forms[0]–[2]'de yerinde |
| lx:Aktenzeichen | forms[0]–[3] | Resmî mektupta **das Geschäftszeichen** da geçer, artikel uyar. Kartı yok, öğrenci bilmez; eklenmesi şart değil |

## Karar

- Oran **0/86 = %0 ≤ %2** → **GEÇTİ** (örneklem katmanı).
- Örnek cümle, çeviri, eşdizim, ad ve fiil biçimleri, hata notları ve boşluklar örneklemde hatasız. Önceki partilerin GERİ nedenleri bu partide görülmedi: eksik doğru cevap (yön a) yok, başka anlamlı ya da artikeli uymayan kabul (yön b) yok, kartın kendi öğrettiğiyle çelişen not yok.
- Okur kapısı geçti (2. tur 3/3). Bu örneklemle iki dosya `reviewed` olabilir; yukarıdaki üç takip notu engel değil.

## 03c (2026-11-23, tam bakış)

Girdi: `batch-b1-03c.json`, 5 yedek kart (lx:Zaun, lx:Schatten, lx:Straßenfest, lx:knapp, lx:Festnetz), dilbilimcinin "03c incelemesi" düzeltmeleri işlenmiş hâli. Kart sayısı az olduğu için örneklem alınmadı, bütün alanlar okundu. Ölçütler 1. turla aynı.

### Kapsam

| tür | madde | hata |
|---|---|---|
| örnek cümle + çeviri | 25 | 0 |
| eşdizim | 15 | 0 |
| boşluk (cümle, cevap, `also_ok`, çeviri, ipucu) | 20 | 0 |
| hata notu | 10 | 0 |
| ad: `art` + `pl` + `tr` | 4 | 0 |
| **toplam** | **74** | **0** |

Ayrıca 22 açıklama alanı okundu (5 `tr`, 5 `anlam_tr`, 5 `ne_zaman_tr`, 5 `ipucu_tr`, 2 kartta `parcalar`). Sıfat lx:knapp'ın çekim alanı yok.

### Kart kart

| kart | sonuç | bakılanlar |
|---|---|---|
| lx:Zaun | D | der / Zäune. `also_ok: Gartenzaun` dört cümlede **am / ein niedriger / über den / an den** ile uyuyor, anlam aynı. Eksik doğru cevap yok. Not 1 (**auf dem Zaun reden**) ve not 2 (**Zaune**) kartın doğrularıyla çelişmiyor |
| lx:Schatten | D | der / Schatten. Boşluklarda `also_ok` yok, gerek de yok. Not 1: **sich in den Schatten setzen** doğru, ö4 ile aynı. Not 2: **viel Schatten** ö2 ve boşluk 2 ile aynı. **30 Grad im Schatten**, **hat's** yerinde |
| lx:Straßenfest | D | das / Straßenfeste. `also_ok: Fest` **ein / zum / beim** ile uyuyor. Notta **das Fest** açıklama olarak geçiyor, yanlış diye gösterilmiyor. Not 2'deki **beim / auf dem Straßenfest** doğru. "Im Juli" 32. hafta (WORLD takvimiyle yaz) ile uyumlu |
| lx:knapp | D | `also_ok: bündig` (**kurz und bündig**) üç boşlukta doğru ve aynı anlamda. forms[2] **fast zehn Minuten** çeviriyle ("on dakikaya yakın") aynı. Not 1 ile çelişmiyor, not "tam on değil" diyor |
| lx:Festnetz | D | das / `-`. Not 1'in **vom Festnetz** / **auf dem Festnetz** ayrımı Almancada doğru. Çeviriler artık tek anlama çekilmiş (ö4 "sabit hattınızdan"). **das Haustelefon** "dahili telefon, diafon" diye anlaşılır; not doğru |

### Taramalar

- `also_ok` ↔ aynı kartın `mistakes_tr`'si: 12 girdi, 4 eşleşme (lx:Straßenfest **Fest**, notta "Son parça **das Fest**" diye açıklama), gerçek çelişki **0**.
- Açıklama ve çeviri alanlarında dilbilgisi terimi, İngilizce sözcük, kurs ya da kitap adı, `{name}`, `=`, `;`, `…` ve 14 kelimeyi aşan cümle yok. Tek eşleşme yanlış pozitif ("Of" ünlemi). Öğrencinin ağzında sabit cinsiyet yok. Olgu iddiası yok (30 derece, hava sözü).
- Yinelenen kimlik: 03c'nin beş kartı kayıtta başka partide yok.

### 03a silmesinin doğrulanması

- `batch-b1-03a.json` 21 kart. lx:Gegend, lx:deutlich, lx:neugierig, lx:Hof, lx:Schnee bu ağacın `registry/lexicon/` klasöründe hiçbir partide yok.
- 03a + 03b + 03c'nin notları, ipuçları, boşluk ipuçları, cevapları, `also_ok` listeleri ve eşdizimleri beş sözcük ve `lx:` kimlikleri için makinede tarandı: gönderme **yok**. Sözcük olarak yalnız örnek ve boşluk cümlelerinde geçiyor: **im Hof** (lx:bellen ö5, lx:Wäsche ö4 ve forms[2]). Kart A2 hattında daha önce geldiği için sorun değil, dilbilimcinin kaydıyla aynı.
- Önceki örneklemin 11 maddesi silinen beş karta aitti (#1, 2, 6, 7, 8, 26, 29, 42, 48, 50, 82). Hepsi D idi. Kalan örneklem 0/75; oran ve karar değişmez.
- Örneklemin takip notundaki lx:leise forms[3] düzeltildi: ipucu "Sesin az geliyor derken **du bist leise** denir.", forms[3] ve ö5 çevirisi "sesin çok az geliyor". Telefonda doğal, **heiser** anlamı kalktı. Kapandı.

### Takip (engel değil)

1. lx:knapp `tr` ve `anlam_tr` "kısa ve öz, (vakit) dar" diyor. Kart üçüncü anlamı da öğretiyor: **knapp zehn Minuten** "on dakikaya yakın" (ö4, eşdizim 3, forms[2], not 1). `tr`'ye "(sayıyla) -e yakın" eklenebilir. İpucu ve not anlamı veriyor, öğrenci boşlukta kalmıyor.
2. lx:Festnetz not 1'in Türkçesi: "Seni sabit hattında arasın istiyorsan" yerine "Seni sabit hattından arasın istiyorsan" daha doğal. Okur bakacak.
3. lx:Zaun ö1, ö5: Frau Brandl için WORLD'de bahçe tanımlı değil (alt kat komşusu). Çit başında sohbet olay değil alışkanlık. "Geveze" kişiliğiyle uyumlu; dilbilimci kararıyla bırakılabilir.
4. lx:knapp (33. hafta) **kurz und knapp** ile b1-04c'deki lx:sachlich **kurz und sachlich** birbirine yakın. Çeviriler ayırıyor ("kısa ve öz" / "kısa ve konuya odaklı"); iki kart da öbürünü kabul etmiyor. Tutarlı ama bilgi için.

### 03c kararı

- **74/74 doğru, hata 0 (%0) → GEÇTİ.**
- `reviewed` için kalan: 03c'nin açıklama ve çeviri alanları ile lx:leise'nin değişen üç alanı okurdan geçmedi.
- `npm run content:validate` (wt-03) → **0 hata, 154 uyarı**; uyarıların hiçbiri b1-03 dosyalarına ait değil.
