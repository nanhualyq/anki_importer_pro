import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/pico.min.css";
import App from "./App.tsx";

if (!window.pycmd) {
  window.pycmd = (...rest) =>
    console.warn("pycmd() should be called in Anki", ...rest);
}
Object.assign(window, {
  onPythonMessage: function (action: string, data: unknown) {
    if (action === "onNotesCreated" && Array.isArray(data)) {
      alert(`${data.filter(Boolean).length} / ${data.length}`);
    }
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
