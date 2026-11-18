# İnceleme: patterns.json — draft 46 kalıp (dil incelemesi + OD-9 çevrimi)
İnceleyen: dilbilimci-ajan · 2026-11-18 · Dal: v2/kaliplar-46 · Sonuç: **KAPANDI (dilbilimci)** · okur tur 1 + tur 2 GEÇTİ, kalıplar `reviewed` · inceleme #48 düzeltmeleri (belge sonu) okur bekliyor

İLERLEME: 46/46 bitti — pt:ich-bin, pt:verb-zweite-stelle, pt:w-frage, pt:ja-nein-frage, pt:kann-ich, pt:darf-ich, pt:ich-muss, pt:nicht, pt:kein, pt:es-gibt, pt:wo-ist, pt:ich-haette-gern, pt:trennbar, pt:perfekt-sein, pt:mit-dativ, pt:fuer-akk, pt:ich-brauche, pt:wie-sagt-man, pt:meinen-sie, pt:imperativ-sie, pt:sollen-wir, pt:ich-finde, pt:gefaellt-mir, pt:haben-sie, pt:ich-war, pt:lieber, pt:zu-adj, pt:es-tut-mir-leid, pt:weil, pt:dass, pt:ob, pt:indirekte-frage, pt:ich-wuerde-gern, pt:ich-haette-eine-frage, pt:um-zu, pt:obwohl, pt:deshalb, pt:reflexiv, pt:verb-praep, pt:passiv, pt:relativsatz, pt:es-waere-nett, pt:sollte, pt:bevor-nachdem, pt:als-wenn-zeit, pt:moment

## Özet
- 46 kalıbın hepsi baştan incelendi (önceki yarım düzeltmelere güvenilmedi): çerçeve, slot doldurmaları, örnekler, dönüşümler, mistakes_tr iddiaları.
- 46 kalıbın hepsine `kurallar_tr[]` ve `frame_tr` eklendi; `mistakes_tr[]` baştan yazıldı (her madde tek yanlış ve doğrusu).
- `review`: okur tur 2'den sonra baş geliştirici `status: "reviewed"`, `okur: "passed"` yaptı (inceleme sırasında `draft` idi). İnceleme #48 düzeltmelerinde `review` alanlarına dokunulmadı.
- Madde: **1796** · Hata: **7** · İyileştirme: **9** · Hata oranı: 7/1796 = **%0.4**
- `kurallar_tr` toplam **242** öğe (kalıp başına 4–7) · `frame_tr` 46 · `mistakes_tr` 172 → 193 madde. Okurun okuyacağı yeni metin: 242 + 46 + 193 = **481**.
- `npm run content:validate` → 0 hata, 58 uyarı (uyarılar alan kapsamı ve incelenmemiş kalıp uyarıları; bu işle ilgili değil).

Madde = çerçeve + grammar_tr + slot doldurmaları + örnekler + dönüşümler + mistakes_tr satırları (inceleme öncesi sayı). Hata = yanlış Almanca, yanlış ya da kaynaksız iddia, gerçeklik ya da kimlik kuralı ihlali. İyileştirme = doğru ama zayıf olanın düzeltilmesi. OD-9 çevrimi (bütün açıklamaların yeniden yazımı) hata sayılmadı.

## Kalıp başına tablo
| Kalıp | Madde | Hata | İyileştirme | kurallar_tr | mistakes_tr (önce → sonra) |
|---|---|---|---|---|---|
| pt:ich-bin | 43 | 2 | 1 | 5 | 5 → 5 |
| pt:verb-zweite-stelle | 42 | 0 | 0 | 4 | 4 → 5 |
| pt:w-frage | 44 | 0 | 0 | 4 | 4 → 7 |
| pt:ja-nein-frage | 42 | 0 | 0 | 5 | 3 → 3 |
| pt:kann-ich | 34 | 0 | 0 | 5 | 4 → 4 |
| pt:darf-ich | 35 | 0 | 1 | 4 | 4 → 4 |
| pt:ich-muss | 34 | 0 | 0 | 4 | 4 → 4 |
| pt:nicht | 34 | 0 | 0 | 5 | 4 → 4 |
| pt:kein | 34 | 0 | 0 | 6 | 3 → 3 |
| pt:es-gibt | 34 | 0 | 0 | 5 | 4 → 4 |
| pt:wo-ist | 41 | 0 | 0 | 5 | 3 → 3 |
| pt:ich-haette-gern | 35 | 0 | 1 | 6 | 4 → 5 |
| pt:trennbar | 42 | 0 | 0 | 6 | 4 → 5 |
| pt:perfekt-sein | 42 | 0 | 1 | 5 | 3 → 3 |
| pt:mit-dativ | 34 | 1 | 0 | 6 | 4 → 6 |
| pt:fuer-akk | 41 | 0 | 0 | 6 | 4 → 5 |
| pt:ich-brauche | 35 | 0 | 0 | 5 | 4 → 4 |
| pt:wie-sagt-man | 40 | 0 | 1 | 5 | 4 → 4 |
| pt:meinen-sie | 40 | 0 | 0 | 5 | 4 → 4 |
| pt:imperativ-sie | 44 | 0 | 1 | 5 | 5 → 5 |
| pt:sollen-wir | 41 | 0 | 0 | 5 | 4 → 4 |
| pt:ich-finde | 42 | 1 | 0 | 5 | 4 → 4 |
| pt:gefaellt-mir | 41 | 0 | 0 | 6 | 4 → 4 |
| pt:haben-sie | 42 | 1 | 0 | 5 | 5 → 6 |
| pt:ich-war | 40 | 1 | 0 | 5 | 3 → 4 |
| pt:lieber | 39 | 0 | 0 | 5 | 3 → 5 |
| pt:zu-adj | 42 | 0 | 0 | 4 | 3 → 5 |
| pt:es-tut-mir-leid | 39 | 0 | 0 | 5 | 3 → 5 |
| pt:weil | 34 | 0 | 0 | 6 | 4 → 4 |
| pt:dass | 41 | 0 | 0 | 6 | 4 → 3 |
| pt:ob | 39 | 0 | 0 | 5 | 3 → 3 |
| pt:indirekte-frage | 39 | 0 | 0 | 5 | 3 → 3 |
| pt:ich-wuerde-gern | 34 | 1 | 0 | 6 | 4 → 4 |
| pt:ich-haette-eine-frage | 39 | 0 | 0 | 6 | 3 → 4 |
| pt:um-zu | 34 | 0 | 0 | 5 | 4 → 4 |
| pt:obwohl | 31 | 0 | 0 | 5 | 3 → 3 |
| pt:deshalb | 40 | 0 | 0 | 5 | 3 → 4 |
| pt:reflexiv | 42 | 0 | 0 | 6 | 4 → 5 |
| pt:verb-praep | 42 | 0 | 0 | 6 | 4 → 5 |
| pt:passiv | 43 | 0 | 1 | 5 | 4 → 4 |
| pt:relativsatz | 40 | 0 | 0 | 7 | 4 → 4 |
| pt:es-waere-nett | 41 | 0 | 0 | 6 | 4 → 4 |
| pt:sollte | 41 | 0 | 1 | 5 | 4 → 4 |
| pt:bevor-nachdem | 39 | 0 | 0 | 6 | 3 → 4 |
| pt:als-wenn-zeit | 40 | 0 | 1 | 5 | 4 → 4 |
| pt:moment | 41 | 0 | 0 | 6 | 3 → 3 |
| **Toplam** | **1796** | **7** | **9** | **242** | **172 → 193** |

## Hatalar (önce → sonra, gerekçe)
1. **pt:ich-bin** — E5: öğrencinin söylediği satırda sabit ad ve cinsiyet (Frau Demir … das bin ich) → {Herr|Frau} {name} (D-061)
2. **pt:ich-bin** — E10: öğrencinin adı sabit (ich bin's, Jonas) → {name} (D-061)
3. **pt:mit-dativ** — T.wenn: „Wenn Sie mit Karte zahlen, brauche ich Ihre PIN.“ → „…, geben Sie bitte hier Ihre PIN ein.“ Kasiyer PIN istemez; gerçeklik hatası ve öğrenciye yanlış güvenlik alışkanlığı
4. **pt:ich-finde** — mistakes_tr[3]: „bence için 'nach mir' ya da 'für mich' deme“ iddiası yarı yanlış („Für mich ist das zu teuer“ doğru ve yaygın) → yalnızca **nach mir** kaldı
5. **pt:haben-sie** — E7: „Haben S' noch Brezen?“ kaynaksız lehçe biçimi (S' kısaltması) ve çeviri alanında uzun dilbilgisi notu → „Haben Sie noch Brezen?“; Brezen (Duden: bayrisch, österreichisch) notu mistakes_tr'ye ayrı madde olarak taşındı
6. **pt:ich-war** — mistakes_tr[2]: „Ich habe … gehabt günlük konuşmada daha az“ → „Bavyera'da sık duyarsın“. Öğrenci Bavyera'da; reviewed pt:ich-habe ile çelişiyordu
7. **pt:ich-wuerde-gern** — slot 'mastar grubu': `mich anmelden` → `ein Konto eröffnen`. Çerçeveye konunca „Ich würde gern mich anmelden“ çıkıyordu (yanlış sıra; doğrusu „Ich würde mich gern anmelden“, kural olarak eklendi)

## İyileştirmeler
- **pt:ich-bin** — E6 çevirisi: noktalı virgüllü açıklama → Kamu sağlık sigortalıyım.
- **pt:darf-ich** — E11 çevirisi: tırnaklı 'sen' → tırnaksız
- **pt:ich-haette-gern** — E1 çevirisi: çeviri alanındaki parantezli Semmeln notu çıkarıldı, mistakes_tr'ye ayrı madde olarak taşındı
- **pt:perfekt-sein** — mistakes_tr: seyrek 'Ich habe das Auto gefahren' ayrıntısı çıkarıldı; yerine sık yapılan aşırı genelleme hatası (Ich bin gearbeitet) kondu
- **pt:wie-sagt-man** — E6 çevirisi: tırnaklı ve parantezli karışık çeviri → Gürültülü kelimesinin tersi.
- **pt:imperativ-sie** — E5 çevirisi: iki seçenekli parantezli çeviri → Lütfen belden yukarınızı açın.
- **pt:passiv** — E8 çevirisi: eğik çizgili iki seçenek → Tamamdır, hallediyorum!
- **pt:sollte** — E10: „Sollte was sein, ruf einfach an.“ (şart anlamlı sollte; kalıbın konusu değil, çeviri alanında tırnaklı dilbilgisi notu vardı) → „Soll ich dich abholen?“
- **pt:als-wenn-zeit** — E8 çevirisi: çeviri alanındaki '=' ve tırnaklı, kaynaksız bölge notu (heim, Güney Almanya) çıkarıldı

## OD-9 çevrimi
Kurallar (pilot 15 kalıpla aynı): bir öğe bir fikir; cümle en çok 14 kelime; `=`, `;`, `…` ve tırnak yok; Almanca `**kalın**`; dilbilgisi terimi yok; kural örnekle gösterilir; öğeler birbirine dayanmaz (bu, o zaman, aynı şekilde gibi göndermeler kullanılmadı); bağlaç geçince anlamı yanında.

Terim yerine kullanılan söyleyişler (okurun özellikle bakması istenir):
- fiil → **gehe** gibi iş bildiren kelime, yapılacak iş, istediğin iş
- çekimli fiil sonda → **bin** ya da **habe** gibi kelime en sona gider
- eril Akkusativ / Dativ → **der** ile söylenen kelimede **einen** / **dem** gelir
- Partizip → bitmiş iş, örneğin **gegangen**; **gemacht** gibi parça
- ayrılabilen fiil → **anrufen** gibi kelimeler ikiye ayrılır
- dönüşlü fiil → **mich** gibi bir kelime de gerekir
- bağlaç anlamları: **weil** yani çünkü · **dass** yani ki · **ob** yani olup olmadığı · **damit** yani olsun diye · **trotzdem** yani yine de · **deshalb** yani bu yüzden

### frame_tr (46)
| Kalıp | frame_tr |
|---|---|
| pt:ich-bin | `**Ich bin** + nasıl olduğun · **Ich bin** + nerede olduğun · **Ich bin** + mesleğin` |
| pt:verb-zweite-stelle | `gün, saat ya da yer + **gehe** + **ich** + gerisi` |
| pt:w-frage | `soru kelimesi + **haben** + **Sie** + gerisi?` |
| pt:ja-nein-frage | `**Haben** + **Sie** + gerisi? · **Kann** + **ich** + gerisi + yapılan iş?` |
| pt:kann-ich | `**Kann ich** + istediğin iş? · **Ich kann** + yapabildiğin iş` |
| pt:darf-ich | `**Darf ich** + istediğin iş? · **Darf ich mal?**` |
| pt:ich-muss | `**Ich muss** + yapman gereken iş · **Muss ich** + iş?` |
| pt:nicht | `cümle + **nicht** · **nicht** + olumsuz yaptığın şey` |
| pt:kein | `**kein**, **keine** ya da **keinen** + olmayan şey` |
| pt:es-gibt | `**Es gibt** + var olan şey · **Gibt es** + aradığın şey?` |
| pt:wo-ist | `**Wo ist** + aradığın yer? · **Wo sind** + birden fazla şey? · **Wo finde ich** + aradığın şey?` |
| pt:ich-haette-gern | `**Ich hätte gern** + istediğin şey` |
| pt:trennbar | `**Ich rufe** + gerisi + **an** · **Ich hole** + gerisi + **ab**` |
| pt:perfekt-sein | `**Ich bin** + nereye + bitmiş iş, örneğin **gegangen** ya da **gekommen**` |
| pt:mit-dativ | `**mit** + araç, kişi ya da şey` |
| pt:fuer-akk | `**für** + kişi, zaman ya da şey` |
| pt:ich-brauche | `**Ich brauche** + lazım olan şey` |
| pt:wie-sagt-man | `**Wie sagt man** + kelime + **auf Deutsch?** · **Das ist so ein Ding** + tarif` |
| pt:meinen-sie | `**Meinen Sie** + duyduğun bilgi? · **Also** + duyduğun bilgi + **oder?**` |
| pt:imperativ-sie | `yapılacak iş + **Sie** + gerisi · **Rufen Sie** + gerisi + **an**` |
| pt:sollen-wir | `**Sollen wir** + önerdiğin iş? · **Lass uns** + önerdiğin iş` |
| pt:ich-finde | `**Ich finde** + bir şey + nasıl olduğu · **Wie finden Sie** + bir şey?` |
| pt:gefaellt-mir | `beğendiğin şey + **gefällt mir** · **Wie gefällt Ihnen** + bir şey?` |
| pt:haben-sie | `**Haben Sie** + aradığın şey?` |
| pt:ich-war | `**Ich war** + nasıl ya da nerede · **Ich hatte** + bir şey` |
| pt:lieber | `**lieber** + tercih ettiğin şey · **schneller als** + karşılaştırdığın şey` |
| pt:zu-adj | `**Das ist mir zu** + **teuer**, **laut** ya da **früh**` |
| pt:es-tut-mir-leid | `**Es tut mir leid, dass** + sebep · **Tut mir leid.**` |
| pt:weil | `cümle + **weil** + sebep + **bin** ya da **habe** gibi kelime sonda` |
| pt:dass | `**Ich glaube, dass** + düşündüğün şey + **ist** ya da **habe** gibi kelime sonda` |
| pt:ob | `**Ich weiß nicht, ob** + emin olmadığın şey + **ist** gibi kelime sonda` |
| pt:indirekte-frage | `**Können Sie mir sagen,** + soru kelimesi + gerisi + **ist** gibi kelime sonda?` |
| pt:ich-wuerde-gern | `**Ich würde gern** + yapmak istediğin iş` |
| pt:ich-haette-eine-frage | `**Ich hätte eine Frage zu** + konu · **Hätten Sie** + bir şey?` |
| pt:um-zu | `cümle + **um** + gerisi + **zu** + yapılacak iş` |
| pt:obwohl | `cümle + **obwohl** + engel + **bin** ya da **habe** gibi kelime sonda` |
| pt:deshalb | `sebep + **deshalb** + **bleibe** + **ich** + gerisi` |
| pt:reflexiv | `**Ich** + yaptığın iş + **mich** + gerisi` |
| pt:verb-praep | `**Ich warte auf** + beklediğin şey · **Worauf warten Sie?**` |
| pt:passiv | `bir şey + **wird** + gerisi + bitmiş iş, örneğin **bezahlt** ya da **repariert**` |
| pt:relativsatz | `bir şey + **der**, **die**, **das** + tarif + **hat** gibi kelime sonda` |
| pt:es-waere-nett | `**Es wäre nett, wenn** + rica ettiğin iş + **könnten**` |
| pt:sollte | `**Sie sollten** + tavsiye · **Soll ich** + iş? · **Ich soll** + söylenen iş` |
| pt:bevor-nachdem | `**bevor** + sonraki iş · **nachdem** + biten iş + **haben** gibi kelime sonda` |
| pt:als-wenn-zeit | `**Als** + geçmişte bir kez · **Wenn** + her seferinde ya da ileride` |
| pt:moment | `**Moment** + ne yaptığın · **Einen Moment, bitte.**` |

### Önce → sonra (3 örnek)
1. pt:kann-ich `mistakes_tr[2]`
   - Önce: Yan cümlede 'kann' en sona gider: '…, weil ich nicht kommen kann' ('…, weil ich kann nicht kommen' yanlış).
   - Sonra: `**weil** yani çünkü gelince **kann** en sona gider: **weil ich nicht kommen kann**.`
2. pt:verb-praep `mistakes_tr[2]` (iki maddeye bölündü)
   - Önce: Şey için 'wo(r) + edat', kişi için 'edat + wen/wem': 'Worauf warten Sie?' / 'Auf wen warten Sie?'
   - Sonra: `kurallar_tr`: `Neyi diye sorarken **wo** ile birleşir: **Worauf warten Sie?**` ve `Kimi diye sorarken ayrı kalır: **Auf wen warten Sie?**`
3. pt:relativsatz `mistakes_tr[2]`
   - Önce: Zamirin hâli yan cümleye göre seçilir: 'der Arzt, den ich kenne' (nesne → den), 'der Arzt, der mich kennt' (özne → der).
   - Sonra: `**der Arzt, der mich kennt** beni tanıyan doktor. **der Arzt, den ich kenne** benim tanıdığım doktor.` (kural) ve `**der Arzt, der ich kenne** denmez. Doğrusu **der Arzt, den ich kenne**.` (hata)

### Sadeleşirken düşen ayrıntılar (anlam değişmedi)
- pt:trennbar: mastarda **zu** ortaya girer (anzurufen) ayrıntısı çıktı; pt:um-zu'da öğretiliyor.
- pt:perfekt-sein: aynı fiilin nesneyle **haben** alması (Ich habe das Auto gefahren) çıktı; seyrek ve A1 için kafa karıştırıcı.
- pt:es-tut-mir-leid: **leidgetan** yazımı çıktı; **leidtut** kaldı.
- pt:ich-wuerde-gern: **Ich hätte gern angerufen** (ileri yapı) çıktı.
- pt:imperativ-sie: **du** için emir (Nimm …) çıktı; kalıp **Sie** biçimi.
- pt:dass: konuşmada dass düşerse düz sıra bilgisi yalnızca `kurallar_tr`'de (mistakes_tr'deki tekrar çıktı).
- pt:ich-brauche: **nicht … zu** (Sie brauchen nicht zu warten) öğrenci metnine alınmadı; `grammar_tr`'de duruyor.
- pt:bevor-nachdem: Plusquamperfekt adı ve ayrımı alınmadı; kural **gegessen haben** örneğiyle veriliyor.

## Kaynak (bölge sözcükleri)
- **Semmel**: Duden, Gebrauch „besonders österreichisch, bayrisch“, anlam „Brötchen“, çoğul „die Semmeln“ (duden.de/rechtschreibung/Semmel). pt:ich-haette-gern `mistakes_tr[4]`.
- **Brezen**: Duden, Brezel maddesi eş anlamlılar: „(bayrisch, österreichisch) Brezen“ (duden.de/rechtschreibung/Brezel). pt:haben-sie E7 ve `mistakes_tr[5]`.
- Kaynaksız kalanlar çıkarıldı: „Haben S'…“ kısaltması (pt:haben-sie E7), „heim Güney Almanya'da çok yaygın“ notu (pt:als-wenn-zeit E8).
- Kalıp şemasında kaynak alanı yok; bu iki kaynak ilgili SOURCES.md'ye baş geliştirici tarafından işlenmeli.

## Denetim
- `content:validate` OD-9 kurallarını yalnızca `reviewed` kalıplarda çalıştırıyor. 46 kalıp `draft` kaldığı için aynı işlev (`packages/shared/src/explain.ts` → `textIssues`) ayrı bir betikle 46 kalıbın bütün `kurallar_tr`, `frame_tr` ve `mistakes_tr` metinlerine uygulandı: **0 ihlal**. Yani durum `reviewed` + `okur: passed` yapıldığında doğrulayıcı OD-9 hatası vermemeli.
- Ek tarama (mastar, çoğul, tekil, artikel, fiil, Perfekt, bağlaç, sıfat, kip, çekim, dönüşlü, edilgen; tek kalın işareti; açıklamada `+` ya da `·`): 0 sonuç.
- Örnek çevirilerinde `=`, `;`, tırnaklı not kalmadı. Dönüşümlerin hepsi Almanca cümle.
- 15 `reviewed` kalıba dokunulmadı.

## Açık şüpheler (baş geliştirici ve okur için)
1. **Slotlar serbestçe birleşmiyor.** Birkaç kalıpta iki slot birbirinin her doldurmasıyla doğru cümle vermez: pt:wo-ist (`der Ausgang` + `Wo finde ich …?` → den Ausgang gerekir), pt:relativsatz (isim+zamir ile yan cümle çiftleri), pt:sollen-wir, pt:meinen-sie, pt:wie-sagt-man, pt:w-frage, pt:ja-nein-frage, pt:imperativ-sie. Her doldurmanın en az bir doğru eşi var; ama ikame motoru slotları çapraz çarparsa yanlış cümle üretir. Motor yazılmadan önce ya eşleşme tablosu gerekir ya da bu kalıplarda tek slot kullanılmalı.
2. **Slot adları ve bazı doldurmalar terim taşıyor** (`nesne (Akkusativ)`, `mastar grubu`, `Partizip II`, `warten auf + Akk.`, `ich … mir (Dativ)`). `frame` da öyle. Pilotta da görev dışıydı; öğrenciye gösterilecekse ayrı tur gerekir. `grammar_tr` D-094 gereği öğretmen notu olarak eski biçimde bırakıldı.
3. **dass yani ki** karşılığı her bağlamda tam oturmuyor (ör. Es tut mir leid, dass …). Okur anlamazsa seçenek: maddeyi bağlaçsız örnekle vermek.
4. **iş bildiren kelime** söyleyişi (fiil yerine) 2 kalıpta geçiyor (pt:verb-zweite-stelle, pt:lieber); okur takılırsa her yerde somut örnek kelimeye çevrilebilir.
5. pt:ich-bin E5 ve E10 artık `{Herr|Frau} {name}` ve `{name}` kullanıyor; kalıp örneklerinde yer tutucunun oynatıcıda doldurulduğu e2e ile doğrulanmalı (kalıp örnekleri şimdiye kadar yalnızca pt:ich-haette-eine-frage'de `{name}` taşıyordu).
6. Geçmiş dönüşümü (`perfekt`) kann/darf/muss/sollen/war kalıplarında bilinçli olarak **konnte, durfte, musste, wollten, war** biçiminde (konuşmada doğal olan); pilotla aynı karar.
7. Bazı A1 kalıplarında weil/dass/wenn dönüşümleri iç içe yan cümle taşıyor (ör. pt:es-tut-mir-leid `weil`, pt:obwohl `weil`). Dilbilgisi doğru; üretim maddesi olarak A1 öğrencisine verilmemeli (OD-1 hazırlık kontrolü).

## Sonuç
46/46 kalıp dilbilimci açısından **KAPANDI**. Kalan kapı: okur turu (481 metin), sonra `status: "reviewed"` + `okur: "passed"`.

## Okur turu 1 düzeltmeleri — 2026-11-18
Okur raporu: `docs/v2/reviews/okur/patterns-46.md` (481 metin: 452 GEÇTİ, 29 GERİ). 29 GERİ'nin hepsi yeniden yazıldı; D-060 için 3 madde daha değişti. Toplam 32 metin değişti, 2 yeni `kurallar_tr` öğesi eklendi. Durum `draft`; `notes` sonuna "okur turu 1 düzeltildi" eklendi (46 kalıp).

Değişen kalıplar (23): pt:als-wenn-zeit, pt:bevor-nachdem, pt:dass, pt:deshalb, pt:es-tut-mir-leid, pt:es-waere-nett, pt:ich-brauche, pt:ich-finde, pt:ich-haette-eine-frage, pt:ich-haette-gern, pt:indirekte-frage, pt:ja-nein-frage, pt:lieber, pt:meinen-sie, pt:passiv, pt:perfekt-sein, pt:reflexiv, pt:relativsatz, pt:um-zu, pt:verb-praep, pt:verb-zweite-stelle, pt:w-frage, pt:weil

| Kimlik | Önce | Sonra |
|---|---|---|
| pt:verb-zweite-stelle `frame_tr` | gün, saat ya da yer + **gehe** + **ich** + gerisi | `zaman ya da yer + **gehe**, **habe** gibi kelime + kişi + gerisi` |
| pt:w-frage `frame_tr` | soru kelimesi + **haben** + **Sie** + gerisi? | `soru kelimesi + **haben** ya da **ist** gibi kelime + kişi + gerisi?` |
| pt:ja-nein-frage `frame_tr` | **Haben** + **Sie** + gerisi? · **Kann** + **ich** + gerisi + yapılan iş? | `**Haben**, **Ist** ya da **Kann** gibi kelime + kişi + gerisi?` |
| pt:ich-finde `frame_tr` | **Ich finde** + bir şey + **gut** · **Wie finden Sie** + bir şey? | `**Ich finde** + bir şey + nasıl bulduğun, örneğin **gut** ya da **teuer**` |
| pt:lieber `frame_tr` | **lieber** + tercih ettiğin şey · **schneller als** + karşılaştırdığın şey | `**lieber** + tercihin · **schneller**, **teurer** gibi kelime + **als** + karşılaştırdığın şey` |
| pt:deshalb `frame_tr` | sebep + **deshalb** + **bleibe** + **ich** + gerisi | `sebep + **deshalb** + **bleibe** ya da **komme** gibi kelime + kişi + gerisi` |
| pt:es-waere-nett `frame_tr` | **Es wäre nett, wenn** + rica ettiğin iş + **könnten** | `**Es wäre nett, wenn Sie** + rica ettiğin iş + **könnten**` |
| pt:bevor-nachdem `frame_tr` | **bevor** + sonraki iş · **nachdem** + biten iş + **haben** gibi kelime sonda | `**bevor** + henüz yapılmamış iş · **nachdem** + bitmiş iş` |
| pt:ich-haette-gern `kurallar_tr[4]` | Sonuna başka kelime gerekmez, istediğin şeyi söylemen yeter. | `**Ich hätte gern** sözünden sonra yalnızca istediğin şeyi söylersin: **Ich hätte gern einen Kaffee**.` |
| pt:perfekt-sein `kurallar_tr[2]` | **bleiben** ve **sein** de **bin** ile kurulur: **Ich bin zu Hause geblieben**. | `Kalmak için de geçmişi **bin** ile kurarsın: **Ich bin zu Hause geblieben**.` |
| pt:lieber `kurallar_tr[1]` | **lieber**, **bleibe** gibi iş bildiren kelimeden sonra gelir: **Ich bleibe lieber zu Hause**. | `**lieber** kelimesi **bleibe** kelimesinden hemen sonra gelir: **Ich bleibe lieber zu Hause**.` |
| pt:weil `kurallar_tr[2]` | İki parça varsa **habe** en sona gelir: **weil ich den Bus verpasst habe**. | `Geçmişi anlatırken **habe** en sona gelir: **weil ich den Bus verpasst habe**.` |
| pt:dass `kurallar_tr[3]` | İki parça varsa **habe** en sona gelir: **dass ich den Termin vergessen habe**. | `Geçmişi anlatırken **habe** en sona gelir: **dass ich den Termin vergessen habe**.` |
| pt:indirekte-frage `kurallar_tr[4]` | Soru kelimesi yoksa **ob** yani olup olmadığı girer: **Wissen Sie, ob er kommt?** | `Soru kelimesi yoksa araya **ob** girer. **Wissen Sie, ob er kommt?** geliyor mu biliyor musunuz demektir.` |
| pt:ich-haette-eine-frage `kurallar_tr[4]` | Telefonda selam verip adını söyledikten hemen sonra kullanırsın. | `Telefonda adını söyledikten hemen sonra **Ich hätte eine Frage** dersin.` |
| pt:ich-haette-eine-frage `kurallar_tr[3]` | **zu** kelimesinden sonra **meiner**, **meinem** ya da **zum** gelir: **zum Vertrag**, **zu meinem Termin**. | `**die** ile söylenen konuda **zur** dersin: **eine Frage zur Miete**.` |
| pt:reflexiv `kurallar_tr[1]` | Türkçedeki hazırlanmak, dinlenmek gibi kendine dönen işlere benzer. | `**sich ausruhen** dinlenmek, **sich setzen** oturmak demektir, başındaki **sich** hep birlikte gelir.` |
| pt:verb-praep `kurallar_tr[2]` | Türkçedeki ekler birebir geçmez, ikisini birlikte ezberle: **sich kümmern um**, **sich beschweren über**. | `Türkçede gürültüden şikâyet edersin, Almancada **über** gelir: **Ich beschwere mich über den Lärm**.` |
| pt:verb-praep `kurallar_tr[3]` | Neyi diye sorarken **wo** ile birleşir: **Worauf warten Sie?** | `Neyi beklediğini sorarken **wo** ile **auf** birleşir: **Worauf warten Sie?**` |
| pt:verb-praep `kurallar_tr[4]` | Kimi diye sorarken ayrı kalır: **Auf wen warten Sie?** | `Kimi beklediğini sorarken **auf** ile **wen** ayrı kalır: **Auf wen warten Sie?**` |
| pt:passiv `kurallar_tr[1]` | Türkçedeki ödenir, gönderilir gibi sözlerin karşılığıdır. | `**Das wird bezahlt** Türkçedeki ödenir, **Das wird geschickt** gönderilir demektir.` |
| pt:relativsatz `kurallar_tr[2]` | Araya **der**, **die** ya da **das** girer, kelime hangisiyle söyleniyorsa o. | `Tarif çoğu zaman kelimenin **der**, **die**, **das** sözüyle başlar: **das Formular, das ich ausfülle**.` |
| pt:bevor-nachdem `kurallar_tr[3]` | İkisinde de **kommen** ya da **haben** gibi kelime en sona gider. | `**bevor** ve **nachdem** gelince **kommen** gibi kelime en sona gider. Örnek: **bevor Sie kommen**.` |
| pt:als-wenn-zeit `kurallar_tr[4]` | İkisinde de **habe** ya da **war** gibi kelime kendi kısmının sonuna gider. | `**als** ve **wenn** gelince **war** gibi kelime sona gider. Örnek: **Als ich krank war**.` |
| pt:ich-brauche `mistakes_tr[3]` | Bilinen bir şey için **nicht** dersin: **Das brauche ich nicht**. | `Buna ihtiyacım yok demek için **nicht** dersin: **Das brauche ich nicht**.` |
| pt:meinen-sie `mistakes_tr[2]` | Cümle sonundaki **oder?** veya değil, değil mi demektir. | `Cümle sonundaki **oder?** burada değil mi diye sorar: **Dienstag um zehn, oder?**` |
| pt:meinen-sie `mistakes_tr[3]` | Kelimenin anlamını **meinen** ile sorma, İngilizcedeki mean gibi değildir. Doğrusu **Was heißt das?** | `Kelimenin anlamını **meinen** ile sorma. Doğrusu **Was heißt das?**` |
| pt:es-tut-mir-leid `mistakes_tr[2]` | **dass** yani ki gelince bitişik yazılır: **dass es mir leidtut**. | `**dass** yani ki gelince **leid** ile **tut** bitişik yazılır: **dass es mir leidtut**.` |
| pt:um-zu `mistakes_tr[2]` | Amaç başka birinin bir şey yapmasıysa **damit** yani olsun diye dersin. Örnek: **Ich rufe an, damit Sie Bescheid wissen**. | `Karşındaki bilsin diye arıyorsan **damit** dersin: **Ich rufe an, damit Sie Bescheid wissen**.` |
| pt:deshalb `mistakes_tr[2]` | **also** İngilizcedeki also değildir, yani ya da demek ki anlamına gelir. | `**also** o hâlde demektir: **Also kommen Sie morgen?** İngilizcedeki also ile karıştırma.` |
| pt:w-frage `mistakes_tr[2]` | **wer** kim demektir, İngilizcedeki where değildir. | `**wer** kim demektir. İngilizcedeki where ile karıştırma.` |
| pt:w-frage `mistakes_tr[3]` | **wo** nerede demektir, İngilizcedeki who değildir. | `**wo** nerede demektir. İngilizcedeki who ile karıştırma.` |

Eklenen öğeler (pt:ich-haette-eine-frage, eski `kurallar_tr[3]` üçe bölündü; sonraki öğelerin sırası 2 kaydı):
- `kurallar_tr[4]`: `**der** ya da **das** ile söylenen konuda **zum** dersin: **eine Frage zum Vertrag**.`
- `kurallar_tr[5]`: `**mein** de değişir: **zu meinem Termin**, **zu meiner Rechnung**.`
- Telefon öğesi artık `kurallar_tr[6]`, **Hätten Sie kurz Zeit?** öğesi `kurallar_tr[7]`. Kalıpta 8 kural oldu; toplam `kurallar_tr` 242 → 244.

### Kararlar
- **frame_tr (8):** değişen yer artık ya düz yazıyla ya da iki örnek ve "gibi kelime" sözüyle gösteriliyor; tek kalın örnek kalmadı. pt:ich-finde çerçevesinden soru yarısı (**Wie finden Sie**) çıktı (14 kelime sınırı); `kurallar_tr[3]`'te duruyor. pt:ja-nein-frage çerçevesinden "yapılan iş sonda" yarısı çıktı; `kurallar_tr[4]`'te duruyor.
- **"İki parça", "ikisi", "ikisinde de":** hepsi adlarıyla yazıldı ve her öğe kendi Almanca örneğini taşıyor.
- **pt:perfekt-sein `kurallar_tr[2]`:** **sein** yarısı çıktı (okur: bin zaten o değil mi). **Ich bin gewesen** bilgisi pt:ich-bin ve pt:ich-war'da var.
- **pt:relativsatz `kurallar_tr[2]`:** "çoğu zaman" eklendi; **der Brief, den** ile çelişki kalmadı, **der / den** farkı `kurallar_tr[5]` ve `mistakes_tr[2]`'de.
- **Bağlaç anlamları:** **ob** ve **damit** için "yani …" dizisi bırakıldı; anlam ayrı cümleyle ya da Türkçe durumla veriliyor (geliyor mu biliyor musunuz, karşındaki bilsin diye).
- **D-060 (İngilizce):** pt:meinen-sie `mistakes_tr[3]`'teki İngilizce karşılaştırma kaldırıldı (zayıf benzerlik; madde onsuz da tam). pt:w-frage `[2]`, `[3]` (**wer** / where, **wo** / who) ve pt:deshalb `[2]` (**also** / also) gerçek yanlış arkadaş olduğu için kaldı, ama anlam artık ilk cümlede tek başına duruyor ve uyarı ayrı, kısa bir cümle. Baş geliştirici bunları da istemiyorsa ikinci cümleyi silmek yeter; maddeler onsuz da anlamlı.

### Denetim
- `textIssues` (explain.ts) 46 kalıbın bütün `kurallar_tr`, `frame_tr`, `mistakes_tr` metinlerinde: 0 ihlal.
- `npm run content:validate` → 0 hata, 58 uyarı.
- Okur ikinci turda yalnızca bu 32 metni + 2 yeni öğeyi okumalı (34 metin).

## İnceleme #48 düzeltmeleri (2026-11-18)

Okur yalnızca bu tablodaki "Sonra" metinlerini okur. `review` alanları değişmedi. `npm run content:validate` → 0 hata.

- P1 `pt:kein`: **keinen** kuralı artık **Ich habe** bağlamına bağlı (koşulsuz kural **Das ist keinen Termin** ürettiriyordu).
- P2 `pt:perfekt-sein`: çerçevedeki "nereye" kalktı; örneklerden biri **aufgestanden** oldu.
- P2 `mistakes_tr`: hata olmayan bilgi maddeleri ya "denmez. Doğrusu" biçimine çevrildi ya da `kurallar_tr` içine taşındı. Listede olmayan `pt:perfekt-sein.mistakes_tr[2]` de aynı türdendi, o da çevrildi.

| Kimlik | Önce | Sonra |
|---|---|---|
| `pt:kein.kurallar_tr[2]` | **der** ile söylenen kelimede **keinen** olur: **Ich habe keinen Termin**. | **Ich habe** dedikten sonra **der** kelimesinde **keinen** olur: **Ich habe keinen Termin**. |
| `pt:perfekt-sein.frame_tr` | **Ich bin** + nereye + bitmiş iş, örneğin **gegangen** ya da **gekommen** | **Ich bin** + gerisi + bitmiş iş, örneğin **gegangen** ya da **aufgestanden** |
| `pt:perfekt-sein.mistakes_tr[2]` | **weil** yani çünkü gelince **bin** en sona gider: **weil ich früh aufgestanden bin**. | **weil ich bin früh aufgestanden** denmez. Doğrusu **weil ich früh aufgestanden bin**. |
| `pt:weil.mistakes_tr[1]` | **denn** de çünkü demektir ama sıra değişmez: **denn ich bin krank**. | Çünkü anlamındaki **denn** ile **denn ich krank bin** denmez. Doğrusu **denn ich bin krank**. |
| `pt:weil.mistakes_tr[2]` | **deshalb** yani bu yüzden sonucu söyler: **Ich bin krank, deshalb komme ich nicht**. | Bu yüzden anlamındaki **deshalb** ile **Deshalb ich komme nicht** denmez. Doğrusu **Deshalb komme ich nicht**. |
| `pt:obwohl.mistakes_tr[2]` | **trotz** yağmura rağmen gibi kısa sözlerde kullanılır: **trotz des Regens**. | **trotz ich krank bin** denmez. Doğrusu **obwohl ich krank bin**. |
| `pt:passiv.mistakes_tr[0]` | **Das wird bezahlt** ödenir demektir. **Das ist bezahlt** ödenmiş, bitti demektir. | Ödenir demek için **Das ist bezahlt** denmez. Doğrusu **Das wird bezahlt**. |
| `pt:passiv.mistakes_tr[3]` | **Ich werde zahlen** ödeyeceğim demektir. **Es wird gezahlt** ödenir demektir. | Ödeyeceğim demek için **Ich werde gezahlt** denmez. Doğrusu **Ich werde zahlen**. |
| `pt:fuer-akk.mistakes_tr[3]` | **für zwei Tage** iki günlüğüne demektir. **seit zwei Tagen** iki gündür demektir. | İki gündür hastayım derken **für zwei Tage** denmez. Doğrusu **seit zwei Tagen**. |
| `pt:fuer-akk.mistakes_tr[4]` → `pt:fuer-akk.kurallar_tr[6]` | İlaç isterken **gegen** de duyarsın: **etwas gegen Husten** öksürüğe karşı bir şey demektir. | İlaç isterken **gegen** de duyarsın: **etwas gegen Husten** öksürüğe karşı bir şey demektir. (taşındı) |
| `pt:als-wenn-zeit.mistakes_tr[2]` → `pt:als-wenn-zeit.kurallar_tr[5]` | **als** karşılaştırmada da geçer: **größer als** daha büyük demektir. | **als** karşılaştırmada da geçer: **größer als** daha büyük demektir. (taşındı) |
| `pt:verb-praep.kurallar_tr[5]` | Konuşmada **darum** ve **daran** çok duyarsın: **Ich kümmere mich darum**. | Konuşmada **darum** çok duyarsın: **Ich kümmere mich darum** onu ben hallederim demektir. |
| `pt:verb-praep.mistakes_tr[4]` | **Ich kümmere mich darum** onu ben hallederim demektir. | (silindi; anlam `kurallar_tr[5]` içine alındı) |

## PM-044 düzeltmeleri (2026-11-18)

`pt:koennten-sie`: **bitte** kuralı kalıbın kendi örneğiyle (**Könnten Sie das bitte wiederholen?**) çelişiyordu. Okur yalnızca "Sonra" metinlerini okur. `review` alanları değişmedi. `npm run content:validate` → 0 hata.

| Kimlik | Önce | Sonra |
|---|---|---|
| `pt:koennten-sie.kurallar_tr[2]` | **bitte** en doğal olarak **Sie** kelimesinden hemen sonra gelir. | **bitte** çoğu zaman **Sie** kelimesinden sonra gelir: **Könnten Sie bitte warten?** |
| `pt:koennten-sie.kurallar_tr[3]` (yeni; eski [3] ve sonrası bir kayar) | — | **das** ya da **mir** varsa **bitte** onlardan sonra gelir: **Könnten Sie das bitte wiederholen?** |
| `pt:koennten-sie.mistakes_tr[3]` | **bitte** başa da gelebilir. En doğal yeri **Sie** kelimesinden sonradır: **Könnten Sie bitte**. | (silindi; eski [4] artık [3]) |
