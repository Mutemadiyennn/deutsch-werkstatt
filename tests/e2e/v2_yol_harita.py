"""
Şölen 2 / B11a (PM-065 madde 1–4) — yol haritası ve üst durum çubuğu:
  - durum çubuğu (seri, XP, bugünkü dakika / hedef) sekmeli ekranların hepsinde; öğrenme ekranlarında yok
  - yol: gün bandı ("1. HAFTA · GÜN N — başlık") + Rehber; her adım bir düğüm (türüne göre simge), gün sonu düğümü
  - durumlar: şimdiki düğüm "BAŞLA" balonu + ilerleme halkası, bağlantı; kilitli düğüm bağlantı değil; dokunma hedefi ≥ 44 pt
  - Rehber: günün hedefi, kalıpları, kelimeleri (sayı = günün yeni kartları)
  - açık ve koyu tema ekran görüntüsü; --gif: 10 sn'lik GIF (PM-065 ölçüsü)
python3 tests/e2e/v2_yol_harita.py [--browser webkit] [--device "iPhone 15 Pro Max"] [--shots DIR] [--gif DOSYA]
"""
import io, json, os
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4209
# öğenin yazı/simge rengi ile en yakın opak zemin arasındaki kontrast
KONTRAST = r"""(sel) => { const el = document.querySelector(sel);
  const rgb = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number);
  const L = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  let z = el, bg = 'rgba(0, 0, 0, 0)';
  while (z && (bg = getComputedStyle(z).backgroundColor).match(/rgba\(.*, 0\)$/)) z = z.parentElement;
  if (!z) bg = getComputedStyle(document.body).backgroundColor;
  const a = L(rgb(getComputedStyle(el).color)), b = L(rgb(bg)); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); }"""
KOK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")

def main():
    shots, gif = arg("--shots"), arg("--gif")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    kareler = []
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            # 1) durum çubuğu sekmeli ekranlarda
            for h in ("#/today", "#/yol", "#/learn", "#/profile"):
                pg.goto(base + h); pg.wait_for_selector("[data-test=durum-cubugu]")
                check(all(pg.locator(f"[data-test=durum-{k}]").count() == 1 for k in ("seri", "xp", "dk")), f"[{tema}] {h}: üst çubukta seri, XP, dakika")
            kutu = pg.locator("[data-test=durum-xp]").bounding_box()
            check(kutu and kutu["height"] >= 44, f"[{tema}] durum öğesi dokunma hedefi ≥ 44 pt ({kutu and round(kutu['height'])})")
            check("/100 dk" in pg.inner_text("[data-test=durum-dk]"), f"[{tema}] dakika halkası hedefi gösteriyor ({pg.inner_text('[data-test=durum-dk]')!r})")
            pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
            check(pg.locator("[data-test=durum-cubugu]").count() == 0, f"[{tema}] öğrenme ekranında (Bahçe) durum çubuğu yok")
            # 2) yol haritası
            pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol] [data-test=gun-1]")
            bant = pg.inner_text("[data-test=gun-1] .gun-bant")
            check("1. HAFTA" in bant and "GÜN 1" in bant, f"[{tema}] gün bandı: hafta ve gün ({bant.splitlines()[0]!r})")
            # kontrast (inceleme #104 P1-1): yazı ≥ 4,5; simge ≥ 3
            for sel, esik, ad in [("[data-test=gun-1] .gun-bant-ad", 4.5, "gün adı"), ("[data-test=gun-1] .gun-bant-ust", 4.5, "hafta·gün satırı"),
                                  (".basla-balon", 4.5, "BAŞLA balonu"), (".dugum-yer.acik .dugum", 3, "açık düğüm simgesi"), (".dugum-onay", 3, "onay işareti")]:
                if not pg.locator(sel).count(): continue
                kon = pg.evaluate(KONTRAST, sel)
                check(kon >= esik, f"[{tema}] {ad} kontrastı {kon:.2f}:1 (≥ {esik})")
            adim = pg.locator("[data-test=gun-1] [data-test=adim]").count()
            check(adim >= 3 and pg.locator("[data-test=gun-1] .dugum-yer.son").count() == 1, f"[{tema}] her adım bir düğüm ({adim}) + gün sonu düğümü")
            simdi = pg.locator("[data-test=adim][data-durum=simdi]")
            check(simdi.count() == 1 and simdi.locator(".basla-balon").count() == 1 and simdi.locator(".dugum-halka").count() == 1, f"[{tema}] şimdiki düğüm: BAŞLA balonu ve ilerleme halkası")
            check(simdi.locator("a.dugum").count() == 1 and simdi.locator("a.dugum").get_attribute("aria-current") == "step", f"[{tema}] şimdiki düğüm bağlantı, aria-current=step")
            kilitli = pg.locator("[data-test=adim][data-durum=kilitli]")
            check(kilitli.count() == 0 or kilitli.locator("a").count() == 0, f"[{tema}] kilitli düğüm bağlantı değil ({kilitli.count()})")
            d = simdi.locator(".dugum").bounding_box()
            check(d and d["width"] >= 44 and d["height"] >= 44, f"[{tema}] düğüm dokunma hedefi ≥ 44 pt ({d and round(d['width'])}×{d and round(d['height'])})")
            turler = set(pg.locator("[data-test=gun-1] [data-test=adim]").evaluate_all("(xs) => xs.map((x) => x.dataset.tur)"))
            check({"bahce"} <= turler, f"[{tema}] düğüm türleri ({sorted(turler)})")
            no_overflow(pg, f"[{tema}] yol haritası")
            if shots: shot(pg, f"h01-yol-{tema}", full=False)
            # kabartma: basınca çöker (yalnızca görsel; gezinme olmadan)
            if gif and tema == "light":
                pg.evaluate("scrollTo(0, 0)")
                for _ in range(6): kareler.append(pg.screenshot()); pg.wait_for_timeout(250)
                pg.mouse.wheel(0, 500); pg.wait_for_timeout(300)
                for _ in range(8): kareler.append(pg.screenshot()); pg.wait_for_timeout(250)
                pg.evaluate("scrollTo(0, 0)"); pg.wait_for_timeout(300)
            # 3) şimdiki düğüm etkinliği açar
            href = simdi.locator("a.dugum").get_attribute("href")
            simdi.locator("a.dugum").click(); pg.wait_for_function("(h) => location.hash === h", arg=href)
            check(True, f"[{tema}] şimdiki düğüm etkinliği açtı ({href})")
            # 4) Rehber
            pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=rehber-1]")
            pg.click("[data-test=rehber-1]"); pg.wait_for_selector("[data-test=rehber]")
            gun = json.loads(pg.evaluate("async () => JSON.stringify(await (await fetch('content/m1/gun-01.json')).json())")) if pg.evaluate("async () => (await fetch('content/m1/gun-01.json')).ok") else None
            n = pg.locator("[data-test=rehber-kelime]").count()
            check(n >= 1 and (gun is None or n <= len(gun["yeni_kartlar"])), f"[{tema}] Rehber: günün kelimeleri ({n})")
            check(pg.locator("[data-test=rehber-yapabilir]").count() == 1, f"[{tema}] Rehber: gün sonu hedefi")
            check(pg.locator("[data-test=rehber] a[href^='#/kalip']").count() == 0, f"[{tema}] Rehber: henüz olmayan kalıp rotasına bağlantı yok")
            check("{" not in pg.inner_text("[data-test=rehber]"), f"[{tema}] Rehber: ham yer tutucu yok")
            no_overflow(pg, f"[{tema}] Rehber")
            if shots: shot(pg, f"h02-rehber-{tema}", full=False)
            if gif and tema == "light":
                for _ in range(8): kareler.append(pg.screenshot()); pg.wait_for_timeout(250)
                pg.mouse.wheel(0, 600); pg.wait_for_timeout(300)
                for _ in range(8): kareler.append(pg.screenshot()); pg.wait_for_timeout(250)
            # %130 yazı
            pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=gun-1]")
            pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
            no_overflow(pg, f"[{tema}] %130 yazı yol haritası")
            b.close()
    srv.shutdown()
    if gif and kareler:
        from PIL import Image
        im = [Image.open(io.BytesIO(k)).convert("P", palette=Image.ADAPTIVE) for k in kareler]
        w = 390; im = [x.resize((w, int(x.height * w / x.width))) for x in im]
        im[0].save(gif, save_all=True, append_images=im[1:], duration=int(10000 / len(im)), loop=0, optimize=True)
        check(os.path.getsize(gif) > 0, f"GIF yazıldı ({len(im)} kare, ~10 sn)")
    finish()

if __name__ == "__main__":
    main()
