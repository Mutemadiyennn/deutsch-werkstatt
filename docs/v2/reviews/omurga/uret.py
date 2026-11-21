"""Omurga taslağı üretici (geçici araç; çıktı content/v2/curriculum/omurga.json)."""
import json, sys, collections
ROOT = sys.argv[1]
J = lambda p: json.load(open(f"{ROOT}/{p}"))
m1 = J("content/v2/curriculum/m1.json")
k1 = J("content/v2/curriculum/k1.json")["cekirdek"]
SIRA = {e["id"]: e["sira"] for e in k1}
GRUP = {e["id"]: e["grup"] for e in k1}
m1c = [c for g in m1["gunler"] for c in g["yeni_kartlar"]]

TAKVIM = ["lx:Weihnachten", "lx:Kerze", "lx:Advent", "lx:Adventskranz", "lx:Glühwein", "lx:Kinderpunsch",
          "lx:Plätzchen", "lx:Weihnachtsfeier", "lx:Weihnachtsmarkt", "lx:Wichteln", "lx:Mandel"]
# Gün 8: PM kararı 3 (küçük sözcükler) — önce PM listesinin M1'de olmayanları, C ölçümündeki tıkama sırasıyla;
# sonra listede olmayan en çok tıkayan küçük sözcükler (tıkama sayısı sonuc.json, B biçimi).
KUCUK_PM = [("lx:noch", 50), ("lx:schon", 43), ("lx:nur", 30), ("lx:gern", 12), ("lx:oft", 11), ("lx:sehr", 11), ("lx:dann", 9)]
KUCUK_EK = [("lx:lange", 21), ("lx:erst", 14), ("lx:viel", 14), ("lx:gleich", 14), ("lx:echt", 13), ("lx:Zeit", 12),
            ("lx:gut", 12), ("lx:klar", 9), ("lx:kurz", 9), ("lx:immer", 8), ("lx:jetzt", 7), ("lx:mehr", 7), ("lx:ganz", 6)]
GUN8 = [c for c, _ in KUCUK_PM + KUCUK_EK] + ["lx:Euro", "lx:Cent"]  # Euro, Cent: kartı yok, lex işi

used = set(m1c) | set(TAKVIM) | set(GUN8)
pools = collections.defaultdict(list)
for e in sorted(k1, key=lambda e: e["sira"]):
    if e["id"] in used:
        continue
    g = e["grup"]
    pools["r0" if g.startswith("r0:") else g].append(e["id"])

def al(kota):
    """kota: [(havuz, adet)] → (kart listesi, aralık özeti, k1 dışı adet)"""
    kartlar, ozet, disi = [], [], 0
    for havuz, n in kota:
        if havuz == "k1_disi":
            disi += n
            continue
        p = pools[havuz]
        assert len(p) >= n, (havuz, n, len(p))
        secim, pools[havuz] = p[:n], p[n:]
        kartlar += secim
        s = [SIRA[c] for c in secim]
        ozet.append({"grup": havuz, "sira": [min(s), max(s)], "adet": n})
    return kartlar, ozet, disi

GR_ALL = {g["id"] for g in J("content/v2/registry/grammar.json")}
# ---------- dil noktası önerileri (henüz dosyası olmayanlar) ----------
DN = [
 ("dn:kal-am-gun", "Kalıp: am + gün – im + ay (am Montag, im Mai)", "A1", ["gr:a1-05:t3"], "PM 7046461200: 2. gün halkasında kalıp; kural 3. haftada (gr:a1-05:t3)"),
 ("dn:kal-alles-gute", "Kalıp: Alles Gute zum Geburtstag!", "A1", ["gr:a1-14:t5"], "PM 7043400862 karar 2: 2. gün provasından önce halkada öğretilir"),
 ("dn:kucuk-sozcukler", "Küçük sözcükler halkası: noch, schon, nur, gern, oft, sehr, dann …", "A1", [], "PM 7043400862 karar 3: kart olarak, C ölçümündeki tıkama sırasıyla"),
 ("dn:kisaltma-1", "Hızlı konuşma 1: hab, komm, geh, geht's, 'n (LS-8.3 mikro ders)", "A1", [], "PM 7043400862: mikro ders görülmeden görev cümlesinde kısaltma yok"),
 ("dn:kisaltma-2", "Hızlı konuşma 2: haste, isses, gibt's, 'nen, ham wir, nö (LS-8.3 mikro ders)", "A2", [], "LS-8.3"),
 ("dn:sesli-kurma", "Sesli kurma dersi: Türkçe sor, bekle, sen kur (araba modu)", "A1", [], "#56 eksik 1"),
 ("dn:kelime-ailesi-1", "Kelime ailesi 1: birleşik isimler (Haus + Arzt)", "A1", [], "#56 eksik 2"),
 ("dn:kelime-ailesi-2", "Kelime ailesi 2: ön ekler an-, ab-, um-, ein-, aus-", "A2", ["gr:a1-05:t4"], "#56 eksik 2"),
 ("dn:kelime-ailesi-3", "Kelime ailesi 3: -ung, -heit, -keit ile isim", "A2", [], "#56 eksik 2"),
 ("dn:kelime-ailesi-4", "Kelime ailesi 4: -lich, -bar, un- ile sıfat", "B1", [], "#56 eksik 2"),
 ("dn:kaydet-dinle", "Kaydet ve yan yana dinle (telaffuz atölyesi)", "A1", [], "#56 eksik 3"),
 ("dn:yeniden-anlatma", "Yeniden anlatma: dinlediğini 3–5 cümleyle anlat", "A1", [], "#56 eksik 4"),
 ("dn:akicilik-432", "Akıcılık: aynı şeyi 4, 3, 2 dakikada anlat", "A2", [], "#56 madde 16"),
 ("dn:bairisch-1", "Bavyera sözleri 1: Grüß Gott, Servus, gell, Ja mei, Passt scho (WORLD §5, kaynaklı)", "A2", [], "WORLD §5"),
 ("dn:bairisch-2", "Bavyera kulağı 2: doğal kayıtta sık biçimleri tanımak (ses: Wikitongues; yazılı örnek: MaiBaam; kaynaklı)", "B1", [], "KAYNAKLAR §1, §7"),
 ("dn:relativ-basit", "İlgi cümlesi, ilk adım: tanımak ve iki kalıpla tarif etmek (Das ist ein Ding, das … / jemand, der …)", "A2", ["gr:b1-02:t1"], "a2.json kulak-3 gr:relativ-basit ister; grammar.json bunu B1'de öğretir"),
 ("dn:sinav-provasi", "B1 sınav biçimi provası: dört bölüm, süreli (biçim referansı, C)", "B1", ["gr:b1-14:t4", "gr:b1-14:t5"], "KAYNAKLAR §3"),
]
DN_IDS = {d[0] for d in DN}

# a2.json soyut gramer etiketi → omurgadaki dil noktası
GR_MAP = {"gr:modal": "r0:09-modalverben", "gr:trennbar": "gr:a1-05:t4", "gr:perfekt": "gr:a1-07:t2",
          "gr:dativ": "gr:a1-10:t1", "gr:imperativ": "gr:a1-09:t4", "gr:nebensatz": "gr:a2-01:t4",
          "gr:akkusativ": "gr:a1-06:t1", "gr:vergleich": "gr:a1-13:t2", "gr:verbzweit": "gr:a1-05:t5",
          "gr:zeit": "gr:a1-12:t3", "gr:relativ-basit": "dn:relativ-basit"}

# B1 birim önerileri (b1.json henüz yok; yalnız başlık)
B1U = [
 ("telefon-1", "Bir sorunu telefonda baştan sona çözmek"), ("telefon-2", "Telefonda mesaj bırakmak, geri arama istemek"),
 ("telefon-3", "Bir aboneliği telefonla sormak ya da iptal etmek"), ("telefon-4", "Hazırlıksız gelen aramada işi halletmek"),
 ("saglik-1", "Doktorun açıklamasını anlamak, ek soru sormak"), ("saglik-2", "Uzmana sevk ve randevu"),
 ("saglik-3", "Acil bir durumda ne olduğunu anlatmak"), ("saglik-4", "Sağlık sigortasına soru sormak"),
 ("resmi-1", "Resmî mektuba yazılı cevap vermek"), ("resmi-2", "Bir karara yazılı itiraz etmek"),
 ("resmi-3", "Bankada bir sorunu çözmek"), ("resmi-4", "Kira ve yan giderler hakkında sormak"),
 ("is-1", "İzin, vardiya ve fazla mesai konuşmak"), ("is-2", "Toplantıda kısa durum özeti vermek"),
 ("is-3", "İş görüşmesinde kendini anlatmak"), ("is-4", "Bir sorunu şefe anlatıp çözüm önermek"),
 ("hizmet-1", "Şikâyet etmek, ürünü iade etmek"), ("hizmet-2", "Bir işi ustaya ya da tamirhaneye yaptırmak"),
 ("hizmet-3", "İki teklifi karşılaştırmak, pazarlık etmek"), ("hizmet-4", "Teknik bir sorunu anlatmak"),
 ("bag-1", "Fikir bildirmek, katılmadığını söylemek"), ("bag-2", "Bir olayı sırasıyla anlatmak"),
 ("bag-3", "Bir anlaşmazlığı konuşmak, yardım teklif etmek"), ("bag-4", "Dernek ve gönüllülük"),
 ("kulak-1", "Sokak röportajında doğal konuşmayı anlamak"), ("kulak-2", "Radyo haberini anlamak"),
 ("kulak-3", "Bavyera ağzıyla sohbeti takip etmek"), ("kulak-4", "Sesli mesaj ve anonsta ayrıntı yakalamak"),
 ("okuma-1", "Kısa haber okumak ve özetlemek"), ("okuma-2", "Resmî e-posta yazmak"),
 ("okuma-3", "İlan ve yorum okumak, yorum yazmak"), ("okuma-4", "Kullanım talimatını okumak"),
]

def gr(u, ts): return [f"gr:{u}:t{t}" for t in ts]

# ---------- A1 günleri (8–56) ----------
A1G = {
 2: [("Sık duyulan küçük sözcükler: noch, schon, nur", gr("a1-03", [5]) + ["dn:kucuk-sozcukler"]),
     ("Fırında der, die, das: das Brot, die Semmel, der Kuchen", gr("a1-04", [1])),  # r0-11 2. günde (gun-02.json); Akkusativ (12. gün) öncesi cinsiyet
     ("Bir, hiç: ein, kein", gr("a1-03", [1, 2])),
     ("İki tane istemek: Ich möchte zwei Brötchen", gr("a1-03", [3, 4])),
     ("Kibarca istemek: Ich hätte gern einen Kaffee", gr("a1-12", [2]) + gr("a1-06", [1]) + gr("a1-01", [1])),
     ("Benim ve senin: mein, dein", gr("a1-02", [1]) + ["dn:kisaltma-1"]),
     ("Haftanın sınavı: fırında alışveriş", [])],
 3: [("Evet ya da hayır soruları: Haben Sie Zeit?", gr("a1-02", [3])),
     ("Telefonda kendini tanıtmak ve adını hecelemek", gr("a1-12", [5]) + ["r0:10-buchstabieren"]),
     ("Kibar rica: Könnten Sie das wiederholen?", gr("a1-12", [1])),
     ("Ne zaman? um, am, im", gr("a1-05", [3]) + gr("a1-12", [3])),
     ("Sen ve o derken değişen harf: du sprichst, er fährt", gr("a1-02", [4]) + gr("a1-06", [2])),
     ("Ayın kaçında? am ersten Mai", gr("a1-12", [4])),
     ("Haftanın sınavı: muayenehaneyi aramak", [])],
 4: [("Evdeki eşyalar: Wo ist der Schlüssel? Er ist hier", gr("a1-04", [2])),
     ("Eşyayı tarif etmek: Er ist groß und weiß", gr("a1-04", [3])),
     ("Çok, fazla, değil: sehr, zu, nicht", gr("a1-04", [4])),
     ("Hangisi? Daha ucuz", gr("a1-13", [1, 2])),
     ("Ev ilanında en ucuzunu bulmak", gr("a1-13", [3]) + gr("a1-04", [5])),
     ("Nerede? in, an, auf, neben", gr("a1-11", [1, 2])),
     ("Haftanın sınavı: merdivende komşuyla", [])],
 5: [("Sabah kalkmak: Ich stehe um sieben auf", gr("a1-05", [4])),
     ("Cümleye zamanla başlamak: Am Montag arbeite ich", gr("a1-05", [5])),
     ("Meslek sormak: Was sind Sie von Beruf?", gr("a1-08", [1, 2])),
     ("Sevdiğini söylemek: gern, lieber", gr("a1-06", [3])),
     ("Doğum gününe davet etmek", gr("a1-14", [4, 5])),
     ("Yol tarif etmek: die zweite Straße links", gr("a1-11", [3, 4, 5])),
     ("Haftanın sınavı: molada sohbet", [])],
 6: [("Dün ne yaptığını söylemek: Ich habe gekocht", gr("a1-07", [2])),
     ("Kelimeyi geçmişe çevirmek: kaufen, gekauft", gr("a1-07", [3]) + ["dn:sesli-kurma"]),
     ("Gitmek ve gelmek geçmişte: Ich bin gegangen", gr("a1-07", [4]) + gr("a2-01", [1]) + ["dn:kaydet-dinle"]),
     ("Eskiden nasıldı: Ich war, ich hatte", gr("a1-08", [3]) + gr("a1-14", [3])),
     ("İki kelimeden bir kelime: Hausarzt", ["dn:kelime-ailesi-1"] + gr("a1-06", [4])),
     ("Dinlediğini kendi sözlerinle anlatmak", ["dn:yeniden-anlatma"] + gr("a1-08", [4])),
     ("Haftanın sınavı: hafta sonunu anlatmak", [])],
 7: [("Başım ağrıyor", gr("a1-10", [1])),
     ("Gerek yok mu, yasak mı: nicht müssen, nicht dürfen", gr("a1-09", [2, 3])),
     ("Doktorun talimatı: Nehmen Sie die Tabletten", gr("a1-09", [4]) + gr("a1-10", [4])),
     ("Form doldurmak: Vorname, Geburtsdatum", gr("a1-10", [2]) + gr("a1-09", [5])),
     ("Beğendiğini söylemek: Das gefällt mir", gr("a1-13", [4, 5])),
     ("Bir arkadaşa öğüt vermek: Trink viel Wasser!", gr("a1-14", [1, 2]) + gr("a1-10", [3])),
     ("Haftanın sınavı: doktorda muayene", [])],
 8: [("Pekiştirme: telefon ve randevu", []), ("Pekiştirme: alışveriş ve fiyat", []),
     ("Pekiştirme: mahallede konuşmak", []), ("Pekiştirme: dün ve hafta sonu", []),
     ("Pekiştirme: doktor ve eczane", []), ("A1 sınavı: duyduğunu ve okuduğunu anlamak", []),
     ("A1 sınavı: üç yeni durumda konuşmak", [])],
}
# Günlük kart ağırlıkları (kapı günü az)
AG = [22, 18, 18, 17, 16, 14, 5]
AG_KAPI = [3, 3, 3, 3, 3, 0, 0]

# ---------- haftalar ----------
# alanlar: no, yap, gorev, dn(ek dil noktaları; A1'de günlerden gelir), aileler, birimler, durum_tr, kol, mekan, kol_tr,
#          kapi, req_h (ek hafta), req_dn (ek), kota, kulak(video, aday, dk, durum), kapsam, alan
H = []
def W(**k): H.append(k)

# Seviye kapısının konuşma satırı (8, 24, 52); üç durum kapi_ek.durumlar'da (öğrenciye gösterilmez)
KAPI_SEVIYE = "Uygulamada hiç karşılaşmadığın üç yeni durumda yardımsız konuşursun."

W(no=1, yap="Gün ve saat konuşarak basit bir randevu isterim.",
  gorev="Bir dükkânın kapısındaki açılış saatlerini Almanca okurum.",
  dn=["r0:01-tage", "r0:02-monate", "r0:03-zahlen-0-20", "r0:04-zahlen-21-100", "r0:05-uhrzeit", "r0:06-datum",
      "r0:07-fragewoerter", "r0:08-sein-haben", "r0:09-modalverben", "r0:11-praesens", "dn:kal-am-gun", "dn:kal-alles-gute"],
  aileler=["telefon", "saglik", "hizmet", "bag"], birimler=[], durum_tr="Randevu için gün ve saat konuşmak, fiyat, numara, tarih ve kendini tanıtmak",
  kol=["bahce", "atolye", "sinema"], mekan="pl:praxis", kol_tr="Bahçe, Atölye ve Sinema açılır",
  kapi=("Yedinci gün Frau Huber'i arar, adını söyler ve randevu istersin.",
        "Yeni kısa bir kayıtta gün ve saati duyup yazarsın.",
        {"kaynak": "m1/hafta-sonu-testi.json (12 madde)"}),
  kulak=dict(video=7, kaynak=[f"m1:0{i}:rv1" for i in range(1, 8)], aday="Deutsch im Blick (CC BY 4.0), 7 hazır klip", dk=40, durum=7),
  kapsam=[1, 3, 4, 5, 11, 12, 19, 20, 24], alan="M1: gün, ay, sayı, saat, tarih, soru, fiil")

W(no=2, yap="Fırında istediğimi söyler, fiyatını sorarım.",
  gorev="Fırında iki şey isteyip fiyatını sorarım.",
  aileler=["hizmet", "bag"], durum_tr="Fırında sipariş vermek ve tanışırken samimi ya da resmî hitap etmek",
  kol=["pazar"], mekan="pl:baeckerei", kol_tr="Gerçek Görevler panosu ilk dış görevle açılır",
  kapi=("Fırında yardımsız iki şey ister, sayısını ve fiyatını sorarsın.",
        "Hızlı söylenen bir fiyatı duyup yazarsın."),
  kota=[("senaryo", 25), ("siklik-A1", 45), ("v1-A1", 23)],
  kulak=dict(video=5, aday="Deutsch im Blick Kap. 4 (Freizeit und Ausgehen): kafe, yemek", dk=80, durum=4),
  kapsam=[1, 2, 3, 4, 5, 7, 12, 14, 21], alan="sık küçük sözcükler; fırın ve fiyat")

W(no=3, yap="Telefonda randevunun gün ve saatini doğrularım.",
  gorev="Bir dükkânı arayıp yalnızca açılış saatini sorarım.",
  aileler=["telefon", "saglik"], durum_tr="Muayenehaneyi aramak: Frau Huber'e adını hecelemek, gün ve saat konuşmak, tekrar istemek",
  kol=["telefon"], mekan="pl:telefon", kol_tr="Telefon: sesli mesajlar açılır",
  kapi=("Telefonda Frau Huber'e adını hecelersin, gün ve saati söylersin.",
        "Frau Huber'in hızlı sesli mesajından gün ve saati yazarsın."),
  req_dn=["r0:05-uhrzeit", "r0:06-datum", "dn:kal-am-gun"],
  kota=[("r0", 7), ("ihtiyac:telefon", 7), ("senaryo", 20), ("siklik-A1", 40), ("v1-A1", 21)],
  kulak=dict(video=5, aday="Deutsch im Blick Kap. 2 (An der Uni): ders saatleri, günler", dk=80, durum=4),
  kapsam=[1, 3, 4, 10, 15], alan="telefon; zaman sözcükleri")

W(no=4, yap="Komşuma evimi ve nerede oturduğumu anlatırım.",
  gorev="Apartmanda bir komşuya selam verip kendimi tanıtırım.",
  aileler=["bag", "okuma"], durum_tr="Merdivende Frau Brandl ile tanışmak, Herr Pichler'in duyurusu ve ev ilanı",
  kol=["kutuphane"], mekan="pl:haus", kol_tr="Okuma Salonu açılır (ev ilanı, duyuru)",
  kapi=("Merdivende Frau Brandl'a kim olduğunu, nerede oturduğunu ve evini anlatırsın.",
        "Herr Pichler'in duyurusunu dinleyip senden ne istediğini söylersin."),
  kota=[("ihtiyac:wohnen", 8), ("senaryo", 12), ("siklik-A1", 45), ("v1-A1", 25)],
  kulak=dict(video=5, aday="Deutsch im Blick Kap. 8 (Wohnen bölümü)", dk=80, durum=4),
  kapsam=[1, 3, 4, 7, 17], alan="ev ve eşya; sıfatlar")

W(no=5, yap="Günümü saat saat anlatırım.",
  gorev="Bir tanıdığa yarınki planımı üç cümleyle anlatırım.",
  aileler=["is", "bag", "kulak"], durum_tr="İş yerinde ilk gün: Tobi ile samimi, Herr Wimmer ile resmî konuşmak, günün planı, davet ve otobüs",
  kol=["kafe"], mekan="pl:firma", kol_tr="Sohbet Saati (kafe) açılır",
  kapi=("Molada yarınki planını önce Tobi'ye samimi, sonra Herr Wimmer'e kibarca anlatırsın.",
        "Bir otobüs anonsunda hangi otobüsün kaçta kalktığını söylersin."),
  kota=[("ihtiyac:verkehr", 8), ("ihtiyac:arbeit", 5), ("senaryo", 10), ("siklik-A1", 42), ("v1-A1", 20)],
  kulak=dict(video=5, aday="Deutsch im Blick Kap. 3 (Der Alltag)", dk=80, durum=4),
  kapsam=[1, 3, 4, 7, 21], alan="gün planı, iş, yol")

W(no=6, yap="Dün ne yaptığımı kısa cümlelerle anlatırım.",
  gorev="Birine dün ne yaptığımı iki cümleyle anlatırım.",
  aileler=["bag", "is"], durum_tr="Pazartesi molasında hafta sonunu anlatmak",
  kol=["tiyatro"], mekan="pl:sprachkurs", kol_tr="Hikâye (sesli drama) ve araba modu açılır",
  kapi=("Hafta sonunda ne yaptığını üç cümleyle anlatırsın.",
        "Kısa bir hikâyeyi dinleyip üç cümleyle yeniden anlatırsın.",
        {"kayit_karsilastirma": "konuşma kaydı bir hafta önceki kayıtla yan yana dinlenir (#56 madde 9)"}),
  kota=[("senaryo", 5), ("siklik-A1", 40), ("v1-A1", 11), ("v1-A2", 4)],
  kulak=dict(video=5, aday="Deutsch im Blick Kap. 5 (Feste und Feiertage): geçmişi anlatma", dk=80, durum=4),
  kapsam=[1, 3, 4, 6, 8, 9, 16, 20, 23], alan="geçmiş; hafta sonu; birleşik isimler")

W(no=7, yap="Doktora neremin ağrıdığını söylerim.",
  gorev="Eczanede bir şey isteyip nasıl kullanılacağını sorarım.",
  aileler=["saglik"], durum_tr="Dr. Weber'de muayene, Vils-Apotheke'de ilaç almak ve kullanımını sormak",
  kol=["radyo"], mekan="pl:apotheke", kol_tr="Kulak Salonu (radyo) açılır",
  kapi=("Dr. Weber'e neyin ne zamandan beri ağrıdığını anlatırsın.",
        "Eczacının talimatından ilacı günde kaç kez ve ne zaman alacağını söylersin.",
        {"not": "muayenede doktorun bir talimatını tekrarlamak da istenir"}),
  kota=[("ihtiyac:arzt", 12), ("senaryo", 5), ("siklik-A1", 24), ("v1-A2", 39)],
  kulak=dict(video=5, aday="Deutsch im Blick Kap. 7 (Gesundheit und Fitness)", dk=80, durum=4),
  kapsam=[1, 3, 4, 22], alan="sağlık: vücut, şikâyet, ilaç")

W(no=8, kapi_hafta=True, yap="Telefonda masa ayırtır, dükkânda ürün sorar, yeni biriyle tanışırım.",
  gorev="Markette aradığım bir ürünün nerede olduğunu Almanca sorarım.",
  aileler=["telefon", "saglik", "hizmet", "bag"], durum_tr="A1 tekrarı ve seviye sınavı",
  kol=["pazar"], mekan="pl:marktplatz", kol_tr="Köy haritasında A1 mekânları ışıklanır",
  kapi=(KAPI_SEVIYE,
        "Hiç duymadığın iki kısa kayıtta ana fikri ve bir ayrıntıyı söylersin.",
        {"durumlar": ["telefonda masa ayırtmak", "dükkânda ürün sormak", "yeni biriyle tanışmak"]}),
  kota=[("v1-A2", 15)],
  kulak=dict(video=3, aday="Deutsch im Blick Kap. 1–7: kullanılmamış kesitler", dk=70, durum=6),
  kapsam=[1, 4, 19, 24, 25], alan="eksik kalanlar; zayıf kartlar")

# A2: hafta, gramer birimi, a2 birimleri, metinler
A2P = [
 (9, "a2-01", ["telefon-1", "bag-2", "is-1"], "Telefonla doktordan randevu alırım.", "Bir muayenehaneyi ya da dükkânı arayıp randevu sorarım.",
  ["kafe", "telefon"], "pl:telefon", "Telefonda sana gelen ilk aramalar ve mola sohbeti açılır",
  ("Frau Huber'den randevu alırsın, istediğin saat doluysa başka bir saat bulursun.",
   "Hızlı bir mola sohbetinde kimin hafta sonu ne yaptığını söylersin.",
   {"surpriz": "istenen saat dolu"}),
  [3, 6], [], "Deutsch im Blick Kap. 5: hafta sonu ve kutlama", [10, 13, 14, 21], [("v1-A2", 18), ("siklik-A2", 27)], "telefon; mola"),
 (10, "a2-02", ["telefon-2", "bag-4", "okuma-2"], "Randevumu telefonla başka bir güne alırım.", "Bir randevumu ya da buluşmamı telefonla başka güne alırım.",
  ["kutuphane"], "pl:haus", "Okuma Salonu: apartman duyuruları",
  ("Randevunu telefonla başka güne alırsın, önerilen gün uymazsa yeni gün istersin.",
   "Sesli okunan bir apartman duyurusundan ne zaman ne olacağını söylersin.",
   {"surpriz": "önerilen gün de uymuyor"}),
  [4], [], "Deutsch im Blick Kap. 8: Wohnen", [13, 17], [("ihtiyac:wohnen", 7), ("v1-A2", 15), ("siklik-A2", 23)], "ev, komşu, randevu"),
 (11, "a2-03", ["hizmet-1", "hizmet-2"], "Kafede ve markette istediğimi kibarca söylerim.", "Kafede bir şey ısmarlayıp bir soru sorarım.",
  ["pazar"], "pl:marktplatz", "Pazar meydanı: alışveriş görevleri",
  ("Market kasasında kartın çalışmayınca başka bir ödeme yolu sorarsın.",
   "Market anonsundan hangi ürünün indirimde olduğunu söylersin.",
   {"surpriz": "kart çalışmıyor; kasada Pfand (depozito) soruluyor"}),
  [2], [], "Deutsch im Blick Kap. 4: Ausgehen", [13, 14], [("ihtiyac:einkaufen", 7), ("v1-A2", 15), ("siklik-A2", 23)], "alışveriş, kafe"),
 (12, "a2-07", ["saglik-1", "saglik-3"], "Doktora şikâyetimi ayrıntılı anlatırım.", "Eczanede nezleye karşı ne önerdiklerini sorarım.",
  ["radyo"], "pl:praxis", "Muayenehane derinleşir",
  ("Dr. Weber'in sorularına cevap verip şikâyetini ayrıntılı anlatırsın.",
   "Doktorun hızlı açıklamasından iki talimatı yakalayıp söylersin."),
  [7], [], "Deutsch im Blick Kap. 7: Gesundheit", [7, 13, 14], [("ihtiyac:arzt", 10), ("ihtiyac:notfall", 6), ("v1-A2", 12), ("siklik-A2", 17)], "sağlık; acil"),
 (13, "a2-04", ["saglik-2", "saglik-4", "is-3"], "Hasta olduğumu işe telefonla bildiririm.", "İş yerinde hastalığı kime ve nasıl bildireceğimi sorarım.",
  ["pazar"], "pl:apotheke", "Eczane ve iş yeri görevleri",
  ("Sabah işi arayıp hasta olduğunu ve raporu ne zaman getireceğini söylersin.",
   "Şefin sesli mesajından raporu ne zamana kadar getireceğini söylersin.",
   {"surpriz": "şef rapor ister", "not": "eczanedeki kullanım talimatından doğru seçeneği seçmek birim içinde"}),
  [12], [], "Deutsch im Blick Kap. 7 ve 8: sağlık, iş", [13, 14], [("ihtiyac:arbeit", 6), ("v1-A2", 12), ("siklik-A2", 27)], "iş, izin, eczane"),
 (14, "a2-05", ["resmi-1", "resmi-2"], "Bürgerbüro'da sıramın geldiğini ve gereken belgeleri anlarım.", "Bir resmî kurumun açılış saatini ve gereken belgeleri sorarım.",
  ["pazar"], "pl:buergerbuero", "Bürgerbüro açılır",
  ("Bürgerbüro'da işini anlatır, eksik bir belge için ne yapacağını sorarsın.",
   "Numara çağırma anonsunu ve memurun senden istediğini duyup söylersin.",
   {"surpriz": "bir belge eksik"}),
  [6], ["dn:kelime-ailesi-2"], "aranacak: Amt konusu Deutsch im Blick'te yok; DW Nicos Weg A2 (yalnız bağlantı, C)", [8, 13, 14], [("ihtiyac:amt", 18), ("v1-A2", 12), ("siklik-A2", 15)], "resmî işler, form"),
 (15, "a2-06", ["is-4", "bag-1"], "Geç kaldığımı ve neden geç kaldığımı söylerim.", "Bir gecikmeyi ya da hatayı birine Almanca açıklarım.",
  ["tiyatro"], "pl:firma", "Hikâye: iş yeri bölümleri",
  ("Toplantıya neden geç kaldığını üç kez, her seferinde daha kısa anlatırsın.",
   "Herr Wimmer'in hızlı talimatını dinleyip iki cümleyle özetlersin.",
   {"not": "akıcılık 4/3/2: aynı anlatım 4, 3, 2 dakikada (dn:akicilik-432)"}),
  [9], ["dn:akicilik-432"], "Deutsch im Blick Kap. 8: Karriere", [13, 14, 16, 22], [("v1-A2", 12), ("siklik-A2", 33)], "iş; geçmiş"),
 (16, "a2-08", ["bag-3", "telefon-4"], "Bir davete kibarca evet ya da hayır derim.", "Birini bir şeye davet eder ya da bir daveti kibarca reddederim.",
  ["telefon"], "pl:haus", "Telefon: Herr Pichler arar",
  ("Bir daveti kibarca reddeder, nedenini söyler ve başka bir gün önerirsin.",
   "Bir sesli mesajı dinleyip kim, ne zaman ve nerede sorularını cevaplarsın.",
   {"not": "kalorifer arızasını Herr Pichler'e telefonda anlatmak (telefon-4) birim içinde"}),
  [10], [], "Deutsch im Blick Kap. 4: davet ve buluşma", [10, 13, 14], [("siklik-A2", 45)], "davet; ev arızası"),
 (17, None, ["kulak-2", "kulak-4"], "Hızlı konuşanı durdurup yavaş söylemesini isterim.", "Anlamadığımda karşımdakinden yavaş ve tekrar söylemesini isterim.",
  ["radyo"], "pl:marktplatz", "Kulak Salonu'nda Bavyera ağzı bölümü açılır",
  ("Hızlı konuşan Frau Brandl'ı durdurup yavaş ve tekrar söylemesini istersin.",
   "Frau Brandl'ın Bavyera ağzıyla söylediği üç sözün anlamını söylersin.",
   {"not": "Bairisch sözler yalnız WORLD §5'ten (kaynaklı); hızlı konuşmada yutulan sesleri tam biçimiyle yazmak da ölçülür"}),
  [2, 5], ["dn:kisaltma-2", "dn:bairisch-1"], "Wikitongues Bairisch (CC BY-SA 4.0, A) + BR yapımları (yalnız bağlantı, C)", [1, 2, 15], [("siklik-A2", 5), ("k1_disi", 25)], "strateji; Bavyera sözleri"),
 (18, "a2-09", ["hizmet-3", "hizmet-4"], "Kuaförde ve spor salonunda ne istediğimi tarif ederim.", "Kuaförde ya da bir dükkânda ne istediğimi tarif ederim.",
  ["kafe"], "pl:friseur", "Kuaför ve spor salonu açılır",
  ("Kuaförde Luka'ya istediğin kesimi tarif edersin.",
   "Bir aletin kullanımını anlatan kayıttan adımları sırayla söylersin.",
   {"not": "koltukta Luka'nın sohbetine katılmak da istenir"}),
  [11], [], "Deutsch im Blick Kap. 7: Fitness", [7, 13, 14], [("ihtiyac:friseur", 5), ("ihtiyac:sport", 3), ("k1_disi", 37)], "kuaför, spor; sıfatlar"),
 (19, "a2-10", ["kulak-1", "okuma-1"], "İstasyonda gecikme anonsunu anlarım.", "Durakta ya da istasyonda bir anonsu dinleyip ne dediğini yazarım.",
  ["radyo"], "pl:bahnhof", "Tren istasyonu açılır",
  ("Tren iptal olunca istasyonda başka bir yolu sorarsın.",
   "Gürültülü bir anonsta peronu ve saati duyup söylersin.",
   {"not": "gecikmeyi kısa mesajla haber vermek (yazma) birim içinde"}),
  [17], [], "Deutsch im Blick Kap. 6: Reisen", [1, 13, 14, 17, 18], [("k1_disi", 45)], "yolculuk; kısa mesaj"),
 (20, "a2-12", ["telefon-3", "is-2"], "Bir şirketi aradığımda otomatik sesi anlayıp doğru tuşa basarım.", "Bir kurumu arayıp bir bilgiyi sorarım.",
  ["telefon"], "pl:telefon", "Telefonda sana gelen aramalar biraz zorlaşır",
  ("Bankayı arar, görevliye hesabınla ilgili bir bilgiyi sorarsın.",
   "Otomatik sesin söylediklerinden hangi tuşa basacağını seçersin.",
   {"not": "iş talimatını kibar bir soruyla netleştirmek (is-2) birim içinde"}),
  [9, 13], [], "aranacak: telefon menüsü kaydı (kendi seslendirmemiz ya da açık lisanslı)", [10, 13, 14], [("ihtiyac:bank", 6), ("k1_disi", 39)], "telefon menüsü; banka; iş"),
 (21, "a2-11", ["okuma-3", "resmi-3"], "Resmî bir mektubun benden ne istediğini anlarım.", "Posta kutuma gelen bir mektubun ne istediğini Almanca not ederim.",
  ["posta"], "pl:posta", "Posta kutusu açılır",
  ("Bir resmî mektubun senden ne istediğini ve son tarihini söylersin.",
   "Kuryenin sesli mesajından paketin nerede olduğunu söylersin.",
   {"not": "kargo bildirimi de okunur: ne, ne zamana kadar, nereye"}),
  [14], [], "aranacak: kargo ve posta (DW Nicos Weg A2, yalnız bağlantı, C)", [13, 14, 17], [("ihtiyac:post", 11), ("k1_disi", 34)], "posta, kargo, mektup"),
 (22, "a2-13", ["resmi-4", "okuma-4"], "Kısa bir e-postayla ek süre isterim.", "Birine kısa bir Almanca e-posta ya da mesaj yazarım.",
  ["kutuphane"], "pl:buergerbuero", "Okuma Salonu: yazma görevleri",
  ("Ek süre isteyen kısa bir e-posta yazar, telefonda nedenini söylersin.",
   "Bir hayat hikâyesi kaydında yılları sırayla söylersin."),
  [21], ["dn:kelime-ailesi-3"], "Deutsch im Blick Kap. 8: Karriere", [8, 13, 14, 18], [("k1_disi", 45)], "resmî yazı; iş e-postası"),
 (23, "a2-14", ["kulak-3"], "Bilmediğim bir kelimeyi tarif ederek anlatırım.", "Adını bilmediğim bir şeyi dükkânda tarif ederek isterim.",
  ["kafe"], "pl:marktplatz", "Sohbet Saati: serbest konuşma",
  ("Adını bilmediğin üç eşyayı Almanca tarif edersin.",
   "Bir planı anlatan sesli mesajı dinleyip kendi sözlerinle anlatırsın.",
   {"not": "gelecek haftanı anlatmak da istenir"}),
  [17], ["dn:relativ-basit"], "Deutsch im Blick Kap. 9 (Was ist Deutsch?)", [13, 14, 15, 16], [("k1_disi", 45)], "strateji; plan"),
]
A2KAPI = (24, "Habersiz gelen bir aramada, eczanede ve kayıp eşya bürosunda derdimi anlatırım.", "Bir mağazayı arayıp bir ürünün stokta olup olmadığını sorarım.",
  (KAPI_SEVIYE,
   "Hiç duymadığın bir anons ve sesli mesajda ana fikri ve iki ayrıntıyı söylersin.",
   {"durumlar": ["habersiz gelen arama", "eczanede beklenmedik soru", "kayıp eşya bürosunda kaybettiğin bir şeyi sormak"],
    "kayit_karsilastirma": "ilk haftaki 60 saniyelik kayıtla karşılaştırma (#56 madde 24)"}))

# B1: hafta, gramer birimi, konu numaraları, birimler, metinler
B1P = [
 (25, "b1-02", [1, 2, 5], ["bag-1", "kulak-1"], "Bir konuda ne düşündüğümü ve nedenini söylerim.", "Bir sohbette bir konu hakkındaki fikrimi Almanca söylerim.", ["gazete"], None, "Haber Odası açılır",
  ("Bir konuda katılıp katılmadığını ve nedenini söylersin.", "Sokak röportajında kimin ne düşündüğünü söylersin."), [16, 21]),
 (26, "b1-02", [3, 4], ["okuma-1"], "Kısa bir haberi okuyup iki cümleyle özetlerim.", "Okuduğum bir haberi birine iki cümleyle anlatırım.", ["gazete"], None, "Haber Odası: kısa haber",
  ("Kısa bir haberi okuyup iki cümleyle özetlersin.", "Aynı haberin sesli hâlinden iki ayrıntı söylersin."), [17]),
 (27, "b1-03", [1, 2, 3], ["saglik-1"], "Doktorun açıklamasını anlamadığımda ek soru sorarım.", "Eczanede bir ilacın ne işe yaradığını sorar, anlamadığım yeri tekrar sorarım.", ["radyo"], "pl:praxis", "Muayenehanede yeni konuşmalar",
  ("Dr. Weber bir tedaviyi açıklayınca anlamadığın iki şeyi sorarsın.", "Doktorun açıklamasından üç bilgiyi yakalayıp söylersin."), [12, 13]),
 (28, "b1-03", [4, 5], ["saglik-2"], "Uzman doktor için sevk ve randevu işini hallederim.", "Bir göz doktorunu arayıp yeni hasta alıp almadığını sorarım.", ["telefon"], "pl:telefon", "Telefon: uzman randevusu",
  ("Uzman doktoru arar, ilk boş gün çok uzaksa daha erken bir gün istersin.", "Bir muayenehanenin sesli mesajından ne zaman açık olduğunu söylersin.",
   {"surpriz": "ilk boş gün çok uzak"}), [10, 12]),
 (29, "b1-04", [1, 2, 3], ["telefon-1"], "Bir sorunu telefonda baştan sona çözerim.", "Belediyeyi arayıp eski bir eşyayı nasıl atacağımı sorarım.", ["telefon"], "pl:telefon", "Telefonda sana gelen aramalar daha da zorlaşır",
  ("Bir faturadaki hatayı telefonda anlatır, çözüm için ne yapılacağını sorarsın.", "Hızlı konuşan bir çağrı merkezi görevlisinden ne yapman gerektiğini söylersin.",
   {"surpriz": "iki beklenmedik gelişme"}), [10, 13]),
 (30, "b1-04", [4, 5], ["is-1"], "İzin, vardiya ve fazla mesaiyi konuşurum.", "Bir iş arkadaşıma gelecek hafta hangi vardiyada çalıştığını sorarım.", ["kafe"], "pl:firma", "İş yerinde yeni konuşmalar",
  ("Şefinden izin ister, istediğin gün olmazsa başka bir gün önerirsin.", "Bir ekip toplantısı kaydından tarihleri yakalayıp söylersin."), [13, 21]),
 (31, "b1-07", [2, 4], ["resmi-4"], "Kira ve yan giderlerle ilgili bir soruyu sorarım.", "Ev sahibine ya da yönetime yazılı bir soru sorarım.", ["posta"], "pl:haus", "Posta kutusu: kira yazışmaları",
  ("Yan gider yazısını okuyup anlamadığın bir şeyi telefonla sorarsın.", "Yan giderleri anlatan bir kayıttan ne kadar ödeyeceğini söylersin."), [17, 18]),
 (32, "b1-07", [3, 5], ["kulak-3"], "Bavyera ağzıyla konuşan komşumun derdini genel olarak anlarım.", "Bir komşuyla ev kuralları ya da küçük bir sorun hakkında konuşurum.", ["radyo"], "pl:haus", "Kulak Salonu'nda Bavyera ağzının ikinci bölümü açılır",
  ("Bir komşuyla gürültü gibi küçük bir sorunu sakin bir dille konuşursun.", "Bavyera ağzıyla konuşan birinin kısa kaydından ana fikri söylersin.",
   {"not": "Bairisch kayıt yalnız kaynaklı (KAYNAKLAR §7)"}), [2, 21]),
 (33, "b1-10", [1, 5, 3], ["telefon-2", "resmi-1"], "Telefonda kısa ve net bir mesaj bırakırım.", "Birine telefonda ya da sesli mesajla bir haber bırakırım.", ["telefon"], "pl:telefon", "Telefon: mesaj bırakma",
  ("Sesli mesaja kim olduğunu, ne istediğini ve numaranı bırakırsın.", "İki sesli mesajı dinleyip aralarındaki farkı söylersin.",
   {"not": "duyduğun bir mesajı başkasına aktarmak da istenir"}), [10, 18]),
 (34, "b1-10", [4], ["okuma-2"], "Resmî bir e-posta yazarım.", "Bir kuruma kısa ve resmî bir e-posta yazarım.", ["kutuphane"], "pl:buergerbuero", "Okuma Salonu: resmî yazı",
  ("Bir kuruma resmî bir e-posta yazar, sonra telefonda gelip gelmediğini sorarsın.", "Memurun telefondaki cevabından ne yapman gerektiğini söylersin."), [18]),
 (35, "b1-05", [4, 5, 1], ["is-3"], "Bir iş görüşmesinde kendimi anlatırım.", "Bir ilanı okuyup ilan verene bir soru sorarım.", ["kutuphane"], "pl:firma", "İlanlar",
  ("Bir iş görüşmesinde kendini ve deneyimini iki dakika anlatırsın.", "Görüşmecinin sorularını dinleyip neyi sorduğunu söylersin."), [13, 22]),
 (36, "b1-05", [2, 3], ["kulak-2"], "Radyo haberinin konusunu ve ana bilgisini anlarım.", "Radyoda bir haberi dinleyip konusunu birine söylerim.", ["radyo"], None, "Kulak Salonu: haber",
  ("Dinlediğin bir radyo haberini birine iki cümleyle anlatırsın.", "İki kısa haberde ana fikri ve birer ayrıntıyı söylersin."), [1, 16]),
 (37, "b1-06", [5, 1, 2], ["hizmet-1"], "Bozuk bir ürünü iade eder, şikâyetimi söylerim.", "Bir dükkânda bir ürünü değiştirmeyi ya da iadeyi sorarım.", ["pazar"], "pl:marktplatz", "Gerçek Görevler: iade",
  ("Fişin olmadan bozuk bir ürünü dükkâna iade etmeye çalışırsın.", "Satıcının anlattığı iade koşullarını söylersin.",
   {"surpriz": "fiş yok"}), [13, 14]),
 (38, "b1-06", [3, 4], ["hizmet-2"], "Bir işi ustaya ya da tamirhaneye yaptırırım.", "Bir tamir ya da hizmet için fiyat ve süre sorarım.", ["pazar"], None, "Hizmetler: tamirhane",
  ("Tamirhanede sorunu anlatır, fiyatı ve ne zaman biteceğini sorarsın.", "Ustanın açıklamasından neyin bozuk olduğunu söylersin."), [13, 14]),
 (39, "b1-09", [5, 1, 2], ["hizmet-4"], "Teknik bir sorunu adım adım anlatırım.", "Bir telefon dükkânında hangi kablonun telefonuma uyduğunu sorarım.", ["telefon"], None, "Telefon: teknik destek",
  ("Teknik desteği arayıp internetin çalışmadığını adım adım anlatırsın.", "Telefondaki adım adım talimatı dinleyip sırayla uygularsın."), [10, 13]),
 (40, "b1-09", [4, 3], ["okuma-4"], "Bir kullanım talimatını okuyup uygularım.", "Almanca bir talimatı okuyup bir şeyi kurarım ya da ayarlarım.", ["kutuphane"], None, "Okuma Salonu: talimat",
  ("Bir kullanım talimatını okuyup adımları sırayla anlatırsın.", "Sesli bir talimatı dinleyip kendi sözlerinle yeniden anlatırsın."), [8, 17]),
 (41, "b1-01", [1, 2, 5], ["bag-2"], "Başımdan geçen bir olayı sırasıyla anlatırım.", "Başımdan geçen bir olayı birine Almanca anlatırım.", ["tiyatro"], None, "Hikâye: dedektif dizisi",
  ("Başından geçen bir olayı üç kez, her seferinde daha kısa anlatırsın.", "Hikâyenin yeni bölümünü dinleyip kendi sözlerinle anlatırsın.",
   {"not": "akıcılık 4/3/2 (dn:akicilik-432)"}), [16, 20]),
 (42, "b1-01", [3, 4], ["saglik-3"], "Acil bir durumda ne olduğunu anlatırım.", "En yakın nöbetçi eczaneyi Almanca bir sayfadan bulurum.", ["radyo"], "pl:apotheke", "Acil durum alıştırmaları",
  ("Canlandırılan bir acil aramada ne olduğunu ve adresini söylersin.", "Acil hattı görevlisinin sorduğu soruları sırayla söylersin.",
   {"not": "simülasyon; gerçek acil hat aratılmaz"}), [10, 13]),
 (43, "b1-08", [5, 1, 2], ["bag-3"], "Bir anlaşmazlığı sakin bir dille konuşurum.", "Bir arkadaşıma ya da komşuma yardım teklif ederim.", ["kafe"], None, "Sohbet Saati: zor konuşmalar",
  ("Bir arkadaşınla bir anlaşmazlığı sakin bir dille konuşursun.", "İki kişinin konuşmasından kimin ne düşündüğünü söylersin."), [21]),
 (44, "b1-08", [3, 4], ["resmi-2"], "Bir karara yazılı olarak itiraz ederim.", "Bir kuruma ya da şirkete kısa bir itiraz yazısı hazırlarım.", ["posta"], "pl:posta", "Posta kutusu: kararlar",
  ("Bir karara kısa bir itiraz yazar, telefonda nedenini anlatırsın.", "Memurun açıklamasından itirazının ne olacağını söylersin."), [18]),
 (45, "b1-12", [4, 3, 1], ["hizmet-3", "saglik-4"], "İki teklifi karşılaştırıp hangisini seçtiğimi söylerim.", "İki ürünün ya da tarifenin farkını bir satıcıya sorarım.", ["pazar"], None, "Hizmetler: karşılaştırma",
  ("İki teklifi karşılaştırır, hangisini neden seçtiğini söylersin.", "Satıcının hızlı anlatımından iki teklifin farkını söylersin."), [13, 14]),
 (46, "b1-12", [2, 5], ["telefon-3"], "Bir aboneliği telefonla sorar ya da iptal ederim.", "Bir sözleşme ya da abonelik hakkında telefonla bilgi alırım.", ["telefon"], "pl:telefon", "Telefon: sözleşmeler",
  ("Bir aboneliği telefonla iptal eder, yeni bir teklifi kibarca geri çevirirsin.", "Sözleşme koşullarından iptal süresini yakalayıp söylersin.",
   {"surpriz": "karşı teklif"}), [10]),
 (47, "b1-11", [5, 2, 3], ["bag-4", "is-2"], "Toplantıda kısa bir durum özeti veririm.", "Bir iş arkadaşıma dünkü işimi üç cümleyle özetlerim.", ["kafe"], "pl:firma", "İş yeri: toplantı",
  ("Toplantıda iki dakikalık bir özet verir, bir soruya cevap verirsin.", "Bir toplantı kaydından alınan kararları söylersin."), [16]),
 (48, "b1-11", [4, 1], ["okuma-3"], "Bir ilana ya da yazıya kısa bir yorum yazarım.", "Bir ilana ya da gönderiye Almanca kısa bir yorum yazarım.", ["gazete"], None, "Haber Odası: yorum",
  ("Bir ilana yorum yazar, fikrini birine sözlü olarak savunursun.", "Bir tartışma kaydında iki görüşü ayırıp söylersin."), [17, 18]),
 (49, "b1-13", [1, 2, 3, 4, 5], ["is-4", "resmi-3"], "Bir sorunu şefe bir çözüm önerisiyle anlatırım.", "Bankada kartımın yurt dışında çalışıp çalışmadığını sorarım.", ["pazar"], "pl:firma", "Gerçek Görevler: sorun çözme",
  ("Şefe iş yerindeki bir sorunu anlatır, bir çözüm önerirsin.", "Şefin cevabındaki koşulu yakalayıp söylersin."), [13, 14]),
 (50, "b1-14", [1, 2, 3], ["telefon-4", "kulak-4"], "Hazırlıksız gelen bir aramada işimi hallederim.", "Hiç hazırlanmadan bir yeri arayıp bir bilgiyi Almanca sorarım.", ["telefon"], "pl:telefon", "Telefon artık habersiz de çalar",
  ("Beklemediğin bir anda gelen aramayı açıp işini halledersin.", "Bir sesli mesaj ve bir anonstan birer ayrıntı yakalayıp söylersin."), [10, 15]),
]

# Haftaların elle seçilmiş dil noktası önkoşulları (birim gramer eşlemesine ek)
REQ_DN = {
 2: ["r0:08-sein-haben", "r0:04-zahlen-21-100", "r0:11-praesens"], 4: ["r0:03-zahlen-0-20", "r0:08-sein-haben", "gr:a1-04:t1"], 5: ["r0:05-uhrzeit", "gr:a1-05:t3"],
 6: ["r0:08-sein-haben", "gr:a1-05:t4"], 7: ["r0:09-modalverben", "gr:a1-06:t1"],
 8: ["r0:11-praesens", "gr:a1-02:t3", "gr:a1-03:t5", "gr:a1-12:t2", "gr:a1-12:t5", "gr:a1-11:t1"],
 9: ["gr:a1-07:t2", "gr:a2-01:t1", "gr:a1-12:t1"], 10: ["gr:a1-11:t1"], 11: ["gr:a1-12:t2", "gr:a1-06:t1"], 12: ["gr:a1-10:t1", "gr:a1-13:t4"],
 13: ["gr:a2-01:t4"], 14: ["dn:kelime-ailesi-1", "gr:a1-05:t4", "gr:a1-09:t5"], 15: ["dn:yeniden-anlatma", "gr:a1-08:t3"],
 16: ["gr:a2-03:t4"], 17: ["dn:kisaltma-1", "gr:a1-12:t1"], 18: ["gr:a1-13:t2"], 19: ["gr:a2-02:t1"], 20: ["gr:a2-04:t1"],
 21: ["gr:a2-07:t3"], 22: ["dn:kelime-ailesi-2", "gr:a2-06:t1"], 23: ["gr:a2-08:t1"],
 24: ["gr:a1-12:t5", "gr:a2-12:t1", "gr:a2-07:t3", "gr:a2-09:t2", "dn:relativ-basit"],
 25: ["dn:relativ-basit", "gr:a2-04:t2"], 26: ["gr:b1-02:t1"], 27: ["gr:a2-14:t4"], 28: ["gr:b1-03:t1"],
 29: ["gr:a2-05:t3"], 30: ["gr:b1-04:t1"], 31: ["gr:a2-11:t3"], 32: ["gr:a2-11:t3", "dn:bairisch-1"],
 33: ["gr:a2-04:t1"], 34: ["gr:b1-10:t1"], 35: ["gr:a2-14:t1"], 36: ["gr:b1-05:t1", "gr:b1-10:t1"], 37: ["gr:b1-05:t1", "gr:a2-13:t1"],
 38: ["gr:b1-06:t1"], 39: ["gr:a2-08:t2", "gr:a1-07:t2"], 40: ["gr:b1-09:t1", "gr:b1-09:t2", "dn:kelime-ailesi-3"], 41: ["gr:a2-13:t2", "gr:a2-01:t1"],
 42: ["gr:b1-01:t1"], 43: ["gr:a2-09:t1"], 44: ["gr:b1-08:t1"], 45: ["gr:a2-13:t3"], 46: ["gr:b1-12:t1"],
 47: ["dn:kelime-ailesi-3"], 48: ["gr:b1-11:t2"], 49: ["gr:b1-02:t1"], 50: ["gr:b1-05:t1", "gr:b1-02:t1", "gr:a2-08:t1"],
 52: ["gr:b1-04:t1", "gr:b1-02:t5", "gr:b1-11:t4", "gr:b1-06:t5", "gr:a2-12:t1"],
}

# ---------- yardımcılar ----------
def ay(no):
    s = [4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5]
    t = 0
    for i, n in enumerate(s):
        t += n
        if no <= t:
            return i + 1

def tas(no): return "M1" if no == 1 else "M2" if no <= 8 else "M3" if no <= 24 else "M4"
def seviye(no): return "A1" if no <= 8 else "A2" if no <= 24 else "B1"

DAKIKA = {"r0": 20, "gr": 15, "dn": 10}
def dil_dk(ids, no):
    t = 0
    for i in ids:
        if i.startswith("dn:kal-"):
            t += 5
        else:
            t += DAKIKA[i.split(":")[0]]
    return t

TEKRAR = {"A1": 105, "A2": 140, "B1": 140}
OKUYAZ = {"A1": 60, "A2": 70, "B1": 90}

out_h, gunler = [], []
birikim = len(m1c)
tanit = {}  # dil noktası → ilk tanıtıldığı hafta
yuklendi = set()

def hafta(no, yap, gorev, dn, aileler, birimler, durum_tr, kol, mekan, kol_tr, kapi, req_h, req_dn,
          kota, kulak, kapsam, alan, seviye_kapisi=False):
    global birikim
    lv = seviye(no)
    if no == 1:
        yeni, ozet, disi = len(m1c), [{"grup": "m1.json yeni_kartlar", "sira": [min(SIRA[c] for c in m1c if c in SIRA), max(SIRA[c] for c in m1c if c in SIRA)], "adet": len(m1c)}], 0
        kartlar = []
    else:
        kartlar, ozet, disi = al(kota)
        if no == 2:
            k1g = [c for c in GUN8 if c in SIRA]
            ozet = [{"grup": "öne çekilen küçük sözcükler (gün 8)", "sira": [min(SIRA[c] for c in k1g), max(SIRA[c] for c in k1g)], "adet": len(k1g)}] + ozet
            disi += 2
            kartlar = k1g + kartlar
        yeni = len(kartlar) + disi
        birikim += yeni
    if no == 1:
        birikim = len(m1c)
    for i in dn:
        tanit.setdefault(i, no)
    # requires: önceki hafta + ekler; dil noktaları: birimlerin gramer etiketleri + ekler (yalnız önce tanıtılanlar)
    rh = sorted(set(([no - 1] if no > 1 else []) + req_h))
    rdn = list(req_dn)
    for b in birimler:
        u = A2U.get(b)
        if u:
            for g in u["requires"].get("gramer", []):
                m = GR_MAP[g]
                if m not in dn and m not in rdn:
                    rdn.append(m)
    sure = {"kelime": round(yeni * 1.2), "tekrar": 70 if no == 1 else TEKRAR[lv], "dil": dil_dk(dn, no),
            "kulak": kulak["dk"], "konusma": kulak["durum"] * 12, "oku_yaz": OKUYAZ[lv], "kapi": 30}
    if seviye_kapisi:
        sure["pekistirme"] = 150
    h = {
        "no": no, "ay": ay(no), "seviye": lv, "tas": tas(no),
        "yapabiliyorum_tr": yap, "gorev_tr": gorev,
        "dil_noktalari": dn,
        "kelime": {"k1_aralik": ozet, "k1_disi": disi, "alan": alan, "planlanan_yeni": yeni, "birikimli": birikim},
        "durum": {"aileler": aileler, "birimler": birimler, "tr": durum_tr},
        "kulak": {"video_adet": kulak["video"], "video_kaynak": kulak.get("kaynak", "aranacak"), "video_aday": kulak["aday"],
                  "dinleme_dk": kulak["dk"], "durum_adet": kulak["durum"]},
        "kol_mekan": {"kollar": kol, "mekan": mekan, "tr": kol_tr},
        "kapi_tr": kapi[0],
        "kulak_kapi_tr": kapi[1],
        **({"kapi_ek": kapi[2]} if len(kapi) > 2 else {}),
        "seviye_kapisi": seviye_kapisi,
        "requires": {"haftalar": rh, "dil_noktalari": rdn},
        "kapsam_56": sorted(set(kapsam) | {1, 3, 4, 11, 12, 14, 25} | ({5} if lv == "A1" else set())),
        "sure_dk": sure,
        "tahmini_dk": sum(sure.values()),
    }
    out_h.append(h)
    return h, kartlar, disi

def birlestir(basliklar):
    """Birim başlıklarını öğrenciye gösterilebilir tek metne çevirir (noktalı virgül yok)."""
    return ". ".join(basliklar)

A2J = J("content/v2/curriculum/a2.json")
A2S = {u["id"].split(":")[-1]: u for u in A2J["units"]}
A2U = {u["id"]: u for u in A2J["units"]}

# Hafta 1 ve günleri 1–7
w = H[0]
hafta(1, w["yap"], w["gorev"], w["dn"], w["aileler"], w["birimler"], w["durum_tr"], w["kol"], w["mekan"], w["kol_tr"],
      w["kapi"], [], [], None, w["kulak"], w["kapsam"], w["alan"])
for g in m1["gunler"]:
    d = {"day": g["day"], "id": g["id"], "title_tr": g["title_tr"], "dersler": g["dersler"], "can_do": g["can_do"],
         "kelime": {"adet": len(g["yeni_kartlar"]), "kaynak": "m1.json yeni_kartlar"}}
    if g["day"] == m1["ek_ders"]["day"]:
        d["ek_ders"] = m1["ek_ders"]
    gunler.append(d)

# Haftalar 2–8 ve günleri
for w in H[1:]:
    no = w["no"]
    gl = A1G[no]
    dn = [x for _, ds in gl for x in ds]
    h, kartlar, disi = hafta(no, w["yap"], w["gorev"], dn, w["aileler"], [], w["durum_tr"], w["kol"], w["mekan"], w["kol_tr"],
                             w["kapi"], w.get("req_h", []), w.get("req_dn", []) + REQ_DN.get(no, []), w["kota"], w["kulak"], w["kapsam"], w["alan"],
                             seviye_kapisi=w.get("kapi_hafta", False))
    h["kelime"]["planlanan_yeni"] = len(kartlar) + disi
    # günlere dağıt
    ag = AG_KAPI if w.get("kapi_hafta") else AG
    n = len(kartlar) + disi
    pay = [n * a // sum(ag) for a in ag]
    i = 0
    while sum(pay) < n:
        pay[i % 6] += 1; i += 1
    liste = kartlar + (["lx:Euro", "lx:Cent"] if no == 2 else [])
    if no == 2:  # gün 8 = küçük sözcükler + Euro/Cent (PM kararı)
        liste = GUN8 + kartlar[len([c for c in GUN8 if c in SIRA]):]
        pay[0] = len(GUN8); rest = n - pay[0]
        ag2 = AG[1:]; pay[1:] = [rest * a // sum(ag2) for a in ag2]
        j = 1
        while sum(pay) < n:
            pay[j] += 1; j = j + 1 if j < 5 else 1
    pos = 0
    for k, (title, ds) in enumerate(gl):
        day = (no - 1) * 7 + k + 1
        parca = liste[pos:pos + pay[k]]; pos += pay[k]
        k1p = [c for c in parca if c in SIRA]
        kel = {"adet": pay[k]}
        if k1p:
            kel["k1_aralik"] = [min(SIRA[c] for c in k1p), max(SIRA[c] for c in k1p)]
        if no == 2 and k == 0:
            kel["kartlar"] = parca
            kel["not_tr"] = ("PM kararı 3 ve F2: Euro, Cent, noch, schon, nur, gern, dann, oft, sehr 4.–6. günün kartlarıdır (pm_kararlari[].hedef); "
                             "m1.json eki o günün halka PR'ıyla gelir, o zamana kadar burada durur. Listede olmayan 13 küçük sözcük 8. günde kalır. "
                             "lx:Euro ve lx:Cent kartı yok (lex işi).")
        gunler.append({"day": day, "id": f"om:gun:{day:02d}", "title_tr": title, "dersler": ds, "kelime": kel})

# A2 haftaları 9–23
for (no, gu, bir, yap, gorev, kol, mekan, kol_tr, kapi, req_h, ek_dn, aday, kapsam, kota, alan) in A2P:
    dn = ([x for x in gr(gu, range(1, 6)) if x in GR_ALL and x not in tanit] if gu else []) + ek_dn
    fam = sorted({A2S[b]["family"] for b in bir})
    k = dict(video=7 if no == 17 else 5, aday=aday, dk=180 if no == 17 else 140, durum=5)
    hafta(no, yap, gorev, dn, fam, [A2S[b]["id"] for b in bir], birlestir([A2S[b]["title_tr"] for b in bir]), kol, mekan, kol_tr,
          kapi, req_h, REQ_DN.get(no, []), kota, k, kapsam, alan)
no, yap, gorev, kapi = A2KAPI
hafta(no, yap, gorev, [], ["telefon", "saglik", "resmi", "is", "hizmet", "bag", "kulak", "okuma"], [], "A2 tekrarı ve seviye sınavı",
      ["pazar"], "pl:marktplatz", "Köy haritasında A2 mekânları ışıklanır", kapi, [], REQ_DN[24], [("k1_disi", 15)],
      dict(video=3, aday="Deutsch im Blick: kullanılmamış A2 kesitleri", dk=120, durum=6), [9, 19, 24, 25], "eksik kalanlar; zayıf kartlar",
      seviye_kapisi=True)

# B1 haftaları 25–50: siklik-B1 her hafta 20 (bitene kadar) + K1 dışı B1 alan kartları
for (no, gu, ts, bir, yap, gorev, kol, mekan, kol_tr, kapi, kapsam) in B1P:
    kalan = len(pools["siklik-B1"])
    s = min(20, kalan)
    kota = ([("siklik-B1", s)] if s else []) + [("k1_disi", 40 - s)]
    k = dict(video=6, aday="aranacak: Easy German ve DW Nicos Weg B1 (yalnız bağlantı, C); YouTube CC (video başına kayıt)", dk=180, durum=5)
    ek = ["dn:bairisch-2"] if no == 32 else ["gr:b1-10:t2"] if no == 36 else ["dn:kelime-ailesi-4"] if no == 40 else []
    if no == 32:  # Bairisch haftası: kulak kaynağı Bairisch olmalı (dilbilimci)
        k["aday"] = "Wikitongues Bairisch (CC BY-SA 4.0, A; tek kayıt) + BR yapımları (yalnız bağlantı, C); başka açık lisanslı Bairisch ses kaydı aranacak. MaiBaam yalnız yazılıdır, ses değildir."
    hafta(no, yap, gorev, gr(gu, ts) + ek, sorted({b.split("-")[0] for b in bir}), [f"u:b1:{b}" for b in bir],
          birlestir([dict(B1U)[b] for b in bir]), kol, mekan, kol_tr, kapi, [], REQ_DN.get(no, []), kota, k, sorted(set([1, 3, 4, 13, 14] + kapsam)),
          "sık sözcük B1 + birimin alanı" if s else "B1 alan kartları (K1 dışı)")
hafta(51, "Dört bölümlü bir B1 deneme sınavını süre içinde bitiririm.", "Bir tanıdıkla on dakika hiç Türkçe ya da İngilizce kullanmadan konuşurum.",
      gr("b1-14", [4, 5]) + ["dn:sinav-provasi"], ["okuma", "kulak", "bag"], [], "B1 deneme sınavı: dinleme, okuma, yazma ve konuşma",
      ["atolye"], "pl:sprachkurs", "Atölye: deneme sınavı",
      ("Deneme sınavının konuşma bölümünü süre içinde yaparsın.",
       "Deneme sınavının dinleme bölümünü süre içinde yaparsın.",
       {"not": "okuma ve yazma bölümleri de süreli; dinleme bölümü puanı kaydedilir"}),
      [], ["gr:b1-14:t1"], [("k1_disi", 10)], dict(video=4, aday="aranacak: sınav biçiminde dinleme (kendi seslendirmemiz)", dk=180, durum=4),
      [1, 17, 18, 19], "eksik kalanlar")
hafta(52, "Telefonda bir sorunu çözer, toplantıda fikrimi savunur, yüz yüze şikâyet ederim.", "Aynı hizmet için üç yeri arayıp fiyatları karşılaştırırım.",
      [], ["telefon", "saglik", "resmi", "is", "hizmet", "bag", "kulak", "okuma"], [], "B1 tekrarı ve seviye sınavı",
      ["pazar"], "pl:marktplatz", "Köy haritasında B1 mekânları ışıklanır",
      (KAPI_SEVIYE,
       "Hiç duymadığın bir sohbetten ve Bavyera ağzıyla bir kayıttan ana fikri söylersin.",
       {"durumlar": ["telefonda bir sorunu çözmek", "toplantıda fikir savunmak", "yüz yüze bir şikâyeti çözmek"],
        "kayit_karsilastirma": "bir yıl önceki (1. hafta) kayıtla karşılaştırma (#56 madde 24)",
        "not": "Bairisch kayıt yalnız kaynaklı; ana fikir ve ayrıntı ölçülür"}),
      [], REQ_DN[52], [("k1_disi", 5)], dict(video=4, aday="aranacak: kapı için görülmemiş doğal kayıt", dk=150, durum=6),
      [1, 19, 24, 25], "eksik kalanlar", seviye_kapisi=True)

# Hafta 8'i seviye kapısı olarak işaretle (hafta() çağrısı yukarıda)
k1_bitis = None
kalan_k1 = sum(len(v) for v in pools.values())
assert kalan_k1 == 0, {k: len(v) for k, v in pools.items() if v}

# K1 nerede bitiyor: siklik-B1'in son haftası
for h in out_h:
    if any(z["grup"] == "siklik-B1" for z in h["kelime"]["k1_aralik"]):
        k1_bitis = h["no"]

GR_IDS = {g["id"] for g in J("content/v2/registry/grammar.json")}

# PM kararları (PM 7043400862, 7046461200, 7049695521 F1–F4). hedef: gün → kartlar (halka PR'ları buradan okur).
F2_HEDEF = {"4": ["lx:Euro", "lx:Cent", "lx:noch"], "5": ["lx:schon", "lx:nur", "lx:gern", "lx:dann"], "6": ["lx:oft", "lx:sehr"]}
F2_KOSUL = ("Ekleme, silme değil. O günün halka denetimi (K1–K10) ve 100 dk tahmini tutmalı; tutmazsa taşan sözcük 8. güne gider. "
            "m1.json eki o günün halka PR'ıyla gelir.")
PM_KARARLARI = [
 {"karar": "Seviye dilimleri: 1. hafta İlk Hafta, A1 2–8, A2 9–24, B1 25–52; 8., 24. ve 52. hafta pekiştirme ve seviye sınavı",
  "kaynak": "PM 7049695521 F1", "yer": {"seviye_dilimleri": True},
  "not_tr": "Karar: dilimler onaylandı. #56 (YOL_HARITASI) ile çelişki yok: M3 A2'nin tamamı, M4 B1'in tamamı, hedef 6 ayda dışarıda rahat konuşmak. Kapıdan geçiş hafta sayısıyla değil beceriyle olur; geride kalan öğrenciyi planlayıcı kaydırır."},
 {"karar": "Küçük sözcükler kart olarak öne (noch, schon, nur, da, dann, gern, sehr, oft, leider, wann, Uhr, Termin)",
  "kaynak": "PM 7043400862 karar 3; PM 7049695521 F2",
  "yer": {"hafta": 1, "gunler": [4, 5, 6], "simdilik": {"hafta": 2, "gun": 8}},
  "hedef": {g: [c for c in v if c not in ("lx:Euro", "lx:Cent")] for g, v in F2_HEDEF.items()},
  "kosul_tr": F2_KOSUL,
  "not_tr": ("Karar: 4. gün noch, 5. gün schon, nur, gern, dann, 6. gün oft, sehr. Gerekçe: C ölçümünde cümle kapısını tıkayan bunlardı, ilk hafta doğal cümle onlarsız kurulmuyor. "
             "da, leider, wann, Uhr, Termin zaten m1.json'da (2. ve 5. gün). Listede olmayan en çok tıkayan 13 küçük sözcük "
             "(lange, erst, viel, gleich, echt, Zeit, gut, klar, kurz, immer, jetzt, mehr, ganz) 8. günde ve sonrasında. "
             "Halka PR'ları gelene kadar yedisi omurgada 8. günde durur, çünkü 1.–7. gün m1.json ile birebir.")},
 {"karar": "Euro ve Cent", "kaynak": "PM 7043400862 karar 3; PM 7049695521 F2 ve F3",
  "yer": {"hafta": 1, "gun": 4, "simdilik": {"hafta": 2, "gun": 8}},
  "hedef": {"4": ["lx:Euro", "lx:Cent"]}, "kosul_tr": F2_KOSUL,
  "not_tr": "Karar: 4. gün (Fiyat ve yaş). Kartları yok; K1 dışı kartlarda lex önce Euro ve Cent'i yazar (F3). Kart ve 4. günün halka PR'ı gelene kadar omurgada 8. günde."},
 {"karar": "K1 dışı kartlar (17. haftadan sonra A2'de 285, B1'de yaklaşık 900)", "kaynak": "PM 7049695521 F3; PM-079 md. 9",
  "yer": {"hafta_bas": 17},
  "not_tr": "Karar: sıraya girer, şimdi değil. Önce Euro ve Cent; genişletme 2.–7. gün halkalarından sonra. Seçim yalnız sıklıktan değil, A2 durum ailelerinin ihtiyaç listesinden."},
 {"karar": "Omurgayı içerik doğrulayıcısına ekleme (şema isteği)", "kaynak": "PM 7049695521 F4",
  "yer": {"arac": "docs/v2/reviews/omurga/denetim.py"},
  "not_tr": "Karar: sonra. PM taslağı okuyup alanlar durulunca; o zamana kadar denetim.py yeter. Baş geliştiricinin önünde AK-10 var."},
 {"karar": "am + gün kalıbı", "kaynak": "PM 7046461200", "yer": {"hafta": 1, "gun": 2, "kural": {"hafta": 3, "gun": 18, "dil_noktasi": "gr:a1-05:t3"}},
  "not_tr": "Kalıp 2. gün halkasında 'am … – im …' olarak (halka önerisi); kuralı 18. günde (Ne zaman? um, am, im)."},
 {"karar": "Alles Gute zum Geburtstag", "kaynak": "PM 7043400862 karar 2", "yer": {"hafta": 1, "gun": 2, "genisleme": {"hafta": 5, "gun": 33, "dil_noktasi": "gr:a1-14:t5"}},
  "not_tr": "2. gün provasından önce halkada kalıp olarak öğretilir; tebrikler 33. günde genişler."},
 {"karar": "Konuşma kısaltmaları (hab, komm, geh, 's, 'n)", "kaynak": "PM 7043400862; LS-8.3", "yer": {"hafta": 2, "gun": 13, "ikinci": {"hafta": 17}},
  "not_tr": "Mikro ders 1 13. günde (fiil sonları 2. günde, sein ve haben 7. günde öğretildikten sonra); mikro ders 2 17. haftada."},
 {"karar": "#56'nın dört eksiği (sesli kurma, kelime ailesi, kaydet-dinle, yeniden anlatma)", "kaynak": "#56 Ek",
  "yer": {"hafta": 6, "gunler": [37, 38, 40, 41]}, "not_tr": "Dördü 6. haftada açılır, sonra kollarda sürer: kelime ailesi 2–4 (hafta 14, 22, 40), yeniden anlatma her hafta kapısında."},
]

doc = {
 "schema": 1,
 "review": {"status": "draft"},
 "note_tr": ("52 haftalık omurga taslağı (PM-078 D, PM-079 md. 9: yalnız plan). Omurga bir SIRADIR, takvim değildir: 'hafta' içerik birimidir; "
             "öğrenci geride kalırsa planlayıcı kaydırır; kapıdan geçiş hafta sayısıyla değil beceriyle olur (PM 7049695521 F1). Küçük sözcükler (noch, schon, nur, gern, dann, oft, sehr) ve Euro, Cent PM kararıyla 4.–6. güne girer; m1.json eki o günlerin halka PR'ıyla gelir, o zamana kadar burada 8. günde (F2). 'ay' içerik ayıdır (≈4,3 hafta). Mevsim ve gerçek takvim içeriği (Advent, Silvester, Fasching, "
             "Ostern, Maibaum, Dult …) haftaya değil tarihe bağlı koldan gelir (WORLD §6, cal:*); takvim kartları bu yüzden haftalık kelime planında yok "
             "(takvim_kolu_kartlari). 1.–7. gün m1.json ve m1/gun-0N.json ile birebir (dersler, başlık, kart sayısı); 2.–8. hafta gün gün yalnız başlık, ders ve kelime aralığı; 9. haftadan sonrası "
             "hafta düzeyinde. Kart sayıları sözlük kartıdır; birimlerin kalıp ve ifadeleri (birim başına 8–12) ayrıca sayılır. Ayrıntı 4 hafta önden yazılır. "
             "Öğrenciye gösterilebilir alanlar: yapabiliyorum_tr, gorev_tr, kapi_tr (konuşma sınavı), kulak_kapi_tr (dinleme sınavı), durum.tr, kol_mekan.tr, "
             "gunler[].title_tr; hepsi OD-9.2'ye uyar (tek cümle, ≤14 kelime, noktalı virgül, üç nokta, tırnak ve iç söz yok). durum.tr birim başlıklarının listesidir: her cümlesi tek fikir ve ≤14 kelime, ekranda alt alta gösterilir. kapi_ek teknik nottur, "
             "öğrenciye gösterilmez: seviye sınavının üç durumu, kayıt karşılaştırması, beklenmedik gelişme (surpriz), kaynak."),
 "seviye_listeleri": {
   "A1": {"basvuru": 650, "kaynak": "Goethe-Zertifikat A1: Start Deutsch 1, Wortliste, önsöz: 'circa 650 Wörter'; yarısı etkin, tamamı edilgin (goethe.de/pro/relaunch/prf/ca/A1_SD1_Wortliste_02.pdf; dilbilimci 20.11 doğruladı)", "omurga_hafta": 8},
   "A2": {"basvuru": 1300, "kaynak": "Goethe-Zertifikat A2, Wortliste, önsöz: 'circa 1300 lexikalische Einheiten', en az tanıma düzeyinde; A1 içinde (goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf; dilbilimci 20.11 doğruladı)", "omurga_hafta": 24},
   "B1": {"basvuru": 2400, "kaynak": "Goethe-Zertifikat B1, Wortliste, önsöz: 'circa 2400 lexikalische Einheiten', en az tanıma düzeyinde; A1 ve A2 içinde (goethe.de/pro/relaunch/prf/da/Goethe-Zertifikat_B1_Wortliste.pdf; dilbilimci 20.11 doğruladı)", "omurga_hafta": 52},
 },
 "seviye_dilimleri": {"M1": [1, 1], "A1": [2, 8], "A2": [9, 24], "B1": [25, 52]},
 "k1_cekirdek": {"toplam": len(k1), "m1_de": sum(1 for c in m1c if c in SIRA), "takvim_kolunda": len(TAKVIM), "bitis_haftasi": k1_bitis,
                 "not_tr": "B1 dışı K1 kartları 21. haftada biter; 17. haftadan sonra A2 birimlerinin K1 dışı alan kartları gerekir (lex işi). siklik-B1 25. haftadan başlar."},
 "takvim_kolu_kartlari": TAKVIM,
 "pm_kararlari": PM_KARARLARI,
 "dil_noktasi_onerileri": [{"id": i, "ad_tr": a, "seviye": s, "gramer": g, "kaynak": k, "durum": "önerilen"} for i, a, s, g, k in DN],
 "b1_birim_onerileri": [{"id": f"u:b1:{i}", "title_tr": t, "durum": "önerilen (b1.json yok)"} for i, t in B1U],
 "a2_gramer_eslemesi": GR_MAP,
 "gramer_r0_karsiligi": {"gr:a1-01:t2": "r0:08-sein-haben", "gr:a1-01:t3": "r0:11-praesens", "gr:a1-01:t4": "r0:07-fragewoerter",
                         "gr:a1-01:t5": "r0:03-zahlen-0-20", "gr:a1-02:t2": "r0:08-sein-haben", "gr:a1-02:t5": "r0:04-zahlen-21-100",
                         "gr:a1-05:t1": "r0:05-uhrzeit", "gr:a1-05:t2": "r0:05-uhrzeit", "gr:a1-07:t1": "r0:09-modalverben",
                         "gr:a1-09:t1": "r0:09-modalverben"},
 "gramer_tekrar_karsiligi": {"gr:b1-07:t1": "gr:a2-11:t3"},
 "gramer_tekrar_notu_tr": ("Aynı konu iki birimde: obwohl 21. haftada (gr:a2-11:t3) öğretilir; 31. hafta (b1-07) yeni bir şey öğretmediği için gr:b1-07:t1'i "
                           "yeniden vermez, kira ve komşu örneklerini 21. haftanın kuralına bağlar (döngüsüzlük, dilbilimci A6, inceleme #179)."),
 "haftalar": out_h,
 "gunler": gunler,
}
# Hafta 8 kapı bayrağı
for h in out_h:
    if h["no"] == 8:
        h["seviye_kapisi"] = True
# Okur 2. tur (3 satır): öğrenciye görünen durum.tr ve kol_mekan.tr düzeltmeleri
_DURUM = {5: "İş yerinde ilk gün. Tobi ile ve Herr Wimmer ile konuşmak. Günün planı. Davet ve otobüs.",
          20: "Telefonla bilgi almak ve otomatik sesi anlamak. İş talimatını anlamak ve sormak."}
_KOL = {12: "Muayenehanede daha uzun konuşmalar"}
for _h in doc["haftalar"]:
    if _h["no"] in _DURUM: _h["durum"]["tr"] = _DURUM[_h["no"]]
    if _h["no"] in _KOL and isinstance(_h.get("kol_mekan"), dict): _h["kol_mekan"]["tr"] = _KOL[_h["no"]]
json.dump(doc, open(f"{ROOT}/content/v2/curriculum/omurga.json", "w"), ensure_ascii=False, indent=1)
open(f"{ROOT}/content/v2/curriculum/omurga.json", "a").write("\n")

# ---------- okuma notları: ay ay plan (taslak.md) ve gün başlıkları (teknik.md) ----------
import os
NOT_DIZIN = os.path.join(ROOT, "docs/v2/reviews/omurga")


def yerlestir(dosya, ad, metin):
    """dosyadaki <!-- ad:başla --> ile <!-- ad:bitti --> arasını metinle değiştirir."""
    yol = os.path.join(NOT_DIZIN, dosya)
    if not os.path.exists(yol):
        return
    t = open(yol, encoding="utf-8").read()
    bas, son = f"<!-- {ad}:başla -->", f"<!-- {ad}:bitti -->"
    i, j = t.index(bas) + len(bas), t.index(son)
    open(yol, "w", encoding="utf-8").write(t[:i] + "\n" + metin.rstrip() + "\n" + t[j:])


AY_HAFTA = [4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5]
satir, bas = [], 1
for a_no, n in enumerate(AY_HAFTA, 1):
    son = bas + n - 1
    satir += [f"### {a_no}. ay · hafta {bas}–{son}", ""]
    for h in out_h[bas - 1:son]:
        sev = "İlk Hafta" if h["no"] == 1 else h["seviye"]
        ek = " · seviye sınavı" if h["seviye_kapisi"] else ""
        satir += [f"**Hafta {h['no']}** · {sev}{ek} · {h['kelime']['planlanan_yeni']} yeni kelime",
                  f"- Yapabilirim: {h['yapabiliyorum_tr']}",
                  f"- Dışarıda: {h['gorev_tr']}",
                  f"- Konuşma sınavı: {h['kapi_tr']}",
                  f"- Dinleme sınavı: {h['kulak_kapi_tr']}", ""]
    bas = son + 1
yerlestir("taslak.md", "aylar", "\n".join(satir))

gs = ["| Gün | Başlık |", "|---|---|"] + [f"| {g['day']} | {g['title_tr']} |" for g in gunler]
yerlestir("teknik.md", "gunler", "\n".join(gs))

# Süre satırı (iki notta aynı sayı)
dk = [h["tahmini_dk"] for h in out_h]
yerlestir("taslak.md", "sure", f"Haftada {min(dk)} ile {max(dk)} dakika arası. Sınır 700 dakika, yani günde 100 dakika.")
yerlestir("teknik.md", "sure", f"Haftalık {min(dk)}–{max(dk)} dk; sınır 700 dk. Kalan pay planlayıcının yedeği. Ayrıntı her haftada `sure_dk`. Yük önerileri: `dilbilimci.md` bölüm 6.")

# Karara bağlananlar ve açık sorular (taslak.md, PM'in okuduğu ilk ekran)
def gun_listesi(h): return ". ".join(f"{g}. gün {', '.join(c[3:] for c in v)}" for g, v in h.items())
yerlestir("taslak.md", "sorular", "\n".join([
 "## Karara bağlananlar",
 "",
 "- **Seviyeler:** 1. hafta İlk Hafta, A1 2.–8., A2 9.–24., B1 25.–52. hafta. Sonraki seviyeye beceriyle geçilir, hafta sayısıyla değil.",
 f"- **Küçük sözcükler:** {gun_listesi(F2_HEDEF)}. Sığmayan 8. güne gider.",
 "- **Eksik kelime kartları:** sıraya girer, şimdi değil. Önce Euro ve Cent, sonra 2.–7. gün bitince.",
 "- **Doğrulayıcıya ekleme:** sonra. O zamana kadar kendi denetim betiğimiz yeter.",
 "",
 "## Açık sorular",
 "",
 "1. **B1 dilbilgisi sırası:** Dilbilgisi kaydındaki sıradan ayrılıyor. Dilbilimci onayladı. Bu sırayla mı gidelim?",
 "2. **Videolar:** Lisansı ve yalnız ana dili Almanca olan konuşmacıların seçilmesi kontrol edilecek.",
 "3. **Bavyera ağzı:** Açık lisanslı ikinci bir ses kaynağı yok. Bulunmazsa 17. ve 32. haftada video azalır.",
 "4. **Kelime listeleri:** Hazır listemiz ile Goethe listeleri ne kadar örtüşüyor? Sözlük ajanı ölçecek.",
 "5. **Hızlı konuşma:** Planda \"ham wir\" yazıyor. Kuzeyde \"ham wa\" denir. Hangisi kalsın?",
 "6. **Konu uyumu:** Okul sistemi (15. hafta) ve otel (21. hafta) haftanın durumuna uymuyor.",
 "7. **Yük:** Dilbilimcinin üç yük önerisi. B1 sınavındaki üç durum gerçekten yeni olmalı.",
 "",
 "Dilbilimcinin notları: `dilbilimci.md` bölüm 7. Heceleme ve obwohl notları bu turda çözüldü (`teknik.md`).",
]))

# PM kararlarının yeri (teknik.md), pm_kararlari'ndan
tk = [
 "- **Seviyeler** (F1): " + PM_KARARLARI[0]["not_tr"].removeprefix("Karar: "),
 "- **Küçük sözcükler, Euro ve Cent** (karar 3, F2): " + gun_listesi(F2_HEDEF) + ". " + F2_KOSUL
 + " Halka PR'ları gelene kadar dokuzu 8. günün başında. Listede olmayan 13 sözcük (lange, erst, viel, gleich, echt, Zeit, gut, klar, kurz, immer, jetzt, mehr, ganz) 6.–7. güne girmez, 8. günde ve sonrasında. Yapılı hâli: `pm_kararlari[].hedef`.",
 "- **Euro ve Cent** (F3): kartları yok, K1 dışı kartlarda lex önce bunları yazar. O zamana kadar 8. günde.",
 "- **K1 dışı kartlar** (F3): " + PM_KARARLARI[3]["not_tr"].removeprefix("Karar: "),
 "- **Doğrulayıcı** (F4): " + PM_KARARLARI[4]["not_tr"].removeprefix("Karar: "),
 "- **am + gün** (PM 7046461200): kalıp 2. gün halkasında. Kuralı 18. günde (`gr:a1-05:t3`).",
 "- **Alles Gute zum Geburtstag** (karar 2): 2. gün halkasında kalıp. Tebrikler 33. günde (`gr:a1-14:t5`).",
 "- **Konuşma kısaltmaları** (LS-8.3): mikro ders 1 13. günde (hab, komm, geh, geht's, 'n), fiil sonları (2. gün) ve sein ile haben (7. gün) öğretildikten sonra. Mikro ders 2 17. haftada.",
 "- **#56'nın dört eksiği 6. haftada açılır:** sesli kurma 37. gün, kaydet ve yan yana dinle 38. gün, kelime ailesi 40. gün, yeniden anlatma 41. gün. Sonra kollarda sürer: kelime ailesi 14., 22. ve 40. hafta; yeniden anlatma sınavlarda; sesli kurma araba modunda.",
 "",
 "İnceleme #179 1. tur düzeltmeleri:",
 "- Fiil sonları (`r0:11-praesens`) 2. günde (gun-02.json). 9. gün artık der, die, das (`gr:a1-04:t1`): 12. günün Akkusativ'inden önce cinsiyet öğretilir. 22. gün er, sie, es (`gr:a1-04:t2`), 23. gün yalnız sıfat ve renk (`gr:a1-04:t3`).",
 "- Heceleme (`r0:10-buchstabieren`) 7. günde isteğe bağlı; öğretildi sayılmaz. Zorunlu ders olarak 16. günde, 21. günün sınavından önce.",
 "- obwohl yalnız 21. haftada (`gr:a2-11:t3`). 31. hafta `gr:b1-07:t1`'i vermez (`gramer_tekrar_karsiligi`), 32. hafta 21. haftayı ister.",
 "- 8., 24. ve 52. haftanın `requires.dil_noktalari`'sı seviye sınavının üç durumuna göre dolduruldu.",
]
yerlestir("teknik.md", "kararlar", "\n".join(tk))

for h in out_h:
    print(h["no"], h["seviye"], h["kelime"]["planlanan_yeni"], h["kelime"]["birikimli"], h["tahmini_dk"], h["kelime"]["k1_disi"])
print("K1 bitiş", k1_bitis)
