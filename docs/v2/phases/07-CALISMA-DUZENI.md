<!-- Kaynak: proje sahibinin mesajı, birebir. -->

ÇALIŞMA DÜZENİ — UZMAN EKİP STANDARDI (şu anki adımını bitir, sonra uygula)

1. Kalıcı hafıza (docs/v2/)
- phases/: H2, H3, "ARAYÜZ KALİTE ÇITASI", "EK 2 — iPHONE ÖN YÜZ UZMANLIK STANDARDI" tam metinleri (kişisel satırlar çıkarılır). Sıkıştırmadan sonra eksik hatırladığın kuralı buradan oku.
- STATUS.md: her görevin durumu, son commit, açık sorunlar, sıradaki adım. Her anlamlı adımda güncellenir.
- DECISIONS.md: her karar, tarihi ve gerekçesi (yazı tipi, WebKit'in CI'da çalışması vb.).
- Ölçüt: yeni bir oturum yalnızca bu dosyaları okuyarak kaldığı yerden devam edebilmeli.

2. Kurallar depoda
- Depo köküne CLAUDE.md (≤150 satır). İçeriği:
  - tek paragraf amaç (kişisel bilgi yok)
  - her oturumda okunacaklar: STATUS, DECISIONS, PEDAGOGY, phases/
  - değişmez kurallar: kişisel bilgi yok · faturalandırma yok, yalnızca ücretsiz katman · anahtar istemcide ve depoda yok · v1'e yalnızca onaylı küçük dokunuşlar · Bairisch yalnızca kaynaklı · Türkçe açıklama, İngilizce köprü yok · WebKit kabul ölçütü · bitti tanımı · küçük PR · bağımsız inceleme · en fazla 3 ajan
  - komutlar: kurulum, test, doğrulayıcı, derleme, yayın, geri alma
  - klasör sahipliği: hangi klasöre kim yazar
- .claude/agents/ altında lex.md, yazar.md, dilbilimci.md, inceleme.md, qa.md. Her birinde: görev, yazabileceği yollar, okuyacağı belgeler, kalite ölçütleri, teslim raporu biçimi. Ajanlar yalnızca bu tanımlarla başlatılır.

3. Küçük ve sık teslim
Her teslim (H3 §10'daki 1–8 ve ekler) ayrı dal ve ayrı PR. CI (WebKit dahil) yeşilse main'e birleştir ve /v2/'ye otomatik yayınla. PR açıklamasında: ne değişti, nasıl test edildi, arayüz değiştiyse ekran görüntüleri, bilinen eksikler.

4. Bitti tanımı
Kod + birim testleri + WebKit uçtan uca testleri + doğrulayıcı 0 hata + güncel STATUS + PR açıklaması. Biri eksikse "bitti" denmez.

5. Bağımsız inceleme
- Her PR birleşmeden önce, işi yazmamış inceleme ajanı temiz bağlamla PEDAGOGY ve phases/'e göre inceler ve bulgularını PR'a yorum olarak yazar (3 ajan sınırına dahil).
- İçerikte sıra: yazar → dilbilimci → örneklem kontrolü, hepsi ayrı.
- Proje yöneticim PR'ları GitHub'dan ayrıca inceler. Her PR kendi başına anlaşılır olmalı.

6. Geri alma
Her yayın etiketlenir (v2-YYYYMMDD-n) ve tek komutla geri alınabilir.

7. Erken gerçek cihaz
İlk oynatılabilir senaryo hazır olunca kontrol noktasını beklemeden /v2/'de "inceleme bekliyor" etiketiyle yayınlanır.

8. WebKit
Yerelde kurulamazsa Chromium'a düşme. Kabul ölçütü CI'daki WebKit sonucudur. Raporda WebKit çıktısı gösterilir.

9. Oturum düzeni
Kontrol noktası raporunun sonuna, yeni sohbetin ilk mesajı olacak kısa bir "BAŞLANGIÇ" metni ekle: okunacak dosyalar + sıradaki iş.

Kontrol noktası raporunda bu 9 maddenin her biri için "yapıldı / kısmen / yapılmadı" ve CLAUDE.md'nin tam metni olsun.
