"""
PM 7024150313: Bahçe tanıtım kartı en uzun kartta da (en çok eşdizim, en uzun örnek cümle, görselli) 430×932'de düğmelere
değmeden sığar; kartta en çok 3 eşdizim açık, kalanı "Daha fazla (n)" ile açılır. Tahminen en uzun 40 kart gerçek görsel düzeniyle
(seçilmiş fotoğraf + atıf) ölçülür; görsel gizlenmez, sığmayan kartta kelimenin yanında kare (D-123, #12 7035903811).
python3 tests/e2e/v2_tanitim_sigar.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import base64, json, math
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, content_file

PORT = 4216
ADAY = 80  # tahminen en uzun kartlar; her biri görselli ölçülür (inceleme #136 P2-4, #152 P2-5)
PAY = 8    # kart altı ile düğme üstü arasında en az: tam düzende 8 px (eylem çubuğunun saydam geçişi; inceleme #152 P2-6)
PAY_KARE = 4  # kare düzende 4 px (#12 7036694275 md. 3)
pay = lambda r: PAY_KARE if r.get("duzen") == "kare" else PAY
JPEG = base64.b64decode("/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k=")


def satir(n, w):
    return max(1, math.ceil(n / w))


def tahmin(l):
    """kabaca kart yüksekliği: kelime (büyük yazı, ~13 harf/satır), anlam + çoğul, en uzun örnek, ilk 3 eşdizim (~40 harf/satır)"""
    kelime = satir(len((l.get("art") or "") + " " + l["de"]), 13)
    anlam = satir(len(l.get("tr", "")) + len(l.get("pl") or "") + 12, 40)
    # örnek alanı en uzun örnek kadar yer tutar (#136 C): bütün örneklerin en uzunu
    ornek = max(satir(len(e["de"]), 40) + satir(len(e.get("tr", "")), 40) for e in l["examples"])
    cogul = satir(len(l.get("pl") or ""), 30) if l.get("pl") else 0
    esd = sum(satir(len(c["de"]) + len(c.get("tr", "")) + 3, 40) for c in (l.get("collocations") or [])[:3])
    return 62 * kelime + 24 * (anlam + ornek + esd + cogul) + (40 if len(l.get("collocations") or []) > 3 else 0) + (44 if len(l["examples"]) > 1 else 0)


def adaylar():
    lex = content_file("lexemes.json")["lexemes"]
    kart = [l for l in lex if l.get("card", True) is not False and l.get("tier") != "passive" and l.get("examples")]
    return sorted(kart, key=lambda l: -tahmin(l))[:ADAY]


def en_uzun():
    return max(adaylar(), key=lambda l: (len(l.get("collocations") or []), tahmin(l)))


def ac(pg, base, lid):
    pg.evaluate("(k) => sessionStorage.setItem('e2e-kart', k)", lid)
    # her kart temiz bir yüklemeyle açılır (WebKit'te art arda iki hash geçişi birleşebiliyor; #152 CI zaman aşımı)
    pg.goto(base + "#/garden/1"); pg.reload()
    pg.wait_for_selector("[data-test=garden-intro], [data-test=garden-done], [data-test=garden-empty], [data-test=hizli-oneri]", timeout=15000)
    if not pg.locator("[data-test=garden-intro]").count():
        raise AssertionError(f"{lid}: tanıtım yerine başka ekran ({pg.inner_text('main')[:120]!r})")
    # görsel çizilip kart oturana kadar (düzen kararı dahil)
    pg.wait_for_function("""() => { const k = document.querySelector('[data-test=garden-intro] section.card'); if (!k) return false;
      const f = k.querySelector('[data-test=foto] img'); return !!(f && f.complete); }""", timeout=8000)
    pg.wait_for_timeout(300); pg.evaluate("window.scrollTo(0, 0)")


def olc(pg):
    return pg.evaluate("""() => { const k = document.querySelector('[data-test=garden-intro] section.card');
      const ust = Math.min(...[...document.querySelectorAll('[data-test=garden-intro] .actionbar button')].map((b) => b.getBoundingClientRect()).filter((r) => r.height > 0).map((r) => r.top));
      const img = k.querySelector('[data-test=foto] img');
      return { alt: Math.round(k.getBoundingClientRect().bottom + scrollY), ust: Math.round(ust), duzen: k.dataset.duzen,
        img: Math.round(img?.getBoundingClientRect().height || 0), atif: !!k.querySelector('[data-test=foto-atif]') }; }""")


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    aday = adaylar(); l = en_uzun()
    # her adaya seçilmiş açık fotoğraf (gerçek düzen: görsel + atıf); görsel isteği sahte JPEG
    kayit = {f"{x['id']}#kart": {"src": f"https://foto.example/{i}.jpg", "sinif": "acik", "yazar": "Örnek Yazar", "lisans": "CC BY 2.0",
             "lisans_url": "https://creativecommons.org/licenses/by/2.0", "sayfa": "https://commons.wikimedia.org/wiki/File:X.jpg"} for i, x in enumerate(aday + [{"id": "lx:Montag"}])}
    with sync_playwright() as p:
        # PM ölçütü 430×932 (kabukta tam ekran); cihaz öykünmesinin Safari çubuklu görünümü değil
        b, ctx = launch(p, viewport={"width": 430, "height": 932}); pg = new_page(ctx)
        pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": kayit})))
        pg.route("https://foto.example/**", lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG))
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # 1) en uzun 80 aday: hepsi düğmelere en az PAY px kala sığar; görsel HİÇ gizlenmez (LS §1); sığmayan kartta kare düzen
        sonuc = []
        for x in aday:
            ac(pg, base, x["id"]); r = olc(pg); sonuc.append((x["id"], r))
        tasan = [(i, r["alt"] + pay(r) - r["ust"]) for i, r in sonuc if r["alt"] + pay(r) > r["ust"]]
        check(not tasan, f"en uzun {len(aday)} aday kart düğmelere en az {PAY} px (kare düzende {PAY_KARE}) kala sığıyor (taşan: {tasan[:6]})")
        gorselsiz = [i for i, r in sonuc if not r["img"] or not r["atif"]]
        check(not gorselsiz, f"görsel ve atıf hiçbir kartta gizlenmiyor (görselsiz: {gorselsiz[:6]})")
        kare = [i for i, r in sonuc if r["duzen"] == "kare"]
        check(all(r["img"] <= (104 if r["duzen"] == "kare" else 160) + 1 for _, r in sonuc), "görsel boyu düzenin sınırında (tam 160, kare 104)")
        print(f"  · düzen: tam {len(aday) - len(kare)}, kare {len(kare)} {kare[:8]}")
        # kısa kart tam düzende 160 px kalır; "Daha fazla" aç/kapat düzeni değiştirmez (inceleme #152 P1-2)
        ac(pg, base, "lx:Montag"); r = olc(pg)
        check(r["duzen"] == "tam" and r["img"] >= 150, f"kısa kart tam düzende, görsel 160 px ({r})")
        uzun_daha = next((i for i, _ in sonuc if len(next(x for x in aday if x["id"] == i).get("collocations") or []) > 3), None)
        if uzun_daha:
            ac(pg, base, uzun_daha); once = olc(pg)
            pg.click("[data-test=esdizim-daha] > summary"); pg.wait_for_timeout(700)
            pg.click("[data-test=esdizim-daha] > summary"); pg.wait_for_timeout(500)
            sonra = olc(pg)
            check(once["duzen"] == sonra["duzen"] and abs(once["img"] - sonra["img"]) <= 1, f"'Daha fazla' aç/kapat düzeni ve görseli değiştirmiyor ({uzun_daha}: {once['duzen']}/{once['img']} → {sonra['duzen']}/{sonra['img']})")
        # 2) eşdizim kuralı ve ayrıntı ölçütleri en çok eşdizimli aday üzerinde
        ac(pg, base, l["id"])
        n_acik = pg.locator("[data-test=intro-colloc] > ul.esdizim-liste > li").count()
        n_top = len(l.get("collocations") or [])
        check(n_acik == min(3, n_top), f"en çok 3 eşdizim açık ({n_acik}/{n_top}; {l['id']})")
        if n_top > 3:
            check(pg.inner_text("[data-test=esdizim-daha] > summary").strip() == f"Daha fazla ({n_top - 3})", "kalanı 'Daha fazla (n)'")
        r = olc(pg)
        check(r["alt"] + pay(r) <= r["ust"], f"tanıtım kartı düğmelere değmeden sığıyor (kart altı {r['alt']} px + {pay(r)} ≤ düğme üstü {r['ust']} px; düzen {r['duzen']}, {l['id']})")
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
