/**
 * PR B-3 (PM-108 B md. 2): gün kilidi kapısı ve hafta sonu testi.
 *  - `GunKapisi`: adresle elle açılan kilitli gün (`#/akis/<g>`, `#/garden/<g>`, `#/m1/<g>…`, `#/prova/<g>`, `#/okuma/<g>`) kapanır.
 *    Karar kalıcı gün bitişlerinden (`m1:gun:<g>`; `core/gun.ts` `gunKilitli`); gün dosyası yüklenmez.
 *  - `HaftaTestiEkrani` (`#/hafta/<H>`): haftanın paketteki bütün günleri bitince açılır; maddeler sırayla (ortak `DrillView`),
 *    sonuç `m1:hafta:<H>` (en iyi sonuç kalır). Test sonraki haftayı kilitlemez.
 *  - Düşük sonuç (< policy `hafta_testi.gecme_orani`; #243 PM finali takip a): "geçtin" denmez; zayıf kalan "yapabiliyorum"
 *    cümleleri listelenir, tek dokunuş o cümlelerin tekrarına götürür (`HaftaTekrarEkrani`, `#/hafta/<H>/tekrar/<g,…>`).
 */
import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { Drill } from "@dw/shared";
import { useApp } from "../state.ts";
import { gunKilitli, haftaBitti, haftaOf } from "../core/gun.ts";
import { tekrarAdresi, tekrarMaddeleri, zayiflar } from "../core/haftaTesti.ts";
import { personalizeDeep } from "../core/persona.ts";
import { loadHaftaTesti, loadM1Gun, type HaftaTesti } from "../services/content.ts";
import { gunBitisleri, haftaSonOku, haftaSonucYaz, type HaftaSon } from "../services/ilerleme.ts";
import { DrillView, type DrillSonuc } from "../ui/drill.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { ActionBar, ProgressHeader } from "../ui/kit.tsx";
import POLICY from "../policy.json" with { type: "json" };

function Kilitli({ ust, baslik, metin, test = "gun-kilitli", ek }: { ust: string; baslik: string; metin: string; test?: string; ek?: ComponentChildren }) {
  return (
    <div class="stack" data-test={test}>
      <ProgressHeader title={ust} back="#/today" />
      <section class="card stack"><h2>{baslik}</h2><p>{metin}</p>{ek}</section>
      <ActionBar><a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a></ActionBar>
    </div>
  );
}

/**
 * Sonuç kartı (çözüm bitince ve `#/hafta/<H>/sonuc`'ta aynı): geçince kısa cümle; geçmeyince "geçtin" yok, zayıf "yapabiliyorum"
 * cümleleri + tek dokunuş tekrar (#243 takip a). Son çözüm cihazda kalır (inceleme #244 P2-2): ekran kapansa da liste geri gelir.
 */
function SonucKarti({ hafta, son, beceriler }: { hafta: number; son: HaftaSon; beceriler: HaftaTesti["beceriler"] }) {
  const { dogru, toplam } = son;
  const gecti = (toplam ? dogru / toplam : 0) >= POLICY.hafta_testi.gecme_orani;
  const zayif = gecti ? [] : zayiflar(beceriler, new Set(son.yanlis));
  return (
    <div class="stack" data-test="hafta-testi-sonuc" data-dogru={dogru} data-toplam={toplam} data-gecti={gecti ? "1" : "0"}>
      <ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" ilerleme={{ n: toplam, toplam }} />
      <section class="card stack">
        <h2>{dogru}/{toplam} doğru</h2>
        {gecti
          ? <p>{hafta}. haftanın öğrettiklerini kullanabiliyorsun.</p>
          : zayif.length
            ? <p>Bu hafta henüz tam oturmadı. Şunları yaparken zorlandın:</p>
            : <p>Zorlandığın yerleri {hafta}. haftanın günlerindeki Rehber'den yeniden okuyabilirsin. Testi istediğin zaman yeniden çözebilirsin; en iyi sonucun kalır.</p>}
        {zayif.length > 0 && <>
          <ol class="zayif-liste" data-test="zayif-liste">{zayif.map((z) => (
            <li class="row" data-test={`zayif-${z.gun}`} data-gun={z.gun}>
              <a class="grow zayif-cumle" href={tekrarAdresi(hafta, [z.gun])} data-test={`zayif-tekrar-${z.gun}`} aria-label={`${z.gun}. günü tekrar et: ${z.tr}`}>
                <span class="tiny muted">{z.gun}. GÜN · {z.dogru}/{z.toplam} DOĞRU</span>
                <span class="zayif-tr">{z.tr}</span>
              </a>
              <a class="rehber-btn" href={`#/rehber/${z.gun}`} aria-label={`${z.gun}. günün rehberi`}>Rehber</a>
            </li>))}</ol>
          <p class="small muted">Sıradaki hafta açık kalır. Tekrardan sonra <a href={`#/hafta/${hafta}`} data-test="testi-yeniden">testi yeniden çöz</a>; en iyi sonucun kalır.</p>
        </>}
      </section>
      <ActionBar>
        {zayif.length > 0
          ? <div class="stack"><a class="btn primary block" href={tekrarAdresi(hafta, zayif.map((z) => z.gun))} data-test="zayif-tekrar">Bunları tekrar et</a>
              <a class="btn block" href="#/today" data-test="bugune-don">Bugüne dön</a></div>
          : <a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a>}
      </ActionBar>
    </div>
  );
}

/** `#/hafta/<H>/sonuc`: son çözümün sonucu (Yol'daki düşük sonuç satırı ve tekrar ekranının geri oku buraya gelir) */
export function HaftaSonucEkrani({ hafta }: { hafta: number }) {
  const { index } = useApp();
  const [v, setV] = useState<{ son: HaftaSon; test: HaftaTesti } | null | "yok">(null);
  const [err, setErr] = useState<string | null>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!index) return;
    setErr(null);
    (async () => {
      const [son, test] = await Promise.all([haftaSonOku(hafta), loadHaftaTesti(hafta)]);
      setV(son && test ? { son, test } : "yok");
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, hafta, n]);
  if (err) return <div class="stack"><ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" /><ErrorPanel message={err} onRetry={() => setN((x) => x + 1)} /></div>;
  if (!v) return <Loading />;
  if (v === "yok") return <Kilitli ust={`${hafta}. hafta sonu testi`} baslik="Henüz sonuç yok" metin="Bu haftanın testini henüz çözmedin." test="hafta-sonuc-yok"
    ek={<a class="btn sm" href={`#/hafta/${hafta}`} data-test="testi-coz">Testi çöz</a>} />;
  return <SonucKarti hafta={hafta} son={v.son} beceriler={v.test.beceriler} />;
}

/** Yalnız e2e paketi: eski testler tek günü adresle açar; taban `sessionStorage["e2e-gun-kilidi"] = "kapali"` (tests/e2e/common.py),
 *  kilidi sınayan test "acik" yazar; "önceki günler oynanmış" öğrenci (`dw-e2e-onceki=hepsi`) kilitsizdir. Üretimde okunmaz: kilit hep açık. */
function e2eKilitsiz(): boolean {
  if (import.meta.env.MODE !== "e2e") return false;
  try { return sessionStorage.getItem("e2e-gun-kilidi") === "kapali" || localStorage.getItem("dw-e2e-onceki") === "hepsi"; } catch { return false; }
}

/** Kilitli gün kapısı: önceki günlerin hepsi bitmeden bu günün ekranı açılmaz */
export function GunKapisi({ day, children }: { day: number; children: ComponentChildren }) {
  const { index } = useApp();
  const [kilit, setKilit] = useState<boolean | null>(null);
  useEffect(() => {
    if (!index) return;
    if (e2eKilitsiz()) { setKilit(false); return; }
    let iptal = false;
    // okunamazsa açık bırakılır: kapı bir güvenlik değil sıra kuralıdır; ekran kendi hatasını gösterir
    void gunBitisleri().then((b) => !iptal && setKilit(gunKilitli(day, index.m1.map((g) => g.day), b))).catch(() => !iptal && setKilit(false));
    return () => { iptal = true; };
  }, [index?.version, day]);
  if (kilit === null) return <Loading />;
  if (kilit) return <Kilitli ust={`${day}. gün`} baslik="Bu gün henüz kilitli" metin="Günler sırayla açılır. Önceki günleri bitirince bu gün kendiliğinden açılacak." />;
  return <>{children}</>;
}

export function HaftaTestiEkrani({ hafta }: { hafta: number }) {
  const { index, profile } = useApp();
  const [test, setTest] = useState<HaftaTesti | null | "yok" | "kilitli">(null);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState(0);
  const [dogru, setDogru] = useState(0);
  const [bitti, setBitti] = useState(false);
  const [yanlis, setYanlis] = useState<Set<string>>(new Set());
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!index) return;
    setErr(null);
    (async () => {
      const b = await gunBitisleri();
      if (!haftaBitti(hafta, index.m1.map((g) => g.day), b)) return setTest("kilitli");
      const t = await loadHaftaTesti(hafta);
      setTest(t ? personalizeDeep(t, { name: profile.displayName, address: profile.address }) : "yok");
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, hafta, n]);
  if (err) return <div class="stack"><ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" /><ErrorPanel message={err} onRetry={() => setN((x) => x + 1)} /></div>;
  if (!test) return <Loading />;
  if (test === "kilitli") return <Kilitli ust={`${hafta}. hafta sonu testi`} baslik="Test henüz kilitli" metin={`Test, ${hafta}. haftanın bütün günleri bitince açılır.`} />;
  if (test === "yok") return <Kilitli ust={`${hafta}. hafta sonu testi`} baslik="Test hazırlanıyor" metin="Bu haftanın testi henüz hazır değil." />;
  const toplam = test.maddeler.length;
  if (bitti) return <SonucKarti hafta={hafta} son={{ dogru, toplam, yanlis: [...yanlis], at: "" }} beceriler={test.beceriler} />;
  const d = test.maddeler[q]!;
  const sonra = (r: DrillSonuc) => {
    const yeni = dogru + (r === "wrong" ? 0 : 1);
    if (r === "wrong") setYanlis((y) => new Set([...y, d.id]));
    const yeniYanlis = r === "wrong" ? [...yanlis, d.id] : [...yanlis];
    if (q + 1 >= toplam) { setDogru(yeni); setBitti(true); void haftaSonucYaz(hafta, yeni, toplam, yeniYanlis); window.scrollTo(0, 0); }
    else { setDogru(yeni); setQ(q + 1); window.scrollTo(0, 0); }
  };
  return (
    <div class="stack" data-test="hafta-testi" data-hafta={hafta} data-q={q}>
      <ProgressHeader title={`${hafta}. hafta sonu testi`} back="#/today" ilerleme={{ n: q, toplam }} />
      <DrillView key={d.id} d={d} sira={`${q + 1}/${toplam}`} onDone={sonra} />
    </div>
  );
}

/**
 * Zayıf "yapabiliyorum" cümlelerinin tekrarı (#243 PM finali takip a): her zayıf günün gün sınavından kısa tur (`tekrarMaddeleri`).
 * Yalnız bitmiş günler (adresle kilitli gün girmez). Sonuç kaydedilmez; sonda "Testi yeniden çöz".
 */
export function HaftaTekrarEkrani({ hafta, gunler }: { hafta: number; gunler: number[] }) {
  const { index, profile } = useApp();
  const [tur, setTur] = useState<{ gun: number; tr: string; d: Drill }[] | null | "bos">(null);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState(0);
  const [dogru, setDogru] = useState(0);
  const [bitti, setBitti] = useState(false);
  const [n, setN] = useState(0);
  const baslik = "Zorlandıklarını tekrar et";
  useEffect(() => {
    if (!index) return;
    setErr(null);
    (async () => {
      const b = await gunBitisleri();
      const var_ = new Set(index.m1.map((g) => g.day));
      const secilen = [...new Set(gunler)].filter((g) => haftaOf(g) === hafta && var_.has(g) && (e2eKilitsiz() || b.has(g))).sort((x, y) => x - y);
      const kisi = { name: profile.displayName, address: profile.address };
      const out: { gun: number; tr: string; d: Drill }[] = [];
      for (const g of secilen) {
        const gun = await loadM1Gun(g);
        for (const d of tekrarMaddeleri(gun.gun_sinavi?.maddeler ?? [])) out.push({ gun: g, tr: gun.can_do.tr, d: personalizeDeep(d, kisi) });
      }
      setTur(out.length ? out : "bos");
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, hafta, gunler.join(","), n]);
  if (err) return <div class="stack"><ProgressHeader title={baslik} back={`#/hafta/${hafta}/sonuc`} /><ErrorPanel message={err} onRetry={() => setN((x) => x + 1)} /></div>;
  if (!tur) return <Loading />;
  if (tur === "bos") return <Kilitli ust={baslik} baslik="Burada tekrar yok" metin="Bu günler henüz bitmedi ya da tekrar alıştırması yok." test="hafta-tekrar-bos"
    ek={gunler.filter((g) => haftaOf(g) === hafta && index?.m1.some((x) => x.day === g)).slice(0, 1).map((g) => <a class="btn sm" href={`#/rehber/${g}`}>{g}. günün Rehber'i</a>)} />;
  if (bitti) return (
    <div class="stack" data-test="hafta-tekrar-sonuc" data-dogru={dogru} data-toplam={tur.length}>
      <ProgressHeader title={baslik} back="#/today" ilerleme={{ n: tur.length, toplam: tur.length }} />
      <section class="card stack"><h2>Tekrar bitti · {dogru}/{tur.length}</h2><p>Şimdi testi yeniden çözebilirsin; en iyi sonucun kalır.</p></section>
      <ActionBar><div class="stack"><a class="btn primary block" href={`#/hafta/${hafta}`} data-test="testi-yeniden">Testi yeniden çöz</a>
        <a class="btn block" href="#/today" data-test="bugune-don">Bugüne dön</a></div></ActionBar>
    </div>
  );
  const m = tur[q]!;
  const sonra = (r: DrillSonuc) => {
    if (r !== "wrong") setDogru((x) => x + 1);
    if (q + 1 >= tur.length) setBitti(true); else setQ(q + 1);
    window.scrollTo(0, 0);
  };
  return (
    <div class="stack" data-test="hafta-tekrar" data-hafta={hafta} data-q={q} data-gun={m.gun}>
      <ProgressHeader title={baslik} back={`#/hafta/${hafta}/sonuc`} ilerleme={{ n: q, toplam: tur.length }} />
      <p class="small tekrar-cumle" data-test="tekrar-cumle"><b>{m.gun}. gün:</b> {m.tr}</p>
      <DrillView key={`${m.gun}:${m.d.id}`} d={m.d} sira={`${q + 1}/${tur.length}`} onDone={sonra} />
    </div>
  );
}
