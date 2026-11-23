# İÇ-4 · A1 3. hafta (15.–21. gün): örneklem kontrolü

Yapan: qa-ajan · 2026-11-23 · hat: yazar → dilbilimci (`docs/v2/reviews/ic4-hafta-03.md`, ONAY) → okur (`docs/v2/reviews/okur/ic4-hafta-03.md`) → **örneklem**

## Kapsam ve dosya parmak izleri
`content/v2/m1/` altında (md5, ilk 8 hane):

| dosya | md5 |
|---|---|
| gun-15.json | 6e4f0db1 |
| gun-16.json | 913bd0a3 |
| gun-17.json | 7e077bb6 |
| gun-18.json | f9f1fd5b |
| gun-19.json | fb14ac26 |
| gun-20.json | d036895a |
| gun-21.json | a2899a22 |
| hafta-sonu-testi-03.json | 84408b96 |
| gorulmemis-03.json | 8e92a015 |

## Yöntem
- **Tohum: `20261123`**, Python `random.Random`. Tamamlama çekilişi için tohum + 1 (`20261124`).
- Dokuz dosya 16 katmana ayrıldı. Toplam **1034 madde** var. Madde birimleri şunlar: halka görev cümlesi (Almancası, Türkçesi ve `accepted` birlikte), halka kalıbı, halka sahne satırı, sahne ve ses satırı (Almancası ve çevirisi), soru (ana fikir, ayrıntı, `eylem`, halka sahne sorusu ve kanıtı), dikte basamağı, `cevapla`, görsel, prova düğümü, prova seçeneği (`accepted` ve geri bildirim), okuma metni, okuma sorusu, yazma görevi, gün sınavı maddesi, hafta testi maddesi, görülmemiş durum.
- Hedef: max(60, ⌈%10 × 1034⌉) = 104. Her katmandan orana göre pay alındı. 12 ya da daha az maddesi olan katmandan en az 3 madde seçildi. Ana çekiliş **118** madde verdi.
- **Tamamlama:** Ana çekilişte hiç çıkmayan alt türler için ayrı çekiliş yapıldı. Bu alt türler: dikte `kolay` ile hafta testindeki `gap`, `order`, `transform` ve `tr_de`. Her birinden alt türün %10'u alındı, en az 1. Bu çekiliş **7** madde ekledi.
- **Örneklem: 125 madde (%12,1).** Betik aşağıda. Aynı dosyalarla çalıştırınca aynı listeyi verir.
- Her maddeye bağımsız bakıldı. Bakılanlar şunlar:
  - Almancası doğru ve doğal mı?
  - Türkçe çeviri doğru mu?
  - `accepted` listesindeki her cevap doğru ve anlamca uygun mu (≥3)?
  - Sorunun tek doğru cevabı var mı? `kanit` cümlesi (okumada cümle sırası) bu cevabı destekliyor mu?
  - Dikte kuralları (FORMAT "Pilotun netleştirdikleri") tutuyor mu? `kolay` basamağında doğru seçenek cümlede geçmeli, çeldiriciler geçmemeli. `orta` tek kelime ister. `zor` basamağının `banka` alanında cevabın kelimeleri ve en az 2 çeldirici bulunmalı. Aynı metnin en az 3 yazımı kabul edilmeli. Yazdırılan cümle sözlükteki örnek cümlelerden gelmemeli (7452 örnek cümleyle karşılaştırıldı, eşleşme yok).
  - OD-9: Açıklama alanları (`why_tr`, `geri_bildirim_tr`, `kontrol_tr`, `instr_tr`) en çok 14 kelime ve tek fikir mi? `=`, `;`, `…` ve tırnak kullanılmamış olmalı. Terim kullanılmamalı. Bu madde betikle ve gözle denetlendi.
  - Öğrenci adı yalnızca `{name}` ile mi geçiyor? Bairisch, kişisel bilgi ve İngilizce köprü var mı?
  - Tarih–gün tutarlılığı (takvimle hesaplandı): 4.12.2026 cuma, 10.12 perşembe, 14.12 pazartesi, 15.12 salı, 16.12 çarşamba, 17.12 perşembe, 18.12 cuma, 24.12 perşembe, 6.12 pazar ve 4.1.2027 pazartesi. Hepsi metinlerle tutarlı.
  - Maddenin günün akışıyla (sahne → sesler → prova → okuma/yazma) çelişip çelişmediği.

## Sonuç
| | sayı |
|---|---:|
| İncelenen madde | 125 |
| HATA | 3 |
| **Hata oranı** | **%2,4** |

**KARAR: dilbilimciye geri** (eşik %2). Geri dönüşün kapsamı aşağıda dar tutuldu: 18. günün akış tutarlılığı, `gorulmemis-03` g1, halka görev cümlelerinde anlam ekleyen kabuller.

## Hatalı maddeler
| # | kimlik | sınıf | neden | önerilen düzeltme |
|---|---|---|---|---|
| 1 | `m1:18:yazma` | P1 (akış çelişkisi) | Yazma görevi şunu diyor: "Senin de Luka'da randevun var: cuma günü saat dörtte." Örnek cevap da **Er ist am Freitag um vier.** diyor. Oysa aynı günün akışında bu randevu geçersiz kılınıyor: sahnede Luka cuma yalnız **von neun bis zwölf** orada (s6). `a2` sesli mesajı cuma dört randevusunu iptal ediyor (**geht leider nicht**). Prova cumartesi saat onda bitiyor (n4–n6). Okuma/yazma günün son durağı (Seans 4, provadan sonra). Öğrenci az önce iptal edilen randevuyu yazmaya zorlanıyor. Dilbilimcinin #4 ve #8 bulgularıyla aynı sınıf. | `gorev_tr`: **Senin de Luka'da randevun var: cumartesi saat onda.** · `ornek_de`: `Hallo Ioana! Ja, ich habe auch einen Termin bei Luka. Er ist am Samstag um zehn. Bis Montag im Kurs!` · `zorunlu`: `["Samstag", "um"]`. Kalıplar değişmeden kalabilir. |
| 2 | `m1:h03:g1` | P2 (kabul, can_do) | Durum "cumartesi açık mı diye sor" diyor. can_do `cd:m1:15` "Evet ya da hayır sorusu sorar". `why_tr` de "**Haben Sie** ile evet ya da hayır sorusu" diyor. Buna rağmen listede bir W-sorusu kabul ediliyor: **Guten Tag, hier ist {name}. Wann haben Sie am Samstag offen?** Bu soru açık olduğunu varsayıyor ve sınanan becerini göstermiyor. | Bu kabulü silmek ya da `Hallo, hier ist {name}. Haben Sie am Samstag offen?` ile değiştirmek. Liste 7'den 6'ya inse de ≥3 kuralı tutar. |
| 3 | `m1:17:h3:g9` | P2 (kabul anlamı) | `tr` **Cumartesi alışverişe gidiyorum.** (bu cumartesi). Kabul edilen **Am Samstag gehe ich immer einkaufen.** "her cumartesi, hep" anlamını ekliyor. Dilbilimcinin 19. gün s8 bulgusuyla (**nie mehr**) aynı sınıf. Bu liste halkada üç yerde kullanılıyor: TR→DE, "Sen söyle" ve "Duyduğunu yaz". Bu yüzden ekleme dikte puanlamasına da giriyor (aşağıda U-1). | **immer** kabulünü silmek, yerine `Samstag gehe ich einkaufen.` (konuşmada **am** düşer) koymak. |

## Madde madde
Sıra çekiliş sırasıdır. 119–125 tamamlama çekilişinden.

| # | kimlik | tür | sonuç | not |
|---:|---|---|---|---|
| 1 | m1:21:v1:c1 | cevapla | GEÇTİ | 6 kabul doğru. Bazı kabuller günü söylemiyor; `why_tr` "sonra günü söyle" diyor, yine de kabul edilebilir. Öğrencinin babası: dilbilimcinin açık şüphesi 2 (PM). |
| 2 | m1:20:v1:c1 | cevapla | GEÇTİ | 9 kabul. **Donnerstag, dem zehnten** takvimle tutuyor. |
| 3 | m1:16:a2:c1 | cevapla | GEÇTİ | Fiyat ve **Ja** kabulleri doğru. |
| 4 | m1:16:a1:b1:d3 | dikte zor | GEÇTİ | Bankada 5 cevap kelimesi ve 2 çeldirici (**und**, **D**) var. 3 yazım. |
| 5 | m1:21:a2:b1:d5 | dikte gerçek | GEÇTİ | Örnekte iki zorunlu kelime de (**Vater**, **sechs**) var. |
| 6 | m1:19:a2:b1:d2 | dikte orta | GEÇTİ | Tek kelime, 3 yazım. |
| 7 | m1:15:a2:b1:d2 | dikte orta | GEÇTİ | Tek kelime, 3 yazım. |
| 8 | m1:19:a1:b1:d5 | dikte gerçek | GEÇTİ | Örnek c3 ile aynı anlamda, zorunlular var. |
| 9 | m1:18:v1:b1:d4 | dikte usta | GEÇTİ | s14b tek cümle (dilbilimci bölmesi doğru). |
| 10 | m1:18:v1:b1:d5 | dikte gerçek | GEÇTİ | Pazartesi iki buçuk sahneyle tutarlı. |
| 11 | m1:21:v1:b1:d5 | dikte gerçek | GEÇTİ | Zorunlular var. |
| 12 | m1:16:a1:b1:d4 | dikte usta | GEÇTİ | Tek cümle. |
| 13 | m1:15:v1:b1:d4 | dikte usta | GEÇTİ | Tek cümle. |
| 14 | m1:20:a1:b1:d4 | dikte usta | GEÇTİ | Tek cümle. |
| 15 | m1:15:g5 | görsel | GEÇTİ | Çeldiriciler ayrışıyor. |
| 16 | m1:16:g2 | görsel | GEÇTİ | Kısa mont çeldiricisi yakın ama boyundan ayrılıyor. |
| 17 | m1:19:g6 | görsel | GEÇTİ | |
| 18 | m1:18:g2 | görsel | GEÇTİ | 5:30 çeldiricisi **halb** yanılgısını sınıyor. |
| 19 | m1:h03:g6 | görülmemiş | GEÇTİ | **sie fährt** doğru. **nie mit dem Bus** durumdan çıkarım, kabul edilebilir. |
| 20 | m1:h03:g1 | görülmemiş | **HATA** | Yukarıda 2. madde. |
| 21 | m1:h03:g7 | görülmemiş | GEÇTİ | can_do `cd:m1:21` gün ve saati istiyor; tarihsiz kabuller bunu karşılıyor. 18.12 cuma. |
| 22 | m1:18:s4 | sınav dikte | GEÇTİ | `dikte` listesinde, `sesli` listesinde değil. 3 yazım. `why_tr` OD-9'a uygun. |
| 23 | m1:18:s11 | sınav mini prova | GEÇTİ | 10 kabul, `{name}` doğru. |
| 24 | m1:20:s5 | sınav tr_de | GEÇTİ | **der elfte** ve **den elften** doğru. |
| 25 | m1:18:s9 | sınav sesli | GEÇTİ | **Warteschleife** kartı yok (dilbilimcinin şüphesi 9, lex işi). |
| 26 | m1:15:s6 | sınav tr_de | GEÇTİ | |
| 27 | m1:15:s8 | sınav tr_de | GEÇTİ | |
| 28 | m1:18:s2 | sınav dikte | GEÇTİ | |
| 29 | m1:15:s7 | sınav tr_de | GEÇTİ | **Rückenschmerzen** kabulü doğru. |
| 30 | m1:21:t08 | hafta testi guided | GEÇTİ | |
| 31 | m1:21:t10 | hafta testi dinleme | GEÇTİ | Tek doğru gün ve saat. |
| 32 | m1:21:t04 | hafta testi dinleme | GEÇTİ | P3 not: **Wo wohnen Sie? Wie schreibt man das?** sesinde **das**, henüz söylenmemiş adresi gösteriyor. Anlamı bozmuyor. |
| 33 | m1:16:h2:g5 | halka görev | GEÇTİ | |
| 34 | m1:19:h1:g4 | halka görev | GEÇTİ | **Am Freitag reden wir?** düz sıralı soru. Konuşmada kullanılır. |
| 35 | m1:20:h2:g2 | halka görev | GEÇTİ | |
| 36 | m1:15:h4:g3 | halka görev | GEÇTİ | **heute** eklemesi Türkçedeki şimdiki zamanla uyumlu. |
| 37 | m1:20:h3:g7 | halka görev | GEÇTİ | |
| 38 | m1:17:h2:g7 | halka görev | GEÇTİ | **daheim** güney standart Almancası, lehçe değil. |
| 39 | m1:18:h1:g8 | halka görev | GEÇTİ | |
| 40 | m1:18:h1:g7 | halka görev | GEÇTİ | |
| 41 | m1:19:h2:g4 | halka görev | GEÇTİ | |
| 42 | m1:17:h3:g9 | halka görev | **HATA** | Yukarıda 3. madde. |
| 43 | m1:20:h2:g1 | halka görev | GEÇTİ | |
| 44 | m1:21:h1:g2 | halka görev | GEÇTİ | |
| 45 | m1:18:h2:g2 | halka görev | GEÇTİ | |
| 46 | m1:18:h1:g4 | halka görev | GEÇTİ | |
| 47 | m1:15:h2:g4 | halka görev | GEÇTİ | |
| 48 | m1:19:h2:g9 | halka görev | GEÇTİ | **auch** teklif cümlesinde hafif; bkz. ek tarama. |
| 49 | m1:19:h2:g3 | halka görev | GEÇTİ | |
| 50 | m1:17:h1:g2 | halka görev | GEÇTİ | `{name}` doğru. |
| 51 | m1:19:h1:k2 | kalıp | GEÇTİ | |
| 52 | m1:19:h1:k1 | kalıp | GEÇTİ | |
| 53 | m1:16:h2:k1 | kalıp | GEÇTİ | **…** kalıp yuvası, açıklama değil. |
| 54 | m1:15:h4:k1 | kalıp | GEÇTİ | |
| 55 | m1:19:h1:k5 | kalıp | GEÇTİ | **jeder** ile **herkes**, **jeden Tag** ile **her gün** doğru eşleşiyor. |
| 56 | m1:19:h2:k1 | kalıp | GEÇTİ | |
| 57 | m1:17:h3:k1 | kalıp | GEÇTİ | |
| 58 | m1:18:h1:sahne:2 | halka sahne | GEÇTİ | **Bei Luka** için **Luka'yı arıyorum** serbest ama doğru bir çeviri. |
| 59 | m1:20:h1:sahne:1 | halka sahne | GEÇTİ | |
| 60 | m1:20:h3:sahne:2 | halka sahne | GEÇTİ | |
| 61 | m1:20:h1:sahne:3 | halka sahne | GEÇTİ | |
| 62 | m1:16:h1:sahne:3 | halka sahne | GEÇTİ | |
| 63 | m1:16:h2:sahne:3 | halka sahne | GEÇTİ | |
| 64 | m1:15:okuma:metin | okuma metni | GEÇTİ | |
| 65 | m1:19:okuma:metin | okuma metni | GEÇTİ | |
| 66 | m1:20:okuma:metin | okuma metni | GEÇTİ | 15.12 salı. "Dr." düzeltmesinden sonra cümle sırası doğru. |
| 67 | m1:20:o2 | okuma sorusu | GEÇTİ | Kanıt 2 doğru cümleyi gösteriyor. |
| 68 | m1:19:o2 | okuma sorusu | GEÇTİ | Kanıt 3 doğru. |
| 69 | m1:21:o2 | okuma sorusu | GEÇTİ | Kanıt 0 doğru. Çeldiricilerin günleri de takvimle tutuyor. |
| 70 | m1:19:p1:n5 | prova düğümü | GEÇTİ | P3 not: **Und siehst du?** yerine **Siehst du?** daha doğal. |
| 71 | m1:20:p1:n6 | prova düğümü | GEÇTİ | |
| 72 | m1:17:p1:n5 | prova düğümü | GEÇTİ | **dahili numara** tutarlı. |
| 73 | m1:21:p1:n4 | prova düğümü | GEÇTİ | |
| 74 | m1:16:p1:n4 | prova düğümü | GEÇTİ | |
| 75 | m1:16:p1:n5 | prova düğümü | GEÇTİ | |
| 76 | m1:20:p1:n4:o1 | prova seçeneği | GEÇTİ | |
| 77 | m1:21:p1:n2:o2 | prova seçeneği | GEÇTİ | Uygun değil işareti doğru, geri bildirim doğru yöne çeviriyor. |
| 78 | m1:19:p1:n2:o3 | prova seçeneği | GEÇTİ | Bilinçli yanlış biçim (dilbilimcinin açık şüphesi 7, PM). |
| 79 | m1:19:p1:n1:o3 | prova seçeneği | GEÇTİ | Aynı durum. |
| 80 | m1:20:p1:n1:o2 | prova seçeneği | GEÇTİ | |
| 81 | m1:21:p1:n3:o1 | prova seçeneği | GEÇTİ | **nicht Patient bei Ihnen** kabul edilebilir. |
| 82 | m1:21:p1:n1:o2 | prova seçeneği | GEÇTİ | |
| 83 | m1:20:p1:n4:o2 | prova seçeneği | GEÇTİ | |
| 84 | m1:16:p1:n3:o2 | prova seçeneği | GEÇTİ | Brunnengasse 7, WORLD (`pl:haus`) ile aynı. |
| 85 | m1:18:p1:n4:o2 | prova seçeneği | GEÇTİ | |
| 86 | m1:21:p1:n5:o1 | prova seçeneği | GEÇTİ | 16.12 çarşamba. |
| 87 | m1:15:v1:s8 | sahne satırı | GEÇTİ | |
| 88 | m1:16:v1:s5 | sahne satırı | GEÇTİ | Geleneksel heceleme tablosu doğru. |
| 89 | m1:17:v1:s11 | sahne satırı | GEÇTİ | |
| 90 | m1:21:v1:s8 | sahne satırı | GEÇTİ | |
| 91 | m1:16:v1:s4 | sahne satırı | GEÇTİ | |
| 92 | m1:21:v1:s14 | sahne satırı | GEÇTİ | |
| 93 | m1:19:v1:s1 | sahne satırı | GEÇTİ | |
| 94 | m1:19:a2:c5 | ses satırı | GEÇTİ | |
| 95 | m1:17:v1:s6 | sahne satırı | GEÇTİ | P3 not: `sahne_tr` "Ioana kimliğini havaya kaldırıyor", ama Ioana **Ich brauche einen Ausweis** diyor. **eski kimliğini** denirse çizim çelişmez. |
| 96 | m1:18:v1:s6 | sahne satırı | GEÇTİ | |
| 97 | m1:16:v1:s14 | sahne satırı | GEÇTİ | |
| 98 | m1:21:a1:c1 | ses satırı | GEÇTİ | |
| 99 | m1:21:v1:s15 | sahne satırı | GEÇTİ | |
| 100 | m1:20:a2:c3 | ses satırı | GEÇTİ | 4.1.2027 pazartesi. |
| 101 | m1:17:a2:c1 | ses satırı | GEÇTİ | |
| 102 | m1:17:v1:s9 | sahne satırı | GEÇTİ | **langsam** A1 için kabul edilebilir (karşılaştırma öğretilmedi). |
| 103 | m1:19:a2:c2 | ses satırı | GEÇTİ | |
| 104 | m1:18:v1:s5 | sahne satırı | GEÇTİ | |
| 105 | m1:18:a2:c1 | ses satırı | GEÇTİ | |
| 106 | m1:16:a1:c4 | ses satırı | GEÇTİ | |
| 107 | m1:20:h1:sahne:soru | soru | GEÇTİ | Tek cevaplı. |
| 108 | m1:18:a2:e1 | eylem | GEÇTİ | Kanıt c2, c4, c5 doğru. P3 not: seçenek ve `why_tr` **salıdan sonra** diyor, kayıt **ab Dienstag** (salıdan itibaren). |
| 109 | m1:17:a2:b1:ana_fikir | ana fikir | GEÇTİ | Kanıt c2. |
| 110 | m1:21:h1:sahne:soru | soru | GEÇTİ | |
| 111 | m1:16:a2:b1:ayrinti1 | ayrıntı | GEÇTİ | Kanıt c3. |
| 112 | m1:21:v1:b1:ayrinti2 | ayrıntı | GEÇTİ | Kanıt s12. P3 not: istek Tobi'ye; **Babası ne getirmeli?** yerine **Tobi ne getirmeli?** (cevap **babasının kartını**) daha açık. |
| 113 | m1:20:a1:e1 | eylem | GEÇTİ | Kanıtlar doğru. 15.12 salı. |
| 114 | m1:15:h3:sahne:soru | soru | GEÇTİ | |
| 115 | m1:18:a1:e1 | eylem | GEÇTİ | Cumartesi 8–12 ve pazar kapalı bilgisiyle tek cevap. |
| 116 | m1:16:a2:e1 | eylem | GEÇTİ | P3 not: **alles geschlossen** için **her yer kapalı** mağaza dışını da kapsıyor gibi okunuyor. **mağaza kapanıyor** daha doğru. |
| 117 | m1:16:yazma | yazma | GEÇTİ | Örnekteki her cümle bir kalıba uyuyor, zorunlular var. |
| 118 | m1:18:yazma | yazma | **HATA** | Yukarıda 1. madde. |
| 119 | m1:16:a2:b1:d1 | dikte kolay | GEÇTİ | Çeldiriciler (**Jacke**, **Kleid**) c3'te geçmiyor. |
| 120 | m1:15:v1:b1:d1 | dikte kolay | GEÇTİ | |
| 121 | m1:15:a1:b1:d1 | dikte kolay | GEÇTİ | **heute** c2'de geçmiyor (c5'te var, o cümle çalınmıyor). |
| 122 | m1:21:t03 | hafta testi gap | GEÇTİ | Doğru cevap `opts` içinde, 3 yazım. |
| 123 | m1:21:t11 | hafta testi order | GEÇTİ | Parçalar ilk cevabın kelimeleri. |
| 124 | m1:21:t09 | hafta testi tr_de | GEÇTİ | |
| 125 | m1:21:t05 | hafta testi transform | GEÇTİ | |

Örneklemde OD-9 ihlali yok. Betik `Aralık'ta` gibi kesme işaretlerini yakaladı, gözle bakılınca hepsi Türkçe ek çıktı. Öğrencinin söylediği bütün satırlarda ad yalnızca `{name}` ile geçiyor. Bairisch, kişisel bilgi ve İngilizce köprü yok. **Okay** Almancada yerleşik.

## Örneklem dışı ek bulgular (oranı etkilemez; bağlam kontrolünde görüldü)
1. **18. günde cuma ve cumartesi saatleri çelişiyor** (1. hatanın kaynağı aynı):
   - Sahne s6: Luka cuma **von neun bis zwölf** orada.
   - Prova `n3` ve `n3b`: **am Freitag bin ich nur bis zwei da** (iki saat farklı). `n3b` geri bildirimi de "Saat ikide Luka gidiyor" diyor.
   - Sahne `cevapla` (`m1:18:v1:c1`): Luka cuma dördün olmadığını az önce söyledi, ama durum "Cuma günü saat dörtte gelebilirsin" diyor ve bütün kabuller cuma dört.
   - Gün sınavı `m1:18:s10`: durum "öğleden sonra olur" diyor, ilk cevap **Vielleicht am Nachmittag?** Oysa `a1` cumartesiyi yalnız **von acht bis zwölf** veriyor.
   - Öneri: 18. günü tek bir saat tablosuna bağlamak. Luka cuma yalnız sabah, cumartesi 8–12. `n3` ve `n3b` **nur bis zwölf** olur. `s10` cumartesi yerine hafta içi bir günü sorar ya da cevap **Vielleicht um elf?** olur. `v1:c1` durumu cumartesi on olur, ya da istek önce sorulup sonra reddedilir.
2. **Halka görev kabullerinde anlam ekleyen sözcükler** (174 görev cümlesi tarandı; **immer, nie, nur, auch, heute, wieder, noch** gibi, Almancasında olmayıp kabulde olan sözcükler). Anlamı değiştirdiğini düşündüklerim:
   - `m1:20:h2:g7` **Das Kind isst nie ein Ei.** (**kein Ei**: yemiyor; **nie**: hiç yemez)
   - `m1:19:h1:g10` **Jeder spricht hier nur Deutsch.**
   - `m1:19:h1:g7` **… nur Deutsch!** (iki kabul)
   - `m1:17:h2:g1` **Ist das nur der Anrufbeantworter?**
   - Kalan 22 eklemenin çoğu (**auch**, **noch**, **heute**) hafif ve Türkçeyle uyumlu, ama dilbilimci tek ölçüyle bakmalı.
3. **Uygulama (baş geliştirici, içerik dışı) U-1:** Halka "Duyduğunu yaz" adımı görev cümlesinin bütün kabullerini dikte cevabı sayıyor. `web/src/screens/Akis.tsx:233` kabulleri `[g.de, ...g.accepted]` olarak kuruyor; `web/src/ui/soru/AkisAdim.tsx:41` `kip="duy"` için aynı listeyle `ruleVerdict` çağırıyor. Örnek: **Ich bin heute zu Hause.** duyulup **Ich bin heute daheim.** yazılırsa doğru sayılıyor. Bu FORMAT'taki "Dikte `accepted`: aynı metnin yazımları; başka kelime kabul edilmez" kuralına aykırı. Öneri: `duy` kipinde yalnız `[bilgi.de]`, yazım farkları için `dikteDegerlendir`.

## Gerçek iPhone'da denenecekler
- 18. gün akışı baştan sona (sahne, `a2`, prova, yazma): düzeltmeden sonra öğrenci aynı randevuyu üç yerde aynı gün ve saatle görmeli.
- Halka dikte (U-1): **Ich bin heute zu Hause.** duyulunca **daheim** yazılırsa ret beklenir. Bugün kabul ediliyor.

## Betik (tekrar üretim)
`python3 -I orneklem_h03.py <depo> [--dump]`. Yukarıdaki parmak izleriyle aynı 125 kimliği verir.

<details><summary>orneklem_h03.py</summary>

```python
#!/usr/bin/env python3
"""İÇ-4 hafta 03 örneklem: maddeleri düzleştir, katmanlı ve tohumlu seç.
Kullanım: python3 orneklem_h03.py <depo> [--dump]"""
import json, math, random, sys

REPO = sys.argv[1]
M1 = REPO + "/content/v2/m1/"
TOHUM = 20261123
ORAN = 0.10
ENAZ = 60

items = []  # (katman, kimlik, nesne, bağlam)

def add(kat, kid, obj, ctx=None):
    items.append({"katman": kat, "id": kid, "obj": obj, "ctx": ctx})

def bolum(prefix, b, satirlar):
    lines = {s["id"]: s for s in satirlar}
    ctx = [lines[c] for c in b["cumleler"] if c in lines]
    if "ana_fikir" in b:
        add("soru", f"{prefix}:{b['id']}:ana_fikir", b["ana_fikir"], ctx)
    for i, a in enumerate(b.get("ayrinti", [])):
        add("soru", f"{prefix}:{b['id']}:ayrinti{i+1}", a, ctx)
    for dk in b.get("dikte", []):
        c = [lines[dk["cumle"]]] if dk.get("cumle") in lines else ctx
        add("dikte", f"{prefix}:{b['id']}:{dk['id']}", dk, c)
    if "cevapla" in b:
        add("cevapla", b["cevapla"]["id"], b["cevapla"], ctx)

for n in range(15, 22):
    d = json.load(open(f"{M1}gun-{n}.json"))
    g = f"m1:{n}"
    for h in d["halkalar"]:
        for i, k in enumerate(h.get("kaliplar", [])):
            add("halka-kalip", f"{h['id']}:k{i+1}", k)
        for i, gc in enumerate(h.get("gorev_cumleleri", [])):
            add("halka-gorev", f"{h['id']}:g{i+1}", gc)
        sh = h.get("sahne")
        if sh:
            for i, s in enumerate(sh["satirlar"]):
                add("halka-sahne", f"{h['id']}:sahne:{i+1}", s, sh.get("ortam_tr"))
            if sh.get("soru"):
                add("soru", f"{h['id']}:sahne:soru", sh["soru"], sh["satirlar"])
    sa = d["sahne"]
    for s in sa["sahneler"]:
        add("satir", f"{sa['id']}:{s['id']}", s)
    for b in sa["bolumler"]:
        bolum(sa["id"], b, sa["sahneler"])
    for se in d["sesler"]:
        for s in se["script"]:
            add("satir", f"{se['id']}:{s['id']}", s, se.get("ortam_tr"))
        for b in se["bolumler"]:
            bolum(se["id"], b, se["script"])
        if "eylem" in se:
            add("soru", se["eylem"]["id"], se["eylem"], se["script"])
    for gr in d.get("gorsel", []):
        add("gorsel", gr["id"], gr)
    p = d["prova"]
    for dg in p["dugumler"]:
        add("prova-dugum", f"{p['id']}:{dg['id']}", {"de": dg["de"], "tr": dg["tr"]}, p.get("durum_tr"))
        for i, s in enumerate(dg.get("secenekler", [])):
            add("prova-secenek", f"{p['id']}:{dg['id']}:o{i+1}", s, {"dugum": dg["de"], "durum": p.get("durum_tr")})
    oy = d["okuma_yazma"]
    if oy["tur"] == "okuma":
        add("okuma-metin", f"{g}:okuma:metin", {"de": oy["metin_de"], "tr": oy["metin_tr"]})
        for s in oy.get("sorular", []):
            add("okuma-soru", s["id"], s, oy["metin_de"])
    if oy.get("yazma"):
        add("yazma", f"{g}:yazma", oy["yazma"])
    for m in d["gun_sinavi"]["maddeler"]:
        add("gun-sinavi", m["id"], m)

t = json.load(open(M1 + "hafta-sonu-testi-03.json"))
for m in t["maddeler"]:
    add("hafta-testi", m["id"], m)
u = json.load(open(M1 + "gorulmemis-03.json"))
for m in u["durumlar"]:
    add("gorulmemis", m["id"], m)

N = len(items)
hedef = max(ENAZ, math.ceil(N * ORAN))
katmanlar = {}
for it in items:
    katmanlar.setdefault(it["katman"], []).append(it)

rng = random.Random(TOHUM)
secilen = []
# her katmandan oranla orantılı, en az 2 (küçük katmanlarda en az 3)
pay = {}
for k, lst in sorted(katmanlar.items()):
    p = math.ceil(len(lst) * hedef / N)
    if len(lst) <= 12:
        p = max(p, 3)
    pay[k] = min(len(lst), max(2, p))
for k, lst in sorted(katmanlar.items()):
    secilen += rng.sample(lst, pay[k])

# tamamlama: katmanın içindeki alt türlerden (dikte basamağı, test maddesi türü)
# ana çekilişte hiç çıkmayanlardan ayrı tohumla çekilir (tohum + 1).
def alt(it):
    o = it["obj"]
    if it["katman"] == "dikte":
        return o.get("seviye")
    if it["katman"] in ("hafta-testi", "gun-sinavi"):
        return o.get("k")
    return None
rng2 = random.Random(TOHUM + 1)
ek = []
for k in sorted(katmanlar):
    turler = sorted({alt(it) for it in katmanlar[k]} - {None})
    var = {alt(it) for it in secilen if it["katman"] == k}
    for t in turler:
        if t in var:
            continue
        aday = [it for it in katmanlar[k] if alt(it) == t]
        ek += rng2.sample(aday, min(len(aday), max(1, math.ceil(len(aday) * ORAN))))
secilen += ek

if "--dump" in sys.argv:
    for it in secilen:
        print("#####", it["katman"], "|", it["id"])
        print(json.dumps(it["obj"], ensure_ascii=False))
        if it["ctx"] is not None:
            print("CTX:", json.dumps(it["ctx"], ensure_ascii=False))
else:
    print("toplam madde", N, "hedef", hedef, "seçilen", len(secilen), "oran %.1f%%" % (100 * len(secilen) / N))
    for k, lst in sorted(katmanlar.items()):
        print(f"  {k:15s} {len(lst):4d} -> {pay[k]}")
    print(" ".join(it["id"] for it in secilen))
```
</details>
