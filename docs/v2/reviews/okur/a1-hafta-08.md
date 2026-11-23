# Okur kontrolü: A1 8. hafta (OD-9.3)

Girdi: `content/v2/m1/gun-50.json` … `gun-54.json` ve `content/v2/m1/gorulmemis-08.json`.
Okuyan: Türkçe konuşan, Almancası A2 başı, dilbilgisi terimi bilmeyen öğrenci. Akşam, telefondan, ilk kez okuyor.

Okunan alanlar: `title_tr`, `goal_tr`, `can_do.tr`, halka kalıplarının ve görev cümlelerinin `tr`'si, `ortam_tr`, `sahne_tr`, sahne ve ses satırlarının `tr`'si, `q_tr`, `opts`, `situation_tr`, `why_tr`, `geri_bildirim_tr`, `durum_tr`, `kapanis_tr`, `gorev_tr`, `kontrol_tr`, `metin_tr`, prova düğüm ve seçenek çevirileri, gün sınavı `tr`'leri, görülmemiş durumların `durum_tr`, `why_tr` ve `yer` alanları.

Her metin tek tek okundu. Açıklama, yönerge ve soru alanları aşağıda satır satır yazıldı. Düz çeviriler (sahne, ses, prova satırları, görev cümleleri) blok blok yazıldı; blokta GERİ olan satır olsaydı ayrıca yazılırdı.

## Sonuç

| | |
|---|---|
| Okunan metin | 870 (gün 50: 173, gün 51: 176, gün 52: 167, gün 53: 169, gün 54: 174, görülmemiş: 8 + 3 `yer`) |
| GEÇTİ | 862 |
| GERİ | 8 |

GERİ olan kimlikler:
1. `gun-50.json` `halkalar[m1:50:h1].kaliplar[0].tr`
2. `gun-50.json` `sahne.bolumler[b1].ayrinti[0].q_tr`
3. `gun-52.json` `halkalar[m1:52:h1].kaliplar[2].tr`
4. `gun-52.json` `gun_sinavi.maddeler[m1:52:s2].why_tr`
5. `gun-53.json` `prova.kapanis_tr`
6. `gun-54.json` `goal_tr`
7. `gun-54.json` `can_do.tr`
8. `gun-54.json` `gun_sinavi.maddeler[m1:54:s8].why_tr`

Dosya durumu (OD-9.4): `gun-50`, `gun-52`, `gun-53`, `gun-54` bu hâliyle "reviewed" sayılamaz. `gun-51` ve `gorulmemis-08` GERİ'siz.

## GERİ dönenler

Öneri sütunu yalnızca yönü söyler. Metni yazar ya da dilbilimci yazar.

| # | Yer | Metin | Kendi sözlerimle | Neden | Öneri (yön) |
|---|---|---|---|---|---|
| 1 | `gun-50.json` `halkalar[m1:50:h1].kaliplar[0].tr` (de: Es geht um …) | … için arıyorum, konu … | Bir şey için arıyorum. Sonra "konu" diye yarım bir şey daha var, ne olduğunu bilmiyorum. | Bir kutuda iki ayrı karşılık var. İkincisi ("konu …") yarım kalıyor. Hangisini öğreneceğimi anlamadım. | Tek karşılık: "… için arıyorum." ya da "Konu şu: …" Biri seçilsin. |
| 2 | `gun-50.json` `sahne.bolumler[b1].ayrinti[0].q_tr` | Frau Brandl önce hangi günü duyuyor? | Satıcı ilk hangi günü söyledi, Brandl Hanım onu duydu. Salı derdim. | İki anlama geliyor. Satıcı salı diyor, kulağına gelen salı. Beklenen cevap perşembe, yani yanlış anladığı gün. Şıklarda ikisi de var. | Soru "yanlış anladığı" günü sorduğunu açıkça söylesin. |
| 3 | `gun-52.json` `halkalar[m1:52:h1].kaliplar[2].tr` (de: Bei mir nur …) | Bende sadece … | Benim yanımda yalnızca … var. | Asıl anlam "benim dükkânımda yalnız … geçer". Aynı halkada "Bende on avro nakit var" cümlesi başka bir Almanca kalıba (**Ich habe**) gidiyor. İki "bende" karışıyor. | Karşılıkta "burada, bende yalnız … geçer" anlamı görünsün. |
| 4 | `gun-52.json` `gun_sinavi.maddeler[m1:52:s2].why_tr` | **wollen** ile **wandern** sona gelir. | **wollen** ve **wandern**, ikisi birden cümlenin sonuna gelir. | "ile" hem "ve" hem "olunca" diye okunuyor. İlk okumada ikisini sona koydum. Duyduğum cümlede **wollen** ikinci kelime. | "**wollen** varsa **wandern** en sona gelir" gibi tek okunuşlu. |
| 5 | `gun-53.json` `prova.kapanis_tr` | Yeni biriyle iş yerinde tanıştın ve hafta sonunu geçmiş zamanla anlattın. | Tanıştım, sonra hafta sonumu bir dilbilgisi kuralıyla anlattım. | "Geçmiş zaman" dilbilgisi terimi. Bana öğretilmedi. | Terimsiz: hafta sonunda ne yaptığını anlattın. |
| 6 | `gun-54.json` `goal_tr` | Komşun için eczanede reçeteli ilacı alır, eksik olan ürünü ayırtır, ilacın ne zaman alınacağını sorarsın. | Komşumun ilacını satın alırım, eksik olanı ayırtırım, ilacı ne zaman gidip alacağımı sorarım. | 15 kelime. "Almak" aynı cümlede iki anlamda: satın almak ve ilacı içmek. Sondakini "gidip almak" sandım. | 14 kelimenin altına insin. İlacın kullanımı "almak" dışında bir sözle söylensin. |
| 7 | `gun-54.json` `can_do.tr` | Eczanede eksik bir ilacı ayırtır, ne zaman alınacağını sorarım. | Eksik ilacı ayırtırım, onu ne zaman gidip alabileceğimi sorarım. | İki anlama geliyor. Asıl anlam: ilaç günde ne zaman içilir. Okuduğum: ayırtılan ilaç ne zaman teslim alınır. | Kullanımı sorduğu açık olsun (ör. ilacı ne zaman kullanacağını). |
| 8 | `gun-54.json` `gun_sinavi.maddeler[m1:54:s8].why_tr` | **muss** ile **nehmen** sona gelir. | **muss** ve **nehmen** sona gelir. | 4. maddeyle aynı: "ile" iki türlü okunuyor. Cümlede **muss** sonda değil. | 4. maddeyle aynı yön. |

## Gün 50 (`gun-50.json`, 173 metin, 2 GERİ)

| Alan | Metin (kısa) | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `title_tr` | Pekiştirme: telefon ve randevu | Telefon ve randevu tekrarı. | GEÇTİ | |
| `goal_tr` | Telefonda bir günü ve saati ayarlar… | Telefonda gün saat ayarlarım, yanlışı sorarım, yeni saati tekrar ederim. | GEÇTİ | 13 kelime. |
| `can_do.tr` | Telefonda randevu saati değişince… | Randevu saati değişince yeni saati sorar, doğrularım. | GEÇTİ | |
| `halkalar[h1].title_tr` | Halı, manzara ve telefon çekingenliği | Bugünün üç kelimesi. | GEÇTİ | |
| `kaliplar[0].tr` | … için arıyorum, konu … | — | **GERİ** | Yukarıda 1. |
| `kaliplar[1].tr` | … geri ararım. – … geri arayın. | Ben geri ararım; siz geri arayın. | GEÇTİ | |
| `kaliplar[2].tr` | güzel bir manzara | Güzel manzara. | GEÇTİ | |
| `gorev_cumleleri[0–6].tr` (7) | Halıyı ne zaman getiriyorsunuz? … Çekingen olmanıza gerek yok. | Her biri Almancasıyla aynı. | GEÇTİ | |
| `sahne.ortam_tr` (halka) | İş yerinde öğle arası… | Telefon çalıyor, Derya açmamı istiyor. | GEÇTİ | |
| `sahne.satirlar[0–2].tr` (3) | Telefon! Açabilir misin lütfen? … | Almancasıyla aynı. | GEÇTİ | |
| `sahne.soru` q + opts | Derya senden ne istiyor? | Telefonu açmamı. | GEÇTİ | |
| `sahne.title_tr` (video) | Halı ne zaman geliyor? | Halının geliş zamanı. | GEÇTİ | |
| `sahneler[s1–s15].sahne_tr` (15) | Bir halı dükkânı… | Resim tarifleri, açık. | GEÇTİ | |
| `sahneler[s1–s15].tr` (15) | İyi günler Brandl Hanım… | Almancasıyla aynı. | GEÇTİ | s10–s11 harf kodlaması da açık. |
| `ana_fikir` q + opts | Telefon konuşması ne hakkında? | Halının günü ve saati. | GEÇTİ | |
| `ayrinti[0].q_tr` | Frau Brandl önce hangi günü duyuyor? | — | **GERİ** | Yukarıda 2. |
| `ayrinti[0].opts` | Salı / Perşembe / Cuma | Gün şıkları. | GEÇTİ | |
| `ayrinti[1]` q + opts | Halı sonunda saat kaçta geliyor? | Dokuz buçukta. | GEÇTİ | |
| `dikte[d1]` q + opts | Hangi kelimeyi duydun? | Duyduğum kelimeyi seçerim. | GEÇTİ | |
| `dikte[d5].gorev_tr` | Telefonda ne kararlaştırıldı?… | Varılan kararı Almanca iki kısa cümleyle yazarım. | GEÇTİ | |
| `cevapla.situation_tr` | Frau Brandl merdivende sana soruyor… | Halının gün ve saatini ona söylerim. | GEÇTİ | |
| `cevapla.why_tr` | Önce günü, sonra saati söyle… | Önce gün, sonra saat. | GEÇTİ | |
| `sesler[a1].title_tr`, `ortam_tr` | Muayenehaneden sesli mesaj… | Akşam muayenehanenin mesajını dinliyorum. | GEÇTİ (2) | |
| `a1.script[c1–c5].tr` (5) | İyi günler, Dr. Weber muayenehanesinden… | Almancasıyla aynı. | GEÇTİ | |
| `a1.ana_fikir` q + opts | Mesaj ne söylüyor? | Randevum değişiyor. | GEÇTİ | |
| `a1.ayrinti[0]` q + opts | Eski randevu ne zamandı? | Perşembe on. | GEÇTİ | |
| `a1.ayrinti[1]` q + opts | Frau Huber hangi saati öneriyor? | Cuma 8.15. | GEÇTİ | |
| `a1.dikte[d1]` q + opts | Hangi kelimeyi duydun? | Duyduğumu seçerim. | GEÇTİ | |
| `a1.dikte[d5].gorev_tr` | Mesajda ne dendi?… | Mesajı iki kısa cümleyle yazarım. | GEÇTİ | |
| `a1.cevapla.situation_tr` | Muayenehaneyi geri arıyorsun… | Adımı söyler, cumayı kabul ederim. | GEÇTİ | |
| `a1.cevapla.why_tr` | Önce adını söyle, sonra önerilen saati tekrar et… | Ad, sonra saatin tekrarı. | GEÇTİ | |
| `a1.eylem` q + opts | Ne yapmalısın? | Geri aramalıyım. | GEÇTİ | |
| `a1.eylem.why_tr` | Frau Huber geri aramanı ve cumanın uyup uymadığını… | Geri arayıp cuma olur mu söyleyeceğim. | GEÇTİ | |
| `sesler[a2].title_tr`, `ortam_tr` | Radyoda otel reklamı… | Mutfakta radyoda reklam. | GEÇTİ (2) | |
| `a2.script[c1–c5].tr` (5) | Hafta sonu bir yere gitmek mi… | Almancasıyla aynı. | GEÇTİ | |
| `a2.ana_fikir` q + opts | Bu ne? | Otel reklamı. | GEÇTİ | |
| `a2.ayrinti[0]`, `[1]` q + opts (4) | İki kişilik oda ne kadar? / Oteli ne zaman arayabilirsin? | 90 avro; hafta içi 9–18. | GEÇTİ | |
| `a2.dikte[d1]` q + opts | Hangi sayıyı duydun? | Sayıyı seçerim. | GEÇTİ | |
| `a2.dikte[d5].gorev_tr` | Reklamda ne dendi?… | İki kısa cümle yazarım. | GEÇTİ | |
| `a2.cevapla.situation_tr` | Arkadaşın da reklamı duymuş… | Fiyatı söylerim. | GEÇTİ | |
| `a2.cevapla.why_tr` | Fiyatı söylerken **kostet** ve sayıyı kullan… | kostet ve doksan avro derim. | GEÇTİ | |
| `a2.eylem` q + opts | Oteli cumartesi öğleden sonra aramak istiyorsun… | Kimse açmaz, hafta içi ararım. | GEÇTİ | |
| `a2.eylem.why_tr` | Otel yalnız pazartesiden cumaya… | Yalnız hafta içi 9–18 açıklar. | GEÇTİ | |
| `prova.title_tr` | Muayenehaneyi geri arıyorsun | Geri arama provası. | GEÇTİ | |
| `prova.durum_tr` | Frau Huber perşembe randevunun olmadığını… | Geri arıyorum, cuma sabahı bana uymuyor. | GEÇTİ | |
| `dugumler[n1–n9].tr` (8) | Dr. Weber muayenehanesi… | Almancasıyla aynı. | GEÇTİ | |
| `secenekler[*].tr` (13) | İyi günler, ben {name}… | Almancasıyla aynı. | GEÇTİ | |
| `n1.secenekler[0].geri_bildirim_tr` | Çok iyi. Adını ve neden aradığını hemen söyledin. | Ad ve sebep tamam. | GEÇTİ | |
| `n1.secenekler[1].geri_bildirim_tr` | Anlaşılır. **Es geht um meinen Termin** daha tam bir cümle. | Olur ama öbür cümle daha tam. | GEÇTİ | |
| `n1.secenekler[2].geri_bildirim_tr` | Frau Huber henüz kim olduğunu bilmiyor… | Önce adımı söylemeliyim. | GEÇTİ | |
| `n1b.secenekler[0].geri_bildirim_tr` | İyi toparladın… | Özür, ad, konu: iyi. | GEÇTİ | |
| `n2.secenekler[0].geri_bildirim_tr` | Neden olmadığını da söyledin… | Sebep verdim, başka saat bakacak. | GEÇTİ | |
| `n2.secenekler[1].geri_bildirim_tr` | Frau Huber **nach** dedi: sekizi çeyrek geçe… | Yanlış duydum; emin değilsem tekrar ettiririm. | GEÇTİ | |
| `n2b.secenekler[0].geri_bildirim_tr` | Saati duydun ve neden olmadığını söyledin. | Tamam. | GEÇTİ | |
| `n3.secenekler[0].geri_bildirim_tr` | Doğru hamle. Emin değilsen tekrar ettirmek ayıp değil. | Tekrar istemek iyi. | GEÇTİ | |
| `n3.secenekler[1].geri_bildirim_tr` | Günü ve saati tekrar ettin… | Tekrar ettim, karışıklık yok. | GEÇTİ | |
| `n3.secenekler[2].geri_bildirim_tr` | **halb fünf** öğleden sonra dört buçuk demek… | Burada 16.30; işten sonra, erken değil. | GEÇTİ | |
| `n4.secenekler[0].geri_bildirim_tr` | Saati iki biçimde de duydun ve onayladın. | İki söyleyişi de anladım. | GEÇTİ | |
| `n4.secenekler[1].geri_bildirim_tr` | **halb fünf** beşe yarım saat kala demek… | Dört buçuk, beş otuz değil. | GEÇTİ | |
| `n5.secenekler[0].geri_bildirim_tr` | Teşekkür ettin ve günü bir kez daha söyledin. | Tamam. | GEÇTİ | |
| `prova.kapanis_tr` | Randevu değişti, yanlış duyduğunda sordun… | Ne yaptığımın özeti. | GEÇTİ | |
| `okuma_yazma.title_tr` | Derya'dan mesaj | Derya'nın mesajı. | GEÇTİ | |
| `okuma_yazma.metin_tr` | Merhaba {name}! Pazartesi bir iş arkadaşı geliyor… | Almancasıyla aynı. | GEÇTİ | |
| `sorular[o1–o3]` q + opts (6) | Derya neden yazıyor? … | Yeni arkadaşa yardım; çekingen; dokuzda. | GEÇTİ | |
| `sorular[o4].situation_tr` | Derya'ya cevap ver: Olur, dokuzda gösterirsin. | Olur, dokuzda derim. | GEÇTİ | |
| `sorular[o4].why_tr` | Saati tekrar et ve **geht** ile onayla. | Saat + geht. | GEÇTİ | |
| `gun_sinavi[s1–s4].situation_tr` (4) | Duyduğunu yaz. | Duyduğumu yazarım. | GEÇTİ | |
| `s1.why_tr` | **buchstabieren** harf harf söylemek demektir. | Harf harf söylemek. | GEÇTİ | |
| `s2.why_tr` | **der Teppich** halı, **der Flur** koridor demektir. | İki kelimenin anlamı. | GEÇTİ | |
| `s3.why_tr` | **zurück** cümlenin sonuna gelir. | zurück sonda. | GEÇTİ | |
| `s4.why_tr` | **die Aussicht** manzara demektir. | Manzara. | GEÇTİ | |
| `s5–s8.tr` (4) | Halı salı günü geliyor. … Sizi yarın geri ararım. | Çevireceğim cümleler, tek anlamlı. | GEÇTİ | |
| `s5.why_tr` | Gün için **am Dienstag** dersin. | Gün önüne am. | GEÇTİ | |
| `s6.why_tr` | Sekizi çeyrek geçe **Viertel nach acht** demektir. | Saatin söylenişi. | GEÇTİ | |
| `s7.why_tr` | Soruda **Bist du** başa gelir. | Soruda Bist du başta. | GEÇTİ | |
| `s8.why_tr` | **Ich rufe Sie morgen zurück** cümlesinde **zurück** en sona gelir. | zurück en sonda. | GEÇTİ | |
| `s9.situation_tr`, `why_tr` | Satıcı halıyı sabah sekizde… / Önce **zu früh** de… | Çok erken der, dokuz buçuğu sorarım. | GEÇTİ (2) | |
| `s10.situation_tr`, `why_tr` | Sekreter yeni saati söyledi ama tam duymadın… | Tekrar etmesini rica ederim. | GEÇTİ (2) | |
| `s11.situation_tr`, `why_tr` | Muayenehaneyi arıyorsun. Selam ver… | Selam, ad, perşembe randevusu için arıyorum. | GEÇTİ (2) | |

## Gün 51 (`gun-51.json`, 176 metin, 0 GERİ)

| Alan | Metin (kısa) | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `title_tr` | Pekiştirme: alışveriş ve fiyat | Alışveriş tekrarı. | GEÇTİ | |
| `goal_tr` | Pazarda fiyat sorar, istediğin şey bitince… | Fiyat sorarım, bitene karşı başka şey seçerim, yanlış duyduğum fiyatı sorarım. | GEÇTİ | 14 kelime, sınırda. |
| `can_do.tr` | İstediğim şey bitmişse başka bir şey seçer… | Aynı. | GEÇTİ | |
| `halkalar[h1].title_tr` | Gezi planı, alışveriş ve gecikme | Üç kelime. | GEÇTİ | |
| `kaliplar[0].tr` | … ne yapmayı düşünüyorsun? – … bir planınız var mı? | Plan sorusu, sen ve siz. | GEÇTİ | |
| `kaliplar[1].tr` | O zaman … alayım. | O zaman şunu alayım. | GEÇTİ | |
| `kaliplar[2].tr` | yarım kilo … | Yarım kilo. | GEÇTİ | |
| `gorev_cumleleri[0–8].tr` (9) | Cumartesi bir gezi yapıyoruz. … Tren gecikmeli mi? | Almancasıyla aynı. | GEÇTİ | |
| `sahne.ortam_tr` (halka) | Cuma öğleden sonra, iş yerinde… | Şef kapıda. | GEÇTİ | |
| `sahne.satirlar[0–2].tr` (3) | Hafta sonu bir planınız var mı? … | Almancasıyla aynı. | GEÇTİ | |
| `sahne.soru` q + opts | Pazar günü ne yapıyorsun? | Göle geziye gidiyorum. | GEÇTİ | |
| `sahne.title_tr` (video) | Gezi için pazar alışverişi | Gezi için pazar yerinden alışveriş. | GEÇTİ | "pazar" burada çarşı; gezinin günü de pazar. Bağlamdan çıktı. |
| `sahneler[s1–s17].sahne_tr` (17) | Cumartesi sabahı Stadtplatz'ta pazar kurulmuş… | Resim tarifleri. | GEÇTİ | |
| `sahneler[s1–s17].tr` (17) | Yarın göle bir gezi yapıyoruz. … | Almancasıyla aynı. | GEÇTİ | |
| `ana_fikir` q + opts | Tobi ve Ioana ne yapıyor? | Gezi alışverişi. | GEÇTİ | |
| `ayrinti[0–2]` q + opts (6) | Tobi neden sadece yarım kilo… / Tezgâhta ne kalmamış? / Sonunda kim ödüyor? | Pahalı; ekmek; Ioana nakit. | GEÇTİ | |
| `dikte[d1]` q + opts | Hangi sayıyı duydun? | Sayıyı seçerim. | GEÇTİ | |
| `dikte[d5].gorev_tr` | Pazarda ne oldu?… | İki kısa cümle. | GEÇTİ | |
| `cevapla.situation_tr` | Pazarda sen de alışveriş yapıyorsun… O zaman elma al. | Peynir yok, elma isterim. | GEÇTİ | |
| `cevapla.why_tr` | İstediğin şey yoksa **Dann nehme ich Äpfel** gibi… | Yoksa başka şey seçerim. | GEÇTİ | |
| `sesler[a1].title_tr`, `ortam_tr` | Garda otobüs anonsu… | Durakta anons. | GEÇTİ (2) | |
| `a1.script[c1–c5].tr` (5) | Burası Wendlfing garı. … | Almancasıyla aynı. | GEÇTİ | |
| `a1.ana_fikir` q + opts | Anons ne hakkında? | Otobüs gecikiyor. | GEÇTİ | |
| `a1.ayrinti[0–1]` q + opts (4) | Otobüs kaç dakika gecikmeli? / Saat ondaki tren… | 25; gecikmiyor. | GEÇTİ | |
| `a1.dikte[d1]` q + opts | Hangi sayıyı duydun? | | GEÇTİ | |
| `a1.dikte[d5].gorev_tr` | Anonsta ne dendi?… | | GEÇTİ | |
| `a1.cevapla.situation_tr` | Tobi telefon ediyor, otobüsü soruyor… | Otobüs ne zaman geliyor, söylerim. | GEÇTİ | |
| `a1.cevapla.why_tr` | Önce **Der Bus hat Verspätung** de, sonra yeni saati söyle. | Gecikme, sonra saat. | GEÇTİ | |
| `a1.eylem` q + opts | Tobi ile durakta saat dokuzda buluşacaksınız… | Tobi'ye 9.25'i haber veririm. | GEÇTİ | |
| `a1.eylem.why_tr` | Otobüs gelmiyor değil, sadece geç geliyor… | Otobüs gelecek, ama geç. | GEÇTİ | |
| `sesler[a2].title_tr`, `ortam_tr` | Ioana'dan sesli mesaj… | Garda bekliyorum, mesaj var. | GEÇTİ (2) | |
| `a2.script[c1–c5].tr` (5) | Merhaba, ben Ioana. … | Almancasıyla aynı. | GEÇTİ | |
| `a2.ana_fikir` q + opts | Ioana neden arıyor? | Geç kalacak. | GEÇTİ | |
| `a2.ayrinti[0–1]` q + opts (4) | Ioana garda saat kaçta olacak? / kaç dakika gecikmeli? | 9.15; 30. | GEÇTİ | |
| `a2.dikte[d1]` q + opts | Hangi sayıyı duydun? | | GEÇTİ | |
| `a2.dikte[d5].gorev_tr` | Ioana ne dedi?… | | GEÇTİ | |
| `a2.cevapla.situation_tr` | Ioana'ya kısa bir sesli mesajla cevap ver: bekliyorsunuz. | Bekliyoruz derim. | GEÇTİ | |
| `a2.cevapla.why_tr` | **wir warten** biz bekliyoruz demektir. | | GEÇTİ | |
| `a2.eylem` q + opts, `why_tr` | Ne yapmalısın? / Ioana dokuzu çeyrek geçe garda olacak… | Garda beklerim. | GEÇTİ (3) | |
| `prova.title_tr`, `durum_tr` | Fırında gezi alışverişi / Pazar sabahı… altı küçük ekmek… | Fırında altı küçük ekmek alacağım. | GEÇTİ (2) | |
| `dugumler[*].tr` (7), `secenekler[*].tr` (12) | Günaydın! Ne istersiniz? … | Almancasıyla aynı. | GEÇTİ | |
| `n1.secenekler[0].geri_bildirim_tr` | Selam verdin ve ne istediğini kısa söyledin. | | GEÇTİ | |
| `n1.secenekler[1].geri_bildirim_tr` | Güzel. Bir cümle daha ekleyip sohbet başlattın. | | GEÇTİ | |
| `n1.secenekler[2].geri_bildirim_tr` | Tek kelime sert duyulur ve sayı eksik… | Kaba ve eksik; tam cümleyi söylerim. | GEÇTİ | |
| `n1b.secenekler[0].geri_bildirim_tr` | Şimdi oldu. Sayıyı ve **bitte** kelimesini söyledin. | | GEÇTİ | |
| `n2.secenekler[0–2].geri_bildirim_tr` (3) | Harika. Eksik olanın yerine… / Kısa ve açık… / Frau Stadler'in sadece dört tanesi var… | Başka şey seçtim; tamam; dört varsa dördü alırım. | GEÇTİ | |
| `n3.secenekler[0].geri_bildirim_tr` | Fiyatı tekrar ederek doğruladın. | | GEÇTİ | |
| `n3.secenekler[1].geri_bildirim_tr` | **sechs Euro zehn** ile **sechzehn** kulağa yakın gelir… | İki sayı birbirine benzer, emin değilsem sorarım. | GEÇTİ | |
| `n3b`, `n4` geri_bildirim_tr (3) | İyi toparladın… / Kısa ve doğal… / Tam bir cümle kurdun. | | GEÇTİ | |
| `prova.kapanis_tr` | Ürün eksik çıkınca başka bir şey seçtin… | Özet. | GEÇTİ | |
| `okuma_yazma.title_tr`, `metin_tr` | Tobi'ye cevap yaz / Merhaba {name}!… | | GEÇTİ (2) | |
| `sorular[o1]` q + opts | Tobi ne soruyor? | Geziye geliyor muyum. | GEÇTİ | |
| `yazma.gorev_tr` | Tobi'ye kısa bir cevap yaz. Pazar boş olduğunu… | Boşum, geliyorum, şunu alırım yazarım. | GEÇTİ | |
| `yazma.kontrol_tr[0–2]` (3) | Pazar günü boş olduğunu yazdın mı? … **mit** sona geldi mi? | Üç kontrol. | GEÇTİ | |
| `gun_sinavi[s1–s4].situation_tr` (4) | Duyduğunu yaz. | | GEÇTİ | |
| `s1.why_tr` | Birden çok şey için **kosten** dersin. | Elmalar çok, kosten. | GEÇTİ | Tek okumada oturdu; **kostet** ile farkı bu kutuda yok. |
| `s2.why_tr` | **vor** cümlenin sonuna gelir. | | GEÇTİ | |
| `s3.why_tr` | **Verspätung haben** gecikmeli olmak demektir. | | GEÇTİ | |
| `s4.why_tr` | **ein halbes Kilo** yarım kilo demektir. | | GEÇTİ | |
| `s5–s8.tr` (4) | Gezi için ekmek ve su lazım. … | Tek anlamlı. | GEÇTİ | |
| `s5–s8.why_tr` (4) | **brauchen** ihtiyacı olmak… / **zu teuer**… / **nichts vor** dersin ve **vor** en sona gelir / Gecikmeyi **hat … Verspätung**… | | GEÇTİ | s7'de iki bilgi var (ne denir, nereye gelir); önceki raporlardaki eşdeğer satırlar gibi GEÇTİ. |
| `s9.situation_tr`, `why_tr` | Pazarda elma kalmamış. O zaman muz al. | Muz isterim. | GEÇTİ (2) | |
| `s10.situation_tr`, `why_tr` | Fiyatı tam duymadın: altı mı, on altı mı? Sor. | İki sayıyı söyleyip sorarım. | GEÇTİ (2) | |
| `s11.situation_tr`, `why_tr` | Peynirin fiyatını sor ve yarım kilo iste. | | GEÇTİ (2) | |

## Gün 52 (`gun-52.json`, 167 metin, 2 GERİ)

| Alan | Metin (kısa) | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `title_tr` | Pekiştirme: mahallede konuşmak | | GEÇTİ | |
| `goal_tr` | Mahallede hafta sonu planını konuşur… | Plan konuşurum, nakdim yok derim, çözüm sorarım. | GEÇTİ | |
| `can_do.tr` | Mahallede hafta sonu planımı anlatır… | Aynı. | GEÇTİ | |
| `halkalar[h1].title_tr` | Takım, nakit para ve doğa yürüyüşü | | GEÇTİ | |
| `kaliplar[0].tr` | Takım … oynuyor. – Takımım … oynuyor. | | GEÇTİ | |
| `kaliplar[1].tr` | … gidip alırım. | | GEÇTİ | |
| `kaliplar[2].tr` | Bende sadece … | — | **GERİ** | Yukarıda 3. |
| `gorev_cumleleri[0–6].tr` (7) | Takım cumartesi oynuyor. … | Almancasıyla aynı. | GEÇTİ | |
| `sahne.ortam_tr` (halka) | Stadler fırını, sabah… ödeme sırası. | Ödeyeceğim. | GEÇTİ | |
| `sahne.satirlar[0–2].tr` (3) | Kartla mı, nakit mi? … | | GEÇTİ | |
| `sahne.soru` q + opts | Nasıl ödüyorsun? | Kartla. | GEÇTİ | |
| `sahne.title_tr` (video) | Kuaförde nakit sorunu | | GEÇTİ | |
| `sahneler[s1–s15].sahne_tr` (15) | Cumartesi sabahı Salon Haarwerk… | | GEÇTİ | |
| `sahneler[s1–s15].tr` (15) | Merhaba Basti!… | Almancasıyla aynı. | GEÇTİ | s11 "bende sadece nakit" burada bağlamla anlaşılıyor. |
| `ana_fikir` q + opts | Basti neden acele ediyor? | Maçı var. | GEÇTİ | |
| `ayrinti[0–2]` q + opts (6) | Maç saat kaçta? / Basti neden şimdi ödeyemiyor? / Luka yarın ne yapıyor? | Üçte; nakit yok; yürüyüş. | GEÇTİ | |
| `dikte[d1]` q + opts, `dikte[d5].gorev_tr` | | | GEÇTİ (3) | |
| `cevapla.situation_tr` | Sen de Luka'dasın… Sende nakit var. | Nakdim var derim. | GEÇTİ | |
| `cevapla.why_tr` | Nakdin varsa **Ich habe Bargeld** dersin. | | GEÇTİ | |
| `sesler[a1].title_tr`, `ortam_tr` | Meydanda maç duyurusu… | | GEÇTİ (2) | |
| `a1.script[c1–c5].tr` (5) | Cumartesi saat üçte Wendlfing takımı oynuyor. … | | GEÇTİ | |
| `a1.ana_fikir` q + opts | Duyuru ne hakkında? | Cumartesi maç. | GEÇTİ | |
| `a1.ayrinti[0–1]` q + opts (4) | Bilet kaç avro? / Neyle ödemelisin? | 5; nakit. | GEÇTİ | |
| `a1.dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `a1.cevapla.situation_tr`, `why_tr` | Komşun duyuruyu kaçırmış… / Önce günü, sonra saati söyle… | Gün, saat. | GEÇTİ (2) | |
| `a1.eylem` q + opts, `why_tr` | Maça gitmek istiyorsun ama cüzdanında hiç para yok… / Duyuruya göre nakit… | Önce nakit çekerim. | GEÇTİ (3) | |
| `sesler[a2].title_tr`, `ortam_tr` | Frau Brandl'dan sesli mesaj… | | GEÇTİ (2) | |
| `a2.script[c1–c5].tr` (5) | Merhaba, ben Rosa Brandl. … | | GEÇTİ | |
| `a2.ana_fikir` q + opts | Frau Brandl ne istiyor? | Ödünç para. | GEÇTİ | |
| `a2.ayrinti[0–1]` q + opts (4) | Ne kadar nakit var? / Ne kadar ödünç istiyor? | 10; 20. | GEÇTİ | |
| `a2.dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `a2.cevapla.situation_tr` | Frau Brandl'ın kapısındasın. Parayı verirken söyle. | Parayı verirken "buyurun, yirmi avro" derim. | GEÇTİ | Ne söyleyeceğim yazmıyor; parayı verirken söylenecek söz tek olduğu için tahmin ettim. |
| `a2.cevapla.why_tr` | Parayı uzatırken **Hier sind zwanzig Euro** dersin. | | GEÇTİ | |
| `a2.eylem` q + opts, `why_tr` | Ne yapmalısın? / Frau Brandl kapıda bekliyor… | Aşağı inip yirmi avro götürürüm. | GEÇTİ (3) | |
| `prova.title_tr`, `durum_tr` | Basti seni maça çağırıyor / Spor salonunda… | | GEÇTİ (2) | |
| `dugumler[*].tr` (6), `secenekler[*].tr` (10) | Merhaba! Cumartesi vaktin var mı? … | Almancasıyla aynı. | GEÇTİ | |
| `n1.secenekler[0–1].geri_bildirim_tr` (2) | Açık bir cevap… / Önce sormak da doğal… | | GEÇTİ | |
| `n2.secenekler[0].geri_bildirim_tr` | Kabul ettin ve önemli bir şey sordun: fiyat. | | GEÇTİ | |
| `n2.secenekler[1].geri_bildirim_tr` | Kibarca hayır dedin ve nedenini söyledin. | | GEÇTİ | |
| `n2.secenekler[2].geri_bildirim_tr` | Tek başına **Nein** soğuk duyulur… | Neden eklerim ya da kabul ederim. | GEÇTİ | |
| `n2b.secenekler[0].geri_bildirim_tr` | Planını değiştirdin, kabul ettin ve fiyatı sordun. | | GEÇTİ | |
| `n3.secenekler[0–2].geri_bildirim_tr` (3) | Çözümü kendin buldun… / Kısa ve açık. / Basti az önce **nur Bargeld** dedi… | Kart geçmiyor, nakit bulmalıyım. | GEÇTİ | |
| `n4.secenekler[0].geri_bildirim_tr` | Sıcak bir kapanış. | | GEÇTİ | |
| `prova.kapanis_tr` | Bir daveti kabul ettin, fiyatı sordun… | | GEÇTİ | |
| `okuma_yazma.title_tr`, `metin_tr` | Apartman panosunda bir not / Merhaba sevgili komşular!… | | GEÇTİ (2) | |
| `sorular[o1–o3]` q + opts (6) | Herr Pichler ne duyuruyor? … | Hafta sonu yok; yürüyüş; mesaj yazarım. | GEÇTİ | |
| `sorular[o4].situation_tr`, `why_tr` | Pazar günü banyoda bir şey bozuldu… / **kaputt** … **im Bad**… | Banyoda bir şey bozuk diye yazarım. | GEÇTİ (2) | |
| `gun_sinavi[s1–s4].situation_tr` (4) | Duyduğunu yaz. | | GEÇTİ | |
| `s1.why_tr` | **Bargeld** nakit para demektir. | | GEÇTİ | |
| `s2.why_tr` | **wollen** ile **wandern** sona gelir. | — | **GERİ** | Yukarıda 4. |
| `s3.why_tr`, `s4.why_tr` | **die Mannschaft** takım… / …diyerek izin istersin. | | GEÇTİ (2) | |
| `s5–s8.tr` (4) | Yanımda nakit yok. … Bana on avro ödünç verebilir misin? | | GEÇTİ | |
| `s5–s8.why_tr` (4) | Olmayan şey için **kein**… / **Möchtest du** ile teklif edersin ve **wandern** en sona gelir / **spielt** oynuyor… / Ödünç isterken… | | GEÇTİ | s6'da "ile" bu kez "kullanarak" diye tek okunuyor. |
| `s9.situation_tr`, `why_tr` | Kuaförde ödeme sırası… / Önce **Ich habe kein Bargeld** de… | Nakdim yok, yarın ödeyebilir miyim. | GEÇTİ (2) | |
| `s10.situation_tr`, `why_tr` | Komşun hafta sonu planını soruyor… | Pazar yürüyüşe gidiyorum. | GEÇTİ (2) | |
| `s11.situation_tr`, `why_tr` | Basti seni cumartesi maçına çağırıyor… | Kabul, saat sorusu. | GEÇTİ (2) | |

## Gün 53 (`gun-53.json`, 169 metin, 1 GERİ)

| Alan | Metin (kısa) | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `title_tr` | Pekiştirme: dün ve hafta sonu | | GEÇTİ | |
| `goal_tr` | Hafta sonunda nerede olduğunu, ne yediğini… | Nerede, ne yedim, ne kötü gitti, anlatırım. | GEÇTİ | |
| `can_do.tr` | Hafta sonumu anlatır, bir şey iptal olduysa… | | GEÇTİ | |
| `halkalar[h1].title_tr` | Şikâyet, iptal ve bahşiş | | GEÇTİ | |
| `kaliplar[0–4].tr` (5) | … yedim. – … yedik. – … ne yaptın? / … iptal oluyor. – … iptal oldu. / … verdim. / Üstü kalsın. / evde – eve | Her biri açık. | GEÇTİ | |
| `gorev_cumleleri[0–6].tr` (7) | Bir şikâyetim var: Yemeğim soğuk. … | Almancasıyla aynı. | GEÇTİ | |
| `sahne.ortam_tr` (halka) | Pazar akşamı, göl kenarında bir restoran… | | GEÇTİ | |
| `sahne.satirlar[0–2].tr` (3) | On sekiz avro elli. … | | GEÇTİ | |
| `sahne.soru` q + opts | Garsona ne kadar bahşiş bırakıyorsun? | Bir avro elli. | GEÇTİ | |
| `sahne.title_tr` (video) | Pazartesi sabahı: hafta sonu nasıldı? | | GEÇTİ | |
| `sahneler[s1–s16].sahne_tr` (16) | Pazartesi sabahı ofiste kahve makinesinin önü… | | GEÇTİ | |
| `sahneler[s1–s16].tr` (16) | Günaydın Tobi!… | Almancasıyla aynı. | GEÇTİ | |
| `ana_fikir` q + opts | Tobi neyi anlatıyor? | Göl gezisini. | GEÇTİ | |
| `ayrinti[0–2]` q + opts (6) | Restoranda ne sorun vardı? / bahşiş / Eve dönerken ne oldu? | Soğuk yemek; 3 avro; tren iptal. | GEÇTİ | |
| `dikte[d1]` q + opts, `d5.gorev_tr` | …Tobi'nin hafta sonunu… anlat. | | GEÇTİ (3) | |
| `cevapla.situation_tr` | Derya sana soruyor. Pazar göldeydin, hava güzeldi. | Bunu söylerim. | GEÇTİ | |
| `cevapla.why_tr` | Geçmişte nerede olduğunu **war** ile söylersin… | Nerede olduğumu war ile. | GEÇTİ | |
| `sesler[a1].title_tr`, `ortam_tr` | Göl kenarındaki istasyonda anons… | | GEÇTİ (2) | |
| `a1.script[c1–c4].tr` (4) | Saat on sekizdeki Wendlfing treni bugün iptal. … | | GEÇTİ | |
| `a1.ana_fikir` q + opts | Anons ne söylüyor? | Tren iptal, otobüse bin. | GEÇTİ | |
| `a1.ayrinti[0–1]` q + opts (4) | Otobüs saat kaçta? / Durak nerede? | 18.20; solda. | GEÇTİ | |
| `a1.dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `a1.cevapla.situation_tr`, `why_tr` | Yanındaki kadın anonsu anlamamış… / İptal için **fällt aus**… | Tren iptal, otobüs saati. | GEÇTİ (2) | |
| `a1.eylem` q + opts, `why_tr` | Eve dönmek için ne yapmalısın? / Tren iptal olduğu için… | Soldaki duraktan 18.20 otobüsü. | GEÇTİ (3) | |
| `sesler[a2].title_tr`, `ortam_tr` | Herr Pichler'den sesli mesaj… | | GEÇTİ (2) | |
| `a2.script[c1–c5].tr` (5) | Merhaba, ben apartman görevlisi Pichler. … | | GEÇTİ | |
| `a2.ana_fikir` q + opts | Herr Pichler neden arıyor? | Gürültü şikâyeti. | GEÇTİ | |
| `a2.ayrinti[0–1]` q + opts (4) | Gürültü ne zaman olmuş? / senden ne istiyor? | Cumartesi gecesi; bugün aramamı. | GEÇTİ | |
| `a2.dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `a2.cevapla.situation_tr`, `why_tr` | Herr Pichler'i geri arıyorsun… / Önce adını söyle… | Ad, sonra evde değildim. | GEÇTİ (2) | |
| `a2.eylem` q + opts, `why_tr` | Cumartesi gecesi evde değildin. Ne yapmalısın? / …yanlışlığı açıklamalısın. | Arayıp evde olmadığımı söylerim. | GEÇTİ (3) | |
| `prova.title_tr`, `durum_tr` | Yeni iş arkadaşıyla ilk sohbet… | | GEÇTİ (2) | |
| `dugumler[*].tr` (7), `secenekler[*].tr` (10) | Merhaba! Ofiste yeniyim. … | Almancasıyla aynı. | GEÇTİ | |
| `n1.secenekler[0–2].geri_bildirim_tr` (3) | Adını söyledin… / Kısa ve doğal… / Henüz tanışmadınız. Önce adını söyle. | | GEÇTİ | |
| `n1b.secenekler[0].geri_bildirim_tr` | İyi toparladın: özür diledin ve kendini tanıttın. | | GEÇTİ | |
| `n2.secenekler[0].geri_bildirim_tr` | Nerede olduğunu **war** ile doğru anlattın. | | GEÇTİ | |
| `n2.secenekler[1].geri_bildirim_tr` | Kötü giden şeyi de söylemek sohbeti açar. | | GEÇTİ | |
| `n2.secenekler[2].geri_bildirim_tr` | O geçmiş hafta sonunu soruyor… | Geçen hafta sonunu soruyor, onu anlatmalıyım. | GEÇTİ | |
| `n3`, `n3b`, `n4` geri_bildirim_tr (3) | Soruyu geri sordun… / Kötü haberi kısa tuttun… / Sıcak bir teklif… | | GEÇTİ | |
| `prova.kapanis_tr` | …hafta sonunu geçmiş zamanla anlattın. | — | **GERİ** | Yukarıda 5. |
| `okuma_yazma.title_tr`, `metin_tr` | Derya'ya hafta sonunu yaz / Merhaba {name}!… | | GEÇTİ (2) | |
| `sorular[o1]` q + opts | Derya'nın cumartesi kursu ne oldu? | İptal. | GEÇTİ | |
| `yazma.gorev_tr` | Derya'ya cevap yaz. Hafta sonu nerede olduğunu… | Nerede, ne yedim, bir sorun; 2–3 cümle. | GEÇTİ | |
| `yazma.kontrol_tr[0–2]` (3) | …**war** ile yazdın mı? / …ne yaptığını yazdın mı? / **gegessen** ve **ausgefallen** cümlenin sonunda mı? | | GEÇTİ | |
| `gun_sinavi[s1–s4].situation_tr` (4) | Duyduğunu yaz. | | GEÇTİ | |
| `s1.why_tr` | **fällt aus** iptal oluyor demektir ve **aus** en sona gelir. | | GEÇTİ | İki bilgi; önceki raporlardaki eşdeğer satırlar gibi GEÇTİ. |
| `s2.why_tr`, `s3.why_tr` | **gegessen** cümlenin sonuna gelir. / **das Trinkgeld** bahşiş… | | GEÇTİ (2) | |
| `s4.why_tr` | **war** geçmişte idi demektir. | war, "-di/idi" demek. | GEÇTİ | "idi" tek başına eski duruyor ama anlaşılıyor. |
| `s5–s8.tr` (4) | Dün gece müzik fazla yüksekti. … | | GEÇTİ | |
| `s5–s8.why_tr` (4) | **zu laut** / Olmuş bir iptal için **ist ausgefallen** / **Ich habe eine Beschwerde** / Evde **zu Hause** | | GEÇTİ | |
| `s9.situation_tr`, `why_tr` | Herr Pichler gürültüden şikâyet ediyor… | Evde değildim derim. | GEÇTİ (2) | |
| `s10.situation_tr`, `why_tr` | Restoranda hesap on sekiz avro… | Yirmi verir, üstü kalsın derim. | GEÇTİ (2) | |
| `s11.situation_tr`, `why_tr` | Pazartesi işte yeni iş arkadaşın… | Göldeydim ama tren iptal oldu. | GEÇTİ (2) | |

## Gün 54 (`gun-54.json`, 174 metin, 3 GERİ)

| Alan | Metin (kısa) | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|
| `title_tr` | Pekiştirme: doktor ve eczane | | GEÇTİ | |
| `goal_tr` | Komşun için eczanede reçeteli ilacı alır… | — | **GERİ** | Yukarıda 6. |
| `can_do.tr` | Eczanede eksik bir ilacı ayırtır, ne zaman alınacağını sorarım. | — | **GERİ** | Yukarıda 7. |
| `halkalar[h1].title_tr` | Emeklilik, paketlemek ve ayırtmak | | GEÇTİ | Başlıkta "paketlemek", kalıpta "çantaya koyuyorum" var. Kalıp kendi başına açık. |
| `kaliplar[0].tr` | … ayırabilir misiniz? – … ayırıyorum. – … ayrıldı. | | GEÇTİ | |
| `kaliplar[1].tr` | … çantaya koyuyorum. | | GEÇTİ | |
| `kaliplar[2].tr` | …m ağrıyor. – … ne zamandan beri ağrıyor? | Bacağım ağrıyor; ne zamandan beri. | GEÇTİ | "…m" ilk bakışta tuhaf, ikinci yarı açıklıyor. |
| `kaliplar[3].tr` | evde | | GEÇTİ | |
| `gorev_cumleleri[0–7].tr` (8) | Kadın komşum emekli. … Merhem sizin için ayrıldı. | Almancasıyla aynı. | GEÇTİ | |
| `sahne.ortam_tr` (halka) | Vils-Apotheke'de tezgâh… | | GEÇTİ | |
| `sahne.satirlar[0–2].tr` (3) | Poşet ister misiniz? … | | GEÇTİ | |
| `sahne.soru` q + opts | Poşet alıyor musun? | Hayır, çantama koyuyorum. | GEÇTİ | |
| `sahne.title_tr` (video) | Frau Brandl doktorda | | GEÇTİ | |
| `sahneler[s1–s14].sahne_tr` (14) | Dr. Weber'in muayenehanesi, bekleme odası… | | GEÇTİ | |
| `sahneler[s1–s14].tr` (14) | Brandl Hanım? Buyurun, iki numaralı oda. … | Almancasıyla aynı. | GEÇTİ | |
| `ana_fikir` q + opts | Frau Brandl neden doktorda? | Düştü, bacağı ağrıyor. | GEÇTİ | |
| `ayrinti[0–2]` q + opts (6) | Bacak ne zamandan beri… / Tableti ne zaman almalı? / kaç yaşında? | Dün akşam; sabah-akşam; 79. | GEÇTİ | Burada "almalı" bağlamdan "içmeli" diye okunuyor. |
| `dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `cevapla.situation_tr` | Eczacı soruyor: Frau Brandl tabletleri ne zaman alacak?… | Doktorun dediğini söylerim. | GEÇTİ | |
| `cevapla.why_tr` | Zamanı **am Morgen und am Abend** ile söylersin. | | GEÇTİ | |
| `sesler[a1].title_tr`, `ortam_tr` | Eczaneden sesli mesaj… | | GEÇTİ (2) | |
| `a1.script[c1–c5].tr` (5) | İyi günler, eczaneden arıyoruz. … | | GEÇTİ | |
| `a1.ana_fikir` q + opts | Eczane neden arıyor? | Merhem geldi. | GEÇTİ | |
| `a1.ayrinti[0–1]` q + opts (4) | Merhem ne zamana kadar ayrılmış? / Yanında ne getirmelisin? | Cuma; reçete. | GEÇTİ | |
| `a1.dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `a1.cevapla.situation_tr`, `why_tr` | Eczaneyi geri arıyorsun. Merhemi yarın saat onda alacağını söyle. / Adını söyle, sonra gün ve saati ver… | Ad, yarın onda gelirim. | GEÇTİ (2) | |
| `a1.eylem` q + opts, `why_tr` | Ne yapmalısın? / Merhem cumaya kadar ayrılmış… | Cumaya kadar reçeteyle giderim. | GEÇTİ (3) | |
| `sesler[a2].title_tr`, `ortam_tr` | Eczanenin telefon kaydı / Cumartesi öğleden sonra… | | GEÇTİ (2) | |
| `a2.script[c1–c5].tr` (5) | Burası eczaneniz. … | | GEÇTİ | |
| `a2.ana_fikir` q + opts | Bu kayıt ne söylüyor? | Açık saatler. | GEÇTİ | |
| `a2.ayrinti[0–1]` q + opts (4) | Cumartesi saat kaça kadar açık? / Pazar günü ne olur? | 13; kapalı. | GEÇTİ | |
| `a2.dikte[d1]` q + opts, `d5.gorev_tr` | | | GEÇTİ (3) | |
| `a2.cevapla.situation_tr`, `why_tr` | Frau Brandl soruyor: eczane pazar açık mı?… / **geschlossen**… | Kapalı derim. | GEÇTİ (2) | |
| `a2.eylem` q + opts, `why_tr` | Merhemi cumartesi saat 14'te almak istiyorsun… | Daha erken giderim. | GEÇTİ (3) | |
| `prova.title_tr`, `durum_tr` | Eczanede Frau Brandl'ın ilacı / …Ona merhem ve tablet lazım. | | GEÇTİ (2) | |
| `dugumler[*].tr` (7), `secenekler[*].tr` (12) | İyi günler! Size nasıl yardımcı olabilirim? … | Almancasıyla aynı. | GEÇTİ | |
| `n1.secenekler[0–2].geri_bildirim_tr` (3) | Selam verdin ve reçeteyi kimin için… / Ne istediğin açık… / Tek kelime kaba duyulur… | | GEÇTİ | |
| `n2.secenekler[0–2].geri_bildirim_tr` (3) | Eksik ürün için çözüm istedin. / İyi soru… / Frau Brandl'ın tabletlere bugün ihtiyacı var… | | GEÇTİ | |
| `n3.secenekler[0].geri_bildirim_tr` | Teşekkür ettin ve ne zaman geleceğini söyledin. | | GEÇTİ | |
| `n4.secenekler[0].geri_bildirim_tr` | İlacın kullanımını sormak çok önemli. Doğru hamle. | | GEÇTİ | |
| `n4.secenekler[1].geri_bildirim_tr` | Eczacı **fünf** dedi, **fünfzehn** değil… | | GEÇTİ | |
| `n4b`, `n5` geri_bildirim_tr (3) | Toparladın ve kullanımı sordun. / Kibar ve kısa. / Poşete gerek yoksa böyle söylersin. | | GEÇTİ | |
| `prova.kapanis_tr` | Komşun için ilacı aldın, eksik merhemi ayırttın ve kullanımı sordun. | | GEÇTİ | Burada "kullanımı" sözü sayesinde tek anlamlı. |
| `okuma_yazma.title_tr`, `metin_tr` | Doktorun notu / Rosa Brandl Hanım… | | GEÇTİ (2) | |
| `sorular[o1–o4]` q + opts (8) | Bu not ne? / Merhem ne zaman sürülecek? / kaç gün? / randevu? | Talimat; akşam; üç gün; pazartesi on. | GEÇTİ | |
| `sorular[o5].situation_tr`, `why_tr` | Frau Brandl notu okuyamıyor… / Zamanı **am Abend** ile, yeri **auf das Bein** ile… | Akşam, bacağa. | GEÇTİ (2) | |
| `gun_sinavi[s1–s4].situation_tr` (4) | Duyduğunu yaz. | | GEÇTİ | |
| `s1.why_tr` | Birden çok şey için **sind** dersin. | | GEÇTİ | |
| `s2–s4.why_tr` (3) | **in Rente sein** … / **reservieren** ayırtmak… / **am Abend** akşam… | | GEÇTİ | |
| `s5–s8.tr` (4) | Bacağım ağrıyor. … Tabletleri ne zaman almalıyım? | | GEÇTİ | |
| `s5.why_tr` | Ağrı için **tut weh** dersin. | | GEÇTİ | |
| `s6.why_tr` | Kibarca ayırtırken **Ich möchte ein Zimmer reservieren** dersin ve **reservieren** en sona gelir. | | GEÇTİ | 13 kelime; iki bilgi, önceki raporlardaki gibi GEÇTİ. |
| `s7.why_tr` | Emekli derken **in Rente** dersin. | | GEÇTİ | |
| `s8.why_tr` | **muss** ile **nehmen** sona gelir. | — | **GERİ** | Yukarıda 8. |
| `s9.situation_tr`, `why_tr` | Eczacı merhemin olmadığını söylüyor… | Sipariş edebilir misiniz derim. | GEÇTİ (2) | |
| `s10.situation_tr`, `why_tr` | Dr. Weber soruyor: ağrın ne zamandan beri var? Dünden beri. / …**seit gestern**. | | GEÇTİ (2) | |
| `s11.situation_tr`, `why_tr` | Eczanedesin. Frau Brandl'ın reçetesini ver… | Reçeteyi verir, tablet isterim. | GEÇTİ (2) | |

## Görülmemiş durumlar (`gorulmemis-08.json`, 8 + 3 `yer`, 0 GERİ)

| Kimlik | Alan | Metin | Kendi sözlerimle | Karar |
|---|---|---|---|---|
| `m1:h08:g1` | `durum_tr` | Cumartesi akşamı dört kişi için göl kenarındaki bir restoranda masa ayırtmak istiyorsun… | Restoranı arayıp cumartesi dört kişilik masa ayırtacağım. | GEÇTİ |
| `m1:h08:g1` | `why_tr` | Masa ayırtırken **Ich möchte einen Tisch für vier Personen reservieren** dersin ve günü eklersin. | Bu cümleyi söyler, günü eklerim. | GEÇTİ (14 kelime) |
| `m1:h08:g1` | `yer` | telefon: göl kenarında bir restoran | | GEÇTİ |
| `m1:h08:g2` | `durum_tr` | Süpermarkettesin. Süt arıyorsun ama bulamıyorsun… | Sütün yerini soracağım. | GEÇTİ |
| `m1:h08:g2` | `why_tr` | Bir ürünün yerini **Wo ist die Milch?** diye sorarsın. | | GEÇTİ |
| `m1:h08:g2` | `yer` | süpermarket | | GEÇTİ |
| `m1:h08:g3` | `durum_tr` | Bir arkadaşının partisindesin… Sen de kendini tanıt. | Adımı söyleyip tanışacağım. | GEÇTİ |
| `m1:h08:g3` | `why_tr` | Tanışırken önce **Ich bin** ile adını söyler, sonra **Freut mich!** dersin. | | GEÇTİ |
| `m1:h08:g3` | `yer` | bir arkadaşın evinde parti | | GEÇTİ |
| `m1:h08:g4` | `durum_tr` | Spor salonundasın… Sırtının ağrıdığını söyle. | Sırtım ağrıyor diyeceğim. | GEÇTİ |
| `m1:h08:g4` | `why_tr` | Sırtın ağrıyorsa **Ich habe Schmerzen im Rücken** dersin. | | GEÇTİ |

## Notlar (karar değil)

- Hafta boyunca "pazar" hem çarşı hem gün adı olarak geçiyor (gün 51 video başlığı, gün 52 `a1.ana_fikir` şıkkı "Cumartesi bir pazar"). Bağlamdan çözdüm; yorgun okumada bir an duraksattı.
- Gün 54'te **einpacken** üç ayrı karşılıkla geçiyor: "paketlemek" (başlık, görev cümlesi, prova), "çantaya koymak" (kalıp, sahne, prova seçeneği). Her satır kendi başına açık; aynı kelimenin iki işi olduğunu kendim çıkardım.
- "X demektir ve Y en sona gelir" biçimindeki dört `why_tr` (gün 51 s7, gün 52 s6, gün 53 s1, gün 54 s6) iki bilgi taşıyor. Önceki okur raporlarındaki eşdeğer satırlar GEÇTİ sayıldığı için ben de GEÇTİ saydım. Kural katı uygulanırsa bu dördü de geri döner.
- Hiçbir metinde `=`, `;`, tırnak içinde Almanca ya da İngilizce yok. `…` yalnızca kalıp boşluklarında var (önceki raporlarda boşluk işareti olarak kabul edildi).
- Bu tur ses anlama sorularında başka bir ajan küçük düzeltme yapıyor olabilir. Okuduğum hâl, okuma anındaki dosyalardır.

OKUR: GERİ — 8 madde

---

## 2. tur (yalnız düzeltmeler)

Kapsam: 1. turda GERİ dönen 8 madde ve gün 50 `okuma_yazma.sorular[m1:50:o4].why_tr`'nin yeni hâli. Yeni tam okuma yapılmadı. Düzeltmenin çevresinde yeni bir anlaşılmazlık doğup doğmadığına da bakıldı.

### Sonuç

| | |
|---|---|
| Okunan madde | 9 (8 geri dönen + 50 o4 `why_tr`) |
| GEÇTİ | 9 |
| GERİ | 0 |

| # | Yer | Yeni metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|---|
| 1 | `gun-50` `halkalar[m1:50:h1].kaliplar[0].tr` (de: Es geht um …) | Konu şu: … | Ne hakkında aradığımı söylüyorum: konu bu. | GEÇTİ | Tek karşılık kaldı. |
| 2 | `gun-50` `sahne.bolumler[b1].ayrinti[0].q_tr` | Frau Brandl günü önce yanlış anlıyor. Hangi günü anlıyor? | Brandl Hanım önce günü yanlış duyuyor; yanlış duyduğu gün hangisi? | GEÇTİ | Beklenen cevap (perşembe) artık sorudan çıkıyor; salı diye okumadım. |
| 3 | `gun-52` `halkalar[m1:52:h1].kaliplar[2].tr` (de: Bei mir nur …) | Bende yalnız … geçer. | Benim dükkânımda yalnız şu geçer (ör. yalnız nakit). | GEÇTİ | "geçer" sözü bunu "Bende on avro var"dan ayırıyor. |
| 4 | `gun-52` `gun_sinavi.maddeler[m1:52:s2].why_tr` | **wollen** ikinci sırada durur, **wandern** en sona gider. | **wollen** cümlenin ikinci kelimesi, **wandern** son kelimesi. | GEÇTİ | Duyulan cümleyle (**Wir wollen am Samstag wandern**) örtüşüyor. Terim yok. |
| 5 | `gun-53` `prova.kapanis_tr` | Yeni biriyle iş yerinde tanıştın ve hafta sonunda ne yaptığını anlattın. | İşte biriyle tanıştım, hafta sonu ne yaptığımı anlattım. | GEÇTİ | "Geçmiş zaman" çıktı. 11 kelime. |
| 6 | `gun-54` `goal_tr` | Eczanede komşunun ilacını alır, eksik ürünü ayırtır, ilacı ne zaman içeceğini sorarsın. | Komşumun ilacını alırım, eksik olanı ayırtırım, ilacın ne zaman içileceğini sorarım. | GEÇTİ | 12 kelime. "Almak" tek anlamda kaldı, kullanım "içmek" ile söylendi. |
| 7 | `gun-54` `can_do.tr` | Eczanede eksik bir ilacı ayırtır, ilacı ne zaman içeceğimi sorarım. | Eksik ilacı ayırtırım, onu günün hangi saatinde içeceğimi sorarım. | GEÇTİ | "Ne zaman teslim alırım" diye okunmuyor artık. |
| 8 | `gun-54` `gun_sinavi.maddeler[m1:54:s8].why_tr` | **muss** ikinci sırada durur, **nehmen** en sona gider. | **muss** ikinci kelime, **nehmen** son kelime. | GEÇTİ | **Wann muss ich die Tabletten nehmen?** ile örtüşüyor. |
| 9 | `gun-50` `okuma_yazma.sorular[m1:50:o4].why_tr` | Saati tekrar et ve **geht es** ile onayla. | Saati yeniden söyle, **geht es** diyerek olur de. | GEÇTİ | 7 kelime. Not (karar değil): kabul listesinde **geht es** geçmeyen cevaplar da var (ör. **Ja, klar.**); açıklama tek yolu anlatıyor, öğrenciyi yanlışa götürmüyor. |

Dosya durumu (OD-9.4): 2. turdan sonra `gun-50` … `gun-54` dosyalarında okur GERİ'si kalmadı.

OKUR: GEÇTİ
