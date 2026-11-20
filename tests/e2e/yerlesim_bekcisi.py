"""
Yerleşim bekçisi (PM-079 md. 4; hazır tanımı #12 7047348069, PM ✓ 7047456551).
Gezginin yürüdüğü her ekranı (gezgin.screens(), kopya liste yok) iki boyutta açar: 390×844 ve 430×932.
Her ekranda sekiz kural:
  B1 birincil düğme (.btn.primary) görüş alanına getirildiğinde tam görünür ve üstüne hiçbir öğe binmez (5 iç nokta elementFromPoint; ata öğe sayılmaz)
  B2 etkileşimli öğeler (button, a[href], [role=button], input, select, textarea) üst üste değil (ata/çocuk hariç; kesişim > 1 px²;
     kayan içeriğin sabit çubuğun altından geçmesi sayılmaz)
  B3 ≥ 3 sözcüklü aynı metin bir ekranda iki ayrı blokta yok (aynı listenin kardeş satırlarındaki yineleme bir kez sayılır)
  B4 ana ekranlarda (Bugün, Öğren, İlerleme, Profil) açıklama (main p.muted, main p.small, [data-aciklama]) ≤ 2 satır
  B5 "·" satır başında ya da sonunda yalnız kalmaz (önceki ve sonraki görünür karakter aynı satırda)
  B6 yatay taşma yok (scrollWidth ≤ innerWidth + 1)
  B7 başlık sözcüğü (h1–h3, .de, .de-lg, [lang=de]; ≥ 18 px) iki satıra bölünmez (heceleme ya da kırma)
  B8 görüş alanında aynı anda en çok bir birincil düğme (açık pencere/alt sayfa varsa yalnız onun içi)
Kip (PM 7047456551): main'de ilk ölçümde ihlal 5'ten çoksa bekçi RAPOR kipinde girer (ihlal listesi yazılır, çıkış 0);
düzeltmeler ≤ 5'lik PR'larla gelir, sayı sıfıra inince KIP = "kirmizi" yapılır. İstisna dosyası yoktur.
Kuralların kendisi her koşuda önce sentetik sayfalarla sınanır (--oz-sina; ihlalli → yakalanmalı, temiz → yakalanmamalı);
bu öz-sınama her kipte kırmızı verebilir.
  python3 tests/e2e/yerlesim_bekcisi.py [--browser webkit] [--device "iPhone 15"] [--out /tmp/shots/yerlesim.json] [--oz-sina] [--oz-goruntu <klasör>] [--kip rapor|kirmizi]
"""
import json, os, sys
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, arg, BROWSER, DEVICE, SHOTS
import gezgin

KIP = "rapor"   # PM 7047456551: ilk ölçüm > 5 ihlal → rapor kipi; sıfıra inince "kirmizi"
PORT = 4231
BOYUTLAR = [{"width": 390, "height": 844}, {"width": 430, "height": 932}]
ANA = {"#/today", "#/learn", "#/progress", "#/profile"}

KURALLAR = r"""(ana) => {
  const ihlal = [];
  const ad = (e) => (e.getAttribute('data-test') ? '[' + e.getAttribute('data-test') + ']' : '') + (e.innerText || e.getAttribute('aria-label') || e.tagName).trim().replace(/\s+/g, ' ').slice(0, 40);
  const gorunur = (e) => {
    if (!e || !e.getClientRects().length) return false;
    const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false;
    if (e.closest('[aria-hidden=true], .sr-only, [hidden]')) return false;
    for (let x = e; x; x = x.parentElement) { const s = getComputedStyle(x); if (s.visibility === 'hidden' || s.display === 'none' || parseFloat(s.opacity) === 0) return false; }
    return true;
  };
  const ust = (r, s) => Math.max(0, Math.min(r.right, s.right) - Math.max(r.left, s.left)) * Math.max(0, Math.min(r.bottom, s.bottom) - Math.max(r.top, s.top));
  const pencere = [...document.querySelectorAll('dialog[open], [role=dialog], [aria-modal=true], .sheet, .modal')].filter(gorunur).pop() || null;
  const kapsam = pencere || document;

  // B6 yatay taşma
  if (document.documentElement.scrollWidth > innerWidth + 1) ihlal.push(['B6', `yatay taşma ${document.documentElement.scrollWidth} > ${innerWidth}`]);

  // B8 tek birincil (görüş alanında, ilk konumda)
  const birincil = [...kapsam.querySelectorAll('.btn.primary')].filter(gorunur);
  const alanda = birincil.filter((b) => { const r = b.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; });
  if (alanda.length > 1) ihlal.push(['B8', `görüş alanında ${alanda.length} birincil düğme: ` + alanda.map(ad).join(' | ')]);

  // B1 birincil düğme tam görünür, üstüne binen yok
  const sy = scrollY;
  for (const b of birincil) {
    b.scrollIntoView({ block: 'center', inline: 'nearest' });
    const r = b.getBoundingClientRect();
    if (r.top < -0.5 || r.left < -0.5 || r.bottom > innerHeight + 0.5 || r.right > innerWidth + 0.5) { ihlal.push(['B1', `birincil düğme görüş alanına sığmıyor: ${ad(b)} (${Math.round(r.top)}–${Math.round(r.bottom)} / ${innerHeight})`]); continue; }
    // 5 nokta: merkez + yatayda %12, dikeyde %25 içeriden (köşe yuvarlaklığı dışarıda kalır); ata öğe örtü sayılmaz
    const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, dx = r.width * 0.38, dy = r.height * 0.25;
    const n = [[cx, cy], [cx - dx, cy], [cx + dx, cy], [cx, cy - dy], [cx, cy + dy]];
    const ortu = n.map(([x, y]) => document.elementFromPoint(x, y)).find((e) => e && e !== b && !b.contains(e) && !e.contains(b));
    if (ortu) ihlal.push(['B1', `birincil düğmenin üstünde öğe: ${ad(b)} ← ${ad(ortu)}`]);
  }
  scrollTo(0, sy);

  // B2 etkileşimli öğeler üst üste değil
  const dok = [...document.querySelectorAll('button, a[href], [role=button], input:not([type=hidden]), select, textarea')].filter(gorunur);
  const kutu = dok.map((e) => e.getBoundingClientRect());
  // sabit katman: fixed/sticky ata (sekme çubuğu, eylem çubuğu); kayan içeriğin sabit çubuğun altından geçmesi ihlal değildir
  const katman = (e) => { for (let x = e; x; x = x.parentElement) { const p = getComputedStyle(x).position; if (p === 'fixed' || p === 'sticky') return x; } return null; };
  const kat = dok.map(katman);
  for (let i = 0; i < dok.length; i++) for (let j = i + 1; j < dok.length; j++) {
    if (dok[i].contains(dok[j]) || dok[j].contains(dok[i])) continue;
    if ((kat[i] === null) !== (kat[j] === null)) continue;
    if (ust(kutu[i], kutu[j]) > 1) ihlal.push(['B2', `üst üste: ${ad(dok[i])} × ${ad(dok[j])}`]);
  }

  // B3 aynı metin iki ayrı blokta (kardeş satırlar bir kez)
  const norm = (t) => t.replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr');
  const tasiyan = new Map();
  for (const e of document.body.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(e.tagName) || !gorunur(e)) continue;
    const t = norm(e.innerText || ''); if (t.split(' ').length < 3) continue;
    // en derin taşıyıcı: aynı metni taşıyan görünür çocuğu yoksa
    if ([...e.children].some((c) => norm(c.innerText || '') === t)) continue;
    if (!tasiyan.has(t)) tasiyan.set(t, []); tasiyan.get(t).push(e);
  }
  const satir = (a, b) => {   // a ile b aynı listenin kardeş satırlarında mı
    let x = a; const atalar = new Set(); while (x) { atalar.add(x); x = x.parentElement; }
    let y = b, oy = null; while (y && !atalar.has(y)) { oy = y; y = y.parentElement; }
    let z = a, oz = null; while (z && z !== y) { oz = z; z = z.parentElement; }
    return !!(oy && oz && oy !== oz && oy.tagName === oz.tagName && oy.className === oz.className);
  };
  for (const [t, es] of tasiyan) {
    if (es.length < 2) continue;
    let ayri = false;
    for (let i = 0; i < es.length && !ayri; i++) for (let j = i + 1; j < es.length; j++) if (!satir(es[i], es[j])) { ayri = true; break; }
    if (ayri) ihlal.push(['B3', `aynı metin ${es.length} kez: "${t.slice(0, 60)}"`]);
  }

  // satır sayısı: metin kutularının farklı satır ortaları
  const satirlar = (rects) => { const m = []; for (const r of rects) { if (r.width < 0.5 || r.height < 0.5) continue; const c = (r.top + r.bottom) / 2; if (!m.some((x) => Math.abs(x - c) < r.height / 2)) m.push(c); } return m.length; };
  const kutular = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()]; };

  // B4 açıklama ≤ 2 satır (yalnız ana ekranlar)
  if (ana) for (const p of document.querySelectorAll('main p.muted, main p.small, main [data-aciklama]')) {
    if (!gorunur(p)) continue; const n = satirlar(kutular(p));
    if (n > 2) ihlal.push(['B4', `açıklama ${n} satır: "${norm(p.innerText).slice(0, 50)}"`]);
  }

  // B5 "·" satır başında/sonunda yalnız
  const blok = (n) => { let e = n.parentElement; while (e && e.parentElement && /^(inline|contents)/.test(getComputedStyle(e).display)) e = e.parentElement; return e; };
  const gorulen = new Set();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const n = w.currentNode; if (!n.textContent.includes('·') || !gorunur(n.parentElement)) continue;
    const b = blok(n); if (!b || gorulen.has(b)) continue; gorulen.add(b);
    const harf = [];   // [düğüm, sıra] görünür, boşluk olmayan karakterler
    const w2 = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
    while (w2.nextNode()) { const m = w2.currentNode; if (!gorunur(m.parentElement)) continue; for (let i = 0; i < m.textContent.length; i++) if (!/\s/.test(m.textContent[i])) harf.push([m, i]); }
    const kutu1 = ([m, i]) => { const rg = document.createRange(); rg.setStart(m, i); rg.setEnd(m, i + 1); return rg.getClientRects()[0] || null; };
    const ayniSatir = (r, s) => r && s && Math.abs((r.top + r.bottom) / 2 - (s.top + s.bottom) / 2) < Math.max(r.height, s.height) / 2;
    for (let k = 0; k < harf.length; k++) {
      const [m, i] = harf[k]; if (m.textContent[i] !== '·') continue;
      const r = kutu1(harf[k]); if (!r) continue;
      const once = k > 0 ? kutu1(harf[k - 1]) : null, sonra = k < harf.length - 1 ? kutu1(harf[k + 1]) : null;
      if (!ayniSatir(r, once)) ihlal.push(['B5', `"·" satır başında: "${norm(b.innerText).slice(0, 50)}"`]);
      else if (!ayniSatir(r, sonra)) ihlal.push(['B5', `"·" satır sonunda: "${norm(b.innerText).slice(0, 50)}"`]);
    }
  }

  // B7 başlık sözcüğü bölünmez
  for (const h of document.querySelectorAll('h1, h2, h3, .de, .de-lg, [lang=de]')) {
    if (!gorunur(h) || parseFloat(getComputedStyle(h).fontSize) < 18) continue;
    const w3 = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    while (w3.nextNode()) {
      const m = w3.currentNode; const re = /[\p{L}\p{N}­-]{4,}/gu; let x;
      while ((x = re.exec(m.textContent))) {
        const rg = document.createRange(); rg.setStart(m, x.index); rg.setEnd(m, x.index + x[0].length);
        if (satirlar([...rg.getClientRects()]) > 1) ihlal.push(['B7', `başlık sözcüğü bölünmüş: "${x[0].replace(/­/g, '')}"`]);
      }
    }
  }
  return ihlal;
}"""

# --- öz-sınama: her kural için ihlalli ve temiz sentetik sayfa ---
CSS = "<style>body{margin:0;font:16px system-ui;width:100%}main{padding:16px}.btn{display:block;height:48px;width:200px;border:0}.primary{background:#1C6FD6;color:#fff}p{margin:0 0 8px}</style>"
def sayfa(govde): return f"<!doctype html><html lang=tr><head><meta name=viewport content='width=device-width'>{CSS}</head><body>{govde}</body></html>"
OZ = [
  # (kural, ana_ekran, sayfa, ihlal beklenir mi)
  ("B1", False, sayfa("<main><button class='btn primary'>Devam</button><div style='position:fixed;top:0;left:0;width:300px;height:100px;background:red'></div></main>"), True),
  ("B1", False, sayfa("<main><button class='btn primary'>Devam</button></main>"), False),
  ("B2", False, sayfa("<main><button class=btn style='position:absolute;top:10px'>A</button><button class=btn style='position:absolute;top:30px'>B</button></main>"), True),
  ("B2", False, sayfa("<main><button class=btn>A</button><button class=btn style='margin-top:12px'>B</button></main>"), False),
  ("B3", False, sayfa("<main><h2>Bugün üç kelime var</h2><section><p>Bugün üç kelime var</p></section></main>"), True),
  ("B3", False, sayfa("<main><ul><li><b>1. bölüm</b><span class=k>Önceki bölüm bitince açılır</span></li><li><b>2. bölüm</b><span class=k>Önceki bölüm bitince açılır</span></li></ul></main>"), False),
  ("B4", True, sayfa("<main><p class=muted style='width:120px'>Bu açıklama çok uzun olduğu için dar bir kutuda üç satırdan fazla yer kaplar ve kırmızı verir.</p></main>"), True),
  ("B4", True, sayfa("<main><p class=muted>Kısa açıklama.</p></main>"), False),
  ("B5", False, sayfa("<main><p>aaaa<br>· bbbb</p></main>"), True),
  ("B5", False, sayfa("<main><p>aaaa ·<br>bbbb</p></main>"), True),
  ("B5", False, sayfa("<main><p>aaa · bbb · ccc</p></main>"), False),
  ("B6", False, sayfa("<main><div style='width:2000px;height:10px'></div></main>"), True),
  ("B6", False, sayfa("<main><div style='width:100px;height:10px'></div></main>"), False),
  ("B7", False, sayfa("<main><h1 lang=de style='width:120px;font-size:28px;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:anywhere'>Krankenversicherungskarte</h1></main>"), True),
  ("B7", False, sayfa("<main><h1 lang=de style='font-size:28px'>Die Karte</h1></main>"), False),
  ("B8", False, sayfa("<main><button class='btn primary'>Bir</button><button class='btn primary' style='margin-top:12px'>İki</button></main>"), True),
  ("B8", False, sayfa("<main><button class='btn primary'>Bir</button><button class=btn style='margin-top:12px'>İki</button></main>"), False),
  ("B8", False, sayfa("<main><button class='btn primary'>Arka</button><div role=dialog><button class='btn primary'>Tamam</button></div></main>"), False),
]

def oz_sina(pg, goruntu=None):
    for n, (kural, ana, html, beklenir) in enumerate(OZ):
        pg.set_content(html); pg.wait_for_timeout(50)
        bulunan = [k for k, _ in pg.evaluate(KURALLAR, ana) if k == kural]
        if goruntu and beklenir:
            os.makedirs(goruntu, exist_ok=True); pg.screenshot(path=os.path.join(goruntu, f"{kural}-ihlal-{n}.png"))
        check(bool(bulunan) == beklenir, f"öz-sınama {kural} {'ihlalli sayfayı yakalar' if beklenir else 'temiz sayfada sessiz'} ({len(bulunan)})")

def main():
    out = arg("--out", "/tmp/shots/yerlesim.json"); kip = arg("--kip", KIP); yalniz_oz = "--oz-sina" in sys.argv
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx); oz_sina(pg, arg("--oz-goruntu")); b.close()
        if yalniz_oz: finish()
        ekranlar = gezgin.screens()
        srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
        rap = {"browser": BROWSER, "device": DEVICE or "-", "kip": kip, "ekran": 0, "ihlal": []}
        for boy in BOYUTLAR:
            b, ctx = launch(p, viewport=boy); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            acilan = 0
            for scr in ekranlar:
                pg.goto(base + scr); pg.wait_for_timeout(400); gezgin.settle(pg, scr)
                acilan += 1
                for k, m in pg.evaluate(KURALLAR, scr in ANA):
                    rap["ihlal"].append({"boy": f"{boy['width']}x{boy['height']}", "ekran": scr, "kural": k, "ayrinti": m})
            rap["ekran"] += acilan
            check(acilan == len(ekranlar), f"{boy['width']}×{boy['height']}: gezginin {len(ekranlar)} ekranının hepsi açıldı ({acilan})")
            b.close()
        srv.shutdown()
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    json.dump(rap, open(out, "w"), ensure_ascii=False, indent=1)
    sayi = {}
    for x in rap["ihlal"]: sayi[x["kural"]] = sayi.get(x["kural"], 0) + 1
    print(f"yerleşim bekçisi: {rap['ekran']} ekran×boy, {len(rap['ihlal'])} ihlal {dict(sorted(sayi.items()))} → {out} (kip: {kip})")
    for x in rap["ihlal"]: print(f"  {x['kural']} {x['boy']} {x['ekran']}: {x['ayrinti']}")
    if kip == "kirmizi":
        check(not rap["ihlal"], f"yerleşim bekçisi: ihlal yok ({len(rap['ihlal'])})")
    finish()

if __name__ == "__main__":
    main()
