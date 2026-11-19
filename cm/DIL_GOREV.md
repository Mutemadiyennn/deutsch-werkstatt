# Dilbilimci görevi: kelime kartı partisi (bağımsız inceleme)

Rolün: `/home/claude/deutsch-werkstatt/.claude/agents/dilbilimci.md` ve `docs/v2/agents/DILBILIMCI.md`. Yazara güvenme. git çalıştırma.
Önce oku: `/home/claude/cm/OKUR_DERSLERI.md`, `docs/v2/LEARNER.md`, `docs/v2/agents/COMMON.md`, `docs/v2/OGRETIM_DONGUSU.md` OD-9 bölümü (satır 216'dan sonrası).

- Girdi: `/home/claude/cm/work/batch-NNN.view.jsonl` (yazar yaması uygulanmış, her satır bir kart)
- Yama çıktısı: `/home/claude/cm/work/batch-NNN.dil.json`
- Rapor: `/home/claude/deutsch-werkstatt/docs/v2/reviews/lexicon-batch-NNN.md`

Bu 100 kart daha önce hiç incelenmedi. **Kartın tamamına bak:** `de`, `art`, `pl`, `verb` (praesens3, perfekt, aux, separable, case, prep), `tr`, `level`, `register`, `domains`, `coll`, her `ex` (Almanca + Türkçe + `l` katmanı + `dlg`), `exp`, `mistakes_tr`, `img`, `ex[].img`.

## Bak
1. Almanca: dilbilgisi, artikel, çoğul, Perfekt, aux, hâl, kelime sırası, doğallık. `alltag` örnek gerçekten konuşulur mu?
2. Türkçe: çeviri doğru ve doğal mı? `exp` ve `mistakes_tr` kelimenin kendisini mi anlatıyor, Türkçe konuşana özgü mü?
3. OD-9: kurallar `/home/claude/cm/LEX_GOREV.md` içinde.
4. Görsel: sorgu kelimeyi ya da cümlenin sahnesini gerçekten getirir mi? Yanıltıcıysa kaldır (`null`).
5. Öğrenci kimliği: öğrencinin ağzından çıkan `ich` cümlesinde cinsiyetli kelime `{Kunde|Kundin}` biçiminde olmalı. Ad sabit yazılmaz.
6. İçerik politikası (DN-4): siyaset, savaş, şiddet, suç ayrıntısı, din tartışması, cinsellik yok. Bu tür örneği gündelik bir cümleyle değiştir. Kişisel bilgi, kurs ya da kitap adı yok. Bairisch kaynaksız yazılmaz.
7. Olgusal bilgi yalnızca kaynaklı (`content/v2/registry/lexicon/SOURCES.md`).

## Yama biçimi (yalnızca değişenler)
```json
{"<kart id>": {"tr": "...", "de": "...", "art": "...", "pl": "...", "pos": "...", "verb": {"...": "..."}, "level": "A2", "register": "neutral",
  "coll": ["de | tr"], "exp": {"...": "..."}, "mistakes_tr": ["..."], "img": "..." , "ex_img": {"2": "..."}, "ex": {"3": {"de": "...", "tr": "...", "layer": "alltag"}}}}
```
`verb`, `coll`, `exp`, `mistakes_tr` verilirse alanın tamamı değişir, bu yüzden eksiksiz yaz. Görseli kaldırmak için `null`.

## Bitirince
```sh
cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/batch-NNN.dil.json
```
Rapor: incelenen kart sayısı, hatalar tablosu (kart · alan · önce → sonra · gerekçe), kalan şüpheler, hata oranı, sonuç **KAPANDI** ya da **AÇIK**. Son mesajında yalnızca: düzeltme sayısı, hata oranı, açık kalan kartlar, sonuç.
