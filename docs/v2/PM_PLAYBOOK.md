# PM_PLAYBOOK — Proje yöneticisinin denetim düzeni

> Bu belge, proje yöneticisinin (PM) her denetim turunda ne yaptığını tanımlar. PM ister bu sohbetten ister zamanlanmış bir oturumdan çalışsın, aynı düzeni izler. Kişisel bilgi içermez.

## 1. Kaynaklar (her turda okunur)
- docs/v2/LEARNING_SYSTEM.md (en üst belge), docs/v2/REQUIREMENTS.md, docs/v2/PEDAGOGY.md, docs/v2/LEARNER.md, docs/v2/WORLD.md, docs/v2/STATUS.md, docs/v2/DECISIONS.md
- Issue #12 (PM talimat kanalı) ve açık PR'lar, yorumlarıyla birlikte (REST API: `gh api repos/Mutemadiyennn/deutsch-werkstatt/...`).

## 2. Denetim turu (sırayla)
1. **Ne değişti?** Son turdan bu yana yeni PR'lar, commit'ler, #12'deki yanıtlar (✓ / ✗).
2. **Talimat takibi:** Her açık PM talimatı uygulandı mı? Kanıt (commit, test) var mı? Uygulanmamışsa nedeni yazılmış mı?
3. **Gereksinim kaydı:** Değişen alanlarda REQUIREMENTS.md durum sütunlarını güncelle (✓ kanıt bağlantısıyla, ~, ✗). Sessizce düşen madde varsa P0.
4. **İçerik denetimi** (yeni içerik varsa):
   - Sayılar: senaryo standardı (PEDAGOGY §5), kalıp standardı (§3), kart standardı (§2).
   - Gerçeklik: rastgele 10 karşı taraf cümlesi + 10 öğrenci cümlesi: "Bunu yarın gerçekten duyar/söyler miyim?"
   - Almanca doğruluk: rastgele 20 cümle; hata oranı > %2 ise P1.
   - Türkçe açıklamaların doğruluğu ve sadeliği.
   - Döngüsüzlük: aynı kalıp/konu/karakter tekrarları.
5. **Öğrenci simülasyonu** (yeni oynatılabilir sürüm varsa; LS-16.3):
   - Derle ve iPhone 15 boyutunda aç (yerelde Chromium; WebKit sonucu CI'dan).
   - **Bilgi kısıtlı oyna:** Almancayı bilmiyormuş gibi; yalnızca uygulamanın o ana kadar öğrettiklerini kullan. Öğretilmemiş bir öğeyi üretmen istenirse P0.
   - İlk 10 dakika (LS-2.1) saniye saniye: ilk başarı ≤ 60 sn mi? İlk 10 dakikada ≥ 5 sesli cümle mi?
   - Yapay zekâ bağlantısı yokken bir senaryo baştan sona.
   - Hata enjeksiyonu: 429, 503, zaman aşımı, bozuk JSON.
   - Araba modu (ekrana dokunmadan), spor modu (konuşmadan).
   - Yanlış cevapta çeşitlilik (PM-003): aynı kelime farklı cümle + farklı fotoğrafla geliyor mu?
6. **Ön görü (pre-mortem):** "Bu öğrenci bu sürümü bir hafta kullansa neden bırakır, neye kızar, nerede takılır?" En az 3 cevap; her biri talimata ya da REQUIREMENTS E bölümüne dönüşür.
7. **Yaz:** Bulgular PR'a özgüyse ilgili PR'a, genelse #12'ye `[PM] PM-0xx` biçiminde. Her bulgu: ne gördün, neden önemli (LS/RQ kimliği), ne yapılacak, kabul ölçütü. Öncelik: P0 (öğrenme ya da güven bozulur) · P1 · P2.
8. **Proje sahibine:** Yalnızca onun yapabileceği bir şey varsa (hesap, anahtar, kurulum) ya da ana oturum durmuşsa kısa bir not. Ara ayrıntılarla yorma.

## 3. İlkeler
- Öğretim kalitesi birinci, sağlamlık ikinci; teknik ölçüt öğrenci deneyimini kötüleştiriyorsa yanlıştır.
- Raporla yetinme: dosyaya, içeriğe, çalışan uygulamaya bak.
- Proje sahibinin söylediği her şey REQUIREMENTS.md'ye girer; söylemeden önce düşünülmesi gerekenler E bölümüne.
- Para doğurabilecek hiçbir şeyi onaylama. Geri alınamaz işlemlerde (git geçmişi temizliği) sahibin açık onayını iste.
