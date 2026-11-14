import asyncio, json
from playwright.async_api import async_playwright
INIT = """
localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx');
window.__plan = [0.6, 1.3];   // sessizlik sn, konuşma sn
navigator.mediaDevices.getUserMedia = async () => {
  const ac = new AudioContext(); await ac.resume();
  const o = ac.createOscillator(); o.frequency.value = 220; const g = ac.createGain(); g.gain.value = 0;
  const d = ac.createMediaStreamDestination(); o.connect(g); g.connect(d); o.start();
  const [sil, sp] = window.__plan; const t = ac.currentTime;
  if(sp > 0){ g.gain.setValueAtTime(0.3, t + sil); g.gain.setValueAtTime(0, t + sil + sp); }
  window.__gum = (window.__gum||0) + 1; (window.__streams = window.__streams||[]).push(d.stream); return d.stream;
};
window.__sent = [];
"""
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(args=["--autoplay-policy=no-user-gesture-required"]); pg = await b.new_page()
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    calls={"n":0,"mode":"ok"}
    async def gem(route):
      u = route.request.url
      if "/models?" in u:
        await route.fulfill(json={"models":[{"name":"models/gemini-3.1-flash-lite","supportedGenerationMethods":["generateContent"]},{"name":"models/gemini-3.5-flash","supportedGenerationMethods":["generateContent"]}]}); return
      body = json.loads(route.request.post_data)
      parts = body["contents"][-1]["parts"]
      if len(parts) < 2:
        await route.fulfill(json={"candidates":[{"content":{"parts":[{"text":"{}"}]}}]}); return
      calls["n"]+=1
      calls["last_mime"] = parts[1]["inline_data"]["mime_type"]; calls["model"]=u.split("/models/")[1].split(":")[0]
      if calls["mode"]=="429": await route.fulfill(status=429, body="{}"); return
      await asyncio.sleep(0.4)
      await route.fulfill(json={"candidates":[{"content":{"parts":[{"text":json.dumps({"text":"Guten Morgen, wie geht's?"})}]}}]})
    await pg.route("**/generativelanguage.googleapis.com/**", gem)
    await pg.add_init_script(INIT)
    await pg.goto("http://localhost:8765/index.html?nogate"); await pg.wait_for_timeout(1000)
    print("mic2Ok:", await pg.evaluate("mic2Ok()"), "useSR:", await pg.evaluate("useSR()"))
    async def run(label, plan, wait=6000, cancel_at=None):
      await pg.evaluate(f"window.__plan={json.dumps(plan)}; window.__r=null; window.__live=[]; primeTTS(); void recognize(t=>__live.push(t)).then(a=>window.__r={{ok:a}}).catch(e=>window.__r={{err:e.code}}); 0")
      states=[]; t=0
      while t < wait:
        await pg.wait_for_timeout(250); t+=250
        st = await pg.evaluate("(document.getElementById('micPill')||{}).className||'-'")
        if not states or states[-1][1]!=st: states.append((t,st))
        if cancel_at and t==cancel_at: await pg.click("#micPill")
        if await pg.evaluate("!!window.__r") and st=='-': break
      print(label, await pg.evaluate("JSON.stringify(window.__r)"), "live:", await pg.evaluate("JSON.stringify(__live)"), "states:", states)
    await run("speak:", [0.6,1.3])
    print("  gem calls", calls["n"], calls.get("model"), calls.get("last_mime"))
    await run("silent:", [0,0], wait=9000)
    await run("cancel:", [0.6,3.0], cancel_at=1000)
    calls["mode"]="429"
    await run("quota:", [0.4,1.0])
    print("after quota mic2Ok:", await pg.evaluate("mic2Ok()"), "count:", await pg.evaluate("JSON.stringify(MIC2)"))
    await pg.wait_for_timeout(500)
    print("live tracks left:", await pg.evaluate("(window.__streams||[]).flatMap(s=>s.getTracks()).filter(t=>t.readyState==='live').length"), "of", await pg.evaluate("(window.__streams||[]).length"))
    print("log:", (await pg.evaluate("localStorage.getItem('dw-ailog')"))[:400])
    print("errors", errs); await b.close()
asyncio.run(main())
