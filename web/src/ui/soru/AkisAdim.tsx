/**
 * AKIS AK-10 4a: halka cümlesiyle çalışan adım gövdeleri (hedef TARGET3c 1–3). Cümle, Türkçesi ve kabul listesi planın `cumle`sinden
 * ekranda çözülür (`CumleBilgi`: halka görev cümleleri → kart örnekleri). Bahçe'nin soru bileşeni kartın kendi örneğini sorar;
 * bunlar ise planlayıcının kapıdan geçirdiği cümleyi sorar (bilinmeyen 0, AK-3).
 */
import { useMemo, useState } from "preact/hooks";
import type { Speed } from "@dw/shared";
import { ruleVerdict, type Verdict } from "../../core/answer.ts";
import { tohumluRng } from "../../core/halkaTur.ts";
import { speak } from "../../services/speech.ts";
import { haptic } from "../../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, MicButton } from "../kit.tsx";

export interface CumleBilgi { de: string; tr: string; accepted: string[] }

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
export function UretAdimi({ bilgi, sesli, onBitti }: { bilgi: CumleBilgi; sesli: boolean; onBitti: (dogru: boolean) => void }) {
  const [v, setV] = useState<Verdict | "bilmiyorum" | null>(null);
  const [cevap, setCevap] = useState("");
  const [yazarak, setYazarak] = useState(!sesli);
  const kontrol = (s: string) => { const r = ruleVerdict(bilgi.accepted, s); setCevap(s); setV(r); haptic(r.kind === "correct" ? "success" : "error"); };
  return (
    <section class="stack fade" data-test={sesli ? "akis-soyle" : "akis-tr-de"}>
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>{sesli ? "Sen söyle" : "Almancasını yaz"}</div>
        <h2 style={{ margin: 0 }}>{bilgi.tr}</h2>
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
  if (!parca) return <UretAdimi bilgi={bilgi} sesli={false} onBitti={onBitti} />;
  const kontrol = (s: string) => { const r = ruleVerdict([parca.dogru], s.trim()); setCevap(s); setV(r); haptic(r.kind === "correct" ? "success" : "error"); };
  return (
    <section class="stack fade" data-test="akis-bosluk">
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Boşluğu doldur</div>
        <div class="de-lg" lang="de">{parca.once}<span class="bosluk" aria-label="boşluk">____</span>{parca.sonra}</div>
        <p class="small muted" style={{ margin: 0 }}>{bilgi.tr}</p>
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
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Cümleyi kur</div>
        <h2 style={{ margin: 0 }}>{bilgi.tr}</h2>
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
  const yuvali = (s: string) => s.split(/(…|\{[^}]*\})/).map((p) => (p === "…" || /^\{/.test(p) ? <span class="kalip-yuva">…</span> : p));
  return (
    <section class="stack fade" data-test="akis-kalip">
      <div class="kicker icerik" style={{ color: "var(--accent)" }}>Yeni kalıp</div>
      {kalip.map((k) => <div><div class="de-lg" lang="de">{yuvali(k.de)}</div><p class="small muted" style={{ margin: 0 }}>{k.tr}</p></div>)}
      {ornekler.length > 0 && <section class="card stack" style={{ gap: 6 }}>
        {ornekler.slice(0, 2).map((o) => <div class="row" style={{ flexWrap: "nowrap", gap: 10, alignItems: "center" }}><span class="grow"><b lang="de">{o.de}</b><br /><span class="small muted">{o.tr}</span></span><ListenButton text={o.de} small slowToggle={false} /></div>)}
      </section>}
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={onBitti}>Anladım</button></ActionBar>
    </section>
  );
}
