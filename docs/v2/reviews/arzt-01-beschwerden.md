# İnceleme: arzt/01-beschwerden.json
İnceleyen: dilbilimci-ajan · 2026-11-17 · Sonuç: **KAPANDI** (`review.status = reviewed`)

## Sayılar
- İncelenen madde: **177** (14 parça, 16 karşı taraf cümlesi, 6 cevap seçeneği, 28 build, 38 drill, 33 diyalog satırı, 12 rol oyunu öğesi, 19 dinleme satırı/sorusu, 4 konuşma, 1 görev, 6 mistakes_tr)
- Dil/doğallık/tutarlılık hatası: **7** → oran **%4,0**
- accepted[] eksikliği: 66 üretim maddesinin **51**'inde yaygın doğru varyant eksikti; 146 varyant eklendi (206 → 352)
- Doğru şıkkın konumu: 8 maddenin 8'inde 0. sıradaydı; yeniden dağıtıldı
- Bairisch katmanı: bu dosyada yok ("verified" iddia yok). Hukuki iddia: yok. Tıbbi içerik yalnızca dil örneği (source.notes bunu söylüyor); "Loslassschmerz" muayenesi ve "Einweisung" gerçekçi. Kişisel bilgi, kurs/kitap adı: yok.

## Hatalar (önce → sonra)
1. `ch:arzt:noch-nichts-genommen.layers.alltag`: "Hab nur 'ne Ibu genommen." → "Hab noch nix genommen." Alltag katmanı tam ters anlamdaydı (tr/hd: "henüz bir şey almadım"; alltag: "yalnızca bir Ibu aldım"). Eski cümle use_tr'de "bir şey aldıysan" örneği olarak korundu.
2. `o16.tr`: "Bu bir soğuk algınlığı enfeksiyonuna benziyor." → "Bu, grip benzeri bir enfeksiyona (ağır bir üşütmeye) benziyor." ("grippaler Infekt"in karşılığı).
3. `listening h2` 5. satır tr: "seit heut Nacht" → "bu geceden beri" yerine "dün geceden beri". Sabah söylenen "heute Nacht" geçen gecedir; Türkçe "bu gece" gelecek geceyi anlatır.
4. `v1` 3. B satırı tr: "38,2 idi" → "38,2'ydi".
5. `v2` 3. B satırı tr: "Sabahları en kötüsü." → "En kötü sabahları oluyor."
6. `b13` ("Biraz daha iyi."): kanonik cevap "Es ist **schon** ein bisschen besser." Türkçe istemde olmayan "schon" içeriyordu ve yalın biçimler yoktu → kanonik "Es ist ein bisschen besser."; "Ein bisschen besser.", "Etwas besser.", "Es geht (mir) ein bisschen besser." eklendi.
7. `listening h2` 2. satır: "Haben S' was Komisches gegessen?" için eksik reduction eklendi (was → etwas).

## accepted[] eklemeleri (özet)
- En riskli eksikler: d27'de "Ich habe Bauchschmerzen und mir ist schlecht." (iki öğretilen biçimin en olağan birleşimi) yoktu; b24'te "Ich glaube, ich habe mich erkältet."; d23'te yalın "Acht." / "Acht von zehn."; b09'da parçanın gündelik biçimi "Genau hier."; b11'de "Sieben von zehn." / "So 'ne Sieben."; b10'da "Ich habe (sehr) starke Schmerzen."; d35'te "Mein Ohr tut weh."; "hab" ve "…weh" (Kopfweh, Halsweh, Bauchweh) biçimleri düzensiz kabul ediliyordu, tamamlandı.

## Kalan şüpheler
- Yok. Gözlem (hata değil): b18'de "Yürüyünce" için hem "laufen" hem "gehen" kabul ediliyor; güneyde "laufen" = yürümek olduğu için doğru.

## Yöntem
- Dosyanın tamamı okundu (parça, karşı taraf cümlesi, cevap seçeneği, build, drill, diyalog satırı, rol oyunu, dinleme, konuşma, görev, mistakes_tr).
- accepted[] değerlendirmesi `web/src/core/grading.ts` kurallarına göre yapıldı: büyük/küçük harf, noktalama, tırnak, kesme işareti ve ümlaut yazımı yok sayılıyor; ama "nochmal / noch mal / noch einmal", "gern / gerne", "habe / hab", "Dr. / Doktor", dört haneli yılın rakamla/yazıyla yazımı ve kelime sırası ayrı varyant ister. Yapay zekâ yoksa listede olmayan doğru cevap "yanlış" sayılır; bu yüzden yaygın varyantlar eklendi. Kanonik (ilk) varyantlar korunmuştur (b13/arzt hariç, aşağıda).
- Çoktan seçmeli maddelerde (dinleme soruları, pick) doğru şık her zaman 0. sıradaydı ve oynatıcı bu şıkları karıştırmıyor (`web/src/screens/Player.tsx`, drill "pick" ve dinleme soruları `opts` dizisini olduğu gibi basıyor). Şıkların sırası dosyada değiştirildi; `ans` buna göre güncellendi (yeni dağılım: 1,2,0,1,2,0,1,0).
- Her düzeltme turundan sonra `npm run content:validate` → 0 hata; `npm test` → 83/83.

## Başka dosyada bulgular (düzeltilmedi)
- `lx:Schmerz`: `lexemes.v1.json`'da level "A1", `lexicon/batch-007.json`'da "A2" (çift kayıt, çelişkili seviye).
- `content/v2/registry/lexemes.v1.json` `lx:seit`: pos "phrase"; `lexicon/batch-003.json`'da "prep" (doğrusu edat).
- `content/v2/registry/lexemes.v1.json` `lx:erkältet`: tr "soğuk almış, nezle olmuş" — "nezle olmuş" Schnupfen'e karşılık gelir; "üşütmüş, soğuk almış" daha doğru.
- `content/v2/domains/arzt/proposals.json` `lx:Schnupfen`: pl "-" doğru; tr "nezle, burun akıntısı" kabul edilebilir. `lx:schwindelig`, `lx:übel`: tr alanında örnek cümle parantez içinde duruyor; derin kartta örnek alanına taşınmalı.
- `content/v2/domains/arzt/SOURCES.md` Bairisch bölümü (The Local kaynağı) bu dosyada kullanılmıyor; arzt/02–04 incelemesinde kaynağın gerçekten "Pfiat di", "Servus", "gell" dediği web'den doğrulanmalı.
- `web/src/screens/Player.tsx`: şıklar karıştırılmıyor (bkz. Yöntem); arzt/02–04'te bütün `ans` = 0.
