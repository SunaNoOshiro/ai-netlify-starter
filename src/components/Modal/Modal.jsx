import { useEffect, useRef } from 'react'
import { useTranslation } from '../../lib/i18n'
import styles from './Modal.module.css'

/**
 * Modal / Dialog — wraps the native <dialog> element.
 *
 * @param {boolean}     isOpen   — controlled open state
 * @param {() => void}  onClose  — called on Escape, backdrop click, or ✕
 * @param {string}      title    — optional header title
 * @param {ReactNode}   children — modal body content
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null)
  const { t } = useTranslation()

  // Open / close the native dialog in sync with isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  // Restore scroll and notify parent when dialog closes (Escape key or programmatic)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => {
      document.body.style.overflow = ''
      onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  // Close when clicking the backdrop (the <dialog> element itself)
  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClick={handleBackdropClick}>
      <div className={styles.inner}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeBtn} onClick={onClose} aria-label={t.modalClose}>✕</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  )
}
