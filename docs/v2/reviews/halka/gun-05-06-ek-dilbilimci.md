# 5. ve 6. gün halkaları, ek 3 madde: dilbilimci incelemesi (İÇ-3, PM-084 hat C, PR 1b)

Dosyalar: `content/v2/m1/gun-05.json` (1 madde), `content/v2/m1/gun-06.json` (2 madde); öneri dosyaları `docs/v2/reviews/halka/gun-05-halkalar.json`, `gun-06-halkalar.json` · Tarih: 2026-11-22 · İnceleyen: dilbilimci-ajan (yazardan bağımsız)

Kapsam: yalnızca eklenen ya da değişen **3 madde** (2 yeni kalıp satırı, 1 değişen görev cümlesi). Dosyaların geri kalanına dokunulmadı.

İncelenen: **3 madde** (3 Almanca metin, 3 Türkçe karşılık, 3 kabul satırı).

Denetim (düzeltmeden sonra):
- `npm run content:validate` → **0 hata**, 134 uyarı (hiçbiri bu maddelerle ilgili değil).
- `kt.ts … cumle 6 4 "Meine Adresse ist neu."` → **TAMAM**. Kalıpların taşıdığı görev cümleleri de yeniden koşuldu (5. gün h1 ve h3, 6. gün h1): hepsi TAMAM. Yeni sözcük eklenmedi.

## Kararlar

| # | Madde | Almanca | Türkçe | Karar |
|---|---|---|---|---|
| 1 | m1:05:h1 kalıp „zu spät – zu früh“ = „fazla geç – fazla erken“ | doğru, doğal | doğru, tutarlı | değişiklik yok |
| 2 | m1:06:h1 kalıp „der erste – der zweite – der dritte – der vierte“ = „ayın biri – ikisi – üçü – dördü“ | sözcükler ve çekim doğru; **büyük harf sorusu açık** (aşağıda) | doğru, öteki satırla uyumlu | değişiklik yok, 1 açık karar |
| 3 | m1:06:h4 `lx:Adresse` „Meine Adresse ist neu.“ = „Adresim yeni.“ | doğru | doğru, doğal | kabul listesinde 1 satır değişti |

## Bulgu ve düzeltme

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | m1:06:h4 `lx:Adresse`, kabul listesi | **(a) Anlamı eksik varyant.** „Die Adresse ist neu.“ = „Adres yeni.“; Türkçedeki „-im“ yok. Aynı halkanın öteki satırları iyeliği her yerde istiyor („Brauchen Sie **meine** Nummer?“, „**mein** Geburtsdatum“, „**meine** Telefonnummer und Adresse“). Hemen alttaki ikiz cümle („Meine Telefonnummer ist neu.“) „Die Telefonnummer ist neu.“yu kabul etmiyor; 3. gündeki „Meine Nummer ist neu.“ (= „Numaram yeni.“) da „Die Nummer ist neu.“yu kabul etmiyor. Öğrenci aynı eksiği bir satırda doğru, öbüründe yanlış görürdü. Türkçe konuşan için asıl öğrenilecek şey de bu: ek olan „-im“ Almancada ayrı sözcük (**meine**). Kabul edilmezse değerlendirici en yakın satırı gösterir ve eksik sözcüğü (**Meine**) işaretler; bu haksız ret değil, doğru geri bildirim. **(b) Eksik doğru varyant.** Konuşmada en sık biçim **Ich hab …**; 3. günde aynı cümlenin kabul listesinde var („Ich hab eine neue Nummer.“), 2., 5. ve 7. günde de kabul ediliyor. Burada yoktu. | „Die Adresse ist neu.“ → „Ich hab eine neue Adresse.“ |

### Son hâl (tam metin)

`content/v2/m1/gun-06.json` → `halkalar[3]` (m1:06:h4) → `gorev_cumleleri[3]`; öneri dosyasında aynı yer, aynı metin:

```json
{
 "kart": "lx:Adresse",
 "de": "Meine Adresse ist neu.",
 "tr": "Adresim yeni.",
 "accepted": [
  "Meine Adresse ist neu.",
  "Ich habe eine neue Adresse.",
  "Ich hab eine neue Adresse."
 ]
}
```

`de` ve `tr` değişmedi. D-064 tutuyor (3 ayrı cevap). **hab** yeni sözcük değil: **habe**'nin konuşma biçimi, yalnız kabul satırında (1. haftada bu satır dışında 27 kabul satırında geçiyor: 2., 3., 5. ve 7. gün).

## Bakılan, sorun bulunmayan noktalar

**Madde 1 (zu spät – zu früh).**
- Almanca doğru; iki söz de aynen böyle söylenir. Biçim aynı halkanın „vier Uhr – vier Stunden“ satırıyla aynı (iki kısa söz, arada çizgi).
- Türkçe „fazla geç – fazla erken“ PM kararına uygun (**zu** = „fazla“) ve her yerle aynı: 4. günün kalıbı („Bu fazla pahalı.“), bu günün görev cümleleri („Bu fazla geç.“, „Bu fazla erken!“, „Hayır, bu fazla geç.“), günün sahnesi ve sınavı, `lx:spät` ve `lx:früh` kartlarının eş dizimleri („zu spät“ = „fazla geç“, „zu früh“ = „fazla erken“). 5. günde „çok geç“ ya da „çok erken“ kalmamış.
- „geç kalmak“ anlamı (**zu spät kommen**, **Ich bin zu spät.**) bu günde kullanılmıyor; kalıbın Türkçesiyle çakışan satır yok.

**Madde 2 (der erste – der zweite – der dritte – der vierte).**
- Sözcükler ve çekim doğru: belirli artikelden sonra yalın hâlde **-e** (**der erste**), **am**'dan sonra **-en** (alttaki satır). Halkanın ilk satırı („Heute ist der erste Mai.“) ile alttaki satır („am ersten Mai – am zweiten …“) arasında doğru yerde: önce tam cümle, sonra yalın biçimler, sonra **am**'lı biçimler.
- Türkçe „ayın biri – ikisi – üçü – dördü“ doğal ve tutarlı: alttaki satır „… ayın ikisinde – üçünde – dördünde“, görev cümleleri „Ayın biri mi? Hayır, ikisi!“, „Bugün ayın üçü, ikisi değil.“ aynı anlatımla. Ay adı gelince Türkçe zaten „dört aralık“, „bir mayıs“ oluyor; bunu ilk satır gösteriyor. Çelişki yok.
- Kalıbın gösterdiği dört görev cümlesi kt'de TAMAM.

**Madde 3 (Meine Adresse ist neu.).**
- Almanca doğru. En alışılmış söyleyiş **Ich habe eine neue Adresse.**; o da kabul listesinde, `lx:Adresse` kartının örneği de bu. Öğrenci kartı gördüyse onu yazar ve doğru sayılır.
- Türkçe „Adresim yeni.“ doğru ve doğal; ikiz cümleyle („Telefon numaram yeni.“) ve 3. günle („Numaram yeni.“) aynı kalıp. Bu Türkçe 1. haftada başka bir Almancaya gitmiyor.
- Kimlik: öğrencinin adı, cinsiyeti, gerçek adresi yok. İngilizce yok, Bairisch yok, olgu iddiası yok.

## Kalan şüpheler

1. **Büyük harf: tek başına duran sıra sayısı (madde 2 ve aynı biçimli eski satırlar). AÇIK, karar İÇ/PM'de.**
   Resmî yazımda sıra sayısı ardından ad gelince küçük yazılır (**der erste Mai**, **am dritten Dezember**), ad söylenmeden „ayın günü“ anlamında tek başına durunca büyük yazılır. Duden'in kendi örnekleri: „heute ist der achte Januar“ ama „heute ist der Achte (der achte Tag des Monats)“, „am Achten [des Monats]“, „der Erste des Monats“. Depodaki sözlük kartları da böyle yazıyor: `lx:vierter` „– Der Wievielte ist heute? – Der Vierte.“, „Am Vierten, am Samstag.“; `lx:erster` „am Ersten des Monats“.
   Yeni kalıp satırı tam bu „tek başına“ anlamı öğretiyor (Türkçesi „ayın biri“), ama küçük harfle. Aynı küçük harf 6. ve 7. günün daha önce onaylanmış satırlarında da var; önceki rapor bunu açıkça doğru saymıştı (`gun-06-dilbilimci.md`, „Büyük/küçük harf doğru“). Ay adı önceki sözde geçtiyse küçük harf savunulur (eksiltili kullanım; sahnedeki „Am dritten? Heute ist der zweite!“ böyle). Bağlamsız gösterilen görev cümlelerinde savunulmaz:
   - 6. gün h1: „Der erste? Nein, der zweite!“ → „Der Erste? Nein, der Zweite!“
   - 6. gün h1: „Heute ist der dritte, nicht der zweite.“ → „Heute ist der Dritte, nicht der Zweite.“
   - 6. gün h1: „Am vierten? Nein, am dritten!“ → „Am Vierten? Nein, am Dritten!“
   - kalıp: „der erste – der zweite – der dritte – der vierte“ → „der Erste – der Zweite – der Dritte – der Vierte“
   - 7. günde aynı biçim: „Ich kann am dritten nicht kommen.“, „Ich verstehe nicht. Am dritten oder am vierten?“, „Am vierten? Können Sie das Datum wiederholen?“ (bağlamlarına bakılmadı).

   **Neden kalıbı şimdi değiştirmedim:** yalnız kalıbı büyük harfe çevirirsem öğrenci çerçevede „der Erste“, hemen altındaki görev cümlesinde „der erste“ görür; kapsamım dışındaki satırlara dokunmam yasak. Tek satırlık düzeltme tutarsızlığı büyütürdü. Doğrusu, kalıp ile yukarıdaki cümlelerin (ve kabul satırlarının) birlikte, tek kararla değişmesi.
   **Etkisi:** yalnız ekranda görünen yazım. Değerlendirici büyük/küçük harfe bakmaz (`norm`), öğrencinin cevabı etkilenmez; konuşmada fark yok. Doğrulayıcı da engel değil: büyük harfli biçimler bugünkü kalıpla kt'de TAMAM („Der Erste? Nein, der Zweite!“, „Heute ist der Dritte, nicht der Zweite.“, „Am Vierten? Nein, am Dritten!“).
2. **İkiz cümlenin kabul listesi (kapsam dışı, dokunmadım).** „Meine Telefonnummer ist neu.“ listesinde **Ich hab eine neue Telefonnummer.** yok; üçüncü satırı („Ich habe eine neue Telefonnummer, ja.“) öğrencinin yazacağı bir cevap değil. Madde 3'teki düzeltmeden sonra **hab** biçimi bir satırda kabul, ikizinde ret. Öneri: o satırda „…, ja.“ → „Ich hab eine neue Telefonnummer.“
3. **Aynı halkada aynı çerçeve iki kez.** Değişiklikten sonra h4'te „Meine Adresse ist neu.“ ile „Meine Telefonnummer ist neu.“ art arda aynı kalıp (eski cümle „Ich habe eine neue Adresse.“ ile ikisi ayrıydı). Dil hatası değil; bilinen çerçeveye yeni ad koymak pekiştirme de sayılır. Ayrışsın istenirse kt'de TAMAM veren bir seçenek: „Meine Adresse ist neu, Frau Huber.“ (halkanın sahnesi Huber Hanım'la resepsiyonda). Değiştirmedim.
4. **Lex'e not (kapsam dışı).** `lx:zweiter` kartının Türkçesi yalnız „ikinci“; `lx:erster`, `lx:dritter`, `lx:vierter` „ayın biri / üçü / dördü“ anlamını da veriyor. Kalıp „ayın ikisi“ dediği için kart da aynı karşılığı taşımalı.

## Sonuç

Bulgu: **1 / 3 madde** (kabul listesi: 1 anlamı eksik varyant çıkarıldı, yerine 1 eksik doğru varyant kondu). Almanca dilbilgisi hatası 0, Türkçe hatası 0. İki denetim temiz.

- Madde 1: **KAPANDI**.
- Madde 3: **KAPANDI** (düzeltildi).
- Madde 2: sözcük, çekim ve Türkçe **doğru**; **büyük harf kararı AÇIK** (1. şüphe). Engel sayılıp sayılmayacağı İÇ/PM'in kararı: cevabı ve konuşmayı etkilemiyor, yalnız ekrandaki yazımı etkiliyor ve 6.–7. günün eski satırlarıyla birlikte çözülmeli.

Dosyaların üst düzey `review` alanına dokunulmadı (kapsam yalnız 3 madde; iki dosya da „draft“). Sıradaki: örneklem kontrolü.

Kaynak (yazım): Duden çevrimiçi, „achte“ ve „erste“ maddeleri (https://www.duden.de/rechtschreibung/achte, https://www.duden.de/rechtschreibung/erste).

## Ek tur (2026-11-22): büyük harf kararı ve yeni Adresse listesi

İÇ, 1. şüphe üzerine kararı verdi ve 6.–7. gün `halkalar` bölümlerinde uyguladı: tek başına duran sıra sayısı (ayın günü) büyük; ardından ad gelen („am zweiten Mai“) ya da aynı cümlede bir ada bağlanan („Das Datum ist der vierte Mai, nicht der erste.“) küçük. Ayrıca **Ich hab …** kabul satırını geri aldı (halka denetçisi kabul satırında eşlenmeyen sözcük istemiyor). Yukarıdaki „Son hâl“ ve 2. şüphe eski metni anlatır; geçerli olan bu bölümdür. Bakılan: yalnız `halkalar`.

**1. Büyük/küçük harf: bulgu 0.** İki dosyanın `halkalar` bölümünde sıra sayısı geçen bütün metinler tek tek okundu (6. gün 43 metin, 7. gün 18 metin; yalnız **der/am** ile başlayanlar değil, bütün biçimler).
- Büyük ve doğru (tek başına): kalıp „der Erste – der Zweite – der Dritte – der Vierte“; „Der Erste? Nein, der Zweite!“, „Heute ist der Dritte, nicht der Zweite.“, „Am Vierten? Nein, am Dritten!“ ve üçünün bütün kabul satırları; sahne „Am Dritten? Heute ist der Zweite!“; 7. gün „Ich kann am Dritten nicht kommen.“, „Ich verstehe nicht. Am Dritten oder am Vierten?“, „Am Vierten? Können Sie das Datum wiederholen?“ ve kabul satırları; sahne „Am Vierten. Um Viertel nach zehn.“.
- Küçük ve doğru (ad geliyor ya da aynı cümlede ada bağlı): „Heute ist der erste Mai.“ (iki yerde), „am ersten Mai – am zweiten … – am dritten … – am vierten …“ (yuva = ay adı), „Das Datum ist der vierte Mai, nicht der erste.“ ve „Das Datum ist nicht der erste, sondern der vierte Mai.“ (ikincisinde ad arkadan geliyor; kural aynı), „der erste / vierte Dezember“, „am ersten / zweiten / dritten / vierten Mai, Dezember“li bütün satırlar.
- Yanlış büyütülen ya da küçük kalan yok. Türkçeler değişmemiş ve hâlâ doğru.
- **7. günün bağlamı:** üç görev cümlesi bağlamsız gösteriliyor, Türkçeleri „ayın üçünde / dördünde“: büyük harf doğru. Sahnede Huber Hanım önce „Am vierten Dezember …“ diyor (ad var, küçük), öğrenci tekrar isteyince „Am Vierten.“ diyor: ayrı cümle, ad yok, Türkçesi „Ayın dördünde.“; büyük harf doğru. 6. gün sahnesindeki „Am Dritten?“ da aynı durum (ad başka konuşanın cümlesinde).
- Öneri dosyaları gün dosyalarıyla birebir aynı (`cikarim` alanı dışında).

**2. Adresse kabul listesi: 1 bulgu, düzeltildi.** „Ja, meine Adresse ist neu.“ Almanca olarak doğru, ama değerlendiricide ayrı bir cevap değil: `core()` baştaki **ja**'yı atıyor, satır ilk satırla aynı öze iniyor (`grading.ts`; denedim: bu cevap listede olmasa da doğru sayılıyor). Listede gerçekte iki cevap kalıyordu (D-064 yalnız sayıca tutuyordu). Türkçede „evet“ de yok.
- Önce → sonra: „Ja, meine Adresse ist neu.“ → **„Meine Adresse, die ist neu.“**
- Gerekçe: gerçekten ayrı bir cevap, anlamı aynı, konuşmada doğal (ad başta, ardından **die** ile yineleme). Aynı yapı bu halkanın onaylı kabul satırlarında var („Meine Nummer, brauchen Sie die?“). Bütün sözcükleri biliniyor.
- Son hâl: `["Meine Adresse ist neu.", "Ich habe eine neue Adresse.", "Meine Adresse, die ist neu."]` (gün dosyası ve öneri dosyası aynı).
- **Ich hab eine neue Adresse.** artık listede yok: haksız ret riski açık kalıyor (konuşmada en sık biçim; 2., 3., 5. ve 7. günün halka dışı listelerinde 27 satırda kabul ediliyor, halkalarda hiç yok). Engel dil değil, denetçi. „Benim cevabım da doğru“ yolu açık.

**Denetim (ek turdan sonra):**
- `npm run content:validate` → 0 hata, 134 uyarı.
- `halka_kontrol.py` → 6. gün 0 hata, 0 not; 7. gün 0 hata, 0 not.
- `kt.ts cumle`: 6. gün h4 (`de` ve yeni kabul satırı), 6. gün h1 (beş cümle), 7. gün h3 (dört cümle) → hepsi TAMAM.
- `kucuk_sozcuk.py` → 7. gün 0 hata; **6. gün 1 hata, 5. gün 1 hata: „kalıp sayısı > 2“** (m1:06:h1 ve m1:05:h1). İkisi de bu PR'da eklenen üçüncü kalıp satırından; ek turdaki değişikliklerle ilgisi yok, dil hatası da değil. Karar İÇ'te (kural mı gevşeyecek, satır mı birleşecek).

**Kalan (takip, dokunmadım):**
- `halkalar` dışı (gün sınavı, prova, sesler): 6. günde bağlamsız küçük harfli kabul satırları duruyor („Nein, der zweite.“, „Nein, erst der zweite.“, „Nein, der dritte ist morgen. Heute ist der zweite.“ …). İÇ takip işi olarak yazacak.
- İkiz cümle „Meine Telefonnummer ist neu.“: üçüncü kabul satırı „Ich habe eine neue Telefonnummer, ja.“ değerlendiricide ayrı bir cevap (sondaki **ja** atılmıyor), ama öğrencinin yazacağı bir şey değil. Aynı yapı orada da olur: „Meine Telefonnummer, die ist neu.“

Sonuç (ek tur): büyük harf **KAPANDI** (`halkalar` içinde); Adresse listesi **KAPANDI**. Açık kalan dil dışı tek nokta: `kucuk_sozcuk.py` kalıp sayısı.

## Son ek tur (2026-11-22): iki birleşik kalıp satırı

İÇ, „halka başına en çok 2 kalıp“ kuralı için üçüncü satırları ilk satıra kattı: m1:05:h1 „Wie spät ist es? – Es ist … Uhr. – zu spät – zu früh“ = „Saat kaç? – Saat … – fazla geç – fazla erken“ (4/4); m1:06:h1 „Welches Datum ist heute? – Heute ist der erste Mai. – der Zweite – der Dritte – der Vierte“ = „Bugünün tarihi ne? – Bugün bir mayıs. – ayın ikisi – üçü – dördü“ (5/5). Yukarıdaki bölümlerde geçen ayrı kalıp satırları eski metni anlatır; geçerli olan bu.

Bulgu: **0**, dosyalara dokunmadım. Dokuz parçanın her biri doğru Almanca, Türkçesi sırayla kendi parçasına denk düşüyor, parça sayıları eşit. Büyük/küçük harf kurala uygun: **der erste Mai** (ad geliyor) küçük, **der Zweite / Dritte / Vierte** (tek başına) büyük. İki halkada da kalıp sayısı 2; öneri dosyaları gün dosyalarıyla aynı. Denetim: `content:validate` 0 hata; `halka_kontrol.py` ve `kucuk_sozcuk.py` 5. ve 6. gün 0 hata; kalıpların taşıdığı görev cümleleri kt'de TAMAM.

İki küçük not (hata değil): (1) tek başına **der Erste** artık hiçbir kalıpta gösterilmiyor; „Der Erste? Nein, der Zweite!“ cümlesinde öğrenci onu **der Zweite**'ye bakarak çıkaracak. İstenirse aynı satıra bir parça olarak girer („… – der Erste – der Zweite – …“ = „… – ayın biri – ikisi – …“, 6/6; denemedim). (2) Her parçanın altında kendi Türkçesi duruyorsa „üçü“, „dördü“, „üçünde“, „dördünde“ tek başına kalıyor; yan yana okununca anlaşılır, ama „ayın üçü“, „ayın dördü“ … daha açık olurdu (alttaki eski satırda da aynı durum var). Sonuç: **KAPANDI**.
