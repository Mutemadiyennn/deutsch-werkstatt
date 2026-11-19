# Dilbilimci görevi: PR #51 inceleme bulgularını kapatma

Not: `/home/claude/cm/r0audit.ts` önceki yarım denemeden kaldı (dosya var, ders dosyalarında değişiklik yok). Uygunsa kullan, gerekirse düzelt. Türkçe yazarken `/home/claude/cm/OKUR_DERSLERI.md` kurallarına uy. `docs/v2/STATUS.md` dosyasına dokunma.

Rolün `.claude/agents/dilbilimci.md`. **Çalışma kopyası `/home/claude/wt-r0`** (dal `content/r0-temel`). Yalnızca oradaki `content/v2/temel/**` ve `docs/v2/reviews/**` dosyalarına yaz. git çalıştırma. `node_modules` bağlı.
İnceleme yorumu: `/tmp/r51.md`. P0, P1 ve P2 içerik maddelerinin hepsini oku.

## Yap
1. **P0-1:** şehir adlı kodları öğret ya da üretimden çıkar. `r0:10:d22`, `d23`, `p04` ilk cevabı öğretilmiş kişi adlı biçim olsun; şehir adlı biçim `accepted` içinde kalır. Şehir adları için tanıma maddesi kullanabilirsin.
2. **P1-2:** `r0:09:a:sie-duerfen` parçalarını geri getir, ama yanıltıcı çip olmasın: `**Sie dürfen nichts** → hiçbir şey yememelisiniz` gibi birleşik çip kullanabilirsin, **essen** ayrı öğretilsin. Çipler soldan sağa okununca anlam bozulmasın.
3. **P1-3:** listelenen doğru cevapları `accepted` içine ekle. Sıralama maddelerinde ikinci doğru sırayı kabul et ya da maddeyi tek doğru sıra kalacak biçimde değiştir.
4. **P1-4:** `r0:10:d20` ve telefon, saat maddelerinde makul yazımları ekle (gruplu okuma, bitişik yazım, rakamlı biçim). `web/src/core/grading.ts` içindeki `norm` ve `judge` davranışını dene.
5. **P2 içerik maddeleri** ve sayı tutarsızlıkları.
6. Ders 06'daki rakam + nokta sorunu (P1-1) değerlendirici işidir; içerikte doğru biçimleri silme, raporda not et.

## Denetim betiği (zorunlu)
`/home/claude/cm/r0audit.ts` yaz ve çalıştır. Her ders için, sırayla:
- bütün alıştırmaları `packages/shared/src/content.ts` içindeki `Drill` şemasıyla doğrula;
- `exp` alanlarını `Explanation`, `explanationIssues` ve `*_tr` metinlerini `textIssues` ile denetle;
- **OD-0:** üretim maddelerinin (`tr_de`, `transform`, `guided_response`, `listen_and_respond`) ilk `accepted` cevabındaki her kelime bu ya da önceki derslerin `teach` öğelerinde, `parcalar` veya tablolarda geçiyor mu? Tablodan gelen kelimeyi ayrı say ve listele;
- `accepted` listesinin her öğesi `judge()` ile kendisini kabul ediyor mu; listede en az 3 farklı normalleştirilmiş cevap var mı.

Çıktıyı `docs/v2/reviews/temel-r0-denetim.txt` dosyasına yaz. Sonuç 0 ihlal olana kadar düzelt. Öğretilmemiş kelimeyi ya öğret ya da cümleyi değiştir.

## Bitirince
`docs/v2/reviews/temel-r0-kapanis.md` sayılarını son duruma göre düzelt (inceleme yorumundaki tutarsızlıklar dahil) ve "PR #51 inceleme kapanışı" bölümü ekle. Bütün ders dosyalarında `review` alanını `status:"draft"` yap, `okur` alanlarını kaldır; değişen Türkçe alanların yol listesini `/home/claude/cm/work/r0re4.paths.txt` dosyasına yaz (okur yeniden okuyacak). Son mesajında yalnızca kapanan ve açık kalan maddeler.
