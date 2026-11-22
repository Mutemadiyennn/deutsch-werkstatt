"""
Hedef 3 sekme çerçevesi (PM-084 md. 3; hedef docs/v2/design/TARGET3.png).
  1. dört sekme, bu sırayla: Bugün · Yol · Köy · Ben; simge 26 px; etkin sekme yalnız renkle ayrılır; açık + koyu
  2. Yol = #/yol; Köy = #/koy; Ben = #/ben; eski #/learn, #/progress, #/profile adresleri yeni yerlerine yönlenir
  3. akış, ders, medya, prova (ve bahçe, okuma) ekranlarında sekme çubuğu yok
  4. sekme çubuğunda İngilizce ya da iç ad yok; 390 ve 430 genişlikte dokunma alanı ≥ 44 px, taşma yok
  python3 tests/e2e/v2_sekme.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, no_overflow, content_file

PORT = 4244
SEKMELER = [("today", "Bugün", "#/today"), ("yol", "Yol", "#/yol"), ("koy", "Köy", "#/koy"), ("ben", "Ben", "#/ben")]

# yazı rengi ile sekme çubuğunun (opak sayılan) zemini arasındaki kontrast; renkler tuvalde çözülür (color-mix, yarı saydam zemin)
KONTRAST = """(sel) => {
  const c = document.createElement('canvas'); c.width = c.height = 1; const x = c.getContext('2d', { willReadFrequently: true });
  const boya = (r) => { x.fillStyle = r; x.fillRect(0, 0, 1, 1); };
  const oku = () => [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
  const lum = (v) => { const f = v.map((k) => { k /= 255; return k <= 0.03928 ? k / 12.92 : ((k + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
  x.clearRect(0, 0, 1, 1); boya(getComputedStyle(document.body).backgroundColor); boya(getComputedStyle(document.querySelector('.tabbar')).backgroundColor);
  const zemin = lum(oku());
  boya(getComputedStyle(document.querySelector(sel)).color);
  const yazi = lum(oku());
  return (Math.max(zemin, yazi) + 0.05) / (Math.min(zemin, yazi) + 0.05);
}"""

def sekmeler(pg):
    return pg.evaluate("""() => [...document.querySelectorAll('.tabbar nav a')].map((a) => { const r = a.getBoundingClientRect(), s = a.querySelector('svg').getBoundingClientRect(), st = getComputedStyle(a);
      return { k: a.dataset.tab, ad: a.innerText.trim(), href: a.getAttribute('href'), etkin: a.getAttribute('aria-current') === 'page', renk: st.color, zemin: st.backgroundColor,
               w: r.width, h: r.height, sol: r.left, sag: r.right, simge: s.width }; })""")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    idx = content_file("index.json")
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            for vp in ({"width": 390, "height": 844}, {"width": 430, "height": 932}):
                b, ctx = launch(p, color_scheme=tema, viewport=vp); pg = new_page(ctx)
                login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
                ad = f"[{tema} {vp['width']}]"
                s = sekmeler(pg)
                check([(x["k"], x["ad"], x["href"]) for x in s] == SEKMELER, f"{ad} dört sekme sırayla: Bugün · Yol · Köy · Ben ({[x['ad'] for x in s]})")
                check(all(abs(x["simge"] - 26) < 0.5 for x in s), f"{ad} sekme simgeleri 26 px")
                check(all(x["w"] >= 44 and x["h"] >= 44 for x in s), f"{ad} dokunma alanı ≥ 44 px ({[round(x['w']) for x in s]} × {round(s[0]['h'])})")
                check(all(s[i]["sag"] <= s[i + 1]["sol"] + 0.5 for i in range(3)) and s[0]["sol"] >= 0 and s[3]["sag"] <= vp["width"], f"{ad} sekmeler kesişmiyor, ekrana sığıyor")
                for k, etiket, href in SEKMELER:
                    pg.click(f"[data-tab={k}]"); pg.wait_for_selector(f"[data-tab={k}][aria-current=page]")
                    pg.wait_for_timeout(250)  # renk geçişi (≤ 200 ms)
                    s = sekmeler(pg)
                    etkin = [x for x in s if x["etkin"]]; diger = [x for x in s if not x["etkin"]]
                    check(len(etkin) == 1 and etkin[0]["k"] == k and pg.evaluate("location.hash") == href, f"{ad} {etiket}: yalnız kendi sekmesi etkin, adres {href}")
                    check(all(x["renk"] != etkin[0]["renk"] for x in diger) and len({x["renk"] for x in diger}) == 1, f"{ad} {etiket}: etkin sekme renkle ayrılıyor")
                    check(all(x["zemin"] in ("rgba(0, 0, 0, 0)", "transparent") for x in s), f"{ad} {etiket}: sekmede zemin hapı yok (hedef 3)")
                    no_overflow(pg, f"{ad} {etiket}")
                    if vp["width"] == 430: shot(pg, f"sekme-{k}-{tema}", full=False)
                k_etkin = pg.evaluate(KONTRAST, ".tabbar a[aria-current=page]"); k_diger = pg.evaluate(KONTRAST, ".tabbar a:not([aria-current])")
                check(k_etkin >= 4.5 and k_diger >= 4.5, f"{ad} sekme yazısı kontrastı: etkin {k_etkin:.2f}:1, diğer {k_diger:.2f}:1 (≥ 4,5)")
                if tema == "light" and vp["width"] == 390:
                    print("eski adresler yeni yerlerine yönlenir")
                    for eski, yeni, sekme, isaret in (("#/learn", "#/koy", "koy", "main"), ("#/progress", "#/ben", "ben", "main"), ("#/profile", "#/ben/ayarlar", "ben", "[data-test=goal]")):
                        pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today][aria-current=page]")
                        pg.evaluate("(h) => { location.hash = h; }", eski)
                        pg.wait_for_selector(f"[data-tab={sekme}][aria-current=page]"); pg.wait_for_selector(isaret)
                        check(pg.evaluate("location.hash") == yeni, f"{eski} → {yeni} ({pg.evaluate('location.hash')})")
                        pg.go_back(); pg.wait_for_selector("[data-tab=today][aria-current=page]")
                        check(pg.evaluate("location.hash") == "#/today", f"{eski}: geri hareketi tek adımda önceki ekrana döner (yönlenme geçmişte iz bırakmaz)")
                    # doğrudan açılış (kayıtlı bağlantı): sayfa eski adresle yüklenir
                    pg.goto(base + "#/profile"); pg.reload(); pg.wait_for_selector("[data-test=goal]")
                    check(pg.evaluate("location.hash") == "#/ben/ayarlar", "eski adresle açılış: ayarlar ekranı, adres yenisi")
                    check(pg.locator(".topbar a[aria-label=Geri]").get_attribute("href") == "#/ben", "ayarlardan geri: Ben")
                    pg.goto(base + "#/learn/telefon"); pg.wait_for_selector("[data-tab=koy][aria-current=page]")
                    check(pg.evaluate("location.hash") == "#/learn/telefon" and pg.locator(".topbar a[aria-label=Geri]").get_attribute("href") == "#/koy", "alan sayfası adresi korunur; geri: Köy")
                    pg.goto(base + "#/ben"); pg.click("[data-test=ayarlar-ac]"); pg.wait_for_selector("[data-test=goal]")
                    check(pg.get_attribute("[data-tab=ben]", "aria-current") == "page", "Ben → Ayarlar tek dokunuş; Ben sekmesi etkin kalır")

                    print("tam ekran akışlarda sekme çubuğu yok")
                    m1 = idx.get("m1", [])
                    tam = [("bahçe", "#/garden"), ("okuma", "#/okuma/1"), ("prova", "#/prova/1")]
                    if idx.get("temel"): tam.append(("ders", "#/ders/" + idx["temel"][0]["id"]))
                    if m1 and m1[0].get("medya"): tam.append(("medya", f"#/m1/{m1[0]['day']}/{m1[0]['medya'][0]['id']}"))
                    if any(g.get("day") == 2 for g in m1): tam.append(("akış", "#/akis/2"))
                    for etiket, h in tam:
                        pg.goto(base + "#/today"); pg.wait_for_selector(".tabbar")
                        pg.goto(base + h); pg.wait_for_function("() => document.querySelector('main.app.notabs') && !document.querySelector('.tabbar')", timeout=5000)
                        check(pg.locator(".tabbar").count() == 0, f"{etiket} ({h}): sekme çubuğu yok")
                b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
