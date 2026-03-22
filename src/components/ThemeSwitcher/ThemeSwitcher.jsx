import { useTheme } from '../../lib/theme'
import { useTranslation } from '../../lib/i18n'
import styles from './ThemeSwitcher.module.css'

const ICONS  = { light: '☀', dark: '☽', auto: '⊙' }
const NEXT_LABEL_KEY = { light: 'themeSwitchToDark', dark: 'themeSwitchToAuto', auto: 'themeSwitchToLight' }

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      className={styles.btn}
      onClick={toggleTheme}
      aria-label={t[NEXT_LABEL_KEY[mode]]}
      title={t[NEXT_LABEL_KEY[mode]]}
    >
      {ICONS[mode]}
    </button>
  )
}
