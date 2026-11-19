# LEX görevi: yeni derin kartlar (parti NNN)

Rolün `.claude/agents/lex.md` ve `docs/v2/agents/LEX.md`. Depo: `/home/claude/deutsch-werkstatt`. git çalıştırma.
Önce oku: `docs/v2/LEARNER.md`, `/home/claude/cm/LEX_GOREV.md` (OD-9 alan ve yazım kuralları aynen geçerli), `packages/shared/src/content.ts` (`Lexeme`), `content/tools/load.ts` (`checkLexeme`).

Kelime listesi görevde verilir. Çıktı: `content/v2/registry/lexicon/batch-NNN.json`, biçim `{ "batch": "NNN", "review": {"status":"draft"}, "items": [...] }`, girinti 1.

## Kart
- `id`: listedeki kimlik. `de`: **artikelsiz** (PM-042 B.9). İsimde `art` ve `pl` ayrı alanda.
- `tr`, `pos`, `tier:"K1"`, `level`, `domains`, `register`; `freqRank` listede varsa.
- Fiilde `verb.praesens3`, `verb.perfekt`, `verb.aux`; gerekiyorsa `separable`, `reflexive`, `case`, `prep`.
- En az 2 `collocations`, en az 1 `patterns` (yalnızca `content/v2/registry/patterns.json` kimlikleri).
- En az 4 `examples`: en az 1'i `layer:"alltag"`, en az 1'i `dialog:true` ve iki konuşmacılı (`– … – …`). Kimlik `<kart id>:<n>`.
- Her kartta `exp` ve 1–2 `mistakes_tr`, somut kartta `img`, soyutta bir örnekte `img`.
- `mistakes_tr` gerçek bir Türkçe konuşan hatası olsun; kullanım notu değil. Kullanım notu `exp.ipucu_tr` içine gider.

## Örnek cümle kuralları
Gerçek hayattan olsun: telefon, doktor, iş, market, komşu, resmî daire. Dünya: Wendlfing (`docs/v2/WORLD.md`). Öğrencinin `ich` cümlesinde cinsiyetli kelime `{Kunde|Kundin}`. Siyaset, şiddet, suç, ölüm, din tartışması, cinsellik yok. Bairisch yok. Örneklerdeki diğer kelimeler sık ve basit olsun.

## Bitirince
`npm run -s content:validate | tail -5` kendi dosyanda 0 hata. `cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx check.ts NNN` 0 sorun. Son mesajında yalnızca kart sayısı, atlananlar, şüpheler.

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

- `mistakes_tr` Türkçe niyetle başlar: `Yorgunum derken **Ich müde** yanlış. Doğrusu **Ich bin müde.**` Ayrıntı: OKUR_DERSLERI.md.
