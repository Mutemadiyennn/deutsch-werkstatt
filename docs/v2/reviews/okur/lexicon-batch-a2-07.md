# Okur raporu: lexicon-batch-a2-07 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-07.json`, 26 kart (yolculuk, gezi, otel). İlk okur turu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **625 alan**. Bütün satırlar betikle döküldü ve hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar:
  - aynı Türkçe sözün kart içinde farklı Almanca biçim vermesi;
  - kişi eşleşmesi;
  - terim;
  - üç nokta;
  - cümleyle örtüşmeyen ipucu;
  - genel kural gibi okunup kartla çelişen ipucu;
  - yanlışla doğru arasında açıklanmayan ikinci fark;
  - 14 kelimeden uzun cümle.
- Tarama sonucu: hiçbir Türkçe alanda **=**, **;**, üç nokta, tırnak ya da dilbilgisi terimi yok. 14 kelimeyi aşan cümle yok. Betiğin terim uyarısı iki yerde yanlış alarm verdi (`lx:Flughafen.exp.anlam_tr` "kalkıp", `lx:auschecken.exp.anlam_tr` "bırakıp").

## GERİ satırları

Yok.

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GEÇTİ | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|---|
| `lx:Reise` | 24 | 24 | 0 | Bir yere gidip gelmek: yolculuk, seyahat. |
| `lx:Ausland` | 26 | 26 | 0 | Kendi ülkemin dışındaki yerler: yurt dışı. |
| `lx:Tante` | 23 | 23 | 0 | Annemin ya da babamın kız kardeşi: teyze, hala. |
| `lx:übernachten` | 25 | 25 | 0 | Bir yerde bir gece kalmak. |
| `lx:Flug` | 24 | 24 | 0 | Uçakla yapılan yolculuk: uçuş. |
| `lx:Flughafen` | 25 | 25 | 0 | Uçakların kalkıp indiği yer: havaalanı. |
| `lx:Sehenswürdigkeit` | 25 | 25 | 0 | Bir şehirde mutlaka görülmesi gereken yer. |
| `lx:Museum` | 23 | 23 | 0 | Eski ya da sanat eserlerinin gösterildiği yer: müze. |
| `lx:Eintritt` | 25 | 25 | 0 | Müzeye, havuza girmek için ödenen para. |
| `lx:Natur` | 23 | 23 | 0 | Dağ, orman, göl: doğa. |
| `lx:enttäuscht` | 23 | 23 | 0 | Beklediğimi bulamayınca üzülmüş olmak. |
| `lx:sich_erholen` | 24 | 24 | 0 | Yorgunluğu atıp dinlenmek. |
| `lx:sich_lohnen` | 24 | 24 | 0 | Harcanan paraya, zamana değmek. |
| `lx:Frühstück` | 26 | 26 | 0 | Sabahın ilk yemeği: kahvaltı. |
| `lx:Halbpension` | 24 | 24 | 0 | Otelde kahvaltı ile akşam yemeğinin fiyata dahil olması. |
| `lx:Ferienwohnung` | 24 | 24 | 0 | Tatilde birkaç gün kiralanan mutfaklı daire. |
| `lx:Preis` | 24 | 24 | 0 | Bir şeyin kaç para tuttuğu: fiyat. |
| `lx:Lage` | 23 | 23 | 0 | Otelin ya da evin nerede olduğu: konum. |
| `lx:Aufenthalt` | 22 | 22 | 0 | Bir otelde, bir şehirde kaldığım süre: konaklama. |
| `lx:auschecken` | 25 | 25 | 0 | Otelden giderken odayı bırakıp hesabı kapatmak. |
| `lx:WLAN` | 24 | 24 | 0 | Şifreyle bağlanılan kablosuz internet. |
| `lx:Dusche` | 23 | 23 | 0 | Banyoda üstüme su akan yer: duş. |
| `lx:wechseln` | 23 | 23 | 0 | Bir şeyi başkasıyla değiştirmek ya da para bozdurmak. |
| `lx:Handtuch` | 25 | 25 | 0 | Yıkandıktan sonra kurulandığım havlu. |
| `lx:sauber` | 23 | 23 | 0 | Kirli olmayan: temiz. |
| `lx:Fernseher` | 25 | 25 | 0 | Program izlediğim cihaz: televizyon. |

Bütün alanları tek okumada anladım ve anladığım şey Almancasıyla örtüştü. Karar değiştirmeyen notlar:
- Kartlar arasında: `lx:Flughafen.mistakes_tr[0]` ve `forms[3].hint_tr` "Bir yere giderken **zum Flughafen**" diyor. `lx:Museum.forms[2].hint_tr` ise "Bir yere giderken **ins Museum**" diyor. Her kart kendi içinde tutarlı. Yan yana çalışılırsa "bir yere giderken" genel kural gibi okunup duraksatabilir.
- `lx:enttäuscht.mistakes_tr[1]` öbür hata notları gibi "… derken" ile başlamıyor, doğrudan Almanca yanlışla başlıyor. Yine de tek okumada anlaşılıyor.
- `lx:Aufenthalt.forms[1].hint_tr` "Kalış süresi derken **Ihr Aufenthalt**" diyor. Türkçe cümlede (Ne kadar kalacaksınız?) "kalış süresi" sözü geçmiyor. Kartın `anlam_tr`'si kelimeyi "kaldığın süre" diye tanımladığı için çelişki saymadım.
- `lx:Halbpension.exp.ipucu_tr` kelimenin kendisini değil komşularını (**Vollpension**, **mit Frühstück**) anlatıyor. Sınırı çizdiği için kabul ettim.

## Sayılar

- Toplam: 625
- GEÇTİ: 625
- GERİ: 0

GERİ yok. Okur kapısı (OD-9.3) açısından batch-a2-07 "reviewed" olabilir.
