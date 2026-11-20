/**
 * AKIS.md AK-4: günün dizilişi — "Halka" planlayıcısı (AK-10 2. adım). Saf: ekran, depolama, saat yok (simdi girdi).
 * Gün → seans (4 × ≈25 dk, K1) → durak (5–9 dk) → adım. Kart, cümle, ders, klip ve FSRS aynen kalır; yalnız dizen katman.
 *
 * Değişmez kurallar (AK-2, AK-3, K3–K5, K8; özellik testleri akis.test.ts):
 *  1. art arda en çok 2 tanıtım (kelime ya da kalıp), hemen ardından kullanım;
 *  2. her kelime gün içinde ≥ 3 türde ve ≥ 2 cümlede; en az 2 kullanımı kendi halkasında, üçüncüsü sonraki durakta;
 *  3. halka içinde aynı tür art arda gelmez; aynı kip art arda en çok 2 (gevşetme sırası: önce kip, sonra tür — K4);
 *  4. görev cümlesinde (öğrencinin ürettiği) K(t) dışında sözcük 0 — hiç gevşemez; uymayan cümle adım olmaz;
 *  5. üretim adımında çerçeve sözcüğü daha önce en az 2 adımda görülmüş olmalı (K5), yoksa cümle yapboz olur;
 *  6. dersin kelime `teach`i kartın halkadaki tanıtımıdır; kalıp ilk uygun halkada; dil durağında kelime tanıtımı yok (K8).
 * Kısıt sağlanamazsa en yakın çözüm alınır ve `gevseme` kaydına yazılır; plan hiçbir zaman boş olmaz (BY-12).
 */
import POLICY from "../policy.json" with { type: "json" };
import { bilinmeyenler, kalipSecenekleri, toks, type Bilinen, type Gun, type Halka, type KumeDizini, type LearnerItem, type Lexeme, type TemelDers } from "@dw/shared";

export type Kip = "gor" | "duy" | "kur" | "soyle";
export type AdimTuru =
  | "tanit" | "kalip" | "listen_meaning" | "resimden_sec" | "dikte" | "article" | "colloc" | "eslestir"
  | "gap" | "order" | "tr_de" | "soyle" | "sahne" | "tekrar" | "ders_madde";
export const KIP: Record<AdimTuru, Kip> = {
  tanit: "gor", kalip: "gor", article: "gor", colloc: "gor", eslestir: "gor",
  listen_meaning: "duy", resimden_sec: "duy", dikte: "duy", sahne: "duy", tekrar: "duy",
  gap: "kur", order: "kur", tr_de: "kur", ders_madde: "kur", soyle: "soyle"
};
/** Tür başına tahmini saniye (`policy.akis.adim_sn` varsa o; cihaz ölçümüyle güncellenir, K3) */
const ADIM_SN_VARSAYILAN: Record<AdimTuru, number> = {
  tanit: 30, kalip: 35, listen_meaning: 12, resimden_sec: 14, dikte: 30, article: 8, colloc: 14, eslestir: 45,
  gap: 18, order: 25, tr_de: 22, soyle: 25, sahne: 75, tekrar: 15, ders_madde: 25
};
/** Gösterim adımı: öğrenci üretmez (K(t) dışında ≤ 1 sözcük, işaretli); öteki her cümleli adım görev adımıdır */
const GOSTERIM = new Set<AdimTuru>(["tanit", "kalip", "sahne", "listen_meaning", "resimden_sec", "eslestir", "article", "colloc"]);
const URETIM = new Set<AdimTuru>(["tr_de", "dikte", "soyle"]);

export interface Adim {
  id: string; tur: AdimTuru; kip: Kip; kartlar: string[]; cumle?: string;
  kaynak: "halka" | "ders" | "bahce" | "klip"; sn: number; neden: string;
  /** dersin öğesi (K8): kelime/kalıp `teach` ya da `drills` maddesi */
  ders?: { id: string; oge: string };
}
export type DurakTuru = "isinma" | "ses" | "halka" | "dil" | "video" | "prova" | "okuma" | "gunsonu";
export interface Durak {
  id: string; tur: DurakTuru; seans: number; title_tr: string; tahmini_dk: number; adimlar: Adim[];
  eski_anahtar?: string; neden: string; parca?: 1 | 2;
}
export interface Gevseme { kart?: string; kural: "kip" | "tur" | "cumle" | "kalip" | "kart_tur"; yer: string }
export interface GunPlani { gun: number; surum: 1; tohum: string; duraklar: Durak[]; toplam_dk: number; neden: string[]; gevseme: Gevseme[] }

export interface AkisPolitikasi {
  seans_dk: [number, number]; durak_dk: [number, number]; halka_kart: [number, number]; tanitim_art_arda: number;
  kelime_tur_min: number; kelime_cumle_min: number; kip_art_arda: number; isinma_dk: number; halka_tekrar: [number, number];
  cerceve_uretim_min: number; adim_sn?: Partial<Record<AdimTuru, number>>;
}
export const POLITIKA: AkisPolitikasi = POLICY.akis as unknown as AkisPolitikasi;

export interface PlanGirdi {
  gun: Gun & { halkalar: Halka[] };
  dersler: ReadonlyMap<string, TemelDers>;
  dizin: KumeDizini;
  items: ReadonlyMap<string, LearnerItem>;
  /** önceki günlerde tanıtılmış kartlar ve biten dersler (bugünkü dersler hariç) */
  oncekiKartlar: ReadonlySet<string>;
  bitenDersler: ReadonlySet<string>;
  tohum: string;
  simdi: Date;
  politika?: AkisPolitikasi;
}

/** Tohumlu, deterministik sayı üreteci (mulberry32); aynı girdi aynı planı verir (BY-2) */
function rng(tohum: string): () => number {
  let h = 1779033703 ^ tohum.length;
  for (let i = 0; i < tohum.length; i++) { h = Math.imul(h ^ tohum.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

type Aday = Omit<Adim, "id" | "kip" | "sn"> & { kip?: Kip };

export function planGun(g: PlanGirdi): GunPlani {
  const pol = g.politika ?? POLITIKA;
  const sn = (t: AdimTuru) => pol.adim_sn?.[t] ?? ADIM_SN_VARSAYILAN[t];
  const r = rng(g.tohum);
  const gun = g.gun;
  const gevseme: Gevseme[] = [];
  const neden: string[] = [];
  const lex = g.dizin.kartlar;
  const tanitilan = new Set(g.oncekiKartlar);
  const biten = new Set(g.bitenDersler);
  /** çerçeve sözcüğünün görüldüğü adım sayısı (K5) */
  const cerceveGorulen = new Map<string, number>();
  const cerceveGor = (cumle: string | undefined) => { for (const t of new Set(toks(cumle))) if (cerceveMi(g.dizin, t)) cerceveGorulen.set(t, (cerceveGorulen.get(t) ?? 0) + 1); };
  const uretimeHazir = (cumle: string) => toks(cumle).every((t) => !cerceveMi(g.dizin, t) || (cerceveGorulen.get(t) ?? 0) >= pol.cerceve_uretim_min);
  /** öğretilmiş kalıplar (halka `kaliplar` ve günün ders kalıpları, yerleştikçe): kartsız çerçeve sözcükleri bilinir (#168) */
  const ogretilenKalip: string[][] = [];
  const K = (): Bilinen => ({ kart: tanitilan, biten, kaliplar: ogretilenKalip });
  const gorevGecer = (de: string, haric: string[] = []) => bilinmeyenler(g.dizin, de, K(), haric).length === 0;
  const gosterimGecer = (de: string) => bilinmeyenler(g.dizin, de, K()).length <= 1;

  // --- K8: günün derslerini sınıfla ---
  const yeni = new Set(gun.yeni_kartlar);
  const teachKart = new Map<string, { ders: string; oge: string }>();
  const kaliplar: { ders: string; oge: string; de: string; yerlesti: boolean }[] = [];
  const dersMaddeleri: { ders: string; oge: string; de: string; kullanildi: boolean }[] = [];
  for (const id of gun.dersler) {
    const d = g.dersler.get(id); if (!d) continue;
    for (const t of d.teach) {
      if (t.lexeme && yeni.has(t.lexeme)) teachKart.set(t.lexeme, { ders: id, oge: t.id });
      else if (!t.lexeme && toks(t.de).length > 1) kaliplar.push({ ders: id, oge: t.id, de: t.de, yerlesti: false });
    }
    for (const m of d.drills) {
      const x = m as unknown as { id: string; k: string; de?: string; accepted?: string[] };
      const de = x.k === "gap" ? x.de?.replace(/___/g, x.accepted?.[0] ?? " ") : x.k === "order" ? x.accepted?.[0] ?? x.de : undefined;
      if (de) dersMaddeleri.push({ ders: id, oge: x.id, de, kullanildi: false });
    }
  }

  // --- yardımcılar: kartın cümleleri ---
  const kartCumleleri = (h: Halka, c: string): string[] => {
    const l = lex.get(c);
    const gc = h.gorev_cumleleri.filter((x) => x.kart === c).map((x) => x.de);
    const ex = (l?.examples ?? []).slice().sort((a, b) => Number(!!(b as { ilk?: boolean }).ilk) - Number(!!(a as { ilk?: boolean }).ilk)).map((e) => e.de);
    return [...gc, ...ex].filter((de, i, a) => a.indexOf(de) === i && kendiSozcugu(g.dizin, c, de));
  };
  const turleri = (l: Lexeme): AdimTuru[] => {
    const t: AdimTuru[] = ["listen_meaning"];
    if (l.img) t.push("resimden_sec");
    if (l.pos === "noun" && l.art) t.push("article");
    t.push("tr_de");
    return t;
  };

  // --- tekrar: vadesi gelen kartlar (ısınma + halka içi 1–2) ---
  const vadeli = [...g.items.values()]
    .filter((it) => it.kind === "lexeme" && g.oncekiKartlar.has(it.itemId) && [it.passive.fsrs?.due, it.active.fsrs?.due].some((d) => d && new Date(d) <= g.simdi))
    .sort((a, b) => (a.itemId < b.itemId ? -1 : 1)).map((it) => it.itemId);
  let vadeSira = 0;
  const tekrarAdimi = (yer: string): Aday | null => {
    if (vadeSira >= vadeli.length) return null;
    const c = vadeli[vadeSira++]!;
    return { tur: "tekrar", kartlar: [c], kaynak: "bahce", neden: `${lex.get(c)?.de ?? c}: tekrar zamanı geldi (${yer})` };
  };

  let adimNo = 0;
  const adim = (a: Aday, durak: string): Adim => ({ ...a, id: `${durak}:a${++adimNo}`, kip: a.kip ?? KIP[a.tur], sn: sn(a.tur) });

  // --- sıralama: kısıtları bozmayan en iyi aday; sağlanamazsa kip, sonra tür gevşer (K4) ---
  const sirala = (adaylar: Aday[], yer: string): Aday[] => {
    const out: Aday[] = [];
    // kural 1: kullanım, kartın tanıtımından önce gelmez; art arda en çok `tanitim_art_arda` tanıtım
    const tanitimli = new Set(adaylar.filter((a) => a.tur === "tanit").flatMap((a) => a.kartlar));
    const tanitildi = new Set<string>();
    const tanitimMi = (a: Aday) => a.tur === "tanit" || a.tur === "kalip";
    // cümlesinde geçen yeni kart da tanıtılmış olmalı (ders maddesi, sahne gibi kartsız adımlar dahil)
    const hazir = (a: Aday) => tanitimMi(a) || [...tanitimli].every((c) => tanitildi.has(c) || (!a.kartlar.includes(c) && !(a.cumle && kendiSozcugu(g.dizin, c, a.cumle))));
    const tanitimSiniri = (a: Aday) => tanitimMi(a) && out.length >= pol.tanitim_art_arda && out.slice(-pol.tanitim_art_arda).every(tanitimMi);
    const kalan = adaylar.slice();
    const kipSirasi: Kip[] = ["gor", "duy", "kur", "soyle"];
    while (kalan.length) {
      const son = out[out.length - 1], son2 = out[out.length - 2];
      const kipOf = (a: Aday) => a.kip ?? KIP[a.tur];
      const kipAsar = (a: Aday) => !!son && !!son2 && kipOf(son) === kipOf(a) && kipOf(son2) === kipOf(a);
      const turAyni = (a: Aday) => !!son && son.tur === a.tur;
      const puan = (a: Aday, i: number) => {
        let p = -i * 0.01; // girdi sırası (tanıtım → kullanım) korunur
        if (son && kipSirasi.indexOf(kipOf(a)) === (kipSirasi.indexOf(kipOf(son)) + 1) % 4) p += 1;
        if (son && a.kartlar.some((c) => son.kartlar.includes(c))) p -= 0.5;
        return p + r() * 0.001;
      };
      // kullanım, kartı tanıtılmadan gelmez: girdi sırasındaki ilk uygun adaylar arasından seç (ilk 4)
      const pencere = kalan.slice(0, Math.min(4, kalan.length)).map((a, i) => ({ a, i })).filter(({ a }) => hazir(a) && !tanitimSiniri(a));
      if (!pencere.length) { const i = kalan.findIndex((a) => hazir(a) && !tanitimSiniri(a)); pencere.push({ a: kalan[i >= 0 ? i : 0]!, i: i >= 0 ? i : 0 }); }
      const uygun = (f: (a: Aday) => boolean) => pencere.filter(({ a }) => f(a)).sort((x, y) => puan(y.a, y.i) - puan(x.a, x.i))[0];
      let sec = uygun((a) => !turAyni(a) && !kipAsar(a));
      if (!sec) { sec = uygun((a) => !turAyni(a)); if (sec) gevseme.push({ kart: sec.a.kartlar[0], kural: "kip", yer }); }
      if (!sec) { sec = pencere[0]!; gevseme.push({ kart: sec.a.kartlar[0], kural: "tur", yer }); }
      out.push(sec.a); kalan.splice(sec.i, 1);
      if (sec.a.tur === "tanit") for (const c of sec.a.kartlar) tanitildi.add(c);
    }
    return out;
  };

  // --- halkalar ---
  const ertelenen: Aday[] = [];          // K3: üçüncü kullanım sonraki durağa
  const kartTur = new Map<string, Set<AdimTuru>>(), kartCumle = new Map<string, Set<string>>();
  const say = (a: Aday) => { for (const c of a.kartlar) { if (!yeni.has(c)) continue; (kartTur.get(c) ?? kartTur.set(c, new Set()).get(c)!).add(a.tur); if (a.cumle) (kartCumle.get(c) ?? kartCumle.set(c, new Set()).get(c)!).add(a.cumle); } };
  const halkaDuraklari: Durak[] = [];
  gun.halkalar.forEach((h, hi) => {
    const durakId = `${h.id}`;
    const adaylar: Aday[] = [];
    // önceki halkadan ertelenen üçüncü kullanımlar (K3) halkanın kullanım öbeklerine dağıtılır: biri başta (ısındırır),
    // kalanı her öbeğin kullanımları arasına — aynı tür art arda yığılmaz
    const tasinan = ertelenen.splice(0);
    if (tasinan.length) adaylar.push(tasinan.shift()!);
    const kartlar = h.kartlar.slice();
    const obekSayisi = Math.ceil(kartlar.length / pol.tanitim_art_arda);
    // kartlar ikişer: tanıt, tanıt, kullanım… (kural 1)
    for (let i = 0; i < kartlar.length; i += pol.tanitim_art_arda) {
      const grup = kartlar.slice(i, i + pol.tanitim_art_arda);
      const tanit: Aday[] = [], kullan: Aday[] = [];
      for (const c of grup) {
        tanitilan.add(c);
        const l = lex.get(c);
        const cs = kartCumleleri(h, c);
        const ilk = cs.find((de) => gosterimGecer(de));
        if (!ilk) gevseme.push({ kart: c, kural: "cumle", yer: durakId });
        const t = teachKart.get(c);
        tanit.push({ tur: "tanit", kartlar: [c], cumle: ilk, kaynak: t ? "ders" : "halka", ...(t ? { ders: { id: t.ders, oge: t.oge } } : {}), neden: `${l?.de ?? c}: yeni kelime, hemen cümle içinde` });
        // kullanım adayları: kelime türleri + kapıdan geçen görev cümleleri (ilk cümle dışındakiler önce)
        const gorev = cs.filter((de) => gorevGecer(de));
        const sira = [...gorev.filter((de) => de !== ilk), ...gorev.filter((de) => de === ilk)];
        const secenek: Aday[] = [];
        const forms = (l?.forms ?? []).find((f) => gorevGecer(f.de.replace(/___/g, " "), toks(f.answer.replace(/…/g, " "))));
        if (forms) secenek.push({ tur: "gap", kartlar: [c], cumle: forms.de.replace(/___/g, forms.answer), kaynak: "halka", neden: `${l?.de}: cümlede boşluk` });
        if (sira[0] && toks(sira[0]).length >= 3) secenek.push({ tur: "order", kartlar: [c], cumle: sira[0], kaynak: "halka", neden: `${l?.de}: cümleyi kur` });
        for (const t2 of l ? turleri(l) : ["listen_meaning" as AdimTuru]) secenek.push({ tur: t2, kartlar: [c], kaynak: "halka", neden: `${l?.de}: ${t2 === "tr_de" ? "Almancasını söyle/yaz" : "anlamı"}` });
        const uretimCumle = sira.find((de) => de !== secenek.find((s) => s.tur === "order")?.cumle);
        if (uretimCumle) secenek.push({ tur: "dikte", kartlar: [c], cumle: uretimCumle, kaynak: "halka", neden: `${l?.de}: duyduğunu yaz` });
        // halka içinde 2 kullanım (biri cümleli), üçüncüsü ertelenir
        const cumleli = secenek.filter((s) => s.cumle && s.tur !== "dikte");
        const k1 = cumleli[0] ?? secenek[0]!;
        const k2 = secenek.find((s) => s !== k1 && s.tur !== k1.tur && KIP[s.tur] !== KIP[k1.tur] && !URETIM.has(s.tur)) ?? secenek.find((s) => s !== k1 && s.tur !== k1.tur) ?? secenek[0]!;
        kullan.push(k1, k2);
        // üçüncü kullanım: kalan türlerden, kartlar arasında dönüşümlü (hep TR→DE olmasın)
        const kalanTur = secenek.filter((s) => s.tur !== k1.tur && s.tur !== k2.tur);
        const tercih = kalanTur.filter((s) => URETIM.has(s.tur) || KIP[s.tur] === "duy" || s.cumle);
        const k3 = tercih.length ? tercih[(i + grup.indexOf(c)) % tercih.length] : kalanTur[0];
        if (k3) ertelenen.push({ ...k3, neden: `${k3.neden} (aralıklı hatırlama: sonraki durakta)` });
        else gevseme.push({ kart: c, kural: "kart_tur", yer: durakId });
      }
      adaylar.push(...tanit);
      // kalıp: parçaları bilinir olduğu anda (K8) — tanıtım sayısına girer; grupta yer varsa
      // halkanın kendi kalıpları (#165; TARGET3c "yeni kalıp"): halkanın ilk öbeğinde, tanıtımdan hemen sonra
      if (i === 0) for (const kp of h.kaliplar ?? []) {
        adaylar.push({ tur: "kalip", kartlar: [], cumle: kp.de, kaynak: "halka", neden: `kalıp: ${kp.tr}` });
        ogretilenKalip.push(...kalipSecenekleri(kp.de));
      }
      // dersin kalıbı: kalıbın kendi çerçeve sözcükleri öğretileceği için onlar sayılmaz; kartlı parçaları bilinir olduğu anda (K8)
      const kalipK = (de: string): Bilinen => ({ ...K(), kaliplar: [...ogretilenKalip, ...kalipSecenekleri(de)] });
      const kalip = tanit.length < pol.tanitim_art_arda ? kaliplar.find((k) => !k.yerlesti && bilinmeyenler(g.dizin, k.de, kalipK(k.de)).length === 0) : undefined;
      if (kalip) { kalip.yerlesti = true; ogretilenKalip.push(...kalipSecenekleri(kalip.de)); adaylar.push({ tur: "kalip", kartlar: [], cumle: kalip.de, kaynak: "ders", ders: { id: kalip.ders, oge: kalip.oge }, neden: "kalıp: parçalarını artık biliyorsun" }); }
      const pay = Math.ceil(tasinan.length / Math.max(1, obekSayisi - i / pol.tanitim_art_arda));
      adaylar.push(...sirala([...kullan, ...tasinan.splice(0, pay)], durakId));
    }
    adaylar.push(...tasinan.splice(0));
    // dersin bir maddesi (K8: üçüncü kaynak) — sözcükleri K(t) içindeyse
    const dm = dersMaddeleri.find((m) => !m.kullanildi && gorevGecer(m.de));
    if (dm) { dm.kullanildi = true; adaylar.push({ tur: "ders_madde", kartlar: [], cumle: dm.de, kaynak: "ders", ders: { id: dm.ders, oge: dm.oge }, neden: "dersin alıştırması: bildiğin sözcüklerle" }); }
    // halka içi tekrar 1–2 (AK-2 kural 6)
    for (let i = 0; i < pol.halka_tekrar[1]; i++) { const t = tekrarAdimi(durakId); if (t) adaylar.splice(Math.min(adaylar.length, 3 + i * 4), 0, t); }
    // eşleştir (4–6 çift) ve mini sahne (K6: önce ses)
    if (h.kartlar.length >= 4) adaylar.push({ tur: "eslestir", kartlar: h.kartlar.slice(0, 6), kaynak: "halka", neden: "halkanın kelimelerini anlamlarıyla eşleştir" });
    const sahne: Aday[] = [];
    if (h.sahne) sahne.push({ tur: "sahne", kartlar: h.kartlar.filter((c) => h.sahne!.satirlar.some((s) => kendiSozcugu(g.dizin, c, s.de))), cumle: h.sahne.satirlar.map((s) => s.de).join(" "), kaynak: "halka", neden: "kelimeler bir sahnede: önce dinle" });
    // üretim adımları K5'e göre: çerçeve sözcüğü ≥ 2 kez görülmediyse cümle yapboz olur
    const son: Adim[] = [];
    // mini sahne halkanın SON adımıdır (AK-2 kural 5)
    for (const a of [...sirala(adaylar, durakId), ...sahne]) {
      let b = a;
      if (b.cumle && URETIM.has(b.tur) && !uretimeHazir(b.cumle)) { b = { ...b, tur: "order", neden: `${b.neden} (çerçeve sözcükleri henüz az görüldü: yapboz)` }; gevseme.push({ kart: b.kartlar[0], kural: "kalip", yer: durakId }); }
      if (b.cumle && !GOSTERIM.has(b.tur) && !gorevGecer(b.cumle)) { gevseme.push({ kart: b.kartlar[0], kural: "cumle", yer: durakId }); continue; } // kapı hiç gevşemez: adım düşer
      cerceveGor(b.cumle);
      say(b);
      son.push(adim(b, durakId));
    }
    // aynı tür art arda kalmasın (yapboza dönen adım yüzünden): bir sonraki farklı türle yer değiştir
    // (yer değiştiren adım tanıtım değildir ve kartları i'den önce tanıtılmıştır: kural 1 bozulmaz)
    const tanitSirasi = (c: string) => son.findIndex((x) => x.tur === "tanit" && x.kartlar.includes(c));
    for (let i = 1; i < son.length; i++) if (son[i]!.tur === son[i - 1]!.tur) {
      const j = son.findIndex((x, k) => k > i && x.tur !== "tanit" && x.tur !== "kalip" && x.tur !== "sahne" && son[i]!.tur !== "sahne" && x.tur !== son[i]!.tur && x.tur !== son[i - 1]!.tur
        && x.kartlar.every((c) => tanitSirasi(c) < i) && h.kartlar.every((c) => !(x.cumle && kendiSozcugu(g.dizin, c, x.cumle)) || tanitSirasi(c) < i) && (k + 1 >= son.length || son[k + 1]!.tur !== son[i]!.tur) && son[k - 1]!.tur !== son[i]!.tur);
      if (j > 0) [son[i], son[j]] = [son[j]!, son[i]!];
    }
    halkaDuraklari.push({ id: durakId, tur: "halka", seans: 0, title_tr: h.title_tr, tahmini_dk: dk(son), adimlar: son, neden: `${hi + 1}. halka: ${h.kartlar.length} yeni kelime, kullanım ve sahne` });
  });
  // son halkadan kalan üçüncü kullanımlar gün sonuna (K3)
  const gunSonuEk = ertelenen.splice(0);

  // --- dil durağı (K8): tablo + kalan alıştırmalar + diyalog + dinleme + görev ---
  const dilParcalari: { id: string; adimlar: Adim[]; dk: number }[] = [];
  for (const id of gun.dersler) {
    const d = g.dersler.get(id); if (!d) continue;
    const ad: Adim[] = [];
    if (d.table) ad.push(adim({ tur: "ders_madde", kartlar: [], kaynak: "ders", ders: { id, oge: "tablo" }, neden: "tablo: kuralı bir bakışta gör" }, `dil:${id}`));
    for (const m of dersMaddeleri.filter((x) => x.ders === id && !x.kullanildi)) ad.push(adim({ tur: "ders_madde", kartlar: [], kaynak: "ders", ders: { id, oge: m.oge }, neden: "dersin alıştırması" }, `dil:${id}`));
    const x = d as unknown as { dialogue?: unknown; listening?: unknown[]; mission?: unknown };
    if (x.dialogue) ad.push(adim({ tur: "sahne", kartlar: [], kaynak: "ders", ders: { id, oge: "diyalog" }, neden: "diyalog: önce dinle" }, `dil:${id}`));
    for (const [i] of (x.listening ?? []).entries()) ad.push(adim({ tur: "listen_meaning", kartlar: [], kaynak: "ders", ders: { id, oge: `dinleme:${i}` }, neden: "dinleme" }, `dil:${id}`));
    if (x.mission) ad.push(adim({ tur: "soyle", kartlar: [], kaynak: "ders", ders: { id, oge: "gorev" }, neden: "görev: gerçek hayatta" }, `dil:${id}`));
    for (const k of kaliplar.filter((k) => k.ders === id && !k.yerlesti)) { gevseme.push({ kural: "kalip", yer: `dil:${id}` }); ad.unshift(adim({ tur: "kalip", kartlar: [], cumle: k.de, kaynak: "ders", ders: { id, oge: k.oge }, neden: "kalıp: halkada yer bulamadı" }, `dil:${id}`)); }
    dilParcalari.push({ id, adimlar: ad, dk: dk(ad) });
  }

  // --- duraklar ---
  const sabit = (tur: DurakTuru, id: string, title: string, dkk: number, eski: string | undefined, n: string): Durak => ({ id, tur, seans: 0, title_tr: title, tahmini_dk: dkk, adimlar: [], eski_anahtar: eski, neden: n });
  const isinmaAdim: Adim[] = [];
  const isinmaSn = pol.isinma_dk * 60;
  while (vadeSira < vadeli.length && isinmaAdim.reduce((a, x) => a + x.sn, 0) + sn("tekrar") <= isinmaSn) { const t = tekrarAdimi("ısınma"); if (t) isinmaAdim.push(adim(t, "isinma")); }
  const duraklar: Durak[] = [];
  if (isinmaAdim.length) duraklar.push({ ...sabit("isinma", `m1:${gun.day}:isinma`, "Isınma", dk(isinmaAdim), undefined, "dünden kalanlar: kısa tekrar"), adimlar: isinmaAdim });
  if (gun.sesler.length) duraklar.push(sabit("ses", `m1:${gun.day}:ses`, "Sesler", 4, undefined, "önce duy: kelimelerden önce sesleri ayırt et"));
  const H = halkaDuraklari;
  const dil = (): Durak[] => dilParcalari.flatMap((p) => {
    if (p.dk <= pol.durak_dk[1]) return [{ ...sabit("dil", `dil:${p.id}`, "Dil noktası", p.dk, `ders:${p.id}`, "yapı: bugünün kalıpları"), adimlar: p.adimlar }];
    const yarim = Math.ceil(p.adimlar.length / 2);
    return [
      { ...sabit("dil", `dil:${p.id}:1`, "Dil noktası", dk(p.adimlar.slice(0, yarim)), undefined, "yapı: tablo ve ilk kullanım"), adimlar: p.adimlar.slice(0, yarim), parca: 1 as const },
      { ...sabit("dil", `dil:${p.id}:2`, "Dil noktası (devam)", dk(p.adimlar.slice(yarim)), `ders:${p.id}`, "yapı: kısa hatırlatma ve kullanım"), adimlar: p.adimlar.slice(yarim), parca: 2 as const }
    ];
  });
  const dilD = dil();
  const dil1 = dilD.filter((d) => d.parca !== 2), dil2 = dilD.filter((d) => d.parca === 2);
  const video = gun.video ? [sabit("video", `video:${gun.video.id}`, "Video", Math.max(5, Math.min(9, Math.round((gun.video.sure_sn * 6) / 60))), `m1:medya:${gun.video.id}`, "gerçek insanlar konuşuyor")] : [];
  const prova = gun.prova ? [sabit("prova", `prova:${gun.day}`, "Konuşma provası", 7, `m1:prova:${gun.day}`, "bugünkü kelimelerle konuş")] : [];
  const okuma = gun.okuma_yazma ? [sabit("okuma", `okuma:${gun.day}`, "Okuma ve yazma", 7, `m1:okuma:${gun.day}`, "oku, sonra kısa yaz")] : [];
  const gsAdim = sirala(gunSonuEk, "gunsonu").map((a) => adim(a, "gunsonu"));
  for (const a of gsAdim) say(a);
  const gunsonu: Durak = { ...sabit("gunsonu", `gunsonu:${gun.day}`, "Gün sonu", Math.max(4, dk(gsAdim) + 4), `m1:gun:${gun.day}`, "bugün neyi yapabiliyorsun: 4 kısa madde"), adimlar: gsAdim };
  // örnek dizi (K1): ① ısınma · ses · h1 · dil-1 ② h2 · video · h3 ③ dil-2 · h4 · prova ④ h5 · okuma · gün sonu
  duraklar.push(...H.slice(0, 1), ...dil1, ...H.slice(1, 2), ...video, ...H.slice(2, 3), ...dil2, ...H.slice(3, 4), ...prova, ...H.slice(4), ...okuma, gunsonu);
  // son halka eski Bahçe anahtarını yazar (AK-6)
  const sonHalka = [...duraklar].reverse().find((d) => d.tur === "halka");
  if (sonHalka) sonHalka.eski_anahtar = `m1:bahce:${gun.day}`;

  // --- seanslar (K1): sırayla, dengeli dörde bölünür ---
  const toplam = duraklar.reduce((a, d) => a + d.tahmini_dk, 0);
  let birikim = 0;
  for (const d of duraklar) { d.seans = Math.min(4, Math.floor((birikim + d.tahmini_dk / 2) / (toplam / 4)) + 1); birikim += d.tahmini_dk; }

  // --- K3 denetimi: eksik kalan kart → neden kaydı ---
  for (const c of gun.yeni_kartlar) {
    if ((kartTur.get(c)?.size ?? 0) < pol.kelime_tur_min) gevseme.push({ kart: c, kural: "kart_tur", yer: "gün" });
    if ((kartCumle.get(c)?.size ?? 0) < pol.kelime_cumle_min) gevseme.push({ kart: c, kural: "cumle", yer: "gün" });
  }
  neden.push(`${gun.day}. gün: ${H.length} halka, ${duraklar.length} durak, ≈ ${Math.round(toplam)} dk`);
  return { gun: gun.day, surum: 1, tohum: g.tohum, duraklar, toplam_dk: Math.round(toplam), neden, gevseme };
}

const dk = (a: Adim[]) => Math.round((a.reduce((s, x) => s + x.sn, 0) / 60) * 10) / 10;
function cerceveMi(d: KumeDizini, t: string): boolean { const a = d.idx.get(t); return !!a && [...a].every((i) => d.cerceve.has(i)); }
/** Cümlede kartın kendi sözcüğü (artikel hariç) geçiyor mu */
function kendiSozcugu(d: KumeDizini, c: string, de: string): boolean {
  const l = d.kartlar.get(c); if (!l) return false;
  const art = new Set(toks(l.art));
  const y = [...(d.yuzey.get(c) ?? [])].filter((x) => !art.has(x));
  return toks(de).some((t) => y.includes(t));
}
