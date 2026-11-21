# AKIŞ — günün dizilişi: "Halka" planlayıcısı (tasarım notu)

PM-078 B ve C (issue #12, 7041888211); PM kararları #160 7042498589, 7042589346, 7043401257, 7043484702, 7043527096 işlendi (AK-12). **Kod yok; AK-10'un 1. adımı (şema + küme + sayaç) başlayabilir, 2. adım bu notun finalinden sonra.** Kural kimlikleri: AK-x. Bağlı belgeler: LEARNING_SYSTEM §1, §5–§7; OGRETIM_DONGUSU OD-1, OD-5, OD-7; BEYIN BY-2, BY-9, BY-12; MIMARI MM-1–MM-4; `design/TARGET3.html`.

Tek soru: **"Bu, öğrenciyi dışarıda konuşmaya yaklaştırıyor mu, ve yarın uygulamayı yeniden açmak istemesini sağlıyor mu?"** Değişen yalnızca **dizen katman**. Kart, cümle, ders, klip, soru bileşenleri ve FSRS aynen kalır.

---

## AK-0 Teşhis (bugünkü kod)

| Bugün | Nerede | Sonuç |
|---|---|---|
| Gün = sabit bloklar: 25 yeni kart arka arkaya → ders → sesler → prova → okuma → sınav | `content/v2/m1/gun-NN.json`, `core/gun.ts` `gunAdimlari` | "Sürekli tek kelime" duygusu. Kelime ile cümle aynı oturumda buluşmuyor. |
| Bahçe turu: 8–12 soru, tür seçimi kart başına (`availableTypes`, `pickType`) | `core/garden.ts` `buildRound` | Tür kartın yoluna göre seçiliyor; halka ve kip dönüşü yok. |
| Ders: tanıt → hatırla → tablo → anla → kur → söyle → dinle → görev | `core/ders.ts` | İyi bir dil noktası; ama günün kelimeleriyle örülmüyor (B5 bunu yalnızca tekrarı keserek düzeltti). |
| İlerleme anahtarları: `m1:bahce:<g>`, `ders:<id>`, `m1:medya:<id>`, `m1:prova:<g>`, `m1:okuma:<g>`, `m1:gun:<g>` | `services/ilerleme.ts` | Yol ve Bugün bunlardan okuyor. Akış bunları da yazmalı (AK-6). |

## AK-1 Model: gün → durak → adım

```
GunPlani  { gun, surum, tohum, duraklar: Durak[], neden: string[] }
Durak     { id, tur: "isinma" | "halka" | "dil" | "video" | "prova" | "okuma" | "gunsonu",
            title_tr, tahmini_dk (5–9), adimlar: Adim[], eski_anahtar?: string }
Adim      { id, tur: AdimTuru, kartlar: string[], cumle?: string, kip: "gor" | "duy" | "kur" | "soyle",
            kaynak: "bahce" | "ders" | "klip" | "halka" }
AdimTuru  = "tanit" | QType (listen_meaning, article, colloc, photo_say, tr_de, gap, sep_perfekt)
          | "order" (yapboz) | "dikte" | "soyle" | "resimden_sec" (yeni) | "eslestir" (yeni) | "sahne"
```

- **Gün = 4 seans × ≈25 dk = ≈100 dk** (K1; YOL_HARITASI "günde 100 dakika, 4 × 25"). `Durak.seans: 1..4`; plan `toplam_dk` verir. Her seans **karışıktır** (kelime + yapı + beceri). Örnek (25 kart = 5 halka, 11–12 durak): ① ısınma · ses · halka 1 · dil-1 ② halka 2 · video · halka 3 ③ dil-2 · halka 4 · prova ④ halka 5 · okuma-yazma · gün sonu. Duraklar Yol'daki düğümlerdir; Bugün ekranı yalnız **o seansın** duraklarını gösterir (TARGET3b).
- **Arayüzde ad "seans"** (PM 7043484702): uygulamada zaten "Seans 1/4 · 25 dk" var; "oturum" yalnızca bu notta geçmez, alan adı `seans`. Bugün ekranı toplamı değil sıradakini söyler ("2. seans · sıradaki durak 7 dk"; "Sonraki seans: … Yaklaşık 25 dakika.").
- **Dil noktası** (AK-11.1 cevabı): süreye göre. Ders ≤ 9 dk ise tek durak; uzunsa iki durak. İkiye bölünürse 1. parça "tanıt + hatırla + tablo" en az bir küçük kullanımla biter (yalnız açıklamayla bitmez); 2. parça tek satırlık hatırlatmayla başlar; iki parça art arda gelmez, aralarında en az bir halka olur. Kelime ve kalıp tanıtımı dil durağında **yapılmaz** (K8, AK-12).
- `Adim.kaynak` ayrıca `"ders"` (dersin `drills` havuzu, K8) ve `AdimTuru` ayrıca `"kalip"` (kalıp tanıtımı, K8) alır. `Durak.tur` ayrıca `"ses"` (K2).
- **Video, prova, okuma** bugünkü ekranları **aynen** açar. Akış yalnızca yerini ve sırasını belirler.

## AK-2 Kelime halkası: kurallar (PM-078 B 1–6)

Halka = İÇ'in grupladığı 4–6 yeni kart (anlam ve kurulabilirlik; K8 eşiği). Her üretilen günde ve her öğrenci durumunda şu kurallar **değişmezdir** (AK-8 özellik testleri):

1. **Tanıtım:** art arda en çok 2 tanıtım (kelime **ya da kalıp**, K8), hemen ardından kullanım.
2. **Çeşitlilik (K3):** her kelime **gün içinde** ≥3 farklı türde ve ≥2 farklı cümlede geçer; bunların **en az 2'si kendi halkasında**, üçüncüsü tercihen sonraki bir durakta (aralıklı hatırlama). Süre tahmini tür başına saniye tablosundan (`akis.adim_sn`); cihazda adım süreleri yerelde ölçülür, tablo gerçek ölçümle güncellenir.
3. **Sıra:** aynı tür art arda gelmez. Kip döner: gör → duy → kur → söyle; aynı kip art arda en çok 2.
4. **Türler:** var olanlar (dinle-anlam seç, boşluk [kartın kelimesi, D-119], yapboz, TR→DE, sesli söyle, dikte) + iki yeni tür:
   - `resimden_sec`: duy/gör → 4 görselden seç. Görsel yoksa seçilmez (B4 kuralı).
   - `eslestir`: 4–6 çift, kelime ↔ anlam/görsel.
5. **Bitiş:** halka mini sahneyle biter. Kelimelerin geçtiği 2–4 satırlık diyalog ya da klip kesiti + bir anlama sorusu.
6. **Tekrar:** vadesi gelen tekrarlar ayrı blok değildir. Gün başında ≤5 dk ısınma + her halkaya 1–2 tekrar sorusu (FSRS vadesine göre). Köydeki Bahçe serbest tekrar yeri olarak kalır.

**Algoritma (deterministik, tohumlu; BY-2).** Halka için aday adımlar üretilir:
- Kart × uygun tür (`availableTypes` + iki yeni tür).
- × uygun cümle: `cumleSec` ile, AK-3 kapısından geçenler.

Ardından açgözlü bir yerleştirme yapılır. Her adımda kısıtları (1–3) bozmayan en yüksek puanlı aday seçilir. Puan:
- `+` kelimenin eksik tür ya da cümle sayısı;
- `+` kip dönüşü;
- `−` aynı kartın son 2 adımda görünmesi.

**Gevşetme sırası (K4):** kısıt sağlanamazsa önce **kip dönüşü**, sonra **tür çeşitliliği** gevşer. **Cümle kapısı (görev cümlesinde bilinmeyen 0) hiçbir zaman gevşemez**; o adım düşer. Her gevşeme derlemede rapora yazılır (kart, kural, gün); İÇ eksik cümleyi bu rapordan yazar. Plan hiçbir zaman boş ya da çözümsüz olmaz (BY-12).

## AK-3 Cümle kapısı (PM-078 C)

- **Bilinen küme K(t)** = tanıtılmış kartlar ∪ biten temel derslerin öğrettiği biçimler ∪ çerçeve kelimeleri ∪ WORLD kişi adları ∪ (sayı dersi bittiyse) sayılar.
  - Çerçeve kelimeleri: işlev sözcükleri, `card:false`. İlk geçtiği yerde dokununca Türkçesi görünür. **K5:** "bir kez görülünce bilinir" yalnız **gösterim ve yapboz** (kelime taşları verilir) için. Öğrencinin kendisinin yazdığı ya da söylediği adımlarda (TR→DE, dikte, söyle) cümledeki her çerçeve kelimesi daha önce en az 2 adımda görülmüş olmalı (`akis.cerceve_uretim_min: 2`); yoksa o cümle yapboz olarak gelir.
- **Kelime → kart eşlemesi:** sözlüğün `de` + `forms` + çekim dizini (`core/kume.ts`, yeni, saf). Eşlenemeyen biçim **listelenir, tahmin edilmez**. Kurallar (PM 7043401257):
  - Kendi kartı olan sözcük yalnız **kendi kartı tanıtıldıysa** bilinir (başka kartın cevabında geçmesi bilinir yapmaz).
  - Kalıp **bütün olarak** bilinir; parçaları tek tek bilinir sayılmaz.
  - **İstisna (PM-080 §4, #12 7050620303):** kalıbın **kartsız** çerçeve sözcüğü (ist, war, geht, guten), kalıp öğretildikten sonra (ders ya da halka bitince) tek başına **tanınır** sayılır. Kendi kartı olan sözcük yalnız kalıbın düz hâliyle ya da kendi kartıyla bilinir. İki koşul:
    - Bu yalnız **anlamadır**; üretim için K5 (≥ 2 görme) ve Türkçesi için K10 (ilk iki görme) aynen işler.
    - Sözcük kalıbın dışında **başka anlamda** kullanılıyorsa (geht: "olur" → "gidiyor") yeni sözcük sayılır: yazar halkada notta işaretler, dilbilimci denetler. Makine bunu göremez.
  - Eşadlı ayrımı (`zu` edat / `zu` kapalı) sayaçta yoksa o sözcük "eşlenemeyen" listesine düşer, bilinir sayılmaz.
- **Görev cümlesi** (boşluk, yapboz, TR→DE, söyle, dikte): K(t) dışında kelime **0**.
- **Gösterim/dinleme cümlesi:** K(t) dışında **≤1**. O kelime işaretli, dokununca Türkçe; sorulmaz.
- `cumleSec(kart, K)` kartın 6 cümlesinden kapıdan geçeni seçer. Uymayan cümle **silinmez**; öğrenci o kelimeleri öğrenince tekrar turunda "yeni cümle" olarak açılır.
- **Doğrulayıcı** (`content:validate`, yıl boyunca; ANA): planlayıcının kendisini her gün için öğrenci adına koşturur. "Görev cümlesinde bilinmeyen > 0" → **hata**. Ayrıca kartın ilk cümlesi bağımlılık sırasını bozuyorsa → uyarı. İÇ'in ölçümü (kart başına uygun cümle sayısı, cümlesiz kartlar) aynı sayaçla üretilir.

## AK-4 Planlayıcı arayüzü (`web/src/core/akis.ts`, saf)

```ts
planGun(g: {
  gun: Gun;                         // gun-NN.json (+ yeni `halkalar` alanı, AK-5)
  dersler: Map<string, TemelDers>;  // günün dil noktası
  lex: Map<string, Lexeme>;
  items: Map<string, LearnerItem>;  // FSRS durumu (vadesi gelenler, tanıtılanlar)
  bitenDersler: Set<string>;
  politika: AkisPolitikasi;         // policy.json "akis"
  tohum: string;                    // `${gun}:${kurulumTarihi}` → aynı girdi aynı plan
  simdi: Date;
}): GunPlani
```

- **Bağımlılık:** yalnızca `@dw/shared` ve `core/` (garden.ts `availableTypes`/`esdizimler`/`boslukSecimi`, srs.ts, ders.ts). Ekran yok (MM-1).
- **Plan ne zaman kurulur:** gün açılırken bir kez kurulur ve saklanır (AK-6). İçerik sürümü değişirse yalnızca başlanmamış duraklar yeniden kurulur.
- **Neden kaydı:** her durak ve adım için tek Türkçe cümle ("Neden bu?"; BY-2).

## AK-5 İçerik şeması (ANA) ve İÇ'in işi

`gun-NN.json`'a isteğe bağlı alan: `halkalar`. Alan yoksa o gün bugünkü düzenle çalışır.

```jsonc
"halkalar": [
  { "id": "m1:01:h1", "title_tr": "Selamlaşma", "kartlar": ["lx:Hallo", "lx:Tag", "lx:Morgen", "lx:heißen", "lx:Name"],
    "gorev_cumleleri": [ { "kart": "lx:heißen", "de": "Ich heiße {name}.", "de_adsiz": "…", "tr": "…" } ],  // isteğe bağlı: kapıdan geçen ilk karşılaşma cümlesi
    "sahne": { "satirlar": [ { "r": "A", "de": "…", "tr": "…" } ], "soru": { "q_tr": "…", "opts": ["…"], "ans": 0 } } }
]
```

- **İÇ şema istekleri (hepsi kabul, PM 7043401257):** `gorev_cumleleri[].accepted` (üretimde ≥ 3, D-064) · `sahne.ortam_tr` · kart örneğinde `ilk: true` (ilk karşılaşma cümlesi kartta durur, halka kimlikle gösterir, tekrar turları da kullanır) · `card:false` kartlara kapalı `bicimler` listesi · konuşma kısaltması eşlemesi (`kisaltma`). İÇ'in `dersten_sonra` bayrağı gerekmez (sıra K(t)'den hesaplanır, K8).
- **Alan eşleme tablosu (K2)** — `gun-NN.json`'un her alanı bir durakta oynar, oynanmayan alan kalmaz:

| Alan | Durak | Not |
|---|---|---|
| `yeni_kartlar` | halka 1…5 | `halkalar` gruplarıyla; her kart ilk kullanıldığı halkanın kartıdır |
| `dersler` | halka (kelime ve kalıp `teach`, `drills`) + dil (tablo, anla/kur/söyle kalanı, diyalog, dinleme, görev) | K8 |
| `sesler` | 1. seansta ısınmadan sonra "ses" durağı (3–4 dk) | kip: duy; kelimelerden önce sesleri ayırt et (PM varsayılanı) |
| `sahne` (günün) | son halkanın mini sahnesi; prova girişine daha doğal oturuyorsa orada | ANA seçer, gerekçe `neden` kaydında |
| `gorsel` | halka adımları (`resimden_sec`, tanıtım çizimi) | görsel yoksa tür seçilmez (B4) |
| `prova` | prova durağı | aynı ekran |
| `okuma_yazma` | okuma-yazma durağı | aynı ekran |
| `gun_sinavi` | baştaki kapı + gün sonu durağının ilk 4 maddesi | AK-12 |
| `review` | ısınma + halka içi tekrar (1–2) | FSRS vadesi |
| `requires` | planlayıcı girdisi (`bitenDersler`, K(t)) | durak değil |
| `video` | video durağı | A9 |

- **Doğrulayıcı (ANA):**
  - halkalardaki kartlar = `yeni_kartlar` (eksik ve fazla yok);
  - halka başına 4–6 kart;
  - sahne satırları AK-3 gösterim kuralına uyar;
  - `_adsiz` kuralı (D-122).
- **İÇ:** (1) C ölçümü → (2) 1. gün `halkalar` önerisi → (3) eksik çıkan yere "ilk karşılaşma cümlesi". Dilbilimci + okur hattı aynen geçerli.

## AK-6 İlerleme kaydı ve geçiş

- **Yeni anahtar** `akis:<gün>` = `{ surum, plan: GunPlani, durak: number, adim: number, sonuclar: {adim, dogru}[] }`. Plan konumla birlikte saklanır (B5'teki ders planı gibi): ertesi gün yarıda kalan gün aynı planla sürer.
- **Uyumluluk:** bir durak bitince eşdeğer eski anahtar da yazılır. Böylece Yol, Bugün, XP, seri, gün sonu, `ogrenci_devam.py` ve gün sınavı değişmeden çalışır:
  - son halka → `m1:bahce:<g>`;
  - dil noktası → `ders:<id>`;
  - video → `m1:medya:<id>`;
  - prova, okuma → aynen.
- **Kart kayıtları** aynı `srs.review` ile (`source: "drill"`, `session: "akis@…"`). B5'in `bahce:gorulen` listesi halkada görülen kartları da alır.
- **Pilot bayrağı:** `policy.json` → `"akis": { "gunler": [1] }`. Yalnızca listedeki gün akışla açılır.
  - Gün içinde model değişmez: eski düzenle başlanmış bir gün eski düzenle biter.
  - Bayrak kalkınca eski düzen kodu bir sürüm daha durur (geri alma).

## AK-7 Ekranlar (yeniden kullanım)

| Durak / adım | Bileşen | Değişiklik |
|---|---|---|
| Halka adımları (tanıt, soru türleri) | `Garden.tsx` `Question` (GardenQ) + `DrillView` | Soru bileşeni dışarı alınır (`ui/soru/`), Bahçe ve Akış ortak kullanır. Davranış aynı. |
| `resimden_sec`, `eslestir` | yeni `ui/soru/ResimdenSec.tsx`, `Eslestir.tsx` | 1. gün pilotunda, TARGET3 dili, WebKit e2e. |
| Mini sahne | `Ders` `Diyalog` bileşeni | Satırlar + tek anlama sorusu. |
| Dil noktası | `DersEkrani` (adım aralığıyla) | Ders iki parçaya bölünür; ilerleme `ders:<id>` aynı. |
| Video, prova, okuma | `Medya`, `Prova`, `Okuma` | Aynı. |
| Durak oynatıcısı | yeni `screens/Akis.tsx` | İlerleme çubuğu (TARGET3), "Neden bu?", çıkış/devam. |

## AK-8 Eşikler (`policy.json` → `"akis"`, BY-9)

`durak_dk: [5, 9]` · `seans_dk: [20, 27]` · `gun_dk: [85, 105]` · `halka_kart: [4, 6]` · `sinav_gecme: 0.9` · `cerceve_uretim_min: 2` · `adim_sn: { tanit, kalip, listen_meaning, … }` (tür başına saniye; cihaz ölçümüyle güncellenir) · `tanitim_art_arda: 2` · `kelime_tur_min: 3` · `kelime_cumle_min: 2` · `kip_art_arda: 2` · `isinma_dk: 5` · `halka_tekrar: [1, 2]` · `gosterim_bilinmeyen_max: 1` · `gorev_bilinmeyen_max: 0` · `gunler: [1]`. Ayrıca PM-078 H(4): `garden.ts` sabitleri (GUCLU_GUN, DAILY_NEW, DAILY_ACTIVE, ONERI_ART_ARDA, HIZLI_SN, tur 8–12) aynı dosyaya taşınır.

## AK-9 Testler

- **Özellik testleri (vitest, tohumlu döngü):**
  - Kapsam: 7 gün × 50 tohum × 4 öğrenci durumu (sıfır, kusursuz, %30 yanlış, ara verip dönen).
  - Her planda AK-2'nin 1–6. kuralları, AK-3 kapısı ve BY-12 (boş plan yok) tutar.
  - Süre (K1): sıfır öğrencide seans 20–27 dk, gün 85–105 dk (`adim_sn` ile).
  - K8: bir kelime ya da kalıp günde bir kez tanıtılır; dil durağında kelime tanıtımı yok.
  - Aynı girdi aynı planı verir.
- **Doğrulayıcı:** görev cümlesinde bilinmeyen > 0 → hata (AK-3); `halkalar` şeması (AK-5).
- **e2e (WebKit kabul):**
  - `v2_akis.py`: 1. gün Bugün'den sona.
  - Halka içinde aynı tür art arda yok; mini sahne var; durak süresi ölçümü; yarıda bırak → aynı yer.
  - Eski anahtarlar yazılıyor; Yol ve Bugün doğru.
  - `ogrenci_devam.py` akış gününü tohumlar.
- **LS-16.3 öğrenci simülasyonu:** bilgi kısıtlı ajan 1. günü oynar. Öğretilmeyen öğeyi üretmesi istenirse P0.

## AK-10 Pilot PR zinciri (onaydan sonra; şerit sınırı içinde)

1. **Şema + küme:** `halkalar` şeması, `core/kume.ts` (K(t), kelime → kart), doğrulayıcı sayacı. (İÇ ölçümü bununla.)
2. **Planlayıcı:** `core/akis.ts` + özellik testleri + `policy.json` "akis".
3. **İki yeni tür:** `resimden_sec`, `eslestir` (TARGET3b dili, e2e; ekran kilidi: TARGET3b).
4. **Ekran:** `screens/Akis.tsx` (durak oynatıcısı), mini sahne, halka sonu, soru bileşenlerinin ortaklaşması, Yol/Bugün bağlaması (bayrak: gün 1); kabul ölçütü `design/TARGET3b.png`.
5. **e2e ve simülasyon:** `v2_akis.py`, `ogrenci_devam.py` desteği; proje sahibi telefonda dener → onay → 2.–7. gün.

## AK-11 Açık sorular (PM) — cevaplandı (#160 7042498589)

1. **Ders bölünmesi:** süreye göre (AK-1).
2. **Gün sınavı:** tek içerik, iki kapı (AK-12).
3. **Bahçe:** halkada görülen kart aynı gün Bahçede ne yeni ne tekrar gelir (AK-12).

## AK-12 Kararlar (PM, #160)

- **Gün sınavı — iki kapı, tek içerik.** Gün sonundan önce isteğe bağlı durak **yok**.
  - **Baştaki kapı ("Bu günü biliyorum, sına beni"):** günün başında ikincil bağlantı; tespit A2+ ise öne çıkar (D-116 (4)). Durak değildir; günde bir kez. Eşik `akis.sinav_gecme` (0,9). Geçerse halka durakları "sınavla geçildi", kartlar `hizliGecis` ile takvime girer; video, prova ve gün sonu kalır, ötekiler "istersen yine de yap". Geçemezse ceza ve değerlendirme yazılmaz (D-116), normal akış; sınavda **doğru üretilen** kartların yalnız tanıtım ve tanıma adımları atlanır, kur/söyle ve mini sahne kalır.
  - **Sondaki kapı (herkes):** gün sonu durağı `gun_sinavi`'nden 4 maddeyle başlar (1 dikte, 1 yazılı, 1 sesli, mini prova; ≤ 4 dk). Duvar değildir: sonuç Gün sonu ekranındaki "yapabiliyorum" kanıt noktalarını doldurur, yanlışlar yarının ısınmasına girer. Baştaki kapıdan geçen için tekrar sorulmaz.
- **Bahçe:** halkada görülen kart aynı gün Bahçede ne yeni ne tekrar gelir (halka içindeki "yanlış kart bir kez geri gelir" kuralı sürer). Tek FSRS durumu, iki giriş: halka kartları `DAILY_NEW` sayacına yazılır, çift sayım olmaz. Akış gününde Köy'deki Bahçe yalnız önceki günlerin tekrarını gösterir; tekrar yoksa tek cümle ("Bugünün kelimeleri yolda. Tekrarın yok.") ve Bugün'e dönüş.
- **K6 · Mini sahne önce sesle:** sahne önce dinlenir, metin sonra açılır. Konuşanlar WORLD karakterleri; ses Kabuk 1.5 (#164) ve B15-2 yolunu kullanır, ayrı ses yolu yazılmaz.
- **K7 · Hedef çizimler:** `design/TARGET3b.html` + `.png` (altı ekran: Bugün seans ve duraklar · yeni kelime · resimden seç · eşleştir · mini sahne · halka sonu). AK-10'un 3. ve 4. adımı bu sayfayı bekler (ekran kilidi); 1. ve 2. adım beklemez. Ekranda görünen kurallar: Bugün'de dört Raute dört seanstır, yol düğümleri o seansın duraklarıdır, toplam süre yazılmaz; yeni kelimede Almanca cümle en büyük öğe, kartın kelimesi sarı, K(t) dışındaki tek kelime altı noktalı (dokun → Türkçe, ilk üç karşılaşmada tek satır açıklama); resimden seçte soru anında Almanca metin yok; eşleştirde "Kontrol et" yok, yanlışta kısa sallanma, ceza yok, kart halkada bir kez daha gelir; halka sonunda kelime başına dört nokta (gördün, duydun, kurdun, söyledin), boş nokta "bugün sonraki duraklarda dolacak"; Filiz halka sonunda yok; "Neden bu?" her adımda sağ üstte.
- **K8 · Bir kelime ya da kalıp günde bir kez tanıtılır** (1. gün dersi 23 `teach` öğesi taşıyor, 19'u günün kartı):
  1. Dersin `lexeme` taşıyan `teach` öğesi o kartın **halkadaki tanıtım adımıdır**; açıklaması (`exp`) orada gösterilir. Dil durağında yeniden tanıtılmaz. Tek açıklama kaynağı.
  2. Kalıp `teach` öğeleri (Heute ist …, X geht / geht nicht, von … bis) **ilk kullanıldıkları halkada, parçaları bilinir olduğu anda** öğretilir (adım türü `kalip`); kural 1'e sayılır.
  3. Dersin `drills` havuzu planlayıcının üçüncü kaynağıdır (`kaynak: "ders"`): sözcükleri o anda K(t) içinde olan madde halkada adım olabilir. Dil durağına kalan: tablo + anla/kur/söyle'nin kalanı + diyalog + dinleme + görev (5–9 dk).
  4. **Mekanizma (ANA):** planlayıcı ders öğelerini önce sınıflar — `teach{lexeme ∈ yeni_kartlar}` → kartın tanıtım adımına bağlanır; `teach{kalıp}` → kalıp adımı, parçaları K(t)'ye girince en erken halkaya yerleşir; `drills` → aday adım havuzu (K(t) kapısı); geri kalan → dil durağı. Ders dosyası değişmez; sınıflama derlemede yapılır ve doğrulayıcı "dil durağında kelime tanıtımı" görürse **hata** verir.
- **K9 · Profildeki "Seans planı":** akış günlerinde (bayrak) Profil → Odak ve Pomodoro'daki dört seans listesi gösterilmez; yerine tek satır: "Seansların içeriğini uygulama kurar: her seansta kelime, yapı ve bir beceri." Süre ayarları (25/5/20, günlük ve haftalık hedef) aynen kalır. Bayrak dışındaki günlerde bugünkü hâli sürer; kod silinmez. Odak ekranındaki "Sırada seans 1/4 · 25 dk" halkası ve dört Raute, TARGET3b'deki üst hapla aynı veriyi gösterir (tek kaynak: `GunPlani` + seans ilerlemesi).
