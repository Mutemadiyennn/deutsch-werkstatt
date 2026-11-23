# Okur kontrolü: lexicon b1-03 (b1-03a + b1-03b, OD-9.3)

Girdi: `content/v2/registry/lexicon/batch-b1-03a.json` (26 kart) ve `batch-b1-03b.json` (24 kart), toplam 50 kart. İkisi de `review.status: draft`.

Okunan alanların hepsi okundu, örneklem yapılmadı:
- Açıklama alanları (518): kartın `tr`'si, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar` (9 kartta dolu, çip başına), `exp.ipucu_tr`, her `mistakes_tr`, her `forms[].hint_tr`.
- Çeviri alanları (608): her `examples[].tr`, `collocations[].tr`, `forms[].tr`.

Mekanik tarama: açıklama ve çeviri alanlarında `=`, `;`, `…` ve 14 kelimeden uzun cümle yok. `ne_zaman_tr` hepsi 12 kelimenin altında, `parcalar` çipleri en çok 2 kelime. Tırnak üç çeviri alanında var: ikisinde tırnak içinde Almanca (lx:hiermit:3, lx:vorlegen:5), birinde tırnak içinde Türkçe (lx:hiermit:5, kurala girmez). Terim taramasında yalnız **ek** / **ekler** çıktı (lx:Anlage, lx:Rückfrage); hepsi mektup eki ya da ek soru anlamında, dilbilgisi terimi değil.

Terim ve içerik ölçüsü önceki okur raporlarıyla aynı (`lexicon-b1-02.md`): **Birden çok**, **Geçmişte**, **sona gelir**, **sonda kalır** terimsiz anlatım. Kartın kelimesi notta hiç geçmiyor ve not başka bir kelimeyi öğretiyorsa "başka şeyi anlatıyor" sayıldı (bkz. lx:Mieterhöhung, lx:Hitze). Tırnak içinde Almanca çeviri alanında da sembol sayıldı (bkz. `pm032.md`).

## A. Kart kart sonuç

| kart | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:Hof | hepsi | | binanın arkasındaki ya da ortasındaki ortak avlu; nerede derken im Hof, nereye derken in den Hof | GEÇTİ | |
| lx:Gegend | hepsi | | oturduğum yerin çevresi, semt; bu civarda derken hier in der Gegend | GEÇTİ | |
| lx:klingeln | hepsi | | kapı zilinin ya da telefonun çalması; kimin zili, bei ile | GEÇTİ | |
| lx:aufpassen | hepsi | | dikkat etmek, birine bir şeye göz kulak olmak; auf ile, auf sona gider | GEÇTİ | |
| lx:bellen | hepsi | | köpeğin havlaması; geçmişte hat gebellt | GEÇTİ | |
| lx:Rasen | hepsi | | bahçedeki kısa kesilmiş çimen; küçük harfle rasen hızlı gitmek | GEÇTİ | |
| lx:Wäsche | hepsi | | yıkanacak ya da yıkanmış çamaşır; bir sepet de olsa die Wäsche | GEÇTİ | |
| lx:vorbeikommen | hepsi | | birine kısa süre uğramak; geçmişte bin vorbeigekommen | GEÇTİ | |
| lx:Schnee | hepsi | | yağan ve yerde kalan kar; çok kar viel Schnee | GEÇTİ | |
| lx:glatt | hepsi | | buzdan yolun, merdivenin kaygan olması; düz saç için de | GEÇTİ | |
| lx:neugierig | hepsi | | bir şeyi öğrenmek isteyen, meraklı; endişe anlamındaki merak için değil | GEÇTİ | |
| lx:füttern | hepsi | | hayvana mama, yem vermek; den Hund, dem Hund değil | GEÇTİ | |
| lx:plaudern | hepsi | | havadan sudan laflamak; mit ile | GEÇTİ | |
| lx:leise | hepsi | | sessiz, alçak sesli; sesi kısmak leiser machen | GEÇTİ | |
| lx:Gerücht | hepsi | | doğru mu belli olmayan, dolaşan haber, söylenti | GEÇTİ | |
| lx:Anruf | hepsi | | telefonla arama; biri aradı derken einen Anruf bekommen | GEÇTİ | |
| lx:Gespräch | hepsi | | konuşma, görüşme; şu an görüşmede gerade im Gespräch | GEÇTİ | |
| lx:besetzt | hepsi | | hat meşgul ya da yer dolu; kişi için beschäftigt | GEÇTİ | |
| lx:Leitung | hepsi | | telefon hattı; hatta kalın, hat kötü; su ve elektrik hattı da | GEÇTİ | |
| lx:Empfang | hepsi | | telefonun çekmesi; girişteki danışma da | GEÇTİ | |
| lx:erreichbar | hepsi | | birine ulaşılabilmesi; bu numaradan, unter ile | GEÇTİ | |
| lx:Vorwahl | hepsi | | numaranın başındaki şehir ya da ülke kodu | GEÇTİ | |
| lx:Signalton | hepsi | | telesekreterde konuşmadan önceki bip sesi | GEÇTİ | |
| lx:Sprachnachricht | hepsi | | konuşup kaydedip gönderdiğim mesaj | GEÇTİ | |
| lx:abhören | hepsi | | kayıtlı mesajı açıp dinlemek; doktorun ciğer dinlemesi de | GEÇTİ | |
| lx:deutlich | hepsi | | net, kolay anlaşılır konuşma; daha net deutlicher | GEÇTİ | |
| lx:Aktenzeichen | hepsi | | dairenin dosyama verdiği numara; cevapta en üste yazarım | GEÇTİ | |
| lx:hiermit | diğerleri | | resmî mektubun ilk cümlesinde "bu yazıyla" | GEÇTİ | |
| lx:hiermit | examples[3].tr (lx:hiermit:3) | Doğrudan «Hiermit beantrage ich» diye başlıyorum, çok resmî duruyor, değil mi? | mektuba bu Almanca cümleyle başlıyorum, çok resmî duruyor | GERİ | sembol: tırnak içinde Almanca |
| lx:angeben | hepsi | | bir bilgiyi formda, mektupta yazıp bildirmek; an sona gider | GEÇTİ | |
| lx:Kopie | hepsi | | belgenin fotokopisi; sonu uzun i ile okunur | GEÇTİ | |
| lx:Original | hepsi | | belgenin fotokopisi değil, kendisi | GEÇTİ | |
| lx:Anlage | hepsi | | mektupla birlikte gönderilen ek belge; ekte in der Anlage | GEÇTİ | |
| lx:beilegen | hepsi | | belgeyi mektubun içine koyup göndermek; bei sona gider | GEÇTİ | |
| lx:vollständig | hepsi | | hiçbir şey eksik değil; eksik nicht vollständig | GEÇTİ | |
| lx:nachreichen | hepsi | | eksik belgeyi sonradan daireye vermek | GEÇTİ | |
| lx:vorlegen | diğerleri | | belgeyi daireye resmî olarak göstermek; konuşurken zeigen yeter | GEÇTİ | |
| lx:vorlegen | examples[5].tr (lx:vorlegen:5) | – Burada «vorlegen» ne demek? – Eh, onu randevuda göstermen lazım. | bu kelime ne demek diye soruyor, cevap: randevuda göstermek | GERİ | sembol: tırnak içinde Almanca |
| lx:zurückschicken | hepsi | | bana gelen şeyi gönderene geri yollamak | GEÇTİ | |
| lx:rechtzeitig | diğerleri | | süre bitmeden, geç kalmadan; pünktlich ile aynı değil | GEÇTİ | |
| lx:rechtzeitig | exp.ipucu_tr | Tam saatinde olmak ise **pünktlich** ile söylenir. | tam saatinde olmak pünktlich; ama "ise" neye göre, bu kutuda yazmıyor | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor, yalnız **pünktlich** öğretiliyor; kutu tek açılınca **ise** havada kalıyor (aynı bilgi mistakes_tr[0]'da kelimeyle birlikte var) |
| lx:bearbeiten | hepsi | | dairenin başvuruma bakması; işlemde wird bearbeitet | GEÇTİ | |
| lx:Sachbearbeiter | hepsi | | dairede dosyama bakan memur; kadınsa Sachbearbeiterin | GEÇTİ | |
| lx:gültig | hepsi | | belgenin süresi dolmamış, geçerli | GEÇTİ | |
| lx:ablehnen | hepsi | | başvuruya hayır demek; reddedildi wurde abgelehnt | GEÇTİ | |
| lx:Widerspruch | hepsi | | dairenin kararına yazılı itiraz; Widerspruch einlegen | GEÇTİ | |
| lx:Begründung | hepsi | | isteğin, kararın nedenini anlatan yazı, gerekçe | GEÇTİ | |
| lx:beachten | hepsi | | kurala, süreye dikkat etmek; tehlike için aufpassen | GEÇTİ | |
| lx:Einschreiben | hepsi | | teslimi kayda geçen taahhütlü mektup | GEÇTİ | |
| lx:Rückfrage | hepsi | | mektup ya da başvuru hakkında sonradan sorulan soru; sorunuz olursa bei Rückfragen | GEÇTİ | |
| lx:Verständnis | hepsi | | durumumu anlayıp hoş görmek; anlamak anlamında değil | GEÇTİ | |
| lx:Anfrage | hepsi | | kuruma yazıyla soru, bilgi isteği; Antrag başvuru | GEÇTİ | |
| lx:Rückmeldung | hepsi | | yazdığıma gelen cevap, haber; Rückkehr değil | GEÇTİ | |

"hepsi" ve "diğerleri": o kartın bütün açıklama ve çeviri alanları tek tek okundu ve geçti (GERİ satırındaki alan hariç).

## B. Sınırda geçenler (kararı etkilemedi)

- Geçmiş boşluk ipuçlarında yardımcı kelime cümledekinden farklı: cümlede **habe**, ipucunda **hat** (lx:angeben forms[1] ve forms[3], lx:beilegen forms[1], lx:vorlegen forms[3], lx:zurückschicken forms[1], lx:beachten forms[3]). **hat** ile **habe** aynı kelimenin hâlleri, A2'de bilinir; boşluğa girecek kelime ipucunda açık. lx:einspringen'deki **sein** sorunu (görünmeyen sözlük biçimi) değil. Aynı biçim b1-01b ve b1-02a'da da geçmişti (lx:nachfragen, lx:klären, lx:abbuchen). lx:füttern forms[1] de böyle ama **olur** diyor. Batch a'daki öbür geçmiş ipuçları cümleyle birebir.
- lx:hiermit `mistakes_tr[1]` (Konuşurken onu kullanmaz, doğrudan … dersin): **kullanmaz** ile **dersin** arasında kişi kayıyor, kim kullanmaz bir an takıldım; anlamı ilk okumada çıktı.
- lx:hiermit `examples[5].tr`: tırnak içinde Türkçe (Bu yazıyla randevuyu onaylıyorum), Almanca değil; kurala girmez.
- lx:füttern `ipucu_tr`: kalın yazıda kartın kelimesi yok, ama **mama verdiğini** kartın kendi anlamı ve not kelimenin nasıl kullanıldığını anlatıyor; başka kelime öğretmiyor.
- lx:Begründung `ipucu_tr` (**weil** ile kurulan cümleler): gerekçe yazmaya dair öğüt; **weil** A2'de bilinir, "kurulan cümle" terim değil.
- lx:Widerspruch `ipucu_tr` (Resmî dilde **Widerspruch einlegen** denir): ne için dendiği kutuda yok; eşdizimdeki **itiraz etmek** ile hemen anlaşılıyor.
- lx:Rückfrage `ipucu_tr`: anlam ve arkasından gelen bilgi aynı kutuda; mektup kapanışının nasıl işlediği tek durum olarak okundu.
- lx:bellen `mistakes_tr[1]` (Hâlâ havlıyorsa **seit** ile **bellt** söylenir): yanlışı yazmıyor, doğruyu söylüyor; kartın kelimesi var, örnekle örtüşüyor.
- lx:Schnee `mistakes_tr[1]` (**Es schneit**): doğru biçimde kartın kelimesi yok, ama yanlış biçim **Der Schnee regnet** kartın kelimesiyle; kelimenin yanlış kullanımını anlatıyor.
- lx:Kopie `mistakes_tr[0]`: ilk cümlenin öznesi ikinci cümlede geliyor (Türkçedeki kopya gibi okunmaz. **die Kopie** …); ikinci cümleyle hemen anlaşılıyor.
- lx:aufpassen `forms[3]` (**aufpassen** sona gelir): boşluk cümlenin sonunda değil, virgülden önce; ilk parçanın sonu olarak anlaşıldı.
- lx:Gespräch `mistakes_tr[0]` (**ein Gespräch machen** doğal değil): 2. örnek **hatte ein Gespräch** "konuşma yaptım" diye çevrilmiş; Almancada **machen** yok, çelişki saymadım.
- **bitişik sona gelir** (lx:angeben, lx:beilegen, lx:nachreichen, lx:vorlegen, lx:zurückschicken, lx:ablehnen): kalın kelimeyle birlikte "tek parça, sonda" diye anlaşıldı.

## Sonuç

- Toplam alan: 1126 (açıklama 518 + çeviri 608)
- GEÇTİ: 1123
- GERİ: 3 alan, 3 kart
  - lx:hiermit examples[3].tr (lx:hiermit:3)
  - lx:vorlegen examples[5].tr (lx:vorlegen:5)
  - lx:rechtzeitig exp.ipucu_tr

`batch-b1-03b.json` 3 GERİ (hiermit, vorlegen, rechtzeitig) taşıdığı için "reviewed" sayılamaz (OD-9.4). `batch-b1-03a.json`'da okur GERİ'si yok.

## 2. tur (yalnız doğrulama, PM-079 md. 3)

Girdi: dilbilimcinin düzeltmeleri (`docs/v2/reviews/lexicon-b1-03.md`, "Okur düzeltmeleri"). Metinler içerik dosyasından (`batch-b1-03b.json`) okundu. Yalnız 1. turda geri dönen 3 alan okundu. Çelişki var mı diye aynı kartın Almanca cümlesine, öbür örneklerine ve notlarına da bakıldı. Alan adları 1. turdaki gibi örnek kimliğiyle yazıldı (lx:hiermit:3 sıfırdan sayınca examples[2], lx:vorlegen:5 sıfırdan sayınca examples[4]).

| kart | alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:hiermit | examples[3].tr (lx:hiermit:3) | Doğrudan resmî başvuru cümlesiyle başlıyorum, kulağa çok resmî geliyor, değil mi? | mektuba resmî başvuru cümlesiyle başlıyorum, çok resmî duruyor | GEÇTİ | 12 kelime, tırnak yok, Almanca cümleyle örtüşüyor |
| lx:vorlegen | examples[5].tr (lx:vorlegen:5) | – Buradaki bu kelime ne demek? – Eh, onu randevuda göstermen lazım. | bu kelime ne demek diye soruyor, cevap: randevuda göstermek | GEÇTİ | tırnak yok. Hangi kelime olduğu üstteki Almanca cümlede kalın değil ama görünüyor (**vorlegen**) |
| lx:rechtzeitig | exp.ipucu_tr | **gerade noch rechtzeitig** ucu ucuna yetişmek demektir. | gerade noch rechtzeitig, son anda yetiştirmek demek | GEÇTİ | kartın kelimesi notta var, tek fikir, 6 kelime. 3. örnekle (ucu ucuna zamanında teslim ettim) uyumlu |

Takip notu (engel değil): 2. turda eski alanlarda yeni bulgu yok.

### 2. tur sonucu

- Okunan: 3 alan · GEÇTİ: 3 · GERİ: 0

`batch-b1-03a.json` ve `batch-b1-03b.json`'da okur GERİ'si kalmadı (OD-9.3 okur katmanı geçti).

## 3. tur (yalnız doğrulama)

Girdi: `batch-b1-03a.json`'da lx:leise'nin değişen 3 alanı. Metinler içerik dosyasından okundu. Çelişki var mı diye aynı kartın Almanca cümlelerine, anlamına, ipucuna ve eşdizimlerine de bakıldı.

| kart | alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:leise | forms[3].hint_tr | Sesin az geliyor derken **du bist leise** denir. | karşımdakinin sesini zor duyuyorsam du bist leise derim | GEÇTİ | 8 kelime, tek fikir, sembol ve terim yok. Boşluk cümlesindeki **du bist total ___** ile örtüşüyor |
| lx:leise | forms[3].tr | Seni zor duyuyorum, sesin çok az geliyor. | seni duyamıyorum, sesin kısık geliyor | GEÇTİ | Almanca cümleyle örtüşüyor |
| lx:leise | examples[5].tr (lx:leise:5) | – Seni zor duyuyorum, sesin çok az geliyor. – Bir saniye, şimdi daha iyi mi? | telefonda sesin az geliyor, öbürü düzeltip iyi mi diye soruyor | GEÇTİ | Almanca diyalogla ve forms[3] ile aynı. Anlamdaki **alçak sesle konuşan** ile çelişmiyor |

Takip notu (engel değil): yeni bulgu yok.

### 3. tur sonucu

- Okunan: 3 alan · GEÇTİ: 3 · GERİ: 0

`batch-b1-03a.json` ve `batch-b1-03b.json`'da okur GERİ'si yok.
