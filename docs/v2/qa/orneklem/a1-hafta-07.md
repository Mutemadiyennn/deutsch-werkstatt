# Örneklem kontrolü: A1 7. hafta (43.–49. gün, hafta sonu testi, görülmemiş durumlar, 12 dil noktası)

Tarih: 2026-11-23 · Yapan: qa-ajan · Hat: yazar → dilbilimci (ONAY, 42 hata + 19 iyileştirme; ek "Kabul taraması": 10 hatalı kabul çıktı, 1234 kabul eklendi) → okur (2. tur GEÇTİ) → **örneklem**
Dosyalar: `content/v2/m1/gun-43.json` … `gun-49.json`, `hafta-sonu-testi-07.json`, `gorulmemis-07.json`, `content/v2/registry/grammar.json` (12 kayıt: gr:a1-10:t1, 09:t2, 09:t3, 09:t4, 10:t4, 10:t2, 09:t5, 13:t4, 13:t5, 14:t1, 14:t2, 10:t3). Dal `content/a1-hafta-07`.

## Yöntem

**Evren: 657 madde.** Bir madde şunlardan biridir: görev cümlesi (Almanca, Türkçe, `accepted`), dikte basamağı, anlama sorusu (`ana_fikir`, `ayrinti`, `eylem`, halka sahne sorusu, okuma sorusu), `cevapla` (sahne, ses, okuma `guided_response`), prova seçeneği (geri bildirimiyle), gün sınavı maddesi, görsel, yazma görevi, hafta sonu testi maddesi, görülmemiş durum ya da dil noktası kaydı (açıklama ve tablo).
Dağılım: görev 174 · anlama 125 · dikte 105 · prova 85 · sınav 77 · görsel 34 · cevapla 25 · hafta sonu testi 12 · dil noktası 12 · görülmemiş 5 · yazma 3.

**Seçim (tekrarlanabilir):** Python `random.Random(2026112307)`. Her gün (43→49) için sırayla görev, dikte, anlama, cevapla, prova, sınav türlerinin her birinden 1 madde (`rnd.choice`), sonra o günün kalanından 2 madde (`rnd.sample`). Ardından hafta sonu testinden 4 (`rnd.sample`), görülmemiş durumlardan 2, dil noktalarından 4 (yukarıdaki kimlik sırasıyla verilen listeden `rnd.sample`). Madde listesi dosya içindeki sırayla kurulur: halkalar (görev cümleleri, sonra sahne sorusu) → sahne bölümleri (ana fikir, ayrıntı, dikte, cevapla) → sesler (aynı sıra, sonra eylem) → görsel → prova → okuma soruları → yazma → gün sınavı.
**Örneklem: 66 madde** (evrenin %10,0'u). Günlerden 8'er madde, hafta sonu testi 4, görülmemiş 2, dil noktası 4. Türler: görev 11 · dikte 10 · prova 10 · anlama 8 · cevapla 8 · sınav 8 · hafta sonu testi 4 · dil noktası 4 · görülmemiş 2 · görsel 1.

**Her maddede denetlenenler:** Almancanın doğruluğu ve doğallığı · Türkçenin doğruluğu ve OD-9'a uygunluğu (terim yok, İngilizce yok) · `ans` ve `kanit` (cümle kimliği; okumada 0'dan başlayan sıra) · ses sorularında kanıt cümlesinin yalnız önceki günlerin sözcükleriyle anlaşılması (PM-097 md. 1; ses durağı halkalardan önce çalar) · `accepted` içindeki her cevap doğru mu ve görevin istediği bilgiyi taşıyor mu · `why_tr`'nin tarif ettiği en kısa doğru cevap yapay zekâsız ölçütle `correct` çıkıyor mu · prova seçeneklerinin kabulleri başka seçenekle çakışıyor mu · tıbbi talimat zararsız ve gerçekçi mi · öğretilmemiş bir şey isteniyor mu.
Yapay zekâsız ölçüt: `web/src/core/answer.ts` `ruleVerdict` (Node 22, `--experimental-strip-types`, `{name}` yerine sahte ad). 31 maddede 83 aday cevap sınandı. Prova: örneklemdeki 10 düğümün her seçeneğinin bütün kabulleri öbür seçeneklere karşı sınandı, çakışma 0.

## Sınama (benzetim)

`mkdir -p /tmp/claude-0/s7q && SIM=/tmp/claude-0/sim7q OUT=/tmp/claude-0/s7q REPO=/home/claude/deutsch-werkstatt /tmp/claude-0/s/sim.sh /tmp/claude-0/s/a1k-h7.json 43 …/gun-4[3-9].json …/gorulmemis-07.json`

- `içerik v2: … → 12 hata, 261 uyarı`. 12 hatanın hepsi bilinen tür: `dersler: gr:… temel pakette yok` (benzetim şeması eski; 43: 1, 44: 2, 45: 2, 46: 2, 47: 2, 48: 3).
- 43.–49. gün ve görülmemiş için "öğretilmemiş", "bilinmeyen" ve `accepted` uyarısı 0. AK-3 sayacı: `43. gün 0/25, 44. gün 0/20, 45. gün 0/22, 46. gün 0/21, 47. gün 0/22, 48. gün 0/23, 49. gün 0/29`.
- Dosyalarda kalan uyarılar bu örneklemin kapsamı dışında: `yeni_kartlar: N kart (hedef 15–25)` (44–49), `gerçek insan videosu yok (PM-055)` (43–49), B7 `_adsiz` yuvası (43, 45–49; dilbilimci ekinin 3. açık noktası).
- `dikis.out`: 43–49 satırları `0 | 0 | 0 | 0 | 0`, ihlal yok.
- Not: `sim.sh` dikiş araçlarını almak için kendi içinde `git fetch` ve `git show` çalıştırıyor (çalışma ağacına dokunmuyor). Komutu görevde verildiği gibi koştum. Başka git komutu çalıştırmadım.

## Genel taramalar (bütün dosyalar)

- **Kişisel bilgi, kurs ya da kitap adı:** yok (telc, Goethe, DTZ, VHS, Volkshochschule, Integrationskurs, BAMF ve yaygın ders kitabı adları tarandı). Öğrenci satırlarında `{name}` kullanılmış. Sınav tarihi ya da kurum adı yok.
- **Bairisch:** yok. Yalnız 45. günün prova kabullerinde **Grüß Gott** var (bölgesel standart selam, 8. haftayla aynı).
- **İngilizce:** öğrencinin gördüğü Türkçe alanlarda yok. Yalnız görsel üretim tarifleri (`dogru_img`, `celdirici_img`) İngilizce, öğrenci görmez. Türkçe alanlardaki parantezler cinsiyet ayırımı içindir ("onun (kadın)"); okur GEÇTİ saymış.
- **Aynı Almanca cümle iki kez:** `de`, `prompt_de`, `audio_de`, `ornek_de` ve `metin_de` alanlarında tam dize tekrarı yok. Cümle düzeyinde (≥4 kelime) günler arası ortak parçalar: kalıp satırları (49. günün tekrar halkası haftanın kalıplarını topluyor, kasıtlı), iki kalıplaşmış soru (**Was fehlt Ihnen heute?**: 43 s11 ve hafta sonu testi t01; **Was soll ich machen?**: 46 a1, 48 v1 ve 48 okuma). İkisinde de durum ve beklenen cevap farklı (boğaz → iki bacak; form → öğüt). Gün içi ortaklar kasıtlı (`ornek_de` dinleneni özetliyor, prova dalları aynı satırda birleşiyor). Hata sayılmadı. Dilbilimcinin "tek eşleşme" notu bu iki kalıplaşmış soruyu saymamış.

## Seçilen maddeler ve sonuçlar

| # | Dosya · yol | Tür | Sonuç | Not |
|---|---|---|---|---|
| 1 | gun-43 · `halkalar[m1:43:h4].gorev_cumleleri[1]` (Ich bin krank. Die Krankmeldung kommt morgen.) | görev | GEÇTİ | |
| 2 | gun-43 · `sesler[m1:43:a1].bolumler[b1].dikte[d5]` | dikte (gerçek) | **HATA** | Aşağıda H1. |
| 3 | gun-43 · `sahne.bolumler[b1].ayrinti[0]` | anlama | GEÇTİ | `kanit` [s11] = `Seit Montag. Seit drei Tagen.` |
| 4 | gun-43 · `sahne.bolumler[b1].cevapla` | cevapla | GEÇTİ | 14 kabul doğru. `Seit zwei Tagen habe ich Kopfschmerzen.` sıra kuralıyla `correct`. Not: `Herr Doktor, mir tut …` `ask_ai` (hitap dolgu sayılmıyor, bilinen). |
| 5 | gun-43 · `prova.dugumler[n5].secenekler[2]` (Bis Freitag? Nein, ich muss arbeiten!) | prova | GEÇTİ | Uygunsuz seçenek; geri bildirim gerçekçi (raporla çalışılmaz). |
| 6 | gun-43 · `gun_sinavi[m1:43:s7]` (Acil servis nerede?) | sınav | GEÇTİ | |
| 7 | gun-43 · `okuma_yazma.sorular[m1:43:o5]` | cevapla | GEÇTİ | `Tobi ist krank.` tek başına `ask_ai` (doğru: evde kaldığı eksik). |
| 8 | gun-43 · `prova.dugumler[n2].secenekler[0]` (Seit gestern Abend, Herr Doktor.) | prova | GEÇTİ | `Gestern.` seçeneğiyle çakışma yok. |
| 9 | gun-44 · `halkalar[m1:44:h3].gorev_cumleleri[0]` (Ich möchte bitte bestellen.) | görev | **HATA** | Aşağıda H2. |
| 10 | gun-44 · `sahne.bolumler[b1].dikte[d4]` | dikte (usta) | GEÇTİ | s13 ile aynı. |
| 11 | gun-44 · `okuma_yazma.sorular[m1:44:o1]` | anlama | GEÇTİ | `kanit` [1, 2] doğru. |
| 12 | gun-44 · `okuma_yazma.sorular[m1:44:o5]` | cevapla | GEÇTİ | Not: `Nein, hier darf man nichts essen.` `ask_ai`. |
| 13 | gun-44 · `prova.dugumler[n1].secenekler[2]` (Ich will sofort zum Doktor!) | prova | GEÇTİ | Geri bildirim dil noktasıyla tutarlı. |
| 14 | gun-44 · `gun_sinavi[m1:44:s7]` (Bir kahve sipariş etmek istiyorum.) | sınav | GEÇTİ | Not: `Ich will einen Kaffee bestellen.` kabulde; Türkçe yönerge nötr, çeviri doğru. Aynı gün **Ich will** satıcıya "sert" diye öğretiliyor; `why_tr` bunu söylemiyor. |
| 15 | gun-44 · `sesler[m1:44:a2].bolumler[b1].dikte[d3]` | dikte (zor) | GEÇTİ | Banka çeldiricileri (müssen, nach) uygun. Tıbbi: tahlil öncesi yemek yok, su serbest; gerçekçi. |
| 16 | gun-44 · `prova.dugumler[n2].secenekler[0]` (Okay. Muss ich im Wartezimmer warten?) | prova | GEÇTİ | |
| 17 | gun-45 · `halkalar[m1:45:h1].gorev_cumleleri[10]` (Man muss nicht weit gehen, …) | görev | GEÇTİ | |
| 18 | gun-45 · `sesler[m1:45:a1].bolumler[b1].dikte[d5]` | dikte (gerçek) | GEÇTİ | Pazar kapalı çıkarımı c5'ten doğru. |
| 19 | gun-45 · `sesler[m1:45:a2].bolumler[b1].ayrinti[1]` | anlama | GEÇTİ | `kanit` [c5]; günün kartı yok (PM-097 uygun). |
| 20 | gun-45 · `sesler[m1:45:a2].bolumler[b1].cevapla` | cevapla | GEÇTİ | 16 kabul doğru. Not: `Guten Tag, hier ist {name}. Ich gehe heute in die Apotheke.` `ask_ai` (bilinen selam dolgusu). |
| 21 | gun-45 · `prova.dugumler[n1].secenekler[1]` | prova | GEÇTİ | |
| 22 | gun-45 · `gun_sinavi[m1:45:s6]` (Tableti günde iki kez …) | sınav | GEÇTİ | Doz genel, ilaç adı yok. |
| 23 | gun-45 · `gun_sinavi[m1:45:s1]` (Die Salbe ist für das Bein.) | sınav (dikte) | GEÇTİ | |
| 24 | gun-45 · `sesler[m1:45:a2].bolumler[b1].dikte[d1]` | dikte (kolay) | GEÇTİ | c2'de `schwindelig`; çeldiriciler c2'de yok. |
| 25 | gun-46 · `halkalar[m1:46:h2].gorev_cumleleri[8]` (Unser Sohn will nicht studieren.) | görev | GEÇTİ | |
| 26 | gun-46 · `sahne.bolumler[b1].dikte[d5]` | dikte (gerçek) | GEÇTİ | Not: örnekteki **Rosa** bu sahnede geçmiyor (45 a2'den biliniyor). Zorunlu sözcükler (Ihr, verheiratet) sahneden yazılabiliyor. |
| 27 | gun-46 · `halkalar[m1:46:h2].sahne.soru` | anlama | GEÇTİ | |
| 28 | gun-46 · `sesler[m1:46:a2].bolumler[b1].cevapla` | cevapla | GEÇTİ | 17 kabul doğru. Not: `Hier ist {name}. Am Samstag um neun komme ich.` ve `Hallo Ioana, ja, ich komme am Samstag um neun.` `ask_ai` (sıra ve `um neun` / `um neun Uhr`, bilinen). |
| 29 | gun-46 · `prova.dugumler[n2].secenekler[0]` (Ihr Geburtsdatum ist der zweite Mai.) | prova | GEÇTİ | |
| 30 | gun-46 · `gun_sinavi[m1:46:s11]` | sınav | GEÇTİ | Not: `Sie heißt Rosa. Sie ist am zweiten Mai geboren.` `ask_ai`. |
| 31 | gun-46 · `halkalar[m1:46:h1].gorev_cumleleri[4]` (Wo sind Sie aufgewachsen?) | görev | GEÇTİ | |
| 32 | gun-46 · `prova.dugumler[n4].secenekler[0]` | prova | GEÇTİ | `Sie wohnt Brunnengasse sieben.` adres dilinde doğal. |
| 33 | gun-47 · `halkalar[m1:47:h1].gorev_cumleleri[6]` (Das Kleid ist rot. Es steht dir gut.) | görev | GEÇTİ | |
| 34 | gun-47 · `sesler[m1:47:a1].bolumler[b1].dikte[d2]` | dikte (orta) | GEÇTİ | |
| 35 | gun-47 · `sesler[m1:47:a1].bolumler[b1].ayrinti[0]` | anlama | GEÇTİ | `kanit` [c2]. Cevap **Hotel**'e dayanıyor; günün kartı ama Türkçe "otel"le aynı. Sınırda; dilbilimci açık noktası 1 ile aynı tür, PM yorumuna bağlı. |
| 36 | gun-47 · `okuma_yazma.sorular[m1:47:o5]` | cevapla | GEÇTİ | `why_tr` biçimi `Samstag um drei passt mir.` → `correct`. |
| 37 | gun-47 · `prova.dugumler[n5].secenekler[0]` (Danke, Ioana! Das ist so lieb von dir.) | prova | GEÇTİ | |
| 38 | gun-47 · `gun_sinavi[m1:47:s7]` (Palto bana olmuyor. Çok küçük.) | sınav | GEÇTİ | Not: `Der Mantel ist mir zu klein.` `ask_ai`. |
| 39 | gun-47 · `halkalar[m1:47:h1].gorev_cumleleri[3]` (Deine Wohnung gefällt mir.) | görev | GEÇTİ | |
| 40 | gun-47 · `halkalar[m1:47:h2].gorev_cumleleri[0]` (Wie gefällt Ihnen das Hotel?) | görev | GEÇTİ | |
| 41 | gun-48 · `halkalar[m1:48:h2].gorev_cumleleri[2]` (Treffen wir uns am Freitag? …) | görev | GEÇTİ | |
| 42 | gun-48 · `sesler[m1:48:a1].bolumler[b1].dikte[d5]` | dikte (gerçek) | GEÇTİ | Dilbilimcinin eylem düzeltmesiyle tutarlı. |
| 43 | gun-48 · `sahne.bolumler[b1].ayrinti[2]` | anlama | GEÇTİ | `kanit` [s7] doğru. |
| 44 | gun-48 · `sesler[m1:48:a2].bolumler[b1].cevapla` | cevapla | GEÇTİ | `22 Uhr` rakamla da `correct`. |
| 45 | gun-48 · `prova.dugumler[n4].secenekler[2]` (Geh doch in den Supermarkt!) | prova | GEÇTİ | Geri bildirim gerçekçi (ateşli hasta dışarı çıkmaz). |
| 46 | gun-48 · `gun_sinavi[m1:48:s3]` (Wir treffen uns ohne dich.) | sınav (dikte) | GEÇTİ | |
| 47 | gun-48 · `halkalar[m1:48:h2].gorev_cumleleri[5]` (Ich muss ihn siezen, …) | görev | GEÇTİ | |
| 48 | gun-48 · `sesler[m1:48:a1].eylem` | anlama | GEÇTİ | `kanit` [c2, c3]; günün kartı yok. |
| 49 | gun-49 · `halkalar[m1:49:h1].gorev_cumleleri[5]` (Trink kein Bier, du bist krank!) | görev | GEÇTİ | |
| 50 | gun-49 · `sahne.bolumler[b1].dikte[d4]` | dikte (usta) | GEÇTİ | s6 ile aynı. |
| 51 | gun-49 · `okuma_yazma.sorular[m1:49:o1]` | anlama | GEÇTİ | `kanit` [3, 5, 6] doğru. |
| 52 | gun-49 · `okuma_yazma.sorular[m1:49:o4]` | cevapla | GEÇTİ | Provada doktor öğrenciye de "iki hafta bira yok" diyor; kabuller tutarlı. `Ja, ich komme.` tek başına `ask_ai` (doğru). |
| 53 | gun-49 · `prova.dugumler[n2b].secenekler[0]` (Seit zwei Tagen, Herr Doktor.) | prova | GEÇTİ | `Zwei Tage.` seçeneğiyle çakışma yok. |
| 54 | gun-49 · `gun_sinavi[m1:49:s3]` (Ihr Blutdruck ist wieder gut.) | sınav (dikte) | GEÇTİ | |
| 55 | gun-49 · `gorsel[m1:49:g4]` (Tunnel) | görsel | GEÇTİ | Çeldiriciler ayırt edilebilir. |
| 56 | gun-49 · `sesler[m1:49:a2].bolumler[b1].dikte[d1]` | dikte (kolay) | GEÇTİ | c5'te `Bier`. |
| 57 | hafta-sonu-testi-07 · `maddeler[m1:49:t09]` (Tobi'ye iki öğüt) | hafta sonu | GEÇTİ | Öğütler zararsız. Not: `Trink viel Tee und bleib zu Hause!` `ask_ai`. |
| 58 | hafta-sonu-testi-07 · `maddeler[m1:49:t11]` | hafta sonu | GEÇTİ | Not: `Ja, ich rufe dich an.` `correct`, yönerge "bu akşam" diyor. Hata sayılmadı: saat soruda geçiyor, `why_tr`'nin öğrettiği iki nokta (**dich**, sondaki **an**) cevapta var. Dilbilimcinin "yargıya bağlı" listesinde. |
| 59 | hafta-sonu-testi-07 · `maddeler[m1:49:t02]` (gap: müssen) | hafta sonu | GEÇTİ | `dürfen` → `wrong`. |
| 60 | hafta-sonu-testi-07 · `maddeler[m1:49:t03]` (order: ohne dich) | hafta sonu | GEÇTİ | `Ich gehe ohne dich nicht.` vurgulu ama doğru. |
| 61 | gorulmemis-07 · `durumlar[m1:h07:g1]` | görülmemiş | GEÇTİ | En kısa doğru cevap `correct`. `Mir tut der Rücken weh.` (süre yok) `ask_ai`, doğru. |
| 62 | gorulmemis-07 · `durumlar[m1:h07:g3]` | görülmemiş | GEÇTİ | `why_tr`'deki kısaltma `Also zwei Tropfen?` `ask_ai`; görev saatleri de istediği için doğru. Tam biçim `correct`. |
| 63 | grammar.json · `gr:a1-09:t3` | dil noktası | GEÇTİ | Tablo doğru; **Ich will** uyarısı yerinde, İngilizce yok. |
| 64 | grammar.json · `gr:a1-14:t2` | dil noktası | GEÇTİ | Kural, tablo ve örnekler tutarlı. |
| 65 | grammar.json · `gr:a1-09:t2` | dil noktası | GEÇTİ | Not: örnek `Im Bürgeramt …` Türkçesinde "Bürgeramt'ta" çevrilmeden kalmış (kurum adı gibi okunuyor). |
| 66 | grammar.json · `gr:a1-10:t1` | dil noktası | GEÇTİ | Not: tabloda **die Füße** satırı 1. yolda "–"; **Fußschmerzen** de söylenir. Sadeleştirme, hata değil. |

## Hatalar

### H1 · gun-43 · `sesler[m1:43:a1].bolumler[b1].dikte[d5].ornek_de` (muayenehanenin telefon kaydı)
- **Ne:** Görev "Kayıtta ne dendi?" diyor, örnek cevap `Heute ist die Praxis bis zwölf Uhr offen. Am Nachmittag gehe ich in die Notaufnahme.` Kayıtta böyle bir şey yok. Kayıt "öğleden sonra kapalı, **acil ise** acil servise gidin, yarın sekizden itibaren buradayız" diyor (c3–c5). Örnek, acil olmayan bir durumda öğleden sonra acil servise gitmeyi gösteriyor. Bu hem kaydı yanlış aktarıyor hem aynı sesin `eylem` sorusuyla çelişiyor ("Saat üçte … Acil değil" → "Yarın saat sekizden sonra git"). Gerçekte de yanlış davranış (acil servis acil olmayan şikâyet için değil). Kaynağı: dilbilimci `eylem`i PM-097 için acil durumdan acil olmayana çevirdi (1. tur 2. madde). Bu örnek eski senaryoda kaldı. Aynı türden kalıntı 45 a2, 47 a1 ve 48 a1'de yok (dördünün `d5` örneği tek tek karşılaştırıldı).
- **Öneri:** `Die Praxis ist heute bis zwölf Uhr offen. Ist es dringend, gehe ich in die Notaufnahme.` (zorunlu **offen**, **Notaufnahme** kalır; sözcüklerin hepsi kayıtta var). Daha sade bir seçenek: `Die Praxis ist heute bis zwölf Uhr offen. Am Nachmittag ist sie geschlossen.` Bu seçilirse `zorunlu` → `["offen", "geschlossen"]`. İkisi de benzetimle yeniden sınanmalı.

### H2 · gun-44 · `halkalar[m1:44:h3].gorev_cumleleri[0].accepted[2]`
- **Ne:** Görev cümlesi `Ich möchte bitte bestellen.` ("Sipariş vermek istiyorum, lütfen."), kabulde `Wir möchten bitte bestellen.` var. Türkçesi açıkça tekil (istiyorum). Kişi değiştiği hâlde cevap `correct/exact`. Akışta görev cümlesinin kabulleri "Duyduğunu yaz" adımında da kullanılıyor (`web/src/screens/Akis.tsx:233`, `accepted: [g.de, ...g.accepted]` → `UretAdimi` `kip: "duy"`). Öğrenci **Ich möchte** duyup **Wir möchten** yazınca da doğru sayılıyor. Haftanın bütün görev cümlelerinde kişi zamiri değişen başka kabul yok (174 cümle betikle tarandı. Kalan farklar **Mir tut / Mein … tut** gibi aynı anlamlı biçimler).
- **Öneri:** `Wir möchten bitte bestellen.` çıkarılsın, yerine `Ich möchte gern bestellen.` gelsin (şu an `ask_ai`).

## Hata sayılmayan notlar (iyileştirme)
- Haksız ret riski (yapay zekâsız kipte "kontrol edilemedi", D-097'ye göre doğru sayılmaz). Doğru ama `ask_ai` çıkan adaylar: 43 v1 `Herr Doktor, mir tut seit zwei Tagen der Kopf weh.` · 44 o5 `Nein, hier darf man nichts essen.` · 45 a2 `Guten Tag, hier ist {name}. Ich gehe heute in die Apotheke.` · 46 a2 `Hier ist {name}. Am Samstag um neun komme ich.` · 46 s11 `Sie heißt Rosa. Sie ist am zweiten Mai geboren.` · 47 s7 `Der Mantel ist mir zu klein.` · 47 h1[3] `Mir gefällt deine Wohnung gut.` · t09 `Trink viel Tee und bleib zu Hause!`. Çoğu dilbilimci ekindeki bilinen kod kök nedenleri (selam ve hitap dolgu sayılmıyor, `um neun` ≠ `um neun Uhr`, sıra). Örneklemde `why_tr`'nin tarif ettiği en kısa doğru cevap her maddede `correct` (62'deki eksik kısaltma hariç; o `ask_ai` çıkıyor ve öyle kalmalı).
- 44 s7: `Ich will einen Kaffee bestellen.` kabulde. Çeviri doğru ama günün dersi **Ich will**'i satıcıya sert sayıyor. `why_tr`'ye "**Ich will** de doğru ama sert duyulur" eklenebilir.
- 46 v1 d5: örnek cevaptaki **Rosa** bu sahnede geçmiyor.
- 47 a1 ayrıntı 1: kanıt günün kartı **Hotel**'e dayanıyor (Türkçeyle aynı). PM-097'nin dar yorumunda yeniden yazılmalı (dilbilimci açık noktası 1).
- t11: yönerge "bu akşam arayacağını söyle" diyor, `Ja, ich rufe dich an.` kabul. Yönerge "Evet de, onu arayacağını söyle" yapılırsa tutarsızlık kalkar.
- gr:a1-09:t2 örnek Türkçesi "Bürgeramt'ta" → "belediyenin vatandaş bürosunda" gibi bir karşılık.

## Uygulama kodu için bulgu (içerik hatası değil; baş geliştiriciye)
- `web/src/screens/Akis.tsx:233` görev cümlesinin bütün kabullerini (`[g.de, ...g.accepted]`) akıştaki dikte adımına da veriyor (`UretAdimi kip="duy"`, `ui/soru/AkisAdim.tsx:41`). FORMAT.md'ye göre dikte kabulü yalnız duyulan cümlenin yazımlarıdır. Şimdiki durumda sırası değişmiş kabuller (ör. 45 h1[10] `Die Apotheke ist in der Nähe, man muss nicht weit gehen.`) "Duyduğunu yaz"da da doğru sayılıyor. Öneri: `kip === "duy"` iken `accepted` yalnız `[g.de]`.

## Oran ve karar

Hata: **2 / 66 = %3,0** (eşik %2).
Türler: biri dilbilimci düzeltmesinden kalan anlam ve gerçeklik hatası (H1: örnek cevap kaydı yanlış aktarıyor, acil olmayan durumda acil servisi gösteriyor), biri haksız kabul (H2: kişi değişiyor). Almanca satırlar, Türkçe metinler, `ans` ve `kanit`, dikte merdivenleri, prova geri bildirimleri, dil noktası kayıtları ve görülmemiş durumlarda örneklemde başka hata çıkmadı. Kabul taraması 8. haftadaki türü (öznesiz **geht**, eksik bilgili kabul, `why_tr` biçiminin reddi) bu haftada örneklem düzeyinde kapatmış.

**Öneri: dilbilimciye geri (dar kapsam).** Tam tur gerekmez. (1) H1 ve H2 düzeltilsin. (2) Dilbilimcinin 1. turda içeriğini değiştirdiği her soru ya da cümlenin (43 a1 ×2, 45 a2 c5, 47 a1, 48 a1, 45 v1 s16, 49 s4, 47 h2 sahne) aynı ses ya da sahnedeki `ornek_de`, `cevapla`, `golge` ve `dikte` öğeleriyle tutarlılığına bakılsın (dört `d5` örneği burada karşılaştırıldı, yalnız 43 a1 kalıntı). (3) Ardından benzetim yeniden koşulsun. Düzeltmeden sonra yeni örneklem gerekmez; iki maddenin doğrulanması yeter.

ÖRNEKLEM: GERİ — 2/66
