#!/usr/bin/env python3
"""Halka önerisini PM-078 C kapısıyla denetler (rapor aracı). Kullanım: python3 halka_kontrol.py KÖK oneri.json
Öneri biçimi AKIS AK-5 `halkalar` dizisi + her halkada "dersten_sonra": true/false (dil noktası bu halkadan önce mi).
Bilinen küme: önceki günlerin kartları ve dersleri + önceki halkalar + bu halkanın kartları (+ dersten sonraysa günün dersi).
Görev cümlesi: bilinmeyen 0. Sahne satırı: en çok 1. Her kart: en az 2 görev cümlesi (kartın örnek/boşluk cümleleri + öneri)."""
import runpy, io, contextlib, sys, json, glob
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
bugun_b, bugun_k = set(), set()
for did in gunler[gun]['dersler']:
    b, k = M['ders_bicim'](M['dersler'][did]); bugun_b |= b; bugun_k |= k
hata = 0; uyari = 0; gorulen = set()
tum = [c for h in o['halkalar'] for c in h['kartlar']]
if sorted(tum) != sorted(gunler[gun]['yeni_kartlar']): print('HATA: halka kartları yeni_kartlar ile aynı değil'); hata += 1
for h in o['halkalar']:
    sonra = h.get('dersten_sonra', True)
    bk = onceki_kart | gorulen | set(h['kartlar']) | (bugun_k if sonra else set())
    bb = onceki_bicim | (bugun_b if sonra else set())
    bt = onceki_ders | (set(gunler[gun]['dersler']) if sonra else set())
    if not 5 <= len(h['kartlar']) <= 6: print(f"HATA {h['id']}: {len(h['kartlar'])} kart"); hata += 1
    for c in h['kartlar']:
        C = M['cards'][c]; n = 0; liste = []
        for e in C['examples']:
            u, _ = M['bilinmeyen'](e['de'], bk, bb, biten=bt)
            if not u: n += 1; liste.append(e['de'])
        for f in C['forms']:
            u, _ = M['bilinmeyen'](f['de'].replace('___', ' '), bk, bb, haric=set(M['toks'](f['answer'].replace('…', ' '))), biten=bt)
            if not u: n += 1; liste.append(f['de'])
        for g in h.get('gorev_cumleleri', []):
            if g['kart'] != c: continue
            u, _ = M['bilinmeyen'](g['de'], bk, bb, biten=bt)
            if u: print(f"HATA {h['id']} {c} görev cümlesi bilinmeyen {u}: {g['de']}"); hata += 1
            elif set(M['toks'](g['de'])) & (M['yuzey'](C) - set(M['toks'](C.get('art', '')))): n += 1; liste.append(g['de'])
            else: print(f"HATA {h['id']} {c}: cümlede kartın kelimesi yok: {g['de']}"); hata += 1
        durum = 'tamam' if n >= 2 else 'EKSİK'
        if n < 2: hata += 1
        print(f"{h['id']} {c}: {n} görev cümlesi [{durum}] {liste}")
    for s in h.get('sahne', {}).get('satirlar', []):
        u, _ = M['bilinmeyen'](s['de'], bk, bb, biten=bt)
        if len(u) > 1: print(f"HATA {h['id']} sahne ≥2 bilinmeyen {u}: {s['de']}"); hata += 1
        elif u: print(f"not {h['id']} sahne 1 bilinmeyen (işaretli olmalı) {u}: {s['de']}"); uyari += 1
    gorulen |= set(h['kartlar'])
print(f"→ {hata} hata, {uyari} not")
