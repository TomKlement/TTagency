import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export function PageMeta({ pageKey }: { pageKey: 'home' | 'portfolio' | 'cmsDemo' | 'pricing' | 'contact' }) {
  const { t, i18n } = useTranslation()

  const title = t(`meta.${pageKey}.title`)
  const description = t(`meta.${pageKey}.description`)
  const ogTitle = t(`meta.${pageKey}.ogTitle`)
  const ogDescription = t(`meta.${pageKey}.ogDescription`)

  return (
    <Helmet>
      <html lang={i18n.language === 'cs' ? 'cs' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:locale" content={i18n.language === 'cs' ? 'cs_CZ' : 'en_US'} />
    </Helmet>
  )
}

