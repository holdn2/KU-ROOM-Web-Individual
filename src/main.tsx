import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { EdgeGuard } from "./EdgeGuard.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EdgeGuard />
    <App />
  </StrictMode>
);
