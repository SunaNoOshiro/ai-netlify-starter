import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import ThemeSwitcher from './ThemeSwitcher'

const wrapper = ({ children }) => (
  <ThemeProvider><I18nProvider>{children}</I18nProvider></ThemeProvider>
)

describe('ThemeSwitcher', () => {
  it('renders a toggle button', () => {
    render(<ThemeSwitcher />, { wrapper })
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('changes label after click to indicate the new available mode', () => {
    render(<ThemeSwitcher />, { wrapper })
    const btn = screen.getByRole('button')
    const labelBefore = btn.getAttribute('aria-label')
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-label')).not.toBe(labelBefore)
  })
})
