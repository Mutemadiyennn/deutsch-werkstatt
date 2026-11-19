# Dilbilimci görevi: açık maddeleri kapatma (parti 001–003)

Rolün `.claude/agents/dilbilimci.md`. git çalıştırma. Parti dosyalarına doğrudan yazma. Yalnızca aşağıdaki kartlara bak; partinin tamamını okuma (`grep '"id": "lx:…"' work/batch-NNN.view.jsonl` yeter). Yama biçimi `/home/claude/cm/DIL_GOREV.md` içindeki biçimdir, OD-9 kuralları `LEX_GOREV.md` içindedir.

Çıktılar: `/home/claude/cm/work/batch-001.fix.json`, `/home/claude/cm/work/batch-002.fix.json`, `/home/claude/cm/work/batch-003.fix2.json` (gerekirse). Raporların sonuna `## Açık maddelerin kapanışı` bölümü ekle: `docs/v2/reviews/lexicon-batch-00N.md`.

## 001
- `lx:denn#2`: doğal bir `alltag` örnek bul ya da yaz; kart kapanmalı.
- `lx:bei`: hata notundaki gerçek şirket adını kaldır (Siemens). Kurgusal ya da genel bir işyeri kullan.

## 002
- `lx:leid`: `de` değerini **leidtun** yap, `pos:"verb"` ve `verb` alanlarını doldur. Kimlik `lx:leid` kalır.
- `lx:Gott`, `lx:hallo`, `lx:stehen`: güney kullanımı bilgisi kaynaksız. Sözlük düzeyinde kaynağı açıp doğrula; doğrulanırsa kaynağı raporuna yaz, doğrulanmazsa ifadeyi kaldır. Güney Almanca Bairisch sayılmaz.
- `lx:na` ö1–ö2, `lx:Gott` ö2: katman `alltag` olmalı mı? Gerekiyorsa `"ex":{"1":{"layer":"alltag"}}`.
- `lx:mögen#2`: `verb.perfekt` doğru mu? Kart hangi anlamı öğretiyorsa ona uydur.
- `lx:selbst`: kurgu hata maddesini gerçek bir Türkçe konuşan hatasıyla değiştir ya da kaldır.

## 003 (okurdan dönen 13 kartın yazar düzeltmesi; Almancayı ve doğruluğu denetle)
`lx:beide`, `lx:Ordnung`, `lx:vergessen`, `lx:dafür`, `lx:welcher`, `lx:Angst`, `lx:zusammen`, `lx:wenig`, `lx:wann`, `lx:ne`, `lx:darüber`, `lx:daran`, `lx:nett`. Yanlış varsa `batch-003.fix2.json` yaz.

Bitince: `cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/<dosya>`. Son mesajında yalnızca kapanan ve açık kalan kartlar.
