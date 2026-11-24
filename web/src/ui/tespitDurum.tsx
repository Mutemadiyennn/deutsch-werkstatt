/**
 * Seviye tespitinin ana pakette kalan küçük parçaları (ekranlar `screens/Seviye.tsx` ayrı parçada yüklenir):
 * Bugün'deki davet kartı, Ben satırı için durum ve Ayarlar'ın dibindeki sessiz "başlangıç noktasını elle değiştir".
 */
import { useEffect, useState } from "preact/hooks";
import { useApp } from "../state.ts";
import { a2Var, etkinBaslangic, SEVIYE } from "../core/seviye.ts";
import { haftaOf } from "../core/gun.ts";
import { baslangicOku } from "../services/seviye.ts";
import { elleUygula, tespitBekliyor, tespitOku, type TespitKayit } from "../services/tespit.ts";

const a2Hafta = haftaOf(SEVIYE.a2_ilk_gun);
/* ---------- Ayarlar: başlangıç noktasını elle değiştir (sessiz) ---------- */
export const baslangicAdi = (gun: number) => (gun <= 1 ? "Baştan (A1)" : gun >= SEVIYE.a2_ilk_gun ? `A2'den (${a2Hafta}. hafta)` : `A1'in ${haftaOf(gun)}. haftasından`);
export function ElleBaslangic() {
  const { index, toast } = useApp();
  const [acik, setAcik] = useState(false);
  const [bas, setBas] = useState<number | null>(null);
  const [mesgul, setMesgul] = useState(false);
  const [bekliyor, setBekliyor] = useState(false);
  useEffect(() => { if (!acik) return; void baslangicOku().then(setBas).catch(() => setBas(1)); void tespitBekliyor().then(setBekliyor).catch(() => setBekliyor(false)); }, [acik]);
  if (!index) return null;
  const days = index.m1.map((g) => g.day);
  const etkin = bas === null ? null : etkinBaslangic(days, bas);
  const a2 = a2Var(days);
  const uygula = async (g: number) => {
    if (mesgul) return; setMesgul(true);
    try { const b = await elleUygula(g, index); setBas(b); setBekliyor(false); toast(b <= 1 ? "1. günden başlıyorsun" : `${haftaOf(b)}. haftadan başlıyorsun`); }
    catch { toast("Kaydedilemedi; tekrar dene."); }
    setMesgul(false);
  };
  if (!acik) return <div class="tespit-orta"><button class="ikincil-eylem small" data-test="elle-baslangic" onClick={() => setAcik(true)}>Başlangıç noktasını elle değiştir</button></div>;
  return (
    <section class="card stack" data-test="elle-baslangic-kart" style={{ gap: 8 }}>
      <h3 style={{ margin: 0 }}>Başlangıç noktası</h3>
      {etkin !== null && <p class="small muted" data-test="baslangic-simdi" style={{ margin: 0 }}>Şu an: <b>{baslangicAdi(etkin)}</b></p>}
      <p class="small" style={{ margin: 0 }}>Önerimiz seviye tespiti. Burada seçersen test yapmadan oradan başlarsın. Bitirdiğin günler ve kelimelerin kalır.</p>
      <div class="row" style={{ gap: 8 }}>
        <button class="btn sm" data-test="elle-a1" disabled={mesgul || (etkin === 1 && !bekliyor)} onClick={() => void uygula(1)}>Baştan (A1)</button>
        <button class="btn sm" data-test="elle-a2" disabled={mesgul || !a2 || etkin === SEVIYE.a2_ilk_gun} onClick={() => void uygula(SEVIYE.a2_ilk_gun)}>A2'den ({a2Hafta}. hafta)</button>
      </div>
      {!a2 && <p class="tiny muted" style={{ margin: 0 }}>A2'nin günleri hazırlanıyor.</p>}
    </section>
  );
}

/** Bugün ve Ben için: tespitin durumu (paket yoksa null) */
export function useTespitDurumu(): { durum: "yok" | "baslamadi" | "yarida" | "bitti"; kayit: TespitKayit } | null {
  const { index } = useApp();
  const [d, setD] = useState<ReturnType<typeof useTespitDurumu>>(null);
  useEffect(() => {
    if (!index) return;
    if (!index.files.tespit) { setD(null); return; }
    void tespitOku().then((k) => setD({ durum: k.rapor ? "bitti" : Object.keys(k.cevaplar).length ? "yarida" : "baslamadi", kayit: k })).catch(() => setD(null));
  }, [index?.version]);
  return d;
}

/** Bugün'de davet / sürdürme kartı: tespit bitmemiş ve karar uygulanmamışsa (paket yoksa görünmez) */
export function TespitDavet({ d: dis }: { d?: ReturnType<typeof useTespitDurumu> } = {}) {
  const ic = useTespitDurumu();
  const d = dis === undefined ? ic : dis;
  if (!d || d.durum === "bitti" || d.kayit.uygulandi) return null;
  const yarida = d.durum === "yarida";
  return (
    <section class="card stack tespit-davet" data-test="tespit-davet" style={{ gap: 6 }}>
      <div class="row between" style={{ flexWrap: "nowrap", gap: 12 }}>
        <span class="grow"><b>{yarida ? "Seviye tespitin yarıda" : "Önce seviyeni görelim"}</b><span class="small muted" style={{ display: "block" }}>{yarida ? "Kaldığın yerden sürer." : "Bildiğini tekrar ettirmeyelim; eksik varsa tam yerini bulalım."}</span></span>
        <a class={`btn sm${d.kayit.kurulum ? " primary" : ""}`} href="#/seviye" data-test="tespit-davet-git">{yarida ? "Sürdür" : "Başla"}</a>
      </div>
    </section>
  );
}

/** Kurulumdan gelen ve henüz karar vermemiş öğrenci (gün kilidi; Bugün'de yol yerine tespit kartı) */
export const tespitBekliyorMu = (d: ReturnType<typeof useTespitDurumu>) => !!d && !!d.kayit.kurulum && !d.kayit.uygulandi && d.durum !== "bitti";
