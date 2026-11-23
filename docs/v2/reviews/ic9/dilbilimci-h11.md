# İÇ-9 · A2 11. hafta · dilbilimci turu (gün 71–77)

Tarih: 2026-11-23 · dilbilimci-ajan · tek tam tur.
Dosyalar: `content/v2/m1/gun-71.json` … `gun-77.json`, `hafta-sonu-testi-11.json`, `gorulmemis-11.json`, `registry/grammar.json` içinde `gr:a2-03:t1`–`t5` (yalnız okundu, değişmedi).

## Özet

İncelenen: 696 Almanca satır, 1335 `accepted` biçimi, 1274 Türkçe satır (5 dil noktası açıklaması ayrıca).
Bulgu: **19** (A 1 · B 7 · C 11). Hepsi düzeltildi. Hata oranı: 19 / 696 Almanca satır = %2,7.
Denetim (`kontrol.sh 11 --tam`): doğrulayıcı 3 hata (yalnız bilinen "sözlükte yok": Quittung, Umtausch, Einkaufswagen), dikiş `İhlal: 0`.
`review`: yedi gün dosyasında `status: "draft"`, `by: "dilbilimci-ajan"`, `at: "2026-11-23"` (1. hafta düzeni; okur kapısı bekliyor).

A = yanlış / öğrenciyi yanıltır ya da haksız ret · B = doğal değil, olgu, tutarsızlık · C = küçük.

## Bulgular (dosya · yer · eski → yeni · neden)

### A
1. gun-77 · `m1:77:s7` (tr_de "İş için bir fişe ihtiyacım var.") · accepted yalnız **Quittung** → `Ich brauche einen Kassenbon für die Arbeit.` ve `Für die Arbeit brauche ich einen Kassenbon.` eklendi · 73. günde "fiş" = **Kassenbon** diye öğretildi; doğru cevap reddediliyordu.

### B
2. gun-73 · `m1:73:v1:c1` situation_tr · "Gerti sana ekmek isteyip istemediğini soruyor…" → başına "Ertesi sabah yine fırındasın." · sahnede (s7) son ekmek Tobi'ye verildi; aynı anda ekmek teklifi çelişiyordu.
3. gun-74 · prova n3 · `Möchten Sie einen Kuchen?` → `Möchten Sie ein Stück Kuchen?`; seçenekler `Dann nehme ich einen` → `… eins`, `Ja, dann nehme ich ein Stück Kuchen.`; yanlış seçenek `keinen` → `keins`; geri bildirimler uyarlandı · kafede "einen Kuchen" bütün bir kek demek.
4. gun-76 · h1 `lx:Geschichte` 2. görev cümlesi · `Mein Fach in der Schule war Geschichte.` → `Das Fach Geschichte war in der Schule schwer.` (+2 biçim), tr "Okulda tarih dersi zordu." · "Mein Fach" öğrenci için doğal değil ve Türkçesi belirsizdi. (İlk deneme `Lieblingsfach` doğrulayıcıda bilinmeyen çıktı, bilinen sözcüklerle yeniden kuruldu.)
5. gun-77 · h1 mini sahne 4. satır, v1 s2, s12 · `der Zug` / `Vor dem Zug` → `der Faschingszug` / `Vor dem Faschingszug` · sahne istasyonda geçiyor; "Zug" tren olarak anlaşılıyordu.
6. gun-77 · `m1:77:s3` dikte · `Auf jeder Flasche sind fünfundzwanzig Cent Pfand.` → `Auf der Flasche …` · olgu: 25 sent yalnız tek kullanımlık şişe ve kutuda; çok kullanımlıkta 8 ya da 15 sent.
7. gun-77 · `m1:77:a1:c1` accepted · `…das Kilo kostet einen Euro neunundzwanzig.` biçimi eklendi · `kostet` ile kurallı biçim eksikti (haksız ret riski).
8. gorulmemis-11 · g5 accepted[2] · `Die Bratwurst und das Wasser sind von mir.` → `Ich zahle die Bratwurst und ein Wasser.` · "sind von mir" bu anlamda Almanca değil.

### C
9. gun-71 · h2 accepted · `wenn ich mich für etwas sehr interessiere` → `wenn ich mich sehr für etwas interessiere` · kelime sırası.
10. gun-72 · prova n2 geri bildirim · "**doch** itirazı yumuşatır" → "**doch** karşı tarafa indirimi hatırlatır" · işlev yanlış anlatılmıştı.
11. gun-73 · h1 tr · "Nerede? Hiç görmüyorum." → "Nerede? Ben kimseyi görmüyorum." · Türkçe.
12. gun-73 · prova n3 geri bildirim · "**der Pullover** eril:" → "**der Pullover** için" · OD-9 terim.
13. gun-75 · prova n4 3. seçenek · accepted 2 → 3 (`Hier sind dreizehn Euro sechzig.`) · D-064.
14. gun-75 · `m1:75:a1:c1` accepted · `Hallo, {name}. Samstag…` → `Hallo, hier ist {name}. Samstag…` · telesekretere kendi adına seslenmek gibi duruyordu.
15. gun-76 · a2 c6 tr · "Sonra görüşürüz, değil mi!" → "… tamam mı!" · buradaki **gell** soru değil, pekiştirme.
16. gun-76 · prova n4 geri bildirim · "Fırında küçük bahşiş de olur." → "Fırında bahşiş şart değil ama hoş karşılanır." · fırın tezgâhında bahşiş alışılmış değil.
17. gun-77 · a1 c3 · `sechs Flaschen für zwei Euro, mit Pfand` → `… für drei Euro fünfzig, mit Pfand` (tr ve ayrıntı sorusunun doğru şıkkı "Üç avro elli") · altı şişenin depozitosu tek başına 1,50 avro; fiyat gerçek dışıydı.
18. gun-77 · h1 tr · "Bir fiş lütfen, ihtiyacım var." → "Bir fiş rica ediyorum." · Türkçe.
19. gun-77 · prova n5 accepted · `Nein, danke. Keine, bitte.` → `Nein, danke. Ich brauche keine.` · doğal değil.

## Olgu doğrulamaları

- **Depozito:** tek kullanımlık şişe ve kutu 25 sent; çok kullanımlık çoğunlukla 15 sent, bira şişesi 8 sent. "Fünfundzwanzig Cent pro Flasche" (s5, prova n2) tek kullanımlık su şişesi için doğru. Kaynak: https://www.verbraucherzentrale.de/wissen/umwelt-haushalt/abfall/mehrweg-oder-einweg-unterschiede-und-regeln-beim-pfand-11504
- **Pazar günü istasyon dükkânı:** Bayerisches Ladenschlussgesetz (25.07.2025): pazar ve tatilde dükkânlar kapalı (Art. 2); yolcu istasyonlarındaki satış yerleri kapanış saatleri dışında "Reisebedarf" satabilir (Art. 4 Abs. 2), buna küçük miktarda gıda dahil (Art. 4 Abs. 5). Su ve muz sahnesi hukuken doğru. Hafta içi 20.00 kapanış (72. gün broşürü 8–20, 73. gün 9–19) da uyumlu. Fırınlar pazar günü en çok 3 saat açabilir (Art. 3 Abs. 3); 76. gündeki "Am Sonntag haben wir geschlossen" de mümkün. Kaynak: https://www.gesetze-bayern.de/Content/Document/BayLadSchlG/True
- **Takvim:** Unsinniger Donnerstag 4.2.2027, alay pazar 7.2., "Am Mittwoch ist Fasching vorbei" (10.2. Aschermittwoch): WORLD §4 ile aynı.
- **Bahşiş:** `gr:a2-03:t5` "%5-10, öderken söylenir" doğru; sahnelerdeki tutarlar buna uyuyor.

## Bairisch ve üslup

Bairisch yalnız WORLD §5: Grüß Gott, Servus (Tobi, du), Ja mei ve gell (Frau Brandl). Başka lehçe biçimi yok. Semmel, Breze, Krapfen, Gasthaus bölge standardı, lehçe değil.
du/Sie: Tobi–öğrenci du; Wimmer herkese Sie (Derya'ya "Frau Aksoy", Tobi'ye "Herr Lechner"); Gerti ve Frau Brandl Sie; Frau Brandl–Jonas du. WORLD §3 ile tutarlı.
Kimlik: öğrenci adı yalnız `{name}` (75 a1, 76 a2); `audio_de` ve ses metinlerinde yer tutucu yok.

## Yazarın açık soruları

- **Kalıp satırındaki sözlük dışı sözcükler:** Krapfen, Kostüm, Café, Stadtplatz, Gasthaus dilce uygun; cins ve hâl her kullanımda doğru (einen Krapfen, ein Kostüm / keins, im Café, auf den / am Stadtplatz, im Gasthaus). Öğrenci artikeli yalnız kalıptan görüyor; kart yok. Lex bir sonraki partide bu beşini (özellikle Krapfen, Gasthaus) karta almalı.
- **77. gün, pazar sahnesi:** doğru (yukarıda). Tek çekince gerçeklik: 18.000 kişilik şehrin istasyonunda iki kasalı, alışveriş arabalı market büyük şehir ölçüsü; metin "küçük market" dediği için bıraktım.
- **25 sent depozito:** tek kullanımlık şişe için doğru; genelleme yapan tek cümle düzeltildi (bulgu 6).
- **Yeni yan kişiler:** Frau Kowalczyk (kasiyer) sorunsuz. Frau Moreau (kurs öğretmeni, martta ayrılıyor) ve Jonas (Gerti'nin cumartesi yardımcısı, mayısta Abitur) dünyaya kalıcı ayrıntı ekliyor; WORLD'e not düşülmeli, yoksa sonraki haftalar çelişebilir.

## Düzeltmediklerim (karar baş geliştiricide)

1. **Frau Brandl'ın "Abitur hikâyesi"** (76 v1 s6, a2 c4): WORLD §3 kuralı kalıcı karaktere tanımsız geçmiş eklemeyi yasaklıyor. Hikâye anlatılmıyor, yalnız anılıyor; iskelette onaylı olduğu için dokunmadım. Ya WORLD'e yazılmalı ya da "eine lange Geschichte" olarak genelleştirilmeli.
2. **Usta dikte, çok cümleli satır** (74 v1 d4, 74 a2 d4, 77 v1 d4): ses satırı iki-üç cümle, `accepted` yalnız birini içeriyor. FORMAT "tek cümle yazdırır" diyor; ama ses bütün satırı çalıyorsa bütününü yazan öğrenci reddedilir. Oynatma tek cümleyi kesmiyorsa bu üç madde tek cümleli satıra taşınmalı.
3. **75. gün iki sahne arasında küçük tutarsızlık:** halka sahnesinde Derya masa soruyor, ana sahnede rezervasyon var ("Ja, auf Aksoy").
4. **76 prova n3:** "Nein, danke, das ist alles" dalından sonra Gerti'nin "Heute sind die Krapfen sehr gut" cümlesi biraz havada kalıyor; iki dal aynı düğüme gidiyor.
5. **Türkçe hitap:** çevirilerde "Wimmer Bey / Stadler Hanım" ile "Herr Wimmer / Frau Brandl" karışık. Proje genelinde tek biçim seçilmeli; bu haftada dokunmadım.
6. **Quittung / Kassenbon:** ikisi de "fiş" diye çevrili. Lex kartı yazarken Quittung'a "makbuz, fiş" denmesi ayrımı kolaylaştırır.
7. **`gr:a2-03:t1`–`t5` açıklamaları:** dilce ve olguca doğru, İngilizce köprü yok. Ama "yan cümle, çekimli fiil, zamir, Akkusativ, eril, mastar" terimleri duruyor (OD-9.2 md. 3). Yazarın görevi yalnız İngilizceyi temizlemekti; terim sadeleştirmesi okur kapısının işi, değiştirmedim. t3 "welche"yi yalnız çoğul için anlatıyor; 73. günde süt için de kullanılıyor (doğru), okur turunda bir cümle eklenebilir.

## Ek düzeltmeler (baş geliştirici kararıyla, 1f1c322 sonrası, aynı tur)

Düzeltmediklerim listesindeki 1–5. maddeler kapandı; 6 ve 7 açık kalıyor (lex ve okur işi).

1. gun-76 · v1 s6 · `Das Abitur! Da habe ich auch eine Geschichte …` → `Das Abitur! Ich habe eine Geschichte für Jonas …` · a2 c4 · `meine Geschichte vom Abitur` → `eine lange Geschichte` (Türkçeleri uyarlandı) · Frau Brandl'a WORLD'de olmayan kişisel geçmiş yüklenmiyor.
2. Usta dikte: gun-74 v1 d4 `cumle` s11 → s2 (tek cümleli satır: `Ich hätte gern zwei Krapfen, bitte!`); gun-74 a2 d4 ve gun-77 v1 d4 `accepted` artık bütün satır (`… Bis Sonntag!`, `Hast du Bargeld? …`). Doğrulayıcı aynı listede tek cümle ile bütün satırı birlikte kabul etmiyor ("başka bir cümle"), bu yüzden yalnız bütün satır kaldı.
3. Türkçe hitap: 1.–7. ve 71.–77. günlerde çoğunluk "Herr / Frau + soyad"; 71, 73, 74, 76, 77'deki 13 "Bey / Hanım" satırı buna çevrildi.
4. gun-75 · v1 s2 · `Ja, auf Aksoy. Einen Tisch für drei Personen.` → `Nein, leider nicht. Einen Tisch für drei Personen, bitte.` · halka sahnesiyle (rezervasyonsuz masa sorma) tutarlı.
5. gun-76 · prova · "Nein, danke, das ist alles" dalı yeni `n3b` düğümüne gidiyor (`Gern. Und hier, eine Breze für Sie. Die schenke ich Ihnen!`; iki uygun, bir uygunsuz seçenek, sonra n4). Tavsiye dalı n3'te kaldı.

Denetim (`kontrol.sh 11 --tam`): `→ 3 hata, 358 uyarı` (yalnız Quittung, Umtausch, Einkaufswagen), dikiş `İhlal: 0`. Uyarı 357 → 358: 74 v1 d4 artık "krapfen" yazdırıyor (kalıpta gösterilmiş, kartı yok; aynı sınıftan bilinen uyarı).

## Okur düzeltmeleri (okur GERİ, 78 madde; `docs/v2/reviews/okur/ic9-h11.md`)

Hepsi uygulandı. Almanca satırlara ve `accepted` listelerine dokunulmadı; yalnız Türkçe açıklama alanları değişti.

- **A (25):** "fiil", "ana cümle", "çoğul" kaldırıldı, yerine kelimenin kendisi yazıldı (ör. "**wenn** parçasında **ist** en sonda", "virgülden sonra hemen **gehen wir**", "Birden çok şey için **welche**"). "Kapı" → "Haftanın son provası / son görevi" (77 prova başlığı, n3 geri bildirimi, s11; hafta testi t12). 72 s9 → "**Gutschein** ve **Blumenstrauß** için **einen** dersin." 74 n4 → "**hätte** ile **würde** birlikte olmaz." 75 kalıp → "… yapar mısın? – … yapardım." 76 başlığı → "Fırında sıra ve sipariş".
- **Okurun listesinde olmayan, aynı kusurlu 2 satır:** 71 ve 72 `kontrol_tr` içindeki "fiil" de kaldırıldı.
- **B (44):** 16 `;` iki cümleye bölündü (şıklarda virgül); 2 uzun `kapanis_tr` bölündü; 26 `why_tr` / `geri_bildirim_tr` içindeki `…` tam örnekle değişti (ör. **Ich hätte gern einen Kaffee.**, **Wie viel Pfand ist das?**).
- **C (9 alan):** `gr:a2-03:t1`–`t5` `tr` yeniden yazıldı; t2 `h_tr` → "wenn parçası başta: virgülden sonra koche ich"; tablo başlıkları t1 "ilk parça · wenn ile başlayan parça · en sondaki kelime", t2 "baştaki parça · hemen sonraki kelime · cümlenin kalanı", t3 "Da ist ile · Ich habe ile · örnek" ve satır etiketi "birden çok: die Teller". Terim, `=`, `;`, `→`, `%`, "(a1-12)" yok; her cümle ≤ 14 kelime; Almanca **kalın** işaretli. t3'e eklendi: "**die Milch** gibi sayılamayan şeyler için de **welche** dersin". Kural ve anlam aynı; tablonun Almanca hücreleri ve `ex` değişmedi.

Not: `grammar.json` içinde `**kalın**` işareti ilk kez bu beş konuda kullanılıyor (öteki 197 konu tırnaklı). Bu metni gösteren ekran `Rich` bileşeninden geçirmiyorsa yıldızlar görünür; baş geliştirici bakmalı.

Denetim (`kontrol.sh 11 --tam`): `→ 3 hata, 358 uyarı` (yalnız Quittung, Umtausch, Einkaufswagen), dikiş `İhlal: 0`. Kendi taramam (terim, `;`, `=`, `…`, uzun cümle): kalan 0.

KARAR: ONAY
