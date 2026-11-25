# A1 seviye tespiti: madde havuzu biçimi (PM-115 md. 5)

Dosya: `content/v2/assess/a1-seviye-tespiti.json`. Şema: `packages/shared/src/tespit.ts` (`TespitHavuzu`). Denetim: `content/tools/tespit.ts` (`npm run content:validate` dosya varsa koşar). Eşikler: `web/src/policy.json` → `seviye_tespiti` (`derin`, `havuz`). Derin seçim işlevi `derinSec` (`packages/shared/src/tespit.ts`): doğrulayıcı ve motor aynısını kullanır.

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
  - `r0:NN:dMM`, `r0:NN:pMM` → `temel/r0-NN-*.json` → `drills` / `placement` (kaynak `temel`; temel dersin alıştırması). PM-115 md. 5'teki "gün içi dil noktası görevleri" bunlar ve gün sınavı maddeleridir (halka görev cümlelerinin kimliği yok, bağlanamaz).
  - deneme maddeleri (`a1d:…`, `a1o:…`, `a1y:…`, `a1k:…`) → `assess/*.json` denemesi (kaynak `deneme`)
- **`yeni`**: `Drill` biçiminde madde (`gap`, `order`, `pick`, `transform`, `guided_response`, `listen_and_respond`, `tr_de`); kimlik `tespit:a1:mNNN`.
- **`hafta`** (1–8): maddenin ölçtüğü hafta. Kaynağın haftasıyla aynı olmalı (görülmemiş: dosyanın haftası; hafta sonu testi: dosya adındaki hafta; gün sınavı: günün haftası; denemede maddenin `hafta`sı). Temel ders maddesinde hafta, dersin öğretildiği haftadan önce olamaz.
- **`asama`**: `tarama` (aşama 1) ya da `derin` (aşama 2 ve çıkış yoklaması havuzu; çıkış, daha önce sorulmamış `derin` maddeyi seçer).
- **`beceri`**: `dinleme` · `okuma` · `yazma` · `konusma` · `dil`. Kelime becerisi havuza yazılmaz: kelime örneği sözlükten ve haftanın kartlarından kendiliğinden üretilir.
- **`can_do`**: `cd:m1:NN` (NN = günün numarası, 1–56). Görülmemiş durumun kendi `can_do`'su varsa havuzda da yazılır (boş bırakılırsa ondan alınır). Öteki kaynaklarda (gün sınavı, test) bağı havuz kurar: madde hangi cümleyi ölçüyorsa o yazılır.
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
| dil | bütün `Drill` türleri ve görülmemiş durum (denemenin seçmeli maddeleri hariç) |

## Derin bakış ve çıkış yoklaması (PM-115 md. 1, md. 4)
- **Hedefler:** bir haftanın derin bakışı o haftanın **günlerindeki** can_do'ları (sınav günü hariç) ve o haftada **ilk öğretilen** dil noktalarını ölçer. Maddenin `hafta`sı değil, etiketi belirler: 8. haftanın görülmemiş durumu 7. haftanın can_do'sunu taşıyorsa (`m1:h08:g4` → `cd:m1:49`) 7. haftanın derin bakışında da adaydır.
- **Seçim (`derinSec`):** yalnız `derin` + üretim maddeleri; can_do başına `derin.can_do_madde` (1), dil noktası başına `derin.dil_noktasi_madde` (2). Belirlenimli: her adımda en çok açık hedefi karşılayan madde, eşitlikte havuzdaki sıra. Haftalar bağımsız seçilir.
- **Çıkış:** zayıf çıkan her can_do / dil noktası, derin bakışta sorulmamış maddeyle yeniden ölçülür; hedef başına en az `havuz.cikis_min` (1) madde kalmalı.

## Doğrulayıcı kuralları (hata)
1. Şema; bilinmeyen alan hata (kök, madde, `yeni` gövdesi). Kimlik `tespit:a1:1`.
2. Her `ref` çözülür; bir madde havuzda (çekirdek dahil) en çok bir kez geçer. `yeni` kimliği tekil.
3. `yeni` üretim maddesinde `accepted` ≥ 3 (D-064); `audio_de` ve `prompt_de`'de ad yer tutucusu yok (yer tutucu yalnız cevapta). Türkçe alanlar (`situation_tr`, `tr`, `instr_tr`, `q_tr`, `why_tr`) OD-9 denetiminden geçer: taslakta uyarı, `reviewed` havuzda hata.
4. `hafta` 1–8 ve kaynağın haftasıyla aynı; `can_do`, `dil_noktasi` ve temel dersin kendisi maddenin haftasından sonra öğretilmiş olamaz (önce öğret, sonra iste).
5. `can_do` `cd:m1:NN` biçiminde ve 1–56; gün dosyası varsa günün `can_do`'suyla aynı kimlik. `dil_noktasi` bir A1 gününün `dersler`inde geçer. Görülmemiş durumun `can_do`'su havuzdaki listede bulunur.
6. Beceri, madde türüyle uyumlu (tablo).
7. `tarama` maddesi görülmemiş durum ya da `yeni` maddedir ve üretimdir.
8. **Kapsam** (içerikte günü bulunan her A1 haftası için):
   - her A1 `can_do`'su: en az **2** `derin` üretim maddesi (derin 1 + çıkış 1; sınav günleri, 55–56, çekirdekle ölçülür, sayılmaz);
   - her A1 dil noktası (muaf olmayan): en az **3** `derin` üretim maddesi (derin 2 + çıkış 1);
   - **derin seçimden sonra** her hedefe sorulmamış en az 1 madde kalır (bütün haftalar zayıf sayılarak sınanır; haftalar bağımsız seçildiği için her alt küme de geçer). Sayı yetse de maddeler başka hedeflerle paylaşılıyorsa bu kural düşer: o hedefe ayrı madde ekle;
   - her hafta: **2–3** `tarama` maddesi, en az biri `konusma` ya da `yazma`.
9. Çekirdek: `deneme` bulunur; dört becerinin her biri en az bir madde, maddeler o becerinin deneme bölümünden.
10. `muaf_dil_noktasi`: kimlik bir A1 dil noktası, `neden_tr` en az 10 karakter.

**Uyarılar:** günü içerikte olmayan A1 haftası ("kapsam denetlenmedi"); günü eksik hafta (o günlerin can_do'su ve dil noktaları denetlenmedi); muaf dil noktası listesi; `yeni` maddede OD-9 (taslak).

## Notlar
- Çıkış yoklaması aynı maddeyi ikinci kez sormaz; bu yüzden kural 8 yalnız `derin` maddeleri sayar (tarama maddeleri tarama aşamasında sorulur).
- `yeni` maddeler içerik güvenliği süzgecine (B4) girmez; dilbilimci + okur hattından geçer.
- Sesli madde ses dosyasıyla gelir: `audio_de`'de `{name}` yok; yer tutucu yalnız cevapta.
- Havuz sözlük kartı taşımaz; kelime örneği (tarama 6, derin 12) haftanın `yeni_kartlar`ından üretilir.
