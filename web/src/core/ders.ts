/**
 * Temel ders akışı (#58 A5, Seans 2: "günün temel dersi ve cümle kurma"). Saf parçalar; ekran `screens/Ders.tsx`.
 * Sıra (önce duy, sonra parçala, sonra hatırla, en sonda bağımsız konuş — CLAUDE.md "Amaç"; phases/09):
 *   diyalog (önce altyazısız, sonra altyazılı) → tanıt (4'lük gruplar; her gruptan hemen sonra hatırlama turu:
 *   dinle → anlamını seç, Türkçe → Almancasını yaz) → tablo → anlama → kurma (boşluk, sıra, Türkçe → Almanca)
 *   → dönüştür ve cevap ver → dinleme → gerçek görev. Pasif "Anladım" yok.
 */
import type { Drill, Lexeme, TemelDers } from "@dw/shared";

export type DersAdim = "tanit" | "tablo" | "anlama" | "kurma" | "konusma" | "diyalog" | "dinleme" | "gorev";
export const DERS_ADIM_TR: Record<DersAdim, string> = {
  tanit: "Yeni kelimeler ve hatırla", tablo: "Tablo", anlama: "Anla", kurma: "Kur", konusma: "Söyle", diyalog: "Önce dinle", dinleme: "Dinle", gorev: "Dışarıda dene"
};
const ANLAMA: Drill["k"][] = ["pick"];
const KURMA: Drill["k"][] = ["gap", "order", "tr_de"];
const KONUSMA: Drill["k"][] = ["transform", "guided_response", "listen_and_respond"];

/** tanıtım grubu: 4 kart, ardından hatırlama turu (phases/09 madde 5: her 3–4 karttan sonra) */
export const TANIT_GRUP = 4;

/* ---------- B5 (PM 7030294523, döngüsüzlük H4 §4): Bahçede bugün görülen kelime derste yeniden tanıtılmaz ---------- */
/** Bahçede bugün görülmüş kelime için derste tek soru: cümle içinde, seçmeli boşluk (Bahçe ve hatırlama turundan başka tür) */
export interface BahceSoru { id: string; de: string; tr: string; cevap: string; opts: string[] }
/** Dersin bugünkü görünümü: tanıtılacak kartlar (`teach`) ve Bahçeden gelenlerin tek sorusu (`bahce`) */
export type DersGorunum = TemelDers & { bahce: BahceSoru[]; bilinen: TemelDers["teach"] };
/**
 * Ders konumu kart dizinine göre saklanır; o yüzden plan ders başlarken bir kez kurulur ve ilerlemeyle birlikte saklanır
 * (`DersIlerleme.atla/bahce`). Ertesi gün yarıda kalan ders aynı planla sürer; konum kaymaz.
 */
export function dersGorunum(t: TemelDers | DersGorunum, p: Pick<DersIlerleme, "atla" | "bahce">): DersGorunum {
  if ("bahce" in t) return t;
  const a = new Set(p.atla ?? []);
  return { ...t, teach: a.size ? t.teach.filter((x) => !a.has(x.id)) : t.teach, bahce: p.bahce ?? [], bilinen: t.teach.filter((x) => a.has(x.id)) };
}
const bahceOf = (t: TemelDers) => (t as Partial<DersGorunum>).bahce ?? [];
const kelimeRe = (w: string) => new RegExp(`(?<![\\p{L}\\p{N}])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}])`, "u");
/**
 * `bugun`: öğrencinin bugün Bahçede gördüğü ve cevapladığı kelimeler (lexeme kimliği). Bu kartlar derste tanıtılmaz ve
 * hatırlama turunda sorulmaz; her biri için sözlük örneğinde kelimenin kendisi geçiyorsa EN ÇOK BİR seçmeli boşluk sorusu
 * kurulur (Bahçenin ilk gösterdiği örnekten başka bir cümle: sondan seçilir). Geçmiyorsa soru yok (en çok bir kez = sıfır olabilir).
 */
export function bahcePlani(t: TemelDers, bugun: ReadonlySet<string>, lex: ReadonlyMap<string, Lexeme> | null): { atla: string[]; bahce: BahceSoru[] } {
  // inceleme #146 P1-1: yalnızca KELİME kartı atlanır (kartın kendisi sözlük kelimesi); kelimeye bağlı cümle/kalıp kartları
  // ("Heute ist Montag.", "halb zehn") Bahçede görülmedi, derste tanıtılır. Sözlük yoksa hiçbir kart atlanmaz.
  const kelimeKarti = (x: Kart) => { const l = x.lexeme ? lex?.get(x.lexeme) : undefined; return !!l && nk(x.de) === nk(l.de); };
  const atlanan = t.teach.filter((x) => x.lexeme && bugun.has(x.lexeme) && kelimeKarti(x));
  const bahce: BahceSoru[] = [];
  atlanan.forEach((x, i) => {
    const l = x.lexeme ? lex?.get(x.lexeme) : undefined;
    const re = kelimeRe(x.de);
    // cümle bağlamı şart: boşluktan sonra en az iki kelime kalmalı (bütün cümle tek kart olan kalıplarda boşluk anlamsız)
    const baglam = (de: string) => (de.replace(re, " ").match(/\p{L}+/gu) ?? []).length >= 2;
    // cevap cümlede tek kez geçmeli (cümlenin başka yerinde görünürse soru cevabı ele verir)
    const tekKez = (de: string) => (de.match(new RegExp(re.source, "gu")) ?? []).length === 1;
    const ex = [...(l?.examples ?? [])].reverse().find((e) => re.test(e.de) && baglam(e.de) && tekKez(e.de));
    if (!ex) return;
    // çeldirici: aynı dersin öteki kartları (öğrenci bugün gördü ya da derste görecek), cevapla iç içe olmayanlar, yakındakiler önce
    const j = t.teach.indexOf(x);
    // tek doğru cevap (inceleme #146 P1-3): çeldiricinin Türkçesi cevabınkiyle aynı ya da iç içe olamaz (zwo/zwei, Stunde/Uhrzeit);
    // çeldirici cümlede de geçmez
    const trK = (s: string) => nk(s).split(" ").filter((w) => w.length >= 3);
    // ortak anlamlı kelime (≥3 harf) yeter: "saat (süre)" / "saat, vakit" Türkçe çeviride ayırt edilemez
    const icIce = (a: string, b: string) => { const q = trK(b); return nk(a) === nk(b) || trK(a).some((w) => q.includes(w)); };
    const uygun = t.teach.filter((y) => y !== x && y.de !== x.de && !y.de.includes(x.de) && !x.de.includes(y.de) && !re.test(y.de) && !kelimeRe(y.de).test(ex.de)
      && y.de.split(" ").length === x.de.split(" ").length && !icIce(y.tr, x.tr));
    const cel = [...uygun].sort((a, b) => Math.abs(t.teach.indexOf(a) - j) - Math.abs(t.teach.indexOf(b) - j)).slice(0, 2).map((y) => y.de);
    if (cel.length < 2) return;
    const opts = [x.de, ...cel];
    const rot = i % opts.length;
    bahce.push({ id: x.id, de: ex.de.replace(re, "___"), tr: ex.tr, cevap: x.de, opts: [...opts.slice(rot), ...opts.slice(0, rot)] });
  });
  return { atla: atlanan.map((x) => x.id), bahce };
}

export function adimlarDers(t: TemelDers): DersAdim[] {
  const out: DersAdim[] = [];
  if (t.dialogue) out.push("diyalog");
  if (t.teach.length || bahceOf(t).length) out.push("tanit");
  if (t.table) out.push("tablo");
  if (maddeler(t, "anlama").length) out.push("anlama");
  if (maddeler(t, "kurma").length) out.push("kurma");
  if (maddeler(t, "konusma").length) out.push("konusma");
  if (t.listening.length) out.push("dinleme");
  if (t.mission) out.push("gorev");
  return out;
}
/** Adımın maddeleri; kurma adımında boşluk → sıra → Türkçe-Almanca (kolaydan zora) */
export function maddeler(t: TemelDers, a: "anlama" | "kurma" | "konusma"): Drill[] {
  const kinds = a === "anlama" ? ANLAMA : a === "kurma" ? KURMA : KONUSMA;
  return kinds.flatMap((k) => t.drills.filter((d) => d.k === k));
}
/** Adımdaki alt madde sayısı (tanıtımda grup sayısı) */
export function altSayisi(t: TemelDers, a: DersAdim): number {
  // tanıtım: her grup iki alt adım (k çift: kartlar, k tek: hatırlama turu); Bahçeden gelenlerin sorusu varsa en sonda bir alt adım
  if (a === "tanit") return Math.ceil(t.teach.length / TANIT_GRUP) * 2 + (bahceOf(t).length ? 1 : 0);
  if (a === "anlama" || a === "kurma" || a === "konusma") return maddeler(t, a).length;
  if (a === "dinleme") return t.listening.length;
  return 1;
}

/** `ilkBitti`: ders bir kez bittiyse "Tekrar çalış" sonrası da bitmiş sayılır (planlayıcı yeniden önermez) */
/** `atla`/`bahce`: B5 planı (ders başlarken bir kez kurulur, konumla birlikte saklanır; bkz. `dersGorunum`) */
export interface DersIlerleme { s: number; k: number; dogru: number; toplam: number; bitti?: string; ilkBitti?: string; atla?: string[]; bahce?: BahceSoru[] }
/** Ders henüz başlamadı mı (plan yeniden kurulabilir: konum kaymaz) */
export const dersBaslamadi = (p: DersIlerleme) => !p.bitti && p.s === 0 && p.k === 0 && p.toplam === 0;
export const DERS_BASLANGIC: DersIlerleme = { s: 0, k: 0, dogru: 0, toplam: 0 };
export const dersAnahtari = (id: string) => `ders:${id}`;
/** `sonuc`: tek madde (doğru/yanlış) ya da hatırlama turu sayacı {dogru, toplam} */
export function dersIleri(p: DersIlerleme, t0: TemelDers, sonuc?: boolean | { dogru: number; toplam: number }, now = new Date()): DersIlerleme {
  const t = dersGorunum(t0, p);
  const steps = adimlarDers(t);
  const n = altSayisi(t, steps[p.s]!);
  const sayac = sonuc === undefined ? {} : typeof sonuc === "boolean" ? { dogru: p.dogru + (sonuc ? 1 : 0), toplam: p.toplam + 1 } : { dogru: p.dogru + sonuc.dogru, toplam: p.toplam + sonuc.toplam };
  if (p.k + 1 < n) return { ...p, ...sayac, k: p.k + 1 };
  if (p.s + 1 < steps.length) return { ...p, ...sayac, s: p.s + 1, k: 0 };
  return { ...p, ...sayac, bitti: now.toISOString() };
}
/** Kayıtlı konum ders içeriğiyle uyuşmuyorsa baştan (içerik değişti); bitmiş ders bitmiş kalır */
export function dersKonum(p: DersIlerleme | undefined, t0: TemelDers): DersIlerleme {
  if (!p) return { ...DERS_BASLANGIC };
  if (p.bitti) return p;
  const t = dersGorunum(t0, p);
  const steps = adimlarDers(t);
  if (!steps[p.s] || p.k >= altSayisi(t, steps[p.s]!)) return { ...DERS_BASLANGIC };
  return p;
}

/* ---------- hatırlama turu (inceleme #65 2. tur) ---------- */
const nk = (s: string) => s.toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}: ]+/gu, " ").replace(/\s+/g, " ").trim();
type Kart = TemelDers["teach"][number];
/**
 * "Türkçe → Almancasını yaz" sorusunun kabul listesi: kartın kendisi + aynı derste öğretilen eşdeğerler
 *  - aynı Türkçe istemli tr_de maddesinin kabul listesi (Wie viel Uhr ist es? = Wie spät ist es?)
 *  - tablo satırının ilk sütunu rakam/saatse ve kartın Türkçesine eşitse satırdaki öteki rakamsız hücreler
 *    (9:30 → halb zehn = neun Uhr dreißig)
 * Ad yuvası: ad girilmemiş profilde gösterim "(adın)" olur; kabulde {name} yuvasına döner (fillName doldurur).
 */
export function hatirlaKabul(t: TemelDers, x: Kart): string[] {
  const yuva = (s: string) => s.replace(/\(adın\)/g, "{name}");
  const out = [yuva(x.art ? `${x.art} ${x.de}` : x.de)];
  const ekle = (s: string) => { const y = yuva(s); if (!out.includes(y)) out.push(y); };
  for (const d of t.drills) if (d.k === "tr_de" && nk(d.tr) === nk(x.tr)) d.accepted.forEach(ekle);
  for (const r of t.table?.satirlar ?? []) {
    if (/\d/.test(r[0] ?? "") && nk(r[0]!) === nk(x.tr) && r.some((c) => nk(c) === nk(x.de))) r.slice(1).filter((c) => !/\d/.test(c)).forEach(ekle);
  }
  return out;
}
/**
 * "Dinle: ne demek?" çeldiricileri: yalnızca şimdiye kadar gösterilmiş kartlardan (öğrenci tanımadığı anlamı seçmesin),
 * doğru cevabın kelimelerini içermeyen ya da onun içinde kalmayan (saat ≠ "saat, vakit") ve biçimce en yakın (kelime sayısı) iki anlam.
 */
export function hatirlaSecenek(t: TemelDers, grup: number, x: Kart, i: number): string[] {
  const kelime = (s: string) => nk(s).split(" ").filter((w) => w.length >= 3);
  // fazla yakın: birinin kelimeleri ötekinin içinde (saat ↔ "saat, vakit")
  const altKume = (a: string[], b: string[]) => a.length > 0 && a.every((w) => b.includes(w));
  const ortak = (a: string, b: string) => { const x = kelime(a), y = kelime(b); return altKume(x, y) || altKume(y, x); };
  const uygun = (y: Kart) => y.tr !== x.tr && !ortak(y.tr, x.tr) && nk(y.tr) !== nk(x.tr);
  const sayi = (s: string) => nk(s).split(" ").length;
  const yakin = (l: Kart[]) => [...new Set(l.map((y) => y.tr))].sort((a, b) => Math.abs(sayi(a) - sayi(x.tr)) - Math.abs(sayi(b) - sayi(x.tr)));
  // B5: Bahçede bugün görülüp derste atlanan kartlar da bilinir; çeldirici olabilir (az kart kalınca seçenek eksik kalmasın)
  const bilinen = (t as Partial<DersGorunum>).bilinen ?? [];
  const gosterilen = yakin([...t.teach.slice(0, (grup + 1) * TANIT_GRUP), ...bilinen].filter(uygun));
  // gösterilmiş uygun kart ikiden azsa (yalnızca ilk grupta olabilir) eksik, sonraki kartlardan tamamlanır
  const sirali = gosterilen.length >= 2 ? gosterilen : [...gosterilen, ...yakin(t.teach.slice((grup + 1) * TANIT_GRUP).filter(uygun))].slice(0, 2);
  const en = sirali.slice(0, Math.min(4, sirali.length));
  const k = (grup * 7 + i * 3) % Math.max(1, en.length);
  const opts = [x.tr, en[k], en[(k + 1) % en.length]].filter((o, j, a): o is string => !!o && a.indexOf(o) === j);
  const rot = (i + grup) % opts.length;
  return [...opts.slice(rot), ...opts.slice(0, rot)];
}
