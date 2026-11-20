# Canlı sürüm duman denetimi (elle)

e2e testleri sahte girişle, sahte sunucuyla ve sahte sesle koşar. Aşağıdaki yollar testte **görünmez**; her yayından sonra
(ve proje sahibine bir adım yazmadan önce) canlı `/v2/` adresinde elle denenir. Sonuç #12'ye tek satırla yazılır:
`duman v2-YYYYMMDD-n: 1 ✓ 2 ✓ 3 – …` (– = denenemedi, nedeniyle).

| # | Yol | Nasıl | Beklenen |
|---|---|---|---|
| 1 | **Gerçek Google girişi** (PM 7020493185) | Safari ve Brave'de "Google ile giriş yap" | Pencere açılır, giriş olur; olmazsa ekranda `(kod: auth/…)` görünür |
| 2 | E-posta + uygulama şifresi | iPhone kabuğunda giriş | Giriş olur |
| 3 | Profil → Hesap kimliği | "Kopyala" | Kimlik panoya; bildirim |
| 4 | Profil → Medya rafı → "Kaydet ve rafı sına" | kayıtlı adres ve parola | "Bağlandı: raf çalışıyor." |
| 5 | Worker sağlığı | Profil → sunucu durumu | "bağlı", izin listesi var |
| 6 | Profil → Ses ve mikrofon | "Dinle" / "Yavaş" (erkek ve kadın ses), "Söyle: Guten Morgen" | Sesler cinsiyete uygun; Yavaş yalnızca hız; tanınan metin görünür |
| 7 | Bugün → BAŞLA | ilk düğüm | Bahçe açılır, süre başlar (durum çubuğunda dakika) |
| 8 | Uçak modu | uygulamayı internetsiz aç | Sekmeler açılır (BY-12) |
| 9 | **"Başka cümle" gerçek iPhone'da** (PM 7028983301; CI kare ölçüsünün tamamlayıcısı) | Kelime Bahçesi → tanıtım kartında "Başka cümle"ye 3 kez dokun | Her dokunuşta cümle hemen değişir, gecikme hissedilmez; kart zıplamaz |

Kim: ana motor yapamıyorsa (bu oturumda Google hesabı ve canlı adrese tarayıcı erişimi yok) satırı "–" yazar ve PM'den
proje sahibine iletmesini ister. Yeni bir canlı-yalnız yol eklenince bu tabloya satır eklenir.
