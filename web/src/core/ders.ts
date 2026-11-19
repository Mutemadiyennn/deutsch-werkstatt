/**
 * Temel ders akışı (#58 A5, Seans 2: "günün temel dersi ve cümle kurma"). Saf parçalar; ekran `screens/Ders.tsx`.
 * Sıra (önce duy, sonra parçala, sonra hatırla, en sonda bağımsız konuş — CLAUDE.md "Amaç"; phases/09):
 *   diyalog (önce altyazısız, sonra altyazılı) → tanıt (4'lük gruplar; her gruptan hemen sonra hatırlama turu:
 *   dinle → anlamını seç, Türkçe → Almancasını yaz) → tablo → anlama → kurma (boşluk, sıra, Türkçe → Almanca)
 *   → dönüştür ve cevap ver → dinleme → gerçek görev. Pasif "Anladım" yok.
 */
import type { Drill, TemelDers } from "@dw/shared";

export type DersAdim = "tanit" | "tablo" | "anlama" | "kurma" | "konusma" | "diyalog" | "dinleme" | "gorev";
export const DERS_ADIM_TR: Record<DersAdim, string> = {
  tanit: "Yeni kelimeler ve hatırla", tablo: "Tablo", anlama: "Anla", kurma: "Kur", konusma: "Söyle", diyalog: "Önce dinle", dinleme: "Dinle", gorev: "Dışarıda dene"
};
const ANLAMA: Drill["k"][] = ["pick"];
const KURMA: Drill["k"][] = ["gap", "order", "tr_de"];
const KONUSMA: Drill["k"][] = ["transform", "guided_response", "listen_and_respond"];

/** tanıtım grubu: 4 kart, ardından hatırlama turu (phases/09 madde 5: her 3–4 karttan sonra) */
export const TANIT_GRUP = 4;
export function adimlarDers(t: TemelDers): DersAdim[] {
  const out: DersAdim[] = [];
  if (t.dialogue) out.push("diyalog");
  out.push("tanit");
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
  // tanıtım: her grup iki alt adım (k çift: kartlar, k tek: hatırlama turu)
  if (a === "tanit") return Math.max(1, Math.ceil(t.teach.length / TANIT_GRUP)) * 2;
  if (a === "anlama" || a === "kurma" || a === "konusma") return maddeler(t, a).length;
  if (a === "dinleme") return t.listening.length;
  return 1;
}

/** `ilkBitti`: ders bir kez bittiyse "Tekrar çalış" sonrası da bitmiş sayılır (planlayıcı yeniden önermez) */
export interface DersIlerleme { s: number; k: number; dogru: number; toplam: number; bitti?: string; ilkBitti?: string }
export const DERS_BASLANGIC: DersIlerleme = { s: 0, k: 0, dogru: 0, toplam: 0 };
export const dersAnahtari = (id: string) => `ders:${id}`;
/** `sonuc`: tek madde (doğru/yanlış) ya da hatırlama turu sayacı {dogru, toplam} */
export function dersIleri(p: DersIlerleme, t: TemelDers, sonuc?: boolean | { dogru: number; toplam: number }, now = new Date()): DersIlerleme {
  const steps = adimlarDers(t);
  const n = altSayisi(t, steps[p.s]!);
  const sayac = sonuc === undefined ? {} : typeof sonuc === "boolean" ? { dogru: p.dogru + (sonuc ? 1 : 0), toplam: p.toplam + 1 } : { dogru: p.dogru + sonuc.dogru, toplam: p.toplam + sonuc.toplam };
  if (p.k + 1 < n) return { ...p, ...sayac, k: p.k + 1 };
  if (p.s + 1 < steps.length) return { ...p, ...sayac, s: p.s + 1, k: 0 };
  return { ...p, ...sayac, bitti: now.toISOString() };
}
/** Kayıtlı konum ders içeriğiyle uyuşmuyorsa baştan (içerik değişti); bitmiş ders bitmiş kalır */
export function dersKonum(p: DersIlerleme | undefined, t: TemelDers): DersIlerleme {
  if (!p) return { ...DERS_BASLANGIC };
  if (p.bitti) return p;
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
  const gosterilen = yakin(t.teach.slice(0, (grup + 1) * TANIT_GRUP).filter(uygun));
  // gösterilmiş uygun kart ikiden azsa (yalnızca ilk grupta olabilir) eksik, sonraki kartlardan tamamlanır
  const sirali = gosterilen.length >= 2 ? gosterilen : [...gosterilen, ...yakin(t.teach.slice((grup + 1) * TANIT_GRUP).filter(uygun))].slice(0, 2);
  const en = sirali.slice(0, Math.min(4, sirali.length));
  const k = (grup * 7 + i * 3) % Math.max(1, en.length);
  const opts = [x.tr, en[k], en[(k + 1) % en.length]].filter((o, j, a): o is string => !!o && a.indexOf(o) === j);
  const rot = (i + grup) % opts.length;
  return [...opts.slice(rot), ...opts.slice(0, rot)];
}
