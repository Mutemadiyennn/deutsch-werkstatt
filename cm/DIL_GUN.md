# Dilbilimci görevi: M1 günlük içerik

Rolün `.claude/agents/dilbilimci.md`. **Çalışma kopyası `/home/claude/wt-m1`.** git çalıştırma. Görevdeki gün dosyalarını doğrudan düzeltebilirsin. Rapor: `docs/v2/reviews/m1-gunNN-MM.md`.
Önce oku: `docs/v2/LEARNER.md`, `content/v2/m1/FORMAT.md`, `/home/claude/cm/YAZAR_M1.md`, `/home/claude/cm/OKUR_DERSLERI.md`, `docs/v2/WORLD.md`, ilgili `content/v2/temel/r0-*.json`.

## Bak
1. Almanca doğruluk ve doğallık: konuşma dili gerçekçi mi; anons ve sesli mesaj gerçek hayattaki gibi mi?
2. Türkçe çeviri ve açıklamalar doğal, OD-9'a uygun mu?
3. **Öğretmeden isteme:** sıfırdan başlayan öğrenci bu cevabı verebilir mi?
4. Doğru cevap reddedilmesin: `accepted`, `accepted_kaliplar`, `judge()`.
5. Dikte merdiveni: tek doğru cevap, çeldiriciler anlamlı.
6. Prova: dallar mantıklı, geri bildirim doğru ve kısa, her yol kapanışa varıyor.
7. Soru cevabı metinde gerçekten var mı (`kanit`)? Sorunun içinde cevap ele verilmiyor mu?
8. Fotoğraf ve çizim tarifleri kelimeyi doğru gösterir mi?
9. DN-4, WORLD uyumu, sabit öğrenci adı ya da cinsiyeti yok.

## Denetim
`cd /home/claude/wt-m1 && npx tsx /home/claude/cm/m1audit.ts` 0 ihlal olana kadar düzelt. Dinlenen metinde bilinmeyen kelime en çok %5; kart örnekleri bilinen sayılmaz.

`review` alanında `status:"draft"` kalsın, `by` ve `at` doldur. Değişen Türkçe alanları ayırmana gerek yok; okur bütün günü okuyacak. Son mesajında yalnızca düzeltme sayısı, hata oranı, açık maddeler.
