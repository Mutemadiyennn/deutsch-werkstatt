import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch()
    ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True)
    pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.route("**/generativelanguage.googleapis.com/**", lambda r: r.fulfill(json={"candidates":[{"content":{"parts":[{"text":"{}"}]}}]}))
    await pg.add_init_script("localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx'); localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(2000)
    await pg.evaluate("S.state.setupDone = true; say = async()=>true; 0")
    print("core ready", await pg.evaluate("CORE.ready"), await pg.evaluate("CORE.items.length"))
    print("target", await pg.evaluate("coreTarget()"), "quota", await pg.evaluate("newQuota()"))
    print("next", await pg.evaluate("coreNext(12).map(x=>x.de)"))
    await pg.evaluate("ACT.coreOpen()"); await pg.wait_for_timeout(300)
    for th in ["dark","light"]:
      await pg.evaluate(f"S.state.theme='{th}'; render(); 0"); await pg.wait_for_timeout(200)
      await pg.screenshot(path=f"/tmp/c_panel_{th}.png", full_page=True)
    await pg.click("[data-act=cScan]"); await pg.wait_for_timeout(300)
    await pg.screenshot(path="/tmp/c_scan1.png")
    await pg.click("[data-act=cScanYes]"); await pg.wait_for_timeout(200)
    await pg.screenshot(path="/tmp/c_scan2.png")
    tr = await pg.evaluate("S.cscan.list[0].tr")
    await pg.click(f"[data-act=cScanPick][data-o=\"{tr}\"]"); await pg.wait_for_timeout(300)
    await pg.screenshot(path="/tmp/c_scan3.png")
    print("known words:", await pg.evaluate("S.words.filter(w=>w.known).map(w=>w.de+' due '+w.due)"))
    for k in range(14):
      if await pg.evaluate("!S.cscan.list[S.cscan.i]"): break
      if await pg.evaluate("S.cscan.phase")=="ask":
        await pg.click("[data-act=cScanNo]")
      else:
        await pg.click("[data-act=cScanNext]")
      await pg.wait_for_timeout(80)
    await pg.screenshot(path="/tmp/c_scan4.png")
    await pg.click("[data-act=cScanEnd]"); await pg.wait_for_timeout(200)
    await pg.evaluate("go('kelime'); S.voc=null; render(); 0"); await pg.wait_for_timeout(200)
    await pg.screenshot(path="/tmp/c_kelime.png")
    await pg.click("[data-act=vocabStart]"); await pg.wait_for_timeout(1500)
    print("voc q", await pg.evaluate("S.voc && S.voc.q.length"), await pg.evaluate("S.voc && S.voc.phase"), await pg.evaluate("S.words.filter(w=>w.src==='core').length"))
    await pg.screenshot(path="/tmp/c_voc.png")
    print("profile tail:", (await pg.evaluate("profile()"))[-300:])
    print("sw", await pg.evaluate("document.documentElement.scrollWidth"))
    await pg.evaluate("go('lernen'); S.ex=null; render(); 0"); await pg.wait_for_timeout(200)
    await pg.screenshot(path="/tmp/c_hub.png")
    print("errors", errs)
asyncio.run(main())
