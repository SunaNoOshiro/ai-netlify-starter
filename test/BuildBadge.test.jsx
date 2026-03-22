import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BuildBadge from '../src/components/BuildBadge'

describe('BuildBadge', () => {
  it('renders branch and commit from injected build constants', () => {
    render(<BuildBadge />)
    expect(screen.getByText('test-branch')).toBeTruthy()
    expect(screen.getByText('abc1234')).toBeTruthy()
  })

  it('shows TEST env label', () => {
    render(<BuildBadge />)
    // Falls back to DEV styling since 'test' is not production/preview
    expect(screen.getByText('DEV')).toBeTruthy()
  })
})
