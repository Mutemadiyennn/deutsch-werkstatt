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

  "video": {
    "id": "m1:01:v1", "tur": "sokak-roportaji",   // sokak-roportaji | bir-gunum | nasil-yapilir | bunu-nasil-soylersin | koy-dizisi
    "title_tr": "", "sure_sn": 60, "gercek_insan": false,
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
