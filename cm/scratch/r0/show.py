import json,glob,sys
F={f.split('/')[-1][3:5]:f for f in sorted(glob.glob('/home/claude/wt-r0/content/v2/temel/r0-*.json'))}
def L(n): return json.load(open(F[n],encoding='utf8'))
ids=sys.argv[1:]
for i in ids:
    n=i.split(':')[1]; d=L(n)
    for x in d['teach']+d['drills']+d['placement']:
        if x['id']==i: print(json.dumps(x,ensure_ascii=False)); break
    else: print('YOK',i)
