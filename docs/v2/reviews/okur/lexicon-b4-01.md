# Okur raporu: b4-b1re (kelime kartları, yeni ya da değişen Türkçe alanlar)

Girdi: `(yerel çalışma dosyası)`. Her satır tek tek okundu. Sembol ve cümle uzunluğu taraması temiz çıktı (yasak işaret yok, 14 kelimeyi aşan cümle yok).

## GERİ satırları

| alan | kendi sözlerimle | neden |
|---|---|---|
| `lx:Abitur.forms[1].hint_tr` | "Gerekmiyor" demek istersem "kein Abitur" derim. | İfadenin kendisini anlatmıyor: açıklamaya göre bu söz "gerekmiyor" demek, oysa cümlede "lise diploması yok/gerekmez" tarafı başka kelimede. Yanlış şey öğreniyorum. |
| `lx:Arm.mistakes_tr[0]` | Kol kırılınca "kaputt" denmez, "brechen" denir. Bir de kendi kolum için "mir den Arm" derim. | İki fikir var: biri hangi kelimenin kırılmak için kullanıldığı, öbürü "mir den Arm". Dört cümle, tek okumada tutamadım. |
| `lx:Job.forms[3].hint_tr` | "Benim işim" demek için "mit meinem Job" denir. | İfadenin kendisini anlatmıyor: cümlenin Türkçesi "işimden memnunum". "Benim işim" ile "mit meinem Job" aynı şey değil, baştaki "mit" neden var anlamadım. |
| `lx:Junge.forms[0].hint_tr` | Bebek hakkında soru sorarken "ein Junge" denir. | Anlamadım: bebeğe mi "ein Junge" deniyor? Bunun "erkek çocuk" demek olduğu kutuda yazmıyor. |
| `lx:Junge.forms[4].hint_tr` | Tanıdığımız oğlandan söz ediyoruz, bir de kelimenin sonuna "n" geliyor. | İki fikir var ("bildiğimiz oğlan" ve "sona n gelir"). Boşluğa giren kelimeyle ilgili olan yalnızca ikincisi, "n" neden geliyor belli değil. |
| `lx:Ort.coll[0]` | "Yerinde" demek. Ama hangi "yerinde"? | Anlam belirsiz: "yerinde" Türkçede "uygun, isabetli" de demek, "onun yerinde" de. Olayın olduğu yerde anlamı tek başına çıkmıyor. |
| `lx:Ort.forms[3].hint_tr` | "Yerinde" demek için "vor Ort" denir. | Aynı belirsizlik: "yerinde" sözünden olay yerinde / orada bulunmak anlamını tek okumada çıkaramadım. |
| `lx:Tochter.mistakes_tr[1]` | Parkta oynayan kız için "Tochter" denmez, "Mädchen" denir. | Anlamadım: neden yanlış olduğu yazmıyor. İki kelimenin farkını (birinin evladı olan kız / herhangi bir kız çocuğu) kutudan öğrenemiyorum. |

## Sayılar

- Toplam: 503
- GEÇTİ: 495
- GERİ: 8

GERİ kimlikleri:
- `lx:Abitur.forms[1].hint_tr`
- `lx:Arm.mistakes_tr[0]`
- `lx:Job.forms[3].hint_tr`
- `lx:Junge.forms[0].hint_tr`
- `lx:Junge.forms[4].hint_tr`
- `lx:Ort.coll[0]`
- `lx:Ort.forms[3].hint_tr`
- `lx:Tochter.mistakes_tr[1]`

Tek bir GERİ bile olduğu için bu paket "reviewed" sayılamaz (OD-9.4).
