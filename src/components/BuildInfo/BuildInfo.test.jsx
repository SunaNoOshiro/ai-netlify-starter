import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BuildInfo from './BuildInfo'
import { I18nProvider } from '../../lib/i18n'

const wrapper = ({ children }) => <I18nProvider>{children}</I18nProvider>

describe('BuildInfo', () => {
  it('renders a table with build metadata keys', () => {
    render(<BuildInfo />, { wrapper })
    expect(screen.getByText('branch')).toBeTruthy()
    expect(screen.getByText('commit')).toBeTruthy()
    expect(screen.getByText('env')).toBeTruthy()
  })

  it('renders values from version (stubbed in setup.js)', () => {
    render(<BuildInfo />, { wrapper })
    expect(screen.getByText('test-branch')).toBeTruthy()
    expect(screen.getByText('abc1234')).toBeTruthy()
  })
})
