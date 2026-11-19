# Yazar görevi: R0 temel paket (PM-042 B.1, OD-0, #46 P0-2)

Rolün `.claude/agents/yazar.md`. Depo: `/home/claude/deutsch-werkstatt`. git çalıştırma. Yazma yolu yalnızca `content/v2/temel/**`.
Önce oku: `docs/v2/LEARNER.md`, `docs/v2/OGRETIM_DONGUSU.md` (OD-0, OD-1, OD-2, OD-9), `docs/v2/WORLD.md`, `content/v2/curriculum/k1.json` içinde `oncelik:1` kelimeler, `content/v2/domains/telefon/SOURCES.md` (harf kodlama), `content/v2/domains/telefon/scenarios/01-arzttermin.json` (biçim fikri).

Amaç: öğrenci telefona ve doktora gitmeden önce günü, saati, tarihi, sayıyı, soru kelimelerini, **sein/haben/modal** biçimlerini ve adını harf harf söylemeyi öğrenir. Yerleştirme kontrolüyle atlanabilir.

## Dersler (dosya başına bir ders: `content/v2/temel/r0-NN-slug.json`)
01 günler · 02 aylar ve mevsimler · 03 sayılar 0–20 · 04 sayılar 21–100 · 05 saat (resmî ve gündelik; **halb zehn** 9:30) · 06 tarih (**am Dienstag**, **am 24. November**, sıra sayıları) · 07 soru kelimeleri · 08 sein ve haben · 09 können, müssen, dürfen, wollen, sollen, möchten · 10 heceleme (DIN 5009 şehir adlı + geleneksel Anton/Berta; ikisi de kabul)

## Ders biçimi
```json
{"schema":1,"id":"r0:01-tage","order":1,"level":"A1","format":"temel",
 "title_tr":"","title_de":"","goal_tr":"",
 "can_do":{"id":"cd:r0:01","tr":""},"unit":"u:r0:01","arm":"atolye","place":"pl:sprachkurs","characters":["ch:popescu"],
 "requires":{"kelimeler":[],"kaliplar":[],"gramer":[],"tur":[],"baglayicilar":[],"akicilik":[]},
 "review":{"status":"draft"},
 "teach":[{"id":"","de":"","tr":"","lexeme":"lx:Montag","exp":{"anlam_tr":"","ne_zaman_tr":"","parcalar":[],"ipucu_tr":""}}],
 "table":{"baslik_tr":"","sutunlar":[],"satirlar":[]},
 "drills":[],"dialogue":{"title_tr":"","lines":[{"speaker":"ch:popescu","r":"A","de":"","tr":""}]},
 "listening":[{"id":"","title_tr":"","speed":"slow","speeds":["slow","normal"],"script":[{"r":"","de":"","tr":""}],"qs":[{"kind":"gist","q_tr":"","opts":[],"ans":0}]}],
 "placement":[],"mission":{"task_tr":""}}
```
`drills`, `packages/shared/src/content.ts` içindeki `Drill` türleridir. `placement` de aynı türden 5 madde olur.

## Kurallar
- Ders başına en çok 12 yeni öğe; 12'den fazlaysa iki alt bölüme ayır (`teach` sırası).
- Her ders en az 20 alıştırma, en az 12'si üretim. Üretimde `accepted` ≥3 ve öğretilen bütün eşdeğerleri içerir.
- **Öğretmeden isteme yok:** alıştırma yalnızca bu dersin ve önceki R0 derslerinin öğelerini ister. Yönerge Türkçe.
- OD-9: `LEX_GOREV.md` yazım kuralları (`/home/claude/cm/`). Yanıltıcı kelimesi kelimesine çip yazma; anlamı bozacaksa `parcalar` boş kalır.
- Gerçek hayat cümleleri, Wendlfing karakterleri. Öğrenci satırında `{name}`, `{Herr|Frau}`. İngilizce köprü yok. Bairisch yok.

Son mesajında yalnızca dosya listesi, ders başına öğe/alıştırma sayısı, şüpheler.
