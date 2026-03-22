import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import Footer from './Footer'

function renderFooter() {
  return render(
    <ThemeProvider>
      <I18nProvider>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  )
}

describe('Footer', () => {
  it('renders a footer element', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeTruthy()
  })

  it('renders the current year in copyright', () => {
    renderFooter()
    expect(screen.getByText(new RegExp(new Date().getFullYear()))).toBeTruthy()
  })
})
