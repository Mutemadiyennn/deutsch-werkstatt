# Gezinme dökümü: ekran → giriş noktası → dönüş hedefi (PM-133 a, PM-144 md. 1.2)

Kural: `docs/v2/TASARIM.md` TS-1.1. Uygulama: `web/src/core/donus.ts` (birim testli) + `web/src/services/gezinme.ts`.
Bütün `ProgressHeader` / `TopBar` geri düğmeleri, akışın X'i ve bitiş ekranlarının "Sıradaki adım"ı hedefi buradan alır.
"Önce" = main `6f114c1`; "Sonra" = bu PR. ✗ = kurala uymuyordu.

**Kuşak:** *yeni* = akış çerçevesi (üstte X + elmas/çubuk + "Neden bu?", `screens/Akis.tsx`); *eski* = seans oynatıcısı
çerçevesi (`ProgressHeader`: ‹ + başlık + seans çipi "Seans 1/4 · 25 dk"). PM-144 md. 1.2: akıştan girilen eski kuşak ekran
artık akışa döner ve tek çıkışı X'tir; akışın ilerleme çubuğunu taşımıyor (takip, aşağıda).

## Tam ekran akışlar (alt sekme yok; tek çıkış X)

| Ekran (adres) | Kuşak | Giriş noktaları | Önce: X / geri | Sonra: X | Bitiş "Sıradaki adım" (önce → sonra) |
|---|---|---|---|---|---|
| Akış günü `#/akis/<g>` | yeni | Bugün (günün kartı), Yol (gün düğümü, "Gir") | X → `#/m1/<g>` (Köy'ün gün listesi; oradan geri → Köy) ✗ | giriş noktası (Bugün / Yol) + "Kaldığın yerden sürer." | "Bugün'e dön" (aynı) |
| Ses / video / dizi `#/m1/<g>/<kayıt>[/1\|/2]` | eski | akış durağı "Başla", Bugün (gün adımı), Köy → Sinema/Radyo → kayıt, günün kayıtları | ‹ → `#/m1/<g>` ✗ (Bugün'den ve akıştan girince Köy'e düşüyordu) | giriş noktası (akış / Bugün / Radyo / gün listesi) | `#/today` → akıştan girildiyse akış (durak ilerler); Köy'den (gün listesi, Radyo) girildiyse günün kayıtları, "Güne dön" o zaman tekrarlanmaz (ANA-T, #275 P2-7); "Güne dön" akıştan girilince gizli |
| Prova `#/prova/<g>` | eski | akış durağı, Bugün | ‹ → `#/today` ✗ (akıştan / Yol'dan girince) | giriş noktası | `#/today` → akıştan girildiyse akış |
| Okuma ve yazma `#/okuma/<g>` | eski | akış durağı, Bugün | ‹ → `#/today` ✗ | giriş noktası | `#/today` → akıştan girildiyse akış |
| Kelime Bahçesi `#/garden[/<g>]` | eski | Bugün (akışsız gün), Bugün "tekrar et", Köy → Bahçe | ‹ → `#/today` ✗ (Köy'den girince) | giriş noktası | aynı (`#/today`) |
| Temel ders `#/ders/<id>` | eski | Bugün (akışsız gün), Köy → Kütüphane → temel ders | ‹ → `#/today` ✗ (Köy'den girince) | giriş noktası | aynı |
| Sınav günü `#/sinav/<g>[/<bölüm>]` | eski | Bugün, Yol | ‹ → `#/today` ✗ (Yol'dan) | giriş noktası (bölüm → sınav günü aynı akış, giriş korunur) | "Bugüne dön" (aynı) |
| Hafta sonu testi `#/hafta/<H>`, sonuç `…/sonuc`, tekrar `…/tekrar/<g,…>` | eski | Yol ("Çöz"), Bugün | ‹ → `#/today` ✗ (Yol'dan) | giriş noktası; tekrar → sonuç ‹ (aynı akışın üst adımı) | "Bugüne dön" (aynı) |
| Seviye tespiti `#/seviye`, rapor `…/rapor`, tekrar `…/tekrar/<g,…>` | eski | Bugün (davet), Ben (rapor), hafta testi | tespit ‹ → `#/today`, rapor ‹ → `#/ben` ✗ (Bugün'den) | giriş noktası; tekrar → rapor/plan ‹ (aynı akış) | aynı |
| Senaryo bölümü `#/scenario/<id>/<bölüm>` | eski | senaryonun ana sayfası (Köy → Pazar → alan), gelen arama | ‹ → senaryo ana sayfası | aynı (giriş = ana sayfa); aramadan girilince aramanın girişi (Bugün) | "Senaryoya dön" (aynı) |
| Gelen arama `#/call/<id>` | — | Bugün | "Sonra" → `#/today` | aynı | — |
| Aylık ölçüm `#/assess` → sonuç `#/assess/result/<id>` | eski | Ben → Ayarlar, Çalışma düzenim | ‹ → `#/today` ✗ (Ben'den) | X → giriş noktası; sonuç (sekmeli) geri → `#/today` | aynı |

## Sekme içi ekranlar (geri oku: bir üst düzey, sekme değişmez)

| Ekran | Sekme | Giriş noktaları | Önce: geri | Sonra: geri |
|---|---|---|---|---|
| Köy mekânı `#/koy/<mekân>` | Köy | Köy | `#/koy` | `#/koy` |
| Günün kayıtları `#/m1/<g>` | Köy | Sinema, Radyo (gün başlığı), akış "Günün kayıtları" | `#/koy` ✗ (bir üst düzey Sinema/Radyo) | geldiği mekân; akıştan geldiyse akış |
| Alan `#/learn/<alan>` | Köy | Pazar meydanı | `#/koy/pazar` | aynı |
| Senaryo ana sayfası `#/scenario/<id>` | Köy | alan sayfası | `#/learn/<alan>` | aynı |
| Sözlük `#/sozluk[/…]` | Köy | Kütüphane, Ben → Kelime haritam | `#/koy/kutuphane` / arama listesi | Kütüphane'den: aynı; Ben'den: `#/koy/kutuphane` (sekme değiştiren bağlantı, md. 2) |
| Kalıplar `#/kalip[/<id>]` | Köy | Köy, sözlük kartı | `#/koy` / sözlük kartı | aynı |
| Rehber `#/rehber/<g>` | Yol | Yol, hafta sonucu, seviye planı/raporu, akış | `#/yol` ✗ (hafta sonucundan / seviyeden açılınca Yol'a atlıyordu) | giriş noktası (Yol / sonuç / plan) |
| Çalışma düzenim `#/ben/duzen` | Ben | Ben | `#/ben` | aynı |
| Ayarlar `#/ben/ayarlar[/raf]` | Ben | Ben | `#/ben` | aynı |
| Ses ve mikrofon `#/ses` | Ben | Ayarlar | `#/ben/ayarlar` | aynı |
| Günlük görevler `#/gorevler`, Bugünkü süre `#/odak` | Bugün | Bugün | `#/today` | aynı |

## Akıştan ileri geçiş (inceleme #275 P1-1, P1-2)
Yalnız akış günü (`#/akis/<g>`) kendi duraklarını ve ekranlarını (ses, prova, okuma, Günün kayıtları, Rehber) açar; onlar akışa döner.
Rehber her akıştan açılır ve o akışa döner. Öbür akışların bitiş geçişi akışın **yerine geçer**: tam ekransa akışın girişini devralır
(kurulum → seviye tespiti: X kurulumun girişine), sekme içi ekransa giriş tutulmaz (ölçüm → sonuç: geri `#/today`; kayıt → "Güne dön"
→ günün kayıtları: geri `#/koy`, bitmiş kayda dönülmez).

## Alt sekme (md. 1)
Önce: her sekme kökünü açıyordu ✗. Sonra: öbür sekme o sekmenin son konumunu (ve geri zincirini) açar; etkin sekmeye ikinci
dokunuş köke iner. Akıştan açılan ekran (ör. hafta sonucundan Rehber) sekmenin son konumu olmaz.

## Sınama
- Birim: `web/src/core/donus.test.ts` (16 sav: akıştan X, durak → akış, aile içi üst adım, Köy zinciri, Rehber döngüsüzlüğü, sekme değiştiren bağlantı, son konum, akıştan ileri geçiş).
- DN-2 gezgin (`tests/e2e/gezgin.py` → `donus_savlari`): Bugün ve Yol'dan akış → X; Yol → hafta testi → X; akış → durak → X → akış → X → Bugün; Köy → Radyo → gün → kayıt → geri ×3; Bugün → kayıt → Güne dön → geri Köy; Yol → Rehber → geri; Ben → Sözlük → geri; sekme son konumu ve ikinci dokunuş. WebKit üç cihaz KAPI'da.
- Var olan e2e'lerde "sekmeye dokun = kök" varsayımı `common.sekme_kok` ile (gerekirse ikinci dokunuş) güncellendi.

## Bilinen eksikler / takip
- **md. 5 (kenardan kaydırma):** kabukta (`WKWebView`) geri-ileri kaydırma hareketi açık değil (Capacitor varsayılanı); bu yüzden şu an çelişki yok. Açılırsa geri oku `history.back()` ile eşlenmeli (kabuk işi, ANA-K; bu PR'da `ios-build.yml`'e dokunulmadı).
- ~~**PM-144 md. 1.2 çerçeve:** akıştan açılan eski kuşak ekran akışın ilerlemesini taşımıyor.~~ ANA-T (PM-148 md. 2): akıştan açılan ses, video, prova ve okuma ekranında başlığın altında günün çubuğu "Bugün · durak k/N" (`ProgressHeader gunIzi`, `services/akisOzet.ts`).
- Bitiş ekranlarındaki açık etiketli "Bugün'e dön" düğmeleri olduğu gibi Bugün'e gider (etiket ne diyorsa o).
- md. 3'ün "Kaldığın yerden sürer" satırı yalnız akış X'inde; eski kuşak ekranlar kendi ilerlemesini zaten sürdürüyor, satır eklenmedi.
