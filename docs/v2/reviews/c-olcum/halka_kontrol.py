#!/usr/bin/env python3
"""Halka önerisini PM-078 C kapısıyla denetler (rapor aracı). Kullanım: python3 halka_kontrol.py KÖK oneri.json
Öneri biçimi AKIS AK-5 `halkalar` dizisi; her halkada isteğe bağlı `kaliplar: [{"de": "Heute ist …", "tr": …}]`.
Bilinen küme (PM #163): önceki günlerin kartları ve dersleri + önceki halkaların ve bu halkanın kartları + bu ve önceki
halkaların öğrettiği kalıplar ("…" ve bilinen kartların sözcükleri yuvadır; kalan dizi yalnızca bütün olarak bilinir, tek sözcüklü dizi o sözcüğü öğretir).
Günün dersi varsayılmaz: dersin kelime tanıtımları halkanın içine taşınıyor (#160).
Görev cümlesi: bilinmeyen 0. Sahne satırı: en çok 1. Her kart: en az 2 görev cümlesi (kartın örnek/boşluk cümleleri + öneri)."""
import runpy, io, contextlib, sys, json, glob
if len(sys.argv) < 3: sys.exit(__doc__)
K, P = sys.argv[1], sys.argv[2]
sys.argv = ['x', K]
with contextlib.redirect_stdout(io.StringIO()): M = runpy.run_path(f'{K}/docs/v2/reviews/c-olcum/olcum.py')
o = json.load(open(P, encoding='utf8'))
gun = o['gun']; gunler = {g['day']: g for g in M['gunler']}
onceki_kart, onceki_bicim, onceki_ders = set(), set(), set()
for d in range(1, gun):
    onceki_kart |= set(gunler[d]['yeni_kartlar'])
    for did in gunler[d]['dersler']:
        b, k = M['ders_bicim'](M['dersler'][did]); onceki_bicim |= b; onceki_kart |= k; onceki_ders.add(did)
hata = 0; uyari = 0; gorulen = set(); kalip_tek, kalip_cok = set(), []
def kalip_parca(de, bk):
    """Dersteki gibi: "…" ve bilinen kartların sözcükleri yuvadır, kalan bitişik dizi kalıptır ("Heute ist …" → ("ist",))"""
    yuva = {x for i in bk for x in M['gost'][i]}
    out, run = [], []
    for x in M['toks'](de.replace('…', ' QQSLOT ')) + ['qqslot']:
        if x == 'qqslot' or x in yuva:
            if run: out.append(tuple(run)); run = []
        else: run.append(x)
    return out
tum = [c for h in o['halkalar'] for c in h['kartlar']]
if sorted(tum) != sorted(gunler[gun]['yeni_kartlar']): print('HATA: halka kartları yeni_kartlar ile aynı değil'); hata += 1
for h in o['halkalar']:
    bk = onceki_kart | gorulen | set(h['kartlar'])
    for k in h.get('kaliplar', []):
        for p in kalip_parca(k['de'], bk):
            (kalip_tek.add(p[0]) if len(p) == 1 else kalip_cok.append(p))
    bb = onceki_bicim | kalip_tek
    bt = onceki_ders
    if not 4 <= len(h['kartlar']) <= 6: print(f"HATA {h['id']}: {len(h['kartlar'])} kart"); hata += 1
    for c in h['kartlar']:
        C = M['cards'][c]; n = 0; liste = []
        for e in C['examples']:
            u, _ = M['bilinmeyen'](e['de'], bk, bb, biten=bt, kaliplar=kalip_cok)
            if not u: n += 1; liste.append(e['de'])
        for f in C['forms']:
            u, _ = M['bilinmeyen'](f['de'].replace('___', ' '), bk, bb, haric=set(M['toks'](f['answer'].replace('…', ' '))), biten=bt, kaliplar=kalip_cok)
            if not u: n += 1; liste.append(f['de'])
        for g in h.get('gorev_cumleleri', []):
            if g['kart'] != c: continue
            u, _ = M['bilinmeyen'](g['de'], bk, bb, biten=bt, kaliplar=kalip_cok)
            if 'accepted' in g:
                if len(g['accepted']) < 3 or g['accepted'][0] != g['de']: print(f"HATA {h['id']} {c} accepted ≥3 ve ilki de olmalı: {g['de']}"); hata += 1
                for a in g['accepted'][1:]:
                    ua, _ = M['bilinmeyen'](a, bk, bb, biten=bt, kaliplar=kalip_cok)
                    if ua: print(f"HATA {h['id']} {c} kabul satırında bilinmeyen {ua}: {a}"); hata += 1
            if u: print(f"HATA {h['id']} {c} görev cümlesi bilinmeyen {u}: {g['de']}"); hata += 1
            elif set(M['toks'](g['de'])) & (M['yuzey'](C) - set(M['toks'](C.get('art', '')))): n += 1; liste.append(g['de'])
            else: print(f"HATA {h['id']} {c}: cümlede kartın kelimesi yok: {g['de']}"); hata += 1
        durum = 'tamam' if n >= 2 else 'EKSİK'
        if n < 2: hata += 1
        print(f"{h['id']} {c}: {n} görev cümlesi [{durum}] {liste}")
    for s in h.get('sahne', {}).get('satirlar', []):
        u, _ = M['bilinmeyen'](s['de'], bk, bb, biten=bt, kaliplar=kalip_cok)
        if len(u) > 1: print(f"HATA {h['id']} sahne ≥2 bilinmeyen {u}: {s['de']}"); hata += 1
        elif u: print(f"not {h['id']} sahne 1 bilinmeyen (işaretli olmalı) {u}: {s['de']}"); uyari += 1
    gorulen |= set(h['kartlar'])
print(f"→ {hata} hata, {uyari} not")
