import { render, screen, fireEvent } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import { CookieConsentProvider, useCookieConsent } from '../../lib/cookieConsent'

// Enable the banner for these tests
vi.mock('../../config', () => ({
  config: { cookieConsentEnabled: true, appName: 'Test' },
}))

function wrapper({ children }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>
          <CookieConsentProvider>{children}</CookieConsentProvider>
        </I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

function ConsentStatus() {
  const { consent, hasConsented } = useCookieConsent()
  return <span data-testid="status">{consent ?? 'null'} {String(hasConsented)}</span>
}

describe('CookieBanner', () => {
  beforeEach(() => localStorage.clear())

  it('shows the banner when consent not yet given', () => {
    render(<ConsentStatus />, { wrapper })
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('hides the banner after accepting', () => {
    render(<ConsentStatus />, { wrapper })
    fireEvent.click(screen.getByRole('button', { name: /accept/i }))
    expect(screen.queryByRole('dialog')).toBeFalsy()
    expect(screen.getByTestId('status').textContent).toContain('accepted true')
  })

  it('hides the banner after declining', () => {
    render(<ConsentStatus />, { wrapper })
    fireEvent.click(screen.getByRole('button', { name: /decline/i }))
    expect(screen.queryByRole('dialog')).toBeFalsy()
    expect(screen.getByTestId('status').textContent).toContain('declined false')
  })

  it('does not show the banner if consent was already saved', () => {
    localStorage.setItem('cookie-consent', 'accepted')
    render(<ConsentStatus />, { wrapper })
    expect(screen.queryByRole('dialog')).toBeFalsy()
  })

  it('persists choice to localStorage', () => {
    render(<ConsentStatus />, { wrapper })
    fireEvent.click(screen.getByRole('button', { name: /accept/i }))
    expect(localStorage.getItem('cookie-consent')).toBe('accepted')
  })
})
