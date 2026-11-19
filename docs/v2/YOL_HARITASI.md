<!-- #56'nın metni aynen (PM-051). Değişiklik yalnızca #56'daki değişiklik kuralıyla. -->
> **SABİT YOL HARİTASI, sürüm 1.1 (19.11.2026).** Projenin tek yolu budur. Ana motor, İçerik Motoru, denetim turları ve PM yalnızca bu yolda çalışır.
> Bunu tamamlayan üç kaynak var:
> - Vizyon: #47. Neden yapıyoruz.
> - Bitti tanımı: #54. Ne zaman "final" deriz.
> - İlerleme: #53. Neredeyiz.
>
> Bu belge depoda `docs/v2/YOL_HARITASI.md` olarak aynen tutulur; eski yol haritası arşive gider.

## Tek cümle
Proje sahibi uygulamayı açınca Almanca öğrenir. Günde 100 dakika (4 × 25 dakika Pomodoro). Sıfırdan başlar, 6 ayda dışarıda rahatça konuşur. Arada boş vakit geçmez.

## Altı deneyim (her kilometre taşında altısı birlikte büyür)
1. **Video, podcast ve röportaj, altında sorular:** "Ne dedi? Yaz." / "Duydun mu?" / "Sen ne cevap verirdin? Söyle."
2. **Gerçek sesler:** anons, radyo, sesli mesaj. Ardından "Anladın mı?", "Aynısını yaz", "Ne yapmalısın?".
3. **Kelime:** fotoğraflı kart, aralıklı tekrar, cevabı öğrenciden bekleyen sorular.
4. **Ders yolu:** seviye seviye açılır; XP, seri ve her zaman belli bir "sıradaki adım".
5. **Konuşma partneri:** gerçek durum provası, ardından Türkçe geri bildirim.
6. **Görselle anlam:** resim ve sesle anlam kurma.

## Kilometre taşları (sıra değişmez)
| # | Taş | Kapsam | Bitti ölçütü |
|---|---|---|---|
| **M1** | **İlk Hafta** | A1'in 7 günü. Altı deneyimin hepsi gerçek içerikle ve yeni tasarımla. Ayrıca kelime tekrarı, Pomodoro, çevrimdışı çalışma ve veri güvenliği. | Hızlandırılmış öğrenci sıfırdan 7 günü bitirir, öğretilmeden istenen öğe 0 olur, hafta sonu testini geçer. Proje sahibine bir günlük ekran kaydı gösterilir. Bağımsız arayüz uzmanı "v1'den güçlü" der. |
| **M2** | **A1 tamamı** | Aynı kalıpla 2.–8. haftalar. Seviye kontrolü, ara verince hatırlatma, hasta modu, araba ve spor modu. | Öğrenci A1'i bitirir. Her hafta sonu testi geçilir. |
| **M3** | **A2 tamamı** (proje sahibinin seviyesi) | Telefon, doktor, Amt, iş, ev, alışveriş senaryoları. Metin merdiveni, gelen arama, posta kutusu, mola sohbeti, Deutsch im Blick A2. | Öğrenci A2'yi bitirir. Gerçek hayat görevleri prova edilir. |
| **M4** | **B1 tamamı** | B1 içeriği ve sınav provası. | Öğrenci B1'i bitirir. |
| **M5** | **FINAL 1.0** | Köyün bütün kolları, canlı akış, "Bütün kütüphaneyi indir" tek tuşu, iOS kabuğu final, #54'ün tamamı. | #54'teki her satır İMZALI. 3 uzmandan "final" hükmü. Proje sahibi kabuğu bir kez kurar ve tek tuşa basar. |
| **M6** | **B2–C2** | Şema bugünden A1–C2'yi destekler. İçerik üretimi B1 bitince başlar; FINAL 1.0'dan sonra kütüphaneye fark paketleriyle eklenir. | Her seviyede aynı bitti ölçütü (hızlandırılmış öğrenci). |

Bir taş bitmeden sonrakine geçilmez. İçerik Motoru, bir sonraki taşın içeriğini önceden hazırlayabilir, ama kod ve ekran işi her zaman o anki taştadır.

## Değişiklik kuralı (yol "her gün" değişmez)
- Yol yalnızca iki durumda değişir:
  - (1) proje sahibi açıkça ister;
  - (2) bir denetim, o anki taşı engelleyen P0 bir sorun bulur.
- Her değişiklik aşağıdaki **değişiklik kaydına** tarih ve gerekçeyle yazılır ve sürüm numarası artar (1.0 → 1.1).
- Bulgular yolu değiştirmez. Bulgu, ait olduğu taşın iş listesine girer.
- PM'in her talimatı bağlı olduğu taşı yazar (ör. "M1"). Bir taşa bağlanamayan talimat verilmez.
- Motorlar, taşa bağlı olmayan bir talimatı uygulamaz ve PM'e geri sorar.

## Eski talimatların bu yoldaki yeri
- **M1'e girenler:**
  - PM-042 A3 ve A6 (şema);
  - PM-045 §4 (temel ders, sayı yazımı);
  - PM-046 (model düzeni, birleştirme sırası);
  - PM-047 (Pomodoro, işlev kelimeleri);
  - PM-049 (Kelime Bahçesi);
  - PM-050 (İlk Hafta);
  - PM-044 madde 1 (mevsim dersi);
  - PM-039'dan yalnızca çevrimdışı çalışma, veri güvenliği ve hata ekranı;
  - kelime kartına `forms`, fotoğraf ve eşdizim eklenmesi;
  - #45'te arayüz uzmanının bulduğu P0'lar (yeni tasarım, M1 ekranlarında).
- **M2–M4:** İçerik Motoru'nun iki şeridi, metin merdiveni, gelen arama, posta kutusu ve geri kalan senaryo içeriği; her biri ait olduğu seviyede.
- **M5:** kütüphane barındırma ve tek tuş (PM-041, PM-045 §2), iOS kabuğu (PM-038), PM-039'un geri kalanı, canlı akış (PM-024/025).

## Değişiklik kaydı
| Sürüm | Tarih | Değişiklik | Gerekçe |
|---|---|---|---|
| 1.0 | 19.11.2026 | İlk sabit sürüm. "Her şeyi aynı anda genişlet" yerine dilim dilim ilerleme. | Proje sahibi: "Uygulamaya girince Almanca öğrenmek istiyorum. Sürekli karar değişmesin." |

| 1.1 | 19.11.2026 | M6 (B2–C2) eklendi. Günde 100 dakika açıkça yazıldı. M1 iş listesi izlenebilirlik bulgularıyla genişledi (PM-052 A). Bairisch oranı düşürülmez. | Proje sahibi: 'A1… 6. seviye, şimdiden başlansın'; phases/00 öncelik 4; izlenebilirlik denetimi #57. |
