# AKIŞ — günün dizilişi: "Halka" planlayıcısı (tasarım notu)

PM-078 B ve C (issue #12, 7041888211). **Kod yok; onaydan sonra yalnızca 1. gün pilotu.** Kural kimlikleri: AK-x. Bağlı belgeler: LEARNING_SYSTEM §1, §5–§7; OGRETIM_DONGUSU OD-1, OD-5, OD-7; BEYIN BY-2, BY-9, BY-12; MIMARI MM-1–MM-4; `design/TARGET3.html`.

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

- **Gün = 6–8 durak** (her biri 5–9 dk). Sıra: ısınma (vadesi gelen ≤5 dk) → halka 1 → dil noktası (dersin bölümleri) → halka 2 → video → halka 3 (… en çok 5 halka) → prova → okuma → gün sonu. Duraklar Yol'daki düğümlerdir (TARGET3 Bugün).
- **Dil noktası** bugünkü `TemelDers`'i bölerek kullanır. Durak 1: tanıt + hatırla + tablo; durak 2: anla + kur + söyle. Yeni içerik yok.
- **Video, prova, okuma** bugünkü ekranları **aynen** açar. Akış yalnızca yerini ve sırasını belirler.

## AK-2 Kelime halkası: kurallar (PM-078 B 1–6)

Halka = İÇ'in grupladığı 5–6 yeni kart (anlam ve kurulabilirlik). Her üretilen günde ve her öğrenci durumunda şu kurallar **değişmezdir** (AK-8 özellik testleri):

1. **Tanıtım:** art arda en çok 2 tanıtım, hemen ardından kullanım.
2. **Çeşitlilik:** her kelime halka içinde ≥3 farklı türde ve ≥2 farklı cümlede geçer.
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

Kısıt sağlanamazsa en yakın çözüm alınır ve `neden` kaydına yazılır. Plan hiçbir zaman boş ya da çözümsüz olmaz (BY-12).

## AK-3 Cümle kapısı (PM-078 C)

- **Bilinen küme K(t)** = tanıtılmış kartlar ∪ biten temel derslerin öğrettiği biçimler ∪ çerçeve kelimeleri ∪ WORLD kişi adları ∪ (sayı dersi bittiyse) sayılar.
  - Çerçeve kelimeleri: işlev sözcükleri, `card:false`. İlk geçtiği yerde dokununca Türkçesi görünür; bir kez görülünce bilinir sayılır.
- **Kelime → kart eşlemesi:** sözlüğün `de` + `forms` + çekim dizini (`core/kume.ts`, yeni, saf). Eşlenemeyen biçim **listelenir, tahmin edilmez**.
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

- **Doğrulayıcı (ANA):**
  - halkalardaki kartlar = `yeni_kartlar` (eksik ve fazla yok);
  - halka başına 5–6 kart;
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

`durak_dk: [5, 9]` · `halka_kart: [5, 6]` · `tanitim_art_arda: 2` · `kelime_tur_min: 3` · `kelime_cumle_min: 2` · `kip_art_arda: 2` · `isinma_dk: 5` · `halka_tekrar: [1, 2]` · `gosterim_bilinmeyen_max: 1` · `gorev_bilinmeyen_max: 0` · `gunler: [1]`. Ayrıca PM-078 H(4): `garden.ts` sabitleri (GUCLU_GUN, DAILY_NEW, DAILY_ACTIVE, ONERI_ART_ARDA, HIZLI_SN, tur 8–12) aynı dosyaya taşınır.

## AK-9 Testler

- **Özellik testleri (vitest, tohumlu döngü):**
  - Kapsam: 7 gün × 50 tohum × 4 öğrenci durumu (sıfır, kusursuz, %30 yanlış, ara verip dönen).
  - Her planda AK-2'nin 1–6. kuralları, AK-3 kapısı ve BY-12 (boş plan yok) tutar.
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
3. **İki yeni tür:** `resimden_sec`, `eslestir` (TARGET3 dili, e2e).
4. **Ekran:** `screens/Akis.tsx`, soru bileşenlerinin ortaklaşması, Yol/Bugün bağlaması (bayrak: gün 1).
5. **e2e ve simülasyon:** `v2_akis.py`, `ogrenci_devam.py` desteği; proje sahibi telefonda dener → onay → 2.–7. gün.

## AK-11 Açık sorular (PM)

1. **Ders bölünmesi:** dil noktası iki durak mı (öneri: evet, 5–9 dk sınırı için), yoksa tek durak mı?
2. **Gün sınavı (B16) akış gününde nerede?** Öneri: gün sonundan önce isteğe bağlı durak; ≥%90 ise kalan halkaların tanıma adımları "geçildi" sayılır.
3. **Bahçe (Köy):** halkada görülen kartlar aynı gün Bahçede yeni olarak gelmez; tekrar olarak gelebilir mi? Öneri: aynı gün gelmez (B5 kuralının genellemesi).
