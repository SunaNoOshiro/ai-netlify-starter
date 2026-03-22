import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ImageCard from './ImageCard'

describe('ImageCard', () => {
  it('renders image with correct src and alt', () => {
    render(<ImageCard src="/test.jpg" fallback="/fallback.svg" label="Test image" />)
    const img = screen.getByAltText('Test image')
    expect(img.getAttribute('src')).toBe('/test.jpg')
  })

  it('renders label text', () => {
    render(<ImageCard src="/test.jpg" fallback="/fallback.svg" label="My label" />)
    expect(screen.getByText('My label')).toBeTruthy()
  })

  it('switches to fallback src on image error', () => {
    render(<ImageCard src="/missing.jpg" fallback="/fallback.svg" label="Fallback test" />)
    const img = screen.getByAltText('Fallback test')
    fireEvent.error(img)
    expect(img.getAttribute('src')).toBe('/fallback.svg')
  })
})
