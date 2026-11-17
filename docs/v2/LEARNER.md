# ÖĞRENCİ KARTI (kimlik bilgisi yok)

Her ajan ve oturum işe bu dosyayı okuyarak başlar. Kaynak: proje sahibi, FAZ H4 §1 (`phases/10-H4.md`).

## Kim
- A2 başında; yetişkinler için bir dil kursuna yeni başladı.
- Bavyera'da yaşıyor ve çalışıyor. Söyleneni çoğu zaman anlıyor ama cevap veremiyor.
- Telefon açmaktan korkuyor.
- İş yerinde molada konuşulanları sadece dinliyor.
- Zorlanınca İngilizceye kaçıyor.
- Hızlı konuşmayı ve Bavyera ağzını anlamakta zorlanıyor.
- Gramer listelerinden ve işe yaramayan kelime ezberinden bıkmış.
- Önceki uygulamayı (v1) kısır döngü yüzünden iki günde bıraktı: hep aynı konular, aynı ritim, hikâye yok, gerçek hayatta hissedilen kazanç yok.

## Hedef
6 ayda doktorda, resmî dairede, telefonda, işte ve sokakta cesaretle konuşmak.

## 1 numaralı başarı ölçütü
Öğrenci uygulamayı her gün **kendi isteğiyle** açıyor.

## Her içerik ve arayüz kararında tek soru
> "Bu, bu öğrenciyi dışarıda konuşmaya yaklaştırıyor mu, ve yarın uygulamayı yeniden açmak istemesini sağlıyor mu?"

Bir tasarım kararı öğrencinin deneyimini kötüleştiriyorsa, teknik ölçütü tuttursa bile yanlıştır. Bu ürün bir öğretmendir; kod, sunucu ve testler öğretmene hizmet eder.

## Kimlik kuralları (P1)
- Öğrencinin adı ve cinsiyeti içerikte asla sabit yazılmaz. Öğrencinin söylediği satırlarda yer tutucu kullanılır: `{name}`, `{Herr|Frau}`, `{Patient|Patientin}` (ilk = erkek hitabı, ikinci = kadın hitabı).
- Değerler yalnızca cihazdaki profilden gelir (ilk kurulumda isteğe bağlı ad ve hitap). Depoya, loglara ve yapay zekâya ad gönderilmez; yapay zekâya yalnızca hitap biçimi gider.
- Dünyada öğrenci karakteri adsızdır ("sen"): şehre yeni gelmiş biri.
