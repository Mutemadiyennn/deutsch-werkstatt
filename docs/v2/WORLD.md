# WORLD — Wendlfing: dünya, karakterler, hikâye, takvim

Kaynak: FAZ H4 §2–§3 (`phases/10-H4.md`), LS-5.6, LS-13.4, LS-17.0. Makinece okunur sürüm: `content/v2/world/world.json` (bu dosyayla aynı içerik; ikisi birlikte güncellenir). Durum: **incelendi** (dilbilimci, 2026-11-17; rapor: `docs/v2/reviews/world.md`).

## 1. Şehir

**Wendlfing an der Vils**: Vils ırmağı kıyısında, yaklaşık 18.000 kişilik kurgusal bir şehir. Gerçek bölge kültürü (Dult, Maibaum, Starkbierzeit, Weihnachtsmarkt), kurgusal kişiler ve mekânlar. Öğrenci karakteri adsızdır ("sen"): şehre yeni gelmiş, Brunnenviertel mahallesinde bir apartmanda oturan ve şehirde bir şirkette çalışan biri.

| Mekân | Almanca | Alan | Ne |
|---|---|---|---|
| `pl:praxis` | Hausarztpraxis Dr. Weber | arzt | aile hekimi muayenehanesi (senin hekimin) |
| `pl:apotheke` | Vils-Apotheke | arzt | eczane |
| `pl:baeckerei` | Bäckerei Stadler | essen | fırın (Brunnenviertel'in köşesi) |
| `pl:firma` | Firma Kerschbaum | arbeit | iş yeri: orta büyüklükte bir şirket (işin içerikte genel kalır; ayrıntıyı "Benim cümlelerim"de sen eklersin) |
| `pl:haus` | Mietshaus Brunnengasse 7 | wohnen | oturduğun apartman |
| `pl:buergerbuero` | Bürgerbüro im Rathaus | amt | belediyedeki vatandaş bürosu |
| `pl:friseur` | Salon Haarwerk | friseur | berber/kuaför |
| `pl:fitness` | Fitnessstudio VilsFit | sport | spor salonu |
| `pl:sprachkurs` | Sprachkurs (Abendkurs) | smalltalk | akşam dil kursu (adı geçmez) |
| `pl:marktplatz` | Stadtplatz | freizeit | şehir meydanı: Weihnachtsmarkt, Maibaum, Dult burada |
| `pl:bahnhof` | Bahnhof Wendlfing | verkehr | tren istasyonu ve otobüs durağı |

Şehir haritası (LS-13.4): her mekân ilgili alan ustalaştıkça ışıklanır.

## 2. Öğrenci karakteri
Adsız: "sen". Şehre yeni gelmiş; Brunnenviertel'de oturuyor, Firma Kerschbaum'da çalışıyor (işin içeriği genel kalır; öğrenci kendi işini "Benim cümlelerim"e ekler). Öğrencinin satırlarında ad ve cinsiyet yer tutucuyla: `{name}`, `{Herr|Frau}` (D-061).

## 3. Kalıcı karakterler (12)

**İçerik kuralı (İÇ 7013446061):** karakterlere WORLD'de olmayan akraba, geçmiş ya da olay eklenmez; cümle gerektiriyorsa adsız kişi kullanılır ("eine Freundin", "ein Kollege"). Yeni ayrıntı önce burada tanımlanır.

Konuşma tarzı: hd / alltag / bair yüzdesi ve hız. Sık ifadeler örnektir; Bairisch olanlar yalnızca kaynaklıysa kullanılır (§5; kaynak URL'leri karakter notlarında ve §5 tablosunda).

### Rosa Brandl · 79 · alt kattaki komşu
- Kimlik: `ch:brandl` · alanlar: smalltalk, wohnen, bairisch
- Kişilik: sıcak, meraklı, inatçı, gizli bir yalnızlığı var
- Seninle ilişkisi: Seni ilk gün merdivende yakalar; meraklı, sıcak, biraz geveze. Plätzchen getirir, her şeyi sorar, her şeyi bilir.
- Konuşma: Hochdeutsch %25 · Alltag %40 · Bairisch %35 · hız: natural
- Sık ifadeler: „Grüß Gott!“ · „…, gell?“ · „Ja mei.“ · „Kommen S' rein!“
- Ayrıntı (İÇ 7013446061, M1 cümleleri): doğum günü 2 Mayıs. Akrabaları WORLD'de tanımlı değil; içerikte adlı akraba eklenmez.
- Not: Bairisch yalnızca kaynaklı ifadelerle (WORLD §5). Kaynaklı: 'Grüß Gott' ve '…, gell?' (https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich); 'Ja mei' (iç çekme ya da vurguya göre umursamazlık: 'ne yapalım, öyle işte') (https://www.muenchenwiki.de/wiki/Bairisch-Lexikon_J · https://muenchen.mitvergnuegen.com/2016/21-bayrische-redensarten-die-du-als-muenchner-kennen-solltest/). 'Kommen S' rein!' Bairisch değil, Alltag katmanında güney Almancası kısaltmasıdır (Sie → fiile eklenen S') (https://gfds.de/wp-content/uploads/2020/09/20-09-02-Duzen-und-Siezen-Passauer-Neue-Presse.pdf).

### Dr. Thomas Weber · 58 · aile hekimin (Hausarzt)
- Kimlik: `ch:weber` · alanlar: arzt
- Kişilik: sakin, dikkatli, kuru bir mizahı var
- Seninle ilişkisi: Senin hekimin. Sakin, açık konuşur; yavaşlamanı isteyince hemen yavaşlar.
- Konuşma: Hochdeutsch %80 · Alltag %20 · Bairisch %0 · hız: normal
- Sık ifadeler: „Was führt Sie zu mir?“ · „Seit wann haben Sie das?“ · „Machen Sie sich mal frei.“ · „Kommen Sie in einer Woche wieder.“

### Sabine Huber · 52 · Dr. Weber'in muayenehane sekreteri
- Kimlik: `ch:huber` · alanlar: telefon, arzt
- Kişilik: hızlı, pratik, yoğun, aslında yardımsever
- Seninle ilişkisi: Telefonda ilk duyduğun ses. Hızlı konuşur, çok yoğundur ama iyi niyetlidir; onu anladığın gün telefon korkun kırılır.
- Konuşma: Hochdeutsch %40 · Alltag %50 · Bairisch %10 · hız: fast
- Sık ifadeler: „Praxis Dr. Weber, Huber, grüß Gott?“ · „Moment, ich schau mal.“ · „Passt's Ihnen am Dienstag?“ · „Geht klar.“
- Ayrıntı (İÇ 7013446061, M1 cümleleri): doğum günü Haziran'da (gün belirtilmez).
- Not: 'grüß Gott' kaynaklı (https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich); 'Passt's Ihnen …?' Alltag katmanında güney Almancası kısaltmasıdır.

### Tobias „Tobi“ Lechner · 31 · iş arkadaşı
- Kimlik: `ch:lechner` · alanlar: arbeit, smalltalk, freizeit
- Kişilik: şakacı, hızlı, sabırsız ama iyi kalpli
- Seninle ilişkisi: İlk gün 'du' der. Hızlı konuşur, şaka yapar, ironi yapar; molada sohbetin motorudur. Hafta sonu futbol ve dağ.
- Konuşma: Hochdeutsch %10 · Alltag %70 · Bairisch %20 · hız: fast
- Sık ifadeler: „Mahlzeit!“ · „Echt jetzt?“ · „Passt scho.“ · „Schönes Wochenende!“
- Not: 'Passt scho' kaynaklı: 'tamam, sorun yok, böyle iyi' anlamında yaygın Bavyera sözü (https://www.fes.de/fes-in-bayern/angebote-ausstellungen/ausstellung-passt-scho); ağız yazımıyla 'Basst scho', onay bildirir (https://www.abendzeitung-muenchen.de/bayern/gepflegtes-bairisch-vor-allem-fuer-zuagroaste-art-859070). Yazımda 'Passt scho' kullanılır.

### Derya Aksoy · 36 · iş arkadaşı, ekipte en deneyimli
- Kimlik: `ch:aksoy` · alanlar: arbeit, smalltalk, strategie
- Kişilik: sakin, net, sabırlı, kararlı
- Seninle ilişkisi: Burada doğup büyümüş. Türkçe bildiğini sonradan öğrenirsin, ama seninle hep Almanca konuşur: 'Auf Deutsch, du schaffst das.' Zor günlerde yanındadır.
- Konuşma: Hochdeutsch %30 · Alltag %60 · Bairisch %10 · hız: natural
- Sık ifadeler: „Alles klar?“ · „Kein Problem.“ · „Sag's einfach auf Deutsch.“ · „Wie war dein Wochenende?“
- Ayrıntı (İÇ 7013446061, M1 cümleleri): doğum günü 10 Şubat.

### Stefan Wimmer · 49 · şefin
- Kimlik: `ch:wimmer` · alanlar: arbeit
- Kişilik: kibar, yoğun, düzenli
- Seninle ilişkisi: Kibar ama hep acelesi var. 'Sie' der; toplantıları kısa ve hızlıdır. Netlik ister; anlamadığını söylediğinde saygı duyar.
- Konuşma: Hochdeutsch %75 · Alltag %25 · Bairisch %0 · hız: fast
- Sık ifadeler: „Haben Sie kurz Zeit?“ · „Bis wann schaffen Sie das?“ · „Danke, das passt so.“ · „Melden Sie sich, wenn was ist.“
- Ayrıntı (İÇ 7013446061, M1 cümleleri): eşi eczanede çalışır; ikinci katta oturur.

### Gerti Stadler · 61 · fırıncı (Bäckerei Stadler)
- Kimlik: `ch:stadler` · alanlar: essen, einkaufen
- Kişilik: güler yüzlü, hızlı, müşterisini tanır
- Seninle ilişkisi: Her sabah aynı soru. Bir gün siparişini ondan önce sen söylersin; o gün sana bir Breze ikram eder.
- Konuşma: Hochdeutsch %35 · Alltag %45 · Bairisch %20 · hız: natural
- Sık ifadeler: „Grüß Gott, was darf's sein?“ · „Sonst noch was?“ · „Mit Karte oder bar?“ · „Schönen Tag noch!“
- Not: 'Grüß Gott' kaynaklı (https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich). Başka Bairisch ifade yalnızca kaynakla eklenir (WORLD §5).

### Luka Petrović · 40 · kuaför (Salon Haarwerk)
- Kimlik: `ch:petrovic` · alanlar: friseur, smalltalk
- Kişilik: geveze, sıcak, esprili
- Seninle ilişkisi: Kendisi de yıllar önce Almanya'ya gelmiş; ilk zamanlarını anlatır, futbol ve tatil konuşur. Sohbete katılmanın en güvenli yeri onun koltuğu.
- Konuşma: Hochdeutsch %30 · Alltag %70 · Bairisch %0 · hız: natural
- Sık ifadeler: „Wie immer?“ · „Nur ein bisschen kürzer?“ · „Und, wie läuft's?“ · „Ich war auch mal neu hier.“
- Ayrıntı (İÇ 7013446061, M1 cümleleri): doğum günü 11 Kasım.

### Sebastian „Basti“ Kraus · 27 · spor salonunun müdavimi
- Kimlik: `ch:kraus` · alanlar: sport, smalltalk
- Kişilik: enerjik, yardımsever, biraz gösterişçi
- Seninle ilişkisi: Set aralarında konuşur, makineyi kullanıp kullanmadığını sorar, antrenman önerir. Kısa ve hızlı cümleler.
- Konuşma: Hochdeutsch %20 · Alltag %70 · Bairisch %10 · hız: fast
- Sık ifadeler: „Bist du hier noch dran?“ · „Wie viele Sätze noch?“ · „Geht's?“ · „Ich zeig's dir.“
- Ayrıntı (İÇ 7013446061, M1 cümleleri): doğum günü 4 Ekim.

### Josef Pichler · 66 · Hausmeister (apartman görevlisi)
- Kimlik: `ch:pichler` · alanlar: wohnen, bairisch
- Kişilik: titiz, homurdanan, aslında güvenilir
- Seninle ilişkisi: Çöp ayırma, merdiven temizliği, sessizlik saatleri… Kurallara çok düşkün, homurdanır; ama kaloriferin bozulduğu gece ilk o gelir.
- Konuşma: Hochdeutsch %25 · Alltag %50 · Bairisch %25 · hız: natural
- Sık ifadeler: „Grüß Gott!“ · „Das geht so nicht.“ · „Der Biomüll kommt da rein.“ · „Ich schau's mir an.“
- Not: 'Grüß Gott' kaynaklı (https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich). 'Des geht so ned' cümlesinin kendisi için güvenilir kaynak bulunamadı; Alltag 'Das geht so nicht.' ile değiştirildi (dilbilimci, 2026-11-17). Yalnızca tek tek sözcükler kaynaklıdır: 'des' (= das) ve 'ned' (= nicht), ör. 'Des is gor koa Problem ned!' (https://www.dialekte.schule.bayern.de/fileadmin/user_upload/dialekte/Aufgaben/Wie_Sie_Bairisch_sprechen.pdf); yeni Bairisch cümle bunlardan türetilmez, kaynaklı tam ifade bulunursa eklenir.

### Anja Schneider · 44 · Bürgerbüro memuru
- Kimlik: `ch:schneider` · alanlar: amt
- Kişilik: resmî, düzenli, tarafsız
- Seninle ilişkisi: Resmî, kesin, yavaş ve açık konuşur. Belge eksikse eksiktir. Ama doğru soruyu sorduğunda yolu kısaltır.
- Konuşma: Hochdeutsch %95 · Alltag %5 · Bairisch %0 · hız: slow
- Sık ifadeler: „Ziehen Sie bitte eine Nummer.“ · „Haben Sie einen Termin?“ · „Ich bräuchte noch Ihren Pass.“ · „Füllen Sie bitte dieses Formular aus.“

### Ioana Popescu · 34 · kurstan arkadaşın
- Kimlik: `ch:popescu` · alanlar: smalltalk, strategie, freizeit
- Kişilik: cesur, komik, çabuk vazgeçer ama hemen geri döner
- Seninle ilişkisi: O da A2. Birlikte pratik yaparsınız; ikiniz de yanlış yaparsınız ve gülersiniz. İngilizceye kaçmamak için anlaşmanız var: 'Nur Deutsch!'
- Konuşma: Hochdeutsch %70 · Alltag %30 · Bairisch %0 · hız: slow
- Sık ifadeler: „Wie sagt man …?“ · „Nur Deutsch!“ · „Ich verstehe nur Bahnhof.“ · „Wollen wir zusammen üben?“

## 4. 26 haftalık ana hikâye

Başlangıç: 23.11.2026 haftası. Her hafta bir bölüm (dinleme bölümü + sesli drama, LS-5.6). Her bölüm bir ya da daha fazla alanın senaryosuna bağlanır ve bir gerçek görev önerir. Öğrenci başka bir tarihte başlarsa takvime bağlı bölümler (Advent, Silvester, Fasching, Starkbierzeit, Ostern, Maibaum, Dult, Pfingsten) gerçek tarihe göre yer değiştirir; boşluklar yedek bölümlerle (r1–r4) doldurulur.

| Hafta | Tarih | Bölüm | Karakterler | Alanlar | Gerçek görev | Takvim |
|---|---|---|---|---|---|---|
| 1 | 2026-11-23 | **Ankommen** (Yeni şehir): Taşınma kutuları, merdivende Frau Brandl'ın soruları, ilk sabah fırında 'Grüß Gott, was darf's sein?'. İlk iş günü Tobi 'du' der; Herr Wimmer 'Sie'. | Rosa, Gerti, Tobias, Stefan | strategie, essen, arbeit | Fırında 'Ich hätte gern…' ile sipariş ver. | — |
| 2 | 2026-11-30 | **Der erste Advent** (İlk Advent): Stadtplatz'ta Weihnachtsmarkt açılır. Tobi ve Derya iş çıkışı Glühwein'e çağırır; fiyat sorma, Pfand (depozito) sürprizi. Frau Brandl kapına Plätzchen bırakır. | Tobias, Derya, Rosa | freizeit, essen, smalltalk | Bir stantta bir şey sipariş edip fiyatını sor. | Advent / Weihnachtsmarkt (1. Advent 29.11.2026) |
| 3 | 2026-12-07 | **Der Anruf** (Telefon): Boğazın ağrıyor. Dr. Weber'i aramak zorundasın; Frau Huber çok hızlı konuşur. 'Etwas langsamer, bitte' cümlesi ilk kez gerçekten işe yarar. | Sabine, Dr. Weber | telefon, arzt, strategie | Bir dükkânı arayıp yalnızca açılış saatini sor. | — |
| 4 | 2026-12-14 | **Die Weihnachtsfeier** (İş yerinin Noel kutlaması): Herr Wimmer'in kısa konuşması, Wichteln (hediye çekilişi), Tobi'nin şakaları. Biri sana bir şey soruyor ve sen ilk kez sohbete katılıyorsun. | Stefan, Tobias, Derya | arbeit, smalltalk | Molada birine 'Und, was machst du an Weihnachten?' diye sor. | Weihnachtsfeier (Aralık) |
| 5 | 2026-12-21 | **Stille Tage** (Sessiz günler): Şehir boşalır, dükkânların tatil saatleri değişir. Frau Brandl seni Heiligabend'de kahveye çağırır; aile fotoğrafları, eski Wendlfing hikâyeleri. | Rosa | smalltalk, einkaufen | Bir dükkânın tatil açılış saatlerini oku ya da sor. | Weihnachten: Heiligabend 24.12. (resmî tatil değil; dükkânlar erken kapanır) · 25.–26.12. resmî tatil |
| 6 | 2026-12-28 | **Silvester** (Yılbaşı gecesi): Tobi'nin evinde Silvester. Bleigießen yerine Wachsgießen, havai fişekler, 'Guten Rutsch!'. Herkes bir 'Vorsatz' (yeni yıl kararı) söyler; sen de söylersin. | Tobias, Derya, Ioana | freizeit, smalltalk | Birine 'Guten Rutsch!' de ve yeni yıl kararını Almanca söyle. | Silvester (31.12.) |
| 7 | 2027-01-04 | **Die Heizung** (Kalorifer bozuldu): Ocak soğuğu, kalorifer çalışmıyor. Herr Pichler'i aramak, sorunu anlatmak, 'Wann kommt jemand?' Pichler homurdanarak ama hemen gelir. | Josef | wohnen, telefon | Bir sorunu telefonda ya da yüz yüze tarif et (simülasyonla prova). | Heilige Drei Könige (6.1., Bavyera'da tatil) |
| 8 | 2027-01-11 | **Frau Brandl braucht Hilfe** (Komşunun derdi): Frau Brandl düşer, eczaneden ilacını alıp getirmeni ister. Eczanede reçeteli/reçetesiz ilaç, Zuzahlung (katkı payı) sorusu. | Rosa, Dr. Weber | arzt, notfall | Eczanede bir şey sor ya da al. | — |
| 9 | 2027-01-18 | **Neu im Studio** (Spor salonunda ilk gün): VilsFit'e üye olursun; sözleşme, deneme antrenmanı, Basti'nin 'Bist du hier noch dran?' sorusu. | Sebastian | sport, smalltalk | Spor salonunda birine bir makineyi kullanıp kullanmadığını sor. | — |
| 10 | 2027-01-25 | **Die Meldebescheinigung** (Bürgerbüro): Banka hesabı için bir Meldebescheinigung (ikamet belgesi) gerekiyor. Bürgerbüro: randevu ya da numara çekmek, eksik belge, Frau Schneider'in kesin ama yardımsever yanıtları. | Anja | amt | Bir resmî kurumdan randevu almayı ya da gereken belgeleri sormayı dene. | — |
| 11 | 2027-02-01 | **Unsinniger Donnerstag** (Fasching'in en hareketli günleri): Ofiste kostümlü sabah, Derya'nın getirdiği Krapfen, Herr Wimmer'in beklenmedik kostümü. Tobi seni Faschingszug'a çağırır. | Derya, Tobias | arbeit, freizeit | Molada birine kostüm ya da Fasching planını sor. | Fasching: Unsinniger Donnerstag 4.2.2027 · Rosenmontag 8.2.2027 · Aschermittwoch 10.2.2027 |
| 12 | 2027-02-08 | **Beim Friseur** (Kuaförde): Luka sana nasıl kesileceğini sorar; sen anlatırsın. Sohbet futbola, tatile, Luka'nın ilk Almanya yıllarına döner. | Luka | friseur, smalltalk | Kuaförde ya da bir dükkânda ne istediğini tarif et. | — |
| 13 | 2027-02-15 | **Die Präsentation** (Toplantı): Herr Wimmer senden kısa bir durum özeti ister. Hazırlık, 'Habe ich Sie richtig verstanden?', toplantıda araya girme. | Stefan, Derya | arbeit, strategie | Toplantıda ya da derste bir soru sor veya anladığını doğrula. | — |
| 14 | 2027-02-22 | **Tobi zieht um** (Tobi taşınıyor): Tobi başka şehre taşınıyor. Taşınma yardımı, kutular, veda yemeği, 'Wir bleiben in Kontakt!'. | Tobias, Derya | arbeit, smalltalk, wohnen | Birine geçen hafta sonunu anlat. | — |
| 15 | 2027-03-01 | **Krank gemeldet** (Hasta bildirimi): Ateşin var. Sabah işe haber vermek, muayenehaneyi aramak, Krankschreibung (iş göremezlik raporu). | Sabine, Dr. Weber, Stefan | arzt, arbeit, telefon | Bir randevuyu ertele ya da iptal et (gerçekte ya da simülasyonda). | — |
| 16 | 2027-03-08 | **Starkbierzeit** (Güçlü bira mevsimi): Fasching'den sonra Fastenzeit; Wendlfing'de de Starkbierfest. Derya geleneği anlatır; sen alkolsüz seçeneği sormayı öğrenirsin. | Derya, Gerti | freizeit, essen, bairisch | Bir lokantada ya da kafede ne istediğini ve neyi istemediğini söyle. | Starkbierzeit (Fastenzeit, genellikle Mart) |
| 17 | 2027-03-15 | **Das Paket** (Kurye): Evde değilken paketin komşuya bırakılmış: Frau Brandl'da. Kuryeyle telefon, 'Abholstation', komşunun uzun hikâyesi. | Rosa | post, telefon | Bir paket ya da teslimat hakkında soru sor. | — |
| 18 | 2027-03-22 | **Ostern** (Paskalya): Uzun hafta sonu. Ioana ile Osterspaziergang, Frau Brandl'ın boyalı yumurtaları; tatilde ne yaptığını anlatma. | Ioana, Rosa | freizeit, smalltalk | Hafta sonunu 60 saniye anlat (kayıt). | Ostern 28.3.2027 (Karfreitag 26.3., Ostermontag 29.3.) |
| 19 | 2027-03-29 | **Die Werkstatt** (Araba tamirde): Arabadan garip bir ses geliyor. Tamirhanede sorunu tarif etmek, 'Wie lange dauert das?', 'Was kostet das ungefähr?'. | Derya | werkstatt, verkehr | Bir hizmet için fiyat ve süre sor. | — |
| 20 | 2027-04-05 | **Der Brief vom Amt** (Resmî mektup): Anlamadığın bir mektup. Derya'ya göstermek yerine önce kendin çözmeyi denersin; sonra Bürgerbüro'yu ararsın. | Anja, Derya | amt, telefon, strategie | Resmî bir mektup ya da formdaki bir kelimeyi sor. | — |
| 21 | 2027-04-12 | **Grillen** (İlk mangal): Bahar. Derya'nın bahçesinde Grillen; herkes bir şey getirir. 'Was soll ich mitbringen?' | Derya, Ioana, Sebastian | freizeit, smalltalk, essen | Bir davete cevap ver ve ne getireceğini sor. | — |
| 22 | 2027-04-19 | **Der Maibaum** (Mayıs ağacı): Stadtplatz'ta Maibaum dikilir; bir gece önce 'çalınma' korkusu, Pichler'in eski hikâyeleri, bando. | Josef, Rosa, Gerti | freizeit, bairisch | Bir etkinlikte yanındakine bir soru sor. | 1. Mai: Maibaum (bir gece önce, Walpurgisnacht'ta 'Maibaumstehlen' geleneği; kurallar yöreye göre değişir) |
| 23 | 2027-04-26 | **Die Dult** (Dult): İlkbahar Dult'u (Maidult): lunapark, çadır, Steckerlfisch. Kalabalıkta hızlı Bairisch; anladığın her cümle bir zafer. | Sebastian, Derya, Luka | freizeit, bairisch, essen | Bir stantta sipariş verip sohbet başlat. | Maidult (Nisan sonu – Mayıs; bölgede yaygın Dult geleneği) |
| 24 | 2027-05-03 | **Sechs Monate** (Altı ay): Frau Brandl ilk günü hatırlatır: 'Am Anfang haben Sie nur genickt!' Altı ay önceki 60 saniyelik kaydını bugünkü kaydınla dinlersin. | Rosa, Derya, Ioana | smalltalk, gefuehle | Aynı 60 sn 'kendini anlat' kaydını tekrar yap. | — |
| 25 | 2027-05-10 | **Ein unerwarteter Anruf** (Habersiz arama): Telefon çalar: bilinmeyen numara. Hiç hazırlıksız bir konuşma; sonunda gülümsüyorsun. | Sabine | telefon, strategie | Gelen bir aramaya cevap ver (kademe 3 simülasyon ya da gerçek). | — |
| 26 | 2027-05-17 | **Pfingsten** (Pfingsten tatili ve yeni plan): Pfingsten tatili, B1 planı başlar. Tobi'den sesli mesaj: 'Und, wie läuft's bei euch?' Ona Almanca cevap verirsin. | Tobias, Derya, Ioana | freizeit, smalltalk | Birine sesli mesajla haber ver. | Pfingsten 16.5.2027 (Pfingstmontag 17.5. resmî tatil) |

**Yedek bölümler:** r1 Der Nachbar von oben (Üst kattaki gürültü) · r2 Bahn fällt aus (Tren iptal) · r3 Die neue Kollegin (Yeni iş arkadaşı) · r4 Bankkonto (Banka hesabı; Derya yardım eder)

### Süreklilik iplikleri
- **Frau Brandl'ın yalnızlığı** (hafta 1, 2, 5, 8, 17, 18, 24): yaşlı komşuyla ilişki güvenle büyür; 24. haftada altı ay önceki sen ile bugünkü sen karşılaştırılır.
- **Telefon korkusu** (3, 7, 15, 17, 20, 25): Frau Huber'in hızlı sesinden habersiz aramaya; LS-11.2 merdiveniyle paralel.
- **İş yeri** (1, 4, 11, 13, 14, 15, 26): Sie'den du'ya geçiş, toplantıda söz almak, Tobi'nin taşınması ve sesli mesajı.
- **Mizah ve sinir bozucu anlar:** Pfand sürprizi (2), Wimmer'in kostümü (11), Pichler'in çöp kuralları (7), anlaşılmayan Amt mektubu (20), kalabalıkta hızlı Bairisch (23).

## 5. Bairisch kuralı
Bairisch konuşan karakterler (Brandl, Pichler, Stadler; daha az Lechner, Huber) **yalnızca kaynaklı** ifadeler kullanır. Dilbilimci incelemesi: 2026-11-17 (`docs/v2/reviews/world.md`).

| İfade | Katman | Durum | Kaynak |
|---|---|---|---|
| „Grüß Gott“ | Bairisch / güney Almancası selam | kaynaklı | https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich |
| „…, gell?“ | Bairisch | kaynaklı (soru sonunda "değil mi?") | https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich |
| „Servus“ | Bairisch | kaynaklı (samimi selam ve vedalaşma; yalnızca 'du' ilişkisinde) | https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich |
| „Ja mei“ | Bairisch | kaynaklı (iç çekme ya da umursamazlık: "ne yapalım") | https://www.muenchenwiki.de/wiki/Bairisch-Lexikon_J · https://muenchen.mitvergnuegen.com/2016/21-bayrische-redensarten-die-du-als-muenchner-kennen-solltest/ |
| „Passt scho“ | Bairisch | kaynaklı ("tamam, sorun yok"; ağız yazımı „Basst scho“) | https://www.fes.de/fes-in-bayern/angebote-ausstellungen/ausstellung-passt-scho · https://www.abendzeitung-muenchen.de/bayern/gepflegtes-bairisch-vor-allem-fuer-zuagroaste-art-859070 |
| „Kommen S' rein“ | Alltag (güney Almancası kısaltması) | kaynaklı: 'Sie' tek sese inip fiile eklenir | https://gfds.de/wp-content/uploads/2020/09/20-09-02-Duzen-und-Siezen-Passauer-Neue-Presse.pdf |
| „Des geht so ned“ | — | **çıkarıldı**: tam ifade için kaynak yok → Alltag „Das geht so nicht.“ | sözcük düzeyinde 'des', 'ned': https://www.dialekte.schule.bayern.de/fileadmin/user_upload/dialekte/Aufgaben/Wie_Sie_Bairisch_sprechen.pdf |

Doğrulanamayan ifade yerine Alltag biçimi kullanılır; kaynaklı sözcüklerden yeni Bairisch cümle türetilmez. Güney Almancası gündelik biçimler (heut, daheim, Kommen S', Passt's) Bairisch değil Alltag katmanında sayılır.

## 6. Gerçek takvim (planlayıcı bugünün tarihine göre öne çıkarır)

| Olay | Ne zaman | Ne | İçerik | Kaynak |
|---|---|---|---|---|
| `cal:advent` | 1. Advent 29.11.2026 · 4 Advent pazarı | Advent: Noel'e kadar dört pazar; Adventskranz (mum çelengi). | Weihnachtsmarkt, Glühwein, Plätzchen | takvim hesabı: 1. Advent, 25.12.'den önceki dördüncü pazar; 25.12.2026 cuma (https://www.muenchen.de/aktuell/feiertage-bayern-2026-und-2027) → 29.11.2026 |
| `cal:weihnachtsmarkt` | Kasım'ın son haftası – 23.12 civarı | Weihnachtsmarkt: meydanda stantlar, Glühwein, Bratwurst, el işi. Bardakta Pfand (depozito) yaygındır. | fiyat sorma, sipariş, Pfand | LS-17.0 (açılış genelde Kasım'ın son haftası) |
| `cal:weihnachtsfeier` | Aralık | İş yerinin yıl sonu kutlaması (Weihnachtsfeier), çoğu yerde Wichteln. | davet, small talk, Sie/du | genel iş yeri kültürü |
| `cal:silvester` | 31.12. | Silvester: 'Guten Rutsch!' (yeni yıla iyi geçiş dileği), havai fişek, Vorsätze. Kurşun dökme (Bleigießen) 2018'de yasaklandı; yerine Wachsgießen (mum dökme). | Guten Rutsch, Vorsatz | Silvester resmî tatil değil: https://www.muenchen.de/aktuell/feiertage-bayern-2026-und-2027 · Wachsgießen: https://utopia.de/ratgeber/wachsgiessen-statt-bleigiessen-silvester-bleifrei-feiern/ |
| `cal:dreikoenig` | 6.1. (2027: çarşamba) | Heilige Drei Könige: Bavyera'da resmî tatil; dükkânlar kapalı. | tatil açılış saatleri | https://www.muenchen.de/aktuell/feiertage-bayern-2026-und-2027 |
| `cal:fasching` | Unsinniger Donnerstag 4.2.2027 · Rosenmontag 8.2.2027 · Faschingsdienstag 9.2.2027 · Aschermittwoch 10.2.2027 | Fasching: kostümler, Krapfen, alaylar (Faschingszug). En hareketli günler Unsinniger Donnerstag'dan (Aschermittwoch'tan önceki perşembe) Faschingsdienstag'a kadar; Aschermittwoch'ta biter ve Fastenzeit başlar. Bu günler resmî tatil değildir; bazı iş yerlerinde ve okullarda kostümle gelinir. | Kostüm, Krapfen, Faschingszug | takvim hesabı: Paskalya 28.3.2027 → Aschermittwoch 46 gün önce = 10.2.2027 · günlerin sırası ve anlamı: https://secretmuenchen.com/fasching-in-muenchen/ |
| `cal:starkbier` | Fastenzeit (10.2.–27.3.2027), festler çoğunlukla Mart | Starkbierzeit: Fasching'den sonra, Fastenzeit'ta güçlü bira (Starkbier) festleri; Münih'te 'beşinci mevsim' diye anılır, festler Mart'ta (kimi yerde Şubat sonundan itibaren) yapılır. | Starkbierfest, alkolsüz seçenek sormak | https://www.muenchen.travel/artikel/maerkte-feste/muenchen-starkbierzeit |
| `cal:ostern` | Karfreitag 26.3. · Ostern 28.3. · Ostermontag 29.3.2027 | Paskalya: uzun hafta sonu, Osterspaziergang, boyalı yumurtalar. | hafta sonu anlatmak | takvim hesabı (Paskalya 28.3.2027) · resmî tatiller Karfreitag ve Ostermontag: https://www.muenchen.de/aktuell/feiertage-bayern-2026-und-2027 |
| `cal:maibaum` | 1. Mai (2027: cumartesi, resmî tatil) | Maibaum: 1 Mayıs'ta köy/şehir meydanına süslü ağaç dikilir (her yerde her yıl değil; ağaç birkaç yıl yerinde kalabilir). Bir gece önce (Walpurgisnacht) komşu köyün ağacını 'çalma' geleneği (Maibaumstehlen) vardır; fidye çoğunlukla bira ve Brotzeit ile ödenir. Kurallar yöreye göre değişir. | etkinlikte sohbet | https://www.muenchenwiki.de/wiki/Maibaum · https://www.t-online.de/leben/familie/feiertage/id_62949864/1-mai-diese-traditionen-gibt-es-rund-um-den-maibaum.html |
| `cal:dult` | İlkbahar (Nisan–Mayıs) ve yaz sonu / sonbahar | Dult: Bavyera'da panayır ve halk şenliği (Volksfest): bira çadırı, lunapark, satış stantları. Aşağı Bavyera şehirlerinde çoğunlukla yılda iki kez (ör. Landshut: Frühjahrsdult Nisan'da, Bartlmädult Ağustos sonunda; Passau: Maidult Nisan sonu – Mayıs, Herbstdult). | sipariş, kalabalıkta anlamak | https://www.festivalsindeutschland.de/festival/landshuter-fruehjahrsdult · https://www.festivalsindeutschland.de/festival/passauer-maidult |
| `cal:pfingsten` | Pfingstsonntag 16.5.2027 · Pfingstmontag 17.5.2027 | Pfingsten: Paskalya'dan 49 gün sonra; Pfingstmontag resmî tatil, uzun hafta sonu. | hafta sonu anlatmak, tatil planı | takvim hesabı (Paskalya 28.3.2027) · https://www.muenchen.de/aktuell/feiertage-bayern-2026-und-2027 |
| `cal:biergarten` | Yaz | Biergarten ve Volksfest mevsimi. | sipariş, small talk | genel |
| `cal:bundesliga` | Her hafta sonu (sezon içinde) | Pazartesi molası: 'Hast du das Spiel gesehen?' Hafta sonu sohbeti. | hafta sonu, futbol | genel |

İlk iş (LS-17.0): Advent ve Weihnachtsmarkt mini senaryoları, 27.11.2026'ya kadar yayında. Mevsim içerikleri ilgili tarihten en az 1 hafta önce yayında olur (LS-17.1).

## 7. Bağlantılar
- Telefon ve doktor senaryolarında **senin aile hekimin Dr. Weber'in muayenehanesi** ve sekreteri **Sabine Huber** kalıcıdır; başka muayenehaneler yalnızca çeşitlilik için (PM P2).
- Mola sohbetleri (LS-9.3): Lechner, Aksoy, Wimmer; karakterler senin önceki günlerde söylediklerini hatırlar.
- Gelen arama simülasyonu (LS-9.2): arayanlar Huber (randevu hatırlatma), kurye (hafta 17), Lechner/Aksoy (iş), Pichler (ev).
- Gerçek konuşma öncesi/sonrası (LS-10.5) ve görev merdiveni (LS-11) hikâyedeki gerçek görevlerle aynı sırayı izler.


> BG notu (2026-11-17): dilbilimci incelemesinin kurgu bulguları uygulandı — Tobi 14. haftadan sonra yalnızca sesli mesajla (hafta 26) görünür; hafta 10 yasal süre iddiası içermez; Bairisch oranları kaynaklı dağarcık büyüyene kadar düşürüldü.
