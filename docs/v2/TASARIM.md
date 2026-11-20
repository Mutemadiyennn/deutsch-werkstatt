
> PM belgesi. Ana motor bunu `docs/v2/TASARIM.md` olarak depoya ekler.

---

# TASARIM: baştan tasarım şartnamesi (bilgi mimarisi, ekranlar, akışlar)

> PM belgesi. Kimlikler `TS-x`. Görsel dil DESIGN.md'de (Raute kimliği, renkler, tipografi, ikon kuralları) ve **aynen geçerlidir**. Bu belge onun üstüne **neyin nerede olduğunu** ve **her ekranın tek işini** tanımlar. Hedef görüntü: `design/TARGET2.png` (kaynak `TARGET2.html`).
> Ana cihaz: **iPhone 15 Pro Max** (proje sahibinin cihazı, 430×932). Küçük ekran kontrolü: iPhone 15. CI'a iPhone 15 Pro Max eklenir.

---

## TS-0 Tasarım ilkeleri (her ekranda geçerli)

1. **Tek iş:** Her ekranın tek bir amacı ve tek bir ana eylemi vardır.
2. **Tek gösterge:** Her ekranda yalnızca bir ilerleme göstergesi (Raute dizisi) bulunur. Saniye sayacı, "1/36" ve kronometre gösterilmez. Gerekirse yalnızca kısa bir metin kullanılır ("yaklaşık 6 dakika"). Bugün'de 100 dakika halkası, seans durumu ve 4 seans Rautesi tek gösterge grubudur; ders ekranlarının başlığındaki seans çipi dakika olarak yazılır ("Seans 2/4 · 18 dk"), ilerleme göstergesi sayılmaz (#58 A6).
3. **Ses önce:** Konuşma içeren ekranlarda ana eylem "Sesli söyle"dir. Yazmak ikincil bir seçenektir. Umlaut satırı yalnızca yazma açıkken görünür.
4. **Dünya içinde:** İçerik öğrenciye mümkün olduğunca köyün ve telefonun içinden gelir (sesli mesaj, mektup, kafe, radyo). Ders listesi hissi verilmez.
5. **Sakin ama canlı:** Zemin sakin (papier) olur. Canlılığı mekân aksanları, sahne illüstrasyonları, günün saatine göre değişen gök şeridi ve tek kutlama anı verir.
6. **Kaydırmasız:** Ders ekranları tek ekrana sığar (PM-008). Liste ekranları (Yol, Köy, Ben) kayabilir.
7. **Çevrimdışı dürüstlük:** İnternet yokken hiçbir ekran bozulmaz. Yalnızca bulut gerektiren bir ek özellik varsa üzerinde küçük bir "çevrimiçi olunca" notu görünür.

---

## TS-1 Bilgi mimarisi

```
Alt sekmeler (4):   Bugün      Yol        Köy        Ben
                      │         │          │          │
                      │         │          │          └ Yapabiliyorum · Kelime haritam · Sesli günlüğüm
                      │         │          │            Koleksiyonlar · Haftalık özet · Ayarlar
                      │         │          └ Köy haritası: 9 kolun mekânları + Telefon + Posta kutusu
                      │         └ Seviye seviye ana yol (A1 … C2), üniteler, kapılar
                      └ Bugünün yolu: tek düğme "Devam et" + gelen kutusu satırı + yarının merakı

Tam ekran akışlar (sekmesiz):  Ders oynatıcısı · Tekrar · Gelen arama · Mola · Araba modu
                                Seviye kontrolü · Flashback · Hasta modu · Gerçek görev öncesi/sonrası
```

- **Bugün:** "Şimdi ne yapayım?" sorusunun tek cevabı.
- **Yol:** "Neredeyim, nereye gidiyorum?"
- **Köy:** Kollar: "Canım şunu istiyor." Planın dışında, keşif ve bonus.
- **Ben:** "Ne kazandım?" Kanıt ve kişisel ayarlar.

**Telefon** (sesli mesajlar, aramalar, mesaj grupları, akış) ve **Posta kutusu**, hem Bugün'deki gelen kutusu satırından hem de Köy'den açılır.

---

## TS-2 Ekran envanteri

Her ekran için: amaç, tek ana eylem, tek gösterge, durumlar.

### Sekmeler
| Ekran | Amaç | Ana eylem | Gösterge | Durumlar |
|---|---|---|---|---|
| **Bugün** | Günün planını tek dokunuşla başlatmak | "Devam et" (sıradaki etkinliğin adıyla, ör. "Devam et: Kafede sohbet"); süre bu dokunuşla başlar (#58 A6) | 100 dakika halkası + "Seans x/4" + kalan süre + 4 seans Rautesi (tek gösterge grubu) | İlk gün, normal, flashback (2+ gün ara), hasta modu, gün bitti ("Yarın: dedektif tanıkla konuşacak"), çevrimdışı |
| **Yol** | Ana yolda yer görmek | Açık ünitenin "Devam" düğmesi | Seviyenin üniteleri Raute yolu olarak | Kilitli ünite: tek cümle neden + tek dokunuşla eksik yere gidiş (OD-5) |
| **Ünite** | Ünitenin hedefi ve adımları | "Devam" | Ünitenin adımları | "Yapabiliyorum" hedefleri yazıyla; kanıt durumu üç simgeyle |
| **Köy** | Kolları keşfetmek | Bir mekâna dokunmak | Yok (harita; yalnızca mekânların üzerindeki Raute rozetleri) | Kilitli mekân soluk ve seviyesi yazılı; yeni içerik varsa ışıklı pencere |
| **Ben** | Kanıt ve ayarlar | — | Seviyenin "yapabiliyorum" Rautesi | Haftalık özet paylaşma, sesli günlük karşılaştırması |

### Kol ve kanal ekranları
| Ekran | Amaç | Ana eylem | Not |
|---|---|---|---|
| **Telefon: Sesli mesajlar** | Karakter mesajlarını dinlemek ve sesli cevap vermek | "Sesli cevap ver" | Mesaj balonu dalga biçimli; "Yavaş" yazılı düğme; okunmamış rozetleri |
| **Telefon: Akış** | Köy sakinlerinin paylaşımları | "Yorum yaz / söyle" | IE-2 #4; pastiş, kısa |
| **Telefon: Mesaj grupları** | Grup yazışmasını anlamak ve cevaplamak | "Cevapla" | Kısaltmalar dokununca açıklanır |
| **Posta kutusu** | Mektubu anlamak ve ne yapılacağına karar vermek | "Ne istiyorlar?" → görev | Mektup kâğıt görünümünde; son tarih vurgulu; "Takvime ekle" |
| **Kafe (Sohbet Saati)** | Karakterle serbest konuşmak | "Konuşmaya başla" | Çevrimdışında dallanan diyalog; çevrimiçinde daha esnek |
| **Radyo (Kulak Salonu)** | Dinleme oyunları ve bülten | "Dinle" | Gürültü düzeyi bir zorluk düğmesi |
| **Kütüphane, Gazete bayisi** | Okuma ve haber | "Oku" | Metin kâğıt gibi; dokununca kelime kartı |
| **Atölye (Gramer)** | Köprü dersleri ve hata onarımı | "Başla" | Kısa (2–5 dk) |
| **Bahçe (Kelime)** | Tekrar ve "duyduğum kelime" | "Tekrar et" / "Kelime ekle" | Fotoğraf + cümle; yanlışta başka cümle ve başka fotoğraf |
| **Sinema (Gerçek Medya)** | Bağlantı + ön öğretim + izleyince anlat | "Hazırlan" | Dış bağlantı açıkça işaretli |
| **Tiyatro (Hikâye)** | Sesli drama, dedektif, kendi yolunu seç | "Bölümü aç" | Bölüm sonu askıda kalış |
| **Pazar meydanı (Gerçek Görevler)** | Dışarıda yapılacak görev | "Prova et" → "Yaptım, anlatayım" | 100 XP; "gerçek hayatta yapıldı" damgası |

### Tam ekran akışlar
| Ekran | Kural |
|---|---|
| **Ders oynatıcısı** | Üstte "geri", etkinliğin ilerlemesi ve seans çipi. Ortada Almanca ifade en büyük öğe, altında Türkçe. Altta "Sesli söyle" (64 px). İkincil: "Yazarak", "Bilmiyorum". Seans çipi kalan dakikayı gösterir ("Seans 2/4 · 18 dk", #58 A6); saniye sayacı yok. OD-2 adımları ve LS kurma merdiveni aynı bileşenlerle kurulur. |
| **Geri bildirim** | Doğru: Raute dolar + kısa ses + hafif titreşim. Hata: en önemli tek hata, doğru biçim, Türkçe tek cümle, "Bir daha söyle" (ikinci deneme). |
| **Mola** | Kalan süre dakika olarak görünür (saniye sayacı yok). Mekâna uygun sakin illüstrasyon, "Kalk, biraz yürü." Mola başında ve sonunda zil ve titreşim; telefon kilitliyken iPhone kabuğunda yerel bildirim. Süre duvar saatiyle hesaplanır: kilit ya da arka plan molayı uzatmaz. Öğrenme ekranındayken mola kartı ekranı kaplar. "Molayı atla" ikincil. |
| **Gelen arama** | Her zaman koyu. Arayan karakterin avatarı. "Aç / Reddet." Aramadan sonra kısa değerlendirme. |
| **Araba modu** | Ekrana bakmadan: büyük tek düğme, sesli yönerge, otomatik ilerleme. Ekranda yalnızca "Duraklat". |
| **Flashback** | "Sen yokken köyde…" sesli özeti, ardından hızlı hatırlama, ardından kesin başarı (BY-6). |
| **Hasta modu** | Tek kart, tek düğme, yalnızca dinleme. Sıcak, sakin ton. |
| **Seviye kontrolü / ara kontrol** | Hikâye kılığında. "Sınav" kelimesi yalnızca seviye sınavı provasında geçer. Sonunda yüzde değil, "yapabiliyorum" sonuçları gösterilir. |
| **İlk 10 dakika** | LS-2: İlk cümle ≤ 60 sn, ≤ 5 dk oyun gibi yerleştirme, 60 sn "kendini anlat" kaydı, köye ilk adım, ardından ilk seans. |

---

## TS-3 Bileşen kütüphanesi (yeniden)

Bütün ekranlar yalnızca şu bileşenlerle kurulur (`web/src/ui`):
- `Raute`, `RauteRow`
- `SkyBand` (günün saatine göre gök şeridi)
- `PrimaryAction`, `SecondaryAction`
- `PhraseCard` (Almanca büyük + Türkçe anlam + dinle + yavaş; açıklama OD-9 yapısıyla: kelime kelime çipler görünür, ipucu "Neden böyle?" ile açılır)
- `AlltagPanel`
- `MicButton` (durumlar: hazır / dinliyor / işliyor / izin yok)
- `VoiceBubble` (sesli mesaj)
- `LetterSheet` (mektup)
- `FeedPost`
- `ChatBubble`
- `PlaceTile` (Köy mekânı, aksan renkli)
- `UnitNode` (Yol)
- `CanDoRow`
- `EvidenceDots` (K düzeyi: anlıyorum / söyleyebiliyorum / kendiliğimden kullanıyorum)
- `CallScreen`
- `EmptyState`: her zaman bir eylemle biter, asla "0" kutularıyla değil
- `OfflineNote`
- `Icon`: tek çizgi ikon seti (Lucide ISC); emoji yok

---

## TS-4 Ölçülebilir kabul ölçütleri

1. **TARGET2.png'deki ekranlar** (Bugün, Yol, Köy, Telefon sesli mesaj, Posta kutusu, Ders oynatıcısı) iPhone 15 Pro Max ve iPhone 15 boyutunda, açık ve koyu temada bu belgeye uygun.
2. **Otomatik kontroller** (e2e testine eklenir, her ekran için):
   - Emoji karakter sayısı 0
   - Görünür ilerleme göstergesi sayısı ≤ 1 (`data-progress` işaretli öğeler sayılır)
   - Görünür saniye biçimli metin yok (`\d{1,2}:\d{2}` deseni sayaç olarak kullanılamaz)
   - Ana eylem ≥ 56 px ve başparmak bölgesinde
   - Ders ekranlarında yatay ve dikey taşma yok (%130 yazı boyutunda dahil)
3. **Bilgi mimarisi:** 4 sekme. Köy'de 9 kol mekânı + Telefon + Posta kutusu. Kilitli mekânda neden ve seviye yazılı.
4. **Boş durumlar:** Hiçbir ekran yalnızca "0" ya da "henüz yok" ile bitmez. Her boş durumun bir eylemi vardır.
5. **Uçak modu:** Bütün sekmeler ve tam ekran akışlar çevrimdışı açılır (BY-12).
6. **Görsel regresyon tabanı:** Yeni tasarım uygulandıktan sonra CI'daki WebKit çıktısından yeniden üretilir.
7. **Yerleşim kuralları** (PM 7015070303, #104 notu; e2e `tests/e2e/v2_yerlesim.py`, Bugün · Görevler · Odak, iki tema):
   - **Y1** Bir ekranda en çok 1 birincil düğme. Bugün'ün ana eylemi yoldaki sıradaki düğümdür.
   - **Y2** Bir ekranda en çok 3 ana blok (ör. Bugün: yol, görev şeridi, gün sonu).
   - **Y3** Ana bloklar arası ≥ 24 px; liste satırları arası ≥ 12 px.
   - **Y4** Dokunulabilir kutular birbirine değmez ve kesişmez (iç içe olanlar hariç).
   - **Y5** Aynı metin (≥ 12 karakter) aynı birimde iki kez görünmez. Yol günleri gibi eş birimler kendi içinde sayılır; düğüm adı gün başlığıyla aynıysa türün adı yazılır.
   - **Y6** Gövde paragrafı en çok 2 satır. Uzun açıklama "?" düğmesinin arkasında açılır.

---

## TS-5 Uygulama sırası (R1 içinde)

1. Tasarım belirteçleri ve bileşenler (TS-3); eski ekranlar bu bileşenlere taşınır. Emoji, çoklu gösterge ve saniye kaldırılır. **Hızlı ve görünür kazanç.**
2. Yeni gezinme: 4 sekme. Bugün ekranı yeniden; Yol (mevcut senaryolar ünite olarak); Ben.
3. Ders oynatıcısının yeni düzeni, önce ses (TS-2).
4. Köy haritası: Bahçe, Atölye ve Kafe ilk mekânlar. Telefon: sesli mesajlar. Posta kutusu: ilk 3 mektup.
5. Mola, flashback, hasta modu, gelen arama (kademe 1).
6. Geri kalan mekânlar R2–R3'te, içerik hattıyla birlikte açılır. Kilitli görünürler; seviyeleri ve açılış koşulları yazılıdır.


---

## Ek: hedef ekranlar
Kaynak: `docs/v2/design/TARGET2.html` (Playwright ile 2900×1100 görüntülenir → `docs/v2/design/TARGET2.png`).

**Hedef 3 (proje sahibi onayı, 20.11; PM 7041982489):** `docs/v2/design/TARGET3.html` → `TARGET3.png` (2900×1100). TARGET2'nin yerine geçmez, üstüne gelir: aynı görsel dil, sekmeler (Bugün, Yol, Köy, Ben), video ekranı ve gün sonu. Yeni iş bu sayfaya bakarak yapılır ("üstüne koya koya devam").

**Hedef 3b (Halka ekranları; PM 7042589346, AKIS.md AK-12 K7):** `docs/v2/design/TARGET3b.html` → `TARGET3b.png` (2832×1047; stil TARGET3.html'in ilk bloğu). Altı ekran: Bugün (seans ve duraklar) · Halka: yeni kelime · resimden seç · eşleştir · mini sahne · halka sonu. Arayüzde kavramın adı **seans**tır (PM 7043484702). AK-10'un 3. ve 4. adımı (yeni soru türleri, durak oynatıcısı) için kabul ölçütü bu sayfadır.

**Hedef 3c (PM-079 çizim borcunun ilk partisi; PM 7046512137, kaynak #30 yorum 7046511599):** `docs/v2/design/TARGET3c.html` → `TARGET3c.png` (2832×1047; stil TARGET3.html'in ilk bloğu). Altı ekran: Halka: yeni kalıp (çift kalıp + tek cümlelik kural) · cümleyi kur (yapboz; **K10:** çerçeve sözcüğü ilk iki görüşünde altında soluk Türkçesiyle; taşlarda noktalama yok; yanıltıcı taş en çok 1) · sen söyle (büyük mikrofon, "Duyduğum" kartı, ilk tepki süresi: soru sesinin bittiği andan konuşmanın başladığı ana; hedef çizgisi 2 sn, yalnız bilgi, ceza yok, ölçüm yerelde) · gün sonu: kendini dene (dikte, ä ö ü ß satırı, "geçme kalma yok") · Yol (seviye şeridi, hafta kartı, yedi gün Raute, kilitli hafta sonu sınaması) · Köy: Bahçe, tekrar yokken (boş hâl, üç sayı, "Duyduğum kelimeyi ekle"; tam ekran mekân, sekme yok). Metinler örnektir. AK-10'un 4. adımında kalıp durağı ve K10 gösterimi için kabul ölçütü bu sayfadır (PM-079 md. 1b).
