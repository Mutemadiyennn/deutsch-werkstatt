/**
 * Gezinme kuralı (PM-133; tek kaynak, TASARIM §Gezinme). Salt mantık: hangi ekrandan nereye girildiğini tutar, X / geri
 * okunun ve "Sıradaki adım"ın hedefini giriş noktasından hesaplar.
 *  1. Dört kök (Bugün · Yol · Köy · Ben); alt sekme o kökün son konumunu açar (`sonKonum`).
 *  2. Geri oku aynı sekme içinde bir üst düzeye çıkar; başka sekmeye atlamaz (sekme değiştiren bağlantıda giriş tutulmaz).
 *  3. X (dersi/görevi kapat) öğrenciyi girdiği ekrana bırakır: hedef ekranın sabit "üst"ünden değil giriş noktasından.
 *  4. Tam ekran akışın (ders, sınav, tespit …) kendi içindeki üst adresi (ör. sınav bölümü → sınav günü) aynı ailede kalır.
 * Yığın: kökte boş; her yeni ekran {ekran, giris} olarak eklenir; yığında olan bir ekrana dönülünce üstündekiler düşer.
 */

export interface Sinif {
  /** sekme kökü (#/today, #/yol, #/koy, #/ben) */
  kok: boolean;
  /** tam ekran akış ailesi (sekme çubuğu yok); değilse null */
  aile: string | null;
  /** ekranın bağlı olduğu sekme */
  sekme: string;
}
export type Siniflandir = (hash: string) => Sinif;

export interface Cerceve { ekran: string; giris: string | null }
export interface Gezinme {
  yigin: Cerceve[];
  /** sekme → son açık (tam ekran olmayan) ekran ve o andaki yığın (sekmeye dönünce aynı yerden sürer) */
  sonKonum: Record<string, { hash: string; yigin: Cerceve[] }>;
}
export const BOS: Gezinme = { yigin: [], sonKonum: {} };

/** "#/", "" ve "#" Bugün sayılır; sondaki "/" düşer */
export function normal(h: string | null | undefined): string {
  const x = (h ?? "").replace(/^#?\/?/, "").replace(/\/+$/, "");
  return x ? `#/${x}` : "#/today";
}

/** `eski` → `yeni` geçişinden sonraki durum (hashchange başına bir kez) */
export function gecis(d: Gezinme, eskiH: string | null, yeniH: string, sinif: Siniflandir): Gezinme {
  const yeni = normal(yeniH);
  const eski = eskiH == null ? null : normal(eskiH);
  if (eski === yeni) return d;
  const sy = sinif(yeni);
  // sekmenin son konumu yalnız sekme içi zincirden yazılır (akıştan açılan Rehber, Yol sekmesinin son konumu olmaz)
  const kaydet = (yigin: Cerceve[]): Gezinme =>
    sy.aile || yigin.some((c) => sinif(c.ekran).aile) ? { ...d, yigin } : { yigin, sonKonum: { ...d.sonKonum, [sy.sekme]: { hash: yeni, yigin } } };
  if (sy.kok) return kaydet([]);
  // yığında olan ekrana dönüş (geri, X ya da "Sıradaki adım"): üstündekiler düşer, girişi aynı kalır
  const i = d.yigin.findIndex((c) => c.ekran === yeni);
  if (i >= 0) return kaydet(d.yigin.slice(0, i + 1));
  const ust = d.yigin[d.yigin.length - 1];
  // aynı akışın içinde ilerleme (sınav günü → bölüm, tespit → rapor): giriş korunur
  if (ust && sy.aile && sinif(ust.ekran).aile === sy.aile) return kaydet([...d.yigin.slice(0, -1), { ekran: yeni, giris: ust.giris }]);
  if (eski === null) return kaydet([{ ekran: yeni, giris: null }]);
  const se = sinif(eski);
  // sekme değiştiren bağlantı (ör. Ben → Sözlük): geri oku o sekmenin içinde kalır (kural 2); sekmenin son konumu buysa yığını geri gelir
  if (!sy.aile && !se.aile && se.sekme !== sy.sekme) {
    const son = d.sonKonum[sy.sekme];
    return kaydet(son && son.hash === yeni ? son.yigin : [{ ekran: yeni, giris: null }]);
  }
  return kaydet([...d.yigin, { ekran: yeni, giris: eski }]);
}

/**
 * Şu anki ekranın X / geri / "Sıradaki adım" hedefi. `varsayilan`: ekranın kendi üst adresi (giriş bilinmiyorsa, ya da
 * aynı akış ailesinin içindeki bir üst adımsa o kullanılır).
 */
export function donusHedefi(d: Gezinme, simdiH: string, varsayilan: string, sinif: Siniflandir): string {
  const simdi = normal(simdiH);
  const c = d.yigin[d.yigin.length - 1];
  if (!c || c.ekran !== simdi || !c.giris) return varsayilan;
  const aile = sinif(simdi).aile;
  if (aile && sinif(normal(varsayilan)).aile === aile) return varsayilan;
  return c.giris;
}

/** Alt sekmenin açacağı adres: etkin sekme kendi köküne, öbürü son konumuna (kural 1) */
export function sekmeAdresi(d: Gezinme, sekme: string, kok: string, etkin: boolean): string {
  return etkin ? kok : d.sonKonum[sekme]?.hash ?? kok;
}
