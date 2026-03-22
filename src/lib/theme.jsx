import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'theme'
const MODES = ['light', 'dark', 'auto']

function getSystemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function getInitialMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {}
  return 'auto'
}

function resolveTheme(mode) {
  return mode === 'auto' ? getSystemTheme() : mode
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)
  const theme = resolveTheme(mode)

  // Apply theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Follow system changes when mode is auto
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      setMode(current => {
        if (current === 'auto') {
          // Force a re-render so resolveTheme picks up the new system value
          document.documentElement.setAttribute(
            'data-theme',
            e.matches ? 'dark' : 'light'
          )
        }
        return current
      })
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function toggleTheme() {
    setMode(current => {
      const next = MODES[(MODES.indexOf(current) + 1) % MODES.length]
      if (next === 'auto') {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, next)
      }
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
