# İÇ-K3: a2-kesin.json bekleyen yuva doldurma (kural 7) — betikle, elle değil.
# kullanım: python3 doldur.py <a2-kesin.json> <batch> <gün>=<id,id,...> [<gün>=...]
#   her kimlik o günün kartlar listesinin sonuna eklenir; gün bekleyen −1, kart +1;
#   hafta kartlar +id, k1_disi_kesin +1, k1_disi_bekleyen −1, kesin +1; denetim ve lex_doldurma güncellenir.
import json, sys
yol, batch = sys.argv[1], sys.argv[2]
d = json.load(open(yol))
gun = {g['day']: g for g in d['gunler']}
hafta = {h['no']: h for h in d['haftalar']}
tum = {x for g in d['gunler'] for x in g['kartlar']} | {x for h in d['haftalar'] for x in h['kartlar']}
kayit = {}
for arg in sys.argv[3:]:
    g, ids = arg.split('=')
    g = int(g); ids = [i if i.startswith('lx:') else 'lx:' + i for i in ids.split(',') if i]
    G = gun[g]; H = hafta[G['hafta']]
    for i in ids:
        assert i not in tum, f'çift atama: {i}'
        assert G['bekleyen'] > 0 and H['k1_disi_bekleyen'] > 0, f'{g}. günde bekleyen yuva yok ({i})'
        G['kartlar'].append(i); G['bekleyen'] -= 1; G['kart'] += 1
        H['kartlar'].append(i); H['k1_disi_kesin'] += 1; H['k1_disi_bekleyen'] -= 1; H['kesin'] += 1
        tum.add(i)
    kayit.setdefault(str(g), []).extend(ids)
kalan = sum(g['bekleyen'] for g in d['gunler'])
n = sum(len(v) for v in kayit.values())
d['denetim']['lex_doldurulan'] += n
d['denetim']['kalan_bekleyen'] = kalan
d['lex_doldurma']['kalan_bekleyen'] = kalan
d['lex_doldurma']['partiler'].append({'batch': batch, 'gunler': kayit})
for h in d['haftalar']:
    assert h['kesin'] + h['k1_disi_bekleyen'] == h['kesin_arti_bekleyen'], h['no']
    assert sum(gun[x]['kart'] + gun[x]['bekleyen'] for x in range(h['gunler'][0], h['gunler'][1] + 1)) >= 0
open(yol, 'w').write(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
print(f'{batch}: {n} yuva doldu, kalan bekleyen {kalan}')
