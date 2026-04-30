import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import type { FaqKey } from './FaqSection'

type FaqItem = { q: string; a: string }

function toJsonLd(data: unknown) {
  return JSON.stringify(data, null, 0)
}

export function GeoJsonLd({
  pageKey,
  faqKey,
}: {
  pageKey: 'home' | 'portfolio' | 'cmsDemo' | 'pricing' | 'contact'
  faqKey?: FaqKey
}) {
  const { t, i18n } = useTranslation()
  const baseUrl = 'https://bloclab.dev'
  const locale = i18n.language === 'cs' ? 'cs-CZ' : 'en-US'

  const services = t('geo.services', { returnObjects: true }) as Array<{
    name: string
    serviceType: string
    description: string
    areaServed: string[]
    audience: string[]
  }>

  const faqItems = faqKey ? (t(`faq.${faqKey}`, { returnObjects: true }) as FaqItem[]) : []

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t('brand.name'),
    url: baseUrl,
    email: t('brand.email'),
    sameAs: [],
    foundingLocation: 'Prague, Czech Republic',
    knowsAbout: ['Next.js', 'React', 'Web development', 'CMS', 'SEO'],
    description: t('geo.aboutTrust'),
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: t('brand.name'),
    url: baseUrl,
    email: t('brand.email'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Prague',
      addressCountry: 'CZ',
    },
    areaServed: ['Prague', 'Czech Republic', 'Slovakia', 'Europe', 'United States', 'Worldwide'],
    description: t('geo.aboutTrust'),
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t('brand.name'),
    url: baseUrl,
    inLanguage: locale,
  }

  const serviceSchemas = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'Organization', name: t('brand.name'), url: baseUrl },
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    areaServed: s.areaServed,
    audience: s.audience,
  }))

  const faqPage =
    faqKey && faqItems.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((it) => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: it.a },
          })),
        }
      : null

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('brand.name'), item: baseUrl },
      { '@type': 'ListItem', position: 2, name: t(`meta.${pageKey}.title`), item: `${baseUrl}/${pageKey === 'home' ? '' : pageKey}` },
    ],
  }

  return (
    <Helmet>
      <meta property="og:site_name" content={t('brand.name')} />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:locale:alternate" content={i18n.language === 'cs' ? 'en_US' : 'cs_CZ'} />

      <script type="application/ld+json">{toJsonLd(organization)}</script>
      <script type="application/ld+json">{toJsonLd(localBusiness)}</script>
      <script type="application/ld+json">{toJsonLd(webSite)}</script>
      {serviceSchemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {toJsonLd(s)}
        </script>
      ))}
      {faqPage ? <script type="application/ld+json">{toJsonLd(faqPage)}</script> : null}
      <script type="application/ld+json">{toJsonLd(breadcrumb)}</script>
    </Helmet>
  )
}

