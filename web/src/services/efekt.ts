/**
 * Şölen 1 (#58 B10, PM-059): efekt sesleri ve "üst üste doğru" sayacı.
 * Sesler WebAudio ile üretilir (dosya yok, bağımlılık yok); Profil "Efekt sesleri" (ui.sfx) kapalıysa çalmaz.
 * Kutlama görselleri ui.celebrations ile kapanır. e2e için çalınan efektler `window.__efekt` dizisine yazılır.
 */
export type Efekt = "dogru" | "yanlis" | "kutlama";

let ses = true;
let kutlama = true;
let ac: AudioContext | null = null;
let ustUste = 0;

export function efektAyar(ui: { sfx: boolean; celebrations: boolean }) { ses = ui.sfx; kutlama = ui.celebrations; }
export const kutlamaAcik = () => kutlama;
export const hareketAzalt = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Doğru cevapta artar, yanlışta sıfırlanır; değeri döner */
export function ustUsteSay(dogru: boolean): number { ustUste = dogru ? ustUste + 1 : 0; return ustUste; }
/** Ekran değişince sayaç sıfırlanır: dersteki seri Bahçe'ye taşınmaz (inceleme #87 P2) */
export function ustUsteSifirla() { ustUste = 0; }

/** Cevap anında "+N XP" uçuşu: kayıt "Devam"da yazılır, uçuş cevapla birlikte görünür (inceleme #87 P1-2) */
export function xpUcur(n: number) {
  if (!n) return;
  try { window.dispatchEvent(new CustomEvent("dw:xp-ucus", { detail: { n } })); } catch { /* sunucu tarafı/test */ }
}

function baglam(): AudioContext | null {
  const AC = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ac ??= new AC();
  return ac;
}

/**
 * iOS ses kilidi: AudioContext ancak bir dokunuşun içinde oluşturulup sürdürülürse ses çıkar. İlk dokunuşta bir kez
 * boş bir tampon çalınır (inceleme #87 P2). app.tsx bunu `pointerdown`/`touchend`'e bağlar.
 */
export function sesKilidiAc() {
  if (!ses || ac?.state === "running") return;
  try {
    const c = baglam(); if (!c) return;
    if (c.state === "suspended") void c.resume();
    const b = c.createBuffer(1, 1, 22050), s = c.createBufferSource();
    s.buffer = b; s.connect(c.destination); s.start(0);
  } catch { /* ses yoksa sessiz devam */ }
}

const NOTALAR: Record<Efekt, { f: number; t: number; d: number; tip: OscillatorType; g: number }[]> = {
  // kısa yükselen iki nota (mi–la), parlak ama yumuşak
  dogru: [{ f: 659.25, t: 0, d: 0.12, tip: "triangle", g: 0.18 }, { f: 880, t: 0.09, d: 0.22, tip: "triangle", g: 0.2 }],
  // alçak, sakin, azarlamayan iki nota (la–fa)
  yanlis: [{ f: 220, t: 0, d: 0.16, tip: "sine", g: 0.12 }, { f: 174.6, t: 0.12, d: 0.24, tip: "sine", g: 0.1 }],
  // do–mi–sol–do arpej
  kutlama: [523.25, 659.25, 783.99, 1046.5].map((f, i) => ({ f, t: i * 0.09, d: 0.3, tip: "triangle" as OscillatorType, g: 0.16 }))
};

export function efekt(e: Efekt) {
  try { ((window as unknown as { __efekt?: string[] }).__efekt ??= []).push(`${e}:${ses ? "ses" : "sessiz"}`); } catch { /* yok say */ }
  if (!ses) return;
  try {
    const ac = baglam(); if (!ac) return;
    if (ac.state === "suspended") void ac.resume();
    const t0 = ac.currentTime + 0.01;
    for (const n of NOTALAR[e]) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = n.tip; o.frequency.value = n.f;
      g.gain.setValueAtTime(0.0001, t0 + n.t);
      g.gain.exponentialRampToValueAtTime(n.g, t0 + n.t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + n.t + n.d);
      o.connect(g).connect(ac.destination); o.start(t0 + n.t); o.stop(t0 + n.t + n.d + 0.02);
    }
  } catch { /* ses yoksa sessiz devam */ }
}
