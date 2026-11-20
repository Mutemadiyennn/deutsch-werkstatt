"""
AKIS AK-10 3. adım: halkanın iki yeni türü (hedef design/TARGET3b 3. ve 4. ekran). Ekran (4. adım) gelene kadar e2e yolu `#/__halka-turleri`.
  Resimden seç: cevaptan önce Almanca metin yok · dört görsel 2×2 · seçimsiz "Kontrol et" pasif · cevapta doğru görsel işaretli, kelime
    Almanca + Türkçe · "Bilmiyorum" cevabı gösterir, yanlış sayar · atıf "Fotoğraf kaynakları"nda · görsel yüklenemezse tür düşer
  Eşleştir: "Kontrol et" yok · yanlışta sallanma, ceza yok, iki kart "bir kez daha" · doğru çift ✓ kilitli · "Bilmiyorum, göster"
    kalanları açar, yanlış sayar · hücre ≥ 44 pt
  Yerleşim (PM-079 md. 4): 932 ve 844 yükseklikte birincil düğme tam görünür ve kesişmiyor · etkileşimli öğeler üst üste değil ·
    yatay taşma yok · açık + koyu · uygulama açıkken ağ kesilince iki tür de çalışır
python3 tests/e2e/v2_halka_tur.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import io, json
from urllib.parse import unquote
from playwright.sync_api import sync_playwright
from PIL import Image
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4232
KARTLAR = ["Winter", "Frühling", "Herbst", "Nacht", "Apfel", "Käse", "Frau", "Urlaub"]
RENK = [(40, 60, 110), (170, 220, 170), (210, 140, 60), (20, 25, 60), (200, 40, 40), (240, 210, 90), (200, 120, 150), (90, 170, 220)]
def jpeg(rgb):
    b = io.BytesIO(); Image.new("RGB", (400, 400), rgb).save(b, "JPEG", quality=70); return b.getvalue()
GORSEL = {k.lower(): jpeg(RENK[i]) for i, k in enumerate(KARTLAR)}
FOTO = {f"lx:{k}#kart": {"src": f"https://foto.example/{k.lower()}.jpg", "sinif": "acik", "yazar": f"Yazar {i + 1}", "lisans": "CC BY 2.0",
                         "lisans_url": "https://creativecommons.org/licenses/by/2.0", "sayfa": f"https://commons.wikimedia.org/wiki/File:{k}.jpg"} for i, k in enumerate(KARTLAR)}

def yonlendir(pg, bozuk=()):
    pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": FOTO})))
    def img(r):
        ad = unquote(r.request.url.rsplit("/", 1)[-1].removesuffix(".jpg"))
        if ad in bozuk: return r.fulfill(status=404, body="")
        r.fulfill(status=200, content_type="image/jpeg", body=GORSEL.get(ad, GORSEL["winter"]))
    pg.route("https://foto.example/**", img)

YERLESIM = """(birincil) => { const b = document.querySelector(birincil); const q = b.getBoundingClientRect();
  const ust = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
  const els = [...document.querySelectorAll('[data-test=halka-turleri] button, [data-test=halka-turleri] a, [data-test=halka-turleri] summary')].filter((e) => { const r = e.getBoundingClientRect(); if (!(r.width > 0 && r.height > 0) || (e.checkVisibility && !e.checkVisibility())) return false;
    // eylem çubuğunun altında kalan (kaydırınca görünen) içerik kesişme sayılmaz; çubuğun kendi öğeleri sayılır
    const bar = document.querySelector('.actionbar'); if (!bar || bar.contains(e)) return true; return r.top < bar.getBoundingClientRect().top; });
  const rs = els.map((e) => e.getBoundingClientRect()); let kes = [];
  for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) { const a = rs[i], c = rs[j];
    if (els[i].contains(els[j]) || els[j].contains(els[i])) continue;
    const w = Math.min(a.right, c.right) - Math.max(a.left, c.left), h = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
    if (w > 1 && h > 1) kes.push([els[i].dataset.test || els[i].textContent.slice(0, 12), els[j].dataset.test || els[j].textContent.slice(0, 12)]); }
  return { ust: Math.round(q.top), alt: Math.round(q.bottom), h: innerHeight, gorunur: b.contains(ust), kes }; }"""

def yerlesim(pg, birincil, ne):
    for yuk in (932, 844):
        pg.set_viewport_size({"width": pg.viewport_size["width"], "height": yuk}); pg.wait_for_timeout(300)
        r = pg.evaluate(YERLESIM, birincil)
        check(r["ust"] >= 0 and r["alt"] <= r["h"] and r["gorunur"], f"{ne} {yuk}: birincil düğme tam görünür, üstünde başka öğe yok ({r['ust']}–{r['alt']}/{r['h']})")
        check(not r["kes"], f"{ne} {yuk}: etkileşimli öğeler üst üste değil ({r['kes'][:3]})")
        no_overflow(pg, f"{ne} {yuk}")
    pg.set_viewport_size({"width": pg.viewport_size["width"], "height": 932}); pg.wait_for_timeout(200)

def resim_akisi(pg, sema):
    pg.wait_for_selector("[data-test=resim-sec]")
    pg.wait_for_function("() => [...document.querySelectorAll('[data-test=resim-secenek] img')].every((i) => i.complete && i.naturalWidth > 0)", timeout=8000)
    s = pg.locator("[data-test=resim-sec]")
    check(pg.locator("[data-test=resim-secenek]").count() == 4, "resimden seç: dört görsel")
    izgara = pg.evaluate("() => [...document.querySelectorAll('[data-test=resim-secenek]')].map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; })")
    check(len({x[0] for x in izgara}) == 2 and len({x[1] for x in izgara}) == 2 and all(abs(x[2] - x[3]) <= 2 and x[2] >= 120 for x in izgara), f"görseller 2×2, kare, ≥ 120 px ({izgara})")
    lang_de = s.locator("[lang=de]").count()
    metin = s.inner_text()
    check(lang_de == 0 and "Winter" not in metin and "Winter" not in (pg.locator("[data-test=resim-secenek]").first.get_attribute("aria-label") or ""), f"cevaptan önce Almanca metin yok (lang=de {lang_de})")
    check(pg.locator("[data-test=listen]").count() >= 1 and pg.locator("[data-test=listen-slow]").count() >= 1, "dinle düğmesi ve 'Yavaş'")
    check(pg.locator("[data-test=resim-kontrol]").is_disabled(), "seçim yapılmadan 'Kontrol et' pasif")
    check(pg.locator("[data-test=resim-yeniden]").count() == 1 and pg.locator("[data-test=resim-bilmiyorum]").count() == 1, "altta 'Yeniden dinle' ve 'Bilmiyorum'")
    yerlesim(pg, "[data-test=resim-kontrol]", f"resimden seç [{sema}]")
    shot(pg, f"halka-resim-{sema}", full=False)
    # yanlış görseli seç → Kontrol et
    pg.locator("[data-test=resim-secenek]:not([data-right])").first.click()
    check(not pg.locator("[data-test=resim-kontrol]").is_disabled(), "seçimden sonra 'Kontrol et' etkin")
    pg.click("[data-test=resim-kontrol]"); pg.wait_for_selector("[data-test=resim-cevap]")
    cev = pg.inner_text("[data-test=resim-cevap]")
    check("der Winter" in cev and "kış" in cev, f"cevapta kelime Almanca + Türkçe ({cev!r})")
    check(pg.locator("[data-test=resim-secenek][data-right].right").count() == 1 and pg.locator("[data-test=resim-secenek].wrong").count() == 1, "doğru görsel işaretli, seçilen yanlış işaretli")
    shot(pg, f"halka-resim-cevap-{sema}", full=False)
    yerlesim(pg, "[data-test=resim-devam]", f"resimden seç cevap [{sema}]")
    atif = pg.locator("[data-test=resim-atif]")
    atif.locator("summary").click()
    check("CC BY 2.0" in atif.inner_text() and atif.locator("a[href*='creativecommons.org']").count() == 4, "atıf: dört görselin yazarı ve lisansı 'Fotoğraf kaynakları'nda")
    pg.click("[data-test=resim-devam]")

def esles_akisi(pg, sema):
    pg.wait_for_selector("[data-test=eslestir]")
    sol = pg.locator("[data-test=esles-sol]"); sag = pg.locator("[data-test=esles-sag]")
    check(sol.count() == 5 and sag.count() == 5, f"eşleştir: 5 satır ({sol.count()}/{sag.count()})")
    check(pg.locator("[data-test=eslestir]").get_by_text("Kontrol et").count() == 0, "eşleştirde 'Kontrol et' yok")
    boy = pg.evaluate("() => Math.min(...[...document.querySelectorAll('.esles-hucre')].map((e) => e.getBoundingClientRect().height))")
    check(boy >= 44, f"hücre ≥ 44 pt ({boy})")
    sira_sol = sol.evaluate_all("(xs) => xs.map((x) => x.dataset.kart)"); sira_sag = sag.evaluate_all("(xs) => xs.map((x) => x.dataset.kart)")
    check(all(a != b for a, b in zip(sira_sol, sira_sag)), "sağ sütun karışık: hiçbir satırda aynı kart yok")
    yerlesim(pg, "[data-test=esles-goster]", f"eşleştir [{sema}]")
    shot(pg, f"halka-esles-{sema}", full=False)
    # yanlış deneme: 1. sol ile ona ait olmayan sağ
    a = sira_sol[0]; yanlis = next(k for k in sira_sag if k != a)
    pg.click(f"[data-test=esles-sol][data-kart='{a}']"); pg.click(f"[data-test=esles-sag][data-kart='{yanlis}']")
    check(pg.locator("[data-test=esles-sol].salla").count() == 1 and pg.locator("[data-test=esles-sag].salla").count() == 1, "yanlışta iki hücre sallanır")
    check(pg.locator(".esles-hucre.right").count() == 0 and pg.locator("[data-test=esles-sol]:not([disabled])").count() == 5, "yanlışta ceza yok: hiçbir hücre kilitlenmez ya da kaybolmaz")
    # hepsini doğru eşleştir (sağdan başlayarak da)
    for i, k in enumerate(sira_sol):
        if i % 2: pg.click(f"[data-test=esles-sag][data-kart='{k}']"); pg.click(f"[data-test=esles-sol][data-kart='{k}']")
        else: pg.click(f"[data-test=esles-sol][data-kart='{k}']"); pg.click(f"[data-test=esles-sag][data-kart='{k}']")
    check(pg.locator(".esles-hucre.right").count() == 10 and pg.locator(".esles-hucre.right svg").count() == 10, "doğru çiftler ✓ ile kilitli")
    pg.wait_for_selector("[data-test=esles-devam]")
    shot(pg, f"halka-esles-bitti-{sema}", full=False)
    yerlesim(pg, "[data-test=esles-devam]", f"eşleştir bitti [{sema}]")
    pg.click("[data-test=esles-devam]")
    return a, yanlis

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for sema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx); yonlendir(pg)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.goto(base + "#/__halka-turleri"); pg.wait_for_selector("[data-test=halka-turleri]")
            check(pg.locator("[data-tab=today]").count() == 0, "deneme yolunda sekme çubuğu yok (öğrenme ekranı gibi)")
            resim_akisi(pg, sema)
            a, yanlis = esles_akisi(pg, sema)
            pg.wait_for_selector("[data-test=deneme-sonuc]")
            son = pg.inner_text("[data-test=deneme-sonuc]").split()
            check("lx:Winter:0" in son, f"resimden seç sonucu yanlış ({son})")
            beklenen = {f"{k}:{0 if k in (a, yanlis) else 1}" for k in ["lx:hallo", "lx:Frau", "lx:danke", "lx:bitte", "lx:ja"]}
            check(beklenen <= set(son), f"eşleştir sonucu: yalnız yanlış denenen iki kart 'bir kez daha' ({son})")
            if sema == "light":
                # Bilmiyorum (resim) ve göster (eşleştir), ağ kesikken (uygulama açık, içerik ve görseller bellekte)
                ctx.set_offline(True)
                pg.evaluate("location.hash = '#/__halka-turleri/resim/lx:Herbst'"); pg.wait_for_timeout(50)
                pg.wait_for_selector("[data-test=resim-sec][data-kart='lx:Herbst']", timeout=8000)
                pg.click("[data-test=resim-bilmiyorum]"); pg.wait_for_selector("[data-test=resim-cevap]")
                check("der Herbst" in pg.inner_text("[data-test=resim-cevap]") and pg.locator("[data-test=resim-secenek][data-right].right").count() == 1, "ağ kesik: 'Bilmiyorum' cevabı ve doğru görseli gösterir")
                pg.click("[data-test=resim-devam]"); pg.wait_for_selector("[data-test=deneme-sonuc]")
                check("lx:Herbst:0" in pg.inner_text("[data-test=deneme-sonuc]"), "'Bilmiyorum' yanlış sayılır")
                pg.evaluate("location.hash = '#/__halka-turleri/esles/lx:heute,lx:Montag,lx:Dienstag,lx:Mittwoch,lx:nein'")
                pg.wait_for_selector("[data-test=eslestir]")
                ilk = pg.locator("[data-test=esles-sol]").first.get_attribute("data-kart")
                pg.click(f"[data-test=esles-sol][data-kart='{ilk}']"); pg.click(f"[data-test=esles-sag][data-kart='{ilk}']")
                pg.click("[data-test=esles-goster]")
                check(pg.locator(".esles-hucre.gosterildi").count() == 8 and pg.locator(".esles-hucre.right").count() == 2, "ağ kesik: 'göster' kalan dört çifti açar")
                pg.click("[data-test=esles-devam]"); pg.wait_for_selector("[data-test=deneme-sonuc]")
                son = pg.inner_text("[data-test=deneme-sonuc]").split()
                check(f"{ilk}:1" in son and sum(x.endswith(":0") for x in son) == 4, f"'göster' ile açılanlar yanlış sayılır ({son})")
                ctx.set_offline(False)
                # görsel yüklenemezse tür düşer (tek doğru cevap kuralı)
                pg2 = new_page(ctx); yonlendir(pg2, bozuk=("apfel", "käse", "frau", "urlaub", "winter", "nacht", "herbst", "frühling"))
                pg2.goto(base + "#/__halka-turleri/resim/lx:Nacht")
                pg2.wait_for_selector("[data-test=resim-uygun-degil]", timeout=8000)
                check(True, "görsel yüklenemezse resimden seç düşer")
                pg2.close()
                # fotoğrafı olmayan kart: tür uygun değil
                pg.evaluate("location.hash = '#/__halka-turleri/resim/lx:hallo'"); pg.wait_for_selector("[data-test=resim-uygun-degil]")
                check(True, "seçilmiş fotoğrafı olmayan kartta resimden seç uygun değil")
            b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
