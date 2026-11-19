"""
Şölen 2 / B11b (PM-065 madde 5–7) — günlük görevler, sandık, seri dondurma, yol sandığı, "geçen haftaki sen":
  - Bugün: 3 görev, her biri ilerleme çubuğu; sandık görevler bitmeden kilitli
  - görevler bitince sandık "Aç" → +10 XP ve seri dondurma hakkı; yeniden açılmaz (kalıcı)
  - Bahçe'de ipucusuz doğru cevap görev sayacını artırır (öğrenme eylemi)
  - dün boş, önceki gün dolu ve hak varsa: açılışta seri korunur ve öğrenciye söylenir
  - yol haritasında her 3 düğümde bir sandık (önceki adımlar bitmeden kilitli)
  - İlerlemem: "Geçen haftaki sen" tablosu (XP, dakika, yeni kelime)
python3 tests/e2e/v2_gorev.py [--browser webkit] [--device "iPhone 15 Pro Max"] [--shots DIR]
"""
import datetime as dt
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4210

META_YAZ = """async ([k, v]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  await new Promise((ok, no) => { const t = d.transaction('meta', 'readwrite'); t.objectStore('meta').put({ key: k, value: v }); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""
META_OKU = """async (k) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const g = d.transaction('meta').objectStore('meta').get(k); g.onsuccess = () => ok(g.result && g.result.value); }); d.close(); return v ?? null; }"""

def main():
    shots = arg("--shots")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=gunluk-gorevler]")
            # dakika görevi olmayan ilk gün (sandık adımı her koşuda sınansın; dakika odak motorundan gelir)
            bugun = dt.date.today()
            for i in range(30):
                aday = (bugun + dt.timedelta(days=i)).isoformat()
                if "dk25" not in pg.evaluate("(g) => globalThis.__gunGorevleri(g)", aday): break
            if aday != bugun.isoformat():
                pg.clock.set_system_time(dt.datetime.fromisoformat(aday + "T10:00:00")); pg.reload(); pg.wait_for_selector("[data-test=gunluk-gorevler]")
            gun = pg.evaluate("() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }")
            ids = pg.evaluate("(g) => globalThis.__gunGorevleri(g)", gun)
            check(pg.locator("[data-test=gorev]").count() == 3 and pg.locator("[data-test=gorev] [role=progressbar]").count() == 3, f"[{tema}] Bugün: 3 günlük görev, ilerleme çubuklu ({ids})")
            check(pg.get_attribute("[data-test=gorev-sandik]", "data-durum") == "kilitli" and pg.locator("[data-test=sandik-ac]").count() == 0, f"[{tema}] görevler bitmeden sandık kilitli")
            check(pg.locator("[data-test=xp-seri]").count() == 0, f"[{tema}] Bugün'de XP/seri tekrarı yok (durum çubuğu var)")
            no_overflow(pg, f"[{tema}] günlük görevler")
            if shots: pg.locator("[data-test=gunluk-gorevler]").scroll_into_view_if_needed(); shot(pg, f"g01-gorevler-{tema}", full=False)
            # 1) Bahçe'de ipucusuz doğru → sayaç (öğrenme eylemi)
            pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
            for _ in range(12):
                if pg.locator("[data-test=garden-intro]").count(): pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
                if pg.locator("button.opt[data-right]").count(): pg.locator("button.opt[data-right]").first.click(); pg.wait_for_selector("[data-test=next]"); break
                if pg.locator("[data-test=answer]").count(): pg.fill("[data-test=answer]", "xyz"); pg.click("[data-test=submit]")
                if pg.locator("[data-test=gq-own-check]").count(): pg.click("[data-test=own-unsure]")
                elif pg.locator("[data-test=next]").count(): pg.click("[data-test=next]")
                pg.wait_for_timeout(150)
            pg.click("[data-test=next]")
            pg.wait_for_function(f"async () => ((await ({META_OKU})('gorev:{gun}')) || {{ sayac: {{}} }}).sayac.bahceIpucusuz >= 1", timeout=5000)
            check(True, f"[{tema}] Bahçe'de ipucusuz doğru cevap görev sayacını artırdı")
            # 2) görevleri tamamla (sayaçlar + bugünkü XP; dakika görevi yoksa) → sandık
            if "dk25" not in ids:
                pg.evaluate(META_YAZ, [f"gorev:{gun}", {"sayac": {"bahceIpucusuz": 10, "tur90": 2, "ustuste5": 3, "dikteUsta": 3}}])
                x = pg.evaluate(META_OKU, "xp") or {"toplam": 0, "gunler": {}}
                x["gunler"][gun] = max(60, x["gunler"].get(gun, 0)); x["toplam"] = max(x["toplam"], 60)
                pg.evaluate(META_YAZ, ["xp", x])
                pg.goto(base + "#/progress"); pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=gorev-sandik][data-durum=hazir]")
                check(pg.locator("[data-test=gorev][data-tamam='1']").count() == 3, f"[{tema}] üç görev tamam")
                once = int(pg.inner_text("[data-test=durum-xp-sayi]"))
                pg.click("[data-test=sandik-ac]"); pg.wait_for_selector("[data-test=sandik-odul]")
                check("+10 XP" in pg.inner_text("[data-test=sandik-odul]") and "dondurma" in pg.inner_text("[data-test=sandik-odul]"), f"[{tema}] sandık: +10 XP ve seri dondurma hakkı ({pg.inner_text('[data-test=sandik-odul]')!r})")
                pg.wait_for_function(f"() => Number(document.querySelector('[data-test=durum-xp-sayi]').innerText) >= {once + 10}", timeout=5000)
                check(True, f"[{tema}] XP durum çubuğunda arttı ({once} → ≥ {once + 10})")
                if shots: pg.locator("[data-test=gunluk-gorevler]").scroll_into_view_if_needed(); shot(pg, f"g02-sandik-acik-{tema}", full=False)
                pg.reload(); pg.wait_for_selector("[data-test=gorev-sandik][data-durum=acik]")
                check(pg.locator("[data-test=sandik-ac]").count() == 0, f"[{tema}] sandık bir kez açılır (yeniden yüklemede açık, düğme yok)")
                check((pg.evaluate(META_OKU, "dondurma") or {}).get("hak") == 1, f"[{tema}] seri dondurma hakkı kaydedildi (1)")
            else:
                check(True, f"[{tema}] bugün dakika görevi var; sandık adımı atlandı (birim testinde)")
            # 3) seri dondurma: dün boş, önceki gün dolu, hak 1 → açılışta korunur
            d = dt.date.fromisoformat(gun)
            g2, g1 = (d - dt.timedelta(days=2)).isoformat(), (d - dt.timedelta(days=1)).isoformat()
            pg.evaluate(META_YAZ, ["xp", {"toplam": 40, "gunler": {(d - dt.timedelta(days=3)).isoformat(): 20, g2: 20}}])
            pg.evaluate(META_YAZ, ["dondurma", {"hak": 1}])
            pg.goto(base + "#/learn"); pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=gunluk-gorevler]")
            pg.wait_for_function(f"async () => ((await ({META_OKU})('xp')) || {{}}).dondurulan?.includes('{g1}')", timeout=5000)
            pg.wait_for_function("() => document.querySelector('[data-test=durum-seri]').innerText.trim() === '2'", timeout=5000)
            check((pg.evaluate(META_OKU, "dondurma") or {}).get("hak") == 0, f"[{tema}] dün dondurularak seri korundu (2 gün), hak 0")
            # 4) yol sandığı
            pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=gun-1]")
            n = pg.locator("[data-test=gun-1] [data-test=yol-sandik]").count()
            adim = pg.locator("[data-test=gun-1] [data-test=adim]").count()
            check(n == max(0, (adim - 1) // 3), f"[{tema}] yolda her 3 düğümde bir sandık ({n} sandık, {adim} adım)")
            if n: check(pg.get_attribute("[data-test=gun-1] [data-test=yol-sandik]", "data-durum") == "kilitli" and pg.locator("[data-test=gun-1] [data-test=yol-sandik] button").count() == 0, f"[{tema}] önceki adımlar bitmeden yol sandığı kilitli")
            # 5) geçen haftaki sen
            pg.goto(base + "#/progress"); pg.wait_for_selector("[data-test=gecen-hafta]")
            check(all(pg.locator(f"[data-test=hafta-{k}]").count() == 1 for k in ("xp", "dakika", "kelime")), f"[{tema}] İlerlemem: geçen haftaki sen (XP, dakika, yeni kelime)")
            check("Sıralama yok" in pg.inner_text("[data-test=gecen-hafta]"), f"[{tema}] lig yok; rakip geçen haftaki sen")
            no_overflow(pg, f"[{tema}] İlerlemem")
            if shots: pg.locator("[data-test=gecen-hafta]").scroll_into_view_if_needed(); shot(pg, f"g03-gecen-hafta-{tema}", full=False)
            b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
