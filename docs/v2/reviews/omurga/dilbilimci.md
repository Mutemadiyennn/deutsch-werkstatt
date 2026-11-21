# Omurga: dilbilimci incelemesi

PM-078 D · dilbilimci-ajan · 20.11 · inceleme: dil noktası sırası, sözcük sayıları, yapabiliyorum/görev/kapı, kulak kaynakları, yük.
Dosya: `content/v2/curriculum/omurga.json` (üretici `uret.py` ile birlikte düzeltildi; ikisi arasında fark yok).

## Sonuç
- İncelenen: 52 hafta (yapabiliyorum, görev, kapı, dil noktaları, kulak, süre), 49 gün satırı (8–56), 17 önerilen dil noktası, 3 başvuru sayısı.
- Düzeltilen hata: 11 (aşağıda D1–D11). Hepsi KAPANDI.
- Açık kalan: 7 (A1–A7). Karar PM, ANA ya da yazarda.
- `denetim.py`: 0 hata, 0 uyarı. `npm run content:validate`: 0 hata (142 uyarı, hiçbiri omurgadan değil).
- `review.status` "draft" kaldı: açık maddeler ve okur hattı var.
- Hata oranı: 11 / 121 satır ≈ 0,09.

## 1. Dil noktası sırası (A1 → A2 → B1)
Ölçüt: yaygın A1–B1 ders dizilerinin ve seviye sınavı envanterlerinin olağan sırası.

| Konu | Omurgada | Karar |
|---|---|---|
| Modal fiiller | 7. gün (können, müssen, dürfen, wollen), möchten 11. gün, sollen 45. gün | Doğru. A1. |
| Akkusativ | 32. gündeydi, Dativ'den (27. gün) ve fırın haftasından sonra | **Hata, düzeltildi (D1).** |
| Dativ | Wo? + Dativ 4. hafta, mit 5. hafta, mir/dir 7. hafta, bütün Dativ edatları 12. hafta | Doğru. `a2-07`'nin öne alınması yerinde. |
| Perfekt | haben ile 6. hafta; sein ile 9. haftadaydı | **Hata, düzeltildi (D2).** İkisi de A1'dir. |
| war, hatte | 6. hafta | Doğru. A1. |
| Karşılaştırma | 4. hafta (billiger als, am billigsten) | Kabul, notla (A6). Olağan yeri A1 sonu ya da A2 başıdır. |
| weil, wenn, dass | 9., 11., 13. hafta | Doğru. A2. |
| Modal Präteritum | 15. hafta | Doğru. A2. |
| würde, hätte, wäre | kalıp olarak 2., 3., 11. hafta; kural 16. hafta | Doğru. Kibarlık A2, gerçek dışı koşul B1. |
| Präteritum (anlatı) | 22. hafta | Doğru. A2 sonu. |
| İlgi cümlesi | 23. hafta ilk adım, 25.–26. hafta tam | Doğru (soru 4'e bakınız). |
| Passiv | 35.–37. hafta | Doğru. B1. |
| Konjunktiv II geçmiş | 39.–40. hafta | Doğru. B1 sonu. |
| Plusquamperfekt | 41.–42. hafta | Doğru. B1 konusudur; nachdem ile birlikte gelir. Olay anlatma haftasına bağlanması yerinde. KT-4.1'deki B2 notu ihtiyatlı bir "örnek sıra"; çelişki değil, yine de PM'e bildirilir. |
| Genitiv | 43.–44. hafta | Doğru. B1. |
| Konjunktiv I | 33. haftadaydı | **Düzeltildi (D4).** Yalnız tanıma düzeyinde kalmalı. |

### Yazarın soruları
- **Soru 3, B1 sırası:** önerilen birim sırası (b1-02, 03, 04, 07, 10, 05, 06, 09, 01, 08, 12, 11, 13, 14) onaylanır. İlgi cümlesi ve fikir bildirmenin başa, Plusquamperfekt'in 41. haftaya alınması doğru. Tek sorun birim **içi** bölünmeydi (D3).
- **Soru 4, kulak-3 ve ilgi cümlesi:** "yalnız tanıma" yetmez. Birimin hedefi bilmediği kelimeyi tarif etmek; bu üretim ister. Karar: 23. haftada ilgi cümlesi iki kalıpla **kullanılır** ("Das ist ein Ding, das …", "Das ist jemand, der …"), kural ve hâller 25.–26. haftada. Fiilin sonda durması 9. haftadan (weil) bilinir. `a2.json` değişmez (D5).

## 2. Düzeltmeler

| No | Yer | Sorun | Düzeltme |
|---|---|---|---|
| D1 | 12., 32., 33. gün | Akkusativ 5. haftadaydı. Fırın haftası (2. hafta) "Ich hätte gern einen Kaffee" ister; Dativ 4. haftada Akkusativ'den önce geliyordu. | `gr:a1-06:t1` 12. güne alındı (başlık "Kibar istek: einen Kaffee; du/Sie"). 32. gün "gern, nicht gern, lieber", 33. gün "Davet ve tebrik" oldu. Tebrik yine 33. günde. |
| D2 | 38. gün, 9. hafta | 6. haftanın hedefi "dün ne yaptım", kapısı "hafta sonunu anlat"; sein ile Perfekt (gegangen, gefahren, geblieben) yoktu. "Ich habe gegangen" hatası yerleşirdi. | `gr:a2-01:t1` 38. güne alındı. 9. hafta dört konuyla kaldı ve bunu `requires` olarak ister. |
| D3 | 25.–48. hafta | On birim çiftinde konu, senaryosundan bir hafta **sonra** öğretiliyordu: fikir bildirme (25/26), kira (31/32), mesaj bırakma (33/34), iş görüşmesi ve ilan (35/36), şikâyet (37/38), teknik sorun (39/40), olay anlatma (41/42), anlaşmazlık (43/44), karşılaştırma (45/46), gönüllülük (47/48). "Önce öğret, sonra iste" bozuluyordu. | Her çiftte iletişim konusu kendi senaryosunun haftasına alındı, bir gramer konusu ikinci haftaya kaydı. Birim sırası aynı. |
| D4 | 33., 34., 36. hafta | Konjunktiv I, Passiv'den önce ve mesaj bırakma haftasındaydı. | `gr:b1-10:t2` 36. haftaya (radyo haberi) alındı. 34. hafta tek konulu yazma haftası oldu. |
| D5 | `dn:relativ-basit` | "yalnız anlama" birimin hedefiyle çelişiyordu. | Ad: "İlgi cümlesi, ilk adım: tanımak ve iki kalıpla tarif etmek (Das ist ein Ding, das … / jemand, der …)". |
| D6 | `dn:kisaltma-2` | "ham wa" kuzey ve Berlin ağzıdır; Bavyera'da yaşayan öğrenci bunu duymaz. | "ham wir" yazıldı. LS-8.3'teki liste PM metnidir (A5). |
| D7 | 8. hafta kapısı | "telefonda saat değiştirmek" A2 birimi telefon-2'nin (10. hafta) konusudur; A1 kapısında öğretilmemiş iş isteniyordu. | "telefonda masa ayırtmak" (gün, saat, kişi sayısı: hepsi A1). |
| D8 | 24. hafta kapısı | "komşuyla küçük sorun" bag-4 biriminin (10. hafta) kendisi; "görülmemiş" değildi. | "kayıp eşya bürosunda kaybettiğin bir şeyi sormak". |
| D9 | 50. hafta görevi | "Bilinmeyen numaradan gelen aramaya cevap veririm": öğrenci isteyince yapamaz, arama gelmeyebilir. | "Hiç hazırlanmadan bir yeri arayıp bir bilgiyi Almanca sorarım." |
| D10 | 32. hafta kulak, `dn:bairisch-2` | Bairisch haftasının video adayı genel B1 kaynaklarıydı. MaiBaam ses kaynağı gibi yazılmıştı; yalnız yazılı cümle bankasıdır. | Aday: Wikitongues (A, tek kayıt) + BR (yalnız bağlantı) + "başka açık lisanslı kayıt aranacak". Dil noktası adında ses ve yazı ayrıldı. |
| D11 | `seviye_listeleri` | Kaynak "yaklaşık; doğrulanacak" idi. | Üç listenin önsözünden doğrulandı, adresleriyle yazıldı (bölüm 3). |

Süre etkisi: 2. hafta 621 → 636 dk, 5. hafta 590 → 575, 6. hafta 540 → 555, 9. hafta 569 → 554, 34. hafta 578 → 563, 36. hafta 578 → 593. En çok 660, en az 505 aynı.

## 3. Sözcük sayıları
Üçü de resmî listelerin önsözünden doğrulandı (20.11):
- **A1:** "circa 650 Wörter". Yarısı etkin, tamamı edilgin beklenir. Sayılar, günler, aylar gibi 13 sözcük grubu alfabetik listenin önünde ayrıca durur. Kaynak: goethe.de/pro/relaunch/prf/ca/A1_SD1_Wortliste_02.pdf
- **A2:** "circa 1300 lexikalische Einheiten", en az tanıma düzeyinde. Kaynak: goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf
- **B1:** "circa 2400 lexikalische Einheiten", en az tanıma düzeyinde. Kaynak: goethe.de/pro/relaunch/prf/da/Goethe-Zertifikat_B1_Wortliste.pdf

Değerlendirme:
- Sayılar birikimlidir (A2 listesi A1'i, B1 listesi ikisini içerir). Omurganın 695 / 1370 / 2425 toplamı aynı biçimde birikimli ve makul: +%7, +%5, +%1.
- Omurga daha çok şey istiyor: listeler tanımayı, bizim kartlar üretmeyi ölçüyor. Bu öğrencinin hedefi için doğru yön, ama kart başına süreyi artırır (bölüm 6).
- Sayının tutması örtüşme demek değil. Hangi liste sözcüğünün K1'de olmadığı ölçülmedi (A4).

## 4. Yapabiliyorum, görev, kapı
- 52 haftanın üç satırı okundu. D7, D8, D9 dışında hepsi o haftanın dil noktası ve alanıyla yapılabilir; Bavyera'da yaşayan bir yetişkinin gerçek işleri (fırın, muayenehane, eczane, Bürgerbüro, şef, ev yönetimi, kargo).
- Kişisel bilgi, kurs ya da kitap adı yok. Adlar WORLD karakterleri. Sınav haftasında kurum adı yok.
- 42. hafta görevi (nöbetçi eczaneyi bulmak) gerçek acil hattı aratmıyor; doğru.
- 44. hafta "yazılı itiraz" B1 için zor ama kalıpla yapılır; görev "hazırlarım" diyor, göndertmiyor; doğru.

## 5. Kulak kaynakları
- **Deutsch im Blick:** bölüm adları doğru (7 sağlık, 8 ev ve kariyer, 9 "Was ist Deutsch?"). Sayfada CC BY 4.0 işareti var, ama videoları kapsadığı yazmıyor; KAYNAKLAR da "videolar doğrulanamadı" diyor. Röportajların yarısı Amerikalı öğrencilerle; onlar "gerçek konuşma" payına sayılmamalı (A2).
- **2.–52. hafta:** hepsi "aranacak". Amt, posta, telefon menüsü ve B1'in tamamı için depoya girebilecek (A sınıfı) kaynak yok; yalnız bağlantı ya da kendi seslendirme.
- **Bairisch:** kaynaklı. Sözler WORLD §5'te bağlantılı. Ses payı ise ince: açık lisanslı tek kayıt Wikitongues (tek konuşmacı). 17. hafta 7 video, 32. hafta 6 video ve üç kapı bu tek kayıtla dolmaz; aynı kaydın tekrarı döngüsüzlük kuralını da bozar (A3). MaiBaam cümlelerini makineye okutmak uydurma telaffuz olur; yapılmamalı.

## 6. Haftalık yük
- Toplam 505–660 dk; sınırın altında. Dağılım üç yerde iyimser:
  - **Kart başına 1,2 dk.** PM-078 halkası her kelimeyi üç türde ve iki cümlede ister; gerçekçi süre 1,4–1,5 dk. 1. hafta (155 kart) 690–700 dk'ya, 2. hafta 660 dk'ya çıkar: pay kalmaz.
  - **Konuşma 48–60 dk** (günde 7–9 dk). Öğrencinin asıl derdi cevap verememek; A2'de kulak 140 dk iken konuşma 60 dk az. Öneri: A2 ve B1'de okuma-yazmadan 20–30 dk konuşmaya.
  - **7. hafta 12 konu** (Dativ ve Akkusativ zamirleri, iyelik, iki emir kipi, sollen). A2 başındaki bu öğrenci için tekrar sayılır; gerçekten sıfırdan başlayan biri için iki haftalık iştir. Planlayıcının kaydırması bunu çözer.
- Sayılara dokunulmadı (yapı ve PM kararı); yalnız sıra değişikliklerinin gerektirdiği dakika farkları işlendi (A7).

## 7. Açık kalanlar

| No | Konu | Kime |
|---|---|---|
| A1 | 3. hafta kapısı heceleme ölçüyor; `r0:10-buchstabieren` 7. günde isteğe bağlı ek ders. Ya 21. günden önce zorunlu olmalı ya da kapıdan heceleme çıkmalı. | PM, ANA |
| A2 | Deutsch im Blick videolarının lisansı ve yalnız ana dili Almanca olan konuşmacıların seçilmesi. | ANA (KAYNAKLAR §5) |
| A3 | Açık lisanslı ikinci bir Bairisch ses kaynağı. Bulunamazsa 17. ve 32. haftanın video adedi düşürülmeli. | PM, ANA |
| A4 | K1 ile üç liste arasında örtüşme ölçümü. | lex |
| A5 | LS-8.3'teki "ham wa" kuzey biçimidir; PM metninde "ham wir" olmalı. | PM |
| A6 | Gramer kaydından gelen dört not: karşılaştırma 4. haftada erken ama ev ilanına uyuyor; "obwohl" hem 21. hem 31. haftada (ikincisi yeni bir şey öğretmeli); "Almanya'da okul sistemi" (15. hafta) ve otel konuları (21. hafta) haftanın durumuna uymuyor; Konjunktiv I yalnız tanıma olmalı. | yazar (hafta ayrıntısı yazılırken) |
| A7 | Bölüm 6'daki üç yük önerisi; B1 kapısındaki üç durum adı birim başlıklarına çok yakın, sahneler gerçekten yeni olmalı. | PM, okur |

## Üretici
`uret.py` aynı değişikliklerle güncellendi ve JSON ondan üretildi; fark yok. İnceleme öncesi çıktı da üreticiyle bire bir aynıydı. `taslak.md` tablosu (hafta, yapabiliyorum, kart, kulak) değişmedi; sıra kararları bölümüne bu rapora gönderme eklendi.
