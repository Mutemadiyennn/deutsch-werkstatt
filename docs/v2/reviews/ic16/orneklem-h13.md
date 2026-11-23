# İÇ-16 · A2 13. hafta (gün 85–91) · örneklem kontrolü

Tarih: 2026-11-23 · inceleyen: qa-ajan (bağımsız; dilbilimci ve okur turlarından sonra) · PM-113 md. 5.
Dal: `content/a2-hafta-13` (çalışma ağacı, son dilbilimci fark turundan sonra). İçerik dosyalarına dokunulmadı.
Dosyalar: `content/v2/m1/gun-85.json` … `gun-91.json`, `hafta-sonu-testi-13.json`, `gorulmemis-13.json`, `content/v2/registry/grammar.json` `gr:a2-04:t1`–`t5`.
Okunan raporlar: `docs/v2/reviews/ic16/dilbilimci-h13.md`, `docs/v2/reviews/okur/ic16-h13.md`.
Biçim örneği (`ic9/orneklem-h12.md`) git ile açılmadı: qa tanımı git komutunu yasaklıyor. Biçim için yereldeki `a9-orneklem.md` kullanıldı.

## Sonuç: **GERİ** (A 1 · B 1 · C 1)

Örneklemde hata oranı (A+B) **2/30 = %6,7**, C ile birlikte 3/30 = %10. Eşik %2. A bulgusu var, bu yüzden sonuç GERİ.
A1, örneklem dışında aynı kökten 4 yazma görevini daha etkiliyor (aşağıda "Örneklem dışı"). Haftanın 7 yazma görevinin 5'inde örnek cevap uygulamanın kontrolünden geçmiyor.

## Yöntem

- **Havuz:** 645 öğe. Halka görev cümlesi, halka sahne sorusu, anlama (ana fikir ve ayrıntı), dikte basamağı, "Sen ne derdin?", eylem, görsel, prova seçeneği, okuma sorusu, yazma, gün sınavı maddesi, hafta testi maddesi, görülmemiş durum.
- **Seçim betiği:** `sec.py` (oturum karalama alanı), `random.Random(20261123)`. **Tohum: 20261123.**
  1. Her gün dosyasından 3 öğe. Gün içinde karıştırılmış sırada önce örneklemde henüz olmayan tür, sonra o günde olmayan tür alınır.
  2. Test ve görülmemiş dosyalarından karıştırılıp ilk 3'er öğe.
  3. Kalan havuzdan karıştırılıp ilk 3 öğe.
  Sonuç: 13 türün hepsi örneklemde var. Gün başına en az 3, test 3, görülmemiş 3.
- **Her öğede beş soru:**
  (1) İstenen sözcük ve biçim o ana kadar gösterilmiş mi? Kaynaklar: haftanın kalıp satırları, kartlar, dil noktası tablosu, önceki haftaların kartları (birleşik tablo).
  (2) Doğru cevap `accepted`'da mı? Makul doğru cevap reddediliyor mu, yanlış cevap kabul ediliyor mu?
  (3) Almanca ve Türkçe doğru mu?
  (4) `ans` doğru şıkkı, `kanit` doğru cümleyi gösteriyor mu?
  (5) Görülmemiş durum gerçekten derste geçmeyen bir bağlam mı?
- **Araçlar:**
  - (1) için sözcük arama betiği `nerede.py`: tablo, `yeni_kartlar`, kalıp, görev cümlesi ve ders kaydı.
  - (2) için uygulamanın kendi değerlendiricisi: `web/src/core/answer.ts` `ruleVerdict`, `prova.ts` `eslestir`, `okuma.ts` `yazmaKontrol`. Her üretim öğesinde 2–4 aday cevap koşuldu.
- **Sınıflar:**
  - A: öğretilmeden isteme ya da yanlış anahtar (doğru cevap reddedilir, yanlış şık doğru sayılır).
  - B: yanlış cevap kabul edilir ya da anlam ve tutarlılık hatası.
  - C: küçük.

## Araç denetimi (`denet.sh 13`)

- `content:validate`: **0 hata**, 177 uyarı.
- Dikiş 85–91: bütün sütunlar 0, **İhlal: 0**.
- Hafta kapısı **GEÇTİ**: öğretilmeden istenen 0 (kesin 0, sınırda 0), anlaşılmayan karşı soru 0, test %100 (12/12), görülmemiş 7/7.
- "Anlama: kanıtta yeni" 38 (engel değil). Kapı, ses durağının ilk turunu halkalardan önce sayıyor (PM-097 md. 1).

Araç A1'i yakalamıyor: kapı yazma görevinin `accepted_kaliplar` alanını uygulamanın eşleştiricisiyle denemiyor.

## Örneklem (30 öğe)

| # | dosya · yer | tür | (1) öğretildi | (2) anahtar | (3) dil | (4) ans/kanıt | sonuç |
|---:|---|---|---|---|---|---|---|
| 1 | 85 · `sesler[a1].b1.dikte[d4]` | dikte usta | **bitten** kart (60), **um Entschuldigung bitten** `lx:Entschuldigung` eşdizimi | 3 yazım | doğru | c8 | ✓ |
| 2 | 85 · `prova.n2.secenekler[1]` | prova | iki cümle de h1 kalıbı | `de` kabulde | doğru | – | ✓ |
| 3 | 85 · `h2.gorev_cumleleri[7]` | halka görev | **Ich hoffe, dass …** kalıbı, **eine neue Kollegin**, kart **sympathisch** | **dass** düşmüş biçim de kabulde (t1) | doğru | – | ✓ |
| 4 | 86 · `sesler[a1].b1.cevapla` | Sen ne derdin? | finde/glaube/denke kalıpları, **Problem** | 6 biçim | doğru | – | ✓ |
| 5 | 86 · `okuma.o2` | okuma sorusu | – | – | doğru | ans 0 Güvenilir, kanıt 1 = „…ein guter Kollege zuverlässig ist." | ✓ |
| 6 | 86 · `sahne.b1.ayrinti[0]` | anlama | – | – | doğru | ans 0, s3 Tobi „Ich finde, dass das gut ist. Sie streiten sich jeden Tag." | ✓ |
| 7 | 87 · `gun_sinavi.s7` | sınav tr_de | **die Regeln**, **hat … erklärt** kalıbı | **şimdiki zaman kabul ediliyor** | – | – | **B1** |
| 8 | 87 · `gorsel.g4` | görsel | kart **erklären** | – | – | doğru resim ayırt edilebilir | ✓ |
| 9 | 87 · `sesler[a2].eylem` | eylem | **früher** kart değil. Çıkarılabilir: **früh** (5), karşılaştırma dersi (25), gr:a1-08:t3 (39), **zehn Minuten später** (85) | – | doğru | ans 0, c2 | ✓ |
| 10 | 88 · `h2.sahne.soru` | halka sorusu | – | – | doğru | ans 0 (Feuerübung) | ✓ |
| 11 | 88 · `okuma_yazma.yazma` | yazma | **Tobis Folien**, **fertig** (32), **Ich schicke es Ihnen** kalıbı | **örnek cevap kontrolden geçmiyor** | doğru | – | **A1** |
| 12 | 88 · `h1.gorev_cumleleri[2]` | halka görev | **auf eine Nachricht antworten** (`lx:antworten`), t4 | `von Derya` biçimi de kabulde | doğru | – | ✓ (kod notu K1) |
| 13 | 89 · `h2.gorev_cumleleri[2]` | halka görev | **Die Zeit reicht nicht** kalıbı, **Überstunden machen** (`lx:Überstunde`, 57) | 3 biçim | doğru | – | ✓ |
| 14 | 89 · `sesler[a2].b1.cevapla` | Sen ne derdin? | **vor der Arbeit**, **anrufen** | **„Vor der Arbeit." tek başına yok** | doğru | – | **C1** |
| 15 | 89 · `sahne.b2.ayrinti[1]` | anlama | – | – | doğru | ans 0 Martta, s9 | ✓ |
| 16 | 90 · `h1.gorev_cumleleri[2]` | halka görev | **Der Husten hört nicht auf** kalıbı | 3 biçim | doğru | – | ✓ |
| 17 | 90 · `sesler[a1].eylem` | eylem | – | – | doğru | ans 0, c3 (cumartesi 8–13) | ✓ |
| 18 | 90 · `prova.n3.secenekler[1]` | prova | **Wie viele Tabletten?**, **dreimal am Tag** kalıbı | 4 biçim | doğru | – | ✓ |
| 19 | 91 · `sesler[a1].b1.dikte[d3]` | dikte zor | **Auf Wiederhören** kalıbı, `lx:Gute_Besserung!` | banka 4 + 2 çeldirici | doğru | c6 | ✓ |
| 20 | 91 · `sesler[a2].b1.ayrinti[1]` | anlama | **Hausaufgabe** (17) | – | doğru | ans 0, c4 | ✓ |
| 21 | 91 · `prova.n3.secenekler[1]` | prova | **Hausarzt** (7), **zu meinem** | `de` kabulde | doğru | – | ✓ |
| 22 | test `t06` | transform | t5 örneği aynen | doğru; **habe am Freitag frei** sırası AI'ya gider | doğru | – | ✓ |
| 23 | test `t12` | konuşma | 91 kalıpları, prova n4 | 4 biçim | doğru | – | ✓ |
| 24 | test `t10` | dinle-cevapla | **Halsschmerzen** (80), **wehtun** (15), **seit gestern Abend Fieber** kalıbı | 4 biçim | doğru | – | ✓ |
| 25 | görülmemiş `g4` | durum | t4 (**Jonas' Handy**), **Handy** (47) | 4 biçim | doğru | – | ✓ Kurs bağlamı derslerde yok. |
| 26 | görülmemiş `g5` | durum | t5, **Spätschicht** kalıbı, **okay** (19) | 4 biçim | doğru | – | ✓ Kurs öğretmeni yeni bağlam. Dersler şefle. |
| 27 | görülmemiş `g1` | durum | **Er sagt, dass**, **wegen der Baustelle** | belirli tanımlıklı biçim de kabulde | doğru | – | ✓ Otobüs, Ioana. 85'teki tren anonsuna yakın ama yeni bağlam. |
| 28 | 89 · `h1.gorev_cumleleri[0]` | halka görev | **Ich hatte einen Arbeitsunfall** kalıbı | 3 biçim | doğru | – | ✓ |
| 29 | 85 · `sesler[a2].b1.ayrinti[1]` | anlama | – | – | doğru | ans 0, c4 | ✓ |
| 30 | 91 · `sesler[a1].b1.cevapla` | Sen ne derdin? | **bis Mittwoch**, **Krankschreibung** kalıbı | kısa cevap var | doğru | – | ✓ |

## A · öğretilmeden isteme ya da yanlış anahtar (1)

**A1 · gun-88 · `okuma_yazma.yazma.accepted_kaliplar` · Kalıplarda yuva `…` ile yazılmış. Örnek cevap uygulamanın kontrolünden geçmiyor.**

Kalıplar: `["Tobis …", "Ich schicke Ihnen … bis Freitag."]`. Uygulama (`web/src/core/okuma.ts` `kalipRe`) yalnız `___`'ı yuva sayıyor. `…` harfi harfine aranıyor. FORMAT.md de böyle diyor: "`___` serbest yuvadır, `ornek_de` içindeki her cümle bir kalıba uyar".

Koşu (`yazmaKontrol(ornek_de, yazma)`):

```
88 {"eksik":[],"kalipli":0,"toplam":2,"tamam":false}
```

Öğrenci örnek cevabı aynen yazsa bile ekranda "Kelimeler var, ama kalıba uyan cümlede değil" ve "Bunları kontrol edemedim" çıkıyor. Mesaj kaydedilmiyor (`cumleKaydet` yalnız `tamam` olunca çalışıyor). Doğru cevap reddediliyor.

**Öneri:** `…` yerine `___` yaz ve yuvayı en çok 4 sözcük tut. Örnek: `["Tobis ___ sind fertig.", "Ich schicke Ihnen ___ bis Freitag."]`. Bu biçimle koşu `tamam: true, kalipli 2/2` veriyor.

## B · yanlış cevap kabul ediliyor (1)

**B1 · gun-87 · `gun_sinavi.maddeler[m1:87:s7]` (tr_de „Derya bana kuralları anlattı.")**

`accepted[2]` = „Derya erklärt mir die Regeln." Bu cümle şimdiki zamanda, Türkçe ise geçmiş zamanda. `why_tr` maddenin amacını **erklärt** en sonda (Perfekt) diye anlatıyor. Değerlendirici bu cevabı `correct / exact` sayıyor.

`accepted[1]` = „Derya hat mir alles erklärt." Türkçede "kuralları" var, bu cevapta yok (C düzeyinde gevşeklik).

**Öneri:** İkisini çıkar. Yerlerine aynı anlamda Perfekt biçimler koy: „Die Regeln hat mir Derya erklärt.", „Sie hat mir die Regeln erklärt.". En az 3 biçim kalır.

## C · küçük (1)

**C1 · gun-89 · `sesler[m1:89:a2].bolumler[b1].cevapla`**

„Wann muss man die Firma anrufen?" sorusuna en doğal cevap „Vor der Arbeit." Bu cevap kabul listesinde yok. Değerlendirici `ask_ai` diyor. Çevrimdışıyken sonuç "kontrol edilemedi" oluyor ve cevap doğru sayılmıyor (`countsAsCorrect`).

Aynı haftada 91 `a1:c1` „Bis Mittwoch." biçimini kabul ediyor.

**Öneri:** Listeye „Vor der Arbeit." ekle.

## Örneklem dışı (A1'in izi sürülürken bulundu, oran hesabına girmedi)

Haftanın 7 yazma görevi `yazmaKontrol(ornek_de)` ile koşuldu:

| gün | sorun | koşu | önerilen `accepted_kaliplar` / `zorunlu` (koşuldu: `tamam: true`) |
|---:|---|---|---|
| 85 | `…` yuva | kalipli 0/3, tamam false | `["Hallo ___", "die Bahn schreibt", "dass ___ Minuten Verspätung hat", "Er fährt heute von Gleis ___.", "Ich komme ___ später."]` |
| 86 | `…` yuva | kalipli 0/2, tamam false | `["Ich finde, dass ___ ist.", "Ich glaube, dass ___ gut verstehen."]` |
| 87 | `…` yuva | kalipli 0/2, tamam false | `["Es ist wichtig, dass ___ sind.", "Es ist auch wichtig, dass Sie sich ___ krankmelden."]` |
| 88 | A1 | kalipli 0/2, tamam false | yukarıda |
| 89 | – | tamam true | – |
| 90 | `zorunlu` „dreimal am Tag", kalıpta „dreimal" yuvaya düşüyor (zorunlu sözcük kalıbın sabit kısmında olmalı) | kalipli 3/3, **tamam false** | `zorunlu: ["am Tag", "krank"]` ya da kalıp „Ich nehme dreimal am Tag eine Tablette." |
| 91 | – | tamam true | – |

Önerilen bütün biçimler yalnız örnek cevapla denendi. Yuva 1–4 sözcük olmalı. Öğrencinin başka geçerli cümleleri için kalıp listesi geniş tutulmalı.

- **Aynı sorun 12. haftada da var** (karalama alanındaki `h12/gun-78…84.json` kopyası): 7 görevin 7'si `…` ile yazılmış, hepsinde `kalipli 0`, `tamam false`. 12. hafta dalı birleştiyse ayrı düzeltme gerekir.
- **Baş geliştiriciye öneri (araç):** doğrulayıcıya ya da hafta kapısına bir kural eklensin: `yazmaKontrol(ornek_de, yazma).tamam === true`. Bu kural yoksa A1 türü hata her hafta kapıdan geçer.

## Kod gözlemi (içerik hatası sayılmadı)

**K1 · `web/src/core/grading.ts` `norm`:** kesme işaretini siliyor. Bu yüzden „Ioana's Handy" ve „Derya's Nachricht" cevapları `correct / exact` sayılıyor ve not da çıkmıyor.

t4 dersi "Araya kesme işareti konmaz" diye öğretiyor. Öğrenci bu hatayı yaptığında uygulama hiçbir şey söylemiyor. Bunu bilen biri ancak sözcük sırası ya da ümlaut notu görüyor.

**Öneri:** `yazimNotu`'na "ad + 's" uyarısı eklensin (baş geliştirici).

## Gerçek cihazda denenmesi gerekenler

- 88. gün yazma ekranı (iPhone 15 Pro Max, WebKit): örnek cevabı yazıp "Kontrol et"e bas. Bugün "Kelimeler var, ama kalıba uyan cümlede değil" çıkıyor. Düzeltmeden sonra "Gereken kelimeler tamam" çıkmalı ve cümle kaydedilmeli.
- 85, 86, 87 ve 90. günlerde de aynı deneme yapılmalı.
- Türkçe klavyeyle „Tobi's" yazıldığında uyarı çıkıyor mu, bakılmalı (K1).

## Düzeltme (baş oturum İÇ-16)
- **A1** düzeltildi: 85–88 `accepted_kaliplar` `…` → `___` (qa önerisi + iki yuvalı geniş kalıp, ör. `Ich finde, dass ___ ___.`); 90'da `dreimal am Tag` sabit kısımlı kalıp öne alındı. `yazmaKontrol(ornek_de)` 85–91: 7/7 `tamam: true` (14. haftada 93 aynı nedenle düzeltildi; 92–98: 7/7).
- **B1** düzeltildi: 87 `s7` kabul listesinden şimdiki zaman ve gevşek cümle çıktı, `Die Regeln hat mir Derya erklärt.` + `Sie hat mir die Regeln erklärt.` girdi.
- **C1** düzeltildi: 89 `a2` cevapla kabulüne `Vor der Arbeit.` eklendi.
- Araç önerisi (`yazmaKontrol(ornek_de).tamam` doğrulayıcı kuralı) ve K1 (`grading.ts` kesme işareti) #12'ye [PM-İSTEK] olarak.
- Sonra: validate 0 hata, dikiş 0, hafta kapısı GEÇTİ. Sonuç: **GEÇTİ** (A0 B0 düzeltme sonrası).
