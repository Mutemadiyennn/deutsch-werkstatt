# OKUR — B7 adsız biçimler (OD-9.3, 1. tur)

Tarih: 2026-11-21 · Okuyan: okur · Kaynak listeler: `docs/v2/reviews/b7-adsiz.md` (yazar), `docs/v2/reviews/b7-dilbilimci.md` (düzeltmeler)

Kapsam: kapsamdaki 14 dosyadaki 41 Türkçe adsız alanın hepsi (37 `tr_adsiz` + 4 `metin_tr_adsiz`). Yeniden kurulan 18 nesnenin öğrenciye görünen öteki Türkçesi de okundu (`exp.anlam_tr`, `ne_zaman_tr`, `parcalar`, `ipucu_tr`, `situation_tr`, `why_tr`, `gorev_tr`). Ayrıca `accepted_adsiz` taşıyan üretim maddelerinin yönergeleri ve adsız seçeneklerin `geri_bildirim_tr` metinleri okundu.

Okuma biçimi: ad girilmemiş ekranda ne görünüyorsa o okundu (`_adsiz` biçimi asıl alanın yerine geçer). Üretim maddelerinde Türkçe, o güne kadar öğretilenlerle Almancaya çevrildi. Çıkan cümle `accepted_adsiz` ile karşılaştırıldı.

## Tablo

| # | dosya | yol | Türkçe (adsız ekranda) | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | gun-01 | `prova.dugumler[0].secenekler[0].tr_adsiz` | İyi günler. | Telefonda yalnızca selam veriyorum. | GEÇTİ | Almancası "Guten Tag." ile aynı. Çelişki: Ç1 |
| 2 | gun-01 | `prova.dugumler[0].secenekler[0].geri_bildirim_tr` | Güzel. Önce selam verdin, sonra adını söyledin. | Selam verdin, adını da söyledin, aferin. | GEÇTİ | Tek okumada anlaşılır. Adsız cevapta ad yok: Ç1 |
| 3 | gun-01 | `prova.dugumler[0].secenekler[1].tr_adsiz` | Merhaba. | Kısa, samimi bir selam. | GEÇTİ | "Hallo." ile aynı |
| 4 | gun-01 | `prova.dugumler[0].secenekler[1].geri_bildirim_tr` | Olur. Muayenehanede **Guten Tag** daha kibar duyulur. | Merhaba da olur, ama doktorda "iyi günler" daha kibar. | GEÇTİ | Adsız cevapla uyumlu |
| 5 | gun-01 | `prova.dugumler[1].secenekler[0].tr_adsiz` | İyi günler. | Yine yalnızca selam veriyorum. | GEÇTİ | Çelişki: Ç1 |
| 6 | gun-01 | `prova.dugumler[1].secenekler[0].geri_bildirim_tr` | Şimdi oldu. Selam verdin ve adını söyledin. | Bu sefer selam da ad da tamam. | GEÇTİ | Tek okumada anlaşılır. Adsız cevapta ad yok: Ç1 |
| 7 | gun-01 | `prova.dugumler[2].tr_adsiz` | İyi günler. Salı olur mu? | Sekreter selam verip salıyı soruyor. | GEÇTİ | "Guten Tag. Geht Dienstag?" ile aynı |
| 8 | gun-01 | `prova.dugumler[4].tr_adsiz` | Salı, tamam. Teşekkürler! | Salıya anlaştık, teşekkür ediyor. | GEÇTİ | Almancasıyla aynı |
| 9 | gun-01 | `prova.dugumler[5].tr_adsiz` | Perşembe, tamam. Teşekkürler! | Perşembeye anlaştık, teşekkür ediyor. | GEÇTİ | Almancasıyla aynı |
| 10 | gun-01 | `okuma_yazma.metin_tr_adsiz` | Merhaba, ben Ioana. Bugün salı. Yarın olmaz. Perşembe olmaz. Cuma olur mu? Teşekkürler! | Ioana yazıyor: yarın ve perşembe olmuyor, cumayı soruyor. | GEÇTİ | Cümle sayısı aynı, sorular yine metne uyuyor |
| 11 | gun-02 | `prova.dugumler[0].tr_adsiz` | İyi günler! Bugün doğum günüm. | Komşu selam veriyor, bugün doğum günü olduğunu söylüyor. | GEÇTİ | Almancasıyla aynı |
| 12 | gun-02 | `prova.dugumler[5].tr_adsiz` | Teşekkürler! Yarın görüşürüz! | Teşekkür edip yarın görüşürüz diyor. | GEÇTİ | Almancasıyla aynı |
| 13 | gun-02 | `prova.dugumler[6].tr_adsiz` | Yarın görüşürüz! Teşekkürler! | Vedalaşıyor, bir de teşekkür ediyor. | GEÇTİ | Almancasıyla aynı |
| 14 | gun-02 | `okuma_yazma.metin_tr_adsiz` | Merhaba, ben Derya. Temmuz sonunda iznim var. Doğum günüm martta. Yarın görüşürüz! | Derya izninin ve doğum gününün ne zaman olduğunu yazıyor. | GEÇTİ | Soru (izin ne zaman) yine cevaplanıyor |
| 15 | gun-03 | `prova.dugumler[0].secenekler[0].tr_adsiz` | İyi günler. | Yalnızca selam veriyorum. | GEÇTİ | Çelişki: Ç1 |
| 16 | gun-03 | `prova.dugumler[0].secenekler[0].geri_bildirim_tr` | Güzel. Önce selam verdin, sonra adını söyledin. | Selam verdin, adını da söyledin. | GEÇTİ | Adsız cevapta ad yok: Ç1 |
| 17 | gun-03 | `prova.dugumler[1].tr_adsiz` | İyi günler! | Sekreter selam veriyor. | GEÇTİ | — |
| 18 | gun-03 | `prova.dugumler[7].tr_adsiz` | Pazartesi görüşürüz! | Pazartesi görüşmek üzere vedalaşıyor. | GEÇTİ | — |
| 19 | gun-04 | `prova.dugumler[0].tr_adsiz` | İyi günler! | Frau Brandl selam veriyor. | GEÇTİ | — |
| 20 | gun-04 | `prova.dugumler[6].tr_adsiz` | Teşekkürler! İyi hafta sonları! | Teşekkür edip iyi hafta sonu diliyor. | GEÇTİ | — |
| 21 | gun-04 | `okuma_yazma.metin_tr_adsiz` | Merhaba, ben Derya. Bir ekmek dört avro. Bir kilo elma üç avro. Bu pahalı değil! Ya sen? | Derya fiyatları yazıyor, pahalı bulmuyor, bana soruyor. | GEÇTİ | Sorular yine metne uyuyor |
| 22 | gun-05 | `prova.dugumler[0].secenekler[0].tr_adsiz` | İyi günler. Bir randevum var. Randevum saat kaçta? | Randevum olduğunu söyleyip saatini soruyorum. | GEÇTİ | TR→DE: "Guten Tag. Ich habe einen Termin. Um wie viel Uhr ist mein Termin?" listede var. "Randevum" iki kez geçiyor ama tek okumada anlaşılıyor |
| 23 | gun-05 | `prova.dugumler[0].secenekler[0].geri_bildirim_tr` | Güzel. Önce adını söyledin, sonra randevunu sordun. | Adını söyledin, sonra randevuyu sordun. | GEÇTİ | Tek okumada anlaşılır. Adsız cevapta ad yok: Ç2 |
| 24 | gun-06 | `okuma_yazma.metin_tr_adsiz` | Merhaba! Doğum günüm yedi martta. Senin doğum günün ne zaman? Derya | Derya doğum gününü söyleyip benimkini soruyor. | GEÇTİ | — |
| 25 | gun-06 | `sesler[0].bolumler[0].cevapla.situation_tr` | Bankoya gidiyorsun. Frau Huber adını soruyor. Adını söyle. | Bankoda adımı soruyorlar, adımı söylemeliyim. | GEÇTİ | Kendi başına açık. TR→DE yalnızca ad çıkıyor ("Mein Name ist …"). `accepted_adsiz` yalnızca kart cümleleri: Ç3 |
| 26 | gun-06 | `sesler[0].bolumler[0].cevapla.why_tr` | Kısa cevap da olur: yalnızca adını söyle. | Uzun cümle şart değil, adını söylemen yeter. | GEÇTİ | Açık, ama adsız örnek cevap kart uzatıyor: Ç3 |
| 27 | gun-07 | `sahne.bolumler[0].dikte[4].gorev_tr` | Muayenehaneyi arayınca söyleyeceğin ilk iki cümleyi Almanca yaz: adın ve isteğin. | Telefonda ilk söyleyeceğim iki cümleyi yazacağım: adım ve isteğim. | GEÇTİ | 11 kelime, açık. Adsız örnekte başkasının adı var: Ç4 |
| 28 | gun-07 | `sesler[0].bolumler[0].cevapla.situation_tr` | Bekledin, sonunda Frau Huber telefonu açtı. Adını ve ne istediğini söyle. | Sekreter açtı. Adımı ve ne istediğimi söylemeliyim. | GEÇTİ | TR→DE (adsız kısmı): "Guten Tag. Ich möchte einen Termin machen." listede var. Ad kısmı: Ç5 |
| 29 | gun-07 | `sesler[0].bolumler[0].cevapla.why_tr` | Kibarca istemek için **Ich möchte** de: **Ich möchte einen Termin machen.** (Randevu almak istiyorum.) | Kibar istemek için "Ich möchte" kullanılır, örneği bu. | GEÇTİ | 14 kelime (sınırda), tek fikir |
| 30 | gun-07 | `prova.dugumler[0].secenekler[0].tr_adsiz` | İyi günler. | Yalnızca selam veriyorum. | GEÇTİ | Çelişki: Ç5 |
| 31 | gun-07 | `prova.dugumler[0].secenekler[0].geri_bildirim_tr` | Güzel. Telefonda önce adını söyledin. | Telefonda adını önce söyledin, iyi. | GEÇTİ | Adsız cevapta ad yok: Ç5 |
| 32 | gun-07 | `prova.dugumler[0].secenekler[1].tr_adsiz` | İyi günler. Randevu almak istiyorum. | Selam verip randevu istiyorum. | GEÇTİ | "Guten Tag. Ich möchte einen Termin machen." ile aynı |
| 33 | gun-07 | `prova.dugumler[0].secenekler[1].geri_bildirim_tr` | Çok iyi. Adını ve isteğini tek seferde söyledin. | Adını da isteğini de bir kerede söyledin. | GEÇTİ | Adsız cevapta ad yok: Ç5 |
| 34 | gun-07 | `gun_sinavi.maddeler[10].situation_tr` | Kuaför Luka'ya telefon ettin. Perşembe günkü randevuna gelemiyorsun. Adını söyle ve cumartesi gelip gelemeyeceğini sor. | Perşembe gidemiyorum. Adımı söyleyip cumartesiyi soracağım. | GEÇTİ | TR→DE (adsız kısmı): "Hallo Luka. Ich kann am Donnerstag nicht kommen. Kann ich am Samstag kommen?" listede var. Ad kısmı: Ç5 |
| 35 | gun-07 | `gun_sinavi.maddeler[10].why_tr` | Cumartesi gelebilir miyim derken **Kann ich am Samstag kommen?** dersin. | Cumartesi gelebilir miyim diye sormanın yolu bu. | GEÇTİ | — |
| 36 | r0-01 | `teach[10].tr_adsiz` | İyi günler, ben Frau Huber. | Frau Huber telefonda selam verip kendini tanıtıyor. | GEÇTİ | "Guten Tag, hier ist Frau Huber." ile aynı |
| 37 | r0-01 | `teach[10].exp.anlam_tr` | Telefonda selam verir ve kim olduğunu söyler. | Telefonda selam ve "ben şuyum" demek. | GEÇTİ | Kartın iki parçasını tek işte anlatıyor |
| 38 | r0-01 | `teach[10].exp.ne_zaman_tr` | Telefonda karşı taraf açınca. | Aradığın kişi telefonu açınca söylenir. | GEÇTİ | Frau Huber'in arayan taraf olmasıyla uyumlu |
| 39 | r0-01 | `teach[10].exp.parcalar` | Guten Tag · iyi günler / hier ist · ben | İlk parça selam, ikincisi "ben". | GEÇTİ | — |
| 40 | r0-01 | `drills[34].tr_adsiz` | İyi günler, ben Frau Huber. | Bu cümleyi Almancaya çevireceğim. | GEÇTİ | TR→DE: "Guten Tag, hier ist Frau Huber." listede var |
| 41 | r0-01 | `dialogue.lines[0].tr_adsiz` | Selam! Bugün günlerden ne? | Ioana bugünün hangi gün olduğunu soruyor. | GEÇTİ | — |
| 42 | r0-04 | `dialogue.lines[1].tr_adsiz` | Evet, yeniyim. Burası ne kadar? | Evet, yeni geldim. Buranın ücreti ne kadar? | GEÇTİ | Basti'nin "yeni misin?" sorusuna oturuyor |
| 43 | r0-05 | `dialogue.lines[1].tr_adsiz` | İyi günler. Perşembe olur mu? | Selam verip perşembeyi soruyorum. | GEÇTİ | — |
| 44 | r0-07 | `dialogue.lines[3].tr_adsiz` | İyi günler, Frau Brandl! Evet, buraya yeni geldim. | Selam veriyorum, yeni geldiğimi söylüyorum. | GEÇTİ | Kendi başına açık. Önceki satır "Adınız ne?": Ç6 |
| 45 | r0-09 | `drills[28].situation_tr` | Muayenehaneyi aradın. Ne istediğini söyle. | Doktoru aradım, ne istediğimi söyleyeceğim. | GEÇTİ | TR→DE: "Ich möchte einen Termin machen." listede var |
| 46 | r0-09 | `dialogue.lines[0].tr_adsiz` | Selam! Bugün birlikte pratik yapalım mı? | Ioana bugün birlikte çalışmayı öneriyor. | GEÇTİ | — |
| 47 | r0-09 | `placement[4].situation_tr` | Muayenehaneyi aradın. Ne istediğini söyle. | 45 ile aynı. | GEÇTİ | TR→DE listede var |
| 48 | r0-10 | `teach[0].tr_adsiz` | Benim adım Ioana Popescu. | Biri adını söylüyor. | GEÇTİ | Almancasıyla aynı |
| 49 | r0-10 | `teach[0].exp.anlam_tr` | Kendini tanıtır. | Kendi adını söylemek için. | GEÇTİ | — |
| 50 | r0-10 | `teach[0].exp.ne_zaman_tr` | Telefonun başında ve resmî yerlerde. | Telefonda ve resmî dairede söylenir. | GEÇTİ | "Telefonun başında" biraz "telefonun yanında" gibi okunuyor, ama anlam doğru çıkıyor |
| 51 | r0-10 | `teach[0].exp.parcalar` | Mein Name ist · benim adım | "Mein Name ist" demek "benim adım". | GEÇTİ | — |
| 52 | r0-10 | `teach[1].tr_adsiz` | Benim ön adım Ioana. | Soyadı olmadan adı Ioana. | GEÇTİ | — |
| 53 | r0-10 | `teach[1].exp.anlam_tr` | Soyadın dışındaki adını söyler. | Soyadını değil, öbür adını söylersin. | GEÇTİ | — |
| 54 | r0-10 | `teach[1].exp.ne_zaman_tr` | Form doldururken sorulur. | Kâğıt doldururken biri bunu soruyor… ama bu kart bir soru değil? | **GERİ** | Ne sorulur? Özne belli değil. Kart bir cevap, açıklama "sorulur" diyor; ifadenin kendisini anlatmıyor |
| 55 | r0-10 | `teach[1].exp.parcalar` | Mein Vorname ist · benim ön adım | "Mein Vorname ist" demek "benim ön adım". | GEÇTİ | — |
| 56 | r0-10 | `teach[2].tr_adsiz` | Benim soyadım Popescu. | Soyadı Popescu. | GEÇTİ | — |
| 57 | r0-10 | `teach[2].exp.anlam_tr` | Soyadını söyler. | Soyadını söylemek için. | GEÇTİ | — |
| 58 | r0-10 | `teach[2].exp.ne_zaman_tr` | Muayenehanede ilk sorulan şeydir. | Doktorda ilk önce bu soruluyor… ama kart bir soru değil? | **GERİ** | 54 ile aynı: kart bir cevap, açıklama soruyu anlatıyor. "Ne zaman söylerim?" sorusuna cevap vermiyor |
| 59 | r0-10 | `teach[2].exp.parcalar` | Mein Nachname ist · benim soyadım | "Mein Nachname ist" demek "benim soyadım". | GEÇTİ | — |
| 60 | r0-10 | `drills[16].tr_adsiz` | Benim adım Ioana Popescu. | Çevireceğim cümle. | GEÇTİ | TR→DE: "Mein Name ist Ioana Popescu." listede var |
| 61 | r0-10 | `drills[17].tr_adsiz` | Benim soyadım Popescu. | Çevireceğim cümle. | GEÇTİ | TR→DE: "Mein Nachname ist Popescu." listede var |
| 62 | r0-10 | `dialogue.lines[1].tr_adsiz` | Adım kolay değil. | Adımı söylemek zor, demek istiyorum. | GEÇTİ | Ardından gelen "harf harf söyler misiniz?" satırına oturuyor. Ad hiç söylenmiyor: Ç6 |
| 63 | r0-10 | `dialogue.lines[4].tr_adsiz` | Teşekkürler. Adresiniz? | Teşekkür edip adresimi soruyor. | GEÇTİ | — |
| 64 | r0-11 | `teach[0].tr_adsiz` | Merhaba, adım Tobi. | Tobi kendini tanıtıyor. | GEÇTİ | — |
| 65 | r0-11 | `teach[0].exp.anlam_tr` | Kendi adını söyler. | Adını söylemek için. | GEÇTİ | — |
| 66 | r0-11 | `teach[0].exp.ne_zaman_tr` | Tanışırken. | Biriyle tanışınca. | GEÇTİ | — |
| 67 | r0-11 | `teach[0].exp.ipucu_tr` | **ich** ile söylerken sonu **-e** olur: **heiße**. | "ich" dersen kelime -e ile biter: heiße. | GEÇTİ | 8 kelime, terim yok, cümlede "ich heiße" görünüyor |
| 68 | r0-11 | `drills[4].tr_adsiz` | Merhaba, adım Tobi. | Boşluğa "heiße" gelecek cümlenin anlamı. | GEÇTİ | Boşluk yine heiße istiyor |
| 69 | r0-11 | `drills[17].tr_adsiz` | Adım Tobi. | Çevireceğim cümle. | GEÇTİ | TR→DE: "Ich heiße Tobi." listede var |
| 70 | r0-11 | `drills[27].situation_tr` | İlk iş günün. Tobi seninle tanışıyor. Adını söyle. | Yeni işte Tobi adımı soruyor, söyleyeceğim. | GEÇTİ | Kendi başına açık. TR→DE yalnızca ad çıkıyor ("Ich heiße …"). `accepted_adsiz` yalnızca "ich bin neu": Ç3 |
| 71 | r0-11 | `dialogue.lines[1].tr_adsiz` | Merhaba Tobi! Burada yeniyim. | Tobi'ye selam verip yeni olduğumu söylüyorum. | GEÇTİ | Önceki satır "Senin adın ne?": Ç6 |
| 72 | r0-11 | `dialogue.lines[2].tr_adsiz` | Ne güzel! Bu da Derya. | Tobi seviniyor, Derya'yı tanıtıyor. | GEÇTİ | 71'e oturuyor |
| 73 | r0-11 | `listening[1].script[0].tr_adsiz` | Merhaba, ben Ioana. | Ioana telefonda kendini tanıtıyor. | GEÇTİ | — |

## Sayılar

- Okunan: **73** (41 adsız Türkçe alanın hepsi + 32 kardeş alan: açıklama, yönerge, ipucu, geri bildirim)
- GEÇTİ: **71**
- GERİ: **2**

### GERİ dönenler

1. `r0-10-buchstabieren.json` · `teach[1].exp.ne_zaman_tr` "Form doldururken sorulur." Kart bir cevap cümlesi ("Mein Vorname ist Ioana."), açıklama ise soruyu anlatıyor ve neyin sorulduğunu söylemiyor.
2. `r0-10-buchstabieren.json` · `teach[2].exp.ne_zaman_tr` "Muayenehanede ilk sorulan şeydir." Aynı sorun.

Not: ikisi de `_adsiz` alanı değil, ad girilmiş ekranda da aynı görünüyor. Yazar ilk turda kartları soru biçimine çevirmişti; bu notlar o biçime uyuyordu. Dilbilimci cevap biçimine döndürünce uyum bozuldu. Asıl alanın kendisi düzeltilebilir, `_adsiz` gerekmez.

Bu dosya grubu, bu iki GERİ kapanmadan "reviewed" sayılamaz (OD-9.4). Kapsamdaki öteki 13 dosyada GERİ yok.

## Yönerge çelişkisi notları (karar değil; içerikte çözülemiyor, ANA'ya)

- **Ç1 — gün 1, n1 ve n1b.** Adsız doğru cevap yalnızca "İyi günler.". Geri bildirimde "Önce selam verdin, sonra adını söyledin." ve "Selam verdin ve adını söyledin." yazıyor. Yanlış seçeneklerin geri bildirimi "Önce selam ver ve adını söyle." diyor ("Welcher Tag ist heute?", "Bugün çarşamba."). Kapanış: "Telefonda selam verdin, adını söyledin…". Gün 3 n1 de aynı: doğru seçenek "…adını söyledin." diyor, yanlış seçenek "Önce selam ver ve adını söyle." diyor.
- **Ç2 — gün 5, n1.** Doğru seçeneğin geri bildirimi "Önce adını söyledin, sonra randevunu sordun." Yanlış seçeneğin geri bildirimi: "Luka telefonda kimin aradığını bilmiyor. Önce adını söyle." Adsız doğru cevaptaki "Bir randevum var." da kimin aradığını söylemiyor. Bu yüzden ders adsız ekranda kendisiyle çelişiyor.
- **Ç3 — gün 6 c1 ve r0-11 d26 (`drills[27]`).** Yönerge "Adını söyle." diyor. Gün 6'da `why_tr` de "yalnızca adını söyle" diyor. Adsız örnek cevap ise kartı uzatıyor ("Hier ist meine Karte.") ya da "Ich bin neu hier." diyor. Türkçeden çevirince yalnızca ad çıkıyor ("Mein Name ist …", "Ich heiße …"), bu `accepted_adsiz` içinde yok. Kendi adını yazan öğrenci yine de doğru sayılır: `accepted_adsiz` asıl listenin önüne ekleniyor, ad yuvasını da öğrencinin cevabı dolduruyor (`persona.ts`). Kesin TR→DE ölçütüyle bu iki madde GERİ olurdu; görevdeki "karar değil" kuralı yüzünden çelişki olarak bırakıldı.
- **Ç4 — gün 7 d5.** Görev "söyleyeceğin ilk iki cümle: adın ve isteğin" diyor. Adsız örnek ise "Hier ist Ioana Popescu." Öğrenci "benim adım Ioana mı?" diye duraksayabilir. Sahne Ioana'nın telefonu olduğu için model olarak anlaşılıyor; yine de görevdeki "adın" ile örnekteki başkasının adı birbirine uymuyor.
- **Ç5 — gün 7.** Prova başlığı "İlk telefon: kendini tanıt, randevu iste", durumu "Kendini tanıt ve randevu iste." Seçeneklerin geri bildirimi "Telefonda önce adını söyledin." ve "Adını ve isteğini tek seferde söyledin." Yanlış seçeneğin geri bildirimi: "Önce selam ver ve adını söyle." Kapanış "Kendini tanıttın…". Adsız cevaplarda ad yok. c1 ve s11 (`gun_sinavi.maddeler[10]`) yönergeleri de "Adını … söyle" diyor. Bu iki maddede adsız kısmın çevirisi listede var.
- **Ç6 — diyaloglar.** r0-07'de Frau Brandl "Adınız ne?" diye soruyor, cevap "Evet, buraya yeni geldim." r0-11'de Tobi "Senin adın ne?" diye soruyor, cevap "Burada yeniyim." r0-10'da memur adı soruyor, "Adım kolay değil." deniyor, ad hiç söylenmeden heceleme başlıyor. Satırlar kendi başına açık, ama soru cevapsız kalıyor.

## 1. tur sonrası (İçerik Motoru)

- `r0-10 teach[1].exp.ne_zaman_tr` → „Formda ön adın sorulunca söylenir.“; `teach[2].exp.ne_zaman_tr` → „Muayenehanede soyadın sorulunca söylenir.“ (kart artık cevap cümlesi; açıklama cevabı ne zaman söyleyeceğini anlatıyor).
- Gün 7 d5 (Ç): `ornek_de_adsiz` „Hier ist Ioana Popescu. …“ → „Guten Tag. Ich möchte einen Termin machen. Ist Dr. Weber am Montag da?“ (öğrenci başkasının adını kendi adı gibi görmüyor; `zorunlu` „ist“, „einen Termin“ karşılanıyor; sözcüklerin hepsi 1.–7. günde öğretildi). Yönergedeki „adın“ çelişkisi Ç listesinde ANA'ya gidiyor.
