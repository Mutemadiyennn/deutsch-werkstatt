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
    "sorular": []                     // aşağıdaki soru biçimi; en az 1 yaz, 1 anlama, 1 söyle
  },

  "sesler": [                         // en az 2
    { "id": "m1:01:a1", "tur": "anons",           // anons | sesli-mesaj | radyo | bekleme-anonsu
      "title_tr": "", "ortam_tr": "nerede duyuyorsun", "speaker": "",
      "hizlar": ["slow", "normal"],
      "script": [ { "de": "", "tr": "" } ],
      "sorular": [] }                 // en az 1 anlama, 1 dikte, 1 eylem
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
    "yazma": { "gorev_tr": "", "ornek_de": "", "zorunlu": ["**Montag**"], "accepted_kaliplar": [] }
  }
}
```

## Soru biçimi (`sorular[]`)
| `tip` | Öğrenciye | Alanlar |
|---|---|---|
| `anlama` | Duydun mu, anladın mı? | `ListenQ`: `kind`, `q_tr`, `opts`, `ans` |
| `dikte` | Aynısını yaz | `id`, `de`, `tr`, `accepted` (en az 3) |
| `ne-dedi` | Ne dedi? Yaz | `id`, `q_tr`, `accepted` (en az 3) |
| `cevapla` | Sen ne derdin? Söyle | `Drill` `guided_response` |
| `eylem` | Ne yapmalısın? | `Drill` `pick` |

## Kurallar
- **Öğretmeden isteme yok:** öğrenciden istenen her kelime o güne kadarki `dersler` ve `yeni_kartlar` içinde olmalı.
- Dinlenen metinde en çok %10 bilinmeyen kelime olabilir; anlama sorusu bilinmeyene dayanmaz.
- Türkçe metinler OD-9 kurallarına uyar. Öğrenci adı ve cinsiyeti yer tutucudur.
