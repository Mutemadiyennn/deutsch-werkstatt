/**
 * PM-064 (#58 B15 1. adım): karaktere göre ses seçimi. Cihazdaki Almanca sesler adlarına göre kadın/erkek havuzuna
 * ayrılır; her karaktere havuzdan SABİT bir ses düşer (aynı karakter her sahnede aynı ses). Aynı sahnede iki konuşana
 * aynı ses düşerse ikincisi havuzdaki sonraki sese, havuz biterse hafif perde farkına geçer. "Yavaş" yalnızca hızı
 * düşürür; ses ve perde aynı kalır. Saf mantık: `speechSynthesis` yok, birim testli.
 */
export type Cins = "kadin" | "erkek";
export interface Ses { name: string; lang: string; voiceURI?: string; localService?: boolean }
export interface Konusan { id: string; cinsiyet?: Cins; sira: number }
export interface Atama { ses?: Ses; pitch: number; cinsiyetYok?: boolean }

/** Bilinen Almanca ses adları (iOS/macOS, Android/Chrome, Windows/Edge). Küçük harf, ilk sözcük. */
const KADIN = ["anna", "helena", "petra", "marlene", "vicki", "katja", "hedda", "amala", "seraphina", "louisa", "elke", "sandy", "shelley", "grandma", "flo", "google", "ingrid", "gisela", "lea", "maja", "tanja", "elena"];
const ERKEK = ["markus", "martin", "viktor", "yannick", "hans", "conrad", "stefan", "killian", "florian", "eddy", "reed", "rocko", "grandpa", "jonas", "ralf", "bernd", "christoph", "kasper"];
/** Eğlence sesleri (iOS): son seçenek */
const OYUNCAK = ["eddy", "reed", "rocko", "flo", "grandma", "grandpa", "sandy", "shelley", "bad news", "bubbles", "jester", "organ", "trinoids", "whisper", "zarvox", "albert", "bahh", "bells", "boing", "cellos", "wobble", "superstar", "good news"];

/** "Microsoft Katja Online (Natural)" → "katja online (natural)"; "Google Deutsch" olduğu gibi */
const ilk = (s: Ses) => s.name.toLowerCase().replace(/^(microsoft|apple)\s+/, "").trim();
export function sesCinsi(s: Ses): Cins | null {
  const n = ilk(s);
  const kelime = n.split(/[\s(-]+/)[0] ?? "";
  if (KADIN.includes(kelime)) return "kadin";
  if (ERKEK.includes(kelime)) return "erkek";
  if (/female|weiblich|frau/.test(n)) return "kadin";
  if (/\bmale\b|männlich|mann\b/.test(n)) return "erkek";
  return null;
}
/** Kalite: gelişmiş/premium/neural önce, eğlence sesleri en son */
export function sesKalitesi(s: Ses): number {
  const n = s.name.toLowerCase();
  if (OYUNCAK.some((o) => n.startsWith(o))) return -1;
  if (/premium|enhanced|erweitert|verbessert|neural|natural|online/.test(n)) return 2;
  return 1;
}
export const almancaMi = (s: Ses) => /^de([-_]|$)/i.test(s.lang);

/** Havuzlar: Almanca sesler, cinsiyete göre; her havuz kaliteye, sonra ada göre sıralı (kararlı) */
export function havuzlar(sesler: Ses[]): { kadin: Ses[]; erkek: Ses[]; diger: Ses[] } {
  // eğlence sesleri (Eddy, Grandma…) yalnızca o cinsiyette başka ses yoksa (inceleme #117 P1-2)
  const tum = sesler.filter(almancaMi);
  const oyun = (s: Ses) => sesKalitesi(s) < 0;
  const de = tum.filter((s) => !oyun(s) || !tum.some((x) => !oyun(x) && sesCinsi(x) === sesCinsi(s)));
  const sirala = (xs: Ses[]) => xs.slice().sort((a, b) => sesKalitesi(b) - sesKalitesi(a) || (a.lang.startsWith("de-DE") ? 0 : 1) - (b.lang.startsWith("de-DE") ? 0 : 1) || a.name.localeCompare(b.name));
  return { kadin: sirala(de.filter((s) => sesCinsi(s) === "kadin")), erkek: sirala(de.filter((s) => sesCinsi(s) === "erkek")), diger: sirala(de.filter((s) => sesCinsi(s) === null)) };
}

/**
 * Bir karaktere ses: kendi cinsiyet havuzunda `sira`ya göre sabit. Havuz boşsa cinsiyeti bilinmeyen Almanca seslerden,
 * o da yoksa öteki havuzdan + perde (erkek için alçak, kadın için hafif yüksek) ve `cinsiyetYok` işareti (Profil uyarısı).
 * `dolu`: aynı sahnede başka konuşanlara verilmiş ses adları; çakışırsa havuzdaki sonraki, havuz biterse perde farkı.
 */
export function sesAta(k: Konusan, sesler: Ses[], doluSesler: Iterable<string> = []): Atama {
  const doluListe = [...doluSesler]; const dolu = new Set(doluListe);
  const h = havuzlar(sesler);
  const kendi = k.cinsiyet ? h[k.cinsiyet] : [...h.kadin, ...h.erkek, ...h.diger];
  let havuz = kendi.length ? kendi : h.diger;
  let pitch = 1, cinsiyetYok = false;
  if (!havuz.length) {
    havuz = k.cinsiyet === "erkek" ? h.kadin : h.erkek;
    if (!havuz.length) havuz = [...h.kadin, ...h.erkek];
    cinsiyetYok = !!k.cinsiyet; pitch = k.cinsiyet === "erkek" ? 0.75 : k.cinsiyet === "kadin" ? 1.2 : 1;
  }
  if (!havuz.length) return { pitch, cinsiyetYok: !!k.cinsiyet };
  const n = havuz.length;
  for (let d = 0; d < n; d++) {
    const s = havuz[(k.sira + d) % n]!;
    if (!dolu.has(s.name)) return { ses: s, pitch, cinsiyetYok };
  }
  // havuz tükendi: en az kullanılan ses, perde farkı (o sesin sahnedeki kaçıncı kullanımı: alçak, yüksek, daha alçak…)
  const kullanim = (x: Ses) => doluListe.filter((d) => d === x.name).length;
  const s = havuz.slice().sort((a, b) => kullanim(a) - kullanim(b))[0]!;
  const kat = kullanim(s);
  const adim = Math.ceil(kat / 2) * 0.09 * (kat % 2 ? -1 : 1);
  return { ses: s, pitch: Math.min(1.5, Math.max(0.6, Math.round(pitch * (1 + adim) * 100) / 100)), cinsiyetYok };
}

/** Bir sahnedeki konuşanlara sırayla ses: aynı sahnede iki konuşan aynı (ses, perde) almaz */
export function sahneAta(konusanlar: Konusan[], sesler: Ses[]): Map<string, Atama> {
  const out = new Map<string, Atama>();
  const dolu: string[] = [];
  for (const k of konusanlar) {
    if (out.has(k.id)) continue;
    const a = sesAta(k, sesler, dolu);
    if (a.ses) dolu.push(a.ses.name);
    out.set(k.id, a);
  }
  return out;
}

/** Konuşan adından karakter: kimlik (`ch:…`), soyadı, takma ad („Tobi“) ya da ad; bulunamazsa hitaptan cinsiyet */
export interface KarakterSes { id: string; name: string; ses?: { cinsiyet: Cins; sira: number } }
export function konusanBul(ad: string | undefined, karakterler: KarakterSes[]): Konusan | null {
  if (!ad) return null;
  const a = ad.trim();
  const k = karakterler.find((c) => c.id === a) ?? karakterler.find((c) => {
    const parcalar = c.name.replace(/[„“"]/g, " ").replace(/\b(Dr|Prof)\.\s*/g, "").split(/\s+/).filter((x) => x.length > 2);
    return parcalar.some((p) => new RegExp(`(^|\\s)${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|\\s|[,.:])`, "i").test(a));
  });
  if (k?.ses) return { id: k.id, cinsiyet: k.ses.cinsiyet, sira: k.ses.sira };
  const cins: Cins | undefined = /\bfrau\b/i.test(a) ? "kadin" : /\bherr\b/i.test(a) ? "erkek" : undefined;
  // bilinmeyen konuşan: addan kararlı sıra (aynı ad her zaman aynı ses)
  let h = 0; for (const ch of a.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return { id: k?.id ?? `ad:${a.toLowerCase()}`, cinsiyet: cins, sira: 7 + (h % 13) };
}
