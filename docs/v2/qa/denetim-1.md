# [DENETİM-1] Bağımsız öğrenci yürüyüşü — 1. hafta (PM-142 md. 1, PM-134 md. 1)

27.11.2026, 14:15–16:15 UTC (kutu 2 sa). Denetçi bu ürünün hiçbir PR'ını yazmadı. Kod değiştirilmedi.

## Nasıl yürüdüm

- **Sürüm:** main `6f114c1`. `npm run content:build` **fikstürsüz** (gerçek içerik paketi `49904944cb6b`, 7 gün), `vite build --mode e2e` (yalnız sahte giriş ve sahte sunucu için).
- **Tarayıcı:** Playwright Chromium, 390×844, dokunmatik, `tests/e2e/common.py` yardımcıları. Akış bayrağı üretimdeki gibi `"hepsi"`, gün kilidi açık.
- **Öğrenci:** `tests/e2e/ogrenci_akis.py`'nin bilgi kısıtlı adım işleyicileri (yalnız ekranda öğretilmiş sözcükle cevaplar, bilmediğinde "Bilmiyorum").
- **Ses:** `speechSynthesis` sahte nesneyle değiştirildi. iPhone'daki gibi 5 Almanca ses verdi: Anna, Helena, Markus, Petra, Yannick. Her okunan cümlenin sesi ve perdesi kaydedildi. Bir de tek sesli cihaz denendi.
- **Ne yürüdüm:**
  - 1. gün baştan sona: kurulum, Bugün, akışın 12 durağı, Bugün'ün yönlendirdiği "Günler" dersi, prova, okuma. Toplam 214 + 125 ekran.
  - 2.–7. gün: planı, dersin "Önce dinle" sesleri, prova ve okuma girişi.
  - 7. gün akışı: 161 ekran, ikinci ses turuna kadar.
  - Bunlara ek: Köy'ün açık altı dükkânı, Ben, Ayarlar, Yol, hafta sonu testi girişi, X ve geri hedefleri.
- **Görüntülere tek tek baktım** (yaklaşık 120 ekran). Seçilen 24 ekran `denetim-1/` klasöründe; numaralar aşağıda [nn] diye geçiyor.

**Sınırlar:**

- WebKit değil, Chromium kullandım.
- Kabuk yok: yerel TTS ve mikrofon yok; PM-137 burada sınanamaz.
- `.medya` depoda yok, bu yüzden yerel pakette fotoğraf ve video yok. [15]'in yayında doğrulanması gerekiyor.
- Günler tek oturumda yüründü; Bahçe tekrarları tarih ilerlemediği için görünmedi.
- **Hafta sonu testi yürünemedi:** 7 gün kutu içinde bitirilemedi, test "henüz kilitli" ekranında kaldı.

## Önem sıralı liste

### P0

Öğrenciyi tamamen durduran bir şey bulmadım. Sayfa hatası 0, yatay taşma 0. Ancak cihazdaki ses ve mikrofon (PM-132/137) bu ortamda sınanamaz.

### P1

1. **Derslerin "Önce dinle" diyaloğu tek sesle okunuyor (PM-132'nin ekranı bu).**
   - 7 günün 10 dersinin hepsinde, 5 Almanca ses varken bile bütün satırlar Anna sesiyle, perde 1 ile okunuyor. Satır sayıları 7–12 arası.
   - Örnek: "Kurstan önce Ioana ile" ekranında Ioana'nın ve "Sen"in satırları aynı sesle çıkıyor [11].
   - Kaynak: `web/src/screens/Ders.tsx` 216. satır `speakDizi(lines.map((de) => ({ de })))`. Satırlar konuşan (`kim`) bilgisi olmadan gönderiliyor, `sesAta` hiç çalışmıyor.
   - Akış sahneleri ise doğru: her sahnede 2 ayrı ses atanıyor (aşağıdaki ses tablosu).
2. **Sahnelerde konuşanın adı yerine ham kimlik görünüyor.**
   - "Metni aç"tan sonra satırların üstünde "ch:stadler", "ch:brandl", "ch:wimmer", "ch:huber" ve "ogrenci" yazıyor. 1. günün 5 sahnesinin 4'ünde böyle [07, 08].
   - PM-132'nin "kim konuşuyor görünsün" isteği de bu etikete dayanacak.
3. **X ve geri öğrenciyi başka sekmeye atıyor (PM-133 yeniden üretildi).**

   | Giriş | Eylem | Sonuç | Beklenen |
   |---|---|---|---|
   | Bugün → BAŞLA → "Sıradaki durak: Sesler" | X | `#/m1/1` "1. gün: Merhaba ve günler" listesi, **Köy** sekmesi seçili [03] | Bugün |
   | Bugün → akış → ses kaydı ekranı | ‹ | aynı Köy gün listesi [04] | akış (bir üst düzey) |
   | Yol → "Seans 1 · Kelime Bahçesi" | X | aynı Köy gün listesi | Yol |
   | Köy gün listesi | tarayıcı geri (iOS kenar kaydırma) | akışa geri girer | Köy |
   | Bugün → "Günler" dersi | ‹ | Bugün | Bugün ✓ |
   | Ders / ses / akış bitti | "Sıradaki adım" | Bugün | Bugün ✓ |

4. **Ses durağı bitince öğrenci akıştan Bugün'e düşüyor ve Bugün hiç değişmemiş görünüyor.**
   - Ses kaydının "Bitti" ekranındaki "Sıradaki adım" akışa değil Bugün'e götürüyor [05].
   - Bugün'de BAŞLA balonu hâlâ "Kelime Bahçesi"nin üstünde, dinlenen kaydın düğümünde ✓ yok [06]. Öğrenci aynı BAŞLA'ya yeniden basmak zorunda.
   - Bu her gün 3 kez oluyor (ses, ses, ikinci ses turu).
   - 7. günde ikinci ses turu bittikten sonra akışa dönünce "Sesler · ikinci tur" yeniden geldi [23]. Bu koşuda profil doğrudan 7. güne atlanmıştı; doğrulanması gerekiyor.
5. **BAŞLA'nın gösterdiği düğüm ile açtığı yer farklı.**
   - BAŞLA balonu "Kelime Bahçesi"nin üstünde [01]; dokununca "Sıradaki durak: Sesler" açılıyor [02].
   - Yol'da bu durak "Seans 1 · Kelime Bahçesi: 20 yeni kelime" diye yazıyor [19]. Gerçekte 12 duraklı bir akış: 2 ses, 5 halka, 2 dil noktası, ikinci ses turu, prova, okuma, gün sonu.
   - Yol ve Bugün aynı yolu iki kez gösteriyor.
6. **Bir gün ≈ 100 dk, sahibinin ölçüsü ≈ 20 dk.**
   - 1. günün akış planı 100,5 dk: 12 durak, 162 adım; yürüdüğüm 190 ekran.
   - Akışın içinde Bugün ayrıca "Günler" dersine yönlendiriyor: 103 ekran, 91 soru [10, 13].
   - 2.–7. günün plan süreleri: 103,6 / 89,7 / 83,8 / 84,3 / 90,7 / 77,0 dk.
   - Kurulumda önerilen günlük hedef 100 dk [16]. Ayarlar'da "Haftada 5 gün × 100 dk", gün 4 seans × 25 dk [22]. Bugün'ün halkasında da "0/100 dk" yazıyor.
   - PM-142'nin "≈ 20 dk, tek 'bugün şunu yap'" ölçüsünün 4–5 katı.
7. **Aynı konu aynı gün iki kez öğretiliyor (döngüsüzlük kuralı).**
   - 1. günde akışın dil noktası (`dil:r0:01-tage:1/2`, 30 adım) günleri öğretiyor.
   - İkinci ses turundan sonra Bugün'ün BAŞLA'sı aynı konunun `r0:01-tage` dersini baştan açıyor [10]: "Yeni kelimeler ve hatırla 1/12 · der Montag…" [12], toplam 91 soru [13].
   - Öğrenci akışı (prova, okuma, gün sonu) bitirmeden bu derse çekiliyor.

### P2

8. **Günün ilk ekranı başarısızlıkla başlıyor.** İlk durak, öğretilmemiş sözcüklerle dolu bir kayıt ve 4 soru (bis, Montag, Freitag, geschlossen, Praxis…). Bilgi kısıtlı öğrenci "4 soruda 1 doğru" görüyor [05]. 7. günde de 3'te 1. Sıralama "önce öğret, sonra dinlet" olmalı mı?
9. **Halka sonundaki "söyle" noktası hiç dolmuyor.** Beş halkanın hepsinde "söyle" sütunu boş; yazarak cevap vermek bu noktayı doldurmuyor [09]. Mikrofon çalışmazsa (PM-137) hiç dolmayacak, ama ekran "sonraki duraklarda dolacak" diyor.
10. **Sahne sorusu görünmüyor.** "Sahne bitti. Anladın mı?" sorusu ve şıkları "Kontrol et" çubuğunun altında kalıyor; kaydırmadan görünmüyor, düğme de pasif [08].
11. **Görev belirsiz.** "Dönüştür — Bu gün sana uymuyor. Cümleyi buna göre değiştir. *Mittwoch geht.*" Yeni başlayan biri ne yazacağını anlamıyor ("Mittwoch geht nicht."?) [14].
12. **"Resimden seç" kutuları boş** [15]. Fotoğraflar yerel pakette yok; yayında dolu mu, telefonda bakılmalı.
13. **İki ayrı "seans" sayısı var.** Ekran başlığındaki odak sayacı "Seans 1/4 · 25 dk" diyor (prova ve okumada da 1/4); akış ise aynı anda "3. seans"ta. Öğrenci için iki ayrı sayaç.
14. **Düğme metni sözcük ortasından kırılıyor:** "Sıradaki adım" düğmesi "Sırada / ki adım" diye bölünüyor [05].
15. **Bugün'de yolun en alttaki düğüm etiketi** ("Herr Pichler'den sesli mesaj") sekme çubuğunun arkasından görünüyor [01].
16. **Köy 1. günde kalabalık ve seviyesiz.**
   - Atölye bütün A1 kalıplarını listeliyor: gefällt mir, Es tut mir leid, Darf ich… [17].
   - Pazar meydanında "Mevsimin dersi: Weihnachtsmarkt / Glühwein / Weihnachtsfeier" ve 20 alanın listesi var [18].
   - Açık dükkânlar: Bahçe, Sinema, Radyo, Atölye, Kütüphane, Pazar [20]; hepsi açılıyor.
17. **Ben'de teknik satırlar.**
   - "Fotoğraf rafı bağlı değil → bağla" teknik bir satır, öğrencinin önünde [21].
   - Ayarlar'daki öncelik listesinde "aşağı" düğmesi oka değil iki çubuğa benziyor [22].
   - PM-142 md. 2.4'teki "Tanılama" satırı henüz yok.
18. **"Ders bitti" başlığı konfetinin altında kalıyor** [13].
19. **1. günde artikelli üretim:** "hafta sonu (der, die ya da das ile)" — Almanca söyle ya da yaz [24]. Bilgi kısıtlı ölçüm bu adıma ulaşmadı; "das Wochenende"nin bu adımdan önce öğretilip öğretilmediği bakılmalı.

## Dinleme adımlarında atanan sesler (`sesAta`, 5 Almanca sesli cihaz)

| Adım | Konuşan | Ayrı ses |
|---|---|---|
| 1. gün ses kaydı a1 "Muayenehanenin telefon kaydı" | Frau Huber (tek) | 1 — Petra ✓ |
| 1. gün ses kaydı a2 "Herr Pichler'den sesli mesaj" | Herr Pichler (tek) | 1 — Markus ✓ |
| 1. gün akış sahneleri h1–h5 | 2 kişi | 2 — Anna+Helena, Anna+Helena, Anna+Petra, Anna+Yannick, Anna+Petra ✓ |
| 7. gün ses kayıtları a1 / a2 | tek | 1 — Petra / Anna ✓ |
| **Ders "Önce dinle", 1.–7. gün (10 ders)** | 2 kişi | **1 — Anna, perde 1, bütün satırlar ✗** |
| Ders "Önce dinle", tek Almanca sesli cihaz | 2 kişi | 1 — Anna ✗ (perde farkı bile yok) |

## Gerçek süre

- Ekran sayıları ve planın kendi tahmini yukarıda (md. 6).
- Bilgi kısıtlı bir öğrencinin 1. günü: akış 190 ekran, ders 103 ekran, prova 7 ekran, okuma 8 ekran. Toplam yaklaşık 310 ekran.
- `ogrenci_akis.py`'nin ekran başına süre tablosuyla bu ≈ 110–120 dk ediyor.

## İyi olanlar

- Akış adımları önce öğretip sonra istiyor: 1. günün ilk 72 ekranında bilgi kısıtlı ölçüm "öğretilmeden istenen" üretim bulmadı.
- Halka yapısı (tanıt → dinle → kur → eşleştir → sahne) temiz.
- Prova, "önce 8 cümleyi dinle" kilidiyle anlaşılır; okuma 5 soruda akıcı.
- Taşma ve sayfa hatası yok.
