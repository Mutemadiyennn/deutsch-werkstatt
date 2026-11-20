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

## İnceleme #163 sonrası

Kapsam: yazarın ve dilbilimcinin "İnceleme #163 sonrası" bölümlerindeki satırlar (15 görev cümlesi, 3 taşınan cümle, 2 sahne satırı), daha önce okumadığım iki sahne satırı (h2/s2, h2/s3) ve h1 sorusunun yeniden kontrolü. Metinleri dosyadaki son hâlinden okudum. Ölçüt aynı: tek okumada anladım mı, Almancayla aynı şeyi mi söylüyor, Türkçeden tek bir Almanca cümleye gidiyor muyum. Önceki turların tabloları kayıt olarak duruyor.

Satır numaraları dosyadaki bugünkü sıraya göredir (kartlar yer değiştirdiği için eski numaralarla aynı değil).

| Satır | Almanca | Türkçe | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| h1/g5 | Ja, bitte, Frau Stadler. | Evet, lütfen Stadler Hanım. | Bana bir şey teklif edildi, kibarca kabul ediyorum. | geçer | Açık. Sahnedeki soru işaretli söz ayrı bir satır, Türkçesi de ayrı; karıştırmadım. |
| h1/g6 | Bitte, Tobi. | Rica ederim Tobi. | Tobi bana teşekkür etmiş, karşılık veriyorum. | geçer | Tek okumada anladım. Bkz. N10. |
| h1/g9 (taşındı) | Ja, danke, Frau Huber. | Evet, teşekkürler Huber Hanım. | Evet diyorum ve teşekkür ediyorum. | geçer | Metin aynı, yalnızca yeri değişti. |
| h1/g10 | Ja, für Ioana. | Evet, Ioana için. | Bir şeyin Ioana'ya olduğunu onaylıyorum. | geçer | Kısa cevap olduğu belli. Kelime kelime Almancaya gidiyor. Bkz. N4 (bu kelimenin kartı yok). |
| h1/s2 | Hallo, Frau Stadler! Für Frau Brandl, bitte. | Merhaba Stadler Hanım! Brandl Hanım için, lütfen. | Stadler Hanım'a selam veriyorum. Sonra Brandl Hanım ile ilgili bir şey istiyorum, ama ne istediğim yazmıyor. | **geri döner** | İki ayrı şey anladım, hangisi olduğunu seçemedim. Aşağıda. |
| h1/soru | (soru) | Stadler Hanım ‘Ja, bitte?’ diyor. Ne demek istiyor? | Kadının bana ilk söylediği sözün ne demek olduğunu soruyorlar. | geçer | Hâlâ tek cevaplı: ilk şık. Aşağıda. |
| h2/g7 | Am Donnerstag geht es, Frau Huber. | Perşembe günü olur Huber Hanım. | Perşembe bana uyar diyorum. | geçer | "günü" sözü günün önündeki küçük kelimeyi hatırlatıyor. Bkz. N2. |
| h2/g10 | Gestern war Freitag. | Dün cumaydı. | Dünkü gün cumaydı. | geçer | Açık, Almancayla birebir. Bkz. N4 ("dün" kartı h4'te). |
| h2/s2 | Guten Tag! Geht es am Montag? | İyi günler! Pazartesi günü olur mu? | Kadın bana pazartesiyi teklif ediyor. | geçer | g9 "Cuma günü olur mu?" ile aynı kalıp, aynı Türkçe. N7'nin bu yarısı kapandı. |
| h2/s3 | Am Montag geht es nicht. Geht Donnerstag? | Pazartesi günü olmuyor. Perşembe olur mu? | Pazartesi bana uymuyor, perşembeyi soruyorum. | geçer | İlk cümle g1 ile aynı Almanca, aynı Türkçe. İkinci cümlede "günü" yok, Almancada da küçük kelime yok. N7 tümüyle kapandı. |
| h3/g3 | Gestern war Sonntag, nicht Samstag. | Dün pazardı, cumartesi değil. | Birini düzeltiyorum: dün cumartesi değil pazardı. | geçer | Sıra Almancayla aynı. "Cumartesi değil" sahnedeki kalıpla aynı kelimeye gidiyor. |
| h3/g4 | Und am Sonntag? Geht es? | Peki pazar günü? Olur mu? | Pazar günü uyar mı diye soruyorum. | geçer | Türkçe değişmedi. Almancası artık bildiğim kalıp. |
| h3/g8 | Nicht diese Woche, Frau Huber. | Bu hafta değil Huber Hanım. | Bu hafta olmaz diyorum. | geçer | Açık. Almancada "değil" başta, Türkçede sonda; g3 ve sahnedeki "Cumartesi değil" ile aynı düzen, şaşırmadım. |
| h4/g2 | Heute ist Wochenende, Tobi! | Bugün hafta sonu Tobi! | Tobi'ye bugünün hafta sonu olduğunu söylüyorum. | geçer | Açık, birebir. |
| h4/g5 | War gestern Dienstag? | Dün salı mıydı? | Dünün salı olup olmadığını soruyorum. | geçer | Açık. h2/g5 "Bugün çarşamba mı?" ile aynı soru düzeni. |
| h4/g9 | Vorgestern war Donnerstag. | Evvelsi gün perşembeydi. | İki gün önce perşembeydi. | geçer | Yalnızca gün değişti. |
| h4/g10 | Heute ist Montag, vorgestern war Samstag. | Bugün pazartesi, evvelsi gün cumartesiydi. | Bugün pazartesi; iki gün önce cumartesiydi. | geçer | İki kısa parça, ikisi de tanıdık. Günleri saydım, tutuyor. |
| h4/s3 | Übermorgen ist Freitag. Ja, Freitag geht! | Öbür gün cuma. Evet, cuma olur! | Ioana öbür günün cuma olduğunu söylüyor ve kabul ediyor. | geçer | Eskisinden daha açık: neyin "olur" olduğu yazıyor. Soru hâlâ tek cevaplı (Çarşamba); N6 aynen duruyor. |
| h5/g1 | Montag geht nicht, Herr Wimmer. | Pazartesi olmuyor Wimmer Bey. | Wimmer Bey'e pazartesinin bana uymadığını söylüyorum. | geçer | "günü" yok, Almancada da küçük kelime yok. h2/g1 "Pazartesi günü olmuyor" ile ayrımı tutarlı. |
| h5/g5 | Hallo? Praxis Dr. Weber? | Alo? Dr. Weber muayenehanesi mi? | Telefondayım, doğru yeri mi aradım diye soruyorum. | geçer | Tek okumada anladım. Bkz. N11. |
| h5/g6 | Ist die Praxis am Samstag geschlossen? | Muayenehane cumartesi günü kapalı mı? | Doktorun yeri cumartesi açık mı diye soruyorum. | geçer | "günü" ipucu veriyor. Halkanın sahnesiyle aynı konu. Bkz. N4 (baştaki küçük kelimenin kartı yok). |
| h5/g9 (taşındı) | Danke, Herr Wimmer! | Teşekkürler Wimmer Bey! | Wimmer Bey'e teşekkür ediyorum. | geçer | Metin aynı. Kelimenin kartı artık bu halkada, daha iyi. |
| h5/g10 (taşındı) | Hallo, Herr Pichler! | Merhaba Pichler Bey! | Pichler Bey'e selam veriyorum. | geçer | Metin aynı. |

### Geri dönen — kendi sözlerimle

**h1/s2 — "Merhaba Stadler Hanım! Brandl Hanım için, lütfen."**
Almancası: `Hallo, Frau Stadler! Für Frau Brandl, bitte.`

Türkçe Almancayla birebir aynı, çeviri hatası yok. Takıldığım yer başka: bu, uygulamada okuduğum ilk sahnenin benim söylediğim ilk satırı ve ne yaptığımı anlamadım.

- Birinci okuyuşum: Brandl Hanım'ı görmeye gelmişim, onu soruyorum. Stadler Hanım "Buyurun" deyip beni içeri alıyor.
- İkinci okuyuşum: Brandl Hanım'a götüreceğim bir şeyi alıyorum. Stadler Hanım "Buyurun" deyip onu uzatıyor.

İkisi de sahnenin dört satırına uyuyor. Sahnede nerede olduğumu (fırın, dükkân, kapı) söyleyen bir söz yok. Stadler Hanım'ın kim olduğunu da ilk gün bilmiyorum. Aynı satırda art arda iki "Hanım" olması da bir an kimin kim olduğunu karıştırttı, iki kez okudum.

Eski satırda ("Şunu lütfen.") bir şey gösterip istediğim belliydi, alışverişte olduğumu oradan anlıyordum. Yeni satırda o ipucu gitti.

Not: sorun satırın Türkçesinde değil, sahnenin bağlamsız kalmasında. Türkçe ne kadar düzgün olursa olsun ben ne yaptığımı bu dört satırdan çıkaramıyorum.

### h1 sorusu hâlâ tek cevaplı mı

Evet. Stadler Hanım'ın sözünün Türkçesi sahnede "Buyurun?" diye yazıyor, şıklarda buna uyan tek cevap ilk şık ("Buyurun, ne istersiniz?"). Öbür üç şık (teşekkür, hayır, görüşürüz) hiç uymuyor.

Baktığım tuzak: aynı halkada "Ja, bitte, Frau Stadler." cümlesini "Evet, lütfen" diye öğreniyorum. Şıklarda "Evet, lütfen" olsaydı ona giderdim. Yok, o yüzden şaşırmadım.

Küçük pürüz: h1/s2 yüzünden nerede olduğumu bilmiyorum. "Ne istersiniz?" şıkkı bir dükkânda olduğumu varsayıyor. Yine de doğru şıkkı buldum, çünkü öbürleri açıkça yanlış. Soruyu geçirdim; pürüz h1/s2'nin geri dönüşüne bağlı.

N5 (soruda tırnak içinde Almanca) aynen duruyor.

### Sonuç

| | |
|---|---|
| Okunan satır | 23 |
| Geçer | 22 |
| Geri döner | 1 |

Geri dönen: `h1/s2`.

Dosyada geri dönen satır olduğu için bu hâliyle "reviewed" sayılamaz (OD-9.4).

Bana bildirilen satırların dışında, dosyanın kalanını önceki turların tablolarıyla karşılaştırdım; bildirilmemiş değişmiş Türkçe görmedim.

### Notlar (karar değil, baş geliştiriciye)

**N7 kapandı.** h2 sahnesinin iki satırı artık görev cümleleriyle aynı Türkçeyi kullanıyor. "günü" olan yerde Almancada küçük kelime var, olmayan yerde yok. Bu kural şimdi beş halkanın hepsinde tutuyor (baktıklarım: h2/g1, g3, g6, g7, g9, s2, s3; h3/g4; h5/g1, g6, s1, s3).

**N2 aynen açık, bir satır eklendi.** "Perşembe günü olur" uzun biçime (h2/g7), "perşembe olur" kısa biçime (h2/g6) gidiyor. "günü" sözü günün önündeki kelimeyi gösteriyor ama sondaki kısa kelimeyi göstermiyor. Türkçeden çevirirken ikisini de yazabilirim; ikisi de kabul edilmeli.

**N4 aynen açık.** Yeni cümlelerle üç kelime daha eklendi: h1'de "için" (üç satırda geçiyor, kartı yok), h2/g10'da "dün" (kartı h4'te) ve "-ydı" anlamındaki kelime (kartı hiçbir halkada yok), h5/g6'da muayenehanenin önündeki küçük kelime.

**N8 aynen açık.** h4/g5 "Dün salı mıydı?" için soruyu düz sırayla, sesimi yükselterek de kurabilirim. Görev tek sıra bekliyorsa yanlış sayılırım.

**N10 — h1'de aynı kelime üç Türkçe.** Aynı Almanca kelime bu halkada "lütfen" (g5, s2), "rica ederim" (g6) ve "buyurun" (s1, s3) oluyor. Kartın amacı bu olabilir, o yüzden geçirdim. Ama g6'yı Türkçeden çevirirken "rica ederim" için ayrı bir kelime aradım, sonra kartı hatırladım. Kart bu üç anlamı açıkça söylemiyorsa ilk gün burada takılırım.

**N11 — h5/g5 kelime sırası.** Türkçede "Dr. Weber muayenehanesi", Almancada muayenehane önce geliyor. Ayrıca Türkçedeki "mi" bana bir soru kelimesi aratıyor, Almancada yok. Anlamada sorun değil. Türkçeden çevirirken sırayı ters yazabilirim.

## h1 yeni sahne

Eski fırın sahnesi kalktı, yerine üç satırlık yeni sahne geldi. Bu turda yalnızca h1 sahnesini ve sorusunu okudum; dosyanın kalanına bu turda yeniden bakmadım.

| Öğe | Alan | Almanca | Türkçe | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|
| h1/s1 | sahne, Brandl | Hallo! Bitte, für Sie. | Merhaba! Buyurun, sizin için. | Brandl Hanım selam veriyor ve bana bir şey uzatıyor, "bu sizin" diyor. | GEÇTİ | Tek okumada anladım. Almancayla aynı şeyi söylüyor. |
| h1/s2 | sahne, ben | Für mich? Danke, Frau Brandl! | Benim için mi? Teşekkürler Brandl Hanım! | Şaşırıyorum, "bana mı?" diye soruyorum, sonra teşekkür ediyorum. | GEÇTİ | Tek okumada anladım. Ne yaptığım artık belli: bir şey alıyorum ve teşekkür ediyorum. Eski geri dönüş kapandı. |
| h1/s3 | sahne, Brandl | Bitte! | Rica ederim! | Teşekkürüme karşılık veriyor. | GEÇTİ | Tek okumada anladım. h1/g6 ile aynı Türkçe. |
| h1/soru | soru ve dört şık | | Brandl Hanım ne yapıyor? | Brandl Hanım bana bir şey veriyor. İlk şık. | GEÇTİ | Tek okumada cevapladım. Tek doğru şık var. Soruda tırnak içinde Almanca yok. |

### Soru tek cevaplı mı

Evet. Baktığım tuzaklar:

- "Senden bir şey istiyor": Almancadaki ilk kısa kelimeyi aynı halkada "lütfen" diye de öğreniyorum (g5). Yalnızca Almancaya baksam bir an "benden bir şey mi rica ediyor" diye düşünebilirdim. Ama hemen ardından "sizin için" geliyor ve ben "benim için mi" diye soruyorum. Türkçesi de "Buyurun" diyor. Bu şıkka gitmedim.
- "Seni telefonla arıyor": aynı halkada selam kelimesini "Alo?" diye de görüyorum (g2). Burada soru işareti yok, Türkçesi "Merhaba", arkasından bir şey veriliyor. Bu şıkka gitmedim.
- "Sana hoşça kal diyor": sahnede vedalaşma yok. Açıkça yanlış.

### Sonuç (yalnızca h1 yeni sahne)

| | |
|---|---|
| Okunan | 4 (3 satır, 1 soru) |
| Geçer | 4 |
| Geri döner | 0 |

Önceki turda geri dönen tek satır eski `h1/s2` idi; o satır artık yok, yerine gelen geçti. Benim açımdan bu dosyada açık geri dönüş kalmadı.

### Notlar (karar değil, baş geliştiriciye)

**N5 h1 için kapandı.** Soruda artık tırnak içinde Almanca yok.

**N10 aynen açık.** Aynı kısa kelime bu halkada hâlâ üç Türkçe taşıyor: "lütfen" (g5), "rica ederim" (g6, s3), "buyurun" (s1). Yeni sahnede ikisi art arda geliyor, bu yüzden aslında iyi bir örnek oldu. Kart üç anlamı söylemiyorsa s1'de takılırım.

**N4 aynen açık, iki kelime eklendi.** "için" anlamındaki kelimenin kartı yok. Yeni sahnede "siz" ve "ben/bana" anlamındaki iki kelime de ilk kez geçiyor, kartları bu halkada yok. Okurken Türkçesinden anladım. Bunları benim yazmam ya da söylemem istenirse ilk gün yapamam.

**N12 — ne verildiği belli değil.** Brandl Hanım'ın bana ne verdiğini ve nerede olduğumuzu sahne söylemiyor. Anlamamı ve soruyu cevaplamamı engellemedi, o yüzden geçirdim.
