import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <AppRoutes />
        <Toaster />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>,
)
