import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from './useFetch'

const mockFetch = (payload, { ok = true, status = 200 } = {}) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(payload),
    })
  )
}

beforeEach(() => { vi.clearAllMocks() })
afterEach(() => { delete global.fetch })

describe('useFetch', () => {
  it('returns loading=true then data on success', async () => {
    mockFetch({ id: 1, name: 'Test' })
    const { result } = renderHook(() => useFetch('/api/test'))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual({ id: 1, name: 'Test' })
    expect(result.current.error).toBeNull()
  })

  it('sets error on non-ok response', async () => {
    mockFetch(null, { ok: false, status: 404 })
    const { result } = renderHook(() => useFetch('/api/missing'))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error.message).toBe('HTTP 404')
    expect(result.current.data).toBeNull()
  })

  it('sets error on network failure', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))
    const { result } = renderHook(() => useFetch('/api/broken'))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error.message).toBe('Network error')
  })

  it('skips fetch when url is null', () => {
    global.fetch = vi.fn()
    const { result } = renderHook(() => useFetch(null))

    expect(result.current.loading).toBe(false)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('re-fetches when url changes', async () => {
    mockFetch({ value: 'first' })
    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: '/api/one' },
    })

    await waitFor(() => expect(result.current.data).toEqual({ value: 'first' }))

    mockFetch({ value: 'second' })
    rerender({ url: '/api/two' })

    await waitFor(() => expect(result.current.data).toEqual({ value: 'second' }))
  })

  it('aborts in-flight request on unmount', async () => {
    const abortSpy = vi.fn()
    global.fetch = vi.fn(() => {
      return new Promise(() => {}) // never resolves
    })
    vi.spyOn(AbortController.prototype, 'abort').mockImplementation(abortSpy)

    const { unmount } = renderHook(() => useFetch('/api/slow'))
    unmount()

    expect(abortSpy).toHaveBeenCalled()
    vi.restoreAllMocks()
  })
})
