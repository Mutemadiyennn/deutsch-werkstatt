# Okur kontrolü: A2 10. hafta (gün 64–70, hafta sonu testi 10, görülmemiş 10, gr:a2-02:t1–t5)

Tarih: 2026-11-23 · Rol: okur (OD-9.3 katman 2). Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci; yorgun bir akşam, telefondan.

## Kapsam ve yöntem

- Okunan dosyalar: `content/v2/m1/gun-64.json` … `gun-70.json`, `hafta-sonu-testi-10.json`, `gorulmemis-10.json`, `content/v2/registry/grammar.json` içinde `gr:a2-02:t1` … `t5`.
- Örneklem yok. Öğrenciye görünen bütün Türkçe metinler tek tek okundu: `title_tr`, `goal_tr`, `can_do.tr`, `ortam_tr`, `sahne_tr`, `q_tr`, Türkçe şıklar (`opts`), `why_tr`, `geri_bildirim_tr`, `durum_tr`, `situation_tr`, `gorev_tr`, `kontrol_tr`, `kapanis_tr`, `instr_tr`, `metin_tr`, kalıp ve cümle çevirileri (`tr`), dil noktalarında `h_tr`, `tr`, `table.head`, tablonun Türkçe sütunu ve örnek çevirileri.
- Almanca şıklar (dikte "Hangi kelimeyi duydun?" şıkları, boşluk doldurma şıkları) Türkçe metin olmadığı için sayıya girmedi.
- Her `why_tr` ve `geri_bildirim_tr`, maddenin Almancası ve `accepted` listesiyle karşılaştırıldı (açıklama cevapla örtüşüyor mu).
- Uzunluk (14 kelime), yasak sembol ve terim taraması ayrıca betikle yapıldı; çıkan satırların hepsi elle doğrulandı. Uzunluk taşan tek cümle: gun-69 (22 kelime). Sembol: gun-64'te bir `…`.
- Ölçüt OD-9.2: bir alan bir fikir · cümle en çok 14 kelime · `=`, `;`, `…` ve tırnak içinde Almanca yok · öğretilmemiş terim yok · açıklama ekrandaki ifadeyi anlatır · tek okumada anlaşılır.
- 9. hafta emsalleri aynen uygulandı: "fiil", "geçmiş zaman", "ana cümle", "yalın", Dativ/Akkusativ terim sayılır. "Kapı" iç sözü GERİ alır. "İkinci yerde", "en sonda", "geçmişte", "kısa biçim" gündelik söz sayıldı. Aynı cevaba hizmet eden iki kısa cümle tek fikir sayıldı. Üç ayrı fikir ya da birbirini karıştıran iki fikir GERİ aldı. Kalıp çevirilerindeki `…` Almancadaki boş yerin karşılığı sayıldı; açıklama alanındaki `…` GERİ aldı.
- `goal_tr` için 9. haftadaki düzeltilmiş hâl ölçü alındı: ayrı kısa cümlelerle yazılmış iki ya da üç hedef GEÇTİ (gun-63 emsali).
- İçerik dosyalarına dokunulmadı.

## Özet

| Dosya | Okunan | GEÇTİ | GERİ | reviewed sayılabilir mi |
|---|---|---|---|---|
| gun-64 | 227 | 226 | 1 | hayır |
| gun-65 | 225 | 224 | 1 | hayır |
| gun-66 | 220 | 219 | 1 | hayır |
| gun-67 | 214 | 212 | 2 | hayır |
| gun-68 | 224 | 224 | 0 | **evet** (okur açısından) |
| gun-69 | 207 | 206 | 1 | hayır |
| gun-70 | 190 | 188 | 2 | hayır |
| hafta-sonu-testi-10 | 24 | 21 | 3 | hayır |
| gorulmemis-10 | 8 | 8 | 0 | **evet** (okur açısından) |
| grammar gr:a2-02:t1–t5 | 40 | 27 | 13 | hayır |
| **Toplam** | **1579** | **1555** | **24** | |

9. haftaya göre büyük ilerleme: "fiil", "geçmiş zaman", "ana cümle", "yalın" ve "kapı" gün dosyalarında hiç geçmiyor. `;` ve `=` yok. Gün dosyalarındaki 11 GERİ'nin nedenleri:
- Açıklama cevapla örtüşmüyor ya da iki türlü okunuyor: 5 satır.
- "Normal cümle" sözü (ne kastedildiği belirsiz): 2 satır.
- Kimin kastedildiği belirsiz ya da iki anlama gelen söz: 2 satır.
- Bir kutuda üç ayrı fikir: 2 satır.
- 14 kelimeden uzun cümle: 1 satır (yukarıdakilerle çakışıyor).
- Yasak sembol (`…`): 1 satır.

Dil noktaları (t1–t5) hâlâ eski serbest metin biçiminde. 15 alandan 13'ü terim, sembol, uzunluk ve birden çok fikir yüzünden GERİ.

## GERİ satırları

### Önemli (anlamadım, iki türlü okudum ya da açıklama cevapla örtüşmüyor)

| dosya · alan yolu | metin | kendi sözlerimle | neden | öneri |
|---|---|---|---|---|
| gun-70 · `gun_sinavi.maddeler[0].why_tr` | **Ich hoffe**: umarım. Sonra normal cümle gelir. | Ich hoffe "umarım" demek. Sonra... normal bir cümle mi? Neye göre normal? | Anlamadım. "Normal cümle" bana bir şey söylemiyor. Normal olmayanı hiç görmedim. Asıl söylenmek istenen galiba şu: weil'deki gibi bir kelime sona kaçmıyor. Bunu çıkaramadım. | "Normal" yerine sonra gelen kısmı adıyla göster (örneğin **geht es** yerinde kalır). |
| hafta-sonu-testi-10 · `maddeler[10].why_tr` (t11) | **Ich hoffe** ile başla. Sonra normal cümle gelir. | Ich hoffe ile başlarım. Sonra... normal cümle? | Aynı sorun: "normal cümle" belirsiz. Hafta sonu testinde olduğu için daha önemli. | Aynı. |
| gun-70 · `gun_sinavi.maddeler[7].why_tr` | Ne zaman: **am Dienstag von neun bis zwölf**. Sonra **gibt es kein Wasser**. | Önce zamanı söylerim: am Dienstag von neun bis zwölf. Sonra gibt es kein Wasser. | Açıklama cevapla örtüşmüyor. Söylediği sırayla kurarsam "Am Dienstag von neun bis zwölf gibt es kein Wasser" çıkıyor. Bu sıra kabul listesinin hiçbirinde yok. Ekrandaki doğru cevapta (Am Dienstag gibt es von neun bis zwölf kein Wasser.) zaman parçası ikiye bölünmüş. Açıklamadaki parçayı cevapta bir arada bulamadım. | Açıklama doğru cevaptaki sırayı göstersin ya da bu sıra kabul listesine girsin (dilbilimci karar verir). |
| gun-65 · `sahne.bolumler[0].cevapla.why_tr` | **ins Schwimmbad** nereye, **im Fernsehen** nerede. Hayır deyip planını söyle. | ins Schwimmbad "nereye", im Fernsehen "nerede". Hayır deyip ne yapacağımı söylerim. | Açıklama benim cevabımı anlatmıyor. Beklenen cevapta (Nein, ich gehe nach Hause. Am Abend sehe ich das Spiel.) ne ins Schwimmbad ne im Fernsehen var. Üstelik "televizyonda" bir yer gibi "nerede" diye anlatılınca kafam karıştı. İki fikir var. | Açıklama cevaptaki sözü göstersin (örneğin **nach Hause**). Tek fikir olsun. |
| gun-66 · `prova.dugumler[5].secenekler[1].geri_bildirim_tr` | Nereye koyuyorsun? **auf das Sofa** de. | Yanlış yeri mi seçtim? Duvar değil kanepe mi demeliyim? | İki türlü okunuyor. Seçtiğim cümle "Ich lege es an der Wand." Asıl yanlış, nereye sorusunda **der** yerine **die** gelmesi. Açıklama ise yeri değiştirmemi söylüyor. Ben "duvar yanlış yer" diye anladım, dilbilgisi hatasını görmedim. | Yanlışın kendisini göster: nereye diye sorulunca **an die Wand**. Ya da neden kanepe olduğunu tek cümleyle söyle. |
| gun-69 · `sesler[1].bolumler[0].cevapla.situation_tr` | Sinyal geldi. Adını söyle (doğum tarihi yerine sadece adın yeter) ve pazartesi dokuzdaki randevunu iptal ettiğini, salı ya da çarşamba yeni randevu istediğini söyle. | Bip sesinden sonra adımı söyleyeceğim. Doğum tarihi gerekmiyor galiba. Randevuyu iptal edip salı ya da çarşamba yeni randevu isteyeceğim. | İkinci cümle 22 kelime (sınır 14). Parantez içinde ayrı bir fikir var. Üç ayrı iş tek cümlede. Üstelik kayıt "adınızı ve doğum tarihinizi söyleyin" diyor. Hemen altındaki `eylem` sorusunda doğru şık "adımı ve doğum tarihimi söylerim". Burada ise "doğum tarihi gerekmez" deniyor. Hangisi doğru, karıştı. | Kısa cümlelere böl. Parantezi kaldır. Doğum tarihi konusu eylem sorusuyla aynı şeyi söylesin. |
| hafta-sonu-testi-10 · `maddeler[0].situation_tr` (t01) | Tobi soruyor. Telefonunu masaya koydun. | Tobi bir şey soruyor. Ben telefonumu masaya koymuşum. | Kimin telefonu olduğu belli değil. "Telefonunu" hem "kendi telefonunu" hem "onun telefonunu" diye okunuyor. Ben önce kendi telefonum diye okudum. Ses kaydı (Wohin hast du mein Handy gelegt?) Tobi'nin telefonunu soruyor. Kendi telefonum diye anlarsam "Ich habe mein Handy…" derim. Bu cevap kabul listesinde yok. | Kimin telefonu olduğunu açık yaz (Tobi'nin telefonu gibi). |

### Küçük (anlam doğru çıktı; sembol, belirsiz söz ya da birden çok fikir)

| dosya · alan yolu | metin | kendi sözlerimle | neden | öneri |
|---|---|---|---|---|
| gun-64 · `gun_sinavi.maddeler[2].why_tr` | **fängt … an**: başlıyor. **an** en sona gider. | fängt ile an birlikte "başlıyor" demek. an cümlenin sonuna gider. | Sembol `…` (açıklama alanında). | Üç nokta olmadan: **fängt** ve **an** birlikte "başlıyor"; **an** en sonda. |
| gun-67 · `gun_sinavi.maddeler[4].why_tr` | Nereye: **wohin**. Koydun: **hast gelegt**. **gelegt** en sonda. | Nereye: wohin. Koydun: hast gelegt. gelegt sonda. | Bir kutuda üç ayrı bilgi: iki kelime karşılığı ve bir sıra kuralı. Anladım ama bir alan bir fikir değil. | Bu maddenin tek asıl noktasını seç (büyük ihtimalle **gelegt** en sonda). |
| gun-67 · `gun_sinavi.maddeler[10].why_tr` | Koydum: **habe gestellt**. **gestellt** en sonda. Nereye: **in den Keller**. | Koydum: habe gestellt. gestellt sonda. Nereye: in den Keller. | Aynı: üç ayrı bilgi. | Tek fikre indir. |
| hafta-sonu-testi-10 · `maddeler[6].why_tr` (t07) | Sinirlenmek: **sich ärgern über**. Onun için **ärgert sich**. | Sinirlenmek sich ärgern über. Bu yüzden ärgert sich... Yoksa "komşu için" mi? | "Onun için" gündelik Türkçede "bu yüzden" demek. Önce öyle okudum, neden ärgert olduğunu anlamadım. İkinci okumada "o (komşu) için" olduğunu çıkardım. | "Komşun için" ya da "O kişi için" gibi açık bir söz. |

### Dil noktaları (grammar.json, gr:a2-02:t1–t5)

Başlıklar, açıklamalar ve tablo başlıkları hâlâ eski serbest metin biçiminde. t5 dışında hepsinde terim, sembol, uzun cümle ve birden çok fikir var. Tablonun Türkçe sütunu (t5, 4 satır) ve örnek çevirileri (21 satır) tek tek okundu, hepsi GEÇTİ. t5 `h_tr` (Apartman kuralları ve komşular) ve t5 `table.head` (kural · Türkçe) GEÇTİ.

| alan | metin (kısa) | kendi sözlerimle | neden | öneri |
|---|---|---|---|---|
| t1 · `h_tr` | Wo? + Dativ, Wohin? + Akkusativ | Wo ve Wohin... Dativ, Akkusativ ne? | Terimler: Dativ, Akkusativ. Artı işareti. | Terimsiz: "Nerede? – Nereye?" gibi. |
| t1 · `tr` | Şu dokuz edat iki hâlle de kullanılır: 'an', 'auf', … Hangi hâlin geleceğini soru belirler … → … Dativ … “masada” = Wo? + Dativ … | Dokuz kelime var; nerede diye sorulursa masada, nereye diye sorulursa masaya gibi. Lamba üstte, temas yok. | Terimler: edat, hâl, Dativ, Akkusativ. Semboller: `=`, ok, tırnak içinde Almanca. İlk cümle uzun. Dört fikir: dokuz kelime, nerede/nereye, Türkçe benzerliği, über/unter/auf. | Tek fikir: masada / masaya örneğiyle nerede–nereye farkı. |
| t1 · `table.head` | edat · Wo? + Dativ (-de) · Wohin? + Akkusativ (-e) | ? · nerede (-de) · nereye (-e) | Terimler: edat, Dativ, Akkusativ. Artı işareti. | Sütunlar: kelime · nerede? · nereye? |
| t2 · `h_tr` | Artikeller ve kısaltmalar: im/ins, am/ans | Artikel ne? im ile ins, am ile ans kısalıyor. | Terim: artikel. Eğik çizgi. | Gün dosyasındaki "Kısa biçimler: im, ins, am, ans" başlığı zaten anlaşılır. |
| t2 · `tr` | Akkusativ'de yalnızca eril artikel değişir (der → den); dişil, nötr ve çoğul aynı kalır. Dativ'de … Belirsiz artikelde … 'in dem' → 'im' … Yani 'im Bad' = banyoda … | der den oluyor; im, in dem'in kısası; im Bad banyoda, ins Bad banyoya. | Terimler: Akkusativ, Dativ, eril, dişil, nötr, çoğul, belirsiz artikel. Semboller: `;`, `=`, ok, tırnak. Dört fikir. | Tek fikir: im = in dem (nerede), ins = in das (nereye), bir örnekle. |
| t2 · `table.head` | (boş) · der · die · das · çoğul | ? · der · die · das · çoğul | Terim: çoğul. Satır adlarında da "Wo? (Dativ)", "Wohin? (Akkusativ)". | Terimsiz başlık. |
| t3 · `h_tr` | stellen → stehen, legen → liegen | stellen stehen oluyor mu? | Ok işareti; ne anlattığını çıkaramadım. Koymak ile durmak ilişkisi başlıktan anlaşılmıyor. | "Koymak ve durmak" gibi düz bir başlık (gun-66 başlığı gibi). |
| t3 · `tr` | Almancada “koymak” tek bir fiil değildir: dik duran şeyler … 'stellen' … EYLEM fiilleridir … → Wohin? + Akkusativ … İpucu: … bir nesne ister … | Dik şeyler için stellen, yatık şeyler için legen; koyunca nereye, durunca nerede. | Terimler: fiil, eylem fiili, nesne, Akkusativ, Dativ. Semboller: tırnak, ok, artı. İlk cümle 20 kelimeden uzun. Üç fikir. | Tek fikir: dik şey stellen/stehen, yatık şey legen/liegen. |
| t3 · `table.head` | Wohin? + Akkusativ (koymak) · Wo? + Dativ (durmak) | nereye (koymak) · nerede (durmak) | Terimler: Akkusativ, Dativ. Artı işareti. | Sütunlar: koymak · durmak. |
| t4 · `h_tr` | hängen ve Perfekt: gestellt, gelegt, gehängt | hängen ve ... Perfekt ne? | Terim: Perfekt. | "Koydum, astım: gestellt, gelegt, gehängt" gibi (gun-67 başlığı anlaşılır). |
| t4 · `tr` | 'hängen' iki işi birden yapar: 'Ich hänge das Bild an die Wand.' (… → Wohin? + Akkusativ) … Koyma fiillerinin Perfekt'i düzenlidir … 'gehangen' … düzensiz formdur … | hängen hem asmak hem asılı durmak; geçmişte gehängt deniyor; gehangen başka. | Terimler: Akkusativ, Dativ, artikel, fiil, Perfekt, düzenli/düzensiz form. Semboller: tırnak içinde Almanca, ok, `…`. Uzun cümleler. Dört fikir. | Tek fikir: asıyorum → an die Wand; asılı → an der Wand. |
| t4 · `table.head` | Infinitiv · Perfekt · örnek | ? · ? · örnek | Almanca terimler, Türkçesi yok. | Sütunlar: koymak · koydum · örnek. |
| t5 · `tr` | Almanya'da kiralık dairelerde bir 'Hausordnung' … 'man' + 'dürfen'/'müssen' ile ya da 'Bitte …' ile yazılır … Wo?/Wohin? … 'Könnten Sie bitte …?' | Apartmanların kuralları var; komşular uyar; sessizlik saatleri, çöp ayırma; kibarca rica et. | Tırnak içinde Almanca, artı işareti, eğik çizgi, `…`. Dört fikir. İkinci cümle "man + dürfen/müssen" kalıbını terimsiz ama sembolle anlatıyor. | Tek fikir: apartmanda yazılı kurallar var, komşular uyar. |

## Tek okumada anladım ama durduğum yerler (GERİ değil)

| dosya · alan yolu | metin | not |
|---|---|---|
| gun-64 · `sesler[1].bolumler[0].cevapla.situation_tr` | Yeni bir iş arkadaşı tepsisini elinde tutuyor ve soruyor. Kapının yanındaki rafa. | Ne sorduğu yazmıyor. İkinci cümle tek başına kopuk duruyor. Sesi dinleyince anlaşılıyor. |
| gun-64 · `sahne.sahneler[8].tr`, gun-67 · `halkalar[0].sahne.satirlar[2].tr` | Lechner Bey | Tobi'nin soyadı Lechner. Bunu bilmeyen "Lechner Bey kim?" diye durur. |
| gun-65 · `halkalar[1].kaliplar[1].tr` | …'i dört gözle bekliyorum. – Sen de seviniyor musun? – Seviniyoruz. | Almancada tek söz (freuen) var, Türkçede iki ayrı söz. Bağı ikinci okumada kurdum. |
| gun-65 · `prova.dugumler[1].secenekler[0].geri_bildirim_tr` | Çok iyi. **im Büro**: nerede, **in dem** kısalmış. | Sıkışık ama anlaşılıyor. |
| gun-65 · `gun_sinavi.maddeler[5].why_tr` | **sich ärgern über**: **mich** unutma. | sich'in benim için mich olduğunu ikinci anda kurdum. |
| gun-65 · `gun_sinavi.maddeler[1].why_tr` | **im Keller**: bodrumda. **vom** kısa biçim, uzunu **von dem**. | İki ayrı bilgi, sınırda. |
| gun-66 · `halkalar[2].sahne.ortam_tr`, `halkalar[2].sahne.soru.opts[0]` | Zil için adını yazmak istiyor | "Pichler kendi adını mı yazacak?" diye bir an durdum. Bağlam çözüyor. |
| gun-66 · `halkalar[2].kaliplar[1].tr`, gun-67 · `halkalar[1].kaliplar[1].tr` | …'i …'e koysanız daha iyi. · …'i …'e koydum. – …'i …'e astım. – …'i …'e astın mı? | Çok sayıda üç nokta yan yana; okunuyor ama yoruyor. |
| gun-66 · `sesler[1].bolumler[0].cevapla.why_tr` | … Musluk **der** olduğu için **einen** gelir. | İkinci cümle ayrı bir kural; ilk cümle yeterdi. |
| gun-66 · `gun_sinavi.maddeler[10].situation_tr` | Günün provası. … Banyodaki musluk damlatıyor, yatağın yanındaki priz çalışmıyor. | "Günün provası" deniyor ama provada musluk mutfaktaydı, priz banyodaydı. Bir an "yanlış mı hatırlıyorum?" dedim. |
| gun-68 · `prova.kapanis_tr` | … Önerilen saat uymayınca yeni bir saat aldın. | "Saat aldın" önce "kol saati satın aldın" gibi okundu. Bağlam çözüyor. |
| gun-69 · `sahne.bolumler[0].cevapla.why_tr` | Buluşmanın kaydığını söyle. **halt** cümleye ne yapalım havası katar. | İkinci cümle ek bilgi; iki fikir sınırında. |
| gun-69 · `gun_sinavi.maddeler[9].why_tr` | **ne?** değil mi demek. | Türkçedeki "ne?" ile karışıyor; kalın yazı kurtarıyor. |
| gun-69 · `prova.dugumler[0].secenekler[1].geri_bildirim_tr` | Luka henüz kim olduğunu bilmiyor. | "Kimin" olduğunu ikinci cümle çözüyor. |
| gun-69 · `sahne.sahneler[1].tr` | Aa, Huber Hanım! | 9. haftada Huber muayenehanenin sekreteriydi; burada kuaför müşterisi. Aynı kişi mi diye durdum. |
| gun-69 · `okuma_yazma.yazma.kontrol_tr[1]` | Gelemediğin günü ve saati yazdın mı? **kommen** en sonda mı? | Bir maddede iki soru; ikisi aynı cümle için. |
| gun-70 · `halkalar[0].sahne.soru.opts[0]` | Her şeye yetişeceğini | Kimin yetişeceği şıkta yazmıyor; soru ve sahne çözüyor. |
| gun-70 · `gun_sinavi.maddeler[8].why_tr` | Önce ne zaman: **am Freitag ab sieben**. Sonra ne: **eine Firma putzt den Keller**. | İki parçayı tek cümlede yan yana koyarsam yanlış sıra çıkar. Kabul listesinde iki cümleli hâl ("Am Freitag ab sieben. Eine Firma putzt den Keller.") olduğu için GERİ almadı. Dilbilimci baksın. |
| gun-70 · `okuma_yazma.yazma.kontrol_tr[2]` | Olmayan saat için **hat nicht gepasst** yazdın mı? | Cümle anlaşılıyor. Ama **hat nicht gepasst** bu haftanın başka hiçbir yerinde geçmiyor (yalnız gun-70 yazma görevinde). Öğrenci bu sözü ilk kez kontrol listesinde görüyor. Önce öğret ilkesi için dilbilimciye not. |
| gun-70 · `sesler[1].bolumler[0].cevapla.why_tr` | … **Ich rufe wegen meinem Termin an.** | Türkçe açıklama anlaşılır. Almancası gun-67'deki **wegen der Zähler** biçiminden farklı. Okur kapsamı dışında; dilbilimciye not. |

## Sonuç

- Okunan: 1579 (gün dosyaları 1507, hafta sonu testi 24, görülmemiş 8, dil noktaları 40)
- GEÇTİ: 1555
- GERİ: 24 (7 önemli, 4 küçük, 13 dil noktası)
- Dosya düzeyinde: gun-68 ve gorulmemis-10 okur açısından GEÇTİ. Öteki sekiz dosyanın her birinde en az bir GERİ var; bunlar "reviewed" sayılamaz (OD-9.4).

En ağır geri dönüşler: "normal cümle" sözü (gun-70 ve hafta sonu testi t11), cevapla örtüşmeyen açıklamalar (gun-70 t7, gun-65 sahne, gun-66 prova) ve dil noktaları t1–t5 (eski biçim).

GERİ kimlik listesi:

- gun-64: `gun_sinavi.maddeler[2].why_tr`
- gun-65: `sahne.bolumler[0].cevapla.why_tr`
- gun-66: `prova.dugumler[5].secenekler[1].geri_bildirim_tr`
- gun-67: `gun_sinavi.maddeler[4].why_tr`, `gun_sinavi.maddeler[10].why_tr`
- gun-69: `sesler[1].bolumler[0].cevapla.situation_tr`
- gun-70: `gun_sinavi.maddeler[0].why_tr`, `gun_sinavi.maddeler[7].why_tr`
- hafta-sonu-testi-10: `maddeler[0].situation_tr` (t01), `maddeler[6].why_tr` (t07), `maddeler[10].why_tr` (t11)
- grammar: `gr:a2-02:t1` (`h_tr`, `tr`, `table.head`), `gr:a2-02:t2` (`h_tr`, `tr`, `table.head`), `gr:a2-02:t3` (`h_tr`, `tr`, `table.head`), `gr:a2-02:t4` (`h_tr`, `tr`, `table.head`), `gr:a2-02:t5` (`tr`)

## Ek tur (OD-9.3, dilbilimcinin üç düzeltme turundan sonra)

Tarih: 2026-11-23 · Rol: okur. Ölçütler aynı: terim yok, iç söz yok, sembol yok, cümle en çok 14 kelime, bir alan bir fikir, açıklama cevapla örtüşür, kimin kastedildiği belli.

### Kapsam

- Temel: okur raporu commit'i `09b363c5` ("okur raporu (1579 metin"; `9a1c0f0` depoda yok). Karşılaştırılan: bugünkü çalışma ağacı (temiz).
- Okunan dosyalar: `gun-64` … `gun-70`, `hafta-sonu-testi-10`, `gorulmemis-10`, `grammar.json` (gr:a2-02:t1–t5 ve diff'te görünen gr:a2-01 tablo satırları).
- `gun-60` … `gun-63` diff'te görünüyor ama 9. haftanın dosyaları (9. hafta dalından birleşmeyle geldi). Bu turun dışında tutuldu.
- Yöntem: eski ve yeni dosyadaki bütün Türkçe metinler çıkarıldı. Eski dosyada hiçbir yerde geçmeyen her Türkçe metin okundu (yeni ya da değişmiş). Ayrıca metni aynı kalıp cevabı ya da sorusu değişen bütün `why_tr` ve `geri_bildirim_tr` yeniden okundu (açıklama yeni cevapla hâlâ örtüşüyor mu).
- Dilbilimci raporundaki "Hafta kapısı" listesi (13 kalıp satırı, g5–g7, g1 ve g4 adları, 64 ve 67 cevap görevleri, değişen cümle çevirileri) bu kümenin içinde; hepsi okundu.
- Sembol, uzunluk ve terim taraması betikle de yapıldı. `;`, `=`, tırnak, açıklama alanında `…` yok. 14 kelimeyi aşan cümle yok. "kapı", "cümle", "zaman", "hâlâ" geçen satırların hepsi gündelik anlamda (kapı gerçek kapı).

### Sayılar

| Küme | Okunan | GEÇTİ | GERİ |
|---|---:|---:|---:|
| Yeni ya da değişmiş Türkçe metin (gün 64–70, test, görülmemiş) | 136 | 135 | 1 |
| Metni aynı, cevabı ya da sorusu değişen açıklama | 25 | 25 | 0 |
| grammar.json (a2-02: 5 `tr`, 4 `h_tr`, 4 `table.head`, t2 satır adları; a2-01: 3 yeni tablo satırı) | 17 | 13 | 4 |
| **Toplam** | **178** | **173** | **5** |

Dosya bazında: gun-64 136 kümesinden 36, gun-65 15, gun-66 7, gun-67 35, gun-68 11, gun-69 15, gun-70 4, test 5, görülmemiş 8.

Önceki turun 24 GERİ'sinden gün dosyaları, test ve görülmemişteki 11'i bu turda yeniden okundu; 10'u GEÇTİ, biri (gun-69 sesli kayıt durumu) yeni biçimiyle yine GERİ. Dil noktalarındaki 13 GERİ'den 9'u GEÇTİ (bütün `h_tr` ve `table.head`, terim ve sembol temizlendi); dördü (t1, t2, t4, t5 `tr`) bir alan bir fikir kuralı yüzünden GERİ.

### Geri dönenler

| yol | metin | kendi sözlerimle | neden | öneri |
|---|---|---|---|---|
| `content/v2/m1/gun-69.json` · `sesler[1].bolumler[0].cevapla.situation_tr` | Sinyal geldi. Önce adını söyle. Doğum tarihini sonra söylersin. Pazartesi dokuzdaki randevunu iptal et. Salı ya da çarşamba için yeni randevu iste. | Bip sesinden sonra önce adımı, sonra doğum tarihimi söyleyeceğim. Sonra randevuyu iptal edip yeni gün isteyeceğim. | İki türlü okunuyor. "Önce adını … doğum tarihini sonra" bende "adından hemen sonra doğum tarihini söyle" diye okundu. Kabul listesindeki beş cevabın hiçbirinde doğum tarihi yok. Açıklama da (ad, iptal, yeni gün) doğum tarihini saymıyor. Uzunluk sorunu kapandı, ama kafa karışıklığı kaldı. | Doğum tarihini istemiyorsa bunu açık söylesin ("Doğum tarihi bu kez gerekmiyor" gibi). İstiyorsa kabul listesine girsin. |
| `content/v2/registry/grammar.json` · `gr:a2-02:t1` · `tr` | Wo nerede demektir … Dokuz kelimede böyledir: an, auf, … zwischen. über üstünde demektir ama değmez, auf ise değer. | Durma nerede, gitme nereye; masada ve masaya gibi. Dokuz kelimede böyle. Bir de über üstte ama dokunmuyor, auf dokunuyor. | İki fikir: nerede/nereye farkı ve über/auf farkı. Son cümlede "değmez / değer" önce "buna değmez" diye okundu; "dokunmak" anlamını ikinci okumada çıkardım. Terim ve sembol sorunu kapandı. | über/auf farkı ayrı bir noktaya ya da tabloya gitsin. Kalırsa "dokunmaz / dokunur" densin. |
| `content/v2/registry/grammar.json` · `gr:a2-02:t2` · `tr` | Konuşurken iki kelime birleşip kısalır … Nereye sorusunda yalnız der değişir ve den olur: in den Keller. die ve das aynı kalır: in die Küche, ins Bad. | in dem im olur (nerede), in das ins olur (nereye). Bir de nereye diye sorunca der den oluyor, die ve das değişmiyor. | İki fikir: kısa biçimler (başlığın konusu) ve der → den kuralı. Ayrıca "das aynı kalır" denip örnek olarak **ins Bad** verilmiş; das görünmüyor, bir an durdum. | Kutu kısa biçimlerde kalsın. der → den kuralı tabloya ya da ayrı bir noktaya bırakılsın. |
| `content/v2/registry/grammar.json` · `gr:a2-02:t4` · `tr` | hängen hem asmak hem asılı durmak demektir … Yaptığın işi anlatırken habe ile kurarsın … Kaybolan eşyayı şöyle sorarsın: Wohin hast du meine Brille gelegt? | hängen iki anlamlı: asmak ve asılı durmak. Geçmişte habe … gehängt, gestellt, gelegt. Kaybolan şeyi Wohin hast du … gelegt ile sorarım. | İki ayrı fikir: hängen'in iki anlamı ve "koydum, astım" (başlığın konusu). Son cümle üçüncü bir kullanım notu. | Kutu başlıktaki fikirde kalsın: koydum, astım (habe … gehängt, gestellt, gelegt). hängen'in iki anlamı ayrı noktaya. |
| `content/v2/registry/grammar.json` · `gr:a2-02:t5` · `tr` | Almanya'da apartmanların yazılı kuralları vardır … man darf nicht … man muss … gece sessizliği, çöp ve merdivendir … Ruhezeit, Treppenhaus … Könnten Sie bitte die Musik leiser machen? | Apartmanın kuralları var, komşular uyuyor. Yasak man darf nicht, şart man muss. Konular sessizlik, çöp, merdiven. Komşudan kibarca rica et. | Dört fikir: kuralların varlığı, yasak/şart nasıl söylenir, sık konular ve kelimeleri, kibar rica. Her cümle kısa ve terimsiz, ama bir alan bir fikir değil. | Tek fikir: apartmanın yazılı kuralları var, komşular uyar. Yasak/şart söyleyişi ve kibar rica tablo ya da ayrı nokta olsun. |

### GEÇTİ ama durduğum yerler (dilbilimciye not, GERİ değil)

| yol | not |
|---|---|
| `gun-67.json` · `sesler[1].bolumler[0].cevapla.situation_tr` | Haber, serginin pazartesiden cumaya açık olduğunu söylüyor. Ioana cumartesiyi soruyor, görev "Sergiyi öner" diyor. Cumartesi sergi kapalı. Önceki turda gözümden kaçmış; metnin dili anlaşılır, mantığı çelişiyor. |
| `gun-70.json` · `gun_sinavi.maddeler[7].why_tr` (s8) | Önceki GERİ kapandı (sıra iddiası kalktı). Ama açıklamadaki **es gibt kein Wasser** cevapta **gibt es … kein Wasser** diye bölünüyor. İki parçayı yan yana koyarsam "Es gibt kein Wasser am Dienstag von neun bis zwölf" çıkar; bu kabul listesinde yok. |
| `gun-64.json` · `gun_sinavi.maddeler[9].why_tr` (s10) | Görev değişti (artık "çok açsın" da isteniyor, bütün kabullerde Hunger var). Açıklama yalnız **in die Kantine** kısmını anlatıyor. Yanlış değil, yarım. |
| `gun-68.json` · `gun_sinavi.maddeler[10].situation_tr` | "Söyle ve yediyi sor": "saat yediyi" daha rahat okunur. |
| `gun-67.json` · `sahne.bolumler[0].dikte[4].gorev_tr` | Gerçek dikte "söyle" diyor; 66 "yaz", 69 "anlat" diyor. Yazacak mıyım, konuşacak mıyım, bir an durdum. |
| `gun-65.json` · `halkalar[1].kaliplar[4].tr` | Kalıpta "… Bey'e", aynı günün cümlelerinde "Frau Brandl'ın". Hitap iki türlü; anlam bozulmuyor. |

### Sonuç

- Okunan: 178 · GEÇTİ: 173 · GERİ: 5
- Sonuç: **GERİ DÖN.** Gün dosyalarında tek GERİ var (gun-69). Test ve görülmemiş okur açısından GEÇTİ. Dil noktalarında dört `tr` kutusu bir alan bir fikir kuralına takılıyor.
- GERİ kimlikleri: `gun-69` `sesler[1].bolumler[0].cevapla.situation_tr`; `gr:a2-02:t1` `tr`; `gr:a2-02:t2` `tr`; `gr:a2-02:t4` `tr`; `gr:a2-02:t5` `tr`.
- Dosya bazında "reviewed" sayılamayan (OD-9.4): `gun-69.json`, `grammar.json` (gr:a2-02). Okur açısından GEÇTİ: gun-64, 65, 66, 67, 68, 70, hafta-sonu-testi-10, gorulmemis-10.
- İçerik dosyalarına dokunulmadı.
