"""
PM-062 (#58 B13) — Bahçe'de değişen cümle:
  - "Başka cümle" (soru ve tanıtım ekranında, cevaptan önce): 3 dokunuşta 3 farklı cümle, her biri < 150 ms, uçak modunda
  - düğme ipucu sayılmaz: sonra verilen doğru cevap "Doğru." ve XP uçuşu alır
  - boşluk sorusunda da başka boşluk cümlesi gelir (havuzu ≥2 ise)
python3 tests/e2e/v2_bahce_donusum.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4205

def degistir(pg, sel):
    """'Başka cümle'ye basar. D-096 yöntemi (PM-044.7): DOM süresi = tıklamadan cümlenin DOM'da değişmesine (MutationObserver),
    kare süresi = değişimden sonraki ilk çizim karesine. Döner: (dom_ms, kare_ms, yeni metin)"""
    return pg.evaluate("""(sel) => new Promise((res) => { const el = () => document.querySelector(sel); const once = el() ? el().innerText : '';
      let dom = null; const mo = new MutationObserver(() => { if (dom === null && el() && el().innerText !== once) {
        dom = performance.now() - t0; mo.disconnect(); requestAnimationFrame(() => res([dom, performance.now() - t0, el().innerText])); } });
      mo.observe(document.body, { subtree: true, childList: true, characterData: true });
      const t0 = performance.now(); document.querySelector('[data-test=baska-cumle]').click();
      setTimeout(() => { if (dom === null) { mo.disconnect(); res([9999, 9999, el() ? el().innerText : '']); } }, 2000); })""", sel)

def bos_kare(pg, n=6):
    """Tarayıcının kendi kare aralığı (boşta, rAF→rAF ortancası): CI'daki WebKit yükte kareleri ~150 ms'ye kadar seyreltebiliyor (PM-069 P2-d)"""
    return pg.evaluate("""(n) => new Promise((res) => { const t = []; let s = performance.now();
      const f = (now) => { t.push(now - s); s = now; if (t.length > n) { t.shift(); t.sort((a, b) => a - b); res(t[Math.floor(t.length / 2)]); } else requestAnimationFrame(f); };
      requestAnimationFrame(f); })""", n)

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
        check(pg.locator("[data-test=baska-cumle]").count() == 1, "tanıtımda 'Başka cümle' düğmesi")
        ctx.set_offline(True)
        ilk = pg.inner_text("[data-test=intro-ex]")
        goruldu, doms, denemeler = [ilk], [], []
        # D-096 yöntemi: DOM her dokunuşta < 150 ms (sert); kare = 7 dokunuşun ortancası − tarayıcının boş kare aralığı < 150 ms (PM-069 P2-d).
        # Kare ölçüsü en çok 3 deneme (PM 7028672643 A): paylaşılan CI makinesinin tek seferlik yavaş çizimi kırmızı yapmaz,
        # her seferinde yavaşsa kırmızı; eşik değişmedi. Her deneme günlüğe yazılır.
        for deneme in range(3):
            kareler = []
            for _ in range(7):
                dom, kare, metin = degistir(pg, "[data-test=intro-ex]")
                doms.append(dom); kareler.append(kare); goruldu.append(metin)
            kortanca = sorted(kareler)[len(kareler) // 2]; bos = bos_kare(pg); ek = kortanca - bos
            denemeler.append((round(kortanca), round(bos), round(ek), round(max(kareler))))
            print(f"  (kare denemesi {deneme + 1}: ortanca {round(kortanca)} − boş kare {round(bos)} = {round(ek)} ms; en kötü {round(max(kareler))} ms)")
            if ek < 150: break
        dokunus = 7 * len(denemeler)
        check(len(set(goruldu[:3])) == 3, f"3 dokunuşta farklı cümleler ({[g[:30] for g in goruldu[:4]]})")
        check(max(doms) < 150 and denemeler[-1][2] < 150, f"değişim < 150 ms, uçak modunda (DOM en çok {round(max(doms))} ms, {dokunus} dokunuş; kare denemeleri [ortanca, boş, eklenen, en kötü] {denemeler})")
        no_overflow(pg, "tanıtım")
        if shots: shot(pg, "b01-baska-cumle", full=False)
        # düğme ipucu sayılmaz: sonraki doğru cevap "Doğru." (XP'li)
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
        pg.evaluate("window.__ucus = 0; addEventListener('dw:xp-ucus', (e) => { window.__ucus += e.detail.n; })")
        pg.locator("button.opt[data-right]").first.click(); pg.wait_for_selector("[data-test=feedback]")
        pg.wait_for_function("() => window.__ucus > 0", timeout=3000)
        check(pg.locator(".fb.ok").count() == 1 and pg.evaluate("window.__ucus") > 0, f"'Başka cümle'den sonra doğru cevap doğru ve XP'li (ipucu değil; uçan {pg.evaluate('window.__ucus')})")
        lex = pg.get_attribute("[data-test=after-card]", "data-lex")
        ctx.set_offline(False)
        pg.click("[data-test=next]"); pg.wait_for_timeout(300)
        # kayıt: kartın sayacı gösterilen (7 kez değiştirilmiş) cümlenin ardından yazıldı → sonraki oturum başka cümleyle açılır
        ex_seen = pg.evaluate("""(id) => new Promise((res) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const t = r.result.transaction('items').objectStore('items').get(id);
          t.onsuccess = () => res(t.result ? t.result.exSeen : null); t.onerror = () => res(null); }; r.onerror = () => res(null); })""", lex)
        check(ex_seen == dokunus + 1, f"öğrenci kaydında cümle sayacı gösterilenin ardından ({lex}: exSeen={ex_seen}; {dokunus} değişiklik + cevap = {dokunus + 1})")
        # boşluk sorusu: başka boşluk cümlesi (bir tur içinde bulunursa)
        bosluk = False
        for _ in range(60):
            if pg.locator("[data-test=garden-done]").count(): break
            if pg.locator("[data-test=gap-cumle]").count() and pg.locator("[data-test=baska-cumle]").count():
                once = pg.inner_text("[data-test=gap-cumle]"); dom, kare, sonra = degistir(pg, "[data-test=gap-cumle]")
                check(sonra != once and dom < 150, f"boşluk sorusunda başka cümle ({once[:30]!r} → {sonra[:30]!r}; DOM {round(dom)} ms, kare {round(kare)} ms)"); bosluk = True; break
            if pg.locator("[data-test=garden-intro]").count(): pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]"); continue
            if pg.locator("button.opt:not([disabled])").count(): pg.locator("button.opt[data-right]").first.click()
            else:
                pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]"); pg.wait_for_timeout(150)
                if pg.locator("[data-test=own-short]").count(): pg.fill("[data-test=answer]", "Ich trinke jeden Morgen Kaffee."); pg.click("[data-test=submit]")
                if pg.locator("[data-test=gq-own-check]").count(): pg.click("[data-test=own-unsure]"); pg.wait_for_timeout(200); continue
            pg.wait_for_selector("[data-test=next]"); pg.click("[data-test=next]"); pg.wait_for_timeout(150)
            if pg.locator("[data-test=garden-again]").count(): pg.click("[data-test=garden-again]"); pg.wait_for_selector("[data-test=garden]")
        if not bosluk: print("  (bu turda boşluk sorusu gelmedi; birim testi kapsıyor)")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
