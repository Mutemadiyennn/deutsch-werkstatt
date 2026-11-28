# Örneklem kontrolü: Kurs Ü2 (A2, 10. hafta, gün 64–70)

- Ajan: qa (örneklem), 2026-11-27. Hat: yazar → dilbilimci → okur → **örneklem**. Dosyalar dilbilimci ve okur turundan sonra; içerik dosyalarına dokunulmadı.
- Kapsam: `content/v2/m1/gun-64.json … gun-70.json`, `hafta-sonu-testi-10.json`, `gorulmemis-10.json`, `dn-10.json`, `content/v2/registry/lexicon/batch-a2-k02.json`.
- **Tohum: `20261127`** (`random.Random(20261127)`; sıra: üretim 12, bölüm 6, halka 4, sözlük 4, test/görülmemiş 4; her biri `rng.sample`).
- Havuzlar: üretim = halka dışındaki `accepted` taşıyan her nesne (gün dosyaları + dn-10) **336**; dinleme/sahne bölümü (`sahne.bolumler` + `sesler[].bolumler`) **32**; halka **17**; sözlük kartı **20**; test + görülmemiş maddesi **20** (12 + 8). Örneklem 30 öğe.
- Bilinen sayılan: A1 gün 1–56 (`curriculum/a1-kesin.json` `ogretilmis_sayilan` + `gunler[].kartlar` + `cerceve`) + bu haftanın `yeni_kartlar`, kalıp satırları ve `dn-10` dil noktaları. Eşdeğerlik: `web/src/core/grading.ts` `norm()` (küçük/büyük harf, ümlaut/ß, noktalama farkı yok) + `esdeger.ts` `v2Sira` (yalnız düz cümlede öğe başa alma; soru cümlesinde sıra değişikliği kabul edilmez).
- Bağlam: `hafta-kapisi-kos.ts --hafta 10` GEÇTİ (öğretilmeden istenen 0, test %100, görülmemiş 8/8); `dikis-kos.ts --yarim` 64–70 ihlal 0.

## Sonuç
**28 GEÇTİ, 2 küçük bulgu (%6,7) → GERİ** (eşik: 30 öğede ≤ 1). İkisi de `gun-64.json`'da, dünya tutarlılığı; her biri tek cümlelik düzeltme. Dosyanın tamamı geri gönderilmez; dilbilimciye iki satırlık fark yeter.

| # | Dosya · öğe | Sonuç | Neden |
|---|---|---|---|
| 1 | gun-64 · a2 (anons) b1 d4 usta "Eine Nachricht für alle Kollegen im Lager." | GEÇTİ | 3 yazım; Nachricht 39, Kollege 15, Lager 64. |
| 2 | gun-70 · a1 (Wimmer sesli mesaj) b1 d2 orta "Wir brauchen ___ am Samstag." | GEÇTİ | Hilfe 32; tek cevap. Wimmer "Sie" diyor, dünya kartıyla uyumlu. |
| 3 | gun-66 · okuma o10 guided_response "Möchtest du Vollzeit oder Teilzeit arbeiten?" | GEÇTİ | 13 doğal cevap; lieber 43, verdienen/Vollzeit/Teilzeit 66. why_tr terimsiz. |
| 4 | gun-67 · sahne b3 d3 zor "Aber am Telefon verstehe ich nicht viel." | GEÇTİ | banka çeldiricileri (Handy, viele) yerinde; Ioana'nın Erzieherin isteği 66 ile tutarlı. |
| 5 | gun-69 · okuma o8 gap "___ du früher in einer Fabrik arbeiten? (müssen)" | GEÇTİ | Musstest tek doğru; "çift s kalır, sonda -test" terimsiz ve doğru. |
| 6 | gun-65 · prova n3b seçenek "Danke! Ich versuche es." | GEÇTİ | versuchen 64; 6 kabul, hepsi doğal. Wimmer "Frau Aksoy" diyor (Sie), tutarlı. |
| 7 | gun-65 · gun_sinavi s1 dikte "Ich kann gut mit dem Computer arbeiten." | GEÇTİ | 3 yazım; dn:10-gut-koennen. |
| 8 | gun-67 · sahne b1 d2 orta "Aber Sie müssen ___ kommen." | GEÇTİ | regelmäßig 67; ümlaut/ß farkı norm() ile kabul. |
| 9 | gun-68 · sahne b2 d3 zor "Konntet ihr alle die Übung zu Hause machen?" | GEÇTİ | çeldiriciler Konntest/Konnten tam tuzak (dn:10-modal-tuzak 3); Übung 68. |
| 10 | gun-66 · prova n3 seçenek "Ja, das geht. Sie hat nur am Vormittag Zeit." | GEÇTİ | Stadler ilanı (Mo–Fr 6–11) gün 66 ilan C ve görülmemiş g7 ile aynı. |
| 11 | gun-66 · gun_sinavi s4 dikte "Früher musste er Vollzeit arbeiten." | GEÇTİ | 3 yazım; "musste iki s ile" doğru. |
| 12 | gun-64 · gun_sinavi s8 tr_de "Garson olarak deneyimin var mı?" | GEÇTİ | 4 kabul (Kellner/Kellnerin, schon). Küçük not: "Hast du als Kellner Erfahrung?" de doğru ama kabulde yok (soru cümlesi, `v2Sira` kapsamaz); kalıp "Erfahrung als …" olduğu için engel sayılmadı. |
| 13 | gun-66 · sahne b1 (Ioana: eski meslek) | GEÇTİ | 7 cümle doğal; Heimat 45, Anfang 2, schlecht 32; gist/ayrıntı kanıtları doğru; cevapla `{Koch\|Köchin}` yer tutucuları doğru. |
| 14 | gun-66 · a2 (Derya sesli mesaj) b1 | GEÇTİ | Lebenslauf/Arbeitgeber 66; eylem "akşam Derya'yı ara" c6 ile doğru; Derya'nın kız kardeşi yeni bilgi, çelişki yok. |
| 15 | gun-64 · sahne b2 (Molada eski işler) | **BULGU** | Dünya tutarlılığı: s15 Tobi **"Heute arbeite ich lieber im Lager. Ohne Schichten!"** (tr "Vardiyasız!") — aynı gün a2 anonsunda Wimmer depodaki herkese **"Ab Montag fängt die Schicht um sechs Uhr an"** diyor, gün 68 a1'de aynı ekibin **Schichtplan**'ı var. Öğrenci aynı gün depoda hem vardiya yok hem vardiya var duyuyor. **Öneri:** s15 → "Heute arbeite ich lieber im Lager. Am Wochenende habe ich frei!" (tr "Bugün depoda çalışmayı tercih ediyorum. Hafta sonu boşum!"); d3 yalnız ilk cümleyi yazdırıyor, etkilenmez. Not: s13 "Das konntest du nicht, oder?" sınırda (dilbilimci md. 5 ile aynı görüş), sayılmadı. |
| 16 | gun-65 · sahne b1 (yeni bilgisayar) | GEÇTİ | Wimmer'in "Haben alle kurz Zeit?" sözü dünya kartındaki ifadesi; Tobi "Ich kann gut Auto fahren" 64 anonsuyla (şoför aranıyor) uyumlu. |
| 17 | gun-68 · a2 (kurs binası anonsu) b1 | GEÇTİ | c2–c6 doğal; pazartesi danışma bilgisi aynı günün sahnesi s14 ile tutarlı. Takip notu: `speaker: "die Kursleiterin"` kendisi için "Die Kursleiterin ist krank" diyor; ekranda görünmüyor (yalnız ses ataması), ama konuşmacı "das Kursbüro" gibi biri olmalı. |
| 18 | gun-65 · sahne b2 (kim güvenilir) | GEÇTİ | pünktlich 45, oft 6, Team/zuverlässig 65; "stimmt nicht" sorusu s10'a dayanıyor. |
| 19 | gun-64 · halka h2 (Kellner, Fahrer, Schicht) | **BULGU** | Dünya tutarlılığı: görev cümlesi **"Tobi hat als Kellner gearbeitet."** (kabulde "Tobi hat auch / früher als Kellner gearbeitet") — aynı gün sahnede Tobi iki yıl otelde **Koch** (s9–s10), halka 4'te "Tobi wollte Koch werden. Er hat es zwei Jahre versucht." Halka sahneden önce geldiği için öğrenci önce "Tobi garsondu" diye üretiyor, sonra aşçı olduğunu duyuyor. **Öneri:** kişiyi değiştir: "Luka hat als Kellner gearbeitet." (Petrović Almanya'daki ilk yıllarını anlatan karakter; h3 sahnesiyle uyumlu) ya da "Ioanas Bruder hat als Kellner gearbeitet." Üç kabul aynı biçimde güncellenir. Diğer 7 cümle ve h2 içi sahne (Ioana'nın kardeşi şoför) GEÇTİ. |
| 20 | gun-69 · halka h1 (Chefin, Studium) | GEÇTİ | 8 cümle doğal, kabuller ≥ 3; Luka sahnesi tutarlı. Takip notu: öğrencinin ağzından "Meine Chefin ist sehr nett / Ich muss meine Chefin fragen" — dünyada öğrencinin şefi Wimmer (erkek); genel alıştırma cümlesi sayıldı. "Die Chefin hat …" tr "Şefin (kadın) …" "senin şefin" diye de okunabilir. |
| 21 | gun-64 · halka h3 (Stelle, damals; dersten_sonra) | GEÇTİ | 6 cümle doğal; Luka sahnesi ("Damals konnte ich kein Wort Deutsch") dünya kartıyla ("Ich war auch mal neu hier") uyumlu. |
| 22 | gun-67 · halka h2 (Weiterbildung, Abschluss, Möglichkeit) | GEÇTİ | Prüfung 17, bekommen 9; Derya/Ioana bilgileri 66–67 sahneleriyle tutarlı. "Gibt es eine Möglichkeit am Wochenende?" biraz genel ama bağlamda anlaşılır. |
| 23 | lex · lx:Lager | GEÇTİ | forms 3 tek cevaplı (Lager, Lager, im); mistakes gerçek hatalar; örnekler doğal. |
| 24 | lex · lx:Computer | GEÇTİ | "im Computer arbeiten", "den Computer öffnen" (Türkçeden birebir), "zwei Computers" gerçek hatalar; forms aus/am tek cevap. |
| 25 | lex · lx:Beratung | GEÇTİ | forms tek cevap; "Geh doch mal ___ Beratung" → zur; örnek 3 "hat echt was gebracht" doğal alltag. |
| 26 | lex · lx:Elektriker | GEÇTİ | also_ok Handwerker hoşgörülü ama yanlış değil; "Ich bin ein Elektriker" ve "Elektrik" gerçek hatalar. |
| 27 | gorulmemis-10 · g7 (meslektaşın kızına ilan anlat) | GEÇTİ | 10 kabul; ilan bilgisi gün 66 Stadler ilanıyla aynı. "sucht jemand" konuşma dilinde kabul edilir (Duden). |
| 28 | gorulmemis-10 · g6 (Huber: dün gelemedim) | GEÇTİ | 11 kabul, konnte/musste; Huber muayenehane sekreteri, tutarlı. |
| 29 | hafta-sonu-testi-10 · t09 "Was möchten Sie werden?" → Koch | GEÇTİ | 6 kabul; Koch/Köchin gün 64 h2 kalıp satırında gösteriliyor, hafta boyu tekrar ediyor. Bkz. aşağıda lx:Koch kartı. |
| 30 | gorulmemis-10 · g4 (Brandl'a yardım öner) | GEÇTİ | 11 kabul; Brandl 79 yaşında alt kat komşusu, Sie doğru. "tragen" bu tabloda henüz yok, kabulde olmaması doğru. |

## GERİ listesi (dilbilimci farkı, iki satır)
- `content/v2/m1/gun-64.json` · `sahne.sahneler[s15]` · "Ohne Schichten!" aynı günün anonsu ve gün 68 Schichtplan ile çelişiyor → ör. "Am Wochenende habe ich frei!" (tr güncellenir).
- `content/v2/m1/gun-64.json` · `halkalar[m1:64:h2].gorev_cumleleri` (lx:Kellner, 2. cümle) · "Tobi hat als Kellner gearbeitet." Tobi'nin aynı gün anlatılan aşçılık geçmişiyle çelişiyor → başka kişi (ör. Luka), üç kabul birlikte.

## Örneklem dışı gözlem (sorulacak, sayılmadı)
- **lx:Koch kartı yok.** PLAN.md gün 64 satırı ve dilbilimci/okur raporları 21 kartlık partide `lx:Koch` kartını inceliyor (okur md. 85, 1765, 2013). Şimdiki `batch-a2-k02.json` 20 kart, `gun-64.json` `yeni_kartlar` ve `curriculum/a2-kesin.json` 64. gün satırında `lx:Koch` yok; depoda başka `lx:Koch` kimliği de yok (dosya saatleri 17:19, okurdan sonra). Koch hafta boyu üretim hedefi (t09, gun-64 görevleri, dn:10-beruf-wunsch başlığı "Ich möchte Koch werden"); kalıp satırında gösterildiği için hafta kapısı geçiyor, ama kart olmadan Bahçe tekrarı yok. Bilinçli bir çıkarma değilse kart geri gelmeli.

## Takip (engel değil)
- #12 kabul listesine "Hast du als Kellner Erfahrung?" eklenebilir.
- #17 `gun-68` a2 `speaker` alanı.
- #20 "Meine Chefin" cümleleri öğrencinin dünyadaki şefiyle (Wimmer) uyumlu hâle getirilebilir (ör. "Derya hat eine neue Chefin" türü üçüncü kişi).
