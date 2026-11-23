"""
Ben (Hedef 3, PM-084 md. 5; hedef docs/v2/design/TARGET3.png "Ben"). Kabul listesi:
  1. başlık "Ne kazandım", alt satır gerçek hafta ("A1 yolunun 1. haftasındasın.")
  2. yapabildiklerim: haftanın can_do cümleleri, her birinde üç nokta; noktalar kanıttan (elle değil), altında açıklama
  3. "Bu hafta" gerçek sayılarla; veri yoksa tek dürüst cümle
  4. Kelime haritam (N kelime → Sözlük); Sesli günlüğüm (özellik yok → çizilmez)
  5. Ayarlar satırı Profil'i açar; günlük hedef, sesler, medya rafı, hesap en çok 2 dokunuş
  6. eski İlerlemem tablosundaki sıfırlar yok (Çalışma düzenim); veri kaybı yok
  7. açık + koyu, 390 ve 430; taşma yok
  python3 tests/e2e/v2_ben.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
import re
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, no_overflow, content_file

PORT = 4251
DB = """async (is) => { const d = await new Promise((ok, no) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); q.onerror = no; });
  await new Promise((ok, no) => { const t = d.transaction(['items', 'meta'], 'readwrite');
    for (const it of is.items || []) t.objectStore('items').put(it);
    for (const m of is.meta || []) t.objectStore('meta').put(m);
    t.oncomplete = ok; t.onerror = no; }); d.close(); }"""
G1, G2 = "2026-01-01T09:00:00.000Z", "2026-01-03T09:00:00.000Z"

def oge(i, durable=False):
    return {"itemId": i, "kind": "lexeme", "passive": {"s": 0.5, "n": 2, "ok": 2, "last": G2}, "firstAt": {"passive": G1},
            "active": {"s": 0, "n": 0, "ok": 0, "sessions": []}, "durable": durable, "gaps": [], "inBank": False, "u": 1}

def ben(pg, base):
    pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today][aria-current=page]")
    pg.click("[data-tab=ben]"); pg.wait_for_selector("[data-test=ben] [data-test=ben-bu-hafta]")

def noktalar(pg):
    return pg.evaluate("[...document.querySelectorAll('[data-test=ben-cd]')].map((e) => [Number(e.dataset.gun), Number(e.dataset.dolu), e.querySelectorAll('.ben-noktalar i').length])")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    idx = content_file("index.json")
    gunler = sorted(g["day"] for g in idx["m1"] if g["day"] <= 7)
    g1 = content_file(idx["files"]["m1"]["1"])
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            for vp in ({"width": 390, "height": 844}, {"width": 430, "height": 932}):
                ad = f"[{tema} {vp['width']}]"
                b, ctx = launch(p, color_scheme=tema, viewport=vp); pg = new_page(ctx)
                login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
                ben(pg, base)
                print(f"{ad} 1–4: taze cihaz")
                check(pg.inner_text("[data-test=ben] h1") == "Ne kazandım" and pg.inner_text("[data-test=ben-hafta]") == f"{g1['level']} yolunun 1. haftasındasın.", f"{ad} başlık ve gerçek hafta ({pg.inner_text('[data-test=ben-hafta]')!r})")
                n = noktalar(pg)
                check([x[0] for x in n] == gunler and all(x[2] == 3 for x in n), f"{ad} haftanın {len(gunler)} can_do cümlesi, her birinde üç nokta ({n})")
                check(pg.inner_text("[data-test=ben-cd][data-gun='1']").strip().startswith(g1["can_do"]["tr"]), f"{ad} 1. günün cümlesi içerikten ({g1['can_do']['tr']!r})")
                check(all(x[1] == 0 for x in n), f"{ad} taze cihazda nokta dolu değil (kanıt yok)")
                check(pg.locator("[data-test=ben-aciklama]").count() == 1, f"{ad} noktaların altında tek satır açıklama")
                check(pg.inner_text("[data-test=ben-bu-hafta] p") == "İlk günün bitince burada göreceksin.", f"{ad} Bu hafta: veri yokken dürüst tek cümle")
                check(pg.locator("[data-test=kelime-haritam]").count() == 1 and pg.get_attribute("[data-test=kelime-haritam]", "href") == "#/sozluk", f"{ad} Kelime haritam → Sözlük")
                metin = pg.inner_text("[data-test=ben]")
                check("Sesli günlü" not in metin, f"{ad} sesli günlük özelliği yok → kutu çizilmez")
                check(not re.search(r"(^|\s)0(\s|$)", metin) and not re.search(r"\b(undefined|null|NaN|can_do|lx:)\b", metin), f"{ad} ekranda '0' yığını, İngilizce ya da iç ad yok")
                kucuk = pg.evaluate("[...document.querySelectorAll('[data-test=ben] a')].filter((a) => a.getBoundingClientRect().height < 44).map((a) => a.dataset.test)")
                check(kucuk == [], f"{ad} satırlar en az 44 px ({kucuk})")
                no_overflow(pg, f"{ad} Ben")
                if vp["width"] == 430: shot(pg, f"ben-taze-{tema}", full=True)

                print(f"{ad} 2–3: kanıt yazılınca noktalar ve sayılar değişir")
                kart = g1["yeni_kartlar"]
                pg.evaluate(DB, {"items": [oge(k) for k in kart]})
                pg.reload(); ben(pg, base)
                n = dict((x[0], x[1]) for x in noktalar(pg))
                check(n.get(1) == 1 and all(v == 0 for k, v in n.items() if k != 1), f"{ad} 1. günün kartları iki ayrı günde tanındı → yalnız 'anlıyorum' ({n})")
                pg.evaluate(DB, {"items": [oge(k, durable=True) for k in kart]})
                pg.reload(); ben(pg, base)
                n = dict((x[0], x[1]) for x in noktalar(pg))
                check(n.get(1) == 2, f"{ad} iki ayrı oturumda üretim → 'söyleyebiliyorum'; serbest üretim kanıtı yokken üçüncü nokta boş ({n})")
                bh = pg.inner_text("[data-test=ben-bu-hafta] p")
                check(bh == f"{len(set(kart))} kelime kalıcı oldu.", f"{ad} Bu hafta gerçek sayı ({bh!r})")
                hk = pg.inner_text("[data-test=kelime-haritam]")
                check(f"{len(set(kart))} kelime" in hk, f"{ad} Kelime haritam: tanınan kelime sayısı ({hk!r})")
                if vp["width"] == 430: shot(pg, f"ben-kanit-{tema}", full=True)

                if tema == "light" and vp["width"] == 390:
                    print("5: Ayarlar ve Profil'deki her ayar en çok 2 dokunuş")
                    pg.click("[data-test=ayarlar-ac]"); pg.wait_for_selector("#goal")
                    check(pg.evaluate("location.hash") == "#/ben/ayarlar" and pg.locator("[data-test=medya-rafi]").count() == 1 and pg.locator("[data-test=ses-deneme-ac]").count() == 1 and "Giriş yapılan hesap" in pg.inner_text("main"),
                          "Ben → Ayarlar (1 dokunuş): günlük hedef, sesler, medya rafı, hesap aynı sayfada")
                    print("6: Çalışma düzenim (eski İlerlemem): sıfır yok, veri yerinde")
                    ben(pg, base); pg.click("[data-test=duzen-ac]"); pg.wait_for_selector("[data-test=panel-focus]")
                    pg.wait_for_selector("[data-test=panel-language] [data-test^=dil-sayilari]")
                    tiles = pg.inner_text("[data-test=tiles]") if pg.locator("[data-test=tiles]").count() else ""
                    check("pasif kelime" in tiles and not re.search(r"(^|\n)0\n", tiles + "\n"), f"Çalışma düzenim: sayı kutularında sıfır yok, var olan veri görünüyor ({tiles!r})")
                    dil = pg.inner_text("[data-test=dil-sayilari]")
                    check("Tanıdığın kelimeler" in dil and "Tekrar listende" not in dil, f"dil sayıları: yalnız sıfır olmayan satırlar ({dil!r})")
                    check(pg.locator(".topbar a[aria-label=Geri]").get_attribute("href") == "#/ben" and pg.get_attribute("[data-tab=ben]", "aria-current") == "page", "Çalışma düzenim Ben sekmesinde; geri: Ben")
                b.close()
        # taze cihazda Çalışma düzenim: sıfır kutusu yok, dürüst satır
        b, ctx = launch(p); pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/ben/duzen"); pg.wait_for_selector("[data-test=panel-language] [data-test^=dil-sayilari]")
        check(pg.locator("[data-test=tiles]").count() == 0 and pg.locator("[data-test=dil-sayilari-bos]").count() == 1, "taze cihaz: sıfır kutuları ve sıfır satırları çizilmez")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
