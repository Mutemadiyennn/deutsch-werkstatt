# Yazar notları: 47. ve 48. gün, gorulmemis-07 (İÇ-6, PM-089)

Dosyalar: `content/v2/m1/gun-47.json`, `content/v2/m1/gun-48.json`, `content/v2/m1/gorulmemis-07.json`. Hepsi `review.status: "draft"`.

## Kurgu
- **47. gün: Beğendiğini söylemek** (pl:praxis + Ioana'nın dairesi). Halka 1: Ioana'nın yeni dairesi (Bild, Wohnung, rot, weiß, interessant). Halka 2: bekleme odasında Frau Brandl'ın tatil fotoğrafları (Hotel, Meer, See, Insel, Gericht, Klasse). Sahne: bekleme odasındaki kırmızı-beyaz resim; Frau Brandl Dr. Weber'e "Interessant, Herr Doktor" diyerek kibarca geçiştiriyor. Sesler: Derya'nın göl daveti (sesli mesaj), göl otelinin radyo reklamı. Prova: Ioana'nın dairesi, ceket "steht/passt". Okuma: Ioana'nın mesajı.
- **48. gün: Arkadaşa öğüt** (pl:firma, telefon). Halka 1: Tobi hasta (vermissen, kochen, leihen, Tisch, Messer). Halka 2: arkadaşlık (kennenlernen, sich_treffen, siezen, zusagen, Freundschaft). Sahne: Derya hoparlörden Tobi'yle konuşuyor. Sesler: Tobi'nin sesli mesajı (şefi ara), akşam kapalı eczanenin kayıt anonsu (istasyondaki eczane açık). Prova: Tobi'yi aramak. Yazma: Tobi'ye öğüt mesajı.

## Dil noktaları (grammar.json açıklamalarıyla uyumlu)
| Gün | Nokta | Halka görev cümlesi |
|---|---|---|
| 47 | gr:a1-13:t5 gefällt / passt / steht | 16 |
| 47 | gr:a1-13:t4 mir / dir / ihm / ihr / Ihnen | 16 |
| 47 | 46. gün tekrarı: gr:a1-10:t2 sein/ihr/unser | 2 (ihr Hotel, Unser Hotel) |
| 47 | 46. gün tekrarı: gr:a1-09:t5 form sorusu | 1 (Wie ist die Adresse …?) |
| 48 | gr:a1-10:t3 du emri (Trink! Bleib! Geh!) | 8 |
| 48 | gr:a1-14:t1 mich / dich / ihn | 11 |
| 48 | gr:a1-14:t2 für / ohne | 8 |
| 48 | 47. gün tekrarı: gefällt / passt / mir / dir | 4 |

Dil noktasının çekimli biçimleri (gefällt, passt, steht, trink, bleib, nimm, vermisse, koche, rufe) K(t)'de yok; her biri halkanın `kaliplar`ında öğretiliyor. "sehr", "gern", "noch", "Hause" K(t)'de olmadığı için hiçbir görev cümlesinde yok.

## Emin olmadığım noktalar
1. **`dersler` hatası:** omurga kimlikleri (`gr:a1-13:t4` …) `m1check` içinde "temel pakette yok" hatası veriyor (5 hata). Bu bilinen PM-İSTEK (c1.md). `requires.gramer`'e önceki günün noktası yazıldı.
2. **Klasse:** "harika" anlamıyla kullanıldı (Klasse!, Klasse, das passt!). Sınıf anlamı bu günde yok.
3. **gefallen + yemek:** Almancada yemek için "schmecken" daha doğal. Bu yüzden "Gericht" ile gefallen kurulmadı, "lecker" kullanıldı.
4. **"Du bist ganz weiß!"** (g2): solgun yüz için gündelikte duyulur; daha yaygını "blass" ama K(49)'da yok.
5. **"Brunnengasse sieben"** (g5): öğrencinin dünyadaki apartmanı (pl:haus). Gerçek kişisel bilgi değil.
6. **Görülmemiş durumlar ve 43.–44. gün:** 43. günde Wimmer iş yerinde Tobi'nin yokluğunu soruyor; g1'de olay farklı (senin sırt ağrın). 44. günde Pichler muayenehanede, Luka restoranda; g2 ve g4'te yer ve olay farklı. 45.–46. gün dosyaları yazarken yoktu, onlarla karşılaştırma yapılmadı.
7. **`{name}`:** hiç kullanılmadı; `_adsiz` gerekmedi.
