import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Ícones do FontAwesome // falta instalar


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)