# Dilbilimci incelemesi: kart → Noto Emoji haritası (PM-081 B)

**Dosya:** `content/v2/media/resim/harita.json` · **Tarih:** 2026-11-21 · **Sonuç: KAPANDI** (iki küçük şüphe aşağıda; ikisi de birleştirmeyi engellemez)

**İncelenen:** 142 kart, hepsi. **Hata:** 10 (8 çıkarıldı, 2 resim değişti). Hata oranı 10/142 = %7. Kalan: 134 kart. (Ek sonrası: 135; sondaki "Ek" bölümüne bak.)

**Yöntem.** 142 emoji yerel `NotoColorEmoji.ttf` ile çizildi ve resme bakılarak karar verildi; yalnız Unicode adına göre değil. Her satırda iki soru soruldu: resim başka bir K1 kartıyla karışıyor mu, ve Almanya'da bu sözcük bu nesneyi mi gösteriyor. Karışma, sözlükteki 1099 K1 kartına karşı denetlendi.

## Bulgular

| Kart | Eski | Yeni | Neden |
|---|---|---|---|
| Kind | 🧒 `1f9d2` | çıkarıldı | Noto'da 🧒, 👦 ve 👨 neredeyse aynı yüz. Ayrıca Junge de Mädchen de "Kind"dir; halkada birden çok doğru cevap olur. |
| Mann | 👨 `1f468` | 🧔‍♂️ `1f9d4_200d_2642` | 👨 ile Junge 👦 ayırt edilemiyordu (aynı yüz, aynı saç). Sakal yetişkini belli ediyor; Junge böylece kalabildi. |
| Fieber | 🌡️ `1f321` | çıkarıldı | Resim oda/hava termometresi; "Temperatur", "warm" diye okunur. Ateşi asıl gösteren resim krank 🤒 (ağzında derece). "Fieber" duyan öğrenci 🤒'yi haklı olarak seçer. |
| Bratwurst | 🌭 `1f32d` | çıkarıldı | Resim hardal şeritli Amerikan sosisli sandviçi: "Hotdog". Bratwurst ızgarada kızarmış sosistir. |
| Hotel | 🏨 `1f3e8` | çıkarıldı | Binanın üstünde büyük "H" var. Türkçede "otel" H ile başlamaz, "hastane" başlar; H ayrıca Almanya'da durak işaretidir. Krankenhaus 🏥 ve Haltestelle 🚏 ile karışır. |
| Schule | 🏫 `1f3eb` | çıkarıldı | Saatli, çatılı bir bina; okul olduğunu gösteren hiçbir şey yok. Almanya'da saatli bina en çok Rathaus ya da Bahnhof'tur (ikisi de K1 kartı); Haus 🏠 ile de benzer. |
| Polizei | 🚓 `1f693` | çıkarıldı | "Polizei" sorulunca Polizist 👮 da doğru cevap gibi durur. Araç ayrıca siyah-beyaz Amerikan polis arabası; Almanya'dakiler mavi-gümüş. Polizist kaldı. |
| Klingel | 🔔 `1f514` | çıkarıldı | Resim çan, yani "Glocke". Klingel kapıdaki düğmedir. Türkçe "zil" ikisini de karşıladığı için resim yanlış eşleşmeyi pekiştirirdi. |
| Plätzchen | 🍪 `1f36a` | çıkarıldı | Resim damla çikolatalı Amerikan kurabiyesi; Almancada buna "Cookie" ya da "Keks" denir. Plätzchen Noel'de kalıpla kesilen kurabiyedir (sözlükteki resim tarifi de öyle). |
| Zug | 🚆 `1f686` | 🚄 `1f684` | 🚆, Straßenbahn 🚊 ve U-Bahn 🚇 üçü de önden görünen tren. 🚄 yandan görünen hızlı tren (ICE'ye benzer) ve diğer ikisinden ayrılıyor. |

**`not` alanı.** 47 karta eklendi; biçim: `Aynı halkada çıkmasın: X, Y.` (kart adları, virgülle; makineyle okunabilir). 20 grup, hepsi iki yönlü:
krank/Schnupfen/Übelkeit · müde/schlafen · kalt/heiß · Sommer/heiß · Geburtstag/Kuchen · gehen/rennen · Frau/Mädchen · Mann/Junge · Zug/Straßenbahn/U-Bahn · Bus/Haltestelle · Bein/Fuß · Wasser/Blut · essen/Messer/Löffel · Hochzeit/Ring · Meer/Strand/Insel · Telefon/Handy · Brief/Briefkasten · Paket/Geschenk · Bankkarte/Ausweis/Fahrkarte/Rechnung · Frühling/Blumenstrauß.
Üç kartta ek açıklama var: Arzt (Doktor ve Hausarzt sözcük seçeneği olmasın), Sommer ve Nacht (Sonne ya da Mond kart olursa resim ona geçer).

Yazarın listesinden yeni gruplar: krank/Schnupfen/Übelkeit (üçü de "hasta yüz"; krank üst kavram), Bein/Fuß, Wasser/Blut (aynı damla biçimi), essen/Messer/Löffel (tabakta bıçak var), Hochzeit/Ring, Frühling/Blumenstrauß. Yazarın lachen/weinen, bina ve içecek grupları alınmadı: resimler açıkça ayrılıyor.

## Bakılıp bırakılanlar (görevde adı geçenler)

- **Arzt 👨‍⚕️:** stetoskoplu erkek hekim; kartla örtüşüyor. Doktor ve Hausarzt resimsiz olduğu için resim halkasında çakışma olmaz.
- **müde 🥱 / schlafen 😴:** esneme ile "zzz" ayrılıyor; `not` ile birbirinden ayrıldı.
- **Sommer ☀️:** Sonne sözlükte yok, mevsim dörtlüsünde (🌸 ☀️ 🍂 ⛄) doğru okunuyor.
- **Brot 🍞:** dilimlenmiş somun; Semmel resimsiz. **Geld 💶:** euro banknotu, Almanya'ya uygun. **Haus 🏠, Auto 🚗:** Wohnung ve Wagen resimsiz, çakışma yok.
- **Parkplatz 🅿️:** Almanya'daki park tabelasının aynısı; kaldı.

## Kalan şüpheler

1. **Noto dosya adları.** Yeni iki kod (`1f9d4_200d_2642`, `1f684`) yerel Noto yazı tipinde tek resim olarak çiziliyor. Noto deposundaki dosya adlarıyla karşılaştırma yapılamadı: bu oturumdan depo dosyaları 404 döndü (bilinen `1f600` dahil). Yazarın açık sorusu aynen duruyor.
2. **Zayıf ama bırakılan resimler** (yanlış değil, tek sözcük ölçütü zayıf): Familie 👪 (bu Noto sürümünde gri karede siluet, tabela gibi), Briefkasten 📫 (bayraklı Amerikan kutusu; Almanya'daki sarı kutu değil), weiß ⚪ (beyaz zeminde gri görünür), Hochzeit 💒 ("Kirche" diye okunabilir), Jacke 🧥 (kruvaze kaban; Mantel resimsiz), Müll 🗑️ (boş çöp sepeti). Fotoğraf gelince bunlar ilk değiştirilecekler.

`not` alanını okuyan kod henüz yok; halka kuralı uygulamaya bağlanana kadar notlar yalnız belgedir.

## Kapsam (inceleme sonrası)

| Küme | Kart | Emoji eşlenen | Fotoğraflı | Fotoğraf ya da emoji | İkisi de yok |
|---|---:|---:|---:|---:|---:|
| 1.–7. gün | 155 | 26 (önce 27) | 8 | 27 | 128 |
| K1 (hepsi) | 1099 | 134 (önce 142) | 8 | 135 | 964 |
| K1, gün dışı | 944 | 108 (önce 115) | 0 | 108 | 836 |

1.–7. günde tek kayıp Fieber (7. gün). Gün başına emoji: 2 · 5 · 11 · 3 · 3 · 0 · 2.

## Denetim
- JSON geçerli; 134 kod ve 134 emoji tekil (betikle).
- Her `kod`, `emoji` alanının kod noktalarından yeniden üretildi ve eşleşti (küçük harf, `_`, FE0F'siz).
- `ad_tr` her kartta sözlükteki `tr` ile aynı.
- `npm run content:validate` → 0 hata (142 uyarı, hepsi bu dosyanın dışında).
- `review: {status: "reviewed", by: "dilbilimci-ajan", at: "2026-11-21"}` eklendi.

## Ek: MEDYA'nın beş adayı (PM 7055725467)

**Sonuç: 1 kabul, 4 ret.** Beş emoji yine yerel `NotoColorEmoji.ttf` ile çizilip resme bakılarak değerlendirildi. Harita 134 → 135 kart.

| Aday | Gün | Karar | Neden |
|---|---:|---|---|
| Tüte 🛍️ `1f6cd` | 4 | **Kabul** | Resim iki saplı alışveriş poşeti; Almancası tam olarak "Einkaufstüte" (karttaki eşdizim). Tasche 👜 (deri el çantası) ile resim olarak açıkça ayrılıyor; kartın `mistakes_tr`'si zaten Tasche/Tüte ayrımını öğretiyor, resim bunu destekliyor. `not`: Tasche, einkaufen 🛒 ile aynı halkada çıkmasın (iki yönlü; Tasche ve einkaufen'e de yazıldı). |
| Fieber 🤒 `1f912` | 7 | Ret | 🤒 hâlâ `lx:krank` kartında; aynı kod iki karta gidemez. Taşımak da doğru değil: resim önce "hasta yüz"dür, krank üst kavramdır ve krank/Schnupfen/Übelkeit grubunun çapası odur. Fieber'e geçerse krank resimsiz kalır (🤕 "verletzt", 😷 "Maske" okunur). Fieber fotoğraf bekler (ateş ölçer). |
| Karte 💳 `1f4b3` | 4 | Ret | 💳 `lx:Bankkarte` kartında; kod çakışır. 4. gün kartının öğrettiği anlam gerçekten ödeme kartı (`anlam_tr`: "Ödeme yaparken kullandığın kart"; "mit Karte zahlen"), ama kartın kendisi çok anlamlı: `tr` "kart, harita, menü", ipucu "Die Karte, bitte" = menü. Ayrıca Fahrkarte 🎫 ve Gesundheitskarte de "Karte"dir; resim halkasında birden çok doğru cevap çıkar. Tam karşılık Bankkarte'de kalır; Karte'ye fotoğraf (ödeme cihazında kart) uygun. |
| Kilo ⚖️ `2696` | 4 | Ret | Resim iki kefeli terazi: "Waage" diye okunur, simge olarak da adalet/hukuk (Recht, Anwalt K1'de). Ölçü birimi resimle gösterilemez; "Kilo" duyan öğrenci bu resmi seçmez. Uyarı: sözlükteki fotoğraf tarifi de "kitchen scale"; fotoğraf seçilirken aynı sorun çıkar (üstünde "1 kg" okunan ağırlık ya da bir kiloluk paket daha doğru). |
| hallo 👋 `1f44b` | 1 | Ret | El sallama hem selam hem veda: "tschüss" ve "auf Wiedersehen" (`lx:Wiedersehen` K1'de) için de aynı ölçüde doğru. Resim ayrıca Hand ✋ ile neredeyse aynı (açık sarı el; fark yalnız hareket çizgileri). hallo'nun ikinci anlamı "alo" (telefon) da resimde yok. |

**Kapsam (ek sonrası).** Fotoğraflı = `media/foto/secim.json`'da kart düzeyinde seçilmiş 8 fotoğraf.

| Küme | Kart | Emoji eşlenen | Fotoğraflı | Fotoğraf ya da emoji | İkisi de yok |
|---|---:|---:|---:|---:|---:|
| 1.–7. gün | 155 | 27 (önce 26) | 8 | 28 | 127 |
| K1 (hepsi) | 1099* | 135 (önce 134) | 8 | 136 | 963 |
| K1, gün dışı | 944* | 108 | 0 | 108 | 836 |

Gün başına emoji: 2 · 5 · 11 · **4** · 3 · 0 · 2. 6. gün hâlâ sıfır.

\* Payda ilk incelemedeki sayıdır. Doğrulayıcı bugün 1205 K1 sözcüğü sayıyor; 1099'un hangi süzgeçle çıktığını bu oturumda yeniden üretemedim. Paylar (135, 8, 136) ve 1.–7. gün satırı betikle yeniden hesaplandı; K1 paydası ve "ikisi de yok" sütunu baş geliştirici tarafından teyit edilmeli.

**Denetim (ek).** JSON geçerli; 135 kod ve 135 emoji tekil (betikle); her `kod` emoji kod noktalarından yeniden üretildi (küçük harf, `_`, FE0F'siz); `npm run content:validate` → 0 hata (142 uyarı, bu dosyanın dışında). `review` alanı "reviewed" olarak kaldı.
