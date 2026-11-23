# Okur raporu: lexicon-batch-a2-12 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-12.json`, 15 kart (randevu iptali, telefon numarası ve sesli mesaj, doktorda muayene ve rapor, yazdırma ve çıktı, zarf, kasada müşteri kartı, rezervasyon, dönüş yolculuğu, keyif, laflamak, kadeh kaldırmak). Dilbilimci turundan sonra ilk okur turu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **335 alan**. Bütün satırlar betikle döküldü ve hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (a2-10 ve a2-11'in GERİ türleri): aynı Türkçe sözün kartta açıklamasız iki Almanca karşılığı, Türkçe sözde olmayan bir parçanın Almancada çıkması, hata notunda açıklanmayan ikinci fark, yarım kalan kalıp, virgülle yanlış bağlanan durumlar, 14 kelime.
- Tarama sonucu: **=**, **;**, üç nokta, tırnak içinde Almanca ve dilbilgisi terimi yok. En uzun açıklama cümlesi 14 kelime (`lx:Rückfahrt.exp.ipucu_tr`, sınırda, geçer). Betiğin kesme işareti uyarıları yer ve kişi adlarında (Almanya'da, Münih'te, Derya'ya), yanlış alarm.

## GERİ satırları

| kart.alan | açıklama | kendi sözlerimle | karar | neden ve öneri |
|---|---|---|---|---|
| `lx:anstoßen.mistakes_tr[1]` | Kadeh kaldırıyoruz derken **Wir anstoßen auf dich** yanlış. Doğrusu **Wir stoßen auf dich an**. | "Kadeh kaldırıyoruz" için **Wir stoßen auf dich an** mı denir? **auf dich** nereden geldi? Bir üst satırda aynı Almanca "Senin şerefine kadeh kaldırıyoruz" idi. | GERİ | Türkçe sözde olmayan bir parça (**auf dich**, "senin şerefine") Almancada var (a2-10 `lx:Temperatur` **seit gestern** ile aynı tür). Okur "kadeh kaldırıyoruz" derken hep **auf dich** gerektiğini sanabilir. Öneri: "Senin şerefine kadeh kaldırıyoruz derken **Wir anstoßen auf dich** yanlış. Doğrusu **Wir stoßen auf dich an**." Ya da Almancadan **auf dich** çıkarılsın: **Wir anstoßen** yanlış, **Wir stoßen an** doğru. |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GEÇTİ | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|---|
| `lx:dazwischenkommen` | 24 | 24 | 0 | Beklenmedik bir işin planıma engel olması, araya bir iş girmesi. |
| `lx:Ziffer` | 21 | 21 | 0 | Bir numaradaki tek rakam, sıfırdan dokuza. |
| `lx:Mailbox` | 21 | 21 | 0 | Telefonu açılmayınca mesaj bıraktığım sesli mesaj kutusu. |
| `lx:untersuchen` | 23 | 23 | 0 | Doktorun neyim olduğunu anlamak için bana bakması, muayene. |
| `lx:nüchtern` | 21 | 21 | 0 | Bir süredir hiçbir şey yememiş olmak, aç karnına. Alkol almamış için de ayık. |
| `lx:krankschreiben` | 24 | 24 | 0 | Doktorun çalışamayacağımı yazması, rapor vermesi. |
| `lx:drucken` | 21 | 21 | 0 | Bir belgeyi yazıcıdan kâğıda çıkarmak, yazdırmak. |
| `lx:Ausdruck` | 24 | 24 | 0 | Yazıcıdan çıkan kâğıt, çıktı. |
| `lx:Umschlag` | 21 | 21 | 0 | Mektubu ya da belgeyi içine koyup gönderdiğim zarf. |
| `lx:Kundenkarte` | 24 | 24 | 0 | Mağazanın verdiği, puan ya da indirim kazandıran kart. |
| `lx:Reservierung` | 22 | 22 | 0 | Masayı, odayı ya da yeri önceden kendime ayırtmam. |
| `lx:Rückfahrt` | 23 | 23 | 0 | Gittiğim yerden geri dönerken yaptığım yolculuk. |
| `lx:Laune` | 21 | 21 | 0 | O an nasıl hissettiğim, keyfim. |
| `lx:quatschen` | 21 | 21 | 0 | Arkadaşça, rahat rahat laflamak. |
| `lx:anstoßen` | 24 | 23 | 1 | Kadehleri değdirip birinin şerefine içmek. |

Karar değiştirmeyen notlar:
- `lx:Mailbox.mistakes_tr[0]` (**der Mailbox** yerine **auf die Mailbox**): iki söz değişiyor ama **der** → **die** değişikliği **auf** eklenince kaçınılmaz geliyor, kartın başında da **die Mailbox** yazıyor. GEÇTİ. `forms[1].hint_tr` "Sesli mesaj kutusundaki" için **auf der Mailbox**: Türkçe söz farklı, kendi cümlesiyle örtüşüyor. GEÇTİ.
- `lx:Umschlag.mistakes_tr[0]` "zarfa" için **in dem** yanlış, **in den** doğru. Aynı kartta "zarfın içinde" **Im Umschlag**. Türkçe sözler farklı ("zarfa" ve "zarfın içinde"), not kendi başına anlaşılır. GEÇTİ. Okur neden bir yerde **den**, bir yerde **dem** olduğunu sorabilir.
- `lx:Umschlag.exp.ne_zaman_tr` "Postanede, resmî daireye belge gönderirken ya da gelen mektubu açarken.": "Postanede" ilk okumada sonraki sözlere bağlanabiliyor. İki okuma da doğru bir kullanım anlatıyor, anlam bozulmuyor. GEÇTİ (a2-11 `lx:beschreiben`'de bağlanma anlamı bozuyordu, burada bozmuyor).
- `lx:Rückfahrt.mistakes_tr[0]` **die Zurückfahrt** yanlış diyor, `exp.ipucu_tr` **hin und zurück** veriyor. Farklı sözler, ikisi de kendi başına doğru. GEÇTİ. Okur "**zurück** yanlış mı" diye bir an duraklayabilir.
- `lx:nüchtern.forms[0].hint_tr` "Aç karnına gelin derken **Kommen Sie bitte morgen nüchtern** denir.": kalın parça Türkçe sözden uzun (**bitte morgen**), ama cümlenin `tr` alanında "lütfen yarın" var, yanlış kural öğretmiyor. GEÇTİ.
- `lx:Laune.forms[2].hint_tr` "Keyfini yerine getirir" için **macht immer gute Laune**: **immer** ("hep") Türkçe sözde yok, cümlede var. Küçük fark, GEÇTİ.
- `lx:quatschen.mistakes_tr[0]` "Şefine biraz konuşabilir miyiz derken…": tırnak olmadan "Şefine biraz" bir an yan yana okunuyor, tek okumada anlaşıldı. GEÇTİ.
- `lx:quatschen.exp.ipucu_tr` başka bir sözü (**Quatsch!**) de anlatıyor, ama amacı ikisini ayırmak. a2-11 `lx:ausatmen` (**ein** / **aus**) gibi, GEÇTİ.
- `lx:Reservierung.exp.ipucu_tr` kalıbı **auf den Namen** üzerinde bırakıyor, ama "sonra adını söylersin" devamı anlatıyor (a2-11 `lx:Werkzeug` sorunu burada yok). GEÇTİ.

## Sayılar

- Toplam: 335
- GEÇTİ: 334
- GERİ: 1

GERİ kimlikleri: `lx:anstoßen.mistakes_tr[1]`

GERİ olduğu için batch-a2-12 "reviewed" sayılamaz (OD-9.4). Düzeltmeden sonra yalnız bu alan yeniden okunur.

## Fark turu (2026-11-23): düzeltilen 1 alan

| kart.alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| `lx:anstoßen.mistakes_tr[1]` | Kadeh kaldırıyoruz derken **Wir anstoßen** yanlış. Doğrusu **Wir stoßen an**. | "Kadeh kaldırıyoruz" için **Wir anstoßen** değil, **Wir stoßen an** denir. **an** sona gider. | GEÇTİ | Türkçede olmayan **auf dich** çıkarılmış. Türkçe söz ile Almanca birebir örtüşüyor, tek fark kaldı. `mistakes_tr[0]` (senin şerefine, **auf dich**) ile çelişmiyor. |

### Fark turu sayıları

- Okunan satır: 1
- GEÇTİ: 1
- GERİ: 0

Fark turunda GERİ kalmadı. Okur kapısı (OD-9.3) açısından batch-a2-12 "reviewed" olabilir (bütün turlar: 335 alan, açık GERİ yok).
