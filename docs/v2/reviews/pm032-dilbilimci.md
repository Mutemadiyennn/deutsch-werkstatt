İLERLEME: 5/5 dosya · okur turları kapandı · exp eklendi (bölüm 10) · PM-044 düzeltmeleri yapıldı (bölüm 11), okur bekliyor · doğrulama geçti · 2026-11-18

# PM-032 / PM-035 — dilbilimci incelemesi (2026-11-18)

İnceleyen: dilbilimci-ajan. Kapsam: yazarın `pm032-yazar.md` raporundaki beş senaryo. strategie/01 baştan sona, diğer dördü de tamamı okunarak incelendi (yalnızca değişen kimlikler değil). Durum beş dosyada da `draft`; `review.notes` sonuna "dilbilimci: KAPANDI (2026-11-18), okur bekliyor" eklendi.

## 1. Sayılar

| Dosya | Madde | Hata | İyileştirme | Hata oranı |
|---|---|---|---|---|
| strategie/01-nicht-verstanden | 187 | 6 | 4 | %3,2 |
| telefon/01-arzttermin | 193 | 2 | 5 | %1,0 |
| essen/m1-weihnachtsmarkt | 150 | 3 | 4 | %2,0 |
| freizeit/m1-gluehwein-einladung | 137 | 2 | 3 | %1,5 |
| arbeit/m1-weihnachtsfeier | 143 | 1 | 3 | %0,7 |
| **Toplam** | **810** | **14** | **19** | **%1,7** |

Madde = ifade, karşı taraf cümlesi, cevap seçeneği, build, drill, diyalog satırı, rol oyunu öğesi, dinleme satırı ve sorusu, konuşma, görev, mistakes_tr. "Hata" = yanlış kabul, haksız ret riski, yanlış ya da bozuk açıklama, kaynaksız bölgesel biçim. "İyileştirme" = doğru ama daha iyi yapılabilen.

Almanca dilbilgisi hatası (artikel, hâl, Perfekt, kelime sırası) bulunmadı. Hataların 6'sı yeniden yazılan maddelerde eski kabul varyantlarının kalmasından geliyor.

## 2. Doğrulama

- `npm run content:validate` → 0 hata, 61 uyarı (öncekiyle aynı).
- `npm run content:validate -- --strict` → bu beş dosyada "öğretmeden isteme" 0, başka hata da 0. Toplam 86 strict hatası değişmedi, hepsi başka dosyalarda.
- `content:explain-audit` → beş dosyada 0 aykırı (36 / 32 / 41 / 14 / 23 açıklama). Düzeltmelerden sonraki çalıştırma `--out` ile geçici dosyaya yazıldı; depodaki `docs/v2/reports/aciklama-tarama.md` ile farkı yok.
- `npx vitest run content/tools` → 10/10. `npm test` → 102/102.

## 3. "Nehmen S' auch Karte?" kaynağı

- Aday PDF açıldı (dialekte.schule.bayern.de, "Wie Sie Bairisch sprechen, ohne sich zu blamieren", Süddeutsche Zeitung 27.10.2022 yazısına dayalı ders malzemesi). Fiilden sonra kısalan **Sie** biçimi (Kommen S', Nehmen S', Haben S') metinde **hiç geçmiyor**. Doğrulamıyor.
- essen/SOURCES.md'deki GfdS kaynağı (Passauer Neue Presse) yeniden açıldı. Yalnızca düzeneği doğruluyor: Bairisch'te kibar **Sie** fiile eklenen **s** olur, örnek "Hams des gsehgn?". Kesmeli **S'** yazımı ve "Nehmen S' auch Karte?" cümlesi orada yok.
- Karar (görev talimatına göre): `ch:essen:mit-karte` Alltag katmanı **Nehmen Sie auch Karte?** oldu. Dil gerekçesi de var: bu, öğrencinin kendi söyleyeceği cümle; bölgesel kısaltmayı üretmesi beklenmez, yalnızca duyunca tanıması gerekir.
- **S'** tanıtımı kaybolmadı: aynı kartın ipucu artık "Güneyde hızlı konuşmada **Sie** kısalır, **S'** gibi duyulur." Bu, GfdS'nin doğruladığı düzenek. Satıcının `bringen S'`, `kriegen S'`, `Wollen S'` satırları ayrıca `reductions` ile açılıyor.
- `Nehmen S' auch Karte?` b08, d14 ve v1 kabul listelerinde ikinci sıralarda kaldı (duyduğunu söyleyen öğrenci haksız ret yemesin).
- **Açık iş (benim yazma yolumda değil):** `content/v2/domains/essen/SOURCES.md` satır 28 hâlâ "Nehmen S' auch Karte?" cümlesini Alltag katmanı olarak listeliyor. Öneri: o parantez silinsin, yerine "GfdS yalnızca Sie → s düzeneğini doğrular; öğrencinin cümlesi tam biçimle yazıldı" notu.

## 4. Düzeltmeler (önce → sonra)

### strategie/01-nicht-verstanden — tam inceleme

Hatalar:
1. `b17` accepted: `Sie sprechen sehr schnell.` çıkarıldı. İstem "fazla hızlı" (zu). **sehr** kabul edilirse maddenin öğrettiği ayrım (Türkçe "çok" hem sehr hem zu) kaybolur. Eklendi: `Sie sprechen viel zu schnell.`
2. `b23` accepted: `… Dreizehn oder dreißig?` çıkarıldı (eski istemden kalma, "bana yazabilir misiniz" ile örtüşmüyor). Üç doğru varyant eklendi.
3. `d28` accepted: `Ja, klar. Was gibt's?` ve `Ja, klar.` çıkarıldı. Durum "anlamadın, tekrar iste"; bunlar anlamış gibi cevap. Eklendi: `Hab ich nicht verstanden.`, `Nochmal, bitte.`, `Wie bitte? Nochmal, bitte?`, `Noch mal, bitte?`
4. `d30` accepted: `Ich habe nur „Montag“ verstanden.`, `Den letzten Satz.` ve iki benzeri çıkarıldı. Durum "Kaution kelimesini anlamadın, hangi kelime olduğunu söyle". Eklendi: `„Kaution“ habe ich nicht verstanden.`, `Das Wort „Kaution“ kenne ich nicht.`, `Das Wort „Kaution“ verstehe ich nicht.`, `Was heißt „Kaution“?`, `„Kaution“.`
5. `d13` (sıralama): tek kabul vardı. `Können Sie mir das aufschreiben, bitte?` ve `Können Sie mir bitte das aufschreiben?` eklendi (haksız ret riski; d09 ve d12'de eşdeğeri zaten vardı).
6. `ch:strategie:dialekt.exp.ipucu_tr`: "Güneyde **Sie** kısalıp **S'** olur: **Haben S'** demek **Haben Sie** demektir." → "Bunu söyleyince çoğu kişi lehçeyi bırakıp daha anlaşılır konuşur." OD-9.2 §4: ipucu ekrandaki ifadeyi anlatmalı; kartta **Sie** yok. `Haben S'` zaten o04 ve h1'de `reductions` ile açılıyor, d25 de bu cümleyi anlamayı değil "lehçeyi anlamıyorum" demeyi istiyor.

İyileştirmeler:
- `ch:strategie:nicht-verstanden.alltag_exp.anlam_tr`: "Bunu şimdi kaçırdım." → "Şimdi bunu anlamadım." (çipler "anlamadım" diyor; anlam satırı çiplerle aynı fiili kullanmalı).
- `ch:strategie:aufschreiben.mistakes_tr[0]`: "**Schreiben Sie das auf** ama **Könnten Sie das aufschreiben?** dersin." → "**Könnten Sie** ile kurunca **aufschreiben** bölünmez: **Könnten Sie das aufschreiben?**"
- v2 son öğrenci satırı accepted: `Okay, danke für die Info!` → `Würden Sie mir das bitte aufschreiben?` (ipucu "yazmasını rica et").
- `d34`: iki varyant eklendi.

Doğru bulunan ve dokunulmayanlar: 14 ifadenin Almancası ve Alltag biçimleri (`Hab ich jetzt nicht verstanden.`, `Ich hab's nicht ganz mitgekriegt.`, `Was heißt'n …?`, `Schreiben Sie's mir kurz auf?`, `Mit dem Dialekt tu ich mich noch schwer.`) gerçekten konuşulan biçimler. Çipler anlamla örtüşüyor. Örnek kelimeli üç ifadenin Türkçesi (Kaution, Kaminkehrer, Montag) doğru. Rol oyunu ve iki dinleme parçasında hata yok. Yer tutucu gerektiren öğrenci satırı yok.

### telefon/01-arzttermin

Hatalar:
1. `ch:telefon:passt-mir.exp.ipucu_tr`: "Uymuyorsa sona **leider nicht** eklersin: …" → "Uymuyorsa **gut** yerine **leider nicht** dersin: **Das passt mir leider nicht.**" Eski tarif uygulanınca "Das passt mir gut leider nicht" çıkıyordu.
2. `d27.situation_tr`: "Randevu istiyorsun. Selam ver ve adını söyle." → "Selam ver, adını söyle ve randevu iste. (Huber sekreterin adı.)" Beklenen cevap randevu cümlesini de içeriyor; yönerge bunu istemiyordu. Üç varyant eklendi.

İyileştirmeler:
- `b11` ve `d37`: accepted[0] `Haben Sie am Donnerstag / am Nachmittag etwas frei?` → `… einen Termin frei?` Bu senaryoda **etwas** yalnızca "biraz" anlamıyla öğretiliyor (etwas langsamer); "bir şey" anlamı öğretilmedi. Doğrulayıcı kelimeye bakıp anlama bakmadığı için yakalamıyor. Eski biçimler kabul listesinde duruyor.
- `d34`: accepted[0] `Geht es Donnerstag am Vormittag?` → `Geht es am Donnerstag am Vormittag?` (ifade kartındaki **am + gün** ile aynı). Dört varyant eklendi (`Donnerstagvormittag` biçimleri).
- `d04`, `d39` (seçmeli): doğru şık 0. sıradan 1. ve 2. sıraya alındı. Oynatıcı şıkları karıştırmıyor (17.11 incelemesindeki bulgu).
- `roleplay.partner_de`: "ob die Person schon Patient ist" → "ob die Person schon einmal in der Praxis war". Yapay zekâ kadın öğrenciye "Patient" demesin (D-061).

Doğru bulunanlar: `ch:telefon:mein-name` (iki katman, çipler, **hier** açıklaması). `{name}` ve `{Patient|Patientin}` bütün öğrenci satırlarında ve sekreterin öğrenciye sorduğu soruda doğru yerde; sabit ad ya da cinsiyet kalmamış. Dinleme parçalarındaki Petrović ve "Patient/Patientin" başka arayanlar. Harf kodlama: K Köln, A Aachen (DIN 5009:2022) ve K Kaufmann, A Anton (eski tablo) telefon/SOURCES.md ile örtüşüyor; iki tablo da her maddede kabul ediliyor.

### essen/m1-weihnachtsmarkt

Hatalar:
1. `ch:essen:mit-karte` Alltag: `Nehmen S' auch Karte?` → `Nehmen Sie auch Karte?`; çip `Nehmen S'` → `Nehmen Sie` ("alır mısınız"); ipucu yeniden yazıldı (bkz. §3).
2. `ch:essen:tasse-zurueck.alltag_exp.ipucu_tr`: "Konuşmada **bringe** sondaki **e** düşer ve **bring** olur." → "Konuşmada **bringe** kelimesinin sonundaki **e** düşer, **bring** olur." (Türkçe cümle bozuktu.)
3. `d18` accepted: `Wo ist der Stand nebenan?` çıkarıldı (durum "nebenan kelimesini anlamadın, ne demek olduğunu sor"). Eklendi: `Entschuldigung, was bedeutet nebenan?`, `Was bedeutet nebenan?`

İyileştirmeler:
- `ch:essen:einen-gluehwein.alltag_exp.ipucu_tr`: "Stantta sayıyı **einmal** gibi söylemek çok yaygındır." → "Siparişte **einen** yerine **einmal** demek çok yaygındır."
- `ch:essen:pfand-zurueck.exp.ne_zaman_tr`: "Bardağı geri verirken parayı isterken." → "Bardağı geri verip paranı isterken."
- v2 diyalog accepted: `Ach so. Wo ist der Stand nebenan?` → `Was bedeutet nebenan?`
- v1 "Geht es auch mit Karte?" satırına `Nehmen Sie auch Karte?` eklendi.

Doğru bulunanlar: `Kostet die Tasse Pfand?` (b11, d12) doğal ve öğretilmiş kelimelerle kurulu. `Krieg ich das Pfand zurück?`, `Passt so.`, `Ich bring die Tasse zurück.` gerçek kullanım. Fiyat hesabı tutarlı (13 € + 9 € Pfand, 25 € verilince 3 € üstü; 5 € + 4 € = 9 €).

### freizeit/m1-gluehwein-einladung

Hatalar:
1. `d05` şıklar: `mit / nach / an` → `mit / bei / zu`. "Ich komme nach." doğru bir Almanca cümle ve bu senaryonun ek ifadesi (ch:freizeit:komme-nach); "Ich komme an." de dilbilgisi açısından doğru. Yanlış şık doğru cümle kurmamalı.
2. `d18` accepted: `Alles klar, ich komme etwas später.` → `Gut, bis gleich!` (durum "tamam de ve birazdan görüşürüz de").

İyileştirmeler:
- `mistakes_tr[4]`: örnek `gebacken` → `gegessen` (gebacken artık temel öğe değil; b11, d08, d16 gegessen çalıştırıyor).
- v1 accepted: `Am Sonntag schon? Zündet ihr dann die erste Kerze an?` → `Und du? Hast du schon einen Adventskranz?` (ipucu "aynı soruyu Tobi'ye sor").
- `b15`: `Hast du Plätzchen gemacht?`, `Hast du Plätzchen gebacken?` eklendi.

Doğru bulunanlar: `Kommste mit auf 'nen Glühwein?`, `Klar, bin dabei!`, `Heut geht's leider nicht.` gerçek kullanım; yeni exp/alltag_exp anlam ve çipleri doğru. `Plätzchen machen` gündelikte doğal. Bairisch (Servus, Passt scho, Pfiat di) değişmedi, kaynaklı.

### arbeit/m1-weihnachtsfeier

Hata:
1. `ch:arbeit:namen-gezogen.alltag_exp.ipucu_tr`: "Konuşmada **habe** sonundaki **e** düşer ve **hab** olur." → "Konuşmada **habe** kelimesinin sonundaki **e** düşer, **hab** olur."

İyileştirmeler:
- `b08.prompt_tr`: "Noel'de burada kalıyorum. Ya sen? (du ile)" → "Burada kalıyorum. Ya sen? (du ile)". Beklenen ilk cevap `Ich bleibe hier. Und du?`; "Noel'de" b15'te ayrıca çalışılıyor. Bir varyant eklendi.
- `b11.prompt_tr`: "Sen de isim çektin mi bile?" → "İsim çektin mi bile? (du ile)" (beklenen cevapta **auch** yok).
- v1, 8. satır: `Mache ich. Was heißt „Wichteln“?` → `Danke. Was heißt „Wichteln“?` (tr, starter, hint_tr uyarlandı). "Mache ich." kalıbı bu senaryoda öğretilmiyor; doğrulayıcı `machst` ile benzerlikten geçiriyordu. Eski biçimler kabul listesinde.

Doğru bulunanlar: `Ich hab schon gezogen.`, `Da kann ich leider nicht.`, `Danke, ich bin dabei!` gerçek kullanım. `{name}` öğrencinin satırlarında ve şefin öğrenciye hitabında (`Freut mich, {name}.`) doğru.

## 5. Okur için: bu turda değişen açıklama kimlikleri

- strategie: `ch:strategie:nicht-verstanden.alltag_exp.anlam_tr` · `ch:strategie:aufschreiben.mistakes_tr[0]` · `ch:strategie:dialekt.exp.ipucu_tr`
- telefon: `ch:telefon:passt-mir.exp.ipucu_tr` · `d27.situation_tr`
- essen: `ch:essen:mit-karte.layers.alltag`, `.alltag_exp.parcalar[0]`, `.alltag_exp.ipucu_tr` · `ch:essen:einen-gluehwein.alltag_exp.ipucu_tr` · `ch:essen:tasse-zurueck.alltag_exp.ipucu_tr` · `ch:essen:pfand-zurueck.exp.ne_zaman_tr`
- freizeit: `mistakes_tr[4]`
- arbeit: `ch:arbeit:namen-gezogen.alltag_exp.ipucu_tr` · `b08.prompt_tr` · `b11.prompt_tr` · v1 8. satır (`tr`, `hint_tr`)

Yazarın 5. bölümündeki öbür bütün kimlikler dil açısından doğru bulundu ve değişmedi; okur onları yazarın listesinden okur.

## 6. Yazarın açık sorularına dil açısından görüş

1. **Kendi adını harf harf söyleme:** Katılıyorum, cihazdaki addan üretilmeli; iki tablo da kabul edilmeli. Dikkat: Türkçe harfler (ç, ğ, ı, ş) iki tabloda da yok. Bunların nasıl söyleneceği kaynakla doğrulanmadan madde üretilmemeli.
2. **Doğum tarihi:** Köprü dersi gerekli. Kısa yol var: Alltag biçimi (`Zwölfter Dritter achtundachtzig`) yalnızca 1–31 sıra sayılarını ve iki haneli sayıyı ister, ay adını istemez. Köprü önce bunu öğretirse öğrenci kendi tarihini daha erken söyler.
3. **Yer tutucuların seslendirilmesi:** "Patient/Patientin" diye okunan ses yanlış Almanca öğretir. Hitap yoksa cinsiyetsiz Alltag cümlesi okunmalı: `Ja, ich war schon mal bei Ihnen.`
4. **Stage12'de Hochdeutsch çipleri:** Dil açısından önemli. Alltag katmanı başka bir cümle olan kartlarda öğrenci Hochdeutsch cümlesini üretiyor ama çiplerini hiç görmüyor: strategie `was-meinen` (`Was meinen Sie mit …?` / `Wie meinen Sie das?`), `einfacher`, `aufschreiben`; telefon `dringend`, `geht-klar`; arbeit `komme-gern`, `muss-absagen`. İki katmanın çipleri de gösterilmeli.
5. **8–12 yeni öğe:** telefon/01'de 35 temel öğe bir derste fazla. Doğal bölme: (a) açılış, randevu isteme, saat; (b) sekreterin soruları (hasta mı, doğum tarihi, sigorta, harf kodlama); (c) engeller (acil, rapor, tekrar ettirme). Karar baş geliştiricide.
6. **Belirti cümleleri:** `Worum geht's denn?` sorusuna şu an tek cevap `Es ist dringend.` Gerçek sekreter nedenini sorar. arzt/01 önce geliyorsa `requires` ile bir belirti cümlesi geri konmalı.
7. **Nehmen S':** kapandı, bkz. §3.
8. Uygun.
9. **freizeit o14 Kinderpunsch:** `responses` kullanılmadığı sürece zararsız. Alan arayüze bağlanırsa seçenek çıkarılmalı ya da kelime temel listeye alınmalı.
10. Uygun.

## 7. Kalan şüpheler ve başka dosyadaki bulgular (düzeltilmedi)

- `content/v2/domains/essen/SOURCES.md` satır 28 güncel değil (§3).
- telefon v2 ve v3 başka muayenehanelerde geçiyor (Dr. Berger, Dr. Yıldız). H4 dünyaya bağlama (öğrencinin kendi aile hekimi ve sekreteri) hâlâ bekliyor; `review.notes` bunu zaten söylüyor. Dil hatası değil.
- arbeit v3 ilk öğrenci satırı: şef "Wie gefällt Ihnen die Feier?" diye soruyor, öğrenci yalnızca teşekkür ediyor. Kabul edilebilir ama soruya cevap değil. `Sehr schön, danke!` öğretilirse daha doğal olur (yeni öğe gerektirir, yazarın işi).
- `content/tools/teach.ts`: kelimenin anlamına bakmıyor (`etwas` örneği) ve 4 harflik önek benzerliği (`mache` ≈ `machst`) öğretilmemiş kalıpları geçiriyor. Araç notu, baş geliştiriciye.
- `content:explain-audit` varsayılan olarak `docs/v2/reports/aciklama-tarama.md` dosyasını yeniden yazıyor. İnceleme ajanları `--out` ile geçici yola yazmalı.

## 8. Sonuç

**KAPANDI** (dil). Beş dosyada bilinen dil hatası kalmadı. Durum `draft` kalıyor: okur kontrolü (OD-9.3 katman 2) ve yukarıdaki SOURCES.md satırı bekliyor.

## 9. Okur turu 1 düzeltmeleri (2026-11-18)

Kaynak: `docs/v2/reviews/okur/pm032.md`, 56 GERİ (telefon 20, strategie 23, essen 6, freizeit 4, arbeit 3). Hepsi düzeltildi. Okur tur 2 yalnızca aşağıdaki kimlikleri okur. Durum beş dosyada `draft`.

Doğrulama: `content:validate` 0 hata · `--strict` beş dosyada 0 hata ("öğretmeden isteme" 0) · `content:explain-audit --out /tmp/audit.md` beş dosyada 0 aykırı · `vitest run content/tools` 10/10.

"Öğretmeden isteme" GERİ'leri nasıl çözüldü (hepsi maddeyi kart ön yüzünde ya da gündelik panelde görünen içerikle yeniden yazarak; yeni ifade eklenmedi):
- telefon `b04`: olumsuz cevap (`Nein, ich war noch nicht bei Ihnen.`) hiçbir kartın ön yüzünde yok. Madde karttaki gündelik cümleyi isteyecek biçimde yeniden yazıldı. telefon/01 zaten 15 temel ifadede (doğrulayıcı üst sınırı), 16. ifade eklenemedi.
- telefon `b11`, `d37`: `Haben Sie … frei?` kalıbı bırakıldı; ikisi de karttaki `Geht es auch …?` kalıbıyla kuruluyor (`am Donnerstag`, `heute`).
- strategie `b07`: karttaki gündelik biçim (`Ich lern noch Deutsch.`) isteniyor. `b26`: karttaki `Ein bisschen langsamer, bitte.` isteniyor; `Nicht so schnell!` kabul listesinde kaldı.
- essen `b11`, `d12`: `Kostet die Tasse Pfand?` yerine karttaki `Was kostet …?` kalıbıyla `Was kostet das Pfand?`.
- freizeit `b11`, `b15`, `d16`: `gegessen`, `gemacht`, `gebacken` yerine kartta görünen `gebracht`. `mistakes_tr` örneği de buna çekildi (okur listesinde yoktu, tutarlılık için).

Kapandı (koordinatör kararı, aşağıdaki ek tablo): telefon/01'de ilk kez arayan öğrencinin "hayır, daha önce gelmedim" cevabı kart ön yüzünde öğretilmiyor, ama `d29` ve v2 diyaloğu bunu hâlâ istiyor (okur bu ikisini GERİ saymadı). Çözüm ya ifade sınırını aşan 16. kart ya da senaryonun bölünmesi (§6, madde 5).

Kimlik → önce → sonra (liste değerlerinde varyantlar ` / ` ile ayrıldı):

**telefon**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:telefon:schon-patient.alltag_exp.ne_zaman_tr` | Aynı soruya rahat cevap, herkes aynı biçimde söyler. | Sekreter daha önce gelip gelmediğini sorunca. |
| `ch:telefon:wie-war-das.alltag_exp.ne_zaman_tr` | Aynı durumda, biraz daha rahat bir soruş. | Saati ya da adı kaçırınca, rahat bir soruş. |
| `ch:telefon:buchstabiere.alltag_exp.ne_zaman_tr` | Telefonda sekreterler çoğu zaman bu eski tabloyu kullanır. | Adını söyledikten sonra, yanlış yazılmasın diye. |
| `ch:telefon:geburtsdatum.alltag_exp.ne_zaman_tr` | Sekreter hızlı sorup tekrar ederken böyle duyarsın. | Sekreter doğum tarihini sorunca, kısa cevap olarak. |
| `ch:telefon:geht-klar.alltag_exp.ne_zaman_tr` | Aynı anda, daha sıcak bir onay olarak. | Randevu kesinleşince, sıcak bir onay olarak. |
| `ch:telefon:wiederhoeren.bair.note_tr` | Bavyera'da resmî vedalaşma olarak duyulduğu bilinir. Bu biçim için kaynak doğrulanmadı. | Bavyera'da kibar bir vedalaşma olarak duyabilirsin. |
| `o01.tr` | Dr. Weber muayenehanesi, (ben) Huber, merhaba? — 'Huber' sekreterin soyadıdır. | Dr. Weber muayenehanesi, ben Huber, merhaba? |
| `o07.tr` | Hangi sağlık sigortası? ('Kasse' = Krankenkasse) | Hangi sağlık sigortası? |
| `b04.prompt_tr` | Hayır, size daha önce gelmedim. | Evet, daha önce size gelmiştim. (rahat biçim) |
| `b04.accepted` | Nein, ich war noch nicht bei Ihnen. / Nein, noch nicht. / Nein, ich war noch nie bei Ihnen. / Nein, ich komme zum ersten Mal. / Nein, ich bin neu bei Ihnen. / Nein, ich war noch nicht da. | Ja, ich war schon mal bei Ihnen. / Ja, ich war schon einmal bei Ihnen. / Ja, ich war schon bei Ihnen. / Ja, ich bin schon {Patient\|Patientin} bei Ihnen. / Ja, ich war schon da. / Ja, ich war schon mal da. |
| `b11.prompt_tr` | Perşembe günü boş bir yeriniz var mı? | Perşembe günü de olur mu? |
| `b11.accepted` | Haben Sie am Donnerstag einen Termin frei? / Haben Sie am Donnerstag etwas frei? / Haben Sie Donnerstag etwas frei? / Haben Sie am Donnerstag noch etwas frei? / Ist am Donnerstag etwas frei? / Haben Sie am Donnerstag was frei? / Geht es auch am Donnerstag? / Haben Sie am Donnerstag noch einen Termin frei? / Haben Sie am Donnerstag einen Termin? | Geht es auch am Donnerstag? / Geht's auch am Donnerstag? / Geht es am Donnerstag auch? / Geht es auch Donnerstag? / Ginge es auch am Donnerstag? / Geht's am Donnerstag auch? |
| `b20.prompt_tr` | Eski (kişi adlı) tabloyla, rahat biçimde iki harf söyle: K Kaufmann gibi, A Anton gibi. | Kişi adlarıyla, rahat biçimde iki harf söyle: K Kaufmann gibi, A Anton gibi. |
| `d06.why_tr` | **mir** ile birlikte **Das passt mir** dersin. **Das geht** de olur demektir. Ama **Das geht mir gut** denmez. | **mir** ile birlikte **passt** gelir: **Das passt mir gut.** |
| `d18.instr_tr` | Saati 'halb' ile söyle. | Saati halb kelimesiyle söyle. |
| `d37.tr` | Öğleden sonra boş bir yeriniz var mı? | Bugün de olur mu? |
| `d37.accepted` | Haben Sie am Nachmittag einen Termin frei? / Haben Sie am Nachmittag etwas frei? / Haben Sie nachmittags etwas frei? / Haben Sie am Nachmittag noch etwas frei? / Ist am Nachmittag etwas frei? / Haben Sie am Nachmittag was frei? / Geht es auch am Nachmittag? / Haben Sie am Nachmittag noch einen Termin frei? / Haben Sie am Nachmittag einen Termin? | Geht es auch heute? / Geht's auch heute? / Geht es heute auch? / Geht es auch heute noch? / Geht's heute auch? / Geht heute auch? |
| `d39.q_tr` | 'halb zehn' saat kaçtır? | **halb zehn** saat kaçtır? |
| `roleplay:g2.tr` | Gün ve saat doğru anlaşıldı (ör. halb zehn = 9:30) | Gün ve saat doğru anlaşıldı |
| `roleplay:g3.tr` | Bilgiler verildi: ad (gerekirse kodlanarak), doğum tarihi, sigorta | Bilgiler verildi: ad, doğum tarihi, sigorta |
| `roleplay:surprise[1].tr` | Sistem takıldı; adınızı bir daha harf harf söyleyebilir misiniz? | Sistem takıldı. Adınızı bir daha harf harf söyleyebilir misiniz? |
| `h1:q3.q_tr` | 'Huber' kimin adı? | Huber kimin adı? |
| `speaking[3].task_tr` | Üç hafta sonrası teklif edildi: daha erken iste, acil olduğunu söyle ve bugün gelip gelemeyeceğini sor. | Üç hafta sonrası teklif edildi. Daha erken iste ve acil olduğunu söyle. Bugün gelip gelemeyeceğini sor. |

**strategie**

| Kimlik | Önce | Sonra |
|---|---|---|
| `scenario.goal_tr` | Anlamadığında konuşmayı bırakmadan ve İngilizceye kaçmadan Almanca tepki vermek: tekrar ettirmek, yavaşlatmak, bir kelimenin anlamını sormak, anladığın parçayı söylemek ve sonunda anladığını göstermek. | Anlamadığında susmadan ve İngilizceye kaçmadan Almanca tepki vermek. Tekrar ettirmek, yavaşlatmak ve kelime sormak. Sonunda anladığını göstermek. |
| `ch:strategie:nicht-verstanden.mistakes_tr[0]` | Az önceki cümle için **Das habe ich nicht verstanden** daha doğaldır. | Az önce söyleneni anlamadıysan **Ich verstehe nicht** yerine **Das habe ich nicht verstanden** dersin. |
| `ch:strategie:wie-bitte.alltag_exp.ipucu_tr` | **Hä?** yalnızca yakın arkadaşlar arasında söylenir, yabancıya kaba gelir. | Sesin sonda yükselirse **Bitte?** soru olur ve kibar duyulur. |
| `ch:strategie:dialekt.alltag_exp.ne_zaman_tr` | Aynı durum, daha gündelik bir söyleyiş. | Biri lehçeyle konuşunca, rahat bir söyleyiş. |
| `ch:strategie:dialekt.alltag_exp.ipucu_tr` | **sich schwertun mit** bir şeyde zorlanmak demektir. | **tu ich mich schwer** zorlanıyorum demektir, kelimeler ayrı durur. |
| `b07.prompt_tr` | Almancam henüz o kadar iyi değil. | Hâlâ Almanca öğreniyorum. (gündelik, kısa biçim) |
| `b07.accepted` | Mein Deutsch ist noch nicht so gut. / Ich spreche noch nicht so gut Deutsch. / So gut ist mein Deutsch noch nicht. / Ich kann noch nicht so gut Deutsch. / Mein Deutsch ist noch nicht gut. / Mein Deutsch ist nicht so gut. / Ich spreche noch nicht so gut. | Ich lern noch Deutsch. / Ich lerne noch Deutsch. / Ich lern immer noch Deutsch. / Ich lerne immer noch Deutsch. / Ich lern noch. |
| `b20.prompt_tr` | Tekrar eder misiniz? (Würden Sie …) | Tekrar eder misiniz? (Würden Sie ile) |
| `b26.prompt_tr` | (Arkadaşına) Yavaş, yavaş! O kadar hızlı gitme! | (Arkadaşına, gündelik) Biraz daha yavaş, lütfen. |
| `b26.accepted` | Langsam, langsam! Nicht so schnell! / Nicht so schnell! / Mach mal langsam! / Nicht so schnell, bitte! / Langsam, langsam! / Langsam! Nicht so schnell! | Ein bisschen langsamer, bitte. / Etwas langsamer, bitte. / Bitte ein bisschen langsamer. / Langsamer, bitte. / Ein bisschen langsamer, bitte! / Nicht so schnell, bitte! / Langsam, langsam! Nicht so schnell! / Mach mal langsam! |
| `d14.instr_tr` | Kibar rica yap (Würden Sie …?). | Würden Sie ile kibar bir rica yap. |
| `d18.instr_tr` | Aynı soruyu bedeuten fiiliyle sor. | Aynı soruyu bedeuten kelimesiyle sor. |
| `d19.instr_tr` | 'nicht ganz' ile söyle (kısmen anladın). | Kısmen anladın, nicht ganz ekleyerek söyle. |
| `d20.situation_tr` | Kasiyer hızlı bir şey sordu; anlamadın. | Kasiyer hızlı bir şey sordu. Anlamadın, tekrar iste. |
| `d22.situation_tr` | Karşı taraf İngilizceye geçmek istiyor; kibarca Almanca devam et. | Karşı taraf İngilizceye geçmek istiyor. Kibarca Almanca devam et. |
| `d25.situation_tr` | Komşu güney ağzıyla konuştu; lehçeyi anlamadığını söyle. | Komşu güney ağzıyla konuştu. Lehçeyi anlamadığını söyle. |
| `d27.situation_tr` | Anlamadın; tekrar iste. | Anlamadın. Tekrar iste. |
| `d31.situation_tr` | Şimdi anladın; teşekkür et. | Şimdi anladın. Teşekkür et. |
| `d33.situation_tr` | Anlamadın; tekrar iste. | Anlamadın. Tekrar iste. |
| `d38.q_tr` | Kasada 'Sammeln Sie Punkte?' sorusunu anlamadın. En iyi tepki hangisi? | Kasada kasiyerin hızlı sorusunu anlamadın. En iyi tepki hangisi? |
| `v2#3.tr` | 'Kaminkehrer' derken? Bu kelimeyi bilmiyorum. | Kaminkehrer derken neyi kastediyorsunuz? Bu kelimeyi bilmiyorum. |
| `v3#1.hint_tr` | Çok hızlı olduğunu söyle; yavaşlamasını rica et. | Çok hızlı olduğunu söyle. Yavaşlamasını rica et. |
| `roleplay.scene_tr` | Merdivende yaşlı komşunla karşılaşıyorsun. Hızlı ve güney ağzıyla konuşuyor; çöp günlerindeki değişikliği ve yarın gelecek baca temizleyicisini anlatıyor. Anlamadığın yerde Almanca tekrar ettir, yavaşlat, kelime sor. İngilizceye geçme. | Merdivende yaşlı komşunla karşılaşıyorsun. Hızlı ve güney ağzıyla konuşuyor. Çöp günlerini ve yarın gelecek baca temizleyicisini anlatıyor. Anlamadığın yerde Almanca tekrar ettir, yavaşlat, kelime sor. İngilizceye geçme. |
| `speaking[2].task_tr` | Karşı taraf başka dile geçmek istiyor: kibarca reddet, Almanca devam et ve yavaşlamasını rica et. | Karşı taraf başka dile geçmek istiyor. Kibarca reddet ve Almanca devam et. Yavaşlamasını da rica et. |
| `m1.task_tr` | Bugün dışarıda (markette, fırında, işte) en az bir kez anlamadığını Almanca söyle ve tekrar ettir; İngilizceye geçme. Karşı tarafın nasıl tepki verdiğini (yavaşladı mı, başka kelimeyle mi anlattı) ve ikinci seferde anlayıp anlamadığını not et. | Bugün dışarıda en az bir kez anlamadığını Almanca söyle ve tekrar ettir. İngilizceye geçme. Karşı tarafın nasıl tepki verdiğini not et. İkinci seferde anlayıp anlamadığını da yaz. |

**essen**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:essen:stimmt-so.alltag_exp.ne_zaman_tr` | Aynı durumda, Bavyera'da çok sık duyarsın. | Para üstünü bahşiş bırakırken, Bavyera'da çok duyarsın. |
| `o12.tr` | Şu bardak yandaki standın; onu maalesef alamıyorum. | Şu bardak yandaki standın. Onu maalesef alamıyorum. |
| `b11.prompt_tr` | Bardağın depozitosu var mı? | Depozito ne kadar? |
| `b11.accepted` | Kostet die Tasse Pfand? / Ist da Pfand drauf? / Ist auf der Tasse Pfand? / Gibt es Pfand auf die Tasse? / Gibt es Pfand für die Tasse? / Kostet die Tasse auch Pfand? | Was kostet das Pfand? / Wie viel kostet das Pfand? / Wie viel Pfand kostet die Tasse? / Was kostet das Pfand für die Tasse? / Wie hoch ist das Pfand? / Wie viel Pfand ist auf der Tasse? / Wie viel ist das Pfand? |
| `d12.tr` | Bardağın depozitosu var mı? | Bardağın depozitosu ne kadar? |
| `d12.accepted` | Kostet die Tasse Pfand? / Ist da Pfand drauf? / Ist auf der Tasse Pfand? / Gibt es Pfand auf die Tasse? / Gibt es Pfand für die Tasse? / Muss ich für die Tasse Pfand zahlen? | Was kostet das Pfand? / Wie viel kostet das Pfand? / Wie viel Pfand kostet die Tasse? / Was kostet das Pfand für die Tasse? / Wie hoch ist das Pfand? / Wie viel Pfand ist auf der Tasse? / Wie viel ist das Pfand? |
| `v2#2.tr` | Bir saniye… Şu ikisi bizim. Şu yandaki standın; onu maalesef alamıyorum. | Bir saniye. Şu ikisi bizim. Şu yandaki standın, onu maalesef alamıyorum. |
| `speaking[0].task_tr` | Glühwein standında üç kişi için sipariş ver. İlave içki isteme ve toplamı sor. | Glühwein standında iki Glühwein ve bir Kinderpunsch iste. İlave içki istemediğini söyle ve toplamı sor. |

**freizeit**

| Kimlik | Önce | Sonra |
|---|---|---|
| `b11.prompt_tr` | Kurabiye yedim. (geçmiş) | Sana kurabiye getirdim. (du ile) |
| `b11.accepted` | Ich habe Plätzchen gegessen. / Ich hab Plätzchen gegessen. / Plätzchen habe ich gegessen. / Ich habe schon Plätzchen gegessen. / Ich habe ein paar Plätzchen gegessen. | Ich habe dir Plätzchen gebracht. / Ich hab dir Plätzchen gebracht. / Ich habe dir Plätzchen mitgebracht. / Ich hab dir Plätzchen mitgebracht. / Ich habe Plätzchen für dich gebracht. / Ich habe dir Plätzchen vorbeigebracht. |
| `b15.prompt_tr` | Kurabiye yaptın mı bile? (du ile) | Komşun sana kurabiye getirdi mi? (du ile) |
| `b15.accepted` | Hast du schon Plätzchen gemacht? / Hast du schon Plätzchen gebacken? / Hast du schon mal Plätzchen gebacken? / Hast du schon mal Plätzchen gemacht? / Hast du schon einmal Plätzchen gebacken? / Hast du Plätzchen gemacht? / Hast du Plätzchen gebacken? | Hat deine Nachbarin dir Plätzchen gebracht? / Hat dir deine Nachbarin Plätzchen gebracht? / Hat deine Nachbarin dir Plätzchen mitgebracht? / Hat dir deine Nachbarin Plätzchen mitgebracht? / Hat deine Nachbarin Plätzchen gebracht? / Hat deine Nachbarin dir Plätzchen vorbeigebracht? |
| `d16.instr_tr` | Cümleyi geçmişte olmuş gibi söyle. Örnek: Ich kaufe yerine Ich habe gekauft. | Cümleyi geçmişte olmuş gibi söyle. |
| `d16.from_de` | Ich esse Plätzchen. | Meine Nachbarin bringt mir Plätzchen. |
| `d16.accepted` | Ich habe Plätzchen gegessen. / Ich hab Plätzchen gegessen. / Plätzchen habe ich gegessen. | Meine Nachbarin hat mir Plätzchen gebracht. / Meine Nachbarin hat mir Plätzchen mitgebracht. / Meine Nachbarin hat mir Plätzchen vorbeigebracht. / Plätzchen hat mir meine Nachbarin gebracht. |
| `v1#9.hint_tr` | Aynı soruyu Tobi'ye sor. | Tobi'ye evde Advent çelengi var mı diye sor. |
| `mistakes_tr[4]` | Geçmişi anlatırken gegessen gibi kelimeler sona gider: Ich habe Plätzchen gegessen. | Geçmişi anlatırken gebracht gibi kelimeler sona gider: Sie hat mir Plätzchen gebracht. |

**arbeit**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:arbeit:muss-absagen.mistakes_tr[0]` | Ab cümlenin sonuna gider: Ich sage leider ab. | **muss** varsa **absagen** bölünmez ve en sona gider. |
| `h1:s1.tr` | Uzun bir yıldı; emekleriniz için çok teşekkürler. | Uzun bir yıldı. Emekleriniz için çok teşekkürler. |
| `h1:s3.tr` | Yemekten sonra Wichteln yapıyoruz; onu yine Herr Lechner organize ediyor. | Yemekten sonra Wichteln yapıyoruz. Onu yine Herr Lechner organize ediyor. |

**telefon — koordinatör kararı sonrası ek (olumsuz cevap kartın çipinde)**

Yeni kart açılmadı. `Nein, noch nicht` `ch:telefon:schon-patient` kartının görünen (gündelik) çiplerine eklendi; `d29` ve v2 öğrenci satırı bu biçimi istiyor, uzun biçimler ve `Ich bin zum ersten Mal hier` kabul listesinde. v2#3 `starter` da `Nein, noch …` oldu.

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:telefon:schon-patient.alltag_exp.parcalar` | Ja → evet / ich → ben / war → bulundum / schon mal → daha önce / bei Ihnen → sizde | Ja → evet / ich → ben / war → bulundum / schon mal → daha önce / bei Ihnen → sizde / Nein, noch nicht → hayır, henüz değil |
| `ch:telefon:schon-patient.alltag_exp.ipucu_tr` | Daha önce gelmediysen: **Nein, ich war noch nicht bei Ihnen.** | Daha önce gelmediysen kısaca **Nein, noch nicht** dersin. |
| `d29.situation_tr` | İlk kez arıyorsun. | İlk kez arıyorsun. Hayır, henüz gelmedim de. |
| `d29.accepted` | Nein, ich war noch nicht bei Ihnen. / Nein, noch nicht. / Nein. / Nein, ich bin neu. / Nein, noch nie. / Nein, ich komme zum ersten Mal. / Nein, ich war noch nie bei Ihnen. | Nein, noch nicht. / Nein, ich war noch nicht bei Ihnen. / Nein. / Noch nicht. / Nein, ich bin zum ersten Mal hier. / Nein, ich bin neu. / Nein, noch nie. / Nein, ich komme zum ersten Mal. / Nein, ich war noch nie bei Ihnen. |
| `v2#3.de` | Nein, ich war noch nicht bei Ihnen. Ich bin gesetzlich versichert. | Nein, noch nicht. Ich bin gesetzlich versichert. |
| `v2#3.tr` | Hayır, size daha önce gelmedim. Yasal sigortalıyım. | Hayır, henüz gelmedim. Yasal sigortalıyım. |
| `v2#3.hint_tr` | Daha önce gelmediğini ve sigortanı söyle. | Hayır, henüz gelmedim de ve sigortanı söyle. |
| `v2#3.accepted` | Nein, ich war noch nicht bei Ihnen. Ich bin gesetzlich versichert. / Nein, ich bin neu. Ich bin gesetzlich versichert. / Nein, noch nie. Ich bin gesetzlich versichert. / Nein, ich komme zum ersten Mal. Gesetzlich versichert. | Nein, noch nicht. Ich bin gesetzlich versichert. / Nein, ich war noch nicht bei Ihnen. Ich bin gesetzlich versichert. / Nein. Ich bin gesetzlich versichert. / Nein, ich bin zum ersten Mal hier. Ich bin gesetzlich versichert. / Nein, ich bin neu. Ich bin gesetzlich versichert. / Nein, noch nie. Ich bin gesetzlich versichert. / Nein, noch nicht. Gesetzlich versichert. |

## 10. exp eklenenler (#39 P1-3, 2026-11-18)

Üç Advent dosyasında `exp` eksik olan 23 temel ifadeye Hochdeutsch katmanını anlatan `exp` yazıldı. Anlam mevcut `tr` ve `use_tr` ile aynı; ipuçları okurdan geçmiş `mistakes_tr` içeriğinden türetildi. PM-042 B.10 gereği çip yapılmayan parçalar: `wann-war-das` içinde **war das**, `plaetzchen-gebracht` içinde **hat** (ipucunda anlatılıyor). `use_tr` alanlarına dokunulmadı. Okur yalnızca bu bölümü okur.


**arbeit**

| Kimlik | anlam_tr | ne_zaman_tr | parcalar | ipucu_tr |
|---|---|---|---|---|
| `ch:arbeit:komme-gern.exp` | Davetiniz için çok teşekkürler, memnuniyetle gelirim. | Şefinin davetini kabul ederken. | Vielen Dank → çok teşekkürler · für die Einladung → davet için · ich komme → geliyorum · gern → memnuniyetle | **für** kelimesinden sonra **die Einladung** gelir. |
| `ch:arbeit:muss-absagen.exp` | Maalesef katılamayacağım. | Bir davete gelemeyeceğini kibarca bildirirken. | Leider → maalesef · muss ich → zorundayım · absagen → gelemeyeceğini bildirmek | **muss** varsa **absagen** bölünmez ve en sona gider. |
| `ch:arbeit:bescheid-geben.exp` | Çarşambaya kadar size haber veririm. | Hemen karar veremeyince, ne zaman haber vereceğini söylerken. | Ich gebe → veririm · Ihnen → size · bis Mittwoch → çarşambaya kadar · Bescheid → haber | **Bescheid geben** haber vermek demektir. |
| `ch:arbeit:wann-war-das.exp` | Pardon, ne zaman demiştiniz? | Biri tarihi hızlı söyleyince bir daha duymak için. | Entschuldigung → pardon · wann → ne zaman · noch mal → bir daha | Buradaki **war** geçmişi anlatmaz, demiştiniz anlamı katar. |
| `ch:arbeit:was-heisst-wichteln.exp` | **Wichteln** ne demek? | Bilmediğin bir kelimeyi ya da geleneği sorarken. | Was heißt → ne demek · Wichteln → gizli hediye çekilişi | **Wichteln** yerine anlamadığın kelimeyi koyarsın. |
| `ch:arbeit:was-machst-du.exp` | Noel'de ne yapıyorsun? | Aralıkta molada iş arkadaşınla sohbet açarken. | Was → ne · machst du → yapıyorsun · an Weihnachten → Noel'de | Şefe **Was machen Sie**, iş arkadaşına **Was machst du** dersin. |
| `ch:arbeit:an-weihnachten.exp` | Noel'de ailemin yanına gidiyorum. | Noel planını tek cümleyle anlatırken. | An Weihnachten → Noel'de · fahre ich → gidiyorum · zu meiner Familie → ailemin yanına | **An Weihnachten** başta olunca **fahre** hemen ardından gelir. |
| `ch:arbeit:ich-bin-name.exp` | Memnuniyetle, ben de {name}. | Biri sana **du** demeyi önerince. | Gern → memnuniyetle · Ich bin → ben | İş yerinde **du** demeyi şef önerir, sen önermezsin. |

**essen**

| Kimlik | anlam_tr | ne_zaman_tr | parcalar | ipucu_tr |
|---|---|---|---|---|
| `ch:essen:einen-gluehwein.exp` | Bir Glühwein istiyorum, lütfen. | Stantta bir Glühwein isterken. | Ich möchte → istiyorum · einen → bir · Glühwein → sıcak şarap · bitte → lütfen | İsterken **einen Glühwein** dersin, **ein Glühwein** demezsin. |
| `ch:essen:was-heisst-schuss.exp` | Pardon, **mit Schuss** ne demek? | Satıcının sorusundaki bir kelimeyi anlamayınca. | Entschuldigung → pardon · was heißt → ne demek · mit Schuss → ilave içkili | **mit Schuss** yerine anlamadığın kelimeyi koyarsın. |
| `ch:essen:ohne-schuss.exp` | İlave içki olmasın, lütfen. | Satıcı sert içki ekleyeyim mi diye sorunca. | Ohne → olmadan · Schuss → ilave sert içki · bitte → lütfen | **Schuss** bardağa eklenen biraz rom ya da amarettodur. |
| `ch:essen:was-kostet.exp` | Bratwurst ne kadar? | Bir şeyin fiyatını sorarken. | Was kostet → ne kadar · die Bratwurst → ızgara sosis | Birden fazla şey için **kosten** dersin: **Was kosten die Mandeln?** |
| `ch:essen:was-macht-das.exp` | Toplam ne tutuyor? | Siparişini bitirince toplam tutarı sorarken. | Was macht das → ne tutuyor · zusammen → hepsi birlikte | Burada **machen** yapmak değil, tutmak demektir. |
| `ch:essen:mit-karte.exp` | Kartla da olur mu? | Kartla ödeyip ödeyemeyeceğini sorarken. | Geht es → olur mu · auch → de, da · mit Karte → kartla | Burada **Karte** banka kartıdır. |
| `ch:essen:tasse-zurueck.exp` | Bardağı geri vermek istiyorum. | İçtikten sonra bardağı standa geri verirken. | Ich möchte → istiyorum · die Tasse → bardağı · zurückgeben → geri vermek | **möchte** varsa **zurückgeben** bitişik kalır ve sona gider. |

**freizeit**

| Kimlik | anlam_tr | ne_zaman_tr | parcalar | ipucu_tr |
|---|---|---|---|---|
| `ch:freizeit:bin-dabei.exp` | Evet, memnuniyetle, ben de geliyorum. | Bir daveti sıcak biçimde kabul ederken. | Ja → evet · gern → memnuniyetle · Ich komme mit → ben de geliyorum | **mit** cümlenin en sonuna gider. |
| `ch:freizeit:heute-nicht.exp` | Bugün maalesef olmuyor. | Bir daveti bugün için kibarca geri çevirirken. | Heute → bugün · kann ich → yapabiliyorum · leider nicht → maalesef değil | **Heute** başta olunca **kann** hemen ardından gelir. |
| `ch:freizeit:geht-auch-morgen.exp` | Yarın da olur mu? | Bugün gelemeyince başka bir gün önerirken. | Geht es → olur mu · auch → de, da · morgen → yarın | **morgen** yerine başka bir gün koyabilirsin. |
| `ch:freizeit:wann-wo.exp` | Ne zaman ve nerede buluşuyoruz? | Daveti kabul edince saati ve yeri öğrenmek için. | Wann → ne zaman · und → ve · wo → nerede · treffen wir uns → buluşuyoruz | Soruda **treffen** kelimesi **wir** kelimesinden önce gelir. |
| `ch:freizeit:halb-sechs-rathaus.exp` | Beş buçukta, belediye binasının yanındaki stantta. | Buluşma saatini ve yerini tekrar ederek doğrularken. | Um → saat · halb sechs → beş buçuk · am Stand → stantta · beim Rathaus → belediye binasının yanında | **halb sechs** altıya yarım saat var demektir, yani 17:30. |
| `ch:freizeit:passt-mir.exp` | Bu bana uyar. | Önerilen saat ya da yer sana uyunca. | Das → bu · passt → uyar · mir → bana · gut → iyi | **Das passt mir** dersin, **Das passt mich** demezsin. |
| `ch:freizeit:plaetzchen-gebracht.exp` | Komşum bana kurabiye getirdi. | Advent sohbetinde küçük bir haber anlatırken. | Meine Nachbarin → (kadın) komşum · mir → bana · Plätzchen → kurabiye · gebracht → getirdi | **hat** ikinci sırada durur, **gebracht** en sona gider. |
| `ch:freizeit:adventskranz.exp` | Evde Advent çelengin var mı? | Advent haftalarında sohbet açarken. | Hast du → sende var mı · zu Hause → evde · schon → şimdiden · einen Adventskranz → bir Advent çelengi | **Adventskranz** dört mumlu bir çelenktir, her pazar bir mum yakılır. |

## 11. PM-044 düzeltmeleri (2026-11-18)

Okur yalnızca bu bölümdeki "Sonra" metinlerini okur. Durum beş dosyada `draft`.

- **Çip taraması (PM-042 B.10):** beş senaryodaki bütün çipler (exp ve alltag_exp, 98 kutu) şu ölçütle okundu: çipler soldan sağa okununca ifadenin anlamı çıkmalı, olumsuzluk ve zaman kaybolmamalı. PM'in saydığı altı kutuya ek olarak üç bozuk kutu bulundu: telefon `halb-zehn.exp` (**halb** → yarım, **zehn** → on: tam da 10:30 yanlışını öğretiyordu) ve telefon `wie-war-das` iki kutusu (**war das** → idi o). Ayrık parçalar üç nokta ile tek çip oldu (**kann … nicht**, **habe … gezogen**); çip sınırı (en çok 3 kelime) korundu.
- **Dokunulmayan sınır örnekleri:** strategie `nicht-ganz` (**nicht ganz** → tam değil · **verstanden** → anladım) ve `dialekt` (**noch nicht** → henüz değil) olumsuzluğu taşıyor. essen `stimmt-so` (**Stimmt** → doğru, tamam · **so** → böyle) deyimin kelime karşılığı; anlam satırı "Üstü kalsın" diyor.
- **essen v1:** "Ne demek?" sorusuna **Genau** cevabı kaldırıldı; satıcı artık Pfand'ı açıklıyor. Öğrenci satırının ipucu zaten uyuyordu, değişmedi.
- **P2:** dördü de yapıldı (Servus katmanı, "mı bile", d20 sorusu, mit-karte ipucu).

**telefon**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:telefon:wie-war-das.exp.parcalar` | Entschuldigung → pardon · wie → nasıl · war das → idi o · nochmal → bir daha | Entschuldigung → pardon · wie war das → nasıl demiştiniz · nochmal → bir daha |
| `ch:telefon:wie-war-das.alltag_exp.parcalar` | Wie → nasıl · war das → idi o · nochmal → bir daha | Wie war das → nasıl demiştiniz · nochmal → bir daha |
| `ch:telefon:halb-zehn.exp.parcalar` | Am Donnerstag → perşembe günü · um → saatte · halb → yarım · zehn → on | Am Donnerstag → perşembe günü · um → saat · halb zehn → dokuz buçuk |

**essen**

| Kimlik | Önce | Sonra |
|---|---|---|
| `v1#8.de` | Genau, drei Euro pro Tasse. Die Tassen bringen S' einfach wieder her, dann kriegen S' das Pfand zurück. | Das Pfand ist für die Tasse, drei Euro pro Tasse. Die Tassen bringen S' einfach wieder her, dann kriegen S' das Pfand zurück. |
| `v1#8.tr` | Evet, bardak başına üç euro. Bardakları geri getirin, depozitoyu geri alırsınız. | Pfand bardak için, bardak başına üç euro. Bardakları geri getirin, depozitoyu geri alırsınız. |
| `ch:essen:mit-karte.alltag_exp.ipucu_tr` | Güneyde hızlı konuşmada **Sie** kısalır, **S'** gibi duyulur. | **nehmen** burada kabul etmek demektir. |

**freizeit**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:freizeit:heute-nicht.exp.parcalar` | Heute → bugün · kann ich → yapabiliyorum · leider nicht → maalesef değil | Heute → bugün · kann … nicht → gelemiyorum · leider → maalesef |
| `ch:freizeit:heute-nicht.alltag_exp.parcalar` | Heut → bugün (**heute**) · geht's → olur (**geht es**) · leider nicht → maalesef değil | Heut → bugün (**heute**) · geht's … nicht → olmuyor (**geht es nicht**) · leider → maalesef |
| `ch:freizeit:bis-gleich.layers.bair` | Servus! (Samimi selam ve veda sözü. Yalnızca du dediğin kişilere söylenir.) | (katman çıkarıldı: **Servus** selamdır, **Bis gleich** ile eşdeğer değil; o01 ve rol oyununda duyuluyor) |
| `d20.q_tr` | Tobi ayrılırken Pfiat di diyor. Ne demek? | Tobi **Pfiat di** diyor. Ne demek? |

**arbeit**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:arbeit:namen-gezogen.exp.parcalar` | Ich habe → ben · schon → bile, çoktan · einen Namen → bir isim · gezogen → çektim | Ich → ben · habe … gezogen → çektim · schon → bile, çoktan · einen Namen → bir isim |
| `ch:arbeit:namen-gezogen.alltag_exp.parcalar` | Ich hab → ben (**ich habe**) · schon → bile · gezogen → çektim | Ich → ben · hab … gezogen → çektim (**habe gezogen**) · schon → bile |
| `ch:arbeit:ich-bin-name.exp.parcalar` | Gern → memnuniyetle · Ich bin → ben | Gern → memnuniyetle · Ich bin → ben (ardından adın) |
| `ch:arbeit:muss-absagen.exp.parcalar` | Leider → maalesef · muss ich → zorundayım · absagen → gelemeyeceğini bildirmek | Leider → maalesef · muss ich → zorundayım · absagen → hayır demek |
| `ch:arbeit:muss-absagen.alltag_exp.parcalar` | Da → o gün, o zaman · kann ich → gelebilirim · leider nicht → maalesef değil | Da → o gün · kann … nicht → gelemiyorum · leider → maalesef |
| `ch:arbeit:geschenk-gekauft.tr` | Hediyeyi aldın mı bile? | Hediye aldın mı? |
| `b11.prompt_tr` | İsim çektin mi bile? (du ile) | İsim çektin mi? (du ile) |
| `d08.tr` | Bir isim çektin mi bile? | Bir isim çektin mi? |

**Okur tur 4 (iki GERİ)**

| Kimlik | Önce | Sonra |
|---|---|---|
| `ch:telefon:schon-patient.alltag_exp.parcalar` (okur tur 4) | Ja → evet · ich → ben · war → bulundum · schon mal → daha önce · bei Ihnen → sizde · Nein, noch nicht → hayır, henüz değil | Ja → evet · ich → ben · war → bulundum · schon mal → daha önce · bei Ihnen → sizde · Nein, noch nicht → ya da: hayır, henüz değil |
| `ch:strategie:nur-verstanden.alltag_exp.parcalar` (okur tur 4) | Ich hab → (ben) (**ich habe**) · nur → sadece · verstanden → anladım | Ich hab → (ben) (**ich habe**) · nur → sadece · Montag → pazartesi (örnek kelime) · verstanden → anladım |
