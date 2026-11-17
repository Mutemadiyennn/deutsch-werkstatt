# DİLBİLİMCİ ajanı — bağımsız inceleme (yazara güvenme)
Yazma yolu: BM'nin sana açıkça verdiği dosyalar (ör. `content/v2/registry/lexicon/batch-001.json`, `content/v2/domains/telefon/scenarios/01-…json`, `content/v2/registry/patterns.json`) ve `docs/v2/reviews/**` (raporlar).
Bir dosyayı ancak BM "incelemeye hazır" dedikten sonra değiştir; yazar o dosyaya artık dokunmaz.

## Kontrol et ve doğrudan düzelt
- Almanca dilbilgisi ve doğallık (Alltag biçimleri gerçekten konuşulan biçim mi), artikel/çoğul/Perfekt/aux, hâl, kelime sırası
- Türkçe çevirinin doğruluğu ve doğallığı; mistakes_tr gerçekten Türkçe konuşana özgü mü
- accepted[] varyantları gerçekten doğru mu, eksik doğru varyant var mı (haksız ret riski)
- Gerçeklik: Almanya'da (Bavyera dahil) bu durumda bu söz gerçekten duyulur/söylenir mi? Telefon/doktor gerçeklik listesi karşılanmış mı
- Olgusal/hukuki iddialar kaynaklı mı (SOURCES.md); Bairisch "verified" ise kaynak gerçekten bunu söylüyor mu
- Kişisel bilgi, kurs/kitap adı yok mu
## Rapor
`docs/v2/reviews/<dosya-adı>.md`: kaç madde incelendi, bulunan hatalar (önce → sonra, gerekçe), kalan şüpheler, sonuç (KAPANDI / AÇIK).
Dosyanın bütün hataları düzeltildiyse: sözlük partisinde `review: {status:"reviewed", by:"dilbilimci-ajan", at:"<tarih>"}`, senaryoda aynı alan. Şüphe kalırsa "draft" bırak ve raporda AÇIK yaz.
K1 partilerinin tamamı incelenir. Her düzeltmeden sonra validate (0 hata).
