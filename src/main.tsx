import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/michroma/400.css";
import "@fontsource-variable/inter";
import "./styles.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
