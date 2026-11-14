import asyncio, json
from playwright.async_api import async_playwright
FAKE = open('/tmp/voice_test.py').read().split('FAKE = r"""')[1].split('"""')[0]
W = {"id":"w1","de":"Termin","artikel":"der","plural":"Termine","tr":"randevu","kind":"nomen","sents":[{"de":"Ich habe morgen einen Termin beim Arzt.","answer":"Termin","tr":"Yarın doktorda randevum var.","trw":"randevu"}],"reps":2,"box":2,"due":"2026-11-01","fs":{"s":5,"d":5,"last":"2026-11-01"},"intro":"2026-10-20"}
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(); errs=[]
        pg.on("pageerror", lambda e: errs.append(str(e)+" @@ "+(e.stack or "")[:300]))
        await pg.add_init_script(FAKE)
        await pg.route("https://generativelanguage.googleapis.com/**", lambda r: r.abort())
        await pg.goto("http://localhost:8765/index.html")
        await pg.evaluate("localStorage.setItem('dw-gemini','x')"); await pg.reload(); await pg.wait_for_timeout(1200)
        await pg.evaluate(f"(async()=>{{ await Store.put('words', {json.dumps(W)}); S.sess = {{ctx:'desk', sec:0, hist:[], start:Date.now(), ended:false, cur:null}}; go('kelime', ()=>startVocab()); }})()")
        await pg.wait_for_timeout(2500)
        st = await pg.evaluate("S.voc && [S.voc.phase, S.voc.q.length, vWord() && vWord().de, S.voc.mode, !!S.voc.sent]")
        print("start:", st)
        await pg.evaluate("window.__spoken=[]; S.voc.mode='type'; vCheck('Termin')"); await pg.wait_for_timeout(300)
        body = await pg.inner_text(".lshell")
        print("needArt:", await pg.evaluate("S.voc.needArt"), "| spoke before article:", await pg.evaluate("__spoken.map(x=>x.t)"))
        print("reveals 'der Termin' or 'Termine' before answer:", ("der Termin" in body) or ("Termine" in body))
        await pg.evaluate("vArt('das')"); await pg.wait_for_timeout(400)
        body = await pg.inner_text(".lshell")
        print("after wrong article:", [l for l in body.split("\n") if "Artikel" in l or "Termine" in l or "tekrar" in l])
        print("spoke after:", await pg.evaluate("__spoken.map(x=>x.t)"))
        await pg.wait_for_timeout(5000)
        print("still on card at desk (no auto-advance):", await pg.evaluate("[S.voc.phase, S.voc.i]"))
        w = await pg.evaluate("S.words.find(x=>x.id==='w1')")
        print("due:", w.get("due"), "ivl:", w.get("ivl"))
        print("errors:", errs)
        await b.close()
asyncio.run(main())
