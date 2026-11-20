/**
 * AKIS AK-2 kural 4 / TARGET3b "Halka: resimden seç" (AK-10 3. adım): kelime duyulur, dört görselden seçilir.
 * Soru anında Almanca metin YOK (kip: duy); seçili kare mavi çerçeve; "Kontrol et" ile değerlendirilir; cevaptan sonra kelime
 * ve cümle açılır. Görseli olmayan kart bu türe seçilmez (B4): çağıran, dört seçeneğin hepsinin `img`i olduğunu sağlar.
 */
import { useEffect, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import { speak } from "../../services/speech.ts";
import { Icon } from "../icons.tsx";
import { ActionBar, FeedbackBand } from "../kit.tsx";
import { Photo } from "../learn.tsx";

export function ResimdenSec({ hedef, secenekler, cumle, onBitti }: { hedef: Lexeme; secenekler: Lexeme[]; cumle?: { de: string; tr: string }; onBitti: (ok: boolean) => void }) {
  const [sec, setSec] = useState<string | null>(null);
  const [sonuc, setSonuc] = useState<null | "dogru" | "yanlis" | "bilmiyorum">(null);
  const soz = hedef.art ? `${hedef.art} ${hedef.de}` : hedef.de;
  const dinle = (yavas = false) => void speak(soz, "de", yavas ? "slow" : "normal", true);
  useEffect(() => { dinle(); }, [hedef.id]);
  const bitti = sonuc !== null;
  return (
    <section class="stack fade" data-test="resimden-sec" data-hedef={hedef.id}>
      <div><div class="kicker">Dinle ve seç</div><h2 style={{ margin: "4px 0 0" }}>Hangisini duydun?</h2></div>
      <div class="row" style={{ justifyContent: "center", gap: 12 }}>
        <button type="button" class="btn buyuk-ses" aria-label="Yeniden dinle" data-test="rs-dinle" onClick={() => dinle()}><Icon name="volume" /></button>
        <button type="button" class="btn sm ghost" data-test="rs-yavas" onClick={() => dinle(true)}>Yavaş</button>
      </div>
      <div class="dort-resim" role="group" aria-label="Görseller">
        {secenekler.map((l) => {
          const durum = !bitti ? (sec === l.id ? " sec" : "") : l.id === hedef.id ? " right" : sec === l.id ? " wrong" : "";
          return (
            <button type="button" class={`resim-kare${durum}`} aria-pressed={sec === l.id} aria-label={bitti ? (l.art ? `${l.art} ${l.de}` : l.de) : `Görsel ${secenekler.indexOf(l) + 1}`}
              data-test="rs-kare" data-id={l.id} disabled={bitti} onClick={() => setSec(l.id)}>
              <Photo q={l.img} yer={[`${l.id}#kart`]} alt="" enCok={150} oran="1 / 1" />
            </button>
          );
        })}
      </div>
      {bitti && (
        <div class="stack" data-test="rs-acik">
          <div class="de-lg" lang="de">{soz}</div>
          <p class="small muted" style={{ margin: 0 }}>{hedef.tr}</p>
          {cumle && <p class="small" style={{ margin: 0 }}><span lang="de">{cumle.de}</span><br /><span class="muted">{cumle.tr}</span></p>}
        </div>
      )}
      <ActionBar>
        {!bitti ? (
          <>
            <button class="btn primary block" disabled={!sec} data-test="rs-kontrol" onClick={() => setSonuc(sec === hedef.id ? "dogru" : "yanlis")}>Kontrol et</button>
            <div class="row" style={{ justifyContent: "center", gap: 18 }}>
              <button type="button" class="ikincil-eylem" onClick={() => dinle()}>Yeniden dinle</button>
              <button type="button" class="ikincil-eylem" data-test="rs-bilmiyorum" onClick={() => setSonuc("bilmiyorum")}>Bilmiyorum</button>
            </div>
          </>
        ) : (
          <>
            <FeedbackBand kind={sonuc === "dogru" ? "ok" : "bad"} title={sonuc === "dogru" ? "Doğru." : sonuc === "bilmiyorum" ? "Sorun değil; bu görsel." : "Bu değil; doğrusu yeşil olan."} />
            <button class="btn primary block" data-test="next" onClick={() => onBitti(sonuc === "dogru")}>Devam</button>
          </>
        )}
      </ActionBar>
    </section>
  );
}
