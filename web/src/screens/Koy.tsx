/**
 * Köy (Hedef 3, PM-084 md. 4; hedef design/TARGET3 "Köy"): "Canın neyi istiyorsa oraya git."
 * Köy yeni özellik getirmez: dükkânlar var olan ekranları açar. Eski "Öğren" ekranındaki her giriş burada, en çok iki
 * dokunuşta: Bahçe (tekrar, duyduğum kelime) · Sinema ve Radyo (günlerin kayıtları) · Atölye (kalıplar) ·
 * Kütüphane (sözlük, temel dersler, okuma) · Pazar meydanı (durumlar, mevsimin dersi, konuşma provası).
 */
import type { ComponentChildren } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useApp } from "../state.ts";
import { db } from "../data/db.ts";
import { loadLexicon } from "../services/content.ts";
import { ilerlemeOku } from "../services/ilerleme.ts";
import { visibleScenarios } from "../core/season.ts";
import { AYRAC, ayrac } from "../core/ayrac.ts";
import { KOY_ADI, MEKAN_ADI, acikAdimlar, acikGunler, bekleyenKart, dukkanlar, haftaKatla, mekanMedya, telefon, vadesiGelen, type Dukkan, type DukkanId, type HaftaKat, type Katlar, type MekanId } from "../core/koy.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { Icon, type IconName } from "../ui/icons.tsx";
import { plain } from "../ui/rich.tsx";
import { MevsimKarti, TekrarListesi } from "./Today.tsx";
import { haftaRengi, usePlan } from "./Yol.tsx";

const SIMGE: Record<DukkanId, IconName> = { bahce: "filiz", sinema: "film", radyo: "radyo", atolye: "kalem", kutuphane: "kitap", pazar: "pazar", kafe: "kafe", tiyatro: "sahne", gazete: "gazete" };

/** Bahçe'de şu an vadesi gelmiş kart sayısı; vadesi gelen yoksa 2 MB'lık sözlük yüklenmez */
function useBekleyen(): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    let canli = true;
    (async () => {
      const simdi = new Date();
      const aday = (await db.items.toArray()).filter((it) => vadesiGelen(it, simdi));
      if (!aday.length) return;
      const { lexemes } = await loadLexicon();
      if (canli) setN(bekleyenKart(aday, new Map(lexemes.map((l) => [l.id, l])), simdi));
    })().catch(() => { /* sayı okunamadıysa tanım satırı kalır */ });
    return () => { canli = false; };
  }, []);
  return n;
}

export function KoyEkrani() {
  const { index, indexError, toast } = useApp();
  const { plan, err, yok } = usePlan();
  const bekleyen = useBekleyen();
  // "Telefonun" kartı planla gelir; ızgara plan hazır olana kadar  görünmez, kart sonradan eklenip
  // dükkânları aşağı itmesin: uzanan parmak yanlış yere basmasın (inceleme #200 P1-3). Plan cihazdaki gün dosyalarından
  // gelir (oturumda önbellekte); 1,5 sn'de gelmezse ızgara yine görünür (başlık baştan görünür)
  const [sabir, setSabir] = useState(false);
  useEffect(() => { const t = setTimeout(() => setSabir(true), 1500); return () => clearTimeout(t); }, []);
  const hazir = !!plan || !!err || yok || sabir;
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index) return <Loading />;
  const veri = { index, bekleyen, gunler: plan?.gunler ?? [], now: Date.now() };
  const tel = telefon(veri);
  return (
    <div class="koy" data-test="koy">
      <header class="koy-bas">
        <h1 lang="de">{KOY_ADI}</h1>
        <p>Canın neyi istiyorsa oraya git.</p>
      </header>
      <div class="koy-izgara" aria-busy={hazir ? undefined : "true"} style={hazir ? undefined : { visibility: "hidden" }} data-hazir={hazir ? "1" : undefined}>
        {tel && (
          <a class="mekan genis" href={tel.href} data-test="koy-telefon">
            <span class="mekan-ic" aria-hidden="true"><Icon name="tel" size={26} /></span>
            <span class="mekan-yazi"><b>Telefonun</b><span>{tel.alt}</span></span>
          </a>
        )}
        {dukkanlar(veri).map((d) => <DukkanKarti d={d} onKilitli={() => toast(`${d.ad}: ${d.alt}.`)} />)}
      </div>
    </div>
  );
}

function DukkanKarti({ d, onKilitli }: { d: Dukkan; onKilitli: () => void }) {
  const ic = <>
    <span class="mekan-ic" aria-hidden="true"><Icon name={SIMGE[d.id]} size={26} /></span>
    {d.nokta && <span class="mekan-nokta" data-test="mekan-nokta" aria-hidden="true" />}
    <span class="mekan-yazi"><b>{d.ad}</b><span>{d.alt}</span></span>
  </>;
  // kilitli dükkân başka ekrana gitmez: dokununca tek satır "ne zaman açılır" (düğme çalışır; aria-disabled verilmez, yoksa
  // ekran okuyucu "kullanılamıyor" der ve satır duyulmaz)
  if (d.kilitli) return <button type="button" class="mekan kilitli" data-mekan={d.id} data-kilitli="" onClick={onKilitli}>{ic}</button>;
  return <a class="mekan" href={d.href} data-mekan={d.id}>{ic}{d.nokta && <span class="sr-only">, bekleyen var</span>}</a>;
}

const SATIR = { textDecoration: "none", color: "inherit", flexWrap: "nowrap" } as const;

export function MekanEkrani({ id }: { id: MekanId }) {
  return (
    <div class="stack koy-sayfa" data-test={`mekan-${id}`}>
      <TopBar title={MEKAN_ADI[id]} back="#/koy" />
      {id === "bahce" ? <TekrarListesi /> : id === "kutuphane" ? <Kutuphane /> : id === "pazar" ? <Pazar /> : <MedyaListesi mekan={id} />}
    </div>
  );
}

const haftaAd = (h: number) => (h === 1 ? "İlk Hafta" : `${h}. hafta`);

/**
 * Haftaya göre katlanan liste (PM-122 md. 2.1; `haftaKatla`): son hafta açık, öbür haftalar tek satır (dokununca açılır, yeniden
 * dokununca kapanır), `YAKIN_HAFTA`'dan eski haftalar tek "1.–N. hafta" satırında. Tek hafta varken ekran eskisi gibidir (satır ve
 * başlık yok). `kap`: "kart" Sinema/Radyo (her hafta satırı ayrı kart, günlerin kartları altında), "liste" Kütüphane/Pazar (kartın
 * listesinde satır; `ciz` <li> döndürür).
 */
function HaftaKatlari<T extends { day: number }>({ k, kap, ozet, ciz }: { k: Katlar<T>; kap: "kart" | "liste"; ozet: (l: T[]) => string; ciz: (l: T[]) => ComponentChildren }) {
  const [acik, setAcik] = useState<Set<number>>(new Set());
  const cevir = (h: number) => setAcik((s) => { const x = new Set(s); if (x.has(h)) x.delete(h); else x.add(h); return x; });
  // 0: eski haftalar satırı
  const satir = (anahtar: number, etiket: string, alt: string, vurgu: string | undefined, test: string) => {
    const ac = acik.has(anahtar);
    const dugme = (
      <button type="button" class="row hafta-satir-btn" aria-expanded={ac} data-test={test} onClick={() => cevir(anahtar)}>
        <span class="grow"><b>{etiket}</b> <span class="small muted">· {alt}</span></span>
        <Icon name={ac ? "up" : "down"} size={18} />
      </button>
    );
    const st = vurgu ? ({ "--vurgu": vurgu } as Record<string, string>) : undefined;
    return kap === "kart"
      ? <section class={`card hafta-satir kat-satir${vurgu ? "" : " eski"}`} style={st} data-acik={ac ? "1" : "0"}>{dugme}</section>
      : <li class={`kat-satir${vurgu ? "" : " eski"}`} style={st} data-acik={ac ? "1" : "0"}>{dugme}</li>;
  };
  const hafta = (h: HaftaKat<T>) => <>{satir(h.hafta, haftaAd(h.hafta), ozet(h.ogeler), haftaRengi(h.hafta), `kat-${h.hafta}`)}{acik.has(h.hafta) && ciz(h.ogeler)}</>;
  const baska = k.eski.length + k.yakin.length > 0;
  return (
    <>
      {k.eski.length > 0 && satir(0, `${k.eski[0]!.hafta}.–${k.eski[k.eski.length - 1]!.hafta}. hafta`, ozet(k.eski.flatMap((h) => h.ogeler)), undefined, "kat-eski")}
      {acik.has(0) && k.eski.map(hafta)}
      {k.yakin.map(hafta)}
      {k.acik && baska && (kap === "kart"
        ? <h2 class="sectitle kat-baslik" data-test={`kat-acik-${k.acik.hafta}`}>{haftaAd(k.acik.hafta)}</h2>
        : <li class="kicker kat-baslik" data-test={`kat-acik-${k.acik.hafta}`}>{haftaAd(k.acik.hafta)}</li>)}
      {k.acik && ciz(k.acik.ogeler)}
    </>
  );
}

/** Sinema (video, köy dizisi) ve Radyo (ses kayıtları): yalnız açılmış günlerin kayıtları, gün gün (#200 PM finali takip a) */
function MedyaListesi({ mekan }: { mekan: "sinema" | "radyo" }) {
  const { index, indexError } = useApp();
  const { plan, err, yenile } = usePlan();
  const [bitti, setBitti] = useState<Set<string>>(new Set());
  useEffect(() => { ilerlemeOku().then((i) => setBitti(i.medyaBitti)).catch(() => { /* işaret yok */ }); }, []);
  // plan kurulamazsa (ilk gün dosyası bile yok) yalnız ilk gün listelenir; kilitli gün hiçbir durumda açılmaz
  const gunler = useMemo(() => (index ? mekanMedya(index, mekan, acikGunler(index, plan?.gunler ?? [])) : []), [index?.version, mekan, plan]);
  // kilitli günlerde de bu mekânın kaydı varsa liste neden kısa, tek satırla söylenir
  const sonra = useMemo(() => (index ? mekanMedya(index, mekan, new Set(index.m1.map((g) => g.day))).length > gunler.length : false), [index?.version, mekan, gunler]);
  const katlar = useMemo(() => haftaKatla(gunler), [gunler]);
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index || (!plan && !err && index.m1.length > 0)) return <Loading />;
  const tur = { video: "Video", sahne: "Köy dizisi", ses: "Dinle" } as const;
  if (!gunler.length) return <p class="small muted">{mekan === "sinema" ? "Burada henüz video yok." : "Burada henüz ses kaydı yok."}{sonra ? " Yeni günler açıldıkça gelir." : ""}</p>;
  const gunKarti = (g: (typeof gunler)[number]) => (
    <section class="card" data-test={`mekan-gun-${g.day}`}>
      <a class="kicker icerik mekan-gun" href={`#/m1/${g.day}`} data-test={`m1-gun-${g.day}`}>{g.day}. gün{AYRAC}{plain(g.title_tr)} ›</a>
      <ul class="list">{g.kayitlar.map((m) => (
        <li><a class="row" style={SATIR} href={m.href} data-test={`kayit-${m.kind}`}>
          <span class="grow"><b>{plain(m.title_tr)}</b>{mekan === "sinema" && <><br /><span class="tiny muted">{tur[m.kind]}</span></>}</span>
          {bitti.has(m.id) && <span class="tiny muted" data-test="kayit-bitti">{m.kind === "ses" ? "dinlendi" : "izlendi"}</span>}
          <span aria-hidden="true">›</span></a></li>))}</ul>
    </section>
  );
  return (
    <>
      <HaftaKatlari k={katlar} kap="kart" ciz={(l) => l.map(gunKarti)}
        ozet={(l) => `${l.length} gün${AYRAC}${l.reduce((n, g) => n + g.kayitlar.length, 0)} kayıt`} />
      {/* plan eksikse (bir gün dosyası gelmedi) gerekçe "kilitli" değil "yüklenemedi"dir (inceleme #224 P2-3); kilitli gün yine açılmaz */}
      {(err || plan?.eksik) ? <div class="row" data-test="mekan-eksik"><span class="grow small muted">Bazı günler yüklenemedi.</span><button type="button" class="btn sm" onClick={yenile}>Tekrar dene</button></div>
        : sonra && <p class="small muted" data-test="mekan-sonra">Sonraki günlerin kayıtları, o gün açılınca burada.</p>}
    </>
  );
}

/** Kütüphane: sözlük, temel dersler, açılmış günlerin okuma metinleri */
function Kutuphane() {
  const { index, indexError } = useApp();
  const { plan } = usePlan();
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index) return <Loading />;
  const okuma = acikAdimlar(plan?.gunler ?? [], "okuma");
  return (
    <>
      <section class="card">
        <a class="row" style={SATIR} href="#/sozluk" data-test="sozluk-ac"><span class="grow"><b>Sözlük</b><br /><span class="small muted">Kelime ara, duyduğun kelimeyi ekle.</span></span><span aria-hidden="true">›</span></a>
      </section>
      {index.temel.length > 0 && (
        <section class="card" data-test="temel-liste">
          <div class="kicker">Temel dersler</div>
          <ul class="list">{index.temel.map((t) => (
            <li><a href={`#/ders/${encodeURIComponent(t.id)}`} class="row" style={SATIR} data-test="temel-ders">
              <span class="grow"><b>{t.title_tr}</b>{AYRAC}<span class="small muted">{t.title_de}</span></span><span aria-hidden="true">›</span></a></li>))}</ul>
        </section>
      )}
      {okuma.length > 0 && (
        <section class="card" data-test="okuma-liste">
          <div class="kicker">Okuma ve yazma</div>
          <ul class="list"><HaftaKatlari k={haftaKatla(okuma)} kap="liste" ozet={(l) => `${l.length} metin`} ciz={(l) => l.map((a) => (
            <li><a href={a.href} class="row" style={SATIR} data-test={`okuma-${a.day}`}>
              <span class="grow"><b>{a.title_tr}</b><br /><span class="small muted">{a.day}. gün{a.bitti ? `${AYRAC}okundu` : ""}</span></span><span aria-hidden="true">›</span></a></li>))} /></ul>
        </section>
      )}
    </>
  );
}

/** Pazar meydanı: mevsimin dersi, açılmış günlerin konuşma provaları, gerçek hayat durumları (eski "Öğren" listesi) */
function Pazar() {
  const { index, indexError, profile } = useApp();
  const { plan } = usePlan();
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index) return <Loading />;
  const order = profile.domains.priority;
  const domains = index.domains.slice().sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  const gorunen = visibleScenarios(index.scenarios, Date.now());
  const prova = acikAdimlar(plan?.gunler ?? [], "prova");
  return (
    <>
      <MevsimKarti />
      {prova.length > 0 && (
        <section class="card" data-test="prova-liste">
          <div class="kicker">Konuşma provası</div>
          <ul class="list"><HaftaKatlari k={haftaKatla(prova)} kap="liste" ozet={(l) => `${l.length} prova`} ciz={(l) => l.map((a) => (
            <li><a href={a.href} class="row" style={SATIR} data-test={`prova-${a.day}`}>
              <span class="grow"><b>{a.title_tr}</b><br /><span class="small muted">{a.day}. gün{a.bitti ? `${AYRAC}yapıldı` : ""}</span></span><span aria-hidden="true">›</span></a></li>))} /></ul>
        </section>
      )}
      <p class="small muted">Gerçek hayattan {domains.length} durum, senin öncelik sıranla. Önce kelime, sonra cümle, en son konuşma.</p>
      <section class="card" data-test="durum-liste"><ul class="list">
        {domains.map((d) => {
          const n = gorunen.filter((s) => s.domain === d.id).length;
          const paused = profile.domains.paused.includes(d.id);
          return (
            <li>
              <a href={`#/learn/${d.id}`} class="row" style={SATIR} data-domain={d.id}>
                <span class="grow"><b>{d.title_tr}</b>{AYRAC}<span class="muted small">{d.title_de}</span><br /><span class="small muted">{ayrac(n ? `${n} ders` : "Dersler yakında", paused && "duraklatıldı")}</span></span>
                <span aria-hidden="true">›</span>
              </a>
            </li>
          );
        })}
      </ul></section>
      <p class="tiny muted">İçerik: {ayrac(`${index.counts.lexemes} kelime`, `${index.counts.grammar} dilbilgisi notu`, `${gorunen.length} ders`, `sürüm ${index.version}`)}</p>
    </>
  );
}
