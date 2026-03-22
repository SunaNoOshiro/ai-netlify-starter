import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageHeader from './PageHeader'
import { I18nProvider } from '../../lib/i18n'

const wrapper = ({ children }) => <I18nProvider>{children}</I18nProvider>

describe('PageHeader', () => {
  it('renders project name from locale', () => {
    render(<PageHeader />, { wrapper })
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })

  it('renders the logo image', () => {
    render(<PageHeader />, { wrapper })
    expect(screen.getByAltText('logo')).toBeTruthy()
  })

  it('renders the language switcher', () => {
    render(<PageHeader />, { wrapper })
    expect(screen.getByText(/EN/)).toBeTruthy()
  })
})
