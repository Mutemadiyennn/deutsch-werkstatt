# Kurs ünitesi şeması (data/kurs/<id>.json)

Öğrenci: Türk, İngilizcesi B2, Almancası gerçekte A1, Bavyera'da yaşıyor. Açıklamalar Türkçe; yeri geldikçe İngilizce köprü kurulabilir ("İngilizcedeki *I am* gibi").
İçerik HAZIR ve KALICI: uygulama bunları yapay zekâya sormadan gösterir. Bu yüzden her cümle %100 doğru, doğal ve seviyeye uygun olmalı.

```json
{
 "id": "a1-01", "lvl": "A1.1", "lek": "S1 L1",
 "title_de": "...", "title_tr": "...", "goal_tr": "Bu ünitenin sonunda ... yapabilirsin.",
 "intro_tr": "1-2 cümle: bu konu gerçek hayatta neden işine yarar.",
 "teach": [
   {"id":"t1", "h_tr":"kısa başlık", "tr":"Türkçe anlatım (2-5 cümle, net, kural + mantık). Almanca parçalar 'tek tırnak' içinde.",
    "table": {"head":["..",".."], "rows":[["..",".."]]},      // opsiyonel
    "ex": [{"de":"...", "tr":"..."}]}                          // 3-5 örnek
 ],                                                            // 3-5 blok
 "words": [{"de":"Name", "art":"der", "pl":"Namen", "tr":"isim", "t":"n"}],   // 10-16; t: n=isim v=fiil a=sıfat/zarf x=diğer/kalıp; isim değilse art/pl "" ; çoğulu yoksa pl "-"
 "dialog": {"title_tr":"...", "roles":{"A":"Frau Huber", "B":"Sen"},
            "lines":[{"r":"A","de":"...","tr":"..."}]},     // 6-10 satır; B satırlarını öğrenci sesli söyler
 "drills": [ ... 24-32 madde ... ],
 "read": {"title_de":"...", "de":"metin", "tr":"çeviri", "qs":[{"q_tr":"...", "opts":["..","..",".."], "ans":0}]},
 "speak": [{"tr":"serbest konuşma görevi", "model_de":"örnek cevap", "hint_de":["kalıp 1","kalıp 2"]}],  // 2-3
 "roleplay": {"scene_tr":"Sahne (Türkçe, 1 cümle)", "partner_de":"Partnerin rolü, Almanca kısa tarif (ör. 'Frau Huber, Lehrerin im Deutschkurs, freundlich')",
              "opener_de":"Partnerin ilk cümlesi", "targets":[{"tr":"öğrencinin bu sohbette yapması gereken şey (Türkçe)", "de":"örnek doğru cümle"}]},  // 3-5 hedef, ünitenin can-do'suna birebir bağlı; Bavyera'da gerçek bir an
 "test": [ ... 12 madde, drill tipleriyle; cümleler drills/teach/dialog'da GEÇMEYEN yeni cümleler ... ]
}
```

## Alıştırma tipleri (her maddede "k", "t" (ilgili teach id'si) ve "why_tr" var)
- `say`  : {"tr":"Türkçe cümle", "de":"doğru Almanca", "alt":["kabul edilen diğer doğru söyleyişler"]} → öğrenci SESLİ söyler. EN ÖNEMLİ tip; drill'lerin en az %35'i.
- `gap`  : {"de":"Ich ___ aus Polen.", "ans":["komme"], "opts":["komme","kommst","kommt"], "tr":"Polonyalıyım."} → tek boşluk ___, opts 3 seçenek (biri doğru).
- `pick` : {"q_tr":"Soru (Türkçe)", "opts":["..","..",".."], "ans":0}
- `order`: {"de":"Woher kommen Sie?", "tr":"Nerelisiniz?"} → oynatıcı kelimeleri karıştırır; 3-9 kelime.
- `listen`: {"de":"...", "opts_tr":["..","..",".."], "ans":0} → Almancayı duyar, anlamını seçer.
- `fix`  : {"wrong":"Ich bist Lena.", "right":"Ich bin Lena.", "alt":[]} → yanlışı düzeltip söyler/yazar.

## Kurallar
1. Almanca: dilbilgisi ve yazım kusursuz, doğal (bir Bavyeralının gerçekten söyleyeceği). Standart Almanca; Bavyera sadece mekân/kültür olarak.
2. Türkçe: doğal, imla hatasız ("fiil", "özne"), çeviri birebir anlam; soru soru olarak kalır.
3. Kişisel bilgi YOK: öğrencinin adı, işi, ailesi, sporu geçmez. Kişiler çeşitli: Frau Huber, Herr Yılmaz, Lena, Jonas, Maria, Dr. Wagner, Tim, Sofia, Familie Berger… Yerler: München, Augsburg, Regensburg, Nürnberg, Rosenheim, Supermarkt, Bäckerei, Arztpraxis, Bahnhof…
4. Kelime: bu ünitenin "words" listesi + önceki ünitelerin kelimeleri + en sık 300 temel kelime. A1 ünitelerinde cümleler kısa (3-9 kelime).
5. Cevap sızıntısı yok: `say` maddesinde istenen Almanca, aynı maddenin hiçbir yerinde görünmez; `gap` maddesinde cevap cümlede başka yerde geçmez.
6. `gap`: boşluğa yalnızca tek doğru cevap uyar; çeldiriciler aynı kelimenin yanlış formları veya karıştırılan kelimeler.
7. `say.alt`: aynı anlamı veren bütün doğal doğru varyantlar (ör. "Ich heiße Lena." / "Mein Name ist Lena." / "Ich bin Lena." anlam uyuyorsa). Noktalama ve büyük/küçük harf önemsiz.
8. Drill'ler kolaydan zora: önce tanıma (listen/pick/gap), sonra üretme (order/say/fix). Her teach bloğu en az 4 drill ile çalıştırılır.
9. `test` maddeleri yeni cümleler; geçme sınırı %80.
10. `why_tr` kısa (en fazla 15 kelime) ve cevabı tekrar etmek yerine KURALI söyler.

## Rol yapma (roleplay)
Ünitenin sonunda öğrenci, yapay zekâ partnerle KISA (3-6 dk) bir sesli sohbet yapar. Partner ünitenin hedeflerini bilir; öğrenci her `target`'ı en az bir kez doğru söyleyene kadar sohbeti o yöne götürür, her hatada doğru cümleyi söyletip tekrar ettirir.
`targets` maddeleri, ünitede öğretilen kalıplarla doğrudan söylenebilir olmalı. Sahne öğrencinin Bavyera'da gerçekten yaşayacağı bir an olsun (fırın, komşu, doktor, Bürgeramt, kreş, tren…), öğrencinin işi/sporu değil.

11. Türkçe metin içinde Almanca parçalar 'tek tırnak' ile yazılır (uygulama onları vurgular); Türkçe kelimeleri vurgulamak için “çift tırnak” kullan.
12. `order` maddelerinde, aynı kelimelerle kurulabilen BAŞKA doğru sıralamalar (ör. "Seit 2018 wohnt sie in Bamberg." / "Sie wohnt seit 2018 in Bamberg.") mutlaka `"alt": [...]` listesine yazılır.
