"""
PM 7024150313: Bahçe tanıtım kartı en uzun kartta da (en çok eşdizim, en uzun örnek cümle, görselli) 430×932'de düğmelere
değmeden sığar; kartta en çok 3 eşdizim açık, kalanı "Daha fazla (n)" ile açılır. Tahminen en uzun 40 kart gerçek görsel düzeniyle
(seçilmiş fotoğraf + atıf) ölçülür; tek esneyen parça görsel (160 → en az 96 px, gerekirse yok; #12 7033585915).
python3 tests/e2e/v2_tanitim_sigar.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import base64, json, math
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, content_file

PORT = 4216
ADAY = 40  # tahminen en uzun kartlar; her biri görselli ölçülür (inceleme #136 P2-4)
JPEG = base64.b64decode("/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k=")


def satir(n, w):
    return max(1, math.ceil(n / w))


def tahmin(l):
    """kabaca kart yüksekliği: kelime (büyük yazı, ~13 harf/satır), anlam + çoğul, en uzun örnek, ilk 3 eşdizim (~40 harf/satır)"""
    kelime = satir(len((l.get("art") or "") + " " + l["de"]), 13)
    anlam = satir(len(l.get("tr", "")) + len(l.get("pl") or "") + 12, 40)
    ornek = max(satir(len(e["de"]), 40) + satir(len(e.get("tr", "")), 40) for e in l["examples"])
    esd = sum(satir(len(c["de"]) + len(c.get("tr", "")) + 3, 40) for c in (l.get("collocations") or [])[:3])
    return 62 * kelime + 24 * (anlam + ornek + esd) + (40 if len(l.get("collocations") or []) > 3 else 0)


def adaylar():
    lex = content_file("lexemes.json")["lexemes"]
    kart = [l for l in lex if l.get("card", True) is not False and l.get("tier") != "passive" and l.get("examples")]
    return sorted(kart, key=lambda l: -tahmin(l))[:ADAY]


def en_uzun():
    return max(adaylar(), key=lambda l: (len(l.get("collocations") or []), tahmin(l)))


def ac(pg, base, lid):
    pg.evaluate("(k) => sessionStorage.setItem('e2e-kart', k)", lid)
    pg.goto(base + "#/today"); pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
    # görsel çizilip kart oturana kadar (ResizeObserver küçültmesi dahil)
    pg.wait_for_function("""() => { const k = document.querySelector('[data-test=garden-intro] section.card'); if (!k) return false;
      const f = k.querySelector('[data-test=foto] img'); return k.dataset.fotoH === '0' || (f && f.complete); }""", timeout=8000)
    pg.wait_for_timeout(250); pg.evaluate("window.scrollTo(0, 0)")


def olc(pg):
    return pg.evaluate("""() => { const k = document.querySelector('[data-test=garden-intro] section.card');
      const ust = Math.min(...[...document.querySelectorAll('.actionbar button')].map((b) => b.getBoundingClientRect().top));
      return { alt: Math.round(k.getBoundingClientRect().bottom + scrollY), ust: Math.round(ust), foto: +k.dataset.fotoH,
        img: Math.round(k.querySelector('[data-test=foto] img')?.getBoundingClientRect().height || 0) }; }""")


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    aday = adaylar(); l = en_uzun()
    # her adaya seçilmiş açık fotoğraf (gerçek düzen: görsel + atıf); görsel isteği sahte JPEG
    kayit = {f"{x['id']}#kart": {"src": f"https://foto.example/{i}.jpg", "sinif": "acik", "yazar": "Örnek Yazar", "lisans": "CC BY 2.0",
             "lisans_url": "https://creativecommons.org/licenses/by/2.0", "sayfa": "https://commons.wikimedia.org/wiki/File:X.jpg"} for i, x in enumerate(aday)}
    with sync_playwright() as p:
        # PM ölçütü 430×932 (kabukta tam ekran); cihaz öykünmesinin Safari çubuklu görünümü değil
        b, ctx = launch(p, viewport={"width": 430, "height": 932}); pg = new_page(ctx)
        pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": kayit})))
        pg.route("https://foto.example/**", lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG))
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # 1) en uzun 40 aday: hepsi düğmelere değmeden sığar; görsel yalnızca gerektiği kadar küçülür (96 px altına inmez; inmesi gerekirse yok)
        sonuc = []
        for x in aday:
            ac(pg, base, x["id"]); r = olc(pg); sonuc.append((x["id"], r))
        tasan = [(i, r["alt"] - r["ust"]) for i, r in sonuc if r["alt"] > r["ust"]]
        check(not tasan, f"en uzun {len(aday)} aday kart düğmelere değmeden sığıyor (taşan: {tasan[:5]})")
        kucuk = [(i, r["foto"]) for i, r in sonuc if 0 < r["foto"] < 160]; yok = [i for i, r in sonuc if r["foto"] == 0]
        check(all(r["foto"] == 0 or r["foto"] >= 96 for _, r in sonuc), "görsel 96 px altına inmiyor (inmesi gerekirse gösterilmiyor)")
        check(all(r["img"] <= max(r["foto"], 1) + 1 for _, r in sonuc), "görsel yüksekliği ayarlanan sınırı aşmıyor")
        print("  · boşluk (düğme üstü − kart altı):", sorted([(i, r["ust"] - r["alt"], r["foto"]) for i, r in sonuc if 0 < r["foto"] < 160], key=lambda t: -t[1])[:8])
        print(f"  · görsel tam: {len(aday) - len(kucuk) - len(yok)}, küçüldü: {len(kucuk)} {kucuk[:6]}, gösterilmedi: {len(yok)} {yok[:6]}")
        # 2) eşdizim kuralı ve ayrıntı ölçütleri en çok eşdizimli aday üzerinde
        ac(pg, base, l["id"])
        n_acik = pg.locator("[data-test=intro-colloc] > ul.esdizim-liste > li").count()
        n_top = len(l.get("collocations") or [])
        check(n_acik == min(3, n_top), f"en çok 3 eşdizim açık ({n_acik}/{n_top}; {l['id']})")
        if n_top > 3:
            check(pg.inner_text("[data-test=esdizim-daha] > summary").strip() == f"Daha fazla ({n_top - 3})", "kalanı 'Daha fazla (n)'")
        r = olc(pg)
        check(r["alt"] <= r["ust"], f"tanıtım kartı düğmelere değmeden sığıyor (kart altı {r['alt']} px ≤ düğme üstü {r['ust']} px; görsel {r['foto']} px, {l['id']})")
        if shots: shot(pg, "t01-en-uzun-kart", full=False)
        # PM 7026866757: (1) örnek cümle tam genişlikte, hecelenmez; (2) "Başka cümle" ve "Daha fazla" aynı üslup;
        # (3) "Daha fazla" açılınca son satır görünür ve birincil düğmeyle kesişmez
        r = pg.evaluate("""() => { const p = document.querySelector('[data-test=intro-ex]'), k = p.closest('section.card'), cs = getComputedStyle(k);
          const ic = k.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return { gen: Math.round(p.getBoundingClientRect().width), ic: Math.round(ic), hy: getComputedStyle(p.querySelector('[lang=de]')).webkitHyphens || getComputedStyle(p.querySelector('[lang=de]')).hyphens }; }""")
        check(abs(r["gen"] - r["ic"]) <= 2 and r["hy"] == "manual", f"örnek cümle tam genişlikte ve hecelenmez ({r})")
        if pg.locator("[data-test=baska-cumle]").count() and pg.locator("[data-test=esdizim-daha]").count():
            u = pg.evaluate("""() => ['[data-test=baska-cumle]', '[data-test=esdizim-daha] > summary'].map((q) => { const c = getComputedStyle(document.querySelector(q)); return [c.textDecorationLine, c.fontWeight, c.color]; })""")
            check(u[0] == u[1], f"'Başka cümle' ve 'Daha fazla' aynı üslupta ({u})")
        if pg.locator("[data-test=esdizim-daha]").count():
            pg.click("[data-test=esdizim-daha] > summary"); pg.wait_for_timeout(900)
            k = pg.evaluate("""() => { const li = document.querySelector('[data-test=esdizim-daha] li:last-child').getBoundingClientRect();
              const ust = Math.min(...[...document.querySelectorAll('.actionbar button')].map((b) => b.getBoundingClientRect().top));
              return { alt: Math.round(li.bottom), ust: Math.round(ust), gor: li.top >= 0 && li.bottom <= innerHeight }; }""")
            check(k["gor"] and k["alt"] <= k["ust"], f"'Daha fazla' açıkken son eşdizim satırı görünür, düğmelerin üstünde ({k})")
            if shots: shot(pg, "t02-daha-fazla-acik", full=False)
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
