# Omurga: yazar notları

Dosya: `content/v2/curriculum/omurga.json`. Üretici: `uret.py` (JSON ve iki nottaki üretilen bölümler ondan çıkar; elle değiştirilmez).

## Okur 1. tur sonrası

Girdi: `docs/v2/reviews/okur/omurga.md` (212 satırdan 49 geri dönüş, okuma notu geri döner).
Yapı değişmedi: kimlikler, dil noktaları, kartlar, `requires`, süreler, kapsam aynı. Yalnız metin alanları değişti; denetimle karşılaştırıldı.

### Kökler ve ne yapıldı

1. **`kapi_tr` iki fikir taşıyordu.** Ayrıldı: `kapi_tr` konuşma sınavı, yeni `kulak_kapi_tr` dinleme sınavı. İkisi de tek cümle, en çok 14 kelime, "yaparsın" biçiminde bir fiille biter. 52 hafta × 2 satır yeniden yazıldı. "Kapı", "Kulak:", "sahne", "sürpriz", "kademe", "kesit", "kaynaklı", "4/3/2", dosya adı ve noktalı virgül görünen satırlardan çıktı. Teknik kalan (seviye sınavının üç durumu, kayıt karşılaştırması, beklenmedik gelişme, kaynak, birim içi ek işler) öğrenciye gösterilmeyen `kapi_ek` alanına taşındı.
   - Seviye sınavları (8, 24, 52): konuşma satırı ortak, "Uygulamada hiç karşılaşmadığın üç yeni durumda yardımsız konuşursun." Üç durum `kapi_ek.durumlar`'da.
   - 4/3/2 (15, 41): "üç kez, her seferinde daha kısa anlatırsın".
   - Beklenmedik gelişme açıkça yazıldı (9, 10, 11, 13, 14, 28, 37, 46: "istediğin saat doluysa", "fişin olmadan" gibi).
2. **`gorev_tr` (14 satır):** hastalık ya da gerçek sorun gerektirenler gerçek yapılabilir işe çevrildi (12, 27, 29, 39, 49). Tekrarlar giderildi (13 ve 30 ikisi de değişti; 51 artık 26'dan farklı). 8 ve 52 somut. Okurun "geçti ama not" dediği 21, 24, 47 de düzeltildi.
3. **`yapabiliyorum_tr` (7 satır):** 8, 15, 20, 52 okurun gerekçesine göre. "Görmediğim" kalktı; 8, 24 ve 52 seviye sınavının üç durumunu somut söyler. 24 (aynı "görmediğim" sorunu), 14 ("sıramı anlarım") ve 51 ("süresiyle denerim") okur notuna göre.
4. **Gün başlıkları (38 gün):** okurun 16 günü ve aynı kurala takılan diğerleri: iki konulu (8, 11, 23, 33, 52), yalnız Almanca (22, 32), üç noktalı (17, 31, 36), "fiil" terimli (9, 15, 29, 30), "kapı" sözlü sınav günleri (14, 21, 28, 35, 42, 49, 55, 56). Tek konu, terim yok, her başlıkta Türkçe. 31. gün öğrencinin cinsiyetini sabitlemesin diye soru biçiminde ("Was sind Sie von Beruf?"). Dersler (`dersler`) değişmedi.
5. **Okuma notu `taslak.md` yeniden yazıldı:** "PM'e sorular" en başta ve kimliksiz; kısa bölümler; en çok 3 sütunlu küçük tablolar; kod bloğu yok; 12 ay bölümü, her haftada dört satır (yapabilirim, dışarıda, konuşma sınavı, dinleme sınavı). Ay bölümleri `uret.py`'den üretilir. Teknik bölümler yeni `teknik.md`'ye taşındı (gün başlıkları tablosu da üretilir).
6. **`durum.tr` ve `kol_mekan.tr`:** tırnak içi Almanca, üç nokta, "M1", "prova", "kademe", "kaynaklı", "sahne" çıktı. A2 ve B1 birim başlıkları noktalı virgül yerine nokta ile birleşir. B1 birim önerilerinden iki başlıktaki parantez çıktı.

`denetim.py`'ye eklenenler: `kulak_kapi_tr` varlığı; görünen alanlarda (yapabiliyorum, görev, iki sınav satırı, `durum.tr`, `kol_mekan.tr`, gün başlıkları) noktalı virgül, üç nokta, tırnak, `.json`, M1–M4 ve iç söz yokluğu; iki sınav satırında tek cümle ve 14 kelime sınırı; fiille bitme (uyarı); gün başlığında eğik çizgi; seviye sınavında "üç yeni durum" ve `kapi_ek.durumlar` = 3. Eski "Kulak" ve "daha önce görülmemiş üç sözlü durum" metin kuralları kalktı. Eski JSON'da 404 hata yakalıyor.

Sonuç: `denetim.py` 0 hata, 0 uyarı. `npm run content:validate` 0 hata (142 uyarı, hiçbiri omurgadan değil).

### Hafta hafta (eski → yeni)

Her haftada `kapi_tr` ikiye ayrıldı: `kapi_tr` (konuşma) ve `kulak_kapi_tr` (dinleme). Eski satırın teknik kalanı `kapi_ek`'e taşındı.

#### Hafta 1
- kapı (eski): Hafta sonu testi (m1/hafta-sonu-testi.json). Kulak: yeni kısa bir kayıtta gün ve saati yakalarsın.
  - konuşma → **Yedinci gün Frau Huber'i arar, adını söyler ve randevu istersin.**
  - dinleme → **Yeni kısa bir kayıtta gün ve saati duyup yazarsın.**
  - kapi_ek: kaynak: m1/hafta-sonu-testi.json (12 madde)
- durum.tr: M1 provaları: gün pazarlığı, fiyat, numara, saat, tarih, kendini tanıtma → **Randevu için gün ve saat konuşmak, fiyat, numara, tarih ve kendini tanıtmak**

#### Hafta 2
- kapı (eski): Fırın sahnesini yardımsız oynarsın: iki ürün, sayı, fiyat. Kulak: hızlı söylenen bir fiyatı duyup yazarsın.
  - konuşma → **Fırında yardımsız iki şey ister, sayısını ve fiyatını sorarsın.**
  - dinleme → **Hızlı söylenen bir fiyatı duyup yazarsın.**
- durum.tr: Fırında sipariş: 'Ich hätte gern …', 'Sonst noch was?'; tanışmada du ve Sie → **Fırında sipariş vermek ve tanışırken samimi ya da resmî hitap etmek**
- kol_mekan.tr: Gerçek Görevler panosu açılır (ilk dış görev) → **Gerçek Görevler panosu ilk dış görevle açılır**

#### Hafta 3
- kapı (eski): Muayenehaneyi arama provası: ad, heceleme, gün, saat. Kulak: Frau Huber'in hızlı sesli mesajından gün ve saati yazarsın.
  - konuşma → **Telefonda Frau Huber'e adını hecelersin, gün ve saati söylersin.**
  - dinleme → **Frau Huber'in hızlı sesli mesajından gün ve saati yazarsın.**
- durum.tr: Muayenehaneyi aramak (Frau Huber): ad, heceleme, gün, saat; 'Könnten Sie das wiederholen?' → **Muayenehaneyi aramak: Frau Huber'e adını hecelemek, gün ve saat konuşmak, tekrar istemek**

#### Hafta 4
- kapı (eski): Merdivende Frau Brandl sahnesi: kim olduğunu, nerede oturduğunu, evini anlatırsın. Kulak: Herr Pichler'in duyurusunda ne yapman gerektiğini söylersin.
  - konuşma → **Merdivende Frau Brandl'a kim olduğunu, nerede oturduğunu ve evini anlatırsın.**
  - dinleme → **Herr Pichler'in duyurusunu dinleyip senden ne istediğini söylersin.**
- durum.tr: Merdivende Frau Brandl; Herr Pichler'in kısa duyurusu; ev ilanı → **Merdivende Frau Brandl ile tanışmak, Herr Pichler'in duyurusu ve ev ilanı**

#### Hafta 5
- kapı (eski): Mola sahnesi: Tobi ile du, Herr Wimmer ile Sie; yarınki planını anlatırsın. Kulak: bir otobüs anonsunda saati ve hattı yakalarsın.
  - konuşma → **Molada yarınki planını önce Tobi'ye samimi, sonra Herr Wimmer'e kibarca anlatırsın.**
  - dinleme → **Bir otobüs anonsunda hangi otobüsün kaçta kalktığını söylersin.**
- durum.tr: İş yerinde ilk gün: Tobi 'du', Herr Wimmer 'Sie'; günün planı, davet; otobüs → **İş yerinde ilk gün: Tobi ile samimi, Herr Wimmer ile resmî konuşmak, günün planı, davet ve otobüs**

#### Hafta 6
- kapı (eski): Hafta sonunu üç cümleyle anlatırsın; kaydını bir hafta önceki kaydınla yan yana dinlersin. Kulak: kısa bir hikâyeyi dinleyip üç cümleyle yeniden anlatırsın.
  - konuşma → **Hafta sonunda ne yaptığını üç cümleyle anlatırsın.**
  - dinleme → **Kısa bir hikâyeyi dinleyip üç cümleyle yeniden anlatırsın.**
  - kapi_ek: kayit_karsilastirma: konuşma kaydı bir hafta önceki kayıtla yan yana dinlenir (#56 madde 9)
- durum.tr: Pazartesi molası: 'Wie war dein Wochenende?'; dört yeni çalışma biçimi → **Pazartesi molasında hafta sonunu anlatmak**

#### Hafta 7
- kapı (eski): Muayene sahnesi: şikâyet, ne zamandan beri, doktorun bir talimatını tekrarlarsın. Kulak: eczacının talimatından kaç kez ve ne zaman alacağını söylersin.
  - konuşma → **Dr. Weber'e neyin ne zamandan beri ağrıdığını anlatırsın.**
  - dinleme → **Eczacının talimatından ilacı günde kaç kez ve ne zaman alacağını söylersin.**
  - kapi_ek: not: muayenede doktorun bir talimatını tekrarlamak da istenir
- durum.tr: Dr. Weber'de muayene; Vils-Apotheke'de ilaç ve kullanım → **Dr. Weber'de muayene, Vils-Apotheke'de ilaç almak ve kullanımını sormak**

#### Hafta 8
- yapabiliyorum: Görmediğim gündelik durumlarda derdimi Almanca anlatırım. → **Telefonda masa ayırtır, dükkânda ürün sorar, yeni biriyle tanışırım.**
- görev: Dışarıda bir işi baştan sona yalnız Almanca hallederim. → **Markette aradığım bir ürünün nerede olduğunu Almanca sorarım.**
- kapı (eski): A1 seviye kapısı: daha önce görülmemiş üç sözlü durum (telefonda masa ayırtmak, dükkânda ürün sormak, yeni biriyle tanışmak). Kulak: hiç duymadığın iki kısa kayıtta ana fikir ve bir ayrıntı.
  - konuşma → **Uygulamada hiç karşılaşmadığın üç yeni durumda yardımsız konuşursun.**
  - dinleme → **Hiç duymadığın iki kısa kayıtta ana fikri ve bir ayrıntıyı söylersin.**
  - kapi_ek: durumlar: telefonda masa ayırtmak, dükkânda ürün sormak, yeni biriyle tanışmak
- durum.tr: A1 pekiştirme ve seviye kapısı → **A1 tekrarı ve seviye sınavı**

#### Hafta 9
- kapı (eski): Frau Huber ile randevu rol oyunu; sürpriz: istediğin saat dolu. Kulak: hızlı bir mola sohbetinde kimin hafta sonu ne yaptığını söylersin.
  - konuşma → **Frau Huber'den randevu alırsın, istediğin saat doluysa başka bir saat bulursun.**
  - dinleme → **Hızlı bir mola sohbetinde kimin hafta sonu ne yaptığını söylersin.**
  - kapi_ek: surpriz: istenen saat dolu
- durum.tr: Doktordan telefonla randevu almak; Hafta sonunu anlatmak; Molada küçük sohbet etmek → **Doktordan telefonla randevu almak. Hafta sonunu anlatmak. Molada küçük sohbet etmek**
- kol_mekan.tr: Gelen arama kademe 1 ve mola sohbeti açılır → **Telefonda sana gelen ilk aramalar ve mola sohbeti açılır**

#### Hafta 10
- kapı (eski): Randevu kaydırma; sürpriz: önerilen gün de uymuyor. Kulak: sesli okunan bir apartman duyurusundan ne zaman ne olacağını söylersin.
  - konuşma → **Randevunu telefonla başka güne alırsın, önerilen gün uymazsa yeni gün istersin.**
  - dinleme → **Sesli okunan bir apartman duyurusundan ne zaman ne olacağını söylersin.**
  - kapi_ek: surpriz: önerilen gün de uymuyor
- durum.tr: Randevuyu kaydırmak ve iptal etmek; Komşuyla rica ve küçük sorun konuşmak; Apartman duyurusunu ve ilanı anlamak → **Randevuyu kaydırmak ve iptal etmek. Komşuyla rica ve küçük sorun konuşmak. Apartman duyurusunu ve ilanı anlamak**

#### Hafta 11
- kapı (eski): Kasada sürpriz: kart çalışmıyor, Pfand soruluyor. Kulak: market anonsundan hangi ürünün indirimde olduğunu söylersin.
  - konuşma → **Market kasasında kartın çalışmayınca başka bir ödeme yolu sorarsın.**
  - dinleme → **Market anonsundan hangi ürünün indirimde olduğunu söylersin.**
  - kapi_ek: surpriz: kart çalışmıyor; kasada Pfand (depozito) soruluyor
- durum.tr: Fırında ve kafede sipariş vermek; Markette ürün sormak, kasada konuşmak → **Fırında ve kafede sipariş vermek. Markette ürün sormak, kasada konuşmak**

#### Hafta 12
- görev: Doktorda ya da eczanede şikâyetimi Almanca anlatırım. → **Eczanede nezleye karşı ne önerdiklerini sorarım.**
- kapı (eski): Dr. Weber muayenesi: şikâyet, ne zamandan beri, talimatı tekrar. Kulak: doktorun hızlı açıklamasından iki talimatı yakalarsın.
  - konuşma → **Dr. Weber'in sorularına cevap verip şikâyetini ayrıntılı anlatırsın.**
  - dinleme → **Doktorun hızlı açıklamasından iki talimatı yakalayıp söylersin.**
- durum.tr: Şikâyetini anlatmak; Muayenede doktorun söylediklerini anlamak → **Şikâyetini anlatmak. Muayenede doktorun söylediklerini anlamak**

#### Hafta 13
- görev: İş yerinde izin ya da vardiya değişikliği sorarım. → **İş yerinde hastalığı kime ve nasıl bildireceğimi sorarım.**
- kapı (eski): Sabah işi arayıp hasta olduğunu söylersin; sürpriz: şef rapor ister. Kulak: eczanedeki kullanım talimatından doğru seçeneği seçersin.
  - konuşma → **Sabah işi arayıp hasta olduğunu ve raporu ne zaman getireceğini söylersin.**
  - dinleme → **Şefin sesli mesajından raporu ne zamana kadar getireceğini söylersin.**
  - kapi_ek: surpriz: şef rapor ister; not: eczanedeki kullanım talimatından doğru seçeneği seçmek birim içinde
- durum.tr: Eczanede ilaç istemek ve kullanımı sormak; Hasta olduğunu bildirmek, rapor almak; İzin ve vardiya değişikliği istemek → **Eczanede ilaç istemek ve kullanımı sormak. Hasta olduğunu bildirmek, rapor almak. İzin ve vardiya değişikliği istemek**

#### Hafta 14
- yapabiliyorum: Bürgerbüro'da sıramı ve gereken belgeleri anlarım. → **Bürgerbüro'da sıramın geldiğini ve gereken belgeleri anlarım.**
- kapı (eski): Bürgerbüro sahnesi; sürpriz: bir belge eksik. Kulak: numara çağırma anonsunu ve memurun istediğini yakalarsın.
  - konuşma → **Bürgerbüro'da işini anlatır, eksik bir belge için ne yapacağını sorarsın.**
  - dinleme → **Numara çağırma anonsunu ve memurun senden istediğini duyup söylersin.**
  - kapi_ek: surpriz: bir belge eksik
- durum.tr: Bürgerbüro'da sırayı ve evrakı anlamak; Adres kaydı yaptırmak ve form doldurmak → **Bürgerbüro'da sırayı ve evrakı anlamak. Adres kaydı yaptırmak ve form doldurmak**

#### Hafta 15
- yapabiliyorum: Bir gecikmeyi nedeniyle birlikte açıklarım. → **Geç kaldığımı ve neden geç kaldığımı söylerim.**
- kapı (eski): Toplantıya geç kalma sahnesi; aynı özeti 4, 3, 2 dakikada anlatırsın. Kulak: Herr Wimmer'in hızlı talimatını iki cümleyle özetlersin.
  - konuşma → **Toplantıya neden geç kaldığını üç kez, her seferinde daha kısa anlatırsın.**
  - dinleme → **Herr Wimmer'in hızlı talimatını dinleyip iki cümleyle özetlersin.**
  - kapi_ek: not: akıcılık 4/3/2: aynı anlatım 4, 3, 2 dakikada (dn:akicilik-432)
- durum.tr: Hata ya da gecikmeyi bildirmek, özür dilemek; Kendini ve işini anlatmak → **Hata ya da gecikmeyi bildirmek, özür dilemek. Kendini ve işini anlatmak**

#### Hafta 16
- kapı (eski): Kalorifer arızasını telefonda anlatırsın, sonra bir daveti kibarca reddedersin. Kulak: sesli mesajda kim, ne zaman, nerede.
  - konuşma → **Bir daveti kibarca reddeder, nedenini söyler ve başka bir gün önerirsin.**
  - dinleme → **Bir sesli mesajı dinleyip kim, ne zaman ve nerede sorularını cevaplarsın.**
  - kapi_ek: not: kalorifer arızasını Herr Pichler'e telefonda anlatmak (telefon-4) birim içinde
- durum.tr: Davet etmek, kabul etmek, kibarca reddetmek; Evdeki arızayı telefonla bildirmek → **Davet etmek, kabul etmek, kibarca reddetmek. Evdeki arızayı telefonla bildirmek**
- kol_mekan.tr: Gelen arama: Herr Pichler (ev) → **Telefon: Herr Pichler arar**

#### Hafta 17
- kapı (eski): Kalabalıkta Bairisch: Frau Brandl'ın üç kaynaklı sözünün anlamını söylersin. Kulak: hızlı kademede yutulan sesleri tam biçimiyle yazarsın.
  - konuşma → **Hızlı konuşan Frau Brandl'ı durdurup yavaş ve tekrar söylemesini istersin.**
  - dinleme → **Frau Brandl'ın Bavyera ağzıyla söylediği üç sözün anlamını söylersin.**
  - kapi_ek: not: Bairisch sözler yalnız WORLD §5'ten (kaynaklı); hızlı konuşmada yutulan sesleri tam biçimiyle yazmak da ölçülür
- durum.tr: Hızlı konuşanı durdurmak, anladığını kontrol etmek; Bavyera ağzında sık sözleri tanımak → **Hızlı konuşanı durdurmak, anladığını kontrol etmek. Bavyera ağzında sık sözleri tanımak**
- kol_mekan.tr: Kulak Salonu: Bairisch kademesi açılır → **Kulak Salonu'nda Bavyera ağzı bölümü açılır**

#### Hafta 18
- kapı (eski): Luka'nın koltuğunda istediğin kesimi tarif edip sohbete katılırsın. Kulak: bir aletin nasıl kullanıldığını anlatan kaydı anlarsın.
  - konuşma → **Kuaförde Luka'ya istediğin kesimi tarif edersin.**
  - dinleme → **Bir aletin kullanımını anlatan kayıttan adımları sırayla söylersin.**
  - kapi_ek: not: koltukta Luka'nın sohbetine katılmak da istenir
- durum.tr: Kuaförde istediğini anlatmak; Spor salonunda üyelik ve aletler → **Kuaförde istediğini anlatmak. Spor salonunda üyelik ve aletler**

#### Hafta 19
- kapı (eski): Tren iptal: anonsu anlarsın, başka yol sorarsın, mesajla haber verirsin. Kulak: gürültülü bir anonsta peron ve saat.
  - konuşma → **Tren iptal olunca istasyonda başka bir yolu sorarsın.**
  - dinleme → **Gürültülü bir anonsta peronu ve saati duyup söylersin.**
  - kapi_ek: not: gecikmeyi kısa mesajla haber vermek (yazma) birim içinde
- durum.tr: İstasyon anonslarını anlamak; Kısa mesaj okumak ve yazmak → **İstasyon anonslarını anlamak. Kısa mesaj okumak ve yazmak**

#### Hafta 20
- yapabiliyorum: Telefon menüsünü geçip istediğim bilgiyi alırım. → **Bir şirketi aradığımda otomatik sesi anlayıp doğru tuşa basarım.**
- kapı (eski): Menülü arama ve iş talimatını kibar soruyla netleştirme. Kulak: menü anonsunda doğru tuşu seçersin.
  - konuşma → **Bankayı arar, görevliye hesabınla ilgili bir bilgiyi sorarsın.**
  - dinleme → **Otomatik sesin söylediklerinden hangi tuşa basacağını seçersin.**
  - kapi_ek: not: iş talimatını kibar bir soruyla netleştirmek (is-2) birim içinde
- durum.tr: Telefonla bilgi almak ve menüyü geçmek; İş talimatını anlamak ve sormak → **Telefonla bilgi almak ve menüyü geçmek. İş talimatını anlamak ve sormak**
- kol_mekan.tr: Gelen arama kademe 2 → **Telefonda sana gelen aramalar biraz zorlaşır**

#### Hafta 21
- görev: Posta kutumdaki bir mektubun ne istediğini Almanca söylerim. → **Posta kutuma gelen bir mektubun ne istediğini Almanca not ederim.**
- kapı (eski): Kargo bildirimi ve resmî mektup: ne, ne zamana kadar, nereye. Kulak: kuryenin sesli mesajından paketin nerede olduğunu söylersin.
  - konuşma → **Bir resmî mektubun senden ne istediğini ve son tarihini söylersin.**
  - dinleme → **Kuryenin sesli mesajından paketin nerede olduğunu söylersin.**
  - kapi_ek: not: kargo bildirimi de okunur: ne, ne zamana kadar, nereye
- durum.tr: Kargo bildirimini okumak, paketi almak; Resmî mektubun ne istediğini anlamak → **Kargo bildirimini okumak, paketi almak. Resmî mektubun ne istediğini anlamak**

#### Hafta 22
- kapı (eski): Ek süre ricasını yazar, telefonda kısaca açıklarsın. Kulak: bir hayat hikâyesi kaydında yılları sıralarsın.
  - konuşma → **Ek süre isteyen kısa bir e-posta yazar, telefonda nedenini söylersin.**
  - dinleme → **Bir hayat hikâyesi kaydında yılları sırayla söylersin.**
- durum.tr: Son tarih için ek süre istemek; Kısa iş e-postası yazmak → **Son tarih için ek süre istemek. Kısa iş e-postası yazmak**

#### Hafta 23
- kapı (eski): Kelime tarif oyunu ve gelecek haftanı anlatma. Kulak: bir planı anlatan sesli mesajı yeniden anlatırsın.
  - konuşma → **Adını bilmediğin üç eşyayı Almanca tarif edersin.**
  - dinleme → **Bir planı anlatan sesli mesajı dinleyip kendi sözlerinle anlatırsın.**
  - kapi_ek: not: gelecek haftanı anlatmak da istenir

#### Hafta 24
- yapabiliyorum: Daha önce görmediğim günlük durumlarda Almanca idare ederim. → **Habersiz gelen bir aramada, eczanede ve kayıp eşya bürosunda derdimi anlatırım.**
- görev: Dışarıda bir telefon görüşmesini baştan sona Almanca yaparım. → **Bir mağazayı arayıp bir ürünün stokta olup olmadığını sorarım.**
- kapı (eski): A2 seviye kapısı: daha önce görülmemiş üç sözlü durum (habersiz gelen arama, eczanede beklenmedik soru, kayıp eşya bürosunda kaybettiğin bir şeyi sormak). Kulak: hiç duymadığın iki gerçek kayıt (anons ve sesli mesaj), ana fikir ve iki ayrıntı; ilk haftaki 60 saniyelik kaydınla karşılaştırma.
  - konuşma → **Uygulamada hiç karşılaşmadığın üç yeni durumda yardımsız konuşursun.**
  - dinleme → **Hiç duymadığın bir anons ve sesli mesajda ana fikri ve iki ayrıntıyı söylersin.**
  - kapi_ek: durumlar: habersiz gelen arama, eczanede beklenmedik soru, kayıp eşya bürosunda kaybettiğin bir şeyi sormak; kayit_karsilastirma: ilk haftaki 60 saniyelik kayıtla karşılaştırma (#56 madde 24)
- durum.tr: A2 pekiştirme ve seviye kapısı → **A2 tekrarı ve seviye sınavı**

#### Hafta 25
- kapı (eski): Fikir turu: katıl, katılma, neden. Kulak: sokak röportajında kimin ne düşündüğü.
  - konuşma → **Bir konuda katılıp katılmadığını ve nedenini söylersin.**
  - dinleme → **Sokak röportajında kimin ne düşündüğünü söylersin.**
- durum.tr: Fikir bildirmek, katılmadığını söylemek; Doğal konuşmayı genel olarak anlamak (sokak röportajı) → **Fikir bildirmek, katılmadığını söylemek. Sokak röportajında doğal konuşmayı anlamak**

#### Hafta 26
- kapı (eski): Haberi okuyup özetlersin. Kulak: haberin sesli hâlinde iki ayrıntı.
  - konuşma → **Kısa bir haberi okuyup iki cümleyle özetlersin.**
  - dinleme → **Aynı haberin sesli hâlinden iki ayrıntı söylersin.**

#### Hafta 27
- görev: Doktorda anlamadığım bir açıklama için ek soru sorarım. → **Eczanede bir ilacın ne işe yaradığını sorar, anlamadığım yeri tekrar sorarım.**
- kapı (eski): Dr. Weber bir tedaviyi açıklar; sen iki soru sorarsın. Kulak: açıklamadaki üç bilgi.
  - konuşma → **Dr. Weber bir tedaviyi açıklayınca anlamadığın iki şeyi sorarsın.**
  - dinleme → **Doktorun açıklamasından üç bilgiyi yakalayıp söylersin.**
- kol_mekan.tr: Muayenehane: B1 sahneleri → **Muayenehanede yeni konuşmalar**

#### Hafta 28
- görev: Bir uzman ya da başka bir kurum için randevu sorarım. → **Bir göz doktorunu arayıp yeni hasta alıp almadığını sorarım.**
- kapı (eski): Sevk ve randevu; sürpriz: ilk boş gün çok uzak. Kulak: muayenehane sesli mesajı.
  - konuşma → **Uzman doktoru arar, ilk boş gün çok uzaksa daha erken bir gün istersin.**
  - dinleme → **Bir muayenehanenin sesli mesajından ne zaman açık olduğunu söylersin.**
  - kapi_ek: surpriz: ilk boş gün çok uzak

#### Hafta 29
- görev: Bir sorunu (fatura ya da teslimat) telefonla çözmeyi denerim. → **Belediyeyi arayıp eski bir eşyayı nasıl atacağımı sorarım.**
- kapı (eski): Sorunlu arama, iki sürpriz. Kulak: hızlı konuşan çağrı merkezi.
  - konuşma → **Bir faturadaki hatayı telefonda anlatır, çözüm için ne yapılacağını sorarsın.**
  - dinleme → **Hızlı konuşan bir çağrı merkezi görevlisinden ne yapman gerektiğini söylersin.**
  - kapi_ek: surpriz: iki beklenmedik gelişme
- kol_mekan.tr: Gelen arama kademe 3 → **Telefonda sana gelen aramalar daha da zorlaşır**

#### Hafta 30
- görev: İşte bir izin ya da vardiya isteğimi söylerim. → **Bir iş arkadaşıma gelecek hafta hangi vardiyada çalıştığını sorarım.**
- kapı (eski): Şefle izin pazarlığı. Kulak: ekip toplantısından tarihleri yakalarsın.
  - konuşma → **Şefinden izin ister, istediğin gün olmazsa başka bir gün önerirsin.**
  - dinleme → **Bir ekip toplantısı kaydından tarihleri yakalayıp söylersin.**
- kol_mekan.tr: İş yeri: B1 sahneleri → **İş yerinde yeni konuşmalar**

#### Hafta 31
- kapı (eski): Yan gider yazısını okuyup soru sorarsın. Kulak: Herr Pichler'in açıklaması.
  - konuşma → **Yan gider yazısını okuyup anlamadığın bir şeyi telefonla sorarsın.**
  - dinleme → **Yan giderleri anlatan bir kayıttan ne kadar ödeyeceğini söylersin.**

#### Hafta 32
- kapı (eski): Komşuluk sorunu sahnesi. Kulak: kaynaklı Bairisch kesitte ana fikir.
  - konuşma → **Bir komşuyla gürültü gibi küçük bir sorunu sakin bir dille konuşursun.**
  - dinleme → **Bavyera ağzıyla konuşan birinin kısa kaydından ana fikri söylersin.**
  - kapi_ek: not: Bairisch kayıt yalnız kaynaklı (KAYNAKLAR §7)
- durum.tr: Bavyera ağzıyla sohbeti takip etmek (kaynaklı) → **Bavyera ağzıyla sohbeti takip etmek**
- kol_mekan.tr: Kulak Salonu: Bairisch kademesi 2 → **Kulak Salonu'nda Bavyera ağzının ikinci bölümü açılır**

#### Hafta 33
- kapı (eski): Mesaj bırakma ve aktarma. Kulak: iki sesli mesajı karşılaştırırsın.
  - konuşma → **Sesli mesaja kim olduğunu, ne istediğini ve numaranı bırakırsın.**
  - dinleme → **İki sesli mesajı dinleyip aralarındaki farkı söylersin.**
  - kapi_ek: not: duyduğun bir mesajı başkasına aktarmak da istenir
- durum.tr: Telefonda mesaj bırakmak, geri arama istemek; Resmî mektuba yazılı cevap vermek → **Telefonda mesaj bırakmak, geri arama istemek. Resmî mektuba yazılı cevap vermek**

#### Hafta 34
- kapı (eski): Resmî e-posta yazma ve telefonda kısa takip. Kulak: memurun telefon cevabı.
  - konuşma → **Bir kuruma resmî bir e-posta yazar, sonra telefonda gelip gelmediğini sorarsın.**
  - dinleme → **Memurun telefondaki cevabından ne yapman gerektiğini söylersin.**

#### Hafta 35
- kapı (eski): İş görüşmesi provası. Kulak: görüşmeci sorularını yakalarsın.
  - konuşma → **Bir iş görüşmesinde kendini ve deneyimini iki dakika anlatırsın.**
  - dinleme → **Görüşmecinin sorularını dinleyip neyi sorduğunu söylersin.**

#### Hafta 36
- kapı (eski): Haberi dinleyip özetlersin. Kulak: iki haber, ana fikir ve ayrıntı.
  - konuşma → **Dinlediğin bir radyo haberini birine iki cümleyle anlatırsın.**
  - dinleme → **İki kısa haberde ana fikri ve birer ayrıntıyı söylersin.**

#### Hafta 37
- kapı (eski): İade sahnesi; sürpriz: fiş yok. Kulak: satıcının koşulları.
  - konuşma → **Fişin olmadan bozuk bir ürünü dükkâna iade etmeye çalışırsın.**
  - dinleme → **Satıcının anlattığı iade koşullarını söylersin.**
  - kapi_ek: surpriz: fiş yok

#### Hafta 38
- kapı (eski): Tamirhane sahnesi: ne olduğu, ne kadar, ne zaman. Kulak: ustanın açıklaması.
  - konuşma → **Tamirhanede sorunu anlatır, fiyatı ve ne zaman biteceğini sorarsın.**
  - dinleme → **Ustanın açıklamasından neyin bozuk olduğunu söylersin.**

#### Hafta 39
- görev: Bir cihaz sorununu bir mağazada ya da telefonda anlatırım. → **Bir telefon dükkânında hangi kablonun telefonuma uyduğunu sorarım.**
- kapı (eski): Teknik destek araması. Kulak: adım adım talimat.
  - konuşma → **Teknik desteği arayıp internetin çalışmadığını adım adım anlatırsın.**
  - dinleme → **Telefondaki adım adım talimatı dinleyip sırayla uygularsın.**

#### Hafta 40
- kapı (eski): Talimatı okuyup sırayla anlatırsın. Kulak: sesli talimatı yeniden anlatırsın.
  - konuşma → **Bir kullanım talimatını okuyup adımları sırayla anlatırsın.**
  - dinleme → **Sesli bir talimatı dinleyip kendi sözlerinle yeniden anlatırsın.**

#### Hafta 41
- kapı (eski): Olayı sırasıyla anlatırsın; 4/3/2. Kulak: hikâye bölümünü yeniden anlatırsın.
  - konuşma → **Başından geçen bir olayı üç kez, her seferinde daha kısa anlatırsın.**
  - dinleme → **Hikâyenin yeni bölümünü dinleyip kendi sözlerinle anlatırsın.**
  - kapi_ek: not: akıcılık 4/3/2 (dn:akicilik-432)

#### Hafta 42
- kapı (eski): Acil arama provası (simülasyon). Kulak: görevlinin soruları.
  - konuşma → **Canlandırılan bir acil aramada ne olduğunu ve adresini söylersin.**
  - dinleme → **Acil hattı görevlisinin sorduğu soruları sırayla söylersin.**
  - kapi_ek: not: simülasyon; gerçek acil hat aratılmaz
- kol_mekan.tr: Acil durum sahneleri → **Acil durum alıştırmaları**

#### Hafta 43
- kapı (eski): Anlaşmazlık sahnesi. Kulak: iki kişinin farklı görüşleri.
  - konuşma → **Bir arkadaşınla bir anlaşmazlığı sakin bir dille konuşursun.**
  - dinleme → **İki kişinin konuşmasından kimin ne düşündüğünü söylersin.**

#### Hafta 44
- kapı (eski): İtiraz yazısı ve telefonda takip. Kulak: memurun açıklaması.
  - konuşma → **Bir karara kısa bir itiraz yazar, telefonda nedenini anlatırsın.**
  - dinleme → **Memurun açıklamasından itirazının ne olacağını söylersin.**

#### Hafta 45
- kapı (eski): İki teklif, bir karar. Kulak: satıcının hızlı anlatımı.
  - konuşma → **İki teklifi karşılaştırır, hangisini neden seçtiğini söylersin.**
  - dinleme → **Satıcının hızlı anlatımından iki teklifin farkını söylersin.**
- durum.tr: İki teklifi karşılaştırmak, pazarlık etmek; Sağlık sigortasına soru sormak → **İki teklifi karşılaştırmak, pazarlık etmek. Sağlık sigortasına soru sormak**

#### Hafta 46
- kapı (eski): İptal araması; sürpriz: karşı teklif. Kulak: koşulları yakalarsın.
  - konuşma → **Bir aboneliği telefonla iptal eder, yeni bir teklifi kibarca geri çevirirsin.**
  - dinleme → **Sözleşme koşullarından iptal süresini yakalayıp söylersin.**
  - kapi_ek: surpriz: karşı teklif

#### Hafta 47
- görev: İşte ya da bir dernekte kısa bir özet sunarım. → **Bir iş arkadaşıma dünkü işimi üç cümleyle özetlerim.**
- kapı (eski): İki dakikalık özet ve sorulara cevap. Kulak: toplantıdan kararları yakalarsın.
  - konuşma → **Toplantıda iki dakikalık bir özet verir, bir soruya cevap verirsin.**
  - dinleme → **Bir toplantı kaydından alınan kararları söylersin.**
- durum.tr: Dernek ve gönüllülük; Toplantıda kısa durum özeti vermek → **Dernek ve gönüllülük. Toplantıda kısa durum özeti vermek**

#### Hafta 48
- kapı (eski): Yorum yazıp sözlü savunursun. Kulak: tartışma kaydında iki görüş.
  - konuşma → **Bir ilana yorum yazar, fikrini birine sözlü olarak savunursun.**
  - dinleme → **Bir tartışma kaydında iki görüşü ayırıp söylersin.**

#### Hafta 49
- görev: Bankada ya da işte bir sorunu anlatıp çözüm isterim. → **Bankada kartımın yurt dışında çalışıp çalışmadığını sorarım.**
- kapı (eski): Sorun ve çözüm sahnesi. Kulak: şefin cevabındaki koşul.
  - konuşma → **Şefe iş yerindeki bir sorunu anlatır, bir çözüm önerirsin.**
  - dinleme → **Şefin cevabındaki koşulu yakalayıp söylersin.**
- durum.tr: Bir sorunu şefe anlatıp çözüm önermek; Bankada bir sorunu çözmek → **Bir sorunu şefe anlatıp çözüm önermek. Bankada bir sorunu çözmek**

#### Hafta 50
- kapı (eski): Habersiz arama. Kulak: sesli mesaj ve anonsta ayrıntı.
  - konuşma → **Beklemediğin bir anda gelen aramayı açıp işini halledersin.**
  - dinleme → **Bir sesli mesaj ve bir anonstan birer ayrıntı yakalayıp söylersin.**
- durum.tr: Hazırlıksız gelen aramada işi halletmek; Sesli mesaj ve anonsta ayrıntı yakalamak → **Hazırlıksız gelen aramada işi halletmek. Sesli mesaj ve anonsta ayrıntı yakalamak**
- kol_mekan.tr: Gelen arama kademe 4 (habersiz) → **Telefon artık habersiz de çalar**

#### Hafta 51
- yapabiliyorum: Bir B1 sınavının dört bölümünü süresiyle denerim. → **Dört bölümlü bir B1 deneme sınavını süre içinde bitiririm.**
- görev: Almanca bir metni okuyup birine iki cümleyle anlatırım. → **Bir tanıdıkla on dakika hiç Türkçe ya da İngilizce kullanmadan konuşurum.**
- kapı (eski): Tam deneme sınavı: dört bölüm, süreli. Kulak: dinleme bölümü puanı.
  - konuşma → **Deneme sınavının konuşma bölümünü süre içinde yaparsın.**
  - dinleme → **Deneme sınavının dinleme bölümünü süre içinde yaparsın.**
  - kapi_ek: not: okuma ve yazma bölümleri de süreli; dinleme bölümü puanı kaydedilir
- durum.tr: B1 sınav biçimi provası (dinleme, okuma, yazma, konuşma) → **B1 deneme sınavı: dinleme, okuma, yazma ve konuşma**
- kol_mekan.tr: Atölye: sınav provası → **Atölye: deneme sınavı**

#### Hafta 52
- yapabiliyorum: Görmediğim durumlarda sorunumu Almanca çözerim. → **Telefonda bir sorunu çözer, toplantıda fikrimi savunur, yüz yüze şikâyet ederim.**
- görev: Bir gün boyunca bütün işlerimi yalnız Almanca hallederim. → **Aynı hizmet için üç yeri arayıp fiyatları karşılaştırırım.**
- kapı (eski): B1 seviye kapısı: daha önce görülmemiş üç sözlü durum (telefonda bir sorunu çözmek, toplantıda fikir savunmak, yüz yüze bir şikâyeti çözmek). Kulak: hiç duymadığın doğal konuşma ve kaynaklı Bairisch kesit, ana fikir ve ayrıntı; bir yıl önceki kaydınla karşılaştırma.
  - konuşma → **Uygulamada hiç karşılaşmadığın üç yeni durumda yardımsız konuşursun.**
  - dinleme → **Hiç duymadığın bir sohbetten ve Bavyera ağzıyla bir kayıttan ana fikri söylersin.**
  - kapi_ek: durumlar: telefonda bir sorunu çözmek, toplantıda fikir savunmak, yüz yüze bir şikâyeti çözmek; kayit_karsilastirma: bir yıl önceki (1. hafta) kayıtla karşılaştırma (#56 madde 24); not: Bairisch kayıt yalnız kaynaklı; ana fikir ve ayrıntı ölçülür
- durum.tr: B1 pekiştirme ve seviye kapısı → **B1 tekrarı ve seviye sınavı**

### Gün başlıkları (eski → yeni)

- gün 8: Küçük sözcükler ve fiyat → **Sık duyulan küçük sözcükler: noch, schon, nur**
- gün 9: Fiil sonları: ich wohne, du wohnst → **Ben ve sen derken: ich wohne, du wohnst**
- gün 11: Çoğul ve istemek: möchten → **İki tane istemek: Ich möchte zwei Brötchen**
- gün 12: Kibar istek: einen Kaffee; du/Sie → **Kibarca istemek: Ich hätte gern einen Kaffee**
- gün 13: Benim, senin; hızlı konuşma 1 → **Benim ve senin: mein, dein**
- gün 14: Hafta kapısı: fırında → **Haftanın sınavı: fırında alışveriş**
- gün 15: Evet mi, hayır mı? Fiil başa → **Evet ya da hayır soruları: Haben Sie Zeit?**
- gün 17: Kibar rica: Könnten Sie …? → **Kibar rica: Könnten Sie das wiederholen?**
- gün 19: Ünlüsü değişen fiiller: sprechen, fahren → **Sen ve o derken değişen harf: du sprichst, er fährt**
- gün 21: Hafta kapısı: muayenehaneyi aramak → **Haftanın sınavı: muayenehaneyi aramak**
- gün 22: der, die, das → **Evdeki eşyalar: der Tisch, die Tür, das Bett**
- gün 23: er, sie, es ve renkler → **Eşyayı tarif etmek: Er ist groß und weiß**
- gün 24: sehr, zu, nicht → **Çok, fazla, değil: sehr, zu, nicht**
- gün 26: En iyisi; ev ilanı okumak → **Ev ilanında en ucuzunu bulmak**
- gün 28: Hafta kapısı: merdivende komşu → **Haftanın sınavı: merdivende komşuyla**
- gün 29: Ayrılan fiiller: aufstehen → **Sabah kalkmak: Ich stehe um sieben auf**
- gün 30: Zaman başta, fiil yine ikinci → **Cümleye zamanla başlamak: Am Montag arbeite ich**
- gün 31: Meslek: Ich arbeite als … → **Meslek sormak: Was sind Sie von Beruf?**
- gün 32: gern, nicht gern, lieber → **Sevdiğini söylemek: gern, lieber**
- gün 33: Davet ve tebrik → **Doğum gününe davet etmek**
- gün 34: Yol: mit dem Bus, ikinci sokak → **Yol tarif etmek: die zweite Straße links**
- gün 35: Hafta kapısı: mola → **Haftanın sınavı: molada sohbet**
- gün 36: Dün: Ich habe … gemacht → **Dün ne yaptığını söylemek: Ich habe gekocht**
- gün 37: gemacht, gekauft; sesli kurma 1 → **Kelimeyi geçmişe çevirmek: kaufen, gekauft**
- gün 38: Cümle parantezi; ich bin gegangen; kaydet ve dinle → **Gitmek ve gelmek geçmişte: Ich bin gegangen**
- gün 39: war, hatte; yıllar → **Eskiden nasıldı: Ich war, ich hatte**
- gün 40: Kelime ailesi 1; hava → **İki kelimeden bir kelime: Hausarzt**
- gün 41: Yeniden anlatma; seit, vor → **Dinlediğini kendi sözlerinle anlatmak**
- gün 42: Hafta kapısı: hafta sonunu anlatmak → **Haftanın sınavı: hafta sonunu anlatmak**
- gün 44: man; nicht müssen, nicht dürfen → **Gerek yok mu, yasak mı: nicht müssen, nicht dürfen**
- gün 45: Talimat: Nehmen Sie …; sollen → **Doktorun talimatı: Nehmen Sie die Tabletten**
- gün 46: sein, ihr, unser; form doldurmak → **Form doldurmak: Vorname, Geburtsdatum**
- gün 47: mir, dir; gefällt mir → **Beğendiğini söylemek: Das gefällt mir**
- gün 48: mich, dich; für, ohne; du ile talimat → **Bir arkadaşa öğüt vermek: Trink viel Wasser!**
- gün 49: Hafta kapısı: muayene → **Haftanın sınavı: doktorda muayene**
- gün 52: Pekiştirme: ev, komşu, yol → **Pekiştirme: mahallede konuşmak**
- gün 55: A1 kapısı 1: kulak ve okuma → **A1 sınavı: duyduğunu ve okuduğunu anlamak**
- gün 56: A1 kapısı 2: üç yeni sözlü durum → **A1 sınavı: üç yeni durumda konuşmak**

### Diğer

- B1 birim önerisi `u:b1:kulak-1`: Doğal konuşmayı genel olarak anlamak (sokak röportajı) → **Sokak röportajında doğal konuşmayı anlamak** (32. ve 25. haftanın `durum.tr` satırına girer)
- B1 birim önerisi `u:b1:kulak-3`: Bavyera ağzıyla sohbeti takip etmek (kaynaklı) → **Bavyera ağzıyla sohbeti takip etmek** (32. ve 25. haftanın `durum.tr` satırına girer)
- `note_tr`: öğrenciye gösterilebilir alanların listesi ve `kapi_ek` açıklaması eklendi.

## İnceleme #179 1. tur sonrası

Öğrenciye görünen alanlarda yalnız üç gün başlığı değişti. Yapabiliyorum, görev, konuşma sınavı, dinleme sınavı, `durum.tr` ve `kol_mekan.tr` satırlarının hiçbiri değişmedi (3. haftanın "adını hecelersin" sınavı aynı kaldı, artık 16. günün zorunlu dersine dayanıyor).

### Gün başlıkları

- gün 9: Ben ve sen derken: ich wohne, du wohnst → **Fırında der, die, das: das Brot, die Semmel, der Kuchen** (fiil sonları 2. günde öğretiliyor; 9. gün yeni konuya geçti, Akkusativ'den önce cinsiyet)
- gün 16: Telefonda kendini tanıtmak → **Telefonda kendini tanıtmak ve adını hecelemek** (heceleme 7. günde isteğe bağlıydı, burada zorunlu)
- gün 22: Evdeki eşyalar: der Tisch, die Tür, das Bett → **Evdeki eşyalar: Wo ist der Schlüssel? Er ist hier** (der, die, das 9. güne geçti; 22. gün er, sie, es)

### Öğrenciye görünmeyen

- 2. gün `dersler`: `r0:02-monate` → `r0:02-monate`, `r0:11-praesens` (`m1.json` gun-02.json ile eşitlendi).
- 23. gün `dersler`: `gr:a1-04:t2`, `gr:a1-04:t3` → `gr:a1-04:t3` (başlık aynı).
- 31. hafta `dil_noktalari`: `gr:b1-07:t1` (obwohl) çıktı; 32. hafta `requires` `gr:a2-11:t3`'ü ister.
- 8., 24. ve 52. hafta `requires.dil_noktalari` boştu, dolduruldu.
- `pm_kararlari`: F1–F4 karar olarak yazıldı; F2'nin hedef günleri `hedef` alanında.
- `taslak.md`: "PM'e sorular" → "Karara bağlananlar" (dört satır) ve "Açık sorular" (yedi madde).
