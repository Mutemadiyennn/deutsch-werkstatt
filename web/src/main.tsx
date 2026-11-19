import { render } from "preact";
import "./styles.css";
import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);

// Uçak modu (DN-2 §5): servis işçisi bu klasörü ve içerik paketini çevrimdışı tutar
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "127.0.0.1" || location.hostname === "localhost")) {
  // Her derleme farklı adres → yeni işçi kurulur (D-096). Her açılışta "sync": eksik ya da silinmiş önbellek yeniden kurulur.
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`./sw.js?b=${__BUILD__}`, { scope: "./" })
      .then(() => navigator.serviceWorker.ready).then((r) => r.active?.postMessage("sync")).catch(() => {});
  });
}
