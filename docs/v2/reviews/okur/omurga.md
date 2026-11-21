# Okur raporu: omurga (52 haftalık plan)

Girdi: `content/v2/curriculum/omurga.json` (durum: taslak) ve okuma notu `docs/v2/reviews/omurga/taslak.md`.
Okuyan: Almancası A2, dilbilgisi terimi bilmeyen, yorgun bir akşam telefondan okuyan öğrenci.

Okunan satırlar (örneklem değil, hepsi): 52 hafta × 3 alan (`yapabiliyorum_tr`, `gorev_tr`, `kapi_tr`) = 156 satır, artı 56 gün başlığı (`gunler[].title_tr`) = **212 satır**.
Makine taraması da yapıldı: 14 kelimeyi aşan cümle, noktalı virgül, üç nokta, eğik çizgi, dosya adı.

## Sonuç

| alan | toplam | geçer | geri döner |
|---|---|---|---|
| `yapabiliyorum_tr` | 52 | 48 | 4 |
| `gorev_tr` | 52 | 42 | 10 |
| `kapi_tr` | 52 | 33 | 19 |
| gün başlığı | 56 | 40 | 16 |
| **toplam** | **212** | **163** | **49** |

Okuma notu: **geri döner** (ayrı bölüm, en altta).
Tek bir geri dönen satır bile olduğu için dosya "reviewed" sayılamaz (OD-9.4).

## Bütün dosyayı ilgilendiren üç gözlem

Bunlar tek tek satırlara "geri döner" olarak yazılmadı; yazılsaydı `kapi_tr` alanının tamamı dönerdi. Karar baş geliştiricide.

1. **`kapi_tr` her hafta iki ayrı şey söylüyor.** Önce konuşma sınavı, sonra "Kulak:" ile başlayan dinleme sınavı. Kural "bir alan, bir fikir" diyor. Ben her seferinde iki ayrı satır okumuş gibi oldum. 52 satırın 52'sinde böyle.
2. **"Kapı", "Kulak:", "sahne", "sürpriz" uygulamanın kendi sözleri.** Ekranı ilk kez gören biri "kapı"nın sınav demek olduğunu satırdan çıkaramıyor. "Kulak:" ikinci haftadan sonra alışılıyor.
3. **`kapi_tr` satırlarının çoğu telgraf gibi, fiilsiz.** Örnek: "Sorunlu arama, iki sürpriz." Ne yapacağım değil, konu başlığı yazıyor. İlk sekiz haftada "yaparsın" diye bitenler çok daha rahat okunuyor.

## Geri dönen satırlar

### `yapabiliyorum_tr` (4)

| hafta | satır | kendi sözlerimle | neden |
|---|---|---|---|
| 8 | Görmediğim gündelik durumlarda derdimi Almanca anlatırım. | Göremediğim bir yerde mi konuşuyorum? Sonra anladım: derste çalışmadığım durumlar. | "Görmediğim" ilk okumada yanlış anlaşılıyor. Somut da değil: hangi durum? |
| 15 | Bir gecikmeyi nedeniyle birlikte açıklarım. | Geç kaldığımı ve neden geç kaldığımı söylerim. | İkinci okumada anladım. "Nedeniyle" kelimesini önce "yüzünden" diye okudum, cümle dağıldı. |
| 20 | Telefon menüsünü geçip istediğim bilgiyi alırım. | Telefonumun ayarlar menüsü mü? Kapı satırına bakınca anladım: aradığım yerdeki "1'e basın" sesi. | "Telefon menüsünü geçmek" tek başına anlaşılmıyor. |
| 52 | Görmediğim durumlarda sorunumu Almanca çözerim. | 8. haftadakiyle aynı takılma. | "Görmediğim" belirsiz, cümle somut değil. |

### `gorev_tr` (10)

| hafta | satır | kendi sözlerimle | neden |
|---|---|---|---|
| 8 | Dışarıda bir işi baştan sona yalnız Almanca hallederim. | Bir iş yapacağım ama hangisi? | Somut değil. Ne yapacağımı satırdan seçemiyorum. |
| 12 | Doktorda ya da eczanede şikâyetimi Almanca anlatırım. | Doktora gidip derdimi anlatırım. | O hafta hasta değilsem yapamam. Görev için hasta olunmaz. |
| 27 | Doktorda anlamadığım bir açıklama için ek soru sorarım. | Doktor bir şey anlatınca soru sorarım. | Doktor randevum yoksa yapılamaz. |
| 28 | Bir uzman ya da başka bir kurum için randevu sorarım. | Kime soruyorum, anlamadım. Uzmanı mı arıyorum, başkasına mı soruyorum? | Anlamadım. "Kurum için randevu sormak" ne demek belli değil. |
| 29 | Bir sorunu (fatura ya da teslimat) telefonla çözmeyi denerim. | Faturamda sorun varsa arayıp çözmeye çalışırım. | O hafta böyle bir sorunum yoksa yapılamaz. Küçük bir iş de değil. |
| 30 | İşte bir izin ya da vardiya isteğimi söylerim. | Şefe izin ya da vardiya isterim. | 13. haftadaki görevle aynı ("İş yerinde izin ya da vardiya değişikliği sorarım"). Bunu yapmıştım. |
| 39 | Bir cihaz sorununu bir mağazada ya da telefonda anlatırım. | Bozulan bir cihazımı anlatırım. | Bozuk cihazım yoksa yapılamaz. |
| 49 | Bankada ya da işte bir sorunu anlatıp çözüm isterim. | Bir sorun çıkarsa anlatırım. | Sorun yoksa yapılamaz. Hangi sorun olduğu da belli değil. |
| 51 | Almanca bir metni okuyup birine iki cümleyle anlatırım. | Bir şey okuyup iki cümleyle anlatırım. | 26. haftadaki görevin neredeyse aynısı ("Okuduğum bir haberi birine iki cümleyle anlatırım"). |
| 52 | Bir gün boyunca bütün işlerimi yalnız Almanca hallederim. | Bütün gün hep Almanca konuşurum. | Küçük bir iş değil, ne zaman bittiği de belli değil. |

### `kapi_tr` (19)

| hafta | sorunlu yer | neden |
|---|---|---|
| 1 | "Hafta sonu testi (m1/hafta-sonu-testi.json)." | Dosya adı görünüyor. "Hafta sonu testi" cumartesi mi, haftanın bitişi mi, belli değil. |
| 5 | "Tobi ile du, Herr Wimmer ile Sie; yarınki planını anlatırsın." | Noktalı virgül ve iki fikir. "Tobi ile du" cümle değil, ne yapacağımı anlamadım. |
| 6 | "…anlatırsın; kaydını bir hafta önceki kaydınla yan yana dinlersin." | Noktalı virgül, tek cümlede iki iş. Kulak kısmıyla birlikte dört iş oluyor. |
| 8 | "A1 seviye kapısı: … üç sözlü durum (telefonda masa ayırtmak, …)." | Cümle 18 kelime. Parantez içi ayrı bir liste. |
| 9 | "…rol oyunu; sürpriz: istediğin saat dolu." | Noktalı virgül. |
| 10 | "Randevu kaydırma; sürpriz: önerilen gün de uymuyor." | Noktalı virgül. |
| 13 | "…söylersin; sürpriz: şef rapor ister." | Noktalı virgül. |
| 14 | "Bürgerbüro sahnesi; sürpriz: bir belge eksik." | Noktalı virgül. |
| 15 | "…sahnesi; aynı özeti 4, 3, 2 dakikada anlatırsın." | Noktalı virgül. "4, 3, 2 dakikada" ne demek anlamadım: üç kez mi anlatıyorum? |
| 17 | "Frau Brandl'ın üç kaynaklı sözü", "hızlı kademede yutulan sesler" | Anlamadım. "Kaynaklı söz" ve "kademe" nedir bilmiyorum. "Bairisch" başka satırlarda "Bavyera ağzı" diye geçiyor. |
| 20 | "Menülü arama ve iş talimatını kibar soruyla netleştirme." | Birbiriyle ilgisiz iki iş tek cümlede. "Menülü arama" anlaşılmıyor. |
| 24 | bütün satır | İki cümle 22 ve 21 kelime. Noktalı virgül, iki parantez. Telefonda üç kez okudum. |
| 27 | "…açıklar; sen iki soru sorarsın." | Noktalı virgül. |
| 28 | "Sevk ve randevu; sürpriz: ilk boş gün çok uzak." | Noktalı virgül. |
| 32 | "kaynaklı Bairisch kesitte ana fikir" | "Kaynaklı" ve "kesit" anlaşılmıyor. |
| 37 | "İade sahnesi; sürpriz: fiş yok." | Noktalı virgül. |
| 41 | "Olayı sırasıyla anlatırsın; 4/3/2." | "4/3/2" hiçbir şey söylemiyor. Noktalı virgül ve eğik çizgi. |
| 46 | "İptal araması; sürpriz: karşı teklif." | Noktalı virgül. |
| 52 | bütün satır | İki cümle 21 ve 18 kelime. Noktalı virgül. "Kaynaklı Bairisch kesit" anlaşılmıyor. |

### Gün başlıkları (16)

| gün | başlık | neden |
|---|---|---|
| 12 | Kibar istek: einen Kaffee; du/Sie | İki konu, noktalı virgül ve eğik çizgi. |
| 13 | Benim, senin; hızlı konuşma 1 | İki ilgisiz konu. "Hızlı konuşma 1" ne, belli değil. |
| 19 | Ünlüsü değişen fiiller: sprechen, fahren | "Ünlüsü değişen" bir dilbilgisi sözü. Anlamadım. |
| 26 | En iyisi; ev ilanı okumak | İki ilgisiz konu. |
| 29 | Ayrılan fiiller: aufstehen | "Ayrılan fiil" bir terim. Fiil nasıl ayrılır, başlıktan çıkmıyor. |
| 30 | Zaman başta, fiil yine ikinci | Anlamadım. Neyin başı, neye göre ikinci? |
| 37 | gemacht, gekauft; sesli kurma 1 | İki konu. "Sesli kurma" uygulamanın iç sözü. |
| 38 | Cümle parantezi; ich bin gegangen; kaydet ve dinle | Üç konu. "Cümle parantezi" bir terim, anlamadım. |
| 39 | war, hatte; yıllar | İki konu. İlk yarıda Türkçe yok. |
| 40 | Kelime ailesi 1; hava | İki ilgisiz konu. |
| 41 | Yeniden anlatma; seit, vor | İki ilgisiz konu. |
| 44 | man; nicht müssen, nicht dürfen | Hiç Türkçe yok. Ne öğreneceğimi başlıktan anlayamıyorum. |
| 45 | Talimat: Nehmen Sie …; sollen | İki konu, noktalı virgül ve üç nokta. |
| 46 | sein, ihr, unser; form doldurmak | İki ilgisiz konu. |
| 47 | mir, dir; gefällt mir | Hiç Türkçe yok. |
| 48 | mich, dich; für, ohne; du ile talimat | Üç konu. İlk iki parçada Türkçe yok. |

## Geçti ama not düşülen satırlar

Bunlar geçer sayıldı; yine de okurken hafif takıldığım yerler.

| hafta / gün | alan | not |
|---|---|---|
| 1 | yapabiliyorum | "Gün ve saat konuşarak" biraz garip, ama anladım. |
| 9 | gorev | "Dükkânı arayıp randevu sormak": kuaför gibi bir yer düşündüm, öyleyse olur. |
| 10 | gorev | Elimde kaydırılacak bir randevu ya da buluşma olması gerekiyor. |
| 13 | gorev | İzin istemek gerçek bir sonuç doğurur; canım istemiyorsa soramam. |
| 14 | yapabiliyorum | "Sıramı anlarım" yerine sıramın geldiğini anladığımı düşündüm. |
| 21 | gorev | "Almanca söylerim": kime söyleyeceğim yazmıyor. |
| 24 | yapabiliyorum, gorev | "İdare ederim" somut değil. "Dışarıda bir telefon görüşmesi": sokakta mı sandım. |
| 29 | yapabiliyorum | Hangi sorun olduğu yazmıyor; görev satırı yardım etti. |
| 47 | gorev | Neyin özeti olduğu yazmıyor; toplantım yoksa yapamam. |
| 51 | yapabiliyorum | Gerçek hayattan bir iş değil, bir sınav denemesi. "Süresiyle denerim" biraz garip. |
| 7, 12 | kapi | "Şikâyet, ne zamandan beri, talimatı tekrar": liste telgraf gibi. İki hafta neredeyse aynı satır. |
| 11 | kapi | "Pfand" Almanca kaldı. Marketten bildiğim için anladım. |
| 23, 25 | kapi | "Kelime tarif oyunu ve gelecek haftanı anlatma" iki iş. "Katıl, katılma, neden" emir gibi okunuyor. |
| gün 9, 15 | başlık | "Fiil sonları", "Fiil başa": örnek sayesinde anladım. |
| gün 11, 23 | başlık | İki konu tek başlıkta ("Çoğul ve istemek", "er, sie, es ve renkler"). |
| gün 17, 31, 36 | başlık | Üç nokta var. Almanca kalıbın boşluğu olarak okudum, sorun yaşamadım. |
| gün 24 | başlık | "sehr, zu, nicht": hiç Türkçe yok, ama üç kelimeyi tanıyorum. |

Ayrıca 1.–7. günün `can_do.tr` satırlarını da okudum (7 satır, sayıya katılmadı): hepsi benim ağzımdan, somut, tek okumada anlaşılıyor.

Öğrenciye gösterilecekse bilinmesi gereken: `durum.tr` ve `kol_mekan.tr` alanlarında tırnak içinde Almanca ve üç nokta (2, 3, 5, 6. hafta), "kademe" (9, 17, 20, 29, 32, 50. hafta) ve "kaynaklı" (32. hafta) geçiyor. Bu iki alan görevde sayılmadığı için karar verilmedi.

## Okuma notu: `docs/v2/reviews/omurga/taslak.md`

**Karar: geri döner.** Telefonda rahat okunmuyor.

| sorun | nerede | neden |
|---|---|---|
| Uzun tablo | "Hafta tablosu": 52 satır, 6 sütun | Telefonda yana kaydırmak gerekiyor. Tek başına beş altı ekran tutuyor. "Ay başına en çok iki ekran" ölçüsü tutmuyor; not aylara göre dizilmemiş. |
| Toplam uzunluk | bütün not, 185 satır | Kabaca on iki ekran. Asıl sorular ("PM'e sorular") en sonda, onuncu ekrandan sonra. |
| Sütun kısaltmaları | "Hf", "Sv", "K", "7 · 40" | Açıklama satırında "Sv" yok. "K" sütun değil, seviyenin yanına eklenmiş harf. "7 · 40" hangi sayı hangisi, geri dönüp bakmak gerekiyor. |
| Açıklanmamış kimlikler | baş satır ve bütün bölümler | PM-078 D, PM-079 md. 9, "İÇ", #56, AH-1, M1–M4, K1, `siklik-B1`, "C ölçümü", LS-8.3, KT-4.1, WORLD §6, `cal:*`, "ANA", "(yalnız bağlantı, C)", "(A)", "halka", "tıkama sırası", "lex işi", "kulak-3". Hiçbiri notun içinde açıklanmıyor. |
| Kod kimlikleri | "PM kararlarının yeri", "Dilbilimci için" | `gr:a1-05:t3`, `gr:a1-14:t5`, `gr:a2-07`, `a2-04`, `b1-02, 03, 04 …`, `dn:relativ-basit`, `gramer_r0_karsiligi`. Okuyan için anlam taşımıyor. |
| Dilbilgisi terimleri | "Dilbilimci için" bölümü | Akkusativ, Perfekt, Dativ edatları, Plusquamperfekt, ilgi cümlesi, dolaylı soru. Bölüm dilbilimciye ayrılmış, ama aynı notu proje sahibi de okuyacak. |
| Sayı listesi | "#56 kapsamı": 19 satır | "10 zaman baskısı, gelen arama: 3, 9, 16, 20, 29, 33, 39, 42, 46, 50" gibi satırlar. Baştaki sayı madde numarası mı, hafta mı, her satırda yeniden düşünmek gerekiyor. |
| Kod bloğu | "Denetim sonucu" | Uzun satırlar telefonda yana taşıyor. |
| Eksik bilgi | tablo üstü | "Görev, dil noktası, kapı ve süre ayrıntısı JSON'da" diyor. Telefonda JSON okunmaz; haftanın görevini ve kapısını notta göremiyorum. |

İyi olan yerler: "Omurga sıradır, takvim değildir" ve "Seviye dilimleri" bölümleri kısa, tek okumada anlaşılıyor. "PM'e sorular" 1. ve 2. soru açık; 3., 4. ve 5. soruda yine kimlik ve iç söz var (`grammar.json`, K1, ANA, şema).

## Sayılar

- Toplam: 212
- Geçer: 163
- Geri döner: 49

Geri dönenler:
- `yapabiliyorum_tr`: hafta 8, 15, 20, 52
- `gorev_tr`: hafta 8, 12, 27, 28, 29, 30, 39, 49, 51, 52
- `kapi_tr`: hafta 1, 5, 6, 8, 9, 10, 13, 14, 15, 17, 20, 24, 27, 28, 32, 37, 41, 46, 52
- gün başlığı: gün 12, 13, 19, 26, 29, 30, 37, 38, 39, 40, 41, 44, 45, 46, 47, 48
- okuma notu: `docs/v2/reviews/omurga/taslak.md`

## 2. tur

Son tur. Girdi: aynı JSON (yazarın "Okur 1. tur sonrası" değişiklikleriyle) ve yeniden yazılan okuma notu `taslak.md`. `teknik.md` okunmadı; proje sahibine gitmiyor.

Okunan satırlar (hepsi, tek tek): 52 hafta × 6 alan (`yapabiliyorum_tr`, `gorev_tr`, `kapi_tr`, `kulak_kapi_tr`, `durum.tr`, `kol_mekan.tr`) = 312 satır, artı 56 gün başlığı = **368 satır**. `durum.tr` ve `kol_mekan.tr` 1. turda sayılmamıştı; bu turda sayıldı.
Makine taraması yeniden yapıldı: dört ana alanda 14 kelimeyi aşan cümle, noktalı virgül, üç nokta, tırnak, eğik çizgi, dosya adı yok.

### Sonuç

| alan | toplam | geçer | geri döner |
|---|---|---|---|
| `yapabiliyorum_tr` | 52 | 52 | 0 |
| `gorev_tr` | 52 | 52 | 0 |
| `kapi_tr` (konuşma sınavı) | 52 | 52 | 0 |
| `kulak_kapi_tr` (dinleme sınavı) | 52 | 52 | 0 |
| gün başlığı | 56 | 56 | 0 |
| `durum.tr` | 52 | 50 | 2 |
| `kol_mekan.tr` | 52 | 51 | 1 |
| **toplam** | **368** | **365** | **3** |

- 1. turdaki 49 geri dönüş: **49'u kapandı, açık kalan yok.**
- Bütün dosyayı ilgilendiren üç gözlem: üçü de kapandı.
- Okuma notu: **geçer** (iki küçük notla, aşağıda).
- Yeni geri dönüş: **3** (hepsi 1. turda sayılmayan iki alanda).

Üç satır açık olduğu için dosya bu hâliyle "reviewed" sayılamaz (OD-9.4). Bu üç satır düzelirse ya da bu iki alan öğrenciye gösterilmeyecekse engel kalmıyor.

### Üç gözlem

| gözlem | durum | not |
|---|---|---|
| 1. `kapi_tr` iki ayrı şey söylüyor | kapandı | Konuşma ve dinleme ayrı satır. Her biri tek iş, tek cümle. |
| 2. "Kapı", "Kulak:", "sahne", "sürpriz" | kapandı | Okuduğum satırlarda hiçbiri kalmadı. "Sınav" diyor, anlıyorum. |
| 3. Telgraf gibi, fiilsiz satırlar | kapandı | 104 sınav satırının hepsi "…rsın" diye bitiyor. Ne yapacağım belli. |

### 1. turdaki 49 geri dönüş, tek tek

`yapabiliyorum_tr` (4)

| hafta | yeni satır | kendi sözlerimle | durum |
|---|---|---|---|
| 8 | Telefonda masa ayırtır, dükkânda ürün sorar, yeni biriyle tanışırım. | Üç işi yapabilirim: masa ayırtmak, ürün sormak, tanışmak. | kapandı |
| 15 | Geç kaldığımı ve neden geç kaldığımı söylerim. | Geç kaldım derim, nedenini de söylerim. | kapandı |
| 20 | Bir şirketi aradığımda otomatik sesi anlayıp doğru tuşa basarım. | Aradığım yerdeki "şuna basın" sesini anlarım. | kapandı |
| 52 | Telefonda bir sorunu çözer, toplantıda fikrimi savunur, yüz yüze şikâyet ederim. | Üç zor işi Almanca yaparım. | kapandı |

`gorev_tr` (10)

| hafta | yeni satır | kendi sözlerimle | durum |
|---|---|---|---|
| 8 | Markette aradığım bir ürünün nerede olduğunu Almanca sorarım. | Markette "şu nerede" diye sorarım. | kapandı |
| 12 | Eczanede nezleye karşı ne önerdiklerini sorarım. | Eczaneye girip nezle için ne var diye sorarım. Hasta olmam gerekmiyor. | kapandı |
| 27 | Eczanede bir ilacın ne işe yaradığını sorar, anlamadığım yeri tekrar sorarım. | Bir ilacı sorarım, anlamazsam yine sorarım. | kapandı |
| 28 | Bir göz doktorunu arayıp yeni hasta alıp almadığını sorarım. | Göz doktorunu arar, hasta alıyor musunuz derim. | kapandı |
| 29 | Belediyeyi arayıp eski bir eşyayı nasıl atacağımı sorarım. | Eski koltuğu nereye atarım diye belediyeye sorarım. | kapandı |
| 30 | Bir iş arkadaşıma gelecek hafta hangi vardiyada çalıştığını sorarım. | Arkadaşa vardiyasını sorarım. 13. haftayla aynı değil artık. | kapandı |
| 39 | Bir telefon dükkânında hangi kablonun telefonuma uyduğunu sorarım. | Dükkânda telefonuma uyan kabloyu sorarım. | kapandı |
| 49 | Bankada kartımın yurt dışında çalışıp çalışmadığını sorarım. | Bankaya gidip kartımı sorarım. | kapandı |
| 51 | Bir tanıdıkla on dakika hiç Türkçe ya da İngilizce kullanmadan konuşurum. | On dakika yalnız Almanca konuşurum. 26. haftadan farklı. | kapandı |
| 52 | Aynı hizmet için üç yeri arayıp fiyatları karşılaştırırım. | Üç yeri arar, fiyat sorarım. Ne zaman bittiği belli. | kapandı |

`kapi_tr` (19). Eski satır ikiye ayrıldığı için iki yeni satır birlikte okundu.

| hafta | 1. turdaki sorun | durum | not |
|---|---|---|---|
| 1 | dosya adı, "hafta sonu testi" | kapandı | "Yedinci gün" açık. |
| 5 | noktalı virgül, "Tobi ile du" | kapandı | Önce samimi, sonra kibarca. Anladım. |
| 6 | dört iş tek satırda | kapandı | Kayıt karşılaştırması görünen satırdan çıktı. |
| 8 | 18 kelime, parantez | kapandı | 11 kelime. Üç durum "yapabilirim" satırında yazıyor. |
| 9 | noktalı virgül, "sürpriz" | kapandı | "İstediğin saat doluysa" diye açık yazıyor. |
| 10 | aynı | kapandı | |
| 13 | aynı | kapandı | |
| 14 | aynı | kapandı | |
| 15 | "4, 3, 2 dakikada" | kapandı | "Üç kez, her seferinde daha kısa." Anladım. |
| 17 | "kaynaklı söz", "kademe", "Bairisch" | kapandı | "Bavyera ağzıyla söylediği üç söz." |
| 20 | iki ilgisiz iş, "menülü arama" | kapandı | Konuşma: bankayı aramak. Dinleme: hangi tuş. |
| 24 | 22 ve 21 kelime, parantez | kapandı | İki satır, 11 ve 14 kelime. Tek okumada. |
| 27 | noktalı virgül | kapandı | |
| 28 | noktalı virgül | kapandı | |
| 32 | "kaynaklı", "kesit" | kapandı | |
| 37 | noktalı virgül | kapandı | "Fişin olmadan" açık. |
| 41 | "4/3/2" | kapandı | |
| 46 | noktalı virgül, "karşı teklif" | kapandı | "Yeni bir teklifi kibarca geri çevirirsin." |
| 52 | 21 ve 18 kelime, "kesit" | kapandı | 11 ve 13 kelime. |

Gün başlıkları (16)

| gün | yeni başlık | kendi sözlerimle | durum |
|---|---|---|---|
| 12 | Kibarca istemek: Ich hätte gern einen Kaffee | Bir şeyi kibarca istemeyi öğrenirim. | kapandı |
| 13 | Benim ve senin: mein, dein | "Benim" ve "senin" demeyi öğrenirim. | kapandı |
| 19 | Sen ve o derken değişen harf: du sprichst, er fährt | "Sen" ve "o" derken kelimede bir harf değişiyor. | kapandı |
| 26 | Ev ilanında en ucuzunu bulmak | İlanlara bakıp en ucuz evi bulurum. | kapandı |
| 29 | Sabah kalkmak: Ich stehe um sieben auf | Kaçta kalktığımı söylerim. | kapandı |
| 30 | Cümleye zamanla başlamak: Am Montag arbeite ich | Cümleye "pazartesi" diye başlarım. | kapandı |
| 37 | Kelimeyi geçmişe çevirmek: kaufen, gekauft | "Almak" kelimesini "aldım" yaparım. | kapandı |
| 38 | Gitmek ve gelmek geçmişte: Ich bin gegangen | "Gittim" demeyi öğrenirim. | kapandı |
| 39 | Eskiden nasıldı: Ich war, ich hatte | Eskiden nasıl olduğunu söylerim. | kapandı |
| 40 | İki kelimeden bir kelime: Hausarzt | İki kelime birleşip tek kelime oluyor. | kapandı |
| 41 | Dinlediğini kendi sözlerinle anlatmak | Dinlediğimi kendim anlatırım. | kapandı |
| 44 | Gerek yok mu, yasak mı: nicht müssen, nicht dürfen | "Gerek yok" ile "yasak" farkı. | kapandı |
| 45 | Doktorun talimatı: Nehmen Sie die Tabletten | Doktorun "şunu alın" demesini anlarım. | kapandı |
| 46 | Form doldurmak: Vorname, Geburtsdatum | Formdaki kutuları doldururum. | kapandı |
| 47 | Beğendiğini söylemek: Das gefällt mir | "Hoşuma gitti" derim. | kapandı |
| 48 | Bir arkadaşa öğüt vermek: Trink viel Wasser! | Arkadaşa "çok su iç" derim. | kapandı |

Yazarın kendiliğinden değiştirdiği diğer 22 gün başlığı da okundu (8, 9, 11, 14, 15, 17, 21, 22, 23, 24, 28, 31, 32, 33, 34, 35, 36, 42, 49, 52, 55, 56): hepsi geçer. "Haftanın sınavı" ve "A1 sınavı" başlıkları "kapı"dan çok daha açık.

### Yeni geri dönenler (3)

| hafta | alan | satır | kendi sözlerimle | neden |
|---|---|---|---|---|
| 5 | `durum.tr` | İş yerinde ilk gün: Tobi ile samimi, Herr Wimmer ile resmî konuşmak, günün planı, davet ve otobüs | İşte ilk gün. Sonrası uzun bir liste, sonuna gelince başını unuttum. | Tek cümle 17 kelime. Beş ayrı konu. |
| 20 | `durum.tr` | Telefonla bilgi almak ve menüyü geçmek. İş talimatını anlamak ve sormak | Telefonla bilgi alırım. "Menüyü geçmek" ne, bilmiyorum. | 1. turda 20. haftanın "yapabilirim" satırı aynı sözden dönmüştü. O satır düzeldi, bu satırda kaldı. |
| 12 | `kol_mekan.tr` | Muayenehane derinleşir | Muayenehane nasıl derinleşir? Anlamadım. | Anlamadım. 27. haftadaki "Muayenehanede yeni konuşmalar" tek okumada anlaşılıyor. |

### Baş geliştiriciye iki not (satır kararı değil)

1. **`durum.tr` 21 haftada iki ya da üç ayrı konuyu nokta ile yan yana yazıyor** (örnek 13. hafta: eczane, hastalık bildirme, izin). Her cümle kısa ve tek tek anlaşılıyor, o yüzden satır satır geri çevirmedim. Ama "bir alan, bir fikir" kuralına uymuyor. Ekranda alt alta üç satır olarak gösterilirse sorun kalmaz.
2. **JSON'daki `note_tr` "görünen alanların hepsi tek cümle, en çok 14 kelime" diyor.** `durum.tr` için bu doğru değil: 21 satır çok cümleli, 5. hafta 17 kelime. Yazarın denetimi bu alanda kelime sınırına bakmıyor görünüyor.

### Geçti ama not düşülen satırlar (2. tur)

| hafta / gün | alan | not |
|---|---|---|
| 22 | kapi | Konuşma sınavında önce e-posta yazılıyor. "Ek süre"nin ne için olduğu yazmıyor. Anladım, ama iki iş. |
| 34 | kapi | "Telefonda gelip gelmediğini sorarsın": neyin geldiğini bir an düşündüm. E-postanın. |
| 39 | kulak | "Sırayla uygularsın": sınavda neyi uygulayacağım tam belli değil. |
| 44 | kulak | "İtirazının ne olacağını": itirazın sonucunu kastediyor, ikinci bakışta oturdu. |
| 30 | gorev | Vardiyalı işte çalışmıyorsam yapamam. |
| 52 | gorev | Üç arama küçük iş sayılmaz, ama bittiği belli. |
| 3 | durum | "Tekrar istemek": tekrar söylemesini istemek demek, anladım. |
| 7 | durum | "Vils-Apotheke" Almanca kaldı. Eczane adı olduğunu anladım. |
| 2 | kol_mekan | "İlk dış görev": dışarıda yapılacak iş demek. Not "Dışarıda" diyor, burada "dış görev". |
| 6 | kol_mekan | "Araba modu": arabada dinlemek diye anladım. |
| 35, 44 | kol_mekan | "İlanlar", "Posta kutusu: kararlar": çok kısa, ama anlaşılıyor. |
| gün 38 | başlık | "Gitmek ve gelmek geçmişte": Türkçesi biraz eğreti, örnekle anlaşılıyor. |

1. turda not düşülen satırlardan 14, 21, 24, 47, 51 (hafta) ve 11, 17, 23, 24, 31, 36 (gün) düzeltilmiş; bunlarda takılmadım.

### Okuma notu: `taslak.md` (2. tur)

**Karar: geçer.** Telefonda yana kaydırmadan, baştan sona okunuyor.

Telefon ölçüsü (satır başına 38–42 harf, ekran başına 30–32 satır diye hesapladım):
- Baş kısım (sorular, plan nedir, dört satır, seviyeler, kelime, süre): yaklaşık üç ekran. Sorular ilk ekranda.
- Dört haftalık aylar (1, 2, 4, 5, 7, 8, 10, 11): 1,3 ile 1,7 ekran.
- Beş haftalık aylar (3, 6, 9, 12): 1,7 ile 2,0 ekran. **Tam sınırda.** Yazı tipi büyütülürse iki ekranı biraz aşar (2,2–2,4).
- Toplam 20–24 ekran. Uzun, ama aylara bölündüğü için aradığım ayı buluyorum.

1. turdaki dokuz sorun:

| sorun | durum | not |
|---|---|---|
| Uzun tablo (52 satır, 6 sütun) | kapandı | Tablo yok, ay ay başlık var. Kalan üç küçük tablo en çok 3 sütun, 4 satır. |
| Toplam uzunluk, sorular en sonda | kapandı | Sorular en başta. Not uzadı ama ay ölçüsü tutuyor. |
| Sütun kısaltmaları | kapandı | Kısaltma yok. Dört satırın adı kendi tablosunda açıklanıyor. |
| Açıklanmamış kimlikler | kapandı | PM-078, AH-1, K1, LS-8.3 gibi hiçbir kimlik kalmadı. |
| Kod kimlikleri | kapandı | Hiçbiri yok. |
| Dilbilgisi terimleri | kapandı | Hiçbiri yok. |
| Sayı listesi | kapandı | Çıkarıldı. |
| Kod bloğu | kapandı | Yok. |
| Eksik bilgi (görev ve sınav notta yok) | kapandı | Her haftada dört satır: yapabilirim, dışarıda, konuşma sınavı, dinleme sınavı. |

İki küçük not (karar değiştirmiyor):
- **3. soru cevaplanamıyor.** "B1 dilbilgisi sırası kayıttaki sıradan ayrılıyor, bu sırayla mı gidelim?" diyor. Ama iki sıra da notta yok. Neye evet dediğimi bilmeden onaylamam isteniyor.
- 4. ve 5. soruda "sözlük ajanı", "içerik doğrulayıcı", "denetim betiği" geçiyor. Cümleler düz olduğu için ne sorulduğunu anladım.

### Sayılar (2. tur)

- Okunan: 368 satır (1. turun 212 satırı + 52 yeni dinleme sınavı satırı + 104 `durum.tr` ve `kol_mekan.tr` satırı)
- Geçer: 365
- Geri döner: 3
- 1. turdan kapanan: 49 / 49, artı üç gözlem ve okuma notu
- 1. turdan açık kalan: 0

Geri dönenler:
- `durum.tr`: hafta 5, 20
- `kol_mekan.tr`: hafta 12
