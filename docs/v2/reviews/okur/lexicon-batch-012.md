# Okur kontrolü — lexicon parti 012 (OD-9.3)

Girdi: `batch-012.view.jsonl` (103 kart: parti 012 ve parti 011'den düzeltilmiş 3 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı (en uzun cümle 13 kelime). Dilbilgisi sözü olarak yalnızca `lx:Hunger` ipucundaki "yapı" kaldı.

`parcalar` soldan sağa okundu (34 kart): 33 kartta çıkan Türkçe kelimenin anlamını veriyor. `lx:Treppenhaus` geri döndü. Sınırda geçenler: `lx:ausgeben` ("dışarı vermek"), `lx:Unterschrift` ("alta yazı"), `lx:Trinkgeld` ("içme parası"), `lx:Grundschule` ("temel okul"), `lx:sich_trennen` ("kendini ayırmak"). Yanlış yere götürmüyorlar, anlam alanıyla birlikte oturuyor.

Parti 011'den gelen 3 kart (`lx:ausgeben`, `lx:Unterschrift`, `lx:Trinkgeld`) yeniden okundu, üçü de geçti.

İpucu kart kelimesini anmasa da aynı anlamın sınırını ya da aynı aileden bir kelimeyi veriyorsa geçti (`lx:Wand`, `lx:Urlaub`, `lx:Waschmaschine`, `lx:losfahren`). Kartla bağı olmayan ipucu geri döndü (`lx:Bad`, `lx:Biergarten`).

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:Überstunde | hepsi | normal saatten sonra çalıştığım saat | GEÇTİ | |
| lx:Tomate | hepsi | salataya konan kırmızı sebze | GEÇTİ | |
| lx:Apotheke | hepsi | ilaç aldığım dükkân | GEÇTİ | |
| lx:Unterkunft | hepsi | yolculukta gece kaldığım yer | GEÇTİ | |
| lx:Garantie | hepsi | bozulursa ücretsiz onarılma güvencesi | GEÇTİ | |
| lx:Techniker | hepsi | bozuk cihazı onaran kişi | GEÇTİ | |
| lx:Freut_mich! | hepsi | ilk tanışınca söylenen söz | GEÇTİ | |
| lx:ledig | hepsi | evli olmayan kişi | GEÇTİ | |
| lx:Käse | hepsi | sütten yapılan yiyecek, peynir | GEÇTİ | |
| lx:Fleisch | hepsi | hayvandan gelen yiyecek, et | GEÇTİ | |
| lx:Bäckerei | hepsi | ekmek ve pasta satılan dükkân | GEÇTİ | |
| lx:Bad | ipucu_tr | duş alınca başka söz söylenir | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kutuda Bad yok, yalnızca duş almak var |
| lx:Lampe | hepsi | odayı aydınlatan eşya | GEÇTİ | |
| lx:Miete | hepsi | ev için her ay ödenen para | GEÇTİ | |
| lx:Wand | hepsi | odanın yan duvarı | GEÇTİ | |
| lx:Wie_spät_ist_es? | hepsi | saatin kaç olduğunu sorma | GEÇTİ | |
| lx:Wetter | hepsi | dışarıdaki sıcaklık, yağmur, güneş | GEÇTİ | |
| lx:noch_nicht | hepsi | şimdiye kadar olmadı, sonra olabilir | GEÇTİ | |
| lx:Beruf | hepsi | geçinmek için yaptığım iş | GEÇTİ | |
| lx:Formular | hepsi | bilgilerimi yazdığım resmî kâğıt | GEÇTİ | |
| lx:Anmeldung | hepsi | yeni adresi resmî daireye bildirmek | GEÇTİ | |
| lx:Pass | hepsi | yolculukta kimliğimi gösteren belge | GEÇTİ | |
| lx:ausfüllen | hepsi | formdaki boşlukları yazarak tamamlamak | GEÇTİ | |
| lx:Gute_Besserung! | hepsi | hasta birine iyileş dileği | GEÇTİ | |
| lx:Haltestelle | hepsi | otobüsün yolcu aldığı yer | GEÇTİ | |
| lx:Kreuzung | hepsi | iki yolun kesiştiği yer | GEÇTİ | |
| lx:Ampel | hepsi | trafikteki kırmızı, sarı, yeşil ışık | GEÇTİ | |
| lx:U-Bahn | hepsi | yerin altından giden şehir treni | GEÇTİ | |
| lx:Straßenbahn | hepsi | şehirde raylarda giden taşıt | GEÇTİ | |
| lx:Fahrkarte | hepsi | otobüs ve tren bileti | GEÇTİ | |
| lx:abbiegen | hepsi | yolda başka yola dönmek | GEÇTİ | |
| lx:umsteigen | hepsi | inip başka taşıta binmek | GEÇTİ | |
| lx:Heizung | hepsi | evi ısıtan sistem, kalorifer | GEÇTİ | |
| lx:Waschmaschine | hepsi | çamaşır yıkayan makine | GEÇTİ | |
| lx:geöffnet | hepsi | dükkân şu an müşteri alıyor | GEÇTİ | |
| lx:geschlossen | hepsi | dükkân şu an açık değil | GEÇTİ | |
| lx:Rock | hepsi | belden aşağı giyilen etek | GEÇTİ | |
| lx:Pullover | hepsi | soğukta üste giyilen kalın kazak | GEÇTİ | |
| lx:Umkleidekabine | hepsi | mağazada kıyafet denenen küçük oda | GEÇTİ | |
| lx:anprobieren | hepsi | almadan önce üstümde denemek | GEÇTİ | |
| lx:Umzug | hepsi | bir evden başka eve geçmek | GEÇTİ | |
| lx:Stelle | hepsi | iş yerindeki pozisyon, iş | GEÇTİ | |
| lx:Regal | hepsi | eşya konan raflı mobilya | GEÇTİ | |
| lx:Keller | hepsi | binanın toprak altındaki katı | GEÇTİ | |
| lx:Treppenhaus | parcalar[1].tr | merdivenli bir ev | GERİ | soldan sağa "merdiven evi" çıkıyor: bu bana apartmanın merdiven bölümünü değil, merdivenli bir evi düşündürüyor |
| lx:Müll | hepsi | atılacak işe yaramaz şeyler | GEÇTİ | |
| lx:Hausordnung | hepsi | apartmanın yazılı kuralları | GEÇTİ | |
| lx:Kellner | hepsi | lokantada yemek getiren kişi | GEÇTİ | |
| lx:Speisekarte | hepsi | lokantadaki yemek listesi | GEÇTİ | |
| lx:Löffel | hepsi | çorba içtiğim kaşık | GEÇTİ | |
| lx:Gabel | hepsi | yemeğe batırılan sofra aleti | GEÇTİ | |
| lx:Hunger | ipucu_tr | susayınca bir şey söyleniyor, neyle aynı bilmiyorum | GERİ | anlamadım: "aynı yapı" neyle aynı, kutuda yok, "yapı" da dilbilgisi sözü gibi geliyor |
| lx:salzig | hepsi | yemekte tuz tadı var | GEÇTİ | |
| lx:Pause | hepsi | işe kısa süre ara vermek | GEÇTİ | |
| lx:Urlaub | hepsi | işe gitmeyip dinlendiğim zaman | GEÇTİ | |
| lx:Schicht | hepsi | işte belirli saatlerdeki çalışma, vardiya | GEÇTİ | |
| lx:Kantine | hepsi | iş yerinde yemek yenen yer | GEÇTİ | |
| lx:Drucker | hepsi | kâğıda yazı çıkaran makine | GEÇTİ | |
| lx:Verein | hepsi | ortak ilgiyle kurulan grup | GEÇTİ | |
| lx:Spiel | hepsi | iki takımın karşılaştığı maç | GEÇTİ | |
| lx:Fitnessstudio | hepsi | aletlerle spor yapılan salon | GEÇTİ | |
| lx:Schwimmbad | hepsi | herkesin yüzmeye gittiği havuzlu yer | GEÇTİ | |
| lx:sich_freuen_(auf/über) | hepsi | bir şeye sevinmek | GEÇTİ | |
| lx:sich_ärgern_(über) | hepsi | bir şey yüzünden sinirlenmek | GEÇTİ | |
| lx:sich_interessieren_(für) | hepsi | bir konuya ilgi duymak | GEÇTİ | |
| lx:sich_fühlen | hepsi | bedenim ve ruhum nasıl, söylemek | GEÇTİ | |
| lx:sich_anmelden | hepsi | adımı yazdırıp kaydolmak | GEÇTİ | |
| lx:sich_ausruhen | hepsi | yorulunca dinlenmek | GEÇTİ | |
| lx:sich_bewegen | hepsi | durmayıp bedenimi çalıştırmak | GEÇTİ | |
| lx:warten_(auf) | hepsi | biri gelsin diye beklemek | GEÇTİ | |
| lx:Grundschule | hepsi | çocukların gittiği ilk okul | GEÇTİ | |
| lx:Gymnasium | hepsi | üniversiteye hazırlayan okul | GEÇTİ | |
| lx:Abitur | hepsi | liseyi bitirirken girilen sınav | GEÇTİ | |
| lx:Fach | hepsi | matematik gibi okul dersi | GEÇTİ | |
| lx:Unterricht | hepsi | öğretmenin sınıfta ders anlatması | GEÇTİ | |
| lx:Zeugnis | hepsi | notlarımı gösteren okul belgesi | GEÇTİ | |
| lx:Gutschein | hepsi | para yerine kullanılan kâğıt, çek | GEÇTİ | |
| lx:Blumenstrauß | hepsi | bir araya getirilmiş çiçekler, buket | GEÇTİ | |
| lx:Kette | hepsi | boyna takılan süs, kolye | GEÇTİ | |
| lx:Ring | hepsi | parmağa takılan süs, yüzük | GEÇTİ | |
| lx:Schal | hepsi | boyna sarılan uzun kumaş | GEÇTİ | |
| lx:Feier | hepsi | özel günü birlikte kutlamak | GEÇTİ | |
| lx:Brauch | hepsi | toplulukta eskiden beri süren davranış | GEÇTİ | |
| lx:auspacken | hepsi | paketin içindekileri çıkarmak | GEÇTİ | |
| lx:Biergarten | ipucu_tr | alkolsüz elmalı gazlı içecek isteyebilirim | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kutuda yalnızca içecek önerisi var |
| lx:Picknick | ipucu_tr | piknikle aynı anlam, ck ile yazılır | GERİ | iki fikir var: hem anlamın aynı olması hem yazılışı |
| lx:Radtour | hepsi | bisikletle yapılan uzun gezi | GEÇTİ | |
| lx:ausschlafen | hepsi | yeterince uyuyup dinlenmek | GEÇTİ | |
| lx:losfahren | hepsi | taşıtla yola çıkmak | GEÇTİ | |
| lx:an_deiner_Stelle | hepsi | öneri verirken: senin yerinde olsam | GEÇTİ | |
| lx:hilfsbereit | hepsi | yardım etmeye istekli kişi | GEÇTİ | |
| lx:zuverlässig | hepsi | sözünü tutan, güvenilir kişi | GEÇTİ | |
| lx:sich_verlieben | hepsi | birine âşık olmak | GEÇTİ | |
| lx:sich_verstehen | hepsi | biriyle iyi geçinmek | GEÇTİ | |
| lx:sich_streiten | hepsi | biriyle sözlü tartışmak | GEÇTİ | |
| lx:sich_trennen | hepsi | ilişkiyi bitirip ayrılmak | GEÇTİ | |
| lx:sympathisch | hepsi | hoşuma giden, cana yakın kişi | GEÇTİ | |
| lx:Verkehr | hepsi | yoldaki araçların hareketi | GEÇTİ | |
| lx:Stau | hepsi | arabalar yolda durup bekliyor | GEÇTİ | |
| lx:Baustelle | hepsi | bir şeyin inşa edildiği yer | GEÇTİ | |
| lx:ausgeben | hepsi | bir şey için para harcamak | GEÇTİ | |
| lx:Unterschrift | hepsi | belgenin altına elle yazdığım adım | GEÇTİ | |
| lx:Trinkgeld | hepsi | hizmet için fiyatın üstüne verilen para | GEÇTİ | |

## Sonuç

- Toplam alan: 575
- GEÇTİ: 570
- GERİ: 5 alan, 5 kart
- GERİ kimlikleri: lx:Bad, lx:Treppenhaus, lx:Hunger, lx:Biergarten, lx:Picknick

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
