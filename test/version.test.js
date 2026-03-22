import { describe, it, expect } from 'vitest'
import { version } from '../src/version'

describe('version', () => {
  it('exposes required fields', () => {
    expect(version).toHaveProperty('branch')
    expect(version).toHaveProperty('commit')
    expect(version).toHaveProperty('buildTime')
    expect(version).toHaveProperty('env')
  })

  it('reads compile-time constants injected in setup', () => {
    expect(version.branch).toBe('test-branch')
    expect(version.commit).toBe('abc1234')
    expect(version.env).toBe('test')
  })

  it('buildTime is a valid ISO string', () => {
    expect(() => new Date(version.buildTime)).not.toThrow()
    expect(new Date(version.buildTime).getTime()).toBeGreaterThan(0)
  })
})
