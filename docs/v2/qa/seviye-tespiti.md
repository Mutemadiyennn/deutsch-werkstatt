# Seviye tespiti ekranları (PM-115 PR 2b) — kabul listesi

Görev: PM-122 md. 3 (#12 7124546610); hedef ekran ve eşikler PM-120 md. 4 (7115501461, tel kafes tarifi hedeftir); tarif PM-115 (7103428959). Taban: #260 (`v2/tespit-motor`) + #245 (`v2/a2den-basla`) altyapısı; bu PR #245'in yerine geçer.
Taş: M1 → A1 sonu / A2 girişi. Rakip: yaygın yerleştirme testleri tek puan verip kapıyı açar; burada beceri ve hafta ayrıntısı, gerekçeli karar, eksiğin gün ve cümle düzeyinde yeri; "yine de geç" yok.

| # | Ölçüt | Sınama |
|---|---|---|
| 1 | (a) Giriş: "Önce seviyeni görelim", iki satır alt metin, üç kısa satır; birincil **Başla**; yalnız ilk kurulumda "Almancaya yeni başlıyorum → Baştan başla"; yarıda "x/y bölüm bitti · ≈ N dk kaldı" + **Sürdür** | `v2_seviye.py` A |
| 2 | (b) Madde: geri, ilerleme çubuğu, "BÖLÜM x/y · N. HAFTA" (çekirdek "DÖRT BECERİ", derin "· YAKINDAN"); birincil **Kontrol et** + çerçeveli tam genişlik **Bilmiyorum**; konuşmada mikrofon + "Yazarak cevapla"; sonuç gösterilmez | A, B |
| 3 | (c) Bölüm arası: "N. hafta: oturmuş ✓" / "biraz daha bakalım (≈ k dk)" + Devam (+ "Şimdilik bırak"); yüzde yok; son haftada da | A, B, C |
| 4 | (d) Rapor: karar kartı (sol kenar rengi karara göre) + gerekçe; altı beceri çubuğu (%70 altı kehribar, "ölçülmedi"), sekiz hafta çubuğu; "Zorlandıkların", "Dil noktaları", "Bilmediğin kelimeler"; "Raporu kopyala"; tek birincil karara göre | A, B, C |
| 5 | A2'ye başla → 9. hafta (atlanan A1 günleri, "biliniyor" kartlar); A1'e baştan → 1. gün; Planımı gör → zayıf günlerin tekrarı (plan PR 3), A2 kapalı | A, B, C |
| 6 | "Bilmiyorum" = yanlış; kural tabanlı ölçüm; yapay zekâ ikinci göz, düşerse "sayılmadı"; yapay zekâsız tamamlanır | `core/tespit.test.ts`; A (sıfır yapay zekâ isteği) |
| 7 | Yarıda bırak / sürdür (yeniden yükleme → aynı madde) | A |
| 8 | Kurulum: "Nereden başlayalım?" yok; son adım tespite; ilk kurulumda tespit bitmeden gün açılmaz; Bugün'de davet kartı | `v2_core.py`, C |
| 9 | Ayarlar: üst kart yok; dipte sessiz "Başlangıç noktasını elle değiştir" | A |
| 10 | Ben'den rapor yeniden açılır | A |
| 11 | Deneme yürüyüşü havuzu atlar; çekirdekte kişisel bilgi isteyen madde doğrulayıcı hatası | `content/tools/tespit.test.ts` |
| 12 | Açık + koyu, 390 genişlikte taşma yok; gezgin yeni ekranlarda | A–C, `gezgin.py` |
