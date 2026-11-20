/**
 * AKIS AK-7 durak oynatıcısı — AK-10 4. adımın İSKELETİ (PR'sız; hedef design/TARGET3b). Henüz yönlendirmeye bağlı DEĞİL.
 * Yapı: üstte X + elmas ilerleme (durağın adımları) + "Neden bu?"; ortada adım bileşeni; altta eylem çubuğu (bileşenin kendisi).
 * Bağlı türler: `resimden_sec`, `eslestir` (AK-10 3. adım). Öteki türler, Bahçe'nin `Question` bileşeni `ui/soru/`ya
 * alınınca (AK-7 1. satır) bağlanır; o zamana kadar yer tutucu.
 * Açık işler (4. adımın kabul listesine): genel adlar listesi içerik paketine (kumeDizini istemcide), `halkalar` gun-NN.json'da (İÇ),
 * `policy.akis.gunler` bayrağı ve Yol/Bugün bağlaması, kart kayıtları `srs.review` (source "drill", session "akis@…"),
 * halka sonu ekranı (TARGET3b 6), mini sahne (Ders `Diyalog`), seans halkası (K9).
 */
import { useMemo, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import type { FotoKayit } from "../services/content.ts";
import type { Adim } from "../core/akis.ts";
import { ilerle, simdiki, type AkisKaydi } from "../core/akisKayit.ts";
import { resimSecenekleri } from "../core/halkaTur.ts";
import { ResimSec } from "../ui/soru/ResimdenSec.tsx";
import { Eslestir } from "../ui/soru/Eslestir.tsx";
import { ActionBar } from "../ui/kit.tsx";
import { Icon } from "../ui/icons.tsx";

export interface AkisOynaticiProps {
  kayit: AkisKaydi;
  lex: ReadonlyMap<string, Lexeme>;
  harita: Readonly<Record<string, FotoKayit>>;
  /** kayıt değişti (çağıran `akis:<gün>`e yazar); `eski`: biten durağın eski ilerleme anahtarı (AK-6) */
  kaydet: (k: AkisKaydi, eski: string | null) => void;
  cik: () => void;
}

export function AkisOynatici({ kayit, lex, harita, kaydet, cik }: AkisOynaticiProps) {
  const [neden, setNeden] = useState(false);
  const s = simdiki(kayit);
  if (!s) return <section class="stack" data-test="akis-bitti"><p class="card">Bugünün durakları bitti.</p></section>;
  const bitir = (sonuc: { kart: string; dogru: boolean }[]) => { const r = ilerle(kayit, sonuc); setNeden(false); kaydet(r.kayit, r.yazilacak); };
  return (
    <section class="stack" data-test="akis" data-durak={s.durak.id} data-adim={s.adim.id} data-tur={s.adim.tur}>
      <header class="row" style={{ gap: 10, flexWrap: "nowrap", alignItems: "center" }}>
        <button class="iconbtn plain" aria-label="Çık" data-test="akis-cik" onClick={cik}><Icon name="x" /></button>
        <div class="grow row" style={{ gap: 4, flexWrap: "nowrap" }} role="progressbar" aria-valuemin={0} aria-valuemax={s.toplam} aria-valuenow={s.sira}>
          {Array.from({ length: s.toplam }, (_, i) => <i class={`akis-elmas${i < s.sira ? " dolu" : i === s.sira ? " simdi" : ""}`} />)}
        </div>
        <button class="ikincil-eylem tiny" data-test="akis-neden" aria-expanded={neden} onClick={() => setNeden((x) => !x)}>Neden bu?</button>
      </header>
      {neden && <p class="small muted" data-test="akis-neden-metin" style={{ margin: 0 }}>{s.adim.neden}</p>}
      <AdimGovdesi key={s.adim.id} adim={s.adim} lex={lex} harita={harita} tohum={`${kayit.plan.tohum}|${s.adim.id}`} bitir={bitir} />
    </section>
  );
}

function AdimGovdesi({ adim, lex, harita, tohum, bitir }: { adim: Adim; lex: ReadonlyMap<string, Lexeme>; harita: Readonly<Record<string, FotoKayit>>; tohum: string; bitir: (s: { kart: string; dogru: boolean }[]) => void }) {
  const kartlar = adim.kartlar.map((k) => lex.get(k)).filter((x): x is Lexeme => !!x);
  const soru = useMemo(() => (adim.tur === "resimden_sec" && kartlar[0] ? resimSecenekleri(kartlar[0], [...lex.values()], harita, tohum) : null), [adim.id]);
  if (adim.tur === "eslestir" && kartlar.length >= 4) return <Eslestir kartlar={kartlar} tohum={tohum} onBitti={bitir} />;
  if (adim.tur === "resimden_sec" && soru) return <ResimSec soru={soru} lex={lex} harita={harita} onBitti={(ok) => bitir([{ kart: soru.kart, dogru: ok }])} />;
  // İSKELET: öteki türler (tanit, kalip, listen_meaning, gap, order, tr_de, dikte, soyle, sahne, ders_madde, …) ui/soru/ ortaklaşınca
  return (
    <section class="card stack" data-test="akis-yer-tutucu">
      <div class="kicker icerik">{adim.tur}</div>
      {adim.cumle && <div class="de-lg" lang="de">{adim.cumle}</div>}
      <ActionBar><button class="btn primary" style={{ width: "100%" }} data-test="akis-devam" onClick={() => bitir(adim.kartlar.map((kart) => ({ kart, dogru: true })))}>Devam et</button></ActionBar>
    </section>
  );
}
