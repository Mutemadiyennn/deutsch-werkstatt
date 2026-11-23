# İÇ-4 yazar görevi: A1 3. hafta (15.–21. gün) gün dosyaları

Sen `yazar` ajanısın; görevi İÇ-4 içerik motoru (baş) veriyor. git komutu çalıştırma. Yalnız görevde adı geçen dosyalara yaz.
SC = /tmp/claude-0/-home-claude-deutsch-werkstatt/c32ea372-27f1-575c-a158-6ad066f8dca6/scratchpad · Depo = /home/claude/deutsch-werkstatt

## Önce oku (sırayla, başka geçmiş okuma)
1. `docs/v2/LEARNER.md` — öğrenci kartı. Her kararda: "Bu, öğrenciyi dışarıda konuşmaya yaklaştırıyor mu, yarın uygulamayı açmak istemesini sağlıyor mu?"
2. `content/v2/m1/FORMAT.md` — gün biçimi, bölüm, dikte merdiveni, `kanit`, gün sınavı kuralları. Hepsi geçerli.
3. `content/v2/m1/gun-01.json` — **KALIP BUDUR.** Her gün bu dosyanın bütün alanlarını taşır: `halkalar` (4–6 kartlık halkalar, her kartın ≥ 2 görev cümlesi, her görev cümlesinde ≥ 3 `accepted`, halka sahnesi 2–4 satır + 1 soru), `dersler`, `yeni_kartlar`, `sahne` (çizimli köy sahnesi, 1 bölüm: ana fikir + 2 ayrıntı + 5 dikte kolay→gerçek + gölge + cevapla), `sesler` (en az 2: anons/sesli-mesaj/radyo/bekleme-anonsu; her biri tek bölüm + `eylem`), `gorsel` (4–6; somut kelime, çeviri yok), `prova` (dallanan konuşma, 5–8 düğüm, uygun ve uygunsuz seçenekler, `son` düğüm), `okuma_yazma`, `gun_sinavi` (11 madde: 4 dikte, 4 `tr_de`, 2 sesli, 1 mini prova). Uzunluk ve yoğunluk gun-01 kadar.
4. `content/v2/m1/plan-hafta-03-04.md` — haftanın planı (yer, karakterler, durumlar). Kartlar plana uymuyorsa durumu kartlara uydur; yeri ve karakteri değiştirebilirsin, günün başlığı, can-do'su ve dersleri değişmez.
5. `SC/a1-kesin.json` — **kesin kelime tablosu.** `gunler[]` (day → kartlar), `ogretilmis_sayilan.gunler` (1.–7. gün). Kartları sen seçmezsin: günün `yeni_kartlar` = tablodaki o günün kartları, eksiksiz ve fazlasız.
6. `content/v2/registry/grammar.json` — günün `gr:` derslerinin kaydı (`h_tr`, `tr`, `table`, `ex`). Uygulama bunu "dil noktası durağı" olarak gösterir.
7. Kart ayrıntısı gerekirse: `content/v2/registry/lexicon/batch-*.json` (kartın `tr`, örnekler, biçimler). Karakterler: `content/v2/world/world.json` (`characters`).

## K(t): öğretmeden isteme yok
- Bilinen = 1.–7. gün (`ogretilmis_sayilan`) + tabloda senin gününden önceki bütün günlerin kartları (8.–14. gün dahil; o dosyalar dalda yok, tablo geçerli) + o güne kadar biten `r0:*` temel dersleri + o günde o adıma kadar tanıtılmış kartlar.
- Halka, halkanın kendi kartlarını ve kendi `kaliplar` satırlarını bilir; günün dersini varsaymaz. Günün dil noktasını çalıştıran halkaya `"dersten_sonra": true` yaz ve dil noktasını o halkanın `kaliplar` satırında ver (ör. `{"de": "Könnten Sie … ?", "tr": "… -abilir misiniz?"}`). Kalıbın kartsız sözcükleri (könnten gibi) böylece bilinir.
- **Dil noktası alıştırması (PM-092):** günün her yeni dil noktası o gün en az 6 görev cümlesinde çalışılır (anlamaya, kurmaya ve söylemeye uygun cümleler) ve ertesi gün en az 2 görev cümlesinde geri gelir.
- Görev cümlesinde (öğrencinin ürettiği her Almanca: halka görev cümleleri ve ilk `accepted`, dikte cevapları, gölge, `cevapla`, provanın uygun seçenekleri, yazma örneği, gün sınavı) bilinmeyen **0**. Gösterim cümlesinde (dinlenen, okunan) en çok 1 bilinmeyen; soru o sözcüğe dayanmaz.
- **Aynı Almanca görev cümlesi hafta içinde iki kez gelmez**; 1. haftanın cümlelerini de tekrarlama (dikiş kuralı d).
- Döngüsüzlük: tekrar gelen konu yeni bağlam ve başka karakterle gelir. 1. hafta muayenehane ve saati gördü; bu hafta yeni olan evet/hayır sorusu, heceleme, kibar rica, um/am/im, ünlüsü değişen fiil, tarih.

## Yerel denetim (her günü yazınca koş; kırmızı günle sonraki güne geçme)
```sh
cd /home/claude/deutsch-werkstatt
node --experimental-strip-types SC/kontrol.ts SC/a1-kesin.json 15        # halka + tablo + m1check + bilinmeyenler (K ...) + OD9
node --experimental-strip-types content/tools/dikis-kos.ts --tablo SC/a1-kesin.json --gun 15   # dikiş (a)(b)(c)(d)
```
Hedef: `kontrol bitti: 0 hata`, görev cümlelerinde `K … /gorev` satırı yok, `OD9` satırı yok, dikiş ihlali 0. Bilinen istisnalar (sen düzeltemezsin, raporda say): sözlükte kartı olmayan 4 kimlik (lx:Anrufbeantworter, lx:Durchwahl, lx:Rückruf, lx:Warteschleife: lex yazacak) ve dil noktası tablosundaki biçimlerin "bilinen" sayılması (hat D'nin şema işi; o güne kadar kalıp satırıyla çöz). `npm run content:validate` 8.+ gün dosyalarında şema hatası verir (day ≤ 7): beklenen, hat D düzeltiyor.

## Yazım kuralları
- Türkçe açıklama OD-9: tek fikir, cümle başına ≤ 14 kelime; `=`, `;`, `…`, tırnak yok; Almanca sözcük **kalın**. Dilbilgisi terimi yok (özne, nesne, zamir, edat, Dativ, Akkusativ, Konjunktiv…). İngilizce yok.
- Öğrencinin adı yalnız `{name}`, hitap `{Herr|Frau}`. `audio_de` ve ses/sahne metninde ad yer tutucusu yok. Bairisch yazma (kaynak yok).
- Kişisel bilgi, kurs ya da kitap adı yok. Telefon numarası ve adres kurgusal ve kısa.
- Kimlikler gun-01 düzeninde: `m1:NN:h1`, `m1:NN:v1`, `m1:NN:a1`, `m1:NN:g1`, `m1:NN:p1`, `m1:NN:o1`, `m1:NN:s`, `m1:NN:sK`; dosya `content/v2/m1/gun-NN.json`, `id` `m1:gun:NN`, `unit` `u:m1:NN`, `arm` `pazar`, `can_do.id` `cd:m1:NN`, `review` `{"status": "draft"}`, `requires` gun-01 gibi (önceki günlerin bu günde kullanılan kartlarını `requires.kelimeler`'e yaz).
- `video` alanı yazma (gerçek video yok; eksik listesine gider).
- Gerçeklik testi: "Bunu yarın gerçekten duyar/söyler miyim?" Telefonda gerçek kalıplar (Praxis Dr. Weber, Huber, guten Tag. · Einen Moment, ich verbinde. · Auf Wiederhören.).

## Günler
| Gün | Başlık (aynen) | can_do.tr | dersler |
|---|---|---|---|
| 15 | Evet ya da hayır soruları: Haben Sie Zeit? | Evet ya da hayır sorusu sorar, kısa cevap veririm. | ["gr:a1-02:t3"] |
| 16 | Telefonda kendini tanıtmak ve adını hecelemek | Telefonda adımı söyler, harf harf hecelerim. | ["gr:a1-12:t5", "r0:10-buchstabieren"] |
| 17 | Kibar rica: Könnten Sie das wiederholen? | Anlamadığımda kibarca tekrar etmesini isterim. | ["gr:a1-12:t1"] |
| 18 | Ne zaman? um, am, im | Bir şeyin ne zaman olduğunu um, am, im ile söylerim. | ["gr:a1-05:t3", "gr:a1-12:t3"] |
| 19 | Sen ve o derken değişen harf: du sprichst, er fährt | Başkasının ne yaptığını söylerim: er spricht, sie fährt. | ["gr:a1-02:t4", "gr:a1-06:t2"] |
| 20 | Ayın kaçında? am ersten Mai | Randevunun tarihini söyler ve doğrularım. | ["gr:a1-12:t4"] |
| 21 | Haftanın sınavı: muayenehaneyi aramak | Telefonda randevunun gün ve saatini doğrularım. | [] |

`goal_tr` kendin yaz (gun-01 gibi tek cümle). 16. günde heceleme: öğrencinin kendi adı denetlenemez; denetlenen heceleme kurgu adlar ve sokak adları (Brunnengasse) üzerindendir, öğrenci kendini `{name}` ile tanıtır.
21. gün haftanın kapısıdır: kapı (konuşma) "Telefonda Frau Huber'e adını hecelersin, gün ve saati söylersin." · kulak kapısı "Frau Huber'in hızlı sesli mesajından gün ve saati yazarsın." Prova ve sesler bunun provası olur; gün sınavı bütün haftayı karıştırır.

## Teslim
Her günü bitirince denetimi koş. İşin sonunda bana kısa rapor: yazdığın dosyalar, gün başına halka/görev cümlesi sayısı, kalan bilinen istisnalar, tabloda yanlış yerde gördüğün kart (değiştirmeden), gerçek video önerisi yoksa "videosuz".

---
# EK: 4. hafta (22.–28. gün) — ev ve komşu
PM kararı (7087835391 md. 2): tablo kartın HAFTASINI sabitler; hafta içinde günlere dağıtım yazarındır. Şart: haftanın kümesi tablodakiyle birebir aynı, günlük adet tablodaki ±2. Bir kartı başka güne alırsan raporda yaz (yerel `kontrol.ts` gün düzeyinde "TABLO" uyarısı verir; o satırı raporda listele, başka hata kalmasın).
Hafta can-do: "Komşuma evimi ve nerede oturduğumu anlatırım." Dış görev: "Apartmanda bir komşuya selam verip kendimi tanıtırım."
| Gün | Başlık (aynen) | can_do.tr | dersler |
|---|---|---|---|
| 22 | Evdeki eşyalar: Wo ist der Schlüssel? Er ist hier | Bir eşyanın nerede olduğunu sorar, er, sie, es ile cevap veririm. | ["gr:a1-04:t2"] |
| 23 | Eşyayı tarif etmek: Er ist groß und weiß | Bir eşyayı büyüklüğü ve görünüşüyle anlatırım. | ["gr:a1-04:t3"] |
| 24 | Çok, fazla, değil: sehr, zu, nicht | Bir şeyin çok, fazla ya da değil olduğunu söylerim. | ["gr:a1-04:t4"] |
| 25 | Hangisi? Daha ucuz | İki şeyden hangisini istediğimi ve hangisinin daha ucuz olduğunu söylerim. | ["gr:a1-13:t1", "gr:a1-13:t2"] |
| 26 | Ev ilanında en ucuzunu bulmak | Ev ilanlarını karşılaştırır, en ucuzunu bulurum. | ["gr:a1-13:t3", "gr:a1-04:t5"] |
| 27 | Nerede? in, an, auf, neben | Evimin ve eşyaların yerini in, an, auf, neben ile söylerim. | ["gr:a1-11:t1", "gr:a1-11:t2"] |
| 28 | Haftanın sınavı: merdivende komşuyla | Komşuma evimi ve nerede oturduğumu anlatırım. | [] |
Dikkat: `lx:Schlüssel` ve `lx:weiß` 7. haftada (başlıkta geçer ama sorulamaz; görevde kullanma). `neben` tabloda yok: yalnız 27. günde dil noktası kalıbıyla. Renk yerine bilinen sıfatlar (groß, klein, hell, neu, alt, schön, billig, teuer). 22. günün kartları evde aranan şeylere uyar (Rezept, Tablette, Führerschein, Einladung, Tasse: "Wo ist das Rezept? – Es ist hier."). 24. gün kiracı sorunları (Vermieter, Hausmeister, Kaution, Schimmel, Störung). 26. gün okuma: üç kısa ev ilanı (Zi., Kü., NK; gr:a1-04:t5). 28. gün kapısı: "Merdivende Frau Brandl'a kim olduğunu, nerede oturduğunu ve evini anlatırsın." · kulak kapısı: "Herr Pichler'in duyurusunu dinleyip senden ne istediğini söylersin." Yer çoğunlukla pl:haus (Brunnengasse 7); karakterler Brandl, Pichler, Ioana, Tobi, Derya, Stadler; her gün başka bir bileşim.
3. haftanın dil noktaları (evet/hayır sorusu, Könnten Sie, um/am/im, er fährt, am ersten …) 4. haftada doğal yerlerde geri gelebilir ama tekrar cümlesi olmadan.

---
# EK 2 (01:40 UTC): yeni tablo, çerçeve kuralı, hafta kapısı — DÜZELTME TURU
Kaynaklar değişti: tablo artık SC/a1-kesin2.json (#198 `6829a3f`). Her günde iki liste var: `kartlar` (yeni_kartlar'a giren) ve `cerceve` (işlev sözcükleri; yeni_kartlar'a YAZILMAZ). PM kararları: 7088230583 md. 1, 7088563328 md. 1, PM-097.
Kurallar:
1. **Çerçeve sözcükleri `yeni_kartlar`'dan ve halka `kartlar`'ından çıkar** (3. hafta: vor, welcher, na, am, um, bis, bei, unser, denn, zum, nach, okay, jeder, zur · 4. hafta: ab, euer, paar, ohne, ach, ins, vom). Halkaları yeniden kur: her halka 4–6 kart; çıkan kartın görev cümlelerini, cümlede kelimesi geçen başka bir halka kartına bağla ya da sil; her kart yine ≥ 2 görev cümlesi.
2. **Ayrı biçim, ayrı gösterim:** her çerçeve sözcüğü ve her çekimli biçimi (bei, beim, zum, zur, unser, euer, ohne, ins, vom, okay, ach, jeder, welchen …) ilk kullanımdan ÖNCE gösterilmiş olmalı: bir halkanın `kaliplar` satırında (ör. `{"de": "einen Termin bei …", "tr": "…'de bir randevu"}`, `{"de": "Okay!", "tr": "Tamam!"}`, `{"de": "zum Bahnhof", "tr": "istasyona"}`) ya da günün dil noktası tablosunda. Gösterilmemişse kullanma ya da önce kalıp satırına al. **beim** 5. haftanın sözcüğü: hiç kullanma.
3. **Provada karşı tarafın cümlesi** (`dugumler[].de`) ve sınavdaki soru/istem (`prompt_de`, `audio_de`) öğrencinin cevap vermeden önce anlaması gereken cümlelerdir: bilinmeyen sözcük 0 (Problem, schade, Bürgerbüro, alten, Zentrale gibi). Bilinmeyen sözcüğü bilinenle değiştir.
4. **PM-097 md. 1:** sesin ana fikir, ayrıntı ve `eylem` soruları dinlemenin başında, günün kartları tanıtılmadan sorulur: yalnız ÖNCEKİ günlerin sözcükleriyle ya da bağlamdan cevaplanabilmeli. Dikte, gölge ve cevapla ikinci turda (günün kartlarıyla serbest).
5. **Görülmemiş durum her can_do'yu sınamalı:** gorulmemis-0N.json haftanın 7 can_do'sunun hepsini kapsasın (gerekirse 7 durum). Hafta kapısı "kurulabiliyor" demeli.
6. Dosyalara DOĞRUDAN dokun (üreteç betiklerini koşma: dilbilimci ve okur düzeltmeleri dosyada; üreteç onları siler). Almanca cümleyi değiştirdiğin her yeri kısa listede raporla (dilbilimci fark doğrulaması yapacak).
Denetim (hepsi şart): `bash SC/sina.sh <hafta>` →
 - "kalan HATA 0" (content:validate; şema dalında),
 - dikiş "İhlal: 0" ((a) gün adedi tablodaki kartlar ±2),
 - hafta kapısı "Öğretilmeden istenen: 0", "sınanmayan can_do" yok, görülmemiş "N/N kurulabiliyor", hafta sonu testi ≥ %80.
Yerel `kontrol.ts`'i de yeni tabloyla koş (OD9 ve K satırları için): `node --experimental-strip-types SC/kontrol.ts SC/a1-kesin2.json <günler>` (TABLO satırları çerçeve yüzünden artık bilgi amaçlı; gerçek ölçü dikiş).
