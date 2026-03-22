import { render, screen, fireEvent } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '../../lib/theme'
import { I18nProvider } from '../../lib/i18n'
import Modal from './Modal'

// jsdom does not implement showModal / close on <dialog>
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function () { this.open = true })
  HTMLDialogElement.prototype.close    = vi.fn(function () {
    this.open = false
    this.dispatchEvent(new Event('close'))
  })
})

function wrapper({ children }) {
  return (
    <HelmetProvider>
      <ThemeProvider><I18nProvider>{children}</I18nProvider></ThemeProvider>
    </HelmetProvider>
  )
}

function renderModal(props) {
  return render(
    <Modal isOpen={true} onClose={vi.fn()} {...props}>
      <p>Modal content</p>
    </Modal>,
    { wrapper }
  )
}

describe('Modal', () => {
  it('renders children when open', () => {
    renderModal()
    expect(screen.getByText('Modal content')).toBeTruthy()
  })

  it('renders the title when provided', () => {
    renderModal({ title: 'Confirm' })
    expect(screen.getByText('Confirm')).toBeTruthy()
  })

  it('renders a close button', () => {
    renderModal()
    expect(screen.getByRole('button', { name: /close/i })).toBeTruthy()
  })

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls showModal when isOpen becomes true', () => {
    renderModal({ isOpen: true })
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
  })
})
