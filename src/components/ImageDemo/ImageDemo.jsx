import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useTranslation } from '../../lib/i18n'
import ImageCard from '../ImageCard'
import styles from './ImageDemo.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const IMAGES = [
  {
    src:      '/images/your-photo.jpg',
    fallback: '/images/placeholders/placeholder-card.svg',
    labelKey: 'homeImageLabelFallback',
  },
  {
    src:      '/images/placeholders/placeholder-card.svg',
    fallback: '/images/placeholders/placeholder-card.svg',
    labelKey: 'homeImageLabelCard',
  },
]

export default function ImageDemo() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from(`.${styles.grid} > *`, {
      opacity: 0,
      y: 48,
      scale: 0.92,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.section}>
      <h3 className="section-heading">{t.homeImagesTitle}</h3>
      <div className={styles.grid}>
        {IMAGES.map(({ src, fallback, labelKey }) => (
          <ImageCard
            key={labelKey}
            src={src}
            fallback={fallback}
            label={t[labelKey]}
          />
        ))}
      </div>
    </section>
  )
}
