import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True); pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.evaluate("S.state.setupDone=true; S.state.theme='dark'; 0")
    print("today:", await pg.evaluate("disToday()"), await pg.evaluate("todayQueue().q.find(x=>x.key==='dis').title"))
    await pg.evaluate("go('dis'); render(); 0"); await pg.wait_for_timeout(300)
    await pg.screenshot(path="/tmp/dis1.png", full_page=True)
    m0 = await pg.evaluate("minsToday()")
    await pg.click("[data-act=disDone]"); await pg.wait_for_timeout(300)
    print("mins", m0, "->", await pg.evaluate("minsToday()"), "done", await pg.evaluate("todayQueue().q.find(x=>x.key==='dis').done"), "nico", await pg.evaluate("JSON.stringify(disState().nico)"))
    await pg.evaluate("go('plan'); render(); 0"); await pg.wait_for_timeout(300)
    await pg.screenshot(path="/tmp/dis2.png", full_page=True)
    print("plan has dis:", await pg.evaluate("document.querySelector('#view').innerText.includes('dış kaynağı')"))
    for th in ['light']:
      await pg.evaluate(f"S.state.theme='{th}'; go('dis'); render(); 0"); await pg.wait_for_timeout(300); await pg.screenshot(path=f"/tmp/dis_{th}.png", full_page=True)
    print(errs)
asyncio.run(main())
