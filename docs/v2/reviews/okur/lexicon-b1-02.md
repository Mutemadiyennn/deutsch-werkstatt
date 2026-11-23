# Okur kontrolü: lexicon b1-02 (b1-02a + b1-02b, OD-9.3)

Girdi: `content/v2/registry/lexicon/batch-b1-02a.json` (24 kart) ve `batch-b1-02b.json` (26 kart), toplam 50 kart. İkisi de `review.status: draft`.

Okunan alanların hepsi okundu, örneklem yapılmadı:
- Açıklama alanları (531): `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar` (13 kartta dolu, çip başına), `exp.ipucu_tr`, her `mistakes_tr`, her `forms[].hint_tr`.
- Çeviri alanları (600): her `examples[].tr`, `collocations[].tr`, `forms[].tr`.

Mekanik tarama: açıklama ve çeviri alanlarında `=`, `;`, `…`, tırnak ve 14 kelimeden uzun cümle yok (kesme işaretleri yalnız özel adlarda: Derya'nın, Wimmer Bey'e…). `ne_zaman_tr` hepsi 12 kelimenin altında, `parcalar` çipleri en çok 2 kelime. Terim taramasındaki eşleşmelerin hepsi kelime içi rastlantı (hâlâ, çiçekler, çekim gibi); terim yok.

Terim ölçüsü önceki okur raporlarıyla aynı: `çoğul`, `tekil`, `isim`, `fiil`, `ek` terim; **Birden çok**, **tek**, **Geçmişte**, **sona gelir**, **Son parça** terimsiz anlatım. Kartın kelimesi notta hiç geçmiyorsa "başka şeyi anlatıyor" sayıldı (bkz. `lexicon-b6-*`: lx:Schwindel, lx:denken, lx:verstehen, lx:Telefonnummer). Görünen **bin** yerine **sein** demek önceki raporlarda geri döndü (lx:zurückkommen); aynı ölçü kullanıldı.

## A. Kart kart sonuç

| kart | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:Warteliste | hepsi | | boş yer açılınca aranmak için yazıldığın liste | GEÇTİ | |
| lx:Absage | hepsi | | randevunun iptali ya da olumsuz cevap | GEÇTİ | |
| lx:Befund | hepsi | | tahlilin ya da muayenenin yazılı sonucu | GEÇTİ | |
| lx:Vertretung | hepsi | | biri yokken yerine bakan kişi | GEÇTİ | |
| lx:mitteilen | hepsi | | resmî olarak haber vermek, bildirmek | GEÇTİ | |
| lx:zuständig | hepsi | | o işe bakan, o işten sorumlu | GEÇTİ | |
| lx:Abteilung | hepsi | | firmadaki ya da dairedeki bölüm | GEÇTİ | |
| lx:Anliegen | diğerleri | | aramamın sebebi, konum, derdim | GEÇTİ | |
| lx:Anliegen | mistakes_tr[0] | Bir konum var derken **Ich habe eine Anliegen** yanlış. Doğrusu **Ich habe ein Anliegen.** | "bir konum var" = bir yerim var? telefondaki konum gibi okudum; ikinci okumada: "bir konu(m) var" | GERİ | anlamadım (tek okumada değil): **konum** önce yer, konum paylaşmak diye okunuyor |
| lx:Kundennummer | diğerleri | | firmanın beni tanıdığı müşteri numarası | GEÇTİ | |
| lx:Kundennummer | mistakes_tr[1] | Numarada **42** derken Türkçedeki sırayla **vierzig zwei** denmez. Doğrusu **zweiundvierzig**. | sayı söylerken önce iki sonra kırk | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor, sayı söylemeyi anlatıyor |
| lx:klären | hepsi | | bir sorunu konuşup netleştirmek, halletmek | GEÇTİ | |
| lx:Lösung | hepsi | | çözüm; çözüm bulmak | GEÇTİ | |
| lx:abbuchen | hepsi | | firmanın hesabımdan para çekmesi | GEÇTİ | |
| lx:Sperrmüll | hepsi | | eski dolap, kanepe gibi büyük eşya çöpü | GEÇTİ | |
| lx:Frühschicht | hepsi | | sabah erken başlayan vardiya | GEÇTİ | |
| lx:Spätschicht | hepsi | | öğleden sonra başlayıp akşam biten vardiya | GEÇTİ | |
| lx:Nachtschicht | hepsi | | gece boyu süren vardiya | GEÇTİ | |
| lx:tauschen | hepsi | | biriyle vardiya ya da gün değiştirmek | GEÇTİ | |
| lx:einspringen | diğerleri | | gelemeyen birinin yerine kısa süre çalışmak | GEÇTİ | |
| lx:einspringen | exp.ipucu_tr | Geçmişte **sein** ile kurulur: **Ich bin eingesprungen.** | geçmişte sein ile bir şey kuruluyor; ama cümlede sein yok, bin var | GERİ | anlamadım: açıklama cümlede görünmeyen **sein** kelimesini söylüyor, görünen **bin**; neyin kurulduğu da yazmıyor. Aynı kartın 2. boşluk ipucu (Geçmişte **ist eingesprungen** denir) aynı şeyi açık söylüyor. |
| lx:freinehmen | hepsi | | işten bir gün ya da birkaç saat izin almak | GEÇTİ | |
| lx:Urlaubsantrag | hepsi | | izin için verilen yazılı istek, dilekçe | GEÇTİ | |
| lx:genehmigen | hepsi | | yetkilinin resmî olarak evet demesi | GEÇTİ | |
| lx:Arbeitszeit | hepsi | | işte çalıştığım saatler | GEÇTİ | |
| lx:Urlaubstag | hepsi | | maaşlı izin günü | GEÇTİ | |
| lx:abbauen | hepsi | | biriken fazla mesaiyi izinle eritmek; stres atmak | GEÇTİ | |
| lx:Resturlaub | hepsi | | kullanmadığım, kalan izin günleri | GEÇTİ | |
| lx:auszahlen | hepsi | | hak ettiğim parayı bana ödemek | GEÇTİ | |
| lx:Zuschlag | hepsi | | gece, pazar, tatil çalışması için ek para | GEÇTİ | |
| lx:Brückentag | hepsi | | tatille hafta sonu arasında kalan iş günü | GEÇTİ | |
| lx:absprechen | hepsi | | biriyle konuşup birlikte karar vermek | GEÇTİ | |
| lx:eintragen | hepsi | | takvime, listeye, forma yazmak | GEÇTİ | |
| lx:stempeln | hepsi | | işe giriş çıkışta kart basmak; mühür basmak | GEÇTİ | |
| lx:Personalabteilung | hepsi | | izin, maaş işlerine bakan personel bölümü | GEÇTİ | |
| lx:Abrechnung | hepsi | | giderleri tek tek gösteren yazı, döküm | GEÇTİ | |
| lx:Nachzahlung | hepsi | | para yetmeyince sonradan ödenen fark | GEÇTİ | |
| lx:Guthaben | hepsi | | geri alacağım para ya da telefondaki kontör | GEÇTİ | |
| lx:Warmmiete | diğerleri | | ısınma ve yan giderler dahil kira | GEÇTİ | |
| lx:Warmmiete | mistakes_tr[1] | İlanda kira ne kadar diye sorarken yalnızca **Miete** demek yetmeyebilir. **Warm oder kalt?** diye de sorulur. | kirayı sorarken "sıcak mı soğuk mu" diye de soruluyor; soğuk kira ne, kim kime soruyor, çıkaramadım | GERİ | anlamadım: **kalt** (ısınma hariç) kartta hiç anlatılmıyor; ben mi sorarım, bana mı sorulur belli değil; yanlış da söylemiyor |
| lx:Heizkosten | hepsi | | evi ısıtmak için ödenen para | GEÇTİ | |
| lx:Strom | hepsi | | prizden gelen elektrik | GEÇTİ | |
| lx:fällig | hepsi | | ödeme zamanı gelmiş, son ödeme günü | GEÇTİ | |
| lx:Mieterhöhung | diğerleri | | kiranın artması ya da bunu bildiren yazı | GEÇTİ | |
| lx:Mieterhöhung | exp.ipucu_tr | Kira artıyor demek için **Die Miete steigt** denir. | kira artıyor demek için başka bir cümle | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor |
| lx:Mieterhöhung | mistakes_tr[1] | Kira artıyor derken **Die Miete wird mehr** pek doğal değil. Doğrusu **Die Miete steigt.** | kira artıyor derken steigt denir | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor; ipucu ile aynı bilgi |
| lx:Betrag | hepsi | | faturadaki para miktarı, tutar | GEÇTİ | |
| lx:Verbrauch | hepsi | | ne kadar elektrik, su harcadığım | GEÇTİ | |
| lx:nebenan | hepsi | | hemen yanda, yan dairede | GEÇTİ | |
| lx:Nachbarschaft | hepsi | | mahalle ve komşular | GEÇTİ | |
| lx:Garten | hepsi | | evin yanındaki bahçe | GEÇTİ | |
| lx:gießen | hepsi | | çiçek, bahçe sulamak | GEÇTİ | |
| lx:grillen | hepsi | | mangal yapmak | GEÇTİ | |
| lx:ausleihen | hepsi | | geri vermek üzere ödünç almak ya da vermek | GEÇTİ | |
| lx:Hitze | diğerleri | | havanın çok sıcak olması | GEÇTİ | |
| lx:Hitze | exp.ipucu_tr | Sana sıcak geliyorsa **Mir ist heiß** denir. | sıcakladıysam Mir ist heiß derim | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor |
| lx:Hitze | mistakes_tr[0] | Çok sıcakladım derken **Ich bin heiß** yanlış anlaşılır. Doğrusu **Mir ist heiß.** | sıcakladım derken Mir ist heiß derim | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta hiç geçmiyor (mistakes_tr[1] ise kelimenin kendisini anlatıyor, geçti) |
| lx:Rücksicht | hepsi | | başkalarını rahatsız etmemek için onları düşünmek | GEÇTİ | |

"hepsi" ve "diğerleri": o kartın bütün açıklama ve çeviri alanları tek tek okundu ve geçti (GERİ satırındaki alan hariç).

## B. Sınırda geçenler (kararı etkilemedi)

- lx:Befund `ipucu_tr` (… çoğu zaman hepsi birden istenir …): "hepsi" neyin hepsi, ilk anda takıldım; kalın kısımla bütün sonuçlar diye anladım.
- lx:Vertretung `ipucu_tr` (… **die Vertretung** adı söylenir): yerine bakanın adı mı, sözcüğün kendisi mi, iki türlü okunuyor; ikisi de gerçek kullanımla örtüşüyor.
- lx:Anliegen `ipucu_tr` (arkadaşlar arasında pek kullanılmaz): kartın 3. ve 5. örneği arkadaşlar arasında geçiyor; resmî bir işten söz ederken. "pek" dediği için çelişki saymadım.
- lx:Nachtschicht `ipucu_tr`: yalnız **schlafe** üzerinden anlatıyor; kartta başka cümle yok, çelişmiyor.
- lx:Nachzahlung `ipucu_tr` ve `mistakes_tr[0]`, lx:Verbrauch `ipucu_tr`: kartın kelimesi yerine aynı kökten **nachzahlen**, **verbrauchen** anlatılıyor. "Konuşmada çoğu zaman" diye kelimenin ne zaman yerine geçtiğini söylediği ve **nachzahlen** kartın eşdiziminde durduğu için geçti.
- lx:Abrechnung `anlam_tr` (Bir yılın giderlerini …): yalnız yıllık gider dökümü gibi okunuyor; kartın bütün örnekleri bu bağlamda, çelişki yok.
- lx:Personalabteilung `mistakes_tr[1]`: İngilizce kelime (D-060 yanlış arkadaş istisnası). İngilizce bilmesem de ikinci cümle tek başına yetiyor.
- lx:abbauen `forms[3].hint_tr` (**zu** ortaya girer): kalın **abzubauen** ile hemen anlaşılıyor.
- lx:Abteilung `ipucu_tr`, lx:Nachbarschaft `mistakes_tr[1]`: **-ung**, **-schaft** ile biten kelimeler için genel kural; bu kelimeye de uyuyor.

## Sonuç

- Toplam alan: 1131 (açıklama 531 + çeviri 600)
- GEÇTİ: 1123
- GERİ: 8 alan, 6 kart (hepsi açıklama alanı; çeviri alanlarında GERİ yok)
  - lx:Anliegen mistakes_tr[0]
  - lx:Kundennummer mistakes_tr[1]
  - lx:einspringen exp.ipucu_tr
  - lx:Warmmiete mistakes_tr[1]
  - lx:Mieterhöhung exp.ipucu_tr
  - lx:Mieterhöhung mistakes_tr[1]
  - lx:Hitze exp.ipucu_tr
  - lx:Hitze mistakes_tr[0]

GERİ olduğu için iki parti de "reviewed" sayılamaz (OD-9.4): `batch-b1-02a.json` 3 GERİ (Anliegen, Kundennummer, einspringen), `batch-b1-02b.json` 5 GERİ (Warmmiete, Mieterhöhung ×2, Hitze ×2).

## 2. tur (yalnız doğrulama, PM-079 md. 3)

Girdi: dilbilimcinin düzeltme listesi (`docs/v2/reviews/lexicon-b1-02.md`, "Okur düzeltmeleri (2026-11-23)"). Metinler listeden değil, iki içerik dosyasından okundu; liste ile dosya aynı. Yalnız 1. turda geri dönen 8 alan okundu; çelişki için aynı kartın örnekleri, eşdizimleri ve parçaları da okundu.

| kart | alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| lx:Anliegen | mistakes_tr[0] | Bir isteğim var derken **Ich habe eine Anliegen** yanlış. Doğrusu **Ich habe ein Anliegen.** | bir isteğim var derken eine değil ein | GEÇTİ | |
| lx:Kundennummer | mistakes_tr[1] | **Kundenummer** diye yazmak kolay. Doğrusu iki **n** ile **Kundennummer**. | ortada iki n yazılır | GEÇTİ | |
| lx:einspringen | exp.ipucu_tr | Geçmişi anlatırken **bin** ya da **ist** ile söylenir: **Ich bin eingesprungen.** | yerine çalıştım derken habe değil bin, ist | GEÇTİ | 2. boşluk ipucuyla (**ist eingesprungen**) uyumlu |
| lx:Warmmiete | mistakes_tr[1] | Isınma hariç kiranın adı **Kaltmiete** olur. **Warmmiete** ile karıştırma, ikisi aynı para değildir. | ısınmasız kira Kaltmiete, ısınmalı kira Warmmiete; ayrı tutarlar | GEÇTİ | |
| lx:Mieterhöhung | exp.ipucu_tr | Son parça **die Erhöhung** olduğu için **die Mieterhöhung** denir. | son parça die olduğu için başına die gelir | GEÇTİ | **Erhöhung** kartın parçalarında artış diye duruyor |
| lx:Mieterhöhung | mistakes_tr[1] | Kira artışı yazısı aldık derken **eine Mieterhöhung nehmen** denmez. Doğrusu **eine Mieterhöhung bekommen**. | yazıyı almak için nehmen değil bekommen | GEÇTİ | |
| lx:Hitze | exp.ipucu_tr | Bu sıcakta demek için **bei der Hitze** denir. | bu sıcakta bei der Hitze | GEÇTİ | |
| lx:Hitze | mistakes_tr[0] | Sıcaktan uyuyamıyorum derken **von der Hitze** denmez. Doğrusu **wegen der Hitze** ya da **bei der Hitze**. | sıcaktan derken von değil wegen ya da bei | GEÇTİ | kartın 2. örneğiyle (**bei dieser Hitze nicht schlafen**) uyumlu |

Takip notu (engel değil): 2. turda eski alanlarda yeni bulgu yok.

### 2. tur sonucu

- Okunan: 8 alan · GEÇTİ: 8 · GERİ: 0

`batch-b1-02a.json` ve `batch-b1-02b.json`'da okur GERİ'si kalmadı (OD-9.3 okur katmanı geçti).
