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
| 6 | "Bilmiyorum" = yanlış; kural tabanlı ölçüm; yapay zekâ ikinci göz (istem, kabul, cevap redact), sağlayıcı yoksa yanlış, düşerse "sayılmadı"; yapay zekâsız tamamlanır | `core/tespit.test.ts` (`tespitDegerlendir`); A |
| 7 | Yarıda bırak / sürdür (yeniden yükleme → aynı madde) | A |
| 8 | Kurulum: "Nereden başlayalım?" yok; son adım tespite; ilk kurulumda tespit bitmeden gün açılmaz (Bugün'de yol yerine tespit kartı); "Şimdilik bırak" → Bugün → Sürdür; Ayarlar'da elle seçim kilidi kaldırır | `v2_core.py`, C, D |
| 9 | Ayarlar: üst kart yok; dipte sessiz "Başlangıç noktasını elle değiştir" | A |
| 10 | Ben'den rapor yeniden açılır | A |
| 11 | Deneme yürüyüşü havuzu atlar; çekirdekte kişisel bilgi isteyen madde doğrulayıcı hatası | `content/tools/tespit.test.ts` |
| 12 | Açık + koyu, 390 genişlikte taşma yok; gezgin yeni ekranlarda | A–C, `gezgin.py` |

## Ek — PM-124 md. 4 (#12 7132286663; dal `v2/plan-ara-bolme`, #264 üstünde)
Hedef ekran: PM-124 md. 4.1 tarifi + #244'ün hafta sonu "zorlandın" listesi (aynı satır biçimi). Rakip: plan hazır değilken düğme ya boşa düşer ya da açıklamasız bir alıştırmaya atar; burada öğrenci neyi neden tekrar ettiğini görür ve A2'nin ne zaman açılacağını bilir.

| # | Ölçüt | Sınama |
|---|---|---|
| 13 | "Planımı gör" (#264'te doğrudan `#/seviye/tekrar/<g,…>`'e gidiyordu) → `#/seviye/plan`: zorlanılan cümleler ("N. GÜN · d/t DOĞRU" + cümle, satır o günün tekrarına gider) + **Rehber**; tek birincil **Bunları tekrar et** (#244'ün tekrar akışı, `#/seviye/tekrar/<g,…>`) + Bugüne dön; tek satır not "Bu liste planının ilk adımı. Günlere bölünmüş tam plan birkaç gün içinde burada olacak. Planı bitirince A2 açılır."; A2 kapalı | `v2_seviye.py` B |
| 14 | Tekrarın geri oku listeye döner; adresle açılan ara plan aynı listeyi gösterir; karar "tamamla" değilse `#/seviye/plan` rapora yönlenir | B, A |
| 15 | Seviye + sınav günü ekranları ana paketten çıkar (tek ayrı parça, ortak deneme kartıyla); ilk açılış ≤ 250 KB; toplam JS ≤ 307.200 − 25 KB (281.600 B) | `ci-v2.yml` bütçe adımı (yerel ölçü PR'da) |
| 16 | Davranış aynı: giriş (Firebase adlı yükleme; üretim derlemesinde giriş ekranı + e-posta yolu), sandık töreni (`preact/compat` yerine body katmanı), çevrimdışı (yeni parça servis işçisinde), açık + koyu taşma yok | `v2_gorev`, `ucak`, `yukleme`, `gezgin` (`#/seviye/plan`), `v2_sinav`, `v2_core` |

