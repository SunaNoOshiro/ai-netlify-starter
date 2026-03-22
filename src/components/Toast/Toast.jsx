import { useTranslation } from '../../lib/i18n'
import styles from './Toast.module.css'

function ToastItem({ toast, onDismiss }) {
  const { t } = useTranslation()
  return (
    <div className={`${styles.toast} ${styles[toast.type]}`} role="alert">
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.close}
        onClick={() => onDismiss(toast.id)}
        aria-label={t.toastDismiss}
      >
        ✕
      </button>
    </div>
  )
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null
  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
