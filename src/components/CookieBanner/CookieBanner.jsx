import { useTranslation } from '../../lib/i18n'
import styles from './CookieBanner.module.css'

export default function CookieBanner({ onAccept, onDecline }) {
  const { t } = useTranslation()
  return (
    <div className={styles.banner} role="dialog" aria-label={t.cookieBannerLabel}>
      <p className={styles.message}>{t.cookieBannerMessage}</p>
      <div className={styles.actions}>
        <button className={styles.accept}  onClick={onAccept}>{t.cookieBannerAccept}</button>
        <button className={styles.decline} onClick={onDecline}>{t.cookieBannerDecline}</button>
      </div>
    </div>
  )
}
