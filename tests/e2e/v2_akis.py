"""
AKIS AK-10 4a duman testi: `#/akis/2` (e2e paketinde 2. güne İÇ'in halka önerisi eklenir; 1. gün e2e'de fikstürle değişir).
  - plan kurulur ve `akis:2`de saklanır; ilk durak adımsız (ses) → geçiş adımı
  - ilk halka baştan sona: her adımda tam bir birincil düğme ya da etkileşim; yatay taşma yok; üst çubuk (X, elmaslar, "Neden bu?") taşmaz
  - yeni kelime: cümle, kart sözcüğü vurgulu; "Neden bu?" adımın nedenini açar
  - sayfa yeniden açılınca aynı adımdan sürer (AK-6); her adımın sonucu kayda ve kart kaydına (srs) yazılır
  - halkada yanlış (Bilmiyorum) kart, durağın sonunda bir kez daha gelir
python3 tests/e2e/v2_akis.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4243
KAYIT = """async () => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const m = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get('akis:2'); t.onsuccess = () => ok(t.result && t.result.value); });
  const n = await new Promise((ok) => { const t = d.transaction('items').objectStore('items').count(); t.onsuccess = () => ok(t.result); });
  d.close(); return m ? { durak: m.durak, adim: m.adim, sonuc: m.sonuclar.length, geri: m.geri, ilkDurak: m.plan.duraklar[0].tur, halka: m.plan.duraklar.findIndex((x) => x.tur === 'halka'), items: n } : null; }"""

def ust_cubuk(pg, ne):
    r = pg.evaluate("""() => { const h = document.querySelector('[data-test=akis] header'); const n = document.querySelector('[data-test=akis-neden]').getBoundingClientRect();
      const e = document.querySelector('.akis-elmaslar').getBoundingClientRect(); return { kes: e.right > n.left + 0.5, sag: Math.round(n.right), w: innerWidth }; }""")
    check(not r["kes"] and r["sag"] <= r["w"], f"{ne}: üst çubukta elmaslar 'Neden bu?' ile kesişmiyor ({r})")

def adim_gec(pg, yanlis=False):
    """Şimdiki adımı geçer; yanlis=True ise 'Bilmiyorum' yolu (varsa). Dönen: adım türü"""
    tur = pg.get_attribute("[data-test=akis]", "data-tur")
    if yanlis and pg.locator("[data-test=akis-bilmiyorum]").count():
        pg.click("[data-test=akis-bilmiyorum]"); pg.click("[data-test=akis-devam]")
    elif pg.locator("[data-test=akis-bilmiyorum]").count() and tur == "order":
        pg.click("[data-test=akis-bilmiyorum]"); pg.click("[data-test=akis-devam]")
    elif pg.locator("[data-test=akis-devam]").count(): pg.click("[data-test=akis-devam]")
    elif pg.locator("[data-test=esles-goster]").count(): pg.click("[data-test=esles-goster]"); pg.click("[data-test=esles-devam]")
    elif pg.locator("[data-test=resim-bilmiyorum]").count(): pg.click("[data-test=resim-bilmiyorum]"); pg.click("[data-test=resim-devam]")
    elif pg.locator("button.opt[data-right]").count():
        pg.click("button.opt[data-right]" if not yanlis else "button.opt:not([data-right])"); pg.wait_for_timeout(150); pg.locator(".actionbar .btn.primary").first.click()
    elif pg.locator("[data-cevap] input").count():
        pg.fill("[data-cevap] input", pg.get_attribute("[data-cevap]", "data-cevap") or "x"); pg.locator(".actionbar .btn.primary").first.click(); pg.wait_for_timeout(250)
        if pg.locator(".actionbar .btn.primary").count(): pg.locator(".actionbar .btn.primary").first.click()
    elif pg.locator("[data-test=drill-order]").count():
        # ders maddesi yapbozu (DrillView): doğru dizilim e2e derlemesinde data-cevap'ta
        n = pg.locator("[data-test=drill-order] button[data-chip]").count()
        for k in range(n): pg.locator("[data-test=drill-order] button[data-chip]:not([disabled])").first.click()
        pg.click("[data-test=drill-order] [data-test=submit]"); pg.wait_for_selector("[data-test=next]", timeout=5000); pg.click("[data-test=next]")
    elif pg.locator("[data-test=answer]").count():
        # Bahçe soru bileşeni (TR→DE, boşluk): yanlış cevapla geçilir; kart halkada bir kez daha gelir
        pg.fill("[data-test=answer]", "xyz"); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=next]", timeout=5000); pg.click("[data-test=next]")
    else:
        b = pg.locator(".actionbar .btn.primary").first
        if not (b.count() and b.is_enabled()): return None
        b.click()
    pg.wait_for_timeout(250)
    return tur

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/akis/2"); pg.wait_for_selector("[data-test=akis]", timeout=20000)
        k = pg.evaluate(KAYIT)
        check(k and k["ilkDurak"] == "ses" and k["halka"] == 1, f"plan kuruldu ve saklandı; ilk durak ses, sonra halka ({k})")
        check(pg.locator("[data-test=akis-durak-gecis]").count() == 1 and pg.locator("[data-tab=today]").count() == 0, "adımsız durak: tek geçiş adımı; sekme çubuğu yok")
        adim_gec(pg)
        # yeni kelime (TARGET3b 2)
        pg.wait_for_selector("[data-test=akis-tanit]")
        check(pg.locator("[data-test=tanit-cumle] mark.tanit-vurgu").count() >= 1, "yeni kelime: cümlede kartın sözcüğü vurgulu")
        ust_cubuk(pg, "yeni kelime")
        pg.click("[data-test=akis-neden]"); check(len(pg.inner_text("[data-test=akis-neden-metin]")) > 3, "'Neden bu?' adımın nedenini açar"); pg.click("[data-test=akis-neden]")
        no_overflow(pg, "yeni kelime"); shot(pg, f"akis-tanit-{sema}", full=False)
        # ilk halka baştan sona; üçüncü üretim adımında 'Bilmiyorum' (yanlış → bir kez daha)
        durak0 = pg.get_attribute("[data-test=akis]", "data-durak"); turler, yanlis_kart, yeniden = [], None, False
        for i in range(80):
            if pg.locator("[data-test=halka-sonu]").count() or pg.get_attribute("[data-test=akis]", "data-durak") != durak0: break
            if i == 6 and not yeniden:
                once = pg.get_attribute("[data-test=akis]", "data-adim"); pg.reload(); pg.wait_for_selector("[data-test=akis]", timeout=20000)
                check(pg.get_attribute("[data-test=akis]", "data-adim") == once, f"yeniden açınca aynı adımdan sürer ({once})"); yeniden = True
            tur = pg.get_attribute("[data-test=akis]", "data-tur")
            if tur not in turler: turler.append(tur); no_overflow(pg, f"halka adımı {tur}"); shot(pg, f"akis-{tur}-{sema}", full=False)
            ilk_yanlis = yanlis_kart is None and pg.locator("[data-test=akis-bilmiyorum]").count() > 0
            if ilk_yanlis: yanlis_kart = pg.get_attribute("[data-test=akis]", "data-adim")
            if adim_gec(pg, yanlis=ilk_yanlis) is None: check(False, f"halka adımı geçilemedi: {tur}"); break
        # halka sonu (TARGET3b 6): kelime başına dört nokta, sıradaki durak, Devam/Mola
        pg.wait_for_selector("[data-test=halka-sonu]", timeout=5000)
        satir = pg.locator("[data-test=halka-sonu-liste] [data-kart]")
        check(satir.count() >= 3 and pg.locator("[data-test=halka-sonu-liste] .kip-nokta").count() == satir.count() * 4, f"halka sonu: {satir.count()} kelime × 4 nokta")
        check(pg.locator("[data-test=halka-sonu-liste] .kip-nokta.dolu").count() >= satir.count(), "halka sonu: her kelimede en az bir dolu nokta (gördün)")
        check(pg.locator("[data-test=halka-sonu-sonraki]").count() == 1 and pg.locator("[data-test=halka-sonu-mola]").count() == 1, "halka sonu: sıradaki durak ve 'Mola ver'")
        no_overflow(pg, "halka sonu"); shot(pg, f"akis-halka-sonu-{sema}", full=False)
        pg.click("[data-test=halka-sonu-devam]"); pg.wait_for_selector("[data-test=akis]")
        k2 = pg.evaluate(KAYIT)
        check(len(turler) >= 4, f"ilk halkada en az 4 tür ({turler})")
        check(k2["sonuc"] > 10 and k2["items"] > 0, f"sonuçlar kayda ve kart kaydına yazıldı ({k2['sonuc']} sonuç, {k2['items']} kart)")
        check(yanlis_kart is not None and any(v for v in k2["geri"].values()), f"'Bilmiyorum' denen kart halkada bir kez daha geldi ({k2['geri']})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
