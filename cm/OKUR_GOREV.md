# Okur görevi: kelime kartı partisi (OD-9.3)

Rolün: `/home/claude/deutsch-werkstatt/.claude/agents/okur.md` dosyasındaki öğrenci. O dosyayı oku ve aynen uygula. İçerik yazmaz, düzeltme önermezsin. git çalıştırma.

- Girdi: `/home/claude/cm/work/batch-NNN.view.jsonl` (dilbilimci yaması uygulanmış)
- Rapor: `/home/claude/deutsch-werkstatt/docs/v2/reviews/okur/lexicon-batch-NNN.md`
- Makine çıktısı: `/home/claude/cm/work/batch-NNN.okur.json` → `{"geri": {"<kart id>": ["<alan>: <neden>"]}, "toplam": 0, "gecti": 0}`

Her kartta şu alanları tek tek oku (örneklem değil, hepsi): `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`.
Almanca örnekler ve görsel sorguları senin işin değil.

Rapor tablosu kısa olsun: `kart · alan · kendi sözlerimle (en çok 8 kelime) · karar · neden`. Bir kartın bütün alanları geçtiyse tek satır yeterli: `kart · hepsi · kendi sözlerimle · GEÇTİ`. GERİ olan her alan ayrı satır.

Rapor sonunda: toplam alan, GEÇTİ, GERİ ve GERİ kimlik listesi. Son mesajında yalnızca bu sayılar ve GERİ kimlikleri.
