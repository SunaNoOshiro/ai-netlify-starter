import { useState, useEffect } from 'react'

/**
 * useFetch — standard data-fetching hook.
 *
 * Usage:
 *   const { data, loading, error } = useFetch('/api/items')
 *
 * - Pass null/undefined to skip fetching (useful for conditional requests).
 * - Re-fetches automatically when `url` changes.
 * - Aborts in-flight requests on unmount or url change (no stale updates).
 * - Pair `loading` with <Skeleton> and `error` with an inline error message.
 *
 * Example:
 *   function ItemList() {
 *     const { data, loading, error } = useFetch('/api/items')
 *     if (loading) return <Skeleton lines={3} />
 *     if (error)   return <p className="error">{error.message}</p>
 *     return <ul>{data.map(item => <li key={item.id}>{item.name}</li>)}</ul>
 *   }
 */
export function useFetch(url) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(!!url)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
