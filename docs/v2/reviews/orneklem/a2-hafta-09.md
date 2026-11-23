# Örneklem kontrolü: A2 9. hafta (gün 57–63, hafta sonu testi 09, görülmemiş 09)

Tarih: 2026-11-23 · Rol: qa (örneklem; yazar → dilbilimci → okur → **örneklem**). Bu dosyaları yazmadım, incelemedim; temiz gözle bakıldı. İçerik dosyalarına dokunulmadı.
Dal: `content/ic8-hafta-09` (çalışma ağacı `dw-h9`). Bağlam: `LEARNER.md`, `content/v2/m1/FORMAT.md`, `a2-kesin.json` ve `omurga.json` (hafta 9), dilbilimci raporu `reviews/a2-hafta-09-dilbilimci.md`, okur raporu `reviews/okur/a2-hafta-09.md`.

## Sonuç

- Öğe: **30** · ✗: **0** · hata oranı **%0** (eşik ≤ %5, yani 30'da en çok 1 küçük hata).
- **GEÇTİ.**
- Sayıya girmeyen 4 not ve örneklem dışında görülen 2 kusur aşağıda (takip işi; hiçbiri öğrenciden yanlış Almanca istemiyor ya da doğruyu reddetmiyor).

## Makine denetimi

| Denetim | Sonuç |
|---|---|
| `h9.sh dikis --gun 57 … --gun 63` | 7 gün "denetlendi", (a) kart, (b) sıra, (c) ders, (d) tekrar, biçim sütunlarının hepsi 0. **İhlal: 0.** Not: 58'de 5 adım gösterilmiş kalıpla (eşdizim ya da ders parçası) geçti. |
| `npm run content:validate` | Toplam 11 hata, hepsi bu dosyalarda ve beklenen sınıfta: `day — Too big` (57–63, 7 adet), `dersler.0 — pattern` (57–60, 4 adet). `hafta-sonu-testi-09` ve `gorulmemis-09` için hata yok; bu dosyalar için uyarı yok. |

## Seçim yöntemi (tekrarlanabilir)

Tohum: **9** (`random.seed(9)`, Python 3). Her gün için öğeler altı kümeye ayrıldı (küme adları sıralı):
`anlama` (ana_fikir, ayrinti, eylem, `kanit` taşıyan okuma soruları) · `dikte` · `gorev` (halka görev cümleleri) · `prova` (prova seçenekleri) · `sinav` (gün sınavı maddeleri) · `uretim` (`cevapla`, `accepted` taşıyan okuma soruları, yazma görevi).

1. Gün 57'den 63'e sırayla: `random.sample(kümeler, 3)`, her seçilen kümeden `random.choice` ile bir öğe (21 öğe).
2. Kalan bütün gün öğelerinden `random.sample(kalan, 4)` (4 öğe).
3. Hafta sonu testi: `random.sample(range(12), 3)`; görülmemiş: `random.sample(range(4), 2)`.

Toplam 30. Gün başına: 57 → 4, 58 → 4, 59 → 3, 60 → 3, 61 → 3, 62 → 4, 63 → 4; test 3, görülmemiş 2. Türler: görev 6, dikte 6, anlama 4, üretim 4, sınav 3 (biri dikte), prova 2, test 3, görülmemiş 2. Seçilmeyen tür ve gün kalmadı.

Denetlenen ölçütler: (1) Almanca doğru ve doğal · (2) Türkçe doğru ve tek okumada anlaşılır, İngilizce ve terim yok · (3) `accepted` doğru varyantları kapsıyor, yanlış varyant kabul edilmiyor, üretimde ≥ 3 · (4) istenen sözcük ve yapı o güne kadar öğretilmiş (A1 + 57'den o güne; t2…t5 sırası) · (5) anlama sorusu `kanit` cümlesine dayanıyor, cevap tek · (6) öğrenci satırında `{name}` ya da `{Herr|Frau}`, ses metninde yer tutucu yok.
(4) için dikiş tablosuna ayrıca elle bakıldı: Ausstellung, Studium, Überstunde (57) · Treppenhaus, Stelle (58) · Recht, her, beide, selbst (62) · weiter (63) haftanın kartı; Rathaus (27), Kuchen (9), backen (22), Haltestelle (34), Zahnarzt (46), Versichertenkarte (36), reparieren (11), Bruder (28), Schwester (31), Kunde (43), pünktlich (45) A1'de öğretilmiş. **Licht** A2 tablosunda 106. güne atanmış, ama 58'de Treppenhaus kartının eşdizimi "das Licht im Treppenhaus" olarak gösteriliyor; FORMAT kuralına göre öğretilmiş sayılır.

## Seçilen 30 öğe

| # | Dosya · yol | Tür | Sonuç | Gerekçe |
|---:|---|---|:-:|---|
| 1 | gun-57 · `prova.dugumler[2].secenekler[0]` | prova | ✓ | "Am Sonntag bin ich in die Ausstellung im Rathaus gegangen." doğal; 4 kabul (war/gegangen, belirli/belirsiz) doğru. Geri bildirim tek fikir: **bin gegangen**. Düğüm "Echt? Und am Sonntag?" iki yoldan da anlamlı. |
| 2 | gun-57 · `gun_sinavi.maddeler[2]` (s3) | sınav, dikte | ✓ | "Tobi ist am Montag um halb sechs aufgestanden." Kabuller aynı cümlenin 3 yazımı. Açıklama terimsiz. |
| 3 | gun-57 · `halkalar[0].gorev_cumleleri[2]` | görev | ✓ | "Tobis Schwester ist noch im Studium." doğal; "hâlâ üniversitede okuyor" doğru. 3 kabul doğru. (Tobi'nin kız kardeşi WORLD'de tanımsız: dilbilimci B1, karar bekliyor; dil hatası değil.) |
| 4 | gun-58 · `okuma_yazma.sorular[4]` (o5) | üretim | ✓ | Komşunun sorusu "Ist das okay? Mein Fahrrad steht im Treppenhaus." doğal. 5 kabul doğru ve kibar ("Leider nicht. Das Fahrrad kommt in den Keller."). **kommt in** 58'de raf için öğretildi. |
| 5 | gun-58 · `sahne.bolumler[0].ayrinti[1]` | anlama | ✓ | Kanıt s6 "Ich habe sie gestern besucht und ihr die Hausordnung gegeben." Cevap tek ("dün" yalnız s6'da). Not 1'e bak. |
| 6 | gun-58 · `halkalar[1].gorev_cumleleri[2]` | görev | ✓ | "Herr Pichler hat das Licht im Treppenhaus repariert." doğru; **repariert** ge almayan -ieren (t3, aynı gün). 3 kabul doğru. Licht eşdizimle öğretilmiş (yukarıda). |
| 7 | gun-59 · `gun_sinavi.maddeler[6]` (s7) | sınav, tr_de | ✓ | "Bugün işe gelmiyorum, çünkü hastayım." → 3 kabul doğru, **bin** sonda. Açıklama terimsiz. |
| 8 | gun-59 · `sesler[0].bolumler[0].cevapla` | üretim | ✓ | Telesekretere mesaj; 5 kabulün hepsi doğru, hepsinde `{name}`. Ses metninde yer tutucu yok. |
| 9 | gun-59 · `okuma_yazma.sorular[0]` (o1) | anlama | ✓ | Kanıt 1 "Heute um zehn haben wir eine Besprechung mit einem Kunden." Cevap tek; çeldiriciler metinde yok. |
| 10 | gun-60 · `prova.dugumler[0].secenekler[2]` | prova | ✓ | Uygunsuz seçenek "Ich brauche Ihren Schlüssel!" kaba istek olarak doğru işaretli; geri bildirim kibar kalıbı gösteriyor (**Darf ich Sie um etwas bitten?**). Not 2'ye bak. |
| 11 | gun-60 · `sesler[0].bolumler[0].cevapla` | üretim | ✓ | 4 kabul doğru (**weil ich arbeiten muss**), ikisinde `{name}`. Not 3'e bak (açılış satırı). |
| 12 | gun-60 · `sahne.bolumler[0].dikte[0]` (d1, kolay) | dikte | ✓ | Doğru şık **aufgestanden** s2'de var; çeldiriciler (angekommen, angerufen) s2'de yok. |
| 13 | gun-61 · `okuma_yazma.sorular[0]` (o1) | anlama | ✓ | Muayenehane levhası; cevap "saatlerini ve kurallarını" tek. Not 4'e bak (kanıt eksik). |
| 14 | gun-61 · `sesler[1].bolumler[0].dikte[2]` (d3, zor) | dikte | ✓ | "Und vergiss deine Versichertenkarte nicht!" tek cümleli satır; banka cevabın sözcükleri + 2 çeldirici (kein, meine). 3 kabul doğru. |
| 15 | gun-61 · `sahne.bolumler[0].cevapla` | üretim | ✓ | 6 kabul doğru ve doğal ("Ja, am Montag um elf. Ich habe Fieber." dahil). Durum metni bilgileri açıkça veriyor. (Pazartesi 11 ile 61 provasındaki pazartesi 16.15 çelişkisi dilbilimci B3'te açık; maddenin kendisi doğru.) |
| 16 | gun-62 · `halkalar[1].gorev_cumleleri[1]` | görev | ✓ | "Du hast recht, wir haben beide zu viel gearbeitet." doğal; **Recht** ve **beide** 62'nin. 3 kabul doğru. |
| 17 | gun-62 · `sesler[1].bolumler[0].dikte[2]` (d3, zor) | dikte | ✓ | "Den Kuchen haben wir dann selbst gegessen!" doğal; banka cevap + 2 çeldirici (sind, getrunken). Örneklem dışı kusur A'ya bak (aynı kayıtta c6). |
| 18 | gun-62 · `gun_sinavi.maddeler[6]` (s7) | sınav, tr_de | ✓ | "Haklısın, saat çok geç oldu." → 5 kabul doğru ("es ist schon sehr spät"). |
| 19 | gun-63 · `okuma_yazma.sorular[0]` (o1) | anlama | ✓ | Kanıt 0 "Ihr Termin ist am Dienstag um Viertel nach drei." Cevap "Randevu hatırlatması" tek. |
| 20 | gun-63 · `halkalar[0].gorev_cumleleri[2]` | görev | ✓ | "Und dann? Erzähl weiter!" doğal; **weiter** 63'ün kartı. 3 kabul (doch/mal) doğru. |
| 21 | gun-63 · `sesler[0].bolumler[0].dikte[0]` (d1, kolay) | dikte | ✓ | **elf** c2'de; acht ve zwölf c2'de yok (acht c4'te, ama dikte c2'ye bağlı). |
| 22 | gun-63 · `sesler[1].bolumler[0].dikte[0]` (d1, kolay) | dikte | ✓ | **fünf** c4'te; vier ve sechs yok. Çeviri "beş numaraya binin" doğal. |
| 23 | gun-57 · `sesler[0].bolumler[0].dikte[1]` (d2, orta) | dikte | ✓ | "… am Mittwoch um ___ neun." → **halb**, 3 yazım. Boşluğun cevabı başka yerden okunmuyor. |
| 24 | gun-58 · `halkalar[0].gorev_cumleleri[3]` | görev | ✓ | "Suchst du eine neue Stelle?" doğal; 3 kabul doğru (düz sıralı soru dahil). |
| 25 | gun-62 · `halkalar[0].gorev_cumleleri[2]` | görev | ✓ | "Mein Umzug ist erst zwei Monate her." doğru; **her** 62'nin. "Taşınmamın üstünden daha iki ay geçti." doğru (daha = ancak). 3 kabul doğru. |
| 26 | hafta-sonu-testi-09 · `maddeler[0]` (t01) | test, dinle-cevapla | ✓ | "Wann sind Sie heute aufgestanden?" → 5 kabul doğru (kısa "Um halb acht." dahil). Ses metninde yer tutucu yok. |
| 27 | hafta-sonu-testi-09 · `maddeler[6]` (t07) | test, dinle-cevapla | ✓ | 6 kabul doğru (war in der / bin in eine … gegangen). Açıklama "Bir yerde bulunduysan **war** dersin." |
| 28 | hafta-sonu-testi-09 · `maddeler[11]` (t12) | test, guided | ✓ | 5 kabul doğru; hepsi karşı soruyu içeriyor (Und du? / Und bei dir? / Was hast du gemacht?). |
| 29 | gorulmemis-09 · `durumlar[1]` (g2) | görülmemiş | ✓ | 7 kabul doğru (Schade + başka saat). "Was halten Sie von Montag am Nachmittag?" konuşma dilinde kabul edilebilir. Durum metnindeki "Üzül" okurun "durduğum yer" listesinde; anlam tek okumada çıkıyor. |
| 30 | gorulmemis-09 · `durumlar[3]` (g4) | görülmemiş | ✓ | 5 kabul doğru, hepsinde `{name}`; **Überstunden** (57), **Kriege ich** (61), **weil … muss** (t5) öğretilmiş. Açıklama terimsiz (okur düzeltmesi yerinde). |

**✗: 0 / 30 → %0 → GEÇTİ.**

## Notlar (sayıya girmedi; öneri)

1. **gun-58 `sahne.bolumler[0].ayrinti[1]`:** çeldirici "Merdivenin ışığını tamir etti" aynı günün halka görev cümlesinde Pichler için doğru bir bilgi ("Herr Pichler hat das Licht im Treppenhaus repariert."). Cevap "dün" sözüyle tek kalıyor, ama dikkatli öğrenci duraklayabilir. Öneri: dünyada doğru olmayan bir çeldirici (örneğin "Kutuları bodruma taşıdı").
2. **gun-60 `prova.dugumler[0].secenekler[2]`:** durum "anahtarı onda bırakmayı rica ediyorsun" (senin anahtarın), seçenek "Ich brauche **Ihren** Schlüssel!" (onun anahtarı). Uygunsuz seçenek olduğu için zarar yok; geri bildirim yalnız kibarlığı söylüyor.
3. **gun-60 `sesler[0].bolumler[0].cevapla.prompt_de`:** "Praxis Dr. Weber, Huber, hallo?" Muayenehane açılışında "hallo?" alışılmış değil (hat kopmuş gibi duyuluyor); 61'deki "…, Huber, grüß Gott?" ya da "guten Tag" daha doğal. Haftada yalnız burada.
4. **gun-61 `okuma_yazma.sorular[0]`:** `kanit: [1]` yalnız saat cümlesi; cevabın "kurallarını" kısmı 4–6. cümlelerde. Cevap yine tek; kanıt listesi 4, 5, 6 ile tamamlanabilir.

## Örneklem dışında görülen kusurlar (sayıya girmedi; dilbilimciye)

A. **gun-62 `sesler[1]` c5–c6:** Kemal "Gar nichts. Ich habe nur geschlafen." diyor; sunucu "**Da haben Sie recht**, das ist auch schön!" diye karşılık veriyor. Kemal bir görüş söylemediği için "haklısınız" yerine oturmuyor. c6 aynı zamanda gölge cümlesi (`golge: ["c5","c6"]`), öğrenci bunu tekrar ediyor. Öneri: "Das ist auch schön!" ya da "Schlafen ist auch schön!".
B. **gun-61 iç tutarlılık (dilbilimci B3, hâlâ açık):** sahne `cevapla` (örneklem #15) ve 63 "pazartesi 11" diyor; aynı günün provası pazartesi sabahı işin olduğunu söyleyip 16.15 randevusu veriyor. Öğrenci sahnede randevusu olduğunu söyledikten sonra provada aynı randevuyu yeniden alıyor. Baş geliştiricinin kararı bekleniyor.

## Gerçek cihazda bakılması gerekenler

Bu iş içerik örneklemidir; arayüz değişmedi. Hafta yayına girince iPhone'da: 62 radyo kaydında gölge c6'nın sesi (yukarıdaki A düzelirse), 57 ve 61'de usta dikte satırın tamamını yazınca kabul ediliyor mu (dilbilimci "dikte notu").
