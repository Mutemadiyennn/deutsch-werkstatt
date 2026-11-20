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
import json, os, re, urllib.parse
from playwright.sync_api import sync_playwright
from common import CORS, serve, launch, new_page, login_onboard, check, finish, ERR, content_file

PORT = 4189
SC = "sc:telefon:01-arzttermin"
# geliştirici notuna özgü ifadeler; çıplak "anahtar" ders içeriğiyle çakışıyordu ("der Schlüssel — anahtar"; inceleme #133)
DEV_NOTES = ["Sunucu adresi", "anahtar eksik", "API anahtar", "Cloudflare", "v1'de", "inceleme bekliyor", "undefined", "NaN", "Failed to fetch"]

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
        medya = (idx.get("files") or {}).get("medya") or []
        # M1 günü medya kullanıyorsa pakette medya olmalı: denetimler sessizce atlanmaz (inceleme #74 2. tur)
        m1_medya = [x for g in idx.get("m1", []) for x in g.get("medya", []) if x.get("kind") == "video"]
        if m1_medya: check(bool(medya), f"A: M1 medyası pakette ({len(medya)} dosya, {len(m1_medya)} kullanım)")
        if medya:
            # A12: M1 medyası (video, ses) ayrı önbellekte tamamlanır
            mt = pg.evaluate("""async (n) => { for (let i = 0; i < 160; i++) { for (const k of await caches.keys()) if (k.startsWith('dw2-m-')) {
                const c = await caches.open(k); if (await c.match('__complete')) return (await c.keys()).filter(r => r.url.includes('/media/')).length; }
              await new Promise(r => setTimeout(r, 250)); } return 0; }""", len(medya))
            check(mt >= len(medya), f"A: M1 medyası önbellekte ({mt}/{len(medya)} dosya)")
        ctx.set_offline(True)
        pg.close(); pg = new_page(ctx)  # soğuk açılış: yeni sekme, ağ yok
        pg.goto(base); pg.wait_for_selector("[data-tab=today]", timeout=10_000)
        check(True, "A: uçak modunda soğuk açılış")
        walk = [("#/today", "[data-test=next-activity]"), ("#/learn", "main h1, main h2"), ("#/progress", "[data-test=panel-focus]"), ("#/profile", "main h1, main h2"), ("#/sozluk", "[data-test=sozluk-q]")]
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
        # #58 B1: sözlük araması internetsiz (cihazdaki kartlar)
        pg.goto(base + "#/sozluk"); pg.wait_for_selector("[data-test=sozluk-q]"); pg.fill("[data-test=sozluk-q]", "Termin")
        pg.wait_for_selector("[data-test=sozluk-satir], [data-test=sozluk-yok]")
        check(pg.locator("[data-test=sozluk-satir]").count() >= 1, "A: sözlük araması internetsiz sonuç veriyor (Termin)")
        v = dialogue_answer(pg, base, ans)
        check(v is not None and "Şöyle olmalı" not in v, f"A: diyalogda doğru cevap internetsiz değerlendirildi ({(v or '')[:40]!r})")
        if medya:
            # Safari <video> aralıklı istek ister: servis işçisi önbellekten 206 kısmi yanıt verir
            u = f"{base}content/{idx['version']}/{medya[0]}"
            r = pg.evaluate("""async (u) => { const out = {};
              for (const h of ['bytes=0-99', 'bytes=0-1', 'bytes=10-', 'bytes=-10', 'bytes=99999999-', 'bytes=5-2']) {
                const x = await fetch(u, { headers: { Range: h } }); out[h] = { s: x.status, n: (await x.arrayBuffer()).byteLength, cr: x.headers.get('content-range') }; }
              return out; }""", u)
            boy = int((r["bytes=0-99"]["cr"] or "/0").split("/")[-1])
            check(r["bytes=0-99"]["s"] == 206 and r["bytes=0-99"]["n"] == 100 and (r["bytes=0-99"]["cr"] or "").startswith("bytes 0-99/"), f"A: medya internetsiz aralıklı istekle geliyor ({r['bytes=0-99']})")
            check(r["bytes=0-1"]["n"] == 2 and r["bytes=10-"]["n"] == boy - 10 and r["bytes=-10"]["n"] == 10 and r["bytes=99999999-"]["s"] == 416 and r["bytes=5-2"]["s"] == 200,
                  f"A: aralık biçimleri (0-1, a-, -n, 416, geçersiz → 200) doğru ({ {k: (v['s'], v['n']) for k, v in r.items()} })")
            # M1 yolu internetsiz: Yol, günün temel dersi, medya oynatıcısı
            m1w = [("#/yol", "[data-test=yol]")]
            if idx.get("temel"): m1w.append((f"#/ders/{urllib.parse.quote(idx['temel'][0]['id'], safe='')}", "[data-test=ders]"))
            vid = next(((g["day"], x["id"]) for g in idx.get("m1", []) for x in g.get("medya", []) if x["kind"] == "video"), None)
            if idx.get("m1") and idx["m1"][0].get("medya"): m1w.append((f"#/m1/{idx['m1'][0]['day']}/{urllib.parse.quote(idx['m1'][0]['medya'][0]['id'], safe='')}", "[data-test=medya]"))
            kotu = []
            for h, sel in m1w:
                pg.goto(base + h)
                try: pg.wait_for_selector(sel, timeout=10_000)
                except Exception: kotu.append(h)
            check(not kotu, f"A: M1 ekranları internetsiz açıldı ({len(m1w)})" + (f" — sorunlu: {kotu}" if kotu else ""))
            if vid:
                # <video> öğesi internetsiz gerçekten yükleniyor (yalnızca kap değil; inceleme #74 P1-2)
                pg.goto(base + f"#/m1/{vid[0]}/{urllib.parse.quote(vid[1], safe='')}"); pg.wait_for_selector("[data-test=medya]")
                ok = pg.wait_for_function("() => { const v = document.querySelector('video'); return !!v && v.readyState >= 1 || !!document.querySelector('[data-test=video-yok]'); }", timeout=15_000)
                rs = pg.evaluate("() => ({ rs: document.querySelector('video')?.readyState ?? -1, yok: !!document.querySelector('[data-test=video-yok]') })")
                check(rs["rs"] >= 1 and not rs["yok"], f"A: video internetsiz yüklendi (readyState {rs['rs']}, video-yok {rs['yok']})")
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
        # D-097: kuralların tanımadığı yakın cevap → "kontrol edemedim"; öğrenci "aynı anlamda" derse doğru sayılır
        # kurallara yakın ama tanınmayan biçimler; her deneme yeni bağlamda (diyalog ilerlemesi kalıcı, ilk öğrenci satırı)
        w = ans.rstrip(".!?").split()
        cands = [" ".join(w[:2] + ["wirklich"] + w[2:]) + ".", " ".join(w[:-1] + ["auch"] + w[-1:]) + ".", " ".join(w[1:] + w[:1]) + "."]
        v2 = None
        for near in cands:
            b2, c2 = launch(p); pg2 = c2.new_page(); pg2.route("https://api.e2e.test/**", api)
            login_onboard(pg2, PORT); pg2.wait_for_selector("[data-tab=today]"); pg2.wait_for_timeout(400)
            v2 = dialogue_answer(pg2, base, near)
            if v2 and "kontrol edemedim" in v2: pg = pg2; break
            b2.close()
        check(v2 is not None and "kontrol edemedim" in v2, f"C: tanınmayan yakın cevap 'kontrol edemedim' ({(v2 or '')[:50]!r})")
        # koşulsuz: düğme yoksa kırmızı (inceleme #43 3. tur)
        check(pg.locator("[data-test=claim]").count() == 1, "C: 'kontrol edemedim' bandında 'Evet, aynı anlamda' düğmesi var")
        if pg.locator("[data-test=claim]").count():
            pg.click("[data-test=claim]"); pg.wait_for_selector("text=Kaydedildi")
            check(pg.locator("[data-test=next]").count() == 1, "C: 'Evet, aynı anlamda' → kaydedildi, devam edilebilir")
        pg.goto(base + f"#/scenario/{SC}/roleplay"); pg.wait_for_selector("[data-test=rp-start]"); pg.click("[data-test=rp-start]")
        pg.wait_for_timeout(800)
        check(not AI_CALLS, f"C: sağlayıcı kapalıyken yapay zekâ isteği gönderilmedi ({len(AI_CALLS)})")
        # seviye tespiti: listeyle eşleşmeyen cevap sağlayıcı kapalıyken sunucuya sorulmaz, "Öğretmen kontrolü yapılamadı" çıkmaz (inceleme #123 P1-1)
        pg.goto(base + "#/assess"); pg.wait_for_selector("[data-test=assess-begin]"); pg.click("[data-test=assess-begin]")
        notlar = []
        for i in range(30):
            pg.wait_for_selector("[data-test=feedback], button.opt[data-opt], [data-chip], [data-test=answer], [data-test=overall]")
            if pg.locator("[data-test=overall]").count(): break
            if not pg.locator("[data-test=feedback]").count():
                if pg.locator("[data-test=answer]").count():
                    pg.fill("[data-test=answer]", "Ich habe einen Termin"); pg.locator("form button[type=submit]").click()
                elif pg.locator("button.opt[data-opt]").count(): pg.locator("button.opt[data-opt]").first.click()
                else: pg.click("[data-test=dunno]")
                pg.wait_for_selector("[data-test=feedback]")
            notlar.append(pg.inner_text("[data-test=feedback]"))
            pg.click("[data-test=next]")
        check(not AI_CALLS and not any("Öğretmen kontrolü yapılamadı" in n for n in notlar), f"C: tespitte sağlayıcı kapalıyken öğretmene sorulmadı ({len(notlar)} madde, {len(AI_CALLS)} istek)")
        found = []
        for h in ["#/today", "#/learn", "#/profile", f"#/scenario/{SC}", f"#/scenario/{SC}/roleplay"]:
            pg.goto(base + h); pg.wait_for_timeout(600)
            t = pg.inner_text("body")
            found += [f"{h}: {w}" for w in DEV_NOTES if w in t]
        check(not found, "C: öğrenciye geliştirici notu gösterilmiyor" + (f" — {found}" if found else ""))
        b.close()
        # C'nin "kontrol edemedim" denemesinde açık kalan tarayıcı (pg2) da kapanır; yoksa D'nin sayfası sunucuyu bekler (inceleme #125 P0-1)
        try: b2.close()
        except Exception: pass

        # ---------- D) Workers AI (deneme) sağlayıcısı: rol oyununda "deneme" etiketi (PM 7022002310-5) ----------
        def api_wa(route):
            u = route.request.url
            if route.request.method == "OPTIONS":
                return route.fulfill(status=204, headers={**CORS, "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Allow-Methods": "GET, POST"})
            if u.endswith("/v1/health"):
                return route.fulfill(status=200, headers=CORS, content_type="application/json", body=json.dumps({"ok": True, "version": "e2e", "time": "", "provider": "workers-ai", "configured": {"gemini": False, "workers_ai": True, "allowlist": True}}))
            if u.endswith("/v1/usage"):
                return route.fulfill(status=200, headers=CORS, content_type="application/json", body=json.dumps({"ai": {"used": 0, "limit": 300}}))
            return route.fulfill(status=503, headers=CORS, content_type="application/json", body=json.dumps({"error": {"code": "upstream_busy", "message_tr": "x"}}))
        b, ctx = launch(p); pg = ctx.new_page(); pg.route("https://api.e2e.test/**", api_wa)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(500)
        pg.goto(base + f"#/scenario/{SC}/roleplay"); pg.wait_for_selector("[data-test=rp-start]")
        check(pg.locator("[data-test=ai-deneme]").count() == 1 and pg.inner_text("[data-test=ai-deneme]") == "Deneme", "D: Workers AI sağlayıcısında rol oyununda 'Deneme' etiketi (küçük harf, büyük harf dönüşümü yok)")
        # PM 7026867047: rozet başlık satırında (dikeyde başlıkla kesişir) ve kartın sağ kenarına yaslı
        # PM 7026867047: rozet ekranın başlık satırında (.pbar h1 ile aynı satır), başlığın sağında, satırın sağ ucuna yaslı; kart içinde değil
        g = pg.evaluate("""() => { const c = document.querySelector('[data-test=ai-deneme]'); const row = c.closest('.pbar > .row'); const h = row && row.querySelector('h1');
            if (!row || !h) return { pbar: false }; const a = c.getBoundingClientRect(), b = h.getBoundingClientRect(), r = row.getBoundingClientRect();
            return { pbar: true, ayniSatir: a.top < b.bottom && b.top < a.bottom, sag: Math.round(r.right - a.right), solda: b.right <= a.left + 1, kartta: !!c.closest('.card'), tt: getComputedStyle(c).textTransform }; }""")
        check(g.get("pbar") and g["ayniSatir"] and g["solda"] and abs(g["sag"]) <= 2 and not g["kartta"] and g["tt"] == "none", f"D: 'Deneme' rozeti başlık satırında, sağa yaslı ({g})")
        if os.environ.get("R01"): pg.wait_for_timeout(600); pg.screenshot(path=os.environ["R01"])
        b.close()
    srv.shutdown()
    check(not [e for e in ERR if e.startswith("sayfa hatası")], "sayfa hatası yok")
    finish()

if __name__ == "__main__":
    main()
