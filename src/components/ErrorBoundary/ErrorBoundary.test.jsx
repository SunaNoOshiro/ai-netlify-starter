import { render, screen } from '@testing-library/react'
import { beforeEach, afterEach } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

// Suppress the expected console.error output from the boundary
beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}) })
afterEach(() => { console.error.mockRestore() })

function Bomb() {
  throw new Error('test crash')
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(<ErrorBoundary><p>ok</p></ErrorBoundary>)
    expect(screen.getByText('ok')).toBeTruthy()
  })

  it('renders the fallback UI when a child throws', () => {
    render(<ErrorBoundary><Bomb /></ErrorBoundary>)
    expect(screen.getByText('Something went wrong')).toBeTruthy()
    expect(screen.getByRole('button')).toBeTruthy()
  })
})
