import { useTranslation } from '../../lib/i18n'
import LanguageSwitcher from '../LanguageSwitcher'
import styles from './PageHeader.module.css'

export default function PageHeader() {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={styles.langRow}>
        <LanguageSwitcher />
      </div>

      <img src="/logo.svg" alt="logo" width={56} height={56} className={styles.logo} />

      <h1 className={styles.title}>{t.projectName}</h1>
      <p className={styles.desc}>
        {t.projectDesc.split('\n').map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </p>
    </header>
  )
}
