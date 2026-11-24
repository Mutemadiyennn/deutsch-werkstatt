# 6. gün halkaları: dilbilimci incelemesi (PM-078 B)

Dosya: `docs/v2/reviews/halka/gun-06-halkalar.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan bağımsız, son metin bir kez, PM-080)

İncelenen: **72 madde** (44 görev cümlesi ve kabul listeleri, 13 sahne satırı, 5 soru, 10 kalıp).
Denetim (düzeltmelerden sonra; 1.–5. günün son hâli bilinen sayılarak): `halka_kontrol.py` → **0 hata, 0 not**; `kucuk_sozcuk.py` → **0 hata**. Yeni sözcük eklenmedi. Almanca kalıp metni değişmedi (7. gün yine de yeniden koşuldu: 0 hata).

## Bulgular ve düzeltmeler

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h5 sahne (ortam, 2. satır, soru) | **Gerçeklik ve tarih mantığı.** (a) Resmî tatilde kapalı muayenehanenin telefonunu sekreter açmaz. (b) WORLD takviminde 1 Mayıs 2027 cumartesi: „Morgen ist die Praxis wieder offen“ pazara düşüyor. Karşı taraf artık Brandl Hanım (merdivende), açılış **am Montag**. Soru yeniden çıkarım: metinde „tatil“ sözü yok, 1 Mayıs'tan bulunuyor (Türkiye'de de tatil). Öğrencinin satırı değişmedi. | ortam „… Telefonla Huber Hanım'ı arıyorsun.“ → „… Eve dönünce merdivende Brandl Hanım'a soruyorsun.“ · `ch:huber` „Heute ist der erste Mai. Morgen ist die Praxis wieder offen.“ → `ch:brandl` „Heute ist der erste Mai. Am Montag ist die Praxis wieder offen.“ (tr „… Pazartesi günü muayenehane yine açık.“) · soru „Muayenehane ayın kaçında yine açık?“ (İki mayısta) → „Muayenehane bugün neden kapalı?“ (Bugün resmî tatil; çeldiriciler: Dr. Weber izinde, Öğle arası, Bugün çarşamba, öğleden sonra kapalı) |
| 2 | h1 `lx:vierter` 1. cümle, kabul listesi | Yanlış varyant: düz cümlenin karşılığı olarak soru + „Ja.“ kabul ediliyordu. | „Ist der vierte Dezember ein Freitag? Ja.“ → „Am vierten Dezember ist Freitag.“ |
| 3 | Kabul listelerinde fazla ya da eksik anlam (9 satır, aynı kök) | Türkçede olmayan sözcük taşıyan ya da cümlenin yarısını atan öğeler (3. gün bulgu 4 ile aynı tür). Yerlerine aynı anlamlı varyant kondu. | h1 „Am ersten Mai ist das **neue** Büro geschlossen.“ → „Am ersten Mai ist das Büro nicht offen.“ · h2 „Die Praxis heißt Dr. Weber?“ (ilk soru yok) → „Wie heißt die Praxis? Heißt die Praxis Dr. Weber?“ · h3 „Wo ist die Praxis **Dr. Weber**, …“ → „Wo ist denn die Praxis, Frau Huber?“ · h3 „Heute? Wo ist Tobi?“ → „Wo ist denn Tobi heute?“ · h3 „Wohin gehen Sie **heute**, …“ → „Wohin gehen Sie denn, Frau Brandl?“ · h4 „Brauchen Sie **noch** meine Nummer?“ → „Sie brauchen meine Nummer?“ · h4 „Brauchen Sie **noch** mein Geburtsdatum?“ → „Sie brauchen mein Geburtsdatum?“ · h5 „Wie viel Urlaub haben Sie **im Jahr**?“ → „Wie viel Urlaub haben Sie denn?“ · h5 „Wie oft gehen Sie **in die Praxis**?“ (muayenehaneye ≠ doktora) → „Wie oft gehen Sie denn zum Arzt?“ |
| 4 | h1 `lx:zweiter` 2. cümle ve h5 `lx:oft` 1. cümle, kabul listesi | Haksız ret: iki doğru ve çok yaygın varyant eksikti. **Geburtstag haben** en doğal biçim (günün okuması da böyle soruyor: „Wann hast du Geburtstag?“). Türkçe „izin **yapıyor** musunuz“ öğrenciyi 4. günün `machen`'ine götürür; **Urlaub machen** doğru. | + „Haben Sie am zweiten Mai Geburtstag, Frau Brandl?“ · + „Machen Sie oft Urlaub, Frau Huber?“ |
| 5 | h5 2. kalıp (tr) ve `lx:sehr` 2. cümle (tr) | „Çok memnuniyetle“ Türkçede söylenmez (yazarın 3. sorusu). | kalıp „Çok teşekkürler! – Çok memnuniyetle!“ → „Çok teşekkürler! – Seve seve! (çok memnuniyetle)“ · cümle „Çok memnuniyetle Wimmer Bey!“ → „Seve seve Wimmer Bey!“ |
| 6 | h3 1. kalıp (tr) | „Nerelisin? – …'den“ Türkçede birbirini tutmuyor („Nerelisin? – Ankaralıyım“); **aus** = „-den“ bağı açıklamasız kalıyordu. | „Nerelisin? – …'den, …'dan.“ → „Nerelisin? (kelimesi kelimesine: nereden geliyorsun?) – …'den, …'dan.“ |
| 7 | h4 sahne sorusu (tr) | „daha eksik“ iki anlamlı („daha çok eksik“ gibi de okunur). | „… hangi bilgi daha eksik?“ → „… hangi bilgi hâlâ eksik?“ |

Ağırlık: 1 sahne gerçekliği ve tarih mantığı (en ağır), 2 kabul listesinde yanlış varyant, 3 kabul listesinde fazla/eksik anlam, 4 eksik doğru varyant, 5–7 Türkçe. Gösterilen Almanca cümlelerde dilbilgisi hatası yok.

## Yazarın açık soruları: dil açısından görüş

- **Brandl'ın doğum tarihi (soru 1).** WORLD kalsın, prova düzelsin. WORLD: 79 yaşında, doğum günü 2 Mayıs; hikâye 23.11.2026'da başlıyor → doğum 2 Mayıs 1947, yaş tutuyor. Provadaki 24.11.1947 ile Brandl Hanım hikâyenin ilk günü 78 olur: iki olguyla birden çelişir. Prova için doğal karşılık: „Der zweite Fünfte neunzehnhundertsiebenundvierzig.“ → „Also der zweite Mai?“ (çeldirici „der zwölfte Mai“); „**Fünfte** beşinci ay demek“ öğretimi korunur. Resepsiyonda en sık duyulan biçim artikelsiz **zweiter Fünfter siebenundvierzig**; öğrenci bunu duyacak, anlama için bir kez gösterilmeli. Günün sahnesindeki Pichler (3 Mayıs) WORLD'de yok: ya WORLD'e yazılsın ya sahneden çıksın; Brandl'ın 2 Mayıs'ına bu kadar yakın bir tarih karışmaya da açık.
- **„çok“ = sehr / zu (soru 2).** Öneriye katılıyorum (4. gün raporu 2. şüphe, 5. gün 4. şüphe): **zu** = „fazla“ (gerektiğinden çok: „fazla pahalı“, „fazla geç“), **sehr** = „çok“. Türkçede ikisi de doğal ve fark Almancadaki farkla aynı. 4.–5. gün Türkçeleri böyle değişirse „sehr teuer“ = „çok pahalı“ açılır. O zamana kadar yazarın sınırı (`sehr` yalnız **danke**, **gern**, **oft** ile) doğru; dosyada sıfatla `sehr` yok.
- **„Sehr gern!“ (soru 3).** „Seve seve!“. Çakışma yok: `lx:gern` kartı „memnuniyetle, severek“ diyor; „seve seve“ „severek“in pekişmiş hâli, **sehr gern** de **gern**'in. Köprü kopmasın diye kalıpta parantez içinde „çok memnuniyetle“ bırakıldı (bulgu 5). Teşekküre cevap olarak **Sehr gern!** „Rica ederim“ yerini de tutar; kalıp tam bu çifti gösteriyor. **Lex'e:** `lx:sehr` kartındaki örnek de „Çok memnuniyetle!“; aynı karşılığa çekilmeli.

## Bakılan, sorun bulunmayan noktalar

- **Tarih dili:** **der erste / zweite / dritte / vierte**, **am ersten … am vierten**, **Heute ist der dritte**, **Welches Datum ist heute?** (yanında **Welches Datum haben wir heute?** kabul listesinde) doğru. Büyük/küçük harf doğru (**der erste**, **am dritten**).
- **Takvim:** 3 Aralık 2026 perşembe, 4 Aralık 2026 cuma (h1); günün sesiyle aynı (randevu 3 Aralık saat dokuz). h3: iş saat dörtte, randevu dört buçukta.
- **wie / was:** **Wie heißen Sie?**, **Wie ist Ihr Vorname / Nachname?**, **Wie ist die Adresse?**, **Was heißt …?** doğru; kalıptaki „(burada „ne“ = wie)“ notu yerinde.
- **wo / wohin / woher:** **zum Arzt**, **in die Praxis**, **aus Wendlfing** doğru. **Woher kommen Sie?** = „Nerelisiniz?“ kartla aynı.
- **Form dili:** **Ich brauche noch Ihre Adresse und Ihre Telefonnummer.** resepsiyonda aynen duyulur; **Geburtsdatum** / **Geburtstag** ayrımı doğru çevrilmiş.
- **WORLD:** Rosa Brandl, Josef Pichler, Derya Wendlfing'li, Brunnengasse 7, Brandl'ın doğum günü 2 Mayıs. Wimmer, Huber, Schneider, Brandl, Pichler, Stadler **Sie**; Tobi **du**. Yeni olgu yok. Bairisch yok. İngilizce köprü yok.
- **Kimlik:** öğrencinin adı yalnız `{name}`; doğum tarihi ve telefon numarası hiçbir yerde yok.
- **Sorular:** beşi de tek cevaplı. h1 (yarın), h4 (telefon numarası), h5 (resmî tatil) gerçekten çıkarım.

## Kalan şüpheler

1. **Betiğin reddettiği doğru varyantlar** (ekleyemedim, **haksız ret riski açık**): „Çok teşekkürler“ için **Vielen Dank, Frau Stadler!** ve **Danke schön, …** (öğrencinin ilk yazacağı biçimler; `viel`, `Dank`, `schön` kartsız), **Wo kommen Sie her?** (`her`), **Der Wievielte ist heute?** (sokakta **Welches Datum …** kadar sık; en azından anlama için gösterilmeli).
2. **h5 sahnesi (bulgu 1)** içerik kararı da taşıyor: karşı taraf değişti. PM başka çözüm isterse dil açısından tek şart: kapalı muayenehanede telefon açılmasın ve 2 Mayıs 2027 (pazar) açılış günü olmasın. Günün sınavındaki „Am ersten Mai ist die Praxis geschlossen.“ doğru, kalabilir.
3. **„Bis dann!“** (h1, Schneider): doğru; WORLD'deki resmî tarzına göre biraz samimi. Günün sesinde „bis Donnerstag!“ diyor; „Bis morgen!“ çıkarımı bozardı, bu yüzden bıraktım.
4. **„Sık sık izin yapıyor musunuz“** (h5): 2. günde **Urlaub haben** = „iznim var“. Tek karşılık için „Sık sık izniniz oluyor mu“ düşünülebilir; okur seçsin. İki Almanca da artık kabul listesinde (bulgu 4).
5. **„Derya nereli? Wendlfing'den mi?“** (h3): Türkçede „Wendlfingli mi?“ daha doğal; **aus** = „-den“ bağı için bırakıldı, kalıp açıklaması eklendi (bulgu 6).
6. **Yankı soruları** („Frau Brandl ist wie alt?“, „In Nummer drei wohnt wer?“, „Sie haben wie viel Urlaub?“, „Zum Arzt, wie oft gehen Sie?“): yanlış değil, seyrek; önceki günlerin onaylı uygulamasıyla aynı.

## Sonuç

Hata oranı: **7 bulgu / 72 madde ≈ %9,7** (sahne gerçekliği/tarih 1, kabul listesi 3, Türkçe 3). Hepsi dosyada düzeltildi; iki betik 0 hata.

**KAPANDI** (dil açısından). Açık kalan risk 1. şüphe (betiğin reddettiği varyantlar) ve 2. şüphe (h5 sahnesi için PM onayı). Dosyada `review` alanı yok (şema ANA'da). Sıradaki: okur (OD-9).
