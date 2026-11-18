# Okur kontrolü — 15 kalıp (`content/v2/registry/patterns.json`)

Tarih: 2026-11-18 · Rol: okur (OD-9.3, PM-017) · Kontrol eden: QA ajanı, okur kimliğiyle (yalnızca Türkçe, Almanca A2, dilbilgisi terimi bilmez)

Kapsam: 15 kalıbın `grammar_tr` ve `mistakes_tr[]` alanlarının hepsi (örneklem değil): `pt:geht-es-auch`, `pt:ich-habe`, `pt:ich-moechte`, `pt:ich-verstehe-nicht`, `pt:koennten-sie`, `pt:mir-tut-weh`, `pt:noch-mal`, `pt:passt-ihnen`, `pt:perfekt-haben`, `pt:seit`, `pt:um-uhr`, `pt:was-heisst`, `pt:wenn`, `pt:wuerden-sie`, `pt:wie-viel-kostet`.

Ölçüt (OD-9.2): bir alan bir fikir · cümle ≤ 14 kelime · `=`, `;`, `…` ve tırnak içinde Almanca yok · öğretilmemiş dilbilgisi terimi yok · açıklama ekrandaki ifadenin kendisini anlatır · tek okumada anlaşılır. `**kalın**` işaretleri ekranda kalın yazı olarak okundu, sembol sayılmadı.

Betikle ayrıca sayıldı: en uzun cümle 14 kelimeyi geçmiyor, yasak sembol yok. Karar her satır için elle verildi. `grammar_tr` alanlarında birden çok ayrı kural varsa "bir alan bir fikir" ölçütüyle GERİ verildi; neden sütununda kural sayısı ve cümlelerin tek tek anlaşılıp anlaşılmadığı ayrıca yazıldı.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `pt:geht-es-auch` | `grammar_tr` | **Es geht** olur, mümkün demektir. Soruda **geht** başa geçer: **Geht es auch am Freitag?** **auch** burada başka bir seçeneği nazikçe önerir. Konuşmada kısalır: **Geht das auch?** ya da **Geht's auch morgen?** | Es geht olur demek. Soruda geht başa gelir. auch başka bir seçenek önerir. Konuşmada Geht's olur. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (anlamı, soruda sıralama, auch'un işlevi, konuşmadaki kısalma). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 2 | `pt:geht-es-auch` | `mistakes_tr[0]` | **Es geht auch am Freitag?** yalnızca konuşmada duyulur. Doğru soru **geht** ile başlar: **Geht es auch am Freitag?** | Es geht auch am Freitag? konuşmada duyuluyor; doğru soru geht ile başlıyor. | **GERİ** | Çelişkili: önce konuşmada duyulur diyor (yani kullanılabilir mi?), sonra doğrusu başka diyor. Ben konuşurken hangisini söyleyeceğimi bilemedim; denmez de demiyor. |
| 3 | `pt:geht-es-auch` | `mistakes_tr[1]` | **gehen** burada gitmek değil, mümkün olmak demektir. | gehen burada gitmek değil, olmak, mümkün olmak. | GEÇTİ |  |
| 4 | `pt:geht-es-auch` | `mistakes_tr[2]` | **Wie geht's?** ise nasılsın demektir, bununla karıştırma. | Wie geht's nasılsın demek; bununla karıştırmayacağım. | GEÇTİ |  |
| 5 | `pt:geht-es-auch` | `mistakes_tr[3]` | **ob** gelince **geht** sona gider: **ob es auch am Freitag geht**. | ob gelince geht sona gidiyor. | **GERİ** | ob ne demek ve ne zaman gelir bilmiyorum; bu kalıbın örneklerinde de ob yok. Örnek yarım bir cümle, anlamını çıkaramadım. |
| 6 | `pt:geht-es-auch` | `mistakes_tr[4]` | **Es hat nicht gegangen** denmez. Doğrusu **Es ist nicht gegangen**. | Es hat nicht gegangen yanlış, Es ist nicht gegangen doğru. | GEÇTİ |  |
| 7 | `pt:geht-es-auch` | `mistakes_tr[5]` | Olmadı demek için **Es hat nicht geklappt** da çok duyulur. | Olmadı demek için Es hat nicht geklappt da denir. | GEÇTİ | Hata değil, başka bir söyleyiş; ama anlaşılır. |
| 8 | `pt:ich-habe` | `grammar_tr` | Türkçede ateşim var dersin. Almancada bunu **Ich habe Fieber** diye söylersin. **der** ile söylenen kelimede **ein** yerine **einen** gelir: **einen Termin**. Konuşmada **Ich habe** çoğu zaman **Ich hab** olur. | Ateşim var Almancada Ich habe Fieber. der'li kelimede einen olur. Konuşmada Ich hab. | **GERİ** | Birden fazla fikir: 3 ayrı kural tek alanda (Türkçedeki var yerine habe, einen, konuşmada hab). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 9 | `pt:ich-habe` | `mistakes_tr[0]` | **Es gibt Fieber** denmez. Doğrusu **Ich habe Fieber**. | Es gibt Fieber yanlış, Ich habe Fieber doğru. | GEÇTİ |  |
| 10 | `pt:ich-habe` | `mistakes_tr[1]` | **Ich habe ein Termin** denmez. Doğrusu **Ich habe einen Termin**. | Ich habe ein Termin yanlış, einen Termin doğru. | GEÇTİ |  |
| 11 | `pt:ich-habe` | `mistakes_tr[2]` | **Ich habe nicht Zeit** denmez. Doğrusu **Ich habe keine Zeit**. | Ich habe nicht Zeit yanlış, keine Zeit doğru. | GEÇTİ |  |
| 12 | `pt:ich-habe` | `mistakes_tr[3]` | Geçmiş için **Ich hatte keine Zeit** dersin. Bavyera'da **Ich habe keine Zeit gehabt** da sık duyulur. | Geçmişte Ich hatte keine Zeit; Bavyera'da Ich habe keine Zeit gehabt de çok duyulur. | GEÇTİ | İki cümle tek konu: geçmişte nasıl söylenir. |
| 13 | `pt:ich-moechte` | `grammar_tr` | **Ich möchte** kibarca istiyorum demektir. **möchte** ikinci sırada durur. Yapmak istediğin iş cümlenin en sonuna gider: **Ich möchte einen Termin machen**. **der** ile söylenen kelimede **einen** gelir: **einen Kaffee**. | Ich möchte kibarca istiyorum. möchte ikinci sırada, yapılacak iş en sonda. der'li kelimede einen. | **GERİ** | Birden fazla fikir: 3 ayrı kural tek alanda (anlamı, sıralama, einen). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 14 | `pt:ich-moechte` | `mistakes_tr[0]` | **Ich möchte machen einen Termin** denmez. Doğrusu **Ich möchte einen Termin machen**. | Ich möchte machen einen Termin yanlış; machen en sona. | GEÇTİ |  |
| 15 | `pt:ich-moechte` | `mistakes_tr[1]` | Tek cümlede **möchte** sona gitmez: **Ich möchte einen Termin machen**. **weil** gelince sona gider: **weil ich einen Termin machen möchte**. | Normal cümlede möchte sonda değil; weil gelince sona gidiyor. | GEÇTİ | Tek cümlede sözü bir an takıldı (weil'li cümle de tek cümle değil mi?) ama örnekler karşılaştırınca anlaşıldı. |
| 16 | `pt:ich-moechte` | `mistakes_tr[2]` | Geçmiş için **möchte** kullanılmaz. Onun yerine **wollte** dersin: **Ich wollte anrufen**. | Geçmiş için möchte değil wollte. | GEÇTİ |  |
| 17 | `pt:ich-moechte` | `mistakes_tr[3]` | **Ich möchte ein Kaffee** denmez. Doğrusu **Ich möchte einen Kaffee**. | Ich möchte ein Kaffee yanlış, einen Kaffee doğru. | GEÇTİ |  |
| 18 | `pt:ich-verstehe-nicht` | `grammar_tr` | Anlamadığını söylerken Almanlar çoğu zaman **Das hab ich nicht verstanden** der. **habe** ikinci sırada, **verstanden** en sonda durur. **nicht** de **verstanden** kelimesinin hemen önüne gelir. Neyi anlamadığını eklersen karşındaki yalnızca onu tekrar eder: **die Adresse**. | Anlamadım derken Das hab ich nicht verstanden. habe ikinci, verstanden sonda, nicht hemen önünde. Neyi anlamadığımı söylersem sadece onu tekrar eder. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (en sık söyleyiş, habe ve verstanden'in yeri, nicht'in yeri, neyi anlamadığını eklemek). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 19 | `pt:ich-verstehe-nicht` | `mistakes_tr[0]` | **Ich nicht verstehe** denmez. Doğrusu **Ich verstehe das nicht**. | Ich nicht verstehe yanlış, Ich verstehe das nicht doğru. | GEÇTİ |  |
| 20 | `pt:ich-verstehe-nicht` | `mistakes_tr[1]` | **Ich habe das verstanden nicht** denmez. Doğrusu **Ich habe das nicht verstanden**. | Ich habe das verstanden nicht yanlış; nicht verstanden'den önce. | GEÇTİ |  |
| 21 | `pt:ich-verstehe-nicht` | `mistakes_tr[2]` | Yalnızca **Was?** demek kaba kaçabilir. **Wie bitte?** demek kibardır. | Sadece Was? kaba olabilir, Wie bitte? kibar. | GEÇTİ |  |
| 22 | `pt:ich-verstehe-nicht` | `mistakes_tr[3]` | **Ich habe alles nicht verstanden** denmez. Bir kısmını kaçırdıysan **Ich habe nicht alles verstanden** dersin. | Bir kısmını kaçırdıysam Ich habe nicht alles verstanden. | GEÇTİ |  |
| 23 | `pt:ich-verstehe-nicht` | `mistakes_tr[4]` | Hiçbir şey anlamadıysan **Ich habe nichts verstanden** dersin. | Hiçbir şey anlamadıysam Ich habe nichts verstanden. | GEÇTİ |  |
| 24 | `pt:koennten-sie` | `grammar_tr` | **Könnten Sie** çok kibar bir rica başlatır. **Könnten** başta durur, istenen iş en sona gider: **Könnten Sie das bitte wiederholen?** **bitte** en doğal olarak **Sie** kelimesinden hemen sonra gelir. Telefonda ve resmî yerlerde anlamadığında çok işine yarar. | Könnten Sie çok kibar rica. Könnten başta, iş sonda. bitte Sie'den sonra. Telefonda çok işe yarar. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (anlamı, sıralama, bitte'nin yeri, nerede işe yarar). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 25 | `pt:koennten-sie` | `mistakes_tr[0]` | **Könnten Sie wiederholen das?** denmez. Doğrusu **Könnten Sie das wiederholen?** | Könnten Sie wiederholen das yanlış; das önce, wiederholen sonda. | GEÇTİ |  |
| 26 | `pt:koennten-sie` | `mistakes_tr[1]` | **Können Sie** de doğrudur ama daha düzdür. **Könnten Sie** daha kibardır. | Können Sie da doğru ama daha düz; Könnten daha kibar. | GEÇTİ |  |
| 27 | `pt:koennten-sie` | `mistakes_tr[2]` | **können** ile **könnten** söylenişte karışır. **könnten** içindeki t sesini duyur. | können ile könnten karışır; t sesini duyuracağım. | GEÇTİ |  |
| 28 | `pt:koennten-sie` | `mistakes_tr[3]` | **bitte** başa da gelebilir. En doğal yeri **Sie** kelimesinden sonradır: **Könnten Sie bitte**. | bitte başta da olur ama en doğalı Sie'den sonra. | GEÇTİ |  |
| 29 | `pt:koennten-sie` | `mistakes_tr[4]` | **Konnten Sie** kibar rica değildir. Geçmişte başarıp başaramadığını sorar: **Konnten Sie mich erreichen?** | Konnten Sie rica değil; geçmişte yapabildiniz mi diye sorar. | GEÇTİ |  |
| 30 | `pt:mir-tut-weh` | `grammar_tr` | Türkçedeki başım ağrıyor gibi kurulur: **Mir tut der Kopf weh**. Birden fazla yer ağrıyorsa **tut** yerine **tun** gelir: **Mir tun die Füße weh**. **weh** cümlenin en sonuna gider. Daha kısa yol: **Ich habe Kopfschmerzen**. | Başım ağrıyor gibi: Mir tut der Kopf weh. Birden çok yerse tun. weh sonda. Kısası Kopfschmerzen. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (kuruluş, tut ve tun, weh'in yeri, kısa yol). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 31 | `pt:mir-tut-weh` | `mistakes_tr[0]` | **Ich tue weh** denmez, bu ben acıtıyorum demek olur. Doğrusu **Mir tut der Kopf weh**. | Ich tue weh ben acıtıyorum demek; doğrusu Mir tut der Kopf weh. | GEÇTİ |  |
| 32 | `pt:mir-tut-weh` | `mistakes_tr[1]` | **Mir tut die Augen weh** denmez. Doğrusu **Mir tun die Augen weh**. | Gözler birden fazla, tun olur. | GEÇTİ |  |
| 33 | `pt:mir-tut-weh` | `mistakes_tr[2]` | **weil** gelince **weh** ile **tut** birleşir ve sona gider: **weil mir der Kopf wehtut**. | weil gelince wehtut birleşir ve sona gider. | GEÇTİ |  |
| 34 | `pt:mir-tut-weh` | `mistakes_tr[3]` | **Mich tut der Kopf weh** denmez. Doğrusu **Mir tut der Kopf weh**. | Mich tut yanlış, Mir tut doğru. | GEÇTİ |  |
| 35 | `pt:noch-mal` | `grammar_tr` | **noch mal** bir kez daha demektir, **nochmal** diye de yazılır. Bir şeyi tekrar ettirmenin en gündelik yoludur. **Wie war Ihr Name noch mal?** sorusunda neydi anlamı katar. Cümlede sondaki kelimeden hemen önce durur: **Können Sie das noch mal sagen?** | noch mal bir kez daha; nochmal da yazılır. Tekrar ettirmenin en günlük yolu. Wie war... noch mal neydi demek. Sondaki kelimenin hemen önüne gelir. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (anlamı ve yazılışı, ne zaman kullanılır, Wie war sorusundaki anlamı, cümledeki yeri). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 36 | `pt:noch-mal` | `mistakes_tr[0]` | Tekrar ettirirken **Sagen Sie wieder** denmez. Doğrusu **Sagen Sie das noch mal**. | Sagen Sie wieder yanlış, Sagen Sie das noch mal doğru. | GEÇTİ |  |
| 37 | `pt:noch-mal` | `mistakes_tr[1]` | **wieder** yine demektir, bir durum yeniden olunca kullanılır: **Es tut wieder weh**. | wieder yine; bir şey yeniden olunca. | GEÇTİ |  |
| 38 | `pt:noch-mal` | `mistakes_tr[2]` | **Wie war Ihr Name noch mal?** geçmişi sormaz, adınız neydi demektir. | Wie war Ihr Name noch mal adınız neydi demek, geçmişi sormuyor. | GEÇTİ |  |
| 39 | `pt:noch-mal` | `mistakes_tr[3]` | **Wie ist Ihr Name noch mal?** da duyulur. **war** ile daha yaygın ve yumuşaktır. | Wie ist da duyulur ama war daha yaygın ve yumuşak. | GEÇTİ |  |
| 40 | `pt:noch-mal` | `mistakes_tr[4]` | **Können Sie sagen das noch mal?** denmez. Doğrusu **Können Sie das noch mal sagen?** | Können Sie sagen das noch mal yanlış; sagen sonda. | GEÇTİ |  |
| 41 | `pt:passt-ihnen` | `grammar_tr` | **passen** burada uymak demektir. Türkçedeki size uyar mı sorusu gibi kurulur: **Passt Ihnen Montag um neun?** Kime uyduğunu **mir**, **dir** ya da **Ihnen** ile söylersin. Zaman **am** ile başlıyorsa araya **es** girer: **Passt es Ihnen am Montag?** | passen uymak. Size uyar mı gibi kurulur. Kime: mir, dir, Ihnen. Zaman am ile başlarsa es girer. | **GERİ** | Birden fazla fikir: 3 ayrı kural tek alanda (anlamı ve kuruluşu, kime uyduğu, es'in girmesi). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 42 | `pt:passt-ihnen` | `mistakes_tr[0]` | **Ich passe Montag** denmez. Doğrusu **Montag passt mir**. | Ich passe Montag yanlış, Montag passt mir doğru. | GEÇTİ |  |
| 43 | `pt:passt-ihnen` | `mistakes_tr[1]` | **Mich passt das** denmez. Doğrusu **Mir passt das**. | Mich passt das yanlış, Mir passt das doğru. | GEÇTİ |  |
| 44 | `pt:passt-ihnen` | `mistakes_tr[2]` | Tek başına **Passt!** tamam, olur demektir. | Tek başına Passt! tamam demek. | GEÇTİ |  |
| 45 | `pt:passt-ihnen` | `mistakes_tr[3]` | **Die Hose passt mir** ise pantolon bana oluyor demektir. | Die Hose passt mir pantolon bana oluyor demek. | GEÇTİ |  |
| 46 | `pt:perfekt-haben` | `grammar_tr` | Konuşmada geçmişi çoğunlukla **habe** ve **gemacht** gibi iki parçayla anlatırsın. **habe** ikinci sırada, öbür parça en sonda durur: **Ich habe gestern den Arzt angerufen**. Sondaki parça çoğunlukla **gemacht** ya da **genommen** gibi görünür. **be**, **ver**, **er** ile başlayanlarda **ge** gelmez: **bezahlt**, **vergessen**. | Geçmişi habe ve gemacht gibi iki parçayla anlatırım. habe ikinci, öbürü sonda. Sondaki genelde ge ile. be, ver, er ile başlayanlarda ge yok. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (iki parça, parçaların yeri, ge ile başlaması, be/ver/er istisnası). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 47 | `pt:perfekt-haben` | `mistakes_tr[0]` | **Ich habe angerufen gestern** denmez. Doğrusu **Ich habe gestern angerufen**. | Ich habe angerufen gestern yanlış; angerufen sonda. | GEÇTİ |  |
| 48 | `pt:perfekt-haben` | `mistakes_tr[1]` | **weil** gelince **habe** en sona gider: **weil ich nicht geschlafen habe**. | weil gelince habe en sona gider. | GEÇTİ |  |
| 49 | `pt:perfekt-haben` | `mistakes_tr[2]` | **geanruft** denmez. **ge** ortaya girer: **angerufen**, **ausgefüllt**. | geanruft yanlış; ge ortaya girer: angerufen. | GEÇTİ |  |
| 50 | `pt:perfekt-haben` | `mistakes_tr[3]` | **Ich habe gefahren** denmez. Bir yere gidişi anlatırken **bin** gelir: **Ich bin gefahren**. | Gidişte habe değil bin: Ich bin gefahren. | GEÇTİ |  |
| 51 | `pt:seit` | `grammar_tr` | **seit** hâlâ süren bir şeyin ne zamandan beri sürdüğünü söyler. Türkçedeki iki yıldır burada oturuyorum gibi kurulur: **Ich wohne seit zwei Jahren hier**. **seit** kelimesinden sonra **einem** ya da **einer** gelir: **seit einem Monat**. Soruyu **Seit wann?** ile sorarsın. | seit hâlâ süren şeyin ne zamandır sürdüğünü söyler. seit'ten sonra einem ya da einer gelir. Seit wann diye sorarım. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (anlamı, Türkçeye benzer kuruluş, einem/einer, Seit wann sorusu). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. Ayrıca alan kendi içinde çelişkili okunuyor: seit'ten sonra einem/einer gelir diyor ama aynı alandaki örnek seit zwei Jahren; ben seit'ten sonra hep einem/einer gelir diye anladım. |
| 52 | `pt:seit` | `mistakes_tr[0]` | **Ich habe seit zwei Jahren hier gewohnt** denmez. Doğrusu **Ich wohne seit zwei Jahren hier**. | Ich habe seit zwei Jahren hier gewohnt yanlış; Ich wohne seit zwei Jahren hier doğru. | GEÇTİ |  |
| 53 | `pt:seit` | `mistakes_tr[1]` | O zamandan beri olmayan şeyi şöyle anlatırsın: **Ich habe seit gestern nichts gegessen**. | (Anlayamadım) O zamandan beri olmayan şey... habe ile mi söylenir? | **GERİ** | O zamandan neyi gösteriyor belli değil. Bir önceki madde seit ile habe kullanmayı yanlış sayıyor, bu madde habe ile örnek veriyor; tek okumada çelişki gibi geldi. |
| 54 | `pt:seit` | `mistakes_tr[2]` | **seit drei Tagen** üç gündür demektir ve hâlâ sürer. **vor drei Tagen** üç gün önce demektir. | seit drei Tagen üç gündür, hâlâ sürüyor; vor drei Tagen üç gün önce. | GEÇTİ |  |
| 55 | `pt:seit` | `mistakes_tr[3]` | **seit ein Monat** denmez. Doğrusu **seit einem Monat**. | seit ein Monat yanlış, seit einem Monat doğru. | GEÇTİ |  |
| 56 | `pt:seit` | `mistakes_tr[4]` | **seit zwei Jahre** denmez. Doğrusu **seit zwei Jahren**. | seit zwei Jahre yanlış, seit zwei Jahren doğru. | GEÇTİ |  |
| 57 | `pt:um-uhr` | `grammar_tr` | Saat için **um**, gün için **am** dersin: **am Montag um neun**. **halb zehn** 9:30 demektir, 10:30 değil. **Viertel nach neun** 9:15, **Viertel vor zehn** 9:45 demektir. Resmî yerlerde **um 14 Uhr** gibi saatler de duyarsın. | Saatte um, günde am. halb zehn 9:30. Viertel nach 9:15, Viertel vor 9:45. Resmî yerde 14 Uhr gibi. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (um ve am, halb, Viertel, 24 saatlik söyleyiş). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 58 | `pt:um-uhr` | `mistakes_tr[0]` | **halb zehn** 10:30 değil, 9:30 demektir. Almanca yarımı bir sonraki saate göre söyler. | halb zehn 9:30; yarım bir sonraki saate göre. | GEÇTİ |  |
| 59 | `pt:um-uhr` | `mistakes_tr[1]` | **in neun Uhr** denmez. Doğrusu **um neun Uhr**. | in neun Uhr yanlış, um neun Uhr doğru. | GEÇTİ |  |
| 60 | `pt:um-uhr` | `mistakes_tr[2]` | **in Montag** denmez. Doğrusu **am Montag**. | in Montag yanlış, am Montag doğru. | GEÇTİ |  |
| 61 | `pt:um-uhr` | `mistakes_tr[3]` | **um drei Uhren** denmez. Doğrusu **um drei Uhr**. | drei Uhren yanlış, drei Uhr doğru. | GEÇTİ |  |
| 62 | `pt:um-uhr` | `mistakes_tr[4]` | Süre için **Uhr** değil **Stunde** dersin: **drei Stunden** üç saatlik süre demektir. | Süre için Stunde: drei Stunden üç saat süre. | GEÇTİ |  |
| 63 | `pt:was-heisst` | `grammar_tr` | **Was heißt** ile bir kelimenin anlamını sorarsın. Bilmediğin kelimeyi duyduğun gibi tekrar et: **Was heißt nüchtern?** **heißen** burada adı olmak değil, anlamına gelmek demektir. **Was heißt das für mich?** ise ne yapmam gerek diye sorar. | Was heißt ile kelimenin anlamını sorarım; kelimeyi tekrar ederim. heißen burada anlamına gelmek. Was heißt das für mich ne yapmam gerek demek. | **GERİ** | Birden fazla fikir: 4 ayrı kural tek alanda (ne için kullanılır, kelimeyi tekrar etmek, heißen'in buradaki anlamı, für mich sorusu). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 64 | `pt:was-heisst` | `mistakes_tr[0]` | **Ich weiß nicht, was heißt das** denmez. Doğrusu **Ich weiß nicht, was das heißt**. | Ich weiß nicht, was heißt das yanlış; was das heißt doğru. | GEÇTİ |  |
| 65 | `pt:was-heisst` | `mistakes_tr[1]` | **Was heißt das?** ne demek diye sorar. **Wie heißt das auf Deutsch?** Almancası ne diye sorar. | Was heißt das ne demek; Wie heißt das auf Deutsch Almancası ne. | GEÇTİ |  |
| 66 | `pt:was-heisst` | `mistakes_tr[2]` | **Das heißt** cümle başında yani anlamına da gelir. | Das heißt cümle başında yani demek. | GEÇTİ |  |
| 67 | `pt:wenn` | `grammar_tr` | **wenn** Türkçedeki gelirsem ya da geldiğimde anlamını verir. **wenn** ile başlayan kısımda **habe** gibi kelime sona gider: **wenn ich Zeit habe**. Cümle **wenn** ile başlıyorsa virgülden sonra **komme ich** dersin: **Wenn es geht, komme ich**. | wenn -sem / -diğimde demek. wenn'li kısımda habe sona gider. wenn ile başlarsa virgülden sonra komme ich. | **GERİ** | Birden fazla fikir: 3 ayrı kural tek alanda (anlamı, wenn'li kısımda sıralama, virgülden sonraki sıralama). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 68 | `pt:wenn` | `mistakes_tr[0]` | **Wenn es geht, ich komme** denmez. Doğrusu **Wenn es geht, komme ich**. | Wenn es geht, ich komme yanlış; komme ich doğru. | GEÇTİ |  |
| 69 | `pt:wenn` | `mistakes_tr[1]` | **wenn ich habe Zeit** denmez. Doğrusu **wenn ich Zeit habe**. | wenn ich habe Zeit yanlış; wenn ich Zeit habe doğru. | GEÇTİ |  |
| 70 | `pt:wenn` | `mistakes_tr[2]` | Geçmişte bir kez olan şey için **wenn** değil **als** dersin: **Als ich krank war**. | Geçmişte bir kez olan için als: Als ich krank war. | GEÇTİ |  |
| 71 | `pt:wenn` | `mistakes_tr[3]` | **Ich weiß nicht, wenn er kommt** denmez. Doğrusu **Ich weiß nicht, ob er kommt**. | Ich weiß nicht, wenn er kommt yanlış; ob er kommt doğru (gelir mi bilmiyorum). | GEÇTİ | ob'un anlamı yazmıyor ama tam cümleden çıkarabildim. |
| 72 | `pt:wuerden-sie` | `grammar_tr` | **Würden Sie** çok kibar bir rica başlatır, **Könnten Sie** gibi kurulur. **Würden** başta durur, istenen iş en sona gider: **Würden Sie mich zurückrufen?** **Könnten Sie** yapabilir misiniz, **Würden Sie** yapar mısınız diye sorar. Günlük hayatta ikisi de olur. | Würden Sie çok kibar rica, Könnten gibi. Würden başta, iş sonda. Könnten yapabilir misiniz, Würden yapar mısınız. İkisi de olur. | **GERİ** | Birden fazla fikir: 3 ayrı kural tek alanda (anlamı, sıralama, Könnten ile farkı). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 73 | `pt:wuerden-sie` | `mistakes_tr[0]` | **Würden Sie zurückrufen mich?** denmez. Doğrusu **Würden Sie mich zurückrufen?** | Würden Sie zurückrufen mich yanlış; mich önce. | GEÇTİ |  |
| 74 | `pt:wuerden-sie` | `mistakes_tr[1]` | **Werden Sie mich zurückrufen?** rica değildir. Beni arayacak mısınız diye bilgi sorar. | Werden Sie rica değil, arayacak mısınız diye bilgi sorar. | GEÇTİ |  |
| 75 | `pt:wuerden-sie` | `mistakes_tr[2]` | Ricaya **Ja, ich würde** diye cevap verilmez. Doğrusu **Ja, gern** ya da **Ja, mach ich**. | Ricaya Ja, ich würde denmez; Ja, gern denir. | GEÇTİ |  |
| 76 | `pt:wuerden-sie` | `mistakes_tr[3]` | Yapılıp yapılmadığını sormak için **Würden** kullanılmaz. Doğrusu **Haben Sie mich zurückgerufen?** | Yapıldı mı diye sormak için Würden değil Haben Sie ... zurückgerufen. | GEÇTİ |  |
| 77 | `pt:wie-viel-kostet` | `grammar_tr` | Fiyatı **Was kostet das?** diye sorarsın. **Wie viel kostet das?** de aynı anlama gelir. Tek şey için **kostet**, birden fazla şey için **kosten** dersin. Toplamı kasada **Was macht das?** diye sorarsın. | Fiyatı Was kostet das ya da Wie viel kostet das ile sorarım. Bir şeyde kostet, çok şeyde kosten. Toplam için Was macht das. | **GERİ** | Birden fazla fikir: 3 ayrı kural tek alanda (fiyat sorma, kostet ve kosten, toplamı sorma). Cümleleri tek tek anladım ama hepsini bir okumada aklımda tutamadım. |
| 78 | `pt:wie-viel-kostet` | `mistakes_tr[0]` | **Was kostet die Schuhe?** denmez. Doğrusu **Was kosten die Schuhe?** | Was kostet die Schuhe yanlış; kosten doğru. | GEÇTİ |  |
| 79 | `pt:wie-viel-kostet` | `mistakes_tr[1]` | **drei Euros** denmez. Doğrusu **drei Euro**. **Cent** de aynı kalır: **fünfzig Cent**. | drei Euros yanlış, drei Euro; Cent de değişmez. | GEÇTİ |  |
| 80 | `pt:wie-viel-kostet` | `mistakes_tr[2]` | **Ich weiß nicht, wie viel kostet das** denmez. Doğrusu **Ich weiß nicht, wie viel das kostet**. | Ich weiß nicht, wie viel kostet das yanlış; wie viel das kostet doğru. | GEÇTİ |  |

## Toplam

- Toplam: **80** · GEÇTİ: **62** · GERİ: **18**
- `grammar_tr`: 15 / GEÇTİ 0 / GERİ 15
- `mistakes_tr`: 65 / GEÇTİ 62 / GERİ 3
- GERİ kimlikleri:
  - #1 `pt:geht-es-auch` · `grammar_tr`
  - #2 `pt:geht-es-auch` · `mistakes_tr[0]`
  - #5 `pt:geht-es-auch` · `mistakes_tr[3]`
  - #8 `pt:ich-habe` · `grammar_tr`
  - #13 `pt:ich-moechte` · `grammar_tr`
  - #18 `pt:ich-verstehe-nicht` · `grammar_tr`
  - #24 `pt:koennten-sie` · `grammar_tr`
  - #30 `pt:mir-tut-weh` · `grammar_tr`
  - #35 `pt:noch-mal` · `grammar_tr`
  - #41 `pt:passt-ihnen` · `grammar_tr`
  - #46 `pt:perfekt-haben` · `grammar_tr`
  - #51 `pt:seit` · `grammar_tr`
  - #53 `pt:seit` · `mistakes_tr[1]`
  - #57 `pt:um-uhr` · `grammar_tr`
  - #63 `pt:was-heisst` · `grammar_tr`
  - #67 `pt:wenn` · `grammar_tr`
  - #72 `pt:wuerden-sie` · `grammar_tr`
  - #77 `pt:wie-viel-kostet` · `grammar_tr`

GERİ olan her kalıp okur açısından "reviewed" sayılamaz (OD-9.4); bu turda 15 kalıbın hepsinde en az bir GERİ var (hepsinin `grammar_tr` alanı).

## Görünen ama çevrilmemiş (karar yok, yalnızca liste)

Bugün ekranda görünen: `frame`. `web/src/screens/Player.tsx:245` Almanca kur adımında `Kalıp: {frame}` diye gösteriyor. Slot adları (`slots[].name`) ve dönüşüm etiketleri (`transforms` anahtarları) bugün `web/src` içinde ekrana basılmıyor; bir kalıp ekranı eklenirse görünür. (Gözlem: `grammar_tr` ve `mistakes_tr` de bugün `web/src` içinde ekrana basılmıyor.)

| kalıp | frame | slot adları | öğrencinin bilmediği öğe |
|---|---|---|---|
| `pt:geht-es-auch` | Geht es / Geht das auch + zaman / başka yol? | zaman · başka yol | — |
| `pt:ich-habe` | Ich habe + Akkusativ (Zeit, Fieber, einen Termin …) | durum (artikelsiz) · nesne (Akkusativ) | Akkusativ, artikelsiz, nesne, … |
| `pt:ich-moechte` | Ich möchte (gern) + Akkusativ · Ich möchte (gern) + … + mastar (sonda) | nesne (Akkusativ) · mastar grubu | Akkusativ, mastar, nesne, … |
| `pt:ich-verstehe-nicht` | Ich hab(e) + (das / Ihren Namen …) + nicht (ganz) verstanden · Ich verstehe … nicht | ne · derece | … |
| `pt:koennten-sie` | Könnten Sie (bitte) + … + mastar? | mastar grubu | mastar, … |
| `pt:mir-tut-weh` | Mir tut + organ (tekil) + weh · Mir tun + organ (çoğul) + weh · Ich habe …schmerzen | organ (tekil) · organ (çoğul) · …schmerzen | tekil, çoğul, organ, … |
| `pt:noch-mal` | (Bitte) noch mal + … · Wie war … noch mal? · Können Sie das noch mal + mastar? | fiil · Wie war … noch mal? | mastar, fiil, … |
| `pt:passt-ihnen` | Passt (es) Ihnen / dir + zaman? · Das passt mir (gut / nicht). | kime (Dativ) · zaman | Dativ |
| `pt:perfekt-haben` | Ich habe + … + Partizip II (sonda) | Partizip II · zaman | Partizip II, … |
| `pt:seit` | seit + Dativ (zaman) + şimdiki zaman · Seit wann …? | zaman (Dativ) · durum | Dativ, şimdiki zaman, … |
| `pt:um-uhr` | um + saat · am + gün · halb / Viertel nach / Viertel vor | saat · gün | — |
| `pt:was-heisst` | Was heißt „…“ (auf Deutsch)? · Was bedeutet „…“? · Was heißt das (genau)? | kelime · Was heißt das …? | …, „ |
| `pt:wenn` | Wenn + … + FİİL (sonda), FİİL + özne … · …, wenn … + FİİL | koşul · sonuç (fiil başta) | FİİL, özne, koşul, sonuç, fiil, … |
| `pt:wuerden-sie` | Würden Sie (bitte) + … + mastar? | mastar grubu | mastar, … |
| `pt:wie-viel-kostet` | Was kostet …? · Wie viel kostet / kosten …? · Was macht das? | tekil · çoğul | tekil, çoğul, … |

Her 15 kalıpta aynı `transforms` etiketleri var: `question`, `negative`, `polite`, `perfekt`, `weil`, `dass`, `wenn` (İngilizce ya da dilbilgisi terimi). Ekrana basılırsa çevrilmemiş görünür.

## Gözlemler (karar dışı, düzeltme önerisi değil)

1. `grammar_tr` GERİ'lerinin hepsinin ortak nedeni aynı: tek alanda 3–4 ayrı kural var. `seit` dışındaki alanlarda cümleler tek tek anlaşılır; sorun alanın yapısında, cümlelerin yazılışında değil.
2. Bazı `mistakes_tr` maddeleri hata değil, ek bilgi (ör. `pt:geht-es-auch` [5], `pt:passt-ihnen` [2]–[3], `pt:was-heisst` [2]); okur olarak anlaşıldıkları için GEÇTİ verildi.
3. `pt:koennten-sie`: `bitte`'nin yeri hem `grammar_tr` hem `mistakes_tr[3]`'te anlatılıyor.

---

## Tur 2 (2026-11-18): `frame_tr`, `kurallar_tr`, değişen `mistakes_tr`

Şema kararı (baş geliştirici): `grammar_tr` artık öğrenciye gösterilmeyen öğretmen notu; bu yüzden birinci turdaki 15 `grammar_tr` GERİ'si artık öğrenci ekranını bağlamıyor. Öğrenciye görünenler: `frame_tr` (formül; `+` ve `·` ayırıcı olarak serbest), `kurallar_tr[]` (her öğe ekranda tek tek, kendi başına okunur), `mistakes_tr[]`. Kalın yazı sabit Almanca kelime, düz yazı doldurulacak yer olarak okundu.

Değişiklik karşılaştırması (birinci tur tablosu ile bugünkü dosya): `pt:geht-es-auch` `mistakes_tr[0]` yeniden yazılmış; eski `[3]` (ob maddesi) silinmiş, sonraki maddeler bir sıra kaymış (eski [4]→[3], [5]→[4]). `pt:seit` `[0]` ve `[1]` yeniden yazılmış. Başka `mistakes_tr` değişmemiş.

Kapsam: 15 `frame_tr` + 59 `kurallar_tr` + 3 değişen `mistakes_tr` + weil'in açıklanmadan kullanıldığı 3 madde. Persona notu: weil A2 düzeyinde bilinen bir kelime (çünkü); weil maddelerinde asıl soru kuralın tek okumada anlaşılıp anlaşılmadığı.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `pt:geht-es-auch` | `frame_tr` | **Geht es auch** + başka gün ya da başka yol? | Geht es auch, sonra başka gün ya da başka yol; soru. | GEÇTİ |  |
| 2 | `pt:ich-habe` | `frame_tr` | **Ich habe** + bir şey | Ich habe, sonra bir şey. | GEÇTİ |  |
| 3 | `pt:ich-moechte` | `frame_tr` | **Ich möchte** + istediğin şey · **Ich möchte** + istediğin iş sonda | Ich möchte, sonra istediğim şey; ya da Ich möchte ve istediğim iş en sonda. | GEÇTİ | İkinci formüldeki sonda sözü kısa formülde biraz boşta kalıyor ama iş sona gider diye anladım. |
| 4 | `pt:ich-verstehe-nicht` | `frame_tr` | **Das habe ich nicht verstanden.** · **Ich habe** + neyi + **nicht verstanden.** | Das habe ich nicht verstanden; ya da Ich habe, neyi, nicht verstanden. | GEÇTİ |  |
| 5 | `pt:koennten-sie` | `frame_tr` | **Könnten Sie bitte** + istediğin iş? | Könnten Sie bitte, sonra yapmasını istediğim iş; soru. | GEÇTİ |  |
| 6 | `pt:mir-tut-weh` | `frame_tr` | **Mir tut** + ağrıyan yer + **weh** | Mir tut, ağrıyan yer, weh. | GEÇTİ |  |
| 7 | `pt:noch-mal` | `frame_tr` | **noch mal** + tekrarını istediğin şey · **Wie war** + bilgi + **noch mal?** | noch mal, tekrarını istediğim şey; ya da Wie war, bilgi, noch mal. | GEÇTİ |  |
| 8 | `pt:passt-ihnen` | `frame_tr` | **Passt Ihnen** + gün ya da saat? · **Das passt mir.** | Passt Ihnen, gün ya da saat, soru; cevap Das passt mir. | GEÇTİ |  |
| 9 | `pt:perfekt-haben` | `frame_tr` | **Ich habe** + ne ya da ne zaman + **gemacht** | Ich habe, ne ya da ne zaman, gemacht. Yani hep gemacht mı? | **GERİ** | Formülde kalın yazı sabit Almanca kelime, düz yazı benim dolduracağım yer. gemacht kalın, yani sabit görünüyor; başka işlerde (angerufen, gegessen) ne olacağını formülden çıkaramadım. Formül tek başına yalnızca yaptım diye okunuyor. |
| 10 | `pt:seit` | `frame_tr` | **Seit** + ne kadar zaman · **Seit wann?** | Seit, sonra ne kadar zaman; soru Seit wann. | GEÇTİ | seit gestern gibi bir başlangıç günü de olur mu diye bir an düşündüm; formül tek başına daha çok süreyi gösteriyor ama yanlış değil. |
| 11 | `pt:um-uhr` | `frame_tr` | **um** + saat · **am** + gün · **halb** + bir sonraki saat | Saatte um, günde am, halb ile bir sonraki saat. | GEÇTİ |  |
| 12 | `pt:was-heisst` | `frame_tr` | **Was heißt** + anlamadığın kelime? | Was heißt, sonra anlamadığım kelime; soru. | GEÇTİ |  |
| 13 | `pt:wenn` | `frame_tr` | **Wenn** + şart, + sonra ne olacağı | Wenn, şart, virgül, sonra ne olacağı. | GEÇTİ | şart günlük Türkçe kelime, terim gibi gelmedi. |
| 14 | `pt:wuerden-sie` | `frame_tr` | **Würden Sie bitte** + istediğin iş? | Würden Sie bitte, sonra yapmasını istediğim iş; soru. | GEÇTİ |  |
| 15 | `pt:wie-viel-kostet` | `frame_tr` | **Was kostet** + bir şey? · **Was kosten** + birden fazla şey? · **Was macht das?** | Bir şey için Was kostet, birden çok şey için Was kosten, toplam için Was macht das. | GEÇTİ |  |
| 16 | `pt:geht-es-auch` | `kurallar_tr[0]` | **Es geht** olur, mümkün demektir. | Es geht olur, mümkün demek. | GEÇTİ |  |
| 17 | `pt:geht-es-auch` | `kurallar_tr[1]` | Soruda **geht** başa geçer: **Geht es auch am Freitag?** | Soruda geht başa gelir. | GEÇTİ |  |
| 18 | `pt:geht-es-auch` | `kurallar_tr[2]` | **auch** burada başka bir seçeneği nazikçe önerir. | auch burada başka bir seçeneği kibarca önerir. | GEÇTİ |  |
| 19 | `pt:geht-es-auch` | `kurallar_tr[3]` | Konuşmada kısalır: **Geht's auch morgen?** | Konuşmada Geht es kısalıp Geht's olur. | GEÇTİ | Neyin kısaldığı yazmıyor ama örnekte görünüyor. |
| 20 | `pt:ich-habe` | `kurallar_tr[0]` | Türkçedeki ateşim var cümlesini **Ich habe Fieber** diye söylersin. | Ateşim var Almancada Ich habe Fieber. | GEÇTİ |  |
| 21 | `pt:ich-habe` | `kurallar_tr[1]` | **der** ile söylenen kelimede **ein** yerine **einen** gelir: **einen Termin**. | der'li kelimede ein değil einen: einen Termin. | GEÇTİ |  |
| 22 | `pt:ich-habe` | `kurallar_tr[2]` | Konuşmada **Ich habe** çoğu zaman **Ich hab** olur. | Konuşmada Ich hab denir. | GEÇTİ |  |
| 23 | `pt:ich-moechte` | `kurallar_tr[0]` | **Ich möchte** kibarca istiyorum demektir. | Ich möchte kibarca istiyorum demek. | GEÇTİ |  |
| 24 | `pt:ich-moechte` | `kurallar_tr[1]` | **möchte** cümlede ikinci sırada durur. | möchte cümlede ikinci kelime. | GEÇTİ |  |
| 25 | `pt:ich-moechte` | `kurallar_tr[2]` | Yapmak istediğin iş en sona gider: **Ich möchte einen Termin machen**. | Yapmak istediğim iş en sona: einen Termin machen. | GEÇTİ |  |
| 26 | `pt:ich-moechte` | `kurallar_tr[3]` | **der** ile söylenen kelimede **einen** gelir: **Ich möchte einen Kaffee**. | der'li kelimede einen: einen Kaffee. | GEÇTİ |  |
| 27 | `pt:ich-verstehe-nicht` | `kurallar_tr[0]` | Anlamadığını çoğu zaman **Das hab ich nicht verstanden** diye söylersin. | Anlamadım derken çoğu zaman Das hab ich nicht verstanden. | GEÇTİ |  |
| 28 | `pt:ich-verstehe-nicht` | `kurallar_tr[1]` | **habe** ikinci sırada, **verstanden** en sonda durur. | habe ikinci, verstanden en sonda. | GEÇTİ |  |
| 29 | `pt:ich-verstehe-nicht` | `kurallar_tr[2]` | **nicht**, **verstanden** kelimesinin hemen önüne gelir. | nicht, verstanden'in hemen önünde. | GEÇTİ |  |
| 30 | `pt:ich-verstehe-nicht` | `kurallar_tr[3]` | Neyi anlamadığını eklersen karşındaki yalnızca onu tekrar eder: **die Adresse**. | Neyi anlamadığımı söylersem sadece onu tekrar eder, ör. die Adresse. | GEÇTİ |  |
| 31 | `pt:koennten-sie` | `kurallar_tr[0]` | **Könnten Sie** ile çok kibar bir rica başlatırsın. | Könnten Sie ile çok kibar rica başlar. | GEÇTİ |  |
| 32 | `pt:koennten-sie` | `kurallar_tr[1]` | İstediğin iş en sona gider: **Könnten Sie das bitte wiederholen?** | İstediğim iş en sona gider: wiederholen. | GEÇTİ |  |
| 33 | `pt:koennten-sie` | `kurallar_tr[2]` | **bitte** en doğal olarak **Sie** kelimesinden hemen sonra gelir. | bitte en doğal Sie'den hemen sonra. | GEÇTİ |  |
| 34 | `pt:mir-tut-weh` | `kurallar_tr[0]` | Türkçedeki başım ağrıyor gibi kurulur: **Mir tut der Kopf weh**. | Başım ağrıyor gibi: Mir tut der Kopf weh. | GEÇTİ |  |
| 35 | `pt:mir-tut-weh` | `kurallar_tr[1]` | Birden fazla yer ağrıyorsa **tun** gelir: **Mir tun die Füße weh**. | Birden çok yer ağrıyorsa tun: Mir tun die Füße weh. | GEÇTİ |  |
| 36 | `pt:mir-tut-weh` | `kurallar_tr[2]` | **weh** cümlenin en sonuna gider. | weh en sonda. | GEÇTİ |  |
| 37 | `pt:mir-tut-weh` | `kurallar_tr[3]` | Daha kısa yol: **Ich habe Kopfschmerzen**. | Kısa yol: Ich habe Kopfschmerzen. | GEÇTİ |  |
| 38 | `pt:noch-mal` | `kurallar_tr[0]` | **noch mal** bir kez daha demektir. | noch mal bir kez daha. | GEÇTİ |  |
| 39 | `pt:noch-mal` | `kurallar_tr[1]` | **nochmal** diye bitişik de yazılır. | nochmal diye bitişik de yazılır. | GEÇTİ |  |
| 40 | `pt:noch-mal` | `kurallar_tr[2]` | **Wie war Ihr Name noch mal?** sorusunda neydi anlamı katar. | Wie war Ihr Name noch mal sorusu adınız neydi demek. | GEÇTİ |  |
| 41 | `pt:noch-mal` | `kurallar_tr[3]` | Cümlede sondaki kelimeden hemen önce durur: **Können Sie das noch mal sagen?** | noch mal cümlede son kelimenin hemen önünde. Ama çerçevede Wie war ... noch mal? diye en sonda? | **GERİ** | Aynı ekrandaki çerçeveyle çelişiyor: çerçeve ve 3. kural Wie war ... noch mal? örneğinde noch mal'ı en sonda gösteriyor, bu kural sondan bir önce diyor. Hangisine uyacağımı bilemedim. |
| 42 | `pt:passt-ihnen` | `kurallar_tr[0]` | **passen** burada uymak demektir. | passen burada uymak. | GEÇTİ |  |
| 43 | `pt:passt-ihnen` | `kurallar_tr[1]` | Türkçedeki size uyar mı sorusu gibi kurulur: **Passt Ihnen Montag um neun?** | Size uyar mı gibi: Passt Ihnen Montag um neun? | GEÇTİ |  |
| 44 | `pt:passt-ihnen` | `kurallar_tr[2]` | Kime uyduğunu **mir**, **dir** ya da **Ihnen** ile söylersin. | Kime uyduğu mir, dir ya da Ihnen. | GEÇTİ |  |
| 45 | `pt:passt-ihnen` | `kurallar_tr[3]` | Zaman **am** ile başlıyorsa araya **es** girer: **Passt es Ihnen am Montag?** | Zaman am ile başlarsa es eklenir: Passt es Ihnen am Montag? | GEÇTİ | araya sözü örnekle anlaşılıyor. |
| 46 | `pt:perfekt-haben` | `kurallar_tr[0]` | Konuşmada geçmişi **habe** ve **gemacht** gibi iki parçayla anlatırsın. | Konuşmada geçmişi habe ve gemacht gibi iki parçayla anlatırım. | GEÇTİ |  |
| 47 | `pt:perfekt-haben` | `kurallar_tr[1]` | **habe** ikinci sırada, öbür parça en sonda durur: **Ich habe gestern angerufen**. | habe ikinci, öbür parça en sonda: Ich habe gestern angerufen. | GEÇTİ |  |
| 48 | `pt:perfekt-haben` | `kurallar_tr[2]` | Sondaki parça çoğunlukla **gemacht** ya da **genommen** gibi görünür. | Sondaki parça çoğunlukla ge ile başlar, gemacht, genommen gibi. | GEÇTİ |  |
| 49 | `pt:perfekt-haben` | `kurallar_tr[3]` | **be**, **ver**, **er** ile başlayanlarda **ge** gelmez: **bezahlt**, **vergessen**. | be, ver, er ile başlayan kelimelerde ge yok: bezahlt, vergessen. | GEÇTİ |  |
| 50 | `pt:seit` | `kurallar_tr[0]` | **seit** hâlâ süren bir şeyin ne zamandan beri sürdüğünü söyler. | seit hâlâ süren şeyin ne zamandan beri sürdüğünü söyler. | GEÇTİ |  |
| 51 | `pt:seit` | `kurallar_tr[1]` | Türkçedeki iki yıldır burada oturuyorum gibi kurulur: **Ich wohne seit zwei Jahren hier**. | İki yıldır burada oturuyorum: Ich wohne seit zwei Jahren hier. | GEÇTİ |  |
| 52 | `pt:seit` | `kurallar_tr[2]` | Tek ay ya da tek yıl için **einem** gelir: **seit einem Monat**. | Bir ay ya da bir yıl için einem: seit einem Monat. | GEÇTİ | Okurken bir haftadır nasıl derim diye sordum; bu kural ay ve yıl için doğru, haftayı söylemiyor. |
| 53 | `pt:seit` | `kurallar_tr[3]` | Sayı varsa kelime **n** ile biter: **seit zwei Jahren**, **seit drei Tagen**. | Sayı varsa sondaki kelime n ile biter: seit zwei Jahren. | GEÇTİ |  |
| 54 | `pt:seit` | `kurallar_tr[4]` | Soruyu **Seit wann?** ile sorarsın. | Soru Seit wann? | GEÇTİ |  |
| 55 | `pt:um-uhr` | `kurallar_tr[0]` | Saat için **um** dersin: **um neun**. | Saat için um: um neun. | GEÇTİ |  |
| 56 | `pt:um-uhr` | `kurallar_tr[1]` | Gün için **am** dersin: **am Montag**. | Gün için am: am Montag. | GEÇTİ |  |
| 57 | `pt:um-uhr` | `kurallar_tr[2]` | **halb zehn** 9:30 demektir, 10:30 değil. | halb zehn 9:30, 10:30 değil. | GEÇTİ |  |
| 58 | `pt:um-uhr` | `kurallar_tr[3]` | **Viertel nach neun** 9:15, **Viertel vor zehn** 9:45 demektir. | Viertel nach neun 9:15, Viertel vor zehn 9:45. | GEÇTİ | İki örnek, tek konu (çeyrek). |
| 59 | `pt:um-uhr` | `kurallar_tr[4]` | Resmî yerlerde **um 14 Uhr** gibi saatler de duyarsın. | Resmî yerde um 14 Uhr gibi saatler de duyarım. | GEÇTİ |  |
| 60 | `pt:was-heisst` | `kurallar_tr[0]` | **Was heißt** ile bir kelimenin anlamını sorarsın. | Was heißt ile kelimenin anlamını sorarım. | GEÇTİ |  |
| 61 | `pt:was-heisst` | `kurallar_tr[1]` | Bilmediğin kelimeyi duyduğun gibi tekrar et: **Was heißt nüchtern?** | Bilmediğim kelimeyi duyduğum gibi tekrar ederim: Was heißt nüchtern? | GEÇTİ |  |
| 62 | `pt:was-heisst` | `kurallar_tr[2]` | **heißen** burada adı olmak değil, anlamına gelmek demektir. | heißen burada adı olmak değil, anlamına gelmek. | GEÇTİ |  |
| 63 | `pt:was-heisst` | `kurallar_tr[3]` | **Was heißt das für mich?** ne yapmam gerek diye sorar. | Was heißt das für mich? benim ne yapmam gerek demek. | GEÇTİ |  |
| 64 | `pt:wenn` | `kurallar_tr[0]` | **wenn** Türkçedeki gelirsem ya da geldiğimde anlamını verir. | wenn -sem ya da -diğimde anlamı verir. | GEÇTİ |  |
| 65 | `pt:wenn` | `kurallar_tr[1]` | **wenn** ile başlayan kısımda **habe** gibi kelime sona gider: **wenn ich Zeit habe**. | wenn'li kısımda habe gibi kelime sona gider. | GEÇTİ |  |
| 66 | `pt:wenn` | `kurallar_tr[2]` | Cümle **wenn** ile başlıyorsa virgülden sonra **komme ich** dersin: **Wenn es geht, komme ich**. | wenn ile başlarsam virgülden sonra ich komme değil komme ich derim. | GEÇTİ | Örnek tek fiille ama ters sıra açık. |
| 67 | `pt:wuerden-sie` | `kurallar_tr[0]` | **Würden Sie** ile çok kibar bir rica başlatırsın. | Würden Sie ile çok kibar rica başlar. | GEÇTİ |  |
| 68 | `pt:wuerden-sie` | `kurallar_tr[1]` | İstediğin iş en sona gider: **Würden Sie mich zurückrufen?** | İstediğim iş en sona: mich zurückrufen. | GEÇTİ |  |
| 69 | `pt:wuerden-sie` | `kurallar_tr[2]` | **Könnten Sie** yapabilir misiniz, **Würden Sie** yapar mısınız diye sorar. | Könnten Sie yapabilir misiniz, Würden Sie yapar mısınız. | GEÇTİ |  |
| 70 | `pt:wuerden-sie` | `kurallar_tr[3]` | Günlük hayatta ikisi de olur. | Günlük hayatta ikisi de olur. Hangi ikisi? | **GERİ** | Tek başına anlaşılmıyor: ikisi'nin ne olduğu bu öğede yok, bir önceki öğeye dayanıyor. Kurallar ekranda tek tek gösterildiği için bunu tek okumada çözemedim. |
| 71 | `pt:wie-viel-kostet` | `kurallar_tr[0]` | Fiyatı **Was kostet das?** diye sorarsın. | Fiyatı Was kostet das? diye sorarım. | GEÇTİ |  |
| 72 | `pt:wie-viel-kostet` | `kurallar_tr[1]` | **Wie viel kostet das?** de aynı anlama gelir. | Wie viel kostet das? de aynı. | GEÇTİ |  |
| 73 | `pt:wie-viel-kostet` | `kurallar_tr[2]` | Tek şey için **kostet**, birden fazla şey için **kosten** dersin. | Bir şey için kostet, birden çok şey için kosten. | GEÇTİ |  |
| 74 | `pt:wie-viel-kostet` | `kurallar_tr[3]` | Toplamı kasada **Was macht das?** diye sorarsın. | Toplamı kasada Was macht das? diye sorarım. | GEÇTİ |  |
| 75 | `pt:geht-es-auch` | `mistakes_tr[0] (değişen)` | Soruyu **Es geht auch am Freitag?** diye kurma. Doğrusu **Geht es auch am Freitag?** | Soruyu Es geht auch am Freitag? diye kurmayacağım; doğrusu Geht es auch am Freitag? | GEÇTİ | Birinci turdaki çelişki gitmiş: artık açıkça kurma diyor. |
| 76 | `pt:seit` | `mistakes_tr[0] (değişen)` | Hâlâ süren şey için **Ich habe seit zwei Jahren hier gewohnt** denmez. Doğrusu **Ich wohne seit zwei Jahren hier**. | Hâlâ süren şey için habe ... gewohnt denmez; Ich wohne seit zwei Jahren hier. | GEÇTİ |  |
| 77 | `pt:seit` | `mistakes_tr[1] (değişen)` | Dünden beri bir şey yemediysen **habe** ile söylersin: **Ich habe seit gestern nichts gegessen**. | Dünden beri bir şey yemediysem habe ile: Ich habe seit gestern nichts gegessen. | GEÇTİ | Ne demek istediği tek okumada anlaşılıyor. Bir önceki maddeyle yan yana okununca neden burada habe olduğunu merak ettim; madde nedenini söylemiyor ama yanlış bir şey de söylemiyor. |
| 78 | `pt:ich-moechte` | `mistakes_tr[1] (weil)` | Tek cümlede **möchte** sona gitmez: **Ich möchte einen Termin machen**. **weil** gelince sona gider: **weil ich einen Termin machen möchte**. | Tek cümlede möchte sona gitmez... weil'li cümle de tek cümle değil mi? | **GERİ** | weil'i biliyorum (çünkü, A2 kelimesi), sorun o değil. Tek cümlede sözüyle ne kastedildiği belli değil: weil ich einen Termin machen möchte da bana tek bir cümle gibi görünüyor. İki örneği karşılaştırınca anladım, tek okumada değil. (Birinci turda bu maddeye GEÇTİ vermiştim, notta takıldığımı yazmıştım; bu kez tek okuma sorusuyla bakınca GERİ.) |
| 79 | `pt:mir-tut-weh` | `mistakes_tr[2] (weil)` | **weil** gelince **weh** ile **tut** birleşir ve sona gider: **weil mir der Kopf wehtut**. | weil gelince weh ile tut birleşip wehtut olur ve sona gider. | GEÇTİ | weil'i çünkü olarak biliyorum; tek okumada anlaşıldı. |
| 80 | `pt:perfekt-haben` | `mistakes_tr[1] (weil)` | **weil** gelince **habe** en sona gider: **weil ich nicht geschlafen habe**. | weil gelince habe en sona gider. | GEÇTİ | weil'i çünkü olarak biliyorum; tek okumada anlaşıldı. |

### Tur 2 toplam

- Toplam: **80** · GEÇTİ: **76** · GERİ: **4**
- `frame_tr`: 15 / GERİ 1 · `kurallar_tr`: 59 / GERİ 2 · değişen `mistakes_tr`: 3 / GERİ 0 · weil maddeleri: 3 / GERİ 1
- GERİ kimlikleri:
  - #9 `pt:perfekt-haben` · `frame_tr`
  - #41 `pt:noch-mal` · `kurallar_tr[3]`
  - #70 `pt:wuerden-sie` · `kurallar_tr[3]`
  - #78 `pt:ich-moechte` · `mistakes_tr[1] (weil)`

### Kalıp durumu (okur açısından, Tur 1 + Tur 2)

- Birinci turun `mistakes_tr` GERİ'leri kapandı: `pt:geht-es-auch` [0] düzeltildi ve GEÇTİ, ob maddesi silindi, `pt:seit` [1] düzeltildi ve GEÇTİ.
- Açık GERİ olan kalıplar ("reviewed" sayılamaz, OD-9.4): `pt:ich-moechte`, `pt:noch-mal`, `pt:perfekt-haben`, `pt:wuerden-sie`.
- Açık GERİ kalmayan kalıplar: `pt:geht-es-auch`, `pt:ich-habe`, `pt:ich-verstehe-nicht`, `pt:koennten-sie`, `pt:mir-tut-weh`, `pt:passt-ihnen`, `pt:seit`, `pt:um-uhr`, `pt:was-heisst`, `pt:wenn`, `pt:wie-viel-kostet`.

### Tur 2 gözlemleri (karar dışı, düzeltme önerisi değil)

1. Ekran hâlâ eski alanı gösteriyor: `web/src/screens/Player.tsx:245` Almanca kur adımında `Kalıp: {p.frame}` basıyor, `frame_tr` değil. `kurallar_tr` bugün `web/src` içinde hiç ekrana basılmıyor. Yani bu turda GEÇTİ alan `frame_tr`'ler öğrenciye henüz ulaşmıyor; terimli `frame` (birinci turdaki "Görünen ama çevrilmemiş" listesi) hâlâ görünüyor.
2. weil üç maddede açıklanmadan kullanılıyor. A2 okur olarak anlamını biliyorum; ama uygulamada weil henüz öğretilmediyse bu, LS-16.3 bilgi kısıtlı oyuncu açısından ayrıca bakılacak bir nokta (okur kararı değil).
3. `pt:seit` `kurallar_tr[2]` bir ay ve bir yıl için einem diyor; okurken bir haftadır nasıl söylenir sorusu aklıma geldi ve cevabı bu kalıbın görünen alanlarında yok.

---

## Tur 3 (2026-11-18): değişen 7 metin

Bugünkü dosya Tur 1 ve Tur 2 tablolarıyla karşılaştırıldı: 15 kalıbın öğrenciye görünen alanlarında (`frame_tr`, `kurallar_tr`, `mistakes_tr`) daha önce okunmamış metin yalnızca bu 7 madde. Aynı kimlik, aynı ölçütler.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `pt:perfekt-haben` | `frame_tr` | **Ich habe** + ne + bitmiş iş, örneğin **gemacht** ya da **gegessen** | Ich habe, ne, sonra bitmiş iş: gemacht, gegessen gibi. | GEÇTİ | Tur 2 GERİ'si kapandı: sondaki kelime artık doldurulacak yer olarak yazılmış, gemacht ve gegessen örnek olarak duruyor. |
| 2 | `pt:perfekt-haben` | `mistakes_tr[1]` | **weil** yani çünkü gelince **habe** en sona gider: **weil ich nicht geschlafen habe**. | weil, yani çünkü, gelince habe en sona gider. | GEÇTİ | weil'in anlamı artık yanında yazıyor. Virgülsüz okununca yani çünkü bir an akışı kesiyor ama tek okumada anlaşıldı. |
| 3 | `pt:noch-mal` | `kurallar_tr[3]` | Sonda **sagen** varsa **noch mal** ondan önce gelir: **Können Sie das noch mal sagen?** | Sonda sagen varsa noch mal ondan hemen önce. | GEÇTİ | Tur 2 GERİ'si kapandı: kural artık yalnızca sonda sagen olan cümleyi anlatıyor, çerçevedeki Wie war ... noch mal? ile çelişmiyor. |
| 4 | `pt:wuerden-sie` | `kurallar_tr[3]` | Günlük hayatta **Würden Sie** de **Könnten Sie** de kibar rica için olur. | Günlük hayatta Würden Sie de Könnten Sie de kibar rica için olur. | GEÇTİ | Tur 2 GERİ'si kapandı: öğe artık kendi başına okunuyor, ikisinin ne olduğu yazıyor. |
| 5 | `pt:ich-moechte` | `mistakes_tr[1]` | **Ich einen Termin machen möchte** denmez. Doğrusu **Ich möchte einen Termin machen**. | Ich einen Termin machen möchte yanlış; Ich möchte einen Termin machen doğru. | GEÇTİ | Tur 2 GERİ'si kapandı: tek cümle sözü ve weil'li karşılaştırma kalkmış, madde tek fikir. |
| 6 | `pt:mir-tut-weh` | `mistakes_tr[2]` | **weil** yani çünkü gelince **weh** ile **tut** birleşir: **weil mir der Kopf wehtut**. | weil, yani çünkü, gelince weh ile tut birleşip wehtut olur. | GEÇTİ | Nereye gittiği yazmıyor ama örnekte en sonda görünüyor. |
| 7 | `pt:seit` | `kurallar_tr[3]` | Bir haftadır demek için **einer** gelir: **seit einer Woche**. | Bir haftadır derken einer: seit einer Woche. | GEÇTİ | Tur 2'deki bir haftadır sorumun cevabı. Önceki öğe ay ve yıl için einem diyor; neden farklı olduğu yazmıyor ama iki kural ayrı ayrı açık. Yeni öğe eklendiği için eski kurallar_tr[3] (sayı varsa n) artık kurallar_tr[4]; metni değişmemiş. |

### Tur 3 toplam

- Toplam: **7** · GEÇTİ: **7** · GERİ: **0**

### 15 kalıbın son durumu (okur açısından)

Öğrenciye görünen alanlar: `frame_tr`, `kurallar_tr[]`, `mistakes_tr[]`. Şema kararıyla `grammar_tr` öğretmen notu; Tur 1'deki 15 `grammar_tr` GERİ'si öğrenci ekranını bağlamıyor ve aşağıda sayılmadı.

| kalıp | frame_tr | kurallar_tr | mistakes_tr | açık GERİ | kapanan GERİ geçmişi |
|---|---|---|---|---|---|
| `pt:geht-es-auch` | 1 | 4 | 5 | yok | Tur 1: mistakes_tr[0] GERİ (Tur 2'de düzeltildi, GEÇTİ), ob maddesi GERİ (silindi) |
| `pt:ich-habe` | 1 | 3 | 4 | yok | — |
| `pt:ich-moechte` | 1 | 4 | 4 | yok | Tur 2: mistakes_tr[1] GERİ (Tur 3'te GEÇTİ) |
| `pt:ich-verstehe-nicht` | 1 | 4 | 5 | yok | — |
| `pt:koennten-sie` | 1 | 3 | 5 | yok | — |
| `pt:mir-tut-weh` | 1 | 4 | 4 | yok | — |
| `pt:noch-mal` | 1 | 4 | 5 | yok | Tur 2: kurallar_tr[3] GERİ (Tur 3'te GEÇTİ) |
| `pt:passt-ihnen` | 1 | 4 | 4 | yok | — |
| `pt:perfekt-haben` | 1 | 4 | 4 | yok | Tur 2: frame_tr GERİ (Tur 3'te GEÇTİ) |
| `pt:seit` | 1 | 6 | 5 | yok | Tur 1: mistakes_tr[1] GERİ (Tur 2'de GEÇTİ) |
| `pt:um-uhr` | 1 | 5 | 5 | yok | — |
| `pt:was-heisst` | 1 | 4 | 3 | yok | — |
| `pt:wenn` | 1 | 3 | 4 | yok | — |
| `pt:wuerden-sie` | 1 | 4 | 4 | yok | Tur 2: kurallar_tr[3] GERİ (Tur 3'te GEÇTİ) |
| `pt:wie-viel-kostet` | 1 | 4 | 3 | yok | — |

Okur açısından 15 kalıbın hiçbirinde açık GERİ kalmadı (OD-9.4 okur koşulu sağlandı).

### Tur 3 gözlemleri (karar dışı)

1. Tur 2 gözlem 1 sürüyor: `web/src/screens/Player.tsx:245` hâlâ terimli `frame` alanını gösteriyor (`Kalıp: {p.frame}`), `frame_tr`'yi değil; `kurallar_tr` ekrana basılmıyor. Okur onayı içerik metni için; öğrencinin bugün gördüğü çerçeve bu onayın dışında.
2. Slot adları ve `transforms` etiketleri (Tur 1 "Görünen ama çevrilmemiş" listesi) değişmedi; bugün ekrana basılmıyorlar.
