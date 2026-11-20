/**
 * AKIS AK-10 3. adım: halkanın iki yeni adım türünün bileşenleri (hedef: design/TARGET3b 3. ve 4. ekran).
 * Ekrana (Akis.tsx, 4. adım) bağlanana kadar yalnız e2e kipindeki `#/__halka-turleri` gösterir.
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import type { FotoKayit } from "../services/content.ts";
import { speak } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, FeedbackBand, ListenButton } from "./kit.tsx";
import { Icon } from "./icons.tsx";
import { duyulan, eslestirBitti, eslestirDokun, eslestirGoster, eslestirKur, eslestirSonuc, kartGorsel, type EslestirDurum, type ResimSoru } from "../core/halkaTur.ts";

const E2E = import.meta.env.MODE === "e2e";

/** Görsellerin atfı (CC BY/BY-SA): soru anında Almanca metin olmasın diye yazar ve lisans tek satır, ad yok */
function Atiflar({ kayitlar }: { kayitlar: FotoKayit[] }) {
  return (
    <details class="tiny muted" data-test="resim-atif">
      <summary class="ikincil-eylem tiny">Fotoğraf kaynakları</summary>
      <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
        {kayitlar.map((a, i) => <li>{i + 1}. {a.sayfa && /^https:\/\//.test(a.sayfa) ? <a href={a.sayfa} target="_blank" rel="noopener noreferrer">{a.yazar || "kaynak"}</a> : (a.yazar || "kaynak")} · {a.lisans_url && /^https:\/\//.test(a.lisans_url) ? <a href={a.lisans_url} target="_blank" rel="noopener noreferrer">{a.lisans}</a> : a.lisans} · kırpıldı</li>)}
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
  const [sonuc, setSonuc] = useState<null | "dogru" | "yanlis" | "bilmiyorum">(null);
  useEffect(() => { void speak(metin, "de", "normal"); }, [soru.kart]);
  const kontrol = () => { if (secim === null) return; const ok = secim === soru.dogru; setSonuc(ok ? "dogru" : "yanlis"); haptic(ok ? "success" : "error"); };
  const bitti = sonuc !== null;
  return (
    <section class="stack fade" data-test="resim-sec" data-kart={E2E ? soru.kart : undefined}>
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Dinle ve seç</div>
        <h2 style={{ margin: 0 }}>Hangisini duydun?</h2>
      </div>
      <div class="row" style={{ justifyContent: "center" }}><ListenButton text={metin} label="Kelimeyi dinle" /></div>
      <div class="resim-izgara" role="radiogroup" aria-label="Dört görsel">
        {soru.secenekler.map((s, i) => {
          const dur = !bitti ? (secim === i ? " sel" : "") : i === soru.dogru ? " right" : i === secim ? " wrong" : " soluk";
          return (
            <button type="button" role="radio" aria-checked={secim === i} class={`resim-secenek${dur}`} disabled={bitti} data-test="resim-secenek" data-i={i}
              {...(E2E ? { "data-right": i === soru.dogru ? "1" : undefined } : {})} aria-label={`Görsel ${i + 1}`} onClick={() => { setSecim(i); haptic("selection"); }}>
              <img src={s.gorsel} alt="" loading="eager" decoding="async" onError={() => onYok?.()} />
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
      <Atiflar kayitlar={soru.secenekler.map((s) => harita[kartGorsel(s.kart)]).filter((x): x is FotoKayit => !!x)} />
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

/**
 * Eşleştir (TARGET3b 4): Almanca kelime Türkçesiyle buluşur. "Kontrol et" yok; yanlışta kısa sallanma, ceza yok.
 * `onBitti` kart başına sonucu verir: yanlış eşleştirilen ya da "göster" ile açılan kart halkada bir kez daha gelir.
 */
export function Eslestir({ kartlar, tohum, onBitti }: { kartlar: readonly Lexeme[]; tohum: string; onBitti: (sonuc: { kart: string; dogru: boolean }[]) => void }) {
  const lex = useMemo(() => new Map(kartlar.map((l) => [l.id, l])), [kartlar]);
  const [d, setD] = useState<EslestirDurum | null>(() => eslestirKur(kartlar, tohum));
  if (!d) return null;
  const dokun = (yan: "sol" | "sag", kart: string) => {
    const l = lex.get(kart)!;
    if (yan === "sol" && !d.bitti.includes(kart)) void speak(duyulan(l), "de", "normal");
    const r = eslestirDokun(d, yan, kart);
    if (r.olay === "dogru") haptic("success"); else if (r.olay === "yanlis") haptic("error"); else if (r.olay === "sec") haptic("selection");
    setD(r.durum);
  };
  const hucre = (yan: "sol" | "sag", kart: string) => {
    const l = lex.get(kart)!;
    const bitti = d.bitti.includes(kart), sec = d.secili?.yan === yan && d.secili.kart === kart, salla = d.salla?.[yan] === kart;
    const gos = bitti && d.gosterildi.includes(kart);
    return (
      // her denemede yeni anahtar: sallanma aynı hücrede art arda da oynar
      <button type="button" key={`${yan}${kart}${salla ? d.yanlis.length : ""}`} class={`esles-hucre ${yan}${bitti ? (gos ? " gosterildi" : " right") : sec ? " sel" : ""}${salla ? " salla" : ""}`}
        disabled={bitti} aria-pressed={sec} data-test={`esles-${yan}`} data-kart={E2E ? kart : undefined} onClick={() => dokun(yan, kart)}>
        {bitti && !gos && <Icon name="check" />}
        {yan === "sol" ? <span lang="de">{l.art && l.pos === "noun" ? `${l.art} ${l.de}` : l.de}</span> : <span>{l.tr}</span>}
      </button>
    );
  };
  const tamam = eslestirBitti(d);
  return (
    <section class="stack fade" data-test="eslestir">
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Eşleştir</div>
        <h2 style={{ margin: 0 }}>Kelimeyi anlamıyla buluştur</h2>
      </div>
      <div class="esles-izgara">
        {d.sol.map((k, i) => <>{hucre("sol", k)}{hucre("sag", d.sag[i]!)}</>)}
      </div>
      <p class="small muted row" style={{ gap: 6, flexWrap: "nowrap", margin: 0 }}><Icon name="volume" />Almanca kelimeye dokununca sesini duyarsın.</p>
      {tamam && <FeedbackBand kind={d.yanlis.length ? "info" : "ok"} title={d.yanlis.length ? "Tamam" : "Hepsi doğru"}>
        {d.yanlis.length ? `${d.yanlis.length} kelime bu halkada bir kez daha gelecek.` : `${d.sol.length} kelimenin hepsini anlamıyla buluşturdun.`}</FeedbackBand>}
      <ActionBar>
        {tamam
          ? <button class="btn primary" style={{ width: "100%" }} data-test="esles-devam" onClick={() => onBitti(eslestirSonuc(d))}>Devam et</button>
          : <div style={{ textAlign: "center" }}><button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="esles-goster" onClick={() => setD(eslestirGoster(d))}>Bilmiyorum, göster</button></div>}
      </ActionBar>
    </section>
  );
}
