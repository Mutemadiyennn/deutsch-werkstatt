# İÇ-K3 A2 lex hattı: brif (her lex/dilbilimci ajanı önce bunu okur)

Görev kaynağı: PM-095 md. 4 (A2 bekleyen yuvalar), PM-101 md. 4 (önce atanmamış A2/A1 öneri kartları), PM-105/106 (tasarruf). Tablo: `content/v2/curriculum/a2-kesin.json` (`gunler[].bekleyen` = o günün kimliksiz yuvası). Hafta bağlayıcıdır, gün önerisi. git komutu çalıştırma; yalnız sana verilen dosyaya yaz.

## Önce oku
`docs/v2/LEARNER.md` · CLAUDE.md "Değişmez kurallar" · `docs/v2/PEDAGOGY.md` §2 · `docs/v2/agents/COMMON.md` · `docs/v2/agents/LEX.md` · `docs/v2/WORLD.md` (o haftanın karakterleri; Tobi 14. haftadan sonra yok) · biçim örneği: `content/v2/registry/lexicon/batch-a2-06.json`'dan 3–4 kart (onaylı, okurdan geçmiş) · a2-kesin.json'da kendi günlerinin `title_tr`, `dersler` (→ `content/v2/registry/grammar.json`) ve `kartlar`.

## Sözcük seçimi
- Önce sana adıyla verilen **öneri kartları** (`content/v2/domains/*/proposals.json`'daki `tr`, `pos`, `art`, `pl`, `verb` bilgisini kullan; kimlik aynen).
- Kalan yuva: günün konusuna (başlık + dil noktası + haftanın durumu) uyan, öğrencinin o durumda gerçekten kullanacağı A2 sözcüğü (işlev sözcüğü yok). Önce `content/v2/registry/frequency/lemmas.json` K2 sözcükleri (liste gürültülü: yanlış lemma, özel ad, İngilizce, kaba söz alma); listede olan → `tier` ve `freqRank` listeninki. Listede olmayan gerçek alan sözcüğü → `tier: "K1"`, `freqRank` yok.
- Her adayı denetle, yalnız `yeni` olanı al: `python3 docs/v2/reviews/lex-a2-hat/kontrol.py Sözcük1 Sözcük2 …` (ağaç + v1/v2 + üç tablo + bütün `origin/content/lex-*` dalları; kimlik ve sözcük düzeyi). Eş anlamlısı zaten kartlıysa alma. Takvim kolu kartı (Weihnachten, Advent …) alma.
- Gün sırası: bir kart aynı haftanın **sonraki** gününe atanmış yeni karta (ya da sonraki haftaların kartına) dayanmaz.

## Kart standardı
Dosya: `{"batch":"<ad>","review":{"status":"draft"},"items":[...]}` · id `lx:<sözcük>` (adlar büyük harf; çok sözcüklü `_`) · de · tr (kısa, OD-9) · pos · adda art + pl · fiilde verb{praesens3, perfekt, aux, praeteritum, gerekirse separable/prep/case} · img (kısa İngilizce görsel tarifi; yalnız bu alanda İngilizce) · collocations ≥3 · patterns ≥1 (yalnız `registry/patterns.json` kimlikleri; sayılan kalıp en az bir örnekte gerçekten geçsin) · register · related (yalnız var olan kimlikler) · mistakes_tr ≥1 (Türkçe konuşana özgü) · examples ≥5 (kısa; ≥1 `alltag`, ≥2 iki konuşmacılı diyalog `dialog: true`; Türkçesiyle; o güne kadar öğretilmiş sözcüklerle ve **o günün dil noktasını kullanan en az bir örnek**) · level "A2" (öneri kartında öneri ne diyorsa) · domains (`registry/domains.json`) · exp {anlam_tr, ne_zaman_tr, parcalar, ipucu_tr} · forms (4 boşluk; `answer`, `tr`, `hint_tr`, gerekirse `also_ok`).

## Önceki partilerde dilbilimci / okur / örneklemin geri döndürdükleri — TEKRARLAMA
1. Türkçe açıklamada dilbilgisi terimi YOK (çoğul, tekil, isim, fiil, ek, artikel, hâl, edat, "sein ile kurulur" …): örnekle anlat.
2. Eşdizim çevirisinde "…" yer tutucusu yok; somut kısa sözcük.
3. anlam_tr ve notlar tek okumada anlaşılır; not kartın KENDİ sözcüğünü anlatır.
4. Birinci tekil cümlede sabit cinsiyet yok; öğrencinin adı yalnız `{name}`.
5. Henüz öğretilmemiş (sonraki gün/haftanın) yapıya ya da karta dayanma yok (ör. `um … zu` 158. gün, `damit` 158. gün, `werden` geleceği 155. gün, `hätte/würde` 157. gün, Präteritum yazı biçimleri 148.–149. gün).
6. Doğru Almancayı yanlış diye gösteren not yok; not kartın öğrettiği doğru biçimle çelişmez.
7. forms: başka doğru ve sık cevap varsa `also_ok`'a; başka anlamlı ya da yanlış cevap also_ok'a GİRMEZ; artikeli uymayan ad girmez; also_ok'taki sözcük mistakes_tr'de yanlış diye gösterilmez.
8. Olgusal iddia (yasa, süre, rakam, zorunluluk) yazma; yazarsan kaynağını `SOURCES.md` satırına öner (raporda).
9. Bairisch yok; İngilizce köprü yok; kişisel bilgi, kurs/kitap adı yok; karakter adları WORLD'e uygun ve çeşitli; karaktere tarihi belli yeni olay yükleme.
10. Yazım birliği: para **avro**; kişiler **Stadler Hanım / Wimmer Bey** biçiminde.
11. Ayrılabilen fiillerde boşluk cevabı tek parça olsun (cümleyi buna göre kur), "steige … ein" biçimi yok.

## Bitince
`npm run content:validate` → kendi dosyanda 0 hata. Teslim KISA (en çok 10 satır): gün → kimlik listesi, atlanan adaylar tek satır, validate son satırı, çözülmemiş sorun.

## Hat sırası (İÇ-K3)
lex (2 ajan, ayrı dosya) → tablo doldurma kaydı (kural 7, betikle) → dilbilimci (Opus, 1 tam tur, dosya başına) → okur (yalnız yeni Türkçe satırlar) + örneklem (qa, 30 öğe) → gerekirse dilbilimci fark → `reviewed` → PR → inceleme (1 tam tur + fark).
