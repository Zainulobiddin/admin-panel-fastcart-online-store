import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StyledEngineProvider } from "@mui/material";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider>
      <App />
      <Toaster richColors position="bottom-right" />
    </StyledEngineProvider>
  </StrictMode>
);
