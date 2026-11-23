# Sözlük partisi a2-08 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 24 derin kart (A2 tablosu 21.–22. hafta, 146.–149. gün) · dosya: `content/v2/registry/lexicon/batch-a2-08.json`

Gün ataması `a2-kesin.json` (`om:gun:146`–`149`): 146 Bescheinigung–Filiale (5, + var olan Werktag) · 147 geehrt, Anschrift (2) · 148 täglich–aufwachen (9) · 149 einschlafen–hinfallen (8).

## Sayılar
- Geçti (değişiklik yok): 0 kart
- Düzeltildi: 24 kart, **88 düzeltme** (53'ü ipucu kalın parçası, 4'ü yalnız `also_ok`)
- Kaldı: 0
- Hata oranı: 88 / 24 = 3,67 (ipucu biçimi dışında 35 / 24 = 1,46)
- `npm run content:validate`: 0 hata, 157 uyarı (bu partiye ait uyarı yok; önceki 3 OD-9 uyarısı da kapandı)
- `review`: `draft` (okur bekliyor; alana dokunulmadı)

## Düzeltmeler (önce → sonra, gerekçe)

**İleri gönderme (150+ gün kartı)**
1. `lx:Bescheinigung` ö3: `Hast du die Bescheinigung dabei?` → `Hast du die Bescheinigung?` (`Belge sende mi?`). **dabei** `lx:dabei` kartı, 169. gün.
2. `lx:sammeln` ö4: `Bist du dabei?` → `Gibst du auch was?` (`Sen de bir şey verir misin?`). Aynı gerekçe.
3. `lx:vorlesen` ö3: `…, ich hab meine Brille nicht dabei.` → `…, ich seh von hier nix.` (`buradan hiçbir şey göremiyorum`). **dabei** 169. gün, **Brille** B1 partisinin kartı.
4. `lx:Zeitung` ö2: `Die Zeitung berichtete über das Fest …` → `Mein Vater suchte damals in der Zeitung eine Wohnung.` (`Babam o zamanlar gazetede ev aradı.`). **berichten** 200. gün. Yeni cümle günün düzenli biçimini (**suchte**) koruyor. `related`'dan `lx:berichten` çıkarıldı.
5. `lx:gründen` eşdizim 4, ö3, b4: **eigene/eigenes** (`lx:eigen`, 176. gün) atıldı: `ein Geschäft gründen` (`bir işyeri kurmak`), `Er will 'ne Firma gründen …`, `Er will eine Firma ___.`
6. `lx:hinfallen` eşdizim 1, ö1, b1: **auf der Treppe** (`lx:Treppe`, 183. gün) → **auf der Straße** (`sokakta`).

**WORLD**
7. `lx:geehrt` ö5 ve b4: `Kennst du die Frau? – Nein, deshalb … „Sehr geehrte Frau Huber“` → **Frau Berger**. Sabine Huber öğrencinin kendi muayenehanesinin sekreteri; öğrenci onu 3. haftadan beri tanıyor. Hata notundaki **Frau Huber** kaldı: orada tanıdığa resmî yazma örneği, WORLD ile uyumlu.

**Hata notları**
8. `lx:Bescheinigung` 2.: `… **ein Papier vom Arzt** demek resmî daireye yetmez.` → `… **ein Papier vom Arzt** anlaşılır. Resmî yerde doğrusu **eine Bescheinigung vom Arzt**.` Eski not sözün kendisini dairenin şartı gibi gösteriyordu.
9. `lx:Benachrichtigung` 1.: `**Bringen Sie die Benachrichtigung** yarım kalır` → `**Ich bringe mit die Benachrichtigung** yanlış. **mit** sona gider: **Ich bringe die Benachrichtigung mit**.` Eski biçim yanlış sayılamazdı (kural 6). Yeni not kesin bir hata gösteriyor: sözcük sırası.
10. `lx:Zusteller`: `Kargocu zili çaldı derken **Der Zusteller hat die Tür geklopft** yanlış` → `Kapıyı çaldı derken Türkçedeki gibi **… hat die Tür geklopft** yanlış. Zile bastıysa **Er hat geklingelt**, kapıya vurduysa **Er hat an die Tür geklopft**.` "Zili çaldı" Türkçesinden **Tür geklopft** çıkmaz. Hatanın kaynağı "kapıyı çalmak".
11. `lx:geehrt` 2.: `Türkçedeki gibi ilk adla **Sehr geehrte Sabine** yazılmaz` → `Türkçedeki Sabine Hanım gibi ilk adla **Sehr geehrte Frau Sabine** yazılmaz. Doğrusu soyadıyla: …` Türkçe konuşanın gerçek hatası ad + Hanım kalıbının çevrilmesi.
12. `lx:einschlafen` 2.: `Uyuyakaldım derken **Ich habe eingeschlafen** …` → `Uykuya daldım derken …`. 1. not "uyuyakaldım (geç kaldım)" için **verschlafen** diyordu. İki not aynı Türkçe sözle iki ayrı Almanca biçim veriyordu.
13. `lx:vergehen` 2.: `Sınavı geçtim → **Ich habe die Prüfung bestanden**` → `Postanenin önünden geçtim derken **Ich bin an der Post vergangen** yanlış. Doğrusu **Ich bin an der Post vorbeigegangen**.` **bestehen** 200. günün kartı. **vorbeigehen** 128. günde öğretildi, b3'te `also_ok` olarak da var. Türkçedeki "geçmek" karışıklığı yine gösteriliyor.
14. `lx:hinfallen` 2.: `Fiyat düştü derken **hinfallen** kullanılmaz.` → `Fiyat düştü derken **Der Preis ist hingefallen** yanlış. …` Not artık yanlış biçimi açıkça gösteriyor.
15. `lx:genießen` 2.: `**genießen** ile neyin keyfini … söylersin` → `Keyif yapıyorum derken tek başına **Ich genieße** yarım kalır. …` Hangi Türkçe sözden geldiği eklendi.

**Açıklama (`exp`)**
16. `lx:Benachrichtigung` `anlam_tr`: `… kargocu … bıraktığı haber kâğıdıdır` → `… bildirimdir: bir SMS ya da kargocunun bıraktığı kâğıt (**Benachrichtigungskarte**).` Kartın ö5 ve b4'ü SMS anlamını kullanıyordu. Ayrıca kâğıdın gerçekteki adı eklendi.
17. `lx:vergehen` `ipucu_tr`: `Sınavı geçmek için … **die Prüfung bestehen** dersin` → `Zamanın ne çabuk geçtiğini söylerken **Wie die Zeit vergeht!** dersin.` İpucu başka bir kelimeyi (200. gün) anlatıyordu (kural 3).

**Türkçe çeviri**
18. `lx:Bescheinigung` ö2 ve b2: **bitte** çevrilmemişti → `… bana lütfen bir belge verebilir misiniz?`
19. `lx:geehrt` ö4: `bu her zaman olur` → `bu her zaman uyar` (**das passt**).
20. `lx:gründen` ö4: `Beş yıl önce, iki kişi.` → `Beş yıl önce, ikimiz birlikte.` (**zu zweit**)
21. `lx:zurückfahren` ö3: `Bugün saat dörtte dönüyorum` → `Bugün erkenden, saat dörtte dönüyorum` (**schon** çevrilmemişti).
22. `lx:geehrt` ö6, `lx:Anschrift` ö3, ö4: Türkçe satırlarda `„…"` karışık tırnak → `“…”`.

**`also_ok` eksikleri (haksız ret riski)**
23. `lx:Filiale` b1: + **Postfiliale**; b2: + **Postfiliale**, **Post** (`Wo ist hier die nächste Post?` çok sık; artikel aynı).
24. `lx:hinfallen` b1, b4: + **gestürzt** (doktorda **Ich bin gestürzt** çok sık).

**Boşluk ipuçları (kalın parça doldurulmuş cümlede harfi harfine geçsin; a2-04–a2-07 ölçütü)**
25–77. 53 ipucu: `lx:Bescheinigung` b3 · `lx:Postleitzahl` b1, b2, b4 · `lx:Benachrichtigung` b1, b2 · `lx:Zusteller` b2 · `lx:Anschrift` b1, b3, b4 · `lx:täglich` b3 · `lx:Zeitung` b1, b4 · `lx:Opa` b1, b2, b4 · `lx:Großeltern` b1–b4 · `lx:Bauernhof` b2 · `lx:Fabrik` b1, b3, b4 · `lx:gründen` b1, b3 · `lx:sammeln` b1–b4 · `lx:aufwachen` b1, b3 · `lx:einschlafen` b1–b4 · `lx:anbieten` b2, b3 · `lx:vorlesen` b2, b4 · `lx:weggehen` b1, b2, b4 · `lx:zurückfahren` b2, b3 · `lx:vergehen` b2, b3 · `lx:genießen` b1, b2, b3 · `lx:hinfallen` b1, b2, b4. En sık sapma: 148.–149. gün ipuçlarında `Yazıda **arbeiten** böyle görünür: **sie arbeitete**` (cümlede ne **arbeiten** ne **sie arbeitete** var) → `Yazıda **Meine Oma arbeitete** denir.`. Ayrılan parçalarda `Yazıda **fuhren wir** denir, **zurück** sona gider.` · Perfekt'te `Konuşurken önce **Wir sind**, sonda **zurückgefahren** gelir.` · artikel boşluklarında `**die Postleitzahl** olduğu için …` → `Bu kelime **Ihre** ile gelir: **Ihre Postleitzahl**.` · `obwohl` cümlelerinde `**die Anschrift war richtig**` → `**obwohl die Anschrift richtig war**`. Betikle sınandı: sapma 68 parça → 0.

## Görev sorularına cevap
- **İleri gönderme:** bütün örnek, boşluk ve eşdizimler 146.+ gün kartlarına karşı betikle tarandı. Bulunanlar 1–6'da düzeltildi. Kalan eşleşmelerin hepsi yanlış alarm (**obwohl** 143. günde ders olarak öğretildi, `lx:obwohl` kartı sonra geliyor; **leider/Leiden**, **Dienstag/Dienst** gibi). 148. günde düzensiz geçmiş yok, yalnız **war/hatte/konnte** var (bilinen). **als/wenn**, **-ung** dersi, **werden** geleceği, **um … zu**, **damit**, **würde** yok. **hätte** yalnız `pt:ich-haette-eine-frage` kalıbında. **wurden groß** (vergehen ö2) 149. günün kendi dersinde.
- **`praeteritum` alanları:** 11 fiilin hepsi doğru: gründete, sammelte, wachte auf, schlief ein, bot an, las vor, ging weg, fuhr zurück, verging, genoss, fiel hin. aux ve Perfekt de doğru (aufwachen, einschlafen, weggehen, zurückfahren, vergehen, hinfallen **sein**; gründen, sammeln, anbieten, vorlesen, genießen **haben**).
- **Günün dil noktası:** 146.–147. günün beş + iki kartının her birinde hafta dersinden bir yapı var: **obwohl**, **zu/nach/bei** (Postleitzahl ö5, Zusteller ö2, Benachrichtigung ö4), **in die/in der** (Filiale). 148. günün dokuz kartının hepsinde düzenli geçmiş biçim (-te), 149. günün sekiz kartının hepsinde düzensiz geçmiş biçim var.
- **Resmî mektup gerçekliği:** **Sehr geehrte Damen und Herren**, **Sehr geehrter Herr / Sehr geehrte Frau + soyadı** ve virgülden sonra küçük harfle başlayan ilk satır doğru. Mektupta **Name und Anschrift** sol üstte, **PLZ** yer adından önce: Almanya'daki biçimle örtüşüyor. **Benachrichtigungskarte** adı eklendi (16).
- **Olgusal iddia:** kargo süresi, saklama günü, yasal zorunluluk yok (Filiale ö5 süreyi kâğıda bırakıyor). `SOURCES.md`'ye satır gerekmedi.
- **Kalıp bağları:** 24 kartın her bağı, kartın kendi kelimesinin geçtiği bir cümlede gerçekten var. Kaldırılan bağ yok.
- **WORLD:** **Frau Brandl** (paket komşuda: 17. hafta, Plätzchen: 2. hafta), **Herr Wimmer** (şef, **Sie**), **Derya**'da mangal (21. hafta) uyumlu. Tarihli yeni olay yok. Huber düzeltmesi 7'de. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Bairisch yok.
- **OD-9:** terim, üç nokta, tırnak, İngilizce köprü yok. Cümle uzunlukları sınırın içinde (tarama 0). Para geçmiyor. Kişiler **Wimmer Bey / Brandl Hanım** biçiminde.

## Değişen Türkçe alanlar (okur için, 84 satır)
- `mistakes_tr` (8): `lx:Bescheinigung` (2.), `lx:Benachrichtigung` (1.), `lx:Zusteller` (1.), `lx:geehrt` (2.), `lx:einschlafen` (2.), `lx:vergehen` (2.), `lx:hinfallen` (2.), `lx:genießen` (2.).
- `exp` (2): `lx:Benachrichtigung` `anlam_tr`, `lx:vergehen` `ipucu_tr`.
- `hint_tr` (54): 25–77'deki 53 ipucu + `lx:geehrt` b4.
- Örnek çevirileri (14): `lx:Bescheinigung` ö2, ö3 · `lx:Zeitung` ö2 · `lx:gründen` ö3, ö4 · `lx:sammeln` ö4 · `lx:vorlesen` ö3 · `lx:geehrt` ö4, ö5, ö6 · `lx:Anschrift` ö3, ö4 · `lx:zurückfahren` ö3 · `lx:hinfallen` ö1.
- Boşluk çevirileri (4): `lx:Bescheinigung` b2 · `lx:geehrt` b4 · `lx:gründen` b4 · `lx:hinfallen` b1.
- Eşdizim çevirileri (2): `lx:gründen` (4.), `lx:hinfallen` (1.).

## Kalan şüpheler (düzeltilmedi)
- **Çift kart:** `b1-kesin.json` 232. günde `lx:Sehr_geehrte/r_…` diye bir kart var. Bu, `lx:geehrt` (147) ile aynı söz. BRIF'e göre eş anlamlısı kartlı olan alınmaz. Hangisinin kalacağına baş geliştirici karar verir (tablo değişikliği).
- `lx:Bescheinigung` eşdizim **eine Bescheinigung ausstellen**: **ausstellen** B1 partisinde kart, ama tabloya atanmamış (gün yok). Resmî mektupta çok geçtiği için eşdizim olarak bırakıldı.
- `lx:hinfallen` 2. not **gesunken**: **sinken** B1 partisinde atanmamış kart. Not doğru biçimi göstermek için kullanıyor. Gün kuralına takılmıyor.
- `lx:einschlafen` 1. not **verschlafen** ve `lx:zurückfahren` 2. not **zurückfliegen** kartlı değil. Notta doğru biçim olarak geçiyorlar.
- `tier`: `lx:Zeitung` (982), `lx:genießen` (912), `lx:gründen` (1072) sıklık listesinde 2000'in altında. Kartlarda K1 yazıyor. A2 partilerinin ortak yolu bu (a2-07 raporu), karar baş geliştiricide.
- `lx:Postleitzahl` `level: "A1"`: öneri kartı (`telefon/proposals.json`) A1 diyor. BRIF'e uygun olduğu için bırakıldı.

## Sonuç
Dil açısından bulunan bütün hatalar dosyada düzeltildi. Doğrulayıcı 0 hata verdi.

Sonuç: KAPANDI — okur bekliyor

## Fark turu (okur 10 GERİ + örneklem 1 GERİ)

Kaynak: `docs/v2/reviews/okur/lexicon-batch-a2-08.md`, `docs/v2/reviews/orneklem/lexicon-a2-07-08.md` (satır 22). Okurun önerileri esas alındı, her satır tek fikir. Yalnız bu 11 alan değişti.

1. `lx:Bescheinigung.mistakes_tr[0]`, `lx:Postleitzahl.mistakes_tr[0]`, `lx:Anschrift.mistakes_tr[0]`: sondaki açıklamasız `: **die …**` eki kaldırıldı.
2. `lx:Postleitzahl.forms[1].hint_tr`: `Bu kelime **Ihre** ile gelir: …` → `Posta kodunuz derken **Ihre Postleitzahl** denir.` Eski hâl genel kural gibi okunuyordu.
3. `lx:Anschrift.forms[3].hint_tr`: → `Benim yeni adresim derken **meine neue Anschrift** denir.`
4. `lx:Großeltern.forms[3].hint_tr`: → `Büyükannenle deden derken **deine Großeltern** denir.`
5. `lx:Anschrift.examples[2].tr`, `examples[3].tr`: tırnak içindeki Almanca → kalın **Anschrift**.
6. `lx:Benachrichtigung.exp.anlam_tr`: parantezdeki **Benachrichtigungskarte** kaldırıldı → `… bildirimdir: bir SMS ya da kargocunun bıraktığı kâğıt.`
7. `lx:vorlesen.mistakes_tr[0]`: yanlışta **Können**, doğruda **Könnten** vardı (açıklanmayan ikinci fark) → ikisi de **Können Sie mir den Brief …**. Doğru biçim `Doğrusu …` ile veriliyor.
8. `lx:vergehen.forms[2].also_ok`: + **vorbei** (`Die zwei Wochen sind so schnell vorbei`, `lx:vorbei` 76. gün).

Çift kart (`lx:geehrt` ↔ B1 `lx:Sehr_geehrte/r_…`): `lx:geehrt` kartı kalıyor (A2 önce geliyor). B1 kartı için notu baş geliştirici yazacak.

Denetim: ipucu kalın parçası sapma 0. OD-9 taraması (tırnak, `;`, `=`, üç nokta, 14 kelime) 0. `npm run content:validate` 0 hata, 157 uyarı (bu partiye ait uyarı yok). `review` alanına dokunulmadı.

Okurun yeniden okuyacağı alanlar (10): yukarıdaki 1–7.

Sonuç (fark): KAPANDI
