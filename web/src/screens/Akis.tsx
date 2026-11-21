/**
 * AKIS AK-7 durak oynatıcısı — AK-10 4. adımın İSKELETİ (PR'sız; hedef design/TARGET3b). Henüz yönlendirmeye bağlı DEĞİL.
 * Yapı: üstte X + elmas ilerleme (durağın adımları) + "Neden bu?"; ortada adım bileşeni; altta eylem çubuğu (bileşenin kendisi).
 * Bağlı türler: `resimden_sec`, `eslestir` (AK-10 3. adım). Öteki türler, Bahçe'nin `Question` bileşeni `ui/soru/`ya
 * alınınca (AK-7 1. satır) bağlanır; o zamana kadar yer tutucu.
 * Açık işler (4. adımın kabul listesine): genel adlar listesi içerik paketine (kumeDizini istemcide), `halkalar` gun-NN.json'da (İÇ),
 * `policy.akis.gunler` bayrağı ve Yol/Bugün bağlaması, kart kayıtları `srs.review` (source "drill", session "akis@…"),
 * halka sonu ekranı (TARGET3b 6), mini sahne (Ders `Diyalog`), seans halkası (K9).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import { kumeDizini, type Drill, type Lexeme, type LearnerItem } from "@dw/shared";
import { loadFoto, loadGenelAdlar, loadIndex, loadLexicon, loadM1Gun, loadTemeller, loadWorld, type FotoKayit } from "../services/content.ts";
import { getMeta, itemsMap, putItems, setMeta } from "../data/db.ts";
import { review } from "../core/srs.ts";
import { personalizeDeep } from "../core/persona.ts";
import { useApp } from "../state.ts";
import { akisGunu, KIP, planGun } from "../core/akis.ts";
import { akisAnahtar, yeniKayit } from "../core/akisKayit.ts";
import { ProgressHeader } from "../ui/kit.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import type { Adim } from "../core/akis.ts";
import { durakGecisi, ilerle, simdiki, type AkisKaydi } from "../core/akisKayit.ts";
import { resimSecenekleri } from "../core/halkaTur.ts";
import { ResimSec } from "../ui/soru/ResimdenSec.tsx";
import { Eslestir } from "../ui/soru/Eslestir.tsx";
import { ActionBar } from "../ui/kit.tsx";
import { Question } from "../ui/soru/Soru.tsx";
import { DrillView } from "../ui/drill.tsx";
import { BoslukAdimi, KalipAdimi, UretAdimi, YapbozAdimi, type CumleBilgi } from "../ui/soru/AkisAdim.tsx";
import type { QType } from "../core/garden.ts";

/** Bahçe soru bileşeninin karşıladığı tek kartlı adım türleri */
const SORU = new Set<string>(["listen_meaning", "article", "colloc", "tr_de", "gap"]);
import { Icon } from "../ui/icons.tsx";

export interface AkisOynaticiProps {
  kayit: AkisKaydi;
  lex: ReadonlyMap<string, Lexeme>;
  harita: Readonly<Record<string, FotoKayit>>;
  /** cümle/kalıp çözümü ve K10 ipucu (ekran kurar) */
  baglam: AkisBaglam;
  /** kayıt değişti (çağıran `akis:<gün>`e yazar); `eski`: biten durağın eski ilerleme anahtarı (AK-6) */
  kaydet: (k: AkisKaydi, eski: string | null) => void;
  cik: () => void;
}

/** Planın cümlesinden ekranda çözülenler: Türkçe + kabul (halka görev cümleleri → kart örnekleri), kalıbın Türkçesi, K10 ipucu */
export interface AkisBaglam { cumle: (de: string) => CumleBilgi; drill: (dersId: string, oge: string) => Drill | undefined; kalipTr: (de: string) => string; ipucu: (sozcuk: string) => string | undefined; gordu: (sozcukler: string[]) => void }

export function AkisOynatici({ kayit, lex, harita, baglam, kaydet, cik }: AkisOynaticiProps) {
  const [neden, setNeden] = useState(false);
  const s = simdiki(kayit);
  if (!s) return <section class="stack" data-test="akis-bitti"><p class="card">Bugünün durakları bitti.</p></section>;
  const bitir = (sonuc: { kart: string; dogru: boolean }[]) => { const r = ilerle(kayit, sonuc); setNeden(false); kaydet(r.kayit, r.yazilacak); };
  return (
    <section class="stack" data-test="akis" data-durak={s.durak.id} data-adim={s.adim.id} data-tur={s.adim.tur}>
      <header class="row" style={{ gap: 10, flexWrap: "nowrap", alignItems: "center" }}>
        <button class="iconbtn plain" aria-label="Çık" data-test="akis-cik" onClick={cik}><Icon name="x" /></button>
        <div class="grow row" style={{ gap: 4, flexWrap: "nowrap" }} role="progressbar" aria-valuemin={0} aria-valuemax={s.toplam} aria-valuenow={s.sira}>
          {Array.from({ length: s.toplam }, (_, i) => <i class={`akis-elmas${i < s.sira ? " dolu" : i === s.sira ? " simdi" : ""}`} />)}
        </div>
        <button class="ikincil-eylem tiny" data-test="akis-neden" aria-expanded={neden} onClick={() => setNeden((x) => !x)}>Neden bu?</button>
      </header>
      {neden && <p class="small muted" data-test="akis-neden-metin" style={{ margin: 0 }}>{s.adim.neden}</p>}
      <AdimGovdesi key={s.adim.id} adim={s.adim} lex={lex} harita={harita} baglam={baglam} tohum={`${kayit.plan.tohum}|${s.adim.id}`} bitir={bitir} />
    </section>
  );
}

function AdimGovdesi({ adim, lex, harita, baglam, tohum, bitir }: { adim: Adim; lex: ReadonlyMap<string, Lexeme>; harita: Readonly<Record<string, FotoKayit>>; baglam: AkisBaglam; tohum: string; bitir: (s: { kart: string; dogru: boolean }[]) => void }) {
  if (durakGecisi(adim)) return (
    // 4a: adımsız durak (ses, video, prova, okuma, dil) — 4b'de var olan ekrana gidip dönecek
    <section class="card stack" data-test="akis-durak-gecis"><div class="kicker icerik">Sıradaki durak</div><p style={{ margin: 0 }}>{adim.neden}</p>
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={() => bitir([])}>Devam et</button></ActionBar></section>);
  const kartlar = adim.kartlar.map((k) => lex.get(k)).filter((x): x is Lexeme => !!x);
  const soru = useMemo(() => (adim.tur === "resimden_sec" && kartlar[0] ? resimSecenekleri(kartlar[0], [...lex.values()], harita, tohum) : null), [adim.id]);
  if (adim.tur === "eslestir" && kartlar.length >= 4) return <Eslestir kartlar={kartlar} tohum={tohum} onBitti={bitir} />;
  if (adim.tur === "resimden_sec" && soru) return <ResimSec soru={soru} lex={lex} harita={harita} onBitti={(ok) => bitir([{ kart: soru.kart, dogru: ok }])} />;
  // dersin alıştırma maddesi (K8 `kaynak: "ders"`): Ders oynatıcısının bileşeniyle, aynı denetimle
  const drill = adim.ders ? baglam.drill(adim.ders.id, adim.ders.oge) : undefined;
  if (drill && adim.tur !== "kalip" && adim.tur !== "tanit") return <DrillView key={adim.id} d={drill} onDone={(r) => bitir(adim.kartlar.map((kart) => ({ kart, dogru: r !== "wrong" })))} />;
  // halka cümlesiyle çalışan adımlar (TARGET3c 1–3): cümle planlayıcının kapıdan geçirdiği cümle
  const hepsi = (ok: boolean) => bitir(adim.kartlar.map((kart) => ({ kart, dogru: ok })));
  if (adim.cumle && (adim.tur === "tr_de" || adim.tur === "soyle" || adim.tur === "dikte") && baglam.cumle(adim.cumle).tr)
    return <UretAdimi key={adim.id} bilgi={baglam.cumle(adim.cumle)} sesli={adim.tur === "soyle"} onBitti={hepsi} />;
  if (adim.cumle && adim.tur === "order") {
    const b = baglam.cumle(adim.cumle);
    return <YapbozAdimi key={adim.id} bilgi={b} tohum={tohum} ipucu={baglam.ipucu} onBitti={(ok) => { baglam.gordu(b.de.split(/\s+/)); hepsi(ok); }} />;
  }
  if (adim.cumle && adim.tur === "gap" && kartlar[0] && baglam.cumle(adim.cumle).tr) {
    const l0 = kartlar[0];
    return <BoslukAdimi key={adim.id} bilgi={baglam.cumle(adim.cumle)} bosluk={[l0.de, ...(l0.forms ?? []).map((f) => f.answer)]} onBitti={hepsi} />;
  }
  if (adim.tur === "kalip" && adim.cumle) {
    const parcalar = adim.cumle.split(/\s[–—]\s/);
    return <KalipAdimi key={adim.id} kalip={parcalar.map((de) => ({ de, tr: baglam.kalipTr(de) }))} ornekler={[]} onBitti={() => hepsi(true)} />;
  }
  // Bahçe'nin soru bileşeni (AK-7 ortak): tanıtım ve tek kartlı soru türleri; cümle, kartın örneklerinden seçilir (planlayıcının seçtiği)
  const l = kartlar[0];
  if (l && (adim.tur === "tanit" || SORU.has(adim.tur))) {
    const ex = Math.max(0, l.examples.findIndex((e) => e.de === adim.cumle));
    const tanit = adim.tur === "tanit";
    return <Question key={adim.id} q={{ lexId: l.id, type: tanit ? "listen_meaning" : (adim.tur as QType), intro: tanit, ex }} l={l} all={[...lex.values()]}
      onTanitimBitti={tanit ? () => bitir([{ kart: l.id, dogru: true }]) : undefined}
      onDone={(r) => bitir([{ kart: l.id, dogru: r.ok }])} />;
  }
  // İSKELET: öteki türler (tanit, kalip, listen_meaning, gap, order, tr_de, dikte, soyle, sahne, ders_madde, …) ui/soru/ ortaklaşınca
  return (
    <section class="card stack" data-test="akis-yer-tutucu">
      <div class="kicker icerik">{adim.tur}</div>
      {adim.cumle && <div class="de-lg" lang="de">{adim.cumle}</div>}
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={() => bitir(adim.kartlar.map((kart) => ({ kart, dogru: true })))}>Devam et</button></ActionBar>
    </section>
  );
}

/**
 * `#/akis/<gün>`: akış günü (AK-1). Plan bir kez kurulur ve `akis:<gün>`de konumla saklanır; yarıda kalan gün aynı planla sürer (AK-6).
 * Kart sonuçları `srs.review`'a gider (source "drill", session "akis@<gün>"); kip → yol: gör/duy edilgen, kur/söyle etkin.
 * 4a: eski ilerleme anahtarları (Yol, Bugün) ve Bugün/Yol bağlaması 4b'de.
 */
export function AkisEkrani({ day }: { day: number }) {
  const { profile } = useApp();
  const [v, setV] = useState<{ kayit: AkisKaydi; lex: Map<string, Lexeme>; harita: Record<string, FotoKayit>; items: Map<string, LearnerItem>; baglam: AkisBaglam } | null | "degil">(null);
  const [hata, setHata] = useState<string | null>(null);
  useEffect(() => {
    void (async () => {
      try {
        const [gun, { lexemes }, temel, world, genel, harita, idx] = await Promise.all([loadM1Gun(day), loadLexicon(), loadTemeller(), loadWorld(), loadGenelAdlar(), loadFoto(), loadIndex()]);
        if (!akisGunu(gun)) { setV("degil"); return; }
        const lex = new Map(lexemes.map((l) => [l.id, l]));
        const ids = [...new Set([...gun.yeni_kartlar, ...lexemes.filter((l) => l.card !== false).map((l) => l.id)])];
        const items = await itemsMap(ids);
        let kayit = await getMeta<AkisKaydi>(akisAnahtar(day));
        if (!kayit || kayit.surum !== 1) {
          const oncekiGunler = idx.m1.filter((g) => g.day < day);
          const oncekiKartlar = new Set(oncekiGunler.flatMap((g) => g.kartlar).filter((k) => items.get(k)?.passive?.fsrs));
          const plan = planGun({ gun, dersler: new Map(temel.map((t) => [t.id, t])), dizin: kumeDizini(lexemes, temel, world, genel), items, oncekiKartlar,
            bitenDersler: new Set(await oncekiDersler(oncekiGunler.map((g) => g.day))), tohum: `akis:${day}`, simdi: new Date() });
          if (!plan) { setV("degil"); return; }
          kayit = yeniKayit(plan); await setMeta(akisAnahtar(day), kayit);
        }
        // cümle bilgisi: halka görev cümleleri (Türkçe + kabul ≥ 3) → kart örnekleri; kalıp Türkçesi: halka kalıpları → ders teach
        const cumleler = new Map<string, CumleBilgi>();
        for (const l of lexemes) for (const e of l.examples) if (!cumleler.has(e.de)) cumleler.set(e.de, { de: e.de, tr: e.tr, accepted: [e.de] });
        for (const h of gun.halkalar) for (const g of h.gorev_cumleleri) cumleler.set(g.de, { de: g.de, tr: g.tr, accepted: [g.de, ...g.accepted] });
        const kaliplar = new Map<string, string>();
        for (const t of temel) for (const x of t.teach) kaliplar.set(x.de, x.tr);
        for (const h of gun.halkalar) for (const k of h.kaliplar ?? []) { const de = k.de.split(/\s[–—]\s/), tr = k.tr.split(/\s[–—]\s/); de.forEach((d, i) => kaliplar.set(d, tr[i] ?? k.tr)); kaliplar.set(k.de, k.tr); }
        // K10: kartsız küçük sözcüğün Türkçesi yapbozda ilk iki görüşte (sayaç cihazda)
        const cerceve = new Map(lexemes.filter((l) => l.card === false).map((l) => [l.de.toLowerCase(), l.tr]));
        const k10 = (await getMeta<Record<string, number>>("akis:k10")) ?? {};
        const kisi = { name: profile.displayName, address: profile.address };
        const baglam: AkisBaglam = {
          // gösterimde ad ve hitap yerleşir (Ders ekranıyla aynı: personalizeDeep); plan ham metinle kurulur (yer tutucu sayılmaz)
          cumle: (de) => personalizeDeep(cumleler.get(de) ?? { de, tr: "", accepted: [de] }, kisi),
          drill: (id, oge) => { const d = temel.find((t) => t.id === id)?.drills.find((x) => x.id === oge); return d && personalizeDeep(d, kisi); },
          kalipTr: (de) => kaliplar.get(de) ?? "",
          ipucu: (w) => { const k = w.toLowerCase(); const tr = cerceve.get(k); return tr && (k10[k] ?? 0) < 2 ? tr : undefined; },
          gordu: (ws) => { for (const w of ws) { const k = w.replace(/[.,!?;:]/g, "").toLowerCase(); if (cerceve.has(k)) k10[k] = (k10[k] ?? 0) + 1; } void setMeta("akis:k10", k10); }
        };
        setV({ kayit, lex, harita, items, baglam });
      } catch (e) { setHata(e instanceof Error ? e.message : String(e)); }
    })();
  }, [day]);
  if (hata) return <ErrorPanel message={hata} onRetry={() => location.reload()} />;
  if (!v) return <Loading />;
  if (v === "degil") return <section class="stack"><ProgressHeader title={`${day}. gün`} back="#/" /><p class="card small" data-test="akis-degil">Bu gün henüz yeni akışla açılmıyor.</p></section>;
  const kaydet = async (k: AkisKaydi) => {
    // yeni sonuçlar kart kaydına: son ilerleme ile önceki arasındaki fark
    const yeni = k.sonuclar.slice(v.kayit.sonuclar.length);
    const adim = v.kayit.plan.duraklar[v.kayit.durak]?.adimlar.find((a) => yeni[0] && a.id === yeni[0].adim);
    const yol = adim && (KIP[adim.tur] === "kur" || KIP[adim.tur] === "soyle") ? "active" : "passive";
    const degisen: LearnerItem[] = [];
    for (const r of yeni) {
      if (!v.lex.has(r.kart)) continue;
      const it = review(v.items.get(r.kart), { itemId: r.kart, kind: "lexeme", path: yol, outcome: r.dogru ? "correct" : "wrong", session: `akis@${day}`, source: "drill", ctx: adim?.tur });
      v.items.set(r.kart, it); degisen.push(it);
    }
    await putItems(degisen);
    await setMeta(akisAnahtar(day), k);
    setV({ ...v, kayit: k });
  };
  return <AkisOynatici kayit={v.kayit} lex={v.lex} harita={v.harita} baglam={v.baglam} kaydet={(k) => void kaydet(k)} cik={() => { location.hash = `#/m1/${day}`; }} />;
}

/** önceki günlerin bitmiş temel dersleri (`ders:<id>` ilerlemesi) */
async function oncekiDersler(gunler: number[]): Promise<string[]> {
  const out: string[] = [];
  for (const g of gunler) { try { const d = await loadM1Gun(g); for (const id of d.dersler) if (await getMeta(`ders:${id}`)) out.push(id); } catch { /* gün yok */ } }
  return out;
}
