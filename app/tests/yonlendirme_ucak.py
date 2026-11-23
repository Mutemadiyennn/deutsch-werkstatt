"""PM-116 md. 2: uçak modunda kök adres de /v2/'ye yönlenir (v1 servis çalışanı yeni sayfayı önbellekten verir, <head>'deki
yönlendirme çalışır). run_all.sh'ta değil (servis çalışanı ister): build.py'den sonra elle `python3 tests/yonlendirme_ucak.py`.
/v2/'nin kendisi bu sunucuda yok; çevrimdışında onu v2'nin servis çalışanı verir (tests/e2e/ucak.py sınar)."""
import asyncio, os, shutil
from playwright.async_api import async_playwright
SITE = os.environ.get("DW_SITE", os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".site"))
async def main():
    shutil.copy(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "sw.js"), os.path.join(SITE, "sw.js"))
    hata = []
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch(); ctx = await b.new_context(); pg = await ctx.new_page()
            await pg.goto("http://localhost:8765/index.html?eski=1"); await pg.wait_for_timeout(800)
            await pg.evaluate("navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready)")
            await pg.reload(); await pg.wait_for_timeout(1500)
            if not await pg.evaluate("!!navigator.serviceWorker.controller"): hata.append("servis çalışanı sayfayı denetlemiyor")
            await ctx.set_offline(True)
            await pg.goto("http://localhost:8765/index.html#plan"); await pg.wait_for_timeout(800)
            if "/v2/" in pg.url: hata.append(f"çevrimdışı, ?eski=1 sekmesinde v1'de kalınmadı ({pg.url})")
            await pg.evaluate("sessionStorage.removeItem('dw-eski')")
            gez = []; pg.on("request", lambda r: gez.append(r.url) if r.is_navigation_request() else None)
            try: await pg.goto("http://localhost:8765/", timeout=8000); await pg.wait_for_timeout(1500)
            except Exception: pass
            if not any(u.endswith("/v2/") for u in gez): hata.append(f"çevrimdışı kök /v2/'ye yönlenmedi ({gez})")
            print("gezinme:", gez)
            await b.close()
    finally:
        os.remove(os.path.join(SITE, "sw.js"))
    print("errors", hata); print("HATALAR:", "yok" if not hata else hata)
asyncio.run(main())
