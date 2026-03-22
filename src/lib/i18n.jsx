import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en'
import pl from '../locales/pl'
import uk from '../locales/uk'

const LOCALES = { uk, en, pl }

export const LANGUAGES = [
  { code: 'uk', label: 'UK', flag: '🇺🇦' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
]

function getInitialLang() {
  const saved = localStorage.getItem('lang')
  if (saved && LOCALES[saved]) return saved
  const browser = navigator.language?.slice(0, 2)
  return LOCALES[browser] ? browser : 'uk'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function switchLang(code) {
    localStorage.setItem('lang', code)
    setLang(code)
  }

  return (
    <I18nContext.Provider value={{ lang, switchLang, t: LOCALES[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

// useTranslation() returns { t, lang, switchLang }
// t.keyName — translated string for current locale
export function useTranslation() {
  return useContext(I18nContext)
}
