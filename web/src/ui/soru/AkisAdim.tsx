/**
 * AKIS AK-10 4a: halka cümlesiyle çalışan adım gövdeleri (hedef TARGET3c 1–3). Cümle, Türkçesi ve kabul listesi planın `cumle`sinden
 * ekranda çözülür (`CumleBilgi`: halka görev cümleleri → kart örnekleri). Bahçe'nin soru bileşeni kartın kendi örneğini sorar;
 * bunlar ise planlayıcının kapıdan geçirdiği cümleyi sorar (bilinmeyen 0, AK-3).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Speed } from "@dw/shared";
import { ruleVerdict, type Verdict } from "../../core/answer.ts";
import { tohumluRng } from "../../core/halkaTur.ts";
import { speak, speakDizi } from "../../services/speech.ts";
import { haptic } from "../../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, MicButton } from "../kit.tsx";

export interface CumleBilgi { de: string; tr: string; accepted: string[]; /** kalıp örneğinde yuvaya giren sözcükler (vurgulu) */ vurgu?: string[] }

const sozcukler = (de: string) => de.replace(/[.,!?;:„“"»«]/g, " ").split(/\s+/).filter(Boolean);

/** Sonuç bandı + Devam: cevap doğruysa yeşil, değilse doğrusu yan yana */
function Sonuc({ v, cevap, bilgi, onDevam }: { v: Verdict | "bilmiyorum"; cevap: string; bilgi: CumleBilgi; onDevam: () => void }) {
  const ok = v !== "bilmiyorum" && v.kind === "correct";
  return (
    <div class="stack" style={{ gap: 8 }} data-test="akis-sonuc" data-dogru={ok ? "1" : "0"}>
      <FeedbackBand kind={ok ? "ok" : "bad"} title={ok ? "Doğru" : v === "bilmiyorum" ? "Şöyle denir" : "Doğrusu"}>
        <div class="row" style={{ flexWrap: "nowrap", gap: 10, alignItems: "center" }}>
          <span class="grow"><b lang="de">{bilgi.de}</b>{!ok && cevap && <><br /><span class="small">Senin cevabın: <span lang="de">{cevap}</span></span></>}</span>
          <ListenButton text={bilgi.de} small slowToggle={false} />
        </div>
      </FeedbackBand>
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={onDevam}>Devam et</button></ActionBar>
    </div>
  );
}

/** TR→DE yaz ya da sesli söyle (`soyle`; TARGET3c 3: büyük mikrofon, "Yazarak cevapla") */
export function UretAdimi({ bilgi, kip, onBitti }: { bilgi: CumleBilgi; /** yaz: TR→DE · soyle: TR→DE sesli · duy: dikte (önce duy, sonra yaz; Türkçesi yoksa da) */ kip: "yaz" | "soyle" | "duy"; onBitti: (dogru: boolean) => void }) {
  const sesli = kip === "soyle";
  const [v, setV] = useState<Verdict | "bilmiyorum" | null>(null);
  const [cevap, setCevap] = useState("");
  const [yazarak, setYazarak] = useState(!sesli);
  useEffect(() => { if (kip === "duy") void speak(bilgi.de, "de", "normal"); }, [bilgi.de]);
  const kontrol = (s: string) => { const r = ruleVerdict(bilgi.accepted, s); setCevap(s); setV(r); haptic(r.kind === "correct" ? "success" : "error"); };
  return (
    <section class="stack fade" data-test={kip === "duy" ? "akis-dikte" : sesli ? "akis-soyle" : "akis-tr-de"}>
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>{kip === "duy" ? "Duyduğunu yaz" : sesli ? "Sen söyle" : "Almancasını yaz"}</div>
        {kip === "duy"
          ? <div class="row" style={{ justifyContent: "center", marginTop: 8 }}><ListenButton text={bilgi.de} label="Cümleyi dinle" metinGizli={v === null} /></div>
          : <h2 style={{ margin: 0 }}>{bilgi.tr}</h2>}
      </div>
      {v === null && !yazarak && (
        <div class="stack" style={{ alignItems: "center", gap: 8 }}>
          <MicButton wide onText={kontrol} label="Dokun ve konuş" />
          <button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="akis-yazarak" onClick={() => setYazarak(true)}>Yazarak cevapla</button>
        </div>
      )}
      {v === null && yazarak && <AnswerField onSubmit={(s) => kontrol(s)} voice={false} />}
      {v === null && <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="akis-bilmiyorum" onClick={() => setV("bilmiyorum")}>Bilmiyorum</button></div>}
      {v !== null && <Sonuc v={v} cevap={cevap} bilgi={bilgi} onDevam={() => onBitti(v !== "bilmiyorum" && v.kind === "correct")} />}
    </section>
  );
}

/** Boşluk: kartın sözcüğü (planlayıcının `haric` sözcükleri yerine kartın yüzeyi) cümlede boş bırakılır, öğrenci yazar */
export function BoslukAdimi({ bilgi, bosluk, onBitti }: { bilgi: CumleBilgi; bosluk: string[]; onBitti: (dogru: boolean) => void }) {
  const [v, setV] = useState<Verdict | "bilmiyorum" | null>(null);
  const [cevap, setCevap] = useState("");
  const parca = useMemo(() => {
    const k = new Set(bosluk.map((x) => x.toLowerCase()));
    const t = bilgi.de.split(/(\s+)/);
    const i = t.findIndex((x) => k.has(x.replace(/[.,!?;:]/g, "").toLowerCase()));
    return i < 0 ? null : { once: t.slice(0, i).join(""), dogru: t[i]!.replace(/[.,!?;:]/g, ""), sonra: t[i]!.replace(/^[^.,!?;:]*/, "") + t.slice(i + 1).join("") };
  }, [bilgi.de]);
  if (!parca) return <UretAdimi bilgi={bilgi} kip={bilgi.tr ? "yaz" : "duy"} onBitti={onBitti} />;
  const kontrol = (s: string) => { const r = ruleVerdict([parca.dogru], s.trim()); setCevap(s); setV(r); haptic(r.kind === "correct" ? "success" : "error"); };
  return (
    <section class="stack fade" data-test="akis-bosluk">
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Boşluğu doldur</div>
        <div class="de-lg" lang="de">{parca.once}<span class="bosluk" aria-label="boşluk">____</span>{parca.sonra}</div>
        {bilgi.tr && <p class="small muted" style={{ margin: 0 }}>{bilgi.tr}</p>}
      </div>
      {v === null && <AnswerField onSubmit={(s) => kontrol(s)} voice={false} placeholder="Eksik kelime…" />}
      {v === null && <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="akis-bilmiyorum" onClick={() => setV("bilmiyorum")}>Bilmiyorum</button></div>}
      {v !== null && <Sonuc v={v} cevap={cevap} bilgi={bilgi} onDevam={() => onBitti(v !== "bilmiyorum" && v.kind === "correct")} />}
    </section>
  );
}

/** Yapboz (TARGET3c 2): sözcük taşları karışık; dokununca cümleye. Küçük sözcüğün altında Türkçesi (K10: ilk iki görüş, çağıran verir) */
export function YapbozAdimi({ bilgi, tohum, ipucu, onBitti }: { bilgi: CumleBilgi; tohum: string; ipucu: (sozcuk: string) => string | undefined; onBitti: (dogru: boolean) => void }) {
  const taslar = useMemo(() => {
    const s = sozcukler(bilgi.de); const r = tohumluRng(tohum);
    const x = s.map((t, i) => ({ t, i }));
    for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)) % (i + 1); [x[i], x[j]] = [x[j]!, x[i]!]; }
    if (x.every((y, i) => y.i === i) && x.length > 1) x.push(x.shift()!);
    return x;
  }, [bilgi.de]);
  const [secilen, setSecilen] = useState<number[]>([]);
  const [v, setV] = useState<Verdict | "bilmiyorum" | null>(null);
  const cumle = secilen.map((k) => taslar[k]!.t).join(" ");
  const kontrol = () => { const ok = bilgi.accepted.some((a) => sozcukler(a).join(" ").toLowerCase() === cumle.toLowerCase()); const r: Verdict = ok ? ruleVerdict([cumle], cumle) : ruleVerdict([bilgi.de], cumle); setV(r); haptic(ok ? "success" : "error"); };
  return (
    <section class="stack fade" data-test="akis-yapboz">
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>{bilgi.tr ? "Cümleyi kur" : "Dinle, sonra kur"}</div>
        {bilgi.tr ? <h2 style={{ margin: 0 }}>{bilgi.tr}</h2> : <div class="row" style={{ justifyContent: "center", marginTop: 8 }}><ListenButton text={bilgi.de} label="Cümleyi dinle" metinGizli={v === null} /></div>}
      </div>
      <div class="slot" data-test="yapboz-cumle" aria-label="Kurduğun cümle">
        {secilen.map((k, n) => <button type="button" class="wchip" lang="de" disabled={v !== null} onClick={() => setSecilen(secilen.filter((_, m) => m !== n))}>{taslar[k]!.t}</button>)}
      </div>
      <div class="row" style={{ gap: 8, flexWrap: "wrap", justifyContent: "center" }} data-test="yapboz-taslar">
        {taslar.map((x, k) => { const tr = ipucu(x.t); return (
          <button type="button" class={`wchip${secilen.includes(k) ? " used" : ""}`} disabled={secilen.includes(k) || v !== null} data-test="yapboz-tas"
            style={{ flexDirection: "column", lineHeight: 1.1 }} onClick={() => { setSecilen([...secilen, k]); void speak(x.t, "de", "normal" as Speed); }}>
            <span lang="de">{x.t}</span>{tr && <span class="tiny muted" style={{ fontWeight: 600 }}>{tr}</span>}
          </button>); })}
      </div>
      {v === null && <ActionBar>
        <button class="btn primary" style={{ width: "100%" }} data-test="akis-kontrol" disabled={secilen.length !== taslar.length} onClick={kontrol}>Kontrol et</button>
        <div class="row" style={{ justifyContent: "center", gap: 24 }}>
          <button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="akis-dinle" onClick={() => void speak(bilgi.de, "de", "normal")}>Dinle</button>
          <button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="akis-bilmiyorum" onClick={() => setV("bilmiyorum")}>Bilmiyorum</button>
        </div>
      </ActionBar>}
      {v !== null && <Sonuc v={v} cevap={cumle} bilgi={bilgi} onDevam={() => onBitti(v !== "bilmiyorum" && v.kind === "correct")} />}
    </section>
  );
}

/** Yeni kalıp (TARGET3c 1): kalıp büyük, yuva vurgulu; Türkçesi; örnekler sesli; tek birincil "Anladım" */
export function KalipAdimi({ kalip, ornekler, onBitti }: { kalip: { de: string; tr: string }[]; ornekler: CumleBilgi[]; onBitti: () => void }) {
  // yuva: altı çizili boşluk (TARGET3c 1); "…" hapı yükleniyor göstergesine benziyordu (PM 7055715440 md. 2)
  const yuvali = (s: string) => s.split(/(…|\{[^}]*\})/).map((p) => (p === "…" || /^\{/.test(p) ? <span class="kalip-yuva" aria-label="boşluk">{"\u00A0".repeat(6)}</span> : p));
  // "önce duy": girişte ilk örnek kendiliğinden okunur
  useEffect(() => { if (ornekler[0]) void speak(ornekler[0].de, "de", "normal"); }, []);
  const vurgulu = (o: CumleBilgi) => { const v = new Set(o.vurgu ?? []); return o.de.split(/(\s+)/).map((w) => (v.has(w) ? <mark class="tanit-vurgu">{w}</mark> : w)); };
  return (
    <section class="stack fade" data-test="akis-kalip">
      <div class="kicker icerik" style={{ color: "var(--accent)" }}>Yeni kalıp</div>
      {kalip.map((k) => <div><div class="de-lg" lang="de">{yuvali(k.de)}</div><p class="small muted" style={{ margin: 0 }}>{k.tr}</p></div>)}
      {ornekler.length > 0 && <section class="card stack" style={{ gap: 6 }} data-test="kalip-ornekler">
        {ornekler.slice(0, 2).map((o) => <div class="row" style={{ flexWrap: "nowrap", gap: 10, alignItems: "center" }}><span class="grow"><b lang="de">{vurgulu(o)}</b><br /><span class="small muted">{o.tr}</span></span><ListenButton text={o.de} small slowToggle={false} /></div>)}
      </section>}
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={onBitti}>Anladım</button></ActionBar>
    </section>
  );
}

/**
 * Yeni kelime (TARGET3b 2, K10): Almanca cümle en büyük öğe; kartın sözcüğü vurgulu; K(t) dışındaki tek sözcük altı noktalı,
 * dokununca Türkçesi (sorulmaz). Altta kelime kutusu: Almanca + Türkçe + ses (Yavaş). "Anladım" tek birincil düğme.
 */
export function TanitAdimi({ bilgi, kelime, tr, vurgu, isaretli, onBitti }: { bilgi: CumleBilgi; kelime: string; tr: string; vurgu: string[]; isaretli: { sozcuk: string; tr?: string }[]; onBitti: () => void }) {
  const [acik, setAcik] = useState<string | null>(null);
  const v = new Set(vurgu.map((x) => x.toLowerCase())), isr = new Map(isaretli.map((x) => [x.sozcuk.toLowerCase(), x.tr]));
  const parcalar = bilgi.de.split(/(\s+|[.,!?;:„“"»«]+)/).filter((x) => x !== "");
  return (
    <section class="stack fade" data-test="akis-tanit">
      <div class="kicker icerik" style={{ color: "var(--accent)" }}>Yeni kelime</div>
      <div class="de-lg" lang="de" style={{ fontSize: "1.7rem" }} data-test="tanit-cumle">
        {parcalar.map((p) => {
          const k = p.toLowerCase();
          if (v.has(k)) return <mark class="tanit-vurgu">{p}</mark>;
          if (isr.has(k)) return <button type="button" class="tanit-isaret" data-test="tanit-isaret" aria-label={`${p}: Türkçesini göster`} onClick={() => setAcik(acik === k ? null : k)}>{p}</button>;
          return p;
        })}
      </div>
      {acik && <p class="small" style={{ margin: 0 }} data-test="tanit-isaret-tr"><b lang="de">{acik}</b>: {isr.get(acik) ?? "—"}</p>}
      <p class="small muted" style={{ margin: 0 }}>{bilgi.tr}</p>
      <section class="card row" style={{ flexWrap: "nowrap", gap: 10, alignItems: "center" }} data-test="tanit-kelime">
        <span class="grow"><b lang="de" style={{ fontSize: "1.15rem" }}>{kelime}</b><br /><span class="small muted">{tr}</span></span>
        <ListenButton text={kelime} small />
      </section>
      {isaretli.length > 0 && <p class="tiny muted" style={{ margin: 0 }}>Altı noktalı kelimeyi henüz öğrenmedin. Dokununca Türkçesini görürsün; sana sorulmaz.</p>}
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={onBitti}>Anladım</button></ActionBar>
    </section>
  );
}

export interface SahneVeri { ortam_tr?: string; satirlar: { r: string; de: string; tr: string }[]; soru: { q_tr: string; opts: string[]; ans: number } }

/** Mini sahne (TARGET3b 5, K6): önce ses (karakter sesleriyle), metin sonra açılır; tek anlama sorusu, seçilince "Kontrol et" */
export function SahneAdimi({ sahne, onBitti }: { sahne: SahneVeri; onBitti: (dogru: boolean) => void }) {
  const [dinledi, setDinledi] = useState(false);
  const [calisiyor, setCalisiyor] = useState(false);
  const [metin, setMetin] = useState(false);
  const [secim, setSecim] = useState<number | null>(null);
  const [bitti, setBitti] = useState(false);
  const kimler = sahne.satirlar.map((s) => s.r);
  const dinle = async () => { setCalisiyor(true); try { await speakDizi(sahne.satirlar.map((s) => ({ de: s.de, kim: s.r })), "normal", 400); } finally { setCalisiyor(false); setDinledi(true); } };
  const ok = secim === sahne.soru.ans;
  return (
    <section class="stack fade" data-test="akis-sahne" data-dinledi={dinledi ? "1" : "0"}>
      {sahne.ortam_tr && <p class="small" style={{ margin: 0 }} data-test="sahne-ortam">{sahne.ortam_tr} Önce dinle, sonra oku.</p>}
      <div class="row" style={{ justifyContent: "center", gap: 12 }}>
        <ListenButton text={sahne.satirlar.map((s) => s.de).join(" ")} label="Sahneyi dinle" slowToggle={false} metinGizli={!bitti} />
        <button class="btn sm" data-test="sahne-dinle" disabled={calisiyor} onClick={() => void dinle()}>{calisiyor ? "Dinleniyor…" : dinledi ? "Yeniden dinle" : "Sesleriyle dinle"}</button>
      </div>
      {(dinledi || metin) ? (
        <section class="card stack" style={{ gap: 8 }} data-test="sahne-metin">
          {sahne.satirlar.map((s) => (
            <div class="row" style={{ flexWrap: "nowrap", gap: 8, alignItems: "flex-start" }}>
              <span class="grow"><span class="tiny muted">{s.r}</span><br /><b lang="de">{s.de}</b><br /><span class="small muted">{s.tr}</span></span>
              <ListenButton text={s.de} small slowToggle={false} kim={s.r} sahne={kimler} />
            </div>))}
        </section>
      ) : <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="sahne-metni-ac" onClick={() => setMetin(true)}>Metni göster</button></div>}
      <section class="stack" style={{ gap: 8 }} data-test="sahne-soru">
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Sahne bitti. Anladın mı?</div>
        <h2 style={{ margin: 0 }}>{sahne.soru.q_tr}</h2>
        <div role="group">{sahne.soru.opts.map((o, k) => (
          <button class={`opt${!bitti ? (secim === k ? " sel" : "") : k === sahne.soru.ans ? " right" : k === secim ? " wrong" : ""}`} disabled={bitti} data-opt={k}
            {...(import.meta.env.MODE === "e2e" ? { "data-right": k === sahne.soru.ans ? "1" : undefined } : {})} onClick={() => setSecim(k)}>{o}</button>))}</div>
      </section>
      {bitti && <FeedbackBand kind={ok ? "ok" : "bad"} title={ok ? "Doğru" : `Doğrusu: ${sahne.soru.opts[sahne.soru.ans]}`} />}
      <ActionBar>
        {!bitti
          ? <button class="btn primary" style={{ width: "100%" }} data-test="sahne-kontrol" disabled={secim === null} onClick={() => { setBitti(true); setMetin(true); haptic(ok ? "success" : "error"); }}>Kontrol et</button>
          : <button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={() => onBitti(ok)}>Devam et</button>}
      </ActionBar>
    </section>
  );
}
