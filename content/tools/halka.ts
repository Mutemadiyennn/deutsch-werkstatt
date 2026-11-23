/**
 * AKIS AK-10 1. adım (PM #160 7042498589): `halkalar` şeması denetimi + cümle kapısı sayacı (AK-3).
 *  - `halkalar` olan günde (hata): halka kartları = yeni_kartlar; halka başına 2–6 kart (PM-098 md. 2: tek kartlık halka yok); görev cümlesinde bilinmeyen 0 ve
 *    kartın kelimesi geçer; sahne satırında bilinmeyen ≤ 1; her kartın kapıdan geçen en az 2 görev cümlesi var.
 *  - Bütün günler için sayaç (uyarı): günün görev cümlelerinde (öğrencinin ürettiği) bilinmeyen > 0 sayısı ve kapıdan geçen
 *    örnek/boşluk cümlesi olmayan kartlar. Sayım İÇ'in "B" kipiyle aynı: günün dersleri yapılmış, günün kartları tanıtılmış.
 * Bilinen küme kuralları packages/shared/src/kume.ts'te (tek kaynak).
 */
import { bilinmeyenler, bilinmeyenYazi, kalipSecenekleri, toks, type Drill, type Gun, type KumeDizini, type TemelDers } from "../../packages/shared/src/index.ts";

import { tabloDolgusu, type KesinTablo } from "./ktablo.ts";
import POLICY from "../../web/src/policy.json" with { type: "json" };
/** policy.json → akis.halka_kart (AK-8; PM 7043401257; PM-098 md. 2 / PM-100 md. 1: [2, 6] sınırdır, formül değil) */
export const HALKA_KART = POLICY.akis.halka_kart as [number, number];
const GOREV_MIN = 2;

type Cumle = { yer: string; tur: "gorev" | "gosterim"; de: string };
function madde(m: Drill, yer: string): Cumle[] {
  const x = m as unknown as { audio_de?: string; de?: string; accepted?: string[] };
  const r: Cumle[] = [];
  if (x.audio_de) r.push({ yer, tur: "gosterim", de: x.audio_de });
  if (x.de) r.push({ yer, tur: x.de.includes("___") ? "gorev" : "gosterim", de: x.de });
  if (x.accepted?.[0]) r.push({ yer, tur: "gorev", de: x.accepted[0] });
  return r;
}
/** Günün öğrenciye görünen cümleleri: gösterim (okur/dinler) ve görev (üretir) */
export function gunCumleleri(g: Gun, dersler: Map<string, TemelDers>): Cumle[] {
  const r: Cumle[] = [];
  for (const s of g.sahne?.sahneler ?? []) r.push({ yer: "sahne", tur: "gosterim", de: s.de });
  for (const a of g.sesler) for (const c of a.script) r.push({ yer: "ses", tur: "gosterim", de: c.de });
  for (const n of g.prova?.dugumler ?? []) { r.push({ yer: "prova", tur: "gosterim", de: n.de }); for (const s of n.secenekler) r.push({ yer: "prova", tur: "gorev", de: s.de }); }
  if (g.okuma_yazma?.metin_de) r.push({ yer: "okuma", tur: "gosterim", de: g.okuma_yazma.metin_de });
  for (const m of g.gun_sinavi?.maddeler ?? []) r.push(...madde(m, "sinav"));
  for (const id of g.dersler) {
    const d = dersler.get(id); if (!d) continue;
    for (const t of d.teach) r.push({ yer: "ders.teach", tur: "gosterim", de: t.de });
    for (const m of d.drills) r.push(...madde(m, "ders.alistirma"));
    const x = d as unknown as { dialogue?: { lines?: { de: string; speaker?: string }[] }; listening?: { script?: { de: string }[] }[] };
    for (const l of x.dialogue?.lines ?? []) r.push({ yer: "ders.diyalog", tur: l.speaker === "ogrenci" ? "gorev" : "gosterim", de: l.de });
    for (const h of x.listening ?? []) for (const c of h.script ?? []) r.push({ yer: "ders.dinleme", tur: "gosterim", de: c.de });
  }
  return r.filter((c) => c.de);
}

export interface HalkaSonuc { errors: string[]; warnings: string[]; sayac: { gun: number; gorev: number; ihlal: number; kartsiz: string[] }[] }

/**
 * `tablo`: kesin kelime tabloları (ktablo.ts). Önceki günün dosyası yoksa o günün kartları, çerçeve sözcükleri ve dersleri K(t)'ye
 * tablodan girer (PM-092 md. 3.2); dosyası olan gün her zaman dosyadan okunur.
 */
export function halkaDenetle(gunler: { file: string; data: Gun }[], dersler: Map<string, TemelDers>, d: KumeDizini, tablo?: KesinTablo): HalkaSonuc {
  const errors: string[] = [], warnings: string[] = [], sayac: HalkaSonuc["sayac"] = [];
  const oncekiKart = new Set<string>(), oncekiDers = new Set<string>();
  const dolgu = tabloDolgusu(gunler.map((x) => x.data.day), tablo);
  for (const { file, data: g } of [...gunler].sort((a, b) => a.data.day - b.data.day)) {
    for (const t of dolgu.get(g.day) ?? []) {
      for (const c of [...t.kartlar, ...t.cerceve]) oncekiKart.add(c);
      for (const id of t.dersler) { oncekiDers.add(id); for (const c of d.dersler.get(id)?.kart ?? []) oncekiKart.add(c); }
    }
    const bugunDers = new Set(g.dersler);
    const bugunDersKart = new Set(g.dersler.flatMap((id) => [...(d.dersler.get(id)?.kart ?? [])]));
    // --- halkalar (hata) ---
    if (g.halkalar) {
      const tum = g.halkalar.flatMap((h) => h.kartlar);
      const yeni = new Set(g.yeni_kartlar);
      const fazla = tum.filter((x) => !yeni.has(x)), eksik = g.yeni_kartlar.filter((x) => !tum.includes(x));
      const cift = tum.filter((x, i) => tum.indexOf(x) !== i);
      if (fazla.length || eksik.length || cift.length) errors.push(`${file}: halkalar yeni_kartlar ile aynı değil (eksik ${eksik.join(", ") || "-"}; fazla ${fazla.join(", ") || "-"}; iki kez ${cift.join(", ") || "-"})`);
      const gorulen = new Set<string>(); const kaliplar: string[][] = []; let acceptedEksik = 0, sahneNot = 0;
      for (const h of g.halkalar) {
        const at = `${file}: ${h.id}`;
        if (h.kartlar.length < HALKA_KART[0] || h.kartlar.length > HALKA_KART[1]) errors.push(`${at}: ${h.kartlar.length} kart (${HALKA_KART[0]}–${HALKA_KART[1]})`);
        // günün dersi varsayılmaz (#165): yalnız `dersten_sonra: true` yazılı halkada sayılır. Halkanın ve önceki halkaların kalıpları bilinir.
        // Halka içi tanıtım sırası planlayıcının işidir (AK-2; web/src/core/akis.ts): burada halkanın bütün kartları bilinir sayılır.
        const sonra = h.dersten_sonra === true;
        for (const kp of h.kaliplar ?? []) kaliplar.push(...kalipSecenekleri(kp.de));
        const k = { kart: new Set([...oncekiKart, ...gorulen, ...h.kartlar, ...(sonra ? bugunDersKart : [])]), biten: new Set([...oncekiDers, ...(sonra ? bugunDers : [])]), kaliplar: [...kaliplar] };
        for (const c of h.kartlar) {
          const lx = d.kartlar.get(c);
          if (!lx) { errors.push(`${at}: ${c} sözlükte yok`); continue; }
          let uygun = 0;
          for (const e of lx.examples) if (!bilinmeyenler(d, e.de, k).length) uygun++;
          for (const f of lx.forms) if (!bilinmeyenler(d, f.de.replace(/___/g, " "), k, toks(f.answer.replace(/…/g, " "))).length) uygun++;
          for (const gc of h.gorev_cumleleri.filter((x) => x.kart === c)) {
            const u = bilinmeyenler(d, gc.de, k);
            if (u.length) { errors.push(`${at} ${c}: görev cümlesinde bilinmeyen (${bilinmeyenYazi(u).join(", ")}): ${gc.de}`); continue; }
            const kendi = new Set([...(d.yuzey.get(c) ?? [])].filter((x) => !toks(lx.art).includes(x)));
            if (!toks(gc.de).some((x) => kendi.has(x))) { errors.push(`${at} ${c}: görev cümlesinde kartın kelimesi yok: ${gc.de}`); continue; }
            uygun++;
            if (gc.accepted.length < 3) acceptedEksik++;
          }
          if (uygun < GOREV_MIN) errors.push(`${at} ${c}: kapıdan geçen görev cümlesi ${uygun} (en az ${GOREV_MIN})`);
        }
        for (const gc of h.gorev_cumleleri) if (!h.kartlar.includes(gc.kart)) errors.push(`${at}: görev cümlesi halkada olmayan karta bağlı (${gc.kart})`);
        for (const s of h.sahne?.satirlar ?? []) {
          const u = bilinmeyenler(d, s.de, k);
          if (u.length > 1) errors.push(`${at}: sahne satırında ${u.length} bilinmeyen (${bilinmeyenYazi(u).join(", ")}): ${s.de}`);
          else if (u.length) sahneNot++;
        }
        for (const c of h.kartlar) gorulen.add(c);
      }
      if (acceptedEksik) warnings.push(`${file}: ${acceptedEksik} görev cümlesinde kabul listesi 3'ten kısa (üretim adımında kullanılmadan önce ≥ 3, D-064)`);
      if (sahneNot) warnings.push(`${file}: ${sahneNot} sahne satırında 1 bilinmeyen sözcük (işaretli gösterilir, sorulmaz)`);
    }
    // --- sayaç (uyarı; İÇ "B" kipi) ---
    const kB = { kart: new Set([...oncekiKart, ...g.yeni_kartlar, ...bugunDersKart]), biten: new Set([...oncekiDers, ...bugunDers]), kaliplar: (g.halkalar ?? []).flatMap((h) => (h.kaliplar ?? []).flatMap((kp) => kalipSecenekleri(kp.de))) };
    const cs = gunCumleleri(g, dersler).filter((c) => c.tur === "gorev");
    const ihlal = cs.filter((c) => bilinmeyenler(d, c.de, kB).length > 0).length;
    const kartsiz = g.yeni_kartlar.filter((c) => {
      const lx = d.kartlar.get(c); if (!lx) return false;
      return !lx.examples.some((e) => !bilinmeyenler(d, e.de, kB).length) && !lx.forms.some((f) => !bilinmeyenler(d, f.de.replace(/___/g, " "), kB, toks(f.answer.replace(/…/g, " "))).length);
    });
    sayac.push({ gun: g.day, gorev: cs.length, ihlal, kartsiz });
    for (const c of g.yeni_kartlar) oncekiKart.add(c);
    for (const c of bugunDersKart) oncekiKart.add(c);
    for (const x of bugunDers) oncekiDers.add(x);
  }
  const top = sayac.reduce((a, s) => a + s.ihlal, 0);
  if (sayac.length) warnings.push(`AK-3 sayaç: görev cümlesinde bilinmeyen > 0 — ${top}/${sayac.reduce((a, s) => a + s.gorev, 0)} (${sayac.map((s) => `${s.gun}. gün ${s.ihlal}/${s.gorev}`).join(", ")}); kapıdan geçen cümlesi olmayan kart ${sayac.reduce((a, s) => a + s.kartsiz.length, 0)}`);
  return { errors, warnings, sayac };
}
