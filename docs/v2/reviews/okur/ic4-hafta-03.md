# Okur kontrolü: İÇ-4 A1 3. hafta (OD-9.3)

Kapsam: `content/v2/m1/gun-15.json` … `gun-21.json`, `hafta-sonu-testi-03.json`, `gorulmemis-03.json` içinde öğrenciye görünen bütün açıklama alanları (`goal_tr`, `can_do.tr`, halka `kaliplar[].tr`, `ortam_tr`, `q_tr` ve Türkçe şıklar, `situation_tr`, `instr_tr`, `durum_tr`, `gorev_tr`, `kontrol_tr`, `why_tr`, `geri_bildirim_tr`, `kapanis_tr`) ve `registry/grammar.json` içindeki 17 dil noktası durağının `h_tr` ve `tr` alanları. Örneklem değil, hepsi tek tek okundu. Çeviri alanları (`tr`, `metin_tr`, seçenek `tr`) okunmadı; onlar dilbilimcide. Dikte şıkları ve boşluk doldurma şıkları Almanca olduğu için sayılmadı.

Kimlikler: `<dosya> · <öğe yolu> · <alan>`. Öğe yolunda `h1.soru` halka sorusu, `v1.b1.ana/ay0/d5` sahne bölümü, `a1`/`a2` ses kaydı, `p1.n2.s1` prova düğümü ve seçeneği (0'dan sayılır), `optN` şık sırası (0'dan), `o1…` okuma sorusu, `s1…` gün sınavı maddesidir. Sıra numarası (`15-082` gibi) aşağıdaki ekteki satırdır.

## GERİ satırları (içerik dosyaları)

| # | Öğe kimliği | Alan | Açıklama | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|
| 15-082 | `gun-15` · `m1:15:a2.b1.ay1` | `q_tr` | Kayda göre biri ne zaman açacak? | Kayıtta biri ne zaman açacak? Ofis mi açılacak, telefonu mu açacaklar, bilemedim. | GERİ | İki okuma var. **açmak** hem telefonu açmak hem ofisi açmak olabiliyor. Kayıtta ofisin pazartesi yeniden açık olduğu da geçiyor; bu okumayla **Pazartesi** şıkkı doğru görünüyor. Beklenen cevap **Birazdan** (telefonu açacaklar). |
| 17-124 | `gun-17` · `m1:17:o5` | `situation_tr` | Schneider Hanım'ı geri arıyorsun. O açıyor. Kendini tanıt ve onun seni aradığını söyle. | Kendimi tanıtıp ona beni aradığını söyleyeceğim: siz beni aradınız. | GERİ | Yönerge ekrandaki cevabı anlatmıyor. Kabul edilen cevaplar **Sie möchten einen Rückruf?**, **Es geht um meinen Ausweis**, **Danke für die Nachricht**; hiçbiri beni aradınız demiyor. Beni aradınız demeyi de bu hafta görmedim. |
| 17-137 | `gun-17` · `m1:17:s8` | `why_tr` | Telefonu kapatmak **auflegen** demektir. | auflegen telefonu kapatmak demek. | GERİ | Ekrandaki cevap **Bitte legen Sie nicht auf!**; açıklamadaki kelime orada bu biçimde yok, iki parçaya bölünmüş. Parçanın sona gittiğini söylemiyor; yalnız bu kutuya bakıp **auflegen** ile cümle kurarsam yanlış yaparım. |
| 17-143 | `gun-17` · `m1:17:s11` | `why_tr` | Önce **hier ist** ve adın. Sonra **Könnten Sie mich mit** ve kişinin adı. | Önce hier ist ve adım, sonra Könnten Sie mich mit ve Schneider Hanım. | GERİ | Açıklamaya uyunca cümle **Könnten Sie mich mit Frau Schneider?** diye yarım kalıyor. Sondaki **verbinden** açıklamada yok. |
| 18-001 | `gun-18` · `g18` | `goal_tr` | Kuaförden randevu alırken günü, saati ve ayı um, am, im ile söyler, açılış saatlerini anlarsın. | Kuaförde randevu alırken gün um, saat am, ay im ile söylenir; açılış saatlerini de anlarım. | GERİ | 15 kelime (sınır 14). Sıra tutmuyor: gün, saat, ay sayıp um, am, im yazıyor; sırayla eşleyince gün için um, saat için am çıkıyor, ikisi de yanlış. Bir cümlede iki iş var (randevu, açılış saatleri). |
| 18-102 | `gun-18` · `m1:18:p1.n5.s0` | `geri_bildirim_tr` | Güzel bir kapanış. Saati bir kez daha duydun. | Saati bir kez daha ben duydum. | GERİ | Seçenekte saati ben söylüyorum (**Danke, bis Samstag um zehn!**). Açıklama duydun diyor; yaptığım şeyi anlatmıyor. |
| 19-092 | `gun-19` · `m1:19:p1.n2.s1` | `geri_bildirim_tr` | Güzel. **wir** ile fiilde harf değişmez. | wir ile söyleyince bir şeyde harf değişmiyor. | GERİ | **fiil** dilbilgisi terimi, öğretilmedi. Neyde harf değişmediğini bu sözcük olmadan anlayamadım. |
| hst-005 | `hafta-sonu-testi-03` · `m1:21:t04` | `situation_tr` | Adresin Brunnengasse 7. Sokağı söyle ve ilk harfi bir adla netleştir. | Adresim Brunnengasse, yedinci sokak mı? Sokağı ve ilk harfi söyleyeceğim. | GERİ | **7.** ardından büyük harfli **Sokağı** gelince Türkçede yedinci sokak diye okunuyor. Bunun iki ayrı cümle olduğunu ikinci okumada anladım. |
| hst-019 | `hafta-sonu-testi-03` · `m1:21:t12` | `why_tr` | Önce **hier ist** ve adın. Sonra **Könnten Sie mich mit** ve kişinin adı. | Önce hier ist ve adım, sonra Könnten Sie mich mit ve Derya'nın adı. | GERİ | Açıklamaya uyunca cümle **Könnten Sie mich mit Derya Aksoy?** diye yarım kalıyor. Sondaki **verbinden** açıklamada yok. |
| gor-008 | `gorulmemis-03` · `m1:h03:g4` | `why_tr` | Günü duyunca tarihi **am** ve sıra sayısıyla tekrar ederek doğrularsın. | Günü duyunca tarihi am ve bir tür sayıyla tekrar ederim. | GERİ | **sıra sayısı** dilbilgisi terimi, örnek yok. Hangi biçimi söyleyeceğimi (**am fünfzehnten**) bu kutudan çıkaramadım. |

## Dil noktası durakları (`registry/grammar.json`, 17 kayıt, 34 alan)

| Öğe kimliği | Alan | Açıklama | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| `gr:a1-02:t3` | `h_tr` | Evet/hayır soruları: fiil başa gelir | Evet-hayır sorusunda bir kelime başa geçiyor. | GERİ | **fiil** terimi; **/** işareti. |
| `gr:a1-02:t3` | `tr` | Evet ya da hayır cevabı beklenen soruda soru kelimesi yoktur. Bu soruda fiil cümlenin en başına geçer. **Du hast Zeit** cümlesi soruda **Hast du Zeit?** olur. Türkçedeki mi ekinin işini burada kelime sırası yapar. Cevap çoğu zaman **Ja** ya da **Nein** ile başlar. | Soru kelimesi yoksa bir kelime başa geçer; Hast du Zeit? gibi. Cevap Ja ya da Nein ile başlar. | GERİ | **fiil** (2. cümle) ve **mi ekinin** (ek) terim. Örnek yardım ediyor ama kural cümlesi terime dayanıyor. |
| `gr:a1-12:t5` | `h_tr` | Telefonda: kendini tanıt, sorunu söyle | Telefonda önce kendimi tanıtıp derdimi söylerim. | GEÇTİ |  |
| `gr:a1-12:t5` | `tr` | Almanlar telefonda önce kendi adını söyler. Sen de **Guten Tag, hier ist** ve adınla başla. Sonra ne istediğini kısaca söyle: **Ich möchte einen Termin**. Adını sorarlarsa harf harf hecelersin. Telefonda vedalaşırken **Auf Wiederhören** dersin. | Telefonda önce adımı, sonra isteğimi söylerim. Sorarlarsa harf harf söylerim, Auf Wiederhören ile kapatırım. | GEÇTİ |  |
| `gr:a1-12:t1` | `h_tr` | Kibar rica: Könnten Sie das wiederholen? | Kibarca tekrar istemenin yolu. | GEÇTİ |  |
| `gr:a1-12:t1` | `tr` | Birinden kibarca bir şey isterken **Können Sie** yerine **Könnten Sie** dersin. **Könnten** daha yumuşak ve daha kibar duyulur. Soru **Könnten Sie** ile başlar, asıl fiil en sona gider. Örneğin **Könnten Sie das bitte wiederholen?** diye sorarsın. Aynı anlamda **Würden Sie bitte langsam sprechen?** da duyarsın. | Können Sie yerine Könnten Sie daha kibar; soru onunla başlar, bir kelime sona gider. | GERİ | **asıl fiil** terimi; sona hangi kelimenin gideceğini bu sözle bilemedim. |
| `gr:a1-05:t3` | `h_tr` | Ne zaman? um, am, in der Nacht | Ne zaman sorusuna um, am, in der Nacht ile cevap. | GEÇTİ |  |
| `gr:a1-05:t3` | `tr` | **Wann** ne zaman demektir. Saatle **um** kullanırsın: **um acht Uhr**. Günlerle ve günün bölümleriyle **am** kullanırsın: **am Montag**, **am Abend**. Gece için **in der Nacht** dersin. Gün ve saat birlikteyse önce gün gelir: **am Montag um neun**. **heute** ile **am** gelmez, **heute Abend** dersin. | Saatle um, günle am, gece in der Nacht. Önce gün sonra saat. heute ile am yok. | GEÇTİ |  |
| `gr:a1-12:t3` | `h_tr` | Zamanı söylemek: um, am, im, von, bis, ab | Zaman için altı kelime. | GEÇTİ |  |
| `gr:a1-12:t3` | `tr` | Saat için **um**, gün ve tarih için **am** dersin. Aylar ve mevsimler için **im** kullanırsın: **im Mai**, **im Winter**. Başlangıç ve bitişi **von** ve **bis** ile söylersin: **von acht bis zwölf**. Bir günden itibaren demek için **ab** dersin: **ab Montag**. | Saat um, gün am, ay im; başlangıç von, bitiş bis; bir günden itibaren ab. | GEÇTİ |  |
| `gr:a1-02:t4` | `h_tr` | sprechen: du sprichst, er spricht | sprechen sen ve o ile değişir. | GEÇTİ |  |
| `gr:a1-02:t4` | `tr` | **sprechen** konuşmak demektir. **du** ile ve **er**, **sie**, **es** ile ortadaki e harfi i olur. Yani **du sprichst** ve **er spricht** dersin. Öteki kişilerde değişmez: **ich spreche**, **wir sprechen**. Dil adları büyük harfle yazılır, önlerine **der** ya da **die** gelmez. | sprechen konuşmak; du ve er ile e harfi i olur. Ayrıca dil adları büyük harfle yazılır, önüne der/die gelmez. | GERİ | İki ayrı fikir tek kutuda: sprechen'deki harf değişimi ve dil adlarının yazılışı. |
| `gr:a1-06:t2` | `h_tr` | Ünlüsü değişen fiiller: du liest, er fährt | Bazı kelimeler du ve er ile değişiyor. | GERİ | **ünlü** ve **fiil** terim. |
| `gr:a1-06:t2` | `tr` | Bazı sık fiillerde yalnız **du** ile ve **er**, **sie**, **es** ile ortadaki ses değişir. a harfi ä olur: **fahren**, **du fährst**, **er fährt**. e harfi i olur: **essen**, **du isst**, **er isst**. e harfi ie olur: **sehen**, **du siehst**, **er sieht**. **ich**, **wir** ve **Sie** ile hiçbir şey değişmez. | Bazı kelimelerde du ve er ile ortadaki harf değişir: a ä olur, e i ya da ie olur. ich, wir, Sie ile değişmez. | GERİ | **fiillerde** terimi (1. cümle). Örnekler açık, terim olmadan da anlaşılırdı. |
| `gr:a1-12:t4` | `h_tr` | Tarih: der erste Mai, am ersten Mai | Tarih söyleme: der erste ve am ersten. | GEÇTİ |  |
| `gr:a1-12:t4` | `tr` | Tarihte sayının sıra biçimini kullanırsın: **erste**, **zweite**, **dritte**. Bugünün tarihini söylerken **Heute ist der erste Mai** dersin. Bir şeyin hangi tarihte olduğunu **am** ile söylersin: **am ersten Mai**. **am** gelince sıra sayısının sonu **en** olur. Yazıda **am 1. Mai** yazılır, **am ersten Mai** diye okunur. | Tarihte erste, zweite gibi sayılar; bugünkü tarih der ile, bir şeyin tarihi am ile ve sonu en olur. | GERİ | **sayının sıra biçimi**, **sıra sayısı** terim (gorulmemis-03 g4 ile aynı). |
| `gr:a1-04:t2` | `h_tr` | Eşyalar için er, sie, es | Eşyalar için o yerine er, sie, es. | GEÇTİ |  |
| `gr:a1-04:t2` | `tr` | Türkçede her eşya için o deriz. Almancada o, ismin önündeki kelimeye göre seçilir. **der** ile giden isim için **er**, **die** için **sie**, **das** için **es** dersin. Örneğin **der Schlüssel** için **Er ist hier** dersin. Burada **er** bir erkek değil, anahtardır. Birden çok eşya için **sie** dersin. | Eşyanın adının önünde der varsa er, die varsa sie, das varsa es; çok eşyaysa sie. | GEÇTİ | **isim** gündelik anlamıyla (eşyanın adı) okununca da doğru çıkıyor. |
| `gr:a1-04:t3` | `h_tr` | Eşya nasıl? groß, klein ve renkler | Eşyanın nasıl olduğunu söylemek. | GEÇTİ |  |
| `gr:a1-04:t3` | `tr` | **ist** ya da **sind** ile gelen sıfat hiç değişmez. **Der Tisch ist groß**, **die Küche ist groß** ve **das Bad ist groß** dersin. Renkler de böyledir: **Das Sofa ist grau** dersin. Fikrini sormak için **Wie findest du die Küche?** diye sorarsın. Cevap **Ich finde sie schön** olur. | ist ya da sind'den sonra groß gibi kelime hiç değişmez; Wie findest du ile fikir sorarım. | GERİ | **sıfat** terimi (1. cümle). |
| `gr:a1-04:t4` | `h_tr` | sehr, ziemlich, zu ve nicht | Dört kelime: çok, oldukça, fazla, değil. | GEÇTİ |  |
| `gr:a1-04:t4` | `tr` | **sehr** çok demektir ve sıfatı güçlendirir: **sehr schön**. **ziemlich** oldukça demektir: **ziemlich groß**. **zu** ise gereğinden fazla demektir ve bir sorun bildirir. **Die Wohnung ist zu teuer** dersen o evi tutamazsın. Türkçede ikisine de çok deriz ama Almancada farklıdır. Sıfatı **nicht** ile olumsuz yaparsın: **Das Zimmer ist nicht groß**. | sehr çok, ziemlich oldukça, zu fazla ve sorunlu; nicht ile değil derim. | GERİ | **sıfatı** (iki kez) ve **olumsuz yaparsın** terim. |
| `gr:a1-13:t1` | `h_tr` | welch- (hangi) ve dies- (bu) | Hangi ve bu demenin iki kelimesi. | GERİ | **welch-** ve **dies-** kısa çizgiyle yarım yazılmış; kelimenin yarısını görünce ne olduğunu anlamadım. |
| `gr:a1-13:t1` | `tr` | **welcher** hangi, **dieser** bu demektir. Sonları **der**, **die**, **das** gibi değişir. **der** ile **welcher** ve **dieser**, **die** ile **welche** ve **diese** dersin. **das** ile **welches** ve **dieses**, çoğulda **welche** ve **diese** dersin. Bir şeyi alırken **der** ile giden isimde son **en** olur: **Ich nehme diesen Tisch**. | welcher hangi, dieser bu; sonları der/die/das'a göre değişir; alırken der'li kelimede son en olur. | GERİ | **çoğulda** terim. Bir kutuda beş ayrı biçim var. |
| `gr:a1-13:t2` | `h_tr` | Karşılaştırma: billiger als, so teuer wie | Daha ucuz ve aynı pahalı demek. | GEÇTİ |  |
| `gr:a1-13:t2` | `tr` | İki şeyi karşılaştırırken sıfata **er** eklersin: **billig**, **billiger**. Neyle karşılaştırdığını **als** ile söylersin: **billiger als der Tisch**. Bazı kısa sıfatlarda a, o, u harfi ä, ö, ü olur: **groß**, **größer**. **gut** düzensizdir ve **besser** olur. Eşitlik için **so** ve **wie** kullanırsın: **so teuer wie das Sofa**. | Daha demek için sona er eklerim, als ile neyle karşılaştırdığımı söylerim; gut besser olur; eşitlikte so … wie. | GERİ | **sıfata**, **kısa sıfatlarda**, **düzensizdir** terim. |
| `gr:a1-13:t3` | `h_tr` | En üstünlük: am billigsten, am besten | En ucuz, en iyi demek. | GERİ | **En üstünlük** dilbilgisi sözü, gündelik Türkçede yok. |
| `gr:a1-13:t3` | `tr` | En demek için başa **am** gelir, sıfatın sonuna **sten** eklenir: **billig**, **am billigsten**. Karşılaştırmadaki ä, ö, ü burada da kalır: **groß**, **am größten**. **gut** yine düzensizdir: **am besten**. Soru da aynı yolla kurulur: **Welche Wohnung ist am billigsten?** | En demek için am ve sonuna sten; groß'ta ö kalır; gut am besten olur. | GERİ | **sıfatın sonuna**, **düzensizdir** terim. |
| `gr:a1-04:t5` | `h_tr` | Ev ilanı okumak | Ev ilanını anlamak. | GEÇTİ |  |
| `gr:a1-04:t5` | `tr` | Ev ilanları kısaltmalarla doludur. **Zi.** oda, **Kü.** mutfak, **Blk.** balkon demektir. **NK** yan giderlerdir: ısınma, su, çöp. **Kaltmiete** yalnız kira, **Warmmiete** yan giderlerle birlikte kiradır. Almanya'da salon da oda sayılır, yani **3 Zi.** Türkiye'deki 2+1'dir. | İlandaki kısaltmalar: Zi. oda, Kü. mutfak; Kaltmiete yalnız kira, Warmmiete giderlerle; 3 Zi. bizdeki 2+1. | GEÇTİ |  |
| `gr:a1-11:t1` | `h_tr` | Nerede? in, an, auf | Nerede sorusuna in, an, auf. | GEÇTİ |  |
| `gr:a1-11:t1` | `tr` | **Wo** nerede demektir. **in** bir şeyin içinde, **an** kenarında, **auf** üstünde demektir. Türkçedeki de ekinin işini burada bu kelimeler yapar. Bunlardan sonra **der** ve **das** değişip **dem** olur. **die** ise **der** olur: **an der Tür**. **in dem** kısalıp **im** olur: **im Bad**. **an dem** de kısalıp **am** olur. | in içinde, an kenarında, auf üstünde; sonra der ve das dem olur, die der olur; in dem im, an dem am olur. | GERİ | **de ekinin** terim (ek, hâl eki). |
| `gr:a1-11:t2` | `h_tr` | Nerede? neben, vor, hinter, zwischen | Yanında, önünde, arkasında, arasında. | GEÇTİ |  |
| `gr:a1-11:t2` | `tr` | **neben** yanında, **vor** önünde, **hinter** arkasında demektir. **zwischen** iki şeyin arasında demektir: **zwischen dem Bett und dem Schrank**. Bunlardan sonra da **der** ve **das** değişip **dem** olur. Burada kısalma yoktur: **neben dem Sofa**. Türkçede yer kelimesi sonra gelir, Almancada önce gelir. | neben yanında, vor önünde, hinter arkasında, zwischen arasında; sonra der ve das dem olur, kısalmaz. | GEÇTİ |  |

## Sayılar

| Dosya | Toplam | GEÇTİ | GERİ |
|---|---|---|---|
| gun-15 | 148 | 147 | 1 |
| gun-16 | 148 | 148 | 0 |
| gun-17 | 143 | 140 | 3 |
| gun-18 | 138 | 136 | 2 |
| gun-19 | 135 | 134 | 1 |
| gun-20 | 137 | 137 | 0 |
| gun-21 | 123 | 123 | 0 |
| hafta-sonu-testi-03 | 19 | 17 | 2 |
| gorulmemis-03 | 8 | 7 | 1 |
| registry/grammar.json (17 kayıt × h_tr, tr) | 34 | 19 | 15 |
| **Toplam** | **1033** | **1008** | **25** |

**Reviewed sayılamayanlar (OD-9.4):** `gun-15`, `gun-17`, `gun-18`, `gun-19`, `hafta-sonu-testi-03`, `gorulmemis-03`, `registry/grammar.json` içindeki şu kayıtlar: `gr:a1-02:t3`, `gr:a1-02:t4`, `gr:a1-04:t3`, `gr:a1-04:t4`, `gr:a1-06:t2`, `gr:a1-11:t1`, `gr:a1-12:t1`, `gr:a1-12:t4`, `gr:a1-13:t1`, `gr:a1-13:t2`, `gr:a1-13:t3`. GERİ'siz dosyalar: `gun-16`, `gun-20`, `gun-21`.

### GERİ kimlik listesi

- `gun-15` · `m1:15:a2.b1.ay1` · `q_tr` (15-082)
- `gun-17` · `m1:17:o5` · `situation_tr` (17-124)
- `gun-17` · `m1:17:s8` · `why_tr` (17-137)
- `gun-17` · `m1:17:s11` · `why_tr` (17-143)
- `gun-18` · `g18` · `goal_tr` (18-001)
- `gun-18` · `m1:18:p1.n5.s0` · `geri_bildirim_tr` (18-102)
- `gun-19` · `m1:19:p1.n2.s1` · `geri_bildirim_tr` (19-092)
- `hafta-sonu-testi-03` · `m1:21:t04` · `situation_tr` (hst-005)
- `hafta-sonu-testi-03` · `m1:21:t12` · `why_tr` (hst-019)
- `gorulmemis-03` · `m1:h03:g4` · `why_tr` (gor-008)
- `registry/grammar.json` · `gr:a1-02:t3` · `h_tr`
- `registry/grammar.json` · `gr:a1-02:t3` · `tr`
- `registry/grammar.json` · `gr:a1-12:t1` · `tr`
- `registry/grammar.json` · `gr:a1-02:t4` · `tr`
- `registry/grammar.json` · `gr:a1-06:t2` · `h_tr`
- `registry/grammar.json` · `gr:a1-06:t2` · `tr`
- `registry/grammar.json` · `gr:a1-12:t4` · `tr`
- `registry/grammar.json` · `gr:a1-04:t3` · `tr`
- `registry/grammar.json` · `gr:a1-04:t4` · `tr`
- `registry/grammar.json` · `gr:a1-13:t1` · `h_tr`
- `registry/grammar.json` · `gr:a1-13:t1` · `tr`
- `registry/grammar.json` · `gr:a1-13:t2` · `tr`
- `registry/grammar.json` · `gr:a1-13:t3` · `h_tr`
- `registry/grammar.json` · `gr:a1-13:t3` · `tr`
- `registry/grammar.json` · `gr:a1-11:t1` · `tr`

## Notlar

- `17-143` ile `hst-019` aynı cümle; düzeltme ikisine birden gider.
- Dil noktası duraklarında GERİ'lerin çoğu tek sebepten: **fiil**, **sıfat**, **ek**, **çoğul**, **düzensiz**, **sıra sayısı**, **ünlü**, **en üstünlük**. `content/v2/temel/` içinde bu terimlerin hiçbiri öğretilmiyor (aradım, yok). Örnekler çoğu durakta kuralı terimsiz de gösteriyor.
- `gun-19` geri bildirimlerinde **harf değişmez** / **harf değişmedi** (`19-042`, `19-095`) ilk bakışta neye göre değişmediği belli değil gibi geldi; aynı gün gösterilen `gr:a1-06:t2` durağı **ich, wir ve Sie ile hiçbir şey değişmez** dediği için GEÇTİ saydım. Durak gösterilmeden bu ekranlara gelinirse geri döner.
- `19-094` / `19-096` **Anlaşmanızı** diyor. Anlaşma aynı günün sahnesinde (**Wir reden nur Deutsch, okay?**) kuruluyor; GEÇTİ saydım.
- Halka kalıplarındaki **…** boşluk işaretidir, açıklama metni değildir; önceki okur raporlarındaki gibi GEÇTİ saydım. `… -abilir misin?` gibi ek yazımları da tek okumada anlaşılıyor.
- `goal_tr` ve `can_do.tr` içinde Almanca kelimeler (**um, am, im**, **er spricht, sie fährt**) kalın işaretsiz yazılmış. Ekranda düz metin olarak çıkıyorsa kalın kuralına uymuyor; anlamı bozmadığı için yalnız `18-001`'i (başka sebeplerle) GERİ saydım.
- Kapsam dışı ama görünen metinlere (`title_tr`, sahne yönergeleri `sahne_tr`) bir kez göz attım, sayıya katmadım. Dikkat çeken tek yer `gun-21` prova başlığı **Haftanın kapısı: babana randevu**: **kapı** sözü öğrenciye bir şey anlatmıyor, iç terim gibi duruyor.
- `16-101` **Senin evin Brunnengasse 7. sieben de.** cümlesinde de **7.** var ama cümle sonunda olduğu için yedinci diye okumadım; GEÇTİ.

## Ek: bütün satırlar

GEÇTİ satırlarında kendi sözlerimle anlattığım şey açıklamayla örtüştü; tek tek yazmadım, karar sütunu yeterli. GERİ satırlarının ayrıntısı yukarıda.

| # | Dosya | Öğe | Alan | Açıklama | Karar |
|---|---|---|---|---|---|
| 15-001 | gun-15 | `g15` | `goal_tr` | İş yerinde ve telefonda evet ya da hayır sorusu sorar, kısa cevap verirsin. | GEÇTİ |
| 15-002 | gun-15 | `g15` | `can_do.tr` | Evet ya da hayır sorusu sorar, kısa cevap veririm. | GEÇTİ |
| 15-003 | gun-15 | `m1:15:h1.kalip0` | `kaliplar.tr` | haber vermek | GEÇTİ |
| 15-004 | gun-15 | `m1:15:h1.kalip1` | `kaliplar.tr` | bir hafta önce | GEÇTİ |
| 15-005 | gun-15 | `m1:15:h1.sahne` | `ortam_tr` | İş yeri, sabah. Derya şefi arıyor, sana soruyor. | GEÇTİ |
| 15-006 | gun-15 | `m1:15:h1.soru` | `q_tr` | Wimmer Bey ne zaman yine işte? | GEÇTİ |
| 15-007 | gun-15 | `m1:15:h1.soru.opt0` | `opts` | Pazartesi | GEÇTİ |
| 15-008 | gun-15 | `m1:15:h1.soru.opt1` | `opts` | Bugün | GEÇTİ |
| 15-009 | gun-15 | `m1:15:h1.soru.opt2` | `opts` | Cuma | GEÇTİ |
| 15-010 | gun-15 | `m1:15:h1.soru.opt3` | `opts` | Salı | GEÇTİ |
| 15-011 | gun-15 | `m1:15:h2.kalip0` | `kaliplar.tr` | Senin … var mı? – Sizin … var mı? | GEÇTİ |
| 15-012 | gun-15 | `m1:15:h2.kalip1` | `kaliplar.tr` | Sen de geliyor musun? – Siz de geliyor musunuz? | GEÇTİ |
| 15-013 | gun-15 | `m1:15:h2.sahne` | `ortam_tr` | Mola. Tobi seni cuma günkü kutlamaya çağırıyor. | GEÇTİ |
| 15-014 | gun-15 | `m1:15:h2.soru` | `q_tr` | Tobi'nin hediyesi var mı? | GEÇTİ |
| 15-015 | gun-15 | `m1:15:h2.soru.opt0` | `opts` | Hayır, henüz yok | GEÇTİ |
| 15-016 | gun-15 | `m1:15:h2.soru.opt1` | `opts` | Evet, var | GEÇTİ |
| 15-017 | gun-15 | `m1:15:h2.soru.opt2` | `opts` | Derya alıyor | GEÇTİ |
| 15-018 | gun-15 | `m1:15:h2.soru.opt3` | `opts` | Şef alıyor | GEÇTİ |
| 15-019 | gun-15 | `m1:15:h3.kalip0` | `kaliplar.tr` | … ağrıyor. – … ağrıyor mu? | GEÇTİ |
| 15-020 | gun-15 | `m1:15:h3.kalip1` | `kaliplar.tr` | … misin? – … misiniz? | GEÇTİ |
| 15-021 | gun-15 | `m1:15:h3.sahne` | `ortam_tr` | Molada Wimmer Bey eliyle sırtını tutuyor. | GEÇTİ |
| 15-022 | gun-15 | `m1:15:h3.soru` | `q_tr` | Wimmer Bey hasta mı? | GEÇTİ |
| 15-023 | gun-15 | `m1:15:h3.soru.opt0` | `opts` | Hayır, sadece sırtı ağrıyor | GEÇTİ |
| 15-024 | gun-15 | `m1:15:h3.soru.opt1` | `opts` | Evet, ateşi var | GEÇTİ |
| 15-025 | gun-15 | `m1:15:h3.soru.opt2` | `opts` | Midesi bulanıyor | GEÇTİ |
| 15-026 | gun-15 | `m1:15:h3.soru.opt3` | `opts` | Kulağı ağrıyor | GEÇTİ |
| 15-027 | gun-15 | `m1:15:h4.kalip0` | `kaliplar.tr` | yürüyerek | GEÇTİ |
| 15-028 | gun-15 | `m1:15:h4.kalip1` | `kaliplar.tr` | … -abilir misin? – … -abilir misiniz? | GEÇTİ |
| 15-029 | gun-15 | `m1:15:h4.sahne` | `ortam_tr` | Mola. Derya biraz topallıyor. Bu akşam birlikte tezgâha gideceksiniz. | GEÇTİ |
| 15-030 | gun-15 | `m1:15:h4.soru` | `q_tr` | Derya bu akşam nasıl geliyor? | GEÇTİ |
| 15-031 | gun-15 | `m1:15:h4.soru.opt0` | `opts` | Otobüsle | GEÇTİ |
| 15-032 | gun-15 | `m1:15:h4.soru.opt1` | `opts` | Yürüyerek | GEÇTİ |
| 15-033 | gun-15 | `m1:15:h4.soru.opt2` | `opts` | Bisikletle | GEÇTİ |
| 15-034 | gun-15 | `m1:15:h4.soru.opt3` | `opts` | Arabayla | GEÇTİ |
| 15-035 | gun-15 | `m1:15:v1.b1.ana` | `q_tr` | Derya molada herkese ne soruyor? | GEÇTİ |
| 15-036 | gun-15 | `m1:15:v1.b1.ana.opt0` | `opts` | Cuma günü vakitleri olup olmadığını | GEÇTİ |
| 15-037 | gun-15 | `m1:15:v1.b1.ana.opt1` | `opts` | Hasta olup olmadıklarını | GEÇTİ |
| 15-038 | gun-15 | `m1:15:v1.b1.ana.opt2` | `opts` | Tezgâhın nerede olduğunu | GEÇTİ |
| 15-039 | gun-15 | `m1:15:v1.b1.ay0` | `q_tr` | Wimmer Bey'in neresi ağrıyor? | GEÇTİ |
| 15-040 | gun-15 | `m1:15:v1.b1.ay0.opt0` | `opts` | sırtı | GEÇTİ |
| 15-041 | gun-15 | `m1:15:v1.b1.ay0.opt1` | `opts` | kulağı | GEÇTİ |
| 15-042 | gun-15 | `m1:15:v1.b1.ay0.opt2` | `opts` | ayağı | GEÇTİ |
| 15-043 | gun-15 | `m1:15:v1.b1.ay1` | `q_tr` | Derya bu akşam neden gelmiyor? | GEÇTİ |
| 15-044 | gun-15 | `m1:15:v1.b1.ay1.opt0` | `opts` | Midesi bulanıyor | GEÇTİ |
| 15-045 | gun-15 | `m1:15:v1.b1.ay1.opt1` | `opts` | Ateşi var | GEÇTİ |
| 15-046 | gun-15 | `m1:15:v1.b1.ay1.opt2` | `opts` | Cuma günü çalışıyor | GEÇTİ |
| 15-047 | gun-15 | `m1:15:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 15-048 | gun-15 | `m1:15:v1.b1.d5` | `gorev_tr` | Sahnede duyduklarını Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 15-049 | gun-15 | `m1:15:v1:c1` | `situation_tr` | Derya sana da soruyor. Cuma günü vaktin var. | GEÇTİ |
| 15-050 | gun-15 | `m1:15:v1:c1` | `why_tr` | Soru **Hast du** ile başlıyor. Cevap **Ja** ve **ich habe** ile gelir. | GEÇTİ |
| 15-051 | gun-15 | `m1:15:a1` | `ortam_tr` | Akşam telefonuna bakıyorsun. Şefin Wimmer Bey mesaj bırakmış. | GEÇTİ |
| 15-052 | gun-15 | `m1:15:a1.b1.ana` | `q_tr` | Wimmer Bey neden arıyor? | GEÇTİ |
| 15-053 | gun-15 | `m1:15:a1.b1.ana.opt0` | `opts` | Yarın vaktin olup olmadığını soruyor | GEÇTİ |
| 15-054 | gun-15 | `m1:15:a1.b1.ana.opt1` | `opts` | Cuma kutlamasını iptal ediyor | GEÇTİ |
| 15-055 | gun-15 | `m1:15:a1.b1.ana.opt2` | `opts` | Hasta olduğunu söylüyor | GEÇTİ |
| 15-056 | gun-15 | `m1:15:a1.b1.ay0` | `q_tr` | Görüşme saat kaçta? | GEÇTİ |
| 15-057 | gun-15 | `m1:15:a1.b1.ay0.opt0` | `opts` | dokuzda | GEÇTİ |
| 15-058 | gun-15 | `m1:15:a1.b1.ay0.opt1` | `opts` | onda | GEÇTİ |
| 15-059 | gun-15 | `m1:15:a1.b1.ay0.opt2` | `opts` | sekizde | GEÇTİ |
| 15-060 | gun-15 | `m1:15:a1.b1.ay1` | `q_tr` | Wimmer Bey cevabı ne zaman bekliyor? | GEÇTİ |
| 15-061 | gun-15 | `m1:15:a1.b1.ay1.opt0` | `opts` | bugün | GEÇTİ |
| 15-062 | gun-15 | `m1:15:a1.b1.ay1.opt1` | `opts` | yarın | GEÇTİ |
| 15-063 | gun-15 | `m1:15:a1.b1.ay1.opt2` | `opts` | cuma günü | GEÇTİ |
| 15-064 | gun-15 | `m1:15:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 15-065 | gun-15 | `m1:15:a1.b1.d5` | `gorev_tr` | Mesajda ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 15-066 | gun-15 | `m1:15:a1:c1` | `situation_tr` | Wimmer Bey'i geri arıyorsun. Yarın saat dokuzda vaktin var. | GEÇTİ |
| 15-067 | gun-15 | `m1:15:a1:c1` | `why_tr` | Soru **Haben Sie** ile başlıyor. Cevap **Ja, ich habe** ile başlar. | GEÇTİ |
| 15-068 | gun-15 | `m1:15:a1:e1` | `q_tr` | Ne yapmalısın? | GEÇTİ |
| 15-069 | gun-15 | `m1:15:a1:e1.opt0` | `opts` | Bugün Wimmer Bey'e haber ver. | GEÇTİ |
| 15-070 | gun-15 | `m1:15:a1:e1.opt1` | `opts` | Cuma günü ofise git. | GEÇTİ |
| 15-071 | gun-15 | `m1:15:a1:e1.opt2` | `opts` | Bir şey yapma, o yine arar. | GEÇTİ |
| 15-072 | gun-15 | `m1:15:a1:e1` | `why_tr` | Wimmer Bey bugün haber vermeni istiyor. | GEÇTİ |
| 15-073 | gun-15 | `m1:15:a2` | `ortam_tr` | Dışarıdan şirketi arıyorsun. Hat meşgul, bu kayıt çalıyor. | GEÇTİ |
| 15-074 | gun-15 | `m1:15:a2.b1.ana` | `q_tr` | Bu kayıt sana ne söylüyor? | GEÇTİ |
| 15-075 | gun-15 | `m1:15:a2.b1.ana.opt0` | `opts` | Hatta beklemeni | GEÇTİ |
| 15-076 | gun-15 | `m1:15:a2.b1.ana.opt1` | `opts` | Yarın yeniden aramanı | GEÇTİ |
| 15-077 | gun-15 | `m1:15:a2.b1.ana.opt2` | `opts` | Mesaj bırakmanı | GEÇTİ |
| 15-078 | gun-15 | `m1:15:a2.b1.ay0` | `q_tr` | Cuma günü ofis ne zaman açık? | GEÇTİ |
| 15-079 | gun-15 | `m1:15:a2.b1.ay0.opt0` | `opts` | Yalnızca öğleden önce | GEÇTİ |
| 15-080 | gun-15 | `m1:15:a2.b1.ay0.opt1` | `opts` | Bütün gün | GEÇTİ |
| 15-081 | gun-15 | `m1:15:a2.b1.ay0.opt2` | `opts` | Yalnızca öğleden sonra | GEÇTİ |
| 15-082 | gun-15 | `m1:15:a2.b1.ay1` | `q_tr` | Kayda göre biri ne zaman açacak? | GERİ |
| 15-083 | gun-15 | `m1:15:a2.b1.ay1.opt0` | `opts` | Birazdan | GEÇTİ |
| 15-084 | gun-15 | `m1:15:a2.b1.ay1.opt1` | `opts` | Pazartesi | GEÇTİ |
| 15-085 | gun-15 | `m1:15:a2.b1.ay1.opt2` | `opts` | Cuma günü | GEÇTİ |
| 15-086 | gun-15 | `m1:15:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 15-087 | gun-15 | `m1:15:a2.b1.d5` | `gorev_tr` | Kayıtta ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 15-088 | gun-15 | `m1:15:a2:c1` | `situation_tr` | Sonunda biri açıyor. Selam ver, adını söyle ve Wimmer Bey orada mı diye sor. | GEÇTİ |
| 15-089 | gun-15 | `m1:15:a2:c1` | `why_tr` | Önce adını söyle. Sonra **Ist Herr Wimmer da?** diye sor. | GEÇTİ |
| 15-090 | gun-15 | `m1:15:a2:e1` | `q_tr` | Ne yapmalısın? | GEÇTİ |
| 15-091 | gun-15 | `m1:15:a2:e1.opt0` | `opts` | Telefonu kapatma, bekle. | GEÇTİ |
| 15-092 | gun-15 | `m1:15:a2:e1.opt1` | `opts` | Hemen kapat, cuma günü ara. | GEÇTİ |
| 15-093 | gun-15 | `m1:15:a2:e1.opt2` | `opts` | Pazartesi yeniden ara. | GEÇTİ |
| 15-094 | gun-15 | `m1:15:a2:e1` | `why_tr` | Kayıt beklemeni istiyor. Birazdan biri açacak. | GEÇTİ |
| 15-095 | gun-15 | `m1:15:p1` | `durum_tr` | Bugün çarşamba. Wimmer Bey masanın yanına geliyor. Seninle kısa bir şey konuşmak istiyor. | GEÇTİ |
| 15-096 | gun-15 | `m1:15:p1.n1.s0` | `geri_bildirim_tr` | Güzel. Kısa ve açık bir cevap verdin. | GEÇTİ |
| 15-097 | gun-15 | `m1:15:p1.n1.s1` | `geri_bildirim_tr` | Kibar bir hayır. **leider** cevabı yumuşatır. | GEÇTİ |
| 15-098 | gun-15 | `m1:15:p1.n1.s2` | `geri_bildirim_tr` | Tek başına **Was?** kaba duyulur. **Ja, klar** ya da **Jetzt leider nicht** de. | GEÇTİ |
| 15-099 | gun-15 | `m1:15:p1.n1b.s0` | `geri_bildirim_tr` | Saati tekrar ettin. Yanlış anlama kalmadı. | GEÇTİ |
| 15-100 | gun-15 | `m1:15:p1.n1b.s1` | `geri_bildirim_tr` | Wimmer Bey ikiyi soruyor. **zwei** ile **drei** karışmasın. | GEÇTİ |
| 15-101 | gun-15 | `m1:15:p1.n2.s0` | `geri_bildirim_tr` | Sıcak bir evet. Wimmer Bey sevinir. | GEÇTİ |
| 15-102 | gun-15 | `m1:15:p1.n2.s1` | `geri_bildirim_tr` | Kibar ve açık. **leider** burada çok önemli. | GEÇTİ |
| 15-103 | gun-15 | `m1:15:p1.n2.s2` | `geri_bildirim_tr` | Tek başına **Nein.** şefe sert duyulur. **leider** ekle. | GEÇTİ |
| 15-104 | gun-15 | `m1:15:p1.n3.s0` | `geri_bildirim_tr` | Doğru. **noch nicht** henüz değil demektir. | GEÇTİ |
| 15-105 | gun-15 | `m1:15:p1.n3.s1` | `geri_bildirim_tr` | Güzel. Soruyu tam cümleyle cevapladın. | GEÇTİ |
| 15-106 | gun-15 | `m1:15:p1.n3.s2` | `geri_bildirim_tr` | Hediye şef için değil, kutlama için. **Nein, noch nicht** ya da **Ja** de. | GEÇTİ |
| 15-107 | gun-15 | `m1:15:p1.n3b.s0` | `geri_bildirim_tr` | Tamam. Yarın haber vereceksin. | GEÇTİ |
| 15-108 | gun-15 | `m1:15:p1.n3b.s1` | `geri_bildirim_tr` | Yarın perşembe ve iş günü. **Ja, das geht** de. | GEÇTİ |
| 15-109 | gun-15 | `m1:15:p1.n4.s0` | `geri_bildirim_tr` | Çok iyi. Sen de evet ya da hayır sorusu sordun. | GEÇTİ |
| 15-110 | gun-15 | `m1:15:p1.n4.s1` | `geri_bildirim_tr` | Kibar bir kapanış. | GEÇTİ |
| 15-111 | gun-15 | `m1:15:p1.n5.s0` | `geri_bildirim_tr` | Cevabı duydun ve teşekkür ettin. | GEÇTİ |
| 15-112 | gun-15 | `m1:15:p1` | `kapanis_tr` | Şefin sorularına evet ya da hayır ile cevap verdin, sen de bir soru sordun. | GEÇTİ |
| 15-113 | gun-15 | `m1:15:o1` | `q_tr` | Derya neden yazıyor? | GEÇTİ |
| 15-114 | gun-15 | `m1:15:o1.opt0` | `opts` | Seni cuma kutlamasına çağırmak için | GEÇTİ |
| 15-115 | gun-15 | `m1:15:o1.opt1` | `opts` | Hasta olduğunu söylemek için | GEÇTİ |
| 15-116 | gun-15 | `m1:15:o1.opt2` | `opts` | Para istemek için | GEÇTİ |
| 15-117 | gun-15 | `m1:15:o2` | `q_tr` | Kutlama saat kaçta? | GEÇTİ |
| 15-118 | gun-15 | `m1:15:o2.opt0` | `opts` | dörtte | GEÇTİ |
| 15-119 | gun-15 | `m1:15:o2.opt1` | `opts` | onda | GEÇTİ |
| 15-120 | gun-15 | `m1:15:o2.opt2` | `opts` | beşte | GEÇTİ |
| 15-121 | gun-15 | `m1:15:o3` | `q_tr` | Hediye ne kadarlık olmalı? | GEÇTİ |
| 15-122 | gun-15 | `m1:15:o3.opt0` | `opts` | on euro | GEÇTİ |
| 15-123 | gun-15 | `m1:15:o3.opt1` | `opts` | beş euro | GEÇTİ |
| 15-124 | gun-15 | `m1:15:o3.opt2` | `opts` | yirmi euro | GEÇTİ |
| 15-125 | gun-15 | `m1:15:o4` | `q_tr` | Derya cevabı ne zaman bekliyor? | GEÇTİ |
| 15-126 | gun-15 | `m1:15:o4.opt0` | `opts` | yarın | GEÇTİ |
| 15-127 | gun-15 | `m1:15:o4.opt1` | `opts` | cuma günü | GEÇTİ |
| 15-128 | gun-15 | `m1:15:o4.opt2` | `opts` | bugün | GEÇTİ |
| 15-129 | gun-15 | `m1:15:o5` | `situation_tr` | Cuma günü vaktin var. Derya'ya cevap ver. | GEÇTİ |
| 15-130 | gun-15 | `m1:15:o5` | `why_tr` | Soruda **Kommst** başta. Cevapta **ich komme** dersin. | GEÇTİ |
| 15-131 | gun-15 | `m1:15:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 15-132 | gun-15 | `m1:15:s1` | `why_tr` | **Haben Sie** başta, çünkü bu bir evet ya da hayır sorusu. | GEÇTİ |
| 15-133 | gun-15 | `m1:15:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 15-134 | gun-15 | `m1:15:s2` | `why_tr` | **Mir tut der Fuß weh** ayağım ağrıyor demektir. | GEÇTİ |
| 15-135 | gun-15 | `m1:15:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 15-136 | gun-15 | `m1:15:s3` | `why_tr` | **Ist** başta. Şef yarın burada mı diye soruyor. | GEÇTİ |
| 15-137 | gun-15 | `m1:15:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 15-138 | gun-15 | `m1:15:s4` | `why_tr` | **Kommst du mit** sen de geliyor musun demektir. | GEÇTİ |
| 15-139 | gun-15 | `m1:15:s5` | `why_tr` | Kibar soruda **Haben Sie** başa gelir. | GEÇTİ |
| 15-140 | gun-15 | `m1:15:s6` | `why_tr` | Sen diye sorarken **Bist du** ile başla. | GEÇTİ |
| 15-141 | gun-15 | `m1:15:s7` | `why_tr` | Ağrıyan yeri **Mir tut** ile **weh** arasına koyarsın. | GEÇTİ |
| 15-142 | gun-15 | `m1:15:s8` | `why_tr` | Canım istemiyor derken **Ich habe keine Lust** dersin. | GEÇTİ |
| 15-143 | gun-15 | `m1:15:s9` | `situation_tr` | Derya kutlama için hediyen var mı diye soruyor. Henüz yok. | GEÇTİ |
| 15-144 | gun-15 | `m1:15:s9` | `why_tr` | Henüz yok derken **noch nicht** dersin. | GEÇTİ |
| 15-145 | gun-15 | `m1:15:s10` | `situation_tr` | Tobi bu akşam tezgâha çağırıyor. Sen de gidiyorsun. | GEÇTİ |
| 15-146 | gun-15 | `m1:15:s10` | `why_tr` | **Kommst du mit?** sorusuna **Ja, ich komme mit** ile cevap verirsin. | GEÇTİ |
| 15-147 | gun-15 | `m1:15:s11` | `situation_tr` | Wimmer Bey'in kapısındasın. Yarın vakti var mı diye sor. | GEÇTİ |
| 15-148 | gun-15 | `m1:15:s11` | `why_tr` | Kibar soruda **Haben Sie** başa gelir, sonra **morgen Zeit** gelir. | GEÇTİ |
| 16-001 | gun-16 | `g16` | `goal_tr` | Telefonda kendini tanıtır, bir adı ve sokağı harf harf söyler, vedalaşırsın. | GEÇTİ |
| 16-002 | gun-16 | `g16` | `can_do.tr` | Telefonda adımı söyler, harf harf hecelerim. | GEÇTİ |
| 16-003 | gun-16 | `m1:16:h1.kalip0` | `kaliplar.tr` | İyi günler, ben … | GEÇTİ |
| 16-004 | gun-16 | `m1:16:h1.kalip1` | `kaliplar.tr` | Berta'daki B – Berlin'deki B | GEÇTİ |
| 16-005 | gun-16 | `m1:16:h1.kalip2` | `kaliplar.tr` | iki N ile – iki L ile | GEÇTİ |
| 16-006 | gun-16 | `m1:16:h1.kalip3` | `kaliplar.tr` | Telefonda: hoşça kalın! | GEÇTİ |
| 16-007 | gun-16 | `m1:16:h1.sahne` | `ortam_tr` | Telefon. Dr. Weber'in muayenehanesini arıyorsun. Boğazın ağrıyor. | GEÇTİ |
| 16-008 | gun-16 | `m1:16:h1.soru` | `q_tr` | Huber Hanım senden ne istiyor? | GEÇTİ |
| 16-009 | gun-16 | `m1:16:h1.soru.opt0` | `opts` | Adını harf harf söylemeni | GEÇTİ |
| 16-010 | gun-16 | `m1:16:h1.soru.opt1` | `opts` | Yarın gelmeni | GEÇTİ |
| 16-011 | gun-16 | `m1:16:h1.soru.opt2` | `opts` | Telefon numaranı | GEÇTİ |
| 16-012 | gun-16 | `m1:16:h1.soru.opt3` | `opts` | Adresini | GEÇTİ |
| 16-013 | gun-16 | `m1:16:h2.kalip0` | `kaliplar.tr` | … hâlâ sizde var mı? | GEÇTİ |
| 16-014 | gun-16 | `m1:16:h2.kalip1` | `kaliplar.tr` | … hâlâ duruyor mu? | GEÇTİ |
| 16-015 | gun-16 | `m1:16:h2.sahne` | `ortam_tr` | Telefon. Komşun Brandl Hanım eski giysilerini veriyor. | GEÇTİ |
| 16-016 | gun-16 | `m1:16:h2.soru` | `q_tr` | Brandl Hanım'da hâlâ ne var? | GEÇTİ |
| 16-017 | gun-16 | `m1:16:h2.soru.opt0` | `opts` | Ceket | GEÇTİ |
| 16-018 | gun-16 | `m1:16:h2.soru.opt1` | `opts` | Palto | GEÇTİ |
| 16-019 | gun-16 | `m1:16:h2.soru.opt2` | `opts` | Elbise | GEÇTİ |
| 16-020 | gun-16 | `m1:16:h2.soru.opt3` | `opts` | Gömlek | GEÇTİ |
| 16-021 | gun-16 | `m1:16:h3.kalip0` | `kaliplar.tr` | … ucuz. – … ucuz mu? | GEÇTİ |
| 16-022 | gun-16 | `m1:16:h3.sahne` | `ortam_tr` | Telefon. Brandl Hanım eşyalarını da veriyor. | GEÇTİ |
| 16-023 | gun-16 | `m1:16:h3.soru` | `q_tr` | Dolap kaç euro? | GEÇTİ |
| 16-024 | gun-16 | `m1:16:h3.soru.opt0` | `opts` | Yirmi | GEÇTİ |
| 16-025 | gun-16 | `m1:16:h3.soru.opt1` | `opts` | On iki | GEÇTİ |
| 16-026 | gun-16 | `m1:16:h3.soru.opt2` | `opts` | Otuz | GEÇTİ |
| 16-027 | gun-16 | `m1:16:h3.soru.opt3` | `opts` | İki | GEÇTİ |
| 16-028 | gun-16 | `m1:16:h4.kalip0` | `kaliplar.tr` | … istiyorum | GEÇTİ |
| 16-029 | gun-16 | `m1:16:h4.sahne` | `ortam_tr` | Telefon. Muayenehaneyi arıyorsun, Huber Hanım açıyor. | GEÇTİ |
| 16-030 | gun-16 | `m1:16:h4.soru` | `q_tr` | Muayenehaneyi neden arıyorsun? | GEÇTİ |
| 16-031 | gun-16 | `m1:16:h4.soru.opt0` | `opts` | Yutkunamıyorsun | GEÇTİ |
| 16-032 | gun-16 | `m1:16:h4.soru.opt1` | `opts` | Randevuyu iptal ediyorsun | GEÇTİ |
| 16-033 | gun-16 | `m1:16:h4.soru.opt2` | `opts` | Adresini değiştiriyorsun | GEÇTİ |
| 16-034 | gun-16 | `m1:16:h4.soru.opt3` | `opts` | Bir ceket arıyorsun | GEÇTİ |
| 16-035 | gun-16 | `m1:16:v1.b1.ana` | `q_tr` | Derya neden arıyor? | GEÇTİ |
| 16-036 | gun-16 | `m1:16:v1.b1.ana.opt0` | `opts` | Doktordan randevu almak için | GEÇTİ |
| 16-037 | gun-16 | `m1:16:v1.b1.ana.opt1` | `opts` | Adresini değiştirmek için | GEÇTİ |
| 16-038 | gun-16 | `m1:16:v1.b1.ana.opt2` | `opts` | Bir ceket ayırtmak için | GEÇTİ |
| 16-039 | gun-16 | `m1:16:v1.b1.ay0` | `q_tr` | Derya'nın soyadının son harfi ne? | GEÇTİ |
| 16-040 | gun-16 | `m1:16:v1.b1.ay0.opt0` | `opts` | Y | GEÇTİ |
| 16-041 | gun-16 | `m1:16:v1.b1.ay0.opt1` | `opts` | S | GEÇTİ |
| 16-042 | gun-16 | `m1:16:v1.b1.ay0.opt2` | `opts` | A | GEÇTİ |
| 16-043 | gun-16 | `m1:16:v1.b1.ay1` | `q_tr` | Randevu saat kaçta? | GEÇTİ |
| 16-044 | gun-16 | `m1:16:v1.b1.ay1.opt0` | `opts` | on birde | GEÇTİ |
| 16-045 | gun-16 | `m1:16:v1.b1.ay1.opt1` | `opts` | onda | GEÇTİ |
| 16-046 | gun-16 | `m1:16:v1.b1.ay1.opt2` | `opts` | on ikide | GEÇTİ |
| 16-047 | gun-16 | `m1:16:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 16-048 | gun-16 | `m1:16:v1.b1.d5` | `gorev_tr` | Sahnede duyduklarını Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 16-049 | gun-16 | `m1:16:v1:c1` | `situation_tr` | Huber Hanım sana da adını soruyor. Adını söyle. | GEÇTİ |
| 16-050 | gun-16 | `m1:16:v1:c1` | `why_tr` | Adını **Mein Name ist** ile söyle. Gerekirse **Ich buchstabiere** de. | GEÇTİ |
| 16-051 | gun-16 | `m1:16:a1` | `ortam_tr` | Telefonunda bir sesli mesaj var. Muayenehaneden Huber Hanım aramış. | GEÇTİ |
| 16-052 | gun-16 | `m1:16:a1.b1.ana` | `q_tr` | Huber Hanım neden arıyor? | GEÇTİ |
| 16-053 | gun-16 | `m1:16:a1.b1.ana.opt0` | `opts` | Adının nasıl yazıldığını soruyor | GEÇTİ |
| 16-054 | gun-16 | `m1:16:a1.b1.ana.opt1` | `opts` | Randevuyu iptal ediyor | GEÇTİ |
| 16-055 | gun-16 | `m1:16:a1.b1.ana.opt2` | `opts` | Bir ceketi soruyor | GEÇTİ |
| 16-056 | gun-16 | `m1:16:a1.b1.ay0` | `q_tr` | Huber Hanım hangi iki harfi karıştırıyor? | GEÇTİ |
| 16-057 | gun-16 | `m1:16:a1.b1.ay0.opt0` | `opts` | B ve P | GEÇTİ |
| 16-058 | gun-16 | `m1:16:a1.b1.ay0.opt1` | `opts` | D ve T | GEÇTİ |
| 16-059 | gun-16 | `m1:16:a1.b1.ay0.opt2` | `opts` | M ve N | GEÇTİ |
| 16-060 | gun-16 | `m1:16:a1.b1.ay1` | `q_tr` | Ne zaman geri aramalısın? | GEÇTİ |
| 16-061 | gun-16 | `m1:16:a1.b1.ay1.opt0` | `opts` | bugün | GEÇTİ |
| 16-062 | gun-16 | `m1:16:a1.b1.ay1.opt1` | `opts` | yarın | GEÇTİ |
| 16-063 | gun-16 | `m1:16:a1.b1.ay1.opt2` | `opts` | pazartesi | GEÇTİ |
| 16-064 | gun-16 | `m1:16:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 16-065 | gun-16 | `m1:16:a1.b1.d5` | `gorev_tr` | Mesajda ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 16-066 | gun-16 | `m1:16:a1:c1` | `situation_tr` | Huber Hanım'ı geri arıyorsun. Selam ver, kendini tanıt ve adını harf harf söyleyeceğini söyle. | GEÇTİ |
| 16-067 | gun-16 | `m1:16:a1:c1` | `why_tr` | Önce **hier ist** ve adın. Sonra **Ich buchstabiere** de. | GEÇTİ |
| 16-068 | gun-16 | `m1:16:a1:e1` | `q_tr` | Ne yapmalısın? | GEÇTİ |
| 16-069 | gun-16 | `m1:16:a1:e1.opt0` | `opts` | Bugün muayenehaneyi ara, adını harf harf söyle. | GEÇTİ |
| 16-070 | gun-16 | `m1:16:a1:e1.opt1` | `opts` | Yarın muayenehaneye git. | GEÇTİ |
| 16-071 | gun-16 | `m1:16:a1:e1.opt2` | `opts` | Bir şey yapma, o yine arar. | GEÇTİ |
| 16-072 | gun-16 | `m1:16:a1:e1` | `why_tr` | Huber Hanım adının yazılışını soruyor. Bugün aramanı istiyor. | GEÇTİ |
| 16-073 | gun-16 | `m1:16:a2` | `ortam_tr` | Şehirde bir giyim mağazasındasın. Hoparlörden bir anons geliyor. | GEÇTİ |
| 16-074 | gun-16 | `m1:16:a2.b1.ana` | `q_tr` | Anons ne söylüyor? | GEÇTİ |
| 16-075 | gun-16 | `m1:16:a2.b1.ana.opt0` | `opts` | Bugün giysiler ucuz | GEÇTİ |
| 16-076 | gun-16 | `m1:16:a2.b1.ana.opt1` | `opts` | Mağaza taşınıyor | GEÇTİ |
| 16-077 | gun-16 | `m1:16:a2.b1.ana.opt2` | `opts` | Bir çocuk kayboldu | GEÇTİ |
| 16-078 | gun-16 | `m1:16:a2.b1.ay0` | `q_tr` | Bir palto kaç euro? | GEÇTİ |
| 16-079 | gun-16 | `m1:16:a2.b1.ay0.opt0` | `opts` | elli | GEÇTİ |
| 16-080 | gun-16 | `m1:16:a2.b1.ay0.opt1` | `opts` | yirmi | GEÇTİ |
| 16-081 | gun-16 | `m1:16:a2.b1.ay0.opt2` | `opts` | on beş | GEÇTİ |
| 16-082 | gun-16 | `m1:16:a2.b1.ay1` | `q_tr` | Mağaza ne zaman kapanıyor? | GEÇTİ |
| 16-083 | gun-16 | `m1:16:a2.b1.ay1.opt0` | `opts` | bu akşam sekizde | GEÇTİ |
| 16-084 | gun-16 | `m1:16:a2.b1.ay1.opt1` | `opts` | yarın sabah | GEÇTİ |
| 16-085 | gun-16 | `m1:16:a2.b1.ay1.opt2` | `opts` | öğlen | GEÇTİ |
| 16-086 | gun-16 | `m1:16:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 16-087 | gun-16 | `m1:16:a2.b1.d5` | `gorev_tr` | Anonsta ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 16-088 | gun-16 | `m1:16:a2:c1` | `situation_tr` | Arkadaşın telefonda soruyor. Paltolar bugün ucuz, elli euro. | GEÇTİ |
| 16-089 | gun-16 | `m1:16:a2:c1` | `why_tr` | Soru **Sind** ile başlıyor. Cevaba **Ja** ile başla, sonra fiyatı söyle. | GEÇTİ |
| 16-090 | gun-16 | `m1:16:a2:e1` | `q_tr` | Ucuz bir palto istiyorsun. Ne yapmalısın? | GEÇTİ |
| 16-091 | gun-16 | `m1:16:a2:e1.opt0` | `opts` | Bugün akşam sekizden önce al. | GEÇTİ |
| 16-092 | gun-16 | `m1:16:a2:e1.opt1` | `opts` | Yarın gel. | GEÇTİ |
| 16-093 | gun-16 | `m1:16:a2:e1.opt2` | `opts` | Pazartesiyi bekle. | GEÇTİ |
| 16-094 | gun-16 | `m1:16:a2:e1` | `why_tr` | Paltolar bugün ucuz. Akşam sekizde her yer kapanıyor. | GEÇTİ |
| 16-095 | gun-16 | `m1:16:p1` | `durum_tr` | Huber Hanım adının ve adresinin yazılışını soruyor. Onu geri arıyorsun. Adresin Brunnengasse 7. | GEÇTİ |
| 16-096 | gun-16 | `m1:16:p1.n1.s0` | `geri_bildirim_tr` | Çok iyi. Önce selam, sonra **hier ist** ve adın. | GEÇTİ |
| 16-097 | gun-16 | `m1:16:p1.n1.s1` | `geri_bildirim_tr` | Arayan sensin. Önce kendini tanıt: **hier ist** ve adın. | GEÇTİ |
| 16-098 | gun-16 | `m1:16:p1.n2.s0` | `geri_bildirim_tr` | Doğru. Sonra adını harf harf, yavaşça söylersin. | GEÇTİ |
| 16-099 | gun-16 | `m1:16:p1.n2.s1` | `geri_bildirim_tr` | Adını biliyor, yazılışını soruyor. **Ich buchstabiere** de. | GEÇTİ |
| 16-100 | gun-16 | `m1:16:p1.n3.s0` | `geri_bildirim_tr` | Adresi tekrar ettin. Huber Hanım emin olur. | GEÇTİ |
| 16-101 | gun-16 | `m1:16:p1.n3.s1` | `geri_bildirim_tr` | Senin evin Brunnengasse 7. **sieben** de. | GEÇTİ |
| 16-102 | gun-16 | `m1:16:p1.n4.s0` | `geri_bildirim_tr` | Harfi bir adla söyledin. Telefonda en güvenli yol bu. | GEÇTİ |
| 16-103 | gun-16 | `m1:16:p1.n4.s1` | `geri_bildirim_tr` | Brunnengasse **B** ile başlar. **B wie Berta** de. | GEÇTİ |
| 16-104 | gun-16 | `m1:16:p1.n5.s0` | `geri_bildirim_tr` | Doğru. **Brunnen** kelimesinde iki **N** var. | GEÇTİ |
| 16-105 | gun-16 | `m1:16:p1.n5.s1` | `geri_bildirim_tr` | **Brunnen** kelimesinde iki **N** var. **Ja, mit Doppel-N** de. | GEÇTİ |
| 16-106 | gun-16 | `m1:16:p1.n6.s0` | `geri_bildirim_tr` | Telefonda **Auf Wiederhören** dersin. Çok doğal oldu. | GEÇTİ |
| 16-107 | gun-16 | `m1:16:p1.n6.s1` | `geri_bildirim_tr` | **Hallo** selamdır. Telefonu kapatırken **Auf Wiederhören** dersin. | GEÇTİ |
| 16-108 | gun-16 | `m1:16:p1` | `kapanis_tr` | Telefonda kendini tanıttın, adını ve sokağını harf harf doğruladın. | GEÇTİ |
| 16-109 | gun-16 | `m1:16:o1` | `q_tr` | Brandl Hanım notta ne yazıyor? | GEÇTİ |
| 16-110 | gun-16 | `m1:16:o1.opt0` | `opts` | Eski eşyalarını ucuza veriyor | GEÇTİ |
| 16-111 | gun-16 | `m1:16:o1.opt1` | `opts` | Taşınıyor | GEÇTİ |
| 16-112 | gun-16 | `m1:16:o1.opt2` | `opts` | Bir hediye arıyor | GEÇTİ |
| 16-113 | gun-16 | `m1:16:o2` | `q_tr` | Bir sandalye kaç euro? | GEÇTİ |
| 16-114 | gun-16 | `m1:16:o2.opt0` | `opts` | beş | GEÇTİ |
| 16-115 | gun-16 | `m1:16:o2.opt1` | `opts` | yirmi | GEÇTİ |
| 16-116 | gun-16 | `m1:16:o2.opt2` | `opts` | on | GEÇTİ |
| 16-117 | gun-16 | `m1:16:o3` | `q_tr` | Palto nasıl? | GEÇTİ |
| 16-118 | gun-16 | `m1:16:o3.opt0` | `opts` | açık renk ve sıcak | GEÇTİ |
| 16-119 | gun-16 | `m1:16:o3.opt1` | `opts` | koyu ve ince | GEÇTİ |
| 16-120 | gun-16 | `m1:16:o3.opt2` | `opts` | yeni ve pahalı | GEÇTİ |
| 16-121 | gun-16 | `m1:16:o4` | `q_tr` | Brandl Hanım ne zaman evde? | GEÇTİ |
| 16-122 | gun-16 | `m1:16:o4.opt0` | `opts` | cumartesi | GEÇTİ |
| 16-123 | gun-16 | `m1:16:o4.opt1` | `opts` | pazar | GEÇTİ |
| 16-124 | gun-16 | `m1:16:o4.opt2` | `opts` | cuma | GEÇTİ |
| 16-125 | gun-16 | `m1:16:o5` | `situation_tr` | Brandl Hanım'ı arıyorsun. Kendini tanıt ve palto hâlâ duruyor mu diye sor. | GEÇTİ |
| 16-126 | gun-16 | `m1:16:o5` | `why_tr` | Önce **hier ist** ve adın. Sonra soruyu **Haben Sie** ile başlat. | GEÇTİ |
| 16-127 | gun-16 | `g16.yazma` | `gorev_tr` | Brandl Hanım'a kısa bir mesaj yaz. Kendini tanıt, dolabı sor ve ne zaman geleceğini yaz. | GEÇTİ |
| 16-128 | gun-16 | `g16.yazma.k0` | `kontrol_tr` | Kendini **hier ist** ile tanıttın mı? | GEÇTİ |
| 16-129 | gun-16 | `g16.yazma.k1` | `kontrol_tr` | Soruyu **Ist** ile başlattın mı? | GEÇTİ |
| 16-130 | gun-16 | `g16.yazma.k2` | `kontrol_tr` | Ne zaman geleceğini yazdın mı? | GEÇTİ |
| 16-131 | gun-16 | `m1:16:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 16-132 | gun-16 | `m1:16:s1` | `why_tr` | **Wie schreibt man** bir kelimenin nasıl yazıldığını sorar. | GEÇTİ |
| 16-133 | gun-16 | `m1:16:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 16-134 | gun-16 | `m1:16:s2` | `why_tr` | **hell** açık renk, **billig** ucuz demektir. | GEÇTİ |
| 16-135 | gun-16 | `m1:16:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 16-136 | gun-16 | `m1:16:s3` | `why_tr` | **B wie Berta** harfi bir adla netleştirir. | GEÇTİ |
| 16-137 | gun-16 | `m1:16:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 16-138 | gun-16 | `m1:16:s4` | `why_tr` | **Kleid** elbise demektir. | GEÇTİ |
| 16-139 | gun-16 | `m1:16:s5` | `why_tr` | Telefonda kendini **hier ist** ve adınla tanıtırsın. | GEÇTİ |
| 16-140 | gun-16 | `m1:16:s6` | `why_tr` | Harf harf söylemek **buchstabieren** demektir. | GEÇTİ |
| 16-141 | gun-16 | `m1:16:s7` | `why_tr` | Açık renk **hell**, ucuz **billig** demektir. | GEÇTİ |
| 16-142 | gun-16 | `m1:16:s8` | `why_tr` | Telefonda vedalaşırken **Auf Wiederhören** dersin. | GEÇTİ |
| 16-143 | gun-16 | `m1:16:s9` | `situation_tr` | Satıcı ayırttığın ceket için kimin adına diye soruyor. | GEÇTİ |
| 16-144 | gun-16 | `m1:16:s9` | `why_tr` | Kimin adına sorusuna **Auf den Namen** ve adınla cevap verirsin. | GEÇTİ |
| 16-145 | gun-16 | `m1:16:s10` | `situation_tr` | Huber Hanım sokağının ilk harfini soruyor. Brunnengasse'nin ilk harfini bir adla söyle. | GEÇTİ |
| 16-146 | gun-16 | `m1:16:s10` | `why_tr` | Telefonda harfi bir adla söylersin: **B wie Berta** ya da **B wie Berlin**. | GEÇTİ |
| 16-147 | gun-16 | `m1:16:s11` | `situation_tr` | Bir dükkânı arıyorsun. Kendini tanıt ve gömlek hâlâ duruyor mu diye sor. | GEÇTİ |
| 16-148 | gun-16 | `m1:16:s11` | `why_tr` | Önce **hier ist** ve adın. Sonra **Ist das Hemd noch da?** diye sor. | GEÇTİ |
| 17-001 | gun-17 | `g17` | `goal_tr` | Telefonda anlamadığında kibarca tekrar istersin, aktarılmayı ve geri aranmayı rica edersin. | GEÇTİ |
| 17-002 | gun-17 | `g17` | `can_do.tr` | Anlamadığımda kibarca tekrar etmesini isterim. | GEÇTİ |
| 17-003 | gun-17 | `m1:17:h1.kalip0` | `kaliplar.tr` | … -abilir misiniz? (kibar) | GEÇTİ |
| 17-004 | gun-17 | `m1:17:h1.kalip1` | `kaliplar.tr` | Bir dakika, bağlıyorum. | GEÇTİ |
| 17-005 | gun-17 | `m1:17:h1.sahne` | `ortam_tr` | Telefon. Belediyedeki Bürgerbüro'yu arıyorsun. Schneider Hanım çok meşgul. | GEÇTİ |
| 17-006 | gun-17 | `m1:17:h1.soru` | `q_tr` | Schneider Hanım ne zaman geri arıyor? | GEÇTİ |
| 17-007 | gun-17 | `m1:17:h1.soru.opt0` | `opts` | Bugün saat üçte | GEÇTİ |
| 17-008 | gun-17 | `m1:17:h1.soru.opt1` | `opts` | Yarın | GEÇTİ |
| 17-009 | gun-17 | `m1:17:h1.soru.opt2` | `opts` | Pazartesi | GEÇTİ |
| 17-010 | gun-17 | `m1:17:h1.soru.opt3` | `opts` | Hemen şimdi | GEÇTİ |
| 17-011 | gun-17 | `m1:17:h2.kalip0` | `kaliplar.tr` | Lütfen telefonu kapatmayın. | GEÇTİ |
| 17-012 | gun-17 | `m1:17:h2.kalip1` | `kaliplar.tr` | evde | GEÇTİ |
| 17-013 | gun-17 | `m1:17:h2.kalip2` | `kaliplar.tr` | Telefonda: hoşça kalın! | GEÇTİ |
| 17-014 | gun-17 | `m1:17:h2.sahne` | `ortam_tr` | Telefon. Schneider Hanım'ı arıyorsun ama telesekreter açılıyor. | GEÇTİ |
| 17-015 | gun-17 | `m1:17:h2.soru` | `q_tr` | Schneider Hanım ne zaman dönüyor? | GEÇTİ |
| 17-016 | gun-17 | `m1:17:h2.soru.opt0` | `opts` | Salı | GEÇTİ |
| 17-017 | gun-17 | `m1:17:h2.soru.opt1` | `opts` | Pazartesi | GEÇTİ |
| 17-018 | gun-17 | `m1:17:h2.soru.opt2` | `opts` | Cuma | GEÇTİ |
| 17-019 | gun-17 | `m1:17:h2.soru.opt3` | `opts` | Bugün | GEÇTİ |
| 17-020 | gun-17 | `m1:17:h3.kalip0` | `kaliplar.tr` | … lazım mı? | GEÇTİ |
| 17-021 | gun-17 | `m1:17:h3.sahne` | `ortam_tr` | Akşam kursu. Ioana çantasından kimliğini çıkarıyor. | GEÇTİ |
| 17-022 | gun-17 | `m1:17:h3.soru` | `q_tr` | Ioana sınava ne getirmeli? | GEÇTİ |
| 17-023 | gun-17 | `m1:17:h3.soru.opt0` | `opts` | Kimliğini | GEÇTİ |
| 17-024 | gun-17 | `m1:17:h3.soru.opt1` | `opts` | Ödevini | GEÇTİ |
| 17-025 | gun-17 | `m1:17:h3.soru.opt2` | `opts` | Bisikletini | GEÇTİ |
| 17-026 | gun-17 | `m1:17:h3.soru.opt3` | `opts` | Bir hediye | GEÇTİ |
| 17-027 | gun-17 | `m1:17:h4.kalip0` | `kaliplar.tr` | istasyonda – cuma günü | GEÇTİ |
| 17-028 | gun-17 | `m1:17:h4.sahne` | `ortam_tr` | Telefon. Ioana ilk kez otobüsle sana geliyor. | GEÇTİ |
| 17-029 | gun-17 | `m1:17:h4.soru` | `q_tr` | Ioana nerede inmeli? | GEÇTİ |
| 17-030 | gun-17 | `m1:17:h4.soru.opt0` | `opts` | Meydanda | GEÇTİ |
| 17-031 | gun-17 | `m1:17:h4.soru.opt1` | `opts` | İstasyonda | GEÇTİ |
| 17-032 | gun-17 | `m1:17:h4.soru.opt2` | `opts` | Evin önünde | GEÇTİ |
| 17-033 | gun-17 | `m1:17:h4.soru.opt3` | `opts` | Muayenehanede | GEÇTİ |
| 17-034 | gun-17 | `m1:17:v1.b1.ana` | `q_tr` | Ioana neden arıyor? | GEÇTİ |
| 17-035 | gun-17 | `m1:17:v1.b1.ana.opt0` | `opts` | Yeni kimlik için | GEÇTİ |
| 17-036 | gun-17 | `m1:17:v1.b1.ana.opt1` | `opts` | Sınavı iptal etmek için | GEÇTİ |
| 17-037 | gun-17 | `m1:17:v1.b1.ana.opt2` | `opts` | Bisikleti için | GEÇTİ |
| 17-038 | gun-17 | `m1:17:v1.b1.ay0` | `q_tr` | Ioana Schneider Hanım'dan ne istiyor? | GEÇTİ |
| 17-039 | gun-17 | `m1:17:v1.b1.ay0.opt0` | `opts` | Tekrar etmesini ve yavaş konuşmasını | GEÇTİ |
| 17-040 | gun-17 | `m1:17:v1.b1.ay0.opt1` | `opts` | Onu geri aramasını | GEÇTİ |
| 17-041 | gun-17 | `m1:17:v1.b1.ay0.opt2` | `opts` | Adını harf harf söylemesini | GEÇTİ |
| 17-042 | gun-17 | `m1:17:v1.b1.ay1` | `q_tr` | Ioana'nın randevusu ne zaman? | GEÇTİ |
| 17-043 | gun-17 | `m1:17:v1.b1.ay1.opt0` | `opts` | perşembe sekiz buçukta | GEÇTİ |
| 17-044 | gun-17 | `m1:17:v1.b1.ay1.opt1` | `opts` | cuma dokuzda | GEÇTİ |
| 17-045 | gun-17 | `m1:17:v1.b1.ay1.opt2` | `opts` | perşembe dokuz buçukta | GEÇTİ |
| 17-046 | gun-17 | `m1:17:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 17-047 | gun-17 | `m1:17:v1.b1.d5` | `gorev_tr` | Sahnede duyduklarını Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 17-048 | gun-17 | `m1:17:v1:c1` | `situation_tr` | Schneider Hanım sana da çok hızlı bir saat söylüyor. Anlamadın. Kibarca tekrar etmesini iste. | GEÇTİ |
| 17-049 | gun-17 | `m1:17:v1:c1` | `why_tr` | Kibar rica **Könnten Sie** ile başlar. **wiederholen** en sona gider. | GEÇTİ |
| 17-050 | gun-17 | `m1:17:a1` | `ortam_tr` | Telefonunda Pichler Bey'den bir mesaj var. Çok hızlı konuşuyor. | GEÇTİ |
| 17-051 | gun-17 | `m1:17:a1.b1.ana` | `q_tr` | Pichler Bey neden arıyor? | GEÇTİ |
| 17-052 | gun-17 | `m1:17:a1.b1.ana.opt0` | `opts` | Yarın mutfakta bir şey tamir etmeye geliyor | GEÇTİ |
| 17-053 | gun-17 | `m1:17:a1.b1.ana.opt1` | `opts` | Kira istiyor | GEÇTİ |
| 17-054 | gun-17 | `m1:17:a1.b1.ana.opt2` | `opts` | Bisikletini soruyor | GEÇTİ |
| 17-055 | gun-17 | `m1:17:a1.b1.ay0` | `q_tr` | Pichler Bey yarın saat kaçta geliyor? | GEÇTİ |
| 17-056 | gun-17 | `m1:17:a1.b1.ay0.opt0` | `opts` | sekizi çeyrek geçe | GEÇTİ |
| 17-057 | gun-17 | `m1:17:a1.b1.ay0.opt1` | `opts` | sekizde | GEÇTİ |
| 17-058 | gun-17 | `m1:17:a1.b1.ay0.opt2` | `opts` | sekiz buçukta | GEÇTİ |
| 17-059 | gun-17 | `m1:17:a1.b1.ay1` | `q_tr` | Pichler Bey senden ne istiyor? | GEÇTİ |
| 17-060 | gun-17 | `m1:17:a1.b1.ay1.opt0` | `opts` | Bugün geri aramanı | GEÇTİ |
| 17-061 | gun-17 | `m1:17:a1.b1.ay1.opt1` | `opts` | Yarın ona gelmeni | GEÇTİ |
| 17-062 | gun-17 | `m1:17:a1.b1.ay1.opt2` | `opts` | Mutfağı temizlemeni | GEÇTİ |
| 17-063 | gun-17 | `m1:17:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 17-064 | gun-17 | `m1:17:a1.b1.d5` | `gorev_tr` | Mesajda ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 17-065 | gun-17 | `m1:17:a1:c1` | `situation_tr` | Pichler Bey'i geri arıyorsun. Saati anlamadın. Kendini tanıt ve kibarca tekrar etmesini iste. | GEÇTİ |
| 17-066 | gun-17 | `m1:17:a1:c1` | `why_tr` | Önce **hier ist** ve adın. Sonra **Könnten Sie die Uhrzeit wiederholen?** de. | GEÇTİ |
| 17-067 | gun-17 | `m1:17:a1:e1` | `q_tr` | Ne yapmalısın? | GEÇTİ |
| 17-068 | gun-17 | `m1:17:a1:e1.opt0` | `opts` | Bugün Pichler Bey'i geri ara. | GEÇTİ |
| 17-069 | gun-17 | `m1:17:a1:e1.opt1` | `opts` | Yarın sabah sekizde evden çık. | GEÇTİ |
| 17-070 | gun-17 | `m1:17:a1:e1.opt2` | `opts` | Mutfakta bir şey tamir et. | GEÇTİ |
| 17-071 | gun-17 | `m1:17:a1:e1` | `why_tr` | Pichler Bey bugün geri aramanı istiyor. | GEÇTİ |
| 17-072 | gun-17 | `m1:17:a2` | `ortam_tr` | Bürgerbüro'da Schneider Hanım'ı arıyorsun. Telesekreter açılıyor. | GEÇTİ |
| 17-073 | gun-17 | `m1:17:a2.b1.ana` | `q_tr` | Kayıt ne söylüyor? | GEÇTİ |
| 17-074 | gun-17 | `m1:17:a2.b1.ana.opt0` | `opts` | Schneider Hanım bugün ofiste değil | GEÇTİ |
| 17-075 | gun-17 | `m1:17:a2.b1.ana.opt1` | `opts` | Bürgerbüro taşındı | GEÇTİ |
| 17-076 | gun-17 | `m1:17:a2.b1.ana.opt2` | `opts` | Kimliğin hazır | GEÇTİ |
| 17-077 | gun-17 | `m1:17:a2.b1.ay0` | `q_tr` | Schneider Hanım ne zaman dönüyor? | GEÇTİ |
| 17-078 | gun-17 | `m1:17:a2.b1.ay0.opt0` | `opts` | çarşamba | GEÇTİ |
| 17-079 | gun-17 | `m1:17:a2.b1.ay0.opt1` | `opts` | pazartesi | GEÇTİ |
| 17-080 | gun-17 | `m1:17:a2.b1.ay0.opt2` | `opts` | cuma | GEÇTİ |
| 17-081 | gun-17 | `m1:17:a2.b1.ay1` | `q_tr` | Kimlik için hangi dahili numarayı aramalısın? | GEÇTİ |
| 17-082 | gun-17 | `m1:17:a2.b1.ay1.opt0` | `opts` | on iki | GEÇTİ |
| 17-083 | gun-17 | `m1:17:a2.b1.ay1.opt1` | `opts` | yirmi | GEÇTİ |
| 17-084 | gun-17 | `m1:17:a2.b1.ay1.opt2` | `opts` | iki | GEÇTİ |
| 17-085 | gun-17 | `m1:17:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 17-086 | gun-17 | `m1:17:a2.b1.d5` | `gorev_tr` | Kayıtta ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 17-087 | gun-17 | `m1:17:a2:c1` | `situation_tr` | Kayıttan sonra mesaj bırakıyorsun. Kendini tanıt ve çarşamba günü geri aranmak istediğini kibarca söyle. | GEÇTİ |
| 17-088 | gun-17 | `m1:17:a2:c1` | `why_tr` | Önce **hier ist** ve adın. Sonra **Könnten Sie mich** ile kibarca rica et. | GEÇTİ |
| 17-089 | gun-17 | `m1:17:a2:e1` | `q_tr` | Kimliğin için bugün biriyle konuşmak istiyorsun. Ne yapmalısın? | GEÇTİ |
| 17-090 | gun-17 | `m1:17:a2:e1.opt0` | `opts` | On iki numaralı dahili hattı ara. | GEÇTİ |
| 17-091 | gun-17 | `m1:17:a2:e1.opt1` | `opts` | Çarşambayı bekle. | GEÇTİ |
| 17-092 | gun-17 | `m1:17:a2:e1.opt2` | `opts` | Telefonu kapat, yarın Bürgerbüro'ya git. | GEÇTİ |
| 17-093 | gun-17 | `m1:17:a2:e1` | `why_tr` | Kimlik için dahili numara on iki. Schneider Hanım bugün yok. | GEÇTİ |
| 17-094 | gun-17 | `m1:17:p1` | `durum_tr` | Yeni kimlik için randevu almak istiyorsun. Bürgerbüro'yu arıyorsun, Schneider Hanım açıyor ve çok hızlı konuşuyor. | GEÇTİ |
| 17-095 | gun-17 | `m1:17:p1.n1.s0` | `geri_bildirim_tr` | Çok iyi. Kendini tanıttın ve ne istediğini kısaca söyledin. | GEÇTİ |
| 17-096 | gun-17 | `m1:17:p1.n1.s1` | `geri_bildirim_tr` | Tek kelime kaba duyulur. Önce **hier ist** ve adın, sonra isteğin. | GEÇTİ |
| 17-097 | gun-17 | `m1:17:p1.n2.s0` | `geri_bildirim_tr` | Çok kibar. Anlamadığında **Könnten Sie das wiederholen?** dersin. | GEÇTİ |
| 17-098 | gun-17 | `m1:17:p1.n2.s1` | `geri_bildirim_tr` | Perşembe sekiz buçuk, cuma on bir. İkisini karıştırdın. Tekrar iste. | GEÇTİ |
| 17-099 | gun-17 | `m1:17:p1.n2.s2` | `geri_bildirim_tr` | Anlamadan evet deme. Kibarca **Könnten Sie das wiederholen?** de. | GEÇTİ |
| 17-100 | gun-17 | `m1:17:p1.n3.s0` | `geri_bildirim_tr` | Günü ve saati birlikte söyledin. Yanlış anlama kalmadı. | GEÇTİ |
| 17-101 | gun-17 | `m1:17:p1.n3.s1` | `geri_bildirim_tr` | Günü ve saati birlikte söyledin. Yanlış anlama kalmadı. | GEÇTİ |
| 17-102 | gun-17 | `m1:17:p1.n4.s0` | `geri_bildirim_tr` | Akıllıca. Bir daha ararken santrali beklemezsin. | GEÇTİ |
| 17-103 | gun-17 | `m1:17:p1.n4.s1` | `geri_bildirim_tr` | Kısa ve kibar bir onay. | GEÇTİ |
| 17-104 | gun-17 | `m1:17:p1.n5.s0` | `geri_bildirim_tr` | Numarayı tekrar ettin. Telefonda en güvenli yol bu. | GEÇTİ |
| 17-105 | gun-17 | `m1:17:p1.n5.s1` | `geri_bildirim_tr` | Son rakam **null**, yani sıfır. Bir daha dinle. | GEÇTİ |
| 17-106 | gun-17 | `m1:17:p1.n6.s0` | `geri_bildirim_tr` | Telefonda doğru vedalaştın. | GEÇTİ |
| 17-107 | gun-17 | `m1:17:p1` | `kapanis_tr` | Hızlı konuşan memura kibarca tekrar ettirdin, randevuyu aldın ve dahili numarayı öğrendin. | GEÇTİ |
| 17-108 | gun-17 | `m1:17:o1` | `q_tr` | Tobi'nin notu ne söylüyor? | GEÇTİ |
| 17-109 | gun-17 | `m1:17:o1.opt0` | `opts` | Schneider Hanım'ı geri araman lazım | GEÇTİ |
| 17-110 | gun-17 | `m1:17:o1.opt1` | `opts` | Kimliğin kayboldu | GEÇTİ |
| 17-111 | gun-17 | `m1:17:o1.opt2` | `opts` | Yarın sınav var | GEÇTİ |
| 17-112 | gun-17 | `m1:17:o2` | `q_tr` | Konu ne? | GEÇTİ |
| 17-113 | gun-17 | `m1:17:o2.opt0` | `opts` | kimliğin | GEÇTİ |
| 17-114 | gun-17 | `m1:17:o2.opt1` | `opts` | bisikletin | GEÇTİ |
| 17-115 | gun-17 | `m1:17:o2.opt2` | `opts` | sınavın | GEÇTİ |
| 17-116 | gun-17 | `m1:17:o3` | `q_tr` | Ne zaman aramalısın? | GEÇTİ |
| 17-117 | gun-17 | `m1:17:o3.opt0` | `opts` | bugün öğleden sonra | GEÇTİ |
| 17-118 | gun-17 | `m1:17:o3.opt1` | `opts` | yarın sabah | GEÇTİ |
| 17-119 | gun-17 | `m1:17:o3.opt2` | `opts` | cuma günü | GEÇTİ |
| 17-120 | gun-17 | `m1:17:o4` | `q_tr` | Dahili numara ne? | GEÇTİ |
| 17-121 | gun-17 | `m1:17:o4.opt0` | `opts` | iki, dört | GEÇTİ |
| 17-122 | gun-17 | `m1:17:o4.opt1` | `opts` | dört, iki | GEÇTİ |
| 17-123 | gun-17 | `m1:17:o4.opt2` | `opts` | on dört | GEÇTİ |
| 17-124 | gun-17 | `m1:17:o5` | `situation_tr` | Schneider Hanım'ı geri arıyorsun. O açıyor. Kendini tanıt ve onun seni aradığını söyle. | GERİ |
| 17-125 | gun-17 | `m1:17:o5` | `why_tr` | Önce **hier ist** ve adın. Sonra neden aradığını kısaca söyle. | GEÇTİ |
| 17-126 | gun-17 | `m1:17:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 17-127 | gun-17 | `m1:17:s1` | `why_tr` | **Könnten Sie** kibar bir ricadır. | GEÇTİ |
| 17-128 | gun-17 | `m1:17:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 17-129 | gun-17 | `m1:17:s2` | `why_tr` | **ich verbinde** sizi bağlıyorum demektir. | GEÇTİ |
| 17-130 | gun-17 | `m1:17:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 17-131 | gun-17 | `m1:17:s3` | `why_tr` | **zurück** geri, dönmüş demektir. | GEÇTİ |
| 17-132 | gun-17 | `m1:17:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 17-133 | gun-17 | `m1:17:s4` | `why_tr` | **aussteigen** inmek demektir. | GEÇTİ |
| 17-134 | gun-17 | `m1:17:s5` | `why_tr` | Kibar ricada **Könnten Sie** başa gelir, **zurückrufen** sona gider. | GEÇTİ |
| 17-135 | gun-17 | `m1:17:s6` | `why_tr` | **Könnten Sie** ile başla, **sprechen** en sona gelir. | GEÇTİ |
| 17-136 | gun-17 | `m1:17:s7` | `why_tr` | Bir şey lazım mı diye sorarken **Brauche ich** dersin. | GEÇTİ |
| 17-137 | gun-17 | `m1:17:s8` | `why_tr` | Telefonu kapatmak **auflegen** demektir. | GERİ |
| 17-138 | gun-17 | `m1:17:s9` | `situation_tr` | Santral Schneider Hanım'ın yerinde olmadığını söylüyor. Geri aranmak istiyorsun. | GEÇTİ |
| 17-139 | gun-17 | `m1:17:s9` | `why_tr` | **Rückruf** geri arama demektir. Cevaba **Ja, bitte** ile başla. | GEÇTİ |
| 17-140 | gun-17 | `m1:17:s10` | `situation_tr` | Pichler Bey çok hızlı bir saat söyledi. Anlamadın. Kibarca tekrar etmesini iste. | GEÇTİ |
| 17-141 | gun-17 | `m1:17:s10` | `why_tr` | Anlamadığında **Könnten Sie das wiederholen?** dersin. | GEÇTİ |
| 17-142 | gun-17 | `m1:17:s11` | `situation_tr` | Belediye santralini arıyorsun. Kendini tanıt ve kibarca Schneider Hanım'a bağlanmak iste. | GEÇTİ |
| 17-143 | gun-17 | `m1:17:s11` | `why_tr` | Önce **hier ist** ve adın. Sonra **Könnten Sie mich mit** ve kişinin adı. | GERİ |
| 18-001 | gun-18 | `g18` | `goal_tr` | Kuaförden randevu alırken günü, saati ve ayı um, am, im ile söyler, açılış saatlerini anlarsın. | GERİ |
| 18-002 | gun-18 | `g18` | `can_do.tr` | Bir şeyin ne zaman olduğunu um, am, im ile söylerim. | GEÇTİ |
| 18-003 | gun-18 | `m1:18:h1.kalip0` | `kaliplar.tr` | Luka'nın kuaför salonunun adı | GEÇTİ |
| 18-004 | gun-18 | `m1:18:h1.kalip1` | `kaliplar.tr` | Ne oldu? – Ne oldu ki? | GEÇTİ |
| 18-005 | gun-18 | `m1:18:h1.sahne` | `ortam_tr` | Kurs arası. Telefon kulağında, bekliyorsun. Ioana yanına geliyor. | GEÇTİ |
| 18-006 | gun-18 | `m1:18:h1.soru` | `q_tr` | Ioana, Luka'yı arayınca ne olduğunu söylüyor? | GEÇTİ |
| 18-007 | gun-18 | `m1:18:h1.soru.opt0` | `opts` | Hep uzun beklersin. | GEÇTİ |
| 18-008 | gun-18 | `m1:18:h1.soru.opt1` | `opts` | Luka hiç açmaz. | GEÇTİ |
| 18-009 | gun-18 | `m1:18:h1.soru.opt2` | `opts` | Salon bugün kapalı. | GEÇTİ |
| 18-010 | gun-18 | `m1:18:h1.soru.opt3` | `opts` | Luka hemen açar. | GEÇTİ |
| 18-011 | gun-18 | `m1:18:h2.kalip0` | `kaliplar.tr` | Sanırım … – Sence … mı? | GEÇTİ |
| 18-012 | gun-18 | `m1:18:h2.kalip1` | `kaliplar.tr` | başka bir gün – başka bir randevu | GEÇTİ |
| 18-013 | gun-18 | `m1:18:h2.kalip2` | `kaliplar.tr` | …'i bulamıyorum. – …'i nasıl buluyorsun? | GEÇTİ |
| 18-014 | gun-18 | `m1:18:h2.kalip3` | `kaliplar.tr` | … yaşıyor. – … yaşıyor musun? | GEÇTİ |
| 18-015 | gun-18 | `m1:18:h2.kalip4` | `kaliplar.tr` | … -abilir misiniz? | GEÇTİ |
| 18-016 | gun-18 | `m1:18:h2.sahne` | `ortam_tr` | Sonunda Luka telefonu açtı. Cuma günü için soruyorsun. | GEÇTİ |
| 18-017 | gun-18 | `m1:18:h2.soru` | `q_tr` | Luka hangi günün olabileceğini düşünüyor? | GEÇTİ |
| 18-018 | gun-18 | `m1:18:h2.soru.opt0` | `opts` | Cuma | GEÇTİ |
| 18-019 | gun-18 | `m1:18:h2.soru.opt1` | `opts` | Pazartesi | GEÇTİ |
| 18-020 | gun-18 | `m1:18:h2.soru.opt2` | `opts` | Cumartesi | GEÇTİ |
| 18-021 | gun-18 | `m1:18:h3.kalip0` | `kaliplar.tr` | … günü saat …'de – … ayında | GEÇTİ |
| 18-022 | gun-18 | `m1:18:h3.kalip1` | `kaliplar.tr` | …'den …'e kadar – …'den itibaren | GEÇTİ |
| 18-023 | gun-18 | `m1:18:h3.sahne` | `ortam_tr` | Luka randevu defterine bakıyor. Saati birlikte ayarlıyorsunuz. | GEÇTİ |
| 18-024 | gun-18 | `m1:18:h3.soru` | `q_tr` | Randevu sonunda saat kaçta? | GEÇTİ |
| 18-025 | gun-18 | `m1:18:h3.soru.opt0` | `opts` | İki buçukta | GEÇTİ |
| 18-026 | gun-18 | `m1:18:h3.soru.opt1` | `opts` | Üç buçukta | GEÇTİ |
| 18-027 | gun-18 | `m1:18:h3.soru.opt2` | `opts` | Saat ikide | GEÇTİ |
| 18-028 | gun-18 | `m1:18:v1.b1.ana` | `q_tr` | Ioana, Luka'dan ne istiyor? | GEÇTİ |
| 18-029 | gun-18 | `m1:18:v1.b1.ana.opt0` | `opts` | Bir randevu | GEÇTİ |
| 18-030 | gun-18 | `m1:18:v1.b1.ana.opt1` | `opts` | Bir iş | GEÇTİ |
| 18-031 | gun-18 | `m1:18:v1.b1.ana.opt2` | `opts` | Luka'nın telefon numarasını | GEÇTİ |
| 18-032 | gun-18 | `m1:18:v1.b1.ay0` | `q_tr` | Ioana'nın randevusu ne zaman? | GEÇTİ |
| 18-033 | gun-18 | `m1:18:v1.b1.ay0.opt0` | `opts` | Cuma, saat dörtte | GEÇTİ |
| 18-034 | gun-18 | `m1:18:v1.b1.ay0.opt1` | `opts` | Pazartesi, iki buçukta | GEÇTİ |
| 18-035 | gun-18 | `m1:18:v1.b1.ay0.opt2` | `opts` | Cumartesi, saat on ikide | GEÇTİ |
| 18-036 | gun-18 | `m1:18:v1.b1.ay1` | `q_tr` | Luka ne zaman izinde? | GEÇTİ |
| 18-037 | gun-18 | `m1:18:v1.b1.ay1.opt0` | `opts` | Aralıkta | GEÇTİ |
| 18-038 | gun-18 | `m1:18:v1.b1.ay1.opt1` | `opts` | Ocakta | GEÇTİ |
| 18-039 | gun-18 | `m1:18:v1.b1.ay1.opt2` | `opts` | Cumartesi | GEÇTİ |
| 18-040 | gun-18 | `m1:18:v1.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 18-041 | gun-18 | `m1:18:v1.b1.d5` | `gorev_tr` | Ioana'nın randevusunu Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 18-042 | gun-18 | `m1:18:v1:c1` | `situation_tr` | Luka sana da soruyor. Cuma günü saat dörtte gelebilirsin. | GEÇTİ |
| 18-043 | gun-18 | `m1:18:v1:c1` | `why_tr` | Önce günü **am** ile, sonra saati **um** ile söyle. | GEÇTİ |
| 18-044 | gun-18 | `m1:18:a1` | `ortam_tr` | Luka'nın salonunu arıyorsun. Kimse açmıyor, bu kayıt çalıyor. | GEÇTİ |
| 18-045 | gun-18 | `m1:18:a1.b1.ana` | `q_tr` | Bu kayıt ne anlatıyor? | GEÇTİ |
| 18-046 | gun-18 | `m1:18:a1.b1.ana.opt0` | `opts` | Salonun açık olduğu günleri ve saatleri | GEÇTİ |
| 18-047 | gun-18 | `m1:18:a1.b1.ana.opt1` | `opts` | Saç kesiminin fiyatını | GEÇTİ |
| 18-048 | gun-18 | `m1:18:a1.b1.ana.opt2` | `opts` | Luka'nın tatilini | GEÇTİ |
| 18-049 | gun-18 | `m1:18:a1.b1.ay0` | `q_tr` | Cumartesi salon saat kaça kadar açık? | GEÇTİ |
| 18-050 | gun-18 | `m1:18:a1.b1.ay0.opt0` | `opts` | On ikiye kadar | GEÇTİ |
| 18-051 | gun-18 | `m1:18:a1.b1.ay0.opt1` | `opts` | On sekize kadar | GEÇTİ |
| 18-052 | gun-18 | `m1:18:a1.b1.ay0.opt2` | `opts` | Sekize kadar | GEÇTİ |
| 18-053 | gun-18 | `m1:18:a1.b1.ay1` | `q_tr` | Salon hangi gün kapalı? | GEÇTİ |
| 18-054 | gun-18 | `m1:18:a1.b1.ay1.opt0` | `opts` | pazar | GEÇTİ |
| 18-055 | gun-18 | `m1:18:a1.b1.ay1.opt1` | `opts` | pazartesi | GEÇTİ |
| 18-056 | gun-18 | `m1:18:a1.b1.ay1.opt2` | `opts` | cumartesi | GEÇTİ |
| 18-057 | gun-18 | `m1:18:a1.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 18-058 | gun-18 | `m1:18:a1.b1.d5` | `gorev_tr` | Salonun ne zaman kapalı ve açık olduğunu bir iki kısa cümleyle yaz. | GEÇTİ |
| 18-059 | gun-18 | `m1:18:a1:c1` | `situation_tr` | Ioana soruyor. Salon cumartesi yalnızca saat on ikiye kadar açık. | GEÇTİ |
| 18-060 | gun-18 | `m1:18:a1:c1` | `why_tr` | Bitiş saatini **bis** ile söyle: **bis zwölf Uhr**. | GEÇTİ |
| 18-061 | gun-18 | `m1:18:a1:e1` | `q_tr` | Cumartesi öğleden sonra saçını kestirmek istiyorsun. Ne yapmalısın? | GEÇTİ |
| 18-062 | gun-18 | `m1:18:a1:e1.opt0` | `opts` | Cumartesi saat üçte salona git. | GEÇTİ |
| 18-063 | gun-18 | `m1:18:a1:e1.opt1` | `opts` | Cumartesi sabahı ya da pazartesi ile cuma arasında bir gün seç. | GEÇTİ |
| 18-064 | gun-18 | `m1:18:a1:e1.opt2` | `opts` | Pazar günü salona git. | GEÇTİ |
| 18-065 | gun-18 | `m1:18:a1:e1` | `why_tr` | Cumartesi salon yalnızca sabah açık. Pazar kapalı. | GEÇTİ |
| 18-066 | gun-18 | `m1:18:a2` | `ortam_tr` | Cuma günü saat dörtte Luka'da randevun var. Luka telefonuna mesaj bırakmış. | GEÇTİ |
| 18-067 | gun-18 | `m1:18:a2.b1.ana` | `q_tr` | Luka neden mesaj bırakıyor? | GEÇTİ |
| 18-068 | gun-18 | `m1:18:a2.b1.ana.opt0` | `opts` | Randevunu değiştirmek için | GEÇTİ |
| 18-069 | gun-18 | `m1:18:a2.b1.ana.opt1` | `opts` | Fiyatı söylemek için | GEÇTİ |
| 18-070 | gun-18 | `m1:18:a2.b1.ana.opt2` | `opts` | Seni kahveye çağırmak için | GEÇTİ |
| 18-071 | gun-18 | `m1:18:a2.b1.ay0` | `q_tr` | Luka hangi yeni zamanı öneriyor? | GEÇTİ |
| 18-072 | gun-18 | `m1:18:a2.b1.ay0.opt0` | `opts` | Cumartesi saat onda | GEÇTİ |
| 18-073 | gun-18 | `m1:18:a2.b1.ay0.opt1` | `opts` | Cuma saat dörtte | GEÇTİ |
| 18-074 | gun-18 | `m1:18:a2.b1.ay0.opt2` | `opts` | Pazartesi saat onda | GEÇTİ |
| 18-075 | gun-18 | `m1:18:a2.b1.ay1` | `q_tr` | Salıdan itibaren Luka ne zaman uygun? | GEÇTİ |
| 18-076 | gun-18 | `m1:18:a2.b1.ay1.opt0` | `opts` | Öğleden sonra | GEÇTİ |
| 18-077 | gun-18 | `m1:18:a2.b1.ay1.opt1` | `opts` | Sabah | GEÇTİ |
| 18-078 | gun-18 | `m1:18:a2.b1.ay1.opt2` | `opts` | Akşam | GEÇTİ |
| 18-079 | gun-18 | `m1:18:a2.b1.d1` | `q_tr` | Hangi günü duydun? | GEÇTİ |
| 18-080 | gun-18 | `m1:18:a2.b1.d5` | `gorev_tr` | Luka'nın mesajını Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 18-081 | gun-18 | `m1:18:a2:c1` | `situation_tr` | Luka'yı geri arıyorsun. Cumartesi saat on sana uyuyor. | GEÇTİ |
| 18-082 | gun-18 | `m1:18:a2:c1` | `why_tr` | Günü ve saati tekrar et. Böylece yanlış anlama kalmaz. | GEÇTİ |
| 18-083 | gun-18 | `m1:18:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 18-084 | gun-18 | `m1:18:a2:e1.opt0` | `opts` | Cuma saat dörtte yine de salona git. | GEÇTİ |
| 18-085 | gun-18 | `m1:18:a2:e1.opt1` | `opts` | Luka'yı ara, cumartesi saat onu ya da salıdan sonra bir öğleden sonrayı seç. | GEÇTİ |
| 18-086 | gun-18 | `m1:18:a2:e1.opt2` | `opts` | Bir şey yapma, randevun aynı. | GEÇTİ |
| 18-087 | gun-18 | `m1:18:a2:e1` | `why_tr` | Cuma olmuyor. Luka cumartesi saat onu ya da salıdan sonrasını öneriyor. | GEÇTİ |
| 18-088 | gun-18 | `m1:18:p1` | `durum_tr` | Salon Haarwerk'i aradın, bekleme hattında uzun bekledin. Sonunda Luka açıyor. Cuma günü saat dört senin için en iyisi. | GEÇTİ |
| 18-089 | gun-18 | `m1:18:p1.n1.s0` | `geri_bildirim_tr` | Güzel. Selam verdin, adını ve isteğini söyledin. | GEÇTİ |
| 18-090 | gun-18 | `m1:18:p1.n1.s1` | `geri_bildirim_tr` | Tek kelime sert duyulur. Önce selam ver ve adını söyle. | GEÇTİ |
| 18-091 | gun-18 | `m1:18:p1.n1b.s0` | `geri_bildirim_tr` | Şimdi oldu. Luka kimin aradığını biliyor. | GEÇTİ |
| 18-092 | gun-18 | `m1:18:p1.n2.s0` | `geri_bildirim_tr` | Doğru. Gün için **am**, saat için **um** dedin. | GEÇTİ |
| 18-093 | gun-18 | `m1:18:p1.n2.s1` | `geri_bildirim_tr` | Yer değişmiş. Gün için **am Freitag**, saat için **um vier** dersin. | GEÇTİ |
| 18-094 | gun-18 | `m1:18:p1.n2.s2` | `geri_bildirim_tr` | **im** aylar içindir. Günlerle **am** dersin: **am Freitag**. | GEÇTİ |
| 18-095 | gun-18 | `m1:18:p1.n3.s0` | `geri_bildirim_tr` | Çok iyi. Hemen başka bir gün önerdin. | GEÇTİ |
| 18-096 | gun-18 | `m1:18:p1.n3.s1` | `geri_bildirim_tr` | Kibar bir rica. Saati kaçırınca böyle sorman doğru. | GEÇTİ |
| 18-097 | gun-18 | `m1:18:p1.n3.s2` | `geri_bildirim_tr` | Luka cuma saat dördün olmadığını söyledi. Başka bir gün öner. | GEÇTİ |
| 18-098 | gun-18 | `m1:18:p1.n3b.s0` | `geri_bildirim_tr` | Saati anladın ve başka bir gün önerdin. | GEÇTİ |
| 18-099 | gun-18 | `m1:18:p1.n3b.s1` | `geri_bildirim_tr` | **bis zwei** saat ikiye kadar demek. Saat ikide Luka gidiyor. | GEÇTİ |
| 18-100 | gun-18 | `m1:18:p1.n4.s0` | `geri_bildirim_tr` | Günü ve saati tekrar ettin. Yanlış anlama kalmadı. | GEÇTİ |
| 18-101 | gun-18 | `m1:18:p1.n4.s1` | `geri_bildirim_tr` | Günlerle **am** dersin: **am Samstag um zehn**. | GEÇTİ |
| 18-102 | gun-18 | `m1:18:p1.n5.s0` | `geri_bildirim_tr` | Güzel bir kapanış. Saati bir kez daha duydun. | GERİ |
| 18-103 | gun-18 | `m1:18:p1.n5.s1` | `geri_bildirim_tr` | Randevu artık cumartesi. **bis Samstag** de. | GEÇTİ |
| 18-104 | gun-18 | `m1:18:p1` | `kapanis_tr` | Bekleme hattından sonra randevu istedin, başka bir gün önerdin ve saati doğruladın. | GEÇTİ |
| 18-105 | gun-18 | `m1:18:o1` | `q_tr` | Ioana'nın randevusu ne zaman? | GEÇTİ |
| 18-106 | gun-18 | `m1:18:o1.opt0` | `opts` | Pazartesi iki buçukta | GEÇTİ |
| 18-107 | gun-18 | `m1:18:o1.opt1` | `opts` | Pazartesi saat altıda | GEÇTİ |
| 18-108 | gun-18 | `m1:18:o1.opt2` | `opts` | Salı iki buçukta | GEÇTİ |
| 18-109 | gun-18 | `m1:18:o2` | `q_tr` | Kurs pazartesi saat kaçta? | GEÇTİ |
| 18-110 | gun-18 | `m1:18:o2.opt0` | `opts` | Altıdan sekize kadar | GEÇTİ |
| 18-111 | gun-18 | `m1:18:o2.opt1` | `opts` | İki buçuktan altıya kadar | GEÇTİ |
| 18-112 | gun-18 | `m1:18:o2.opt2` | `opts` | Sekizden ona kadar | GEÇTİ |
| 18-113 | gun-18 | `m1:18:o3` | `q_tr` | Luka ne zaman izinde? | GEÇTİ |
| 18-114 | gun-18 | `m1:18:o3.opt0` | `opts` | Ocakta | GEÇTİ |
| 18-115 | gun-18 | `m1:18:o3.opt1` | `opts` | Aralıkta | GEÇTİ |
| 18-116 | gun-18 | `m1:18:o3.opt2` | `opts` | Pazartesi | GEÇTİ |
| 18-117 | gun-18 | `g18.yazma` | `gorev_tr` | Ioana'ya cevap yaz. Senin de Luka'da randevun var: cuma günü saat dörtte. | GEÇTİ |
| 18-118 | gun-18 | `g18.yazma.k0` | `kontrol_tr` | Günü yazdın mı? | GEÇTİ |
| 18-119 | gun-18 | `g18.yazma.k1` | `kontrol_tr` | Günden önce **am** yazdın mı? | GEÇTİ |
| 18-120 | gun-18 | `g18.yazma.k2` | `kontrol_tr` | Saatten önce **um** yazdın mı? | GEÇTİ |
| 18-121 | gun-18 | `m1:18:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 18-122 | gun-18 | `m1:18:s1` | `why_tr` | **von acht bis zwölf** sekizden on ikiye kadar demektir. | GEÇTİ |
| 18-123 | gun-18 | `m1:18:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 18-124 | gun-18 | `m1:18:s2` | `why_tr` | **ab Montag** pazartesiden itibaren demektir. | GEÇTİ |
| 18-125 | gun-18 | `m1:18:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 18-126 | gun-18 | `m1:18:s3` | `why_tr` | **Ich glaube** sanırım demektir. | GEÇTİ |
| 18-127 | gun-18 | `m1:18:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 18-128 | gun-18 | `m1:18:s4` | `why_tr` | **halb drei** iki buçuk demektir, üç buçuk değil. | GEÇTİ |
| 18-129 | gun-18 | `m1:18:s5` | `why_tr` | Günden önce **am**, saatten önce **um** gelir. | GEÇTİ |
| 18-130 | gun-18 | `m1:18:s6` | `why_tr` | Aylarla **im** dersin: **im Dezember**. | GEÇTİ |
| 18-131 | gun-18 | `m1:18:s7` | `why_tr` | Başka bir gün derken **ein anderer Tag** dersin. | GEÇTİ |
| 18-132 | gun-18 | `m1:18:s8` | `why_tr` | Başlangıç **von**, bitiş **bis** ile söylenir. | GEÇTİ |
| 18-133 | gun-18 | `m1:18:s9` | `situation_tr` | Ioana neden beklediğini soruyor. Sen hâlâ Luka'nın bekleme hattındasın. | GEÇTİ |
| 18-134 | gun-18 | `m1:18:s9` | `why_tr` | Bekleme hattındayım derken **Ich bin in der Warteschleife** dersin. | GEÇTİ |
| 18-135 | gun-18 | `m1:18:s10` | `situation_tr` | Luka cumartesi saat onu soruyor. Saat on olmuyor, öğleden sonra olur. | GEÇTİ |
| 18-136 | gun-18 | `m1:18:s10` | `why_tr` | Önce olmayan saati söyle, sonra **am Nachmittag** öner. | GEÇTİ |
| 18-137 | gun-18 | `m1:18:s11` | `situation_tr` | Luka'nın salonunu arıyorsun. Selam ver, adını söyle, cuma günü saat dört için randevu iste. | GEÇTİ |
| 18-138 | gun-18 | `m1:18:s11` | `why_tr` | Önce adını söyle. Sonra günü **am** ile, saati **um** ile söyle. | GEÇTİ |
| 19-001 | gun-19 | `g19` | `goal_tr` | Kurstan sonra durakta kimin hangi dili konuştuğunu, kimin nereye gittiğini ve kimin kaldığını söylersin. | GEÇTİ |
| 19-002 | gun-19 | `g19` | `can_do.tr` | Başkasının ne yaptığını söylerim: er spricht, sie fährt. | GEÇTİ |
| 19-003 | gun-19 | `m1:19:h1.kalip0` | `kaliplar.tr` | konuşuyorum – konuşuyorsun – konuşuyor | GEÇTİ |
| 19-004 | gun-19 | `m1:19:h1.kalip1` | `kaliplar.tr` | İngilizce konuşuyor musun? – Hayır, sadece Almanca! | GEÇTİ |
| 19-005 | gun-19 | `m1:19:h1.kalip2` | `kaliplar.tr` | Derya Türkçe de konuşuyor. | GEÇTİ |
| 19-006 | gun-19 | `m1:19:h1.sahne` | `ortam_tr` | Kurs arası. Ioana iş arkadaşın Derya'dan söz ediyor. | GEÇTİ |
| 19-007 | gun-19 | `m1:19:h1.soru` | `q_tr` | Derya seninle hangi dilde konuşuyor? | GEÇTİ |
| 19-008 | gun-19 | `m1:19:h1.soru.opt0` | `opts` | Yalnızca Almanca | GEÇTİ |
| 19-009 | gun-19 | `m1:19:h1.soru.opt1` | `opts` | Türkçe | GEÇTİ |
| 19-010 | gun-19 | `m1:19:h1.soru.opt2` | `opts` | Almanca ve Türkçe | GEÇTİ |
| 19-011 | gun-19 | `m1:19:h2.kalip0` | `kaliplar.tr` | gidiyorum – gidiyorsun – gidiyor (araçla) | GEÇTİ |
| 19-012 | gun-19 | `m1:19:h2.kalip1` | `kaliplar.tr` | eve – evde | GEÇTİ |
| 19-013 | gun-19 | `m1:19:h2.kalip2` | `kaliplar.tr` | … kalıyorum – … kalıyor musun? – … kalıyor | GEÇTİ |
| 19-014 | gun-19 | `m1:19:h2.sahne` | `ortam_tr` | Kurs bitti, istasyonun önündeki durak. Basti bisikletiyle yanına geliyor. | GEÇTİ |
| 19-015 | gun-19 | `m1:19:h2.soru` | `q_tr` | Basti eve nasıl gidiyor? | GEÇTİ |
| 19-016 | gun-19 | `m1:19:h2.soru.opt0` | `opts` | Bisikletle | GEÇTİ |
| 19-017 | gun-19 | `m1:19:h2.soru.opt1` | `opts` | Otobüsle | GEÇTİ |
| 19-018 | gun-19 | `m1:19:h2.soru.opt2` | `opts` | Yürüyerek | GEÇTİ |
| 19-019 | gun-19 | `m1:19:h3.kalip0` | `kaliplar.tr` | yiyorum – yiyorsun – yiyor | GEÇTİ |
| 19-020 | gun-19 | `m1:19:h3.kalip1` | `kaliplar.tr` | görüyorum – görüyorsun – görüyor | GEÇTİ |
| 19-021 | gun-19 | `m1:19:h3.kalip2` | `kaliplar.tr` | …'i severim – …'i sever misin? | GEÇTİ |
| 19-022 | gun-19 | `m1:19:h3.sahne` | `ortam_tr` | İstasyondaki küçük büfenin vitrini. Ioana bir pastayı gösteriyor. | GEÇTİ |
| 19-023 | gun-19 | `m1:19:h3.soru` | `q_tr` | Ioana ne sıklıkla pasta yiyor? | GEÇTİ |
| 19-024 | gun-19 | `m1:19:h3.soru.opt0` | `opts` | Her gün | GEÇTİ |
| 19-025 | gun-19 | `m1:19:h3.soru.opt1` | `opts` | Hiç | GEÇTİ |
| 19-026 | gun-19 | `m1:19:h3.soru.opt2` | `opts` | Yalnızca hafta sonu | GEÇTİ |
| 19-027 | gun-19 | `m1:19:v1.b1.ana` | `q_tr` | Ioana ile Basti ne konuşuyor? | GEÇTİ |
| 19-028 | gun-19 | `m1:19:v1.b1.ana.opt0` | `opts` | Kimin nereye gittiğini ve hangi dili konuştuğunu | GEÇTİ |
| 19-029 | gun-19 | `m1:19:v1.b1.ana.opt1` | `opts` | Kursun fiyatını | GEÇTİ |
| 19-030 | gun-19 | `m1:19:v1.b1.ana.opt2` | `opts` | Hafta sonu planlarını | GEÇTİ |
| 19-031 | gun-19 | `m1:19:v1.b1.ay0` | `q_tr` | Basti şimdi ne yapıyor? | GEÇTİ |
| 19-032 | gun-19 | `m1:19:v1.b1.ay0.opt0` | `opts` | Burada kalıp bir şey yiyor | GEÇTİ |
| 19-033 | gun-19 | `m1:19:v1.b1.ay0.opt1` | `opts` | Eve gidiyor | GEÇTİ |
| 19-034 | gun-19 | `m1:19:v1.b1.ay0.opt2` | `opts` | Otobüse biniyor | GEÇTİ |
| 19-035 | gun-19 | `m1:19:v1.b1.ay1` | `q_tr` | Ioana burada hangi dili konuşuyor? | GEÇTİ |
| 19-036 | gun-19 | `m1:19:v1.b1.ay1.opt0` | `opts` | Yalnızca Almanca | GEÇTİ |
| 19-037 | gun-19 | `m1:19:v1.b1.ay1.opt1` | `opts` | Almanca ve İngilizce | GEÇTİ |
| 19-038 | gun-19 | `m1:19:v1.b1.ay1.opt2` | `opts` | Yalnızca İngilizce | GEÇTİ |
| 19-039 | gun-19 | `m1:19:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 19-040 | gun-19 | `m1:19:v1.b1.d5` | `gorev_tr` | Ioana ne yapıyor, Basti ne yapıyor? İki kısa cümleyle yaz. | GEÇTİ |
| 19-041 | gun-19 | `m1:19:v1:c1` | `situation_tr` | Basti seni de soruyor. Sen otobüsle eve gidiyorsun. | GEÇTİ |
| 19-042 | gun-19 | `m1:19:v1:c1` | `why_tr` | Soru **du fährst** ile gelir. Sen **ich fahre** dersin, harf değişmez. | GEÇTİ |
| 19-043 | gun-19 | `m1:19:a1` | `ortam_tr` | Akşam istasyonun önündesin. Hoparlörden bir anons geliyor. | GEÇTİ |
| 19-044 | gun-19 | `m1:19:a1.b1.ana` | `q_tr` | Anons ne söylüyor? | GEÇTİ |
| 19-045 | gun-19 | `m1:19:a1.b1.ana.opt0` | `opts` | Brunnenviertel otobüsü bugün daha geç kalkıyor. | GEÇTİ |
| 19-046 | gun-19 | `m1:19:a1.b1.ana.opt1` | `opts` | Bugün hiç otobüs yok. | GEÇTİ |
| 19-047 | gun-19 | `m1:19:a1.b1.ana.opt2` | `opts` | Otobüs bileti pahalandı. | GEÇTİ |
| 19-048 | gun-19 | `m1:19:a1.b1.ay0` | `q_tr` | Otobüs bugün saat kaçta kalkıyor? | GEÇTİ |
| 19-049 | gun-19 | `m1:19:a1.b1.ay0.opt0` | `opts` | Sekiz buçukta | GEÇTİ |
| 19-050 | gun-19 | `m1:19:a1.b1.ay0.opt1` | `opts` | Sekizde | GEÇTİ |
| 19-051 | gun-19 | `m1:19:a1.b1.ay0.opt2` | `opts` | Dokuzda | GEÇTİ |
| 19-052 | gun-19 | `m1:19:a1.b1.ay1` | `q_tr` | Pazartesiden itibaren otobüs saat kaçta? | GEÇTİ |
| 19-053 | gun-19 | `m1:19:a1.b1.ay1.opt0` | `opts` | Sekizde | GEÇTİ |
| 19-054 | gun-19 | `m1:19:a1.b1.ay1.opt1` | `opts` | Sekiz buçukta | GEÇTİ |
| 19-055 | gun-19 | `m1:19:a1.b1.ay1.opt2` | `opts` | Dokuz buçukta | GEÇTİ |
| 19-056 | gun-19 | `m1:19:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 19-057 | gun-19 | `m1:19:a1.b1.d5` | `gorev_tr` | Anonsu Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 19-058 | gun-19 | `m1:19:a1:c1` | `situation_tr` | Ioana anonsu duymadı, soruyor. Otobüs bugün sekiz buçukta. | GEÇTİ |
| 19-059 | gun-19 | `m1:19:a1:c1` | `why_tr` | Otobüs için **er fährt** dersin. **erst** daha geç demek. | GEÇTİ |
| 19-060 | gun-19 | `m1:19:a1:e1` | `q_tr` | Bu akşam otobüsle Brunnenviertel'e gideceksin. Ne yapmalısın? | GEÇTİ |
| 19-061 | gun-19 | `m1:19:a1:e1.opt0` | `opts` | Saat sekizdeki otobüsü bekle. | GEÇTİ |
| 19-062 | gun-19 | `m1:19:a1:e1.opt1` | `opts` | Sekiz buçuktaki otobüse bin. | GEÇTİ |
| 19-063 | gun-19 | `m1:19:a1:e1.opt2` | `opts` | Pazartesiye kadar bekle. | GEÇTİ |
| 19-064 | gun-19 | `m1:19:a1:e1` | `why_tr` | Bugün sekizde otobüs yok. Otobüs sekiz buçukta kalkıyor. | GEÇTİ |
| 19-065 | gun-19 | `m1:19:a2` | `ortam_tr` | Akşam telefonuna Basti'den bir sesli mesaj gelmiş. | GEÇTİ |
| 19-066 | gun-19 | `m1:19:a2.b1.ana` | `q_tr` | Basti neden mesaj bırakıyor? | GEÇTİ |
| 19-067 | gun-19 | `m1:19:a2.b1.ana.opt0` | `opts` | Yarın birlikte otobüsle gitmek için | GEÇTİ |
| 19-068 | gun-19 | `m1:19:a2.b1.ana.opt1` | `opts` | Bisikletini satmak için | GEÇTİ |
| 19-069 | gun-19 | `m1:19:a2.b1.ana.opt2` | `opts` | Seni yemeğe çağırmak için | GEÇTİ |
| 19-070 | gun-19 | `m1:19:a2.b1.ay0` | `q_tr` | Basti saat kaçta gidiyor? | GEÇTİ |
| 19-071 | gun-19 | `m1:19:a2.b1.ay0.opt0` | `opts` | Yediyi çeyrek geçe | GEÇTİ |
| 19-072 | gun-19 | `m1:19:a2.b1.ay0.opt1` | `opts` | Yedi buçukta | GEÇTİ |
| 19-073 | gun-19 | `m1:19:a2.b1.ay0.opt2` | `opts` | Sekizi çeyrek geçe | GEÇTİ |
| 19-074 | gun-19 | `m1:19:a2.b1.ay1` | `q_tr` | Ioana yarın ne yapıyor? | GEÇTİ |
| 19-075 | gun-19 | `m1:19:a2.b1.ay1.opt0` | `opts` | Evde kalıyor | GEÇTİ |
| 19-076 | gun-19 | `m1:19:a2.b1.ay1.opt1` | `opts` | Bisikletle gidiyor | GEÇTİ |
| 19-077 | gun-19 | `m1:19:a2.b1.ay1.opt2` | `opts` | Otobüsle geliyor | GEÇTİ |
| 19-078 | gun-19 | `m1:19:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 19-079 | gun-19 | `m1:19:a2.b1.d5` | `gorev_tr` | Basti'nin mesajını Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 19-080 | gun-19 | `m1:19:a2:c1` | `situation_tr` | Basti'ye cevap ver. Evet, sen de yarın otobüsle gidiyorsun. | GEÇTİ |
| 19-081 | gun-19 | `m1:19:a2:c1` | `why_tr` | Soru **Fährst du** ile gelir. Cevapta **ich fahre** dersin. | GEÇTİ |
| 19-082 | gun-19 | `m1:19:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 19-083 | gun-19 | `m1:19:a2:e1.opt0` | `opts` | Yarın yediyi çeyrek geçe otobüs için durakta ol. | GEÇTİ |
| 19-084 | gun-19 | `m1:19:a2:e1.opt1` | `opts` | Ioana'yla bisikletle git. | GEÇTİ |
| 19-085 | gun-19 | `m1:19:a2:e1.opt2` | `opts` | Basti'nin bisikletini tamir et. | GEÇTİ |
| 19-086 | gun-19 | `m1:19:a2:e1` | `why_tr` | Basti yarın yediyi çeyrek geçe otobüsle gidiyor ve seni soruyor. | GEÇTİ |
| 19-087 | gun-19 | `m1:19:p1` | `durum_tr` | Kurs bitti. Ioana ile istasyonun önündesiniz. Ioana kimin nereye gittiğini, kimin hangi dili konuştuğunu soruyor. | GEÇTİ |
| 19-088 | gun-19 | `m1:19:p1.n1.s0` | `geri_bildirim_tr` | Güzel. Cevap verdin ve soruyu geri sordun. | GEÇTİ |
| 19-089 | gun-19 | `m1:19:p1.n1.s1` | `geri_bildirim_tr` | Doğru. **ich** ile **fahre** dedin. | GEÇTİ |
| 19-090 | gun-19 | `m1:19:p1.n1.s2` | `geri_bildirim_tr` | **ich** ile **fahre** dersin. **fährt** yalnızca o için. | GEÇTİ |
| 19-091 | gun-19 | `m1:19:p1.n2.s0` | `geri_bildirim_tr` | Çok iyi. Basti için **er spricht** dedin. | GEÇTİ |
| 19-092 | gun-19 | `m1:19:p1.n2.s1` | `geri_bildirim_tr` | Güzel. **wir** ile fiilde harf değişmez. | GERİ |
| 19-093 | gun-19 | `m1:19:p1.n2.s2` | `geri_bildirim_tr` | **er** ile **spricht** dersin. **sprichst** yalnızca **du** için. | GEÇTİ |
| 19-094 | gun-19 | `m1:19:p1.n3.s0` | `geri_bildirim_tr` | Harika. Anlaşmanızı hatırladın. | GEÇTİ |
| 19-095 | gun-19 | `m1:19:p1.n3.s1` | `geri_bildirim_tr` | Çok iyi. **ich spreche** dedin, harf değişmedi. | GEÇTİ |
| 19-096 | gun-19 | `m1:19:p1.n3.s2` | `geri_bildirim_tr` | Anlaşmanızı hatırla. Ioana sana hemen **Nur Deutsch!** der. | GEÇTİ |
| 19-097 | gun-19 | `m1:19:p1.n4.s0` | `geri_bildirim_tr` | Doğru. **ich** ile **esse** dedin. | GEÇTİ |
| 19-098 | gun-19 | `m1:19:p1.n4.s1` | `geri_bildirim_tr` | Kibar bir hayır. **Ich mag** ile ne sevdiğini söylersin. | GEÇTİ |
| 19-099 | gun-19 | `m1:19:p1.n4.s2` | `geri_bildirim_tr` | **ich** ile **esse** dersin. **isst** yalnızca **du** ve **er** için. | GEÇTİ |
| 19-100 | gun-19 | `m1:19:p1.n5.s0` | `geri_bildirim_tr` | Sakin bir cevap. **ich bleibe** doğru. | GEÇTİ |
| 19-101 | gun-19 | `m1:19:p1.n5.s1` | `geri_bildirim_tr` | Güzel. Saat için **um** dedin, **ich fahre** de doğru. | GEÇTİ |
| 19-102 | gun-19 | `m1:19:p1.n5.s2` | `geri_bildirim_tr` | **ich** ile **sehe** dersin. Hem de otobüs gitti, artık görünmüyor. | GEÇTİ |
| 19-103 | gun-19 | `m1:19:p1` | `kapanis_tr` | Nereye gittiğini, kimin nasıl konuştuğunu söyledin. **du** ve **er** biçimlerini karıştırmadın. | GEÇTİ |
| 19-104 | gun-19 | `m1:19:o1` | `q_tr` | Ioana yarın nasıl gidiyor? | GEÇTİ |
| 19-105 | gun-19 | `m1:19:o1.opt0` | `opts` | Bisikletle | GEÇTİ |
| 19-106 | gun-19 | `m1:19:o1.opt1` | `opts` | Otobüsle | GEÇTİ |
| 19-107 | gun-19 | `m1:19:o1.opt2` | `opts` | Yürüyerek | GEÇTİ |
| 19-108 | gun-19 | `m1:19:o2` | `q_tr` | Basti nasıl gidiyor? | GEÇTİ |
| 19-109 | gun-19 | `m1:19:o2.opt0` | `opts` | Bisikletle | GEÇTİ |
| 19-110 | gun-19 | `m1:19:o2.opt1` | `opts` | Otobüsle | GEÇTİ |
| 19-111 | gun-19 | `m1:19:o2.opt2` | `opts` | Arabayla | GEÇTİ |
| 19-112 | gun-19 | `m1:19:o3` | `q_tr` | Kurstan sonra ne yapıyorlar? | GEÇTİ |
| 19-113 | gun-19 | `m1:19:o3.opt0` | `opts` | Bir şeyler yiyorlar | GEÇTİ |
| 19-114 | gun-19 | `m1:19:o3.opt1` | `opts` | Hemen eve gidiyorlar | GEÇTİ |
| 19-115 | gun-19 | `m1:19:o3.opt2` | `opts` | Spora gidiyorlar | GEÇTİ |
| 19-116 | gun-19 | `m1:19:o4` | `situation_tr` | Ioana'ya cevap ver. Evet, sen de geliyorsun, ama otobüsle. | GEÇTİ |
| 19-117 | gun-19 | `m1:19:o4` | `why_tr` | Önce evet de. Sonra **ich fahre** ile nasıl geldiğini söyle. | GEÇTİ |
| 19-118 | gun-19 | `m1:19:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 19-119 | gun-19 | `m1:19:s1` | `why_tr` | **sie spricht** onun konuştuğunu söyler. | GEÇTİ |
| 19-120 | gun-19 | `m1:19:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 19-121 | gun-19 | `m1:19:s2` | `why_tr` | **er sieht** onun gördüğünü söyler. Yazılışta **ie** var. | GEÇTİ |
| 19-122 | gun-19 | `m1:19:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 19-123 | gun-19 | `m1:19:s3` | `why_tr` | **er isst** iki s ile yazılır. | GEÇTİ |
| 19-124 | gun-19 | `m1:19:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 19-125 | gun-19 | `m1:19:s4` | `why_tr` | **zu Hause** evde demektir. | GEÇTİ |
| 19-126 | gun-19 | `m1:19:s5` | `why_tr` | O konuşuyor derken **spricht** dersin. | GEÇTİ |
| 19-127 | gun-19 | `m1:19:s6` | `why_tr` | Sen gidiyorsun derken **du fährst** dersin. | GEÇTİ |
| 19-128 | gun-19 | `m1:19:s7` | `why_tr` | Sen yiyorsun derken **du isst** dersin. | GEÇTİ |
| 19-129 | gun-19 | `m1:19:s8` | `why_tr` | Hiç derken **nie** dersin. Ioana için **spricht** gelir. | GEÇTİ |
| 19-130 | gun-19 | `m1:19:s9` | `situation_tr` | Ioana Basti'nin nasıl konuştuğunu soruyor. Çok hızlı konuşuyor. | GEÇTİ |
| 19-131 | gun-19 | `m1:19:s9` | `why_tr` | Basti için **er spricht** dersin. | GEÇTİ |
| 19-132 | gun-19 | `m1:19:s10` | `situation_tr` | Tobi hafta sonunu soruyor. Bir yere gitmiyorsun, evde kalıyorsun. | GEÇTİ |
| 19-133 | gun-19 | `m1:19:s10` | `why_tr` | Kalıyorum derken **ich bleibe** dersin. | GEÇTİ |
| 19-134 | gun-19 | `m1:19:s11` | `situation_tr` | Kurs bitti. Ioana soruyor. Sen eve gidiyorsun, Basti burada kalıyor. İkisini de söyle. | GEÇTİ |
| 19-135 | gun-19 | `m1:19:s11` | `why_tr` | Kendin için **ich fahre**, Basti için **er bleibt** dersin. | GEÇTİ |
| 20-001 | gun-20 | `g20` | `goal_tr` | Muayenehane randevunu başka bir tarihe aldığında tarihi am ile söyler, emin değilsen sorup doğrularsın. | GEÇTİ |
| 20-002 | gun-20 | `g20` | `can_do.tr` | Randevunun tarihini söyler ve doğrularım. | GEÇTİ |
| 20-003 | gun-20 | `m1:20:h1.kalip0` | `kaliplar.tr` | Üzgünüm. Kusura bakmayın. | GEÇTİ |
| 20-004 | gun-20 | `m1:20:h1.kalip1` | `kaliplar.tr` | …'e soruyorum | GEÇTİ |
| 20-005 | gun-20 | `m1:20:h1.kalip2` | `kaliplar.tr` | yardım ediyorum – yardım ediyorsun – yardım ediyor | GEÇTİ |
| 20-006 | gun-20 | `m1:20:h1.kalip3` | `kaliplar.tr` | Yağmur yağıyor. | GEÇTİ |
| 20-007 | gun-20 | `m1:20:h1.kalip4` | `kaliplar.tr` | Merhaba! – Telefonda: hoşça kalın! | GEÇTİ |
| 20-008 | gun-20 | `m1:20:h1.kalip5` | `kaliplar.tr` | Lütfen geri arayın. | GEÇTİ |
| 20-009 | gun-20 | `m1:20:h1.sahne` | `ortam_tr` | Telefon. Randevuna geç kalacaksın, muayenehaneyi arıyorsun. | GEÇTİ |
| 20-010 | gun-20 | `m1:20:h1.soru` | `q_tr` | Huber Hanım ne yapıyor? | GEÇTİ |
| 20-011 | gun-20 | `m1:20:h1.soru.opt0` | `opts` | Dr. Weber'e soruyor. | GEÇTİ |
| 20-012 | gun-20 | `m1:20:h1.soru.opt1` | `opts` | Randevuyu iptal ediyor. | GEÇTİ |
| 20-013 | gun-20 | `m1:20:h1.soru.opt2` | `opts` | Seni yarına çağırıyor. | GEÇTİ |
| 20-014 | gun-20 | `m1:20:h2.kalip0` | `kaliplar.tr` | Bugün ayın biri – ayın birinde | GEÇTİ |
| 20-015 | gun-20 | `m1:20:h2.kalip1` | `kaliplar.tr` | Kartta … yazıyor | GEÇTİ |
| 20-016 | gun-20 | `m1:20:h2.kalip2` | `kaliplar.tr` | yiyorum – yiyor | GEÇTİ |
| 20-017 | gun-20 | `m1:20:h2.sahne` | `ortam_tr` | Muayenehanenin kayıt masası. Randevu kartına bakıyorsun. | GEÇTİ |
| 20-018 | gun-20 | `m1:20:h2.soru` | `q_tr` | Randevu gerçekte hangi tarihte? | GEÇTİ |
| 20-019 | gun-20 | `m1:20:h2.soru.opt0` | `opts` | 4 Aralık | GEÇTİ |
| 20-020 | gun-20 | `m1:20:h2.soru.opt1` | `opts` | 14 Aralık | GEÇTİ |
| 20-021 | gun-20 | `m1:20:h2.soru.opt2` | `opts` | 24 Aralık | GEÇTİ |
| 20-022 | gun-20 | `m1:20:h3.kalip0` | `kaliplar.tr` | fazla küçük – fazla büyük | GEÇTİ |
| 20-023 | gun-20 | `m1:20:h3.kalip1` | `kaliplar.tr` | …'e bayılıyorum – …'e bayılıyor | GEÇTİ |
| 20-024 | gun-20 | `m1:20:h3.sahne` | `ortam_tr` | Bir giyim dükkânı. Ioana ayna önünde bir ceket deniyor. | GEÇTİ |
| 20-025 | gun-20 | `m1:20:h3.soru` | `q_tr` | Ioana'nın bedeni kaç? | GEÇTİ |
| 20-026 | gun-20 | `m1:20:h3.soru.opt0` | `opts` | 38 | GEÇTİ |
| 20-027 | gun-20 | `m1:20:h3.soru.opt1` | `opts` | 40 | GEÇTİ |
| 20-028 | gun-20 | `m1:20:h3.soru.opt2` | `opts` | 42 | GEÇTİ |
| 20-029 | gun-20 | `m1:20:v1.b1.ana` | `q_tr` | Brandl Hanım neden arıyor? | GEÇTİ |
| 20-030 | gun-20 | `m1:20:v1.b1.ana.opt0` | `opts` | Randevusunun tarihini doğrulamak için | GEÇTİ |
| 20-031 | gun-20 | `m1:20:v1.b1.ana.opt1` | `opts` | Yeni bir randevu almak için | GEÇTİ |
| 20-032 | gun-20 | `m1:20:v1.b1.ana.opt2` | `opts` | Randevusunu iptal etmek için | GEÇTİ |
| 20-033 | gun-20 | `m1:20:v1.b1.ay0` | `q_tr` | Randevu gerçekte ne zaman? | GEÇTİ |
| 20-034 | gun-20 | `m1:20:v1.b1.ay0.opt0` | `opts` | 14 Aralık pazartesi, saat dokuzda | GEÇTİ |
| 20-035 | gun-20 | `m1:20:v1.b1.ay0.opt1` | `opts` | 4 Aralık pazartesi, saat dokuzda | GEÇTİ |
| 20-036 | gun-20 | `m1:20:v1.b1.ay0.opt2` | `opts` | 14 Aralık pazartesi, saat onda | GEÇTİ |
| 20-037 | gun-20 | `m1:20:v1.b1.ay1` | `q_tr` | Randevu günü Brandl Hanım ne yapmamalı? | GEÇTİ |
| 20-038 | gun-20 | `m1:20:v1.b1.ay1.opt0` | `opts` | Bir şey yememeli | GEÇTİ |
| 20-039 | gun-20 | `m1:20:v1.b1.ay1.opt1` | `opts` | Otobüse binmemeli | GEÇTİ |
| 20-040 | gun-20 | `m1:20:v1.b1.ay1.opt2` | `opts` | Telefon etmemeli | GEÇTİ |
| 20-041 | gun-20 | `m1:20:v1.b1.d1` | `q_tr` | Hangi tarihi duydun? | GEÇTİ |
| 20-042 | gun-20 | `m1:20:v1.b1.d5` | `gorev_tr` | Brandl Hanım'ın randevusunu Almanca bir kısa cümleyle yaz. | GEÇTİ |
| 20-043 | gun-20 | `m1:20:v1:c1` | `situation_tr` | Huber Hanım sana da soruyor. Senin randevun 10 Aralık'ta. | GEÇTİ |
| 20-044 | gun-20 | `m1:20:v1:c1` | `why_tr` | Tarih için **am** dersin. Sayının sonu **en** olur: **am zehnten**. | GEÇTİ |
| 20-045 | gun-20 | `m1:20:a1` | `ortam_tr` | Telefonunda muayenehaneden bir sesli mesaj var. Huber Hanım hızlı konuşuyor. | GEÇTİ |
| 20-046 | gun-20 | `m1:20:a1.b1.ana` | `q_tr` | Huber Hanım neden arıyor? | GEÇTİ |
| 20-047 | gun-20 | `m1:20:a1.b1.ana.opt0` | `opts` | Randevunu başka bir tarihe almak için | GEÇTİ |
| 20-048 | gun-20 | `m1:20:a1.b1.ana.opt1` | `opts` | Randevunu hatırlatmak için | GEÇTİ |
| 20-049 | gun-20 | `m1:20:a1.b1.ana.opt2` | `opts` | Bir ilaç için | GEÇTİ |
| 20-050 | gun-20 | `m1:20:a1.b1.ay0` | `q_tr` | Önerilen yeni tarih ne? | GEÇTİ |
| 20-051 | gun-20 | `m1:20:a1.b1.ay0.opt0` | `opts` | 15 Aralık salı | GEÇTİ |
| 20-052 | gun-20 | `m1:20:a1.b1.ay0.opt1` | `opts` | 10 Aralık perşembe | GEÇTİ |
| 20-053 | gun-20 | `m1:20:a1.b1.ay0.opt2` | `opts` | 5 Aralık cumartesi | GEÇTİ |
| 20-054 | gun-20 | `m1:20:a1.b1.ay1` | `q_tr` | Yeni saat kaç? | GEÇTİ |
| 20-055 | gun-20 | `m1:20:a1.b1.ay1.opt0` | `opts` | Sekiz buçuk | GEÇTİ |
| 20-056 | gun-20 | `m1:20:a1.b1.ay1.opt1` | `opts` | Dokuz buçuk | GEÇTİ |
| 20-057 | gun-20 | `m1:20:a1.b1.ay1.opt2` | `opts` | Saat sekiz | GEÇTİ |
| 20-058 | gun-20 | `m1:20:a1.b1.d1` | `q_tr` | Hangi tarihi duydun? | GEÇTİ |
| 20-059 | gun-20 | `m1:20:a1.b1.d5` | `gorev_tr` | Mesajdaki yeni tarihi ve saati Almanca bir cümleyle yaz. | GEÇTİ |
| 20-060 | gun-20 | `m1:20:a1:c1` | `situation_tr` | Huber Hanım'ı geri arıyorsun. 15 Aralık saat sekiz buçuk sana uyuyor. Tarihi tekrar et. | GEÇTİ |
| 20-061 | gun-20 | `m1:20:a1:c1` | `why_tr` | Tarihi tekrar et. **am fünfzehnten** ya da **der fünfzehnte** ikisi de olur. | GEÇTİ |
| 20-062 | gun-20 | `m1:20:a1:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 20-063 | gun-20 | `m1:20:a1:e1.opt0` | `opts` | Muayenehaneyi geri ara, 15 Aralık'ın uyup uymadığını söyle. | GEÇTİ |
| 20-064 | gun-20 | `m1:20:a1:e1.opt1` | `opts` | 10 Aralık'ta yine de muayenehaneye git. | GEÇTİ |
| 20-065 | gun-20 | `m1:20:a1:e1.opt2` | `opts` | Hiçbir şey yapma, randevu aynı kaldı. | GEÇTİ |
| 20-066 | gun-20 | `m1:20:a1:e1` | `why_tr` | Randevu 10 Aralık'ta olmuyor. Huber Hanım yeni tarih öneriyor ve geri aramanı istiyor. | GEÇTİ |
| 20-067 | gun-20 | `m1:20:a2` | `ortam_tr` | Aralık sonunda muayenehaneyi arıyorsun. Telefonda bu kayıt çalıyor. | GEÇTİ |
| 20-068 | gun-20 | `m1:20:a2.b1.ana` | `q_tr` | Kayıt ne hakkında? | GEÇTİ |
| 20-069 | gun-20 | `m1:20:a2.b1.ana.opt0` | `opts` | Muayenehanenin tatil günleri | GEÇTİ |
| 20-070 | gun-20 | `m1:20:a2.b1.ana.opt1` | `opts` | Yeni bir doktor | GEÇTİ |
| 20-071 | gun-20 | `m1:20:a2.b1.ana.opt2` | `opts` | Her gün için yeni açılış saatleri | GEÇTİ |
| 20-072 | gun-20 | `m1:20:a2.b1.ay0` | `q_tr` | Muayenehane hangi tarihte yeniden açık? | GEÇTİ |
| 20-073 | gun-20 | `m1:20:a2.b1.ay0.opt0` | `opts` | 4 Ocak | GEÇTİ |
| 20-074 | gun-20 | `m1:20:a2.b1.ay0.opt1` | `opts` | 3 Ocak | GEÇTİ |
| 20-075 | gun-20 | `m1:20:a2.b1.ay0.opt2` | `opts` | 24 Aralık | GEÇTİ |
| 20-076 | gun-20 | `m1:20:a2.b1.ay1` | `q_tr` | 23 Aralık'ta muayenehane saat kaça kadar açık? | GEÇTİ |
| 20-077 | gun-20 | `m1:20:a2.b1.ay1.opt0` | `opts` | On ikiye kadar | GEÇTİ |
| 20-078 | gun-20 | `m1:20:a2.b1.ay1.opt1` | `opts` | Akşama kadar | GEÇTİ |
| 20-079 | gun-20 | `m1:20:a2.b1.ay1.opt2` | `opts` | Hiç açık değil | GEÇTİ |
| 20-080 | gun-20 | `m1:20:a2.b1.d1` | `q_tr` | Hangi tarihi duydun? | GEÇTİ |
| 20-081 | gun-20 | `m1:20:a2.b1.d5` | `gorev_tr` | Muayenehanenin ne zaman yeniden açık olduğunu Almanca bir cümleyle yaz. | GEÇTİ |
| 20-082 | gun-20 | `m1:20:a2:c1` | `situation_tr` | Ioana soruyor. Muayenehane 4 Ocak'tan itibaren yine açık. | GEÇTİ |
| 20-083 | gun-20 | `m1:20:a2:c1` | `why_tr` | Bir tarihten itibaren derken **ab dem vierten Januar** dersin. | GEÇTİ |
| 20-084 | gun-20 | `m1:20:a2:e1` | `q_tr` | 28 Aralık için bir randevu düşünüyorsun. Ne yapmalısın? | GEÇTİ |
| 20-085 | gun-20 | `m1:20:a2:e1.opt0` | `opts` | 28 Aralık'ta muayenehaneye git. | GEÇTİ |
| 20-086 | gun-20 | `m1:20:a2:e1.opt1` | `opts` | 4 Ocak ya da sonrası için bir gün seç. | GEÇTİ |
| 20-087 | gun-20 | `m1:20:a2:e1.opt2` | `opts` | 24 Aralık öğleden sonra git. | GEÇTİ |
| 20-088 | gun-20 | `m1:20:a2:e1` | `why_tr` | Muayenehane 24 Aralık ile 3 Ocak arasında kapalı. 4 Ocak'ta yeniden açık. | GEÇTİ |
| 20-089 | gun-20 | `m1:20:p1` | `durum_tr` | Huber Hanım'ın sesli mesajını duydun. 10 Aralık'taki randevun olmuyor. Muayenehaneyi geri arıyorsun. | GEÇTİ |
| 20-090 | gun-20 | `m1:20:p1.n1.s0` | `geri_bildirim_tr` | Güzel. Adını ve neden aradığını hemen söyledin. | GEÇTİ |
| 20-091 | gun-20 | `m1:20:p1.n1.s1` | `geri_bildirim_tr` | Olur. Tarihi söyleyerek konuya hemen girdin. | GEÇTİ |
| 20-092 | gun-20 | `m1:20:p1.n1.s2` | `geri_bildirim_tr` | Huber Hanım kimin aradığını bilmiyor. Önce selam ver ve adını söyle. | GEÇTİ |
| 20-093 | gun-20 | `m1:20:p1.n2.s0` | `geri_bildirim_tr` | Çok iyi. Emin olmadığın tarihi hemen sordun. | GEÇTİ |
| 20-094 | gun-20 | `m1:20:p1.n2.s1` | `geri_bildirim_tr` | Tarihi tekrar ederek onayladın. Yanlış anlama kalmadı. | GEÇTİ |
| 20-095 | gun-20 | `m1:20:p1.n2.s2` | `geri_bildirim_tr` | **fünfzehnten** on beş demek, **fünften** beş. Emin değilsen tekrar iste. | GEÇTİ |
| 20-096 | gun-20 | `m1:20:p1.n3.s0` | `geri_bildirim_tr` | Tarihi ve günü birlikte söyledin. Böyle hata olmaz. | GEÇTİ |
| 20-097 | gun-20 | `m1:20:p1.n3.s1` | `geri_bildirim_tr` | Kartını kontrol ettin. Emin olmak için sormak doğru. | GEÇTİ |
| 20-098 | gun-20 | `m1:20:p1.n3.s2` | `geri_bildirim_tr` | Huber Hanım salı dedi. **Dienstag** ile **Donnerstag** telefonda kolay karışır. | GEÇTİ |
| 20-099 | gun-20 | `m1:20:p1.n3c.s0` | `geri_bildirim_tr` | Yeni tarihi kabul ettin ve tekrar ettin. | GEÇTİ |
| 20-100 | gun-20 | `m1:20:p1.n4.s0` | `geri_bildirim_tr` | Harika. Tarihi, saati ve isteği tekrar ettin. | GEÇTİ |
| 20-101 | gun-20 | `m1:20:p1.n4.s1` | `geri_bildirim_tr` | Olur. Önemli isteği tekrar ederek kontrol ettin. | GEÇTİ |
| 20-102 | gun-20 | `m1:20:p1.n4.s2` | `geri_bildirim_tr` | Huber Hanım yumurta da yok dedi. **auch kein Ei** bunu söylüyor. | GEÇTİ |
| 20-103 | gun-20 | `m1:20:p1.n5.s0` | `geri_bildirim_tr` | Telefonda doğru veda. **Auf Wiederhören** dedin. | GEÇTİ |
| 20-104 | gun-20 | `m1:20:p1.n5.s1` | `geri_bildirim_tr` | Randevu yarın değil, ayın on beşinde. **Auf Wiederhören** de. | GEÇTİ |
| 20-105 | gun-20 | `m1:20:p1` | `kapanis_tr` | Yeni tarihi duydun, emin olmadığında sordun ve tarihi tekrar ederek doğruladın. | GEÇTİ |
| 20-106 | gun-20 | `m1:20:o1` | `q_tr` | Randevu ne zaman? | GEÇTİ |
| 20-107 | gun-20 | `m1:20:o1.opt0` | `opts` | 15 Aralık salı, sekiz buçukta | GEÇTİ |
| 20-108 | gun-20 | `m1:20:o1.opt1` | `opts` | 5 Aralık salı, sekiz buçukta | GEÇTİ |
| 20-109 | gun-20 | `m1:20:o1.opt2` | `opts` | 15 Aralık salı, dokuz buçukta | GEÇTİ |
| 20-110 | gun-20 | `m1:20:o2` | `q_tr` | Randevudan önce ne yapmamalısın? | GEÇTİ |
| 20-111 | gun-20 | `m1:20:o2.opt0` | `opts` | Bir şey yememelisin | GEÇTİ |
| 20-112 | gun-20 | `m1:20:o2.opt1` | `opts` | Telefon etmemelisin | GEÇTİ |
| 20-113 | gun-20 | `m1:20:o2.opt2` | `opts` | Otobüse binmemelisin | GEÇTİ |
| 20-114 | gun-20 | `m1:20:o3` | `q_tr` | 24 Aralık'ta muayenehane açık mı? | GEÇTİ |
| 20-115 | gun-20 | `m1:20:o3.opt0` | `opts` | Hayır, kapalı | GEÇTİ |
| 20-116 | gun-20 | `m1:20:o3.opt1` | `opts` | Evet, açık | GEÇTİ |
| 20-117 | gun-20 | `m1:20:o3.opt2` | `opts` | Yalnızca sabah açık | GEÇTİ |
| 20-118 | gun-20 | `m1:20:o4` | `situation_tr` | Ioana randevunu soruyor. Tarihi ve günü söyle. | GEÇTİ |
| 20-119 | gun-20 | `m1:20:o4` | `why_tr` | Tarih için **am fünfzehnten** dersin. Günü de eklersen daha açık olur. | GEÇTİ |
| 20-120 | gun-20 | `m1:20:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 20-121 | gun-20 | `m1:20:s1` | `why_tr` | Bugünün tarihi için **Heute ist der erste** dersin. | GEÇTİ |
| 20-122 | gun-20 | `m1:20:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 20-123 | gun-20 | `m1:20:s2` | `why_tr` | **am dritten** ayın üçünde demektir. | GEÇTİ |
| 20-124 | gun-20 | `m1:20:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 20-125 | gun-20 | `m1:20:s3` | `why_tr` | **klein** küçük demektir. | GEÇTİ |
| 20-126 | gun-20 | `m1:20:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 20-127 | gun-20 | `m1:20:s4` | `why_tr` | **steht** burada yazıyor demektir. | GEÇTİ |
| 20-128 | gun-20 | `m1:20:s5` | `why_tr` | Bugünün tarihi için **der elfte** dersin. | GEÇTİ |
| 20-129 | gun-20 | `m1:20:s6` | `why_tr` | Bir şeyin tarihi için **am** dersin: **am einundzwanzigsten**. | GEÇTİ |
| 20-130 | gun-20 | `m1:20:s7` | `why_tr` | Özür dilerken **Es tut mir leid** dersin. | GEÇTİ |
| 20-131 | gun-20 | `m1:20:s8` | `why_tr` | Soruyorum derken **ich frage** dersin. | GEÇTİ |
| 20-132 | gun-20 | `m1:20:s9` | `situation_tr` | Huber Hanım bir tarih söyledi. On dördü mü dördü mü, emin değilsin. Sor. | GEÇTİ |
| 20-133 | gun-20 | `m1:20:s9` | `why_tr` | Karışan iki tarihi yan yana söyle. Böylece doğru olanı duyarsın. | GEÇTİ |
| 20-134 | gun-20 | `m1:20:s10` | `situation_tr` | Brandl Hanım bugünün tarihini soruyor. Bugün 7 Aralık. | GEÇTİ |
| 20-135 | gun-20 | `m1:20:s10` | `why_tr` | Bugünün tarihi **der** ile söylenir: **der siebte Dezember**. | GEÇTİ |
| 20-136 | gun-20 | `m1:20:s11` | `situation_tr` | Huber Hanım yeni tarih öneriyor. Tarihi tekrar ederek onayla ve teşekkür et. | GEÇTİ |
| 20-137 | gun-20 | `m1:20:s11` | `why_tr` | Tarihi tekrar et, sonra teşekkür et. Huber Hanım doğru duyduğunu anlar. | GEÇTİ |
| 21-001 | gun-21 | `g21` | `goal_tr` | Babanın randevusu için muayenehaneyi arar, adını hecelersin, gün ve saati doğrularsın. | GEÇTİ |
| 21-002 | gun-21 | `g21` | `can_do.tr` | Telefonda randevunun gün ve saatini doğrularım. | GEÇTİ |
| 21-003 | gun-21 | `m1:21:h1.kalip0` | `kaliplar.tr` | Ne oldu? | GEÇTİ |
| 21-004 | gun-21 | `m1:21:h1.kalip1` | `kaliplar.tr` | muayenehaneye – firmaya | GEÇTİ |
| 21-005 | gun-21 | `m1:21:h1.kalip2` | `kaliplar.tr` | Merhaba! – Telefonda: hoşça kalın! | GEÇTİ |
| 21-006 | gun-21 | `m1:21:h1.kalip3` | `kaliplar.tr` | gidiyorum – gidiyorsun – gidiyor (araçla) | GEÇTİ |
| 21-007 | gun-21 | `m1:21:h1.kalip4` | `kaliplar.tr` | evde | GEÇTİ |
| 21-008 | gun-21 | `m1:21:h1.kalip5` | `kaliplar.tr` | … -abilir misiniz? (kibar) | GEÇTİ |
| 21-009 | gun-21 | `m1:21:h1.sahne` | `ortam_tr` | Apartman merdiveni. Brandl Hanım seni hafta içi evde görüyor. | GEÇTİ |
| 21-010 | gun-21 | `m1:21:h1.soru` | `q_tr` | Baban yarın nereye gidiyor? | GEÇTİ |
| 21-011 | gun-21 | `m1:21:h1.soru.opt0` | `opts` | Muayenehaneye | GEÇTİ |
| 21-012 | gun-21 | `m1:21:h1.soru.opt1` | `opts` | Firmaya | GEÇTİ |
| 21-013 | gun-21 | `m1:21:h1.soru.opt2` | `opts` | İstasyona | GEÇTİ |
| 21-014 | gun-21 | `m1:21:h1.soru.opt3` | `opts` | Belediyeye | GEÇTİ |
| 21-015 | gun-21 | `m1:21:v1.b1.ana` | `q_tr` | Tobi neden muayenehaneyi arıyor? | GEÇTİ |
| 21-016 | gun-21 | `m1:21:v1.b1.ana.opt0` | `opts` | Babası hasta | GEÇTİ |
| 21-017 | gun-21 | `m1:21:v1.b1.ana.opt1` | `opts` | Kendisi hasta | GEÇTİ |
| 21-018 | gun-21 | `m1:21:v1.b1.ana.opt2` | `opts` | Randevusunu iptal ediyor | GEÇTİ |
| 21-019 | gun-21 | `m1:21:v1.b1.ay0` | `q_tr` | Randevu ne zaman? | GEÇTİ |
| 21-020 | gun-21 | `m1:21:v1.b1.ay0.opt0` | `opts` | salı saat onda | GEÇTİ |
| 21-021 | gun-21 | `m1:21:v1.b1.ay0.opt1` | `opts` | perşembe saat onda | GEÇTİ |
| 21-022 | gun-21 | `m1:21:v1.b1.ay0.opt2` | `opts` | salı saat ikide | GEÇTİ |
| 21-023 | gun-21 | `m1:21:v1.b1.ay1` | `q_tr` | Babası ne getirmeli? | GEÇTİ |
| 21-024 | gun-21 | `m1:21:v1.b1.ay1.opt0` | `opts` | kartını | GEÇTİ |
| 21-025 | gun-21 | `m1:21:v1.b1.ay1.opt1` | `opts` | kimliğini | GEÇTİ |
| 21-026 | gun-21 | `m1:21:v1.b1.ay1.opt2` | `opts` | bir hediye | GEÇTİ |
| 21-027 | gun-21 | `m1:21:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 21-028 | gun-21 | `m1:21:v1.b1.d5` | `gorev_tr` | Sahnede duyduklarını Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 21-029 | gun-21 | `m1:21:v1:c1` | `situation_tr` | Derya sana da soruyor. Baban da hasta, pazartesi muayenehaneye gidiyor. | GEÇTİ |
| 21-030 | gun-21 | `m1:21:v1:c1` | `why_tr` | Soru **Ist** ile başlıyor. Cevaba **Ja** ile başla, sonra günü söyle. | GEÇTİ |
| 21-031 | gun-21 | `m1:21:a1` | `ortam_tr` | Kontrol randevun için Huber Hanım mesaj bırakmış. Çok hızlı konuşuyor. Gün ve saati yaz. | GEÇTİ |
| 21-032 | gun-21 | `m1:21:a1.b1.ana` | `q_tr` | Huber Hanım ne söylüyor? | GEÇTİ |
| 21-033 | gun-21 | `m1:21:a1.b1.ana.opt0` | `opts` | Randevunun gününü ve saatini | GEÇTİ |
| 21-034 | gun-21 | `m1:21:a1.b1.ana.opt1` | `opts` | Muayenehanenin kapalı olduğunu | GEÇTİ |
| 21-035 | gun-21 | `m1:21:a1.b1.ana.opt2` | `opts` | İlacının hazır olduğunu | GEÇTİ |
| 21-036 | gun-21 | `m1:21:a1.b1.ay0` | `q_tr` | Randevu hangi gün? | GEÇTİ |
| 21-037 | gun-21 | `m1:21:a1.b1.ay0.opt0` | `opts` | 17 Aralık perşembe | GEÇTİ |
| 21-038 | gun-21 | `m1:21:a1.b1.ay0.opt1` | `opts` | 7 Aralık pazartesi | GEÇTİ |
| 21-039 | gun-21 | `m1:21:a1.b1.ay0.opt2` | `opts` | 16 Aralık çarşamba | GEÇTİ |
| 21-040 | gun-21 | `m1:21:a1.b1.ay1` | `q_tr` | Randevu saat kaçta? | GEÇTİ |
| 21-041 | gun-21 | `m1:21:a1.b1.ay1.opt0` | `opts` | on buçukta | GEÇTİ |
| 21-042 | gun-21 | `m1:21:a1.b1.ay1.opt1` | `opts` | on bir buçukta | GEÇTİ |
| 21-043 | gun-21 | `m1:21:a1.b1.ay1.opt2` | `opts` | dokuz buçukta | GEÇTİ |
| 21-044 | gun-21 | `m1:21:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 21-045 | gun-21 | `m1:21:a1.b1.d5` | `gorev_tr` | Mesajdaki gün ve saati Almanca yaz. | GEÇTİ |
| 21-046 | gun-21 | `m1:21:a1:c1` | `situation_tr` | Huber Hanım'ı geri arıyorsun. Kendini tanıt, gün ve saati tekrar ederek doğrula. | GEÇTİ |
| 21-047 | gun-21 | `m1:21:a1:c1` | `why_tr` | Önce **hier ist** ve adın. Sonra günü ve saati soru gibi tekrar et. | GEÇTİ |
| 21-048 | gun-21 | `m1:21:a1:e1` | `q_tr` | Ne yapmalısın? | GEÇTİ |
| 21-049 | gun-21 | `m1:21:a1:e1.opt0` | `opts` | 17 Aralık perşembe saat on buçukta git, kartını al. | GEÇTİ |
| 21-050 | gun-21 | `m1:21:a1:e1.opt1` | `opts` | 7 Aralık saat on birde git. | GEÇTİ |
| 21-051 | gun-21 | `m1:21:a1:e1.opt2` | `opts` | Muayenehaneyi hemen ara ve randevuyu iptal et. | GEÇTİ |
| 21-052 | gun-21 | `m1:21:a1:e1` | `why_tr` | Randevu 17 Aralık perşembe saat on buçukta. Kartı da getirmelisin. | GEÇTİ |
| 21-053 | gun-21 | `m1:21:a2` | `ortam_tr` | Bugün işe gitmedin. Derya telefonuna mesaj bırakmış. | GEÇTİ |
| 21-054 | gun-21 | `m1:21:a2.b1.ana` | `q_tr` | Derya neden arıyor? | GEÇTİ |
| 21-055 | gun-21 | `m1:21:a2.b1.ana.opt0` | `opts` | Ne olduğunu soruyor ve yardım öneriyor | GEÇTİ |
| 21-056 | gun-21 | `m1:21:a2.b1.ana.opt1` | `opts` | Seni kutlamaya çağırıyor | GEÇTİ |
| 21-057 | gun-21 | `m1:21:a2.b1.ana.opt2` | `opts` | Şefin mesajını iletiyor | GEÇTİ |
| 21-058 | gun-21 | `m1:21:a2.b1.ay0` | `q_tr` | Derya kimin hasta olduğunu soruyor? | GEÇTİ |
| 21-059 | gun-21 | `m1:21:a2.b1.ay0.opt0` | `opts` | babanın | GEÇTİ |
| 21-060 | gun-21 | `m1:21:a2.b1.ay0.opt1` | `opts` | Tobi'nin | GEÇTİ |
| 21-061 | gun-21 | `m1:21:a2.b1.ay0.opt2` | `opts` | şefin | GEÇTİ |
| 21-062 | gun-21 | `m1:21:a2.b1.ay1` | `q_tr` | Derya bugün saat kaça kadar ofiste? | GEÇTİ |
| 21-063 | gun-21 | `m1:21:a2.b1.ay1.opt0` | `opts` | altıya | GEÇTİ |
| 21-064 | gun-21 | `m1:21:a2.b1.ay1.opt1` | `opts` | beşe | GEÇTİ |
| 21-065 | gun-21 | `m1:21:a2.b1.ay1.opt2` | `opts` | yediye | GEÇTİ |
| 21-066 | gun-21 | `m1:21:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 21-067 | gun-21 | `m1:21:a2.b1.d5` | `gorev_tr` | Mesajda ne dendiğini Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 21-068 | gun-21 | `m1:21:a2:c1` | `situation_tr` | Derya'yı geri arıyorsun. Baban hasta, yarın muayenehaneye gidiyor. Teşekkür et. | GEÇTİ |
| 21-069 | gun-21 | `m1:21:a2:c1` | `why_tr` | Önce **Ja** de. Sonra ne zaman muayenehaneye gittiğini söyle. | GEÇTİ |
| 21-070 | gun-21 | `m1:21:a2:e1` | `q_tr` | Derya'ya ulaşmak istiyorsun. Ne yapmalısın? | GEÇTİ |
| 21-071 | gun-21 | `m1:21:a2:e1.opt0` | `opts` | Bugün saat altıdan önce ofisi ara. | GEÇTİ |
| 21-072 | gun-21 | `m1:21:a2:e1.opt1` | `opts` | Yarın sabah ara. | GEÇTİ |
| 21-073 | gun-21 | `m1:21:a2:e1.opt2` | `opts` | Ona hiç cevap verme. | GEÇTİ |
| 21-074 | gun-21 | `m1:21:a2:e1` | `why_tr` | Derya bugün altıya kadar ofiste. | GEÇTİ |
| 21-075 | gun-21 | `m1:21:p1` | `durum_tr` | Baban hasta, ateşi var ve iyi yutkunamıyor. Dr. Weber'in muayenehanesini arıyorsun. Huber Hanım açıyor. Kendini tanıt, adını harf harf söyle, gün ve saati doğrula. | GEÇTİ |
| 21-076 | gun-21 | `m1:21:p1.n1.s0` | `geri_bildirim_tr` | Çok iyi. Selam, adın ve neden aradığın tek seferde. | GEÇTİ |
| 21-077 | gun-21 | `m1:21:p1.n1.s1` | `geri_bildirim_tr` | Huber Hanım kimin aradığını bilmiyor. Önce **hier ist** ve adın. | GEÇTİ |
| 21-078 | gun-21 | `m1:21:p1.n2.s0` | `geri_bildirim_tr` | Kısa ve açık. Huber Hanım ne olduğunu hemen anlar. | GEÇTİ |
| 21-079 | gun-21 | `m1:21:p1.n2.s1` | `geri_bildirim_tr` | Hasta olan baban. **Er hat Fieber** de. | GEÇTİ |
| 21-080 | gun-21 | `m1:21:p1.n3.s0` | `geri_bildirim_tr` | Doğru. **neu** burada yeni demektir. | GEÇTİ |
| 21-081 | gun-21 | `m1:21:p1.n4.s0` | `geri_bildirim_tr` | Güzel. Şimdi harfleri yavaşça, gerekirse bir adla söylersin. | GEÇTİ |
| 21-082 | gun-21 | `m1:21:p1.n4.s1` | `geri_bildirim_tr` | Sadece **Ja** yetmez. **Ich buchstabiere** de ve harfleri söyle. | GEÇTİ |
| 21-083 | gun-21 | `m1:21:p1.n5.s0` | `geri_bildirim_tr` | Çok iyi. Gün, tarih ve saati tekrar ederek doğruladın. | GEÇTİ |
| 21-084 | gun-21 | `m1:21:p1.n5.s1` | `geri_bildirim_tr` | Kibar ve doğru. Emin değilsen tekrar iste. | GEÇTİ |
| 21-085 | gun-21 | `m1:21:p1.n5.s2` | `geri_bildirim_tr` | Huber Hanım çarşamba ve onu çeyrek geçe dedi. Emin değilsen tekrar iste. | GEÇTİ |
| 21-086 | gun-21 | `m1:21:p1.n6.s0` | `geri_bildirim_tr` | Tarihi ve saati tekrar ettin. Artık eminsin. | GEÇTİ |
| 21-087 | gun-21 | `m1:21:p1.n6.s1` | `geri_bildirim_tr` | **sechzehnte** on altı demek, **sechste** altı. Saat de onu çeyrek geçe. | GEÇTİ |
| 21-088 | gun-21 | `m1:21:p1.n7.s0` | `geri_bildirim_tr` | Güzel bir evet ya da hayır sorusu sordun. | GEÇTİ |
| 21-089 | gun-21 | `m1:21:p1.n7.s1` | `geri_bildirim_tr` | Telefonu doğru kapattın. | GEÇTİ |
| 21-090 | gun-21 | `m1:21:p1.n8.s0` | `geri_bildirim_tr` | Telefonu doğru kapattın. | GEÇTİ |
| 21-091 | gun-21 | `m1:21:p1` | `kapanis_tr` | Telefonda kendini tanıttın, adını harf harf söyledin, günü ve saati doğruladın. | GEÇTİ |
| 21-092 | gun-21 | `m1:21:o1` | `q_tr` | Bu kart ne? | GEÇTİ |
| 21-093 | gun-21 | `m1:21:o1.opt0` | `opts` | Bir randevu kartı | GEÇTİ |
| 21-094 | gun-21 | `m1:21:o1.opt1` | `opts` | Bir fatura | GEÇTİ |
| 21-095 | gun-21 | `m1:21:o1.opt2` | `opts` | Bir davetiye | GEÇTİ |
| 21-096 | gun-21 | `m1:21:o2` | `q_tr` | Randevu hangi gün? | GEÇTİ |
| 21-097 | gun-21 | `m1:21:o2.opt0` | `opts` | 16 Aralık çarşamba | GEÇTİ |
| 21-098 | gun-21 | `m1:21:o2.opt1` | `opts` | 6 Aralık pazar | GEÇTİ |
| 21-099 | gun-21 | `m1:21:o2.opt2` | `opts` | 17 Aralık perşembe | GEÇTİ |
| 21-100 | gun-21 | `m1:21:o3` | `q_tr` | Muayenehaneye ne getirmelisin? | GEÇTİ |
| 21-101 | gun-21 | `m1:21:o3.opt0` | `opts` | kartı | GEÇTİ |
| 21-102 | gun-21 | `m1:21:o3.opt1` | `opts` | kimliği | GEÇTİ |
| 21-103 | gun-21 | `m1:21:o3.opt2` | `opts` | bir hediye | GEÇTİ |
| 21-104 | gun-21 | `m1:21:o4` | `situation_tr` | Derya babanın randevusunu soruyor. Karttaki günü ve saati söyle. | GEÇTİ |
| 21-105 | gun-21 | `m1:21:o4` | `why_tr` | Günde **am**, saatte **um** dersin. | GEÇTİ |
| 21-106 | gun-21 | `m1:21:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 21-107 | gun-21 | `m1:21:s1` | `why_tr` | **Haben Sie** başta, çünkü bu bir evet ya da hayır sorusu. | GEÇTİ |
| 21-108 | gun-21 | `m1:21:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 21-109 | gun-21 | `m1:21:s2` | `why_tr` | **Könnten Sie** kibar bir ricadır. | GEÇTİ |
| 21-110 | gun-21 | `m1:21:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 21-111 | gun-21 | `m1:21:s3` | `why_tr` | Tarihte **am elften** dersin. | GEÇTİ |
| 21-112 | gun-21 | `m1:21:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 21-113 | gun-21 | `m1:21:s4` | `why_tr` | Günde **am**, saatte **um** dersin. | GEÇTİ |
| 21-114 | gun-21 | `m1:21:s5` | `why_tr` | Telefonda önce **hier ist** ve adın gelir. | GEÇTİ |
| 21-115 | gun-21 | `m1:21:s6` | `why_tr` | Kibar ricada **Könnten Sie** başa, **buchstabieren** sona gelir. | GEÇTİ |
| 21-116 | gun-21 | `m1:21:s7` | `why_tr` | **Dienstag** salı, **Donnerstag** perşembe. Telefonda kolay karışır. | GEÇTİ |
| 21-117 | gun-21 | `m1:21:s8` | `why_tr` | O derken **er fährt** dersin, **zur Praxis** muayenehaneye demektir. | GEÇTİ |
| 21-118 | gun-21 | `m1:21:s9` | `situation_tr` | Huber Hanım saati çok hızlı söyledi. Kibarca tekrar etmesini iste. | GEÇTİ |
| 21-119 | gun-21 | `m1:21:s9` | `why_tr` | Anlamadığında **Könnten Sie das wiederholen?** dersin. | GEÇTİ |
| 21-120 | gun-21 | `m1:21:s10` | `situation_tr` | Huber Hanım 16 Aralık çarşambayı öneriyor. Sana uyuyor. | GEÇTİ |
| 21-121 | gun-21 | `m1:21:s10` | `why_tr` | Tarihte **am sechzehnten** dersin. Cevaba **Ja** ile başla. | GEÇTİ |
| 21-122 | gun-21 | `m1:21:s11` | `situation_tr` | Huber Hanım randevuyu söylüyor. Gün, tarih ve saati tekrar ederek doğrula. | GEÇTİ |
| 21-123 | gun-21 | `m1:21:s11` | `why_tr` | Doğrularken günü, tarihi ve saati soru gibi tekrar edersin. | GEÇTİ |
| hst-001 | hafta-sonu-testi-03 | `m1:21:t01` | `situation_tr` | Cuma saat on birde vaktin var. Evet de, günü ve saati tekrar et. | GEÇTİ |
| hst-002 | hafta-sonu-testi-03 | `m1:21:t01` | `why_tr` | Soru **Haben Sie** ile başlıyor. Cevapta **habe ich Zeit** dersin. | GEÇTİ |
| hst-003 | hafta-sonu-testi-03 | `m1:21:t02` | `why_tr` | **Könnten Sie** başa gelir, **geben** en sona gider. | GEÇTİ |
| hst-004 | hafta-sonu-testi-03 | `m1:21:t03` | `why_tr` | Günlerle **am**, saatle **um**, aylarla **im** dersin. | GEÇTİ |
| hst-005 | hafta-sonu-testi-03 | `m1:21:t04` | `situation_tr` | Adresin Brunnengasse 7. Sokağı söyle ve ilk harfi bir adla netleştir. | GERİ |
| hst-006 | hafta-sonu-testi-03 | `m1:21:t04` | `why_tr` | Telefonda harfi bir adla söylersin: **B wie Berta** ya da **B wie Berlin**. | GEÇTİ |
| hst-007 | hafta-sonu-testi-03 | `m1:21:t05` | `instr_tr` | Bu soruyu daha kibar söyle. **Könnten Sie** ile başla. | GEÇTİ |
| hst-008 | hafta-sonu-testi-03 | `m1:21:t05` | `why_tr` | **Können** yerine **Könnten** daha kibar duyulur. Gerisi aynı kalır. | GEÇTİ |
| hst-009 | hafta-sonu-testi-03 | `m1:21:t06` | `situation_tr` | Huber Hanım randevuyu söylüyor. Günü, tarihi ve saati tekrar ederek doğrula. | GEÇTİ |
| hst-010 | hafta-sonu-testi-03 | `m1:21:t06` | `why_tr` | Doğrularken günü, tarihi ve saati soru gibi tekrar edersin. | GEÇTİ |
| hst-011 | hafta-sonu-testi-03 | `m1:21:t07` | `why_tr` | O derken **fahren** kelimesinde **a** harfi **ä** olur: **er fährt**. | GEÇTİ |
| hst-012 | hafta-sonu-testi-03 | `m1:21:t08` | `situation_tr` | Tobi seni cumartesi alışverişe çağırıyor. Cumartesi vaktin yok. | GEÇTİ |
| hst-013 | hafta-sonu-testi-03 | `m1:21:t08` | `why_tr` | Kibar hayır için **leider** ekle. | GEÇTİ |
| hst-014 | hafta-sonu-testi-03 | `m1:21:t09` | `why_tr` | Kibar evet ya da hayır sorusunda **Haben Sie** başa gelir. | GEÇTİ |
| hst-015 | hafta-sonu-testi-03 | `m1:21:t10` | `situation_tr` | Muayenehaneye ne zaman gitmelisin? Günü ve saati Almanca söyle. | GEÇTİ |
| hst-016 | hafta-sonu-testi-03 | `m1:21:t10` | `why_tr` | Çarşamba kapalı. **am Donnerstag um acht** gitmelisin. | GEÇTİ |
| hst-017 | hafta-sonu-testi-03 | `m1:21:t11` | `why_tr` | Evet ya da hayır sorusunda **Ist** başa gelir. | GEÇTİ |
| hst-018 | hafta-sonu-testi-03 | `m1:21:t12` | `situation_tr` | Firmayı arıyorsun. Kendini tanıt ve kibarca Derya Aksoy'a bağlanmak iste. | GEÇTİ |
| hst-019 | hafta-sonu-testi-03 | `m1:21:t12` | `why_tr` | Önce **hier ist** ve adın. Sonra **Könnten Sie mich mit** ve kişinin adı. | GERİ |
| gor-001 | gorulmemis-03 | `m1:h03:g1` | `durum_tr` | Bir eczaneyi arıyorsun. Eczacı açıyor. Kendini tanıt ve cumartesi açık mı diye sor. | GEÇTİ |
| gor-002 | gorulmemis-03 | `m1:h03:g1` | `why_tr` | Önce **hier ist** ve adın. Sonra **Haben Sie** ile evet ya da hayır sorusu. | GEÇTİ |
| gor-003 | gorulmemis-03 | `m1:h03:g2` | `durum_tr` | Spor salonundan bir görevli seni arıyor. Deneme antrenmanı için adını ve yazılışını soruyor. | GEÇTİ |
| gor-004 | gorulmemis-03 | `m1:h03:g2` | `why_tr` | Adını söyle, sonra **Ich buchstabiere** de ve harfleri yavaşça söyle. | GEÇTİ |
| gor-005 | gorulmemis-03 | `m1:h03:g3` | `durum_tr` | Bisiklet tamircisi hızlı bir sesli mesaj bırakmış. Geri arıyorsun. Saati anlamadın, kibarca tekrar ettir. | GEÇTİ |
| gor-006 | gorulmemis-03 | `m1:h03:g3` | `why_tr` | Anlamadığında kibarca **Könnten Sie** ile tekrar istersin. | GEÇTİ |
| gor-007 | gorulmemis-03 | `m1:h03:g4` | `durum_tr` | Ioana'yı arıyorsun, annesi açıyor. Ioana'nın döneceği günü duyunca tarihiyle doğrula. Salı ayın on beşi. | GEÇTİ |
| gor-008 | gorulmemis-03 | `m1:h03:g4` | `why_tr` | Günü duyunca tarihi **am** ve sıra sayısıyla tekrar ederek doğrularsın. | GERİ |

## Fark turu (23.11)

Kapsam: ilk turdan sonra değişen ya da eklenen, öğrenciye görünen Türkçe açıklama alanları. Alan listesi ilk turla aynı. Farkı git ile değil, ilk turda çıkardığım alan dökümüyle bugünkü dosyaları karşılaştırarak buldum: aynı alan çıkarıcı, aynı anahtar (öğe, alan, sıra). Böylece yalnız benim turumdan sonra değişenler geldi. `grammar.json` için karşılaştırma ilk turdaki tabloya göre yapıldı.

- İçerik dosyalarında 44 alanın metni değişti, 23 alan eklendi. Eklenenlerin 7'si birleşen halkalardan taşınan, metni aynı kalıplar.
- 29 alan silindi; değerlendirilmedi. Bunlar `gun-16`/`gun-17` h4, `gun-18`/`gun-19` h3 halkalarının kalıpları, sahne ve soruları; halkalar birleşmiş.
- `grammar.json`'daki 17 durakta 15 alan değişti. Değişenlerin hepsi ilk turun GERİ'leri; GEÇTİ alanlara dokunulmamış.
- Metni aynı kalıp bağlamı değişen 31 alanı da kontrol ettim; sayıya katmadım. Bağlam derken sahne satırı, kayıt metni, prova satırı ya da şıklar. Hepsi yeni bağlamla da tutuyor; GERİ yok.

| Öğe kimliği | Alan | Durum | Açıklama | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|
| `gun-15` · `m1:15:h1.kalip2` | `kaliplar.tr` | yeni̇ | Hangi …? | Hangi şey diye sorarım. | GEÇTİ |  |
| `gun-15` · `m1:15:h4.soru` | `q_tr` | deği̇şti̇ | Derya bugün nasıl geliyor? | Derya bugün işe nasıl geliyor? | GEÇTİ |  |
| `gun-15` · `m1:15:a2.b1.ay1` | `q_tr` | deği̇şti̇ | Bu aramada biri ne zaman telefona çıkacak? | Telefonda biri ne zaman cevap verecek? | GEÇTİ | Önceki GERİ (15-082) kapandı: **telefona çıkmak** tek okumalı. |
| `gun-15` · `m1:15:a2.b1.ay1.opt1` | `opts` | deği̇şti̇ | Yarın sabah | Yanlış şık: yarın sabah. | GEÇTİ |  |
| `gun-16` · `m1:16:h1.kalip4` | `kaliplar.tr` | yeni̇ | Peki, tamam! | Peki, olsun, tamam. | GEÇTİ |  |
| `gun-16` · `m1:16:h1.kalip5` | `kaliplar.tr` | yeni̇ | Kimin adına? | Kimin adına diye sorulur. | GEÇTİ |  |
| `gun-16` · `m1:16:h1.kalip6` | `kaliplar.tr` | yeni̇ | … istiyorum | Bir şey istediğimi söylerim. | GEÇTİ | h4 halkasından taşındı, metin aynı. |
| `gun-16` · `m1:16:a2:e1` | `why_tr` | deği̇şti̇ | Paltolar bugün ucuz. Akşam sekizde mağaza kapanıyor. | Paltolar ucuz, mağaza akşam sekizde kapanıyor. | GEÇTİ |  |
| `gun-17` · `m1:17:h1.kalip2` | `kaliplar.tr` | yeni̇ | istasyonda – cuma günü | am hem yer hem gün için: istasyonda, cuma günü. | GEÇTİ | h4 halkasından taşındı, metin aynı. |
| `gun-17` · `m1:17:h2.soru.opt0` | `opts` | deği̇şti̇ | Çarşamba | Doğru şık: çarşamba. | GEÇTİ | Sahne artık **Mittwoch** diyor, uyuyor. |
| `gun-17` · `m1:17:a2` | `ortam_tr` | deği̇şti̇ | Ertesi gün Bürgerbüro'da Schneider Hanım'ı yeniden arıyorsun. Telesekreter açılıyor. | Ertesi gün yine arıyorum, telesekreter çıkıyor. | GEÇTİ |  |
| `gun-17` · `m1:17:a2:e1` | `why_tr` | deği̇şti̇ | Schneider Hanım bugün yok. Kimlik için başka bir hat veriyor: dahili on iki. | Schneider Hanım yok; kimlik için on iki numaralı hattı aramalıyım. | GEÇTİ |  |
| `gun-17` · `m1:17:o4` | `q_tr` | deği̇şti̇ | Schneider Hanım'ın dahili numarası ne? | Schneider Hanım'ın dahili numarası kaç? | GEÇTİ | Okuma metniyle (**drei, vier, null**) uyuyor. |
| `gun-17` · `m1:17:o4.opt0` | `opts` | deği̇şti̇ | üç, dört, sıfır | Doğru şık: üç, dört, sıfır. | GEÇTİ |  |
| `gun-17` · `m1:17:o4.opt1` | `opts` | deği̇şti̇ | dört, üç, sıfır | Yanlış şık: sıra karışık. | GEÇTİ |  |
| `gun-17` · `m1:17:o4.opt2` | `opts` | deği̇şti̇ | üç, dört, dokuz | Yanlış şık: son rakam farklı. | GEÇTİ |  |
| `gun-17` · `m1:17:o5` | `situation_tr` | deği̇şti̇ | Schneider Hanım'ı geri arıyorsun, o açıyor. Kendini tanıt. Sonra **Rückruf** istediğini hatırlat ya da kimliğin için aradığını söyle. | Adımı söyleyip geri arama istediğini hatırlatırım ya da kimliğim için aradığımı söylerim. | GEÇTİ | Önceki GERİ (17-124) kapandı: iki yol da kabul listesinde var (**Sie möchten einen Rückruf?**, **Es geht um meinen Ausweis**). |
| `gun-17` · `m1:17:s8` | `why_tr` | deği̇şti̇ | Telefonu kapatmak **auflegen** demektir. **Legen Sie** derken **auf** en sona gider: **Legen Sie nicht auf!** | auflegen kapatmak; Legen Sie derken auf sona gider. | GEÇTİ | Önceki GERİ (17-137) kapandı. |
| `gun-17` · `m1:17:s11` | `why_tr` | deği̇şti̇ | Önce **hier ist** ve adın. Sonra **Könnten Sie mich mit**, kişinin adı ve sonda **verbinden**. | hier ist ve adım, sonra Könnten Sie mich mit, kişinin adı, en sonda verbinden. | GEÇTİ | Önceki GERİ (17-143) kapandı. |
| `gun-18` · `g18` | `goal_tr` | deği̇şti̇ | Kuaförde randevu alırken saati **um**, günü **am**, ayı **im** ile söylersin. | Kuaförde saati um, günü am, ayı im ile söylerim. | GEÇTİ | Önceki GERİ (18-001) kapandı: 11 kelime, eşleşme doğru, tek fikir. |
| `gun-18` · `m1:18:h1.kalip2` | `kaliplar.tr` | yeni̇ | Luka'da – bizde | Luka'nın yerinde, bizim yerimizde. | GEÇTİ |  |
| `gun-18` · `m1:18:h1.kalip3` | `kaliplar.tr` | yeni̇ | … günü saat …'de – … ayında | Gün ve saat birlikte, ay ayrı. | GEÇTİ | h3 halkasından taşındı, metin aynı. |
| `gun-18` · `m1:18:h2.kalip5` | `kaliplar.tr` | yeni̇ | …'den …'e kadar – …'den itibaren | Bir saatten bir saate kadar; bir zamandan itibaren. | GEÇTİ | h3 halkasından taşındı, metin aynı. |
| `gun-18` · `m1:18:h2.kalip6` | `kaliplar.tr` | yeni̇ | doktora – kursa | Doktora, kursa gitmek. | GEÇTİ |  |
| `gun-18` · `m1:18:h2.kalip7` | `kaliplar.tr` | yeni̇ | kursumuz – şefimiz | Bizim kursumuz, bizim şefimiz. | GEÇTİ |  |
| `gun-18` · `m1:18:h2.soru.opt1` | `opts` | deği̇şti̇ | Cumartesi | Doğru şık: cumartesi. | GEÇTİ | Sahne artık **Samstag** diyor, uyuyor. |
| `gun-18` · `m1:18:h2.soru.opt2` | `opts` | deği̇şti̇ | Pazartesi | Yanlış şık: pazartesi. | GEÇTİ |  |
| `gun-18` · `m1:18:v1:c1` | `situation_tr` | deği̇şti̇ | Luka sana da soruyor. Cuma saat dört olmuyor. Sen cumartesi saat onda gelebilirsin. | Cuma dört olmuyor; ben cumartesi onda gelebilirim. | GEÇTİ |  |
| `gun-18` · `m1:18:a2` | `ortam_tr` | deği̇şti̇ | Luka'dan cuma günü saat dört için randevu istemiştin. Luka telefonuna mesaj bırakmış. | Cuma dört için randevu istemiştim; Luka mesaj bırakmış. | GEÇTİ |  |
| `gun-18` · `m1:18:a2.b1.ana.opt0` | `opts` | deği̇şti̇ | Sana başka bir zaman önermek için | Doğru şık: başka bir zaman önermek için. | GEÇTİ |  |
| `gun-18` · `m1:18:a2:e1.opt0` | `opts` | deği̇şti̇ | Cuma sabah haber vermeden salona git. | Yanlış şık: cuma sabah habersiz gitmek. | GEÇTİ |  |
| `gun-18` · `m1:18:a2:e1.opt1` | `opts` | deği̇şti̇ | Luka'yı ara, cumartesi saat onu ya da salıdan itibaren bir öğleden sonrayı seç. | Doğru şık: Luka'yı ara, cumartesi on ya da salıdan sonra bir öğleden sonra seç. | GEÇTİ |  |
| `gun-18` · `m1:18:a2:e1.opt2` | `opts` | deği̇şti̇ | Bir şey yapma, cuma saat dörtte git. | Yanlış şık: hiçbir şey yapmadan cuma dörtte gitmek. | GEÇTİ |  |
| `gun-18` · `m1:18:a2:e1` | `why_tr` | deği̇şti̇ | Cuma saat dört olmuyor. Luka cumartesi saat onu ya da salıdan itibaren öğleden sonrayı öneriyor. | Cuma dört olmuyor; Luka cumartesi onu ya da salıdan itibaren öğleden sonraları öneriyor. | GEÇTİ |  |
| `gun-18` · `m1:18:p1` | `durum_tr` | deği̇şti̇ | Luka'nın mesajını dinledin, ama cuma günü saat dört senin için en iyisi. Bir kez daha sormak için Salon Haarwerk'i aradın, bekleme hattında uzun bekledin. Sonunda Luka açıyor. | Mesajı dinledim ama cuma dört bana en iyisi; bir kez daha sormak için aradım, uzun bekledim, Luka açıyor. | GEÇTİ | Cümleler 12 ve 12 kelime. |
| `gun-18` · `m1:18:p1.n3b.s1` | `geri_bildirim_tr` | deği̇şti̇ | **bis zwölf** saat on ikiye kadar demek. Saat on ikide Luka gidiyor. | bis zwölf on ikiye kadar; on ikide Luka gidiyor. | GEÇTİ | Prova metni **bis zwölf** diyor, uyuyor. |
| `gun-18` · `m1:18:p1.n5.s0` | `geri_bildirim_tr` | deği̇şti̇ | Güzel bir kapanış. Günü ve saati bir kez daha söyledin. | Günü ve saati bir kez daha söyledim. | GEÇTİ | Önceki GERİ (18-102) kapandı. |
| `gun-18` · `g18.yazma` | `gorev_tr` | deği̇şti̇ | Ioana'ya cevap yaz. Senin de Luka'da randevun var: cumartesi saat onda. | Ioana'ya yaz: benim de cumartesi onda randevum var. | GEÇTİ |  |
| `gun-18` · `m1:18:s10` | `situation_tr` | deği̇şti̇ | Luka salı saat onu soruyor. Saat on olmuyor, öğleden sonra olur. | Luka salı onu soruyor; on olmuyor, öğleden sonra olur. | GEÇTİ | Soru artık **Dienstag**, uyuyor. |
| `gun-19` · `m1:19:h1.kalip3` | `kaliplar.tr` | yeni̇ | Tamam! – Tamam mı? | Tamam; tamam mı diye sormak. | GEÇTİ |  |
| `gun-19` · `m1:19:h1.kalip4` | `kaliplar.tr` | yeni̇ | herkes – her gün | Herkes; her gün. | GEÇTİ |  |
| `gun-19` · `m1:19:h2.kalip3` | `kaliplar.tr` | yeni̇ | istasyona | İstasyona gitmek. | GEÇTİ |  |
| `gun-19` · `m1:19:h2.kalip4` | `kaliplar.tr` | yeni̇ | yiyorum – yiyorsun – yiyor | Yemek: ben, sen, o. | GEÇTİ | h3 halkasından taşındı, metin aynı. |
| `gun-19` · `m1:19:h2.kalip5` | `kaliplar.tr` | yeni̇ | görüyorum – görüyorsun – görüyor | Görmek: ben, sen, o. | GEÇTİ | h3 halkasından taşındı, metin aynı. |
| `gun-19` · `m1:19:h2.kalip6` | `kaliplar.tr` | yeni̇ | …'i severim – …'i sever misin? | Bir şeyi severim; sever misin? | GEÇTİ | h3 halkasından taşındı, metin aynı. |
| `gun-19` · `m1:19:p1.n2.s1` | `geri_bildirim_tr` | deği̇şti̇ | Güzel. **wir** ile kelime değişmez: **wir reden**, **wir sprechen**. | wir ile kelime aynı kalır: wir reden, wir sprechen. | GEÇTİ | Önceki GERİ (19-092) kapandı: terim yok, örnek var. |
| `gun-19` · `m1:19:o1` | `q_tr` | deği̇şti̇ | Ioana cuma günü nasıl gidiyor? | Ioana cuma günü neyle gidiyor? | GEÇTİ | Okuma metniyle (**Am Freitag … mit dem Fahrrad**) uyuyor. |
| `gun-19` · `m1:19:o2` | `q_tr` | deği̇şti̇ | Basti cuma günü nasıl gidiyor? | Basti cuma günü neyle gidiyor? | GEÇTİ |  |
| `gun-20` · `m1:20:o4` | `situation_tr` | deği̇şti̇ | Ioana randevunu soruyor. Yeni tarihi söyle. | Ioana soruyor; yeni tarihi söylerim. | GEÇTİ |  |
| `gun-21` · `m1:21:h1.kalip6` | `kaliplar.tr` | yeni̇ | bizde – Dr. Weber'de | Bizim yerimizde, Dr. Weber'in yerinde. | GEÇTİ |  |
| `gun-21` · `m1:21:v1.b1.ay1` | `q_tr` | deği̇şti̇ | Tobi ne getirmeli? | Tobi muayenehaneye ne götürmeli? | GEÇTİ |  |
| `gun-21` · `m1:21:v1.b1.ay1.opt0` | `opts` | deği̇şti̇ | babasının kartını | Doğru şık: babasının kartı. | GEÇTİ |  |
| `gun-21` · `m1:21:v1.b1.ay1.opt1` | `opts` | deği̇şti̇ | babasının kimliğini | Yanlış şık: babasının kimliği. | GEÇTİ |  |
| `gun-21` · `m1:21:a1.b1.ay0.opt2` | `opts` | deği̇şti̇ | 18 Aralık cuma | Yanlış şık: 18 Aralık cuma. | GEÇTİ |  |
| `gun-21` · `m1:21:a2:c1` | `situation_tr` | deği̇şti̇ | Derya'yı geri arıyorsun. Baban hasta, yarın muayenehaneye gidiyor. İkisini de söyle. | Babamın hasta olduğunu ve yarın muayenehaneye gittiğini söylerim. | GEÇTİ |  |
| `gun-21` · `m1:21:o2.opt2` | `opts` | deği̇şti̇ | 18 Aralık cuma | Yanlış şık: 18 Aralık cuma. | GEÇTİ |  |
| `gun-21` · `m1:21:s11` | `situation_tr` | deği̇şti̇ | Huber Hanım randevuyu söylüyor. Tekrar ederek doğrula: gün ya da tarih, yanında saat. | Duyduğumu tekrar ederek doğrularım: günü ya da tarihi, yanında saati. | GEÇTİ |  |
| `hafta-sonu-testi-03` · `m1:21:t04` | `situation_tr` | deği̇şti̇ | Adresin Brunnengasse yedi numara. Sokağın adını söyle ve ilk harfi bir adla netleştir. | Adresim Brunnengasse yedi; sokağın adını söyleyip ilk harfi bir adla netleştiririm. | GEÇTİ | Önceki GERİ (hst-005) kapandı. |
| `hafta-sonu-testi-03` · `m1:21:t06` | `situation_tr` | deği̇şti̇ | Huber Hanım randevuyu söylüyor. Tekrar ederek doğrula: gün ya da tarih, yanında saat. | Randevuyu tekrar ederek doğrularım: gün ya da tarih, yanında saat. | GEÇTİ |  |
| `hafta-sonu-testi-03` · `m1:21:t12` | `why_tr` | deği̇şti̇ | Önce **hier ist** ve adın. Sonra **Könnten Sie mich mit**, kişinin adı ve sonda **verbinden**. | hier ist ve adım, sonra Könnten Sie mich mit, kişinin adı, en sonda verbinden. | GEÇTİ | Önceki GERİ (hst-019) kapandı. |
| `gorulmemis-03` · `m1:h03:g4` | `why_tr` | deği̇şti̇ | Günü duyunca tarihi tekrar ederek doğrularsın: **am fünfzehnten**. | Günü duyunca tarihi am fünfzehnten diye tekrar ederim. | GEÇTİ | Önceki GERİ (gor-008) kapandı: terim yok, örnek var. |
| `gorulmemis-03` · `m1:h03:g5` | `durum_tr` | yeni̇ | Diş hekiminin sekreteri bu hafta yer olmadığını söylüyor ve ocakta ne zaman gelebileceğini soruyor. Sana pazartesi saat dokuz uyuyor. | Diş hekiminde bu hafta yer yok; ocakta ne zaman gelebileceğimi soruyorlar; bana pazartesi dokuz uyuyor. | GEÇTİ | İlk cümle tam 14 kelime. |
| `gorulmemis-03` · `m1:h03:g5` | `why_tr` | yeni̇ | Gün için **am**, saat için **um** dersin: **am Montag um neun**. | Gün için am, saat için um: am Montag um neun. | GEÇTİ |  |
| `gorulmemis-03` · `m1:h03:g6` | `durum_tr` | yeni̇ | Kafede yeni tanıştığın biri arkadaşın Ioana'yı soruyor. Ioana her gün bisikletle gidiyor ve iyi Almanca konuşuyor. | Yeni tanıştığım biri Ioana'yı soruyor; Ioana bisikletle gidiyor, iyi Almanca konuşuyor. | GEÇTİ | Soru yalnız otobüs mü bisiklet mi diye soruyor. Almanca bilgisi cevapta istenmiyor ama kafa karıştırmadı. |
| `gorulmemis-03` · `m1:h03:g6` | `why_tr` | yeni̇ | Başkası için **sie fährt** dersin. **fahren** kelimesindeki **a**, **ä** olur. | Başkası için sie fährt; a harfi ä olur. | GEÇTİ |  |
| `gorulmemis-03` · `m1:h03:g7` | `durum_tr` | yeni̇ | Fizyoterapi muayenehanesi randevunu söylüyor. Tekrar ederek doğrula: gün ya da tarih, yanında saat. | Fizyoterapi randevumu söylüyor; günü ya da tarihi ve saati tekrar ederek doğrularım. | GEÇTİ |  |
| `gorulmemis-03` · `m1:h03:g7` | `why_tr` | yeni̇ | Doğrularken günü ya da tarihi ve saati soru gibi tekrar edersin. | Günü ya da tarihi ve saati soru gibi tekrar ederim. | GEÇTİ |  |
| `registry/grammar.json` · `gr:a1-02:t3` | `h_tr` | değişti (önceki GERİ) | Evet ya da hayır sorusu: Hast du Zeit? | Evet-hayır sorusu: Hast du Zeit? gibi. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-02:t3` | `tr` | değişti (önceki GERİ) | Evet ya da hayır sorusunda soru kelimesi yoktur. Soru sorarken **hast**, **bist**, **kommst** gibi kelime en başa geçer. **Du hast Zeit** soruda **Hast du Zeit?** olur. Kelimelerin sırası değişince cümle soru olur. Cevap çoğu zaman **Ja** ya da **Nein** ile başlar. | Soruda hast, bist gibi kelime başa geçer; sıra değişince soru olur; cevap Ja ya da Nein. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-12:t1` | `tr` | değişti (önceki GERİ) | Birinden kibarca bir şey isterken **Können Sie** yerine **Könnten Sie** dersin. **Könnten** daha yumuşak ve daha kibar duyulur. Soru **Könnten Sie** ile başlar, **wiederholen** gibi iş bildiren kelime en sona gider. Örneğin **Könnten Sie das bitte wiederholen?** diye sorarsın. Aynı anlamda **Würden Sie bitte langsam sprechen?** da duyarsın. | Könnten Sie daha kibar; wiederholen gibi iş anlatan kelime sona gider. | GEÇTİ | **iş bildiren kelime** terim değil, örnekle açık. |
| `registry/grammar.json` · `gr:a1-02:t4` | `tr` | değişti (önceki GERİ) | **sprechen** konuşmak demektir. **du** ile ve **er**, **sie**, **es** ile ortadaki **e** harfi **i** olur. Yani **du sprichst** ve **er spricht** dersin. **ich** ve **wir** ile değişmez: **ich spreche**, **wir sprechen**. | sprechen: du ve er ile e harfi i olur; ich ve wir ile değişmez. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-06:t2` | `h_tr` | değişti (önceki GERİ) | Harfi değişen kelimeler: du liest, er fährt | Bazı kelimelerde harf değişiyor: du liest, er fährt. | GEÇTİ | Başlıktaki **du liest** metinde açıklanmıyor, tabloda var; engel değil. |
| `registry/grammar.json` · `gr:a1-06:t2` | `tr` | değişti (önceki GERİ) | Bazı sık kelimelerde **du** ile ve **er**, **sie**, **es** ile ortadaki harf değişir. **a** harfi **ä** olur: **fahren**, **du fährst**, **er fährt**. **e** harfi **i** olur: **essen**, **du isst**, **er isst**. **e** harfi **ie** olur: **sehen**, **du siehst**, **er sieht**. **ich**, **wir** ve **Sie** ile hiçbir şey değişmez. | du ve er ile a ä, e i ya da ie olur; ich, wir, Sie ile değişmez. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-12:t4` | `tr` | değişti (önceki GERİ) | Tarihte sayıyı **erste**, **zweite**, **dritte** diye söylersin. Bugünün tarihini söylerken **Heute ist der erste Mai** dersin. Bir şeyin hangi tarihte olduğunu **am** ile söylersin: **am ersten Mai**. **am** gelince sona **n** eklenir: **erste**, **am ersten**. Yazıda **am 1. Mai** yazılır, **am ersten Mai** diye okunur. | Tarihte erste, zweite der; am gelince sona n gelir: am ersten. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-04:t3` | `tr` | değişti (önceki GERİ) | **ist** ya da **sind** sonrasında **groß** gibi kelime hiç değişmez. **Der Tisch ist groß**, **die Küche ist groß** ve **das Bad ist groß** dersin. Renkler de böyledir: **Das Sofa ist grau** dersin. Fikrini sormak için **Wie findest du die Küche?** diye sorarsın. Cevap **Ich finde sie schön** olur. | ist ya da sind'den sonra groß gibi kelime değişmez; Wie findest du ile fikir sorarım. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-04:t4` | `tr` | değişti (önceki GERİ) | **sehr** çok demektir ve anlamı güçlendirir: **sehr schön**. **ziemlich** oldukça demektir: **ziemlich groß**. **zu** ise gereğinden fazla demektir ve bir sorun bildirir. **Die Wohnung ist zu teuer** dersen o evi tutamazsın. Türkçede ikisine de çok deriz ama Almancada farklıdır. **nicht** ile değil dersin: **Das Zimmer ist nicht groß**. | sehr çok, ziemlich oldukça, zu fazla ve sorunlu, nicht değil. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-13:t1` | `h_tr` | değişti (önceki GERİ) | Hangi ve bu: welcher ve dieser | Hangi ve bu: welcher ve dieser. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-13:t1` | `tr` | değişti (önceki GERİ) | **welcher** hangi, **dieser** bu demektir. Sonları eşyanın **der**, **die**, **das** kelimesine göre değişir: **welcher Tisch**, **welche Lampe**, **welches Bett**. Birden çok eşya için **welche** ve **diese** dersin. Bir şeyi alırken **der** ile giden eşyada son **en** olur: **Ich nehme diesen Tisch**. | welcher hangi, dieser bu; son der, die, das'a göre değişir; çok eşyada welche, diese; alırken der'li eşyada sonu en. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-13:t2` | `tr` | değişti (önceki GERİ) | İki şeyi karşılaştırırken kelimenin sonuna **er** eklersin: **billig**, **billiger**. Neyle karşılaştırdığını **als** ile söylersin: **billiger als der Tisch**. Bazı kısa kelimelerde **a**, **o**, **u** harfi **ä**, **ö**, **ü** olur: **groß**, **größer**. **gut** kuralı bozar, **besser** olur. Aynı derecede demek için **so** ve **wie** kullanırsın: **so teuer wie das Sofa**. | Daha için sona er; als ile neyle; bazı kısa kelimelerde ä, ö, ü; gut besser; aynı derecede so … wie. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-13:t3` | `h_tr` | değişti (önceki GERİ) | En ucuz, en iyi: am billigsten, am besten | En ucuz, en iyi: am billigsten, am besten. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-13:t3` | `tr` | değişti (önceki GERİ) | En demek için başa **am** gelir, kelimenin sonuna **sten** eklenir: **billig**, **am billigsten**. Daha derken gelen **ä**, **ö**, **ü** burada da kalır: **groß**, **am größten**. **gut** yine kuralı bozar: **am besten**. Soru da aynı yolla kurulur: **Welche Wohnung ist am billigsten?** | En için am ve sonuna sten; ä, ö, ü kalır; gut am besten. | GEÇTİ | Önceki GERİ kapandı: terim yok. |
| `registry/grammar.json` · `gr:a1-11:t1` | `tr` | değişti (önceki GERİ) | **Wo** nerede demektir. **in** bir şeyin içinde, **an** kenarında, **auf** üstünde demektir. Bunlardan sonra **der** ve **das** değişip **dem** olur. **die** ise **der** olur: **an der Tür**. **in dem** kısalıp **im** olur: **im Bad**. **an dem** de kısalıp **am** olur. | in içinde, an kenarında, auf üstünde; der ve das dem, die der olur; in dem im, an dem am. | GEÇTİ | Önceki GERİ kapandı: terim yok. |

**Fark turu toplamı:** 82 alan · GEÇTİ 82 · GERİ 0.

**Önceki 25 GERİ'nin durumu:** 25'i de yeni metinde GEÇTİ.
- İçerik dosyalarındaki 10'u: 15-082, 17-124, 17-137, 17-143, 18-001, 18-102, 19-092, hst-005, hst-019, gor-008.
- `grammar.json`'daki 15'i: 02:t3 h_tr ve tr; 12:t1 tr; 02:t4 tr; 06:t2 h_tr ve tr; 12:t4 tr; 04:t3 tr; 04:t4 tr; 13:t1 h_tr ve tr; 13:t2 tr; 13:t3 h_tr ve tr; 11:t1 tr.

Bu turla birlikte bu dokuz içerik dosyasında ve 17 durakta açık okur GERİ'si kalmadı (OD-9.4). Kapsam dışı not aynen duruyor: `gun-21` prova başlığındaki **Haftanın kapısı** sözü.
