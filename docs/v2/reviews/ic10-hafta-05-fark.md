# İÇ-10 · 5. hafta fark turu (commit `7c10182a`)

Tarih: 2026-11-23 · inceleyen: dilbilimci-ajan · taş: M1 · önceki tam tur: `ic5-hafta-05.md` (ONAY)

## Kapsam
Yalnız `7c10182a` ile değişen 5 düğüm (4 dosya): 29. gün prova n1 ve n4, 30. gün `m1:30:s1`, 32. gün `m1:32:a2` c4 (dikte d3, cevapla), 35. gün h1 `lx:Mama` görev cümlesi. Her düğümde Almanca, Türkçe karşılık, kabul listesi ve aynı düğümdeki geri bildirim, `why_tr`, ana fikir, ayrıntı, kanıt, eylem alanları okundu.

## Düğüm düğüm sonuç

| # | Yer | Yeni cümle | Sonuç |
|---|---|---|---|
| 1 | gun-29 · prova n4 (karşı taraf) | **Ich stehe immer zu spät auf! Kannst du um halb fünf anrufen?** · "Dört buçukta arar mısın?" | Temiz. Nesnesiz **anrufen** konuşmada doğal, kimin aranacağı bağlamdan açık. Seçenekler (**ich rufe dich … an**) ve "Tobi dört buçukta aranmak istiyor" geri bildirimi uyumlu. |
| 2 | gun-29 · prova n1 seçenek | **Mir geht's gut, danke. Und dir?** · "İyiyim, sağ ol. Ya sen?" | Almanca ve Türkçe doğru. **Na, wie geht's?** sorusuna uygun, geri bildirim (**Und dir?**) uyumlu. Kabul listesi daralmıştı: bulgu 1. |
| 3 | gun-30 · `m1:30:s1` dikte | **Am Dienstag gehe ich mit dem Pass zum Rathaus.** | Temiz. **zum Rathaus gehen** doğru ve doğal. Üç kabul aynı cümlenin yazımları. `why_tr` (**Am Dienstag** başta, **gehe** ikinci yerde) geçerli. |
| 4 | gun-32 · a2 c4, d3, cevapla | **Kannst du bitte eine Bratwurst holen?** · "Bir sosis alabilir misin lütfen?" | Temiz. Rica **bitte** ile daha da doğal. Sosisin Tobi için olduğu c2 ve c3'ten anlaşılıyor. Ana fikir ("Senden bir şey rica ediyor", kanıt c4), eylem ("Kantinden onun için bir sosis al", kanıt c2 + c4), d5 örneği ve cevapla kabulleri (8 adet) uyumlu. d3 bankası cümlenin 6 sözcüğü + 2 çeldirici, tutarlı. |
| 5 | gun-35 · h1 `lx:Mama` | **Am Freitag rufe ich meine Mama an.** · "Cuma günü annemi arıyorum." | Almanca ve Türkçe doğru. Aynı kartın öbür cümlesi (**Derya ruft ihre Mama an: …**) ile özne ve bağlam farklı, tekrar sayılmaz. Günün a2 sesi (**Ich bin bei meiner Mama.**) ve eylemi eski cümleye bağlı değildi, bağlam bozulmadı. Kabul eki: bulgu 2. |

## Bulgular ve düzeltmeler

| # | Dosya · yer | Eski → yeni | Neden |
|---|---|---|---|
| 1 | gun-29 · prova n1, 2. seçenek `accepted` | Eklendi: **Mir geht's gut. Und dir?**, **Mir geht es gut. Und dir?**, **Danke, mir geht's gut. Und dir?** | Commit, **danke**'siz **Mir geht es gut. Und dir?** kabulünü silmişti. Yeni ana cümlenin en yakın varyantı (danke'siz) haksız ret alırdı. Silinen **Gut, danke. Und dir?** geri eklenmedi: değerlendirici noktalamayı yok saydığı için **Gut, danke! Und dir?** ile aynı. |
| 2 | gun-35 · h1 `lx:Mama` `accepted` | Eklendi: **Am Freitag rufe ich Mama an.** | "annemi" karşılığında iyelik eksiz **Mama** Almancada gündelik ve doğru; ret haksız olurdu. |

İki bulgu da kabul listesi eki; ana cümlelere, Türkçe alanlara ve geri bildirimlere dokunulmadı. Hata oranı: 2 / 5 düğüm (ikisi de haksız ret riski, yanlış içerik yok).

## Kısıt denetimi
- Değişen düğümlerde ve eklenen kabullerde **mich**, **ins**, **seiner**, **seine**, **für mich** yok.
- Ekler yalnız `accepted[1+]` konumunda. Tekrar denetimi (dikiş (d), `kdenet` TEKRAR) seçeneğin `de` alanına ve `accepted[0]`'a bakıyor; ekler yeni tekrar doğurmaz.
- Yeni cümlelerin ön koşulları bütünleşik ağaçta (`ic10/butunlesik`, dosyalar bu dalla aynı) önceden var: **wie geht's** 13. gün, **Mir geht es gut** 8. ve 12. gün, **zum Rathaus** 27. gün, **Kannst du bitte** 15. gün, **holen** 25. gün, **anrufen** 29. gün. **Mir geht's gut, danke. Und dir?** ve **Am Freitag rufe ich meine Mama an.** başka günde üretim cümlesi olarak geçmiyor.

## Doğrulama
- Bütünleşik ağaçta `content:validate`: 29., 30., 32., 35. gün için HATA satırı 0 (ağacın toplamı 7 hata, hepsi başka günlerde). Bu koşu düzeltmelerimden önceki dosyalarla yapıldı; o ağaca yazmadım.
- Bu dalda `content:validate` düzeltmelerden önce ve sonra satır satır aynı: 132 hata, 212 uyarı. Hataların hepsi dalın tek başına koşulmasından geliyor (2.–4. hafta bu dalda yok; `ic5-hafta-05.md`'de kayıtlı bilinen sınıf). Düzeltmeler yeni hata ya da uyarı eklemedi.
- Bu dalda `node_modules` yok; doğrulayıcı bütünleşik ağacın bağımlılıklarına geçici bir bağla koşuldu, bağ kaldırıldı.
- Koşulmayanlar: `hafta-kapisi-kos.ts` ve `dikis-kos.ts` yeniden koşulmadı. Eklerin etkisi yukarıdaki kural okumasına dayanıyor; baş oturum bütünleşik ağaçta birleştirince bir kez koşmalı.

## Kalan notlar (engel değil)
- 29. gün prova n4 için doğrulayıcı "öğretilmemiş kelime isteniyor: dich" uyarısı veriyor. Bu commit'ten önce de vardı, bu turun kapsamı dışında.
- `review` alanlarına dokunulmadı (önceki turdaki gibi `draft`; okur ve örneklem sırada).

**Karar: DÜZELTİLDİ-ONAY**
