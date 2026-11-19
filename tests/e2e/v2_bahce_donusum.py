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
    """'Başka cümle'ye basar; metin değişene kadar geçen süre (ms) ve yeni metin"""
    return pg.evaluate("""(sel) => new Promise((res) => { const el = () => document.querySelector(sel); const once = el() ? el().innerText : '';
      const t0 = performance.now(); document.querySelector('[data-test=baska-cumle]').click();
      const bak = () => { const s = el() ? el().innerText : ''; if (s !== once) return res([performance.now() - t0, s]);
        if (performance.now() - t0 > 2000) return res([9999, s]); requestAnimationFrame(bak); }; bak(); })""", sel)

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
        goruldu, sureler = [ilk], []
        for _ in range(3):
            ms, metin = degistir(pg, "[data-test=intro-ex]")
            sureler.append(ms); goruldu.append(metin)
        check(len(set(goruldu[:3])) == 3, f"3 dokunuşta farklı cümleler ({[g[:30] for g in goruldu]})")
        check(max(sureler) < 150, f"her değişim < 150 ms, uçak modunda ({[round(x) for x in sureler]} ms)")
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
        # kayıt: kartın sayacı gösterilen (3 kez değiştirilmiş) cümlenin ardından yazıldı → sonraki oturum başka cümleyle açılır
        ex_seen = pg.evaluate("""(id) => new Promise((res) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const t = r.result.transaction('items').objectStore('items').get(id);
          t.onsuccess = () => res(t.result ? t.result.exSeen : null); t.onerror = () => res(null); }; r.onerror = () => res(null); })""", lex)
        check(ex_seen == 4, f"öğrenci kaydında cümle sayacı gösterilenin ardından ({lex}: exSeen={ex_seen}, beklenen 4)")
        # boşluk sorusu: başka boşluk cümlesi (bir tur içinde bulunursa)
        bosluk = False
        for _ in range(60):
            if pg.locator("[data-test=garden-done]").count(): break
            if pg.locator("[data-test=gap-cumle]").count() and pg.locator("[data-test=baska-cumle]").count():
                once = pg.inner_text("[data-test=gap-cumle]"); ms, sonra = degistir(pg, "[data-test=gap-cumle]")
                check(sonra != once and ms < 150, f"boşluk sorusunda başka cümle ({once[:30]!r} → {sonra[:30]!r}, {round(ms)} ms)"); bosluk = True; break
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
