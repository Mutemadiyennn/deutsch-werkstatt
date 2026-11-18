# Okur kontrolü — lexicon parti 003 (OD-9.3)

Girdi: `batch-003.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:beide | ipucu_tr | iki ayrı şey için böyle denir | GERİ | anlamadım: asıl kelime de iki şey için, aradaki fark belli değil |
| lx:beide | diğer alanlar | iki şeyin ikisi de | GEÇTİ | |
| lx:Herr | hepsi | erkeğe saygıyla, soyadıyla seslenme | GEÇTİ | |
| lx:natürlich | hepsi | rahatça tabii ki demek | GEÇTİ | |
| lx:tot | hepsi | artık yaşamıyor, ölü | GEÇTİ | |
| lx:lange | hepsi | çok zaman sürmek | GEÇTİ | |
| lx:treffen | hepsi | biriyle bir yerde buluşmak | GEÇTİ | |
| lx:stellen | hepsi | bir şeyi dik koymak | GEÇTİ | |
| lx:ach | hepsi | şaşırınca ya da anlayınca çıkan ses | GEÇTİ | |
| lx:gar | hepsi | hiç demek, olumsuzu güçlendirir | GEÇTİ | |
| lx:spät | hepsi | beklenenden sonra, geç | GEÇTİ | |
| lx:Sache | hepsi | şey, iş ya da konu | GEÇTİ | |
| lx:rufen | hepsi | seslenmek, yardım çağırmak | GEÇTİ | |
| lx:ins | hepsi | bir yere doğru gidiş | GEÇTİ | |
| lx:dort | hepsi | uzaktaki o yer, orada | GEÇTİ | |
| lx:weiter | hepsi | iş ya da yol sürüyor | GEÇTİ | |
| lx:fallen | hepsi | yere düşmek | GEÇTİ | |
| lx:niemand | hepsi | bir kişi bile yok | GEÇTİ | |
| lx:seit | hepsi | o zamandan beri sürüyor | GEÇTİ | |
| lx:Ordnung | anlam_tr | düzen demek, başka bir söz de tamam | GERİ | iki fikir var: kelimenin kendisi ve ondan kurulan başka bir söz |
| lx:Ordnung | diğer alanlar | düzen, tamam demek | GEÇTİ | |
| lx:vom | hepsi | bir yerden geliş | GEÇTİ | |
| lx:Problem | hepsi | çözülmesi gereken zorluk | GEÇTİ | |
| lx:vergessen | mistakes_tr[0] | unuttum derken böyle denmez | GERİ | anlamadım: doğru cümlede iki şey birden değişmiş, hangisi yanlıştı belli değil |
| lx:vergessen | diğer alanlar | aklından çıkmak, unutmak | GEÇTİ | |
| lx:davon | hepsi | az önceki şeyden, ondan | GEÇTİ | |
| lx:dafür | anlam_tr | bir şey bunun için, ya da destek | GERİ | anlamadım: tek okumada çıkmadı, neyin ne için olduğu belli değil |
| lx:dafür | diğer alanlar | bunun için, buna evet | GEÇTİ | |
| lx:verdammt | hepsi | kaba kızgınlık sözü, bir de çok | GEÇTİ | |
| lx:zeigen | hepsi | birine bir şeyi göstermek | GEÇTİ | |
| lx:Mädchen | hepsi | küçük ya da genç kız | GEÇTİ | |
| lx:wegen | hepsi | bir şeyin sebebi, yüzünden | GEÇTİ | |
| lx:welcher | mistakes_tr[1] | otobüs sorarken sonu değişiyor | GERİ | anlamadım: bir üst notta doğru denen söz burada yanlış, nedeni yok |
| lx:welcher | diğer alanlar | seçeneklerden hangisi diye sormak | GEÇTİ | |
| lx:Ding | hepsi | adını bilmediğin şey | GEÇTİ | |
| lx:hin | hepsi | buradan oraya doğru | GEÇTİ | |
| lx:sorgen | hepsi | halletmek ya da kaygılanmak | GEÇTİ | |
| lx:meinen | hepsi | demek istemek, düşünmek | GEÇTİ | |
| lx:Abend | hepsi | günün akşam saatleri | GEÇTİ | |
| lx:rein | hepsi | içeri, bir de saf | GEÇTİ | |
| lx:drei | hepsi | üç tane | GEÇTİ | |
| lx:Freund | hepsi | arkadaş ya da erkek sevgili | GEÇTİ | |
| lx:fühlen | hepsi | kendini nasıl hissettiğin | GEÇTİ | |
| lx:Welt | hepsi | yaşadığımız dünya | GEÇTİ | |
| lx:schaffen | hepsi | zor işi başarmak, yetiştirmek | GEÇTİ | |
| lx:weit | hepsi | uzak yol, bol giysi | GEÇTİ | |
| lx:Angst | anlam_tr | korku duygusu, bir kelimeyle söylenir | GERİ | iki fikir var: anlam ve nasıl söylendiği; ikinci yarı ne demek anlamadım |
| lx:Angst | diğer alanlar | korku duygusu | GEÇTİ | |
| lx:unter | hepsi | bir şeyin altında | GEÇTİ | |
| lx:zusammen | anlam_tr | başkalarıyla yapmak, sonrası belirsiz | GERİ | anlamadım: ikinci yarı hepsini bir anda söylemek gibi okunuyor |
| lx:zusammen | diğer alanlar | birlikte, beraber | GEÇTİ | |
| lx:echt | hepsi | sahte değil, gerçekten | GEÇTİ | |
| lx:schlafen | hepsi | uyumak | GEÇTİ | |
| lx:Hand | hepsi | bedenimizdeki el | GEÇTİ | |
| lx:liegen | hepsi | yatık durmak, bir yerde bulunmak | GEÇTİ | |
| lx:heißen | hepsi | adın ne, bu ne demek | GEÇTİ | |
| lx:lang | hepsi | bir şeyin uzun olması | GEÇTİ | |
| lx:wahr | hepsi | söylenen şey gerçek | GEÇTİ | |
| lx:ziehen | hepsi | kendine çekmek, ev taşımak | GEÇTİ | |
| lx:Moment | hepsi | çok kısa süre, bir saniye | GEÇTİ | |
| lx:genug | hepsi | ihtiyaç kadar var, yeter | GEÇTİ | |
| lx:schauen | hepsi | gözle bakmak | GEÇTİ | |
| lx:Familie | hepsi | anne baba çocuklar, aile | GEÇTİ | |
| lx:gegen | hepsi | karşı olmak, saat gibi | GEÇTİ | |
| lx:setzen | hepsi | oturmak, bir şeyi koymak | GEÇTİ | |
| lx:sonst | hepsi | başka bir şey, yoksa | GEÇTİ | |
| lx:Bruder | hepsi | erkek kardeş | GEÇTİ | |
| lx:Musik | hepsi | dinlenen ya da çalınan müzik | GEÇTİ | |
| lx:Arbeit | hepsi | yaptığın iş, çalıştığın yer | GEÇTİ | |
| lx:wenig | mistakes_tr[1] | insanlar için sonuna harf gelir | GERİ | anlamadım: yalnızca insanlar için mi, başka sayılan şeylerde ne denir belli değil |
| lx:wenig | diğer alanlar | miktar az | GEÇTİ | |
| lx:dabei | hepsi | yanımda var, ben de varım | GEÇTİ | |
| lx:erinnern | hepsi | hatırlamak, birine hatırlatmak | GEÇTİ | |
| lx:Sohn | hepsi | erkek çocuk, oğul | GEÇTİ | |
| lx:Stunde | hepsi | altmış dakikalık süre | GEÇTİ | |
| lx:sofort | hepsi | beklemeden, hemen şimdi | GEÇTİ | |
| lx:nennen | hepsi | birine bir adla seslenmek | GEÇTİ | |
| lx:nah | hepsi | uzak değil, yakın | GEÇTİ | |
| lx:bevor | hepsi | bir şeyi yapmadan önce | GEÇTİ | |
| lx:entschuldigen | hepsi | özür dilemek, pardon diye seslenmek | GEÇTİ | |
| lx:toll | hepsi | çok beğendim, harika | GEÇTİ | |
| lx:einmal | hepsi | bir kez, bir tane | GEÇTİ | |
| lx:passen | hepsi | bedene ya da saate uymak | GEÇTİ | |
| lx:Woche | hepsi | yedi günlük süre | GEÇTİ | |
| lx:letzter | hepsi | sondaki, bir önceki | GEÇTİ | |
| lx:wann | mistakes_tr[0] | bir yerde bu kelime olmaz | GERİ | anlamadım: cümle ne demek istiyor yazmıyor, hangi durumda yanlış bilemedim |
| lx:wann | diğer alanlar | ne zaman diye sormak | GEÇTİ | |
| lx:Auge | hepsi | gördüğümüz organ, göz | GEÇTİ | |
| lx:Minute | hepsi | altmış saniyelik süre | GEÇTİ | |
| lx:fertig | hepsi | iş bitti, hazır | GEÇTİ | |
| lx:halt | hepsi | durum böyle, ne yapalım | GEÇTİ | |
| lx:allein | hepsi | yanında kimse olmadan | GEÇTİ | |
| lx:beim | hepsi | bir yerde, bir işi yaparken | GEÇTİ | |
| lx:einzig | hepsi | başka yok, tek | GEÇTİ | |
| lx:schlecht | hepsi | iyi değil, kötü | GEÇTİ | |
| lx:verschwinden | hepsi | birden ortadan kaybolmak | GEÇTİ | |
| lx:Hilfe | hepsi | yardım, imdat | GEÇTİ | |
| lx:ne | tr | değil mi, bir de yok | GERİ | anlamadım: yok hangi anlamda, açıklamalarda da geçmiyor |
| lx:ne | diğer alanlar | cümle sonunda değil mi | GEÇTİ | |
| lx:wichtig | hepsi | çok değerli, önemli | GEÇTİ | |
| lx:gern | hepsi | severek, memnuniyetle | GEÇTİ | |
| lx:darüber | mistakes_tr[1] | bir soru böyle soruluyormuş | GERİ | anlamadım: hangi soru, Türkçesi ne belli değil |
| lx:darüber | diğer alanlar | az önceki konu hakkında | GEÇTİ | |
| lx:trinken | hepsi | su gibi şeyleri içmek | GEÇTİ | |
| lx:dazu | hepsi | az öncekine ek, yanında | GEÇTİ | |
| lx:daran | mistakes_tr[1] | bir soru böyle soruluyormuş | GERİ | anlamadım: hangi soru, Türkçesi ne belli değil |
| lx:daran | diğer alanlar | az önce söylenen şeye, ona | GEÇTİ | |
| lx:nett | mistakes_tr[0] | eşya için pek övgü değil galiba | GERİ | anlamadım: tek okumada çıkmadı, cümle dolaşık |
| lx:nett | diğer alanlar | sıcak, kibar insan | GEÇTİ | |
| lx:schreiben | hepsi | yazı yazmak | GEÇTİ | |
| lx:Baby | hepsi | çok küçük çocuk | GEÇTİ | |
| lx:Dank | hepsi | teşekkür | GEÇTİ | |
| lx:hoch | hepsi | yukarıda, miktarı fazla | GEÇTİ | |

## Sonuç

- Toplam alan: 471
- GEÇTİ: 458
- GERİ: 13 alan, 13 kart
- GERİ kimlikleri: lx:beide, lx:Ordnung, lx:vergessen, lx:dafür, lx:welcher, lx:Angst, lx:zusammen, lx:wenig, lx:wann, lx:ne, lx:darüber, lx:daran, lx:nett

Tek bir GERİ olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
