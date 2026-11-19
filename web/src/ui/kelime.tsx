/** Metindeki kelimeye dokununca açılan kart (medya metni, okuma; #58 A4, A8): kart varsa anlam + örnek, yoksa "bankana ekle" */
import type { Lexeme } from "@dw/shared";
import { useApp } from "../state.ts";
import { kartBul } from "../core/medya.ts";
import { addPersonal } from "../data/db.ts";
import { Art } from "./components.tsx";

export function KelimeSayfasi({ kelime, lex, onClose }: { kelime: string; lex: Lexeme[]; onClose: () => void }) {
  const { toast } = useApp();
  const kart = kartBul(kelime, lex);
  return (
    <div class="card stack fade kelime-sheet" role="dialog" aria-label="Kelime kartı" data-test="kelime-kart">
      {kart ? <><div class="de-lg" lang="de"><Art art={kart.art} de={kart.de} /></div><p>{kart.tr}</p>{kart.examples[0] && <p class="small"><span lang="de">{kart.examples[0].de}</span><br /><span class="muted">{kart.examples[0].tr}</span></p>}</>
        : <><div class="de-lg" lang="de">{kelime.replace(/[.,!?;:]/g, "")}</div><p class="small muted">Bu kelimenin kartı henüz yok. Bankana eklersen anlamı hazırlanınca Bahçe'ye gelir.</p></>}
      <div class="row"><button class="btn primary grow" data-test="bankaya-ekle" onClick={async () => {
        const de = kart ? kart.de : kelime.replace(/[.,!?;:]/g, "");
        await addPersonal({ id: `tap:${de}`, de: kart?.art ? `${kart.art} ${de}` : de, tr: kart?.tr, at: new Date().toISOString(), source: "tap" });
        toast("Bankana eklendi"); onClose();
      }}>Bankaya ekle</button><button class="btn grow" onClick={onClose}>Kapat</button></div>
    </div>
  );
}

/** Kelimelere bölünmüş Almanca metin: her kelime dokunulabilir */
export function DokunMetin({ de, onKelime }: { de: string; onKelime: (w: string) => void }) {
  // ad yer tutucusu "(adın)" kelime değildir: dokunulmaz
  return <span lang="de">{de.split(/(\s+)/).map((w) => /\s/.test(w) || w.includes("(adın)") ? w : <button class="wordtap" data-test="kelime" onClick={() => onKelime(w)}>{w}</button>)}</span>;
}
