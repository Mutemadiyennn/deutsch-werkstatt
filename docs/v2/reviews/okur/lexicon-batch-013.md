# Okur kontrolü — lexicon parti 013 (OD-9.3)

Girdi: `batch-013.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak ve 14 kelimeden uzun cümle bulunmadı (en uzun cümle 13 kelime). Dilbilgisi terimi bulunmadı.

`parcalar` soldan sağa okundu (30 kart): hepsinde çıkan Türkçe kelimenin anlamını veriyor. Sınırda geçenler: `lx:Geldautomat` ("para makinesi"), `lx:Geheimzahl` ("gizli sayı"), `lx:Notaufnahme` ("acil kabul"), `lx:Wartenummer` ("bekleme numarası"). Yanlış yere götürmüyorlar, anlam alanıyla birlikte oturuyor.

Sınırda geçen diğer alanlar: `lx:Keine_Sorge!` `ne_zaman_tr` (iki parça da kime söylendiğini anlatıyor), `lx:um_…_zu` `ipucu_tr` (örnekle birlikte anlaşılıyor), `lx:auflegen` `ne_zaman_tr` (beklerken telefonu kapatmak akla yatıyor), `lx:Bereitschaftsdienst` `ipucu_tr` (tek soru: hangi numara).

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:Gleis | hepsi | trenin durduğu hat, peron | GEÇTİ | |
| lx:Anschluss | hepsi | inip bineceğim sonraki tren | GEÇTİ | |
| lx:Durchsage | hepsi | hoparlörden herkese yapılan duyuru | GEÇTİ | |
| lx:um_…_herum | hepsi | bir şeyin çevresinden dolaşmak | GEÇTİ | |
| lx:Fluss | hepsi | karada akan büyük su | GEÇTİ | |
| lx:Strand | hepsi | deniz kıyısındaki kumluk | GEÇTİ | |
| lx:Berg | hepsi | yerden yükselen büyük kayalık | GEÇTİ | |
| lx:Doppelzimmer | hepsi | otelde iki kişilik oda | GEÇTİ | |
| lx:Einzelzimmer | hepsi | otelde tek kişilik oda | GEÇTİ | |
| lx:Übernachtung | hepsi | bir yerde gece kalmak | GEÇTİ | |
| lx:Rezeption | hepsi | otelde gelenleri karşılayan masa | GEÇTİ | |
| lx:sich_beschweren | hepsi | memnun değilsem yetkiliye söylemek | GEÇTİ | |
| lx:Geldautomat | hepsi | kartla nakit çektiğim makine | GEÇTİ | |
| lx:Überweisung | hepsi | başka hesaba para göndermek | GEÇTİ | |
| lx:Bankkarte | hepsi | bankanın verdiği kart | GEÇTİ | |
| lx:Geheimzahl | hepsi | kartımın gizli numarası | GEÇTİ | |
| lx:Gebühr | hepsi | resmî işlem için ödenen para | GEÇTİ | |
| lx:überweisen | hepsi | parayı başka hesaba göndermek | GEÇTİ | |
| lx:abheben | hepsi | hesabımdan nakit almak | GEÇTİ | |
| lx:kostenlos | hepsi | para ödemeden alınan | GEÇTİ | |
| lx:Lebenslauf | hepsi | işe başvururken verdiğim hayat özetim | GEÇTİ | |
| lx:geboren | hepsi | nerede ve ne zaman doğduğumu söylemek | GEÇTİ | |
| lx:Kindergarten | hepsi | okuldan önce çocukların gittiği yer | GEÇTİ | |
| lx:Vorsatz | hepsi | kendime söz verdiğim şey | GEÇTİ | |
| lx:Silvester | hepsi | 31 Aralık ve o gece | GEÇTİ | |
| lx:um_…_zu | hepsi | bir işi ne için yaptığım | GEÇTİ | |
| lx:Keine_Sorge! | hepsi | telaşlanan birini sakinleştirmek | GEÇTİ | |
| lx:schneiden | hepsi | bıçak ya da makasla kesmek | GEÇTİ | |
| lx:Brief | hepsi | zarfla gönderilen yazı | GEÇTİ | |
| lx:verbinden | hepsi | telefonda arayanı başkasına aktarmak | GEÇTİ | |
| lx:abholen | hepsi | bir şeyi gidip almak | GEÇTİ | |
| lx:Angebot | ne_zaman_tr | ucuz ürünü usta çağırırken mi söylerim | GERİ | ifadeyle örtüşmüyor: anlam kutusu mağazadaki ucuz ürünü anlatıyor, usta çağırmanın bununla bağını kuramadım |
| lx:Nachbar | hepsi | yakınımda oturan kişi | GEÇTİ | |
| lx:kündigen | hepsi | sözleşmeyi resmen bitirmek | GEÇTİ | |
| lx:Sendung | hepsi | postayla yola çıkmış paket | GEÇTİ | |
| lx:Störung | ne_zaman_tr | bozuk cihazı birini rahatsız ederken mi söylerim | GERİ | ifadeyle örtüşmüyor: anlam kutusu bozuk cihazı anlatıyor, birini rahatsız etmenin bununla bağını kuramadım |
| lx:Krankenwagen | hepsi | hastayı hastaneye götüren araç | GEÇTİ | |
| lx:Antrag | hepsi | resmî daireye verilen istek yazısı | GEÇTİ | |
| lx:Behörde | hepsi | devletin resmî kurumu | GEÇTİ | |
| lx:auflegen | hepsi | telefon konuşmasını bitirmek | GEÇTİ | |
| lx:Versicherung | hepsi | zarar masrafını karşılayan kurum | GEÇTİ | |
| lx:Lieferung | hepsi | siparişin bana getirilmesi | GEÇTİ | |
| lx:Ankunft | hepsi | bir yere ulaşma anı | GEÇTİ | |
| lx:Paket | hepsi | postayla gelen büyük kutu | GEÇTİ | |
| lx:Parkplatz | hepsi | arabayı bıraktığım yer | GEÇTİ | |
| lx:zurückrufen | hepsi | beni arayanı sonra aramak | GEÇTİ | |
| lx:Patientin | hepsi | doktora giden kadın | GEÇTİ | |
| lx:Tropfen | hepsi | şişeden akan küçük sıvı parçası | GEÇTİ | |
| lx:Kaution | hepsi | ev kiralarken verilen güvence parası | GEÇTİ | |
| lx:Blutdruck | hepsi | kanın damarlara yaptığı basınç | GEÇTİ | |
| lx:Diebstahl | hepsi | başkasının eşyasını izinsiz götürmek | GEÇTİ | |
| lx:Gehalt | hepsi | iş yerinin her ay ödediği para | GEÇTİ | |
| lx:Kasse | hepsi | markette ödeme yaptığım yer | GEÇTİ | |
| lx:Notaufnahme | hepsi | hastanenin acil bölümü | GEÇTİ | |
| lx:Notruf | hepsi | acil durumda yardım telefonu | GEÇTİ | |
| lx:Zahnarzt | ipucu_tr | her kadın doktora Zahnärztin denir | GERİ | ifadeyle örtüşmüyor: kutu yalnızca "kadın doktor" diyor, her kadın doktora bu kelime deniyor gibi okunuyor |
| lx:Tankstelle | hepsi | arabaya yakıt aldığım yer | GEÇTİ | |
| lx:Feuerwehr | hepsi | yangını söndüren ekip | GEÇTİ | |
| lx:Hausmeister | hepsi | binanın bakımına bakan kişi | GEÇTİ | |
| lx:Nachbarin | hepsi | yakınımda oturan kadın | GEÇTİ | |
| lx:Päckchen | hepsi | paketten küçük, hafif gönderi | GEÇTİ | |
| lx:Friseur | hepsi | saç kesen kişi ve dükkânı | GEÇTİ | |
| lx:Wartezimmer | hepsi | doktoru beklediğim oda | GEÇTİ | |
| lx:Krankmeldung | hepsi | işe hasta olduğumu bildirmek | GEÇTİ | |
| lx:Attest | anlam_tr | doktorun kendi sağlığı mı, benimki mi | GERİ | anlamadım: "Doktorun sağlık durumun" önce "doktorun sağlık durumu" diye okunuyor |
| lx:Allergie | hepsi | vücudun bir şeye kötü tepkisi | GEÇTİ | |
| lx:Impfung | hepsi | hastalıktan koruyan iğne | GEÇTİ | |
| lx:Salbe | hepsi | cilde sürülen yumuşak ilaç | GEÇTİ | |
| lx:Nebenwirkung | hepsi | ilacın istenmeyen başka etkisi | GEÇTİ | |
| lx:Bereitschaftsdienst | hepsi | muayene saatleri dışında doktor hizmeti | GEÇTİ | |
| lx:Schmerzmittel | hepsi | ağrıyı azaltan ilaç | GEÇTİ | |
| lx:Halsschmerzen | hepsi | boğazımdaki ağrı | GEÇTİ | |
| lx:Kopfschmerzen | hepsi | başımdaki ağrı | GEÇTİ | |
| lx:Bauchschmerzen | hepsi | karnımdaki ağrı | GEÇTİ | |
| lx:Rückenschmerzen | hepsi | sırtımdaki ağrı | GEÇTİ | |
| lx:Schwindel | hepsi | etraf dönüyormuş gibi hissetmek | GEÇTİ | |
| lx:Übelkeit | hepsi | kusacakmış gibi hissetmek | GEÇTİ | |
| lx:Durchfall | hepsi | sık ve sulu dışkı | GEÇTİ | |
| lx:Ausländerbehörde | hepsi | yabancıların oturma işlerine bakan daire | GEÇTİ | |
| lx:Aufenthaltstitel | hepsi | bu ülkede kalma hakkı belgesi | GEÇTİ | |
| lx:Bürgerbüro | hepsi | belediyede kayıt ve belge yeri | GEÇTİ | |
| lx:Meldebescheinigung | hepsi | kayıtlı adresimi gösteren belge | GEÇTİ | |
| lx:Unterlagen | hepsi | bir iş için gereken kâğıtlar | GEÇTİ | |
| lx:Nachweis | hepsi | bir şeyin doğruluğunu gösteren belge | GEÇTİ | |
| lx:Frist | hepsi | işin bitmesi gereken son zaman | GEÇTİ | |
| lx:Mahnung | hepsi | ödenmemiş para için uyarı mektubu | GEÇTİ | |
| lx:Staatsangehörigkeit | hepsi | hangi ülkenin vatandaşı olduğum | GEÇTİ | |
| lx:Familienname | hepsi | ailenin ortak adı, soyadı | GEÇTİ | |
| lx:Geburtsort | hepsi | doğduğum şehir | GEÇTİ | |
| lx:Wartenummer | hepsi | dairede sıramı gösteren numara | GEÇTİ | |
| lx:Jobcenter | hepsi | iş arayana destek veren resmî daire | GEÇTİ | |
| lx:Dolmetscher | hepsi | konuşulanları çeviren kişi | GEÇTİ | |
| lx:beantragen | hepsi | resmî daireden yazılı istemek | GEÇTİ | |
| lx:verlängern | hepsi | bir şeyin süresini uzatmak | GEÇTİ | |
| lx:Vermieter | hepsi | evini kiraya veren kişi | GEÇTİ | |
| lx:Nebenkosten | hepsi | kiranın yanında ödenen ev giderleri | GEÇTİ | |
| lx:Schimmel | hepsi | nemde ve bayat yiyecekte oluşan leke | GEÇTİ | |
| lx:Zähler | hepsi | su ve elektriği ölçen alet | GEÇTİ | |
| lx:Briefkasten | hepsi | mektupların bırakıldığı kutu | GEÇTİ | |
| lx:Klingel | hepsi | kapıda bastığım düğme | GEÇTİ | |

## Sonuç

- Toplam alan: 507
- GEÇTİ: 503
- GERİ: 4 alan, 4 kart
- GERİ kimlikleri: lx:Angebot, lx:Störung, lx:Zahnarzt, lx:Attest

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
