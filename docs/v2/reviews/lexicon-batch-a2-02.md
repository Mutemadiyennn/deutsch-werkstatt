# Sözlük partisi a2-02 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 24 derin kart (A2 tablosu 18. hafta, 120.–123. gün) · dosya: `content/v2/registry/lexicon/batch-a2-02.json`

Okunan alanlar: kart verisi, 96 eşdizim, 144 örnek, 122 boşluk (`forms`), `exp`, `mistakes_tr`, `also_ok`, `patterns`, `related`.

## Sayılar
- Geçti (değişiklik yok): 4 kart (`lx:langweilig`, `lx:nervös`, `lx:faul`, `lx:Café`)
- Düzeltildi: 20 kart, 55 düzeltme (16'sı yalnızca `also_ok` eklemesi, 6'sı ipucunda büyük/küçük harf; 2'si baş geliştirici kararıyla ek tur)
- Kaldı: 0
- Hata oranı: 20 kart / 24 = 0,83 (içerik hatası olan kart: 16 / 24 = 0,67; kalan 4 kartta yalnızca `also_ok` ya da ipucu harfi)
- `npm run content:validate`: 0 hata, 146 uyarı (taban 146; bu partiye ait uyarı yok). `content:explain-audit`: partide 66 açıklama, aykırı 0.
- `review`: `draft` (okur bekliyor).

## Düzeltmeler (önce → sonra, gerekçe)

**WORLD (karaktere WORLD'de olmayan özellik)**
- `lx:klug` boşluk 1: `Ioana hat oft eine ___ Idee.` → `Das war eine sehr ___ Idee von dir.` Ioana'nın WORLD kişiliği cesur ve komik; akıllıca fikir özelliği tanımlı değil. Adsız cümleye çevrildi. (`Das ist eine ___ Idee!` biçimi beş başka kartta farklı cevapla geçtiği için seçilmedi: doğrulayıcı çakışma uyarısı verdi.)

**Almanca**
- `lx:höflich` ö3: `…, ne?` → `…, oder?` (`ne` kuzey ağzı; Bavyera'da duyulan biçim `oder` ya da `gell`; partinin öteki kartları da `oder` kullanıyor).
- `lx:Erinnerung` ö2: `schickt eine Erinnerung an den Termin per SMS` → `schickt per SMS eine Erinnerung an den Termin` (kelime sırası; `per SMS` sonda asılı kalıyordu).
- `lx:Erinnerung` ö6: `kamen viele Erinnerungen zurück` → `sind viele Erinnerungen zurückgekommen` (**kamen** A2'de öğretilmiyor; konuşmada da bu biçim söylenir).
- `lx:dunkel` boşluk 1: `Im Winter ist es früh ___.` → `Im Winter wird es früh ___.` Türkçesi "kararır"; eşdizimde **Es wird dunkel** "Hava kararıyor" diye veriliyordu, aynı Türkçe söz iki ayrı Almanca biçime gidiyordu.
- `lx:Ferien` ö5: `– Haben Sie im August geöffnet? – Nein, in den Ferien ist die Praxis zwei Wochen geschlossen.` → `– Fahren Sie in den Ferien weg? – Nein, wir bleiben dieses Jahr zu Hause.` Muayenehane kapanışı Almanya'da **Urlaub** ile söylenir (kapıdaki yazı: wegen Urlaub geschlossen); cümle kartın kendi hata notuyla çelişiyordu, cevap da soruyla tutmuyordu (iki hafta kapalıyken "Nein").
- `lx:Lehrer` ö5: `Der Lehrer im Kurs.` → `Die Lehrerin im Kurs.` Aynı kartta ö2 ve boşluk 2 kurstaki öğretmeni kadın gösteriyor; aynı kurs için iki cinsiyet vardı.

**Eşdizim ya da örnekte bileşik/türemiş kelime (taslak-08 ölçütü)**
- `lx:dunkel` eşdizim: `dunkelblau` → `ein dunkles Zimmer`.
- `lx:dunkel` ö2: `Haben Sie die Hose auch in Dunkelblau?` → `Die Hose ist mir zu dunkel. Haben Sie sie auch in einer anderen Farbe?`
- `lx:Ferien` eşdizim: `die Sommerferien` → `nach den Ferien`.
- `lx:Spielzeug` ö5: `Was war dein Lieblingsspielzeug?` → `Was war früher dein liebstes Spielzeug?`
- `lx:Lehrer` eşdizim: `die Lehrerin` → `den Lehrer fragen` (**Lehrerin** örneklerde, ipucunda ve boşlukta kaldı; kartın öğrettiği şey).

**Hata notları ve açıklamalar (olgu, anlam, Türkçe konuşana özgülük)**
- `lx:gemütlich` 1. hata notu ve `ipucu_tr`: "Rahat bir koltuk için **gemütlich** değil" → "Rahat ayakkabı için …". Almancada **ein gemütlicher Sessel**, **ein gemütliches Sofa** çok yaygın; iddia yanlıştı. Ayakkabı ve giysi için ayrım doğru.
- `lx:Ferien` `anlam_tr`: "okulların ya da bir yerin kapalı olduğu" → "okulların kapalı olduğu"; `ne_zaman_tr`: "kapalı günleri" çıkarıldı (yukarıdaki ö5 ile aynı gerekçe).
- `lx:neugierig` 1. hata notu: "Merak etme derken **Sei nicht neugierig** yanlış. Türkçede bu endişelenme demektir." → "Endişelenme anlamında merak etme derken **Sei nicht neugierig** yanlış. Bu her şeyi sorma demektir. Doğrusu **Keine Sorge**." İkinci cümle neyin ne demek olduğunu söylemiyordu. `ipucu_tr`: kalın içindeki ünlem kaldırıldı.
- `lx:Möbel` 1. hata notu: `Das Möbel ist neu` → `Die Möbel ist neu` + "Türkçede mobilya tek, Almancada hep çok." Türkçe konuşanın gerçek hatası tekil fiil; **das Möbel** ayrıca var olan bir biçim.
- `lx:Lehrer` 1. hata notu: "Türkçedeki gibi öğretmenim diye seslenilmez. Soyadıyla seslenirsin" → "Öğretmene **Lehrer** diye seslenilmez. **Frau** ya da **Herr** ile soyadını söylersin: **Frau Bauer**, **Herr Kaya**." Yanlış biçim artık görünüyor.
- `lx:klettern` 2. hata notu: kural cümlesi ("Türkçedeki **-e** için **auf** kullanılır") → gerçek hata: `zu einem Baum klettern` yanlış, doğrusu `auf einen Baum klettern`.
- `lx:dunkel` 1. hata notu: "Hava karardı derken" → "Hava karanlık derken" (**Es ist dunkel** "karardı" değil).

**Türkçe çeviri**
- `lx:witzig` ö5: "çok komik bir fotoğraf" → "komik bir fotoğraf" (Almancada **sehr** yok).
- `lx:höflich` ö3: "Adam pek kibar değildi" → "Adam gerçekten pek kibar değildi" (**echt**).
- `lx:Farbe` ö3: "gerçekten çok yakışıyor" → "gerçekten yakışıyor".
- `lx:modern` ö4: "cihazlar modern" → "modern cihazları var" (**mit modernen Geräten**).
- `lx:dunkel` ö1: "hava çoktan kararıyor" → "hava çoktan karanlık" (bozuk zaman uyumu).
- `lx:Oma` eşdizim `Oma und Opa`: "büyükannem ve büyükbabam" → "büyükanne ve büyükbaba" (Almancada **meine** yok).
- `lx:Lehrer` boşluk 2: "çok tatlı bir kadın" → "çok hoş bir kadın" (`lx:nett` karşılığı: nazik, iyi, hoş).
- `lx:Ferien` ö4: "Pek bir şey, çoğu zaman evdeydik" → "Pek bir şey yapmadık, …" (yarım cümle).

**İpucu (`hint_tr`) cümledeki biçimi aynen göstermiyordu**
- Cümle başındaki büyük harf: `lx:gemütlich` b2 (**Das gemütliche Café**), `lx:Farbe` b4 (**Mit der neuen Farbe**), `lx:bequem` b1 (**Mit den bequemen Schuhen**), `lx:praktisch` b1 (**Mit der praktischen Tasche**), `lx:Dorf` b5 (**Zwischen den Dörfern**); cümle ortası: `lx:freundlich` b3 (**das ist sehr freundlich von Ihnen**).
- `lx:fleißig` b3: `Er ist ein ___ Kollege.` → `Er ist ein sehr ___ junger Mann.` "Çalışkan bir iş arkadaşı" eşdizimde, hata notunda ve b2'de **eine fleißige Kollegin**, b3'te **ein fleißiger Kollege** veriyordu: aynı Türkçe söz, iki biçim. Yeni cümle ö5'ten.

**`also_ok` eksikleri (haksız ret riski)**
- `lx:höflich` b1–b5: **freundlich** biçimleri (beşinde), **nett** biçimleri (b1, b2, b4, b5). `lx:freundlich` kartı aynı boşluk türünde **nett** kabul ediyor; "kibar" görüp **freundlich** yazan öğrenci haksız ret alırdı.
- `lx:klug`: b1 **schlaue**, b2 **schlauer**, **intelligenter**, b3 + **schlau**, b5 **schlauer**, **intelligenter**.
- `lx:bequem`: b2 **gemütlich** (**Das Sofa ist sehr gemütlich** doğru Almanca), b5 **gemütlichen**.
- `lx:fleißig` b4: **viel** (**Wir üben viel für die Prüfung**).
- `lx:Erinnerung` b5: **Erinnerungen** (**keine Erinnerungen an diesen Tag** da doğru).
- `lx:Spielzeug` b4: **Spielsachen**.
- `lx:klettern` b1 **gestiegen**, b3 **steigt**.

**Ek tur (baş geliştirici kararı, 2026-11-23)**
- Tobi 14. haftadan sonra yalnız sesli mesajla görünür, parti 18. hafta: `lx:witzig` ö1, b1, `hint_tr` ve 1. hata notu adsız kişiye çevrildi (`Er ist ein sehr witziger Kollege.`, `Er ist ein ___ Kollege.`); partide başka Tobi satırı yok. `lx:klug` b4 `Der ___ gibt nach.` (cevap **Klügere**, A2 için ağır) → `Echt ___ von dir, dass du gefragt hast.` (cevap **klug**, `also_ok` **schlau**; ö3'ten). Okur için değişen Türkçe: `lx:witzig` ö1, b1, 1. hata notu; `lx:klug` b4.

## Görev sorularına cevap
1. **Sıfat çekimleri ve boşluk cevapları:** 122 boşluğun hepsi tek tek çekildi; yanlış çekim yok (`keine dunklen Farben`, `im Dunkeln`, `mit alten Möbeln`, `Zwischen den Dörfern`, `Der Klügere` dahil). **lustig**/**witzig** beş boşlukta da gerçekten eş; **bequem**/**gemütlich** `es sich … machen` kalıbında eş; **gespannt**, **aufgeregt**, **nett**, **fast**, **Großmutter** doğru. Eksikler yukarıda.
2. **OD-9:** terim, üç nokta, yasak sembol yok (tarama 0). "X derken" çakışması iki yerde vardı (`lx:fleißig` b3, `lx:dunkel` b1); ikisi düzeltildi.
3. **WORLD:** Ioana cümlesi düzeltildi. Kalan adlı satırlar WORLD ile örtüşüyor: Luka **witzige Geschichte** (esprili, anlatır), Frau Brandl **neugierig** (meraklı), Frau Huber **schnell, aber freundlich** (hızlı, iyi niyetli), Herr Wimmer **höflich** (kibar). `Frau Brandl erinnert mich an meine Oma` karaktere özellik eklemiyor, öğrencinin duygusu; bırakıldı. Öğrencinin ağzında sabit ad ya da cinsiyet yok (`Lehrer, glaub ich` boşluğunda **Lehrerin** kabul). **Frau Bauer** / **Herr Kaya**: WORLD karakteri değil, öğrenci değil, yalnızca hitap örneği; kabul edilebilir bulundu.
4. **Öğretilmemiş sözcük:** `lx:böse` (parti 005) ve `lx:Urlaub` (parti 012) kart olarak var, 120. günden önce. **Keine Sorge** kart değil ama parti 005, 006, 011 örneklerinde kalıp olarak geçiyor; hedef söz bu olduğu için bırakıldı, not sadeleştirildi.
5. **Kart biçimi:** `lx:Möbel` ve `lx:Ferien` `art: die`, `pl` kelimenin kendisi: `lx:Eltern` ile aynı gösterim. `lx:Café`: **das**, **Cafés**, yazım doğru; `also_ok` içindeki **Cafe** / **Cafes** resmî yazım değil, klavyede aksansız yazana hoşgörü olarak bırakıldı (öğrenciye gösterilmiyor).
6. **Seviye:** A2 uygun. Tek ağır boşluk `lx:klug` b4 idi; baş geliştirici kararıyla değişti (aşağıda).

## Değişen Türkçe alanlar (okur için)
- `exp`: `lx:gemütlich` (`ipucu_tr`), `lx:neugierig` (`ipucu_tr`), `lx:Ferien` (`anlam_tr`, `ne_zaman_tr`).
- `mistakes_tr`: `lx:gemütlich` (1.), `lx:neugierig` (1.), `lx:Möbel` (1.), `lx:dunkel` (1.), `lx:Lehrer` (1.), `lx:klettern` (2.).
- `hint_tr`: `lx:freundlich` b3, `lx:gemütlich` b2, `lx:fleißig` b3, `lx:klug` b1, `lx:Farbe` b4, `lx:bequem` b1, `lx:dunkel` b1, `lx:praktisch` b1, `lx:Dorf` b5.
- Örnek ve boşluk çevirileri: `lx:witzig` ö5, `lx:höflich` ö3, `lx:fleißig` b3, `lx:klug` b1, `lx:Farbe` ö3, `lx:modern` ö4, `lx:dunkel` ö1, ö2, `lx:Lehrer` b2, `lx:Spielzeug` ö5, `lx:Ferien` ö4, ö5.
- Eşdizim çevirileri: `lx:dunkel` (4.), `lx:Oma` (3.), `lx:Lehrer` (3.), `lx:Ferien` (4.).

## Kalan şüpheler (düzeltilmedi)
- `lx:dunkel`: doğrulayıcının "örnekte kartın kelimesi" sezgisi **dunkl-** gövdesini tanımıyor (ortadaki **e** düşünce). Bu yüzden diyalog olmayan standart örneklerde yalnızca **dunkel** biçimi kullanılabildi; **dunklen** diyalogda ve boşluklarda duruyor. İçerik sorunu değil, araç sınırı.
- `lx:klettern` 1. hata notu `Ich habe geklettert` için "yanlış" diyor. Sözlükler yönsüz spor anlamında **hat geklettert** biçimini de kaydeder; A2 için sadeleştirme kabul edilebilir bulundu.
- `lx:langweilig` ve `lx:neugierig` `parcalar`: **weilig** → süren, **gierig** → hevesli. Bölme öteki kartlarla aynı düzende (**haus**, **ende**); **gierig** aslında açgözlü demek, "hevesli" yumuşatılmış. Okur anlamazsa çıkarılabilir.
- `lx:Erinnerung` ö4: fatura hatırlatması gerçek hayatta çoğunlukla **Zahlungserinnerung** ya da **Mahnung** diye gelir; **eine Erinnerung** konuşmada doğru, bırakıldı.

## Sonuç
Dil açısından KAPANDI (bulunan bütün hatalar dosyada düzeltildi, doğrulayıcı 0 hata). Parti `draft` kalıyor: okur turu bekleniyor. Açık soru yok.
