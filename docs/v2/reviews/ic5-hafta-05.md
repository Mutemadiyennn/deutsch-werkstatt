# İÇ-5 · 5. hafta dilbilimci incelemesi (29.–35. gün)

Tarih: 2026-11-23 · inceleyen: dilbilimci-ajan · tek tam tur (PM-089) · taş: M1

## Kapsam
- `content/v2/m1/gun-29.json` … `gun-35.json`: 7 gün, 21 halka, 171 görev cümlesi, 7 sahne, 14 ses, 7 prova, 7 okuma, 77 sınav maddesi
- `content/v2/m1/hafta-sonu-testi-05.json`: 12 madde
- `content/v2/m1/gorulmemis-05.json`: 7 durum
- `content/v2/registry/lexicon/batch-ic5-h5.json`: 9 K1 kartı
- `content/v2/registry/grammar.json`: 10 kaydın `h_tr`, `tr`, `table` alanları

Her Almanca satır, her kabul listesi ve her Türkçe alan okundu. Eklenen her söyleyiş K(t) sınamasından geçirildi.

## Bulgular ve düzeltmeler

| # | Dosya · yer | Eski → yeni | Neden |
|---|---|---|---|
| 1 | gun-29…35 · `gun_sinavi` dikte maddeleri (12 kabul) ve test `t10` (1 kabul) | **Baeckerei**, **faengt**, **Muenchen**, **Verkaeufer**, **Gemuese**, **fuer**, **Glueckwunsch**, **fuenf faehrt**, **spaet**, **gefaellt** kabulleri silindi; `t10`: **faengt** → **fängt.** | Dikte kabulü yalnız büyük-küçük harf ve noktalama farkıdır; ae/oe/ue yazımı yasak. |
| 2 | gun-29 · h4 sahnesi | Ortam: "Stadler fırınının önündeki küçük sosis tezgâhı" → "Fırının yanındaki küçük sosis büfesi"; konuşan `ch:stadler` → `der Verkäufer` | Fırıncı Gerti Stadler sosis satmaz (world.json: fırıncı). Almanca satırlar aynı kaldı. |
| 3 | gun-31 · h3 · **Tobi ist schon auf dem Bahnsteig.** | tr: "Tobi zaten peronda." → "Tobi çoktan peronda." | **schon** burada çoktan demek; zaten başka anlam verir. |
| 4 | gun-32 · h2 sahnesi | **das Baby von meiner Schwester** → **das Baby von meinem Bruder** (tr de) | 31. günde Derya'nın kız kardeşi gece çalışan hemşire; üç haftalık bebekle çelişiyordu. |
| 5 | gun-32 · h2 sahnesi | tr: "Bebek kaç yaşında?" → "Bebek ne kadarlık?" | Üç haftalık bebek için doğal Türkçe. |
| 6 | gun-32 · a2 (Tobi'nin mesajı) | **Ich bin um zwei wieder da.** → **… um zwölf …**; ortam "Öğlene doğru" → "Sabah"; ayrıntı seçeneği, kolay dikte (`drei / zwölf / zehn`, ans 1), usta dikte ve eylem çeldiricisi uyarlandı | Aynı gün sahnede Tobi öğlen kantinde; ikide dönmesi çelişiyordu. |
| 7 | gun-32 · prova n3 | **Und was trinkst du gern?** → **Und was trinkst du?** (tr "Peki ne içersin?"); uygunsuz seçenek geri bildirimi "ne içtiğini" → "ne içeceğini" | Genel zevk sorusuna **Egal, danke.** ve **Milch, bitte.** cevap olmaz; Tobi içecek getiriyor (n4). |
| 8 | gun-32 · okuma | **Donnerstag: Fleisch mit Semmel.** → **Donnerstag: Fisch mit Gemüse.** (tr "sebzeli balık"); o2 çeldiricisi "perşembe" → "pazartesi" | Yemek adı olarak doğal değildi. Çeldirici, balık günü iki doğru cevap doğurmasın diye değişti. |
| 9 | gun-33 · sahne s8 ve zor dikte d3 | **Ich bin bei meiner Familie.** → **Ich muss arbeiten.** (tr, banka, kabuller) | 35. günde Herr Wimmer cumartesi çalıştığını söylüyor; iki gün çelişiyordu. |
| 10 | gun-33 · a1 c5 | tr: "Beni yakında arayabilir misin?" → "Beni en kısa zamanda arar mısın?" | Doğal Türkçe. |
| 11 | gun-33 · prova n3 | tr: "Daha pasta var." → "Pasta daha bitmez." | **Es gibt noch Kuchen** pazar günü de pasta kalacağını söylüyor. |
| 12 | gorulmemis-05 · g3 | **Kommst du auch?** → **Kommen Sie auch?** | Luka müşteriyle **Sie** konuşuyor (2. gün, aynı dosyada g6). |
| 13 | gorulmemis-05 · g6 `why_tr` | Noktalı virgül → iki cümle | OD-9.2 sembol kuralı. |
| 14 | batch-ic5-h5 · `lx:Lohn:5` | **Vierzehn Euro** → **Sechzehn Euro** (tr "On altı avro") | Yasal asgari saat ücreti 2027 başında 14,60 avro oluyor; 14 avro yasanın altında kalırdı. |
| 15 | grammar · `gr:a1-11:t5` `tr` | "Yirmiden sonra **ste** eklenir" → "Yirmiden başlayarak **ste** eklenir" | Yirmi de kurala dahil (**zwanzigste**). |
| 16 | Kabul listesi ekleri | gun-29 s8: **Um acht Uhr rufe ich die Praxis an.**, **Ich rufe um acht Uhr die Praxis an.** · gun-30 s8: **Morgen rufe ich meine Vorgesetzte an.**, **Ich rufe morgen meine Vorgesetzte an.**, **Morgen rufe ich meinen Chef an.** · gun-33 s7: **Ich kann leider nicht kommen. Ich muss arbeiten.** | Haksız ret riski. Hepsi K(t) içinde (sınama: bilinmeyen 0). |

Bulgu: 16 (1 biçim kuralı, 6 gerçeklik ve iç tutarlılık, 1 hitap, 1 konuşma uyumu, 4 Türkçe karşılık, 1 OD-9 sembolü, 1 dilbilgisi açıklaması, 1 kabul eki). Yaklaşık 330 madde üzerinden hata oranı %5.

## Karar verilen, değişmeyen noktalar
- **Bilerek yanlış seçenekler kaldı:** 30. gün **Am Montag ich arbeite**, 31. gün **Ich bin {ein Arzt|eine Ärztin}**, 35. gün **Ich auf stehe um neun**. Üçü de Türkçe konuşanın gerçek hatası, `uygun: false`, geri bildirim doğru biçimi gösteriyor ve düğüm kendine dönüyor. Kabul listeleri yalnız aynı hatanın yazımlarını içeriyor.
- **Am Ende vom Monat** kaldı: konuşmada, özellikle güneyde doğal. Kabul listesinde **am Monatsende** ve **Ende des Monats** var.
- **Heute ist leider Zugausfall.** kaldı, ama zayıf: konuşmada duyulur, anonsta doğal olan **Der Zug fällt heute aus.** Sınama sonucu **Zug**, **gibt** ve **fällt … aus** 31. günde K(t) dışında; doğal karşılık yeni sözcük gerektiriyor. Kart ipucu doğru biçimi zaten veriyor.
- **Dünya ayrıntıları kaldı:** Derya'nın hemşire kız kardeşi ve aşçı erkek kardeşi, Tobi'nin satış elemanı olması world.json ile çelişmiyor.

## Lex'in soruları
- **Vorgesetzte, çoğul Vorgesetzten:** doğru (**die Vorgesetzten**). Sıfat gibi çekilir; kart **mein Vorgesetzter** ve **der Vorgesetzte** ayrımını doğru veriyor.
- **Lohn / Gehalt:** hata notu doğru ve yeterli (saat ücreti ve işçi ücreti **Lohn**, aylık sabit maaş **Gehalt**).
- **Der Zug steht auf** hata notu: gerçekçi. Türkçede kalkmak iki anlamı da taşır ve **aufstehen** aynı hafta öğretiliyor. Kaldı.
- **Fahrschein:1:** cümle bir soru (**Kann ich … beim Fahrer kaufen?**), olgu iddiası değil; her şehirde sorulabilir. Kaldı.
- **Lohn:5:** sayı değişti (bulgu 14).

## Kalan açık noktalar
1. Zor ve usta diktede iki cümleli satır 10 yerde (31 v1 d4; 32 v1 d3, d4; 33 v1 d3, d4, a2 d3; 34 v1 d4; 35 v1 d3, d4, a2 d4). FORMAT tek cümle istiyor; doğrulayıcı geçiriyor. Dil hatası değil, satır bölme işi; dokunulmadı.
2. 30. gün sahnesinde **am Samstag ist die Firma geschlossen**, 35. günde Herr Wimmer cumartesi çalışıyor ve Derya'ya **arbeiten Sie morgen?** diye soruyor. Tek başına çelişki sayılmaz ama okur fark edebilir.
3. 29. gün: Herr Wimmer'in mesajı **Herr Lechner ist morgen noch krank** diyor, provada Tobi **Morgen komme ich wieder** diyor. Açıklanabilir (Tobi akşam fikir değiştiriyor), dokunulmadı.
4. 31. gün kabul listelerinde K(t) dışı ama doğru söyleyişler var (**Der Zug fällt aus.**, **Wann fährt der Zug ab?**). Kabul olarak yerinde; öğrenciden istenmiyor.
5. `hafta-sonu-testi-05.json` ve `gorulmemis-05.json` dosyalarında `review` alanı yoktu; görev gereği eklendi. Doğrulayıcı hata vermedi.
6. Hafta kapısındaki bilinen 4 madde (üç ses cevapla + **Arm** görseli) aynen duruyor.

## Son denetim çıktıları (düzeltmelerden sonra)
- `kdenet.ts 29 35`: HALKA HATA yok, "görev:" satırı yok, TEKRAR yok, KALIP ÖRNEKSİZ yok. Yalnız bilinen dört KESİN UYUŞMAZ satırı (trinken 32/33, Bett 34/35). Görev cümlesi 25, 25, 23, 23, 23, 24, 28; bilinmeyenli 0.
- Doğrulama ağacı `content:validate`, halka sınıfı dışındaki HATA satırı: 0.
- `dikis-kos.ts --hafta 5`: 29.–35. gün satırlarının hepsi 0 / 0 / 0 / 0 / 0. Çıktıdaki "İhlal: 55" satırının tamamı 36. güne ait (6. hafta, bu incelemenin dışında).
- `hafta-kapisi-kos.ts --hafta 5`: Öğretilmeden istenen 4 (kesin 2, sınırda 2), değişmedi. Hafta sonu testi %100 (12/12). Görülmemiş durum 7/7, sınanmayan can_do yok.
- Depo kökünde `content:validate`: yalnız bilinen şema sınıfı (gün > 7, dersler deseni).

`review` alanı düzeltilen bütün dosyalarda `draft` (okur ve örneklem sırada).

**Karar: ONAY** (düzeltmelerle birlikte yayına uygun; açık nokta 1 ve 2 baş oturumun kararına bırakıldı).
