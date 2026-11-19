/**
 * #58 B3: yerel kullanım ölçümü — kayıt ve izleme. Her şey cihazdaki `meta` tablosunda (`kullanim:<YYYY-MM-DD>`) kalır,
 * hiçbir sunucuya gitmez; 30 günden eskisi silinir. Yazımlar sırayla (aynı anda iki olay birbirini ezmez).
 */
import { getMeta, metaPrefix, setMeta, delMeta } from "../data/db.ts";
import { yerelGun } from "../core/gun.ts";
import { eskiMi, kullanimAnahtari, olayEkle, ozetle, rotaAdimi, type KullanimGun, type KullanimOlay, type KullanimOzet } from "../core/kullanim.ts";

let kuyruk: Promise<void> = Promise.resolve();
type Yeni = KullanimOlay extends infer O ? O extends KullanimOlay ? Omit<O, "at"> : never : never;

export function kullanimYaz(o: Yeni, now = new Date()): Promise<void> {
  const p = kuyruk.then(async () => {
    const gun = yerelGun(now), k = kullanimAnahtari(gun);
    const g = (await getMeta<KullanimGun>(k)) ?? { gun, olaylar: [] };
    await setMeta(k, olayEkle(g, { ...o, at: now.toISOString() } as KullanimOlay));
  });
  kuyruk = p.catch(() => {});
  return p;
}
/** Öğrencinin kendi kurduğu cümle (gün sonu özetinde gösterilir) */
export const cumleKaydet = (metin: string, kaynak: string) => kullanimYaz({ t: "cumle", metin, kaynak });
export const adimBittiKaydet = (adim: string) => kullanimYaz({ t: "bitti", adim });

export async function kullanimOku(gun = yerelGun(new Date())): Promise<KullanimOzet> {
  await kuyruk;
  return ozetle((await getMeta<KullanimGun>(kullanimAnahtari(gun))) ?? { gun, olaylar: [] });
}
/** Son N gün (yeniden eskiye) */
export async function kullanimGunleri(n = 7, now = new Date()): Promise<KullanimOzet[]> {
  await kuyruk;
  const out: KullanimOzet[] = [];
  for (let i = 0; i < n; i++) { const d = new Date(now); d.setDate(d.getDate() - i); const gun = yerelGun(d); out.push(ozetle((await getMeta<KullanimGun>(kullanimAnahtari(gun))) ?? { gun, olaylar: [] })); }
  return out;
}

/** Ekrandaki ilerleme: üst çubuk ("7/20") ya da ekranın konumu (data-pos) */
function ekranNoktasi(): string | undefined {
  const b = document.querySelector<HTMLElement>("[data-test=ilerleme]");
  if (b?.getAttribute("aria-valuenow")) return `${b.getAttribute("aria-valuenow")}/${b.getAttribute("aria-valuemax")}`;
  return document.querySelector<HTMLElement>("[data-pos]")?.dataset.pos ?? undefined;
}

/**
 * Uygulama kabuğuna bağlanır: açılış (yüklemede ve 30 dk'dan uzun aradan sonra görünür olunca), adım ekranından çıkış
 * (rota değişimi ya da uygulamanın arka plana geçmesi). Kapatma fonksiyonu döner.
 */
export function kullanimIzle(rota: () => { name: string; id?: string; day?: number }): () => void {
  void kullanimYaz({ t: "ac" });
  void temizle();
  let gizlendi = 0;
  let onceki = rotaAdimi(rota());
  // nokta önbelleği: rota olayı geldiğinde yeni ekran çoktan çizilmiş olabilir; ilerleme çubuğu ya da ekran konumu her
  // değiştiğinde (MutationObserver) okunur — zamanlayıcı yok, nokta bir geride kalmaz (inceleme #93 P1-4)
  let sonNokta: string | undefined;
  // yalnızca adres hâlâ bu adımdaysa: başka adım ekranına geçerken yeni ekranın sayısı eski adıma yazılmaz
  const oku = () => { if (onceki && rotaAdimi(rota()) === onceki) { const n = ekranNoktasi(); if (n) sonNokta = n; } };
  const gozcu = typeof MutationObserver !== "undefined" ? new MutationObserver(oku) : null;
  gozcu?.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-valuenow", "data-pos"] });
  const cik = (adim: string | null, nokta?: string) => { if (adim) void kullanimYaz({ t: "cik", adim, nokta }); };
  const rotaDegisti = () => { const yeni = rotaAdimi(rota()); if (yeni === onceki) return; cik(onceki, sonNokta); onceki = yeni; sonNokta = undefined; oku(); };
  const gorunurluk = () => {
    if (document.visibilityState === "hidden") { gizlendi = Date.now(); oku(); cik(onceki, sonNokta); }
    else if (gizlendi && Date.now() - gizlendi > 30 * 60_000) void kullanimYaz({ t: "ac" });
  };
  addEventListener("hashchange", rotaDegisti, true);
  document.addEventListener("visibilitychange", gorunurluk);
  return () => { gozcu?.disconnect(); removeEventListener("hashchange", rotaDegisti, true); document.removeEventListener("visibilitychange", gorunurluk); };
}

async function temizle() {
  try { for (const { key } of await metaPrefix<unknown>("kullanim:")) if (eskiMi(key.slice("kullanim:".length))) await delMeta(key); } catch { /* bir sonraki açılışta */ }
}
