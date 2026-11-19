import json,glob,sys
R='/home/claude/wt-r0/content/v2/temel/'
sel=sys.argv[1:]
for f in sorted(glob.glob(R+'r0-*.json')):
    n=f.split('/r0-')[1][:2]
    if sel and n not in sel: continue
    d=json.load(open(f,encoding='utf8'))
    print('=====',d['id'],'|',d['title_tr'],'| chars',d['characters'],'| place',d['place'],'| keys',[k for k in d.keys()])
    print('requires',json.dumps(d['requires'],ensure_ascii=False))
    for t in d['teach']:
        e=t.get('exp',{})
        extra={k:v for k,v in t.items() if k not in('id','de','tr','exp','lexeme')}
        print('T',t['id'],'|',t['de'],'|',t['tr'],'|| anlam:',e.get('anlam_tr'),'| nz:',e.get('ne_zaman_tr'),'| ip:',e.get('ipucu_tr'),'| P:',' + '.join(f"{p['de']}→{p['tr']}" for p in e.get('parcalar',[])), extra if extra else '')
    t=d.get('table')
    if t:
        print('TABLE',t['baslik_tr'],t['sutunlar'],[k for k in t.keys()])
        for r in t['satirlar']: print('   ',r)
    for sec in ('drills','placement'):
        for x in d[sec]:
            y={k:v for k,v in x.items() if k not in('id','k')}
            print('D',x['id'],x['k'],json.dumps(y,ensure_ascii=False))
    dl=d.get('dialogue')
    if dl:
        print('DIALOG',{k:v for k,v in dl.items() if k!='lines'})
        for l in dl['lines']: print('   ',json.dumps(l,ensure_ascii=False))
    for h in d.get('listening',[]):
        print('H',{k:v for k,v in h.items() if k not in('script','qs')})
        for l in h['script']: print('   ',json.dumps(l,ensure_ascii=False))
        for q in h['qs']: print('   Q',json.dumps(q,ensure_ascii=False))
    print('MISSION',json.dumps(d.get('mission'),ensure_ascii=False))
    for k in d:
        if k not in ('schema','id','order','level','format','title_tr','title_de','goal_tr','can_do','unit','arm','place','characters','requires','review','teach','table','drills','dialogue','listening','placement','mission'): print('OTHER',k,json.dumps(d[k],ensure_ascii=False)[:300])
