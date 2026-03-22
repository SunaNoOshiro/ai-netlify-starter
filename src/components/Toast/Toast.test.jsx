import { render, screen, act, fireEvent } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import { ToastProvider, useToast } from '../../lib/toast'

function wrapper({ children }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider>{children}</ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

function Trigger({ type = 'success', message = 'Hello' }) {
  const { toast } = useToast()
  return <button onClick={() => toast[type](message)}>show</button>
}

describe('Toast', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('shows a success toast when triggered', () => {
    render(<Trigger type="success" message="Saved!" />, { wrapper })
    fireEvent.click(screen.getByText('show'))
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(screen.getByText('Saved!')).toBeTruthy()
  })

  it('shows an error toast', () => {
    render(<Trigger type="error" message="Something went wrong" />, { wrapper })
    fireEvent.click(screen.getByText('show'))
    expect(screen.getByText('Something went wrong')).toBeTruthy()
  })

  it('dismisses on close button click', () => {
    render(<Trigger message="Bye" />, { wrapper })
    fireEvent.click(screen.getByText('show'))
    expect(screen.getByText('Bye')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByText('Bye')).toBeFalsy()
  })

  it('auto-dismisses after duration', () => {
    render(<Trigger message="Auto" />, { wrapper })
    fireEvent.click(screen.getByText('show'))
    expect(screen.getByText('Auto')).toBeTruthy()
    act(() => vi.advanceTimersByTime(5000))
    expect(screen.queryByText('Auto')).toBeFalsy()
  })
})
