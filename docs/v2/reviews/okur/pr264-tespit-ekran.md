# Okur turu: PR #264 "Seviye tespiti ekranları" (OD-9.3)

Dal `v2/tespit-ekran`. Tek tur. Okuyan: okur (A2, dilbilgisi terimi bilmeyen, yorgun akşam, telefon).
Kapsam: yalnızca öğrenciye görünen Türkçe metinler. Kod mantığı değerlendirilmedi.
PM metni (PM-120 md. 4) olanlar **[PM]** ile işaretli. Bunlarda geri dönüş varsa öneri PM'e gider.

Kimlik önekleri: S = `web/src/screens/Seviye.tsx`, T = `web/src/ui/tespitDurum.tsx`, H = `web/src/screens/HaftaTesti.tsx`,
O = `web/src/screens/Onboarding.tsx`, B = `web/src/screens/Ben.tsx`, R = `web/src/core/tespit.ts` `raporMetni`.

## Seviye.tsx — giriş, madde, bölüm arası

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| S01 | L30 başlık | Seviye tespiti | Seviyemi ölçen bölüm. | GEÇTİ | |
| S02 | L69 | Seviye tespiti hazırlanıyor | Seviye ölçme soruları daha hazır değil. | GEÇTİ | |
| S03 | L69 | Soruları hazır olunca burada çözebilirsin. O zamana kadar günlerine devam et. | Sorular gelince burada çözerim; o zamana kadar her günkü derslerime devam ederim. | GEÇTİ | |
| S04 | L70 | Bugüne dön | Bugün ekranına geri git. | GEÇTİ | |
| S05 | L88 [PM] | Önce seviyeni görelim | Başlamadan önce ne kadar bildiğime bakalım. | GEÇTİ | |
| S06 | L89 [PM] | A1'in sekiz haftasından sorular. Bildiğini tekrar ettirmeyelim; eksik varsa tam yerini bulalım. | A1'in 8 haftasından sorular gelecek. Bildiğim şeyi boşuna tekrar etmeyeyim, eksiğim neredeyse orayı bulsunlar. | GEÇTİ | Anlaşıldı. Biçim notu: `;` var (OD-9.2), PM metni. |
| S07 | L91 | {n}/{t} bölüm bitti · ≈ {k} dk kaldı | Bölümlerin bir kısmını bitirdim, birkaç dakika kaldı. | GERİ | Sembol: `≈` yorgun okurda "yaklaşık" diye okunmuyor; ne olduğunu ilk bakışta çözemedim. |
| S08 | L93 | ≈ {n} dakika; zorlandığın hafta olursa biraz daha | Yaklaşık şu kadar dakika sürer, zorlandığım hafta olursa biraz uzar. | GERİ | Sembol `≈` (S07 ile aynı) ve `;`. PM listesinde yok, geliştirici metni. |
| S09 | L94 [PM] | Yarıda bırakabilirsin, kaldığın yerden sürer | İstersem yarıda kesebilirim, sonra kaldığım yerden devam ederim. | GEÇTİ | |
| S10 | L95 [PM] | Bilmediğinde "Bilmiyorum" de; tahmin sonucu bozar | Bilmiyorsam "Bilmiyorum" düğmesine basayım, tahmin etmeyeyim. | GERİ | İki okuma: "tahmin sonucu" ilk okumada tek bir ad gibi ("tahminin sonucu") okunuyor, cümle eksik kalıyor; ikinci okumada anladım. `;` de var. PM metni. |
| S11 | L99 | Başla / Sürdür | Testi başlat / kaldığım yerden devam et. | GEÇTİ | |
| S12 | L101 [PM] | Almancaya yeni başlıyorum → Baştan başla | Hiç Almanca bilmiyorsam teste girmeden en baştan başlarım. | GEÇTİ | Ok işareti düğmede anlaşılıyor. |
| S13 | L101, L349 toast | 1. günden başlıyorsun | Birinci günden başlıyorum. | GEÇTİ | |
| S14 | L101, L350, L395 toast | Kaydedilemedi; tekrar dene. | Kayıt olmadı, bir daha dene. | GEÇTİ | Biçim notu: `;`. |
| S15 | L114 [PM] | {N}. hafta: oturmuş ✓ | O haftayı iyi biliyorum, tamam. | GEÇTİ | |
| S16 | L115 [PM + ek] | {N}. hafta: biraz daha bakalım (≈ {dk} dk) | O haftada eksiğim var, birkaç dakika daha soru gelecek. | GERİ | PM kısmı ("biraz daha bakalım") anlaşılıyor; sonradan eklenen `≈` sembolü (S07 ile aynı). |
| S17 | L116 | Bu haftaya taramanın sonunda biraz daha yakından bakacağız. | Bu haftaya sonra bir daha bakılacak... ama "tarama" ne, ne zaman bitiyor? | GERİ | "Tarama" uygulamanın iç sözü; öğrenci neyin "tarama" olduğunu bilmiyor. "Devam"a basınca şimdi mi sonra mı ek soru geleceği belirsiz kalıyor. |
| S18 | L119 | Devam | Sonraki soruya geç. | GEÇTİ | |
| S19 | L120 [PM] | Şimdilik bırak | Şimdi ara ver, sonra devam ederim. | GEÇTİ | |
| S20 | L146 | BÖLÜM {i}/{n} · DÖRT BECERİ | Kaçıncı bölümdeyim; bu bölüm dinleme-okuma-yazma-konuşma karışık. | GEÇTİ | "Dört beceri" tahminle çözülüyor; sorunun kendisi de gösteriyor. |
| S21 | L146 | BÖLÜM {i}/{n} · {N}. HAFTA · YAKINDAN | O haftaya daha yakından bakılan bölüm. | GEÇTİ | Tek başına "YAKINDAN" eksik bir söz ama bölüm arası ekranından sonra anlaşılıyor. |
| S22 | L141 toast | Cevap kaydedilemedi; tekrar dene. | Cevabım kaydolmadı, bir daha dene. | GEÇTİ | |
| S23 | L173 | Bilmiyorum | Bilmiyorum düğmesi. | GEÇTİ | |
| S24 | L200 | Konuş | Bu soruda konuşacağım. | GEÇTİ | |
| S25 | L202 aria | Cevap seçenekleri | Seçebileceğim cevaplar. | GEÇTİ | |
| S26 | L204 | Cevabın değerlendiriliyor… | Cevabıma bakılıyor, bekle. | GEÇTİ | `…` bekleme göstergesi olarak alışılmış. |
| S27 | L206, L227 (`kontrol`), L296 | Kontrol et | Cevabımın doğru mu yanlış mı olduğunu göster. | GERİ | Düğme kendini değil başka şeyi anlatıyor: basınca doğru/yanlış gösterilmiyor, doğrudan sonraki soru geliyor. "Kontrol et" bir sonuç vaat ediyor; öğrenci "neden bana söylemedi?" diye şaşırır. |
| S28 | L211 | Dokun ve konuş | Düğmeye basıp konuşurum. | GEÇTİ | |
| S29 | L212 | Yazarak cevapla | Konuşmak yerine yazarım. | GEÇTİ | |
| S30 | L240 | Kendin puanla | Bu mesajın puanını ben vereceğim. | GEÇTİ | |
| S31 | L241 | Uygulama mesajı tam puanlayamaz. | Uygulama yazdığım mesajı iyi değerlendiremiyor. | GEÇTİ | |
| S32 | L241 | Mesajını örnekle ve ölçütle karşılaştır, puanını seç. | "Mesajını örnekle" = mesajına örnek mi ver?... sonra anladım: örnek mesajla ve kurallarla karşılaştırıp puan seçeceğim. | GERİ | İki okuma: "örnekle" ilk okumada emir gibi ("örnekle!") okunuyor. Bir cümlede iki iş var (karşılaştır + puan seç). "Ölçüt" ekranda başka hiçbir yerde ad olarak görünmüyor. |
| S33 | L241 | Örnek tek doğru değildir. | Örnek mesajdan farklı yazdıysam da doğru olabilir. | GEÇTİ | |
| S34 | L242 | Senin mesajın: | Benim yazdığım. | GEÇTİ | |
| S35 | L244–245 | Örnek mesaj: / (adın) | Örnek bir mesaj; adımın yeri. | GEÇTİ | |
| S36 | L248 | {ad} ({puan} puan): | Bu madde kaç puan ediyor. | GEÇTİ | Yalnız çerçeve okundu; `ad` ve `tr` içerikten geliyor, bu turda değil. |
| S37 | L253 | Her ölçüte puan seç | Her satır için bir puana dokun. | GEÇTİ | Pasif düğmede, satırların hemen altında; bağlamla anlaşılıyor. |
| S38 | L253 | Puanı kaydet | Seçtiğim puanı kaydet. | GEÇTİ | |
| S39 | L291 | Kelime · dinle ve anlamını seç | Kelimeyi dinleyip Türkçesini seçeceğim. | GEÇTİ | |
| S40 | L292–293 | Kelimeyi dinle / (aria) Anlamı | Kelimenin sesini çal. | GEÇTİ | |

## Seviye.tsx — rapor ekranı

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| S41 | L308 | ölçülmedi | Bu kısım için soru sorulmadı. | GEÇTİ | |
| S42 | L308 | %{oran} · {d}/{t} | Yüzde kaç doğru, kaç sorudan kaçı. | GEÇTİ | |
| S43 | L32 [PM] | A2'ye hazırsın. | A2'ye geçebilirim. | GEÇTİ | |
| S44 | L32, L361 | A2'den önce bir tamamlama planın var. / A2'den önce {n} günlük bir tamamlama planın var. | A2'den önce bir şeyi tamamlamam gerekiyor... neyi? "Planın var" sanki benim önceden bir planım varmış gibi. | GERİ | Belirsiz: "tamamlama" neyin tamamlanması olduğunu söylemiyor (eksiklerim mi, A1 mi?). "Planın var" planı kimin yaptığını karıştırıyor. Biraz resmî/bürokratik. PM listesinde yok. |
| S45 | L32 [PM] | A1'i baştan, hızlı geçişle öneriyorum. | A1'e baştan başlamamı ama hızlı ilerlememi öneriyor. | GEÇTİ | Not: "hızlı geçiş"in ne demek olduğu (gün atlama mı, kısa günler mi) tam belli değil ama karar anlaşılıyor. |
| S46 | L315–323 | Genel %84 · konuşma %72 · en zayıf hafta %65 · {n} hafta ölçülemedi | Toplamda %84 bildim, konuşmada %72, en kötü haftamda %65; bazı haftalara soru gelmedi. | GEÇTİ | Not: "en zayıf hafta" hangi hafta olduğunu söylemiyor; aşağıdaki çubuklardan bulunuyor. |
| S47 | L329, L334, L359 | Seviye raporun | Seviye sonucum. | GEÇTİ | |
| S48 | L365 | Beceriler | Dinleme, okuma gibi alanlardaki sonuçlarım. | GEÇTİ | |
| S49 | L31 | Dinleme / Okuma / Yazma / Konuşma / Kelime / Dil noktaları | Altı alanın adları. | GEÇTİ | "Dil noktası" günlük derslerde etiket olarak zaten görülüyor; tanıdık. |
| S50 | L369–370 | Haftalar / {N}. hafta | Her haftanın sonucu. | GEÇTİ | |
| S51 | L373 | Zorlandıkların ({n}) | Zorlandığım şeyler, kaç tane. | GEÇTİ | |
| S52 | L376–377 | {g}. GÜN · {d}/{t} / Rehber | Hangi günden, kaç sorudan kaçını bildim; o günün Rehber'ine git. | GEÇTİ | |
| S53 | L378 | Zorlandığın "yapabiliyorum" cümlesi yok. | Zorlandığım ... "yapabiliyorum cümlesi" ne? Sanırım zorlandığım bir şey çıkmamış. | GERİ | İç kavram: "yapabiliyorum cümlesi" öğrencinin bildiği bir ad değil; ekranda başlık "Zorlandıkların", bu satır başka bir dil kullanıyor. İki okumada anladım. |
| S54 | L381–382 | Dil noktaları ({n}) / {ad} · {N}. hafta · {d}/{t} | Zorlandığım dil konuları, hangi haftadan, kaçını bildim. | GEÇTİ | |
| S55 | L382 | Zorlandığın dil noktası yok. | Dil konularında zorlandığım bir şey çıkmadı. | GEÇTİ | |
| S56 | L384 | Bilmediğin kelimeler: {n} · günlerinde öğreneceksin | Bilmediğim kelimeleri günlük derslerde öğreneceğim. | GEÇTİ | |
| S57 | L384 | Bilmediğin kelimeler: {n} → Kelime Bahçesi'nde | Bilmediğim kelimeler Kelime Bahçesi'ne kondu. | GEÇTİ | Not: ok + yarım cümle, ama tek okumada anlaşıldı. |
| S58 | L385 | Raporu kopyala | Raporu kopyalayıp başka yere yapıştırabilirim. | GEÇTİ | |
| S59 | L355 toast | Rapor kopyalandı | Kopyalandı. | GEÇTİ | |
| S60 | L355 toast | Kopyalanamadı; metni seçip kopyalayabilirsin. | Olmadı, yazıları kendim seçip kopyalayayım. | GEÇTİ | Biçim notu: `;`. |
| S61 | L335 | Henüz rapor yok / Seviye tespitini bitirince raporun burada durur. | Testi bitirince sonucum burada görünecek. | GEÇTİ | |
| S62 | L336 | Seviye tespitini sürdür / Seviye tespitine başla | Teste devam et / teste başla. | GEÇTİ | |
| S63 | L389 | A2'ye başla | A2 derslerine başla. | GEÇTİ | |
| S64 | L390 | A2'nin günleri hazırlanıyor; hazır olunca buradan başlarsın. | A2 dersleri henüz yok, hazır olunca bu düğmeyle başlarım. | GEÇTİ | Biçim notu: `;`. |
| S65 | L393 | A1'e baştan başla | A1'e birinci günden başla. | GEÇTİ | |
| S66 | L395 [PM] | Planımı gör | Bana hazırlanan planı göster. | GEÇTİ | |
| S67 | L349 toast | {N}. haftadan başlıyorsun | O haftadan başlıyorum. | GEÇTİ | |
| S68 | L62 toast | Rapor kaydedilemedi; tekrar dene. | Rapor kaydolmadı, tekrar dene. | GEÇTİ | |

## tespitDurum.tsx

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| T01 | L31 | Başlangıç noktasını elle değiştir | Nereden başlayacağımı kendim seçebilirim. | GEÇTİ | |
| T02 | L34 | Başlangıç noktası | Nereden başladığım. | GEÇTİ | |
| T03 | L14, L35 | Şu an: Baştan (A1) / A2'den ({n}. hafta) / A1'in {N}. haftasından | Şu an nereden başlıyorum. | GEÇTİ | |
| T04 | L36 | Önerimiz seviye tespiti. | Önce testi yapmamı öneriyorlar. | GEÇTİ | |
| T05 | L36 | Burada seçtiğin, tespit yapmadan uygulanır. | Burada seçersem... "uygulanır" — test yapılmadan o yerden başlarım galiba. | GERİ | Bürokratik ("uygulanır") ve virgül cümleyi bölüyor; iki okumada anladım. |
| T06 | L36 | Bitirdiğin günler ve kelimelerin kalır. | Bitirdiğim dersler ve kelimelerim silinmez. | GEÇTİ | |
| T07 | L38–39 | Baştan (A1) / A2'den ({n}. hafta) | A1'in başından / A2'den başla. | GEÇTİ | |
| T08 | L41 | A2'nin günleri hazırlanıyor. | A2 dersleri henüz yok. | GEÇTİ | |
| T09 | L66 | Seviye tespitin yarıda / Kaldığın yerden sürer. | Testi yarıda bıraktım, kaldığım yerden devam ederim. | GEÇTİ | |
| T10 | L66 [PM] | Önce seviyeni görelim / Bildiğini tekrar ettirmeyelim; eksik varsa tam yerini bulalım. | S05 ve S06 ile aynı. | GEÇTİ | Biçim notu: `;`, PM metni. |
| T11 | L67 | Sürdür / Başla | Devam et / başlat. | GEÇTİ | |

## HaftaTesti.tsx (yalnız tespit metinleri)

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| H01 | L122 | {N}. gün / Önce seviyeni görelim | Bu gün kapalı, önce seviyeme bakılacak. | GEÇTİ | |
| H02 | L122 | Seviye tespitini bitirince günlerin açılır; nereden başlayacağını o gösterir. | Testi bitirince dersler açılır; test nereden başlayacağımı söyler. | GEÇTİ | Biçim notu: `;`. |
| H03 | L123 | Seviye tespitine git | Teste git. | GEÇTİ | |
| H04 | L208 | Seviye raporuna dönüp kararını görebilirsin. | Rapora dönüp... "kararımı" mı? Ben bir karar vermedim. | GERİ | Kimin kararı belirsiz: kararı uygulama verdi, "kararın" öğrenciye ait gibi duruyor. Ayrıca rapor değişmediği için "görebilirsin" yeni bir şey varmış gibi okunuyor. |
| H05 | L210 | Seviye raporuna dön | Rapor ekranına geri git. | GEÇTİ | |

## Onboarding.tsx

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| O01 | L165 | Seviye tespiti. Seviyeni varsaymıyoruz: | Seviyemi tahmin etmeyecekler, ölçecekler. | GEÇTİ | |
| O02 | L165 | A1'in sekiz haftasından sorularla nereden başlayacağını birlikte bulalım. | A1'in 8 haftasından sorularla nereden başlayacağımı bulacağız. | GEÇTİ | |
| O03 | L165 | Bilmediğin soruda "Bilmiyorum" demek tamamen normal. | Bilmezsem "Bilmiyorum" diyebilirim, ayıp değil. | GEÇTİ | |
| O04 | L167 | Seviye tespitine başla | Teste başla. | GEÇTİ | |

## Ben.tsx

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| B01 | L96 | Seviye raporun / Beceriler, haftalar, zorlandıkların | Sonucum: alanlar, haftalar, zorlandığım yerler. | GEÇTİ | |
| B02 | L96 | Seviye tespiti / Yarıda; kaldığın yerden sürer | Test yarıda, kaldığım yerden devam ederim. | GEÇTİ | Biçim notu: `;`. |
| B03 | L96 | Seviye tespiti / Nereden başlayacağını bulalım | Nereden başlayacağımı bulmak için test. | GEÇTİ | |

## core/tespit.ts `raporMetni` (kopyalanan metin)

| Kimlik | Yer | Metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| R01 | L207 | Seviye raporu (A1) | A1 seviye sonucum. | GEÇTİ | |
| R02 | L208 | Karar: {karar} | Uygulamanın kararı. | GEÇTİ | "tamamla" kararının cümlesi S44'te geri döndü; başlık kendi başına anlaşılıyor. |
| R03 | L209 | Genel: %{n} | Toplam yüzdem. | GEÇTİ | |
| R04 | L209–210 | Beceriler: / - {beceri}: %{n} ({d}/{t}) | Her alanın yüzdesi ve sayısı. | GEÇTİ | |
| R05 | L211–212 | Haftalar: / - {N}. hafta: %{n} | Her haftanın yüzdesi. | GEÇTİ | |
| R06 | L213 | Zorlandıkların: / - {g}. gün ({d}/{t}): {tr} | Zorlandığım günler ve cümleler. | GEÇTİ | |
| R07 | L214 | Dil noktaları: / - {ad_tr \|\| id} ({N}. hafta, {d}/{t}) | Zorlandığım dil konuları. | GERİ | Adı boş olan dil noktasında öğrenciye iç kimlik (kod) yazılıyor; ekranda (S54) bunun yerine "Dil noktası" çıkıyor. Kopyalanan metinde anlaşılmaz bir kod görülebilir. |
| R08 | L215 | Bilmediğin kelimeler: {n} | Kaç kelimeyi bilmedim. | GEÇTİ | |

## Sonuç

- Toplam: **99**
- GEÇTİ: **87**
- GERİ: **12**

GERİ olanlar: S07, S08, S10 [PM], S16 (yalnız `≈` eki), S17, S27, S32, S44, S53, T05, H04, R07.

Bu PR'ın Türkçe metinleri bu haliyle "reviewed" sayılamaz (OD-9.4).

Biçim notu (geri dönüş sebebi değil, karar yazar/PM'de): PM metinleri de içinde olmak üzere birçok satırda `;` var (S06, S10, S14, S22, S60, S64, S68, T10, H02, B02). OD-9.2'nin `;` yasağı açıklama alanları için yazıldı. Arayüz metnine uygulanıp uygulanmayacağına baş geliştirici ya da PM karar verir.

## Fark turu (OD-9.4)

Yalnızca ilk turda geri dönen ve düzeltilen satırlar ile iki yeni/ek metin okundu. S10, S27 ve S44 PM'e gittiği için bu turda okunmadı.

| Kimlik | Yer | Yeni metin | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| S07 | Seviye.tsx:94 | {n}/{t} bölüm bitti · yaklaşık {k} dk kaldı | Bölümlerin bir kısmını bitirdim, birkaç dakika kaldı. | GEÇTİ | `≈` gitti. |
| S08 | Seviye.tsx:96 | Yaklaşık N dakika. Zorlandığın hafta olursa biraz uzar. | Test bu kadar sürer, zorlanırsam biraz daha uzun sürer. | GEÇTİ | İki kısa cümle, sembol yok. |
| S16 | Seviye.tsx:118 | {N}. hafta: biraz daha bakalım (yaklaşık {dk} dk) | Bu haftada eksiğim var, birkaç dakika daha soru gelecek. | GEÇTİ | |
| S17 | Seviye.tsx:119 | Bütün haftalar bitince bu haftadan birkaç soru daha gelecek. | Önce bütün haftalar bitecek, sonra bu haftadan ek sorular gelecek. | GEÇTİ | "Tarama" gitti; ne zaman olacağı belli. |
| S32 | Seviye.tsx:234 | Uygulama mesajı tam puanlayamaz. Mesajını aşağıdaki örnekle karşılaştır. Her satır için puanını seç. Örnek tek doğru değildir. | Uygulama mesajımı değerlendiremiyor; aşağıdaki örnek mesaja bakıp her satıra kendim puan veriyorum. Benimki farklı olsa da doğru olabilir. | GEÇTİ | Dört kısa cümle, her biri tek iş. "Örnekle" artık emir gibi okunmuyor. |
| S53 | Seviye.tsx:375 | Zorlandığın bir şey çıkmadı. | Zorlandığım bir şey yok. | GEÇTİ | |
| T05 | tespitDurum.tsx:37 | Önerimiz seviye tespiti. Burada seçersen test yapmadan oradan başlarsın. Bitirdiğin günler ve kelimelerin kalır. | Test yapmamı öneriyorlar; burada seçersem testsiz, seçtiğim yerden başlarım. Eski ilerlemem silinmez. | GEÇTİ | |
| H04 | HaftaTesti.tsx:208 | Seviye raporuna dönüp sonucunu görebilirsin. | Rapora dönüp sonucuma bakabilirim. | GEÇTİ | |
| R07 | core/tespit.ts:215 | - {ad_tr \|\| "Dil noktası"} ({N}. hafta, {d}/{t}) | Zorlandığım dil konusu, hangi hafta, kaçını bildim. | GEÇTİ | İç kimlik artık görünmüyor. Ekrandaki S54 ile aynı yedek metin. |
| S69 (yeni) | Seviye.tsx:66 | Raporun kaydedilemedi. Cevapların cihazda duruyor; tekrar dene. | Rapor kaydolmadı ama cevaplarım telefonda duruyor, bir daha deneyeyim. | GEÇTİ | Biçim notu: `;` (ilk turdaki gibi geri dönüş sebebi değil). |
| H01–H03 (değişmedi) | HaftaTesti.tsx:122–123 | Kilit ekranı: {N}. gün / Önce seviyeni görelim / Seviye tespitini bitirince günlerin açılır; nereden başlayacağını o gösterir. / Seviye tespitine git | Testi bitirmeden dersler açılmaz; test nereden başlayacağımı söyler. | GEÇTİ | İlk turdaki karar aynı. |

### Fark turu sonucu

- Okunan: **11** (9 düzeltme + 1 yeni metin + değişmeyen kilit ekranı)
- GEÇTİ: **11**
- GERİ: **0**

Okur tarafında açık madde kalmadı. Açık kalanlar S10, S27 ve S44: PM metni olarak PM'de. Bu üç madde kapanmadan PR'ın Türkçe metinleri bütünüyle "reviewed" sayılmaz (OD-9.4).
