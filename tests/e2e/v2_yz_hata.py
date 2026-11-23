"""
Yapay zekâ hata durumları uçtan uca (PM-087 A.4): her yapay zekâ görevi × altı durum.
Durumlar: 500 · bozuk gövde (200, JSON değil) · şemasız çıktı (200, yanlış alanlar) · 15 sn gecikme · günlük sınır (429 quota_user) · ağ yok.
Her birinde: ekran takılmaz (aynı ekranda, en geç ~12 sn'de seçenek), Türkçe sade mesaj, bozuk çıktı ekranda yok,
ders yapay zekâsız sürer/biter, "Tekrar dene" (ya da aynı eylemi yinelemek) sunucu düzelince çalışır.
Ölçüm tablosu stdout'a ve --tablo DOSYA'ya yazılır.
Çalıştırma: python3 tests/e2e/v2_yz_hata.py [--browser webkit] [--device "iPhone 15"] [--gorev roleplay_turn] [--tablo /tmp/yz.md]
"""
import re, time, json
from playwright.sync_api import sync_playwright
from common import (GEC, check, serve, launch, new_page, login_onboard, default_ai, gec_birak, arg, ERR, RP_STATE)

PORT = 4185
SC = "sc:telefon:01-arzttermin"
IZ = "BOZUK-CIKTI-7Q"   # bozuk çıktının izi: ekranda asla görünmemeli
TR_HARF = re.compile(r"[çğışÇĞİŞ]|\b(bir|hata|oldu|dene|tekrar|sunucu\w*)\b", re.I)  # Türkçeye özgü harf (ö/ü Almancada da var) ya da sözcük
CEVAP = "[data-test=rp-chat] .bubble.them:not([aria-label])"   # "yazıyor" iskelet balonu sayılmaz (inceleme #218 P1-3a)
SINIR = {"error": {"code": "quota_user", "message_tr": "Bugünkü yapay zekâ hakkın doldu. Yapay zekâsız alıştırmalarla devam edebilirsin.", "retryable": False}}
DURUMLAR = ["500", "bozuk", "sema", "gec15", "sinir", "ag"]
GOREVLER = ["roleplay_turn", "feedback_tr", "explain_tr", "say_it_de", "equiv_check"]
TABLO: list = []

def bozuk_yanit(durum, task, v):
    if durum == "500": return 500, {}
    if durum == "bozuk": return "raw", "<html>" + IZ + "</html>"
    # şemayı bozan alanın yanında gösterilecek alanlara iz konur: istemci denetimi kalkarsa iz ekrana çıkar (P1-3e)
    if durum == "sema": return 200, {"reply_de": IZ, "end": "x", "tr": IZ, "note_tr": 5, "de_simple": IZ, "ok": "x", "reason_tr": IZ, "summary_tr": IZ, "goals": "x"}
    if durum == "gec15": return "gec", default_ai(task, v)[1]
    if durum == "sinir": return 429, SINIR
    if durum == "ag": return "abort", None
    raise ValueError(durum)

class Sunucu:
    """Hata yalnız seçilen görevde; `bozuk = False` olunca sunucu düzelir (yeniden deneme sınaması)"""
    def __init__(self, gorev, durum): self.gorev, self.durum, self.bozuk = gorev, durum, True
    def __call__(self, task, v):
        if self.bozuk and task == self.gorev: return bozuk_yanit(self.durum, task, v)
        return default_ai(task, v)

def sayfa(ctx, srv):
    pg = new_page(ctx, srv)
    pg.goto(f"http://127.0.0.1:{PORT}/#/today"); pg.wait_for_selector("[data-tab=today]")
    return pg

def kapat(pg):
    """bekleyen geç yanıtlar (gec15) sayfa kapanırken hata vermesin: yönlendirmeler önce kaldırılır (devir 7090637496 takibi)"""
    GEC.clear()
    try: pg.unroute_all(behavior="ignoreErrors")
    except Exception: pass
    pg.close()

def metin(pg, sel):
    return pg.inner_text(sel) if pg.locator(sel).count() else ""

def iz_yok(pg, ad):
    check(IZ not in (pg.text_content("body") or ""), f"{ad}: bozuk çıktı ekranda yok")

def rp_kayit(pg):
    """IndexedDB'deki rol oyunu kayıtları (finish çağrısı başına bir tane) ve ilerlemede 'roleplay' tamam mı"""
    return pg.evaluate("""async () => { const dbs = await indexedDB.databases(); let n = 0, done = false;
      for (const d of dbs) { const db = await new Promise(r => { const q = indexedDB.open(d.name); q.onsuccess = () => r(q.result); });
        for (const st of db.objectStoreNames) { const all = await new Promise(r => { const q = db.transaction(st).objectStore(st).getAll(); q.onsuccess = () => r(q.result); });
          for (const x of all) { const j = JSON.stringify(x); n += (j.match(/"section":"roleplay"/g) || []).length; if (/"done":\\[[^\\]]*"roleplay"/.test(j)) done = true; } } db.close(); }
      return [n, done]; }""")

def bolum_kayitli(pg, ad, once):
    """Senaryo sayfasına dönüldü, ilerlemede rol oyunu tamam ve tam BİR yeni kayıt (iki kez kaydedilmedi; P1-1, P1-3d)"""
    try: pg.wait_for_selector("[data-section=roleplay]", timeout=8000)
    except Exception: check(False, f"{ad}: senaryo sayfasına dönülmedi"); return False
    n, done = rp_kayit(pg)
    check(done and n - once == 1, f"{ad}: bölüm kaydedildi (ilerlemede tamam: {done}, yeni kayıt {n - once} = 1)")
    return done and n - once == 1

def rp_baslat(pg):
    pg.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/roleplay"); pg.wait_for_selector("[data-test=rp-start]")
    pg.click("[data-test=rp-start]"); pg.wait_for_selector("[data-test=rp-chat]")

def gonder(pg, s):
    pg.fill("[data-test=answer]", s); pg.click("[data-test=submit]")

def satir(gorev, durum, sure, mesaj, yedek, yeniden):
    TABLO.append((gorev, durum, sure, mesaj, yedek, yeniden))

def bekle_secenek(pg, sel, ad, sinir_sn):
    t0 = time.time()
    try: pg.wait_for_selector(sel, timeout=int((sinir_sn + 3) * 1000))
    except Exception: check(False, f"{ad}: seçenek görünmedi"); return None
    dt = time.time() - t0
    check(dt <= sinir_sn, f"{ad}: aynı ekranda {dt:.1f} sn içinde seçenek (≤ {sinir_sn:g})")
    return dt

# ---------------------------------------------------------------- görevler
def roleplay_turn(ctx, durum):
    ad = f"roleplay_turn/{durum}"; srv = Sunucu("roleplay_turn", durum); RP_STATE["n"] = 0
    pg = sayfa(ctx, srv); rp_baslat(pg)
    gonder(pg, "Guten Tag, ich brauche einen Termin."); t0 = time.time()
    dt = bekle_secenek(pg, "[data-test=rp-offline]", ad, 12.0)
    msg = metin(pg, "[data-test=rp-slow]") or metin(pg, "[role=alert]")
    check(bool(TR_HARF.search(msg)) and "/roleplay" in pg.url, f"{ad}: Türkçe mesaj, aynı ekran ({msg.splitlines()[0][:50] if msg else ''!r})")
    iz_yok(pg, ad)
    if durum == "sinir":
        # günlük sınır yeniden denenemez: Tekrar dene gösterilmez, yalnız yapay zekâsız yol
        yeniden = None
        check(pg.locator("[data-test=rp-retry]").count() == 0, f"{ad}: günlük sınırda 'Tekrar dene' yok (yeniden denenemez)")
    else:
        # yeniden deneme: sunucu düzeldi → Tekrar dene → karşı taraf cevap verir (beklenen metin)
        srv.bozuk = False
        pg.locator("[data-test=rp-retry]").first.click()
        # iskelet balonu sayılmaz: ikinci gerçek cevap balonu ancak cevap gelince çizilir
        try: pg.wait_for_function(f"() => document.querySelectorAll('{CEVAP}').length === 2 && !document.querySelector('[data-test=rp-chat] .bubble[aria-label]')", timeout=8000); yeniden = True
        except Exception: yeniden = False
        check(yeniden, f"{ad}: Tekrar dene → cevap geldi ({pg.locator(CEVAP).count()} cevap balonu)")
        if durum == "gec15":  # eski istek (cevabı 'Versichertenkarte') 15 sn'de gelir: konuşmaya eklenmez
            gec_birak(pg, 15); pg.wait_for_timeout(800)
            check(pg.locator(CEVAP).count() == 2 and "Versichertenkarte" not in pg.inner_text("[data-test=rp-chat]"), f"{ad}: 15 sn'de gelen eski cevap konuşmaya eklenmedi")
        srv.bozuk = True
        gonder(pg, "Ja, ich bin schon Patient bei Ihnen.")
        pg.wait_for_selector("[data-test=rp-offline]", timeout=15000)
    # yapay zekâsız yedek yol: Yapay zekâsız devam → hazır diyalog iki satır sürer → rapor → kaydet
    n0 = pg.locator(CEVAP).count()
    pg.click("[data-test=rp-offline]")
    try: pg.wait_for_function(f"() => document.querySelectorAll('{CEVAP}').length >= {n0 + 1}", timeout=5000); a = True
    except Exception: a = False
    gonder(pg, "Dienstag passt gut.")
    try: pg.wait_for_function(f"() => document.querySelectorAll('{CEVAP}').length >= {n0 + 2}", timeout=5000); b_ = True
    except Exception: b_ = False
    check(a and b_ and pg.locator("[role=alert]").count() == 0, f"{ad}: yapay zekâsız devam: hazır diyalog iki satır sürdü ({n0} → {pg.locator(CEVAP).count()})")
    yedek = bitir_offline(pg, ad)
    iz_yok(pg, ad)
    satir("roleplay_turn", durum, dt, msg, yedek, yeniden)
    kapat(pg)

def bitir_offline(pg, ad):
    once = rp_kayit(pg)[0]
    pg.click("[data-test=rp-end]"); pg.wait_for_selector("[data-test=rp-save]", timeout=8000)
    pg.locator("[data-test=rp-report] input[type=checkbox]").first.check()
    pg.click("[data-test=rp-save]")
    return bolum_kayitli(pg, f"{ad}: yapay zekâsız rapor → Kaydet ve bitir", once)

def feedback_tr(ctx, durum):
    ad = f"feedback_tr/{durum}"; RP_STATE["n"] = 0
    yedek = yeniden = False; dt = None; msg = ""
    for yol in ("yeniden", "yedek"):
        srv = Sunucu("feedback_tr", durum); pg = sayfa(ctx, srv); rp_baslat(pg)
        gonder(pg, "Guten Tag, ich brauche einen Termin.")
        pg.wait_for_function(f"() => document.querySelectorAll('{CEVAP}').length >= 2", timeout=8000)
        once = rp_kayit(pg)[0]
        pg.click("[data-test=rp-end]"); pg.wait_for_selector("[data-test=rp-report]")
        d = bekle_secenek(pg, "[data-test=rp-self]", f"{ad} ({yol})", 12.0)
        if yol == "yeniden":
            dt = d
            msg = metin(pg, "[data-test=rp-slow]") or metin(pg, "[role=alert]")
            check(bool(TR_HARF.search(msg)), f"{ad}: Türkçe mesaj ({msg.splitlines()[0][:50] if msg else ''!r})")
            iz_yok(pg, ad)
            if durum == "sinir":
                yeniden = None
                check(pg.locator("[data-test=rp-retry]").count() == 0, f"{ad}: günlük sınırda 'Tekrar dene' yok")
            else:
                srv.bozuk = False
                pg.locator("[data-test=rp-retry]").first.click()
                try: pg.wait_for_selector("[data-test=back-to-scenario]", timeout=8000); yeniden = True
                except Exception: yeniden = False
                check(yeniden and pg.locator("[data-test=rp-self]").count() == 0, f"{ad}: Tekrar dene → rapor geldi, hata kartı kalktı")
                if durum == "gec15":
                    gec_birak(pg, 15); pg.wait_for_timeout(500)
                    check(pg.locator("[data-test=rp-report] .hero").count() == 1, f"{ad}: geç gelen ikinci rapor ekranı bozmadı")
                pg.click("[data-test=back-to-scenario]")
                bolum_kayitli(pg, f"{ad}: rapor ile", once)
        else:
            pg.click("[data-test=rp-self]")
            if durum == "gec15":   # geç rapor, öğrenci işaretleme ekranındayken gelir: yok sayılır (P1-3c)
                pg.wait_for_selector("[data-test=rp-save]", timeout=5000)
                gec_birak(pg, 15); pg.wait_for_timeout(600)
                check(pg.locator("[data-test=rp-save]").count() == 1 and pg.locator("[data-test=rp-report] .hero").count() == 0 and rp_kayit(pg)[0] == once,
                      f"{ad}: kendim değerlendirirken gelen geç rapor yok sayıldı (kayıt 0, işaretleme ekranı duruyor)")
            yedek = bitir_rapor_kendim(pg, ad, once)
        iz_yok(pg, ad)
        kapat(pg)
    satir("feedback_tr", durum, dt, msg, yedek, yeniden)

def bitir_rapor_kendim(pg, ad, once):
    try: pg.wait_for_selector("[data-test=rp-save]", timeout=5000)
    except Exception: check(False, f"{ad}: 'Kendim değerlendireyim' → görev işaretleme ekranı yok"); return False
    pg.locator("[data-test=rp-report] input[type=checkbox]").first.check()
    pg.click("[data-test=rp-save]")
    return bolum_kayitli(pg, f"{ad}: Kendim değerlendireyim → Kaydet ve bitir", once)

def feedback_yaris(ctx):
    """inceleme #218 P1-1: istek 1 gecikir → Tekrar dene → istek 2 500 → istek 1 geç ama başarılı gelir.
    Beklenen: rapor görünür, hata kartı ve 'Kendim değerlendireyim' kalkar, bölüm bir kez kaydedilir."""
    ad = "feedback_tr/yarış"; RP_STATE["n"] = 0; n = {"fb": 0}
    def h(task, v):
        if task == "feedback_tr":
            n["fb"] += 1
            return ("gec", default_ai(task, v)[1]) if n["fb"] == 1 else (500, {})
        return default_ai(task, v)
    pg = sayfa(ctx, h); rp_baslat(pg)
    gonder(pg, "Guten Tag, ich brauche einen Termin.")
    pg.wait_for_function(f"() => document.querySelectorAll('{CEVAP}').length >= 2", timeout=8000)
    once = rp_kayit(pg)[0]
    pg.click("[data-test=rp-end]"); pg.wait_for_selector("[data-test=rp-slow]", timeout=13000)
    pg.click("[data-test=rp-retry]"); pg.wait_for_selector("[role=alert]", timeout=8000)
    gec_birak(pg, 12)
    try: pg.wait_for_selector("[data-test=back-to-scenario]", timeout=8000); geldi = True
    except Exception: geldi = False
    pg.wait_for_timeout(500)
    check(geldi and pg.locator("[data-test=rp-self]").count() == 0 and pg.locator("[role=alert]").count() == 0, f"{ad}: geç rapor gelince hata kartı ve 'Kendim değerlendireyim' kalktı")
    if geldi:
        pg.click("[data-test=back-to-scenario]"); bolum_kayitli(pg, ad, once)
    kapat(pg)

def explain_tr(ctx, durum):
    ad = f"explain_tr/{durum}"; srv = Sunucu("explain_tr", durum); RP_STATE["n"] = 0
    pg = sayfa(ctx, srv); rp_baslat(pg)
    pg.locator("[data-test=explain]").first.click(); pg.wait_for_selector("[data-test=explain-ai]", timeout=8000)
    pg.locator("[data-test=explain-ai]").first.click()
    dt = bekle_secenek(pg, "[data-test=explain-err]", ad, 12.0)
    msg = metin(pg, "[data-test=explain-err]")
    check(bool(TR_HARF.search(msg)), f"{ad}: Türkçe mesaj ({msg[:50]!r})")
    iz_yok(pg, ad)
    srv.bozuk = False
    yeniden = False
    if durum == "sinir":
        yeniden = None
        check(pg.locator("[data-test=explain-retry]").count() == 0, f"{ad}: günlük sınırda 'Tekrar dene' yok")
    elif pg.locator("[data-test=explain-retry]").count():
        pg.click("[data-test=explain-retry]")
        try: pg.wait_for_function("() => (document.querySelector('[data-test=explain-out]')?.innerText || '').includes('Kibar rica')", timeout=8000); yeniden = True
        except Exception: pass
    if yeniden is not None: check(yeniden, f"{ad}: Tekrar dene → açıklama geldi")
    # yedek yol: açıklama olmadan konuşma sürer
    gonder(pg, "Guten Tag, ich brauche einen Termin.")
    try: pg.wait_for_function("() => document.querySelector('[data-test=rp-chat]').innerText.includes('Versichertenkarte')", timeout=8000); yedek = True
    except Exception: yedek = False
    check(yedek, f"{ad}: açıklama alınamasa da konuşma sürüyor")
    if durum == "gec15": gec_birak(pg, 15)
    iz_yok(pg, ad)
    satir("explain_tr", durum, dt, msg, yedek, yeniden)
    kapat(pg)

def say_it_de(ctx, durum):
    ad = f"say_it_de/{durum}"; srv = Sunucu("say_it_de", durum); RP_STATE["n"] = 0
    pg = sayfa(ctx, srv); rp_baslat(pg)
    pg.click("[data-test=sayit]"); pg.fill("[data-test=sayit-in]", "Kuzenimin düğünü cumartesi")
    pg.press("[data-test=sayit-in]", "Enter")
    dt = bekle_secenek(pg, ".fb.warn", ad, 12.0)
    msg = metin(pg, ".fb.warn")
    check(bool(TR_HARF.search(msg)), f"{ad}: Türkçe mesaj ({msg[:50]!r})")
    iz_yok(pg, ad)
    srv.bozuk = False
    pg.press("[data-test=sayit-in]", "Enter")   # aynı eylemi yinelemek = yeniden deneme
    try: pg.wait_for_function("() => document.body.innerText.includes('Ich brauche einen Termin.')", timeout=8000); yeniden = True
    except Exception: yeniden = False
    check(yeniden, f"{ad}: yeniden Bul → cevap geldi")
    gonder(pg, "Guten Tag, ich brauche einen Termin.")
    try: pg.wait_for_function("() => document.querySelector('[data-test=rp-chat]').innerText.includes('Versichertenkarte')", timeout=8000); yedek = True
    except Exception: yedek = False
    check(yedek, f"{ad}: cevap alınamasa da konuşma sürüyor")
    if durum == "gec15": gec_birak(pg, 15)
    iz_yok(pg, ad)
    satir("say_it_de", durum, dt, msg, yedek, yeniden)
    kapat(pg)

def equiv_check(ctx, durum):
    ad = f"equiv_check/{durum}"; srv = Sunucu("equiv_check", durum)
    pg = sayfa(ctx, srv)
    pg.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/build"); pg.wait_for_selector("[data-test=item-count]")
    def cevapla():
        if not pg.locator("[data-test=answer]").count(): pg.click("text=Yaz / söyle")
        pg.fill("[data-test=answer]", "Ich will einen Termin machen."); pg.click("[data-test=submit]")
    cevapla()
    dt = bekle_secenek(pg, "[data-test=verdict]", ad, 12.0)
    msg = metin(pg, "[data-test=verdict]")
    belirsiz = pg.locator("[data-test=claim]").count() >= 1 and "denetleyemedi" in msg
    check(belirsiz and bool(TR_HARF.search(msg)), f"{ad}: 'Uygulama bu cevabı denetleyemedi' + öğrenciye sorulur, yanlış sayılmaz ({msg.splitlines()[0][:50] if msg else ''!r})")
    iz_yok(pg, ad)
    # yedek yol: öğrenci "Evet, aynı anlamda" der, sıradaki madde gelir
    once = metin(pg, "[data-test=item-count]")
    pg.click("[data-test=claim]"); pg.click("[data-test=next]")
    try: pg.wait_for_function("(o) => (document.querySelector('[data-test=item-count]')?.innerText || '') !== o", arg=once, timeout=5000); yedek = True
    except Exception: yedek = False
    check(yedek, f"{ad}: sıradaki maddeye geçildi ({once} →)")
    if durum == "gec15": gec_birak(pg, 15)
    # yeniden deneme: aynı ekranı baştan aç, sunucu düzelince öğretmen kararı gelir
    srv.bozuk = False
    pg.goto(f"http://127.0.0.1:{PORT}/#/today"); pg.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/build"); pg.wait_for_selector("[data-test=item-count]")
    yeniden = False
    if "Randevu almak istiyorum (kibar)" in pg.inner_text("main"):
        cevapla(); pg.wait_for_selector("[data-test=verdict]", timeout=8000)
        yeniden = "denetleyemedi" not in metin(pg, "[data-test=verdict]")
        check(yeniden, f"{ad}: sunucu düzelince aynı cevap öğretmenle denetlendi")
    else:
        yeniden = False; check(False, f"{ad}: aynı madde yeniden gelmedi; yeniden deneme sınanamadı")
    iz_yok(pg, ad)
    satir("equiv_check", durum, dt, msg, yedek, yeniden)
    kapat(pg)

# ---------------------------------------------------------------- takipler (PM finali #218, devir 7090637496)
def ileri(pg):
    """geri bildirimden sonraki maddeye geç: eski geri bildirim kalkana kadar bekle (yarış: aynı düğmeye iki kez basılmasın)"""
    pg.click("[data-test=next]")
    pg.wait_for_function("() => !document.querySelector('[data-test=feedback]')", timeout=8000)

def assess_denetim(ctx, durum):
    """Seviye tespitinde 'Almanca söyle' cevabı yapay zekâyla denetlenemezse yanlış sayılmaz: 'denetleyemedi' + puana sayılmaz"""
    ad = f"assess equiv_check/{durum}"; srv = Sunucu("equiv_check", durum)
    pg = sayfa(ctx, srv)
    pg.goto(f"http://127.0.0.1:{PORT}/#/assess"); pg.wait_for_selector("[data-test=assess-begin]"); pg.click("[data-test=assess-begin]")
    dt = None; gordu = 0; sonra = None
    for _ in range(60):
        pg.wait_for_selector("[data-test=feedback], [data-test=dunno], [data-test=overall]", timeout=8000)
        if pg.locator("[data-test=overall]").count(): break
        if pg.locator("[data-test=feedback]").count(): ileri(pg); continue
        if "almanca söyle" in pg.inner_text("main").lower() and pg.locator("[data-test=answer]").count():
            pg.fill("[data-test=answer]", "Ich habe heute leider keine Zeit gehabt."); t0 = time.time(); pg.press("[data-test=answer]", "Enter")
            pg.wait_for_selector("[data-test=feedback]", timeout=16000)
            fb = metin(pg, "[data-test=feedback]")
            if gordu == 0:
                dt = time.time() - t0
                check(dt <= 12.0, f"{ad}: karar {dt:.1f} sn'de (≤ 12)")
                check(pg.get_attribute("[data-test=feedback]", "data-unchecked") == "1" and "denetleyemedi" in fb and "Bu sefer olmadı" not in fb and "puanına sayılmadı" in fb,
                      f"{ad}: 'Uygulama bu cevabı denetleyemedi' · yanlış denmedi · puana sayılmadı ({fb.splitlines()[0][:60]!r})")
                check(not re.search(r"sunucu|hata kodu", fb, re.I), f"{ad}: öğrenci dilinde (sunucu/hata kodu yok)")
                iz_yok(pg, ad)
                kayit = pg.evaluate("""async () => { const dbs = await indexedDB.databases(); let u = 0;
                  for (const d of dbs) { const db = await new Promise(r => { const q = indexedDB.open(d.name); q.onsuccess = () => r(q.result); });
                    for (const st of db.objectStoreNames) { const all = await new Promise(r => { const q = db.transaction(st).objectStore(st).getAll(); q.onsuccess = () => r(q.result); });
                      for (const x of all) u += (JSON.stringify(x).match(/"unchecked":true/g) || []).length; } db.close(); } return u; }""")
                check(kayit == 1, f"{ad}: cevap 'denetlenemedi' olarak kaydedildi ({kayit} = 1)")
                srv.bozuk = False; gordu = 1
                if durum == "gec15": gec_birak(pg, 15)
            else:
                sonra = "Bu sefer olmadı" in fb and pg.get_attribute("[data-test=feedback]", "data-unchecked") is None
                check(sonra, f"{ad}: sunucu düzelince sıradaki cevap öğretmenle denetlendi ({fb.splitlines()[0][:40]!r})")
                break
            ileri(pg); continue
        pg.click("[data-test=dunno]"); pg.wait_for_selector("[data-test=feedback]", timeout=5000)
    check(gordu == 1, f"{ad}: konuşma maddesi geldi ve denendi")
    satir("assess equiv_check", durum, dt, "", gordu == 1, sonra)
    kapat(pg)

def bos_bitir(ctx):
    """Cümle kurmadan 'Konuşmayı bitir' boş rapor açmaz: uyarı + Konuşmaya dön / Kaydetmeden çık; hiçbir şey kaydedilmez"""
    ad = "roleplay/boş bitir"; RP_STATE["n"] = 0
    pg = sayfa(ctx, default_ai); rp_baslat(pg)
    once = rp_kayit(pg)[0]
    pg.click("[data-test=rp-end]")
    try: pg.wait_for_selector("[data-test=rp-bos]", timeout=4000); kart = True
    except Exception: kart = False
    check(kart and pg.locator("[data-test=rp-report]").count() == 0 and pg.locator("[data-test=rp-chat]").count() == 1, f"{ad}: boş rapor yok, uyarı kartı, konuşma ekranı duruyor")
    pg.click("[data-test=rp-bos-don]")
    check(pg.locator("[data-test=rp-bos]").count() == 0, f"{ad}: 'Konuşmaya dön' kartı kapatır")
    pg.click("[data-test=rp-end]"); pg.wait_for_selector("[data-test=rp-bos-cik]")
    pg.click("[data-test=rp-bos-cik]")
    try: pg.wait_for_selector("[data-section=roleplay]", timeout=6000); cikti = True
    except Exception: cikti = False
    check(cikti and rp_kayit(pg)[0] == once, f"{ad}: 'Kaydetmeden çık' senaryo sayfasına döner, kayıt yok")
    # bir cümleden sonra bitir: rapor yolu (uyarı yok)
    rp_baslat(pg); gonder(pg, "Guten Tag, ich brauche einen Termin.")
    pg.wait_for_function(f"() => document.querySelectorAll('{CEVAP}').length >= 2", timeout=8000)
    pg.click("[data-test=rp-end]")
    try: pg.wait_for_selector("[data-test=back-to-scenario]", timeout=8000); rapor = True
    except Exception: rapor = False
    check(rapor and pg.locator("[data-test=rp-bos]").count() == 0, f"{ad}: cümleden sonra bitir → rapor")
    kapat(pg)

def kalip_aciklama(ctx):
    """'Bu ne demek?' yapay zekâsız yedek: cümledeki kalıp bütün açıklanır ('grüß Gott' = Merhaba, 'der Gott — Tanrı' değil)"""
    ad = "explain/kalıp"; RP_STATE["n"] = 0
    pg = sayfa(ctx, default_ai); rp_baslat(pg)
    pg.locator("[data-test=explain]").first.click()
    pg.wait_for_selector("[data-test=yerel-kelimeler], [data-test=yerel-cevap], [data-test=yerel-yok]", timeout=10000)
    t = metin(pg, "[data-test=explain-out]")
    check("Grüß Gott" in t and "Tanrı" not in t, f"{ad}: 'grüß Gott' kalıp olarak açıklandı ({t.splitlines()[:3]!r})")
    kapat(pg)

def main():
    srv = serve(PORT)
    gorevler = [arg("--gorev")] if arg("--gorev") else GOREVLER
    durumlar = [arg("--durum")] if arg("--durum") else DURUMLAR
    with sync_playwright() as p:
        for g in gorevler:
            print(f"== {g}")
            for d in durumlar:
                # her durum temiz bağlamda: önbellek (IndexedDB) ve devre kesici önceki durumdan taşınmaz
                b, ctx = launch(p)
                pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.close()
                try: globals()[g](ctx, d)
                except Exception as e: check(False, f"{g}/{d}: beklenmeyen hata ({str(e)[:120]})")
                b.close()
            if g == "equiv_check":
                for d in ([arg("--durum")] if arg("--durum") else ["500", "gec15"]):
                    b, ctx = launch(p); pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.close()
                    try: assess_denetim(ctx, d)
                    except Exception as e: check(False, f"assess equiv_check/{d}: beklenmeyen hata ({str(e)[:120]})")
                    b.close()
            if g == "feedback_tr" and not arg("--durum"):
                b, ctx = launch(p); pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.close()
                try: feedback_yaris(ctx)
                except Exception as e: check(False, f"feedback_tr/yarış: beklenmeyen hata ({str(e)[:120]})")
                b.close()
        if not arg("--gorev"):
            for f in (bos_bitir, kalip_aciklama):
                print(f"== {f.__name__}")
                b, ctx = launch(p); pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.close()
                try: f(ctx)
                except Exception as e: check(False, f"{f.__name__}: beklenmeyen hata ({str(e)[:120]})")
                b.close()
    srv.shutdown()
    satirlar = ["| görev | durum | seçenek süresi | ekrandaki mesaj | yapay zekâsız yol | yeniden deneme |", "|---|---|---|---|---|---|"]
    for g, d, dt, m, y, r in TABLO:
        ilk = (m or "").replace("\n", " ").strip()[:70].replace("|", "/")
        satirlar.append(f"| {g} | {d} | {'—' if dt is None else f'{dt:.1f} sn'} | {ilk} | {'✓' if y else '✗'} | {'—' if r is None else '✓' if r else '✗'} |")
    tablo = "\n".join(satirlar)
    print(tablo)
    if arg("--tablo"):
        with open(arg("--tablo"), "w", encoding="utf-8") as f: f.write(tablo + "\n")
    print(f"\n{len(ERR)} hata")
    raise SystemExit(1 if ERR else 0)

if __name__ == "__main__":
    main()
