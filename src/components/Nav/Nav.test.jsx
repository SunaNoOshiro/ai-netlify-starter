import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import Nav from './Nav'

function renderNav() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <I18nProvider>
          <Nav />
        </I18nProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('Nav', () => {
  it('renders the site name as a link', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /project name/i })).toBeTruthy()
  })

  it('renders the home nav link', () => {
    renderNav()
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  })
})
