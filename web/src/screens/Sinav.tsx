/**
 * Sınav günü (PM-101 md. 5, PM-110; PM-112 B): `#/sinav/<gün>` o günün deneme bölümlerini açar (A1: 55. gün dinleme + okuma,
 * 56. gün yazma + konuşma); `#/sinav/<gün>/<bölüm>` tek bölümü yeniden çözdürür. Gün kapısının içindedir (app.tsx).
 *  - Sınav boyunca doğru cevap gösterilmez; puan bölüm sonunda. Dinlemede kayıt yönergedeki sayıda çalınır, metin gösterilmez.
 *  - Konuşma hazırlıksızdır: örnek cevaplar cevaptan SONRA, öz-puanlamada görünür. Yazma 2 (mesaj) ölçütlerle öz-puanlanır.
 *  - Sonuç `m1:sinav:<deneme>:<bölüm>` (son çözüm sayılır). Günün bölümleri bitince gün biter (`m1:gun:<gün>`) ve adım XP'si bir kez.
 *  - Bütün bölümler çözülünce deneme sonucu: toplam ≥ %60 ve konuşma ≥ %60 (PM-087 ek); geçmeyince zayıf bölümler ve yeniden çözme.
 */
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Deneme, DenemeBolum, Drill, Gun } from "@dw/shared";
import { mesajOlcutleri } from "@dw/shared";
import { useApp } from "../state.ts";
import { BOLUM_TR, bolumlerTr, sinavBolumleri } from "../core/gun.ts";
import { bolumMaddeleri, bolumPuani, denemeSonucu, olcutSecenekleri, otomatik, ozSecenekler, puanTr, type Cevap } from "../core/deneme.ts";
import { personalizeDeep } from "../core/persona.ts";
import { loadDeneme, loadM1Gun } from "../services/content.ts";
import { adimXpVer, gunBittiYaz, sinavBolumYaz, sinavSonuclari, type SinavBolumSonuc } from "../services/ilerleme.ts";
import { stopSpeaking } from "../services/speech.ts";
import { drillVerdict } from "../ui/drill.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { ActionBar, ProgressHeader } from "../ui/kit.tsx";
import { Rich } from "../ui/rich.tsx";
import { MaddeView } from "../ui/denemeMadde.tsx";

const E2E = import.meta.env.MODE === "e2e";
/** örnek cevapta ad yuvası: profilde ad yoksa "(adın)" görünür (süslü yuva öğrenciye çıkmaz) */
const adli = (s: string) => s.replace(/\{name\}/g, "(adın)");
type Veri = { gun: Gun; deneme: Deneme; sonuclar: Map<string, SinavBolumSonuc> };
type Asama = { t: "giris" } | { t: "coz"; b: DenemeBolum; i: number } | { t: "puanla"; b: DenemeBolum } | { t: "sonuc"; b: DenemeBolum; s: SinavBolumSonuc };

export function SinavEkrani({ day, bolum }: { day: number; bolum?: string }) {
  const { index, profile } = useApp();
  const [v, setV] = useState<Veri | "degil" | "hazirlaniyor" | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [n, setN] = useState(0);
  const [asama, setAsama] = useState<Asama>({ t: "giris" });
  const [cevap, setCevap] = useState<Record<string, Cevap>>({});
  const [oz, setOz] = useState<Record<string, number>>({});
  const baslik = `${day}. gün · Deneme sınavı`;
  // kayıt sürerken ikinci dokunuş yeni kayıt açmaz; yazım düşerse hata paneli (inceleme #247 P2-1)
  const kaydediyor = useRef(false);
  useEffect(() => {
    if (!index) return;
    setErr(null);
    (async () => {
      const gun = await loadM1Gun(day);
      if (!gun.sinav) return setV("degil");
      const d = await loadDeneme(gun.sinav);
      if (!d) return setV("hazirlaniyor");
      const deneme = personalizeDeep(d, { name: profile.displayName, address: profile.address });
      setV({ gun, deneme, sonuclar: await sinavSonuclari(deneme.id) });
    })().catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, day, n]);
  // tek bölüm adresi (#/sinav/<g>/<bölüm>): yüklenince doğrudan o bölüm başlar
  useEffect(() => {
    if (!v || typeof v === "string" || !bolum) return;
    // yalnız bu günün bölümü ya da daha önce çözülmüş bölüm (yeniden çöz): başka günün bölümü adresle önceden bitirilemez (inceleme #247 P2-2)
    const b = v.deneme.bolumler.find((x) => x.id === bolum);
    if (b && (sinavBolumleri(v.gun).includes(b.id) || v.sonuclar.has(b.id))) baslat(b);
  }, [v && typeof v !== "string" ? v.deneme.id : null, bolum]);
  useEffect(() => () => stopSpeaking(), []);

  if (err) return <div class="stack"><ProgressHeader title={baslik} back="#/today" /><ErrorPanel message={err} onRetry={() => setN((x) => x + 1)} /></div>;
  if (!v) return <Loading />;
  if (v === "degil" || v === "hazirlaniyor") return (
    <div class="stack" data-test={v === "degil" ? "sinav-degil" : "sinav-hazirlaniyor"}>
      <ProgressHeader title={baslik} back="#/today" />
      <section class="card stack"><h2>{v === "degil" ? "Bu gün sınav günü değil" : "Deneme hazırlanıyor"}</h2>
        <p>{v === "degil" ? "Bu günün dersleri Yol'da." : "Bu günün deneme sınavı henüz hazır değil. Hazır olunca burada açılır."}</p></section>
      <ActionBar><a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a></ActionBar>
    </div>
  );
  const { gun, deneme, sonuclar } = v;
  const gunun = sinavBolumleri(gun).map((id) => deneme.bolumler.find((b) => b.id === id)).filter((b): b is DenemeBolum => !!b);

  function baslat(b: DenemeBolum) { setCevap({}); setOz({}); setAsama({ t: "coz", b, i: 0 }); window.scrollTo(0, 0); }
  async function kaydet(b: DenemeBolum, cevaplar: Record<string, Cevap>, ozp: Record<string, number>) {
    if (kaydediyor.current) return;
    kaydediyor.current = true;
    try { await kaydetIc(b, cevaplar, ozp); } catch (e) { setErr(`Sonuç kaydedilemedi: ${String((e as Error)?.message || e)}`); } finally { kaydediyor.current = false; }
  }
  async function kaydetIc(b: DenemeBolum, cevaplar: Record<string, Cevap>, ozp: Record<string, number>) {
    const p = bolumPuani(b, cevaplar, ozp);
    const s = { puan: p.puan, ham: p.ham, hamToplam: b.ham_puan, maddeler: p.maddeler };
    await sinavBolumYaz(deneme.id, b.id, s);
    const yeni = await sinavSonuclari(deneme.id);
    if (gunun.every((x) => yeni.has(x.id))) { await gunBittiYaz(day); await adimXpVer(`sinav:${day}`); }
    setV({ gun, deneme, sonuclar: yeni });
    setAsama({ t: "sonuc", b, s: { ...s, at: "" } });
    window.scrollTo(0, 0);
  }

  if (asama.t === "coz") {
    const { b, i } = asama;
    const adimlar = b.kisimlar.flatMap((k, ki) => k.maddeler.map((m) => ({ k, ki, m })));
    const x = adimlar[i]!;
    const ileri = (c: Cevap) => {
      const yeni = { ...cevap, [x.m.id]: c };
      setCevap(yeni);
      if (i + 1 < adimlar.length) { setAsama({ t: "coz", b, i: i + 1 }); window.scrollTo(0, 0); return; }
      // öz-puan gereken madde varsa önce puanlama; yoksa doğrudan kayıt
      if (bolumMaddeleri(b).some((m) => !otomatik(m))) { setAsama({ t: "puanla", b }); window.scrollTo(0, 0); }
      else void kaydet(b, yeni, {});   // son cevap state'e yazılmadan kaydedilir (otomatik bölüm)
    };
    return (
      <div class="stack sinav" data-test="sinav-coz" data-bolum={b.id} data-q={i} data-toplam={adimlar.length}>
        <ProgressHeader title={`${BOLUM_TR[b.id]} · deneme`} back="#/today" ilerleme={{ n: i, toplam: adimlar.length }} />
        <p class="small sinav-yonerge" data-test="sinav-yonerge"><span class="kicker">Kısım {x.ki + 1}/{b.kisimlar.length}</span> <Rich text={x.k.yonerge_tr} /></p>
        <MaddeView key={x.m.id} m={x.m} kisim={x.k} onDone={ileri} />
      </div>
    );
  }
  if (asama.t === "puanla") return <Puanla b={asama.b} cevap={cevap} oz={oz} setOz={setOz} onKaydet={() => void kaydet(asama.b, cevap, oz)} />;
  if (asama.t === "sonuc") {
    const { b, s } = asama;
    const sonraki = gunun.find((x) => !sonuclar.has(x.id));
    const zayif = s.puan < b.puan * (b.id === "konusma" ? deneme.gecme.konusma : deneme.gecme.toplam);
    return (
      <div class="stack" data-test="sinav-bolum-sonuc" data-bolum={b.id} data-puan={s.puan}>
        <ProgressHeader title={`${BOLUM_TR[b.id]} · deneme`} back="#/today" ilerleme={{ n: 1, toplam: 1 }} />
        <section class="card stack">
          <div class="kicker">{BOLUM_TR[b.id]} bitti</div>
          <h2>{puanTr(s.puan)}/{b.puan} puan</h2>
          <p class="small muted">Ham puan {puanTr(s.ham)}/{b.ham_puan}.</p>
          {zayif && <p data-test="bolum-zayif">Bu bölüm geçme sınırının (%{Math.round((b.id === "konusma" ? deneme.gecme.konusma : deneme.gecme.toplam) * 100)}) altında. İstediğin zaman yeniden çözebilirsin; son çözümün sayılır.</p>}
        </section>
        <ActionBar>
          {sonraki
            ? <button class="btn primary block" data-test="sonraki-bolum" onClick={() => baslat(sonraki)}>{BOLUM_TR[sonraki.id]} bölümüne geç</button>
            : <button class="btn primary block" data-test="sinav-ozet" onClick={() => { setAsama({ t: "giris" }); window.scrollTo(0, 0); }}>Sonucu gör</button>}
        </ActionBar>
      </div>
    );
  }

  // giriş ve özet
  const sonuc = denemeSonucu(deneme, new Map([...sonuclar].map(([k, x]) => [k, x.puan])));
  const sonraki = gunun.find((x) => !sonuclar.has(x.id));
  const kalan = deneme.bolumler.filter((b) => !sonuclar.has(b.id) && !gunun.includes(b));
  return (
    <div class="stack sinav" data-test="sinav-giris" data-gun={day} data-deneme={deneme.id}>
      <ProgressHeader title={baslik} back="#/today" />
      <section class="card stack">
        <div class="kicker">{deneme.seviye} deneme sınavı · {bolumlerTr(gunun.map((b) => b.id))}</div>
        <h2>{gun.title_tr}</h2>
        <p>{gun.goal_tr}</p>
        <ul class="sinav-kurallar small">
          <li>Sınav boyunca doğru cevap gösterilmez. Puanını bölümün sonunda görürsün.</li>
          {gunun.some((b) => b.id === "dinleme") && <li>Dinlemede metin yok. Kaydı yönergede yazan sayıda dinleyebilirsin.</li>}
          {gunun.some((b) => b.id === "konusma") && <li>Konuşmada hazırlık yok. Durumu okuyunca hemen konuş ya da yaz.</li>}
          {gunun.some((b) => b.id === "konusma" || b.id === "yazma") && <li>Konuşmayı ve mesajı uygulama tam puanlayamaz. Bölümün sonunda örnek cevaba ve ölçüte bakıp kendin puanlarsın.</li>}
        </ul>
      </section>
      <ol class="sinav-bolumler" data-test="sinav-bolumler">{gunun.map((b) => {
        const s = sonuclar.get(b.id);
        return (
          <li class="card row" data-test={`bolum-${b.id}`} data-bitti={s ? "1" : "0"}>
            <div class="grow"><b>{BOLUM_TR[b.id]}</b><div class="tiny muted">≈ {b.sure_dk} dk · {b.puan} puan · {bolumMaddeleri(b).length} madde</div></div>
            {s ? <><span class="chip" data-test={`bolum-puan-${b.id}`}>{puanTr(s.puan)}/{b.puan}</span>
                <button class="btn sm ghost" data-test={`yeniden-${b.id}`} onClick={() => baslat(b)} aria-label={`${BOLUM_TR[b.id]} bölümünü yeniden çöz`}>Yeniden</button></>
              : <span class="tiny muted">Sırada</span>}
          </li>
        );
      })}</ol>
      {!sonraki && <SonucKarti d={deneme} sonuc={sonuc} kalan={kalan} onYeniden={(b) => baslat(b)} />}
      <ActionBar>
        {sonraki
          ? <button class="btn primary block" data-test="bolum-basla" onClick={() => baslat(sonraki)}>{BOLUM_TR[sonraki.id]} bölümüne başla</button>
          : <a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a>}
      </ActionBar>
    </div>
  );
}

/** Deneme sonucu: bütün bölümler çözüldüyse geçti/geçmedi; değilse kalan bölümler */
function SonucKarti({ d, sonuc, kalan, onYeniden }: { d: Deneme; sonuc: ReturnType<typeof denemeSonucu>; kalan: DenemeBolum[]; onYeniden: (b: DenemeBolum) => void }) {
  if (sonuc.gecti === null) return (
    <section class="card stack" data-test="sinav-kalan">
      <h3>Bugünkü bölümler bitti</h3>
      <p>{kalan.length ? `Kalan bölümler: ${bolumlerTr(kalan.map((b) => b.id))}. Sıradaki sınav gününde açılır.` : "Denemenin kalan bölümleri sıradaki sınav gününde."} Toplam sonucu dört bölüm bitince görürsün.</p>
    </section>
  );
  const zayif = d.bolumler.filter((b) => sonuc.zayif.includes(b.id));
  return (
    <section class="card stack" data-test="deneme-sonuc" data-gecti={sonuc.gecti ? "1" : "0"} data-toplam={sonuc.toplam}>
      <div class="kicker">{d.seviye} deneme sonucu</div>
      <h2>{puanTr(sonuc.toplam)}/{sonuc.enCok} puan</h2>
      <p class="small">Konuşma: {puanTr(sonuc.konusma ?? 0)}/{sonuc.konusmaEnCok} puan.</p>
      {sonuc.gecti
        ? <p data-test="deneme-gecti">Geçme sınırına ulaştın. Yazma ve konuşmanın puanını kendin verdin; gerçek sınavda bunu bir değerlendirici verir.</p>
        : <p data-test="deneme-gecmedi">Henüz geçme sınırında değilsin. Geçmek için toplamda %{Math.round(d.gecme.toplam * 100)}, konuşmada ayrıca %{Math.round(d.gecme.konusma * 100)} gerekir.</p>}
      {zayif.length > 0 && <ul class="zayif-liste" data-test="deneme-zayif">{zayif.map((b) => (
        <li class="row"><span class="grow">{BOLUM_TR[b.id]}: {puanTr(sonuc.bolumler[b.id] ?? 0)}/{b.puan}</span>
          <button class="btn sm" data-test={`zayif-yeniden-${b.id}`} onClick={() => onYeniden(b)}>Yeniden çöz</button></li>))}</ul>}
      <details class="small"><summary>Puanlama nasıl?</summary><p><Rich text={d.puanlama_tr} /></p></details>
    </section>
  );
}

/** Öz-puanlama: mesaj (ölçüt başına) ve konuşma (madde başına 0 · yarım · tam); cevap örneklerden biriyle aynıysa tam puan önerilir */
function Puanla({ b, cevap, oz, setOz, onKaydet }: { b: DenemeBolum; cevap: Record<string, Cevap>; oz: Record<string, number>; setOz: (o: Record<string, number>) => void; onKaydet: () => void }) {
  const ozMaddeler = b.kisimlar.flatMap((k) => k.maddeler.filter((m) => !otomatik(m)).map((m) => ({ k, m })));
  // mesaj ölçütleri ayrı tutulur (madde puanı = ölçütler toplamı)
  const [olcut, setOlcut] = useState<Record<string, number>>({});
  const oneri = useMemo(() => {
    const o: Record<string, number> = {};
    for (const { m } of ozMaddeler) {
      const a = typeof cevap[m.id] === "string" ? (cevap[m.id] as string) : "";
      if (m.k !== "guided_response" && m.k !== "listen_and_respond") continue;
      if (!a) { o[m.id] = 0; continue; }
      const d: Drill = m.k === "guided_response" ? { id: m.id, k: m.k, situation_tr: m.situation_tr, prompt_de: m.prompt_de, accepted: m.accepted }
        : { id: m.id, k: m.k, audio_de: m.audio_de, speed: m.speed, situation_tr: m.situation_tr, accepted: m.accepted };
      if (drillVerdict(d, a).kind === "correct") o[m.id] = m.puan;
    }
    return o;
  }, [b.id]);
  useEffect(() => { setOz({ ...oneri, ...oz }); }, [b.id]);
  const deger = (id: string) => oz[id] ?? oneri[id];
  const eksik = ozMaddeler.filter(({ m }) => m.k === "mesaj" ? mesajOlcutleri(m).some((_, j) => olcut[`${m.id}#${j}`] === undefined) : deger(m.id) === undefined).length;
  return (
    <div class="stack sinav" data-test="sinav-puanla" data-bolum={b.id} data-eksik={eksik}>
      <ProgressHeader title={`${BOLUM_TR[b.id]} · kendin puanla`} back="#/today" />
      <p class="small">Uygulama {b.id === "konusma" ? "konuşmayı" : "mesajı"} tam puanlayamaz. Cevabını örnekle ve ölçütle karşılaştır, puanını seç. Örnek tek doğru değildir: aynı şeyi başka sözlerle söylediysen de puan alırsın.</p>
      {ozMaddeler.map(({ k, m }, j) => {
        const a = typeof cevap[m.id] === "string" ? (cevap[m.id] as string) : "";
        if (m.k === "mesaj") {
          const ol = mesajOlcutleri(m);
          return (
            <section class="card stack" data-test={`puanla-${m.id}`}>
              <div class="kicker">Mesaj</div>
              <p class="small"><Rich text={m.gorev_tr} /></p>
              <div class="small">Senin mesajın:</div>
              <div class="sinav-metin selectable" lang="de" style={{ whiteSpace: "pre-wrap" }}>{a || <span lang="tr">(boş)</span>}</div>
              <div class="small">Örnek mesaj:</div>
              <div class="sinav-metin selectable" lang="de">{adli(m.ornek_de)}</div>
              {ol.map((o, i) => (
                <div class="stack" style={{ gap: 6 }}>
                  <div class="small"><b>{o.ad} ({o.puan} puan):</b> <Rich text={o.tr} /></div>
                  <div class="seg" role="group" aria-label={`${o.ad} puanı`}>{olcutSecenekleri(o.puan).map((p) => (
                    <button aria-pressed={olcut[`${m.id}#${i}`] === p} data-test={`olcut-${i}-${p}`} onClick={() => {
                      const yeni = { ...olcut, [`${m.id}#${i}`]: p }; setOlcut(yeni);
                      setOz({ ...oz, [m.id]: ol.reduce((s, _, x) => s + (yeni[`${m.id}#${x}`] ?? 0), 0) });
                    }}>{p}</button>))}</div>
                </div>))}
            </section>
          );
        }
        const ornekler = m.k === "guided_response" || m.k === "listen_and_respond" ? m.accepted : [];
        return (
          <section class="card stack" data-test={`puanla-${m.id}`} data-oneri={oneri[m.id] ?? ""}>
            <div class="kicker">{j + 1}/{ozMaddeler.length}</div>
            {"situation_tr" in m && m.situation_tr && <p class="small"><Rich text={m.situation_tr} /></p>}
            <div class="small">Senin cevabın: {a ? <b lang="de">{a}</b> : <b>(cevap yok)</b>}{oneri[m.id] === m.puan && a && <span class="chip" data-test="ornekle-ayni">Örnekle aynı</span>}</div>
            <div class="small">Örnek cevaplar:</div>
            <ul class="small" lang="de">{ornekler.slice(0, 3).map((x) => <li>{adli(x)}</li>)}</ul>
            {"why_tr" in m && m.why_tr && <p class="small muted"><Rich text={m.why_tr} /></p>}
            {k.degerlendirme_tr.length > 0 && <details class="small"><summary>Puanlama ölçütü</summary>{k.degerlendirme_tr.map((x) => <p><Rich text={x} /></p>)}</details>}
            <div class="seg" role="group" aria-label="Puanın">{ozSecenekler(m.puan).map((p) => (
              <button aria-pressed={deger(m.id) === p} disabled={!a && p > 0} data-test={`oz-${p}`} onClick={() => setOz({ ...oz, [m.id]: p })}>{p === m.puan / 2 ? "yarım" : puanTr(p)}</button>))}</div>
          </section>
        );
      })}
      <ActionBar><button class="btn primary block" data-test="puan-kaydet" disabled={eksik > 0} onClick={onKaydet}>{eksik ? `${eksik} puan seçilmedi` : "Puanı kaydet"}</button></ActionBar>
    </div>
  );
}
