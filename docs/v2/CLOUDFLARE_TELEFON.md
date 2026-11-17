# Sunucuyu (Cloudflare Worker) telefondan kurmak

Toplam 15–20 dakika sürer. Hiçbir yerde kredi kartı ya da ücretli plan gerekmez. Anahtarları yalnızca sen girersin; GitHub'ın şifreli "secret" alanında dururlar ve hiç kimseye (bana da) gösterilmezler.

> Cloudflare ve GitHub zaman zaman ekranlarındaki adları değiştirir. Bir düğmeyi bulamazsan, aynı anlama gelen yakın bir adı ara. Takılırsan ekran görüntüsünü bana gönder.

## A. Cloudflare hesabı (5 dk)
1. Telefonun tarayıcısında **dash.cloudflare.com/sign-up** adresini aç.
2. E-postanı ve yeni bir şifre gir → **Sign up**.
3. E-postana gelen doğrulama bağlantısına dokun.
4. "What would you like to do?" türü bir karşılama sorusu gelirse **atla (Skip)** ya da "Workers / Developer platform"u seç. **Plan seçme ekranı çıkarsa Free'yi seç; kart bilgisi girme.**

## B. Workers alt alan adı (1 dk)
5. Sol üstteki **☰ menü** → **Compute (Workers)** ya da **Workers & Pages**.
6. İlk açılışta senden bir **workers.dev alt alan adı** seçmen istenir (ör. `adın-dw`). Yaz → **Set up / Save**.
   Sunucu adresin şu olacak: `https://deutsch-werkstatt-api.<alt-alan-adın>.workers.dev`
7. Aynı sayfada sağda ya da aşağıda **Account ID** yazar → **kopyala** ve not uygulamasına geçici olarak yapıştır.

## C. API token (Cloudflare'in GitHub'a verdiği yetki) (3 dk)
8. Sağ üstteki **profil simgesi** → **My Profile** → **API Tokens**.
9. **Create Token** → listede **Edit Cloudflare Workers** → **Use template**.
10. "Account Resources": **Include → (senin hesabın)**. "Zone Resources": **All zones** (alan adın olmadığı için önemli değil).
11. **Continue to summary** → **Create Token**.
12. Gösterilen token'ı **kopyala**. Yalnızca bir kez gösterilir; not uygulamasına geçici yapıştır.

## D. Diğer anahtarlar (3 dk)
13. **Gemini anahtarı:** **aistudio.google.com/apikey** → **Create API key**. Anahtarın bağlı olduğu Google Cloud projesinde **faturalandırma (billing) KAPALI olmalı**: aynı sayfada anahtarın yanında "Free" (ücretsiz katman) yazdığını gör. "Paid" ya da faturalandırma hesabı bağlı bir proje görürsen o anahtarı kullanma; yeni proje ile yeni anahtar oluştur. v1'in anahtarını yalnızca bu kontrolden geçerse kullan.
14. **Pexels anahtarı (fotoğraflar):** v1'deki anahtarın. Yoksa **pexels.com/api** → ücretsiz kayıt → anahtarı kopyala.
15. **Hesap kimliğin (UID):** v2 uygulamasında **Profil → Hesap kimliği (UID) → Kopyala**.

## E. GitHub'a gizli değerleri gir (5 dk)
16. Tarayıcıda **github.com/Mutemadiyennn/deutsch-werkstatt** → (gerekirse tarayıcı menüsünden **Masaüstü sitesi**ni aç) → **Settings**.
17. Sol menü: **Secrets and variables → Actions** → **New repository secret**. Şu beşini **tam bu adlarla** tek tek ekle:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | adım 12'deki token |
| `CLOUDFLARE_ACCOUNT_ID` | adım 7'deki Account ID |
| `GEMINI_KEY` | adım 13 |
| `PEXELS_KEY` | adım 14 |
| `ALLOWED_UIDS` | adım 15'teki UID |

18. Not uygulamasına yapıştırdığın token ve anahtarları **sil**.

## F. Dağıt ve bağla (3 dk)
19. Depoda **Actions** → solda **"v2 — Worker dağıtımı (Cloudflare)"** → **Run workflow** → **Run workflow**.
20. 1–2 dakika sonra iş yeşil olur. İşe dokun → **"Adres ve sağlık kontrolü"** adımında `Worker adresi: https://…workers.dev` satırı görünür → adresi kopyala.
21. **Settings → Secrets and variables → Actions → Variables** sekmesi → **New repository variable**: Name `V2_API_BASE`, Value adım 20'deki adres (sonda / olmadan).
22. **Actions → "v2 — web yayını (GitHub Pages /v2/)" → Run workflow.**
23. Birkaç dakika sonra uygulamada **Profil → Sunucu bağlantısını kontrol et** → "Sunucu çalışıyor … Gemini anahtarı: var · izin listesi: var" görmelisin.

## Güvenlik ve maliyet
- Workers'ın ücretsiz planında sınır aşılırsa ücret kesilmez; işlem hata verir ve uygulama yapay zekâsız devam eder.
- Anahtarları değiştirmek: GitHub'da secret'ı güncelle → adım 19'u tekrarla.
- Erişimi kapatmak: Cloudflare'de token'ı sil (My Profile → API Tokens) ya da `ALLOWED_UIDS`'i boşalt ve adım 19'u tekrarla.
