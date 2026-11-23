# Okur kontrolü: lexicon b1-01 (b1-01a + b1-01b, OD-9.3)

Girdi: `content/v2/registry/lexicon/batch-b1-01a.json` (26 kart) ve `batch-b1-01b.json` (24 kart), toplam 50 kart. İkisi de `review.status: draft`.

Okunan alanların hepsi okundu, örneklem yapılmadı:
- Açıklama alanları (454): `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar` (3 kartta dolu), `exp.ipucu_tr`, her `mistakes_tr`, her `forms[].hint_tr`.
- Çeviri alanları (664): her `examples[].tr`, `collocations[].tr`, `forms[].tr`.

Mekanik tarama: açıklama alanlarında `=`, `;`, `…`, tırnak ve 14 kelimeden uzun cümle yok. `ne_zaman_tr` hepsi 12 kelimenin altında, `parcalar` çipleri en çok 2 kelime. Eşdizim çevirilerinin 13'ünde `…` var (aşağıda ayrı grup).

Terim ölçüsü önceki okur raporlarıyla aynı tutuldu: `çoğul`, `tekil`, `isim`, `fiil`, `ek` dilbilgisi terimi sayıldı (bkz. `lexicon-batch-009.md`, `taslak-kartsiz.md`, `pm032.md`). **Birden çok**, **tek**, **ikiye ayrılır**, **geçmişte** gibi terimsiz anlatımlar geçti.

## A. Kart kart sonuç

| kart | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:zustimmen | hepsi | | birinin fikrine katılmak | GEÇTİ | |
| lx:widersprechen | hepsi | | birinin fikrine açıkça karşı çıkmak | GEÇTİ | |
| lx:Ansicht | açıklamalar | | bir konudaki görüşüm, bence | GEÇTİ | |
| lx:Ansicht | collocations[1].tr | … görüşünde olmak | bir şeyin doğru olduğunu düşünmek | GERİ | sembol var (…) |
| lx:sinnvoll | diğerleri | | işe yarayan, mantıklı | GEÇTİ | |
| lx:sinnvoll | mistakes_tr[1] | Mantıklı bir fikir derken **eine sinnvoll Idee** yanlış. Doğrusu **eine sinnvolle Idee.** İsimden önce sona **e** eklenir. | bir şeyin önünde kelimenin sonuna e geliyor; ama isim deyince insan adı anlıyorum | GERİ | terim var (isim). Aynı kartın 3. boşluk ipucu (**Idee** önünde sona **e** eklenir) aynı şeyi terimsiz söylüyor. |
| lx:sinnvoll | collocations[2].tr | … yapmak mantıklı | bir şeyi yapmak mantıklı | GERİ | sembol var (…) |
| lx:diskutieren | hepsi | | bir konuyu sakin sakin konuşup tartışmak | GEÇTİ | |
| lx:Umfrage | hepsi | | birçok kişiye aynı soruyu sormak, anket | GEÇTİ | |
| lx:Hauptsache | açıklamalar | | en önemli şey, yeter ki | GEÇTİ | |
| lx:Hauptsache | collocations[3].tr | Önemli olan … | önemli olan şu | GERİ | sembol var (…) |
| lx:kritisieren | açıklamalar | | bir şeyin kötü yanını söylemek | GEÇTİ | |
| lx:kritisieren | collocations[1].tr | Birçok kişi … eleştiriyor | birçok kişi bir şeyi eleştiriyor | GERİ | sembol var (…) |
| lx:Meldung | hepsi | | gazete ya da radyodaki kısa haber | GEÇTİ | |
| lx:Bericht | diğerleri | | bir olayı ya da işi anlatan yazı, rapor | GEÇTİ | |
| lx:Bericht | mistakes_tr[1] | **die Bericht** yanlış. Doğrusu **der Bericht**, çoğulu **die Berichte.** | önüne der geliyor, bir de başka bir hâli var | GERİ | terim var (çoğul). Bir kutuda iki bilgi: der ve birden çok hâli. |
| lx:Bericht | collocations[2].tr | … hakkında bir haber | bir şey hakkında haber | GERİ | sembol var (…) |
| lx:Überschrift | açıklamalar | | yazının en üstündeki başlık | GEÇTİ | |
| lx:Überschrift | collocations[3].tr | … başlığı altında | bir başlığın altında | GERİ | sembol var (…) |
| lx:Ereignis | diğerleri | | önemli ya da özel bir olay | GEÇTİ | |
| lx:Ereignis | mistakes_tr[1] | Çoğulu **die Ereignisse**, sonda iki **s** yazılır. | bir şeyi sonda iki s ile yazıyorum ama neyi, bilmiyorum | GERİ | terim var (çoğul) |
| lx:Vorfall | diğerleri | | beklenmedik, çoğu zaman kötü olay | GEÇTİ | |
| lx:Vorfall | mistakes_tr[1] | Çoğulu **die Vorfälle**, **a** harfi **ä** olur. | bir hâlinde a, ä oluyor | GERİ | terim var (çoğul). 4. boşluk ipucu aynı şeyi "Birden çok olay için" diye terimsiz söylüyor. |
| lx:aktuell | diğerleri | | şimdiki, güncel, hâlâ geçerli | GEÇTİ | |
| lx:aktuell | forms[0].hint_tr | **die** ve çoğul isim arasında **aktuellen** olur. | die ile bir şey arasında aktuellen diyorum | GERİ | terim var (çoğul, isim) |
| lx:aktuell | collocations[3].tr | Şu an … | şu an bir şey | GERİ | sembol var (…) |
| lx:angeblich | diğerleri | | güya, duyduğum ama emin olmadığım bilgi | GEÇTİ | |
| lx:angeblich | exp.ipucu_tr | Türkçedeki -mış eki gibi, duyulan bilgiyi aktarır. | geliyormuş derkenki gibi | GERİ | terim var (ek). Anlamı tuttu; ama "ek" dilbilgisi terimi. |
| lx:sinken | hepsi | | fiyat, sayı ya da sıcaklık düşmek | GEÇTİ | |
| lx:erhöhen | hepsi | | fiyatı ya da kirayı artırmak | GEÇTİ | |
| lx:streiken | hepsi | | çalışanların işi bırakması, grev | GEÇTİ | |
| lx:festnehmen | hepsi | | polisin birini yakalayıp götürmesi | GEÇTİ | |
| lx:Zeuge | hepsi | | bir olayı kendi gözüyle gören kişi | GEÇTİ | |
| lx:Einwohner | diğerleri | | bir yerde yaşayan kişi, nüfus | GEÇTİ | |
| lx:Einwohner | forms[0].hint_tr | Nüfus derken **Einwohner** denir, çoğulu da aynıdır. | nüfus için Einwohner; bir başka hâli de aynı | GERİ | terim var (çoğul) |
| lx:Einwohner | collocations[2].tr | …in nüfusu ne kadar? | bir yerin nüfusu ne kadar | GERİ | sembol var (…); ayrıca **…in** bitişik ekiyle okurken takıldım |
| lx:stattfinden | açıklamalar | | bir etkinliğin bir yerde, bir zamanda yapılması | GEÇTİ | |
| lx:stattfinden | collocations[2].tr | … ne zaman yapılıyor? | bir şey ne zaman yapılıyor | GERİ | sembol var (…) |
| lx:Unwetter | diğerleri | | fırtına, dolu gibi tehlikeli hava | GEÇTİ | |
| lx:Unwetter | mistakes_tr[1] | **die Unwetter** tekil için yanlış. Doğrusu **das Unwetter**, tıpkı **das Wetter** gibi. | önüne das gelir, Wetter gibi; "tekil için" kısmını anlamadım | GERİ | terim var (tekil) |
| lx:Studie | açıklamalar | | bilim insanlarının yaptığı araştırma | GEÇTİ | |
| lx:Studie | collocations[2].tr | Bir araştırma … gösteriyor | bir araştırma bir şey gösteriyor | GERİ | sembol var (…) |
| lx:insgesamt | açıklamalar | | toplam, genel olarak | GEÇTİ | |
| lx:insgesamt | collocations[1].tr | Toplam … ediyor | toplam şu kadar ediyor | GERİ | sembol var (…) |
| lx:Experte | açıklamalar | | bir konuyu çok iyi bilen kişi | GEÇTİ | |
| lx:Experte | collocations[0].tr | uzmanlar … diyor | uzmanlar bir şey diyor | GERİ | sembol var (…) |
| lx:Experte | collocations[2].tr | … uzmanı | bir konunun uzmanı | GERİ | sembol var (…) |
| lx:Behandlung | hepsi | | hastalığı iyileştirmek için yapılanlar, tedavi | GEÇTİ | |
| lx:Untersuchung | hepsi | | doktorun muayenesi ya da tahlil | GEÇTİ | |
| lx:Ursache | hepsi | | bir şeyin sebebi; teşekküre "bir şey değil" | GEÇTİ | |
| lx:harmlos | hepsi | | tehlikesiz, zararsız | GEÇTİ | |
| lx:Medikament | hepsi | | ilaç; içmek değil almak denir | GEÇTİ | |
| lx:einnehmen | hepsi | | ilacı yutarak almak | GEÇTİ | |
| lx:Wirkung | diğerleri | | ilacın vücutta yaptığı etki | GEÇTİ | |
| lx:Wirkung | exp.ipucu_tr | Fiili **wirken** etki etmek, işe yaramak demektir. | wirken etki etmek demek; "fiili" ne, bunun bu kelimeyle bağı ne, çıkaramadım | GERİ | terim var (fiil) |
| lx:nachfragen | hepsi | | anlamadığımı bir daha sormak | GEÇTİ | |
| lx:Diagnose | hepsi | | doktorun hastalığın adını koyması | GEÇTİ | |
| lx:Facharzt | hepsi | | tek alanda uzman doktor | GEÇTİ | |
| lx:Augenarzt | hepsi | | göz doktoru | GEÇTİ | |
| lx:Wartezeit | hepsi | | randevu ya da sıra için bekleme süresi | GEÇTİ | |
| lx:frühestens | hepsi | | en erken, bundan önce olmaz | GEÇTİ | |
| lx:kurzfristig | hepsi | | çok yakında, son anda | GEÇTİ | |
| lx:aufnehmen | diğerleri | | muayenehanenin ya da hastanenin hasta kabul etmesi | GEÇTİ | |
| lx:aufnehmen | forms[3].hint_tr | **können** ile fiil sonda tam hâliyle durur: **aufnehmen**. | können varsa aufnehmen sonda bütün kalır | GERİ | terim var (fiil); "tam hâliyle" da terim gibi |
| lx:nachsehen | diğerleri | | kontrol etmek için bakmak, bir bakayım | GEÇTİ | |
| lx:nachsehen | forms[1].hint_tr | **können** ile fiil sonda tam hâliyle durur: **nachsehen**. | können varsa nachsehen sonda bütün kalır | GERİ | terim var (fiil) |
| lx:eilig | hepsi | | acil; acelem var | GEÇTİ | |
| lx:zurzeit | diğerleri | | şu sıralar, şu an | GEÇTİ | |
| lx:zurzeit | exp.ipucu_tr | **Zurzeit** cümle başındaysa fiil hemen arkasından gelir. | Zurzeit başta olunca arkasından bir şey geliyor; ne geldiğini bilmiyorum | GERİ | terim var (fiil). mistakes_tr[0] aynı kuralı örnekle terimsiz gösteriyor. |
| lx:möglichst | diğerleri | | mümkün olduğunca, bir an önce | GEÇTİ | |
| lx:möglichst | exp.anlam_tr | Bir şeyi elinden geldiğince öyle istediğini söyler. | elimden geldiğince istiyorum mu? ikinci okumada: bir şeyin olabildiğince öyle olmasını istemek | GERİ | anlamadım (tek okumada değil): "elinden geldiğince" ile "istediğini" yan yana gelince istemenin derecesi gibi okunuyor |
| lx:ausstellen | diğerleri | | doktorun ya da dairenin belge yazıp vermesi | GEÇTİ | |
| lx:ausstellen | forms[0].hint_tr | **können** ile fiil sonda tam hâliyle durur: **ausstellen**. | können varsa ausstellen sonda bütün kalır | GERİ | terim var (fiil) |
| lx:abwarten | diğerleri | | sonucu sabırla beklemek, bekleyip görmek | GEÇTİ | |
| lx:abwarten | forms[1].hint_tr | **müssen** ile fiil sonda tam hâliyle durur: **abwarten**. | müssen varsa abwarten sonda bütün kalır | GERİ | terim var (fiil) |
| lx:Klinik | hepsi | | hastane, çoğu zaman uzman hastane | GEÇTİ | |
| lx:Brille | hepsi | | gözlük; takmak aufsetzen, kullanmak tragen | GEÇTİ | |
| lx:Hinweis | hepsi | | dikkat edilecek küçük bilgi ya da uyarı | GEÇTİ | |

"hepsi" ve "açıklamalar / diğerleri": o kartın bütün açıklama ve çeviri alanları tek tek okundu ve geçti (GERİ satırındaki alan hariç).

## B. Eşdizim çevirilerindeki `…` (13 alan) üstüne not

Bu 13 alan yalnızca `…` yüzünden GERİ. Hepsinde Almanca tarafta da aynı işaret var; Türkçe taraf onu yansıtıyor. Okurken çoğunu "buraya bir şey gelir" diye anladım; yalnızca lx:Einwohner **…in nüfusu** satırında takıldım. Doğrulayıcı sözlük kartında yalnızca `tr` ve `mistakes_tr`'yi OD-9.2'ye göre tarıyor, eşdizim çevirilerini taramıyor. Bu alanlar OD-9.2 dışında sayılırsa bu 13 GERİ düşer. Açıklama alanlarındaki 15 GERİ yine de kalır.

## C. Sınırda geçenler (kararı etkilemedi)

- lx:Ansicht `ipucu_tr`: anlamı (bence) ve resmîliği aynı cümlede söylüyor. Kısa olduğu için tek okumada iki bilgiyi de aldım.
- lx:kritisieren, lx:festnehmen `ipucu_tr`: kalıbın nerede geçtiğini söylüyor (röportaj, haber), Türkçesini vermiyor. Yanlış yere götürmüyor.
- lx:einnehmen, lx:aufnehmen, lx:ausstellen `ipucu_tr` ("Cümlede **ein/auf/aus** en sona gider"): ne dediğini anladım. Ama aynı kartın 1. örneği (**können/soll** ile) bu kuralın dışında kalıyor. **ein** "bir" anlamındaki kelimeyle de karışabilir; kartın başlığı yanında olduğu için karıştırmadım.
- lx:Untersuchung `ipucu_tr`: **-ung** ile biten kelimeler için genel bir kural. Bu kelimeye de uyuyor.
- lx:Ansicht `mistakes_tr[1]`, lx:Studie `mistakes_tr[1]`: doğrusu yalnızca cümle parçası olarak verilmiş. lx:Studie'de Türkçe giriş de yok. Yanlışla doğru yan yana konunca fark görülüyor.
- lx:harmlos `mistakes_tr[0]`: hatanın ne olduğu açıkça söylenmemiş ama iki cümle birlikte anlaşılıyor.
- lx:aktuell `mistakes_tr[2]`: İngilizce kelime (D-060 yanlış arkadaş istisnası). İngilizce bilmesem de ikinci cümle tek başına yetiyor.
- lx:Ursache `anlam_tr` ("bir şeyin neden olduğunu söyler"): sebep diye okudum.

## Sonuç

- Toplam alan: 1118 (açıklama 454 + çeviri 664)
- GEÇTİ: 1090
- GERİ: 28 alan, 23 kart
  - Açıklama alanı (15): lx:sinnvoll mistakes_tr[1], lx:Bericht mistakes_tr[1], lx:Ereignis mistakes_tr[1], lx:Vorfall mistakes_tr[1], lx:aktuell forms[0].hint_tr, lx:angeblich exp.ipucu_tr, lx:Einwohner forms[0].hint_tr, lx:Unwetter mistakes_tr[1], lx:Wirkung exp.ipucu_tr, lx:aufnehmen forms[3].hint_tr, lx:nachsehen forms[1].hint_tr, lx:zurzeit exp.ipucu_tr, lx:möglichst exp.anlam_tr, lx:ausstellen forms[0].hint_tr, lx:abwarten forms[1].hint_tr
  - Eşdizim çevirisi, `…` (13): lx:Ansicht collocations[1], lx:sinnvoll collocations[2], lx:Hauptsache collocations[3], lx:kritisieren collocations[1], lx:Bericht collocations[2], lx:Überschrift collocations[3], lx:aktuell collocations[3], lx:Einwohner collocations[2], lx:stattfinden collocations[2], lx:Studie collocations[2], lx:insgesamt collocations[1], lx:Experte collocations[0], lx:Experte collocations[2]

GERİ olduğu için iki parti de "reviewed" sayılamaz (OD-9.4).

## 2. tur (yalnız doğrulama, PM-079 md. 3)

Girdi: dilbilimcinin düzeltme listesi (`docs/v2/reviews/lexicon-b1-01.md`, "Okur düzeltmeleri (2026-11-23)"). Metinler o listeden değil, iki içerik dosyasından okundu; liste ile dosya aynı. Yalnız 1. turda geri dönen 28 alan ve düzeltmenin getirdiği yeni metin okundu. Değişen eşdizimlerin Almancası da okundu. İki dosyada `…` taşıyan eşdizim kalmadı.

| kart | alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:Ansicht | collocations[1].tr | şu görüşte olmak | bir şeyin öyle olduğunu düşünmek | GEÇTİ | |
| lx:sinnvoll | collocations[2].tr | Erken gelmek mantıklı. | erken gelmek akıllıca | GEÇTİ | |
| lx:Hauptsache | collocations[3].tr | Önemli olan işin olması. | iş olsun yeter | GEÇTİ | |
| lx:kritisieren | collocations[1].tr | Birçok kişi fazla pahalı olmasını eleştiriyor. | çoğu kişi bir şeyin pahalılığından şikâyetçi | GEÇTİ | |
| lx:Bericht | collocations[2].tr | hava durumu hakkında bir haber | havayı anlatan haber | GEÇTİ | |
| lx:Überschrift | collocations[3].tr | başlığın altında | yazının başlığının altında | GEÇTİ | |
| lx:aktuell | collocations[3].tr | Şu an vaktim yok. | şimdilik vaktim yok | GEÇTİ | |
| lx:Einwohner | collocations[2].tr | Şehrin nüfusu ne kadar? | şehirde kaç kişi yaşıyor | GEÇTİ | |
| lx:stattfinden | collocations[2].tr | Kurs ne zaman yapılıyor? | kurs ne zaman var | GEÇTİ | |
| lx:Studie | collocations[2].tr | Bir araştırma çok az uyuduğumuzu gösteriyor. | araştırmaya göre az uyuyoruz | GEÇTİ | |
| lx:insgesamt | collocations[1].tr | Toplam 20 avro ediyor. | hepsi 20 avro | GEÇTİ | |
| lx:Experte | collocations[0].tr | Uzmanlar fiyatların artacağını söylüyor. | bilenler fiyatlar artacak diyor | GEÇTİ | |
| lx:Experte | collocations[2].tr | bilgisayar uzmanı | bilgisayardan çok iyi anlayan kişi | GEÇTİ | |
| lx:sinnvoll | mistakes_tr[1] | … Doğrusu **eine sinnvolle Idee.** **Idee** önünde sona **e** eklenir. | Idee'den önce sinnvoll'un sonuna e gelir | GEÇTİ | |
| lx:Bericht | mistakes_tr[1] | **die Bericht** yanlış. Doğrusu **der Bericht.** | önüne der gelir | GEÇTİ | |
| lx:Ereignis | mistakes_tr[1] | Birden çok olay için **die Ereignisse** denir, sonda iki **s** yazılır. | olaylar derken sonda iki s var | GEÇTİ | |
| lx:Vorfall | mistakes_tr[1] | Birden çok olay için **die Vorfälle** denir, **a** harfi **ä** olur. | olaylar derken a, ä oluyor | GEÇTİ | |
| lx:Unwetter | mistakes_tr[1] | **die Unwetter** tek bir fırtına için yanlış. Doğrusu **das Unwetter**, tıpkı **das Wetter** gibi. | tek fırtına için das, Wetter gibi | GEÇTİ | |
| lx:aktuell | forms[0].hint_tr | **die Nachrichten** önünde **aktuellen** olur. | haberler kelimesinin önünde aktuellen | GEÇTİ | boşluklu cümle yeri gösteriyor; aynı kartın 3. ipucundaki **die Lage** önünde ile aynı kuruluş |
| lx:Einwohner | forms[0].hint_tr | Nüfus derken **Einwohner** denir. Birden çok kişi için de **Einwohner** denir. | nüfus da, sakinler de Einwohner | GEÇTİ | |
| lx:aufnehmen | forms[3].hint_tr | **können** varsa **aufnehmen** sona bütün olarak gelir. | können varsa aufnehmen sonda bölünmeden | GEÇTİ | |
| lx:nachsehen | forms[1].hint_tr | **können** varsa **nachsehen** sona bütün olarak gelir. | aynı | GEÇTİ | |
| lx:ausstellen | forms[0].hint_tr | **können** varsa **ausstellen** sona bütün olarak gelir. | aynı | GEÇTİ | |
| lx:abwarten | forms[1].hint_tr | **müssen** varsa **abwarten** sona bütün olarak gelir. | müssen varsa abwarten sonda bölünmeden | GEÇTİ | |
| lx:angeblich | exp.ipucu_tr | Türkçedeki geliyormuş, gitmiş gibi sözlerle aynı işi görür. | Türkçede geliyormuş deyince olduğu gibi, duyduğunu aktarır | GEÇTİ | |
| lx:Wirkung | exp.ipucu_tr | İlaç etki ediyor derken **Das Medikament wirkt** denir. | ilaç etki ediyor demek için | GEÇTİ | |
| lx:zurzeit | exp.ipucu_tr | **Zurzeit** başta olunca hemen arkasından **ist** ya da **habe** gelir. | Zurzeit'ten sonra yalnız ist ya da habe gelir | GERİ | ifadeyle örtüşmüyor (düzeltmenin getirdiği yeni kusur): kutu iki kelimeyle sınırlı bir kural gibi okunuyor. Aynı kartın 1. örneğinde ve 1. boşluğunda **Zurzeit sind alle Leitungen besetzt** var; **sind** ne ist ne habe. |
| lx:möglichst | exp.anlam_tr | Bir şeyin olabildiğince erken, hızlı ya da çok olmasını istediğini söyler. | bir şeyin mümkün olduğunca öyle olmasını istemek | GEÇTİ | |

Takip notu (engel değil): 2. turda eski alanlarda yeni bulgu yok.

### 2. tur sonucu

- Okunan: 28 alan
- GEÇTİ: 27
- GERİ: 1 (lx:zurzeit exp.ipucu_tr)

GERİ kaldığı için `batch-b1-01b.json` "reviewed" sayılamaz (OD-9.4). `batch-b1-01a.json`'da GERİ kalmadı.

## 3. tur (yalnız doğrulama, PM-079 md. 3)

Girdi: `batch-b1-01b.json`, yalnız lx:zurzeit `exp.ipucu_tr`. Kartın örnekleri ve boşlukları yeni metinle çelişki için okundu.

| kart | alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:zurzeit | exp.ipucu_tr | **Zurzeit** başta olunca **sind** gibi sözcükler arkasından gelir, örneğin **Zurzeit sind alle Leitungen besetzt.** | Zurzeit cümlenin başındaysa sind gibi bir kelime hemen arkasından gelir | GEÇTİ | 14 kelime, sembol ve terim yok. Artık tek kelimeye bağlı kural gibi okunmuyor; kartın **Zurzeit sind** ve **Zurzeit hab ich** örnekleriyle çelişmiyor. |

### 3. tur sonucu

- Okunan: 1 alan · GEÇTİ: 1 · GERİ: 0

`batch-b1-01a.json` ve `batch-b1-01b.json`'da okur GERİ'si kalmadı (OD-9.3 okur katmanı geçti).
