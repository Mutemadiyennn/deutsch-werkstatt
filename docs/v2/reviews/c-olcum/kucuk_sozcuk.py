#!/usr/bin/env python3
"""Halka önerisinde çerçeve (card:false) sözcüklerinin halka başına geçiş sayısı (PM #165): bir halkada 2 ve daha çok
geçen çerçeve sözcüğü o halkanın (ya da önceki bir halkanın) kalıbı olmalı. Kullanım: python3 kucuk_sozcuk.py KÖK oneri.json"""
import runpy, io, contextlib, sys, json, collections
if len(sys.argv) < 3: sys.exit(__doc__)
K, P = sys.argv[1], sys.argv[2]
sys.argv = ['x', K]
with contextlib.redirect_stdout(io.StringIO()): M = runpy.run_path(f'{K}/docs/v2/reviews/c-olcum/olcum.py')
o = json.load(open(P, encoding='utf8'))
ogretilen = set(); hata = 0
import os
for d in range(1, o['gun']):
    pf = os.path.join(os.path.dirname(os.path.abspath(P)), f'gun-{d:02d}-halkalar.json')
    if os.path.exists(pf):
        for hh in json.load(open(pf, encoding='utf8'))['halkalar']:
            for k in hh.get('kaliplar', []): ogretilen |= set(M['toks'](k['de'].replace('…', ' ')))
for h in o['halkalar']:
    for k in h.get('kaliplar', []): ogretilen |= set(M['toks'](k['de'].replace('…', ' ')))
    say = collections.Counter()
    metin = [g['de'] for g in h.get('gorev_cumleleri', [])] + [s['de'] for s in h.get('sahne', {}).get('satirlar', [])]
    for m in metin:
        tt = M['toks'](m)
        for j, t in enumerate(tt):
            # kartın tanıtımda gösterilen artikeli (die Praxis) kartın parçasıdır
            if j + 1 < len(tt) and any(M['cards'][i].get('art') == t for i in M['idx'].get(tt[j + 1], ()) if i in M['cards']): continue
            a = M['idx'].get(t, set())
            if a & M['cerceve'] and not M['_baslik_kart'](t): say[t] += 1
    cer = dict(say)
    kotu = {t: n for t, n in cer.items() if n >= 2 and t not in ogretilen}
    print(h['id'], 'kalıp', len(h.get('kaliplar', [])), '| çerçeve:', dict(sorted(cer.items(), key=lambda x: -x[1])), '| kalıpsız ≥2:', kotu)
    if len(h.get('kaliplar', [])) > 2: print('  HATA kalıp sayısı > 2'); hata += 1
    hata += len(kotu)
print(f'→ {hata} hata')
