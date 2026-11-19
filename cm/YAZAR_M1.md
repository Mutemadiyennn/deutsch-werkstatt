# Yazar görevi: M1 İlk Hafta, günlük içerik

Rolün `.claude/agents/yazar.md`. **Çalışma kopyası: `/home/claude/wt-m1`.** git çalıştırma. Yazma yolu: `content/v2/m1/**`.

## Önce oku
`docs/v2/LEARNER.md`, `content/v2/m1/FORMAT.md` (biçim), `content/v2/curriculum/m1.json` (plan), `docs/v2/WORLD.md`, `docs/v2/OGRETIM_DONGUSU.md` OD-0 ve OD-9, `/home/claude/cm/OKUR_DERSLERI.md`, o günün ve önceki günlerin `content/v2/temel/r0-*.json` dersleri.

## Öğrenci
Sıfır Almancayla başlayan yetişkin. Gün N'de bildiği her şey: 1…N. günlerin `dersler` öğeleri ve `yeni_kartlar`, ayrıca önceki günlerin içerikleri. Üretim isteği bunların dışına çıkamaz (OD-0). Bu kuralın istisnası yok.

## Her gün için yaz
1. **`yeni_kartlar`:** plandakileri koru. 15'in altındaysa günün konusuna uygun kartlarla 15–25'e tamamla; kaynak: `/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-009…013.json` ve `content/v2/curriculum/k1.json` (`oncelik` küçük olan önce). Eklediğin kart o günün videosunda ya da sesinde geçsin.
2. **Video:** 45–75 sn, kendi kısa videomuz. Biçimler günlere dağılsın: sokak röportajı, bir günüm, nasıl yapılır, bunu nasıl söylersin. Çizimle üretilecek (`gercek_insan:false`); `sahne_tr` çizilebilir olsun. Tek bölüm yeterli. Bölümde `ana_fikir`, en az 2 `ayrinti`, beş kademeli `dikte` merdiveni, `golge` ve `cevapla` olsun (FORMAT.md, PM-053).
3. **2 gerçek ses:** biri anons (istasyon, market, muayenehane bekleme hattı), biri sesli mesaj. Her biri 2–5 cümle. Her biri tek bölüm: `ana_fikir`, `ayrinti`, `dikte` merdiveni, `golge`, `cevapla` ve ayrıca `eylem`.
4. **Görsel anlam:** 6 madde. Çeviri yok; fotoğrafı net çıkacak somut kelimeler ya da saat, sayı gibi çizilebilir şeyler.
5. **Konuşma provası:** 5–8 düğümlü dallanan diyalog. Her düğümde en çok 3 seçenek; en az bir yanlış ya da kaba seçenek ve kısa Türkçe geri bildirim. Öğrencinin söylediği her cümlede `accepted` en az 3.
6. **Okuma ya da yazma:** günler arasında dönüşümlü. Okuma: 3–6 cümlelik kısa metin ve en az 4 soru. Yazma: "benzer bir mesaj yaz" türü; `zorunlu` öğeler, `ornek_de` ve 3 maddelik `kontrol_tr` (PM-054.5).

Gerçek hayat durumları kullan: telefon, muayenehane, market, komşu, iş. Wendlfing karakterleri (`ch:`). Siyaset, şiddet, ölüm, din tartışması yok. Bairisch yok. Telifli metin yok. Öğrenci satırında `{name}`, `{Herr|Frau}`. Olgusal bilgi (saat, kural, numara) kurgusal ve zararsız olsun; gerçek telefon numarası yazma.

## Denetim
Bitince şu betiği yaz ve çalıştır: `/home/claude/cm/m1audit.ts`. Var ise kullan, eksikse tamamla. Şunları denetler: JSON biçimi, `Drill` şeması (`packages/shared/src/content.ts`), `textIssues` ile bütün `*_tr` alanları, üretim cevabının ilk `accepted` biçiminde öğretilmemiş kelime (öğretim kaynağı: r0 dersleri `teach.de`, `parcalar.de`, tablo; `yeni_kartlar` için kartın `de`, `collocations`, `forms`; kart örnekleri öğretilmiş sayılmaz), `accepted` en az 3 ve `web/src/core/grading.ts` `judge()` ile her cevabın kendisini kabul etmesi, dinleme metinlerinde bilinmeyen kelime oranı ≤%5 (OD-0: en az %95 bilinen; kart örnekleri bilinen sayılmaz). Çıktı: `docs/v2/reviews/m1-denetim.txt`. 0 ihlal olana kadar düzelt.

Son mesajında yalnızca: yazılan dosyalar, gün başına sayılar, denetim sonucu, şüpheler.

## Dilbilimciden gelen dersler (gün 1–2)
- Kişi kendini **Herr** ile tanıtmaz: **Hier ist Stefan Wimmer.**
- `accepted` geniş olsun: öğretilmiş kısa cevaplar (**passt**, **ist gut**, **geht's**, **leider**, yalın **Bis Montag!**) kabul edilsin.
- Gerçek ses gerçek gibi olsun: öğretim için bükülmüş cümle yazma (telesekreterde tek başına **Heute ist Freitag.** olmaz).
- Karşı taraf öğrencinin derdini söylemeden bilmesin; `durum_tr` ile uyumlu olsun.
- Kaba seçeneğin yedek cevabı da kaba olsun. Çeldirici, aynı günün başka bölümündeki doğru cevapla çakışmasın.
- `zorunlu` alanı öğretilmiş başka doğru biçimleri dışlamasın.
- **Ses ve videoda ad yer tutucusu yok** (`{name}`, `{Herr|Frau}`): ses önceden üretilir. Yer tutucu yalnızca ekranda okunan ve öğrencinin söylediği satırda olur.
- Öğrencinin kendi bilgisini soran provada sabit tarih dayatma; seçenekleri öğrenciye değil karaktere bağla.
