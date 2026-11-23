# Örneklem kontrolü: A2 10. hafta (gün 64–70, hafta sonu testi 10, görülmemiş 10)

Tarih: 2026-11-23 · Rol: qa (örneklem; sıra yazar → dilbilimci → okur → **örneklem**). Bu dosyaları ben yazmadım ve incelemedim, temiz gözle baktım. İçerik dosyalarına dokunulmadı.
Dal: `content/ic8-hafta-10`. Bağlam: `LEARNER.md`, `content/v2/m1/FORMAT.md`, `a2-kesin.json` ve `omurga.json` (hafta 10), `registry/grammar.json` `gr:a2-02:t1…t5`, dilbilimci raporu `reviews/a2-hafta-10-dilbilimci.md`, okur raporu `reviews/okur/a2-hafta-10.md`.

## Sonuç

- Öğe: **30** · ✗: **1** · hata oranı **%3,3** (eşik ≤ %5, yani 30'da en çok 1 hata).
- **GEÇTİ.**
- Tek ✗ (#23) sözlükte olmayan bir sözcüğün diktede yazdırılması. Aynı kök neden örneklem dışında 3 maddede daha var (aşağıda A). Sayıya girmeyen 5 not ayrıca yazıldı.

## Makine denetimi

| Denetim | Sonuç |
|---|---|
| `dikis.sh --gun 64 … --gun 70` | 7 gün "denetlendi"; (a) kart, (b) sıra, (c) ders, (d) tekrar, biçim sütunlarının hepsi 0. **İhlal: 0.** |
| `npm run content:validate` | Toplam 23 hata, 143 uyarı. Bu haftanın dosyalarında yalnız beklenen iki sınıf var: `day — Too big` (64–70, 7 adet) ve `dersler.0 — pattern` (64–68, 5 adet). `hafta-sonu-testi-10` ve `gorulmemis-10` için hata yok. Bu haftanın dosyaları için uyarı yok. Kalan 11 hata 9. haftanın dosyalarında ve aynı iki sınıfta. |

## Seçim yöntemi (tekrarlanabilir)

Tohum: **10** (`random.seed(10)`, Python 3.13). Betik 9. haftanınkiyle aynıdır, yalnız tohum, gün aralığı (64–70) ve dosya adları (`-10`) değişti. Her günün öğeleri altı kümeye ayrıldı (küme adları sıralı):
`anlama` (ana_fikir, ayrinti, eylem, `kanit` taşıyan okuma soruları) · `dikte` · `gorev` (halka görev cümleleri) · `prova` (prova seçenekleri) · `sinav` (gün sınavı maddeleri) · `uretim` (`cevapla`, `accepted` taşıyan okuma soruları, yazma görevi).

1. Gün 64'ten 70'e sırayla `random.sample(kümeler, 3)`, seçilen her kümeden `random.choice` ile bir öğe (21 öğe).
2. Kalan bütün gün öğelerinden `random.sample(kalan, 4)` (4 öğe).
3. Hafta sonu testinden `random.sample(range(12), 3)`, görülmemişten `random.sample(range(4), 2)`.

Toplam 30. Gün başına: 64 → 4, 65 → 4, 66 → 4, 67 → 3, 68 → 4, 69 → 3, 70 → 3; test 3, görülmemiş 2. Türler: prova 5, görev 5, dikte 5 (kolay, orta, zor, usta, gerçek birer), anlama 4, üretim 4 (biri yazma), sınav 2, test 3, görülmemiş 2. Seçilmeyen tür ve gün kalmadı.

Ölçütler: (1) Almanca doğru ve doğal · (2) Türkçe doğru ve tek okumada anlaşılır, İngilizce ve terim yok · (3) `accepted` doğru varyantları kapsıyor, yanlış varyant kabul edilmiyor, üretimde ≥ 3 · (4) istenen sözcük ve yapı o güne kadar öğretilmiş (A1 + 9. hafta + 64'ten o güne; t1…t5 sırası; 66'nın kartları 66'dan önce yok) · (5) anlama sorusu `kanit` cümlesine dayanıyor, cevap tek · (6) öğrenci satırında `{name}` ya da `{Herr|Frau}`, ses metninde yer tutucu yok.

(4) için kart tablosuna (`a2-kesin.json`, A1 tablosu) ve sözlükteki eşdizimlere elle bakıldı. Örnekler: Pause, Speisekarte (64) · Zähler, Spiel, Schwimmbad (65) · Wasserhahn, Steckdose, fallen (66) · Welt, hin (67) · genug, Mülltonne, gegen (68) · wenig (69) · hoffen (70) haftanın kartı. Regal (58), Besprechung (57), stellen (62) 9. haftada; Bett (34), Bild (47), tropfen (46), funktionieren (39), Techniker (23), Foto (36), schicken (38), Versichertenkarte (36), Vormittag, Büro, passen A1'de. **putzen** sözlükte kart değil ama `lx:Treppenhaus` (58) eşdizimi "das Treppenhaus putzen"; **nächste Woche** `lx:Woche` eşdizimi; ikisi de FORMAT kuralına göre öğretilmiş sayıldı.
Prova seçenekleri için ekrana bakıldı (`web/src/screens/Prova.tsx`): provadan önce "Hazırlık" adımı söylenecek cümleleri Almanca ve Türkçe gösteriyor, hepsi dinlenmeden prova açılmıyor. Prova cümlesindeki sözcük bu yüzden o adımda öğretilmiş sayıldı.

## Seçilen 30 öğe

| # | Dosya · yol | Tür | Sonuç | Gerekçe |
|---:|---|---|:-:|---|
| 1 | gun-64 · `gun_sinavi.maddeler[7]` (s8) | sınav, tr_de | ✓ | "Ne zaman mola veriyoruz?" → 3 kabul doğru (Pause machen / eine Pause / Pause haben). **Pause** günün kartı. Açıklama terimsiz. |
| 2 | gun-64 · `sahne.bolumler[0].ana_fikir` | anlama | ✓ | Kanıt s4, s7, s8 (yemek listesi kapının yanında, çatallar rafta). Cevap "Yemek ve eşyalar nerede" tek; proje ve hafta sonu sahnede yok. |
| 3 | gun-64 · `prova.dugumler[1].secenekler[1]` | prova (uygunsuz) | ✓ | "Die Speisekarte steht neben die Tür." yanlış seçenek olarak doğru işaretli; kabul listesi bu yanlışı tanımak için. Geri bildirim tek fikir: hareket yok, **neben der Tür** (t1, aynı gün). Yanlış yol aynı düğüme döndürüyor. |
| 4 | gun-65 · `prova.dugumler[1].secenekler[0]` | prova | ✓ | "Nein, leider nicht. Am Donnerstag bin ich den ganzen Tag im Büro." doğal, durumla uyumlu (perşembe işte). 3 kabul doğru. Geri bildirim **im** = in dem (t2, aynı gün). |
| 5 | gun-65 · `sahne.bolumler[0].cevapla` | üretim | ✓ | "Gehst du später ins Schwimmbad?" → 5 kabul doğru ve doğal ("weil ich das Spiel sehen will" dahil; weil 9. haftada). Açıklama okur düzeltmesiyle cevaptaki sözü gösteriyor. |
| 6 | gun-65 · `halkalar[2].gorev_cumleleri[1]` | görev | ✓ | "Ich mache ein Foto vom Zähler und schicke es an Herrn Pichler." doğru; 3 kabul doğru (an'sız ve sırası değişmiş). **Zähler** günün kartı, vom (26). |
| 7 | gun-66 · `halkalar[2].gorev_cumleleri[3]` | görev | ✓ | "Das Bild darf nicht fallen. Ich lege es auf das Bett." doğru; resim yatık konuyor, **legen** t3 aynı gün. 3 kabul doğru. "Resim düşmemeli. Onu yatağa koyuyorum." doğal. |
| 8 | gun-66 · `sesler[0].bolumler[0].ayrinti[0]` | anlama | ✓ | Kanıt c4 "Dann rufe ich dich an. Ich stehe dann vor dem Haus." Cevap "Seni arayacak" tek; zil bozuk olduğu için kapı çalma ve mesaj metinde yok. |
| 9 | gun-66 · `sahne.bolumler[0].dikte[0]` (d1, kolay) | dikte | ✓ | **Steckdose** s4'te; Klingel ve Lampe s4'te yok (Klingel s9'da, dikte s4'e bağlı). |
| 10 | gun-67 · `prova.dugumler[3].secenekler[0]` | prova | ✓ | Cumartesi davetine "Am Samstag kann ich leider nicht. Geht es auch am Sonntag?" durumla uyumlu (cumartesi meşgul, pazar boş). 3 kabul doğru. Geri bildirim tek fikir. |
| 11 | gun-67 · `sesler[0].bolumler[0].dikte[1]` (d2, orta) | dikte | ✓ | "Der Techniker kommt um zehn ins ___." → **Büro**, 3 yazım. Cevap satırın başka yerinden okunmuyor. |
| 12 | gun-67 · `halkalar[0].gorev_cumleleri[4]` | görev | ✓ | "Der Drucker geht nicht, aber das ist nicht das Ende der Welt." doğal; aynı halkanın kalıbı. **Welt** günün kartı. 3 kabul doğru. |
| 13 | gun-68 · `sesler[0].bolumler[0].cevapla` | üretim | ✓ | "Passt es Ihnen gegen fünf?" → 5 kabul doğru ve doğal ("Gegen fünf passt mir gut." dahil). **gegen** 68'in çerçevesi. Not 1'e bak. |
| 14 | gun-68 · `halkalar[2].gorev_cumleleri[1]` | görev | ✓ | "Das Fahrrad muss in den Keller, da ist genug Platz." doğal (fiilsiz "muss in den Keller" konuşma dilinde olağan). 3 kabul doğru. **genug** günün kartı. |
| 15 | gun-68 · `prova.dugumler[2].secenekler[0]` | prova | ✓ | "Wohin kommen die Kartons? In die Mülltonne?" doğal; 3 kabul doğru; geri bildirim tek fikir. **Karton** sözlükte yok, ama Herr Pichler bir önceki satırda söylüyor ve cümle Hazırlık adımında Türkçesiyle gösteriliyor. Örneklem dışı A'ya bak. |
| 16 | gun-69 · `okuma_yazma.yazma` | üretim, yazma | ✓ | Görev açık; örnek metin doğal ("Haben Sie am Dienstag am Vormittag etwas frei?"), imza `{name}`. Zorunlu sözler örnekte geçiyor, kalıplar örneğin her cümlesini karşılıyor. Kontrol maddelerinde terim yok. Not 2'ye bak. |
| 17 | gun-69 · `halkalar[0].gorev_cumleleri[3]` | görev | ✓ | "Diese Woche habe ich leider sehr wenig Zeit." doğal; 3 kabul doğru. **wenig** günün kartı. |
| 18 | gun-69 · `sesler[0].bolumler[0].dikte[2]` (d3, zor) | dikte | ✓ | "Bitte bringen Sie Ihre Versichertenkarte mit." tek cümleli satır; banka cevabın sözcükleri + 2 çeldirici (Ihren, an). 3 yazım doğru. |
| 19 | gun-70 · `gun_sinavi.maddeler[9]` (s10) | sınav, dinle-cevapla | ✓ | "Wann passt es Ihnen denn?" → 5 kabul doğru (kısa "Am Freitag am Vormittag." dahil). Ses metninde yer tutucu yok. Açıklama tek fikir. |
| 20 | gun-70 · `prova.dugumler[0].secenekler[0]` | prova | ✓ | Belediyeyi arayan açılış: "Guten Tag, hier ist {name}. Ich habe am Mittwoch um zehn einen Termin bei Ihnen." 3 kabul doğru, hepsinde `{name}`. Geri bildirim tek fikir. |
| 21 | gun-70 · `sahne.bolumler[0].ayrinti[2]` | anlama | ✓ | Kanıt s6 "Von Montag bis Mittwoch nächste Woche putzt eine Firma die Fenster im Treppenhaus." Cevap tek; asansör ve bodrum metinde yok. putzen ve nächste Woche eşdizimle öğretilmiş (yukarıda). |
| 22 | gun-64 · `sesler[1].bolumler[0].cevapla` | üretim | ✓ | "Wohin kommt das Tablett?" → 5 kabul doğru; nereye sorusuna **in das Regal** (t1), yer **neben der Tür**. "Ins Regal" (t2, 65) yalnız kabul olarak var, istenmiyor. Durum metni okurun "durduğum yer" listesinde (ikinci cümle kopuk); anlam sesle çıkıyor. |
| 23 | gun-65 · `sesler[1].bolumler[0].dikte[3]` (d4, usta) | dikte | **✗** | Satır "Am Samstag um drei ist das Spiel im Stadion an der Vils." doğal, 3 yazım doğru. Ama tüm cümle yazdırılıyor ve **Stadion** öğretilmemiş: kart değil, hiçbir kartın eşdizimi değil, sözlükte kaydı yok. FORMAT dikte kuralı: "Yazdırılan kelime … ders ya da kartın kendisi ve eşdizimi gerekir." Öğrencinin İngilizceye kaçma eğilimi (LEARNER) "Stadium" yazımını olası kılıyor. (Vils WORLD'de şehrin adı, önceki günlerde geçiyor; sorun değil.) Öneri: `lx:Spiel` eşdizimine "im Stadion" (lex), ya da satır "… ist das Spiel an der Vils." |
| 24 | gun-66 · `sahne.bolumler[0].dikte[4]` (d5, gerçek) | dikte | ✓ | Örnek "Herr Pichler hat den Wasserhahn repariert. Morgen um zehn kommt der Mann für die Zähler." doğru ve sahneyle uyumlu (s2–s3, s6–s7). Zorunlu sözler günün kartı. Not 3'e bak. |
| 25 | gun-68 · `sesler[0].bolumler[0].ayrinti[0]` | anlama | ✓ | Kanıt c4 "Ich komme gegen fünf." Cevap "Beş gibi" tek; "Üçte" c3'te reddedilen saat, "Yedi gibi" metinde yok. |
| 26 | hafta-sonu-testi-10 · `maddeler[3]` (t04) | test, gap | ✓ | "Das Handy ___ auf dem Tisch." → **liegt**, 3 yazım, cevap şıklarda. Çeldiriciler legt ve stellt doğru seçilmiş; açıklama terimsiz. |
| 27 | hafta-sonu-testi-10 · `maddeler[5]` (t06) | test, transform | ✓ | "Wir hängen das Bild an die Wand." → 3 kabul doğru (gehängt, t4). Yönerge okur düzeltmesiyle terimsiz. Not 4'e bak. |
| 28 | hafta-sonu-testi-10 · `maddeler[11]` (t12) | test, guided | ✓ | "Wo ist denn die Speisekarte hin?" konuşma dilinde doğal (**hin** 67'nin kartı, eşdizimi "Wo gehst du hin?"). 5 kabul doğru: hem koydum (gestellt/gelegt) hem duruyor (steht). Açıklama iki yolu ayırıyor. |
| 29 | gorulmemis-10 · `durumlar[1]` (g2) | görülmemiş | ✓ | Oto servisi, yeni bağlam. 6 kabul doğru ve doğal ("in der Arbeit" güney standardı; "Was ist mit Samstag?"). Kalıp ve açıklama tutarlı. |
| 30 | gorulmemis-10 · `durumlar[3]` (g4) | görülmemiş | ✓ | Passau'da tatil dairesi, yeni bağlam. 6 kabul doğru; **Wasserhahn**, **Steckdose** (66), **tropfen** (46), **funktionieren** (39) öğretilmiş. Açıklama tek fikir. |

**✗: 1 / 30 → %3,3 → GEÇTİ.**

## Notlar (sayıya girmedi; öneri)

1. **gun-68 `sesler[0].bolumler[0].cevapla.prompt_de`:** öğrenci geri arıyor, karşı taraf "Hallo? Passt es Ihnen gegen fünf?" diye açıyor. Arayanın kim olduğunu bilmeden saati sormak tuhaf duruyor. "Ah, hallo! Passt es Ihnen gegen fünf?" ya da durum metnine "adını söyledin" eklenebilir.
2. **gun-69 `okuma_yazma.yazma`:** mesaj "Frau Huber"e yazılıyor. Huber 9. haftada ve 69'un sesli mesajında muayenehanenin sekreteri, ama 69 sahnesinde kuaförde Luka'nın müşterisi (okurun "durduğum yer" listesinde, dilbilimci B5). Dil hatası değil; WORLD kararı bekliyor. Ayrıca `kontrol_tr[1]` bir maddede iki soru (okurun notu, hâlâ öyle).
3. **gun-66 `sahne.bolumler[0].dikte[4].gorev_tr`:** "Herr Pichler'in akşamını … anlat" diyor, zorunlu **Zähler** ise yarınki işi anlatıyor. "Herr Pichler'in anlattıklarını iki kısa cümleyle yaz." daha doğru olur.
4. **Test t06 (#27):** yönerge "Bunu dün yaptınız" diyor; öğrencinin doğal cevabı "Wir haben das Bild **gestern** an die Wand gehängt." kabulde yok. Değerlendirici bunu reddetmez ("kontrol edilemedi"; `answer.ts` dolgu kuralı "gestern"i kapsamıyor), ama kabule eklenmesi iyi olur. "… schon an die Wand gehängt" eklenmiş, "gestern" eklenmemiş.
5. **gun-70 s10 (#19):** "Am Freitag am Vormittag" doğru ama ağır; konuşmada daha sık "Am Freitagvormittag" ya da "Freitag Vormittag". Kabul listesine bir tanesi eklenebilir.

## Örneklem dışında görülen kusurlar (sayıya girmedi; dilbilimciye ve lex'e)

A. **Sözlükte olmayan sözcük yazdırılıyor ya da isteniyor (#23 ile aynı kök neden):**
- **Stadion**, gun-65: `halkalar[1].gorev_cumleleri[6]` ("Das Spiel ist am Samstag um drei im Stadion.", öğrenci üretir) ve aynı satırın zor diktesi `sesler[1].bolumler[0].dikte[2]` (banka). Şema dalı doğrulayıcısı da görev cümlesini "?stadion" diye işaretliyor.
- **Karton**, gun-67 `sahne.bolumler[0].dikte[3]` (usta, "Vor dem Wasserzähler war ein Karton. Den habe ich in den Keller gestellt.") ve gun-68 `gun_sinavi.maddeler[3]` (s4, sınav diktesi "Wer hat den Karton in den Keller gestellt?"). Prova kullanımı (#15) Hazırlık adımında gösterildiği için sorun değil; dikteler öyle değil.
- Öneri (tek iş): lex `lx:Spiel` eşdizimine "im Stadion", `lx:Müll` ya da `lx:Mülltonne` eşdizimine "die Kartons" eklesin; ya da yazar bu satırlarda sözcüğü değiştirsin. Türkçede "karton" ve "stadyum" tanıdık; risk küçük ama kural açık.
B. **Dikte satırları iki cümleli (dilbilimci B4, hâlâ açık):** 67 d4 (usta) da iki cümleli satıra bağlı; kabul tam satır. Kod ya da satır bölme kararı baş geliştiricide.

## Gerçek cihazda bakılması gerekenler

Bu iş içerik örneklemidir, arayüz değişmedi. Hafta yayına girince iPhone'da şunlara bakılmalı: 65 usta diktede "Stadion" yazımı (A düzelirse gerek kalmaz). 68 provasında "Kartons" sözünün konuşma tanımada nasıl yazıldığı ("Kartons" mu "Cartons" mu); kabul listesi tam eşleşmeye dayanıyor. 70 sınav s10 sesli cevabında "Freitagvormittag" bitişik söylenirse sonucun "kontrol edilemedi"ye düşüp düşmediği.
