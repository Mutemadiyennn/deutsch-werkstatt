# Okur raporu: lexicon-batch-a2-09 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-09.json`, 26 kart (okul yılları ve çocukluk, göç ve aile tarihi, okul ve iş hayatı, sağlık, sonu -heit/-keit/-ung olan sözler, sipariş). İlk okur turu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **608 alan**. Bütün satırlar betikle döküldü ve hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (a2-08'in sık GERİ'leri): hata notunun sonunda açıklamasız ek, "bu kelime X ile gelir" gibi genel kural sanılan ipucu, Türkçe cümlede tırnak içinde Almanca, bir alanda iki fikir, yanlışla doğru arasında açıklanmayan ikinci fark. Ayrıca: Türkçe ipucu sözünün Almanca kalın parçayla örtüşmesi, 14 kelime.
- Tarama sonucu: **=**, **;**, üç nokta, tırnak içinde Almanca ve dilbilgisi terimi yok. En uzun cümle 13 kelime. Betiğin uyarıları yanlış alarm: kesme işareti yer adlarında (Almanya'ya, Münih'e…), "hâlâ", "hâli", "ek" harf dizisi (meslek, ekmek, gerek…), "eril" (verildiyse). a2-08'deki "hata notunun sonunda açıklamasız ek" bu partide hiç yok.

## GERİ satırları

| kart.alan | açıklama | kendi sözlerimle | karar | neden ve öneri |
|---|---|---|---|---|
| `lx:Geburt.mistakes_tr[0]` | Doğum günün ne zaman derken **Wann ist deine Geburt?** yanlış. Doğrusu **Wann hast du Geburtstag?** | Doğum günü için **Geburt** değil **Geburtstag** denir. Ama cümlenin başı da değişmiş: **ist deine** gitmiş, **hast du** gelmiş. | GERİ | Yanlışla doğru arasında açıklanmayan ikinci fark. Okur **Wann ist dein Geburtstag?** demenin de yanlış olup olmadığını soruyor. Öneri: cümlenin başı iki yanda aynı kalsın, tek fark **Geburt** / **Geburtstag** olsun. |
| `lx:Schulabschluss.forms[0].hint_tr` | Okul diploması derken **ihren Schulabschluss** denir. | Okul diploması dediğimde hep **ihren Schulabschluss** mı diyeceğim? | GERİ | a2-08'deki **Ihre**/**meine** sorununun aynısı: genel kural gibi okunuyor ve kartla çelişiyor. Aynı kartta **den**, **deinen Schulabschluss** da var. **ihren** sözünün "onun (kadın)" olduğu söylenmiyor, Türkçe cümlede (2005 yılında okulu bitirdi) "diploma" sözü de yok. Öneri: ipucunu cümledeki söze bağlamak, örneğin "Kadın için okulunu bitirdi derken **ihren Schulabschluss** denir." |
| `lx:Universität.forms[2].hint_tr` | Yıldan önce **Im Jahr 2012** denir. | "Bir yıldan önce" mi? Kalın yazıda yıl zaten var. Sanırım yılın önüne **Im Jahr** geliyor. | GERİ | "Yıldan önce" zaman olarak da okunuyor (o yıldan önceki bir zaman). Tek okumada anlaşılmadı. Öneri: "2012 yılında derken **Im Jahr 2012** denir." |
| `lx:Azubi.examples[2].tr` | Yeni gelen çırak, nasıl yapıldığını ona bir göster. | Önce yeni çırağa sesleniyor sandım. Sonra "ona" görünce başka birine söylediğini anladım. | GERİ | Virgül cümleyi bir seslenme gibi gösteriyor: "Ey yeni çırak…". Almancası (Der Neue ist Azubi) "yeni gelen çırak" bilgisini veriyor. Tek okumada anlaşılmadı. Öneri: "Yeni gelen çırak. Ona nasıl yapıldığını bir göster." |
| `lx:Kleinigkeit.forms[3].hint_tr` | Sadece biraz derken **Nur eine Kleinigkeit** denir. | "Sadece biraz" her yerde **Nur eine Kleinigkeit** mi? O zaman "sadece biraz Almanca biliyorum" da böyle mi? | GERİ | Genel kural gibi okunuyor ve yanlış genelliyor. Burada anlam yemekle ilgili: "bir şeyler atıştırırım". Öneri: ipucunu yemeğe bağlamak, örneğin "Yemekte sadece biraz derken **Nur eine Kleinigkeit** denir." |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GEÇTİ | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|---|
| `lx:Schulzeit` | 25 | 25 | 0 | Okula gittiğim bütün yıllar. |
| `lx:Heimweh` | 25 | 25 | 0 | Uzaktayken evimi, ailemi, memleketimi özlemem. |
| `lx:Spielplatz` | 24 | 24 | 0 | Salıncaklı, kaydıraklı çocuk parkı. |
| `lx:schneien` | 23 | 23 | 0 | Kar yağmak. Başına **es** gelir. |
| `lx:Taschengeld` | 24 | 24 | 0 | Anne babanın çocuğa düzenli verdiği küçük para, harçlık. |
| `lx:Schlitten` | 22 | 22 | 0 | Karda kaymak için oturulan kızak. |
| `lx:Märchen` | 22 | 22 | 0 | Prensli, cadılı, konuşan hayvanlı masal. |
| `lx:Geburt` | 22 | 21 | 1 | Bebeğin dünyaya gelmesi, doğum. Doğum günü değil. |
| `lx:berühmt` | 23 | 23 | 0 | Çok kişinin tanıdığı, ünlü. |
| `lx:auswandern` | 25 | 25 | 0 | Ülkemi bırakıp yaşamak için başka ülkeye gitmek. |
| `lx:Enkel` | 22 | 22 | 0 | Çocuğumun çocuğu, torun. |
| `lx:entdecken` | 22 | 22 | 0 | Bilmediğim bir şeyi bulmak, keşfetmek. |
| `lx:Generation` | 22 | 22 | 0 | Aynı yıllarda doğanların hepsi, kuşak. |
| `lx:Vergangenheit` | 23 | 23 | 0 | Geride kalan zaman, geçmiş. |
| `lx:Schulabschluss` | 24 | 23 | 1 | Okulu bitirince aldığım diploma. |
| `lx:Universität` | 22 | 21 | 1 | Liseden sonra gidilen yüksek okul. Konuşurken **die Uni**. |
| `lx:Praktikum` | 22 | 22 | 0 | Bir işi öğrenmek için kısa süre çalışmak, staj. |
| `lx:Azubi` | 22 | 21 | 1 | İş yerinde meslek öğrenen kişi, çırak. |
| `lx:Rentner` | 22 | 22 | 0 | Artık çalışmayıp emekli maaşı alan kişi. |
| `lx:Jahrzehnt` | 24 | 24 | 0 | On yıllık zaman. |
| `lx:Gesundheit` | 25 | 25 | 0 | Sağlık. Biri hapşırınca da bunu söylerim. |
| `lx:Krankheit` | 25 | 25 | 0 | İnsanı hasta eden şey, hastalık. |
| `lx:Kleinigkeit` | 24 | 23 | 1 | Küçük, önemsiz bir şey. |
| `lx:Neuigkeit` | 25 | 25 | 0 | Yeni duyduğum ya da anlattığım haber. |
| `lx:Übung` | 25 | 25 | 0 | Öğrenmek için yaptığım alıştırma, pratik. |
| `lx:Bestellung` | 24 | 24 | 0 | Dükkândan, restorandan, internetten istediğim şey, sipariş. |

Karar değiştirmeyen notlar:
- `lx:Gesundheit.mistakes_tr[1]`, `lx:Krankheit.mistakes_tr[1]`, `lx:Kleinigkeit.mistakes_tr[0]`, `lx:Neuigkeit.mistakes_tr[1]`: "Sonu **-heit**/**-keit** olan kelimeler hep **die** ile gelir." Bu genel bir kural, ama doğru ve açıkça kural olarak söyleniyor. Kartla da çelişmiyor. GEÇTİ.
- `lx:berühmt.mistakes_tr[1]` (**mit seinem** yerine **für sein**) ve `lx:Krankheit.mistakes_tr[0]` (**Ich habe Krankheit** yerine **Ich bin krank**) düzeltmelerinde ikinci bir değişiklik var. Ama bu değişiklik ilk düzeltmeden kaçınılmaz olarak geliyor, ayrıca bir hata değil. Okuru şaşırtmıyor. GEÇTİ. `lx:Geburt.mistakes_tr[0]` ise farklı: oradaki ikinci fark gerekmiyordu.
- `lx:Azubi.forms[1].hint_tr` "Çırak derken **ist Emre Azubi** denir." ve `lx:Kleinigkeit.forms[1].hint_tr` "Küçük derken **Das Geschenk ist klein** denir.": kalın parça Türkçe sözden geniş. İçinde özel bir ad ya da nesne olduğu için genel kural gibi okunmuyor. GEÇTİ. Yine de "Emre çırak derken…" daha düzgün olurdu.
- `lx:Geburt.examples[2].tr` ve `forms[3].tr` "Doğumdan beri küçük geceleri uyumuyor": ilk bakışta "küçük geceler" diye okunabiliyor. "Doğumdan beri" bağlamı bebeği anlatıyor, GEÇTİ. "Bebek" ya da "küçüğümüz" daha net olurdu.
- `lx:auswandern.forms[2].hint_tr` "Göç ettiler derken…" diyor, cümlede ise "göç etti" yazıyor. Anlam kayması yok, GEÇTİ.
- `lx:auswandern.exp.ipucu_tr`: konuşma ve yazı biçimini yan yana gösteriyor, kişi de değişiyor (**Ich** / **Er**). Tek bir karşılaştırma olarak okunuyor, GEÇTİ.
- `lx:Taschengeld.mistakes_tr[0]` "Sana verildiyse doğrusu…": koşul doğru yeri gösteriyor (almak/verilmek). GEÇTİ.
- `lx:Azubi.mistakes_tr[0]` ve `lx:Rentner.mistakes_tr[0]` iki doğru seçenek veriyor. İkisi de aynı fikre (doğru söyleyiş) hizmet ediyor, GEÇTİ.
- `lx:Übung.forms[2].hint_tr` "kalıp olarak söylenir": "kalıp" gündelik Türkçe, terim gibi durmuyor. GEÇTİ.

## Sayılar

- Toplam: 608
- GEÇTİ: 603
- GERİ: 5

GERİ kimlikleri: `lx:Geburt.mistakes_tr[0]`, `lx:Schulabschluss.forms[0].hint_tr`, `lx:Universität.forms[2].hint_tr`, `lx:Azubi.examples[2].tr`, `lx:Kleinigkeit.forms[3].hint_tr`

GERİ olduğu için batch-a2-09 "reviewed" sayılamaz (OD-9.4). Düzeltmeden sonra yalnız bu 5 alan yeniden okunur.

## Fark turu (2026-11-23): düzeltilen 5 alan

| kart.alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| `lx:Geburt.mistakes_tr[0]` | Doğum günün ne zaman derken **Wann hast du Geburt?** yanlış. Doğrusu **Wann hast du Geburtstag?** | Doğum günü için **Geburt** değil **Geburtstag** denir. | GEÇTİ | Cümlenin başı iki yanda aynı (**Wann hast du**). Tek fark var: **Geburt** yerine **Geburtstag**. |
| `lx:Schulabschluss.forms[0].hint_tr` | Kadın için okulunu bitirdi derken **ihren Schulabschluss** denir. | Bir kadın okulunu bitirdi derken **ihren Schulabschluss** derim. | GEÇTİ | Artık cümledeki söze ve kadına bağlı. Genel kural gibi okunmuyor, kartla çelişmiyor. 9 kelime. |
| `lx:Universität.forms[2].hint_tr` | 2012 yılında derken **Im Jahr 2012** denir. | "2012 yılında" için **Im Jahr 2012** derim. | GEÇTİ | Belirsiz "yıldan önce" sözü gitmiş. Cümleyle örtüşüyor. |
| `lx:Azubi.examples[2].tr` | Yeni gelen çırak. Ona nasıl yapıldığını bir göster. | Yeni gelen kişi çırak. Ona işin nasıl yapıldığını göster. | GEÇTİ | Seslenme gibi okunmuyor. İki kısa cümle, tek okumada anlaşılıyor. |
| `lx:Kleinigkeit.forms[3].hint_tr` | Yemekte sadece biraz derken **Nur eine Kleinigkeit** denir. | Yemek teklif edilince "sadece biraz" için **Nur eine Kleinigkeit** derim. | GEÇTİ | Yemeğe bağlandı, yanlış genellemiyor. 8 kelime. |

### Fark turu sayıları

- Okunan satır: 5
- GEÇTİ: 5
- GERİ: 0

Fark turunda GERİ kalmadı. Okur kapısı (OD-9.3) açısından batch-a2-09 "reviewed" olabilir (bütün turlar: 608 alan, açık GERİ yok).
