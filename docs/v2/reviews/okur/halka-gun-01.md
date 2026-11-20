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

## 2. sürüm son metin

Kapsam: dosyanın tamamı, baştan (gruplar ve sahneler değişti; önceki turların numaraları artık geçerli değil). Okunan: beş halkanın başlığı, kalıp çevirileri, görev cümleleri, sahne ortamı, sahne satırları, soru ve şıkları; ayrıca `lx:Frau` ve `lx:Herr` kartlarının `ne_zaman_tr` alanı. Dosyada `tr_adsiz` alanı yok. h3 ve h5 sahnelerini en son, yazmadan hemen önce yeniden okudum (h5/s2'de bir virgül eklenmişti; tablodaki metin son hâlidir).

Ölçüt: tek okumada anladım mı, Almancayla aynı şeyi mi söylüyor, Türkçeden tek bir Almanca cümleye gidiyor muyum; soruda tek cevap var mı.

### h1 — Selam ve teşekkür

| Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|
| h1 | başlık | Selam ve teşekkür | geçer | |
| h1 | g1 | Merhaba Tobi! | geçer | |
| h1 | g2 | Alo? Huber Hanım? | geçer | Telefonda olduğum belli. |
| h1 | g3 | Teşekkürler Stadler Hanım! | geçer | |
| h1 | g4 | Her şey için sağ ol Ioana! | geçer | Türkçe açık. "her şey" ve "için" kelimelerinin kartı yok (N4). |
| h1 | g5 | Evet, lütfen Stadler Hanım. | geçer | |
| h1 | g6 | Rica ederim Tobi. | geçer | N10 aynen. |
| h1 | g7 | Evet, teşekkürler Huber Hanım. | geçer | |
| h1 | g8 | Evet, Ioana için. | geçer | |
| h1 | g9 | Merhaba Brandl Hanım! | geçer | |
| h1 | g10 | Evet Huber Hanım. | geçer | |
| h1 | ortam | Bäckerei Stadler, tezgâhın önü; Tobi'nin siparişini almaya geldin | geçer | Ne yaptığım artık belli: dükkândayım, Tobi'nin siparişini alıyorum. İlk kelime Almanca ve kartı yok; "tezgâh" ve "sipariş" sözlerinden anladım. Bkz. N13. |
| h1 | s1 | Merhaba! Buyurun? | geçer | |
| h1 | s2 | Merhaba Stadler Hanım! Tobi için, lütfen. | geçer | Ortam sayesinde tek anlam çıkıyor: Tobi'nin siparişini istiyorum. Eski "iki okuma" sorunu yok. |
| h1 | s3 | Evet, Tobi için. Buyurun! | geçer | Siparişi uzatıyor. |
| h1 | soru | Stadler Hanım'ın ilk sözündeki „Ja, bitte?“ burada ne demek? (Buyurun, ne istersiniz? / Evet, lütfen. / Rica ederim. / Teşekkür ederim.) | geçer | Tek cevap: ilk şık. "Evet, lütfen." artık şıklarda ve beni çekti, çünkü g5'te bu sözü öyle öğreniyorum. "burada" sözü ve tezgâhtaki kadının ilk sözü olması beni doğru şıkka götürdü. Haksız değil, ama ilk günün ilk sorusu için sıkı. Tırnak içinde Almanca geri geldi (N5 yeniden açık). |

### h2 — Bugün hangi gün?

| Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|
| h2 | başlık | Bugün hangi gün? | geçer | |
| h2 | kalıp | Bugün … | geçer | Bana söylediği: "bugün" deyip arkasına günü koyuyorum. Almancadaki ortadaki kısa kelimenin Türkçede karşılığı yok; ne olduğunu kalıp söylemiyor. Bkz. N14. |
| h2 | g1 | Bugün mü? Evet, lütfen! | geçer | |
| h2 | g2 | Sağ olun, bugün değil. | geçer | "değil" kelimesinin kartı yok (N4). |
| h2 | g3 | Pazartesi mi? Salı değil mi? | geçer | "günü" yok, Almancada da küçük kelime yok. |
| h2 | g4 | Evet, pazartesi günü Huber Hanım. | geçer | "günü" küçük kelimeyi gösteriyor. |
| h2 | g5 | Salı günü mü? Evet, lütfen. | geçer | |
| h2 | g6 | Bugün salı, değil mi? | geçer | "değil mi" g3'te başka, burada başka Almancaya gidiyor. Cümle açık; eski notum aynen. |
| h2 | g7 | Bugün çarşamba mı? | geçer | |
| h2 | g8 | Hayır, bugün çarşamba. | geçer | |
| h2 | g9 | Hayır, sağ ol Tobi. | geçer | |
| h2 | g10 | Hayır, pazartesi değil, salı. | geçer | |
| h2 | ortam | Apartman merdiveni, sabah; alt kattaki komşun Brandl Hanım'la karşılaşıyorsun | geçer | Nerede olduğum ve kiminle konuştuğum belli. |
| h2 | s1 | Merhaba! Bugün pazartesi, değil mi? | geçer | |
| h2 | s2 | Hayır Brandl Hanım. Bugün salı. | geçer | |
| h2 | s3 | Salı mı? Ah, evet! Sağ olun! | geçer | |
| h2 | soru | Brandl Hanım bugünü hangi gün sanıyor? (Pazartesi / Salı / Çarşamba / Pazar) | geçer | Tek cevap: Pazartesi. "sanıyor" sözü yanlış bildiği günü sorduğunu açıkça gösteriyor; Salı şıkkına gitmedim. |

### h4 — Hafta sonu ve hafta

| Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|
| h4 | başlık | Hafta sonu ve hafta | geçer | |
| h4 | kalıp | İyi günler | geçer | Açık. Türkçede bunu ayrılırken de söylerim; Almancası yalnızca karşılaşınca söyleniyorsa kalıp bunu göstermiyor. Bkz. N16. |
| h4 | g1 | Cumartesi mi? Evet, cumartesi olur! | geçer | |
| h4 | g2 | Yarın cumartesi mi? | geçer | |
| h4 | g3 | Yarın pazar! | geçer | |
| h4 | g4 | Peki pazar günü? Olur mu? | geçer | "Peki" için kullanılan kelimenin kartı yok (N4). |
| h4 | g5 | Bugün cuma, hafta sonu! | geçer | N9 aynen. |
| h4 | g6 | Peki hafta sonu, Tobi? | **geri döner** | Aynı "hafta sonu" sözü g5'te tek kelimeye, burada önünde küçük kelime olan Almancaya gidiyor. Türkçede bunu gösteren bir işaret yok. Aşağıda. |
| h4 | g7 | Bu hafta olmuyor. | geçer | |
| h4 | g8 | Bu hafta değil Huber Hanım. | geçer | |
| h4 | g9 | İyi günler Brandl Hanım! | geçer | |
| h4 | g10 | Hangi gün olur? | geçer | |
| h4 | ortam | İş yerinde, şefin Wimmer Bey'in kapısı; hafta sonu mesaisi konuşuluyor | geçer | Neyin "olur mu" diye sorulduğu buradan anlaşılıyor. |
| h4 | s1 | İyi günler! Hafta sonu … cumartesi olur mu? | geçer | Okurken açık. |
| h4 | s2 | Cumartesi mi? Hayır, cumartesi olmuyor Wimmer Bey. | geçer | |
| h4 | s3 | Peki pazar? | geçer | "günü" yok, Almancada da küçük kelime yok. Tutarlı. |
| h4 | s4 | Evet, pazar günü olur. | geçer | |
| h4 | soru | Bu hafta sonu hangi gün sana uyuyor? (Cumartesi / Pazar / İkisi de / Hiçbiri) | geçer | Tek cevap: Pazar. Cumartesiye açıkça hayır, pazara evet diyorum. |

### h5 — Dün, öbür gün, muayenehane (sahne en son okundu)

| Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|
| h5 | başlık | Dün, öbür gün, muayenehane | geçer | |
| h5 | kalıp | Dün … idi | geçer | Bana söylediği: dün bir şeydi, geçmişte kaldı. "idi" kitap gibi duruyor, kimse böyle konuşmaz; ama Almancadaki ikinci kelimenin "-di" işi gördüğünü tam da bu sayede anladım. Bkz. N14. |
| h5 | g1 | Dün salı mıydı? | geçer | |
| h5 | g2 | Dün mü? Bugün değil mi? | geçer | |
| h5 | g3 | Yarın olmuyor ama öbür gün olur. | geçer | N2 aynen; iki biçim de kabul listesinde. |
| h5 | g4 | Öbür gün cuma mı? | geçer | |
| h5 | g5 | Evvelsi gün perşembeydi. | geçer | |
| h5 | g6 | Bugün pazartesi, evvelsi gün cumartesiydi. | geçer | Saydım, tutuyor. |
| h5 | g7 | Bugün muayenehaneye gidiyoruz. | geçer | "biz" ve "-e" için gereken küçük kelimelerin kartı yok (N4). |
| h5 | g8 | Yarın muayenehaneye gidiyor musunuz Wimmer Bey? | geçer | Açık. "siz" diye sorduğum Türkçeden belli. |
| h5 | g9 | Alo? Dr. Weber muayenehanesi mi? | geçer | N11 aynen. |
| h5 | g10 | Muayenehane cumartesi günü kapalı mı? | geçer | |
| h5 | g11 | Kapalı mı? Bugün mü? | geçer | |
| h5 | g12 | Bugün her şey kapalı. | geçer | |
| h5 | ortam | Telefon; Dr. Weber'in muayenehanesini arıyorsun, Huber Hanım açıyor | geçer | Kim arıyor, kim açıyor belli. |
| h5 | s1 | İyi günler! Muayenehane yarın kapalı mı? | geçer | |
| h5 | s2 | Hayır, yarın değil. Ama öbür gün, cuma günü, muayenehane kapalı. | geçer | İki kısa cümle. Öbür günün cuma olduğu açıkça yazıyor. |
| h5 | s3 | Öbür gün mü? Teşekkürler Huber Hanım! | geçer | |
| h5 | soru | Huber Hanım'ın sözlerine göre bugün haftanın hangi günü? (Salı / Çarşamba / Perşembe / Cuma) | geçer | Tek cevap: Çarşamba. "sözlerine göre" hesap yapmam gerektiğini baştan söylüyor; öbür gün cuma ise bugün çarşamba. Perşembe en çekici yanlış (yarın), ama saymakla eleniyor. N6 kapandı. |

### h3 — Olur mu? (sahne en son okundu)

| Halka | Satır | Türkçe | Karar | Gerekçe |
|---|---|---|---|---|
| h3 | başlık | Olur mu? | geçer | |
| h3 | kalıp 1 | … olur mu? | geçer | Bana söylediği: bir gün söyleyip "uyar mı" diye soruyorum. Açık. |
| h3 | kalıp 2 | … olur. | geçer | "Uyar" diyorum. |
| h3 | kalıp 3 | … olmuyor. | geçer | "Uymuyor" diyorum. Üç kalıp birlikte okununca çok açık. Not: kalıpta olmayan kısa bir kelime ilk görev cümlesinin Almancasında çıkıyor (N2). |
| h3 | g1 | Yarın olur mu? | geçer | |
| h3 | g2 | Yarın görüşürüz Ioana! | geçer | Türkçe açık. "görüşürüz" için kelimenin ne kartı ne kalıbı var. Bkz. N15. |
| h3 | g3 | Perşembe günü olur Huber Hanım. | geçer | |
| h3 | g4 | Perşembe görüşürüz Tobi! | geçer | N15. |
| h3 | g5 | Cuma günü olur mu? | geçer | |
| h3 | g6 | Cuma olmuyor Pichler Bey. | geçer | "günü" yok, Almancada da küçük kelime yok. |
| h3 | g7 | Teşekkürler Wimmer Bey! | geçer | |
| h3 | g8 | Merhaba Pichler Bey! | geçer | |
| h3 | ortam | Telefon; aile hekimin Dr. Weber'in muayenehanesinden sekreter Huber Hanım arıyor | geçer | Anladım: doktorun sekreteri beni arıyor. "aile hekimin Dr. Weber'in muayenehanesinden sekreter Huber Hanım" tek nefeste uzun bir ad zinciri; yavaşladım ama ikinci kez okumam gerekmedi. |
| h3 | s1 | Merhaba! Yarın, perşembe günü olur mu? | geçer | |
| h3 | s2 | Hayır, yarın olmuyor. Pazartesi olur mu? | geçer | |
| h3 | s3 | Pazartesi … evet, pazartesi olur. | geçer | Düşünüp kabul ettiği belli. |
| h3 | s4 | Teşekkürler Huber Hanım! Pazartesi görüşürüz! | geçer | |
| h3 | soru | Randevu hangi güne kalıyor? (Perşembe / Cuma / Cumartesi / Pazartesi) | geçer | Tek cevap: Pazartesi. Perşembe teklif edildi ama ben hayır dedim; karışmıyor. "Randevu" sözü sahnede geçmiyor, ortamdan anladım. |

### Kart açıklamaları

| Öğe | Alan | Açıklama | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| lx:Frau | ne_zaman_tr | Soyadıyla birlikte kibar hitap olarak da kullanılır. Türkçede Hanım addan sonra, Almancada Frau soyadından önce gelir: Huber Hanım, Frau Huber olur. | Bir kadına kibarca seslenirken soyadının önüne koyarım. Türkçenin tersine, kelime başa gelir. | geçer | Tek okumada anladım. Sıra cümlesi tam 14 kelime, sınırda. Örnek işi çözüyor. Alanda iki cümle var; ikincisi "ne zaman"ı değil "nereye konur"u anlatıyor. İkisi aynı işe (seslenmeye) baktığı için tek fikir gibi okudum. Bkz. N17. |
| lx:Herr | ne_zaman_tr | Resmî yerde, tanımadığın bir erkekle konuşurken. Türkçede Bey addan sonra, Almancada Herr soyadından önce gelir: Pichler Bey, Herr Pichler olur. | Resmî bir yerde, tanımadığım bir adamla konuşurken kullanırım. Türkçenin tersine, kelime soyadının önüne gelir. | **geri döner** | Sıra cümlesi açık, onda sorun yok. Takıldığım ilk cümle: aynı gün bu kelimeyi tanıdığım kişilere söylüyorum. Aşağıda. |

### Geri dönenler — kendi sözlerimle

**h4/g6 — "Peki hafta sonu, Tobi?"**
Almancası: `Und am Wochenende, Tobi?`

Kendi sözlerimle: Tobi'ye hafta sonunu soruyorum.

Neden geri: Bir üstündeki satırda (g5 "Bugün cuma, hafta sonu!") aynı "hafta sonu" sözü Almancada tek kelime. Burada önünde küçük bir kelime daha isteniyor. Günlerde bu farkı "günü" sözü gösteriyor ve artık ona güveniyorum: "günü" yoksa küçük kelimeyi yazmıyorum. Burada "günü" yok, o yüzden küçük kelimeyi yazmam. Kabul listesinde küçük kelimesiz biçim yok; yanlış sayılırım. Türkçeden hangisini yazacağımı çıkaramıyorum.

Bu satır 1. turda da aynıydı ve o zaman geçirmiştim; kaçırmışım. "günü" kuralı bütün dosyada oturunca bu satır tek istisna olarak göze çarptı.

**lx:Herr / ne_zaman_tr — "Resmî yerde, tanımadığın bir erkekle konuşurken."**

Kendi sözlerimle: Bu kelimeyi tanımadığım adamlara, resmî yerlerde söylerim.

Neden geri: Açıklama bana "tanımadığın" diyor. Ama aynı gün bu kelimeyi şefim Wimmer Bey'e (h3/g7, h4/s2, h5/g8) ve Pichler Bey'e (h3/g6, h3/g8) söylüyorum. İkisini de tanıyorum. Açıklamayı okuyunca "tanıdığım şefime bunu söylemem yanlış mı" diye durdum. Açıklama, kelimenin ekranda gördüğüm kullanımıyla örtüşmüyor. Kadın kartındaki açıklamada böyle bir sınır yok; orada takılmadım.

Not: bana sorulan sıra cümlesi ("Türkçede Bey addan sonra …") tek başına geçer. Geri dönüş alanın ilk cümlesi yüzünden.

### Sonuç

| | |
|---|---|
| Okunan satır | 90 (88 halka satırı, 2 kart açıklaması) |
| Geçer | 88 |
| Geri döner | 2 |

Halka başına: h1 16, h2 17, h3 18, h4 18, h5 19 satır (başlık, kalıp çevirileri, görev cümleleri, ortam, sahne satırları, soru ve şıkları tek satır).

Geri dönenler: `h4/g6`, `lx:Herr` (`ne_zaman_tr`).

Geri dönen satır olduğu için halka dosyası ve `lx:Herr` kartı bu hâliyle "reviewed" sayılamaz (OD-9.4).

Sahne soruları: beşi de tek okumada tek cevaplı. En sıkısı h1 (şıklarda "Evet, lütfen." var), hesap isteyen tek soru h5 ve bunu soru kendisi söylüyor.

### Notlar (karar değil, baş geliştiriciye)

**N5 yeniden açık.** h1 sorusunda yine tırnak içinde Almanca var. Soru o sözün anlamını sorduğu için bana açık geldi, geçirdim. OD-9.2 harfiyen uygulanırsa takılır.

**N6 kapandı.** h5 sorusu "sözlerine göre" diyerek hesap istediğini söylüyor.

**N2 aynen.** Kalıp `Geht …?` diyor, ilk görev cümlesinin Almancasında araya kısa bir kelime giriyor. Kabul listeleri iki biçimi de aldığı için yanlış sayılmıyorum, ama kalıpta görmediğim kelimenin nereden geldiğini sordum.

**N4 aynen, daha geniş.** Görev cümlelerinde Almancasını yazmam beklenen ama ne kartı ne kalıbı olan kelimeler: "için", "her şey", "değil", günün önündeki küçük kelime, "peki", "bu", "hangi", "ama", "biz", "siz", muayenehanenin önündeki küçük kelimeler. "günü" ipucuna güveniyorum ama o küçük kelimeyi bana öğreten bir kalıp yok.

**N10, N11, N8, N9 aynen.**

**N13 — sahne ortamları.** Beş ortam satırının beşinde de noktalı virgül var. OD-9.2 bunu açıklama alanlarında yasaklıyor; ortam satırı açıklama sayılıyorsa beşi de takılır. Okurken beni durdurmadı. h1 ortamı Almanca bir kelimeyle başlıyor ("Bäckerei"); öbür sahnelerde yer Türkçe yazılmış ("muayenehane", "iş yeri"). Tabela adı gibi okudum, anladım; ama Türkçe alanda öğretilmemiş Almanca kelime bu.

**N14 — iki kalıp çevirisi birbirini tutmuyor.** "Dün … idi" Almancadaki ikinci kelimeye bir karşılık veriyor. "Bugün …" vermiyor. İkisini art arda görünce "bugünlü kalıpta ortadaki kelime nereye gitti" diye sordum. Ayrıca "Bugün …" Türkçesi iki Almancaya gidebilir: ortadaki kelimeyle (bugün salı) ve onsuz (bugün değil, bugün mü). Kalıbı Türkçeden Almancaya soran bir görev olursa takılırım.

**N15 — "görüşürüz" öğretilmiyor.** h3'te üç yerde geçiyor (g2, g4, s4). Kartı yok, kalıplar arasında da yok. Halka kendi kalıplarını öğretiyorsa bu eksik; Türkçeden yazamam.

**N16 — "İyi günler".** Türkçede hem gelirken hem giderken söylenir. Kalıp çevirisi tek başına Almancasını vedalaşırken de kullanabileceğimi düşündürüyor.

**N17 — lx:Frau alanı.** `ne_zaman_tr` içinde iki cümle var. "Bir alan bir fikir" harfiyen uygulanırsa sıra cümlesi ayrı bir fikir sayılabilir. Ben tek fikir gibi okudum ve geçirdim. Aynı durum lx:Herr için de geçerli.

## 2. sürüm geri dönüşler

Yalnızca son turda geri dönen iki satır ve not ettiğim satırların düzeltmesi okundu. Öbür satırlar yeniden okunmadı.

| Öğe | Alan | Açıklama | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| h4/g6 | görev cümlesi (tr) | Peki hafta sonunda, Tobi? | Tobi'ye hafta sonunda ne olacağını soruyorum. | geçer | Geri dönüş kapandı. Üstündeki satırda (g5) "hafta sonu" yalın duruyor, burada "sonunda" diyor. Fark gözle görülüyor. "günü" sözünde olduğu gibi küçük kelimeyi yazmam gerektiğini anladım. Kabul listesindeki üç biçimin üçü de küçük kelimeli; tek cümleye gidiyorum. Bkz. N18. |
| lx:Herr | ne_zaman_tr | Bir erkeğe soyadıyla kibarca seslenirken: şefine, komşuna ya da tanımadığın birine. Türkçede Bey addan sonra, Almancada Herr soyadından önce gelir: Pichler Bey, Herr Pichler olur. | Bir adama soyadıyla kibarca seslenirken söylerim. Şefime de, komşuma da, tanımadığım birine de olur. Kelime soyadının önüne gelir. | geçer | Geri dönüş kapandı. Artık şefim Wimmer Bey ve Pichler Bey açıklamanın içinde; "tanıdığıma söylemem yanlış mı" diye durmadım. İlk cümle 11, ikinci cümle 14 kelime. Alanda yine iki cümle var (N17 aynen); kadın kartında geçirdiğim gibi burada da tek fikir olarak okudum. |
| h3 | kalıp | Bis …! / … görüşürüz! | Boşluğa günü ya da zamanı koyup vedalaşırım. | geçer | N15 kapandı. Üç yerde de tek cümleye gidiyorum: "Yarın görüşürüz", "Perşembe görüşürüz", "Pazartesi görüşürüz". Üçünde de "günü" yok, Almancasında da küçük kelime yok; kural tutuyor. |
| h1 | ortam | Stadler fırını, tezgâhın önü. Tobi'nin siparişini almaya geldin. | Fırındayım, tezgâhın önünde. Tobi'nin ısmarladığını almaya gelmişim. | geçer | N13 kapandı. Noktalı virgül yok, Almanca kelime yok. |
| h2 | ortam | Apartman merdiveni, sabah. Alt kattaki komşun Brandl Hanım'la karşılaşıyorsun. | Sabah merdivende alt kat komşuma rastlıyorum. | geçer | Noktalı virgül yok. Tek okumada anladım. |
| h3 | ortam | Telefon. Aile hekimin Dr. Weber'in muayenehanesinden sekreter Huber Hanım arıyor. | Doktorumun sekreteri beni telefonla arıyor. | geçer | Noktalı virgül yok. İkinci cümle 9 kelime. |
| h4 | ortam | İş yerinde, şefin Wimmer Bey'in kapısında. Hafta sonu mesaisi konuşuluyor. | İşteyim, şefimin kapısındayım. Hafta sonu çalışma konuşuluyor. | geçer | Noktalı virgül yok. Tek okumada anladım. |
| h5 | ortam | Telefon. Dr. Weber'in muayenehanesini arıyorsun, Huber Hanım açıyor. | Doktorun yerini ben arıyorum, telefonu Huber Hanım açıyor. | geçer | Noktalı virgül yok. Kimin aradığı açık (h3'ün tersi). |

### 2. sürüm sonuç

| | |
|---|---|
| Okunan satır | 8 (1 görev cümlesi, 1 kart açıklaması, 1 kalıp, 5 ortam) |
| Geçer | 8 |
| Geri döner | 0 |

Önceki turun iki geri dönüşü (`h4/g6`, `lx:Herr` `ne_zaman_tr`) kapandı. N13 ve N15 kapandı. Bu turda okunan satırlarda geri dönen yok.

### 2. sürüm notlar (karar değil, baş geliştiriciye)

**N18 — h4 sahnesinin ilk satırı g6 ile aynı ipucunu taşımıyor.** g6'da "hafta sonunda" küçük kelimeli Almancaya gidiyor. Aynı halkanın sahnesinde Wimmer Bey'in ilk satırında Almanca yine küçük kelimeli, ama Türkçesi yalın: "Hafta sonu … cumartesi olur mu?". Sahne satırını yalnızca okuyorum, yazmıyorum; o yüzden geri çevirmedim. Ama g6'dan sonra bu satırı görünce "sonunda demeden de mi küçük kelime geliyor" diye bir an durdum. Sahne satırı ileride Türkçeden yazdırılırsa takılırım.

**N17 aynen.** lx:Herr `ne_zaman_tr` iki cümle; ikincisi "nereye konur"u anlatıyor. Ayrıca yeni ilk cümle `anlam_tr` ile hemen hemen aynı şeyi söylüyor (saygıyla, soyadıyla seslenme). Beni durdurmadı.

**N5, N2, N4, N14, N16 bu turda okunmadı, durumları aynen.**

## Frau/Herr notları ve N18

Okunan: iki yeni yaygın hata uyarısı, iki kartın `ne_zaman_tr` alanı, h4 sahnesinin ilk satırı. Metinler içerik dosyalarındaki son hâlinden alındı (`batch-002.json`, `batch-003.json`, `gun-01-halkalar.json`). Öbür satırlar yeniden okunmadı.

| Öğe | Alan | Açıklama | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| lx:Frau | mistakes_tr (3.) | Huber Hanım derken **Huber Frau** denmez. **Frau** soyadından önce gelir: **Frau Huber**. | Türkçedeki gibi soyadını başa koyarsam yanlış olur. Kelime önce, soyadı sonra gelir. | geçer | Tek okumada anladım. İki cümle de 6 kelime. Tek fikir: sıra. Yanlış ile doğru yan yana duruyor, hangisinin doğru olduğu açık. Tırnak yok, terim yok. Üstündeki uyarıyla karışmıyor: o "adla değil soyadıyla" diyor, bu "önce mi sonra mı" diyor. |
| lx:Herr | mistakes_tr (3.) | Pichler Bey derken **Pichler Herr** denmez. **Herr** soyadından önce gelir: **Herr Pichler**. | Soyadını başa koymam. Önce kelime, sonra soyadı. | geçer | Kadın kartındakiyle aynı kalıp, aynı açıklık. 6 ve 6 kelime. Tek fikir. |
| lx:Herr | ne_zaman_tr | Bir erkeğe soyadıyla kibarca seslenirken: şefine, komşuna, tanımadığına. | Bir adama soyadıyla kibarca seslenirken söylerim. Şefime de, komşuma da, tanımadığım birine de. | geçer | Geri dönüşüm kapalı kalıyor: tanıdıklarım (şef, komşu) açıklamanın içinde. Tek cümle, 9 kelime. Sıra cümlesi gittiği için alanda artık tek fikir var. |
| lx:Frau | ne_zaman_tr | Soyadıyla birlikte kibar hitap olarak da kullanılır. | Bir kadına soyadıyla kibarca seslenirken de bu kelimeyi söylerim. | geçer | Tek cümle, 7 kelime, tek fikir. "da" sözü üstteki anlam satırına bağlanıyor (kadın, hanım, eş); ikisini art arda okuyunca oturuyor. Sıra artık uyarıda, burada aramadım. |
| h4/s1 | sahne satırı (tr) | İyi günler! Hafta sonunda … cumartesi olur mu? | Şefim selam veriyor, hafta sonu için düşünüp cumartesinin uyup uymadığını soruyor. | geçer | N18 kapandı. g6'daki "hafta sonunda" ile aynı söz; Almancadaki küçük kelimenin karşılığı var. İki yerde aynı Türkçe aynı Almancaya gidiyor, durmadım. |

### Sonuç

| | |
|---|---|
| Okunan satır | 5 (2 uyarı, 2 kart açıklaması, 1 sahne satırı) |
| Geçer | 5 |
| Geri döner | 0 |

Geri dönen yok. Önceki geri dönüşlerim (`h4/g6`, `lx:Herr` `ne_zaman_tr`) kapalı. N18 kapandı. N17 kapandı: iki kartta da `ne_zaman_tr` tek cümle, sıra bilgisi uyarıya geçti.

### Notlar (karar değil, baş geliştiriciye)

**N19 — iki kart aynı işi farklı sözle anlatıyor.** Erkek kartı kime söyleyeceğimi sayıyor (şef, komşu, tanımadığım). Kadın kartı saymıyor, yalnızca "kibar hitap" diyor. İkisini de anladım. Ama yan yana okuyunca "kadına da şefimse, komşumsa söyler miyim" sorusunun cevabını kadın kartında değil erkek kartından çıkardım.

**N20 — erkek kartında iki alan birbirine çok yakın.** `anlam_tr` "saygıyla seslenirken soyadının önüne gelir" diyor, `ne_zaman_tr` "soyadıyla kibarca seslenirken" diyor. Aynı şeyi iki kez okudum gibi geldi. Yeni olan yalnızca üç kişi örneği. Beni durdurmadı. Sıra bilgisi hem `anlam_tr` içinde hem uyarıda var; çelişmiyor.

**N21 — sahne satırında üç nokta.** h4/s1'de Türkçede de Almancada da üç nokta var. Konuşan kişinin duraksaması olarak okudum, anlamı bozmuyor. OD-9.2 üç noktayı açıklama alanlarında yasaklıyor; sahne satırı açıklama sayılıyorsa takılır. Önceki turlarda da böyleydi, geçirmiştim.

## PM #165 küçük sözcükler

Okunan: yazar ve dilbilimci raporlarının aynı başlıklı bölümlerinde değişen satırlar, dosyadaki son hâlleriyle (`gun-01-halkalar.json`). Altı yeni kalıp, h3'ten çıkan iki kalıbın bıraktığı boşluk, 13 görev cümlesi (yazarın 12'si ve dilbilimcinin değiştirdiği `h3/g1`), 2 sahne satırı, `lx:bitte` `exp.anlam_tr` (`batch-001.json`). Öbür satırlar yeniden okunmadı.

Kalıplarda ek soru: bu çeviri bana ne öğretiyor, Türkçeden yazarken beni doğru yere götürüyor mu?

| Öğe | Alan | Açıklama | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| h1 | kalıp | Guten Tag / İyi günler | Birine kibarca selam veriyorum. | geçer | Tek okumada anladım. İki görev cümlesinde aynı Türkçe aynı Almancaya gidiyor (`h1/g3`, `h4/g9`). N16 aynen: Türkçede ayrılırken de söylerim, kalıp bunu ayırmıyor. |
| h1 | kalıp | Für … / … için | Boşluğa kimin için olduğunu koyarım. Almancada kelime başa geliyor, Türkçede sona. | geçer | Yuvanın yeri iki dilde ters ve bu ekranda görünüyor. "Ioana için", "Tobi için" tek cümleye gidiyor. N4'ün "için" maddesi kapandı. |
| h2 | kalıp | nicht … / … değil | Bir şeyin öyle olmadığını söylerim. Kelime, değil dediğim şeyin önüne gelir. | **geri döner** | Kalıp kelimeyi öne koyuyor. `h2/g2` "Sağ olun, bugün değil." cümlesini kalıba göre yazınca kelime "bugün"ün önüne geliyor. Kabul listesindeki üç biçimin üçünde de kelime "bugün"den sonra. Kalıba uyduğum hâlde yanlış sayılırım. "Salı değil mi?" ve "pazartesi değil" cümlelerinde kalıp tutuyor. |
| h3 | kalıplar (çıkan: "… olur.", "… olmuyor.") | Geht …? / … olur mu? ve Bis …! / … görüşürüz! | Soru sormayı ve vedalaşmayı öğreniyorum. Bir şeyin olduğunu ya da olmadığını söylemeyi bu halkada gören yok. | **geri döner** | `h3/g6` "Cuma olmuyor Pichler Bey." cümlesini yazmam isteniyor. Elimde yalnızca "… olur mu?" ve h2'den "… değil" var. Türkçede "değil" sözü yok; iki kalıbı nasıl birleştireceğimi bilemedim. Sahnedeki örnek ("yarın olmuyor") görev cümlelerinden sonra geliyorsa ilk kez kendim uydurmuş olurum. |
| h4 | kalıp | Welcher Tag ist heute? / Bugün günlerden ne? | Bugünün hangi gün olduğunu soruyorum. | geçer | Tek okumada anladım, Türkçesi doğal. Bütün cümle tek parça, yuva yok. Hangi kelimenin "hangi" olduğunu öğrenmiyorum, cümleyi ezber olarak alıyorum. `h4/g10` ile birebir aynı; tek cümleye gidiyorum. Bkz. N22. |
| h4 | kalıp | diese Woche / bu hafta | İçinde olduğumuz haftayı söylüyorum. | geçer | Açık, kelime kelime gidiyor. `h4/g7` ve `h4/g8` ile tutuyor. N4'ün "bu" maddesi bu söz için kapandı. |
| h5 | kalıp | …, aber … / …, ama … | İki şeyi karşı karşıya koyuyorum: biri öyle, öbürü değil. | geçer | Kelime iki dilde de ortada. `h5/g3` ile tutuyor. N4'ün "ama" maddesi kapandı. |
| h1/g3 | görev cümlesi (tr) | İyi günler Brandl Hanım! | Komşuma kibarca selam veriyorum. | geçer | Halkanın kalıbı ve kadın kartıyla kuruluyor. Tek cümle. |
| h1/g6 | görev cümlesi (tr) | Merhaba Ioana! Sağ ol! | Ioana'yı selamlayıp teşekkür ediyorum. | geçer | Yalnızca bu halkanın kelimeleri. "Sağ ol" ile "teşekkürler" aynı Almancaya gidiyor; kartın Türkçesinde ikisi de var, durmadım. |
| h2/g5 | görev cümlesi (tr) | Salı, lütfen. | Salıyı istiyorum. | geçer | "günü" yok, Almancada da küçük kelime yok. Kural tutuyor. |
| h3/g1 | görev cümlesi (tr) | Yarın olur mu? | Yarın uyar mı diye soruyorum. | geçer | Kalıbın yuvasına birebir oturuyor. N2 bu satır için kapandı: kısa kelime artık beklenen cümlede yok, yazarsam da kabul ediliyor. |
| h3/g3 | görev cümlesi (tr) | Perşembe olur Huber Hanım. | Perşembe bana uyuyor diyorum. | **geri döner** | Elimdeki tek kalıp soru biçimi. Soru olmayan cümlede kelimelerin yer değiştirdiğini gösteren bir şey yok. Kalıptaki sırayla yazıp soru işaretini atıyorum; o biçim kabul listesinde yok. Bu, halkada soru olmayan ilk "olur" cümlesi. |
| h3/g5 | görev cümlesi (tr) | Cuma olur mu? | Cuma uyar mı diye soruyorum. | geçer | Kalıba birebir oturuyor. "günü" yok, küçük kelime yok. |
| h3/s1 | sahne satırı (tr) | Merhaba! Yarın, perşembe günü olur mu? | Sekreter yarını öneriyor, yarın perşembe. | geçer | Yalnızca okuyorum. "günü" Almancadaki küçük kelimeyle eşleşiyor. Almancada kalıpta olmayan kısa bir kelime var (N2); okurken beni durdurmadı. |
| h4/g4 | görev cümlesi (tr) | Pazar olur mu Tobi? | Tobi'ye pazarın uyup uymadığını soruyorum. | geçer | h3'ün kalıbı, tek cümle. |
| h4/g6 | görev cümlesi (tr) | Hafta sonu! Pazartesi görüşürüz Tobi! | Hafta sonu geldi diye seviniyorum, Tobi'ye pazartesiye kadar veda ediyorum. | geçer | Önceki geri dönüşüm kapalı kalıyor: "sonunda" yok, küçük kelime de yok. "Hafta sonu!" tek başına biraz çıplak; üstündeki "Bugün cuma, hafta sonu!" satırından sonra okuyunca oturdu. |
| h4/g7 | görev cümlesi (tr) | Bu hafta olmuyor. | Bu hafta bana uymuyor. | geçer | h3'te "olmuyor"u bir kez yazmış olarak geliyorum; kalıp "bu hafta"yı veriyor. Tek cümle. h3'teki boşluk kapanmazsa burada da takılırım. |
| h4/g9 | görev cümlesi (tr) | İyi günler Wimmer Bey! | Şefime kibarca selam veriyorum. | geçer | h1'in kalıbı, başka kişiyle. |
| h4/s4 | sahne satırı (tr) | Evet, pazar olur. | Pazar günü çalışabilirim. | geçer | Yalnızca okuyorum. "günü" yok, küçük kelime yok. Sahne sorusunun cevabı yine tek: pazar. |
| h5/g3 | görev cümlesi (tr) | Yarın olmuyor ama öbür gün olur. | Yarın uymuyor, ondan sonraki gün uyuyor. | geçer | Halkanın yeni kalıbıyla kuruluyor. N2 kapandı: beklenen cümlede kısa kelime yok, yazarsam kabul ediliyor. |
| h5/g8 | görev cümlesi (tr) | Muayenehane bugün kapalı mı? | Doktorun yeri bugün açık mı diye soruyorum. | geçer | "günü" yok, küçük kelime yok. Tek cümle. |
| h5/g10 | görev cümlesi (tr) | Yarın gidiyor musunuz Wimmer Bey? | Şefime yarın gidip gitmediğini soruyorum. | geçer | "Siz" diye sorduğum Türkçeden belli. Nereye gittiği yok, Almancada da yok. N4 aynen: "siz" anlamındaki kelimenin ne kartı ne kalıbı var. |
| lx:bitte | anlam_tr | İsterken lütfen, verirken buyurun, teşekküre karşılık rica ederim demek. | Bu tek kelimeyi üç yerde söylerim: bir şey isterken, bir şey uzatırken, biri teşekkür edince. | geçer | Tek okumada anladım. Tek cümle, 10 kelime, sembol ve terim yok. Üç kullanım tek kelimenin anlamı olarak okunuyor, ayrı fikir gibi gelmedi. Halkadaki cümlelerle tutuyor. Bkz. N23. |

### Sonuç

| | |
|---|---|
| Okunan satır | 23 (6 yeni kalıp, 1 kalıp listesi, 13 görev cümlesi, 2 sahne satırı, 1 kart açıklaması) |
| Geçer | 20 |
| Geri döner | 3 |

Geri dönenler: h2 kalıbı `nicht …`, h3 kalıp listesi (çıkan iki kalıp), `h3/g3`.

Dosyada geri dönen satır olduğu için bu hâliyle "reviewed" sayılamaz (OD-9.4).

### Geri dönenler — kendi sözlerimle

- **h2 `nicht …` / … değil.** Kalıp bana "kelime öne gelir" diyor. "Salı değil mi?" ve "pazartesi değil" cümlelerinde öyle. "Bugün değil" cümlesinde beklenen Almancada kelime sonda. Aynı halkada aynı kalıp bir cümlede tutuyor, öbüründe tutmuyor; kalıba uyan cevabım kabul listesinde yok.
- **h3 kalıp listesi.** Önceki turda "… olmuyor." kalıbı için "üç kalıp birlikte okununca çok açık" demiştim. Şimdi "olur" ile "olmuyor"u gösteren kalıp yok. "Cuma olmuyor" cümlesinde Türkçe "değil" demiyor; h2'nin kalıbını buraya taşıyacağımı kendiliğimden çıkaramadım, taşısam da kelimeyi nereye koyacağımı bilemedim.
- **`h3/g3` Perşembe olur Huber Hanım.** Soru kalıbındaki sırayı aynen kullandım. Beklenen cümlede iki kelime yer değiştirmiş. Bunu bana gösteren ilk yer sahne; görev cümlesi ondan önce geliyorsa yanlış yazarım.

### Notlar (karar değil, baş geliştiriciye)

**N22 — aynı soruya iki Türkçe.** h2'nin başlığı "Bugün hangi gün?", h4'ün kalıbı "Bugün günlerden ne?". İkisi aynı şeyi soruyor. h2'de başlığı okuyunca bu soruyu orada öğreneceğimi sandım; Almancası h4'te geliyor.

**N23 — "buyurun" iki işte.** Açıklama "verirken buyurun" diyor. h1 sahnesinde Stadler Hanım'ın ilk sözü de "Buyurun?" diye çevrilmiş, ama orada bir şey vermiyor, ne istediğimi soruyor. Sahne sorusu tam bu sözü soruyor. Açıklamadaki üç kullanımdan hiçbiri bu değil; doğru şıkkı açıklamadan değil, sahnenin gidişinden buldum. N5 aynen (soruda tırnak içinde Almanca).

**N4 daraldı.** "için", "değil", "bu", "ama" artık kalıp. Kalanlar: günün önündeki küçük kelime (dört halkada birer kez), "peki", "biz", "siz", muayenehanenin önündeki küçük kelimeler, "her şey". "günü" ipucu her yerde tutarlı: olduğu yerde küçük kelime var, olmadığı yerde yok.

**N2 görev cümlelerinde kapandı.** Kısa kelime artık yalnızca `h3/s1` sahne satırında; yazmam beklenmiyor.

**N14, N16 aynen.**

## PM #165 geri dönüşler

Okunan: son turda geri dönen üç satırın ve iki notun (N22, N23) düzeltilmiş hâlleri, dosyadaki son metinle (`gun-01-halkalar.json`, `batch-001.json` `lx:bitte` `exp.anlam_tr`). h2 kalıbı yuvasız olduğu için o kalıbı kullanan "değil" cümlelerinin hepsini yeniden yazmayı denedim (h2/g2, g4, g10, h4/g8, h5/g2). Öbür satırlar yeniden okunmadı.

Kalıplarda ek soru aynı: Türkçeden yazarken beni doğru yere götürüyor mu?

| Öğe | Alan | Açıklama | Kendi sözlerimle | Karar | Gerekçe |
|---|---|---|---|---|---|
| h2 | kalıp | nicht / değil | Bir şeyin öyle olmadığını bu kelimeyle söylerim. | geçer | Tek okumada anladım. Kalıp artık kelimenin yerini söylemiyor; bu yüzden iki cümleyle de çelişmiyor. Ama yerini de öğretmiyor: aşağıdaki üç satıra bakınız. |
| h2/g2 | görev cümlesi (tr) | Sağ olun, bugün değil. | Teşekkür edip bugün istemediğimi söylüyorum. | geçer | Kelimeyi Türkçedeki yerine, "bugün"den sonra koydum. Kabul listesinin ilk cümlesi çıktı. Önceki geri dönüşüm kapandı. |
| h2/g4 | görev cümlesi (tr) | Pazartesi mi? Salı değil mi? | Günü yanlış mı duydum diye soruyorum. | **geri döner** | g2'deki gibi kelimeyi günden sonra koydum. Kabul listesindeki üç biçimin üçünde de kelime günden önce. Kalıp bana yer göstermiyor; bir önceki cümlede işe yarayan sıra burada yanlış sayılıyor. |
| h2/g10 | görev cümlesi (tr) | Hayır, pazartesi değil, salı. | Günü düzeltiyorum. | **geri döner** | Aynı durum. "Pazartesi"den sonra koydum; listede kelime hep "pazartesi"den önce. |
| h5/g2 | görev cümlesi (tr) | Dün mü? Bugün değil mi? | Şaşırıp günü soruyorum. | **geri döner** | h2/g2'de "bugün değil"i kelime sonda olarak yazıp doğru saymıştım. Aynı iki kelimeyi aynı sırayla yazdım; burada kabul listesinde yalnızca öbür sıra var. |
| h3 | kalıp | Geht …? – … geht. – … geht nicht. / … olur mu? – … olur. – … olmuyor. | Bir günün uyup uymadığını sorarım. Uyuyorsa ikinciyi, uymuyorsa üçüncüyü söylerim. Soruda gün sonda, cevapta başta. | geçer | Soru ve iki cevap olarak okudum, tek okumada oturdu. Kelimenin soruda öne, cevapta arkaya geçtiği yan yana görünüyor. Türkçe "olmuyor"un Almancada iki kelime olduğu da görünüyor. Telefonda satır uzun; çizgileri "sonra karşıdaki söyler" diye okudum. |
| h3/g3 | görev cümlesi (tr) | Perşembe olur Huber Hanım. | Perşembe bana uyuyor diyorum. | geçer | Kalıbın ikinci parçasına günü koydum, hitabı sona ekledim. Kabul listesinin ilk cümlesi çıktı. Önceki geri dönüşüm kapandı. |
| h3/g6 | görev cümlesi (tr) | Cuma olmuyor Pichler Bey. | Cuma bana uymuyor diyorum. | geçer | Kalıbın üçüncü parçasına günü koydum, hitabı ekledim. Kabul listesinin ilk cümlesi çıktı. h2'nin kalıbını buraya taşımam gerekmedi. Önceki geri dönüşüm kapandı. |
| lx:bitte | anlam_tr | Lütfen, buyurun ya da teşekküre karşılık rica ederim demek. | Bu tek kelime üç Türkçe söze karşılık geliyor: lütfen, buyurun, biri teşekkür edince rica ederim. | geçer | Tek cümle, 8 kelime, sembol ve terim yok. "Buyurun" artık "verirken" diye daraltılmamış. h1 sahnesinde hem ilk satırdaki "Buyurun?" hem son satırdaki "Buyurun!" bu söze oturuyor. Sahne sorusunun doğru şıkkı da "Buyurun" diye başlıyor; açıklamadan bulabildim. |
| h2 | başlık | Bugün ve hafta başı | Bu halkada bugünü ve haftanın ilk günlerini söylemeyi öğreneceğim. | geçer | Artık bir soru vaat etmiyor; h4'teki soruyla karışmıyor. Kartlarla tutuyor (bugün, pazartesi, salı, çarşamba). Çarşamba bana hafta başından çok hafta ortası; beni durdurmadı. |

### Sonuç

| | |
|---|---|
| Okunan satır | 10 (2 kalıp, 6 görev cümlesi, 1 kart açıklaması, 1 başlık) |
| Geçer | 7 |
| Geri döner | 3 |

Geri dönenler: `h2/g4`, `h2/g10`, `h5/g2`.

Son turun üç geri dönüşü (h2 kalıbı, h3 kalıp listesi, `h3/g3`) kapandı. Yerlerine aynı kökten üç yeni geri dönüş geldi. Dosyada geri dönen satır olduğu için bu hâliyle "reviewed" sayılamaz (OD-9.4).

### Geri dönenler — kendi sözlerimle

- **`h2/g4`, `h2/g10`, `h5/g2` — "değil" kelimesinin yeri.** Kalıp yuvasız olunca kelimeyi nereye koyacağımı Türkçeden aldım: Türkçede "değil" sonda, ben de sona koydum. "Bugün değil" cümlesinde bu doğru sayılıyor. "Salı değil mi?", "pazartesi değil, salı" ve h5'teki "Bugün değil mi?" cümlelerinde aynı sırayı yazınca kabul listesinde bulamıyorum. En çok h5/g2'de şaşırdım: h2'de doğru saydığım iki kelimenin aynısı, aynı sırayla, orada yanlış. `h4/g8` "Bu hafta değil" cümlesinde iki sıra da kabul ediliyor; orada takılmadım.

### Notlar (karar değil, baş geliştiriciye)

**N22 kapandı.** h2 başlığı artık soru değil.

**N23 kapandı.** Açıklamadaki "buyurun" sahnedeki iki kullanımı da karşılıyor.

**N24 — h3 kalıbı tek satırda üç söz.** Soru, olur cevabı ve olmuyor cevabı tek öğede. Ben konuşma gibi okudum ve geçirdim. "Bir alan bir fikir" harfiyen uygulanırsa üç fikir sayılabilir; ayrıca tek satırda altı tane üç nokta var. Yuva işareti olduğunu önceki kalıplardan biliyordum, o yüzden durmadım.

**N5 aynen.** h1 sorusunda tırnak içinde Almanca duruyor.

**N2, N4, N14, N16 bu turda okunmadı, durumları aynen.**

## nicht kalıbı son hâl

Kalıp yeniden yuvalı: "nicht …" / "… değil". Okuduğum şey: Türkçede "değil" sözden sonra gelir, Almancada bu kelime sözden önce gelir. Beş Türkçe cümleyi yalnızca bu kalıba ve kartlara bakarak çevirdim, sonra kabul listesine baktım. Nokta, virgül ve çizgi farkını saymadım.

| Öğe | Alan | Açıklama | Kendi sözlerimle | Benim yazdığım | Karar | Gerekçe |
|---|---|---|---|---|---|---|
| h2 | kalıp | nicht … / … değil | Bir şeyin öyle olmadığını söylerim. Kelimeyi sözün önüne koyarım. | | geçer | Tek okumada anladım. Üç noktanın yeri iki dilde ters; kelimenin yerini artık kalıptan alıyorum. |
| h2/g2 | görev cümlesi (tr) | Bugün değil, sağ olun. | Teşekkür edip bugün istemediğimi söylüyorum. | Nicht heute, danke. | geçer | Kabul listesinin ilk cümlesi. Kalıpla aynı sıra. |
| h2/g4 | görev cümlesi (tr) | Pazartesi mi? Salı değil mi? | Günü yanlış mı duydum diye soruyorum. | Montag? Nicht Dienstag? | geçer | Kabul listesinin ilk cümlesi. Önceki geri dönüşüm kapandı. |
| h2/g10 | görev cümlesi (tr) | Hayır, pazartesi değil, salı. | Günü düzeltiyorum. | Nein, nicht Montag, Dienstag. | geçer | Listedeki ilk cümleyle aynı kelimeler, aynı sıra. Ben çizgi yerine virgül koydum. Önceki geri dönüşüm kapandı. |
| h5/g2 | görev cümlesi (tr) | Dün mü? Bugün değil mi? | Şaşırıp günü soruyorum. | Gestern? Nicht heute? | geçer | Kabul listesinin ilk cümlesi. h2/g2 ile aynı sıra; iki halka artık birbirini tutuyor. Önceki geri dönüşüm kapandı. |
| h4/g8 | görev cümlesi (tr) | Bu hafta değil Huber Hanım. | Bu hafta olmayacağını söylüyorum. | Nicht diese Woche Frau Huber. | geçer | Listedeki ilk cümleyle aynı kelimeler, aynı sıra. Ben virgül koymadım. |

### Sonuç

| | |
|---|---|
| Okunan satır | 6 (1 kalıp, 5 görev cümlesi) |
| Geçer | 6 |
| Geri döner | 0 |

Geri dönenler: yok. Son turun üç geri dönüşü (`h2/g4`, `h2/g10`, `h5/g2`) kapandı. Bu turda yalnızca bu altı satırı okudum; dosyanın geri kalanını yeniden okumadım.

### Notlar (karar değil, baş geliştiriciye)

**N25 — h2/g6 "Bugün salı, değil mi?" kalıbın dışında kalıyor.** Bu cümlede "değil mi" sondaki kısa "ja" sözüne gidiyor. Kalıba uyup kelimeyi günün önüne koyarsam ("Heute ist nicht Dienstag?") kabul listesinde bulamam. Kelimeyi sona koyarsam ("Heute ist Dienstag, nicht?") listede var. Bu satırı bu turda yeniden karara bağlamadım; eski kararım "geçer" ve eski notum duruyor. Yeni kalıpla tuzak biraz büyüdü.

**Virgül ve çizgi.** h2/g10'da çizgi yerine virgül, h4/g8'de virgülsüz yazdım. Karşılaştırma noktalamayı atıyorsa ikisi de eşleşir; ben öyle saydım.
