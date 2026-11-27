/** PM-148 karar 2: "Kendim hakkında" alanı (Ben ekranı ve serbest konuşmanın "o an sor" kartı ortak) */
import type { ProfilYuvasi } from "@dw/shared";

/** Alan: Türkçe etiket ve kalıptaki yerini gösteren Almanca çerçeve (öğrenci değeri nasıl yazacağını görür) */
export const ALANLAR: Record<ProfilYuvasi, { tr: string; once: string; sonra: string; ornek: string }> = {
  ulke: { tr: "Nerelisin?", once: "Ich komme aus", sonra: ".", ornek: "Polen" },
  sehir: { tr: "Hangi şehirde oturuyorsun?", once: "Ich wohne in", sonra: ".", ornek: "Hamburg" },
  yas: { tr: "Kaç yaşındasın?", once: "Ich bin", sonra: "Jahre alt.", ornek: "30" },
  diller: { tr: "Hangi dilleri konuşuyorsun?", once: "Ich spreche", sonra: ".", ornek: "Arabisch und Deutsch" },
  meslek: { tr: "Mesleğin ne?", once: "Ich bin", sonra: ".", ornek: "Krankenpfleger" },
  hobi: { tr: "Hobin ne?", once: "Mein Hobby ist", sonra: ".", ornek: "Fußball" },
  aile: { tr: "Medeni durumun?", once: "Ich bin", sonra: ".", ornek: "" }
};
export const AILE = [["", "Söylemek istemiyorum"], ["ledig", "bekâr (ledig)"], ["verheiratet", "evli (verheiratet)"], ["geschieden", "boşanmış (geschieden)"], ["verwitwet", "dul (verwitwet)"]] as const;

export function YuvaAlani({ y, deger, degis, cerceve = true }: { y: ProfilYuvasi; deger: string; degis: (v: string) => void;
  /** Almanca çerçeve ("Ich wohne in … .") görünsün mü: serbest konuşmanın içinde görünmez (ipucu olurdu; PM-148 md. 1) */ cerceve?: boolean }) {
  const a = ALANLAR[y];
  return (
    <label class="stack" style={{ gap: 4 }} data-test={`hakkimda-${y}`}>
      <span class="small"><b>{a.tr}</b></span>
      <span class="row" style={{ gap: 6, flexWrap: "nowrap", alignItems: "center" }}>
        {cerceve && <span class="small muted" lang="de" style={{ flex: "none" }}>{a.once}</span>}
        {y === "aile"
          ? <select class="input grow" value={deger} onChange={(e) => degis((e.target as HTMLSelectElement).value)}>{AILE.map(([v, t]) => <option value={v}>{cerceve ? t : t.replace(/\s*\(.*\)$/, "")}</option>)}</select>
          : <input class="input grow" lang="de" autoComplete="off" autocapitalize={y === "yas" ? "off" : "words"} inputMode={y === "yas" ? "numeric" : "text"} maxLength={60}
              placeholder={a.ornek} value={deger} onInput={(e) => degis((e.target as HTMLInputElement).value)} />}
        {cerceve && <span class="small muted" lang="de" style={{ flex: "none" }}>{a.sonra}</span>}
      </span>
    </label>
  );
}

