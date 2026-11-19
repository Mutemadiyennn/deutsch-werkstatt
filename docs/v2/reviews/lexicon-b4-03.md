# Dilbilimci raporu: #58 B4 kart kuralları, grup 03

İncelenen kart: 50. Düzeltilen kart: 35. Düzeltme: 60. Temiz kart: 15. Yama: `b4-03.dil.json`. Lint çalıştırılmadı (görev gereği baş geliştirici çalıştırır).

## İncelenen kimlikler
krank, kurz, kümmern, lachen, langsam, laufen, lecker, legen, lernen, lesen, links, nochmal, rechts, regnen, reparieren, reservieren, ruhig, runter, salzig, scharf, schlafen, schlimm, schwer, schwimmen, sich_ausruhen, sich_bewegen, sich_freuen_(auf/über), sich_streiten, sich_trennen, sich_verlieben, sich_ärgern_(über), sitzen, spielen, stark, studieren, sympathisch, tragen, umziehen, unterschreiben, verlieren, verrückt, versprechen, vorbei, warm, warten_(auf), wünschen, ziemlich, Überstunde, Überweisung, überweisen.

Temiz: kümmern, laufen, nochmal, rechts, reparieren, sich_ausruhen, sich_bewegen, spielen, stark, sympathisch, unterschreiben, warten_(auf), ziemlich, Überstunde, überweisen.

## Düzeltmeler (türe göre)

**Görevde adı geçenler (8)**
- krank, lesen, vorbei: ipucu komşu kelimeyi anlatıyordu (**sich krankmelden**, **vorlesen**, **vorbeikommen**) → kartın kelimesi (**krank werden**, **laut lesen**, **am Bahnhof vorbei**).
- reservieren: eşdizim ve örnek 4'te Aksoy → Maier. studieren: örnek 2 ve form 4'te Aksoy → Maier (form 4 şehir Berlin).
- runter örnek 3: `Sakin ol! / Aşağı gel!` → `Sakin ol!` (eğik çizgi; öbür anlam eşdizimde duruyor).
- versprechen örnek 4: `Beni arayacak mısın?` → `Bana telefon edecek misin?`
- schwimmen: `aux` `haben/sein` → `sein` (kartın Perfekt'i ve kalıbı zaten sein).

**Aynı türden, görevde adı geçmeyen (6)**
- umziehen form 3: `Familie Aksoy` → `Familie Maier` (aynı soyadı, aynı gerekçe).
- lachen, sich_streiten, verlieren: ipucu komşu kelimeyi anlatıyordu (**lächeln**, **Streit**, **Fundbüro**) → kartın kelimesi.
- schlafen `ne_zaman_tr`: kalın ifade Türkçesiz kalıyordu → `Birine iyi uykular dilerken **Schlaf gut!** dersin.`
- wünschen `anlam_tr`: `dilemeni sağlar` → `dilemeyi söyler`.

**Formlar (6)**
- sich_freuen: `über` ve `auf` boşluklarına öbür edat da giriyordu → cümleye `von gestern` ve `schon` eklendi, tek doğru kaldı.
- links form 1: ipucu `nach links` ipucuyla çelişir gibiydi → `Sola derken tek başına **links** de denir`.
- regnen form 3: ipucu bir şey öğretmiyordu → kelimenin sonda durduğu yazıldı.
- Überweisung form 1 ve 4: `eine` ipuçları `die` formundan ayırt etmiyordu → `Herhangi bir havale / sevk kâğıdı` ile başlıyor.

**Hata notları (10)**
- kurz: cümlesiz `kurzer` (tek başına geçerli bir biçim) → tam cümle içinde.
- reservieren (2): `-ieren` ek yazımı ve `Doğrusu` kalıbı; `Başına` belirsizdi → `**Tisch** önüne`.
- ruhig, verlieren, versprechen, sich_verlieben: farkın nedeni yazılmamıştı (sich_verlieben'de iki fark vardı, ikisi de açıklandı).
- sich_trennen, verrückt: özne belirsizdi → `Kadın`, `Adam`. lachen: **Witz** için `şaka` → `fıkra`.

**Örnekler (19)**
- Kartın kelimesi yerine bileşik kullanan örnekler: legen 2 ve 4 (**hinlegen**) → **legen**; lernen 3 (**auslernen**) → `Ich lern grad für die Prüfung.`
- Aynı Almancaya farklı Türkçe: ruhig 4 (`rahatça` → `çekinmeden`), salzig 4, wünschen 4, verrückt 2.
- Çeviri hatası ya da belirsizlik: ruhig 1 (`güzel ve sakin` → `gayet sessiz`), schwer 1 (**zu** → `fazla`), sitzen 3 (`Nerede oturuyorsunuz?` ikamet gibi okunuyordu), links 3 ve 4, verlieren 3, lecker 1 (`Gerti hanımın`), schlimm 1 (`Doktor Bey`), tragen 2 ve sich_trennen 2 (özne).

**Eşdizim çevirileri (11)**
- sich_ärgern: **Chef** `şef` → `patron` (yanlış arkadaş; unterschreiben kartında da patron).
- schlimm (2): `Nicht so schlimm!` örnekle aynı çeviriye çekildi; `Das ist schlimm.` içindeki fazladan `çok` atıldı.
- warm: **warmes Wasser** `ılık su` → `sıcak su`. schwer: `ağır çalışmak` → `ağır iş yapmak`. langsam: `yavaş yemek` (çift okunuyor) → `yavaş yemek yemek`. krank: `hasta hâlde yatakta yatmak` → `hasta yatmak`. scharf, lecker, wünschen, reservieren: tutarlılık ve ad.

**Fotoğraf sorguları:** yanıltıcı sorgu bulunmadı, değişiklik yok.

## Açık noktalar
1. **schwimmen `aux`:** görevdeki yama biçiminde `verb` anahtarı yok. Yamaya `"verb": {"aux": "sein"}` olarak yazıldı; uygulayıcı bu anahtarı tanımıyorsa elle uygulanmalı.
2. **Maier:** Aksoy yerine seçilen genel soyadı. WORLD'deki bir karakterle çakışıp çakışmadığı denetlenmedi (belge okunmadı).
3. **Brezen = simit** (lecker 1) olduğu gibi bırakıldı; sözlükteki öbür kartlarla tutarlılığı bu grupta denetlenemedi.
4. **Dr. Weber:** çeviride bazı kartlarda `Dr. Weber`, bazılarında `Doktor Weber` (sich_ausruhen, warten, Überweisung, überweisen). Grup içinde tek biçime çekilmedi; sözlük genelinde karar gerekir.
5. **runter ve vorbei** örnekleri ayrılabilen bileşiklerle kurulu (**runterkommen**, **vorbeikommen**). Bu kelimeler zaten böyle kullanıldığı için dokunulmadı.
6. **Tanımlık boşlukları** (Überweisung `eine`/`die`, Überstunde `eine`): dilbilgisi açısından öbür tanımlık da girer; ayrımı çeviri ve ipucu yapıyor. Daha sıkı ölçüt isteniyorsa bu formlar çıkarılmalı.
7. **spielen hata notu 2** (`Ich stehle Gitarre`): sözlükten çevirince olabilecek bir hata, ama sık olduğu kanıtlı değil; bırakıldı.

Sonuç: AÇIK (1. nokta yama biçimine bağlı; öbürleri karar bekleyen küçük noktalar).
