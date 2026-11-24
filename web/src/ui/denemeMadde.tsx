/**
 * Düzey denemesinin madde kartı (sınav günü `screens/Sinav.tsx` ve seviye tespitinin dört beceri çekirdeği ortak).
 * Ana pakette durur (seviye tespiti ana pakette); sınav günü ekranının geri kalanı ayrı parçada kalır.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { DenemeKisim, DenemeMadde, Speed } from "@dw/shared";
import type { Cevap } from "../core/deneme.ts";
import { speakDizi, stopSpeaking } from "../services/speech.ts";
import { ActionBar, AnswerField, ListenButton } from "./kit.tsx";
import { Rich } from "./rich.tsx";

const E2E = import.meta.env.MODE === "e2e";

/**
 * Bir madde: seç (dinleme, okuma), form, mesaj, konuşma. Doğru/yanlış gösterilmez; cevap kaydedilir ve sıradakine geçilir.
 * Seviye tespiti (PM-115) seç/form/mesajı buradan kullanır: `kontrol` birincil düğmenin adı, `ek` altına (Bilmiyorum).
 */
export function MaddeView({ m, kisim, onDone, kontrol, ek }: { m: DenemeMadde; kisim: Pick<DenemeKisim, "dinleme_sayisi">; onDone: (c: Cevap) => void; kontrol?: string; ek?: ComponentChildren }) {
  const [sec, setSec] = useState<number | null>(null);
  const bar = (b: ComponentChildren) => <ActionBar>{ek ? <div class="stack" style={{ gap: 8 }}>{b}{ek}</div> : b}</ActionBar>;
  const [form, setForm] = useState<Record<string, string>>({});
  const [yazi, setYazi] = useState("");
  if (m.k === "pick") return (
    <section class="card stack fade" data-test="sinav-sec" {...(E2E ? { "data-dogru": m.ans } : {})}>
      {m.ses && <Dinle satirlar={m.ses} speed={m.speed} hak={kisim.dinleme_sayisi ?? 2} />}
      {m.metin_de && <div class="sinav-metin selectable" lang="de" data-test="sinav-metin">{m.metin_de}</div>}
      {m.secenekler_de && <div class="stack" style={{ gap: 8 }}>{m.secenekler_de.map((t, j) => <div class="sinav-metin selectable" lang="de"><b>{m.opts[j] ?? String.fromCharCode(97 + j)})</b> {t}</div>)}</div>}
      <h3><Rich text={m.q_tr} /></h3>
      <div role="radiogroup" aria-label="Cevap seçenekleri">{m.opts.map((o, k) => (
        <button class={`opt${sec === k ? " sel" : ""}`} role="radio" aria-checked={sec === k} data-opt={k} onClick={() => setSec(k)}>{o}</button>))}</div>
      {bar(<button class="btn primary block" data-test="next" disabled={sec === null} onClick={() => sec !== null && onDone(sec)}>{kontrol ?? "Devam"}</button>)}
    </section>
  );
  if (m.k === "form") {
    const tamam = m.alanlar.every((a) => (form[a.id] ?? "").trim());
    return (
      <section class="card stack fade" data-test="sinav-form" {...(E2E ? { "data-ornek": JSON.stringify(Object.fromEntries(m.alanlar.map((a) => [a.id, a.accepted[0]]))) } : {})}>
        <div class="sinav-metin selectable" lang="de">{m.bilgi_de}</div>
        <div class="sinav-formu" lang="de">
          <b>{m.form_baslik_de}</b>
          {(m.verilen ?? []).map((x) => <label class="sinav-alan"><span>{x.etiket_de}</span><input class="input" value={x.deger} readOnly tabIndex={-1} /></label>)}
          {m.alanlar.map((a) => <label class="sinav-alan"><span>{a.etiket_de}</span>
            <input class="input" lang="de" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellcheck={false} data-alan={a.id}
              value={form[a.id] ?? ""} onInput={(e) => setForm({ ...form, [a.id]: (e.target as HTMLInputElement).value })} /></label>)}
        </div>
        {bar(<button class="btn primary block" data-test="next" onClick={() => onDone(form)}>{kontrol ?? (tamam ? "Devam" : "Boş alanlarla devam")}</button>)}
      </section>
    );
  }
  if (m.k === "mesaj") return (
    <section class="card stack fade" data-test="sinav-mesaj" {...(E2E ? { "data-ornek": m.ornek_de } : {})}>
      <p><Rich text={m.gorev_tr} /></p>
      {(m.noktalar_tr ?? []).length > 0 && <ol class="small">{(m.noktalar_tr ?? []).map((x) => <li><Rich text={x} /></li>)}</ol>}
      <textarea class="input" rows={6} lang="de" autocapitalize="sentences" spellcheck={false} data-test="yazi" value={yazi}
        placeholder="Almanca mesajını yaz…" onInput={(e) => setYazi((e.target as HTMLTextAreaElement).value)} />
      <p class="tiny muted">{yazi.trim() ? yazi.trim().split(/\s+/).length : 0} kelime</p>
      {bar(<button class="btn primary block" data-test="next" disabled={!yazi.trim()} onClick={() => onDone(yazi.trim())}>{kontrol ?? "Mesajı teslim et"}</button>)}
    </section>
  );
  // konuşma: hazırlıksız; örnek cevap gösterilmez
  return (
    <section class="card stack fade" data-test="sinav-konus" {...(E2E ? { "data-cevap": m.accepted[0] } : {})}>
      <div class="kicker">Konuş · hazırlık yok</div>
      {m.situation_tr && <p class="small"><Rich text={m.situation_tr} /></p>}
      {m.k === "guided_response"
        ? <div class="row"><ListenButton text={m.prompt_de} small /><span class="de" lang="de">„{m.prompt_de}“</span></div>
        : <div class="row"><ListenButton text={m.audio_de} speed={m.speed} metinGizli /><span class="tiny muted">Metin gösterilmiyor: yalnızca dinle.</span></div>}
      <ActionBar>
        <AnswerField submitLabel="Cevabı kaydet" onSubmit={(a) => onDone(a)} />
        <button class="btn ghost block" data-test="gec" onClick={() => onDone("")}>Cevap veremiyorum, geç</button>
      </ActionBar>
    </section>
  );
}

/** Dinleme: satırlar konuşanın sesiyle (kadın/erkek/anons), en çok `hak` kez; metin gösterilmez */
function Dinle({ satirlar, speed, hak }: { satirlar: { r: string; de: string }[]; speed?: Speed; hak: number }) {
  const [dinlenen, setDinlenen] = useState(0);
  const [calis, setCalis] = useState(false);
  // koşu sayacı: "Durdur" ve ekrandan kalkış diziyi bütünüyle keser (yalnız o anki satırı değil; inceleme #247 P1-1)
  const kosu = useRef(0);
  useEffect(() => () => { kosu.current++; stopSpeaking(); }, []);
  const kim = (r: string) => (r === "kadin" ? "Frau" : r === "erkek" ? "Herr" : r);
  const kalan = hak - dinlenen;
  const cal = async () => {
    if (calis) { kosu.current++; stopSpeaking(); setCalis(false); return; }
    if (kalan <= 0) return;
    const k = ++kosu.current;
    setCalis(true); setDinlenen((x) => x + 1);
    try { await speakDizi(satirlar.map((s) => ({ de: s.de, kim: kim(s.r), speed: speed ?? "normal" })), speed ?? "normal", 350, () => kosu.current !== k); }
    finally { if (kosu.current === k) setCalis(false); }
  };
  return (
    <div class="row sinav-dinle" data-test="sinav-dinle" data-kalan={kalan}>
      <button class="btn" type="button" data-test="dinle" disabled={kalan <= 0 && !calis} onClick={cal}>{calis ? "Durdur" : kalan > 0 ? "Kaydı dinle" : "Dinleme hakkın bitti"}</button>
      <span class="tiny muted">{kalan > 0 ? `${kalan} dinleme hakkın var` : "Soruyu cevapla"}</span>
    </div>
  );
}

