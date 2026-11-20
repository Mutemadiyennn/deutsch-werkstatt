# CALISMA_DUZENI: çalışma düzeni — "önce ölçüt, sonra iş" (PM-079)

> PM belgesi; metin #12 yorum 7046369083'ten **aynen** alındı (20.11.2026). Değişikliği yalnız PM yapar. CLAUDE.md "Değişmez kurallar"daki üç satır (Hazır tanımı · öz-denetim · tek geçişte tam bakış) bu belgeye bağlıdır.
>
> **Sonradan gelen PM kararı (7046691693, "Actionssız düzen"):** GitHub Actions bu depoda GitHub tarafından kapatıldığı sürece madde 4 ve 5'teki "CI" denetimleri `scripts/kapi.sh` ile yürür: kapıyı işi yazan değil, bağımsız inceleme ajanı temiz çalışma ağacında koşar; yol süzgeci betiğin içindedir. "Bitti" kararı bu koşunun WebKit sonucuna göre verilir.

---

**PM-079 · Çalışma düzeni: "önce ölçüt, sonra iş"** (proje sahibi onayladı, 20.11 19:00 Berlin: "Onaylıyorum; ne zaman uygulanacağı kararı sende. Yarım kalan iş olmasın.")
Bugünün ikinci talimatı; PM-077'nin "günde bir" kuralına proje sahibinin açık isteğiyle tek istisna. Ürün işi eklemiyor, **çalışma biçimini** değiştiriyor.

**Neden (ölçüm, son 24 saat):** birleşen 40 PR'ın 29'u (%72) en az bir "değişiklik gerekli" turu yedi; tam CI ortanca 34 dk. Kusurun çoğu ölçütün işten sonra ve parça parça gelmesinden; payın büyüğü bende.

**Ne zaman:** şu andan itibaren **yeni başlayan her iş** için. **Açık PR'lar eski düzenle biter**; hiçbiri geri çekilmez, yeniden yazılmaz.

## Kurallar
1. **Hazır tanımı (işe başlama kapısı).** Bir iş şu üçü olmadan başlamaz: (a) **kabul listesi** (ölçülebilir maddeler; "ne görünce bitti deriz"), (b) arayüz değişiyorsa **hedef ekran** (`design/TARGET*`), (c) tek satır **"Rakip:"** (hangi rakibin hangi güçlü yanı, hangi eleştiriyi nasıl düzeltiyor; #30 7043221232). Listeyi motor yazar ve #12'ye ya da işin PR taslağına koyar; ben tek yanıtla onaylar ya da düzeltirim. **Arayüzsüz işte 60 dakikada yanıt vermezsem motor kendi listesiyle başlar** (ben kilit olmam). Arayüzlü işte hedef ekran şarttır; yoksa önce ben çizerim.
2. **Öz-denetim.** PR açılmadan önce motor kabul listesini ve yerleşim bekçisini (madde 4) yerelde koşar; sonucu PR açıklamasına madde madde yazar. Liste karşılanmadan inceleme ajanı başlatılmaz.
3. **Tek geçişte tam bakış.** İnceleme 1. turda bütün bulguları yazar; 2. tur yalnız düzeltmeyi ve düzeltmenin getirdiği kusuru doğrular (PM-057 "iki tur" aynen). Aynı kural bana: bakışımı tek yorumda eksiksiz yazarım; ikinci bakışta eski koda yeni kusur çıkarırsam o kusur engel değil, takip işidir.
4. **Yerleşim bekçisi (CI, gezgin kapısına kural seti).** Gezginin yürüdüğü her ekranda, 932 ve 844 yükseklikte: birincil düğme tam görünür ve hiçbir öğeyle kesişmiyor · etkileşimli öğeler üst üste değil · aynı metin (≥ 3 sözcük) bir ekranda iki kez yok · ana ekranlarda açıklama ≤ 2 satır · satır başında ya da sonunda yalnız "·" yok · yatay taşma yok · Almanca başlık hecelenmiyor. İhlal = kırmızı. **ANA: tek PR; AK-10'un 4. adımından (ekran) önce.** Bugün elle yakaladığım kusurların çoğu bu listede.
5. **CI yol süzgeci.** Yalnız `docs/` değişen PR: `check` (hedef ≤ 5 dk). Yalnız `content/` değişen PR: doğrulayıcı + içerik testleri + tek cihazda kısa duman (hedef ≤ 12 dk). `web/`, `packages/`, `worker/`, `tests/`, `.github/` değişirse tam koşu. Birleşmeden sonra `main`'de her zaman tam koşu; kırmızıysa `[PM-KİLİT]`. Zorunlu denetim adı değişmesin diye tek "kapı" işi sonucu toplar. **ANA: tek PR, hemen.**
6. **Küçük düzeltmeler toplanır.** Aynı alandaki ≤ 50 satırlık düzeltmeler tek PR'da (en çok 5 düzeltme); tek cümlelik düzeltmeye ayrı PR açılmaz.
7. **Tanı ekranı.** Profil'de tek ekran, tek ekran görüntüsüyle kanıt: kabuk sürümü ve eklentiler, ses yolu ve sesler, hız ölçümü, mikrofon yolu, raf durumu, kalıcı depolama, içerik paketi kimliği, son hata. Kabuk 1.5 (#164) birleşince küçük PR; var olan "Ses ve mikrofon" ve kabuk satırı buraya bağlanır, silinmez.
8. **Depo açık kalır.** CI dakikası açık depoda sınırsız; bu tempoda gizli depoda ücretsiz pay bir günde biter. "M1 kabulünde gizliye al" kararı, madde 5 ölçülüp ben yeniden karar verene kadar **askıda** (ücret riski).
9. **İçerik hattını çoğaltma şartı.** İkinci içerik hattı ancak (a) 1. gün Halka pilotu proje sahibinin telefonunda onaylanınca ve (b) omurga taslağı birleşince açılır. Ondan önce 2.–7. gün dışındaki haftalar için içerik yazılmaz.
10. **Ölçüm (her akşam raporunda, aynı ölçüyle):** ilk turda geçen PR oranı (bugün %28; hedef bir haftada ≥ %60), tam CI ortanca süresi, açılış→birleşme ortanca süresi, arayüz PR'ının benim bakışımı bekleme süresi (≤ 60 dk).

## Benim borçlarım (bu düzenin çalışması için)
- Hedef çizimler, işin sırasına göre: K10 çerçeve sözcüğü gösterimi → gün sonu sınavı ve "Bu günü biliyorum" kapısı → Yol (haftalar) → Köy mekânları (Bahçe, Sinema, Radyo) → Ben → Sözlük → Atölye. Her biri ilgili iş başlamadan önce `design/`'a girer.
- AK-10 adımlarının kabul listeleri: 2. adım için AK-9 testleri yeterli; 3. ve 4. adım için TARGET3b + madde 4.

## Kalıcılık
ANA: bu on maddeyi `docs/v2/CALISMA_DUZENI.md` olarak depoya al (PM belgesi, metin aynen) ve `CLAUDE.md` "Değişmez kurallar"a üç satır ekle: Hazır tanımı · öz-denetim · tek geçişte tam bakış (PM-079'a bağla). PR açıklaması şablonuna "Kabul listesi" ve "Rakip:" başlıkları girsin. Tek belge PR'ı (madde 5 gelene kadar tam CI koşar; sorun değil).

Yanıt: `✓ PM-079 — <PR>` ya da `✗ PM-079 madde n — <gerekçe>`; itirazı olan madde için daha iyi yolu yazın, mekanizma sizde.
