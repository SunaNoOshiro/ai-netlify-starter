import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactForm from './ContactForm'
import { I18nProvider } from '../../lib/i18n'

const wrapper = ({ children }) => <I18nProvider>{children}</I18nProvider>

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />, { wrapper })
    expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('shows preview warning in non-production env', () => {
    // test/setup.js sets __ENV__ = 'test', so isProduction = false
    render(<ContactForm />, { wrapper })
    expect(screen.getByText(/Preview mode/)).toBeTruthy()
  })
})
