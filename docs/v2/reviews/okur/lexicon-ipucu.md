# Okur raporu: temel-ipucu-re (OD-9.3)

Girdi: `ipucu-re.txt`, 313 satır, hepsi okundu. Soru: ipucunu okuyunca boşluğa ne yazacağımı tek okumada buluyor muyum, ve ipucu cümleye uyuyor mu?

## GERİ satırları

| satır | alan | açıklama | kendi sözlerimle | neden |
|---|---|---|---|---|
| 168 | `lx:Mannschaft.forms.hint_tr` | Yeri söylerken **in** dedikten sonra **eine Mannschaft**, **einer Mannschaft** olur. | Bir yerin içinde olduğumu söylerken kelime değişiyor. | Takım bir yer değil. Cümle birinin takımda oynadığını söylüyor. İpucu cümleye uymuyor, durdum. |
| 169 | `lx:Mannschaft.forms.hint_tr` | Yeri söylerken **in** dedikten sonra **die Mannschaft**, **der Mannschaft** olur. | Aynısı, bu kez bilinen takım için. | Aynı neden: takım yer değil. |
| 226 | `lx:Radtour.forms.hint_tr` | Yeri söylerken **auf** dedikten sonra **die Radtour**, **der Radtour** olur. | Bir yerin üstünde olduğumu söylerken kelime değişiyor. | Bisiklet turu bir yer değil. Cümle tur sırasında olanı anlatıyor. |
| 232 | `lx:Durchsage.forms.hint_tr` | Yeri söylerken **in** dedikten sonra **die Durchsage**, **der Durchsage** olur. | Bir yerin içini söylerken kelime değişiyor. | Anons bir yer değil. Cümle anonsta ne dendiğini söylüyor. |
| 296 | `lx:Geschichte.forms.hint_tr` | Yeri söylerken **in** dedikten sonra **die Geschichte**, **der Geschichte** olur. | Bir yerin içini söylerken kelime değişiyor. | Hikâye bir yer değil. Cümle hikâyenin konusunu söylüyor. |

Beş satırda da boşluğa yazılacak kelimeyi buldum. Geri dönme nedeni, ipucunun ilk iki kelimesinin cümledeki durumu anlatmaması.

## Sayılar

- Toplam: 313
- GEÇTİ: 308
- GERİ: 5

GERİ kimlikleri: `lx:Mannschaft.forms.hint_tr` (iki satır), `lx:Radtour.forms.hint_tr`, `lx:Durchsage.forms.hint_tr`, `lx:Geschichte.forms.hint_tr`

Tek GERİ bile olduğu için dosya "reviewed" sayılamaz (OD-9.4).
