/**
 * #58 B3 gün sonu özeti (Bugün ekranında): bugün kurduğun cümle (dinlenebilir), yeni anladığın kelimeler (çip), biten
 * adım sayısı. Gün bu oturumda bittiyse bir kez kutlama (aynı gün yeniden açılınca konfeti yok). Veriler cihazda.
 */
import { useEffect, useState } from "preact/hooks";
import type { Plan } from "../screens/Yol.tsx";
import { getMeta, metaPrefix, setMeta, tanitilanlar } from "../data/db.ts";
import { loadLexicon } from "../services/content.ts";
import { kullanimGunleri, kullanimOku } from "../services/kullanim.ts";
import { adimEtiketi, bugunBitenGun, gununCumlesi, type KullanimOzet } from "../core/kullanim.ts";
import { yerelGun } from "../core/gun.ts";
import { ListenButton } from "./kit.tsx";
import { Kutlama } from "./solen.tsx";

const KELIME_SINIR = 12;

export function GunSonu({ plan }: { plan: Plan | null }) {
  const [oz, setOz] = useState<KullanimOzet | null>(null);
  const [kelimeler, setKelimeler] = useState<string[]>([]);
  const [kutla, setKutla] = useState(false);
  const bugun = yerelGun(new Date());
  useEffect(() => {
    let iptal = false;
    (async () => {
      const o = await kullanimOku();
      if (iptal) return;
      setOz(o);
      if (!o.bitenler.length) return;
      const gece = new Date(); gece.setHours(0, 0, 0, 0);
      const yeni = await tanitilanlar(gece.toISOString());
      if (yeni.length) {
        const { lexemes } = await loadLexicon();
        const m = new Map(lexemes.map((l) => [l.id, l]));
        if (!iptal) setKelimeler(yeni.map((it) => m.get(it.itemId)).filter(Boolean).map((l) => (l!.art ? `${l!.art} ${l!.de}` : l!.de)));
      }
    })().catch(() => { /* özet isteğe bağlı: hata ekranı göstermez */ });
    return () => { iptal = true; };
  }, [bugun]);
  const [bitisler, setBitisler] = useState<Record<number, string | undefined> | null>(null);
  useEffect(() => { void metaPrefix<string>("m1:gun:").then((x) => setBitisler(Object.fromEntries(x.map((k) => [Number(k.key.slice(7)), k.value])))); }, [plan]);
  const gun = oz && bitisler && oz.bitenler.length ? bugunBitenGun(plan?.gunler ?? [], bitisler, bugun) : null;
  // kutlama bir kez: gün bittiğinde ilk görüşte (aynı gün yeniden açılınca yok)
  useEffect(() => {
    if (!gun) return;
    void getMeta(`gunsonu:kutlandi:${gun}`).then((v) => { if (!v) { setKutla(true); void setMeta(`gunsonu:kutlandi:${gun}`, new Date().toISOString()); } });
  }, [gun]);
  if (!oz || !oz.bitenler.length) return null;
  const cumle = gununCumlesi(oz);
  const baslik = <h2 data-test="gun-sonu-baslik">{gun ? `${gun}. gün bitti` : "Bugünün özeti"}</h2>;
  return (
    <section class="card stack" data-test="gun-sonu">
      {kutla ? <Kutlama>{baslik}</Kutlama> : baslik}
      <p class="small muted">Bugün {oz.bitenler.length} adım bitirdin.</p>
      {cumle && <div data-test="gun-sonu-cumle"><div class="tiny muted">Bugün kendi kurduğun cümle</div>
        <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}><p class="de grow" lang="de">„{cumle.metin}“</p><ListenButton text={cumle.metin} small /></div></div>}
      {kelimeler.length > 0 && <div data-test="gun-sonu-kelimeler"><div class="tiny muted">Bugün yeni anladığın kelimeler</div>
        <div class="row" style={{ gap: 6 }}>{kelimeler.slice(0, KELIME_SINIR).map((k) => <span class="cip" lang="de">{k}</span>)}
          {kelimeler.length > KELIME_SINIR && <span class="cip">+{kelimeler.length - KELIME_SINIR}</span>}</div></div>}
    </section>
  );
}

/**
 * Profil: son 7 günün yerel kullanım ölçümü (açılış, biten adım, bırakılan adım ve noktası). Yalnızca bu cihazda; hiçbir
 * yere gönderilmez (#58 B3).
 */
export function KullanimTablosu({ basliklar = {} }: { basliklar?: Record<string, string> }) {
  const [gunler, setGunler] = useState<KullanimOzet[] | null>(null);
  useEffect(() => { void kullanimGunleri(7).then(setGunler).catch(() => setGunler([])); }, []);
  if (!gunler) return null;
  const dolu = gunler.filter((g) => g.acilis || g.bitenler.length || g.birakilanlar.length);
  return (
    <div class="stack" data-test="kullanim" style={{ gap: 8 }}>
      <p class="small muted">Yalnızca bu cihazda tutulur, hiçbir yere gönderilmez; 30 günden eskisi silinir.</p>
      {!dolu.length ? <p class="small">Son 7 günde kayıt yok.</p> : dolu.map((g) => (
        <div class="kullanim-gun" data-test="kullanim-gun">
          <b class="small">{gunAdi(g.gun)}</b>
          <span class="small"> · {g.acilis} açılış · {g.bitenler.length} adım bitti</span>
          {g.birakilanlar.map((b) => <div class="small muted" data-test="birakilan">Yarıda: {adimEtiketi(b.adim, basliklar)}{b.nokta ? ` (${b.nokta})` : ""}</div>)}
        </div>
      ))}
    </div>
  );
}
const gunAdi = (gun: string) => { const [y, m, d] = gun.split("-").map(Number); return new Date(y!, m! - 1, d!).toLocaleDateString("tr", { weekday: "long", day: "numeric", month: "long" }); };
