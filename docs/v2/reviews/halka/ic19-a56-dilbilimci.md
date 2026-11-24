# İÇ-19 / a56 — 1. gün h3 kalıbı (commit 1c54de6), dilbilimci fark turu

**Sonuç: ONAY**

Kapsam: yalnız 1c54de6 (`content/v2/m1/gun-01.json` m1:01:h3 `kaliplar[0]` ve `docs/v2/reviews/halka/gun-01-halkalar.json`'daki eşi). e83ef45 (main birleştirmesi) kapsam dışı.
İncelenen madde: 1 kalıp (2 dosyada aynı) + h3'ün 8 görev cümlesi + 1. günün `es` geçen bütün alanları. Hata: 0. Düzeltme yapılmadı.

## 1. Almanca / Türkçe doğruluk
- `Geht …? – … geht. – … geht nicht.`: doğru; konuşmada öznesiz `Geht morgen?` / `Morgen geht.` gerçekten kullanılır (Alltag eksiltisi). `es`li biçim accepted[] içinde duruyor, haksız ret yok.
- `… olur mu? – … olur. – … olmuyor.`: doğal; randevu bağlamında `olmuyor` `olmaz`dan daha uygun.

## 2. Çevirinin kalıpla uyumu
Üç parça, üç Türkçe parça; sıra ve yuva (…) birebir. Eski `– Olur.` de `– Es geht.` ile birlikte çıkmış; artık eşi olmayan parça yok. İki dosya birbirinin aynı.

## 3. Standalone "Es geht." ya da öğretilmemiş "es" kaldı mı
1. günün bütün string alanları tarandı (`accepted[1..]` dışındaki alanlar: `de`, `prompt_de`, `ornek_de`, dikte `accepted[0]`, `gun_sinavi`, `okuma_yazma`, `prova`, `sahne`, ders maddeleri):
- Standalone `Es geht.` hiçbir yerde yok (yalnız h4 accepted[1]'de `Es geht diese Woche nicht.`, alternatif).
- `es` öğrenciden istenen hiçbir alanda yok. Tek geçiş h3 sahnesindeki `ch:huber` satırı (`Hallo! Geht es morgen, am Donnerstag?`): karşı tarafın satırı, dinleme amaçlı; üretim istemiyor.
- h3 içinde `Es geht` / `Olur.` diye bir açıklama, ipucu ya da mistakes_tr kalmadı.

## 4. Görev cümleleri üç çerçeveyi taşıyor mu
- `Geht …?` → `Geht morgen?`, `Geht Freitag?`
- `… geht.` → `Donnerstag geht, Frau Huber.`
- `… geht nicht.` → `Freitag geht nicht, Herr Pichler.`
Her çerçevenin en az bir yuvalı, öğrencinin bildiğiyle kurulmuş örneği var. Ekranın 3 örnek sınırına (Akis.tsx `ornek.slice(0, 3)`) sığıyor.

## Doğrulama
`npm run content:validate` → 0 hata (158 uyarı; hiçbiri bu farkla ilgili değil).

## Kalan şüphe
Yok. (e2e `--kalip-sert` koşusunu dilbilimci çalıştırmadı; o KAPI'nın işi.)
