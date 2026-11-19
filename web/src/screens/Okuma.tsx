/**
 * Okuma ve yazma (#58 A8, Seans 4). Okuma: metin (kelimeye dokununca kart) → sorular. Yazma: gelen mesaj → sorular →
 * kendi mesajın → zorunlu kelime ve kalıp kontrolü (yapay zekâsız, çevrimdışı; PM-054.5) → örnek cevap → kontrol listesi.
 * Bitiş cihazda `m1:okuma:<gün>`; adım XP'si bir kez.
 */
import { useEffect, useState } from "preact/hooks";
import type { Drill, Lexeme } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadM1Gun } from "../services/content.ts";
import { adimXpVer, soruXpVer } from "../services/ilerleme.ts";
import { XP } from "../core/gun.ts";
import { personalizeDeep } from "../core/persona.ts";
import { cumleler, yazmaKontrol, type OkumaYazmaT, type YazmaSonuc } from "../core/okuma.ts";
import { getMeta, setMeta } from "../data/db.ts";
import { stopSpeaking } from "../services/speech.ts";
import { DrillView } from "../ui/drill.tsx";
import { ActionBar, FeedbackBand, ListenButton, ProgressHeader } from "../ui/kit.tsx";
import { ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { DokunMetin, KelimeSayfasi } from "../ui/kelime.tsx";
import { Rich } from "../ui/rich.tsx";

export const okumaAnahtari = (day: number) => `m1:okuma:${day}`;
type Asama = { a: "metin" } | { a: "soru"; i: number } | { a: "yaz" } | { a: "ornek" } | { a: "kontrol" } | { a: "bitti" };

export function OkumaEkrani({ day }: { day: number }) {
  const { profile } = useApp();
  const [o, setO] = useState<OkumaYazmaT | null>(null);
  const [lex, setLex] = useState<Lexeme[]>([]);
  const [once, setOnce] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [as, setAs] = useState<Asama>({ a: "metin" });
  const [dogru, setDogru] = useState(0);
  const [yazi, setYazi] = useState("");
  const [kontrol, setKontrol] = useState<YazmaSonuc | null>(null);
  useEffect(() => {
    (async () => {
      const g = personalizeDeep(await loadM1Gun(day), { name: profile.displayName, address: profile.address });
      if (!g.okuma_yazma) throw new Error("Bu günün okuma/yazma bölümü henüz hazır değil.");
      setO(g.okuma_yazma);
      setOnce(!!(await getMeta<{ bitti?: string }>(okumaAnahtari(day)))?.bitti);
      setLex((await loadLexicon()).lexemes);
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, [day]);
  if (err) return <div class="stack"><ProgressHeader title="Okuma ve yazma" back="#/today" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!o) return <Loading />;

  const yazmaVar = !!o.yazma;
  const adimlar = 1 + (o.sorular.length ? 1 : 0) + (yazmaVar ? 3 : 0);
  const sira = as.a === "metin" ? 1 : as.a === "soru" ? 2 : as.a === "yaz" ? 3 : as.a === "ornek" ? 4 : as.a === "kontrol" ? 5 : adimlar;
  const etiket: Record<Asama["a"], string> = { metin: o.tur === "yazma" ? "Mesajı oku" : "Oku", soru: "Sorular", yaz: "Yaz", ornek: "Örnek cevap", kontrol: "Kontrol listesi", bitti: "Bitti" };
  const git = (x: Asama) => { stopSpeaking(); setAs(x); window.scrollTo(0, 0); };
  const sorulardanSonra = () => (yazmaVar ? git({ a: "yaz" }) : bitir());
  const bitir = () => { git({ a: "bitti" }); void setMeta(okumaAnahtari(day), { bitti: new Date().toISOString() }).then(() => adimXpVer(`okuma:${day}`)); };

  return (
    <div class="stack" data-test="okuma" data-asama={as.a}>
      <ProgressHeader title={o.title_tr} back="#/today" right={<FocusChip />} sub={etiket[as.a]} ilerleme={{ n: Math.min(sira, adimlar) - 1, toplam: adimlar }} />
      {(as.a === "metin" || as.a === "soru") && o.metin_de && <Metin key={as.a} o={o} lex={lex} kisa={as.a === "soru"} />}
      {as.a === "metin" && <ActionBar><button class="btn primary block" data-test="next" onClick={() => (o.sorular.length ? git({ a: "soru", i: 0 }) : sorulardanSonra())}>{o.sorular.length ? "Sorulara geç" : "Devam"}</button></ActionBar>}
      {as.a === "soru" && (() => {
        const q = o.sorular[as.i]!;
        const d: Drill = "k" in q ? q : { id: q.id ?? `${o.title_tr}:${as.i}`, k: "pick", q_tr: q.q_tr, opts: q.opts, ans: q.ans };
        return <DrillView key={`s${as.i}`} d={d} sira={`${as.i + 1}/${o.sorular.length}`} onDone={(r) => {
          if (r === "correct") { setDogru(dogru + 1); void soruXpVer(`okuma:${day}:${d.id}`); }
          if (as.i + 1 < o.sorular.length) git({ a: "soru", i: as.i + 1 }); else bitirSonra();
        }} />;
      })()}
      {as.a === "yaz" && o.yazma && <Yaz o={o} yazi={yazi} setYazi={setYazi} kontrol={kontrol} setKontrol={setKontrol} onNext={() => git({ a: "ornek" })} />}
      {as.a === "ornek" && o.yazma && (
        <section class="card stack fade" data-test="okuma-ornek">
          <div class="kicker">Örnek cevap</div>
          <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}><p class="grow de" lang="de">{o.yazma.ornek_de}</p><ListenButton text={o.yazma.ornek_de} small /></div>
          <div class="kicker">Senin mesajın</div>
          <p class="de" lang="de" data-test="senin-yazin">{yazi}</p>
          <p class="small muted">Karşılaştır: aynı bilgileri verdin mi? Farklı kelimeler de doğru olabilir.</p>
          <ActionBar><button class="btn primary block" data-test="next" onClick={() => git({ a: "kontrol" })}>Kontrol listesine geç</button></ActionBar>
        </section>
      )}
      {as.a === "kontrol" && o.yazma && <Kontrol maddeler={o.yazma.kontrol_tr} onBitti={bitir} onGeri={() => git({ a: "yaz" })} />}
      {as.a === "bitti" && (
        <section class="card stack fade" data-test="okuma-bitti">
          <h2>{o.tur === "yazma" ? "Mesajın hazır" : "Okuma bitti"}</h2>
          {o.sorular.length > 0 && <p>{o.sorular.length} soruda {dogru} doğru.</p>}
          {yazmaVar && kontrol && <p class="small">{kontrol.tamam ? "Gereken kelimeleri ve kalıpları kullandın." : kontrol.eksik.length ? "Bir dahaki sefere gereken kelimelerin hepsini kullanmayı dene." : "Kelimeleri kullandın; bir dahaki sefere onları öğrendiğin kalıplarla kur."}</p>}
          <div class="row"><a class="btn primary grow" href="#/today" data-test="okuma-sonraki">Sıradaki adım</a>
            <button class="btn grow" onClick={() => { setDogru(0); setYazi(""); setKontrol(null); setOnce(true); git({ a: "metin" }); }}>Baştan</button></div>
        </section>
      )}
    </div>
  );

  function bitirSonra() { if (yazmaVar) sorulardanSonra(); else bitir(); }
}

/** Metin: cümle cümle, kelimeye dokununca kart; Türkçesi isteğe bağlı (önce Almancayı anlamaya çalış) */
function Metin({ o, lex, kisa }: { o: OkumaYazmaT; lex: Lexeme[]; kisa: boolean }) {
  const [kelime, setKelime] = useState<string | null>(null);
  const [tr, setTr] = useState(false);
  const [acik, setAcik] = useState(!kisa);
  if (!acik) return <button class="btn sm ghost" data-test="metni-ac" onClick={() => setAcik(true)}>Metni göster</button>;
  return (
    <section class="card stack fade" data-test="okuma-metin">
      <div class="row" style={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
        <div class="kicker">{o.tur === "yazma" ? "Gelen mesaj" : "Metin"} · bilmediğin kelimeye dokun</div>
        <ListenButton text={o.metin_de!} small />
      </div>
      {cumleler(o.metin_de!).map((c) => <p style={{ margin: 0 }}><DokunMetin de={c} onKelime={setKelime} /></p>)}
      {o.metin_tr && (tr ? <p class="small muted" data-test="metin-tr">{o.metin_tr}</p> : <button class="btn sm ghost" data-test="metin-tr-ac" onClick={() => setTr(true)}>Türkçesini göster</button>)}
      {kelime && <KelimeSayfasi kelime={kelime} lex={lex} onClose={() => setKelime(null)} />}
    </section>
  );
}

/** Yazma: görev → kendi mesajın → zorunlu kelime ve kalıp kontrolü (kalıba uymayan cümle yanlış değil, "kontrol edemedim") */
function Yaz({ o, yazi, setYazi, kontrol, setKontrol, onNext }: { o: OkumaYazmaT; yazi: string; setYazi: (s: string) => void; kontrol: YazmaSonuc | null; setKontrol: (k: YazmaSonuc | null) => void; onNext: () => void }) {
  const y = o.yazma!;
  return (
    <section class="card stack fade" data-test="okuma-yaz" {...(import.meta.env.MODE === "e2e" ? { "data-ornek": y.ornek_de } : {})}>
      <div class="kicker">Yaz</div>
      <p><Rich text={y.gorev_tr} /></p>
      <p class="small muted">Kullanman gereken kelimeler: {y.zorunlu.map((z, i) => <>{i > 0 && ", "}<b lang="de">{z}</b></>)}</p>
      <textarea class="input" rows={5} lang="de" autocapitalize="sentences" spellcheck={false} data-test="yazi" value={yazi}
        placeholder="Almanca mesajını yaz…" onInput={(e) => { setYazi((e.target as HTMLTextAreaElement).value); setKontrol(null); }} />
      {kontrol && (
        <div class="stack" style={{ gap: 6 }} data-test="yazi-kontrol">
          {kontrol.eksik.length > 0 && <FeedbackBand kind="bad" title="Eksik kelime">{kontrol.eksik.map((z, i) => <>{i > 0 && ", "}<b lang="de">{z}</b></>)} yok. Ekleyip tekrar kontrol et.</FeedbackBand>}
          {/* yeşil bant yalnızca "tamam"da: zorunlu kelimeler kalıba uyan cümlelerin sabit kısmında (inceleme #70 2. tur P2-A) */}
          {kontrol.tamam && <FeedbackBand kind="ok" title="Gereken kelimeler tamam.">{kontrol.toplam} cümlenin {kontrol.kalipli} tanesi öğrendiğin kalıplara uyuyor.</FeedbackBand>}
          {!kontrol.tamam && kontrol.eksik.length === 0 && <FeedbackBand kind="info" title="Kelimeler var, ama kalıba uyan cümlede değil">Gereken kelimeleri öğrendiğin bir kalıbın içinde kullan; örnek cevaba bakabilirsin.</FeedbackBand>}
          {kontrol.taninmayan.length > 0 && <FeedbackBand kind="info" title="Bunları kontrol edemedim">
            {kontrol.taninmayan.map((c) => <div lang="de">{c}</div>)}
            <div>Yanlış demek değil; örnek cevapla karşılaştır.</div></FeedbackBand>}
        </div>
      )}
      <ActionBar>
        {!kontrol || kontrol.eksik.length > 0
          ? <button class="btn primary block" data-test="yazi-kontrol-et" disabled={!yazi.trim()} onClick={() => setKontrol(yazmaKontrol(yazi, y))}>Kontrol et</button>
          : <button class="btn primary block" data-test="next" onClick={onNext}>Örnek cevabı gör</button>}
        {kontrol && kontrol.eksik.length > 0 && <button class="btn block ghost" data-test="yine-de" onClick={onNext}>Yine de örnek cevabı gör</button>}
      </ActionBar>
    </section>
  );
}

/** Kontrol listesi: öğrenci kendi mesajına bakarak işaretler (3 madde) */
function Kontrol({ maddeler, onBitti, onGeri }: { maddeler: string[]; onBitti: () => void; onGeri: () => void }) {
  const [isaret, setIsaret] = useState<Set<number>>(new Set());
  return (
    <section class="card stack fade" data-test="okuma-kontrol">
      <div class="kicker">Kontrol listesi · mesajına bak, yaptıklarını işaretle</div>
      <ul class="list">{maddeler.map((m, i) => (
        <li><label class="row" style={{ flexWrap: "nowrap", gap: 10 }}>
          <input type="checkbox" data-test="kontrol-madde" checked={isaret.has(i)} onChange={() => { const s = new Set(isaret); if (s.has(i)) s.delete(i); else s.add(i); setIsaret(s); }} />
          <span class="grow"><Rich text={m} /></span></label></li>))}</ul>
      {isaret.size < maddeler.length && <p class="small muted">İşaretleyemediğin madde varsa mesajına dönüp düzeltebilirsin.</p>}
      <ActionBar><button class="btn primary block" data-test="okuma-bitir" onClick={onBitti}>{isaret.size === maddeler.length ? "Bitir" : `Bitir (${isaret.size}/${maddeler.length})`}</button>
        {isaret.size < maddeler.length && <button class="btn block ghost" data-test="mesaja-don" onClick={onGeri}>Mesajıma dön</button>}</ActionBar>
    </section>
  );
}
