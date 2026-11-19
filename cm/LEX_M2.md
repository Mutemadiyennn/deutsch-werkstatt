# LEX görevi: M1 kartlarını zenginleştirme (PM→İÇERİK 23:20, PM-047 §2, PM-049)

Rolün `.claude/agents/lex.md`. git çalıştırma. Depodaki dosyalara yazma.
Önce oku: `docs/v2/LEARNER.md`, `/home/claude/cm/LEX_GOREV.md` (OD-9 ve hata türleri).

- Girdi: `/home/claude/cm/work/batch-m2.view.jsonl` (İlk Hafta kartlarının ikinci grubu)
- Çıktı: `/home/claude/cm/work/batch-m2.lex.json`, biçim `{"<id>": {"forms": [...], "coll": ["de | tr"], "ex_img": {"1": "..."}, "img": "..."}}`
- Yalnızca değişen alanları yaz. `coll` verirsen tam liste olur (mevcutları koru, eksikleri ekle).

## 1. `forms` (boşluk doldurma biçimleri)
Her öğe: `{"de": "Ich habe ___ Termin.", "answer": "einen", "tr": "Randevum var.", "hint_tr": "**Ich habe** dedikten sonra **der Termin**, **einen Termin** olur."}`. `de` içinde `___` şart.
- **İsim:** üç kullanım, her birinde belirsiz ve belirli biçim, toplam 4–6 madde. (1) Tanıtma: **Das ist ein Termin.** (2) Doğrudan alınan: **Ich habe einen Termin.** (3) Sonrası: **mit dem**, **zum**, **in der** gibi: **Ich komme zum Termin.** Dişil ve nötr isimlerde de aynısı. Kısa, gerçek hayat cümleleri. Çoğulu olmayan ve soyut kelimelerde doğal olanı seç; zorlama cümle kurma. Gün, ay, mevsim adlarında artikel kalıbı doğal değilse **am Montag**, **im Mai** biçimlerini sor.
- **Fiil:** şimdiki zaman (ich, du, er/sie) ve geçmiş: **Ich ___ heute.** / **Ich habe ___.** İki parçalı fiilde tek boşluk ya da iki parça tek cevap: `"Ich ___ den Termin ___."`, `"answer": "sage … ab"`.
- **Sayı, zarf, soru kelimesi:** 2–3 kısa cümle.
- `hint_tr`: tek satır, terim yok, cümleye bağlı: `**Ich brauche** dedikten sonra **der Termin**, **einen Termin** olur.` Çıplak kural (`X sonrası einen gelir`) yazma.
- Öğrenci sıfırdan başlıyor: cümleler kısa ve sık kelimelerle olsun. Öğrenci cinsiyeti gerektiren cümle yazma.

## 2. Eşdizim
Her kartta alan ihtiyacı ve sıklıktan gelen **en az 3** eşdizim. **Termin** için **einen Termin vereinbaren**, **einen Termin verschieben** gibi. Sayı ve gün kartlarında da doğal kalıplar (**am Montag**, **jeden Montag**, **von Montag bis Freitag**).

## 3. Fotoğraf
Yanlış yapılan kelime başka cümle ve başka fotoğrafla döner. **Somut kelimede her örnek cümlenin** kendi `ex_img` sorgusu olur (kısa İngilizce, sahneler farklı). Soyut kelimede en az 2 örneğe sahne sorgusu. Gün, ay, sayı gibi kartlarda takvim, saat, ev numarası gibi net sahneler kullan. Emin değilsen yazma.

Bitince `cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/batch-m2.lex.json` çalıştır. `forms` içindeki `hint_tr` ve `tr` alanlarını da OD-9'a göre kendin denetle. Son mesajında yalnızca kart sayısı, forms toplamı, şüpheler.

## Ek
`exp` alanı olmayan kartta `exp` ve OD-9 `mistakes_tr` da yaz (`LEX_GOREV.md`). İşlev kelimelerinde (`lx:und`, `lx:um`, `lx:nach`, `lx:vor`, `lx:wer`, `lx:was`) `forms` kısa olsun; bunlar ayrı kart olarak gösterilmez, boşluk doldurmada kullanılır. **Eşdizim listesi:** mevcutları koru, eksikleri ekle.

- `mistakes_tr` Türkçe niyetle başlar: `Yorgunum derken **Ich müde** yanlış. Doğrusu **Ich bin müde.**` Ayrıntı: OKUR_DERSLERI.md.
