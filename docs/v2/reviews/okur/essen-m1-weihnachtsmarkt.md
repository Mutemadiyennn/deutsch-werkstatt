# Okur kontrolü — `content/v2/domains/essen/scenarios/m1-weihnachtsmarkt.json`

Tarih: 2026-11-17 · Rol: okur (OD-9.3, PM-017) · Kontrol eden: QA ajanı, okur kimliğiyle (yalnızca Türkçe, Almanca A2, dilbilgisi terimi bilmez)

Kapsam: öğrenciye görünen bütün Türkçe açıklamalar, örneklem değil hepsi — `goal_tr`, senaryo `mistakes_tr`, ifade `use_tr` ve `mistakes_tr`, Bairisch `note_tr`, alıştırma `instr_tr` / `situation_tr` / `hint_tr` / `why_tr`, diyalog satırı `hint_tr`, rol oyunu `scene_tr`, konuşma ve görev `task_tr`. Almanca alanlar (`de`, `accepted`, `hints_de`, `starter`, `opts`) atlandı.

Ölçüt (OD-9.2): bir alan bir fikir · cümle ≤ 14 kelime · `=`, `;`, `…` ve tırnak içinde Almanca yok · öğretilmemiş dilbilgisi terimi yok · açıklama ekrandaki ifadenin kendisini anlatır · tek okumada anlaşılır.

Kimlik biçimi: `v1#3` = diyalog `v1`, satır sırası 3 (0'dan sayılır). Kelime sayısı ve sembol kontrolü ayrıca betikle yapıldı: en uzun cümle 13 kelime, yasak sembol yok. Karar her satır için tek tek, elle verildi.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `scenario` | `goal_tr` | Weihnachtsmarkt'ta bir stanttan içecek ve yiyecek sipariş edersin. Fiyatı sorar, bardak depozitosunu anlar ve ödemeyi halledersin. | Noel pazarında bir standdan yiyecek ve içecek alacağım. Fiyatı sorup bardak parasını anlayıp ödeyeceğim. | GEÇTİ |  |
| 2 | `scenario` | `mistakes_tr[0]` | Glühwein ve Kinderpunsch için einen, Bratwurst için eine dersin. | Glühwein ve Kinderpunsch isterken einen, Bratwurst isterken eine derim. | GEÇTİ |  |
| 3 | `scenario` | `mistakes_tr[1]` | Tek şey için kostet, birden fazla şey için kosten: Was kosten die Mandeln? | Tek bir şeyin fiyatını sorarken kostet, birkaç şeyinkini sorarken kosten derim. | GEÇTİ |  |
| 4 | `scenario` | `mistakes_tr[2]` | Pfand bahşiş ya da bardağın fiyatı değildir. Bardağı aynı standa geri verince paranı alırsın. | Pfand bahşiş de değil bardağın fiyatı da değil. Bardağı aynı standa verince param geri gelir. | GEÇTİ |  |
| 5 | `scenario` | `mistakes_tr[3]` | Bardağı saklamak istersen önce standa sor. O zaman depozito stantta kalır. | Bardağı yanıma almak istersem önce sorarım. O zaman bardak parasını geri almam. | GEÇTİ |  |
| 6 | `scenario` | `mistakes_tr[4]` | Her stant kart almaz. Yanında biraz nakit bulundur. | Her standda kart geçmez, yanımda biraz nakit olsun. | GEÇTİ |  |
| 7 | `scenario` | `mistakes_tr[5]` | Bar zahlen nakit ödemek demektir. İngilizcedeki bar kelimesiyle karıştırma. | Bar zahlen nakit ödemek demek. İçki barıyla ilgisi yok. | GEÇTİ | İngilizce anışı D-060 istisnası (mistakes_tr, yanlış arkadaş). Bar kelimesi Türkçede de var; anlamak için İngilizce gerekmedi. |
| 8 | `ch:essen:einen-gluehwein` | `use_tr` | Stantta bir Glühwein isterken söylediğin cümle. | Standda bir Glühwein isterken bunu söylerim. | GEÇTİ |  |
| 9 | `ch:essen:einen-gluehwein` | `mistakes_tr[0]` | Stantta einen Glühwein denir, ein Glühwein değil. | Glühwein isterken einen Glühwein derim, ein Glühwein demem. | GEÇTİ |  |
| 10 | `ch:essen:einen-gluehwein` | `mistakes_tr[1]` | İki bardak isterken zwei Glühwein demen yeter. | İki tane istersem zwei Glühwein demem yeterli. | GEÇTİ |  |
| 11 | `ch:essen:was-heisst-schuss` | `use_tr` | Satıcının sorusundaki bir kelimeyi anlamayınca böyle sorarsın. | Satıcının sorusunda bir kelimeyi anlamadım; ne demek diye sorarım. | GEÇTİ |  |
| 12 | `ch:essen:was-heisst-schuss` | `mistakes_tr[0]` | Soruda heißt hemen was kelimesinden sonra gelir: Was heißt das? | Soru sorarken was'tan hemen sonra heißt gelir. | GEÇTİ |  |
| 13 | `ch:essen:ohne-schuss` | `use_tr` | Satıcı Glühwein'e sert içki ekleyeyim mi diye sorunca istemiyorsan söylersin. | Satıcı Glühwein'e sert içki katayım mı diye soruyor; istemiyorsam bunu derim. | GEÇTİ |  |
| 14 | `ch:essen:ohne-schuss` | `mistakes_tr[0]` | Schuss burada bardağa eklenen biraz sert içkidir, çoğunlukla rom ya da amaretto. | Schuss, bardağa katılan biraz rom ya da amaretto. | GEÇTİ | Hata değil, anlam notu; ama ekrandaki Schuss kelimesini anlatıyor. |
| 15 | `ch:essen:was-kostet` | `use_tr` | Bir şeyin fiyatını sormanın en kısa yolu. | Bir şeyin fiyatını sormanın en kısa cümlesi. | GEÇTİ |  |
| 16 | `ch:essen:was-kostet` | `mistakes_tr[0]` | Tek şey için kostet, birden fazla şey için kosten: Was kosten die Mandeln? | Tek bir şeyin fiyatını sorarken kostet, birkaç şeyinkini sorarken kosten derim. | GEÇTİ |  |
| 17 | `ch:essen:was-macht-das` | `use_tr` | Siparişini bitirince toplam tutarı sorarken kullanırsın. | Siparişim bitince hepsi ne kadar tuttu diye sorarım. | GEÇTİ |  |
| 18 | `ch:essen:was-macht-das` | `mistakes_tr[0]` | Burada machen yapmak değil, tutmak demektir: Das macht neun Euro. | Burada machen yapmak değil, para tutmak anlamında. | GEÇTİ |  |
| 19 | `ch:essen:mit-karte` | `use_tr` | Kartla ödeyip ödeyemeyeceğini sorarken söylersin. | Kartla ödeyebilir miyim diye sorarken söylerim. | GEÇTİ |  |
| 20 | `ch:essen:mit-karte` | `mistakes_tr[0]` | Bar zahlen nakit ödemek demektir. İngilizcedeki bar kelimesiyle ilgisi yok. | Bar zahlen nakit ödemek demek, İngilizcedeki bar değil. | **GERİ** | Başka şeyi anlatıyor: ekrandaki ifade Geht es auch mit Karte?, içinde bar yok. Kartla ödemeyi soran bu kartın altında neden bar yazdığını anlamadım. |
| 21 | `ch:essen:tasse-zurueck` | `use_tr` | İçtikten sonra bardağı standa geri verirken söylersin. | Bardağı standa geri verirken söylerim. | GEÇTİ |  |
| 22 | `ch:essen:tasse-zurueck` | `mistakes_tr[0]` | Zurück cümlenin sonuna gider: Ich gebe die Tasse zurück. | zurück cümlenin en sonunda olur. | GEÇTİ |  |
| 23 | `ch:essen:tasse-zurueck` | `mistakes_tr[1]` | Möchte varsa zurückgeben bitişik yazılır ve sonda durur: Ich möchte die Tasse zurückgeben. | möchte varsa zurückgeben tek parça yazılır ve en sona gelir. | GEÇTİ |  |
| 24 | `ch:essen:pfand-zurueck` | `use_tr` | Bardağı geri verirken depozitonu istemek için sorarsın. | Bardağı verirken paramı geri alabilir miyim diye sorarım. | GEÇTİ |  |
| 25 | `ch:essen:pfand-zurueck` | `mistakes_tr[0]` | Doğrusu das Pfand, der Pfand değil. | Pfand'ın önünde das olur, der olmaz. | GEÇTİ |  |
| 26 | `ch:essen:stimmt-so` | `use_tr` | Para üstünü bahşiş olarak bırakmak istediğinde söylersin. | Para üstünü bahşiş olarak bırakırken söylerim. | GEÇTİ |  |
| 27 | `ch:essen:stimmt-so` | `mistakes_tr[0]` | Stantta bahşiş vermek zorunlu değildir. | Standda bahşiş vermek şart değil. | GEÇTİ |  |
| 28 | `d01` | `why_tr` | Kinderpunsch der ile söylenir. İsterken einen dersin: einen Kinderpunsch. | Kinderpunsch'un önünde der var; isterken einen Kinderpunsch derim. | GEÇTİ |  |
| 29 | `d02` | `why_tr` | Mandeln birden fazla şeydir, o yüzden kosten: Was kosten die Mandeln? | Bademler birden fazla, o yüzden kosten. | GEÇTİ |  |
| 30 | `d05` | `why_tr` | Bar zahlen nakit ödemek demektir. | bar zahlen nakit ödemek demek. | GEÇTİ |  |
| 31 | `d06` | `why_tr` | Möchte ikinci sırada durur, zurückgeben en sona gider. | möchte ikinci kelime olur, zurückgeben en sona gelir. | GEÇTİ |  |
| 32 | `d09` | `situation_tr` | Satıcı sert içki ekleyeyim mi diye soruyor. İstemiyorsun. | Satıcı sert içki katayım mı diyor, ben istemiyorum. | GEÇTİ |  |
| 33 | `d10` | `situation_tr` | Satıcı ne istediğini soruyor. Bir Kinderpunsch iste. | Satıcıya bir Kinderpunsch istediğimi söyleyeceğim. | GEÇTİ |  |
| 34 | `d11` | `situation_tr` | Satıcı yalnızca nakit aldığını söylüyor. Sorun olmadığını söyle, nakit öde. | Satıcı sadece nakit diyor; sorun yok deyip nakit ödeyeceğim. | GEÇTİ |  |
| 35 | `d16` | `instr_tr` | Ich möchte ile kibar bir sipariş cümlesi kur. | Eine Bratwurst'u Ich möchte ile kibar bir sipariş cümlesine çevireceğim. | GEÇTİ |  |
| 36 | `d17` | `situation_tr` | Pfand kelimesini bilmiyorsun. Ne olduğunu sor. | Pfand'ı bilmiyorum, ne demek diye soracağım. | GEÇTİ |  |
| 37 | `d18` | `situation_tr` | Bardağı nereye götürmen gerektiğini sor. | Bardağı nereye götüreceğimi soracağım. | GEÇTİ |  |
| 38 | `d19` | `why_tr` | Pfand depozitodur. Bardağı aynı standa geri verince paranı alırsın. | Pfand depozito; bardağı aldığım standa verince paramı alırım. | GEÇTİ |  |
| 39 | `d20` | `why_tr` | Erst ab, ancak şu tutardan itibaren demektir. | Erst ab: ancak o tutardan sonra, daha azında olmaz. | GEÇTİ |  |
| 40 | `v1#1` | `hint_tr` | Selam ver. İki Glühwein ve bir Kinderpunsch iste. | Selam verip iki Glühwein ve bir Kinderpunsch isteyeceğim. | GEÇTİ |  |
| 41 | `v1#3` | `hint_tr` | Anlamadığın kelimeyi tekrar et ve ne demek olduğunu sor. | Anlamadığım kelimeyi tekrar edip ne demek diye soracağım. | GEÇTİ |  |
| 42 | `v1#5` | `hint_tr` | İlave içki istemediğini söyle. | İçkiye ilave içki istemediğimi söyleyeceğim. | GEÇTİ |  |
| 43 | `v1#7` | `hint_tr` | Depozitonun bardaklar için mi olduğunu sor. | Bu depozito bardaklar için mi diye soracağım. | GEÇTİ |  |
| 44 | `v1#9` | `hint_tr` | Kartla ödeyip ödeyemeyeceğini sor. | Kartla olur mu diye soracağım. | GEÇTİ |  |
| 45 | `v1#11` | `hint_tr` | Nakit ödeyeceğini söyle ve 25 euro uzat. | Nakit ödeyeceğimi söyleyip 25 euro vereceğim. | GEÇTİ |  |
| 46 | `v1#13` | `hint_tr` | Teşekkür et ve aynı iyi dileği ona da söyle. | Teşekkür edip size de diyeceğim. | GEÇTİ |  |
| 47 | `v2#1` | `hint_tr` | Teşekkür edip reddet. Bardakları geri vermek istediğini söyle. | Hayır teşekkürler deyip bardakları geri vermek istediğimi söyleyeceğim. | GEÇTİ |  |
| 48 | `v2#3` | `hint_tr` | Diğer standın nerede olduğunu sor. | Öbür stand nerede diye soracağım. | GEÇTİ |  |
| 49 | `v2#5` | `hint_tr` | Bir bardağı hatıra olarak saklayıp saklayamayacağını sor. | Bir bardağı hatıra olarak alabilir miyim diye soracağım. | GEÇTİ |  |
| 50 | `v2#7` | `hint_tr` | Kaç euro geri alacağını doğrula. | Kaç euro geri alacağımı sorup emin olacağım. | GEÇTİ |  |
| 51 | `v2#9` | `hint_tr` | Teşekkür et ve iyi akşamlar dile. | Teşekkür edip iyi akşamlar diyeceğim. | GEÇTİ |  |
| 52 | `v3#1` | `hint_tr` | Hardallı bir Bratwurst iste. | Hardallı bir Bratwurst isteyeceğim. | GEÇTİ |  |
| 53 | `v3#3` | `hint_tr` | Evet de ve bademlerin fiyatını sor. | Evet deyip bademler kaç para diye soracağım. | GEÇTİ |  |
| 54 | `v3#5` | `hint_tr` | Küçük paketi seç ve toplamı sor. | Küçük paketi alıp toplam ne kadar diye soracağım. | GEÇTİ |  |
| 55 | `v3#7` | `hint_tr` | Kartla ödeyip ödeyemeyeceğini sor. | Kartla olur mu diye soracağım. | GEÇTİ |  |
| 56 | `v3#9` | `hint_tr` | Nakit ödeyeceğini söyle, 10 euro ver ve üstü kalsın de. | Nakit ödeyeceğimi söyleyip 10 euro vereceğim, üstü kalsın diyeceğim. | GEÇTİ | Üç adım var ama hepsi bu sıradaki tek cevabın parçası. |
| 57 | `roleplay` | `scene_tr` | İş çıkışı Tobi ve Derya ile Weihnachtsmarkt'tasın. Üç kişi için içecek sipariş et. Fiyatı sor ve ödemeyi hallet. | İşten sonra Tobi ve Derya ile Noel pazarındayım. Üçümüze içecek alıp fiyatı sorup ödeyeceğim. | GEÇTİ |  |
| 58 | `speaking[0]` | `task_tr` | Glühwein standında üç kişi için sipariş ver. İlave içki isteme ve toplamı sor. | Üç kişilik sipariş vereceğim, ilave içki istemeyeceğim, toplamı soracağım. | GEÇTİ |  |
| 59 | `speaking[1]` | `task_tr` | Pfand'ın ne olduğunu bir arkadaşına iki Almanca cümleyle anlat. | Bir arkadaşıma Pfand'ı iki Almanca cümleyle anlatacağım. | GEÇTİ |  |
| 60 | `missions/m1` | `task_tr` | Bir stantta, fırında ya da kafede bir şey sipariş et ve fiyatını sor. Kart geçiyor mu, onu da sor. Bardak depozitoluysa geri ver ve paranı al. | Gerçek bir yerde bir şey alıp fiyatını ve kart geçip geçmediğini soracağım. Depozitolu bardaksa geri verip paramı alacağım. | GEÇTİ |  |

## Toplam

- Toplam: **60** · GEÇTİ: **59** · GERİ: **1**
- GERİ kimlikleri:
  - #20 `ch:essen:mit-karte` · `mistakes_tr[0]`

Bu dosyada GERİ olduğu için dosya "reviewed" sayılamaz (OD-9.4).

## Gözlemler (karar dışı, düzeltme önerisi değil)

1. `speaking[1]` görevi Pfand'ı iki Almanca cümleyle anlatmamı istiyor. Açıklama anlaşılır (GEÇTİ). Ama örnek cevaptaki `Wenn du die Tasse zurückbringst, …` gibi bir cümleyi bu dersteki kartlardan kuramazdım; bu, okur ölçütü değil, LS-16.3 bilgi kısıtlı oyuncu gözlemi.

## Kapsam dışı kalan Türkçe alanlar

Görev listesinde olmadığı için okunmadı: alıştırma `q_tr`, `build[].prompt_tr`, dinleme `qs[].q_tr` ve `title_tr`, diyalog `title_tr`, rol oyunu `goals[].tr` ve `surprises[].tr`. Bunlar da öğrenciye görünüyor; istenirse ayrı turda okunur.

---

## Tur 2 (2026-11-18)

Kapsam: (a) dilbilimcinin düzelttiği birinci tur GERİ maddeleri ve baş geliştiricinin adını verdiği yeni ya da değişen alanlar; (b) birinci turda okunmayan öğrenciye görünen alanların hepsi: alıştırma `q_tr` ve Türkçe şıklar (`opts`), `build[].prompt_tr`, dinleme `title_tr`, `qs[].q_tr` ve Türkçe şıklar, diyalog `title_tr`, rol oyunu `goals[].tr` ve `surprises[].tr`. Aynı kimlik, aynı ölçütler (OD-9.2). Karar her satır için elle verildi.

Birinci tur metinleri ile bugünkü dosya karşılaştırıldı: değişen maddeler yalnızca baş geliştiricinin bildirdikleri. Birinci tur tablosundaki açıklama sütunu eski metni gösterir; güncel metin aşağıda.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `ch:essen:mit-karte` (düzeltme) | `mistakes_tr[0]` | Burada Karte banka kartıdır. Aynı kelime lokantada menü anlamına da gelir. | Burada Karte ödeme kartı demek. Lokantada aynı kelime menü demek. | GEÇTİ | Ekrandaki ifadedeki Karte kelimesini anlatıyor; iki cümle aynı kelimenin iki anlamı, tek fikir. |
| 2 | `speaking[1]` (düzeltme) | `task_tr` | Pfand'ın ne olduğunu bir arkadaşına iki Almanca cümleyle anlat. | Bir arkadaşıma Pfand'ı iki Almanca cümleyle anlatacağım. | GEÇTİ | OD-7: örnek cevap (Das Pfand ist drei Euro. Ich gebe die Tasse zurück und bekomme das Pfand zurück.) bu dersin parçalarıyla kurulabiliyor: das Pfand ve zurück bekommen pfand-zurueck kartından, Ich gebe die Tasse zurück tasse-zurueck kartının uyarısından, drei Euro diyalogdan. Başlangıç ipuçları da bu iki cümleyi veriyor. |
| 3 | `d19` | `q_tr` | Pfand nedir? | Pfand ne demek? | GEÇTİ |  |
| 4 | `d19` | `opts` | Bahşiş · İçeceğe eklenen alkol · Bardağı geri verince geri aldığın para · Bardağın satış fiyatı | Bahşiş, içkiye katılan alkol, bardağı geri verince geri aldığım para, bardağın fiyatı. | GEÇTİ | Doğru şık açık; yanlış şıklar da anlaşılır. |
| 5 | `d20` | `q_tr` | Satıcı Karte geht erst ab zehn Euro diyor. Ne demek? | Satıcı kart ancak on eurodan sonra diyor; bu ne demek? | GEÇTİ |  |
| 6 | `d20` | `opts` | Kartla ödersen 10 euro fazla alınır · Kart ancak 10 euro ve üstü için geçer · Kart hiç geçmez | 10 euro fazla alınır, kart en az 10 euroda geçer, kart hiç geçmez. | GEÇTİ |  |
| 7 | `b01` | `prompt_tr` | Bir Glühwein, lütfen. | Bir Glühwein isteyeceğim. | GEÇTİ |  |
| 8 | `b02` | `prompt_tr` | İki Glühwein ve bir Kinderpunsch, lütfen. | İki Glühwein ve bir Kinderpunsch isteyeceğim. | GEÇTİ |  |
| 9 | `b03` | `prompt_tr` | Mit Schuss ne demek? | Mit Schuss ne demek diye soracağım. | GEÇTİ |  |
| 10 | `b04` | `prompt_tr` | İlave içki olmasın, lütfen. | İlave içki istemiyorum diyeceğim. | GEÇTİ |  |
| 11 | `b05` | `prompt_tr` | Bratwurst ne kadar? | Bratwurst kaç para diye soracağım. | GEÇTİ |  |
| 12 | `b06` | `prompt_tr` | Kavrulmuş bademler ne kadar? | Kavrulmuş bademler kaç para diye soracağım. | GEÇTİ |  |
| 13 | `b07` | `prompt_tr` | Toplam ne tutuyor? | Hepsi ne kadar diye soracağım. | GEÇTİ |  |
| 14 | `b08` | `prompt_tr` | Kartla da olur mu? | Kartla olur mu diye soracağım. | GEÇTİ |  |
| 15 | `b09` | `prompt_tr` | Bardağı geri vermek istiyorum. | Bardağı geri vermek istiyorum diyeceğim. | GEÇTİ |  |
| 16 | `b10` | `prompt_tr` | Depozitoyu geri alabilir miyim? | Depozitomu geri alabilir miyim diye soracağım. | GEÇTİ |  |
| 17 | `b11` | `prompt_tr` | Bardağın depozitosu var mı? | Bu bardakta depozito var mı diye soracağım. | GEÇTİ |  |
| 18 | `b12` | `prompt_tr` | Nakit ödüyorum. | Nakit ödüyorum diyeceğim. | GEÇTİ |  |
| 19 | `b13` | `prompt_tr` | Üstü kalsın. | Üstü kalsın diyeceğim. | GEÇTİ |  |
| 20 | `b14` | `prompt_tr` | Bardağı saklamak istiyorum. | Bardağı yanıma almak istiyorum diyeceğim. | GEÇTİ |  |
| 21 | `b15` | `prompt_tr` | Hardallı bir Bratwurst, lütfen. | Hardallı bir Bratwurst isteyeceğim. | GEÇTİ |  |
| 22 | `b16` | `prompt_tr` | Fiyat neydi? (bir daha sor) | Fiyatı kaçırdım, bir daha soracağım. | GEÇTİ |  |
| 23 | `h1` | `title_tr` | Bratwurst ve badem standında | Bratwurst ve badem standında geçen bir konuşma. | GEÇTİ |  |
| 24 | `h1.qs[0]` | `q_tr` | Müşteri ne alıyor? | Müşteri ne alıyor? | GEÇTİ |  |
| 25 | `h1.qs[0]` | `opts` | Bir Glühwein ve badem · İki Bratwurst ve büyük paket badem · İki Bratwurst ve Kinderpunsch | Glühwein ve badem, iki Bratwurst ve büyük badem, iki Bratwurst ve Kinderpunsch. | GEÇTİ |  |
| 26 | `h1.qs[1]` | `q_tr` | Toplam ne kadar? | Toplam kaç euro? | GEÇTİ |  |
| 27 | `h1.qs[1]` | `opts` | 7 € · 15 € · 17 € | 7, 15, 17 euro. | GEÇTİ |  |
| 28 | `h1.qs[2]` | `q_tr` | Kartla ödeyebilir mi? | Kartla ödeyebiliyor mu? | GEÇTİ |  |
| 29 | `h1.qs[2]` | `opts` | Evet, 10 €'dan itibaren kart geçiyor · Hayır, yalnızca nakit · Yalnızca 20 €'dan sonra | Evet on eurodan itibaren, hayır sadece nakit, sadece yirmi eurodan sonra. | GEÇTİ |  |
| 30 | `h2` | `title_tr` | Bardakları geri verme (hızlı) | Bardakları geri verme, hızlı konuşma. | GEÇTİ |  |
| 31 | `h2.qs[0]` | `q_tr` | Müşteri ne yapıyor? | Müşteri ne yapıyor? | GEÇTİ |  |
| 32 | `h2.qs[0]` | `opts` | Yeni Glühwein alıyor · Bardak satın alıyor · Bardakları iade edip depozitoyu geri alıyor | Yeni Glühwein alıyor, bardak satın alıyor, bardakları verip depozitoyu geri alıyor. | GEÇTİ |  |
| 33 | `h2.qs[1]` | `q_tr` | Kaç euro geri alıyor? | Kaç euro geri alıyor? | GEÇTİ |  |
| 34 | `h2.qs[1]` | `opts` | 6 € · 9 € · 3 € | 6, 9, 3 euro. | GEÇTİ | Konuşmayla örtüşüyor: üç bardaktan biri başka standın, altı euro. |
| 35 | `h2.qs[2]` | `q_tr` | Yıldızlı bardak ne olacak? | Yıldızlı bardağa ne olacak? | GEÇTİ |  |
| 36 | `h2.qs[2]` | `opts` | Bu satıcı da alıyor · Karşıdaki standa götürecek · Bardak onda kalacak, parasını alamayacak | Bu satıcı da alıyor, karşıdaki standa götürecek, bardak onda kalacak. | GEÇTİ |  |
| 37 | `v1` | `title_tr` | Glühwein standında üç kişilik sipariş | Glühwein standında üç kişilik sipariş. | GEÇTİ |  |
| 38 | `v2` | `title_tr` | Bardakları geri verme | Bardakları geri verme. | GEÇTİ |  |
| 39 | `v3` | `title_tr` | Bratwurst ve badem standında fiyat sorma | Bratwurst ve badem standında fiyat sorma. | GEÇTİ |  |
| 40 | `roleplay.goals/g1` | `tr` | Siparişi verdin: içecekler ve sayıları doğru. | Siparişi verdim, içecekler ve sayıları doğru. | GEÇTİ |  |
| 41 | `roleplay.goals/g2` | `tr` | Toplam fiyatı anladın ya da sordun. | Toplam fiyatı anladım ya da sordum. | GEÇTİ |  |
| 42 | `roleplay.goals/g3` | `tr` | Pfand'ı anladın: bardağı geri verince paranı alırsın. | Pfand'ı anladım: bardağı verince param geri gelir. | GEÇTİ |  |
| 43 | `roleplay.goals/g4` | `tr` | Nasıl ödeyeceğin netleşti. Anlamadığını Almanca sordun. | Nasıl ödeyeceğim belli oldu. Bir de anlamadığımı Almanca sordum. | **GERİ** | İki ayrı fikir: ödeme şekli ve Almanca soru sormak. Hiçbir şeyi anlamadan geçtiysem bu hedef tamam mı değil mi bilemedim. |
| 44 | `roleplay.surprises[0]` | `tr` | Bir saniye, Glühwein birazdan hazır. İki dakika, olur mu? | Satıcı Glühwein iki dakikaya hazır, olur mu diyor. | GEÇTİ |  |
| 45 | `roleplay.surprises[1]` | `tr` | Kinderpunsch maalesef bitti. Yerine sıcak elma suyu ister misiniz? | Kinderpunsch bitmiş, yerine sıcak elma suyu ister miyim diyor. | GEÇTİ |  |
| 46 | `roleplay.surprises[2]` | `tr` | Bardakları saklamak ister misiniz? O zaman depozito bizde kalır. | Bardakları saklamak ister miyim diyor, o zaman depozito onlarda kalır. | GEÇTİ |  |
| 47 | `roleplay.surprises[3]` | `tr` | Daha bozuk paranız yok mu? Neredeyse hiç para üstüm kalmadı. | Daha küçük para var mı diyor, bozuk parası kalmamış. | GEÇTİ | Daha bozuk paranız ifadesi biraz tuhaf ama ilk okumada anlaşılıyor. |

### Tur 2 toplam

- Düzeltilen ya da yeni maddeler: 2 · yeni okunan alanlar: 45
- Toplam: **47** · GEÇTİ: **46** · GERİ: **1**
- GERİ kimlikleri:
  - #43 `roleplay.goals/g4` · `tr`

Birinci turun GERİ maddelerinin hepsi bu turda GEÇTİ.
Tur 2'de yeni GERİ olduğu için dosya hâlâ "reviewed" sayılamaz (OD-9.4).

---

## Tur 3 (2026-11-18)

Bugünkü dosya Tur 1 ve Tur 2 tablolarıyla karşılaştırıldı: öğrenciye görünen alanlarda daha önce okunmamış metin yalnızca aşağıdaki madde. Aynı kimlik, aynı ölçütler.

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | `roleplay.goals/g4` (düzeltme) | `tr` | Nakit mi kartla mı ödeyeceğin netleşti. | Nakit mi kart mı ödeyeceğim belli oldu. | GEÇTİ | Tur 2 GERİ'si kapandı: artık tek fikir (ödeme şekli). Almanca hedefle de örtüşüyor. |

### Tur 3 toplam

- Toplam: **1** · GEÇTİ: **1** · GERİ: **0**

### Dosyanın son durumu (okur açısından)

- Tur 1 GERİ: `ch:essen:mit-karte` `mistakes_tr[0]` → Tur 2'de GEÇTİ.
- Tur 2 GERİ: `roleplay.goals/g4` `tr` → Tur 3'te GEÇTİ.

Açık GERİ yok (OD-9.4 okur koşulu sağlandı).
