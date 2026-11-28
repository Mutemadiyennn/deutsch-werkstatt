"""
[DENETİM-TASARIM] ekran çekimi (PM-153 md. 2): giriş, kurulum, seviye tespiti, sekmeler, Köy dükkânları ve içleri, Ben alt sayfaları,
ders/prova/okuma/medya/sınav/test/deneme adımları, hata/boş/çevrimdışı durumları. Kod değiştirmez; Chromium 390×844.
  cd tests/e2e && python3 ../../docs/v2/qa/tasarim-1/arac/cekim_statik.py <çıktı klasörü> [bolum,bolum]
"""
import json, os, sys, time, urllib.parse
OUTD = sys.argv[1]; BOLUM = (sys.argv[2].split(",") if len(sys.argv) > 2 else None)
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(HERE, "..", "..", "..", "..", "..", "tests", "e2e")))
sys.argv = [sys.argv[0], "--browser", "chromium"]
import common
from common import serve, launch, new_page, login_onboard, content_file, HIZLI_KAPAT
from playwright.sync_api import sync_playwright
sys.path.insert(0, HERE)
from ortak import SAHTE_SES, Cekici, TUR_JS

PORT = 4391
C = Cekici(OUTD, onek="s")
IDX = content_file("index.json")

def bol(ad): return BOLUM is None or ad in BOLUM

def git(pg, base, h, bekle=1200):
    pg.goto(base + h); pg.wait_for_timeout(bekle)

def var(pg, sel):
    try: return pg.locator(sel).count() > 0 and pg.locator(sel).first.is_visible()
    except Exception: return False

def ilerle(pg, bilmiyorum=True):
    """genel ilerleme: Bilmiyorum > seçenek + Kontrol > birincil düğme. Döner: yapılan iş ya da None"""
    if var(pg, "button:has-text('Şimdi değil')"):
        C.cek(pg, "mikrofon-izin-sorusu", sinir=1)
        try: pg.locator("button:has-text('Şimdi değil')").first.click(timeout=2000); pg.wait_for_timeout(400)
        except Exception: pass
    for s in ["[data-test=tespit-yazarak]", "[data-test=akis-yazarak]"]:
        if var(pg, s) and not var(pg, "[data-test=tespit-bilmiyorum]:not([disabled]), [data-test=akis-bilmiyorum]"):
            try: pg.locator(s).first.click(timeout=2000); pg.wait_for_timeout(300)
            except Exception: pass
    for s in ["[data-test=akis-bilmiyorum]", "[data-test=tespit-bilmiyorum]", "[data-test=resim-bilmiyorum]", "button:has-text('Bilmiyorum')"] if bilmiyorum else []:
        if var(pg, s):
            try: pg.locator(s).first.click(timeout=2000); return "bilmiyorum"
            except Exception: pass
    opt = pg.locator("main button.opt:not([disabled])")
    if opt.count() and not var(pg, "[data-test=next], [data-test=akis-devam]"):
        try:
            opt.first.click(timeout=2000); pg.wait_for_timeout(200)
            k = pg.locator("button:has-text('Kontrol et'):not([disabled])")
            if k.count(): k.first.click(timeout=2000)
            return "secenek"
        except Exception: pass
    for s in ["[data-test=next]:not([disabled])", "[data-test=akis-devam]", ".actionbar .btn.primary:not([disabled])", "main .btn.primary:not([disabled])"]:
        if var(pg, s):
            try: pg.locator(s).first.click(timeout=2000); return "birincil"
            except Exception: pass
    return None

def yuru(pg, ad, adim=40, sinir=1, sonra=True, bilmiyorum=True):
    """ekranın içinde ilerler; her yeni türün önce/sonra görüntüsü"""
    for i in range(adim):
        pg.wait_for_timeout(500)
        try: t = pg.evaluate(TUR_JS)
        except Exception: t = "?"
        C.cek(pg, f"{ad}-{t}-once", sinir=sinir, anahtar=f"{ad}|{t}|once")
        imza = pg.evaluate("location.hash + (document.querySelector('main')||document.body).innerText.length + (document.querySelector('main')||document.body).innerText.slice(0,200)")
        ne = ilerle(pg, bilmiyorum)
        if ne is None: C.cek(pg, f"{ad}-takildi", sinir=1); return
        if ne in ("bilmiyorum", "secenek") and sonra:
            pg.wait_for_timeout(500); C.cek(pg, f"{ad}-{t}-sonra-{ne}", sinir=sinir, anahtar=f"{ad}|{t}|sonra")
            ilerle(pg, False)
        pg.wait_for_timeout(300)
        yeni = pg.evaluate("location.hash + (document.querySelector('main')||document.body).innerText.length + (document.querySelector('main')||document.body).innerText.slice(0,200)")
        if yeni == imza and ne == "birincil":
            pg.wait_for_timeout(1500)
            yeni = pg.evaluate("location.hash + (document.querySelector('main')||document.body).innerText.length + (document.querySelector('main')||document.body).innerText.slice(0,200)")
            if yeni == imza: C.cek(pg, f"{ad}-ilerlemiyor", sinir=1); return

def ac(p, ai=None, kilit="kapali"):
    common.GUN_KILIDI_TABAN = f"try {{ sessionStorage.setItem('e2e-gun-kilidi', '{kilit}'); }} catch (e) {{}}"
    common.AKIS_TABAN = "try { sessionStorage.setItem('e2e-akis-gunler', '\"hepsi\"'); } catch (e) {}"
    b, ctx = launch(p); ctx.add_init_script(SAHTE_SES); pg = new_page(ctx, ai); C.pg = pg
    return b, ctx, pg

def kurulum_cekimli(pg, base):
    pg.goto(base); pg.wait_for_selector("text=Almancayı gerçek hayat için öğren"); C.cek(pg, "giris")
    pg.click("summary"); pg.wait_for_timeout(300); C.cek(pg, "giris-e-posta-acik")
    pg.fill("#em", "test@example.com"); pg.fill("#pw", "e2e-pass"); pg.click("button[type=submit]")
    pg.wait_for_selector("text=Hoş geldin"); C.cek(pg, "kurulum-1-hos-geldin", tam=True)
    pg.click("text=Başlayalım"); pg.wait_for_selector("[data-test=ad-tekrar], [data-struggle]")
    C.cek(pg, "kurulum-2-ad", tam=True)
    if pg.locator("[data-test=ad-gec]").count(): pg.click("[data-test=ad-gec]")
    pg.wait_for_timeout(400); C.cek(pg, "kurulum-3-zorluk", tam=True)
    pg.click("[data-struggle=phone]"); pg.wait_for_timeout(200); C.cek(pg, "kurulum-3b-zorluk-secili", tam=True)
    pg.click("text=Devam"); pg.wait_for_selector("text=Öncelik sırası"); C.cek(pg, "kurulum-4-oncelik", tam=True)
    pg.click("text=Devam"); pg.wait_for_timeout(400); C.cek(pg, "kurulum-5", tam=True)
    pg.click("text=Devam"); pg.wait_for_timeout(400)
    pg.evaluate(HIZLI_KAPAT)
    pg.wait_for_selector("[data-test=start-tespit], [data-test=start-assess]"); C.cek(pg, "kurulum-6-tespit-sor", tam=True)

def main():
    os.makedirs(OUTD, exist_ok=True)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    g1 = content_file("m1/gun-01.json")
    with sync_playwright() as p:
        # ---------------- A: giriş, kurulum, seviye tespiti (ayrı öğrenci)
        if bol("tespit"):
            b, ctx, pg = ac(p)
            kurulum_cekimli(pg, base)
            pg.click("[data-test=start-tespit]"); pg.wait_for_selector("[data-test=tespit-giris]", timeout=20000); pg.wait_for_timeout(800)
            C.cek(pg, "tespit-giris", tam=True)
            ilerle(pg, False); pg.wait_for_timeout(800)
            for i in range(70):
                if not var(pg, "[data-test=tespit-madde]"):
                    C.cek(pg, f"tespit-ara-{i}", sinir=1, anahtar="tespit-ara-" + (pg.evaluate("[...document.querySelectorAll('main [data-test]')].map(e=>e.dataset.test).slice(0,3).join(',')")), tam=True)
                    if var(pg, "[data-test=tespit-rapor], [data-test=tespit-karar]") and i > 3: break
                    if not ilerle(pg, False): break
                    pg.wait_for_timeout(700); continue
                bec = pg.get_attribute("[data-test=tespit-madde]", "data-beceri") or "?"
                asm = pg.get_attribute("[data-test=tespit-madde]", "data-asama") or "?"
                kind = f"{bec}-{asm}"
                C.cek(pg, f"tespit-madde-{kind}", sinir=1, anahtar="tm|" + kind)
                # ilk 6 madde: seçenek dene (doğru/yanlış sonrası); sonra hep Bilmiyorum (zayıf öğrenci → karar ekranı)
                ne = ilerle(pg, bilmiyorum=(i >= 6)) or ilerle(pg, True)
                pg.wait_for_timeout(600)
                C.cek(pg, f"tespit-sonra-{kind}-{ne}", sinir=1, anahtar="ts|" + kind + "|" + str(ne))
                if var(pg, "[data-test=tespit-madde] [data-test=next], [data-test=tespit-madde] .actionbar .btn.primary:not([disabled])"): ilerle(pg, False)
                pg.wait_for_timeout(500)
            C.cek(pg, "tespit-son-durum", tam=True)
            for h in ["#/seviye", "#/seviye/rapor", "#/seviye/plan", "#/today", "#/yol"]:
                git(pg, base, h, 1500); C.cek(pg, "tespit-sonrasi-" + h[2:].replace("/", "-"), tam=True)
            b.close()

        # ---------------- B: baştan başlayan öğrenci: sekmeler ve bütün rotalar
        b, ctx, pg = ac(p)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(1500)
        if bol("sekme"):
            C.cek(pg, "bugun-taze", tam=True)
            C.cek(pg, "bugun-taze-ekran")
            rotalar = ["#/yol", "#/koy"] + [f"#/koy/{m}" for m in ("bahce", "sinema", "radyo", "kutuphane", "pazar")] + \
                ["#/ben", "#/ben/duzen", "#/ben/ayarlar", "#/ben/ayarlar/raf", "#/sozluk", "#/kalip", "#/rehber/1", "#/m1/1", "#/gorevler", "#/odak", "#/ses",
                 "#/seviye/rapor", "#/seviye/plan", "#/hafta/1", "#/hafta/1/sonuc", "#/garden", "#/assess/result"]
            for h in rotalar:
                git(pg, base, h, 1500); C.cek(pg, "rota-" + h[2:].replace("/", "-"), tam=True)
                if h == "#/ben":
                    t = pg.locator("[data-test=tanilama] summary")
                    if t.count(): t.first.click(); pg.wait_for_timeout(300); C.cek(pg, "ben-tanilama-acik", tam=True)
                if h == "#/sozluk":
                    a = pg.locator("main a[href^='#/sozluk/']")
                    if a.count():
                        a.first.click(); pg.wait_for_timeout(1200); C.cek(pg, "sozluk-kart", tam=True)
                if h == "#/kalip":
                    a = pg.locator("main a[href^='#/kalip/']")
                    if a.count(): a.first.click(); pg.wait_for_timeout(1200); C.cek(pg, "kalip-ayrinti", tam=True)
            # Köy dükkânlarının içi: her mekânda ilk iki bağlantı
            for m in ("bahce", "sinema", "radyo", "kutuphane", "pazar"):
                git(pg, base, f"#/koy/{m}", 1500)
                hrefs = pg.evaluate("() => [...document.querySelectorAll('main a[href^=\"#/\"]')].map(a => a.getAttribute('href')).filter(h => !/^#\\/(koy|today|ben|yol)$/.test(h))")
                for h in list(dict.fromkeys(hrefs))[:2]:
                    git(pg, base, h, 1800); C.cek(pg, f"dukkan-{m}-ic", tam=True, sinir=2, anahtar=f"dk|{m}")
                    yuru(pg, f"dukkan-{m}", adim=6, sinir=1)
        if bol("akis_disi"):
            # ders (1. gün), prova, okuma, günün kayıtları (ses/video), Bahçe
            for did in g1.get("dersler", [])[:1]:
                git(pg, base, f"#/ders/{urllib.parse.quote(did)}", 2000); C.cek(pg, "ders-giris", tam=True); yuru(pg, "ders", adim=60, sinir=1)
            git(pg, base, "#/prova/1", 2000); C.cek(pg, "prova-giris", tam=True); yuru(pg, "prova", adim=25)
            git(pg, base, "#/okuma/1", 2000); C.cek(pg, "okuma-giris", tam=True); yuru(pg, "okuma", adim=25)
            git(pg, base, "#/m1/1", 1500)
            hrefs = pg.evaluate("() => [...document.querySelectorAll('main a[href^=\"#/m1/1/\"]')].map(a => a.getAttribute('href'))")
            for h in list(dict.fromkeys(hrefs))[:2]:
                git(pg, base, h, 2000); C.cek(pg, "medya-giris", tam=True, sinir=2, anahtar="medya-giris"); yuru(pg, "medya", adim=30)
            git(pg, base, "#/garden/1", 2000); C.cek(pg, "bahce-giris", tam=True); yuru(pg, "bahce", adim=12)
        if bol("sinav"):
            # gün sınavı (14. gün: haftanın sınavı), hafta sonu testi, A1 denemesi
            git(pg, base, "#/akis/14", 2500); C.cek(pg, "akis14-giris", tam=True)
            git(pg, base, "#/sinav/14", 2500); C.cek(pg, "sinav14-giris", tam=True); yuru(pg, "sinav14", adim=30)
            git(pg, base, "#/hafta/1", 2500); C.cek(pg, "hafta1-giris", tam=True); yuru(pg, "hafta1", adim=30)
            git(pg, base, "#/sinav/55", 2500); C.cek(pg, "deneme55-giris", tam=True); yuru(pg, "deneme55", adim=25)
            git(pg, base, "#/assess", 2500); C.cek(pg, "assess-giris", tam=True); yuru(pg, "assess", adim=20)
            git(pg, base, "#/akis/8", 2500); C.cek(pg, "akis8-kilitli-ya-da-acik", tam=True)
        if bol("senaryo"):
            sc = "sc:telefon:01-arzttermin"
            git(pg, base, "#/learn/telefon", 1500); C.cek(pg, "alan-telefon", tam=True)
            git(pg, base, f"#/scenario/{sc}", 1500); C.cek(pg, "senaryo-ana", tam=True)
            for s in ["words", "chunks", "build", "drills", "listening", "dialogue", "roleplay"]:
                git(pg, base, f"#/scenario/{sc}/{s}", 1500); C.cek(pg, f"senaryo-{s}", tam=True)
            git(pg, base, f"#/call/{sc}", 2500); C.cek(pg, "rol-oyunu-giris", tam=True)
        if bol("hata"):
            git(pg, base, "#/__crash", 1500); C.cek(pg, "hata-cokme", tam=True)
            git(pg, base, "#/ders/yok:boyle-bir-ders", 2000); C.cek(pg, "hata-olmayan-ders", tam=True)
            git(pg, base, "#/m1/1/yok", 2000); C.cek(pg, "hata-olmayan-kayit", tam=True)
            git(pg, base, "#/akis/999", 2000); C.cek(pg, "hata-olmayan-gun", tam=True)
            git(pg, base, "#/today", 1500)
            ctx.set_offline(True)
            for h in ["#/ders/r0%3A02-monate", "#/m1/2", "#/sozluk", "#/akis/3"]:
                pg.evaluate("(h) => { location.hash = h; }", h); pg.wait_for_timeout(2500); C.cek(pg, "cevrimdisi-" + h[2:].replace("/", "-").replace("%3A", "_"), tam=True)
            ctx.set_offline(False)
        b.close()
        if bol("yz"):
            # yapay zekâ hata ve gecikme durumları (rol oyunu)
            for ad, h in (("yz-hata", lambda t, v: (500, {"error": {"code": "upstream"}})), ("yz-yavas", lambda t, v: ("hang", None))):
                b, ctx, pg = ac(p, ai=h)
                login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
                git(pg, base, "#/call/sc:telefon:01-arzttermin", 2000); C.cek(pg, f"{ad}-giris", tam=True)
                ilerle(pg, False); pg.wait_for_timeout(2000)
                bt = pg.locator("main textarea, main input[type=text]")
                if bt.count():
                    bt.first.fill("Guten Tag, ich brauche einen Termin."); pg.keyboard.press("Enter")
                pg.wait_for_timeout(14000 if ad == "yz-yavas" else 3000); C.cek(pg, f"{ad}-sonra", tam=True)
                b.close()
    srv.shutdown()
    C.yaz()

if __name__ == "__main__":
    main()
