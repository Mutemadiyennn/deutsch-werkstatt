# 5. gün halkaları: yazar notu (PM-078 B; hazır tanımı #12 7049786377; PM 7049695521 F2; PM-080 §3–§4)

Dosya: `gun-05-halkalar.json`. 25 kart, 5 halka, **50 görev cümlesi** (her kartta tam 2; her birinde ≥3 öğeli `accepted`, ilki `de`), 10 kalıp, 5 mini sahne (17 satır, 5 soru; 3'ü `cikarim: true`).

Bilinen küme:
- 1.–4. günün kartları ve dersleri (r0-01, r0-02, r0-11, r0-03, r0-04; bileşik sayılar artık bilinir);
- 1.–4. günün halka kalıpları (`gun-04-halkalar.json` dahil: „Das ist zu …“, „noch …“, „Ich bin …“).

Günün dersi (r0-05) varsayılmadı. „Wie spät ist es?“, „halb“, „Viertel nach/vor“, „am Vormittag … in der Nacht“, „heute Abend“, „morgen früh“ halkada kalıpla tanıtılıyor.

## Gruplama

| Halka | Kartlar (sırayla) | Kalıplar | Sahne |
|---|---|---|---|
| h1 Saat kaç? Kaç saat? | Uhr, spät, Stunde, Minute, früh | „Wie spät ist es? – Es ist … Uhr.“ (Saat kaç? – Saat …); „vier Uhr – vier Stunden“ (saat dört – dört saat) | İş yeri, Tobi saati soruyor (**çıkarım**: iş kaçta bitiyor?) |
| h2 Buçuk ve çeyrek: halb zehn tuzağı | halb, Viertel, also, schon, nur | „halb zehn = neun Uhr dreißig“; „Viertel nach neun – Viertel vor zehn“ | Telefon, Huber Hanım: „um halb zehn!“ (**çıkarım**: 9:30) |
| h3 Sabahtan geceye | Vormittag, Mittag, Nachmittag, Abend, Nacht | „am Vormittag – am Abend – in der Nacht“; „heute Abend – morgen früh“ | İş yeri, Wimmer Bey görüşme saati arıyor |
| h4 Randevu saati uyuyor mu? | Termin, Uhrzeit, passen#2, leider, Arzt | „Passt Ihnen …? – … passt leider nicht.“; „die Uhrzeit – Um wie viel Uhr?“ (saati – Saat kaçta?) | Telefon, Huber Hanım saat öneriyor; salı olmuyor, perşembe 16:00 |
| h5 Doktor yine burada | kommen, wieder, da, dann, gern | „Ist … da? – … ist wieder da.“; „Dann bis …!“ | Telefon, Huber Hanım: Dr. Weber perşembe dönüyor (**çıkarım**) |

Gerekçe:
- **„saat“ üç Almancaya gidiyordu.** `Uhr`, `Stunde` ve `Uhrzeit`in üçünün de Türkçesi „saat“. Okur ayrımı ancak Türkçe sıradan görebilir: „saat dört“ = **vier Uhr**, „dört saat“ = **vier Stunden**, „saati“ (sayısız) = **die Uhrzeit**. Bu yüzden `Stunde` ve `Minute` h1'e alındı ve h1'in ikinci kalıbı tam bu karşıtlık; `Uhrzeit` h4'te kendi kalıbıyla („saati – Saat kaçta?“). Türkçe cümleler bu üç biçime sadık.
- **halb tuzağı h2'de, sonra her yerde.** Günün başlığı. h2 kalıbı ve sahnesi; h5 „Sekiz buçukta geliyorum“ (halb neun) tuzağı bir kez daha soruyor. h2'nin çıkarım sorusu kalıbı değil kulağı ölçüyor: sahnede „neun Uhr dreißig“ hiç söylenmiyor.
- **„zu früh / zu spät“ ayrı kalıp değil.** 4. günün „Das ist zu teuer“ kalıbı „das ist zu“ dizisini öğretti; bu gün yalnızca o biçimle („Das ist zu früh/spät.“). Kalıp yeri saat karşıtlığına kaldı.
- **Randevu doğrulama (h4–h5):** Termin, passt, leider, also, dann, gern, schon. „schon“ h2'de saatle („Es ist schon halb zehn!“, „Es ist schon spät“).

## Muayenehane ve WORLD ile tutarlılık

5. günün okuma metni: pazartesi–cuma 8–12; salı ve perşembe 15–18; çarşamba yalnız öğleden önce; cuma 12'ye kadar. Halkalardaki her saat buna uyuyor: pazartesi 8, salı 15:15 ve perşembe 16:00 (öğleden sonra), „çarşamba yalnızca dört saat“, „bugün öğlen kapalı“, „akşam çok geç“. h5: 5. günün sesli mesajıyla aynı olgu (Dr. Weber perşembe günü yine burada, perşembe 10:15). Sekreter Huber Hanım (WORLD); Tobi `du`, Wimmer ve Huber `Sie`. Tobi'nin sahnesinde öğrencinin adı yer tutucu (`{name}`). Bairisch yok („Passt scho“ kullanılmadı).

## Aralıklı karşılaşma

Önceki günlerin kartını taşıyan görev cümlesi sayısı: h1 9, h2 9, h3 8, h4 10, h5 10. Bilerek geri gelenler:
- **4. günden:** `noch` („Noch zehn Minuten“, „Es ist noch früh“), „Das ist zu …“, „Das ist nicht …“;
- **3. günden:** `um …`, sayılar, „nicht …, sondern …“;
- **2. günden:** „mein …“, „Wann …?“, „von … bis …“, `offen`;
- **1. günden:** gün adları, „am … (günü)“, „Geht …? – … geht nicht“, „Bis …!“, `Praxis`, `geschlossen`.

## Sahneler ve sorular

| Halka | Olgu | Soru (cevap) |
|---|---|---|
| h1 | saat dört + „iki saat daha“ | Tobi'ye göre iş saat kaçta bitiyor? (18:00; **çıkarım**) |
| h2 | „halb zehn“ (gün başlığı) | Yarın muayenehanede saat kaçta olmalısın? (9:30; **çıkarım**) |
| h3 | Wimmer: öğleden sonra olmuyor → yarın sabah | Wimmer Bey'le ne zaman görüşeceksin? (Yarın sabah sekizde) |
| h4 | salı 15:15 uymuyor → perşembe 16:00 | Randevu ne zaman? (Perşembe 16:00) |
| h5 | 5. gün sesli mesajı | Bugün Dr. Weber muayenehanede mi? (Hayır, perşembe dönüyor; **çıkarım**) |

## Okur gözüyle sınama (yalnızca kartlar ve kalıplarla)

Her Türkçeyi kendim çevirdim. Çıkan cümle her satırda kabul listesinde. Kararlar:
- „Saat yedi“ → **Es ist sieben Uhr** (h1 kalıbı); „saat dokuzda“ → **um neun (Uhr)**: 3. günün `um`'u ile Uhr'suz biçim de listede.
- „Saat on mu?“ hem önerilen saat hem şimdiki saat olabilir: **Zehn Uhr?** ve **Es ist zehn Uhr?** ikisi de listede.
- „dört saat“ → **vier Stunden**; „saat üç mü, üç saat mi?“ karşıtlığı kalıbın kendisi.
- „Saat çoktan dokuz buçuk olmuş“ → **schon** (kartın Türkçesi „çoktan“); „Artık geç oldu“ → **Es ist schon spät** („artık“ da kartta). İlk taslakta „Saat geç mi oldu?“ satırı `schon`u Türkçede göstermiyordu, değişti.
- „Daha saat erken“ → **Es ist noch früh** (`noch` = „daha“, 4. gün).
- „Bu akşam / bu gece / bugün öğlen“ → **heute Abend / heute Nacht / heute Mittag** (h3 kalıbı); „akşam / gece / öğleden önce“ → **am Abend / in der Nacht / am Vormittag**. „bugün öğleden önce“ için **heute Vormittag** de **heute am Vormittag** da listede.
- „Pazartesi saat sekizde size uyar mı?“ → **Passt Ihnen Montag um acht?** (günü yok → `am` yok; 1. günün kuralı).
- „Perşembe uyar ama cuma uymuyor“ → **…, aber Freitag passt nicht** (2. günün „Oktober geht, November geht nicht“ dersi) listede.
- „Sekiz buçukta geliyorum“ → **Ich komme um halb neun** ya da **Um halb neun komme ich** (ikisi de listede; `komme` 2. günün dersinin tablosundan).
- „Ben saat sekizde oradayım“ → **Ich bin um acht da**. Türkçe „Ben“ ile başlıyor; „Um acht bin ich da“ betikte kurulamıyor (`bin` yalnız „ich bin“ dizisinde).

## PM-080 §4: anlam kayması işaretleri

- **am** + günün bölümü („am Vormittag, am Abend“): 2. günde „… günü“ idi, Türkçede ek yok. h3 kalıbıyla öğretiliyor.
- **in der** + `Nacht`: 3. günde „(sokak adıyla)“ idi; şimdi zaman. h3 kalıbında açık.
- **nach / vor** („geçe / kala“): yeni çerçeve sözcükleri, h2 kalıbında. Sözlükteki Türkçe („bir yere doğru, sonra“ / „önünde, önce“) bu anlamı göstermiyor (lex isteği 2).
- **es** („Es ist … Uhr“): h1 kalıbı. 3. günün „geht es“iyle aynı iş.
- **Ihnen** (size): h4 kalıbında. **mir** (bana) bir kez, h4 „Die Uhrzeit passt mir“ (K10, tek geçen).
- **um wie viel Uhr**: `wie viel` 6. günün kartı; yalnız kalıbın bütünü içinde.
- **da**: kartın kendisi; „burada/orada“. **hier** kullanılmadı.
- #177'nin kaymaları („Null am Anfang?“, „im Büro“) tekrarlanmadı.

## Denetim

`python3 docs/v2/reviews/c-olcum/halka_kontrol.py . docs/v2/reviews/halka/gun-05-halkalar.json` → **0 hata, 0 not**.

`python3 docs/v2/reviews/c-olcum/kucuk_sozcuk.py . docs/v2/reviews/halka/gun-05-halkalar.json` → **0 hata** (kalıp 2/2/2/2/2).

Ek denetim (betik dışı; `content/v2/**`, 1.–4. gün halkaları; büyük harf ve noktalama yok sayılarak): depoda aynısı olan görev cümlesi ve sahne satırı yok; dosya içinde tekrar yok; aynı Türkçe iki Almancaya gitmiyor; kabul listelerinde yalnız noktalaması farklı öğe yok. İlk taslakta depoda aynısı bulunan üç satır („Um zehn Uhr?“, „Heute geht es leider nicht.“, „Ja, das passt. Danke!“) değişti; h3 sahnesindeki bilinmeyen `gut` → `okay`.

## Süre tahmini

5 halka × ≈8,5 dk = 43 dk; ısınma 5; ses durağı 4; dil (r0-05: tablo, kalan alıştırmalar, diyalog, dinleme) 12; video 6; prova 6; okuma 6; gün sonu 8 → **≈ 90 dk** (85–105 içinde). Taşan küçük sözcük yok.

## Varsayımlar (açık PM kararları gelmedi)

- **zwo** hiç kullanılmadı.
- **(b) kuralı birikimli:** „önceki günlerin kartı“ = 1.–4. günün `yeni_kartlar`ı.

## PM'e sorular

1. **`kommen` iki günde (3. günün 3. sorusunun eşi):** r0-11 (2. günün dersi) `lx:kommen`'i öğretiyor; kart 5. günde. Betik `komme/kommt`u bu yüzden zaten biliyor ve `kommen`'i „önceki günün kartı“ sayıyor. Ben kartın kendi halkasında (h5) kullandım; h4'teki „Der Arzt kommt …“ dersten biliniyor.
2. **„am Mittag“:** doğal olan „mittags / über Mittag“; ikisi de küme dışı. Görev cümlesinde yalnız „heute Mittag“ ve „Bis Mittag“ var; „am Mittag“ yalnız kalıp örüntüsünden çıkarılabilir. Dilbilimci görsün.
3. **„Luka … Sie“ / „Ioana … du“:** 4. ve 5. günde ön adla „Sie“ (Luka, gün 4 sahnesindeki Brandl–Ioana gibi). WORLD'de Luka için hitap yazılı değil; karar istenir.

## Lex'e istekler

1. `lx:Uhrzeit`: Türkçesi yalnız „saat“; `lx:Uhr` ile aynı. Öneri: „saat (vakit), zaman“.
2. `lx:nach`, `lx:vor`: Türkçesine saat anlamı eklensin („… geçe“, „… kala“).

## Sonraki adım

dilbilimci → okur (OD-9). Yazar bu dosyaya artık dokunmaz.
