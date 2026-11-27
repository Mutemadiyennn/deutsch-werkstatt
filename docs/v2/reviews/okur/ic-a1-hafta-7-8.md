# Okur kontrolü: İÇ-A1, 7. ve 8. hafta ekleri (OD-9.3, PM-148)

Girdi: `git diff origin/main -- content/v2/m1/` (çalışma ağacı `wt-c`). Dosyalar: `gun-45.json`, `gun-46.json`, `gun-48.json`, `gun-53.json`, `hafta-sonu-testi-07.json`, `hafta-sonu-testi-08.json`.
Okuyan: Türkçe konuşan, Almancası A2, dilbilgisi terimi bilmeyen öğrenci. Akşam, telefondan, ilk kez okuyor.

Okunan alanlar: yeni ve değişen kalıpların `tr`'si, görev cümlesinin `tr`'si, `durum_tr`, prova düğüm ve seçeneklerinin `tr`'si, `geri_bildirim_tr`, `kapanis_tr`, `gorev_tr`, `kontrol_tr`, `situation_tr`, `why_tr`. Yalnızca yönlendirmesi (`sonraki`) değişen seçeneklerin metni de okundu. Silinen maddelerde (`m1:49:t10`, `m1:54:t05`) öğrenciye görünen metin kalmadı.

Yuvalar boş hâliyle okundu: "Yaşım: (yaşın)." Yuvalar hep iki noktadan sonra geliyor. Bu yüzden ek sorunu çıkmıyor.

Sözcük sayımı önceki okur raporlarındaki gibi yapıldı: kalın Almanca sözcükler sayılır, `…` sayılmaz. Kalıplardaki ve kalın Almancadaki `…` boşluk işareti sayıldı, sembol sayılmadı.

## Sonuç

| | |
|---|---|
| Okunan metin | 64 (gün 45: 5, gün 46: 24, gün 48: 6, gün 53: 25, test 07: 2, test 08: 2) |
| GEÇTİ | 57 |
| GERİ | 7 |

GERİ olan kimlikler:
1. `gun-46.json` `okuma_yazma.yazma.gorev_tr`
2. `gun-48.json` `okuma_yazma.yazma.gorev_tr`
3. `gun-48.json` `okuma_yazma.yazma.kontrol_tr[1]`
4. `gun-48.json` `okuma_yazma.yazma.kontrol_tr[2]`
5. `hafta-sonu-testi-07.json` `maddeler[m1:49:t13].situation_tr`
6. `hafta-sonu-testi-07.json` `maddeler[m1:49:t13].why_tr`
7. `hafta-sonu-testi-08.json` `maddeler[m1:54:t13].situation_tr`

Dosya durumu (OD-9.4): `gun-46`, `gun-48`, `hafta-sonu-testi-07` ve `hafta-sonu-testi-08` bu hâliyle "reviewed" sayılamaz. `gun-45` ve `gun-53` ekleri GERİ'siz.

## Sorulan dört nokta

1. **Tanıtma kartı.** Ne yapacağım açık: her kart sözcüğü için bir kısa cümle söyleyeceğim. Test 08'de cümleleri **und** ile bağlayacağım. Ama kart sözcüklerinin Türkçesi hiçbir yerde verilmemiş. **Name**, **Beruf**, **Hobby** ve **Sprachen** sözcüklerini derslerden biliyorum. **Alter** sözcüğü bana hiç öğretilmedi. **Land** sözcüğünü 33. günde **auf dem Land** içinde "kırsal, taşra" diye öğrendim, burada "ülke" demek. **Wohnort** sözcüğünü de öğrenmedim, **wohnen** ile **Ort** sözcüklerinden tahmin ettim. Test 07'de kart tekil ("Kart:"), hemen ardından "Her karta" deniyor. Bir kart mı var yedi kart mı, bir an duraksadım. Bu yüzden iki `situation_tr` metni GERİ.
2. **Mektup açılış ve kapanışları.** Üç kalıbın üçü de terimsiz ve anlaşılır. **Sehr geehrte Damen und Herren** için "Sayın Yetkili" yazılmış. Ayraçta "kime yazdığını bilmediğin resmî yazının başı" deniyor. Ne zaman kullanacağımı tek okumada anladım. **Lieber** ile **Liebe** farkı da açık: biri erkeğe, biri kadına yazılıyor. (43. günde **lieber** sözcüğünü "tercihen" diye öğrenmiştim. Kalıp "Sevgili" dediği için karışmadı.)
3. **denn.** Açıklama terim kullanmıyor, örnekle gösteriyor: "Doktora git, çünkü ateşin var." **denn** "çünkü" demek, anladım. Yazma görevlerinde "nedenini **denn** ile söyle" deniyor, bu da açık. Sözlük kartında "soruda **denn** çünkü demek değildir" uyarısı var. İkisi birbirini tutuyor.
4. **"und'dan sonra ich gerekmez".** Anladım. Tek başına "Aynı kişi için" sözü biraz bulanık, hangi kişi diye düşündüm. Ama örnek (**Ich heiße … und bin … Jahre alt.**) bunu hemen çözüyor. Cümle 13 kelime. GEÇTİ.

## GERİ dönenler

Öneri sütunu yalnızca yönü söyler. Metni yazar ya da dilbilimci yazar.

| # | Yer | Metin | Kendi sözlerimle | Neden | Öneri (yön) |
|---|---|---|---|---|---|
| 1 | `gun-46.json` `okuma_yazma.yazma.gorev_tr` | … Formu e-postayla gönderiyorsun ve kime yazdığını bilmiyorsun: **Sehr geehrte Damen und Herren,** ile başla, **Mit freundlichen Grüßen** ile bitir. | Formu e-postayla yolluyorum, kime gittiğini bilmiyorum. Resmî açılışla başlayıp resmî kapanışla bitireceğim. | Son cümle 19 kelime. İçinde üç iş var: durum, açılış, kapanış. Sona gelince başını unuttum. | Bölünsün: durum bir cümle, açılış bir cümle, kapanış bir cümle. |
| 2 | `gun-48.json` `okuma_yazma.yazma.gorev_tr` | … Geçmiş olsun de, iki öğüt ver, birinin nedenini **denn** ile söyle ve onun için ne yapacağını yaz. … | Geçmiş olsun diyeceğim, iki öğüt vereceğim, birine **denn** ile neden ekleyeceğim, onun için ne yapacağımı yazacağım. | Üçüncü cümle 17 kelime, dört iş. Yorgun okurken bir işi atladım (ne yapacağını yazmayı). | Dört iş iki üç kısa cümleye bölünsün. |
| 3 | `gun-48.json` `okuma_yazma.yazma.kontrol_tr[1]` | Öğütler **Trink**, **Bleib** ile mi başlıyor (**du** olmadan)? Birinin nedenini **denn du hast …** gibi yazdın mı? | Öğütlerde **du** olmayacak. Ama nedende **du hast** olacak. | Bir kutuda iki ayrı kontrol var. "**du** olmadan" dendikten hemen sonra "**denn du hast**" geliyor. Önce yanlış yazdığımı sandım, çelişki gibi okudum. | İki ayrı madde olsun ya da nedende **du** geldiği açıkça söylensin. |
| 4 | `gun-48.json` `okuma_yazma.yazma.kontrol_tr[2]` | **Gute Besserung** ve **für dich** ile onun için ne yapacağını yazdın mı? | **Gute Besserung** ve **für dich** ile, onun için ne yapacağımı yazdım mı? | İlk okumada **Gute Besserung** sözünü de yapacağım işin parçası sandım. Asıl istenen iki ayrı şey: geçmiş olsun dedin mi, **für dich** ile ne yapacağını yazdın mı. | İki kontrol ayrılsın ya da sıra değişsin (**Gute Besserung** yazdın mı? …). |
| 5 | `hafta-sonu-testi-07.json` `maddeler[m1:49:t13].situation_tr` | Sınav provası. Görevli seni tanımak istiyor. Kart: **Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?** Her karta bir kısa cümle söyle. | Her sözcük için kendimle ilgili bir cümle söyleyeceğim. | **Alter** öğretilmedi. **Land** bana "kırsal" diye öğretildi. **Wohnort** öğretilmedi. Üç kartta neyi söyleyeceğimi bilmiyorum. "Kart:" tekil, "Her karta" çoğul gibi. | Kart sözcüklerinin Türkçesi bir kez görünsün (ör. **Alter**: yaş). "Kartlar:" diye yazılsın. |
| 6 | `hafta-sonu-testi-07.json` `maddeler[m1:49:t13].why_tr` | Her kart bir kısa cümle olur: **Ich heiße …**, **Ich bin … Jahre alt**, **Ich komme aus …**, **Ich wohne in …**, **Ich spreche …**, **Ich bin …** (meslek), **Mein Hobby ist …**. | Her kart için bir kalıp var. Sırayla yedi kalıp. | 26 kelime, yedi kalıp tek cümlede. Hangi kalıbın hangi karta gittiğini ancak sırayı sayarak buldum. | Kısaltılsın. Kart ile kalıp eşlemesi kısa, ayrı bir yerde gösterilsin. |
| 7 | `hafta-sonu-testi-08.json` `maddeler[m1:54:t13].situation_tr` | Sınav provası. Kartlar önünde: **Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?** Görevli kendini anlatmanı istiyor. Bu kez cümleleri **und** ile bağla: dört beş cümle yeter. | Kartlardaki bilgileri söyleyeceğim. Bazılarını **und** ile birleştirip dört beş cümleye indireceğim. | 5 numaradaki sorun burada da var: **Alter**, **Land**, **Wohnort** anlamı verilmemiş. Test 07'nin `why_tr` sırası bunu ancak dolaylı gösteriyor. | Kart sözcüklerinin Türkçesi burada da (ya da derste bir kez) verilsin. |

## Bütün metinler

### gun-45.json

| Yer | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `halkalar…kaliplar` (de: Liebe Frau … – Lieber Herr … – Viele Grüße) `tr` | Sevgili … Hanım – Sevgili … Bey – Sevgiler (kısa mektubun ya da notun sonu) | Kadına **Liebe Frau**, erkeğe **Lieber Herr** diye başlarım. **Viele Grüße** ile bitiririm. | GEÇTİ | 12 kelime. |
| `okuma_yazma.yazma.gorev_tr` | Brandl Hanım eczane etiketini okuyamıyor. Ona kısa bir not yaz. … Notu **Liebe Frau Brandl,** ile başlat, **Viele Grüße** ile bitir. | Not yazacağım: kaç kez, ne zaman, neyi yapmayacak. Başı ve sonu belli. | GEÇTİ | En uzun cümle 10 kelime. |
| `kontrol_tr[0]` | **Liebe Frau Brandl,** ile başlayıp **Viele Grüße** ile bitirdin mi? | Başı ve sonu doğru mu? | GEÇTİ | |
| `kontrol_tr[1]` | Talimatı **Sie sollen** ile aktardın mı? | Talimatı **Sie sollen** ile yazdım mı? | GEÇTİ | Metin aynı, yeri değişti. |
| `kontrol_tr[2]` | Günde kaç kez olduğunu ve damladan sonra yasak olanı yazdın mı? | Kaç kez ve yasak olan şey var mı? | GEÇTİ | İki yakın kontrol. Önceki raporlarda bu biçim geçti. |

### gun-46.json

| Yer | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `halkalar[h1].kaliplar` (de: Wie alt sind Sie? …) `tr` | Kaç yaşındasınız? – Yaşım … – Nerelisiniz? – Memleketim … | Yaş sorma ve söyleme, memleket sorma ve söyleme. | GEÇTİ | |
| `halkalar[h1].kaliplar` (de: Welche Sprachen …) `tr` | Hangi dilleri konuşuyorsunuz? – Konuştuğum diller … – Lütfen kendinizi tanıtın. | Dil sorma ve söyleme. Bir de "kendini tanıt" isteği. | GEÇTİ | |
| `gorev_cumleleri` (de: Ich komme aus {ulke}. Das ist meine Heimat.) `tr` | Geldiğim ülke: {ulke}. Orası benim memleketim. | (ülken) ülkesinden geliyorum, orası memleketim. | GEÇTİ | |
| `prova n5` 2. seçenek `geri_bildirim_tr` | Kısa ve açık. | | GEÇTİ | Yalnız yönlendirme değişti. |
| `prova n6` seçenek `geri_bildirim_tr` | Nazik bir kapanış. | | GEÇTİ | Yalnız yönlendirme değişti. Sonra Huber Hanım "bir şey daha" diye durduruyor, akış doğal. |
| `prova n7` `tr` | Bir dakika, bir şey daha! Yeni bir formumuz var, sizin için de. Adresiniz bende var. Kaç yaşındasınız, nerelisiniz? | Benim için de form var, yaşımı ve memleketimi soruyor. | GEÇTİ | |
| `n7` 1. seçenek `tr` | Yaşım: {yas}. Memleketim: {ulke}. | | GEÇTİ | |
| `n7` 1. seçenek `geri_bildirim_tr` | Yaşını **Ich bin … Jahre alt** ile, memleketini **Ich komme aus …** ile verdin. | İki kalıbı doğru kullandım. | GEÇTİ | 12 kelime. |
| `n7` 2. seçenek `tr` | Adresim Brunnengasse 7. | | GEÇTİ | |
| `n7` 2. seçenek `geri_bildirim_tr` | Adresin formda zaten var. Huber Hanım yaşını ve memleketini soruyor. | Yanlış şeyi söyledim, yaşımı soruyordu. | GEÇTİ | |
| `prova n8` `tr` | Teşekkürler. Peki mesleğiniz? Medeni durumunuz: bekâr mı, evli mi? | | GEÇTİ | |
| `n8` 1. seçenek `tr` | Mesleğim: {meslek}. Medeni durumum: {aile}. | | GEÇTİ | |
| `n8` 1. seçenek `geri_bildirim_tr` | Kendin için **Ich bin …** dedin. Brandl Hanım için **sie** demiştin. | Kendim için **Ich**, komşu için **sie**. | GEÇTİ | Öğrenci n3'te **sie war verheiratet** diyor, gönderme doğru. |
| `n8` 2. seçenek `tr` | O evliydi. | | GEÇTİ | |
| `n8` 2. seçenek `geri_bildirim_tr` | Huber Hanım şimdi seni soruyor, Brandl Hanım'ı değil. Kendin için **Ich bin …** de. | Beni soruyor, kendimi anlatmalıyım. | GEÇTİ | |
| `prova n8b` `tr` | Güzel. Peki hangi dilleri konuşuyorsunuz? Bu, Dr. Weber için önemli. | | GEÇTİ | |
| `n8b` seçenek `tr` | Konuştuğum diller: {diller}. Almancayı hâlâ öğreniyorum. | | GEÇTİ | |
| `n8b` seçenek `geri_bildirim_tr` | Dillerini **Ich spreche …** ile söyledin. Formun bu kısmı da tamam. | | GEÇTİ | |
| `prova.kapanis_tr` | Komşunun formunu onun adına doldurdun: … **ihr** ve **ihre** ile verdin. Sonra kendi formun için yaşını, memleketini, mesleğini, medeni durumunu ve dillerini **ich** ile söyledin. | Önce komşuyu, sonra kendimi anlattım. | GEÇTİ | Cümleler 12 ve 14 kelime. Sınırda. |
| `halkalar[h3].kaliplar` (de: Sehr geehrte Damen und Herren – Mit freundlichen Grüßen) `tr` | Sayın Yetkili (kime yazdığını bilmediğin resmî yazının başı) – Saygılarımla (resmî yazının sonu) | Kime yazdığımı bilmediğim resmî yazıda böyle başlar, böyle bitiririm. | GEÇTİ | 12 kelime, terim yok. |
| `okuma_yazma.yazma.gorev_tr` | … Formu e-postayla gönderiyorsun ve kime yazdığını bilmiyorsun: **Sehr geehrte Damen und Herren,** ile başla, **Mit freundlichen Grüßen** ile bitir. | | **GERİ** | GERİ #1 |
| `kontrol_tr[0]` | Dört alanı doldurup doğum yerini **Er ist in … geboren** ile yazdın mı? | Dört alan tamam mı, doğum yeri cümlesi var mı? | GEÇTİ | 12 kelime. |
| `kontrol_tr[1]` | Erkek için **sein** ya da **seine** yazdın mı? | | GEÇTİ | Metin aynı. |
| `kontrol_tr[2]` | Notu **Sehr geehrte Damen und Herren,** ile açıp **Mit freundlichen Grüßen** ile kapattın mı? | Resmî açılış ve kapanış var mı? | GEÇTİ | 14 kelime, sınırda. Görevde "e-posta", burada "not" deniyor. Karışmadı. |

### gun-48.json

| Yer | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `kaliplar` (de: Geh zum Arzt, denn du hast Fieber. – …) `tr` | Doktora git, çünkü ateşin var. – Yatakta kal, çünkü hastasın. | **denn** "çünkü" demek. Öğüdün nedenini söyler. | GEÇTİ | Terim yok, örnekle gösteriliyor. |
| `kaliplar` (de: Lieber … – Liebe … – Viele Grüße) `tr` | Sevgili … (erkeğe) – Sevgili … (kadına) – Sevgiler (mesajın sonu) | Erkeğe **Lieber**, kadına **Liebe**, sonda **Viele Grüße**. | GEÇTİ | |
| `okuma_yazma.yazma.gorev_tr` | Tobi'ye kısa bir cevap yaz. **Lieber Tobi,** ile başla. Geçmiş olsun de, iki öğüt ver, birinin nedenini **denn** ile söyle ve onun için ne yapacağını yaz. **Viele Grüße** ile bitir. | | **GERİ** | GERİ #2 |
| `kontrol_tr[0]` | **Lieber Tobi,** ile başlayıp **Viele Grüße** ile bitirdin mi? | | GEÇTİ | |
| `kontrol_tr[1]` | Öğütler **Trink**, **Bleib** ile mi başlıyor (**du** olmadan)? Birinin nedenini **denn du hast …** gibi yazdın mı? | | **GERİ** | GERİ #3 |
| `kontrol_tr[2]` | **Gute Besserung** ve **für dich** ile onun için ne yapacağını yazdın mı? | | **GERİ** | GERİ #4 |

### gun-53.json

| Yer | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `kaliplar` (de: Woher kommst du? …) `tr` | Nerelisin? – Memleketim … – Nerede oturuyorsun? – Oturduğum yer … | Arkadaşça: nereli, nerede oturuyor. | GEÇTİ | |
| `kaliplar` (de: Welche Sprachen sprichst du? …) `tr` | Hangi dilleri konuşuyorsun? – Konuştuğum diller … – Boş zamanında ne yapmayı seversin? – Hobim … | Dil ve hobi sorma, söyleme. | GEÇTİ | 11 kelime. |
| `prova.durum_tr` | … Onunla ilk kez konuşuyorsun. Kendini tanıt, sonra hafta sonunu anlat. | Önce kendimi anlatacağım, sonra hafta sonumu. | GEÇTİ | |
| `n1` 1. ve 2. seçenek `geri_bildirim_tr` (2) | Adını söyledin ve onu sıcak karşıladın. / Kısa ve doğal bir tanışma. | | GEÇTİ (2) | Yalnız yönlendirme değişti. |
| `n1b` seçenek `geri_bildirim_tr` | İyi toparladın: özür diledin ve kendini tanıttın. | | GEÇTİ | Yalnız yönlendirme değişti. |
| `n1c` `tr` | Memnun oldum! Nerelisin? Peki nerede oturuyorsun? | | GEÇTİ | |
| `n1c` 1. seçenek `tr` | Memleketim: {ulke}. Şimdi oturduğum yer: {sehir}. | | GEÇTİ | |
| `n1c` 1. seçenek `geri_bildirim_tr` | İki soruya da cevap verdin: memleket **aus** ile, oturduğun yer **in** ile. | Memlekette **aus**, oturduğum yerde **in**. | GEÇTİ | 12 kelime. |
| `n1c` 2. seçenek `tr` | Memleketim: {ulke}. | | GEÇTİ | Yanlış Almanca seçeneğin çevirisi. Hata Almancada, beklenen bu. |
| `n1c` 2. seçenek `geri_bildirim_tr` | Memleket için **von** değil **aus** dersin: **Ich komme aus …** | **von** yanlış, **aus** doğru. | GEÇTİ | |
| `n1d` `tr` | Güzel! Sen bu şirkette ne iş yapıyorsun? Peki hangi dilleri konuşuyorsun? Ben maalesef yalnızca Almanca konuşuyorum. | | GEÇTİ | |
| `n1d` seçenek `tr` | Mesleğim: {meslek}. Konuştuğum diller: {diller}. | | GEÇTİ | |
| `n1d` seçenek `geri_bildirim_tr` | İşini ve dillerini kısa iki cümleyle söyledin. | | GEÇTİ | |
| `n1e` `tr` | Harika! Peki boş zamanında ne yapmayı seversin? | | GEÇTİ | |
| `n1e` 1. seçenek `tr` | Hobim: {hobi}. Bunu sık sık hafta sonu yaparım. | | GEÇTİ | |
| `n1e` 1. seçenek `geri_bildirim_tr` | Hobini söyledin ve konuyu hafta sonuna bağladın. | | GEÇTİ | |
| `n1e` 2. seçenek `tr` | Hafta sonu çalışıyorum. | | GEÇTİ | |
| `n1e` 2. seçenek `geri_bildirim_tr` | Boş zamanını soruyor. Sevdiğin şeyi söyle: **Mein Hobby ist …** | | GEÇTİ | |
| `n2` `tr` | Ne güzel! Eee, hafta sonun nasıldı? | | GEÇTİ | |
| `prova.kapanis_tr` | Yeni biriyle iş yerinde tanıştın: nereli olduğunu, nerede oturduğunu, işini, dillerini ve hobini söyledin. Sonra hafta sonunda ne yaptığını anlattın. | Kendimi tanıttım, sonra hafta sonumu anlattım. | GEÇTİ | 14 ve 6 kelime. Önceki rapordaki terim sorunu ("geçmiş zaman") gitmiş. |
| `okuma_yazma.yazma.gorev_tr` | Derya'ya cevap yaz: **Liebe Derya,** ile başla, **Viele Grüße** ile bitir. Hafta sonu nerede olduğunu, ne yediğini ve bir sorunu iki üç cümleyle anlat. Bir nedeni **denn** ile söyle. | Başı ve sonu belli bir mesaj. Hafta sonu, yemek, bir sorun ve **denn** ile bir neden. | GEÇTİ | 11, 13 ve 6 kelime. |
| `kontrol_tr[0]` | **Liebe Derya,** ile başlayıp **Viele Grüße** ile bitirdin mi? | | GEÇTİ | |
| `kontrol_tr[1]` | Nerede olduğunu **war** ile, nedenini **denn das Wetter war …** gibi yazdın mı? | Yeri **war** ile, nedeni **denn** ile yazdım mı? | GEÇTİ | 12 kelime, iki parça aynı cümle düzeninde. |
| `kontrol_tr[2]` | **gegessen** ve **ausgefallen** cümlenin sonunda mı? | | GEÇTİ | Metin aynı. |

### hafta-sonu-testi-07.json

| Yer | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `m1:49:t13` `situation_tr` | Sınav provası. Görevli seni tanımak istiyor. Kart: **Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?** Her karta bir kısa cümle söyle. | | **GERİ** | GERİ #5 |
| `m1:49:t13` `why_tr` | Her kart bir kısa cümle olur: **Ich heiße …**, … **Mein Hobby ist …**. | | **GERİ** | GERİ #6 |

### hafta-sonu-testi-08.json

| Yer | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `m1:54:t13` `situation_tr` | Sınav provası. Kartlar önünde: **Name? Alter? Land? Wohnort? Sprachen? Beruf? Hobby?** Görevli kendini anlatmanı istiyor. Bu kez cümleleri **und** ile bağla: dört beş cümle yeter. | | **GERİ** | GERİ #7 |
| `m1:54:t13` `why_tr` | İki bilgiyi **und** ile bağlayınca konuşma akar. Aynı kişi için **und**dan sonra **ich** gerekmez: **Ich heiße … und bin … Jahre alt.** | İki cümleyi **und** ile birleştirince ikinci **ich** düşer. | GEÇTİ | 7 ve 13 kelime. "Aynı kişi için" sözü tek başına bulanık, ama örnek açıyor. |
