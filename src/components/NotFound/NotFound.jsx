import { Link } from 'react-router-dom'
import { useTranslation } from '../../lib/i18n'
import styles from './NotFound.module.css'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>{t.notFoundMessage}</p>
      <Link to="/" className={styles.link}>{t.notFoundHome}</Link>
    </div>
  )
}
