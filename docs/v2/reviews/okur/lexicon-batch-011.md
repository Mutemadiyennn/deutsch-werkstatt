# Okur kontrolü — lexicon parti 011 (OD-9.3)

Girdi: `batch-011.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca, dilbilgisi terimi ve 14 kelimeden uzun cümle bulunmadı.

`parcalar` soldan sağa okundu (19 kart): 15 kartta çıkan Türkçe kelimenin anlamını veriyor. `lx:abnehmen`, `lx:Fahrrad`, `lx:Werkstatt`, `lx:ausfallen` geri döndü. Sınırda geçenler: `lx:ausgeben` ("dışarı vermek"), `lx:aufwachsen` ("yukarı büyümek"), `lx:Bahnhof` ("tren avlusu"), `lx:Unterschrift` ("alta yazı"), `lx:Feiertag` ("kutlama günü"). Yanlış yere götürmüyorlar, anlam alanıyla birlikte oturuyor.

Anlamı geniş ama doğru olduğu için geçenler: `lx:Freundschaft` ("yakın bağ"), `lx:Apfel` ("yuvarlak meyve"). Üstteki `tr` kelimesiyle birlikte oturuyor.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:Restaurant | hepsi | parayla oturup yemek yenen yer | GEÇTİ | |
| lx:reparieren | hepsi | bozulan şeyi yeniden çalıştırmak | GEÇTİ | |
| lx:Meer | hepsi | kocaman tuzlu su, deniz | GEÇTİ | |
| lx:Gast | hepsi | eve çağrılan kişi, lokantada müşteri | GEÇTİ | |
| lx:studieren | hepsi | üniversitede bir bölüm okumak | GEÇTİ | |
| lx:Kurs | hepsi | birkaç derste bir şey öğrenmek | GEÇTİ | |
| lx:schwimmen | hepsi | kol bacakla suda ilerlemek | GEÇTİ | |
| lx:scharf | hepsi | ağız yakan tat, bıçakta keskin | GEÇTİ | |
| lx:Rechnung | hepsi | ödeyeceğim tutarın yazılı olduğu kâğıt | GEÇTİ | |
| lx:Kuchen | hepsi | fırında yapılan tatlı | GEÇTİ | |
| lx:Wunsch | hepsi | olmasını istediğim şey | GEÇTİ | |
| lx:Stuhl | hepsi | tek kişilik arkalıklı oturulan eşya | GEÇTİ | |
| lx:Sprache | hepsi | konuşup yazdığımız dil | GEÇTİ | |
| lx:Milch | hepsi | inekten gelen beyaz içecek | GEÇTİ | |
| lx:Vorschlag | hepsi | birine önerdiğim fikir | GEÇTİ | |
| lx:Hemd | hepsi | düğmeli yakalı üst giysi | GEÇTİ | |
| lx:Kleid | hepsi | kadınların tek parça giysisi | GEÇTİ | |
| lx:Größe | hepsi | bir şeyin büyüklüğü, giyside beden | GEÇTİ | |
| lx:gratulieren | hepsi | güzel bir olayda birini kutlamak | GEÇTİ | |
| lx:streng | hepsi | kuraldan ödün vermeyen kişi | GEÇTİ | |
| lx:Freundschaft | hepsi | iki kişinin yakın dostluğu | GEÇTİ | |
| lx:Jacke | hepsi | dışarıda üste giyilen kısa giysi | GEÇTİ | |
| lx:ausgeben | ipucu_tr | hem anlamı hem kelimenin yeri | GERİ | iki fikir var: hem cümlenin anlamı hem **aus** kelimesinin yeri |
| lx:ausgeben | diğer alanlar | bir şeye para harcamak | GEÇTİ | |
| lx:billig | hepsi | fiyatı düşük | GEÇTİ | |
| lx:hell | hepsi | bol ışıklı yer, renkte açık | GEÇTİ | |
| lx:Brot | hepsi | unla fırında yapılan temel yiyecek | GEÇTİ | |
| lx:abnehmen | parcalar[1].tr | aşağı almak, kilo alma gibi | GERİ | soldan sağa "aşağı almak" çıkıyor: kilo vermeyi vermiyor, "almak" bana kilo almayı düşündürüyor |
| lx:abnehmen | diğer alanlar | kilo vermek, telefonu açmak | GEÇTİ | |
| lx:leihen | hepsi | geri alacağım şeyi birine vermek | GEÇTİ | |
| lx:Mantel | hepsi | soğukta giyilen uzun kalın giysi | GEÇTİ | |
| lx:Schrank | hepsi | eşya konan kapaklı mobilya | GEÇTİ | |
| lx:empfehlen | hepsi | beğendiğim şeyi birine önermek | GEÇTİ | |
| lx:lecker | hepsi | yemeğin tadı güzel | GEÇTİ | |
| lx:Heimat | hepsi | kendimi ait hissettiğim yer | GEÇTİ | |
| lx:aussteigen | hepsi | taşıttan inmek | GEÇTİ | |
| lx:umziehen | hepsi | başka bir eve geçmek | GEÇTİ | |
| lx:Ei | hepsi | tavuğun yumurtası | GEÇTİ | |
| lx:Konto | hepsi | bankada paramın durduğu hesap | GEÇTİ | |
| lx:eröffnen | hepsi | yeni bir şeyi ilk kez açmak | GEÇTİ | |
| lx:Prüfung | hepsi | bilgimi ölçen sınav | GEÇTİ | |
| lx:aufwachsen | hepsi | çocukluğumu geçirip yetiştiğim yer | GEÇTİ | |
| lx:Tunnel | hepsi | yerin altından geçen yol | GEÇTİ | |
| lx:pünktlich | hepsi | söylenen saatte orada olmak | GEÇTİ | |
| lx:Training | hepsi | spor için düzenli çalışma | GEÇTİ | |
| lx:Ausweis | hepsi | kim olduğumu gösteren resmî kart | GEÇTİ | |
| lx:einkaufen | hepsi | gerekli şeyleri dükkândan almak | GEÇTİ | |
| lx:Kilo | hepsi | bin gramlık ağırlık birimi | GEÇTİ | |
| lx:Kindheit | hepsi | çocuk olduğum yıllar | GEÇTİ | |
| lx:regnen | hepsi | yağmur yağması | GEÇTİ | |
| lx:Jugend | hepsi | genç olduğum yıllar | GEÇTİ | |
| lx:vorschlagen | hepsi | birine bir fikir sunmak | GEÇTİ | |
| lx:Note | hepsi | okulda sınavda aldığım not | GEÇTİ | |
| lx:Apfel | hepsi | ağaçta yetişen yuvarlak meyve | GEÇTİ | |
| lx:Hausaufgabe | hepsi | öğretmenin evde yaptırdığı çalışma | GEÇTİ | |
| lx:Fahrrad | parcalar[1].tr | sürme tekerleği, bir araç parçası | GERİ | soldan sağa "sürme tekerleği" çıkıyor: bu bana taşıtı değil, bir tekerleği düşündürüyor |
| lx:Fahrrad | diğer alanlar | pedallı iki tekerlekli taşıt | GEÇTİ | |
| lx:Bahnhof | hepsi | trenlerin kalkıp geldiği yer | GEÇTİ | |
| lx:Durst | hepsi | su içme ihtiyacı | GEÇTİ | |
| lx:Ausbildung | hepsi | mesleği işte ve okulda öğrenmek | GEÇTİ | |
| lx:Flur | hepsi | odaları bağlayan geçit | GEÇTİ | |
| lx:aufräumen | hepsi | dağınık yeri düzene sokmak | GEÇTİ | |
| lx:Führerschein | hepsi | araba kullanma izni belgesi | GEÇTİ | |
| lx:Aussicht | hepsi | bir yerden görünen güzel görüntü | GEÇTİ | |
| lx:Teppich | hepsi | yere serilen kalın örtü | GEÇTİ | |
| lx:schüchtern | hepsi | yabancıyla konuşmaktan çekinen kişi | GEÇTİ | |
| lx:Rezept | hepsi | doktorun ilaç kâğıdı, yemek tarifi | GEÇTİ | |
| lx:Ausflug | hepsi | bir günlük gezme | GEÇTİ | |
| lx:Amt | hepsi | devletin işlem yaptığı büro | GEÇTİ | |
| lx:Unterschrift | anlam_tr | belgeye adımı atmak, adımı söylemek mi | GERİ | anlamadım: "attığın adını söyler" önce "adını söylüyor" diye okunuyor, ad atmak da oturmadı |
| lx:Unterschrift | diğer alanlar | belgeye atılan imza | GEÇTİ | |
| lx:vorhaben | hepsi | yakında yapmayı düşündüğüm şey | GEÇTİ | |
| lx:Verspätung | hepsi | bir şeyin geç kalması | GEÇTİ | |
| lx:Mannschaft | hepsi | birlikte oynayan sporcu grubu | GEÇTİ | |
| lx:Bargeld | hepsi | elde taşınan kâğıt ve madenî para | GEÇTİ | |
| lx:wandern | hepsi | doğada uzun yürümek | GEÇTİ | |
| lx:Beschwerde | hepsi | memnun olmadığımı bildirmek | GEÇTİ | |
| lx:Sofa | hepsi | birkaç kişilik yumuşak oturma mobilyası | GEÇTİ | |
| lx:Werkstatt | parcalar[0].tr | iş yeri, yani çalıştığım herhangi yer | GERİ | soldan sağa "iş yeri" çıkıyor: bu bana tamirhaneyi değil, herhangi bir işyerini düşündürüyor |
| lx:Werkstatt | diğer alanlar | arabanın tamir edildiği yer | GEÇTİ | |
| lx:Gemüse | hepsi | yemeklik bitkiler, sebze | GEÇTİ | |
| lx:ausfallen | parcalar[1].tr | dışarı düşmek, bir yerden düşmek | GERİ | soldan sağa "dışarı düşmek" çıkıyor: bu bana iptal olmayı değil, bir yerden düşmeyi düşündürüyor |
| lx:ausfallen | diğer alanlar | planlanan şey yapılmıyor | GEÇTİ | |
| lx:geradeaus | hepsi | hiç dönmeden ileri gitmek | GEÇTİ | |
| lx:Trinkgeld | ipucu_tr | öderken üstü kalsın demek | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kutuda yalnızca **Stimmt so** anlatılıyor |
| lx:Trinkgeld | diğer alanlar | fiyatın üstüne verilen para | GEÇTİ | |
| lx:Rente | hepsi | çalışmayı bıraktıktan sonraki dönem, maaşı | GEÇTİ | |
| lx:einpacken | hepsi | bir şeyi paketin içine koymak | GEÇTİ | |
| lx:reservieren | hepsi | bir yeri önceden kendime ayırtmak | GEÇTİ | |
| lx:Banane | hepsi | sarı kabuklu uzun meyve | GEÇTİ | |
| lx:Besprechung | hepsi | iş yerinde konuşma toplantısı | GEÇTİ | |
| lx:Studium | hepsi | üniversitede okunan yıllar | GEÇTİ | |
| lx:regelmäßig | hepsi | belli aralıklarla tekrar eden | GEÇTİ | |
| lx:Supermarkt | hepsi | yiyecek satan büyük dükkân | GEÇTİ | |
| lx:Feiertag | hepsi | herkesin tatil yaptığı özel gün | GEÇTİ | |
| lx:Chefin | hepsi | iş yerini yöneten kadın | GEÇTİ | |
| lx:Hobby | hepsi | boş zamanda zevkle yaptığım iş | GEÇTİ | |
| lx:Kollegin | hepsi | aynı yerde çalıştığım kadın | GEÇTİ | |
| lx:inklusive | hepsi | fiyatın içinde | GEÇTİ | |
| lx:Geschwister | hepsi | aynı anne babanın çocukları | GEÇTİ | |
| lx:Ausstellung | hepsi | eserlerin gösterildiği etkinlik | GEÇTİ | |
| lx:Freizeit | hepsi | iş dışındaki serbest zamanım | GEÇTİ | |
| lx:Mathe | hepsi | matematik dersinin kısası | GEÇTİ | |
| lx:Balkon | hepsi | binadan dışarı çıkan açık alan | GEÇTİ | |
| lx:Verkäufer | hepsi | dükkânda ürün satan kişi | GEÇTİ | |
| lx:geduldig | hepsi | kızmadan bekleyip dayanan kişi | GEÇTİ | |
| lx:arbeitslos | hepsi | işi olmayan kişi | GEÇTİ | |

## Sonuç

- Toplam alan: 499
- GEÇTİ: 492
- GERİ: 7 alan, 7 kart
- GERİ kimlikleri: lx:ausgeben, lx:abnehmen, lx:Fahrrad, lx:Unterschrift, lx:Werkstatt, lx:ausfallen, lx:Trinkgeld

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
