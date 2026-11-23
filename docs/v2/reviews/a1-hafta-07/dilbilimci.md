# Dilbilimci incelemesi · A1 7. hafta (gün 43–49), tam tur (İÇ-6, PM-089)

İnceleyen: dilbilimci-ajan · 2026-11-23 · dal `content/a1-hafta-07`

Dosyalar: `content/v2/m1/gun-43.json` … `gun-49.json`, `hafta-sonu-testi-07.json`, `gorulmemis-07.json`, `content/v2/registry/grammar.json` (12 kayıt: gr:a1-10:t1, 09:t2, 09:t3, 09:t4, 10:t4, 10:t2, 09:t5, 13:t4, 13:t5, 14:t1, 14:t2, 10:t3).

## İncelenen öğe sayısı: 1017

| Tür | Adet | | Tür | Adet |
|---|---:|---|---|---:|
| görev cümlesi | 174 | | prova seçeneği | 85 |
| halka kalıbı | 78 | | prova düğümü | 49 |
| halka sahne satırı + sorusu | 53 + 17 | | okuma/yazma metni, sorusu, yazma görevi | 7 + 24 + 3 |
| sahne satırı | 100 | | gün sınavı maddesi | 77 |
| ses cümlesi | 73 | | hafta sonu testi maddesi | 12 |
| anlama sorusu (ana fikir, ayrıntı) | 74 | | görülmemiş durum | 5 |
| eylem sorusu | 14 | | görsel | 34 |
| dikte basamağı | 105 | | grammar.json kaydı | 12 |
| "Sen ne derdin?" | 21 | | | |

## Özet
- **61 düzeltme**: 42 gerçek hata, 19 doğallık ya da tutarlılık iyileştirmesi.
- Hata oranı: **42 / 1017 = %4,1**.
- Tıbbi içerik: tehlikeli ya da yanlış doz yok. Öğütler genel ve zararsız (bol su, evde kalmak, yürümek, aşı günü spor yok, kan tahlilinden önce yemek yok ama su serbest).
- Bairisch yok. Kişisel bilgi yok. `{name}` ve `{Patient|Patientin}` doğru yerlerde.

## Düzeltmeler (önce → sonra, gerekçe)

### 43. gün (10)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 1 | a1 ayrıntı 1 | "Acil bir durumda nereye gitmelisin?" `kanit: [c4]` | "Muayenehane bugün saat kaça kadar açık?" → On ikiye kadar, `kanit: [c2]` | **PM-097.** c4'teki **Notaufnahme** ve **Krankenhaus** günün kartları; ses durağı halkalardan önce çalıyor. c4 metinde ve diktede kaldı. |
| 2 | a1 eylem | "Saat üçte başın çok ağrıyor ve ateşin yüksek…" `kanit: [c3, c4]` | "Saat üçte muayenehaneye gitmek istiyorsun. Acil değil…" → "Yarın saat sekizden sonra git." `kanit: [c3, c5]` | **PM-097**, aynı neden. |
| 3 | a2 `ortam_tr` | "…telefon ettin ama ulaşamadın. Huber Hanım sana mesaj bırakmış." | "…telesekreterine neyin olduğunu söyledin. Huber Hanım geri aramış ve mesaj bırakmış." | Çelişki: c2'de Huber Hanım şikâyetini biliyor (**Sie haben Fieber und der Kopf tut weh, richtig?**). |
| 4 | h3 görev, tr | "Brandl Hanım da burada hasta." | "Brandl Hanım da buranın hastası." | Yanlış anlam: "burada hasta" hastalandı gibi okunuyor. |
| 5 | h3 sahne, tr | "…mayıstan beri burada hastayım." | "…mayıstan beri buranın hastasıyım." | Aynı. |
| 6 | h2 görev, tr | "Yarın dişçiden randevum var." | "Yarın dişçide randevum var." | **beim Zahnarzt** = dişçide. |
| 7 | h2 görev, tr | "Yine sağlığıma kavuştum." | "Yeniden sağlıklıyım." | Ağdalı; gündelik karşılık. |
| 8 | h1 sahne | **Frau Brandl! Tut der Kopf weh?** | **Frau Brandl! Tut Ihnen der Kopf weh?** | Birine sorarken kişi söylenir; günün kalıbı da **Mir / Ihnen tut … weh**. |
| 9 | prova n2 | **Seit wann tut der Kopf weh?** | **Seit wann tut Ihnen der Kopf weh?** | Aynı. |
| 10 | s10 `accepted` | 4 cevap | + **Wie lange dauert es?** | Doğal cevap eksikti (haksız ret). |

### 44. gün (2)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 11 | h3 görev `accepted` | **Möchten Sie diese Aufgabe?** | **Wollen Sie diese Aufgabe machen?** | Fiilsiz biçim doğal değil. |
| 12 | s10 `prompt_de` | **Was tut nach dem Training weh?** | **Was tut Ihnen nach dem Training weh?** | Doktor kişiye sorar. |

### 45. gün (10)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 13 | h2 görev (lx:Schlüssel) | **Der Schlüssel ist in der Tasche.** | **Vergessen Sie den Schlüssel nicht!** (3 kabul) | **Dil noktası.** Dört cümle silindikten sonra gr:a1-09:t4 (resmî talimat) 5 görev cümlesine düşmüştü; şimdi 6. |
| 14 | a2 c5 | **Das Rezept ist in meiner Tasche, und Herr Pichler hat meinen Schlüssel.** | **Herr Pichler hat das Rezept. Er ist heute da.** | **PM-097.** **Tasche** ve **Schlüssel** günün kartları; eylem sorusu yalnız bu iki sözcükle çözülüyordu. |
| 15 | a2 ayrıntı 2 | "Anahtar kimde?" | "Reçete kimde?" (çeldiriciler de uyarlandı) | 14'ün sonucu. |
| 16 | a2 eylem | "Önce Pichler Bey'den anahtarı al, çantadaki reçeteyle…" | "Önce Pichler Bey'den reçeteyi al, sonra eczaneye git." | 14'ün sonucu. |
| 17 | a2 d5 `ornek_de` | **…Herr Pichler hat den Schlüssel.** | **…Herr Pichler hat das Rezept.** | 14'ün sonucu. |
| 18 | prova n4 | **Genau. Vor dem Essen oder nach dem Essen, das ist egal.** | **Genau, so ist es richtig.** | n2'de damla göz damlası (**für die Augen**). Göz damlasında yemek saati söylenmez. |
| 19 | v1 s16 | **Und morgen kein Training** | **Und heute kein Training** | s8'de doktor **Heute … kein Training** diyor; ayrıntı sorusu da "bugün" soruyor. |
| 20 | h2 görev (lx:vorschlagen) | **Was schlagen Sie gegen Husten vor?** | **Ich habe Husten. Was schlagen Sie vor?** (eskisi kabulde) | **vorschlagen gegen** eşdizimi zayıf; eczanede böyle sorulur. |
| 21 | h1 kalıp, tr | "Caddeden düz gidin." | "Cadde boyunca gidin." | **entlang** = boyunca. |
| 22 | v1 s5, tr | "Hayır, çok çabuk geçer." | "Hayır, çok çabuk biter." | **Das geht ganz schnell** iğnenin süresini anlatıyor. |

### 46. gün (5)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 23 | v1 s9 | **Fragen Sie meinen Nachbarn!** (seni gösteriyor) | **Das weiß ich nicht!** | **Sabit cinsiyet (D-061).** Öğrenci için erkek biçim; ses önceden üretildiğinden yer tutucu da olmaz. |
| 24 | a1 c2 | **Sie möchten umziehen?** | **Sie sind umgezogen?** | Gerçeklik: ikamet kaydı taşındıktan sonra yapılır. |
| 25 | prova `durum_tr` | "Yeni hasta formunu…" + noktalı virgül | "Muayenehane ondan bir form daha istiyor…", iki cümle | Brandl Hanım yeni hasta değil (43. gün, WORLD). OD-9: noktalı virgül yok. |
| 26 | v1 cevapla `accepted` | **Brunnengasse sieben, wie ich.** | **Sie wohnt in der Brunnengasse sieben, wie ich.** | Fiilsiz **wie ich** yanlış bağlanıyor. |
| 27 | `can_do.tr` | "…veririm; başkasının bilgisini (sein, ihr) söylerim." | "…veririm, başkasının bilgisini de söylerim." | OD-9: noktalı virgül ve parantezli Almanca. |

### 47. gün (7)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 28 | h2 sahne | **das ist mein Hotel am See** | **das ist mein Hotel am Meer**; çeldirici "Otel deniz kenarındaydı" → "Otel kapalıydı" | Aynı gün, aynı fotoğraflar: v1 s4'te otel **am Meer, auf einer Insel**. |
| 29 | a1 ayrıntı 1 | seçenekler "Göl kenarında bir otelde / Deniz kenarında / Evde" | "Bir otelde / Evde / İş yerinde" | **PM-097.** **See** ile **Meer** günün kartları; **Hotel** Türkçeyle aynı. |
| 30 | h1 görev `accepted` | **Mir gefällt rot nicht.**, **Nein, rot gefällt mir nicht.** | **Rot** | Renk adı isim olarak büyük yazılır. |
| 31 | prova n4 `accepted` | **Nein, weiß gefällt mir nicht.** (2 kabul) | **Weiß** | Aynı. |
| 32 | h1 görev `accepted` | **Deine Wohnung: Wie ist die Adresse?** | **Wie ist jetzt deine Adresse?** | Söylenen bir cümle değil. |
| 33 | s7 `tr` | "Mont bana olmuyor." (kabul: **Der Mantel**) | "Palto bana olmuyor." | Sözlükte **Mantel** palto, **Jacke** ceket ve mont. "Mont" yazıp **Die Jacke** diyen haksız ret alırdı. |
| 34 | h2 görev, tr | "Yazın denizdeydim." | "Yazın deniz kenarındaydım." | **am Meer** = deniz kenarında. |

### 48. gün (2)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 35 | a1 eylem | "Şefi ara, akşam da Tobi'yi ara." `kanit: [c3, c6]` | "Şefi ara, Tobi'nin hasta olduğunu söyle." `kanit: [c2, c3]` | **PM-097.** c6'daki **Ruf mich … an** günün dil noktası. c6 metinde, diktede ve gölgede kaldı. |
| 36 | h1 görev, tr | "Masada oturma!" | "Masada kalma!" | **Bleib nicht** = kalma. |

### 49. gün (5)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 37 | s4 dikte | **Geh mit dem Zug, nicht mit dem Auto!** | **Geh zum Bahnhof, der Zug kommt gleich!** | **Yanlış Almanca.** Taşıtla **gehen** denmez, **fahren** denir. **Fahr** ve **Nimm** dikte için öğretilmiş sayılmıyor (benzetim uyarısı); bu yüzden doğru bir **Geh** cümlesi. |
| 38 | s6 `why_tr` | "…aktarırsın; bira yoksa **kein Bier**." | iki cümle | OD-9: noktalı virgül. |
| 39 | s7 `why_tr` | "…başa gelir; beni **mich** olur." | iki cümle | Aynı. |
| 40 | h1 görev, tr | "Seni on dakika sonra arıyorum." | "…ararım." | Gelecek anlamı. |
| 41 | okuma `metin_tr` | "Birasız ama kekli!" | "…pastalı!" | Hafta boyunca **Kuchen** "pasta" (43, 44. gün). |

### Hafta sonu testi (1)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 42 | t05 `accepted` | 3 cevap, hepsi **Die Jacke** | + **Diese Jacke steht dir gut.** | Türkçesi "Bu ceket"; birebir çeviri kabul listesinde yoktu. |

### Görülmemiş durumlar (2)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 43 | g1 kalıp ve kabuller | **Ich habe seit … Schmerzen im …** | **Mir tut seit … der … weh.**; kabuller derste öğretilen biçimlerle (**Mir tut … weh**, **Mein Rücken tut … weh**, **Rückenschmerzen**), eski biçim de kabulde | **Schmerzen im Rücken** hafta içinde hiç öğretilmedi (ölçüt 7). |
| 44 | g1 `prompt_de` | **Sie sehen müde aus. Alles in Ordnung?** | **Alles in Ordnung? Sie sind heute so müde.** | **aussehen** öğretilmemiş. |

### Hafta geneli (1)
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 45 | 47, 48, 49 ve görülmemiş, Türkçe alanlar (27 metin) | "Frau Brandl", "Frau Huber", "Herr Pichler", "Herr Wimmer", "Frau Schneider" | "Brandl Hanım", "Huber Hanım", "Pichler Bey", "Wimmer Bey", "Schneider Hanım" | 43–46 "Hanım / Bey" yazıyordu; aynı haftada iki biçim vardı. Almanca alanlara dokunulmadı. |

### grammar.json (16 dokunuş, 8 kayıt)
| # | Kayıt | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 46 | 10:t1 `tr` | "…bana demektir, kelime kelime baş bana acı veriyor." | "…bana demektir. Kelime kelime: baş bana acı veriyor." | Bilgi doğru; tek cümlede okunmuyordu. |
| 47 | 13:t5 `tr` | "Kelime kelime etek bana hoş geliyor…" | "Kelime kelime: etek bana hoş geliyor…" | Aynı. |
| 48 | 13:t5 tablo | `["soru", "", …]` | `["soru", "nasıl buldunuz?", …]` | Boş Türkçe hücre. |
| 49 | 13:t5 tablo | "(beden) uymak, olmak" | "uymak, olmak (beden, saat)" | Hafta **Samstag passt mir** de öğretiyor. |
| 50 | 13:t4 `tr` | "**ihr** hem kadın için ona, hem de samimi çoğul siz olabilir." | "**ihr** kadın için ona, onun ve samimi siz anlamlarına gelebilir." | Eksik: 46. günde **ihr** "onun" olarak öğretildi; asıl karışan o. |
| 51 | 13:t4 tablo | "ona (erkek / nötr)" | "ona (erkek ya da das ile gelen şey)" | OD-9: öğretilmemiş terim. |
| 52–54 | 14:t1 tablo | "eril şey", "dişil şey", "nötr" | "der ile gelen şey", "die ile gelen şey", "das ile gelen şey" | Aynı. |
| 55 | 14:t2 `tr` | "**der** **den** olur, **ein** **einen** olur: **für meinen Bruder**." | "**der** **den**, **ein** **einen**, **mein** **meinen** olur: **für meinen Bruder**." | Örnek kuralı göstermiyordu. |
| 56 | 09:t5 tablo | imza örneği "…" | "(imzan)" | OD-9: üç nokta. |
| 57 | 10:t3 `tr` | "**du schläfst** biçimi **Schlaf** olur." | "…**Schlaf** olur, noktalar düşer." | Neden farklı olduğu yazmıyordu. |
| 58 | 10:t4 `tr` | "bol su içmeliymişim" | "bol sıvı içmeliymişim" | **viel trinken** su demek değil. |
| 59–61 | 10:t2, 13:t4, 14:t1 tablo | "resmi" | "resmî" | Aynı kayıtların metninde "resmî". |

Dokunulmayan dört kayıt (09:t2, 09:t3, 09:t4, 10:t2 metni): bilgi doğru, OD-9'a uygun. 09:t3'teki "**Ich will** istiyorum demektir, gelecek zaman bildirmez" uyarısı yerinde (D-060).

## Ölçütlere göre sonuç

1. **Almanca:** 61 düzeltmenin dışında hata yok. Doktor ve eczane kalıpları gerçek: **Was fehlt Ihnen?**, **Seit wann …?**, **Machen Sie bitte den Arm frei**, **zweimal am Tag**, **nach dem Essen**, **Gute Besserung**. Sie/du tutarlı (Tobi, Ioana, Derya, Basti, Luka du; diğerleri Sie). Üretim maddelerinin hepsinde `accepted` ≥ 3.
2. **Tıbbi bilgi:** zararsız. Doz cümleleri genel (ilaç adı yok). Aşıdan sonra bekleme ve spor yasağı, tahlil öncesi açlık, göz damlasından sonra araba kullanmama gerçekçi.
3. **Türkçe:** 9 çeviri düzeltildi. Açıklamalar kısa, terimsiz, İngilizce yok.
4. **Sınav ve dinleme:** bütün `ans` ve `kanit` değerleri tek tek okundu, doğru. Okuma `kanit` sıraları (0'dan) doğru. Dikte merdiveni FORMAT'a uygun.
   **PM-097 md. 1:** 14 ses kaydı, 56 soru. 6 soru değişti (43 a1 ×2, 45 a2 ×2, 47 a1, 48 a1). Günün sözcüğünü içerip bağlamdan çözülen kanıtlar aşağıda, "Kalan açık noktalar 1"de.
5. **Dil noktası:** her nokta o gün ≥ 6, ertesi gün ≥ 2 görev cümlesinde. Tek eksik 45'teki resmî talimattı (5), düzeltildi (6).
6. **Öğretmeden isteme yok:** son benzetim (`sim7d`): 43–49 için tek hata türü `dersler: gr:… temel pakette yok` (12); "öğretilmemiş", "bilinmeyen", "accepted" uyarısı 0; AK-3 sayacı 43 0/25 · 44 0/20 · 45 0/22 · 46 0/21 · 47 0/22 · 48 0/23 · 49 0/29; `dikis.out` 43–49 ihlalsiz. `npm run content:validate`: 19 hata, hepsi bu dalın eski şemasından (`day ≤ 7`, `dersler` deseni); içerik hatası 0.
7. **Görülmemiş durumlar:** beşinde de kişi + yer + olay derste yok. g1 kalıbı düzeltildi; diğer dördünün kalıbı derste öğretilmiş.
8. **Kurallar:** kişisel bilgi yok; Bairisch yok; hafta içinde aynı cümle iki kez yok (tek eşleşme 43. günde kalıp **Wo ist die Notaufnahme?** ile kendi sınav maddesi).

## Yazarın sorularına cevap
- **"kelime kelime baş bana acı veriyor":** doğru ve yararlı; iki cümleye bölündü (#46).
- **13:t4'teki ihr uyarısı:** eksikti, "onun" anlamı eklendi (#50).
- **lx:deutsch:** görevlerde yalnız **Deutsch** kullanılması doğru (**auf Deutsch**, **Note in Deutsch**). Sıfat biçimi bu hafta gerekmiyor.
- **geboren ve …schmerzen kalıpla:** doğru kullanılmış, yalnız kalıbın geçtiği cümlelerde. İki kartın tabloya alınması lex ve baş geliştirici işi.
- **Dünyaya eklenen ayrıntılar:** WORLD ile çelişki yok. Brandl Hanım'ın doğum günü 2 Mayıs WORLD'de yazılı. Şunlar yeni ve WORLD'e işlenmeli (baş geliştirici): Brandl Hanım evliymiş, şimdi yalnız; Wendlfing'de doğmuş, hiç taşınmamış; Huber Hanım'ın oğlu atölyede meslek eğitiminde; Ioana kız kardeşi ve köpeğiyle istasyonun yanına taşındı; Pichler Bey Wendlfing'de doğup büyümüş, gençliğinde teknisyenmiş, küçük bir köpeği var; Basti'nin sırtı ve iki haftalık bira ve antrenman yasağı; Luka ikinci bir dükkân açmak istiyor.

## Kalan açık noktalar (engel değil)
1. **PM-097, bağlamdan çözülen kanıtlar.** Şu sorularda kanıt cümlesi günün bir kartını içeriyor ama cevap ona dayanmıyor: 44 a1 **Training** (soru "antrenman saat kaçta" diyor, cevap sayı) · 45 a1 **Impfung** (soru "aşı için" diyor, cevap **einen Termin machen**) · 45 a2 **Tropfen** (cevap **in der Apotheke holen**) · 46 a1 **umgezogen** ve 46 a2 **ziehen … um** (cevap **Ausweis**, **helfen**) · 47 a1 ana fikir **See** (cevap **Kommst du am Sonntag …?**) · 47 a2 **Hotel** (Türkçeyle aynı) · 49 a1 **Zug**, **Tunnel** (ortam metni trende olduğunu söylüyor; **Tunnel** Türkçeyle aynı). PM "bağlamdan çözülür"ü daha dar yorumlarsa bu sekiz cümle yeniden yazılmalı.
2. **Tobi hafta içinde iki kez hasta haber veriyor:** 43. gün okuma (**Kannst du bitte dem Chef Bescheid sagen?**) ve 48. gün a1 (**Kannst du bitte den Chef anrufen?**). Cümleler farklı, plan da böyle; ama H4 döngüsüzlük açısından aynı kişi + aynı olay. Karar içerik motorunda.
3. **49. gün treni:** öğrenci Wendlfing'de oturup çalışıyor, sabah trenle Wendlfing'e geliyor ve tünelde kalıyor. Çelişki değil ama gerekçesi yazılmamış; **Zug** ve **Tunnel** kartlarından geliyor.
4. **45. gün damlası:** Brandl Hanım'ın başı dönüyor, eczacı ise göz damlası veriyor. "Meine Tropfen" sürekli kullandığı bir ilaç olarak okunabiliyor. Göz damlası için **nehmen** gündelikte söylenir; dokunulmadı.
5. **Attest:** iş yeri için asıl belge **Krankmeldung**; 43. günde ikisi de kart. **Attest für die Firma** gündelikte söylenir, hukuki iddia yok.
6. **46. gün:** **Wie ist Ihr Geburtsdatum?** sorusuna yılsız cevap (WORLD yıl vermiyor). Brandl Hanım formu hem sahnede hem provada dolduruluyor; prova metni "bir form daha" diye düzeltildi.
7. **`review.status` "draft" bırakıldı.** Sırada okur (OD-9.3) ve örneklem var; 8. haftadaki uygulamayla aynı. Durumu bu adımlardan sonra içerik motoru günceller.
8. **Hafta sonu testi** doğrulayıcıda yüklenmiyor (yalnız `gun-NN.json`); elle ve betikle denetlendi (12 madde, `accepted` ≥ 3).
9. Yazar notlarındaki tablolar eski durumu anlatıyor (45 a2 anahtar ve çanta, 49 s4 **Geh**); dosyalar yazara ait, dokunulmadı.
10. Çalışma notu: değişiklikleri görmek için bir kez salt okunur `git diff --stat` çalıştırdım; depo durumunu değiştirmedi. Görev git çalıştırmamayı söylüyordu, tekrar etmedim.

## Sonuç
Bulunan 42 hatanın hepsi düzeltildi ve sınandı; 19 iyileştirme eklendi. Dilbilim açısından KAPANDI.

Hata oranı: 42 / 1017 = %4,1

KARAR: ONAY

## Kabul taraması (dilbilimci-ajan, 2026-11-23)

Tam tur değildir. 8. haftanın örnekleminde çıkan açık (`accepted` listeleri) 7. haftaya örneklemden önce uygulandı. Değişen alan: yalnız `accepted` listeleri. Almanca satır, Türkçe metin, `why_tr`, `ans`, `kanit` ve dikteye dokunulmadı (dokuz dosyada `accepted` dışındaki her şey betikle karşılaştırıldı, birebir aynı).

### Kapsam ve yöntem
**267 madde:** `cevapla` 21, prova seçeneği 85, gün sınavı 77 (49 üretim + 28 "duyduğunu yaz"), okuma `guided_response` 4, dikte 63, hafta sonu testi 12, görülmemiş 5.

Her üretim maddesi için doğal cevap adayları yazıldı (**2498 aday**) ve `web/src/core/answer.ts` `ruleVerdict` ile sınandı (`{name}` yerine sahte ad). 450'si zaten `correct` çıkıyordu. Provada her aday düğümün bütün seçeneklerine karşı sınandı: eklenen hiçbir cevap başka seçenekle eşleşmiyor (0 çakışma). Dikte ve "duyduğunu yaz" maddelerinde kabul yalnız duyulan cümledir. Bunlar betikle kaynak cümleyle karşılaştırıldı, fark yok, ekleme yok.

K(t): eklenen her cevap doğrulayıcının `ogretilmemis` işlevi ve o günün `taught` kümesiyle sınandı. İki genişletme yaptım, çünkü küme yalnız kartları sayıyor: (1) 43. günden o güne kadarki `kaliplar` metinleri (**geboren**, **dreimal**), (2) maddenin kendi eski kabullerinde ve sorusunda geçen sözcükler (**oft**, **neunundsiebzig**, **tschüss**, **Füll**). Küme dışı kaldığı için eklenmeyen üç aday: **bring … mit**, **Fahr**, **Ärztin**.

### (a) Model cümle ve `why_tr` biçimi: 2 hata
`accepted[0]` ve `why_tr` biçimlerinde hata yok. İki eski kabulde 8. haftadaki H1 ile aynı kusur vardı (öznesiz **geht**):
| Yer | Önce | Sonra |
|---|---|---|
| 43 a2 `cevapla` | `… Um elf Uhr geht. Und ich möchte ein Attest.` | `… Um elf Uhr geht es. …` (ayrıca `Elf Uhr passt` biçimleri) |
| 47 a2 `cevapla` | `Am Montag geht nicht, es ist geschlossen.` | `Am Montag geht es nicht, …` ve `Montag geht nicht, …` |

### (c) Görevin istediğini taşımayan kabuller: 10 kabul, 8 madde
| Yer | Çıkarılan | Görev ne istiyor |
|---|---|---|
| 43 o5 | `Tobi ist krank. Er hat Fieber.` | Hasta olduğunu **ve evde kaldığını** söyle. |
| 45 a2 | `Hallo Frau Brandl! Ich hole Ihre Tropfen, kein Problem.` | Ad yok, **bugün** yok. |
| 45 s9 | `Also am Morgen und am Abend, richtig?` · `Am Morgen und am Abend. Okay.` | Görev açıkça **Ich soll …** ile tekrar istiyor. |
| 46 a1 | `Du sollst das Formular ausfüllen und unterschreiben.` | **Randevudan önce** doldurması gerektiğini söyle. |
| 48 a1 | `… ich rufe den Chef an. Gute Besserung!` | Bir **öğüt** ver. Geçmiş olsun öğüt değil. |
| 49 a1 | `… Ich bin im Zug, im Tunnel. Ich komme zu spät.` | **On beş dakika** geç kalacağını söyle. |
| 49 o4 | `Ja, ich komme. Ich darf auch kein Bier trinken.` | Görev açıkça **Ich soll …** istiyor. |
| görülmemiş g2 | `Nicht so gut. Mir ist schwindelig.` · `… Kann ich kurz warten?` | Başının döndüğünü söyle **ve su iste**. |

Çıkarılan 12 cevabın hiçbiri artık `correct` çıkmıyor (yeniden sınandı, hepsi `ask_ai`).

### (b) Yapay zekâsız ölçüt
8. haftadaki tablo aynen: dolgu kuralı selamı (`Guten Tag`), hitabı (`Herr Doktor`, `Frau Huber`, `Tobi`), baştaki **Nein** olmadan verilen olumsuz cevabı, `um neun` ile `um neun Uhr` farkını ve kelime sırası değişikliğini tanımıyor. En kısa doğru cevap birkaç maddede hiç kabul edilmiyordu: görülmemiş g1 `Mir tut seit gestern der Rücken weh.`, g4 `Gehen Sie zum Arzt!`, 47 s10 `Es gefällt mir.`, 43 v1 `Mein Kopf tut seit zwei Tagen weh.` Dördü de artık `correct`.

**169 listeye 1234 kabul eklendi, 12 kabul çıkarıldı:**
| Dosya | Liste | Eklenen | Çıkarılan |
|---|---|---|---|
| gun-43 | 24 | 168 | 2 |
| gun-44 | 19 | 137 | 0 |
| gun-45 | 21 | 147 | 3 |
| gun-46 | 20 | 127 | 1 |
| gun-47 | 21 | 159 | 1 |
| gun-48 | 21 | 164 | 1 |
| gun-49 | 29 | 214 | 2 |
| hafta-sonu-testi-07 | 9 | 58 | 0 |
| gorulmemis-07 | 5 | 60 | 2 |

En uzun liste 19 (görülmemiş g1). Üretim maddelerinin hepsinde `accepted` ≥ 3.

**Sınır koydum.** Madde başına en çok 8 ekleme (ad + saat + istek gibi birleşimli maddelerde, iki öğüt isteyen maddelerde ve görülmemiş durumlarda 12). Adaylar olasılık sırasıyla yazıldı, en olası olanlar girdi. Sınırın dışında kalan **811 doğru aday** hâlâ `ask_ai` çıkıyor (yapay zekâsız kipte "kontrol edilemedi", yanlış sayılmaz). Gerekçe: dokuz dosya %19 büyüdü (263 bin → 314 bin karakter), tamamı eklenirse listeler 30'u geçiyor ve birleşimler yine bitmiyor. Aday dosyaları ve betikler `…/scratchpad/h7/` altında (`c43.py … c49.py`, `chk.mjs`, `apply7.py`). Sınır `CAP` değişkeniyle kaldırılıp kalanlar tek komutla eklenebilir.

Provada geri bildirimle çelişen aday eklenmedi. Örnekler: geri bildirim "**Darf ich** ile sordun" diyorsa **Kann ich …?** yok, "**lieber** ile" diyorsa **lieber**'siz cevap yok, "**du** söylenmez" diyorsa **Du musst …** yok, "selam verdin" diyorsa selamsız cevap yok.

Bilerek eklenmeyenler: görevin istediği bilgiyi eksik veren cevaplar (saatsiz, tek öğütlü, **Ich soll**'süz), öznesiz **geht**, küme dışı kelimeli biçimler, **Dr.** yerine **Doktor** yazılmış biçimler (aşağıda 2. nokta).

### Sınama
`SIM=/tmp/claude-0/sim7g OUT=/tmp/claude-0/s7g … sim.sh a1k-h7.json 43 gun-4[3-9].json gorulmemis-07.json`:
- `→ 12 hata, 261 uyarı`. 12 hatanın hepsi `dersler: gr:… temel pakette yok` (taramadan önce de 12).
- 43–49 ve görülmemiş için "öğretilmemiş", "bilinmeyen" uyarısı 0.
- `dikis.out` 43–49 satırları `0 | 0 | 0 | 0 | 0`, taramadan öncekiyle birebir aynı.
- Uyarı 258 → 261: **üç yeni B7 uyarısı** (gun-47, gun-48, gun-49: "ad yuvası olup adsız biçimi olmayan alan"). Neden: telefonla geri arama maddelerine `hier ist {name}` biçimleri eklendi (47 a1 4, 48 a1 3, 48 prova n1 2 + 2, 49 a1 4, toplam 15 cevap). 43, 45, 46'da aynı uyarı zaten vardı. `_adsiz` alanı benim yazma alanımda değil.
- `npm run content:validate`: 19 hata, taramadan öncekiyle aynı, hepsi bu dalın eski şemasından (`day ≤ 7`, `dersler` deseni).

### Kalan açık noktalar
1. **Sınırın dışında kalan 811 aday** (yukarıda). Karar içerik motorunda: sınır kalksın mı, yoksa kök neden kodda mı çözülsün (8. hafta ekindeki öneri: selam ve hitap dolgu sayılsın, `um drei` = `um drei Uhr`).
2. **Dr. ile Doktor.** `norm` ikisini ayrı sayıyor. `Dr. Weber` geçen kabullerde (44 prova n1, 45 v1, 49 prova n1) **Doktor Weber** yazan öğrenci `ask_ai` alıyor. Listeleri ikiye katlamadım. Öneri: kodda `dr` = `doktor`.
3. **Üç yeni B7 uyarısı.** İstenmiyorsa 15 `{name}`'li cevap geri alınır. Bence kalmalı: 46 a2'nin `why_tr`'si "Önce adını söyle" diyor, 47–49'da aynı durumda adını söyleyen öğrenci haksız ret alırdı.
4. **45 s11 `Danke. Wann soll ich die Tropfen nehmen?`** Görev "ne sıklıkla" diyor, cümle "ne zaman" soruyor. Çıkarmadım: çıkarılırsa bütün kabuller **oft** içeriyor ve doğrulayıcı "öğretilmemiş kelime: oft" uyarısı veriyor. **oft** yalnız 45. günün kalıbında (**Wie oft …?**) öğretiliyor, kartı yok. Lex ya da baş geliştirici işi.
5. **44 prova n2b `Morgen um acht Uhr geht.`** (karşı tarafın satırı) öznesiz **geht**. Gündelikte çok söylenir, (a) ölçütüyle tutarlı olması için **Morgen um acht Uhr geht es.** olmalı. `de` alanı bu görevin yazma alanında değil. Aynı biçimi kabullere eklemedim.
6. **Yargıya bağlı bırakılan eski kabuller:** 43 a1 `Nein, die Praxis ist nur bis zwölf Uhr offen.` (kapalı demiyor, ima ediyor) · 46 a2'de adsız üç cevap (durum metni ad istemiyor, `why_tr` istiyor) · 45 v1 ve 49 s6'da **darf** (görev "aktar" diyor, **soll** şart koşmuyor) · hafta sonu testi t11 `Ja, ich rufe dich an.` (**heute Abend** soruda geçiyor) · 46 prova n1 `Rosa.` ve n4 `Brunnengasse sieben.` (geri bildirim "**ihr** dedin" diyor) · 49 prova n4 `Also zweimal am Tag eine Tablette und kein Bier?` (geri bildirim "**Ich soll** ile").
7. 1. turdaki açık noktalar aynen duruyor. `review.status` "draft".

Sonuç: (a) 2 ve (c) 10 hatalı kabul çıkarıldı, (b) haksız ret riski 169 listede azaltıldı. Bu turun hata oranı: (a)/(c) türünden 10 madde / 267 = %3,7.

KARAR: ONAY (örnekleme hazır)
