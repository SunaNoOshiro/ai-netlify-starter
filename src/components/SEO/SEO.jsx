import { Helmet } from 'react-helmet-async'
import { useTranslation } from '../../lib/i18n'

export default function SEO({ title, description }) {
  const { t } = useTranslation()
  const siteName = t.projectName
  const fullTitle = title ? `${title} | ${siteName}` : siteName

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title"       content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type"        content="website" />
    </Helmet>
  )
}
