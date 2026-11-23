# lexicon-b1-01 örneklem kontrolü (b1-01a + b1-01b)

- Tarih: 2026-11-23 · Denetleyen: qa-ajan (Opus 5.5) · Sıra: yazar → dilbilimci (`lexicon-b1-01.md`) → okur (`okur/lexicon-b1-01.md`) → **örneklem**
- Girdi: `content/v2/registry/lexicon/batch-b1-01a.json` (26 kart) · `batch-b1-01b.json` (24 kart). İki dosya da `review.status: draft`, dilbilimci ve okur düzeltmeleri işlenmiş.
- **Karar: GERİ (dilbilimciye, dar kapsam).** Hata 2/83 = **%2,41** (eşik %2).

## Yöntem

Madde, kart alanı düzeyinde sayıldı. İki dosyada toplam 801 madde var:

| tür | evren | örneklem |
|---|---|---|
| örnek cümle + çeviri (`examples[]`) | 276 | 28 |
| eşdizim (`collocations[]`) | 193 | 20 |
| boşluk (`forms[]`: cümle, cevap, `also_ok`, çeviri, ipucu) | 195 | 20 |
| hata notu (`mistakes_tr[]`) | 97 | 10 |
| ad: `art` + `pl` + `tr` | 25 | 3 |
| fiil: `verb` biçimleri + `tr` | 15 | 2 |
| **toplam** | **801** | **83 (%10,4)** |

Seçim katmanlı ve tekrarlanabilir. **Tohum: `20261123`.** Her türden `ceil(evren × 0,10)` madde seçildi. Liste iki dosyada sırayla (önce a, sonra b; kart sırası, alan içi dizin sırası) kuruldu. Tek bir `random.Random(20261123)` sırasıyla `ex, coll, form, mis, noun, verb` için `rng.sample(range(len(evren)), m)` çağrıldı. Python 3, standart `random`. Örneklem 48 madde a dosyasından, 35 madde b dosyasından.

Her maddede bakılanlar:
1. Almanca doğru ve doğal mı, katmanına (hd / alltag) uyuyor mu?
2. Türkçe çeviri doğru mu?
3. Boşluğun Türkçe çeviriyle birlikte tek doğru cevabı var mı? Ya da başka doğru cevaplar `also_ok`'ta mı?
4. Açıklamada dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı ya da öğrencinin ağzında sabit cinsiyet var mı?
5. Karakterler WORLD ile uyumlu mu? Frau Huber muayenehane sekreteri, Dr. Weber aile hekimi.

## Madde listesi

Kısaltmalar: D = doğru · H = hata.

| # | dosya | kart | alan | sonuç | not |
|---|---|---|---|---|---|
| 1 | a | lx:Ansicht | examples[0] | D | |
| 2 | a | lx:Ansicht | examples[3] | D | **Ansichtssache** = bakış açısına bağlı |
| 3 | a | lx:sinnvoll | examples[5] | D | |
| 4 | a | lx:diskutieren | examples[3] | D | |
| 5 | a | lx:Umfrage | examples[1] | D | |
| 6 | a | lx:Hauptsache | examples[1] | D | |
| 7 | a | lx:kritisieren | examples[3] | D | **halt** = işte |
| 8 | a | lx:Meldung | examples[3] | D | |
| 9 | a | lx:Bericht | examples[2] | D | |
| 10 | a | lx:Überschrift | examples[0] | D | |
| 11 | a | lx:aktuell | examples[3] | D | |
| 12 | a | lx:angeblich | examples[4] | D | |
| 13 | a | lx:sinken | examples[5] | D | |
| 14 | a | lx:Einwohner | examples[0] | D | "60.000 nüfusu var" gündelik Türkçede geçer |
| 15 | a | lx:Studie | examples[1] | D | |
| 16 | a | lx:insgesamt | examples[0] | D | |
| 17 | b | lx:Ursache | examples[1] | D | |
| 18 | b | lx:harmlos | examples[4] | D | |
| 19 | b | lx:nachfragen | examples[2] | D | |
| 20 | b | lx:Diagnose | examples[2] | D | |
| 21 | b | lx:Augenarzt | examples[4] | D | |
| 22 | b | lx:frühestens | examples[1] | D | |
| 23 | b | lx:kurzfristig | examples[0] | D | |
| 24 | b | lx:eilig | examples[2] | D | **Sorry** Almanca gündelik konuşmada yerleşik |
| 25 | b | lx:ausstellen | examples[1] | D | Reçeteyi sekreterin hazırlaması gerçekçi (ö3 "vorne" ile tutarlı) |
| 26 | b | lx:Klinik | examples[0] | D | |
| 27 | b | lx:Klinik | examples[3] | D | **im zweiten Stock** = ikinci kat, iki dilde aynı sayım |
| 28 | b | lx:Hinweis | examples[0] | D | |
| 29 | a | lx:sinnvoll | collocations[0] | D | |
| 30 | a | lx:kritisieren | collocations[1] | D | okur düzeltmesi yerinde |
| 31 | a | lx:Vorfall | collocations[2] | D | |
| 32 | a | lx:erhöhen | collocations[3] | D | |
| 33 | a | lx:Einwohner | collocations[2] | D | okur düzeltmesi yerinde |
| 34 | a | lx:Studie | collocations[2] | D | okur düzeltmesi yerinde |
| 35 | a | lx:Experte | collocations[0] | D | **steigen** → "artacağını": Almanca şimdiki zaman gelecek anlamı da taşır |
| 36 | a | lx:Experte | collocations[3] | D | |
| 37 | b | lx:Behandlung | collocations[0] | D | |
| 38 | b | lx:Behandlung | collocations[3] | D | |
| 39 | b | lx:Medikament | collocations[2] | D | |
| 40 | b | lx:Wirkung | collocations[3] | D | |
| 41 | b | lx:nachfragen | collocations[0] | D | |
| 42 | b | lx:Diagnose | collocations[1] | D | |
| 43 | b | lx:Wartezeit | collocations[1] | D | |
| 44 | b | lx:Wartezeit | collocations[2] | D | muayenehane duyurularında geçen kalıp |
| 45 | b | lx:nachsehen | collocations[1] | D | |
| 46 | b | lx:eilig | collocations[1] | D | |
| 47 | b | lx:Klinik | collocations[2] | D | |
| 48 | b | lx:Brille | collocations[1] | D | |
| 49 | a | lx:zustimmen | forms[3] | D | çeviri cevabı tek kılıyor |
| 50 | a | lx:sinnvoll | forms[2] | D | **gute** çeviriyle eleniyor |
| 51 | a | lx:Meldung | forms[0] | D | `also_ok: Nachricht` yerinde |
| 52 | a | lx:Ereignis | forms[3] | D | **das** ile **Vorfall** eleniyor |
| 53 | a | lx:angeblich | forms[0] | D | |
| 54 | a | lx:streiken | forms[0] | D | |
| 55 | a | lx:Zeuge | forms[0] | D | |
| 56 | a | lx:Zeuge | forms[3] | D | |
| 57 | a | lx:stattfinden | forms[0] | D | |
| 58 | a | lx:Experte | forms[1] | D | Basti WORLD uyarlamasıyla tutarlı |
| 59 | b | lx:Untersuchung | forms[0] | D | |
| 60 | b | lx:Medikament | forms[0] | D | **dieses** cinsi tek cevaba indiriyor |
| 61 | b | lx:einnehmen | forms[3] | D | dilbilimci düzeltmesi (**Meine Mutter**) yerinde |
| 62 | b | lx:Wirkung | forms[1] | D | |
| 63 | b | lx:Facharzt | forms[0] | D | **Augenarzt** çeviriyle eleniyor |
| 64 | b | lx:nachsehen | forms[0] | D | |
| 65 | b | lx:zurzeit | forms[1] | **H** | aşağıda H-1 |
| 66 | b | lx:möglichst | forms[0] | D | "bir an önce" = **möglichst bald** |
| 67 | b | lx:abwarten | forms[1] | **H** | aşağıda H-2 |
| 68 | b | lx:Brille | forms[0] | D | |
| 69 | a | lx:Vorfall | mistakes_tr[0] | D | |
| 70 | a | lx:aktuell | mistakes_tr[1] | D | cümlede fiil ikinci sırada kuralı; gerçek bir hata |
| 71 | b | lx:harmlos | mistakes_tr[1] | D | |
| 72 | b | lx:einnehmen | mistakes_tr[0] | D | |
| 73 | b | lx:Augenarzt | mistakes_tr[0] | D | |
| 74 | b | lx:aufnehmen | mistakes_tr[1] | D | |
| 75 | b | lx:nachsehen | mistakes_tr[0] | D | |
| 76 | b | lx:möglichst | mistakes_tr[0] | D | |
| 77 | b | lx:ausstellen | mistakes_tr[1] | D | |
| 78 | b | lx:abwarten | mistakes_tr[0] | D | |
| 79 | a | lx:Umfrage | art/pl | D | die, Umfragen |
| 80 | b | lx:Behandlung | art/pl | D | die, Behandlungen |
| 81 | b | lx:Brille | art/pl | D | die, Brillen |
| 82 | a | lx:diskutieren | verb | D | diskutiert · diskutierte · hat diskutiert · über+Akk, mit+Dat |
| 83 | b | lx:ausstellen | verb | D | stellt aus · stellte aus · hat ausgestellt · ayrılan **aus** · akk, dat |

Açıklama alanlarında (ipucu ve hata notları, 30 metin) dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı bulunmadı. Öğrencinin ağzında sabit cinsiyet de yok.

## Hatalar

İki hata da aynı türden: **haksız ret** (D-064 ruhu, dilbilimcinin lx:Ansicht ve lx:einnehmen düzeltmeleriyle aynı sınıf). Doğru ve sık bir cevap `also_ok`'ta yok.

**H-1 · lx:zurzeit forms[1]** (b1-01b)
`Die Praxis ist ___ geschlossen.` · tr "Muayenehane şu an kapalı." · `also_ok: im Moment, momentan, derzeit, gerade`
Eksik cevap: **jetzt**. "Şu an" çevirisine en doğrudan A1 karşılığı. **gerade** kabul edilip **jetzt**'in reddedilmesi tutarsız. Kayıtta emsal var: batch-002 lx:nun ve lx:gerade boşlukları **jetzt**'i `also_ok`'ta kabul ediyor.

**H-2 · lx:abwarten forms[1]** (b1-01b)
`Sie müssen noch ein paar Tage ___.` · tr "Birkaç gün daha beklemeniz gerekiyor." · `also_ok` yok
Eksik cevap: **warten**. "Sie müssen noch ein paar Tage warten." aynı ölçüde doğru ve daha sık. Çeviri iki fiili ayırmıyor. lx:einnehmen'de aynı durum **nehmen** / **genommen** ile düzeltilmişti.

## Örneklem dışında aynı sınıftan görülenler

H-2'den sonra ayrılan fiillerin bütün boşlukları (36) tarandı. Bunlar orana katılmadı:

| kart | boşluk | eksik `also_ok` |
|---|---|---|
| lx:zurzeit | forms[0] `___ sind alle Leitungen besetzt.` | **Jetzt** |
| lx:zurzeit | forms[2] `Nein, er ist ___ im Urlaub.` | **jetzt** |
| lx:abwarten | forms[3] `Wir haben zwei Wochen ___.` | **gewartet** |
| lx:nachfragen | forms[0] `Darf ich noch mal ___?` | **fragen** (çeviri "Bir daha sorabilir miyim?" tam karşılık) |
| lx:nachfragen | forms[1] `Ich habe beim Arzt ___.` | **gefragt** |

## Karar

- Oran **2/83 = %2,41 > %2**. Kurala göre **dilbilimciye geri**.
- Kapsam dar. Almanca, çeviri, eşdizim, hata notu, ad ve fiil biçimlerinde örneklem hatasız (81/81). İki hata da `also_ok` eksiği ve aynı sınıftan.
- Önerilen iş:
  1. H-1 ve H-2'yi düzeltmek, yukarıdaki beş örneklem dışı boşluğu da düzeltmek.
  2. 195 boşluğun hepsini tek soruyla taramak: "Kartın kökü ya da daha sık bir eş anlamlı aynı çeviriyle boşluğa giriyor mu?"
  3. Ardından yalnızca boşluklardan yeni bir örneklem (en az 20 madde) almak.
- `review.status` için okur kapısı ayrıca geçerli: okur 2. turda b1-01b'de lx:zurzeit `exp.ipucu_tr` için GERİ vermişti. Dilbilimci raporundaki son satır bu ipucunun düzeltildiğini gösteriyor. Okurun 3. tur onayı kayıtta yok.
