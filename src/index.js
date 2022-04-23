import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AppProvider } from "./context"

// Šeit renderēta lapas root elements, kā arī appprovider, kas nodrošina funkcionalitāti
const root = createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
