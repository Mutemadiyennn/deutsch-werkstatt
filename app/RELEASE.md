# Yayın süreci (her sürümde aynı sıra, atlama yok)

1. **İçerik kapısı** — `cd content/kurs && python3 validate.py` → bütün ünitelerde 0 hata.
   Yeni/değişen ünite: yazar → bağımsız dilbilimci incelemesi (REVIEW_BRIEF) → `vocabscan.py` (üretim maddelerinde öğretilmemiş kelime) → editör düzeltmesi (FIX_BRIEF) → `release.txt`.
2. **Derleme** — `python3 build.py --ver YYYY-MM-DDx` (sözdizimi kontrolü dahil).
3. **Test kapısı** — `bash tests/run_all.sh` → `/tmp/dw_tests.log`:
   kurs_e2e (iki tema, baştan sona ünite) · session_e2e (oturum, oyun arası, eller serbest, seslendirme filtresi) · robot (iki tema, bütün ekranlar ve butonlar) · safearea (iPhone üst/alt) · widths (yatay taşma) · smoke_all · clocktest · voc_test · mic3test · nativetest · arttest · coretest · livefix_test · qa_regress.
   Hepsi "hata yok" olmadan yayın yok. (clocktest'teki `e.target.closest` kayıtları testin document'a gönderdiği yapay tıklamadan gelir.)
4. **Görsel kontrol** — değişen ekranların ekran görüntülerine bakılır (koyu + açık tema).
5. **QA turu** (büyük sürümlerde) — bağımsız QA ajanı öğrenci personasıyla uygulamayı kullanır, rapor → düzeltme → `tests/qa_regress.py`'ye regresyon kontrolü eklenir.
6. **Yayın** — `python3 build.py --ver … --deploy` → gh-pages commit/push; kaynak `./sync_repo.sh` → main commit/push (GitHub'da içerik + derleme kontrolü otomatik çalışır).
7. **Sürüm notu** — önemli değişiklikler `src/js/90-whatsnew.js`'e (kullanıcıya bir kez gösterilir).
