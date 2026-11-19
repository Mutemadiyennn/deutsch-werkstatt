/**
 * M1 gün denetimi (#58 A4; PM-053 dikte merdiveni, PM-055 gerçek video). Saf fonksiyon: hata ve uyarı listesi döner.
 * Hata: içerik oynatıcıda kırılır ya da öğrenciye yanlış şey söyler. Uyarı: taslakta kabul, "reviewed" günde hata olur.
 */
import type { Bolum, Gun, MedyaCumle } from "../../packages/shared/src/m1.ts";
import { medyalar } from "../../packages/shared/src/m1.ts";

/** Karşılaştırma için: küçük harf, noktalama ve fazla boşluk yok (ümlaut korunur) */
export const sade = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–-]/g, " ").replace(/\s+/g, " ").trim();
const words = (s: string) => sade(s).split(" ").filter(Boolean);
const hasWord = (sentence: string, w: string) => ` ${sade(sentence)} `.includes(` ${sade(w)} `);

export function checkGun(g: Gun, ctx: { lexicon: Set<string>; temel: Set<string> }): { errors: string[]; warnings: string[] } {
  const errors: string[] = [], warnings: string[] = [];
  for (const d of g.dersler) if (!ctx.temel.has(d)) errors.push(`dersler: ${d} temel pakette yok`);
  const missing = g.yeni_kartlar.filter((id) => !ctx.lexicon.has(id));
  if (missing.length) warnings.push(`yeni_kartlar: sözlükte olmayan ${missing.length} kart (ilk: ${missing.slice(0, 5).join(", ")})`);
  if (g.yeni_kartlar.length && (g.yeni_kartlar.length < 15 || g.yeni_kartlar.length > 25)) warnings.push(`yeni_kartlar: ${g.yeni_kartlar.length} kart (hedef 15–25)`);
  if (!g.video) warnings.push("gerçek insan videosu yok (PM-055: her gün en az 1 klip; bulunamadıysa #58'de PM'e sorulur)");
  if (g.sesler.length < 2) warnings.push(`sesler: ${g.sesler.length} (en az 2: anons, sesli mesaj)`);

  for (const m of medyalar(g)) {
    const at = `${m.kind}:${m.id}`;
    const byId = new Map<string, MedyaCumle>();
    for (const c of m.cumleler) { if (byId.has(c.id)) errors.push(`${at}: tekrar eden cümle kimliği ${c.id}`); byId.set(c.id, c); }
    if (m.kind === "video") {
      const v = m.video!;
      if (v.kaynak.bit_sn <= v.kaynak.bas_sn) errors.push(`${at}: kaynak bitiş başlangıçtan önce`);
      const unaligned = m.cumleler.filter((c) => c.t0 === undefined || c.t1 === undefined);
      if (unaligned.length) warnings.push(`${at}: ${unaligned.length} cümle hizalanmamış (t0/t1 yok; A9 hattı yazar)`);
      for (const c of m.cumleler) if (c.t0 !== undefined && c.t1 !== undefined && c.t1 <= c.t0) errors.push(`${at}: ${c.id} t1 ≤ t0`);
      for (let i = 1; i < m.cumleler.length; i++) { const a = m.cumleler[i - 1]!, b = m.cumleler[i]!; if (a.t0 !== undefined && b.t0 !== undefined && b.t0 < a.t0) errors.push(`${at}: ${b.id} zaman sırası bozuk`); }
      if (!v.medya.length) warnings.push(`${at}: paketlenmiş medya yok (A9 hattı)`);
    }
    const inSome = new Set<string>();
    for (const b of m.bolumler) {
      const bat = `${at}/${b.id}`;
      const own = new Set(b.cumleler);
      for (const id of b.cumleler) { if (!byId.has(id)) errors.push(`${bat}: cümle ${id} yok`); inSome.add(id); }
      // PM-053: bölüm 1–2 dakika (hizalanmış videoda ölçülür)
      const first = byId.get(b.cumleler[0]!), last = byId.get(b.cumleler[b.cumleler.length - 1]!);
      if (m.kind === "video" && first?.t0 !== undefined && last?.t1 !== undefined && last.t1 - first.t0 > 150) warnings.push(`${bat}: bölüm ${Math.round(last.t1 - first.t0)} sn (en çok ~2 dk)`);
      checkBolum(b, byId, own, (e) => errors.push(`${bat}: ${e}`), (w) => warnings.push(`${bat}: ${w}`));
    }
    if (m.eylem) for (const k of m.eylem.kanit) if (typeof k === "string" && !byId.has(k)) errors.push(`${at}: eylem kanıtı ${k} yok`);
    if (m.eylem && m.eylem.ans >= m.eylem.opts.length) errors.push(`${at}: eylem cevabı seçeneklerin dışında`);
  }
  if (g.prova) {
    const ids = new Set(g.prova.dugumler.map((d) => d.id));
    if (!ids.has(g.prova.baslangic)) errors.push(`prova: başlangıç ${g.prova.baslangic} yok`);
    for (const d of g.prova.dugumler) for (const s of d.secenekler) if (!ids.has(s.sonraki)) errors.push(`prova/${d.id}: sonraki ${s.sonraki} yok`);
    if (!g.prova.dugumler.some((d) => d.son)) errors.push("prova: bitiş düğümü (son) yok");
    for (const d of g.prova.dugumler) if (!d.son && !d.secenekler.length) errors.push(`prova/${d.id}: seçenek yok ve bitiş değil`);
  }
  if (g.okuma_yazma) for (const q of g.okuma_yazma.sorular) if ("kind" in q && q.ans >= q.opts.length) errors.push(`okuma ${q.id ?? q.q_tr}: cevap seçeneklerin dışında`);
  return { errors, warnings };
}

function checkBolum(b: Bolum, byId: Map<string, MedyaCumle>, own: Set<string>, err: (s: string) => void, warn: (s: string) => void) {
  for (const q of [b.ana_fikir, ...b.ayrinti]) {
    if (q.ans >= q.opts.length) err(`soru "${q.q_tr}": cevap seçeneklerin dışında`);
    for (const k of q.kanit) if (typeof k === "string" && !byId.has(k)) err(`soru "${q.q_tr}": kanıt ${k} yok`);
  }
  if (b.ana_fikir.kind !== "gist") warn("ana_fikir sorusu 'gist' olmalı");
  for (const id of b.golge) if (!own.has(id)) err(`gölge cümlesi ${id} bu bölümde değil`);
  const n = b.dikte.length;
  if (n && (n < 3 || n > 6)) warn(`dikte ${n} madde (PM-053: 3–6)`);
  const order = ["kolay", "orta", "zor", "usta", "gercek"];
  for (let i = 1; i < n; i++) if (order.indexOf(b.dikte[i]!.seviye) < order.indexOf(b.dikte[i - 1]!.seviye)) err(`dikte ${b.dikte[i]!.id}: merdiven sırası bozuk (kolay → gerçek)`);
  for (const d of b.dikte) {
    const at = `dikte ${d.id}`;
    if (d.seviye === "gercek") { if (!d.zorunlu.length) warn(`${at}: zorunlu kelime yok`); continue; }
    const c = byId.get(d.cumle);
    if (!c) { err(`${at}: cümle ${d.cumle} yok`); continue; }
    if (!own.has(d.cumle)) err(`${at}: cümle ${d.cumle} bu bölümde değil`);
    if (d.seviye === "kolay") {
      if (d.ans >= d.opts.length) { err(`${at}: cevap seçeneklerin dışında`); continue; }
      // doğru seçenek cümlede geçer, çeldiriciler geçmez (FORMAT "Pilotun netleştirdikleri")
      if (!hasWord(c.de, d.opts[d.ans]!)) err(`${at}: doğru seçenek "${d.opts[d.ans]}" cümlede yok`);
      for (const [i, o] of d.opts.entries()) if (i !== d.ans && hasWord(c.de, o)) err(`${at}: çeldirici "${o}" cümlede geçiyor`);
    } else if (d.seviye === "orta") {
      if ((d.de.match(/___/g) || []).length !== 1) err(`${at}: tek boşluk olmalı`);
      if (sade(d.de.replace("___", d.accepted[0]!)) !== sade(c.de)) err(`${at}: boşluk doldurulunca cümle "${c.de}" çıkmıyor`);
      if (words(d.accepted[0]!).length !== 1) err(`${at}: orta seviye yalnızca tek kelime ister`);
    } else {
      if (sade(d.accepted[0]!) !== sade(c.de)) err(`${at}: ilk kabul cümlenin kendisi değil ("${c.de}")`);
      if (d.accepted.length < 3) warn(`${at}: kabul ${d.accepted.length} (en az 3 yazım)`);
      for (const a of d.accepted) if (sade(a) !== sade(c.de)) err(`${at}: kabul "${a}" başka bir cümle (yalnızca yazım farkı olabilir)`);
      if (d.seviye === "zor") {
        const need = words(c.de), bank = d.banka.map(sade);
        const left = [...bank];
        for (const w of need) { const i = left.indexOf(w); if (i < 0) { err(`${at}: bankada "${w}" yok`); break; } left.splice(i, 1); }
        if (left.length < 2) err(`${at}: bankada en az 2 çeldirici olmalı (${left.length})`);
      }
    }
  }
}
