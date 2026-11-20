"""
#58 A5 (Seans 2) temel ders oynatıcısı — R0 dersi baştan sona:
  - Öğren → Temel dersler → ders; tanıtım kartları (ses, artikel renkli, açıklama), tablo, anla/kur/söyle maddeleri,
    diyalog, dinleme (önce metinsiz), dışarıda dene görevi, bitiş özeti
  - yanlış cevapta doğrusu öğrencinin cevabıyla yan yana; doğru cevap reddi yok (e2e derlemesinde data-cevap)
  - yarıda bırakılan ders kaldığı yerden sürer; %130 yazıda taşma yok
  python3 tests/e2e/v2_ders.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots] [--scheme dark]
"""
import re
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4195

def state(pg):
    return pg.evaluate("""() => { const m = document.querySelector('[data-test=ders]'); return m ? (m.dataset.adim || '') + (m.dataset.pos || '') + ((document.querySelector('[data-test=ders-hatirla]') || {dataset: {}}).dataset.q || '') + 'b' + ((document.querySelector('[data-test=ders-bahce]') || {dataset: {}}).dataset.q || '') + (document.querySelector('[data-test=ders-bitti]') ? 'B' : '') : ''; }""")

def wait_change(pg, before):
    pg.wait_for_function("""(b) => { const m = document.querySelector('[data-test=ders]'); if (!m) return true;
      return (m.dataset.adim || '') + (m.dataset.pos || '') + ((document.querySelector('[data-test=ders-hatirla]') || {dataset: {}}).dataset.q || '') + 'b' + ((document.querySelector('[data-test=ders-bahce]') || {dataset: {}}).dataset.q || '') + (document.querySelector('[data-test=ders-bitti]') ? 'B' : '') !== b; }""", arg=before)

def step(pg, wrong=False, donustur=None):
    before = state(pg)
    if pg.locator("[data-test=altyazi]").count():
        pg.click("[data-test=altyazi]"); pg.wait_for_selector("[data-test=diyalog-metin]")
    if pg.locator("[data-test=ders-bahce]").count():  # B5: Bahçede bugün görülen kelimenin cümle içi seçmeli boşluğu
        pg.locator("[data-test=ders-bahce] button.opt:not([data-right])" if wrong else "[data-test=ders-bahce] button.opt[data-right]").first.click()
    elif pg.locator("[data-test=drill-pick]").count():
        pg.locator("button.opt:not([data-right])" if wrong else "button.opt[data-right]").first.click()
    elif pg.locator("[data-test=drill-order]").count():
        cev = pg.get_attribute("[data-test=drill-order]", "data-cevap")
        for w in [x.strip(".,!?;:„“\"") for x in cev.split()]:
            if w: pg.locator(f"[data-test=drill-order] .wchip[data-chip='{w}']:not([disabled])").first.click()
        pg.click("[data-test=submit]")
    elif pg.locator("[data-test^=drill-]").count():
        sec = pg.locator("[data-test^=drill-]").first
        # adsız profil: öğrenci kendi adını yazar (yer tutucu ad değildir; bilinen kelime "Name" ad sayılmaz)
        cevap = (sec.get_attribute("data-cevap") or "").replace("{name}", "Ayşe")
        pg.fill("[data-test=answer]", "xyz falsch" if wrong else (donustur(cevap) if donustur else cevap)); pg.click("[data-test=submit]")
    elif pg.locator("[data-test=ders-dinleme]").count():
        pg.click("[data-test=dinle]")
        while pg.locator("[data-test=ders-dinleme] button.opt").count() and not pg.locator("[data-test=dinleme-metin]").count():
            pg.locator("button.opt[data-right]").first.click(); pg.click("[data-test=next]")
    pg.wait_for_selector("[data-test=next], [data-test=claim]")
    band = pg.inner_text(".actionbar") if pg.locator(".actionbar").count() else ""
    pg.locator("[data-test=next]").first.click()
    wait_change(pg, before)
    return band

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/learn"); pg.wait_for_selector("[data-test=temel-liste]")
        check(pg.locator("[data-test=temel-ders]").count() >= 10, f"temel dersler listede ({pg.locator('[data-test=temel-ders]').count()})")
        # Şölen 1 (inceleme #87 2. tur): cevap anında uçan XP toplamı = kaydedilen XP − adım XP'si (ders sonu 10)
        pg.evaluate("""() => { window.__ucus = 0; window.__kayit = 0; addEventListener('dw:xp-ucus', (e) => { window.__ucus += e.detail.n; });
          addEventListener('dw:xp', (e) => { window.__kayit += e.detail.n; }); }""")
        pg.locator("[data-test=temel-ders]").first.click(); pg.wait_for_selector("[data-test=ders-diyalog]")
        check(pg.locator("[data-test=diyalog-metin]").count() == 0, "önce dinle: diyalog metni ilk dinlemede kapalı (phases/09)")
        # inceleme #150 P2: içerikten gelen başlık büyük harfe çevrilmez (Türkçe yerelde Almanca adlar "PİCHLER" olmasın)
        tt = pg.evaluate("() => { const k = document.querySelector('[data-test=ders-diyalog] .kicker'); return k ? [k.className, getComputedStyle(k).textTransform] : null; }")
        check(tt is not None and "icerik" in tt[0] and tt[1] == "none", f"diyalog başlığı içerik kicker'ı, büyük harf dönüşümü yok ({tt})")
        step(pg); pg.wait_for_selector("[data-test=ders-tanit]")
        n_teach = pg.locator("[data-test=teach]").count()
        check(1 <= n_teach <= 4, f"tanıtım 4'lük gruplarla ({n_teach} kart)")
        check(pg.locator("[data-test=teach] [lang=de]").count() >= n_teach, "kartlarda Almanca işaretli (lang=de)")
        no_overflow(pg, "ders tanıtım")
        if shots: shot(pg, "d01-tanitim", full=False)
        seen = set(); k = 0; wrong_done = False
        while not pg.locator("[data-test=ders-bitti]").count() and k < 200:
            a = pg.get_attribute("[data-test=ders]", "data-adim"); seen.add(a)
            if a == "tablo" and shots: shot(pg, "d02-tablo", full=False)
            if a == "kurma" and not wrong_done and pg.locator("[data-test=drill-gap], [data-test=drill-tr_de]").count():
                band = step(pg, wrong=True); wrong_done = True
                if shots: shot(pg, "d04-sonraki-madde", full=False)
                check("Doğrusu" in band and "Senin cevabın" in band, "yanlışta doğrusu öğrencinin cevabıyla yan yana")
                k += 1; continue
            if a == "kurma" and "yazim" not in seen and pg.locator("[data-test=drill-tr_de]").count():
                c = pg.get_attribute("[data-test=drill-tr_de]", "data-cevap") or ""
                if re.search(r"\s[A-ZÄÖÜ]\w", c) and "{name}" not in c:
                    # #58 A11: küçük harfle yazılan doğru cevap kabul edilir, isimlerin büyük harfi gösterilir
                    band = step(pg, donustur=lambda x: x.lower()); seen.add("yazim")
                    check(band.startswith("Doğru") and "büyük harf" in band, f"küçük harfli doğru cevap kabul, büyük harf notu ({band[:90]!r})")
                    k += 1; continue
            if a == "kurma" and k > 12 and "yarida" not in seen:
                # yarıda bırak → yeniden aç: kaldığı yerden
                pos = pg.get_attribute("[data-test=ders]", "data-pos")
                pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today]"); pg.go_back(); pg.wait_for_selector("[data-test=ders]")
                check(pg.get_attribute("[data-test=ders]", "data-pos") == pos, f"yarıda bırakılan ders kaldığı yerden ({pos})")
                seen.add("yarida")
            band = step(pg)
            if a in ("anlama", "kurma", "konusma") and ("Doğrusu" in band or "denetleyemedi" in band):
                check(False, f"doğru cevap reddedildi ({a}: {band[:60]!r})")
            if a == "tanit" and pg.locator("[data-test=ders-hatirla]").count():
                if "hatirla" not in seen and shots: shot(pg, "d05-hatirla", full=False)
                seen.add("hatirla")
            k += 1
        check(pg.locator("[data-test=ders-bitti]").count() == 1, f"ders baştan sona bitti ({k} adım)")
        check({"tanit", "tablo", "anlama", "kurma", "konusma", "dinleme", "gorev", "hatirla"} <= seen, f"bütün adımlar geçildi; kartlardan sonra hatırlama turu var ({sorted(seen)})")
        txt = pg.inner_text("[data-test=ders-bitti]")
        check("doğru" in txt and "undefined" not in txt and "NaN" not in txt, "bitiş özeti")
        check(pg.locator("[data-test=ders-bitti] [data-test=kutlama]").count() == 1, "ders bu oturumda bitince kutlama var")
        pg.wait_for_function("() => window.__kayit >= 10", timeout=5000); pg.wait_for_timeout(300)
        uc, kay = pg.evaluate("[window.__ucus, window.__kayit]")
        check(uc > 0 and uc == kay - 10, f"uçan XP ({uc}) = kaydedilen ({kay}) − ders adımı (10)")
        if shots: shot(pg, "d03-bitti", full=False)
        # bitmiş ders yeniden açılınca boş kutlama ("+0 XP", konfeti) yok (inceleme #87 P2)
        pg.reload(); pg.wait_for_selector("[data-test=ders-bitti]")
        check(pg.locator("[data-test=kutlama]").count() == 0 and pg.locator("[data-test=ozet-xp]").count() == 0, "bitmiş ders yeniden açılınca kutlama ve XP kutusu yok")
        pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
        pg.goto(base + "#/learn"); pg.wait_for_selector("[data-test=temel-liste]"); pg.locator("[data-test=temel-ders]").nth(1).click(); pg.wait_for_selector("[data-test=ders-diyalog]")
        pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
        no_overflow(pg, "%130 yazı ders")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
