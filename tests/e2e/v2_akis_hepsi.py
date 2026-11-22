"""
Akış bayrağı "hepsi" (PM-090 md. 3: akışın bütün günlere açılması): `policy.akis.gunler` üretimde "hepsi"dir, halkası olan her gün
akışla açılır. e2e paketinde 2. güne İÇ'in halka önerisi eklenir; 1. gün tohumla bitirilir (ogrenci_devam.tohumla), sonra:
  - taban ([1]): Bugün'ün BAŞLA'sı 2. günde eski düzene gider (#/garden/2)
  - "hepsi": aynı öğrencide BAŞLA 2. günün akışına gider (#/akis/2) ve akış açılır; plan `akis:2`de saklanır
  - []: 2. gün yine eski düzende (bayrak kapalıyken halkalı gün akışa düşmez)
python3 tests/e2e/v2_akis_hepsi.py [--browser webkit] [--device "iPhone 15"]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish
from ogrenci_devam import tohumla, SIRADAKI

PORT = 4247

def basla(pg, base, deger):
    """bayrağı yazar, Bugün'ü yeniden açar, BAŞLA'nın hedefini döndürür"""
    pg.evaluate("(v) => sessionStorage.setItem('e2e-akis-gunler', v)", deger)
    pg.goto(base + "#/learn"); pg.reload(); pg.goto(base + "#/today")
    pg.wait_for_selector("[data-test=m1-devam]", timeout=15000)
    return pg.evaluate(SIRADAKI)

def main():
    serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        tohumla(pg, 2, 0)
        metin, href = basla(pg, base, "[1]")
        check("2. gün" in (metin or "") and href == "#/garden/2", f"taban [1]: 2. gün eski düzende ({href})")
        metin, href = basla(pg, base, "[]")
        check(href == "#/garden/2", f"bayrak kapalı []: 2. gün eski düzende ({href})")
        metin, href = basla(pg, base, '"hepsi"')
        check("2. gün" in (metin or "") and href == "#/akis/2", f'"hepsi": 2. günün BAŞLA\'sı akışa gider ({href})')
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=akis]", timeout=20000)
        plan = pg.evaluate("""async () => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
          const m = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get('akis:2'); t.onsuccess = () => ok(t.result && t.result.value); }); d.close();
          return m ? { gun: m.plan.gun, halka: m.plan.duraklar.filter((x) => x.tur === 'halka').length } : null; }""")
        check(bool(plan) and plan["gun"] == 2 and plan["halka"] > 0, f"2. günün akışı açıldı, plan saklandı ({plan})")
        b.close()
    finish()

if __name__ == "__main__":
    main()
