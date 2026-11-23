"""Kelime çeşitliliği: yanlış söylenen kelime aynı tur içinde BAŞKA cümle + BAŞKA fotoğrafla geri gelir;
tekrar (review) kelimeleri cümle içinde sorulur; aynı cümle art arda seçilmez.
python3 tests/vartest.py"""
import asyncio, json
from playwright.async_api import async_playwright
FAIL = []
def check(c, m):
  print(("  ✓ " if c else "  ✗ ") + m)
  if not c: FAIL.append(m)
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True); pg = await ctx.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.add_init_script("setInterval(()=>document.querySelectorAll('.celebrate').forEach(x=>x.remove()), 50);")
    await pg.goto("http://localhost:8765/index.html?eski=1"); await pg.wait_for_timeout(1500)
    await pg.evaluate("""S.state.setupDone=true; window.__heard=''; window.__dwPhotoTest=true;
      recognize = async (on)=>{ if(on) on(window.__heard); await sleep(20); return [window.__heard]; };
      AI = {json: async ()=>({ok:false})}; 0""")
    await pg.evaluate("kuOpenUnit('a1-03'); 0"); await pg.wait_for_timeout(800)
    # kelimeye 4 örnek cümle ve 5 fotoğraf ver (ajan içeriği gelmeden de mantığı sına)
    r = await pg.evaluate("""(()=>{ const u = KURS.units['a1-03']; const w = u.words.find(x=>x.de==='Käse');
      w._pool = null; w.ex = [
        {de:'Der Käse ist sehr gut.', tr:'Peynir çok güzel.', form:'Käse'},
        {de:'Ich kaufe Käse und Brot.', tr:'Peynir ve ekmek alıyorum.', form:'Käse'},
        {de:'Möchtest du Käse?', tr:'Peynir ister misin?', form:'Käse'},
        {de:'Der Käse kostet drei Euro.', tr:'Peynir üç euro.', form:'Käse'}];
      KU_PH[w.img] = {img:w.img, list:[0,1,2,3,4].map(i=>({src:'data:image/gif;base64,R0lGODlhAQABAAAAACw=#'+i, by:'t'+i, url:'#', site:'Test'}))};
      const seen = []; for(let i=0;i<6;i++){ const g = kuPickSent(u, w); seen.push(g.de); }
      let rep = 0; for(let i=1;i<seen.length;i++) if(seen[i]===seen[i-1]) rep++;
      return {pool: kuWordSents(u, w).length, seen, rep}; })()""")
    check(r["pool"] >= 4, f"cümle havuzu ≥4 ({r['pool']})")
    check(r["rep"] == 0, "aynı cümle art arda gelmiyor: " + " | ".join(r["seen"][:4]))
    # yanlış cevap → yeni cümle + yeni fotoğraf
    await pg.evaluate("""(()=>{ const u = KURS.units['a1-03']; const w = u.words.find(x=>x.de==='Käse');
      const items = kuWordItems(u, [w], 'ctxsay'); S.ku = {review:true, u, D: kuDrillRun(items, 'review')}; go('kurs'); render(); })()""")
    await pg.wait_for_timeout(300)
    a = await pg.evaluate("(()=>{ const it=kuCur(); return {de:it.de, ph:document.querySelector('.ku-card .vphoto img, .vphoto img') ? document.querySelector('.vphoto img').getAttribute('src') : ''}; })()")
    await pg.evaluate("window.__heard='Keine Ahnung'; 0"); await pg.click("[data-act=kuMic]"); await pg.wait_for_timeout(250)
    q = await pg.evaluate("(()=>{const D=S.ku.D; return {n:D.items.length, q:D.q.length, last:D.items[D.items.length-1]};})()")
    check(q["n"] == 2 and q["last"].get("retry"), "yanlıştan sonra kelime yeni bir madde olarak sıraya girdi")
    check(q["last"]["de"] != a["de"], f"yeni cümle farklı: '{a['de']}' → '{q['last']['de']}'")
    # yeni maddeye ilerle
    await pg.click("[data-act=kuAdv]"); await pg.wait_for_timeout(300)
    b2 = await pg.evaluate("(()=>{ const it=kuCur(); const im=document.querySelector('.vphoto img'); return {de:it.de, retry:!!it.retry, ph: im ? im.getAttribute('src') : '', note: !!document.querySelector('.ku-retry')}; })()")
    check(b2["retry"] and b2["note"], "tekrar maddesinde 'başka bir cümlede' notu görünüyor")
    check(a["ph"] and b2["ph"] and a["ph"] != b2["ph"], "fotoğraf farklı")
    await pg.screenshot(path="/tmp/vartest_retry.png")
    # yine yanlış → bir kez daha başka cümle; doğru → bitiş
    await pg.click("[data-act=kuMic]"); await pg.wait_for_timeout(250)
    c = await pg.evaluate("(()=>{const D=S.ku.D; return {n:D.items.length, de:D.items[D.items.length-1].de};})()")
    check(c["n"] == 3 and c["de"] != b2["de"], "ikinci yanlışta da üçüncü, farklı cümle geldi")
    await pg.click("[data-act=kuAdv]"); await pg.wait_for_timeout(250)
    cur = await pg.evaluate("kuCur().de"); await pg.evaluate(f"window.__heard={json.dumps(cur)}; 0"); await pg.click("[data-act=kuMic]"); await pg.wait_for_timeout(250)
    ok = await pg.evaluate("S.ku.D.res && S.ku.D.res.ok")
    check(ok, "doğru söyleyince kabul edildi")
    # tekrar oturumu: vadesi gelen kelime cümle içinde sorulur
    await pg.evaluate("""(()=>{ const u = KURS.units['a1-03']; const w = u.words.find(x=>x.de==='Käse'); const r = kuWSt(kuWKey(u,w)); r.c=1; r.last=Date.now()-5*3600e3; r.d=dayKey(); kuSave(); })()""")
    await pg.evaluate("kuReviewStart(); 0"); await pg.wait_for_timeout(900)
    rv = await pg.evaluate("(S.ku && S.ku.D) ? S.ku.D.items.filter(x=>x._w && x._w.endsWith(':w:Käse')).map(x=>({g:x.gapde||'', de:x.de})) : []")
    check(len(rv) >= 1 and all(x["g"] for x in rv), "tekrar oturumunda kelime cümle içinde (boşluklu) soruluyor")
    # Kelime+: ek kelimeler yola basamak olarak girer, sahne fotoğrafı cümleden gelir, kapı onları da sayar
    kp = await pg.evaluate("""(()=>{ const u = KURS.units['a1-03']; u._allw = null; u._caps = null;
      u.plus = Array.from({length:25}, (_, i)=>({de:'Testwort'+i, art:'das', pl:'-', tr:'test'+i, t:'n', img:'', ex:[
        {de:'Das Testwort'+i+' ist hier.', tr:'Test burada.', form:'Testwort'+i, img:'scene a'+i},
        {de:'Ich sehe das Testwort'+i+'.', tr:'Testi görüyorum.', form:'Testwort'+i, img:'scene b'+i},
        {de:'Wo ist das Testwort'+i+'?', tr:'Test nerede?', form:'Testwort'+i, img:'scene c'+i}]}));
      const ns = kuNodes(u); const ids = ns.map(x=>x.id);
      const p1 = ns.find(x=>x.id==='p1'); const steps = kuNodeSteps(u, p1);
      const cs = steps.filter(x=>x.lab==='Cümlede kullan').flatMap(x=>x.items);
      return {ids, n:ns.filter(x=>x.plus).reduce((a,x)=>a+x.words.length,0), cs: cs.length, img: cs.every(x=>/^scene/.test(x.img)), all: kuAllW(u).length}; })()""")
    print("  yol:", kp["ids"])
    check(kp["n"] == 25 and "p1" in kp["ids"] and kp["ids"].index("p1") == kp["ids"].index("w2") + 1, "Kelime+ basamakları yolda, tüm ek kelimeler dağıtılmış")
    check(kp["ids"][-1] == "ex", "sınav en sonda")
    check(kp["cs"] > 0 and kp["img"], "soyut kelimede fotoğraf cümlenin sahnesinden geliyor")
    check(kp["all"] == 25 + await pg.evaluate("KURS.units['a1-03'].words.length"), "kapı ve sayaçlar ek kelimeleri de sayıyor")
    check(not errs, "sayfa hatası yok " + (errs[0] if errs else ""))
    await b.close()
  print("SONUÇ:", "GEÇTİ" if not FAIL else f"{len(FAIL)} HATA")
asyncio.run(main())
