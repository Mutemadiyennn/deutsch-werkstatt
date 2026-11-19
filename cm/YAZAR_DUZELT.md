# Yazar görevi: M1 gün düzeltmeleri (#63 inceleme bulguları)

Rolün `/home/claude/deutsch-werkstatt/.claude/agents/yazar.md`. Çalışma kopyası `/home/claude/wt-m1`. git çalıştırma. Yazma yolu: yalnızca `content/v2/m1/**`. Biçim: `content/v2/m1/FORMAT.md`. Türkçe kurallar: `/home/claude/cm/OKUR_DERSLERI.md`, OD-9.
İnceleme metni: `/tmp/inc63/inceleme-63.md` (tamamını oku).

## Denetim
`cd /home/claude/wt-m1 && npx tsx /home/claude/cm/m1audit.ts` → `docs/v2/reviews/m1-denetim.txt`. Hedef **0 ihlal**. Denetim sıkılaştı: kart `forms` cümlelerindeki kelimeler artık öğretilmiş sayılmıyor.
Şema: `/home/claude/wt-medya` ana motorun PR #60 kopyası. Gün dosyalarını oraya kopyalayıp (`content/v2/m1/gun-*.json`; `video/` klasörünü kopyalama) orada `npm run -s content:validate` çalıştır: `gun-` satırlarında **HATA olmamalı**. Sözlük oradaki kopyada güncel olmayabilir; sözlükte yok uyarılarını önemseme.

## Alınmış kararlar
- Kart listeleri güncellendi: gün 1 `+Herr −und`; gün 2 `+offen +wann`; gün 3 `+neu +Büro`; gün 5 `+wieder +da −um −nach −vor`; gün 6 `+brauchen −wann`; gün 7 `+müde`. `um`, `nach`, `vor`, `und` kart değil, derste öğretilir. Bu kartların tamamlanması ayrı yürüyor; sen bunları öğretilmiş say. `hallo`, `danke`, `bitte`, `ja`, `nein`, `wer`, `was` kart.
- 7. gün testi `content/v2/m1/hafta-sonu-testi.json` dosyasına taşındı (`maddeler`).
- Çizimli bölüm artık `sahne`. Günün videosu sayılmaz.

## Yapılacaklar
1. **P0 ve denetim ihlalleri:** her ihlali kapat. Önce metni öğretilen kelimelerle yeniden kur; kart ya da ders dışına çıkma. Yeni kart ekleme.
2. **P1-1:** öğrenciye görünen hiçbir metinde bu bölüm için "video", "röportaj" deme: "sahne" de. `sahne_tr` tariflerinden mikrofon, kamera, izleyici, sunucu kurgusunu çıkar; `m1:01:v1:c1` "mikrofon uzatıyor" da gider.
3. **P1-2:** `hafta-sonu-testi.json` 12 madde kalsın, kimlikler `m1:07:t01…t12` sırayla olsun. Eklenecek: (a) öğrenci adını söyleyip randevu ister (kabul listesi `m1:07:a1:c1`'den), (b) iki üç cümleyle kendini tanıtır: verilen bilgiyle (ad `{name}`, örneğin Türkiye'den geliyor ve gün dosyalarındaki kurgusal kasabada oturuyor) kısa tanıtım, geniş `accepted`. Çıkarılacaklar için en zayıf maddeleri seç. Ödeme, numara, ay, saat, tekrar isteme kapsamı kalsın.
4. **P1-3:** dikte hedefi olan iki cümleli sahne ve ses satırlarını tek cümleye böl (`s7` → `s7`, `s7b` gibi; `cumleler`, `kanit`, `golge`, `dikte.cumle` bağlarını güncelle). Liste incelemede. Ana motor şeması da `accepted[0]` cümlenin kendisi olsun ister.
5. **P1-5:** `t15` listesine `Mein Termin ist im Mai.`; `Im Mai, bitte.` çıkar.
6. **P2:** incelemenin P2 listesindeki gün içeriği maddelerini düzelt (test kabul listeleri, `t04` yönergesi, `m1:07:a1:c1` `why_tr`, gün 4 `super` ve `es`, gün 7 sınır kelimeler, gün 2 yanlış biçimi seslendiren sahne, `hizlar` yalnızca `slow` ve `normal`, `m1:06:a1` `tur`).
7. **Video dosyaları** (`content/v2/m1/video/`): gün 2 `c1` örneği `wohnen`e dayanmasın (kısa cevap `In Berlin.` ya da ön öğretim), d4 `Wann bist…` turu dikteden çıksın, `bilinmeyen` listeleri düzelsin; gün 3 `kommst`; gün 4 d5 `Vierundzwanzig` yazımı da kabul edilsin ve "rakamla" zorunluluğu kalksın; gün 4 `turlar[1].basi` gerçek soyadı taşımasın; gün 5 `schlafe` ön öğretim ya da örnekten çıkar; gün 6 d4 `um die fünfzig` turu dikteden çıksın.

Transkript metnini kopyalama. Değiştirdiğin her Türkçe alanın yolunu `/home/claude/cm/work/m1duz.alanlar.txt` dosyasına satır satır yaz (gün dosyası için `gun-NN.<yol>`). Almanca değiştirdiklerini de ayrı `/home/claude/cm/work/m1duz.de.txt` dosyasına yaz. Son mesaj: denetim ve şema sonucu (sayılarla), yapılamayanlar.
