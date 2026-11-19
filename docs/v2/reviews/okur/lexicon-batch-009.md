# Okur kontrolü — lexicon parti 009 (OD-9.3)

Girdi: `batch-009.view.jsonl` (65 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı.

`parcalar` soldan sağa okundu (13 kart): hepsinde çıkan Türkçe, kelimenin anlamını veriyor.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:Adresse | hepsi | birinin oturduğu yer, sokak ve numara | GEÇTİ | |
| lx:neun | mistakes_tr[0] | sayıdan sonra kelime değişiyor galiba | GERİ | terim var: "çoğul" ne demek bilmiyorum |
| lx:neun | diğer alanlar | dokuz sayısı | GEÇTİ | |
| lx:Wochenende | hepsi | cumartesi ile pazar, hafta sonu | GEÇTİ | |
| lx:Nachmittag | hepsi | öğleden akşama kadarki zaman | GEÇTİ | |
| lx:Sommer | hepsi | en sıcak mevsim, yaz | GEÇTİ | |
| lx:Freitag | hepsi | hafta sonundan önceki gün, cuma | GEÇTİ | |
| lx:Sonntag | hepsi | haftanın son günü, pazar | GEÇTİ | |
| lx:zwölf | mistakes_tr[0] | sayıdan sonra kelime değişiyor galiba | GERİ | terim var: "çoğul" ne demek bilmiyorum |
| lx:zwölf | diğer alanlar | on iki sayısı | GEÇTİ | |
| lx:Samstag | hepsi | hafta sonunun ilk günü | GEÇTİ | |
| lx:Montag | hepsi | haftanın ilk iş günü | GEÇTİ | |
| lx:dritter | hepsi | sırada üçüncü ya da ayın üçü | GEÇTİ | |
| lx:Winter | hepsi | en soğuk mevsim, kış | GEÇTİ | |
| lx:Mittag | hepsi | günün ortası, öğle | GEÇTİ | |
| lx:April | hepsi | dördüncü ay, nisan | GEÇTİ | |
| lx:elf | hepsi | on bir sayısı, tek kelime | GEÇTİ | |
| lx:Viertel | hepsi | on beş dakika ya da mahalle | GEÇTİ | |
| lx:hundert | hepsi | yüz sayısı | GEÇTİ | |
| lx:Dienstag | hepsi | haftanın ikinci günü, salı | GEÇTİ | |
| lx:Donnerstag | hepsi | haftanın dördüncü günü, perşembe | GEÇTİ | |
| lx:Mai | hepsi | beşinci ay, mayıs | GEÇTİ | |
| lx:August | hepsi | sekizinci ay, ağustos | GEÇTİ | |
| lx:Juli | hepsi | yedinci ay, temmuz | GEÇTİ | |
| lx:Mittwoch | hepsi | haftanın ortasındaki gün, çarşamba | GEÇTİ | |
| lx:September | hepsi | dokuzuncu ay, eylül | GEÇTİ | |
| lx:Juni | hepsi | altıncı ay, haziran | GEÇTİ | |
| lx:Telefonnummer | ipucu_tr | telefonda iki başka türlü söylenir | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta geçmiyor |
| lx:Telefonnummer | diğer alanlar | birini aramak için numara | GEÇTİ | |
| lx:Oktober | hepsi | onuncu ay, ekim | GEÇTİ | |
| lx:Frühling | hepsi | kıştan sonraki mevsim, ilkbahar | GEÇTİ | |
| lx:Nachname | hepsi | ailenin ortak adı, soyadı | GEÇTİ | |
| lx:Vorname | hepsi | soyadından önceki ad | GEÇTİ | |
| lx:Datum | hepsi | gün, ay ve yıl birlikte | GEÇTİ | |
| lx:zwanzig | hepsi | yirmi sayısı | GEÇTİ | |
| lx:November | hepsi | on birinci ay, kasım | GEÇTİ | |
| lx:Dezember | hepsi | yılın son ayı, aralık | GEÇTİ | |
| lx:März | hepsi | üçüncü ay, mart | GEÇTİ | |
| lx:übermorgen | hepsi | yarından sonraki gün | GEÇTİ | |
| lx:Herbst | hepsi | yazdan sonraki mevsim, sonbahar | GEÇTİ | |
| lx:Buchstabe | hepsi | alfabedeki tek işaret, harf | GEÇTİ | |
| lx:Januar | hepsi | yılın ilk ayı, ocak | GEÇTİ | |
| lx:Februar | hepsi | ikinci ay, şubat | GEÇTİ | |
| lx:Uhrzeit | mistakes_tr[0] | saati sorarken başka bir söz denir | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta geçmiyor |
| lx:Uhrzeit | diğer alanlar | bir şeyin saat kaçta olduğu | GEÇTİ | |
| lx:null | hepsi | sıfır sayısı | GEÇTİ | |
| lx:eins | ipucu_tr | bir insanın adından önce mi | GERİ | terim var: "isim" burada kişi adı mı başka şey mi, anlamadım |
| lx:eins | diğer alanlar | bir sayısı | GEÇTİ | |
| lx:dreizehn | hepsi | on üç sayısı | GEÇTİ | |
| lx:vierzehn | hepsi | on dört sayısı | GEÇTİ | |
| lx:fünfzehn | mistakes_tr[0] | sayıdan sonra kelime değişiyor galiba | GERİ | terim var: "çoğul" ne demek bilmiyorum |
| lx:fünfzehn | diğer alanlar | on beş sayısı | GEÇTİ | |
| lx:sechzehn | ipucu_tr | bir s harfi yazılmıyor | GERİ | anlamadım: kelime zaten s ile başlıyor, hangi s yazılmıyor belli değil |
| lx:sechzehn | diğer alanlar | on altı sayısı | GEÇTİ | |
| lx:siebzehn | hepsi | on yedi sayısı | GEÇTİ | |
| lx:achtzehn | hepsi | on sekiz sayısı | GEÇTİ | |
| lx:neunzehn | hepsi | on dokuz sayısı | GEÇTİ | |
| lx:einundzwanzig | hepsi | yirmi bir, önce bir söylenir | GEÇTİ | |
| lx:dreißig | hepsi | otuz sayısı | GEÇTİ | |
| lx:vierzig | hepsi | kırk sayısı | GEÇTİ | |
| lx:fünfzig | hepsi | elli sayısı | GEÇTİ | |
| lx:sechzig | hepsi | altmış sayısı | GEÇTİ | |
| lx:siebzig | hepsi | yetmiş sayısı | GEÇTİ | |
| lx:achtzig | hepsi | seksen sayısı | GEÇTİ | |
| lx:neunzig | hepsi | doksan sayısı | GEÇTİ | |
| lx:erster | hepsi | sırada en baştaki ya da ayın biri | GEÇTİ | |
| lx:vierter | hepsi | sırada dördüncü ya da ayın dördü | GEÇTİ | |
| lx:Vormittag | hepsi | sabahtan öğlene kadarki zaman | GEÇTİ | |
| lx:vorgestern | hepsi | dünden önceki gün | GEÇTİ | |
| lx:wie_viel | hepsi | miktar ya da fiyat sormak | GEÇTİ | |
| lx:möchten | hepsi | bir şeyi kibarca istemek | GEÇTİ | |
| lx:buchstabieren | hepsi | kelimeyi harf harf söylemek | GEÇTİ | |

## Sonuç

- Toplam alan: 300
- GEÇTİ: 293
- GERİ: 7 alan, 7 kart
- GERİ kimlikleri: lx:neun, lx:zwölf, lx:fünfzehn, lx:eins, lx:Telefonnummer, lx:Uhrzeit, lx:sechzehn

Tek bir GERİ olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
