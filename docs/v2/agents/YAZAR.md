# YAZAR ajanı — pilot senaryolar (PEDAGOGY.md §5 + aşağıdaki gerçeklik listesi)
Yazma yolu: YALNIZCA `content/v2/domains/{strategie,telefon,arzt}/**`.
Dosyalar: `content/v2/domains/<alan>/scenarios/NN-slug.json` (şema `Scenario`), `content/v2/domains/<alan>/proposals.json` (`{"lexemes": [...], "patterns": []}`), `content/v2/domains/<alan>/SOURCES.md`.

## Senaryolar (11)
- strategie/01 anlamadığını söylemek, tekrar ettirmek, yavaşlatmak (İngilizceye kaçmadan)
- strategie/02 kelimeyi bilmeyince başka sözle anlatmak ("Wie sagt man…", "das Ding für…"), zaman kazanmak
- strategie/03 anladığını kontrol etmek, özetlemek, söz almak/araya girmek, konuşmayı yönetmek
- telefon/01 doktordan randevu (aşağıdaki gerçeklik listesinin TAMAMI)
- telefon/02 randevuyu ertelemek / iptal etmek
- telefon/03 telefonda kontrolü elde tutmak: tekrar ettirmek, yavaşlatmak, harf harf kodlamak (Buchstabiertafel: DIN 5009 yeni şehir adlı biçim + yaygın eski isimli biçim; kaynakla doğrula), numara söylemek/yazdırmak
- telefon/04 telesekreter, bekleme müziği, "Drücken Sie die 1" menüleri, mesaj bırakmak
- arzt/01 şikâyeti anlatmak (ne zamandan beri, nerede, ne kadar)
- arzt/02 doktorun sorularını ve talimatlarını anlamak
- arzt/03 Krankschreibung (AU) istemek ve işyerine bildirmek (hukuki ayrıntı yalnızca kaynakla)
- arzt/04 eczanede ilaç istemek, kullanım talimatını anlamak

## Senaryo standardı (doğrulayıcı zorunlu kılar)
- essentials: 12–20 kelime, 8–15 ifade (chunks[] içinde tanımlı, kimlik `ch:<alan>:<slug>`), 3–6 kalıp (registry/patterns.json'dan; mümkün olduğunca temel kalıplar ve her kalıp birden fazla alanda)
- chunks: layers.hd + layers.alltag (gündelik biçim); Alltag işaretlerinde use_tr (ne zaman, hangi anlamda, hangi tonla)
- build (aşama 3): ≥25 madde {id, prompt_tr, accepted ≥3 varyant (ilk kanonik), pattern?, chunk?}
- drills (aşama 4): ≥35 madde; türlerin hepsi en az bir kez: gap, order, transform, guided_response, listen_and_respond, tr_de (pick isteğe bağlı). Üretim maddelerinde accepted ≥3 varyant (gap ve order'da ≥1 yeterli); kelime sırası alternatiflerini ekle.
- dialogues (aşama 5): ≥3 çeşit; karşı taraf her çeşitte FARKLI tepki verir (ör. randevu var / yok / acil). Her B satırında starter, keywords, hint_tr ve accepted ≥3.
- roleplay (aşama 6): scene_tr, partner_de (karakter tarifi, Almanca), opener_de, goals[] (görev başarı ölçütleri: ör. "randevu alındı", "saat doğru anlaşıldı"), targets (fırsat ifadeleri, şart değil), levels[3] {level 1–3, style_de, speed}, surprises ≥3
- otherSide ≥12; en az yarısı layer "alltag"; HER birinde speed (slow/normal/natural/fast); hızlı konuşmada reductions [{heard, full}] (ör. "haste" → "hast du")
- listening: toplam ≥6 soru; her parçanın İLK sorusu kind "gist", sonra "detail"
- speaking ≥3; missions ≥1 (dış görev: task_tr, prep: ifade kimlikleri, escape_de: 5 kaçış cümlesi)
- Üretim toplamı (build + üretim drill'leri + diyalog B satırları + speaking) ≥80
- review: {"status":"draft"} (dilbilimci kapatana kadar)

## Gerçeklik kontrol listesi (telefon ve doktor senaryolarının hepsi; telefon/01 için eksiksiz)
- Açılış: sekreter adını hızlı söyler ("Praxis Dr. Weber, Huber, grüß Gott?"). Öğrenci bunun bir isim olduğunu yakalamayı öğrenir. Gerekirse önce bekleme anonsu.
- Gerçek sorular: "Sind Sie schon Patient bei uns?", doğum tarihi (hızlı söylenen tarih ve sayı), "gesetzlich oder privat?" / "Welche Krankenkasse?", "Worum geht's denn?"
- Gerçek engeller: "Da hab ich erst was in drei Wochen.", "Kommen Sie in die Akutsprechstunde, ohne Termin.", "Rufen Sie morgen früh um acht nochmal an."
- Krankschreibung/AU konusu. Hukuki ayrıntı (ör. telefonla rapor) yalnızca kaynakla doğrulanırsa yazılır.
- Saat tuzakları: "halb zehn" = 9:30 (Türkçe konuşanların tipik hatası; mistakes_tr'ye yaz), Viertel nach/vor.
- Kapanış: "Passt's Ihnen?", "Geht klar.", "Wiederhören!"
- Öğrencinin hayatta kalma cümleleri: "Wie war das nochmal?", "Etwas langsamer, bitte.", "Ich buchstabiere: …". Buchstabiertafel'in hem yeni (şehir adlı) hem yaygın eski (isimli) biçimi; doğrula.
- otherSide en az 12 cümle, en az yarısı alltag, her birinde speed alanı. listening en az 6 soru. İlk dinleme altyazısız.
- Bairisch yalnızca kaynaklıysa "verified", değilse "uncertain" etiketiyle. Uydurma yok.
- Kişisel bilgi yok. İsimler genel ve çeşitli olsun.
- Her ifade için test: "Bunu yarın gerçekten telefonda duyar mıyım / söyler miyim?" Hayırsa çıkar.

## Kelime kimlikleri
Önce `content/v2/registry/lexemes.v1.json`, `lexemes.v2.json` ve `registry/lexicon/*.json` içinde ara ve oradaki kimliği kullan. Yoksa kendi alanının `proposals.json` dosyasına asgari kayıt ekle: {id "lx:<Lemma>", de, tr, pos, isimde art + pl, level, domains:[alan]} (tier yazma; derin kartı LEX ajanı üretecek). Kalıplar için yalnızca registry/patterns.json kimlikleri; gerçekten gerekirse proposals.patterns (kimlik `pt:<alan>-<slug>`).
## Çalışma sırası
telefon/01 → arzt/01 → strategie/01 → telefon/02 → arzt/02 → strategie/02 → telefon/03 → arzt/03 → strategie/03 → telefon/04 → arzt/04. Her dosyadan sonra validate; bir dosya bitince bir daha dokunma (dilbilimci incelemeye alır) ve rapor satırı yaz: "BİTTİ: <dosya> (üretim N)".
