"""
#58 B1 — Sözlük arama (çevrimdışı DE↔TR, kart açılır, "Duyduğum kelime" olarak Bahçe'ye girer):
  - Öğren ekranından açılır; Almanca (çekimli biçim dahil) ve Türkçe arama sonuç verir
  - sonuca dokununca kart: anlam, örnek/eşdizim; "Bahçe'ye ekle" → kişisel liste (Bahçe önceliği), ikinci açılışta "Bahçende ✓"
  - sözlükte olmayan kelime "Duyduğum kelime" olarak eklenir
  - internetsiz arama ucak.py'de (A) sınanır
  python3 tests/e2e/v2_sozluk.py [--browser webkit] [--device "iPhone 15"]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, no_overflow

PORT = 4198

def ara(pg, q):
    pg.fill("[data-test=sozluk-q]", q)
    if q: pg.wait_for_selector("[data-test=sozluk-satir], [data-test=sozluk-yok]")

def kisisel(pg):
    return pg.evaluate("""() => new Promise((res) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const db = r.result;
      if (![...db.objectStoreNames].includes('personal')) return res([]);
      const q = db.transaction('personal').objectStore('personal').getAll(); q.onsuccess = () => res(q.result.map((x) => ({ de: x.de, source: x.source }))); q.onerror = () => res([]); }; r.onerror = () => res([]); })""")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/learn"); pg.click("[data-test=sozluk-ac]"); pg.wait_for_selector("[data-test=sozluk-q]")
        check("#/sozluk" in pg.url, "Öğren ekranından Sözlük açılıyor")
        ara(pg, "Termin")
        ilk = pg.locator("[data-test=sozluk-satir]").first.inner_text()
        check("Termin" in ilk and "randevu" in ilk.lower(), f"Almanca arama: ilk sonuç 'Termin' ({ilk!r})")
        ara(pg, "Termine")
        check("Termin" in pg.locator("[data-test=sozluk-satir]").first.inner_text(), "çekimli biçim (Termine) karta gidiyor")
        ara(pg, "randevu")
        check(pg.locator("[data-test=sozluk-satir]").count() >= 1 and "Termin" in pg.inner_text("[data-test=sozluk-sonuc]"), "Türkçe arama (randevu) Termin'i buluyor")
        no_overflow(pg, "sözlük sonuçları")
        ara(pg, "Termin"); pg.locator("[data-test=sozluk-satir]").first.click(); pg.wait_for_selector("[data-test=sozluk-kart]")
        kart = pg.inner_text("[data-test=sozluk-kart]")
        check("randevu" in kart.lower() and pg.locator("[data-test=sozluk-kart] [data-test=listen]").count() == 1, "kart: anlam ve dinle düğmesi")
        pg.click("[data-test=sozluk-ekle]"); pg.wait_for_selector("[data-test=sozluk-ekle][disabled]")
        ks = kisisel(pg)
        check(any("Termin" in x["de"] and x["source"] == "heard" for x in ks), f"'Duyduğum kelime' olarak kişisel listeye girdi ({ks})")
        check("Bahçe" in pg.inner_text("[data-test=sozluk-ekle-not]"), "Bahçe kartı olan kelimede Bahçe sözü veriliyor")
        pg.go_back(); pg.wait_for_selector("[data-test=sozluk-satir]")
        check(pg.input_value("[data-test=sozluk-q]") == "Termin", "geri hareketi kart → aramaya dönüyor, arama korunuyor")
        check("✓" in pg.locator("[data-test=sozluk-satir]").first.inner_text(), "sonuç listesinde 'Listende' işareti")
        check(pg.get_attribute("[data-tab=learn]", "aria-current") == "page", "alt çubukta Öğren vurgulu")
        ara(pg, "Termi")
        check(pg.locator("[data-test=sozluk-satir]").count() >= 1 and pg.locator("[data-test=sozluk-yok]").count() == 1, "tam eşleşme yoksa sonuçlar varken de ekleme kartı çıkıyor")
        # uzun anlamlı satır: Almanca kelime harf harf bölünmüyor
        ara(pg, "krank")
        h = pg.evaluate("Math.max(...[...document.querySelectorAll('[data-test=sozluk-satir]')].map(e => e.getBoundingClientRect().height))")
        check(h < 120, f"sonuç satırları kısa kalıyor (en uzun {h:.0f} px)")
        ara(pg, "Quatschkopfwort")
        check(pg.locator("[data-test=sozluk-yok]").count() == 1, "sözlükte olmayan kelime için ekleme kartı")
        pg.fill("[aria-label='Türkçe anlamı']", "saçma"); pg.click("[data-test=sozluk-yok-ekle]"); pg.wait_for_selector("[data-test=sozluk-yok-ekle][disabled]")
        check(any(x["de"] == "Quatschkopfwort" for x in kisisel(pg)), "sözlükte olmayan kelime de 'Duyduğum kelime' olarak eklendi")
        ara(pg, ""); pg.fill("[data-test=sozluk-q]", ""); pg.wait_for_selector("[data-test=kelimelerim]")
        kl = pg.inner_text("[data-test=kelimelerim]")
        check("Quatschkopfwort" in kl and "Termin" in kl, f"arama boşken 'Kelimelerim' eklenen kelimeleri gösteriyor, kartsız olanı da ({kl[:80]!r})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
