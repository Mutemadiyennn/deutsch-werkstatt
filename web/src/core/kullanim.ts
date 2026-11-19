/**
 * #58 B3: yerel kullanım ölçümü ve gün sonu özeti (saf mantık; kayıt services/kullanim.ts).
 * Ölçülenler cihazdan çıkmaz: günlük açılış sayısı, adımın bitirildiği ya da bırakıldığı nokta, öğrencinin kendi kurduğu
 * cümleler. Amaç öğretmen gözü: "hangi adımda bırakıyor?" sorusunun cevabı ve günün sonunda öğrenciye kendi ürünü.
 */
export type KullanimOlay =
  | { t: "ac"; at: string }
  /** adım ekranından çıkış (başka ekrana geçiş ya da uygulamayı kapatma); `nokta`: ekrandaki ilerleme ("7/20") */
  | { t: "cik"; adim: string; nokta?: string; at: string }
  | { t: "bitti"; adim: string; at: string }
  /** öğrencinin kendi kurduğu cümle (Bahçe "kendi cümlen", yazma görevi, prova) */
  | { t: "cumle"; metin: string; kaynak: string; at: string };

export interface KullanimGun { gun: string; olaylar: KullanimOlay[] }
export const KULLANIM_SINIR = 300;
export const kullanimAnahtari = (gun: string) => `kullanim:${gun}`;

/** Olay ekler; aynı adımdan art arda gelen çıkışlar tek kayıttır (son nokta kalır), günlük sınır aşılınca en eskiler düşer */
export function olayEkle(g: KullanimGun, o: KullanimOlay): KullanimGun {
  const son = g.olaylar[g.olaylar.length - 1];
  let olaylar = g.olaylar;
  if (o.t === "cik" && son?.t === "cik" && son.adim === o.adim) olaylar = olaylar.slice(0, -1);
  if (o.t === "cumle") {
    const metin = o.metin.trim().replace(/\s+/g, " ").slice(0, 280);
    if (!metin || olaylar.some((x) => x.t === "cumle" && x.metin === metin)) return g;
    o = { ...o, metin };
  }
  olaylar = [...olaylar, o];
  if (olaylar.length > KULLANIM_SINIR) olaylar = olaylar.slice(olaylar.length - KULLANIM_SINIR);
  return { ...g, olaylar };
}

export interface KullanimOzet {
  gun: string;
  acilis: number;
  bitenler: string[];
  /** son olayı çıkış olan (sonra bitmemiş) adımlar: bırakma noktası */
  birakilanlar: { adim: string; nokta?: string; at: string }[];
  cumleler: { metin: string; kaynak: string }[];
}
export function ozetle(g: KullanimGun): KullanimOzet {
  const son = new Map<string, KullanimOlay>();
  const bitenler: string[] = [];
  let acilis = 0;
  const cumleler: KullanimOzet["cumleler"] = [];
  for (const o of g.olaylar) {
    if (o.t === "ac") acilis++;
    else if (o.t === "cumle") cumleler.push({ metin: o.metin, kaynak: o.kaynak });
    else { son.set(o.adim, o); if (o.t === "bitti" && !bitenler.includes(o.adim)) bitenler.push(o.adim); }
  }
  const birakilanlar = [...son.values()].filter((o): o is Extract<KullanimOlay, { t: "cik" }> => o.t === "cik" && !bitenler.includes(o.adim))
    .map((o) => ({ adim: o.adim, nokta: o.nokta, at: o.at }));
  return { gun: g.gun, acilis, bitenler, birakilanlar, cumleler };
}

/** Gün sonu kartında gösterilecek cümle: en uzun (en çok emek), eşitse en yeni */
export function gununCumlesi(o: KullanimOzet): { metin: string; kaynak: string } | null {
  let en: KullanimOzet["cumleler"][number] | null = null;
  for (const c of o.cumleler) if (!en || c.metin.length >= en.metin.length) en = c;
  return en;
}

/** Rota adı → adım kimliği (adımXpVer kimlikleriyle aynı). Adım ekranı değilse null. */
export function rotaAdimi(r: { name: string; id?: string; day?: number }): string | null {
  switch (r.name) {
    case "garden": return r.day ? `bahce:${r.day}` : "bahce";
    case "ders": return r.id ? `ders:${r.id}` : null;
    case "m1medya": return r.id ? `medya:${r.id}` : null;
    case "okuma": return `okuma:${r.day ?? 1}`;
    case "prova": return `prova:${r.day ?? 1}`;
    default: return null;
  }
}

/** Adım kimliğini öğrencinin okuyacağı ada çevirir (Profil'deki kullanım tablosu) */
export function adimEtiketi(adim: string, basliklar: Record<string, string> = {}): string {
  const [tur, ...r] = adim.split(":"); const id = r.join(":");
  if (tur === "bahce") return id ? `Kelime Bahçesi (${id}. gün)` : "Kelime Bahçesi";
  if (tur === "ders") return basliklar[id] ? `Ders: ${basliklar[id]}` : "Temel ders";
  if (tur === "medya") return basliklar[id] ? `Video/ses: ${basliklar[id]}` : "Video ve sesler";
  if (tur === "okuma") return `Okuma ve yazma (${id}. gün)`;
  if (tur === "prova") return `Konuşma provası (${id}. gün)`;
  return adim;
}

/** Saklama: 30 günden eski kayıtlar silinir (yalnızca bu cihazda, öğretmen gözü için yeterli pencere) */
export const KULLANIM_GUN = 30;
export function eskiMi(gun: string, now = new Date()): boolean {
  const [y, m, d] = gun.split("-").map(Number);
  if (!y || !m || !d) return true;
  return (now.getTime() - new Date(y, m - 1, d).getTime()) / 86400_000 > KULLANIM_GUN;
}

/**
 * Bugün biten M1 günü: gün bitmiş ve bitiş kaydı (`m1:gun:<gün>`, ilk bitişte yazılır) bugünün tarihini taşıyor; kaydı henüz
 * olmayan bitmiş gün de bugün biter (plan şu an yazıyor). Eski bir günün adımını bugün tekrar etmek "N. gün bitti" demez
 * (inceleme #93 P1-2). En büyük gün döner.
 */
export function bugunBitenGun(gunler: { day: number; durum: string }[], bitisler: Record<number, string | undefined>, bugun: string): number | null {
  const yerel = (iso: string) => { const d = new Date(iso); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const g = gunler.filter((x) => x.durum === "bitti" && (!bitisler[x.day] || yerel(bitisler[x.day]!) === bugun)).map((x) => x.day);
  return g.length ? Math.max(...g) : null;
}
