# Sözlük partisi a2-11 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 28 derin kart (A2 tablosu 23. hafta, 157.–161. gün) · dosya: `content/v2/registry/lexicon/batch-a2-11.json`

Gün ataması (`a2-kesin.json` `lex_doldurma` a2-11): 157 Lotto–Rat (7) · 158 einatmen–leer (7) · 159 beschreiben–Plastik (6) · 160 Gegenteil–übersetzen (6) · 161 Form, rund (2).

## Sayılar
- Geçti (değişiklik yok): 10 kart (Instrument, Oberkörper, beschreiben, Material, Gegenteil, Thema, anders, missverstehen, übersetzen, Form)
- Düzeltildi: 18 kart, **26 düzeltme** (3'ü yalnız `also_ok`, 2'si `freqRank`, 1'i kalıp bağı)
- Kaldı: 0
- Hata oranı: 26 / 28 = 0,93
- `npm run content:validate`: 0 hata, 173 uyarı. Bu partiye ait uyarılar yalnız 8 tane `proposals.json: … kayıtta zaten var` uyarısı (einatmen, Oberkörper, beschreiben, ähnlich, ungefähr, Gegenteil, einfallen, Thema). Öneri kartı kullanıldığı için bu uyarılar bekleniyor.
- `review`: `draft` (okur bekliyor, alana dokunulmadı)

## Düzeltmeler (önce → sonra, gerekçe)

**Almanca ve gerçeklik**
1. `lx:Rat` ö3 ve b3: `Ich habe meine Ärztin um Rat gefragt.` → `Ich habe meinen Arzt um Rat gefragt.` Öğrencinin aile hekimi WORLD'de Dr. Weber, yani erkek (H4, WORLD §206). Türkçe değişmedi.
2. `lx:ausatmen` ö2 ve b2: `damit ich Sie gut hören kann` → `damit ich gut hören kann`. Dinleme sırasında doktor hastanın sesini değil, nefesini duyar. **ich Sie gut hören** "sizi (konuşurken) iyi duyayım" diye okunuyordu. b2 ipucu: `İyi duyabileyim diye derken **damit ich gut hören kann** denir.`
3. `lx:Wecker` ö2: `Warum bist du so spät?` → `Warum kommst du so spät?` **Du bist spät** İngilizceden geçme bir söyleyiş. Doğal olanı **Du kommst spät** ya da **Du bist spät dran**. Türkçe değişmedi.
4. `lx:rund` ö3 ve b2: `Ist die Apotheke heute offen? – Die am Bahnhof ist rund um die Uhr offen.` → `Ist die Tankstelle heute offen? – Ja, die ist rund um die Uhr offen.` Almanya'da eczaneler gece ve tatilde sırayla nöbet tutar. Hep açık bir eczane öğrenciyi yanlış bilgilendirir. WORLD'deki eczane de Vils-Apotheke. Benzin istasyonu gerçekten hep açık olur (`lx:Tankstelle`, 30. gün). Türkçe: `– Benzin istasyonu bugün açık mı? – Evet, orası yirmi dört saat açık.` b2 `tr`: `Evet, orası yirmi dört saat açık.`
5. `lx:ähnlich` ö4 ve b4: `Das Wetter hier ist ähnlich wie in Istanbul.` → `Das Wetter heute ist ähnlich wie gestern.` Bavyera ile İstanbul'un havası benzemez, olgusal iddia yanlıştı (brif md. 8). Ayrıca cümle öğrenciyi belli bir şehre bağlıyordu. Türkçe: `Bugün hava dünküne benziyor.`, b4 ipucu `Dünküne benziyor derken **ähnlich wie gestern** denir.`
6. `lx:ähnlich` ö3: `Klar, wir sind Schwestern.` → `Klar, wir sind Geschwister.` (`lx:Geschwister`, 23. gün). Konuşanın cinsiyeti sabit olmasın (brif md. 4). Türkçe: `Tabii, kardeşiz.`

**Hata notları (`mistakes_tr`)**
7. `lx:Wecker`: `… **auf sechs gemacht** yanlış. Doğrusu …` → `… **auf sechs gemacht** pek denmez. Doğal olan **… gestellt**.` **den Wecker machen** çok gündelik konuşmada duyulabiliyor. Doğru olabilecek Almancayı "yanlış" diye göstermemek gerekir (brif md. 6).
8. `lx:einfallen` 1.: `**Es ist in meinen Kopf gekommen** yanlış` → `… denmez`. Cümlenin dilbilgisi doğru ama alışılmış söz değil (a2-10'daki **neu in Deutsch** düzeltmesiyle aynı ölçüt). Birden çok sözcük değişiyor, çünkü yanlış biçim Türkçe "aklıma geldi"nin birebir çevirisi. Bu fark kaçınılmaz, okur a2-09 ve a2-10'da benzerini GEÇTİ saymıştı.

**Açıklama (`exp`)**
9. `lx:ungefähr` `ipucu_tr`: `Tam emin değilsen sayının önüne **ungefähr** koyarsın.` → `Tam bilmediğin bir sayıyı söylerken önüne **ungefähr** koyarsın.` Eski cümle genel bir kural gibi okunuyordu ve b2 ile çelişiyordu. b2'de sayı yok, **ungefähr** sonda.
10. `lx:verschlafen` `ipucu_tr`: `Geç kalınca …` → `Uyuyakalıp geç kalınca kısaca **Ich habe verschlafen** dersin.` Eski cümle "her geç kalışta" diye okunuyordu.
11. `lx:Plastik` `anlam_tr`: `şişe, poşet ve oyuncak yapılan hafif maddedir` → `şişede, poşette ve oyuncakta kullanılan hafif maddedir`. Eski Türkçe bozuktu: "şişe yapılan madde" yanlış bağlanıyordu.
12. `lx:rund` `ipucu_tr`: kalın parça `**rund um die Uhr**` → `**rund um die Uhr offen**`. Türkçedeki "açık" sözü artık kalın parçada da var. b2 ipucu ile aynı cümle olmaktan da çıktı.

**Boşluk ipuçları (Türkçe söz kalın parçayla örtüşsün, genel kural gibi okunmasın)**
13. `lx:Spaziergang` b3: `Ne dersin derken **Wie wäre es mit** denir.` → `Yürüyüşe ne dersin derken başta **Wie wäre es** denir.` Eski hâl genel kural gibi okunuyordu ve aynı partide çelişki doğuruyordu: `lx:Konzert` b2'de "ne dersin" sorusu **Hättest du Lust auf** ile veriliyor.
14. `lx:Werkzeug` b1: `Bir alet derken **ein Werkzeug** denir.` → `Tamir için gereken bir alet derken …`. Eski hâl genel kural gibi okunuyordu ve aynı partideki **Ladegerät** (şarj aleti, **Gerät** = alet) ile çelişiyordu.
15. `lx:Haustier` b4: `Bir evcil hayvan istiyor …` → `İlle de bir evcil hayvan istiyor …` (kalın parçada **unbedingt** var).
16. `lx:Weltreise` b4: `Harika olurdu …` → `Şimdi harika olurdu …` (kalın parçada **jetzt** var).
17. `lx:Ladegerät` b2: `Şarjı bitmesin diye …` → `Telefonunun şarjı bitmesin diye …` (kalın parçada **dein Handy** var).
18. `lx:leer` b2: `Şarjı bitmiş olmasın diye …` → `Yarın şarjı bitmiş olmasın diye …` (kalın parçada **morgen** var).
19. `lx:ungefähr` b4: `Aşağı yukarı derken **ungefähr so groß** denir.` → `Aşağı yukarı telefon büyüklüğünde derken **ungefähr so groß ist wie ein Handy** denir.` Kalın parça Türkçe sözden genişti.

**Türkçe çeviri**
20. `lx:einatmen` ö5: `Yine normal nefes alabiliyor musun?` → `Artık normal nefes alabiliyor musun?` "Yine" sözü "bir kez daha" diye de okunabiliyordu. **wieder normal** burada "eskisi gibi" demek.

**`also_ok` eksikleri (haksız ret riski)**
21. `lx:Rat` b1, b2: + **Ratschlag**. **einen Ratschlag geben** ve **Danke für den Ratschlag** doğru ve sık. Kart B1'de (186. gün), burada yalnız kabul ediliyor.
22. `lx:einatmen` b1: + **atmen**. Türkçedeki "nefes almak" hem **atmen** hem **einatmen** demek. b2 ve b4'te zaten kabul ediliyordu.
23. `lx:Wecker` b2: + **stell** (konuşmadaki **Ich stell den Wecker**, **hab** gibi).

**Kalıp bağı**
24. `lx:Lotto`: `pt:ich-habe` çıkarıldı. Kartta **Ich habe** + ad yapısı hiç geçmiyor. **Ich habe im Lotto gewonnen** yalnız `pt:perfekt-haben` örneği. Kartta 2 kalıp kaldı.

**Sıklık**
25. `lx:Konzert` + `freqRank: 2713` (tek biçimli satır **Konzert**).
26. `lx:Spaziergang` + `freqRank: 3358` (tek biçimli satır **Spaziergang**).
- Eklenmeyenler: **Rat** (satır `raten`, fiil biçimleri karışık), **anders** (satır `anderer`), **Form** (satır `formen`). Bu satırlarda adın kendi sayısı ayrılamıyor. Diğer 13 `freqRank` doğru.

## lex'in açık notlarına cevap
- **`lx:Rat` `pl: "-"`:** Doğru. **Räte** başka anlamın çoğulu (kurul, danışman). "Tavsiye" anlamının kendi çoğulu yok, onun yerine **Ratschläge** kullanılır (B1 kartı). Kart böyle kaldı.
- **also_ok "Tipp" (kartsız):** Kaldı. **einen Tipp geben** ve **Danke für den Tipp** doğru, hatta **Rat**'tan daha sık. also_ok öğretmez, yalnız haksız reti önler. **Ratschlag** da eklendi (21).
- **einfallen birebir çeviri notu:** Birden çok sözcüğün değişmesi kaçınılmaz, çünkü hata cümlenin tamamını birebir çevirmekten doğuyor. "yanlış" yerine "denmez" yazıldı (8).
- **Ladegerät parçalarında `Gerät`:** Bırakıldı. Parça Türkçe karşılığıyla birlikte veriliyor ve üretim istemiyor (a2-10'daki **Fortschritt/Schritt** kararı). Bununla çelişen `lx:Werkzeug` b1 ipucu düzeltildi (14).

## Denetim
- **İleri gönderme (betik + elle):** örnek, eşdizim, boşluk, ipucu, not ve parçalardaki bütün sözcükler kart günleriyle karşılaştırıldı. 157 ve sonraki günlerin kartı ile B1 kartı yok. Betiğin tek alarmı **damit** (`lx:damit` 169. gün, "bunun için" anlamı). Bağlaç olan **damit** 158. günün dersi (`gr:a2-14:t4`) ve yalnız 158.+ kartlarında geçiyor. Kartsız sözcükler özel ad, bileşik söz ya da bilinen parçalardan oluşan sözler: **Markus**, **Jonas**, **Bayern**, **Türkei**, **Türkisch**, **guttun**, **hierhin**, **morgens**, **Plastiktüte** (yalnız notta). **Tipp** yalnız also_ok'ta geçiyor. Parçalar (**Gang**, **Werk**, **Zeug**, **ober**, **wecken**, **Gerät**) Türkçesiyle veriliyor. **wollte** (99. gün), karşılaştırma (**größere**, **besser**, 25. gün) ve **beim** (81. gün) önceden öğretilmiş.
- **Dil noktası sırası:** **hätte/würde/wäre** yalnız 157.+ kartlarında. **um … zu/damit** yalnız 158.+ kartlarında. İlgi cümlesi (**Ding, das man …**) yalnız 159.+ kartlarında. 157. günün 7 kartının hepsinde **hätte/würde/wäre** var. 158. günün 7 kartının hepsinde **um … zu** ya da **damit** var. 159. günün 6 kartının hepsinde ilgi cümlesi var. 161. günün iki kartında da tarif cümlesi var (Form ö1, rund ö1).
- **Fiil alanları:** einatmen, ausatmen (atmete ein/aus, hat eingeatmet/ausgeatmet), verschlafen (verschläft, verschlief, hat verschlafen), beschreiben, einfallen (fiel ein, **ist** eingefallen, dat), missverstehen (missverstand, hat missverstanden, ön ek ayrılmaz), übersetzen (übersetzte, hat übersetzt, ön ek ayrılmaz) doğru.
- **Ad alanları:** artikel ve çoğullar doğru (Lottos, Weltreisen, Haustiere, Instrumente, Konzerte, Spaziergänge, Oberkörper, Wecker, Ladegeräte, Werkzeuge, Materialien, **das Plastik** "-", Gegenteile, Themen, Formen).
- **Öneri kartları:** 8 öneri kartında `tr`, `pos`, `art`, `pl`, `verb`, `level` önerilerle uyumlu (Thema A1). `tr` kısaltılmış ya da eş anlamlı, `domains` genişletilmiş.
- **Kalıp bağları:** kalan bütün bağlar kartın kendi sözcüğünün geçtiği bir örnekte gerçekten var. Tek istisna Lotto'nun `pt:ich-habe` bağıydı, çıkarıldı (24).
- **Boşluk ipuçları:** 112 ipucunun bütün kalın parçaları, doldurulmuş cümlede harfi harfine geçiyor (betik: sapma 0). Her boşlukta tek `___` var.
- **WORLD ve kimlik:** aile hekimi bağı düzeltildi (1). Hausmeister "kapıcı" olarak çevrilmiş, kart çevirisiyle uyumlu. Kalıcı karakter adı yok, tarihli yeni olay yok. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Bairisch yok.
- **Olgusal iddia:** İstanbul havası ve hep açık eczane iddiaları kaldırıldı (4, 5). Başka yasa, süre ya da rakam iddiası yok. `SOURCES.md`'ye satır gerekmedi.
- **OD-9:** dilbilgisi terimi taraması 0. İngilizce köprü, üç nokta, `;` ve tırnak yok. Para geçmiyor.

## Değişen Türkçe alanlar (okur için, 21 satır)
- `mistakes_tr` (2): `lx:Wecker` (1.), `lx:einfallen` (1.).
- `exp` (4): `lx:ungefähr` `ipucu_tr`, `lx:verschlafen` `ipucu_tr`, `lx:Plastik` `anlam_tr`, `lx:rund` `ipucu_tr`.
- Örnek çevirileri (4): `lx:einatmen` ö5, `lx:ähnlich` ö3, `lx:ähnlich` ö4, `lx:rund` ö3.
- Boşluk `tr` (2): `lx:ähnlich` b4, `lx:rund` b2.
- Boşluk `hint_tr` (9): `lx:Weltreise` b4, `lx:Haustier` b4, `lx:Spaziergang` b3, `lx:ausatmen` b2, `lx:Ladegerät` b2, `lx:leer` b2, `lx:ähnlich` b4, `lx:ungefähr` b4, `lx:Werkzeug` b1.

## Kalan şüpheler (düzeltilmedi)
- Kalıp kayıtlarında `pt:es-waere-nett`, `pt:um-zu` ve `pt:relativsatz` için `level: "B1"` yazıyor. Ama bu yapılar A2'de öğretiliyor (157. gün `gr:a2-14:t3` içinde **Es wäre schön, wenn …**, 158. gün, 159. gün). Bu bir kayıt meselesi.
- `lx:Form` ö4 `Bu da ne biçim bir şey?`: "ne biçim" Türkçede biraz küçümseyici. Almancadaki **Was ist das denn für ein Ding?** de şaşkınlık taşıdığı için bırakıldı.
- `lx:Instrument` ö2 ve `lx:übersetzen` ö2'de konuşan birinci kişi, **Meine Tochter** diyor. Cinsiyet içermiyor, kişisel bilgi değil. Bırakıldı.
- `lx:einatmen` ö3, ö5'te **nicht richtig einatmen** ve **normal einatmen** var. Gündelik dilde daha çok **atmen** denir. Yine de doğru Almanca ve kartın sözcüğü, ayrıca b2 ile b4 **atmen** biçimini de kabul ediyor.
- `tier`: 6 kartın sıklık satırı K2 (Instrument, Konzert, Spaziergang, einatmen, Werkzeug, Material). 10 kartın satırı yok (Lotto, Weltreise, Haustier, ausatmen, Oberkörper, Wecker, verschlafen, Ladegerät, Plastik, missverstehen). 3 kartın satırı başka sözcüklerle karışık (Rat, anders, Form). Kartlarda K1 yazıyor. A2 partilerinin ortak yolu bu (İÇ-K3).

## Sonuç
Bulunan bütün hatalar dosyada düzeltildi. Doğrulayıcı 0 hata verdi.

Sonuç: KAPANDI, okur bekliyor

## Fark turu (okur 6 GERİ)

Kaynak: `docs/v2/reviews/okur/lexicon-batch-a2-11.md`. Okurun önerileri esas alındı, her alan tek fikir. Yalnız bu 6 alan değişti.

1. `lx:einatmen.forms[0].hint_tr`: → `Doktor kısaca **langsam einatmen** de der, bu da yavaşça nefes alın demek.` Doktorun kısa komut biçimi artık açıkça söyleniyor, **Atmen Sie ein** ile çelişmiyor.
2. `lx:ausatmen.forms[0].hint_tr`: → `Doktor kısaca **langsam ausatmen** de der, bu da yavaşça nefes verin demek.`
3. `lx:ausatmen.forms[3].hint_tr`: → `Tekrar nefes verin derken doktor kısaca **wieder ausatmen** der.`
4. `lx:beschreiben.exp.ne_zaman_tr`: → `Yol tarif ederken, ağrını anlatırken ya da kelimeyi bilmediğinde.` Üç ayrı durum olduğu artık tek okumada anlaşılıyor.
5. `lx:ungefähr.mistakes_tr[0]`: → `Saat yedi gibi derken **wie um sieben** yanlış. Doğrusu **ungefähr um sieben**.` Artık tek fark var (**wie** / **ungefähr**). Doğru biçim, eşdizim 4, ö3 ve b3'teki **ungefähr um sieben** ile aynı.
6. `lx:Werkzeug.exp.ipucu_tr`: → `Adını bilmediğin aleti **Das ist ein Werkzeug, das man zum Reparieren braucht** gibi anlatırsın.` Cümle tam, ö1'de harfi harfine geçiyor.

Denetim: ipucu kalın parçalarında sapma 0. `npm run content:validate` 0 hata, 173 uyarı. `review` alanına dokunulmadı.

Okurun yeniden okuyacağı alanlar (6): yukarıdaki 1–6.

Sonuç (fark): KAPANDI
