# A9 örneklem: klip-06, klip-04 ve klip-05 ortam metni

## Dilbilimci

Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan
Dosyalar: `content/v2/m1/video/klip-06.json` (tamamı), `klip-04.json` ve `klip-05.json` (yalnızca `ortam_tr`)
Dayanak: zamanlanmış transkript `klip-06.metin.json` (6 cümle) ve `klip-06.olcum.json`.

### Kapsam
45 madde incelendi: 6 tur (`basi` + `tr`), 6 ön öğretim maddesi, 3 ortam metni, ana fikir ve 3 ayrıntı sorusu (soru, şıklar, açıklama), 5 dikte basamağı, 2 gölge bağı, cevapla, dikte notu, kanıt.

### Düzeltmeler (45 maddede 5, hepsi klip-06)
| Madde | Sorun | Düzeltme |
|---|---|---|
| 7. tur `tr` | `Son kez nasıl kutladın?` "bir daha olmayacak" diye de okunuyor. Ortam metni ve ana fikir açıklaması aynı ifadeyi `en son` diye veriyor. | `En son nasıl kutladın?` |
| ön öğretim 1 `tr` | Aynı sorun: `son kez kutlamış`. | `en son kutlamış` |
| 8. tur `tr` | `Son kutlama` aynı belirsizliği taşıyor. `büyükanne ve büyükbabamın` ön öğretimdeki karşılıktan farklıydı. | `En son kutlama ABD'deydi, büyükannemle büyükbabamın yanında.` |
| 10. tur `tr` | Eva **die** (onlar) diyor, çeviri `arkadaşlarım` yazıyordu. Videoda söylenmeyen kelime çeviride vardı. | `yani onlar başka bir bölgede oturuyor` |
| kanıt | `tahminen 25 saniye` ölçümle tutmuyor: kesilmiş klip 21,96 sn. | `yaklaşık 22 saniye` |

### Tutan maddeler
- Altı `basi` transkriptteki cümle başlarıyla birebir aynı. Tur numaraları ve `kesit` bağları doğru.
- Ana fikir ve üç ayrıntı sorusu tek cevaplı. Cevapların hepsi videoda duyuluyor: **Leider nein** (10. tur), **im Oktober** ve **am 13. Oktober** (Jan, 2. tur). Gün şıkları (3, 13, 30) seste ayrışıyor.
- d1: **wohnen** 10. turda geçiyor, **kommen** kesitte hiç geçmiyor, **feiern** yalın biçimde geçmiyor. d2, d3 (kelime bankası cümleyi kuruyor), d4, d5 ve cevapla kabul listeleri doğru Almanca, en az üç varyant var.
- Ön öğretim maddeleri videodaki biçimlerle uyumlu. **eine andere Region** yalın hâlde öğretiliyor, videoda **in einer anderen Region** geçiyor: kabul edilebilir.
- Kişisel bilgi yok: soyad, adres ve yıl geçmiyor. Jan yalnızca gün ve ay söylüyor. İki karede ekranda yazı yok.
- klip-04 `ortam_tr`: çıkarılan cümleden sonra kalan dört cümle doğru ve doğal. Değişiklik yok.
- klip-05 `ortam_tr`: kalan beş cümle doğru ve doğal, Jan'ın çıkarılan cevabını da haber veriyor. Değişiklik yok.
- Üç dosyada `tanıyorsun` içeren başka cümle kalmadı.

### Kalan şüpheler
1. Sesi kendim dinleyemedim. Ses tanıma modeli indirilemedi, kaynak transkript sayfaları da açılamadı (`coerll.utexas.edu/dib/vidt.php?f=05_26_int_ek_geburtstag` ve `...05_25_int_ju_geburtstag`). Karşılaştırma yalnızca `klip-06.metin.json` ile yapıldı.
2. Ölçüm dosyasına göre Jan parçası sesle birebir (hata 0). Böylece **am 13. Oktober** için eski "söyleniş doğrulanmadı" notu kapanıyor. Eva parçası `insan-orneklemi` etiketli: 7. ve 8. turda birer kelime seste var, metinde yok (hata 0,05). Sorular bu iki kelimeye dayanmıyor, ama d3 (7. turun tam cümlesi) ve 7. tur gölgesi için bir insanın dinlemesi gerekir.
3. `kesit_sure_tahmin_sn` (19 ve 6), `toplam_sure_tahmin_sn` (25) ve `olcum_notu` ("ayrıca ölçülmedi") artık eski: ölçüm 16,9 + 5,1 = 21,96 sn. Sayısal alanlar baş geliştiricinin; dokunulmadı.
4. klip-04 `review.notes` hâlâ "ortam_tr Eva'yı üçüncü günden tanıdığını söylüyor" diyor. Geçmiş kaydı olduğu için bırakıldı.
5. `dikte_notu` öğrenciye görünüyorsa ilk cümlesi (3–6. turlar) öğrencinin duymadığı turlardan söz ediyor. Okur karar vermeli.

### Doğrulayıcı
`npm run content:validate` çalışma ağacında çalışmadı: `node_modules` boş (`zod` bulunamıyor). Aynı içerik geçici bir kopyada ana deponun bağımlılıklarıyla doğrulandı: 0 hata, 142 uyarı; uyarıların hiçbiri klip dosyalarına ait değil.

### Sonuç
- klip-06 dil incelemesi: KAPANDI (5 düzeltme). `review.status` "draft" kaldı: okur bakışı ve 2. maddedeki insan dinlemesi bekliyor.
- klip-04 ve klip-05 `ortam_tr`: KAPANDI (düzeltme yok).
- Hata oranı: 5/45.

## Baş geliştirici: örneklem kontrolü (PM-079 hazır tanımı 7047635595)

Yöntem:
- Releases `m1-medya` 14:46 sürümü indirildi.
- Süre `ffprobe` ile ölçüldü.
- Ses `silencedetect` (−35/−30/−25 dB) ve 0,1 sn enerji eğrisiyle tarandı.
- Tur zamanlarından ve aralardan kareler alınıp bakıldı.
- `metin.json` cümleleri klip dosyasının `turlar[]` ve `kesitler[].turlar[]` alanlarıyla tur tur eşleştirildi (`basi`).

| klip | süre | kare | metin ↔ ses | kişisel bilgi | karar |
|---|---|---|---|---|---|
| 01 | 22,27 sn | Berna 0–15,7 sn, Adan 16,2 sn'den; yazı ve logo yok | Adan'ın 1. ve 2. turu seste var (16,0–18,3), `metin.json`'da yok; klip dosyası `bas_tur: 1` | yok (şehir ve yaş) | **bekliyor**: elle hizalama ANA'da (#12 7047875097) |
| 06 | 22,07 sn | Eva 0–16,9 sn, Jan 17 sn'den; yazı ve logo yok | Jan birebir. Eva'da `olcum.json` 7. ve 8. turda birer sözcüğün metinde olmadığını gösteriyor; 7. tur diktede tam cümle | yok (gün ve ay; yıl yok) | **bekliyor**: insan kulağı (#12 7048075237) |
| 07 | 25,03 sn | Harald, ofis; yazı ve logo yok | 14. tur (15,9–24,9) seste var, `metin.json`'da yok; 14. tura bağlı soru ve dikte var | yok (soyadlı 1. ve 2. tur kesit dışında, telefon turları `haric`) | **bekliyor**: elle hizalama ANA'da |

- **`orneklem_onay`:** bu PR'da hiçbir klibe yazılmadı.
- **klip-04 ve klip-05 `ortam_tr`:** "… günden tanıyorsun" cümleleri çıkarıldı. 3. ve 1. günün videoları bağlı değil.
- **klip-07 `ortam_tr` "Onu dördüncü günden tanıyorsun":** doğru; 4. gün klibi Harald'ı içeriyor ve bağlı.
- **`bolum.dikte_notu` (okur GERİ):** alan `web/src` ve `content/tools` içinde okunmuyor, öğrenciye gösterilmiyor; hazırlayan notu. Okurun bulgusu öğrenci ekranını etkilemiyor. Alan ileride gösterilecekse önce yeniden yazılmalı.

## Dilbilimci: d3 10. tur

Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan · Dosya: `content/v2/m1/video/klip-06.json`, `bolum.dikte` d3 (düzeltme yok)

- **Cümle doğru.** „Die wohnen in einer anderen Region.“: **die** konuşma dilinde „onlar“ (çoğul), fiil **wohnen**; **in** + yer bildiren -de hâli, dişil: **einer anderen Region**. 10. turun kaynak metniyle („… also die wohnen in einer anderen Region.“) sözcük sözcük aynı.
- **Çeldiriciler uygun.** Üçü de yalnızca dinleyerek elenir: **wohnt** (-t / -en), **Stadt** (Region ile aynı cins, dilbilgisi ele vermez), **eine** (**einer** ile tek ses fark). Banka 9 sözcük, hedef 6.
- **Tek doğru dizi: evet, dikte olarak.** Bankadan dilbilgisi doğru başka cümleler de kurulabiliyor („Die wohnt in einer anderen Region.“, „Die wohnen in einer anderen Stadt.“, „In einer anderen Region wohnen die.“), ama hiçbiri seste yok; görev „duyduğunu kur“ olduğu için reddedilmeleri doğru. Kabul listesine eklenmemeli.
- **Kabul listesi çalışıyor.** Uygulama seçilen sözcükleri boşlukla birleştiriyor (`bankadan`): „die wohnen in einer anderen Region“ → 2. öğeyle birebir.
- **Kalan şüphe (dil değil, ekran):** öğrenci turun tamamını duyuyor („Leider nein, weil... also die wohnen …“), bankada ise yalnızca son bölüm var; **also** bankada yok. `hedefSira` ipucu („Bu kayıtta 2 cümle var; 2. cümleyi …“) çıkmıyor, çünkü metindeki ikinci parça **also** ile başlıyor ve hedefle eşleşmiyor. Banka zaten yalnızca son bölümü kurduruyor, bu yüzden engel değil. İstenirse iki yol: (a) `q_tr`/yönerge „**also**'dan sonrasını kur“ desin; (b) **also** bankaya, „Also die wohnen in einer anderen Region.“ kabul listesinin başına girsin (o zaman ipucu kendiliğinden çıkar; **also** ön öğretimde yok, eklenmesi gerekir). Karar ANA/okurda.
- `on_ogretim` „eine andere Region“ (yalın) gösteriyor, cümlede **einer anderen** geçiyor; **eine** çeldiricisi bu farkı yokluyor. Hata değil; ön öğretime „in einer anderen Region = başka bir bölgede“ eklenirse basamak daha adil olur.
- `npm run content:validate` → 0 hata, 142 uyarı (klip dosyalarına ait değil).

Sonuç: **KAPANDI** (düzeltme yok, 0/1).
