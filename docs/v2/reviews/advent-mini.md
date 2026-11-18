# İnceleme: LS-17.0 Advent mini senaryoları
İnceleyen: dilbilimci-ajan · 2026-11-18 · Dil incelemesi: **KAPANDI** · `review.status`: **draft** (yalnızca kalıp kapısı yüzünden, aşağıda)

Dosyalar:
- `content/v2/domains/essen/scenarios/m1-weihnachtsmarkt.json`
- `content/v2/domains/freizeit/scenarios/m1-gluehwein-einladung.json`
- `content/v2/domains/arbeit/scenarios/m1-weihnachtsfeier.json`
- ayrıca: `essen|freizeit|arbeit/SOURCES.md`, `essen/proposals.json`

## Baş geliştiricinin yapması gereken tek şey (engel)
Bu dalda (`/tmp/wt3`) `content/v2/registry/patterns.json` içindeki **61 kalıbın hepsi `draft`**. Pilotun 14 kalıbının ve `pt:wie-viel-kostet`'in `reviewed` olduğu sürüm yalnızca ana çalışma kopyasında (`/home/claude/deutsch-werkstatt`) var.

Bu yüzden üç senaryoyu `reviewed` yaptığımda doğrulayıcı D-063 gereği 3 hata veriyor ("temel kalıplar incelenmemiş 4/4"). Görev hem "validate 0 hata" hem `reviewed` istiyordu; ikisi bu dalda birlikte sağlanamıyor. Derlemeyi kırmamak için `draft` bıraktım (telefon/01 ile aynı yol).

Geçici bir kopyada denedim, depoya dokunmadan:

| Durum | Sonuç |
|---|---|
| Üç senaryo `reviewed` + bu dalın `patterns.json`'u | 3 hata |
| Üç senaryo `reviewed` + ana kopyanın `patterns.json`'u | **0 hata**, 56 uyarı |

Yapılacak: dal ana kopyadaki `patterns.json` ile güncellenince üç dosyada `review.status` → `"reviewed"`. İçerik için başka koşulum yok; üçünü de onaylıyorum.

Not: görevde `notes:[…]` dizi olarak istenmişti; şemada (`ReviewState.notes`) alan `string`. Dizi yazınca şema hatası verir, o yüzden tek metin olarak yazdım.

## Sayılar

| Senaryo | Madde | Hata | İyileştirme | Hata oranı | accepted[] | Yeniden yazılan açıklama |
|---|---|---|---|---|---|---|
| essen/m1-weihnachtsmarkt | 143 | 8 | 6 | %5,6 | 223 → 319 | 60 |
| freizeit/m1-gluehwein-einladung | 127 | 7 | 3 | %5,5 | 175 → 239 | 61 |
| arbeit/m1-weihnachtsfeier | 140 | 7 | 4 | %5,0 | 202 → 271 | 61 |
| **Toplam** | **410** | **22** | **13** | **%5,4** | **600 → 829** | **182** |

Madde = ifade + karşı taraf cümlesi + cevap seçeneği + build + drill + diyalog satırı + rol oyunu öğesi + dinleme satırı ve sorusu + konuşma + görev + mistakes_tr girdisi.
Hata = dil, doğallık, çeviri ya da tutarlılık hatası. OD-9 yeniden yazımı ve accepted[] eklemeleri hata sayısına katılmadı; ayrı sütunda.

## Önemli düzeltmeler (önce → sonra)

### essen/m1-weihnachtsmarkt
1. **Aynı stantta iki ödeme kuralı.** v1'de Glühwein standı "Leider nur bar" diyor; rol oyununda aynı stant "Kartenzahlung erst ab 10 €" ve sürprizde "Das Kartengerät geht gerade nicht". → Rol oyunu: "Sie nehmen nur Bargeld, keine Karte." Kart makinesi sürprizi → "Moment, der Glühwein ist gleich fertig. Zwei Minuten, ja?". 10 € kuralı yalnızca Bratwurst standında kaldı (v3, h1).
2. "Leider nur bar, gell." / "…geben S' drüben ab, gell." → "…, gell?" (o08, d11, v1, h2). Kaynak ve WORLD §5 ifadeyi soru sonunda veriyor.
3. v2: "Na, noch einmal Glühwein?" → "Na, noch einen Glühwein?" (doğallık).
4. `ch:essen:was-macht-das` Alltag: "Was bekommen Sie?" → "Was macht das?". Aynı cümleyi satıcı ters anlamda sorar ("ne alırsınız?"); A2 başındaki öğrenciye üretim kalıbı olarak yanıltıcı. accepted[]'de duruyor. d20 buna bağlıydı → "Karte geht erst ab zehn Euro" anlama sorusu.
5. `ch:essen:was-heisst-schuss.tr`: "'Mit Schuss' ne demek?" → "Pardon, mit Schuss ne demek?" (Almancada "Entschuldigung" var).
6. "Glühwein alkol ilaveli mi, ilavesiz mi?" / "(Alkol ilavesi) olmadan" → "Glühwein'e sert içki ekleyeyim mi, eklemeyeyim mi?" / "İlave içki olmasın, lütfen." Glühwein zaten alkollü; "alkolsüz" izlenimi veriyordu.
7. v1 ipucu "(Derya alkol içmiyor)" çıkarıldı. WORLD'de böyle bir bilgi yok; kalıcı karakter hakkında uydurma olgu.
8. `essen/proposals.json` `lx:bar`: pos "adv" → "adj".

İyileştirme: seviye A1 → A2 (karar 4); d05 çeldiricileri ("Karte" gündelikte "ich zahl Karte" diye geçerli) → "Pfand", "Tasse"; b01 ve b15'te normalleştirince aynı olan varyant çıkarıldı; 8 çoktan seçmeli maddede doğru şık hep 0. sıradaydı, dağıtıldı; mistakes_tr'ye "bardağı saklamadan önce sor" ve "her stant kart almaz" eklendi; SOURCES notları.

### freizeit/m1-gluehwein-einladung
1. o11.tr: "standdayız" → "stanttayız" (yazım).
2. `ch:freizeit:adventskranz`: Türkçesi "Evde …" ama hd "Hast du schon einen Adventskranz?" → "Hast du zu Hause schon einen Adventskranz?" (b12 kanonik cevabı ve rol oyunu hedefi de).
3. `ch:freizeit:bis-gleich`: hd "Bis später!", Alltag "Bis gleich!", Türkçe "az sonra". İkisi farklı anlam, katman farkı değil → hd "Bis gleich!", Alltag alanı kaldırıldı.
4. `ch:freizeit:plaetzchen-gebracht` Alltag: "…vor die Tür gestellt" (başka içerik) → "…Plätzchen vorbeigebracht." Eski cümle accepted[]'de duruyor.
5. `ch:freizeit:geht-auch-morgen` Alltag: "Geht's auch morgen? Da hätt ich Zeit." → "Geht's auch morgen?" (ikinci cümle Türkçede ve hd'de yok).
6. `ch:freizeit:erster-advent.tr`: "Pazar günü ilk Advent." → "Pazar günü ilk Advent geliyor bile." ("schon" çevrilmemişti).
7. Rol oyunu sahnesi "Cuma, iş çıkışı" → gün çıkarıldı. v2'de "bis morgen", h2'de "morgen ins Büro" cuma ile çelişiyordu.

İyileştirme: o14.tr sadeleşti; Türkçe çevirilerin içindeki Bairisch notları çıkarıldı (ifadelerin kendi notunda ve d20'de duruyor); doğru şık dağıtıldı.

### arbeit/m1-weihnachtsfeier
1. `ch:arbeit:was-machst-du`: hd "Was machen Sie …?" ama Türkçesi "ne yapıyorsun" → hd "Was machst du an Weihnachten?". Sie biçimi b13 ve d06'da çalışılıyor.
2. `ch:arbeit:wann-war-das`: hd "wann und wo war das noch mal?" ama Türkçesi yalnızca "ne zaman" → hd "Entschuldigung, wann war das noch mal?".
3. "Ne zamandı?" → "Ne zaman demiştiniz?" (ifade, b04, d03, v1). Birebir çeviri; telefon/01'deki "Nasıl demiştiniz?" düzeltmesiyle aynı.
4. v2: "zu meinen Eltern" Türkçesi "Ailemin yanına" → "Annemlerin yanına".
5. v2: "Klingt super!" Türkçesi "Süper görünüyor!" → "Kulağa süper geliyor!".
6. Wimmer (Bairisch %0, hd ağırlıklı): "den Herrn Lechner", "der Herr Lechner" → "Herrn Lechner", "Herr Lechner" (v1 ve hd etiketli h1).
7. Sürpriz: "Der Tobi hat schon wieder dein Geschenk gefunden – Spaß!" anlaşılmıyordu → "Der Tobi sagt, er hat deinen Namen gezogen – Spaß!" (o14 ile aynı şaka).

İyileştirme: "İyi bayramlar / iyi tatiller!" → "İyi tatiller!"; "Senli benli konuşalım mı?" → "Birbirimize du diyelim mi?"; b12, b13, d13, d14'te normalleştirince aynı olan varyantlar temizlendi (b13 gerçekte 3 varyanta düşüyordu, bir varyant eklendi); doğru şık dağıtıldı.

### accepted[] (üç dosya, +229)
`grading.ts` "gern/gerne", "noch mal/nochmal/noch einmal", "zahlen/bezahlen", "Geht's/Geht es" farklarını ayrı varyant sayıyor. En riskli eksikler bunlardı; hepsine eklendi. Yanlış biçim kabul eden varyant bulmadım. "Ein Glühwein, bitte." bilerek eklenmedi (alıştırma tam olarak einen biçimini öğretiyor).

## Açık sorulara kararlar

**1. "Pfiat di": kalır, kaynak yeterli.** İki kaynak aynı şeyi söylüyor: The Local (WORLD §5'in öbür ifadeleriyle aynı sayfa) ve Wikipedia "Grüß Gott" maddesi ("behüte dich Gott" kısaltması, tek kişiye "pfiat di", birden fazla kişiye "pfiat eich"). İkinci kaynağı `freizeit/SOURCES.md`'ye ekledim. Yalnızca anlama amaçlı; öğrenciden üretmesi istenmiyor. Öneri: WORLD §5 tablosuna eklenmeli.

**2. Katman.** Tek cümlelik karşı taraf sözleri (essen o08, o13; freizeit o01, o12, o13) `bair` kalır: WORLD §5 dördünü de Bairisch sayıyor ve rozet öğrenciye "bu bölgesel" bilgisini veriyor. Dinleme parçaları `alltag` kalır: parçanın bütünü Alltag, içinde tek bölgesel söz var; `bair` etiketi PEDAGOGY §6 basamak 5 koşulunu (lisanslı kayıt ya da "gerçek ağız değil" etiketi) tetikler. Yarı-Alltag kuralı üçünde de sağlanıyor.

**3. "Gasthaus am Stadtplatz" ve 10 € kuralı.** İkisi de doğal. "Gasthaus am Stadtplatz" özel ad değil, tarif; olduğu gibi kaldı. Öneri: WORLD §1'e `pl:gasthaus` eklenirse 4. hafta bölümüyle bağ kalıcı olur. 10 € kuralı gerçek hayatta yaygın; yalnızca tek standa indirdim (essen düzeltme 1).

**4. essen seviyesi: A2.** Kelimelerin çoğu öneri dosyasında A2 (Glühwein, Pfand, Stand); "zurückgeben" ile "möchte" birlikte, konuşma görevinde "Wenn du … zurückbringst, bekommst du …", hızlı Alltag ve yutulan sesler var. Öğrenci kartı da A2 başı.

## pt:wie-viel-kostet (patterns.json'a yazmadım)
Dilbilgisi ve Almanca açısından hata yok; temel kalıp kurallarını karşılıyor (2 slot, 9 ve 8 doldurma, 11 örnek, 4'ü Alltag, 7 dönüşüm). Ana kopyada 17.11.2026'da zaten `reviewed`; içerik bu daldakiyle birebir aynı. Öneriler:
1. `grammar_tr` yeni açıklama standardına uymuyor (tırnak içinde Almanca, noktalı virgül, "özne", "tekilde", "çoğulda"). Öneri: "Fiyatı Was kostet das diye sorarsın. Wie viel kostet das da aynı anlama gelir. Tek şey için kostet, birden fazla şey için kosten dersin. Toplamı sormak için Was macht das dersin."
2. `mistakes_tr`'ye Türkçe konuşana özgü iki madde: "Wie viel das olmaz, kostet gerekir: Wie viel kostet das?" ve "Was macht das sorusunda machen yapmak değil, tutmak demektir."
3. Örnek "Wie teuer ist der Spaß?" ironik bir deyim; A1 kalıp örneği için ağır. Öneri: "Wie teuer ist das?"
4. Örnek eklenebilir: "Und die Bratwurst, was kostet die?" (senaryonun Alltag biçimi; önce şey, sonra soru).
5. Slot adları "tekil" ve "çoğul" öğrenciye görünüyorsa "tek şey" ve "birden fazla şey" olmalı.
6. "Das kostet zwölf Euro fünfzig." Türkçesi "On iki euro elli sent." → "On iki euro elli." daha doğal.

## Türkçe açıklama standardı (OD-9)
Kapsam: `goal_tr`, `use_tr`, ifade ve senaryo `mistakes_tr`, Bairisch `note_tr`, `why_tr`, `situation_tr`, `instr_tr`, `q_tr`, diyalog `title_tr` ve `hint_tr`, rol oyunu `scene_tr` ve hedeflerin Türkçesi, dinleme başlıkları, konuşma ve görev metinleri.

| | Önce | Sonra |
|---|---|---|
| Açıklama sayısı | 221 | 235 |
| Kurala aykırı | 131 | 0 |
| Yeniden yazılan | | **182** |

Denetim betikle yapıldı: cümle başına en çok 14 kelime; `=`, `;`, `…` yok; tırnak içinde Almanca yok; dilbilgisi terimi yok. Çeviri alanlarındaki (`tr`, `prompt_tr`) tırnaklı Almanca ve parantez içi notlar da temizlendi.

Dokunmadıklarım: `starter` ve `hints_de` içindeki "…" (Almanca destek alanı, boşluğu gösteriyor); rol oyunu `partner_de` (yapay zekâya gidiyor, öğrenci görmüyor).

## Kalan gözlemler (engel değil)
- **Wimmer'in du önerisi.** WORLD'de Wimmer'in bütün sık ifadeleri ve 13. hafta "Sie" ile. Senaryo bunu "kutlamada önerilen du ertesi gün belirsizse önce Sie" kuralıyla bağlıyor (kaynaklı). WORLD'de 4. haftadan sonrası için açık bir karar yazılmalı.
- **"Kommste", "Haste", "Nee".** Doğru ve yaygın gündelik biçimler; PEDAGOGY §6 "haste"yi açıkça sayıyor, o yüzden bıraktım. Bavyeralı konuşurda daha tipik olanı "Kommst mit?" biçimi olabilir; bunu kaynakla doğrulayamadım, değiştirmedim.
- **"Am Sonntag ist ja schon erster Advent."** Yalnızca 29.11.2026'ya kadar doğru; mevsim aralığı 23.12'ye kadar. Kurgu zamanı olarak kabul edilebilir.
- **Oynatıcı şıkları karıştırmıyor** (telefon/01 raporundaki bulgu sürüyor). Dosyada elle dağıttım.
- `essen/proposals.json` dışında öneri dosyalarında hata yok (artikel ve çoğullar kontrol edildi).

## Yöntem
- Üç dosyanın tamamı okundu. Kaynak sayfaları yeniden açıldı ve içerikle karşılaştırıldı: The Local, karrierebibel (Wichteln; duzen-siezen), Stuttgarter Zeitung (fiyat, Pfand, nakit), infranken (Pfand), Duden "an". Hepsi içerikle örtüşüyor.
- D-061: öğrenci satırlarında sabit ad ya da cinsiyet yok; arbeit'te `{name}` kullanılıyor. D-060: İngilizce yalnızca `mistakes_tr`'de (bar, Chef). D-065: bütün dinleme parçalarında `speeds` dolu.
- `npm run content:validate` → 0 hata, 65 uyarı. `npx vitest run content/tools` → 10/10. `npm test` → 94/94.

## Okur turu 1 düzeltmeleri (2026-11-18)
Okur kontrolü (OD-9.3) 184 açıklamanın 9'unu geri çevirdi. Hepsi düzeltildi; statü `draft` kaldı (ikinci okur turundan sonra baş geliştirici `reviewed` yapar).

| # | Kimlik | Önce → Sonra |
|---|---|---|
| 1 | essen `ch:essen:mit-karte` mistakes_tr[0] | "Bar zahlen nakit ödemek demektir. …" → "Burada Karte banka kartıdır. Aynı kelime lokantada menü anlamına da gelir." (bar uyarısı senaryo mistakes_tr'de ve d05'te duruyor) |
| 2 | freizeit senaryo mistakes_tr[5] ve `ch:freizeit:adventskranz` mistakes_tr[0] | "Tek kişiye Hast du, iki kişiye Habt ihr …" → "Tek kişiye Hast du diye sorarsın. İki ya da daha fazla kişiye Habt ihr dersin." |
| 3 | freizeit `ch:freizeit:wann-wo` mistakes_tr[0] | "Soruda treffen hemen wann kelimesinden sonra gelir …" → "Soruda treffen, wir kelimesinden önce gelir: Wann und wo treffen wir uns?" |
| 4 | freizeit `ch:freizeit:passt-mir` mistakes_tr[0] | "Passt dir das denir, passt dich das denmez." → "Das passt mir denir, das passt mich denmez." (dir/dich uyarısı senaryo mistakes_tr[1]'de duruyor) |
| 5 | arbeit senaryo mistakes_tr[2] ve `ch:arbeit:ich-bin-name` mistakes_tr[1] | "Kutlamada önerilen du ertesi gün belirsizse …" → "Şef kutlamada senli benli konuşmayı önerdiyse ertesi gün yine Sie ile başla." |
| 6 | arbeit `d10` situation_tr | "… Wichteln'in ne olduğunu bilmiyorsun." → "… Bu kelimeyi bilmiyorsun. Ne demek olduğunu sor." |
| 7 | arbeit `v3` 5. öğrenci satırı (v3#9) hint_tr | "Şakayla cevap ver: ne zamandan beri?" → "Evet de. Şakayla, yalnızca beş dakikadır böyle olduğunu ekle." |

Kalın yazım kullanmadım: oynatıcının `**…**` işaretini biçimlendirdiğini doğrulamadım, yıldızlar ekranda görünebilir.

OD-7 gözlemleri (öğretmeden isteme):
- essen `speaking[1]`: örnek cevap "Auf die Tasse kommen … Wenn du … zurückbringst, …" → "Das Pfand ist drei Euro. Ich gebe die Tasse zurück und bekomme das Pfand zurück." Bütün parçalar dersin kartlarında var. `hints_de` buna göre güncellendi.
- freizeit `missions/m1`: hazırlığa davet ifadesi eklendi. Yeni ek ifade `ch:freizeit:kommst-du-mit` ("Kommst du mit auf einen Glühwein?", Alltag "Kommste mit auf 'nen Glühwein?"), yeni `b17` (6 varyant), `prep` listesinin başında. Görev metninden yürüyüş çıkarıldı (öğretilmiyor); Glühwein ya da kahve kaldı.

Okurun okumadığı alanlar (q_tr, build prompt_tr, dinleme q_tr ve şıkları, title_tr, rol oyunu hedefleri ve sürprizlerin Türkçesi) bir kez gözden geçirildi; betik denetiminde aykırı yok. Elle sadeleştirilenler:
- essen `d19` doğru şık: "Bardak için alınan, bardak geri verilince iade edilen para" → "Bardağı geri verince geri aldığın para"
- essen `h2` 3. soru şıkkı: "Bardak onda kalacak, para iade yok" → "Bardak onda kalacak, parasını alamayacak"
- freizeit `b10`: "Komşum (kadın) …" → "Kadın komşum bana kurabiye getirdi."; `b12`: "(du)" → "(du ile)"; `b15`: "Hiç (Noel) kurabiyesi …" → "Hiç Noel kurabiyesi pişirdin mi?"

Doğrulama: `npm run content:validate` → 0 hata, 65 uyarı; `npx vitest run content/tools` → 10/10.

## Okur turu 2 düzeltmeleri (2026-11-18)
Okur ikinci turda 146 maddeden 2'sini geri çevirdi; ikisi de düzeltildi. Statü `draft` kaldı.

| # | Kimlik | Önce → Sonra |
|---|---|---|
| 1 | essen `roleplay.goals` g4 `tr` ve `de` | "Nasıl ödeyeceğin netleşti. Anlamadığını Almanca sordun." → "Nakit mi kartla mı ödeyeceğin netleşti." Almanca hedef de tek fikre indi: "Die Zahlungsart ist geklärt; Unklares wurde auf Deutsch nachgefragt." → "Die Zahlungsart (bar oder Karte) ist geklärt." Soru sormadan biten konuşma artık hedefi bozmuyor. |
| 2 | arbeit `roleplay.goals` g3 `tr` | "Hitabın doğru: Derya'ya du, şefe Sie dedin." → "Derya'ya du dedin. Şefe, o du demeyi önerene kadar Sie dedin." Almanca hedefteki "oder duzen nach Angebot" artık Türkçede de var; Almanca metin değişmedi. |

Okurun gözlemi (arbeit senaryo `mistakes_tr[2]` ve `ch:arbeit:ich-bin-name` `mistakes_tr[1]`): metin **değişmedi**, kaynakla örtüşüyor. Kaynak (karrierebibel, duzen-siezen; 18.11.2026'da yeniden okundu) koşul koymuyor: kutlamada önerilen du yalnızca şimdilik geçerlidir ve ertesi sabah önce yeniden Sie denir. Yazarın eski metnindeki "belirsizse" koşulu kaynakta yok; yeni metin ("ertesi gün yine Sie ile başla") kaynağa daha yakın. Kaynağın devamı (şef "biz du diyorduk" derse du sürer) tek fikir kuralı gereği bu maddeye eklenmedi; `arbeit/SOURCES.md`'de duruyor.

Doğrulama: `npm run content:validate` → 0 hata.
