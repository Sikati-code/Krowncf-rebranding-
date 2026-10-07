import './lib/pwa'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './contexts/CartContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { UserProvider } from './contexts/UserContext'
import InstallPrompt from './components/InstallPrompt'
import { registerServiceWorker } from './lib/pwa'

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <UserProvider>
          <CartProvider>
            <App />
            <InstallPrompt />
            <Toaster
              theme="dark"
              position="top-center"
              closeButton
              toastOptions={{
                classNames: {
                  toast: '!bg-krown-card !border-white/10 !text-white !rounded-xl',
                  description: '!text-white/60',
                  actionButton: '!bg-gradient-to-r !from-krown-red !to-krown-orange !text-white !font-semibold',
                },
              }}
            />
          </CartProvider>
        </UserProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
