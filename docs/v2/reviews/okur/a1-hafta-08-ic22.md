# Okur fark turu: A1 8. hafta, PR #222 (OD-9.3)

Girdi: `content/v2/m1/gorulmemis-08.json`, yalnız `m1:h08:g1`, `m1:h08:g2`, `m1:h08:g3` durumlarının `durum_tr` ve `why_tr` alanları (6 satır).
Okuyan: Türkçe konuşan, Almancası A2, dilbilgisi terimi bilmeyen öğrenci. Akşam, telefondan, ilk kez okuyor.

Sözcük sayımı önceki turlardaki gibi: kalın Almanca sayılır, `…` sayılmaz. Sayım betikle de denetlendi; karar her satır için elle verildi. Metinler okuma anındaki hâlidir.

## Satırlar

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `m1:h08:g1` | `durum_tr` | Göl kenarındaki restoranda cumartesi saat sekize masa ayırttın. Restoran seni arıyor. Saat sekizde masa yok, yeni bir saat söylüyorlar. Yeni saat sana uyuyor. Saati tekrar et ve kabul et. | Restoran arıyor, sekizde yer yokmuş, başka saat veriyorlar. O saati geri söyleyip "olur" diyeceğim. | GEÇTİ | 5 cümle, en uzunu 8 kelime. Terim yok, sembol yok. Ne yapacağım tek okumada belli. |
| `m1:h08:g1` | `why_tr` | Yeni saati **Also Samstag um halb sieben** diye tekrar eder, **Das geht** diyerek kabul edersin. | Yeni saati tekrar ederim, sonra Das geht derim. | GERİ | Tek cümle 15 kelime (sınır 14). Ayrıca "tekrar eder" ile "edersin" uyuşmuyor; ilk okumada "kim tekrar eder?" diye takıldım. Anlam doğru, ama uzunluk ölçütü aşılıyor. |
| `m1:h08:g2` | `durum_tr` | Köyün pazarındasın. Meyve tezgâhında muz almak istiyorsun ama muz bitmiş. Satıcı başka bir meyve öneriyor ve fiyatını söylüyor. Onu al ve fiyatı tekrar ederek doğrula. | Pazardayım, muz kalmamış. Satıcı başka meyve öneriyor. Onu alacağım ve fiyatı geri söyleyip doğru mu diye soracağım. | GEÇTİ | 4 cümle, en uzunu 8 kelime. Terim yok, sembol yok. |
| `m1:h08:g2` | `why_tr` | Eksik olanın yerine **Dann nehme ich Äpfel** dersin, fiyatı **Zwei Euro fünfzig?** diye tekrar edip doğrularsın. | Muz yerine elma alırım derim, fiyatı soru gibi tekrar ederim. | GERİ | Tek cümle 16 kelime (sınır 14). "Eksik olanın yerine" soyut; neyin eksik olduğunu (muz) bir an düşünmem gerekti. |
| `m1:h08:g3` | `durum_tr` | Evinin önünde yeni komşun Lena ile tanışıyorsun. Komşular cumartesi otobüsle göle gidiyor, seni de çağırıyor. Cumartesi boşsun ve gitmek istiyorsun. Ama yanında hiç nakit yok. Boş olduğunu söyle ve nasıl ödeyeceğini sor. | Komşu Lena cumartesi göle gidelim diyor. Boşum, gitmek istiyorum ama nakit param yok. Boşum diyeceğim ve nasıl ödeyebileceğimi soracağım. | GEÇTİ | 5 cümle, en uzunu 8 kelime. Terim yok, sembol yok. Not: ücret metinde geçmiyor, ama "nakit yok" ve "ödeyeceğini" ile bir şey ödeneceğini anlıyorum; sesten de fiyat gelecek. Engel değil. |
| `m1:h08:g3` | `why_tr` | Boş olduğunu **Am Samstag habe ich nichts vor** ile söylersin. Nakit yoksa **Ich habe kein Bargeld. Kann ich morgen zahlen?** diye sorarsın. | Boşum demek için Am Samstag habe ich nichts vor derim. Nakit yoksa bunu söyler, yarın ödeyebilir miyim diye sorarım. | GEÇTİ | 2 cümle, 10 ve 12 kelime. Tırnak yok, sembol yok. Not: görev "nasıl ödeyeceğini sor" diyor, örnek "yarın ödeyebilir miyim" soruyor; ödeme yolu sorusu olarak yine anlaşılıyor. Engel değil. |

## Sonuç

| | |
|---|---|
| Okunan satır | 6 |
| GEÇTİ | 4 |
| GERİ | 2 |

GERİ olan kimlikler:
1. `gorulmemis-08.json` `m1:h08:g1.why_tr` (15 kelime; "tekrar eder" / "edersin" uyuşmazlığı)
2. `gorulmemis-08.json` `m1:h08:g2.why_tr` (16 kelime; "Eksik olanın yerine" soyut)

Genel sonuç: GERİ. İki GERİ satır olduğu için `gorulmemis-08.json` bu turda "reviewed" sayılamaz (OD-9.4). Durum anlatımlarının üçü de sorunsuz.

## 2. tur

Kapsam: değişen satırlar `m1:h08:g1.why_tr`, `m1:h08:g2.why_tr`, `m1:h08:g3.durum_tr` (son cümleler). Dilbilimcinin küçük düzeltmesi için `m1:h08:g2.durum_tr` ve `m1:h08:g3.durum_tr` baştan sona bir kez daha okundu. Sayım 1. turdaki gibi yapıldı: kalın Almanca sayılır.

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `m1:h08:g1` | `why_tr` | Yeni saati **Also Samstag um halb sieben** diye tekrar edersin. Sonra **Das geht** dersin. | Önce yeni saati geri söylerim, sonra Das geht derim. | GEÇTİ | Cümleler 10 ve 4 kelime. Fiil uyuşmazlığı gitti. Sıra açık: önce tekrar, sonra kabul. |
| `m1:h08:g2` | `why_tr` | Muz yoksa **Dann nehme ich Äpfel** dersin. Fiyatı **Zwei Euro fünfzig?** diye tekrar edip doğrularsın. | Muz kalmamışsa elma alırım derim. Fiyatı soru gibi geri söyleyip doğru mu diye bakarım. | GEÇTİ | Cümleler 7 ve 8 kelime. "Muz yoksa" somut, düşünmeden anlaşılıyor. |
| `m1:h08:g2` | `durum_tr` (tamamı) | Cumartesi pazardasın. Meyve tezgâhında muz almak istiyorsun ama muz bitmiş. Satıcı başka bir meyve öneriyor ve fiyatını söylüyor. Onu al ve fiyatı tekrar ederek doğrula. | Cumartesi pazardayım, muz kalmamış. Satıcı başka meyve öneriyor ve fiyatını söylüyor. Onu alıp fiyatı geri söyleyeceğim. | GEÇTİ | En uzun cümle 8 kelime. Terim ya da sembol yok. Değişiklik ("Cumartesi pazardasın") anlamı bozmuyor. |
| `m1:h08:g3` | `durum_tr` (tamamı) | Evinin önünde yeni komşun Lena ile tanışıyorsun. Lena cumartesi komşularla otobüsle göle gidiyor ve seni de çağırıyor. Cumartesi boşsun ve gitmek istiyorsun. Ama yanında hiç nakit yok. Boş olduğunu söyle. Parayı ne zaman ya da nasıl ödeyebileceğini sor. | Lena cumartesi göle gidiyor, beni de çağırıyor. Boşum, gitmek istiyorum ama nakit yok. Boşum diyeceğim, sonra ne zaman ya da nasıl ödeyebileceğimi soracağım. | GEÇTİ | En uzun cümle 10 kelime. Görev iki kısa cümleye bölünmüş. "ne zaman ya da nasıl" ile örnek cevaptaki "morgen" artık uyuşuyor (1. turdaki not kapandı). Küçük not, engel değil: "Parayı" derken ücretin tutarı metinde yazmıyor; ama gezinin ücretli olduğu anlaşılıyor, tutar seste geçiyor. |

### 2. tur sonucu

| | |
|---|---|
| Okunan satır | 4 |
| GEÇTİ | 4 |
| GERİ | 0 |

1. turda geri dönen `m1:h08:g1.why_tr` ve `m1:h08:g2.why_tr` artık geçiyor. `m1:h08:g3.why_tr` değişmedi, 1. turdaki GEÇTİ kararı geçerli; `m1:h08:g1.durum_tr` de değişmedi ve geçerli. Kapsamdaki 6 satırın 6'sı geçti.

Genel sonuç: GEÇTİ. Bu turun kapsamında `gorulmemis-08.json` için açık GERİ yok (OD-9.4).
