/**
 * B7 (PM 7030294523, PM 7032771759): ad girilmemiş profilde ad yuvası ({name}) görünmez ve okunmaz.
 * İçerikte `{name}` içeren bir alanın (ör. `de`, `tr`, `accepted`) yanına aynı adla `_adsiz` sonekli bir alan yazılabilir
 * ("de": "Guten Tag, hier ist {name}.", "de_adsiz": "Guten Tag."). Ad yoksa uygulama `_adsiz` biçimini kullanır.
 *
 * Şemalar (zod) bilinmeyen alanları atar; `_adsiz` alanları her nesne türüne tek tek eklenmez. Bunun yerine ayrıştırmadan
 * sonra ham JSON ile ayrıştırılmış veri aynı anda gezilir ve `k_adsiz` alanı, ayrıştırılmış nesnede `k` varsa geri konur
 * (`adsizTasi`). İçerik derlemesi ve uygulamadaki yükleyici aynı işlevi kullanır.
 */
export const ADSIZ = "_adsiz";
const nesne = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const adYuvali = (v: unknown): boolean => (typeof v === "string" ? v.includes("{name}") : Array.isArray(v) && v.some((s) => typeof s === "string" && s.includes("{name}")));
const metinMi = (v: unknown): v is string | string[] => typeof v === "string" || (Array.isArray(v) && v.every((s) => typeof s === "string"));

/** Ham veriden ayrıştırılmış veriye `_adsiz` alanlarını taşır (yerinde); ayrıştırılmış veriyi döndürür */
export function adsizTasi<T>(raw: unknown, parsed: T): T {
  if (Array.isArray(raw) && Array.isArray(parsed)) { raw.forEach((x, i) => adsizTasi(x, parsed[i])); return parsed; }
  if (nesne(raw) && nesne(parsed)) {
    const p = parsed as Record<string, unknown>;
    for (const [k, v] of Object.entries(raw)) {
      if (k.endsWith(ADSIZ)) { const asil = k.slice(0, -ADSIZ.length); if (asil in p && metinMi(v)) p[k] = v; }
      else if (k in p) adsizTasi(v, p[k]);
    }
  }
  return parsed;
}

/**
 * Doğrulayıcı: `hata` — `_adsiz` biçimi ad yuvası içeriyor, asıl alanda ad yuvası yok ya da tür uyuşmuyor (metin ↔ liste);
 * `uyari` — ad yuvası olup adsız biçimi olmayan alanlar (yol listesi).
 */
export function adsizDenetle(x: unknown, yol = ""): { hata: string[]; eksik: string[] } {
  const out = { hata: [] as string[], eksik: [] as string[] };
  const gez = (v: unknown, p: string) => {
    if (Array.isArray(v)) { v.forEach((y, i) => { if (!metinMi(v)) gez(y, `${p}[${i}]`); }); return; }
    if (!nesne(v)) return;
    // inceleme #148 P1-2: nesnede bir `_adsiz` varsa ad yuvalı bütün kardeş alanların da adsız biçimi olmalı (yarım kullanım:
    // ekranda adsız cümle görünür ama kabul listesi ad bekler → öğrenci gördüğünü yazınca yanlış sayılır)
    const kismi = Object.keys(v).some((k) => k.endsWith(ADSIZ));
    for (const [k, w] of Object.entries(v)) {
      const kp = p ? `${p}.${k}` : k;
      if (k.endsWith(ADSIZ)) {
        const asil = k.slice(0, -ADSIZ.length);
        if (adYuvali(w)) out.hata.push(`${kp}: adsız biçimde ad yuvası var`);
        if (!adYuvali(v[asil])) out.hata.push(`${kp}: asıl alanda ({${asil}}) ad yuvası yok; adsız biçim gereksiz`);
        if (Array.isArray(w) !== Array.isArray(v[asil])) out.hata.push(`${kp}: asıl alanla tür uyuşmuyor (metin/liste)`);
        continue;
      }
      if (adYuvali(w) && !(`${k}${ADSIZ}` in v)) { if (kismi) out.hata.push(`${kp}: aynı nesnede adsız biçim var ama bu alanın yok (${k}${ADSIZ})`); else out.eksik.push(kp); }
      else if (!metinMi(w)) gez(w, kp);
    }
  };
  gez(x, yol);
  return out;
}
