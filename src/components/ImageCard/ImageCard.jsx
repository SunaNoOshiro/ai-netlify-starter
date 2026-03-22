import styles from './ImageCard.module.css'

export default function ImageCard({ src, fallback, label }) {
  return (
    <div className={styles.wrapper}>
      <img
        src={src}
        alt={label}
        className={styles.image}
        onError={e => { e.currentTarget.src = fallback }}
      />
      <p className={styles.label}>{label}</p>
    </div>
  )
}
