# Lex görevi: M1 ek kartları (#62, #63 inceleme bulguları)

Rolün `/home/claude/deutsch-werkstatt/.claude/agents/lex.md`. Biçim ve kalite kuralları: `/home/claude/cm/LEX_M2.md` ve `/home/claude/cm/OKUR_DERSLERI.md`. git çalıştırma, depo dosyalarına yazma. Kartları `/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-*.json` içinden oku.

## 1. Var olan kartları tamamla
`lx:neu`, `lx:Büro`, `lx:offen`, `lx:wieder`, `lx:da`, `lx:brauchen`, `lx:Herr`: her birine `forms` (LEX_M2'deki gibi; isimde Nom/Akk/Dat, belirsiz + belirli; sıfat ve fiilde gerçek cümle), en az 3 eşdizim (`coll`: `"de | tr"`), somut olanların örneklerine fotoğraf sorgusu (`ex_img`). `lx:da`'ya `wieder da` ve `Ich bin da` eşdizimleri; `lx:neu`'ya `eine neue Nummer` eşdizimi girmeli.

İpucu kuralı: `X sonrası einen gelir` yazma. Kalıp: `**Ich brauche** dedikten sonra **der Termin**, **einen Termin** olur.` Belirli ve belirsizi ayırırken: `Bildiğimiz doktor: **mit dem Arzt**.` / `Herhangi bir doktor: **mit einem Arzt**.`

## 2. Yeni kart
`lx:müde` (sıfat, A1): tam kart (`de, tr, pos, level, tier: "K1", register, domains, exp, mistakes_tr, forms, coll, ex` en az 3 örnek). Şekil için `lx:neu` ve `lx:krank` kayıtlarına bak.

## 3. Hata olmayan notlar
Şu `mistakes_tr` maddeleri hata göstermiyor: `lx:haben[1]`, `lx:sollen[0]`, `lx:heißen[1]`, `lx:machen[1]`, `lx:vor[1]`, `lx:Stunde[1]`, `lx:Minute[0]`, `lx:Minute[1]`, `lx:Abend[1]`. Her birini ya Türkçe niyetle başlayan gerçek bir hata notuna çevir ya da yamada listeden çıkar. Bu kartların kalan notlarını koru.

## Çıktı
`/home/claude/cm/work/batch-m3.lex.json`: `{ "lx:neu": { "forms": [...], "coll": [...], "ex_img": {...} }, ..., "lx:haben": { "mistakes_tr": [...] } }`. `coll` ve `mistakes_tr` tam liste olmalı: mevcut öğeleri koru, ekle.
`/home/claude/cm/work/batch-m3.yeni.json`: `[ { tam lx:müde kaydı } ]`.
Bitince `cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/batch-m3.lex.json` çalıştır, sorun kalmasın. Son mesaj: kart sayısı, lint sonucu.
