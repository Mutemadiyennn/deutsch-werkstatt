/**
 * YALNIZ e2e kipinde: AK-10 3. adımın iki türünü ekran (Akis.tsx, 4. adım) gelmeden gösterir ve sınar.
 * `#/__halka-turleri` → resimden seç (lx:Winter) → eşleştir (1. gün 1. halkası) → sonuç.
 * `#/__halka-turleri/resim/<kart>` ya da `#/__halka-turleri/esles/<kart,kart,…>` doğrudan o türü açar.
 * Üretim paketine girmez (app.tsx'te `import.meta.env.MODE === "e2e"` dalı; derleme denetimi bunu yoklar).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import { loadFoto, loadLexicon, type FotoKayit } from "../services/content.ts";
import { resimSecenekleri } from "../core/halkaTur.ts";
import { ResimSec } from "../ui/soru/ResimdenSec.tsx";
import { Eslestir } from "../ui/soru/Eslestir.tsx";
import { ProgressHeader } from "../ui/kit.tsx";
import { Loading } from "../ui/components.tsx";

const ILK_HALKA = ["lx:hallo", "lx:Frau", "lx:danke", "lx:bitte", "lx:ja"];

export function HalkaTurDeneme() {
  const p = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  const [veri, setVeri] = useState<{ lex: Map<string, Lexeme>; harita: Record<string, FotoKayit> } | null>(null);
  const [adim, setAdim] = useState<"resim" | "esles" | "son">(p[1] === "esles" ? "esles" : "resim");
  const [kayit, setKayit] = useState<string[]>([]);
  const [yok, setYok] = useState(false);
  useEffect(() => { void Promise.all([loadLexicon(), loadFoto()]).then(([x, h]) => setVeri({ lex: new Map(x.lexemes.map((l) => [l.id, l])), harita: h })); }, []);
  const soru = useMemo(() => veri && resimSecenekleri(veri.lex.get(p[1] === "resim" && p[2] ? p[2] : "lx:Winter")!, [...veri.lex.values()], veri.harita, "e2e"), [veri]);
  if (!veri) return <Loading />;
  const eslesKartlar = (p[1] === "esles" && p[2] ? p[2].split(",") : ILK_HALKA).map((k) => veri.lex.get(k)).filter((x): x is Lexeme => !!x);
  const tekTur = p[1] === "resim" || p[1] === "esles";
  return (
    <section class="stack" data-test="halka-turleri" data-adim={adim}>
      <ProgressHeader title="Halka" back="#/" />
      {adim === "resim" && (!soru || yok
        ? <p class="card small" data-test="resim-uygun-degil">Bu kelime için resimden seç uygun değil (seçilmiş fotoğraf ya da üç fotoğraflı çeldirici yok).</p>
        : <ResimSec key={soru.kart} soru={soru} lex={veri.lex} harita={veri.harita} onYok={() => setYok(true)}
          onBitti={(ok) => { setKayit((k) => [...k, `${soru.kart}:${ok ? 1 : 0}`]); setAdim(tekTur ? "son" : "esles"); }} />)}
      {adim === "esles" && <Eslestir kartlar={eslesKartlar} tohum="e2e" onBitti={(s) => { setKayit((k) => [...k, ...s.map((x) => `${x.kart}:${x.dogru ? 1 : 0}`)]); setAdim("son"); }} />}
      {adim === "son" && <p class="card small" data-test="deneme-sonuc">{kayit.join(" ")}</p>}
    </section>
  );
}
