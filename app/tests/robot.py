import asyncio, json, sys, re
from playwright.async_api import async_playwright
THEME = sys.argv[1] if len(sys.argv)>1 else "dark"
SKIP_ACTS = {"resetAll","wipeAll","logout","syOut","delAll","clearAll","diagClear","exportData","importData","backupNow","syDelete","pickFile","kbdNext"}
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch()
    ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True)
    pg = await ctx.new_page(); errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
    pg.on("dialog", lambda d: asyncio.ensure_future(d.dismiss()))
    await pg.route("**/generativelanguage.googleapis.com/**", lambda r: r.fulfill(json={"candidates":[{"content":{"parts":[{"text":"{}"}]}}]}))
    await pg.route("**/texttospeech.googleapis.com/**", lambda r: r.fulfill(status=500, body="x"))
    await pg.add_init_script("localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx'); localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()})); window.alert=()=>{}; window.confirm=()=>false; window.prompt=()=>null;")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(2500)
    await pg.evaluate(f"S.state.setupDone = true; S.state.theme='{THEME}'; 0")
    views = await pg.evaluate("Object.keys(VIEWS)")
    problems = []; clicks = 0
    async def reset(v):
      await pg.evaluate(f"""(()=>{{ try{{ stopAll && stopAll(); }}catch(e){{}} S.sess=null; S.ku=null; S.kuU=null; S.kaud=null; S.ex=null; S.voc=null; S.cscan=null; S.denk=null; S.live=null; S.remed=null; if(S.learn){{ S.learn.lesson=null; S.learn.busy=false; S.learn.err=''; }} S.flash=''; go('{v}'); render(); }})()""")
      await pg.wait_for_timeout(250)
    async def check(tag):
      r = await pg.evaluate("""()=>{ const v = document.querySelector('#view') || document.body; const t = v.innerText || ''; const bad = (t.match(/undefined|NaN|\\[object Object\\]|null null/g)||[]); return {sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, bad: bad.slice(0,3), empty: t.trim().length < 5}; }""")
      if r['sw'] > r['cw']+1: problems.append((tag, "taşma", r['sw']))
      if r['bad']: problems.append((tag, "metin", r['bad']))
    for v in views:
      try:
        await reset(v)
      except Exception as e:
        problems.append((v, "render", str(e)[:120])); continue
      await check(v)
      n = await pg.evaluate("document.querySelectorAll('#view [data-act], header [data-act], .sbar [data-act], .fbar [data-act]').length")
      acts = await pg.evaluate("[...document.querySelectorAll('#view [data-act], .sbar [data-act], .fbar [data-act]')].map(e=>e.dataset.act)")
      for k in range(min(n, 40)):
        try:
          await reset(v)
          el = (await pg.query_selector_all("#view [data-act], .sbar [data-act], .fbar [data-act]"))
          if k >= len(el): break
          act = await el[k].get_attribute("data-act")
          if act in SKIP_ACTS: continue
          e0 = len(errs)
          vis = await el[k].is_visible()
          if not vis: continue
          tagn = await el[k].evaluate("e=>e.tagName")
          if tagn in ("INPUT","SELECT"):
            continue
          await el[k].click(timeout=1500, force=True)
          clicks += 1
          await pg.wait_for_timeout(450)
          await check(f"{v}>{act}")
          if len(errs) > e0: problems.append((f"{v}>{act}", "hata", errs[e0:]))
        except Exception as e:
          problems.append((f"{v}#{k}", "tıklama", str(e)[:100]))
    print(f"[{THEME}] views={len(views)} clicks={clicks}")
    for pr in problems: print(pr)
    print("errors total", len(errs))
    await b.close()
asyncio.run(main())
