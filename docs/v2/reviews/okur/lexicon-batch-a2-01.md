# Okur raporu: lexicon-batch-a2-01 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-01.json`, 25 kart (A2 17. hafta: anlama, sorma, doğrulama, ağzı anlama). Dilbilimci turundan sonraki hâli okundu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **656 alan**. Hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (geçen turların geri dönüş türleri):
  - aynı Türkçe sözün kart içinde farklı Almanca biçim vermesi;
  - terim;
  - üç nokta;
  - cümleyle örtüşmeyen ipucu;
  - 14 kelimeden uzun cümle.

## GERİ satırları

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `lx:korrigieren` | `mistakes_tr[1]` | Düzelttim derken **hat gekorrigiert** yanlış. Doğrusu **hat korrigiert**, başına **ge-** gelmez. | Düzelttim demek için **hat korrigiert** derim. | GERİ | Düzelttim "ben" demek, ama kutu **hat** diyor; **hat** "o" için. Aynı kartın `forms[1]` ipucu da düzelttim için **Ich habe … korrigiert** diyor. Aynı Türkçe söz iki ayrı biçim veriyor (**hat** / **habe**). |
| `lx:notieren` | `mistakes_tr[1]` | Not ettim derken **hat genotiert** yanlış. Doğrusu **hat notiert**. | Not ettim demek için **hat notiert** derim. | GERİ | Aynı sorun: not ettim "ben" demek, kutu **hat** diyor. Ben derken **hat** mı söyleyeceğim, anlamadım. |
| `lx:notieren` | `forms[3].hint_tr` | Not alıyorum derken **Ich notiere** denir. | Not alıyorum demek için **Ich notiere** yeter. | GERİ | Aynı kartın hata kutusu da "Not alıyorum derken" diye başlıyor ve doğrusu olarak **Ich notiere mir das** veriyor. Aynı Türkçe söz bir **Ich notiere mir das**, bir **Ich notiere** çıkıyor. **mir das** gerekir mi, anlamadım. |
| `lx:Zettel` | `collocations[3].tr` | kâğıtta yazmak | Bir kâğıdın üstüne yazı yazmak. | GERİ | Almancası (**auf dem Zettel stehen**) kâğıtta yazılı olmak demek. Türkçesi bana kâğıda bir şey yazmak gibi geldi. Anlam örtüşmüyor. |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|
| `lx:Abkürzung` | 26 | 0 | Bir kelimenin yazıdaki kısa hâli: kısaltma. |
| `lx:Hochdeutsch` | 26 | 0 | Lehçesiz, herkesin anladığı Almanca. |
| `lx:bayerisch` | 26 | 0 | Bavyera'dan gelen, Bavyera'ya ait. |
| `lx:Akzent` | 26 | 0 | Konuşurken nereli olduğunu belli eden söyleyiş: aksan. |
| `lx:Gegend` | 26 | 0 | Bir yerin çevresi, yöre, buralar. |
| `lx:grüßen` | 26 | 0 | Birine selam vermek ya da selam göndermek. |
| `lx:Frage` | 28 | 0 | Bir şeyi öğrenmek için sorduğum söz: soru. |
| `lx:Bedeutung` | 26 | 0 | Bir kelimenin ne demek olduğu: anlam. |
| `lx:Beispiel` | 26 | 0 | Daha iyi anlatmak için gösterilen tek durum: örnek. |
| `lx:Erklärung` | 26 | 0 | Bir şeyin ne olduğunu ya da nedenini anlatan söz: açıklama. |
| `lx:korrigieren` | 26 | 1 | Yanlışı doğru yapmak: düzeltmek. |
| `lx:verwechseln` | 26 | 0 | İki şeyi ya da iki kişiyi birbirinin yerine koymak: karıştırmak. |
| `lx:notieren` | 26 | 2 | Unutmamak için kısaca yazmak: not almak. |
| `lx:Zettel` | 26 | 1 | Üstüne kısa bir şey yazılan küçük kâğıt. |
| `lx:deutlich` | 28 | 0 | Kolay anlaşılan, net. |
| `lx:unterbrechen` | 26 | 0 | Konuşanın sözünü kesip araya girmek. |
| `lx:zuhören` | 28 | 0 | Konuşana dikkatini verip onu dinlemek. |
| `lx:kapieren` | 26 | 0 | Anlamak, ama arkadaş arasında söylenen samimi hâli. |
| `lx:Satz` | 26 | 0 | Bir düşünceyi anlatan kelimeler: cümle. |
| `lx:Ausdruck#2` | 26 | 0 | Bir şeyi söylemenin belli bir biçimi: ifade, deyiş. |
| `lx:typisch` | 26 | 0 | Bir yere ya da kişiye özgü, tipik. |
| `lx:Unterschied` | 26 | 0 | İki şeyin birbirinden ayrıldığı nokta: fark. |
| `lx:gewöhnen` | 26 | 0 | Yeni bir şey zamanla normal gelmeye başlıyor: alışmak. |
| `lx:aussprechen` | 26 | 0 | Bir kelimeyi ağızdan nasıl söylediğim: telaffuz etmek. |
| `lx:Geduld` | 26 | 0 | Acele etmeden bekleyip sakin kalmak: sabır. |

Öteki alanların hepsini tek okumada anladım ve anladığım şey Almancasıyla örtüştü. Karar değiştirmeyen notlar:
- **burada** ya da **kısaca** sözüyle başka bir biçim veren ipuçlarında, farkın nedenini kutu söylüyor. Bunlar: `lx:Gegend.forms[3]` (**schöne Gegend**), `lx:Bedeutung.forms[2]`, `lx:Ausdruck#2.forms[3]`. Çelişki saymadım.
- `lx:typisch` içinde Bavyera'ya özgü **typisch für Bayern**, tam Bavyera'ya özgü **typisch bayerisch**. Türkçe sözler ayrı olduğu için çelişki saymadım.
- Türkçe olmayan, kapsam dışı bir gözlem: `lx:zuhören` ve `lx:aussprechen` boşluklarının cevap alanında üç nokta var (**höre … zu**, **spricht … aus** gibi; iki boşluklu cevaplar). Bu bir açıklama alanı değil. Ekranda öğrenciye gösteriliyorsa baş geliştirici baksın.

## Sayılar

- Toplam: 656
- GEÇTİ: 652
- GERİ: 4

GERİ kimlikleri: `lx:korrigieren.mistakes_tr[1]`, `lx:notieren.mistakes_tr[1]`, `lx:notieren.forms[3].hint_tr`, `lx:Zettel.collocations[3].tr`

Dosyada GERİ olduğu için "reviewed" sayılamaz (OD-9.4).

---

## 2. tur (2026-11-23): düzeltilen alanlar

- Girdi: `content/v2/registry/lexicon/batch-a2-01.json`, 5 alan: 1. turun 4 GERİ'si ve ek olarak düzeltilen `lx:notieren.mistakes_tr[0]`.
- Eski ve yeni hâl karşılaştırıldı. Öğrenciye görünen alanlarda bu 5 alandan başka değişiklik yok. Değişen başka tek şey, öğrenciye görünmeyen `verb` / `freqRank` bilgilerinin sırası.
- Her alan kendi kartıyla birlikte okundu.

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `lx:korrigieren` | `mistakes_tr[1]` | Düzelttim derken **Ich habe gekorrigiert** yanlış. Doğrusu **Ich habe korrigiert**, başına **ge-** gelmez. | Düzelttim derken **korrigiert** derim, başına **ge** koymam. | GEÇTİ | Artık "ben" ile **Ich habe** örtüşüyor. `forms[1]` ipucuyla da aynı. |
| `lx:notieren` | `mistakes_tr[0]` | Bunu not alıyorum derken **Ich nehme Notiz** yanlış. Doğrusu **Ich notiere mir das**. | Bunu not alıyorum demek için **Ich notiere mir das** derim. | GEÇTİ | "Bunu" ile **das** örtüşüyor. `forms[0]` ("Bunu not alayım", **ich notiere mir das**) ile aynı. |
| `lx:notieren` | `mistakes_tr[1]` | Not ettim derken **Ich habe genotiert** yanlış. Doğrusu **Ich habe notiert**. | Not ettim derken **Ich habe notiert** derim. | GEÇTİ | Artık "ben" ile **Ich habe** örtüşüyor. |
| `lx:notieren` | `forms[3].hint_tr` | Ne not aldığını söylemeden önce kısaca **Ich notiere** denir. | Not ettiğim şeyi söylemeden önce **Ich notiere** derim, sonra saati söylerim. | GEÇTİ | Cümleyle (**Ich ___: Dienstag, 14 Uhr.**) örtüşüyor. Hata kutusuyla çelişki kalmadı: orada "Bunu not alıyorum", burada not edilen şeyden önceki kısa söz. |
| `lx:Zettel` | `collocations[3].tr` | kâğıtta yazılı olmak | Bir şey kâğıtta yazıyor. | GEÇTİ | **auf dem Zettel stehen** ile örtüşüyor. |

### 2. tur sayıları

- Yeniden okunan: 5
- GEÇTİ: 5
- GERİ: 0

### Parti durumu (bütün turlar)

- Toplam: 656
- GEÇTİ: 656
- GERİ: 0

Okur kapısı (OD-9.3) açısından batch-a2-01 "reviewed" olabilir.

---

## #210 sonrası (2026-11-23): yeni kart `lx:Süden` (`lx:gewöhnen` çıktı)

- Girdi: `content/v2/registry/lexicon/batch-a2-01.json`. 2. turla karşılaştırınca `lx:gewöhnen`'in 26 alanı çıkmış, `lx:Süden`'in 26 alanı girmiş. Öğrenciye görünen başka bir alan değişmemiş.
- `lx:Süden`'in bütün alanları okundu: başlık, 4 eşdizim, 2 hata notu, 6 örnek, `anlam_tr`, `ne_zaman_tr`, `ipucu_tr`, 5 boşluk ve 5 ipucu.

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `lx:Süden` | `exp.anlam_tr` | Haritada aşağıda kalan yönü, güneyi söyler. | Güney yönü. | GEÇTİ | |
| `lx:Süden` | `exp.ne_zaman_tr` | Bir sözün ya da kişinin nereden geldiğini konuşurken. | Bir söz ya da biri nereden diye konuşurken. | GEÇTİ | |
| `lx:Süden` | `exp.ipucu_tr` | **im Süden** güneyde, **aus dem Süden** güneyden demektir. | Güneyde için **im Süden**, güneyden için **aus dem Süden**. | GEÇTİ | Tek fikir: iki sözün farkı. Kartın bütün ipuçlarıyla örtüşüyor. |
| `lx:Süden` | `mistakes_tr[0]` | Güneyde derken **in Süden** yanlış. Doğrusu **im Süden**. | Güneyde için **im** derim. | GEÇTİ | |
| `lx:Süden` | `mistakes_tr[1]` | Güneyde böyle denir derken **Im Süden man sagt so** yanlış. Doğrusu **Im Süden sagt man so**. | **sagt** önce, **man** sonra gelir. | GEÇTİ | |
| `lx:Süden` | `forms[0..4].hint_tr` | Güneyde → **im Süden** · Almanya'nın güneyinde → **im Süden von Deutschland** · Güneyden → **aus dem Süden** · Güneye doğru → **Richtung Süden** · Burada, güneyde → **hier im Süden** | Her ipucu kendi cümlesindeki sözü veriyor. | GEÇTİ | Aynı Türkçe söz hep aynı Almancayı veriyor (güneyde hep **im Süden**). Cümlelerle örtüşüyor. |
| `lx:Süden` | `tr`, `collocations[0..3].tr`, `examples[0..5].tr`, `forms[0..4].tr` | güney · güneyde · güneyden · Almanya'nın güneyinde · güneye doğru · 6 örnek ve 5 boşluk çevirisi | Almancalarıyla örtüşüyor. | GEÇTİ | 16 alan. |

### #210 sonrası sayıları

- Okunan: 26 (`lx:Süden`)
- GEÇTİ: 26
- GERİ: 0

### Parti durumu (bütün turlar)

- Toplam: 656 (`lx:gewöhnen` çıktı, `lx:Süden` girdi)
- GEÇTİ: 656
- GERİ: 0

Okur kapısı (OD-9.3) açısından batch-a2-01 "reviewed" olabilir.
