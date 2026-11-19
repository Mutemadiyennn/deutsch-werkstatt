# Okur kontrolü — lexicon parti 010 (OD-9.3)

Girdi: `batch-010.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca, dilbilgisi terimi ve 14 kelimeden uzun cümle bulunmadı.

`parcalar` soldan sağa okundu (28 kart): 27 kartta çıkan Türkçe kelimenin anlamını veriyor, `lx:Rathaus` geri döndü. Sınırda geçenler: `lx:Sprechstunde` ("konuşma saati"), `lx:fernsehen` ("uzaktan izlemek"), `lx:Hausarzt` ("ev doktoru"), `lx:Krankschreibung` ("hasta yazılma"). Yanlış yere götürmüyorlar, anlam alanıyla birlikte oturuyor.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:passen#2 | hepsi | bir saat bana uyuyor demek | GEÇTİ | |
| lx:Stand | mistakes_tr[0] | senin standın orada mı, karıştı | GERİ | anlamadım: "Standın orada" önce "senin standın orada" diye okunuyor |
| lx:Stand | diğer alanlar | pazarda satış yapılan küçük tezgâh | GEÇTİ | |
| lx:Deutsch | hepsi | Almanca dilinin adı | GEÇTİ | |
| lx:Ohr | hepsi | duyduğumuz organ, kulak | GEÇTİ | |
| lx:bar | hepsi | parayı nakit vermek | GEÇTİ | |
| lx:Patient | hepsi | doktora giden hasta kişi | GEÇTİ | |
| lx:übel | hepsi | midem bulanıyor demenin yolu | GEÇTİ | |
| lx:Weihnachten | ipucu_tr | Noel günlerinde demek, güneyde de söyleniyor | GERİ | iki fikir var: hem anlamı hem nerede söylendiği |
| lx:Weihnachten | diğer alanlar | aralık sonundaki Noel bayramı | GEÇTİ | |
| lx:Lust | hepsi | canımın bir şey istemesi | GEÇTİ | |
| lx:Fuß | hepsi | bacağın en altı, ayak | GEÇTİ | |
| lx:Kollege | mistakes_tr[0] | benim arkadaşımla diyor, Almancada benim yok | GERİ | ifadeyle örtüşmüyor: Türkçe "arkadaşımla" diyor, Almanca örnekte "benim" yok |
| lx:Kollege | diğer alanlar | aynı yerde çalıştığım kişi | GEÇTİ | |
| lx:wehtun | hepsi | bir yerim ağrıyor, acı veriyor | GEÇTİ | |
| lx:mitkommen | hepsi | başkalarıyla birlikte gelmek | GEÇTİ | |
| lx:Termin | hepsi | önceden ayarlanan görüşme saati | GEÇTİ | |
| lx:wiederholen | hepsi | söyleneni bir daha söylemek | GEÇTİ | |
| lx:üben | hepsi | öğrenmek için tekrar tekrar çalışmak | GEÇTİ | |
| lx:schlucken | hepsi | boğazdan aşağı geçirmek, yutmak | GEÇTİ | |
| lx:Einladung | hepsi | birini bir yere çağırma, davet | GEÇTİ | |
| lx:Zahl | hepsi | miktar gösteren sayı | GEÇTİ | |
| lx:Tasse | hepsi | sıcak içecek için kulplu kap | GEÇTİ | |
| lx:Husten | hepsi | öksürük | GEÇTİ | |
| lx:absagen | hepsi | olmaz deyip randevuyu iptal etmek | GEÇTİ | |
| lx:Fieber | hepsi | hastayken yükselen vücut ısısı, ateş | GEÇTİ | |
| lx:Kerze | hepsi | yakınca ışık veren mum | GEÇTİ | |
| lx:zurückgeben | hepsi | aldığım şeyi geri vermek | GEÇTİ | |
| lx:Praxis | hepsi | doktorun hasta baktığı yer | GEÇTİ | |
| lx:backen | hepsi | hamur işini fırında pişirmek | GEÇTİ | |
| lx:Tablette | hepsi | yutarak aldığım küçük ilaç | GEÇTİ | |
| lx:aufschreiben | hepsi | unutmamak için kâğıda yazmak | GEÇTİ | |
| lx:Feierabend | hepsi | günlük işin bittiği zaman | GEÇTİ | |
| lx:Rathaus | parcalar[0].tr | meclis binası, Ankara'daki meclis gibi | GERİ | soldan sağa "meclis binası" çıkıyor: bu bana belediye binasını değil, ülkenin meclisini düşündürüyor |
| lx:Rathaus | diğer alanlar | şehrin yönetildiği bina | GEÇTİ | |
| lx:Advent | anlam_tr | dört pazar yeri mi, dört gün mü | GERİ | anlamadım: "pazar" hem gün hem alışveriş yeri, aynı kartlarda Noel pazarı da geçiyor |
| lx:Advent | diğer alanlar | Noelden önceki dönem | GEÇTİ | |
| lx:Adventskranz | hepsi | dört mumlu Noel öncesi çelengi | GEÇTİ | |
| lx:Bauch | hepsi | göğsün altı, karın | GEÇTİ | |
| lx:Bratwurst | hepsi | ızgarada pişen sosis | GEÇTİ | |
| lx:Dialekt | hepsi | bir bölgenin konuşma biçimi | GEÇTİ | |
| lx:Erkältung | hepsi | öksürük ve nezleli hafif hastalık | GEÇTİ | |
| lx:Geburtsdatum | hepsi | doğduğum gün, ay, yıl | GEÇTİ | |
| lx:Glühwein | hepsi | Noel pazarında içilen baharatlı sıcak şarap | GEÇTİ | |
| lx:Hals | hepsi | boğaz, bazen de boyun | GEÇTİ | |
| lx:Hausarzt | hepsi | hasta olunca ilk gittiğim doktor | GEÇTİ | |
| lx:Kinderpunsch | hepsi | alkolsüz sıcak meyve içeceği | GEÇTİ | |
| lx:Krankenkasse | hepsi | doktor masrafını ödeyen sigorta kurumu | GEÇTİ | |
| lx:Krankschreibung | anlam_tr | doktor hastaymış, bunu yazıyor gibi | GERİ | anlamadım: "doktorun hasta olduğunu" önce "doktor hasta" diye okunuyor |
| lx:Krankschreibung | diğer alanlar | işe gidemeyince gereken doktor kâğıdı | GEÇTİ | |
| lx:Mandel | hepsi | badem, boğazdaki bademcik de | GEÇTİ | |
| lx:Pfand | hepsi | kabı geri verince dönen para | GEÇTİ | |
| lx:Plätzchen | hepsi | Noelde yapılan küçük kurabiye | GEÇTİ | |
| lx:Schnupfen | hepsi | burun akıyor ve tıkanıyor | GEÇTİ | |
| lx:Semmel | hepsi | küçük yuvarlak ekmek | GEÇTİ | |
| lx:Senf | hepsi | sosisle yenen hardal | GEÇTİ | |
| lx:Sprechstunde | hepsi | doktorun hasta kabul ettiği saatler | GEÇTİ | |
| lx:Tüte | hepsi | alışverişte verilen poşet | GEÇTİ | |
| lx:Versichertenkarte | hepsi | doktorda gösterdiğim sigorta kartı | GEÇTİ | |
| lx:Weihnachtsfeier | hepsi | iş yerindeki Noel kutlaması | GEÇTİ | |
| lx:Weihnachtsmarkt | hepsi | Noelden önce meydanda kurulan pazar | GEÇTİ | |
| lx:Wichteln | anlam_tr | gizlice çekilen kişi kim, anlamadım | GERİ | anlamadım: "çekilen kişi" ne demek, tek okumada oturmadı |
| lx:Wichteln | diğer alanlar | aralıkta yapılan gizli hediye işi | GEÇTİ | |
| lx:dringend | hepsi | hemen yapılması gereken iş, acil | GEÇTİ | |
| lx:duzen | hepsi | birine sen demek | GEÇTİ | |
| lx:ein_bisschen | hepsi | az miktar, biraz | GEÇTİ | |
| lx:erkältet | hepsi | soğuk almış olmak | GEÇTİ | |
| lx:lieber | hepsi | bir seçeneği daha çok istemek | GEÇTİ | |
| lx:schwindelig | hepsi | başım dönüyor demenin yolu | GEÇTİ | |
| lx:sich_treffen | hepsi | sözleşip bir yerde buluşmak | GEÇTİ | |
| lx:siezen | ipucu_tr | siz de, yani sen de mi | GERİ | anlamadım: "önce siz de" önce "siz de öyle" diye okunuyor |
| lx:siezen | diğer alanlar | birine siz demek | GEÇTİ | |
| lx:zusagen | hepsi | davete geleceğimi bildirmek | GEÇTİ | |
| lx:stehen#2 | hepsi | bir şey bir yerde dik duruyor | GEÇTİ | |
| lx:Versprechen | hepsi | yapacağıma dair verdiğim söz | GEÇTİ | |
| lx:Schuh | hepsi | ayağa giyilen ayakkabı | GEÇTİ | |
| lx:Firma | hepsi | iş yapılan şirket | GEÇTİ | |
| lx:unbedingt | hepsi | mutlaka olmalı demek | GEÇTİ | |
| lx:schenken | hepsi | birine hediye vermek | GEÇTİ | |
| lx:einladen | hepsi | birini çağırmak, bazen de ısmarlamak | GEÇTİ | |
| lx:fremd | hepsi | bu yeri tanımıyorum demek | GEÇTİ | |
| lx:vermissen | hepsi | uzaktaki birini özlemek | GEÇTİ | |
| lx:Gericht | hepsi | tabakta gelen yemek, bir de mahkeme | GEÇTİ | |
| lx:links | hepsi | sol taraf | GEÇTİ | |
| lx:Geburtstag | hepsi | her yıl doğduğum gün | GEÇTİ | |
| lx:kaputt | hepsi | bir şey bozuk demek | GEÇTİ | |
| lx:gesund | hepsi | hasta değil, sağlıklı | GEÇTİ | |
| lx:gegenüber | hepsi | tam karşısında | GEÇTİ | |
| lx:ankommen | hepsi | gittiğim yere ulaşmak | GEÇTİ | |
| lx:Hose | hepsi | bacağa giyilen pantolon | GEÇTİ | |
| lx:rechts | hepsi | sağ taraf | GEÇTİ | |
| lx:Flasche | hepsi | sıvı konan kap, şişe | GEÇTİ | |
| lx:Küche | hepsi | yemek yapılan oda | GEÇTİ | |
| lx:Glückwunsch | hepsi | birini kutlama, tebrik | GEÇTİ | |
| lx:Kunde | hepsi | alışveriş yapan kişi | GEÇTİ | |
| lx:Aufgabe | hepsi | yapmam gereken iş | GEÇTİ | |
| lx:aufstehen | hepsi | yataktan ya da oturduğum yerden kalkmak | GEÇTİ | |
| lx:warm | hepsi | hoş bir sıcaklıkta | GEÇTİ | |
| lx:Insel | hepsi | çevresi su olan kara, ada | GEÇTİ | |
| lx:frühstücken | hepsi | sabah kahvaltı etmek | GEÇTİ | |
| lx:Messer | hepsi | kesmeye yarayan bıçak | GEÇTİ | |
| lx:bestellen | hepsi | istediğim şeyi sipariş etmek | GEÇTİ | |
| lx:unterschreiben | hepsi | belgenin altına imza atmak | GEÇTİ | |
| lx:fernsehen | hepsi | televizyon izlemek | GEÇTİ | |
| lx:See | hepsi | karayla çevrili büyük su, göl | GEÇTİ | |
| lx:teuer | hepsi | fiyatı yüksek | GEÇTİ | |
| lx:entlang | hepsi | yolu takip ederek gitmek | GEÇTİ | |
| lx:Bus | hepsi | yolcu taşıyan otobüs | GEÇTİ | |

## Sonuç

- Toplam alan: 503
- GEÇTİ: 495
- GERİ: 8 alan, 8 kart
- GERİ kimlikleri: lx:Stand, lx:Weihnachten, lx:Kollege, lx:Rathaus, lx:Advent, lx:Krankschreibung, lx:Wichteln, lx:siezen

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
