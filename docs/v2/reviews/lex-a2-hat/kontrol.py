# İÇ-K3 A2 lex hattı denetim betiği.
# kullanım: python3 docs/v2/reviews/lex-a2-hat/kontrol.py Sözcük1 Sözcük2 ...   (aday denetimi)
#           python3 docs/v2/reviews/lex-a2-hat/kontrol.py --dosya batch-a2-07.json  (partinin bütün kimlikleri)
# Tarananlar: çalışma ağacındaki bütün lexicon partileri + lexemes.v1/v2 + a1/a2/b1-kesin tabloları
# + bütün origin/content/lex-* ve k1-sozluk-* dallarının lexicon partileri ve tabloları.
# Karşılaştırma iki düzeyde: kimlik (lx:…) ve sözcük (sich_, #n, parantez, artikel atılmış, küçük harf).
import json, glob, sys, subprocess, os, re
os.chdir(subprocess.check_output(['git', 'rev-parse', '--show-toplevel']).decode().strip())
def soz(i):
    i = i[3:] if i.startswith('lx:') else i
    i = re.sub(r'#\d+$', '', i); i = re.sub(r'\(.*?\)', '', i)
    i = re.sub(r'^(sich_|der_|die_|das_)', '', i)
    return i.strip('_ ').lower()
yer = {}  # kimlik -> kaynak
def ekle(i, kaynak):
    yer.setdefault(i, []).append(kaynak)
def walk(o, kaynak):
    if isinstance(o, str) and o.startswith('lx:'): ekle(o, kaynak)
    elif isinstance(o, dict): [walk(v, kaynak) for v in o.values()]
    elif isinstance(o, list): [walk(v, kaynak) for v in o]
for f in glob.glob('content/v2/registry/lexicon/batch-*.json'):
    for c in json.load(open(f))['items']: ekle(c['id'], 'ağaç:' + os.path.basename(f))
for f in ['content/v2/registry/lexemes.v1.json', 'content/v2/registry/lexemes.v2.json']:
    if os.path.exists(f):
        d = json.load(open(f)); d = d if isinstance(d, list) else d.get('items', d.get('lexemes', []))
        for c in d:
            if isinstance(c, dict) and 'id' in c: ekle(c['id'], 'v1/v2')
for t in ['a1-kesin', 'a2-kesin', 'b1-kesin']:
    walk(json.load(open(f'content/v2/curriculum/{t}.json')), 'tablo:' + t)
subprocess.run(['git', 'fetch', '-q', 'origin', '+refs/heads/content/*:refs/remotes/origin/content/*'], stderr=subprocess.DEVNULL)
for ref in subprocess.check_output(['git', 'branch', '-r']).decode().split():
    if not any(k in ref for k in ('/content/lex-', '/content/k1-sozluk')): continue
    ad = ref.split('/')[-1]
    for pth in subprocess.check_output(['git', 'ls-tree', '--name-only', ref, 'content/v2/registry/lexicon/']).decode().split():
        if pth.endswith('.json'):
            try:
                for c in json.loads(subprocess.check_output(['git', 'show', ref + ':' + pth], stderr=subprocess.DEVNULL))['items']:
                    ekle(c['id'], f'dal:{ad}:{os.path.basename(pth)}')
            except Exception: pass
    for t in ['a2-kesin', 'b1-kesin']:
        try: walk(json.loads(subprocess.check_output(['git', 'show', f'{ref}:content/v2/curriculum/{t}.json'], stderr=subprocess.DEVNULL)), f'dal:{ad}:{t}')
        except Exception: pass
sozluk = {}
for i, k in yer.items(): sozluk.setdefault(soz(i), set()).update(f'{i}@{x}' for x in k)
args = sys.argv[1:]
haric = None
if args and args[0] == '--dosya':
    f = args[1]; f = f if os.path.exists(f) else 'content/v2/registry/lexicon/' + f
    haric = 'ağaç:' + os.path.basename(f)
    args = [c['id'] for c in json.load(open(f))['items']]
cakisma = 0
for w in args:
    i = w if w.startswith('lx:') else 'lx:' + w
    # aynı kimliğin a2-kesin'deki ataması (doldurma kaydının kendisi) çakışma sayılmaz
    k = sorted(x for x in sozluk.get(soz(i), set()) if not (haric and x.endswith('@' + haric))
               and not (x.startswith(i + '@') and x.endswith('a2-kesin')))
    # kendi dalımızın (lex-a2-*) aynı dosyası tekrar sayılmaz
    if haric: k = [x for x in k if not x.endswith(':' + haric.split(':')[1])]
    print(f'{w}: ' + ('yeni' if not k else 'VAR → ' + '; '.join(k[:4])))
    cakisma += bool(k)
if haric: print(f'çakışan: {cakisma}/{len(args)}')
