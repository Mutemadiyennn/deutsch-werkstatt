/**
 * M1 gün denetimi (#58 A4; PM-053 dikte merdiveni, PM-055 gerçek video). Saf fonksiyon: hata ve uyarı listesi döner.
 * Hata: içerik oynatıcıda kırılır ya da öğrenciye yanlış şey söyler. Uyarı: taslakta kabul, "reviewed" günde hata olur.
 */
import type { Bolum, Gun, MedyaCumle } from "../../packages/shared/src/m1.ts";
import { medyalar } from "../../packages/shared/src/m1.ts";
import { cumleler, uyanKaliplar } from "../../web/src/core/okuma.ts";

/** Karşılaştırma için: küçük harf, noktalama ve fazla boşluk yok (ümlaut korunur) */
export const sade = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–-]/g, " ").replace(/\s+/g, " ").trim();
const words = (s: string) => sade(s).split(" ").filter(Boolean);
const hasWord = (sentence: string, w: string) => ` ${sade(sentence)} `.includes(` ${sade(w)} `);
/** Satır birden çok cümle taşıyabilir ("Heute ist Donnerstag. Gestern war Mittwoch."): dikte hedefi satırın tamamı ya da bir cümlesi */
export const parcalar = (line: string) => [line, ...(line.match(/[^.!?]+[.!?]*/g) ?? []).map((x) => x.trim()).filter(Boolean)];
const hedefMi = (line: string, t: string) => parcalar(line).some((x) => sade(x) === sade(t));

/**
 * Öğretmeden isteme (OD-0, #58 A2 kuralı): öğrenciden YAZMASI/SÖYLEMESİ istenen her kelime o güne kadar öğretilmiş olmalı.
 * `taught`: o güne kadarki yeni kartlar (+ çoğul, fiil biçimleri, eşdizim ve örnek kelimeleri), temel derslerin öğretim
 * öğeleri, tabloları, maddeleri ve diyalogları, işlev kelimeleri ve karakter adları (küçük harf). Çekim eki atılarak da aranır.
 */
export function ogretilmemis(text: string, taught: Set<string>): string[] {
  const out: string[] = [];
  for (const w of words(text)) {
    if (taught.has(w) || /^\d+$/.test(w)) continue;
    const stemOk = ["en", "er", "em", "es", "st", "et", "e", "n", "s", "t"].some((suf) => w.length > suf.length + 2 && w.endsWith(suf) && (taught.has(w.slice(0, -suf.length)) || taught.has(w.slice(0, -suf.length) + "en")));
    if (!stemOk && !out.includes(w)) out.push(w);
  }
  return out;
}

export function checkGun(g: Gun, ctx: { lexicon: Set<string>; temel: Set<string>; taught?: Set<string> }): { errors: string[]; warnings: string[] } {
  const errors: string[] = [], warnings: string[] = [];
  const ist = (where: string, text: string) => { if (!ctx.taught) return; const u = ogretilmemis(text, ctx.taught); if (u.length) warnings.push(`${where}: öğretilmemiş kelime isteniyor: ${u.slice(0, 6).join(", ")}`); };
  // r0: tam temel ders → temel paket; gr:/dn: dil noktası → var mı denetimi hat D'de (grammar.json, dn-HH.json; PM 7087668356 md. 4)
  for (const d of g.dersler) if (d.startsWith("r0:") && !ctx.temel.has(d)) errors.push(`dersler: ${d} temel pakette yok`);
  // sınav günü (PM-101 md. 5): kartsız, dersiz, halkasız; medya ve kart sayısı beklenmez (o gün deneme açılır)
  if (g.sinav) {
    if (g.yeni_kartlar.length) errors.push(`sinav: sınav günü kartsızdır (yeni_kartlar ${g.yeni_kartlar.length})`);
    if (g.dersler.length) errors.push(`sinav: sınav gününde dersler boş olmalı (${g.dersler.join(", ")})`);
    if (g.halkalar?.length) errors.push(`sinav: sınav günü halkasızdır (${g.halkalar.length} halka)`);
    // o gün yalnız deneme açılır (uygulama başka adım göstermez): medya, prova, okuma ya da gün sınavı yazılmışsa öğrenci görmez (hat G takibi)
    const fazla = (["video", "sahne", "prova", "okuma_yazma", "gun_sinavi"] as const).filter((k) => g[k] !== undefined);
    if (g.sesler.length) fazla.unshift("sesler" as never);
    if (g.gorsel.length) fazla.push("gorsel" as never);
    if (fazla.length) errors.push(`sinav: sınav gününde yalnız deneme açılır; ${fazla.join(", ")} öğrenciye görünmez`);
    if (!g.sinav_bolumler) warnings.push("sinav_bolumler yok: deneme bütünüyle bu gün açılır (PM-110: bölümler günlere ayrılır)");
    else if (new Set(g.sinav_bolumler).size !== g.sinav_bolumler.length) errors.push(`sinav_bolumler: aynı bölüm iki kez (${g.sinav_bolumler.join(", ")})`);
  } else if (g.sinav_bolumler) errors.push("sinav_bolumler: yalnız sınav gününde (sinav bağı yok)");
  const missing = g.yeni_kartlar.filter((id) => !ctx.lexicon.has(id));
  if (missing.length) warnings.push(`yeni_kartlar: sözlükte olmayan ${missing.length} kart (ilk: ${missing.slice(0, 5).join(", ")})`);
  if (g.yeni_kartlar.length && (g.yeni_kartlar.length < 15 || g.yeni_kartlar.length > 25)) warnings.push(`yeni_kartlar: ${g.yeni_kartlar.length} kart (hedef 15–25)`);
  if (!g.video && !g.sinav) warnings.push("gerçek insan videosu yok (PM-055: her gün en az 1 klip; bulunamadıysa #58'de PM'e sorulur)");
  if (g.sesler.length < 2 && !g.sinav) warnings.push(`sesler: ${g.sesler.length} (en az 2: anons, sesli mesaj)`);

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
    const inSome = new Set<string>(), bIds = new Set<string>();
    if (m.kind === "ses" && m.bolumler.length !== 1) warnings.push(`${at}: anons/sesli mesaj tek bölüm olmalı (PM-053 §6)`);
    if (m.kind === "video") { const v = m.video!, len = v.kaynak.bit_sn - v.kaynak.bas_sn; for (const c of m.cumleler) if (c.t1 !== undefined && c.t1 > len + 0.5) errors.push(`${at}: ${c.id} klibin sonundan sonra bitiyor (${c.t1} > ${len} sn)`); }
    const order = new Map(m.cumleler.map((c, i) => [c.id, i]));
    for (const b of m.bolumler) {
      const bat = `${at}/${b.id}`;
      if (bIds.has(b.id)) errors.push(`${bat}: tekrar eden bölüm kimliği`); bIds.add(b.id);
      const own = new Set(b.cumleler);
      for (const id of b.cumleler) { if (!byId.has(id)) errors.push(`${bat}: cümle ${id} yok`); if (inSome.has(id)) errors.push(`${bat}: cümle ${id} iki bölümde`); inSome.add(id); }
      // bölüm kaydın kesintisiz bir parçasıdır: cümleler sıralı ve bitişik (oynatıcı ilk ve son cümleyle aralık çalar)
      const idx = b.cumleler.map((id) => order.get(id)).filter((x): x is number => x !== undefined);
      if (idx.some((x, i) => i > 0 && x !== idx[i - 1]! + 1)) errors.push(`${bat}: cümleler sıralı ve bitişik değil`);
      const dIds = new Set<string>(); for (const d of b.dikte) { if (dIds.has(d.id)) errors.push(`${bat}: tekrar eden dikte kimliği ${d.id}`); dIds.add(d.id); }
      for (const d of b.dikte) {
        if (d.seviye === "orta" || d.seviye === "zor" || d.seviye === "usta") ist(`${bat}/dikte ${d.id}`, d.accepted[0]!);
        if (d.seviye === "gercek") ist(`${bat}/dikte ${d.id}`, d.zorunlu.join(" "));
      }
      if (b.cevapla && "accepted" in b.cevapla && b.cevapla.accepted.length && ctx.taught && b.cevapla.accepted.every((a) => ogretilmemis(a, ctx.taught!).length)) ist(`${bat}/cevapla`, b.cevapla.accepted[0]!);
      if (b.cevapla && !["guided_response", "listen_and_respond", "tr_de"].includes(b.cevapla.k)) errors.push(`${bat}: cevapla türü ${b.cevapla.k} oynatıcıda desteklenmiyor (guided_response, listen_and_respond, tr_de)`);
      // PM-053: bölüm 1–2 dakika (hizalanmış videoda ölçülür)
      const first = byId.get(b.cumleler[0]!), last = byId.get(b.cumleler[b.cumleler.length - 1]!);
      if (m.kind === "video" && first?.t0 !== undefined && last?.t1 !== undefined && last.t1 - first.t0 > 150) warnings.push(`${bat}: bölüm ${Math.round(last.t1 - first.t0)} sn (en çok ~2 dk)`);
      checkBolum(b, byId, own, (e) => errors.push(`${bat}: ${e}`), (w) => warnings.push(`${bat}: ${w}`));
    }
    const kopuk = m.cumleler.filter((c) => !inSome.has(c.id) && m.bolumler.length);
    if (kopuk.length && m.kind !== "sahne") warnings.push(`${at}: hiçbir bölümde olmayan ${kopuk.length} cümle (${kopuk.slice(0, 3).map((c) => c.id).join(", ")})`);
    if (m.eylem) for (const k of m.eylem.kanit) if (typeof k === "string" && !byId.has(k)) errors.push(`${at}: eylem kanıtı ${k} yok`);
    if (m.eylem && m.eylem.ans >= m.eylem.opts.length) errors.push(`${at}: eylem cevabı seçeneklerin dışında`);
  }
  if (g.prova) {
    const ids = new Set(g.prova.dugumler.map((d) => d.id));
    if (!ids.has(g.prova.baslangic)) errors.push(`prova: başlangıç ${g.prova.baslangic} yok`);
    for (const d of g.prova.dugumler) for (const s of d.secenekler) if (!ids.has(s.sonraki)) errors.push(`prova/${d.id}: sonraki ${s.sonraki} yok`);
    if (!g.prova.dugumler.some((d) => d.son)) errors.push("prova: bitiş düğümü (son) yok");
    for (const d of g.prova.dugumler) if (!d.son && !d.secenekler.length) errors.push(`prova/${d.id}: seçenek yok ve bitiş değil`);
    if (ctx.taught) for (const d of g.prova.dugumler) for (const o of d.secenekler) if (o.uygun) { const all = [o.de, ...o.accepted]; if (all.every((a) => ogretilmemis(a, ctx.taught!).length)) ist(`prova/${d.id}`, o.de); }
  }
  if (g.okuma_yazma?.yazma) ist("yazma", g.okuma_yazma.yazma.zorunlu.join(" "));
  if (g.okuma_yazma) for (const q of g.okuma_yazma.sorular) if ("kind" in q && q.ans >= q.opts.length) errors.push(`okuma ${q.id ?? q.q_tr}: cevap seçeneklerin dışında`);
  // PM-066 madde 3: gün sınavı — sesli maddeler sınavda olmalı; üretim maddelerinde accepted ≥ 3 (D-064); kimlikler tekil
  if (g.gun_sinavi) {
    const ids = g.gun_sinavi.maddeler.map((m) => m.id);
    if (new Set(ids).size !== ids.length) errors.push("gun_sinavi: madde kimlikleri tekil değil");
    for (const s of g.gun_sinavi.sesli) if (!ids.includes(s)) errors.push(`gun_sinavi: sesli madde ${s} sınavda yok`);
    for (const m of g.gun_sinavi.maddeler) if ("accepted" in m && Array.isArray(m.accepted) && m.accepted.length < 3 && m.k !== "pick") errors.push(`gun_sinavi/${m.id}: accepted ≥ 3 olmalı (D-064; ${m.accepted.length})`);
    // sesli cevap seçmeli madde olamaz (inceleme #109)
    for (const s of g.gun_sinavi.sesli) { const m = g.gun_sinavi.maddeler.find((x) => x.id === s); if (m?.k === "pick") errors.push(`gun_sinavi: sesli madde ${s} seçmeli (pick) olamaz`); }
    // dikte maddeleri (İÇ #110 P1-1): sınavda olmalı, seçmeli olamaz, aynı madde hem sesli hem dikte olamaz
    for (const s of g.gun_sinavi.dikte ?? []) {
      const m = g.gun_sinavi.maddeler.find((x) => x.id === s);
      if (!m) errors.push(`gun_sinavi: dikte madde ${s} sınavda yok`);
      else if (m.k === "pick") errors.push(`gun_sinavi: dikte madde ${s} seçmeli (pick) olamaz`);
      if (g.gun_sinavi.sesli.includes(s)) errors.push(`gun_sinavi: ${s} hem sesli hem dikte olamaz`);
    }
    // sınav yalnızca o güne kadar öğretilenleri ister (requires kuralı; cevapla ile aynı denetim; inceleme #109 P1-1)
    for (const m of g.gun_sinavi.maddeler) if ("accepted" in m && m.accepted.length && ctx.taught && m.accepted.every((a) => ogretilmemis(a, ctx.taught!).length)) ist(`gun_sinavi/${m.id}`, m.accepted[0]!);
  }
  if (g.serbest_konus) checkSerbestKonus(g, errors, ist, ctx.taught);
  return { errors, warnings };
}

/** PM-148 serbest konuşma (FORMAT.md "Serbest konuşma"): ipucu yok, kalıplar ≥ 3, örnek her cümlesiyle bir hedefe uyar */
function checkSerbestKonus(g: Gun, errors: string[], ist: (where: string, text: string) => void, taught?: Set<string>) {
  const ids = new Set<string>();
  const YUVA = /\{(name|ulke|sehir|yas|diller|meslek|hobi|aile)\}/g;
  for (const k of g.serbest_konus ?? []) {
    const at = `serbest_konus/${k.id}`;
    if (ids.has(k.id)) errors.push(`${at}: kimlik tekil değil`); ids.add(k.id);
    if (!k.id.startsWith(`m1:${String(g.day).padStart(2, "0")}:`)) errors.push(`${at}: kimlik günün numarasıyla başlamalı (m1:${String(g.day).padStart(2, "0")}:kN)`);
    // ipucu yok: görev ve durum metninde Almanca işaretleme, tırnak ya da yer tutucu olmaz
    for (const [ad, v] of [["gorev_tr", k.gorev_tr], ["durum_tr", k.durum_tr]] as const) if (/\*\*|[„“"»«{]/.test(v)) errors.push(`${at}: ${ad} içinde ipucu işareti (**, tırnak ya da yer tutucu) olmaz`);
    if (k.soru_de && /[{]/.test(k.soru_de)) errors.push(`${at}: soru_de içinde yer tutucu olmaz (ses önceden üretilir)`);
    const hid = k.hedefler.map((h) => h.id);
    if (new Set(hid).size !== hid.length) errors.push(`${at}: hedef kimlikleri tekil değil`);
    const kaliplar = k.hedefler.flatMap((h) => h.kaliplar);
    for (const h of k.hedefler) for (const kp of h.kaliplar) if (!kp.includes("___") && !/[.!?]$/.test(kp.trim())) errors.push(`${at}/${h.id}: "${kp}" ne yuva (___) taşıyor ne tam cümle`);
    // örnek: her cümlesi bir hedefin kalıbına uyar; her hedef en az bir cümleyle karşılanır
    const ornek = cumleler(k.ornek_de.replace(YUVA, "Xyz"));
    for (const c of ornek) if (!uyanKaliplar(c, kaliplar).length) errors.push(`${at}: ornek_de cümlesi hiçbir hedef kalıbına uymuyor: "${c}"`);
    for (const h of k.hedefler) if (!ornek.some((c) => uyanKaliplar(c, h.kaliplar).length)) errors.push(`${at}/${h.id}: ornek_de bu hedefi karşılamıyor`);
    if (ornek.length < k.en_az_cumle) errors.push(`${at}: ornek_de ${ornek.length} cümle (en_az_cumle ${k.en_az_cumle})`);
    // öğretmeden isteme yok (uyarı; hafta kapısı ayrıca sayar)
    // hedef: en az bir kalıbı bütünüyle öğretilmiş olmalı (kalıplardan biri yeter; hepsi eksikse ilkini bildir)
    for (const h of k.hedefler) if (taught && h.kaliplar.every((kp) => ogretilmemis(kp.replace(/___/g, " "), taught).length)) ist(`${at}/${h.id}`, h.kaliplar[0]!.replace(/___/g, " "));
    ist(`${at}/ornek_de`, k.ornek_de.replace(YUVA, " "));
    if (k.soru_de) ist(`${at}/soru_de`, k.soru_de);
  }
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
      if (!hedefMi(c.de, d.de.replace("___", d.accepted[0]!))) err(`${at}: boşluk doldurulunca "${c.de}" (ya da bir cümlesi) çıkmıyor`);
      if (words(d.accepted[0]!).length !== 1) err(`${at}: orta seviye yalnızca tek kelime ister`);
      for (const a of d.accepted) if (sade(a) !== sade(d.accepted[0]!)) err(`${at}: kabul "${a}" başka bir kelime (yalnızca yazım farkı olabilir)`);
    } else {
      const hedef = d.accepted[0]!;
      if (!hedefMi(c.de, hedef)) err(`${at}: ilk kabul "${c.de}" satırının kendisi ya da bir cümlesi değil`);
      if (d.accepted.length < 3) warn(`${at}: kabul ${d.accepted.length} (en az 3 yazım)`);
      for (const a of d.accepted) if (sade(a) !== sade(hedef)) err(`${at}: kabul "${a}" başka bir cümle (yalnızca yazım farkı olabilir)`);
      if (d.seviye === "zor") {
        const need = words(hedef), bank = d.banka.map(sade);
        const left = [...bank];
        for (const w of need) { const i = left.indexOf(w); if (i < 0) { err(`${at}: bankada "${w}" yok`); break; } left.splice(i, 1); }
        if (left.length < 2) err(`${at}: bankada en az 2 çeldirici olmalı (${left.length})`);
      }
    }
  }
}
