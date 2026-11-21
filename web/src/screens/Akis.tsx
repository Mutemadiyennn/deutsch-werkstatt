/**
 * AKIS AK-7 durak oynatıcısı — AK-10 4. adımın İSKELETİ (PR'sız; hedef design/TARGET3b). Henüz yönlendirmeye bağlı DEĞİL.
 * Yapı: üstte X + elmas ilerleme (durağın adımları) + "Neden bu?"; ortada adım bileşeni; altta eylem çubuğu (bileşenin kendisi).
 * Bağlı türler: `resimden_sec`, `eslestir` (AK-10 3. adım). Öteki türler, Bahçe'nin `Question` bileşeni `ui/soru/`ya
 * alınınca (AK-7 1. satır) bağlanır; o zamana kadar yer tutucu.
 * Açık işler (4. adımın kabul listesine): genel adlar listesi içerik paketine (kumeDizini istemcide), `halkalar` gun-NN.json'da (İÇ),
 * `policy.akis.gunler` bayrağı ve Yol/Bugün bağlaması, kart kayıtları `srs.review` (source "drill", session "akis@…"),
 * halka sonu ekranı (TARGET3b 6), mini sahne (Ders `Diyalog`), seans halkası (K9).
 */
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { bilinmeyenler, kalipOrtu, kalipSecenekleri, kalipToks, kumeDizini, toks, YUVA, type Drill, type Lexeme, type LearnerItem } from "@dw/shared";
import { loadFoto, loadGenelAdlar, loadIndex, loadLexicon, loadM1Gun, loadTemeller, loadWorld, type FotoKayit } from "../services/content.ts";
import { getMeta, itemsMap, putItems, setMeta } from "../data/db.ts";
import { review } from "../core/srs.ts";
import { adimXpVer, bahceTamam, gunBittiYaz, soruXpVer } from "../services/ilerleme.ts";
import { personalizeDeep } from "../core/persona.ts";
import { useApp } from "../state.ts";
import { akisGunu, KIP, planGun } from "../core/akis.ts";
import { akisAnahtar, yeniKayit } from "../core/akisKayit.ts";
import { ProgressHeader } from "../ui/kit.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import type { Adim, Durak } from "../core/akis.ts";
import { durakGecisi, halkaOzeti, ilerle, seansDurumu, simdiki, type AkisKaydi } from "../core/akisKayit.ts";
import { resimSecenekleri } from "../core/halkaTur.ts";
import { ResimSec } from "../ui/soru/ResimdenSec.tsx";
import { Eslestir } from "../ui/soru/Eslestir.tsx";
import { ActionBar } from "../ui/kit.tsx";
import { Question } from "../ui/soru/Soru.tsx";
import { DrillView } from "../ui/drill.tsx";
import { BoslukAdimi, KalipAdimi, SahneAdimi, TanitAdimi, UretAdimi, YapbozAdimi, type CumleBilgi, type SahneVeri } from "../ui/soru/AkisAdim.tsx";
import type { QType, Yakinlik } from "../core/garden.ts";

/** Bahçe soru bileşeninin karşıladığı tek kartlı adım türleri */
const SORU = new Set<string>(["listen_meaning", "article", "colloc"]);
import { Icon } from "../ui/icons.tsx";

export interface AkisOynaticiProps {
  kayit: AkisKaydi;
  lex: ReadonlyMap<string, Lexeme>;
  harita: Readonly<Record<string, FotoKayit>>;
  /** cümle/kalıp çözümü ve K10 ipucu (ekran kurar) */
  baglam: AkisBaglam;
  /** kayıt değişti (çağıran `akis:<gün>`e yazar); `eski`: biten durağın eski ilerleme anahtarı (AK-6) */
  kaydet: (k: AkisKaydi, eski: string | null, atla: boolean) => void;
  cik: () => void;
}

/** Adımsız durağın var olan ekranı ve bitiş anahtarı (AK-6): ses/video → medya, prova, okuma */
export interface DurakHedef { href: string; /** hepsi bitince durak biter (ses durağında günün bütün sesleri) */ anahtarlar: string[] }

/** Planın cümlesinden ekranda çözülenler: Türkçe + kabul (halka görev cümleleri → kart örnekleri), kalıbın Türkçesi, K10 ipucu */
export interface AkisBaglam { adGerekli: (a: Adim) => boolean; tablo: (dersId: string) => { baslik_tr: string; sutunlar: string[]; satirlar: string[][] } | undefined; kalipOrnek: (kalip: string, d: Durak) => CumleBilgi[]; yakin: (adimId: string, d: Durak) => Yakinlik; teach: (dersId: string, oge: string) => { de: string; tr: string; ipucu?: string } | undefined; hedef: (d: Durak) => DurakHedef | null; cumle: (de: string) => CumleBilgi; sahne: (satirlar: string[]) => SahneVeri | undefined; isaretli: (de: string, adimId: string) => { sozcuk: string; tr?: string }[]; vurgu: (kart: string) => string[]; drill: (dersId: string, oge: string) => Drill | undefined; kalipTr: (de: string) => string; ipucu: (sozcuk: string) => string | undefined; gordu: (sozcukler: string[]) => void }

export function AkisOynatici({ kayit, lex, harita, baglam, kaydet, cik }: AkisOynaticiProps) {
  const [neden, setNeden] = useState(false);
  const son = useRef<string | null>(null);
  /** az önce biten halka (halka sonu ekranı; TARGET3b 6) */
  const [ozet, setOzet] = useState<{ durak: Durak; kayit: AkisKaydi } | null>(null);
  const s = simdiki(kayit);
  if (ozet) return <HalkaSonu ozet={halkaOzeti(ozet.kayit, ozet.durak)} lex={lex} sonraki={ozet.kayit.plan.duraklar[ozet.kayit.durak]} seans={seansDurumu(ozet.kayit)}
    devam={() => setOzet(null)} mola={cik} />;
  if (!s) return <section class="stack" data-test="akis-bitti"><p class="card">Bugünün durakları bitti.</p></section>;
  /** `atla`: adımsız durak "şimdi geç" ile geçildi — o durağın anahtarı yazılmaz (öğrenci sonra yine ulaşır; inceleme #184 P1-2) */
  const bitir = (sonuc: { kart: string; dogru: boolean }[], atla = false) => {
    // çift dokunuşta aynı adım iki kez işlenmez (inceleme #184 P2)
    if (son.current === s.adim.id) return; son.current = s.adim.id;
    const r = ilerle(kayit, sonuc); setNeden(false);
    if (s.durak.tur === "halka" && r.kayit.durak !== kayit.durak) setOzet({ durak: s.durak, kayit: r.kayit });
    kaydet(r.kayit, atla ? null : r.yazilacak, atla);
  };
  return (
    <section class="stack" data-test="akis" data-durak={s.durak.id} data-adim={s.adim.id} data-tur={s.adim.tur}>
      <header class="row" style={{ gap: 10, flexWrap: "nowrap", alignItems: "center" }}>
        <button class="iconbtn plain" aria-label="Çık" data-test="akis-cik" onClick={cik}><Icon name="x" /></button>
        {/* PM 7055715440 md. 1: en çok 8 adımda elmas, fazlasında dolan çubuk (yapılanla kalan ayırt edilsin) */}
        {s.toplam <= 8
          ? <div class="akis-elmaslar" role="progressbar" aria-label="Durağın adımları" aria-valuemin={0} aria-valuemax={s.toplam} aria-valuenow={s.sira}>
              {Array.from({ length: s.toplam }, (_, i) => <i class={`akis-elmas${i < s.sira ? " dolu" : i === s.sira ? " simdi" : ""}`} />)}
            </div>
          : <div class="akis-cubuk" role="progressbar" aria-label="Durağın adımları" aria-valuemin={0} aria-valuemax={s.toplam} aria-valuenow={s.sira} data-test="akis-cubuk"><i style={{ width: `${Math.round((s.sira / s.toplam) * 100)}%` }} /></div>}
        <button class="ikincil-eylem tiny" style={{ flex: "none", whiteSpace: "nowrap" }} data-test="akis-neden" aria-expanded={neden} onClick={() => setNeden((x) => !x)}>Neden bu?</button>
      </header>
      {neden && <p class="small muted" data-test="akis-neden-metin" style={{ margin: 0 }}>{s.adim.neden}</p>}
      <AdimGovdesi key={s.adim.id} adim={s.adim} durakOf={() => s.durak} lex={lex} harita={harita} baglam={baglam} tohum={`${kayit.plan.tohum}|${s.adim.id}`} bitir={bitir} />
    </section>
  );
}

function AdimGovdesi({ adim, durakOf, lex, harita, baglam, tohum, bitir }: { adim: Adim; durakOf: (a: Adim) => Durak; lex: ReadonlyMap<string, Lexeme>; harita: Readonly<Record<string, FotoKayit>>; baglam: AkisBaglam; tohum: string; bitir: (s: { kart: string; dogru: boolean }[], atla?: boolean) => void }) {
  // kancalar koşulsuz en üstte (adımsız durağın erken dönüşünden önce)
  const kartlar = adim.kartlar.map((k) => lex.get(k)).filter((x): x is Lexeme => !!x);
  const [gorselYok, setGorselYok] = useState(false);
  const soru = useMemo(() => (adim.tur === "resimden_sec" && kartlar[0] ? resimSecenekleri(kartlar[0], [...lex.values()], harita, tohum) : null), [adim.id]);
  // PM 7055715440 md. 3 (D-122): ad girilmemişse adlı cümle sorulmaz/gösterilmez; `_adsiz` biçimi gelene kadar o madde geçilir (sonuç yazılmaz)
  const adli = baglam.adGerekli(adim);
  useEffect(() => { if (adli) bitir([], true); }, [adim.id]);
  if (adli) return null;
  // adımsız durak (ses, video, prova, okuma): var olan ekrana gider, dönüşte akış ilerler (AK-6)
  if (durakGecisi(adim)) return <DurakGecis adim={adim} baslik={durakOf(adim).title_tr} dk={durakOf(adim).tahmini_dk} hedef={baglam.hedef(durakOf(adim))} bitir={() => bitir([], true)} />;
  if (adim.tur === "eslestir" && kartlar.length >= 4) return <Eslestir kartlar={kartlar} tohum={tohum} onBitti={bitir} />;
  // görsel gelmezse (çevrimdışı, önbellekte yok) resimden seç o adımda dinle-anlam sorusuna düşer (tek doğru cevap; inceleme #183 P1-2)
  if (adim.tur === "resimden_sec" && soru && !gorselYok) return <ResimSec soru={soru} lex={lex} harita={harita} onYok={() => setGorselYok(true)} onBitti={(ok) => bitir([{ kart: soru.kart, dogru: ok }])} />;
  // dersin alıştırma maddesi (K8 `kaynak: "ders"`): Ders oynatıcısının bileşeniyle, aynı denetimle
  const drill = adim.ders ? baglam.drill(adim.ders.id, adim.ders.oge) : undefined;
  if (drill && adim.tur !== "kalip" && adim.tur !== "tanit") return <div class="akis-soru"><DrillView key={adim.id} d={drill} onDone={(r) => bitir(adim.kartlar.map((kart) => ({ kart, dogru: r !== "wrong" })))} /></div>;
  // halka cümlesiyle çalışan adımlar (TARGET3c 1–3): cümle planlayıcının kapıdan geçirdiği cümle
  const hepsi = (ok: boolean) => bitir(adim.kartlar.map((kart) => ({ kart, dogru: ok })));
  // halka cümlesi her zaman planın kapıdan geçirdiği cümledir; Bahçe sorusuna düşülmez (inceleme #184 P0: düşünce kendi cümlesini seçiyordu)
  const b = adim.cumle ? baglam.cumle(adim.cumle) : null;
  if (b && (adim.tur === "tr_de" || adim.tur === "soyle" || adim.tur === "dikte"))
    return <UretAdimi key={adim.id} bilgi={b} kip={adim.tur === "dikte" || !b.tr ? "duy" : adim.tur === "soyle" ? "soyle" : "yaz"} onBitti={hepsi} />;
  if (b && adim.tur === "order")
    return <YapbozAdimi key={adim.id} bilgi={b} tohum={tohum} ipucu={baglam.ipucu} onBitti={(ok) => { baglam.gordu(b.de.split(/\s+/)); hepsi(ok); }} />;
  if (b && adim.tur === "gap") {
    const l0 = kartlar[0];
    return <BoslukAdimi key={adim.id} bilgi={b} bosluk={l0 ? [l0.de, ...(l0.forms ?? []).map((f) => f.answer)] : []} onBitti={hepsi} />;
  }
  // dil noktasının tablo ve hatırlatma öğesi: dersin öğretim öğesi (iç tür adı ekranda görünmez; inceleme #184 P1-4)
  if (adim.tur === "tablo" && adim.ders) {
    const tb = baglam.tablo(adim.ders.id);
    if (tb) return (
      <section class="stack fade" data-test="akis-tablo">
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Dil noktası</div>
        <h2 style={{ margin: 0 }}>{tb.baslik_tr}</h2>
        <div style={{ overflowX: "auto" }}><table class="akis-tablo-t" lang="de"><thead><tr>{tb.sutunlar.map((c) => <th>{c}</th>)}</tr></thead>
          <tbody>{tb.satirlar.map((r) => <tr>{r.map((c) => <td>{c}</td>)}</tr>)}</tbody></table></div>
        <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={() => bitir([])}>Anladım</button></ActionBar>
      </section>);
  }
  if (adim.tur === "tablo" || adim.tur === "hatirlat") {
    const t = adim.ders ? baglam.teach(adim.ders.id, adim.ders.oge) : undefined;
    return (
      <section class="stack fade" data-test="akis-dil-oge">
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Dil noktası</div>
        {t ? <><div class="de-lg" lang="de">{t.de}</div><p class="small muted" style={{ margin: 0 }}>{t.tr}</p>{t.ipucu && <p class="small" style={{ margin: 0 }}>{t.ipucu}</p>}</>
          : <p style={{ margin: 0 }}>{adim.neden}</p>}
        <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={() => bitir([])}>Anladım</button></ActionBar>
      </section>);
  }
  if (adim.tur === "kalip" && adim.cumle) {
    const parcalar = adim.cumle.split(/\s[–—]\s/);
    return <KalipAdimi key={adim.id} kalip={parcalar.map((de) => ({ de, tr: baglam.kalipTr(de) }))} ornekler={baglam.kalipOrnek(adim.cumle, durakOf(adim))} onBitti={() => hepsi(true)} />;
  }
  // mini sahne (TARGET3b 5, K6)
  if (adim.tur === "sahne" && adim.satirlar) { const sv = baglam.sahne(adim.satirlar); if (sv) return <SahneAdimi key={adim.id} sahne={sv} onBitti={hepsi} />; }
  // yeni kelime (TARGET3b 2): planın seçtiği cümleyle; cümlesiz tanıtımda Bahçe'nin tanıtımı
  if (adim.tur === "tanit" && kartlar[0] && adim.cumle && baglam.cumle(adim.cumle).tr) {
    const l0 = kartlar[0];
    return <TanitAdimi key={adim.id} bilgi={baglam.cumle(adim.cumle)} kelime={l0.art && l0.pos === "noun" ? `${l0.art} ${l0.de}` : l0.de} tr={l0.tr}
      vurgu={baglam.vurgu(l0.id)} isaretli={baglam.isaretli(adim.cumle, adim.id)} onBitti={() => hepsi(true)} />;
  }
  // Bahçe'nin soru bileşeni (AK-7 ortak): tanıtım ve tek kartlı soru türleri; cümle, kartın örneklerinden seçilir (planlayıcının seçtiği)
  const l = kartlar[0];
  if (l && (adim.tur === "tanit" || SORU.has(adim.tur) || adim.tur === "resimden_sec" || adim.tur === "tr_de" || adim.tur === "gap" || adim.tur === "order" || adim.tur === "soyle" || adim.tur === "dikte")) {
    const ex = Math.max(0, l.examples.findIndex((e) => e.de === adim.cumle));
    const tanit = adim.tur === "tanit";
    return <div class="akis-soru"><Question key={adim.id} q={{ lexId: l.id, type: tanit || !(SORU.has(adim.tur) || adim.tur === "tr_de") ? "listen_meaning" : (adim.tur as QType), intro: tanit, ex }} l={l} all={[...lex.values()]}
      yakin={baglam.yakin(adim.id, durakOf(adim))}
      onTanitimBitti={tanit ? () => bitir([{ kart: l.id, dogru: true }]) : undefined}
      onDone={(r) => bitir([{ kart: l.id, dogru: r.ok }])} /></div>;
  }
  // İSKELET: öteki türler (tanit, kalip, listen_meaning, gap, order, tr_de, dikte, soyle, sahne, ders_madde, …) ui/soru/ ortaklaşınca
  return (
    <section class="card stack" data-test="akis-yer-tutucu">
      <div class="kicker icerik">{adim.kaynak === "ders" ? "Dil noktası" : "Sıradaki adım"}</div>
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
        // kartın biçim cümleleri: planlayıcının boşluk adımı `form.de`yi cevabıyla doldurup sorar (inceleme #184 P0)
        for (const l of lexemes) for (const f of l.forms ?? []) { const de = f.de.replace(/___/g, f.answer); if (!cumleler.has(de)) cumleler.set(de, { de, tr: f.tr ?? "", accepted: [de] }); }
        for (const h of gun.halkalar) for (const g of h.gorev_cumleleri) cumleler.set(g.de, { de: g.de, tr: g.tr, accepted: [g.de, ...g.accepted] });
        const kaliplar = new Map<string, string>();
        for (const t of temel) for (const x of t.teach) kaliplar.set(x.de, x.tr);
        for (const h of gun.halkalar) for (const k of h.kaliplar ?? []) { const de = k.de.split(/\s[–—]\s/), tr = k.tr.split(/\s[–—]\s/); de.forEach((d, i) => kaliplar.set(d, tr[i] ?? k.tr)); kaliplar.set(k.de, k.tr); }
        // K10: kartsız küçük sözcüğün Türkçesi yapbozda ilk iki görüşte (sayaç cihazda)
        const cerceve = new Map(lexemes.filter((l) => l.card === false).map((l) => [l.de.toLowerCase(), l.tr]));
        const k10 = (await getMeta<Record<string, number>>("akis:k10")) ?? {};
        const kisi = { name: profile.displayName, address: profile.address };
        const bittiMi = async (k: string) => { const m = await getMeta<{ bitti?: unknown; ilkBitti?: unknown }>(k); return !!(m && (m.bitti || m.ilkBitti)); };
        const sesler = gun.sesler.map((x) => x.id);
        const sesBitti = new Set<string>(); for (const id of sesler) if (await bittiMi(`m1:medya:${id}`)) sesBitti.add(id);
        const hedef = (d: Durak): DurakHedef | null => {
          if (d.tur === "prova") return { href: `#/prova/${day}`, anahtarlar: [`m1:prova:${day}`] };
          if (d.tur === "okuma") return { href: `#/okuma/${day}`, anahtarlar: [`m1:okuma:${day}`] };
          if (d.tur === "video" && gun.video) return { href: `#/m1/${day}/${encodeURIComponent(gun.video.id)}`, anahtarlar: [`m1:medya:${gun.video.id}`] };
          // ses durağı günün bütün seslerini kapsar; sıradaki bitmemiş sese gider (inceleme #184 P1-3)
          if (d.tur === "ses" && sesler.length) { const s1 = sesler.find((x) => !sesBitti.has(x)) ?? sesler[0]!; return { href: `#/m1/${day}/${encodeURIComponent(s1)}`, anahtarlar: sesler.map((x) => `m1:medya:${x}`) }; }
          return null;
        };
        // dönüş: şimdiki adım bir durak geçişiyse ve o ekran bitmişse akış kendiliğinden ilerler (AK-6)
        for (let n = 0; n < 8; n++) {
          const s0 = simdiki(kayit); if (!s0 || !durakGecisi(s0.adim)) break;
          const h = hedef(s0.durak); if (!h) break;
          let hepsi = true; for (const k of h.anahtarlar) if (!(await bittiMi(k))) { hepsi = false; break; }
          if (!hepsi) break;
          kayit = ilerle(kayit, []).kayit; await setMeta(akisAnahtar(day), kayit);
        }
        // gösterimde K(t): bu adımdan önceki tanıtım ve kalıp adımları + önceki günler (planlayıcının kapısıyla aynı kaynak, yaklaşık)
        const dizin = kumeDizini(lexemes, temel, world, genel);
        const sira = kayit.plan.duraklar.flatMap((d) => d.adimlar);
        const bitenD = new Set(await oncekiDersler(idx.m1.filter((g) => g.day < day).map((g) => g.day)));
        const oncekiK = new Set(idx.m1.filter((g) => g.day < day).flatMap((g) => g.kartlar).filter((k) => items.get(k)?.passive?.fsrs));
        const adsiz = !profile.displayName;
        const hamDrill = (id: string, oge: string) => temel.find((t) => t.id === id)?.drills.find((x) => x.id === oge);
        const kartlarOnce = (adimId: string) => {
          const i = sira.findIndex((a) => a.id === adimId); const once = i < 0 ? sira : sira.slice(0, i + 1);
          return new Set([...oncekiK, ...once.filter((a) => a.tur === "tanit").flatMap((a) => a.kartlar)]);
        };
        const baglam: AkisBaglam = {
          // ad girilmemişse adlı madde geçilir (tanıtım ve kalıp hariç: kalıpta {name} yuva olarak çizilir; D-122, PM 7055715440 md. 3)
          adGerekli: (a) => adsiz && a.tur !== "kalip" && a.tur !== "tanit" && [a.cumle ?? "", ...(a.satirlar ?? []), a.ders ? JSON.stringify(hamDrill(a.ders.id, a.ders.oge) ?? "") : ""].some((x) => x.includes("{name}")),
          tablo: (id) => { const t = temel.find((x) => x.id === id)?.table; return t && personalizeDeep(t, kisi); },
          // kalıbın altında bu halkanın görev cümlelerinden kalıbı taşıyan 1–2 örnek (PM 7055715440 md. 2); yuvaya giren sözcük vurgulu
          kalipOrnek: (kalip, d) => {
            const parcalar = kalip.split(/\s[–—]\s/).map((x) => kalipToks(x));
            const durakCumle = new Set(d.adimlar.map((a) => a.cumle).filter((x): x is string => !!x));
            // önce halka görev cümleleri, yoksa planın kendi (kapıdan geçmiş) cümleleri — Türkçesi bilinenler
            const planCumle = sira.map((a) => a.cumle).filter((x): x is string => !!x).map((de) => cumleler.get(de)).filter((x): x is CumleBilgi => !!x && !!x.tr);
            const tekil = new Map([...gun.halkalar.flatMap((h) => h.gorev_cumleleri).map((g) => ({ de: g.de, tr: g.tr })), ...planCumle.map((g) => ({ de: g.de, tr: g.tr }))].map((g) => [g.de, g]));
            // kalıbın sabit sözcüklerinin hepsi cümlede geçiyorsa örnek; sıra şart değil (devrik sıra kalıbın konusu olabilir: "Im Frühling habe ich …")
            const sirali = (de: string, kp: string[]) => { const w = new Set(toks(de)); const sb = kp.filter((x) => x !== YUVA); return sb.length > 0 && sb.every((t) => w.has(t)); };
            const aday = [...tekil.values()].filter((g) => !g.de.includes("{name}") || !adsiz)
              .filter((g) => parcalar.some((kp) => sirali(g.de, kp)) && !parcalar.some((kp) => kp.every((t) => t !== YUVA) && toks(g.de).join(" ") === kp.join(" ")))
              .sort((a, b) => Number(durakCumle.has(b.de)) - Number(durakCumle.has(a.de)));
            const sabit = new Set(parcalar.flat().filter((t) => t !== YUVA));
            // vurgu: yalnız yuvanın yerine giren sözcük — sabit parçanın bitişik geçtiği yerde yuvanın komşusu ("im …" → "im"den sonraki sözcük)
            const yuvaSozcuk = (de: string): string[] => {
              const w = de.split(/\s+/), n = w.map((x) => x.replace(/[.,!?;:„“"]/g, "").toLowerCase());
              for (const kp of parcalar) {
                const y = kp.indexOf(YUVA); if (y < 0) continue;
                const once = kp.slice(0, y), sonra = kp.slice(y + 1).filter((t) => t !== YUVA);
                for (let i = 0; i + once.length <= n.length; i++) {
                  if (!once.every((t, k) => n[i + k] === t)) continue;
                  const j = i + once.length; if (j >= w.length) continue;
                  if (!sonra.length) return [w[j]!];
                  const son = n.indexOf(sonra[0]!, j + 1); if (son > j) return w.slice(j, son);
                }
              }
              return [];
            };
            void sabit;
            const ornek = aday.slice(0, 2).map((g) => ({ de: g.de, tr: g.tr, accepted: [g.de], vurgu: yuvaSozcuk(g.de) }));
            // yuvasız tam ifade ("Wir haben November.", "Anfang Mai") ve örnek yoksa: kalıbın kendisi sesli örnek olur
            if (!ornek.length) for (const x of kalip.split(/\s[–—]\s/)) if (!/…|\{/.test(x)) ornek.push({ de: x, tr: kaliplar.get(x) ?? "", accepted: [x], vurgu: [] });
            return ornek.slice(0, 2).map((o) => personalizeDeep(o, kisi));
          },
          yakin: (adimId, d) => ({ tur: new Set(d.adimlar.flatMap((a) => a.kartlar)), bilinen: kartlarOnce(adimId), yalniz: true }),
          hedef,
          teach: (id, oge) => { const t = temel.find((x) => x.id === id)?.teach.find((x) => x.id === oge); return t && personalizeDeep({ de: t.de, tr: t.tr, ipucu: t.exp?.ipucu_tr }, kisi); },
          // gösterimde ad ve hitap yerleşir (Ders ekranıyla aynı: personalizeDeep); plan ham metinle kurulur (yer tutucu sayılmaz)
          cumle: (de) => personalizeDeep(cumleler.get(de) ?? { de, tr: "", accepted: [de] }, kisi),
          drill: (id, oge) => { const d = temel.find((t) => t.id === id)?.drills.find((x) => x.id === oge); return d && personalizeDeep(d, kisi); },
          kalipTr: (de) => kaliplar.get(de) ?? "",
          sahne: (satirlar) => { const h = gun.halkalar.find((x) => x.sahne && x.sahne.satirlar.map((y) => y.de).join("\n") === satirlar.join("\n")); return h?.sahne && personalizeDeep(h.sahne, kisi); },
          vurgu: (kart) => [...(dizin.yuzey.get(kart) ?? [])],
          isaretli: (de, adimId) => {
            const i = sira.findIndex((a) => a.id === adimId); const once = i < 0 ? sira : sira.slice(0, i + 1);
            const kart = new Set([...oncekiK, ...once.filter((a) => a.tur === "tanit").flatMap((a) => a.kartlar)]);
            const kaliplarK = once.filter((a) => a.tur === "kalip" && a.cumle).flatMap((a) => kalipSecenekleri(a.cumle));
            return bilinmeyenler(dizin, de, { kart, biten: bitenD, kaliplar: kaliplarK }).map((u) => ({ sozcuk: u.sozcuk, tr: u.adaylar?.map((x) => lex.get(x)?.tr).find(Boolean) }));
          },
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
  const kaydet = async (k: AkisKaydi, eski: string | null, atla = false) => {
    // yeni sonuçlar kart kaydına: son ilerleme ile önceki arasındaki fark
    const yeni = k.sonuclar.slice(v.kayit.sonuclar.length);
    const adim = v.kayit.plan.duraklar[v.kayit.durak]?.adimlar.find((a) => yeni[0] && a.id === yeni[0].adim);
    // etkin kanıt yalnız gerçekten üretim istenen adımda: cümlesiz yedeği anlama sorusu olan adım edilgen yazılır (inceleme #184 Y-1)
    const yol = adim && (KIP[adim.tur] === "kur" || KIP[adim.tur] === "soyle") && (adim.cumle || adim.tur === "tr_de" || adim.ders) ? "active" : "passive";
    const degisen: LearnerItem[] = [];
    for (const r of yeni) {
      // XP: her doğru cevap bir kez (akış adımı + kart); tanıtım değerlendirme değildir, kart kaydına yazılmaz (Bahçe gibi; inceleme #184 P1-5, P2)
      if (r.dogru && adim?.tur !== "tanit") void soruXpVer(`akis:${day}:${r.adim}:${r.kart}`);
      if (!v.lex.has(r.kart) || adim?.tur === "tanit") continue;
      const it = review(v.items.get(r.kart), { itemId: r.kart, kind: "lexeme", path: yol, outcome: r.dogru ? "correct" : "wrong", session: `akis@${day}`, source: "drill", ctx: adim?.tur });
      v.items.set(r.kart, it); degisen.push(it);
    }
    await putItems(degisen);
    await setMeta(akisAnahtar(day), k);
    // durak bitişi bir adım XP'si (Yol/Bugün'deki adım XP'siyle aynı ölçü; seri bugünkü etkinlikten sayılır)
    if (k.durak !== v.kayit.durak && !atla) { const biten = v.kayit.plan.duraklar[v.kayit.durak]; if (biten) void adimXpVer(`akis:${day}:${biten.id}`); }
    // AK-6 uyumluluk: biten durağın eski anahtarı (Yol, Bugün, XP, seri, gün sonu değişmeden çalışsın)
    if (eski) {
      if (eski.startsWith("m1:bahce:")) await bahceTamam(day);
      else if (eski.startsWith("m1:gun:")) await gunBittiYaz(day);
      else { const m = await getMeta<{ bitti?: unknown }>(eski); if (!m?.bitti) await setMeta(eski, { ...(m ?? {}), bitti: new Date().toISOString(), akis: true }); }
    }
    setV({ ...v, kayit: k });
  };
  return <AkisOynatici kayit={v.kayit} lex={v.lex} harita={v.harita} baglam={v.baglam} kaydet={(k, e, a) => void kaydet(k, e, a)} cik={() => { location.hash = `#/m1/${day}`; }} />;
}

/** önceki günlerin bitmiş temel dersleri (`ders:<id>` ilerlemesi) */
async function oncekiDersler(gunler: number[]): Promise<string[]> {
  const out: string[] = [];
  for (const g of gunler) { try { const d = await loadM1Gun(g); for (const id of d.dersler) if (await getMeta(`ders:${id}`)) out.push(id); } catch { /* gün yok */ } }
  return out;
}

/** Halka sonu (TARGET3b 6): beş elmas dolu, başlık, kelime başına dört nokta; sıradaki durak ve seans satırı; Filiz yok */
function HalkaSonu({ ozet, lex, sonraki, seans, devam, mola }: { ozet: ReturnType<typeof halkaOzeti>; lex: ReadonlyMap<string, Lexeme>; sonraki?: Durak; seans: ReturnType<typeof seansDurumu>; devam: () => void; mola: () => void }) {
  const s = sonraki ? seans.find((x) => x.seans === sonraki.seans) : undefined;
  return (
    <section class="stack fade" data-test="halka-sonu">
      <div class="row" style={{ justifyContent: "center", gap: 6 }} aria-hidden="true">{[0, 1, 2, 3, 4].map(() => <i class="akis-elmas dolu" style={{ flex: "none", width: 18 }} />)}</div>
      <h1 style={{ textAlign: "center", margin: 0 }}>Halka tamam</h1>
      <p class="small muted" style={{ textAlign: "center", margin: 0 }}>Her nokta bir beceri: gördün, duydun, kurdun, söyledin.</p>
      <section class="card stack" style={{ gap: 0 }} data-test="halka-sonu-liste">
        {ozet.map((o) => { const l = lex.get(o.kart); return (
          <div class="row" style={{ flexWrap: "nowrap", alignItems: "center", minHeight: 44, gap: 8 }} data-kart={o.kart}>
            <span class="grow"><b lang="de">{l ? (l.art && l.pos === "noun" ? `${l.art} ${l.de}` : l.de) : o.kart}</b> <span class="small muted">{l?.tr}</span></span>
            <span class="row" style={{ gap: 4 }} aria-label={`gördün ${o.kip.gor ? "evet" : "henüz değil"}, duydun ${o.kip.duy ? "evet" : "henüz değil"}, kurdun ${o.kip.kur ? "evet" : "henüz değil"}, söyledin ${o.kip.soyle ? "evet" : "henüz değil"}`}>
              {(["gor", "duy", "kur", "soyle"] as const).map((k) => <i class={`kip-nokta${o.kip[k] ? " dolu" : ""}`} data-kip={k} />)}
            </span>
          </div>); })}
      </section>
      <p class="tiny muted" style={{ margin: 0 }}>Boş kalan nokta bugün sonraki duraklarda dolacak.</p>
      {sonraki && <section class="card row" style={{ flexWrap: "nowrap", gap: 10 }} data-test="halka-sonu-sonraki"><span class="grow"><b>Sıradaki durak: {sonraki.title_tr}</b><br /><span class="small muted">Yaklaşık {Math.max(1, Math.round(sonraki.tahmini_dk))} dakika.</span></span></section>}
      {s && <p class="small muted" style={{ margin: 0 }} data-test="halka-sonu-seans">{s.seans}. seans: {s.biten}/{s.toplam} durak tamam.</p>}
      <ActionBar>
        <button class="btn primary" style={{ width: "100%" }} data-test="halka-sonu-devam" onClick={devam}>Devam et</button>
        <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="halka-sonu-mola" onClick={mola}>Mola ver</button></div>
      </ActionBar>
    </section>
  );
}

/** Adımsız durak (AK-6): var olan ekrana gider; o ekran bitince (`bitti`/`ilkBitti`) akış dönüşte kendiliğinden ilerler */
/** "önce duy: sesleri ayırt et" → "Önce duy: sesleri ayırt et." */
const cumleYap = (t: string) => { const x = t.trim(); return x ? x[0]!.toLocaleUpperCase("tr") + x.slice(1) + (/[.!?]$/.test(x) ? "" : ".") : ""; };

function DurakGecis({ adim, baslik, dk, hedef, bitir }: { adim: Adim; baslik: string; dk: number; hedef: DurakHedef | null; bitir: () => void }) {
  return (
    <section class="card stack" data-test="akis-durak-gecis" data-hedef={hedef?.href}>
      <div class="kicker icerik">Sıradaki durak</div>
      <h2 style={{ margin: 0 }}>{baslik}</h2>
      {/* PM 7055715440 md. 4: tek cümle (büyük harfle başlar, noktayla biter) ve yaklaşık süre; iç not değil */}
      <p class="small muted" style={{ margin: 0 }} data-test="durak-cumle">{cumleYap(adim.neden)} Yaklaşık {Math.max(1, Math.round(dk))} dakika.</p>
      <ActionBar>
        {hedef
          ? <a class="btn primary" style={{ width: "100%" }} href={hedef.href} data-test="akis-durak-basla">Başla</a>
          : <button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={bitir}>Devam et</button>}
        {hedef && <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="akis-durak-gec" onClick={bitir}>Bu durağı şimdi geç</button></div>}
      </ActionBar>
    </section>
  );
}
