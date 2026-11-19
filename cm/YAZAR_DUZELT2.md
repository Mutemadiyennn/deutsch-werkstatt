# Yazar görevi: M1 ikinci inceleme düzeltmeleri (#63)

Rolün `yazar`. Çalışma kopyası `/home/claude/wt-m1`, yazma yolu `content/v2/m1/**`. git çalıştırma. İnceleme metni: `/tmp/inc63b.md` (oku). Türkçe kuralları: `/home/claude/cm/OKUR_DERSLERI.md`.
Transkript: `cd /home/claude/cm && python3 dib.py goster KLIP`. Metni kopyalama.

## Yap
1. **P1-1:** `hafta-sonu-testi.json` `t03` ve `t09`. Öğretilmiş her doğru birleşim kabul edilsin. Listeyi birleşimle kur: giriş (`Hier ist {name}`, `Ich bin {name}`, `Ich heiße {name}`, `Mein Name ist {name}`, başında `Guten Tag,` olan ve olmayan) × istek ya da ikinci cümle (`bitte`, `gern`, `gerne` varyantları dahil), iki cümle olarak ve `und` ile. `judge`, listeyle birebir karşılaştırır. Liste uzun olabilir.
2. **P2 maddelerinin hepsi** (gün dosyaları ve video dosyaları): video 6 ayrıntı 4, video 3 gölge tur 7, video 5 `wie viele`, `sahne` içindeki sunucu açılış ve kapanışları (gün 1, 5, 6, 7) ve gün 6 meydanda soru kurgusu, `m1:05:v1:c1` yönergesi, `m1:06:a1` `tur` ve içerik uyumu, `t07` tek başına `Ja.`.
3. Video 7 tur 3–4 çift s yazımı: bu turları gölge ve `cevapla` için kullanma; başka tura bağla.
4. Ön öğretim en çok 6 madde, her madde tek kelime ya da tek kalıp. Yeniden sayılınca bilinmeyen oranı düşürecek değişim varsa yap: `python3 vcheck.py` artık işlev kelimelerini bilinen saymıyor. Oran %10 üstündeki günlerde ön öğretimi en sık bilinmeyenlere çevir ya da kesiti kısalt, ama 25 sn altına inme. `dib.py olc` eski yöntemle ölçer, kararı `vcheck.py` ile ver.

`bilinmeyen`, `durum`, `kesit_sure_tahmin_sn`, `review` alanlarına dokunma. Sonunda `cd /home/claude/wt-m1 && npx tsx /home/claude/cm/m1audit.ts` 0 ihlal, `python3 /home/claude/cm/vcheck.py` hepsi `tamam`.
Değiştirdiğin Türkçe alan yollarını `/home/claude/cm/work/m1duz2.alanlar.txt` dosyasına yaz (`gun-NN.yol`, `hafta-sonu-testi.yol`, `video-NN.yol`). Değişen Almanca alanları `/home/claude/cm/work/m1duz2.de.txt`. Son mesaj: sonuçlar ve yapılamayanlar.
