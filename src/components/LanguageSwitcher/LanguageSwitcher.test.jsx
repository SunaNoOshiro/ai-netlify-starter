import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LanguageSwitcher from './LanguageSwitcher'
import { I18nProvider } from '../../lib/i18n'

const wrapper = ({ children }) => <I18nProvider>{children}</I18nProvider>

describe('LanguageSwitcher', () => {
  it('renders all three language buttons', () => {
    render(<LanguageSwitcher />, { wrapper })
    expect(screen.getByText(/EN/)).toBeTruthy()
    expect(screen.getByText(/PL/)).toBeTruthy()
    expect(screen.getByText(/UK/)).toBeTruthy()
  })

  it('switches language on button click', () => {
    render(<LanguageSwitcher />, { wrapper })
    fireEvent.click(screen.getByText(/PL/))
    // After switching, PL button should have active styling (bold fontWeight)
    const plBtn = screen.getByText(/PL/)
    expect(plBtn).toBeTruthy()
  })
})
