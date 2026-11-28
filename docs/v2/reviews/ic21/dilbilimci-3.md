# İÇ-21 A1 seviye tespiti havuzu: dilbilimci, fark turu 3 (İnceleme P1-1)

Kapsam: `p1-fark.diff` ve bu farkın şu anki havuz hâli. Üç şeye baktım:
- silinen 97 dil noktası etiketi ve havuzdan çıkan 11 madde;
- yeni maddeler m008–m017 ve eklenen 5 kaynak madde;
- m002 ile m003'e eklenen `strictNumberWords`.

Ayrıca bütün havuzda **kalan** dil noktası etiketlerini aynı kurala göre taradım. Kural: bir etiket ancak bütün `accepted` varyantları o yapıyı içeriyorsa kalır. Taramayı dil noktası başına yazdığım bir desen denetimiyle yaptım, çıkan her durumu da gözle doğruladım.

## (a) Silinen etiketler
94 maddede silinen etiketlerin hepsini tek tek okudum. Etiketlerin 96'sı gerçekten yapıyı atlayan bir varyant içeriyor. Birkaç örnek:
- `0357` ve `10:45` gibi rakamla yazılmış varyantlar;
- "Geht Samstag?", "Ich brauche einen Termin", "Ich heiße {name}";
- "Einen Kuchen, bitte.", "Können Sie …", "Um fünf.", "Mit dem Fahrrad.", "Bitte hier warten.", "Ich will …".

Üç maddede "yapı her varyantta var mı" sorusunu 1190–1734 varyantın tamamı üzerinde denetledim:
- m1:07:t03: 490 varyantta modal fiil yok ("brauche").
- m1:07:t09: 172 varyantta sein/haben yok ("heiße").
- m1:07:t09: hiçbir varyantta modal fiil yok.

Sonuç: bu üç maddedeki silme de doğru.

**Yanlışlıkla silinen 1 etiket:** m1:35:s11'deki gr:a1-05:t5. Altı varyantın altısı da "am Nachmittag fahre ich" kalıbıyla fiili ikinci yerde tutuyor (ayrıca "Am Vormittag kaufe ich", "Um neun stehe ich"). Etiketi geri koydum.

Bilerek bırakılan etiketleri yerinde buldum: gr:a1-12:t5 ("mein Name ist / {name} hier" da kendini tanıtmak), gr:a1-14:t4, gr:a1-11:t4 ("wo ist" da yol sormak) ve gr:a1-09:t5. Bunların ölçtüğü şey biçim değil, konuşmanın işi; o yüzden kısa cevaplar da yapının içinde sayılır.

## Kalan etiketlerde aynı kuralın atladığı 4 madde (düzeltildi)
| kimlik | silinen | yapıyı atlayan varyant |
|---|---|---|
| m1:20:s6 | gr:a1-12:t4 | "Mein Termin ist am 21. Dezember." (sıra sayısı rakamla) |
| m1:30:s6 | gr:a1-05:t4 | "Am Samstag gehe ich einkaufen." (ayrılan fiil yok) |
| m1:31:s9 | gr:a1-08:t2 | "Krankenpflegerin. Sie arbeitet in der Nacht." (incelemenin örneği) |
| m1:42:t04 | gr:a1-06:t4 → **madde çıktı** | "Am Samstag schlecht, am Sonntag schön." ("es ist" yok). Etiketsiz kaldı, havuzdan çıkardım. Kapsam yetiyor. |

Bilerek dokunmadıklarım:
- r0:11:d18 ("Ich wohn hier.") ve r0:11:d19 ("Ich komm morgen."): bu, konuşmada son -e'nin düşmesi. Biçim yine kişiye uygun, ich biçimi; yanlış bir çekimi kabul etmiyor.
- Desen taramasının yakaladığı öteki durumlar yanlış alarm: bezahlt, angerufen, anprobiert de geçmiş biçimler; "Mein Bruder ist Koch." doğrudan gr:a1-08:t2 kalıbı; "Ruf …!", "Warte …!", "Bleib …!" cümlenin ortasında da emir kipi.

## (b) Yeni maddeler m008–m017
Almancanın hepsi doğru. Sözcüklerin hepsi kendi haftasına kadar gösterilmiş. "mag" gün 11'in gr:a1-03:t4 dersinde öğretiliyor, örneği tam olarak "Ich mag Käse". Bütün `accepted` varyantları yapıyı içeriyor, `why_tr`'ler kısa ve Türkçe.

Sorun şuydu: tespit 8 haftadan sonra yapılıyor. Öğrenci o zamana dek başka, doğru biçimler de öğrenmiş oluyor; bu biçimle cevap verirse hem haksız yere reddediliyor, hem de dil noktası yanlış yere "zayıf" yazılıyor. Bunu kapatmak için yönergeye **yapıyı ele vermeyen bir ipucu** ekledim:

| kimlik | düzeltme | gerekçe |
|---|---|---|
| m008 | tr "Peyniri severim." → "Peyniri severim. mögen ile yaz."; `accepted` + "Ich mag Käse sehr." | "Ich esse gern Käse." (gr:a1-06:t3, 5. hafta) doğru ama reddediliyordu. İpucu, ölçülen şeyi (mag) korur. |
| m009 | tr → "Tobi bir kahve istiyor. möchte ile yaz." | "Tobi will einen Kaffee." doğru ama reddediliyordu. Ölçülen şey hâlâ er biçimi (sonda -t yok) ve **einen**. |
| m010 | `accepted` + "Ich hätte gerne einen Termin, bitte." | Varyant eksikti. |
| m011 | tr → "İngilizce konuşuyor musun? sprechen ile yaz."; `why_tr`'den "fiili" terimi çıktı | "Kannst du Englisch?" doğal ama yapıyı atlıyor. Okur "fiil" sözcüğünü terim saymıştı. |
| m016 | tr → "Burada telefonla konuşmak yasak. man ile yaz."; `accepted` + "Man darf nicht hier telefonieren." | Türkçedeki "yasak", "… ist verboten" cevabını çağırıyordu. Bu doğru ama reddediliyordu. İpucu yalnız **man**'ı veriyor; darf nicht ile muss nicht arasındaki seçimi öğrenci yapıyor. Eklenen varyant, kaynak m1:44:s5'te de kabul ediliyor. |

Dokunmadığım yeni maddeler:
- m012, m013, m014: "Die/Das ist …" gibi işaret zamirli cevapları reddediyor; bu doğru, çünkü ölçülen şey er/sie/es.
- m015: yerinde.
- m017: "Sie brauchen nicht zu warten" A1'de beklenmez. Yanlış olan "Sie dürfen nicht warten" cevabını doğru biçimde reddediyor.

Eklenen 5 kaynak maddede (m1:12:s1, m1:25:s3, m1:28:s3, m1:46:s7, m1:48:s8) etiketler doğru, haftalar doğru, bütün varyantlar yapıyı içeriyor. m1:46:s7'deki "Ich will …" varyantı da gr:a1-09:t3'ün (wollen / möchten) içinde.

`strictNumberWords` m002 ile m003'te yerinde: kabul listesinde sayılar yazıyla.

## Sayılar
- Bu turdaki düzeltme: 11. Etiketlerde 6: 1 etiket geri kondu, 4 etiket silindi, 1 madde çıktı. Yeni maddelerde 5.
- Silinen etiketlerde hata oranı: 1/97 (yanlış silme).
- `npm run content:validate` → seviye tespiti havuzu 447 madde, **0 hata**. Döküm yenilendi.

SONUÇ: ONAY

## Fark (P1-2)
İnceleme yorumu 7125586039. Bu turda yalnız iki madde değişti, yalnız onlara baktım.

- **m009** tr: "Tobi bir kahve istiyor. **möchten** ile yaz."
  - Türkçe doğru. İpucu fiilin yalın biçimini (möchten) veriyor; öğrencinin yazacağı biçimi (möchte, sonda -t yok) vermiyor. Ölçüm korunuyor.
  - `accepted`'a 2 varyant ekledim: "Tobi möchte gerne einen Kaffee." ve "Tobi möchte bitte einen Kaffee.". İkisi de doğru ve sık; önce reddediliyorlardı.
  - Bütün varyantlarda **möchte** ve **einen** var.
- **m010** instr_tr: "Cümleyi en kibar istek biçimiyle söyle. **möchte** kullanma."
  - Türkçe doğru; yapı yönergede verilmiyor.
  - `accepted`'a 1 varyant ekledim: "Ich hätte bitte gern einen Termin.".
  - Bütün varyantlarda **hätte** ve **einen** var.
  - Kalan küçük risk: "Könnte ich einen Termin haben?" da kibar bir istek ve doğru Almanca, ama bu madde onu reddeder. A1'in 2. haftasında beklenen cevap değil ve maddenin ölçtüğü yapıyı (hätte gern) içermiyor. Bu yüzden kabul listesine eklemedim.

`npm run content:validate` → seviye tespiti havuzu 447 madde, **0 hata**.

SONUÇ: ONAY
