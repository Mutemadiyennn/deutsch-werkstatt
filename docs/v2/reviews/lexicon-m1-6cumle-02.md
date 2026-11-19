# lexicon c6-02 — dilbilimci incelemesi (PM-062, 6 cümle)

İncelenen: 39 kart (Frühling, Sommer, Herbst, Winter, haben, Urlaub, Geburtstag, Anfang, Ende, offen, wann, null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf, dreizehn, vierzehn, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn, zwanzig, Nummer, wohnen, neu, Büro, einundzwanzig, fünfzig, dreißig); 78 yeni örnek, 235 boşluk (91 yeni, eskiler dahil hepsi okundu).
Yama: `c6-02.dil.json`, 22 kart, 32 düzeltme. 17 kart değişmeden geçti.
Doğrulayıcı çalıştırılmadı: yama sözlüğe uygulanmadı, lint baş geliştiricide.

## Düzeltmeler
- **also_ok (4):** offen b1 ve b4 `auf`; b2 ve b3 `auf`, `geöffnet` (haksız ret riski).
- **Kartın anlamı dışı (1):** null b3 `Ich habe ___ Zeit` (hiç) → `Im Test habe ich ___ Fehler.` (sıfır hata).
- **Doğallık (4):**
  - null b6 `Nach ___ Uhr fährt kein Bus mehr.` → `Der letzte Zug fährt um ___ Uhr zehn.` (`null Uhr` gerçekte tarife saatinde duyulur).
  - wann ö5 `Dr. Weber, wann …` → `Herr Doktor, wann …` (hitapta çıplak `Dr. Weber` Almanca değil; sözlükteki öbür kartlarla aynı).
  - neun ö6 `Bis wann bist du heute wach?` → `Wann gehst du heute ins Bett? – Um neun, …`
  - haben ö6, vier b4, zwölf b4, zwanzig b6: `Brötchen` → `Semmeln` (Bavyera'da duyulan kelime; `lx:Semmel` A1 kartı var, `Brötchen` kartı yok).
- **Düzey (1):** haben b6 `Heizung` → `Auto`.
- **Öznede O (3):** haben b3, wohnen b3, fünfzig b3 → **Adam**.
- **Çıplak kural ipucu (4):** Frühling b4, Urlaub b4 (`**Ich freue mich auf** dedikten sonra …`), Ende b3, Nummer b3.
- **Türkçe (3):** Nummer b5 arıyorum → telefon ediyorum; sechzehn b6 `on altıncı sayfayı` → `sayfa on altıyı` (sıra sayısı Almancada yok); Urlaub ö5 `Tobi'nin izinden sonra` iki türlü okunuyordu → `İzinden sonra Tobi'nin çok işi var.`
- **Kişisel bilgi ve WORLD (7):**
  - Ev numarası öğrenciye bağlanıyordu, WORLD'deki adresle çelişiyordu: elf b6 (`Meine Wohnung` → `Die Praxis`), vierzehn b6 (`Unser Haus` → `Das neue Haus`), dreizehn b1 (`Ich wohne` → `Der Arzt wohnt`, eski boşluk).
  - `Mein Bruder ist achtzehn` ile `Mein Bruder ist einundzwanzig` birbiriyle çelişiyordu; `Meine Schwester ist neunzehn` ile birlikte üçü de üçüncü kişiye çevrildi (eski boşluklar): achtzehn b1, einundzwanzig b1, neunzehn b3.
  - wohnen hata notu 1: `Ich wohne in München` (ich + gerçek şehir) → `Ich wohne in der Stadt`.
- **Ad karışıklığı (1):** Büro b4 `Frau Weber` → `Frau Schneider` (Bürgerbüro memuru; elf ö4 ile uyumlu).
- **Fotoğraf sorgusu (1):** Nummer ö5, ö4 ile aynı sahneydi → `sticky note on fridge door`.

## Onaylanan yazar kararları
- eins b2 `Es ist ___ Uhr` cevap `ein`: doğru; aynı cümle drei, sechs, neun, elf kartlarında farklı Türkçeyle, çakışma yok.
- `Der Bus dreizehn / einundzwanzig`: gündelik dilde söyleniyor, kaldı.
- Karakter bilgileri WORLD ile uyumlu (Dr. Weber erkek, Frau Huber randevu veriyor, Frau Brandl aynı binada, Pichler kışın kar kürüyor, Wimmer 49 yaşında `wird bald fünfzig`).

## Açık noktalar
- `lx:null` ö3 `Ich hab null Ahnung` (hiç anlamı) eski örnek, okurdan geçtiği için bırakıldı; b3 çıkınca kartta bu anlamı açıklayan ipucu kalmadı. Karar baş geliştiricide.
- `lx:Geburtstag` ö6 `Was schenkst du Anja …`: Anja WORLD'de resmî konuşan memur (Frau Schneider). Çelişki değil ama adıyla hediye alınan arkadaş gibi duruyor; Derya ile değiştirilebilir.
- Diyaloglarda konuşanı belirsiz kişisel cevaplar bırakıldı (drei ö6 `Wie viele Kinder haben Sie? – Drei`, sechs ö6 `dein Sohn`, Winter ö6 `im Winter bin ich oft krank`); eski kartlardaki emsallerle aynı.
- Eski cümlelerde `Brötchen` duruyor: zwei b3, drei ö4. Grup dışında da 10 kadar yer var.
- `lx:geöffnet` b1 `Hat die Bäckerei am Samstag ___?` boşluğunda `offen`, `auf` also_ok yok (grup dışı).
- Grup dışı çakışma: `Komm mal ___!` + `Buraya gel!` hem `lx:her` hem `lx:hierher` kartında farklı cevapla.
- Muayenehane açılış saati eski cümlelerde tutarsız: neun ö1 `um neun`, acht b2 `um acht`.
- `layer`: ö6 diyaloglarının çoğu `alltag` işaretli ama nötr standart Almanca; yanlış değil, dokunulmadı.
- wohnen hata notu 1 için yama `Şehirde` yazıyor; okur yeniden baksın.

Sonuç: KAPANDI (yama uygulanınca). Hata oranı 32/39 kart; yeni cümlelerde dilbilgisi hatası yok, 16 Almanca cümle değişti.
