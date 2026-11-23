/**
 * AKIS AK-6: akış gününün ilerleme kaydı, saf. Anahtar `akis:<gün>`; plan konumla birlikte saklanır, yarıda kalan gün aynı planla sürer.
 * AK-10 4. adımın İSKELETİ (PR'sız): durak oynatıcısı (`screens/Akis.tsx`) bu modülü kullanır.
 *  - Bir durak bitince eşdeğer eski anahtar da yazılır (Yol, Bugün, XP, seri, gün sonu, gün sınavı değişmeden çalışsın).
 *  - Halkada yanlış yapılan kart aynı halkada bir kez daha gelir (AK-2; TARGET3b eşleştir notu): durağın sonuna "tekrar" adımı eklenir.
 */
import type { Adim, Durak, GunPlani } from "./akis.ts";

export interface AdimSonucu { adim: string; kart: string; dogru: boolean }
export interface AkisKaydi {
  surum: 1;
  plan: GunPlani;
  /** şimdiki durak ve adım dizini */
  durak: number; adim: number;
  sonuclar: AdimSonucu[];
  /** halka sonunda bir kez daha gelecek kartlar (durak kimliği → kartlar); bir kart bir halkada en çok bir kez geri gelir */
  geri: Record<string, string[]>;
  /** biten durakların kimlikleri (eski anahtar yazımı bir kez) */
  biten: string[];
}

/** adımsız durağın geçiş adımı mı */
export const durakGecisi = (a: Adim) => a.id.endsWith(":git");

export const akisAnahtar = (gun: number) => `akis:${gun}`;

export const yeniKayit = (plan: GunPlani): AkisKaydi => ({ surum: 1, plan, durak: 0, adim: 0, sonuclar: [], geri: {}, biten: [] });

/** Durağın oynanacak adımları: planlananlar + bu halkada yanlış yapılan kartların bir kez daha gelişi */
export function durakAdimlari(k: AkisKaydi, d: Durak): Adim[] {
  // adımsız durak (ses, video, prova, okuma, dil): var olan ekrana giden tek geçiş adımı (`:git`); bağlama 4b'de
  if (!d.adimlar.length) return [{ id: `${d.id}:git`, tur: "hatirlat", kip: "gor", kartlar: [], kaynak: "halka", sn: 0, neden: d.neden }];
  const geri = k.geri[d.id] ?? [];
  if (d.tur !== "halka" || !geri.length) return d.adimlar;
  return [...d.adimlar, ...geri.map((kart, i): Adim => ({ id: `${d.id}:geri${i}`, tur: "listen_meaning", kip: "duy", kartlar: [kart], kaynak: "halka", sn: 12, neden: "bu halkada yanlış yaptın; bir kez daha" }))];
}

export function simdiki(k: AkisKaydi): { durak: Durak; adim: Adim; sira: number; toplam: number } | null {
  const d = k.plan.duraklar[k.durak];
  if (!d) return null;
  const a = durakAdimlari(k, d);
  const adim = a[k.adim];
  return adim ? { durak: d, adim, sira: k.adim, toplam: a.length } : null;
}

/** Eski ilerleme anahtarı (AK-6 uyumluluk): son halka → m1:bahce:<g>; dil → ders:<id>; video → m1:medya:<id>; prova/okuma aynen */
export function eskiAnahtar(plan: GunPlani, d: Durak): string | null {
  // ders, prova, okuma ve medya anahtarlarını kendi ekranları yazar (akış yalnız Bahçe ve gün anahtarını yazar)
  // istisna: dil noktası durağının (`ders:gr:…`, `ders:dn:…`) kendi ekranı yok; bitişini akış yazar (sonraki günlerin bitenDersler'i)
  if (d.eski_anahtar && /^ders:(gr|dn):/.test(d.eski_anahtar)) return d.eski_anahtar;
  if (d.eski_anahtar && /^(ders|m1:prova|m1:okuma|m1:medya):/.test(d.eski_anahtar)) return null;
  if (d.eski_anahtar) return d.eski_anahtar;
  if (d.tur === "halka") { const son = [...plan.duraklar].reverse().find((x) => x.tur === "halka"); return son?.id === d.id ? `m1:bahce:${plan.gun}` : null; }
  return null;
}

/**
 * Adım sonucu işlenir ve sıradaki adıma geçilir. Dönen `yazilacak`: bu geçişte biten durağın eski anahtarı (çağıran ilerleme deposuna yazar).
 * Halka adımında yanlış kart, o halkada daha önce geri gelmediyse durağın sonuna eklenir; geri gelen adımın yanlışı yeniden eklenmez.
 */
export function ilerle(k: AkisKaydi, sonuc: { kart: string; dogru: boolean }[]): { kayit: AkisKaydi; yazilacak: string | null; bitti: boolean } {
  const s = simdiki(k);
  if (!s) return { kayit: k, yazilacak: null, bitti: true };
  const sonuclar = [...k.sonuclar, ...sonuc.map((x) => ({ adim: s.adim.id, ...x }))];
  const geri = { ...k.geri };
  if (s.durak.tur === "halka" && !s.adim.id.includes(":geri")) {
    const g = [...(geri[s.durak.id] ?? [])];
    for (const x of sonuc) if (!x.dogru && !g.includes(x.kart)) g.push(x.kart);
    geri[s.durak.id] = g;
  }
  const ara: AkisKaydi = { ...k, sonuclar, geri };
  const toplam = durakAdimlari(ara, s.durak).length;
  if (k.adim + 1 < toplam) return { kayit: { ...ara, adim: k.adim + 1 }, yazilacak: null, bitti: false };
  const yazilacak = k.biten.includes(s.durak.id) ? null : eskiAnahtar(k.plan, s.durak);
  const sonraki: AkisKaydi = { ...ara, durak: k.durak + 1, adim: 0, biten: [...k.biten, s.durak.id] };
  return { kayit: sonraki, yazilacak, bitti: sonraki.durak >= k.plan.duraklar.length };
}

/** Seans ilerlemesi (TARGET3b üst hap ve Odak halkası tek kaynak, K9): seans başına biten/toplam durak */
export function seansDurumu(k: AkisKaydi): { seans: number; biten: number; toplam: number }[] {
  const m = new Map<number, { biten: number; toplam: number }>();
  for (const d of k.plan.duraklar) { const x = m.get(d.seans) ?? { biten: 0, toplam: 0 }; x.toplam++; if (k.biten.includes(d.id)) x.biten++; m.set(d.seans, x); }
  return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([seans, x]) => ({ seans, ...x }));
}

/** Halka sonu (TARGET3b 6): halkanın her kartı için dört kip noktası (gördün, duydun, kurdun, söyledin) — doğru yapılan adımlardan */
export function halkaOzeti(k: AkisKaydi, d: Durak): { kart: string; kip: Record<"gor" | "duy" | "kur" | "soyle", boolean> }[] {
  const adimlar = new Map(durakAdimlari(k, d).map((a) => [a.id, a]));
  const kartlar = [...new Set(d.adimlar.filter((a) => a.tur === "tanit").flatMap((a) => a.kartlar))];
  return kartlar.map((kart) => {
    const kip = { gor: false, duy: false, kur: false, soyle: false };
    for (const r of k.sonuclar) { const a = adimlar.get(r.adim); if (a && r.kart === kart && r.dogru) kip[a.kip] = true; }
    return { kart, kip };
  });
}
