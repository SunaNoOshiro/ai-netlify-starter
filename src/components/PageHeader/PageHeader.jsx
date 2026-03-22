import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '../../lib/i18n'
import LanguageSwitcher from '../LanguageSwitcher'
import ThemeSwitcher from '../ThemeSwitcher'
import styles from './PageHeader.module.css'

gsap.registerPlugin(useGSAP)

export default function PageHeader() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const logoRef      = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Logo spins in and scales up with an overshoot
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0,
      rotation: -180,
      duration: 0.7,
      ease: 'back.out(1.7)',
    })
    // Title rises with a blur wipe
    .from(`.${styles.title}`, {
      opacity: 0,
      y: 32,
      filter: 'blur(8px)',
      duration: 0.55,
    }, '-=0.25')
    // Description fades up
    .from(`.${styles.desc}`, {
      opacity: 0,
      y: 20,
      duration: 0.45,
    }, '-=0.2')

    // Perpetual gentle float on the logo
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, { scope: containerRef })

  return (
    <header ref={containerRef} className={styles.header}>
      <div className={styles.langRow}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      <img
        ref={logoRef}
        src="/logo.svg"
        alt="logo"
        width={56}
        height={56}
        className={styles.logo}
      />

      <h1 className={styles.title}>{t.projectName}</h1>
      <p className={styles.desc}>
        {t.projectDesc.split('\n').map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </p>
    </header>
  )
}
