import { render, screen } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('renders a single text skeleton by default', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild
    expect(el).toBeTruthy()
    expect(el.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders the correct variant class', () => {
    const { container } = render(<Skeleton variant="heading" />)
    expect(container.firstChild.className).toContain('heading')
  })

  it('applies custom width and height via inline style', () => {
    const { container } = render(<Skeleton width="200px" height="40px" />)
    const el = container.firstChild
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('40px')
  })

  it('renders multiple lines when lines > 1', () => {
    const { container } = render(<Skeleton lines={3} />)
    // wrapper .stack + 3 skeleton divs
    const skeletons = container.querySelectorAll('[aria-hidden="true"]')
    expect(skeletons.length).toBe(3)
  })

  it('makes the last line 70% wide when using lines prop', () => {
    const { container } = render(<Skeleton lines={2} />)
    const skeletons = container.querySelectorAll('[aria-hidden="true"]')
    expect(skeletons[1].style.width).toBe('70%')
  })
})
