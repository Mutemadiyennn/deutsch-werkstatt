/**
 * Profil → "Ses ve mikrofon denemesi" (PM-064 1. adım + PM 7016783246-2, 7017526063; #58 B15).
 * Sesler: cihazdaki Almanca sesler kadın/erkek ve kaliteye göre; her biri için "Dinle" ve "Yavaş dinle" (yalnızca hız
 * düşer). Karakterler: her kalıcı karaktere düşen ses. Mikrofon: izin durumu ve tek dokunuşla izin, kullanılan tanıma
 * yolu, canlı ses seviyesi, "Şunu söyle: Guten Morgen" → tanınan metin; hata türleri ayrı ve Türkçe.
 */
import { useEffect, useRef, useState } from "preact/hooks";
import { TopBar } from "../ui/components.tsx";
import { Icon } from "../ui/icons.tsx";
import { havuzlar, sesKalitesi, type Ses } from "../core/sesSec.ts";
import { cihazSesleri, karakterSesi, listenOnce, speak, STT_HATA_TR, sttHataTuru, sttYolu, ttsAvailable } from "../services/speech.ts";
import { loadWorld } from "../services/content.ts";
import { kabukBilgisi, kabukSatiri, type KabukBilgisi } from "../services/kabuk.ts";

const ORNEK = "Guten Morgen! Ich hätte gern einen Termin am Montag.";

function SesSatiri({ s }: { s: Ses }) {
  const dinle = (yavas: boolean) => void speak(ORNEK, "de", yavas ? "slow" : "normal", true, { ses: s, pitch: 1 });
  return (
    <li class="row ses-satir" style={{ flexWrap: "nowrap" }} data-test="ses" data-ad={s.name}>
      <span class="grow" style={{ minWidth: 0 }}><b>{s.name.replace(/\s*\(.*\)$/, "")}</b>{sesKalitesi(s) >= 2 && <span class="chip" style={{ marginLeft: 6 }}>gelişmiş</span>}</span>
      <button class="btn sm" onClick={() => dinle(false)} data-test="ses-dinle">Dinle</button>
      <button class="btn sm ghost" onClick={() => dinle(true)} data-test="ses-yavas">Yavaş</button>
    </li>
  );
}

export function SesDeneme() {
  const [sesler, setSesler] = useState<Ses[]>(() => cihazSesleri());
  const [karakter, setKarakter] = useState<{ id: string; name: string; cinsiyet?: string }[]>([]);
  useEffect(() => {
    // iOS/Chrome ses listesini geç doldurur
    const yenile = () => setSesler(cihazSesleri());
    if (ttsAvailable()) { speechSynthesis.addEventListener?.("voiceschanged", yenile); setTimeout(yenile, 400); }
    void loadWorld().then((w) => w && setKarakter(w.characters.map((c) => ({ id: c.id, name: c.name, cinsiyet: c.ses?.cinsiyet }))));
    return () => { if (ttsAvailable()) speechSynthesis.removeEventListener?.("voiceschanged", yenile); };
  }, []);
  const h = havuzlar(sesler);
  const kaliteYok = ![...h.kadin, ...h.erkek].some((s) => sesKalitesi(s) >= 2);
  return (
    <div class="stack ses-deneme" data-test="ses-deneme">
      <TopBar title="Ses ve mikrofon" back="#/profile" />
      <section class="card stack">
        <h2>Sesler</h2>
        <p class="small muted">Bu cihazdaki Almanca sesler. Erkek karakter erkek, kadın karakter kadın sesiyle konuşur; her karakter hep aynı sesle. Yavaş: aynı ses, daha ağır.</p>
        {(["kadin", "erkek"] as const).map((c) => (
          <div data-test={`havuz-${c}`}>
            <div class="kicker">{c === "kadin" ? "Kadın sesleri" : "Erkek sesleri"} · {h[c].length}</div>
            {h[c].length ? <ul class="list">{h[c].map((s) => <SesSatiri s={s} />)}</ul> : <p class="small" data-test={`havuz-bos-${c}`}>Bu cihazda {c === "kadin" ? "kadın" : "erkek"} Almanca ses yok.</p>}
          </div>
        ))}
        {h.diger.length > 0 && <details><summary class="small">Öteki Almanca sesler · {h.diger.length}</summary><ul class="list">{h.diger.map((s) => <SesSatiri s={s} />)}</ul></details>}
        {(!h.erkek.length || kaliteYok) && <p class="small bilgi" data-test="ses-indir">Daha doğal ses için iPhone'da: Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → Almanca. "Anna", "Helena" (kadın) ve "Markus", "Viktor" (erkek) seslerinin "Gelişmiş" sürümünü indir; sonra bu sayfayı yeniden aç.</p>}
      </section>
      <MikrofonDeneme />
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
function MikrofonDeneme() {
  const [izin, setIzin] = useState<Izin>("bilinmiyor");
  const [seviye, setSeviye] = useState(0);
  const [durum, setDurum] = useState<"bos" | "dinliyor" | "sonuc">("bos");
  const [metin, setMetin] = useState<string | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const akis = useRef<{ stop: () => void } | null>(null);
  const yol = sttYolu();
  const [kabuk, setKabuk] = useState<KabukBilgisi | null>(null);
  useEffect(() => { void kabukBilgisi().then(setKabuk); }, []);
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
      {kabuk && <p class="tiny muted" data-test="kabuk-satir" style={{ margin: 0 }}>{kabukSatiri(kabuk)}</p>}
    </section>
  );
}
