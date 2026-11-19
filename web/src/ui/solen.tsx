/**
 * Şölen 1 (#58 B10, PM-059): XP uçuşu, XP ve seri göstergesi, kutlama (CSS konfeti), dolan ilerleme çubuğu.
 * Özgün çizimler (mücevher, filiz); başka uygulamanın maskotu/simgesi yok. Hareket azaltma açıksa animasyon yok,
 * içerik ve renk aynı. Hiçbir animasyon düğmeyi kilitlemez ("Devam" hemen basılabilir).
 */
import { useEffect, useRef, useState } from "preact/hooks";
import { efekt, hareketAzalt, kutlamaAcik } from "../services/efekt.ts";
import { seri, yerelGun, type XpKayit } from "../core/gun.ts";

/** Hafta günlerinin iki harfli kısaltması (Pazar–Pazartesi, Cuma–Cumartesi karışmaz; inceleme #87 P2) */
const GUN_KISA = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];

/**
 * Günlük XP hedefi (gösterge için; ilerleme kaydı değil). Bilerek küçük: kısa bir oturum da günü "tamam" sayar (alışkanlık
 * hedefi); bir ders tek başına aşar. Aşılınca sayı oranı yerine "Günlük hedef tamam" yazılır.
 */
export const GUNLUK_XP_HEDEF = 50;

/** "+N XP" cevap anında uçar: `dw:xp-ucus` olayını dinler (FeedbackBand doğru cevapta gönderir; kayıt "Devam"da — inceleme #87 P1-2) */
export function XpUcus() {
  const [uc, setUc] = useState<{ id: number; n: number }[]>([]);
  useEffect(() => {
    let k = 0;
    const f = (e: Event) => {
      const n = (e as CustomEvent<{ n: number }>).detail?.n ?? 0;
      if (!n) return;
      const id = ++k;
      setUc((u) => [...u.slice(-2), { id, n }]);
      setTimeout(() => setUc((u) => u.filter((x) => x.id !== id)), 1000);
    };
    window.addEventListener("dw:xp-ucus", f);
    return () => window.removeEventListener("dw:xp-ucus", f);
  }, []);
  return <div class="xp-ucus-kap" aria-hidden="true">{uc.map((x) => <span class="xp-ucus" key={x.id} data-test="xp-ucus"><Mucevher boy={16} />+{x.n} XP</span>)}</div>;
}

/** Özgün mücevher simgesi (çokgen kesim, iki ton) */
export function Mucevher({ boy = 20 }: { boy?: number }) {
  return (
    <svg width={boy} height={boy} viewBox="0 0 24 24" aria-hidden="true" class="mucevher">
      <path d="M6 3h12l4 6-10 12L2 9z" fill="var(--gem-a)" />
      <path d="M2 9h20L12 21z" fill="var(--gem-b)" />
      <path d="M6 3l3 6h6l3-6M9 9l3 12 3-12" fill="none" stroke="var(--gem-c)" stroke-width="1.2" stroke-linejoin="round" />
    </svg>
  );
}

/** Seri filizi: gün arttıkça sap uzar ve yaprak çoğalır (1–7); 7. günde çiçek. Seri yoksa soluk tohum. */
export function Filiz({ gun, boy = 28 }: { gun: number; boy?: number }) {
  const y = Math.max(0, Math.min(7, gun));
  const ust = 22 - y * 2;                       // sapın tepesi (gün arttıkça yükselir)
  const yapraklar = Array.from({ length: Math.max(1, Math.ceil(y / 2)) }, (_, i) => 26 - i * 4);
  return (
    <svg width={boy} height={boy} viewBox="0 0 32 32" aria-hidden="true" class={`filiz${gun > 0 ? " canli" : ""}`}>
      <ellipse cx="16" cy="29.5" rx="8" ry="2" fill="var(--line)" />
      {y === 0 ? <ellipse cx="16" cy="27" rx="3" ry="2.2" fill="var(--line)" /> : <>
        <path d={`M16 29V${ust}`} stroke="var(--filiz-sap)" stroke-width="2.2" stroke-linecap="round" />
        {yapraklar.map((yy, i) => <path d={i % 2 === 0 ? `M16 ${yy}c-1-4-5-6-9-6 0 4 4 7 9 6z` : `M16 ${yy}c1-4 5-6 9-6 0 4-4 7-9 6z`} fill="var(--filiz-yaprak)" />)}
        <path d={`M16 ${ust + 1}c-1-3-4-5-7-5 0 3 3 6 7 5zM16 ${ust + 1}c1-3 4-5 7-5 0 3-3 6-7 5z`} fill="var(--filiz-yaprak)" />
        {y >= 7 && <><circle cx="16" cy={ust - 2} r="3.4" fill="var(--brezel)" /><circle cx="16" cy={ust - 2} r="1.4" fill="#fff" /></>}
      </>}
    </svg>
  );
}

/** Son gösterilen XP toplamı: Bugün her açılışta 0'dan saymaz, önceki değerden sayar (ilk açılışta doğrudan değer; inceleme #87 P2) */
let sonGosterilen: number | null = null;
/** Sayarak artan sayı (hareket azaltmada doğrudan son değer) */
function useSayac(hedef: number, ms = 700) {
  const [v, setV] = useState(hareketAzalt() || sonGosterilen === null ? hedef : sonGosterilen);
  const once = useRef(sonGosterilen ?? hedef);
  sonGosterilen = hedef;
  useEffect(() => {
    if (hareketAzalt()) { setV(hedef); return; }
    const bas = once.current, t0 = performance.now();
    let r = 0;
    const adim = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(Math.round(bas + (hedef - bas) * (1 - Math.pow(1 - p, 3)))); if (p < 1) r = requestAnimationFrame(adim); else once.current = hedef; };
    r = requestAnimationFrame(adim);
    return () => cancelAnimationFrame(r);
  }, [hedef]);
  return v;
}

/** Bugün: XP (mücevher + sayaç + günlük hedef çubuğu) ve seri (filiz + 7 günlük noktalar) */
export function XpSeri({ xp, href = "#/yol" }: { xp: XpKayit; href?: string }) {
  const bugun = xp.gunler[yerelGun(new Date())] ?? 0;
  const s = seri(xp);
  // hedef aşılınca "176 / 50" yazılmaz (RQ-Ş24, inceleme #87 P1-3)
  const tamam = bugun >= GUNLUK_XP_HEDEF;
  const hedefYazi = tamam ? `Günlük hedef tamam · bugün ${bugun} XP` : `Bugün ${bugun} / ${GUNLUK_XP_HEDEF} XP`;
  const toplam = useSayac(xp.toplam);
  const gunler = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return { k: yerelGun(d), v: (xp.gunler[yerelGun(d)] ?? 0) > 0, bugun: i === 6, ad: GUN_KISA[d.getDay()]! }; });
  return (
    <a class="xpseri" href={href} data-test="xp-seri" aria-label={`Toplam ${xp.toplam} XP, bugün ${bugun} XP, ${s} gün üst üste. Haftanın yolu`}>
      <div class="xp-sol">
        <div class="row" style={{ gap: 6, flexWrap: "nowrap" }}><Mucevher boy={22} /><b class="xp-sayi" data-test="xp-toplam">{toplam}</b><span class="small muted">XP</span></div>
        <div class="hedef-cubuk" role="img" aria-label={hedefYazi}><i style={{ width: `${Math.min(100, (bugun / GUNLUK_XP_HEDEF) * 100)}%` }} /></div>
        <div class={`tiny ${tamam ? "goalhit" : "muted"}`} data-test="gunluk-hedef">{hedefYazi}</div>
      </div>
      <div class="xp-sag">
        <div class="row" style={{ gap: 4, flexWrap: "nowrap", justifyContent: "flex-end" }}><Filiz gun={s} /><b data-test="seri-gun">{s}</b><span class="small muted">gün</span></div>
        <div class="gun-noktalari" data-test="gun-noktalari">{gunler.map((g) => <span class={`nokta${g.v ? " dolu" : ""}${g.bugun ? " bugun" : ""}`} title={g.k}><i />{g.ad}</span>)}</div>
      </div>
    </a>
  );
}

/** Tur/ders/gün sonu kutlaması: CSS konfeti (1–2 sn) + arpej; Profil'de kutlamalar kapalıysa yalnızca özet */
export function Kutlama({ children }: { children?: preact.ComponentChildren }) {
  const [konfeti] = useState(() => kutlamaAcik() && !hareketAzalt());
  useEffect(() => { efekt("kutlama"); }, []);
  const renk = ["var(--wiese)", "var(--himmel)", "var(--brezel)", "var(--mercan)", "var(--gem-a)"];
  return (
    <div class="kutlama" data-test="kutlama">
      {konfeti && <div class="konfeti" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i style={{ "--x": `${(i * 37) % 100}%`, "--r": `${(i * 53) % 360}deg`, "--g": `${(i % 7) * 60}ms`, background: renk[i % renk.length] } as Record<string, string>} />)}</div>}
      {children}
    </div>
  );
}

/** Özet satırı: doğru, XP, seri, öğrenilen kelimeler (çip), yarın */
/** `xp` yoksa (tekrar çalışma: XP verilmez) XP kutusu gösterilmez */
export function Ozet({ dogru, toplam, xp, seriGun, kelimeler = [], yarin }: { dogru: number; toplam: number; xp?: number; seriGun?: number; kelimeler?: string[]; yarin?: string }) {
  return (
    <div class="stack ozet" data-test="ozet">
      <div class="ozet-kutular">
        <div class="ozet-kutu"><b>{dogru}/{toplam}</b><span class="tiny muted">doğru</span></div>
        {xp !== undefined && <div class="ozet-kutu xp"><b data-test="ozet-xp"><Mucevher boy={16} /> +{xp}</b><span class="tiny muted">XP</span></div>}
        {seriGun !== undefined && <div class="ozet-kutu seri"><b><Filiz gun={seriGun} boy={18} /> {seriGun}</b><span class="tiny muted">gün üst üste</span></div>}
      </div>
      {kelimeler.length > 0 && <div><div class="tiny muted">Bugün öğrendiğin kelimeler</div><div class="row" style={{ gap: 6 }} data-test="ozet-kelimeler">{kelimeler.map((k) => <span class="cip" lang="de">{k}</span>)}</div></div>}
      {yarin && <p class="small muted" data-test="ozet-yarin">Yarın: {yarin}</p>}
    </div>
  );
}

/** Bu ekranda (bağlandığından beri) kazanılan XP: `dw:xp` olaylarının toplamı */
export function useOturumXp() {
  const [n, setN] = useState(0);
  useEffect(() => { const f = (e: Event) => setN((x) => x + ((e as CustomEvent<{ n: number }>).detail?.n ?? 0)); window.addEventListener("dw:xp", f); return () => window.removeEventListener("dw:xp", f); }, []);
  return n;
}
