# lexicon-batch-003: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-003.view.jsonl` (yazar yaması uygulanmış) · Yama: `cm/work/batch-003.dil.json`
- İncelenen kart: **100** (her kartın bütün alanları, 400 örnek)
- Düzeltilen kart: **46** · alan düzeyinde düzeltme: **64**
- Hata oranı: **46/100 kart** (0,46). Ağır hata (yanlış Almanca, yanlış anlam, politika, kimlik) 17 kartta, kalanı Türkçe doğallık ve eşdizim temizliği.
- `lintpatch.ts`: kart 46, sorunlu 0.
- `npm run content:validate` çalıştırılmadı: parti dosyasına yazma yetkisi verilmedi, yama henüz uygulanmadı. Yamadan sonra BM çalıştırmalı.

## Hatalar

### Almanca ve kart tutarlılığı

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:fallen | coll | leicht fallen → leichtfallen | Kolay gelmek anlamında bitişik yazılır. |
| lx:Welt | ö3 | Ist doch nicht die Welt! → Das kostet doch nicht die Welt! | **nicht die Welt sein** çok para ya da zahmet değil demektir, dünyanın sonu değil anlamı vermez. Çeviri de yanlıştı. |
| lx:Welt | ö4 | Ist doch nicht die Welt, … → Davon geht die Welt nicht unter, … | Otobüs kaçırma sahnesine uyan deyim budur. |
| lx:sorgen | coll, ö1, ö3, exp.ne_zaman, mistakes | Keine Sorge!, Machen Sie sich keine Sorgen, Keine Sorge, das klappt schon → für etwas sorgen, Die Nachbarin sorgt für unsere Katze, Dafür sorg ich schon | Kart fiil, örneklerin üçü ve açıklama **die Sorge** ismini anlatıyordu (OD-9.2 §4). ö4 ve bir eşdizim **sich Sorgen machen** olarak bırakıldı, çünkü endişelenmek gündelikte böyle söylenir; mistakes bunu açıkça söylüyor. Yeni hata: **Ich sorge das Essen** (für eksik). |
| lx:stellen | ö3 | Stell dich nicht so an! → Stell's einfach auf den Tisch. | Örnek **sich anstellen** fiiline aitti, kartın kelimesi değil. Çeviride eğik çizgi vardı. |
| lx:ziehen | coll, ö2, ö4 | umziehen, Ziehen Sie die Tür zu, ich bin umgezogen → nach München ziehen, Sie müssen an der Tür ziehen, ich bin nach München gezogen | Üç yerde başka fiiller (umziehen, zuziehen) gösteriliyordu. mistakes ile de uyumlu oldu. |
| lx:gegen | ö3 | Ich hab nix dagegen. → Bin so gegen acht da. | Örnek **dagegen** kelimesiydi. |
| lx:Problem | ö3 | Null Problem! → Kein Problem, mach ich! | Yerleşik söyleyiş **Null Problemo**; yazılan biçim gerçeklik testini geçmiyor. |
| lx:Hilfe | ö2 | Hilfe beim Formular → Hilfe mit dem Formular | Daha doğal bağlaç. |
| lx:genug | coll | Jetzt reicht's, genug! → Genug jetzt! | Eşdizim yapay bir birleşimdi. |
| lx:sonst | coll | wie sonst → sonst nichts | Tek başına **wie sonst** her zamanki gibi anlamında kullanılmaz. |
| lx:schauen | register, coll | informal → neutral · fernschauen → einen Film schauen | **schauen** güneyde ölçünlü dildir. **fernschauen** bölgesel, kaynağı yok. |
| lx:verschwinden | register | informal → neutral | Kelime nötr. |
| lx:halt | ö1, ö2 katman | hd → alltag | PEDAGOGY **halt** kelimesini Alltag işareti sayar. |
| lx:ne | ö1, ö2 katman | hd → alltag | Aynı gerekçe. |
| lx:bevor | ö3 | Bevor ich's vergesse: … → Bevor ich's vergesse: Der Chef hat angerufen. | Yarım cümle ve üç nokta. |
| lx:gern | coll | gern + fiil → gern kochen | Almanca alanında Türkçe terim. |

### İçerik politikası ve öğrenci kimliği

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Hand | ö3 | Hände hoch! → Hast du mal eine Hand frei? | DN-4: silah tehdidi sahnesi. |
| lx:hoch | coll | Hände hoch! → hohes Fieber | Aynı. |
| lx:verschwinden | ö3, ö1 görsel | Verschwinde, aber schnell! → Mein Schlüssel ist schon wieder verschwunden! · cut bicycle lock on empty rack → empty bicycle rack | Kaba kovma sözü yerine gündelik cümle. Görsel hırsızlık sahnesi getiriyordu. **Verschwinde!** yalnızca uyarı olarak mistakes ve eşdizimde kaldı. |
| lx:allein | ö4 | mit meiner Frau → mit meiner Familie | Öğrencinin ağzından cinsiyet sabitleyen cümle. |
| lx:Baby | mistakes 2 | Bebek bekliyorsan **Ich bin schwanger** dersin → Oyuncak bebek **die Puppe** olur | Cinsiyet varsayan ve kelimeyi anlatmayan not. Yenisi Türkçe konuşana özgü: bebek iki anlamlı. |
| lx:nennen | ö1, mistakes 2 | Alle nennen mich Ali → Alle nennen ihn Max · Ich heiße Mehmet … → Er heißt Mehmet … | **ich** cümlesinde sabit ad. |
| lx:heißen | ö4 | Ich heiße Ivana. Und du? Selin. → Wie heißt du? Ivana. Und du? | Öğrencinin cevabında sabit ad. |
| lx:Herr | ö4 | Herr Yılmaz? Ja, das bin ich. → Ist Herr Yılmaz schon da? Ja, er wartet draußen. | Öğrencinin cevabında sabit ad ve cinsiyet. |
| lx:wahr | ö4 görsel | person raising hand swearing oath → kaldırıldı, ö3 için surprised person reading message on phone | Mahkeme yemini getirir, yanıltıcı. |

### Türkçe

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:echt | ö2 | Bu gerçekten çok naziktin. → Bu gerçekten çok ince bir davranıştı. | Bozuk cümle. |
| lx:echt | ö4 | Evi aldım! → Evi tuttum! | Satın alma gibi anlaşılıyordu. |
| lx:einzig | ö4 | Başka sorun var mı? → Başka soru var mı? | **Fragen** soru demek, sorun değil. |
| lx:erinnern | mistakes 1 | iki cümlelik tanım → Seni hatırlıyorum derken **Ich erinnere dich** yanlış. Doğrusu **Ich erinnere mich an dich**. | Türkçe konuşanın gerçek hatası tek fikirle. |
| lx:niemand | mistakes 2 | **Niemand wissen das** → Kimse var mı diye sorarken **jemand** dersin | Kurgu hata gerçekçi değildi. Yenisi Türkçeden gelen karışıklık (kimse). |
| lx:sofort | coll | derhal, hemen itibaren → şu andan itibaren | Bozuk Türkçe. |
| lx:spät | ö4 | biraz geç → biraz daha geç | **später**. |
| lx:ach | ö4 | Randevu yarın → Randevu ancak yarın | **erst** çevrilmemişti. |
| lx:meinen | coll, ö4 | Ne dersin? / Ne demek istiyorsun? → Ne dersin? · Yani … → Demek istediğim, … | Eğik çizgi. ö4 kelimenin anlamını gösteriyor. |
| lx:sonst | mistakes 1 | başka bir şey demektir → başka bir isteğin var mı demektir | Soru anlamı eksikti. |
| lx:dabei | coll | yanında bir şey bulunmak → bir şeyi yanında bulundurmak | Yanlış çatı. |
| lx:nah | coll | yakında → yakınlarda | **yakında** zaman anlamı veriyor. |
| lx:vergessen, lx:daran | ö4 | aklında tuttun mu → aklına geldi mi, hatırladın mı | Doğal değil. |
| lx:fühlen | ö2 | nasıl hissediyorsunuz → kendinizi nasıl hissediyorsunuz | Eksik. |
| lx:fertig | ö2 | Arabayla ne zaman işiniz biter? → Arabanın işi ne zaman biter? | Doğal değil. |
| lx:Abend | ö2, ö4 | Akşamları → Akşam · yediden sonra → yediden itibaren | ö2 çevirisi aynı karttaki **abends** notuyla çelişiyordu. |
| lx:beide | exp.anlam | hepsini birden → ikisini birden | İki şey için hepsi denmez. |
| lx:tot, lx:verdammt, lx:Ding, lx:weiter, lx:gern | örnek çevirileri | yarı ölüyüm → yarı ölü gibiyim · Kıl payı kurtulduk → Bu gerçekten kıl payıydı · Bu ne biçim bir şey → Bu nasıl bir şey · rahatça devam et → sen devam et · Bir çay alabilir miyim → Bir çay rica edeyim | Doğallık ve anlam kayması. |
| lx:weit, lx:passen, lx:ne | coll | noktalı virgül ve eğik çizgi kaldırıldı | OD-9 yazımı. |
| lx:gegen | ö4 | Bayern - Dortmund → Bayern, Dortmund'a karşı | Kelimenin anlamı çeviride yoktu. |

## Yazarın şüphe notları: karar

- **parcalar** (davon, dafür, dabei, dazu, daran, darüber): da ya da dar için **bu** karşılığı kabul. ins, vom, beim boş kalır: kısaltma olduğu **anlam_tr** içinde yazıyor.
- Kurgu hatalar: **Ich bin Angst**, **zwei Sohne**, **Mein Handy hat verschwunden** gerçekçi, kaldı. **Niemand wissen das** değişti.
- lx:ach: düz ton notu doğru, kaldı. lx:gar, lx:rein: pos ve ikinci anlamlar kabul.
- lx:passen: yakışmak yazar tarafından çıkarılmış, doğru. lx:spät ö4 düzeltildi.
- Görsel: lx:Arbeit, lx:Stunde, lx:Musik kararları doğru. lx:sofort, lx:einzig, lx:nennen, lx:meinen, lx:Ordnung örnek görselleri zayıf ama cümlenin sahnesini veriyor, yanıltıcı değil; kaldı.

## Kalan şüpheler (hata değil, BM kararı)

1. lx:liegen: Bavyera ve Avusturya ölçünlü dilinde **ist gelegen** de söylenir. Öğrenci Bavyerada yaşıyor, duyacak. SOURCES.md içinde kaynak olmadığı için not eklenmedi.
2. lx:schauen: `domains` içinde **bairisch** var. Kelime Bairisch değil, güney ölçünlü Almancası. Alan etiketi sınıflandırma kararı olduğu için dokunulmadı.
3. Sözlük örneklerinde `{name}` ve `{A|B}` yer tutucularının gösterilip gösterilmediği belirsiz (`personalizeDeep` senaryoda çalışıyor, sözlükte kullanım yok). Bu yüzden kimlik sorunları yer tutucuyla değil cümle değiştirerek çözüldü.
4. lx:nennen ö3 ve ö4 (**Nenn mich einfach Tom**, **Sagen Sie einfach Anna**) karşı tarafın sözü sayıldı ve kaldı.
5. lx:tot düzeyi B1 yazılmış, A2 de savunulabilir. Değiştirilmedi.
6. `halt` ve `ne` kartlarında katman değişikliği yamada `ex.{n}.layer` anahtarıyla verildi. `merge.py` bunu uygular, ama görev belgesindeki yama biçiminde bu anahtar yazmıyor.

## Sonuç

**KAPANDI** (yama uygulanıp `content:validate` 0 hata verdikten sonra `review.status: reviewed`). Açık kalan kart yok.

## Açık maddelerin kapanışı

Tarih: 2026-11-18. Okurdan dönen 13 kartın yazar düzeltmesi (`work/batch-003.fix.json`) denetlendi. Yama: `work/batch-003.fix2.json` (4 kart, lintpatch 0 sorun).

Değişmeden geçen 9 kart: lx:vergessen, lx:dafür, lx:welcher, lx:Angst, lx:zusammen, lx:wenig, lx:wann, lx:darüber, lx:daran. Almanca örnekler ve verilen kurallar doğru.

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:beide | exp.ipucu_tr | Eşyadan söz ederken isim söylemiyorsan **beides** dersin: **Ich nehme beides.** → Çay ve kahve gibi iki ayrı şey için **beides** dersin. | Kural fazla genişti. Aynı türden iki eşya için isimsiz de **beide** denir (**Ich nehme beide**, iki gömlek). **beides** iki ayrı şeyi birlikte anlatır. Örnek cümle hata notunda zaten var. |
| lx:Ordnung | exp.ne_zaman_tr | **In Ordnung** derken kibarca kabul edersin. → **In Ordnung** diyerek bir teklifi kabul edersin. | Türkçe tutuk, neyin kabul edildiği belli değildi. |
| lx:ne | exp.ipucu_tr | (yok) → Uzun söylenen **nee** başka kelimedir, konuşmada hayır demektir. | Yazar `tr` içinden "yok" anlamını çıkardı, ama ö3 ve eşdizim hâlâ **Nee** gösteriyor. Açıklamasız kalınca okurun sorusu yanıtsız kalıyordu. |
| lx:nett | ö4 tr | Çantanıza yardım edeyim. → Çantanızı taşımanıza yardım edeyim. | Türkçede çantaya yardım edilmez. |

Kalan not (açık sayılmaz): lx:ne Bavyerada az duyulur, orada aynı iş için **gell** söylenir. Kaynak açmadığım için karta yazmadım.

Sonuç: **KAPANDI**. 13 kartta açık madde kalmadı.
