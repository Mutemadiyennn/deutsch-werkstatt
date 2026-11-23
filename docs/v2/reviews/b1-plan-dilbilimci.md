# B1 planı (25.–52. hafta, 169.–364. gün): dilbilimci incelemesi

> Tur Opus'ta (Fable payı doldu).

İÇ-P (PM-094), tek tur, 2026-11-23, dilbilimci-ajan. Dosyalar değiştirilmedi. Makine okunur liste: `b1-plan-dilbilimci.json`. A'ları uygularken önce `gun_takas`, sonra `gun_sirasi` uygulanmalı (gün numaraları şu anki dosyaya göre).

**İncelenen:** 28 hafta, 196 gün başlığı, 69 ders (dil noktası), 1040 kart yuvası (323 kesin, 717 lex bekliyor) ve 15 çerçeve sözcük.
**Bulgular:** A 19 · B 10 · C 13. **Sonuç: AÇIK** (A'lar betikle kapanır, B'ler PM kararı bekliyor).

## 1. Sıra

Ders sırası doğru (C): Passiv Präsens (241) → von (246) → modal (247) → Präteritum (254) → Perfekt (255). Konjunktiv II'de A2'deki hätte/wäre (16. ve 23. hafta) → geçmiş (269) → gerçek dışı koşul (275). İlgi cümlesi: Nom (169) → Akk (170) → Dat (176) → edatlı (177) → was/wo (339/340). Plusquamperfekt (281) → nachdem (288). Genitiv (296) → wegen/trotz (297) → Genitiv'de sıfat (302) → innerhalb (337). während edatı (297) → während bağlacı (311). `requires` beyanında eksik var ama sıra doğru: 49. hafta gr:b1-08:t1'i, 45. hafta gr:b1-08:t2'yi beyan etmiyor (C).

| Sınıf | Yer | Sorun |
|---|---|---|
| B | çerçeve 170, 178, 191, 198, 200 | Bağlaçlar dersinden haftalarca önce "kalıpta gösterilecek": bevor (25. hafta → ders 42.), nachdem (28. → 42., üstelik Plusquamperfekt 41.), während edatı (26. → 43.), falls (26. → 31.), solange (29. → 46.), sobald (29., dersi hiç yok) |
| B | gr:b1-10:t4 (232) | Resmî e-posta dersi "b1-08'deki wegen" diyor, ama o ders 43. haftada (297) |
| B | 229 | "Resmî mektuba yazılı cevap" günü, resmî e-posta dersinden (232, 34. hafta) önce |
| B | 183–184 | gr:b1-03:t1/t2 (um … zu, damit), A2'deki gr:a2-14:t4'ün (23. hafta) aynısı. obwohl için yapılan `gramer_tekrar_karsiligi` eşlemesi burada da gerekiyor (döngüsüzlük) |
| A | hafta 35 | İş ilanı dersinin (239) örneği edilgen çatı kullanıyor ("Fahrtkosten werden übernommen"), ama o yapının dersi 241. günde. Sıra 241, 239, 240 olmalı |
| A | hafta 43 | Arkadaşlık dersi (295) "Ich bin deiner Meinung kalıbında bir Genitiv saklıdır" diyor; Genitiv dersi 296'da. Sıra 296, 295 olmalı (OD-9.2 md. 3) |
| A | kartlar | Türetilmiş kart kökünden önce geliyor: Erlebnis (281) ← erleben (282), Bewerbungsunterlagen (239) ← sich bewerben (240), Bestätigung (225) ← bestätigen (226). Her biri için `gun_takas` önerildi |
| C | kartlar | herausfinden ← heraus (betiğin notu) ile handeln_von (173) ← handeln (205) arasında anlam bağı yok, sorun değil |

## 2. Kelime yükü

- Sayıca dengeli (C): 26 hafta × 40, 51. hafta 10, 52. hafta 5. Birikimli 2425; Goethe B1 listesinin büyüklüğüyle (yaklaşık 2400, bellekten) örtüşüyor.
- Günlük 8/7/6/6/6/5/2 makul (C). En çok kart ders gününe düşüyor. Sınav gününe 2 yeni kart konmuş; o gün için 0 daha uygun.
- Asıl dengesizlik içerikte (B): 1040 yuvanın 717'si yazılmamış. 33. haftadan sonra kesin kart sayısı haftada en çok 15. 36., 42. ve 52. haftada sıfır, 38. haftada 1, 44. haftada 2. Bu haftalarda kart sırası bugün denetlenemiyor; kartlar yazılınca denetim yeniden koşulmalı.
- Mükerrer kart (B): `lx:sich_kümmern_um` (351) ile `lx:sich_kümmern_(um)` (197) aynı kelime; A2'de de `lx:kümmern` (75) var. `lx:nachdenken` ve `lx:nachdenken_(über)` aynı günde (197). 51. haftanın 10 yuvasından biri boşa gidiyor.
- Tema dışı kelime (C): 25.–32. haftadaki K1 sıklık kelimeleri haftanın konusuyla ilgisiz. Örnekler: doktor gününde stehlen (186), sevk gününde Himmel (192), Erde, fangen, Wagen, treten, springen. Hat bu kelimeleri ayrı bir "sık kelime" halkasında vermeli.
- Ağır haftalar (C): 36. haftada üç yeni yapı ve 40 bekleyen kart var; 49. haftada beş ders var, üstelik seviye tekrarından hemen önce.

## 3. Yapabiliyorum ve kapılar

- B1 ile örtüşenler (C): 25, 26, 27, 29, 31, 32, 34–41, 45–48, 50 (konuşma), 51, 52.
- A2'de kalanlar (B):
  - **28. hafta:** kapı ("ilk gün uzaksa daha erken gün istersin") 9. ve 10. haftanın kapısıyla aynı. Gerekçe eklenirse B1 olur: "Sevk kâğıdıyla uzmanı arar, durumunun neden acele olduğunu anlatıp daha erken gün istersin."
  - **30. hafta:** izin ve vardiya 13. haftada (gr:a2-04:t5) öğretildi; karşı öneri 16. haftanın kapısı. Öneri: "Fazla mesainin parayla mı izinle mi ödeneceğini şefinle konuşur, kendi önerini gerekçelendirirsin."
- Uyumsuz hafta (B): 49. haftanın görevi (banka, resmi-3) ve dersleri (innerhalb, was/wo, eğitim yolları) yapabiliyorum cümlesine (şefe sorun ve çözüm) hizmet etmiyor.
- Koşullu (C):
  - 33. hafta: sesli mesaja ad, istek ve numara bırakmak A2'ye yakın; kapıya "başkasının sözünü aktarmak" eklenirse B1 olur.
  - 42. hafta: acil arama A2/B1 sınırında.
  - 44. hafta: itiraz yazısı şablonla B1 olur (emin değilim).
  - 50. hafta kulak kapısı: anons A2 düzeyinde; "doğal hızda" eklenmeli.
  - 47. hafta: dersler gönüllülük üzerine, kapı ise toplantı özeti.
- B2'ye yakın, yalnız tanıma düzeyinde kalmalı (C, emin değilim): Konjunktiv I (248), Nominalisierung (2) (325), Partizip I sıfat (227).
- 26. haftadaki haber okuma, edilgen çatı ve Konjunktiv I'den önce geliyor (C). Bu yüzden metinler bu yapılar olmadan seçilmeli.

## 4. Gün başlıkları

- OD-9.2 biçimi (C): 196 başlığın hepsi ≤14 kelime; noktalı virgül, üç nokta ve tırnak yok. Terim içeren tek başlık 324 ("Eylemden", eylem = fiil).
- Bavyera ağzı günlerinde (220–222) ve 52. haftada lehçe biçimi yok; kaynak sorunu yok (C).
- A bulguları (14 başlık):
  - Henüz öğretilmemiş karta dayananlar: 227 (Datei, kartı 267'de), 317 (Vorteil, kartı 330'da).
  - Almanca sorunları: 330'daki cümle yarım kalmış; 264 virgülle bağlı iki soru; 346 iki parça birleştirilmiş, Almancası bozuk; 199 iki cümle; 207 "frei nehmen" bitişik yazılmalı (freinehmen, Duden; sözlükte doğrulamadım).
  - Türkçesi doğal değil: 176, 199, 216 ("ev idaresi"), 311 ("Bir yandan, oysa"), 316.
  - Tekrar edenler: 243 (240'la aynı kalıp), 214 (212'yle aynı üç kelime).
- Diğer başlıklardaki Almanca doğru ve doğal (C). 272 ile 285 aynı sıralama sözleri; biri değiştirilebilir.
- Durumu bilinmeyen başlık kelimeleri (C): Facharzt, Abrechnung, Nachzahlung, Warmmiete, Widerspruch, Bescheid, Abendkurs, Unterstützung, Betrag, Lager, Kabel ne A2 ne B1 tablosunda var. A1'de değillerse kendi haftalarının bekleyen yuvasına yazılmalı.

## Kalan şüpheler

- A1 tablosu bu dalda yok; K1'de olmayan A1 kartlarını doğrulayamadım.
- CEFR ve Goethe karşılaştırmaları bellekten; tanım metinleri kaynakla karşılaştırılmadı.
- Ders metinleri, sonraki yapılar için düzenli ifadelerle tarandı; tamamı kelime kelime okunmadı.
