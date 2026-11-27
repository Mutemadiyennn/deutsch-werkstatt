# A1 8. hafta (50.–54. gün) ve görülmemiş durumlar: yazar notları

Kapsam: `content/v2/m1/gun-50.json` … `gun-54.json`, `content/v2/m1/gorulmemis-08.json`. Durum: taslak (`review.status: "draft"`). Sıradaki adım: dilbilimci, okur (OD-9), örneklem.

## Haftanın kurgusu (pekiştirme, H4 §4)
Her gün önceki haftaların kalıplarını yeni kişi, yeni yer ve yeni olayla getirir. Her günde en az bir beklenmedik an ve bir kurtarma cümlesi vardır.

| Gün | Konu | Yeni kişi / yer / olay | Beklenmedik an | Kurtarma cümlesi |
|---|---|---|---|---|
| 50 | telefon ve randevu | Frau Brandl'ın yeni halısı; satıcı telefonda gün ve saat ayarlıyor, Brandl adını heceliyor. Frau Huber randevuyu kaydırıyor. Radyoda otel reklamı. | Dienstag ile Donnerstag karışıyor; saat 8 çok erken; prova'da cuma dolu, pazartesi 16.30 | **Also Dienstag um halb zehn?** · **Wie bitte? Können Sie das wiederholen?** |
| 51 | alışveriş ve fiyat | Tobi ile Ioana gezi için pazarda alışveriş yapıyor; garda gecikme anonsu; Ioana gecikiyor; fırında Frau Stadler | Ekmek kalmamış; peynir pahalı; kart geçmiyor; fırında 6 değil 4 küçük ekmek var; **sechs Euro zehn** ile **sechzehn** | **Dann nehme ich …** · **Sechs oder sechzehn?** |
| 52 | mahallede konuşmak | Luka'nın kuaföründe Basti; meydanda maç duyurusu; Frau Brandl halıcıya ödeyecek nakit istiyor; Pichler'in pano notu; Basti maça çağırıyor | Kuaförde yalnız nakit, Basti'de nakit yok; maçta yalnız nakit | **Kann ich morgen zahlen?** · **Ich hole morgen Geld.** |
| 53 | dün ve hafta sonu | Pazartesi Tobi gezi gününü anlatıyor (yemek soğuk, şikâyet, bahşiş, tren iptal); göl istasyonunda iptal anonsu; Pichler'e gürültü şikâyeti; yeni iş arkadaşıyla ilk sohbet | Tren iptal; şikâyet yanlış kişiye (o gece evde değildin) | **Am Samstag war ich nicht zu Hause.** |
| 54 | doktor ve eczane | WORLD 8. hafta bölümü: Frau Brandl yeni halıya takılıp düşüyor, Dr. Weber, eczaneye sen gidiyorsun | Merhem eczanede yok; **fünf** ile **fünfzehn** | **Können Sie sie bestellen?** · eczane merhemi **reservieren** ile ayırıyor |

Kartlar başlığa doğal bağlandı: Teppich (Brandl'ın halısı, haftanın ipliği: 50 → 52 → 54), Aussicht (otel reklamı, ofis), schüchtern (telefonda çekingenlik; öğrencinin telefon korkusuna doğrudan dokunur), Verspätung (göl otobüsü), Bargeld (kuaför, maç, Brandl), Trinkgeld (dün restoranda), reservieren (eczane merhemi ve otel odası; restoranda masa yok).

## Görülmemiş durumlar (`gorulmemis-08.json`)
| Kimlik | Durum | Karşı taraf | Kalıp | Derste aynı kalıp nerede, hangi kişi ve yerle |
|---|---|---|---|---|
| m1:h08:g1 | telefonda masa ayırtmak | bir garson (adsız) | **Ich möchte … reservieren.** | 54. gün: eczanede merhem, otelde oda (**Ich möchte ein Zimmer für zwei Nächte reservieren.**) |
| m1:h08:g2 | dükkânda ürün sormak (süpermarket) | bir satıcı (adsız) | **Wo ist …?** | 51. gün: durakta **Wo ist der Bus?**; ürün sorma derslerde pazar tezgâhı, fırın, eczane |
| m1:h08:g3 | yeni biriyle tanışmak (partide) | Lena (genel ad: eczanede yeni işe girmiş; başka bilgi eklenmedi) | **Ich bin … – Ich heiße …** | 53. gün prova: iş yerinde yeni iş arkadaşı |
| m1:h08:g4 (ek) | spor salonunda ağrıyı söylemek (7. hafta becerisi) | ch:kraus | **Ich habe Schmerzen im …** | 54. gün: doktorda Frau Brandl'ın bacağı |

Derslerde restoranda masa ayırtma, süpermarket, parti ve spor salonunda ağrı yok (`grep` ile sınandı). Bütün `accepted` K(54) içinde (aşağıya bak).

## Bilinen küme notları (dilbilimci ve PM için)
- **1.–7. gün dosyaları ile tablo farkı:** `a1-kesin.json` → `ogretilmis_sayilan` 4.–6. günde **noch, schon, nur, gern, dann, oft, sehr, Euro, Cent** kartlarını sayıyor; `gun-04/05/06.json` `yeni_kartlar` bunları içermiyor. Doğrulayıcının sayacı dosyaya baktığı için bu sözcükler görev cümlelerinde bilinmeyen sayılıyor. Görev cümlelerinden çıkardım; gösterim cümlelerinde en çok birer kez kaldılar. Kalıcı çözüm 1. hafta dosyalarında ya da tabloda (bu işin dışında).
- **Çekimler:** `kume.ts` yalnız kartın gösterdiği biçimi biliyor (örnek: **finden** bilinir, **finde** bilinmez; **schön** bilinir, **schöne** bilinmez; **tut weh** bile bilinmez). Gereken çekimleri günün halka kalıplarıyla öğrettim (**nehme, halbes, spielt, hole, rufe, gegessen, gemacht, gegeben, fällt, ausgefallen, reserviere, reserviert, packe, tut, zu Hause**). Kalıplar gün içinde geçerli olduğu için gerektiğinde ertesi gün yeniden yazıldı (**zu Hause** 53 ve 54).
- **Geçmiş zaman (53. gün):** Görev cümlelerinde yalnız **war** ve kalıpla öğretilen **gegessen / gemacht / gegeben / ausgefallen** var. **gewandert, gesagt, gekommen, gewartet** yalnız gösterimde, soruya ve kanıta bağlı değil.
- **Lena** (g3): genel-adlar.md'deki kimliğe aykırı bilgi yok; partide yalnız adını söylüyor.
- **Frau Brandl:** yeni halı ve halıya takılıp düşme WORLD 8. hafta bölümüne ("Frau Brandl düşer, eczaneden ilacını getirmeni ister") bağlandı; sözlükteki "Frau Brandl hat einen alten Teppich im Flur" cümlesiyle uyumlu. Yaşı (79) WORLD'den.
- **Kişi adları:** yeni adlı kişi yok; adsız roller: der Verkäufer, die Verkäuferin, der Kellner, die Apothekerin, die neue Kollegin, eine Frau auf der Party.
- **Bairisch yok.** Yalnız öğrencinin kabul seçeneklerinde WORLD'de kaynaklı **Grüß Gott** var (1. gündeki gibi).

## Sınama özeti
- Benzetim (`sim.sh … 50 gun-5*.json gorulmemis-08.json`): 50.–54. günde hata yalnız bilinen halka hatası "3 kart (4–6)" (5 adet). Uyarılar: 3 kart (hedef 15–25), gerçek video yok, B7 adsız biçim (1.–7. günlerle aynı tür). "Öğretilmemiş kelime", "bilinmeyen" ve "accepted" uyarısı 0.
- AK-3 sayacı: 50. gün 0/24, 51. gün 0/23, 52. gün 0/21, 53. gün 0/21, 54. gün 0/23.
- Dikiş: 50.–54. gün satırları (a) (b) (c) (d) biçim = 0. Toplam "İhlal: 105" benzetimin 8.–49. gün taslak dosyalarından geliyor (halka biçimi yok, `dersler` eksik); bu haftaya ait değil.
- PM-069 boşluk sayacı (51: 1, 52: 5, 53: 3, 54: 9): sözlük kartlarının kendi `forms` boşlukları; gün dosyalarından değil (lex işi).
- Aynı cümle taraması (bütün satır, 1.–7. gün + 50.–54. gün + görülmemiş): 0 tekrar.
