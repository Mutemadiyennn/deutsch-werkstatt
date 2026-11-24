"""PM-116 md. 2: uçak modunda kök adres de /v2/'ye yönlenir (v1 servis çalışanı yeni sayfayı önbellekten verir, <head>'deki
yönlendirme çalışır). run_all.sh'ta değil (servis çalışanı ister): build.py'den sonra elle `python3 tests/yonlendirme_ucak.py`
(KAPI: v1 yayın denetiminde). /v2/'nin kendisi bu sunucuda yok; çevrimdışında onu v2'nin servis çalışanı verir (tests/e2e/ucak.py).
Yayındaki gerçek yol sınanır (inceleme #262 P1-1): eski işçi (dw-static-v1) sayfayı denetliyor → yeni sw.js + yeni sayfa →
bir çevrimiçi açılış → çevrimdışı kök → /v2/. İkinci tur aynısını bir simge eksikken koşar (kurulum yarım kalmamalı)."""
import asyncio, os, re, shutil
from playwright.async_api import async_playwright
APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.environ.get("DW_SITE", os.path.join(APP, ".site"))
YENI = open(os.path.join(APP, "sw.js"), encoding="utf-8").read()
ESKI = re.sub(r'const STATIC = "dw-static-v\d+"', 'const STATIC = "dw-static-v1"', YENI)   # eski işçi: yalnız önbellek adı eski
URL = "http://localhost:8765/"
SW = os.path.join(SITE, "sw.js")

async def tur(p, eksik):
    asil = os.path.join(SITE, eksik) if eksik else None
    sakla = asil + ".sakla" if asil else None
    try: return await _tur(p, eksik, asil, sakla)
    finally:   # tur yarıda kalsa da simge geri gelir (inceleme #262 2. tur P2-b)
        if sakla and os.path.exists(sakla): os.rename(sakla, asil)

async def _tur(p, eksik, asil, sakla):
    hata = []
    open(SW, "w", encoding="utf-8").write(ESKI)
    b = await p.chromium.launch(); ctx = await b.new_context(); pg = await ctx.new_page()
    await pg.goto(URL + "index.html?eski=1"); await pg.wait_for_timeout(800)
    await pg.evaluate("navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready)")
    await pg.reload(); await pg.wait_for_timeout(1200)
    if not await pg.evaluate("!!navigator.serviceWorker.controller"): hata.append("eski işçi sayfayı denetlemiyor")
    # yayın: yeni sw.js (dw-static-v2); istenirse bir simge alınamıyor
    open(SW, "w", encoding="utf-8").write(YENI)
    if asil and os.path.exists(asil): os.rename(asil, sakla)
    await pg.evaluate("sessionStorage.removeItem('dw-eski')")
    try: await pg.goto(URL, timeout=8000); await pg.wait_for_timeout(800)   # çevrimiçi açılış: yeni sayfa → /v2/
    except Exception: pass
    await pg.evaluate("navigator.serviceWorker.getRegistration('" + URL + "').then((r) => r && r.update())"); await pg.wait_for_timeout(2500)
    anahtar = await pg.evaluate("caches.keys()")
    await ctx.set_offline(True)
    gez = []; pg.on("request", lambda r: gez.append(r.url) if r.is_navigation_request() else None)
    try: await pg.goto(URL, timeout=8000); await pg.wait_for_timeout(1500)
    except Exception: pass
    if not any(u.endswith("/v2/") for u in gez): hata.append(f"çevrimdışı kök /v2/'ye yönlenmedi ({gez})")
    await b.close()
    print(f"[{'simge eksik: ' + eksik if eksik else 'tam'}] önbellekler {anahtar} · çevrimdışı gezinme {gez}")
    return [f"{eksik or 'tam'}: {h}" for h in hata]

async def main():
    vardi = os.path.exists(SW)
    onceki = open(SW, "rb").read() if vardi else None
    hata = []
    try:
        async with async_playwright() as p:
            hata += await tur(p, None)
            hata += await tur(p, "icon-512.png")
    finally:
        # yalnız bu testin yazdığı dosya geri alınır (DW_SITE gerçek bir çalışma ağacını gösterse de)
        if vardi: open(SW, "wb").write(onceki)
        else: os.remove(SW)
    print("errors", hata); print("HATALAR:", "yok" if not hata else hata)

asyncio.run(main())
