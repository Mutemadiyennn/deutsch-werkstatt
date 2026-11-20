# Okur raporu: temel ders r0-11 (praesens-re)

Girdi: `/home/claude/cm/work/praesens-re.txt` (193 satır). Okur: A2 öğrenci, 2. gün, terim bilmez. Ölçüt: OD-9.2 ve `OKUR_DERSLERI.md`.

## GERİ satırları

| alan | açıklama | kendi sözlerimle | neden |
|---|---|---|---|
| `r0:11:a:wohnst-du.exp.anlam_tr` | Samimi olduğun birine evinin burada olup olmadığını sorar. | Birine evin burada mı diye soruyorum. Kimin evi, tam emin olamadım. | iki türlü okunuyor: evinin sözü senin evin diye de karşıdakinin evi diye de okunuyor; ayrıca samimi olduğun biri deniyor ama altındaki kutu yeni tanıştığın biri diyor |
| `r0:11:a:wie-heisst-du.exp.anlam_tr` | Samimi olduğun birine adını sorar. | Samimi olduğum birine adını soruyorum. Ama samimiysem adını zaten bilirim. | gerçek kullanımla örtüşmüyor: samimi olduğum birinin adını zaten bilirim; altındaki kutu tanışırken diyor, ikisi çelişiyor |
| `r0:11:a:ich-gehe.exp.ipucu_tr` | **Ich gehe** gidiyorum demektir, **Dienstag geht** ise salı olur demektir. | Ich gehe gidiyorum demek. Dienstag geht ise salı olur demek. Salı uygun mu, salı mı oluyor, anlamadım. | iki fikir var (Ich gehe ve Dienstag geht); salı olur sözü iki türlü okunuyor (salı uygun / salı oluyor) |
| `r0:11:b:derya-kommt.exp.parcalar[0]` | Derya geliyor | Derya geliyor. Ama cümle Derya Wendlfing'li diyordu, bir yerden mi geliyor? | parçalar soldan sağa okununca Derya Wendlfing'den geliyor çıkıyor, ifadenin anlamı (Derya Wendlfing'li) çıkmıyor |
| `r0:11:b:derya-kommt.exp.parcalar[1]` | Wendlfing'den | Wendlfing'den. Öncekiyle okuyunca Derya Wendlfing'den geliyor çıkıyor. | parçalar soldan sağa okununca Derya Wendlfing'den geliyor çıkıyor, ifadenin anlamı (Derya Wendlfing'li) çıkmıyor |
| `table.satirlar[4]` | onlar | Onlar için sie. Ama sie az önce o satırındaydı, aşağıda Sie de siz. Hangisi hangisi, ayıramadım. | anlamadım: sie hem o satırında hem onlar satırında, Sie de siz satırında; farkı (büyük harf, kim için) hiçbir yerde yazmıyor; onlar hiçbir kartta öğretilmedi |
| `r0:11:d06.why_tr` | **heiß** zaten **ß** ile bittiği için yalnızca **t** gelir: **heißt**. | Kelime ß ile bittiği için yalnız t geliyor. Kiminle söylerken ve neyin yerine, yazmıyor. | anlamadım: kiminle söylerken olduğu (du) ve yalnızca t'nin neyin yerine geldiği yazmıyor |
| `r0:11:d16.why_tr` | **Morgen** başa gelince **gehe** ikinci sırada kalır. | Morgen başa gelirse gehe ikinci oluyor. Ama doğru cümle Ich ile başlıyor, Morgen başta değil. | ifadenin kendisini değil başka cümleyi anlatıyor: doğru cevap Ich ile başlıyor, Morgen başta değil |
| `r0:11:h1.script[2].tr` | Bugün olmaz. Adınız neydi, lütfen? | Bugün olmaz, adınız neydi. Kartta aynı soru Adınız ne diye yazıyordu. | aynı Almanca soruya iki Türkçe karşılık: kartta Adınız ne, burada Adınız neydi; neydi geçmiş gibi okunuyor |
| `r0:11:h1.qs[0].opts[0]` | Doktora gitmek için bir gün istiyor (doğru) | Doktora gitmek için bir gün istiyor. Randevu günü mü, izin günü mü, emin olamadım. | iki türlü okunuyor: bir gün istiyor sözü randevu günü de izin günü de olabilir |
| `mission.task_tr` | Bugün iş yerinde ya da apartmanda biriyle tanış. **Ich heiße** ile adını söyle, sonra **Wie heißt du?** ya da **Wie heißen Sie?** diye sor. | Bugün biriyle tanışıp adımı söyleyeceğim, sonra adını soracağım. İkinci cümle uzun, hangi soruyu kime soracağımı da yazmıyor. | ikinci cümle 16 kelime (14'ten uzun); iki sorudan hangisini kime soracağım yazmıyor |

## Bütün satırlar

| # | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| 1 | `title_tr` | Sonu kişiye göre değişir: heiße, heißt | Kelimenin sonu, kimin yaptığına göre değişiyor. | GEÇTİ |  |
| 2 | `goal_tr` | Ben, sen, o, biz ve siz derken kelimenin sonunu doğru söylemek. | Ben, sen, o, biz, siz derken kelimenin sonunu doğru söyleyeceğim. | GEÇTİ |  |
| 3 | `can_do.tr` | Adımı, nerede oturduğumu ve ne zaman geleceğimi söyler, aynısını başkasına sorarım. | Adımı, evimi, ne zaman geleceğimi söyleyip başkasına da soracağım. | GEÇTİ |  |
| 4 | `r0:11:a:ich-heisse.tr` | Adım {name}. | Türkçesi açık: Adım {name}. | GEÇTİ |  |
| 5 | `r0:11:a:ich-heisse.exp.anlam_tr` | Kendi adını söyler. | Kendi adımı söylüyorum. | GEÇTİ |  |
| 6 | `r0:11:a:ich-heisse.exp.ne_zaman_tr` | Tanışırken, ilk günün videosundaki Berna gibi. | Biriyle tanışırken söylerim, videodaki Berna gibi. | GEÇTİ |  |
| 7 | `r0:11:a:ich-heisse.exp.ipucu_tr` | **ich** ile söylerken sonu **-e** olur: **heiße**. | Ben derken kelimenin sonuna e geliyor. | GEÇTİ |  |
| 8 | `r0:11:a:ich-wohne.tr` | Burada oturuyorum. | Türkçesi açık: Burada oturuyorum. | GEÇTİ |  |
| 9 | `r0:11:a:ich-wohne.exp.anlam_tr` | Evinin burada olduğunu söyler. | Evimin burada olduğunu söylüyorum. | GEÇTİ |  |
| 10 | `r0:11:a:ich-wohne.exp.ne_zaman_tr` | Komşuna ya da yeni tanıştığın birine. | Komşuma ya da yeni tanıştığım birine söylerim. | GEÇTİ |  |
| 11 | `r0:11:a:ich-wohne.exp.ipucu_tr` | **ich** ile yine sonu **-e** olur: **wohne**. | Ben derken burada da sona e geliyor. | GEÇTİ |  |
| 12 | `r0:11:a:ich-wohne.exp.parcalar[0]` | oturuyorum | Bu parça şu demek: oturuyorum | GEÇTİ |  |
| 13 | `r0:11:a:ich-wohne.exp.parcalar[1]` | burada | Bu parça şu demek: burada | GEÇTİ |  |
| 14 | `r0:11:a:wohnst-du.tr` | Burada mı oturuyorsun? | Türkçesi açık: Burada mı oturuyorsun? | GEÇTİ |  |
| 15 | `r0:11:a:wohnst-du.exp.anlam_tr` | Samimi olduğun birine evinin burada olup olmadığını sorar. | Birine evin burada mı diye soruyorum. Kimin evi, tam emin olamadım. | GERİ | iki türlü okunuyor: evinin sözü senin evin diye de karşıdakinin evi diye de okunuyor; ayrıca samimi olduğun biri deniyor ama altındaki kutu yeni tanıştığın biri diyor |
| 16 | `r0:11:a:wohnst-du.exp.ne_zaman_tr` | Yeni tanıştığın bir iş arkadaşına. | Yeni tanıştığım iş arkadaşına sorarım. | GEÇTİ |  |
| 17 | `r0:11:a:wohnst-du.exp.ipucu_tr` | **du** ile söylerken sonu **-st** olur: **wohnst**. | Sen derken sona st geliyor. | GEÇTİ |  |
| 18 | `r0:11:a:wohnst-du.exp.parcalar[0]` | oturuyor musun | Bu parça şu demek: oturuyor musun | GEÇTİ |  |
| 19 | `r0:11:a:wohnst-du.exp.parcalar[1]` | burada | Bu parça şu demek: burada | GEÇTİ |  |
| 20 | `r0:11:a:wie-heisst-du.tr` | Adın ne? | Türkçesi açık: Adın ne? | GEÇTİ |  |
| 21 | `r0:11:a:wie-heisst-du.exp.anlam_tr` | Samimi olduğun birine adını sorar. | Samimi olduğum birine adını soruyorum. Ama samimiysem adını zaten bilirim. | GERİ | gerçek kullanımla örtüşmüyor: samimi olduğum birinin adını zaten bilirim; altındaki kutu tanışırken diyor, ikisi çelişiyor |
| 22 | `r0:11:a:wie-heisst-du.exp.ne_zaman_tr` | İş arkadaşına ya da yaşıtına, tanışırken. | İş arkadaşıyla ya da yaşıtımla tanışırken sorarım. | GEÇTİ |  |
| 23 | `r0:11:a:wie-heisst-du.exp.ipucu_tr` | **heiß** zaten **ß** ile bittiği için **du** ile yalnızca **t** gelir: **heißt**. | Sen derken burada st değil yalnız t ekleniyor, kelime zaten ß ile bitiyor. | GEÇTİ |  |
| 24 | `r0:11:a:ich-komme.tr` | Yarın geliyorum. | Türkçesi açık: Yarın geliyorum. | GEÇTİ |  |
| 25 | `r0:11:a:ich-komme.exp.anlam_tr` | Yarın geleceğini söyler. | Yarın geleceğimi söylüyorum. | GEÇTİ |  |
| 26 | `r0:11:a:ich-komme.exp.ne_zaman_tr` | Bir buluşma ya da randevu için. | Buluşma ya da randevu konuşurken söylerim. | GEÇTİ |  |
| 27 | `r0:11:a:ich-komme.exp.ipucu_tr` | **ich** ile sonu **-e** olur: **komme**. | Ben derken sona e geliyor. | GEÇTİ |  |
| 28 | `r0:11:a:ich-komme.exp.parcalar[0]` | geliyorum | Bu parça şu demek: geliyorum | GEÇTİ |  |
| 29 | `r0:11:a:ich-komme.exp.parcalar[1]` | yarın | Bu parça şu demek: yarın | GEÇTİ |  |
| 30 | `r0:11:a:kommst-du.tr` | Bugün geliyor musun? | Türkçesi açık: Bugün geliyor musun? | GEÇTİ |  |
| 31 | `r0:11:a:kommst-du.exp.anlam_tr` | Samimi olduğun birine bugün gelip gelmediğini sorar. | Samimi olduğum birine bugün gelecek mi diye soruyorum. | GEÇTİ |  |
| 32 | `r0:11:a:kommst-du.exp.ne_zaman_tr` | İş arkadaşına ya da arkadaşına. | İş arkadaşıma ya da arkadaşıma sorarım. | GEÇTİ |  |
| 33 | `r0:11:a:kommst-du.exp.ipucu_tr` | Bu soruda **Kommst** başa gelir. | Soru sorarken Kommst en başta duruyor. | GEÇTİ |  |
| 34 | `r0:11:a:kommst-du.exp.parcalar[0]` | geliyor musun | Bu parça şu demek: geliyor musun | GEÇTİ |  |
| 35 | `r0:11:a:kommst-du.exp.parcalar[1]` | bugün | Bu parça şu demek: bugün | GEÇTİ |  |
| 36 | `r0:11:a:ich-gehe.tr` | Yarın muayenehaneye gidiyorum. | Türkçesi açık: Yarın muayenehaneye gidiyorum. | GEÇTİ |  |
| 37 | `r0:11:a:ich-gehe.exp.anlam_tr` | Yarın muayenehaneye gideceğini söyler. | Yarın muayenehaneye gideceğimi söylüyorum. | GEÇTİ |  |
| 38 | `r0:11:a:ich-gehe.exp.ne_zaman_tr` | İş yerinde ya da bir arkadaşına. | İş yerinde ya da bir arkadaşıma söylerim. | GEÇTİ |  |
| 39 | `r0:11:a:ich-gehe.exp.ipucu_tr` | **Ich gehe** gidiyorum demektir, **Dienstag geht** ise salı olur demektir. | Ich gehe gidiyorum demek. Dienstag geht ise salı olur demek. Salı uygun mu, salı mı oluyor, anlamadım. | GERİ | iki fikir var (Ich gehe ve Dienstag geht); salı olur sözü iki türlü okunuyor (salı uygun / salı oluyor) |
| 40 | `r0:11:a:ich-gehe.exp.parcalar[0]` | gidiyorum | Bu parça şu demek: gidiyorum | GEÇTİ |  |
| 41 | `r0:11:a:ich-gehe.exp.parcalar[1]` | yarın | Bu parça şu demek: yarın | GEÇTİ |  |
| 42 | `r0:11:a:ich-gehe.exp.parcalar[2]` | muayenehaneye | Bu parça şu demek: muayenehaneye | GEÇTİ |  |
| 43 | `r0:11:b:sie-wohnt.tr` | Frau Brandl burada oturuyor. | Türkçesi açık: Frau Brandl burada oturuyor. | GEÇTİ |  |
| 44 | `r0:11:b:sie-wohnt.exp.anlam_tr` | Frau Brandl'ın evinin burada olduğunu söyler. | Frau Brandl'ın evi burada. | GEÇTİ |  |
| 45 | `r0:11:b:sie-wohnt.exp.ne_zaman_tr` | Bir komşudan söz ederken. | Bir komşudan söz ederken söylerim. | GEÇTİ |  |
| 46 | `r0:11:b:sie-wohnt.exp.ipucu_tr` | **Frau Brandl** için sonu **-t** olur: **wohnt**. | Frau Brandl için kelimenin sonuna t geliyor. | GEÇTİ |  |
| 47 | `r0:11:b:sie-wohnt.exp.parcalar[0]` | Frau Brandl oturuyor | Bu parça şu demek: Frau Brandl oturuyor | GEÇTİ |  |
| 48 | `r0:11:b:sie-wohnt.exp.parcalar[1]` | burada | Bu parça şu demek: burada | GEÇTİ |  |
| 49 | `r0:11:b:derya-kommt.tr` | Derya Wendlfing'li. | Türkçesi açık: Derya Wendlfing'li. | GEÇTİ |  |
| 50 | `r0:11:b:derya-kommt.exp.anlam_tr` | Derya'nın nereli olduğunu söyler. | Derya'nın nereli olduğunu söylüyorum. | GEÇTİ |  |
| 51 | `r0:11:b:derya-kommt.exp.ne_zaman_tr` | Birinin nereli olduğunu anlatırken. | Birinin nereli olduğunu anlatırken söylerim. | GEÇTİ |  |
| 52 | `r0:11:b:derya-kommt.exp.ipucu_tr` | **Derya** için sonu **-t** olur: **kommt**. | Derya için sona t geliyor. | GEÇTİ |  |
| 53 | `r0:11:b:derya-kommt.exp.parcalar[0]` | Derya geliyor | Derya geliyor. Ama cümle Derya Wendlfing'li diyordu, bir yerden mi geliyor? | GERİ | parçalar soldan sağa okununca Derya Wendlfing'den geliyor çıkıyor, ifadenin anlamı (Derya Wendlfing'li) çıkmıyor |
| 54 | `r0:11:b:derya-kommt.exp.parcalar[1]` | Wendlfing'den | Wendlfing'den. Öncekiyle okuyunca Derya Wendlfing'den geliyor çıkıyor. | GERİ | parçalar soldan sağa okununca Derya Wendlfing'den geliyor çıkıyor, ifadenin anlamı (Derya Wendlfing'li) çıkmıyor |
| 55 | `r0:11:b:er-heisst.tr` | Adamın adı Tobi. | Türkçesi açık: Adamın adı Tobi. | GEÇTİ |  |
| 56 | `r0:11:b:er-heisst.exp.anlam_tr` | Bir adamın adını söyler. | Bir adamın adını söylüyorum. | GEÇTİ |  |
| 57 | `r0:11:b:er-heisst.exp.ne_zaman_tr` | Birini başkasına tanıtırken. | Birini başkasına tanıtırken söylerim. | GEÇTİ |  |
| 58 | `r0:11:b:er-heisst.exp.ipucu_tr` | **du** ile de **er** ile de **heißt** denir. | Sen derken de adam için de heißt deniyor. | GEÇTİ |  |
| 59 | `r0:11:b:er-heisst.exp.parcalar[0]` | adamın adı | Bu parça şu demek: adamın adı | GEÇTİ |  |
| 60 | `r0:11:b:er-heisst.exp.parcalar[1]` | Tobi | Bu parça şu demek: Tobi | GEÇTİ |  |
| 61 | `r0:11:b:wir-kommen.tr` | Cumartesi günü geliyoruz. | Türkçesi açık: Cumartesi günü geliyoruz. | GEÇTİ |  |
| 62 | `r0:11:b:wir-kommen.exp.anlam_tr` | Birlikte cumartesi günü geleceğinizi söyler. | Birkaç kişi cumartesi geleceğimizi söylüyoruz. | GEÇTİ |  |
| 63 | `r0:11:b:wir-kommen.exp.ne_zaman_tr` | Bir davete ya da buluşmaya cevap verirken. | Davete ya da buluşmaya cevap verirken söylerim. | GEÇTİ |  |
| 64 | `r0:11:b:wir-kommen.exp.ipucu_tr` | **wir** ile söylerken sonu **-en** olur: **kommen**. | Biz derken sona en geliyor. | GEÇTİ |  |
| 65 | `r0:11:b:wir-kommen.exp.parcalar[0]` | geliyoruz | Bu parça şu demek: geliyoruz | GEÇTİ |  |
| 66 | `r0:11:b:wir-kommen.exp.parcalar[1]` | cumartesi günü | Bu parça şu demek: cumartesi günü | GEÇTİ |  |
| 67 | `r0:11:b:wie-heissen-sie.tr` | Adınız ne? | Türkçesi açık: Adınız ne? | GEÇTİ |  |
| 68 | `r0:11:b:wie-heissen-sie.exp.anlam_tr` | Birine kibarca adını sorar. | Birine kibarca adını soruyorum. | GEÇTİ |  |
| 69 | `r0:11:b:wie-heissen-sie.exp.ne_zaman_tr` | Muayenehanede, resmî dairede ve telefonda çok duyarsın. | Bunu muayenehanede, resmî dairede, telefonda çok duyacağım. | GEÇTİ |  |
| 70 | `r0:11:b:wie-heissen-sie.exp.ipucu_tr` | **Sie** ile de sonu **-en** olur: **heißen**. | Kibar siz derken de sona en geliyor. | GEÇTİ |  |
| 71 | `table.baslik_tr` | Kim yapıyor? Sonu ona göre değişir: -e, -st, -t, -en | Kim yapıyorsa kelimenin sonu ona göre e, st, t ya da en oluyor. | GEÇTİ |  |
| 72 | `table.sutunlar` | Kim \| Türkçe \| heißen \| wohnen \| kommen \| gehen | Tablonun başlıkları: kim, Türkçesi ve dört kelime. | GEÇTİ |  |
| 73 | `table.satirlar[0]` | ben | Ben için ich, sonu e. | GEÇTİ |  |
| 74 | `table.satirlar[1]` | sen | Sen için du, sonu st, heißt'ta t. | GEÇTİ |  |
| 75 | `table.satirlar[2]` | o | O için er, sie, es, sonu t. | GEÇTİ |  |
| 76 | `table.satirlar[3]` | biz | Biz için wir, sonu en. | GEÇTİ |  |
| 77 | `table.satirlar[4]` | onlar | Onlar için sie. Ama sie az önce o satırındaydı, aşağıda Sie de siz. Hangisi hangisi, ayıramadım. | GERİ | anlamadım: sie hem o satırında hem onlar satırında, Sie de siz satırında; farkı (büyük harf, kim için) hiçbir yerde yazmıyor; onlar hiçbir kartta öğretilmedi |
| 78 | `table.satirlar[5]` | siz (kibar) | Kibar siz için Sie, sonu en. | GEÇTİ |  |
| 79 | `r0:11:d01.q_tr` | Berna tanışırken adını söylüyor. Hangisi doğru? | Berna adını söylüyor, doğru cümleyi seçeceğim. | GEÇTİ |  |
| 80 | `r0:11:d01.cevap` | Ich heiße Berna. | Doğru cevap bu. | GEÇTİ |  |
| 81 | `r0:11:d01.why_tr` | **ich** ile söylerken sonu **-e** olur: **heiße**. | Ben derken sona e geliyor. | GEÇTİ |  |
| 82 | `r0:11:d02.q_tr` | Tobi'ye adını soruyorsun. Hangisi doğru? | Tobi'ye adını soruyorum, doğru soruyu seçeceğim. | GEÇTİ |  |
| 83 | `r0:11:d02.cevap` | Wie heißt du? | Doğru cevap bu. | GEÇTİ |  |
| 84 | `r0:11:d02.why_tr` | **du** ile **heißt** denir. | Sen derken heißt deniyor. | GEÇTİ |  |
| 85 | `r0:11:d03.q_tr` | Muayenehanede Frau Huber sana adını soruyor. Hangisini duyarsın? | Frau Huber bana adımı soruyor, duyacağım cümleyi seçeceğim. | GEÇTİ |  |
| 86 | `r0:11:d03.cevap` | Wie heißen Sie? | Doğru cevap bu. | GEÇTİ |  |
| 87 | `r0:11:d03.why_tr` | Muayenehanede sana kibarca **Sie** derler: **Wie heißen Sie?** | Muayenehanede bana kibarca Sie ile sorarlar. | GEÇTİ |  |
| 88 | `r0:11:d04.q_tr` | **Wir kommen am Samstag.** ne demek? | Almanca cümlenin Türkçesini seçeceğim. | GEÇTİ |  |
| 89 | `r0:11:d04.opts[0]` | Cumartesi günü geliyorum. | Seçenek: Cumartesi günü geliyorum. | GEÇTİ |  |
| 90 | `r0:11:d04.opts[1]` | Cumartesi günü geliyoruz. | Seçenek: Cumartesi günü geliyoruz. | GEÇTİ |  |
| 91 | `r0:11:d04.opts[2]` | Cumartesi günü geliyorsun. | Seçenek: Cumartesi günü geliyorsun. | GEÇTİ |  |
| 92 | `r0:11:d04.cevap` | Cumartesi günü geliyoruz. | Doğru cevap bu. | GEÇTİ |  |
| 93 | `r0:11:d04.why_tr` | **wir** biz demektir, bu yüzden sonu **-en** olur: **kommen**. | wir biz demek, o yüzden sona en geliyor. | GEÇTİ |  |
| 94 | `r0:11:d05.tr` | Adım {name}. | Türkçesi açık: Adım {name}. | GEÇTİ |  |
| 95 | `r0:11:d06.tr` | Adın ne? | Türkçesi açık: Adın ne? | GEÇTİ |  |
| 96 | `r0:11:d06.why_tr` | **heiß** zaten **ß** ile bittiği için yalnızca **t** gelir: **heißt**. | Kelime ß ile bittiği için yalnız t geliyor. Kiminle söylerken ve neyin yerine, yazmıyor. | GERİ | anlamadım: kiminle söylerken olduğu (du) ve yalnızca t'nin neyin yerine geldiği yazmıyor |
| 97 | `r0:11:d07.tr` | Frau Brandl burada oturuyor. | Türkçesi açık: Frau Brandl burada oturuyor. | GEÇTİ |  |
| 98 | `r0:11:d07.why_tr` | **Frau Brandl** için sonu **-t** olur. | Frau Brandl için sona t geliyor. | GEÇTİ |  |
| 99 | `r0:11:d08.tr` | Burada mı oturuyorsun? | Türkçesi açık: Burada mı oturuyorsun? | GEÇTİ |  |
| 100 | `r0:11:d08.why_tr` | **du** ile sonu **-st** olur. | Sen derken sona st geliyor. | GEÇTİ |  |
| 101 | `r0:11:d09.tr` | Yarın geliyorum. | Türkçesi açık: Yarın geliyorum. | GEÇTİ |  |
| 102 | `r0:11:d10.tr` | Derya Wendlfing'li. | Türkçesi açık: Derya Wendlfing'li. | GEÇTİ |  |
| 103 | `r0:11:d11.tr` | Cumartesi günü geliyoruz. | Türkçesi açık: Cumartesi günü geliyoruz. | GEÇTİ |  |
| 104 | `r0:11:d12.tr` | Yarın muayenehaneye gidiyorum. | Türkçesi açık: Yarın muayenehaneye gidiyorum. | GEÇTİ |  |
| 105 | `r0:11:d13.tr` | Adınız ne? | Türkçesi açık: Adınız ne? | GEÇTİ |  |
| 106 | `r0:11:d13.why_tr` | Kibarca **Sie** ile söylerken sonu **-en** olur. | Kibarca Sie ile söylerken sona en geliyor. | GEÇTİ |  |
| 107 | `r0:11:d14.tr` | Adın ne? | Türkçesi açık: Adın ne? | GEÇTİ |  |
| 108 | `r0:11:d15.tr` | Burada mı oturuyorsun? | Türkçesi açık: Burada mı oturuyorsun? | GEÇTİ |  |
| 109 | `r0:11:d15.why_tr` | Bu soruda **Wohnst** başa gelir. | Soru sorarken Wohnst en başta duruyor. | GEÇTİ |  |
| 110 | `r0:11:d16.tr` | Yarın muayenehaneye gidiyorum. | Türkçesi açık: Yarın muayenehaneye gidiyorum. | GEÇTİ |  |
| 111 | `r0:11:d16.why_tr` | **Morgen** başa gelince **gehe** ikinci sırada kalır. | Morgen başa gelirse gehe ikinci oluyor. Ama doğru cümle Ich ile başlıyor, Morgen başta değil. | GERİ | ifadenin kendisini değil başka cümleyi anlatıyor: doğru cevap Ich ile başlıyor, Morgen başta değil |
| 112 | `r0:11:d17.tr` | Adım {name}. | Türkçesi açık: Adım {name}. | GEÇTİ |  |
| 113 | `r0:11:d18.tr` | Burada oturuyorum. | Türkçesi açık: Burada oturuyorum. | GEÇTİ |  |
| 114 | `r0:11:d19.tr` | Yarın geliyorum. | Türkçesi açık: Yarın geliyorum. | GEÇTİ |  |
| 115 | `r0:11:d20.tr` | Cumartesi günü geliyoruz. | Türkçesi açık: Cumartesi günü geliyoruz. | GEÇTİ |  |
| 116 | `r0:11:d21.tr` | Adınız ne? Kibarca soruyorsun. | Adınız ne diye kibarca soracağım. | GEÇTİ |  |
| 117 | `r0:11:d21.why_tr` | Kibarca sorarken **Wie heißen Sie?** denir, **Wie heißt du?** değil. | Kibarca sorarken Sie'li soruyu kullanırım, du'lu olanı değil. | GEÇTİ |  |
| 118 | `r0:11:d22.instr_tr` | Aynı şeyi Tobi'ye sor. Cümleyi **du** ile soru yap. | Burada oturuyorum cümlesini Tobi'ye du ile soruya çevireceğim. | GEÇTİ |  |
| 119 | `r0:11:d22.why_tr` | **du** ile **wohnst** denir. | Sen derken wohnst deniyor. | GEÇTİ |  |
| 120 | `r0:11:d23.instr_tr` | Cümleyi Derya için söyle. **Derya** ile başla. | Cümleyi Derya için, Derya ile başlayarak söyleyeceğim. | GEÇTİ |  |
| 121 | `r0:11:d23.why_tr` | **Derya** için **kommt** denir. | Derya için kommt deniyor. | GEÇTİ |  |
| 122 | `r0:11:d24.instr_tr` | Soruyu kibar yap. **Sie** ile sor. | Soruyu Sie ile kibar hâle getireceğim. | GEÇTİ |  |
| 123 | `r0:11:d25.instr_tr` | Soruyu Tobi'ye sor. **du** ile söyle. | Soruyu Tobi'ye du ile soracağım. | GEÇTİ |  |
| 124 | `r0:11:d25.why_tr` | **du** ile **gehst** denir. | Sen derken gehst deniyor. | GEÇTİ |  |
| 125 | `r0:11:d26.situation_tr` | İlk iş günün. Tobi seninle tanışıyor. Adını söyle. | İlk iş günümde Tobi ile tanışıyorum, adımı söyleyeceğim. | GEÇTİ |  |
| 126 | `r0:11:d27.situation_tr` | Frau Brandl merdivende soruyor. Evet, burada oturuyorsun. | Frau Brandl merdivende soruyor, evet burada oturuyorum diyeceğim. | GEÇTİ |  |
| 127 | `r0:11:d27.why_tr` | Cevapta kendinden söz ettiğin için **wohne** dersin. | Kendimden söz ettiğim için wohne diyorum. | GEÇTİ |  |
| 128 | `r0:11:d28.situation_tr` | Frau Huber telefonda soruyor. Evet, yarın geliyorsun. | Frau Huber telefonda soruyor, evet yarın geliyorum diyeceğim. | GEÇTİ |  |
| 129 | `r0:11:d28.why_tr` | Soruda **Kommen Sie**, cevapta **ich komme** gelir. | Soruda Kommen Sie, cevapta ich komme oluyor. | GEÇTİ |  |
| 130 | `r0:11:d29.situation_tr` | Derya soruyor. Bugün gelmiyorsun, yarın geliyorsun. | Derya soruyor, bugün değil yarın geliyorum diyeceğim. | GEÇTİ |  |
| 131 | `r0:11:d30.situation_tr` | Tobi soruyor. Evet, burada oturuyorsun. | Tobi soruyor, evet burada oturuyorum diyeceğim. | GEÇTİ |  |
| 132 | `r0:11:d31.situation_tr` | Derya soruyor. Tobi bugün gelmiyor, yarın geliyor. | Derya soruyor, Tobi bugün değil yarın geliyor diyeceğim. | GEÇTİ |  |
| 133 | `r0:11:d31.why_tr` | **Tobi** için **er kommt** dersin. | Tobi için er kommt diyorum. | GEÇTİ |  |
| 134 | `r0:11:d32.situation_tr` | Frau Huber soruyor. Cuma günü geliyorsun. | Frau Huber soruyor, cuma günü geliyorum diyeceğim. | GEÇTİ |  |
| 135 | `dialogue.title_tr` | İlk iş günü: tanışma | İlk iş gününde tanışma konuşması. | GEÇTİ |  |
| 136 | `dialogue.lines[0].tr` | Merhaba! Adım Tobi. Senin adın ne? | Türkçesi açık: Merhaba! Adım Tobi. Senin adın ne? | GEÇTİ |  |
| 137 | `dialogue.lines[1].tr` | Adım {name}. | Türkçesi açık: Adım {name}. | GEÇTİ |  |
| 138 | `dialogue.lines[2].tr` | Merhaba {name}! Bu da Derya. | Türkçesi açık: Merhaba {name}! Bu da Derya. | GEÇTİ |  |
| 139 | `dialogue.lines[3].tr` | Merhaba! Burada, Wendlfing'de mi oturuyorsun? | Türkçesi açık: Merhaba! Burada, Wendlfing'de mi oturuyorsun? | GEÇTİ |  |
| 140 | `dialogue.lines[4].tr` | Evet, burada oturuyorum. Ya sen, Derya? | Türkçesi açık: Evet, burada oturuyorum. Ya sen, Derya? | GEÇTİ |  |
| 141 | `dialogue.lines[5].tr` | Ben burada oturuyorum ve Wendlfing'liyim. | Türkçesi açık: Ben burada oturuyorum ve Wendlfing'liyim. | GEÇTİ |  |
| 142 | `dialogue.lines[6].tr` | Herr Wimmer bugün geliyor. | Türkçesi açık: Herr Wimmer bugün geliyor. | GEÇTİ |  |
| 143 | `dialogue.lines[7].tr` | Bugün mü geliyor? Teşekkürler, Tobi! | Türkçesi açık: Bugün mü geliyor? Teşekkürler, Tobi! | GEÇTİ |  |
| 144 | `r0:11:h1.title_tr` | Yeni hasta muayenehaneye telefon ediyor | Yeni bir hasta muayenehaneye telefon ediyor. | GEÇTİ |  |
| 145 | `r0:11:h1.script[0].tr` | Dr. Weber muayenehanesi, Huber, buyurun? | Türkçesi açık: Dr. Weber muayenehanesi, Huber, buyurun? | GEÇTİ |  |
| 146 | `r0:11:h1.script[1].tr` | Merhaba, ben Emre Aydın. Bugün olur mu? | Türkçesi açık: Merhaba, ben Emre Aydın. Bugün olur mu? | GEÇTİ |  |
| 147 | `r0:11:h1.script[2].tr` | Bugün olmaz. Adınız neydi, lütfen? | Bugün olmaz, adınız neydi. Kartta aynı soru Adınız ne diye yazıyordu. | GERİ | aynı Almanca soruya iki Türkçe karşılık: kartta Adınız ne, burada Adınız neydi; neydi geçmiş gibi okunuyor |
| 148 | `r0:11:h1.script[3].tr` | Aydın. Adım Emre Aydın. | Türkçesi açık: Aydın. Adım Emre Aydın. | GEÇTİ |  |
| 149 | `r0:11:h1.script[4].tr` | Burada, Wendlfing'de mi oturuyorsunuz? | Türkçesi açık: Burada, Wendlfing'de mi oturuyorsunuz? | GEÇTİ |  |
| 150 | `r0:11:h1.script[5].tr` | Evet, burada oturuyorum. | Türkçesi açık: Evet, burada oturuyorum. | GEÇTİ |  |
| 151 | `r0:11:h1.script[6].tr` | Tamam. Yarın gelir misiniz? | Türkçesi açık: Tamam. Yarın gelir misiniz? | GEÇTİ |  |
| 152 | `r0:11:h1.script[7].tr` | Evet, yarın geliyorum. Teşekkürler! | Türkçesi açık: Evet, yarın geliyorum. Teşekkürler! | GEÇTİ |  |
| 153 | `r0:11:h1.qs[0].q_tr` | Herr Aydın neden telefon ediyor? | Herr Aydın'ın neden telefon ettiğini seçeceğim. | GEÇTİ |  |
| 154 | `r0:11:h1.qs[0].opts[0]` | Doktora gitmek için bir gün istiyor (doğru) | Doktora gitmek için bir gün istiyor. Randevu günü mü, izin günü mü, emin olamadım. | GERİ | iki türlü okunuyor: bir gün istiyor sözü randevu günü de izin günü de olabilir |
| 155 | `r0:11:h1.qs[0].opts[1]` | Randevusunu iptal ediyor | Seçenek: Randevusunu iptal ediyor | GEÇTİ |  |
| 156 | `r0:11:h1.qs[0].opts[2]` | Muayenehanenin adresini soruyor | Seçenek: Muayenehanenin adresini soruyor | GEÇTİ |  |
| 157 | `r0:11:h1.qs[1].q_tr` | Herr Aydın nerede oturuyor? | Herr Aydın'ın nerede oturduğunu seçeceğim. | GEÇTİ |  |
| 158 | `r0:11:h1.qs[1].opts[0]` | Münih'te | Seçenek: Münih'te | GEÇTİ |  |
| 159 | `r0:11:h1.qs[1].opts[1]` | Wendlfing'de (doğru) | Seçenek: Wendlfing'de | GEÇTİ |  |
| 160 | `r0:11:h1.qs[1].opts[2]` | Bunu söylemiyor | Seçenek: Bunu söylemiyor | GEÇTİ |  |
| 161 | `r0:11:h1.qs[2].q_tr` | Herr Aydın ne zaman muayenehaneye geliyor? | Herr Aydın'ın ne zaman geldiğini seçeceğim. | GEÇTİ |  |
| 162 | `r0:11:h1.qs[2].opts[0]` | bugün | Seçenek: bugün | GEÇTİ |  |
| 163 | `r0:11:h1.qs[2].opts[1]` | yarın (doğru) | Seçenek: yarın | GEÇTİ |  |
| 164 | `r0:11:h1.qs[2].opts[2]` | öbür gün | Seçenek: öbür gün | GEÇTİ |  |
| 165 | `r0:11:h2.title_tr` | Ioana'dan sesli mesaj | Ioana bana sesli mesaj bırakmış. | GEÇTİ |  |
| 166 | `r0:11:h2.script[0].tr` | Merhaba {name}, ben Ioana. | Türkçesi açık: Merhaba {name}, ben Ioana. | GEÇTİ |  |
| 167 | `r0:11:h2.script[1].tr` | Bugün kursa gelmiyorum. | Türkçesi açık: Bugün kursa gelmiyorum. | GEÇTİ |  |
| 168 | `r0:11:h2.script[2].tr` | Çarşamba günü geliyorum. | Türkçesi açık: Çarşamba günü geliyorum. | GEÇTİ |  |
| 169 | `r0:11:h2.script[3].tr` | Sen de çarşamba günü geliyor musun? | Türkçesi açık: Sen de çarşamba günü geliyor musun? | GEÇTİ |  |
| 170 | `r0:11:h2.script[4].tr` | Birlikte alıştırma yapalım mı? Sadece Almanca! | Türkçesi açık: Birlikte alıştırma yapalım mı? Sadece Almanca! | GEÇTİ |  |
| 171 | `r0:11:h2.script[5].tr` | Hoşça kal! | Türkçesi açık: Hoşça kal! | GEÇTİ |  |
| 172 | `r0:11:h2.qs[0].q_tr` | Ioana neden mesaj bırakıyor? | Ioana'nın neden mesaj bıraktığını seçeceğim. | GEÇTİ |  |
| 173 | `r0:11:h2.qs[0].opts[0]` | Bugün gelmeyeceğini, çarşamba günü geleceğini söylemek için (doğru) | Seçenek: Bugün gelmeyeceğini, çarşamba günü geleceğini söylemek için | GEÇTİ |  |
| 174 | `r0:11:h2.qs[0].opts[1]` | Seni doğum gününe çağırmak için | Seçenek: Seni doğum gününe çağırmak için | GEÇTİ |  |
| 175 | `r0:11:h2.qs[0].opts[2]` | Kursun kapalı olduğunu söylemek için | Seçenek: Kursun kapalı olduğunu söylemek için | GEÇTİ |  |
| 176 | `r0:11:h2.qs[1].q_tr` | Ioana kursa ne zaman geliyor? | Ioana'nın kursa ne zaman geldiğini seçeceğim. | GEÇTİ |  |
| 177 | `r0:11:h2.qs[1].opts[0]` | bugün | Seçenek: bugün | GEÇTİ |  |
| 178 | `r0:11:h2.qs[1].opts[1]` | çarşamba günü (doğru) | Seçenek: çarşamba günü | GEÇTİ |  |
| 179 | `r0:11:h2.qs[1].opts[2]` | cuma günü | Seçenek: cuma günü | GEÇTİ |  |
| 180 | `r0:11:h2.qs[2].q_tr` | Ioana sana ne soruyor? | Ioana'nın bana ne sorduğunu seçeceğim. | GEÇTİ |  |
| 181 | `r0:11:h2.qs[2].opts[0]` | Çarşamba günü gelip gelmediğini (doğru) | Seçenek: Çarşamba günü gelip gelmediğini | GEÇTİ |  |
| 182 | `r0:11:h2.qs[2].opts[1]` | Nerede oturduğunu | Seçenek: Nerede oturduğunu | GEÇTİ |  |
| 183 | `r0:11:h2.qs[2].opts[2]` | Adının ne olduğunu | Seçenek: Adının ne olduğunu | GEÇTİ |  |
| 184 | `placement.r0:11:p01.tr` | Adın ne? | Türkçesi açık: Adın ne? | GEÇTİ |  |
| 185 | `placement.r0:11:p02.q_tr` | **Er kommt morgen.** ne demek? | Almanca cümlenin Türkçesini seçeceğim. | GEÇTİ |  |
| 186 | `placement.r0:11:p02.opts[0]` | Yarın geliyorum. | Seçenek: Yarın geliyorum. | GEÇTİ |  |
| 187 | `placement.r0:11:p02.opts[1]` | Adam yarın geliyor. | Seçenek: Adam yarın geliyor. | GEÇTİ |  |
| 188 | `placement.r0:11:p02.opts[2]` | Yarın geliyoruz. | Seçenek: Yarın geliyoruz. | GEÇTİ |  |
| 189 | `placement.r0:11:p02.cevap` | Adam yarın geliyor. | Doğru cevap bu. | GEÇTİ |  |
| 190 | `placement.r0:11:p03.tr` | Burada oturuyorum. | Türkçesi açık: Burada oturuyorum. | GEÇTİ |  |
| 191 | `placement.r0:11:p04.instr_tr` | Cümleyi **wir** ile söyle. | Cümleyi biz diyerek söyleyeceğim. | GEÇTİ |  |
| 192 | `placement.r0:11:p05.situation_tr` | Frau Huber telefonda soruyor. Evet, yarın geliyorsun. | Frau Huber telefonda soruyor, evet yarın geliyorum diyeceğim. | GEÇTİ |  |
| 193 | `mission.task_tr` | Bugün iş yerinde ya da apartmanda biriyle tanış. **Ich heiße** ile adını söyle, sonra **Wie heißt du?** ya da **Wie heißen Sie?** diye sor. | Bugün biriyle tanışıp adımı söyleyeceğim, sonra adını soracağım. İkinci cümle uzun, hangi soruyu kime soracağımı da yazmıyor. | GERİ | ikinci cümle 16 kelime (14'ten uzun); iki sorudan hangisini kime soracağım yazmıyor |

## Sonuç

- Toplam: 193
- GEÇTİ: 182
- GERİ: 11

GERİ kimlikleri:

- `r0:11:a:wohnst-du.exp.anlam_tr`
- `r0:11:a:wie-heisst-du.exp.anlam_tr`
- `r0:11:a:ich-gehe.exp.ipucu_tr`
- `r0:11:b:derya-kommt.exp.parcalar[0]`
- `r0:11:b:derya-kommt.exp.parcalar[1]`
- `table.satirlar[4]`
- `r0:11:d06.why_tr`
- `r0:11:d16.why_tr`
- `r0:11:h1.script[2].tr`
- `r0:11:h1.qs[0].opts[0]`
- `mission.task_tr`

Dosyada GERİ olduğu için ders "reviewed" sayılamaz (OD-9.4).
