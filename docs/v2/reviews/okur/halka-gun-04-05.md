# Okur kontrolü — Gün 4 ve Gün 5 halkaları, `lx:Euro` ve `lx:Cent` kartları (OD-9.3), 1. tur

Kaynak: `docs/v2/reviews/halka/gun-04-halkalar.json` (5 halka), `docs/v2/reviews/halka/gun-05-halkalar.json` (5 halka), `content/v2/registry/lexicon/batch-015.json` (`lx:Euro`, `lx:Cent`).
Okuyan: 3. günü bitirmiş öğrencinin gözüyle. Dilbilgisi terimi bilmiyor, telefondan okuyor.

Elimde olanlar:
- 4. günde: 1.–3. günün kartları ve halka kalıpları, 1.–3. günün dersleri (r0-01, r0-02, r0-11, r0-03), o güne kadar açılan halkaların kartları ve kalıpları. 4. günün dersi (r0-04) yok sayıldı.
- 5. günde: bunlara ek olarak 4. günün kartları, kalıpları ve dersi (r0-04). 5. günün dersi yok sayıldı.

Her satırda baktıklarım:
1. Türkçeyi tek okumada anladım mı?
2. Türkçe, Almanca cümleyle aynı şeyi mi söylüyor?
3. Türkçeden Almancaya çevirirken tek bir cümleye gidiyor muyum, yazdığım cümle kabul listesinde mi?
4. Kalıplarda: bu çeviri bana ne öğretiyor?
5. Sorularda: tek okumada tek cevap var mı, hesap isteyen soru hesaplanıyor mu?

Satır sayımı: başlık 1, her kalıp 1, her görev cümlesi 1, ortam 1, her sahne satırı 1, soru ve şıkları 1. Nokta, virgül ve çizgi farkını saymadım.

Kartlarda her alanı ayrı saydım: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, her `mistakes_tr`, her birlikte kullanım Türkçesi, her örnek Türkçesi, her alıştırmanın `tr` ve `hint_tr` alanı. İki kartta `parcalar` boş, `ipucu_tr` yok.

## Sonuç

| | Gün 4 | Gün 5 | Kartlar | Toplam |
|---|---|---|---|---|
| Okunan | 92 | 92 | 56 | 240 |
| Geçer | 89 | 87 | 53 | 229 |
| Geri döner | 3 | 5 | 3 | 11 |

Geri dönenler, Gün 4: `h1/g9`, `h4/g8`, `h4/g10`.

Geri dönenler, Gün 5: `h1/g4`, `h2/kalıp 1`, `h2/g6`, `h4/g4`, `h5/s3`.

Geri dönenler, kartlar: `lx:Euro` `mistakes_tr[0]`, `lx:Euro` `mistakes_tr[3]`, `lx:Euro` `forms[3].hint_tr`.

11 geri dönüşün kökü 8 tane:

| Kök | Ne | Satırlar |
|---|---|---|
| K5 | "Saat … mı?" sorusunu soru sırasıyla yazınca bir satırda doğru, iki satırda yanlış | G5: `h1/g4`, `h2/g6` |
| K6 | "Onu çeyrek geçe" ilk okumada "onu (o şeyi)" diye okunuyor | G5: `h4/g4`, `h5/s3` |
| K7 | "bir avro" için ne zaman `einen`, ne zaman `ein` deneceği Türkçeden görünmüyor | Kart: `lx:Euro` `mistakes_tr[3]`, `lx:Euro` `forms[3].hint_tr` |
| tek | Gösterilen doğru cevap, kartın "pek denmez" dediği biçim | G4: `h1/g9` |
| tek | "Bir avro yüz sent" bugünkü fiyat söyleyişiyle aynı görünüyor | G4: `h4/g8` |
| tek | Noktalı virgül | G4: `h4/g10` |
| tek | Eşittir işareti, iki fikir | G5: `h2/kalıp 1` |
| tek | İki fikir, ikincisini anlamadım | Kart: `lx:Euro` `mistakes_tr[0]` |

Üç dosyada da geri dönen satır olduğu için üçü de bu hâliyle "reviewed" sayılamaz (OD-9.4).

Sahne soruları: onu da tek cevaplı. Hesap isteyen beş sorunun beşi de hesaplanıyor (G4 `h2`, `h3`, `h5`; G5 `h1`, `h2`).

## Gün 4

### h1 — Fırında: ekmek ne kadar?

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 4 | h1 | başlık | Fırında: ekmek ne kadar? | geçer | |
| 4 | h1 | kalıp 1 | … ne kadar? – Ekmek … avro. | geçer | Bana öğrettiği: bir şeyin fiyatını sorarım, fiyatını söylerim. Almancada ortaya bir kelime giriyor, Türkçede yok; yan yana görünüyor. |
| 4 | h1 | kalıp 2 | üç avro yetmiş (3,70 €) – yetmiş sent (0,70 €) | geçer | Bana öğrettiği: avro varsa sent kelimesi söylenmez, avro yoksa sent söylenir. Paranteze yazılan rakamlar işi çözüyor. Bkz. N9. |
| 4 | h1 | g1 | Bir ekmek, lütfen Stadler Hanım. | geçer | "bir" kelimesini ekmek kartının uyarısından aldım. `Ein Brot, bitte, Frau Stadler.` Listede. |
| 4 | h1 | g2 | Ekmek mi? Üç avro yetmiş. | geçer | Kalıptaki "Ekmek" sözünü aldım. `Das Brot? Drei Euro siebzig.` Listede. |
| 4 | h1 | g3 | Ekmek ne kadar Stadler Hanım? | geçer | Kalıbın ilk yarısı. Listede. |
| 4 | h1 | g4 | Ekmek iki avro mu? | geçer | Soru sırasıyla yazdım: `Kostet das Brot zwei Euro?` Listede. Düz sırayla da listede. |
| 4 | h1 | g5 | İki avro mu? Hayır, üç avro. | geçer | |
| 4 | h1 | g6 | Bugün bir ekmek üç avro yetmiş. | geçer | Zamanla başlayınca iki kelime yer değiştiriyor (2. günün kalıbı). `Heute kostet ein Brot drei Euro siebzig.` Listede. |
| 4 | h1 | g7 | On yedi avro mu? Hayır, üç avro yetmiş! | geçer | |
| 4 | h1 | g8 | Yetmiş, on yedi değil: yedi, sıfır. | geçer | Rakam rakam söylüyorum. `Siebzig, nicht siebzehn: sieben, null.` Listede. |
| 4 | h1 | g9 | Üç avro yetmiş sent. | **geri döner** | Yazdığım listede. Ama gösterilen doğru cevap, avro kartının "pek denmez" dediği biçim. Aşağıda. |
| 4 | h1 | g10 | Yirmi sent mi? Teşekkürler Stadler Hanım! | geçer | |
| 4 | h1 | ortam | Stadler fırını, sabah. Tezgâhta ekmeğin fiyatını soruyorsun. | geçer | |
| 4 | h1 | s1 | İyi günler Stadler Hanım! Bir ekmek ne kadar? | geçer | |
| 4 | h1 | s2 | Üç avro yetmiş. | geçer | |
| 4 | h1 | s3 | Yetmiş sent mi? | geçer | |
| 4 | h1 | s4 | Hayır, hayır! Üç avro: üç avro yetmiş. | geçer | |
| 4 | h1 | soru | Bir ekmek kaç para? (70 sent / 3,17 avro / 3,70 avro / 17 avro) | geçer | Tek cevap: 3,70 avro. "70 sent" çekici ama Stadler Hanım düzeltiyor. |

### h2 — Küçük ekmek ve poşet: sentler

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 4 | h2 | başlık | Küçük ekmek ve poşet: sentler | geçer | |
| 4 | h2 | kalıp 1 | bir küçük ekmek – iki küçük ekmek | geçer | Bana öğrettiği: Türkçede değişmiyor, Almancada birden fazlaysa sonuna bir harf gelir. 3. günün "bir gün – dört gün" kalıbıyla aynı düzen. |
| 4 | h2 | kalıp 2 | Başka bir şey? – bir küçük ekmek daha | geçer | Bana öğrettiği: satıcı başka bir şey ister misin diye sorar. Ben "daha" kelimesini Almancada başa koyarım. |
| 4 | h2 | g1 | Bir küçük ekmek mi, iki mi? | geçer | |
| 4 | h2 | g2 | Dört küçük ekmek, lütfen Stadler Hanım. | geçer | |
| 4 | h2 | g3 | Bir küçük ekmek daha, lütfen. | geçer | Kalıbın ikinci yarısı. |
| 4 | h2 | g4 | Evet, iki küçük ekmek daha. | geçer | |
| 4 | h2 | g5 | Bir poşet mi? Evet, lütfen. | geçer | Baştaki "bir"in biçimini 3. günün "yeni bir numara" kalıbından aldım. `Eine Tüte? Ja, bitte.` Listede. |
| 4 | h2 | g6 | Poşet on sent mi? | geçer | İki sırayla da listede. |
| 4 | h2 | g7 | On dokuz sent mi? Hayır, doksan! | geçer | |
| 4 | h2 | g8 | İki küçük ekmek mi? Bugün doksan sent. | geçer | `Zwei Semmeln? Heute neunzig Cent.` Listede. Bkz. N2. |
| 4 | h2 | g9 | Elli sent mi Stadler Hanım? Bir küçük ekmek için mi? | geçer | 1. günün "… için" kalıbı. |
| 4 | h2 | g10 | Beş avro elli, lütfen. | geçer | |
| 4 | h2 | ortam | Stadler fırını. İki küçük ekmek aldın. Stadler Hanım kasada. | geçer | |
| 4 | h2 | s1 | İki küçük ekmek: bir avro on. Başka bir şey? | geçer | Kalıptaki soru burada duyuluyor. Bkz. N3. |
| 4 | h2 | s2 | Evet, bir poşet, lütfen. | geçer | |
| 4 | h2 | s3 | Bir avro yirmi, lütfen. | geçer | |
| 4 | h2 | soru | Poşet kaç sent? (On sent / Yirmi sent / Elli sent / Bir avro on) | geçer | Hesap sorusu, hesaplanıyor: bir avro yirmiden bir avro onu çıkarıyorum. Tek cevap: On sent. Bkz. N2. |

### h3 — Kasada: toplam ve pahalı

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 4 | h3 | başlık | Kasada: toplam ve pahalı | geçer | |
| 4 | h3 | kalıp 1 | Toplam … (kasada) | geçer | Bana öğrettiği: kasada toplamı söylerken bu iki kelimeyle başlarım. Parantez yeri gösteriyor. |
| 4 | h3 | kalıp 2 | Bu çok pahalı. – Bu pahalı değil. | geçer | Bana öğrettiği: "çok pahalı" için ayrı küçük bir kelime var. "değil" için 1. günün kelimesi. |
| 4 | h3 | g1 | Toplam iki avro doksan. | geçer | |
| 4 | h3 | g2 | Toplam yirmi avro mu? On iki değil mi? | geçer | Kalıbı tek parça aldım: `Das macht zwanzig Euro? Nicht zwölf?` Listede. Bkz. N1. |
| 4 | h3 | g3 | Bu pahalı değil Ioana! | geçer | |
| 4 | h3 | g4 | On avro mu? Bu çok pahalı Brandl Hanım. | geçer | |
| 4 | h3 | g5 | Kırk avro mu? Hayır, dört avro! | geçer | |
| 4 | h3 | g6 | Toplam kırk avro, on dört değil. | geçer | |
| 4 | h3 | g7 | Seksen sent mi? Bu pahalı değil. | geçer | |
| 4 | h3 | g8 | On sekiz mi? Hayır, seksen sent! | geçer | |
| 4 | h3 | g9 | Otuz mu, on üç mü? | geçer | |
| 4 | h3 | g10 | Toplam otuz avro, lütfen. | geçer | |
| 4 | h3 | ortam | Stadler fırını, cumartesi. İki ekmek aldın. Stadler Hanım toplamı söylüyor. | geçer | |
| 4 | h3 | s1 | İki ekmek. Toplam yedi avro kırk. | geçer | |
| 4 | h3 | s2 | Yetmiş avro mu? Bu çok pahalı! | geçer | |
| 4 | h3 | s3 | Hayır, hayır: yedi avro kırk! | geçer | |
| 4 | h3 | soru | Bir ekmek kaç avro? (3,70 avro / 7,40 avro / 35 avro / 70 avro) | geçer | Hesap sorusu, hesaplanıyor: iki ekmek yedi avro kırk, biri üç avro yetmiş. h1'deki fiyatla da aynı. Tek cevap. |

### h4 — Nakit mi, kart mı?

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 4 | h4 | başlık | Nakit mi, kart mı? | geçer | |
| 4 | h4 | kalıp 1 | … ödüyorum – Nakit mi, kartla mı? | geçer | Bana öğrettiği: kartla derken önüne küçük bir kelime gelir, nakit derken gelmez. |
| 4 | h4 | kalıp 2 | Bugün ben ödüyorum! | geçer | Bana öğrettiği: zamanla başlarsam iki kelime yer değiştirir. 2. günün "Ağustosta benim … var" kalıbıyla aynı. |
| 4 | h4 | g1 | Kartla olur mu Stadler Hanım? | geçer | 1. günün "… olur mu?" kalıbıyla: `Geht mit Karte, Frau Stadler?` Listede. |
| 4 | h4 | g2 | Kartla ödüyorum, nakit değil. | geçer | |
| 4 | h4 | g3 | Nakit mi? Evet, olur. | geçer | `Bar? Ja, geht.` Listede. |
| 4 | h4 | g4 | Nakit ödüyorum Luka. | geçer | |
| 4 | h4 | g5 | Kartla mı ödüyorsunuz Wimmer Bey? | geçer | "siz" için kelimenin sonunu 3. günün dersinden aldım. `Zahlen Sie mit Karte, Herr Wimmer?` Listede. |
| 4 | h4 | g6 | Bugün ben ödüyorum Ioana! | geçer | Kalıbın kendisi. |
| 4 | h4 | g7 | Yüz avro mu? Nakit mi? Hayır, kartla. | geçer | |
| 4 | h4 | g8 | Bir avro yüz sent. | **geri döner** | İlk okumada fiyat sandım. Aşağıda. |
| 4 | h4 | g9 | Altmış avro mu? Kartla ödüyorum. | geçer | |
| 4 | h4 | g10 | Altmış avro; nakit mi, kartla mı? | **geri döner** | Noktalı virgül var. Yazdığım listede: `Sechzig Euro, bar oder mit Karte?` |
| 4 | h4 | ortam | Stadler fırını, kasa. İki ekmeği kartla ödemek istiyorsun. | geçer | |
| 4 | h4 | s1 | Yedi avro kırk. Nakit mi, kartla mı? | geçer | |
| 4 | h4 | s2 | Kartla, lütfen Stadler Hanım. | geçer | |
| 4 | h4 | s3 | Bugün kart olmuyor. | geçer | |
| 4 | h4 | s4 | Tamam, nakit ödüyorum. | geçer | |
| 4 | h4 | soru | Sonunda nasıl ödüyorsun? (Kartla / Nakit / Ödemiyorsun / Ioana ödüyor) | geçer | Tek cevap: Nakit. "Kartla" çekici, "sonunda" sözü işi çözüyor. |

### h5 — Pazarda: elma, peynir ve yaş

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 4 | h5 | başlık | Pazarda: elma, peynir ve yaş | geçer | |
| 4 | h5 | kalıp 1 | bir kilo elma – iki kilo elma | geçer | Bana öğrettiği: "kilo" değişmez, "elma" baştan değişir. Türkçede ikisi de değişmiyor; Almancası yan yana gösteriyor. |
| 4 | h5 | kalıp 2 | … yaşındayım. – Kaç yaşındasınız? | geçer | Yaşımı söylerim, karşımdakine sorarım. |
| 4 | h5 | g1 | Bir elma mı? Hayır, iki elma lütfen. | geçer | "bir"in biçimini elma kartının uyarısından aldım. Listede. |
| 4 | h5 | g2 | Elma elli sent mi? Pahalı değil! | geçer | İki sırayla da listede. |
| 4 | h5 | g3 | Bir kilo elma mı? İki avro doksan. | geçer | |
| 4 | h5 | g4 | Üç kilo mu? Hayır, bir kilo lütfen. | geçer | |
| 4 | h5 | g5 | Peynir ne kadar, lütfen? | geçer | h1'in kalıbı. |
| 4 | h5 | g6 | Bir kilo peynir on sekiz avro mu? Bu pahalı! | geçer | `Kostet ein Kilo Käse achtzehn Euro? Das ist teuer!` Listede. |
| 4 | h5 | g7 | Luka kırk yaşında. | geçer | Kalıptaki "bin" yerine 1. günden bildiğim "ist". `Luka ist vierzig Jahre alt.` Listede. |
| 4 | h5 | g8 | Kaç yaşındasınız Luka? Kırk mı? | geçer | |
| 4 | h5 | g9 | On iki mi? Hayır, yirmi bir: iki, bir. | geçer | "iki, bir" sözünü rakam rakam söylemek diye anladım. |
| 4 | h5 | g10 | Yirmi bir yaşında değilim Tobi! | geçer | `Ich bin nicht einundzwanzig Jahre alt, Tobi!` Listede. |
| 4 | h5 | ortam | Şehir meydanında meyve tezgâhı. Brandl Hanım elma alıyor ve sana fiyatları söylüyor. | geçer | |
| 4 | h5 | s1 | Bir elma elli sent. Bir kilo iki avro doksan. | geçer | |
| 4 | h5 | s2 | Altı elma mı? Yoksa bir kilo mu? | geçer | |
| 4 | h5 | s3 | Bir kilo! Bu pahalı değil. | geçer | |
| 4 | h5 | soru | Altı elmayı tek tek alırsan kaç para ödersin? (2,90 avro / 3 avro / 50 sent / 6 avro) | geçer | Hesap sorusu, hesaplanıyor: altı kere elli sent, üç avro. Tek cevap. |

## Gün 5

### h1 — Saat kaç? Kaç saat?

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 5 | h1 | başlık | Saat kaç? Kaç saat? | geçer | İki sorunun farkı başlıkta görünüyor. |
| 5 | h1 | kalıp 1 | Saat kaç? – Saat … | geçer | Bana öğrettiği: saati sorarım, saati söylerim. Almancada sayıdan sonra bir kelime daha geliyor. |
| 5 | h1 | kalıp 2 | saat dört – dört saat | geçer | Bana öğrettiği: "saat dört" ile "dört saat" Almancada iki ayrı kelime. Türkçedeki sıra hangisini seçeceğimi söylüyor. Çok işe yaradı. |
| 5 | h1 | g1 | Saat yedi Tobi! | geçer | |
| 5 | h1 | g2 | Saat dokuzda mı? Onda değil mi? | geçer | 3. günün "saat …'de" kalıbı. |
| 5 | h1 | g3 | Saat kaç Derya? | geçer | |
| 5 | h1 | g4 | Saat on mu? Bu çok geç. | **geri döner** | K5. Soru sırasıyla yazdım. Listede yok. Aşağıda. |
| 5 | h1 | g5 | Dört saat, sekizden on ikiye kadar. | geçer | |
| 5 | h1 | g6 | Saat üç mü, üç saat mi? | geçer | Kalıp 2'nin tam örneği. Soru sırasıyla da listede. |
| 5 | h1 | g7 | On dakika daha mı Huber Hanım? | geçer | Dünkü "… daha" kalıbı. `Noch zehn Minuten, Frau Huber?` Listede. |
| 5 | h1 | g8 | Beş dakika mı? Bu geç değil. | geçer | "Bu … değil" dünden. |
| 5 | h1 | g9 | Saat altıda mı? Bu çok erken! | geçer | "çok" için dünkü küçük kelime. Listede. |
| 5 | h1 | g10 | Daha saat erken Tobi. | geçer | Gündelik bir söz, tek okumada oturdu. "daha" için dünkü kelime. `Es ist noch früh, Tobi.` Listede. |
| 5 | h1 | ortam | İş yeri, öğleden sonra. Tobi saati soruyor. İşin kaçta bittiğini o biliyor. | geçer | |
| 5 | h1 | s1 | Saat kaç {name}? | geçer | |
| 5 | h1 | s2 | Saat dört. | geçer | |
| 5 | h1 | s3 | Saat dört mü? İki saat daha! | geçer | Kalıp 2'deki fark tek satırda. |
| 5 | h1 | soru | Tobi'ye göre iş saat kaçta bitiyor? (16:00 / 17:00 / 18:00 / 20:00) | geçer | Hesap sorusu, hesaplanıyor: öğleden sonra dört, iki saat daha, altı. Tek cevap: 18:00. Bkz. N8. |

### h2 — Buçuk ve çeyrek: halb zehn tuzağı

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 5 | h2 | başlık | Buçuk ve çeyrek: halb zehn tuzağı | geçer | Halkayı açmadan "halb zehn"in ne olduğunu bilmiyorum. Kalıptan sonra oturdu. Bkz. N4. |
| 5 | h2 | kalıp 1 | dokuz buçuk = saat dokuz otuz (Almanca gelecek saati söyler: ona yarım saat var) | **geri döner** | Eşittir işareti var. Tek satırda iki fikir. Aşağıda. |
| 5 | h2 | kalıp 2 | dokuzu çeyrek geçe – ona çeyrek kala | geçer | Bana öğrettiği: "geçe" için bir küçük kelime, "kala" için başka bir küçük kelime. Açık. |
| 5 | h2 | g1 | Dokuz buçukta, onda değil. | geçer | Kalıp 1'den: dokuz buçuk için ondan söz edilir. `Um halb zehn, nicht um zehn.` Listede. |
| 5 | h2 | g2 | Yedi buçuk mu? Yani saat yedi otuz mu? | geçer | "saat yedi otuz" için kalıp 1'in sağ yanını aldım. `Halb acht? Also sieben Uhr dreißig?` Listede. |
| 5 | h2 | g3 | Saat on biri çeyrek geçiyor. | geçer | Çeyrek kartında aynı cümle hazır duruyor. `Es ist Viertel nach elf.` Listede. |
| 5 | h2 | g4 | Sekize çeyrek kala mı? Hayır, sekizi çeyrek geçe! | geçer | |
| 5 | h2 | g5 | Yani sekizi çeyrek geçe mi Huber Hanım? | geçer | `Also Viertel nach acht, Frau Huber?` Listede. |
| 5 | h2 | g6 | Saat altı mı? Peki, yarın görüşürüz! | **geri döner** | K5. |
| 5 | h2 | g7 | Saat çoktan dokuz buçuk olmuş! | geçer | `Es ist schon halb zehn!` Listede. Bkz. N6. |
| 5 | h2 | g8 | Artık geç oldu Ioana. | geçer | "artık" kartın Türkçesinde yazıyor. `Es ist schon spät, Ioana.` Listede. |
| 5 | h2 | g9 | Yalnızca on dakika Ioana! | geçer | |
| 5 | h2 | g10 | Muayenehane çarşamba günü yalnızca dört saat açık. | geçer | `Die Praxis ist am Mittwoch nur vier Stunden offen.` Listede. |
| 5 | h2 | ortam | Telefon. Huber Hanım yarınki randevunun saatini söylüyor. | geçer | |
| 5 | h2 | s1 | Yarın dokuz buçukta, tamam mı? | geçer | |
| 5 | h2 | s2 | Saat onda mı Huber Hanım? | geçer | |
| 5 | h2 | s3 | Hayır, onda değil: dokuz buçukta! | geçer | |
| 5 | h2 | soru | Yarın muayenehanede saat kaçta olmalısın? (9:00 / 9:30 / 10:00 / 10:30) | geçer | Tek cevap: 9:30. "10:00" tuzak, Huber Hanım açıkça düzeltiyor. |

### h3 — Sabahtan geceye

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 5 | h3 | başlık | Sabahtan geceye | geçer | |
| 5 | h3 | kalıp 1 | öğleden önce – akşam – gece | geçer | Bana öğrettiği: günün bölümlerinin önüne küçük bir kelime gelir. Gece için başka iki kelime. Türkçede hiçbiri görünmüyor, Almancası yan yana gösteriyor. |
| 5 | h3 | kalıp 2 | bu akşam – yarın sabah | geçer | İki hazır söz. "bugün" ve "yarın" kelimelerini biliyorum, arkasına günün bölümü geliyor. |
| 5 | h3 | g1 | Öğleden önce olmuyor. | geçer | 1. günün "… olmuyor" kalıbı. `Am Vormittag geht nicht.` Listede. |
| 5 | h3 | g2 | Bugün öğleden önce, saat onda mı? | geçer | Kalıp 2'nin düzeniyle: `Heute Vormittag, um zehn?` Listede. |
| 5 | h3 | g3 | Bugün öğlen muayenehane kapalı. | geçer | "bugün öğlen" kartta hazır. `Heute Mittag ist die Praxis geschlossen.` Listede. |
| 5 | h3 | g4 | Öğlen görüşürüz Tobi! | geçer | "Öğlen" ekli değil, 1. günün kalıbındaki gibi yalın yazdım. `Bis Mittag, Tobi!` Listede. |
| 5 | h3 | g5 | Öğleden sonra saat üçte mi? | geçer | |
| 5 | h3 | g6 | Muayenehane salı günü öğleden sonra açık mı? | geçer | İki küçük kelime arka arkaya geldi, ikisini de yazdım. Listede. |
| 5 | h3 | g7 | Bu akşam saat yedide mi? | geçer | |
| 5 | h3 | g8 | Akşam mı? Hayır, bu çok geç. | geçer | |
| 5 | h3 | g9 | Gece mi? Hayır, teşekkürler! | geçer | |
| 5 | h3 | g10 | Bu gece mi? Hayır, yarın sabah. | geçer | "bu gece" gece kartında hazır. Listede. |
| 5 | h3 | ortam | İş yeri, koridor. Şefin Wimmer Bey seninle kısa bir görüşme için uygun saat arıyor. | geçer | |
| 5 | h3 | s1 | Bugün öğleden sonra saat üçte mi? | geçer | |
| 5 | h3 | s2 | Öğleden sonra olmuyor. Yarın sabah? | geçer | |
| 5 | h3 | s3 | Tamam, yarın sabah saat sekizde. | geçer | |
| 5 | h3 | soru | Wimmer Bey'le ne zaman görüşeceksin? (Bugün öğleden sonra üçte / Yarın sabah sekizde / Bu akşam / Yarın öğlen) | geçer | Tek cevap: Yarın sabah sekizde. |

### h4 — Randevu saati uyuyor mu?

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 5 | h4 | başlık | Randevu saati uyuyor mu? | geçer | Bkz. N5. |
| 5 | h4 | kalıp 1 | … size uyar mı? – … maalesef uymuyor. | geçer | Bana öğrettiği: bir saati teklif ederim, uymayan saati kibarca geri çeviririm. |
| 5 | h4 | kalıp 2 | saati (vakti) – Saat kaçta? | geçer | Bana öğrettiği: bir şeyin saatinden söz ederken üçüncü bir "saat" kelimesi var. Ardından saat kaçta diye sorarım. Parantez anlamı daralttı. Bkz. N7. |
| 5 | h4 | g1 | Randevum perşembe günü. | geçer | 2. günün "benim …" kalıbı. Listede. |
| 5 | h4 | g2 | Randevum ne zaman Huber Hanım? Salı günü mü? | geçer | |
| 5 | h4 | g3 | Saati bana uyar Huber Hanım. | geçer | "bana" kelimesini uymak kartının ipucundan aldım. `Die Uhrzeit passt mir, Frau Huber.` Listede. |
| 5 | h4 | g4 | Saati mi? Onu çeyrek geçe. | **geri döner** | K6. Aşağıda. |
| 5 | h4 | g5 | Pazartesi saat sekizde size uyar mı? | geçer | Kalıbın ilk yarısı. Listede. |
| 5 | h4 | g6 | Perşembe uyar ama cuma uymuyor. | geçer | `Donnerstag passt, aber Freitag passt nicht.` Listede. |
| 5 | h4 | g7 | Cuma günü maalesef olmuyor. | geçer | `Am Freitag geht leider nicht.` Listede. |
| 5 | h4 | g8 | Saat sekiz maalesef uymuyor. Saat dokuz uyar. | geçer | "saat sekiz" için h1'in kalıp 2'si. Listede. |
| 5 | h4 | g9 | Doktor mu? Hayır, bugün değil. | geçer | `Der Arzt? Nein, nicht heute.` Listede. |
| 5 | h4 | g10 | Doktor saat onda geliyor, dokuzda değil. | geçer | "geliyor" için 3. günün dersi. Listede. |
| 5 | h4 | ortam | Telefon. Huber Hanım randevu için bir saat öneriyor. | geçer | |
| 5 | h4 | s1 | Salı saat üçü çeyrek geçe size uyar mı? | geçer | "saat" sözü olunca "üçü" tek okumada oturdu. |
| 5 | h4 | s2 | Salı maalesef uymuyor. Perşembe? | geçer | |
| 5 | h4 | s3 | Perşembe saat dörtte. Uyar mı? | geçer | |
| 5 | h4 | s4 | Perşembe saat dörtte uyar. Teşekkürler! | geçer | |
| 5 | h4 | soru | Randevu ne zaman? (Salı 15:15 / Perşembe 16:00 / Perşembe 15:15 / Salı 16:00) | geçer | Tek cevap: Perşembe 16:00. Şıklar gün ve saati karıştırıyor ama sahnede açık. |

### h5 — Doktor yine burada

| Gün | Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|---|
| 5 | h5 | başlık | Doktor yine burada | geçer | |
| 5 | h5 | kalıp 1 | … burada mı? – … yine burada. | geçer | Bana öğrettiği: biri burada mı diye sorarım, geri döndüğünü söylerim. |
| 5 | h5 | kalıp 2 | O zaman … görüşürüz! | geçer | 1. günün "… görüşürüz" kalıbının başına bir kelime geldi. |
| 5 | h5 | g1 | Sekiz buçukta geliyorum. | geçer | Bir önceki halkanın kuralı: sekiz buçuk için dokuzdan söz edilir. `Ich komme um halb neun.` Listede. |
| 5 | h5 | g2 | Doktor ne zaman geliyor Huber Hanım? | geçer | |
| 5 | h5 | g3 | Perşembe günü yine geliyorum. | geçer | Üç sırayla da listede. |
| 5 | h5 | g4 | Dr. Weber perşembe günü yine burada mı? | geçer | Kalıbın ilk yarısı. Bkz. N10. |
| 5 | h5 | g5 | Huber Hanım bugün burada mı? | geçer | |
| 5 | h5 | g6 | Ben saat sekizde oradayım. | geçer | Kartta "burada, orada" ikisi de yazıyor. `Ich bin um acht da.` Listede. |
| 5 | h5 | g7 | O zaman perşembe görüşürüz Huber Hanım! | geçer | Kalıp 2. |
| 5 | h5 | g8 | Bugün olmuyor mu? O zaman yarın sabah. | geçer | 1. günün kalıbıyla düz sırada yazdım: `Heute geht nicht? Dann morgen früh.` Listede. |
| 5 | h5 | g9 | Saat onda mı? Evet, memnuniyetle! | geçer | |
| 5 | h5 | g10 | Evet, memnuniyetle Ioana! Cumartesi günü mü? | geçer | |
| 5 | h5 | ortam | Telefon. Muayenehaneyi arıyorsun. Huber Hanım Dr. Weber'in ne zaman döneceğini söylüyor. | geçer | |
| 5 | h5 | s1 | Dr. Weber perşembe günü yine burada. | geçer | |
| 5 | h5 | s2 | O zaman perşembe günü geliyorum. | geçer | |
| 5 | h5 | s3 | Memnuniyetle. Onu çeyrek geçe mi? | **geri döner** | K6. |
| 5 | h5 | s4 | Evet, uyar. Perşembe görüşürüz! | geçer | |
| 5 | h5 | soru | Bugün Dr. Weber muayenehanede mi? (Evet, saat onda / Hayır, perşembe günü dönüyor / Evet, öğleden sonra / Hayır, cuma günü dönüyor) | geçer | Tek cevap: Hayır, perşembe günü dönüyor. "yine burada" sözünden bugün olmadığını çıkardım. |

## Geri dönenler — kendi sözlerimle

### K5 — "Saat … mı?" sorusu (Gün 5, iki satır)

- `h1/g4` "Saat on mu? Bu çok geç." — `Zehn Uhr? Das ist zu spät.`
- `h2/g6` "Saat altı mı? Peki, yarın görüşürüz!" — `Es ist sechs? Also, bis morgen!`

Kendi sözlerimle: Saatin kaç olduğunu şaşırarak soruyorum, sonra ne düşündüğümü söylüyorum.

Neden geri: h1'in ilk kalıbı "Saat …" için `Es ist … Uhr` veriyor. 1. günün kalıbı "Bugün … mı?" için iki kelimeyi yer değiştirmeyi öğretti. İkisini birleştirip yazdım: `Ist es zehn Uhr? Das ist zu spät.` ve `Ist es sechs Uhr? Also, bis morgen!`. İkisi de listede yok. Aynı halkanın `h1/g6` satırında bu sıra kabul ediliyor (`Ist es drei Uhr oder drei Stunden?`). Aynı soru biçimi bir satırda doğru, iki satırda yanlış. Türkçeler açık ve Almancayla aynı şeyi söylüyor.

### K6 — "Onu çeyrek geçe" (Gün 5, iki satır)

- `h4/g4` "Saati mi? Onu çeyrek geçe." — `Die Uhrzeit? Viertel nach zehn.`
- `h5/s3` "Memnuniyetle. Onu çeyrek geçe mi?" — `Gern. Um Viertel nach zehn?`

Kendi sözlerimle: Saatin on on beş olduğunu söylüyorum ya da soruyorum.

Neden geri: Cümlenin başında "Onu" yazınca ilk okumada "onu, o şeyi" diye okudum. "Saati mi? Onu …" yan yana gelince daha da öyle. Saatin "on" olduğunu ikinci okumada anladım. Aynı günün başka satırlarında "saat" sözü önde: "Salı saat üçü çeyrek geçe", "Saat on biri çeyrek geçiyor". Orada tek okumada oturdu. `h4/g4` yazdırılan bir satır. Çözünce yazdığım cümle listede: `Die Uhrzeit? Viertel nach zehn.` Takıldığım yer yalnızca okuma. `h5/s3` yalnızca okunan bir satır, aynı yerde takıldım.

### K7 — "bir avro": `einen` mi, `ein` mi? (kart, iki alan)

Aşağıda kart bölümünde.

### Gün 4 `h1/g9` — "Üç avro yetmiş sent."
Almancası: `Drei Euro und siebzig Cent.`

Kendi sözlerimle: Bir şeyin fiyatını avro ve sentiyle tam söylüyorum.

Neden geri: Yazdığım `Drei Euro siebzig Cent.` listede, çeviride takılmadım. Takıldığım yer cevabı gördüğüm an. Avro kartının ikinci uyarısı tam bu biçim için "kasada pek denmez" diyor. Sent kartının üçüncü uyarısı da "avrodan sonra sent genelde söylenmez" diyor. Sonra bu satır bana doğru cevap olarak tam bu biçimi gösteriyor. Hangisine inanacağımı bilemedim. Türkçede "ve" de yok, Almancada var.

### Gün 4 `h4/g8` — "Bir avro yüz sent."
Almancası: `Ein Euro ist hundert Cent.`

Kendi sözlerimle: Bir avronun yüz sente eşit olduğunu söylüyorum.

Neden geri: Bugün bütün fiyatları bu düzende okudum: "üç avro yetmiş sent", "bir avro on", "bir avro yirmi". "Bir avro yüz sent" de ilk okumada bir fiyat gibi göründü: bir avro artı yüz sent. Bir şeyin bir şeye eşit olduğunu ikinci okumada anladım. Sent kartının örneğinde bu fikir açık: "Yüz sent bir avro eder." Çözünce yazdığım `Ein Euro ist hundert Cent.` listede.

### Gün 4 `h4/g10` — "Altmış avro; nakit mi, kartla mı?"
Almancası: `Sechzig Euro, bar oder mit Karte?`

Kendi sözlerimle: Tutarı söyleyip nasıl ödeyeceğimi soruyorum.

Neden geri: Ortada noktalı virgül var. Anlamı tek okumada anladım. Yazdığım `Sechzig Euro, bar oder mit Karte?` listede.

### Gün 5 `h2/kalıp 1` — "dokuz buçuk = saat dokuz otuz (Almanca gelecek saati söyler: ona yarım saat var)"
Almancası: `halb zehn = neun Uhr dreißig`

Kendi sözlerimle: Almancada dokuz buçuk derken dokuzdan değil ondan söz edilir: "ona yarım" denir.

Neden geri: İki yerde eşittir işareti var, Almancada ve Türkçede. Tek satırda iki fikir var: iki söyleyişin aynı saat olduğu, ve Almancanın neden ondan söz ettiği. Parantezin içinde iki nokta üst üste ile bir fikir daha açılıyor. Telefonda uzun bir satır. Bana öğrettiği şey çok değerli. Bütün halka buna dayanıyor ve görev cümlelerinde doğru kullandım. "gelecek saati söyler" sözünü ilk okumada "ileride olacak saat" diye okudum, sonra "bir sonraki saat" olduğunu anladım.

## Kartlar — `lx:Euro`, `lx:Cent`

Mekanik tarama: `=`, `;`, `…`, tırnak ve 14 kelimeden uzun cümle yok (en uzun cümle 12 kelime: `lx:Euro` `mistakes_tr[3]`). Dilbilgisi terimi yok. İki nokta üst üste var (`lx:Euro` `mistakes_tr[0]`, `forms[0].hint_tr`). Yasak işaretler arasında değil.

### `lx:Euro`

| kart | alan | Türkçe | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:Euro | tr | avro | Avrupa'nın parası | GEÇTİ | |
| lx:Euro | exp.anlam_tr | Almanya'da kullanılan para birimini söyler. | Almanya'daki paranın adı | GEÇTİ | |
| lx:Euro | exp.ne_zaman_tr | Fiyat sorarken, fiyat söylerken ve öderken. | alışverişte her an | GEÇTİ | |
| lx:Euro | mistakes_tr[0] | Üç avro derken **drei Euros** yanlış. Doğrusu **drei Euro**: sayıdan sonra **Euro** değişmez. **Euros** yalnızca madeni paraların kendisi için söylenir. | Sayıdan sonra sonuna "s" koymam. Üçüncü cümleyi anlatamıyorum. | **GERİ** | İki fikir. İlk iki cümle açık. Üçüncü cümle ikinci bir kural getiriyor ve onu anlamadım. "madeni paraların kendisi" ne demek? Kâğıt paralar için ne derim? Kartın başında çoğul olarak tam bu "s"li biçim yazıyor; uyarıyla birlikte okuyunca kafam karıştı. |
| lx:Euro | mistakes_tr[1] | Kasada **zwei Euro und fünfzig Cent** pek denmez. Kısaca **zwei Euro fünfzig** denir. | Kasada fiyatı söylerken "ve … sent" demem, kısaltırım. | GEÇTİ | Gün 4 `h1/g9` ile çelişiyor, o satır geri döndü. |
| lx:Euro | mistakes_tr[2] | **Euro** Almancada **oyro** gibi okunur, **avro** ya da **yuro** diye değil. | Kelime "oyro" diye söylenir. | GEÇTİ | |
| lx:Euro | mistakes_tr[3] | Bir avro tutar derken **Das kostet einen Euro** denir, **ein Euro** değil. | Fiyat bir avroysa `einen` derim, `ein` demem. | **GERİ** | K7. Aşağıda. |
| lx:Euro | collocations[0].tr | üç avro elli | 3,50 € | GEÇTİ | |
| lx:Euro | collocations[1].tr | Toplam on avro. | kasada toplam on avro | GEÇTİ | |
| lx:Euro | collocations[2].tr | Bu bir avro. | bunun fiyatı bir avro | GEÇTİ | |
| lx:Euro | collocations[3].tr | kilosu iki avro | bir kilosu iki avro | GEÇTİ | |
| lx:Euro | examples[0].tr | Ekmek üç avro yetmiş. | ekmeğin fiyatı | GEÇTİ | |
| lx:Euro | examples[1].tr | Bir kilo elma iki avro doksan. | elmanın kilo fiyatı | GEÇTİ | |
| lx:Euro | examples[2].tr | Sadece on avrom kaldı. | elimde az para kaldı | GEÇTİ | |
| lx:Euro | examples[3].tr | – Peynir ne kadar? – Dört avro yirmi. | peynirin fiyatını soruyorum | GEÇTİ | |
| lx:Euro | examples[4].tr | – Toplam altı avro kırk. – Kartla, lütfen. | kasada kartla ödüyorum | GEÇTİ | |
| lx:Euro | examples[5].tr | İki küçük ekmek ve bir ekmek dört avro seksen. | üç şeyin toplam fiyatı | GEÇTİ | |
| lx:Euro | forms[0].tr | Ekmek üç avro yetmiş. | | GEÇTİ | |
| lx:Euro | forms[0].hint_tr | Fiyatta önce **Euro** gelir, sonra sent: **drei Euro siebzig**. | Önce avro kelimesi, sonra sentin sayısı. | GEÇTİ | "sonra sent" sözü sent kelimesini de söyleyecekmişim gibi okunabilir. Örnek bunu çözüyor. |
| lx:Euro | forms[1].tr | Toplam on avro, lütfen. | | GEÇTİ | |
| lx:Euro | forms[1].hint_tr | Sayıdan sonra **Euro** değişmez: **zehn Euro**. | On avroda da kelime aynı kalır. | GEÇTİ | "değişmez" sözünü 3. günün "bir gün – dört gün" kalıbından tanıyorum. |
| lx:Euro | forms[2].tr | Sadece yirmi avrom var. | | GEÇTİ | |
| lx:Euro | forms[2].hint_tr | Yirmi avro derken **zwanzig Euro** denir, sonuna **s** gelmez. | Sonuna "s" koymam. | GEÇTİ | |
| lx:Euro | forms[3].tr | Bu bir avro. | | GEÇTİ | |
| lx:Euro | forms[3].hint_tr | Bir avro tutar derken **einen Euro** denir. | Fiyat bir avroysa `einen` derim. | **GERİ** | K7. |
| lx:Euro | forms[4].tr | Bir küçük ekmek altmış sent, on küçük ekmek altı avro. | | GEÇTİ | |
| lx:Euro | forms[4].hint_tr | Altı avro derken **sechs Euro** denir. | | GEÇTİ | |
| lx:Euro | forms[5].tr | Kilosu ne kadar? – İki avro doksan. | | GEÇTİ | |
| lx:Euro | forms[5].hint_tr | İki avro doksan derken **zwei Euro neunzig** denir. | | GEÇTİ | |

### `lx:Cent`

| kart | alan | Türkçe | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:Cent | tr | sent | avronun küçük parası | GEÇTİ | |
| lx:Cent | exp.anlam_tr | Avronun yüzde birini söyler. | yüz tanesi bir avro eder | GEÇTİ | |
| lx:Cent | exp.ne_zaman_tr | Küçük fiyatlarda ve bozuk para öderken. | poşet, küçük ekmek gibi ucuz şeylerde | GEÇTİ | |
| lx:Cent | mistakes_tr[0] | Elli sent derken **fünfzig Cents** yanlış. Doğrusu **fünfzig Cent**. | Sonuna "s" koymam. | GEÇTİ | |
| lx:Cent | mistakes_tr[1] | Etikette 0,50 € yazıyorsa **null Euro fünfzig** denmez. **Fünfzig Cent** denir. | Avro yoksa yalnızca senti söylerim. | GEÇTİ | Halkanın kalıp 2'siyle aynı. |
| lx:Cent | mistakes_tr[2] | Bir avro elli derken **Cent** genelde söylenmez. Kısaca **ein Euro fünfzig** denir. | Avro varsa sent kelimesini atarım. | GEÇTİ | Kendi başına açık. Avro kartının dördüncü uyarısıyla yan yana gelince K7'ye takıldım. |
| lx:Cent | collocations[0].tr | elli sent | | GEÇTİ | |
| lx:Cent | collocations[1].tr | sadece on sent | | GEÇTİ | |
| lx:Cent | collocations[2].tr | yüz sent | | GEÇTİ | |
| lx:Cent | examples[0].tr | Bir küçük ekmek altmış sent. | | GEÇTİ | Bkz. N2. |
| lx:Cent | examples[1].tr | Yüz sent bir avro eder. | yüz sent ile bir avro aynı para | GEÇTİ | |
| lx:Cent | examples[2].tr | Yirmi sentin var mı? | birinden bozuk para istiyorum | GEÇTİ | |
| lx:Cent | examples[3].tr | – Toplam iki avro on. – Bir saniye, on sent bende var. | Tam parayı vermek için bozukluğu arıyorum. | GEÇTİ | |
| lx:Cent | examples[4].tr | – Poşet ne kadar? – Sadece on sent. | | GEÇTİ | |
| lx:Cent | examples[5].tr | Brandl Hanım seksen senti nakit ödüyor. | | GEÇTİ | |
| lx:Cent | forms[0].tr | Bir küçük ekmek altmış sent. | | GEÇTİ | |
| lx:Cent | forms[0].hint_tr | Sayıdan sonra **Cent** aynı kalır: **sechzig Cent**. | | GEÇTİ | |
| lx:Cent | forms[1].tr | Yüz sent bir avro eder. | | GEÇTİ | |
| lx:Cent | forms[1].hint_tr | Yüz sent derken **hundert Cent** denir. | | GEÇTİ | |
| lx:Cent | forms[2].tr | Poşet on sent. | | GEÇTİ | |
| lx:Cent | forms[2].hint_tr | On sent derken **zehn Cent** denir, sonuna **s** gelmez. | | GEÇTİ | |
| lx:Cent | forms[3].tr | Bir elma elli sent. | | GEÇTİ | |
| lx:Cent | forms[3].hint_tr | Elli sent derken **fünfzig Cent** denir. | | GEÇTİ | |
| lx:Cent | forms[4].tr | Bir avroda yüz sent var. | | GEÇTİ | |
| lx:Cent | forms[4].hint_tr | Bir avroda **hundert Cent** var. | | GEÇTİ | Boşluğa gelen kelime sayının kendisi. İpucu onu veriyor. |
| lx:Cent | forms[5].tr | Yirmi sentin var mı? | | GEÇTİ | |
| lx:Cent | forms[5].hint_tr | Yirmi sent derken **zwanzig Cent** denir. | | GEÇTİ | |

### K7 — "bir avro": `einen` mi, `ein` mi?

- `lx:Euro` `mistakes_tr[3]`: "Bir avro tutar derken **Das kostet einen Euro** denir, **ein Euro** değil."
- `lx:Euro` `forms[3].hint_tr`: "Bir avro tutar derken **einen Euro** denir."

Kendi sözlerimle: Bir şeyin fiyatı bir avroysa `einen Euro` derim.

Neden geri: Kural tek başına açık. Ama ne zaman geçerli olduğunu Türkçeden göremiyorum. Aynı gün üç yerde fiyat söylerken `ein Euro` görüyorum:
- Sent kartının üçüncü uyarısı: "Bir avro elli derken … **ein Euro fünfzig** denir."
- Gün 4 `h2/s1`: "İki küçük ekmek: bir avro on." Almancası `ein Euro zehn`.
- Gün 4 `h2/s3`: "Bir avro yirmi, lütfen." Almancası `Ein Euro zwanzig`.

Türkçede hepsi "bir avro". Uyarının sınırını çizen söz "tutar" kelimesi. Ama bugünkü cümlelerde Türkçe hiç "tutar" demiyor. "Ekmek üç avro" da aynı Almanca kelimeyle kuruluyor. Yarın "Bu bir avro elli" görsem `einen` mi yazarım, `ein` mi, bilemem. İki kart bana aynı söz için iki ayrı şey söylüyor.

## Notlar (karar değil, baş geliştiriciye)

**N1 — Gün 4 `h3/g2`, "Toplam yirmi avro mu?"** "Toplam …" kalıbını tek parça aldığım için düz sırayla yazdım ve kabul edildi. Ama 1. günden beri "… mı?" görünce kelimeleri yer değiştirmeye alıştım. `h1/g4` "Ekmek iki avro mu?" satırında iki sıra da kabul ediliyor. Burada soru sırasıyla (`Macht das zwanzig Euro? Nicht zwölf?`) yazsam listede yok. Geri çevirmedim, çünkü kalıp bu sözü hazır bir blok gibi veriyor. K5 ile aynı türden.

**N2 — küçük ekmeğin fiyatı.** Gün 4 `h2` sahnesinde iki küçük ekmek bir avro on. `h2/g8` "Bugün doksan sent" diyor. Sent kartının örneğinde bir küçük ekmek altmış sent, yani ikisi bir avro yirmi. Bu da sahnedeki toplamın ta kendisi. Soruyu sahneden okuyarak çözdüm: sahne fiyatı açıkça söylüyor. Ama kartı aklında tutan biri bir an "poşet bedava mı" diye durabilir. "Ödemiyorsun" diye bir şık yok; o yüzden yanlış şıkka gitmiyor.

**N3 — Gün 4 `h2/s1` ve `s3`.** Satırlar yalnızca okunuyor. `ein Euro` biçimi K7'nin öbür ucu.

**N4 — Gün 5 `h2` başlığı.** "halb zehn tuzağı": Halkayı açmadan Almanca iki kelimenin ne olduğunu bilmiyorum. "zehn" on demek, "halb" yeni. Kalıbı okuyunca tuzağın ne olduğu oturdu. Tırnak içinde değil, o yüzden geri çevirmedim.

**N5 — Gün 5 `h4` başlığı.** "Randevu saati uyuyor mu?" Bir an "uyumak" diye okudum. "randevu saati" sözü hemen düzeltti. Halkanın içinde hep "uyar" yazıyor.

**N6 — Gün 5 `h2/g7` ve `g8`.** "olmuş" ve "oldu" Türkçede geçmiş gibi duruyor, Almancası şimdi. 1. günün kalıbı geçmiş için başka bir kelime öğretti. Çoktan kartının örneği ("Fırın çoktan kapandı") beni doğru biçime götürdü. Durdurmadı.

**N7 — üç "saat".** Gün 5'te `Uhr`, `Stunde` ve `Uhrzeit` üçünün de Türkçesi "saat". h1'in kalıp 2'si ilk ikisini çok iyi ayırıyor. Üçüncüsü için h4'ün kalıp 2'si "saati (vakti)" diyor. Görev cümlelerinde "Saati …" ile başlayan iki satırda doğru kelimeyi seçtim. Kalıbın ikinci yarısı "Saat kaçta?" hiçbir görev cümlesinde istenmiyor.

**N8 — Gün 5 `h1` sorusu.** Sahnede "saat dört" geçiyor, şıklar 16:00 biçiminde. Ortamdaki "öğleden sonra" sözü dördü 16:00'ya çeviriyor. Tek cevap var; ortamı okumadan soruya geçen biri 4 + 2 = 6 diye "06:00" arar ve bulamaz.

**N9 — Gün 4 `h1` kalıp 2.** Parantezde rakam ve € işareti var. OD-9.2'nin yasakladıkları arasında değil, bana yardım etti.

**N10 — "yine burada" telefonda.** Gün 5 `h5/g4` "Dr. Weber perşembe günü yine burada mı?" Telefonda arayan ben olsam Türkçede "orada" derdim. Görev cümlesinde kim, nereden soruyor yazmıyor; beni durdurmadı. Sahnede "burada" diyen Huber Hanım, muayenehanede. Doğru.

## 2. tur

Kaynak: `docs/v2/reviews/halka/gun-04-yazar.md` ve `gun-05-yazar.md` sonundaki "Okur 1. tur sonrası (İçerik Motoru)" bölümleri; ek olarak `gun-03-yazar.md` sonundaki "#177 takibi". Yalnız değişen satırlar ve aynı halkadaki komşuları okundu (PM-079 md. 3). Bilinen küme 1. turdaki gibi; 3. gün için `halka-gun-02-03.md` 1. turdaki küme.

### Gün 4, Gün 5 ve `lx:Euro` (1. turda geri dönen 11 satır)

| satır | yeni metin | kendi sözlerimle | karar |
|---|---|---|---|
| G4 `h1/g9` | Yetmiş avro değil, yetmiş sent! — `Nicht siebzig Euro – siebzig Cent!` | Fiyatı düzeltiyorum: yetmiş avro değil, yetmiş sent. | GEÇTİ. Yazdığım `Nicht siebzig Euro, siebzig Cent!` listede ("… değil" kalıbı, aynı halkanın `g8`'i). Kartın "pek denmez" dediği biçim artık cevap olarak görünmüyor. Kalıp 2 ile aynı yönde. |
| G4 `h4/g8` | Bir avro yüz sent eder. — `Ein Euro ist hundert Cent.` | Bir avro ile yüz sent aynı para. | GEÇTİ. "eder" fiyat okunuşunu kesiyor, tek okumada oturdu. Yazdığım `Ein Euro ist hundert Cent.` listede. Not 2. |
| G4 `h4/g10` | Altmış avro. Nakit mi, kartla mı? | Tutarı söylüyorum, nasıl ödeyeceğini soruyorum. | GEÇTİ. Noktalı virgül yok. Aynı halkanın sahne `s1`'iyle aynı düzen. Yazdığım listede. |
| `lx:Euro` `mistakes_tr[0]` | Üç avro derken **drei Euros** yanlış. Doğrusu **drei Euro**. Sayıdan sonra **Euro** değişmez. | Sayıdan sonra avronun sonuna "s" koymam. | GEÇTİ. Tek fikir, üç kısa cümle. Takip 1. |
| `lx:Euro` `mistakes_tr[3]` | (çıktı) | — | GEÇTİ. Belirsiz uyarı kalktı; kalan üç uyarı birbiriyle ve sent kartıyla çelişmiyor. Takip 2. |
| `lx:Euro` `forms[3]` (`tr` ve `hint_tr`) | Beş avro ödüyorum. · Sayıdan sonra **Euro** değişmez: **fünf Euro**. | Beş avro veriyorum; sayıdan sonra kelime aynı kalır. | GEÇTİ. Boşluğa giden tek kelime var, ipucu onu veriyor. `einen`/`ein` sorusu artık yok. Not 3. |
| G5 `h1/g4` | Saat on mu? Bu çok geç. (+ `Ist es zehn Uhr? Das ist zu spät.`) | Saatin on olduğuna şaşırıyorum, bu bana geç. | GEÇTİ. Soru sırasıyla yazdığım cümle artık listede; `g6` ile aynı. |
| G5 `h2/g6` | Saat altı mı? Peki, yarın görüşürüz! (+ `Ist es sechs Uhr? Also, bis morgen!`) | Saatin altı olduğunu öğreniyorum, vedalaşıyorum. | GEÇTİ. Yazdığım listede. Not 4. |
| G5 `h2/kalıp 1` | dokuz buçuk – saat dokuz otuz · `halb zehn – neun Uhr dreißig` | Dokuz buçuğun iki söyleyişi; Almancada biri ondan söz ediyor. | GEÇTİ. Eşittir yok, tek fikir, kısa. "dokuz buçuk"un altında `zehn` görünce tuzağı kendim fark ettim; `g1` ve `g2`'yi doğru yazdım. Not 5. |
| G5 `h4/g4` | Saati mi? Saat onu çeyrek geçe. | Randevunun saatini söylüyorum: on on beş. | GEÇTİ. "Saat" önde olunca "onu" tek okumada "on" oldu. Aynı halkanın `s1`'i ("saat üçü çeyrek geçe") gibi okudum. Yazdığım `Die Uhrzeit? Um Viertel nach zehn.` listede. Not 1. |
| G5 `h5/s3` | Memnuniyetle. Saat onu çeyrek geçe mi? | Huber Hanım on on beşi öneriyor. | GEÇTİ. Tek okumada. `s4` "Evet, uyar." ile ve soru şıklarıyla çelişki yok. |

### Gün 3 (#177 takibi, üç satır)

| satır | yeni metin | kendi sözlerimle | karar |
|---|---|---|---|
| G3 `h1/g3` | Sıfır mı Huber Hanım? Evet, sıfır. — `Null, Frau Huber? Ja, null.` | Huber Hanım'a rakamın sıfır olduğunu doğruluyorum. | GEÇTİ. Yazdığım `Null, Frau Huber? Ja, null.` listede. "başta" sözü kalktı, yer bildiren küçük kelime istenmiyor. Komşu `g4` ile çakışma yok. |
| G3 `h5/kalıp 2` | yeni ofis – ofiste · `das neue Büro – im Büro` | "ofiste" derken önüne `im` gelir, `das` gitmez. | GEÇTİ. `h1` kalıp 2 ("üç numara – üç numarada") ile aynı düzende. `g9` ve `g10`'u bu kalıptan `im Büro` diye yazdım, ikisi de listede. |
| G3 `h4/soru` | On dörtten sonra, senden önce kaç numara çağrılacak? (Hiç / Bir / İki / Üç) | On dört ile benim on altım arasında kaç numara var? | GEÇTİ. Hesaplanıyor: yalnız on beş, cevap Bir. Tek okumada; 1. turdaki iki okuma gerekmedi. Şıklar yalın. |

### Notlar (karar değil)

1. G5 `h4/g4`: "Saat …" ile başlayan Türkçe, `h1` kalıp 1'den (`Saat … – Es ist … Uhr`) `Die Uhrzeit? Es ist Viertel nach zehn.` yoluna da götürebilir. Bu biçim listede yok. Ben "geçe" sözünden `um` yolunu seçtim, o listede.
2. G4 `h4/g8`: "eder" sözünü sent kartının örneğinden tanıyorum (`Hundert Cent sind ein Euro.`). Oradan kopyalayan biri `Ein Euro sind hundert Cent.` yazabilir. Bu biçim listede yok.
3. `lx:Euro` `forms[3]`: ipucu `forms[1]`'in ipucuyla aynı şeyi öğretiyor. `zahlen` kartı 4. halkada geliyor, avro kartı 1. halkada. Türkçe tam olduğu için durdurmadı.
4. G5 `h2/g6`: Saatsiz soru sırası (`Ist es sechs? Also, bis morgen!`) listede yok. Ana cevapta `Uhr` olmadığı için akla gelebilir.
5. G5 `h2/kalıp 1`: "neden ondan söz ediliyor" açıklaması kalktı. Kalıp yine de işini görüyor; açıklama kartta (`lx:halb`) duruyorsa yeter.

### Takip işleri (eski, değişmemiş alanlar; engel değil)

1. `lx:Euro` `pl: Euros`: Uyarıdaki üçüncü cümle çıkınca kartın başında görünen "Euros" biçimi açıklamasız kaldı. Uyarı da "drei Euros yanlış" diyor.
2. `lx:Euro` `collocations[2]`: `Das kostet einen Euro.` · "Bu bir avro." `einen` hâlâ görünüyor ve bir açıklaması yok. Sent kartında ve Gün 4 `h2/s1`, `s3` satırlarında `ein Euro …` var. K7'nin kökü bu eşdizimde duruyor; bugün hiçbir görev bunu yazdırmıyor.

### Sonuç, 2. tur

| | Okunan | GEÇTİ | GERİ |
|---|---|---|---|
| Gün 4 (`gun-04-halkalar.json`) | 3 | 3 | 0 |
| Gün 5 (`gun-05-halkalar.json`) | 5 | 5 | 0 |
| `lx:Euro` (`batch-015.json`) | 3 | 3 | 0 |
| Gün 3 (`gun-03-halkalar.json`, #177 takibi) | 3 | 3 | 0 |
| Toplam | 14 | 14 | 0 |

- `gun-04-halkalar.json`: geri dönen yok.
- `gun-05-halkalar.json`: geri dönen yok.
- `batch-015.json` (`lx:Euro`, `lx:Cent`): geri dönen yok.
- `gun-03-halkalar.json` (değişen üç satır): geri dönen yok.

Okur yönünden Gün 4, Gün 5 ve kart dosyası OD-9.4'e göre "reviewed" sayılabilir. 3. gün dosyasının 1. turdan kalan geri dönüşleri bu turun kapsamında değil.
