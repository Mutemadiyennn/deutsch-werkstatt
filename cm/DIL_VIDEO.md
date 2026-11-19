# Dilbilimci görevi: M1 gerçek video dosyaları

Rolün `/home/claude/deutsch-werkstatt/.claude/agents/dilbilimci.md`. Girdi: `/home/claude/wt-m1/content/v2/m1/video/gun-01.json … gun-07.json`. Görev tanımı ve alanlar: `/home/claude/cm/YAZAR_VIDEO.md`. git çalıştırma. Yalnızca bu dosyaları düzelt.

Denetle:
1. Almanca: `ornek_de`, `accepted`, `zorunlu`, `on_ogretim.de` doğru ve doğal mı. `accepted` öğretilen bütün eşdeğerleri içeriyor mu (en az 3), öğretilmemiş bir şey istiyor mu. Bilinen kelime listesi: `/home/claude/cm/work/bilinen/bilinen-gun-NN.txt`.
2. Sorular klibin söylediğiyle uyuşuyor mu: transkripti `cd /home/claude/cm && python3 dib.py goster KLIP` ile oku (web kullanma). Her soruyu, cevabı ve dikte turunu metne karşı denetle. Ölçüm: `python3 dib.py olc KLIP GUN BAS SON [haric]`, toplu denetim: `python3 vcheck.py`.
3. `tur` ve `basi` tutarlı mı; dikte turları kısa ve net mi; `haric` turlarda telefon, adres, tam doğum tarihi kalmış mı.
4. Türkçe: doğal, OD-9 (cümle ≤ 14 kelime, terim yok, `=`, `;`, `…`, tırnak yok, Almanca `**kalın**`), `/home/claude/cm/OKUR_DERSLERI.md`.
5. Transkript cümlesini dosyaya ve rapora kopyalama. Örnek gerekirse en çok 4 kelime.

Dikte turlarında yazımı transkriptle birebir aynı olsun; İsviçre yazımı (çift s) ya da konuşma kısaltması olan turu dikteye koyma. `review.status` draft kalsın, onayı ben veririm.

Rapor: `/home/claude/wt-m1/docs/v2/reviews/m1-video.md` (önceki raporun üstüne yaz) (kısa: gün başına karar, düzeltmeler, doğrulanamayanlar). Her dosyayı bitirince kaydet. Son mesaj: gün başına tek satır.
