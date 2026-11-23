# İÇ-9 · A2 11. hafta · örneklem kontrolü

İçerik hattının son halkası: yazar → dilbilimci → okur → **örneklem**. Kontrolü qa ajanı yaptı, önceki raporlara bakmadan.
Dal `content/a2-hafta-11`. Dosyalar: `content/v2/m1/gun-71.json` … `gun-77.json`, `hafta-sonu-testi-11.json`, `gorulmemis-11.json`. İçerik dosyalarına dokunulmadı.

## Seçim yöntemi
Seçim betikle yapıldı: `random.Random(11)`. Her katmanda havuzun dizinlerinden `r.sample` ile seçildi. Katmanların sırası sabit: görev → dikte/gölge → sınav → prova → test → görülmemiş.

| katman | havuz | seçilen |
|---|---:|---:|
| halka görev cümlesi (+ `accepted`) | 86 | 10 |
| dikte/gölge (sahne ve ses bölümleri; `dikte[]` ve `golge[]`) | 147 | 5 |
| gün sınavı maddesi | 77 | 5 |
| prova seçeneği | 105 | 4 |
| hafta testi maddesi | 12 | 3 |
| görülmemiş durum | 7 | 3 |
| **toplam** | 434 | **30** (havuzun %6,9'u; katman sayıları görevde sabit verildi) |

Betik: `sec11.py` (scratchpad `orneklem-h11/`). Aynı tohumla aynı 30 öğeyi verir.

Her öğede şunlara bakıldı: Almanca doğru ve doğal mı; her `accepted` biçimi doğru ve aynı anlamda mı, en az 3 biçim var mı; Türkçe karşılık doğru mu; istenen sözcük o güne kadar öğretilmiş mi; kişisel bilgi ve `{name}` kuralı; İngilizce köprü.
Öğretilmiş mi sorusu iki yoldan kontrol edildi:
- Gün dosyaları için dikiş denetçisi kullanıldı (0 ihlal).
- Hafta testi ile görülmemiş durumlar dikişin kapsamında değil. Bunlar için tablo + `kume.ts` ile `bilinmeyenler()` çalıştırıldı (78. güne kadar bilinenler). Kalan "?" sözcüklerin hepsi o hafta halka kalıbında gösterilmiş ya da `accepted` içinde isteğe bağlı (`hätte`/`würde` 74. gün; `getrennt` 75. gün; `Quittung` 77. gün; `daheim`, `kassieren` yalnız alternatif).

## 30 öğe
Sonuç: ✓ = sorunsuz · A = yanlış ya da yanıltıcı · B = doğal değil · C = küçük.

| # | öğe | sonuç | not |
|---:|---|:-:|---|
| 1 | m1:72:h1 g5 — Ich bekomme das Zeugnis, wenn der Kurs zu Ende ist. | C | Almancası doğru. Türkçe "karneyi" kurs için tuhaf; "belgeyi" daha doğru (kart tr: "karne, diploma"). |
| 2 | m1:72:h1 g6 — Wir schenken ihr im März einen Gutschein. | ✓ | 3 biçim doğru; "einen Gutschein im März" konuşmada kabul edilebilir. |
| 3 | m1:75:h1 g1 — Hier ist es schön ruhig. Die Speisekarte, bitte. | ✓ | |
| 4 | m1:75:h1 g3 — Würdest du dich um den Tisch kümmern? | ✓ | "um einen Tisch" biraz farklı ama aynı işi görür. |
| 5 | m1:75:h1 g4 — Zahlen, bitte! Heute zahle ich, versprochen. | ✓ | "Versprochen!" kalıbı aynı halkada gösterilmiş. |
| 6 | m1:75:h1 g9 — Ich würde bestimmt wieder hier essen. | ✓ | |
| 7 | m1:76:h1 g3 — Das Fach Geschichte war in der Schule schwer. | ✓ | Biraz resmî ama doğru. |
| 8 | m1:76:h1 g7 — Ich bin dran. Was können Sie heute empfehlen? | ✓ | |
| 9 | m1:77:h1 g0 — Heute haben wir viel gelacht. | ✓ | |
| 10 | m1:77:h1 g2 — Ich brauche bitte eine Quittung. | ✓ | `lx:Quittung` sözlükte yok (bilinen 3 hatadan biri). |
| 11 | 72 sahne b1 dikte d4 — Wenn ich einkaufe, gibt es immer ein Problem! | ✓ | |
| 12 | 72 m1:72:a2 b1 dikte d2 — Bitte vergessen Sie Ihr ___ nicht. (Buch) | ✓ | |
| 13 | 73 sahne b1 gölge s3 — Krapfen? Heute leider keine mehr. Morgen früh gibt es wieder welche. | ✓ | Doğal, iyi gölge cümlesi. |
| 14 | 74 m1:74:a2 b1 dikte d1 — um eins (eins/zwei/drei) | ✓ | Doğru şık 0. |
| 15 | 76 m1:76:a1 b1 dikte d3 — Aber morgen ist das Wetter gut. | ✓ | Hava tahmininde "wird" daha olağan ama "ist" konuşmada doğal. |
| 16 | m1:71:s6 — Hava sıcak olunca çok su içerim. | ✓ | "heiß/warm" ikisi de "sıcak"; 4 biçim. |
| 17 | m1:72:s1 — Wenn das Wetter gut ist, gehen wir zu Fuß. (dikte) | ✓ | |
| 18 | m1:75:s7 — Ne tavsiye edersiniz? → Was können Sie empfehlen? | C | Doğru. Ama aynı cümle aynı gün sahne dikte d2'de de var: hafta içinde tekrar (aşağıda). |
| 19 | m1:77:s3 — Auf der Flasche sind fünfundzwanzig Cent Pfand. (dikte) | ✓ | |
| 20 | m1:77:s11 — Kartın geçmiyor → Kann ich auch bar zahlen oder mit dem Handy? | ✓ | 6 biçim, hepsi doğru ve kibar. |
| 21 | m1:74:p1 n4 s1 — Nein, danke, ohne Milch. | ✓ | |
| 22 | m1:76:p1 n2 s0 — Ja, was können Sie heute empfehlen? | ✓ | |
| 23 | m1:76:p1 n3 s2 — Was kostet die Breze? (uygun değil) | C | `accepted` yalnız 2 biçim. Haftada 105 prova seçeneğinin 14'ünde 3'ten az biçim var; hepsi `uygun:false`. |
| 24 | m1:77:p1 n2 s1 — Mit Karte, wenn das geht. | ✓ | |
| 25 | m1:77:t03 — Nein, ich habe ___. (keinen) | ✓ | Şıklar keinen/keine/keins; doğru. |
| 26 | m1:77:t10 — Ich möchte die Jacke ___. (umtauschen) | ✓ | |
| 27 | m1:77:t11 — Möchten Sie eine Quittung? → Ja, bitte, die brauche ich für die Arbeit. | ✓ | |
| 28 | m1:h11:g1 — Ich fühle mich gut. Kaffee trinke ich nur, wenn ich müde bin. | C | Doğru ve `du` (Basti) yerinde. Ama aktarım zayıf. Biçim 2 ("Ich trinke nur Kaffee, wenn ich müde bin.") derste aynen geçiyor. Durumun kendisi 71. günün kalıbı (Kaffee + müde). |
| 29 | m1:h11:g5 — Getrennt, bitte. Ich hatte die Bratwurst und ein Wasser. Machen Sie fünfzehn. | **A** | Görülmemiş değil, 75. günün kopyası. Yer (`pl:marktplatz` lokanta), yemek (Bratwurst + Wasser), hesap (13,60) ve bahşiş (15) aynı. Soru cümlesi "Zusammen oder getrennt?" de aynı. Yanıt cümleleri derste aynen var: prova n3/n4 ("Ich hatte die Bratwurst und ein Wasser.", "Machen Sie fünfzehn, bitte.") ve sahne `cevapla` m1:75:v1:c1. Yalnız eşlik eden değişmiş (Ioana → Basti). Bu madde aktarımı değil ezberi ölçer; "aynı kalıp, başka kişi, başka yer; derste kullanılmaz" kuralına aykırı. |
| 30 | m1:h11:g7 — Geht es vielleicht mit einer anderen Karte? Ich habe noch eine. | ✓ | Kalıp aynı, nesne ve yer farklı; iyi aktarım. |

## Hata sayısı ve oranı
| tür | sayı | oran |
|---|---:|---:|
| A (yanlış/yanıltır) | 1 | %3,3 |
| B (doğal değil) | 0 | %0 |
| C (küçük) | 4 | %13,3 |
| A+B | 1 | %3,3 (> %2 eşiği) |

## Makine sonuçları
- `bash /tmp/claude-0/s/kontrol.sh 11 --tam`:
  - Doğrulayıcıda **3 hata**. Hepsi bilinen "sözlükte yok" hatası: `lx:Quittung`, `lx:Umtausch`, `lx:Einkaufswagen` (gun-77, m1:77:h1). Başka hata yok.
  - **Dikiş ihlali 0** (71–77, 7 gün).
- Dikkat edilecek uyarılar (hata değil):
  - Doğrulayıcının K(t) uyarıları: "öğretilmemiş kelime isteniyor" (74: Fasching/Krapfen/Kostüm; 75: Gasthaus, Vils; 76: Krapfen; 77 s1: Einkaufswagen). Bu sözcükler halka kalıplarında gösterilmiş. Doğrulayıcı kalıpları saymıyor, dikiş sayıyor ve geçiyor.
  - B7: gun-75 `sesler[0]…cevapla.accepted` ve gun-76 `sesler[1]…cevapla.accepted` içinde `{name}` yuvası var ama adsız biçimi yok. gun-75'teki 6 biçimin 6'sında da `{name}` var; profilde ad yoksa adsız yanıtla eşleşmez. Kişisel bilgi kuralı ihlali yok: yer tutucu doğru kullanılmış, sabit ad yok.
  - İngilizce yalnız görsel istem alanlarında var (`img`, `dogru_img`). Öğrenciye gösterilmiyor. İngilizce köprü yok.
- Hafta içi üretim cümlesi tekrarı (betik `tekrar11.py`): 307 üretim cümlesi, 302 farklı; 5 cümle ikişer kez geçiyor.
  - Sayılan cümleler: görev `de`; bölüm dikte `accepted[0]` (boşluk doldurulmuş, ≥3 sözcük); prova uygun seçenek; sınav ve hafta testi `accepted[0]`.
  - 4'ü aynı bölümün dikte merdiveninde aynı cümle: d2 boşluk, d3/d4 kurma (72 a2, 75 a1, 75 a2, 77 a2). Merdiven tasarımı gereği; ayrı bağlam değil.
  - **1 gerçek tekrar:** "Was können Sie empfehlen?" (75 sahne dikte d2 ile m1:75:s7). Kısa kalıp; C.
- Görülmemiş dosyası ders cümleleriyle tümce düzeyinde karşılaştırıldı. Kısa kalıplar ("Ich bin dran.", "Ich habe noch eine.", "Haben Sie noch welche?") beklenen örtüşmedir. İçerik ayrıntısıyla kopya yalnız g5'te var; g1'in 2. biçimi de derste aynen geçiyor.
- Yan not: `gorulmemis-11` 7 durum içeriyor. BRIEF "3–5" diyor, ama "her can_do için" de diyor ve hafta 7 can_do'lu. Çelişki yazara değil BRIEF'e ait.

## Öneri
Gün dosyaları örneklemde temiz: 24 öğede A ya da B yok. Tek A, `gorulmemis-11.json` g5'te. Bu dosya dilbilimciye geri gönderilmeli:
- g5 başka yer, başka yemek, başka tutar ve başka kişiyle yeniden yazılmalı. Örnek: kantinde ya da Bahnhof'ta, iki kişinin içeceği, hesap 7,80 ve 9 avro verilir.
- g1'in 2. biçimi değiştirilmeli.
- Dosyanın tamamına tam tur yapılmalı.

C maddeleri isteğe bağlı: 1 (Türkçe "karne"), 18 (tekrar), 23 (uygun olmayan prova seçeneklerinde ≥3 biçim).

1. tur kararı: TAM TUR (gerekçe: A = 1. `gorulmemis-11.json` m1:h11:g5, 75. günün prova ve sahne yanıtının kopyası; görülmemiş durum aktarımı ölçmüyor. Tam tur `gorulmemis-11.json` için; gün dosyalarında A/B bulunmadı.)

## 2. tur (yalnız düzeltmeler ve düzeltmelerin getirdiği kusurlar)
Dilbilimcinin tam turundan sonra yeniden yazılan maddeler: `gorulmemis-11` g1, g2, g4, g5; 75/76 `accepted_adsiz`; 72 "karne" → "belge".

**Yan düzeltmeler:**
- gun-72 m1:72:h1 g5 tr "Kurs bitince belgemi alıyorum." ✓
- gun-75 ve gun-76 `cevapla` alanlarına `accepted_adsiz` eklendi; 6'şar biçim, hepsi doğru ve adsız. ✓

**7 durum için dört ölçüt:**
- (a) Derste aynen geçen öğrenci biçimi var mı? Tümce düzeyinde karşılaştırıldı (≥4 sözcük).
- (b) Kişi ya da yer dersten farklı mı?
- (c) K(t): `bilinmeyenler()` ile, 77. güne kadar bilinenlere göre.
- (d) Almanca ve `accepted` doğru mu?

| durum | (a) aynen | (b) kişi/yer | (c) K(t) | (d) Almanca | sonuç |
|---|---|---|---|---|:-:|
| g1 (cd:71) Basti, spor salonu, "Müde bin ich nur, wenn ich zu wenig schlafe." | yalnız kalıp ("Ich fühle mich gut.") | farklı (71: ofis/kafe) | `schlafen` 27. gün ✓. Soru cümlesindeki **Sport** sözlükte yok (yalnız duyulan söz; üretilmiyor) | doğru, 6 biçim | ✓ (C: soruda "nach dem Training" kullanılabilir, `lx:Training` 45. gün) |
| g2 (cd:72) pazar, sebze tezgâhı, "Sind die Kartoffeln im Angebot?" | yok | farklı (72: süpermarket kasası, buket) | **Kartoffeln öğretilmemiş**: `lx:Kartoffel` sözlükte yok, tabloda yok, 71–77'de hiç geçmiyor. 6 biçimin 6'sı istiyor, durum "patates" diyor | doğru | **A** |
| g3 (cd:73) değişmedi | "Den Kassenbon habe ich." 73'te var; 4. biçim, kısa kalıp | farklı | ✓ | doğru | ✓ (eski kod, engel değil) |
| g4 (cd:74) istasyon kafesi, "Ich hätte gern einen Tee. Ich würde gern gleich zahlen …" | yok | farklı (74: meydandaki kafe) | **Tee öğretilmemiş**: `lx:Tee` sözlükte yok. Yalnız gr: açıklama metninde örnek olarak geçiyor ("Ich trinke Tee, wenn ich krank bin."); tabloda yok. 6 biçimin 6'sı istiyor | doğru ("Was bekommen Sie?" doğal) | **A** |
| g5 (cd:75) kurs sonrası kafe, kurs arkadaşı, Kellnerin, 7,20 → 8 | yok; 75'in kopyası giderildi ✓ | farklı ✓ | `Kuchen` 9, `Stück` 41, `bekommen` 9 ✓; **Tee öğretilmemiş** (g4 ile aynı), 6 biçimin 6'sı istiyor | doğru ("Zahlen Sie zusammen?", "Machen Sie acht.") | **A** |
| g6 (cd:76) değişmedi | yalnız kalıp ("Ich bin dran."); soru 76'daki satırın aynısı | farklı (76: fırın) | ✓ (`hätte` 74. gün dil noktasında) | doğru | ✓ |
| g7 (cd:77) değişmedi | yalnız kalıp ("Ich habe noch eine."); soru 77'deki satırın aynısı | farklı (77: market) | ✓ | doğru | ✓ |

**Sonuç:**
- 1. turdaki A (g5 kopyası) giderildi.
- Düzeltme yeni bir kusur getirdi: K(t) ihlali. Öğrenciden öğretilmemiş iki sözcük isteniyor: **Kartoffeln** (g2) ve **Tee** (g4, g5).
  - Bu durumlar ayrı bir ölçüm. Dikiş denetçisi görülmemiş dosyasını okumadığı için makine bunları yakalamadı.
  - "Öğretilmemiş öğeyi üretmesi istenirse" kuralına göre bu P0'dır.
- Önerilen değişiklik; durum metinlerindeki Türkçe karşılık da değişir (patates → domates, çay → su/kahve):
  - g2: Kartoffeln → **Tomaten** (`lx:Tomate` 23. gün).
  - g4: Tee → **ein Wasser** (`lx:Wasser` 38. gün).
  - g5: Tee → **einen Kaffee** (`lx:Kaffee` 41. gün; "Ich hatte einen Kaffee und ein Stück Kuchen." derste yok).
  - g1 sorusu: "nach dem Sport" → "nach dem Training" (isteğe bağlı).

KARAR: GERİ (g2: Kartoffeln; g4 ve g5: Tee — öğretilmemiş sözcük isteniyor, K(t) ihlali)
