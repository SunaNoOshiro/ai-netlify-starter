import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import NotFound from './NotFound'

function renderNotFound() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <I18nProvider>
          <NotFound />
        </I18nProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('NotFound', () => {
  it('renders 404 code', () => {
    renderNotFound()
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('renders a link back to home', () => {
    renderNotFound()
    expect(screen.getByRole('link').getAttribute('href')).toBe('/')
  })
})
