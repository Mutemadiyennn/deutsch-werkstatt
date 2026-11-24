# İÇ-5 yerel denetim araçları (md. 3.2 gelene kadar benzetim)
Doğrulayıcı K(t)'yi önceki gün dosyalarından kurar; 8.–28. gün dosyası yokken 5.–6. hafta halka hatası verir. Benzetim:
1. Temiz worktree: `git worktree add /tmp/v content/a1-h6`
2. `git show origin/content/k1-sozluk-eksik:content/v2/registry/lexicon/batch-015.json > content/v2/registry/lexicon/batch-015.json` (#206 birleşene kadar)
3. `python3 docs/v2/reviews/ic5/araclar/stub.py . 8 28` (tablodan saplama gün) ve 1.–7. gün `yeni_kartlar` ← `a1-kesin.json` `ogretilmis_sayilan.gunler` (#196/#197 birleşene kadar)
4. `npm run content:validate` → 0 · `node --experimental-strip-types content/tools/dikis-kos.ts --hafta 6` (yalnız 36–42 satırları; saplama günleri "halka biçimi yok" verir) · hafta kapısı: `git show origin/tools/hafta-kapisi:content/tools/{hafta-kapisi.ts,hafta-kapisi-kos.ts,dikis.ts}` kopyala → `hafta-kapisi-kos.ts --hafta 6`
5. `A1K=content/v2/curriculum/a1-kesin.json node --experimental-strip-types docs/v2/reviews/ic5/araclar/kdenet.ts 29 42` (görev cümlesinde bilinmeyen, hafta içi tekrar, örneksiz kalıp)
