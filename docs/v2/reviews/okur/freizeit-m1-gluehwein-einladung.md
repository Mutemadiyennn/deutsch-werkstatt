# Okur kontrolü — `content/v2/domains/freizeit/scenarios/m1-gluehwein-einladung.json`

Tarih: 2026-11-17 · Rol: okur (OD-9.3, PM-017) · Kontrol eden: QA ajanı, okur kimliğiyle (yalnızca Türkçe, Almanca A2, dilbilgisi terimi bilmez)

Kapsam: öğrenciye görünen bütün Türkçe açıklamalar, örneklem değil hepsi — `goal_tr`, senaryo `mistakes_tr`, ifade `use_tr` ve `mistakes_tr`, Bairisch `note_tr`, alıştırma `instr_tr` / `situation_tr` / `hint_tr` / `why_tr`, diyalog satırı `hint_tr`, rol oyunu `scene_tr`, konuşma ve görev `task_tr`. Almanca alanlar (`de`, `accepted`, `hints_de`, `starter`, `opts`) atlandı.

Ölçüt (OD-9.2): bir alan bir fikir · cümle ≤ 14 kelime · `=`, `;`, `…` ve tırnak içinde Almanca yok · öğretilmemiş dilbilgisi terimi yok · açıklama ekrandaki ifadenin kendisini anlatır · tek okumada anlaşılır.

Kimlik biçimi: `v1#3` = diyalog `v1`, satır sırası 3 (0'dan sayılır). Kelime sayısı ve sembol kontrolü ayrıca betikle yapıldı: en uzun cümle 13 kelime, yasak sembol yok. Karar her satır için tek tek, elle verildi.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `scenario` | `goal_tr` | İş arkadaşların seni iş çıkışı Glühwein içmeye çağırıyor. Kabul eder ya da kibarca ertelersin. Saati ve yeri netleştirir, kısa bir sohbete katılırsın. | İş arkadaşlarım Glühwein'e çağırıyor. Ya kabul ederim ya kibarca başka güne bırakırım; saati, yeri sorar, biraz sohbet ederim. | GEÇTİ |  |
| 2 | `scenario` | `mistakes_tr[0]` | Halb sechs 17:30 demektir. Türkçedeki altı buçuk gibi düşünüp 18:30 anlama. | Halb sechs 17:30 demek; Türkçedeki altı buçuk gibi 18:30 sanmayacağım. | GEÇTİ |  |
| 3 | `scenario` | `mistakes_tr[1]` | Passt dir das denir, passt dich das denmez. | Passt dir das doğru, passt dich das yanlış. | GEÇTİ |  |
| 4 | `scenario` | `mistakes_tr[2]` | Hızlı konuşmada Kommste, Kommst du demektir. Haste de Hast du demektir. | Hızlı konuşurken Kommste aslında Kommst du, Haste da Hast du. | GEÇTİ |  |
| 5 | `scenario` | `mistakes_tr[3]` | Heute başta olunca kann hemen ardından gelir: Heute kann ich leider nicht. | Heute ile başlarsam hemen arkasından kann gelir. | GEÇTİ |  |
| 6 | `scenario` | `mistakes_tr[4]` | Geçmişi anlatırken gebacken gibi kelimeler sona gider: Ich habe Plätzchen gebacken. | Olmuş bir şeyi anlatırken gebacken gibi kelimeler en sona gider. | GEÇTİ |  |
| 7 | `scenario` | `mistakes_tr[5]` | Tek kişiye Hast du, iki kişiye Habt ihr diye sorarsın. | Bir kişiye Hast du, iki kişiye Habt ihr diye sorarım. | **GERİ** | Gerçek kullanımla tam örtüşmüyor: metin iki kişi diyor. Üç dört kişilik bir gruba ne diyeceğimi bilemedim. |
| 8 | `scenario` | `mistakes_tr[6]` | Servus ve Pfiat di yalnızca du dediğin kişilere söylenir. | Servus ve Pfiat di'yi yalnızca du dediğim kişilere söylerim. | GEÇTİ |  |
| 9 | `ch:freizeit:bin-dabei` | `use_tr` | Bir daveti sıcak ve samimi biçimde kabul ederken söylersin. | Bir davete içten bir evet derken söylerim. | GEÇTİ |  |
| 10 | `ch:freizeit:bin-dabei` | `mistakes_tr[0]` | Mit cümlenin sonuna gider: Ich komme mit. | mit cümlenin en sonuna gelir. | GEÇTİ |  |
| 11 | `ch:freizeit:heute-nicht` | `use_tr` | Bir daveti bugün için kibarca geri çevirirken söylersin. | Bugünkü bir daveti kibarca geri çevirirken söylerim. | GEÇTİ |  |
| 12 | `ch:freizeit:heute-nicht` | `mistakes_tr[0]` | Heute başta olunca kann hemen ardından gelir: Heute kann ich nicht. | Heute başta olunca kann hemen arkasından gelir. | GEÇTİ |  |
| 13 | `ch:freizeit:geht-auch-morgen` | `use_tr` | Bugün gelemeyince başka bir gün önermek için sorarsın. | Bugün gelemiyorsam başka gün olur mu diye sorarım. | GEÇTİ |  |
| 14 | `ch:freizeit:wann-wo` | `use_tr` | Daveti kabul ettikten sonra saati ve yeri öğrenmek için sorarsın. | Daveti kabul edince ne zaman ve nerede diye sorarım. | GEÇTİ |  |
| 15 | `ch:freizeit:wann-wo` | `mistakes_tr[0]` | Soruda treffen hemen wann kelimesinden sonra gelir: Wann treffen wir uns? | Soru sorarken treffen, wann'ın hemen arkasından gelir. | **GERİ** | Ekrandaki ifadeyle çelişiyor: Wann und wo treffen wir uns? cümlesinde wann'dan sonra und wo geliyor, treffen hemen arkasında değil. Hangisine inanacağımı bilemedim. |
| 16 | `ch:freizeit:halb-sechs-rathaus` | `use_tr` | Buluşma saatini ve yerini tekrar ederek doğrularken söylersin. | Buluşma saatini ve yerini tekrar edip doğru anladığımı gösteririm. | GEÇTİ |  |
| 17 | `ch:freizeit:halb-sechs-rathaus` | `mistakes_tr[0]` | Halb sechs 17:30 demektir, 18:30 değil. Altıya yarım saat var diye düşün. | Halb sechs 17:30, 18:30 değil; altıya yarım saat var. | GEÇTİ |  |
| 18 | `ch:freizeit:halb-sechs-rathaus` | `mistakes_tr[1]` | Beim Rathaus, belediye binasının yanında demektir. | Beim Rathaus: belediye binasının yanında. | GEÇTİ |  |
| 19 | `ch:freizeit:passt-mir` | `use_tr` | Önerilen saat ya da yer sana uyuyorsa söylersin. | Önerilen saat ya da yer bana uygunsa söylerim. | GEÇTİ |  |
| 20 | `ch:freizeit:passt-mir` | `mistakes_tr[0]` | Passt dir das denir, passt dich das denmez. | Passt dir das doğru, passt dich das yanlış. | **GERİ** | Ekrandaki ifadenin kendisini anlatmıyor: ekranda Das passt mir gut var, uyarı mir'den hiç söz etmiyor. Kendi cümlemde neye dikkat edeceğimi anlamadım. |
| 21 | `ch:freizeit:passt-mir` | `bair.note_tr` | Bavyera'da tamam, sorun yok anlamında çok sık duyarsın. | Passt scho'yu Bavyera'da tamam, sorun yok anlamında çok duyarım. | GEÇTİ |  |
| 22 | `ch:freizeit:plaetzchen-gebracht` | `use_tr` | Advent sohbetinde anlatabileceğin küçük bir haber. | Advent sohbetinde anlatılacak küçük bir haber. | GEÇTİ |  |
| 23 | `ch:freizeit:plaetzchen-gebracht` | `mistakes_tr[0]` | Gebracht cümlenin sonuna gider: Sie hat mir Plätzchen gebracht. | gebracht cümlenin en sonuna gider. | GEÇTİ |  |
| 24 | `ch:freizeit:plaetzchen-gebracht` | `mistakes_tr[1]` | Bringen geçmişte gebracht olur, gebringt değil. | bringen olmuş bir şeyi anlatırken gebracht olur, gebringt olmaz. | GEÇTİ |  |
| 25 | `ch:freizeit:adventskranz` | `use_tr` | Advent haftalarında sohbet açmak için sorulan bir soru. | Advent zamanı sohbet başlatmak için sorulan bir soru. | GEÇTİ |  |
| 26 | `ch:freizeit:adventskranz` | `mistakes_tr[0]` | Tek kişiye Hast du, iki kişiye Habt ihr diye sorarsın. | Bir kişiye Hast du, iki kişiye Habt ihr diye sorarım. | **GERİ** | Gerçek kullanımla tam örtüşmüyor: metin iki kişi diyor. Üç dört kişilik bir gruba ne diyeceğimi bilemedim. |
| 27 | `ch:freizeit:adventskranz` | `mistakes_tr[1]` | Adventskranz dört mumlu bir çelenktir. Her Advent pazarı bir mum daha yakılır. | Adventskranz dört mumlu bir çelenk; her Advent pazarı bir mum daha yanar. | GEÇTİ | İki cümle ama ikisi de Adventskranz'ın ne olduğunu anlatıyor. |
| 28 | `ch:freizeit:komme-nach` | `use_tr` | Daveti kabul edip biraz geç geleceğini söylerken kullanırsın. | Geleceğim ama biraz geç derken kullanırım. | GEÇTİ |  |
| 29 | `ch:freizeit:komme-nach` | `mistakes_tr[0]` | Wenn ile başlayan kısımda bin sona gider: wenn ich fertig bin. | wenn ile başlayan parçada bin en sona gider. | GEÇTİ |  |
| 30 | `ch:freizeit:erster-advent` | `use_tr` | Noel'in hızla yaklaştığını söylerken kullanırsın. | Noel çok yaklaştı derken kullanırım. | GEÇTİ |  |
| 31 | `ch:freizeit:bis-gleich` | `use_tr` | Birazdan tekrar görüşeceğin biriyle vedalaşırken söylersin. | Birazdan yine göreceğim biriyle vedalaşırken söylerim. | GEÇTİ |  |
| 32 | `ch:freizeit:bis-gleich` | `mistakes_tr[0]` | Bis gleich birazdan, bis morgen yarın görüşürüz demektir. | Bis gleich birazdan görüşürüz, bis morgen yarın görüşürüz demek. | GEÇTİ |  |
| 33 | `ch:freizeit:bis-gleich` | `bair.note_tr` | Samimi selam ve veda sözü. Yalnızca du dediğin kişilere söylenir. | Servus samimi bir merhaba ve hoşça kal; sadece du dediğim kişilere. | GEÇTİ |  |
| 34 | `d01` | `why_tr` | Halb sechs 17:30 demektir. Altıya yarım saat var diye düşün. | Halb sechs 17:30; altıya yarım saat var. | GEÇTİ |  |
| 35 | `d02` | `why_tr` | Passt dir das denir. Dich burada kullanılmaz. | Passt dir das doğru; burada dich olmaz. | GEÇTİ | Boşluklu cümle ekranda Passt ___ das?; açıklama tam bunu anlatıyor. |
| 36 | `d04` | `why_tr` | Bringen geçmişte gebracht olur. | bringen olmuş bir şeyi anlatırken gebracht olur. | GEÇTİ |  |
| 37 | `d05` | `why_tr` | Wenn ile başlayan kısımda bin en sona gider. | wenn ile başlayan parçada bin en sonda. | GEÇTİ |  |
| 38 | `d08` | `why_tr` | Habe ikinci sırada durur, getrunken en sona gider. | habe ikinci sırada, getrunken en sonda. | GEÇTİ |  |
| 39 | `d09` | `situation_tr` | Tobi seni iş çıkışı Glühwein içmeye çağırıyor. Kabul et, saati ve yeri sor. | Tobi Glühwein'e çağırıyor; evet deyip saati ve yeri soracağım. | GEÇTİ |  |
| 40 | `d10` | `situation_tr` | Bugün gelemiyorsun. Kibarca ertele ve yarını öner. | Bugün gelemiyorum; kibarca erteleyip yarını önereceğim. | GEÇTİ |  |
| 41 | `d11` | `situation_tr` | Derya Advent çelengini soruyor. Henüz yok de. Komşunun kurabiye getirdiğini anlat. | Derya çelenk var mı diye soruyor. Henüz yok deyip komşumun kurabiye getirdiğini anlatacağım. | GEÇTİ |  |
| 42 | `d16` | `instr_tr` | Cümleyi geçmişte olmuş gibi söyle. Örnek: Ich kaufe yerine Ich habe gekauft. | Cümleyi olmuş bitmiş gibi söyleyeceğim, örnekteki gibi habe ile. | GEÇTİ |  |
| 43 | `d17` | `situation_tr` | Kabul et ve saati tekrar ederek doğrula. | Kabul edip saati tekrar ederek doğru anladığımı göstereceğim. | GEÇTİ |  |
| 44 | `d18` | `situation_tr` | Tamam de ve biraz geç geleceğini söyle. | Tamam deyip biraz geç geleceğimi söyleyeceğim. | GEÇTİ |  |
| 45 | `d19` | `why_tr` | Halb sechs altıya yarım saat var demektir, yani 17:30. | Halb sechs: altıya yarım saat var, yani 17:30. | GEÇTİ |  |
| 46 | `d20` | `why_tr` | Pfiat di Bavyera'da hoşça kal demektir. Du dediğin tek kişiye söylenir. | Pfiat di Bavyera'da hoşça kal; du dediğim tek kişiye söylenir. | GEÇTİ | İkinci cümle aynı kelimenin kime söyleneceğini anlatıyor; ayrı bir konu değil. |
| 47 | `v1#1` | `hint_tr` | Kabul et. Saati ve yeri sor. | Evet deyip saati ve yeri soracağım. | GEÇTİ |  |
| 48 | `v1#3` | `hint_tr` | Kabul et. Saati ve yeri tekrar ederek doğrula. | Kabul edip saati ve yeri tekrar edeceğim. | GEÇTİ |  |
| 49 | `v1#5` | `hint_tr` | Henüz yok de. Komşunun kurabiye getirdiğini anlat. | Henüz yok deyip komşumun kurabiye getirdiğini anlatacağım. | GEÇTİ |  |
| 50 | `v1#7` | `hint_tr` | Evet de. İkisine de kurabiye pişirip pişirmediklerini sor. | Evet deyip ikisine de kurabiye yaptınız mı diye soracağım. | GEÇTİ |  |
| 51 | `v1#9` | `hint_tr` | Şaşır. İlk mumu yakıp yakmayacaklarını sor. | Şaşırdığımı gösterip ilk mumu yakacak mısınız diye soracağım. | GEÇTİ |  |
| 52 | `v1#11` | `hint_tr` | Güzel olduğunu söyle ve kadeh kaldır. | Güzel deyip şerefe diyeceğim. | GEÇTİ |  |
| 53 | `v2#1` | `hint_tr` | Teşekkür et ve bugün gelemeyeceğini kibarca söyle. | Teşekkür edip bugün gelemeyeceğimi kibarca söyleyeceğim. | GEÇTİ |  |
| 54 | `v2#3` | `hint_tr` | Yarını öner. Yarın vaktin olduğunu söyle. | Yarını önerip yarın vaktim var diyeceğim. | GEÇTİ |  |
| 55 | `v2#5` | `hint_tr` | Saati kabul et ve yeri sor. | Saate tamam deyip nerede diye soracağım. | GEÇTİ |  |
| 56 | `v2#7` | `hint_tr` | Onayla, davet için teşekkür et ve vedalaş. | Tamam deyip davet için teşekkür edip vedalaşacağım. | GEÇTİ |  |
| 57 | `roleplay` | `scene_tr` | İş çıkışı Tobi masana geliyor. Seni Derya ile birlikte Weihnachtsmarkt'a çağırıyor. Kabul et ya da kibarca ertele. Saati ve yeri netleştir, sonra sohbete katıl. | İş bitince Tobi masama gelip beni Derya ile Noel pazarına çağırıyor. Kabul eder ya da ertelerim, saati ve yeri netleştirip sohbet ederim. | GEÇTİ |  |
| 58 | `speaking[0]` | `task_tr` | Tobi'nin davetini kabul et. Saati ve yeri tekrar ederek doğrula. | Tobi'nin davetine evet deyip saati ve yeri tekrar edeceğim. | GEÇTİ |  |
| 59 | `speaking[1]` | `task_tr` | Daveti kibarca ertele, kısa bir sebep söyle ve başka gün öner. | Kibarca erteleyip kısa bir sebep söyleyecek, başka gün önereceğim. | GEÇTİ |  |
| 60 | `missions/m1` | `task_tr` | Bu hafta birini Almanca bir şeye davet et: kahve, Glühwein ya da yürüyüş. Ya da gelen bir daveti kibarca ertele ve başka gün öner. Saati ve yeri tekrar ederek doğrula. | Bu hafta gerçekten birini Almanca bir şeye çağıracağım ya da gelen bir daveti erteleyeceğim. Saati ve yeri tekrar edeceğim. | GEÇTİ | Anladım; ama bakınız sondaki gözlem 2. |

## Toplam

- Toplam: **60** · GEÇTİ: **56** · GERİ: **4**
- GERİ kimlikleri:
  - #7 `scenario` · `mistakes_tr[5]`
  - #15 `ch:freizeit:wann-wo` · `mistakes_tr[0]`
  - #20 `ch:freizeit:passt-mir` · `mistakes_tr[0]`
  - #26 `ch:freizeit:adventskranz` · `mistakes_tr[0]`

Bu dosyada GERİ olduğu için dosya "reviewed" sayılamaz (OD-9.4).

## Gözlemler (karar dışı, düzeltme önerisi değil)

1. `scenario mistakes_tr[1]` ile `ch:freizeit:passt-mir mistakes_tr[0]` aynı metin. Senaryo listesinde GEÇTİ (orada ekranda tek bir ifade yok); kartın altında GERİ (ekranda `mir` var, uyarı `dir`/`dich` anlatıyor).
2. `missions/m1` görevi birini davet etmemi istiyor. Hazırlık kartlarının (`prep`) hepsi davete cevap vermekle ilgili; davet eden bir cümle yok. Açıklama anlaşılır (GEÇTİ); bu, LS-16.3 bilgi kısıtlı oyuncu gözlemi.

## Kapsam dışı kalan Türkçe alanlar

Görev listesinde olmadığı için okunmadı: alıştırma `q_tr`, `build[].prompt_tr`, dinleme `qs[].q_tr` ve `title_tr`, diyalog `title_tr`, rol oyunu `goals[].tr` ve `surprises[].tr`. Bunlar da öğrenciye görünüyor; istenirse ayrı turda okunur.

---

## Tur 2 (2026-11-18)

Kapsam: (a) dilbilimcinin düzelttiği birinci tur GERİ maddeleri ve baş geliştiricinin adını verdiği yeni ya da değişen alanlar; (b) birinci turda okunmayan öğrenciye görünen alanların hepsi: alıştırma `q_tr` ve Türkçe şıklar (`opts`), `build[].prompt_tr`, dinleme `title_tr`, `qs[].q_tr` ve Türkçe şıklar, diyalog `title_tr`, rol oyunu `goals[].tr` ve `surprises[].tr`. Aynı kimlik, aynı ölçütler (OD-9.2). Karar her satır için elle verildi.

Birinci tur metinleri ile bugünkü dosya karşılaştırıldı: değişen maddeler yalnızca baş geliştiricinin bildirdikleri. Birinci tur tablosundaki açıklama sütunu eski metni gösterir; güncel metin aşağıda.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `scenario` (düzeltme) | `mistakes_tr[5]` | Tek kişiye Hast du diye sorarsın. İki ya da daha fazla kişiye Habt ihr dersin. | Bir kişiye Hast du, iki ya da daha çok kişiye Habt ihr. | GEÇTİ | Birinci turdaki eksik giderilmiş: kalabalık gruba ne diyeceğim artık belli. |
| 2 | `ch:freizeit:wann-wo` (düzeltme) | `mistakes_tr[0]` | Soruda treffen, wir kelimesinden önce gelir: Wann und wo treffen wir uns? | Soruda treffen, wir'den önce gelir. | GEÇTİ | Ekrandaki cümleyle örtüşüyor: Wann und wo treffen wir uns? |
| 3 | `ch:freizeit:passt-mir` (düzeltme) | `mistakes_tr[0]` | Das passt mir denir, das passt mich denmez. | Das passt mir doğru, das passt mich yanlış. | GEÇTİ | Artık ekrandaki ifadenin kendisini (mir) anlatıyor. |
| 4 | `ch:freizeit:adventskranz` (düzeltme) | `mistakes_tr[0]` | Tek kişiye Hast du diye sorarsın. İki ya da daha fazla kişiye Habt ihr dersin. | Bir kişiye Hast du, iki ya da daha çok kişiye Habt ihr. | GEÇTİ |  |
| 5 | `ch:freizeit:kommst-du-mit` (düzeltme) | `use_tr` | Birini seninle bir şey içmeye çağırırken sorarsın. | Birini benimle bir şey içmeye çağırırken sorarım. | GEÇTİ |  |
| 6 | `ch:freizeit:kommst-du-mit` (düzeltme) | `mistakes_tr[0]` | Kahve için aynı cümleyi auf einen Kaffee ile kurarsın. | Kahveye çağırmak için aynı cümlede auf einen Kaffee derim. | GEÇTİ | Hata değil, aynı cümlenin kahve biçimi; ama ekrandaki ifadeyi anlatıyor. |
| 7 | `missions/m1` (düzeltme) | `task_tr` | Bu hafta birini Almanca bir Glühwein ya da kahve içmeye davet et. Ya da gelen bir daveti kibarca ertele ve başka gün öner. Saati ve yeri tekrar ederek doğrula. | Bu hafta birini Almanca Glühwein ya da kahveye çağıracağım, ya da gelen daveti erteleyeceğim. Saati ve yeri tekrar edeceğim. | GEÇTİ | İlk okumada Almanca bir Glühwein diye takıldım ama hemen çözdüm. Hazırlıkta artık kommst-du-mit var (kahve biçimi uyarıda), yani görev hazırlıktaki ifadelerle yapılabiliyor. Birinci turdaki gözlem 2 kapandı. |
| 8 | `d19` | `q_tr` | Halb sechs saat kaç? | Halb sechs saat kaç demek? | GEÇTİ |  |
| 9 | `d19` | `opts` | 18:30 (6:30) · 17:30 (5:30) · 17:00 · 18:00 | 18:30, 17:30, 17:00, 18:00. | GEÇTİ |  |
| 10 | `d20` | `q_tr` | Tobi ayrılırken Pfiat di diyor. Ne demek? | Tobi giderken Pfiat di diyor; ne demek? | GEÇTİ |  |
| 11 | `d20` | `opts` | Şerefe · Afiyet olsun · Hoşça kal | Şerefe, afiyet olsun, hoşça kal. | GEÇTİ |  |
| 12 | `b01` | `prompt_tr` | Evet, memnuniyetle! Ben de geliyorum. | Evet, memnuniyetle, ben de geliyorum diyeceğim. | GEÇTİ |  |
| 13 | `b02` | `prompt_tr` | Bugün maalesef olmuyor. | Bugün maalesef olmuyor diyeceğim. | GEÇTİ |  |
| 14 | `b03` | `prompt_tr` | Yarın da olur mu? | Yarın da olur mu diye soracağım. | GEÇTİ |  |
| 15 | `b04` | `prompt_tr` | Ne zaman ve nerede buluşuyoruz? | Ne zaman ve nerede buluşuyoruz diye soracağım. | GEÇTİ |  |
| 16 | `b05` | `prompt_tr` | 17:30'da mı? (halb ile sor) | 17:30'da mı diye halb ile soracağım. | GEÇTİ |  |
| 17 | `b06` | `prompt_tr` | 17:30'da, belediye binasının yanındaki stantta. | 17:30'da, belediye binasının yanındaki standda diyeceğim. | GEÇTİ |  |
| 18 | `b07` | `prompt_tr` | Bu bana uyar. | Bu bana uyar diyeceğim. | GEÇTİ |  |
| 19 | `b08` | `prompt_tr` | Saat altı sana uyar mı? | Saat altı sana uyar mı diye soracağım. | GEÇTİ |  |
| 20 | `b09` | `prompt_tr` | İşimi bitirince arkanızdan gelirim. | İşimi bitirince arkanızdan gelirim diyeceğim. | GEÇTİ |  |
| 21 | `b10` | `prompt_tr` | Kadın komşum bana kurabiye getirdi. | Kadın komşum bana kurabiye getirdi diyeceğim. | GEÇTİ | Kadın komşum biraz tuhaf duruyor ama neden yazıldığını (Nachbarin) anladım. |
| 22 | `b11` | `prompt_tr` | Hiç Glühwein içmedim. | Hiç Glühwein içmedim diyeceğim. | GEÇTİ |  |
| 23 | `b12` | `prompt_tr` | Evde Advent çelengin var mı? (du ile) | Evde Advent çelengin var mı diye du ile soracağım. | GEÇTİ |  |
| 24 | `b13` | `prompt_tr` | Davet için teşekkürler! | Davet için teşekkürler diyeceğim. | GEÇTİ |  |
| 25 | `b14` | `prompt_tr` | Pazar günü ilk Advent. | Pazar günü ilk Advent diyeceğim. | GEÇTİ |  |
| 26 | `b15` | `prompt_tr` | Hiç Noel kurabiyesi pişirdin mi? | Hiç Noel kurabiyesi pişirdin mi diye soracağım. | GEÇTİ |  |
| 27 | `b16` | `prompt_tr` | Görüşürüz! (az sonra) | Birazdan görüşürüz diyeceğim. | GEÇTİ |  |
| 28 | `b17` | `prompt_tr` | Bir Glühwein içmeye geliyor musun? (du ile) | Bir Glühwein içmeye geliyor musun diye du ile soracağım. | GEÇTİ |  |
| 29 | `h1` | `title_tr` | Tobi'den sesli mesaj (hızlı) | Tobi'nin bıraktığı hızlı sesli mesaj. | GEÇTİ |  |
| 30 | `h1.qs[0]` | `q_tr` | Mesajın konusu ne? | Mesaj ne hakkında? | GEÇTİ |  |
| 31 | `h1.qs[0]` | `opts` | Buluşma iptal oldu · Buluşma saati değişti · Tobi hasta | Buluşma iptal, saat değişti, Tobi hasta. | GEÇTİ |  |
| 32 | `h1.qs[1]` | `q_tr` | Yeni buluşma saati kaç? | Yeni saat kaç? | GEÇTİ |  |
| 33 | `h1.qs[1]` | `opts` | 18:00 · 17:30 · 18:30 | 18:00, 17:30, 18:30. | GEÇTİ |  |
| 34 | `h1.qs[2]` | `q_tr` | Nerede buluşuyorlar? | Nerede buluşuyorlar? | GEÇTİ |  |
| 35 | `h1.qs[2]` | `opts` | Tren istasyonunda · Firmanın önünde · Belediye binasının yanındaki Glühwein standında | İstasyonda, firmanın önünde, belediye binasının yanındaki Glühwein standında. | GEÇTİ |  |
| 36 | `h2` | `title_tr` | Stantta Advent sohbeti | Standda Advent üzerine sohbet. | GEÇTİ |  |
| 37 | `h2.qs[0]` | `q_tr` | Ne hakkında konuşuyorlar? | Ne konuşuyorlar? | GEÇTİ |  |
| 38 | `h2.qs[0]` | `opts` | İş toplantısı · Hafta sonu futbolu · Advent çelengi ve kurabiyeler | İş toplantısı, futbol, Advent çelengi ve kurabiyeler. | GEÇTİ |  |
| 39 | `h2.qs[1]` | `q_tr` | Derya kaç çeşit kurabiye pişirdi? | Derya kaç çeşit kurabiye yaptı? | GEÇTİ |  |
| 40 | `h2.qs[1]` | `opts` | 3 · 5 · Hiç | 3, 5, hiç. | GEÇTİ |  |
| 41 | `h2.qs[2]` | `q_tr` | Tobi'nin evinde ne var? | Tobi'nin evinde ne var? | GEÇTİ |  |
| 42 | `h2.qs[2]` | `opts` | Çikolatalı Advent takvimi · Advent çelengi · Ev yapımı kurabiye | Çikolatalı Advent takvimi, Advent çelengi, ev yapımı kurabiye. | GEÇTİ |  |
| 43 | `v1` | `title_tr` | Daveti kabul et, sonra stantta sohbet | Daveti kabul edip sonra standda sohbet. | GEÇTİ |  |
| 44 | `v2` | `title_tr` | Kibarca ertele ve yarını öner | Kibarca erteleyip yarını önermek. | GEÇTİ |  |
| 45 | `roleplay.goals/g1` | `tr` | Davete cevap verdin: kabul ettin ya da başka gün önerdin. | Davete cevap verdim: ya kabul ettim ya başka gün önerdim. | GEÇTİ |  |
| 46 | `roleplay.goals/g2` | `tr` | Buluşma saatini ve yerini netleştirdin ve doğru anladın. | Buluşma saatini ve yerini netleştirdim, doğru anladım. | GEÇTİ | Tek fikir: saat ve yer netleşti. |
| 47 | `roleplay.goals/g3` | `tr` | Kısa sohbette en az bir soru sordun ya da cevapladın. | Kısa sohbette en az bir soru sordum ya da cevap verdim. | GEÇTİ |  |
| 48 | `roleplay.surprises[0]` | `tr` | Plan değişti: Derya ancak altıda gelebiliyor. Altı da sana uyar mı? | Plan değişmiş, Derya altıda gelebiliyor; altı bana uyar mı diye soruyor. | GEÇTİ |  |
| 49 | `roleplay.surprises[1]` | `tr` | Artık belediye binasının yanında değil, karşıdaki badem standındayız. | Artık belediye binasının yanında değil, karşıdaki badem standındalar. | GEÇTİ |  |
| 50 | `roleplay.surprises[2]` | `tr` | Ben ısmarlıyorum. Ne içersin? | Tobi ısmarlıyor, ne içeceğimi soruyor. | GEÇTİ |  |
| 51 | `roleplay.surprises[3]` | `tr` | Hiç Glühwein içtin mi? | Hiç Glühwein içtin mi diye soruyor. | GEÇTİ |  |

### Tur 2 toplam

- Düzeltilen ya da yeni maddeler: 7 · yeni okunan alanlar: 44
- Toplam: **51** · GEÇTİ: **51** · GERİ: **0**

Birinci turun GERİ maddelerinin hepsi bu turda GEÇTİ.
Tur 2'de GERİ yok. Okur açısından dosyada açık GERİ kalmadı.

### Tur 2 gözlemleri (karar dışı, düzeltme önerisi değil)

1. Yeni `ch:freizeit:kommst-du-mit` kartı `extras.chunks` içinde, `essentials` içinde değil. Görev hazırlığında (`prep`) ve `b17`'de var. Okur kararı değil; içerik yapısı gözlemi.
