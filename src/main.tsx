import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "modern-normalize/modern-normalize.css";
import "./index.css";
import App from "./components/App/App";

const queryClient = new QueryClient();
const container = document.getElementById("app");
if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
