# lexicon-b1-02 örneklem kontrolü (b1-02a + b1-02b)

- Tarih: 2026-11-23 · Denetleyen: qa-ajan (Opus 5.5) · Sıra: yazar → dilbilimci (`lexicon-b1-02.md`) → okur (`okur/lexicon-b1-02.md`, 2. tur 8/8 GEÇTİ) → **örneklem**
- Girdi: `content/v2/registry/lexicon/batch-b1-02a.json` (24 kart) · `batch-b1-02b.json` (26 kart). İki dosya da `review.status: draft`. Dilbilimci düzeltmeleri, B kararları, okur düzeltmeleri ve also_ok taraması işlenmiş.
- **Karar: GERİ (dilbilimciye).** Hata 5/87 = **%5,75** (eşik %2).

## Yöntem

Madde, kart alanı düzeyinde sayıldı. İki dosyada toplam 748 madde var:

| tür | evren | oran | örneklem |
|---|---|---|---|
| örnek cümle + çeviri (`examples[]`) | 250 | %10 | 25 |
| eşdizim (`collocations[]`) | 150 | %10 | 15 |
| boşluk (`forms[]`: cümle, cevap, `also_ok`, çeviri, ipucu) | 200 | **%15** | 30 |
| hata notu (`mistakes_tr[]`) | 101 | %10 | 11 |
| ad: `art` + `pl` + `tr` | 32 | %10 | 4 |
| fiil: `verb` biçimleri + `tr` | 15 | %10 | 2 |
| **toplam** | **748** | | **87 (%11,6)** |

- **Tohum: `20261125`.** Liste iki dosyada sırayla kuruldu: önce a, sonra b; kart sırası, alan içi dizin sırası. Tek bir `random.Random(20261125)` sırasıyla `ex, coll, form, mis, noun, verb` için `rng.sample(range(len(evren)), ceil(evren × oran))` çağrıldı (Python 3, standart `random`).
- Boşluk katmanı %15 alındı. Önceki parti (b1-01) iki turda da yalnız boşluklardan geri dönmüştü.
- Örneklem 41 madde a dosyasından, 46 madde b dosyasından.

Her maddede bakılanlar:
1. Almanca doğru ve doğal mı, katmanına (hd / alltag) uyuyor mu?
2. Türkçe çeviri doğru mu?
3. Boşluk için iki yön:
   - **(a)** Türkçe çeviri yanındayken doğru ve sık bir cevap reddediliyor mu?
   - **(b)** `also_ok` yanlış ya da başka anlamlı bir cevabı kabul ettiriyor mu? Kartın ya da komşu kartın hata notuyla çelişiyor mu? Cümleye konunca artikel uyuyor mu?
4. Açıklamada dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı ya da öğrencinin ağzında sabit cinsiyet var mı?

## Madde listesi

Kısaltmalar: D = doğru · H = hata.

| # | dosya | kart | alan | sonuç | not |
|---|---|---|---|---|---|
| 1 | a | lx:Warteliste | examples[2] | D | |
| 2 | a | lx:Absage | examples[4] | D | |
| 3 | a | lx:Befund | examples[3] | D | |
| 4 | a | lx:Abteilung | examples[1] | D | |
| 5 | a | lx:klären | examples[1] | D | |
| 6 | a | lx:Sperrmüll | examples[2] | D | |
| 7 | a | lx:Nachtschicht | examples[1] | D | |
| 8 | a | lx:tauschen | examples[0] | D | |
| 9 | a | lx:genehmigen | examples[1] | D | |
| 10 | a | lx:abbauen | examples[0] | D | |
| 11 | b | lx:Resturlaub | examples[2] | D | |
| 12 | b | lx:Zuschlag | examples[3] | D | |
| 13 | b | lx:absprechen | examples[3] | D | Frau Schuster WORLD dışı genel ad |
| 14 | b | lx:Personalabteilung | examples[1] | D | |
| 15 | b | lx:Personalabteilung | examples[4] | D | |
| 16 | b | lx:Guthaben | examples[1] | D | |
| 17 | b | lx:fällig | examples[2] | D | |
| 18 | b | lx:Mieterhöhung | examples[0] | D | |
| 19 | b | lx:Nachbarschaft | examples[0] | D | |
| 20 | b | lx:Nachbarschaft | examples[1] | D | |
| 21 | b | lx:Nachbarschaft | examples[2] | D | |
| 22 | b | lx:Garten | examples[2] | D | |
| 23 | b | lx:grillen | examples[4] | D | |
| 24 | b | lx:Hitze | examples[1] | D | |
| 25 | b | lx:Rücksicht | examples[0] | D | |
| 26 | a | lx:Absage | collocations[1] | D | |
| 27 | a | lx:Befund | collocations[0] | D | |
| 28 | a | lx:Vertretung | collocations[2] | D | |
| 29 | a | lx:Anliegen | collocations[0] | D | |
| 30 | a | lx:Nachtschicht | collocations[0] | D | |
| 31 | a | lx:genehmigen | collocations[1] | D | |
| 32 | a | lx:Urlaubstag | collocations[2] | D | |
| 33 | a | lx:abbauen | collocations[1] | D | |
| 34 | b | lx:Resturlaub | collocations[0] | D | |
| 35 | b | lx:Zuschlag | collocations[1] | D | |
| 36 | b | lx:Brückentag | collocations[2] | D | |
| 37 | b | lx:Personalabteilung | collocations[1] | D | |
| 38 | b | lx:Personalabteilung | collocations[2] | D | |
| 39 | b | lx:Strom | collocations[0] | D | |
| 40 | b | lx:Hitze | collocations[0] | D | |
| 41 | a | lx:Vertretung | forms[0] | D | |
| 42 | a | lx:mitteilen | forms[2] | D | **mit** cevabı tek kılıyor |
| 43 | a | lx:Anliegen | forms[2] | D | **dein** yalnız **Anliegen** ve **Problem**'i alıyor |
| 44 | a | lx:Anliegen | forms[3] | D | |
| 45 | a | lx:klären | forms[2] | **H (a)** | aşağıda H-1 |
| 46 | a | lx:Sperrmüll | forms[2] | D | **Müll** üst anlam, kabul edilebilir |
| 47 | a | lx:Spätschicht | forms[2] | D | |
| 48 | a | lx:Urlaubsantrag | forms[1] | D | |
| 49 | a | lx:genehmigen | forms[3] | D | sınırda: aşağıda "Karar dilbilimcinin" |
| 50 | b | lx:auszahlen | forms[0] | D | |
| 51 | b | lx:auszahlen | forms[3] | D | **bezahlen lassen** doğal |
| 52 | b | lx:Zuschlag | forms[2] | **H (b)** | aşağıda H-2 |
| 53 | b | lx:absprechen | forms[0] | D | |
| 54 | b | lx:absprechen | forms[1] | D | sınırda: aşağıda "Karar dilbilimcinin" |
| 55 | b | lx:eintragen | forms[2] | D | **Wo gebe ich die Stunden ein?** doğal |
| 56 | b | lx:Personalabteilung | forms[1] | **H (b)** | aşağıda H-3 |
| 57 | b | lx:Guthaben | forms[1] | D | |
| 58 | b | lx:fällig | forms[0] | D | |
| 59 | b | lx:Mieterhöhung | forms[0] | D | |
| 60 | b | lx:Mieterhöhung | forms[1] | D | **die** ve çeviri **Brief**, **Rechnung**'u eliyor |
| 61 | b | lx:Betrag | forms[3] | D | |
| 62 | b | lx:Verbrauch | forms[1] | D | |
| 63 | b | lx:gießen | forms[0] | D | |
| 64 | b | lx:gießen | forms[3] | D | |
| 65 | b | lx:grillen | forms[0] | D | |
| 66 | b | lx:grillen | forms[2] | **H (b)** | aşağıda H-4 |
| 67 | b | lx:ausleihen | forms[2] | D | **ausborgen** Duden'de var |
| 68 | b | lx:Hitze | forms[0] | D | |
| 69 | b | lx:Hitze | forms[1] | D | |
| 70 | b | lx:Rücksicht | forms[2] | D | "Bizi" serbest ama doğru çeviri |
| 71 | a | lx:abbuchen | mistakes_tr[1] | D | |
| 72 | a | lx:Sperrmüll | mistakes_tr[0] | D | |
| 73 | a | lx:Urlaubsantrag | mistakes_tr[1] | D | |
| 74 | b | lx:Brückentag | mistakes_tr[1] | D | |
| 75 | b | lx:eintragen | mistakes_tr[0] | D | |
| 76 | b | lx:Nachzahlung | mistakes_tr[1] | D | |
| 77 | b | lx:Warmmiete | mistakes_tr[1] | D | okur düzeltmesi yerinde |
| 78 | b | lx:Heizkosten | mistakes_tr[1] | D | |
| 79 | b | lx:Verbrauch | mistakes_tr[0] | D | |
| 80 | b | lx:Nachbarschaft | mistakes_tr[1] | **H** | aşağıda H-5 |
| 81 | b | lx:Garten | mistakes_tr[0] | D | |
| 82 | a | lx:Absage | art/pl | D | die, Absagen |
| 83 | a | lx:Abteilung | art/pl | D | die, Abteilungen |
| 84 | a | lx:Nachtschicht | art/pl | D | die, Nachtschichten |
| 85 | b | lx:Personalabteilung | art/pl | D | die, Personalabteilungen |
| 86 | a | lx:klären | verb | D | klärt · klärte · hat geklärt · akk |
| 87 | a | lx:freinehmen | verb | D | nimmt frei · nahm frei · hat freigenommen · ayrılan **frei** · dönüşlü (**sich**) |

Örneklemdeki açıklama alanlarında (30 ipucu, 11 hata notu) dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı yok. Öğrencinin ağzında sabit cinsiyet de yok.

## Hatalar

Örnek cümle, çeviri, eşdizim, ad ve fiil biçimlerinde örneklem hatasız (46/46). Beş hatanın dördü boşluklarda, biri hata notunda.

**H-1 · lx:klären forms[2]** (b1-02a), yön (a): haksız ret
- Boşluk: `Hast du das mit der Rechnung ___?` · tr "Fatura işini hallettin mi?" · `also_ok: erledigt`
- Eksik cevap: **geregelt**. **Hast du das mit der Rechnung geregelt?** aynı ölçüde doğal ve sık.
- Kayıtta lx:regeln kartı var (batch-006), Türkçesi tam olarak "halletmek, düzenlemek". Öğrenci "hallettin" çevirisini o kartla öğrendi. **erledigt** kabul edilip **geregelt**'in reddedilmesi tutarsız.
- Öneri: `also_ok`'a **geregelt** eklensin.

**H-2 · lx:Zuschlag forms[2]** (b1-02b), yön (b): başka anlamlı cevap, kartın notuyla çelişki
- Boşluk: `Für Nachtarbeit gibt es höhere ___.` · tr "Gece çalışması için daha yüksek ek ödemeler var." · `also_ok: Löhne`
- **höhere Löhne** "daha yüksek ücretler" demek, ek ödeme değil. Aynı kartın `mistakes_tr[0]` notu tam bu ayrımı öğretiyor: "Maaşa zam derken **Zuschlag** denmez. Maaşın artması **mehr Gehalt** ile söylenir."
- Ayrıca dilbilimci A-3'te "**Lohn** kartı yok" diye **Lohn**'u cümlelerden çıkarmış, taramada `also_ok`'a geri koymuş.
- Öneri: **Löhne** çıkarılsın.

**H-3 · lx:Personalabteilung forms[1]** (b1-02b), yön (b): kabul edilen cevap yanlış Almanca
- Boşluk: `Ich gehe jetzt zur ___.` · `also_ok: Personalbüro`
- **das Personalbüro** cinsi **das**. Cevap cümleye konunca **Ich gehe jetzt zur Personalbüro** çıkıyor. Doğrusu **zum Personalbüro** olurdu.
- Kartın `mistakes_tr[0]` notu tam bu noktayı öğretiyor: "**zu Personalabteilung** eksik kalır. Doğrusu **zur Personalabteilung**." Öğrenci yanlış artikel uyumu için onay alıyor.
- Aynı sorun kartın öbür üç boşluğunda da var (aşağıda).
- Öneri: dört boşluktan da **Personalbüro** çıkarılsın.

**H-4 · lx:grillen forms[2]** (b1-02b), yön (b): başka anlamlı cevap
- Boşluk: `Wir haben gestern Fleisch ___ und dann zusammen gegessen.` · tr "Dün et ızgara yaptık, sonra birlikte yedik." · `also_ok: gebraten`
- **braten** tavada ya da fırında kızartmak demek, ızgara değil. **Wir haben Fleisch gebraten** diyen öğrenciyi Alman, mangal yaptı diye anlamaz. Çeviri "ızgara" dediği için cevap eleniyor olmalı.
- Kart mangalı anlatmanın doğru yolunu öğretiyor (iki hata notu da **grillen** üzerine).
- Öneri: **gebraten** çıkarılsın. forms[1]'deki **braten** için de aynı öneri geçerli (aşağıda).

**H-5 · lx:Nachbarschaft mistakes_tr[1]** (b1-02b): doğru Almancayı yanlış gösteren not
- Not: "**der Nachbarschaft** yanlış. Sonu **-schaft** olan kelimelere **die** gelir: **die Nachbarschaft**."
- **der Nachbarschaft** aynı kartta doğru olarak dört kez geçiyor: `mistakes_tr[0]` ("Doğrusu **in der Nachbarschaft**"), ö3, ö4, eşdizim **in der Nachbarschaft wohnen**, ipucu, forms[2] ipucu. Öğrenci iki not arasında çelişki görüyor: biri "doğrusu **in der Nachbarschaft**", öbürü "**der Nachbarschaft** yanlış" diyor.
- Bu, dilbilimcinin ağır saydığı türden (lx:Vertretung, A-2).
- Öneri: yanlış biçim bir cümle içinde gösterilsin, ör. "**Der Nachbarschaft ist ruhig** yanlış. Sonu **-schaft** olan kelimelere **die** gelir: **Die Nachbarschaft ist ruhig.**"

## Makine taraması: `also_ok` ile aynı kartın `mistakes_tr`'si

200 boşluk, 165 `also_ok` girdisi. Her girdinin her sözcüğü aynı kartın hata notlarında tam sözcük olarak arandı (küçük harf, Python `re`). Betik QA çalışma alanında, depoya girmedi.

- **20 eşleşme.** Bunların 16'sı notta açıklama olarak geçiyor, yanlış gösterilmiyor: **Liste**, **Müll**, **Antrag** ("Son parça ..."), **Urlaub** (yanlış olan **der bleibende Urlaub**), **sagen**, **spät**, **genommen**, **das**.
- **Gerçek çatışma 3 (+1):** lx:Abrechnung forms[0], [1], [2] `also_ok: Rechnung`. Kartın `mistakes_tr[1]` notu şöyle: "Fatura **die Rechnung** olur. Bütün yılın hesap dökümü ise **die Abrechnung** olur." Kart iki sözcüğü ayırmayı öğretirken boşluk **Rechnung**'u doğru sayıyor (b1-01'deki H-3 ile aynı sınıf). forms[3] `Rechnungen` aynı çatışma; çoğul olduğu için sözcük eşleşmesine düşmedi, elle bulundu.
- Taramanın göremediği, elle bulunan çatışmalar: lx:Zuschlag (**Löhne**, **Lohn** ↔ notun **mehr Gehalt** ayrımı) ve lx:Spätschicht forms[1] (**Nachtschicht** ↔ lx:Nachtschicht kartının notu). Not başka sözcükle ya da komşu kartta yazıldığı için sözcük eşleşmesi yakalamıyor.

## Örneklem dışında görülenler (orana katılmadı)

H-3'ten sonra 165 `also_ok` girdisinin hepsi iki yönden ve artikel uyumu için elle okundu. Ad cevaplarında artikel uyumu yalnız **Personalbüro**'da bozuk.

**Düzeltilmeli:**

| kart | boşluk | sorun |
|---|---|---|
| lx:Personalabteilung | forms[0] `Die ___ ist im zweiten Stock.` | **Die Personalbüro**: artikel uymuyor (H-3) |
| lx:Personalabteilung | forms[2] `Schicken Sie den Antrag bitte an die ___.` | **an die Personalbüro**: artikel uymuyor (H-3) |
| lx:Personalabteilung | forms[3] `Ruf halt die ___ an.` | **die Personalbüro**: artikel uymuyor (H-3) |
| lx:Abrechnung | forms[0]–[3] | `also_ok: Rechnung(en)`. Kartın kendi notuyla çelişiyor (makine taraması) |
| lx:Zuschlag | forms[3] `… aber der ___ ist echt gut.` | `also_ok: Lohn`. H-2 ile aynı çelişki; **Bonus** yerinde |
| lx:Spätschicht | forms[1] `Ich arbeite lieber ___, dann kann ich morgens länger schlafen.` | `also_ok: Nachtschicht`. lx:Nachtschicht `mistakes_tr[1]`: "Gece vardiyası derken **Spätschicht** denmez." Öğrenci tersini yapınca onay alıyor. Çeviri "akşam vardiyası" diyor. Gece vardiyasından sonra "sabah daha uzun uyumak" da anlamsız. **spät**, **abends**, **nachmittags** yerinde |
| lx:grillen | forms[1] `Darf man auf dem Balkon Fleisch ___?` | `also_ok: braten`. H-4 ile aynı; balkonda et kızartmak da anlamsız |
| lx:Warteliste | mistakes_tr[1] | "**der Warteliste** ... yanlış". H-5 ile aynı sınıf. Aynı kartın `mistakes_tr[0]` notu "Almancada **auf der Warteliste** denir" diyor; ö3, ö5, eşdizim, ipucu ve forms[1] de **auf der Warteliste** |
| lx:klären | forms[0] `… am Telefon ___?` (halledebilir miyiz), forms[1] `dann ist das ___.` (halloldu) | H-1 ile aynı: **regeln**, **geregelt** eksik |

**Karar dilbilimcinin (sınırda, engel saymadım):**

| kart | boşluk | not |
|---|---|---|
| lx:Warteliste | forms[3] `also_ok: Wartezeiten` | **lange Wartezeiten** doğal, ama "bekleme süreleri" demek. Çeviri "bekleme listeleri". lx:Wartezeit kartı b1-01b'de var |
| lx:genehmigen | forms[0], [2], [3] `also_ok: erlaubt / erlauben` | **Können Sie meinen Urlaub erlauben?** doğal değil. Doğal söyleyiş **mir den Urlaub erlauben**. **bestätigen** yerinde |
| lx:absprechen | forms[1] `also_ok: besprochen` | Çeviri "ayarladık", yani karar verildi. Kartın `mistakes_tr[1]` notu konuşmak ile kararlaştırmak ayrımını öğretiyor (**gesprochen** / **abgesprochen**). **besprochen** de yalnız "konuştuk" demek |
| lx:einspringen | forms[1] `also_ok: gekommen` | **Derya ist für mich gekommen** önce "beni almaya geldi" diye okunur |
| lx:Nachzahlung | forms[0]–[2] `also_ok: Rechnung` | fatura ≠ fark ödemesi. **Warum ist die Rechnung so hoch?** başka bir soru |
| lx:abbuchen | forms[3] `also_ok: überwiesen` | Havale etmek, hesaptan çekilmekle aynı iş değil |
| lx:nebenan | forms[2] `also_ok: daneben` | **wer jetzt daneben wohnt** için dayanak yok, doğal değil. forms[0]'da **gleich daneben** olur |
| lx:Guthaben | forms[3] `also_ok: das Handy, mein Handy` | **das Handy aufladen** önce "şarj etmek" diye okunur. Ön ödemeli hatta "kontör yüklemek" anlamı da yerleşik |

## Karar

- Oran **5/87 = %5,75 > %2**. Kurala göre **dilbilimciye geri**.
- Örnek cümle, çeviri, eşdizim, ad ve fiil biçimleri temiz (46/46). Hataların dördü boşluklarda (30 boşlukta 4, %13,3). Bunların üçü bu turda eklenen `also_ok` girdileri, yanlış ya da başka anlamlı cevabı kabul ettiriyor (yön b). Önceki partinin 2. turundaki **streitet** hatasıyla aynı sınıf. Dördüncüsü eksik cevap (yön a).
- Önerilen iş:
  1. H-1–H-5'i ve "Düzeltilmeli" tablosundaki 13 alanı düzeltmek.
  2. 165 `also_ok` girdisini üç soruyla yeniden taramak: (i) cümleye konunca artikel ve çekim uyuyor mu? (ii) Türkçe çeviriyle aynı anlamı veriyor mu? (iii) Bu kartın ya da komşu kartın notu bu sözcüğü "değil" diye ayırıyor mu? (**Rechnung/Abrechnung**, **Lohn/Zuschlag**, **Spätschicht/Nachtschicht**, **braten/grillen**)
  3. **der X yanlış** biçimindeki artikel notlarını gözden geçirmek. Aynı dize kartta ya da öbür notta doğru olarak geçiyorsa (**auf der Warteliste**, **in der Nachbarschaft**), yanlış biçim bir cümle içinde gösterilsin. lx:Vertretung notu "erkek de olsa" bağlamıyla anlaşılıyor, kartta **der Vertretung** geçmiyor; dokunmak şart değil.
- 3. tur için: düzeltilen alanlar tek tek doğrulanır, ayrıca boşluklardan yeni bir örneklem alınır (en az 20 madde, yeni tohum).
- Okur kapısı geçti (2. tur 8/8). H-5 ile Warteliste notu değişirse yalnız bu iki not okura gider.
