# lexicon c6-06 — dilbilimci incelemesi (PM-062, 6 cümle)

İncelenen: 50 kart, 100 yeni örnek (yazarın değiştirdiği 3 eski örnek dahil 103), 300 boşluk (eskiler dahil).
Yama: `c6-06.dil.json`, 32 kart, 68 düzeltme. 18 kart değişmeden geçti (klein, groß, zurück, stehen#2, halten, klar, passieren, spielen, jung, gerade, Mutter, kriegen, stimmen, suchen, her, natürlich, stellen, leid).
Doğrulayıcı çalıştırılmadı: sözlüğe dokunulmadı, yama baş geliştiricide.

## Düzeltmeler
- **Kart anlamı ve çakışma (8):**
  - stehen (1. kart): örneklerin ve hata notunun hepsi yazılı olmak / yakışmak; `tr` içindeki `durmak`, `anlam_tr` (ayakta durmak), iki eşdizim (`im Stau`, `in der Schlange`) ve b1, b2, b5 `lx:stehen#2` ile çakışıyordu. `tr` → `yazılı olmak, yakışmak`; `exp` yeniden yazıldı; eşdizimler `in der Zeitung stehen`, `auf der Liste stehen`; b1 `Ich ___ nicht auf der Liste.`, b2 `___ du auch auf der Liste?`, b5 `Das hat in der Zeitung ___.`
  - Paar b5 `Ich warte ein ___ Minuten` (cevap `paar`, `lx:paar` kartının kelimesi) → `Die beiden sind ein schönes ___.`; eşdizim `ein paar Minuten` → `ein schönes Paar`. Hata notu farkı anlatmaya devam ediyor.
- **Aynı cümle iki kartta (2):** helfen b4 `Das hat mir sehr ___` (leid b4 ile aynı) → `Danke, Sie haben mir sehr ___.`; lieb b4 `Das ist sehr ___ von Ihnen` (`lx:nett` b1 ile aynı cümle, aynı çeviri, farklı cevap) → `Das ist aber ___ von dir, danke!`
- **Kişisel bilgi (4):** Kind ö2 ve b3 `Ich hole die Kinder um vier ab` → `Frau Stadler holt …`; treffen b1 `meine Schwester` → `Ich ___ heute Abend Freunde.`; Mensch b2 `…der Deutsch und Türkisch kann` → `Jeder braucht ___ Menschen zum Reden.`
- **Almanca (4):** richtig ö5 `auf dem Brief` → `im Brief` (saat mektubun içinde yazar); rufen ö6 `Ja, Herr Wimmer, für dich` (Almanca değil) → `Ja, Herr Wimmer ruft dich.`; Recht b6 `erklärt mir mein ___` (doğal değil, cevap tek değil) → `Jeder hat das ___ auf eine Pause.`; Vater ö1 `Ihr Vater` (cümle başında sizin/kadının ayırt edilmiyor) → `Der Vater von Tom wohnt auf dem Land.`
- **Düzey (1):** versuchen ö6 `Drucker` → `Die Tür geht nicht auf.`
- **Bavyera tutarlılığı (3):** holen ö1, b1 ve eşdizim `Brötchen` → `Semmeln` (c6-04 kararı), çeviri `küçük ekmek`.
- **Boşluk cevabı tek değil, also_ok (40):** Kind b1 `ein`; genau b1 `ganz`, b2 `Richtig`, `Stimmt`, b3 `pünktlich`; Morgen b2 `früh`; Leute b1 `Menschen`; Mensch b4 `Leute`; wohl b2, b4, b5, b6 `wahrscheinlich`, `vermutlich`; Geld b4 `holen`; gleich b1 `sofort`; fahren b5 `Geht`; raus b1, b5 `hinaus`, b2 `aufstehen`; wieso b2 `gehst`, `fährst`; bekommen b1 `kriege`, `nehme`, `möchte`, b2 `kriegst`, b3 `kriegt`, b4 `gekriegt`, `erhalten` (kriegen kartıyla karşılıklı); erzählen b3 `spricht`, `redet`, b5 `Sag`; laufen b4 `gegangen`; Recht b5 `Recht`; holen b2 `Bringst`, b4 `abgeholt`; schnell b2 `bald`, b3 `kurz`; lange b1–b6 `lang`; Sache b2 `diese`; rufen b3 `holt`, b4 `geholt`; dort b3 `dahin`; Kind b3 `ihre`.
- **Türkçe (6):** lieben ö6 ve lieb ö4 pasta → kek (c6-05 kararı); erst b5 `Ancak pazartesi yine vaktim var` → `Ancak pazartesi günü yeniden vaktim olacak`; holen ö6 `iyiyim artık` → `idare ederim` (**es geht schon**); nun b2 ve wohl b2 ipuçları yalnız kelimenin yerini söylüyordu, anlamla yeniden yazıldı.

## Yazar notlarına yanıt
- **stehen / stehen#2:** yukarıda; 2. kart değişmedi.
- **also_ok seçimleri:** nun `halt`/`eben`, raus `aussteigen`/`hinaus`, rufen `holen`, stehen#2 `gesteckt`, klar `Natürlich`/`Sicher`/`deutlich`, lieb `nett`/`nette`/`gut`, natürlich `klar`/`sicher`/`gern`, gerade `jetzt`, dort `da`: hepsi o cümlede doğru Almanca ve aynı çeviriyi veriyor; kaldı.
- **Paar, Mensch, treffen, Kind, helfen/leid:** yukarıda. leid b4 değişmedi.
- **genau b2:** `Richtig` ve `Stimmt` eklendi.
- **Recht b5 `Du hast ___` → `recht`:** kartın ipucu ve hata notu tam bunu öğretiyor, ayrı `lx:recht` kartı yok; kaldı, büyük harfli yazım da geçerli olduğundan `Recht` eklendi.

## Açık noktalar
- stehen 1. kartın `tr` alanı değişti (`durmak` çıktı). `durmak` artık yalnız `lx:stehen#2` (A2) kartında; düzey ve sıra kararı lex/baş geliştiricide.
- `lx:nett` b1 (grup dışı) `Das ist sehr ___ von Ihnen`: `lieb` also_ok eksik.
- Recht ö1, ö3, ö4 (eski) üçü de **recht haben**; kartın asıl anlamı (hak) yalnız ö2, ö5, ö6'da.
- fahren b2 çevirisi `Nürnberg şehrine`: doğal değil, ama okur turundan öyle geçmiş olabilir; dokunulmadı.
- Vater ö3, b1–b3 ve Mutter ö1, ö3, b2–b3 `mein Vater` / `meine Mutter`: genel, yer ya da durum yok; bırakıldı. lange ö2 ve b2 `Ich wohne schon lange hier`: aynı gerekçe.
- klar ö5 `erklärt alles klar und ruhig`: doğru, ama gündelik dilde `klar und deutlich` daha sık; bırakıldı.
- zurück b1, b6 ve b2: `da` ve `an` dilbilgisi olarak girer, çeviri (`dönmek`, `geri`) ayırıyor; also_ok yapılmadı.
- Paar ö1 çevirisi `Onlar` ile başlıyor (b2'de `İkisi`); belirsiz değil, bırakıldı.

Sonuç: KAPANDI (yama uygulanınca). Hata oranı 68/50 kart; 3 yeni örneğin, 3 eski örneğin Almancası değişti.
