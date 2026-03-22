import { useTranslation, LANGUAGES } from '../../lib/i18n'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { lang, switchLang } = useTranslation()

  return (
    <div className={styles.wrapper}>
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          title={flag}
          className={`${styles.btn}${lang === code ? ` ${styles.btnActive}` : ''}`}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  )
}
