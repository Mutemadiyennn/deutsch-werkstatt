import asyncio, json
from playwright.async_api import async_playwright
import os
FAKE = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fixtures', 'voice_fake.js')).read()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)+" @@ "+(e.stack or "")[:600]))
        await pg.add_init_script(FAKE)
        await pg.route("https://generativelanguage.googleapis.com/**", lambda r: r.abort())
        await pg.goto("http://localhost:8765/index.html")
        await pg.evaluate("localStorage.setItem('dw-gemini','x')"); await pg.reload(); await pg.wait_for_timeout(1200)
        views = await pg.evaluate("Object.keys(VIEWS)")
        for v in views:
            await pg.evaluate(f"location.hash='{v}'"); await pg.wait_for_timeout(120)
        for c in ["desk","pause","gym","kitchen","car"]:
            await pg.evaluate(f"try{{ sessEnd(); }}catch(e){{}} sessStart('{c}')"); await pg.wait_for_timeout(600)
            await pg.evaluate("ACT.sessPause()"); await pg.wait_for_timeout(150); await pg.evaluate("ACT.sessResume()"); await pg.wait_for_timeout(300)
            print(c, await pg.evaluate("[S.view, !!S.sess, S.sess && !!S.sess.paused]"))
        await pg.evaluate("sessEnd()")
        # v2'ye geçiş (PM 7025664499): sekmelerde "Yeni uygulama → Aç" bandı; Kurulum'da "her açılışta yeni uygulamayı aç" ayarı; ?v1 ile v1'de kalınır
        gec = []
        for v in ["plan", "seviye", "more"]:
            await pg.evaluate(f"location.hash='{v}'"); await pg.wait_for_timeout(200)
            if await pg.locator("[data-test=v2-bant]").count() != 1 or await pg.get_attribute("[data-test=v2-bant]", "href") != "./v2/": gec.append(f"bant yok: {v}")
        await pg.evaluate("location.hash='kurulum'"); await pg.wait_for_timeout(300)
        kutu = pg.locator("[data-test=v2-ac]")
        if await kutu.count() != 1 or await kutu.is_checked(): gec.append("kurulum: ayar kutusu yok ya da açık başlıyor")
        else:
            await kutu.check(); await pg.wait_for_timeout(100)
            if await pg.evaluate("localStorage.getItem('dw-v2-ac')") != "1": gec.append("ayar kaydedilmedi")
            await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(600)
            if "/v2/" not in pg.url: gec.append(f"ayar açıkken /v2/'ye yönlenmedi ({pg.url})")
            await pg.goto("http://localhost:8765/index.html?v1#plan"); await pg.wait_for_timeout(1200)
            if "/v2/" in pg.url or await pg.locator("[data-test=v2-bant]").count() != 1: gec.append(f"?v1 ile v1'de kalınmadı ({pg.url})")
            await pg.evaluate("localStorage.setItem('dw-v2-ac','0')")
        errs += [f"v2 geçiş: {g}" for g in gec]
        print("v2 geçiş:", "✓" if not gec else gec)
        print("views:", len(views), "errors:", errs)
        await b.close()
asyncio.run(main())
