import { Routes, Route } from 'react-router-dom'
import { version }       from './version'
import styles            from './App.module.css'
import PageHeader        from './components/PageHeader'
import ImageDemo         from './components/ImageDemo'
import ContactForm       from './components/ContactForm'
import BuildBadge        from './components/BuildBadge'
import NotFound          from './components/NotFound'

console.log('[build]', version)

function Home() {
  return (
    <div className={styles.wrapper}>
      <PageHeader />
      <ImageDemo />
      <ContactForm />
      <BuildBadge />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="*"  element={<NotFound />} />
    </Routes>
  )
}
