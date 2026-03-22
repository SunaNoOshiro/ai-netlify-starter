import { useTranslation } from '../../lib/i18n'
import ImageCard from '../ImageCard'
import styles from './ImageDemo.module.css'

const IMAGES = [
  {
    src:      '/images/your-photo.jpg',
    fallback: '/images/placeholders/placeholder-card.svg',
    labelKey: 'imageLabelFallback',
  },
  {
    src:      '/images/placeholders/placeholder-card.svg',
    fallback: '/images/placeholders/placeholder-card.svg',
    labelKey: 'imageLabelCard',
  },
]

export default function ImageDemo() {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <h3 className="section-heading">{t.imagesTitle}</h3>
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
