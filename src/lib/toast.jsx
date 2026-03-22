import { createContext, useContext, useState, useCallback } from 'react'
import ToastContainer from '../components/Toast'

const ToastContext = createContext(null)

let nextId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const show = useCallback((message, type, duration) => {
    const id = ++nextId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  const toast = {
    success: (msg, opts) => show(msg, 'success', opts?.duration ?? 4000),
    error:   (msg, opts) => show(msg, 'error',   opts?.duration ?? 6000),
    warning: (msg, opts) => show(msg, 'warning',  opts?.duration ?? 5000),
    info:    (msg, opts) => show(msg, 'info',     opts?.duration ?? 4000),
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

// useToast() returns { toast } where toast.success / .error / .warning / .info
// accept (message, { duration? }) — duration in ms, 0 = sticky
export function useToast() {
  return useContext(ToastContext)
}
