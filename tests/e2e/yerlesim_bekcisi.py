"""
Yerleşim bekçisi (PM-079 md. 4; hazır tanımı #12 7047348069, PM ✓ 7047456551).
Gezginin yürüdüğü her ekranı (gezgin.screens(), kopya liste yok) iki boyutta açar: 390×844 ve 430×932.
Her ekranda sekiz kural:
  B1 birincil düğme (.btn.primary) görüş alanına getirildiğinde tam görünür, kırpan atası yok ve üstüne hiçbir öğe binmez
     (5 nokta elementFromPoint: köşelerden 2 px + yuvarlaklığın 0,3'ü içeride, ve merkez)
  B2 etkileşimli öğeler (button, a[href], [role=button], input, select, textarea) üst üste değil (ata/çocuk hariç; kesişim > 1 px²;
     kayan içerik sabit çubuğun altından geçiyorsa öğe ortaya getirilip yeniden ölçülür; yalnız kalıcı binme sayılır)
  B3 ≥ 3 sözcüklü aynı metin bir ekranda iki ayrı blokta yok (aynı listenin kardeş satırlarındaki yineleme bir kez sayılır;
     kardeş satır = aynı etiket + sınıf ve satır yinelenen metinden fazlasını taşıyor; yinelenen metin kart başlığıysa muafiyet yok)
  B4 ana ekranlarda (Bugün, Öğren, İlerleme, Profil) açıklama (main p.muted, main p.small, [data-aciklama]) ≤ 2 satır
  B5 "·" satır başında ya da sonunda yalnız kalmaz (önceki ve sonraki görünür karakter aynı satırda)
  B6 yatay taşma yok: belge (scrollWidth ≤ innerWidth + 1) ve öğe (kutusu ekran dışına taşan öğe; overflow-x:clip altında da; yatay kaydırmalı şerit hariç)
  B7 başlık sözcüğü (h1–h3; .de, .de-lg, [lang=de] ≥ kök yazının 1,15 katı) iki satıra bölünmez (heceleme ya da kırma; kısa çizgide kırılma serbest)
  B8 görüş alanında aynı anda en çok bir birincil düğme (açık pencere/alt sayfa varsa yalnız onun içi) — yalnız ilk konumda (scrollY = 0)
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
PORT = 4237
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

  // B6 yatay taşma: belge düzeyinde ve öğe düzeyinde (overflow-x: clip/hidden ata taşmayı gizleyebilir; yatay kaydırmalı şerit hariç)
  if (document.documentElement.scrollWidth > innerWidth + 1) ihlal.push(['B6', `yatay taşma ${document.documentElement.scrollWidth} > ${innerWidth}`]);
  const kaydirmali = (e) => { for (let x = e.parentElement; x; x = x.parentElement) { const o = getComputedStyle(x).overflowX; if (o === 'auto' || o === 'scroll') return true; } return false; };
  const tasan = [];
  for (const e of document.body.querySelectorAll('*')) {
    if (!gorunur(e) || getComputedStyle(e).position === 'fixed') continue;
    const r = e.getBoundingClientRect(); if (r.right <= innerWidth + 1 && r.left >= -1) continue;
    if (kaydirmali(e) || tasan.some((t) => t.contains(e))) continue;
    tasan.push(e);
  }
  for (const e of tasan.slice(0, 5)) { const r = e.getBoundingClientRect(); ihlal.push(['B6', `öğe ekran dışına taşıyor: ${ad(e)} (${Math.round(r.left)}–${Math.round(r.right)} / ${innerWidth})`]); }

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
    // kırpan ata (overflow ≠ visible): düğme atanın kutusundan taşıyorsa kesik
    let kesik = null;
    // eksen eksen: yalnız o eksende kırpan ata o eksendeki taşmayla karşılaştırılır; fixed düğme ata kutusuna bağlı değildir
    if (getComputedStyle(b).position !== 'fixed') for (let x = b.parentElement; x && x !== document.body; x = x.parentElement) {
      const st = getComputedStyle(x), a = x.getBoundingClientRect();
      const kx = st.overflowX !== 'visible' && (r.left < a.left - 0.5 || r.right > a.right + 0.5);
      const ky = st.overflowY !== 'visible' && (r.top < a.top - 0.5 || r.bottom > a.bottom + 0.5);
      if (kx || ky) { kesik = x; break; }
    }
    if (kesik) { ihlal.push(['B1', `birincil düğme atası tarafından kırpılıyor: ${ad(b)} ⊄ ${ad(kesik)}`]); continue; }
    // 5 nokta: dört köşe (2 px + köşe yuvarlaklığının 0,3'ü içeriden; yay dışı nokta düğmeye düşmez) ve merkez
    const yc = Math.min(parseFloat(getComputedStyle(b).borderTopLeftRadius) || 0, r.height / 2, r.width / 2), ic = 2 + yc * 0.3;
    const n = [[r.left + ic, r.top + ic], [r.right - ic, r.top + ic], [r.left + ic, r.bottom - ic], [r.right - ic, r.bottom - ic], [(r.left + r.right) / 2, (r.top + r.bottom) / 2]];
    const ortu = n.map(([x, y]) => document.elementFromPoint(x, y)).find((e) => e && e !== b && !b.contains(e));
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
    if ((kat[i] === null) !== (kat[j] === null)) {
      // akıştaki öğe sabit çubuğun altında: öğe görüş alanının ortasına getirilince hâlâ binme varsa ihlal (kısa sayfa, son satır)
      // yatayda örtüşmüyorsa kaydırma binme yaratamaz; örtüşüyorsa (ilk konumda görüş alanı dışında olsa da) yeniden ölçülür
      if (Math.min(kutu[i].right, kutu[j].right) - Math.max(kutu[i].left, kutu[j].left) <= 1) continue;
      const akis = kat[i] === null ? dok[i] : dok[j], sabit = akis === dok[i] ? dok[j] : dok[i];
      const y0 = scrollY; akis.scrollIntoView({ block: 'center' });
      const o = ust(akis.getBoundingClientRect(), sabit.getBoundingClientRect()); scrollTo(0, y0);
      if (o > 1) ihlal.push(['B2', `sabit çubuk kalıcı biniyor: ${ad(akis)} × ${ad(sabit)}`]);
      continue;
    }
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
  // başlık (PM 7048319359 D1; inceleme #175 P1-1): h1–h6 / [role=heading] ya da kartın ilk BAŞLIK adayı — önde gelen kısa ya da küçük yazılı
  // öğeler (numara, çip, simge, kicker: ≤ 3 karakter ya da kök yazının altında) atlanır; kalınlık/büyüklük yinelenen metni taşıyan öğede ölçülür
  const baslik = (e, kart) => {
    const H = 'h1, h2, h3, h4, h5, h6, [role=heading]';
    if (e.closest(H)) return true;
    const kok = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const ilk = [...kart.querySelectorAll('*')].find((x) => gorunur(x) && norm(x.innerText || '') && ![...x.children].some((c) => norm(c.innerText || ''))
      && (x.closest(H) || (norm(x.innerText || '').length > 3 && parseFloat(getComputedStyle(x).fontSize) >= kok * 0.95)));
    if (!ilk || !(ilk === e || e.contains(ilk))) return false;
    const st = getComputedStyle(e); return parseInt(st.fontWeight, 10) >= 600 || parseFloat(st.fontSize) >= kok * 1.05;
  };
  const satir = (a, b) => {   // a ile b aynı listenin kardeş satırlarında mı
    let x = a; const atalar = new Set(); while (x) { atalar.add(x); x = x.parentElement; }
    let y = b, oy = null; while (y && !atalar.has(y)) { oy = y; y = y.parentElement; }
    let z = a, oz = null; while (z && z !== y) { oz = z; z = z.parentElement; }
    // kardeş satır: aynı etiket + sınıf, ve satır yinelenen metinden fazlasını taşıyor (ör. "1. bölüm" + "Önceki bölüm bitince açılır");
    // art arda iki özdeş <p> ya da yalnız başlığı taşıyan iki sarmalayıcı satır sayılmaz
    if (!(oy && oz && oy !== oz && oy.tagName === oz.tagName && oy.className === oz.className)) return false;
    // PM 7048319359 D1: yinelenen metin kartın BAŞLIĞIYSA muafiyet yok (aynı başlıklı iki kart ayırt edilemez)
    if (baslik(a, oz) || baslik(b, oy)) return false;
    const t = norm(a.innerText || '');
    return norm(oy.innerText || '') !== t && norm(oz.innerText || '') !== t;
  };
  for (const [t, es] of tasiyan) {
    if (es.length < 2) continue;
    let ayri = false;
    for (let i = 0; i < es.length && !ayri; i++) for (let j = i + 1; j < es.length; j++) if (!satir(es[i], es[j])) { ayri = true; break; }
    if (ayri) ihlal.push(['B3', `aynı metin ${es.length} kez: "${(es[0].innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60)}"`]);
  }

  // satır sayısı: metin kutularının farklı satır ortaları
  const satirlar = (rects) => { const m = []; for (const r of rects) { if (r.width < 0.5 || r.height < 0.5) continue; const c = (r.top + r.bottom) / 2; if (!m.some((x) => Math.abs(x - c) < r.height / 2)) m.push(c); } return m.length; };
  const kutular = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()]; };

  // B4 açıklama ≤ 2 satır (yalnız ana ekranlar)
  if (ana) for (const p of document.querySelectorAll('main p.muted, main p.small, main [data-aciklama]')) {
    if (!gorunur(p)) continue; const n = satirlar(kutular(p));
    if (n > 2) ihlal.push(['B4', `açıklama ${n} satır: "${(p.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 50)}"`]);
  }

  // B5 "·" satır başında/sonunda yalnız
  const blok = (n) => { let e = n.parentElement; while (e && e.parentElement && /^(inline|contents)/.test(getComputedStyle(e).display)) e = e.parentElement; return e; };
  const gorulen = new Set();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const n = w.currentNode; if (!n.textContent.includes('·') || !gorunur(n.parentElement)) continue;
    let b = blok(n);
    // yalnız "·" taşıyan kendi blok/flex öğesi: karakter dizisi bir üst blokta kurulur
    while (b && b.parentElement && b !== document.body && !/[^\s·]/.test(b.innerText || '')) b = blok(b);
    if (!b || gorulen.has(b)) continue; gorulen.add(b);
    const harf = [];   // [düğüm, sıra] görünür, boşluk olmayan karakterler
    const w2 = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
    while (w2.nextNode()) { const m = w2.currentNode; if (!gorunur(m.parentElement)) continue; for (let i = 0; i < m.textContent.length; i++) if (!/\s/.test(m.textContent[i])) harf.push([m, i]); }
    const kutu1 = ([m, i]) => { const rg = document.createRange(); rg.setStart(m, i); rg.setEnd(m, i + 1); return rg.getClientRects()[0] || null; };
    const ayniSatir = (r, s) => r && s && Math.abs((r.top + r.bottom) / 2 - (s.top + s.bottom) / 2) < Math.max(r.height, s.height) / 2;
    for (let k = 0; k < harf.length; k++) {
      const [m, i] = harf[k]; if (m.textContent[i] !== '·') continue;
      const r = kutu1(harf[k]); if (!r) continue;
      const once = k > 0 ? kutu1(harf[k - 1]) : null, sonra = k < harf.length - 1 ? kutu1(harf[k + 1]) : null;
      const ozet = (b.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 50);
      if (!ayniSatir(r, once)) ihlal.push(['B5', `"·" satır başında: "${ozet}"`]);
      else if (!ayniSatir(r, sonra)) ihlal.push(['B5', `"·" satır sonunda: "${ozet}"`]);
    }
  }

  // B7 başlık sözcüğü bölünmez
  const b7 = new Set();
  for (const h of document.querySelectorAll('h1, h2, h3, .de, .de-lg, [lang=de]')) {
    // h1–h3 her boyutta; .de/.de-lg/[lang=de] yalnız başlık boyunda: kök yazının ≥ 1,15 katı (PM 7049695521 C; 17 px gövde başlık değil)
    if (!gorunur(h) || (!/^H[1-3]$/.test(h.tagName) && parseFloat(getComputedStyle(h).fontSize) < 1.15 * parseFloat(getComputedStyle(document.documentElement).fontSize))) continue;
    const w3 = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    while (w3.nextNode()) {
      // sözcük: harf/rakam/yumuşak tire; kısa çizgi (Schleswig-Holstein) sözcük sınırıdır, orada kırılma serbest
      const m = w3.currentNode; const re = /[\p{L}\p{N}\u00AD]{4,}/gu; let x;
      while ((x = re.exec(m.textContent))) {
        const rg = document.createRange(); rg.setStart(m, x.index); rg.setEnd(m, x.index + x[0].length);
        const sz = x[0].replace(/\u00AD/g, '');
        if (satirlar([...rg.getClientRects()]) > 1 && !b7.has(sz)) { b7.add(sz); ihlal.push(['B7', `başlık sözcüğü bölünmüş: "${sz}"`]); }
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
  ("B1", False, sayfa("<main><div style='height:30px;overflow:hidden'><button class='btn primary'>Devam</button></div></main>"), True),
  ("B1", False, sayfa("<main style='padding-bottom:200px'><button class='btn primary' style='border-radius:24px'>Devam</button><nav style='position:fixed;bottom:0;left:0;right:0;height:60px;background:#eee'><a href='#'>Bugün</a></nav></main>"), False),
  ("B2", False, sayfa("<main><button class=btn style='position:absolute;top:10px'>A</button><button class=btn style='position:absolute;top:30px'>B</button></main>"), True),
  ("B2", False, sayfa("<main><button class=btn>A</button><button class=btn style='margin-top:12px'>B</button></main>"), False),
  ("B2", False, sayfa("<main><button class=btn style='margin-top:30px'>Son</button><nav style='position:fixed;top:20px;left:0;right:0;height:60px'><a href='#' style='display:block;height:60px'>Sekme</a></nav></main>"), True),
  ("B2", False, sayfa("<main style='padding:0'><div style='height:1500px'></div><button class=btn>Son</button><nav style='position:fixed;bottom:0;left:0;right:0;height:60px'><a href='#' style='display:block;height:60px'>Sekme</a></nav></main>"), True),
  ("B2", False, sayfa("<main><div style='height:2000px'></div><button class=btn>Liste</button><div style='height:400px'></div><nav style='position:fixed;bottom:0;left:0;right:0;height:60px'><a href='#' style='display:block;height:60px'>Sekme</a></nav></main>"), False),
  ("B3", False, sayfa("<main><h2>Bugün üç kelime var</h2><section><p>Bugün üç kelime var</p></section></main>"), True),
  ("B3", False, sayfa("<main><ul><li><b>1. bölüm</b><span class=k>Önceki bölüm bitince açılır</span></li><li><b>2. bölüm</b><span class=k>Önceki bölüm bitince açılır</span></li></ul></main>"), False),
  ("B3", False, sayfa("<main><p>Bugün üç kelime var</p><p>Bugün üç kelime var</p></main>"), True),
  ("B3", False, sayfa("<main><section class=card><h3>Doktordan randevu almak</h3><p>Telefonla</p></section><section class=card><h3>Doktordan randevu almak</h3><p>Yüz yüze</p></section></main>"), True),
  ("B3", False, sayfa("<main><a class=tile href='#'><span class=num style='font-size:12px'>1</span><b>Doktordan randevu almak</b></a><a class=tile href='#'><span class=num style='font-size:12px'>2</span><b>Doktordan randevu almak</b></a></main>"), True),
  ("B3", False, sayfa("<main><ul><li><p><b>Not:</b> önceki bölüm bitince açılır</p><span>1. bölüm</span></li><li><p><b>Not:</b> önceki bölüm bitince açılır</p><span>2. bölüm</span></li></ul></main>"), False),
  ("B3", False, sayfa("<main><section class=card><h3>Telefonla</h3><p>Önceki bölüm bitince açılır</p></section><section class=card><h3>Yüz yüze</h3><p>Önceki bölüm bitince açılır</p></section></main>"), False),
  ("B3", False, sayfa("<main><div><b>Doktordan telefonla randevu</b></div><div><h1>Doktordan telefonla randevu</h1></div></main>"), True),
  ("B4", True, sayfa("<main><p class=muted style='width:120px'>Bu açıklama çok uzun olduğu için dar bir kutuda üç satırdan fazla yer kaplar ve kırmızı verir.</p></main>"), True),
  ("B4", True, sayfa("<main><p class=muted>Kısa açıklama.</p></main>"), False),
  ("B5", False, sayfa("<main><p>aaaa<br>· bbbb</p></main>"), True),
  ("B5", False, sayfa("<main><p>aaaa ·<br>bbbb</p></main>"), True),
  ("B5", False, sayfa("<main><p>aaa · bbb · ccc</p></main>"), False),
  ("B5", False, sayfa("<main><div style='display:flex;gap:6px'><span>aaa</span><span>·</span><span>bbb</span></div></main>"), False),
  # B5 düzeltmesi (core/ayrac.ts): dar kutuda düz boşluklu ayraç satır başına düşer; bölünmez boşluklu ayraç (ayrac()) düşmez
  ("B5", False, sayfa("<main><p style='font:16px monospace;width:8ch'>cc aaaa · bbbb</p></main>"), True),
  ("B5", False, sayfa("<main><p style='font:16px monospace;width:8ch'>cc aaaa\u00A0·\u00A0bb</p></main>"), False),
  ("B5", False, sayfa("<main><button style='display:flex;font:16px monospace;width:12ch;padding:0;border:0'><span>aaaa bbbb\u00A0·\u00A0<b>cccc</b> dd</span></button></main>"), False),
  ("B6", False, sayfa("<main><div style='width:2000px;height:10px'></div></main>"), True),
  ("B6", False, sayfa("<main><div style='width:100px;height:10px'></div></main>"), False),
  ("B6", False, sayfa("<main style='overflow-x:clip'><div style='width:2000px;height:10px;background:#ccc'></div></main>"), True),
  ("B6", False, sayfa("<main><div style='overflow-x:auto'><div style='width:2000px;height:10px'></div></div></main>"), False),
  ("B7", False, sayfa("<main><h1 lang=de style='width:120px;font-size:28px;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:anywhere'>Krankenversicherungskarte</h1></main>"), True),
  ("B7", False, sayfa("<main><h1 lang=de style='font-size:28px'>Die Karte</h1></main>"), False),
  ("B7", False, sayfa("<main><h1 lang=de style='width:150px;font-size:24px'>Schleswig-Holstein</h1></main>"), False),
  ("B7", False, sayfa("<main><div class=de lang=de style='width:120px;font-size:17px'>Können Sie das bitte einfacher sagen?</div></main>"), False),
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
                pg.goto(base + scr); gezgin.settle(pg, scr)
                # içerik durulana kadar (metin iki ölçümde aynı; en çok 3 sn): sabit beklemenin yarattığı oynamayı keser
                onceki = None
                for _ in range(20):
                    pg.wait_for_timeout(150); simdi = pg.evaluate("(document.querySelector('main, .callscreen') || document.body).innerText")
                    if simdi == onceki: break
                    onceki = simdi
                # giriş animasyonları (fadein/pop) bitmeden ölçülürse opaklığı 0 olan açıklamalar atlanır (inceleme #185 P1-1)
                # yalnız sonlu animasyonlar beklenir (iskelet parıltısı gibi sonsuz döngüler hiç bitmez); en çok 2 sn
                pg.evaluate("""() => Promise.race([new Promise((ok) => setTimeout(ok, 2000)),
                  Promise.all(document.getAnimations().filter((a) => (a.effect?.getTiming?.().iterations ?? 1) !== Infinity).map((a) => a.finished.catch(() => null)))])""")
                if len((onceki or "").strip()) <= 20: check(False, f"{scr}: ekran boş açıldı"); continue
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
