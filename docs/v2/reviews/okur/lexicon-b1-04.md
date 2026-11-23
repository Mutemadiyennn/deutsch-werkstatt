# Okur kontrolü: lexicon b1-04 (b1-04a + b1-04b, OD-9.3)

Girdi: `content/v2/registry/lexicon/batch-b1-04a.json` (24 kart) ve `batch-b1-04b.json` (26 kart), toplam 50 kart. İkisi de `review.status: draft`.

Okunan alanların hepsi okundu, örneklem yapılmadı:
- Açıklama alanları (516: a 247, b 269): `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar` (8 kartta dolu, çip başına), `exp.ipucu_tr`, her `mistakes_tr`, her `forms[].hint_tr`.
- Çeviri alanları (600: a 288, b 312): her `examples[].tr`, `collocations[].tr`, `forms[].tr`.

Mekanik tarama: açıklama alanlarında `=`, `;`, `…`, tırnak ve 14 kelimeden uzun cümle yok. `ne_zaman_tr` hepsi 12 kelimenin altında, `parcalar` çipleri en çok 3 kelime. Terim taramasındaki eşleşmelerin hepsi kelime içi rastlantı (iletmek, hâlâ, yardımcı olmak, müşteri gibi); terim yok. Çevirilerde 5 yerde Türkçe açılı tırnak var (`«Görüşmemize istinaden»` gibi). İçleri Türkçe, Almanca değil; çeviri alanı olduğu için engel sayılmadı.

Ölçü önceki okur raporlarıyla aynı (`lexicon-b1-01.md`, `lexicon-b1-02.md`): `çoğul`, `tekil`, `isim`, `fiil`, `ek` terim sayılır; **Birden çok**, **Geçmişte**, **sona gelir**, **Sabit kalıp** terimsiz anlatımdır. Notta kartın kelimesi hiç geçmiyorsa ve başka bir sözü anlatıyorsa "başka şeyi anlatıyor" sayıldı (bkz. `lexicon-b6-*`: lx:Schwindel). Boşluk ipucu, kartın kelimesi olmasa da ekrandaki boşluğu anlatıyorsa geçti.

## A. Kart kart sonuç

| kart | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:sich_beziehen | hepsi | | yazdığım şeyin hangi e-postayla, konuşmayla ilgili olduğunu söylemek; hep **auf** ile, **mich** unutulmaz | GEÇTİ | |
| lx:betreffen | hepsi | | bir şey beni ya da bir konuyu ilgilendiriyor, etkiliyor; **mich** denir, **mir** değil; merak etmemek için **interessiert** | GEÇTİ | |
| lx:sich_erkundigen | hepsi | | bir yere sorup bilgi almak; sorulan şey **nach** ile | GEÇTİ | |
| lx:informieren | hepsi | | birine haber vermek; kendin bilgi toplarsan **mich** eklenir; **Sie informieren**, **Ihnen** değil | GEÇTİ | |
| lx:dankbar | hepsi | | minnettar; kibar ricada **Ich wäre Ihnen dankbar, wenn** | GEÇTİ | |
| lx:weiterhelfen | hepsi | | birine yol göstermek, işine yaramak; **weiter** sona gider | GEÇTİ | |
| lx:Unterstützung | hepsi | | destek, yardım; destek istemek **um Unterstützung bitten** | GEÇTİ | |
| lx:sich_bedanken | hepsi | | resmî teşekkür etmek; kime **bei**, ne için **für** | GEÇTİ | |
| lx:im_Voraus | hepsi | | şimdiden, önceden; e-posta sonunda **Vielen Dank im Voraus** | GEÇTİ | |
| lx:weiterleiten | hepsi | | gelen e-postayı başkasına iletmek; kime gittiği **an** ile | GEÇTİ | |
| lx:ausdrucken | hepsi | | belgenin çıktısını almak; **aus** sona gider | GEÇTİ | |
| lx:Zeitpunkt | hepsi | | belli bir an, zaman; daha sonra **zu einem späteren Zeitpunkt** | GEÇTİ | |
| lx:verspätet | diğerleri | | geç gelen cevap, mektup, tren | GEÇTİ | |
| lx:verspätet | mistakes_tr[0] | Geç kaldım derken **Ich habe mich verspätet** dersin. **verspätet** daha çok cevap, mektup ve tren için gelir. | geç kaldım derken bu cümle; ama sonra verspätet daha çok tren, mektup için deniyor. Ben de kişiyim, hangisi? | GERİ | iki fikir var ve birbiriyle çelişir gibi okunuyor: ilk cümle **verspätet**'i kişi için kullanıyor, ikinci cümle kişi için değil diyor. Yanlış olan söz de yazılmamış. |
| lx:Versehen | hepsi | | dikkatsizlik; çoğu zaman **aus Versehen**, yani yanlışlıkla | GEÇTİ | |
| lx:Verzögerung | hepsi | | bir işin gecikmesi; tren için **Verspätung**, iş için **Verzögerung** | GEÇTİ | |
| lx:Geduld | hepsi | | sabır; sabretmek **Geduld haben** | GEÇTİ | |
| lx:spätestens | hepsi | | en geç; **frühestens** en erken | GEÇTİ | |
| lx:zurückschreiben | hepsi | | yazana yazıyla cevap vermek; **zurück** sona gider | GEÇTİ | |
| lx:Verfügung | hepsi | | hazırım, hizmetinizdeyim; hep **zur Verfügung** | GEÇTİ | |
| lx:Ansprechpartner | hepsi | | bir kurumda işimle ilgilenen kişi; kadınsa **Ansprechpartnerin** | GEÇTİ | parça çipi **ansprechen** altında "birine konuşmak" Türkçesi biraz eğri, ama anlaşılıyor |
| lx:kontaktieren | hepsi | | birine yazıp ya da arayıp ulaşmak; **Sie kontaktieren**, **Ihnen** değil | GEÇTİ | |
| lx:formulieren | hepsi | | bir düşünceyi uygun sözlerle söylemek, yazmak | GEÇTİ | |
| lx:höflich | hepsi | | kibar; tersi **unhöflich**, daha kibar **höflicher** | GEÇTİ | |
| lx:ergänzen | hepsi | | eksik bilgiyi sonradan eklemek; tuz ya da dosya eklemek için değil | GEÇTİ | |
| lx:Gewitter | hepsi | | şimşekli, gök gürültülü sağanak; **das Gewitter** | GEÇTİ | |
| lx:verreisen | diğerleri | | bir süreliğine tatile, yolculuğa çıkmak; **Ich bin verreist** | GEÇTİ | |
| lx:verreisen | exp.ipucu_tr | Evde değilsen **Ich bin verreist** dersin. | evde olmadığım her zaman Ich bin verreist derim, markete gidince de | GERİ | ifadenin gerçek anlamını anlatmıyor: söz yolculukta, şehir dışında olmak demek; evde olmamak çok daha geniş, yanlış kullanıma götürüyor |
| lx:verreisen | forms[1].hint_tr | Evde değilsen **verreist** dersin. | aynı: evde yoksam verreist | GERİ | aynı neden |
| lx:verreisen | forms[2].hint_tr | Evde olmayanlar için **verreist** denir. | evde olmayan herkes için verreist | GERİ | aynı neden |
| lx:E-Mail | hepsi | | e-posta; konuşmada **Mail**; **schicken**, **werfen** değil; **per E-Mail** | GEÇTİ | |
| lx:Antwort | hepsi | | cevap; **auf Ihre E-Mail**, **warten auf** | GEÇTİ | |
| lx:korrigieren | hepsi | | hatayı düzeltmek; geçmişte başına **ge** gelmez; oda toplamak değil | GEÇTİ | |
| lx:erwähnen | hepsi | | bir şeyden kısaca bahsetmek; **von** konmaz | GEÇTİ | |
| lx:Mühe | diğerleri | | zahmet, emek; **sich Mühe geben** uğraşmak | GEÇTİ | |
| lx:Mühe | forms[3].hint_tr | Hep birlikte söylenir: **Ich habe mir Mühe gegeben.** | hep beraber, koro gibi mi söyleniyor? Neyin neyle birlikte geldiğini anlamadım, cümleyi kopyaladım | GERİ | anlamadım: **hep birlikte** önce "hep beraber" diye okunuyor; boşluğa gelen **mir** hiç anılmıyor |
| lx:hochladen | hepsi | | internete, siteye belge yüklemek; **hoch** sona gider | GEÇTİ | |
| lx:baldig | hepsi | | yakında olacak, en kısa zamanda; hep bir sözcüğün önünde, sonda **bald** | GEÇTİ | |
| lx:Abwesenheit | hepsi | | resmî dilde yokluğum, ben yokken | GEÇTİ | |
| lx:Unannehmlichkeit | hepsi | | birine verdiğin sıkıntı, rahatsızlık; hastalık değil; **für** konmaz | GEÇTİ | |
| lx:Erfahrung | hepsi | | iş deneyimi; kaç yıl olduğu söylenir; **machen**, **in**, **mit** | GEÇTİ | |
| lx:Schwäche | hepsi | | zayıf yön, zaaf; zaaf **für** ile | GEÇTİ | |
| lx:Verantwortung | hepsi | | sorumluluk; almak **übernehmen**, bir şeyin sorumluluğu **für** | GEÇTİ | |
| lx:flexibel | hepsi | | esnek; saatçe esnek **zeitlich flexibel**; önde **flexible** | GEÇTİ | |
| lx:Unternehmen | hepsi | | şirket, işletme; **das**, çoklusu da aynı | GEÇTİ | |
| lx:Mitarbeiter | hepsi | | çalışan; kadın **Mitarbeiterin**, çoklusu aynı | GEÇTİ | |
| lx:motiviert | hepsi | | istekli, hevesli; **motive** değil | GEÇTİ | |
| lx:Kenntnis | diğerleri | | bir dilde, işte bilgi ve beceri; hep **Kenntnisse** | GEÇTİ | |
| lx:Kenntnis | forms[2].hint_tr | Dil bilgisi **Sprachkenntnisse** olur. | dil bilgisi, yani gramer, Sprachkenntnisse | GERİ | yanlış anlaşılıyor: **dil bilgisi** Türkçede gramer demek; söz ise dil bilmek, hangi dilleri bildiğin (aynı formun çevirisi: Hangi dilleri biliyorsunuz?) |
| lx:selbstständig | hepsi | | kimse söylemeden kendi başına çalışmak; **Ich bin selbstständig** kendi işim var | GEÇTİ | |
| lx:teamfähig | diğerleri | | ekiple iyi çalışabilen; bitişik yazılır | GEÇTİ | |
| lx:teamfähig | mistakes_tr[1] | Ekipte çalışabilirim derken **Ich kann Team arbeiten** yanlış. Doğrusu **Ich kann gut im Team arbeiten.** | ekipte çalışırım derken im Team | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi **teamfähig** notta hiç geçmiyor, **im Team arbeiten** anlatılıyor |
| lx:Gehaltsvorstellung | diğerleri | | maaş beklentisi; araya **s** girer; **liegt bei** | GEÇTİ | |
| lx:Gehaltsvorstellung | exp.ipucu_tr | Rakamdan sonra **brutto** dersen kesintilerden önceki parayı söylersin. | brutto kesintisiz para demek | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor, **brutto** anlatılıyor |
| lx:Herausforderung | hepsi | | zor ama geliştiren yeni görev; her sorun değil | GEÇTİ | |
| lx:Fähigkeit | hepsi | | beceri, yetenek; **die Fähigkeit**, çoklusu **Fähigkeiten** | GEÇTİ | |
| lx:sorgfältig | hepsi | | özenli, dikkatle; yolda dikkatli **vorsichtig** | GEÇTİ | |
| lx:Interesse | hepsi | | ilgi; **Interesse an**; **interessant** ilginç demek | GEÇTİ | |

## B. Takip notları (engel değil, düzeltme önerisi değil)

- Dört boşlukta boşluğa kartın kelimesi değil başka bir söz geliyor: lx:E-Mail forms[3] (**schreibe**), lx:Antwort forms[3] (**auf**), lx:Unannehmlichkeit forms[3] (**Entschuldigen**), lx:Gehaltsvorstellung forms[3] (**brutto**). İpuçları ekrandaki boşluğu doğru anlattığı için geçti; alıştırmanın kartı çalıştırıp çalıştırmadığı yazar/dilbilimci kararıdır.
- lx:verreisen collocations[2].tr "seyahatte olmak, evde olmamak": ilk karşılık doğru olduğu için çeviri olarak geçti; GERİ olan ipuçlarıyla aynı genişlik orada da var.

## Sonuç

- Okunan: 1116 alan (516 açıklama + 600 çeviri), 50 kart
- GEÇTİ: 1108
- GERİ: 8

GERİ kimlikleri:
1. lx:verspätet mistakes_tr[0]
2. lx:verreisen exp.ipucu_tr
3. lx:verreisen forms[1].hint_tr
4. lx:verreisen forms[2].hint_tr
5. lx:Mühe forms[3].hint_tr
6. lx:Kenntnis forms[2].hint_tr
7. lx:teamfähig mistakes_tr[1]
8. lx:Gehaltsvorstellung exp.ipucu_tr

`batch-b1-04a.json` (1 GERİ) ve `batch-b1-04b.json` (7 GERİ) bu hâliyle "reviewed" sayılamaz (OD-9.4).
