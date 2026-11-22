/**
 * Köy (Hedef 3, PM-084 md. 4; hedef design/TARGET3 "Köy"): "Canın neyi istiyorsa oraya git."
 * Köy yeni özellik getirmez: dükkânlar var olan ekranları açar. Eski "Öğren" ekranındaki her giriş burada, en çok iki
 * dokunuşta: Bahçe (tekrar, duyduğum kelime) · Sinema ve Radyo (günlerin kayıtları) · Atölye (kalıplar) ·
 * Kütüphane (sözlük, temel dersler, okuma) · Pazar meydanı (durumlar, mevsimin dersi, konuşma provası).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import { useApp } from "../state.ts";
import { db } from "../data/db.ts";
import { loadLexicon } from "../services/content.ts";
import { ilerlemeOku } from "../services/ilerleme.ts";
import { visibleScenarios } from "../core/season.ts";
import { AYRAC, ayrac } from "../core/ayrac.ts";
import { KOY_ADI, MEKAN_ADI, acikAdimlar, bekleyenKart, dukkanlar, mekanMedya, telefon, vadesiGelen, type Dukkan, type DukkanId, type MekanId } from "../core/koy.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { Icon, type IconName } from "../ui/icons.tsx";
import { plain } from "../ui/rich.tsx";
import { MevsimKarti, TekrarListesi } from "./Today.tsx";
import { usePlan } from "./Yol.tsx";

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
  const { plan } = usePlan();
  const bekleyen = useBekleyen();
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
      <div class="koy-izgara">
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
    <div class="stack" data-test={`mekan-${id}`}>
      <TopBar title={MEKAN_ADI[id]} back="#/koy" />
      {id === "bahce" ? <TekrarListesi /> : id === "kutuphane" ? <Kutuphane /> : id === "pazar" ? <Pazar /> : <MedyaListesi mekan={id} />}
    </div>
  );
}

/** Sinema (video, köy dizisi) ve Radyo (ses kayıtları): eski "İlk Hafta" listesinin kayıtları, gün gün */
function MedyaListesi({ mekan }: { mekan: "sinema" | "radyo" }) {
  const { index, indexError } = useApp();
  const [bitti, setBitti] = useState<Set<string>>(new Set());
  useEffect(() => { ilerlemeOku().then((i) => setBitti(i.medyaBitti)).catch(() => { /* işaret yok */ }); }, []);
  const gunler = useMemo(() => (index ? mekanMedya(index, mekan) : []), [index?.version, mekan]);
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index) return <Loading />;
  const tur = { video: "Video", sahne: "Köy dizisi", ses: "Dinle" } as const;
  if (!gunler.length) return <p class="small muted">{mekan === "sinema" ? "Burada henüz video yok." : "Burada henüz ses kaydı yok."}</p>;
  return (
    <>
      {gunler.map((g) => (
        <section class="card" data-test={`mekan-gun-${g.day}`}>
          <a class="kicker icerik mekan-gun" href={`#/m1/${g.day}`} data-test={`m1-gun-${g.day}`}>{g.day}. gün{AYRAC}{plain(g.title_tr)} ›</a>
          <ul class="list">{g.kayitlar.map((m) => (
            <li><a class="row" style={SATIR} href={m.href} data-test={`kayit-${m.kind}`}>
              <span class="grow"><b>{plain(m.title_tr)}</b>{mekan === "sinema" && <><br /><span class="tiny muted">{tur[m.kind]}</span></>}</span>
              {bitti.has(m.id) && <span class="tiny muted" data-test="kayit-bitti">{m.kind === "ses" ? "dinlendi" : "izlendi"}</span>}
              <span aria-hidden="true">›</span></a></li>))}</ul>
        </section>
      ))}
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
          <ul class="list">{okuma.map((a) => (
            <li><a href={a.href} class="row" style={SATIR} data-test={`okuma-${a.day}`}>
              <span class="grow"><b>{a.title_tr}</b><br /><span class="small muted">{a.day}. gün{a.bitti ? `${AYRAC}okundu` : ""}</span></span><span aria-hidden="true">›</span></a></li>))}</ul>
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
          <ul class="list">{prova.map((a) => (
            <li><a href={a.href} class="row" style={SATIR} data-test={`prova-${a.day}`}>
              <span class="grow"><b>{a.title_tr}</b><br /><span class="small muted">{a.day}. gün{a.bitti ? `${AYRAC}yapıldı` : ""}</span></span><span aria-hidden="true">›</span></a></li>))}</ul>
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
