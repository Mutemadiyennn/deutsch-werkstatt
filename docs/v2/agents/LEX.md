# LEX ajanı — sözlük fabrikası (PEDAGOGY.md §2)
Yazma yolu: YALNIZCA `content/v2/registry/lexicon/**`.
Girdi: `content/v2/registry/frequency/lemmas.json` (rank sırası, tier, forms, noun adayı {art,pl}, v1 kimliği), `content/v2/registry/lexemes.v1.json` (v1 kartları), `content/v2/registry/patterns.json` (kalıp kimlikleri).

## Görev
Derin kart (K1) üret, 100'erlik partiler: `batch-001.json` … Biçim (şema `LexiconBatch`):
`{ "batch": "001", "review": { "status": "draft" }, "items": [ Lexeme, … ] }`
- Parti 001–008: sıklık sırasıyla (rank 1'den başlayarak). Gerçek kelime olmayan, yalnızca özel ad ya da lemmatizer hatası olan satırları atla (atladıklarını ve sebebini rapora yaz). Aynı lemma birden çok anlamda çok sıksa ayrı kayıt `#2`.
- Parti 009–010: pilot alanların (strategie, telefon, arzt) temel kelimeleri. Bunun listesini BM sana ayrıca verecek; o zamana kadar 001–008'e devam et.
## Kimlik
- lemmas.json'da `v1` alanı varsa AYNI kimliği kullan (v1 ilerlemesi bağlı). Yoksa `lx:<Lemma>` (isimde büyük harfle; boşluk yerine _).
## Derin kart zorunlu alanları
- de, tr (bağlamdaki en sık anlam), pos, tier:"K1", freqRank (lemmas.json rank), domains[] (20 alan kimliğinden ilgili olanlar: strategie telefon arzt arbeit smalltalk einkaufen essen amt bank wohnen friseur sport verkehr post werkstatt notfall freizeit gefuehle medien bairisch), level (A1/A2/B1)
- isim: art + pl (çoğulu yoksa "-"); noun adayı lemmas.json'dan gelir ama yanlış olabilir (ör. "sein" fiildir) — sen karar ver.
- fiil: verb.praesens3, verb.perfekt (ör. "hat gemacht"/"ist gegangen"), verb.aux, gerekiyorsa separable, reflexive, case, prep
- en az 2 collocation {de,tr}; en az 1 patterns[] (yalnızca patterns.json'daki kimlikler); register
- en az 1 mistakes_tr: Türkçe konuşana özgü hata (fiilin ikinci sırası, yan cümlede fiil sonda, artikel/hâl, ayrılabilen fiil, haben/sein, halb zehn = 9:30, Türkçeden birebir çeviri…)
- en az 4 example {id, de, tr, layer}: en az 1'i layer "alltag" (gündelik konuşma: hab, gibt's, mal, halt, doch, ne?, Na ja…), en az 1'i dialog:true ve iki konuşmacılı ("– Kommst du mit? – Nee, heute nicht."). Örnek kimliği: "<kart kimliği>:<n>".
- img: yalnızca somut, fotoğrafı olabilen kelimelerde İngilizce kısa Pexels sorgusu; soyut kelimede img yok.
- Örnek cümlelerdeki diğer kelimeler çoğunlukla daha sık (rank'ı daha küçük) kelimeler olsun; seyrek ve öğretilmemiş kelime oranı ≤%5.
- Fonksiyon kelimelerinde (der, ich, und, in…) collocation = tipik birleşim ("in der Nähe", "und dann"), mistakes_tr = Türkçe konuşanın tipik hatası.
## Kalite
Almanca %100 doğru ve doğal; Türkçe doğal. Her partiden sonra validate (0 hata). Her parti sonunda kısa rapor satırı yaz (kaç kart, atlananlar).
