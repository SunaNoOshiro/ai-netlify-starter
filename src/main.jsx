import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App          from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { I18nProvider } from './lib/i18n'
import { ThemeProvider } from './lib/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <I18nProvider>
            <App />
          </I18nProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
