# Okur kontrolü (OD-9.3) — PR #267, seviye tespiti "Planın" ara ekranı

Dal: `v2/plan-ara-bolme` · Ekran: `docs/v2/qa/ekran/seviye/tespit-11-plan-ara.jpg` (açık + koyu)
Kaynak: `web/src/screens/Seviye.tsx` (satır 417, 427) · Yalnız yeni Türkçe satırlar.

Durum: öğrenci seviye tespitinde "A2'den önce tamamlama planın var" sonucunu gördü ve "Planımı gör"e bastı.
Bağlam satırları #244'ten geliyor ve onaylı: "15. GÜN · 1/3 DOĞRU", "Rehber", "Bunları tekrar et", "Bugüne dön". Bunlara karar verilmedi.

| # | Öğe | Açıklama | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| 1 | başlık | Planın | "Bu ekran benim planım." "Planımı gör"e bastım, karşıma planım çıktı. | GEÇTİ | Tek kelime, bastığım düğmeyle aynı söz. Not: 3. satırla birlikte okununca çelişiyor (aşağıya bak). |
| 2 | liste başlığı | Seviye tespitinde şunları yaparken zorlandın: | "Az önceki seviye sınavında bu işlerde zorlandım. Altta o işler sıralı." | GEÇTİ | 6 kelime, tek fikir, terim yok. Tek okumada anladım. Gözlem: alttaki satırlar "Nerede oturduğumu söyleyebiliyorum." diye bitiyor. "Zorlandın" ile "söyleyebiliyorum" yan yana gelince yorgun gözle bir an takıldım: "Zorlandım mı, yapabiliyor muyum?" Bu, onaylı liste satırlarının dilinden geliyor. Başlığın kendisi açık, o yüzden engel saymadım. |
| 3 | not (PM metni) | Tamamlama planın birkaç gün içinde burada olacak; A2 o zaman açılır. | "Asıl planım henüz yok, birkaç güne gelecek. Ondan sonra A2 açılacak." Ama "o zaman" ne demek, emin olamadım: plan gelince mi, yoksa planı bitirince mi? | GERİ | (a) `;` var, OD-9.2'de yasak. (b) Bir kutuda iki fikir var: planın ne zaman geleceği ve A2'nin ne zaman açılacağı. (c) "o zaman" iki türlü anlaşılıyor: plan gelince mi, plan bitince mi? Önceki ekrandaki "A2'den önce tamamlama planın var" sözü "bitirince" diye okutuyor, bu cümle ise "gelince" diye. (d) Başlık "Planın" diyor, not "planın birkaç gün içinde burada olacak" diyor. Okurken "Şu an planımı görmüyor muyum? O zaman bu liste ne?" diye sordum. |

## Sonuç
- Toplam: 3
- GEÇTİ: 2 (1 başlık, 2 liste başlığı)
- GERİ: 1 → **3 (not)**

Bu ekranda bir GERİ olduğu için ekran "reviewed" sayılamaz (OD-9.4).

## Öneriler (karar PM'in)
- **Not (3):** `;` kaldırılıp iki kısa cümle olabilir. "O zaman" yerine ne zaman olduğu açıkça yazılabilir: plan gelince mi, plan bitince mi? Öğrenci şu an gördüğü listenin planın ilk adımı olduğunu da anlamalı. Yoksa başlık "Planın" ile not çelişir.
- **Liste başlığı (2), engel değil:** "zorlandın" başlığının altında "…yapabiliyorum" satırlarının durması bir an kafa karıştırıyor. Liste satırları onaylı. Bu yalnız bilgi için yazıldı.
