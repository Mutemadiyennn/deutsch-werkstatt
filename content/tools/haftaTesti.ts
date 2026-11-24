/**
 * Hafta sonu testleri (PM-108 B md. 2, PR B-3): `content/v2/m1/hafta-sonu-testi-HH.json` (1. hafta eski adla `hafta-sonu-testi.json`)
 * → hafta → { id, maddeler }. Uygulama haftanın son günü bitince kupa düğümünden açar (`#/hafta/<H>`).
 * Okunamayan ya da biçimi bozuk dosya HATA (sessizce düşmez; derleme durur). İnceleme alanı ve notlar pakete girmez.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Drill } from "../../packages/shared/src/content.ts";
import { bilinmeyenler, type KumeDizini } from "../../packages/shared/src/kume.ts";

export const HaftaTestiDosya = z.object({ id: z.string(), maddeler: z.array(Drill).min(1) });
/** Test maddesinin sınadığı "yapabiliyorum" cümlesi (#243 PM finali takip a): haftanın bir gününün `can_do` kimliği */
export interface Beceri { gun: number; id: string; tr: string; maddeler: string[] }
export type HaftaTestiPaket = Record<string, { id: string; maddeler: Drill[]; /** kaynak dosyadaki açık `can_do` bağları (madde → kimlik) */ bag?: Record<string, string>; beceriler?: Beceri[] }>;

export function haftaTestleri(m1Kok: string): HaftaTestiPaket {
  if (!existsSync(m1Kok)) return {};
  const out: HaftaTestiPaket = {};
  for (const f of readdirSync(m1Kok).sort()) {
    const m = /^hafta-sonu-testi(?:-(\d{2}))?\.json$/.exec(f);
    if (!m) continue;
    const hafta = m[1] ? Number(m[1]) : 1;
    if (hafta < 1 || hafta > 52) throw new Error(`${f}: hafta 1–52 olmalı`);
    const r = HaftaTestiDosya.safeParse(JSON.parse(readFileSync(join(m1Kok, f), "utf8")));
    if (!r.success) throw new Error(`${f}: hafta sonu testi biçimi bozuk: ${r.error.issues.slice(0, 3).map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    // iki ad aynı haftayı verirse (hafta-sonu-testi.json + hafta-sonu-testi-01.json) yeni ad kazanır
    if (out[String(hafta)] && !m[1]) continue;
    // açık bağ: maddenin isteğe bağlı `can_do` alanı (Drill şeması onu atar; ham dosyadan okunur)
    const ham = JSON.parse(readFileSync(join(m1Kok, f), "utf8")) as { maddeler: { id?: unknown; can_do?: unknown }[] };
    const bag = Object.fromEntries(ham.maddeler.filter((m) => typeof m.can_do === "string" && typeof m.id === "string").map((m) => [m.id as string, m.can_do as string]));
    out[String(hafta)] = { id: r.data.id, maddeler: r.data.maddeler, ...(Object.keys(bag).length ? { bag } : {}) };
  }
  return out;
}

/** Beceri eşlemesi için günün gereken alanları */
export interface BeceriGunu { day: number; can_do: { id: string; tr: string }; yeni_kartlar: string[]; dersler: string[] }

/** Maddenin beklenen cevapları, kanonik sırayla. Boşluklu maddede (seçme ya da yazma) istenen yalnız boşluğa giren sözcüktür:
 *  cümlenin geri kalanı verilmiştir (inceleme #244 2. tur: "Heute ist der ___ Mai." sein'e değil sıra sayısına bağlanır). */
function cevaplar(m: Drill): string[] {
  const o = m as Record<string, unknown>;
  const acc = (Array.isArray(o.accepted) ? o.accepted : []).filter((x): x is string => typeof x === "string").slice(0, 60);
  if (Array.isArray(o.opts) && typeof o.ans === "number" && typeof o.opts[o.ans] === "string") return [o.opts[o.ans] as string];
  return acc;
}

/** Türetmenin sonucu: madde → gün; `yedek` hiçbir günle bağlanamayıp haftanın son gününe düşen maddeler */
export interface BeceriSonuc { beceriler: Beceri[]; turetilen: string[]; yedek: string[] }

/**
 * Test maddelerini haftanın "yapabiliyorum" cümlelerine bağlar (#243 PM finali takip a). Önce açık bağ (`can_do` alanı; haftada
 * olmayan kimlik HATA). Yoksa yapay zekâsız türetme (inceleme #244 P1-1 ve 2. tur): maddenin beklenen cevabı (kabul listesinin
 * sırasıyla; boşlukta yalnız boşluğa giren sözcük) BU HAFTANIN kartlarına düşen sözcük içeren ilk seçenek alınır; madde, o
 * sözcüklerin kartlarının hepsinin tanıtıldığı İLK güne bağlanır. Yalnız kart sayılır: bir dersin biçimi önden göstermesi
 * (4. günün "bin"i) maddeyi o güne çekmez; eşlenemeyen sözcük, rakam ve önceki haftaların kartları sayılmaz. Hiçbir seçenek
 * bağlanamazsa haftanın son günü (`yedek`; derleme ve doğrulayıcı uyarı yazar). Önceki haftaların kartları `onceki` ile verilir.
 */
export function beceriEsle(maddeler: Drill[], gunler: BeceriGunu[], d: KumeDizini, bag: Record<string, string> = {}, onceki: { kart: string[]; ders: string[] } = { kart: [], ders: [] }): BeceriSonuc {
  const sirali = [...gunler].sort((a, b) => a.day - b.day);
  if (!sirali.length) return { beceriler: [], turetilen: [], yedek: [] };
  const cdGun = new Map(sirali.map((g) => [g.can_do.id, g] as const));
  const hafta = new Set(sirali.flatMap((g) => g.yeni_kartlar));
  const bos = new Set(onceki.kart);
  const bilgi = sirali.map((_, i) => new Set([...onceki.kart, ...sirali.slice(0, i + 1).flatMap((g) => g.yeni_kartlar)]));
  // bu haftanın tanıtılmamış kartına düşen sözcük sayısı (dersle gösterilen biçim sayılmaz: biten boş)
  const eksik = (a: string, kart: Set<string>) => bilinmeyenler(d, a, { kart, biten: new Set() }).filter((x) => x.tur === "kart" && x.adaylar?.some((id) => hafta.has(id))).length;
  const gunOf = new Map<string, BeceriGunu>();
  const turetilen: string[] = [], yedek: string[] = [];
  for (const m of maddeler) {
    const acik = bag[m.id];
    if (acik !== undefined) {
      const g = cdGun.get(acik);
      if (!g) throw new Error(`hafta sonu testi ${m.id}: can_do "${acik}" bu haftanın günlerinde yok (${[...cdGun.keys()].join(", ")})`);
      gunOf.set(m.id, g); continue;
    }
    turetilen.push(m.id);
    let gun: BeceriGunu | undefined;
    for (const a of cevaplar(m)) {
      if (!eksik(a, bos)) continue;            // bu haftanın kart sözcüğü yok (rakam, ad, çerçeve, önceki hafta): sonraki seçenek
      const i = bilgi.findIndex((k) => !eksik(a, k));
      if (i >= 0) { gun = sirali[i]; break; }
    }
    if (!gun) { yedek.push(m.id); gun = sirali[sirali.length - 1]!; }
    gunOf.set(m.id, gun);
  }
  const beceriler = sirali.filter((g) => [...gunOf.values()].includes(g))
    .map((g) => ({ gun: g.day, id: g.can_do.id, tr: g.can_do.tr, maddeler: maddeler.filter((m) => gunOf.get(m.id) === g).map((m) => m.id) }));
  return { beceriler, turetilen, yedek };
}

/**
 * Paketteki bütün haftalara beceri bağı (derleme ve doğrulayıcı aynı yoldan; inceleme #244 P2-4). Önceki haftaların kartları:
 * gün dosyası varsa `yeni_kartlar`/`dersler`, yoksa kesin tablo. Açık bağ hatası `hatalar`a, türetme bilgisi `uyarilar`a düşer.
 */
export function haftaBecerileri(test: HaftaTestiPaket, gunler: BeceriGunu[], kesin: Record<string, { kartlar: string[]; dersler: string[] }>, d: KumeDizini): { paket: HaftaTestiPaket; uyarilar: string[]; hatalar: string[] } {
  const paket: HaftaTestiPaket = {}, uyarilar: string[] = [], hatalar: string[] = [];
  for (const [h, t] of Object.entries(test)) {
    const H = Number(h), ilk = (H - 1) * 7 + 1, son = H * 7;
    const hGun = gunler.filter((g) => g.day >= ilk && g.day <= son);
    const onceGun = gunler.filter((g) => g.day < ilk);
    const onceKesin = Object.entries(kesin).filter(([g]) => Number(g) < ilk && !onceGun.some((x) => x.day === Number(g))).map(([, v]) => v);
    const onceki = { kart: [...onceGun.flatMap((g) => g.yeni_kartlar), ...onceKesin.flatMap((v) => v.kartlar)], ders: [...onceGun.flatMap((g) => g.dersler), ...onceKesin.flatMap((v) => v.dersler)] };
    try {
      const b = beceriEsle(t.maddeler, hGun, d, t.bag, onceki);
      if (b.turetilen.length) uyarilar.push(`${H}. hafta sonu testi: ${b.turetilen.length} maddede açık can_do yok, gün cevaptan türetildi${b.yedek.length ? `; bağlanamayan (son güne): ${b.yedek.join(", ")}` : ""}`);
      paket[h] = { id: t.id, maddeler: t.maddeler, beceriler: b.beceriler };
    } catch (e) { hatalar.push(String((e as Error).message)); paket[h] = { id: t.id, maddeler: t.maddeler, beceriler: [] }; }
  }
  return { paket, uyarilar, hatalar };
}
