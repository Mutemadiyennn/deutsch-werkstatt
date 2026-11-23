"""
Köy (Hedef 3, PM-084 md. 4; hedef docs/v2/design/TARGET3.png "Köy").
  1. başlık köyün adı, alt satır "Canın neyi istiyorsa oraya git."
  2. dükkân ızgarası 3 sütun (390 ve 430; taşma ve kesişme yok): Bahçe · Sinema · Radyo · Atölye · Kütüphane · Pazar meydanı;
     her biri var olan bir ekranı açar
  3. kilitli dükkânlar (Kafe, Tiyatro, Gazete bayisi) soluk; dokununca tek satır "ne zaman açılır", başka yere gitmez
  4. alt satırdaki sayılar cihazdaki gerçek veriden; veri yoksa tanım satırı; uydurma sayı ve "0" yok; bekleyen iş varsa köşe noktası
  5. "Telefonun" kartı yalnız dinlenmemiş ses kaydı varsa
  6. eski "Öğren" ekranındaki her giriş Köy'den en çok 2 dokunuşla bulunur
  python3 tests/e2e/v2_koy.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
import re
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, no_overflow, content_file

PORT = 4245
ACIK = [("bahce", "Bahçe"), ("sinema", "Sinema"), ("radyo", "Radyo"), ("atolye", "Atölye"), ("kutuphane", "Kütüphane"), ("pazar", "Pazar meydanı")]
KILITLI = [("kafe", "Kafe"), ("tiyatro", "Tiyatro"), ("gazete", "Gazete bayisi")]

DB = """async (is) => { const d = await new Promise((ok, no) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); q.onerror = no; });
  await new Promise((ok, no) => { const t = d.transaction(['items', 'meta'], 'readwrite');
    for (const it of is.items || []) t.objectStore('items').put(it);
    for (const m of is.meta || []) t.objectStore('meta').put(m);
    t.oncomplete = ok; t.onerror = no; }); d.close(); }"""

def kartlar(pg):
    return pg.evaluate("""() => [...document.querySelectorAll('.koy-izgara .mekan')].map((m) => { const r = m.getBoundingClientRect(), y = m.querySelector('.mekan-yazi');
      return { id: m.dataset.mekan || 'telefon', ad: y.querySelector('b').innerText.trim(), alt: y.querySelector('span').innerText.trim(), kilitli: m.classList.contains('kilitli'),
               nokta: !!m.querySelector('.mekan-nokta'), href: m.getAttribute('href'), etiket: m.tagName, x: r.left, y: r.top, w: r.width, h: r.height, sag: r.right, alt_y: r.bottom,
               tasan: y.scrollWidth > y.clientWidth + 1 }; })""")

def koy(pg, base):
    pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today][aria-current=page]")
    pg.click("[data-tab=koy]"); pg.wait_for_selector("[data-test=koy] [data-mekan=gazete]"); pg.wait_for_timeout(350)

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    idx = content_file("index.json")
    gun1 = sorted(idx["m1"], key=lambda g: g["day"])[0]
    # taze cihazda yalnız ilk gün açık: Sinema ve Radyo yalnız onu sayar ve listeler (#200 PM finali takip a)
    video = sum(1 for m in gun1["medya"] if m["kind"] == "video")
    kilitli_medya = [g["day"] for g in idx["m1"] if g["day"] != gun1["day"] and g["medya"]]
    ses1 = [m["id"] for m in gun1["medya"] if m["kind"] == "ses"]
    kart1 = gun1["kartlar"][:3]
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            for vp in ({"width": 390, "height": 844}, {"width": 430, "height": 932}):
                ad = f"[{tema} {vp['width']}]"
                b, ctx = launch(p, color_scheme=tema, viewport=vp); pg = new_page(ctx)
                login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
                # ızgara görünür olduğu an ile sonrası aynı yerde: Telefonun kartı sonradan eklenip dükkânları itmez (inceleme #200 P1-3)
                pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today][aria-current=page]"); pg.click("[data-tab=koy]")
                pg.wait_for_function("() => { const g = document.querySelector('.koy-izgara'); return g && getComputedStyle(g).visibility === 'visible'; }")
                y0 = pg.evaluate("document.querySelector('[data-mekan=bahce]').getBoundingClientRect().top"); pg.wait_for_timeout(900)
                y1 = pg.evaluate("document.querySelector('[data-mekan=bahce]').getBoundingClientRect().top")
                check(abs(y1 - y0) < 1, f"{ad} ızgara görünür olduktan sonra kaymıyor (Bahçe {y0:.0f} → {y1:.0f})")
                koy(pg, base); pg.wait_for_selector("[data-test=koy-telefon]")
                check(pg.inner_text("[data-test=koy] h1").strip() == "Wendlfing" and pg.inner_text(".koy-bas p").strip() == "Canın neyi istiyorsa oraya git.", f"{ad} başlık köyün adı, alt satır hedefteki cümle")
                k = kartlar(pg); d = [x for x in k if x["id"] != "telefon"]
                check([(x["id"], x["ad"]) for x in d] == ACIK + KILITLI, f"{ad} dokuz dükkân hedefteki sırayla ({[x['ad'] for x in d]})")
                # 3 sütun: her satırda üç kart, aynı hizada; kesişme ve taşma yok
                satirlar = sorted({round(x["y"]) for x in d}); sutunlar = sorted({round(x["x"]) for x in d})
                check(len(satirlar) == 3 and len(sutunlar) == 3, f"{ad} ızgara 3 sütun × 3 satır ({len(sutunlar)} × {len(satirlar)})")
                kesisen = [(a["ad"], c["ad"]) for i, a in enumerate(k) for c in k[i + 1:] if a["x"] < c["sag"] - 0.5 and c["x"] < a["sag"] - 0.5 and a["y"] < c["alt_y"] - 0.5 and c["y"] < a["alt_y"] - 0.5]
                check(not kesisen and all(x["x"] >= 0 and x["sag"] <= vp["width"] + 0.5 and not x["tasan"] for x in k), f"{ad} kartlar kesişmiyor, ekrana sığıyor, yazı taşmıyor {kesisen or ''}")
                check(all(x["w"] >= 44 and x["h"] >= 44 for x in k), f"{ad} dokunma alanı ≥ 44 px")
                no_overflow(pg, f"{ad} Köy")
                # 4: taze cihaz — sayı yalnız gerçek veride; uydurma sayı ve 0 yok
                acik = {x["id"]: x for x in d if not x["kilitli"]}
                check(acik["bahce"]["alt"] == "Kelime tekrarı" and not acik["bahce"]["nokta"], f"{ad} Bahçe: vadesi gelen kart yokken sayı yok, tanım satırı ({acik['bahce']['alt']!r}), nokta yok")
                check(acik["sinema"]["alt"] == (f"{video} gerçek video" if video else "Köy dizisi"), f"{ad} Sinema: açılmış günlerin video sayısı ya da tanım ({acik['sinema']['alt']!r})")
                m = re.fullmatch(r"(\d+) durum hazır", acik["pazar"]["alt"]); alanlar = {s["domain"] for s in idx["scenarios"]}
                check(bool(m) and 1 <= int(m[1]) <= len(alanlar), f"{ad} Pazar meydanı: dersi olan alan sayısı ({acik['pazar']['alt']!r}; pakette {len(alanlar)})")
                check(all(not re.search(r"\b0\b", x["alt"]) for x in k), f"{ad} hiçbir kartta '0' yok")
                check(acik["radyo"]["alt"] == "Anons, sesli mesaj" and acik["atolye"]["alt"] == "Cümle kalıpları" and acik["kutuphane"]["alt"] == "Okuma, sözlük", f"{ad} sayısı olmayan dükkânlarda tanım satırı")
                # 5: Telefonun — 1. günün dinlenmemiş ses kayıtları
                tel = next(x for x in k if x["id"] == "telefon")
                check(k[0]["id"] == "telefon" and tel["alt"] == f"{len(ses1)} ses kaydı seni bekliyor" and tel["w"] > 2 * d[0]["w"], f"{ad} Telefonun: {tel['alt']!r} (1. günün {len(ses1)} dinlenmemiş kaydı), tam genişlik")
                # 3: kilitli dükkânlar
                for kid, kad in KILITLI:
                    x = next(y for y in d if y["id"] == kid)
                    check(x["kilitli"] and x["etiket"] == "BUTTON" and x["href"] is None and x["alt"].endswith("açılır"), f"{ad} {kad}: kilitli, bağlantı değil, alt satır ne zaman açılacağını söyler ({x['alt']!r})")
                    pg.click(f"[data-mekan={kid}]"); pg.wait_for_selector(".toast")
                    t = pg.inner_text(".toast")
                    check(t == f"{kad}: {x['alt']}." and "\n" not in t and pg.evaluate("location.hash") == "#/koy", f"{ad} {kad}: dokununca tek satır ({t!r}), ekran değişmez")
                    pg.wait_for_selector(".toast", state="detached")
                if vp["width"] == 430: shot(pg, f"koy-{tema}", full=False)
                # %130 yazı: mekân adı bölünmez, taşma yok (dar ekranda iki sütuna iner)
                pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')"); pg.wait_for_timeout(200)
                kb = kartlar(pg)
                check(all(not x["tasan"] and x["sag"] <= vp["width"] + 0.5 for x in kb) and pg.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"{ad} %130 yazıda taşma yok ({len({round(x['x']) for x in kb if x['id'] != 'telefon'})} sütun)")
                bolunen = pg.evaluate("""() => [...document.querySelectorAll('.koy-izgara .mekan-yazi b')].filter((b) => { const r = document.createRange(); let k = false;
                  for (const s of b.innerText.split(/\\s+/)) { const i = b.firstChild.textContent.indexOf(s); r.setStart(b.firstChild, i); r.setEnd(b.firstChild, i + s.length); if (r.getClientRects().length > 1) k = true; } return k; }).map((b) => b.innerText)""")
                check(not bolunen, f"{ad} %130 yazıda mekân adı sözcük ortasından bölünmüyor {bolunen or ''}")
                if tema == "light" and vp["width"] == 390: shot(pg, "koy-yuzde130", full=True)
                pg.evaluate("document.documentElement.style.setProperty('--ts','1'); document.documentElement.classList.add('dyn')")

                if tema == "light" and vp["width"] == 390:
                    print("2 ve 6: her dükkân var olan bir ekranı açar; eski Öğren girişleri en çok 2 dokunuş")
                    def git(mekan, sonra=None, bekle=None):
                        koy(pg, base); pg.click(f"[data-mekan={mekan}]")
                        if sonra: pg.wait_for_selector(sonra); pg.locator(sonra).first.click()
                        pg.wait_for_selector(bekle)
                    git("bahce", bekle="[data-test=mekan-bahce] [data-test=tekrar-bahce]")
                    check(pg.locator("[data-test=heard]").count() == 1 and pg.evaluate("location.hash") == "#/koy/bahce", "Bahçe: tekrar ve 'Duyduğum kelime' (1 dokunuş)")
                    check(pg.get_attribute("[data-tab=koy]", "aria-current") == "page" and pg.locator(".topbar a[aria-label=Geri]").get_attribute("href") == "#/koy", "mekân sayfası Köy sekmesinde; geri: Köy")
                    git("bahce", "[data-test=tekrar-bahce]", "[data-test=garden], [data-test=garden-empty]"); check(True, "Bahçe → Kelime Bahçesi (2 dokunuş)")
                    git("sinema", bekle="[data-test=mekan-sinema] [data-test^=kayit-]")
                    tur = pg.evaluate("[...document.querySelectorAll('[data-test^=kayit-]')].map((a) => a.dataset.test)")
                    check(set(tur) <= {"kayit-video", "kayit-sahne"} and len(tur) == sum(1 for m in gun1["medya"] if m["kind"] != "ses"), f"Sinema: açılmış günün video ve köy dizisi kayıtları ({len(tur)})")
                    gorunen = pg.evaluate("[...document.querySelectorAll('[data-test^=mekan-gun-]')].map((s) => +s.dataset.test.slice(10))")
                    check(gorunen == [gun1["day"]] and len(kilitli_medya) > 0, f"Sinema: yalnız açılmış gün listelenir ({gorunen}; kayıtlı kilitli günler {kilitli_medya} görünmez; #200 takip a)")
                    check(pg.inner_text("[data-test=mekan-sonra]") == "Sonraki günlerin videoları, o gün açılınca burada.", "Sinema: liste neden kısa, tek satır")
                    git("sinema", "[data-test^=kayit-]", "[data-test=medya]"); check(True, "Sinema → kayıt → oynatıcı (2 dokunuş)")
                    DOKUN = "() => [...document.querySelectorAll('.koy-sayfa a')].filter((a) => !a.closest('.topbar')).map((a) => [a.dataset.test || a.getAttribute('href'), Math.round(a.getBoundingClientRect().height)]).filter(([, h]) => h < 44)"
                    kucuk = pg.evaluate(DOKUN)
                    check(kucuk == [], f"Sinema: gün başlığı ve kayıt satırları en az 44 px dokunma alanı (inceleme #200 P1-1/2; küçük: {kucuk[:4]})")
                    git("radyo", bekle="[data-test=mekan-radyo] [data-test=kayit-ses]")
                    kucuk = pg.evaluate(DOKUN)
                    check(kucuk == [], f"Radyo: satırlar en az 44 px ({kucuk[:4]})")
                    gorunen = pg.evaluate("[...document.querySelectorAll('[data-test^=mekan-gun-]')].map((s) => +s.dataset.test.slice(10))")
                    check(pg.locator("[data-test=kayit-ses]").count() == len(ses1) and gorunen == [gun1["day"]] and pg.locator("[data-test=kayit-bitti]").count() == 0, f"Radyo: yalnız açılmış günün ses kayıtları ({gorunen}); dinlenmemişte işaret yok")
                    pg.goto(base + "#/koy/radyo"); pg.wait_for_selector("[data-test=mekan-radyo] [data-test=kayit-ses]")
                    check(pg.evaluate("[...document.querySelectorAll('[data-test^=mekan-gun-]')].length") == 1, "Radyo: adresle doğrudan açılınca da (plan sonradan gelir) kilitli gün görünmez")
                    git("radyo", "[data-test=m1-gun-1]", "[data-test=m1-gun]"); check(True, "Radyo → gün sayfası (eski 'İlk Hafta' girişi; 2 dokunuş)")
                    git("atolye", bekle="[data-test=kalip-liste]"); check(pg.evaluate("location.hash") == "#/kalip", "Atölye → Kalıplar (1 dokunuş)")
                    git("kutuphane", "[data-test=sozluk-ac]", "[data-test=sozluk-q]"); check(True, "Kütüphane → Sözlük (2 dokunuş)")
                    git("kutuphane", "[data-test=temel-ders]", "[data-test=ders], [data-test=ders-diyalog]"); check(True, "Kütüphane → temel ders (2 dokunuş)")
                    git("kutuphane", bekle="[data-test=temel-liste]")
                    kucuk = pg.evaluate(DOKUN)
                    check(kucuk == [], f"Kütüphane: satırlar en az 44 px ({kucuk[:4]})")
                    check(pg.locator("[data-test=temel-ders]").count() == len(idx["temel"]), f"Kütüphane: temel derslerin hepsi ({len(idx['temel'])})")
                    git("pazar", bekle="[data-test=mekan-pazar] [data-domain]")
                    check(pg.locator("[data-domain]").count() == len(idx["domains"]), f"Pazar meydanı: {len(idx['domains'])} durumun hepsi")
                    kutu = pg.evaluate("(() => { const c = document.querySelector('[data-test=durum-liste]').getBoundingClientRect(), a = document.querySelector('[data-domain] b').getBoundingClientRect(); return a.left - c.left; })()")
                    check(kutu >= 12, f"Pazar meydanı: liste kartın kenarına yapışmıyor (iç boşluk {kutu:.0f} px)")
                    git("pazar", "[data-domain]", ".topbar a[aria-label=Geri][href='#/koy/pazar']"); check(True, "Pazar meydanı → durum sayfası (2 dokunuş); geri: Pazar meydanı")
                    # kilitli günün provası ve okuması listelenmez (öğretilmeden istenmez)
                    git("pazar", bekle="[data-test=mekan-pazar] [data-domain]")
                    pr = pg.evaluate("[...document.querySelectorAll('[data-test^=prova-]:not([data-test=prova-liste])')].map((a) => a.dataset.test)")
                    check(all(x == f"prova-{gun1['day']}" for x in pr), f"Pazar meydanı: yalnız açılmış günün provası ({pr})")

                    print("4 ve 5: gerçek veri değişince kartlar değişir")
                    dun = "2026-01-01T00:00:00.000Z"
                    oge = lambda i: {"itemId": i, "kind": "lexeme", "passive": {"s": 1, "n": 1, "ok": 1, "last": dun, "fsrs": {"due": dun, "stability": 1, "difficulty": 5, "elapsed_days": 0, "scheduled_days": 1, "reps": 1, "lapses": 0, "state": 2, "last_review": dun}},
                                     "active": {"s": 0, "n": 0, "ok": 0, "sessions": []}, "durable": False, "gaps": [], "inBank": False, "u": 1}
                    pg.evaluate(DB, {"items": [oge(i) for i in kart1], "meta": [{"key": f"m1:medya:{ses1[0]}", "value": {"bitti": True}}]})
                    pg.reload(); koy(pg, base); pg.wait_for_selector("[data-mekan=bahce] [data-test=mekan-nokta]")
                    k2 = {x["id"]: x for x in kartlar(pg)}
                    check(k2["bahce"]["alt"] == f"{len(kart1)} tekrar bekliyor" and k2["bahce"]["nokta"], f"Bahçe: vadesi gelen {len(kart1)} kart → {k2['bahce']['alt']!r} + köşe noktası")
                    check(k2["telefon"]["alt"] == f"{len(ses1) - 1} ses kaydı seni bekliyor", f"Telefonun: bir kayıt dinlenince {k2['telefon']['alt']!r}")
                    pg.click("[data-test=koy-telefon]"); pg.wait_for_selector("[data-test=medya]")
                    check(pg.evaluate("decodeURIComponent(location.hash)").endswith(ses1[1]), "Telefonun → ilk dinlenmemiş kaydın oynatıcısı")
                    git("radyo", bekle="[data-test=kayit-ses]"); pg.wait_for_selector("[data-test=kayit-bitti]")
                    check(pg.locator("[data-test=kayit-bitti]").count() == 1 and pg.inner_text("[data-test=kayit-bitti]") == "dinlendi", "Radyo: dinlenen kayıt işaretli")
                    pg.evaluate(DB, {"meta": [{"key": f"m1:medya:{i}", "value": {"bitti": True}} for i in ses1]})
                    pg.reload(); koy(pg, base); pg.wait_for_selector("[data-mekan=bahce] [data-test=mekan-nokta]")
                    check(pg.locator("[data-test=koy-telefon]").count() == 0 and kartlar(pg)[0]["id"] == "bahce", "dinlenmemiş kayıt kalmayınca Telefonun kartı çizilmez")
                    shot(pg, "koy-telefonsuz", full=False)
                b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
