import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from '../../lib/i18n'
import LanguageSwitcher from '../LanguageSwitcher'
import ThemeSwitcher    from '../ThemeSwitcher'
import styles from './Nav.module.css'

export default function Nav() {
  const { t } = useTranslation()
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>{t.projectName}</Link>

      <ul className={styles.links}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : undefined}>
            {t.navHome}
          </NavLink>
        </li>
        {/* Add more pages here — e.g.:
        <li><NavLink to="/about">{t.navAbout}</NavLink></li>
        */}
      </ul>

      <div className={styles.controls}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
