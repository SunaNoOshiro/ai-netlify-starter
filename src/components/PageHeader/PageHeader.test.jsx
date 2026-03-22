import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageHeader from './PageHeader'
import { I18nProvider } from '../../lib/i18n'
import { ThemeProvider } from '../../lib/theme'

const wrapper = ({ children }) => (
  <ThemeProvider><I18nProvider>{children}</I18nProvider></ThemeProvider>
)

describe('PageHeader', () => {
  it('renders project name from locale', () => {
    render(<PageHeader />, { wrapper })
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })

  it('renders the logo image', () => {
    render(<PageHeader />, { wrapper })
    expect(screen.getByAltText('logo')).toBeTruthy()
  })

  it('renders the project description', () => {
    render(<PageHeader />, { wrapper })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBeTruthy()
  })
})
