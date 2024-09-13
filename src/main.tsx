import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SearchProvider } from './context/SearchContext.tsx'
import { CartProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </SearchProvider>
  </StrictMode>
)