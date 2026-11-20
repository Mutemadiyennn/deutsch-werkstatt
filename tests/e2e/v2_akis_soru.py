"""
AKIS AK-10 3. adım: yeni soru türleri (TARGET3b) — resimden seç ve eşleştir. Önizleme yolu yalnız e2e derlemesinde
(#/akis-soru/…); durak oynatıcısı 4. adımda bağlar.
  - resimden seç: kelime açılışta okunur; soru anında Almanca metin yok; 2×2 görsel; seçilen kare mavi; "Kontrol et" seçmeden
    kapalı; yanlışta doğru kare yeşil, seçilen kırmızı; cevaptan sonra kelime ve cümle açılır; "Bilmiyorum" yanlış sayılır
  - eşleştir: "Kontrol et" yok; doğru çift anında yeşil ve kilitli; yanlış eşleşme sallanır, ceza yok, iki kart "yanlış" listesine
    girer; Almanca kareye dokununca ses; hepsi eşleşince "Devam"
  - 393 ve 430 genişlikte taşma yok; dokunma hedefleri ≥ 44 pt
python3 tests/e2e/v2_akis_soru.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import base64, json
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, content_file, no_overflow

PORT = 4229
JPEG = base64.b64decode("/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k=")
SAHTE_SES = """(() => { window.__oku = [];
  const ss = { speaking: false, pending: false, paused: false, getVoices: () => [{ name: "Anna", lang: "de-DE", voiceURI: "Anna", localService: true, default: true }],
    cancel() {}, addEventListener() {}, removeEventListener() {}, speak(u) { window.__oku.push(u.text); setTimeout(() => u.onend && u.onend(), 20); } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: ss });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; this.rate = 1; this.pitch = 1; this.voice = null; }; })()"""


def main():
    shots = arg("--shots")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    lex = content_file("lexemes.json")["lexemes"]
    resimli = [l for l in lex if l.get("img") and l.get("card", True) is not False and l.get("pos") == "noun"][:4]
    es = [l for l in lex if l.get("card", True) is not False and l.get("pos") == "noun" and l.get("art")][:5]
    check(len(resimli) == 4 and len(es) == 5, f"önizleme için kart var ({len(resimli)}, {len(es)})")
    kayit = {f"{l['id']}#kart": {"src": f"https://foto.example/{i}.jpg", "sinif": "acik", "yazar": "Örnek Yazar", "lisans": "CC BY 2.0",
             "lisans_url": "https://creativecommons.org/licenses/by/2.0", "sayfa": "https://commons.wikimedia.org/wiki/File:X.jpg"} for i, l in enumerate(resimli)}
    soz = lambda l: f"{l['art']} {l['de']}" if l.get("art") else l["de"]
    with sync_playwright() as p:
        for gen in (430, 393):
            b, ctx = launch(p, viewport={"width": gen, "height": 932 if gen == 430 else 852}); ctx.add_init_script(SAHTE_SES); pg = new_page(ctx)
            pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": kayit})))
            pg.route("https://foto.example/**", lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG))
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            ids = ",".join(l["id"] for l in resimli); hedef = resimli[0]
            # --- resimden seç: yanlış seçim ---
            pg.goto(base + f"#/akis-soru/resim/{ids}"); pg.reload(); pg.wait_for_selector("[data-test=resimden-sec]")
            pg.wait_for_function("() => window.__oku.length >= 1")
            check(pg.evaluate("window.__oku[0]") == soz(hedef), f"[{gen}] kelime açılışta okunuyor ({pg.evaluate('window.__oku[0]')})")
            metin = pg.inner_text("[data-test=resimden-sec]")
            check(hedef["de"] not in metin and pg.locator("[data-test=resimden-sec] [lang=de]").count() == 0, f"[{gen}] soru anında Almanca metin yok")
            kutu = pg.locator("[data-test=rs-kare]").evaluate_all("(xs) => xs.map((x) => { const r = x.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; })")
            sutun, satir = len({k[0] for k in kutu}), len({k[1] for k in kutu})
            check(len(kutu) == 4 and sutun == 2 and satir == 2 and all(k[2] >= 44 and k[3] >= 44 for k in kutu), f"[{gen}] 2×2 görsel, kareler ≥ 44 pt ({kutu})")
            check(pg.locator("[data-test=rs-kontrol]").is_disabled(), f"[{gen}] seçmeden 'Kontrol et' kapalı")
            yanlis_id = resimli[1]["id"]
            pg.click(f"[data-test=rs-kare][data-id='{yanlis_id}']")
            check(pg.get_attribute(f"[data-test=rs-kare][data-id='{yanlis_id}']", "aria-pressed") == "true" and "sec" in pg.get_attribute(f"[data-test=rs-kare][data-id='{yanlis_id}']", "class"), f"[{gen}] seçilen kare işaretli")
            if shots and gen == 430: shot(pg, "akis-resim-secili", full=False)
            pg.click("[data-test=rs-kontrol]"); pg.wait_for_selector("[data-test=rs-acik]")
            dogru_c = pg.get_attribute(f"[data-test=rs-kare][data-id='{hedef['id']}']", "class"); yanlis_c = pg.get_attribute(f"[data-test=rs-kare][data-id='{yanlis_id}']", "class")
            check("right" in dogru_c and "wrong" in yanlis_c, f"[{gen}] yanlışta doğru kare yeşil, seçilen kırmızı")
            check(soz(hedef) in pg.inner_text("[data-test=rs-acik]"), f"[{gen}] cevaptan sonra kelime açılıyor")
            if shots and gen == 430: shot(pg, "akis-resim-cevap", full=False)
            no_overflow(pg, f"[{gen}] resimden seç")
            pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=akis-soru-sonuc]")
            check(pg.inner_text("[data-test=akis-soru-sonuc]") == "yanlis", f"[{gen}] yanlış cevap yanlış sayılıyor")
            # --- doğru seçim ve "Bilmiyorum" ---
            pg.reload(); pg.wait_for_selector("[data-test=resimden-sec]")
            pg.click(f"[data-test=rs-kare][data-id='{hedef['id']}']"); pg.click("[data-test=rs-kontrol]"); pg.click("[data-test=next]")
            check(pg.inner_text("[data-test=akis-soru-sonuc]") == "dogru", f"[{gen}] doğru cevap doğru sayılıyor")
            pg.reload(); pg.wait_for_selector("[data-test=resimden-sec]")
            pg.click("[data-test=rs-bilmiyorum]"); pg.wait_for_selector("[data-test=rs-acik]")
            check("right" in pg.get_attribute(f"[data-test=rs-kare][data-id='{hedef['id']}']", "class"), f"[{gen}] 'Bilmiyorum' doğruyu gösteriyor")
            pg.click("[data-test=next]")
            check(pg.inner_text("[data-test=akis-soru-sonuc]") == "yanlis", f"[{gen}] 'Bilmiyorum' yanlış sayılıyor (ceza yok, kayıt yanlış)")
            # --- eşleştir ---
            pg.goto(base + "#/akis-soru/eslestir/" + ",".join(l["id"] for l in es)); pg.reload(); pg.wait_for_selector("[data-test=eslestir]")
            check(pg.locator("text=Kontrol et").count() == 0, f"[{gen}] eşleştirde 'Kontrol et' yok")
            a, b2 = es[0], es[1]
            pg.evaluate("window.__oku = []")
            pg.click(f"[data-test=es-de][data-id='{a['id']}']"); pg.wait_for_function("() => window.__oku.length >= 1")
            check(pg.evaluate("window.__oku[0]") == soz(a), f"[{gen}] Almanca kareye dokununca ses")
            pg.click(f"[data-test=es-tr][data-id='{b2['id']}']")
            check("salla" in pg.get_attribute(f"[data-test=es-tr][data-id='{b2['id']}']", "class") and pg.locator(".es-kare.tamam").count() == 0, f"[{gen}] yanlış eşleşme sallanıyor, kilitlenmiyor")
            for l in es:
                pg.click(f"[data-test=es-de][data-id='{l['id']}']"); pg.click(f"[data-test=es-tr][data-id='{l['id']}']")
                check("tamam" in pg.get_attribute(f"[data-test=es-tr][data-id='{l['id']}']", "class") and pg.locator(f"[data-test=es-de][data-id='{l['id']}']").is_disabled(), f"[{gen}] doğru çift anında yeşil ve kilitli ({l['de']})")
            kutu = pg.locator(".es-kare").evaluate_all("(xs) => xs.map((x) => Math.round(x.getBoundingClientRect().height))")
            check(min(kutu) >= 44, f"[{gen}] eşleştir kareleri ≥ 44 pt ({min(kutu)})")
            no_overflow(pg, f"[{gen}] eşleştir")
            if shots and gen == 430: shot(pg, "akis-eslestir-bitti", full=False)
            pg.click("[data-test=next]")
            check(pg.inner_text("[data-test=akis-soru-sonuc]") == f"yanlis:{','.join(sorted([a['id'], b2['id']]))}", f"[{gen}] yanlış eşleşen iki kart halkada bir kez daha gelmek üzere döner ({pg.inner_text('[data-test=akis-soru-sonuc]')})")
            b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
