# Yazar görevi: M1 gerçek insan videoları (#58 A9, İÇ tarafı)

Rolün `.claude/agents/yazar.md` (`/home/claude/deutsch-werkstatt/.claude/agents/yazar.md`). Çalışma kopyası `/home/claude/wt-m1`. git çalıştırma. Yalnızca `content/v2/m1/video/` altına yaz. `gun-NN.json` dosyalarına dokunma.

## Neden
Proje sahibi gerçek insanın konuştuğu video istiyor. Çizim + sentez ses "video" sayılmaz. Her M1 gününe **en az 1 gerçek insan klibi, 30–90 saniye**.
Kaynak: **Deutsch im Blick** (COERLL, UT Austin; CC BY 4.0, lisans `coerll.utexas.edu/dib/pdfs/intro.pdf` içinde doğrulandı).

## Klipleri bulma
- Klip listesi: `https://coerll.utexas.edu/dib/siteindex.php`, bölüm PDF'leri `https://coerll.utexas.edu/dib/pdfs/k_01.pdf` … `k_10.pdf` (sondaki QR listesi klip kimliklerini verir; ör. `01_22_int_hb_who`), `https://www.coerll.utexas.edu/dib/rss.php` (1. bölüm: dosya adı + süre).
- Transkript sayfası: `https://coerll.utexas.edu/dib/vidt.php?f=<klip>` (Almanca sekmesini kullan; İngilizce sekmeyi kullanma ve hiçbir yere geçirme). Video: `https://coerll.utexas.edu/dib/mp4s/<klip>.mp4`.
- WebFetch bir adresi reddederse WebSearch ile klibin adını (`Deutsch im Blick Kap 03 … vidt.php`) arat ve dönen bağlantıyı aç. Web çağrılarını idareli kullan (en çok ~25).

## Günlere konu eşleşmesi (öneri; daha iyisini bulursan değiştir, gerekçe yaz)
| Gün | Dersin konusu | Aday |
|---|---|---|
| 1 | selamlaşma, tanışma, günler | Kapitel 1 "Wer bin ich?" (Harald, Peter ya da Jan) |
| 2 | aylar, mevsimler | Kapitel 5 "Mein Geburtstag" / "Geburtstag" (Jan, Eva) ya da "Mario: Mein Geburtstag" |
| 3 | sayılar 0–20, yaş | Kapitel 1 "Wer bin ich?" başka konuşmacı (yaş kısmı) |
| 4 | sayılar 21–100, fiyat, pazar | Kapitel 3 Sprache im Kontext: "An der Kasse", "Der Döner", "Das Eis", "Im Supermarkt" |
| 5 | saat, randevu saati | Kapitel 3 "Ein typischer Tag", "Sind Sie ein Morgenmensch?" |
| 6 | tarih, soru kelimeleri | Kapitel 5 "Mein Lieblingsfeiertag", "Mario: Deutsche Feiertage" |
| 7 | sein/haben, möchten/können, randevu | Kapitel 7 "Joel: Ich gehe zum Arzt", "Beim Arzt" (Harald) |

Almanca konuşan konuşmacıları tercih et (Berna, Eva, Harald, Jan, Peter; Mario vb.). Amerikalı öğrenci klipleri yedektir.

## Seçim ölçütü
- Bilinmeyen kelime ≤ %10 (kesit içinde). Bilinen liste: `/home/claude/cm/work/bilinen/bilinen-gun-NN.txt` (N. gün sonu, küçük harf). Özel adlar sayılmaz. Çekimli biçimler için makul davran. Fazlası `on_ogretim` ile önceden öğretilir (en çok 6 öğe). Hâlâ çok zorsa daha kısa kesit seç.
- **Gerçek kişinin telefon numarası, adresi, tam doğum tarihi gibi özel bilgileri kesite girmez.** (ör. Kapitel 1'de Berna ve Eva numaralarını söylüyor; o turlar `haric`.) Doğum tarihi konuşulan klipte yalnızca ay kısmı kalacak biçimde kes; olmuyorsa başka klip seç.
- DN-4: siyaset, şiddet, alkol ağırlıklı, cinsellik yok. Reklam/marka övgüsü yok.
- Bir güne uygun klip bulamazsan uydurma, çizim önerme: dosyada `"durum": "bulunamadi"` ve neden yaz.

## Metin kuralı (önemli)
**Transkripti depoya kopyalama.** Metin yayın anında kaynaktan alınıp videoyla hizalanacak (ana motorun CI işi). Sen yalnızca **tur numarası** ile gösterirsin: transkriptteki konuşma satırları sırayla 1, 2, 3… (`- ` ile başlayan her satır bir tur). `basi`: turun ilk 2–3 kelimesi (doğrulama için, en çok 4 kelime). Bir dosyada klipten başka Almanca alıntı geçirme; soru metinleri Türkçe ve kendi sözlerindir.

## Dosya: `content/v2/m1/video/gun-NN.json`
```json
{
  "id": "m1:NN:rv1", "day": N, "durum": "hazir",
  "kaynak": "Deutsch im Blick", "klip": "<kimlik>", "konusmaci": "Harald", "baslik": "<klip başlığı>", "sure_kaynak": "0:41",
  "video_url": "https://coerll.utexas.edu/dib/mp4s/<kimlik>.mp4",
  "transkript_url": "https://coerll.utexas.edu/dib/vidt.php?f=<kimlik>",
  "lisans": "CC BY 4.0", "lisans_url": "https://creativecommons.org/licenses/by/4.0/",
  "atif": "Deutsch im Blick, COERLL, University of Texas at Austin, CC BY 4.0. Klip kesilmiştir.",
  "kesit": { "bas_tur": 1, "son_tur": 8 },
  "haric": [ { "tur": 7, "neden": "telefon numarası" } ],
  "ortam_tr": "Bu kişi kim, nerede konuşuyor: bir iki kısa cümle.",
  "bilinmeyen": { "oran": 0.07, "kelimeler": ["…"] },
  "on_ogretim": [ { "de": "…", "tr": "…" } ],
  "turlar": [ { "tur": 1, "basi": "Wie heißt du", "kim": "soran" }, { "tur": 2, "basi": "Ich heiße", "kim": "konusmaci" } ],
  "bolum": {
    "ana_fikir": { "q_tr": "…", "opts": ["…","…","…"], "ans": 0, "why_tr": "…" },
    "ayrinti": [ { "q_tr": "…", "opts": ["…","…","…"], "ans": 1, "tur": 4, "why_tr": "…" } ],
    "dikte": [
      { "id": "d1", "tur": 2, "seviye": "kolay" }, { "id": "d2", "tur": 4, "seviye": "orta" },
      { "id": "d3", "tur": 6, "seviye": "zor" }, { "id": "d4", "tur": 8, "seviye": "usta" },
      { "id": "d5", "seviye": "gercek", "gorev_tr": "…", "ornek_de": "…", "zorunlu": ["…"] }
    ],
    "golge": [ 2, 4 ],
    "cevapla": { "soru_tur": 3, "situation_tr": "…", "ornek_de": "…", "accepted": ["…","…","…"], "why_tr": "…" }
  },
  "kanit": "Bu klip neden bu gün: tek cümle."
}
```
- `ayrinti` 2–4 soru; `opts` Türkçe; bir tura bağlı.
- `dikte`: yalnızca **kısa, net söylenen** turlar (≤ 8 kelime). `gercek` görevinde öğrenci duyduğunu kendi cümlesiyle yazar; yalnızca öğrettiğimiz kelimeler (`ornek_de` ve `accepted`).
- `cevapla`: öğrenci, soran kişinin sorusuna **kendisi hakkında** cevap verir. `accepted` ≥ 3, öğretilen bütün eşdeğerler; ad gerekiyorsa `{name}`. Öğretilmemiş hiçbir şey istenmez.
- Doğal söyleyişi bozma: konuşmacının yuttuğu ya da lehçe biçimi transkriptte varsa o turu dikteye koyma.

## Türkçe
OD-9: Türkçe sade, cümle ≤ 14 kelime, terim yok (fiil, isim, hâl vb. yazma), İngilizce köprü yok, yasak işaretler yok (`=`, `;`, `…`, tırnak). Almanca geçerse `**kalın**`. Yönerge tek okumada ne yapılacağını söyler. `/home/claude/cm/OKUR_DERSLERI.md` dosyasını oku.

## Bitince
`node -e` ya da python ile her JSON'un ayrıştığını doğrula. Son mesajda gün başına tek satır: klip, süre, kesit, bilinmeyen oranı, ön öğretim sayısı; bulunamayan gün varsa açıkça yaz. Limit kesilirse iş kaybolmasın: her günü bitirince dosyasını yaz.
