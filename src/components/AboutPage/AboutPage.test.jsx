import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import AboutPage from './AboutPage'

const wrapper = ({ children }) => (
  <ThemeProvider><I18nProvider>{children}</I18nProvider></ThemeProvider>
)

describe('AboutPage', () => {
  it('renders the about heading', () => {
    render(<AboutPage />, { wrapper })
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })
})
