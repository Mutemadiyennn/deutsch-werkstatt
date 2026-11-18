"""
DN-2 §5 (PM-030, BY-12.1a) — internetsiz, mikrofonsuz ve yapay zekâsız durumlar AYRI AYRI sınanır.
  A) İnternetsiz: ilk çevrimiçi açılışta kabuk + BÜTÜN içerik paketi önbelleğe iner (sayı içerik dizininden hesaplanır);
     sonra ağ kapatılır, yeni sekmede soğuk açılış; her senaryonun ana sayfası, bir senaryonun her bölümü ve ana ekranlar
     yürünür; bir diyalogda yazılı cevap internetsiz değerlendirilir (koşulsuz).
  B) Mikrofonsuz (çevrimiçi): konuşma tanıma ve mikrofon yok; diyalogda ve rol oyununda yazarak cevap verilebilir.
  C) Yapay zekâsız (çevrimiçi): sunucu provider=none; yapay zekâ isteği gitmez, doğru cevap reddedilmez,
     ekranlarda geliştirici notu yok (PM-035/8).
  python3 tests/e2e/ucak.py [--browser webkit] [--device "iPhone 15"]
"""
import json, re
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, ERR, content_file

PORT = 4189
SC = "sc:telefon:01-arzttermin"
DEV_NOTES = ["Sunucu adresi", "anahtar", "Cloudflare", "v1'de", "inceleme bekliyor", "undefined", "NaN", "Failed to fetch"]

def expected_files(idx):
    n = {"index.json", "lexemes.json", "assess.json", "grammar.json"}
    def walk(o):
        if isinstance(o, str) and o.endswith(".json"): n.add(o)
        elif isinstance(o, dict): [walk(v) for v in o.values()]
        elif isinstance(o, list): [walk(v) for v in o]
    walk(idx.get("files"))
    return len(n)

def first_b_answer(idx):
    """İlk diyaloğun öğrenci satırına verilecek doğru cevap (yer tutucular doldurulmuş)"""
    s = content_file(idx["files"]["scenarios"][SC])
    line = next(l for l in s["dialogues"][0]["lines"] if l["r"] == "B")
    a = (line.get("accepted") or [line["de"]])[0]
    return re.sub(r"\{([^}|]+)\|[^}]+\}", r"\1", a).replace("{name}", "Kaya")

def dialogue_answer(pg, base, answer):
    """Diyalogda öğrencinin ilk satırına kadar ilerler ve yazılı cevap verir; değerlendirme metni ya da None"""
    pg.goto(base + f"#/scenario/{SC}/dialogue")
    for _ in range(40):
        pg.wait_for_selector("[data-test=answer], [data-test=next]", timeout=10_000)
        if pg.locator("[data-test=answer]").count(): break
        pg.click("[data-test=next]")
    if not pg.locator("[data-test=answer]").count(): return None
    pg.fill("[data-test=answer]", answer); pg.click("[data-test=submit]")
    try: pg.wait_for_selector("[data-test=verdict]", timeout=8000); return pg.inner_text("[data-test=verdict]")
    except Exception: return None

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    idx = content_file("index.json"); want = expected_files(idx); ans = first_b_answer(idx)
    scenarios = [s["id"] for s in idx.get("scenarios", [])]
    with sync_playwright() as p:
        # ---------- A) internetsiz ----------
        b, ctx = launch(p, service_workers="allow"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        st = pg.evaluate("""async (want) => {
          await navigator.serviceWorker.ready;
          for (let i = 0; i < 160; i++) {
            let shell = false, content = 0;
            for (const k of await caches.keys()) {
              const c = await caches.open(k); const done = await c.match('__complete');
              if (k.startsWith('dw2-shell-') && done) shell = true;
              if (k.startsWith('dw2-c-') && done) content = (await c.keys()).filter(r => r.url.includes('/content/')).length;
            }
            if (navigator.serviceWorker.controller && shell && content >= want) return { shell, content };
            await new Promise(r => setTimeout(r, 250));
          }
          return { shell: false, content: 0 };
        }""", want)
        check(st["shell"] and st["content"] >= want, f"A: kabuk ve içerik paketi tam önbellekte ({st['content']}/{want} dosya)")
        ctx.set_offline(True)
        pg.close(); pg = new_page(ctx)  # soğuk açılış: yeni sekme, ağ yok
        pg.goto(base); pg.wait_for_selector("[data-tab=today]", timeout=10_000)
        check(True, "A: uçak modunda soğuk açılış")
        walk = [("#/today", "[data-test=next-activity]"), ("#/learn", "main h1, main h2"), ("#/progress", "[data-test=panel-focus]"), ("#/profile", "main h1, main h2")]
        walk += [(f"#/scenario/{s}", "[data-section]") for s in scenarios]  # açılmamış senaryolar da (PM-035/6)
        walk += [(f"#/scenario/{SC}/{sec}", sel) for sec, sel in [
            ("words", "[data-test=stage-intro]"), ("chunks", "[data-test=ifade-card], [data-test=say-q], [data-test=meaning-q], [data-test=section-done], .empty"),
            ("build", "[data-test=answer], [data-chip], [data-test=section-done]"), ("drills", "[data-test=answer], [data-chip], button.opt"),
            ("listening", "[data-test=to-questions], button.opt"), ("dialogue", "[data-test=next], [data-test=answer]"), ("roleplay", "[data-test=rp-start]")]]
        walk += [(f"#/call/{SC}", "[data-test=call]")]
        bad = []
        for h, sel in walk:
            pg.goto(base + h)
            try: pg.wait_for_selector(sel, timeout=10_000); shown = True
            except Exception: shown = False
            txt = pg.inner_text("main") if pg.locator("main").count() else ""
            if not shown or pg.locator(".card.err, [role=alert]").count() or "yüklenemedi" in txt: bad.append(h)
        check(not bad, f"A: {len(walk)} ekran internetsiz açıldı, hata paneli yok" + (f" — sorunlu: {bad}" if bad else ""))
        v = dialogue_answer(pg, base, ans)
        check(v is not None and "Şöyle olmalı" not in v, f"A: diyalogda doğru cevap internetsiz değerlendirildi ({(v or '')[:40]!r})")
        ctx.set_offline(False); b.close()

        # ---------- B) mikrofonsuz ----------
        b, ctx = launch(p)
        ctx.add_init_script("""
          for (const k of ['SpeechRecognition', 'webkitSpeechRecognition']) { try { Object.defineProperty(window, k, { value: undefined, configurable: true }); } catch (e) {} }
          if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException('no mic', 'NotAllowedError'));
        """)
        pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        v = dialogue_answer(pg, base, ans)
        check(v is not None, "B: mikrofon yokken diyalogda yazarak cevap verildi")
        pg.goto(base + f"#/scenario/{SC}/roleplay"); pg.wait_for_selector("[data-test=rp-start]"); pg.click("[data-test=rp-start]")
        try: pg.wait_for_selector("[data-test=answer]", timeout=10_000); ok = True
        except Exception: ok = False
        check(ok, "B: mikrofon yokken rol oyununda yazı alanı var")
        b.close()

        # ---------- C) yapay zekâsız ----------
        AI_CALLS = []
        def api(route):
            u = route.request.url
            if u.endswith("/v1/health"):
                return route.fulfill(status=200, content_type="application/json", body=json.dumps({"ok": True, "version": "e2e", "time": "", "provider": "none", "configured": {"gemini": False, "allowlist": True}}))
            if u.endswith("/v1/usage"):
                return route.fulfill(status=200, content_type="application/json", body=json.dumps({"ai": {"used": 0, "limit": 300}}))
            AI_CALLS.append(u)
            return route.fulfill(status=503, content_type="application/json", body=json.dumps({"error": {"code": "not_configured", "message_tr": "x"}}))
        b, ctx = launch(p); pg = ctx.new_page()
        pg.on("pageerror", lambda e: ERR.append("sayfa hatası: " + str(e)))
        pg.route("https://api.e2e.test/**", api)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.wait_for_timeout(500)  # sağlayıcı yoklaması (health)
        v = dialogue_answer(pg, base, ans)
        check(v is not None and "Şöyle olmalı" not in v, f"C: doğru cevap yapay zekâsız reddedilmedi ({(v or '')[:40]!r})")
        pg.goto(base + f"#/scenario/{SC}/roleplay"); pg.wait_for_selector("[data-test=rp-start]"); pg.click("[data-test=rp-start]")
        pg.wait_for_timeout(800)
        check(not AI_CALLS, f"C: sağlayıcı kapalıyken yapay zekâ isteği gönderilmedi ({len(AI_CALLS)})")
        found = []
        for h in ["#/today", "#/learn", "#/profile", f"#/scenario/{SC}", f"#/scenario/{SC}/roleplay"]:
            pg.goto(base + h); pg.wait_for_timeout(600)
            t = pg.inner_text("body")
            found += [f"{h}: {w}" for w in DEV_NOTES if w in t]
        check(not found, "C: öğrenciye geliştirici notu gösterilmiyor" + (f" — {found}" if found else ""))
        b.close()
    srv.shutdown()
    check(not [e for e in ERR if e.startswith("sayfa hatası")], "sayfa hatası yok")
    finish()

if __name__ == "__main__":
    main()
