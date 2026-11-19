import { readFileSync, readdirSync } from "node:fs";
import { judge } from "/home/claude/wt-r0/web/src/core/grading.ts";
import { expandAccepted } from "/home/claude/wt-r0/web/src/core/persona.ts";
const D="/home/claude/wt-r0/content/v2/temel"; const m=new Map<string,any>();
for(const f of readdirSync(D).filter(f=>f.endsWith(".json"))){const d=JSON.parse(readFileSync(`${D}/${f}`,"utf8"));for(const x of [...d.drills,...d.placement])m.set(x.id,x);}
const NEG:[string,string][]=[["r0:05:d30","Um zwanzig Uhr."],["r0:05:d20","9:30"],["r0:05:d20","Es ist halb acht."],["r0:05:d21","3:30"],["r0:05:d21","Es ist drei Uhr dreißig."],["r0:05:d38","Also elf Uhr dreißig?"],["r0:05:d38","11:30"],["r0:05:d44","12:45 Uhr"],
["r0:10:d22","K wie Kiel"],["r0:10:d22","G wie Gustav"],["r0:10:d23","Z wie Zacharias"],["r0:10:p04","N wie Nordpol"],["r0:10:d20","0171 39200 48"],["r0:10:d20","01713920074"],["r0:10:d20","Null eins sieben eins, drei neun zwei null null, vierundsiebzig."],
["r0:03:d22","0172"],["r0:03:d23","098"],["r0:03:p02","061"],["r0:04:d23","200 Euro"],["r0:04:d23","Das kostet 10 Euro."],
["r0:09:d18","Ich kann am Dienstag kommen."],["r0:09:d18","Dienstag kann ich kommen."],["r0:09:d34","Ich komme am Mittwoch."],["r0:09:d29","Ich möchte einen Termin absagen."],["r0:08:d13","Morgen ich bin nicht da"],["r0:08:d14","Am Dienstag ich habe Zeit"],["r0:08:d18","Ich bin am Dienstag einen Termin."],["r0:08:d33","Am Donnerstag um drei."],["r0:06:d13","Am zehn um Dienstag"],["r0:06:d19","Dienstag, der 2. Dezember."],["r0:06:d24","Siebter Neunter neunzig"],["r0:01:d20","Geht am Samstag?"],["r0:07:d27","Ich kann das wiederholen."]];
let bad=0;for(const [id,a] of NEG){const r=judge(expandAccepted(m.get(id).accepted,{}),[a]).ok;if(r){bad++;console.log("YANLIŞ KABUL",id,a);}}console.log("negatif deneme",NEG.length,"yanlış kabul",bad);
// üretilen saat ve numara örnekleri
for(const id of ["r0:05:d41","r0:05:d42","r0:05:d30","r0:05:d38","r0:08:d33","r0:06:d14","r0:03:d31"])console.log(id,JSON.stringify(m.get(id).accepted));
