import asyncio, json
from playwright.async_api import async_playwright
FAKE = open('/tmp/voice_test.py').read().split('FAKE = r"""')[1].split('"""')[0]
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
        print("views:", len(views), "errors:", errs)
        await b.close()
asyncio.run(main())
