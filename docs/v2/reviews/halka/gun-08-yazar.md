# 8. gün: yazar notu (İÇ-7, 2. hafta)

Dosya: `content/v2/m1/gun-08.json` (+ `content/v2/m1/dn-02.json`, `registry/grammar.json` gr:a1-03:t5 açıklaması). Başlangıç: önceki vardiyanın `gun-08-halkalar.json` taslağı (origin/content/hafta2-gun-08); halkalar korundu, dil noktası için h2 ve h3 `dersten_sonra: true` yapıldı, fiyat cümleleri eklendi, `cikarim` alanı (şemada yok) çıkarıldı.

- Tarih: pazartesi 30.11.2026 (1. Advent'in ertesi günü). Mekân `pl:baeckerei`, kol `pazar`.
- Dersler: `gr:a1-03:t5` (fiyat), `dn:kucuk-sozcukler` (dn-02.json).
- Kartlar 13 (tablo 13): jetzt, Zeit, kurz, gleich, lange · immer, erst, viel, mehr · gut, klar, echt, ganz.

## Kart → halka
| Halka | Kartlar | Kalıplar | dersten_sonra |
|---|---|---|---|
| h1 Şimdi mi, birazdan mı? | jetzt, Zeit, kurz, gleich, lange | Haben Sie kurz Zeit? – Ich komme gleich. · Wie lange …? – Nicht lange. | hayır |
| h2 Her zamanki gibi mi? | immer, erst, viel, mehr | Wie immer? – Ja, wie immer. · … nicht mehr – kein … mehr – keine … mehr | evet |
| h3 Cidden mi? Fena değil! | gut, klar, echt, ganz | Wie geht es Ihnen? – Mir geht es gut. · Alles klar! – Na klar! | evet |

29 görev cümlesi (kart başına 2–3), her birinde ≥ 3 kabul; 6 kalıp satırı (halka başına 2).

## Dil noktası görevleri (dersten_sonra halkalarda görev cümlesi)
- `gr:a1-03:t5` fiyat: **6** (Was kostet das Brot? Wie immer …; Drei Euro für zwei Semmeln? …; Eine Semmel kostet jetzt sechzig Cent …; Gut, und was kosten die Semmeln?; Alles klar … Was macht das?; Echt? Nur fünfzig Cent?).
- `dn:kucuk-sozcukler`: **8** (immer ×2, erst ×2, mehr ×2 + dann, sehr, nur).
- Planlayıcı her görev cümlesinden tanıma (dinle-anla), kurma (sırala, boşluk, Almancasını kur) ve üretme (söyle) adımı seçer; 6 cümle her tür için en az 2 cümle bırakır.
- Ertesi gün (9. gün): fiyat 3, küçük sözcükler 4 görev cümlesiyle geri geliyor.

## Çerçeve biçimleri nerede gösterildi
1. haftanın ders `teach`'leri ve halka kalıpları (ich, du, wir, Sie, Ihnen, nicht, und, für, von, im, mein, keine, einen …); bugün: **kein/keine** (h2 kalıbı), **mir** (h3 kalıbı), **mal, doch** (dn:kucuk-sozcukler tablosu).

## Halka dışı
Sahne (13 satır, Stadler + Ioana; küçük ekmek gecikiyor, fiyat 50 → 60 sent), 2 ses (Frau Huber'in randevu mesajı: çarşamba → cuma 9.30; muayenehanenin bekleme anonsu), 4 görsel, prova (Stadler: her zamanki sipariş, bekleme, yeni fiyat, ödeme), okuma (Ioana'nın mesajı), gün sınavı 11 madde (4 dikte, 4 tr_de, 2 sesli, 1 mini prova). Ad yuvası olan alanların `_adsiz` biçimleri yazıldı.

## Ölçüm
`KT="8 9 10 11" kos.sh … --gun 8 … --gun 11`: validate 0 hata · dikiş İhlal 0 · kt.ts plan eksik 0 · kucuk_sozcuk 0 hata.

## Belirsiz kalanlar (dilbilimciye)
- „Nicht lange, nur zehn Minuten.“ Türkçesi „Uzun sürmez“ mi, „Çok değil“ mi?
- „Eine Semmel kostet jetzt sechzig Cent, nicht mehr fünfzig.“ Türkçe sırası.
- Sahne fiyatları (Semmel 0,60 €, Brot 3,90 €) kurgusal sahne fiyatıdır, olgu iddiası değil.
