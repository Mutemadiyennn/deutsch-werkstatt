// OD-9 sözlük denetimi (doğrulayıcı henüz kartlara bakmıyor): npx tsx check.ts 001 [002 ...]
import {readFileSync} from 'node:fs';
import {textIssues,explanationIssues,Explanation} from '/home/claude/deutsch-werkstatt/packages/shared/src/explain.ts';
const FN=new Set(['det','pron','conj','prep','particle','num']);
let bad=0,n=0;
for(const a of process.argv.slice(2)){
 const b=JSON.parse(readFileSync(`/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-${a}.json`,'utf8'));
 for(const i of b.items){n++;const o:string[]=[];
  for(const x of textIssues(i.tr))o.push('tr: '+x);
  if(!i.exp)o.push('exp yok');else{const r=Explanation.safeParse(i.exp);if(!r.success)o.push('exp şema');else for(const x of explanationIssues(r.data))o.push('exp.'+x)}
  if(!i.mistakes_tr?.length)o.push('mistakes_tr boş');
  (i.mistakes_tr||[]).forEach((m:string,k:number)=>{for(const x of textIssues(m))o.push(`mistakes[${k}]: ${x}`)});
  if((i.examples||[]).length<3)o.push('örnek<3');
  const pic=i.img||(i.examples||[]).some((e:any)=>e.img);
  if(!pic&&!FN.has(i.pos))o.push('görsel sorgusu yok');
  if(o.length){bad++;console.log(i.id,'→',o.join(' | '))}
 }}
console.log(`kart ${n}, sorunlu ${bad}`);process.exit(bad?1:0);
