/** AKIS AK-7: halkanın `resimden_sec` adımı (hedef design/TARGET3b 3. ekran). Ekran (Akis.tsx, AK-10 4. adım) gelene kadar yalnız e2e'deki `#/__halka-turleri` gösterir. */
import { useEffect, useRef, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import type { FotoKayit } from "../../services/content.ts";
import { fotoAdresi } from "../../services/kartFoto.ts";
import { speak } from "../../services/speech.ts";
import { haptic } from "../../services/haptics.ts";
import { ActionBar, FeedbackBand, ListenButton } from "../kit.tsx";
import { Icon } from "../icons.tsx";
import { duyulan, kartGorsel, type ResimSoru } from "../../core/halkaTur.ts";

const E2E = import.meta.env.MODE === "e2e";

/** Görsellerin atfı (CC BY/BY-SA): soru anında Almanca metin olmasın diye yazar ve lisans tek satır, ad yok */
function Atiflar({ kayitlar }: { kayitlar: FotoKayit[] }) {
  return (
    <details class="tiny muted" data-test="resim-atif">
      <summary class="ikincil-eylem tiny">Fotoğraf kaynakları</summary>
      <ul style={{ margin: "4px 0 0", paddingLeft: 18 }} data-sira="yazar">
        {[...kayitlar].sort((x, y) => (x.yazar ?? "").localeCompare(y.yazar ?? "", "tr")).map((a) => <li>{a.sayfa && /^https:\/\//.test(a.sayfa) ? <a href={a.sayfa} target="_blank" rel="noopener noreferrer">{a.yazar || "kaynak"}</a> : (a.yazar || "kaynak")} · {a.lisans_url && /^https:\/\//.test(a.lisans_url) ? <a href={a.lisans_url} target="_blank" rel="noopener noreferrer">{a.lisans}</a> : a.lisans} · kırpıldı</li>)}
      </ul>
    </details>
  );
}

/**
 * Resimden seç (TARGET3b 3): kelime duyulur, dört görselden doğrusu seçilir. Cevaptan önce ekranda Almanca metin yok.
 * Görsellerden biri yüklenemezse `onYok` (çağıran başka türe düşer; tek doğru cevap kuralı bozulmasın).
 */
export function ResimSec({ soru, lex, harita, onBitti, onYok }: { soru: ResimSoru; lex: ReadonlyMap<string, Lexeme>; harita: Readonly<Record<string, FotoKayit>>; onBitti: (dogru: boolean) => void; onYok?: () => void }) {
  const l = lex.get(soru.kart)!;
  const metin = duyulan(l);
  const [secim, setSecim] = useState<number | null>(null);
  /** yüklenen görsel sayısı: dördü de gelmeden seçim yapılamaz (inceleme #183 P2) */
  const [yuklu, setYuklu] = useState(0);
  const [sonuc, setSonuc] = useState<null | "dogru" | "yanlis" | "bilmiyorum">(null);
  useEffect(() => { void speak(metin, "de", "normal"); }, [soru.kart]);
  /** PM 7088230583 md. 3: görsel önce raftan (`raf:` adresi anahtarla, kapalı önbellekten), gelmezse açık fotoğraf; biri hiç yoksa `onYok` */
  const [gorseller, setGorseller] = useState<{ src: string; atif: FotoKayit | null }[] | null>(null);
  const yokRef = useRef(onYok); yokRef.current = onYok;
  useEffect(() => {
    let canli = true; setGorseller(null);
    void Promise.all(soru.secenekler.map(async (s) => { const f = harita[kartGorsel(s.kart)]; return f ? fotoAdresi(f) : { src: s.gorsel, atif: null }; })).then((xs) => {
      if (!canli) return;
      if (xs.some((x) => !x)) { yokRef.current?.(); return; }
      setGorseller(xs as { src: string; atif: FotoKayit | null }[]);
    });
    return () => { canli = false; };
  }, [soru.kart, soru.secenekler.map((s) => s.kart).join("|")]);
  const kontrol = () => { if (secim === null) return; const ok = secim === soru.dogru; setSonuc(ok ? "dogru" : "yanlis"); haptic(ok ? "success" : "error"); };
  const bitti = sonuc !== null;
  // PM 7052062209 md. 4: cevaptan önce görselde Almanca içeren alt/erişilebilirlik etiketi yok (VoiceOver cevabı okumasın); cevaptan sonra var
  const etiket = (i: number) => { if (!bitti) return `Görsel ${i + 1}`; const x = lex.get(soru.secenekler[i]!.kart); return x ? `${duyulan(x)}: ${x.tr}` : `Görsel ${i + 1}`; };
  return (
    <section class="stack fade" data-test="resim-sec" data-kart={E2E ? soru.kart : undefined}>
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Dinle ve seç</div>
        <h2 style={{ margin: 0 }}>Hangisini duydun?</h2>
      </div>
      <div class="row" style={{ justifyContent: "center" }}><ListenButton text={metin} label="Kelimeyi dinle" metinGizli={!bitti} /></div>
      <div class="resim-izgara" role="radiogroup" aria-label="Dört görsel">
        {soru.secenekler.map((s, i) => {
          const dur = !bitti ? (secim === i ? " sel" : "") : i === soru.dogru ? " right" : i === secim ? " wrong" : " soluk";
          return (
            <button type="button" role="radio" aria-checked={secim === i} class={`resim-secenek${dur}`} disabled={bitti || !gorseller || yuklu < soru.secenekler.length} data-test="resim-secenek" data-i={i}
              {...(E2E ? { "data-right": i === soru.dogru ? "1" : undefined } : {})} aria-label={etiket(i)} onClick={() => { setSecim(i); haptic("selection"); }}>
              {gorseller && <img src={gorseller[i]!.src} alt={bitti ? etiket(i) : ""} loading="eager" decoding="async" onLoad={() => setYuklu((n) => n + 1)} onError={() => onYok?.()} />}
              {bitti && i === soru.dogru && <span class="resim-isaret" aria-hidden="true"><Icon name="check" /></span>}
            </button>
          );
        })}
      </div>
      {bitti && (
        <div class="stack" style={{ gap: 8 }} data-test="resim-cevap">
          <FeedbackBand kind={sonuc === "dogru" ? "ok" : "bad"} title={sonuc === "dogru" ? "Doğru" : sonuc === "bilmiyorum" ? "Şuydu" : "Bu değildi"}>
            <div class="row" style={{ flexWrap: "nowrap", alignItems: "center", gap: 10 }}>
              <span class="grow"><b lang="de" style={{ fontSize: "1.15rem" }}>{metin}</b><br /><span class="small">{l.tr}</span></span>
              <ListenButton text={metin} small slowToggle={false} />
            </div>
          </FeedbackBand>
        </div>
      )}
      <Atiflar kayitlar={(gorseller ?? []).map((g) => g.atif).filter((x): x is FotoKayit => !!x)} />
      <ActionBar>
        {!bitti
          ? <button class="btn primary" style={{ width: "100%" }} data-test="resim-kontrol" disabled={secim === null} onClick={kontrol}>Kontrol et</button>
          : <button class="btn primary" style={{ width: "100%" }} data-test="resim-devam" onClick={() => onBitti(sonuc === "dogru")}>Devam et</button>}
        {!bitti && <div class="row" style={{ justifyContent: "center", gap: 24 }}>
          <button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="resim-yeniden" onClick={() => void speak(metin, "de", "normal")}>Yeniden dinle</button>
          <button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="resim-bilmiyorum" onClick={() => { setSecim(null); setSonuc("bilmiyorum"); }}>Bilmiyorum</button>
        </div>}
      </ActionBar>
    </section>
  );
}
