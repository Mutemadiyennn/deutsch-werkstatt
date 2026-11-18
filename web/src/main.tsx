import { render } from "preact";
import "./styles.css";
import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);

// Uçak modu (DN-2 §5): servis işçisi bu klasörü ve içerik paketini çevrimdışı tutar
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "127.0.0.1" || location.hostname === "localhost")) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {}); });
}
