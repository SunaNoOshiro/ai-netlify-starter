import { Helmet } from 'react-helmet-async'
import { useTranslation } from '../../lib/i18n'

const APP_URL = import.meta.env.VITE_APP_URL || ''

export default function SEO({ title, description }) {
  const { t } = useTranslation()
  const siteName = t.projectName
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const ogImage = APP_URL ? `${APP_URL}/logo.svg` : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description"         content={description} />}
      <meta property="og:title"                        content={fullTitle} />
      {description && <meta property="og:description"  content={description} />}
      <meta property="og:type"                         content="website" />
      {ogImage    && <meta property="og:image"         content={ogImage} />}
      <meta name="twitter:card"                        content="summary" />
      <meta name="twitter:title"                       content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage    && <meta name="twitter:image"        content={ogImage} />}
    </Helmet>
  )
}
