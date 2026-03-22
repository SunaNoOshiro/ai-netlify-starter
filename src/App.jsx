import { version } from './version'
import styles      from './App.module.css'
import PageHeader  from './components/PageHeader'
import ImageDemo   from './components/ImageDemo'
import ContactForm from './components/ContactForm'
import BuildBadge  from './components/BuildBadge'

console.log('[build]', version)

export default function App() {
  return (
    <div className={styles.wrapper}>
      <PageHeader />
      <ImageDemo />
      <ContactForm />
      <BuildBadge />
    </div>
  )
}
