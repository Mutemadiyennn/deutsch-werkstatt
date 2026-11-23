import type { ComponentChildren } from "preact";
/**
 * Ders yolu (#58 A5b): İlk Hafta'nın 7 günü, her günün 4 seansı, açık "sıradaki adım", XP ve seri.
 * Kural: tamamlanan adım yeniden önerilmez; sonraki gün, önceki gün bitince açılır. Seviye XP ile değil kanıtla atlanır.
 */
import { useEffect, useState } from "preact/hooks";
import { yolSandigiAc, yolSandiklari } from "../services/gorev.ts";
import { YOL_SANDIK_XP } from "../core/gorev.ts";
import { Sandik } from "../ui/gorev.tsx";
import type { Gun } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadM1Gun } from "../services/content.ts";
import { gunBitisleri, gunBittiYaz, haftaSonuclari, ilerlemeOku, xpOku, type HaftaSonuc } from "../services/ilerleme.ts";
import { adimAdi, gunAdimlari, gunOzeti, haftaBitti, haftaOf, haftalara, haftaSonuMu, seri, siradaki, yol, yolGunleri, yuklenecekHafta, type Adim, type GunDurum, type XpKayit } from "../core/gun.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import POLICY from "../policy.json" with { type: "json" };

export interface Plan { gunler: (GunDurum & { durum: "bitti" | "simdi" | "kilitli" })[]; simdi: GunDurum | null; sonraki: Adim | null; xp: XpKayit; /** sonraki bir gün dosyası yüklenemedi */ eksik?: boolean;
  /** PR B-3: günler haftalara bölünmüş; `testler` pakette hafta sonu testi olan haftalar, `sonuclar` çözülen testler */
  haftalar: { hafta: number; gunler: Plan["gunler"]; durum: "bitti" | "simdi" | "kilitli" }[]; testler: Set<number>; sonuclar: Map<number, HaftaSonuc>;
  /** testi pakette olan ve paketteki bütün günleri kalıcı olarak bitmiş haftalar (`#/hafta/<H>` ekranıyla aynı kural; eksik dosyalı hafta girmez) */
  testHazir: Set<number> }

/**
 * Bugün ve Yol ekranlarının ortak verisi: günler + cihazdaki ilerleme + XP (index.m1 boşsa null).
 * Çok haftalı (PR B-3, PR B md. 3): yalnız içinde bulunulan haftanın gün dosyaları yüklenir (hafta, kalıcı gün bitişlerinden:
 * `yuklenecekHafta`); önceki haftalar "bitti", sonraki haftalar "kilitli" özet olarak girer (dosyaları yüklenmez). Yüklenen hafta
 * bütünüyle bittiyse bir sonraki hafta yüklenir. Bir gün dosyası gelmezse (çevrimdışı, önbellekte yok) o güne kadarki günlerle plan
 * kurulur — ileri gün atlanmaz; haftanın ilk günü bile gelmezse hata döner ve ekran "Tekrar dene" gösterir (inceleme #66 P1-4).
 */
export function usePlan(): { plan: Plan | null; err: string | null; yok: boolean; yenile: () => void } {
  const { index } = useApp();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [n, setN] = useState(0);
  const yok = !!index && index.m1.length === 0;
  useEffect(() => {
    if (!index || !index.m1.length) return;
    setErr(null);
    (async () => {
      const ozet = new Map(index.m1.map((g) => [g.day, g]));
      const days = yolGunleri(index.m1.map((g) => g.day));
      const [bitenler, sonuclar, xp] = await Promise.all([gunBitisleri(), haftaSonuclari(), xpOku()]);
      const basliklar = Object.fromEntries(index.temel.map((t) => [t.id, t.title_tr]));
      // Bugün'deki "N yeni kelime" Bahçe'nin gerçekten getireceği kart sayısı; derlemede indekse yazılır, plan 2 MB'lık
      // sözlüğü yüklemez (inceleme #66 2. ve 3. tur)
      const kartlar = new Set(index.m1.flatMap((g) => g.kartlar));
      let hafta = yuklenecekHafta(days, bitenler)!;
      let durumlar: GunDurum[] = [], eksik = -1;
      for (;;) {
        const hDays = days.filter((d) => haftaOf(d) === hafta);
        const sonuc = await Promise.allSettled(hDays.map((d) => loadM1Gun(d)));
        eksik = sonuc.findIndex((r) => r.status === "rejected");
        const gunler = (eksik < 0 ? sonuc : sonuc.slice(0, eksik)).map((r) => (r as PromiseFulfilledResult<Gun>).value);
        if (!gunler.length) throw new Error(`Günün dosyası yüklenemedi${sonuc[0]?.status === "rejected" ? `: ${String((sonuc[0] as PromiseRejectedResult).reason?.message || sonuc[0].reason)}` : ""}`);
        const ilr = await ilerlemeOku(gunler.flatMap((g) => g.yeni_kartlar));
        ilr.kartlar = kartlar;
        durumlar = gunler.map((g: Gun) => gunAdimlari(g, ilr, basliklar));
        // gün bitişi kalıcı yazılır (sonradan hazır olan adım biten günü geri açmaz)
        for (const g of durumlar) if (g.bitti && !bitenler.has(g.day)) { bitenler.add(g.day); void gunBittiYaz(g.day); }
        const sonraki = days.find((d) => haftaOf(d) > hafta);
        if (eksik < 0 && durumlar.every((g) => g.bitti) && sonraki !== undefined) { hafta = haftaOf(sonraki); continue; }
        break;
      }
      const ilkGun = durumlar[0]!.day;
      const once = days.filter((d) => d < ilkGun).map((d) => gunOzeti(d, ozet.get(d)!.title_tr, true));
      // eksik dosya: o günden sonrası yola girmez (ileri gün atlanmaz); yoksa sonraki haftalar kilitli özet
      const sonra = eksik >= 0 ? [] : days.filter((d) => haftaOf(d) > hafta).map((d) => gunOzeti(d, ozet.get(d)!.title_tr, false));
      const y = yol([...once, ...durumlar, ...sonra]);
      const testler = new Set(Object.keys(index.files.hafta ?? {}).map(Number));
      setPlan({ ...y, sonraki: siradaki(y.simdi), xp, eksik: eksik >= 0, haftalar: haftalara(y.gunler), testler, sonuclar,
        testHazir: new Set([...testler].filter((h) => haftaBitti(h, days, bitenler))) });
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, n]);
  return { plan, err, yok, yenile: () => setN((x) => x + 1) };
}

/** Haftanın vurgu rengi (PM-065 madde 4): hafta 1–4 döner; açık ve koyu temada doygun (CSS `--hafta-N`) */
export const haftaRengi = (hafta: number) => `var(--hafta-${((hafta - 1) % 4) + 1})`;
/** Açık (henüz yapılmamış) düğümün dolu açık tonu (PM 7015070303-C): `--hafta-N-acik` */
export const haftaAcik = (hafta: number) => `var(--hafta-${((hafta - 1) % 4) + 1}-acik)`;

/** Düğüm simgeleri (özgün, tek renk çizgi, aynı kalınlık): etkinlik türünü söyler; video ve ses ayrı (#104 PM notu 4) */
type SimgeTur = Adim["tur"] | "video" | "ses" | "gunsonu" | "kupa" | "tekrar";
function DugumSimge({ tur }: { tur: SimgeTur }) {
  const p: Record<string, string> = {
    bahce: "M12 21v-8M12 13c-1-4-5-6-8-6 0 4 3 7 8 6zM12 11c1-4 4-6 7-6 0 4-3 7-7 6z",
    ders: "M3 5.5C5.5 4.5 8.5 4.5 12 6.5c3.5-2 6.5-2 9-1V19c-2.5-1-5.5-1-9 1-3.5-2-6.5-2-9-1zM12 6.5V20",
    medya: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z",
    ses: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z",
    video: "M3 6h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM16 10l6-3v10l-6-3",
    prova: "M4 5h16v10H9l-5 4zM8 9h8M8 12h5",
    okuma: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7",
    gunsonu: "M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z",
    kupa: "M7 4h10v5a5 5 0 0 1-10 0zM7 6H4c0 3 1.5 4.5 3.5 4.5M17 6h3c0 3-1.5 4.5-3.5 4.5M12 14v3M8 21h8M9 17h6v4H9z",
    tekrar: "M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"
  };
  return <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={p[tur]} /></svg>;
}
const TUR_AD: Record<Adim["tur"], string> = { bahce: "Kelime Bahçesi", ders: "Ders", medya: "Dinle ve izle", prova: "Konuşma provası", okuma: "Okuma ve yazma" };
/** düğüm adı: türün adı; ders ve kayıtlar içerikteki adıyla (iki "Dinle ve izle" olmasın). Ad gün başlığıyla aynıysa türün adı (aynı metin iki kez görünmesin, TASARIM Y5) */
const dugumAdi = (a: Adim, gunAdi?: string) => (a.tur === "ders" || a.tur === "medya") && a.title_tr && a.title_tr !== gunAdi ? a.title_tr : TUR_AD[a.tur];
/** Kıvrılan hat: düğümün yatay kayması (px), 8 adımda bir dalga */
const KAYMA = [0, 44, 70, 44, 0, -44, -70, -44];

/**
 * Yol haritası (B11a, D-114; PM #104 notu 1–3): gün bandı + kıvrılan hatta düğümler + yol sandıkları + tekrar düğümü.
 * Bugün sekmesinin kendisidir (`selam` gün bandına tek satır girer); `onBasla` şimdiki düğüme dokununca odak süresini başlatır.
 */
export function YolHarita({ plan, selam, ek, onBasla, yalnizBugun }: { plan: Plan; selam?: string; ek?: ComponentChildren; onBasla?: () => void; yalnizBugun?: boolean }) {
  const [acik, setAcik] = useState<Set<string>>(new Set());
  useEffect(() => { void yolSandiklari().then(setAcik); }, []);
  // Bugün sekmesinde yalnızca bugünün günü (inceleme #108 2. tur P1-1): BAŞLA ilk ekranda; ekran dışındaysa ortaya kaydırılır
  const gosterilen = yalnizBugun ? plan.gunler.filter((g) => g.day === (plan.simdi?.day ?? plan.gunler.find((x) => x.durum !== "bitti")?.day ?? plan.gunler[plan.gunler.length - 1]?.day)) : plan.gunler;
  useEffect(() => {
    if (!yalnizBugun) return;
    const el = document.querySelector<HTMLElement>("[data-test=yol] [aria-current=step]");
    if (el) { const r = el.getBoundingClientRect(); if (r.bottom > innerHeight - 96) el.scrollIntoView({ block: "center" }); }
  }, [plan.simdi?.day, plan.simdi?.adimlar.filter((a) => a.bitti).length]);
  // içinde bulunulan hafta (hepsi bittiyse son hafta): rengi ve açık bölümü o belirler (PR B-3 md. 1–2)
  const sonGun = plan.gunler[plan.gunler.length - 1];
  const hafta = haftaOf(plan.simdi?.day ?? sonGun?.day ?? 1);
  const [acikHafta, setAcikHafta] = useState<Set<number>>(new Set());
  let sira = 0;
  const simdiGun = plan.simdi?.day;
  const testAcik = (h: number) => plan.testHazir.has(h);
  // çözülmemiş önceki hafta testleri (#243 takip c: yalnız bir önceki hafta değil): şimdiki haftanın başında birer satır
  const bekleyenTest = plan.simdi ? [...plan.testHazir].filter((h) => h < hafta && !plan.sonuclar.has(h)).sort((a, b) => a - b) : [];
  // en iyi sonuç geçme oranının altındaysa son çözümün sonucuna (zayıf cümleler + tekrar) gider (inceleme #244 P2-2)
  const testAdresi = (h: number) => { const s = plan.sonuclar.get(h); return s && s.toplam > 0 && s.dogru / s.toplam < POLICY.hafta_testi.gecme_orani ? `#/hafta/${h}/sonuc` : `#/hafta/${h}`; };
  const testDugum = (h: number) => {
    const s = plan.sonuclar.get(h);
    return <a class="btn sm" href={testAdresi(h)} data-test={`hafta-testi-${h}`}>{s ? `Hafta sonu testi · ${s.dogru}/${s.toplam}` : "Hafta sonu testini çöz"}</a>;
  };
  // tamam kartı: son hazır gün haftanın son günüyse "N. hafta tamam", değilse "Hazır günlerin hepsi bitti" (md. 1)
  const tamam = !plan.sonraki && !plan.simdi && sonGun && plan.gunler.every((g) => g.bitti);
  const tamamHafta = sonGun ? haftaOf(sonGun.day) : 1;
  const tamamKart = !tamam ? null : sonGun && haftaSonuMu(sonGun.day)
    ? <section class="card stack" data-test="hafta-bitti" data-hafta={tamamHafta}><h2>{tamamHafta === 1 ? "İlk Hafta tamam" : `${tamamHafta}. hafta tamam`}</h2>
        <p>{tamamHafta === 1 ? "Bütün günleri bitirdin. Kendini tanıtabilir ve basit bir randevu cümlesi kurabilirsin." : "Bu haftanın bütün günlerini bitirdin. Sıradaki hafta hazırlanıyor; bu arada Kelime Bahçesi'nde tekrar yapabilirsin."}</p>
        {testAcik(tamamHafta) && <div class="row">{testDugum(tamamHafta)}</div>}</section>
    : <section class="card" data-test="hafta-bitti"><h2>Hazır günlerin hepsi bitti</h2><p>Sıradaki günler hazırlanıyor. Bu arada Kelime Bahçesi'nde tekrar yapabilirsin.</p></section>;
  const gunBolumu = (g: Plan["gunler"][number]) => {
        const hazirAdim = g.adimlar.filter((a) => a.hazir);
        const biten = hazirAdim.filter((a) => a.bitti).length;
        const hs = haftaSonuMu(g.day), gh = haftaOf(g.day), son = hs ? "kupa" : "gunsonu";
        return (
          <section class={`yolgun ${g.durum}`} style={{ "--vurgu": haftaRengi(gh), "--vurgu-acik": haftaAcik(gh) } as Record<string, string>} data-test={`gun-${g.day}`} data-durum={g.durum} aria-label={`${g.day}. gün: ${g.title_tr}, ${g.durum === "bitti" ? "bitti" : g.durum === "simdi" ? "şimdi" : "kilitli"}`}>
            <div class="gun-bant">
              <div class="grow">
                <div class="gun-bant-ust">{gh}. HAFTA · GÜN {g.day}</div>
                <div class="gun-bant-ad">{g.title_tr}</div>
                {selam && g.day === simdiGun && <div class="gun-bant-selam" data-test="selam">{selam}</div>}
                {ek && g.day === simdiGun && <div class="gun-bant-ek">{ek}</div>}
              </div>
              <a class="rehber-btn" href={`#/rehber/${g.day}`} data-test={`rehber-${g.day}`} aria-label={`${g.day}. günün rehberi: hedef ve kelimeler`}>Rehber</a>
            </div>
            <ol class="dugumler">
              {g.adimlar.flatMap((a, ai) => {
                const kay = KAYMA[sira++ % KAYMA.length]!;
                const simdi = plan.sonraki?.id === a.id;
                const durum = a.bitti ? "bitti" : simdi ? "simdi" : g.durum === "kilitli" || !a.hazir ? "kilitli" : "acik";
                const ad = `Seans ${a.seans} · ${TUR_AD[a.tur]}: ${a.title_tr}${!a.hazir ? " (hazırlanıyor)" : ""}${a.bitti ? ", bitti" : ""}`;
                const ic = <><span class="dugum-yuz"><DugumSimge tur={a.tur === "medya" ? a.alt ?? "ses" : a.tur} /></span>{a.bitti && <span class="dugum-onay" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>}</>;
                // şimdiki düğüm Bugün'ün tek çağrısıdır (mavi şerit kalktı; #104 PM notu 2); eski "next-activity" sözleşmesi korunur
                const dugum = (
                  <li class={`dugum-yer ${durum}`} style={{ "--kay": `${kay}px` } as Record<string, string>} data-test="adim" data-tur={a.tur} data-bitti={a.bitti ? "1" : "0"} data-durum={durum}>
                    {simdi && <span class="basla-balon" aria-hidden="true">BAŞLA</span>}
                    {simdi && <svg class="dugum-halka" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><circle class="dolu" cx="50" cy="50" r="46" style={{ strokeDasharray: `${2 * Math.PI * 46 * (hazirAdim.length ? biten / hazirAdim.length : 0)} 999` }} /></svg>}
                    {a.hazir && !a.bitti && g.durum !== "kilitli"
                      ? (simdi
                        ? <span data-test="next-activity" data-m1="1" data-seans={a.seans}><a class="dugum" href={a.href} aria-label={ad} aria-current="step" data-test="m1-devam" onClick={onBasla}>{ic}</a><span class="sr-only">{`${g.day}. gün · ${adimAdi(a)} · ${a.title_tr}`}</span></span>
                        : <a class="dugum" href={a.href} aria-label={ad}>{ic}</a>)
                      : <span class="dugum" role="img" aria-label={ad}>{ic}</span>}
                    <span class="dugum-ad tiny">{dugumAdi(a, g.title_tr)}</span>
                  </li>
                );
                if ((ai + 1) % 3 !== 0 || ai === g.adimlar.length - 1) return [dugum];
                const k = (ai + 1) / 3, anahtar = `${g.day}:${k}`;
                // önündeki adımlar hazır ve bitmiş olmalı (hazırlanan adım varsa sandık beklemez ama bedava da açılmaz; inceleme #108 P2)
                const onceBitti = g.adimlar.slice(0, ai + 1).every((x) => x.hazir && x.bitti) && g.durum !== "kilitli";
                const sd = acik.has(anahtar) ? "acik" : onceBitti ? "hazir" : "kilitli";
                const kay2 = KAYMA[sira++ % KAYMA.length]!;
                const ac = async () => { if (await yolSandigiAc(g.day, k)) setAcik(new Set([...acik, anahtar])); };
                return [dugum, (
                  <li class={`dugum-yer sandik-yer ${sd}`} style={{ "--kay": `${kay2}px` } as Record<string, string>} data-test="yol-sandik" data-durum={sd}>
                    {sd === "hazir"
                      ? <button class="dugum sandik-dugum" onClick={() => void ac()} aria-label={`Sandığı aç: +${YOL_SANDIK_XP} XP`}><Sandik durum="hazir" boy={50} /></button>
                      : <span class="dugum sandik-dugum" role="img" aria-label={sd === "acik" ? "Sandık açıldı" : "Sandık: önceki adımları bitirince açılır"}><Sandik durum={sd} boy={50} /></span>}
                    <span class="dugum-ad tiny">{sd === "acik" ? `+${YOL_SANDIK_XP} XP alındı` : "Sandık"}</span>
                  </li>)];
              })}
              <li class={`dugum-yer ${g.bitti ? "bitti" : "kilitli"} son`} style={{ "--kay": `${KAYMA[sira++ % KAYMA.length]}px` } as Record<string, string>}>
                {/* hafta sonu (her 7. gün): hafta bitince testi açar (PR B-3 md. 5); test yoksa yalnız simge */}
                {hs && g.bitti && testAcik(gh)
                  ? <a class="dugum" href={testAdresi(gh)} data-test={`hafta-sonu-${gh}`} aria-label={`${gh}. hafta sonu testi${plan.sonuclar.get(gh) ? `: ${plan.sonuclar.get(gh)!.dogru}/${plan.sonuclar.get(gh)!.toplam}` : ""}`}><span class="dugum-yuz"><DugumSimge tur={son} /></span>{plan.sonuclar.get(gh) && <span class="dugum-onay" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>}</a>
                  : <span class="dugum" role="img" aria-label={hs ? `Hafta sonu ${g.bitti ? "tamam" : "kilitli"}` : `Gün sonu ${g.bitti ? "tamam" : "kilitli"}`}><span class="dugum-yuz"><DugumSimge tur={son} /></span></span>}
                <span class="dugum-ad tiny">{hs ? (plan.sonuclar.get(gh) ? `Hafta sonu · ${plan.sonuclar.get(gh)!.dogru}/${plan.sonuclar.get(gh)!.toplam}` : g.bitti && testAcik(gh) ? "Hafta sonu testi" : "Hafta sonu") : "Gün sonu"}</span>
              </li>
            </ol>
          </section>
        );
  };
  // önceki / sonraki hafta tek satır (md. 2): biten hafta dokununca günlerini açar (dosya yüklenmez: gün adı, Rehber, test)
  const haftaSatiri = (h: Plan["haftalar"][number]) => {
    const ac = acikHafta.has(h.hafta);
    if (h.durum === "kilitli") return (
      <section class="card row hafta-satir kilitli" data-test={`hafta-${h.hafta}`} data-durum="kilitli" style={{ "--vurgu": haftaRengi(h.hafta) } as Record<string, string>}>
        <span class="grow"><b>{h.hafta}. hafta</b> <span class="small muted">· {h.gunler.length} gün · önceki hafta bitince açılır</span></span><Icon name="lock" size={18} label="kilitli" />
      </section>);
    return (
      <section class="card stack hafta-satir bitti" data-test={`hafta-${h.hafta}`} data-durum="bitti" data-acik={ac ? "1" : "0"} style={{ "--vurgu": haftaRengi(h.hafta) } as Record<string, string>}>
        <button class="row hafta-satir-btn" aria-expanded={ac} onClick={() => { const x = new Set(acikHafta); ac ? x.delete(h.hafta) : x.add(h.hafta); setAcikHafta(x); }}>
          <span class="grow"><b>{h.hafta === 1 ? "İlk Hafta" : `${h.hafta}. hafta`}</b> <span class="small muted">· tamam{plan.sonuclar.get(h.hafta) ? ` · test ${plan.sonuclar.get(h.hafta)!.dogru}/${plan.sonuclar.get(h.hafta)!.toplam}` : ""}</span></span>
          <Icon name="check" size={18} stroke={3} />
        </button>
        {ac && <ol class="hafta-gunler" data-test={`hafta-${h.hafta}-gunler`}>{h.gunler.map((g) => (
          <li class="row" data-test={`gun-${g.day}`} data-durum="bitti"><span class="grow"><span class="tiny muted">GÜN {g.day}</span> {g.title_tr}</span>
            <a class="rehber-btn" href={`#/rehber/${g.day}`} aria-label={`${g.day}. günün rehberi`}>Rehber</a></li>))}</ol>}
        {/* üstte "… sonu testi hazır → Çöz" satırı dururken aynı teste ikinci giriş yok (#243 PM finali takip b) */}
        {ac && testAcik(h.hafta) && !bekleyenTest.includes(h.hafta) && <div class="row">{testDugum(h.hafta)}</div>}
      </section>);
  };
  const simdiki = plan.haftalar.find((h) => h.durum === "simdi") ?? plan.haftalar.find((h) => h.hafta === hafta);
  return (
    <div class="stack yol-harita" data-test="yol" data-hafta={hafta} style={{ "--vurgu": haftaRengi(hafta), "--vurgu-acik": haftaAcik(hafta) } as Record<string, string>}>
      <div class="sr-only" data-test="xp-seri"><b data-test="xp">{plan.xp.toplam}</b> XP · {seri(plan.xp) ? <><b data-test="seri">{seri(plan.xp)}</b> gün üst üste</> : "Bugün başla, seri başlasın"}</div>
      {tamamKart}
      {/* önceki haftaların çözülmemiş testleri şimdiki haftanın başında tek satır (inceleme #243 P1-2): 7. gün biter bitmez yol yeni haftaya geçer */}
      {bekleyenTest.map((h) => (
        <section class="card row hafta-satir" data-test="hafta-testi-hazir" data-hafta={h} style={{ "--vurgu": haftaRengi(h) } as Record<string, string>}>
          <span class="grow"><b>{h === 1 ? "İlk Hafta" : `${h}. hafta`} sonu testi hazır</b></span>
          <a class="btn sm" href={`#/hafta/${h}`} data-test={`hafta-testi-${h}`} aria-label={`${h === 1 ? "İlk Hafta" : `${h}. hafta`} sonu testini çöz`}>Çöz</a>
        </section>))}
      {yalnizBugun
        ? gosterilen.map(gunBolumu)
        : plan.haftalar.map((h) => (h === simdiki ? h.gunler.map(gunBolumu) : haftaSatiri(h)))}
      {/* tekrar her zaman açık (Bugün'deki "Tekrar edilecekler" yolun sonuna taşındı; PM 7015070303-E) */}
      <ol class="dugumler"><li class="dugum-yer acik tekrar-yer">
        <a class="dugum" href={plan.simdi ? `#/garden/${plan.simdi.day}` : "#/garden"} data-test="garden-start" aria-label="Kelime Bahçesi: tekrar et"><span class="dugum-yuz"><DugumSimge tur="tekrar" /></span></a>
        <span class="dugum-ad tiny">Tekrar</span>
      </li></ol>
    </div>
  );
}

export function YolEkrani() {
  const { plan, err, yok, yenile } = usePlan();
  if (err) return <div class="stack"><TopBar title="Yol" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (yok) return <div class="stack"><TopBar title="Yol" /><section class="card"><p>İlk Hafta'nın günleri hazırlanıyor.</p></section></div>;
  if (!plan) return <Loading />;
  const h = haftaOf(plan.simdi?.day ?? plan.gunler[plan.gunler.length - 1]?.day ?? 1);
  return <div class="stack"><TopBar title={h === 1 ? "İlk Hafta" : "Yol"} /><YolHarita plan={plan} /></div>;
}
