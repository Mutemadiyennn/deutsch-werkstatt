"""
Yerleşim kuralları (docs/v2/TASARIM.md; PM 7015070303 + #104 notu): Bugün, Görevler ve Odak ekranlarında iki temada ölçülür.
  Y1 en çok 1 birincil düğme · Y2 ana blok ≤ 3 · Y3 ana bloklar arası ≥ 24 px, liste satırları arası ≥ 12 px
  Y4 dokunulabilir kutular kesişmez · Y5 aynı uzun metin iki kez görünmez · Y6 gövde paragrafı ≤ 2 satır
python3 tests/e2e/v2_yerlesim.py [--browser webkit] [--device "iPhone 15 Pro Max"]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish

PORT = 4212

OLC = """(kok) => {
  const g = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !e.closest('.sr-only'); };
  const root = document.querySelector(kok);
  const birincil = [...document.querySelectorAll('main .btn.primary')].filter(g).length;
  const bloklar = [...root.children].filter(g);
  const aralik = []; for (let i = 1; i < bloklar.length; i++) aralik.push(Math.round(bloklar[i].getBoundingClientRect().top - bloklar[i - 1].getBoundingClientRect().bottom));
  // dokunulabilir kutular (iç içe olanlar hariç) kesişmez
  const dok = [...root.querySelectorAll('a[href], button')].filter(g);
  const kesisen = [];
  for (let i = 0; i < dok.length; i++) for (let j = i + 1; j < dok.length; j++) {
    const a = dok[i], b = dok[j]; if (a.contains(b) || b.contains(a)) continue;
    const r = a.getBoundingClientRect(), s = b.getBoundingClientRect();
    const ox = Math.min(r.right, s.right) - Math.max(r.left, s.left), oy = Math.min(r.bottom, s.bottom) - Math.max(r.top, s.top);
    if (ox > 1 && oy > 1) kesisen.push((a.dataset.test || a.textContent.trim().slice(0, 20)) + ' × ' + (b.dataset.test || b.textContent.trim().slice(0, 20)));
  }
  // aynı uzun metin (≥ 12 karakter) aynı birimde iki kez (yol günleri gibi eş birimler kendi içinde sayılır)
  const metin = {}; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) { const n = w.currentNode; const t = n.textContent.trim(); if (t.length < 12 || !n.parentElement || !g(n.parentElement)) continue;
    const birim = n.parentElement.closest('.yolgun'); const k = (birim ? birim.dataset.test : '-') + '|' + t; metin[k] = (metin[k] || 0) + 1; }
  const tekrar = Object.keys(metin).filter((t) => metin[t] > 1);
  // gövde paragrafı ≤ 2 satır
  const uzun = [...root.querySelectorAll('p')].filter(g).map((p) => { const lh = parseFloat(getComputedStyle(p).lineHeight) || 20; return [p.textContent.trim().slice(0, 30), Math.round(p.getBoundingClientRect().height / lh)]; }).filter((x) => x[1] > 2);
  return { birincil, bloklar: bloklar.length, aralik, kesisen, tekrar, uzun };
}"""

LISTE = """(sec) => { const xs = [...document.querySelectorAll(sec)]; const a = []; for (let i = 1; i < xs.length; i++) a.push(Math.round(xs[i].getBoundingClientRect().top - xs[i - 1].getBoundingClientRect().bottom)); return a; }"""

def denetle(pg, ad, kok, en_cok_blok=3):
    m = pg.evaluate(OLC, kok)
    check(m["birincil"] <= 1, f"{ad}: Y1 en çok 1 birincil düğme ({m['birincil']})")
    check(m["bloklar"] <= en_cok_blok, f"{ad}: Y2 ana blok ≤ {en_cok_blok} ({m['bloklar']})")
    check(all(x >= 24 for x in m["aralik"]), f"{ad}: Y3 ana bloklar arası ≥ 24 px ({m['aralik']})")
    check(not m["kesisen"], f"{ad}: Y4 dokunulabilir kutular kesişmiyor ({m['kesisen'][:3]})")
    check(not m["tekrar"], f"{ad}: Y5 aynı metin iki kez yok ({m['tekrar'][:3]})")
    check(not m["uzun"], f"{ad}: Y6 gövde paragrafı ≤ 2 satır ({m['uzun'][:3]})")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=gorev-seridi]")
            denetle(pg, f"[{tema}] Bugün", "[data-test=bugun-yol]")
            pg.goto(base + "#/gorevler"); pg.wait_for_selector("[data-test=gorev]")
            # TopBar + bant + liste
            denetle(pg, f"[{tema}] Görevler", "[data-test=gorevler]", en_cok_blok=3)
            a = pg.evaluate(LISTE, "[data-test=gorev]")
            check(all(x >= 12 for x in a), f"[{tema}] Görevler: Y3 satırlar arası ≥ 12 px ({a})")
            # Öğren: "Tekrar edilecekler" — Bahçe düğmesi ile "+ Duyduğum kelime" arasında ≥ 12 px, kesişme yok (2. tur P1-2)
            pg.goto(base + "#/koy/bahce"); pg.wait_for_selector("[data-test=weak] [data-test=heard]")
            ara = pg.evaluate("() => { const a = document.querySelector('[data-test=tekrar-bahce]').getBoundingClientRect(), b = document.querySelector('[data-test=weak] [data-test=heard]').getBoundingClientRect(); return Math.round(b.top - a.bottom); }")
            check(ara >= 12, f"[{tema}] Öğren: Bahçe düğmesi ile 'Duyduğum kelime' arası ≥ 12 px ({ara})")
            # Bugün: BAŞLA ve görev şeridi ilk ekranda (2. tur P1-1)
            pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=m1-devam]"); pg.wait_for_timeout(300)
            gor = pg.evaluate("() => ['[data-test=m1-devam]', '[data-test=gorev-seridi]'].map((s) => { const r = document.querySelector(s).getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; })")
            check(all(gor), f"[{tema}] Bugün: BAŞLA ve görev şeridi ilk ekranda ({gor})")
            pg.goto(base + "#/odak"); pg.wait_for_selector("[data-test=gun-halkasi]")
            denetle(pg, f"[{tema}] Odak", "[data-test=odak]")
            b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
