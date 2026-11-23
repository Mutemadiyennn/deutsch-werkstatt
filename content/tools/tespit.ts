/**
 * A1 seviye tespiti madde havuzu: çözücü + doğrulayıcı (PM-115 md. 5; biçim `content/v2/assess/TESPIT_FORMAT.md`).
 *  - `tespitKaynaklari(dir)`: bağlanabilir maddelerin dizini (görülmemiş durum, hafta sonu testi, gün sınavı, temel ders
 *    alıştırması, deneme) ve A1
 *    günlerinin özeti (can_do, dersler, sınav günü). Dosyalar HAM okunur: gün şemasına bağımlı değil (eksik hafta, fikstür ağacı).
 *  - `tespitDenetle(girdi)`: saf; şema + bağ + kapsam kuralları → { hata, uyari, cozulen }.
 *  - `tespitYukle(dir)`: havuz dosyası yoksa null (main'de sessiz); varsa ikisini birleştirir.
 * Eşikler `web/src/policy.json` → `seviye_tespiti` (kod sabit yazmaz).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { TespitHavuzu, CEKIRDEK_BECERI, canDoGun, derinSec, type HavuzBeceri, type TespitCozulen, type TespitKaynak, type TespitPaket } from "../../packages/shared/src/tespit.ts";
import { textIssues } from "../../packages/shared/src/explain.ts";
import { Drill } from "../../packages/shared/src/content.ts";
import POLICY from "../../web/src/policy.json" with { type: "json" };

export const TESPIT_DOSYA = "assess/a1-seviye-tespiti.json";
export type TespitPolitika = typeof POLICY.seviye_tespiti;
export const TESPIT_POLITIKA: TespitPolitika = POLICY.seviye_tespiti;

/** Bağlanabilir kaynak madde */
export interface KaynakMadde {
  id: string;
  kaynak: Exclude<TespitKaynak, "yeni">;
  dosya: string;
  /** kaynağın haftası (görülmemiş: dosyanın haftası; test/gün sınavı: günün haftası; deneme: maddenin `hafta`sı; temel: null) */
  hafta: number | null;
  tur: string;
  uretim: boolean;
  /** görülmemiş durumun kendi can_do'su */
  can_do?: string;
  /** deneme maddesi: deneme kimliği ve bölümü */
  deneme?: string;
  bolum?: string;
  /** temel ders alıştırması: dersin kimliği (r0:NN-…); madde dersin öğretildiği haftadan önce ölçemez */
  ders?: string;
  madde: Record<string, unknown>;
}
/** A1 gününün tespitte gereken özeti */
export interface GunOzet { day: number; level: string; can_do: string | null; dersler: string[]; sinav: boolean; can_do_tr?: string; yeni_kartlar?: string[] }
export interface TespitGirdi {
  havuz: unknown;
  kaynaklar: ReadonlyMap<string, KaynakMadde>;
  gunler: readonly GunOzet[];
  denemeler: ReadonlySet<string>;
  politika?: TespitPolitika;
}
export interface TespitSonuc { hata: string[]; uyari: string[]; cozulen: TespitCozulen[]; cekirdek?: TespitCozulen[]; muaf?: string[] }

const haftaOf = (gun: number) => Math.ceil(gun / 7);
const nesne = (x: unknown): Record<string, unknown> => (x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : {});
const dizi = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const yazi = (x: unknown): string | null => (typeof x === "string" ? x : null);

/** Drill türünün üretim olup olmadığı: seçmeli (`pick`, şıklı `gap`) üretim değildir */
export function drillUretim(m: Record<string, unknown>): boolean {
  if (m.k === "pick") return false;
  if (m.k === "gap") return !(Array.isArray(m.opts) && m.opts.length > 0);
  return ["order", "transform", "guided_response", "listen_and_respond", "tr_de"].includes(String(m.k));
}
const DENEME_URETIM = new Set(["form", "mesaj", "guided_response", "listen_and_respond"]);

/** Beceri ↔ madde türü uyumu (biçim belgesi tablosu). `null` = uyumlu; değilse gerekçe. */
export function beceriUyumu(beceri: HavuzBeceri, x: Pick<KaynakMadde, "kaynak" | "tur" | "uretim" | "madde">): string | null {
  const t = x.tur, deneme = x.kaynak === "deneme";
  const sesli = deneme && t === "pick" && Array.isArray(x.madde.ses);
  const metinli = deneme && t === "pick" && (typeof x.madde.metin_de === "string" || Array.isArray(x.madde.secenekler_de));
  const ok: Record<HavuzBeceri, boolean> = {
    konusma: t === "durum" || t === "guided_response" || t === "listen_and_respond",
    dinleme: t === "listen_and_respond" || sesli,
    okuma: metinli,
    yazma: t === "durum" || ["tr_de", "transform", "order", "guided_response", "form", "mesaj"].includes(t) || (t === "gap" && x.uretim),
    dil: !deneme || t !== "pick"
  };
  return ok[beceri] ? null : `beceri "${beceri}" bu madde türüyle ölçülmez (${x.kaynak}/${t})`;
}

/* ---------- kaynak dizini (ham okuma) ---------- */
function jsonOku(f: string, hata: string[], ad: string): unknown {
  try { return JSON.parse(readFileSync(f, "utf8")); } catch (e) { hata.push(`${ad}: JSON okunamadı (${(e as Error).message})`); return null; }
}

/** İçerik ağacından bağlanabilir maddeler ve A1 gün özetleri */
export function tespitKaynaklari(dir: string): { kaynaklar: Map<string, KaynakMadde>; gunler: GunOzet[]; denemeler: Set<string>; hata: string[] } {
  const kaynaklar = new Map<string, KaynakMadde>(), gunler: GunOzet[] = [], denemeler = new Set<string>(), hata: string[] = [];
  const ekle = (k: KaynakMadde) => {
    const once = kaynaklar.get(k.id);
    if (once) { hata.push(`seviye tespiti: kaynak madde kimliği iki kez: ${k.id} (${once.dosya}, ${k.dosya})`); return; }
    kaynaklar.set(k.id, k);
  };
  const m1 = join(dir, "m1");
  const m1Dosyalar = existsSync(m1) ? readdirSync(m1).sort() : [];
  for (const f of m1Dosyalar) {
    const ad = `m1/${f}`;
    let m: RegExpExecArray | null;
    if ((m = /^gun-(\d{2,3})\.json$/.exec(f))) {
      const g = nesne(jsonOku(join(m1, f), hata, ad));
      const day = typeof g.day === "number" ? g.day : Number(m[1]);
      gunler.push({ day, level: String(g.level ?? ""), can_do: yazi(nesne(g.can_do).id), dersler: dizi(g.dersler).filter((x): x is string => typeof x === "string"), sinav: typeof g.sinav === "string",
        can_do_tr: yazi(nesne(g.can_do).tr) ?? "", yeni_kartlar: dizi(g.yeni_kartlar).filter((x): x is string => typeof x === "string") });
      for (const x of dizi(nesne(g.gun_sinavi).maddeler).map(nesne)) {
        const id = yazi(x.id); if (!id) continue;
        ekle({ id, kaynak: "gun_sinavi", dosya: ad, hafta: haftaOf(day), tur: String(x.k), uretim: drillUretim(x), madde: x });
      }
    } else if ((m = /^hafta-sonu-testi(?:-(\d{2}))?\.json$/.exec(f))) {
      const hafta = m[1] ? Number(m[1]) : 1;
      for (const x of dizi(nesne(jsonOku(join(m1, f), hata, ad)).maddeler).map(nesne)) {
        const id = yazi(x.id); if (!id) continue;
        // iki ad aynı haftayı verirse (hafta-sonu-testi.json + -01.json) aynı kimlikler gelir: yeni ad kazanır, eski atlanır
        if (!m[1] && kaynaklar.get(id)?.kaynak === "hafta_testi") continue;
        if (m[1] && kaynaklar.get(id)?.dosya === "m1/hafta-sonu-testi.json") kaynaklar.delete(id);
        ekle({ id, kaynak: "hafta_testi", dosya: ad, hafta, tur: String(x.k), uretim: drillUretim(x), madde: x });
      }
    } else if ((m = /^gorulmemis-(\d{2})\.json$/.exec(f))) {
      const hafta = Number(m[1]);
      for (const x of dizi(nesne(jsonOku(join(m1, f), hata, ad)).durumlar).map(nesne)) {
        const id = yazi(x.id); if (!id) continue;
        ekle({ id, kaynak: "gorulmemis", dosya: ad, hafta, tur: "durum", uretim: true, ...(yazi(x.can_do) ? { can_do: x.can_do as string } : {}), madde: x });
      }
    }
  }
  // temel dersler (r0-NN-*.json): `drills` ve `placement` maddeleri (gün içi dil noktası görevleri; 1. haftanın r0 dersleri)
  const tm = join(dir, "temel");
  for (const f of existsSync(tm) ? readdirSync(tm).sort() : []) {
    if (!/^r0-\d{2}-[^/]+\.json$/.test(f)) continue;
    const t = nesne(jsonOku(join(tm, f), hata, `temel/${f}`));
    const ders = yazi(t.id); if (!ders) continue;
    for (const x of [...dizi(t.drills), ...dizi(t.placement)].map(nesne)) {
      const id = yazi(x.id); if (!id) continue;
      ekle({ id, kaynak: "temel", dosya: `temel/${f}`, hafta: null, tur: String(x.k), uretim: drillUretim(x), ders, madde: x });
    }
  }
  const as = join(dir, "assess");
  for (const f of existsSync(as) ? readdirSync(as).sort() : []) {
    if (!f.endsWith(".json") || f === "bank.json" || f === "a1-seviye-tespiti.json") continue;
    const d = nesne(jsonOku(join(as, f), hata, `assess/${f}`));
    if (!Array.isArray(d.bolumler) || typeof d.id !== "string") continue;
    denemeler.add(d.id);
    for (const b of d.bolumler.map(nesne)) for (const k of dizi(b.kisimlar).map(nesne)) for (const x of dizi(k.maddeler).map(nesne)) {
      const id = yazi(x.id); if (!id) continue;
      ekle({ id, kaynak: "deneme", dosya: `assess/${f}`, hafta: typeof x.hafta === "number" ? x.hafta : null, tur: String(x.k), uretim: DENEME_URETIM.has(String(x.k)), deneme: d.id, bolum: String(b.id), madde: x });
    }
  }
  return { kaynaklar, gunler: gunler.sort((a, b) => a.day - b.day), denemeler, hata };
}

/* ---------- kurallar ---------- */
const AD_YER_TUTUCU = /\{[^}]*\}/;
/** `yeni` maddenin öğrenciye görünen Türkçe alanları (OD-9) */
const TR_ALAN = ["situation_tr", "tr", "instr_tr", "q_tr", "why_tr"] as const;

export function tespitDenetle(g: TespitGirdi): TespitSonuc {
  const P = g.politika ?? TESPIT_POLITIKA, H = P.havuz;
  const hata: string[] = [], uyari: string[] = [], cozulen: TespitCozulen[] = [], cekirdek: TespitCozulen[] = [];
  const r = TespitHavuzu.safeParse(g.havuz);
  if (!r.success) {
    for (const i of r.error.issues.slice(0, 25)) hata.push(`${i.path.join(".") || "(kök)"} — ${i.message}`);
    return { hata, uyari, cozulen };
  }
  const h = r.data;
  // `yeni` gövdesinde şemada olmayan alan (Drill nesneleri fazlalığı sessizce atar)
  dizi(nesne(g.havuz).maddeler).forEach((ham, i) => {
    const y = nesne(ham).yeni; if (!y) return;
    const p = Drill.safeParse(y); if (!p.success) return;
    for (const k of Object.keys(nesne(y))) if (!(k in p.data)) hata.push(`maddeler.${i}.yeni.${k} — şemada olmayan alan`);
  });

  const SON_GUN = P.a1_hafta * 7;
  const a1 = g.gunler.filter((x) => x.level === "A1" && x.day >= 1 && x.day <= SON_GUN);
  const gunMap = new Map(a1.map((x) => [x.day, x]));
  const dnHafta = new Map<string, number>();
  for (const x of a1) for (const d of x.dersler) if (!dnHafta.has(d) || dnHafta.get(d)! > haftaOf(x.day)) dnHafta.set(d, haftaOf(x.day));
  const kullanilan = new Map<string, string>();
  const tekil = (id: string, yer: string) => { const o = kullanilan.get(id); if (o) hata.push(`${yer}: ${id} havuzda iki kez (${o})`); else kullanilan.set(id, yer); };

  // çekirdek: dört beceri, maddeler bildirilen denemenin aynı adlı bölümünden
  if (!g.denemeler.has(h.cekirdek.deneme)) hata.push(`cekirdek.deneme: ${h.cekirdek.deneme} assess/ altında bulunamadı`);
  for (const b of CEKIRDEK_BECERI) for (const id of h.cekirdek[b]) {
    const yer = `cekirdek.${b}`; tekil(id, yer);
    const k = g.kaynaklar.get(id);
    if (!k) { hata.push(`${yer}: ${id} çözülmedi`); continue; }
    if (k.kaynak !== "deneme" || k.deneme !== h.cekirdek.deneme) { hata.push(`${yer}: ${id} ${h.cekirdek.deneme} denemesinin maddesi değil`); continue; }
    if (k.bolum !== b) hata.push(`${yer}: ${id} "${k.bolum}" bölümünden (beklenen "${b}")`);
    cekirdek.push({ id, kaynak: "deneme", tur: k.tur, hafta: k.hafta ?? 0, asama: "cekirdek", beceri: b, can_do: [], dil_noktasi: [], uretim: k.uretim, madde: k.madde });
  }

  h.maddeler.forEach((m, i) => {
    const yer = `maddeler.${i}`;
    let k: Pick<KaynakMadde, "kaynak" | "tur" | "uretim" | "madde" | "hafta" | "can_do" | "ders">;
    let id: string;
    if ("ref" in m) {
      id = m.ref; tekil(id, yer);
      const x = g.kaynaklar.get(id);
      if (!x) { hata.push(`${yer}: ref ${id} çözülmedi (görülmemiş, hafta sonu testi, gün sınavı ya da deneme maddesi değil)`); return; }
      k = x;
    } else {
      id = m.yeni.id; tekil(id, yer);
      if (g.kaynaklar.has(id)) hata.push(`${yer}: yeni madde kimliği ${id} bir kaynak maddeyle çakışıyor`);
      const madde = m.yeni as unknown as Record<string, unknown>;
      k = { kaynak: "yeni", tur: m.yeni.k, uretim: drillUretim(madde), madde, hafta: null };
      const acc = Array.isArray(madde.accepted) ? madde.accepted : [];
      if (k.uretim && acc.length < 3) hata.push(`${yer}: ${id} üretim maddesinde accepted ${acc.length} < 3 (D-064)`);
      for (const a of ["audio_de", "prompt_de"]) if (typeof madde[a] === "string" && AD_YER_TUTUCU.test(madde[a] as string)) hata.push(`${yer}: ${id} ${a} ad yer tutucusu taşıyor (ses önceden üretilir; yer tutucu yalnız cevapta)`);
      // OD-9: öğrenciye görünen Türkçe metin (taslakta uyarı, "reviewed" havuzda hata)
      for (const a of TR_ALAN) if (typeof madde[a] === "string") for (const x of textIssues(madde[a] as string)) (h.review.status === "reviewed" ? hata : uyari).push(`${yer}: ${id}.${a} OD-9 ${x}`);
    }
    const ad = `${yer} (${id})`;
    if (m.hafta > P.a1_hafta) hata.push(`${ad}: hafta ${m.hafta} A1'in dışında (1–${P.a1_hafta})`);
    if (k.ders) { const w = dnHafta.get(k.ders); if (w === undefined) hata.push(`${ad}: temel ders ${k.ders} bir A1 gününün dersler'inde yok`); else if (w > m.hafta) hata.push(`${ad}: temel ders ${k.ders} ${w}. haftada öğretiliyor, madde ${m.hafta}. haftayı ölçüyor (önce öğret, sonra iste)`); }
    if (k.hafta !== null && k.hafta !== m.hafta) hata.push(`${ad}: hafta ${m.hafta}, kaynağın haftası ${k.hafta}`);
    // can_do: görülmemiş durumun kendi can_do'su havuzda da bulunur (boşsa ondan alınır)
    const canDo = m.can_do.length ? [...m.can_do] : k.can_do ? [k.can_do] : [];
    if (k.can_do && !canDo.includes(k.can_do)) hata.push(`${ad}: kaynağın can_do'su ${k.can_do} listede yok`);
    for (const cd of canDo) {
      const gun = canDoGun(cd)!;
      if (gun < 1 || gun > SON_GUN) { hata.push(`${ad}: ${cd} A1 günü değil (1–${SON_GUN})`); continue; }
      if (haftaOf(gun) > m.hafta) hata.push(`${ad}: ${cd} ${haftaOf(gun)}. haftada öğretiliyor, madde ${m.hafta}. haftayı ölçüyor (önce öğret, sonra iste)`);
      const gg = gunMap.get(gun);
      if (gg && gg.can_do !== cd) hata.push(`${ad}: ${cd} gün dosyasındaki can_do ile aynı değil (${gg.can_do})`);
    }
    for (const d of m.dil_noktasi) {
      const w = dnHafta.get(d);
      if (w === undefined) { hata.push(`${ad}: dil noktası ${d} bir A1 gününün dersler'inde yok`); continue; }
      if (w > m.hafta) hata.push(`${ad}: ${d} ${w}. haftada öğretiliyor, madde ${m.hafta}. haftayı ölçüyor (önce öğret, sonra iste)`);
    }
    if (!canDo.length && !m.dil_noktasi.length) hata.push(`${ad}: ne can_do ne dil noktası var`);
    const uy = beceriUyumu(m.beceri, k);
    if (uy) hata.push(`${ad}: ${uy}`);
    if (m.asama === "tarama" && !(k.kaynak === "gorulmemis" || k.kaynak === "yeni")) hata.push(`${ad}: tarama maddesi görülmemiş durum ya da yeni madde olmalı (${k.kaynak})`);
    if (m.asama === "tarama" && !k.uretim) hata.push(`${ad}: tarama maddesi üretim olmalı (${k.tur})`);
    cozulen.push({ id, kaynak: k.kaynak, tur: k.tur, hafta: m.hafta, asama: m.asama, beceri: m.beceri, can_do: canDo, dil_noktasi: [...m.dil_noktasi], uretim: k.uretim, madde: k.madde });
  });

  // muaf dil noktaları
  const muaf = new Set<string>();
  for (const x of h.muaf_dil_noktasi) { if (!dnHafta.has(x.id)) hata.push(`muaf_dil_noktasi: ${x.id} bir A1 gününün dersler'inde yok`); muaf.add(x.id); }
  if (muaf.size) uyari.push(`seviye tespiti: ${muaf.size} dil noktası muaf (${[...muaf].join(", ")})`);

  // kapsam: içerikte günü bulunan her A1 haftası. Gereken = derin bakışın sorduğu (policy `derin`) + çıkışa kalan (`havuz.cikis_min`)
  const D = P.derin, cikis = H.cikis_min;
  const derinUretim = cozulen.filter((x) => x.asama === "derin" && x.uretim);
  const say = (f: (x: TespitCozulen) => boolean) => derinUretim.filter(f).length;
  const haftalar = new Set(a1.map((x) => haftaOf(x.day)));
  const yok = Array.from({ length: P.a1_hafta }, (_, i) => i + 1).filter((w) => !haftalar.has(w));
  if (yok.length) uyari.push(`seviye tespiti: günü içerikte olmayan A1 haftası ${yok.join(", ")}: kapsam denetlenmedi`);
  const [tMin, tMax] = H.tarama_hafta as [number, number];
  const cdMin = D.can_do_madde + cikis, dnMin = D.dil_noktasi_madde + cikis;
  const sorulan = new Set<TespitCozulen>();
  const hedefler: { w: number; can_do: string[]; dil_noktasi: string[] }[] = [];
  for (const w of [...haftalar].sort((a, b) => a - b)) {
    const gunlerW = a1.filter((x) => haftaOf(x.day) === w);
    const eksikGun = Array.from({ length: 7 }, (_, i) => (w - 1) * 7 + i + 1).filter((d) => !gunMap.has(d));
    if (eksikGun.length) uyari.push(`seviye tespiti: ${w}. haftada gün dosyası eksik (${eksikGun.join(", ")}): o günlerin can_do'su ve dil noktaları denetlenmedi`);
    const cdW = gunlerW.filter((x) => !x.sinav && x.can_do).map((x) => x.can_do!);
    const dnW = [...dnHafta].filter(([d, hw]) => hw === w && !muaf.has(d)).map(([d]) => d);
    hedefler.push({ w, can_do: cdW, dil_noktasi: dnW });
    const cdEksik = cdW.map((c) => [c, say((y) => y.can_do.includes(c))] as const).filter(([, n]) => n < cdMin);
    if (cdEksik.length) hata.push(`seviye tespiti ${w}. hafta: derin üretim maddesi en az ${cdMin} olmalı (derin ${D.can_do_madde} + çıkış ${cikis}); eksik can_do: ${cdEksik.map(([c, n]) => `${c} (${n})`).join(", ")}`);
    const dnEksik = dnW.map((d) => [d, say((y) => y.dil_noktasi.includes(d))] as const).filter(([, n]) => n < dnMin);
    if (dnEksik.length) hata.push(`seviye tespiti ${w}. hafta: derin üretim maddesi en az ${dnMin} olmalı (derin ${D.dil_noktasi_madde} + çıkış ${cikis}); eksik dil noktası: ${dnEksik.map(([d, n]) => `${d} (${n})`).join(", ")}`);
    const tarama = cozulen.filter((x) => x.asama === "tarama" && x.hafta === w);
    if (tarama.length < tMin || tarama.length > tMax) hata.push(`seviye tespiti ${w}. hafta: tarama maddesi ${tarama.length} (beklenen ${tMin}–${tMax})`);
    else if (!tarama.some((x) => x.beceri === "konusma" || x.beceri === "yazma")) hata.push(`seviye tespiti ${w}. hafta: tarama maddelerinde konuşma ya da yazma yok`);
  }
  // çıkış yoklaması (PM-115 md. 4: aynı madde ikinci kez sorulmaz): bütün haftalar zayıf sayılıp derin seçim (derinSec, motorla
  // aynı) yapılınca her hedefe sorulmamış en az `cikis_min` madde kalmalı. Haftalar bağımsız seçildiği için her alt küme de geçer.
  for (const hd of hedefler) for (const x of derinSec(cozulen, hd, D).secilen) sorulan.add(x);
  for (const hd of hedefler) {
    const kalan = (t: string) => derinUretim.filter((y) => !sorulan.has(y) && (y.can_do.includes(t) || y.dil_noktasi.includes(t))).length;
    const dar = [...hd.can_do, ...hd.dil_noktasi].map((t) => [t, kalan(t)] as const).filter(([t, n]) => n < cikis && say((y) => y.can_do.includes(t) || y.dil_noktasi.includes(t)) >= (t.startsWith("cd:") ? cdMin : dnMin));
    if (dar.length) hata.push(`seviye tespiti ${hd.w}. hafta: derin seçimden sonra çıkış yoklamasına en az ${cikis} sorulmamış madde kalmıyor (maddeler başka hedeflerle paylaşılıyor; bu hedefe ayrı madde ekle): ${dar.map(([t, n]) => `${t} (${n})`).join(", ")}`);
  }
  return { hata, uyari, cozulen, cekirdek, muaf: [...muaf] };
}

/** Havuz dosyası yoksa null (henüz yazılmadı: sessiz); varsa kaynak dizini + kurallar */
export function tespitYukle(dir: string, politika: TespitPolitika = TESPIT_POLITIKA): TespitSonuc | null {
  const f = join(dir, TESPIT_DOSYA);
  if (!existsSync(f)) return null;
  const hata: string[] = [];
  const havuz = jsonOku(f, hata, TESPIT_DOSYA);
  if (havuz === null) return { hata, uyari: [], cozulen: [] };
  const k = tespitKaynaklari(dir);
  const r = tespitDenetle({ havuz, kaynaklar: k.kaynaklar, gunler: k.gunler, denemeler: k.denemeler, politika });
  return { hata: [...k.hata, ...r.hata.map((x) => (x.startsWith("seviye tespiti") ? x : `${TESPIT_DOSYA}: ${x}`))], uyari: r.uyari, cozulen: r.cozulen, cekirdek: r.cekirdek, muaf: r.muaf };
}

/**
 * Derleme paketi (`tespit.json`; PR 2): çözülmüş maddeler havuz sırasıyla + çekirdek + hafta hedefleri ve kartları.
 * Hafta hedefleri doğrulayıcının kapsam kuralıyla aynı: günlerin can_do'su (sınav günü hariç), haftada ilk öğretilen dil noktası.
 * Kartlar: gün dosyası varsa `yeni_kartlar`, yoksa kesin tablo (`kesin`: gün → kartlar). Havuz yoksa ya da hatalıysa null.
 */
export function tespitPaketi(dir: string, adlar: ReadonlyMap<string, string>, kesin: Record<string, { kartlar: string[] }> = {}, politika: TespitPolitika = TESPIT_POLITIKA): TespitPaket | null {
  const t = tespitYukle(dir, politika);
  if (!t || t.hata.length) return null;
  const gunler = tespitKaynaklari(dir).gunler.filter((g) => g.level === "A1" && g.day >= 1 && g.day <= politika.a1_hafta * 7);
  const ilk = new Map<string, number>();
  for (const g of gunler) for (const d of g.dersler) if (!ilk.has(d)) ilk.set(d, haftaOf(g.day));
  const muaf = new Set(t.muaf ?? []);
  const haftalar = [...new Set(gunler.map((g) => haftaOf(g.day)))].sort((a, b) => a - b).map((w) => {
    const gw = gunler.filter((g) => haftaOf(g.day) === w);
    const kartlar: string[] = [];
    for (let d = (w - 1) * 7 + 1; d <= w * 7; d++) for (const k of gw.find((g) => g.day === d)?.yeni_kartlar ?? kesin[String(d)]?.kartlar ?? []) if (!kartlar.includes(k)) kartlar.push(k);
    return {
      hafta: w,
      can_do: gw.filter((g) => !g.sinav && g.can_do).map((g) => ({ id: g.can_do!, tr: g.can_do_tr ?? "", gun: g.day })),
      dil_noktasi: [...ilk].filter(([d, hw]) => hw === w && !muaf.has(d)).map(([d]) => ({ id: d, ad_tr: adlar.get(d) ?? d })),
      kartlar
    };
  });
  return { id: "tespit:a1:1", maddeler: t.cozulen, cekirdek: t.cekirdek ?? [], haftalar, muaf_dil_noktasi: [...muaf] };
}
