"""
Dil noktası durağı (PM-092 md. 1, PM 7087668356 md. 7; inceleme #231 P1-1/P1-2): paketteki BÜTÜN dil noktalarının (grammar.json `gr:`
+ dn.json `dn:`) durak gövdesi telefonda okunur.
  - tablo ekrana sığar (sol ≥ 8, sağ ≤ genişlik − 8), sayfa yatay kaymaz; tablo bölünmez (sütun seçici yok, bütün sütunlar görünür)
  - "örnek…" sütunu satırın altında; başlık, açıklama, her örnekte dinle düğmesi, tek birincil "Anladım", soru yok
  - ekranda ham ** ya da çıplak yer tutucu yok
Gövde e2e paketinin `#/__dil-noktasi/<id>` rotasıyla tek başına çizilir (planlayıcıdaki yeri akis.test.ts sınar).
python3 tests/e2e/v2_dil_noktasi.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR] [--seviye A1] [--ts 1.3] [--genislik 320]
"""
import json, os
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, DIST

PORT = 4251
SEVIYE = (arg("--seviye") or "").lower()
TS = float(arg("--ts") or 1)
GENISLIK = int(arg("--genislik") or 0)

def notlar():
    v = json.load(open(os.path.join(DIST, "content", "current.json")))["version"]
    kok = os.path.join(DIST, "content", v)
    gr = json.load(open(os.path.join(kok, "grammar.json")))
    dn = json.load(open(os.path.join(kok, "dn.json"))) if os.path.exists(os.path.join(kok, "dn.json")) else []
    hepsi = gr + dn
    if SEVIYE: hepsi = [n for n in hepsi if not n["id"].startswith("gr:") or n["id"].startswith(f"gr:{SEVIYE}-")]
    return hepsi

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    liste = notlar()
    check(len(liste) > 0, f"pakette dil noktası var ({len(liste)})")
    tasan, bolunen, govde, ham = [], [], [], []
    tablolu = 0
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema, viewport={"width": GENISLIK, "height": 568} if GENISLIK else None); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        for i, n in enumerate(liste):
            pg.goto(base + "#/__dil-noktasi/" + n["id"]); pg.wait_for_selector("[data-test=akis-dil-noktasi]", timeout=15000)
            # uygulamanın yazı boyutu ayarı (--ts; v2_baslik/v2_ders ile aynı yöntem): EK2 md. 3 büyük yazıda da taşma yok
            if TS != 1: pg.evaluate("(ts) => { document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts', String(ts)); }", TS); pg.wait_for_timeout(80)
            r = pg.evaluate("""() => { const s = document.querySelector('[data-test=akis-dil-noktasi]'); const t = s.querySelector('[data-test=akis-tablo-t]');
              const tr = t ? t.getBoundingClientRect() : null;
              return { w: innerWidth, sw: document.documentElement.scrollWidth, sol: tr ? tr.left : null, sag: tr ? tr.right : null,
                th: t ? t.querySelectorAll('thead th').length : 0, alt: t ? t.querySelectorAll('tr.alt').length : 0, secici: s.querySelectorAll('[data-test=akis-tablo-sec]').length,
                baslik: (s.querySelector('h2')?.innerText || '').length, ornek: s.querySelectorAll('[data-test=dil-noktasi-ornek]').length,
                dinle: s.querySelectorAll('[data-test=dil-noktasi-ornek] button').length, birincil: s.querySelectorAll('.btn.primary').length,
                soru: s.querySelectorAll('button.opt, input, textarea').length, metin: s.innerText }; }""")
            tab = n.get("table") or {}
            if tab.get("rows"):
                tablolu += 1
                head = tab.get("head") or []
                ornek = [j for j, h in enumerate(head) if h.strip().lower().startswith("örnek")]
                beklenen = len(head) - (1 if ornek else 0)
                if r["sol"] < 8 or r["sag"] > r["w"] - 8 or r["sw"] > r["w"]: tasan.append(f"{n['id']} ({round(r['sag'])}/{r['w']})")
                if r["secici"] or r["th"] != beklenen: bolunen.append(f"{n['id']} (sütun {r['th']}/{beklenen}, seçici {r['secici']})")
                if len(tasan) == 1 and tasan[-1].startswith(n["id"]): shot(pg, f"dil-noktasi-tasan-{sema}")
            if not (r["baslik"] and r["dinle"] >= r["ornek"] and r["birincil"] == 1 and r["soru"] == 0): govde.append(f"{n['id']} {dict((k, r[k]) for k in ('baslik', 'ornek', 'dinle', 'birincil', 'soru'))}")
            if "**" in r["metin"] or ("{" in r["metin"] and "}" in r["metin"]): ham.append(n["id"])
            if n["id"] == "gr:a1-05:t5": shot(pg, f"dil-noktasi-cumle-dizilisi-{sema}", full=False)
        b.close()
    check(not tasan, f"yazı %{round(TS * 100)}{f', {GENISLIK} pt' if GENISLIK else ''}: {tablolu} tablonun hepsi ekrana sığar, sayfa yatay kaymaz (taşan {len(tasan)}: {tasan[:8]})")
    check(not bolunen, f"tablo bölünmez: sütun seçici yok, bütün sütunlar görünür (bölünen {len(bolunen)}: {bolunen[:8]})")
    check(not govde, f"her durakta başlık, sesli örnekler, tek 'Anladım', soru yok (eksik {len(govde)}: {govde[:5]})")
    check(not ham, f"ekranda ham ** ya da yer tutucu yok ({ham[:5]})")
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
