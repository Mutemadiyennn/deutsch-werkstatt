# lexicon-batch-c1: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-c1.view.jsonl` (004–008 partilerinden K1 çekirdek kartları, yazar yaması uygulanmış) · Yama: `cm/work/batch-c1.dil.json`
- İncelenen kart: **100** (her kartın bütün alanları, 400 örnek)
- Düzeltilen kart: **42** · alan düzeyinde düzeltme: **79**
- Alan dağılımı: hata notu 15 · örnek Almancası 12 · örnek Türkçesi 22 · katman 14 · kalıp 8 · `exp` 3 · `register` 2 · `verb` 1 · `de` 1 · görsel 1
- Hata oranı: **42/100 kart** (0,42). Ağır hata 20 kartta: doğru cümleye yanlış denmesi, uydurma hata notu, yanlış ya da doğal olmayan Almanca, kartla çelişen kalıp, öğrenci kimliği. Kalan 22 kart katman, Türkçe doğallık ve hata notu kuralı.
- `lintpatch.ts`: kart 42, sorunlu 0.
- `check.ts` (yama uygulanmış kopya): c1 kartlarında sorunlu 0. Aynı partilerdeki diğer kartların bulguları bu görevin dışında (c2 ve sonrası).
- `content:validate`: depo dosyasına yazılmadı. Yama geçici bir kopyaya uygulandı: **0 hata, 101 uyarı**. Yamasız depoda da 0 hata, 101 uyarı; yama yeni uyarı getirmedi.
- Görünüm ile depo aynı: 100 kartta `tr`, `exp`, `mistakes_tr` ve örnek Almancası farksız.
- `exp.parcalar`: 100 kartta da boş. Doğru; bu kartlarda soldan sağa anlam veren bileşik yok.
- `review.status` `draft` kalır (parti dosyalarına yazılmadı).

## Hatalar

### Hata notları (`mistakes_tr`)

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:krank | **Ich bin krank** eksik, doğrusu **Ich bin krank geworden** → **Ich krank** eksik, doğrusu **Ich bin krank** | **Ich bin krank** doğru cümle, kartın ö1'i de bu. **Hasta oldum** Türkçede çoğu kez **hastayım** demektir; öğrenciye en gerekli cümle yanlış gösteriliyordu. |
| lx:hoffen | **Ich hoffe** eksik → **Wir hoffen für gutes Wetter** yanlış, doğrusu **auf** | Kısa **Ich hoffe** hata değil. Yerine gerçek bir karışma kondu; kartın `prep` alanı ve ö2 ile uyumlu. |
| lx:Glück | **Wir waren Glück** → **Wir waren glücklich** · **mit Glück** → **Glücklich ist nichts passiert** | **mit Glück** doğru bir söz (şans yardım ederse). İki yeni not, **Glück** ile **glücklich** karışmasını gösteriyor. |
| lx:zweiter | **zweite Zeit** → **Ich bin zweite Mal hier**, doğrusu **zum zweiten Mal** | Kurulmuş hata. Yeni not öğrencinin gerçekten kuracağı eksik biçim. |
| lx:ruhig | Sakin ol: **Sei ruhig** → Sessiz ol: **Sei ruhig** | **Sei ruhig!** sus demektir. Birini sakinleştirmek için öğretilirse kaba çıkar. |
| lx:dran | **Sie haben dran** → **Sie sind drin**, doğrusu **Sie sind dran** | İlki kurulmuş. **drin** ile **dran** gerçekten karışır, ikisi de bu partide. |
| lx:kaufen | İlacımı alıyorum → Her sabah ilacımı alıyorum, cümleler buna göre | **ilacımı alıyorum** satın almak diye de okunur; o okumada **Ich kaufe** doğrudur. |
| lx:sitzen | Burada yaşıyorum: **Ich sitze hier** → Bu evde oturuyorum: **Ich sitze in diesem Haus** | Hatanın kaynağı Türkçe **oturmak**. Eski not bu kaynağı göstermiyordu. |
| lx:Chef | Restoranın aşçısı → Yemeği yapan şef | Karışmayı yaratan söz **şef**, **aşçı** değil. |
| lx:Name | **Soyadım Öztürk**, **Mein Name Öztürk** → **Onun adı Ali**, **Sein Name Ali** | Öğrencinin ağzından sabit ad çıkıyordu (D-061). |
| lx:bisschen | **ein bisschen langsam** → **Ich spreche bisschen Deutsch**, doğrusu **ein bisschen** | `de` artık **bisschen**; öğrenci **ein** kelimesini atmasın. Türkçede karşılığı yok, gerçek hata. |
| lx:kosten | **fünfzig Euros** → **Das kostet fünfzig Euros** | Not kartın kelimesini içermiyordu. |
| lx:woher | **Ich komme von Türkei** → **Woher kommst du?** sorusunda **Von Türkei**, doğrusu **Aus der Türkei** | Aynı neden. |
| lx:Junge | Çocuğu görüyorum → Oğlanı görüyorum | **çocuk** kız da olabilir. |

### Almanca, biçim ve dünya

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:bisschen | `de` | ein bisschen → bisschen | PM kuralı: `de` artikelsiz (PM-042 B.9). **ein** kalıplarda ve örneklerde duruyor. |
| lx:Wort | ö3 | Kein Wort zu niemandem! → Zu niemandem ein Wort! · Kimseye tek kelime etme! | Çift olumsuzluk standart Almanca değil. |
| lx:Wort | ö4 | Wie heißt das Wort auf Deutsch? → Was ist das deutsche Wort dafür? · Bunun Almancası ne? | İlk soru, cevapla birlikte mantık kurmuyordu. |
| lx:bald | ö2 | werden Sie bald gesund → und werden Sie bald wieder gesund | **wieder** olmadan doğal değil. |
| lx:Ende | ö3 | Endlich Ende! → Ende gut, alles gut! | İlki kalıp değil. İkincisi günlük konuşmada gerçekten söylenir. |
| lx:leider | ö3 | Leider, leider! → Geht leider nicht. | Tekrar kalıp değil, yeni cümle çok sık. |
| lx:stark | ö3 | Stark, Mann! → Echt stark! | Daha doğal; kadına da söylenir. |
| lx:kurz | ö3 | Kurz und gut: … → Ich geh mal kurz raus. | Yarım cümleydi ve kartın gündelik anlamını vermiyordu. |
| lx:lachen | ö4 | Nur so, der Film ist lustig. → Der Film ist so lustig! | **Nur so** sebep yok der, ardından sebep geliyordu. |
| lx:Bett | ö1 | Ich gehe heute früh ins Bett. → Ich gehe heute Abend früh ins Bett. | **heute früh** bu sabah demektir. |
| lx:kümmern | `verb` | kümmert · hat gekümmert · kümmerte → kümmert sich · hat sich gekümmert · kümmerte sich | Kartın bütün örnekleri **sich** ile. Stage12 bu alanı gösteriyor; öğrenci **Ich habe gekümmert** kurmasın. lx:sich_treffen ile aynı biçim. |
| lx:Name | ö4 | Öztürk, mit Ö. → Aksoy, A-K-S-O-Y. | Soyadı öğrencininki gibi okunuyordu. **Aksoy** WORLD karakteri; harf harf söyleme ö2 ile de bağlanıyor. |
| lx:Chef | ö2, görsel | mit meiner Chefin → mit meinem Chef · sorgudan **female** çıktı | Kartın kelimesi **Chef**; WORLD §3 şefin Stefan Wimmer. **Chefin** kendi kartında (lx:Chefin), ipucu ve hata notu duruyor. |
| lx:Polizei | ö4 | Ein Einbruch → Ein Unfall | DN-4: suç yerine gündelik olay. |

### Kalıplar (`coll`)

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Idee | keine Idee · hiç fikrim yok → Ich habe eine Idee. · Bir fikrim var. | Kalıp, kartın kendi hata notuyla çelişiyordu (**Ich habe keine Idee** doğal değil). |
| lx:heiß | heiß draußen → heißer Tee · sıcak çay | İlki kalıp değil. |
| lx:Arm | den Arm brechen → sich den Arm brechen · kucağında tutmak → kollarında tutmak | **sich** eksikti, ö2 ile çelişiyordu. |
| lx:eigentlich | Was machst du eigentlich? · Sen aslında ne yapıyorsun? → Was machst du eigentlich beruflich? · Bu arada sen ne iş yapıyorsun? | Türkçesi soruyu suçlama gibi okutuyordu. **eigentlich** burada ö2'deki gibi **bu arada**. |
| lx:Entschuldigung | özür yazısı yazmak (okul) → okula mazeret yazısı yazmak | Doğal karşılık. |
| lx:sitzen | Pantolon oturdu mu? → Pantolon üstüne oturdu mu? | İlki başka anlama gidiyordu. |
| lx:kurz | Kısa bir vaktiniz var mı? → Bir dakikanız var mı? | Türkçede söylenen biçim. `ipucu_tr` ve ö4 de aynı. |

### Katman ve `register`

| Kart | Değişiklik | Kaynak |
|---|---|---|
| lx:runter | ö1, ö2 → alltag · `register` → informal | Duden: "umgangssprachlich für herunter, hinunter": https://www.duden.de/rechtschreibung/runter |
| lx:nochmal | ö1, ö2 → alltag · `register` → informal | Duden, noch mal: umgangssprachlich: https://www.duden.de/rechtschreibung/noch_mal · DWDS: https://www.dwds.de/wb/nochmal |
| lx:dran | ö1, ö2 → alltag | Duden: "dran sein (umgangssprachlich für an der Reihe sein)": https://www.duden.de/rechtschreibung/dran |
| lx:drin | ö1, ö2 → alltag | Duden: umgangssprachlich: https://www.duden.de/rechtschreibung/drin |
| lx:Typ | ö1, ö2 → alltag | Duden: erkek kişi anlamı ve **mein Typ** umgangssprachlich: https://www.duden.de/rechtschreibung/Typ |
| lx:Job | ö1, ö2 → alltag | Duden: Arbeitsplatz anlamı umgangssprachlich: https://www.duden.de/rechtschreibung/Job_Arbeit |
| lx:Mama | ö1, ö2 → alltag | Duden: familiär: https://www.duden.de/rechtschreibung/Mama |

Bu etiketler kart metninde olgusal iddia olarak geçmiyor; `SOURCES.md` için yeni satır gerekmiyor.

### Türkçe ve açıklama

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:früh | ö2 | Çok erkencisiniz, randevu onda → Erken geldiniz, randevu saat onda | Doğallık. |
| lx:schlimm | ö1 | Kötü mü → Ciddi mi | Doktora sorulan soru bu. |
| lx:lernen | ö2 | Bu kadar iyi Almancayı → Almancayı bu kadar iyi | **iyi** yanlış kelimeye bağlanıyordu. |
| lx:lernen | ö3 | İnsan öğrenmeye doymaz → Öğrenmenin sonu yok | Almancası doymayı değil, öğrenmenin bitmediğini söylüyor. |
| lx:nochmal | ö3 | Baştan bir daha → Bir daha, en baştan | Doğallık. |
| lx:Schmerz | ö2 | Ağrıya karşı → Ağrıya iyi gelen | Doğallık. |
| lx:kurz | ö4 | Kısa bir vaktin var mı → Bir dakikan var mı | Doğallık. |
| lx:bald | ö4 | Ne zaman bitiyorsun, Yakında → Ne zaman bitirirsin, Birazdan | Beş dakika için **yakında** denmez. |
| lx:Ahnung | ö1 | Nerede olduğu hakkında hiçbir fikrim yok → Nerede olduğunu hiç bilmiyorum | Doğallık. |
| lx:Ruhe | ö4 | ondan sonra sessizlik → saat ondan sonra sessizlik olur | **ondan sonra** başka anlama gidiyordu. |
| lx:Polizei | ö3 | Polis geldi bile → Polis gelip gitti bile | **war schon da**: gelmiş ve gitmiş. |
| lx:klingen | ö2 | Yorgun gibi geliyorsunuz → Sesiniz yorgun geliyor | Doğallık. |
| lx:Mama | ö3 | Anneme kısaca bir telefon edeyim → Annemi bir arayayım | Doğallık. |
| lx:woher | `ne_zaman_tr` | Tanışırken memleket sorarken → Tanışırken birinin memleketini sormak için | Çift **-ken**. |
| lx:Junge | `ipucu_tr` | **Jungs** çocuklar demektir → Erkeklerden oluşan bir gruba konuşmada **Jungs** denir | **çocuklar** kızları da kapsar. |

## Yazarın notlarının doğrulanması

| Not | Karar |
|---|---|
| Kurulan hata: lx:Typ **die Typs** | Kaldı. Almancada **-s** çoğulu yaygın; Duden yalnızca **die Typen** veriyor. |
| Kurulan hata: lx:Herz **die Herze** | Kaldı. Çoğulu **-e** ile kurmak gerçek bir öğrenci hatası. |
| Kurulan hata: lx:Entschuldigung | Kaldı. **entschuldigen** yerine isimle kurma gerçek bir hata. |
| Kurulan hata: lx:klingen **Es klingt** | Kaldı. **klingeln** ile karışma gerçek. |
| Kurulan hata: lx:nochmal **Sagen Sie das wieder** | Kaldı. **tekrar** kelimesinden gelir. |
| Kurulan hata: lx:Glück, lx:zweiter | Değişti (yukarıda). |
| lx:Karte **bilet** | Geri gelmedi. lx:Fahrkarte kartı var; `tr` üç anlamla dolu. |
| lx:frei **ücretsiz** | Geri gelmedi. lx:kostenlos kartı var; kartta bu anlamda örnek yok. |
| lx:vorbei **yanından** | Geri gelmedi. Kartta bu anlamda örnek yok. |
| lx:Typ **tür** | Geri gelmedi. lx:Art kartı var; A2 öğrencisi bu anlamı bu kelimeden beklemez. |
| lx:klingen **çalmak** | Geri gelmedi. Hata notu tam bu karışmayı önlüyor. |
| Almanca: lx:Wort ö3, ö4 · lx:bald ö2 · lx:Ende ö3 · lx:heiß · lx:Idee · lx:Arm | Yedisi de doğru bulundu, düzeltildi. |
| Türkçe: lx:früh ö2 · lx:lernen ö2 · lx:Ruhe ö4 · lx:klingen ö2 · lx:bald ö4 · lx:nochmal ö3 · lx:eigentlich · lx:Arm | Sekizi de doğru bulundu, düzeltildi. |

**Bakılıp değiştirilmeyenler:** lx:legen ö1 **hier hin** doğru (**hinlegen** ayrılmış). lx:Stadt **Marienplatz**, lx:gefallen **München**, lx:Ort **Regensburg** gerçek yerler; kişi öğrenci olmak zorunda değil, diğer partilerde de geçiyor. lx:Ahnung ve lx:verrückt ö1, ö2 `hd` kaldı; cümleler konuşma diline bağlı değil.

## Kalan şüpheler

1. **lx:bisschen ile lx:ein_bisschen (BM, `acik.md`):** aynı kelimeyi taşıyorlar. `de` düzeltmesi iki kartı ayırdı ama birleştirme kararı duruyor. Kimlik ve bağlantı etkisi olduğu için yamaya konmadı.

Bu partinin dışında görülenler (yamaya girmedi):

- **lx:paar** (batch-002): `de` hâlâ **ein paar**, aynı PM kuralı.
- **lx:beeilen** (batch-007): `perfekt` **hat beeilt**. Bu fiil yalnızca **sich** ile kullanılır, **hat sich beeilt** olmalı.
- **lx:drauf** (batch-005) ve **lx:rein** (batch-003): ö1, ö2 `hd`. **lx:raus** için `acik.md`'de duran katman sorunuyla aynı tür; sözlük etiketleri bu görevde kontrol edilmedi.

## Sonuç

**AÇIK.** 42 karttaki dil hataları yamada kapandı; dil açısından açık kart yok. Açık kalan tek madde lx:bisschen ile lx:ein_bisschen birleştirme kararı, BM işi. Yama uygulanıp depoda `content:validate` 0 hata verene kadar `review.status` `draft` kalmalı.
