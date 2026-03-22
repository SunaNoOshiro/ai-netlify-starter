import { useTranslation } from '../../lib/i18n'
import BuildBadge from '../BuildBadge'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        {t.footerCopyright.replace('{year}', new Date().getFullYear())}
      </p>
      <BuildBadge />
    </footer>
  )
}
