import json,re,sys
k=json.load(open('/tmp/claude-0/-home-claude-deutsch-werkstatt/c32ea372-27f1-575c-a158-6ad066f8dca6/scratchpad/a1-kesin2.json'))
known=set()
for d,l in k['ogretilmis_sayilan']['gunler'].items(): known|={x.split(':')[1].split('#')[0].lower() for x in l}
for g in k['gunler']:
  if g['day']<15: known|={x.split(':')[1].split('#')[0].lower() for x in g['kartlar']+g.get('cerceve',[])}
n=0; sus=0
for line in sys.stdin:
  m=re.search(r'bilinmeyen \(([^)]*)\)',line)
  if m and all(w.strip().lstrip('~?') in known for w in m.group(1).split(',')): sus+=1; continue
  if 'kapıdan geçen' in line: sus+=1; continue
  print(line.rstrip()[:260]); n+=1
print(f"-> kalan HATA {n} (süzülen {sus}; 'kapıdan geçen' satırları da süzüldü, onları dikiş/kontrol.ts sayar)")
