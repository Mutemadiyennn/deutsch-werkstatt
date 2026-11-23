# Okur raporu: İÇ-5 · 6. hafta (36.–42. gün)

Tarih: 2026-11-23 · okur (OD-9.3) · tek tam tur · taş: M1

## Sayılar

- Okunan açıklama: **1073**
- GEÇTİ: **1045**
- GERİ: **28**

| dosya | okunan | GEÇTİ | GERİ | durum |
|---|---|---|---|---|
| `content/v2/m1/gun-36.json` | 143 | 137 | 6 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-37.json` | 143 | 142 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-38.json` | 142 | 130 | 12 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-39.json` | 142 | 141 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-40.json` | 141 | 139 | 2 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-41.json` | 142 | 141 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-42.json` | 140 | 138 | 2 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/hafta-sonu-testi-06.json` | 18 | 18 | 0 | reviewed olabilir |
| `content/v2/m1/gorulmemis-06.json` | 14 | 14 | 0 | reviewed olabilir |
| `content/v2/m1/dn-06.json` | 24 | 24 | 0 | reviewed olabilir |
| `content/v2/registry/grammar.json` (8 kayıt) | 24 | 21 | 3 | **reviewed sayılamaz** (OD-9.4) |

## Kapsam ve yöntem

- Alanlar bir betikle JSON'dan toplandı ve tek tek okundu: `title_tr`, `goal_tr`, `can_do.tr`, `ortam_tr`, `sahne_tr`, `durum_tr`, `situation_tr`, `q_tr`, Türkçe `opts`, `why_tr`, `geri_bildirim_tr`, `kapanis_tr`, `gorev_tr`, `kontrol_tr`, `instr_tr`.
- Dil noktaları (`dn-06.json`): her kaydın `h_tr`, `tr`, tablo başlığı (tek satır sayıldı) ve tablodaki Türkçe sütun hücreleri. `dn:yeniden-anlatma` tablosunda Türkçe sütun yok (iki sütun da Almanca).
- Dilbilgisi (`grammar.json`): yalnız `gr:a1-07:t2`, `gr:a1-07:t3`, `gr:a1-07:t4`, `gr:a2-01:t1`, `gr:a1-08:t3`, `gr:a1-14:t3`, `gr:a1-06:t4`, `gr:a1-08:t4`; her birinin `h_tr`, `tr` ve tablo başlığı.
- Sayılmadı: dikte şıkları ve test `t03`, `t10` şıkları (Almanca kelime), kalıp satırları, sahne/ses satırlarının çevirileri, çeviri görevlerinin Türkçe cümleleri (`tr`; okundu, why_tr ile karşılaştırıldı, sorun yok).
- Her soru, şık ve geri bildirim Almanca satırla, sesli metinle ve doğru cevapla karşılaştırıldı.
- Betikle tarama: 14 kelimeyi aşan cümle yok. `=`, `;`, tırnak içinde Almanca yok. **`…` gün dosyalarında 18 alanda var** (kalın Almanca kalıpların içinde: **Ich habe … gemacht**, **bin … gefahren** gibi). 5. haftada açıklama alanlarında hiç yoktu. OD-9.2 md. 2 ve görev tanımı `…` için kesin, bu yüzden 18'i de GERİ döndü. Dilbilgisinde `gr:a1-08:t4` tablo başlığı da aynı nedenle döndü (toplam 19). Bunların hepsi tek bir düzeltmeyle çözülür: üç nokta yerine gerçek bir örnek kelime.

### Okurken verdiğim kararlar (baş geliştirici değiştirebilir)

1. Tek başına **fiil** ve tabloda örnekle öğretilen **geçmiş biçimi** GERİ nedeni sayılmadı (görev tanımı).
2. **İki parçalı fiil** (`gr:a1-07:t3`) geçti: 5. haftada `gr:a1-05:t4` başlığında öğretildi. Not: `gr:a1-07:t4` aynı sözü **habe … gelernt** için de kullanıyor (fiilin iki parçası). İkisi yan yana okununca biraz karışıyor ama örnekler ayırıyor.
3. `→` (`gr:a1-08:t3` tablo başlığı) ve `+` (`dn:kelime-ailesi-1` başlığı) geçti: OD-9.2 yasak listesinde yoklar ve tek okumada anlaşılıyorlar.
4. İki kısa cümleli `why_tr` alanları, iki cümle de ekrandaki cevabı anlatıyorsa geçti (5. haftayla aynı ölçü). Örnek: `hafta-sonu-testi-06` `t07`, `gorulmemis-06` `g6`.
5. `goal_tr` içinde etkinlik sıralamak (üç iş bir cümlede) geçti. İçine kural giren ya da kimin yaptığı belirsiz olan hedef GERİ döndü.

## GERİ dönenler

Biçim: dosya · alan yolu · metin · kendi sözlerimle · neden · öneri (öneri yalnız fikir verir, düzeltmeyi yazar ya da dilbilimci yapar).

1. `gun-36.json` · `can_do.tr` · «Dün ne yaptığımı söylerim (**Ich habe … gemacht**).» · Kendi sözlerimle: Dün ne yaptığımı söyleyeceğim, üç noktanın yerine bir şey koyacağım. · **Neden:** `…` sembolü. · **Öneri:** Dün ne yaptığımı söylerim: **Ich habe einen Film gesehen.**
2. `gun-36.json` · `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` · «Tobi yarını değil, geçmişi soruyor. **Ich habe … gelernt** gibi söyle.» · Kendi sözlerimle: Tobi geçmişi soruyor, bir şey öğrendim diye söyle. · **Neden:** `…` sembolü. · **Öneri:** Tobi yarını değil, geçmişi soruyor. **Ich habe Deutsch gelernt** gibi söyle.
3. `gun-36.json` · `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` · «Parti geçti. **Ich habe … gegessen** de.» · Kendi sözlerimle: Parti bitti, yedim diye geçmişte söyle. · **Neden:** `…` sembolü. · **Öneri:** Parti geçti. **Ich habe drei Stück gegessen** de.
4. `gun-36.json` · `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` · «Bu bugün. Tobi geçmişi soruyor. **Ich habe … gesehen** de.» · Kendi sözlerimle: Bugünü anlattım, Tobi dünü soruyor; izledim de. · **Neden:** `…` sembolü. · **Öneri:** Bu bugün. Tobi geçmişi soruyor. **Ich habe einen Film gesehen** de.
5. `gun-36.json` · `prova.kapanis_tr` · «Hafta sonunu geçmişte anlattın: **war**, **habe … gesehen**, **habe … gegessen**.» · Kendi sözlerimle: Hafta sonunu geçmişte anlattım, şu kelimelerle. · **Neden:** `…` sembolü. · **Öneri:** Hafta sonunu geçmişte anlattın: **war**, **gesehen**, **gegessen**.
6. `gun-36.json` · `gun_sinavi.maddeler[m1:36:s11].why_tr` · «İki şey söyle: **war** ile nerede olduğunu, **habe … gesehen** ile ne yaptığını.» · Kendi sözlerimle: Nerede olduğumu war ile, ne yaptığımı habe ile söyleyeceğim. · **Neden:** `…` sembolü. · **Öneri:** İki şey söyle: **war** ile nerede olduğunu, **habe** ve **gesehen** ile ne yaptığını.
7. `gun-37.json` · `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` · «Bu şimdi. Geçmiş için **Ich habe … gekauft** de.» · Kendi sözlerimle: Şimdiyi söyledim, aldım diye geçmişte söylemeliyim. · **Neden:** `…` sembolü. · **Öneri:** Bu şimdi. Geçmiş için **Ich habe einen Pullover gekauft** de.
8. `gun-38.json` · `goal_tr` · «Derya'nın pazar yolculuğunu dinler, nereye ve neyle gittiğini geçmişte söylersin.» · Kendi sözlerimle: Derya'nın yolculuğunu dinleyip onun nereye ve neyle gittiğini söyleyeceğim. Sonra görevlerde kendi gidişimi anlattığımı gördüm. · **Neden:** İki türlü okunuyor: gittiğini kimin gittiği, belli değil (5. haftada `gun-31` `goal_tr` aynı nedenle GERİ dönmüştü). · **Öneri:** Derya'nın pazar yolculuğunu dinlersin. Sen de nereye ve neyle gittiğini söylersin.
9. `gun-38.json` · `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` · «Doğru! Gitmekte **bin** gelir: **bin … gefahren**.» · Kendi sözlerimle: Gitmekte bin kullanılır. · **Neden:** `…` sembolü. · **Öneri:** Doğru! Gitmekte **bin** gelir: **Ich bin in die Stadt gefahren.**
10. `gun-38.json` · `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` · «Çok iyi. Kalmak da **bin** ister: **bin … geblieben**.» · Kendi sözlerimle: Kalmakta da bin kullanılır. · **Neden:** `…` sembolü. · **Öneri:** Çok iyi. Kalmak da **bin** ister: **Ich bin zu Hause geblieben.**
11. `gun-38.json` · `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` · «Harika! **umsteigen** geçmişte **bin … umgestiegen** olur.» · Kendi sözlerimle: Aktarma yapmak geçmişte bin ile söylenir. · **Neden:** `…` sembolü. · **Öneri:** Harika! **umsteigen** geçmişte **Ich bin umgestiegen** olur.
12. `gun-38.json` · `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` · «Doğru. Okumak gitmek değil, bu yüzden **habe … gelesen**.» · Kendi sözlerimle: Okumak bir yere gitmek değil, o yüzden habe. · **Neden:** `…` sembolü. · **Öneri:** Doğru. Okumak gitmek değil, bu yüzden **Ich habe gelesen**.
13. `gun-38.json` · `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` · «Komik ve doğru. **abbiegen** geçmişte **bin … abgebogen**.» · Kendi sözlerimle: Sapmak geçmişte bin ile. · **Neden:** `…` sembolü. · **Öneri:** Komik ve doğru. **abbiegen** geçmişte **Ich bin abgebogen**.
14. `gun-38.json` · `okuma_yazma.yazma.kontrol_tr[1]` · «Gitmek için **bin … gefahren** ya da **bin … gegangen** var mı?» · Kendi sözlerimle: Yazımda bin ve gefahren ya da gegangen var mı? · **Neden:** `…` sembolü. · **Öneri:** Gitmek için **bin** ve **gefahren** ya da **gegangen** var mı?
15. `gun-38.json` · `gun_sinavi.maddeler[m1:38:s1].why_tr` · «Kalmakta **sind … geblieben** gelir.» · Kendi sözlerimle: Kaldık derken sind ve geblieben. · **Neden:** `…` sembolü. · **Öneri:** Kalmakta **sind** ve **geblieben** gelir.
16. `gun-38.json` · `gun_sinavi.maddeler[m1:38:s5].why_tr` · «Araçla gitmek **fahren**, geçmişte **bin … gefahren**.» · Kendi sözlerimle: Araçla gitmek fahren, geçmişte bin gefahren. · **Neden:** `…` sembolü. · **Öneri:** Araçla gitmek **fahren**, geçmişte **Ich bin gefahren**.
17. `gun-38.json` · `gun_sinavi.maddeler[m1:38:s6].why_tr` · «**umsteigen** geçmişte **bin … umgestiegen** olur.» · Kendi sözlerimle: Aktarma geçmişte bin ile. · **Neden:** `…` sembolü. · **Öneri:** **umsteigen** geçmişte **Ich bin umgestiegen** olur.
18. `gun-38.json` · `gun_sinavi.maddeler[m1:38:s8].why_tr` · «**abbiegen** geçmişte **sind … abgebogen** olur.» · Kendi sözlerimle: Döndük derken sind ve abgebogen. · **Neden:** `…` sembolü. · **Öneri:** **abbiegen** geçmişte **Wir sind abgebogen** olur.
19. `gun-38.json` · `gun_sinavi.maddeler[m1:38:s10].why_tr` · «Geçmişte gelmek: **Ich bin … gekommen.**» · Kendi sözlerimle: Geldim derken Ich bin gekommen. · **Neden:** `…` sembolü. · **Öneri:** Geçmişte gelmek: **Ich bin mit dem Fahrrad gekommen.**
20. `gun-39.json` · `can_do.tr` · «Nasıl olduğunu, neyim olduğunu ve bir yılı söylerim.» · Kendi sözlerimle: Neyin nasıl olduğunu... neyim olduğunu? Hastalığımı mı, ne olduğumu mu? Anlamadım. · **Neden:** Anlaşılmıyor ve iki türlü okunuyor: neyim olduğunu hem ne hastalığım var hem ben neyim diye okunuyor. Geçmiş olduğu da söylenmiyor (gün **war**, **hatte** öğretiyor). · **Öneri:** Nasıldım, neyim vardı, söylerim. Bir yılı da söylerim.
21. `gun-40.json` · `can_do.tr` · «Birleşik kelimeyi parçalarından anlar, havayı söylerim.» · Kendi sözlerimle: Birleşik kelime ne, bilmiyorum. Havayı söyleyeceğim. · **Neden:** Terim: birleşik kelime öğretilmedi (dil noktası bu adı kullanmıyor, iki kelimeden bir kelime diyor). Ayrıca iki fikir. · **Öneri:** Uzun bir kelimeyi parçalarından anlarım. Havayı da söylerim.
22. `gun-40.json` · `okuma_yazma.yazma.kontrol_tr[1]` · «Hava cümlesi **es** ile mi başlıyor?» · Kendi sözlerimle: Hava cümlem es ile başlamalı. · **Neden:** Yanlış yönlendiriyor: örnek cevap (**Das Wetter ist heute schön. Es ist warm. Am Wochenende regnet es.**) es ile başlamıyor, bir üstteki madde de **Wetter** istiyor. **Heute regnet es** yazan öğrenci yanlış yaptığını sanır. · **Öneri:** Hava cümlesinde **es** var mı?
23. `gun-41.json` · `sesler[m1:41:a2].bolumler[b1].ayrinti[1].q_tr` · «Bir şey açık değilse kime gitmelisin?» · Kendi sözlerimle: Bir yer açık değilse, yani kapalıysa kime gideceğim? Sonra anlaşılmazsa demek olduğunu düşündüm. · **Neden:** İki türlü okunuyor: açık değil hem kapalı hem anlaşılmadı demek. · **Öneri:** Bir şeyi anlamazsan kime gitmelisin?
24. `gun-42.json` · `prova.title_tr` · «Hafta kapısı provası: hafta sonunu anlat» · Kendi sözlerimle: Haftanın kapısı mı? Kapı ne, bilmiyorum. · **Neden:** İç ad: hafta kapısı öğrenciye anlatılmadı (5. haftada `gun-35` aynı nedenle GERİ dönmüştü). · **Öneri:** Haftanın son provası: hafta sonunu anlat
25. `gun-42.json` · `gun_sinavi.maddeler[m1:42:s11].why_tr` · «Nerede için **war**, nasıl için **gefahren**, ne için **gekauft**.» · Kendi sözlerimle: Nerede için war, tamam. Nasıl için gefahren? Ne için, yani neden gekauft? Anlamadım. · **Neden:** İki türlü okunuyor: ne için Türkçede neden demek. Nasıl ile gefahren arasındaki bağ kurulmuyor. · **Öneri:** Nerede olduğunu **war**, neyle gittiğini **gefahren**, ne aldığını **gekauft** ile söylersin.
26. `grammar.json` · `gr:a1-07:t3.tr` · cümle: «**arbeiten** gibi t ile biten kökte sona **et** gelir: **gearbeitet**.» · Kendi sözlerimle: arbeiten t ile bitmiyor ki, en ile bitiyor. Kök ne, bilmiyorum. · **Neden:** Terim: kök öğretilmedi. Terim bilinmeyince cümle yanlış okunuyor (arbeiten n ile biter). · **Öneri:** **arbeiten** gibi fiillerde sona **et** gelir: **gearbeitet**.
27. `grammar.json` · `gr:a1-08:t4.tr` · cümle: «**seit** ne zamandan beri demektir ve iş hâlâ sürüyor.» · Kendi sözlerimle: seit bir soru, ne zamandan beri diye soruyor. Ama örnekte bir yıldır demek; karıştı. · **Neden:** Anlam örtüşmüyor: ne zamandan beri **Seit wann?** sorusudur, **seit** tek başına -den beri, -dır demek (tablo başlığı da **seit (-dır)** diyor). Bir cümlede iki fikir. · **Öneri:** **seit** -den beri, -dır demektir. İş hâlâ sürüyor.
28. `grammar.json` · `gr:a1-08:t4.table.head` · «vor (… önce)», «für (… süreliğine)» · Kendi sözlerimle: vor önce, für süreliğine. · **Neden:** `…` sembolü. · **Öneri:** vor (bir hafta önce), für (bir haftalığına)

GERİ kimlikleri:

- `gun-36.json`: `can_do.tr`, `prova.dugumler[n1].secenekler[2].geri_bildirim_tr`, `prova.dugumler[n2].secenekler[2].geri_bildirim_tr`, `prova.dugumler[n3].secenekler[2].geri_bildirim_tr`, `prova.kapanis_tr`, `gun_sinavi.maddeler[m1:36:s11].why_tr`
- `gun-37.json`: `prova.dugumler[n1].secenekler[2].geri_bildirim_tr`
- `gun-38.json`: `goal_tr`, `prova.dugumler[n1].secenekler[0].geri_bildirim_tr`, `prova.dugumler[n1].secenekler[1].geri_bildirim_tr`, `prova.dugumler[n2].secenekler[0].geri_bildirim_tr`, `prova.dugumler[n3].secenekler[1].geri_bildirim_tr`, `prova.dugumler[n4].secenekler[0].geri_bildirim_tr`, `okuma_yazma.yazma.kontrol_tr[1]`, `gun_sinavi.maddeler[m1:38:s1].why_tr`, `gun_sinavi.maddeler[m1:38:s5].why_tr`, `gun_sinavi.maddeler[m1:38:s6].why_tr`, `gun_sinavi.maddeler[m1:38:s8].why_tr`, `gun_sinavi.maddeler[m1:38:s10].why_tr`
- `gun-39.json`: `can_do.tr`
- `gun-40.json`: `can_do.tr`, `okuma_yazma.yazma.kontrol_tr[1]`
- `gun-41.json`: `sesler[m1:41:a2].bolumler[b1].ayrinti[1].q_tr`
- `gun-42.json`: `prova.title_tr`, `gun_sinavi.maddeler[m1:42:s11].why_tr`
- `grammar.json`: `gr:a1-07:t3.tr`, `gr:a1-08:t4.tr`, `gr:a1-08:t4.table.head`

## Sayılmayan ama göze çarpanlar (yazar/dilbilimci için bilgi, karar değil)

- `gr:a1-07:t3` tablo satırları (kapsam dışı: yalnız başlık okundu) `ge-…-t` gibi `…` ve **ünlü değişir** (terim) içeriyor.
- `gun-38.json`: halka `h2` Derya'yı **falsch umgestiegen** ve **zu Fuß gegangen** diye anlatıyor, ana sahne **falsch abgebogen** diyor. Hikâye iki yerde farklı.
- `gun-41.json` `halkalar[m1:41:h1].sahne.soru`: soru Tobi'nin nesi var, ama şıklar (Tatilde, Toplantıda, Geç kalıyor) nerede sorusuna cevap. Okununca anlaşılıyor, geçti.
- `gun-42.json` `halkalar[m1:42:h1].title_tr` komik bir film ve hoşça kalın diyor; halka sahnesinde ikisi de yok (yalnız saç). Başlık kart kelimelerini sayıyor, geçti.

## Karar

**GERİ DÖNDÜ (28).** GERİ olan sekiz dosya (`gun-36`'dan `gun-42`'ye yedi gün dosyası ve `grammar.json` içindeki üç alan) düzeltilip bu maddeler yeniden okunmadan "reviewed" sayılamaz (OD-9.4). 28'in 19'u yalnız `…` sembolü; tek bir düzeltme turuyla çözülür. `hafta-sonu-testi-06`, `gorulmemis-06` ve `dn-06` içinde GERİ yok.

## Ek: okunan bütün alanlar

GEÇTİ satırlarında kendi sözlerim yazılmadı: anlattığım şey açıklamanın kendisiyle aynıydı. GERİ satırlarındaki kendi sözlerim yukarıda. `#` betik çıktısındaki sıra numarasıdır (dosyalar arası süreklidir; test `t03`, `t10` şıkları sayılmadığı için 997–999 ve 1011–1013 yok).

### `content/v2/m1/gun-36.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Dün ne yaptığını söylemek: Was hast du gemacht? | GEÇTİ |
| 2 | `goal_tr` | Pazartesi molasında hafta sonunu ve Derya'nın partisini geçmişte anlatırsın. | GEÇTİ |
| 3 | `can_do.tr` | Dün ne yaptığımı söylerim (**Ich habe … gemacht**). | **GERİ** (sembol: `…`) |
| 4 | `halkalar[m1:36:h1].title_tr` | Pazartesi molası: nihayet kahve | GEÇTİ |
| 5 | `halkalar[m1:36:h1].sahne.ortam_tr` | Pazartesi sabahı mola. Tobi kahve makinesinin yanında duruyor. | GEÇTİ |
| 6 | `halkalar[m1:36:h1].sahne.soru.q_tr` | Tobi hafta sonu ne yaptı? | GEÇTİ |
| 7 | `halkalar[m1:36:h1].sahne.soru.opts[0]` | Film izledi | GEÇTİ |
| 8 | `halkalar[m1:36:h1].sahne.soru.opts[1]` | Futbol oynadı | GEÇTİ |
| 9 | `halkalar[m1:36:h1].sahne.soru.opts[2]` | Çalıştı | GEÇTİ |
| 10 | `halkalar[m1:36:h1].sahne.soru.opts[3]` | Ders çalıştı | GEÇTİ |
| 11 | `halkalar[m1:36:h2].title_tr` | Derya'nın partisi | GEÇTİ |
| 12 | `halkalar[m1:36:h2].sahne.ortam_tr` | Derya mutfağa geliyor. Elinde bir pasta kutusu var. | GEÇTİ |
| 13 | `halkalar[m1:36:h2].sahne.soru.q_tr` | Pasta kimden? | GEÇTİ |
| 14 | `halkalar[m1:36:h2].sahne.soru.opts[0]` | Derya'nın bir kız arkadaşından | GEÇTİ |
| 15 | `halkalar[m1:36:h2].sahne.soru.opts[1]` | Tobi'den | GEÇTİ |
| 16 | `halkalar[m1:36:h2].sahne.soru.opts[2]` | Fırından | GEÇTİ |
| 17 | `halkalar[m1:36:h2].sahne.soru.opts[3]` | Herr Wimmer'den | GEÇTİ |
| 18 | `sahne.title_tr` | Pazartesi molası: hafta sonun nasıldı? | GEÇTİ |
| 19 | `sahne.sahneler[s1].sahne_tr` | Pazartesi sabahı mola odası. Tobi elinde kahveyle oturuyor, Derya geliyor. | GEÇTİ |
| 20 | `sahne.sahneler[s2].sahne_tr` | Derya gülümseyerek oturuyor. | GEÇTİ |
| 21 | `sahne.sahneler[s3].sahne_tr` | Tobi başparmağını kaldırıyor. | GEÇTİ |
| 22 | `sahne.sahneler[s4].sahne_tr` | Derya ellerini açıyor. | GEÇTİ |
| 23 | `sahne.sahneler[s5].sahne_tr` | Derya Tobi'ye dönüyor. | GEÇTİ |
| 24 | `sahne.sahneler[s6].sahne_tr` | Tobi yüzünü buruşturuyor. | GEÇTİ |
| 25 | `sahne.sahneler[s7].sahne_tr` | Derya masaya bir pasta kutusu koyuyor. | GEÇTİ |
| 26 | `sahne.sahneler[s8].sahne_tr` | Herr Wimmer kapıda görünüyor. | GEÇTİ |
| 27 | `sahne.sahneler[s9].sahne_tr` | Derya kutuyu Herr Wimmer'e uzatıyor. | GEÇTİ |
| 28 | `sahne.sahneler[s10].sahne_tr` | Herr Wimmer bir dilim alıyor. | GEÇTİ |
| 29 | `sahne.sahneler[s11].sahne_tr` | Tobi sana dönüyor. | GEÇTİ |
| 30 | `sahne.bolumler[b1].ana_fikir.q_tr` | Molada ne konuşuyorlar? | GEÇTİ |
| 31 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Hafta sonunu | GEÇTİ |
| 32 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni iş planını | GEÇTİ |
| 33 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Bir hastalığı | GEÇTİ |
| 34 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Tobi pazar günü ne yaptı? | GEÇTİ |
| 35 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | Film izledi | GEÇTİ |
| 36 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | Pasta yaptı | GEÇTİ |
| 37 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | Çalıştı | GEÇTİ |
| 38 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Herr Wimmer ne alıyor? | GEÇTİ |
| 39 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | Bir dilim pasta | GEÇTİ |
| 40 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | Bir kahve | GEÇTİ |
| 41 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | Bir şişe su | GEÇTİ |
| 42 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 43 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Derya'nın hafta sonunu Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 44 | `sahne.bolumler[b1].cevapla.situation_tr` | Tobi soruyor. Hafta sonu yaptığın bir şeyi söyle. | GEÇTİ |
| 45 | `sahne.bolumler[b1].cevapla.why_tr` | Geçmiş için **habe** ikinci yerde, **gesehen** gibi biçim en sonda. | GEÇTİ |
| 46 | `sesler[m1:36:a1].title_tr` | Ioana'dan sesli mesaj | GEÇTİ |
| 47 | `sesler[m1:36:a1].ortam_tr` | Pazar akşamı telefonuna kurstan Ioana'nın mesajı geliyor. | GEÇTİ |
| 48 | `sesler[m1:36:a1].bolumler[b1].ana_fikir.q_tr` | Ioana neden arıyor? | GEÇTİ |
| 49 | `sesler[m1:36:a1].bolumler[b1].ana_fikir.opts[0]` | Yarınki kursu hatırlatıyor, aramanı istiyor | GEÇTİ |
| 50 | `sesler[m1:36:a1].bolumler[b1].ana_fikir.opts[1]` | Kurs iptal oldu diyor | GEÇTİ |
| 51 | `sesler[m1:36:a1].bolumler[b1].ana_fikir.opts[2]` | Seni partiye çağırıyor | GEÇTİ |
| 52 | `sesler[m1:36:a1].bolumler[b1].ayrinti[0].q_tr` | Kurs yarın saat kaçta? | GEÇTİ |
| 53 | `sesler[m1:36:a1].bolumler[b1].ayrinti[0].opts[0]` | yedide | GEÇTİ |
| 54 | `sesler[m1:36:a1].bolumler[b1].ayrinti[0].opts[1]` | altıda | GEÇTİ |
| 55 | `sesler[m1:36:a1].bolumler[b1].ayrinti[0].opts[2]` | sekizde | GEÇTİ |
| 56 | `sesler[m1:36:a1].bolumler[b1].ayrinti[1].q_tr` | Ioana cumartesi neredeydi? | GEÇTİ |
| 57 | `sesler[m1:36:a1].bolumler[b1].ayrinti[1].opts[0]` | şehirde | GEÇTİ |
| 58 | `sesler[m1:36:a1].bolumler[b1].ayrinti[1].opts[1]` | kursta | GEÇTİ |
| 59 | `sesler[m1:36:a1].bolumler[b1].ayrinti[1].opts[2]` | evde | GEÇTİ |
| 60 | `sesler[m1:36:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 61 | `sesler[m1:36:a1].bolumler[b1].dikte[d5].gorev_tr` | Ioana ne istiyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 62 | `sesler[m1:36:a1].bolumler[b1].cevapla.situation_tr` | Ioana'yı geri arıyorsun. O soruyor. Cumartesi Derya'nın partisindeydin. | GEÇTİ |
| 63 | `sesler[m1:36:a1].bolumler[b1].cevapla.why_tr` | Nerede olduğunu **war** ile söylersin: **Ich war bei Derya.** | GEÇTİ |
| 64 | `sesler[m1:36:a1].eylem.q_tr` | Ioana'nın mesajından sonra ne yapmalısın? | GEÇTİ |
| 65 | `sesler[m1:36:a1].eylem.opts[0]` | Bugün Ioana'yı ara. | GEÇTİ |
| 66 | `sesler[m1:36:a1].eylem.opts[1]` | Cumartesi şehre git. | GEÇTİ |
| 67 | `sesler[m1:36:a1].eylem.opts[2]` | Ioana'ya bir film öner. | GEÇTİ |
| 68 | `sesler[m1:36:a1].eylem.why_tr` | Ioana bugün aramanı istiyor. | GEÇTİ |
| 69 | `sesler[m1:36:a2].title_tr` | Firmada sabah anonsu | GEÇTİ |
| 70 | `sesler[m1:36:a2].ortam_tr` | Pazartesi sabahı firmanın hoparlöründen Herr Wimmer konuşuyor. | GEÇTİ |
| 71 | `sesler[m1:36:a2].bolumler[b1].ana_fikir.q_tr` | Anons ne hakkında? | GEÇTİ |
| 72 | `sesler[m1:36:a2].bolumler[b1].ana_fikir.opts[0]` | Yeni bir iş arkadaşı geliyor | GEÇTİ |
| 73 | `sesler[m1:36:a2].bolumler[b1].ana_fikir.opts[1]` | Firma bugün kapalı | GEÇTİ |
| 74 | `sesler[m1:36:a2].bolumler[b1].ana_fikir.opts[2]` | Toplantı iptal oldu | GEÇTİ |
| 75 | `sesler[m1:36:a2].bolumler[b1].ayrinti[0].q_tr` | Yeni iş arkadaşı nerede çalışacak? | GEÇTİ |
| 76 | `sesler[m1:36:a2].bolumler[b1].ayrinti[0].opts[0]` | ofiste | GEÇTİ |
| 77 | `sesler[m1:36:a2].bolumler[b1].ayrinti[0].opts[1]` | mutfakta | GEÇTİ |
| 78 | `sesler[m1:36:a2].bolumler[b1].ayrinti[0].opts[2]` | depoda | GEÇTİ |
| 79 | `sesler[m1:36:a2].bolumler[b1].ayrinti[1].q_tr` | Saat on buçukta herkes nereye geliyor? | GEÇTİ |
| 80 | `sesler[m1:36:a2].bolumler[b1].ayrinti[1].opts[0]` | mutfağa | GEÇTİ |
| 81 | `sesler[m1:36:a2].bolumler[b1].ayrinti[1].opts[1]` | ofise | GEÇTİ |
| 82 | `sesler[m1:36:a2].bolumler[b1].ayrinti[1].opts[2]` | kapıya | GEÇTİ |
| 83 | `sesler[m1:36:a2].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 84 | `sesler[m1:36:a2].bolumler[b1].dikte[d5].gorev_tr` | Anonsu Tobi'ye Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 85 | `sesler[m1:36:a2].bolumler[b1].cevapla.situation_tr` | Saat on buçuk. Yeni iş arkadaşın mutfağa geliyor. Onu karşıla. | GEÇTİ |
| 86 | `sesler[m1:36:a2].bolumler[b1].cevapla.why_tr` | Yeni gelen birini **Herzlich willkommen!** diye karşılarsın. | GEÇTİ |
| 87 | `sesler[m1:36:a2].eylem.q_tr` | Saat on buçukta ne yapmalısın? | GEÇTİ |
| 88 | `sesler[m1:36:a2].eylem.opts[0]` | Mutfağa git, yeni iş arkadaşınla tanış. | GEÇTİ |
| 89 | `sesler[m1:36:a2].eylem.opts[1]` | Eve git. | GEÇTİ |
| 90 | `sesler[m1:36:a2].eylem.opts[2]` | Herr Wimmer'i ara. | GEÇTİ |
| 91 | `sesler[m1:36:a2].eylem.why_tr` | Herkes on buçukta mutfakta pasta yiyecek. | GEÇTİ |
| 92 | `prova.title_tr` | Tobi hafta sonunu soruyor | GEÇTİ |
| 93 | `prova.durum_tr` | Pazartesi molası. Tobi hafta sonunda ne yaptığını soruyor. Geçmişte anlat. | GEÇTİ |
| 94 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Güzel! Nerede olduğunu **war** ile söyledin. | GEÇTİ |
| 95 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | **habe** ikinci yerde, **gelernt** en sonda. Tam doğru. | GEÇTİ |
| 96 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Tobi yarını değil, geçmişi soruyor. **Ich habe … gelernt** gibi söyle. | **GERİ** (sembol: `…`) |
| 97 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Komik ve doğru! **gegessen** en sonda. | GEÇTİ |
| 98 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Kısa ve doğal. Soruyu Tobi'ye geri sordun. | GEÇTİ |
| 99 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Parti geçti. **Ich habe … gegessen** de. | **GERİ** (sembol: `…`) |
| 100 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Çok iyi. **habe** ikinci yerde, **gesehen** en sonda. | GEÇTİ |
| 101 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Doğru. **gegessen** yedim demek. | GEÇTİ |
| 102 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Bu bugün. Tobi geçmişi soruyor. **Ich habe … gesehen** de. | **GERİ** (sembol: `…`) |
| 103 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Gülümseten bir cevap. Molada tam yerinde. | GEÇTİ |
| 104 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | **war** ile hafta sonunu özetledin. | GEÇTİ |
| 105 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Şimdi sabah molası! **Gute Nacht** akşam yatarken söylenir. | GEÇTİ |
| 106 | `prova.kapanis_tr` | Hafta sonunu geçmişte anlattın: **war**, **habe … gesehen**, **habe … gegessen**. | **GERİ** (sembol: `…`) |
| 107 | `okuma_yazma.title_tr` | Derya'nın grup mesajı | GEÇTİ |
| 108 | `okuma_yazma.sorular[m1:36:o1].q_tr` | Derya neden yazıyor? | GEÇTİ |
| 109 | `okuma_yazma.sorular[m1:36:o1].opts[0]` | Partiden sonra teşekkür etmek için | GEÇTİ |
| 110 | `okuma_yazma.sorular[m1:36:o1].opts[1]` | Yeni bir partiye çağırmak için | GEÇTİ |
| 111 | `okuma_yazma.sorular[m1:36:o1].opts[2]` | İşe gelemeyeceğini söylemek için | GEÇTİ |
| 112 | `okuma_yazma.sorular[m1:36:o2].q_tr` | Parti saat kaça kadar sürdü? | GEÇTİ |
| 113 | `okuma_yazma.sorular[m1:36:o2].opts[0]` | on ikiye kadar | GEÇTİ |
| 114 | `okuma_yazma.sorular[m1:36:o2].opts[1]` | ona kadar | GEÇTİ |
| 115 | `okuma_yazma.sorular[m1:36:o2].opts[2]` | üçe kadar | GEÇTİ |
| 116 | `okuma_yazma.sorular[m1:36:o3].q_tr` | Yarın firmada ne var? | GEÇTİ |
| 117 | `okuma_yazma.sorular[m1:36:o3].opts[0]` | pasta | GEÇTİ |
| 118 | `okuma_yazma.sorular[m1:36:o3].opts[1]` | müzik | GEÇTİ |
| 119 | `okuma_yazma.sorular[m1:36:o3].opts[2]` | film | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:36:o4].situation_tr` | Derya'ya cevap ver. Parti güzeldi, teşekkür et. | GEÇTİ |
| 121 | `okuma_yazma.sorular[m1:36:o4].why_tr` | Teşekkür et, sonra **war** ile partiyi anlat: **Die Party war schön.** | GEÇTİ |
| 122 | `okuma_yazma.yazma.gorev_tr` | Tobi soruyor: hafta sonu ne yaptın? İki kısa cümleyle cevap yaz. | GEÇTİ |
| 123 | `okuma_yazma.yazma.kontrol_tr[0]` | İki cümle yazdın mı? | GEÇTİ |
| 124 | `okuma_yazma.yazma.kontrol_tr[1]` | **habe** cümlenin ikinci yerinde mi? | GEÇTİ |
| 125 | `okuma_yazma.yazma.kontrol_tr[2]` | Son kelime **gesehen** gibi geçmiş biçimi mi? | GEÇTİ |
| 126 | `gun_sinavi.maddeler[m1:36:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 127 | `gun_sinavi.maddeler[m1:36:s1].why_tr` | **war** -di, -ydı demek: **Tobi war da.** | GEÇTİ |
| 128 | `gun_sinavi.maddeler[m1:36:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 129 | `gun_sinavi.maddeler[m1:36:s2].why_tr` | **hat** ikinci yerde, **gespielt** en sonda. | GEÇTİ |
| 130 | `gun_sinavi.maddeler[m1:36:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 131 | `gun_sinavi.maddeler[m1:36:s3].why_tr` | **ein Stück Kuchen** bir dilim pasta demek. | GEÇTİ |
| 132 | `gun_sinavi.maddeler[m1:36:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 133 | `gun_sinavi.maddeler[m1:36:s4].why_tr` | **gelernt** öğrendim, çalıştım demek. | GEÇTİ |
| 134 | `gun_sinavi.maddeler[m1:36:s5].why_tr` | **hast** ikinci yerde, **gemacht** en sonda. | GEÇTİ |
| 135 | `gun_sinavi.maddeler[m1:36:s6].why_tr` | **sehen** geçmişte **gesehen** olur ve en sona gider. | GEÇTİ |
| 136 | `gun_sinavi.maddeler[m1:36:s7].why_tr` | Nerede olduğunu **war** ile söylersin. | GEÇTİ |
| 137 | `gun_sinavi.maddeler[m1:36:s8].why_tr` | **essen** geçmişte **gegessen** olur. | GEÇTİ |
| 138 | `gun_sinavi.maddeler[m1:36:s9].situation_tr` | Derya hafta sonunu soruyor. Cumartesi kâğıt oynadın. Söyle. | GEÇTİ |
| 139 | `gun_sinavi.maddeler[m1:36:s9].why_tr` | **habe** ikinci yerde, **gespielt** en sonda. | GEÇTİ |
| 140 | `gun_sinavi.maddeler[m1:36:s10].situation_tr` | Tobi sana kahve öneriyor. Sen su istiyorsun. | GEÇTİ |
| 141 | `gun_sinavi.maddeler[m1:36:s10].why_tr` | Kibarca hayır: **Nein danke, nur Wasser.** | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:36:s11].situation_tr` | Tobi pazartesi soruyor. Hafta sonu yaptığın iki şeyi söyle. | GEÇTİ |
| 143 | `gun_sinavi.maddeler[m1:36:s11].why_tr` | İki şey söyle: **war** ile nerede olduğunu, **habe … gesehen** ile ne yaptığını. | **GERİ** (sembol: `…`) |

### `content/v2/m1/gun-37.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 144 | `title_tr` | Kelimeyi geçmişe çevirmek: kaufen, gekauft | GEÇTİ |
| 145 | `goal_tr` | Kursta Ioana ile hafta sonu alışverişini konuşur, sık fiilleri geçmişe çevirirsin. | GEÇTİ |
| 146 | `can_do.tr` | Sık fiilleri geçmişe çevirip kısa cümle kurarım. | GEÇTİ |
| 147 | `halkalar[m1:37:h1].title_tr` | Ioana'nın yeni eteği | GEÇTİ |
| 148 | `halkalar[m1:37:h1].sahne.ortam_tr` | Akşam kursu, ders başlamadan önce. Ioana yeni bir etekle geliyor. | GEÇTİ |
| 149 | `halkalar[m1:37:h1].sahne.soru.q_tr` | Ioana eteği nereden aldı? | GEÇTİ |
| 150 | `halkalar[m1:37:h1].sahne.soru.opts[0]` | Garın yanındaki dükkândan | GEÇTİ |
| 151 | `halkalar[m1:37:h1].sahne.soru.opts[1]` | Kursun yanından | GEÇTİ |
| 152 | `halkalar[m1:37:h1].sahne.soru.opts[2]` | İnternetten | GEÇTİ |
| 153 | `halkalar[m1:37:h1].sahne.soru.opts[3]` | Pazardan | GEÇTİ |
| 154 | `halkalar[m1:37:h2].title_tr` | Deneme kabini ve kasa | GEÇTİ |
| 155 | `halkalar[m1:37:h2].sahne.ortam_tr` | Ioana deneme kabininde neler yaşadığını anlatıyor. | GEÇTİ |
| 156 | `halkalar[m1:37:h2].sahne.soru.q_tr` | Ioana sonunda ne aldı? | GEÇTİ |
| 157 | `halkalar[m1:37:h2].sahne.soru.opts[0]` | Etek ve kitap | GEÇTİ |
| 158 | `halkalar[m1:37:h2].sahne.soru.opts[1]` | On kazak | GEÇTİ |
| 159 | `halkalar[m1:37:h2].sahne.soru.opts[2]` | Hiçbir şey | GEÇTİ |
| 160 | `halkalar[m1:37:h2].sahne.soru.opts[3]` | Bir kazak | GEÇTİ |
| 161 | `sahne.title_tr` | Kursta: hafta sonu ne yaptınız? | GEÇTİ |
| 162 | `sahne.sahneler[s1].sahne_tr` | Akşam kursu. Öğretmen sınıfa dönüyor, herkes oturuyor. | GEÇTİ |
| 163 | `sahne.sahneler[s2].sahne_tr` | Ioana parmağını kaldırıyor. | GEÇTİ |
| 164 | `sahne.sahneler[s3].sahne_tr` | Öğretmen gülümsüyor. | GEÇTİ |
| 165 | `sahne.sahneler[s4].sahne_tr` | Ioana biraz düşünüyor. | GEÇTİ |
| 166 | `sahne.sahneler[s5].sahne_tr` | Öğretmen yavaşça tekrar ediyor. | GEÇTİ |
| 167 | `sahne.sahneler[s6].sahne_tr` | Ioana gülüyor. | GEÇTİ |
| 168 | `sahne.sahneler[s7].sahne_tr` | Öğretmen merakla soruyor. | GEÇTİ |
| 169 | `sahne.sahneler[s8].sahne_tr` | Ioana başını sallıyor. | GEÇTİ |
| 170 | `sahne.sahneler[s9].sahne_tr` | Ioana çantasından bir kitap çıkarıyor. | GEÇTİ |
| 171 | `sahne.sahneler[s10].sahne_tr` | Öğretmen kitaba bakıyor. | GEÇTİ |
| 172 | `sahne.sahneler[s11].sahne_tr` | Ioana gülüyor. | GEÇTİ |
| 173 | `sahne.bolumler[b1].ana_fikir.q_tr` | Ioana hafta sonu ne yaptı? | GEÇTİ |
| 174 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Alışveriş yaptı | GEÇTİ |
| 175 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Çalıştı | GEÇTİ |
| 176 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Ailesini ziyaret etti | GEÇTİ |
| 177 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Ioana ne aldı? | GEÇTİ |
| 178 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | Siyah bir etek ve bir kitap | GEÇTİ |
| 179 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | Bir kazak | GEÇTİ |
| 180 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | Ayakkabı | GEÇTİ |
| 181 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Ioana nasıl ödedi? | GEÇTİ |
| 182 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | nakit | GEÇTİ |
| 183 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | kartla | GEÇTİ |
| 184 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | ödemedi | GEÇTİ |
| 185 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 186 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Ioana'nın cumartesisini Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 187 | `sahne.bolumler[b1].cevapla.situation_tr` | Öğretmen sana soruyor. Cumartesi bir kitap ve bir kazak aldın. | GEÇTİ |
| 188 | `sahne.bolumler[b1].cevapla.why_tr` | **kaufen** geçmişte **gekauft** olur. Başa ge, sona t gelir. | GEÇTİ |
| 189 | `sesler[m1:37:a1].title_tr` | Derya'dan sesli mesaj | GEÇTİ |
| 190 | `sesler[m1:37:a1].ortam_tr` | Öğle arasında telefonuna Derya'dan bir mesaj geliyor. | GEÇTİ |
| 191 | `sesler[m1:37:a1].bolumler[b1].ana_fikir.q_tr` | Derya neden arıyor? | GEÇTİ |
| 192 | `sesler[m1:37:a1].bolumler[b1].ana_fikir.opts[0]` | Birlikte hediye almaya gitmek istiyor | GEÇTİ |
| 193 | `sesler[m1:37:a1].bolumler[b1].ana_fikir.opts[1]` | Seni doğum gününe çağırıyor | GEÇTİ |
| 194 | `sesler[m1:37:a1].bolumler[b1].ana_fikir.opts[2]` | İşe gelemiyor | GEÇTİ |
| 195 | `sesler[m1:37:a1].bolumler[b1].ayrinti[0].q_tr` | Hediye kimin için? | GEÇTİ |
| 196 | `sesler[m1:37:a1].bolumler[b1].ayrinti[0].opts[0]` | kız kardeşi için | GEÇTİ |
| 197 | `sesler[m1:37:a1].bolumler[b1].ayrinti[0].opts[1]` | Tobi için | GEÇTİ |
| 198 | `sesler[m1:37:a1].bolumler[b1].ayrinti[0].opts[2]` | senin için | GEÇTİ |
| 199 | `sesler[m1:37:a1].bolumler[b1].ayrinti[1].q_tr` | Derya ne zaman şehre gitmek istiyor? | GEÇTİ |
| 200 | `sesler[m1:37:a1].bolumler[b1].ayrinti[1].opts[0]` | çarşamba saat dörtte | GEÇTİ |
| 201 | `sesler[m1:37:a1].bolumler[b1].ayrinti[1].opts[1]` | cuma saat dörtte | GEÇTİ |
| 202 | `sesler[m1:37:a1].bolumler[b1].ayrinti[1].opts[2]` | çarşamba saat ikide | GEÇTİ |
| 203 | `sesler[m1:37:a1].bolumler[b1].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 204 | `sesler[m1:37:a1].bolumler[b1].dikte[d5].gorev_tr` | Derya ne istiyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 205 | `sesler[m1:37:a1].bolumler[b1].cevapla.situation_tr` | Derya'yı geri arıyorsun. Çarşamba vaktin var. Söyle. | GEÇTİ |
| 206 | `sesler[m1:37:a1].bolumler[b1].cevapla.why_tr` | Kısa bir **Ja, ich habe Zeit.** yeter. | GEÇTİ |
| 207 | `sesler[m1:37:a1].eylem.q_tr` | Derya'nın mesajından sonra ne yapmalısın? | GEÇTİ |
| 208 | `sesler[m1:37:a1].eylem.opts[0]` | Derya'ya çarşamba için cevap ver. | GEÇTİ |
| 209 | `sesler[m1:37:a1].eylem.opts[1]` | Cuma günü Derya'nın kız kardeşini ara. | GEÇTİ |
| 210 | `sesler[m1:37:a1].eylem.opts[2]` | Garda bir bilet al. | GEÇTİ |
| 211 | `sesler[m1:37:a1].eylem.why_tr` | Derya çarşamba vaktin olup olmadığını soruyor. | GEÇTİ |
| 212 | `sesler[m1:37:a2].title_tr` | Ayakkabıcının telesekreteri | GEÇTİ |
| 213 | `sesler[m1:37:a2].ortam_tr` | Bir ayakkabı dükkânını arıyorsun. Kimse açmıyor, kayıtlı bir mesaj çalıyor. | GEÇTİ |
| 214 | `sesler[m1:37:a2].bolumler[b1].ana_fikir.q_tr` | Bu mesaj ne hakkında? | GEÇTİ |
| 215 | `sesler[m1:37:a2].bolumler[b1].ana_fikir.opts[0]` | Dükkânın açık olduğu saatler | GEÇTİ |
| 216 | `sesler[m1:37:a2].bolumler[b1].ana_fikir.opts[1]` | Bir indirim | GEÇTİ |
| 217 | `sesler[m1:37:a2].bolumler[b1].ana_fikir.opts[2]` | Bir iş ilanı | GEÇTİ |
| 218 | `sesler[m1:37:a2].bolumler[b1].ayrinti[0].q_tr` | Cumartesi saat kaça kadar açık? | GEÇTİ |
| 219 | `sesler[m1:37:a2].bolumler[b1].ayrinti[0].opts[0]` | ikiye kadar | GEÇTİ |
| 220 | `sesler[m1:37:a2].bolumler[b1].ayrinti[0].opts[1]` | altıya kadar | GEÇTİ |
| 221 | `sesler[m1:37:a2].bolumler[b1].ayrinti[0].opts[2]` | dokuza kadar | GEÇTİ |
| 222 | `sesler[m1:37:a2].bolumler[b1].ayrinti[1].q_tr` | Dükkân pazar günü açık mı? | GEÇTİ |
| 223 | `sesler[m1:37:a2].bolumler[b1].ayrinti[1].opts[0]` | Hayır, kapalı | GEÇTİ |
| 224 | `sesler[m1:37:a2].bolumler[b1].ayrinti[1].opts[1]` | Evet, dokuzdan ikiye kadar | GEÇTİ |
| 225 | `sesler[m1:37:a2].bolumler[b1].ayrinti[1].opts[2]` | Evet, dokuzdan altıya kadar | GEÇTİ |
| 226 | `sesler[m1:37:a2].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 227 | `sesler[m1:37:a2].bolumler[b1].dikte[d5].gorev_tr` | Dükkânın saatlerini Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 228 | `sesler[m1:37:a2].bolumler[b1].cevapla.situation_tr` | Bir arkadaşın pazar günü gitmek istiyor. Dükkânın kapalı olduğunu söyle. | GEÇTİ |
| 229 | `sesler[m1:37:a2].bolumler[b1].cevapla.why_tr` | Kapalı için **geschlossen** dersin, açık için **geöffnet**. | GEÇTİ |
| 230 | `sesler[m1:37:a2].eylem.q_tr` | Cumartesi saat üçte ayakkabı almak istiyorsun. Ne yapmalısın? | GEÇTİ |
| 231 | `sesler[m1:37:a2].eylem.opts[0]` | Daha erken git. Dükkân saat ikide kapanıyor. | GEÇTİ |
| 232 | `sesler[m1:37:a2].eylem.opts[1]` | Saat üçte git. | GEÇTİ |
| 233 | `sesler[m1:37:a2].eylem.opts[2]` | Pazar günü git. | GEÇTİ |
| 234 | `sesler[m1:37:a2].eylem.why_tr` | Cumartesi dükkân yalnız saat ikiye kadar açık. | GEÇTİ |
| 235 | `prova.title_tr` | Kursta Ioana ile: sadece Almanca | GEÇTİ |
| 236 | `prova.durum_tr` | Kurstan önce Ioana ile pratik yapıyorsunuz. Anlaşmanız var: sadece Almanca. Hafta sonunu geçmişte anlat. | GEÇTİ |
| 237 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Doğru! **gekauft** en sonda. | GEÇTİ |
| 238 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Çok iyi. **arbeiten** geçmişte **gearbeitet** olur. | GEÇTİ |
| 239 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Bu şimdi. Geçmiş için **Ich habe … gekauft** de. | **GERİ** (sembol: `…`) |
| 240 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | İki cümle, ikisi de geçmişte. Çok iyi. | GEÇTİ |
| 241 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Doğal bir cevap. Kazak hâlâ sıcak, bu yüzden **ist**. | GEÇTİ |
| 242 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Ioana fiyatı soruyor. **billig** ya da **teuer** ile cevap ver. | GEÇTİ |
| 243 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Çok iyi! **fernsehen** geçmişte **ferngesehen** olur. | GEÇTİ |
| 244 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Açık ve doğru. | GEÇTİ |
| 245 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Cumartesi geçti. **Ich habe bis drei gearbeitet** de. | GEÇTİ |
| 246 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Harika! **anrufen** geçmişte **angerufen** olur, ge ortaya girer. | GEÇTİ |
| 247 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Doğru. Ioana da buna sevinir! | GEÇTİ |
| 248 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Pazar geçti. **Ich habe ein Buch gelesen** de. | GEÇTİ |
| 249 | `prova.kapanis_tr` | Fiilleri geçmişe çevirdin: **gekauft**, **gearbeitet**, **ferngesehen**, **angerufen**. | GEÇTİ |
| 250 | `okuma_yazma.title_tr` | Derya dükkândan yazıyor | GEÇTİ |
| 251 | `okuma_yazma.sorular[m1:37:o1].q_tr` | Derya ne yazıyor? | GEÇTİ |
| 252 | `okuma_yazma.sorular[m1:37:o1].opts[0]` | Kız kardeşine kazak aldığını ve seni beklediğini | GEÇTİ |
| 253 | `okuma_yazma.sorular[m1:37:o1].opts[1]` | Bugün gelemeyeceğini | GEÇTİ |
| 254 | `okuma_yazma.sorular[m1:37:o1].opts[2]` | Dükkânın kapalı olduğunu | GEÇTİ |
| 255 | `okuma_yazma.sorular[m1:37:o2].q_tr` | Siyah kazak nasıl? | GEÇTİ |
| 256 | `okuma_yazma.sorular[m1:37:o2].opts[0]` | güzel ve ucuz | GEÇTİ |
| 257 | `okuma_yazma.sorular[m1:37:o2].opts[1]` | pahalı | GEÇTİ |
| 258 | `okuma_yazma.sorular[m1:37:o2].opts[2]` | çok büyük | GEÇTİ |
| 259 | `okuma_yazma.sorular[m1:37:o3].q_tr` | Dükkân saat kaça kadar açık? | GEÇTİ |
| 260 | `okuma_yazma.sorular[m1:37:o3].opts[0]` | sekize kadar | GEÇTİ |
| 261 | `okuma_yazma.sorular[m1:37:o3].opts[1]` | dörde kadar | GEÇTİ |
| 262 | `okuma_yazma.sorular[m1:37:o3].opts[2]` | altıya kadar | GEÇTİ |
| 263 | `okuma_yazma.sorular[m1:37:o4].situation_tr` | Derya'ya cevap ver. On dakika sonra geliyorsun. | GEÇTİ |
| 264 | `okuma_yazma.sorular[m1:37:o4].why_tr` | Ne zaman geleceğini **in zehn Minuten** ile söylersin. | GEÇTİ |
| 265 | `okuma_yazma.yazma.gorev_tr` | Ioana soruyor: cumartesi ne aldın, nasıl ödedin? İki kısa cümleyle cevap yaz. | GEÇTİ |
| 266 | `okuma_yazma.yazma.kontrol_tr[0]` | Ne aldığını yazdın mı? | GEÇTİ |
| 267 | `okuma_yazma.yazma.kontrol_tr[1]` | **gekauft** cümlenin sonunda mı? | GEÇTİ |
| 268 | `okuma_yazma.yazma.kontrol_tr[2]` | Nasıl ödediğini yazdın mı? | GEÇTİ |
| 269 | `gun_sinavi.maddeler[m1:37:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 270 | `gun_sinavi.maddeler[m1:37:s1].why_tr` | **sprechen** geçmişte **gesprochen** olur. | GEÇTİ |
| 271 | `gun_sinavi.maddeler[m1:37:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 272 | `gun_sinavi.maddeler[m1:37:s2].why_tr` | **arbeiten** geçmişte **gearbeitet** olur. | GEÇTİ |
| 273 | `gun_sinavi.maddeler[m1:37:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 274 | `gun_sinavi.maddeler[m1:37:s3].why_tr` | **Umkleidekabine** deneme kabini demek. | GEÇTİ |
| 275 | `gun_sinavi.maddeler[m1:37:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 276 | `gun_sinavi.maddeler[m1:37:s4].why_tr` | **lesen** geçmişte **gelesen** olur. | GEÇTİ |
| 277 | `gun_sinavi.maddeler[m1:37:s5].why_tr` | **kaufen** geçmişte **gekauft** olur. | GEÇTİ |
| 278 | `gun_sinavi.maddeler[m1:37:s6].why_tr` | **bezahlen** geçmişte **bezahlt** olur, başına ge gelmez. | GEÇTİ |
| 279 | `gun_sinavi.maddeler[m1:37:s7].why_tr` | **anrufen** geçmişte **angerufen** olur. | GEÇTİ |
| 280 | `gun_sinavi.maddeler[m1:37:s8].why_tr` | **anprobieren** geçmişte **anprobiert** olur. | GEÇTİ |
| 281 | `gun_sinavi.maddeler[m1:37:s9].situation_tr` | Kasada satıcı soruyor. Nakit öde. | GEÇTİ |
| 282 | `gun_sinavi.maddeler[m1:37:s9].why_tr` | Nakit için **bar** dersin. | GEÇTİ |
| 283 | `gun_sinavi.maddeler[m1:37:s10].situation_tr` | Ioana soruyor. Cumartesi bir etek aldın. | GEÇTİ |
| 284 | `gun_sinavi.maddeler[m1:37:s10].why_tr` | **Ich habe einen Rock gekauft.** **gekauft** en sonda. | GEÇTİ |
| 285 | `gun_sinavi.maddeler[m1:37:s11].situation_tr` | Kursta öğretmen soruyor. İki şey söyle: bir şey aldın, bir şey okudun. | GEÇTİ |
| 286 | `gun_sinavi.maddeler[m1:37:s11].why_tr` | İki fiili geçmişe çevir: **gekauft** ve **gelesen**. | GEÇTİ |

### `content/v2/m1/gun-38.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 287 | `title_tr` | Gitmek ve gelmek geçmişte: Ich bin gegangen | GEÇTİ |
| 288 | `goal_tr` | Derya'nın pazar yolculuğunu dinler, nereye ve neyle gittiğini geçmişte söylersin. | **GERİ** (iki türlü okunuyor: kimin gittiği belli değil) |
| 289 | `can_do.tr` | Nereye ve neyle gittiğimi geçmişte söylerim. | GEÇTİ |
| 290 | `halkalar[m1:38:h1].title_tr` | Derya annesiyle babasının yanında | GEÇTİ |
| 291 | `halkalar[m1:38:h1].sahne.ortam_tr` | Çarşamba molası. Derya pazar gününü anlatıyor. | GEÇTİ |
| 292 | `halkalar[m1:38:h1].sahne.soru.q_tr` | Derya'nın annesiyle babasının yanında başka kim vardı? | GEÇTİ |
| 293 | `halkalar[m1:38:h1].sahne.soru.opts[0]` | Amcası ve köpeği | GEÇTİ |
| 294 | `halkalar[m1:38:h1].sahne.soru.opts[1]` | Tobi | GEÇTİ |
| 295 | `halkalar[m1:38:h1].sahne.soru.opts[2]` | Kız kardeşi | GEÇTİ |
| 296 | `halkalar[m1:38:h1].sahne.soru.opts[3]` | Kimse | GEÇTİ |
| 297 | `halkalar[m1:38:h2].title_tr` | Tramvay, aktarma, yanlış sokak | GEÇTİ |
| 298 | `halkalar[m1:38:h2].sahne.ortam_tr` | Derya devam ediyor, ellerini açıp gülüyor. | GEÇTİ |
| 299 | `halkalar[m1:38:h2].sahne.soru.q_tr` | Derya'ya ne oldu? | GEÇTİ |
| 300 | `halkalar[m1:38:h2].sahne.soru.opts[0]` | Yanlış yerde aktarma yaptı | GEÇTİ |
| 301 | `halkalar[m1:38:h2].sahne.soru.opts[1]` | Biletini kaybetti | GEÇTİ |
| 302 | `halkalar[m1:38:h2].sahne.soru.opts[2]` | Tramvay gelmedi | GEÇTİ |
| 303 | `halkalar[m1:38:h2].sahne.soru.opts[3]` | Uyuyakaldı | GEÇTİ |
| 304 | `sahne.title_tr` | Derya'nın pazar yolculuğu | GEÇTİ |
| 305 | `sahne.sahneler[s1].sahne_tr` | Çarşamba, öğle arası. Tobi, Derya ve sen masada oturuyorsunuz. | GEÇTİ |
| 306 | `sahne.sahneler[s2].sahne_tr` | Derya gülümsüyor. | GEÇTİ |
| 307 | `sahne.sahneler[s3].sahne_tr` | Tobi merakla bakıyor. | GEÇTİ |
| 308 | `sahne.sahneler[s4].sahne_tr` | Derya başını sallıyor. | GEÇTİ |
| 309 | `sahne.sahneler[s5].sahne_tr` | Derya alnına vuruyor. | GEÇTİ |
| 310 | `sahne.sahneler[s6].sahne_tr` | Tobi gülüyor. | GEÇTİ |
| 311 | `sahne.sahneler[s7].sahne_tr` | Derya omuz silkiyor. | GEÇTİ |
| 312 | `sahne.sahneler[s8].sahne_tr` | Derya telefonuna bakıp gülümsüyor. | GEÇTİ |
| 313 | `sahne.sahneler[s9].sahne_tr` | Tobi alkışlıyor. | GEÇTİ |
| 314 | `sahne.sahneler[s10].sahne_tr` | Derya sana dönüyor. | GEÇTİ |
| 315 | `sahne.bolumler[b1].ana_fikir.q_tr` | Derya pazar günü ne yaptı? | GEÇTİ |
| 316 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Anne babasına gitti | GEÇTİ |
| 317 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Tatile gitti | GEÇTİ |
| 318 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Evde kaldı | GEÇTİ |
| 319 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Derya neyle gitti? | GEÇTİ |
| 320 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | otobüs ve tramvayla | GEÇTİ |
| 321 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | arabayla | GEÇTİ |
| 322 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | bisikletle | GEÇTİ |
| 323 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Sonunda kim geldi? | GEÇTİ |
| 324 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | Amcası, köpekle | GEÇTİ |
| 325 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | Babası | GEÇTİ |
| 326 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | Tobi | GEÇTİ |
| 327 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 328 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Derya'nın pazar gününü Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 329 | `sahne.bolumler[b1].cevapla.situation_tr` | Derya soruyor. Hayır, cumartesi şehre gittin. Söyle. | GEÇTİ |
| 330 | `sahne.bolumler[b1].cevapla.why_tr` | Gitmekte **habe** değil **bin** gelir: **Ich bin gefahren.** | GEÇTİ |
| 331 | `sesler[m1:38:a1].title_tr` | Durakta anons | GEÇTİ |
| 332 | `sesler[m1:38:a1].ortam_tr` | Münih'te bir durakta bekliyorsun. Hoparlörden bir anons geliyor. | GEÇTİ |
| 333 | `sesler[m1:38:a1].bolumler[b1].ana_fikir.q_tr` | Anons ne diyor? | GEÇTİ |
| 334 | `sesler[m1:38:a1].bolumler[b1].ana_fikir.opts[0]` | Sekiz numaralı otobüs bugün gara gitmiyor | GEÇTİ |
| 335 | `sesler[m1:38:a1].bolumler[b1].ana_fikir.opts[1]` | Otobüs geç geliyor | GEÇTİ |
| 336 | `sesler[m1:38:a1].bolumler[b1].ana_fikir.opts[2]` | Bilet fiyatı değişti | GEÇTİ |
| 337 | `sesler[m1:38:a1].bolumler[b1].ayrinti[0].q_tr` | Neyle gitmelisin? | GEÇTİ |
| 338 | `sesler[m1:38:a1].bolumler[b1].ayrinti[0].opts[0]` | metroyla | GEÇTİ |
| 339 | `sesler[m1:38:a1].bolumler[b1].ayrinti[0].opts[1]` | tramvayla | GEÇTİ |
| 340 | `sesler[m1:38:a1].bolumler[b1].ayrinti[0].opts[2]` | bisikletle | GEÇTİ |
| 341 | `sesler[m1:38:a1].bolumler[b1].ayrinti[1].q_tr` | Metro ne sıklıkla geliyor? | GEÇTİ |
| 342 | `sesler[m1:38:a1].bolumler[b1].ayrinti[1].opts[0]` | beş dakikada bir | GEÇTİ |
| 343 | `sesler[m1:38:a1].bolumler[b1].ayrinti[1].opts[1]` | saatte bir | GEÇTİ |
| 344 | `sesler[m1:38:a1].bolumler[b1].ayrinti[1].opts[2]` | on dakikada bir | GEÇTİ |
| 345 | `sesler[m1:38:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 346 | `sesler[m1:38:a1].bolumler[b1].dikte[d5].gorev_tr` | Anonsu bir arkadaşına Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 347 | `sesler[m1:38:a1].bolumler[b1].cevapla.situation_tr` | Yaşlı bir kadın soruyor. Hayır de, metroyu öner. | GEÇTİ |
| 348 | `sesler[m1:38:a1].bolumler[b1].cevapla.why_tr` | Kibarca öneri: **Fahren Sie mit der U-Bahn.** | GEÇTİ |
| 349 | `sesler[m1:38:a1].eylem.q_tr` | Gara gitmek istiyorsun. Ne yapmalısın? | GEÇTİ |
| 350 | `sesler[m1:38:a1].eylem.opts[0]` | Metroya bin. | GEÇTİ |
| 351 | `sesler[m1:38:a1].eylem.opts[1]` | Sekiz numaralı otobüsü bekle. | GEÇTİ |
| 352 | `sesler[m1:38:a1].eylem.opts[2]` | Belediye binasına git. | GEÇTİ |
| 353 | `sesler[m1:38:a1].eylem.why_tr` | Otobüs bugün gara gitmiyor. Anons metroyu söylüyor. | GEÇTİ |
| 354 | `sesler[m1:38:a2].title_tr` | Komşun Frau Brandl'dan mesaj | GEÇTİ |
| 355 | `sesler[m1:38:a2].ortam_tr` | Akşam telefonuna alt kattaki komşun Frau Brandl'dan bir mesaj geliyor. | GEÇTİ |
| 356 | `sesler[m1:38:a2].bolumler[b1].ana_fikir.q_tr` | Frau Brandl neden arıyor? | GEÇTİ |
| 357 | `sesler[m1:38:a2].bolumler[b1].ana_fikir.opts[0]` | Hafta sonu kızına gidiyor, haber veriyor | GEÇTİ |
| 358 | `sesler[m1:38:a2].bolumler[b1].ana_fikir.opts[1]` | Seni kahveye çağırıyor | GEÇTİ |
| 359 | `sesler[m1:38:a2].bolumler[b1].ana_fikir.opts[2]` | Evinde bir sorun var | GEÇTİ |
| 360 | `sesler[m1:38:a2].bolumler[b1].ayrinti[0].q_tr` | Frau Brandl ne zamana kadar yok? | GEÇTİ |
| 361 | `sesler[m1:38:a2].bolumler[b1].ayrinti[0].opts[0]` | pazartesiye kadar | GEÇTİ |
| 362 | `sesler[m1:38:a2].bolumler[b1].ayrinti[0].opts[1]` | cumaya kadar | GEÇTİ |
| 363 | `sesler[m1:38:a2].bolumler[b1].ayrinti[0].opts[2]` | pazara kadar | GEÇTİ |
| 364 | `sesler[m1:38:a2].bolumler[b1].ayrinti[1].q_tr` | Kime haber vermelisin? | GEÇTİ |
| 365 | `sesler[m1:38:a2].bolumler[b1].ayrinti[1].opts[0]` | apartman görevlisine | GEÇTİ |
| 366 | `sesler[m1:38:a2].bolumler[b1].ayrinti[1].opts[1]` | kızına | GEÇTİ |
| 367 | `sesler[m1:38:a2].bolumler[b1].ayrinti[1].opts[2]` | Tobi'ye | GEÇTİ |
| 368 | `sesler[m1:38:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 369 | `sesler[m1:38:a2].bolumler[b1].dikte[d5].gorev_tr` | Frau Brandl'ın mesajını Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 370 | `sesler[m1:38:a2].bolumler[b1].cevapla.situation_tr` | Pazartesi Frau Brandl dönüyor. Onu karşıla ve hafta sonunu sor. | GEÇTİ |
| 371 | `sesler[m1:38:a2].bolumler[b1].cevapla.why_tr` | Dönen birini **Willkommen zurück!** ile karşılarsın. | GEÇTİ |
| 372 | `sesler[m1:38:a2].eylem.q_tr` | Frau Brandl'ın mesajından sonra ne yapmalısın? | GEÇTİ |
| 373 | `sesler[m1:38:a2].eylem.opts[0]` | Apartman görevlisine haber ver. | GEÇTİ |
| 374 | `sesler[m1:38:a2].eylem.opts[1]` | Cuma günü Frau Brandl'ı gara götür. | GEÇTİ |
| 375 | `sesler[m1:38:a2].eylem.opts[2]` | Pazartesi Frau Brandl'ın kızını ara. | GEÇTİ |
| 376 | `sesler[m1:38:a2].eylem.why_tr` | Frau Brandl apartman görevlisine haber vermeni istiyor. | GEÇTİ |
| 377 | `prova.title_tr` | Tobi soruyor: evde mi kaldın? | GEÇTİ |
| 378 | `prova.durum_tr` | Mola. Tobi hafta sonunu soruyor. Nereye ve neyle gittiğini geçmişte anlat. | GEÇTİ |
| 379 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Doğru! Gitmekte **bin** gelir: **bin … gefahren**. | **GERİ** (sembol: `…`) |
| 380 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Çok iyi. Kalmak da **bin** ister: **bin … geblieben**. | **GERİ** (sembol: `…`) |
| 381 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Gitmekte **habe** değil **bin** kullanırsın: **Ich bin gegangen.** | GEÇTİ |
| 382 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Harika! **umsteigen** geçmişte **bin … umgestiegen** olur. | **GERİ** (sembol: `…`) |
| 383 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Doğru. **mit dem Fahrrad** bisikletle demek. | GEÇTİ |
| 384 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Aktarma da bir yerden bir yere gitmek. **Ich bin umgestiegen** de. | GEÇTİ |
| 385 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Çok iyi! Yürüyerek gittiysen **gegangen**. | GEÇTİ |
| 386 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Doğru. Okumak gitmek değil, bu yüzden **habe … gelesen**. | **GERİ** (sembol: `…`) |
| 387 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Kalmak **bin** ister: **Ich bin zu Hause geblieben.** | GEÇTİ |
| 388 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Komik ve doğru. **abbiegen** geçmişte **bin … abgebogen**. | **GERİ** (sembol: `…`) |
| 389 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Saat başta, **gekommen** en sonda. Tam doğru. | GEÇTİ |
| 390 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Bu şimdi. Geçmiş için **Ich bin nach Hause gekommen** de. | GEÇTİ |
| 391 | `prova.kapanis_tr` | Gitmeyi ve gelmeyi geçmişte anlattın: **bin gefahren**, **bin geblieben**, **bin gekommen**. | GEÇTİ |
| 392 | `okuma_yazma.title_tr` | Münih'te duraktaki duyuru | GEÇTİ |
| 393 | `okuma_yazma.sorular[m1:38:o1].q_tr` | Bu duyuru ne hakkında? | GEÇTİ |
| 394 | `okuma_yazma.sorular[m1:38:o1].opts[0]` | Hafta sonu tramvay gara gitmiyor | GEÇTİ |
| 395 | `okuma_yazma.sorular[m1:38:o1].opts[1]` | Tramvay artık ücretsiz | GEÇTİ |
| 396 | `okuma_yazma.sorular[m1:38:o1].opts[2]` | Durak taşındı | GEÇTİ |
| 397 | `okuma_yazma.sorular[m1:38:o2].q_tr` | Nerede aktarma yapmalısın? | GEÇTİ |
| 398 | `okuma_yazma.sorular[m1:38:o2].opts[0]` | belediye binasının orada | GEÇTİ |
| 399 | `okuma_yazma.sorular[m1:38:o2].opts[1]` | garda | GEÇTİ |
| 400 | `okuma_yazma.sorular[m1:38:o2].opts[2]` | kursta | GEÇTİ |
| 401 | `okuma_yazma.sorular[m1:38:o3].q_tr` | Otobüs için ikinci bir bilet lazım mı? | GEÇTİ |
| 402 | `okuma_yazma.sorular[m1:38:o3].opts[0]` | Hayır | GEÇTİ |
| 403 | `okuma_yazma.sorular[m1:38:o3].opts[1]` | Evet | GEÇTİ |
| 404 | `okuma_yazma.sorular[m1:38:o3].opts[2]` | Sadece pazar günü | GEÇTİ |
| 405 | `okuma_yazma.sorular[m1:38:o4].situation_tr` | Bir turist soruyor. Duyuruya göre cevap ver. | GEÇTİ |
| 406 | `okuma_yazma.sorular[m1:38:o4].why_tr` | **umsteigen** aktarma yapmak demek. | GEÇTİ |
| 407 | `okuma_yazma.yazma.gorev_tr` | Hafta sonunu üç kısa cümleyle yaz: nereye gittin, neyle gittin, orada ne yaptın? | GEÇTİ |
| 408 | `okuma_yazma.yazma.kontrol_tr[0]` | Üç cümle yazdın mı? | GEÇTİ |
| 409 | `okuma_yazma.yazma.kontrol_tr[1]` | Gitmek için **bin … gefahren** ya da **bin … gegangen** var mı? | **GERİ** (sembol: `…`) |
| 410 | `okuma_yazma.yazma.kontrol_tr[2]` | Her cümlede son kelime geçmiş biçimi mi? | GEÇTİ |
| 411 | `gun_sinavi.maddeler[m1:38:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 412 | `gun_sinavi.maddeler[m1:38:s1].why_tr` | Kalmakta **sind … geblieben** gelir. | **GERİ** (sembol: `…`) |
| 413 | `gun_sinavi.maddeler[m1:38:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 414 | `gun_sinavi.maddeler[m1:38:s2].why_tr` | **kommen** geçmişte **ist gekommen** olur. | GEÇTİ |
| 415 | `gun_sinavi.maddeler[m1:38:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 416 | `gun_sinavi.maddeler[m1:38:s3].why_tr` | **schon weg** çoktan gitti demek. | GEÇTİ |
| 417 | `gun_sinavi.maddeler[m1:38:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 418 | `gun_sinavi.maddeler[m1:38:s4].why_tr` | **gehen** geçmişte **bin gegangen** olur. | GEÇTİ |
| 419 | `gun_sinavi.maddeler[m1:38:s5].why_tr` | Araçla gitmek **fahren**, geçmişte **bin … gefahren**. | **GERİ** (sembol: `…`) |
| 420 | `gun_sinavi.maddeler[m1:38:s6].why_tr` | **umsteigen** geçmişte **bin … umgestiegen** olur. | **GERİ** (sembol: `…`) |
| 421 | `gun_sinavi.maddeler[m1:38:s7].why_tr` | Kalmak da **bin** ister. | GEÇTİ |
| 422 | `gun_sinavi.maddeler[m1:38:s8].why_tr` | **abbiegen** geçmişte **sind … abgebogen** olur. | **GERİ** (sembol: `…`) |
| 423 | `gun_sinavi.maddeler[m1:38:s9].situation_tr` | Sokakta biri yol soruyor. Sen de buranın yabancısısın. | GEÇTİ |
| 424 | `gun_sinavi.maddeler[m1:38:s9].why_tr` | Yolu bilmiyorsan **Ich bin hier fremd.** dersin. | GEÇTİ |
| 425 | `gun_sinavi.maddeler[m1:38:s10].situation_tr` | Tobi soruyor. Bisikletle geldin. | GEÇTİ |
| 426 | `gun_sinavi.maddeler[m1:38:s10].why_tr` | Geçmişte gelmek: **Ich bin … gekommen.** | **GERİ** (sembol: `…`) |
| 427 | `gun_sinavi.maddeler[m1:38:s11].situation_tr` | Derya hafta sonunu soruyor. Nereye ve neyle gittiğini söyle. | GEÇTİ |
| 428 | `gun_sinavi.maddeler[m1:38:s11].why_tr` | Nereye ve neyle: **Ich bin mit dem Bus in die Stadt gefahren.** | GEÇTİ |

### `content/v2/m1/gun-39.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 429 | `title_tr` | Eskiden nasıldı: Ich war, ich hatte | GEÇTİ |
| 430 | `goal_tr` | Bozuk kaloriferli hafta sonunu anlatır, Frau Brandl'dan eski Wendlfing'i dinler, yılları söylersin. | GEÇTİ |
| 431 | `can_do.tr` | Nasıl olduğunu, neyim olduğunu ve bir yılı söylerim. | **GERİ** (anlaşılmıyor: neyim olduğunu iki türlü okunuyor) |
| 432 | `halkalar[m1:39:h1].title_tr` | Hafta sonu evde: kalorifer bozuktu | GEÇTİ |
| 433 | `halkalar[m1:39:h1].sahne.ortam_tr` | Perşembe sabahı mola. Tobi kahvesini alıp yanına oturuyor. | GEÇTİ |
| 434 | `halkalar[m1:39:h1].sahne.soru.q_tr` | Hafta sonu ne çalışmadı? | GEÇTİ |
| 435 | `halkalar[m1:39:h1].sahne.soru.opts[0]` | Kalorifer | GEÇTİ |
| 436 | `halkalar[m1:39:h1].sahne.soru.opts[1]` | Telefon | GEÇTİ |
| 437 | `halkalar[m1:39:h1].sahne.soru.opts[2]` | Otobüs | GEÇTİ |
| 438 | `halkalar[m1:39:h1].sahne.soru.opts[3]` | Kahve makinesi | GEÇTİ |
| 439 | `halkalar[m1:39:h2].title_tr` | Frau Brandl anlatıyor: eskiden burada bir okul vardı | GEÇTİ |
| 440 | `halkalar[m1:39:h2].sahne.ortam_tr` | Akşam merdivende. Frau Brandl pencereden sokağa bakıyor. | GEÇTİ |
| 441 | `halkalar[m1:39:h2].sahne.soru.q_tr` | Eskiden burada ne vardı? | GEÇTİ |
| 442 | `halkalar[m1:39:h2].sahne.soru.opts[0]` | Bir okul | GEÇTİ |
| 443 | `halkalar[m1:39:h2].sahne.soru.opts[1]` | Bir fırın | GEÇTİ |
| 444 | `halkalar[m1:39:h2].sahne.soru.opts[2]` | Bir otopark | GEÇTİ |
| 445 | `halkalar[m1:39:h2].sahne.soru.opts[3]` | Bir eczane | GEÇTİ |
| 446 | `sahne.title_tr` | Merdivende: kalorifer yine çalışıyor | GEÇTİ |
| 447 | `sahne.sahneler[s1].sahne_tr` | Perşembe akşamı merdiven. Frau Brandl elinde bir fincanla kapısında duruyor. | GEÇTİ |
| 448 | `sahne.sahneler[s2].sahne_tr` | Herr Pichler alet çantasıyla bodrumdan çıkıyor. | GEÇTİ |
| 449 | `sahne.sahneler[s3].sahne_tr` | Frau Brandl ellerini ovuşturuyor. | GEÇTİ |
| 450 | `sahne.sahneler[s4].sahne_tr` | Herr Pichler duvardaki kaloriferi gösteriyor. | GEÇTİ |
| 451 | `sahne.sahneler[s5].sahne_tr` | Frau Brandl gülüyor. | GEÇTİ |
| 452 | `sahne.sahneler[s6].sahne_tr` | Frau Brandl eski günleri düşünüyor. | GEÇTİ |
| 453 | `sahne.sahneler[s7].sahne_tr` | Herr Pichler şaşırıyor. | GEÇTİ |
| 454 | `sahne.sahneler[s8].sahne_tr` | Frau Brandl mutfak kapısını gösteriyor. | GEÇTİ |
| 455 | `sahne.sahneler[s9].sahne_tr` | Herr Pichler el sallayıp gidiyor. | GEÇTİ |
| 456 | `sahne.sahneler[s10].sahne_tr` | Frau Brandl sana dönüyor. | GEÇTİ |
| 457 | `sahne.bolumler[b1].ana_fikir.q_tr` | Ne konuşuyorlar? | GEÇTİ |
| 458 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Kaloriferi ve eskiden evin nasıl olduğunu | GEÇTİ |
| 459 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir daireyi | GEÇTİ |
| 460 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Frau Brandl'ın doğum gününü | GEÇTİ |
| 461 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Herr Pichler'e göre ev nasıl? | GEÇTİ |
| 462 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | eski | GEÇTİ |
| 463 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | yeni | GEÇTİ |
| 464 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | küçük | GEÇTİ |
| 465 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Eskiden kışın herkes neredeydi? | GEÇTİ |
| 466 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | mutfakta | GEÇTİ |
| 467 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | bahçede | GEÇTİ |
| 468 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | okulda | GEÇTİ |
| 469 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi yılı duydun? | GEÇTİ |
| 470 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Frau Brandl eskiden kışın nasıl yaşıyordu? Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 471 | `sahne.bolumler[b1].cevapla.situation_tr` | Frau Brandl soruyor. Hafta sonu odan sıcak değildi. Söyle. | GEÇTİ |
| 472 | `sahne.bolumler[b1].cevapla.why_tr` | Geçmiş için **war** dersin: **Es war nicht warm.** | GEÇTİ |
| 473 | `sesler[m1:39:a1].title_tr` | Apartman görevlisinden sesli mesaj | GEÇTİ |
| 474 | `sesler[m1:39:a1].ortam_tr` | Akşam eve geliyorsun. Telefonunda Herr Pichler'den bir mesaj var. | GEÇTİ |
| 475 | `sesler[m1:39:a1].bolumler[b1].ana_fikir.q_tr` | Herr Pichler neden arıyor? | GEÇTİ |
| 476 | `sesler[m1:39:a1].bolumler[b1].ana_fikir.opts[0]` | Yarın saat dokuzda yine geliyor | GEÇTİ |
| 477 | `sesler[m1:39:a1].bolumler[b1].ana_fikir.opts[1]` | Kirayı soruyor | GEÇTİ |
| 478 | `sesler[m1:39:a1].bolumler[b1].ana_fikir.opts[2]` | Seni kahveye çağırıyor | GEÇTİ |
| 479 | `sesler[m1:39:a1].bolumler[b1].ayrinti[0].q_tr` | Bugün neden içeri giremedi? | GEÇTİ |
| 480 | `sesler[m1:39:a1].bolumler[b1].ayrinti[0].opts[0]` | Kapı kapalıydı | GEÇTİ |
| 481 | `sesler[m1:39:a1].bolumler[b1].ayrinti[0].opts[1]` | Anahtarı yoktu | GEÇTİ |
| 482 | `sesler[m1:39:a1].bolumler[b1].ayrinti[0].opts[2]` | Hastaydı | GEÇTİ |
| 483 | `sesler[m1:39:a1].bolumler[b1].ayrinti[1].q_tr` | Neyi tamir edecek? | GEÇTİ |
| 484 | `sesler[m1:39:a1].bolumler[b1].ayrinti[1].opts[0]` | banyodaki lambayı | GEÇTİ |
| 485 | `sesler[m1:39:a1].bolumler[b1].ayrinti[1].opts[1]` | mutfaktaki lambayı | GEÇTİ |
| 486 | `sesler[m1:39:a1].bolumler[b1].ayrinti[1].opts[2]` | kapıyı | GEÇTİ |
| 487 | `sesler[m1:39:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 488 | `sesler[m1:39:a1].bolumler[b1].dikte[d5].gorev_tr` | Mesajı Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 489 | `sesler[m1:39:a1].bolumler[b1].cevapla.situation_tr` | Herr Pichler'i geri arıyorsun. Yarın saat dokuzda evdesin. | GEÇTİ |
| 490 | `sesler[m1:39:a1].bolumler[b1].cevapla.why_tr` | Kısa ve net: **Ja, ich bin um neun Uhr zu Hause.** | GEÇTİ |
| 491 | `sesler[m1:39:a1].eylem.q_tr` | Mesajdan sonra ne yapmalısın? | GEÇTİ |
| 492 | `sesler[m1:39:a1].eylem.opts[0]` | Yarın saat dokuzda evde ol. | GEÇTİ |
| 493 | `sesler[m1:39:a1].eylem.opts[1]` | Bugün saat onda evde ol. | GEÇTİ |
| 494 | `sesler[m1:39:a1].eylem.opts[2]` | Lambayı kendin tamir et. | GEÇTİ |
| 495 | `sesler[m1:39:a1].eylem.why_tr` | Herr Pichler yarın saat dokuzda geliyor. | GEÇTİ |
| 496 | `sesler[m1:39:a2].title_tr` | Yerel radyo: Wendlfing eskiden | GEÇTİ |
| 497 | `sesler[m1:39:a2].ortam_tr` | Sabah kahvaltıda yerel radyoyu dinliyorsun. | GEÇTİ |
| 498 | `sesler[m1:39:a2].bolumler[b1].ana_fikir.q_tr` | Radyo ne anlatıyor? | GEÇTİ |
| 499 | `sesler[m1:39:a2].bolumler[b1].ana_fikir.opts[0]` | Wendlfing'in eskiden nasıl olduğunu | GEÇTİ |
| 500 | `sesler[m1:39:a2].bolumler[b1].ana_fikir.opts[1]` | Bugünkü hava durumunu | GEÇTİ |
| 501 | `sesler[m1:39:a2].bolumler[b1].ana_fikir.opts[2]` | Yeni bir otobüs hattını | GEÇTİ |
| 502 | `sesler[m1:39:a2].bolumler[b1].ayrinti[0].q_tr` | İnsanlar eskiden şehre neyle gidiyordu? | GEÇTİ |
| 503 | `sesler[m1:39:a2].bolumler[b1].ayrinti[0].opts[0]` | otobüsle | GEÇTİ |
| 504 | `sesler[m1:39:a2].bolumler[b1].ayrinti[0].opts[1]` | arabayla | GEÇTİ |
| 505 | `sesler[m1:39:a2].bolumler[b1].ayrinti[0].opts[2]` | bisikletle | GEÇTİ |
| 506 | `sesler[m1:39:a2].bolumler[b1].ayrinti[1].q_tr` | Bugün neyle gidiyorlar? | GEÇTİ |
| 507 | `sesler[m1:39:a2].bolumler[b1].ayrinti[1].opts[0]` | arabayla | GEÇTİ |
| 508 | `sesler[m1:39:a2].bolumler[b1].ayrinti[1].opts[1]` | otobüsle | GEÇTİ |
| 509 | `sesler[m1:39:a2].bolumler[b1].ayrinti[1].opts[2]` | yürüyerek | GEÇTİ |
| 510 | `sesler[m1:39:a2].bolumler[b1].dikte[d1].q_tr` | Hangi yılı duydun? | GEÇTİ |
| 511 | `sesler[m1:39:a2].bolumler[b1].dikte[d5].gorev_tr` | Radyodan duyduğunu Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 512 | `sesler[m1:39:a2].bolumler[b1].cevapla.situation_tr` | Tobi soruyor: Gar ne zaman yeniydi? 1985'te. | GEÇTİ |
| 513 | `sesler[m1:39:a2].bolumler[b1].cevapla.why_tr` | Yıl söylerken **in** kullanmazsın: **1985** ya da **im Jahr 1985**. | GEÇTİ |
| 514 | `sesler[m1:39:a2].eylem.q_tr` | Derya soruyor: İnsanlar eskiden şehre neyle gidiyordu? Ne dersin? | GEÇTİ |
| 515 | `sesler[m1:39:a2].eylem.opts[0]` | Otobüsle. | GEÇTİ |
| 516 | `sesler[m1:39:a2].eylem.opts[1]` | Arabayla. | GEÇTİ |
| 517 | `sesler[m1:39:a2].eylem.opts[2]` | Trenle. | GEÇTİ |
| 518 | `sesler[m1:39:a2].eylem.why_tr` | Radyo, insanların eskiden otobüsle gittiğini söylüyor. | GEÇTİ |
| 519 | `prova.title_tr` | Frau Brandl hafta sonunu soruyor | GEÇTİ |
| 520 | `prova.durum_tr` | Merdivende Frau Brandl ile karşılaşıyorsun. Hafta sonunun nasıl geçtiğini anlat: ne vardı, ne yoktu. | GEÇTİ |
| 521 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Doğru! Geçmiş için **war** dedin. | GEÇTİ |
| 522 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Çok iyi. **hatten** ile onların neyi olduğunu söyledin. | GEÇTİ |
| 523 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Kalorifer artık çalışıyor. Hafta sonu için **war** de: **Die Heizung war kaputt.** | GEÇTİ |
| 524 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Tam doğru. **ich hatte** benim vardı demek. | GEÇTİ |
| 525 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Güzel. **war** ile bir sorun daha anlattın. | GEÇTİ |
| 526 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Bu şimdi. Hafta sonu için **ich hatte** de. | GEÇTİ |
| 527 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Güzel. **Ich war müde** yorgundum demek. | GEÇTİ |
| 528 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Doğru. **Sie hat vier Stunden gedauert** dört saat sürdü demek. | GEÇTİ |
| 529 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Frau Brandl süreyi soruyor. **Sie hat vier Stunden gedauert** de. | GEÇTİ |
| 530 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Çok iyi! Yılı doğru söyledin: **neunzehnhundertsiebzig**. | GEÇTİ |
| 531 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Güzel bir soru. **war** ile geçmişi sordun. | GEÇTİ |
| 532 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | 1970 geçmişte kaldı. **ist** değil, **war** de. | GEÇTİ |
| 533 | `prova.kapanis_tr` | Geçmişi anlattın: **war**, **hatte**, **gedauert** ve bir yıl. | GEÇTİ |
| 534 | `okuma_yazma.title_tr` | Apartman panosunda bir not | GEÇTİ |
| 535 | `okuma_yazma.sorular[m1:39:o1].q_tr` | Bu not ne hakkında? | GEÇTİ |
| 536 | `okuma_yazma.sorular[m1:39:o1].opts[0]` | Kalorifer ve çamaşır makinesi | GEÇTİ |
| 537 | `okuma_yazma.sorular[m1:39:o1].opts[1]` | Yeni komşular | GEÇTİ |
| 538 | `okuma_yazma.sorular[m1:39:o1].opts[2]` | Kira | GEÇTİ |
| 539 | `okuma_yazma.sorular[m1:39:o2].q_tr` | Kalorifer şimdi nasıl? | GEÇTİ |
| 540 | `okuma_yazma.sorular[m1:39:o2].opts[0]` | Yine çalışıyor | GEÇTİ |
| 541 | `okuma_yazma.sorular[m1:39:o2].opts[1]` | Hâlâ bozuk | GEÇTİ |
| 542 | `okuma_yazma.sorular[m1:39:o2].opts[2]` | Pazartesi tamir edilecek | GEÇTİ |
| 543 | `okuma_yazma.sorular[m1:39:o3].q_tr` | Teknisyen ne zaman geliyor? | GEÇTİ |
| 544 | `okuma_yazma.sorular[m1:39:o3].opts[0]` | Pazartesi saat onda | GEÇTİ |
| 545 | `okuma_yazma.sorular[m1:39:o3].opts[1]` | Pazar saat onda | GEÇTİ |
| 546 | `okuma_yazma.sorular[m1:39:o3].opts[2]` | Cumartesi saat onda | GEÇTİ |
| 547 | `okuma_yazma.sorular[m1:39:o4].situation_tr` | Bir komşu soruyor. Nota göre cevap ver. | GEÇTİ |
| 548 | `okuma_yazma.sorular[m1:39:o4].why_tr` | Nottaki cümleyi kullan: **Am Montag kommt ein Techniker.** | GEÇTİ |
| 549 | `okuma_yazma.yazma.gorev_tr` | Komşuna kısa bir mesaj yaz: hafta sonu ne bozuktu, neyin yoktu? | GEÇTİ |
| 550 | `okuma_yazma.yazma.kontrol_tr[0]` | İki cümle yazdın mı? | GEÇTİ |
| 551 | `okuma_yazma.yazma.kontrol_tr[1]` | Bir cümlede **war** var mı? | GEÇTİ |
| 552 | `okuma_yazma.yazma.kontrol_tr[2]` | Bir cümlede **hatte** var mı? | GEÇTİ |
| 553 | `gun_sinavi.maddeler[m1:39:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 554 | `gun_sinavi.maddeler[m1:39:s1].why_tr` | **war** -dı demek: **war kaputt**, bozuktu. | GEÇTİ |
| 555 | `gun_sinavi.maddeler[m1:39:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 556 | `gun_sinavi.maddeler[m1:39:s2].why_tr` | **du** ile **hattest** olur. | GEÇTİ |
| 557 | `gun_sinavi.maddeler[m1:39:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 558 | `gun_sinavi.maddeler[m1:39:s3].why_tr` | **war** -dı demek: **war spät**, geç kaldı. | GEÇTİ |
| 559 | `gun_sinavi.maddeler[m1:39:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 560 | `gun_sinavi.maddeler[m1:39:s4].why_tr` | **gedauert** sürdü demek: **Das hat lange gedauert.** | GEÇTİ |
| 561 | `gun_sinavi.maddeler[m1:39:s5].why_tr` | Yorgundum: **ich war müde**. | GEÇTİ |
| 562 | `gun_sinavi.maddeler[m1:39:s6].why_tr` | Vaktim yoktu: **ich hatte keine Zeit**. | GEÇTİ |
| 563 | `gun_sinavi.maddeler[m1:39:s7].why_tr` | **funktionieren** geçmişte **hat funktioniert** olur. | GEÇTİ |
| 564 | `gun_sinavi.maddeler[m1:39:s8].why_tr` | Yılın önüne tek başına **in** gelmez: **1999 war die Schule neu.** | GEÇTİ |
| 565 | `gun_sinavi.maddeler[m1:39:s9].situation_tr` | Tobi soruyor: Pazartesi neden yorgundun? Komşular çok gürültülüydü. | GEÇTİ |
| 566 | `gun_sinavi.maddeler[m1:39:s9].why_tr` | Birden çok kişi için **waren** dersin: **Die Nachbarn waren laut.** | GEÇTİ |
| 567 | `gun_sinavi.maddeler[m1:39:s10].situation_tr` | Otobüste bir kadın soruyor. Yanındaki yer boş. | GEÇTİ |
| 568 | `gun_sinavi.maddeler[m1:39:s10].why_tr` | Yer boşsa **Ja, hier ist noch Platz.** dersin. | GEÇTİ |
| 569 | `gun_sinavi.maddeler[m1:39:s11].situation_tr` | Frau Brandl soruyor: hafta sonun nasıldı? İki şey söyle: ne bozuktu, neyin yoktu. | GEÇTİ |
| 570 | `gun_sinavi.maddeler[m1:39:s11].why_tr` | Bir cümlede **war**, ötekinde **hatte**: ikisi de geçmiş. | GEÇTİ |

### `content/v2/m1/gun-40.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 571 | `title_tr` | İki kelimeden bir kelime: Hausarzt | GEÇTİ |
| 572 | `goal_tr` | Hafta sonu hava durumunu dinler, aile hekimini arar, uzun kelimeleri parçalarına ayırırsın. | GEÇTİ |
| 573 | `can_do.tr` | Birleşik kelimeyi parçalarından anlar, havayı söylerim. | **GERİ** (terim: birleşik kelime öğretilmedi; iki fikir) |
| 574 | `halkalar[m1:40:h1].title_tr` | Aile hekimini aramak: sigorta kartı ve telefon | GEÇTİ |
| 575 | `halkalar[m1:40:h1].sahne.ortam_tr` | Cuma öğlesi. Aile hekiminin muayenehanesini arıyorsun. Frau Huber açıyor. | GEÇTİ |
| 576 | `halkalar[m1:40:h1].sahne.soru.q_tr` | Frau Huber ne getirmeni istiyor? | GEÇTİ |
| 577 | `halkalar[m1:40:h1].sahne.soru.opts[0]` | Sigorta kartını | GEÇTİ |
| 578 | `halkalar[m1:40:h1].sahne.soru.opts[1]` | Kimliğini | GEÇTİ |
| 579 | `halkalar[m1:40:h1].sahne.soru.opts[2]` | Telefonunu | GEÇTİ |
| 580 | `halkalar[m1:40:h1].sahne.soru.opts[3]` | Bir fotoğraf | GEÇTİ |
| 581 | `halkalar[m1:40:h2].title_tr` | Molada: fotoğraf ve hava | GEÇTİ |
| 582 | `halkalar[m1:40:h2].sahne.ortam_tr` | Mola. Derya telefonundaki bir fotoğrafı gösteriyor. | GEÇTİ |
| 583 | `halkalar[m1:40:h2].sahne.soru.q_tr` | Pazar günü hava nasıldı? | GEÇTİ |
| 584 | `halkalar[m1:40:h2].sahne.soru.opts[0]` | Güzel, yirmi derece | GEÇTİ |
| 585 | `halkalar[m1:40:h2].sahne.soru.opts[1]` | Yağmurlu | GEÇTİ |
| 586 | `halkalar[m1:40:h2].sahne.soru.opts[2]` | Çok soğuk | GEÇTİ |
| 587 | `halkalar[m1:40:h2].sahne.soru.opts[3]` | Rüzgârlı | GEÇTİ |
| 588 | `sahne.title_tr` | Cuma sabahı: hava durumu ve uzun kelimeler | GEÇTİ |
| 589 | `sahne.sahneler[s1].sahne_tr` | Cuma sabahı firmanın mutfağı. Radyo çalıyor. Tobi kahve koyuyor, arada öksürüyor. | GEÇTİ |
| 590 | `sahne.sahneler[s2].sahne_tr` | Derya pencereden dışarı bakıyor. | GEÇTİ |
| 591 | `sahne.sahneler[s3].sahne_tr` | Tobi omuz silkiyor. | GEÇTİ |
| 592 | `sahne.sahneler[s4].sahne_tr` | Derya sana dönüyor. | GEÇTİ |
| 593 | `sahne.sahneler[s5].sahne_tr` | Tobi parmaklarıyla sayıyor. | GEÇTİ |
| 594 | `sahne.sahneler[s6].sahne_tr` | Derya gülüyor. | GEÇTİ |
| 595 | `sahne.sahneler[s7].sahne_tr` | Tobi bir şey daha buluyor. | GEÇTİ |
| 596 | `sahne.sahneler[s8].sahne_tr` | Derya Tobi'ye bir fincan uzatıyor. | GEÇTİ |
| 597 | `sahne.sahneler[s9].sahne_tr` | Tobi sana göz kırpıyor. | GEÇTİ |
| 598 | `sahne.bolumler[b1].ana_fikir.q_tr` | Ne konuşuyorlar? | GEÇTİ |
| 599 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Hava durumunu ve iki parçalı kelimeleri | GEÇTİ |
| 600 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir işi | GEÇTİ |
| 601 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Derya'nın partisini | GEÇTİ |
| 602 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Hafta sonu hava nasıl olacak? | GEÇTİ |
| 603 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | yağmurlu | GEÇTİ |
| 604 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | güneşli | GEÇTİ |
| 605 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | çok sıcak | GEÇTİ |
| 606 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Tobi cumartesi ne yapmak istiyor? | GEÇTİ |
| 607 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | bisiklete binmek | GEÇTİ |
| 608 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | film izlemek | GEÇTİ |
| 609 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | çalışmak | GEÇTİ |
| 610 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 611 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Hafta sonu hava nasıl, bugün nasıl? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 612 | `sahne.bolumler[b1].cevapla.situation_tr` | Tobi sigorta kartını soruyor. Evet, yanında. | GEÇTİ |
| 613 | `sahne.bolumler[b1].cevapla.why_tr` | **Versichertenkarte** iki parça: sigortalı ve kart. | GEÇTİ |
| 614 | `sesler[m1:40:a1].title_tr` | Radyoda hava durumu | GEÇTİ |
| 615 | `sesler[m1:40:a1].ortam_tr` | Sabah firmanın mutfağında radyo çalıyor. Hava durumu başlıyor. | GEÇTİ |
| 616 | `sesler[m1:40:a1].bolumler[b1].ana_fikir.q_tr` | Hafta sonu hava nasıl? | GEÇTİ |
| 617 | `sesler[m1:40:a1].bolumler[b1].ana_fikir.opts[0]` | Kötü | GEÇTİ |
| 618 | `sesler[m1:40:a1].bolumler[b1].ana_fikir.opts[1]` | Güneşli ve sıcak | GEÇTİ |
| 619 | `sesler[m1:40:a1].bolumler[b1].ana_fikir.opts[2]` | Çok güzel | GEÇTİ |
| 620 | `sesler[m1:40:a1].bolumler[b1].ayrinti[0].q_tr` | Bugün hava nasıl? | GEÇTİ |
| 621 | `sesler[m1:40:a1].bolumler[b1].ayrinti[0].opts[0]` | ılık ve güzel | GEÇTİ |
| 622 | `sesler[m1:40:a1].bolumler[b1].ayrinti[0].opts[1]` | kötü | GEÇTİ |
| 623 | `sesler[m1:40:a1].bolumler[b1].ayrinti[0].opts[2]` | çok sıcak | GEÇTİ |
| 624 | `sesler[m1:40:a1].bolumler[b1].ayrinti[1].q_tr` | Pazartesi hava nasıl? | GEÇTİ |
| 625 | `sesler[m1:40:a1].bolumler[b1].ayrinti[1].opts[0]` | yine güzel ama daha serin | GEÇTİ |
| 626 | `sesler[m1:40:a1].bolumler[b1].ayrinti[1].opts[1]` | yine kötü | GEÇTİ |
| 627 | `sesler[m1:40:a1].bolumler[b1].ayrinti[1].opts[2]` | çok sıcak | GEÇTİ |
| 628 | `sesler[m1:40:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 629 | `sesler[m1:40:a1].bolumler[b1].dikte[d5].gorev_tr` | Hava durumunu Tobi'ye Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 630 | `sesler[m1:40:a1].bolumler[b1].cevapla.situation_tr` | Ioana telefonda soruyor. Bugün hava güzel, hafta sonu kötü. | GEÇTİ |
| 631 | `sesler[m1:40:a1].bolumler[b1].cevapla.why_tr` | Hava cümlesi **es** ile kurulur: **Es regnet.** | GEÇTİ |
| 632 | `sesler[m1:40:a1].eylem.q_tr` | Cumartesi dışarıda bir buluşman var. Ne yapmalısın? | GEÇTİ |
| 633 | `sesler[m1:40:a1].eylem.opts[0]` | Yanına şemsiye ve mont al. | GEÇTİ |
| 634 | `sesler[m1:40:a1].eylem.opts[1]` | Şapka ve güneş kremi al. | GEÇTİ |
| 635 | `sesler[m1:40:a1].eylem.opts[2]` | Hiçbir şey alma, hava güzel. | GEÇTİ |
| 636 | `sesler[m1:40:a1].eylem.why_tr` | Radyo cumartesi ve pazar havanın kötü olacağını söylüyor. | GEÇTİ |
| 637 | `sesler[m1:40:a2].title_tr` | Muayenehanenin bekleme anonsu | GEÇTİ |
| 638 | `sesler[m1:40:a2].ortam_tr` | Aile hekimini arıyorsun. Hat meşgul, bir bekleme anonsu çalıyor. | GEÇTİ |
| 639 | `sesler[m1:40:a2].bolumler[b1].ana_fikir.q_tr` | Ne duyuyorsun? | GEÇTİ |
| 640 | `sesler[m1:40:a2].bolumler[b1].ana_fikir.opts[0]` | Muayenehanenin bekleme anonsunu | GEÇTİ |
| 641 | `sesler[m1:40:a2].bolumler[b1].ana_fikir.opts[1]` | Radyoda reklamı | GEÇTİ |
| 642 | `sesler[m1:40:a2].bolumler[b1].ana_fikir.opts[2]` | Bir arkadaşın mesajını | GEÇTİ |
| 643 | `sesler[m1:40:a2].bolumler[b1].ayrinti[0].q_tr` | Muayene saatleri bugün kaça kadar? | GEÇTİ |
| 644 | `sesler[m1:40:a2].bolumler[b1].ayrinti[0].opts[0]` | on altıya kadar | GEÇTİ |
| 645 | `sesler[m1:40:a2].bolumler[b1].ayrinti[0].opts[1]` | on ikiye kadar | GEÇTİ |
| 646 | `sesler[m1:40:a2].bolumler[b1].ayrinti[0].opts[2]` | on sekize kadar | GEÇTİ |
| 647 | `sesler[m1:40:a2].bolumler[b1].ayrinti[1].q_tr` | Ne yapmalısın? | GEÇTİ |
| 648 | `sesler[m1:40:a2].bolumler[b1].ayrinti[1].opts[0]` | biraz beklemelisin | GEÇTİ |
| 649 | `sesler[m1:40:a2].bolumler[b1].ayrinti[1].opts[1]` | sonra tekrar aramalısın | GEÇTİ |
| 650 | `sesler[m1:40:a2].bolumler[b1].ayrinti[1].opts[2]` | mesaj yazmalısın | GEÇTİ |
| 651 | `sesler[m1:40:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 652 | `sesler[m1:40:a2].bolumler[b1].dikte[d5].gorev_tr` | Anonsta ne duydun? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 653 | `sesler[m1:40:a2].bolumler[b1].cevapla.situation_tr` | Sonunda Frau Huber açıyor. Bugün randevun var, sigorta kartını da getiriyorsun. | GEÇTİ |
| 654 | `sesler[m1:40:a2].bolumler[b1].cevapla.why_tr` | Önce randevunu söyle: **Ich habe heute einen Termin.** | GEÇTİ |
| 655 | `sesler[m1:40:a2].eylem.q_tr` | Anonstan sonra ne yapmalısın? | GEÇTİ |
| 656 | `sesler[m1:40:a2].eylem.opts[0]` | Telefonu kapatma, bekle. | GEÇTİ |
| 657 | `sesler[m1:40:a2].eylem.opts[1]` | Telefonu kapat, yarın ara. | GEÇTİ |
| 658 | `sesler[m1:40:a2].eylem.opts[2]` | Muayenehaneye hemen git. | GEÇTİ |
| 659 | `sesler[m1:40:a2].eylem.why_tr` | Anons biraz beklemeni istiyor. | GEÇTİ |
| 660 | `prova.title_tr` | Muayenehaneyi aramak | GEÇTİ |
| 661 | `prova.durum_tr` | Bugün saat üçte aile hekiminde randevun var. Öğleden sonra yağmur başladı, otobüs gelmiyor. Frau Huber'i ara. | GEÇTİ |
| 662 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Çok iyi. Önce adın, sonra randevun. | GEÇTİ |
| 663 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Doğru ve kibar. Adını açıkça söyledin. | GEÇTİ |
| 664 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Muayenehanede adını ve randevunu söyle: **Ich habe heute einen Termin.** | GEÇTİ |
| 665 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Harika. Hem gecikmeyi hem nedenini söyledin. | GEÇTİ |
| 666 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | İyi bir soru. Emin değilsen sormak doğru. | GEÇTİ |
| 667 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Bu kaba ve eksik. Ne istediğini söyle: geç mi kalıyorsun? | GEÇTİ |
| 668 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Kısa ve doğal. | GEÇTİ |
| 669 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Doğru. **mit** en sona gider. | GEÇTİ |
| 670 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Frau Huber sigorta kartını söylüyor. **Ich bringe sie mit** de. | GEÇTİ |
| 671 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Güzel bir kapanış. | GEÇTİ |
| 672 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Tam doğru. | GEÇTİ |
| 673 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Frau Huber kartı getirmeni istiyor. **Ich bringe sie mit** de. | GEÇTİ |
| 674 | `prova.kapanis_tr` | Muayenehaneyi aradın: adını ve randevunu söyledin, **Versichertenkarte** kelimesini kullandın. | GEÇTİ |
| 675 | `okuma_yazma.title_tr` | Muayenehaneden gelen mesaj | GEÇTİ |
| 676 | `okuma_yazma.sorular[m1:40:o1].q_tr` | Mesaj ne hakkında? | GEÇTİ |
| 677 | `okuma_yazma.sorular[m1:40:o1].opts[0]` | Bir randevu hakkında | GEÇTİ |
| 678 | `okuma_yazma.sorular[m1:40:o1].opts[1]` | Bir fatura hakkında | GEÇTİ |
| 679 | `okuma_yazma.sorular[m1:40:o1].opts[2]` | Bir parti hakkında | GEÇTİ |
| 680 | `okuma_yazma.sorular[m1:40:o2].q_tr` | Randevu saat kaçta? | GEÇTİ |
| 681 | `okuma_yazma.sorular[m1:40:o2].opts[0]` | 15'te | GEÇTİ |
| 682 | `okuma_yazma.sorular[m1:40:o2].opts[1]` | 13'te | GEÇTİ |
| 683 | `okuma_yazma.sorular[m1:40:o2].opts[2]` | 16'da | GEÇTİ |
| 684 | `okuma_yazma.sorular[m1:40:o3].q_tr` | Gelemezsen ne yapmalısın? | GEÇTİ |
| 685 | `okuma_yazma.sorular[m1:40:o3].opts[0]` | Muayenehaneyi aramalısın | GEÇTİ |
| 686 | `okuma_yazma.sorular[m1:40:o3].opts[1]` | Mesaj yazmalısın | GEÇTİ |
| 687 | `okuma_yazma.sorular[m1:40:o3].opts[2]` | Hiçbir şey | GEÇTİ |
| 688 | `okuma_yazma.sorular[m1:40:o4].situation_tr` | Derya randevunu soruyor. Mesaja göre cevap ver. | GEÇTİ |
| 689 | `okuma_yazma.sorular[m1:40:o4].why_tr` | Önce gün, sonra saat: **am Freitag um fünfzehn Uhr**. | GEÇTİ |
| 690 | `okuma_yazma.yazma.gorev_tr` | Ioana hava durumunu soruyor. Ona kısa bir mesaj yaz: bugün hava nasıl, hafta sonu nasıl? | GEÇTİ |
| 691 | `okuma_yazma.yazma.kontrol_tr[0]` | **Wetter** kelimesi var mı? | GEÇTİ |
| 692 | `okuma_yazma.yazma.kontrol_tr[1]` | Hava cümlesi **es** ile mi başlıyor? | **GERİ** (yanlış yönlendiriyor: örnek cevap es ile başlamıyor) |
| 693 | `okuma_yazma.yazma.kontrol_tr[2]` | Bugün ve hafta sonu için birer cümle var mı? | GEÇTİ |
| 694 | `gun_sinavi.maddeler[m1:40:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 695 | `gun_sinavi.maddeler[m1:40:s1].why_tr` | Hava cümlesi **es** ister: **regnet es**. | GEÇTİ |
| 696 | `gun_sinavi.maddeler[m1:40:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 697 | `gun_sinavi.maddeler[m1:40:s2].why_tr` | **Versichertenkarte** iki parçalı uzun bir kelime. | GEÇTİ |
| 698 | `gun_sinavi.maddeler[m1:40:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 699 | `gun_sinavi.maddeler[m1:40:s3].why_tr` | Mevsimle **im** gelir: **im Sommer**. | GEÇTİ |
| 700 | `gun_sinavi.maddeler[m1:40:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 701 | `gun_sinavi.maddeler[m1:40:s4].why_tr` | **Nachricht** mesaj demek. | GEÇTİ |
| 702 | `gun_sinavi.maddeler[m1:40:s5].why_tr` | Türkçede **es** yok, Almancada atlanmaz. | GEÇTİ |
| 703 | `gun_sinavi.maddeler[m1:40:s6].why_tr` | Derece için **Es sind** dersin. | GEÇTİ |
| 704 | `gun_sinavi.maddeler[m1:40:s7].why_tr` | **Eine Sekunde** telefonda çok duyulur. | GEÇTİ |
| 705 | `gun_sinavi.maddeler[m1:40:s8].why_tr` | Fotoğrafta: **auf dem Foto**. | GEÇTİ |
| 706 | `gun_sinavi.maddeler[m1:40:s9].situation_tr` | Ioana soruyor. Wendlfing'de bugün yağmur yağıyor. | GEÇTİ |
| 707 | `gun_sinavi.maddeler[m1:40:s9].why_tr` | **Es regnet.** Hava cümlesinde **es** hep var. | GEÇTİ |
| 708 | `gun_sinavi.maddeler[m1:40:s10].situation_tr` | Muayenehanede Frau Huber soruyor. Kartın çantanda, arıyorsun. | GEÇTİ |
| 709 | `gun_sinavi.maddeler[m1:40:s10].why_tr` | Ararken **Eine Sekunde, bitte** dersin. | GEÇTİ |
| 710 | `gun_sinavi.maddeler[m1:40:s11].situation_tr` | Tobi soruyor: bugün hava nasıl, hafta sonu nasıl? İki cümle söyle. | GEÇTİ |
| 711 | `gun_sinavi.maddeler[m1:40:s11].why_tr` | Her cümle **es** ile: **Es ist warm.** **Es regnet.** | GEÇTİ |

### `content/v2/m1/gun-41.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 712 | `title_tr` | Dinlediğini kendi sözlerinle anlatmak | GEÇTİ |
| 713 | `goal_tr` | Tobi'nin sesli mesajını dinler, Derya'ya üç cümleyle anlatırsın. Zamanı **seit**, **vor** ve **für** ile söylersin. | GEÇTİ |
| 714 | `can_do.tr` | Dinlediğim kısa bir hikâyeyi üç cümleyle yeniden anlatırım. | GEÇTİ |
| 715 | `halkalar[m1:41:h1].title_tr` | Tobi soğuk almış: kim, ne oldu, sonra ne oldu? | GEÇTİ |
| 716 | `halkalar[m1:41:h1].sahne.ortam_tr` | Pazartesi sabahı. Derya Tobi'nin masasının boş olduğunu görüyor. | GEÇTİ |
| 717 | `halkalar[m1:41:h1].sahne.soru.q_tr` | Tobi'nin nesi var? | GEÇTİ |
| 718 | `halkalar[m1:41:h1].sahne.soru.opts[0]` | Cumadan beri soğuk almış | GEÇTİ |
| 719 | `halkalar[m1:41:h1].sahne.soru.opts[1]` | Tatilde | GEÇTİ |
| 720 | `halkalar[m1:41:h1].sahne.soru.opts[2]` | Toplantıda | GEÇTİ |
| 721 | `halkalar[m1:41:h1].sahne.soru.opts[3]` | Geç kalıyor | GEÇTİ |
| 722 | `halkalar[m1:41:h2].title_tr` | Derya'ya anlatmak: söz, mutlaka, biraz | GEÇTİ |
| 723 | `halkalar[m1:41:h2].sahne.ortam_tr` | Derya kahvesini alıyor, sen anlatmaya devam ediyorsun. | GEÇTİ |
| 724 | `halkalar[m1:41:h2].sahne.soru.q_tr` | Tobi'nin raporu kaç günlük? | GEÇTİ |
| 725 | `halkalar[m1:41:h2].sahne.soru.opts[0]` | Üç günlük | GEÇTİ |
| 726 | `halkalar[m1:41:h2].sahne.soru.opts[1]` | Bir haftalık | GEÇTİ |
| 727 | `halkalar[m1:41:h2].sahne.soru.opts[2]` | İki günlük | GEÇTİ |
| 728 | `halkalar[m1:41:h2].sahne.soru.opts[3]` | Bir aylık | GEÇTİ |
| 729 | `sahne.title_tr` | Tobi döndü: ne oldu? | GEÇTİ |
| 730 | `sahne.sahneler[s1].sahne_tr` | Perşembe sabahı. Tobi kapıdan giriyor, Derya onu görünce kalkıyor. | GEÇTİ |
| 731 | `sahne.sahneler[s2].sahne_tr` | Tobi atkısını çıkarıyor. | GEÇTİ |
| 732 | `sahne.sahneler[s3].sahne_tr` | Derya merakla bakıyor. | GEÇTİ |
| 733 | `sahne.sahneler[s4].sahne_tr` | Tobi başını sallıyor. | GEÇTİ |
| 734 | `sahne.sahneler[s5].sahne_tr` | Tobi alnına dokunuyor. | GEÇTİ |
| 735 | `sahne.sahneler[s6].sahne_tr` | Derya kaşlarını kaldırıyor. | GEÇTİ |
| 736 | `sahne.sahneler[s7].sahne_tr` | Tobi ellerini açıyor. | GEÇTİ |
| 737 | `sahne.sahneler[s8].sahne_tr` | Tobi yorgun gülümsüyor. | GEÇTİ |
| 738 | `sahne.sahneler[s9].sahne_tr` | Derya parmağını sallıyor. | GEÇTİ |
| 739 | `sahne.sahneler[s10].sahne_tr` | Tobi elini kalbine koyuyor. | GEÇTİ |
| 740 | `sahne.bolumler[b1].ana_fikir.q_tr` | Tobi ne anlatıyor? | GEÇTİ |
| 741 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Nasıl hasta olduğunu ve doktora gittiğini | GEÇTİ |
| 742 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Hafta sonu bir partiye gittiğini | GEÇTİ |
| 743 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Yeni bir ceket aldığını | GEÇTİ |
| 744 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Muayenehanede ne kadar sürdü? | GEÇTİ |
| 745 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | iki saat | GEÇTİ |
| 746 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | yarım saat | GEÇTİ |
| 747 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | üç saat | GEÇTİ |
| 748 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Tobi kaç gün yatakta kaldı? | GEÇTİ |
| 749 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | üç gün | GEÇTİ |
| 750 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | bir gün | GEÇTİ |
| 751 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | bir hafta | GEÇTİ |
| 752 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 753 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Tobi'nin hikâyesini Almanca üç kısa cümleyle anlat: kim, ne oldu, sonra ne oldu? | GEÇTİ |
| 754 | `sahne.bolumler[b1].cevapla.situation_tr` | Herr Wimmer geliyor ve Tobi'ye ne olduğunu soruyor. Ona kısaca anlat. | GEÇTİ |
| 755 | `sahne.bolumler[b1].cevapla.why_tr` | Yeniden anlatırken **ich** yerine **er** dersin: **Er war beim Doktor.** | GEÇTİ |
| 756 | `sesler[m1:41:a1].title_tr` | Tobi'den sesli mesaj | GEÇTİ |
| 757 | `sesler[m1:41:a1].ortam_tr` | Pazar akşamı telefonuna Tobi'den bir mesaj geliyor. Sesi biraz kısık. | GEÇTİ |
| 758 | `sesler[m1:41:a1].bolumler[b1].ana_fikir.q_tr` | Tobi neden arıyor? | GEÇTİ |
| 759 | `sesler[m1:41:a1].bolumler[b1].ana_fikir.opts[0]` | Hasta, çarşambaya kadar işe gelmiyor | GEÇTİ |
| 760 | `sesler[m1:41:a1].bolumler[b1].ana_fikir.opts[1]` | Seni hafta sonu çağırıyor | GEÇTİ |
| 761 | `sesler[m1:41:a1].bolumler[b1].ana_fikir.opts[2]` | Yeni bir iş buldu | GEÇTİ |
| 762 | `sesler[m1:41:a1].bolumler[b1].ayrinti[0].q_tr` | Tobi cuma günü neredeydi? | GEÇTİ |
| 763 | `sesler[m1:41:a1].bolumler[b1].ayrinti[0].opts[0]` | aile hekiminde | GEÇTİ |
| 764 | `sesler[m1:41:a1].bolumler[b1].ayrinti[0].opts[1]` | işte | GEÇTİ |
| 765 | `sesler[m1:41:a1].bolumler[b1].ayrinti[0].opts[2]` | annesinde | GEÇTİ |
| 766 | `sesler[m1:41:a1].bolumler[b1].ayrinti[1].q_tr` | Rapor ne zamana kadar? | GEÇTİ |
| 767 | `sesler[m1:41:a1].bolumler[b1].ayrinti[1].opts[0]` | çarşambaya kadar | GEÇTİ |
| 768 | `sesler[m1:41:a1].bolumler[b1].ayrinti[1].opts[1]` | pazartesiye kadar | GEÇTİ |
| 769 | `sesler[m1:41:a1].bolumler[b1].ayrinti[1].opts[2]` | cumaya kadar | GEÇTİ |
| 770 | `sesler[m1:41:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 771 | `sesler[m1:41:a1].bolumler[b1].dikte[d5].gorev_tr` | Tobi'nin mesajını Derya'ya Almanca üç kısa cümleyle anlat. | GEÇTİ |
| 772 | `sesler[m1:41:a1].bolumler[b1].cevapla.situation_tr` | Pazartesi sabahı Derya soruyor. Tobi'nin mesajını kısaca anlat. | GEÇTİ |
| 773 | `sesler[m1:41:a1].bolumler[b1].cevapla.why_tr` | Tobi **ich** dedi, sen **er** dersin: **Er ist krank.** | GEÇTİ |
| 774 | `sesler[m1:41:a1].eylem.q_tr` | Tobi'nin mesajından sonra ne yapmalısın? | GEÇTİ |
| 775 | `sesler[m1:41:a1].eylem.opts[0]` | Şefe Tobi'nin hasta olduğunu söyle. | GEÇTİ |
| 776 | `sesler[m1:41:a1].eylem.opts[1]` | Tobi'yi doktora götür. | GEÇTİ |
| 777 | `sesler[m1:41:a1].eylem.opts[2]` | Çarşamba Tobi'yi ara. | GEÇTİ |
| 778 | `sesler[m1:41:a1].eylem.why_tr` | Tobi bunu şefe söylemeni istiyor. | GEÇTİ |
| 779 | `sesler[m1:41:a2].title_tr` | Firmada sabah anonsu | GEÇTİ |
| 780 | `sesler[m1:41:a2].ortam_tr` | Pazartesi sabahı Herr Wimmer hoparlörden konuşuyor. | GEÇTİ |
| 781 | `sesler[m1:41:a2].bolumler[b1].ana_fikir.q_tr` | Anons ne hakkında? | GEÇTİ |
| 782 | `sesler[m1:41:a2].bolumler[b1].ana_fikir.opts[0]` | Tobi hasta, işini Derya yapıyor | GEÇTİ |
| 783 | `sesler[m1:41:a2].bolumler[b1].ana_fikir.opts[1]` | Yeni bir iş arkadaşı geliyor | GEÇTİ |
| 784 | `sesler[m1:41:a2].bolumler[b1].ana_fikir.opts[2]` | Ofis kapalı | GEÇTİ |
| 785 | `sesler[m1:41:a2].bolumler[b1].ayrinti[0].q_tr` | Tobi ne zamana kadar gelmiyor? | GEÇTİ |
| 786 | `sesler[m1:41:a2].bolumler[b1].ayrinti[0].opts[0]` | çarşambaya kadar | GEÇTİ |
| 787 | `sesler[m1:41:a2].bolumler[b1].ayrinti[0].opts[1]` | cumaya kadar | GEÇTİ |
| 788 | `sesler[m1:41:a2].bolumler[b1].ayrinti[0].opts[2]` | yarına kadar | GEÇTİ |
| 789 | `sesler[m1:41:a2].bolumler[b1].ayrinti[1].q_tr` | Bir şey açık değilse kime gitmelisin? | **GERİ** (iki türlü okunuyor: açık değil (kapalı / anlaşılmadı)) |
| 790 | `sesler[m1:41:a2].bolumler[b1].ayrinti[1].opts[0]` | Herr Wimmer'e | GEÇTİ |
| 791 | `sesler[m1:41:a2].bolumler[b1].ayrinti[1].opts[1]` | Tobi'ye | GEÇTİ |
| 792 | `sesler[m1:41:a2].bolumler[b1].ayrinti[1].opts[2]` | Frau Huber'e | GEÇTİ |
| 793 | `sesler[m1:41:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 794 | `sesler[m1:41:a2].bolumler[b1].dikte[d5].gorev_tr` | Anonsu Ioana'ya Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 795 | `sesler[m1:41:a2].bolumler[b1].cevapla.situation_tr` | Bir iş arkadaşın Tobi'nin işini soruyor. Bu hafta Derya yapıyor. | GEÇTİ |
| 796 | `sesler[m1:41:a2].bolumler[b1].cevapla.why_tr` | Kim yapıyor sorusuna kişi adıyla başla: **Derya macht das.** | GEÇTİ |
| 797 | `sesler[m1:41:a2].eylem.q_tr` | Tobi'nin işiyle ilgili bir sorun var. Kime sormalısın? | GEÇTİ |
| 798 | `sesler[m1:41:a2].eylem.opts[0]` | Derya'ya | GEÇTİ |
| 799 | `sesler[m1:41:a2].eylem.opts[1]` | Tobi'ye | GEÇTİ |
| 800 | `sesler[m1:41:a2].eylem.opts[2]` | Frau Huber'e | GEÇTİ |
| 801 | `sesler[m1:41:a2].eylem.why_tr` | Bu hafta Tobi'nin işini Derya yapıyor. | GEÇTİ |
| 802 | `prova.title_tr` | Derya'ya Tobi'yi anlatmak | GEÇTİ |
| 803 | `prova.durum_tr` | Tobi'nin sesli mesajını dinledin. Derya soruyor. Ona Tobi'nin hikâyesini kısa cümlelerle anlat. | GEÇTİ |
| 804 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Çok iyi. **seit Freitag** cumadan beri demek. | GEÇTİ |
| 805 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Doğru. **ich** yerine **er** dedin. | GEÇTİ |
| 806 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Hasta olan Tobi. Onu anlatırken **er** dersin: **Er ist krank.** | GEÇTİ |
| 807 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Tam doğru. **er war** o idi demek. | GEÇTİ |
| 808 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Harika. **vor drei Tagen** üç gün önce demek. | GEÇTİ |
| 809 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Doktora giden Tobi. **Er war beim Doktor** de. | GEÇTİ |
| 810 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Çok iyi. Hem bitişi hem dönüşü söyledin. | GEÇTİ |
| 811 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Doğru. Bir süre için **für drei Tage** dersin. | GEÇTİ |
| 812 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | **seit** geçmişten bugüne demek. Gelecek için **für drei Tage** de. | GEÇTİ |
| 813 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | **unbedingt** mutlaka demek. Güzel bir cevap. | GEÇTİ |
| 814 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Doğru ve düşünceli. | GEÇTİ |
| 815 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Bu doğru değil. Tobi hasta, mesajı hatırla. | GEÇTİ |
| 816 | `prova.kapanis_tr` | Dinlediğin hikâyeyi kendi sözlerinle anlattın: kim, ne oldu, sonra ne oldu. **seit**, **vor**, **für** da yerindeydi. | GEÇTİ |
| 817 | `okuma_yazma.title_tr` | Derya'nın ekip mesajı | GEÇTİ |
| 818 | `okuma_yazma.sorular[m1:41:o1].q_tr` | Derya neden yazıyor? | GEÇTİ |
| 819 | `okuma_yazma.sorular[m1:41:o1].opts[0]` | Tobi'nin hasta olduğunu haber vermek için | GEÇTİ |
| 820 | `okuma_yazma.sorular[m1:41:o1].opts[1]` | Bir partiye çağırmak için | GEÇTİ |
| 821 | `okuma_yazma.sorular[m1:41:o1].opts[2]` | Toplantıyı iptal etmek için | GEÇTİ |
| 822 | `okuma_yazma.sorular[m1:41:o2].q_tr` | Rapor kaç günlük? | GEÇTİ |
| 823 | `okuma_yazma.sorular[m1:41:o2].opts[0]` | üç günlük | GEÇTİ |
| 824 | `okuma_yazma.sorular[m1:41:o2].opts[1]` | bir haftalık | GEÇTİ |
| 825 | `okuma_yazma.sorular[m1:41:o2].opts[2]` | iki günlük | GEÇTİ |
| 826 | `okuma_yazma.sorular[m1:41:o3].q_tr` | Tobi ne zaman geri geliyor? | GEÇTİ |
| 827 | `okuma_yazma.sorular[m1:41:o3].opts[0]` | perşembe | GEÇTİ |
| 828 | `okuma_yazma.sorular[m1:41:o3].opts[1]` | çarşamba | GEÇTİ |
| 829 | `okuma_yazma.sorular[m1:41:o3].opts[2]` | cuma | GEÇTİ |
| 830 | `okuma_yazma.sorular[m1:41:o4].situation_tr` | Ioana soruyor. Mesaja göre cevap ver. | GEÇTİ |
| 831 | `okuma_yazma.sorular[m1:41:o4].why_tr` | Mesajdaki gün: **am Donnerstag**. | GEÇTİ |
| 832 | `okuma_yazma.yazma.gorev_tr` | Ioana Tobi'yi soruyor. Tobi'nin hikâyesini üç kısa cümleyle yaz: kim, ne oldu, sonra ne oldu? | GEÇTİ |
| 833 | `okuma_yazma.yazma.kontrol_tr[0]` | Üç cümle yazdın mı? | GEÇTİ |
| 834 | `okuma_yazma.yazma.kontrol_tr[1]` | Tobi için **er** kullandın mı? | GEÇTİ |
| 835 | `okuma_yazma.yazma.kontrol_tr[2]` | **seit**, **vor** ya da **für** var mı? | GEÇTİ |
| 836 | `gun_sinavi.maddeler[m1:41:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 837 | `gun_sinavi.maddeler[m1:41:s1].why_tr` | **seit einer Woche** bir haftadır demek. | GEÇTİ |
| 838 | `gun_sinavi.maddeler[m1:41:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 839 | `gun_sinavi.maddeler[m1:41:s2].why_tr` | **vor einem Monat** bir ay önce demek. | GEÇTİ |
| 840 | `gun_sinavi.maddeler[m1:41:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 841 | `gun_sinavi.maddeler[m1:41:s3].why_tr` | **dringend** acil demek. | GEÇTİ |
| 842 | `gun_sinavi.maddeler[m1:41:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 843 | `gun_sinavi.maddeler[m1:41:s4].why_tr` | **ein bisschen** biraz demek. | GEÇTİ |
| 844 | `gun_sinavi.maddeler[m1:41:s5].why_tr` | Hâlâ sürüyorsa **seit** dersin. Fiil bugünkü biçimde kalır: **ich wohne**. | GEÇTİ |
| 845 | `gun_sinavi.maddeler[m1:41:s6].why_tr` | Önce demek için **vor** başa gelir: **vor zwei Tagen**. | GEÇTİ |
| 846 | `gun_sinavi.maddeler[m1:41:s7].why_tr` | Bir süreliğine: **für eine Woche**. | GEÇTİ |
| 847 | `gun_sinavi.maddeler[m1:41:s8].why_tr` | **ein bisschen** biraz demek. | GEÇTİ |
| 848 | `gun_sinavi.maddeler[m1:41:s9].situation_tr` | Yeni bir iş arkadaşın soruyor: birbirimize sen diyelim mi? Evet de. | GEÇTİ |
| 849 | `gun_sinavi.maddeler[m1:41:s9].why_tr` | **Wollen wir uns duzen?** sorusuna **Ja, gern!** dersin. | GEÇTİ |
| 850 | `gun_sinavi.maddeler[m1:41:s10].situation_tr` | Ioana soruyor. Pazar gününden beri soğuk almışsın. | GEÇTİ |
| 851 | `gun_sinavi.maddeler[m1:41:s10].why_tr` | **Seit wann?** sorusuna **seit** ile cevap verirsin. | GEÇTİ |
| 852 | `gun_sinavi.maddeler[m1:41:s11].situation_tr` | Tobi'nin mesajını dinledin. Derya'ya üç cümleyle anlat: Tobi hasta, cuma doktordaydı, perşembe dönüyor. | GEÇTİ |
| 853 | `gun_sinavi.maddeler[m1:41:s11].why_tr` | Üç soru: Kim? Ne oldu? Sonra ne olacak? Her birine bir cümle. | GEÇTİ |

### `content/v2/m1/gun-42.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 854 | `title_tr` | Haftanın sınavı: hafta sonunu anlatmak | GEÇTİ |
| 855 | `goal_tr` | Pazartesi molasında hafta sonunu üç cümleyle anlatır, Derya'nın hikâyesini başkasına aktarırsın. | GEÇTİ |
| 856 | `can_do.tr` | Dün ne yaptığımı kısa cümlelerle anlatırım. | GEÇTİ |
| 857 | `halkalar[m1:42:h1].title_tr` | Pazartesi molası: saçlar, komik bir film, hoşça kalın | GEÇTİ |
| 858 | `halkalar[m1:42:h1].sahne.ortam_tr` | Pazartesi sabahı mola. Tobi yeni saçlarıyla içeri giriyor. | GEÇTİ |
| 859 | `halkalar[m1:42:h1].sahne.soru.q_tr` | Tobi cumartesi neredeydi? | GEÇTİ |
| 860 | `halkalar[m1:42:h1].sahne.soru.opts[0]` | Kuaförde, Luka'da | GEÇTİ |
| 861 | `halkalar[m1:42:h1].sahne.soru.opts[1]` | Doktorda | GEÇTİ |
| 862 | `halkalar[m1:42:h1].sahne.soru.opts[2]` | Ailesinde | GEÇTİ |
| 863 | `halkalar[m1:42:h1].sahne.soru.opts[3]` | Firmada | GEÇTİ |
| 864 | `sahne.title_tr` | Derya'nın komik hafta sonu | GEÇTİ |
| 865 | `sahne.sahneler[s1].sahne_tr` | Pazartesi molası. Tobi, Derya ve sen mutfaktasınız. | GEÇTİ |
| 866 | `sahne.sahneler[s2].sahne_tr` | Derya gülmeye başlıyor. | GEÇTİ |
| 867 | `sahne.sahneler[s3].sahne_tr` | Derya ellerini açıyor. | GEÇTİ |
| 868 | `sahne.sahneler[s4].sahne_tr` | Tobi kendini gösteriyor. | GEÇTİ |
| 869 | `sahne.sahneler[s5].sahne_tr` | Derya göz kırpıyor. | GEÇTİ |
| 870 | `sahne.sahneler[s6].sahne_tr` | Tobi başparmağını kaldırıyor. | GEÇTİ |
| 871 | `sahne.sahneler[s7].sahne_tr` | Derya burnunu siliyor. | GEÇTİ |
| 872 | `sahne.sahneler[s8].sahne_tr` | Tobi geri çekiliyor. | GEÇTİ |
| 873 | `sahne.sahneler[s9].sahne_tr` | Derya sana dönüyor. | GEÇTİ |
| 874 | `sahne.bolumler[b1].ana_fikir.q_tr` | Derya'nın hafta sonu nasıl geçti? | GEÇTİ |
| 875 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Şehre gitti, alışveriş yaptı, sonra biraz hastalandı | GEÇTİ |
| 876 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Ailesine gitti | GEÇTİ |
| 877 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Bütün hafta sonu çalıştı | GEÇTİ |
| 878 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Derya şehre neyle gitti? | GEÇTİ |
| 879 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | otobüsle | GEÇTİ |
| 880 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | tramvayla | GEÇTİ |
| 881 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | arabayla | GEÇTİ |
| 882 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Hava bozunca Derya nereye gitti? | GEÇTİ |
| 883 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | Stadler fırınına | GEÇTİ |
| 884 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | eve | GEÇTİ |
| 885 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | Tobi'ye | GEÇTİ |
| 886 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 887 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Derya'nın hafta sonunu Ioana'ya Almanca üç kısa cümleyle anlat. | GEÇTİ |
| 888 | `sahne.bolumler[b1].cevapla.situation_tr` | Akşam kursta Ioana Derya'yı soruyor. Derya'nın hafta sonunu kısaca anlat. | GEÇTİ |
| 889 | `sahne.bolumler[b1].cevapla.why_tr` | Derya **ich** dedi, sen **sie** dersin: **Sie hat einen Rock gekauft.** | GEÇTİ |
| 890 | `sesler[m1:42:a1].title_tr` | Yerel radyo: Wendlfing'de hafta sonu | GEÇTİ |
| 891 | `sesler[m1:42:a1].ortam_tr` | Pazartesi sabahı otobüste yerel radyo çalıyor. | GEÇTİ |
| 892 | `sesler[m1:42:a1].bolumler[b1].ana_fikir.q_tr` | Radyo ne anlatıyor? | GEÇTİ |
| 893 | `sesler[m1:42:a1].bolumler[b1].ana_fikir.opts[0]` | Wendlfing'de hafta sonunun nasıl geçtiğini | GEÇTİ |
| 894 | `sesler[m1:42:a1].bolumler[b1].ana_fikir.opts[1]` | Yarınki hava durumunu | GEÇTİ |
| 895 | `sesler[m1:42:a1].bolumler[b1].ana_fikir.opts[2]` | Yeni bir otobüs hattını | GEÇTİ |
| 896 | `sesler[m1:42:a1].bolumler[b1].ayrinti[0].q_tr` | Cumartesi hava nasıldı? | GEÇTİ |
| 897 | `sesler[m1:42:a1].bolumler[b1].ayrinti[0].opts[0]` | kötü | GEÇTİ |
| 898 | `sesler[m1:42:a1].bolumler[b1].ayrinti[0].opts[1]` | ılık | GEÇTİ |
| 899 | `sesler[m1:42:a1].bolumler[b1].ayrinti[0].opts[2]` | çok sıcak | GEÇTİ |
| 900 | `sesler[m1:42:a1].bolumler[b1].ayrinti[1].q_tr` | Pazar günü şehir nasıldı? | GEÇTİ |
| 901 | `sesler[m1:42:a1].bolumler[b1].ayrinti[1].opts[0]` | çok kalabalık | GEÇTİ |
| 902 | `sesler[m1:42:a1].bolumler[b1].ayrinti[1].opts[1]` | boş | GEÇTİ |
| 903 | `sesler[m1:42:a1].bolumler[b1].ayrinti[1].opts[2]` | kapalı | GEÇTİ |
| 904 | `sesler[m1:42:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 905 | `sesler[m1:42:a1].bolumler[b1].dikte[d5].gorev_tr` | Radyodan duyduğunu Tobi'ye Almanca iki kısa cümleyle anlat. | GEÇTİ |
| 906 | `sesler[m1:42:a1].bolumler[b1].cevapla.situation_tr` | Tobi soruyor: pazar günü şehir nasıldı? Kalabalıktı de. | GEÇTİ |
| 907 | `sesler[m1:42:a1].bolumler[b1].cevapla.why_tr` | Birden çok şey için **waren**, tek şey için **war**: **Die Stadt war voll.** | GEÇTİ |
| 908 | `sesler[m1:42:a1].eylem.q_tr` | Derya soruyor: Bugün ceket lazım mı? Radyoya göre ne dersin? | GEÇTİ |
| 909 | `sesler[m1:42:a1].eylem.opts[0]` | Evet, hava sadece on iki derece. | GEÇTİ |
| 910 | `sesler[m1:42:a1].eylem.opts[1]` | Hayır, hava çok sıcak. | GEÇTİ |
| 911 | `sesler[m1:42:a1].eylem.opts[2]` | Hayır, bugün hava ılık ve yirmi derece. | GEÇTİ |
| 912 | `sesler[m1:42:a1].eylem.why_tr` | Radyo bugün havanın on iki derece olduğunu söylüyor. | GEÇTİ |
| 913 | `sesler[m1:42:a2].title_tr` | Frau Brandl'dan sesli mesaj | GEÇTİ |
| 914 | `sesler[m1:42:a2].ortam_tr` | Pazartesi öğlen telefonuna alt kattaki komşun Frau Brandl'dan bir mesaj geliyor. | GEÇTİ |
| 915 | `sesler[m1:42:a2].bolumler[b1].ana_fikir.q_tr` | Frau Brandl neden arıyor? | GEÇTİ |
| 916 | `sesler[m1:42:a2].bolumler[b1].ana_fikir.opts[0]` | Hafta sonunu anlatıyor ve seni kahveye çağırıyor | GEÇTİ |
| 917 | `sesler[m1:42:a2].bolumler[b1].ana_fikir.opts[1]` | Kalorifer yine bozuldu | GEÇTİ |
| 918 | `sesler[m1:42:a2].bolumler[b1].ana_fikir.opts[2]` | Hasta, yardım istiyor | GEÇTİ |
| 919 | `sesler[m1:42:a2].bolumler[b1].ayrinti[0].q_tr` | Frau Brandl cumartesi neyle gitti? | GEÇTİ |
| 920 | `sesler[m1:42:a2].bolumler[b1].ayrinti[0].opts[0]` | otobüsle | GEÇTİ |
| 921 | `sesler[m1:42:a2].bolumler[b1].ayrinti[0].opts[1]` | tramvayla | GEÇTİ |
| 922 | `sesler[m1:42:a2].bolumler[b1].ayrinti[0].opts[2]` | arabayla | GEÇTİ |
| 923 | `sesler[m1:42:a2].bolumler[b1].ayrinti[1].q_tr` | Pazar günü ne yaptı? | GEÇTİ |
| 924 | `sesler[m1:42:a2].bolumler[b1].ayrinti[1].opts[0]` | evde kaldı | GEÇTİ |
| 925 | `sesler[m1:42:a2].bolumler[b1].ayrinti[1].opts[1]` | şehre gitti | GEÇTİ |
| 926 | `sesler[m1:42:a2].bolumler[b1].ayrinti[1].opts[2]` | doktora gitti | GEÇTİ |
| 927 | `sesler[m1:42:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 928 | `sesler[m1:42:a2].bolumler[b1].dikte[d5].gorev_tr` | Frau Brandl'ın hafta sonunu Tobi'ye Almanca üç kısa cümleyle anlat. | GEÇTİ |
| 929 | `sesler[m1:42:a2].bolumler[b1].cevapla.situation_tr` | Frau Brandl'ı geri arıyorsun. Davete evet de, saati sor. | GEÇTİ |
| 930 | `sesler[m1:42:a2].bolumler[b1].cevapla.why_tr` | Daveti kabul et, sonra saati sor: **Um wie viel Uhr?** | GEÇTİ |
| 931 | `sesler[m1:42:a2].eylem.q_tr` | Frau Brandl'ın mesajından sonra ne yapmalısın? | GEÇTİ |
| 932 | `sesler[m1:42:a2].eylem.opts[0]` | Onu geri ara ve akşam kahveye git. | GEÇTİ |
| 933 | `sesler[m1:42:a2].eylem.opts[1]` | Cumartesi onunla otobüse bin. | GEÇTİ |
| 934 | `sesler[m1:42:a2].eylem.opts[2]` | Pazar günü evde kal. | GEÇTİ |
| 935 | `sesler[m1:42:a2].eylem.why_tr` | Frau Brandl seni bu akşam kahveye çağırıyor. | GEÇTİ |
| 936 | `prova.title_tr` | Hafta kapısı provası: hafta sonunu anlat | **GERİ** (iç ad: hafta kapısı öğrenciye anlatılmadı) |
| 937 | `prova.durum_tr` | Pazartesi molası. Tobi hafta sonunu soruyor. Üç cümleyle anlat: nerede, nasıl, ne yaptın? Sonra Herr Wimmer geliyor. | GEÇTİ |
| 938 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Güzel başlangıç. Nerede olduğunu **war** ile söyledin. | GEÇTİ |
| 939 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Çok iyi. **habe** ve **gesehen** ile ne yaptığını söyledin. | GEÇTİ |
| 940 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Hafta sonu geçti. **Ich war in der Stadt** de. | GEÇTİ |
| 941 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Tam doğru. Gitmekte **bin** ve **gefahren** gelir. | GEÇTİ |
| 942 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Güzel. Havayı da **war** ile anlattın. | GEÇTİ |
| 943 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Bu şimdi. Geçmiş için **Ich bin mit dem Bus gefahren** de. | GEÇTİ |
| 944 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Kısa ve doğal. | GEÇTİ |
| 945 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Komik ve doğru. **war** ile filmi anlattın. | GEÇTİ |
| 946 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Film geçmişte kaldı. **Der Film war gut** ya da **war lustig** de. | GEÇTİ |
| 947 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Harika. Bir cümlede **habe**, ötekinde **bin**. | GEÇTİ |
| 948 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Doğru. Üçüncü cümleyi de söyledin. | GEÇTİ |
| 949 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Bu şimdi. Geçmiş için **Dann bin ich nach Hause gegangen** de. | GEÇTİ |
| 950 | `prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Doğru. Şefe **Herr Wimmer** diye kibarca selam verdin. | GEÇTİ |
| 951 | `prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Çok iyi. **Ihr Wochenende** dedin, yani **Sie** ile sordun. | GEÇTİ |
| 952 | `prova.dugumler[n5].secenekler[2].geri_bildirim_tr` | Şefe adıyla ve **du** ile hitap etmezsin. **Guten Morgen, Herr Wimmer!** de. | GEÇTİ |
| 953 | `prova.dugumler[n6].secenekler[0].geri_bildirim_tr` | Kısa ve kibar. **war** ve **habe eingekauft** ikisi de yerinde. | GEÇTİ |
| 954 | `prova.dugumler[n6].secenekler[1].geri_bildirim_tr` | Kibar ve doğal. Soruyu **Sie** ile geri sordun. | GEÇTİ |
| 955 | `prova.dugumler[n6].secenekler[2].geri_bildirim_tr` | Herr Wimmer'e **du** demezsin: **Und Sie?** | GEÇTİ |
| 956 | `prova.kapanis_tr` | Hafta sonunu üç cümleyle anlattın: **war**, **gekauft**, **gefahren**. Şefe de kibarca **Sie** dedin. | GEÇTİ |
| 957 | `okuma_yazma.title_tr` | Ioana'nın kurs mesajı | GEÇTİ |
| 958 | `okuma_yazma.sorular[m1:42:o1].q_tr` | Ioana ne anlatıyor? | GEÇTİ |
| 959 | `okuma_yazma.sorular[m1:42:o1].opts[0]` | Hafta sonunu | GEÇTİ |
| 960 | `okuma_yazma.sorular[m1:42:o1].opts[1]` | Kursun saatini | GEÇTİ |
| 961 | `okuma_yazma.sorular[m1:42:o1].opts[2]` | Yeni işini | GEÇTİ |
| 962 | `okuma_yazma.sorular[m1:42:o2].q_tr` | Ioana cumartesi ne yaptı? | GEÇTİ |
| 963 | `okuma_yazma.sorular[m1:42:o2].opts[0]` | Saçını kestirdi | GEÇTİ |
| 964 | `okuma_yazma.sorular[m1:42:o2].opts[1]` | Kahve içti | GEÇTİ |
| 965 | `okuma_yazma.sorular[m1:42:o2].opts[2]` | Kursa gitti | GEÇTİ |
| 966 | `okuma_yazma.sorular[m1:42:o3].q_tr` | Pazar günü kiminle şehre gitti? | GEÇTİ |
| 967 | `okuma_yazma.sorular[m1:42:o3].opts[0]` | bir arkadaşıyla | GEÇTİ |
| 968 | `okuma_yazma.sorular[m1:42:o3].opts[1]` | Tobi'yle | GEÇTİ |
| 969 | `okuma_yazma.sorular[m1:42:o3].opts[2]` | tek başına | GEÇTİ |
| 970 | `okuma_yazma.sorular[m1:42:o4].situation_tr` | Kursta Ioana'nın yeni saçını görüyorsun. Ona bir şey söyle. | GEÇTİ |
| 971 | `okuma_yazma.sorular[m1:42:o4].why_tr` | Kısa bir iltifat yeter: **Deine Haare sind super!** | GEÇTİ |
| 972 | `okuma_yazma.yazma.gorev_tr` | Ioana'ya cevap yaz: hafta sonunu üç kısa cümleyle anlat. | GEÇTİ |
| 973 | `okuma_yazma.yazma.kontrol_tr[0]` | Üç cümle yazdın mı? | GEÇTİ |
| 974 | `okuma_yazma.yazma.kontrol_tr[1]` | **war**, **habe** ve **bin** var mı? | GEÇTİ |
| 975 | `okuma_yazma.yazma.kontrol_tr[2]` | Geçmiş biçimi cümlenin sonunda mı? | GEÇTİ |
| 976 | `gun_sinavi.maddeler[m1:42:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 977 | `gun_sinavi.maddeler[m1:42:s1].why_tr` | **lustig** eğlenceli, komik demek. | GEÇTİ |
| 978 | `gun_sinavi.maddeler[m1:42:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 979 | `gun_sinavi.maddeler[m1:42:s2].why_tr` | Gitmekte **sind** ve **gegangen** gelir. | GEÇTİ |
| 980 | `gun_sinavi.maddeler[m1:42:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 981 | `gun_sinavi.maddeler[m1:42:s3].why_tr` | **die Haare** saçlar demek. | GEÇTİ |
| 982 | `gun_sinavi.maddeler[m1:42:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 983 | `gun_sinavi.maddeler[m1:42:s4].why_tr` | Kibar vedalaşma: **Auf Wiedersehen!** | GEÇTİ |
| 984 | `gun_sinavi.maddeler[m1:42:s5].why_tr` | Nerede olduğunu **war** ile söylersin. | GEÇTİ |
| 985 | `gun_sinavi.maddeler[m1:42:s6].why_tr` | Kalmak **sind** ister: **wir sind geblieben**. | GEÇTİ |
| 986 | `gun_sinavi.maddeler[m1:42:s7].why_tr` | **vor einer Woche** bir hafta önce demek. | GEÇTİ |
| 987 | `gun_sinavi.maddeler[m1:42:s8].why_tr` | **super** Türkçedeki gibi: süper. | GEÇTİ |
| 988 | `gun_sinavi.maddeler[m1:42:s9].situation_tr` | Derya cumartesini soruyor. Bir arkadaşınla film izledin, çok komikti. | GEÇTİ |
| 989 | `gun_sinavi.maddeler[m1:42:s9].why_tr` | Önce ne yaptığını, sonra nasıl olduğunu söyle: **gesehen**, **war lustig**. | GEÇTİ |
| 990 | `gun_sinavi.maddeler[m1:42:s10].situation_tr` | Tobi soruyor. Otobüsle gittin. | GEÇTİ |
| 991 | `gun_sinavi.maddeler[m1:42:s10].why_tr` | Neyle gittin sorusu: **mit dem Bus**. | GEÇTİ |
| 992 | `gun_sinavi.maddeler[m1:42:s11].situation_tr` | Pazartesi Tobi soruyor. Hafta sonunu üç cümleyle anlat: nerede, nasıl, ne yaptın? | GEÇTİ |
| 993 | `gun_sinavi.maddeler[m1:42:s11].why_tr` | Nerede için **war**, nasıl için **gefahren**, ne için **gekauft**. | **GERİ** (iki türlü okunuyor: ne için (neden), nasıl ile gefahren bağı yok) |

### `content/v2/m1/hafta-sonu-testi-06.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 994 | `maddeler[m1:42:t01].situation_tr` | Tobi soruyor. Cumartesi Derya'nın evindeydin. | GEÇTİ |
| 995 | `maddeler[m1:42:t01].why_tr` | Nerede olduğunu **war** ile söylersin: **Ich war bei Derya.** | GEÇTİ |
| 996 | `maddeler[m1:42:t02].why_tr` | **habe** ikinci yerde, **gekauft** en sonda durur. | GEÇTİ |
| 1000 | `maddeler[m1:42:t03].why_tr` | Kalmak **bin** ister: **Ich bin geblieben.** | GEÇTİ |
| 1001 | `maddeler[m1:42:t04].situation_tr` | Ioana soruyor. Cumartesi hava kötüydü, pazar güzeldi. | GEÇTİ |
| 1002 | `maddeler[m1:42:t04].why_tr` | Hava geçmişte de **war** ile: **Das Wetter war schön.** | GEÇTİ |
| 1003 | `maddeler[m1:42:t05].instr_tr` | Cümleyi geçmişe çevir: dün oldu. | GEÇTİ |
| 1004 | `maddeler[m1:42:t05].why_tr` | Gitmekte **sind** gelir, **gefahren** en sona gider. | GEÇTİ |
| 1005 | `maddeler[m1:42:t06].why_tr` | **funktionieren** geçmişte **hat funktioniert** olur. | GEÇTİ |
| 1006 | `maddeler[m1:42:t07].situation_tr` | Derya Tobi'yi soruyor. Üç gündür soğuk almış, dün doktordaydı. | GEÇTİ |
| 1007 | `maddeler[m1:42:t07].why_tr` | Hâlâ sürüyorsa **seit drei Tagen**. Tobi için **er** dersin. | GEÇTİ |
| 1008 | `maddeler[m1:42:t08].why_tr` | Yıl başa gelirse **war** hemen arkasından gelir. | GEÇTİ |
| 1009 | `maddeler[m1:42:t09].situation_tr` | Bürgerbüro'da Frau Schneider soruyor. Altı haftadır buradasın. | GEÇTİ |
| 1010 | `maddeler[m1:42:t09].why_tr` | **Seit wann?** sorusuna **seit** ile cevap verirsin. | GEÇTİ |
| 1014 | `maddeler[m1:42:t10].why_tr` | Önce demek için **vor** kullanırsın: **vor einer Woche**. | GEÇTİ |
| 1015 | `maddeler[m1:42:t11].situation_tr` | Muayenehaneden çıkıyorsun. Frau Huber'e kibarca veda et. | GEÇTİ |
| 1016 | `maddeler[m1:42:t11].why_tr` | Kibar veda: **Auf Wiedersehen!** | GEÇTİ |
| 1017 | `maddeler[m1:42:t12].why_tr` | Geçmişte bir yerde ne olduğunu **war** ile söylersin. | GEÇTİ |

### `content/v2/m1/gorulmemis-06.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1018 | `durumlar[m1:h06:g1].durum_tr` | Kuaförde Luka hafta sonunu soruyor. Cumartesi kâğıt oynadın, pazar Almanca çalıştın. | GEÇTİ |
| 1019 | `durumlar[m1:h06:g1].why_tr` | **habe** ikinci yerde, **gespielt** ve **gelernt** en sonda. | GEÇTİ |
| 1020 | `durumlar[m1:h06:g2].durum_tr` | Muayenehanede karnın ağrıyor. Frau Huber dün ne yediğini, ne içtiğini soruyor. Et yedin, çok kahve içtin. | GEÇTİ |
| 1021 | `durumlar[m1:h06:g2].why_tr` | **essen** geçmişte **gegessen**, **trinken** geçmişte **getrunken** olur. | GEÇTİ |
| 1022 | `durumlar[m1:h06:g3].durum_tr` | Spor salonunda Basti buraya neyle geldiğini soruyor. Bisikletle geldin. | GEÇTİ |
| 1023 | `durumlar[m1:h06:g3].why_tr` | Gelmekte **bin** gelir: **Ich bin mit dem Fahrrad gekommen.** | GEÇTİ |
| 1024 | `durumlar[m1:h06:g4].durum_tr` | Merdivende Frau Brandl haftanı soruyor. Pazartesi çok işin vardı, salı biraz hastaydın. | GEÇTİ |
| 1025 | `durumlar[m1:h06:g4].why_tr` | Neyin vardı: **ich hatte**. Nasıldın: **ich war**. | GEÇTİ |
| 1026 | `durumlar[m1:h06:g5].durum_tr` | Bürgerbüro'da sıra bekliyorsun. Frau Schneider dışarıdaki havayı soruyor. Yağmur yağıyor, hava sadece beş derece. | GEÇTİ |
| 1027 | `durumlar[m1:h06:g5].why_tr` | Hava cümlesi **es** ile kurulur: **Es regnet. Es sind fünf Grad.** | GEÇTİ |
| 1028 | `durumlar[m1:h06:g6].durum_tr` | Ioana sesli mesajında anlattı: dün otobüs gelmedi, kursa yürüyerek gitti, bir saat sürdü. Tobi soruyor, ona üç cümleyle anlat. | GEÇTİ |
| 1029 | `durumlar[m1:h06:g6].why_tr` | Ioana **ich** dedi, sen **sie** ya da **Ioana** dersin. Üç cümle: ne oldu, ne yaptı, ne kadar sürdü. | GEÇTİ |
| 1030 | `durumlar[m1:h06:g7].durum_tr` | Pazartesi spor salonunda Basti hafta sonunu soruyor. Cumartesi otobüsle şehre gittin, bir ceket aldın. Pazar evde kaldın. | GEÇTİ |
| 1031 | `durumlar[m1:h06:g7].why_tr` | Gitmek ve kalmak **bin**, almak **habe** ister. Geçmiş biçimi en sonda. | GEÇTİ |

### `content/v2/m1/dn-06.json`

| alan | açıklama | karar |
|---|---|---|
| `dn:sesli-kurma.h_tr` | Sesli kurma: Türkçeyi gör, bekle, sen kur | GEÇTİ |
| `dn:sesli-kurma.tr` | Ekranda kısa bir Türkçe cümle çıkar. Cevaba hemen bakma. Üç saniye bekle ve düşün. Sonra cümleyi Almanca, yüksek sesle kendin kur. Ardından doğrusunu dinle ve kendi cümlenle karşılaştır. Farkı duyunca bir kez daha söyle. Yanlış yapmak serbest. Beynin en çok kurarken öğrenir. | GEÇTİ |
| `dn:sesli-kurma.table.head` | Türkçe görürsün · bekler, sonra sen kurarsın | GEÇTİ |
| `dn:sesli-kurma.table.rows[0][0]` | Kahve içtim. | GEÇTİ |
| `dn:sesli-kurma.table.rows[1][0]` | Almanca konuştuk. | GEÇTİ |
| `dn:sesli-kurma.table.rows[2][0]` | Bunu anladın mı? | GEÇTİ |
| `dn:kaydet-dinle.h_tr` | Kaydet ve yan yana dinle | GEÇTİ |
| `dn:kaydet-dinle.tr` | Önce örnek cümleyi dinle. Sonra aynı cümleyi kendi sesinle kaydet. İki sesi arka arkaya dinle. Nerede farklı? Uzun seslere, vurgulu heceye ve cümlenin sonuna dikkat et. Bir kez daha kaydet ve yine karşılaştır. Kaydını sakla. Bir hafta sonra yeni kaydınla yan yana dinle. | GEÇTİ |
| `dn:kaydet-dinle.table.head` | dinle ve kaydet · neye dikkat edersin | GEÇTİ |
| `dn:kaydet-dinle.table.rows[0][1]` | ge kısa ve hafif, kommen vurgulu | GEÇTİ |
| `dn:kaydet-dinle.table.rows[1][1]` | Hause içinde a ve u birlikte okunur | GEÇTİ |
| `dn:kaydet-dinle.table.rows[2][1]` | ie uzun bir i gibi okunur | GEÇTİ |
| `dn:kelime-ailesi-1.h_tr` | İki kelimeden bir kelime: Haus + Arzt | GEÇTİ |
| `dn:kelime-ailesi-1.tr` | Almancada iki kelime yan yana gelip tek kelime olur. Asıl anlamı son parça verir. **Hausarzt** bir doktordur, ev değil. **der**, **die** ya da **das** da son parçadan gelir: **der Arzt**, **der Hausarzt**. Araya bazen küçük bir harf girer: **Straßenbahn**. **Bahn** tren ya da hat, **waschen** yıkamak, **Maschine** makine demektir. Uzun bir kelime görünce onu parçalarına ayır. Çoğu zaman anlamını kendin bulursun. | GEÇTİ |
| `dn:kelime-ailesi-1.table.head` | birinci parça · ikinci parça · yeni kelime · Türkçesi | GEÇTİ |
| `dn:kelime-ailesi-1.table.rows[0][3]` | aile hekimi | GEÇTİ |
| `dn:kelime-ailesi-1.table.rows[1][3]` | hafta sonu | GEÇTİ |
| `dn:kelime-ailesi-1.table.rows[2][3]` | bilet | GEÇTİ |
| `dn:kelime-ailesi-1.table.rows[3][3]` | tramvay | GEÇTİ |
| `dn:kelime-ailesi-1.table.rows[4][3]` | telefon numarası | GEÇTİ |
| `dn:kelime-ailesi-1.table.rows[5][3]` | çamaşır makinesi | GEÇTİ |
| `dn:yeniden-anlatma.h_tr` | Dinlediğini kendi sözlerinle anlatmak | GEÇTİ |
| `dn:yeniden-anlatma.tr` | Kısa bir hikâye dinlersin, sonra onu başka birine anlatırsın. Kendine üç soru sor: Kim? Ne oldu? Sonra ne oldu? Her soruya bir cümle yeter. **ich** yerine adı ya da **er**, **sie** söylersin. **bin** yerine **ist**, **habe** yerine **hat** gelir. Her kelimeyi aynen tekrar etmen gerekmez. | GEÇTİ |
| `dn:yeniden-anlatma.table.head` | Tobi söylüyor · sen anlatıyorsun | GEÇTİ |

### `content/v2/registry/grammar.json` (8 kayıt)

| alan | açıklama | karar |
|---|---|---|
| `gr:a1-07:t2.h_tr` | Dün ne yaptın? Ich habe gekocht | GEÇTİ |
| `gr:a1-07:t2.tr` | Konuşurken geçmişi çoğu zaman iki parçayla anlatırsın. İkinci yerde **habe**, **hast** ya da **hat** durur. Cümlenin sonunda fiilin geçmiş biçimi gelir. **Ich habe gekocht**. Yemek yaptım. **Was hast du gemacht**? Ne yaptın? Türkçede tek kelime, Almancada iki parça. | GEÇTİ |
| `gr:a1-07:t2.table.head` | kim · haben (2. yer) · orta · geçmiş biçimi (son) | GEÇTİ |
| `gr:a1-07:t3.h_tr` | Fiilin geçmiş biçimi: kaufen, gekauft | GEÇTİ |
| `gr:a1-07:t3.tr` | Çoğu fiilde başa **ge** gelir, sona **t** gelir. **kaufen** fiili **gekauft** olur. **machen** fiili **gemacht** olur. **arbeiten** gibi t ile biten kökte sona **et** gelir: **gearbeitet**. Bazı fiillerde sona **t** değil **en** gelir. Bunları kelime gibi öğren: **trinken**, **getrunken**. İki parçalı fiilde **ge** ortaya girer: **eingekauft**. **be** ya da **ver** ile başlayan fiillere **ge** gelmez: **besucht**. **ieren** ile biten fiillere de gelmez: **funktioniert**. | **GERİ** (terim: kök; cümle terimsiz okununca yanlış) |
| `gr:a1-07:t3.table.head` | kalıp · fiil · geçmiş biçimi | GEÇTİ |
| `gr:a1-07:t4.h_tr` | Fiilin iki parçası cümleyi sarar | GEÇTİ |
| `gr:a1-07:t4.tr` | Almanca cümlede fiil çoğu zaman iki parçadır. Birinci parça ikinci yerde, öteki parça en sonda durur. Zaman, yer ve **nicht** bu iki parçanın arasına girer. **Ich stehe am Montag um sechs auf**. **Ich habe gestern lange gearbeitet**. **Ich kann heute nicht kommen**. | GEÇTİ |
| `gr:a1-07:t4.table.head` | 1. yer · 2. yer · orta · son | GEÇTİ |
| `gr:a2-01:t1.h_tr` | Gitmek ve gelmek geçmişte: Ich bin gefahren | GEÇTİ |
| `gr:a2-01:t1.tr` | Bir yerden bir yere gitmeyi anlatırken geçmişte **habe** yerine **bin** kullanırsın. **Ich bin nach München gefahren**. Münih'e gittim. **Wir sind zu Hause geblieben**. Evde kaldık. **kommen**, **gehen**, **fahren** ve **aufstehen** böyledir. **bleiben** hareket anlatmaz ama o da **bin** ister. **du bist**, **er ist**, **wir sind** diye değişir. | GEÇTİ |
| `gr:a2-01:t1.table.head` | fiil · geçmişte · Türkçe | GEÇTİ |
| `gr:a1-08:t3.h_tr` | Nasıldı, ne vardı? Ich war, ich hatte | GEÇTİ |
| `gr:a1-08:t3.tr` | **sein** ve **haben** için geçmişte kısa biçimi kullanırsın. **Ich war müde**. Yorgundum. **Ich hatte keine Zeit**. Vaktim yoktu. **ich** ve **er** için biçim aynıdır: **ich war**, **er war**. Öteki kişiler: **du warst**, **wir waren**, **du hattest**, **wir hatten**. | GEÇTİ |
| `gr:a1-08:t3.table.head` | kişi · sein → war · haben → hatte | GEÇTİ |
| `gr:a1-14:t3.h_tr` | Yıllar nasıl söylenir: 1998, 2026 | GEÇTİ |
| `gr:a1-14:t3.tr` | 1999 yılına kadar yıllar iki parça okunur, arada **hundert** vardır. **1998** yılı **neunzehnhundertachtundneunzig** diye okunur. 2000 yılından başlayarak **tausend** ile okunur. **2026** yılı **zweitausendsechsundzwanzig** diye okunur. Yılın önüne tek başına **in** gelmez. **2020 war ich in Wien**. ya da **im Jahr 2020** dersin. | GEÇTİ |
| `gr:a1-14:t3.table.head` | yazılışı · okunuşu | GEÇTİ |
| `gr:a1-06:t4.h_tr` | Hava nasıl? Es regnet. Es ist kalt. | GEÇTİ |
| `gr:a1-06:t4.tr` | Havadan söz ederken cümle çoğu zaman **es** ile kurulur. **Es regnet**. Yağmur yağıyor. **Es ist kalt**. Hava soğuk. Türkçede bu kelime yok, Almancada atlanmaz. Sıcaklığı **Es sind zehn Grad**. diye söylersin. Mevsimle **im** kullanırsın: **im Winter**, **im Sommer**. | GEÇTİ |
| `gr:a1-06:t4.table.head` | Almanca · Türkçe | GEÇTİ |
| `gr:a1-08:t4.h_tr` | Ne zamandan beri? seit, vor, für | GEÇTİ |
| `gr:a1-08:t4.tr` | **seit** ne zamandan beri demektir ve iş hâlâ sürüyor. **Ich wohne seit einem Jahr hier**. Bir yıldır burada oturuyorum. Burada fiil bugünkü biçimde kalır. **vor** önce demektir ve sözün başına gelir. **vor einer Woche** bir hafta önce demektir. **für** bir süre için demektir: **für zwei Wochen**. | **GERİ** (anlam örtüşmüyor: seit ne zamandan beri değil) |
| `gr:a1-08:t4.table.head` | (boş) · seit (-dır) · vor (… önce) · für (… süreliğine) | **GERİ** (sembol: `…`) |

## Fark turu (İÇ-15, #238)

Tarih: 2026-11-23 · okur (OD-9.3) · inceleme P1-4 · taş: M1

Kapsam: yalnız 1. okur turundan sonra yeni ya da değişen Türkçe alanlar. Üç kaynak:
1. `docs/v2/reviews/ic5-hafta-06.md` · "İnceleme dönüşü (İÇ-10, #238 1. tur)" · "Okur fark turu için değişen Türkçe alanlar" (24 satır).
2. Aynı dosya · "P0-1 dönüşü (İÇ-15, #238)" listesi (18 alan).
3. `dn-06.json` · `dn:kelime-ailesi-1.tr`, `dn:yeniden-anlatma.tr` ve `grammar.json` · `gr:a1-07:t3.tr`.

Yöntem: alanlar bugünkü dosyalardan okundu; her biri Almanca satırla, sesli metinle ve doğru cevapla karşılaştırıldı. git komutu çalıştırılmadı (okur kuralı). Fark, dilbilimci raporundaki önce/sonra tablolarından alındı.
Bir şık grubunu (aynı sorunun seçenekleri) tek satır saydım.

Yer notu: 1. listede "m1:40:h1 kalıp `tr` ve görev cümlesi `tr` (hava)" yazıyor. Hava kalıbı ve cümlesi dosyada `m1:40:h2` içinde (`kaliplar[0]`, `gorev_cumleleri[7]`). Aşağıda doğru yoluyla okundu.

### 1. İÇ-10 1. tur dönüşü

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| F1 | gun-36 · m1:36:a2 · c5 | `tr` | Lütfen mutfağa gelin. | Şef herkesi mutfağa çağırıyor. | GEÇTİ | |
| F2 | gun-38 · m1:38:a1 · c4 | `tr` | Bir sonraki metro beş dakika sonra geliyor. | Sıradaki metro beş dakikaya burada. | GEÇTİ | |
| F3 | gun-38 · m1:38:a1 · ayrinti[1] | `q_tr` | Bir sonraki metro ne zaman geliyor? | Sıradaki metro kaç dakika sonra gelir, diye soruyor. | GEÇTİ | |
| F4 | gun-38 · m1:38:a1 · ayrinti[1] | `opts` | beş dakika sonra / bir saat sonra / on beş dakika sonra | Üç süre var, doğrusu beş dakika. | GEÇTİ | |
| F5 | gun-38 · m1:38:a2 · c2 | `tr` | Cuma günü kızımı ziyaret ediyorum. | Frau Brandl cuma kızına gidiyor. | GEÇTİ | |
| F6 | gun-38 · m1:38:a2 · ana_fikir | `opts[0]` | Hafta sonu kızını ziyaret ediyor, haber veriyor | Hafta sonu kızında olacak, bunu bana bildiriyor. | GEÇTİ | Mesaj "cuma"dan "pazartesi"ye kadar diyor, "hafta sonu" ana fikir için yeterli. |
| F7 | gun-39 · m1:39:v1 · s6 | `tr` | 1970 yılında evde kaloriferimiz yoktu. | 1970'te evde ısıtma yoktu. | GEÇTİ | |
| F8 | gun-39 · m1:39:v1 · s8 | `tr` | Kışın mutfaktaydık. | Kışın mutfakta otururduk. | GEÇTİ | Pichler "neyiniz vardı" diye soruyor, cevap "mutfaktaydık". Dolaylı ama sahne notu (mutfak kapısını gösteriyor) bağı kuruyor. |
| F9 | gun-39 · m1:39:v1 · ayrinti[1] | `q_tr` | Eskiden kışın neredeydiler? | Eskiden kışın evin neresinde dururlardı? | GEÇTİ | |
| F10 | gun-39 · gun_sinavi · m1:39:s3 | `why_tr` | Gelmek geçmişte **ist** ile kurulur: **ist spät gekommen**, geç geldi. | Geçmişte "geldi" derken hep **ist** kullanırım. | **GERİ** | İfadenin kendisini değil, yanlış bir genel kuralı anlatıyor. **ist** yalnız otobüs, o için doğru. Ben için **bin**: aynı hafta g3 "Gelmekte **bin** gelir" diyor, `gr:a2-01:t1` de **Ich bin**. Okuyunca **Ich ist gekommen** kurabilirim. |
| F11 | gun-40 · m1:40:h2 · kaliplar[0] | `tr` | Hava nasıl? – Yağmur yağıyor. – Hava sıcak. – Hava … derece. | Havayı sorma ve söyleme yolları, sıcak da var. | GEÇTİ | Kalıp satırı (1. turda sayılmayan tür). `…` sayının yeri, kalıpta beklenen yer tutucu. Değişen kelime "sıcak" açık. |
| F12 | gun-40 · m1:40:h2 · gorev_cumleleri[7] | `tr` | Hava sıcak. Dışarıda ayakta kahve içiyoruz. | Hava ılık, dışarıda ayakta kahve içiyoruz. | GEÇTİ | |
| F13 | gun-40 · m1:40:v1 · s2 | `tr` | Evet, maalesef. Ama bugün hava hâlâ sıcak. | Hafta sonu yağmur var ama bugün daha sıcak. | GEÇTİ | |
| F14 | gun-40 · m1:40:a1 · c2 | `tr` | Bugün hava sıcak ve güzel. | Bugün hava güzel ve sıcak. | GEÇTİ | |
| F15 | gun-40 · m1:40:a1 · c5 | `tr` | Ama artık o kadar sıcak değil. | Pazartesi güzel ama daha serin. | GEÇTİ | |
| F16 | gun-40 · m1:40:a1 · ayrinti[0] | `opts` | sıcak ve güzel / kötü / yağmurlu | Bugünkü hava için üç seçenek, doğrusu sıcak ve güzel. | GEÇTİ | |
| F17 | gun-40 · prova | `durum_tr` | Birkaç gün sonra, yağmurlu bir gün. Saat üçte aile hekiminde randevun var ama otobüs gelmiyor. Frau Huber'i ara. | Başka bir gün, yağmur yağıyor. Saat üçte doktorum var, otobüs yok. Muayenehaneyi arayacağım. | GEÇTİ | Üç cümle tek bir durumu anlatıyor, hepsi 14 kelimenin altında. |
| F18 | gun-41 · m1:41:h2 · gorev_cumleleri[4] | `tr` | Kursta hepimiz birbirimize sen diyoruz. | Kursta herkes birbirine "sen" diye hitap ediyor. | GEÇTİ | |
| F19 | gun-41 · m1:41:a2 · c3 | `tr` | Çarşambaya kadar işe gelmiyor. | Tobi çarşambaya kadar yok. | GEÇTİ | |
| F20 | gun-41 · m1:41:a2 · c4 | `tr` | Bu hafta işi onun yerine Aksoy Hanım yapıyor. | Bu hafta Tobi'nin işini Derya yapıyor. | GEÇTİ | |
| F21 | gun-42 · m1:42:h1 · gorev_cumleleri[4] | `tr` | Perşembeden beri kalorifer yine çalışıyor. Süper! | Kalorifer perşembe düzeldi, hâlâ çalışıyor. | GEÇTİ | |
| F22 | gun-42 · m1:42:a1 · c3 | `tr` | Pazar günü hava sıcaktı. | Pazar hava sıcaktı. | GEÇTİ | |
| F23 | gun-42 · m1:42:a1 · ayrinti[0] | `opts` | kötü / sıcak / çok güzel | Cumartesinin havası için üç seçenek, doğrusu kötü. | GEÇTİ | |
| F24 | gun-42 · m1:42:a1:e1 | `opts[2]` | Hayır, bugün yirmi derece. | Ceket gerekmez, bugün yirmi derece, diye cevap veriyorum. | GEÇTİ | Çeldirici. Radyo on iki diyor, yanlış olduğu açık. |

### 2. P0-1 dönüşü (18 alan)

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| F25 | gun-37 · m1:37:a1 · c2 | `tr` | Bir kız arkadaşım için bir hediyeye ihtiyacım var. | Derya bir arkadaşına hediye arıyor. | GEÇTİ | Bir kadının ağzından "bir kız arkadaşım" sıradan arkadaş demek. "bir" bunu daha da açık yapıyor. |
| F26 | gun-37 · m1:37:a1 · c3 | `tr` | Cuma günü onun doğum günü. | O arkadaşın doğum günü cuma. | GEÇTİ | |
| F27 | gun-37 · m1:37:a1 · ayrinti[0] | `opts[0]` | bir arkadaşı için | Hediye Derya'nın bir arkadaşı için. | GEÇTİ | |
| F28 | gun-37 · m1:37:a1:e1 | `opts[1]` | Cuma günü Derya'nın arkadaşını ara. | Cuma Derya'nın arkadaşına telefon et. | GEÇTİ | Çeldirici, anlaşılıyor. |
| F29 | gun-37 · okuma_yazma | `metin_tr` | … Onu bir kız arkadaşım için aldım! … | Derya siyah kazağı bir arkadaşına aldı. | GEÇTİ | Yalnız değişen cümle okundu. |
| F30 | gun-37 · m1:37:o1 | `opts[0]` | Bir arkadaşına kazak aldığını ve seni beklediğini | Derya arkadaşına kazak aldı, beni dükkâna çağırıyor. | GEÇTİ | "seni beklediğini" metindeki "Sen de geliyor musun?" ile örtüşüyor. |
| F31 | gun-38 · m1:38:h1 | `title_tr` | Hafta sonu aile yanında | Hafta sonu ailenin yanına gitmek. | GEÇTİ | |
| F32 | gun-38 · m1:38:h1 · sahne | `ortam_tr` | Çarşamba molası. Başka bölümden bir iş arkadaşı pazar gününü anlatıyor. | Molada başka bölümden bir kadın pazarını anlatıyor. | GEÇTİ | Not (karar değil): konuşan etiketi Almanca **eine Kollegin**. A2 okur bunu "bir iş arkadaşı" diye tanır. Ekranda nasıl göründüğüne bakılmadı. |
| F33 | gun-38 · m1:38:h1 · sahne soru | `q_tr` | İş arkadaşının anne babasının yanında başka kim vardı? | Kadın annesiyle babasındaydı, orada başka kim vardı? | GEÇTİ | İki "-nın" arka arkaya biraz ağır ama tek okumada çözülüyor. |
| F34 | gun-38 · m1:38:h2 · sahne | `ortam_tr` | Şimdi Derya anlatıyor, ellerini açıp gülüyor. | Sıra Derya'da, gülerek anlatıyor. | GEÇTİ | |
| F35 | gun-38 · m1:38:v1 · s2 | `tr` | Münih'te bir kız arkadaşımı ziyaret ettim. Birlikte yemek yedik. | Derya Münih'te bir arkadaşına gitti, beraber yemek yediler. | GEÇTİ | |
| F36 | gun-38 · m1:38:v1 · s6 | `tr` | Gerçekten mi? Münih'in yabancısı mısın? | Tobi gülüyor: Münih'i bilmiyor musun? | GEÇTİ | h2'de öğretilen "buranın yabancısıyım" ile aynı söz. |
| F37 | gun-38 · m1:38:v1 · s8 | `tr` | Sonra arkadaşım köpekle geldi. | Sonra ziyaret ettiği arkadaş köpekle onu almaya geldi. | GEÇTİ | Aşağıdaki "Freundin" notuna bakın. |
| F38 | gun-38 · m1:38:v1 · ana_fikir | `opts[0]` | Münih'te bir arkadaşını ziyaret etti | Derya Münih'te bir arkadaşına gitti. | GEÇTİ | |
| F39 | gun-38 · m1:38:v1 · ayrinti[1] | `opts` | Arkadaşı, köpekle / Tobi / Bir taksi | Sonunda gelen: arkadaşı ve köpek. Diğer ikisi yanlış. | GEÇTİ | "Bir taksi" "kim geldi" sorusuna tam uymuyor ama çeldirici olarak hemen eleniyor. |
| F40 | gun-40 · m1:40:h2 · sahne satır 1 | `tr` | Ne tatlı! Bu senin köpeğin mi? | Fotoğraftaki köpeği beğeniyorum, Derya'nın mı diye soruyorum. | GEÇTİ | |
| F41 | gun-40 · m1:40:h2 · sahne satır 2 | `tr` | Hayır, bir arkadaşımın. Hava da çok güzeldi, yirmi dereceydi. | Köpek bir arkadaşının. O gün hava güzel ve yirmi dereceydi. | GEÇTİ | 38. gündeki arkadaşın köpeğiyle uyumlu. |
| F42 | gun-41 · m1:41:a1 · ayrinti[0] | `opts[2]` | eczanede | Tobi cuma eczanedeydi (yanlış şık). | GEÇTİ | |

### 3. Dil noktaları ve dilbilgisi

| # | öğe kimliği | alan | değişen kısım | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| F43 | dn-06 · `dn:kelime-ailesi-1` | `tr` | "Birinci parça fiilse sonundaki **en** düşer: **fahren**, **Fahrkarte**." ve "**Bahn** tren ya da raylı yol, …" | İlk kelime fahren gibi bir eylemse, sonundaki en atılır: Fahrkarte. Bahn tren ya da ray demek. | GEÇTİ | Tablodaki iki satırı (fahren, waschen) doğru açıklıyor. "fiil" 1. turdaki kararımla GERİ nedeni değil. "raylı yol" ile Almanca **hat** karışması kalktı. |
| F44 | dn-06 · `dn:yeniden-anlatma` | `tr` | "**wir** yerine adları söylersin, **sind** aynı kalır." | "Biz" diyen kişileri adlarıyla söylerim, sind değişmez. | GEÇTİ | Tablonun son satırı (**Tobi und Derya sind …**) bunu gösteriyor. Tobi'nin "wir"inin Derya'yı içerdiğini okur kendisi varsayıyor. Küçük bir soru işareti ama anlamı bozmuyor. |
| F45 | grammar · `gr:a1-07:t3` | `tr` | "**arbeiten** gibi fiillerde sona **et** gelir: **gearbeitet**." | arbeiten'in geçmişi gearbeitet, sona et gelir. | GEÇTİ | 1. turdaki GERİ (terim: kök) kapandı, cümle 1. turdaki öneriyle aynı. Not: "gibi" hangi fiillerin benzediğini söylemiyor. Bu haftanın tek örneği arbeiten olduğu için engel değil. |

`dn:yeniden-anlatma` tablosunun değişen son satırı iki sütunda da Almanca, Türkçe alan değil; sayılmadı.

### Açık soru: m1:38:v1 s8 **Meine Freundin ist dann mit dem Hund gekommen.**

- Türkçesini okuyan öğrenci "sevgilim" diye anlamaz, "bir arkadaşım" diye anlar. Türkçe satırda "kız" yok, yalnız "arkadaşım" var. Türkçede bu düz bir arkadaş sözü.
- Hangi arkadaş olduğu da açık: s2 "Münih'te bir kız arkadaşımı ziyaret ettim" diyor. s8'deki "arkadaşım" o kişiye dönüyor ("köpekle onu almaya geldi").
- s2'deki "bir kız arkadaşım" bile bir kadının ağzından Türkçede "sevgili" çağrıştırmıyor. Bu çağrışım daha çok bir erkek "kız arkadaşım" deyince doğar.
- **Sie ist dann …** seçeneğine okur açısından gerek yok. Türkçe satır şimdiki hâliyle açık. Dilbilimcinin dediği gibi **sie** s7'deki **die Straße**'ye de dönebilir, bu da daha bulanık olur.
- Bilgi notu (karar değil, dilbilimci için): öğrenci bu cümleyi gölge ve d3'te kendi ağzıyla kuruyor. Öğrenci erkekse ve bir kadın arkadaşı için **meine Freundin** derse Almanca dinleyen "sevgili" anlayabilir. Bu, Türkçe açıklamanın değil Almanca kullanımın sorusu. Okur ölçütünü etkilemiyor.

### Fark turu sayıları

- Okunan: **45** (1. liste 24 · 2. liste 18 · dn/dilbilgisi 3)
- GEÇTİ: **44**
- GERİ: **1**

GERİ:
- `content/v2/m1/gun-39.json` · `gun_sinavi.maddeler[m1:39:s3].why_tr` · «Gelmek geçmişte **ist** ile kurulur: **ist spät gekommen**, geç geldi.» · **Neden:** genel kural gibi okunuyor, ama yalnız otobüs için doğru (ben için **bin**). Aynı haftanın g3 açıklamasıyla çelişiyor. · **Öneri:** Otobüs için **ist** gelir: **ist spät gekommen**, geç geldi.

Yan gözlem (kapsam dışı, karar değil): 1. turun 28 GERİ alanından bir kısmına bugünkü dosyalarda baktım (`can_do.tr` 36/39/40, `goal_tr` 38, `kontrol_tr[1]` 38/40, 41 a2 `ayrinti[1].q_tr`, 42 `prova.title_tr`, 42 s11 `why_tr`, `gr:a1-08:t4`). Hepsi 1. turdaki öneri yönünde düzelmiş. Açıklama alanlarında `…` kalmamış.

**Karar (OD-9.4):** `gun-39.json` bu fark turunda tek GERİ yüzünden "reviewed" sayılamaz. Bu turda okunan alanlara göre `gun-36`, `gun-37`, `gun-38`, `gun-40`, `gun-41`, `gun-42`, `dn-06` ve `grammar.json` (`gr:a1-07:t3`) için okur engeli kalmadı. F10 düzelince yalnız o alan yeniden okunur.
