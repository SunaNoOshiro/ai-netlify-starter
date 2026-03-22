import { createContext, useContext, useState } from 'react'
import { config } from '../config'
import CookieBanner from '../components/CookieBanner'

const STORAGE_KEY = 'cookie-consent'

const CookieConsentContext = createContext(null)

function getInitialConsent() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'accepted' || saved === 'declined' ? saved : null
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(getInitialConsent)

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  const showBanner = config.cookieConsentEnabled && consent === null

  return (
    <CookieConsentContext.Provider value={{ consent, accept, decline, hasConsented: consent === 'accepted' }}>
      {children}
      {showBanner && <CookieBanner onAccept={accept} onDecline={decline} />}
    </CookieConsentContext.Provider>
  )
}

// useCookieConsent() returns { consent, accept, decline, hasConsented }
// consent: 'accepted' | 'declined' | null
// hasConsented: true only when explicitly accepted — gate analytics/tracking behind this
export function useCookieConsent() {
  return useContext(CookieConsentContext)
}
