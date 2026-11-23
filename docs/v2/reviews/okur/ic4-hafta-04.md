# Okur kontrolü: İÇ-4 A1 4. hafta (OD-9.3)

Kapsam: `content/v2/m1/gun-22.json` … `gun-28.json`, `hafta-sonu-testi-04.json`, `gorulmemis-04.json` içinde öğrenciye görünen bütün açıklama alanları: `goal_tr`, `can_do.tr`, halka `kaliplar[].tr`, `ortam_tr`, `q_tr` ve Türkçe şıklar (`opts`), `situation_tr`, `instr_tr`, `durum_tr`, `gorev_tr`, `kontrol_tr`, `why_tr`, `geri_bildirim_tr`, `kapanis_tr`. Örneklem değil, hepsi tek tek okundu. Liste betikle çıkarıldı (944 alan), her biri Almanca karşılığı (sahne, ses metni, prova seçeneği, kabul edilen cevaplar) yanında okundu. Çeviri alanları (`tr`, `metin_tr`, seçenek `tr`) okunmadı; onlar dilbilimcide. Dikte şıkları (63) ve hafta sonu testindeki boşluk doldurma şıkları (`t03`, `t10`; 6) Almanca olduğu için sayılmadı.

Kimlikler: `<dosya> · <öğe yolu> · <alan>`. `gNN` günün hedefi, `h1.kalipN` halka kalıbı, `h1.sahne` / `h1.soru` halka sahnesi ve sorusu, `v1.b1.ana/ay0/d1/d5` sahne bölümü, `v1:c1` sahneye cevap, `a1`/`a2` ses kaydı (`a1:c1` cevap, `a1:e1` eylem), `p1.n2.s1` prova düğümü ve seçeneği (0'dan sayılır), `optN` şık sırası (0'dan), `oN` okuma sorusu, `m1:NN:yazma` yazma görevi (`.N` kontrol maddesi), `sN` gün sınavı maddesi, `tNN` hafta sonu testi maddesi, `gN` görülmemiş durum. Sıra numarası (`22-103` gibi) aşağıdaki ekteki satırdır.

Terim sayılanlar 3. haftayla aynı: fiil, sıfat, ünlü, çoğul, olumsuz, düzensiz, mi eki, de eki, sıra sayısı. Bu hafta yeni olarak **haftanın kapısı** (iç terim) ve **ikinci sırada** (kelime sırası, kartlarla çelişiyor) sorun çıkardı. **karşılaştırma** gündelik Türkçe olduğu için terim sayılmadı.

## GERİ satırları

| # | Öğe kimliği | Alan | Açıklama | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|
| 22-001 | `gun-22` · `g22` | `goal_tr` | Evde kaybolan bir eşyanın yerini sorar, eşyaya göre er, sie ya da es ile cevap verirsin. | Evde kaybolan eşyanın yerini sorarım, eşyaya göre er, sie, es ile cevap veririm. | GERİ | 16 kelime (sınır 14). Bir cümlede iki iş var (sormak, cevap vermek). |
| 22-103 | `gun-22` · `m1:22:p1` | `kapanis_tr` | Eşyaları sordun ve buldun. Her eşya için doğru kelimeyi seçtin: er, sie, es. | Eşyaları ben sordum ve buldum; her eşya için doğru kelimeyi seçtim. | GERİ | Yaptığımı yanlış anlatıyor. Provada soruları Ioana soruyor (**Was suchst du denn?**, **Ist es in der Küche?**); ben yalnız cevap veriyorum. Durum kutusu da öyle diyor: Ioana eşyaları soruyor. |
| 23-001 | `gun-23` · `g23` | `goal_tr` | Bir eşyanın büyük, küçük, yeni ya da güzel olduğunu söyler, birine Wie findest du diye fikrini sorarsın. | Bir eşyanın büyük, küçük, yeni, güzel olduğunu söylerim, Wie findest du ile fikir sorarım. | GERİ | 17 kelime. İki iş bir cümlede. |
| 23-041 | `gun-23` · `m1:23:v1:c1` | `why_tr` | **das Sofa** için **Ich finde es schön** dersin. Sıfat değişmez. | Kanepe için Ich finde es schön derim; bir şey değişmiyor. | GERİ | **Sıfat** dilbilgisi terimi, öğretilmedi. Neyin değişmediğini bu sözcük olmadan anlayamadım. |
| 23-080 | `gun-23` · `m1:23:a2:c1` | `why_tr` | **die Tomaten** çoğul. Bu yüzden **sie sind** dersin. | Domatesler … bu yüzden sie sind derim. | GERİ | **çoğul** terimi. Neden **sie sind** dendiğini kutu terimle açıklıyor. |
| 23-089 | `gun-23` · `m1:23:p1.n2.s0` | `geri_bildirim_tr` | Çok iyi. **sie** ile başladın, sıfatlar değişmedi. | sie ile başladım, bir şeyler değişmedi. | GERİ | **sıfatlar** terimi. |
| 23-092 | `gun-23` · `m1:23:p1.n3.s0` | `geri_bildirim_tr` | Güzel. Farkı sıfatlarla açıkça söyledin. | Farkı bir tür kelimeyle söyledim. | GERİ | **sıfatlarla** terimi; hangi kelimelerle söylediğimi bilemedim. |
| 23-118 | `gun-23` · `m1:23:s2` | `why_tr` | Çoğulda **sind** gelir, sıfat değişmez. | Bir durumda sind gelir, bir şey değişmez. | GERİ | **Çoğulda** ve **sıfat** iki terim; kutuda örnek yok. |
| 23-123 | `gun-23` · `m1:23:s5` | `why_tr` | **ist** ile gelen sıfat değişmez: **Das Sofa ist neu**. | ist ile gelen bir kelime değişmez: Das Sofa ist neu. | GERİ | **sıfat** terimi. Örnek yardım ediyor ama kural terime dayanıyor. |
| 23-132 | `gun-23` · `m1:23:s11` | `why_tr` | **die Jacke** için **sie** dersin. Sıfatlar **ist** ile değişmez. | Ceket için sie; bazı kelimeler ist ile değişmez. | GERİ | **Sıfatlar** terimi; iki ayrı fikir (sie seçimi, değişmeme). |
| 24-001 | `gun-24` · `g24` | `goal_tr` | Bir ev ya da eşya için çok güzel, fazla pahalı ya da iyi değil der, ev sorunlarını kısaca anlatırsın. | Ev ya da eşya için çok güzel, fazla pahalı, iyi değil derim; ev sorunlarını anlatırım. | GERİ | 19 kelime. İki iş bir cümlede. |
| 24-002 | `gun-24` · `g24` | `can_do.tr` | Bir şeyin çok, fazla ya da değil olduğunu söylerim. | Bir şeyin çok olduğunu, fazla olduğunu ya da değil olduğunu söylerim. | GERİ | Anlamadım. **Bir şeyin değil olduğunu** Türkçede anlamsız; neyin çok ya da fazla olduğu yok. Gün başlığındaki örnekler (çok güzel, fazla pahalı) bu kutuda yok. |
| 24-089 | `gun-24` · `m1:24:p1.n3.s1` | `geri_bildirim_tr` | İyi bir soru. **zu klein** sorun var mı diye sorar. | zu klein bir şey soruyor… Sorun var mı diye sorar. | GERİ | İkinci okumada anladım. **zu klein** kendisi bir şey sormuyor, soruyu ben soruyorum. Cümle, sorduğum şeyi (fazla mı küçük) anlatmıyor. |
| 24-121 | `gun-24` · `m1:24:s7` | `why_tr` | Değil derken sıfatın önüne **nicht** gelir. | Değil derken bir kelimenin önüne nicht gelir. | GERİ | **sıfatın** terimi; hangi kelimenin önüne geleceğini bilemedim. |
| 24-124 | `gun-24` · `m1:24:s9` | `why_tr` | Güçlendirmek için **sehr**, olumsuz için **nicht** kullan. | Güçlendirmek için sehr, bir şey için nicht kullanırım. | GERİ | **olumsuz** terimi. Ayrıca ekrandaki cevapta (**Das ist sehr schlimm**) nicht yok; kutu cevabı değil başka şeyi anlatıyor. |
| 25-001 | `gun-25` · `g25` | `goal_tr` | İkinci el tezgâhında iki eşyadan hangisini istediğini dieser ile söyler, hangisinin daha ucuz olduğunu billiger als ile karşılaştırırsın. | Tezgâhta iki eşyadan hangisini istediğimi dieser ile söylerim, hangisi daha ucuz billiger als ile karşılaştırırım. | GERİ | 18 kelime. İki iş bir cümlede. |
| 25-060 | `gun-25` · `m1:25:a1:c1` | `why_tr` | Tersini **billiger** ile söyle. Çoğulda **sie sind** gelir. | Tersini billiger ile söylerim; bir durumda sie sind gelir. | GERİ | **Çoğulda** terimi. **Tersini** de neyin tersi olduğunu söylemiyor (soru Almanca, ekranda Türkçesi yok). |
| 25-099 | `gun-25` · `m1:25:p1.n4.s1` | `geri_bildirim_tr` | Güzel. İki sıfatı **aber** ile bağladın. | İki şeyi aber ile bağladım. | GERİ | **sıfatı** terimi. |
| 25-127 | `gun-25` · `m1:25:s6` | `why_tr` | **gut** düzensizdir: daha iyi **besser** olur. | gut bir türlü özel; daha iyi besser olur. | GERİ | **düzensizdir** terimi. |
| 25-128 | `gun-25` · `m1:25:s7` | `why_tr` | Daha pahalı **teurer** olur, e harfi düşer. | Daha pahalı teurer olur, bir e harfi düşüyor. | GERİ | Hangi e'nin nereden düştüğü yok. **teuer** kutuda yazmıyor; yalnız bu kutuya bakarak teurer'in nasıl kurulduğunu anlayamadım. |
| 26-087 | `gun-26` · `m1:26:p1` | `durum_tr` | Ioana ile üç ilana bakıyorsunuz. 1: Brunnengasse, 2 Zi., Kü., Blk., 55 m², 650 € + NK 120 €. 2: am Bahnhof, 3 Zi., Kü., 70 m², 800 € + NK 150 €. 3: Brunnenviertel, 1 Zi., Kü., Blk., 30 m², 450 € + NK 60 €. | Ioana ile üç ilana bakıyoruz; her ilanın oda, metrekare, kira ve yan gider bilgisi var. | GERİ | İlk okumada çözemedim. Üç ilan tek paragrafta. İlan numarası (**1:**, **2:**, **3:**) ile oda sayısı (**2 Zi.**, **3 Zi.**, **1 Zi.**) karışıyor. **+** işareti var, Almanca kısaltmalar kalın değil, nokta kısaltmalar cümleyi bölüyor. |
| 26-131 | `gun-26` · `m1:26:s11` | `situation_tr` | Üç ilan var: 650, 800 ve 450 avro. İkincisi en büyük. Ioana soruyor; en ucuzu ve en büyüğü söyle. | Üç ilan var, ikincisi en büyük; en ucuzu ve en büyüğü söyleyeceğim. | GERİ | **;** işareti var. |
| 27-001 | `gun-27` · `g27` | `goal_tr` | Evinin ve şehirdeki yerlerin nerede olduğunu in, an, auf, neben, hinter ve zwischen ile söylersin. | Evimin ve şehirdeki yerlerin nerede olduğunu in, an, auf, neben, hinter, zwischen ile söylerim. | GERİ | 15 kelime (sınır 14). |
| 28-001 | `gun-28` · `g28` | `goal_tr` | Merdivende Brandl Hanım'a kim olduğunu, nerede oturduğunu ve evini anlatır, Pichler Bey'in duyurusundan senden isteneni anlarsın. | Merdivende Brandl Hanım'a kendimi, oturduğum yeri ve evimi anlatırım, Pichler Bey'in duyurusunu anlarım. | GERİ | 16 kelime. İki iş bir cümlede. |
| 28-055 | `gun-28` · `m1:28:a1:e1` | `why_tr` | Teknisyen cumartesi dokuzda mutfağına geliyor. Akşam ondan sonra müzik yok. | Teknisyen cumartesi dokuzda geliyor. Akşam, ondan sonra müzik yok. | GERİ | İki okuma var. **ondan sonra** hemen önceki dokuzu ya da teknisyeni gösteriyor gibi; ilk okumada saat on olduğunu anlamadım. |
| 28-085 | `gun-28` · `m1:28:p1.n3.s0` | `geri_bildirim_tr` | Güzel. **die Küche** için **sie**, sıfatlar da doğru. | Mutfak için sie dedim, bazı kelimeler de doğru. | GERİ | **sıfatlar** terimi. |
| 28-096 | `gun-28` · `m1:28:p1` | `kapanis_tr` | Brandl Hanım'a kim olduğunu, nerede oturduğunu ve evini anlattın. Haftanın kapısından geçtin. | Brandl Hanım'a kendimi, oturduğum yeri ve evimi anlattım. Haftanın kapısından geçtim. | GERİ | **Haftanın kapısı** bana bir şey anlatmıyor; iç terim gibi. Hangi kapıdan geçtiğimi bilmiyorum (3. hafta raporundaki notla aynı söz). |
| 28-121 | `gun-28` · `m1:28:s7` | `why_tr` | Sıfat **ist** ile değişmez. **sehr** güçlendirir. | Bir kelime ist ile değişmez. sehr güçlendirir. | GERİ | **Sıfat** terimi; iki ayrı fikir. |
| 28-127 | `gun-28` · `m1:28:s11` | `situation_tr` | Haftanın kapısı, ilk gün sahnesi. Merdivende Brandl Hanım. Kim olduğunu, nerede oturduğunu ve evini anlat. | Haftanın bir kapısı, ilk gün sahnesi. Merdivende Brandl Hanım; kendimi anlatacağım. | GERİ | **Haftanın kapısı** iç terim; yönergenin ilk parçası anlaşılmıyor. |
| hst-003 | `hafta-sonu-testi-04` · `m1:28:t02` | `why_tr` | **ist** ikinci sırada, **nicht** sıfatın önünde durur. | ist ikinci sırada, nicht bir kelimenin önünde durur. | GERİ | **sıfatın** terimi. Ayrıca kartlar **Das / Haus / ist** diye geliyor; saydığımda **ist** üçüncü, **ikinci sırada** beni yanıltıyor. |
| hst-011 | `hafta-sonu-testi-04` · `m1:28:t07` | `why_tr` | **der Flur** için **er** dersin. Sıfat değişmez. | Koridor için er derim. Bir şey değişmez. | GERİ | **Sıfat** terimi; iki ayrı fikir. |
| hst-012 | `hafta-sonu-testi-04` · `m1:28:t08` | `why_tr` | **liegt** ikinci sırada durur. **im** in dem demektir. | liegt ikinci sırada durur. im in dem demek. | GERİ | Kartlar **Der / Führerschein / liegt** diye geliyor; saydığımda **liegt** üçüncü, **ikinci sırada** yanıltıyor. Bir kutuda iki ayrı fikir (sıra ve im). |

## Sayılar

| Dosya | Toplam | GEÇTİ | GERİ |
|---|---|---|---|
| gun-22 | 137 | 135 | 2 |
| gun-23 | 132 | 124 | 8 |
| gun-24 | 128 | 123 | 5 |
| gun-25 | 135 | 130 | 5 |
| gun-26 | 132 | 130 | 2 |
| gun-27 | 126 | 125 | 1 |
| gun-28 | 128 | 122 | 6 |
| hafta-sonu-testi-04 | 18 | 15 | 3 |
| gorulmemis-04 | 8 | 8 | 0 |
| **Toplam** | **944** | **912** | **32** |

**Reviewed sayılamayanlar (OD-9.4):** `gun-22`, `gun-23`, `gun-24`, `gun-25`, `gun-26`, `gun-27`, `gun-28`, `hafta-sonu-testi-04`. GERİ'siz dosya: `gorulmemis-04`.

### GERİ kimlik listesi

- `gun-22` · `g22` · `goal_tr` (22-001)
- `gun-22` · `m1:22:p1` · `kapanis_tr` (22-103)
- `gun-23` · `g23` · `goal_tr` (23-001)
- `gun-23` · `m1:23:v1:c1` · `why_tr` (23-041)
- `gun-23` · `m1:23:a2:c1` · `why_tr` (23-080)
- `gun-23` · `m1:23:p1.n2.s0` · `geri_bildirim_tr` (23-089)
- `gun-23` · `m1:23:p1.n3.s0` · `geri_bildirim_tr` (23-092)
- `gun-23` · `m1:23:s2` · `why_tr` (23-118)
- `gun-23` · `m1:23:s5` · `why_tr` (23-123)
- `gun-23` · `m1:23:s11` · `why_tr` (23-132)
- `gun-24` · `g24` · `goal_tr` (24-001)
- `gun-24` · `g24` · `can_do.tr` (24-002)
- `gun-24` · `m1:24:p1.n3.s1` · `geri_bildirim_tr` (24-089)
- `gun-24` · `m1:24:s7` · `why_tr` (24-121)
- `gun-24` · `m1:24:s9` · `why_tr` (24-124)
- `gun-25` · `g25` · `goal_tr` (25-001)
- `gun-25` · `m1:25:a1:c1` · `why_tr` (25-060)
- `gun-25` · `m1:25:p1.n4.s1` · `geri_bildirim_tr` (25-099)
- `gun-25` · `m1:25:s6` · `why_tr` (25-127)
- `gun-25` · `m1:25:s7` · `why_tr` (25-128)
- `gun-26` · `m1:26:p1` · `durum_tr` (26-087)
- `gun-26` · `m1:26:s11` · `situation_tr` (26-131)
- `gun-27` · `g27` · `goal_tr` (27-001)
- `gun-28` · `g28` · `goal_tr` (28-001)
- `gun-28` · `m1:28:a1:e1` · `why_tr` (28-055)
- `gun-28` · `m1:28:p1.n3.s0` · `geri_bildirim_tr` (28-085)
- `gun-28` · `m1:28:p1` · `kapanis_tr` (28-096)
- `gun-28` · `m1:28:s7` · `why_tr` (28-121)
- `gun-28` · `m1:28:s11` · `situation_tr` (28-127)
- `hafta-sonu-testi-04` · `m1:28:t02` · `why_tr` (hst-003)
- `hafta-sonu-testi-04` · `m1:28:t07` · `why_tr` (hst-011)
- `hafta-sonu-testi-04` · `m1:28:t08` · `why_tr` (hst-012)

## Notlar

- **Uzunluk:** yedi günün altısında `goal_tr` 14 kelimeyi aşıyor (`22-001` 16, `23-001` 17, `24-001` 19, `25-001` 18, `27-001` 15, `28-001` 16). Yalnız `26-001` (12) sınırın içinde. Hepsi iki işi tek cümlede sayıyor. `can_do.tr` alanları kısa ve geçti (`24-002` başka sebeple GERİ).
- **sıfat** bu haftanın en sık GERİ sebebi (`23-041`, `23-089`, `23-092`, `23-118`, `23-123`, `23-132`, `24-121`, `25-099`, `28-085`, `28-121`, `hst-003`, `hst-011`). Aynı günlerde gösterilen `gr:a1-04:t3` durağı da sıfatı tanımlamadan kullanıyor (3. hafta raporunda GERİ). Örnek cümleler (**Das Sofa ist neu**) kuralı terimsiz de gösteriyor.
- **çoğul** (`23-080`, `23-118`, `25-060`), **olumsuz** (`24-124`), **düzensiz** (`25-127`) 3. haftadaki gibi terim sayıldı.
- `hst-003` ve `hst-012` **ikinci sırada** diyor. Kelimeleri sıraya dizme görevinde kartlar tek tek geldiği için saydığımda fiil üçüncü karta düşüyor; açıklama yanıltıyor. 3. haftada geçen **başa gelir** / **sona gider** açıklamaları sayınca da doğru çıkıyordu, bunlar çıkmıyor.
- **ondan sonra**: `28-055`'te iki okumalı (GERİ). `28-022` şıkkı **Ondan sonra** (Sekizden sonra / On ikiden sonra yanında) ve `28-052` şıkkı (**saat ona kadar … akşam ondan sonra**) bağlamla saat on diye okunuyor; GEÇTİ saydım ama aynı söz.
- **Haftanın kapısı** (`28-096`, `28-127`): 3. hafta raporunda başlıkta (kapsam dışı) görüp not etmiştim; bu hafta açıklama alanlarına girdi, GERİ.
- Almanca kelimeler bazı alanlarda kalın işaretsiz yazılmış: `22-103` (**er, sie, es**), `22-116` (**er, sie, es kullan**), `24-096` (**sehr, zu ve nicht**), `25-101` (**dieser**), `25-114` (**billiger ve als kullan**), `26-001` (**am billigsten**), `27-096` (**in, hinter, neben, zwischen**), `gor-007` (**Bürgerbüro**) ve bütün `goal_tr`/`can_do.tr`'ler. Anlamı bozmadığı için yalnız bu yüzden GERİ saymadım; ekranda düz metin çıkıyorsa kalın kuralına uymuyor.
- `25-101` kapanış **dieser ile seçtin** diyor; provada söylediğim **diese**. Kalıp kutusu **dieser – diese – dieses** diye ailenin başını verdiği için GEÇTİ saydım.
- `24-086` **sehr teuer pahalı ama belki alınabilir demek**: anlamın bir kısmı seçeneğin geri kalanından (**aber vielleicht okay**) geliyor; **zu** ile farkı gösterdiği için GEÇTİ.
- `27-125` yönergesi **Nerede oturuyorsun?** diyor, duyulan soru **Wo wohnen Sie?**. Cevap değişmediği için GEÇTİ; dilbilimciye bilgi.
- Kapsam dışı ama göze çarptı (sayıya katmadım): `hst-011` (`m1:28:t07`) açıklaması **der Flur için er dersin** diyor, ilk kabul edilen cevap ise **Ich finde ihn hell und schön**. **ihn** bu hafta açıklanmadı. Dilbilimciye bilgi.
- Halka kalıplarındaki **…** boşluk işaretidir, açıklama metni değildir; önceki raporlardaki gibi GEÇTİ saydım. `27-003` kalıbı dört Almanca biçime (**im, am, auf dem, in der**) iki Türkçe karşılık veriyor; tek okumada anlaşılıyor, GEÇTİ.

## Ek: bütün satırlar

GEÇTİ satırlarında kendi sözlerimle anlattığım şey açıklamayla örtüştü; tek tek yazmadım, karar sütunu yeterli. GERİ satırlarının ayrıntısı yukarıda.

| # | Dosya | Öğe | Alan | Açıklama | Karar |
|---|---|---|---|---|---|
| 22-001 | gun-22 | `g22` | `goal_tr` | Evde kaybolan bir eşyanın yerini sorar, eşyaya göre er, sie ya da es ile cevap verirsin. | GERİ |
| 22-002 | gun-22 | `g22` | `can_do.tr` | Bir eşyanın nerede olduğunu sorar, er, sie, es ile cevap veririm. | GEÇTİ |
| 22-003 | gun-22 | `m1:22:h1.kalip0` | `kaliplar.tr` | …'i arıyorum – Ne arıyorsun? | GEÇTİ |
| 22-004 | gun-22 | `m1:22:h1.sahne` | `ortam_tr` | Akşam, senin dairen. Ioana kurstan sonra uğruyor, sen bir şey arıyorsun. | GEÇTİ |
| 22-005 | gun-22 | `m1:22:h1.soru` | `q_tr` | Sen ne arıyorsun? | GEÇTİ |
| 22-006 | gun-22 | `m1:22:h1.soru.opt0` | `opts` | Reçeteyi | GEÇTİ |
| 22-007 | gun-22 | `m1:22:h1.soru.opt1` | `opts` | Bir fincanı | GEÇTİ |
| 22-008 | gun-22 | `m1:22:h1.soru.opt2` | `opts` | Ehliyetini | GEÇTİ |
| 22-009 | gun-22 | `m1:22:h2.kalip0` | `kaliplar.tr` | … nerede? – Burada. (der ile giden eşya) | GEÇTİ |
| 22-010 | gun-22 | `m1:22:h2.kalip1` | `kaliplar.tr` | … nerede? – Orada. (die ile giden eşya) | GEÇTİ |
| 22-011 | gun-22 | `m1:22:h2.kalip2` | `kaliplar.tr` | … nerede? – Yok. (das ile giden eşya) | GEÇTİ |
| 22-012 | gun-22 | `m1:22:h2.sahne` | `ortam_tr` | Mutfak masası. Ioana bir kartı kaldırıyor. | GEÇTİ |
| 22-013 | gun-22 | `m1:22:h2.soru` | `q_tr` | Fincan kimin? | GEÇTİ |
| 22-014 | gun-22 | `m1:22:h2.soru.opt0` | `opts` | Brandl Hanım'ın | GEÇTİ |
| 22-015 | gun-22 | `m1:22:h2.soru.opt1` | `opts` | Şirketin | GEÇTİ |
| 22-016 | gun-22 | `m1:22:h2.soru.opt2` | `opts` | Ioana'nın | GEÇTİ |
| 22-017 | gun-22 | `m1:22:h3.kalip0` | `kaliplar.tr` | …'i topluyorum. – …'i geri veriyorum. | GEÇTİ |
| 22-018 | gun-22 | `m1:22:h3.kalip1` | `kaliplar.tr` | …'i iptal ediyorum. – …'i not ediyorum. | GEÇTİ |
| 22-019 | gun-22 | `m1:22:h3.sahne` | `ortam_tr` | Merdiven boşluğu. Brandl Hanım kapısının önünde. | GEÇTİ |
| 22-020 | gun-22 | `m1:22:h3.soru` | `q_tr` | Fincanı ne zaman geri veriyorsun? | GEÇTİ |
| 22-021 | gun-22 | `m1:22:h3.soru.opt0` | `opts` | Yarın | GEÇTİ |
| 22-022 | gun-22 | `m1:22:h3.soru.opt1` | `opts` | Bugün | GEÇTİ |
| 22-023 | gun-22 | `m1:22:h3.soru.opt2` | `opts` | Cuma günü | GEÇTİ |
| 22-024 | gun-22 | `m1:22:h4.kalip0` | `kaliplar.tr` | … pişiriyorum – … pişiriyor | GEÇTİ |
| 22-025 | gun-22 | `m1:22:h4.kalip1` | `kaliplar.tr` | … ağrıyor. | GEÇTİ |
| 22-026 | gun-22 | `m1:22:h4.sahne` | `ortam_tr` | İş çıkışı, kapının önünde Ioana ile karşılaşıyorsun. | GEÇTİ |
| 22-027 | gun-22 | `m1:22:h4.soru` | `q_tr` | Bisiklet nerede? | GEÇTİ |
| 22-028 | gun-22 | `m1:22:h4.soru.opt0` | `opts` | Tamirhanede | GEÇTİ |
| 22-029 | gun-22 | `m1:22:h4.soru.opt1` | `opts` | Mutfakta | GEÇTİ |
| 22-030 | gun-22 | `m1:22:h4.soru.opt2` | `opts` | Ioana'da | GEÇTİ |
| 22-031 | gun-22 | `m1:22:v1.b1.ana` | `q_tr` | Ioana ne arıyor? | GEÇTİ |
| 22-032 | gun-22 | `m1:22:v1.b1.ana.opt0` | `opts` | Ehliyetini | GEÇTİ |
| 22-033 | gun-22 | `m1:22:v1.b1.ana.opt1` | `opts` | Reçeteyi | GEÇTİ |
| 22-034 | gun-22 | `m1:22:v1.b1.ana.opt2` | `opts` | Bir fincanı | GEÇTİ |
| 22-035 | gun-22 | `m1:22:v1.b1.ay0` | `q_tr` | Ehliyet nerede çıkıyor? | GEÇTİ |
| 22-036 | gun-22 | `m1:22:v1.b1.ay0.opt0` | `opts` | Fincanın yanında | GEÇTİ |
| 22-037 | gun-22 | `m1:22:v1.b1.ay0.opt1` | `opts` | Ceketin içinde | GEÇTİ |
| 22-038 | gun-22 | `m1:22:v1.b1.ay0.opt2` | `opts` | Reçetenin içinde | GEÇTİ |
| 22-039 | gun-22 | `m1:22:v1.b1.ay1` | `q_tr` | Fincan kimin? | GEÇTİ |
| 22-040 | gun-22 | `m1:22:v1.b1.ay1.opt0` | `opts` | Brandl Hanım'ın | GEÇTİ |
| 22-041 | gun-22 | `m1:22:v1.b1.ay1.opt1` | `opts` | Ioana'nın | GEÇTİ |
| 22-042 | gun-22 | `m1:22:v1.b1.ay1.opt2` | `opts` | Dr. Weber'in | GEÇTİ |
| 22-043 | gun-22 | `m1:22:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 22-044 | gun-22 | `m1:22:v1.b1.d5` | `gorev_tr` | Ehliyet ve fincan için Almanca iki kısa cümle yaz. | GEÇTİ |
| 22-045 | gun-22 | `m1:22:v1:c1` | `situation_tr` | Ioana senin reçeteni de soruyor. Senin reçeten dolapta. | GEÇTİ |
| 22-046 | gun-22 | `m1:22:v1:c1` | `why_tr` | **das Rezept** için **es** dersin: **Es ist im Schrank**. | GEÇTİ |
| 22-047 | gun-22 | `m1:22:a1` | `ortam_tr` | Akşam telefonuna Ioana'dan bir mesaj gelmiş. Dün sendeydi. | GEÇTİ |
| 22-048 | gun-22 | `m1:22:a1.b1.ana` | `q_tr` | Ioana neden arıyor? | GEÇTİ |
| 22-049 | gun-22 | `m1:22:a1.b1.ana.opt0` | `opts` | Davetiyesini arıyor | GEÇTİ |
| 22-050 | gun-22 | `m1:22:a1.b1.ana.opt1` | `opts` | Seni pastaya çağırıyor | GEÇTİ |
| 22-051 | gun-22 | `m1:22:a1.b1.ana.opt2` | `opts` | Ehliyetini arıyor | GEÇTİ |
| 22-052 | gun-22 | `m1:22:a1.b1.ay0` | `q_tr` | Davetiye hangi gün için? | GEÇTİ |
| 22-053 | gun-22 | `m1:22:a1.b1.ay0.opt0` | `opts` | Cuma | GEÇTİ |
| 22-054 | gun-22 | `m1:22:a1.b1.ay0.opt1` | `opts` | Pazar | GEÇTİ |
| 22-055 | gun-22 | `m1:22:a1.b1.ay0.opt2` | `opts` | Yarın | GEÇTİ |
| 22-056 | gun-22 | `m1:22:a1.b1.ay1` | `q_tr` | Ioana'ya göre davetiye nerede olabilir? | GEÇTİ |
| 22-057 | gun-22 | `m1:22:a1.b1.ay1.opt0` | `opts` | Mutfakta, pastanın yanında | GEÇTİ |
| 22-058 | gun-22 | `m1:22:a1.b1.ay1.opt1` | `opts` | Ceketin içinde | GEÇTİ |
| 22-059 | gun-22 | `m1:22:a1.b1.ay1.opt2` | `opts` | Dolapta | GEÇTİ |
| 22-060 | gun-22 | `m1:22:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 22-061 | gun-22 | `m1:22:a1.b1.d5` | `gorev_tr` | Ioana'nın mesajını Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 22-062 | gun-22 | `m1:22:a1:c1` | `situation_tr` | Ioana'yı arıyorsun. Davetiye sende, mutfakta. | GEÇTİ |
| 22-063 | gun-22 | `m1:22:a1:c1` | `why_tr` | **die Einladung** için **sie** dersin: **Sie ist hier**. | GEÇTİ |
| 22-064 | gun-22 | `m1:22:a1:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 22-065 | gun-22 | `m1:22:a1:e1.opt0` | `opts` | Mutfağa bak, davetiyeyi bul ve Ioana'ya haber ver. | GEÇTİ |
| 22-066 | gun-22 | `m1:22:a1:e1.opt1` | `opts` | Ioana'ya pasta götür. | GEÇTİ |
| 22-067 | gun-22 | `m1:22:a1:e1.opt2` | `opts` | Cuma günkü daveti iptal et. | GEÇTİ |
| 22-068 | gun-22 | `m1:22:a1:e1` | `why_tr` | Ioana davetiyesini arıyor. Belki senin mutfağında. | GEÇTİ |
| 22-069 | gun-22 | `m1:22:a2` | `ortam_tr` | Alt kattaki komşun Brandl Hanım telefonuna mesaj bırakmış. | GEÇTİ |
| 22-070 | gun-22 | `m1:22:a2.b1.ana` | `q_tr` | Brandl Hanım ne istiyor? | GEÇTİ |
| 22-071 | gun-22 | `m1:22:a2.b1.ana.opt0` | `opts` | Fincanını geri istiyor ve seni pastaya çağırıyor | GEÇTİ |
| 22-072 | gun-22 | `m1:22:a2.b1.ana.opt1` | `opts` | Pasta için para istiyor | GEÇTİ |
| 22-073 | gun-22 | `m1:22:a2.b1.ana.opt2` | `opts` | Mutfağını toplamanı istiyor | GEÇTİ |
| 22-074 | gun-22 | `m1:22:a2.b1.ay0` | `q_tr` | Fincanı ne zaman geri vermelisin? | GEÇTİ |
| 22-075 | gun-22 | `m1:22:a2.b1.ay0.opt0` | `opts` | Yarın | GEÇTİ |
| 22-076 | gun-22 | `m1:22:a2.b1.ay0.opt1` | `opts` | Bugün | GEÇTİ |
| 22-077 | gun-22 | `m1:22:a2.b1.ay0.opt2` | `opts` | Pazar günü | GEÇTİ |
| 22-078 | gun-22 | `m1:22:a2.b1.ay1` | `q_tr` | Pasta için saat kaçta gitmelisin? | GEÇTİ |
| 22-079 | gun-22 | `m1:22:a2.b1.ay1.opt0` | `opts` | Saat dörtte | GEÇTİ |
| 22-080 | gun-22 | `m1:22:a2.b1.ay1.opt1` | `opts` | Saat ikide | GEÇTİ |
| 22-081 | gun-22 | `m1:22:a2.b1.ay1.opt2` | `opts` | Saat beşte | GEÇTİ |
| 22-082 | gun-22 | `m1:22:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 22-083 | gun-22 | `m1:22:a2.b1.d5` | `gorev_tr` | Brandl Hanım'ın mesajını Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 22-084 | gun-22 | `m1:22:a2:c1` | `situation_tr` | Brandl Hanım'la merdivende karşılaşıyorsun. Fincanı yarın geri vereceksin. | GEÇTİ |
| 22-085 | gun-22 | `m1:22:a2:c1` | `why_tr` | **die Tasse** için **sie** dersin. **zurück** cümlenin sonuna gider. | GEÇTİ |
| 22-086 | gun-22 | `m1:22:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 22-087 | gun-22 | `m1:22:a2:e1.opt0` | `opts` | Yarın saat dörtte fincanı alıp Brandl Hanım'a git. | GEÇTİ |
| 22-088 | gun-22 | `m1:22:a2:e1.opt1` | `opts` | Bugün akşam Brandl Hanım'a pasta götür. | GEÇTİ |
| 22-089 | gun-22 | `m1:22:a2:e1.opt2` | `opts` | Fincanı Ioana'ya ver. | GEÇTİ |
| 22-090 | gun-22 | `m1:22:a2:e1` | `why_tr` | Brandl Hanım fincanı yarın istiyor ve seni saat dörtte pastaya çağırıyor. | GEÇTİ |
| 22-091 | gun-22 | `m1:22:p1` | `durum_tr` | Ioana sana uğradı. Dr. Weber'in reçetesini bulamıyorsun. Ioana yardım ediyor ve eşyaları soruyor. | GEÇTİ |
| 22-092 | gun-22 | `m1:22:p1.n1.s0` | `geri_bildirim_tr` | Doğru. **das Rezept** için **es** dedin. | GEÇTİ |
| 22-093 | gun-22 | `m1:22:p1.n1.s1` | `geri_bildirim_tr` | **Rezept** kelimesi **das** ile gider: **das Rezept**. | GEÇTİ |
| 22-094 | gun-22 | `m1:22:p1.n2.s0` | `geri_bildirim_tr` | Güzel. Reçete için yine **es** dedin. | GEÇTİ |
| 22-095 | gun-22 | `m1:22:p1.n2.s1` | `geri_bildirim_tr` | **das Rezept** için **es** dersin, **er** değil. | GEÇTİ |
| 22-096 | gun-22 | `m1:22:p1.n3.s0` | `geri_bildirim_tr` | Evet. Kimden geldiğini de söyledin. | GEÇTİ |
| 22-097 | gun-22 | `m1:22:p1.n3.s1` | `geri_bildirim_tr` | Çok iyi. **die Einladung** için **sie** dedin. | GEÇTİ |
| 22-098 | gun-22 | `m1:22:p1.n3.s2` | `geri_bildirim_tr` | **die Einladung** için **sie** dersin. | GEÇTİ |
| 22-099 | gun-22 | `m1:22:p1.n4.s0` | `geri_bildirim_tr` | Harika. Reçeteyi buldun ve **es** dedin. | GEÇTİ |
| 22-100 | gun-22 | `m1:22:p1.n4.s1` | `geri_bildirim_tr` | Reçete **das Rezept**. Bu yüzden **Da ist es** dersin. | GEÇTİ |
| 22-101 | gun-22 | `m1:22:p1.n5.s0` | `geri_bildirim_tr` | Doğru. **der Kuchen** için **er** dedin. | GEÇTİ |
| 22-102 | gun-22 | `m1:22:p1.n5.s1` | `geri_bildirim_tr` | **der Kuchen** için **er** dersin. | GEÇTİ |
| 22-103 | gun-22 | `m1:22:p1` | `kapanis_tr` | Eşyaları sordun ve buldun. Her eşya için doğru kelimeyi seçtin: er, sie, es. | GERİ |
| 22-104 | gun-22 | `m1:22:o1` | `q_tr` | Brandl Hanım'ın fincanı nerede? | GEÇTİ |
| 22-105 | gun-22 | `m1:22:o1.opt0` | `opts` | Mutfakta | GEÇTİ |
| 22-106 | gun-22 | `m1:22:o1.opt1` | `opts` | Dolapta | GEÇTİ |
| 22-107 | gun-22 | `m1:22:o1.opt2` | `opts` | Ioana'da | GEÇTİ |
| 22-108 | gun-22 | `m1:22:o2` | `q_tr` | Fincanı kim geri veriyor? | GEÇTİ |
| 22-109 | gun-22 | `m1:22:o2.opt0` | `opts` | Ioana | GEÇTİ |
| 22-110 | gun-22 | `m1:22:o2.opt1` | `opts` | Sen | GEÇTİ |
| 22-111 | gun-22 | `m1:22:o2.opt2` | `opts` | Brandl Hanım | GEÇTİ |
| 22-112 | gun-22 | `m1:22:o3` | `q_tr` | Reçete nerede? | GEÇTİ |
| 22-113 | gun-22 | `m1:22:o3.opt0` | `opts` | Dolapta, hapların yanında | GEÇTİ |
| 22-114 | gun-22 | `m1:22:o3.opt1` | `opts` | Mutfak masasında | GEÇTİ |
| 22-115 | gun-22 | `m1:22:o3.opt2` | `opts` | Ceketin içinde | GEÇTİ |
| 22-116 | gun-22 | `m1:22:yazma` | `gorev_tr` | Ioana'ya kısa bir not yaz. Ehliyet dolapta, davetiye fincanın yanında, haplar ceketin içinde. er, sie, es kullan. | GEÇTİ |
| 22-117 | gun-22 | `m1:22:yazma.0` | `kontrol_tr` | Ehliyet için **er** yazdın mı? | GEÇTİ |
| 22-118 | gun-22 | `m1:22:yazma.1` | `kontrol_tr` | Davetiye için **sie** yazdın mı? | GEÇTİ |
| 22-119 | gun-22 | `m1:22:yazma.2` | `kontrol_tr` | Üç eşyanın da yerini yazdın mı? | GEÇTİ |
| 22-120 | gun-22 | `m1:22:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 22-121 | gun-22 | `m1:22:s1` | `why_tr` | **die Tasse** fincan demektir. | GEÇTİ |
| 22-122 | gun-22 | `m1:22:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 22-123 | gun-22 | `m1:22:s2` | `why_tr` | **Ich suche** arıyorum demektir. | GEÇTİ |
| 22-124 | gun-22 | `m1:22:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 22-125 | gun-22 | `m1:22:s3` | `why_tr` | **das Amt** resmî daire demektir. | GEÇTİ |
| 22-126 | gun-22 | `m1:22:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 22-127 | gun-22 | `m1:22:s4` | `why_tr` | **backt** fırında pişiriyor demektir. | GEÇTİ |
| 22-128 | gun-22 | `m1:22:s5` | `why_tr` | **das Rezept** için soruda da **es** gelir: **Ist es in der Küche?** | GEÇTİ |
| 22-129 | gun-22 | `m1:22:s6` | `why_tr` | Tamirhanede derken **in der Werkstatt** dersin. | GEÇTİ |
| 22-130 | gun-22 | `m1:22:s7` | `why_tr` | **absagen** cümlede ikiye ayrılır: **Ich sage den Termin ab**. | GEÇTİ |
| 22-131 | gun-22 | `m1:22:s8` | `why_tr` | **aufschreiben** cümlede ikiye ayrılır: **Ich schreibe die Nummer auf**. | GEÇTİ |
| 22-132 | gun-22 | `m1:22:s9` | `situation_tr` | Ioana fincanını soruyor. Fincan mutfakta. | GEÇTİ |
| 22-133 | gun-22 | `m1:22:s9` | `why_tr` | **die Tasse** için **sie** dersin. | GEÇTİ |
| 22-134 | gun-22 | `m1:22:s10` | `situation_tr` | Brandl Hanım fincanını soruyor. Yarın geri veriyorsun. | GEÇTİ |
| 22-135 | gun-22 | `m1:22:s10` | `why_tr` | **zurückgeben** ikiye ayrılır: **Ich gebe sie morgen zurück**. | GEÇTİ |
| 22-136 | gun-22 | `m1:22:s11` | `situation_tr` | Ioana ehliyeti ve davetiyeyi soruyor. Ehliyet ceketin içinde, davetiye dolapta. İkisini de er ve sie ile söyle. | GEÇTİ |
| 22-137 | gun-22 | `m1:22:s11` | `why_tr` | **der Führerschein** için **er**, **die Einladung** için **sie** dersin. | GEÇTİ |
| 23-001 | gun-23 | `g23` | `goal_tr` | Bir eşyanın büyük, küçük, yeni ya da güzel olduğunu söyler, birine Wie findest du diye fikrini sorarsın. | GERİ |
| 23-002 | gun-23 | `g23` | `can_do.tr` | Bir eşyayı büyüklüğü ve görünüşüyle anlatırım. | GEÇTİ |
| 23-003 | gun-23 | `m1:23:h1.kalip0` | `kaliplar.tr` | …'i nasıl buluyorsun? – Bence güzel. | GEÇTİ |
| 23-004 | gun-23 | `m1:23:h1.kalip1` | `kaliplar.tr` | Bence o … (die ile) – Bence o … (das ile) | GEÇTİ |
| 23-005 | gun-23 | `m1:23:h1.kalip2` | `kaliplar.tr` | Merhaba! (Bavyera'da sık) | GEÇTİ |
| 23-006 | gun-23 | `m1:23:h1.sahne` | `ortam_tr` | Apartmanın koridoru. Yeni komşunun kanepesi koridorda duruyor. Pichler Bey yanına geliyor. | GEÇTİ |
| 23-007 | gun-23 | `m1:23:h1.soru` | `q_tr` | Pichler Bey'e göre sorun ne? | GEÇTİ |
| 23-008 | gun-23 | `m1:23:h1.soru.opt0` | `opts` | Koridor küçük, kanepe büyük. | GEÇTİ |
| 23-009 | gun-23 | `m1:23:h1.soru.opt1` | `opts` | Kanepe çok eski. | GEÇTİ |
| 23-010 | gun-23 | `m1:23:h1.soru.opt2` | `opts` | Koridor karanlık. | GEÇTİ |
| 23-011 | gun-23 | `m1:23:h2.sahne` | `ortam_tr` | Cumartesi, şehir meydanındaki sebze tezgâhı. Derya yanında. | GEÇTİ |
| 23-012 | gun-23 | `m1:23:h2.soru` | `q_tr` | Hangisi ucuz? | GEÇTİ |
| 23-013 | gun-23 | `m1:23:h2.soru.opt0` | `opts` | Muzlar | GEÇTİ |
| 23-014 | gun-23 | `m1:23:h2.soru.opt1` | `opts` | Domatesler | GEÇTİ |
| 23-015 | gun-23 | `m1:23:h2.soru.opt2` | `opts` | İkisi de | GEÇTİ |
| 23-016 | gun-23 | `m1:23:h3.sahne` | `ortam_tr` | İş yerinde mola. Derya seninle sohbet ediyor. | GEÇTİ |
| 23-017 | gun-23 | `m1:23:h3.soru` | `q_tr` | Derya'ya göre senin hobin ne? | GEÇTİ |
| 23-018 | gun-23 | `m1:23:h3.soru.opt0` | `opts` | Almanca kursu | GEÇTİ |
| 23-019 | gun-23 | `m1:23:h3.soru.opt1` | `opts` | Bisiklet sürmek | GEÇTİ |
| 23-020 | gun-23 | `m1:23:h3.soru.opt2` | `opts` | Pasta yapmak | GEÇTİ |
| 23-021 | gun-23 | `m1:23:h4.sahne` | `ortam_tr` | Merdiven. Brandl Hanım yeni komşuyu anlatıyor. | GEÇTİ |
| 23-022 | gun-23 | `m1:23:h4.soru` | `q_tr` | Komşu ocaktan itibaren ne oluyor? | GEÇTİ |
| 23-023 | gun-23 | `m1:23:h4.soru.opt0` | `opts` | Teknisyen | GEÇTİ |
| 23-024 | gun-23 | `m1:23:h4.soru.opt1` | `opts` | Satıcı | GEÇTİ |
| 23-025 | gun-23 | `m1:23:h4.soru.opt2` | `opts` | Kurs öğrencisi | GEÇTİ |
| 23-026 | gun-23 | `m1:23:v1.b1.ana` | `q_tr` | Pichler Bey ile Brandl Hanım neyi konuşuyor? | GEÇTİ |
| 23-027 | gun-23 | `m1:23:v1.b1.ana.opt0` | `opts` | Koridordaki kanepeyi ve yeni komşuyu | GEÇTİ |
| 23-028 | gun-23 | `m1:23:v1.b1.ana.opt1` | `opts` | Kirayı | GEÇTİ |
| 23-029 | gun-23 | `m1:23:v1.b1.ana.opt2` | `opts` | Noel kutlamasını | GEÇTİ |
| 23-030 | gun-23 | `m1:23:v1.b1.ay0` | `q_tr` | Pichler Bey kanepeyi nasıl buluyor? | GEÇTİ |
| 23-031 | gun-23 | `m1:23:v1.b1.ay0.opt0` | `opts` | Güzel ama koridorda olmamalı | GEÇTİ |
| 23-032 | gun-23 | `m1:23:v1.b1.ay0.opt1` | `opts` | Çirkin | GEÇTİ |
| 23-033 | gun-23 | `m1:23:v1.b1.ay0.opt2` | `opts` | Fazla küçük | GEÇTİ |
| 23-034 | gun-23 | `m1:23:v1.b1.ay1` | `q_tr` | Teknisyen ne zaman geliyor? | GEÇTİ |
| 23-035 | gun-23 | `m1:23:v1.b1.ay1.opt0` | `opts` | Yarın saat sekizde | GEÇTİ |
| 23-036 | gun-23 | `m1:23:v1.b1.ay1.opt1` | `opts` | Bugün saat sekizde | GEÇTİ |
| 23-037 | gun-23 | `m1:23:v1.b1.ay1.opt2` | `opts` | Pazartesi | GEÇTİ |
| 23-038 | gun-23 | `m1:23:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 23-039 | gun-23 | `m1:23:v1.b1.d5` | `gorev_tr` | Kanepeyi Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 23-040 | gun-23 | `m1:23:v1:c1` | `situation_tr` | Brandl Hanım sana da soruyor. Kanepeyi güzel buluyorsun. | GEÇTİ |
| 23-041 | gun-23 | `m1:23:v1:c1` | `why_tr` | **das Sofa** için **Ich finde es schön** dersin. Sıfat değişmez. | GERİ |
| 23-042 | gun-23 | `m1:23:a1` | `ortam_tr` | Pichler Bey sabah erkenden telefonuna mesaj bırakmış. Kanepenin kimin olduğunu henüz bilmiyor. | GEÇTİ |
| 23-043 | gun-23 | `m1:23:a1.b1.ana` | `q_tr` | Pichler Bey neden arıyor? | GEÇTİ |
| 23-044 | gun-23 | `m1:23:a1.b1.ana.opt0` | `opts` | Teknisyen geliyor ve kanepeyi soruyor | GEÇTİ |
| 23-045 | gun-23 | `m1:23:a1.b1.ana.opt1` | `opts` | Kirayı istiyor | GEÇTİ |
| 23-046 | gun-23 | `m1:23:a1.b1.ana.opt2` | `opts` | Seni pastaya çağırıyor | GEÇTİ |
| 23-047 | gun-23 | `m1:23:a1.b1.ay0` | `q_tr` | Teknisyen nereye bakacak? | GEÇTİ |
| 23-048 | gun-23 | `m1:23:a1.b1.ay0.opt0` | `opts` | Mutfağa | GEÇTİ |
| 23-049 | gun-23 | `m1:23:a1.b1.ay0.opt1` | `opts` | Koridora | GEÇTİ |
| 23-050 | gun-23 | `m1:23:a1.b1.ay0.opt2` | `opts` | Kanepeye | GEÇTİ |
| 23-051 | gun-23 | `m1:23:a1.b1.ay1` | `q_tr` | Teknisyen ne kadar kalacak? | GEÇTİ |
| 23-052 | gun-23 | `m1:23:a1.b1.ay1.opt0` | `opts` | On dakika | GEÇTİ |
| 23-053 | gun-23 | `m1:23:a1.b1.ay1.opt1` | `opts` | Bir saat | GEÇTİ |
| 23-054 | gun-23 | `m1:23:a1.b1.ay1.opt2` | `opts` | Yarım saat | GEÇTİ |
| 23-055 | gun-23 | `m1:23:a1.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 23-056 | gun-23 | `m1:23:a1.b1.d5` | `gorev_tr` | Pichler Bey'in mesajını Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 23-057 | gun-23 | `m1:23:a1:c1` | `situation_tr` | Pichler Bey'i geri arıyorsun. Kanepe senin değil. | GEÇTİ |
| 23-058 | gun-23 | `m1:23:a1:c1` | `why_tr` | **das Sofa** için **es** dersin: **Es ist nicht von mir**. | GEÇTİ |
| 23-059 | gun-23 | `m1:23:a1:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 23-060 | gun-23 | `m1:23:a1:e1.opt0` | `opts` | Yarın sekizde evde ol, mutfağı aç ve kanepenin kimin olduğunu söyle. | GEÇTİ |
| 23-061 | gun-23 | `m1:23:a1:e1.opt1` | `opts` | Kanepeyi kendi evine taşı. | GEÇTİ |
| 23-062 | gun-23 | `m1:23:a1:e1.opt2` | `opts` | Teknisyeni pazartesiye çağır. | GEÇTİ |
| 23-063 | gun-23 | `m1:23:a1:e1` | `why_tr` | Teknisyen yarın sekizde mutfağına geliyor. Pichler Bey kanepeyi de soruyor. | GEÇTİ |
| 23-064 | gun-23 | `m1:23:a2` | `ortam_tr` | Sabah mutfakta yerel radyo açık. Kısa bir reklam çıkıyor. | GEÇTİ |
| 23-065 | gun-23 | `m1:23:a2.b1.ana` | `q_tr` | Reklam ne söylüyor? | GEÇTİ |
| 23-066 | gun-23 | `m1:23:a2.b1.ana.opt0` | `opts` | Bugün sebze ve meyve ucuz | GEÇTİ |
| 23-067 | gun-23 | `m1:23:a2.b1.ana.opt1` | `opts` | Dükkân bugün kapalı | GEÇTİ |
| 23-068 | gun-23 | `m1:23:a2.b1.ana.opt2` | `opts` | Yeni bir satıcı arıyorlar | GEÇTİ |
| 23-069 | gun-23 | `m1:23:a2.b1.ay0` | `q_tr` | Bir kilo domates kaç avro? | GEÇTİ |
| 23-070 | gun-23 | `m1:23:a2.b1.ay0.opt0` | `opts` | İki avro | GEÇTİ |
| 23-071 | gun-23 | `m1:23:a2.b1.ay0.opt1` | `opts` | Bir avro elli | GEÇTİ |
| 23-072 | gun-23 | `m1:23:a2.b1.ay0.opt2` | `opts` | Altı avro | GEÇTİ |
| 23-073 | gun-23 | `m1:23:a2.b1.ay1` | `q_tr` | Dükkân saat kaça kadar açık? | GEÇTİ |
| 23-074 | gun-23 | `m1:23:a2.b1.ay1.opt0` | `opts` | Altıya kadar | GEÇTİ |
| 23-075 | gun-23 | `m1:23:a2.b1.ay1.opt1` | `opts` | Sekize kadar | GEÇTİ |
| 23-076 | gun-23 | `m1:23:a2.b1.ay1.opt2` | `opts` | İkiye kadar | GEÇTİ |
| 23-077 | gun-23 | `m1:23:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 23-078 | gun-23 | `m1:23:a2.b1.d5` | `gorev_tr` | Reklamı Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 23-079 | gun-23 | `m1:23:a2:c1` | `situation_tr` | Tobi soruyor. Reklama göre domates bugün çok ucuz. | GEÇTİ |
| 23-080 | gun-23 | `m1:23:a2:c1` | `why_tr` | **die Tomaten** çoğul. Bu yüzden **sie sind** dersin. | GERİ |
| 23-081 | gun-23 | `m1:23:a2:e1` | `q_tr` | Ucuz domates almak istiyorsun. Ne yapmalısın? | GEÇTİ |
| 23-082 | gun-23 | `m1:23:a2:e1.opt0` | `opts` | Bugün saat altıdan önce git. | GEÇTİ |
| 23-083 | gun-23 | `m1:23:a2:e1.opt1` | `opts` | Yarın git. | GEÇTİ |
| 23-084 | gun-23 | `m1:23:a2:e1.opt2` | `opts` | Bu akşam saat sekizde git. | GEÇTİ |
| 23-085 | gun-23 | `m1:23:a2:e1` | `why_tr` | Domates bugün ucuz. Dükkân saat altıya kadar açık. | GEÇTİ |
| 23-086 | gun-23 | `m1:23:p1` | `durum_tr` | Ceketini apartmanda bir yerde unuttun. Koridorda Pichler Bey'le karşılaşıyorsun. Ceketin büyük, yeni ve açık renk. | GEÇTİ |
| 23-087 | gun-23 | `m1:23:p1.n1.s0` | `geri_bildirim_tr` | Açık ve kısa. Pichler Bey ne aradığını hemen anladı. | GEÇTİ |
| 23-088 | gun-23 | `m1:23:p1.n1.s1` | `geri_bildirim_tr` | **die Jacke** için **sie** dersin: **Sie ist weg**. | GEÇTİ |
| 23-089 | gun-23 | `m1:23:p1.n2.s0` | `geri_bildirim_tr` | Çok iyi. **sie** ile başladın, sıfatlar değişmedi. | GERİ |
| 23-090 | gun-23 | `m1:23:p1.n2.s1` | `geri_bildirim_tr` | Olur. Ama büyüklüğünü de söylersen Pichler Bey daha kolay bulur. | GEÇTİ |
| 23-091 | gun-23 | `m1:23:p1.n2.s2` | `geri_bildirim_tr` | **die Jacke** için **sie** dersin, **er** değil. | GEÇTİ |
| 23-092 | gun-23 | `m1:23:p1.n3.s0` | `geri_bildirim_tr` | Güzel. Farkı sıfatlarla açıkça söyledin. | GERİ |
| 23-093 | gun-23 | `m1:23:p1.n3.s1` | `geri_bildirim_tr` | Doğru. Kısa ve kibar bir hayır. | GEÇTİ |
| 23-094 | gun-23 | `m1:23:p1.n3.s2` | `geri_bildirim_tr` | Senin ceketin yeni ve büyük. Bu ceket eski ve küçük. | GEÇTİ |
| 23-095 | gun-23 | `m1:23:p1.n4.s0` | `geri_bildirim_tr` | Harika. Ceketi buldun ve teşekkür ettin. | GEÇTİ |
| 23-096 | gun-23 | `m1:23:p1.n4.s1` | `geri_bildirim_tr` | Ceket **die Jacke**. Bu yüzden **Das ist sie** dersin. | GEÇTİ |
| 23-097 | gun-23 | `m1:23:p1.n5.s0` | `geri_bildirim_tr` | Doğru. **der Flur** için **er** dedin. | GEÇTİ |
| 23-098 | gun-23 | `m1:23:p1.n5.s1` | `geri_bildirim_tr` | Kısa ve doğal bir cevap. | GEÇTİ |
| 23-099 | gun-23 | `m1:23:p1.n5.s2` | `geri_bildirim_tr` | **der Flur** için **er** dersin. | GEÇTİ |
| 23-100 | gun-23 | `m1:23:p1` | `kapanis_tr` | Kaybolan ceketini büyüklüğü ve görünüşüyle anlattın, doğru olanı tanıdın. | GEÇTİ |
| 23-101 | gun-23 | `m1:23:o1` | `q_tr` | Cumartesi ne ucuz? | GEÇTİ |
| 23-102 | gun-23 | `m1:23:o1.opt0` | `opts` | Domates ve muz | GEÇTİ |
| 23-103 | gun-23 | `m1:23:o1.opt1` | `opts` | Kanepe | GEÇTİ |
| 23-104 | gun-23 | `m1:23:o1.opt2` | `opts` | Ekmek | GEÇTİ |
| 23-105 | gun-23 | `m1:23:o2` | `q_tr` | Derya'nın kanepesi nasıl? | GEÇTİ |
| 23-106 | gun-23 | `m1:23:o2.opt0` | `opts` | Yeni, büyük ve açık renk | GEÇTİ |
| 23-107 | gun-23 | `m1:23:o2.opt1` | `opts` | Eski ve küçük | GEÇTİ |
| 23-108 | gun-23 | `m1:23:o2.opt2` | `opts` | Yeni ama küçük | GEÇTİ |
| 23-109 | gun-23 | `m1:23:o3` | `q_tr` | Derya seni ne zaman çağırıyor? | GEÇTİ |
| 23-110 | gun-23 | `m1:23:o3.opt0` | `opts` | Cumartesi saat dörtte | GEÇTİ |
| 23-111 | gun-23 | `m1:23:o3.opt1` | `opts` | Pazartesi saat dörtte | GEÇTİ |
| 23-112 | gun-23 | `m1:23:o3.opt2` | `opts` | Cumartesi sabah | GEÇTİ |
| 23-113 | gun-23 | `m1:23:o4` | `situation_tr` | Derya'ya cevap ver. Evet, saat dörtte geliyorsun. | GEÇTİ |
| 23-114 | gun-23 | `m1:23:o4` | `why_tr` | Önce evet de, sonra saati tekrar et. | GEÇTİ |
| 23-115 | gun-23 | `m1:23:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 23-116 | gun-23 | `m1:23:s1` | `why_tr` | **hell** aydınlık demektir. | GEÇTİ |
| 23-117 | gun-23 | `m1:23:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 23-118 | gun-23 | `m1:23:s2` | `why_tr` | Çoğulda **sind** gelir, sıfat değişmez. | GERİ |
| 23-119 | gun-23 | `m1:23:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 23-120 | gun-23 | `m1:23:s3` | `why_tr` | **arbeitslos** işsiz demektir. | GEÇTİ |
| 23-121 | gun-23 | `m1:23:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 23-122 | gun-23 | `m1:23:s4` | `why_tr` | **der Techniker** teknisyen demektir. | GEÇTİ |
| 23-123 | gun-23 | `m1:23:s5` | `why_tr` | **ist** ile gelen sıfat değişmez: **Das Sofa ist neu**. | GERİ |
| 23-124 | gun-23 | `m1:23:s6` | `why_tr` | Fikir sorarken **Wie findest du** dersin. | GEÇTİ |
| 23-125 | gun-23 | `m1:23:s7` | `why_tr` | Resmî tatil derken **Feiertag** dersin. | GEÇTİ |
| 23-126 | gun-23 | `m1:23:s8` | `why_tr` | Kadın iş arkadaşı için **die Kollegin** dersin. | GEÇTİ |
| 23-127 | gun-23 | `m1:23:s9` | `situation_tr` | Ioana mutfağını nasıl bulduğunu soruyor. Büyük ve aydınlık buluyorsun. | GEÇTİ |
| 23-128 | gun-23 | `m1:23:s9` | `why_tr` | **die Küche** için **Ich finde sie** dersin. | GEÇTİ |
| 23-129 | gun-23 | `m1:23:s10` | `situation_tr` | Yeni komşu kendini tanıtıyor. Sen de adını söyle ve memnun olduğunu belirt. | GEÇTİ |
| 23-130 | gun-23 | `m1:23:s10` | `why_tr` | Tanışırken adını söyle, sonra **Freut mich** de. | GEÇTİ |
| 23-131 | gun-23 | `m1:23:s11` | `situation_tr` | Pichler Bey kayıp ceketinin nasıl olduğunu soruyor. Büyük ve yeni. | GEÇTİ |
| 23-132 | gun-23 | `m1:23:s11` | `why_tr` | **die Jacke** için **sie** dersin. Sıfatlar **ist** ile değişmez. | GERİ |
| 24-001 | gun-24 | `g24` | `goal_tr` | Bir ev ya da eşya için çok güzel, fazla pahalı ya da iyi değil der, ev sorunlarını kısaca anlatırsın. | GERİ |
| 24-002 | gun-24 | `g24` | `can_do.tr` | Bir şeyin çok, fazla ya da değil olduğunu söylerim. | GERİ |
| 24-003 | gun-24 | `m1:24:h1.kalip0` | `kaliplar.tr` | çok … – fazla …, sorun var – … değil | GEÇTİ |
| 24-004 | gun-24 | `m1:24:h1.kalip1` | `kaliplar.tr` | oldukça … | GEÇTİ |
| 24-005 | gun-24 | `m1:24:h1.sahne` | `ortam_tr` | İş yerinde mola. Tobi yorgun görünüyor. | GEÇTİ |
| 24-006 | gun-24 | `m1:24:h1.soru` | `q_tr` | Tobi'nin sorunu ne? | GEÇTİ |
| 24-007 | gun-24 | `m1:24:h1.soru.opt0` | `opts` | Mutfakta küf var, kimse ilgilenmiyor. | GEÇTİ |
| 24-008 | gun-24 | `m1:24:h1.soru.opt1` | `opts` | Kira çok yüksek. | GEÇTİ |
| 24-009 | gun-24 | `m1:24:h1.soru.opt2` | `opts` | Komşular gürültülü. | GEÇTİ |
| 24-010 | gun-24 | `m1:24:h2.sahne` | `ortam_tr` | Sabah, ofiste. Derya bilgisayarın başında. | GEÇTİ |
| 24-011 | gun-24 | `m1:24:h2.soru` | `q_tr` | Arıza ne zaman bitiyor? | GEÇTİ |
| 24-012 | gun-24 | `m1:24:h2.soru.opt0` | `opts` | Saat ondan itibaren | GEÇTİ |
| 24-013 | gun-24 | `m1:24:h2.soru.opt1` | `opts` | Pazartesiden itibaren | GEÇTİ |
| 24-014 | gun-24 | `m1:24:h2.soru.opt2` | `opts` | Öğleden sonra | GEÇTİ |
| 24-015 | gun-24 | `m1:24:h3.kalip0` | `kaliplar.tr` | …'i nasıl buluyorsun? – Bence … fazla … | GEÇTİ |
| 24-016 | gun-24 | `m1:24:h3.sahne` | `ortam_tr` | Apartmanın önü. Brandl Hanım yeni komşuları soruyor. | GEÇTİ |
| 24-017 | gun-24 | `m1:24:h3.soru` | `q_tr` | Brandl Hanım komşular için ne diyor? | GEÇTİ |
| 24-018 | gun-24 | `m1:24:h3.soru.opt0` | `opts` | Onun için fazla gençler. | GEÇTİ |
| 24-019 | gun-24 | `m1:24:h3.soru.opt1` | `opts` | Çok yaşlılar. | GEÇTİ |
| 24-020 | gun-24 | `m1:24:h3.soru.opt2` | `opts` | Hiç konuşmuyorlar. | GEÇTİ |
| 24-021 | gun-24 | `m1:24:v1.b1.ana` | `q_tr` | Tobi neden mutsuz? | GEÇTİ |
| 24-022 | gun-24 | `m1:24:v1.b1.ana.opt0` | `opts` | Mutfağında küf var ve kimse ilgilenmiyor | GEÇTİ |
| 24-023 | gun-24 | `m1:24:v1.b1.ana.opt1` | `opts` | İşini kaybetti | GEÇTİ |
| 24-024 | gun-24 | `m1:24:v1.b1.ana.opt2` | `opts` | Kursu bitti | GEÇTİ |
| 24-025 | gun-24 | `m1:24:v1.b1.ay0` | `q_tr` | İstasyonun oradaki yer neden Tobi'ye uymuyor? | GEÇTİ |
| 24-026 | gun-24 | `m1:24:v1.b1.ay0.opt0` | `opts` | Fazla pahalı ve mutfağı küçük | GEÇTİ |
| 24-027 | gun-24 | `m1:24:v1.b1.ay0.opt1` | `opts` | Çok uzak | GEÇTİ |
| 24-028 | gun-24 | `m1:24:v1.b1.ay0.opt2` | `opts` | Karanlık | GEÇTİ |
| 24-029 | gun-24 | `m1:24:v1.b1.ay1` | `q_tr` | Tobi yarın ne yapacak? | GEÇTİ |
| 24-030 | gun-24 | `m1:24:v1.b1.ay1.opt0` | `opts` | Apartman görevlisine gidecek | GEÇTİ |
| 24-031 | gun-24 | `m1:24:v1.b1.ay1.opt1` | `opts` | Yeni eve taşınacak | GEÇTİ |
| 24-032 | gun-24 | `m1:24:v1.b1.ay1.opt2` | `opts` | Ev sahibini arayacak | GEÇTİ |
| 24-033 | gun-24 | `m1:24:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 24-034 | gun-24 | `m1:24:v1.b1.d5` | `gorev_tr` | Tobi'nin derdini Almanca iki kısa cümleyle yaz. | GEÇTİ |
| 24-035 | gun-24 | `m1:24:v1:c1` | `situation_tr` | Derya sana soruyor. 800 avroyu fazla pahalı buluyorsun. | GEÇTİ |
| 24-036 | gun-24 | `m1:24:v1:c1` | `why_tr` | Sorun varsa **zu** dersin: **zu teuer**. **sehr teuer** yalnızca çok pahalı demek. | GEÇTİ |
| 24-037 | gun-24 | `m1:24:a1` | `ortam_tr` | Sabah telefonunda Pichler Bey'den bütün kiracılara giden bir sesli mesaj var. | GEÇTİ |
| 24-038 | gun-24 | `m1:24:a1.b1.ana` | `q_tr` | Mesaj ne hakkında? | GEÇTİ |
| 24-039 | gun-24 | `m1:24:a1.b1.ana.opt0` | `opts` | Apartmanda bir arıza var, teknisyen geliyor | GEÇTİ |
| 24-040 | gun-24 | `m1:24:a1.b1.ana.opt1` | `opts` | Kira artıyor | GEÇTİ |
| 24-041 | gun-24 | `m1:24:a1.b1.ana.opt2` | `opts` | Yeni bir komşu geliyor | GEÇTİ |
| 24-042 | gun-24 | `m1:24:a1.b1.ay0` | `q_tr` | Teknisyen saat kaçta geliyor? | GEÇTİ |
| 24-043 | gun-24 | `m1:24:a1.b1.ay0.opt0` | `opts` | Onda | GEÇTİ |
| 24-044 | gun-24 | `m1:24:a1.b1.ay0.opt1` | `opts` | On ikide | GEÇTİ |
| 24-045 | gun-24 | `m1:24:a1.b1.ay0.opt2` | `opts` | İkide | GEÇTİ |
| 24-046 | gun-24 | `m1:24:a1.b1.ay1` | `q_tr` | Ne zamandan itibaren her şey yine iyi? | GEÇTİ |
| 24-047 | gun-24 | `m1:24:a1.b1.ay1.opt0` | `opts` | On ikiden itibaren | GEÇTİ |
| 24-048 | gun-24 | `m1:24:a1.b1.ay1.opt1` | `opts` | Ondan itibaren | GEÇTİ |
| 24-049 | gun-24 | `m1:24:a1.b1.ay1.opt2` | `opts` | Yarından itibaren | GEÇTİ |
| 24-050 | gun-24 | `m1:24:a1.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 24-051 | gun-24 | `m1:24:a1.b1.d5` | `gorev_tr` | Mesajı Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 24-052 | gun-24 | `m1:24:a1:c1` | `situation_tr` | Brandl Hanım merdivende soruyor. Arıza kötü değil, on ikiden itibaren her şey iyi. | GEÇTİ |
| 24-053 | gun-24 | `m1:24:a1:c1` | `why_tr` | Kötü değil derken **nicht schlimm** dersin. | GEÇTİ |
| 24-054 | gun-24 | `m1:24:a1:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 24-055 | gun-24 | `m1:24:a1:e1.opt0` | `opts` | Hiç endişelenme, on ikiden sonra her şey yine normal. | GEÇTİ |
| 24-056 | gun-24 | `m1:24:a1:e1.opt1` | `opts` | Hemen ev sahibini ara. | GEÇTİ |
| 24-057 | gun-24 | `m1:24:a1:e1.opt2` | `opts` | Bugün evden çık ve yarın dön. | GEÇTİ |
| 24-058 | gun-24 | `m1:24:a1:e1` | `why_tr` | Arıza kötü değil. Teknisyen onda geliyor, on ikiden sonra her şey iyi. | GEÇTİ |
| 24-059 | gun-24 | `m1:24:a2` | `ortam_tr` | Akşam telefonuna Tobi'den bir mesaj gelmiş. Hızlı konuşuyor. | GEÇTİ |
| 24-060 | gun-24 | `m1:24:a2.b1.ana` | `q_tr` | Tobi neden arıyor? | GEÇTİ |
| 24-061 | gun-24 | `m1:24:a2.b1.ana.opt0` | `opts` | Bir evi birlikte görmek için | GEÇTİ |
| 24-062 | gun-24 | `m1:24:a2.b1.ana.opt1` | `opts` | Borç para istemek için | GEÇTİ |
| 24-063 | gun-24 | `m1:24:a2.b1.ana.opt2` | `opts` | Küfü anlatmak için | GEÇTİ |
| 24-064 | gun-24 | `m1:24:a2.b1.ay0` | `q_tr` | Brunnengasse'deki yer nasıl? | GEÇTİ |
| 24-065 | gun-24 | `m1:24:a2.b1.ay0.opt0` | `opts` | Pahalı değil, oldukça eski ama aydınlık | GEÇTİ |
| 24-066 | gun-24 | `m1:24:a2.b1.ay0.opt1` | `opts` | Çok pahalı ve büyük | GEÇTİ |
| 24-067 | gun-24 | `m1:24:a2.b1.ay0.opt2` | `opts` | Yeni ama karanlık | GEÇTİ |
| 24-068 | gun-24 | `m1:24:a2.b1.ay1` | `q_tr` | Nerede ve ne zaman buluşuyorsunuz? | GEÇTİ |
| 24-069 | gun-24 | `m1:24:a2.b1.ay1.opt0` | `opts` | Cumartesi saat onda, Brunnengasse'de | GEÇTİ |
| 24-070 | gun-24 | `m1:24:a2.b1.ay1.opt1` | `opts` | Cumartesi saat onda, istasyonda | GEÇTİ |
| 24-071 | gun-24 | `m1:24:a2.b1.ay1.opt2` | `opts` | Pazar saat onda, Brunnengasse'de | GEÇTİ |
| 24-072 | gun-24 | `m1:24:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 24-073 | gun-24 | `m1:24:a2.b1.d5` | `gorev_tr` | Brunnengasse'deki yeri Almanca bir iki kısa cümleyle anlat. | GEÇTİ |
| 24-074 | gun-24 | `m1:24:a2:c1` | `situation_tr` | Tobi'yi geri arıyorsun. Cumartesi saat on sana uyuyor. | GEÇTİ |
| 24-075 | gun-24 | `m1:24:a2:c1` | `why_tr` | Evet de, sonra saati ve yeri tekrar et. | GEÇTİ |
| 24-076 | gun-24 | `m1:24:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 24-077 | gun-24 | `m1:24:a2:e1.opt0` | `opts` | Cumartesi saat onda Brunnengasse'de ol. | GEÇTİ |
| 24-078 | gun-24 | `m1:24:a2:e1.opt1` | `opts` | Cumartesi saat onda istasyona git. | GEÇTİ |
| 24-079 | gun-24 | `m1:24:a2:e1.opt2` | `opts` | Tobi'ye para gönder. | GEÇTİ |
| 24-080 | gun-24 | `m1:24:a2:e1` | `why_tr` | Tobi seni cumartesi saat onda Brunnengasse'de bekliyor. | GEÇTİ |
| 24-081 | gun-24 | `m1:24:p1` | `durum_tr` | Molada Tobi ev derdini anlatıyor ve istasyonun oradaki yer için fikrini soruyor. Sen çok, fazla ve değil ile cevap veriyorsun. | GEÇTİ |
| 24-082 | gun-24 | `m1:24:p1.n1.s0` | `geri_bildirim_tr` | Doğru. **sehr** ile güçlendirdin. | GEÇTİ |
| 24-083 | gun-24 | `m1:24:p1.n1.s1` | `geri_bildirim_tr` | Çok iyi. **nicht gut** dedin ve bir çözüm önerdin. | GEÇTİ |
| 24-084 | gun-24 | `m1:24:p1.n1.s2` | `geri_bildirim_tr` | Küf iyi bir şey değil. **nicht gut** ya da **sehr schlimm** de. | GEÇTİ |
| 24-085 | gun-24 | `m1:24:p1.n2.s0` | `geri_bildirim_tr` | Doğru. Sorun olduğu için **zu teuer** dedin. | GEÇTİ |
| 24-086 | gun-24 | `m1:24:p1.n2.s1` | `geri_bildirim_tr` | Güzel. **sehr teuer** pahalı ama belki alınabilir demek. | GEÇTİ |
| 24-087 | gun-24 | `m1:24:p1.n2.s2` | `geri_bildirim_tr` | 800 avro ucuz değil. Burada **zu teuer** ya da **sehr teuer** dersin. | GEÇTİ |
| 24-088 | gun-24 | `m1:24:p1.n3.s0` | `geri_bildirim_tr` | Güzel. **nicht schlimm** ile Tobi'yi rahatlattın. | GEÇTİ |
| 24-089 | gun-24 | `m1:24:p1.n3.s1` | `geri_bildirim_tr` | İyi bir soru. **zu klein** sorun var mı diye sorar. | GERİ |
| 24-090 | gun-24 | `m1:24:p1.n3.s2` | `geri_bildirim_tr` | Aydınlık mutfak iyi bir şey. **zu** yalnızca bir sorun varsa gelir. | GEÇTİ |
| 24-091 | gun-24 | `m1:24:p1.n4.s0` | `geri_bildirim_tr` | Doğru. İyi bir şey için **sehr gut** dersin. | GEÇTİ |
| 24-092 | gun-24 | `m1:24:p1.n4.s1` | `geri_bildirim_tr` | Kısa ve sıcak bir cevap. | GEÇTİ |
| 24-093 | gun-24 | `m1:24:p1.n4.s2` | `geri_bildirim_tr` | **zu** bir sorun bildirir. İyi bir şey için **sehr gut** de. | GEÇTİ |
| 24-094 | gun-24 | `m1:24:p1.n5.s0` | `geri_bildirim_tr` | Açık bir fikir. Nedenini de **zu teuer** ile söyledin. | GEÇTİ |
| 24-095 | gun-24 | `m1:24:p1.n5.s1` | `geri_bildirim_tr` | Akıllıca. Önce depozitoyu sormak doğru. | GEÇTİ |
| 24-096 | gun-24 | `m1:24:p1` | `kapanis_tr` | Tobi'ye fikrini söyledin. sehr, zu ve nicht arasındaki farkı doğru kullandın. | GEÇTİ |
| 24-097 | gun-24 | `m1:24:o1` | `q_tr` | Ev sahibi küf için ne düşünüyor? | GEÇTİ |
| 24-098 | gun-24 | `m1:24:o1.opt0` | `opts` | Kötü değil | GEÇTİ |
| 24-099 | gun-24 | `m1:24:o1.opt1` | `opts` | Çok kötü | GEÇTİ |
| 24-100 | gun-24 | `m1:24:o1.opt2` | `opts` | Hiçbir şey demiyor | GEÇTİ |
| 24-101 | gun-24 | `m1:24:o2` | `q_tr` | Tobi ne düşünüyor? | GEÇTİ |
| 24-102 | gun-24 | `m1:24:o2.opt0` | `opts` | Bu doğru değil | GEÇTİ |
| 24-103 | gun-24 | `m1:24:o2.opt1` | `opts` | Ev sahibi haklı | GEÇTİ |
| 24-104 | gun-24 | `m1:24:o2.opt2` | `opts` | Küf önemli değil | GEÇTİ |
| 24-105 | gun-24 | `m1:24:o3` | `q_tr` | Tobi'nin ne zaman daha çok parası olacak? | GEÇTİ |
| 24-106 | gun-24 | `m1:24:o3.opt0` | `opts` | Ocakta | GEÇTİ |
| 24-107 | gun-24 | `m1:24:o3.opt1` | `opts` | Yarın | GEÇTİ |
| 24-108 | gun-24 | `m1:24:o3.opt2` | `opts` | Aralıkta | GEÇTİ |
| 24-109 | gun-24 | `m1:24:o4` | `situation_tr` | Tobi'ye cevap ver. Sen de bunun doğru olmadığını düşünüyorsun. | GEÇTİ |
| 24-110 | gun-24 | `m1:24:o4` | `why_tr` | Katıldığını **auch** ile söylersin: **Ich finde das auch nicht richtig**. | GEÇTİ |
| 24-111 | gun-24 | `m1:24:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 24-112 | gun-24 | `m1:24:s1` | `why_tr` | **der Vermieter** ev sahibi demektir. | GEÇTİ |
| 24-113 | gun-24 | `m1:24:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 24-114 | gun-24 | `m1:24:s2` | `why_tr` | **die Kaution** depozito demektir. | GEÇTİ |
| 24-115 | gun-24 | `m1:24:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 24-116 | gun-24 | `m1:24:s3` | `why_tr` | **am Morgen** sabah demektir. Burada **Morgen** büyük harfle yazılır. | GEÇTİ |
| 24-117 | gun-24 | `m1:24:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 24-118 | gun-24 | `m1:24:s4` | `why_tr` | **geradeaus** dümdüz demektir. | GEÇTİ |
| 24-119 | gun-24 | `m1:24:s5` | `why_tr` | Sorun varsa **zu** dersin: **zu klein**. | GEÇTİ |
| 24-120 | gun-24 | `m1:24:s6` | `why_tr` | Sorun yoksa **sehr** dersin: **sehr jung**. | GEÇTİ |
| 24-121 | gun-24 | `m1:24:s7` | `why_tr` | Değil derken sıfatın önüne **nicht** gelir. | GERİ |
| 24-122 | gun-24 | `m1:24:s8` | `why_tr` | Bir şey yok derken **kein** dersin: **kein Geld**. | GEÇTİ |
| 24-123 | gun-24 | `m1:24:s9` | `situation_tr` | Tobi mutfağındaki küfü anlatıyor ve fikrini soruyor. Bence çok kötü. | GEÇTİ |
| 24-124 | gun-24 | `m1:24:s9` | `why_tr` | Güçlendirmek için **sehr**, olumsuz için **nicht** kullan. | GERİ |
| 24-125 | gun-24 | `m1:24:s10` | `situation_tr` | Sokakta biri istasyonu soruyor. İstasyon dümdüz ileride. | GEÇTİ |
| 24-126 | gun-24 | `m1:24:s10` | `why_tr` | Dümdüz derken **geradeaus** dersin. | GEÇTİ |
| 24-127 | gun-24 | `m1:24:s11` | `situation_tr` | Tobi bir ev soruyor: 900 avro, mutfak küçük. Sence fiyat fazla, mutfak da fazla küçük. | GEÇTİ |
| 24-128 | gun-24 | `m1:24:s11` | `why_tr` | İki sorun için iki kez **zu** dersin: **zu teuer**, **zu klein**. | GEÇTİ |
| 25-001 | gun-25 | `g25` | `goal_tr` | İkinci el tezgâhında iki eşyadan hangisini istediğini dieser ile söyler, hangisinin daha ucuz olduğunu billiger als ile karşılaştırırsın. | GERİ |
| 25-002 | gun-25 | `g25` | `can_do.tr` | İki şeyden hangisini istediğimi ve hangisinin daha ucuz olduğunu söylerim. | GEÇTİ |
| 25-003 | gun-25 | `m1:25:h1.kalip0` | `kaliplar.tr` | hangi | GEÇTİ |
| 25-004 | gun-25 | `m1:25:h1.kalip1` | `kaliplar.tr` | bu | GEÇTİ |
| 25-005 | gun-25 | `m1:25:h1.kalip2` | `kaliplar.tr` | …'i alıyorum – … alıyor musun? – … alıyor | GEÇTİ |
| 25-006 | gun-25 | `m1:25:h1.kalip3` | `kaliplar.tr` | Doğru. – Doğru mu? | GEÇTİ |
| 25-007 | gun-25 | `m1:25:h1.kalip4` | `kaliplar.tr` | Merhaba! (Bavyera'da sık) | GEÇTİ |
| 25-008 | gun-25 | `m1:25:h1.sahne` | `ortam_tr` | Cumartesi, şehir meydanında ikinci el tezgâhları. Luka yanında, fincanlara bakıyorsunuz. | GEÇTİ |
| 25-009 | gun-25 | `m1:25:h1.soru` | `q_tr` | Sen hangi fincanı istiyorsun? | GEÇTİ |
| 25-010 | gun-25 | `m1:25:h1.soru.opt0` | `opts` | Luka'nın gösterdiğini | GEÇTİ |
| 25-011 | gun-25 | `m1:25:h1.soru.opt1` | `opts` | Öbürünü, oradakini | GEÇTİ |
| 25-012 | gun-25 | `m1:25:h1.soru.opt2` | `opts` | Hiçbirini | GEÇTİ |
| 25-013 | gun-25 | `m1:25:h2.kalip0` | `kaliplar.tr` | …'den daha ucuz – …'den daha pahalı | GEÇTİ |
| 25-014 | gun-25 | `m1:25:h2.kalip1` | `kaliplar.tr` | daha büyük – daha küçük – daha güzel – daha iyi – tercihen | GEÇTİ |
| 25-015 | gun-25 | `m1:25:h2.kalip2` | `kaliplar.tr` | … kadar … | GEÇTİ |
| 25-016 | gun-25 | `m1:25:h2.kalip3` | `kaliplar.tr` | …'i gidip alıyorum – …'i alır mısın? | GEÇTİ |
| 25-017 | gun-25 | `m1:25:h2.sahne` | `ortam_tr` | Stadler Hanım'ın tezgâhı. İki sandalye yan yana duruyor. | GEÇTİ |
| 25-018 | gun-25 | `m1:25:h2.soru` | `q_tr` | Diğer sandalye neden daha pahalı? | GEÇTİ |
| 25-019 | gun-25 | `m1:25:h2.soru.opt0` | `opts` | Eski olduğu için | GEÇTİ |
| 25-020 | gun-25 | `m1:25:h2.soru.opt1` | `opts` | Yeni ve daha büyük olduğu için | GEÇTİ |
| 25-021 | gun-25 | `m1:25:h2.soru.opt2` | `opts` | Daha güzel olduğu için | GEÇTİ |
| 25-022 | gun-25 | `m1:25:h3.kalip0` | `kaliplar.tr` | … anlatıyor – Ne anlatıyorsun? | GEÇTİ |
| 25-023 | gun-25 | `m1:25:h3.sahne` | `ortam_tr` | Tezgâhın önünde Luka seni çağırıyor. | GEÇTİ |
| 25-024 | gun-25 | `m1:25:h3.soru` | `q_tr` | Nerede buluşuyorsunuz? | GEÇTİ |
| 25-025 | gun-25 | `m1:25:h3.soru.opt0` | `opts` | İstasyonda, saat onda | GEÇTİ |
| 25-026 | gun-25 | `m1:25:h3.soru.opt1` | `opts` | Pazarda, saat dörtte | GEÇTİ |
| 25-027 | gun-25 | `m1:25:h3.soru.opt2` | `opts` | Kursta | GEÇTİ |
| 25-028 | gun-25 | `m1:25:v1.b1.ana` | `q_tr` | Luka ne alıyor? | GEÇTİ |
| 25-029 | gun-25 | `m1:25:v1.b1.ana.opt0` | `opts` | Bir sandalye | GEÇTİ |
| 25-030 | gun-25 | `m1:25:v1.b1.ana.opt1` | `opts` | İki fincan | GEÇTİ |
| 25-031 | gun-25 | `m1:25:v1.b1.ana.opt2` | `opts` | Bir çift ayakkabı | GEÇTİ |
| 25-032 | gun-25 | `m1:25:v1.b1.ay0` | `q_tr` | Luka hangi sandalyeyi alıyor? | GEÇTİ |
| 25-033 | gun-25 | `m1:25:v1.b1.ay0.opt0` | `opts` | On beş avroluk olanı | GEÇTİ |
| 25-034 | gun-25 | `m1:25:v1.b1.ay0.opt1` | `opts` | On avroluk olanı | GEÇTİ |
| 25-035 | gun-25 | `m1:25:v1.b1.ay0.opt2` | `opts` | İkisini de | GEÇTİ |
| 25-036 | gun-25 | `m1:25:v1.b1.ay1` | `q_tr` | Diğer sandalye neden daha pahalı? | GEÇTİ |
| 25-037 | gun-25 | `m1:25:v1.b1.ay1.opt0` | `opts` | Daha eski | GEÇTİ |
| 25-038 | gun-25 | `m1:25:v1.b1.ay1.opt1` | `opts` | Daha büyük ve yeni | GEÇTİ |
| 25-039 | gun-25 | `m1:25:v1.b1.ay1.opt2` | `opts` | Daha küçük | GEÇTİ |
| 25-040 | gun-25 | `m1:25:v1.b1.d1` | `q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 25-041 | gun-25 | `m1:25:v1.b1.d5` | `gorev_tr` | Luka'nın seçimini Almanca iki kısa cümleyle yaz. | GEÇTİ |
| 25-042 | gun-25 | `m1:25:v1:c1` | `situation_tr` | Stadler Hanım sana da soruyor. Sen ucuz olanı alıyorsun. | GEÇTİ |
| 25-043 | gun-25 | `m1:25:v1:c1` | `why_tr` | **der Stuhl** alırken **diesen** dersin. Sebebi **billiger** ile söyle. | GEÇTİ |
| 25-044 | gun-25 | `m1:25:a1` | `ortam_tr` | Cumartesi sabahı şehir meydanındasın. Hoparlörden bir anons geliyor. | GEÇTİ |
| 25-045 | gun-25 | `m1:25:a1.b1.ana` | `q_tr` | Anons ne söylüyor? | GEÇTİ |
| 25-046 | gun-25 | `m1:25:a1.b1.ana.opt0` | `opts` | Bugün pazarda eşyalar ucuz | GEÇTİ |
| 25-047 | gun-25 | `m1:25:a1.b1.ana.opt1` | `opts` | Pazar bugün kapalı | GEÇTİ |
| 25-048 | gun-25 | `m1:25:a1.b1.ana.opt2` | `opts` | Yeni bir fırın açılıyor | GEÇTİ |
| 25-049 | gun-25 | `m1:25:a1.b1.ay0` | `q_tr` | Sandalyeler kaç avro? | GEÇTİ |
| 25-050 | gun-25 | `m1:25:a1.b1.ay0.opt0` | `opts` | Bir | GEÇTİ |
| 25-051 | gun-25 | `m1:25:a1.b1.ay0.opt1` | `opts` | On | GEÇTİ |
| 25-052 | gun-25 | `m1:25:a1.b1.ay0.opt2` | `opts` | Dört | GEÇTİ |
| 25-053 | gun-25 | `m1:25:a1.b1.ay1` | `q_tr` | Tezgâhlar saat kaça kadar açık? | GEÇTİ |
| 25-054 | gun-25 | `m1:25:a1.b1.ay1.opt0` | `opts` | Dörde kadar | GEÇTİ |
| 25-055 | gun-25 | `m1:25:a1.b1.ay1.opt1` | `opts` | Ona kadar | GEÇTİ |
| 25-056 | gun-25 | `m1:25:a1.b1.ay1.opt2` | `opts` | Bire kadar | GEÇTİ |
| 25-057 | gun-25 | `m1:25:a1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 25-058 | gun-25 | `m1:25:a1.b1.d5` | `gorev_tr` | Anonsu Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 25-059 | gun-25 | `m1:25:a1:c1` | `situation_tr` | Ioana anonsu duymadı, soruyor. Sandalyeler bugün daha ucuz, on avro. | GEÇTİ |
| 25-060 | gun-25 | `m1:25:a1:c1` | `why_tr` | Tersini **billiger** ile söyle. Çoğulda **sie sind** gelir. | GERİ |
| 25-061 | gun-25 | `m1:25:a1:e1` | `q_tr` | Ucuz bir sandalye almak istiyorsun. Ne yapmalısın? | GEÇTİ |
| 25-062 | gun-25 | `m1:25:a1:e1.opt0` | `opts` | Yarın meydana git. | GEÇTİ |
| 25-063 | gun-25 | `m1:25:a1:e1.opt1` | `opts` | Bugün saat dörtten önce meydana git. | GEÇTİ |
| 25-064 | gun-25 | `m1:25:a1:e1.opt2` | `opts` | Bu akşam meydana git. | GEÇTİ |
| 25-065 | gun-25 | `m1:25:a1:e1` | `why_tr` | Sandalyeler bugün ucuz. Tezgâhlar saat dörde kadar açık. | GEÇTİ |
| 25-066 | gun-25 | `m1:25:a2` | `ortam_tr` | Luka telefonuna mesaj bırakmış. | GEÇTİ |
| 25-067 | gun-25 | `m1:25:a2.b1.ana` | `q_tr` | Luka neden mesaj bırakıyor? | GEÇTİ |
| 25-068 | gun-25 | `m1:25:a2.b1.ana.opt0` | `opts` | Yeni sandalyesini anlatıyor ve randevuyu hatırlatıyor | GEÇTİ |
| 25-069 | gun-25 | `m1:25:a2.b1.ana.opt1` | `opts` | Randevuyu iptal ediyor | GEÇTİ |
| 25-070 | gun-25 | `m1:25:a2.b1.ana.opt2` | `opts` | Sandalye için para istiyor | GEÇTİ |
| 25-071 | gun-25 | `m1:25:a2.b1.ay0` | `q_tr` | Hangi sandalye daha güzel? | GEÇTİ |
| 25-072 | gun-25 | `m1:25:a2.b1.ay0.opt0` | `opts` | Luka'nın eski sandalyesi | GEÇTİ |
| 25-073 | gun-25 | `m1:25:a2.b1.ay0.opt1` | `opts` | Stadler Hanım'dan gelen sandalye | GEÇTİ |
| 25-074 | gun-25 | `m1:25:a2.b1.ay0.opt2` | `opts` | İkisi aynı | GEÇTİ |
| 25-075 | gun-25 | `m1:25:a2.b1.ay1` | `q_tr` | Randevu ne zaman? | GEÇTİ |
| 25-076 | gun-25 | `m1:25:a2.b1.ay1.opt0` | `opts` | Cuma saat dörtte | GEÇTİ |
| 25-077 | gun-25 | `m1:25:a2.b1.ay1.opt1` | `opts` | Cumartesi saat dörtte | GEÇTİ |
| 25-078 | gun-25 | `m1:25:a2.b1.ay1.opt2` | `opts` | Cuma saat onda | GEÇTİ |
| 25-079 | gun-25 | `m1:25:a2.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 25-080 | gun-25 | `m1:25:a2.b1.d5` | `gorev_tr` | Luka'nın mesajını Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 25-081 | gun-25 | `m1:25:a2:c1` | `situation_tr` | Luka'yı geri arıyorsun. Cuma geliyorsun. | GEÇTİ |
| 25-082 | gun-25 | `m1:25:a2:c1` | `why_tr` | Tabii ki derken **natürlich** dersin. Saati tekrar etmek iyi olur. | GEÇTİ |
| 25-083 | gun-25 | `m1:25:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 25-084 | gun-25 | `m1:25:a2:e1.opt0` | `opts` | Cuma saat dörtte Luka'ya git. | GEÇTİ |
| 25-085 | gun-25 | `m1:25:a2:e1.opt1` | `opts` | Stadler Hanım'ın tezgâhına git. | GEÇTİ |
| 25-086 | gun-25 | `m1:25:a2:e1.opt2` | `opts` | Luka'yı cumartesi ara. | GEÇTİ |
| 25-087 | gun-25 | `m1:25:a2:e1` | `why_tr` | Randevun cuma saat dörtte. Luka yeni sandalyeyi orada gösterecek. | GEÇTİ |
| 25-088 | gun-25 | `m1:25:p1` | `durum_tr` | Cumartesi pazarda Stadler Hanım'ın tezgâhındasın. Bir fincan almak istiyorsun. Hangisinin daha ucuz olduğunu sor ve seç. | GEÇTİ |
| 25-089 | gun-25 | `m1:25:p1.n1.s0` | `geri_bildirim_tr` | Güzel. **die Tasse** için **welche** dedin. | GEÇTİ |
| 25-090 | gun-25 | `m1:25:p1.n1.s1` | `geri_bildirim_tr` | Olur. Şimdi fiyatları dinle. | GEÇTİ |
| 25-091 | gun-25 | `m1:25:p1.n1.s2` | `geri_bildirim_tr` | **die Tasse** ile **welche** dersin. | GEÇTİ |
| 25-092 | gun-25 | `m1:25:p1.n2.s0` | `geri_bildirim_tr` | Doğru karşılaştırdın ve seçtin. | GEÇTİ |
| 25-093 | gun-25 | `m1:25:p1.n2.s1` | `geri_bildirim_tr` | İyi bir soru. Fiyat her şey değil. | GEÇTİ |
| 25-094 | gun-25 | `m1:25:p1.n2.s2` | `geri_bildirim_tr` | İki avro bir avrodan pahalıdır. Bu **teurer**, öbürü **billiger**. | GEÇTİ |
| 25-095 | gun-25 | `m1:25:p1.n3.s0` | `geri_bildirim_tr` | Güzel. **die Tasse** için **diese** dedin. | GEÇTİ |
| 25-096 | gun-25 | `m1:25:p1.n3.s1` | `geri_bildirim_tr` | Çok iyi. **lieber** ve **schöner** ile nedenini söyledin. | GEÇTİ |
| 25-097 | gun-25 | `m1:25:p1.n3.s2` | `geri_bildirim_tr` | **die Tasse** için **diese** dersin. | GEÇTİ |
| 25-098 | gun-25 | `m1:25:p1.n4.s0` | `geri_bildirim_tr` | Sıcak bir cevap. **sehr schön** doğru. | GEÇTİ |
| 25-099 | gun-25 | `m1:25:p1.n4.s1` | `geri_bildirim_tr` | Güzel. İki sıfatı **aber** ile bağladın. | GERİ |
| 25-100 | gun-25 | `m1:25:p1.n4.s2` | `geri_bildirim_tr` | **zu** bir sorun bildirir. Burada **sehr schön** dersin. | GEÇTİ |
| 25-101 | gun-25 | `m1:25:p1` | `kapanis_tr` | İki fincanı karşılaştırdın, birini dieser ile seçtin ve Wendlfing için fikrini söyledin. | GEÇTİ |
| 25-102 | gun-25 | `m1:25:o1` | `q_tr` | Hangi ceket daha ucuz? | GEÇTİ |
| 25-103 | gun-25 | `m1:25:o1.opt0` | `opts` | 45 avroluk | GEÇTİ |
| 25-104 | gun-25 | `m1:25:o1.opt1` | `opts` | 30 avroluk | GEÇTİ |
| 25-105 | gun-25 | `m1:25:o1.opt2` | `opts` | İkisi aynı | GEÇTİ |
| 25-106 | gun-25 | `m1:25:o2` | `q_tr` | 30 avroluk ceket nasıl? | GEÇTİ |
| 25-107 | gun-25 | `m1:25:o2.opt0` | `opts` | Daha küçük ama daha güzel | GEÇTİ |
| 25-108 | gun-25 | `m1:25:o2.opt1` | `opts` | Daha büyük ve yeni | GEÇTİ |
| 25-109 | gun-25 | `m1:25:o2.opt2` | `opts` | Daha pahalı | GEÇTİ |
| 25-110 | gun-25 | `m1:25:o3` | `q_tr` | 45 avroluk ceket nasıl? | GEÇTİ |
| 25-111 | gun-25 | `m1:25:o3.opt0` | `opts` | Daha küçük | GEÇTİ |
| 25-112 | gun-25 | `m1:25:o3.opt1` | `opts` | Daha büyük ve yeni | GEÇTİ |
| 25-113 | gun-25 | `m1:25:o3.opt2` | `opts` | Eski | GEÇTİ |
| 25-114 | gun-25 | `m1:25:yazma` | `gorev_tr` | Ioana'ya cevap yaz. Hangi ceketi önerirsin ve neden? billiger ve als kullan. | GEÇTİ |
| 25-115 | gun-25 | `m1:25:yazma.0` | `kontrol_tr` | Hangi ceketi önerdiğini yazdın mı? | GEÇTİ |
| 25-116 | gun-25 | `m1:25:yazma.1` | `kontrol_tr` | **billiger** gibi bir karşılaştırma yazdın mı? | GEÇTİ |
| 25-117 | gun-25 | `m1:25:yazma.2` | `kontrol_tr` | Karşılaştırmada **als** kullandın mı? | GEÇTİ |
| 25-118 | gun-25 | `m1:25:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 25-119 | gun-25 | `m1:25:s1` | `why_tr` | **dieser** bu demektir. **der Stuhl** ile gelir. | GEÇTİ |
| 25-120 | gun-25 | `m1:25:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 25-121 | gun-25 | `m1:25:s2` | `why_tr` | **das Paar** ile **welches** dersin. | GEÇTİ |
| 25-122 | gun-25 | `m1:25:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 25-123 | gun-25 | `m1:25:s3` | `why_tr` | Karşılaştırmada **als** gelir. | GEÇTİ |
| 25-124 | gun-25 | `m1:25:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 25-125 | gun-25 | `m1:25:s4` | `why_tr` | **treffen** buluşmak demektir. | GEÇTİ |
| 25-126 | gun-25 | `m1:25:s5` | `why_tr` | **die Jacke** için **diese** dersin, sonra **billiger**. | GEÇTİ |
| 25-127 | gun-25 | `m1:25:s6` | `why_tr` | **gut** düzensizdir: daha iyi **besser** olur. | GERİ |
| 25-128 | gun-25 | `m1:25:s7` | `why_tr` | Daha pahalı **teurer** olur, e harfi düşer. | GERİ |
| 25-129 | gun-25 | `m1:25:s8` | `why_tr` | **groß** daha büyük olunca **größer** olur. | GEÇTİ |
| 25-130 | gun-25 | `m1:25:s9` | `situation_tr` | Stadler Hanım hangi fincanı aldığını soruyor. Bunu alıyorsun, çünkü daha ucuz. | GEÇTİ |
| 25-131 | gun-25 | `m1:25:s9` | `why_tr` | **die Tasse** için **diese** dersin. | GEÇTİ |
| 25-132 | gun-25 | `m1:25:s10` | `situation_tr` | Ioana iki ceketi gösteriyor. Sence bu daha güzel. | GEÇTİ |
| 25-133 | gun-25 | `m1:25:s10` | `why_tr` | Daha güzel **schöner** olur. | GEÇTİ |
| 25-134 | gun-25 | `m1:25:s11` | `situation_tr` | Pazarda iki sandalye var: biri 10, biri 15 avro. Ucuz olanı al ve nedenini söyle. | GEÇTİ |
| 25-135 | gun-25 | `m1:25:s11` | `why_tr` | Seçerken **diesen**, karşılaştırırken **billiger als** dersin. | GEÇTİ |
| 26-001 | gun-26 | `g26` | `goal_tr` | Ev ilanlarındaki kısaltmaları okur, ilanları karşılaştırıp en ucuzunu am billigsten ile söylersin. | GEÇTİ |
| 26-002 | gun-26 | `g26` | `can_do.tr` | Ev ilanlarını karşılaştırır, en ucuzunu bulurum. | GEÇTİ |
| 26-003 | gun-26 | `m1:26:h1.kalip0` | `kaliplar.tr` | oda – mutfak – balkon – yan giderler – metrekare | GEÇTİ |
| 26-004 | gun-26 | `m1:26:h1.kalip1` | `kaliplar.tr` | en ucuz – en pahalı – en büyük – en güzel – en iyi | GEÇTİ |
| 26-005 | gun-26 | `m1:26:h1.kalip2` | `kaliplar.tr` | bu | GEÇTİ |
| 26-006 | gun-26 | `m1:26:h1.kalip3` | `kaliplar.tr` | …'den daha ucuz | GEÇTİ |
| 26-007 | gun-26 | `m1:26:h1.sahne` | `ortam_tr` | Kurstan sonra, sınıfta. Ioana elinde bir ilan kâğıdı tutuyor. | GEÇTİ |
| 26-008 | gun-26 | `m1:26:h1.soru` | `q_tr` | Ioana'nın bulduğu yer nasıl? | GEÇTİ |
| 26-009 | gun-26 | `m1:26:h1.soru.opt0` | `opts` | Uzak değil ve en ucuzu | GEÇTİ |
| 26-010 | gun-26 | `m1:26:h1.soru.opt1` | `opts` | Uzak ama balkonlu | GEÇTİ |
| 26-011 | gun-26 | `m1:26:h1.soru.opt2` | `opts` | Pahalı ve büyük | GEÇTİ |
| 26-012 | gun-26 | `m1:26:h2.kalip0` | `kaliplar.tr` | Sorun değil! – Tamam. | GEÇTİ |
| 26-013 | gun-26 | `m1:26:h2.kalip1` | `kaliplar.tr` | …unutuyorum – …unutma! | GEÇTİ |
| 26-014 | gun-26 | `m1:26:h2.kalip2` | `kaliplar.tr` | …gösteriyorum – … gösterir misin? – … gösteriyor – Göster bakalım! | GEÇTİ |
| 26-015 | gun-26 | `m1:26:h2.kalip3` | `kaliplar.tr` | Merhaba! (Bavyera'da sık) | GEÇTİ |
| 26-016 | gun-26 | `m1:26:h2.kalip4` | `kaliplar.tr` | …'i nasıl buluyorsun? – Bence en iyisi … | GEÇTİ |
| 26-017 | gun-26 | `m1:26:h2.sahne` | `ortam_tr` | Apartmanın girişi. Pichler Bey anahtarla bekliyor. | GEÇTİ |
| 26-018 | gun-26 | `m1:26:h2.soru` | `q_tr` | Balkon nasıl? | GEÇTİ |
| 26-019 | gun-26 | `m1:26:h2.soru.opt0` | `opts` | Küçük ama güzel | GEÇTİ |
| 26-020 | gun-26 | `m1:26:h2.soru.opt1` | `opts` | Büyük ve yeni | GEÇTİ |
| 26-021 | gun-26 | `m1:26:h2.soru.opt2` | `opts` | Bozuk | GEÇTİ |
| 26-022 | gun-26 | `m1:26:h3.sahne` | `ortam_tr` | Apartmanın önü. Lena kızıyla geçiyor, Ioana selam veriyor. | GEÇTİ |
| 26-023 | gun-26 | `m1:26:h3.soru` | `q_tr` | Kız nereye gidiyor? | GEÇTİ |
| 26-024 | gun-26 | `m1:26:h3.soru.opt0` | `opts` | Brandl Hanım'a | GEÇTİ |
| 26-025 | gun-26 | `m1:26:h3.soru.opt1` | `opts` | Okula | GEÇTİ |
| 26-026 | gun-26 | `m1:26:h3.soru.opt2` | `opts` | Kursa | GEÇTİ |
| 26-027 | gun-26 | `m1:26:v1.b1.ana` | `q_tr` | Tobi ile Ioana ne yapıyor? | GEÇTİ |
| 26-028 | gun-26 | `m1:26:v1.b1.ana.opt0` | `opts` | Tobi için üç ev ilanını karşılaştırıyorlar | GEÇTİ |
| 26-029 | gun-26 | `m1:26:v1.b1.ana.opt1` | `opts` | Ioana'nın kursunu konuşuyorlar | GEÇTİ |
| 26-030 | gun-26 | `m1:26:v1.b1.ana.opt2` | `opts` | Hafta sonunu planlıyorlar | GEÇTİ |
| 26-031 | gun-26 | `m1:26:v1.b1.ay0` | `q_tr` | En ucuz yer nerede? | GEÇTİ |
| 26-032 | gun-26 | `m1:26:v1.b1.ay0.opt0` | `opts` | İstasyonun orada | GEÇTİ |
| 26-033 | gun-26 | `m1:26:v1.b1.ay0.opt1` | `opts` | Brunnenviertel'de | GEÇTİ |
| 26-034 | gun-26 | `m1:26:v1.b1.ay0.opt2` | `opts` | Brunnengasse'de | GEÇTİ |
| 26-035 | gun-26 | `m1:26:v1.b1.ay1` | `q_tr` | İstasyonun oradaki yer neden uymuyor? | GEÇTİ |
| 26-036 | gun-26 | `m1:26:v1.b1.ay1.opt0` | `opts` | Fazla pahalı | GEÇTİ |
| 26-037 | gun-26 | `m1:26:v1.b1.ay1.opt1` | `opts` | Çok küçük | GEÇTİ |
| 26-038 | gun-26 | `m1:26:v1.b1.ay1.opt2` | `opts` | Balkonu yok | GEÇTİ |
| 26-039 | gun-26 | `m1:26:v1.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 26-040 | gun-26 | `m1:26:v1.b1.d5` | `gorev_tr` | Tobi için en iyi yeri Almanca iki kısa cümleyle yaz. | GEÇTİ |
| 26-041 | gun-26 | `m1:26:v1:c1` | `situation_tr` | Tobi sana da soruyor. Sence üçüncüsü en iyisi, çünkü en ucuzu. | GEÇTİ |
| 26-042 | gun-26 | `m1:26:v1:c1` | `why_tr` | En iyi **am besten**, en ucuz **am billigsten** olur. | GEÇTİ |
| 26-043 | gun-26 | `m1:26:a1` | `ortam_tr` | Brandl Hanım telefonuna mesaj bırakmış. Tobi'nin ev aradığını duymuş. | GEÇTİ |
| 26-044 | gun-26 | `m1:26:a1.b1.ana` | `q_tr` | Brandl Hanım neden arıyor? | GEÇTİ |
| 26-045 | gun-26 | `m1:26:a1.b1.ana.opt0` | `opts` | Apartmanda Tobi için boş bir yer var | GEÇTİ |
| 26-046 | gun-26 | `m1:26:a1.b1.ana.opt1` | `opts` | Pichler Bey'le bir sorun var | GEÇTİ |
| 26-047 | gun-26 | `m1:26:a1.b1.ana.opt2` | `opts` | Seni kahveye çağırıyor | GEÇTİ |
| 26-048 | gun-26 | `m1:26:a1.b1.ay0` | `q_tr` | Yer nasıl? | GEÇTİ |
| 26-049 | gun-26 | `m1:26:a1.b1.ay0.opt0` | `opts` | Büyük ve karanlık | GEÇTİ |
| 26-050 | gun-26 | `m1:26:a1.b1.ay0.opt1` | `opts` | Büyük değil ama aydınlık | GEÇTİ |
| 26-051 | gun-26 | `m1:26:a1.b1.ay0.opt2` | `opts` | Pahalı | GEÇTİ |
| 26-052 | gun-26 | `m1:26:a1.b1.ay1` | `q_tr` | Pichler Bey yeri ne zaman gösteriyor? | GEÇTİ |
| 26-053 | gun-26 | `m1:26:a1.b1.ay1.opt0` | `opts` | Cumartesi saat onda | GEÇTİ |
| 26-054 | gun-26 | `m1:26:a1.b1.ay1.opt1` | `opts` | Ocakta | GEÇTİ |
| 26-055 | gun-26 | `m1:26:a1.b1.ay1.opt2` | `opts` | Pazartesi saat onda | GEÇTİ |
| 26-056 | gun-26 | `m1:26:a1.b1.d1` | `q_tr` | Hangi ayı duydun? | GEÇTİ |
| 26-057 | gun-26 | `m1:26:a1.b1.d5` | `gorev_tr` | Mesajı Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 26-058 | gun-26 | `m1:26:a1:c1` | `situation_tr` | Brandl Hanım'ı geri arıyorsun. Tobi'ye söyleyeceksin, unutmayacaksın. | GEÇTİ |
| 26-059 | gun-26 | `m1:26:a1:c1` | `why_tr` | Unutmam derken **Ich vergesse es nicht** dersin. | GEÇTİ |
| 26-060 | gun-26 | `m1:26:a1:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 26-061 | gun-26 | `m1:26:a1:e1.opt0` | `opts` | Tobi'ye haber ver: cumartesi saat onda Pichler Bey yeri gösteriyor. | GEÇTİ |
| 26-062 | gun-26 | `m1:26:a1:e1.opt1` | `opts` | Brandl Hanım'a para götür. | GEÇTİ |
| 26-063 | gun-26 | `m1:26:a1:e1.opt2` | `opts` | Pichler Bey'i hemen ara. | GEÇTİ |
| 26-064 | gun-26 | `m1:26:a1:e1` | `why_tr` | Ocakta boşalacak yer Tobi için. Pichler Bey cumartesi saat onda gösteriyor. | GEÇTİ |
| 26-065 | gun-26 | `m1:26:a2` | `ortam_tr` | Akşam Tobi'den bir sesli mesaj geliyor. | GEÇTİ |
| 26-066 | gun-26 | `m1:26:a2.b1.ana` | `q_tr` | Tobi neden arıyor? | GEÇTİ |
| 26-067 | gun-26 | `m1:26:a2.b1.ana.opt0` | `opts` | İki yeri karşılaştırıyor ve adresi soruyor | GEÇTİ |
| 26-068 | gun-26 | `m1:26:a2.b1.ana.opt1` | `opts` | Taşındığını söylüyor | GEÇTİ |
| 26-069 | gun-26 | `m1:26:a2.b1.ana.opt2` | `opts` | Brandl Hanım'dan şikâyet ediyor | GEÇTİ |
| 26-070 | gun-26 | `m1:26:a2.b1.ay0` | `q_tr` | Brunnenviertel'deki yerin sorunu ne? | GEÇTİ |
| 26-071 | gun-26 | `m1:26:a2.b1.ay0.opt0` | `opts` | Fazla pahalı | GEÇTİ |
| 26-072 | gun-26 | `m1:26:a2.b1.ay0.opt1` | `opts` | Balkonu çok küçük | GEÇTİ |
| 26-073 | gun-26 | `m1:26:a2.b1.ay0.opt2` | `opts` | Çok uzak | GEÇTİ |
| 26-074 | gun-26 | `m1:26:a2.b1.ay1` | `q_tr` | Tobi neyi unutuyor? | GEÇTİ |
| 26-075 | gun-26 | `m1:26:a2.b1.ay1.opt0` | `opts` | Saati | GEÇTİ |
| 26-076 | gun-26 | `m1:26:a2.b1.ay1.opt1` | `opts` | Brandl Hanım'ın adını | GEÇTİ |
| 26-077 | gun-26 | `m1:26:a2.b1.ay1.opt2` | `opts` | Adresin numarasını | GEÇTİ |
| 26-078 | gun-26 | `m1:26:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 26-079 | gun-26 | `m1:26:a2.b1.d5` | `gorev_tr` | Tobi'nin mesajını Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 26-080 | gun-26 | `m1:26:a2:c1` | `situation_tr` | Tobi'ye cevap ver. Adres doğru: Brunnengasse 7. | GEÇTİ |
| 26-081 | gun-26 | `m1:26:a2:c1` | `why_tr` | Doğrularken **genau** ya da **richtig** dersin. | GEÇTİ |
| 26-082 | gun-26 | `m1:26:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 26-083 | gun-26 | `m1:26:a2:e1.opt0` | `opts` | Tobi'ye adresi doğrula: Brunnengasse 7. | GEÇTİ |
| 26-084 | gun-26 | `m1:26:a2:e1.opt1` | `opts` | Tobi'ye balkonlu bir yer bul. | GEÇTİ |
| 26-085 | gun-26 | `m1:26:a2:e1.opt2` | `opts` | Brandl Hanım'ı ara. | GEÇTİ |
| 26-086 | gun-26 | `m1:26:a2:e1` | `why_tr` | Tobi adresin numarasını unutmuş ve doğru olup olmadığını soruyor. | GEÇTİ |
| 26-087 | gun-26 | `m1:26:p1` | `durum_tr` | Ioana ile üç ilana bakıyorsunuz. 1: Brunnengasse, 2 Zi., Kü., Blk., 55 m², 650 € + NK 120 €. 2: am Bahnhof, 3 Zi., Kü., 70 m², 800 € + NK 150 €. 3: Brunnenviertel, 1 Zi., Kü., Blk., 30 m², 450 € + NK 60 €. | GERİ |
| 26-088 | gun-26 | `m1:26:p1.n1.s0` | `geri_bildirim_tr` | Doğru. **am billigsten** dedin. | GEÇTİ |
| 26-089 | gun-26 | `m1:26:p1.n1.s1` | `geri_bildirim_tr` | Güzel. Fiyatı ve yan giderleri okudun. | GEÇTİ |
| 26-090 | gun-26 | `m1:26:p1.n1.s2` | `geri_bildirim_tr` | İstasyonun oradaki 800 avro. O en pahalısı. | GEÇTİ |
| 26-091 | gun-26 | `m1:26:p1.n2.s0` | `geri_bildirim_tr` | Doğru. Metrekareyi de okudun. | GEÇTİ |
| 26-092 | gun-26 | `m1:26:p1.n2.s1` | `geri_bildirim_tr` | Doğru. **am größten** dedin. | GEÇTİ |
| 26-093 | gun-26 | `m1:26:p1.n2.s2` | `geri_bildirim_tr` | Üçüncüsü 30 metrekare, en küçüğü o. | GEÇTİ |
| 26-094 | gun-26 | `m1:26:p1.n3.s0` | `geri_bildirim_tr` | Doğru. İlanda **Blk.** yok. | GEÇTİ |
| 26-095 | gun-26 | `m1:26:p1.n3.s1` | `geri_bildirim_tr` | Çok iyi. İki ilanı birden kontrol ettin. | GEÇTİ |
| 26-096 | gun-26 | `m1:26:p1.n3.s2` | `geri_bildirim_tr` | İkinci ilanda **Blk.** yazmıyor. Balkonu yok. | GEÇTİ |
| 26-097 | gun-26 | `m1:26:p1.n4.s0` | `geri_bildirim_tr` | Güzel. Fikrini ve nedenini söyledin. | GEÇTİ |
| 26-098 | gun-26 | `m1:26:p1.n4.s1` | `geri_bildirim_tr` | Olur. Balkonu fiyattan önemli buldun. | GEÇTİ |
| 26-099 | gun-26 | `m1:26:p1.n4.s2` | `geri_bildirim_tr` | İki numara en pahalısı. **am teuersten** o. | GEÇTİ |
| 26-100 | gun-26 | `m1:26:p1` | `kapanis_tr` | İlanlardaki kısaltmaları okudun, en ucuzunu ve en büyüğünü buldun. | GEÇTİ |
| 26-101 | gun-26 | `m1:26:o1` | `q_tr` | Hangi ilan en ucuz? | GEÇTİ |
| 26-102 | gun-26 | `m1:26:o1.opt0` | `opts` | Brunnengasse | GEÇTİ |
| 26-103 | gun-26 | `m1:26:o1.opt1` | `opts` | İstasyonun yanı | GEÇTİ |
| 26-104 | gun-26 | `m1:26:o1.opt2` | `opts` | Brunnenviertel | GEÇTİ |
| 26-105 | gun-26 | `m1:26:o2` | `q_tr` | Hangisinde balkon yok? | GEÇTİ |
| 26-106 | gun-26 | `m1:26:o2.opt0` | `opts` | İstasyonun yanındakinde | GEÇTİ |
| 26-107 | gun-26 | `m1:26:o2.opt1` | `opts` | Brunnengasse'dekinde | GEÇTİ |
| 26-108 | gun-26 | `m1:26:o2.opt2` | `opts` | Brunnenviertel'dekinde | GEÇTİ |
| 26-109 | gun-26 | `m1:26:o3` | `q_tr` | En büyük yer hangisi? | GEÇTİ |
| 26-110 | gun-26 | `m1:26:o3.opt0` | `opts` | İstasyonun yanındaki, 70 m² | GEÇTİ |
| 26-111 | gun-26 | `m1:26:o3.opt1` | `opts` | Brunnengasse'deki, 55 m² | GEÇTİ |
| 26-112 | gun-26 | `m1:26:o3.opt2` | `opts` | Brunnenviertel'deki, 30 m² | GEÇTİ |
| 26-113 | gun-26 | `m1:26:o4` | `situation_tr` | Ioana en ucuz ilanı soruyor. Söyle. | GEÇTİ |
| 26-114 | gun-26 | `m1:26:o4` | `why_tr` | En ucuz derken **am billigsten** dersin. | GEÇTİ |
| 26-115 | gun-26 | `m1:26:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 26-116 | gun-26 | `m1:26:s1` | `why_tr` | **am billigsten** en ucuz demektir. | GEÇTİ |
| 26-117 | gun-26 | `m1:26:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 26-118 | gun-26 | `m1:26:s2` | `why_tr` | **nicht sehr groß** çok büyük değil demektir. | GEÇTİ |
| 26-119 | gun-26 | `m1:26:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 26-120 | gun-26 | `m1:26:s3` | `why_tr` | **das Mädchen** kız çocuk demektir. | GEÇTİ |
| 26-121 | gun-26 | `m1:26:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 26-122 | gun-26 | `m1:26:s4` | `why_tr` | **weit** uzak, **vom** -den demektir. | GEÇTİ |
| 26-123 | gun-26 | `m1:26:s5` | `why_tr` | En ucuz için **am billigsten** dersin. | GEÇTİ |
| 26-124 | gun-26 | `m1:26:s6` | `why_tr` | En güzel **am schönsten** olur. | GEÇTİ |
| 26-125 | gun-26 | `m1:26:s7` | `why_tr` | Tamam derken **in Ordnung** dersin. | GEÇTİ |
| 26-126 | gun-26 | `m1:26:s8` | `why_tr` | Unutma derken **Vergiss** ile başlarsın, **nicht** sona gelir. | GEÇTİ |
| 26-127 | gun-26 | `m1:26:s9` | `situation_tr` | Ioana yan giderleri soruyor. 120 avro. | GEÇTİ |
| 26-128 | gun-26 | `m1:26:s9` | `why_tr` | **die Nebenkosten** yan giderler demektir. | GEÇTİ |
| 26-129 | gun-26 | `m1:26:s10` | `situation_tr` | Tobi soruyor: Balkonu var mı? Evet, var. | GEÇTİ |
| 26-130 | gun-26 | `m1:26:s10` | `why_tr` | **das Haus** için **es** dersin. | GEÇTİ |
| 26-131 | gun-26 | `m1:26:s11` | `situation_tr` | Üç ilan var: 650, 800 ve 450 avro. İkincisi en büyük. Ioana soruyor; en ucuzu ve en büyüğü söyle. | GERİ |
| 26-132 | gun-26 | `m1:26:s11` | `why_tr` | İki soruya iki **am** ile cevap ver: **am billigsten**, **am größten**. | GEÇTİ |
| 27-001 | gun-27 | `g27` | `goal_tr` | Evinin ve şehirdeki yerlerin nerede olduğunu in, an, auf, neben, hinter ve zwischen ile söylersin. | GERİ |
| 27-002 | gun-27 | `g27` | `can_do.tr` | Evimin ve eşyaların yerini in, an, auf, neben ile söylerim. | GEÇTİ |
| 27-003 | gun-27 | `m1:27:h1.kalip0` | `kaliplar.tr` | …'de, …'in üstünde | GEÇTİ |
| 27-004 | gun-27 | `m1:27:h1.kalip1` | `kaliplar.tr` | …'in yanında – benim yanımda | GEÇTİ |
| 27-005 | gun-27 | `m1:27:h1.kalip2` | `kaliplar.tr` | …'in önünde – …'in arkasında | GEÇTİ |
| 27-006 | gun-27 | `m1:27:h1.kalip3` | `kaliplar.tr` | … ile … arasında | GEÇTİ |
| 27-007 | gun-27 | `m1:27:h1.kalip4` | `kaliplar.tr` | … duruyor – … nerede duruyor? | GEÇTİ |
| 27-008 | gun-27 | `m1:27:h1.kalip5` | `kaliplar.tr` | en ucuz | GEÇTİ |
| 27-009 | gun-27 | `m1:27:h1.kalip6` | `kaliplar.tr` | Merhaba! (Bavyera'da sık) | GEÇTİ |
| 27-010 | gun-27 | `m1:27:h1.sahne` | `ortam_tr` | İstasyon çıkışı. Ioana elinde küçük bir şehir planı tutuyor. | GEÇTİ |
| 27-011 | gun-27 | `m1:27:h1.soru` | `q_tr` | Süpermarket nerede? | GEÇTİ |
| 27-012 | gun-27 | `m1:27:h1.soru.opt0` | `opts` | İstasyonun önünde | GEÇTİ |
| 27-013 | gun-27 | `m1:27:h1.soru.opt1` | `opts` | İstasyonun arkasında, belediye binasının yanında | GEÇTİ |
| 27-014 | gun-27 | `m1:27:h1.soru.opt2` | `opts` | Eczanenin içinde | GEÇTİ |
| 27-015 | gun-27 | `m1:27:h2.kalip0` | `kaliplar.tr` | … oynuyor – … uyuyor – … uyuyorum | GEÇTİ |
| 27-016 | gun-27 | `m1:27:h2.kalip1` | `kaliplar.tr` | …'e bakıyorum – Baksana! – Bakın! | GEÇTİ |
| 27-017 | gun-27 | `m1:27:h2.kalip2` | `kaliplar.tr` | birinci katta – ikinci katta | GEÇTİ |
| 27-018 | gun-27 | `m1:27:h2.sahne` | `ortam_tr` | Merdiven boşluğu. Brandl Hanım bir şey arıyor. | GEÇTİ |
| 27-019 | gun-27 | `m1:27:h2.soru` | `q_tr` | Fincan nerede? | GEÇTİ |
| 27-020 | gun-27 | `m1:27:h2.soru.opt0` | `opts` | Koridorda | GEÇTİ |
| 27-021 | gun-27 | `m1:27:h2.soru.opt1` | `opts` | Çocuğun elinde | GEÇTİ |
| 27-022 | gun-27 | `m1:27:h2.soru.opt2` | `opts` | Dolapta | GEÇTİ |
| 27-023 | gun-27 | `m1:27:v1.b1.ana` | `q_tr` | Ioana ne istiyor? | GEÇTİ |
| 27-024 | gun-27 | `m1:27:v1.b1.ana.opt0` | `opts` | Pichler Bey'i bulup Tobi için olan yeri sormak | GEÇTİ |
| 27-025 | gun-27 | `m1:27:v1.b1.ana.opt1` | `opts` | Süpermarketi bulmak | GEÇTİ |
| 27-026 | gun-27 | `m1:27:v1.b1.ana.opt2` | `opts` | Brandl Hanım'ı ziyaret etmek | GEÇTİ |
| 27-027 | gun-27 | `m1:27:v1.b1.ay0` | `q_tr` | Pichler Bey nerede oturuyor? | GEÇTİ |
| 27-028 | gun-27 | `m1:27:v1.b1.ay0.opt0` | `opts` | İkinci katta | GEÇTİ |
| 27-029 | gun-27 | `m1:27:v1.b1.ay0.opt1` | `opts` | Birinci katta, Brandl Hanım'ın yanında | GEÇTİ |
| 27-030 | gun-27 | `m1:27:v1.b1.ay0.opt2` | `opts` | Üçüncü katta | GEÇTİ |
| 27-031 | gun-27 | `m1:27:v1.b1.ay1` | `q_tr` | Boş yer hangi katta? | GEÇTİ |
| 27-032 | gun-27 | `m1:27:v1.b1.ay1.opt0` | `opts` | Birinci katta | GEÇTİ |
| 27-033 | gun-27 | `m1:27:v1.b1.ay1.opt1` | `opts` | İkinci katta | GEÇTİ |
| 27-034 | gun-27 | `m1:27:v1.b1.ay1.opt2` | `opts` | Üçüncü katta | GEÇTİ |
| 27-035 | gun-27 | `m1:27:v1.b1.d1` | `q_tr` | Hangi katı duydun? | GEÇTİ |
| 27-036 | gun-27 | `m1:27:v1.b1.d5` | `gorev_tr` | Pichler Bey'in nerede oturduğunu Almanca bir cümleyle yaz. | GEÇTİ |
| 27-037 | gun-27 | `m1:27:v1:c1` | `situation_tr` | Brandl Hanım sana da soruyor. Sen ikinci katta oturuyorsun. | GEÇTİ |
| 27-038 | gun-27 | `m1:27:v1:c1` | `why_tr` | Kat için **im** dersin: **im zweiten Stock**. | GEÇTİ |
| 27-039 | gun-27 | `m1:27:a1` | `ortam_tr` | Apartmandaki herkese Pichler Bey'den bir sesli mesaj gelmiş. | GEÇTİ |
| 27-040 | gun-27 | `m1:27:a1.b1.ana` | `q_tr` | Duyuru ne hakkında? | GEÇTİ |
| 27-041 | gun-27 | `m1:27:a1.b1.ana.opt0` | `opts` | Apartman kuralları ve teknisyen | GEÇTİ |
| 27-042 | gun-27 | `m1:27:a1.b1.ana.opt1` | `opts` | Kira | GEÇTİ |
| 27-043 | gun-27 | `m1:27:a1.b1.ana.opt2` | `opts` | Bir parti | GEÇTİ |
| 27-044 | gun-27 | `m1:27:a1.b1.ay0` | `q_tr` | Bisikletler nerede durmalı? | GEÇTİ |
| 27-045 | gun-27 | `m1:27:a1.b1.ay0.opt0` | `opts` | Koridorda | GEÇTİ |
| 27-046 | gun-27 | `m1:27:a1.b1.ay0.opt1` | `opts` | Evin arkasında | GEÇTİ |
| 27-047 | gun-27 | `m1:27:a1.b1.ay0.opt2` | `opts` | Evin önünde | GEÇTİ |
| 27-048 | gun-27 | `m1:27:a1.b1.ay1` | `q_tr` | Teknisyen cumartesi hangi katta? | GEÇTİ |
| 27-049 | gun-27 | `m1:27:a1.b1.ay1.opt0` | `opts` | Birinci katta | GEÇTİ |
| 27-050 | gun-27 | `m1:27:a1.b1.ay1.opt1` | `opts` | İkinci katta | GEÇTİ |
| 27-051 | gun-27 | `m1:27:a1.b1.ay1.opt2` | `opts` | Üçüncü katta | GEÇTİ |
| 27-052 | gun-27 | `m1:27:a1.b1.d1` | `q_tr` | Hangi katı duydun? | GEÇTİ |
| 27-053 | gun-27 | `m1:27:a1.b1.d5` | `gorev_tr` | Duyuruyu Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 27-054 | gun-27 | `m1:27:a1:c1` | `situation_tr` | Brandl Hanım duyuruyu duymadı. Bisikletler pazartesiden itibaren evin arkasında. | GEÇTİ |
| 27-055 | gun-27 | `m1:27:a1:c1` | `why_tr` | Arkasında derken **hinter dem Haus** dersin. | GEÇTİ |
| 27-056 | gun-27 | `m1:27:a1:e1` | `q_tr` | Bisikletin koridorda duruyor. Ne yapmalısın? | GEÇTİ |
| 27-057 | gun-27 | `m1:27:a1:e1.opt0` | `opts` | Bir şey yapma. | GEÇTİ |
| 27-058 | gun-27 | `m1:27:a1:e1.opt1` | `opts` | Bisikleti mutfağa al. | GEÇTİ |
| 27-059 | gun-27 | `m1:27:a1:e1.opt2` | `opts` | Pazartesiden itibaren bisikleti evin arkasına koy. | GEÇTİ |
| 27-060 | gun-27 | `m1:27:a1:e1` | `why_tr` | Pichler Bey pazartesiden itibaren bisikletlerin evin arkasında durmasını istiyor. | GEÇTİ |
| 27-061 | gun-27 | `m1:27:a2` | `ortam_tr` | Derya sana geliyor ve telefonuna mesaj bırakmış. | GEÇTİ |
| 27-062 | gun-27 | `m1:27:a2.b1.ana` | `q_tr` | Derya neden arıyor? | GEÇTİ |
| 27-063 | gun-27 | `m1:27:a2.b1.ana.opt0` | `opts` | Kursu soruyor | GEÇTİ |
| 27-064 | gun-27 | `m1:27:a2.b1.ana.opt1` | `opts` | Evinin yerini ve katını soruyor | GEÇTİ |
| 27-065 | gun-27 | `m1:27:a2.b1.ana.opt2` | `opts` | Gelemeyeceğini söylüyor | GEÇTİ |
| 27-066 | gun-27 | `m1:27:a2.b1.ay0` | `q_tr` | Derya şimdi nerede? | GEÇTİ |
| 27-067 | gun-27 | `m1:27:a2.b1.ay0.opt0` | `opts` | İstasyonda | GEÇTİ |
| 27-068 | gun-27 | `m1:27:a2.b1.ay0.opt1` | `opts` | Süpermarkette | GEÇTİ |
| 27-069 | gun-27 | `m1:27:a2.b1.ay0.opt2` | `opts` | Senin kapında | GEÇTİ |
| 27-070 | gun-27 | `m1:27:a2.b1.ay1` | `q_tr` | Derya yanında ne getiriyor? | GEÇTİ |
| 27-071 | gun-27 | `m1:27:a2.b1.ay1.opt0` | `opts` | Fincan | GEÇTİ |
| 27-072 | gun-27 | `m1:27:a2.b1.ay1.opt1` | `opts` | Pasta | GEÇTİ |
| 27-073 | gun-27 | `m1:27:a2.b1.ay1.opt2` | `opts` | Ekmek | GEÇTİ |
| 27-074 | gun-27 | `m1:27:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 27-075 | gun-27 | `m1:27:a2.b1.d5` | `gorev_tr` | Derya'nın mesajını Almanca bir kısa cümleyle özetle. | GEÇTİ |
| 27-076 | gun-27 | `m1:27:a2:c1` | `situation_tr` | Derya'yı geri arıyorsun. Evin süpermarketin yanında değil, arkasında. İkinci kattasın. | GEÇTİ |
| 27-077 | gun-27 | `m1:27:a2:c1` | `why_tr` | Düzeltirken **nicht neben** yerine doğru yeri söyle: **hinter dem Supermarkt**. | GEÇTİ |
| 27-078 | gun-27 | `m1:27:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 27-079 | gun-27 | `m1:27:a2:e1.opt0` | `opts` | İstasyona git ve pastayı al. | GEÇTİ |
| 27-080 | gun-27 | `m1:27:a2:e1.opt1` | `opts` | Derya'ya evinin yerini ve katını söyle. | GEÇTİ |
| 27-081 | gun-27 | `m1:27:a2:e1.opt2` | `opts` | Süpermarkete git. | GEÇTİ |
| 27-082 | gun-27 | `m1:27:a2:e1` | `why_tr` | Derya istasyondan geliyor ve evinin yerini bilmiyor. | GEÇTİ |
| 27-083 | gun-27 | `m1:27:p1` | `durum_tr` | Merdivende Brandl Hanım'la karşılaşıyorsun. Katını karıştırıyor, eşyalarını ve dükkânları soruyor. Sen ikinci katta oturuyorsun. | GEÇTİ |
| 27-084 | gun-27 | `m1:27:p1.n1.s0` | `geri_bildirim_tr` | Doğru. Kibarca düzelttin, kat için **im** dedin. | GEÇTİ |
| 27-085 | gun-27 | `m1:27:p1.n1.s1` | `geri_bildirim_tr` | Çok iyi. Kapının yönünü de söyledin. | GEÇTİ |
| 27-086 | gun-27 | `m1:27:p1.n1.s2` | `geri_bildirim_tr` | Katlar için **im** dersin: **im zweiten Stock**. | GEÇTİ |
| 27-087 | gun-27 | `m1:27:p1.n2.s0` | `geri_bildirim_tr` | Doğru. **das Fahrrad** için **es** ve **hinter dem Haus**. | GEÇTİ |
| 27-088 | gun-27 | `m1:27:p1.n2.s1` | `geri_bildirim_tr` | Olur. **in der Werkstatt** doğru. | GEÇTİ |
| 27-089 | gun-27 | `m1:27:p1.n2.s2` | `geri_bildirim_tr` | **das Fahrrad** için **es** dersin. | GEÇTİ |
| 27-090 | gun-27 | `m1:27:p1.n3.s0` | `geri_bildirim_tr` | Doğru. **hinter dem Bahnhof** dedin. | GEÇTİ |
| 27-091 | gun-27 | `m1:27:p1.n3.s1` | `geri_bildirim_tr` | Harika. **zwischen** ile iki yeri doğru söyledin. | GEÇTİ |
| 27-092 | gun-27 | `m1:27:p1.n3.s2` | `geri_bildirim_tr` | **die Apotheke** için **neben der Apotheke** dersin. | GEÇTİ |
| 27-093 | gun-27 | `m1:27:p1.n4.s0` | `geri_bildirim_tr` | Güzel. **die Küche** için **sie** dedin. | GEÇTİ |
| 27-094 | gun-27 | `m1:27:p1.n4.s1` | `geri_bildirim_tr` | Çok iyi. Hem tarif ettin hem yer söyledin. | GEÇTİ |
| 27-095 | gun-27 | `m1:27:p1.n4.s2` | `geri_bildirim_tr` | **die Küche** için **sie** dersin. | GEÇTİ |
| 27-096 | gun-27 | `m1:27:p1` | `kapanis_tr` | Nerede oturduğunu, bisikletinin ve süpermarketin yerini in, hinter, neben, zwischen ile anlattın. | GEÇTİ |
| 27-097 | gun-27 | `m1:27:o1` | `q_tr` | Derya ne zaman geliyor? | GEÇTİ |
| 27-098 | gun-27 | `m1:27:o1.opt0` | `opts` | Cumartesi | GEÇTİ |
| 27-099 | gun-27 | `m1:27:o1.opt1` | `opts` | Pazar | GEÇTİ |
| 27-100 | gun-27 | `m1:27:o1.opt2` | `opts` | Yarın | GEÇTİ |
| 27-101 | gun-27 | `m1:27:o2` | `q_tr` | Derya neyi soruyor? | GEÇTİ |
| 27-102 | gun-27 | `m1:27:o2.opt0` | `opts` | Evinin yerini ve katını | GEÇTİ |
| 27-103 | gun-27 | `m1:27:o2.opt1` | `opts` | Kursun saatini | GEÇTİ |
| 27-104 | gun-27 | `m1:27:o2.opt2` | `opts` | Süpermarketin fiyatlarını | GEÇTİ |
| 27-105 | gun-27 | `m1:27:yazma` | `gorev_tr` | Derya'ya cevap yaz. Evin Brunnengasse 7'de, istasyona uzak değil, süpermarketin arkasında. Sen ikinci kattasın. | GEÇTİ |
| 27-106 | gun-27 | `m1:27:yazma.0` | `kontrol_tr` | Sokağı ve numarayı yazdın mı? | GEÇTİ |
| 27-107 | gun-27 | `m1:27:yazma.1` | `kontrol_tr` | Kat için **im zweiten Stock** yazdın mı? | GEÇTİ |
| 27-108 | gun-27 | `m1:27:yazma.2` | `kontrol_tr` | Yer için **hinter** ya da **neben** kullandın mı? | GEÇTİ |
| 27-109 | gun-27 | `m1:27:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 27-110 | gun-27 | `m1:27:s1` | `why_tr` | **auf dem** üstünde demektir. | GEÇTİ |
| 27-111 | gun-27 | `m1:27:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 27-112 | gun-27 | `m1:27:s2` | `why_tr` | **hinter** arkasında demektir. | GEÇTİ |
| 27-113 | gun-27 | `m1:27:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 27-114 | gun-27 | `m1:27:s3` | `why_tr` | Kat için **im ersten Stock** dersin. | GEÇTİ |
| 27-115 | gun-27 | `m1:27:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 27-116 | gun-27 | `m1:27:s4` | `why_tr` | **Moment** bir dakika demektir. | GEÇTİ |
| 27-117 | gun-27 | `m1:27:s5` | `why_tr` | Yanında derken **neben** dersin. **der Supermarkt** burada **dem** olur. | GEÇTİ |
| 27-118 | gun-27 | `m1:27:s6` | `why_tr` | Önünde derken **vor** dersin. | GEÇTİ |
| 27-119 | gun-27 | `m1:27:s7` | `why_tr` | **in dem** kısalıp **im** olur. | GEÇTİ |
| 27-120 | gun-27 | `m1:27:s8` | `why_tr` | Birlikte derken **zusammen** dersin. | GEÇTİ |
| 27-121 | gun-27 | `m1:27:s9` | `situation_tr` | Ioana ehliyetini soruyor. Sandalyenin üstünde duruyor. | GEÇTİ |
| 27-122 | gun-27 | `m1:27:s9` | `why_tr` | **der Führerschein** için **er** dersin. Üstünde **auf dem**. | GEÇTİ |
| 27-123 | gun-27 | `m1:27:s10` | `situation_tr` | Yeni komşu süpermarketi soruyor. İstasyonun arkasında. | GEÇTİ |
| 27-124 | gun-27 | `m1:27:s10` | `why_tr` | Arkasında derken **hinter dem** dersin. | GEÇTİ |
| 27-125 | gun-27 | `m1:27:s11` | `situation_tr` | Yeni bir komşu soruyor: Nerede oturuyorsun? İkinci kattasın, evin arkasında da bisikletin var. | GEÇTİ |
| 27-126 | gun-27 | `m1:27:s11` | `why_tr` | Kat için **im**, yer için **hinter** kullan. | GEÇTİ |
| 28-001 | gun-28 | `g28` | `goal_tr` | Merdivende Brandl Hanım'a kim olduğunu, nerede oturduğunu ve evini anlatır, Pichler Bey'in duyurusundan senden isteneni anlarsın. | GERİ |
| 28-002 | gun-28 | `g28` | `can_do.tr` | Komşuma evimi ve nerede oturduğumu anlatırım. | GEÇTİ |
| 28-003 | gun-28 | `m1:28:h1.kalip0` | `kaliplar.tr` | … çalıyor, oynuyor | GEÇTİ |
| 28-004 | gun-28 | `m1:28:h1.kalip1` | `kaliplar.tr` | Merhaba! – Telefonda: hoşça kalın! | GEÇTİ |
| 28-005 | gun-28 | `m1:28:h1.kalip2` | `kaliplar.tr` | birinci katta – ikinci katta | GEÇTİ |
| 28-006 | gun-28 | `m1:28:h1.kalip3` | `kaliplar.tr` | …'in yanında – …'in arkasında | GEÇTİ |
| 28-007 | gun-28 | `m1:28:h1.kalip4` | `kaliplar.tr` | …'i nasıl buluyorsunuz? – Bence çok güzel. | GEÇTİ |
| 28-008 | gun-28 | `m1:28:h1.kalip5` | `kaliplar.tr` | oldukça … | GEÇTİ |
| 28-009 | gun-28 | `m1:28:h1.kalip6` | `kaliplar.tr` | evde – … kalıyorum | GEÇTİ |
| 28-010 | gun-28 | `m1:28:h1.kalip7` | `kaliplar.tr` | …'i unutma! | GEÇTİ |
| 28-011 | gun-28 | `m1:28:h1.kalip8` | `kaliplar.tr` | … duruyor | GEÇTİ |
| 28-012 | gun-28 | `m1:28:h1.kalip9` | `kaliplar.tr` | daha ucuz – en ucuz | GEÇTİ |
| 28-013 | gun-28 | `m1:28:h1.sahne` | `ortam_tr` | Akşam, merdiven boşluğu. Yukarıdan müzik geliyor. Brandl Hanım kapısını açıyor. | GEÇTİ |
| 28-014 | gun-28 | `m1:28:h1.soru` | `q_tr` | Müziği kim çalıyor? | GEÇTİ |
| 28-015 | gun-28 | `m1:28:h1.soru.opt0` | `opts` | Pichler Bey | GEÇTİ |
| 28-016 | gun-28 | `m1:28:h1.soru.opt1` | `opts` | Komşu | GEÇTİ |
| 28-017 | gun-28 | `m1:28:h1.soru.opt2` | `opts` | Brandl Hanım | GEÇTİ |
| 28-018 | gun-28 | `m1:28:v1.b1.ana` | `q_tr` | Brandl Hanım ile Pichler Bey ne konuşuyor? | GEÇTİ |
| 28-019 | gun-28 | `m1:28:v1.b1.ana.opt0` | `opts` | Apartmandaki müziği ve yarınki misafirleri | GEÇTİ |
| 28-020 | gun-28 | `m1:28:v1.b1.ana.opt1` | `opts` | Kirayı | GEÇTİ |
| 28-021 | gun-28 | `m1:28:v1.b1.ana.opt2` | `opts` | Yeni bir evi | GEÇTİ |
| 28-022 | gun-28 | `m1:28:v1.b1.ay0` | `q_tr` | Pichler Bey'e göre saat kaçtan sonra müzik olmaz? | GEÇTİ |
| 28-023 | gun-28 | `m1:28:v1.b1.ay0.opt0` | `opts` | Sekizden sonra | GEÇTİ |
| 28-024 | gun-28 | `m1:28:v1.b1.ay0.opt1` | `opts` | Ondan sonra | GEÇTİ |
| 28-025 | gun-28 | `m1:28:v1.b1.ay0.opt2` | `opts` | On ikiden sonra | GEÇTİ |
| 28-026 | gun-28 | `m1:28:v1.b1.ay1` | `q_tr` | Anna'nın oğlu nerede oynamalı? | GEÇTİ |
| 28-027 | gun-28 | `m1:28:v1.b1.ay1.opt0` | `opts` | Koridorda | GEÇTİ |
| 28-028 | gun-28 | `m1:28:v1.b1.ay1.opt1` | `opts` | Mutfakta | GEÇTİ |
| 28-029 | gun-28 | `m1:28:v1.b1.ay1.opt2` | `opts` | Evin arkasında | GEÇTİ |
| 28-030 | gun-28 | `m1:28:v1.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 28-031 | gun-28 | `m1:28:v1.b1.d5` | `gorev_tr` | Sahneyi Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 28-032 | gun-28 | `m1:28:v1:c1` | `situation_tr` | Pichler Bey sana da soruyor. Müziği duyuyorsun ama kötü değil. | GEÇTİ |
| 28-033 | gun-28 | `m1:28:v1:c1` | `why_tr` | Kötü değil derken **nicht schlimm** dersin. | GEÇTİ |
| 28-034 | gun-28 | `m1:28:a1` | `ortam_tr` | Pichler Bey bütün kiracılara hızlı bir sesli mesaj bırakmış. Senden ne istediğini anla. | GEÇTİ |
| 28-035 | gun-28 | `m1:28:a1.b1.ana` | `q_tr` | Pichler Bey neden arıyor? | GEÇTİ |
| 28-036 | gun-28 | `m1:28:a1.b1.ana.opt0` | `opts` | Teknisyen geliyor ve müzik kuralını hatırlatıyor | GEÇTİ |
| 28-037 | gun-28 | `m1:28:a1.b1.ana.opt1` | `opts` | Kirayı istiyor | GEÇTİ |
| 28-038 | gun-28 | `m1:28:a1.b1.ana.opt2` | `opts` | Bir parti duyuruyor | GEÇTİ |
| 28-039 | gun-28 | `m1:28:a1.b1.ay0` | `q_tr` | Teknisyen ne zaman geliyor? | GEÇTİ |
| 28-040 | gun-28 | `m1:28:a1.b1.ay0.opt0` | `opts` | Cumartesi saat dokuzda | GEÇTİ |
| 28-041 | gun-28 | `m1:28:a1.b1.ay0.opt1` | `opts` | Cuma saat dokuzda | GEÇTİ |
| 28-042 | gun-28 | `m1:28:a1.b1.ay0.opt2` | `opts` | Cumartesi saat onda | GEÇTİ |
| 28-043 | gun-28 | `m1:28:a1.b1.ay1` | `q_tr` | Saat kaça kadar evde kalmalısın? | GEÇTİ |
| 28-044 | gun-28 | `m1:28:a1.b1.ay1.opt0` | `opts` | Dokuza kadar | GEÇTİ |
| 28-045 | gun-28 | `m1:28:a1.b1.ay1.opt1` | `opts` | Ona kadar | GEÇTİ |
| 28-046 | gun-28 | `m1:28:a1.b1.ay1.opt2` | `opts` | On ikiye kadar | GEÇTİ |
| 28-047 | gun-28 | `m1:28:a1.b1.d1` | `q_tr` | Hangi saati duydun? | GEÇTİ |
| 28-048 | gun-28 | `m1:28:a1.b1.d5` | `gorev_tr` | Pichler Bey'in senden istediğini Almanca iki kısa cümleyle yaz. | GEÇTİ |
| 28-049 | gun-28 | `m1:28:a1:c1` | `situation_tr` | Ioana mesajı duymadı. Pichler Bey'in ne istediğini ona söyle. | GEÇTİ |
| 28-050 | gun-28 | `m1:28:a1:c1` | `why_tr` | İsteği kendin için söyle: **ich bleibe**. Kural için **keine Musik** dersin. | GEÇTİ |
| 28-051 | gun-28 | `m1:28:a1:e1` | `q_tr` | Pichler Bey senden ne istiyor? | GEÇTİ |
| 28-052 | gun-28 | `m1:28:a1:e1.opt0` | `opts` | Cumartesi saat ona kadar evde kal, akşam ondan sonra müzik açma. | GEÇTİ |
| 28-053 | gun-28 | `m1:28:a1:e1.opt1` | `opts` | Cumartesi teknisyeni ara. | GEÇTİ |
| 28-054 | gun-28 | `m1:28:a1:e1.opt2` | `opts` | Cumartesi bütün gün dışarıda ol. | GEÇTİ |
| 28-055 | gun-28 | `m1:28:a1:e1` | `why_tr` | Teknisyen cumartesi dokuzda mutfağına geliyor. Akşam ondan sonra müzik yok. | GERİ |
| 28-056 | gun-28 | `m1:28:a2` | `ortam_tr` | İş yerindeki yılsonu kutlaması yaklaşıyor. Derya telefonuna mesaj bırakmış. | GEÇTİ |
| 28-057 | gun-28 | `m1:28:a2.b1.ana` | `q_tr` | Derya neden arıyor? | GEÇTİ |
| 28-058 | gun-28 | `m1:28:a2.b1.ana.opt0` | `opts` | Daveti hatırlatıyor ve fincan istiyor | GEÇTİ |
| 28-059 | gun-28 | `m1:28:a2.b1.ana.opt1` | `opts` | Toplantıyı iptal ediyor | GEÇTİ |
| 28-060 | gun-28 | `m1:28:a2.b1.ana.opt2` | `opts` | Müzikten şikâyet ediyor | GEÇTİ |
| 28-061 | gun-28 | `m1:28:a2.b1.ay0` | `q_tr` | Kutlama ne zaman? | GEÇTİ |
| 28-062 | gun-28 | `m1:28:a2.b1.ay0.opt0` | `opts` | Cumartesi saat altıda | GEÇTİ |
| 28-063 | gun-28 | `m1:28:a2.b1.ay0.opt1` | `opts` | Cuma saat altıda | GEÇTİ |
| 28-064 | gun-28 | `m1:28:a2.b1.ay0.opt2` | `opts` | Cuma saat onda | GEÇTİ |
| 28-065 | gun-28 | `m1:28:a2.b1.ay1` | `q_tr` | Derya ne istiyor? | GEÇTİ |
| 28-066 | gun-28 | `m1:28:a2.b1.ay1.opt0` | `opts` | Pasta | GEÇTİ |
| 28-067 | gun-28 | `m1:28:a2.b1.ay1.opt1` | `opts` | Müzik | GEÇTİ |
| 28-068 | gun-28 | `m1:28:a2.b1.ay1.opt2` | `opts` | Birkaç fincan | GEÇTİ |
| 28-069 | gun-28 | `m1:28:a2.b1.d1` | `q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 28-070 | gun-28 | `m1:28:a2.b1.d5` | `gorev_tr` | Derya'nın mesajını Almanca bir iki kısa cümleyle özetle. | GEÇTİ |
| 28-071 | gun-28 | `m1:28:a2:c1` | `situation_tr` | Derya'yı geri arıyorsun. Dört fincanın var. | GEÇTİ |
| 28-072 | gun-28 | `m1:28:a2:c1` | `why_tr` | Birkaç derken **ein paar** dersin. | GEÇTİ |
| 28-073 | gun-28 | `m1:28:a2:e1` | `q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 28-074 | gun-28 | `m1:28:a2:e1.opt0` | `opts` | Cuma saat altıda birkaç fincanla ofise git. | GEÇTİ |
| 28-075 | gun-28 | `m1:28:a2:e1.opt1` | `opts` | Bir pasta yap. | GEÇTİ |
| 28-076 | gun-28 | `m1:28:a2:e1.opt2` | `opts` | Derya'yı cumartesi ara. | GEÇTİ |
| 28-077 | gun-28 | `m1:28:a2:e1` | `why_tr` | Kutlama cuma saat altıda ofiste. Derya fincan istiyor. | GEÇTİ |
| 28-078 | gun-28 | `m1:28:p1` | `durum_tr` | İlk günü yeniden oynuyorsun. Brandl Hanım seni merdivende ilk kez görüyor. Kim olduğunu, nerede oturduğunu ve evini anlat. Sen ikinci kattasın. Mutfağın küçük ama aydınlık, bisikletin tamirhanede. | GEÇTİ |
| 28-079 | gun-28 | `m1:28:p1.n1.s0` | `geri_bildirim_tr` | Güzel. Selam verdin, adını ve burada oturduğunu söyledin. | GEÇTİ |
| 28-080 | gun-28 | `m1:28:p1.n1.s1` | `geri_bildirim_tr` | Kibar bir tanışma. **Freut mich** sıcak duyulur. | GEÇTİ |
| 28-081 | gun-28 | `m1:28:p1.n1.s2` | `geri_bildirim_tr` | Çok kısa ve kapalı. Adını söyle ve tanış. | GEÇTİ |
| 28-082 | gun-28 | `m1:28:p1.n2.s0` | `geri_bildirim_tr` | Çok iyi. Cevap verdin ve soruyu geri sordun. | GEÇTİ |
| 28-083 | gun-28 | `m1:28:p1.n2.s1` | `geri_bildirim_tr` | Doğru. Kat için **im** dedin. | GEÇTİ |
| 28-084 | gun-28 | `m1:28:p1.n2.s2` | `geri_bildirim_tr` | Katlar için **im** dersin: **im zweiten Stock**. | GEÇTİ |
| 28-085 | gun-28 | `m1:28:p1.n3.s0` | `geri_bildirim_tr` | Güzel. **die Küche** için **sie**, sıfatlar da doğru. | GERİ |
| 28-086 | gun-28 | `m1:28:p1.n3.s1` | `geri_bildirim_tr` | Harika. Hem tarif ettin hem yer söyledin. | GEÇTİ |
| 28-087 | gun-28 | `m1:28:p1.n3.s2` | `geri_bildirim_tr` | **die Küche** için **sie** dersin. | GEÇTİ |
| 28-088 | gun-28 | `m1:28:p1.n4.s0` | `geri_bildirim_tr` | Sıcak bir cevap. Brandl Hanım çok sevindi. | GEÇTİ |
| 28-089 | gun-28 | `m1:28:p1.n4.s1` | `geri_bildirim_tr` | Dürüst ve kibar. **ziemlich** ile yumuşattın. | GEÇTİ |
| 28-090 | gun-28 | `m1:28:p1.n4.s2` | `geri_bildirim_tr` | **zu** bir sorun bildirir. **sehr schön** de. | GEÇTİ |
| 28-091 | gun-28 | `m1:28:p1.n5.s0` | `geri_bildirim_tr` | Doğru. **das Fahrrad** için **es** dedin. | GEÇTİ |
| 28-092 | gun-28 | `m1:28:p1.n5.s1` | `geri_bildirim_tr` | Güzel. Pichler Bey'in kuralını biliyorsun. | GEÇTİ |
| 28-093 | gun-28 | `m1:28:p1.n5.s2` | `geri_bildirim_tr` | Pichler Bey bisikletleri evin arkasında istiyor, koridorda değil. | GEÇTİ |
| 28-094 | gun-28 | `m1:28:p1.n6.s0` | `geri_bildirim_tr` | Davete sıcak bir evet. | GEÇTİ |
| 28-095 | gun-28 | `m1:28:p1.n6.s1` | `geri_bildirim_tr` | Çok iyi. Hemen bir gün önerdin. | GEÇTİ |
| 28-096 | gun-28 | `m1:28:p1` | `kapanis_tr` | Brandl Hanım'a kim olduğunu, nerede oturduğunu ve evini anlattın. Haftanın kapısından geçtin. | GERİ |
| 28-097 | gun-28 | `m1:28:o1` | `q_tr` | Bisikletler nerede durmalı? | GEÇTİ |
| 28-098 | gun-28 | `m1:28:o1.opt0` | `opts` | Koridorda | GEÇTİ |
| 28-099 | gun-28 | `m1:28:o1.opt1` | `opts` | Evin arkasında | GEÇTİ |
| 28-100 | gun-28 | `m1:28:o1.opt2` | `opts` | Evin önünde | GEÇTİ |
| 28-101 | gun-28 | `m1:28:o2` | `q_tr` | Akşam müzik ne zamana kadar olur? | GEÇTİ |
| 28-102 | gun-28 | `m1:28:o2.opt0` | `opts` | Saat ona kadar | GEÇTİ |
| 28-103 | gun-28 | `m1:28:o2.opt1` | `opts` | Saat sekize kadar | GEÇTİ |
| 28-104 | gun-28 | `m1:28:o2.opt2` | `opts` | Gece yarısına kadar | GEÇTİ |
| 28-105 | gun-28 | `m1:28:o3` | `q_tr` | Apartman görevlisi nerede oturuyor? | GEÇTİ |
| 28-106 | gun-28 | `m1:28:o3.opt0` | `opts` | İkinci katta | GEÇTİ |
| 28-107 | gun-28 | `m1:28:o3.opt1` | `opts` | Birinci katta, Brandl Hanım'ın yanında | GEÇTİ |
| 28-108 | gun-28 | `m1:28:o3.opt2` | `opts` | Evin arkasında | GEÇTİ |
| 28-109 | gun-28 | `m1:28:o4` | `situation_tr` | Ioana bisikletini koridora koymak istiyor. Ona kuralı söyle. | GEÇTİ |
| 28-110 | gun-28 | `m1:28:o4` | `why_tr` | Notta **hinter dem Haus, nicht im Flur** yazıyor. | GEÇTİ |
| 28-111 | gun-28 | `m1:28:s1` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 28-112 | gun-28 | `m1:28:s1` | `why_tr` | **neben der Tasse** fincanın yanında demektir. | GEÇTİ |
| 28-113 | gun-28 | `m1:28:s2` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 28-114 | gun-28 | `m1:28:s2` | `why_tr` | **zu groß** fazla büyük, yani sorun var. | GEÇTİ |
| 28-115 | gun-28 | `m1:28:s3` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 28-116 | gun-28 | `m1:28:s3` | `why_tr` | **die Jacke** ile **welche** dersin. | GEÇTİ |
| 28-117 | gun-28 | `m1:28:s4` | `situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 28-118 | gun-28 | `m1:28:s4` | `why_tr` | **am billigsten** en ucuz demektir. | GEÇTİ |
| 28-119 | gun-28 | `m1:28:s5` | `why_tr` | Yanında derken **neben** dersin. | GEÇTİ |
| 28-120 | gun-28 | `m1:28:s6` | `why_tr` | **die Garantie** garanti demektir. | GEÇTİ |
| 28-121 | gun-28 | `m1:28:s7` | `why_tr` | Sıfat **ist** ile değişmez. **sehr** güçlendirir. | GERİ |
| 28-122 | gun-28 | `m1:28:s8` | `why_tr` | **sehr schön** çok güzel demektir. | GEÇTİ |
| 28-123 | gun-28 | `m1:28:s9` | `situation_tr` | İlk gün sahnesi. Brandl Hanım kim olduğunu soruyor. Adını, katını söyle ve memnun olduğunu belirt. | GEÇTİ |
| 28-124 | gun-28 | `m1:28:s9` | `why_tr` | Önce adını, sonra katını söyle: **im zweiten Stock**. | GEÇTİ |
| 28-125 | gun-28 | `m1:28:s10` | `situation_tr` | Pichler Bey bisikletini soruyor. Evin arkasında. | GEÇTİ |
| 28-126 | gun-28 | `m1:28:s10` | `why_tr` | **das Fahrrad** için **es**, arkasında için **hinter dem Haus**. | GEÇTİ |
| 28-127 | gun-28 | `m1:28:s11` | `situation_tr` | Haftanın kapısı, ilk gün sahnesi. Merdivende Brandl Hanım. Kim olduğunu, nerede oturduğunu ve evini anlat. | GERİ |
| 28-128 | gun-28 | `m1:28:s11` | `why_tr` | Üç şey söyle: adın, katın ve evinden bir şey. | GEÇTİ |
| hst-001 | hafta-sonu-testi-04 | `m1:28:t01` | `situation_tr` | Hayır, eczane süpermarketin yanında. Düzelt. | GEÇTİ |
| hst-002 | hafta-sonu-testi-04 | `m1:28:t01` | `why_tr` | **die Apotheke** için **sie** dersin. Yanında **neben dem**. | GEÇTİ |
| hst-003 | hafta-sonu-testi-04 | `m1:28:t02` | `why_tr` | **ist** ikinci sırada, **nicht** sıfatın önünde durur. | GERİ |
| hst-004 | hafta-sonu-testi-04 | `m1:28:t03` | `why_tr` | **die Tasse** için **sie** dersin. | GEÇTİ |
| hst-005 | hafta-sonu-testi-04 | `m1:28:t04` | `situation_tr` | Ucuz olanı al ve nedenini söyle. | GEÇTİ |
| hst-006 | hafta-sonu-testi-04 | `m1:28:t04` | `why_tr` | **das Sofa** için **es**, daha ucuz için **billiger** dersin. | GEÇTİ |
| hst-007 | hafta-sonu-testi-04 | `m1:28:t05` | `instr_tr` | Sorun olduğunu söyle. **sehr** yerine **zu** kullan. | GEÇTİ |
| hst-008 | hafta-sonu-testi-04 | `m1:28:t05` | `why_tr` | **sehr** yalnızca çok demektir. **zu** bir sorun bildirir. | GEÇTİ |
| hst-009 | hafta-sonu-testi-04 | `m1:28:t06` | `why_tr` | Karşılaştırmada **billiger als** dersin. | GEÇTİ |
| hst-010 | hafta-sonu-testi-04 | `m1:28:t07` | `situation_tr` | Koridoru aydınlık ve güzel buluyorsun. Söyle. | GEÇTİ |
| hst-011 | hafta-sonu-testi-04 | `m1:28:t07` | `why_tr` | **der Flur** için **er** dersin. Sıfat değişmez. | GERİ |
| hst-012 | hafta-sonu-testi-04 | `m1:28:t08` | `why_tr` | **liegt** ikinci sırada durur. **im** in dem demektir. | GERİ |
| hst-013 | hafta-sonu-testi-04 | `m1:28:t09` | `situation_tr` | Yeni bir komşu kendini tanıtıyor. Memnun olduğunu söyle, adını ve katını söyle. | GEÇTİ |
| hst-014 | hafta-sonu-testi-04 | `m1:28:t09` | `why_tr` | Önce **Freut mich**, sonra adın ve **im zweiten Stock**. | GEÇTİ |
| hst-015 | hafta-sonu-testi-04 | `m1:28:t10` | `why_tr` | Önünde derken **vor dem** dersin. | GEÇTİ |
| hst-016 | hafta-sonu-testi-04 | `m1:28:t11` | `situation_tr` | Ne zaman evde olman gerektiğini kısaca söyle. | GEÇTİ |
| hst-017 | hafta-sonu-testi-04 | `m1:28:t11` | `why_tr` | Gün için **am**, saat için **um** dersin. | GEÇTİ |
| hst-018 | hafta-sonu-testi-04 | `m1:28:t12` | `why_tr` | Unutma derken **Vergiss das nicht** dersin. | GEÇTİ |
| gor-001 | gorulmemis-04 | `m1:h04:g1` | `durum_tr` | Bir kafede yeni biriyle tanıştın. Nerede oturduğunu ve buraya uzak olup olmadığını soruyor. Sen Brunnengasse'de, ikinci katta oturuyorsun. | GEÇTİ |
| gor-002 | gorulmemis-04 | `m1:h04:g1` | `why_tr` | Sokak için **in der**, kat için **im** dersin. Uzak değil derken **nicht weit**. | GEÇTİ |
| gor-003 | gorulmemis-04 | `m1:h04:g2` | `durum_tr` | Bir arkadaşın telefonda ehliyetini bulamıyor. Ona olası yerleri sor. | GEÇTİ |
| gor-004 | gorulmemis-04 | `m1:h04:g2` | `why_tr` | **der Führerschein** için **er** dersin. Soruda **Ist er** ya da **Liegt er** başa gelir. | GEÇTİ |
| gor-005 | gorulmemis-04 | `m1:h04:g3` | `durum_tr` | Arkadaşın internette iki kanepe buldu: biri 300, biri 200 avro. 300 avroluk fazla büyük. Hangisini alması gerektiğini söyle. | GEÇTİ |
| gor-006 | gorulmemis-04 | `m1:h04:g3` | `why_tr` | Karşılaştırmada **billiger**, sorun için **zu groß** dersin. | GEÇTİ |
| gor-007 | gorulmemis-04 | `m1:h04:g4` | `durum_tr` | Bürgerbüro'da bir memur formu dolduruyor. Adresini ve dairenin kaç odası olduğunu soruyor. Dairen Brunnengasse 7'de, ikinci katta, iki odalı. | GEÇTİ |
| gor-008 | gorulmemis-04 | `m1:h04:g4` | `why_tr` | Önce adresi ve katı söyle. Sayıyı kısaca söylemek yeter: **Zwei** ya da **Zwei Zimmer**. | GEÇTİ |
