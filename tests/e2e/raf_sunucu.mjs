// D-112 (#58 B12) e2e: GERÇEK raf Function'ı (worker/src/raf.ts) önünde küçük dosya sunucusu (inceleme #98 P2: CORS ve
// gecikme Python'da yeniden yazılmasın). Kullanım: node raf_sunucu.mjs <port> <anahtar> <izinli köken>; dosyalar bellekte.
import { createServer } from "node:http";
import { rafYanit } from "../../worker/src/raf.ts";

const [port, anahtar, koken] = process.argv.slice(2);
const dosyalar = { "/saglik.txt": ["text/plain", "ok\n"], "/foto/deneme.jpg": ["image/jpeg", "JPEG"] };
createServer(async (q, s) => {
  const url = `https://raf.test${q.url}`;
  const req = new Request(url, { method: q.method, headers: Object.entries(q.headers).flatMap(([k, v]) => (Array.isArray(v) ? v.map((x) => [k, x]) : v ? [[k, v]] : [])) });
  const yol = new URL(url).pathname;
  const r = await rafYanit(req, { MEDYA_ANAHTARI: anahtar, KOKENLER: koken }, async () => {
    const d = dosyalar[yol];
    return d ? new Response(d[1], { status: 200, headers: { "Content-Type": d[0] } }) : new Response("yok", { status: 404 });
  });
  s.writeHead(r.status, Object.fromEntries(r.headers));
  s.end(Buffer.from(await r.arrayBuffer()));
}).listen(Number(port), "127.0.0.1", () => console.log("hazir"));
