# 4. gün halkaları ve `lx:Euro` / `lx:Cent` kartları: dilbilimci incelemesi (PM-078 B)

Dosyalar: `docs/v2/reviews/halka/gun-04-halkalar.json`, `content/v2/registry/lexicon/batch-015.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan ve lex'ten bağımsız, son metin bir kez, PM-080)

İncelenen: **82 madde** (50 görev cümlesi ve kabul listeleri, 17 sahne satırı, 5 soru, 10 kalıp) + **2 kart** (7 eşdizim, 7 hata notu, 12 örnek, 12 boşluk).
Denetim (düzeltmelerden sonra): `halka_kontrol.py` → **0 hata, 0 not**; `kucuk_sozcuk.py` → **0 hata**; `npm run content:validate` → **0 hata** (142 uyarı, hiçbiri bu dosyalardan yeni değil). Yeni sözcük eklenmedi. 5. gün dosyası 4. günün son hâliyle yeniden koşuldu: 0 hata.

## Bulgular ve düzeltmeler: halkalar

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h2 `lx:neunzig` 2. cümle, kabul listesi | Haksız ret: çoğul özneyle **kosten** doğru ve en doğal tam cümle; listede yalnız „Das kostet …“ vardı. Gösterilen cümle değişmedi. | kabul: + „Zwei Semmeln kosten heute neunzig Cent.“ |
| 2 | h3 `lx:machen` 1. cümle, kabul listesi | Kartın hedefi **macht**; listedeki **Das kostet …** hedef sözcüğü atlatıyordu ve Türkçedeki „Toplam“ı taşımıyor (3. gün bulgu 4 ile aynı tür). Yerine kasada gerçekten duyulan kısa biçim. | „Das kostet zwei Euro neunzig.“ → „Das macht zwei neunzig.“ |
| 3 | h5 sahne, 3. satır (tr) | Aynı Almanca iki Türkçeye gidiyordu: **Das ist nicht teuer** kalıpta ve dört görev cümlesinde „Bu pahalı değil“, burada „O pahalı değil“. | „Bir kilo! O pahalı değil.“ → „Bir kilo! Bu pahalı değil.“ |

Ağırlık: 1 kabul listesinde eksik doğru varyant, 2 kabul listesinde fazla anlam, 3 Türkçe tutarlılık. Dilbilgisi hatası yok.

## Bulgular ve düzeltmeler: kartlar (batch-015)

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| K1 | `lx:Euro` mistakes_tr[0] | Kart çoğul olarak **Euros** gösteriyor, hata notu **drei Euros** yanlış diyor; ikisi yan yana çelişki gibi okunuyordu (yazarın lex isteği 2). Kural eklendi. `pl` değişmedi (**die Euros** doğru: madeni paralar). | „… Doğrusu **drei Euro**.“ → „… Doğrusu **drei Euro**: sayıdan sonra **Euro** değişmez. **Euros** yalnızca madeni paraların kendisi için söylenir.“ |
| K2 | `lx:Euro` mistakes_tr[2] | Türkçe konuşanın gerçek hatası „evro“ değil; „avro“ ve „yuro“. | „… **evro** diye değil.“ → „… **avro** ya da **yuro** diye değil.“ |

Kartlarda başka hata yok: artikel (**der Euro**, **der Cent**), çoğul (**Cent**), **einen Euro** (belirtme hâli), **zwei Euro das Kilo**, **Hundert Cent sind ein Euro**, gündelik örnekler (**Ich hab nur noch …**, **Hast du mal …?**, **die zehn Cent hab ich**) doğru ve doğal; Türkçeler doğru; İngilizce köprü yok.

**`review` alanı:** `by/at/notes` yazıldı, `status` **draft** kaldı. Doğrulayıcı okursuz „reviewed“ kabul etmiyor (`"reviewed" ama okur kontrolü geçmemiş (OD-9.4)`), görev de okur alanını yazmamamı istiyor. Dil açısından kartlar kapandı; okur geçince ANA „reviewed“ yapar.

## Yazarın açık soruları: dil açısından görüş

- **Bileşik sayılar (soru 1).** Dil açısından halkada yalnız **einundzwanzig** yeterli: tuzak tek (birlik önce söylenir, 12/21 karışır) ve h5'in iki cümlesi tam bunu çalıştırıyor. Kalanı dersin işi olabilir.
- **Öğrencinin yaşı (soru 2).** Dil konusu değil. Sabit yaş yazılmaması doğru; kalıptaki boşluk yeterli.
- **„Zwei Semmeln kosten …“ (soru 3).** 4. günde, h2'de gösterilmeli. Biçim yeni bir şey istemiyor: **kosten** kartın kendi adı, çoğulda fiil kartta yazdığı gibi kalıyor. Fırında en sık duyulan tam cümle bu; öğrenci „Zwei Semmeln kostet“ derse yanlış alışkanlık yerleşir. Öneri: h2'nin ilk kalıbı „eine Semmel kostet … – zwei Semmeln kosten …“ olsun (okur ve PM kararı). Şimdilik gösterilen cümlelerde yok, yalnız kabul listesinde (bulgu 1).
- **Luka'ya ön adla „Sie“.** Uygun ve gerçek: kuaförde müşteri ile kuaför arasında ön ad + **Sie** Almanya'da çok yaygın. 2. ve 3. günün onaylı dosyalarıyla da tutarlı („Und Sie, Luka?“). Sözlük kartlarında Luka'ya **du** deniyor; ikisi çelişmiyor ama WORLD'e bir satır gerek: başta **Sie**, hangi haftada **du** (öneri: 12. hafta, „Beim Friseur“).
- **Lex isteği 1 (`lx:Kilo`).** Katılıyorum: sayıdan sonra **Kilo** değişmez; karta `lx:Euro`'daki gibi bir hata notu yeter (kart bu görevin dosyası değil, dokunmadım).

## Bakılan, sorun bulunmayan noktalar

- **Fiyat okunuşu:** **drei Euro siebzig**, **drei siebzig**, **Drei Euro und siebzig Cent** (tam hâli), 1 avronun altı **fünfzig Cent**; sayıdan sonra **Euro/Cent/Kilo** çoğulsuz. **zwei Brote**, **zwei Semmeln**, **zwei Äpfel** çoğulları doğru.
- **Fiyat mantığı:** ekmek 3,70; iki ekmek 7,40 (h3, h4); iki küçük ekmek 1,10, poşetle 1,20; altı elma 6 × 0,50 = 3 avro. Karışma çiftleri (17/70, 19/90, 18/80, 14/40, 13/30, 12/21) gerçek.
- **Sorular:** beşi de tek cevaplı. h2, h3, h5 gerçekten çıkarım (cevap metinde söylenmiyor).
- **Kasa dili:** **Das macht …**, **Bar oder mit Karte?**, **Noch etwas?**, **Geht es mit Karte?** Bavyera'da fırında aynen duyulur. **Geht mit Karte?** ve **Geht Karte?** konuşma dili, yalnız kabul listesinde: doğru yer. **in bar** doğru.
- **WORLD:** Stadler, Brandl, Wimmer **Sie**; Ioana ve Tobi ön adla, zamirsiz; Luka 40 yaşında; fırın Stadler, tezgâh Stadtplatz. Yeni olgu yok. Bairisch yok. İngilizce köprü yok.
- **Kimlik:** öğrencinin adı, cinsiyeti, yaşı hiçbir satırda sabit değil.
- **Türkçe:** „küçük ekmek“ sözlükle aynı; „Toplam …“ = **Das macht …** dosya boyunca tek karşılık; aynı Türkçe iki Almancaya gitmiyor.

## Kalan şüpheler

1. **„Ein Euro ist hundert Cent.“** (h4): anlaşılır ve söylenir, ama daha alışılmış olan **Ein Euro sind hundert Cent** / **Ein Euro hat hundert Cent**; `lx:Cent` kartı da **sind** diyor. İkisini kabul listesine ekleyemedim: betik `sind` ve `hat`ı bilinmeyen sayıyor. **Haksız ret riski açık**; betikte ya da kümede çözülmeli (PM).
2. **„zu teuer“ = „çok pahalı“.** `lx:teuer` kartıyla aynı, bu yüzden değiştirmedim; ama `lx:zu#2` „fazla pahalı“ diyor ve **sehr teuer** de „çok pahalı“. İki Almanca tek Türkçeye gidiyor; Türkçe konuşanın bilinen karıştırması bu. Öneri: **zu** = „fazla“ (bütün dosya ve kartlarda), PM kararı.
3. **h2 „Zwei Semmeln? Heute neunzig Cent.“** aynı halkanın sahnesinde iki küçük ekmek 1,10. „Heute“ indirimi anlatıyor, çelişki değil; ama aynı halkada iki fiyat okuru şaşırtabilir. `lx:Cent` kartında tanesi 60 sent (kart genel örnek, Stadler adı yok).
4. **„Vierzig Jahre alt ist Luka.“**, **„Bitte, ja.“**, **„Bitte, das macht dreißig Euro.“** (kabul öğeleri): yanlış değil, seyrek; önceki günlerin uygulamasıyla aynı olduğu için kaldı.
5. **„Guten Tag, Frau Stadler!“**: doğru; Bavyera'da fırında **Grüß Gott** daha sık (WORLD'de kaynaklı). Öğrencinin **Guten Tag** demesi her yerde geçerli, hata değil.
6. **„Heute geht Karte nicht.“** (h4 sahnesi): konuşma dilinde duyulur; **Karte geht heute nicht** biraz daha alışılmış sıra. Değiştirmedim (anlam ve küme aynı).

## Sonuç

Hata oranı: halkalar **3 bulgu / 82 madde ≈ %3,7**; kartlar **2 bulgu / 2 kart** (ikisi de hata notu metni). Hepsi dosyada düzeltildi; betikler ve doğrulayıcı 0 hata.

**KAPANDI** (dil açısından). Açık kalan tek risk 1. şüphe (betik `sind`/`hat`). Halka dosyasında `review` alanı yok (şema ANA'da). Sıradaki: okur (OD-9).
