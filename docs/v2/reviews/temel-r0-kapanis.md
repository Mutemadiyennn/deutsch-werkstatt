# R0 temel paket: inceleme kapanışı (2026-11-18)

**Durum: KAPANDI.** On ders `review.status = "reviewed"`, `okur = "passed"`. Açık kalanlar değerlendirici ve şema işleridir (aşağıda).

## Kapsam
10 ders (`content/v2/temel/r0-01` … `r0-10`): günler, aylar, sayılar 0–100, saat, tarih, soru kelimeleri, **sein** ve **haben**, modal fiiller, heceleme.

## Sayılar (tek tanımla)
**Madde tanımı:** öğretim öğesi + alıştırma + yerleştirme maddesi + diyalog satırı + dinleme parçası. Tablo satırı, dinleme satırı, dinleme sorusu ve görev sayılmaz.

| Ders | PR #51 incelemesi anı | Bugün |
|---|---|---|
| 01 | 73 | 75 |
| 02 | 73 | 73 |
| 03 | 74 | 74 |
| 04 | 72 | 72 |
| 05 | 86 | 86 |
| 06 | 56 | 56 |
| 07 | 65 | 65 |
| 08 | 59 | 59 |
| 09 | 64 | 65 |
| 10 | 72 | 75 |
| **Toplam** | **694** | **700** |

Bugünkü içerik: 189 öğretim öğesi, 353 alıştırma, 50 yerleştirme maddesi, 238 üretim maddesi, 74 çipli öğe.

### Önceki sayıların düzeltmesi
| Eski sayı | Durum |
|---|---|
| **848 madde** (378 + 470) | Geçersiz. İki rapor farklı tanım kullanmış. 378 yukarıdaki tanımla doğru. 470, tablo satırı, dinleme satırı ve soruları, görev de sayılarak bulunmuş. Aynı tanımla 06–10 o gün 316, toplam **694** eder. Geniş tanımla 01–05 504, 06–10 485, toplam 989 eder (bugün 995). |
| **63 dil hatası** (15 + 48) | Geçersiz. 48 maddenin 31'i dil hatası değil, öğretmeden isteme. Doğrusu: **32 dil ve içerik hatası** (15 + 17) ve **31 öğretmeden isteme**. |
| **65 eksik kart** | Yeniden üretilemedi. Bugün derslerin kullandığı 126 kimlikten **69** tanesi `registry/lexicon/` içinde yok. `lexemes.v1.json` ve `lexemes.v2.json` da sayılırsa **54** tanesi yok. |
| 1.222 okur alanı, 30 geri dönüş | İnceleme doğruladı. Bu sayılar önceki okur turlarına aittir, yeni tur ayrı sayılacak. |
| 77 çipli öğe | O gün için doğru. Bugün 74; hepsi okurdan geçti. |

### Önceki turlar
| Aşama | 01–05 | 06–10 |
|---|---|---|
| Dilbilimci: madde (raporun kendi tanımı) | 378 | 470 |
| Dil ve içerik hatası | 15 | 17 |
| Öğretmeden isteme | ayrı sayılmadı | 31 |
| Eklenen kabul cevabı | 66 madde | 93 varyant, 36 madde |
| Okur: alan | 620 | 602 |
| İlk turda geri dönen | 9 | 21 |

## PR #51 inceleme kapanışı

**Bu turun hata oranı:** var olan 694 maddenin 91'i değişti (%13,1). 6 madde yeni. Değişikliklerin çoğu eksik kabul cevabıdır: 60 maddeye 419 cevap eklendi, 1 cevap çıkarıldı.

**Denetim:** `/home/claude/cm/r0audit.ts`, çıktı `docs/v2/reviews/temel-r0-denetim.txt`. Sonuç **0 ihlal**. Betik şemayı, OD-9 kurallarını, üretim maddelerinin ilk cevabını, öğrencinin diyalog satırlarını, kabul listelerini ve incelemede reddedildiği yazılan cevapları denetler. İlk cevapta yalnızca tablodan gelen kelime: 0. Ayrıca 33 yanlış cevap `judge()` ile denendi, hiçbiri kabul edilmedi. `npm run content:validate`: 0 hata, 59 eski uyarı. Doğrulayıcı `temel/` klasörünü okumaz.

### Kapanan maddeler
| Bulgu | Yapılan |
|---|---|
| **P0-1** şehir adlı kodlar | `r0:10:d22`, `d23`, `p04` artık yalnızca harfi veriyor. İlk cevap **K wie Kaufmann**, **S wie Samuel**, **M wie Martha**. Şehir adlı biçim kabul listesinde kaldı. Şehir adları için üç tanıma maddesi eklendi (`d33`–`d35`). Görev metni şehir adını zorunlu istemiyor. |
| **P1-2** `r0:09:a:sie-duerfen` | Çipler: **Sie** → siz, **dürfen nichts essen** → hiçbir şey yememelisiniz. **dürfen** tek başına izin anlamı verdiği için ayrı çip olmadı. **essen** yeni `r0:09:b:essen` öğesinde öğretiliyor. |
| **P1-3** reddedilen doğru cevaplar | Tablodaki bütün cevaplar eklendi. Selamlı açılışlar `r0:09:d29` ve `p05` için bütün kalıplarla kuruldu. |
| **P1-3** sıralama | 3 maddeye ek olarak bütün sıralama maddeleri tarandı. İkinci doğru sıra şu maddelere eklendi: `02:d11`, `03:d12`, `04:d12`, `04:d14`, `05:d17`, `05:d19`, `06:d11`, `09:d13`, `09:d14`, `09:d16`, `10:d13`. |
| **P1-4** telefon ve saat | `r0:10:d20` gruplu okuma, **siebenundvierzig**, bitişik ve aralıklı rakam biçimlerini kabul ediyor. Ders 03 telefon maddeleri **0171**, **089**, **016** biçimlerini kabul ediyor. Ders 05 üretim maddeleri, `06:d14` ve `08:d33` **8:30**, **8:30 Uhr**, **10:00 Uhr** biçimlerini kabul ediyor. |
| **P1-5** (içerik kısmı) | Denetim çıktısı depoda. Son okur düzeltmesinden sonra betik yeniden çalıştırıldı: 0 ihlal. |
| **P2** öğrenci diyalog satırları | Denetime girdi, 0 ihlal. Satırlar öğretilen kelimelerle yeniden yazıldı (01–05). Yeni öğe `r0:01:a:guten-tag` (**Guten Tag, hier ist {name}.**) ve alıştırması `r0:01:d35` eklendi. Bu yüzden ayrı bir ürün kararı gerekmiyor. |
| **P2** Noel pazarı | `r0:02:h2` artık **Ende November** diyor, `r0:06:h2` ile uyumlu. |
| **P2** Frau Brandl sırası | Ders 01 ve 02'deki üç geçiş Ioana, Frau Huber ve Derya'ya verildi. İlk karşılaşma ders 07'de. |
| **P2** `characters` | `r0:08` listesine `ch:wimmer`, `r0:10` listesine `ch:brandl` ve `ch:aksoy` eklendi. `r0:01` ve `r0:02` listesinden `ch:brandl` çıktı. |
| **P2** tutarlılık | **Genau** → Doğru. **üben** → pratik yapmak. Saat yazımı her derste `9:30`. **ist** çipi her derste `-dir`. `habt-ihr` açıklaması düzeltildi. Ders 06 diyaloğunda doğum tarihi **Bu örnekte** diye işaretlendi. |
| **P2** tek tek cevaplar | `05:d30` içinden **Um zwanzig Uhr.** çıkarıldı. `05:d38` **zweiundzwanzig Uhr dreißig**, `04:d23` **100 Euro**, `06:d24` **Siebter Achter neunzig**, `01:d20` **Geht am Freitag?** kabul ediyor. |

### Açık maddeler
| Madde | Sahibi |
|---|---|
| **P1-1** rakam + nokta: **Am 3. Mai** biçimi **Am drei Mai** cevabını da geçiriyor. İçerikte doğru biçimler silinmedi. `r0:06:d16`–`d22`, `d24`–`d26`, `p03`, `p04` düzelene kadar kanıt saymamalı. | değerlendirici (PM-045 §4) |
| Sayı ve saat derslerinde rakamla geçme: yönergede **8:30** yazan maddede öğrenci aynı rakamı yazarak geçebilir. Konuşma tanıma rakam yazdığı için bu biçimler eklendi. `strictNumberWords` yazılı cevabı ayırmalı. | değerlendirici (PM-045 §4) |
| Konuşma tanımanın **0171**, **8:30 Uhr** çıktısı gerçek cihazda denenmedi. | baş geliştirici |
| Karışık heceleme, ad ve soyad yuvası, adın harf harf okunması | ürün ve şema (#12) |
| Doğrulayıcı `temel/` klasörünü okumuyor. Denetim betiği depo dışında. `u:r0:NN` kimlikleri tanımsız. | `TemelDers` (PM-045 §4) |
| WORLD §4 hafta 2 (30.11) pazarın açıldığını söylüyor, §6 ve dersler 27 Kasım diyor. | baş geliştirici |
| Ders 10 yükü (iki bölümde 24 öğe): kurala uyuyor, öğrenci verisiyle yeniden bakılacak. | baş geliştirici |

### Not
Ders 05 diyaloğunda öğrenci artık **Auf Wiederhören** demiyor, **Bis Donnerstag!** diyor. İfade öğretilmediği için öğrenci satırından çıktı. Frau Huber söylemeye devam ediyor.

## Okur kapanışı
| Tur | Kapsam | Alan | Geri dönen |
|---|---|---|---|
| `r0re4` | İnceleme düzeltmesinde değişen açıklamalar ve parti 009'dan 5 alan | 43 | 5 (hepsi çip) |
| `r0chips` | Bütün çipler, soldan sağa okuma | 76 | 2 |
| `r0re7` | Kalan 34 diyalog, dinleme ve seçenek satırı, yeni tanıma maddeleri, parti 010'dan 7 alan | 47 | 1 |

`r0re4` turunda **ist → -dir** çipinin cümleyi bozduğu görüldü. Sorun tek alanla sınırlı olmadığı için 43 öğenin çipleri yeniden kuruldu ve hepsi `r0chips` turunda okundu. Son iki öğede (`r0:07:a:woher`, `r0:07:a:warum`) çipler silindi; silinen metin yeni okur turu gerektirmez. `r0re7` turunda geri dönen tek satır (`r0-06` diyaloğu, 5. satır) sadeleştirildi: **7 Ağustos 1990.** Son denetim: **0 ihlal**.

R0 toplam okur turu: 6 (`r0a` + `r0b`, `r0re2`, `r0re3`, `r0re4`, `r0chips`, `r0re7`).
