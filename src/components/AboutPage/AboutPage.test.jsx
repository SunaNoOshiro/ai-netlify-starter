import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import AboutPage from './AboutPage'

const wrapper = ({ children }) => (
  <HelmetProvider>
    <ThemeProvider><I18nProvider>{children}</I18nProvider></ThemeProvider>
  </HelmetProvider>
)

describe('AboutPage', () => {
  it('renders the about heading', () => {
    render(<AboutPage />, { wrapper })
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })
})
