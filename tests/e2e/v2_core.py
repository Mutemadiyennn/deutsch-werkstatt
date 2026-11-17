"""
v2 çekirdek uygulama uçtan uca testi (Playwright, gerçek Chromium).
Çalıştırma: python3 tests/e2e/v2_core.py [--shots DIR]
Önkoşul: npm run content:build && (cd web && npx vite build --mode e2e --outDir dist-e2e)
Sunucu (Worker) Playwright ile taklit edilir: https://api.e2e.test/v1/*
"""
import json, os, sys, threading, functools, http.server, socketserver
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DIST = os.path.join(ROOT, "web", "dist-e2e")
SHOTS = sys.argv[sys.argv.index("--shots") + 1] if "--shots" in sys.argv else None
PORT = 4180
ERR = []
API_CALLS = []

def check(cond, msg):
    print(("  ✓ " if cond else "  ✗ ") + msg)
    if not cond: ERR.append(msg)

def serve():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIST)
    http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
    socketserver.TCPServer.allow_reuse_address = True
    s = socketserver.TCPServer(("127.0.0.1", PORT), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s

def api_route(route):
    req = route.request
    API_CALLS.append({"url": req.url, "auth": req.headers.get("authorization"), "body": req.post_data})
    cors = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}
    if req.method == "OPTIONS":
        return route.fulfill(status=204, headers={**cors, "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Allow-Methods": "GET, POST"})
    if req.url.endswith("/v1/health"):
        return route.fulfill(status=200, headers=cors, body=json.dumps({"ok": True, "version": "0.1.0", "time": "x", "configured": {"gemini": True, "allowlist": True}}))
    if req.url.endswith("/v1/usage"):
        return route.fulfill(status=200, headers=cors, body=json.dumps({"day": "2026-11-17", "ai": {"used": 3, "limit": 300}}))
    if req.url.endswith("/v1/ai/run"):
        return route.fulfill(status=200, headers=cors, body=json.dumps({"task": "equiv_check", "output": {"ok": False, "reason_tr": "Fiil biçimi yanlış."}, "model": "m", "ms": 5}))
    return route.fulfill(status=404, headers=cors, body="{}")

def shot(page, name):
    if SHOTS:
        os.makedirs(SHOTS, exist_ok=True)
        page.screenshot(path=os.path.join(SHOTS, name + ".png"), full_page=True)

def no_overflow(page, where):
    sw = page.evaluate("document.documentElement.scrollWidth")
    check(sw <= 390, f"{where}: yatay taşma yok (scrollWidth {sw})")

def answer_current(page, i):
    """Görünen maddeyi cevapla: her 3 maddeden biri 'Bilmiyorum', diğerleri bir cevap"""
    if page.locator("[data-test=feedback]").count():
        return
    if i % 3 == 2:
        page.click("[data-test=dunno]"); return
    if page.locator("button.opt[data-opt]").count():
        page.locator("button.opt[data-opt]").first.click(); return
    if page.locator("[data-chip]").count():
        n = page.locator("[data-chip]").count()
        for _ in range(n):
            page.locator("[data-chip]:not([disabled])").first.click()
        page.click("[data-test=check]"); return
    if page.locator("[data-test=answer]").count():
        page.fill("[data-test=answer]", "Ich habe einen Termin")
        page.locator("form button[type=submit]").click(); return
    page.click("[data-test=dunno]")

def main():
    srv = serve()
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, locale="tr-TR")
        page = ctx.new_page()
        page.on("pageerror", lambda e: ERR.append("sayfa hatası: " + str(e)))
        page.route("https://api.e2e.test/**", api_route)
        page.goto(f"http://127.0.0.1:{PORT}/")

        print("1) giriş")
        page.wait_for_selector("text=Almancayı gerçek hayat için öğren")
        page.click("summary")
        page.fill("#em", "test@example.com"); page.fill("#pw", "yanlis")
        page.click("button[type=submit]")
        page.wait_for_selector("[role=alert]")
        check("uygulama şifresi yanlış" in page.inner_text("[role=alert]"), "yanlış şifrede Türkçe hata aynı ekranda")
        page.fill("#pw", "e2e-pass"); page.click("button[type=submit]")

        print("2) ilk kurulum")
        page.wait_for_selector("text=Hoş geldin")
        shot(page, "01-onboarding")
        page.click("text=Başlayalım")
        page.click("[data-struggle=phone]"); page.click("[data-struggle=fast]")
        page.click("text=Devam")
        page.wait_for_selector("text=Öncelik sırası")
        first = page.locator("ol.list li").first.inner_text()
        check("Telefon" in first, f"telefonda zorlanan için ilk alan telefon ({first.strip()[:30]})")
        page.click("text=Devam")
        check(page.input_value("#goal") == "100", "varsayılan günlük hedef 100 dk")
        page.click("text=Devam")
        page.click("[data-test=start-assess]")

        print("3) seviye tespiti (yarıda yeniden yükleyip devam)")
        page.wait_for_selector("[data-test=assess-begin]")
        page.click("[data-test=assess-begin]")
        for i in range(8):
            page.wait_for_selector("[data-test=feedback], button.opt[data-opt], [data-chip], [data-test=answer]")
            answer_current(page, i)
            page.wait_for_selector("[data-test=feedback]")
            page.click("[data-test=next]")
        before = page.locator(".row.between.small.muted span").first.inner_text()
        page.reload()
        page.wait_for_selector("[data-test=feedback], button.opt[data-opt], [data-chip], [data-test=answer]")
        after = page.locator(".row.between.small.muted span").first.inner_text()
        check(before.split("/")[0].strip() == after.split("/")[0].strip(), f"yeniden yüklemeden sonra kaldığı yerden devam ({before} → {after})")
        shot(page, "02-assess-item")
        i = 8
        while not page.locator("[data-test=overall]").count() and i < 80:
            page.wait_for_selector("[data-test=feedback], button.opt[data-opt], [data-chip], [data-test=answer], [data-test=overall]")
            if page.locator("[data-test=overall]").count(): break
            answer_current(page, i)
            page.wait_for_selector("[data-test=feedback]")
            page.click("[data-test=next]")
            i += 1
        page.wait_for_selector("[data-test=overall]")
        check(i < 45, f"tespit {i} maddede bitti (uyarlama)")
        overall = page.inner_text("[data-test=overall]")
        check(overall in ("A1 öncesi", "A1", "A2", "B1"), f"genel sonuç gösterildi: {overall}")
        check("sınav sonucu değil" in page.inner_text("main"), "sonuç özeti 'sınav sonucu değil' uyarısını içeriyor")
        ai_calls = [c for c in API_CALLS if c["url"].endswith("/v1/ai/run")]
        check(len(ai_calls) >= 1, f"konuşma maddesinde yanlış cevap sunucudaki öğretmene soruldu ({len(ai_calls)} çağrı)")
        if ai_calls:
            check(ai_calls[0]["auth"] == "Bearer e2e-token", "yapay zekâ isteğinde Firebase token başlıkta")
            body = json.loads(ai_calls[0]["body"])
            check(body["task"] == "equiv_check" and "answer" in body["vars"] and "prompt" not in json.dumps(body).lower().replace("prompt_tr", ""), "istekte yalnızca görev adı ve değişkenler var (prompt metni yok)")
        shot(page, "03-assess-result")
        no_overflow(page, "sonuç")

        print("4) Bugün")
        page.click("text=Bugün'e git")
        page.wait_for_selector("[data-test=next-activity]")
        na = page.inner_text("[data-test=next-activity]")
        check("Seans 1" in na and "Doktordan telefonla randevu almak" in na, "sıradaki etkinlik: seans 1 → telefon senaryosu")
        check("İçerik inceleme bekliyor" in na, "inceleme bekleyen içerik etiketli")
        page.wait_for_selector("[data-test=weak] li")
        weak = page.inner_text("[data-test=weak]")
        check("Seviye tespitinde" not in weak and "Şu an listede kelime yok" not in weak, "bilinmeyen kelimeler zayıflık listesinde")
        check("0 / 100 dk" in page.inner_text("[data-test=today-min]") or "/ 100 dk" in page.inner_text("[data-test=today-min]"), "günlük 100 dk hedefi görünüyor")
        shot(page, "04-today")
        no_overflow(page, "Bugün")

        print("5) senaryo çalışma sayfası ve odak sayacı (sahte saat)")
        page.clock.install()
        page.goto(f"http://127.0.0.1:{PORT}/#/scenario/" + "sc%3Atelefon%3A01-arzttermin")
        page.reload()
        page.wait_for_selector("[data-test=chunks]")
        check("Könnten Sie das bitte wiederholen?" in page.inner_text("[data-test=chunks]"), "temel ifadeler Hochdeutsch katmanıyla")
        check("Wie bitte?" in page.inner_text("[data-test=chunks]"), "gündelik (Alltagsdeutsch) katmanı görünüyor")
        shot(page, "05-scenario")
        no_overflow(page, "senaryo")
        for m in range(26):
            page.dispatch_event("body", "pointerdown")
            page.clock.run_for(60_000)
        page.click("[data-tab=today]")
        page.wait_for_selector("[data-test=break]")
        check("1. seans tamam" in page.inner_text("[data-test=break]").lower(), "25 dk aktif çalışmadan sonra mola başladı")
        check("1/4 seans" in page.inner_text("[data-test=sessions-done]"), "tamamlanan seans 1/4")
        shot(page, "06-break")
        page.clock.run_for(5 * 60_000 + 2000)
        page.wait_for_selector("[data-test=focus-idle]")
        check("Seans 2" in page.inner_text("[data-test=focus-idle]"), "mola bitince seans 2 önerisi (cümle kurma)")

        print("6) İlerlemem")
        page.click("[data-tab=progress]")
        page.wait_for_selector("[data-test=panel-focus]")
        pf = page.inner_text("[data-test=panel-focus]")
        check("25 / 100 dk" in pf or "26 / 100 dk" in pf, "odak paneli bugünkü süreyi gösteriyor")
        check("mola" in pf.lower() and "eklenmez" in pf, "mola süresi ayrı gösteriliyor")
        pl = page.inner_text("[data-test=panel-language]")
        check("Tahmini başlangıç seviyesi" in pl and "Tanıdığın kelimeler" in pl, "dil paneli ayrı ve seviye tespitine dayanıyor")
        shot(page, "07-progress")
        no_overflow(page, "İlerlemem")

        print("7) Profil: hedef değişikliği kalıcı; sunucu iletişimi")
        page.clock.resume()
        page.click("[data-tab=profile]")
        page.select_option("[data-test=goal]", "120")
        page.wait_for_selector("text=✓ Kaydedildi")
        page.click("text=Sunucu bağlantısını kontrol et")
        try:
            page.wait_for_selector("[data-test=server]:has-text('Bugünkü')", timeout=10000)
        except Exception:
            print("    sunucu metni:", page.inner_text("[data-test=server]") if page.locator("[data-test=server]").count() else "(yok)")
        srvtxt = page.inner_text("[data-test=server]")
        check("Sunucu çalışıyor" in srvtxt and "3/300" in srvtxt, "sunucu durumu ve kullanım gösterildi")
        usage = [c for c in API_CALLS if c["url"].endswith("/v1/usage")]
        check(usage and usage[-1]["auth"] == "Bearer e2e-token", "kullanım isteğinde token var")
        health = [c for c in API_CALLS if c["url"].endswith("/v1/health")]
        check(health and health[-1]["auth"] is None, "health isteğinde token gönderilmiyor")
        shot(page, "08-profile")
        no_overflow(page, "Profil")
        page.reload()
        page.click("[data-tab=today]")
        page.wait_for_selector("[data-test=today-min]")
        check("/ 120 dk" in page.inner_text("[data-test=today-min]"), "yeni hedef (120 dk) yeniden yüklemeden sonra korunuyor")

        print("8) Öğren")
        page.click("[data-tab=learn]")
        page.wait_for_selector("[data-domain=telefon]")
        check(page.locator("[data-domain]").count() == 13, "13 gerçek hayat alanı listeleniyor")
        check(page.locator("[data-domain]").first.get_attribute("data-domain") == "telefon", "alanlar öncelik sırasına göre")
        page.click("[data-domain=amt]")
        page.wait_for_selector("text=İlgili v1 kurs üniteleri")
        check("A1-09" in page.inner_text("main"), "v2 içeriği olmayan alanda v1 üniteleri bağlantısı")
        shot(page, "09-learn-domain")

        print("9) sekme çubuğu içeriği örtmüyor; koyu tema")
        page.click("[data-tab=profile]")
        page.wait_for_selector("text=Çıkış yap")
        page.wait_for_timeout(300)
        page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
        page.wait_for_timeout(200)
        last = page.evaluate("(() => { const m = document.querySelector('main'); const r = m.lastElementChild.getBoundingClientRect(); const t = document.querySelector('.tabbar').getBoundingClientRect(); return [r.bottom, t.top]; })()")
        check(last[0] <= last[1] + 1, f"son kart sekme çubuğunun üstünde ({last[0]:.0f} ≤ {last[1]:.0f})")
        page.click("text=Koyu")
        page.click("[data-tab=today]")
        shot(page, "10-today-dark")

        b.close()
    srv.shutdown()
    print("HATALAR:", "yok" if not ERR else "\n  " + "\n  ".join(ERR))
    sys.exit(1 if ERR else 0)

if __name__ == "__main__":
    main()
