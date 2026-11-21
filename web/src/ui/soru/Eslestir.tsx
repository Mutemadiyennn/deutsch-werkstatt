/** AKIS AK-7: halkanın `eslestir` adımı (hedef design/TARGET3b 4. ekran). Ekran (Akis.tsx, AK-10 4. adım) gelene kadar yalnız e2e'deki `#/__halka-turleri` gösterir. */
import { useMemo, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import { speak } from "../../services/speech.ts";
import { haptic } from "../../services/haptics.ts";
import { ActionBar, FeedbackBand } from "../kit.tsx";
import { Icon } from "../icons.tsx";
import { duyulan, eslestirBitti, eslestirDokun, eslestirGoster, eslestirKur, eslestirSonuc, type EslestirDurum } from "../../core/halkaTur.ts";

const E2E = import.meta.env.MODE === "e2e";

/**
 * Eşleştir (TARGET3b 4): Almanca kelime Türkçesiyle buluşur. "Kontrol et" yok; yanlışta kısa sallanma, ceza yok.
 * `onBitti` kart başına sonucu verir: yanlış eşleştirilen ya da "göster" ile açılan kart halkada bir kez daha gelir.
 */
export function Eslestir({ kartlar, tohum, onBitti }: { kartlar: readonly Lexeme[]; tohum: string; onBitti: (sonuc: { kart: string; dogru: boolean }[]) => void }) {
  const lex = useMemo(() => new Map(kartlar.map((l) => [l.id, l])), [kartlar]);
  const [d, setD] = useState<EslestirDurum | null>(() => eslestirKur(kartlar, tohum));
  // 4'ten az uygun kart: eşleştirme kurulamaz; ekran takılmasın, adım geçilir (sonuç yok; inceleme #183 P2)
  if (!d) return (
    <section class="stack" data-test="eslestir-yok"><p class="small muted" style={{ margin: 0 }}>Bu halkada eşleştirme için yeterli kelime yok.</p>
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="esles-devam" onClick={() => onBitti([])}>Devam et</button></ActionBar></section>);
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
