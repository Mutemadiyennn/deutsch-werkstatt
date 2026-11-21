# M1 İlk Hafta: günlük içerik biçimi (öneri, PM-050)

Her gün bir dosya: `content/v2/m1/gun-01.json` … `gun-07.json`. Plan: `content/v2/curriculum/m1.json`.
Sorular mevcut şema türlerini kullanır (`Drill`, `ListenQ`). Yeni olan yalnızca sarmalayıcılardır.

```jsonc
{
  "schema": 1, "id": "m1:gun:01", "day": 1, "level": "A1", "format": "gun",
  "title_tr": "", "goal_tr": "",
  "can_do": { "id": "cd:m1:01", "tr": "" },
  "unit": "u:m1:01", "arm": "pazar", "place": "pl:...", "characters": ["ch:..."],
  "requires": { "kelimeler": [], "kaliplar": [], "gramer": [], "tur": [], "baglayicilar": [], "akicilik": [] },
  "review": { "status": "draft" },

  "dersler": ["r0:01-tage"],          // o günün temel dersleri, sırayla
  "yeni_kartlar": ["lx:Montag"],      // 15–25 kart, Bahçe buradan alır

  "sahne": {                     // çizim + sentez ses: ek içerik, günün videosu sayılmaz (#58 A9)
    "id": "m1:01:v1",
    "title_tr": "",
    "sahneler": [ { "id": "s1", "speaker": "ch:...", "sahne_tr": "çizim tarifi", "de": "", "tr": "" } ],
    "bolumler": [ { /* aşağıdaki BÖLÜM biçimi; 1–2 dakikada bir bölüm */ } ]
  },

  "sesler": [                         // en az 2
    { "id": "m1:01:a1", "tur": "anons",           // anons | sesli-mesaj | radyo | bekleme-anonsu
      "title_tr": "", "ortam_tr": "nerede duyuyorsun", "speaker": "",
      "hizlar": ["slow", "normal"],
      "script": [ { "id": "c1", "de": "", "tr": "" } ],
      "bolumler": [ { /* tek bölüm */ } ],
      "eylem": { /* Drill pick: Ne yapmalısın? */ } }
  ],

  "gorsel": [                         // çeviri yok: ses + 4 resim
    { "id": "m1:01:g1", "de": "", "dogru_img": "arama sorgusu", "celdirici_img": ["", "", ""] }
  ],

  "prova": {                          // dallanan konuşma provası, çevrimdışı çalışır
    "id": "m1:01:p1", "title_tr": "", "durum_tr": "", "karsi": "ch:...", "baslangic": "n1",
    "dugumler": [
      { "id": "n1", "de": "", "tr": "",
        "secenekler": [ { "de": "", "tr": "", "accepted": [], "sonraki": "n2", "uygun": true, "geri_bildirim_tr": "" } ] },
      { "id": "n9", "de": "", "tr": "", "son": true }
    ],
    "kapanis_tr": ""
  },

  "okuma_yazma": {
    "tur": "okuma",                   // okuma | yazma
    "title_tr": "", "metin_de": "", "metin_tr": "", "sorular": [],
    "yazma": { "gorev_tr": "", "ornek_de": "", "zorunlu": ["Montag"], "accepted_kaliplar": [], "kontrol_tr": ["", "", ""] }
  }
}
```

## Bölüm biçimi (PM-053)
Uzun kayıt yazdırılmaz. Her bölüm 1–2 dakika, bir oturum en çok 10 dakika. Video üstte durur, sorular altta akar; cümleye dokununca o cümleye gidilir.

```jsonc
{
  "id": "b1", "cumleler": ["s1", "s2"],        // sahne ya da script kimlikleri, sırayla
  "ana_fikir": { "kind": "gist", "q_tr": "", "opts": [], "ans": 0 },   // (a) altyazısız dinleme sonrası
  "ayrinti": [ { "kind": "detail", "q_tr": "", "opts": [], "ans": 0 } ], // (b) kim, ne, ne zaman, nerede
  "dikte": [                                    // (d) seçilen 3–6 cümle, merdivenle
    { "id": "d1", "cumle": "s2", "seviye": "kolay", "q_tr": "Hangi kelimeyi duydun?", "opts": [], "ans": 0 },
    { "id": "d2", "cumle": "s2", "seviye": "orta", "de": "Heute ist ___.", "accepted": [] },
    { "id": "d3", "cumle": "s3", "seviye": "zor", "banka": [], "accepted": [] },
    { "id": "d4", "cumle": "s3", "seviye": "usta", "accepted": [] },
    { "id": "d5", "seviye": "gercek", "gorev_tr": "İki cümleyle özetle.", "ornek_de": "", "zorunlu": [] }
  ],
  "golge": ["s2"],                              // (f) dinle, aynısını söyle
  "cevapla": { /* Drill guided_response */ }    // (g) Sen ne derdin? Söyle
}
```
Cümle cümle çalışma (c), 0,75× hız ve dokununca kart (e) oynatıcının işidir; içerikten yalnızca `cumleler` gerekir.

## Kurallar
- **Öğretmeden isteme yok:** öğrenciden istenen her kelime o güne kadarki `dersler` ve `yeni_kartlar` içinde olmalı.
- Dinlenen metinde en çok %5 bilinmeyen kelime olabilir (OD-0); anlama sorusu bilinmeyene dayanmaz.
- Yazma görevi çevrimdışı denetlenir: zorunlu kelime ve kalıp kontrolü, ardından `ornek_de` ve 3 maddelik `kontrol_tr` (PM-054.5).
- Türkçe metinler OD-9 kurallarına uyar. Öğrenci adı ve cinsiyeti yer tutucudur.

## Pilotun netleştirdikleri (gün 1–2, denetim: `m1audit.ts`)
- **`kanit`:** `ana_fikir`, `ayrinti`, `eylem` ve okuma sorularında zorunlu ek alan. Cevabın dayandığı cümlelerin kimlikleri (okumada 0'dan başlayan cümle sırası). Bu cümlelerde bilinmeyen kelime olamaz.
- **Dikte merdiveni:** `kolay` doğru seçeneği cümlede geçer, çeldiriciler geçmez. `orta` yalnızca boşluktaki kelimeyi ister. `zor` ve `usta` tek cümle yazdırır; `banka` cevabın kelimeleri ve en az 2 çeldiricidir. Yazdırılan kelime kartın örnek cümlesinden gelemez; ders ya da kartın kendisi ve eşdizimi gerekir.
- **Dikte `accepted`:** aynı metnin en az 3 yazımı (büyük/küçük harf, noktalama, ümlaut). Başka kelime kabul edilmez.
- **Kimlikler:** `cevapla` ve `eylem` genel kimlik taşır (`m1:01:a1:c1`, `m1:01:a1:e1`). `b1`, `d1` gibi kimlikler üst öğesinin içinde geçerlidir.
- **`accepted_kaliplar`:** `___` serbest yuvadır (`Ich habe im ___ Urlaub.`). `ornek_de` içindeki her cümle bir kalıba uyar.
- **`zorunlu`:** düz metin, kalın işareti yok. Tam kelime ya da kelime grubu olarak aranır.

## Hafta sonu testi (yalnızca `gun-07.json`)
Ayrı dosya `content/v2/m1/hafta-sonu-testi.json`, `maddeler` alanı: 10–12 maddelik `Drill` dizisi. Haftanın sonunda çözülür, 1–7. günlerde öğretilmeyen hiçbir şey istemez. Başka günlerde bu alan olmaz.

```jsonc
"maddeler": [
  { "id": "m1:07:t01", "k": "listen_and_respond", "audio_de": "", "speed": "normal", "situation_tr": "", "accepted": [], "why_tr": "" },
  { "id": "m1:07:t02", "k": "order", "de": "nicht / morgen / kommen / Ich / kann", "tr": "", "accepted": [], "why_tr": "" },
  { "id": "m1:07:t03", "k": "guided_response", "situation_tr": "", "prompt_de": "", "accepted": [], "why_tr": "" }
]
```
- **Karışım:** en az 3 dinleme (`listen_and_respond`), en az 3 kurma (`order`, `gap`, `transform`), en az 2 konuşma (`guided_response`, `tr_de`). Türler sırayla değil, karışık gelir.
- **Kimlik:** `m1:07:tNN`.
- **`accepted`:** en az 3 farklı cevap. `gap` tek kelime ister: aynı kelimenin en az 3 yazımı, doğru cevap `opts` içinde.
- **`order`:** `de` içindeki parçalar ilk cevabın kelimeleridir.
- **Ses:** `audio_de` içinde ad yer tutucusu olmaz. Yer tutucu yalnızca öğrencinin cevabında olur.


## Gerçek insan videosu (#58 A9)

Günün videosu ayrı dosyadadır: `content/v2/m1/video/klip-NN.json`. Kaynak Deutsch im Blick (COERLL, UT Austin; CC BY 4.0). Çizimli `sahne` bunun yerine geçmez.

- Transkript **main'de** tutulmaz. Derlenmiş `metin.json` (`klip-NN.metin.json`) **`medya` dalında** durur (ürün dalı, `gh-pages` gibi; main'e hiç birleşmez). Yayın önce Releases'ten indirir, sonra `medya` dalını üstüne açar; aynı adda dosyada dal kazanır (PM-081 A1–A2).
- Dosyada klip kimliği, `video_url`, `transkript_url`, `kesit`, `haric` ve `turlar[{tur, basi, kim}]` bulunur. `basi` turun ilk kelimeleridir (en çok 4). Derleme adımı metni kaynaktan alır, `basi` ile doğrular, videoyla hizalar.
- `haric`: kesitten çıkarılan turlar. Telefon numarası, adres ve tam doğum tarihi yayına girmez.
- Derleme bağlama kuralı (inceleme #159 P1-1): klip yalnızca hattın ölçüm kaydı (`klip-NN.olcum.json`) varsa ve metin dosyasının sha256'sı o kayıtla aynıysa bağlanır; her hizalı cümle kendi turunun `basi`siyle başlamalıdır; `haric` ve `kesit` aralığı dışındaki turlar pakete girmez. Hat `etiket: "insan-orneklemi"` yazdıysa klip dosyasında `"orneklem_onay": true` (İÇ'in örneklem kontrolünden sonra) gerekir.
- `on_ogretim` ve `ortam_tr` pakete girer; oynatıcıda dinlemeden önce gösterilir.
- `durum`: `hazir` | `kisa` (30 sn altı, PM kararı bekler) | `sinir-asimi` (bilinmeyen %10 üstü) | `bulunamadi`. Dosya adı `klip-NN.json`: gün şemasının `gun-NN.json` deseniyle karışmaz.
- `bolum`: `ana_fikir`, `ayrinti[]`, `dikte[]`, `golge[]`, `cevapla`; dikte ve gölge tur numarasına bağlıdır.
- `kesitler`: 20 sn altı kesite ikinci parça gerekince `[{klip, bas_tur, son_tur, haric}]` sırayla oynatılır; ilk eleman üst düzeydeki `klip`/`kesit`/`haric`/`turlar` ile aynıdır, sonrakiler kendi `konusmaci`, `video_url` ve `turlar` alanını taşır, sorular ve dikte onlara `"kesit": 1` (sıra numarası) ile, gölge `{kesit, tur}` ile bağlanır.
- `atif` ekranda gösterilir (CC BY).
- Süre: her parça `kesit_sure_tahmin_sn` ya da `kesit_sure_olcum_sn` taşır; dosyada `toplam_sure_tahmin_sn` parçaların toplamıdır. 20 sn altı parça tek başına olmaz.

### PM kuralları (#58 A9, 19.11)
- `on_ogretim`: en çok 6 madde, madde başına en çok 4 kelime, toplam en çok 15 kelime.
- Hiçbir madde bir sorunun cevabı ya da `kanit` cümlesiyle aynı olamaz.
- Bilinmeyen oranı en çok %10. Bu sınırlarla %10'a inmeyen klip `"mod": "yalnizca-dinle"` olur.
- Soyad ve tam doğum tarihi (yıl dahil) yayına girmez. Yılsız gün ve ay kalabilir.

### Uygulama kuralları (#82 incelemesi; PM kuralının açılımı)
- "Aynı olamaz" kuralı dikte `accepted[0]` ve gölge cümlesi için de geçerlidir. Boşluğun cevabı da maddeden doğrudan okunamaz (örnek: madde **Freunde dabei** iken boşluk **Hattest du Freunde ___?** olmaz).
- Sayılar da kelime sayılır: **10**, **2004** gibi bir sayı, o güne kadar sözcüğü öğretilmediyse bilinmeyendir.
- Soyad (PM onayı bekleyen yorum, #12): konuşmacının soyadını söylediği tur oynamaz (`haric`, `"neden": "soyad"`; tur kesitin başındaysa kesit ondan sonra başlar). Türkçe çeviride, soruda ve açıklamada da soyad geçmez.
- Bir gün, başka bir günde kullanılan klip parçasını tekrar etmez.
- Ana dili Almanca olmayan konuşmacının hatalı cümlesine soru ya da dikte bağlanmaz.
- Dikte sırası: kolay → orta → zor → usta → gerçek.

## Gün sınavı (`gun_sinavi`; PM-066 madde 3, B16 "Günü sınavla geç")
İsteğe bağlı, 3–4 dakikalık sınav. ≥ %90 olursa günün dersi ve tanıma turları "geçildi" sayılır. Klip, konuşma provası ve gün sonu cümlesi atlanmaz. Eşik sınav ekranıyla (B16 2. PR) gelir.
```jsonc
"gun_sinavi": {
  "id": "m1:01:s",
  "maddeler": [ /* 10–12 madde; mevcut Drill türleri */ ],
  "sesli": ["m1:01:s9", "m1:01:s10"],
  "dikte": ["m1:01:s1", "m1:01:s2", "m1:01:s3", "m1:01:s4"]
}
```
Madde bileşimi (11 madde):
- **4 dikte:** `listen_and_respond`, doğal hız, "Duyduğunu yaz". `accepted` aynı cümlenin ≥ 3 yazımıdır.
- **6 üretim:** 4 yazılı (`tr_de`) ve 2 sesli (`listen_and_respond` ya da `guided_response`).
- **1 mini prova:** günün can-do'su, `guided_response`.

Kurallar:
- **Kimlik biçimi:** sınav `m1:NN:s`, maddeler `m1:NN:sK` (K = 1…12).
- **Dikte maddeleri** `dikte` listesinde yazılır. Sınav ekranı bunları günlük dikteyle aynı kuralla puanlar (`dikteDegerlendir`): noktalama sayılmaz; büyük-küçük harf ya da ümlaut farkı doğru sayılır ama doğru yazım gösterilir; başka kelime kabul edilmez. Bir madde hem `dikte` hem `sesli` olamaz.
- **Sesle cevaplanacak maddeler** yalnızca `sesli` listesinde yazılır. Maddenin içine `"sesli": true` yazılmaz (şemada olmayan alan hatası). Dikte ve seçmeli (`pick`) maddeler `sesli` olamaz.
- **`audio_de` içinde ad yer tutucusu** (`{name}`, `{Herr|Frau}`) olmaz: ses dosyası önceden üretilir.
- **Yalnızca öğretilen:** her madde yalnızca o güne kadar öğretilen öğeleri ister (`requires` kuralı).

Doğrulayıcı (`m1check.ts`) şunları denetler:
- madde kimlikleri tekil;
- `sesli` kimlikleri sınavda var ve `pick` değil;
- `dikte` kimlikleri sınavda var, `pick` değil ve `sesli` ile kesişmiyor;
- üretim maddelerinde `accepted` ≥ 3 (D-064);
- bütün kabulleri öğretilmemiş kelime içeren madde için uyarı;
- 10–12 madde (şema).

## Kalıp dolgu anlamları (`patterns.json` → `slots[].fills_tr`)
İsteğe bağlı. `fills` ile aynı sırada ve uzunlukta kısa Türkçe anlamlar ("im Büro" → "ofiste"). Boş anlam yazılmaz (hata). Kalıp kartı (B2) seçilen dolgunun anlamını buradan gösterir; örnek cümle varsa o da öne çıkar. Uzunluk farkı doğrulayıcıda hatadır.
