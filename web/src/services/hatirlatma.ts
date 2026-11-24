/**
 * Günlük hatırlatma (PM-121 md. 3.3): v1 kapanınca akşam hatırlatmasını v2 devralır. iPhone kabuğunun yerel bildirimi
 * (Capacitor LocalNotifications; mola bildirimiyle aynı köprü), sunucu yok. Günde tek, akşam; bugün hedefinin yarısını
 * geçtiysen bugünkü atlanır. Ben → Çalışma düzenim'den kapatılır ya da saati değişir. Tarayıcıda (kabuk yok) hiçbir şey yapmaz.
 * v1'in kurduğu bildirimler (7101–7107 ve 21:30 uyarısı 7200) aynı kimliklerle silinir: iki hatırlatma birden gelmez.
 */
import { getMeta, setMeta, focusRange } from "../data/db.ts";
import { localDate } from "../core/focus.ts";

export type HatirlatmaAyar = { acik: boolean; saat: string };
export const HATIRLATMA_VARSAYILAN: HatirlatmaAyar = { acik: true, saat: "19:30" };
/** akşam saatleri (tek hatırlatma, akşam) */
export const HATIRLATMA_SAATLERI = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] as const;
/** v1 ile aynı kimlikler (7101 + gün, 7200 = v1'in seri uyarısı); v2 7200'ü kurmaz, yalnız siler */
const GUN_ID = 7101;
const KIMLIKLER = [...Array.from({ length: 7 }, (_, i) => GUN_ID + i), 7200];
const GUN = 7;

/** öğrenciye dönük kısa metinler (ad yok, emoji yok); güne göre döner */
export const HATIRLATMA_METIN: readonly (readonly [string, string])[] = [
  ["Bugünkü adımın hazır", "Birkaç dakika yeter: aç, kaldığın yerden devam et."],
  ["Guten Abend!", "Bugün kısa bir tur: dinle, sonra bir cümle söyle."],
  ["Kısa bir tur yeter", "En zor kısım başlamak. Bugünkü ilk adımı aç, gerisi gelir."],
  ["Bugün bir şey söyle", "Almanca konuştukça donma azalır. Bugün birkaç cümle kur."],
  ["Yarın kolaylaşsın", "Bugün kısa bir tekrar, yarın daha az unutmak demek."],
];

export type Bildirim = { id: number; title: string; body: string; schedule: { at: Date; allowWhileIdle: boolean } };

/** saf: kurulacak bildirimler. Kapalıysa boş; bugünkü saat geçtiyse ya da bugün yeterince çalıştıysan bugünkü yok; 7 günlük pencere. */
export function hatirlatmaPlani(simdi: Date, ayar: HatirlatmaAyar, bugunYeter: boolean): Bildirim[] {
  if (!ayar.acik) return [];
  const m = /^(\d{1,2}):(\d{2})$/.exec(ayar.saat);
  const [hh, mm] = m ? [Number(m[1]), Number(m[2])] : [19, 30];
  const out: Bildirim[] = [];
  for (let d = 0; d < GUN; d++) {
    const at = new Date(simdi); at.setDate(simdi.getDate() + d); at.setHours(hh, mm, 0, 0);
    if (at <= simdi || (d === 0 && bugunYeter)) continue;
    const [title, body] = HATIRLATMA_METIN[(at.getDate() + d) % HATIRLATMA_METIN.length]!;
    out.push({ id: GUN_ID + d, title, body, schedule: { at, allowWhileIdle: true } });
  }
  return out;
}

type LN = {
  cancel?: (o: { notifications: { id: number }[] }) => Promise<unknown>;
  checkPermissions?: () => Promise<{ display?: string }>;
  requestPermissions?: () => Promise<{ display?: string }>;
  schedule: (o: { notifications: Bildirim[] }) => Promise<unknown>;
};
const eklenti = (): LN | undefined => (globalThis as any).Capacitor?.Plugins?.LocalNotifications;

/** kabukta bildirim eklentisi var mı (yoksa ayar satırı da gösterilmez) */
export const hatirlatmaVar = () => !!eklenti();

/** v1'in ayarı (aynı kökte `localStorage["dw-werkstatt-v2"].state.remind`: "off" ya da "HH:MM"); yoksa ya da okunamazsa null */
export function v1Ayari(ham: string | null): HatirlatmaAyar | null {
  try {
    const r = ham ? JSON.parse(ham)?.state?.remind : undefined;
    if (r === "off") return { ...HATIRLATMA_VARSAYILAN, acik: false };
    if (typeof r === "string" && (HATIRLATMA_SAATLERI as readonly string[]).includes(r)) return { acik: true, saat: r };
    return null;
  } catch { return null; }
}

/** ayar; v2'de kayıt yoksa bir kez v1'inkinden (v1'de kapattıysa kapalı başlar, saat listedeyse o saat), sonra kaydedilir */
export async function hatirlatmaAyar(): Promise<HatirlatmaAyar> {
  const a = await getMeta<Partial<HatirlatmaAyar>>("hatirlatma");
  if (a) return { ...HATIRLATMA_VARSAYILAN, ...a };
  let ham: string | null = null;
  try { ham = globalThis.localStorage?.getItem("dw-werkstatt-v2") ?? null; } catch { /* erişim yok */ }
  const y = v1Ayari(ham) ?? HATIRLATMA_VARSAYILAN;
  await setMeta("hatirlatma", y);
  return y;
}

/** bildirim izni (kart "izin kapalı" satırı için); kabuk yoksa null */
export async function hatirlatmaIzni(): Promise<string | null> {
  try { return (await eklenti()?.checkPermissions?.())?.display ?? null; } catch { return null; }
}

/** ayarı kaydeder ve bildirimleri hemen yeniden kurar */
export async function hatirlatmaKaydet(a: HatirlatmaAyar, gunlukHedefDk: number) {
  await setMeta("hatirlatma", a);
  await hatirlatmaKur(gunlukHedefDk);
}

let kuruluyor: Promise<void> | null = null;
/** eskileri siler, 7 günlük pencereyi yeniden kurar. Açılışta ve uygulama arka plana geçerken çağrılır; hata sessiz. */
export function hatirlatmaKur(gunlukHedefDk: number, simdi = new Date()): Promise<void> {
  // üst üste çağrılar (görünürlük + ayar) sırayla: iki kurulum birbirinin bildirimini silmesin
  const onceki = kuruluyor ?? Promise.resolve();
  const p = onceki.then(() => kur(gunlukHedefDk, simdi)).catch(() => undefined);
  const q: Promise<void> = p.finally(() => { if (kuruluyor === q) kuruluyor = null; });
  kuruluyor = q;
  return p;
}

async function kur(gunlukHedefDk: number, simdi: Date) {
  const L = eklenti(); if (!L) return;
  // önce plan hesaplanır, silme ile kurma art arda gelir: arka plana geçerken iOS uygulamayı arada askıya alırsa pencere boş kalmasın
  const ayar = await hatirlatmaAyar();
  let plan: Bildirim[] = [];
  if (ayar.acik && (await izinVar(L))) {
    const bugun = localDate(simdi.getTime());
    const gun = (await focusRange(bugun, bugun))[0];
    plan = hatirlatmaPlani(simdi, ayar, !!gun && gun.focusSec >= (gunlukHedefDk * 60) / 2);
  }
  await L.cancel?.({ notifications: KIMLIKLER.map((id) => ({ id })) });
  if (plan.length) await L.schedule({ notifications: plan });
}

async function izinVar(L: LN): Promise<boolean> {
  const izin = (await L.checkPermissions?.())?.display;
  if (izin === "granted") return true;
  // izin bir kez sorulur; reddedildiyse bir daha sorulmaz (iOS zaten ikinci kez göstermez)
  if (izin === "denied" || (await getMeta<boolean>("hatirlatma_soruldu"))) return false;
  await setMeta("hatirlatma_soruldu", true);
  return (await L.requestPermissions?.())?.display === "granted";
}
