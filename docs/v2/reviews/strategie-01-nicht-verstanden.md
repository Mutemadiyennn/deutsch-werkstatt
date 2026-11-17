# İnceleme: strategie/01-nicht-verstanden.json
İnceleyen: dilbilimci-ajan · 2026-11-17 · Sonuç: **KAPANDI** (`review.status = reviewed`)

## Sayılar
- İncelenen madde: **178** (14 parça, 16 karşı taraf cümlesi, 6 cevap seçeneği, 28 build, 38 drill, 31 diyalog satırı, 12 rol oyunu öğesi, 22 dinleme satırı/sorusu, 4 konuşma, 1 görev, 6 mistakes_tr)
- Dil/doğallık/tutarlılık hatası: **11** → oran **%6,2**
- accepted[] eksikliği (haksız ret riski): 66 üretim maddesinin (build + üretim drill'leri) **52**'sinde yaygın doğru varyant eksikti; 169 varyant eklendi (200 → 369)
- Doğru şıkkın konumu: 8 çoktan seçmeli maddenin 8'inde doğru şık 0. sıradaydı; yeniden dağıtıldı
- Bairisch katmanı: yok (doğrulanacak "verified" iddia yok). Olgusal/hukuki iddia: yok. Kişisel bilgi, kurs/kitap adı: yok.

## Hatalar (önce → sonra)
1. `title_de`: "Sagen, dass man nicht verstanden hat" → "Sagen, dass man **etwas** nicht verstanden hat". Nesnesiz "verstehen" burada eksik kalıyor.
2. `ch:strategie:nicht-verstanden.use_tr`: "Gündelikte özne düşer: 'Hab ich …'" → "Gündelikte baştaki 'das' düşer, özne 'ich' kalır: '(Das) hab ich …'". Dilbilgisi açıklaması yanlıştı: düşen öğe özne değil, baştaki nesne.
3. `ch:strategie:wie-bitte.lexemes`: `lx:Entschuldigung` → `lx:bitte`. "Wie bitte? / Bitte?" içinde Entschuldigung geçmiyor.
4. `ch:strategie:lerne-deutsch.layers.alltag`: "Mein Deutsch ist noch nicht so gut." → "Ich lern noch Deutsch." Alltag katmanı Türkçe karşılıkla ("Hâlâ Almanca öğreniyorum") aynı cümle değildi; eski cümle use_tr'ye "aynı işi gören başka cümle" olarak taşındı (b07'de ayrıca çalışılıyor).
5. `responses[o11].options[1]`: "Danke, aber Deutsch ist okay – bitte nur langsam." → "… – nur bitte etwas langsamer." ("bitte nur langsam" doğal değil); Türkçesi uyarlandı.
6. `b26.prompt_tr`: "Bu kadar hızlı değil!" → "O kadar hızlı gitme!" (Almancadan birebir çeviri, Türkçede söylenmez).
7. `listening h2`, 2. satır tr: "Dur, o kadar hızlı değil." → "Dur, yavaş ol." (aynı gerekçe).
8. `v2` son B satırı accepted: "Okay, danke, dass Sie mir Bescheid sagen." → "… Bescheid **gesagt haben**." (bilgi verildikten sonra teşekkür: Perfekt).
9. `v3` son A satırı: "Gut. Dann bis nächste Woche." → "Gut. Dann bringen Sie nächste Woche alles mit." Memurun "haftaya görüşürüz" demesi diyalogda dayanaksızdı; istenen belgelerle tutarlı kapanış.
10. `roleplay.surprises[0].tr`: "…biliyor musunuz bari?" → "Kaminkehrer ne demek, biliyor musunuz ki?" ("überhaupt"un karşılığı "bari" değil).
11. `roleplay.surprises[3].tr`: "Ama Almancanız iyi!" → "Ama Almancanız şimdiden iyi!" ("schon" çevrilmemişti).

## accepted[] eklemeleri (özet; tam liste dosyada)
- En riskli eksikler: d21'de öğretilen parçanın kendisi ("Würden Sie bitte etwas langsamer sprechen? Ich lerne noch Deutsch.") listede yoktu; d35'te "Ich kenne das Wort nicht."; b06'da "Ich lerne immer noch Deutsch." ("hâlâ" = immer noch); b07'de "Ich kann noch nicht so gut Deutsch."; d34'te "…, verstehe ich." / "…, verstehe ich es." / "Ich verstehe, wenn Sie langsam sprechen."; b04'te "Können Sie das bitte wiederholen?" ve "noch mal" yazımı; d28'de yalın "Ja." / "Klar."; d16'da "bitte"siz du-biçimleri.
- Diyalog B satırlarının accepted[] listeleri serbest cevap niteliğinde olduğundan genişletilmedi (4'er varyant var; kalan durumlar equiv_check ve "Benim cevabım da doğru" ile karşılanır). Yalnızca 8. maddedeki yanlış varyant düzeltildi.

## Kalan şüpheler
- Yok. Not: "Sammeln Sie Punkte?", "Dann krieg ich sieben achtzig.", "Haben S' …", "Kaminkehrer", "nimmer" gerçek Bavyera gündelik kullanımıdır; Alltag katmanında ve reductions olarak verilmeleri doğru.

## Yöntem
- Dosyanın tamamı okundu (parça, karşı taraf cümlesi, cevap seçeneği, build, drill, diyalog satırı, rol oyunu, dinleme, konuşma, görev, mistakes_tr).
- accepted[] değerlendirmesi `web/src/core/grading.ts` kurallarına göre yapıldı: büyük/küçük harf, noktalama, tırnak, kesme işareti ve ümlaut yazımı yok sayılıyor; ama "nochmal / noch mal / noch einmal", "gern / gerne", "habe / hab", "Dr. / Doktor", dört haneli yılın rakamla/yazıyla yazımı ve kelime sırası ayrı varyant ister. Yapay zekâ yoksa listede olmayan doğru cevap "yanlış" sayılır; bu yüzden yaygın varyantlar eklendi. Kanonik (ilk) varyantlar korunmuştur (b13/arzt hariç, aşağıda).
- Çoktan seçmeli maddelerde (dinleme soruları, pick) doğru şık her zaman 0. sıradaydı ve oynatıcı bu şıkları karıştırmıyor (`web/src/screens/Player.tsx`, drill "pick" ve dinleme soruları `opts` dizisini olduğu gibi basıyor). Şıkların sırası dosyada değiştirildi; `ans` buna göre güncellendi (yeni dağılım: 1,2,0,1,2,0,1,0).
- Her düzeltme turundan sonra `npm run content:validate` → 0 hata; `npm test` → 83/83.

## Başka dosyada bulgular (düzeltilmedi)
- `content/v2/registry/lexemes.v1.json` `lx:lieber`: pos "adj" → zarf olmalı ("gern"in üstünlük derecesi).
- `content/v2/domains/strategie/proposals.json` `lx:aufschreiben`: asgari kayıtta ayrılabilirlik/Perfekt yok (LEX derin kartında: schreibt auf, hat aufgeschrieben, separable).
- Sözlük partilerinde isimlerin `de` alanı artikelli ("die Entschuldigung", "das Wort"), `lexemes.v1/v2` ve proposals'ta artikelsiz; aynı kimlik iki biçimde duruyor (`lx:Entschuldigung`, `lx:Wort`). Biçim birliği gerekir.
- `web/src/screens/Player.tsx`: drill "pick" ve dinleme soruları şıkları karıştırmıyor; diğer 8 senaryoda bütün `ans` değerleri 0 (doğru cevap hep ilk şık).
