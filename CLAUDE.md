# Deutsch Werkstatt — çalışma kuralları

## Amaç
Türkçe konuşan bir yetişkinin Almancayı gerçek hayatta (telefon, doktor, iş, resmî daireler, gündelik konuşma, Bavyera ağzını anlama) kullanabilmesi için kişisel bir iPhone uygulaması. Öğretim iletişim odaklıdır: önce duy, sonra parçala, sonra hatırla, en sonda bağımsız konuş. Açıklama dili Türkçe; üç dil katmanı (Hochdeutsch / Alltagsdeutsch / Bairisch). v1 (`app/`, Pages kökü) çalışmaya devam eder; v2 (`web/`, `worker/`, `content/v2/`) `/v2/` altında yayınlanır ve aynı iPhone kabuğundan açılır.

## Her oturumda önce oku
Her ajan ve oturum işe `docs/v2/LEARNER.md`'yi okuyarak başlar. Her kararda tek soru: **"Bu, bu öğrenciyi dışarıda konuşmaya yaklaştırıyor mu, ve yarın uygulamayı yeniden açmak istemesini sağlıyor mu?"**
**Öncelik zinciri** (çelişkide üstteki geçerli; OGRETIM_DONGUSU başlığı): AHTAPOT → YOL_HARITASI → OGRETIM_DONGUSU → BEYIN → LEARNING_SYSTEM → KUTUPHANE → ICERIK_EVRENI → TASARIM/DESIGN. PEDAGOGY ilke kaynağıdır; çelişki görülürse PM'e yazılır, PEDAGOGY değiştirilmez. Bütün sayısal eşiklerin tek kaynağı `policy.json`.
1. `docs/v2/AHTAPOT.md` — **bütün eğitim sisteminin tek haritası** (PM-016): ana yol + kollar; her PR açıklamasında "AH bağı" satırı (aile, kol, kanıt; AH-4)
2. `docs/v2/YOL_HARITASI.md` — **tek yol haritası** (PM-010): iş seçimi yalnızca §4'e göre (önce #12 P0→P2, sonra haritadaki sıradaki sürüm; haritada olmayan iş yapılmaz); her sürüm §1'in altı kapısından geçer
3. `docs/v2/OGRETIM_DONGUSU.md` — önce öğret sonra iste; `requires`, kanıt düzeyleri, kapılar, OD-9 Türkçe açıklama standardı (**üretim görevleri ve kapılarda öncelikli**, PM-014)
4. `docs/v2/BEYIN.md` — çevrimdışı öğretmen: öğrenci modeli, planlayıcı, değerlendirici, `policy.json` (**cihaz içi kararlarda öncelikli**, PM-014)
5. `docs/v2/MIMARI.md` — kod ve içerik düzeni (MM-1 katmanları, MM-4 kuralları CI'da)
6. `docs/v2/TASARIM.md` — bilgi mimarisi, ekranlar, akışlar; hedef `design/TARGET2.png` (görsel dil `design/DESIGN.md`)
7. `docs/v2/KUTUPHANE.md` — sonu olmayan, seviyeli, çevrimdışı kütüphane; içerik hattı (PM-011/012/015)
8. `docs/v2/ICERIK_EVRENI.md` — gerçek hayatın metin ve ses türleri, 20 biçim, yenilik motoru
9. `docs/v2/KAYNAKLAR.md` — açık lisanslı kaynaklar (A/B/C/X); telifli metin depoya girmez
   - `docs/v2/METIN_MERDIVENI.md` — her metinden 20+ görev, Kolay/Orta/Zor/Acımasız(/Usta) basamakları (PM-020); `design/IFADE_ORNEK.png` açıklama standardının referans ekranı (PM-017 eki)
10. `docs/v2/LEARNING_SYSTEM.md` — öğrenme sistemi (LS-x.y kimlikleri)
11. `docs/v2/LEARNER.md` — öğrenci kartı (kimlik bilgisi yok); ürün bir öğretmendir
12. `docs/v2/REQUIREMENTS.md` — gereksinim kaydı (RQ-x); her PR karşıladığı RQ ve LS kimliklerini listeler (PM-005)
13. `docs/v2/WORLD.md` — kurgusal şehir, kalıcı karakterler, 26 haftalık hikâye, gerçek takvim
14. `docs/v2/STATUS.md` — görevlerin durumu, içerik sayacı, son commit, açık sorunlar, sıradaki adım
15. `docs/v2/DECISIONS.md` — alınmış kararlar ve gerekçeleri (yeniden tartışma)
16. `docs/v2/PEDAGOGY.md` — içerik standardı, şema ve doğrulayıcı kuralları
17. `docs/v2/phases/` — proje sahibinin faz metinleri; hatırlamadığın kural buradadır
PM belgeleri issue olarak gelir; depoya baş geliştirici alır (PM-011).

## Değişmez kurallar
- **Kişisel bilgi yok.** Depoda, kodda, testte, prompt'ta öğrencinin hayatına dair ayrıntı, kurs ya da kitap adı yazılmaz (istisna: kimliksiz `LEARNER.md`, D-066). Öğrencinin adı/cinsiyeti içerikte sabit yazılmaz: `{name}`, `{Herr|Frau}` yer tutucuları; yapay zekâya ad gitmez (D-061). Diğer karakterlerin adları çeşitli.
- **Faturalandırma yok.** Yalnızca ücretsiz katmanlar (Cloudflare Workers/KV, Gemini ücretsiz katmanı). Google Cloud TTS kapalı. Kota dolarsa işlem durur, para çekilmez.
- **Anahtar istemcide ve depoda yok.** Anahtarlar yalnızca Cloudflare secret'ında; dağıtım GitHub Actions + şifreli secret. Geliştirici anahtar görmez. Firebase web yapılandırması (herkese açık) istisnadır.
- **v1'e yalnızca onaylı küçük dokunuşlar.** v1 değişikliği → tam v1 kapısı (`bash app/tests/run_all.sh`, 17/17) → yayın.
- **Bairisch yalnızca kaynaklı.** Kaynak yoksa yazılmaz ya da "uncertain" işaretlenir. Uydurma lehçe yok.
- **Türkçe açıklama, İngilizce köprü yok.** İngilizce yalnızca mistakes_tr içinde kısa "yanlış arkadaş" uyarısı olabilir (D-060).
- **Kalıp kapısı (D-063):** kalıplar "reviewed" olmadan yeni senaryo/alan yazılmaz. Üretim maddelerinde accepted[] ≥3 (D-064).
- **Döngüsüzlük (H4 §4):** bir konu yeni bir şey öğretmedikçe tekrar gelmez; tekrarlar farklı bağlam ve karakterle gelir.
- **WebKit kabul ölçütüdür.** "Bitti" kararı CI'daki WebKit (iPhone 15, iPhone 16 Pro Max) sonucuna göre verilir. Yerelde WebKit kurulamazsa Chromium'a düşülmez; yerel Chromium yalnızca hızlı geri bildirimdir.
- **Bitti tanımı:** kod + birim testleri + WebKit uçtan uca testleri + DN-2 makine kapısının tamamı (gezgin, yükleme bütçesi, uçak modu, TS-4, üç cihaz; `docs/v2/DENETIM.md`) + doğrulayıcı 0 hata + güncel STATUS + PR açıklaması. Biri eksikse "bitti" denmez.
- **Küçük PR.** Her teslim ayrı dal ve ayrı PR; bağımlıysa öncekinin üstüne (yığınlı). PR açıklaması kendi başına anlaşılır: ne değişti, nasıl test edildi, arayüz değiştiyse ekran görüntüleri, bilinen eksikler.
- **Bağımsız inceleme.** Her PR birleşmeden önce işi yazmamış `inceleme` ajanı temiz bağlamla inceler ve PR'a yorum yazar. İçerikte sıra: yazar → dilbilimci → örneklem kontrolü (ayrı ajanlar).
- **En fazla 3 ajan aynı anda.** Ajanlar yalnızca `.claude/agents/` tanımlarıyla başlatılır (lex, yazar, dilbilimci, okur, inceleme, qa). İçerik sırası: yazar → dilbilimci → okur (OD-9) → örneklem.
- **Arayüz çıtası:** v2 hiçbir ekranda v1'den görsel olarak zayıf olamaz (phases/04); iPhone standardı (phases/05).
- **Rol oyunu:** güçlü model; 12 sn'de yanıt yoksa "Biraz uzun sürüyor" + Bekle / Tekrar dene / Yapay zekâsız devam; istek kesilmez (D-RP1).
- **PR'lar LS ve RQ kimliklerini ve "AH bağı" satırını listeler** (LS-16.4, PM-005, PM-016). Arayüz değiştiren PR'da iPhone 15 Pro Max ekran görüntüleri, açık + koyu. Her sürümde LS-16.3 öğrenci simülasyonu zorunlu; QA ajanı bilgi kısıtlı oynar (öğretilmeyen öğeyi üretmesi istenirse P0).
- **PM kanalı (D-080):** her anlamlı adımın sonunda ve her birleştirmeden önce issue #12 ve açık PR'lardaki yeni `[PM]` yorumlarını oku (`gh api repos/Mutemadiyennn/deutsch-werkstatt/issues/12/comments`, `issues/<PR>/comments`). Her talimata yanıt: `✓ PM-00x — <commit/PR>` ya da `✗ PM-00x — <gerekçe>`. Beklerken send_later ile 60 dk'da bir #12'yi kontrol et.
- **Sınav tarihi ve kurum adı depoya girmez (D-075, PM-001):** yalnızca cihaz profilinde; testler sahte tarihle.
- **Durma kuralı (D-072):** kontrol noktası raporundan sonra durulmaz. Yalnızca geri alınamaz işlem, para gerektirebilecek karar ya da LS ile çelişen zorunlulukta durup sor. Büyük değişiklik ve git geçmişi yeniden yazımı onayla.

## Komutlar
```sh
# kurulum
npm ci
pip install playwright pillow && python -m playwright install webkit chromium   # e2e için
# test
npm run typecheck && npm test                 # tip + birim (web, worker, shared, içerik)
npm run content:validate                      # içerik doğrulayıcı (0 hata şart); --strict: kalıp kuralları sıkı
# derleme
npm run content:build && npm run build -w web # web/dist
(cd web && npx vite build --mode e2e --outDir dist-e2e)   # e2e sürümü (sahte giriş, sahte sunucu)
# uçtan uca (yerel hızlı geri bildirim; kabul CI'da WebKit)
cd tests/e2e && python v2_core.py && python v2_player.py && python gezgin.py && python yukleme.py && python ucak.py && python visual.py --out /tmp/visual
#   WebKit + cihaz: --browser webkit --device "iPhone 15"
# v1 kapısı (yalnızca v1 değişince)
bash app/tests/run_all.sh                     # → /tmp/dw_tests.log, 17/17
# yayın
#   v2: main'e birleşince .github/workflows/deploy-v2.yml → gh-pages/v2/ + etiket v2-YYYYMMDD-n
#   v1: cd app && python3 build.py --ver YYYY-MM-DDx --deploy  (DW_GHPAGES=gh-pages çalışma ağacı) → gh-pages'e commit + push
#   Worker: .github/workflows/deploy-worker.yml (secret'lar GitHub'da; adımlar docs/v2/CLOUDFLARE_TELEFON.md)
# geri alma
scripts/v2-rollback.sh v2-YYYYMMDD-n          # ya da: gh workflow run deploy-v2.yml -f rollback_to=v2-YYYYMMDD-n
```

## Klasör sahipliği (kim yazar)
| Yol | Yazan |
|---|---|
| `web/`, `worker/`, `packages/shared/`, `content/tools/`, `.github/`, `scripts/` | baş geliştirici (ana oturum) |
| `docs/v2/STATUS.md`, `DECISIONS.md`, `BLUEPRINT.md`, `CONTENT_PLAN.md` | baş geliştirici |
| `docs/v2/PEDAGOGY.md`, `docs/v2/phases/` | proje sahibinin metni; yalnızca baş geliştirici kopyalar, içerik değiştirilmez |
| `docs/v2/{AHTAPOT,YOL_HARITASI,OGRETIM_DONGUSU,BEYIN,MIMARI,TASARIM,KUTUPHANE,ICERIK_EVRENI,KAYNAKLAR}.md`, `docs/v2/design/` | PM belgeleri (issue'dan); baş geliştirici depoya alır; içerik PM talimatıyla değişir (KAYNAKLAR §5 doğrulama sonuçları baş geliştirici yazar) |
| `docs/v2/reviews/okur/**` | okur |
| `content/v2/registry/lexicon/**` | lex |
| `content/v2/domains/<alan>/**` | yazar (görevde verilen alanlar) |
| görevde verilen içerik dosyaları + `docs/v2/reviews/**` | dilbilimci (yazar o dosyaya artık dokunmaz) |
| `content/v2/registry/patterns.json` | yazar (baş geliştiricinin görevlendirmesiyle) → dilbilimci incelemesi |
| `content/v2/registry/domains.json`, `frequency/` | baş geliştirici |
| `docs/v2/WORLD.md`, `content/v2/world/**` | baş geliştirici (Bairisch kısmını dilbilimci inceler) |
| `docs/v2/LEARNER.md` | proje sahibinin metni |
| `tests/e2e/**`, `docs/v2/qa/**` | qa (ve baş geliştirici) |
| PR yorumları | inceleme (depoya yazmaz) |
| `app/` (v1) | baş geliştirici, yalnızca onaylı küçük dokunuşlar |

Commit ve PR'ı yalnızca baş geliştirici açar; `git add -A` kullanılmaz (ajanlar çalışırken yarım dosya girmesin), yollar tek tek eklenir.
