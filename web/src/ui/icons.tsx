/**
 * Tek çizgi ikon seti (DESIGN.md §5: emoji ikon yok). 24×24, 2 px çizgi, yuvarlak uç.
 * Bir kısmı Lucide (https://lucide.dev, ISC lisansı, © Lucide Contributors) yollarından uyarlanmıştır;
 * Raute, şehir ve sahne çizimleri projeye özgüdür.
 */
const P: Record<string, string> = {
  volume: "M11 5 6 9H2v6h4l5 4z|M15.5 8.5a5 5 0 0 1 0 7|M19 5a10 10 0 0 1 0 14",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z|M19 11a7 7 0 0 1-14 0|M12 18v3",
  pause: "M7 5h3v14H7z|M14 5h3v14h-3z",
  stop: "M7 7h10v10H7z",
  back: "M15 18l-6-6 6-6",
  next: "M9 18l6-6-6-6",
  check: "M5 12.5l4.5 4.5L19 7",
  x: "M6 6l12 12|M18 6 6 18",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  raute: "M12 2.5 21.5 12 12 21.5 2.5 12z",
  list: "M4 6h16|M4 12h11|M4 18h7",
  city: "M3 21h18|M5 21V11l4-3v13|M9 21V6l5-3v18|M14 21v-9h5v9",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M4 21a8 8 0 0 1 16 0",
  chart: "M4 20V10|M10 20V4|M16 20v-7|M22 20H2",
  out: "M7 17 17 7|M8 7h9v9",
  headphones: "M3 18v-6a9 9 0 0 1 18 0v6|M21 19a2 2 0 0 1-2 2h-1v-6h3z|M3 19a2 2 0 0 0 2 2h1v-6H3z",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z|M12 7v5l3 2",
  cup: "M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z|M17 9h1.5a2.5 2.5 0 0 1 0 5H17|M8 2.5v2.5|M12 2.5v2.5",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z|M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z|M12 12h.01",
  up: "M18 15l-6-6-6 6",
  down: "M6 9l6 6 6-6",
  keyboard: "M3 6h18v12H3z|M7 10h.01|M11 10h.01|M15 10h.01|M8 14h8",
  // Hedef 3 sekme simgeleri (design/TARGET3.html; projeye özgü çizim)
  harita: "M9 4l6 2 5-2v14l-5 2-6-2-5 2V6z|M9 4v14M15 6v14",
  ayar: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z|M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1",
  saat: "M12 3a9 9 0 1 0 9 9|M12 7v5l3 2",
  yol: "M5 20c4-1 2-7 7-8s4-6 7-8|M3.5 20a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0|M17.5 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0",
  koy: "M3 21h18|M5 21V10l7-5 7 5v11|M10 21v-6h4v6",
  ben: "M8 8a4 4 0 1 0 8 0 4 4 0 1 0-8 0|M4 21c1-4 4-6 8-6s7 2 8 6",
  // Köy'ün mekân simgeleri (design/TARGET3.html)
  tel: "M9 2h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z|M11 18h2",
  filiz: "M12 22V12|M12 12c0-4 3-7 7-7 0 4-3 7-7 7z|M12 14c0-3-2-5-6-5 0 3 2 5 6 5z",
  film: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z|M10 9l5 3-5 3z",
  radyo: "M7 14a5 5 0 1 0 10 0 5 5 0 1 0-10 0|M5 7l14-4|M12 14h.01",
  kalem: "M14 6l4 4-9 9H5v-4z",
  kitap: "M4 5h7v14H4z|M13 5h7v14h-7z",
  pazar: "M4 21V9l8-5 8 5v12|M9 13h6|M9 17h6",
  kafe: "M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z|M17 11h2a2 2 0 0 1 0 4h-2",
  sahne: "M4 4h16v6H4z|M6 10v10|M18 10v10|M4 20h16",
  gazete: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z|M7 8h10|M7 12h10|M7 16h6"
};
export type IconName = keyof typeof P | "play";

export function Icon({ name, size = 22, stroke = 2, label }: { name: IconName; size?: number; stroke?: number; label?: string }) {
  const a: Record<string, string> = label ? { role: "img", "aria-label": label } : { "aria-hidden": "true" };
  if (name === "play") return <svg class="ico" width={size} height={size} viewBox="0 0 24 24" {...a}><path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /></svg>;
  return (
    <svg class="ico" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" {...a}>
      {P[name]!.split("|").map((d) => <path d={d} />)}
    </svg>
  );
}
