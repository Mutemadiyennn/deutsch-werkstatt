# Okur kontrolü — lexicon parti c1 (OD-9.3)

Girdi: `batch-c1.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı (en uzun cümle 12 kelime). Dilbilgisi terimi bulunmadı.

`parcalar`: 100 kartın hepsinde boş, soldan sağa okunacak parça yok.

Yedi GERİ aynı sorundan geliyor. Sayı kartlarının ne zaman alanı fiyat ve süreyi de sayıyor, hata notu ise saat demeden "buçuk" diyor. Tek başına okuyunca kural her buçuk için geçerli görünüyor. Oysa **halb** kalıbı yalnızca saat söylerken böyle çalışıyor.

Sınırda geçenler: `lx:kurz` ne_zaman_tr, `lx:Plan` ipucu_tr, `lx:verrückt` ipucu_tr, `lx:klingen` tr. İkinci okumaya gerek kalmadan anlaşıldılar.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:Uhr | hepsi | saati gösteren eşya ve saat sözü | GEÇTİ | |
| lx:Name | hepsi | bir kişinin adı, formda soyadı | GEÇTİ | |
| lx:Monat | hepsi | takvimdeki bir ay | GEÇTİ | |
| lx:woher | hepsi | nereden geldiğini sorma sözü | GEÇTİ | |
| lx:gestern | hepsi | bugünden önceki gün | GEÇTİ | |
| lx:fünf | diğer alanlar | beş sayısı | GEÇTİ | |
| lx:fünf | mistakes_tr[1] | beş buçuk her yerde halb sechs | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her beş buçuk için **halb sechs** sanıyorum |
| lx:vier | diğer alanlar | dört sayısı | GEÇTİ | |
| lx:vier | mistakes_tr[1] | dört buçuk her yerde halb fünf | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her dört buçuk için **halb fünf** sanıyorum |
| lx:früh | hepsi | beklenenden önce olan, erken | GEÇTİ | |
| lx:wohin | hepsi | nereye gidildiğini sorma sözü | GEÇTİ | |
| lx:zehn | diğer alanlar | on sayısı | GEÇTİ | |
| lx:zehn | mistakes_tr[0] | on buçuk her yerde halb elf | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her on buçuk için **halb elf** sanıyorum |
| lx:sechs | diğer alanlar | altı sayısı, zeks gibi okunur | GEÇTİ | |
| lx:sechs | mistakes_tr[0] | altı buçuk her yerde halb sieben | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her altı buçuk için **halb sieben** sanıyorum |
| lx:zweiter | hepsi | birinciden sonra gelen | GEÇTİ | |
| lx:halb | diğer alanlar | bir şeyin yarısı | GEÇTİ | |
| lx:halb | mistakes_tr[0] | üç buçuk her yerde halb vier | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her üç buçuk için **halb vier** sanıyorum |
| lx:acht | diğer alanlar | sekiz sayısı | GEÇTİ | |
| lx:acht | mistakes_tr[0] | sekiz buçuk her yerde halb neun | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her sekiz buçuk için **halb neun** sanıyorum |
| lx:sieben | diğer alanlar | yedi sayısı | GEÇTİ | |
| lx:sieben | mistakes_tr[0] | yedi buçuk her yerde halb acht | GERİ | anlattığım şey gerçek kullanımla örtüşmüyor: kutuda saat sözü yok, her yedi buçuk için **halb acht** sanıyorum |
| lx:Kopf | hepsi | vücudumun en üstü, başım | GEÇTİ | |
| lx:schlimm | hepsi | ciddi ve kötü durum | GEÇTİ | |
| lx:lernen | hepsi | yeni bilgi ya da beceri edinmek | GEÇTİ | |
| lx:anrufen | hepsi | birini telefonla aramak | GEÇTİ | |
| lx:heiß | hepsi | çok sıcak olan şey | GEÇTİ | |
| lx:kaufen | hepsi | para verip bir şey almak | GEÇTİ | |
| lx:bedeuten | hepsi | bir sözün anlamına gelmek | GEÇTİ | |
| lx:frei | hepsi | yer ya da randevu boş | GEÇTİ | |
| lx:Wort | hepsi | dildeki tek kelime | GEÇTİ | |
| lx:stark | hepsi | gücü ya da etkisi fazla | GEÇTİ | |
| lx:Entschuldigung | hepsi | özür dilerken ya da birini durdururken | GEÇTİ | |
| lx:anfangen | hepsi | bir iş ya da olay başlıyor | GEÇTİ | |
| lx:langsam | hepsi | hızlı olmayan | GEÇTİ | |
| lx:Arzt | hepsi | hastaları muayene eden kişi | GEÇTİ | |
| lx:leider | hepsi | kötü haberi kibarca söylerken | GEÇTİ | |
| lx:krank | hepsi | sağlığı iyi olmayan kişi | GEÇTİ | |
| lx:kosten | hepsi | fiyatı olmak, yemekte tadına bakmak | GEÇTİ | |
| lx:nochmal | hepsi | bir şey tekrar yapılsın | GEÇTİ | |
| lx:Karte | hepsi | ödeme kartı, yerine göre menü, harita | GEÇTİ | |
| lx:Schmerz | hepsi | vücudumda hissettiğim ağrı | GEÇTİ | |
| lx:Geschenk | hepsi | karşılıksız verdiğim şey | GEÇTİ | |
| lx:Bescheid | hepsi | birine verilen haber, dairenin yazılı kararı | GEÇTİ | |
| lx:feiern | hepsi | özel bir günü kutlamak | GEÇTİ | |
| lx:Chef | hepsi | iş yerindeki yöneticim | GEÇTİ | |
| lx:Rücken | hepsi | vücudumun arka bölümü | GEÇTİ | |
| lx:Unfall | hepsi | beklenmedik ve zarar veren olay | GEÇTİ | |
| lx:hoffen | hepsi | iyi bir şey olsun diye beklemek | GEÇTİ | |
| lx:egal | hepsi | seçenekler benim için aynı | GEÇTİ | |
| lx:Stadt | hepsi | büyük yerleşim yeri, şehir | GEÇTİ | |
| lx:kurz | hepsi | uzun olmayan, küçük ricada da | GEÇTİ | |
| lx:eigentlich | hepsi | gerçek durumu ya da asıl düşüncemi söylerken | GEÇTİ | |
| lx:Auto | hepsi | yolda kullandığım araba | GEÇTİ | |
| lx:sitzen | hepsi | bir yerde oturur durumda olmak | GEÇTİ | |
| lx:Typ | hepsi | arkadaş arasında bir erkekten söz etmek | GEÇTİ | |
| lx:Tür | hepsi | eve ya da odaya girdiğim kapı | GEÇTİ | |
| lx:falsch | hepsi | doğru olmayan şey | GEÇTİ | |
| lx:Glück | hepsi | işlerin tesadüfen iyi gitmesi, şans | GEÇTİ | |
| lx:schwer | hepsi | ağırlığı fazla, bazen de zor | GEÇTİ | |
| lx:Ende | hepsi | bir şeyin bittiği nokta | GEÇTİ | |
| lx:Land | hepsi | ülke, bazen de kırsal | GEÇTİ | |
| lx:bald | hepsi | kısa süre sonra olacak | GEÇTİ | |
| lx:einige | hepsi | az sayıda kişi ya da şey | GEÇTİ | |
| lx:tragen | hepsi | elimde ya da üstümde götürmek | GEÇTİ | |
| lx:bisschen | hepsi | az bir miktar | GEÇTİ | |
| lx:verrückt | hepsi | aşırı kişi ya da fikir, şakayla | GEÇTİ | |
| lx:Idee | hepsi | aklıma gelen düşünce | GEÇTİ | |
| lx:lesen | hepsi | yazılı bir şeyi okumak | GEÇTİ | |
| lx:bereit | hepsi | bir kişi işe hazır | GEÇTİ | |
| lx:Schwester | hepsi | kız kardeş, hastanede hemşire | GEÇTİ | |
| lx:Ahnung | hepsi | bir konuda bilgim var mı | GEÇTİ | |
| lx:draußen | hepsi | binanın dışındaki yer | GEÇTİ | |
| lx:legen | hepsi | bir şeyi yatırarak koymak | GEÇTİ | |
| lx:Junge | hepsi | küçük ya da genç erkek | GEÇTİ | |
| lx:Ruhe | hepsi | gürültü ve telaş olmayan durum | GEÇTİ | |
| lx:Polizei | hepsi | güvenliği sağlayan kurum, 110 | GEÇTİ | |
| lx:ruhig | hepsi | gürültüsüz, sakin yer ya da kişi | GEÇTİ | |
| lx:kümmern | hepsi | birine ya da bir işe bakmak | GEÇTİ | |
| lx:versprechen | hepsi | yapacağıma söz vermek | GEÇTİ | |
| lx:fast | hepsi | olmasına çok az kaldı | GEÇTİ | |
| lx:Tochter | hepsi | birinin kız çocuğu | GEÇTİ | |
| lx:bestimmt | hepsi | olacağından eminim | GEÇTİ | |
| lx:runter | hepsi | aşağı doğru gitmek | GEÇTİ | |
| lx:Geschichte | hepsi | anlatılan öykü, okulda tarih dersi | GEÇTİ | |
| lx:vorbei | hepsi | bitti ve geride kaldı | GEÇTİ | |
| lx:dran | hepsi | sıra kimde | GEÇTİ | |
| lx:hinter | hepsi | bir şeyin arkasındaki yer | GEÇTİ | |
| lx:Grund | hepsi | bir şeyin nedeni | GEÇTİ | |
| lx:arm | hepsi | parası çok az olan kişi | GEÇTİ | |
| lx:Arm | hepsi | omuzdan ele kadar vücut bölümü | GEÇTİ | |
| lx:Plan | hepsi | yapmayı düşündüğüm şeyler | GEÇTİ | |
| lx:lachen | hepsi | komik şeye sesli gülmek | GEÇTİ | |
| lx:ziemlich | hepsi | epey, ama çok kadar değil | GEÇTİ | |
| lx:Herz | hepsi | göğsümde atan organ | GEÇTİ | |
| lx:drin | hepsi | bir şey başka şeyin içinde | GEÇTİ | |
| lx:Bett | hepsi | üstünde uyuduğum eşya | GEÇTİ | |
| lx:klingen | hepsi | duyduğum şeyin bende bıraktığı izlenim | GEÇTİ | |
| lx:Job | hepsi | para kazandığım iş, günlük konuşmada | GEÇTİ | |
| lx:verlieren | hepsi | sahip olduğum şeyi artık bulamamak | GEÇTİ | |
| lx:Mama | hepsi | anneden samimi söz etmek | GEÇTİ | |
| lx:wünschen | hepsi | birine iyi bir şey dilemek | GEÇTİ | |
| lx:gewinnen | hepsi | maçta ya da oyunda kazanmak | GEÇTİ | |
| lx:Seite | hepsi | bir şeyin sağ ya da sol tarafı | GEÇTİ | |
| lx:Ort | hepsi | belli bir yer | GEÇTİ | |
| lx:gefallen | hepsi | bir şeyi beğenmek | GEÇTİ | |
| lx:heiraten | hepsi | biriyle evlenmek | GEÇTİ | |

## Sonuç

- Toplam alan: 505
- GEÇTİ: 498
- GERİ: 7 alan, 7 kart
- GERİ kimlikleri: lx:fünf, lx:vier, lx:zehn, lx:sechs, lx:halb, lx:acht, lx:sieben

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
