import json,sys
name=sys.argv[1]
ids=[json.loads(l)['id'] for l in open(f'/home/claude/cm/work/batch-{name}.view.jsonl',encoding='utf8')]
V={}
for n in ['004','005','006','007','008']:
    for l in open(f'/home/claude/cm/work/batch-{n}.view.jsonl',encoding='utf8'): V[json.loads(l)['id']]=l
open(f'/home/claude/cm/work/batch-{name}.view.jsonl','w',encoding='utf8').writelines(V[i] for i in ids); print(name,len(ids))
