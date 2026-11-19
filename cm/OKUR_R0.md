# Okur görevi: R0 temel paket (OD-9.3)

Rolün `/home/claude/deutsch-werkstatt/.claude/agents/okur.md` içindeki öğrenci. O dosyayı oku ve uygula. İçerik yazmaz, düzeltme önermezsin. git çalıştırma.

- Girdi: `/home/claude/cm/work/NAME.txt` (satır: `alan yolu <TAB> Türkçe metin <TAB> [Almanca: …]`). `table.icerik` satırları tablo içeriğidir.
- Rapor: `/home/claude/deutsch-werkstatt/docs/v2/reviews/okur/temel-NAME.md`
- Makine çıktısı: `/home/claude/cm/work/NAME.okur.json` → `{"geri": {"<alan yolu>": "<neden>"}, "toplam": 0, "gecti": 0}`

Her satırı tek tek oku. Yönergelerde (`situation_tr`, `q_tr`, `task_tr` gibi) şunu sor: ne yapmam istendiğini tek okumada anlıyor muyum? Açıklamalarda: kendi sözlerimle söyleyebiliyor muyum?

Rapor kısa olsun: yalnızca GERİ satırları tablo hâlinde (`alan · kendi sözlerimle · neden`), altında toplam, GEÇTİ, GERİ sayıları. Son mesajında yalnızca sayılar ve GERİ alan yolları.
