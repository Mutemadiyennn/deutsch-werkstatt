# Okur raporu: lexicon-batch-a2-08 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-08.json`, 24 kart (posta ve kargo, resmî yazı, aile geçmişi, uyku, eski günleri anlatmak). İlk okur turu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **576 alan**. Bütün satırlar betikle döküldü ve hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar: a2-07 ile aynı liste (aynı Türkçe sözün farklı Almanca vermesi, kişi eşleşmesi, terim, üç nokta, cümleyle örtüşmeyen ipucu, genel kural gibi okunup kartla çelişen ipucu, yanlışla doğru arasında açıklanmayan ikinci fark, 14 kelime).
- Tarama sonucu: **=**, **;**, üç nokta ve dilbilgisi terimi yok. 14 kelimeyi aşan cümle yok. Tırnak içinde Almanca: iki satır (aşağıda). Betiğin terim uyarısı iki yerde yanlış alarm verdi (`lx:anbieten.exp.ne_zaman_tr` "önerilirken", `lx:weggehen.collocations[3].tr` "çekip").

## GERİ satırları

| kart.alan | açıklama | kendi sözlerimle | karar | neden ve öneri |
|---|---|---|---|---|
| `lx:Bescheinigung.mistakes_tr[0]` | Belge lazım derken **Ich brauche ein Bescheinigung** yanlış. Doğrusu **Ich brauche eine Bescheinigung**: **die Bescheinigung**. | Bir belge lazım derken **ein** değil **eine** denir. Sonda bir de **die Bescheinigung** var, neden orada bilmiyorum. | GERİ | Sondaki **: die Bescheinigung** açıklamasız ikinci bir bilgi. Okur bunun neyi gösterdiğini çıkaramıyor. Öneri: sondaki eki kaldırmak. |
| `lx:Postleitzahl.mistakes_tr[0]` | Posta kodunuz nedir derken **Was ist Ihr Postleitzahl?** yanlış. Doğrusu **Was ist Ihre Postleitzahl?**: **die Postleitzahl**. | Posta kodunuz derken **Ihr** değil **Ihre** denir. Sondaki **die Postleitzahl** neden var, anlamadım. | GERİ | Aynı sorun: soru işaretinden sonra gelen **: die Postleitzahl** açıklamasız ek. Öneri: sondaki eki kaldırmak. |
| `lx:Postleitzahl.forms[1].hint_tr` | Bu kelime **Ihre** ile gelir: **Ihre Postleitzahl**. | Posta kodu kelimesi hep **Ihre** ile mi geliyor? | GERİ | Genel kural gibi okunuyor ve yanlış. Aynı kartta **die Postleitzahl**, **die falsche Postleitzahl** de var. Asıl bilgi "sizin" sözünün **Ihre** olması, bu söylenmiyor. Öneri: `forms[0].hint_tr` gibi "Posta kodunuz derken **Ihre Postleitzahl** denir." |
| `lx:Benachrichtigung.exp.anlam_tr` | **die Benachrichtigung** bildirimdir: bir SMS ya da kargocunun bıraktığı kâğıt (**Benachrichtigungskarte**). | Bildirim demek. SMS de olur, kargocunun bıraktığı kâğıt da. Parantezdeki uzun kelime belki o kâğıdın adı. | GERİ | Parantez içinde açıklanmamış ikinci bir Almanca kelime: bir alan bir fikir değil. Öneri: parantezi kaldırmak. Kâğıdın adı gerekiyorsa başka alanda verilir. |
| `lx:Anschrift.mistakes_tr[0]` | Yeni adresim derken **mein neue Anschrift** yanlış. Doğrusu **meine neue Anschrift**: **die Anschrift**. | Yeni adresim derken **mein** değil **meine** denir. Sondaki **die Anschrift** neden var, bilmiyorum. | GERİ | Bescheinigung ve Postleitzahl ile aynı açıklamasız ek. Öneri: sondaki eki kaldırmak. |
| `lx:Anschrift.examples[2].tr` | "Anschrift" mı? Bu düpedüz adres işte. | Bu kelime mi? Basbayağı adres demek. | GERİ | Tırnak içinde Almanca kelime (OD-9.2). Öneri: tırnak yerine kalın yazı, **Anschrift** mı? |
| `lx:Anschrift.examples[3].tr` | – "Anschrift" ne demek? – Adres demek: sokak, kapı numarası, posta kodu ve yer. | Bu kelime ne demek diye soruyor, adres diyorlar. | GERİ | Tırnak içinde Almanca kelime. Öneri: tırnak yerine kalın yazı. |
| `lx:Anschrift.forms[3].hint_tr` | Bu kelime **meine** ile gelir: **meine neue Anschrift**. | Adres kelimesi hep **meine** ile mi geliyor? | GERİ | Genel kural gibi okunuyor. Aynı kartta **Ihre neue Anschrift**, **die Anschrift** da var. "Benim" sözünün **meine** olduğu söylenmiyor. Öneri: "Benim yeni adresim derken **meine neue Anschrift** denir." |
| `lx:Großeltern.forms[3].hint_tr` | Bu kelime **deine** ile gelir: **deine Großeltern**. | Bu kelime hep **deine** ile mi geliyor? Ama ipucunda **meine Großeltern** yazıyordu. | GERİ | Genel kural gibi okunuyor ve kartla çelişiyor. `exp.ipucu_tr` de "Bu kelime…" diye başlıyor ve **meine Großeltern** gösteriyor. Öneri: "Büyükannenle deden derken **deine Großeltern** denir." |
| `lx:vorlesen.mistakes_tr[0]` | Bana mektubu okur musunuz derken **Können Sie mir den Brief lesen?** eksik kalır. Birine sesli okumak **vorlesen**: **Könnten Sie mir den Brief vorlesen?** | **lesen** yetmez, birine sesli okumak **vorlesen**. | GERİ | Yanlışla doğru arasında açıklanmayan ikinci fark var: **Können** de **Könnten** olmuş. Okur hatanın bu olup olmadığını soruyor. Öneri: iki cümlede de aynı baş, örneğin ikisi de **Können Sie**. |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GEÇTİ | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|---|
| `lx:Bescheinigung` | 23 | 22 | 1 | Doktorun ya da bir kurumun bir şeyi yazıyla onayladığı kâğıt. |
| `lx:Postleitzahl` | 27 | 25 | 2 | Adreste yer adının önüne yazılan kod: posta kodu. |
| `lx:Benachrichtigung` | 24 | 23 | 1 | Bildirim: SMS ya da kargocunun bıraktığı kâğıt. |
| `lx:Zusteller` | 23 | 23 | 0 | Mektubu, paketi eve getiren kişi. |
| `lx:Filiale` | 23 | 23 | 0 | Postanenin, bankanın, mağazanın şehirdeki şubesi. |
| `lx:geehrt` | 25 | 25 | 0 | Resmî mektubun ilk satırındaki "sayın". |
| `lx:Anschrift` | 24 | 20 | 4 | Resmî yazıdaki adres. |
| `lx:täglich` | 23 | 23 | 0 | Her gün. İlaçta günde kaç kez olduğunu söyler. |
| `lx:Zeitung` | 23 | 23 | 0 | Haberlerin yazıldığı gazete, internettekisi de. |
| `lx:Opa` | 23 | 23 | 0 | Dede, anne ya da baba tarafı fark etmez. |
| `lx:Großeltern` | 24 | 23 | 1 | Büyükanne ile büyükbaba, ikisi birlikte. |
| `lx:Bauernhof` | 25 | 25 | 0 | Hayvanların, tarlaların olduğu çiftlik. |
| `lx:Fabrik` | 22 | 22 | 0 | Makinelerle bir şey üretilen büyük iş yeri. |
| `lx:gründen` | 24 | 24 | 0 | Yeni bir şirket, aile ya da dernek kurmak. |
| `lx:sammeln` | 22 | 22 | 0 | Tek tek toplamak ya da merakla biriktirmek. |
| `lx:aufwachen` | 25 | 25 | 0 | Uykudan uyanmak. |
| `lx:einschlafen` | 26 | 26 | 0 | Uykuya dalmak. Ayak uyuşunca da kullanılır. |
| `lx:anbieten` | 25 | 25 | 0 | Birine bir şey önermek, ikram etmek. |
| `lx:vorlesen` | 24 | 23 | 1 | Başkası duysun diye sesli okumak. |
| `lx:weggehen` | 24 | 24 | 0 | Bir yerden ayrılmak ya da akşam eğlenmeye çıkmak. |
| `lx:zurückfahren` | 25 | 25 | 0 | Araçla geldiğim yere geri gitmek. |
| `lx:vergehen` | 24 | 24 | 0 | Zamanın ya da ağrının geçmesi. |
| `lx:genießen` | 23 | 23 | 0 | Güzel bir şeyin tadını çıkarmak. |
| `lx:hinfallen` | 25 | 25 | 0 | Kayıp ya da takılıp yere düşmek. |

Karar değiştirmeyen notlar:
- `lx:geehrt.examples[3..5].tr` ve `forms[3].tr` tırnak kullanıyor, ama tırnak içindeki Türkçe (“Sayın yetkili”, “Sayın Berger Hanım”). Almanca değil, GEÇTİ saydım.
- `lx:einschlafen.mistakes_tr[0]` "Uyuyakaldım, işe geç kaldım" için **eingeschlafen** değil **verschlafen** diyor. Aynı kartta `forms[2].tr` "uyuyakaldım" için **eingeschlafen** istiyor. "İşe geç kaldım" eki ayırdığı için çelişki saymadım. Yine de "başka şey anlatır" sözü neyi anlattığını söylemiyor.
- `lx:Zusteller.mistakes_tr[0]`: yanlışta **Der Zusteller**, doğruda **Er** var. Bu ikinci fark okuru yanıltmıyor, yine de not ediyorum.
- `lx:Bescheinigung.forms[2].hint_tr` (**eine** ile gelir) ve a2-07 `lx:Eintritt.forms[2].hint_tr` (**der** ile gelir) da "Bu kelime … ile gelir" kalıbında. Kelimenin kendi etiketini verdikleri için GEÇTİ saydım. Kişiye bağlı sözlerde (**Ihre**, **meine**, **deine**) aynı kalıp yanlış kural gibi okunuyor, o yüzden onlar GERİ.
- `lx:Zeitung.collocations[1].tr` "gazetede yazmak", gazeteye yazı yazmak gibi de okunabilir. Kartın öbür alanları "gazetede yazıyor" anlamını oturttuğu için GEÇTİ.
- Türkçe dışı, kapsam dışı bir gözlem: `lx:täglich.forms[2]`, `lx:Zeitung.forms[0]`, `lx:Opa.forms[0]`/`[3]`, `lx:Bauernhof.forms[1]`, `lx:Fabrik.forms[0]`/`[3]` boşlukta kartın kelimesini değil, eski zaman fiilini soruyor (**arbeitete**, **kaufte**, **spielte**, **machten**, **brauchte**). İpuçları bu fiili doğru anlatıyor.

## Sayılar

- Toplam: 576
- GEÇTİ: 566
- GERİ: 10

GERİ kimlikleri: `lx:Bescheinigung.mistakes_tr[0]`, `lx:Postleitzahl.mistakes_tr[0]`, `lx:Postleitzahl.forms[1].hint_tr`, `lx:Benachrichtigung.exp.anlam_tr`, `lx:Anschrift.mistakes_tr[0]`, `lx:Anschrift.examples[2].tr`, `lx:Anschrift.examples[3].tr`, `lx:Anschrift.forms[3].hint_tr`, `lx:Großeltern.forms[3].hint_tr`, `lx:vorlesen.mistakes_tr[0]`

GERİ olduğu için batch-a2-08 "reviewed" sayılamaz (OD-9.4). Düzeltmeden sonra yalnız bu 10 alan yeniden okunur.

## Fark turu (2026-11-23): düzeltilen 10 alan

| kart.alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| `lx:Bescheinigung.mistakes_tr[0]` | Belge lazım derken **Ich brauche ein Bescheinigung** yanlış. Doğrusu **Ich brauche eine Bescheinigung**. | Bir belge lazım derken **ein** değil **eine** denir. | GEÇTİ | Sondaki açıklamasız ek gitmiş. Tek fark, tek fikir. |
| `lx:Postleitzahl.mistakes_tr[0]` | Posta kodunuz nedir derken **Was ist Ihr Postleitzahl?** yanlış. Doğrusu **Was ist Ihre Postleitzahl?** | Posta kodunuz derken **Ihr** değil **Ihre** denir. | GEÇTİ | Ek gitmiş, tek fark. |
| `lx:Postleitzahl.forms[1].hint_tr` | Posta kodunuz derken **Ihre Postleitzahl** denir. | "Sizin posta kodunuz" için **Ihre Postleitzahl** derim. | GEÇTİ | Artık Türkçedeki "-nuz" sözüne bağlı, genel kural gibi okunmuyor. Cümleyle örtüşüyor. |
| `lx:Anschrift.mistakes_tr[0]` | Yeni adresim derken **mein neue Anschrift** yanlış. Doğrusu **meine neue Anschrift**. | Yeni adresim derken **mein** değil **meine** denir. | GEÇTİ | Ek gitmiş, tek fark. |
| `lx:Anschrift.forms[3].hint_tr` | Benim yeni adresim derken **meine neue Anschrift** denir. | "Benim yeni adresim" için **meine neue Anschrift** derim. | GEÇTİ | "Benim" sözüne bağlı, cümleyle (Bu benim yeni adresim) örtüşüyor. 9 kelime. |
| `lx:Anschrift.examples[2].tr` | **Anschrift** mı? Bu düpedüz adres işte. | Bu kelime mi? Basbayağı adres demek. | GEÇTİ | Tırnak yok, kalın yazı. |
| `lx:Anschrift.examples[3].tr` | – **Anschrift** ne demek? – Adres demek: sokak, kapı numarası, posta kodu ve yer. | Bu kelime ne demek diye soruyor, adres diyorlar. | GEÇTİ | Tırnak yok, kalın yazı. |
| `lx:Großeltern.forms[3].hint_tr` | Büyükannenle deden derken **deine Großeltern** denir. | "Senin büyükannenle deden" için **deine Großeltern** derim. | GEÇTİ | "Senin" sözüne bağlı, `exp.ipucu_tr` ile çelişmiyor. Cümleyle örtüşüyor. |
| `lx:Benachrichtigung.exp.anlam_tr` | **die Benachrichtigung** bildirimdir: bir SMS ya da kargocunun bıraktığı kâğıt. | Bildirim demek. SMS de olur, kargocunun bıraktığı kâğıt da. | GEÇTİ | Parantezdeki ikinci kelime gitmiş. Tek fikir, 11 kelime. |
| `lx:vorlesen.mistakes_tr[0]` | Bana mektubu okur musunuz derken **Können Sie mir den Brief lesen?** eksik kalır. Doğrusu **Können Sie mir den Brief vorlesen?** | Birine okumasını isterken **lesen** yetmez, **vorlesen** denir. | GEÇTİ | İki cümlenin başı artık aynı (**Können Sie**). Tek fark var: **lesen** yerine **vorlesen**. |

### Fark turu sayıları

- Okunan satır: 10
- GEÇTİ: 10
- GERİ: 0

Fark turunda GERİ kalmadı. Okur kapısı (OD-9.3) açısından batch-a2-08 "reviewed" olabilir (bütün turlar: 576 alan, açık GERİ yok).
