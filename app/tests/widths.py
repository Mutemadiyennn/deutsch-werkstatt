import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); out=[]
    for w in (360,375,430):
      for th in ("dark","light"):
        ctx = await b.new_context(viewport={"width":w,"height":800}, is_mobile=True, has_touch=True)
        pg = await ctx.new_page()
        await pg.route("**/generativelanguage.googleapis.com/**", lambda r: r.fulfill(json={"candidates":[{"content":{"parts":[{"text":"{}"}]}}]}))
        await pg.add_init_script("localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx'); localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
        await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1800)
        await pg.evaluate(f"S.state.setupDone=true; S.state.theme='{th}'; 0")
        views = await pg.evaluate("Object.keys(VIEWS)")
        for v in views:
          await pg.evaluate(f"go('{v}'); render(); 0"); await pg.wait_for_timeout(120)
          sw = await pg.evaluate("document.documentElement.scrollWidth")
          if sw > w+1: out.append((w,th,v,sw))
        await ctx.close()
    print("overflow:", out)
    await b.close()
asyncio.run(main())
