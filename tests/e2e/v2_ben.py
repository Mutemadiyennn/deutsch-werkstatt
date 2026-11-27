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

T1, T2 = 1767258000000, 1767430800000   # G1 ve G2'nin ms karşılığı (iki ayrı gün)
def oge(i, uretim=False):
    return {"itemId": i, "kind": "lexeme", "passive": {"s": 0.5, "n": 2, "ok": 2, "last": G2}, "firstAt": {"passive": G1},
            "active": {"s": 0.5 if uretim else 0, "n": 2 if uretim else 0, "ok": 2 if uretim else 0, "sessions": [f"a@{T1}", f"b@{T2}"] if uretim else []},
            "durable": uretim, "gaps": [], "inBank": False, "u": 1}

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
                check(pg.locator("[data-test=raf-bagla]").count() == 1 and pg.get_attribute("[data-test=raf-bagla]", "href") == "#/ben/ayarlar/raf", f"{ad} raf bağlı değil → tek satır 'bağla' (PM-099)")
                check(pg.locator("[data-test=durum-cubugu]").count() == 0, f"{ad} Ben'de üst durum çubuğu yok (PM #200 finali takip b)")
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
                pg.evaluate(DB, {"items": [oge(k, uretim=True) for k in kart]})
                pg.reload(); ben(pg, base)
                n = dict((x[0], x[1]) for x in noktalar(pg))
                check(n.get(1) == 2, f"{ad} iki ayrı günde üretim → 'söyleyebiliyorum'; serbest üretim kanıtı yokken üçüncü nokta boş ({n})")
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
                    print("5b: 'Fotoğraf rafı bağlı değil → bağla' doğrudan Medya rafı kartına iner (#208 PM finali takip d)")
                    # üstteki "Kullanımım" sonradan dolar: 7 günlük kullanım kaydıyla ve kaydırma çapası kapalıyken (WebKit'te yok)
                    # kart oturmuş hâlde de yerinde kalmalı (inceleme #224 P1-1)
                    gunler7 = pg.evaluate("(() => { const o=[]; for (let i=0;i<7;i++){ const d=new Date(); d.setDate(d.getDate()-i); o.push(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')); } return o; })()")
                    pg.evaluate(DB, {"meta": [{"key": f"kullanim:{g}", "value": {"gun": g, "olaylar": [{"t": "ac", "at": f"{g}T08:00:00.000Z"}, {"t": "bitti", "adim": "bahce:1", "at": f"{g}T08:10:00.000Z"},
                                 {"t": "cik", "adim": "prova:1", "nokta": "2/5", "at": f"{g}T08:20:00.000Z"}, {"t": "cik", "adim": "okuma:1", "nokta": "1/4", "at": f"{g}T08:30:00.000Z"}]}} for g in gunler7]})
                    pg.reload(); pg.add_style_tag(content="* { overflow-anchor: none !important; }")
                    ben(pg, base); pg.click("[data-test=raf-bagla]"); pg.wait_for_selector("[data-test=raf-karti] [data-test=medya-rafi]")
                    pg.wait_for_selector("[data-test=kullanim-gun]"); pg.wait_for_timeout(1500)
                    kb = pg.evaluate("(() => { const r = document.querySelector('[data-test=raf-karti]').getBoundingClientRect(); const t = document.querySelector('.topbar')?.getBoundingClientRect(); return [Math.round(r.top), Math.round(t ? t.bottom : 0), Math.round(scrollY), innerHeight]; })()")
                    check(pg.evaluate("location.hash") == "#/ben/ayarlar/raf" and kb[1] - 1 <= kb[0] < kb[3] / 3 and kb[2] > 0 and pg.get_attribute("[data-tab=ben]", "aria-current") == "page",
                          f"Ben → raf satırı: Kullanımım dolduktan 1,5 sn sonra da Medya rafı kartı ekranın üst üçte birinde, çapa kapalı (kart {kb[0]} px, çubuk {kb[1]} px, kaydırma {kb[2]})")
                    check(pg.evaluate("document.activeElement?.textContent") == "Medya rafı", "Ben → raf satırı: odak kartın başlığında (inceleme #224 P2-6)")
                    shot(pg, "ben-raf-karti", full=False)
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
        check(pg.locator("[data-test=tiles]").count() == 0 and pg.locator("[data-test=dil-sayilari-bos]").count() == 1 and pg.locator("[data-test=odak-bos]").count() == 1 and pg.locator("[data-test=xp-seri]").count() == 0, "taze cihaz: sıfır kutuları, odak sayıları ve XP kartı çizilmez")
        duz = pg.inner_text("main")
        check(not re.search(r"(^|\s)0(\s|$|/)", duz), f"taze cihaz Çalışma düzenim: ekranda '0' yok ({[l for l in duz.split(chr(10)) if re.search(r'(^|\s)0(\s|$|/)', l)][:4]})")
        # PM-142 md. 2.4: Ben'in en altında Tanılama; tek ekranda kabuk, sesler, son sahne, son tanıma hatası
        pg.goto(base + "#/ben"); pg.wait_for_selector("[data-test=tanilama]")
        son = pg.evaluate("[...document.querySelectorAll('[data-test=ben] > *')].pop()?.dataset.test")
        pg.click("[data-test=tanilama] summary"); t = pg.inner_text("[data-test=tani-satir]")
        check(son == "tanilama" and all(x in t for x in ("Kabuk: yok", "Ses yolu:", "Almanca sesler", "Son sahne: henüz yok", "Tanıma:", "son hata: yok")), f"Ben → en altta Tanılama, dört satır ({son}, {t!r})")
        no_overflow(pg, "Tanılama açık"); shot(pg, "ben-tanilama", full=False)
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
