# İnceleme: temel paket R0, dersler 06–10

İnceleyen: dilbilimci-ajan · 2026-11-18 · Sonuç: **AÇIK** (`review.status = "draft"`, `by` ve `at` dolduruldu)

Dosyalar: `content/v2/temel/r0-06-datum.json`, `r0-07-fragewoerter.json`, `r0-08-sein-haben.json`, `r0-09-modalverben.json`, `r0-10-buchstabieren.json`, `content/v2/temel/SOURCES.md` (06–10 bölümü eklendi).

Dil hataları kapandı. Dosyalar şu yüzden AÇIK kalıyor: karışık heceleme değerlendiricide çözülmeli, `{name}` yuvası ad ile soyadını ayırmıyor, ders 10 iki bölümde 24 öğe taşıyor (aşağıda "Açık maddeler").

## Sayılar

| Ders | İncelenen madde | Hatalı madde | Oran | accepted eklenen (madde / varyant) |
|---|---|---|---|---|
| 06 tarih | 96 | 5 | %5,2 | 9 / 26 |
| 07 soru kelimeleri | 95 | 5 | %5,3 | 7 / 11 |
| 08 sein, haben | 85 | 11 | %12,9 | 7 / 11 |
| 09 können, müssen | 85 | 11 | %12,9 | 10 / 36 |
| 10 heceleme | 109 | 16 | %14,7 | 3 / 9 |
| **Toplam** | **470** | **48** | **%10,2** | **36 / 93** |

Madde: öğretim öğesi, tablo satırı, alıştırma, yerleştirme maddesi, diyalog satırı, dinleme satırı ve sorusu, görev. Eksik `accepted` varyantları hata sayısına katılmadı, ayrı sütunda.

Hataların 31'i tek türden: öğretilmeden isteme (08'de 6, 09'da 4, 10'da 14 madde, ayrıca bunlara bağlı açıklamalar).

Denetim: `content:validate` → 0 hata, 59 uyarı (hepsi eski, kalıp uyarıları). Doğrulayıcı `content/v2/temel/` klasörünü okumuyor. Bu yüzden beş dosya ayrıca `Drill` şeması ve `explain.ts` OD-9 kurallarıyla elle çalıştırılan bir betikle denetlendi: 0 bulgu, her derste alıştırma ≥20, üretim ≥12, üretimde `accepted` ≥3, bölüm başına öğe ≤12.

## Ders 06, tarih

| Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|
| tablo başlığı | Hangi gün | Ne zaman | **am ersten** haftanın gününü değil tarihi verir; başlık ders 01 ile karışıyordu |
| `b:geburtsdatum` ipucu | **dritter Elfter** notu | not kaldırıldı, parçalar eklendi (Geburts, datum) | OD-9.2 madde 4: ipucu başka bir ifadeyi anlatıyordu |
| yeni öğe `b:dritter-elfter` | yok | **dritter Elfter**, 3 Kasım | d10, p02 ve dinleme bunu soruyor; artık ayrı öğe olarak öğretiliyor |
| diyalog, h2 çevirisi | Genau → Evet | Doğru | **Genau** onaydır, evet değil |
| h2 çevirisi | Bugün 25 Kasım, değil mi? | Bugün ayın yirmi beşi, değil mi? | Almancada ay söylenmiyor |

`accepted`: d24'te **Der siebte August 1990** reddediliyordu (değerlendirici 7 rakamını **sieben** yapıyor, sıra sayısına çevirmiyor); yazıyla gün ve rakamla yıl karışımları eklendi. **Heute haben wir den …** (ders 01'de öğretilen kalıp) d16, d18, d25, p04'e eklendi. d26, d27, d28, d14 için eksik doğal cevaplar eklendi.

Doğrulanan: 24.11.2026 salı, 25.11 çarşamba, 27.11 cuma, 1.12 salı, 2.12 çarşamba. **dem** ve **den** ikisi de doğru.

## Ders 07, soru kelimeleri

| Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|
| tablo, Welcher Tag? | Am Montag. | Montag. | **Welcher Tag?** sorusunun cevabı **am** almaz |
| d28 | telefonda **Hallo, ich bin es!** → **Wer ist das?** | Frau Brandl fotoğraf gösteriyor → **Wer ist das?** | Telefonda **Wer ist da?** denir; **da** henüz öğretilmedi. Fotoğraf WORLD hafta 5 ile uyumlu |
| h1 | muayenehane adresi: Stadtplatz, Nummer vier, birinci kat | adres çıkarıldı; arayan randevu gününü ve saatini soruyor (Dienstag, Donnerstag ayrımı) | WORLD'de muayenehanenin adresi yok; Stadtplatz şehir meydanı |
| h2 | Ioana: Romanyalı, istasyondaki otelde çalışıyor | konuşan adsız yeni komşu (Nachbarin) | WORLD'de Ioana'nın ülkesi ve işi yok |
| h2 soruları | Ioanaya, Ioanadan | Yeni komşuya, Yeni komşudan | kesmesiz özel ad yazım hatasıydı |
| diyalog çevirisi | Aman, hiçbir şey! | Yok canım, hiçbir şey! | doğal Türkçe |

`characters` listesinden `ch:popescu` çıkarıldı. `accepted`: d26'ya **Woher kommst du?** ve **Wo kommen Sie her?**; d16, d23, d29, p03'e **Wann ist mein Termin?**; d18, d30'a iki varyant.

Dokunulmadı: diyalogda öğrencinin hediye için **Was kostet das?** demesi. Yanlış bir model gibi durabilir ama WORLD'deki mizah çizgisine uyuyor; okur görsün.

## Ders 08, sein ve haben

| Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|
| 6 öğe (`ich-habe`, `hast-du`, `sie-hat`, `wir-haben`, `habt-ihr`, `haben-sie`) | `parcalar` boş | parçalar eklendi: **Ich habe** bende var, **Fieber** ateş, **Zeit** vakit, **einen Termin** bir randevu, **Hunger** açlık, **wir haben keine** bizde yok | **Fieber**, **Zeit**, **Hunger**, **Termin**, **keine** üretimde isteniyor (d15–d33) ama hiçbir yerde kelime olarak verilmiyordu. Parçalar iki kelimelik öbek olduğu için yanıltıcı kelime kelime çeviri yok |
| d11 | **Sie sind hier** cümlesinde büyük **Sie** kimdir? | **Sind Sie neu hier?** cümlesinde **Sie** kimdir? | Cümle başında **Sie** her zaman büyük yazılır; soru yanlış ipucu veriyordu |
| d20 | Bugün onun ateşi var. (erkek) | Onun bugün ateşi var. Bir erkekten söz ediyorsun. | parantezli not yerine cümle |
| d25 açıklama | **Zeit** gibi kelimelerde **keine** gelir. | **Zeit** ile **nicht** değil **keine** söylenir. | "gibi kelimeler" belirsiz |
| diyalog çevirisi | Ofiste mi? | Ofise geldi mi? | **schon** çevrilmemişti |
| h2 çevirisi | İznim var. | İzinliyim. | doğal Türkçe |

`accepted`: d17'ye **Ich bin hungrig** (doğru Almanca, reddediliyordu); d29, d30, d32'ye kısa **Nein** ve varyantlar; d15, d18, d31.

**müde** zaten parçayla öğretiliyordu. **du** biçimleri (**Bist du**, **Hast du**) öğretim öğesi olarak var; d22–d24 için ek gerekmedi.

## Ders 09, können, müssen, dürfen, wollen, sollen, möchten

| Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|
| `wollen-wir`, d06, d31, diyalog | üben → çalışmak | pratik yapmak | Aynı derste **arbeiten** de çalışmak; d31 "birlikte çalışmak istiyor, çalışman gerekiyor" diye okunuyordu |
| `ich-kann` ipucu, d13 açıklama | İkinci kelime en sona gider | **kann** ikinci sırada durur, **kommen** en sona gider | "ikinci kelime" yanlış anlaşılıyor |
| `sie-duerfen`, `ich-moechte` | `parcalar` boş | **nichts** hiçbir şey, **essen** yemek yemek; **einen Termin machen** randevu almak | **essen** d32'de, **Termin machen** d22, d27, d29'da isteniyor |
| yeni öğe `b:kannst-du` | yok | **Kannst du morgen kommen?** | **kannst** yalnızca tabloda vardı; d09 ve d28 istiyor, diyalogda da geçiyor |
| d18 | açıklama yok | **nicht** en sondaki **kommen** kelimesinden önce gelir. | bu sıra ilk kez burada isteniyor |
| d31 ilk cevap | Ich kann heute nicht, ich muss arbeiten. | Ich muss heute arbeiten. | ilk cevap öğretilen kalıpla kurulmalı |
| d32 durum | doktora soruyorsun | Yarın sabah kan tahlilin var. Yemek yemene izin var mı, sor. | soru cümlesi randevu saatini veren sekretere ait |
| h2 sorusu | Deryadan yardım, Deryanın arabasını | Yardım istiyor, Araba almak istiyor | kesmesiz özel ad yazım hatası |

`accepted`: d29 ve p05'e selamlı açılışlar ve **Ich brauche einen Termin**; d22, d23, d30, d31, d32, d33, d34, d35.

**warten** ve **anrufen** zaten parçayla öğretiliyordu, değişiklik gerekmedi.

## Ders 10, heceleme

| Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|
| öğretim | kod kelimelerinden yalnızca **Anton** ve **Aachen** | yeni b bölümü, 12 öğe: B/P, D/T, M/N, F/V, W, E/I, L/R, G/K, S/Z, U/Ü, H/O, Y. Öğe kişi adlı biçimi, `anlam_tr` şehir adlı biçimi verir | d21–d32, p04, p05 (14 üretim maddesi) yalnızca tabloda duran kodları istiyordu. Artık üretimde geçen 23 harfin hepsi öğretiliyor |
| `a:vorname` | Benim adım {name}. | Benim ön adım {name}. | **Name** öğesiyle aynı çeviriyi taşıyordu |
| d31 durum | Komşunun soyadı **Müller** | Telefonda bir soyadını soruyorlar: **Müller** | WORLD'de Müller adlı komşu yok |
| h2 | kurye, elindeki paketin üstündeki adı soruyor; Herr Kraus adres olarak Brunnengasse 7 diyor | kurye **Krause** diye okuyor, Herr Kraus düzeltip harf harf söylüyor; adres yok | Gerçeklik: kurye etiketteki adı sormaz. WORLD'de Kraus öğrencinin apartmanında oturmuyor |

`characters` listesine `ch:kraus` eklendi. `accepted`: d31'e **Doppel-L** içeren dört varyant; d20'ye **zwo** ile ve cümle içinde sözle okunuş; d15'e **Mein Name ist {name}**.

Tablo: 32 satır `content/v2/domains/telefon/SOURCES.md` kaydıyla tek tek karşılaştırıldı, fark yok. İkinci kontrol 18.11.2026'da iki bağımsız sayfayla yapıldı (adresleri `content/v2/temel/SOURCES.md` içinde). Okunuş sütunu doğru: **yot**, **fau**, **ve**, **üpsilon**, **tset**, **es-tset**. Değişiklik gerekmedi.

## Açık maddeler

1. **Karışık heceleme (değerlendirici ihtiyacı).** `judge()` normalleştirilmiş tam eşleşme arıyor. Altı harfli bir ad için iki tablonun karışımı 64, biçim farklarıyla 190'dan fazla dizgi eder; `accepted` listesine yazılamaz. Çevrimdışında **A wie Anton, K wie Köln** yanlış sayılıyor, çevrimiçinde yapay zekâya gidiyor. Gereken: harf yuvalı bir değerlendirme (her yuvada harf adı, kişi adı ya da şehir adı; **wie** isteğe bağlı; **Doppel-** iki yuva sayılır). O zamana kadar listeler yalnızca saf biçimleri taşıyor.
2. **`{name}` yuvası.** **Mein Name**, **Mein Vorname** ve **Mein Nachname** aynı değeri gösteriyor; d14 ile d15 aynı cevabı istiyor. Ayrı ad ve soyadı yuvası ya da ürün kararı gerekli.
3. **Ders 10 yükü.** İki bölümde 24 öğe var; kural bölüm başına 12 öğeyle tutuyor ama b bölümündeki her öğe iki ya da dört kod kelimesi taşıyor. Seçenek: üretimi az harfli adlara indirip b bölümünü 6–7 öğeye düşürmek. PM ve okur karar vermeli.
4. **Ders 10 diyaloğu.** Öğrenci **Ich buchstabiere** deyip harfleri söylemiyor (ad bilinmediği için). Memurun kendi şehrindeki **Brunnengasse** için yazılışı sorması pek gerçekçi değil. Dokunulmadı.
5. **Weihnachtsmarkt tarihi (06, h2).** 27 Kasım cuma açılış, WORLD §6 takvimine uyuyor; WORLD hafta 2 (30.11 haftası) ise "açılır" diyor. Baş geliştirici hangisinin geçerli olduğunu söylemeli.
6. **Doğrulayıcı kapsamı.** `content:validate` temel dersleri okumuyor: şema, OD-9, `accepted` ≥3 ve öğretmeden isteme kontrolü otomatik değil. Öğretmeden isteme bu incelemede elle yapıldı.
7. **Sözlük kimlikleri.** Derslerdeki bazı `lexeme` ve `requires` kimlikleri kayıtta bulunamadı: `lx:Dienstag`, `lx:Freitag`, `lx:Sonntag`, `lx:November`, `lx:übermorgen`, `lx:zwanzig`, `lx:hundert`, `lx:erster`, `lx:dritter`, `lx:vierter`, `lx:wie_viel`, `lx:Buchstabe`, `lx:Nachname`. Kimlik biçimi kayıtta farklı olabilir; lex ve baş geliştirici baksın.
8. **Kaynak notu.** **dem** ile **den** eşdeğerliği bu incelemede çevrimiçi kaynaktan yeniden açılmadı.

Kapsam dışı: **drei viertel zehn** (ders 05) öbür dilbilimcide.
