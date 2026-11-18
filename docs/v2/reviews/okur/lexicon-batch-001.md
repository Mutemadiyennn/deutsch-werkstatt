# Okur kontrolü — lexicon parti 001 (OD-9.3)

Girdi: `batch-001.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok. Bu partide `parcalar` bütün kartlarda boş.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı. `ne_zaman_tr` alanlarının hepsi 12 kelimenin altında.

Okunan alanların dışında bir not (sayıya girmez): iki kartın başlığında (`de`) öğrencinin bilmediği sözler var: `lx:zu#2` başlığı "zu (+ sıfat)", `lx:ja#2` başlığı "ja (vurgu)". Başlık ekranda görünüyorsa "sıfat" sözünü anlamadım.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:der | tr | o ya da bu demek | GERİ | anlamadım: karşılığı o, bu yazıyor ama ipucu Türkçede karşılığı yok diyor |
| lx:der | diğer alanlar | bilinen şeyin önüne gelen küçük kelime | GEÇTİ | |
| lx:ich | hepsi | konuşan kişi, ben | GEÇTİ | |
| lx:sein | hepsi | biri nasıl, kim, nerede onu söyler | GEÇTİ | |
| lx:sein#2 | anlam_tr | bir erkeğin olan şey, gerisi belirsiz | GERİ | anlamadım: das ile söylenen biri kim, tek okumada çıkmadı |
| lx:sein#2 | diğer alanlar | bir erkeğin olan şey, onun | GEÇTİ | |
| lx:du | hepsi | yakın olduğum kişiye sen demek | GEÇTİ | |
| lx:sie | hepsi | bir kadın ya da onlar | GEÇTİ | |
| lx:sie#2 | hepsi | yabancıya saygıyla siz demek | GEÇTİ | |
| lx:haben | hepsi | bir şey bende var | GEÇTİ | |
| lx:ein | hepsi | ilk kez söylenen tek şey, bir | GEÇTİ | |
| lx:nicht | hepsi | cümleyi olumsuz yapar, değil | GEÇTİ | |
| lx:es | hepsi | das ile söylenen şey, hava, saat | GEÇTİ | |
| lx:und | hepsi | iki sözü bağlar, ve | GEÇTİ | |
| lx:wir | hepsi | ben ve yanımdakiler, biz | GEÇTİ | |
| lx:er | hepsi | bir erkek ya da der ile söylenen şey | GEÇTİ | |
| lx:was | hepsi | bir şeyi sormak, ne | GEÇTİ | |
| lx:werden | hepsi | bir şey değişiyor ya da ileride olacak | GEÇTİ | |
| lx:zu | hepsi | birine ya da bir yere gitmek | GEÇTİ | |
| lx:zu#2 | hepsi | gereğinden fazla, hoşuma gitmedi | GEÇTİ | |
| lx:ihr | hepsi | yakın birkaç kişiye siz demek | GEÇTİ | |
| lx:ihr#2 | hepsi | bir kadının, onların ya da sizin | GEÇTİ | |
| lx:in | hepsi | bir şeyin içinde ya da içine | GEÇTİ | |
| lx:mein | hepsi | bana ait, benim | GEÇTİ | |
| lx:können | hepsi | yapabilmek, kibarca rica etmek | GEÇTİ | |
| lx:ja | hepsi | soruya evet demek | GEÇTİ | |
| lx:ja#2 | hepsi | şaşırınca araya giren hafif söz | GEÇTİ | |
| lx:mit | hepsi | kiminle, neyle yapıldığı | GEÇTİ | |
| lx:wie | hepsi | nasıl diye sormak, gibi demek | GEÇTİ | |
| lx:auf | hepsi | bir şeyin üstünde ya da üstüne | GEÇTİ | |
| lx:dass | hepsi | düşünceyi önceki söze bağlar | GEÇTİ | |
| lx:aber | hepsi | önceki söze karşı bir şey, ama | GEÇTİ | |
| lx:wollen | hepsi | bir şeyi istediğini açıkça söylemek | GEÇTİ | |
| lx:gut | hepsi | beğenmek, durum iyi | GEÇTİ | |
| lx:so | hepsi | böyle demek, duyguyu büyütmek | GEÇTİ | |
| lx:hier | hepsi | bulunduğum yer, telefonda kendini tanıtma | GEÇTİ | |
| lx:sagen | hepsi | birine bir şey söylemek | GEÇTİ | |
| lx:für | hepsi | kimin ya da ne için | GEÇTİ | |
| lx:gehen | anlam_tr | yürüyerek gitmek, bir şey oldu mu | GERİ | anlamadım: ikinci yarı ne demek belli değil, olup olmadığı neyin |
| lx:gehen | diğer alanlar | yürüyerek gitmek | GEÇTİ | |
| lx:von | hepsi | nereden ya da kimden geldiği | GEÇTİ | |
| lx:alle | hepsi | grubun tamamı, her şey | GEÇTİ | |
| lx:kommen | hepsi | bir yere gelmek, nereli olmak | GEÇTİ | |
| lx:wenn | hepsi | hangi durumda olacağı, eğer | GEÇTİ | |
| lx:machen | hepsi | bir iş yapmak | GEÇTİ | |
| lx:kein | hepsi | bir şey yok | GEÇTİ | |
| lx:wissen | hepsi | bir bilgiyi bilmek | GEÇTİ | |
| lx:müssen | hepsi | yapılması gerekiyor, zorunda olmak | GEÇTİ | |
| lx:nein | hepsi | soruya ya da teklife hayır demek | GEÇTİ | |
| lx:an | hepsi | bir şeyin yanında, ona değerek | GEÇTİ | |
| lx:dieser | mistakes_tr[1] | konuşurken kısa bir söz denir | GERİ | anlamadım: sözün Türkçesi yok, neyin kısası belli değil, kartın kelimesi içinde geçmiyor |
| lx:dieser | diğer alanlar | yakındaki ya da söz edilen şey, bu | GEÇTİ | |
| lx:sehen | hepsi | gözle görmek | GEÇTİ | |
| lx:noch | hepsi | sürüyor ya da üstüne ekleniyor | GEÇTİ | |
| lx:nur | hepsi | az ya da tek, sadece | GEÇTİ | |
| lx:da | hepsi | bir yeri gösterir, biri geldi | GEÇTİ | |
| lx:tun | anlam_tr | yapmak demek, bir de kalıplarda geçiyor | GERİ | iki fikir var: kelimenin anlamı ve nerede geçtiği, örnek kalıbın Türkçesi de yok |
| lx:tun | diğer alanlar | bir iş yapmak | GEÇTİ | |
| lx:sich | hepsi | insan işi kendine yapıyor | GEÇTİ | |
| lx:dein | hepsi | sana ait, senin | GEÇTİ | |
| lx:sollen | hepsi | başkası benden istiyor ya da teklif | GEÇTİ | |
| lx:auch | hepsi | başkası için de geçerli, de | GEÇTİ | |
| lx:geben | hepsi | birine bir şey vermek | GEÇTİ | |
| lx:schon | hepsi | erken ya da çoktan oldu | GEÇTİ | |
| lx:als | hepsi | biri ne olarak çalışıyor, karşılaştırma | GEÇTİ | |
| lx:als#2 | hepsi | geçmişte bir kez olan şeyin zamanı | GEÇTİ | |
| lx:mal | hepsi | ricayı yumuşatan küçük söz | GEÇTİ | |
| lx:Mal | mistakes_tr[0] | biri yanlış biri doğru, ikisi aynı | GERİ | anlamadım: iki yazım aynı görünüyor, fark nerede söylenmiyor |
| lx:Mal | diğer alanlar | kaçıncı kez olduğu, sefer | GEÇTİ | |
| lx:jetzt | hepsi | şu an, şimdi | GEÇTİ | |
| lx:dann | hepsi | sıradaki olay, o zaman | GEÇTİ | |
| lx:aus | tr | bir yerden, içinden, bir de kapalı | GERİ | anlamadım: kapalı hangi anlamda, açıklamalarda hiç geçmiyor |
| lx:aus | diğer alanlar | nereden geldiğim, içinden çıkmak | GEÇTİ | |
| lx:um | hepsi | işin saati, bir şeyin çevresi | GEÇTİ | |
| lx:im | hepsi | bir yerin içinde, ayda, mevsimde | GEÇTİ | |
| lx:doch | hepsi | olumsuz söze itiraz, isteği yumuşatma | GEÇTİ | |
| lx:lassen | hepsi | bırakmak ya da başkasına yaptırmak | GEÇTİ | |
| lx:oder | hepsi | iki seçenek, sonda değil mi | GEÇTİ | |
| lx:hören | hepsi | sesi duymak, bir şeyi dinlemek | GEÇTİ | |
| lx:nach | hepsi | şehre, ülkeye gidiş, bir şeyden sonra | GEÇTİ | |
| lx:nichts | hepsi | hiçbir şey yok | GEÇTİ | |
| lx:man | hepsi | belli biri değil, genel olarak insanlar | GEÇTİ | |
| lx:bitte | hepsi | lütfen, buyurun, rica ederim | GEÇTİ | |
| lx:bitten | hepsi | birinden kibarca bir şey istemek | GEÇTİ | |
| lx:viel | hepsi | miktarı fazla, çok | GEÇTİ | |
| lx:denken | mistakes_tr[1] | fikir sorarken başka bir söz de olur | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor |
| lx:denken | diğer alanlar | aklındakini, fikrini söylemek | GEÇTİ | |
| lx:wo | hepsi | bir şeyin yerini sormak | GEÇTİ | |
| lx:mehr | hepsi | daha fazla, artık değil | GEÇTİ | |
| lx:etwas | hepsi | belli olmayan bir şey, biraz | GEÇTİ | |
| lx:bei | mistakes_tr[1] | bir yerde çalışırken bei denir | GERİ | anlamadım: örnekteki ad şehir mi iş yeri mi belli değil, kural çıkmıyor |
| lx:bei | diğer alanlar | birinin yanında, bir yerde olmak | GEÇTİ | |
| lx:also | hepsi | sonuç çıkarmak, söze başlamak | GEÇTİ | |
| lx:immer | hepsi | her seferinde, hep | GEÇTİ | |
| lx:ganz | hepsi | bir şeyin tamamı, anlamı güçlendirir | GEÇTİ | |
| lx:wer | hepsi | bir kişiyi sormak, kim | GEÇTİ | |
| lx:unser | hepsi | bize ait, bizim | GEÇTİ | |
| lx:warum | hepsi | sebebi sormak, neden | GEÇTİ | |
| lx:vor | hepsi | bir şeyin önünde, şu kadar önce | GEÇTİ | |
| lx:glauben | hepsi | emin değilim, sanıyorum, birine inanmak | GEÇTİ | |
| lx:los | hepsi | hadi başlayalım, bir sorun var | GEÇTİ | |
| lx:wieder | mistakes_tr[0] | biri yanlış biri doğru, ikisi aynı | GERİ | anlamadım: iki yazım aynı görünüyor, fark nerede söylenmiyor |
| lx:wieder | diğer alanlar | bir şey yeniden oluyor | GEÇTİ | |
| lx:finden | hepsi | aradığını bulmak, fikrini söylemek | GEÇTİ | |
| lx:danke | hepsi | teşekkür etmek | GEÇTİ | |
| lx:anderer | hepsi | aynı olmayan, başka | GEÇTİ | |
| lx:sehr | hepsi | özelliği ya da duyguyu büyütür, çok | GEÇTİ | |
| lx:denn | hepsi | soruyu samimi ve meraklı yapar | GEÇTİ | |
| lx:denn#2 | hepsi | önceki sözün sebebi, çünkü | GEÇTİ | |
| lx:Mann | mistakes_tr[1] | bir söz yanlış, öbürü doğru | GERİ | anlamadım: ne demek isterken yanlış olduğu yazmıyor |
| lx:Mann | diğer alanlar | yetişkin erkek ya da koca | GEÇTİ | |

## Sonuç

- Toplam alan: 419
- GEÇTİ: 408
- GERİ: 11

GERİ kimlikleri:

- `lx:der` — tr
- `lx:sein#2` — anlam_tr
- `lx:gehen` — anlam_tr
- `lx:dieser` — mistakes_tr[1]
- `lx:tun` — anlam_tr
- `lx:Mal` — mistakes_tr[0]
- `lx:aus` — tr
- `lx:wieder` — mistakes_tr[0]
- `lx:denken` — mistakes_tr[1]
- `lx:bei` — mistakes_tr[1]
- `lx:Mann` — mistakes_tr[1]

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
