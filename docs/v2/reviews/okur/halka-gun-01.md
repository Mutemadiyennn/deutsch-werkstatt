# Okur kontrolü — Gün 1 halkaları (OD-9.3)

Kaynak: `docs/v2/reviews/halka/gun-01-halkalar.json` (5 halka).
Okuyan: ilk gün öğrencisi gözüyle; dilbilgisi terimi bilmiyor, telefondan okuyor.

Her satırda üç şeye baktım:
1. Türkçeyi tek okumada anladım mı?
2. Türkçe, Almanca cümleyle aynı şeyi mi söylüyor?
3. Türkçeden Almancaya çevirirken bu Türkçe beni tek bir Almanca cümleye götürüyor mu?

Sahne sorularında: sahneyi okuyunca tek doğru cevabı buldum mu?

Satır sayımı: başlık 1, görev cümlesi 10, sahne satırı 4 (adsız biçim ayrı satır), soru ve şıkları 1.

## Sonuç

| | |
|---|---|
| Toplam satır | 83 |
| Geçer | 76 |
| Geri döner | 7 |

Geri dönenler: `h1/g9`, `h2/g1`, `h2/g3`, `h2/g7`, `h3/g3`, `h3/g5`, `h5/g8`.

Dosyada geri dönen satır olduğu için bu hâliyle "reviewed" sayılamaz (OD-9.4).

Geçen satırların bir kısmında not var. Notlar karar değildir, ama üçü baş geliştiricinin kararını bekliyor (aşağıda "Kesişen notlar").

## Tablo

### h1 — Selam ve teşekkür

| Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|
| başlık | Selam ve teşekkür | geçer | Açık. |
| g1 | Merhaba Tobi! | geçer | |
| g2 | Alo? Huber Hanım? | geçer | Telefonda olduğumu anladım. "Alo" ile "Hallo" ses olarak yakın, doğru kelimeye gidiyorum. |
| g3 | Teşekkürler Stadler Hanım! | geçer | |
| g4 | Her şey için sağ ol Ioana! | geçer | Türkçe açık. Not N4: "her şey için" kısmını ilk gün Almanca söyleyemem. Not N3: aynı kelime g3'te "Teşekkürler", burada "sağ ol". |
| g5 | Evet, lütfen. | geçer | |
| g6 | Şunu lütfen. | geçer | |
| g7 | Merhaba Brandl Hanım! | geçer | "Brandl Hanım" yazımı bana açık. Bkz. N1. |
| g8 | Evet Huber Hanım. | geçer | |
| g9 | Teşekkürler Doktor Bey! | **geri döner** | Soyadı yok. Bu Türkçeden "Weber" çıkmaz. |
| g10 | Merhaba Pichler Bey! | geçer | |
| s1 | Merhaba! Buyurun? | geçer | |
| s2 | Merhaba Stadler Hanım! Şunu lütfen. | geçer | |
| s3 | Buyurun. | geçer | |
| s4 | Teşekkürler! | geçer | |
| soru | Frau Stadler 'Ja, bitte?' diyor. Ne demek istiyor? | geçer | Tek doğru cevabı buldum (Buyurun, ne istersiniz?). Not N1: soruda "Frau Stadler", sahnede "Stadler Hanım". Not N5: soruda tırnak içinde Almanca var. |

### h2 — Hafta içi

| Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|
| başlık | Hafta içi | geçer | |
| g1 | Pazartesi olmuyor. | **geri döner** | Almancada günün önünde küçük bir kelime var, Türkçede bunun işareti yok. Bkz. K1. |
| g2 | Pazartesi mi? Salı değil mi? | geçer | |
| g3 | Salı mı? Evet, lütfen. | **geri döner** | K1. g2'deki "Pazartesi mi?" ile aynı kalıp, ama Almancası farklı başlıyor. |
| g4 | Bugün salı, değil mi? | geçer | Not: "değil mi" g2'de başka kelimeye, burada başka kelimeye gidiyor. Karıştırabilirim ama cümle açık. |
| g5 | Bugün çarşamba mı? | geçer | |
| g6 | Çarşamba olmuyor ama perşembe olur. | geçer | Not N2. |
| g7 | Perşembe mi? Evet, olur. | **geri döner** | K1. h3'teki "Cumartesi mi?" ile aynı kalıp, Almancası farklı. |
| g8 | Perşembe görüşürüz Tobi! | geçer | |
| g9 | Cuma günü olur mu? | geçer | "günü" sözü bana Almancadaki küçük kelimeyi hatırlatıyor. Doğru örnek bu. |
| g10 | Bugün cuma! | geçer | |
| s1 | İyi günler, ben {name}. | geçer | |
| s1 adsız | İyi günler. | geçer | |
| s2 | İyi günler! Pazartesi olur mu? | geçer | |
| s3 | Pazartesi olmuyor. Perşembe olur mu? | geçer | Sahnede yalnızca okuyorum, sorun yok. |
| s4 | Perşembe, tamam. Perşembe görüşürüz! | geçer | |
| soru | Frau Huber ile hangi günde anlaşıyorsun? | geçer | Cevap tek: Perşembe. Not N1: burada da "Frau Huber". "Hangi günde anlaşıyorsun" biraz tuhaf ama anladım. |

### h3 — Hafta sonu ve hafta

| Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|
| başlık | Hafta sonu ve hafta | geçer | |
| g1 | Cumartesi mi? Evet, cumartesi olur! | geçer | |
| g2 | Yarın cumartesi mi? | geçer | Not N4: "yarın" kartı bir sonraki halkada. |
| g3 | Pazar günü her yer kapalı. | **geri döner** | h5'teki "Bugün her yer kapalı." ile aynı Türkçe, ama "kapalı" için iki ayrı Almanca kelime var. Ayrıca "her yer" h1'de "her şey" olan kelimeye gidiyor. |
| g4 | Peki pazar günü? Olur mu? | geçer | |
| g5 | Bugün cuma, hafta sonu geldi! | **geri döner** | Türkçede "geldi" var, Almancada yok. Çevirirken "geldi" için kelime ararım. |
| g6 | Peki hafta sonu, Tobi? | geçer | |
| g7 | Bu hafta olmuyor. | geçer | |
| g8 | Ioana bu hafta burada değil. | geçer | |
| g9 | İyi günler Brandl Hanım! | geçer | |
| g10 | Hangi gün olur? | geçer | |
| s1 | Merhaba! Bugün günlerden ne? Cumartesi mi? | geçer | |
| s2 | Cumartesi değil Brandl Hanım. Bugün pazar. | geçer | |
| s3 | Pazar mı? Ah evet! Pazar günü her yer kapalı. | geçer | Sahnede yalnızca okuyorum. g3'teki sorun burada beni durdurmuyor. |
| s4 | Evet. Yarın da pazartesi. | geçer | |
| soru | Bugün hangi gün? | geçer | Cevap sahnede açıkça yazıyor: Pazar. Tek doğru cevap. |

### h4 — Bugün, yarın, dün

| Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|
| başlık | Bugün, yarın, dün | geçer | |
| g1 | Bugün olmuyor. | geçer | |
| g2 | Wimmer Bey bugün burada mı? | geçer | |
| g3 | Yarın olur mu? | geçer | |
| g4 | Yarın görüşürüz Ioana! | geçer | |
| g5 | Tobi dün burada değildi. | geçer | |
| g6 | Dün mü? Bugün değil mi? | geçer | |
| g7 | Yarın olmuyor ama öbür gün olur. | geçer | Not N2. |
| g8 | Öbür gün cuma mı? | geçer | |
| g9 | Evvelsi gün pazartesiydi. | geçer | |
| g10 | Ioana evvelsi gün buradaydı. | geçer | |
| s1 | Merhaba {name}! Yarın olur mu? | geçer | |
| s1 adsız | Merhaba! Yarın olur mu? | geçer | |
| s2 | Yarın olmuyor. Öbür gün? | geçer | |
| s3 | Öbür gün cuma. Evet, olur! | geçer | |
| s4 | Tamam, cuma görüşürüz! | geçer | |
| soru | Bugün hangi gün? | geçer | Tek doğru cevap var (Çarşamba), ama ilk bakışta bulamadım. Bkz. N6. |

### h5 — Muayenehane kapalı mı?

| Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|
| başlık | Muayenehane kapalı mı? | geçer | |
| g1 | Bugün Dr. Weber'e gidiyor musun? | geçer | |
| g2 | Evet, çarşamba olur. | geçer | |
| g3 | Evet, teşekkürler Huber Hanım. | geçer | |
| g4 | Evet, pazartesi görüşürüz! | geçer | |
| g5 | Hayır, bugün olmuyor. | geçer | |
| g6 | Hayır, pazartesi değil, salı. | geçer | |
| g7 | Orası Dr. Weber muayenehanesi mi? | geçer | Telefonda sorduğumu anladım. |
| g8 | Pazartesi muayenehaneye gidiyorum. | **geri döner** | K1. Almancada günün önündeki küçük kelime burada da var, Türkçede işareti yok. |
| g9 | Kapalı mı? Bugün mü? | geçer | |
| g10 | Bugün her yer kapalı. | geçer | Kartın kendi kelimesi. h3/g3 ile çakışıyor, düzeltme o satırda. |
| s1 | İyi günler, ben {name}. Cumartesi olur mu? | geçer | |
| s1 adsız | İyi günler. Cumartesi olur mu? | geçer | |
| s2 | Hayır, hafta sonu muayenehane kapalı. | geçer | |
| s3 | Pazartesi olur mu? | geçer | |
| s4 | Evet, pazartesi olur. Teşekkürler! | geçer | |
| soru | Cumartesi neden olmuyor? | geçer | Cevap sahnede açık: muayenehane hafta sonu kapalı. Öbür üç şık sahnede hiç geçmiyor. |

## Geri dönenler — kendi sözlerimle

### h1/g9 — "Teşekkürler Doktor Bey!"
Almancası: `Danke, Herr Dr. Weber!`

Kendi sözlerimle: Bir doktora teşekkür ediyorum, adını söylemeden.

Neden geri: Almancada doktorun soyadı var, Türkçede yok. Bu Türkçeyi çevirirsem soyadı yazmam aklıma gelmez. h5'te aynı kişi "Dr. Weber" diye geçiyor, orada soyadı duruyor.

### h2/g1, h2/g3, h2/g7, h5/g8 — günün önündeki küçük kelime (K1)
- h2/g1 "Pazartesi olmuyor." — `Am Montag geht es nicht.`
- h2/g3 "Salı mı? Evet, lütfen." — `Am Dienstag? Ja, bitte.`
- h2/g7 "Perşembe mi? Evet, olur." — `Am Donnerstag? Ja, das geht.`
- h5/g8 "Pazartesi muayenehaneye gidiyorum." — `Ich gehe am Montag in die Praxis.`

Kendi sözlerimle: Bir gün söylüyorum, o gün olur ya da olmaz diyorum.

Neden geri: Aynı dosyada aynı Türkçe kalıp iki ayrı Almancaya gidiyor.
- "Pazartesi mi?" günü yalın söylüyor. "Salı mı?" ve "Perşembe mi?" önüne bir kelime koyuyor.
- "Çarşamba olmuyor" yalın. "Pazartesi olmuyor" önüne kelime koyuyor.

Türkçeye bakarak hangisini yazacağımı bilemiyorum. "Cuma günü olur mu?" ve "Peki pazar günü?" satırlarında "günü" sözü bana ipucu veriyor. Bu dört satırda o ipucu yok.

### h3/g3 — "Pazar günü her yer kapalı."
Almancası: `Am Sonntag ist alles zu.`

Kendi sözlerimle: Pazar günleri dükkânlar, her yer kapalı oluyor.

Neden geri: İki ayrı takılma var.
- h5'te "Bugün her yer kapalı." cümlesi "kapalı" için başka bir Almanca kelime istiyor. Kartı olan kelime o. Buradaki kelimenin kartı yok. Aynı Türkçe, iki ayrı cevap.
- h1'de aynı Almanca kelimeyi "her şey" diye gördüm. Burada "her yer" olmuş. Çevirirken "yer" için başka kelime ararım.

### h3/g5 — "Bugün cuma, hafta sonu geldi!"
Almancası: `Heute ist Freitag – Wochenende!`

Kendi sözlerimle: Bugün cuma, artık hafta sonu başlıyor, seviniyorum.

Neden geri: Türkçede "geldi" var. Almancada ona karşılık gelen bir kelime yok. Çevirirken "geldi" için bir kelime arar, bulamaz, yanlış yaptığımı sanarım.

## Kesişen notlar (karar değil, baş geliştiriciye)

**N1 — "Brandl Hanım" mı, "Frau Brandl" mı.** Çeviri satırlarında "Brandl Hanım" bana daha açık. Türkçe gibi okunuyor ve bana hangi Almanca kelimeyi yazacağımı söylüyor. "Frau Brandl" yazılsaydı Türkçenin içinde çevrilecek bir şey kalmazdı. Tek pürüz: iki soruda (h1, h2) "Frau Stadler", "Frau Huber" yazıyor, sahnenin Türkçesinde ise "Stadler Hanım". Aynı ekranda iki yazım var. Anlaşılıyor ama tutarsız.

**N2 — "olur / olmuyor" iki biçimde.** "Çarşamba olmuyor ama perşembe olur." kısa Almancaya gidiyor. "Yarın olmuyor ama öbür gün olur." bir kelime fazla olan Almancaya gidiyor. Türkçe bu farkı gösteremez. Görev tek cevap bekliyorsa doğru yazdığım hâlde yanlış sayılırım. İki biçimin de kabul edilmesi gerekir. Sahnelerde de aynı Türkçe ("Pazartesi olur mu?") h2'de uzun, h5'te kısa Almancaya karşılık geliyor.

**N3 — aynı kelime, iki Türkçe.** h1'de aynı Almanca kelime bir satırda "Teşekkürler", bir satırda "sağ ol". Sahnelerde "evet" olan kelime iki yerde "tamam" olmuş (h2/s4, h4/s4). Okurken sorun değil. İlk gün "bunlar ayrı kelimeler mi" diye düşündüm.

**N4 — kartı olmayan kelimeler.** Benim alanım değil, ama ilk gün öğrencisi olarak takıldım. h1 dersten önce geliyor ve "her şey için", "şunu", "evet", "Doktor" kelimelerini Almanca yazmam bekleniyor. Bunların kartı bu halkada yok. h2 ve h3'te "bugün" ve "yarın" kullanılıyor, kartları h4'te. "değil", "ama", "görüşürüz", "burada", "bu", "hangi" kelimelerinin kartı beş halkanın hiçbirinde yok.

**N5 — h1 sorusunda tırnak içinde Almanca.** Soru bir Almanca sözün ne demek olduğunu soruyor, o yüzden sözü yazmak zorunda. Bana açık geldi, geçirdim. OD-9.2 harfiyen uygulanırsa bu satır takılır. Karar baş geliştiricinin.

**N6 — h4 sorusu.** Tek doğru cevap var ve bulunabiliyor. Ama iki kez okudum. Sahnede "bugün" hiç geçmiyor. "Öbür gün cuma" sözünden iki gün geri saymam gerekti. h3'teki soru birebir aynı ("Bugün hangi gün?") ve orada cevap sahnede açıkça yazıyordu. Burada da öyle sandım, aradım, bulamadım. Sonra hesapladım. En çekici yanlış şık Perşembe. İlk gün için sınırda ama haksız değil: tam da "öbür gün" sözünü anlayıp anlamadığımı ölçüyor. Sorunun hesap istediğini belli eden bir söz olsaydı ilk okumada bulurdum.

## 2. tur

Kapsam: yalnızca 1. turdan sonra değişen satırlar. Ölçüt aynı (tek okumada anladım mı, Almancayla aynı şeyi mi söylüyor, Türkçeden tek bir Almanca cümleye gidiyor muyum). 1. turun tablosu olduğu gibi duruyor, kayıt olarak kalır.

| Satır | Almanca | Türkçe (yeni) | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| h1/g9 | Danke, Herr Wimmer! | Teşekkürler Wimmer Bey! | Wimmer adında bir adama teşekkür ediyorum. | geçer | Soyadı artık Türkçede de var. g10 ile aynı kalıp. |
| h1/soru | (soru) | Stadler Hanım ‘Ja, bitte?’ diyor. Ne demek istiyor? | Tezgâhtaki kadın bana bir şey söylüyor, ne dediğini soruyorlar. | geçer | Sahnedeki yazımla aynı oldu, N1 kapandı. Tek doğru cevap yine ilk şık. N5 (tırnak içinde Almanca) aynen duruyor. |
| h2/g1 | Am Montag geht es nicht. | Pazartesi günü olmuyor. | Pazartesi bana uymuyor. | geçer | "günü" sözü günün önündeki küçük kelimeyi hatırlatıyor. g6'daki yalın "Çarşamba olmuyor" ile artık karışmıyor. |
| h2/g3 | Am Dienstag? Ja, bitte. | Salı günü mü? Evet, lütfen. | Salıyı teklif ettiler, kabul ediyorum. | geçer | g2'deki "Pazartesi mi?" ile artık ayrı görünüyor. |
| h2/g7 | Am Donnerstag? Ja, das geht. | Perşembe günü mü? Evet, olur. | Perşembeyi teklif ettiler, uyar diyorum. | geçer | h3/g1'deki "Cumartesi mi?" ile artık ayrı görünüyor. |
| h2/soru | (soru) | Huber Hanım ile hangi günde anlaşıyorsun? | Telefonda hangi günü kararlaştırdığımı soruyorlar. | geçer | Yazım sahneyle aynı oldu. Cevap tek: Perşembe. |
| h3/g3 | Am Sonntag ist Tobi nicht hier. | Tobi pazar günü burada değil. | Tobi pazar günü yok, gelmeyecek. | geçer | Yeni cümle. "kapalı" ve "her yer" takılmaları tümüyle gitti. Kalıp g8 ile aynı (Ioana bu hafta burada değil). Bkz. N8. |
| h3/g5 | Heute ist Freitag – Wochenende! | Bugün cuma, hafta sonu! | Bugün cuma, hafta sonu başlıyor diye seviniyorum. | geçer | "geldi" gitti, Türkçede fazla kelime kalmadı. Bkz. N9. |
| h3/s3 | Sonntag? Ach ja! Sonntag ist Wochenende. | Pazar mı? Ah evet! Pazar hafta sonu. | Kadın günü hatırlıyor, pazarın hafta sonu olduğunu söylüyor. | geçer | Kısa ve açık. Halkanın kartındaki kelime artık sahnede de geçiyor. |
| h3/soru | (soru) | Bugün hangi gün? | Sahnedeki günün hangisi olduğunu soruyorlar. | geçer | Hâlâ tek cevaplı: Pazar. İkinci satırda açıkça yazıyor, son satır (yarın pazartesi) bunu doğruluyor. Yeni üçüncü satır da pazar diyor, başka gün göstermiyor. |
| h5/g8 | Ich gehe am Montag in die Praxis. | Pazartesi günü muayenehaneye gidiyorum. | Pazartesi doktorun yerine gideceğim. | geçer | "günü" ipucu veriyor. Bkz. N8. |
| h5/g10 | Heute ist alles geschlossen. | Bugün her şey kapalı. | Bugün hiçbir yer açık değil. | geçer | h1/g4'teki "her şey" ile aynı kelime, aynı Türkçe. h3/g3 ile çakışma kalmadı. |

### 2. tur sonucu

| | |
|---|---|
| Okunan satır | 12 |
| Geçer | 12 |
| Geri döner | 0 |

1. turdaki 7 geri dönüşün yedisi de kapandı: `h1/g9`, `h2/g1`, `h2/g3`, `h2/g7`, `h3/g3`, `h3/g5`, `h5/g8`.
Okur açısından dosyada geri dönen satır kalmadı (OD-9.4).

Yalnızca bana bildirilen değişiklikleri okudum. Dosyanın geri kalanını 1. tur tablosuyla karşılaştırdım, başka değişmiş Türkçe görmedim.

### 2. tur notları (karar değil, baş geliştiriciye)

**N1 kapandı.** İki soruda da "Hanım" yazıyor.

**N2, N4, N5, N6 aynen açık.** Bu turda dokunulmadı. N2 şimdi h2/g1 için de geçerli: "Pazartesi günü olmuyor" cümlesinde Almancanın uzun biçimi bekleniyor, kısa biçimini yazarsam yanlış sayılmamalıyım.

**N7 — h2 sahnesi görev cümlesinden ayrıldı.** Düzeltme görev cümlelerine yapıldı, sahneye yapılmadı. Aynı halkada şimdi şu ikilik var:
- g1 "Pazartesi günü olmuyor." ve s3 "Pazartesi olmuyor." aynı Almanca cümle (`Am Montag geht es nicht.`).
- g9 "Cuma günü olur mu?" ve s2 "Pazartesi olur mu?" aynı Almanca kalıp (`Geht es am …?`).

Sahnede yalnızca okuyorum, o yüzden 1. turda geçirmiştim, bu turda da geri çevirmiyorum. Ama sahne satırları bir gün Türkçeden Almancaya görevine girerse K1 aynen geri gelir.

**N8 — kelime sırası.** h3/g3 Türkçede "Tobi" ile, Almancada günle başlıyor. h5/g8'de ben "Pazartesi günü" ile başlayan bir Almanca cümle de kurabilirim. Aynı durum 1. turda geçen h3/g8 ve h4/g5 satırlarında da vardı. Türkçe bana hangi kelimeyle başlayacağımı söyleyemiyor. Görev tek sıra bekliyorsa doğru yazdığım hâlde yanlış sayılırım.

**N9 — h3/g5 küçük duraksama.** "Bugün cuma, hafta sonu!" cümlesini anladım ve Almancasıyla birebir aynı. Yalnız bir an "cuma hafta sonu mu sayılıyor" diye düşündüm, çünkü aynı halkanın sahnesinde "Pazar hafta sonu" yazıyor. Sevinç cümlesi olduğunu ünlemden çıkardım. Geçirdim.
