# LEX görevi: kelime kartlarını OD-9 biçimine çevirme

Deutsch Werkstatt, İçerik Motoru. Rolün: `/home/claude/deutsch-werkstatt/.claude/agents/lex.md`.
Bir YAMA dosyası yazacaksın. git çalıştırma. Depodaki hiçbir dosyaya yazma.

Önce oku: `docs/v2/LEARNER.md` ve `docs/v2/OGRETIM_DONGUSU.md` içindeki OD-9 bölümü (satır 216'dan sonrası).

- Girdi: `/home/claude/cm/work/batch-NNN.view.jsonl` (her satır bir kart)
- Çıktı: `/home/claude/cm/work/batch-NNN.lex.json`

Biçim (100 kartın hepsi, geçerli JSON):

```json
{"<kart id>": {"tr": "...", "exp": {"anlam_tr": "...", "ne_zaman_tr": "...", "parcalar": [], "ipucu_tr": "..."}, "mistakes_tr": ["..."], "img": "...", "ex_img": {"2": "..."}}}
```

## Alanlar
- **tr:** doğal Türkçe karşılık, virgülle ayrılmış en çok 3 anlam. Noktalı virgül, parantezli dilbilgisi notu ve terim yok.
- **exp.anlam_tr:** tek cümle, ≤14 kelime. Kelimenin ne işe yaradığını sade söyler. Örnek (Mal): `Bir şeyin kaçıncı kez olduğunu söyler.`
- **exp.ne_zaman_tr** (isteğe bağlı): tek cümle, ≤12 kelime. Ne zaman, kime söylenir.
- **exp.parcalar:** yalnızca bileşik kelimede ya da iki parçalı fiilde: `[{"de":"Kranken","tr":"hasta"},{"de":"haus","tr":"ev"}]`. Parça ≤3 kelime. Diğer kartlarda `[]`.
- **exp.ipucu_tr** (isteğe bağlı): tek fikir, tek cümle, ≤14 kelime.
- **mistakes_tr:** 1 ya da 2 madde. Mevcut hatayı OD-9 diliyle yeniden yaz. Madde başına tek fikir, cümle başına ≤14 kelime. Biçim: `**Wo ist Bahnhof?** yanlış. Doğrusu **Wo ist der Bahnhof?**`
- **img:** yalnızca somut ve fotoğrafı net çıkacak kelimede kısa İngilizce arama sorgusu. Emin değilsen yazma; yanlış fotoğraf fotoğrafsızdan kötüdür.
- **ex_img:** `img` yazmadığın soyut kelimede, sahnesi fotoğraflanabilen 1 örnek için sorgu (anahtar: görünümdeki `ex.id`). `pos` değeri det, pron, conj, prep, particle, num olan kartlarda görsel gerekmez.

## OD-9 yazım kuralları (kesin)
- Yasak işaretler: `=` `;` `…` `...` ve her tür tırnak (kesme işareti dahil, `**kalın**` içi hariç). Türkçe ek için kesme gerekiyorsa cümleyi eksiz kur.
- Almanca kelime ve cümleler yalnızca `**kalın**` yazılır.
- Yasak terimler: Dativ, Akkusativ, Nominativ, Genitiv, Partizip, Präteritum, Konjunktiv, Infinitiv, Imperativ, reflexiv, Passiv, özne, nesne, yüklem, fiil çekimi, çekimli, hâl eki, yan cümle, modal fiil, ayrılabilen fiil, zamir, edat, sıfat çekimi, yardımcı fiil. Onların yerine örnekle göster: `**mit** sonrası **dem** gelir.` "Tanımlık" ve "artikel" sözcüklerinden de kaçın.
- İngilizce köprü yok.
- Okuyucu: Türkçe bilen, Almancası A2, dilbilgisi bilmeyen, yorgun bir yetişkin. Tek okumada anlamalı.

## Bitirince
Çıktının denetimi için kopya üzerinde çalış: `cp` ile `/tmp/lexcheck-NNN/` altına gerek yok; şu komut yeterli:

```sh
cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/batch-NNN.lex.json
```

Bütün bulgular kapanana kadar düzelt. Son mesajında yalnızca: kart sayısı, emin olamadığın kartlar, gördüğün Almanca ya da Türkçe hatalar (kart id + kısa not; düzeltmeyi dilbilimci yapacak).

## Okurdan dönen hata türleri (PM-046: aynı tür ikinci kez gelmesin)
- **Terim:** çoğul, tekil, isim, fiil, sıfat, ek, hece, vurgu kelimelerini kullanma. Örnekle göster: `**neun Tag** yanlış. Doğrusu **neun Tage**.`
- **Hata notunda ne denmek istendiği yazılsın:** `Babalar derken **die Vaters** yanlış. Doğrusu **die Väter**.` Yalnız `X yanlış` deyip anlamı boş bırakma.
- **İki yazım aynı görünüyorsa farkı söyle:** büyük harf, bitişik yazım gibi. `Kez anlamında büyük harfle yazılır: **das erste Mal**.`
- **Kartın kelimesini anlat:** `exp` ve `mistakes_tr` içinde kartın kelimesi ya da onun doğrudan kullanımı geçsin. Başka kelimenin notunu yazma.
- **Tek fikir:** `anlam_tr` içinde `ya da` ile iki ayrı anlam verme. İkinci anlam `ipucu_tr` içine gider ve `tr` içindeki her anlam açıklamada karşılık bulur.
- **Kesin kural yazma:** `sonrası hep X gelir`, `her zaman` gibi cümleler kartın kendi örnekleriyle çelişmesin.
- **Almanca ifadenin anlamını yaz:** kalın bir ifade tek başına kalmasın, Türkçesi aynı cümlede olsun.
- **Belirsiz cümle kurma:** `Türkçede ne denir`, `Bu günün olmadığını söyle`, `iki tabloda` gibi. Kime, neyi, ne zaman: açık olsun.
- **Yönerge:** öğrenciye tam olarak ne yapacağını söyle: `Bu gün sana uymuyor. Cümleyi buna göre değiştir.`
- **Parça çipleri:** soldan sağa okununca ifadenin anlamı çıkmalı. Olumsuzluk ve soru parçalanıp kaybolmasın.
- **Çift okunan söz:** `pazar` (gün ve alışveriş), `önce siz de`, `doktorun hasta olduğunu` gibi iki türlü okunan kuruluşlardan kaçın.
- **`ist` için ayrı çip yazma:** `-dir` çipi cümleyi bozar. `ist` komşusuyla birleşsin: **ist Montag** → pazartesi.
- **Bileşik ve iki parçalı kelimede çip:** parçalar yan yana gelince kelimenin anlamı çıkmıyorsa (**Fahrrad**, **Werkstatt**, **ausfallen**, **abnehmen**) `parcalar` boş kalır. Yalnızca **Krankenhaus** gibi anlamı gerçekten veren parçalar yazılır.
