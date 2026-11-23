# A1 seviye tespiti: madde havuzu biçimi (PM-115 md. 5)

Dosya: `content/v2/assess/a1-seviye-tespiti.json`. Şema: `packages/shared/src/tespit.ts` (`TespitHavuzu`). Denetim: `content/tools/tespit.ts` (`npm run content:validate` dosya varsa koşar). Eşikler: `web/src/policy.json` → `seviye_tespiti`.

Havuz **yeni içerik yazdırmaz; var olan maddelere kimlikle bağlanır** (referans). Var olan madde yetmezse `yeni` ile madde eklenir (içerik hattı yazar, dilbilimci + okur hattından geçer).

```jsonc
{
  "schema": 1,
  "id": "tespit:a1:1",
  "seviye": "A1",
  "review": { "status": "draft" },
  "note_tr": "",                                    // isteğe bağlı, öğrenciye gösterilmez
  "cekirdek": {                                     // dört beceri çekirdeği: herkes çözer, haftadan bağımsız
    "deneme": "assess:a1-deneme:1",
    "dinleme": ["a1d:d2:01"], "okuma": ["a1o:o1:01"], "yazma": ["a1y:y2:01"], "konusma": ["a1k:k2:01", "a1k:k2:02"]
  },
  "muaf_dil_noktasi": [                             // ölçülemeyen dil noktası (strateji vb.); gerekçe zorunlu
    { "id": "dn:kaydet-dinle", "neden_tr": "Kendi sesini kaydedip dinleme alışkanlığı; üretim maddesiyle ölçülmez." }
  ],
  "maddeler": [
    { "ref": "m1:h05:g1", "hafta": 5, "asama": "tarama", "beceri": "konusma", "can_do": ["cd:m1:29"] },
    { "ref": "m1:35:t02", "hafta": 5, "asama": "derin", "beceri": "dil", "can_do": ["cd:m1:29"], "dil_noktasi": ["gr:a1-05:t4"] },
    { "yeni": { "id": "tespit:a1:m001", "k": "guided_response", "situation_tr": "", "prompt_de": "", "accepted": ["", "", ""], "why_tr": "" },
      "hafta": 1, "asama": "tarama", "beceri": "konusma", "can_do": ["cd:m1:03"] }
  ]
}
```

## Alanlar
- **`ref`** (ya da `yeni`, ikisi birden olmaz): bağlanan maddenin kimliği. Çözülen kaynaklar:
  - `m1:hHH:gK` → `m1/gorulmemis-HH.json` (görülmemiş durum; kaynak `gorulmemis`)
  - `m1:DD:tNN` → `m1/hafta-sonu-testi(-HH).json` (kaynak `hafta_testi`)
  - `m1:DD:sK` → `m1/gun-DD.json` → `gun_sinavi.maddeler` (kaynak `gun_sinavi`)
  - deneme maddeleri (`a1d:…`, `a1o:…`, `a1y:…`, `a1k:…`) → `assess/*.json` denemesi (kaynak `deneme`)
- **`yeni`**: `Drill` biçiminde madde (`gap`, `order`, `pick`, `transform`, `guided_response`, `listen_and_respond`, `tr_de`); kimlik `tespit:a1:mNNN`.
- **`hafta`** (1–8): maddenin ölçtüğü hafta. Kaynağın haftasıyla aynı olmalı (görülmemiş: dosyanın haftası; test ve gün sınavı: günün haftası; denemede maddenin `hafta`sı).
- **`asama`**: `tarama` (aşama 1) ya da `derin` (aşama 2 ve çıkış yoklaması havuzu; çıkış, daha önce sorulmamış `derin` maddeyi seçer).
- **`beceri`**: `dinleme` · `okuma` · `yazma` · `konusma` · `dil`. Kelime becerisi havuza yazılmaz: kelime örneği sözlükten ve haftanın kartlarından kendiliğinden üretilir.
- **`can_do`**: `cd:m1:NN` (NN = günün numarası, 1–56). Görülmemiş durumun kendi `can_do`'su varsa havuzda da yazılır (boş bırakılırsa ondan alınır).
- **`dil_noktasi`**: günlerin `dersler` alanındaki `r0:` / `gr:` / `dn:` kimlikleri.
- Her maddede en az bir `can_do` ya da bir `dil_noktasi` olur.

## Üretim maddesi
Karar üretim maddesine bakar (PM-115 md. 1). Üretim: görülmemiş durum, `order`, `transform`, `guided_response`, `listen_and_respond`, `tr_de`, şıksız `gap`, denemede `form` ve `mesaj` (ve konuşma maddeleri). Seçmeli: `pick`, şıklı `gap`, denemenin seçmeli maddeleri.

## Beceri ↔ madde türü
| beceri | olabilecek tür |
|---|---|
| konusma | görülmemiş durum, `guided_response`, `listen_and_respond` |
| dinleme | `listen_and_respond`, sesli deneme maddesi (`pick` + `ses`) |
| okuma | metinli deneme maddesi (`pick` + `metin_de` / `secenekler_de`) |
| yazma | görülmemiş durum, `tr_de`, `transform`, şıksız `gap`, `order`, `guided_response`, deneme `form` / `mesaj` |
| dil | bütün `Drill` türleri ve görülmemiş durum |

## Doğrulayıcı kuralları (hata)
1. Şema; bilinmeyen alan hata. Kimlik `tespit:a1:1`.
2. Her `ref` çözülür; bir madde havuzda (çekirdek dahil) en çok bir kez geçer. `yeni` kimliği tekil, kaynak kimlikleriyle çakışmaz.
3. `yeni` üretim maddesinde `accepted` ≥ 3 (D-064); `audio_de` içinde ad yer tutucusu yok.
4. `hafta` kaynağın haftasıyla aynı; `can_do` ve `dil_noktasi` maddenin haftasından sonra öğretilmiş olamaz (önce öğret, sonra iste).
5. `can_do` `cd:m1:NN` biçiminde ve 1–56; gün dosyası varsa günün `can_do`'suyla aynı kimlik. `dil_noktasi` bir A1 gününün `dersler`inde geçer. Görülmemiş durumun `can_do`'su havuzdaki listede bulunur.
6. Beceri, madde türüyle uyumlu (tablo).
7. `tarama` maddesi görülmemiş durum ya da `yeni` maddedir ve üretimdir.
8. **Kapsam** (içerikte günü bulunan her A1 haftası için):
   - her A1 `can_do`'su: en az **2** `derin` üretim maddesi (sınav günleri, 55–56, çekirdekle ölçülür; sayılmaz);
   - her A1 dil noktası (muaf olmayan): en az **2** `derin` üretim maddesi;
   - her hafta: **2–3** `tarama` maddesi, en az biri `konusma` ya da `yazma`.
9. Çekirdek: `deneme` bulunur; dört becerinin her biri en az bir madde, maddeler o becerinin deneme bölümünden.
10. `muaf_dil_noktasi`: kimlik bir A1 dil noktası, `neden_tr` dolu.

**Uyarılar:** günü içerikte olmayan A1 haftası ("kapsam denetlenmedi"); `derin` üretim maddesi 4'ten az olan dil noktası ("çıkış yoklamasına yeni madde kalmayabilir"); muaf dil noktası sayısı.

## Notlar
- Çıkış yoklaması aynı maddeyi ikinci kez sormaz; bu yüzden kural 8 `derin` maddeleri sayar (tarama maddeleri sayılmaz).
- Sesli madde ses dosyasıyla gelir: `audio_de`'de `{name}` yok; yer tutucu yalnız cevapta.
- Havuz sözlük kartı taşımaz; kelime örneği (tarama 6, derin 12) haftanın `yeni_kartlar`ından üretilir.
