import json,sys
root=sys.argv[1]; ilk,son=int(sys.argv[2]),int(sys.argv[3])
k=json.load(open(f'{root}/content/v2/curriculum/a1-kesin.json')); o=json.load(open(f'{root}/content/v2/curriculum/omurga.json'))
om={g['day']:g for g in o['gunler']}
for g in k['gunler']:
    n=g['day']
    if ilk<=n<=son:
        d={"schema":1,"id":f"m1:gun:{n:02d}","day":n,"level":"A1","format":"gun","title_tr":"saplama","goal_tr":"saplama","can_do":{"id":f"cd:m1:{n:02d}","tr":"saplama"},"unit":"u","arm":"x","requires":{},"review":{"status":"draft"},"dersler":om[n].get('dersler',[]),"yeni_kartlar":g['kartlar']}
        json.dump(d,open(f'{root}/content/v2/m1/gun-{n:02d}.json','w'),ensure_ascii=False)
