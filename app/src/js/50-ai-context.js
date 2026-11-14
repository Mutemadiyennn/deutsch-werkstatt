/* ===== Yapay zekâya giden bağlam: kişisel ayrıntı yok, odak = kurstaki ünite ===== */
function artDedup(o){
  try{ if(o && typeof o.de === "string" && ["der","die","das"].includes(o.artikel) && new RegExp("^" + o.artikel + "\\s+", "i").test(o.de)) o.de = o.de.replace(/^(der|die|das)\s+/i, ""); }catch(e){}
  return o;
}
{
  const _pfK = profile;
  profile = function(){
    let s = _pfK.apply(this, arguments);
    s = s.replace(/^LERNER[^\n]*\n/, "LERNER: türkischer Muttersprachler (Englisch B2), lebt in Bayern, Deutsch real Niveau A1 auf dem Weg zu B1. Verwende KEINE persönlichen Details über ihn (Beruf, Sport, Familie, Name). Themen: Alltag in Bayern mit wechselnden Personen.\n");
    try{
      const m = KURS.idx && kuMeta(kSt().cur); const u = m && KURS.units[m.id];
      if(m){ const gram = u ? (u.teach||[]).map(t=>t.h_tr).join("; ") : ""; const ws = u ? (u.words||[]).map(w=>kuWFull(w)).join(", ") : "";
        s = s.replace(/HEUTIGES THEMA: [^\n]*/, `AKTUELLE KURSEINHEIT: ${m.lvl} „${m.title_de}“ (${m.title_tr}). Ziel: ${m.goal_tr}${gram ? "\nGRAMMATIK DIESER EINHEIT: " + gram : ""}${ws ? "\nWÖRTER DIESER EINHEIT: " + ws : ""}\nÜbungen, Geschichten und Gespräche sollen diese Einheit üben und nichts verwenden, was weit über ihr Niveau geht.`); }
    }catch(e){}
    return s;
  };
}
