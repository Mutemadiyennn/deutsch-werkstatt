# 2. ve 3. gün halkaları, ek 6 görev cümlesi: dilbilimci incelemesi (İÇ-3, PM-084 hat C, PR 1a)

Dosyalar: `content/v2/m1/gun-02.json` (5 madde), `content/v2/m1/gun-03.json` (1 madde) · Tarih: 2026-11-22 · İnceleyen: dilbilimci-ajan (yazardan bağımsız)

Kapsam: yalnızca eklenen ya da değişen **6 görev cümlesi** (`halkalar[].gorev_cumleleri[]`: `de`, `tr`, `accepted[]`). Dosyaların geri kalanına bakılmadı ve dokunulmadı.

İncelenen: **6 madde** (6 Almanca cümle, 6 Türkçe çeviri, 18 kabul satırı).

Denetim (düzeltmelerden sonra):
- `npm run content:validate` → **0 hata**, 144 uyarı (hiçbiri bu maddelerle ilgili değil).
- `kt.ts … cumle` → 6 cümle ve 29 kabul satırının hepsi **TAMAM**. Yeni sözcük eklenmedi.

## Kararlar

| # | Madde | `de` | `tr` | Kabul listesi |
|---|---|---|---|---|
| 1 | m1:02:h1 `lx:Januar` „Im Januar, am Montag?“ | doğru, doğal | doğru | 1 satır eklendi |
| 2 | m1:02:h2 `lx:Geburtstag` „Ihr Geburtstag? Im Mai oder im Juni?“ | doğru, doğal | doğru | 2 satır eklendi |
| 3 | m1:02:h4 `lx:haben` „Im August habe ich Urlaub.“ | doğru, doğal | doğru | 2 satır eklendi |
| 4 | m1:02:h5 `lx:wann` „Wann ist Ihr Urlaub? Im Juli oder im August?“ | doğru | doğru | 3 satır eklendi |
| 5 | m1:02:h5 `lx:Ende` „Ich habe von Juli bis Ende August Urlaub.“ | doğru | doğru | 2 satır eklendi |
| 6 | m1:03:h4 `lx:siebzehn` „Im August habe ich siebzehn Tage Urlaub.“ | doğru, doğal | doğru | 1 satır eklendi |

Hiçbir `de` ve `tr` alanı değişmedi. Çerçeve sözcükleri ve K(t) kısıtları olduğu gibi duruyor. Kabul listelerinden satır çıkarılmadı; yalnızca sona ekleme yapıldı (`accepted[0]` = `de`).

## Bulgular ve düzeltmeler

Altı bulgunun hepsi aynı türden: **kabul listesinde eksik doğru cevap (haksız ret riski)**. Ölçüt, aynı dosyanın daha önce onaylanmış satırlarıdır: orada kabul edilen bir biçim burada reddedilirse öğrenci aynı sözü bir satırda doğru, öbüründe yanlış görür (okurun 1. turdaki K3 ve K4 kökleriyle aynı sorun).

| # | Madde | Sorun | Eklenen |
|---|---|---|---|
| 1 | h1 `lx:Januar` | Üçüncü kabul satırı („Im Januar? Am Montag?“) ilkinden yalnızca noktalamayla ayrılıyor. Değerlendirici noktalamayı siler (`web/src/core/grading.ts`, `norm`), yani listede gerçekte iki cevap vardı. **am**'sız gün adı aynı halkada kabul ediliyor („Montag? Nein, im Februar.“). | „Im Januar, Montag?“ |
| 2 | h2 `lx:Geburtstag` | **oder**'den sonra **im** tekrarlanmayabilir; en sık söylenen biçim budur. h1'de „Im Februar oder März?“ ve „Februar oder März?“ kabul ediliyor, burada yoktu. | „Ihr Geburtstag? Im Mai oder Juni?“, „Ihr Geburtstag? Mai oder Juni?“ |
| 3 | h4 `lx:haben` | **Ich habe Urlaub im August.** doğru ve yaygın. Aynı halkada „Ich habe Urlaub am Montag.“, h5'te „Ich habe Urlaub Anfang August.“ ve „Mein Urlaub ist Anfang August.“, günün sahnesindeki cevap maddesinde (`sahne.bolumler[0].cevapla`) „Ich habe Urlaub im Juli.“ ve „Mein Urlaub ist im Juli.“ kabul ediliyor. | „Ich habe Urlaub im August.“, „Mein Urlaub ist im August.“ |
| 4 | h5 `lx:wann` | (a) Üçüncü satır („… Im Juli? Oder im August?“) yine yalnızca noktalama farkı: gerçekte iki cevap. (b) Gündelik konuşmada asıl soru **Wann haben Sie Urlaub?**; bir üstteki satırda („Wann ist Ihr Urlaub, Frau Huber?“) kabul ediliyor, burada yoktu. (c) **im**'siz ikinci ay, 2. bulguyla aynı. | „Wann haben Sie Urlaub? Im Juli oder im August?“, „Wann ist Ihr Urlaub? Im Juli oder August?“, „Wann ist Ihr Urlaub? Juli oder August?“ |
| 5 | h5 `lx:Ende` | 3. bulguyla aynı: **Urlaub** fiilin hemen ardından gelebilir, süre sona kalır. Konuşmada en az gösterilen cümle kadar sık. | „Ich habe Urlaub von Juli bis Ende August.“, „Mein Urlaub ist von Juli bis Ende August.“ |
| 6 | 3. gün h4 `lx:siebzehn` | 3. bulguyla aynı. | „Ich habe siebzehn Tage Urlaub im August.“ |

### Son hâl (tam metin)

1. `["Im Januar, am Montag?", "Am Montag, im Januar?", "Im Januar? Am Montag?", "Im Januar, Montag?"]`
2. `["Ihr Geburtstag? Im Mai oder im Juni?", "Ihr Geburtstag? Im Juni oder im Mai?", "Ist Ihr Geburtstag im Mai oder im Juni?", "Ihr Geburtstag? Im Mai oder Juni?", "Ihr Geburtstag? Mai oder Juni?"]`
3. `["Im August habe ich Urlaub.", "Ich habe im August Urlaub.", "Urlaub habe ich im August.", "Ich habe Urlaub im August.", "Mein Urlaub ist im August."]`
4. `["Wann ist Ihr Urlaub? Im Juli oder im August?", "Wann ist Ihr Urlaub? Im August oder im Juli?", "Wann ist Ihr Urlaub? Im Juli? Oder im August?", "Wann haben Sie Urlaub? Im Juli oder im August?", "Wann ist Ihr Urlaub? Im Juli oder August?", "Wann ist Ihr Urlaub? Juli oder August?"]`
5. `["Ich habe von Juli bis Ende August Urlaub.", "Von Juli bis Ende August habe ich Urlaub.", "Urlaub habe ich von Juli bis Ende August.", "Ich habe Urlaub von Juli bis Ende August.", "Mein Urlaub ist von Juli bis Ende August."]`
6. `["Im August habe ich siebzehn Tage Urlaub.", "Ich habe im August siebzehn Tage Urlaub.", "Siebzehn Tage Urlaub habe ich im August.", "Ich habe siebzehn Tage Urlaub im August."]`

## Bakılan, sorun bulunmayan noktalar

- **Almanca (`de`).** Altısı da dilbilgisi açısından doğru: **im** + ay, **am** + gün, başa alınan zamandan sonra **habe ich**, **von Juli bis Ende August** (**Ende** + ay edatsız), **siebzehn Tage** çoğul. 1, 2 ve 4 soru parçası; randevu ve izin konuşmasında karşıdakinin sözünü teyit ederken tam böyle söylenir.
- **Mevcut kabul satırları.** 18 satırın hepsi doğru Almanca. **Urlaub habe ich im August.** ve **Siebzehn Tage Urlaub habe ich im August.** vurgulu sıra, yanlış değil. **Ist Ihr Geburtstag im Mai oder im Juni?** iki parçayı tek soruda birleştiriyor, anlam aynı.
- **Türkçe.** Altı çeviri doğru ve doğal. **am** olan satırda „günü“ var (1). „İznim var“ halkanın **haben** kalıbıyla aynı karşılık. Türkçelerin hiçbiri hafta içinde başka bir görev cümlesinde geçmiyor.
- **„Ağustosta iznim var.“** günün sahnesinde de geçiyor (s2, s5: „Ich habe im August Urlaub.“). Orada yalnızca okunuyor; görev cümlesinde iki sıra da kabul listesinde olduğu için çakışma haksız ret doğurmuyor.
- **Rakam.** 6. cümlede öğrenci „17“ yazarsa değerlendirici yazıya çevirir (`norm`), ayrı kabul satırı gerekmedi.
- **Kimlik.** Altı satırda öğrencinin adı ya da cinsiyeti yok; birinci tekil cümlelerde cinsiyet taşıyan biçim yok. İngilizce yok, Bairisch yok, olgu iddiası yok.
- **Tekrar.** Altı `de` cümlesi 1. haftanın başka hiçbir yerinde aynen geçmiyor. („Im August habe ich Urlaub.“ günün provasında yalnızca bir kabul satırı olarak var.)

## Kalan şüpheler (dil hatası değil)

1. **5. cümlenin gerçekliği.** „Temmuzdan ağustos sonuna kadar izin“ bir çalışan için uzun (altı ila sekiz hafta). Ayrıca öğrencinin izni görev cümlelerinde birbirini tutmuyor: ağustos başı (h5), ağustosta on yedi gün (3. gün h4), on dört gün (3. gün h4), temmuzdan ağustos sonuna (bu cümle). Önceki raporda doğum günü için yazılan şüpheyle aynı tür: alıştırma cümlesi, karar İÇ/ANA'da. Seçenek: „Ich habe von Anfang bis Ende August Urlaub.“ (kt: TAMAM; çerçeve ve **Ende** kartı yerinde). Değiştirmedim, çünkü aynı halkanın sahnesinde Stadler Hanım'ın satırı („Von Anfang bis Ende August.“) neredeyse aynı söz ve cümle iki ayrı ayla kalıbı daha iyi gösteriyor.
2. **Yalnızca noktalamayla ayrılan iki kabul satırı** (1. ve 4. maddelerin üçüncü satırı) listede duruyor. Yanlış değiller, ama değerlendiricide ilk satırla aynı cevaba iner. D-064 sayımı artık onlarsız da tutuyor (1. madde: 3 ayrı cevap; 4. madde: 5 ayrı cevap). İstenirse çıkarılabilir.
3. **4. cümle**, hemen üstündeki satırla aynı kartta ve aynı başlangıçta („Wann ist Ihr Urlaub, Frau Huber?“). Aynı cümle değil; ikinci yarısı yeni bir şey istiyor (**oder** ile iki ay). Planlayıcı ikisini art arda verirse tekrar gibi görünebilir.
4. **1. cümle** bağlamı: aynı halkanın sahnesinde muayenehane ocakta kapalı. Cümle soru olduğu için çelişki yok.

## Sonuç

Dil hatası: **0 / 6** (Almanca 0, Türkçe 0, yanlış kabul satırı 0). Kabul listesi eksiği: **6 / 6 maddede**, toplam **11 satır eklendi**; hepsi dosyada düzeltildi, iki denetim temiz.

**KAPANDI** (dil açısından). Dosyaların üst düzey `review` alanına dokunulmadı (kapsam yalnızca 6 madde; iki dosya da medya paketini bekleyen „draft“ durumunda). Sıradaki: örneklem kontrolü.

## Ek tur (2026-11-22, yalnız 5. madde)

İÇ, 1. şüphe üzerine 5. cümleyi değiştirdi: „Ich habe von Juli bis Ende August Urlaub.“ → **„Ich habe von Ende Juli bis Anfang August Urlaub.“** · tr „Temmuz sonundan ağustos başına kadar iznim var.“ · beş kabul satırı aynı beş sırayla yeni süreye çevrildi. Yukarıdaki tabloların 5. satırı eski metni anlatır; geçerli olan bu bölümdür.

- **Almanca:** doğru ve doğal. **von Ende Juli bis Anfang August** tam böyle söylenir: **Ende** ve **Anfang** ay adının önünde edatsız kalır, **von** ve **bis** doğrudan önlerine gelir. Kartların uyarısı yalnızca **am Anfang Juni** ve **im Ende Mai** içindir; **Ende** kartının kendi boşluk cümlesi de **bis Ende August** diyor. Çelişki yok.
- **Türkçe:** doğru ve doğal; „-dan … -a kadar“ kalıbın karşılığıyla aynı.
- **Kabul satırları:** beşi de doğru Almanca (düz sıra, zaman başta, **Urlaub** başta, **Urlaub** fiilin ardında, **Mein Urlaub ist …**). Eksik varyant görmedim. **von**'suz konuşma biçimi („Ende Juli bis Anfang August habe ich Urlaub.“) doğru, ama Türkçede „-dan“ ve halkanın kalıbı **von**'u istediği için eklemedim.
- **Aynı halkadaki satırlarla ilişki:** „Anfang August habe ich Urlaub.“ ile artık tutarlı (izin ağustos başını kapsıyor). „Anfang oder Ende Juli?“ ve „Nein, Ende Juli, nicht Anfang.“ ile çakışma yok: Türkçeleri ayrı, hiçbiri aynı Almancaya gitmiyor. Yeni cümle ve Türkçesi 1. haftada başka yerde geçmiyor.
- **Denetim:** `content:validate` → 0 hata; `kt.ts cumle 2 5` → `de` ve beş kabul satırı TAMAM.

Bulgu: **0**. Dosyada değişiklik yapmadım. 1. şüphe **kapandı** (süre gerçekçi: bir iki hafta). Öbür şüpheler (2–4) aynen duruyor. Sonuç: **KAPANDI**.
