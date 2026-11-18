# Okur kontrolü — `content/v2/domains/arbeit/scenarios/m1-weihnachtsfeier.json`

Tarih: 2026-11-17 · Rol: okur (OD-9.3, PM-017) · Kontrol eden: QA ajanı, okur kimliğiyle (yalnızca Türkçe, Almanca A2, dilbilgisi terimi bilmez)

Kapsam: öğrenciye görünen bütün Türkçe açıklamalar, örneklem değil hepsi — `goal_tr`, senaryo `mistakes_tr`, ifade `use_tr` ve `mistakes_tr`, Bairisch `note_tr`, alıştırma `instr_tr` / `situation_tr` / `hint_tr` / `why_tr`, diyalog satırı `hint_tr`, rol oyunu `scene_tr`, konuşma ve görev `task_tr`. Almanca alanlar (`de`, `accepted`, `hints_de`, `starter`, `opts`) atlandı.

Ölçüt (OD-9.2): bir alan bir fikir · cümle ≤ 14 kelime · `=`, `;`, `…` ve tırnak içinde Almanca yok · öğretilmemiş dilbilgisi terimi yok · açıklama ekrandaki ifadenin kendisini anlatır · tek okumada anlaşılır.

Kimlik biçimi: `v1#3` = diyalog `v1`, satır sırası 3 (0'dan sayılır). Kelime sayısı ve sembol kontrolü ayrıca betikle yapıldı: en uzun cümle 13 kelime, yasak sembol yok. Karar her satır için tek tek, elle verildi.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `scenario` | `goal_tr` | Şefin seni Weihnachtsfeier'e davet ediyor. Tarihi ve saati anlar, gelip gelmeyeceğini söylersin. Wichteln'i sorar ve Noel planları sohbetine katılırsın. | Şefim Noel kutlamasına çağırıyor. Tarihi ve saati anlayıp gelip gelmeyeceğimi söyleyeceğim; Wichteln'i sorup Noel sohbetine katılacağım. | GEÇTİ |  |
| 2 | `scenario` | `mistakes_tr[0]` | Şefe Was machen Sie, iş arkadaşına Was machst du diye sorarsın. | Şefe Was machen Sie, iş arkadaşına Was machst du derim. | GEÇTİ |  |
| 3 | `scenario` | `mistakes_tr[1]` | İş yerinde du demeyi şef önerir. Sen şefe önermezsin. | İşte du diyelim teklifini şef yapar, ben şefe yapmam. | GEÇTİ |  |
| 4 | `scenario` | `mistakes_tr[2]` | Kutlamada önerilen du ertesi gün belirsizse önce Sie ile başla. | (İkinci okumada) Partide du dedik ama ertesi gün hâlâ geçerli mi bilmiyorsam önce Sie derim. | **GERİ** | Tek okumada anlamadım: neyin belirsiz olduğu belli değil (du mu, ertesi gün mü?). du kelimesi Türkçe cümlenin ortasında duruyor, nereden bölüneceği belli değil. |
| 5 | `scenario` | `mistakes_tr[3]` | Bavyera'da an Weihnachten denir. Zu Weihnachten de doğrudur. | Bavyera'da an Weihnachten derler; zu Weihnachten da doğru. | GEÇTİ |  |
| 6 | `scenario` | `mistakes_tr[4]` | Ich gebe Ihnen Bescheid denir. Ich gebe Sie Bescheid denmez. | Ich gebe Ihnen Bescheid doğru, Ich gebe Sie Bescheid yanlış. | GEÇTİ |  |
| 7 | `scenario` | `mistakes_tr[5]` | Geçmişi anlatırken ziehen gezogen olur, kaufen gekauft olur. | Olmuş bir şeyi anlatırken ziehen gezogen, kaufen gekauft olur. | GEÇTİ |  |
| 8 | `scenario` | `mistakes_tr[6]` | Chef Almancada şef ya da patron demektir. İngilizcedeki aşçı anlamı yoktur. | Chef şef ya da patron demek, aşçı değil. | GEÇTİ | İngilizce anışı D-060 istisnası. Türkçede de şef aşçı anlamına gelebildiği için uyarı bana da yararlı. |
| 9 | `ch:arbeit:komme-gern` | `use_tr` | Şefinin davetini kabul ederken söylediğin kibar cümle. | Şefimin davetine kibarca evet derken söylerim. | GEÇTİ |  |
| 10 | `ch:arbeit:komme-gern` | `mistakes_tr[0]` | Für die Einladung denir, für der Einladung denmez. | für die Einladung doğru, für der Einladung yanlış. | GEÇTİ |  |
| 11 | `ch:arbeit:muss-absagen` | `use_tr` | Bir davete gelemeyeceğini kibarca bildirirken söylersin. | Bir davete gelemeyeceğimi kibarca söylerken. | GEÇTİ |  |
| 12 | `ch:arbeit:muss-absagen` | `mistakes_tr[0]` | Ab cümlenin sonuna gider: Ich sage leider ab. | ab cümlenin en sonuna gider: Ich sage leider ab. | GEÇTİ | Örnek başka cümle ama ekrandaki absagen'de de ab en sonda; çelişki görmedim. |
| 13 | `ch:arbeit:bescheid-geben` | `use_tr` | Hemen karar veremeyince ne zaman haber vereceğini söylerken kullanırsın. | Hemen karar veremezsem ne zamana kadar haber vereceğimi söylerim. | GEÇTİ |  |
| 14 | `ch:arbeit:bescheid-geben` | `mistakes_tr[0]` | Ich gebe Ihnen Bescheid denir. Ich gebe Sie Bescheid denmez. | Ich gebe Ihnen Bescheid doğru, Ich gebe Sie Bescheid yanlış. | GEÇTİ |  |
| 15 | `ch:arbeit:wann-war-das` | `use_tr` | Biri tarihi hızlı söyleyince bir daha duymak için sorarsın. | Biri tarihi hızlı söylediyse bir daha sorarım. | GEÇTİ |  |
| 16 | `ch:arbeit:wann-war-das` | `mistakes_tr[0]` | Buradaki war geçmişi anlatmaz. Ne zaman demiştiniz anlamı katar. | Buradaki war olmuş bitmiş bir şeyi anlatmıyor; ne zaman demiştiniz diye soruyorum. | GEÇTİ |  |
| 17 | `ch:arbeit:was-heisst-wichteln` | `use_tr` | Bilmediğin bir kelimeyi ya da geleneği sorarken kullanırsın. | Bilmediğim bir kelimeyi ya da geleneği sorarken. | GEÇTİ |  |
| 18 | `ch:arbeit:was-heisst-wichteln` | `mistakes_tr[0]` | Wichteln'de herkes gizlice bir isim çeker. Çektiği kişiye küçük bir hediye alır. | Wichteln'de herkes gizlice bir isim çeker ve o kişiye küçük bir hediye alır. | GEÇTİ | Hata değil, anlam notu; ama ekrandaki ifadedeki Wichteln kelimesini anlatıyor. |
| 19 | `ch:arbeit:was-machst-du` | `use_tr` | Aralık'ta molada sohbet açmak için en sık sorulan soru. | Aralık'ta molada sohbet açmak için sorulan soru. | GEÇTİ |  |
| 20 | `ch:arbeit:was-machst-du` | `mistakes_tr[0]` | Şefe Was machen Sie, iş arkadaşına Was machst du diye sorarsın. | Şefe Was machen Sie, iş arkadaşına Was machst du derim. | GEÇTİ |  |
| 21 | `ch:arbeit:was-machst-du` | `mistakes_tr[1]` | Bavyera'da an Weihnachten denir. Kuzeyde zu Weihnachten de duyarsın. | Bavyera'da an Weihnachten derler; kuzeyde zu Weihnachten da duyarım. | GEÇTİ |  |
| 22 | `ch:arbeit:an-weihnachten` | `use_tr` | Noel planını tek cümleyle anlatırken söylersin. | Noel planımı tek cümleyle anlatırken söylerim. | GEÇTİ |  |
| 23 | `ch:arbeit:an-weihnachten` | `mistakes_tr[0]` | An Weihnachten başta olunca fahre hemen ardından gelir: An Weihnachten fahre ich. | An Weihnachten başta ise hemen arkasından fahre gelir. | GEÇTİ |  |
| 24 | `ch:arbeit:an-weihnachten` | `mistakes_tr[1]` | Heim gündelik dilde eve ya da memlekete demektir. | Heim günlük konuşmada eve ya da memlekete demek. | GEÇTİ | heim, kartın Alltag katmanındaki cümlede (Ich fahr heim zu meiner Familie) görünüyor. |
| 25 | `ch:arbeit:ich-bin-name` | `use_tr` | Biri sana du demeyi önerince kabul edip adını söylersin. | Biri du diyelim derse kabul edip adımı söylerim. | GEÇTİ |  |
| 26 | `ch:arbeit:ich-bin-name` | `mistakes_tr[0]` | İş yerinde du demeyi şef önerir. Sen şefe önermezsin. | İşte du diyelim teklifini şef yapar, ben şefe yapmam. | GEÇTİ | İfadeyle bağlantılı: teklif karşıdan gelir, ben kabul ederim. |
| 27 | `ch:arbeit:ich-bin-name` | `mistakes_tr[1]` | Kutlamada önerilen du ertesi gün belirsizse önce Sie ile başla. | (İkinci okumada) Partide du dedik ama ertesi gün hâlâ geçerli mi bilmiyorsam önce Sie derim. | **GERİ** | Tek okumada anlamadım: neyin belirsiz olduğu belli değil (du mu, ertesi gün mü?). du kelimesi Türkçe cümlenin ortasında duruyor, nereden bölüneceği belli değil. |
| 28 | `ch:arbeit:namen-gezogen` | `use_tr` | Wichteln'de isim çektiğini söylerken kullanırsın. Kimi çektiğini söylemezsin. | Wichteln'de isim çektim derken söylerim; kimi çektiğimi söylemem. | GEÇTİ |  |
| 29 | `ch:arbeit:namen-gezogen` | `mistakes_tr[0]` | Ziehen geçmişte gezogen olur, gezieht değil. | ziehen olmuş bir şeyi anlatırken gezogen olur, gezieht olmaz. | GEÇTİ |  |
| 30 | `ch:arbeit:geschenk-gekauft` | `use_tr` | Wichteln öncesinde molada iş arkadaşına sorabileceğin bir soru. | Wichteln'den önce molada iş arkadaşıma sorabileceğim soru. | GEÇTİ |  |
| 31 | `ch:arbeit:geschenk-gekauft` | `mistakes_tr[0]` | Haste hızlı konuşmada Hast du demektir. | Haste hızlı konuşmada Hast du demek. | GEÇTİ | Haste, kartın Alltag katmanında görünüyor. |
| 32 | `d02` | `why_tr` | Bescheid geben haber vermek demektir. | Bescheid geben haber vermek demek. | GEÇTİ |  |
| 33 | `d04` | `why_tr` | Du ile machst, Sie ile machen dersin. | du ile machst, Sie ile machen derim. | GEÇTİ |  |
| 34 | `d05` | `why_tr` | Ziehen geçmişte gezogen olur. | ziehen olmuş bir şeyi anlatırken gezogen olur. | GEÇTİ |  |
| 35 | `d08` | `why_tr` | Soruda hast başta durur, gekauft en sona gider. | Soruda hast en başta, gekauft en sonda. | GEÇTİ |  |
| 36 | `d09` | `situation_tr` | Herr Wimmer seni Weihnachtsfeier'e davet ediyor. Teşekkür et ve geleceğini söyle. | Herr Wimmer kutlamaya çağırıyor; teşekkür edip geleceğimi söyleyeceğim. | GEÇTİ |  |
| 37 | `d10` | `situation_tr` | Tobi Wichteln'e katılıp katılmadığını soruyor. Wichteln'in ne olduğunu bilmiyorsun. | Tobi Wichteln'e katılıyor musun diye soruyor; ben Wichteln'i bilmiyorum. Ne yapacağım? | **GERİ** | Ne yapmam gerektiği yazmıyor. Soru katılıyor musun; evet ya da hayır demeye kalkabilirim, oysa beklenen Wichteln ne demek diye sormam. |
| 38 | `d11` | `situation_tr` | Derya Noel planını soruyor. Burada kaldığını söyle ve ona da sor. | Derya Noel planımı soruyor; burada kalıyorum deyip ona da soracağım. | GEÇTİ |  |
| 39 | `d12` | `situation_tr` | Şefin kutlamada du demeyi öneriyor. Kabul et ve adını söyle. | Şef partide du diyelim diyor; kabul edip adımı söyleyeceğim. | GEÇTİ |  |
| 40 | `d17` | `instr_tr` | Aynı soruyu iş arkadaşına sor: Sie yerine du kullan. | Aynı soruyu iş arkadaşına Sie yerine du ile soracağım. | GEÇTİ |  |
| 41 | `d18` | `instr_tr` | Cümleyi geçmişte olmuş gibi söyle. Örnek: Ich kaufe yerine Ich habe gekauft. | Cümleyi olmuş bitmiş gibi söyleyeceğim, örnekteki gibi habe ile. | GEÇTİ |  |
| 42 | `d19` | `situation_tr` | Saati kaçırdın. Bir daha sor. | Saati kaçırdım, bir daha soracağım. | GEÇTİ |  |
| 43 | `d20` | `situation_tr` | Geleceğini hemen söyle. | Çarşambayı beklemeden hemen geliyorum diyeceğim. | GEÇTİ |  |
| 44 | `d21` | `why_tr` | İş yerinde du demeyi rütbesi yüksek olan önerir, yaşı büyük olan değil. | du teklifini yaşça büyük olan değil, işte üstte olan yapar. | GEÇTİ |  |
| 45 | `d22` | `why_tr` | Wichteln gizli bir hediye çekilişidir. | Wichteln gizli bir hediye çekilişi. | GEÇTİ |  |
| 46 | `v1#1` | `hint_tr` | Evet de, vaktin olduğunu söyle. | Evet deyip vaktim var diyeceğim. | GEÇTİ |  |
| 47 | `v1#3` | `hint_tr` | Çok hızlıydı. Tarihi bir daha sor. | Çok hızlıydı, tarihi bir daha soracağım. | GEÇTİ |  |
| 48 | `v1#5` | `hint_tr` | Saati tekrar ederek doğrula. Teşekkür et ve geleceğini söyle. | Saati tekrar edip teşekkür edecek, geleceğimi söyleyeceğim. | GEÇTİ |  |
| 49 | `v1#7` | `hint_tr` | Yapacağını söyle. Wichteln'in ne olduğunu sor. | Listeye yazılırım deyip Wichteln ne demek diye soracağım. | GEÇTİ |  |
| 50 | `v1#9` | `hint_tr` | Ona soracağını söyle ve teşekkür et. | Ona sorarım deyip teşekkür edeceğim. | GEÇTİ |  |
| 51 | `v2#1` | `hint_tr` | Wichteln'in ne olduğunu sor. | Wichteln ne diye soracağım. | GEÇTİ |  |
| 52 | `v2#3` | `hint_tr` | Anladığını kontrol et: hediyenin kimden olduğu gizli mi? | Doğru anladım mı diye soracağım: hediyenin kimden geldiği gizli mi? | GEÇTİ |  |
| 53 | `v2#5` | `hint_tr` | Katıldığını söyle. Listeye adını yazacağını ekle. | Varım deyip listeye adımı yazacağımı söyleyeceğim. | GEÇTİ |  |
| 54 | `v2#7` | `hint_tr` | Planını bir cümleyle söyle ve aynı soruyu geri sor. | Planımı bir cümleyle söyleyip aynı soruyu ona soracağım. | GEÇTİ |  |
| 55 | `v2#9` | `hint_tr` | Beğendiğini söyle ve aynı soruyu Derya'ya sor. | Güzelmiş deyip aynı soruyu Derya'ya soracağım. | GEÇTİ |  |
| 56 | `v3#1` | `hint_tr` | Beğendiğini söyle ve yemeği öv. | Beğendiğimi söyleyip yemeği öveceğim. | GEÇTİ |  |
| 57 | `v3#3` | `hint_tr` | Kabul et ve adını söyle. | Kabul edip adımı söyleyeceğim. | GEÇTİ |  |
| 58 | `v3#5` | `hint_tr` | Planını söyle. Şefe artık du ile ve adıyla geri sor. | Planımı söyleyip şefe adıyla ve du ile aynı soruyu soracağım. | GEÇTİ |  |
| 59 | `v3#7` | `hint_tr` | Beğendiğini söyle ve iyi tatiller dile. | Güzel deyip iyi tatiller dileyeceğim. | GEÇTİ |  |
| 60 | `v3#9` | `hint_tr` | Şakayla cevap ver: ne zamandan beri? | Şakayla ne zamandan beri diye mi soracağım, yoksa ne zamandan beri olduğunu mu söyleyeceğim? | **GERİ** | İki türlü okunuyor: iki noktadan sonraki soru, söylemem gereken cümle gibi duruyor. Ne söyleyeceğimi tek okumada anlamadım. |
| 61 | `roleplay` | `scene_tr` | Weihnachtsfeier akşamı lokantadasın. Derya yanında oturuyor. Wichteln'i sor, Noel planını anlat ve ona da sor. Şef gelirse ona Sie de. Du demeyi önerirse du ile devam et. | Kutlama akşamı lokantadayım, Derya yanımda. Wichteln'i sorup planımı anlatıp ona soracağım; şefe Sie, o du derse du. | GEÇTİ |  |
| 62 | `speaking[0]` | `task_tr` | Şefin davetine Sie ile cevap ver. Tarihi bir daha sor, sonra teşekkür edip geleceğini söyle. | Şefin davetine Sie ile cevap verip tarihi tekrar soracak, teşekkür edip geleceğimi söyleyeceğim. | GEÇTİ |  |
| 63 | `speaking[1]` | `task_tr` | Molada bir iş arkadaşına Noel planını sor. Kendi planını da bir cümleyle anlat. | Molada bir iş arkadaşıma Noel planını sorup kendi planımı bir cümleyle anlatacağım. | GEÇTİ |  |
| 64 | `missions/m1` | `task_tr` | Molada birine şunu sor: Und, was machst du an Weihnachten? Kendi planını da bir cümleyle söyle. İş yerinde Wichteln ya da kutlama varsa ne zaman olduğunu sor. | Gerçekte birine Noel'de ne yapıyorsun diye soracağım, kendi planımı söyleyeceğim; işte kutlama varsa ne zaman diye soracağım. | GEÇTİ |  |

## Toplam

- Toplam: **64** · GEÇTİ: **60** · GERİ: **4**
- GERİ kimlikleri:
  - #4 `scenario` · `mistakes_tr[2]`
  - #27 `ch:arbeit:ich-bin-name` · `mistakes_tr[1]`
  - #37 `d10` · `situation_tr`
  - #60 `v3#9` · `hint_tr`

Bu dosyada GERİ olduğu için dosya "reviewed" sayılamaz (OD-9.4).

## Gözlemler (karar dışı, düzeltme önerisi değil)

1. `scenario mistakes_tr[2]` ile `ch:arbeit:ich-bin-name mistakes_tr[1]` aynı metin; ikisi de aynı nedenle GERİ.

## Kapsam dışı kalan Türkçe alanlar

Görev listesinde olmadığı için okunmadı: alıştırma `q_tr`, `build[].prompt_tr`, dinleme `qs[].q_tr` ve `title_tr`, diyalog `title_tr`, rol oyunu `goals[].tr` ve `surprises[].tr`. Bunlar da öğrenciye görünüyor; istenirse ayrı turda okunur.

---

## Tur 2 (2026-11-18)

Kapsam: (a) dilbilimcinin düzelttiği birinci tur GERİ maddeleri ve baş geliştiricinin adını verdiği yeni ya da değişen alanlar; (b) birinci turda okunmayan öğrenciye görünen alanların hepsi: alıştırma `q_tr` ve Türkçe şıklar (`opts`), `build[].prompt_tr`, dinleme `title_tr`, `qs[].q_tr` ve Türkçe şıklar, diyalog `title_tr`, rol oyunu `goals[].tr` ve `surprises[].tr`. Aynı kimlik, aynı ölçütler (OD-9.2). Karar her satır için elle verildi.

Birinci tur metinleri ile bugünkü dosya karşılaştırıldı: değişen maddeler yalnızca baş geliştiricinin bildirdikleri. Birinci tur tablosundaki açıklama sütunu eski metni gösterir; güncel metin aşağıda.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `scenario` (düzeltme) | `mistakes_tr[2]` | Şef kutlamada senli benli konuşmayı önerdiyse ertesi gün yine Sie ile başla. | Şef partide du diyelim dediyse, ertesi gün yine Sie ile başlarım. | GEÇTİ | Tek okumada anlaşıldı. Ama birinci turdaki belirsizse koşulu kalkmış; bakınız Tur 2 gözlem 1. |
| 2 | `ch:arbeit:ich-bin-name` (düzeltme) | `mistakes_tr[1]` | Şef kutlamada senli benli konuşmayı önerdiyse ertesi gün yine Sie ile başla. | Şef partide du diyelim dediyse, ertesi gün yine Sie ile başlarım. | GEÇTİ | Aynı metin; bakınız Tur 2 gözlem 1. |
| 3 | `d10` (düzeltme) | `situation_tr` | Tobi Wichteln'e katılıp katılmadığını soruyor. Bu kelimeyi bilmiyorsun. Ne demek olduğunu sor. | Tobi Wichteln'e katılıyor musun diyor; kelimeyi bilmiyorum, ne demek diye soracağım. | GEÇTİ | Ne yapacağım artık yazıyor. |
| 4 | `v3#9` (düzeltme) | `hint_tr` | Evet de. Şakayla, yalnızca beş dakikadır böyle olduğunu ekle. | Evet deyip şakayla daha beş dakikadır böyle diyeceğim. | GEÇTİ | Artık tek türlü okunuyor. |
| 5 | `d21` | `q_tr` | İş yerinde du demeyi genellikle kim önerir? | İşte du diyelim teklifini genelde kim yapar? | GEÇTİ |  |
| 6 | `d21` | `opts` | Yaşı küçük olan · Yeni başlayan çalışan · Rütbesi yüksek olan, örneğin şef | Yaşça küçük olan, yeni başlayan, şef gibi üstte olan. | GEÇTİ |  |
| 7 | `d22` | `q_tr` | Wichteln nedir? | Wichteln ne? | GEÇTİ |  |
| 8 | `d22` | `opts` | Noel yemeği · Herkesin gizlice çektiği kişiye küçük bir hediye alması · Şefin yıl sonu konuşması | Noel yemeği, gizlice çektiğin kişiye küçük hediye, şefin yıl sonu konuşması. | GEÇTİ |  |
| 9 | `b01` | `prompt_tr` | Davetiniz için çok teşekkürler, memnuniyetle gelirim. (şefe, Sie ile) | Şefe Sie ile davet için teşekkür edip memnuniyetle gelirim diyeceğim. | GEÇTİ |  |
| 10 | `b02` | `prompt_tr` | Maalesef katılamayacağım. | Maalesef katılamayacağım diyeceğim. | GEÇTİ |  |
| 11 | `b03` | `prompt_tr` | Çarşambaya kadar size haber veririm. | Çarşambaya kadar size haber veririm diyeceğim. | GEÇTİ |  |
| 12 | `b04` | `prompt_tr` | Ne zaman demiştiniz? (bir daha sor) | Ne zaman demiştiniz diye bir daha soracağım. | GEÇTİ |  |
| 13 | `b05` | `prompt_tr` | Nerede demiştiniz? (bir daha sor) | Nerede demiştiniz diye bir daha soracağım. | GEÇTİ |  |
| 14 | `b06` | `prompt_tr` | Wichteln ne demek? | Wichteln ne demek diye soracağım. | GEÇTİ |  |
| 15 | `b07` | `prompt_tr` | 18:30'dan itibaren mi? (halb ile sor) | 18:30'dan itibaren mi diye halb ile soracağım. | GEÇTİ |  |
| 16 | `b08` | `prompt_tr` | 18 Aralık cuma, saat yedide. | 18 Aralık cuma, saat yedide diyeceğim. | GEÇTİ |  |
| 17 | `b09` | `prompt_tr` | Katılacağımı zaten bildirdim. | Geleceğimi zaten söyledim diyeceğim. | GEÇTİ | Kabul edilen cevaplar arasında Ich habe schon Bescheid gegeben de var; bu dersin parçalarıyla kurulabiliyor. |
| 18 | `b10` | `prompt_tr` | Ben bir isim çektim bile. | Ben şimdiden bir isim çektim diyeceğim. | GEÇTİ |  |
| 19 | `b11` | `prompt_tr` | Hediyeyi aldın mı bile? (du ile) | Hediyeyi şimdiden aldın mı diye du ile soracağım. | GEÇTİ | aldın mı bile biraz tuhaf Türkçe ama anlaşılıyor. |
| 20 | `b12` | `prompt_tr` | Eee, Noel'de ne yapıyorsun? (du ile) | Eee, Noel'de ne yapıyorsun diye du ile soracağım. | GEÇTİ |  |
| 21 | `b13` | `prompt_tr` | Noel'de ne yapıyorsunuz? (şefe, Sie ile) | Şefe Sie ile Noel'de ne yapıyorsunuz diye soracağım. | GEÇTİ |  |
| 22 | `b14` | `prompt_tr` | Noel'de ailemin yanına gidiyorum. | Noel'de ailemin yanına gidiyorum diyeceğim. | GEÇTİ |  |
| 23 | `b15` | `prompt_tr` | Noel'de burada kalıyorum. | Noel'de burada kalıyorum diyeceğim. | GEÇTİ |  |
| 24 | `b16` | `prompt_tr` | Memnuniyetle! Ben de {name}. (şef du demeyi önerdi) | Şef du diyelim dedi; memnuniyetle, ben de {name} diyeceğim. | GEÇTİ |  |
| 25 | `h1` | `title_tr` | Herr Wimmer'in kısa konuşması | Herr Wimmer'in kısa konuşması. | GEÇTİ |  |
| 26 | `h1.qs[0]` | `q_tr` | Konuşmanın amacı ne? | Konuşma ne için? | GEÇTİ |  |
| 27 | `h1.qs[0]` | `opts` | Yeni bir projeyi anlatmak · Teşekkür etmek ve akşamın planını söylemek · Toplantı tarihini değiştirmek | Yeni proje, teşekkür ve akşamın planı, toplantı tarihi. | GEÇTİ |  |
| 28 | `h1.qs[1]` | `q_tr` | Yemeği kim ödüyor? | Yemeği kim ödüyor? | GEÇTİ |  |
| 29 | `h1.qs[1]` | `opts` | Herkes kendisi · Herr Lechner · Firma | Herkes kendi, Herr Lechner, firma. | GEÇTİ |  |
| 30 | `h1.qs[2]` | `q_tr` | Wichteln ne zaman? | Wichteln ne zaman? | GEÇTİ |  |
| 31 | `h1.qs[2]` | `opts` | Yemekten sonra · Yemekten önce · Ertesi gün ofiste | Yemekten sonra, yemekten önce, ertesi gün ofiste. | GEÇTİ |  |
| 32 | `h2` | `title_tr` | Molada Noel planları (hızlı) | Molada hızlı Noel planları sohbeti. | GEÇTİ |  |
| 33 | `h2.qs[0]` | `q_tr` | Ne hakkında konuşuyorlar? | Ne konuşuyorlar? | GEÇTİ |  |
| 34 | `h2.qs[0]` | `opts` | Noel planları · Wichteln hediyeleri · Yemek siparişi | Noel planları, Wichteln hediyeleri, yemek siparişi. | GEÇTİ |  |
| 35 | `h2.qs[1]` | `q_tr` | Tobi Noel'de ne yapıyor? | Tobi Noel'de ne yapıyor? | GEÇTİ |  |
| 36 | `h2.qs[1]` | `opts` | Derya'nın ailesine gidiyor · Evde kalıp çalışıyor · Dağa, kayağa gidiyor | Derya'nın ailesine gidiyor, evde çalışıyor, dağa kayağa gidiyor. | GEÇTİ |  |
| 37 | `h2.qs[2]` | `q_tr` | Tobi Noel ile yılbaşı arasında çalışıyor mu? | Tobi Noel ile yılbaşı arasında çalışıyor mu? | GEÇTİ |  |
| 38 | `h2.qs[2]` | `opts` | Evet, her gün · Hayır, izinli · Yalnızca bir gün | Evet her gün, hayır izinli, sadece bir gün. | GEÇTİ |  |
| 39 | `v1` | `title_tr` | Şefin daveti | Şefin daveti. | GEÇTİ |  |
| 40 | `v2` | `title_tr` | Molada Wichteln ve Noel planları | Molada Wichteln ve Noel planları. | GEÇTİ |  |
| 41 | `v3` | `title_tr` | Kutlamada şef du demeyi öneriyor | Kutlamada şef du diyelim diyor. | GEÇTİ |  |
| 42 | `roleplay.goals/g1` | `tr` | Wichteln'i anladın ya da ne olduğunu sordun. | Wichteln'i anladım ya da ne olduğunu sordum. | GEÇTİ |  |
| 43 | `roleplay.goals/g2` | `tr` | Noel planını sordun ve kendi planını bir cümleyle söyledin. | Noel planını sordum ve kendi planımı bir cümleyle söyledim. | GEÇTİ | İki adım ama tek konu: Noel planı sohbeti. |
| 44 | `roleplay.goals/g3` | `tr` | Hitabın doğru: Derya'ya du, şefe Sie dedin. | Derya'ya du, şefe Sie dedim; o zaman doğru. | **GERİ** | Sahne metniyle çelişiyor: sahne şef du derse du ile devam et diyor, sürpriz de şefin du önereceğini söylüyor. Bu hedefi okuyunca şefe hep Sie demem gerektiğini anladım; du'ya geçersem hedefi kaçırdım mı bilemedim. |
| 45 | `roleplay.surprises[0]` | `tr` | Bak, şef buraya geliyor. Kesin sana du demeyi önerecek. | Tobi şef geliyor, sana kesin du diyelim diyecek diyor. | GEÇTİ |  |
| 46 | `roleplay.surprises[1]` | `tr` | Bil bakalım Wichteln'de kimi çektim! | Bil bakalım Wichteln'de kimi çektim diyor. | GEÇTİ |  |
| 47 | `roleplay.surprises[2]` | `tr` | Peki Noel ile yılbaşı arası, çalışıyor musun? | Noel ile yılbaşı arası çalışıyor musun diye soruyor. | GEÇTİ |  |
| 48 | `roleplay.surprises[3]` | `tr` | Tobi senin adını çektiğini söylüyor – şaka! | Tobi senin adını çekmiş, diyor, sonra şaka diyor. | GEÇTİ |  |

### Tur 2 toplam

- Düzeltilen ya da yeni maddeler: 4 · yeni okunan alanlar: 44
- Toplam: **48** · GEÇTİ: **47** · GERİ: **1**
- GERİ kimlikleri:
  - #44 `roleplay.goals/g3` · `tr`

Birinci turun GERİ maddelerinin hepsi bu turda GEÇTİ.
Tur 2'de yeni GERİ olduğu için dosya hâlâ "reviewed" sayılamaz (OD-9.4).

### Tur 2 gözlemleri (karar dışı, düzeltme önerisi değil)

1. `scenario mistakes_tr[2]` ve `ch:arbeit:ich-bin-name mistakes_tr[1]`: Birinci turdaki metinde belirsizse koşulu vardı (dilbilimci raporu bunu kaynaklı kural olarak anıyor). Yeni metin koşulu kaldırıp kuralı kesin yapmış: şef du önerdiyse ertesi gün her zaman Sie. Okur olarak tek okumada anladım, GEÇTİ. Ama anlam daralmış; kaynakla örtüştüğünü dilbilimci teyit etmeli.

---

## Tur 3 (2026-11-18)

Bugünkü dosya Tur 1 ve Tur 2 tablolarıyla karşılaştırıldı: öğrenciye görünen alanlarda daha önce okunmamış metin yalnızca aşağıdaki madde. Aynı kimlik, aynı ölçütler.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `roleplay.goals/g3` (düzeltme) | `tr` | Derya'ya du dedin. Şefe, o du demeyi önerene kadar Sie dedin. | Derya'ya du dedim. Şefe, kendisi du diyelim diyene kadar Sie dedim; sonra du. | GEÇTİ | Tur 2 GERİ'si kapandı: artık sahne metniyle (şef du önerirse du ile devam et) örtüşüyor. İki cümle ama tek konu: kime nasıl hitap ettiğin. |

### Tur 3 toplam

- Toplam: **1** · GEÇTİ: **1** · GERİ: **0**

### Dosyanın son durumu (okur açısından)

- Tur 1 GERİ'ler: `scenario` `mistakes_tr[2]`, `ch:arbeit:ich-bin-name` `mistakes_tr[1]`, `d10` `situation_tr`, `v3#9` `hint_tr` → Tur 2'de GEÇTİ.
- Tur 2 GERİ: `roleplay.goals/g3` `tr` → Tur 3'te GEÇTİ.

Açık GERİ yok (OD-9.4 okur koşulu sağlandı).
