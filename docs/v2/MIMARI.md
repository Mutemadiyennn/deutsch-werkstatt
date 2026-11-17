
> PM belgesi. Ana motor bunu `docs/v2/MIMARI.md` olarak depoya ekler.

---

# MİMARİ: büyüdükçe karışmayan kod ve içerik düzeni

> PM belgesi. Kimlikler `MM-x`. Amaç: Uygulama yıllarca büyüyecek; ajanlar sürekli yeni kol, içerik ve özellik ekleyecek. Her ekleme **tek bir klasöre** dokunmalı, başka hiçbir şeyi kırmamalı ve otomatik olarak denetlenmelidir.

## MM-1 Katmanlar ve bağımlılık yönü (tek yön)

```
packages/shared     şemalar (zod), tipler, içerik sözleşmesi        ← hiçbir şeye bağımlı değil
web/src/brain       BEYİN: saf TypeScript, UI ve platform bilmez     ← yalnızca shared
web/src/platform    yerel eklenti bağdaştırıcıları (konuşma tanıma, ses, depolama, bildirim,
                    cihaz üstü model) + her biri için SAHTE (fake) uygulama  ← yalnızca shared
web/src/features/<kol>   her kol ve kanal ayrı klasör: bugun, yol, koy, telefon, posta,
                    kafe, radyo, kutuphane, gazete, atolye, bahce, sinema, tiyatro, pazar,
                    oynatici, mola, flashback, araba …      ← brain, platform, ui, shared
web/src/ui          tasarım sistemi bileşenleri (TS-3), belirteçler  ← yalnızca shared
web/src/app         kabuk: gezinme, sekmeler, başlatma            ← features
worker/             sunucu: kimlik, kota, YZ vekili               ← shared
content/            içerik kaynağı + derleme hattı (tools/)       ← shared şemaları
```

- **Kural:** Ok yalnızca aşağı doğru. `brain` hiçbir zaman `ui`, `features` ya da `platform`'u içe aktarmaz. Bir kol başka bir kolu içe aktarmaz; ortak bir şey gerekiyorsa o şey `brain` ya da `ui`'a taşınır.
- **Otomatik denetim:** Bağımlılık kuralları bir araçla (ör. dependency-cruiser) CI'da denetlenir. İhlal = kırmızı.

## MM-2 Yeni kol ya da özellik eklemek (ajanların izleyeceği tarif)

1. `web/src/features/<ad>/` oluştur: `index.tsx` (giriş), `screens/`, `logic.ts` (salt mantık), `*.test.ts`, `README.md` (amaç, AH bağı, kullandığı brain arayüzleri).
2. Planlayıcıya kaydı **tek bir kayıt dosyasından** yap: `brain/registry.ts`. Etkinlik türü, biçim, `requires` sözleşmesi, ekran bileşeni.
3. İçerik şeması gerekiyorsa `packages/shared`'e **sürüm numaralı** ekle ve taşıma (migration) yaz.
4. e2e: `tests/e2e/features/<ad>.py`. Uçak modu ve sahte eklentilerle.
5. Başka hiçbir klasöre dokunma. Dokunmak gerekiyorsa PR'da gerekçesini yaz.

## MM-3 Veri ve içerik

- **İçerik sözleşmesi:** Her içerik dosyası şema sürümü, `can_do`, `arm`, `level`, `requires`, `review` ve `source` alanlarını taşır (AH-4, OD-7, KAYNAKLAR).
- **Derleme hattı:** Kaynak → doğrulayıcı → okur kontrolü (OD-9) → paket (seviye başına) → ses üretimi (BY-11) → yayın. Her paket sürümlüdür; uygulama fark paketi indirir.
- **Cihaz verisi:** Öğrenci modeli ve olay günlüğü tek bir depo arayüzünün (`platform/store`) arkasındadır. CI'da sahte uygulama (bellek içi), cihazda SQLite/Filesystem kullanılır. Şema sürümü ve taşıma testleri zorunludur. Veri kaybı testi (RQ-P01) yapılır.

## MM-4 Kalite kuralları (CI'da denetlenir)

| Kural | Sınır |
|---|---|
| Dosya boyutu | ≤ 400 satır; aşarsa bölünür |
| `brain/` birim test kapsamı | ≥ %90 satır; her `policy.json` kuralı için en az bir test |
| Koda gömülü eşik | Yasak; eşikler yalnızca `policy.json`'da (test bunu tarar) |
| Tip güvenliği | `strict`; `any` yasak (gerekçeli istisna yorumla) |
| Bağımlılık yönü | MM-1; ihlal = kırmızı |
| UI | Yalnızca `ui/` bileşenleri; emoji, çoklu gösterge ve saniye sayacı denetimi (TS-4) |
| Erişilebilirlik | Dokunma hedefi ≥ 44 pt; `lang="de"` Almanca metinde; %130 yazıda taşma yok |
| Performans | İlk açılış ≤ 2 sn (iPhone 15 profili), planlayıcı ≤ 50 ms, değerlendirme ≤ 150 ms |

## MM-5 Karar kaydı ve inceleme

- Her mimari karar DECISIONS.md'de kısa bir karar kaydı olur: bağlam, karar, alternatifler, sonuç.
- `inceleme` ajanı her PR'da MM-1 ile MM-4'ü ve AH-4 bağını da kontrol eder.
- Mevcut kod (yaklaşık 4.600 satır) bu düzene **R1'in ilk haftasında** taşınır. Ekranlar zaten baştan tasarlanacağı için (TASARIM) taşıma ile yeniden tasarım birlikte yapılır.
