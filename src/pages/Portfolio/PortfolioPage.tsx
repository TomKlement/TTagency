import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageMeta } from '../../shared/seo/PageMeta'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'
import { CaseStudyCard } from '../../portfolio'
import type { CaseStudy } from '../../portfolio'

gsap.registerPlugin(ScrollTrigger)

export function PortfolioPage() {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLElement | null>(null)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const caseStudies = (t('portfolio.caseStudies', { returnObjects: true }) as Array<Omit<CaseStudy, 'className'>>).map(
    (s, idx) => ({
      ...s,
      className:
        idx === 0
          ? 'md:col-span-1 md:row-span-2 min-h-[460px]'
          : idx === 1
            ? 'md:col-span-1 min-h-[260px]'
            : idx === 2
              ? 'md:col-span-1 min-h-[260px]'
              : idx === 3
                ? 'md:col-span-2 min-h-[340px]'
                : 'md:col-span-1 min-h-[340px]',
    }),
  )

  const viewSiteText = t('portfolio.viewSite')
  const featuredStudies = caseStudies.slice(0, 3)
  const remainingStudies = caseStudies.slice(3)

  useEffect(() => {
    if (reduceMotion) return
    const root = gridRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      if (els.length === 0) return

      gsap.set(els, { autoAlpha: 0, y: 18, filter: 'blur(10px)' })

      ScrollTrigger.batch(els, {
        start: 'top 86%',
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            clearProps: 'opacity,transform,visibility,filter',
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]">
      <PageMeta pageKey="portfolio" />
      <GeoJsonLd pageKey="portfolio" />
      <section className="px-8 py-14 border-b border-[var(--color-border)]">
        <h1 className="font-serif font-black uppercase text-[54px] leading-[1] tracking-tight">{t('portfolio.h1')}</h1>
        <p className="mt-6 text-[var(--color-muted)] text-[13px] max-w-[64ch] leading-relaxed">
          {t('portfolio.intro')}
        </p>
      </section>

      <section
        ref={gridRef}
        className="relative grid grid-cols-1 border-l border-t border-[var(--color-border)] md:grid-cols-3"
      >
        {featuredStudies.map((study) => (
          <CaseStudyCard
            key={study.number}
            study={study}
            viewSiteText={viewSiteText}
            viewSiteAria={t('portfolio.viewSiteAria', { title: study.title })}
          />
        ))}

        <div
          data-reveal
          className="flex min-h-[340px] items-center border-b border-r border-[var(--color-border)] bg-[var(--color-bg)] p-8 md:col-span-2"
        >
          <p className="font-serif font-black text-[clamp(40px,6vw,92px)] uppercase leading-display-snug tracking-tight">
            {t('portfolio.slogan')
              .split('\n')
              .map((line, idx) => (
                <span key={`${line}-${idx}`}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>

        {remainingStudies.map((study) => (
          <CaseStudyCard
            key={study.number}
            study={study}
            viewSiteText={viewSiteText}
            viewSiteAria={t('portfolio.viewSiteAria', { title: study.title })}
          />
        ))}
      </section>
    </div>
  )
}

