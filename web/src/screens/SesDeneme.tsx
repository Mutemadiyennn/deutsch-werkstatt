/**
 * Profil → "Ses ve mikrofon denemesi" (PM-064 1. adım + PM 7016783246-2, 7017526063; #58 B15).
 * Sesler: cihazdaki Almanca sesler kadın/erkek ve kaliteye göre; her biri için "Dinle" ve "Yavaş dinle" (yalnızca hız
 * düşer). Karakterler: her kalıcı karaktere düşen ses. Mikrofon: izin durumu ve tek dokunuşla izin, kullanılan tanıma
 * yolu, canlı ses seviyesi, "Şunu söyle: Guten Morgen" → tanınan metin; hata türleri ayrı ve Türkçe.
 * Hız ölçümü (PM 7042161522-1): "Dinle"/"Yavaş" süresi onstart→onend ölçülür; oran < 1,25 ise "Bu ses yavaşlamıyor".
 * Yavaş hızı 0,6 / 0,5 / 0,4 kulakla seçilir, profilde saklanır.
 */
import { useEffect, useRef, useState } from "preact/hooks";
import { TopBar } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { havuzlar, KALITE_TR, sesKalitesi, type Ses } from "../core/sesSec.ts";
import { cihazSesleri, onSesler, sesAnahtar, sesBul, sesYolu, hizKaydet, hizKaydi, hizOrani, karakterSesi, listenOnce, olcCal, ORAN_ESIK, RATE, speak, STT_HATA_TR, sttHataTuru, sttYolu, ttsAvailable, YAVAS_SECENEK, type HizOlcum, type YavasOran } from "../services/speech.ts";
import { useApp } from "../state.ts";
import { loadWorld } from "../services/content.ts";
import { kabukBilgisi, kabukSatiri, type KabukBilgisi } from "../services/kabuk.ts";

const ORNEK = "Guten Morgen! Ich hätte gern einen Termin am Montag.";

const sn = (ms: number) => `${(ms / 1000).toFixed(1).replace(".", ",")} sn`;
const kat = (x: number) => `×${x.toFixed(2).replace(".", ",")}`;
const kisaAd = (n: string) => n.replace(/\s*\(.*\)$/, "");
const sesNesnesi = (s: Ses) => sesBul(s);
type Kayit = Record<string, HizOlcum>;

/** Bir ses: "Dinle" normal, "Yavaş" seçili yavaş hızla, ikisi de ölçülerek (ses olduğu gibi; yedek ses ya da gruplama yok) */
function SesSatiri({ s, kayit, kaydet }: { s: Ses; kayit: Kayit; kaydet: (ad: string, o: HizOlcum) => void }) {
  const [yarim, setYarim] = useState<{ normalMs?: number; yavasMs?: number }>({});
  const o = kayit[sesAnahtar(s)];
  const dinle = async (yavas: boolean) => {
    const ms = await olcCal(ORNEK, sesNesnesi(s), yavas ? RATE.slow : RATE.normal);
    if (ms === null) return;
    const y = { ...yarim, ...(o ? { normalMs: o.normalMs, yavasMs: o.yavasMs } : {}), [yavas ? "yavasMs" : "normalMs"]: ms };
    setYarim(y);
    if (y.normalMs && y.yavasMs) kaydet(sesAnahtar(s), { normalMs: y.normalMs, yavasMs: y.yavasMs, rate: RATE.slow });
  };
  return (
    <li class="row ses-satir" style={{ flexWrap: "nowrap" }} data-test="ses" data-ad={s.name} data-oran={o ? hizOrani(o).toFixed(2) : ""}>
      <span class="grow" style={{ minWidth: 0 }}><b>{kisaAd(s.name)}</b><span class="chip" style={{ marginLeft: 6 }} data-test="ses-kalite">{KALITE_TR(s)}</span>
        {o && <><br /><span class={`tiny ${hizOrani(o) < ORAN_ESIK ? "fb-uyari" : "muted"}`} data-test="ses-hiz">{sn(o.normalMs)} · {sn(o.yavasMs)}{hizOrani(o) < ORAN_ESIK ? " · yavaşlamıyor" : ""}</span></>}</span>
      <button class="btn sm" onClick={() => void dinle(false)} data-test="ses-dinle">Dinle</button>
      <button class="btn sm ghost" onClick={() => void dinle(true)} data-test="ses-yavas">Yavaş</button>
    </li>
  );
}

/** Hız ölçümü: kadın ve erkek havuzunun ilk sesi (karakterlerin çoğu bunlarla konuşur) normal ve yavaş çalınır */
function HizOlcumu({ hedef, kayit, kaydet }: { hedef: Ses[]; kayit: Kayit; kaydet: (ad: string, o: HizOlcum) => void }) {
  const { profile, setProfile, toast } = useApp();
  const [olcuyor, setOlcuyor] = useState(false);
  const secili = profile.listening.slowRate;
  const sec = (r: YavasOran) => { const n = structuredClone(profile); n.listening.slowRate = r; RATE.slow = r; void setProfile(n).then(() => toast("Kaydedildi"), () => toast("Kaydedilmedi")); };
  const olc = async () => {
    setOlcuyor(true);
    for (const s of hedef) {
      const v = sesNesnesi(s);
      const normalMs = await olcCal(ORNEK, v, RATE.normal);
      const yavasMs = normalMs === null ? null : await olcCal(ORNEK, v, RATE.slow);
      if (normalMs !== null && yavasMs !== null) kaydet(sesAnahtar(s), { normalMs, yavasMs, rate: RATE.slow });
    }
    setOlcuyor(false);
  };
  const olculen = hedef.filter((s) => kayit[sesAnahtar(s)]);
  const yavaslamayan = olculen.filter((s) => hizOrani(kayit[sesAnahtar(s)]!) < ORAN_ESIK);
  return (
    <div class="stack" data-test="hiz-olcum">
      <div class="kicker">Yavaş hızı</div>
      <div class="seg" role="group" aria-label="Yavaş hızı" data-test="yavas-oran">
        {YAVAS_SECENEK.map((r) => <button aria-pressed={secili === r} onClick={() => sec(r)} data-oran={r}>{r === 0.6 ? "Biraz yavaş" : r === 0.5 ? "Yavaş" : "Çok yavaş"}</button>)}
      </div>
      <button class="btn block" disabled={olcuyor || !hedef.length} onClick={() => void olc()} data-test="hiz-olc">{olcuyor ? "Ölçülüyor…" : "Hızı ölç"}</button>
      {olculen.map((s) => { const o = kayit[sesAnahtar(s)]!; return <p class="small" style={{ margin: 0 }} data-test="hiz-sonuc" data-ad={s.name}><b>{kisaAd(s.name)}</b>: Normal {sn(o.normalMs)} · Yavaş {sn(o.yavasMs)} ({kat(hizOrani(o))})</p>; })}
      {yavaslamayan.length > 0 && <p class="small fb-uyari" role="alert" data-test="hiz-uyari">Bu ses yavaşlamıyor: {yavaslamayan.map((s) => kisaAd(s.name)).join(", ")}. Yavaş istenince yavaşlayan başka bir ses, o da yoksa kelime kelime okuma kullanılır.</p>}
    </div>
  );
}

export function SesDeneme() {
  const [sesler, setSesler] = useState<Ses[]>(() => cihazSesleri());
  const [karakter, setKarakter] = useState<{ id: string; name: string; cinsiyet?: string }[]>([]);
  useEffect(() => {
    // iOS/Chrome ses listesini geç doldurur
    const yenile = () => setSesler(cihazSesleri());
    const birak = onSesler(yenile);
    if (ttsAvailable() && "speechSynthesis" in window) { speechSynthesis.addEventListener?.("voiceschanged", yenile); setTimeout(yenile, 400); }
    void loadWorld().then((w) => w && setKarakter(w.characters.map((c) => ({ id: c.id, name: c.name, cinsiyet: c.ses?.cinsiyet }))));
    return () => { birak(); if ("speechSynthesis" in window) speechSynthesis.removeEventListener?.("voiceschanged", yenile); };
  }, []);
  const h = havuzlar(sesler);
  const kaliteYok = ![...h.kadin, ...h.erkek].some((s) => sesKalitesi(s) >= 2);
  const yol = sesYolu();
  const kabukta = !!(globalThis as any).Capacitor?.isNativePlatform?.();
  const [kayit, setKayit] = useState<Kayit>(() => hizKaydi());
  const kaydet = (ad: string, o: HizOlcum) => { hizKaydet(ad, o); setKayit((k) => ({ ...k, [ad]: o })); };
  const hedef = [h.kadin[0], h.erkek[0]].filter((x): x is Ses => !!x);
  const yavasNot = hedef.filter((s) => kayit[sesAnahtar(s)]).map((s) => { const o = kayit[sesAnahtar(s)]!; return `${kisaAd(s.name)} ${kat(hizOrani(o))}${hizOrani(o) < ORAN_ESIK ? " yavaşlamıyor" : ""}`; }).join(", ");
  return (
    <div class="stack ses-deneme" data-test="ses-deneme">
      <TopBar title="Ses ve mikrofon" back="#/profile" />
      <section class="card stack">
        <h2>Sesler</h2>
        <p class="small" style={{ margin: 0 }} data-test="ses-yol">{yol === "yerel" ? "Ses: iPhone'un kendi sesleri" : yol === "web" ? (kabukta ? "Ses: görünümün sesleri (yedek yol)" : "Ses: tarayıcının sesleri") : "Bu cihazda seslendirme yok."}</p>
        <p class="small muted">Bu cihazdaki Almanca sesler. Erkek karakter erkek, kadın karakter kadın sesiyle konuşur; her karakter hep aynı sesle. Yavaş: aynı ses, daha ağır.</p>
        <HizOlcumu hedef={hedef} kayit={kayit} kaydet={kaydet} />
        {(["kadin", "erkek"] as const).map((c) => (
          <div data-test={`havuz-${c}`}>
            <div class="kicker">{c === "kadin" ? "Kadın sesleri" : "Erkek sesleri"} · {h[c].length}</div>
            {h[c].length ? <ul class="list">{h[c].map((s) => <SesSatiri s={s} kayit={kayit} kaydet={kaydet} />)}</ul> : <p class="small" data-test={`havuz-bos-${c}`}>Bu cihazda {c === "kadin" ? "kadın" : "erkek"} Almanca ses yok.</p>}
          </div>
        ))}
        {h.diger.length > 0 && <details><summary class="small">Öteki Almanca sesler · {h.diger.length}</summary><ul class="list">{h.diger.map((s) => <SesSatiri s={s} kayit={kayit} kaydet={kaydet} />)}</ul></details>}
        {/* PM 7042302480: menü adı uydurulmaz; web yolunda sorun görünümün kendisi, yerel yolda yönerge yalnız gerçekten ses yoksa */}
        {yol === "web" && kabukta && <p class="small bilgi" data-test="ses-indir">Bu görünüm telefondaki sesleri göremiyor; güncel kabukla düzelir.</p>}
        {(yol === "yerel" || !kabukta) && (!h.erkek.length || !h.kadin.length || kaliteYok) && <p class="small bilgi" data-test="ses-indir">Daha doğal ses için telefonun Ayarlar'ında "Stimmen" ya da "Sesler" diye arat ve Almanca bir kadın ve bir erkek sesinin gelişmiş ya da premium sürümünü indir.</p>}
      </section>
      <MikrofonDeneme yavasNot={yavasNot} />
      {karakter.length > 0 && <details class="card stack" data-test="karakter-sesleri">
        <summary class="ac-baslik" data-test="karakter-ac"><h2>Karakterlerin sesi · {karakter.length}</h2></summary>
        <ul class="list">{karakter.map((c) => { const a = karakterSesi(c.id); return (
          <li class="row" style={{ flexWrap: "nowrap" }} data-test="karakter-ses" data-id={c.id} data-ses={a?.ses?.name ?? ""} data-pitch={a?.pitch ?? 1}>
            <span class="grow" style={{ minWidth: 0 }}><b>{c.name}</b><br /><span class="tiny muted" data-test="karakter-ses-ad">{!a?.ses || a.cinsiyetYok ? "Bu cihazda uygun ses yok" : `${c.cinsiyet === "erkek" ? "Erkek" : c.cinsiyet === "kadin" ? "Kadın" : "Karakter"} sesi: ${a.ses.name.replace(/\s*\(.*\)$/, "")}`}</span></span>
            <button class="btn sm" aria-label={`${c.name}: dinle`} onClick={() => void speak(ORNEK, "de", "normal", true, a)}>Dinle</button>
          </li>); })}</ul>
      </details>}
    </div>
  );
}

type Izin = "verildi" | "reddedildi" | "sorulacak" | "bilinmiyor";
function MikrofonDeneme({ yavasNot }: { yavasNot: string }) {
  const [izin, setIzin] = useState<Izin>("bilinmiyor");
  const [seviye, setSeviye] = useState(0);
  const [durum, setDurum] = useState<"bos" | "dinliyor" | "sonuc">("bos");
  const [metin, setMetin] = useState<string | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const akis = useRef<{ stop: () => void } | null>(null);
  const yol = sttYolu();
  const [kabuk, setKabuk] = useState<KabukBilgisi | null>(null);
  useEffect(() => { void kabukBilgisi().then(setKabuk, () => setKabuk(null)); }, []);
  useEffect(() => {
    const p = (navigator as any).permissions?.query?.({ name: "microphone" });
    p?.then((r: any) => { const f = () => setIzin(r.state === "granted" ? "verildi" : r.state === "denied" ? "reddedildi" : "sorulacak"); f(); r.onchange = f; }).catch(() => {});
    return () => akis.current?.stop();
  }, []);
  /** canlı ses seviyesi: getUserMedia + AnalyserNode (kayıt yok, yalnızca seviye) */
  const seviyeAc = async () => {
    try {
      const st = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      setIzin("verildi");
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext; const ac = new AC();
      const an = ac.createAnalyser(); an.fftSize = 512; ac.createMediaStreamSource(st).connect(an);
      const buf = new Uint8Array(an.fftSize); let raf = 0;
      const ol = () => { an.getByteTimeDomainData(buf); let m = 0; for (const b of buf) m = Math.max(m, Math.abs(b - 128)); setSeviye(Math.min(1, m / 64)); raf = requestAnimationFrame(ol); };
      ol();
      akis.current = { stop: () => { cancelAnimationFrame(raf); st.getTracks().forEach((t) => t.stop()); void ac.close(); setSeviye(0); } };
    } catch (e) { const t = sttHataTuru(e); if (t === "izin") setIzin("reddedildi"); setHata(STT_HATA_TR[t]); }
  };
  const dene = async () => {
    setHata(null); setMetin(null); setDurum("dinliyor");
    if (!akis.current && yol !== "yerel") await seviyeAc();
    const l = listenOnce("de-DE", 8000);
    try { const r = await l.result; if (r[0]) { setMetin(r[0]); setIzin("verildi"); } else setHata(STT_HATA_TR.sessiz); }
    catch (e) { const t = sttHataTuru(e); if (t === "izin") setIzin("reddedildi"); setHata(STT_HATA_TR[t]); }
    akis.current?.stop(); akis.current = null; setDurum("sonuc");
  };
  return (
    <section class="card stack" data-test="mikrofon-deneme">
      <h2>Mikrofon</h2>
      <p class="small" data-test="stt-yol">{yol === "yerel" ? "Bu cihazda: iPhone'un kendi tanıması" : yol === "tarayici" ? "Bu cihazda: tarayıcı tanıması" : "Bu cihazda konuşma tanıma yok; yazarak cevaplayabilirsin."}</p>
      <p class="small" data-test="mic-izin">Mikrofon izni: <b>{izin === "verildi" ? "verildi" : izin === "reddedildi" ? "verilmedi" : izin === "sorulacak" ? "henüz sorulmadı" : "bilinmiyor"}</b>
        {izin !== "verildi" && <button class="btn sm" style={{ marginLeft: 8 }} data-test="mic-izin-iste" onClick={() => void seviyeAc().then(() => { akis.current?.stop(); akis.current = null; })}>İzin iste</button>}</p>
      <div class="ses-seviye" role="meter" aria-label="Ses seviyesi" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(seviye * 100)} data-test="mic-seviye"><i style={{ width: `${Math.round(seviye * 100)}%` }} /></div>
      <p>Şunu söyle: <b lang="de">„Guten Morgen“</b></p>
      <button class="btn primary block" disabled={durum === "dinliyor" || yol === "yok"} onClick={() => void dene()} data-test="mic-dene"><Icon name="mic" /> {durum === "dinliyor" ? "Dinliyorum…" : durum === "sonuc" ? "Tekrar dene" : "Söyle"}</button>
      {metin !== null && <p data-test="mic-sonuc">Duyduğum: <b lang="de">{metin}</b>{/guten\s*morgen/i.test(metin) ? " · doğru" : ""}</p>}
      {hata && <p class="small fb-uyari" role="alert" data-test="mic-hata">{hata}</p>}
      {/* kabukta izin yoksa tek dokunuşla iPhone Ayarları (PM 7017526063); cihazda doğrulanacak */}
      {hata && yol === "yerel" && izin === "reddedildi" && <button class="btn" data-test="ayarlari-ac" onClick={() => { location.href = "app-settings:"; }}>Ayarları aç</button>}
      {/* PM-071 1. adım: telefondaki kabuğun sürümü ve içinde gerçekten bulunan eklentiler (sayfa 3 blokta kalsın diye mikrofon kartında) */}
      {kabuk && <p class="tiny muted" data-test="kabuk-satir" style={{ margin: 0 }}>{kabukSatiri(kabuk)}{yavasNot ? ` · yavaş: ${yavasNot}` : ""}</p>}
    </section>
  );
}
